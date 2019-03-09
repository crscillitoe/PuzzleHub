import { TestBed } from '@angular/core/testing';

import { GameListAllService } from './game-list-all.service';

describe('GameListAllService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameListAllService = TestBed.get(GameListAllService);
    expect(service).toBeTruthy();
  });
});
