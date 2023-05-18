import { Component } from '@angular/core';

import { Routes } from '@angular/router';
import { id } from 'date-fns/locale';
import { referentielCrudTableComponent } from './referentielDataTable/referentiel-crud-table.component';
import { referentielFormComponent } from './referentielForm/referentielForm.component';




export const referentielRoutes: Routes = [
    { 
        path: 'referentielTable', 
        component: referentielCrudTableComponent , 
        data: { title: 'refTable', breadcrumb: 'Table' } 
      },
      { 
        path: 'referentielForm', 
        component: referentielFormComponent , 
        data: { title: 'refForm', breadcrumb: 'TablForm' } 
      }
]
