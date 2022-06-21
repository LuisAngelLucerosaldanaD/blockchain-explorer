import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormGroup} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'blockchain-explorer';
constructor(
  private _suscription: Subscription,
  public loginFrom: FormGroup,
  public typeLogin: string
){}
  ngOnInit(): void {
  }

}
