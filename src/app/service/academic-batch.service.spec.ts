import { TestBed } from '@angular/core/testing';

import { AcademicBatchService } from './academic-batch.service';

describe('AcademicBatchService', () => {
  let service: AcademicBatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicBatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
