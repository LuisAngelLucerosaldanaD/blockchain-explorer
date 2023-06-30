import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, timer} from "rxjs";
import {GetTokenExpirationDate, GetTokenData, IsInvalidToken} from "@app/core/utils/validations/validations";
import {Time} from "@app/core/utils/constant/constant";
import {ActivatedRoute} from "@angular/router";
import {Message} from "@app/core/models/message";
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {Token} from "@app/core/models/token";
import {CredentialService} from "@app/core/services/credential/credential.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, Validators} from "@angular/forms";
import {CredentialShared} from "@app/core/models/credential";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription = new Subscription();
  private _source: Observable<number> = timer(0, 1000);
  private _token: string = '';
  private _tokenData!: Token;
  public password: FormControl = new FormControl('', Validators.required);
  public day: number = 0;
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;
  public isFinish: boolean = false;
  public isAuth: boolean = false;
  public message!: Message;
  public credential!: CredentialShared;
  public isLoading: boolean = false;

  constructor(
    private _routerParam: ActivatedRoute,
    private _messageService: ToastService,
    private _credentialService: CredentialService
  ) {
    this.getParams();
  }

  ngOnInit(): void {
    this.initSession();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  /**
   * Método que obtiene la información de una credencial
   * @private
   */
  public getDataCredential(): void {

    if (this.password.invalid) {
      this._messageService.add({type: 'warning', message: 'La contraseña es requerida'});
      return;
    }

    this.isLoading = true;
    this._subscriptions.add(
      this._credentialService.getCredential(this._tokenData.url, this.password.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
            return;
          }

          this.isAuth = true;
          this.credential = res.data[0];
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.isLoading = false;
          this._messageService.add({
            type: 'error',
            message: 'No se pudo consultar la credencial, intente nuevamente',
            life: 5000
          });
        }
      })
    );
  }

  /**
   * Método que permiete copiar los atributos de la credencial
   */
  public copyInClipBoard(): void {
    navigator.clipboard.writeText(JSON.stringify(this.credential.attributes));
  }

  /**
   * Método que valida la existensia del token de sesión y si este es valido
   * @private
   */
  private initSession(): void {
    if (!this._token) {
      this._messageService.add({
        type: 'warning',
        message: 'No está autorizado para firmar este documento!',
        life: 5000
      });
      this.message = {
        icon: 'Warning',
        message: 'No está autorizado para firmar este documento!'
      };
      this.isFinish = true;
      return;
    }

    if (IsInvalidToken(this._token)) {
      this._messageService.add({type: 'warning', message: 'La credencial ha caducado!', life: 50000});
      this.message = {
        icon: 'Warning',
        message: 'La credencial ha caducado!'
      };
      this.isFinish = true;
      return;
    }

    this._tokenData = GetTokenData(this._token);
    this.initClock();
  }

  /**
   * Método que obtiene los parametros de la URL como el token y otros parametros
   * @private
   */
  private getParams(): void {
    const routeParam = this._routerParam.snapshot.queryParams;
    const token = routeParam['token'];
    if (token) {
      sessionStorage.setItem("signature-token", token);
      this._token = token;
    }
  }

  /**
   * Inicia el contador que define el tiempo de vida del documento
   * @private
   */
  private initClock(): void {
    const ttl = GetTokenExpirationDate(this._token);
    if (!ttl) {
      this._messageService.add({
        type: 'warning',
        message: 'No se pudo obtener el tiempo de vida del documento',
        life: 5000
      });
      this.isFinish = true;
      return;
    }
    this._subscriptions.add(
      this._source.subscribe(() => {
        this.showDate(ttl);
      })
    );
  }

  /**
   * Método que setea la fecha (día, hora, minutos y segundo) de expiración del documento y termina la sesión si ya expiro el documento
   * @param ttl - fecha de expiración del token de sesión
   * @private
   * @type {(ttl: string): string}
   */
  private showDate(ttl: Date): void {
    const now: any = Time.Now();
    const end: any = Time.setDate(ttl);
    let distance: number = end - now;
    this.day = Math.floor(distance / Time.DAY);
    this.hours = Math.floor((distance % Time.DAY) / Time.HOUR);
    this.minutes = Math.floor((distance % Time.HOUR) / Time.MINUTE);
    this.seconds = Math.floor((distance % Time.MINUTE) / Time.SECOND);

    if (this.seconds === 0 && this.minutes === 0 && this.hours === 0 && this.day === 0) {
      this._messageService.add({type: 'info', message: 'La sesión ha expirado!', life: 5000});
      this.isFinish = true;
      return;
    }
  }

}
