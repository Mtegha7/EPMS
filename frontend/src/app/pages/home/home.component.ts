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
    public task_service: TasksService,
    public settings: SettingsService
  ) { }

  ngOnInit(): void {
    this.task_service.getTaskStatusCounts()
    setTimeout(() => {
      const chartElement = document.getElementById('chartElement');
      if (this.task_service.homeStats.stats) {
        this.initializePieChart(
          chartElement,
          this.task_service.homeStats.stats.pending,
          this.task_service.homeStats.stats.inProgress,
          this.task_service.homeStats.stats.done
        );
      }
    }, 5000);
  }


  //  var chartsPie = document.querySelectorAll(".chart-pie");


  initializePieChart(chart: any, pendingCount: any, inProgressCount: any, doneCount: any) {
    if (!chart.getAttribute('data-chart-initialized')) {
      new Chart(chart, {
        type: "pie",
        data: {
          labels: ["Pending", "In Progress", "Done"],
          datasets: [{
            data: [pendingCount, inProgressCount, doneCount], // Use dynamic data here
            backgroundColor: [
              (window as any).theme.primary,
              (window as any).theme.warning,
              (window as any).theme.danger
            ],
            borderWidth: 5
          }]
        },
        options: {
          responsive: !(window as any).MSInputMethodContext,
          maintainAspectRatio: false,
          // legend: {
          //   display: false
          // },
          // cutoutPercentage: 75
        }
      });
      chart.setAttribute("data-chart-initialized", "true");
    }

  }


}
