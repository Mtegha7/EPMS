import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  createUserForm!: FormGroup;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.createUserForm = this.createFormGroup();
  }

  get f() { return this.createUserForm.controls; }

  createFormGroup(): FormGroup {
    return new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      emailAddress: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      dateOfBirth: new FormControl("", [Validators.required]),
      dateOfHire: new FormControl("", [Validators.required]),
      department: new FormControl("", [Validators.required]),
      jobTitle: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required]),

      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  add_users(): void {
    this.authService.create_user(this.createUserForm.value)
    // .subscribe();
  }
}
