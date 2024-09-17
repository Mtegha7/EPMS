import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { ErrorHandler, Injectable } from '@angular/core';
import { User } from '../interface/auth.ts';
import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = 'http://localhost:8080/dekha/api/auth';

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId!: Pick<User, "userID">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandler,
    private router: Router
  ) { }

  login(
    email: Pick<User, "emailAddress">,
    password: Pick<User, "password">
  ): Observable<{
    token: string;
    userId: Pick<User, "userID">;
  }> {
    return this.http
      .post(`${this.url}/login`, { email, password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: { token: string; userId: Pick<User, "userID"> }) => {
          this.userId = tokenObject.userId;
          localStorage.setItem("token", tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(["posts"]);
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<User, "userID">;
          }>("login")
        )
      );
  }

}
