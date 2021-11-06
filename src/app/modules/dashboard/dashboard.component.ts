import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartComponent} from "ng-apexcharts";
import {LoginService} from "@app/modules/auth/services/login.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // @ts-ignore
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: any;
  public chartOptionsGeneral: any;

  public activeSidebar: boolean = false;
  public activeMenu: boolean = false;

  constructor(
    private _loginService: LoginService,
  ) {
    this.chartOptions = {
      series: [44, 55, 67, 83],
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px",
              color: '#C6C6C6'
            },
            total: {
              show: true,
              label: "Total",
              color: '#C6C6C6',
              formatter: function(w: any) {
                return "249";
              }
            }
          }
        }
      },
      labels: ["Apples", "Oranges", "Bananas", "Berries"]
    };
    this.chartOptionsGeneral = {
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ],
        labels: {
          style: {
            colors: '#C6C6C6',
            fontSize: "12px"
          }
        }
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#C6C6C6',
            fontSize: "12px"
          }
        }
      },
      legend: {
        show: true,
        labels: {
          colors: '#C6C6C6'
        },
      },
    };
  }

  ngOnInit(): void {
  }

  public logout() {
    this._loginService.logout();
  }

}
