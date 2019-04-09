import { TestBed } from '@angular/core/testing';

import { SharedFunctionsService } from './shared-functions.service';

describe('SharedFunctionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedFunctionsService = TestBed.get(SharedFunctionsService);
    expect(service).toBeTruthy();
  });
});
