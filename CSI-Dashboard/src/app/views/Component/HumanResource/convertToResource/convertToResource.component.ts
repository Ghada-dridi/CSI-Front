import { update } from './../candidate/updateCandidat/updateCandidat.routing';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Civility, Country, Departement, Employee, EmployeeStatus, MaritalSituation, Provenance, Title, WorkLocation } from 'app/shared/models/Employee';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { LanguageLevel } from 'app/shared/models/Language';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AddResourceService } from '../resource/createResource/add-resource.service';
import { MatTabGroup } from '@angular/material/tabs';
import { updateCandidatService } from '../candidate/updateCandidat/updateCandidat.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-details-candidat',
  templateUrl: './convertToResource.component.html',
  styleUrls:  ['./convertToResource.component.scss']
})


export class ConvertToResourceComponent implements OnInit {
  showLocationName = false;
  employeeId : number
  updateEmployee: FormGroup;
  id:number;
  employee : Employee;
  Civility :string []= Object.values(Civility);
  countries: Country[];
  states: string[];
  MaritalSituation :string []= Object.values(MaritalSituation);
  Provenance:string []= Object.values(Provenance);
  workLocation :string []= Object.values(WorkLocation);
  departement:string []= Object.values(Departement);
  title :string[]= Object.values(Title);
  LanguageLevel : string[] = Object.values(LanguageLevel);
  EmployeeStatus :string[] = Object.values(EmployeeStatus);
  submitted = false;
  selectedFile: File;
  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConvertToResourceComponent>,
    private fb: FormBuilder,
    private update: updateCandidatService,  
    private http: HttpClient,
    private route:ActivatedRoute 
  ) { this.countries = this.update.getCountries();}





  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  ngOnInit() {
    const educationData = this.data.payload;
   // this.getemployee();
   
    this.updateEmployee = new UntypedFormGroup({
      firstName: new UntypedFormControl(this.data.payload.firstName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
      ]),
      lastName: new UntypedFormControl(this.data.payload.lastName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      birthDate: new UntypedFormControl(this.data.payload.birthDate, ),
      title: new UntypedFormControl(this.data.payload.title, ),
      address: new UntypedFormControl(this.data.payload.address),
      emailOne: new UntypedFormControl(this.data.payload.emailOne, ),
      phoneNumberOne: new UntypedFormControl(this.data.payload.phoneNumberOne, ),
      civility: new UntypedFormControl(this.data.payload.civility, []),
      employeeStatus: new UntypedFormControl(this.data.payload.EmployeeStatus, []),
      maritalSituation: new UntypedFormControl(this.data.payload.maritalSituation, []),
      country: new UntypedFormControl(this.data.payload.country, []),
      city: new UntypedFormControl(this.data.payload.city, []),
      postCode: new UntypedFormControl(this.data.payload.postCode, ),
      emailTwo: new UntypedFormControl(this.data.payload.emailTwo, ),
      phoneNumberTwo: new UntypedFormControl(this.data.payload.phoneNumberTwo, ),
      id: new UntypedFormControl(this.data.technichalFile, []),
      workLocation: new UntypedFormControl(this.data.payload.workLocation, ),
      departement: new UntypedFormControl(this.data.payload.departement, ),
      socialSecurityNumber: new UntypedFormControl(this.data.payload.socialSecurityNumber, )



    })

  }

  submit() {
    console.log('submit method',this.updateEmployee.valid)
    this.dialogRef.close(this.updateEmployee.value)
   
  }
 
 
  ///// Form Submit///// 
 

  getemployee() {
    this.update.getItemById(this.id).subscribe((data: any) => {
      this.employee = data;

    });
  }

onCountryChange(countryShotName: string) {
  this.states = this.update.getStatesByCountry(countryShotName);
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
  nextTab(tabGroup: MatTabGroup) {
    const nextIndex = (tabGroup.selectedIndex + 1) % tabGroup._tabs.length;
    tabGroup.selectedIndex = nextIndex;
  }
  previousTab(tabGroup: MatTabGroup) {
    const previousIndex = (tabGroup.selectedIndex + tabGroup._tabs.length - 1) % tabGroup._tabs.length;
    tabGroup.selectedIndex = previousIndex;
  }
  onFraisTypeSelectionChange(event: any) {
    const selectedFraisType = event.value;
    this.showLocationName = selectedFraisType === 'OTHER_LOCATION';
  }

}
