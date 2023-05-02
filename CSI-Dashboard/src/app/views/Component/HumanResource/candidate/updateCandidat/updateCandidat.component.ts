import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MaritalSituation } from '../../../../../shared/models/Employee';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormArray } from '@angular/forms'; 
import {FormControl} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Fruit } from 'assets/examples/material/input-chip/input-chip.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyStatus, LegalStatus, Provenance, Country } from 'app/shared/models/Partner';
import { Privilege, Civility, Service } from 'app/shared/models/contact';
import { WorkField, Availability, RequirementStatus, RequirementType } from 'app/shared/models/req';
import { Title } from 'app/shared/models/Employee';

import { LanguageLevel, Languages } from 'app/shared/models/Language';
import { catchError, of } from 'rxjs';
import { updateCandidateService } from './updateCandidat.service';


@Component({
  selector: 'app-basic-form',
  templateUrl: './updateCandidat.component.html',
  styleUrls: ['./updateCandidat.component.css'],
  
})
 
export class updatecandidatComponent implements OnInit {
  
  formData = {}
  console = console;
  repeatForm: FormGroup;
  myForm: FormGroup;
  form1: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  form4: FormGroup;
  step1:FormGroup;
  step2:FormGroup;
  step3:FormGroup;
  step4:FormGroup;

//////////////Ajout Candidat///////////////
  public itemForm: FormGroup;;
  CompanyStatus = Object.values(CompanyStatus);
  WorkField :string []= Object.values(WorkField);
  LegalStatus = Object.values(LegalStatus);
  Provenance = Object.values(Provenance);
  countries: Country[];
  states: string[];
  selectedFile: File;
  title :string[]= Object.values(Title);
  Civility :string []= Object.values(Civility);
  MaritalSituation :string []= Object.values(MaritalSituation);
  Service :string []= Object.values(Service);
  formWidth = 200; //declare and initialize formWidth property
  formHeight = 700; //declare and initialize formHeight property
  Availability : string [] = Object.values(Availability);
  RequirementStatus  :string []= Object.values(RequirementStatus);
  RequirementType : string[] = Object.values(RequirementType);
  Languages : string[] = Object.values(Languages);
  LanguageLevel : string[] = Object.values(LanguageLevel);

  submitted = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [];

 constructor(private _formBuilder: FormBuilder,
  private updateCandidatService: updateCandidateService,
  private formBuilder: FormBuilder,
  private router:Router,
   private http: HttpClient) 
   {  this.countries = this.updateCandidatService.getCountries();

    /*this.form1 = new FormGroup({

      firstName: new FormControl(''),
      birthdate: new FormControl(''),
      title: new FormControl(''),
      country: new FormControl(''),
      adress: new FormControl(''),
      email1: new FormControl(''),
      phoneNumber1: new FormControl(''),
      lasttName: new FormControl(''),
      civility: new FormControl(''),
      maritalSituation: new FormControl(''),
      postCode: new FormControl(''),
      email2: new FormControl(''),
      phoneNumber2: new FormControl(''),
      city: new FormControl('')

    });

    this.form2 = new FormGroup({
      institution: new FormControl(''),
      diploma: new FormControl(''),
      score: new FormControl(''),
      educationStartYear: new FormControl(''),
      obtainedYear: new FormControl('')
    });

      this.form3 = new FormGroup({
      company: new FormControl(''),
      experiencePost: new FormControl(''),
      experienceTitle: new FormControl(''),
      experienceRole: new FormControl(''),
      experienceStartYear: new FormControl(''),
      experienceStartMonth: new FormControl(''),
      experienceEndtYear: new FormControl(''),
      experienceEndMonth: new FormControl('')

    }); 
    this.form4 = new FormGroup({
      certification: new FormControl(''),
      certifDate: new FormControl(''),
      language: new FormControl(''),
      languageLevel: new FormControl(''),
      languageInfo: new FormControl(''),
      skillsCategory: new FormControl(''),
      skills: new FormControl(''),
    });
    this.form4.addControl('language', new FormControl(''));*/
  }


  ////////////////////Ajout Candidat///////////////
  
  
  

  ngOnInit() {
    
    

    this.myForm = new UntypedFormGroup({
      firstName: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ]),
      lastName: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(9)
      ]),
      birthDate: new UntypedFormControl('', [Validators.required]),
      /*country: new UntypedFormControl('', [Validators.required]),*/
      title: new UntypedFormControl('', []),
       address: new UntypedFormControl(''),
      emailOne: new UntypedFormControl('', [Validators.required, Validators.email]),
      phoneNumberOne: new UntypedFormControl('', [Validators.required]),
     civility: new UntypedFormControl('', []),
       maritalSituation: new UntypedFormControl('', []),
     /* city: new UntypedFormControl('', []),
      postCode: new UntypedFormControl('', []),*/
      emailTwo: new UntypedFormControl('', [ Validators.email]),
      phoneNumberTwo: new UntypedFormControl('', []),
     /* institution: new UntypedFormControl('', []),
      diploma: new UntypedFormControl('', []),
      score: new UntypedFormControl('', []),
      educationStartYear: new UntypedFormControl('', []),
      obtainedYear: new UntypedFormControl('', []),
      experienceCompany: new UntypedFormControl('', []),
      experiencePost: new UntypedFormControl('', []),
      experienceTitle: new UntypedFormControl('', []),
      experienceRole : new UntypedFormControl('', []),
      experienceStartYear: new UntypedFormControl('', []),
      experienceStartMonth: new UntypedFormControl('', []),
      experienceEndYear: new UntypedFormControl('', []),
      experienceEndMonth: new UntypedFormControl('', []),
      certification: new UntypedFormControl('', []),
      certifDate: new UntypedFormControl('', []),
      language: new UntypedFormControl('', []),
      languageLevel: new UntypedFormControl('', []),
      additionalInformation: new UntypedFormControl('', []),
      skillTitle : new UntypedFormControl('', []),
      skillCategoryTitle: new UntypedFormControl('', []),*/

    })
  
    this.repeatForm = this._formBuilder.group({
      repeatArray: this._formBuilder.array([this.createRepeatForm()])
    });

    /////Countries////
    this.itemForm.get("country").valueChanges.subscribe((country) => {
      this.itemForm.get("city").reset();
      if (country) {
        this.states = this.updateCandidatService.getStatesByCountry(country);
   
      }
    });

    ///form submit
   
  }


  //////////////fonction ghada///////
  updateCandidate(): void {
    console.log('updateCandidate() called');
    this.router.navigate(['updateCandidat/updateCandidate']);
    if (this.myForm.valid) {
      console.log('Form is valid, updating...');
      const id = this.myForm.get('id').value; // replace 'id' with the name of the field containing the employee id in your form
      this.updateCandidatService.updateItem(id, this.myForm.value).subscribe({
        next: (res) => {
          console.log('Item updated successfully', res);
          console.log('Form value', this.myForm.value);
          this.submitted = true;
          console.log(this.myForm.get("firstName"))
          console.log(this.myForm.get("lastName"))
          console.log(this.myForm.get("country"))
          console.log(this.myForm.get("title"))
          console.log(this.myForm.get("adress"))
          console.log(this.myForm.get("birthDate"))
          console.log(this.myForm.get("emailOne"))
          console.log(this.myForm.get("emailtwo"))
          console.log(this.myForm.get("phoneNumberOne"))
          console.log(this.myForm.get("civility"))
          console.log(this.myForm.get("maritalSituation"))
          // Redirect to CandidatCrud-table page
          this.router.navigate(['candidatCrud/CandidatCrud-table']);
        },
        error: (err) => {
          console.error('Error updating item', err);
        }
      });
    }
  }
  
  
  public confirmer(){}

   ///////Skills chips//////////
   add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add skill
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  // Remove skill
  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }


  ///// Form Submit///// 
  onSubmit() {
    // Get the values of each form
    const formData = this.myForm.value;

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



  //Section Supplimentaire button
  showInput = false;
 
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
  


  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  onCountryChange(countryShotName: string) {
    this.states = this.updateCandidatService.getStatesByCountry(countryShotName);
  }
}

