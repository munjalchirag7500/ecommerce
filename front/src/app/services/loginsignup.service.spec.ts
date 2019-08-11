import { TestBed } from '@angular/core/testing';

import { LoginsignupService } from './loginsignup.service';

describe('LoginsignupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginsignupService = TestBed.get(LoginsignupService);
    expect(service).toBeTruthy();
  });
});
