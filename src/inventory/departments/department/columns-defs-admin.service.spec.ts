import { TestBed } from '@angular/core/testing';

import { ColumnsDefsAdminService } from './columns-defs-admin.service';

describe('ColumnsDefsAdminService', () => {
  let service: ColumnsDefsAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnsDefsAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
