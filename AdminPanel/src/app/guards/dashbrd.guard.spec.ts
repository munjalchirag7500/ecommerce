import { TestBed, async, inject } from '@angular/core/testing';

import { DashbrdGuard } from './dashbrd.guard';

describe('DashbrdGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashbrdGuard]
    });
  });

  it('should ...', inject([DashbrdGuard], (guard: DashbrdGuard) => {
    expect(guard).toBeTruthy();
  }));
});
