import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonogramsComponent } from './nonograms.component';

describe('NonogramsComponent', () => {
  let component: NonogramsComponent;
  let fixture: ComponentFixture<NonogramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonogramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonogramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
