import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from "rxjs";
import {getTokenExpirationDate, getTokenUser, isTokenExpired} from "../../../../helpers/helpers";
import {ActivatedRoute} from "@angular/router";
import {decryptText} from "../../../../helpers/crypto";
import {ExplorerService} from "../../../explorer/services/explorer.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Attribute, Data} from "../../../explorer/models/data-viewer";
import {Files} from "../../../explorer/models/explorer.models";
import Split from 'split.js'

@Component({
  selector: 'app-credential-viewer',
  templateUrl: './credential-viewer.component.html',
  styleUrls: ['./credential-viewer.component.scss']
})
export class CredentialViewerComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();
  public isTokenExpired: boolean = false;
  private splitInstance: any;

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

  public password: string = '';
  public isLoggedIn: boolean = false;

  private readonly token: string = '';

  public credential!: Data;

  private dataToken: any;

  public isTokenValid: boolean = false;
  public msgAlert: string = '';
  public isBlockPage: boolean = false;

  public dataDisplay: Attribute[] = [];

  public files: Files[] = [];
  public fileSelected!: Files;

  constructor(
    public activatedRoute: ActivatedRoute,
    private _explorerService: ExplorerService
  ) {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token') || '';
  }

  ngOnInit(): void {
    if (this.token) {
      if (isTokenExpired(this.token)) {
        this.isTokenValid = false;
        this.msgAlert = 'El tiempo para ver la credencial ha expirado.';
      } else {
        this.initClock();
        this.dataToken = getTokenUser(this.token);
        this.isTokenValid = true;
      }
    } else {
      this.msgAlert = 'No está autorizado para poder ver este recurso.';
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this.splitInstance.destroy();
  }

  public showCredential(): void {
    if (this.password !== '') {
      if (this.password === decryptText(this.dataToken.credential.verify, '204812730425442A472D2F423F452847')) {
        this.isLoggedIn = true;
        this.getTransaction(this.dataToken.credential.transaction_id, this.dataToken.credential.block);
      } else {
        alert('La constraseña ingresada no es correcta');
      }
    } else {
      alert('Debe ingresar la contraseña para poder ver la credencial!');
    }
  }

  private getTransaction(transactionId: string, blockId: number): void {
    this.isBlockPage = true;
    this._subscription.add(
      this._explorerService.getTransactionById(transactionId, blockId).subscribe({
        next: (res) => {
          if (res.error) {
            this.isBlockPage = false;
          } else {
            if (res.data) {
              this.credential = JSON.parse(decryptText(res.data.data, '204812730425442A472D2F423F452847'));
              console.log(this.credential);
              if (this.credential.files.length) {
                this.getCredentialFiles();
              }
              for (const identifier of this.credential.identifiers) {
                for (const attribute of identifier.attributes) {
                  if (this.dataToken.credential.attributes_id.find((key: any) => key === attribute.id)) {
                    this.dataDisplay.push(attribute);
                  }
                }
              }
            }
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isBlockPage = false;
          console.error(err.message);
        }
      })
    );
  }

  public getCredentialFiles(): void {
    this.isBlockPage = true;
    this._subscription.add(
      this._explorerService.getFilesByTransactionID(this.dataToken.credential.transaction_id).subscribe({
        next: (res) => {
          if (res.error) {
            // this._messageService.add({type: 'error', message: res.msg, life: 5000});
          } else {
            this.files = res.data;
            this.fileSelected = res.data[0];
            this.splitInstance = Split(['.section-a', '.section-b'], {
              sizes: [70, 30],
              minSize: [0, 0]
            });
          }
          this.isBlockPage = false;
        },
        error: (err: HttpErrorResponse) => {
          this.isBlockPage = false;
          console.error(err)
        }
      })
    )
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

    if (this.seconds <= 0 && this.minutes <= 0 && this.hours <= 0 && this.day <= 0) {
      this.isLoggedIn = false;
      this.isBlockPage = false;
      this.isTokenExpired = true;
      this.msgAlert = 'El tiempo para ver la credencial ha expirado.';
    }
  }

  public copyToClipboard(): void {
    let value: string = '';
    this.dataDisplay.map(item => {
      value += Object.entries(item).map(value => value.join('=')) + ';';
    });
    navigator.clipboard.writeText(value)
      .then(() => {
        console.log('Copiado al portapapeles')
      })
      .catch(err => {
        console.error('No se pudo copiar al portapapeles')
      })
  }

}
