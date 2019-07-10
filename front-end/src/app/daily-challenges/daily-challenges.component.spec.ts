import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyChallengesComponent } from './daily-challenges.component';

describe('DailyChallengesComponent', () => {
  let component: DailyChallengesComponent;
  let fixture: ComponentFixture<DailyChallengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyChallengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
