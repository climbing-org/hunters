import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPageTableComponent } from './static-page-table.component';

describe('StaticPageTableComponent', () => {
  let component: StaticPageTableComponent;
  let fixture: ComponentFixture<StaticPageTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPageTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
