import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from "rxjs";
import {ExplorerService} from "@app/modules/explorer/service/explorer/explorer.service";
import {Credential} from "@app/modules/explorer/models/explorer/explorer.model";
import {getTokenExpirationDate, getTokenUser, isTokenExpired} from "@app/utils/validations/validations";
import {decryptText} from "@app/utils/crypto/crypto";
import {DropdownModel, ToastService} from "ecapture-ng-ui";
import {ToastStyleModel} from "ecapture-ng-ui/lib/modules/toast/model/toast.model";
import {toastDataStyle} from "@app/utils/constants/data";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CredentialInterceptor} from "@app/modules/explorer/service/interceptor/credential.interceptor";

@Component({
  selector: 'app-credential-viewer',
  templateUrl: './credential-viewer.component.html',
  styleUrls: ['./credential-viewer.component.scss'],
  providers: [
    ExplorerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialInterceptor,
      multi: true
    }
  ]
})
export class CredentialViewerComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();
  public sec1: boolean = true;
  public documentSelected: string = '';

  public credential: Credential = {description: "", files: [], identifiers: [], name: ""};
  private readonly token: string;
  private dataToken: any;
  private key: string = '';
  public isBlockPage: boolean = false;
  public ecDropFile: DropdownModel;
  public isError: boolean = false;
  public isValidToken: boolean = true;
  public filesData: any = [];
  public readonly toastStyle: ToastStyleModel = toastDataStyle;
  public isloggedIn: boolean = true;

  public password: string = '';

  private _second = 1000;
  private _minute = this._second * 60;
  private _hour = this._minute * 60;
  private _day = this._hour * 24;
  private end: any;
  private now: any;
  public day: any;
  public hours: any;
  public minutes: any;
  public seconds: any;
  private source = timer(0, 1000);

  public isTokenExpired: boolean = false;

  public msmToken: string = '';


  constructor(
    private _explorerService: ExplorerService,
    private _messageService: ToastService
  ) {
    this.ecDropFile = {
      headerLabel: {
        label: '',
        color: 'text-outline-gray-3',
        font: '',
        size: ''
      },
      placeholder: {
        label: 'Anexos',
        color: 'text-outline-gray-3',
        font: '',
        size: ''
      },
      container: {
        background: 'bg-container-gray-1',
        border: {
          color: 'border-container-gray-1',
          size: 'border-4',
          round: 'rounded-lg',
          style: 'border-solid',
          hover: 'border-outline-gray-4'
        }
      },
      optional: false,
      optionContainer: {
        background: 'bg-container-gray-1 z-50',
        border: {
          color: 'border-outline-gray-4',
          size: 'border-2',
          round: 'rounded',
          style: 'border-solid',
          hover: 'bg-outline-gray-4'
        }
      },
    };
    this.token = this.getUrlParams();
    if (this.token !== '') {
      if (!isTokenExpired(this.token)) {
        this.dataToken = getTokenUser(this.token);
        this.initClock();
        this.isloggedIn = false;
      } else {
        this.msmToken = 'La credencial ha expirado!';
        this.isTokenExpired = true;
        this.isBlockPage = false;
      }
    } else {
      this.isValidToken = false;
      this.isError = true;
      this.isBlockPage = false;
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private getTransaction(transactionId: string, blockId: number): void {
    this._subscription.add(
      this._explorerService.getTransactionOfCredential(transactionId, blockId).subscribe(
        (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
            this.isError = true;
          } else {
            if (res.data) {
              this.credential = JSON.parse(decryptText(res.data.data, '204812730425442A472D2F423F452847'));
              for (const item of this.credential.files) {
                this.filesData.push({label: item.name, value: item.file_encode});
              }
              if (this.credential.files.length) {
                this.documentSelected = this.credential.files[0].file_encode;
                this.ecDropFile.placeholder.label = this.credential.files[0].name;
              }
            }
          }
          this.isBlockPage = false;
        },
        (err: Error) => {
          console.error(err.message);
          this._messageService.add({type: 'error', message: 'Conexión perdida con el servidor!', life: 5000});
          this.isError = true;
        }
      )
    );
  }

  public validateData(position: number): boolean {
    for (let item of this.credential.identifiers[position].attributes) {
      if (!!this.dataToken.credential.attributes_id.find((key: any) => key === item.id)) return true;
    }
    return false;
  }

  public validateAttributes(id: number): boolean {
    return !!this.dataToken.credential.attributes_id.find((key: any) => key === id);
  }

  public validateFileData(): boolean {
    for (let item of this.credential.files) {
      if (!!this.dataToken.credential.files_id.find((key: any) => key === item.id_file)) return true;
    }
    return false;
  }

  private getUrlParams(): string {
    const urlData = new URL(document.location.toString());
    const ObjectToken = urlData.searchParams.get('token');
    if (ObjectToken !== '' && ObjectToken) {
      sessionStorage.setItem('credential-token', ObjectToken);
    }
    return ObjectToken || '';
  }

  public changeDocument(value: string): void {
    for (const file of this.credential.files) {
      if (file.name === value) this.documentSelected = file.file_encode;
    }
  }

  private getCrendential(): void {
    this.isBlockPage = true;
    this._subscription.add(
      this._explorerService.getAppId().subscribe(
        (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
          } else {
            this.key = atob(res.data);
            this.getTransaction(this.dataToken.credential.transaction_id, this.dataToken.credential.block);
          }
        },
        (err: Error) => {
          console.error(err.message);
          this.isBlockPage = false;
          this.isValidToken = false;
          this.isError = true;
          this._messageService.add({type: 'error', message: 'Conexión perdida con el servidor!', life: 5000});
        }
      )
    );
  }

  public showCredential(): void {
    if (this.password !== '') {
      if (this.password === decryptText(this.dataToken.credential.verify, '204812730425442A472D2F423F452847')) {
        this.isloggedIn = true;
        this.getCrendential();
      } else {
        this._messageService.add({type: 'warning', message: 'Contraseña incorrecta!', life: 5000});
      }
    } else {
      this._messageService.add({type: 'error', message: 'Debe ingresar la contraseña!', life: 5000});
    }
  }

  private initClock(): void {
    const ttl = getTokenExpirationDate(this.token);
    this._subscription.add(
      this.source.subscribe(() => {
        this.now = new Date();
        this.end = new Date(ttl);
        this.showDate();
      })
    );

  }

  private showDate(): void {
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);

    if (this.seconds === 0 && this.minutes === 0 && this.hours === 0 && this.day === 0) {
      this.msmToken = 'El Tiempo para ver la credencial ha expirado!';
      this.isloggedIn = true;
      this.isValidToken = true;
      this.isBlockPage = false;
      this.isError = false;
      this.isTokenExpired = true;
      this._messageService.add({type: 'error', message: 'El token ha expirado!', life: 5000});
    }
  }
}
