import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ExplorerService} from "@app/modules/explorer/service/explorer/explorer.service";
import {ToastService} from "ecapture-ng-ui";
import {Block, DataTransaction, Miner, Transaction} from "@app/modules/explorer/models/explorer/explorer.model";

@Component({
  selector: 'app-info-viewer',
  templateUrl: './info-viewer.component.html',
  styleUrls: ['./info-viewer.component.scss']
})
export class InfoViewerComponent implements OnInit, OnDestroy {

  public typeInfo: string = '';
  public id: string = '';
  public idExtern: string = '';
  private _subscription = new Subscription();
  public isBlockPage: boolean = false;
  public token: string = '';
  public transaction: Transaction = {
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
  public block: Block = {
    id: 0,
    data: '',
    nonce: 0,
    difficulty: 0,
    mined_by: '',
    mined_at: '',
    timestamp: '',
    hash: '',
    prev_hash: '',
    status_id: 0,
    id_user: '',
    last_validation_date: '',
    created_at: '',
    updated_at: ''
  };
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
  };
  public lengthTransactionBlockSelected: number = 0;
  public dataTransaction: DataTransaction = {description: "", entities: [], file: [], name: ""};
  public transactions: Transaction[] = [];

  constructor(
    private _explorerService: ExplorerService,
    private _messageService: ToastService
  ) {
    this.getUrlData();
    this.getToken();
  }

  ngOnInit(): void {
    this.getInfoDataById();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private getUrlData(): void {
    const urlParams = new URL(window.location.href).searchParams;
    this.typeInfo = urlParams.get('info') || '';
    this.id = urlParams.get('id') || '';
    this.idExtern = urlParams.get('id-ex') || '';
  }

  private getInfoDataById(): void {
    if (this.typeInfo === 'transaction') {
      this.getBlockByID(parseInt(this.idExtern, 10));
      this.getTransactionByID();
    } else if (this.typeInfo === 'block') {
      this.getBlockByID(parseInt(this.id, 10));
    } else if (this.typeInfo === 'miner') {
      this.getMinerByID();
    }
  }

  private getTransactionByID(): void {
    this._subscription.add(
      this._explorerService.getTransactionById(this.id, parseInt(this.idExtern)).subscribe(
        (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
          } else {
            if (res.data) this.transaction = res.data;
            console.log(res.data);
            this.getDataFromTransaction(this.transaction.data);
          }
          this.isBlockPage = false;
        },
        (error: Error) => {
          console.error(error);
          this.isBlockPage = false;
          this._messageService.add({type: 'error', message: 'Conexión perdida con el servidor!', life: 5000});
        }
      )
    );
  }

  private getMinerByID(): void {
    this._subscription.add(
      this._explorerService.getMinerById(this.id).subscribe(
        (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
          } else {
            if (res.data) this.miner = res.data;
          }
          this.isBlockPage = true;
        },
        (error: Error) => {
          console.error(error);
          this.isBlockPage = true;
          this._messageService.add({type: 'error', message: 'Conexión perdida con el servidor!', life: 5000});
        }
      )
    );
  }

  private getBlockByID(id: number): void {
    this._subscription.add(
      this._explorerService.getBlockById(id).subscribe(
        (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
          } else {
            if (res.data) {
              this.block = res.data[0];
              this.lengthTransactionBlockSelected = JSON.parse(this.block.data).length;
              this.getTransactionsFromBlock(this.block);
            }
          }
          this.isBlockPage = false;
        },
        (error: Error) => {
          console.error(error);
          this.isBlockPage = true;
          this._messageService.add({type: 'error', message: 'Conexión perdida con el servidor!', life: 5000});
        }
      )
    );
  }

  private getToken(): void {
    const tokenTemp = sessionStorage.getItem('access-token');
    if (tokenTemp) this.token = tokenTemp;
  }

  public getDataFromTransaction(data: string): void {
    if (data !== '') this.dataTransaction = JSON.parse(data);
  }

  public  getTransactionsFromBlock(block: Block): void {
    this.transactions = [];
    this.transactions = JSON.parse(block.data);
  }

}
