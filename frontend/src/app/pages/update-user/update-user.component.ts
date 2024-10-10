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

  user!: any;
  userID!: any;

  isLoading: boolean = false;
  loadingTitle: string = '';
  errors: any = [];


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UsersService,
    private route: ActivatedRoute,
    private usersService: UsersService,
  ) { }


  ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get(`id`);
    // alert(this.userID)

    this.userService.getUser(this.userID).subscribe(res => {
      console.log(res)
      this.user = res.user
    })
  }

  update_users(): void {

  }
  updateUserForm!: FormGroup;



  // ngOnInit(): void {
  //   this.updateUserForm = this.updateFormGroup();
  // }

  // get f() { return this.updateUserForm.controls; }

  // updateFormGroup(): FormGroup{
  //   return new FormGroup({
  //      firstName: new FormControl("", [Validators.required]),
  //     lastName: new FormControl("", [Validators.required]),
  //     emailAddress: new FormControl("", [Validators.required, Validators.email]),
  //     phoneNumber: new FormControl("", [Validators.required]),
  //     gender: new FormControl("", [Validators.required]),
  //     dateOfBirth: new FormControl("", [Validators.required]),
  //     dateOfHire: new FormControl("", [Validators.required]),
  //     department: new FormControl("", [Validators.required]),
  //     jobTitle: new FormControl("", [Validators.required]),
  //     role: new FormControl("", [Validators.required]),
  //   });
  //  }


}






