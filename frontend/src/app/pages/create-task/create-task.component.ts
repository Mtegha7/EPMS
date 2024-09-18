import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  createTaskForm!: FormGroup;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.createTaskForm = this.createFormGroup();
  }

  get f() { return this.createTaskForm.controls; }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      createdDate: new FormControl("", [Validators.required]),
      dueDate: new FormControl("", [Validators.required]),
      userID: new FormControl("", [Validators.required]),
    });
  }

  add_tasks(): void {
    this.authService.create_task(this.createTaskForm.value)
    // .subscribe();
  }

}
