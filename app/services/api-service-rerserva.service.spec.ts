import { TestBed } from '@angular/core/testing';

import { ApiServiceRerservaService } from './api-service-rerserva.service';

describe('ApiServiceRerservaService', () => {
  let service: ApiServiceRerservaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceRerservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
