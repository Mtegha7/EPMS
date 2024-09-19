import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userService: any;

  public users: any = []
  public usersColumns: string[] = [];
  private apiUrl = 'http://localhost:8080/dekha/api/users';

  constructor(
    public http: HttpService
  ) { }


  getUsers() {
    this.http.getNoAuthorization('users/get_users').subscribe((response: any) => {
      this.users = response['data']
      if (this.users) {
        this.usersColumns = Object.keys(this.users[0]);
        console.log("this.usersColumns", this.usersColumns);
      }
      console.log("this.users", this.users);
    })
  }

  deleteUser(userID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userID}`);
  }
}