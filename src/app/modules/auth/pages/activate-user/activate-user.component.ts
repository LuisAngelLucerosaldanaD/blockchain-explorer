import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getTokenUser, onlyNumbers} from "@app/utils/validations/validations";
import {ActivateService} from "@app/modules/auth/services/activate/activate.service";
import {ActivateAccountModel} from "@app/modules/auth/models/login/login.model";
import {ToastService} from "ecapture-ng-ui";
import {ToastStyleModel} from "ecapture-ng-ui/lib/modules/toast/model/toast.model";
import {toastDataStyle} from "@app/utils/constants/data";

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent implements OnInit {

  public activateUserForm: FormGroup;
  public isVerified: boolean = false;
  public tokenUser: any;
  public isBlock: boolean = false;
  public readonly toastStyle: ToastStyleModel = toastDataStyle;

  constructor(
    private _fb: FormBuilder,
    private _activateAccount: ActivateService,
    private _messageService: ToastService
  ) {
    this.activateUserForm = _fb.group({
      access_code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
    const urlParams = new URL(window.location.href);
    this.tokenUser = getTokenUser(urlParams.searchParams.get('token') || '').user;
  }

  ngOnInit(): void {
  }

  public onlyNumber = (value: any) => onlyNumbers(value);

  public sendCode(): void {
    if (this.activateUserForm.valid) {
      this.isBlock = true;
      const data: ActivateAccountModel = {
        code: this.activateUserForm.get('access_code')?.value.toString()
      }
      console.log(this.isBlock)
      this._activateAccount.activateAccount(data).subscribe(
        (res) => {
          if (res.error) {
            this._messageService.add({type:'warning', message: res.msg, life: 5000});
          } else {
            this.isVerified = true;
          }
          this.isBlock = false;
        },
        (err: Error) => {
          this.isBlock = false;
          this._messageService.add({type:'warning', message: 'Conexión perdida con el servidor!', life: 5000});
        }
      )
    } else {
      this._messageService.add({type:'warning', message: 'Complete correctamte el campo!', life: 5000});
      console.log(this.activateUserForm.value);
    }
  }

}
