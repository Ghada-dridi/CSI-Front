import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Validators,  FormGroup, FormBuilder } from '@angular/forms';
import { Partner,CompanyStatus,WorkField,LegalStatus,Provenance ,Country} from 'app/shared/models/Partner';
import { CrudService } from '../../crud.service';
import { Router } from '@angular/router';


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
  userFile;
  public imagePath;
  imgURL: any;
  public message: string; 
  logo:File=null
  logoName:string='';
  formWidth = 200; // declare and initialize formWidth property
  formHeight = 700; // declare and initialize formHeight property


  constructor(
    private router: Router,
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
      phoneNumber : [item.phoneNumber || '', Validators.required ,],
      phoneNumberTwo: [item.phoneNumberTwo ||'', Validators.required, ],
      postCode : [item.postCode || '', Validators.required],
      city : [item.city || '', Validators.required],
      description : [item.description || '', Validators.required],
      logo : [item.logo || '', Validators.required],
      activityStartDate : [item.activityStartDate || '', Validators.required],
      partnerShipDate : [item.partnerShipDate || '', Validators.required],
      companyStatus : [item.companyStatus || '', Validators.required],
      refPhoneNumber : [item.refPhoneNumber || '', Validators.required ,],
      country : [item.country || '', Validators.required],
      workField : [item.workField || '', Validators.required],
      legalStatus : [item.legalStatus || '', Validators.required],
      provenance : [item.provenance || '', Validators.required],

      
  
      
    });

  }

  // onFileSelected(event) {
  //   if (event.target.files.length > 0){
  //     const file = event.target.files[0];
  //     this.userFile = file;

  //     var mimeType = event.target.files[0].type;
  //     if (mimeType.match(/image\/*/) == null){
  //       this.message = "Only images are supported.";
  //       return;
  //     }

  //     var reader = new FileReader();
  //     this.imagePath = file;
  //     reader.readAsDataURL(file);
  //     reader.onload = (_event)=>{
  //       this.imgURL = reader.result;
  //     }
  //   }
  // }
  onFileSelected(event:any,fileName = '') {
    if (event.target.files[0] && event.target.files.length > 0){
      const base64String =  this.crudService.convertFileToBase64(event.target.files[0])
      if (fileName === 'logo') {
      this.logo== event.target.files[0]
      this.itemForm.patchValue({logo:base64String})
      this.logoName=this.logo.name
    }
  }
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
    console.log("----")
    console.log(this.itemForm.value)
    this.addData();
    this.dialogRef.close(this.itemForm.value)
  }

  addData(){
    const partner = this.crudService.dataForm.value;
console.log('test1')
    this.crudService.addItem(partner).subscribe( response => {
      console.log("succes",response);
      alert("succes")
      this.router.navigate(['/gg/ahmed']);
    });
   
  }

  onCountryChange(countryShotName: string) {
    this.states = this.crudService.getStatesByCountry(countryShotName);
  }

  


}