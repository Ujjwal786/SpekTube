import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartOptions } from 'chart.js';
import { registerables } from 'chart.js';
import { UserCookiesService } from 'src/app/services/user-cookies.service';
import { SessionService } from 'src/app/services/session.service';
import { AdminSigninComponent } from '../admin-signin/admin-signin.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart-component.component.html',
  styleUrls: ['./chart-component.component.css']
})
export class ChartComponent implements OnInit {
  lineChart!: Chart;

  constructor(private http: HttpClient, private userCookies:UserCookiesService, private session:SessionService, private router:Router, private dialog:MatDialog) {
    const sessionData = this.session.getSessionData();
   
    if (!sessionData){
        this.router.navigate(['/home']); 
        this.dialog.open(AdminSigninComponent,{
          width:'200px;'
        });
      
    }
  }

  ngOnInit() {
    Chart.register(...registerables);
    this.fetchGraphData();
  }

  fetchGraphData() {
    const id = this.userCookies.getCookieValues().id;
    const url = 'https://localhost:7065/api/GraphData/For User/'+id;

    this.http.get<any>(url).subscribe(
      (data) => {
        this.createLineChart(data);
      },
      (error) => {
        console.log('An error occurred while fetching graph data:', error);
      }
    );
  }

  createLineChart(data: any[]) {
    const lineChartCtx = document.querySelector('#lineChart') as HTMLCanvasElement;

    const labels = data.map((item) => item.monthName);
    const viewsData = data.map((item) => item.total_Views);
    const likesData = data.map((item) => item.total_Likes);
    const dislikesData = data.map((item) => item.total_Dislikes);
    const subscribersData = data.map((item) => item.total_Subscribers);

    this.lineChart = new Chart(lineChartCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Views',
            data: viewsData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)'
          },
          {
            label: 'Likes',
            data: likesData,
            fill: false,
            borderColor: 'rgb(255, 99, 132)'
          },
          {
            label: 'Dislikes',
            data: dislikesData,
            fill: false,
            borderColor: 'rgb(54, 162, 235)'
          },
          {
            label: 'Subscriber',
            data: subscribersData,
            fill: false,
            borderColor: 'rgb(0, 0, 0)'
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      } as ChartOptions
    });
  }
}
