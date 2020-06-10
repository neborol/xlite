import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaticComponent } from './diplomatic.component';

describe('DiplomaticComponent', () => {
  let component: DiplomaticComponent;
  let fixture: ComponentFixture<DiplomaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
