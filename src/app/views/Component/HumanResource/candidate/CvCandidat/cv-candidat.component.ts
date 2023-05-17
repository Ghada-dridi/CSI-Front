import { id } from 'date-fns/locale';
import { Offer } from './../../../../../shared/models/Offer';
import { Experience } from 'app/shared/models/Experience';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Employee, MaritalSituation, ResourceType } from '../../../../../shared/models/Employee';
import { Inject, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormArray, AbstractControl, UntypedFormArray } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { CompanyStatus, LegalStatus, Provenance, Country } from 'app/shared/models/Partner';
import {  Civility, Service } from 'app/shared/models/contact';
import { WorkField, Availability, RequirementStatus, RequirementType } from 'app/shared/models/req';
import { Title } from 'app/shared/models/Employee';
import { CvCandidatService } from './cv-candidat.service';
import { LanguageLevel, Languages } from 'app/shared/models/Language';
import { Subscription, catchError, of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Skills } from 'app/shared/models/Skills';
import { cvDialog1Component } from './CvCandidatDialog/dialog1.component';


@Component({
  selector: 'app-basic-form',
  templateUrl: './cv-candidat.component.html',
  styleUrls: ['./cv-candidat.component.scss'],
})

export class cvcandidatComponent implements OnInit {
  formData = {}
  console = console;
  repeatForm: FormGroup;
  myForm: FormGroup;
  techFileForm: FormGroup;
  languageForm: FormGroup;
  cvForm: FormGroup;
  step1:FormGroup;
  step2:FormGroup;
  step3:FormGroup;
  step4:FormGroup;
  stepIG:FormGroup;
  stepTechFile:FormGroup;
  stepOffres:FormGroup;
  lastEmployee: Employee;
  selectedEmplyee= {firstName :'', id:null};
  selectedTechFile= { id:null};

//////////////Ajout Candidat///////////////
  public itemForm: FormGroup;;
  CompanyStatus = Object.values(CompanyStatus);
  WorkField :string []= Object.values(WorkField);
  LegalStatus = Object.values(LegalStatus);
  Provenance = Object.values(Provenance);
  countries: Country[];
  states: string[];
  selectedFile: File;
  title :any[]= Object.values(Title);
  Civility :string []= Object.values(Civility);
  MaritalSituation :any []= Object.values(MaritalSituation);
  resourceType :any []= Object.values(ResourceType);
  Service :string []= Object.values(Service);
  Availability : string [] = Object.values(Availability);
  RequirementStatus  :string []= Object.values(RequirementStatus);
  RequirementType : string[] = Object.values(RequirementType);
  Languages : string[] = Object.values(Languages);
  LanguageLevel : string[] = Object.values(LanguageLevel);
  employee: Employee;
  submitted = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  skills: Skills[] = [];
  offers: Offer[];
  isPageReloaded = false;
  public dataSource: any;
  public displayedColumns: any;
  public getItemSub: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  formWidth = 200; //declare and initialize formWidth property
  formHeight = 700; //declare and initialize formHeight property



 constructor(private _formBuilder: FormBuilder,
  private cvCandidatService: CvCandidatService,
  private formBuilder: FormBuilder,
  private fb: FormBuilder,
  private router:Router,
   private http: HttpClient,
   public dialog: MatDialog)
   {  this.countries = this.cvCandidatService.getCountries();}

  ngOnInit() {

   /* this.languageForm = new UntypedFormGroup({
      languages: new UntypedFormArray([
        this.createLanguage()
      ]) });*/
   
    this.cvCandidatService.getOfferItems().subscribe(
      offers => this.offers = offers,
      error => console.log(error)
    );

    
    this.displayedColumns = this.getDisplayedColumns();
    this.getOfferItems()
    this.repeatForm= new FormGroup({
      repeatArray: new FormArray([])
    });
   this.cvCandidatService.getLastEmployee().subscribe(employee => {
      this.lastEmployee = employee;
    });

  
    this.myForm = new UntypedFormGroup({
      firstName: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
        this.capitalLetterValidator
      ]),
      lastName: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        this.capitalLetterValidator
      ]),
      birthDate: new UntypedFormControl('', [Validators.required]),
      title: new UntypedFormControl('',[Validators.required] ),
      address: new UntypedFormControl(''),
      emailOne: new UntypedFormControl('',[Validators.required] ),
      phoneNumberOne: new UntypedFormControl('', [Validators.required]),
      civility: new UntypedFormControl('', []),
      maritalSituation: new UntypedFormControl('', []),
      country: new UntypedFormControl('', [Validators.required]),
      city: new UntypedFormControl('', []),
      postCode: new UntypedFormControl('', []),
      emailTwo: new UntypedFormControl('', ),
      phoneNumberTwo: new UntypedFormControl('', []),
      resourceType : new UntypedFormControl('',[])

    })
      this.cvForm = new UntypedFormGroup({
      institution: new UntypedFormControl('', [Validators.required]),
      diploma: new UntypedFormControl('', [Validators.required]),
      score: new UntypedFormControl('', []),
      startYear: new UntypedFormControl('', []),
      obtainedDate: new UntypedFormControl('', []),
      actual: new UntypedFormControl(false),
      actualEmployment :new UntypedFormControl(false),
      experienceCompany: new UntypedFormControl('', []),
      experiencePost: new UntypedFormControl('', []),
      experienceTitle: new UntypedFormControl('', []),
      experienceRole : new UntypedFormControl('', []),
      experienceStartDate: new UntypedFormControl('', []),
      experienceEndDate: new UntypedFormControl('', []),
      technology: new UntypedFormControl('', []),
      certificationTitle: new UntypedFormControl('', []),
      certificationObtainedDate: new UntypedFormControl('', []),
      language: new UntypedFormControl('', []),
      languageLevel: new UntypedFormControl('', []),
      additionalInformation: new UntypedFormControl('', []),
      skillsTitle : new UntypedFormControl('', [])
    })

    /*this.languageForm = new UntypedFormGroup({
      language: new UntypedFormControl('', []),
      languageLevel: new UntypedFormControl('', []),
      additionalInformation: new UntypedFormControl('', []),

    })*/

      this.techFileForm = new UntypedFormGroup({
      reference: new UntypedFormControl('', []),
      description: new UntypedFormControl('', []),
      objective: new UntypedFormControl('', []),
      driverLicense: new UntypedFormControl('', []),
      //nationality: new UntypedFormControl('', []),
    })


    /////FormDuplicate///
    this.repeatForm = this._formBuilder.group({
      repeatArray: this._formBuilder.array([this.createRepeatForm()])
    });


    /////Countries////
    this.myForm.get("country").valueChanges.subscribe((country) => {
      this.myForm.get("city").reset();
      if (country) {
        this.states = this.cvCandidatService.getStatesByCountry(country);
      }
    })
  }

  
  /*get languages(): FormArray {
    return this.languageForm.get('languages') as FormArray;
  }

  addLanguage() {
    this.languages.push(this.createLanguage());
    this.languageForm.patchValue({
      languages: this.languages.getRawValue()
    });
  }

  createLanguage(): UntypedFormGroup {
    return new UntypedFormGroup({
      languageLevel: new UntypedFormControl('', []),
      additionalInformation: new UntypedFormControl('',[]),
      language: new UntypedFormControl('',[])
    });
  }

  onSubmitLanguage() {
    console.log(this.languageForm.getRawValue());
    this.cvCandidatService.addLanguage({...this.languageForm.getRawValue(), technicalFileId: this.selectedTechFile.id}).subscribe({
      next: (res) => {
        console.log('Language added successfully', res);
        console.log('Form value', this.languageForm.getRawValue());
        this.submitted = true;
      },
      error: (e) => {
        console.error('Error adding Language', e);
        console.log('Language Form is invalid');
        console.log(this.languageForm.getRawValue());
      }
    });
  }*/

  /////Make first letter capital//////
  capitalLetterValidator(control: FormControl): { [key: string]: boolean } | null {
    const firstLetter = control.value.charAt(0);
    if (firstLetter && firstLetter !== firstLetter.toUpperCase()) {
      return { 'capitalLetter': true };
    }
    return null;
  }


  /*ngAfterViewInit() {
    if (!this.isPageReloaded) {
      this.isPageReloaded = true;
      window.location.reload();
    }
  }*/

  saveCandidate(): void {
    console.log('Submitting form...');
  //  if (this.myForm.valid) {
      console.log('Form is valid, submitting...');
      this.cvCandidatService.addItem(this.myForm.value).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          this.selectedEmplyee = res;
          console.log('Selected candidat ID:', this.selectedEmplyee.id);
          console.log('Form value', this.myForm.value);
          this.submitted = true;
        },
        error: (e) => console.error('Error adding item', e)
      });
      this.dialog.open(cvDialog1Component);
    }

    saveTechFile(): void {
      console.log('Submitting form...');
      this.cvCandidatService.addTechFile({...this.techFileForm.value, employeeId:this.selectedEmplyee.id}).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          this.selectedTechFile = res;
          console.log('Selected technical file ID:', this.selectedTechFile.id);
         console.log('Form value', this.techFileForm.value);
          this.submitted = true;
        },
        error: (e) => {
          console.error('Error adding item', e);
          console.log('Form is invalid');
          console.log(this.techFileForm.errors);
        }
      });
    }

    ///////////ajoutCandidature////////////////////////
    saveOfferCandidat(id :number): void {
      console.log('ajout...');
      this.cvCandidatService.addOfferCandidate({employeeNum:this.selectedEmplyee.id ,offerNum:id}).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          this.selectedTechFile = res;
          console.log('Selected technical file ID:', this.selectedTechFile.id);
         console.log('Form value', this.techFileForm.value);
          this.submitted = true;
        },
        error: (e) => {
          console.error('Error adding item', e);
          console.log('Form is invalid');
          console.log(this.techFileForm.errors);
        }
      });
    }
  

    /*saveFormation(): void {
      console.log('Submitting cv form...');
      this.cvCandidatService.addEducation({...this.cvForm.value, technicalFileId:this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          console.log('Form value', this.cvForm.value);
          this.submitted = true;
        },   
        error: (e) => {
          console.error('Error adding item', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });
    }*/

    /*saveExperience(): void {
      console.log('Submitting cv form...');
      this.cvCandidatService.addExperience({...this.cvForm.value, technicalFileId:this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          console.log('Form value', this.cvForm.value);
          this.submitted = true;
        },   
        error: (e) => {
          console.error('Error adding item', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });
    }*/


    saveCertif(): void {
      console.log('Submitting cv form...');
      this.cvCandidatService.addCertif({...this.cvForm.value, technicalFileId:this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          console.log('Form value', this.cvForm.value);
          this.submitted = true; 
        },   
        error: (e) => {
          console.error('Error adding item', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });
    }


     saveRest(): void {
      console.log('Submitting cv form...');
         
      //Save Formation 
      this.cvCandidatService.addEducation({...this.cvForm.value, technicalFileId:this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          console.log('Form value', this.cvForm.value);
          this.submitted = true;
        },   
        error: (e) => {
          console.error('Error adding item', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });

      // Save Expérience 
      this.cvCandidatService.addExperience({...this.cvForm.value, technicalFileId:this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          console.log('Form value', this.cvForm.value);
          this.submitted = true;
        },   
        error: (e) => {
          console.error('Error adding item', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });

      // Save language
      this.cvCandidatService.addLanguage({...this.cvForm.value, technicalFileId: this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('Language added successfully', res);
          console.log('Form value', this.cvForm.value);
          this.submitted = true;
        },
        error: (e) => {
          console.error('Error adding Language', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });
    
      // Save certif
      this.cvCandidatService.addCertif({...this.cvForm.value, technicalFileId: this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('certif added successfully', res);
          console.log('Form value', this.cvForm.value);
          this.submitted = true;
        },
        error: (e) => {
          console.error('Error adding certif',e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });

    
      // Save skills
      this.cvCandidatService.addSkill({...this.cvForm.value, technicalFileId:this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('skill added successfully', res);
          console.log('Form value', this.cvForm.value);
          this.submitted = true;
        },   
        error: (e) => {
          console.error('Error adding skill', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });


      // Save skills category
      this.cvCandidatService.addSkillCategory({...this.cvForm.value, technicalFileId: this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('skill cat added successfully', res);
          console.log('Form value', this.cvForm.value);
          this.submitted = true;
        },
        error: (e) => {
          console.error('Error adding skill cat', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });
    }
    

  public confirmer(){}
   ///////Skills chips//////////
   add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add skill
    if ((value || '').trim()) {
      this.skills.push({skillsTitle: value.trim()});
      this.cvForm.controls['skillTitle'].setValue(this.skills);// update the form control with the new skills array
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  // Remove skill
  remove(skill: Skills): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
      this.cvForm.controls['skillTitle'].setValue(this.skills); // update the form control with the new skills array
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


get repeatFormGroup() : FormArray {
  return this.repeatForm.get('repeatArray') as FormArray;
}

handleAddRepeatForm() {
  this.repeatFormGroup.push(this.createRepeatForm());
}

handleRemoveRepeatForm(index: number) {
  this.repeatFormGroup.removeAt(index);
 /* if (index > 0) { // check if the index is greater than 0
    const repeatArray = this.repeatForm.get('repeatArray') as FormArray;
    repeatArray.removeAt(index);
}*/
}

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  onCountryChange(countryShotName: string) {
    this.states = this.cvCandidatService.getStatesByCountry(countryShotName);
  }
  
  getOfferItems() {    
    this.getItemSub = this.cvCandidatService.getOfferItems()
      .subscribe((data:any)  => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  getDisplayedColumns() {
    return ['reference','title','actions' ];
  }

  maritalSituationMap = {
    [MaritalSituation.SINGLE]:'Célibatire',
    [MaritalSituation.MARRIED]:'Marrié',
   [MaritalSituation.DIVORCED]:'Divorvé',
   [MaritalSituation.WIDOWED] :'Veuf/Veuve',
   [MaritalSituation.COMPLICATED] :'Compliqué'
  };

  civilityMap = {
    [Civility.MRS]:'Mme',
    [Civility.MS]:'Mlle',
   [Civility.MR]:'Mr'
  };

  employeeTitleMap = {
    [Title.FRONT_END_DEVELOPER]: 'Développeur Front-End',
    [Title.BACK_END_DEVELOPER]: 'Développeur Back-End',
    [Title.FULLSTACK_DEVELOPER]: 'Développeur Full-Stack',
    [Title.CRM]: 'CRM',
    [Title.HUMAN_RESOURCE_MANAGER]: 'Responsable des Ressources Humaines',
    [Title.HUMAN_RESOURCE]: 'Ressources Humaines',
    [Title.PROJECT_MANAGER]: 'Chef de Projet',
    [Title.TECH_LEAD]: 'Chef de Projet',
    [Title.UI_UX_DESIGNER]: 'Concepteur UI/UX',
    [Title.QA_ENGINEER]: 'Ingénieur QA',
    [Title.DEVOPS_ENGINEER]: 'Ingénieur DevOps',
    [Title.WEB_DEVELOPER]: 'Développeur Web',
    [Title.OFFICE_MANAGER]: 'Responsable d Agence',
    [Title.ACCOUNTANT]: 'Comptable',
    [Title.SALES_REPRESENTATIVE]: 'Représentant Commercial',
    [Title.CUSTOMER_SUPPORT_SPECIALIST]: 'Spécialiste du Support Client',
    [Title.MARKETING_COORDINATOR]: 'Coordinateur Marketing'
    
  };

  LanguageLevelMap = {
    [LanguageLevel.BEGINNER_A1]: 'Niveau Débutant A1',
    [LanguageLevel.BEGINNER]: 'Niveau Débutant',
    [LanguageLevel.ELEMENTARY_A2]: 'Niveau Elémentaire A2',
    [LanguageLevel.BASIC]: 'Niveau de Base',
    [LanguageLevel.INTERMEDIATE_B1]: 'Niveau Intermédiaire B1',
    [LanguageLevel.INTERMEDIATE]: 'Niveau Intermédiaire',
    [LanguageLevel.UPPER_INTERMEDIATE_B2]: 'Niveau Intermédiaire Supérieur B2',
    [LanguageLevel.PROFESSIONAL]: 'Niveau Professionnel',
    [LanguageLevel.ADVANCED_C1]: 'Niveau Avancé C1',
    [LanguageLevel.FLUENT]: 'Courant',
    [LanguageLevel.PROFICIENT_C2]: 'Niveau Expert C2',
    [LanguageLevel.NATIVE_LANGUAGE]: 'Langue Maternelle',
    [LanguageLevel.BILINGUAL]: 'Bilingue'
  };

  
  
  
}