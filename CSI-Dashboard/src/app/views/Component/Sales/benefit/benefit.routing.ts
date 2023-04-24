import { Routes } from "@angular/router";
import { BenefitListComponent } from "../benefit/benefit-list/benefit-list.component";

export const BenefitRoutes: Routes = [
    { 
      path: 'benefit-list', 
      component: BenefitListComponent, 
      data: { title: '', breadcrumb: 'Table' } 
    }
  ];