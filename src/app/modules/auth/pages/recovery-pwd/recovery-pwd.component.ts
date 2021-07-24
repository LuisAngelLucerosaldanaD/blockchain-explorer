import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-recovery-pwd',
  templateUrl: './recovery-pwd.component.html',
  styleUrls: ['./recovery-pwd.component.scss']
})
export class RecoveryPwdComponent implements OnInit {

  public userIdentification: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
