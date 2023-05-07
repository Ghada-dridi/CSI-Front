import { Component, Inject, OnInit } from '@angular/core';
import { CrudPartnerService } from '../crudPartner.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Privilege, Civility, Service } from 'app/shared/models/contact';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-partner-contact-pop',
  templateUrl: './partner-contact-pop.component.html'
})
export class PartnerContactPopComponent implements OnInit {
  private partnerId : number
  public itemForm: FormGroup;
  Privilege :string []= Object.values(Privilege);
  Civility :string []= Object.values(Civility);
  Service :string []= Object.values(Service);

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
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
      firstName : [item.firstName || '', Validators.required],
      lastName : [item.lastName || '', Validators.required],
      fullName : [item.fullName || '', Validators.required],
      function : [item.function || '', Validators.required],
      emailOne : [item.emailOne || '', Validators.required],
      emailTwo : [item.emailTwo || '', Validators.required],
      phoneNumberOne : [item.phoneNumberOne || '', Validators.required],
      phoneNumberTwo : [item.phoneNumberTwo || '', Validators.required],
      comment : [item.comment || '', Validators.required],
      privilege : [item.privilege || '', Validators.required],
      civility : [item.civility || '', Validators.required],
      service : [item.service || '', Validators.required],
      partnerNum: [this.data.partnerId, Validators.required]
    });
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
    console.log(this.itemForm.value)
  }
}


