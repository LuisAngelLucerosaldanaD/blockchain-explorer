import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {data} from "autoprefixer";

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
