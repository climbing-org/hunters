import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubTableComponent } from './club-table.component';

describe('ClubTableComponent', () => {
  let component: ClubTableComponent;
  let fixture: ComponentFixture<ClubTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
