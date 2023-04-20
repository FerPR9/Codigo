import { TestBed } from '@angular/core/testing';

import { GymcapyfitService } from './gymcapyfit.service';

describe('GymcapyfitService', () => {
  let service: GymcapyfitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GymcapyfitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
