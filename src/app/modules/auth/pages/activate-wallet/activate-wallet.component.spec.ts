import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateWalletComponent } from './activate-wallet.component';

describe('ActivateWalletComponent', () => {
  let component: ActivateWalletComponent;
  let fixture: ComponentFixture<ActivateWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
