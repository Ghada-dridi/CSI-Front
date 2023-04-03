import { ResourceComponent } from './resource/resource.component';
import { Routes } from '@angular/router';


export const ResourceRoutes: Routes = [
  { 
    path: 'resource-crud', 
    component: ResourceComponent, 
    data: { title: 'Resources', breadcrumb: 'Resource' } 
  }
];