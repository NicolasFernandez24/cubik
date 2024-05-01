import { TestBed } from '@angular/core/testing';

import { ApiServicePromocionService } from './api-service-promocion.service';

describe('ApiServicePromocionService', () => {
  let service: ApiServicePromocionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServicePromocionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
