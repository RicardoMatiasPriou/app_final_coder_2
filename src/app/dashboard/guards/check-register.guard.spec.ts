import { TestBed } from '@angular/core/testing';

import { CheckRegisterGuard } from './check-register.guard';

describe('CheckRegisterGuard', () => {
  let guard: CheckRegisterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckRegisterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
