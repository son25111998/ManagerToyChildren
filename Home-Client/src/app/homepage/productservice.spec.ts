import { TestBed, inject } from '@angular/core/testing';

import { ProductService } from './productservice';

describe('ProductserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService]
    });
  });

  it('should ...', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});
