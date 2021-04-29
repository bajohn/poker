import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadWalletComponent } from './upload-wallet.component';

describe('UploadWalletComponent', () => {
  let component: UploadWalletComponent;
  let fixture: ComponentFixture<UploadWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
