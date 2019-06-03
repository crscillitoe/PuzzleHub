import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleRelayPopupComponent } from './puzzle-relay-popup.component';

describe('PuzzleRelayPopupComponent', () => {
  let component: PuzzleRelayPopupComponent;
  let fixture: ComponentFixture<PuzzleRelayPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleRelayPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleRelayPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
