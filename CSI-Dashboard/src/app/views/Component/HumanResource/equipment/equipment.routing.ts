import { Routes } from '@angular/router';
import { EquipmentComponent } from './equipment/equipment.component';
import { ViewEquipmentComponent } from './equipment/view-equipment/view-equipment.component';
import { MotifUnavailabilityComponent } from './equipment/motif-unavailability/motif-unavailability.component';
import { AffectationComponent } from './equipment/affectation/affectation.component';


export const EquipmentRoutes: Routes = [
  { 
    path: 'equipment-crud', 
    component: EquipmentComponent, 
    data: { title: 'Liste des équipements', breadcrumb: 'Liste des équipements' } 
  },{ 
    path: 'view-equipment', 
    component: ViewEquipmentComponent, 

  },{
    path: 'motif', 
    component: MotifUnavailabilityComponent, 
 
  },{
    path: 'affectation', 
    component: AffectationComponent, 
 
  }
 
  
];