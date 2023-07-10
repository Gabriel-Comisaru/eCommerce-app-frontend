import { TestBed } from '@angular/core/testing';

import { MockProductsService } from './mock-products.service';

describe('MockProductsService', () => {
  let service: MockProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
