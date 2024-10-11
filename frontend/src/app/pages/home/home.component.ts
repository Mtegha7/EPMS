import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';
import { TasksService } from '../../services/tasks/tasks.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private task_service: TasksService,
    public settings: SettingsService
  ) { }

  ngOnInit(): void {
    const userID = this.settings.userInformation.userID;

    this.task_service.getTaskStatusCounts(this.settings.userInformation.userID).subscribe(data => {
      const pendingCount = data.pending;
      const inProgressCount = data.inProgress;
      const doneCount = data.done;

      const chartElement = document.getElementById('chartElement');

      initializePieChart(chartElement, pendingCount, inProgressCount, doneCount);
    })
  }

}
function initializePieChart(chartElement: HTMLElement | null, pendingCount: any, inProgressCount: any, doneCount: any) {
  throw new Error('Function not implemented.');
}

