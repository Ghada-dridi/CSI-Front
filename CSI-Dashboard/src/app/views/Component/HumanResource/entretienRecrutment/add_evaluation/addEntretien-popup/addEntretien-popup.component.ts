import { catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Validators,  FormGroup, FormBuilder, FormArray, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { entretienRecrutmentService } from '../../entretienRecrutment.service';
import { Interview, InterviewMode, InterviewType } from 'app/shared/models/Interview';


@Component({
  selector: 'app-ngx-table-popup',
  templateUrl: './addEntretien-popup.component.html'
})
export class ajoutEntretienPopupComponent implements OnInit {
  
  submitted = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  offerForm : FormGroup;
  formWidth = 200; //declare and initialize formWidth property
  formHeight = 700; //declare and initialize formHeight property

  ////////////////Interview Form/////////////
  interviewType :string []= Object.values(InterviewType);
  interviewMode :string []= Object.values(InterviewMode);
  interview: Interview;


  selectedFile: File;
  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ajoutEntretienPopupComponent>,
    private fb: FormBuilder,
    private entretien : entretienRecrutmentService,  
    private http: HttpClient
  ) { }


  ngOnInit() {
    this.offerForm = new UntypedFormGroup({
      
      interviewDate: new UntypedFormControl('', [Validators.required]),
      comment: new UntypedFormControl('', []),
      interviewType: new UntypedFormControl('', [Validators.required]),
      duration: new UntypedFormControl('', []),
      interviewMode: new UntypedFormControl('', [Validators.required])
    })
    
  }

  saveInterview(): void {
    console.log('Submitting cv form...');
    this.entretien.addInterview({...this.offerForm.value}).subscribe({
      next: (res) => {
        console.log('Item added successfully', res);
        console.log('Form value', this.offerForm.value);
        this.submitted = true; 
      },   
      error: (e) => {
        console.error('Error adding item', e);
        console.log('cv Form is invalid');
        console.log(this.offerForm.errors);
      }
    });
  }

  /*saveInterview(): void {
    this.entretien.addInterview(this.offerForm.value).subscribe(
        response => {
          console.log('Interview saved successfully!');
          console.log(response); // if you want to see the response from the server
        },
        error => {
          console.error('Error saving interview: ', error);
        }
      );
  }*/


  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  /*submit() {
    this.dialogRef.close(this.offerForm.value)
  }*/

 
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

InterviewModeMap = {
  [InterviewMode.REMOTE]: 'À distance',
  [InterviewMode.ON_SITE]: 'Sur place',}


  InterviewTypeMap = {
  [InterviewType.BEHAVIORAL_INTERVIEW]: 'Entretien comportemental',
  [InterviewType.TECHNICAL_INTERVIEW]: 'Entretien technique',
  [InterviewType.CASE_STUDY_INTERVIEW]: 'Entretien détude de cas',
  [InterviewType.HUMAN_RESOURCE_INTERVIEW]: 'Entretien ressources humaines',
  [InterviewType.ONLINE_TEST]: 'Entretien en ligne',
  [InterviewType.ON_SITE_TEST]: 'Entretien sur site ',
  [InterviewType.PANEL_INTERVIEW]: 'Entretien avec un panel',
  [InterviewType.GROUP_INTERVIEW]: 'Entretien collectif',
  [InterviewType.PHONE_INTERVIEW]: 'Entretien téléphonique',
  [InterviewType.IN_PERSON]: 'Entretien présentiel'
}

weekendFilter = (d: Date | null): boolean => {
  const day = (d || new Date()).getDay();
  // Prevent Saturday and Sunday from being selected.
  return day !== 0 && day !== 6;
};
}