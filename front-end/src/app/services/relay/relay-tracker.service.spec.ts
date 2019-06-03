import { TestBed } from '@angular/core/testing';

import { RelayTrackerService } from './relay-tracker.service';

describe('RelayTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelayTrackerService = TestBed.get(RelayTrackerService);
    expect(service).toBeTruthy();
  });
});
