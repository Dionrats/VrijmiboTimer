import { TestBed } from '@angular/core/testing';

import { DikkeLeoService } from './dikke-leo.service';

describe('DikkeLeoService', () => {
  let service: DikkeLeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DikkeLeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
