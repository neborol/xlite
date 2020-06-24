import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhotosComponent } from './edit-photos.component';

describe('PhotoUploadComponent', () => {
  let component: EditPhotosComponent;
  let fixture: ComponentFixture<EditPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
