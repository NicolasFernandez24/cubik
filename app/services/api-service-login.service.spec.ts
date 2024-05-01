import { TestBed } from '@angular/core/testing';

import { ApiServiceLoginService } from './api-service-login.service';

describe('ApiServiceLoginService', () => {
  let service: ApiServiceLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
