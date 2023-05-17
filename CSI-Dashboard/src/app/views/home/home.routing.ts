import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { SigninComponent } from '../sessions/signin/signin.component';


export const HomeRoutes: Routes = [
  { path: '', component: SigninComponent }
];