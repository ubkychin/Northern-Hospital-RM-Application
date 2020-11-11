import { TestBed } from '@angular/core/testing';

import { MeasurementGuard } from './measurement.guard';

describe('MeasurementGuard', () => {
  let guard: MeasurementGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MeasurementGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
