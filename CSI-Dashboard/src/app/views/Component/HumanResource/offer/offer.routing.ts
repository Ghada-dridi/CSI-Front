import { Component } from '@angular/core';

import { Routes } from '@angular/router';
import { id } from 'date-fns/locale';
import { OfferCrudTableComponent } from './offer_data_table/offer-crud-table.component';



export const OfferRoutes: Routes = [
  { 
    path: 'offerTable', 
    component: OfferCrudTableComponent, 
    data: { title: 'Offer', breadcrumb: 'Liste des offres' } 
  },
  


]
