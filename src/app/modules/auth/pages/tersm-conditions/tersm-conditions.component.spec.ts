import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TersmConditionsComponent } from './tersm-conditions.component';

describe('TersmConditionsComponent', () => {
  let component: TersmConditionsComponent;
  let fixture: ComponentFixture<TersmConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TersmConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TersmConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
