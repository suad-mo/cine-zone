import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseWizardPageComponent } from './purchase-wizard-page.component';

describe('PurchaseWizardPageComponent', () => {
  let component: PurchaseWizardPageComponent;
  let fixture: ComponentFixture<PurchaseWizardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseWizardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseWizardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
