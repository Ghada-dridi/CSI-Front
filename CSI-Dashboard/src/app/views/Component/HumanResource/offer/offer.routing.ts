import { Component } from '@angular/core';

import { Routes } from '@angular/router';
import { id } from 'date-fns/locale';
import { OfferCrudTableComponent } from './offer_data_table/offer-crud-table.component';
import { affichageOfferComponent } from './affichage_offer/affichage_offer.component';



export const OfferRoutes: Routes = [
  { 
    path: 'offerTable', 
    component: OfferCrudTableComponent, 
    data: { title: 'Offer', breadcrumb: 'Table' } 
  },
  { 
    path: 'affichageOffer/:id', 
    component: affichageOfferComponent, 
    data: { title: 'Offer', breadcrumb: 'Table' } 
  }


]
