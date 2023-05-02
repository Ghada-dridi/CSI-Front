import { Routes } from '@angular/router';
import {  entretienRecrutmentComponent } from './entretienRecrutment.component';



export const EntretienRecru: Routes = [{ 
    path: 'evaluationCandidat', 
component: entretienRecrutmentComponent, 
data: { title: 'EntretienRecrutment' } }];
