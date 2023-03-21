import { Routes } from '@angular/router';
import { CrudNgxTableComponent } from './crud-ngx-table/crud-ngx-table.component';
import { DetailCrudComponent } from './crud-detail/detail-crud/detail-crud.component';

export const CrudsRoutes: Routes = [
  { 
    path: 'ahmed', 
    component: CrudNgxTableComponent, 
    data: { title: 'Table', breadcrumb: 'Table' } 
  },
  {
    path: ":iiid",
    component:DetailCrudComponent ,
    pathMatch: "full"
  }
];