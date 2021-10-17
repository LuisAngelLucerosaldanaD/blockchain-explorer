import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialViewerComponent } from './credential-viewer.component';

describe('CredentialViewerComponent', () => {
  let component: CredentialViewerComponent;
  let fixture: ComponentFixture<CredentialViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
