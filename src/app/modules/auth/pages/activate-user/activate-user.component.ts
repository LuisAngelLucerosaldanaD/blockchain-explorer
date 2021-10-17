import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {onlyNumbers} from "@app/utils/validations/validations";
import {ActivateService} from "@app/modules/auth/services/activate/activate.service";
import {ActivateAccountModel} from "@app/modules/auth/models/login/login.model";

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent implements OnInit {

  public activateUserForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _activateAccount: ActivateService
  ) {
    this.activateUserForm = _fb.group({
      access_code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
  }

  ngOnInit(): void {
  }

  public onlyNumber = (value: any) => onlyNumbers(value);

  public sendCode(): void {
    if (this.activateUserForm.valid) {
      const data: ActivateAccountModel = {
        code: this.activateUserForm.get('access_code')?.value.toString()
      }
      this._activateAccount.activateAccount(data).subscribe(
        () => {

        },
        (err: Error) => {

        }
      )
    } else {
      console.log(this.activateUserForm.value);
    }
  }

}
