
import { Routes } from '@angular/router';
import { crudEntretienRecrutmentComponent } from './crud_entretienRecrutment.component';
import { entretienRecrutmentComponent } from '../entretienRecrutment.component';
import { crudEvaluationComponent } from '../crud_evaluation/crud_evaluation.component';




export const crudEntretien: Routes = [{ 
    path: 'tableEntretien', 
component: crudEntretienRecrutmentComponent, 
data: { title: 'CrudEvaluation' } },

{
  path:'evaluationCandidat',
  component: entretienRecrutmentComponent,
  data:{title:'EntretienRecrutment'}
}
,
{ 
  path: 'crudEvaluation', 
component: crudEvaluationComponent, 
data: { title: 'Evaluation' } 
}

];


