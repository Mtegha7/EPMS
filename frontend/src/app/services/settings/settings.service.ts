import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  loader = false;
  loggedIn = false;
  loaderText = "";
  userInformation: any;

  constructor(
    public router: Router
  ) {
    this.setUserInfo()
  }

  setUserInfo() {
    const user = localStorage.getItem('user')
    if (user) {
      this.userInformation = JSON.parse(user)
      this.loggedIn = true;
    } else {
      this.logout()
    }
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }

}
