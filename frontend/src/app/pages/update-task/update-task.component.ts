import { TasksService } from '../../services/tasks/tasks.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent {

  taskID: any;

  isLoading: boolean = false;
  loadingTitle: string = '';
  errors: any = [];

  constructor(
    public tasks_service: TasksService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.taskID = this.route.snapshot.paramMap.get(`id`);

    this.tasks_service.getOneTask(this.taskID)
  }

  update_tasks(): void {

  }

}
