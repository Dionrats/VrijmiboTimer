import { TestBed } from '@angular/core/testing';

import { GifService } from './gif.service';

describe('GifService', () => {
  let service: GifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
