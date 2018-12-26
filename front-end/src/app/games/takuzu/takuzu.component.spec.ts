import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakuzuComponent } from './takuzu.component';

describe('TakuzuComponent', () => {
  let component: TakuzuComponent;
  let fixture: ComponentFixture<TakuzuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakuzuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakuzuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
