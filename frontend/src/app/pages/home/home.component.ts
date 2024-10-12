import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';
import { TasksService } from '../../services/tasks/tasks.service';
import { Chart } from 'chart.js';
import * as Chartjs from "chart.js";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    public task_service: TasksService,
    public settings: SettingsService
  ) {
    const controllers: any = Object.values(Chartjs).filter(
      (chart: any) => chart.id !== undefined
    );

    Chart.register(...controllers);

  }

  ngOnInit(): void {
    this.task_service.getTaskStatusCounts()
    this.settings.loader = true;
    setTimeout(() => {
      if (this.task_service.homeStats.stats) {
        this.initializePieChart(
          '.chart-pie',
          this.task_service.homeStats.stats.pending,
          this.task_service.homeStats.stats.inProgress,
          this.task_service.homeStats.stats.done
        );
      }

      if (this.task_service.homeStats.admin_stats) {
        this.initializePieChart(
          '.chart-pie-manager',
          this.task_service.homeStats.admin_stats.pending,
          this.task_service.homeStats.admin_stats.inProgress,
          this.task_service.homeStats.admin_stats.done
        );
      }
      this.settings.loader = false;
    }, 5000);
  }


  //  var chartsPie = document.querySelectorAll(".chart-pie");


  initializePieChart(role: string, pendingCount: any, inProgressCount: any, doneCount: any) {
    var chartsPie = document.querySelectorAll(role);

    chartsPie.forEach((chart: any) => {
      if (!chart.getAttribute('data-chart-initialized')) {
        new Chart(chart, {
          type: "pie",
          data: {
            labels: ["Pending", "In Progress", "Done"],
            datasets: [{
              data: [pendingCount, inProgressCount, doneCount], // Use dynamic data here
              backgroundColor: [
                'blue', 'brown', 'red'
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

    });
  }


}
