import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subject, Subscription} from "rxjs";
import {confirmEmailValidator} from "@app/utils/validations/validations";
import {phoneCode, typeIdentification} from "@app/utils/constants/data";
import {onlyLetters, onlyNumbers} from "@app/helpers/helpers";
import { AuthService } from '@app/modules/auth/services/auth.service';
import {DropdownModel, ToastService} from "ecapture-ng-ui";
import { Account } from '@app/modules/auth/models/register';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public createUserFrm: FormGroup;
  public typeIdentification: { label: string, value: string }[];
  public passwordValidatorsValue = new Subject<string>();
  public usernameValidatorsValue = new Subject<string>();
  public emailValidatorsValue = new Subject<string>();
  public invalidPassword: boolean = false;
  public invalidName: boolean = false;
  public invalidEmail: boolean = false;
  public dataTypeIdentification = typeIdentification;
  public typeIdentificationStyle: DropdownModel;
  public messageInvalidPassword: string = '';
  private _subscriptions: Subscription = new Subscription();
  public isBlockPage: boolean = false;
  public ecPhoneCode: DropdownModel;
  public dataPhoneCode = phoneCode;

  constructor(
    private formBuilder: FormBuilder,
    private _messageService: ToastService,
    private _authService: AuthService
  ) {
    this.createUserFrm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_]+$')]],
        email_notifications: ['', [Validators.required, Validators.email]],
        identification_type: ['', Validators.required],
        identification_number: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255), Validators.pattern('[a-zA-Z\u00f1\u00d1 ]{4,255}')]],
        last_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255), Validators.pattern('[a-zA-Z\u00f1\u00d1 ]{4,255}')]],
        password: ['', Validators.required],
        password_confirm: ['', Validators.required],
        country_code:['',Validators.required],
        cellphone:['',[Validators.required]],
        birthDate:['',[Validators.required]]
      },
      {
        validators: [
          confirmEmailValidator()
        ]
      },
    );

    this.typeIdentification = [
      {label: 'Cédula de ciudadania', value: 'C'},
      {label: 'Cédula de extranjería', value: 'E'},
      {label: 'Pasaporte', value: 'P'},
      {label: 'Acta de nacimiento', value: 'R'},
      {label: 'Carnet diplomático', value: 'D'},
      {label: 'RNC', value: 'A'},
      {label: 'Otros', value: 'O'}
    ];

    this.passwordValidatorsValue.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(
      (value) => {
        // this.validatePassword(value);
      },
    );
    this.usernameValidatorsValue.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(
      (value) => {
        // this.validatedUserName(value);
      },
    );
    this.emailValidatorsValue.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(
      (value) => {
        // this.validatedUserEmail(value);
      },
    );

    this.typeIdentificationStyle = {
      textColor: 'text-black',
      container: {
        background: 'bg-st-40 rounded-md',
        border: {
          color: 'border-st-10',
          size: 'border-4',
          round: 'rounded-lg',
          style: 'border-solid',
          hover: 'border-st-20'
        }
      },
      optionContainer: {
        background: 'bg-st-40 border-st-10 rounded',
        border: {
          color: 'border-st-10',
          size: 'border-2',
          round: 'rounded',
          style: 'border-solid',
          hover: 'bg-st-20'
        }
      },
    };
    this.ecPhoneCode = {
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
      textColor: 'text-black',
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

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnInit(): void {
  }

  get password_confirm() {
    return this.createUserFrm.get('password_confirm');
  }

  public onlyNumber = (value: any) => onlyNumbers(value);

  public onlyLetters = (value: KeyboardEvent) => onlyLetters(value);

  public save(): void {
    const account = this.buildAccountData();
    console.log("Accound new user",account);
    if (this.createUserFrm.valid) {
      if(this.validForm()){
        this.isBlockPage = true;
        this._subscriptions.add(
        this._authService.createUser(account).subscribe(
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
          })
        );
      } else {
        this.isBlockPage = false;
        this._messageService.add({type: 'warning', message: 'Confirme los campos correctamente!', life: 5000});
      }
    } else {
      this._messageService.add({type: 'warning', message: 'Complete todos los campos correctamente!', life: 5000});
      this.createUserFrm.markAllAsTouched();
    }
  }
  private validForm(): boolean {
    return (this.createUserFrm.get('password')?.value === this.createUserFrm.get('password_confirm')?.value);
  }
  private buildAccountData(): Account {
    const formValue = this.createUserFrm.value;
    return {
      birth_date: formValue.birthDate,
      cellphone: formValue.country_code +  formValue.cellphone,
      confirm_password: formValue.password_confirm,
      email: formValue.email_notifications,
      id_number: formValue.identification_number,
      id_type: parseInt(formValue.identification_type, 10),
      lastName: formValue.last_name,
      name: formValue.name,
      nickname: formValue.username,
      password: formValue.password
    };
  }
}
