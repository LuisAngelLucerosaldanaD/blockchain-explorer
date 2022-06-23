import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Block } from './models/data-viewer';
import { ExplorerService } from './services/explorer.service';
@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {
  private time: any;
  public  chartOptions: any;

  public isMenuBurger: boolean = false;
  public blocks: Block[]=[]
  Highcharts = Highcharts;
  constructor (private _explorerservice: ExplorerService){
    this.getAllBlocks()
  }

  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'area'
      },
      xAxis: {
        categories: ['4:04 AM', '7:04 AM', '10:04 AM', '1:04 PM', '4:04 PM', '10:00 PM', '10:04 PM'],
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent ',
      },

      plotOptions: {
        series: {
          fillColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [
              [0, '#EE6A14 '],
              [1, ('#ffffff ')]
            ]
          }
        }
      },

      series: [{
        color: '#EE6A14 ',
        data: [50.5,90.9, 40.9, 90.0, 144.0, 99.0, 110.6]
      }]

    };

    HC_exporting(Highcharts);

    this.time = setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
  
  private getAllBlocks():void{
    this._explorerservice.getBlocks().subscribe({
      next:(res) => {
        if (res.error){
          console.log(res.msg)
        }else {
          this.blocks=res.data
        }

      }
    })
  }

}
