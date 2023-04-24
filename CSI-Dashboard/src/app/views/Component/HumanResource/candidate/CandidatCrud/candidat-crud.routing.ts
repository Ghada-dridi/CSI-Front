import { Component } from '@angular/core';
import { cvcandidatComponent } from './../CvCandidat/cv-candidat.component';
import { CandidatCrudTableComponent } from './CandidatCrud-table/candidat-crud-table.component';
import { Routes } from '@angular/router';
import { CvTemplate1Component } from '../CvTemplate1/CvTemplate1.component';
import { candidatAffichageComponent } from '../candidatAffichage/candidatAffichage.component';



export const CrudsRoutes: Routes = [
  { 
    path: 'CandidatCrud-table', 
    component: CandidatCrudTableComponent, 
    data: { title: 'Table', breadcrumb: 'Table' } 
  },

  {
    path:'cvCandidat-crud',
    component:cvcandidatComponent,data: { title: 'CvCandidat' } 

  },

  { 
    path: 'candidatAffichage/:id', 
   component: candidatAffichageComponent, 
   data: { title: 'AffichageCandidat' }
  }
];
