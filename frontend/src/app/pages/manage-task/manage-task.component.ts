import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrl: './manage-task.component.scss'
})
export class ManageTaskComponent {
  info: any;
  comment = ''
  constructor(
    public tasks_service: TasksService,
    private router: Router

  ) {

  }
  ngOnInit(): void {
    console.log('we are in Manage Tasks')
    this.tasks_service.getTasks()
  }

  view_tasks(data: any) {
    console.log(data)
    this.info = data;
    console.log('Stored info:', this.info);
  }

  delete_tasks({ taskID }: any) {
    this.tasks_service.deleteTasks(taskID)
  }

  update_task({ taskID }: any) {
    this.router.navigate([`tasks/${taskID}/edit`]);
  }

  saveComment() {
    if (this.comment && this.info) {
      this.tasks_service.addComment(this.comment, this.info.taskID);

    }
  }
}
