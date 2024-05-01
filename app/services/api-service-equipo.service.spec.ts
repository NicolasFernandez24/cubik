import { TestBed } from '@angular/core/testing';

import { ApiServiceEquipoService } from './api-service-equipo.service';

describe('ApiServiceEquipoService', () => {
  let service: ApiServiceEquipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceEquipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
