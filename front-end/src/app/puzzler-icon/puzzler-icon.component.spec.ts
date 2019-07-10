import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzlerIconComponent } from './puzzler-icon.component';

describe('PuzzlerIconComponent', () => {
  let component: PuzzlerIconComponent;
  let fixture: ComponentFixture<PuzzlerIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzlerIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzlerIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
