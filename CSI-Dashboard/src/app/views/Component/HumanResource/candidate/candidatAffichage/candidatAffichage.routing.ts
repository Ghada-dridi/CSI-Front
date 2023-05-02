import { Routes } from '@angular/router';
import { candidatAffichageComponent } from './candidatAffichage.component';


export const candidatAffichage: Routes = [{ 
 path: 'candidatAffichage/:id', 
component: candidatAffichageComponent, 
data: { title: 'AffichageCandidat' }}];
