import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivateService} from "@app/modules/auth/services/activate/activate.service";
import {getTokenUser, onlyNumbers} from "@app/utils/validations/validations";
import {ActivateAccountModel} from "@app/modules/auth/models/login/login.model";

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

  constructor(
    private _fb: FormBuilder,
    private _activateWallet: ActivateService,
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

          } else {
            this.isVerified = true;
          }
          this.isBlock = false;
        },
        (err: Error) => {
          this.isBlock = false;
        }
      )
    } else {
      console.log(this.activateWalletForm.value);
    }
  }
}
