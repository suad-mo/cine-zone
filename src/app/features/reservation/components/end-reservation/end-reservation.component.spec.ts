import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndReservationComponent } from './end-reservation.component';

describe('EndReservationComponent', () => {
  let component: EndReservationComponent;
  let fixture: ComponentFixture<EndReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
