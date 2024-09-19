import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrl: './manage-task.component.scss'
})
export class ManageTaskComponent {
  constructor(public tasks_service: TasksService) {

  }
  ngOnInit(): void {
    console.log('we are in Manage Tasks')
    this.tasks_service.getTasks()
  }

  view_tasks(data: any) {
    console.log(data)
  }

  delete_tasks({ taskID }: any) {
    this.tasks_service.deleteTasks(taskID)
  }
}
