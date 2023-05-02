import { BackOfficeComponent } from './back-office/back-office.component';
import { ExternalComponent } from './external/external.component';
import { ResourceComponent } from './resource/resource.component';
import { Routes } from '@angular/router';


export const ResourceRoutes: Routes = [
  { 
    path: 'resource-crud', 
    component: ResourceComponent, 
    data: { title: 'Resources', breadcrumb: 'Resource' } 
  },
  { 
    path: 'externalResource-crud', 
    component: ExternalComponent, 
    data: { title: 'External Resources', breadcrumb: 'External Resource' } 
  },
  { 
    path: 'backOfficeResource-crud', 
    component: BackOfficeComponent, 
    data: { title: 'Back Office Resources', breadcrumb: 'Back Office Resource' } 
  }
];
