import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGamesComponent } from './custom-games.component';

describe('CustomGamesComponent', () => {
  let component: CustomGamesComponent;
  let fixture: ComponentFixture<CustomGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
