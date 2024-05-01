import { TestBed } from '@angular/core/testing';

import { ApiServiceEquipoxReservaService } from './api-service-equipox-reserva.service';

describe('ApiServiceEquipoxReservaService', () => {
  let service: ApiServiceEquipoxReservaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceEquipoxReservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
