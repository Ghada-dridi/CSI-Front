import { TestBed } from '@angular/core/testing';

import { ContractEmployeeServiceService } from './contract-employee-service.service';

describe('ContractEmployeeServiceService', () => {
  let service: ContractEmployeeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractEmployeeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
