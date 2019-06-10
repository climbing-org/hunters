import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsmanRatingPageComponent } from './sportsman-rating-page.component';

describe('SportsmanRatingPageComponent', () => {
  let component: SportsmanRatingPageComponent;
  let fixture: ComponentFixture<SportsmanRatingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsmanRatingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsmanRatingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
