import { TestBed } from '@angular/core/testing';

import { ContractEmployeeService } from './contract-employee.service';

describe('ContractEmployeeService', () => {
  let service: ContractEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
