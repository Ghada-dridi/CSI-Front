import { Routes } from '@angular/router';
import { EquipmentComponent } from './equipment/equipment.component';
import { ViewEquipmentComponent } from './equipment/view-equipment/view-equipment.component';

export const EquipmentRoutes: Routes = [
  { 
    path: 'equipment-crud', 
    component: EquipmentComponent, 
    data: { title: 'Table', breadcrumb: 'Table' } 
  },{ 
    path: 'view-equipment', 
    component: ViewEquipmentComponent, 
    data: { title: 'Table', breadcrumb: 'Table' } 
  }
];