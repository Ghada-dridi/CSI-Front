import { Routes } from "@angular/router";
import { QuotationDetailComponent } from "./quotation-detail/quotation-detail.component";
import { QuotationListComponent } from "./quotation-list/quotation-list.component";
import { QuotationPopComponent } from "./quotation-pop/quotation-pop.component";

export const QuotationsRoutes: Routes = [
    { 
      path: 'quotation-crud', 
      component: QuotationListComponent, 
      data: { title: '', breadcrumb: 'Table' } 
    },
    {
      path: "",
      component:QuotationPopComponent ,
      pathMatch: "full"
    },
    {
      path: ":id",
      component: QuotationDetailComponent ,
      pathMatch: "full"
    }
  ];