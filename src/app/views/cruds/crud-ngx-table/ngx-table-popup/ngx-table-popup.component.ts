import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Validators,  FormGroup, FormBuilder } from '@angular/forms';
import { Partner,CompanyStatus,WorkField,LegalStatus,Provenance ,Country} from 'app/shared/models/Partner';
import { CrudService } from '../../crud.service';


@Component({
  selector: 'app-ngx-table-popup',
  templateUrl: './ngx-table-popup.component.html'
})
export class NgxTablePopupComponent implements OnInit {
  public itemForm: FormGroup;;
  CompanyStatus = Object.values(CompanyStatus);
  WorkField :string []= Object.values(WorkField);
  LegalStatus = Object.values(LegalStatus);
  Provenance = Object.values(Provenance);
  countries: Country[];
  states: string[];
  selectedFile: File;

  formWidth = 200; // declare and initialize formWidth property
  formHeight = 700; // declare and initialize formHeight property


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NgxTablePopupComponent>,
    private fb: FormBuilder,
    private crudService: CrudService,  
  ) {     this.countries = this.crudService.getCountries();

  }



  buildItemForm(item){
    this.itemForm = this.fb.group({
      name : [item.name || '', Validators.required],
      staffNumber : [item.staffNumber || '', Validators.required], 
      parentCompany : [item.parentCompany || '', Validators.required],
      ceoName : [item.ceoName || '', Validators.required],
      phoneNumber : [item.phoneNumber || '', Validators.required],
      phoneNumberTwo: [item.phoneNumberTwo ||'', Validators.required, Validators.pattern('^\\+[1-9]\\d{1,14}$')],
      postCode : [item.postCode || '', Validators.required],
      city : [item.city || '', Validators.required],
      description : [item.description || '', Validators.required],
      logo : [item.logo || '', Validators.required],
      activityStartDate : [item.activityStartDate || '', Validators.required],
      partnerShipDate : [item.partnerShipDate || '', Validators.required],
      companyStatus : [item.CompanyStatus || '', Validators.required],
      RefPhoneNumber : [item.RefPhoneNumber || '', Validators.required],
      Country : [item.Country || '', Validators.required],
      workField : [item.WorkField || '', Validators.required],
      legalStatus : [item.LegalStatus || '', Validators.required],
      provenance : [item.Provenance || '', Validators.required],

      
  
      
    });

  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  ngOnInit() {
    this.buildItemForm(this.data.payload)
    
    this.itemForm.get("country").valueChanges.subscribe((country) => {
      this.itemForm.get("city").reset();
      if (country) {
        this.states = this.crudService.getStatesByCountry(country);
   
      }
    });

  }

  submit() {
    
    this.dialogRef.close(this.itemForm.value)
    console.log(this.itemForm.get("country").value)
    console.log(this.itemForm.get("name").value)

  }

  onCountryChange(countryShotName: string) {
    this.states = this.crudService.getStatesByCountry(countryShotName);
  }

  


}


