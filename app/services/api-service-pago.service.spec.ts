import { TestBed } from '@angular/core/testing';

import { ApiServicePagoService } from './api-service-pago.service';

describe('ApiServicePagoService', () => {
  let service: ApiServicePagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServicePagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
