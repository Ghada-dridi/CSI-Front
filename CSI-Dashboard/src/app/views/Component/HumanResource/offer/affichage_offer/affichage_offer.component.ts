import { id } from 'date-fns/locale';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Offer } from 'app/shared/models/Offer';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-offer-detail-popup',
  templateUrl: './affichage_offer.component.html',
  styleUrls :['./affichage_offer.component.scss'] 

})
export class OfferDetailPopupComponent implements OnInit {
  offer: Offer;
  id:number;

  constructor(
    public service:OfferService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OfferDetailPopupComponent>
  ) {
    this.offer = data.payload;
  }
  getOfferDetails() {
    console.log(this.id); // Make sure the id is not undefined
    this.service.getItem(this.id).subscribe((data: any) => {
      this.offer = data;
      console.log(this.id); // Check the retrieved data
    });
  }
  closePopup(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.data) {
        this.id = this.data.id;
        console.log(this.id) // Update this line
        this.getOfferDetails(); // Call the method to retrieve the interview details
      } }
}
