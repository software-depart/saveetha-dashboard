import { TestBed } from '@angular/core/testing';

import { ResaturantService } from './resaturant.service';

describe('ResaturantService', () => {
  let service: ResaturantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResaturantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
