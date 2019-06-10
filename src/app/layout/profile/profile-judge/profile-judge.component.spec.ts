import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileJudgeComponent } from './profile-sportsman.component';

describe('ProfileSportsmanComponent', () => {
  let component: ProfileJudgeComponent;
  let fixture: ComponentFixture<ProfileJudgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileJudgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileJudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
