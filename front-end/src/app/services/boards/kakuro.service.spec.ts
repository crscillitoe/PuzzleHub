import { TestBed } from '@angular/core/testing';

import { KakuroService } from './kakuro.service';

describe('KakuroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KakuroService = TestBed.get(KakuroService);
    expect(service).toBeTruthy();
  });
});
