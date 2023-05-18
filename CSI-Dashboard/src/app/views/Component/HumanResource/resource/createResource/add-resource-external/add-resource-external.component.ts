import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Civility,  Employee, EmployeeStatus, MaritalSituation, Provenance, Title, WorkLocation } from 'app/shared/models/Employee';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { FileUploader } from 'ng2-file-upload';
import { AddResourceService } from '../add-resource.service';
import { MatTabGroup } from '@angular/material/tabs';
import { Departement } from 'app/shared/models/externe';
import { Country } from 'app/shared/models/Partner';

@Component({
  selector: 'app-add-resource-external',
  templateUrl: './add-resource-external.component.html',
  styleUrls: ['./add-resource-external.component.scss']
})
export class AddResourceExternalComponent implements OnInit {

  panelOpenState = false;
  showLocationName = false;
  repeatForm : FormGroup;
  row : any;

  public uploader: FileUploader = new FileUploader({ url: 'https://evening-anchorage-315.herokuapp.com/api/' });
  public hasBaseDropZoneOver: boolean = false;
  console = console;

  basicForm: UntypedFormGroup;
  myForm:FormGroup;
  myFormContract:FormGroup;
  myFormExceptionalFee:FormGroup;
  countries: Country[];
  states: string[];
  
  listResource : Employee[] =[];

  civilities = Object.keys(Civility).filter((element) => {
    return isNaN(Number(element));
  });
  
  Title = Object.values(Title).filter((element) => {
    return isNaN(Number(element));
  });
  EmployeeStatus = Object.values(EmployeeStatus).filter((element) => {
    return isNaN(Number(element));
  });
  /*Country = Object.values(Country).filter((element) => {
    return isNaN(Number(element));
  });*/
  MaritalSituation = Object.values(MaritalSituation).filter((element) => {
    return isNaN(Number(element));
  });
  Provenance = Object.values(Provenance).filter((element) => {
    return isNaN(Number(element));
  });
  WorkLocation = Object.values( WorkLocation).filter((element) => {
    return isNaN(Number(element));
  });
  Departement= Object.values( Departement).filter((element) => {
    return isNaN(Number(element));
  });
 
 

  
  documents: string[] = ['CIN', 'CV', 'Lettre de motivation', 'Photo'];

  submitted = false;
  selectedEmployee = {lastName:"" , firstName:"",id:null};
  //selectedContract = {id:null};

  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,  
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
   
    private addResourceService :AddResourceService ,
    ) 
    { 
      this.countries = this.addResourceService.getCountries();
    }

    firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    getResource(){
      this.addResourceService.getExternalItems().subscribe((data :any )=>{
        this.listResource = data
      });
      
      }
  ngOnInit() : void{
    this.row = history.state.row;
    this.repeatForm = this.fb.group({
      repeatArray: this.fb.array([this.createRepeatForm()])
    });
   
    
    
    
    console.log("before  init");

    this.myForm = new FormGroup({
      lastName : new FormControl(this.row.lastName, Validators.required),
      firstName : new FormControl(this.row.firstName, Validators.required), 
      birthDate : new FormControl (this.row.birthDate, Validators.required),
      emailOne : new FormControl(this.row.emailOne, Validators.required),
      emailTwo : new FormControl(this.row. emailTwo , Validators.required),
      address : new FormControl(this.row.address, Validators.required),
      phoneNumberOne: new FormControl(this.row.phoneNumberOne, Validators.required),
      phoneNumberTwo:new FormControl(this.row.phoneNumberTwo, Validators.required),
      postCode :new FormControl(this.row.postCode, Validators.required),
      city : new FormControl(this.row.city, Validators.required),
      workLocation : new FormControl('', Validators.required),
     //  experience : new FormControl('', Validators.required),
     // experienceDetails : new FormControl('', Validators.required),
     // employeeFirstName : new FormControl('', Validators.required),
     // employeeLastName : new FormControl('', Validators.required),
     // employeeSerialNumber : new FormControl('', Validators.required),
      civility : new FormControl(this.row.civility, Validators.required),
      title : new FormControl(this.row.title, Validators.required),
     // employeeStatus : new FormControl('', Validators.required),
      photo : new FormControl(null,Validators.required),
      country : new FormControl('', Validators.required),
      maritalSituation : new FormControl('', Validators.required),
      locationName : new FormControl('', Validators.required),
      socialSecurityNumber : new FormControl('', Validators.required),
     // provenance : new FormControl('', Validators.required), 
  })


  this.myForm.get("country").valueChanges.subscribe((country) => {
    this.myForm.get("city").reset();
    if (country) {
      this.states = this.addResourceService.getStatesByCountry(country);
    }
  })
 
  }

  
/****************************************************************************************/
  addExternalResource(): void {
    console.log('Submitting form...');
    
    this.loader.open('Ajouter une nouvelle  ressource ');
    
    this.addResourceService.addExternalItem(this.myForm.value).subscribe({
      next: (res) => {
        console.log('Item added successfully', res);
        this.selectedEmployee = res;
        console.log('Form value', this.myForm.value);
        this.submitted = true;
    
        this.loader.close();
        this.snack.open('Ressource ajoutée avec succès !', 'OK', { duration: 4000 });
      },
      error: (e) => {
        console.error('Error adding item', e);
        console.log('Form is invalid');
        console.log(this.myForm.errors);
    
        this.loader.close();
        this.snack.open('Erreur!', 'OK', { duration: 4000 });
      }
    });
  }
  
  
 
  onFileSelected(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result)
        this.myForm.patchValue({
          photo: reader.result
        });
        console.log(this.myForm.value)
      };
    }
  }



  


nextTab(tabGroup: MatTabGroup) {
  const nextIndex = (tabGroup.selectedIndex + 1) % tabGroup._tabs.length;
  tabGroup.selectedIndex = nextIndex;
}
previousTab(tabGroup: MatTabGroup) {
  const previousIndex = (tabGroup.selectedIndex + tabGroup._tabs.length - 1) % tabGroup._tabs.length;
  tabGroup.selectedIndex = previousIndex;
}



  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }



public confirmer(){}
  
createRepeatForm(): FormGroup {
  return this.fb.group({
  });
}
get repeatFormGroup() {
  return this.repeatForm.get('repeatArray') as FormArray;
}


onFraisTypeSelectionChange(event: any) {
  const selectedFraisType = event.value;
  this.showLocationName = selectedFraisType === 'OTHER_LOCATION';
}
onCountryChange(countryShotName: string) {
  this.states = this.addResourceService.getStatesByCountry(countryShotName);
}

 addExternal(){

 }
}
