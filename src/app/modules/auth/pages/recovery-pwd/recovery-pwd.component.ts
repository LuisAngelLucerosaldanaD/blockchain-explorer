import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-recovery-pwd',
  templateUrl: './recovery-pwd.component.html',
  styleUrls: ['./recovery-pwd.component.scss']
})
export class RecoveryPwdComponent implements OnInit {

  public userIdentification: boolean = true;
  public ecPhoneCode: any;
  constructor() {
    this.ecPhoneCode = {
      alert: {
        info: {
          font: '',
          color: 'text-white',
          label: '',
          size: 'text-base'
        },
        error: {
          font: '',
          color: 'text-white',
          label: '',
          size: 'text-base'
        },
        success: {
          font: '',
          color: 'text-white',
          label: '',
          size: 'text-base'
        },
        warning: {
          font: '',
          color: 'text-white',
          label: '',
          size: 'text-base'
        },
      },
      icon: {
        color: 'text-white',
        name: 'caret down',
        position: '',
        active: true
      },
      headerLabel: {
        label: '',
        color: 'text-outline-gray-3',
        font: '',
        size: ''
      },
      placeholder: {
        label: '+51',
        color: 'text-outline-gray-3',
        font: '',
        size: ''
      },
      error: false,
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
      filter: true,
      data: [
        {label: '+51 Perú', value: '+51'},
        {label: '+57 Colombia', value: '+57'},
        {label: '+256 test', value: '+256'},
      ],
      optional: false,
      optionLabel: 'value',
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

}
