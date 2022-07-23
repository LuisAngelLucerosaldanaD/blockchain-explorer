import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import {Block, Data, Transaction} from './models/data-viewer';
import {ExplorerService} from './services/explorer.service';
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {decryptText} from "../../helpers/crypto";

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit, OnDestroy {

  @ViewChild('map') mapNode!: ElementRef<HTMLElement>

  private time: any;
  public chartOptions: any;
  private _subscriptions: Subscription = new Subscription();

  public modalBlock: boolean = false;
  public modalTransaction: boolean = false;

  public isMenuBurger: boolean = false;
  // her
  public blocks: Block[] = [];
  public blocksSelected!: Block;
  public trxSelected!: Transaction;
  public blocksDisplay: Block[] = [];
  public transactions: Transaction[] = [];
  public transactionsDisplay: Transaction[] = [];
  public tab: string = 'blocks';

  public Highcharts: any = Highcharts;

  private limit: number = 100;
  private offset: number = 0;

  public blocksPaginationLength: number = 0;
  public trxPaginationLength: number = 0;
  public currentPgBlock: number = 1;
  public currentPgTrx: number = 1;

  private startPageBlock: number = 0;
  private startPageTrx: number = 0;
  private endPageTrx: number = 10;
  private endPageBlock: number = 10;

  public urlBlock: string = '';
  public urlTrx: string = '';

  public isBlockPage: boolean = false;

  private readonly dateNowChart: Date;

  private localURl: URL;

  public dataTrx!: Data;

  constructor(
    private _explorerService: ExplorerService
  ) {
    this.getAllBlocks();
    this.dateNowChart = new Date();
    this.dateNowChart.setDate(this.dateNowChart.getDate() - 14);
    this.localURl = new URL(document.location.href);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
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
      title: {
        text: 'Açai Transactions in 14 days'
      },
      plotOptions: {
        series: {
          fillColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [
              [0, '#EE6A14'],
              [1, ('#ffffff')]
            ]
          }
        }
      },

      series: [{
        color: '#EE6A14',
        type: 'area',
        name: 'Açai',
        data: [50.5, 90.9, 40.9, 90.0, 144.0, 99.0, 110.6]
      }]
    };

    HC_exporting(Highcharts);

    this.time = setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  private getAllBlocks(): void {
    this.isBlockPage = true;
    this._subscriptions.add(
      this._explorerService.getBlocks(this.limit, this.offset).subscribe({
        next: (res) => {
          if (res.error) {
            console.log(res.msg)
          } else {
            this.blocks = res.data;
            this.getTransactions();
            this.initPaginationBlocks();
          }
          this.isBlockPage = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.isBlockPage = false;
        }
      })
    );
  }

  private getTransactions(): void {
    this.blocks.forEach((block, i) => {
      let transactions = JSON.parse(block.data) as Transaction[];
      this.getTrxOfDate(transactions);
      this.blocks[i].acais = transactions.reduce((amount, trxB) => amount + trxB.amount, 0);
      this.blocks[i].totalTrx = transactions.length;
      this.blocks[i].timeTrx = Math.ceil(((new Date(this.blocks[i].created_at).getTime()) - (new Date(this.blocks[i].timestamp).getTime())) / 1000);
      transactions = transactions.map((trx) => {
        trx.block = this.blocks[i].id;
        return trx
      });
      this.transactions = [...this.transactions, ...transactions];
    });

    if (this.transactions.length) {
      this.initPaginationTrx();
    }
  }

  private getTrxOfDate(transactions: Transaction[]): void {
    const trxOfDate: Transaction[] = [];
    for (const transaction of transactions) {
      const trxDate = new Date(transaction.created_at);
      if (trxDate >= this.dateNowChart) {
        trxOfDate.push(transaction);
      }
    }
  }

  private initPaginationTrx(): void {
    this.trxPaginationLength = Math.ceil(this.transactions.length / 10);
    this.transactionsDisplay = this.transactions.slice(this.startPageTrx, this.endPageTrx);
  }

  private initPaginationBlocks(): void {
    this.blocksPaginationLength = Math.ceil(this.blocks.length / 10);
    this.blocksDisplay = this.blocks.slice(this.startPageBlock, this.endPageBlock);
  }

  public beforePageBlock(): void {
    if (this.currentPgBlock > 1) {
      this.currentPgBlock--;
      this.startPageBlock -= 10;
      this.endPageBlock -= 10;
      this.blocksDisplay = this.blocks.slice(this.startPageBlock, this.endPageBlock);
    }
  }

  public nextPageBlock(): void {
    if (this.currentPgBlock < this.blocksPaginationLength) {
      this.currentPgBlock++;
      this.startPageBlock += 10;
      this.endPageBlock += 10;
      this.blocksDisplay = this.blocks.slice(this.startPageBlock, this.endPageBlock);
    }
  }

  public beforePageTrx(): void {
    if (this.currentPgTrx > 1) {
      this.currentPgTrx--;
      this.startPageTrx -= 10;
      this.endPageTrx -= 10;
      this.transactionsDisplay = this.transactions.slice(this.startPageTrx, this.endPageTrx);
    }
  }

  public nextPageTrx(): void {
    if (this.currentPgTrx < this.trxPaginationLength) {
      this.currentPgTrx++;
      this.startPageTrx += 10;
      this.endPageTrx += 10;
      this.transactionsDisplay = this.transactions.slice(this.startPageTrx, this.endPageTrx);
    }
  }

  public selectedBlock(block: Block): void {
    this.blocksSelected = block;
    this.modalBlock = true;
    this.urlBlock = this.localURl.origin + '/#/' + 'explorer/data-viewer?info=block&id=' + block.id;
  }

  public selectedTrx(trx: Transaction): void {
    this.trxSelected = trx;
    this.modalTransaction = true;
    this.urlTrx = this.localURl.origin + '/#/' +  `explorer/data-viewer?info=transaction&id=${trx.id}&id-ex=${trx.block}`;
    this.blocksSelected = this.blocks.find((block) => block.id === trx.block) || this.blocks[0];

    this.dataTrx = JSON.parse(decryptText(trx.data, '204812730425442A472D2F423F452847'));
  }

  public goToFullScreen(): void {
    this.mapNode.nativeElement.requestFullscreen().then((res) => {}).catch((err) => {})
  }

}


