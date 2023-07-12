import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReqService } from '../../Requirement/req.service';
import { req } from 'app/shared/models/req';

@Component({
  selector: 'app-quotation-pop',
  templateUrl: './quotation-pop.component.html',
  styleUrls: ['./quotation-pop.component.scss']
})
export class QuotationPopComponent implements OnInit {
  isNew: boolean
  public itemForm: FormGroup
  listReq : req [] =[]
  private reqId : number

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QuotationPopComponent>,
    private fb: FormBuilder, 
    private _formBuilder: FormBuilder,
    private reqService: ReqService
  ) { }

  buildItemForm(item){
    this.itemForm = this.fb.group({
      firstName : [item.firstName || '', Validators.required],
      lastName : [item.lastName || '', Validators.required],
    })
  }

  ngOnInit(): void {
    this.buildItemForm(this.data.payload)
    console.log(this.data.isNew)
    console.log(this.data.payload)
    this.isNew = this.data.isNew 
    this.getReqList()
  }

  getReqList(){
    this.reqService.getItems().subscribe((data :any )=>{
      this.listReq = data
      this.reqId = this.data.reqId;
    })
    }

  submit() {
    console.log((this.itemForm.value))
    this.dialogRef.close(this.itemForm.value)
  }

}
