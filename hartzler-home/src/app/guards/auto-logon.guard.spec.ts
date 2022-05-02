import { TestBed } from '@angular/core/testing';

import { AutoLogonGuard } from './auto-logon.guard';

describe('AutoLogonGuard', () => {
  let guard: AutoLogonGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutoLogonGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
