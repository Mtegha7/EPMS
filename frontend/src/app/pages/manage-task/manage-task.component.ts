import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks/tasks.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings/settings.service';
import { Task } from 'zone.js/lib/zone-impl';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrl: './manage-task.component.scss'
})
export class ManageTaskComponent {
  info: any;
  task = [];
  tasks: any;
  comment = ''

  constructor(
    public tasks_service: TasksService,
    private router: Router,
    public settings: SettingsService
  ) {

    interface Task {
      taskID: number;
      title: string;
      description: string;
      assignedTo: number;
      createdDate: Date;
      dueDate: Date;
    }


  }
  ngOnInit(): void {
    console.log('we are in Manage Tasks');

    // Fetch tasks from the service
    this.tasks_service.getTasks();

    // Wait for the tasks to be fetched before filtering
    this.tasks_service.http.getNoAuthorization('tasks/get_tasks').subscribe((response: any) => {
      // Check user role
      if (this.settings.userInformation.role === 'Manager') {
        // Manager can view all tasks
        this.tasks = this.tasks_service.tasks;
      } else {
        // Filter tasks based on the user ID
        const userID = this.settings.userInformation.userID;
        this.tasks = {
          pending: this.tasks_service.tasks.pending.filter((task: Task) => this.tasks_service.task.userID === userID),
          doing: this.tasks_service.tasks.doing.filter((task: Task) => this.tasks_service.task.userID === userID),
          done: this.tasks_service.tasks.done.filter((task: Task) => this.tasks_service.task.userID === userID)
        };
      }
    });
  }




  view_tasks(data: any) {
    console.log(data)
    this.info = data;
    // console.log('Stored info:', this.info);
  }

  delete_tasks({ taskID }: any) {
    this.tasks_service.deleteTasks(taskID)
  }

  update_task({ taskID }: any) {
    this.router.navigate([`tasks/${taskID}/edit`]);
  }

  saveComment() {
    if (this.comment && this.info.taskID) {
      // this.tasks_service.addComment(this.comment, this.info.taskID);
      const data = {
        userID: this.tasks_service.settings.userInformation.userID,
        comment: this.comment,
        taskID: this.info.taskID,
        emailAddress: this.tasks_service.settings.userInformation.emailAddress
      };

      this.tasks_service.addComment(data);


    } else {
      alert('Please fill in the comment and ensure task info is available.');
    }
  }
}
