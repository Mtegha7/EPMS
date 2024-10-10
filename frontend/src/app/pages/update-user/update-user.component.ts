import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UsersService } from '../../services/users/users.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {


  userID!: any;

  isLoading: boolean = false;
  loadingTitle: string = '';
  errors: any = [];


  constructor(
    private route: ActivatedRoute,
    public usersService: UsersService,
  ) { }


  ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get(`id`);
    // alert(this.userID)

    this.usersService.getOneUser(this.userID)
  }

  update_users(): void {

  }
  updateUserForm!: FormGroup;




}






