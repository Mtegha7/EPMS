import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { Observable } from "rxjs";
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(): Observable<boolean> {
    if (!this.authService.isUserLoggedIn$.value) {
      this.router.navigate(["signup"]);
    }
    return this.authService.isUserLoggedIn$;
  }
}
