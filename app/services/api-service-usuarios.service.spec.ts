import { TestBed } from '@angular/core/testing';

import { ApiServiceUsuariosService } from './api-service-usuarios.service';

describe('ApiServiceUsuariosService', () => {
  let service: ApiServiceUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
