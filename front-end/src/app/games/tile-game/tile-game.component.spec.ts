import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileGameComponent } from './tile-game.component';

describe('TileGameComponent', () => {
  let component: TileGameComponent;
  let fixture: ComponentFixture<TileGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
