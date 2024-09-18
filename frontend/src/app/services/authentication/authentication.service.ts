import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap } from "rxjs/operators";
import { HttpService } from "../http/http.service.js";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  [x: string]: any;

  private url = 'http://localhost:8080/dekha/api/auth';

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  public userId: any;
  // userId!: Pick<User, "userID">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  // login(email: Pick<User, "emailAddress">, password: Pick<User, "password">): Observable<{
  //   token: string;
  //   userId: Pick<User, "userID">;
  // }> {
  //   return this.http
  //     .post(`${this.url}/login`, { email, password }, this.httpOptions)
  //     .pipe(
  //       first(),
  //       tap((tokenObject: { token: string; userId: Pick<User, "userID"> }) => {
  //         this.userId = tokenObject.userId;
  //         localStorage.setItem("token", tokenObject.token);
  //         this.isUserLoggedIn$.next(true);
  //         this.router.navigate(["home"]);
  //       }),
  //       catchError(
  //         this.errorHandlerService.handleError<{
  //           token: string;
  //           userId: Pick<User, "userID">;
  //         }>("login")
  //       )
  //     );
  // }

  login(email: string, password: string) {
    this.http.postNoAuthorization('auth/login', { email, password }).subscribe((response: any) => {
      try {

        this.userId = response.userId;
        localStorage.setItem("token", response.token);
        this.isUserLoggedIn$.next(true);
        this.router.navigate(["home"]);
        alert('Login Successful')
      } catch (error) {
        alert('ERROR Setting user data' + error)

      }
    }, (error) => {
      if (error.error.message) {
        alert(error.error.message);
      } else {
        alert("Server Error. please retry or check network");
      }

    });
  }


  create_user(data: any) {
    console.log("data", data);
    this.http.postNoAuthorization('users/add_users', data).subscribe((response: any) => {
      try {
        this.router.navigate(["manage_user"]);
        alert(response.message)
      } catch (error) {
        alert('ERROR Setting user data' + error)

      }
    }, (error) => {
      if (error.error.message) {
        alert(error.error.message);
      } else {
        alert("Server Error. please retry or check network");
      }

    });
  }

}
