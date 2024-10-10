import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { SettingsService } from '../settings/settings.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  public tasks: any = []
  public comments: any = []
  public task: any = {};
  public tasksColumns: string[] = [];

  constructor(
    public http: HttpService,
    public settings: SettingsService,
    private router: Router
  ) { }


  getTasks() {
    this.http.getNoAuthorization('tasks/get_tasks').subscribe((response: any) => {
      this.tasks = response['data']
      if (this.tasks) {
        this.tasksColumns = Object.keys(this.tasks[0]);
        console.log("this.tasksColumns", this.tasksColumns);
      }
      console.log("this.tasks", this.tasks);
    })
  }

  getComments(taskID: string) {
    this.comments = []
    this.http.getNoAuthorization('tasks/get_comment/' + taskID).subscribe((response: any) => {
      this.comments = response['data']
    })
  }

  getOneTask(taskID: any) {
    this.settings.loader = true;
    this.http.getNoAuthorization(`tasks/get_task/${taskID}`).subscribe((response: any) => {
      this.task = response['data']
      if (this.task.createdDate) {
        this.task.createdDate = new Date(this.task.createdDate).toLocaleDateString('sv');
      }
      if (this.task.updatedDate) {
        this.task.updatedDate = new Date(this.task.updatedDate).toLocaleDateString('sv');
      }
      if (this.task.dueDate) {
        this.task.dueDate = new Date(this.task.dueDate).toLocaleDateString('sv');
      }
      if (this.task.completedDate) {
        this.task.completedDate = new Date(this.task.completedDate).toLocaleDateString('sv');
      }
      console.log(this.task)
      console.log("this.tasks", this.tasks);
      this.settings.loader = false;

    })

  }

  deleteTasks(taskID: any) {
    this.http.delete(`tasks/delete_task/${taskID}`).subscribe(
      (response: any) => {
        this.tasks = this.tasks.filter((task: { id: number; }) => task.id !== taskID);

        if (this.tasks.length > 0) {
          this.tasksColumns = Object.keys(this.tasks[0]);
          console.log("this.tasksColumns", this.tasksColumns);
        }
        console.log("Updated tasks list", this.tasks);
        alert("task deleted successfully!");
      },
      (error: any) => {
        console.error('Error deleting task:', error);
        alert('Error occurred while deleting the task.');
      }
    );
  }

  updateTasks() {
    this.settings.loader = true;
    this.http.update(`tasks/update_tasks/${this.task.taskID}`, this.task).subscribe(
      (response: any) => {
        this.tasks = this.tasks.filter((task: { id: number; }) => task.id !== this.task.taskIDs);
        console.log("Updated tasks list", this.tasks);
        alert("Task updated successfully!");
        this.settings.loader = false;
        this.router.navigateByUrl('manage_task')

      },
      (error: any) => {
        console.error('Error updating Task:', error);
        alert('Error occurred while updating the Task.');
        this.settings.loader = false;
      }
    );
  }

  addComment(data: any, taskID: any) {
    console.log("data", data);
    this.http.postNoAuthorization('tasks/add_comment', data).subscribe((response: any) => {
      try {
        this.router.navigate(["manage_task"]);
        alert(response.message)
      } catch (error) {
        alert('ERROR Setting task data' + error)

      }
    }, (error) => {
      if (error.error.message) {
        alert(error.error.message);
      } else {
        alert("Server Error. please retry or check network");
      }

    });
  }

}