import {Component, Input, OnInit} from '@angular/core';
import {ICarouselItem} from "@app/modules/home/models/home.model";
import {CAROUSEL_DATA_ITEMS} from "@app/utils/constants/carousel.data";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() height = 500;
  @Input() isFullScreen = false;
  public items: ICarouselItem[];
  public finalHeight: string | number = 0;
  public currentPosition = 0;
  public ecStyle: any;
  public placeholderValue: string = '';
  public currentValue: string = '';
  public dataTemp: any = [];
  public isShowBox: boolean = false;

  constructor() {
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
    this.items = CAROUSEL_DATA_ITEMS;

    this.ecStyle = {
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
        label: 'Selected Value',
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
          round: 'rounded',
          style: 'border-solid',
          hover: 'border-outline-gray-4'
        }
      },
      filter: true,
      data: [
        {
          label: 'esto es un test',
          value: 'test'
        },
        {
          label: 'esto es un test',
          value: 'test'
        },
        {
          label: 'esto es un test',
          value: 'test'
        },
        {
          label: 'esto es un test',
          value: 'test'
        },
        {
          label: 'esto es un test',
          value: 'test'
        },
        {
          label: 'esto es un test',
          value: 'test'
        },
        {
          label: 'esto es un test',
          value: 'test'
        },
        {
          label: 'esto es un test',
          value: 'test'
        },
        {
          label: 'esto es un test',
          value: 'test'
        },
        {
          label: 'esto es un test',
          value: 'test'
        },
        {
          label: 'esto es un cuatro',
          value: 'test'
        },
      ],
      optional: false,
      optionLabel: 'label',
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

  ngOnInit() {
    this.items.map((i, index) => {
      i.id = index;
      i.marginLeft = 0;
    });
  }

  setCurrentPosition(position: number) {
    this.currentPosition = position;
    // @ts-ignore
    this.items.find(i => i.id === 0).marginLeft = -100 * position;
  }

  setNext() {
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;
    if (nextPosition <= this.items.length - 1) {
      finalPercentage = -100 * nextPosition;
    } else {
      nextPosition = 0;
    }
    // @ts-ignore
    this.items.find(i => i.id === 0).marginLeft = finalPercentage;
    this.currentPosition = nextPosition;
  }

  setBack() {
    let finalPercentage = 0;
    let backPosition = this.currentPosition - 1;
    if (backPosition >= 0) {
      finalPercentage = -100 * backPosition;
    } else {
      backPosition = this.items.length - 1;
      finalPercentage = -100 * backPosition;
    }
    // @ts-ignore
    this.items.find(i => i.id === 0).marginLeft = finalPercentage;
    this.currentPosition = backPosition;

  }

  public changeValue(value: any): void {

    if (this.ecStyle.optionLabel === 'value') {
      this.placeholderValue = value.value;
    } else {
      this.placeholderValue = value.label;
    }
    this.currentValue = value.value;
    this.isShowBox = false;
    if (this.dataTemp.length > 0) {
      this.ecStyle.data = this.dataTemp;
    }
    /*this.onTouch();
    this.onChange(this.currentValue);*/
  }

  public filterValue(value: any): void {
    const data = value.target.value;
    if (this.dataTemp.length > 0) {
      this.ecStyle.data = this.dataTemp;
    } else {
      this.dataTemp = this.ecStyle.data;
    }
    this.ecStyle.data = this.ecStyle.data?.filter((m: any) => {
      if (m.label.toLowerCase().indexOf(data) !== -1) {
        return m;
      }
    });
    if (data === '') {
      this.ecStyle.data = this.dataTemp;
    }
  }

  public showBox(): void {
    this.isShowBox = !this.isShowBox;
  }

}
