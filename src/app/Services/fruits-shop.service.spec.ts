import { TestBed } from '@angular/core/testing';

import { FruitsShopService } from './fruits-shop.service';

describe('FruitsShopService', () => {
  let service: FruitsShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FruitsShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
