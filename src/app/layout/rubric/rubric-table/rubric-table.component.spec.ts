import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricTableComponent } from './rubric-table.component';

describe('RubricTableComponent', () => {
  let component: RubricTableComponent;
  let fixture: ComponentFixture<RubricTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubricTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
