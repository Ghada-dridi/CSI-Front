import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-orders-pop',
  templateUrl: './orders-pop.component.html',
  styleUrls: ['./orders-pop.component.scss']
})
export class OrdersPopComponent implements OnInit {
  isNew: boolean
  public itemForm: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OrdersPopComponent>,
    private fb: FormBuilder, 
    private _formBuilder: FormBuilder
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
  }

  submit() {
    console.log((this.itemForm.value))
    this.dialogRef.close(this.itemForm.value)
  }

}
