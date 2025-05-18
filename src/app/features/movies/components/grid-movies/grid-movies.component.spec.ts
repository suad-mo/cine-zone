import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMoviesComponent } from './grid-movies.component';

describe('GridMoviesComponent', () => {
  let component: GridMoviesComponent;
  let fixture: ComponentFixture<GridMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
