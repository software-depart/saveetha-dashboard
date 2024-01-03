import { TestBed } from '@angular/core/testing';

import { FoodcourtService } from './foodcourt.service';

describe('FoodcourtService', () => {
  let service: FoodcourtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodcourtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
