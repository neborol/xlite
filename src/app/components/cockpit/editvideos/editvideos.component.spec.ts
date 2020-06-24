import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvideosComponent } from './editvideos.component';

describe('EditvideosComponent', () => {
  let component: EditvideosComponent;
  let fixture: ComponentFixture<EditvideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditvideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
