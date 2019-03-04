import { TestBed } from '@angular/core/testing';

import { GameStarterService } from './game-starter.service';

describe('GameStarterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameStarterService = TestBed.get(GameStarterService);
    expect(service).toBeTruthy();
  });
});
