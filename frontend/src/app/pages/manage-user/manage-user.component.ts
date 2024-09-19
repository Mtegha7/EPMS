import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { } from '../../services/users/users.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent implements OnInit {
  users: any;

  constructor(public users_service: UsersService) {

  }

  ngOnInit(): void {
    console.log('we are in Manage users')
    this.users_service.getUsers()
  }


  view_user(data: any) {
    console.log(data)
  }

  delete_user(userID: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users_service.deleteUser(userID).subscribe(
        () => {
          this.users = this.users.filter((user: { id: number; }) => user.id !== userID);
          alert('User deleted successfully.');
        },
        (error: any) => {
          console.error('Error deleting user:', error);
          alert('Error occurred while deleting the user.');
        }
      );
    }
  }
}
