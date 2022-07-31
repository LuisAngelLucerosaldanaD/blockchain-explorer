import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-map-nodes',
  templateUrl: './map-nodes.component.html',
  styleUrls: ['./map-nodes.component.scss']
})
export class MapNodesComponent implements OnInit, AfterViewInit {

  @ViewChild('nodePeru') nodePeru!: ElementRef<HTMLElement>

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.nodePeru.nativeElement.getBoundingClientRect());
  }

}
