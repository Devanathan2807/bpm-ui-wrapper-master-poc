import { TestBed } from '@angular/core/testing';

import { ProcessDefinationServiceService } from './process-defination-service.service';

describe('ProcessDefinationServiceService', () => {
  let service: ProcessDefinationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessDefinationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
