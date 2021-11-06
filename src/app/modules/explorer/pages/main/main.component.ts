import {Component, OnDestroy, OnInit} from '@angular/core';
import {onlyNumbers} from "@app/utils/validations/validations";
import {Subscription} from "rxjs";
import {
  Block,
  DataTransaction, Miner,
  PaginationModel,
  Transaction
} from "@app/modules/explorer/models/explorer/explorer.model";
import {ExplorerService} from "@app/modules/explorer/service/explorer/explorer.service";
import {InputSearchModel, ToastService} from "ecapture-ng-ui";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis
} from "ng-apexcharts";
import {styleInpSearch} from "@app/utils/constants/data";

@Component({
  selector: 'app-explorer',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  public blocks: Block[] = [];
  public transactions: Transaction[] = [];
  public dataSearch: any;
  public lastIBlock: Block = {
    created_at: "",
    data: "",
    difficulty: 0,
    hash: "",
    id: 0,
    id_user: "",
    last_validation_date: "",
    mined_at: "",
    mined_by: "",
    nonce: 0,
    prev_hash: "",
    status_id: 0,
    timestamp: "",
    updated_at: ""
  };
  public lastTransactions: any;
  public pagination: PaginationModel;
  public ecStyle: InputSearchModel = styleInpSearch;

  public series: ApexAxisChartSeries;
  public chart: ApexChart;
  public xaxis: ApexXAxis;
  public dataLabels: ApexDataLabels;
  public grid: ApexGrid;
  public stroke: ApexStroke;
  public title: ApexTitleSubtitle;
  public qrInfo: string = '';
  public text: any;
  public isSelectedTransaction: boolean = false;
  public isSelectedMiner: boolean = false;
  public isSelectedBlock: boolean = false;
  public selectedTransaction: Transaction = {
    amount: 0,
    block: 0,
    created_at: "",
    data: "",
    from: "",
    id: "",
    to: "",
    type_id: 0,
    updated_at: ""
  };
  public selectedBlock: Block = {
    created_at: "",
    data: "",
    difficulty: 0,
    hash: "",
    id: 0,
    id_user: "",
    last_validation_date: "",
    mined_at: "",
    mined_by: "",
    nonce: 0,
    prev_hash: "",
    status_id: 0,
    timestamp: "",
    updated_at: ""
  };
  public isBlockPage: boolean = false;
  public lengthTransactionBlockSelected: number = 0;
  public token: string = '';
  public dataTransaction: DataTransaction = {description: "", entities: [], file: [], name: ""};
  public miner: Miner = {
    birth_date: "",
    block_date: "",
    cellphone: "",
    created_at: "",
    deleted_at: "",
    disabled_date: "",
    email: "",
    failed_attempts: 0,
    full_path_photo: "",
    id: "",
    id_number: "",
    id_type: 0,
    id_user: "",
    is_deleted: false,
    last_change_password: "",
    last_login: "",
    lastname: "",
    name: "",
    nickname: "",
    real_ip: "",
    recovery_account_at: "",
    rsa_private: "",
    rsa_public: "",
    status_id: 0,
    updated_at: "",
    verified_at: "",
    verified_code: ""
  }

  constructor(
    private explorerService: ExplorerService,
    private _messageService: ToastService
  ) {
    this.pagination = {limit: 1, offset: 10}
    this.series = [
      {
        name: "Açaí",
        data: [10, 41, 200, 51, 100, 62, 69, 400, 148, 45, 781, 78]
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
        colors: ["#f3f3f3", "transparent"],
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
    this.getToken();
  }

  ngOnInit(): void {
    this.getBlocks();
    this.transactions = [];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getBlocks(): void {
    this.isBlockPage = true;
    this.subscription.add(
      this.explorerService.GetBlocks(this.pagination).subscribe(
        (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
          } else {
            if (res.data) {
              this.blocks = res.data;
              this.lastIBlock = this.blocks[0];
              this.getTransactionsFromBlock(this.lastIBlock);
            }
          }
          this.isBlockPage = false;
        },
        (err: Error) => {
          this.isBlockPage = false;
          console.error(err.message);
          this._messageService.add({type: 'error', message: 'Conexión perdida con el servidor!', life: 5000});
        }
      )
    );
  }

  public  getTransactionsFromBlock(block: Block): void {
    this.transactions = [];
    this.transactions = [];
    this.transactions = JSON.parse(block.data);
    if (this.transactions.length > 0) this.lastTransactions = this.transactions[0];
  }

  public onlyNumbers = (value: string) => onlyNumbers(value);

  public getBlocksByID(): void {
    this.isBlockPage = true;
    if (this.dataSearch === '' || this.dataSearch === undefined) {
      this.getBlocks();
      this.isBlockPage = false;
    } else {
      this.subscription.add(
        this.explorerService.getBlockById(parseInt(this.dataSearch, 10)).subscribe(
          (res) => {
            if (res.error) {
              this._messageService.add({type: 'error', message: res.msg, life: 5000});
            } else {
              if (res.data) {
                console.log(res.data);
                this.blocks = res.data;
                this.lastIBlock = res.data[0];
                this.getTransactionsFromBlock(this.lastIBlock);
              }
            }
            this.isBlockPage = false;
          },
          (err: Error) => {
            console.error(err.message);
            this.isBlockPage = false;
            this._messageService.add({type: 'error', message: 'Conexión perdida con el servidor!', life: 5000});
          }
        )
      );
    }
  }

  public selectTransactions(position: number): void {
    this.selectedTransaction = this.transactions[position];
    this.isSelectedTransaction = true;
    this.qrInfo = `https://lion.scan.com.co/explorer/viewer?info=transaction&id=${this.selectedTransaction.id}&id-ex=${this.lastIBlock.id}`;
    this.getDataFromTransaction(this.selectedTransaction.data);
  }

  public selectMiner(): void {
    this.subscription.add(
      this.explorerService.getMinerById(this.lastIBlock.mined_by).subscribe(
        (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
          } else {
            if (res.data) {
              this.miner = res.data;
              this.isSelectedMiner = true;
              this.qrInfo = 'https://lion.scan.com.co/explorer/miner?info=miner&id=' + this.lastIBlock.mined_by;
            }
          }
        },
        (err: Error) => {
          console.error(err.message);
          this._messageService.add({type: 'error', message: 'Conexión perdida con el servidor!', life: 5000});
        }
      )
    );
  }

  public selectBlock(position: number): void {
    this.selectedBlock = this.blocks[position];
    this.isSelectedBlock = true;
    this.lengthTransactionBlockSelected = JSON.parse(this.selectedBlock.data).length;
    this.qrInfo = 'https://lion.scan.com.co/explorer/viewer?info=block&id=' + this.selectedBlock.id;
  }

  public getTotalTransactionFormBlock(transactions: string): number {
    return JSON.parse(transactions).length;
  }

  private getToken(): void {
    const tokenTemp = sessionStorage.getItem('access-token');
    if (tokenTemp) this.token = tokenTemp;
  }

  public getDataFromTransaction(data: string): void {
    if (data !== '') this.dataTransaction = JSON.parse(data);
  }

}
