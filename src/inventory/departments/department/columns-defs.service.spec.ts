import { TestBed } from '@angular/core/testing';

import { ColumnsDefsService } from './columns-defs.service';

describe('ColumnsDefsService', () => {
  let service: ColumnsDefsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnsDefsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
