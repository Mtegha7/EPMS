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
}