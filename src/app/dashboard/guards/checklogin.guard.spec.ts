import { TestBed } from '@angular/core/testing';
import { CheckloginGuardash } from './checklogin.guard';


describe('CheckloginGuard', () => {
  let guard: CheckloginGuardash;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckloginGuardash);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
