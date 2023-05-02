import { Routes } from "@angular/router";
import { crudEvaluationComponent } from "./crud_evaluation.component";

export const crudEvalu: Routes = [{ 
    path: 'crudEvaluation', 
component: crudEvaluationComponent, 
data: { title: 'Evaluation' } }];

