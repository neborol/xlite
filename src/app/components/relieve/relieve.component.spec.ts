import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelieveComponent } from './relieve.component';

describe('RelieveComponent', () => {
  let component: RelieveComponent;
  let fixture: ComponentFixture<RelieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelieveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
