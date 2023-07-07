import { Routes } from '@angular/router';
import { referentielCrudTableComponent } from './referentielDataTable/referentiel-crud-table.component';
import { referentielFormComponent } from './referentielForm/referentielForm.component';
import { refQuestionAffichageComponent } from './refQuestionAffichage/refQuestionAffichage.component';
import { referentielForm2Component } from './referentielForm2/referentielForm2.component';
import { refCategoryAffichageComponent } from './refCategoryAffichage/refCategoryAffichage.component';




export const referentielRoutes: Routes = [
  
    { 
        path: 'referentielTable', 
        component: referentielCrudTableComponent , 
        data: { title: 'Catégories', breadcrumb: 'Liste des catégories du questionnaire' } 
      },

      { 
        path: 'referentielForm', 
        component: referentielFormComponent , 
        data: { title: 'Formulaire', breadcrumb: 'Création d\'un questionnaire' } 
      },
      { 
        path: ':id', 
        component: referentielForm2Component , 
        data: { title: 'refForm', breadcrumb: 'TablForm' } 
      },

      { 
        path: 'ref/:id', 
        component: refCategoryAffichageComponent, 
        data: { title: 'Domaines', breadcrumb: 'Liste des domaines du questionnaire' } 
      },

      { 
        path: ':quest/:id', 
        component: refQuestionAffichageComponent , 
        data: { title: 'Questions', breadcrumb: 'Liste questions du questionnaire' } 
      }

]
