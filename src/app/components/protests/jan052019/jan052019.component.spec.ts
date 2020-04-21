import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Jan052019Component } from './jan052019.component';

describe('Jan052019Component', () => {
  let component: Jan052019Component;
  let fixture: ComponentFixture<Jan052019Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Jan052019Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Jan052019Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
