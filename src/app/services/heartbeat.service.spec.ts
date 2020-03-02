import { TestBed } from '@angular/core/testing';

import { HeartbeatService } from './heartbeat.service';

describe('HeartbeatService', () => {
  let service: HeartbeatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeartbeatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
