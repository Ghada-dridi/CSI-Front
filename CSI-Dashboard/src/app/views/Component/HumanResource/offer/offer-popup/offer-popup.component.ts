import { catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OfferService } from './../offer.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Validators,  FormGroup, FormBuilder, FormArray } from '@angular/forms';


@Component({
  selector: 'app-ngx-table-popup',
  templateUrl: './offer-popup.component.html'
})
export class OfferPopupComponent implements OnInit {
  submitted = false;
  offerForm : FormGroup;
  private offerService: OfferService
  formWidth = 200; //declare and initialize formWidth property
  formHeight = 700; //declare and initialize formHeight property
  
  selectedFile: File;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OfferPopupComponent>,
    private fb: FormBuilder,
    private crudService: OfferService,  
    private http: HttpClient
  ) { }



  buildItemForm(item){
    this.offerForm = this.fb.group({
      reference : [item.reference || '', Validators.required],
      title : [item.title || '', Validators.required],
      description : [item.description || '', Validators.required]
    });

  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }

  submit() {
    this.dialogRef.close(this.offerForm.value)
  }

 
  ///// Form Submit///// 
  onSubmit() {
    // Get the values of each form
    const formData = this.offerForm.value;

    this.http.post('http://localhost:8080/rh/employee', formData)
  .pipe(
    catchError(error => {
      console.log(error);
      return of(error);
    })
  )
  .subscribe(response => {
    console.log(response);
    // Handle the response, such as displaying a success message
  });
  }

}