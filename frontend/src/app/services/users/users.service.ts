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

  // deleteUsers(userID: any) {
  //   this.http.getNoAuthorization('users/delete_users/:id').subscribe((response: any) => {
  //     this.users = response['data']
  //     if (this.users) {
  //       this.usersColumns = Object.keys(this.users[0]);
  //       console.log("this.usersColumns", this.usersColumns);
  //     }
  //     console.log("this.users", this.users);
  //   })
  // }

  deleteUsers(userID: any) {
    this.http.delete(`users/delete_users/${userID}`).subscribe(
      (response: any) => {
        this.users = this.users.filter((user: { id: number; }) => user.id !== userID);

        if (this.users.length > 0) {
          this.usersColumns = Object.keys(this.users[0]);
          console.log("this.usersColumns", this.usersColumns);
        }
        console.log("Updated users list", this.users);
        alert("User deleted successfully!");
      },
      (error: any) => {
        console.error('Error deleting user:', error);
        alert('Error occurred while deleting the user.');
      }
    );
  }

}