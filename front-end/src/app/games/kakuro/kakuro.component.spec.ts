import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KakuroComponent } from './kakuro.component';

describe('KakuroComponent', () => {
  let component: KakuroComponent;
  let fixture: ComponentFixture<KakuroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KakuroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KakuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
