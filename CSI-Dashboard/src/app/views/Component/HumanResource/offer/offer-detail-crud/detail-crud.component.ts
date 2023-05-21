import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Partner } from 'app/shared/models/Partner';
import { OfferService } from '../offer.service';
import { Offer } from 'app/shared/models/Offer';
@Component({
  selector: 'app-detail-crud',
  templateUrl: './detail-crud.component.html'
})
export class DetailCrudComponent implements OnInit {
id: number
offer :Offer
  constructor(    private route: ActivatedRoute,
    private crudService: OfferService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getOffers();

    console.log(this.id)
  

  }
  getOffers() {
    this.crudService.getItem(this.id).subscribe((data: any) => {
      this.offer = data;

    });
  }
}
