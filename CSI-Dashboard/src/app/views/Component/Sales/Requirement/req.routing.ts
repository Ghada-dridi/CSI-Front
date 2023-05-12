import { Routes } from '@angular/router';
import { ReqlistComponent } from './req-list/reqlist/reqlist.component';
import { ReqpopComponent } from './req-pop/reqpop/reqpop.component';
import { ReqDetailComponent } from './req-detail/req-detail.component';


export const ReqRoutes: Routes = [
  { 
    path: 'requirement-crud', 
    component: ReqlistComponent, 
    data: { title: '', breadcrumb: 'Table' } 
  },
  {
    path: "",
    component:ReqpopComponent ,
    pathMatch: "full"
  },
  {
    path: ":id",
    component: ReqDetailComponent ,
    pathMatch: "full"
  }
];