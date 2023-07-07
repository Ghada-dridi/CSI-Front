
import { cvcandidatComponent } from './../CvCandidat/cv-candidat.component';
import { CandidatCrudTableComponent } from './CandidatCrud-table/candidat-crud-table.component';
import { Routes } from '@angular/router';
import { CandidatDetailComponent } from './Candidat-details/candidat-details.component';
import { entretienRecrutmentComponent } from '../../entretienRecrutment/affichage_entreteinrecrutment/affichage_entretienRecrutment.component';
import { updatecandidatComponent } from '../updateCandidat/updateCandidat.component';




export const CandidatRoutes: Routes = [
  { 
    path: 'CandidatCrud-table', 
    component: CandidatCrudTableComponent, 
    data: { title: 'Candidat', breadcrumb: 'Liste des candidats' } 
    
  },

  {
    path:'cvCandidat-crud',
    component:cvcandidatComponent,data: { title: 'CvCandidat' } 

  },
  {
    path:'updateCandidat/:id',
    component:updatecandidatComponent,
    data:{title: 'update'}
  },

  { 
    path: ":id", 
   component: CandidatDetailComponent, 
   pathMatch: "full",
   data: { title: 'Candidat', breadcrumb: 'Détails du candidat' } 
  },

  { 
    path: 'evaluationCandidat', 
component: entretienRecrutmentComponent, 
data: { title: 'Entretien', breadcrumb: 'Entretien' } 
 },

{ 
  path: ":id", 
 component: entretienRecrutmentComponent, 
 pathMatch: "full"
 //data: { title: 'AffichageCandidat' }
},
/*{ 
  path: 'convertResource/:id', 
  component: ConvertToResourceComponent, 
  data: { title: 'convert', breadcrumb: 'Candidat' } 
  
}*/
/*{ 
  path: ":templateDuCv", 
 component: templateDuCvComponent, 
 pathMatch: "full"
 //data: { title: 'AffichageCandidat' }
}*/
];
