import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedReservationComponent } from './checked-reservation.component';

describe('CheckedReservationComponent', () => {
  let component: CheckedReservationComponent;
  let fixture: ComponentFixture<CheckedReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckedReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckedReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
