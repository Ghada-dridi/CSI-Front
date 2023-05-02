
import { Routes } from '@angular/router';
import { AddResourceComponent } from './add-resource/add-resource.component';



export const AddResourceRoutes: Routes = [
  { 
    path: 'add-resource-crud', 
    component: AddResourceComponent, 
    data: { title: 'AddResources', breadcrumb: 'AddResource' } 
  }
];