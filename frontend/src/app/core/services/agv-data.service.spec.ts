import { TestBed } from '@angular/core/testing';

import { AgvDataService } from './agv-data.service';

describe('AgvDataService', () => {
  let service: AgvDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgvDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
