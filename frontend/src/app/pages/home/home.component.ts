import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';
import { TasksService } from '../../services/tasks/tasks.service';
import { Chart } from 'chart.js';


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


   var chartsPie = document.querySelectorAll(".chart-pie");


function initializePieChart(chart, pendingCount, inProgressCount, doneCount) {
  if (!chart.getAttribute('data-chart-initialized')) {
    new Chart(chart, {
      type: "pie",
      data: {
        labels: ["Pending", "In Progress", "Done"],
        datasets: [{
          data: [pendingCount, inProgressCount, doneCount], // Use dynamic data here
          backgroundColor: [
            window.theme.primary,
            window.theme.warning,
            window.theme.danger
          ],
          borderWidth: 5
        }]
      },
      options: {
        responsive: !window.MSInputMethodContext,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        cutoutPercentage: 75
      }
    });
    chart.setAttribute("data-chart-initialized", "true");
  }

}


