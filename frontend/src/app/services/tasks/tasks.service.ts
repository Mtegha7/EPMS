import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  public tasks: any = []
  public tasksColumns: string[] = [];

  constructor(
    public http: HttpService
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
}