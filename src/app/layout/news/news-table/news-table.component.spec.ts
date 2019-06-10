import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTableComponent } from './static-page-table.component';

describe('StaticPageTableComponent', () => {
  let component: NewsTableComponent;
  let fixture: ComponentFixture<NewsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
