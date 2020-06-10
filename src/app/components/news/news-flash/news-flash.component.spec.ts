import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFlashComponent } from './news-flash.component';

describe('NewsFlashComponent', () => {
  let component: NewsFlashComponent;
  let fixture: ComponentFixture<NewsFlashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsFlashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFlashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
