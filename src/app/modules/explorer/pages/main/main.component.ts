import {Component, OnDestroy, OnInit} from '@angular/core';
import {onlyNumbers} from "@app/utils/validations/validations";
import {Subscription} from "rxjs";
import {PaginationModel} from "@app/modules/explorer/models/explorer/explorer.model";
import {ExplorerService} from "@app/modules/explorer/service/explorer/explorer.service";

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

  constructor(private explorerService: ExplorerService) {
    this.pagination = {
      limit: 0,
      offset: 0
    }
  }

  ngOnInit(): void {
    this.getBlocks();
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

  public getBlocksByID(): void {
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
