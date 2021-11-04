import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityPoliticsComponent } from './security-politics.component';

describe('SecurityPoliticsComponent', () => {
  let component: SecurityPoliticsComponent;
  let fixture: ComponentFixture<SecurityPoliticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityPoliticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityPoliticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
