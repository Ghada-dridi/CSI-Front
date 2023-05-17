import { Component } from '@angular/core';
import { cvcandidatComponent } from './../CvCandidat/cv-candidat.component';
import { CandidatCrudTableComponent } from './CandidatCrud-table/candidat-crud-table.component';
import { Routes } from '@angular/router';
import { updatecandidatComponent } from '../updateCandidat/updateCandidat.component';
import { id } from 'date-fns/locale';
//import { CvTemplate1Component } from '../CvTemplate1/CvTemplate1.component';
import { CandidatDetailComponent } from './Candidat-details/candidat-details.component';
import { entretienRecrutmentComponent } from '../../entretienRecrutment/affichage_entreteinrecrutment/affichage_entretienRecrutment.component';



export const CandidatRoutes: Routes = [
  { 
    path: 'CandidatCrud-table', 
    component: CandidatCrudTableComponent, 
    data: { title: '', breadcrumb: 'Candidat' } 
    
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
   pathMatch: "full"
   //data: { title: 'AffichageCandidat' }
  },

  { 
    path: 'evaluationCandidat', 
component: entretienRecrutmentComponent, 
data: { title: 'EntretienRecrutment' } },


/*{ 
  path: ":templateDuCv", 
 component: templateDuCvComponent, 
 pathMatch: "full"
 //data: { title: 'AffichageCandidat' }
}*/
];
