import { TestBed } from '@angular/core/testing';

import { ChemicalsService } from './chemicals.service';

describe('ChemicalsService', () => {
  let service: ChemicalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChemicalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
