import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivateService} from "@app/modules/auth/services/activate/activate.service";
import {getTokenUser, onlyNumbers} from "@app/utils/validations/validations";
import {ActivateAccountModel} from "@app/modules/auth/models/login/login.model";
import {ToastStyleModel} from "ecapture-ng-ui/lib/modules/toast/model/toast.model";
import {toastDataStyle} from "@app/utils/constants/data";
import {ToastService} from "ecapture-ng-ui";

@Component({
  selector: 'app-activate-wallet',
  templateUrl: './activate-wallet.component.html',
  styleUrls: ['./activate-wallet.component.scss']
})
export class ActivateWalletComponent implements OnInit {

  public activateWalletForm: FormGroup;
  public isVerified: boolean = false;
  public tokenUser: any;
  public isBlock: boolean = false;
  public readonly toastStyle: ToastStyleModel = toastDataStyle;

  constructor(
    private _fb: FormBuilder,
    private _activateWallet: ActivateService,
    private _messageService: ToastService
  ) {
    this.activateWalletForm = _fb.group({
      mmemonic: ['', Validators.required],
      id_wallet: ['', Validators.required],
    });
    const urlParams = new URL(window.location.href);
    this.tokenUser = getTokenUser(urlParams.searchParams.get('token') || '').user;
  }

  ngOnInit(): void {
  }

  public onlyNumber = (value: any) => onlyNumbers(value);

  public sendCode(): void {
    if (this.activateWalletForm.valid) {
      this.isBlock = true;
      const data = {
        id: this.activateWalletForm.get('id_wallet')?.value.toString(),
        mnemonic: this.activateWalletForm.get('mmemonic')?.value.toString()
      }
      this._activateWallet.activateWallet(data).subscribe(
        (res) => {
          if (res.error) {
            this._messageService.add({type: 'warning', message: res.msg, life: 5000});
          } else {
            this.isVerified = true;
          }
          this.isBlock = false;
        },
        (err: Error) => {
          this._messageService.add({type: 'warning', message: 'Conexión perdida con el servidor!', life: 5000});
          this.isBlock = false;
        }
      )
    } else {
      this._messageService.add({type: 'warning', message: 'Complete correctamte el campo!', life: 5000});
      console.log(this.activateWalletForm.value);
    }
  }
}
