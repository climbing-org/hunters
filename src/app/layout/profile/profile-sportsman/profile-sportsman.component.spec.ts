import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSportsmanComponent } from './profile-sportsman.component';

describe('ProfileSportsmanComponent', () => {
  let component: ProfileSportsmanComponent;
  let fixture: ComponentFixture<ProfileSportsmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSportsmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSportsmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
