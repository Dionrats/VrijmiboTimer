import { TestBed } from '@angular/core/testing';

import { videoService } from './video.service';

describe('videoService', () => {
  let service: videoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(videoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
