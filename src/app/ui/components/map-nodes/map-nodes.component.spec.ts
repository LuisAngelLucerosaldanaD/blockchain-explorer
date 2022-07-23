import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapNodesComponent } from './map-nodes.component';

describe('MapNodesComponent', () => {
  let component: MapNodesComponent;
  let fixture: ComponentFixture<MapNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
