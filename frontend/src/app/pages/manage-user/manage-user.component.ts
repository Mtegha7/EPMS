import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent implements OnInit {

  info: any = {};

  constructor(public users_service: UsersService) {

  }

  ngOnInit(): void {
    console.log('we are in Manage users')
    this.users_service.getUsers()
  }


  view_user(data: any) {
    console.log(data)
    this.info = data;
    console.log('Stored info:', this.info);
  }

  delete_user({ userID }: any) {
    this.users_service.deleteUsers(userID)
  }
}
