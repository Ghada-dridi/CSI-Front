
import { Routes } from '@angular/router';
import { ListeContractComponent } from './liste-contract-employee/liste-contract.component';
import { AddContractEmployeeComponent } from './add-contract-employee/add-contract-employee.component';
import { ViewContractComponent } from './view-contract/view-contract.component';


export const ContractEmployeeRoutes: Routes = [
  { 
    path: 'liste-employee-contracts', 
    component: ListeContractComponent , 
    data: { title: 'ListeEmployeeContracts', breadcrumb: 'ListeEmployeeContract' } 
  },
  { 
    path: 'add-employee-contract', 
    component: AddContractEmployeeComponent , 
    data: { title: 'AddEmployeeContracts', breadcrumb: 'AddEmployeeContract' } 
  },
  {
    path: ":id",
    component:ViewContractComponent ,
    pathMatch: "full"
  }
];
