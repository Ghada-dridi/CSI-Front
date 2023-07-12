import { Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { OrdersPopComponent } from './orders-pop/orders-pop.component';


export const OrdersRoutes: Routes = [
  { 
    path: 'orders-crud', 
    component: OrdersListComponent, 
    data: { title: '', breadcrumb: 'Table' } 
  },
  {
    path: "",
    component:OrdersPopComponent ,
    pathMatch: "full"
  },
  {
    path: ":id",
    component: OrdersDetailComponent ,
    pathMatch: "full"
  }
];