import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public users: any = []

  constructor(
    public http: HttpService
  ) { }


  getUsers() {
    this.http.getNoAuthorization('users/get_users').subscribe((response: any) => {
      this.users = response['data']
      console.log("this.users", this.users);
    })
  }
}
