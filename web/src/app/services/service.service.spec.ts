import { TestBed } from '@angular/core/testing';

import { Service } from './service.service';

describe('ServiceService', () => {
  let service: Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
