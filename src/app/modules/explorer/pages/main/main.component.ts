import {Component, OnDestroy, OnInit} from '@angular/core';
import {onlyNumbers} from "@app/utils/validations/validations";
import {Subscription} from "rxjs";
import {PaginationModel} from "@app/modules/explorer/models/explorer/explorer.model";
import {ExplorerService} from "@app/modules/explorer/service/explorer/explorer.service";
import {InputSearchModel} from "ecapture-ng-ui";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis
} from "ng-apexcharts";

@Component({
  selector: 'app-explorer',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  public blocks: any;
  public transactionsBlock: any;
  public dataSearch: any;
  public lastIBlock: any;
  public lastTransactions: any;
  public pagination: PaginationModel;
  public ecStyle: InputSearchModel;

  public series: ApexAxisChartSeries;
  public chart: ApexChart;
  public xaxis: ApexXAxis;
  public dataLabels: ApexDataLabels;
  public grid: ApexGrid;
  public stroke: ApexStroke;
  public title: ApexTitleSubtitle;
  public qrInfo: string = 'this is a qr code';
  public text: any;

  constructor(
    private explorerService: ExplorerService
  ) {
    this.pagination = {
      limit: 0,
      offset: 0
    }
    this.ecStyle = {
      alert: {
        info: {
          font: 'font-rubik',
          color: 'text-outline-alert-info',
          label: '',
          size: 'text-base'
        },
        error: {
          font: 'font-rubik',
          color: 'text-outline-alert-error',
          label: '',
          size: 'text-base'
        },
        success: {
          font: 'font-rubik',
          color: 'text-outline-alert-success',
          label: '',
          size: 'text-base'
        },
        warning: {
          font: 'font-rubik',
          color: 'text-outline-alert-warning',
          label: '',
          size: 'text-base'
        },
      },
      headerLabel: {
        label: '',
        color: 'text-outline-blue-2',
        font: 'font-rubik',
        size: 'text-base'
      },
      placeholder: {
        label: 'Search by address / block / token',
        color: 'text-outline-blue-2',
        font: 'font-rubik',
        size: 'text-base'
      },
      error: {
        error: false,
        color: '',
        text: {
          label: '',
          color: '',
          font: 'font-rubik',
          size: ''
        }
      },
      container: {
        background: 'bg-container-gray-1',
        border: {
          color: 'border-container-gray-1',
          size: 'border-4',
          round: 'rounded-lg',
          style: 'border-solid',
          hover: 'border-container-gray-3'
        }
      }
    }
    this.series = [
      {
        name: "Açaí",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 45, 781, 78]
      }
    ];
    this.chart = {
      height: 170,
      type: "line",
      zoom: {
        enabled: false
      }
    }
    this.dataLabels = {
      enabled: false
    }
    this.stroke = {
      curve: "straight"
    }
    this.title = {
      text: "Price Açaí by Month",
      align: "left"
    }
    this.grid = {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    }
    this.xaxis = {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    }
  }

  ngOnInit(): void {
    /*this.getBlocks();*/
    this.transactionsBlock = [];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getBlocks(): void {
    this.subscription.add(this.explorerService.GetBlocks(this.pagination, 'block').subscribe(
      (res) => {
        this.getTransactionsFromBlock(res.data);
        this.blocks = res.data;
        this.lastIBlock = this.blocks[0].id;
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  public getTransactionsFromBlock(blocks: any): void {
    this.transactionsBlock = [];
    for (const block of blocks) {
      this.transactionsBlock.push(JSON.parse(block.data));
    }
    this.lastTransactions = this.transactionsBlock[0];
  }

  public onlyNumbers = (value: string) => onlyNumbers(value);

  public getBlocksByID(): void  {
    const body = {
      id: parseInt(this.dataSearch, 10)
    };
    if (this.dataSearch === '' || this.dataSearch === undefined) {
      this.getBlocks();
    } else {
      this.subscription.add(this.explorerService.GetBlocksById(body, 'block/id').subscribe(
        (res) => {
          this.blocks = res.data;
          console.log(res.data);
          this.getTransactionsFromBlock(res.data);
          this.lastIBlock = this.dataSearch;
        },
        (err) => {
          console.log(err);
        }
      ));
    }
  }


}
