import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySelectLocationComponent } from './my-select-location.component';

describe('MySelectLocationComponent', () => {
  let component: MySelectLocationComponent;
  let fixture: ComponentFixture<MySelectLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySelectLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySelectLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
