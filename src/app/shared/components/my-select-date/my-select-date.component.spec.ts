import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySelectDateComponent } from './my-select-date.component';

describe('MySelectDateComponent', () => {
  let component: MySelectDateComponent;
  let fixture: ComponentFixture<MySelectDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySelectDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySelectDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
