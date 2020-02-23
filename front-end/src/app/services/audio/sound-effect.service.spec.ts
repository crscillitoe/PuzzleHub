import { TestBed } from '@angular/core/testing';

import { SoundEffectService } from './sound-effect.service';

describe('SoundEffectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoundEffectService = TestBed.get(SoundEffectService);
    expect(service).toBeTruthy();
  });
});
