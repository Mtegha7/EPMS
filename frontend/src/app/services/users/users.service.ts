import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { SettingsService } from '../settings/settings.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userService: any;

  public users: any = []
  public user: any = {};
  public usersColumns: string[] = [];
  private apiUrl = 'http://localhost:8080/dekha/api/users';

  constructor(
    public http: HttpService,
    public settings: SettingsService,
    private router: Router
  ) { }


  getUsers() {
    this.settings.loader = true;
    this.http.getNoAuthorization('users/get_users').subscribe((response: any) => {
      this.users = response['data']
      if (this.users) {
        this.usersColumns = Object.keys(this.users[0]);
        console.log("this.usersColumns", this.usersColumns);
      }
      console.log("this.users", this.users);
      this.settings.loader = false;
    })
  }

  getOneUser(userID: any) {
    this.settings.loader = true;
    this.http.getNoAuthorization(`users/get_user/${userID}`).subscribe((response: any) => {
      this.user = response['data']
      if (this.user.dateOfBirth) {
        this.user.dateOfBirth = new Date(this.user.dateOfBirth).toLocaleDateString('sv');
      }
      if (this.user.dateOfHire) {
        this.user.dateOfHire = new Date(this.user.dateOfHire).toLocaleDateString('sv');
      }
      console.log(this.user)
      console.log("this.users", this.users);
      this.settings.loader = false;

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
    this.settings.loader = true;
    this.http.delete(`users/delete_users/${userID}`).subscribe((response: any) => {
      this.users = this.users.filter((user: { id: number; }) => user.id !== userID);
      console.log("Updated users list", this.users);
      alert("User deleted successfully!");
    },
      (error: any) => {
        console.error('Error deleting user:', error);
        alert('Error occurred while deleting the user.');
      }
    );
  }


  updateUsers() {
    this.settings.loader = true;
    this.http.update(`users/update_users/${this.user.userID}`, this.user).subscribe(
      (response: any) => {
        this.users = this.users.filter((user: { id: number; }) => user.id !== this.user.userIDs);
        console.log("Updated users list", this.users);
        alert("User updated successfully!");
        this.settings.loader = false;
        this.router.navigateByUrl('manage_user')

      },
      (error: any) => {
        console.error('Error updating user:', error);
        alert('Error occurred while updating the user.');
        this.settings.loader = false;
      }
    );

  }

}