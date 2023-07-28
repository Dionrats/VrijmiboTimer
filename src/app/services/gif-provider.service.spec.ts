import { TestBed } from '@angular/core/testing';

import { GifProviderService } from './gif-provider.service';

describe('GifProviderService', () => {
  let service: GifProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GifProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
