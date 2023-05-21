import { ViewResourceComponent } from './view-resource/view-resource.component';
import { BackOfficeComponent } from './resourceManagement/back-office/back-office.component';
import { ExternalComponent } from './resourceManagement/external/external.component';
import { ResourceComponent } from './resourceManagement/resource/resource.component';
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
    data: { title: 'BackOffice Resources', breadcrumb: 'BackOffice Resource' } 
  },{
    path: ":id",
    component: ViewResourceComponent ,
    pathMatch: "full"
  }
];
