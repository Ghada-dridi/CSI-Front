import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialMediaName } from 'app/shared/models/socialMedia';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudPartnerService } from '../crudPartner.service';
import { PartnerContactPopComponent } from '../partner-contact-pop/partner-contact-pop.component';

@Component({
  selector: 'app-social-media-pop',
  templateUrl: './social-media-pop.component.html'
})
export class SocialMediaPopComponent implements OnInit {
  private partnerId : number
  public itemForm: FormGroup;
  socialMediaName: string[]= Object.values(SocialMediaName);

  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<PartnerContactPopComponent>,
  private fb: FormBuilder,
  private crudPartnerService: CrudPartnerService
  ) { }

  ngOnInit(): void {
    this.buildItemForm(this.data.payload)
    this.partnerId = this.data.partnerId;
  }

  buildItemForm(item){
    this.itemForm = this.fb.group({
      name : [item.name || '', Validators.required],
      link : [item.link || '', Validators.required],
      partnerNum: [this.data.partnerId, Validators.required]
    });
  }

  submit(){
    this.dialogRef.close(this.itemForm.value)
  }
}
