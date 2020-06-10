import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAwayComponent } from './home-away.component';

describe('HomeAwayComponent', () => {
  let component: HomeAwayComponent;
  let fixture: ComponentFixture<HomeAwayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAwayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
