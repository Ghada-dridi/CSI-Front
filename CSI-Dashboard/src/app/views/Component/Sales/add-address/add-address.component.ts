import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudPartnerService } from "../partner/crudPartner.service";
@Component({
    selector: 'add-address',
    templateUrl: './add-address.component.html',
  
  })

export class addAddressComponent implements OnInit {
    public itemForm: FormGroup;
    public partnerId: number;

    
    constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<addAddressComponent>,
  private fb: FormBuilder,
  private crudPartnerService: CrudPartnerService,
  ) { }
  buildItemForm(item){
    this.itemForm = this.fb.group({
      addressTitle : [item.addressTitle || '', Validators.required],
      street : [item.street || '', Validators.required], 
      partnerNum: [this.data.partnerId, Validators.required]
     })}
    ngOnInit(): void {
        this.partnerId = this.data.partnerId;
        this.buildItemForm(this.data.payload)
    }
    submit() {
        this.dialogRef.close(this.itemForm.value)
        this.crudPartnerService.getItemAddresses(this.partnerId)
      }
}