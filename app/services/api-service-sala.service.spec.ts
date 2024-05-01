import { TestBed } from '@angular/core/testing';

import { ApiServiceSalaService } from './api-service-sala.service';

describe('ApiServiceSalaService', () => {
  let service: ApiServiceSalaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceSalaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
