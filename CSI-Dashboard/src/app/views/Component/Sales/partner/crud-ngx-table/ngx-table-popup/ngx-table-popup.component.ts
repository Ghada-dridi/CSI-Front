import { CrudPartnerService } from './../../crudPartner.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Validators,  FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Partner,CompanyStatus,WorkField,LegalStatus,Provenance ,Country} from 'app/shared/models/Partner';
import { Civility, Privilege, Service } from 'app/shared/models/contact';
import { Availability, RequirementStatus, RequirementType } from 'app/shared/models/req';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
//import { log } from 'console';


@Component({
  selector: 'app-ngx-table-popup',
  templateUrl: './ngx-table-popup.component.html'
})
export class NgxTablePopupComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;


  public itemForm: FormGroup;
  CompanyStatus = Object.values(CompanyStatus);
  WorkField :string []= Object.values(WorkField);
  LegalStatus = Object.values(LegalStatus);
  Provenance = Object.values(Provenance);
  countries: Country[];
  states: string[];
  selectedFile: File;
  Privilege :string []= Object.values(Privilege);
  Civility :string []= Object.values(Civility);
  Service :string []= Object.values(Service);
  formWidth = 200; //declare and initialize formWidth property
  formHeight = 700; //declare and initialize formHeight property
  Availability : string [] = Object.values(Availability);
  repeatForm : FormGroup;
  
  RequirementStatus  :string []= Object.values(RequirementStatus);
  RequirementType : string[] = Object.values(RequirementType);

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NgxTablePopupComponent>,
    private fb: FormBuilder,
    private crudService: CrudPartnerService,  
    private http: HttpClient
  ) {     this.countries = this.crudService.getCountries();

  }



  buildItemForm(item){
    this.itemForm = this.fb.group({
      name : [item.name || '', Validators.required],
      staffNumber : [item.staffNumber || '', Validators.required], 
      parentCompany : [item.parentCompany || '', Validators.required],
      ceoName : [item.ceoName || '', Validators.required],
      phoneNumber : [item.phoneNumber || '', Validators.required ,],
      phoneNumberTwo: [item.phoneNumberTwo ||'', Validators.required, ],
      postCode : [item.postCode || '', Validators.required],
      city : [item.city || '', Validators.required],
      description : [item.description || '', Validators.required],
      logo : [item.logo || null, Validators.required],
      activityStartDate : [item.activityStartDate || '', Validators.required],
      partnerShipDate : [item.partnerShipDate || '', Validators.required],
      companyStatus : [item.companyStatus || '', Validators.required],
      refPhoneNumber : [item.refPhoneNumber || '', Validators.required ,],
      country : [item.country || '', Validators.required],
      workField : [item.workField || '', Validators.required],
      legalStatus : [item.legalStatus || '', Validators.required],
      provenance : [item.provenance || '', Validators.required],
      devise : [item.devise || '', Validators.required]
    });

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


  }

  onCountryChange(countryShotName: string) {
    this.states = this.crudService.getStatesByCountry(countryShotName);
  }


  createRepeatForm(): FormGroup {
    return this._formBuilder.group({
    });
  }
  get repeatFormGroup() {
    return this.repeatForm.get('repeatArray') as FormArray;
  }
  handleAddRepeatForm() {
    this.repeatFormGroup.push(this.createRepeatForm());
  }
  handleRemoveRepeatForm(index: number) {
    this.repeatFormGroup.removeAt(index);
    if (index > 0) { // check if the index is greater than 0
      const repeatArray = this.repeatForm.get('repeatArray') as FormArray;
      repeatArray.removeAt(index);
  }
  }
  
  onFileSelected(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log(reader.result)
        this.itemForm.patchValue({
          logo: reader.result
        });
  
        console.log(this.itemForm.value)
      };
    }
  }

 

  CompanyStatusMap = {
    [CompanyStatus.PROSPECT]:'Prospect',
    [CompanyStatus.SUPPLIER]:'Fournisseur',
   [CompanyStatus.CLIENT]:'Client',
   [CompanyStatus.ARCHIVED] :'Archivé'
  };

  provenanceMap = {
    [Provenance.JOBS_FORUM]:'Salon des entreprises',
    [Provenance.RECOMMENDATION]:'Recommendation',
   [Provenance.COOPERATION]:'Coopération',
   [Provenance.OTHER] :'Autre'
  };

  workFieldMap = {
    [WorkField.IT]:'IT',
    [WorkField.INDUSTRY]:'Industrie',
   [WorkField.SALES]:'Ventes',
   [WorkField.AGRICULTURE] :'Agriculture',
   [WorkField.BANKING] :'Banking',
   [WorkField.E_COM] :'E-Commerce',
   [WorkField.ASSURANCE] :'Assurance',
   [WorkField.FINANCE] :'Finance'
  };

  legalStatusMap = {
    [LegalStatus.SA]:'SA',
    [LegalStatus.SARL]:'SARL'
  };
}