import { Routes } from "@angular/router";
import { EmpPopComponent } from "../employee/emp-pop/emp-pop.component";
import { EmpListComponent } from "../employee/emp-list/emp-list.component";

export const EmpRoutes: Routes = [
    { 
      path: 'employee-crud', 
      component: EmpListComponent, 
      data: { title: '', breadcrumb: 'Table' } 
    },
    {
      path: "",
      component:EmpPopComponent ,
      pathMatch: "full"
    }
  ];