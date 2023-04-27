import { MatTabGroup } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from './../article.service';
import { ContractEmployeeService } from './../contract-employee.service';
import { contract } from 'app/shared/models/contract';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { article } from 'app/shared/models/article';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-add-contract-employee',
  templateUrl: './add-contract-employee.component.html',
  styleUrls: ['./add-contract-employee.component.scss']
})
export class AddContractEmployeeComponent implements OnInit {

  myForm : FormGroup;
  repeatForm: FormGroup;
  tabGroup: MatTabGroup; 
  showEditor = true;
  selectedArticleDescription: string = '';
  selectedArticle : any;
  selectedContract = {contractTitle :'',startDate:'', id:null};
  formArticle = new FormGroup({
    articleTitle: new FormControl(''),
    description: new FormControl('test')
  });


  myFormGroup : FormGroup;
  myFormContract : FormGroup;
  submitted = false;
  public uploader: FileUploader = new FileUploader({ url: 'https://evening-anchorage-315.herokuapp.com/api/' });
  public hasBaseDropZoneOver: boolean = false;
  console = console;
 Articles : article[] = [];
 articles: FormArray;
 myFormArticle : FormGroup;
 updatedArticles = []; 

  

  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private contractEmployeeService: ContractEmployeeService,
    private articleService: ArticleService,
    private http : HttpClient,
    ) { }

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


    /**Repeat form  */
    this.repeatForm = this._formBuilder.group({
      repeatArray: this._formBuilder.array([this.createRepeatForm()])
    });
    

     /****** FormBuilder contract *********************/
  this.myFormContract = new FormGroup({
   // resourceId:new FormControl({value:'' , disabled:true}),
    contractTitle : new FormControl('', Validators.required), 
    startDate : new FormControl('', Validators.required), 
    endDate : new FormControl ('', Validators.required),
    editorContent : new FormControl('<p>test</p>', Validators.required),
    contractIntroduction: new FormControl(`<p>Le présent contrat est conclu entre les parties signataires ci-après :<br>La Société CSI DIGITAL, SARL, au Capital de 10 000 dinars tunisiens dont le Siège Social est sis au Parc d&apos;Activité Economique de Bizerte, inscrite au Registre National des Entreprise sous le numéro 1764694X représentée par son Gérant M&apos;hamed Khamassi.<br>En sa qualité d&apos;employeur d&apos;une part <br>1. ET,<br> Mr ……….. de nationalité Tunisienne, né(e) le …………………... à ………………., demeurant   au ……………………………, titulaire de CIN n° ……………….,  émise à …………………….<br> le ……………………………… <br>En cas de son changement M. ……………….. s&apos;engage à informer son employeur par lettre recommandée avec accusé de réception, faute de quoi l&apos;adresse ci-dessus reste valable.<br>En sa qualité d&apos;employé d&apos;autre part,</p>` ,Validators.required ),
   articleNumber: new FormControl('', Validators.required), 
    articleTitle: new FormControl('', Validators.required), 
   description : new FormControl('', Validators.required), 

      
    
  })



/*
  this.myFormArticle = new FormGroup ({

    articleNumber: new FormControl('', Validators.required), 
    articleTitle: new FormControl('', Validators.required), 
   description : new FormControl('', Validators.required), 

  }) */





  
}
 

  

  onArticleTitleChange( value: any) {
   // this.showEditor = (value !== null && value !== undefined);

    if(value) {

      setTimeout(() => {
        this.myFormContract.controls["description"].setValue(this.Articles.filter((e) => e.id == value)[0].description);
      });
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
  /*
  updateArticle(): void {
    console.log('Submitting form for update...');

    if (this.myFormArticle.valid) {

      console.log('Form is valid, submitting update...');
      const articleId = this.selectedArticle.id;
      this.articleService.updateItem(articleId, this.myFormArticle.value).subscribe({
        next: (res) => {
          console.log('Article updated successfully', res);
          console.log('Selected article ID:', this.selectedContract.id);
          console.log('New article values:', this.myFormArticle.value);
          this.submitted = true;
        },
        error: (e) => console.error('Error updating article', e)
      });

    }
  }*/
  

  addContract(): void {
    console.log('Submitting form...');
    
  //  if (this.myFormContract.valid) {
      
      console.log('Form is valid, submitting...');

      let data = {...this.myFormContract.value , articles:[

      ]};
      this.contractEmployeeService.addItem(data).subscribe({
     // this.contractEmployeeService.addItem({...this.myFormContract.value , resourceId:this.selectedEmployee.id}).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
         this.selectedContract = res;
          console.log('Selected contract ID:', this.selectedContract.id);
          console.log('Form value', this.myFormContract.value);
          this.submitted = true;
        },
        error: (e) => console.error('Error adding item', e)
      });
    
    //}
  }
  getArticleTitle(){
    this.articleService.getItems().subscribe((data :any )=>{
      this.Articles = data
    });
  }

  
  
  public confirmer(){}

    

    /*Repeat form*/
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

}
