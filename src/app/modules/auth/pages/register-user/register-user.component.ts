import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DropdownModel, ToastService} from "ecapture-ng-ui";
import {phoneCode, toastDataStyle, typeIdentification} from "@app/utils/constants/data";
import {ToastStyleModel} from "ecapture-ng-ui/lib/modules/toast/model/toast.model";
import {AuthService} from "@app/modules/auth/services/auth/auth.service";
import {Subscription} from "rxjs";
import {Account} from "@app/modules/auth/models/register/register";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, OnDestroy {
  public ecNumberIdentification: DropdownModel;
  public ecPhoneCode: DropdownModel;
  public registerForm: FormGroup;
  public dataTypeIdentification = typeIdentification;
  public dataPhoneCode = phoneCode;
  public readonly toastStyle: ToastStyleModel = toastDataStyle;
  public isBlockPage: boolean = false;
  private _subscription = new Subscription();

  constructor(
    private _fb: FormBuilder,
    private _messageService: ToastService,
    private _authService: AuthService
  ) {
    this.registerForm = this._fb.group({
      names: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastnames: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      typeIdentification: ['', Validators.required],
      identificationNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(13)]],
      nickname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      phoneCode: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(13)]],
      confirmPhoneCode: ['', Validators.required],
      confirmPhone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(13)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      dateOfBirth: ['', Validators.required],
      termsAndConditions: ['', Validators.required]
    });
    this.ecNumberIdentification = {
      headerLabel: {
        label: '',
        color: 'text-outline-gray-3',
        font: '',
        size: ''
      },
      placeholder: {
        label: 'C.C',
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
        background: 'bg-container-gray-1',
        border: {
          color: 'border-outline-gray-4',
          size: 'border-2',
          round: 'rounded',
          style: 'border-solid',
          hover: 'bg-outline-gray-4'
        }
      },
    };
    this.ecPhoneCode = {
      headerLabel: {
        label: '',
        color: 'text-outline-gray-3',
        font: '',
        size: ''
      },
      placeholder: {
        label: '+00',
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
        background: 'bg-container-gray-1',
        border: {
          color: 'border-outline-gray-4',
          size: 'border-2',
          round: 'rounded',
          style: 'border-solid',
          hover: 'bg-outline-gray-4'
        }
      },
    };
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.isBlockPage = false;
    this._subscription.unsubscribe();
  }

  public registerUser(): void {
    if (this.registerForm.valid) {
      this.isBlockPage = true;
      if (this.validForm()) {
        const account = this.buildAccountData();
        this._subscription.add(
          this._authService.createAccount(account).subscribe(
            (res) => {
              if (res.error) {
                this.isBlockPage = false;
                this._messageService.add({type: 'error', message: res.msg, life: 5000});
              } else {
                this.isBlockPage = false;
                this._messageService.add({type: 'error', message: 'Le hemos enviado un correo para que pueda confirmar su cuenta.', life: 5000});
              }
            },
            () => {
              this.isBlockPage = false;
              this._messageService.add({type: 'error', message: 'Conexión perdida con el Servidor!', life: 5000});
            }
          )
        );
      } else {
        this.isBlockPage = false;
        this._messageService.add({type: 'warning', message: 'Confirme los campos correctamente!', life: 5000});
      }
    } else {
      this._messageService.add({
        type: 'warning',
        message: 'Complete correctamente todos los Campos por favor!',
        life: 5000
      });
    }
  }

  private validForm(): boolean {
    return (this.registerForm.get('email')?.value === this.registerForm.get('confirmEmail')?.value &&
      this.registerForm.get('phoneCode')?.value === this.registerForm.get('confirmPhoneCode')?.value &&
      this.registerForm.get('phone')?.value === this.registerForm.get('confirmPhone')?.value &&
      this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value);
  }

  private buildAccountData(): Account {
    const formValue = this.registerForm.value;
    return {
      birth_date: formValue.dateOfBirth,
      cellphone: formValue.phoneCode + formValue.phone,
      confirm_password: formValue.confirmPassword,
      email: formValue.email,
      id_number: formValue.identificationNumber,
      id_type: parseInt(formValue.typeIdentification, 10),
      lastName: formValue.lastName,
      name: formValue.name,
      nickname: formValue.nickname,
      password: formValue.password
    };
  }

}
