import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayModeSelectComponent } from './display-mode-select.component';

describe('DisplayModeSelectComponent', () => {
  let component: DisplayModeSelectComponent;
  let fixture: ComponentFixture<DisplayModeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayModeSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayModeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
