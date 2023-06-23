
import { Routes } from '@angular/router';
import { ListeContractComponent } from './liste-contract-client/liste-contract.component';
import { AddContractClientComponent } from './add-contract-client/add-contract-client.component';
import { ViewContractClientComponent } from './view-contract-client/view-contract-client.component';
import { UpdateContractComponent } from './update-contract/update-contract.component';



export const ContractClientRoutes: Routes = [
  { 
    path: 'liste-client-contracts', 
    component: ListeContractComponent , 
    data: { title: 'Contrats Prospets', breadcrumb: 'Liste des contrats Prospets' } 
  }, 
  { 
    path: 'add-client-contract', 
    component: AddContractClientComponent , 
    data: { title: 'Ajouter Contrat', breadcrumb: 'Ajouter Contrat' } 
  },
  {
    path: "update-client-contract",
    component:UpdateContractComponent ,
    data: { title: 'Modifier Contrat Employé', breadcrumb: 'Modifier Contrat Employé' } 
  },
  {
    path: ":id",
    component: ViewContractClientComponent,
    pathMatch: "full"
  }

];
