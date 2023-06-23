import { contract } from 'app/shared/models/contract';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from 'app/views/Component/HumanResource/contracts/contractEmployee/article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  contracts: contract[] = [];
  
  
  public itemForm: UntypedFormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateArticleComponent>,
    private fb: UntypedFormBuilder,
    private articleService : ArticleService
  ) { }


  
  ngOnInit() {
    
    this.buildItemForm(this.data.payload);
    this.loadContracts();
  }


  buildItemForm(item) {
    this.itemForm = this.fb.group({
      articleTitle: [item.articleTitle || '', Validators.required],
      description: [item.description ||'',Validators.required]
    })
  }

 
loadContracts(){
  this.articleService.getItems().subscribe((data: contract[]) => {
    this.contracts = data;
    console.log("Contracts data", data);
  });
}

  
  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}
