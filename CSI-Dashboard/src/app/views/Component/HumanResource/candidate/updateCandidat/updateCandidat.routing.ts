import { Routes } from '@angular/router';


import { CandidatCrudTableComponent } from '../CandidatCrud/CandidatCrud-table/candidat-crud-table.component';
import { cvcandidatComponent } from '../CvCandidat/cv-candidat.component';
import { updatecandidatComponent } from './updateCandidat.component';

export const CalendarRoutes: Routes = [{ 
    path: 'cvCandidat-crud', 
component: cvcandidatComponent, 
data: { title: 'CvCandidat' } },
{ 
    path: 'CandidatCrud-table', 
    component: CandidatCrudTableComponent, 
    data: { title: 'Table', breadcrumb: 'Table' } 
  },
  {
    path:'updateCandidate',
    component:updatecandidatComponent,
    data:{title: 'update'}
  }

];
