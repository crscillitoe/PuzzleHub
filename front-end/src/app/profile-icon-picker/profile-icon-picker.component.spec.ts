import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIconPickerComponent } from './profile-icon-picker.component';

describe('ProfileIconPickerComponent', () => {
  let component: ProfileIconPickerComponent;
  let fixture: ComponentFixture<ProfileIconPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileIconPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileIconPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
