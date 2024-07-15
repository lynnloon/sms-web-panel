import { TestBed } from '@angular/core/testing';

import { RequestMessageService } from './request-message.service';

describe('RequestMessageService', () => {
  let service: RequestMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
