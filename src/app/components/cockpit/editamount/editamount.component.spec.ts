import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditamountComponent } from './editamount.component';

describe('EditamountComponent', () => {
  let component: EditamountComponent;
  let fixture: ComponentFixture<EditamountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditamountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditamountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
