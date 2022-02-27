import { TestBed } from '@angular/core/testing';

import { GeneralRequestItemsService } from './general-request-items.service';

describe('GeneralRequestItemsService', () => {
  let service: GeneralRequestItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralRequestItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
