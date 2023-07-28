import { TestBed } from '@angular/core/testing';

import { PersonalGifService } from './personal-gif.service';

describe('PersonalGifService', () => {
  let service: PersonalGifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalGifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
