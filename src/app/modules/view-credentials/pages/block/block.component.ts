import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ExplorerService} from '@app/modules/explorer/services/explorer.service';
import {Block, Data, Transaction} from '@app/modules/explorer/models/data-viewer';
import {Subscription} from "rxjs";
import * as Highcharts from 'highcharts';
import {ExplorerComponent} from "@app/modules/explorer/explorer.component";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {decryptText} from "@app/helpers/crypto";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  private time: any;
  public chartOptions: any;
  private _subscriptions: Subscription = new Subscription();

  public modalBlock: boolean = false;
  public modalTransaction: boolean = false;

  public isMenuBurger: boolean = false;
  // her
  public blocks: Block[] = [];
  public block!: Transaction;
  public blockById!: Block;
  public blocksSelected!: Block;
  public trxSelected!: Transaction;
  public blocksDisplay: Block[] = [];
  public transactions: Transaction[] = [];
  public transactionsDisplay: Transaction[] = [];
  public tab: string = 'blocks';
  public difficultyTotal: number = 0;

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

  // public id: number = 0;
  private localURl: URL;

  public dataTrx!: Data;
  public isLogged: boolean = false;
  // public searchBlockForm: FormGroup;

  public selectedSesstings = '';
  constructor(
    private route: ActivatedRoute,
    private _explorerService: ExplorerService,
    // private _fb: FormBuilder,
  ) {
    this.dateNowChart = new Date();
    this.dateNowChart.setDate(this.dateNowChart.getDate() - 14);
    this.localURl = new URL(document.location.href);
    // this.searchBlockForm = _fb.group({
    //   blockid: ['', Validators.required]
    // });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getBlockById();

    this.route.queryParams.subscribe(params => {
      const id = params['blockid'];
      console.log(id); // Output: 2
    });

    // this.prueba();
    // this.prueba2();
  }


  public getBlockById(): void {
    // const blockid: number = this.searchBlockForm.get('blockid')?.value;
    this._subscriptions.add(
      this._explorerService.getBlockById(1).subscribe({
        next: (res) => {
          if (res.error) {
            console.log(res.msg)
          } else {
            this.blocks.push(res.data);
            this.blocksSelected = res.data;
            this.block = JSON.parse(this.blocksSelected.data);
            // console.log(this.blocksSelected);
            // console.log(this.block);
            console.log(this.transactionsDisplay);
            console.log(this.transactions);
            this.getTransactions();
            // this.initPaginationBlocks();
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
            // this.initPaginationBlocks();
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
          return trx;
        });
        this.transactions = [...this.transactions, ...transactions];
      });

      if (this.transactions.length) {
      this.initPaginationTrx();
    }
  }

  private getTransactionsByBlock(){
      let transactions = JSON.parse(this.blockById.data) as Transaction[];
      this.getTrxOfDate(transactions);
      this.blockById.acais = transactions.reduce((amount, trxB) => amount + trxB.amount, 0);
      this.blockById.totalTrx = transactions.length;
      this.blockById.timeTrx = Math.ceil(((new Date(this.blockById.created_at).getTime()) - (new Date(this.blockById.timestamp).getTime())) / 1000);
      transactions = transactions.map((trx) => {
        trx.block = this.blockById.id;
        return trx
      });
      console.log("Transactions block",transactions);

      this.transactions = [...this.transactions, ...transactions];
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
  //
  private initPaginationTrx(): void {
      this.trxPaginationLength = Math.ceil(this.transactions.length / 10);
      this.transactionsDisplay = this.transactions.slice(this.startPageTrx, this.endPageTrx);
    }
  //
  // private initPaginationBlocks(): void {
  //     this.blocksPaginationLength = Math.ceil(this.blocks.length / 10);
  //     this.blocksDisplay = this.blocks.slice(this.startPageBlock, this.endPageBlock);
  //   }
  //
  // public beforePageBlock(): void {
  //     if (this.currentPgBlock > 1) {
  //     this.currentPgBlock--;
  //     this.startPageBlock -= 10;
  //     this.endPageBlock -= 10;
  //     this.blocksDisplay = this.blocks.slice(this.startPageBlock, this.endPageBlock);
  //   }
  // }
  // //
  // public nextPageBlock(): void {
  //     if (this.currentPgBlock < this.blocksPaginationLength) {
  //     this.currentPgBlock++;
  //     this.startPageBlock += 10;
  //     this.endPageBlock += 10;
  //     this.blocksDisplay = this.blocks.slice(this.startPageBlock, this.endPageBlock);
  //   }
  // }
  //
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
  //
  // public selectedBlock(block: Block): void {
  //     this.blocksSelected = block;
  //     this.modalBlock = true;
  //     this.urlBlock = this.localURl.origin + '/#/' + 'explorer/data-viewer?info=block&id=' + block.id;
  //   }
  //
  public selectedTrx(trx: Transaction): void {
      this.trxSelected = trx;
      this.modalTransaction = true;
      this.urlTrx = this.localURl.origin + '/#/' +  `explorer/data-viewer?info=transaction&id=${trx.id}&id-ex=${trx.block}`;
      this.blocksSelected = this.blocks.find((block) => block.id === trx.block) || this.blocks[0];

      this.dataTrx = JSON.parse(decryptText(trx.data, '204812730425442A472D2F423F452847'));
    }
  //
  // public goToFullScreen(): void {
  //     this.mapNode.nativeElement.requestFullscreen().then((res) => {}).catch((err) => {})
  //   }
  //
  // private calculateDifficulty(){
  //     let self = this;
  //     this.blocks.forEach(function(element){
  //       self.difficultyTotal += element.difficulty;
  //     });
  //   }
  // public getTransactionsAmount() {
  //     let totalTrxAmount = 0;
  //     this.transactions.forEach(function(element){
  //       totalTrxAmount += element.amount;
  //     });
  //     return totalTrxAmount;
  //   }






  // public prueba(){
  //
  //   this._explorerService.getBlockById(1).subscribe({
  //     next: (res) => {
  //       if(res.error) {
  //         console.log(res.msg);
  //       } else{
  //         this.blockById = res.data;
  //         console.log('prueba 1', this.blockById);
  //         console.log(JSON.parse(this.blockById.data));
  //       }
  //     }
  //   })
  //
  // }

  // public prueba2() {
  //
  //   this._explorerService.getBlocks(1,0).subscribe({
  //     next: (res) => {
  //       if(res.error) {
  //         console.log(res.msg);
  //       } else{
  //         this.blocks = res.data;
  //         console.log('prueba 2',this.blocks);
  //       }
  //     }
  //   })
  //
  // }
  //
  protected readonly JSON = JSON;
}

