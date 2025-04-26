import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDateComponent } from './select-date.component';

describe('SelectDateComponent', () => {
  let component: SelectDateComponent;
  let fixture: ComponentFixture<SelectDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
