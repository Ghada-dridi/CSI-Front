import { Service } from 'app/shared/models/contact';
import { referentielRoutes } from './../referentiel.routing';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Civility, MaritalSituation, Provenance, Title } from 'app/shared/models/Employee';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { referentielService } from '../referentiel.service';
import { QuestionCategory } from 'app/shared/models/QuestionCategory';
import { ExperienceLevel } from 'app/shared/models/AssOfferCandidate';

@Component({
  selector: 'referentiel-crud',
  templateUrl: './referentielForm.component.html',
  styleUrls:  ['./referentielForm.component.scss']

})


export class referentielFormComponent implements OnInit {
form:FormGroup;
questionForm:FormGroup;
questionCategory:QuestionCategory;
level = Object.values(ExperienceLevel);
submitted=false ;
showSecondForm = false;
questionId:number;
selectedCategory= { id:null};


constructor(private refService:referentielService, private fb: FormBuilder,){

}

ngOnInit(): void {
  this.form = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    level: new UntypedFormControl('', [Validators.required]),
  })

  this.questionForm = this.fb.group({
    value : new FormArray([])
   });
   (this.questionForm.get('value') as FormArray).push(this.fb.group({
    question : new UntypedFormControl('', [Validators.required]),
  }));
 
}

get getQuestion() {
  return (this.questionForm.get('value') as FormArray).controls;
}


/*submitFirstForm() {
 
  console.log('Submitting form...');
  //  if (this.myForm.valid) {
      console.log('Form is valid, submitting...');
      this.refService.addItem(this.form.value).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          this.submitted = true;
        },
        error: (e) => console.error('Error adding item', e)
      });
  this.showSecondForm = true;
}*/


/*submitSecondForm() {
 
  console.log('Submitting form...');
  //  if (this.myForm.valid) {
      console.log('Form is valid, submitting...');
      this.refService.addQuest(this.form.value).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          this.submitted = true;
        },
        error: (e) => console.error('Error adding item', e)
      });
  this.showSecondForm = true;
}*/


ExperienceLevelMap= {
 [ExperienceLevel.JUNIOR]:'Junior',
 [ExperienceLevel.MID_LEVEL]:'Confirmé',
 [ExperienceLevel.SENIOR]:'Senior',
 [ExperienceLevel.EXPERT]:'Expert',
};

saveCatQuestion(): void {
  console.log('Submitting form...');
  this.refService.addItem({...this.form.value}).subscribe({
    next: (res) => {
      console.log('Item added successfully', res);
      this.selectedCategory = res;
      console.log('Selected technical file ID:', this.selectedCategory.id);
     console.log('Form value', this.form.value);
      this.submitted = true;
    },
    error: (e) => {
      console.error('Error adding item', e);
      console.log('Form is invalid');
      console.log(this.form.errors);
    }
  });
  this.showSecondForm = true;
}


saveQuestion(i:any): void {

  this.refService.addQuest({...this.questionForm.get('value.'+i).value, categoryNum:this.selectedCategory.id}).subscribe({
    next: (res) => {
      console.log('Item added successfully', res);
     console.log('Form value', this.questionForm);
      this.submitted = true;
      (this.questionForm.get('value') as FormArray).push(this.fb.group({
      question : new UntypedFormControl('', [Validators.required]),
      }));
      this.questionId=res.id
    },
    error: (e) => {
      console.error('Error adding item', e);
      console.log('cv Form is invalid');
      console.log(this.questionForm.errors);
    }
  });
}

}
