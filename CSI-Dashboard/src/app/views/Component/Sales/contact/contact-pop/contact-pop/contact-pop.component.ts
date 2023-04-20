import { Component, OnInit ,Inject}  from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Validators,  FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Privilege,Civility,Service } from 'app/shared/models/contact';
import { ContactService } from '../../contact.service';
import { Partner } from 'app/shared/models/Partner';
import { CrudPartnerService } from '../../../partner/crudPartner.service';
@Component({
  selector: 'app-contact-pop',
  templateUrl: './contact-pop.component.html',

})
export class ContactPopComponent implements OnInit {
  showDiv = false; 
  toggleDiv() {
    this.showDiv = !this.showDiv;
  }
  private partnerId : number
  public itemForm: FormGroup;
  Privilege :string []= Object.values(Privilege);
  Civility :string []= Object.values(Civility);
  Service :string []= Object.values(Service);
  listPartner : Partner[] = []
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ContactPopComponent>,
  private fb: FormBuilder,
  private crudPartnerService: CrudPartnerService,
  private contactService: ContactService,
  ) { }

  ngOnInit(): void {
    this.buildItemForm(this.data.payload)
    this.getPartner()
    this.partnerId = this.data.partnerId;
  }

  buildItemForm(item){
    this.itemForm = this.fb.group({
      firstName : [item.firstName || '', Validators.required],
      lastName : [item.lastName || '', Validators.required],
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

getPartner(){
  this.crudPartnerService.getItems().subscribe((data :any )=>{
    this.listPartner = data
  });
}

submit() {
  this.dialogRef.close(this.itemForm.value)
  console.log(this.itemForm.value)
}
}




