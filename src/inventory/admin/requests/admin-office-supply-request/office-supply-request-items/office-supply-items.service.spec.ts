import { TestBed } from '@angular/core/testing';

import { OfficeSupplyItemsService } from './office-supply-items.service';

describe('OfficeSupplyItemsService', () => {
  let service: OfficeSupplyItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeSupplyItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
