import { exceptionalFee } from './../../../../../../shared/models/avantagesContrat';
import { MatTabGroup } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from './../article.service';
import { ContractEmployeeService } from './../contract-employee.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { article, articleUpdated } from 'app/shared/models/article';
import { ContractBenifitType, Currency, FeeType } from 'app/shared/models/avantagesContrat';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { AppLoaderComponent } from 'app/shared/services/app-loader/app-loader.component';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContractTitle } from 'app/shared/models/contract';


@Component({
  selector: 'app-add-contract-employee',
  templateUrl: './add-contract-employee.component.html',
  styleUrls: ['./add-contract-employee.component.scss']
})
export class AddContractEmployeeComponent implements OnInit {

  @ViewChild(MatStepper) stepper: MatStepper;

  errorMessage: string;
  myForm : FormGroup;
  repeatForm: FormGroup;
  tabGroup: MatTabGroup; 
  showEditor = true;
  selectedArticleDescription: string = '';
  selectedArticle : any;
  isFieldVisible: boolean = false;
  showEndDate: boolean = true;

  selectedContract = {contractTitle :'',startDate:'', id:null};

  public dataSource: MatTableDataSource<articleUpdated>;
  formArticle = new FormGroup({
  articleTitle: new FormControl(''),
  description: new FormControl('test')
  });
exceptionalFeeId : number ;
benefitId : number;
  articleForm : FormGroup;
  myFormGroup : FormGroup;
  myFormContract : FormGroup;
  myFormBenefit : FormGroup;
  submitted = false;
  public uploader: FileUploader = new FileUploader({ url: 'https://evening-anchorage-315.herokuapp.com/api/' });
  public hasBaseDropZoneOver: boolean = false;
  console = console;
  Articles : article[] = [];
  articles: FormArray;
  myFormExceptionalFee : FormGroup;

  myFormArticle : FormGroup;
  updatedArticles = []; 
  selectedArticleTitles: string[] = [];

  ContractTitle = Object.values( ContractTitle).filter((element) => {
    return isNaN(Number(element));
  });

  /*FeeTypes = Object.values( FeeType).filter((element) => {
  return isNaN(Number(element));
  });
  Currency = Object.values( Currency).filter((element) => {
  return isNaN(Number(element));
  });
  ContractBenifitTypes = Object.values(ContractBenifitType ).filter((element) => {
    return isNaN(Number(element));
    });*/
    
  
/********************** Constructeur*************************/
  constructor(


    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private loader: AppLoaderService,
    private contractEmployeeService: ContractEmployeeService,
    private articleService: ArticleService,
    private confirmService : AppConfirmService,
    private router : Router,
    private snack: MatSnackBar,
    private http : HttpClient,
    ) { 
    
        this.dataSource = new MatTableDataSource<articleUpdated>([]);
    }



    /***********************************  ngOninit  ************************************ */
  ngOnInit() : void{
    this.myForm = new FormGroup({
      articles: new FormArray([])
    });

    this.articleService.getItems().subscribe((articles: any[]) => {
      this.Articles = articles;
    });
   
  
    this.getArticleTitle();
    this.repeatForm = this.fb.group({
      repeatArray: this.fb.array([this.createRepeatForm()])
    
    });


    /*************************************** Repeat form  **************************************/
    this.repeatForm = this._formBuilder.group({
      repeatArray: this._formBuilder.array([this.createRepeatForm()])
    });
    

/********************************************** FormBuilder contract ***********************************************/
  this.myFormContract = this.fb.group({
   // resourceId:new FormControl({value:'' , disabled:true}),
    contractTitle : new FormControl('', Validators.required), 
    startDate : new FormControl('', Validators.required), 
    endDate : new FormControl ('', Validators.required),
    editorContent : new FormControl('<p>test</p>', Validators.required),
    contractIntroduction: new FormControl(`Le présent contrat est conclu entre les parties signataires ci-après :La Société CSI DIGITAL, SARL, au Capital de 10 000 dinars tunisiens dont le Siège Social est sis au Parc d'Activité Economique de Bizerte, inscrite au Registre National des Entreprise sous le numéro 1764694X représentée par son Gérant M'hamed Khamassi.
    En sa qualité d'employeur d'une part 
    1. ET,
     Mr ……….. de nationalité Tunisienne, né(e) le …………………... à ………………., demeurant   au ……………………………, titulaire de CIN n° ……………….,  émise à ……………………. le ……………………………… 
     En cas de son changement M. ……………….. s'engage à informer son employeur par lettre recommandée avec accusé de réception, faute de quoi l'adresse ci-dessus reste valable.
     En sa qualité d'employé d'autre part,` ,Validators.required ),
    contractPlace: new FormControl('', Validators.required), 
   contractDate: new FormControl('', Validators.required), 
   description : new FormControl('', Validators.required), 
   articles: new FormArray([], Validators.required)
    
  });

  (this.myFormContract.get('articles') as FormArray).push(this.fb.group({
    id : new FormControl('',Validators.required),
    articleNumber: new FormControl('', [Validators.required, Validators.min(1)]),
    articleTitle: new FormControl('', Validators.required), 
    description : new FormControl('', Validators.required)
  }));


  /**********************************  Form Exceptional Fee ******************************************************/
  this.myFormExceptionalFee = this.fb.group({
    // contractId:new FormControl({value:'' , disabled:true}),
    value : new FormArray([])  
   });
   (this.myFormExceptionalFee.get('value') as FormArray).push(this.fb.group({
    id : new FormControl('',Validators.required),
    shortDescription : new FormControl('', Validators.required), 
    name : new FormControl ('', Validators.required),
  }));
   
 /**********************************  Form Benefit ******************************************************/ 
 this.myFormBenefit = this.fb.group({
  // contractId:new FormControl({value:'' , disabled:true}),
  myValue : new FormArray([])  
 });
 (this.myFormBenefit.get('myValue') as FormArray).push(this.fb.group({
  id : new FormControl('',Validators.required),
  shortDescription : new FormControl('', Validators.required), 
  description : new FormControl('', Validators.required), 
  

}));


}

get myArrayControls() {
  return (this.myFormContract.get('articles') as FormArray).controls;
}

get getMyValueExceptional() {
  return (this.myFormExceptionalFee.get('value') as FormArray).controls;
}
get getMyValueBenefit() {
  return (this.myFormBenefit.get('myValue') as FormArray).controls;
}


/*
  addArticleFormGroup () {
    (this.myFormContract.get('articles') as FormArray).push(this.fb.group({
      id : new FormControl('',Validators.required),
      articleNumber: new FormControl('', Validators.required), 
      articleTitle: new FormControl('', Validators.required), 
      description : new FormControl('', Validators.required)
    }));
  }*/
/*
  addArticleFormGroup(): void {
    const articlesFormArray = this.myFormContract.get('articles') as FormArray;
  
    // Custom validator to check uniqueness of articleNumber within the form array
    const uniqueArticleNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      const currentArticleNumber = control.value;
      const otherArticleNumbers = articlesFormArray.controls
        .map((control: AbstractControl) => control.get('articleNumber').value)
        .filter((value: any) => value !== currentArticleNumber);
  
      if (otherArticleNumbers.includes(currentArticleNumber)) {
        return { duplicateArticleNumber: true };
      }
  
      return null;
    };
    
  
    // Create the form group with appropriate validators
    const articleFormGroup = this.fb.group({
      id: ['', Validators.required],
      articleNumber: ['', [Validators.required, Validators.min(1)], uniqueArticleNumberValidator],
      articleTitle: ['', Validators.required],
      description: ['', Validators.required]
    });
  
    articlesFormArray.push(articleFormGroup);
  }*/
  addArticleFormGroup(): void {
    const articlesFormArray = this.myFormContract.get('articles') as FormArray;
    const existingArticleNumbers = articlesFormArray.controls.map(control => control.get('articleNumber').value);
  
    const articleFormGroup = this.fb.group({
      id: ['', Validators.required],
      articleNumber: ['', [Validators.required, Validators.min(1), this.uniqueArticleNumberValidator(existingArticleNumbers)]],
      articleTitle: ['', Validators.required],
      description: ['', Validators.required]
    });
  
    articlesFormArray.push(articleFormGroup);
  }
  

  uniqueArticleNumberValidator(existingArticleNumbers: number[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const articleNumber = control.value;
  
      if (existingArticleNumbers.includes(articleNumber)) {
        return { duplicateArticleNumber: true };
      }
  
      return null;
    };
  }
  
  onArticleTitleChange(value: any, i: number): void {
    const articlesFormArray = this.myFormContract.get('articles') as FormArray;
    const articleGroup = articlesFormArray.at(i);
  
    if (articleGroup) {
      const desc = articleGroup.get('description');
      const title = articleGroup.get('articleTitle');
  
      if (desc && title) {
        const selectedArticle = this.Articles.find(article => article.id === value);
        desc.setValue(selectedArticle ? selectedArticle.description : '');
        title.setValue(selectedArticle ? selectedArticle.articleTitle : '');
      }
    }
  }
  isArticleTitleSelected(articleTitleId: string, currentIndex: number): boolean {
    const articlesArray = this.myFormContract.get('articles') as FormArray;
  
    for (let i = 0; i < currentIndex; i++) {
      const selectedArticleTitleId = articlesArray.at(i)?.get('id')?.value;
      if (selectedArticleTitleId === articleTitleId) {
        return true;
      }
    }
    return false;
  }
  

/***********************  next Tab **********************************/

  nextTab(tabGroup: MatTabGroup) {
    const nextIndex = (tabGroup.selectedIndex + 1) % tabGroup._tabs.length;
    tabGroup.selectedIndex = nextIndex;
  }

  /***********************  previous Tab **********************************/

  previousTab(tabGroup: MatTabGroup) {
    const previousIndex = (tabGroup.selectedIndex + tabGroup._tabs.length - 1) % tabGroup._tabs.length;
    tabGroup.selectedIndex = previousIndex;
  }



/************************************************** Ajouter Exceptional Fee ****************************************************/

  addExceptionalFee(i:any): void {
      console.log('Submitting form...');
      this.contractEmployeeService.addExceptinalFee({...this.myFormExceptionalFee.get('value.'+i).value, contractId:this.selectedContract.id}).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
         console.log('Form value', this.myFormExceptionalFee.value);
          this.submitted = true;
          (this.myFormExceptionalFee.get('value') as FormArray).push(this.fb.group({
            id : new FormControl('',Validators.required),
            shortDescription : new FormControl('', Validators.required), 
            name : new FormControl ('', Validators.required),
          }));
          this.exceptionalFeeId=res.id
        },
        error: (e) => {
          console.error('Error adding item', e);
          console.log('Form is invalid');
          console.log(this.myFormExceptionalFee.errors);
        }
      });
    }
    /*********************************** confirmation exceptionalFee ******************************/

    confirmerFee(): void {
      this.confirmService.confirm({ message: 'Les frais exceptionnels sont ajoutés avec succès ! Voulez-vous ajouter des bénéfices ?' })
        .subscribe((result: boolean) => {
          if (result) {
            this.stepper.next();
          } else {
            this.router.navigate(['/contractEmployee/liste-employee-contracts']);
          }
        });
    }
   /*********************************** supprimer exceptionalFee ******************************/

deleteExceptionalFee(id : any) : void {
    
    this.confirmService.confirm({message: `suppression frais exceptionnel`})
      .subscribe(res => {
        if (res) {
          this.loader.open('supprimer frais exceptionnel ');
          this.contractEmployeeService.deleteExceptinalFee(this.exceptionalFeeId)
          .subscribe((data:any)=> {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Frais exceptionnel supprimée!', 'OK', { duration: 4000 })
             
            })
        }
      })
  }
  
  

 
   
    /************************************************** Ajouter Benefit****************************************************/

  addBenefit(i:any): void {
    console.log('Submitting form...');
    this.contractEmployeeService.addBenefit({...this.myFormBenefit.get('myValue.'+i).value, contractId:this.selectedContract.id}).subscribe({
      next: (res) => {
        console.log('Item added successfully', res);
       console.log('Form value', this.myFormBenefit.value);
        this.submitted = true;
        (this.myFormBenefit.get('myValue') as FormArray).push(this.fb.group({
          shortDescription : new FormControl('', Validators.required), 
          description : new FormControl('', Validators.required), 
        }));
        this.benefitId=res.id
      },
    
      error: (e) => {
        console.error('Error adding item', e);
        console.log('Form is invalid');
        console.log(this.myFormBenefit.errors);
      }
    });
  }

 /*********************************** confirmation benefit ******************************/

 confirmerBenefit(): void {
  this.confirmService.confirm({ message: 'Les bénéfices sont ajoutés avec succès !' })
    .subscribe((result: boolean) => {
      if (result) {
        // Afficher le message de succès
        console.log('Les bénéfices sont ajoutés avec succès !');
      }

      // Redirection vers la liste des contrats
      this.router.navigate(['/contractEmployee/liste-employee-contracts']);
    });
}

 /*********************************** supprimer benefit ******************************/
 deletebenefit(id : any) : void {
    
  this.confirmService.confirm({message: `suppression du bénéfice`})
    .subscribe(res => {
      if (res) {
        this.loader.open('supprimer bénéfice ');
        this.contractEmployeeService.deleteBenefit(this.benefitId)
        .subscribe((data:any)=> {
            this.dataSource = data;
            this.loader.close();
            this.snack.open('bénéfice supprimé!', 'OK', { duration: 4000 })
           
          })
      }
    })
}


/************************************************** Ajouter contrat  ****************************************************/
    
    addContract() : void {
      this.confirmService.confirm({ message: 'Le contrat est ajouté avec succès ! Voulez-vous ajouter des avantages à ce contrat?' })
  .subscribe((result: boolean) => {
    if (result) {
      console.log('Submitting form...');
      console.log('Form is valid, submitting...');
      let selectedArticles = this.myFormContract.get('articles').value;
      console.log(selectedArticles);
      console.log(this.myFormContract.value);
      this.contractEmployeeService.addItem(this.myFormContract.value).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          this.selectedContract = res;
          console.log('Selected contract ID:', this.selectedContract.id);
          console.log('Form value', this.myFormContract.value);
          this.submitted = true;
          // Redirection vers le step suivant
          this.stepper.next();
        },
        error: (e) => {
          console.error('Error adding item', e);
          // Afficher le message d'erreur
          this.errorMessage = 'Erreur lors de l\'ajout du contrat. Veuillez vérifier les champs.';
          // Redirection vers la liste des contrats
          this.router.navigate(['/contractEmployee/liste-employee-contracts']);
        }
      });
    } else {
      // Redirection vers la liste des contrats
      this.router.navigate(['/contractEmployee/liste-employee-contracts']);
    }
  });

    }
  /********************************************************** la fonction qui retourne le titre de l'article  ******************************************************/
  
  getArticleTitle(){
    this.articleService.getItems().subscribe((data :any )=>{
      this.Articles = data
    });
  }

  onContractTitleSelectionChange(event: any) {
    const selectedContractTitle = event.value;
    this.showEndDate = selectedContractTitle !== ContractTitle.PERMANENT_EMPLOYMENT_CONTRACT;
  }
  
/*
  onContractTitleSelectionChange(event: any) {
    const selectedContractTitle = event.value;
    if (selectedContractTitle === ContractTitle.PERMANENT_EMPLOYMENT_CONTRACT) {
      this.myFormContract.get('endDate').disable();
    } else {
      this.myFormContract.get('endDate').enable();
    }
  }*/
  
 


    

/*********************** Repeat form ************************/
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


    /*********************************** Traduction des enumérations en Français     *************************************************************************/

    FeeTypeMap = {
      [FeeType.RESTAURANT]: 'Restaurant ',
      [FeeType.TRAVEL]: 'Voyage',
      [FeeType.MILEAGE]: 'kilométrage',
      [FeeType.PHONE]: 'Téléphone',
      [FeeType.HOTEL]: 'Hôtel',
      [FeeType.OTHER]: 'Autre',
    };

    

    ContractBenifitTypeMap = {
      [ContractBenifitType.COMPUTER]: 'Ordinateur',
      [ContractBenifitType.PHONE]: 'Téléphone',
      [ContractBenifitType.OFFICE_SUPPLIES]: 'Fournitures de bureau',
      [ContractBenifitType.FOURNITURE]: 'Fourniture',
      [ContractBenifitType.OTHER]: 'Autre'
    };
    

    ContractTitleMap = {
      [ContractTitle.PERMANENT_EMPLOYMENT_CONTRACT]: 'Contrat de travail à durée indéterminée',
      [ContractTitle.FIXED_TERM_EMPLOYMENT_CONTRACT]: 'Contrat de travail à durée déterminée',
      [ContractTitle.PROFESSIONALIZATION_CONTRACT]: 'Contrat de professionnalisation',
      [ContractTitle.SEASONAL_WORK_CONTRACT]: 'Contrat de travail saisonnier',
      [ContractTitle.PART_TIME_WORK_CONTRACT]: 'Contrat de travail à temps partiel',
      [ContractTitle.STUDY_CONTRACT]: 'Contrat d\'alternance',
      [ContractTitle.TEMPORARY_WORK_CONTRACT]: 'Contrat de travail intérimaire'
    };
    
  }
