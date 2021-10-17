import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  public isShowBox: boolean;
  public filter: boolean;
  public multiple: boolean;
  public currentValue: string;
  public condition: string;
  public label: string;
  public data: any[];
  public dataTemp: any[];
  public optionLabel: string;
  public placeholder: string;
  public ecNumberIdentification: any;
  public ecPhoneCode: any;
  public ecConfirmPhoneCode: any;

  constructor() {
    this.isShowBox =  false;
    this.filter = true;
    this.multiple = false;
    this.currentValue = '';
    this.condition = '';
    this.label = '';
    this.placeholder = 'Seleccione una opción';
    this.optionLabel = 'label';
    this.dataTemp = [];
    this.data = [
      {
        label: 'Item 1',
        value: 'Item 1'
      },{
        label: 'Item 2',
        value: 'Item 2'
      },{
        label: 'circo 3',
        value: 'circo 3'
      },{
        label: 'test 4',
        value: 'test 4'
      },
    ];
    this.ecNumberIdentification = {
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
        active: false
      },
      headerLabel: {
        label: '',
        color: 'text-outline-gray-3',
        font: '',
        size: ''
      },
      placeholder: {
        label: 'CC.AA',
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
        {label: 'Cedula de Identidad', value: 'C.A'}
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
        active: false
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
    this.ecConfirmPhoneCode = {
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
        active: false
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

  public showBox(value: boolean): void{
    this.isShowBox = value;
  }

  public changeValue(value: string): void {
    this.currentValue = value;
    this.isShowBox = false;
    if (this.dataTemp.length > 0) {
      this.data = this.dataTemp;
    }
  }

  public filterValue(value: any): void {
    const data = value.target.value;
    if (this.dataTemp.length > 0) {
      this.data = this.dataTemp;
    } else {
      this.dataTemp = this.data;
    }
    this.data = this.data.filter((m) => {
      if (m.label.toLowerCase().search(data) === 0) {
        return m;
      }
    });
    if (data === '') {
      this.data = this.dataTemp;
    }
  }

}
