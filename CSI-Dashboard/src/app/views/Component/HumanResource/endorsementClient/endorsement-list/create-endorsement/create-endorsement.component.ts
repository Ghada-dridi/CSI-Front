import { contract } from 'app/shared/models/contract';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EndorsementService } from '../../endorsement.service';
import { ContractEmployeeService } from '../../../contracts/contractEmployee/contract-employee.service';

@Component({
  selector: 'app-create-endorsement',
  templateUrl: './create-endorsement.component.html',
  styleUrls: ['./create-endorsement.component.scss']
})
export class CreateEndorsementComponent implements OnInit {

  contracts: contract[] = [];
  
  
  public itemForm: UntypedFormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateEndorsementComponent>,
    private fb: UntypedFormBuilder,
    private contractService : ContractEmployeeService
  ) { }


  
  ngOnInit() {
    
    this.buildItemForm(this.data.payload);
    this.loadContracts();
  }


  buildItemForm(item) {
    this.itemForm = this.fb.group({
      contractNum: [item.contractNum || ''],
      title: [item.title || '', Validators.required],
      endorsementDate: [item.endorsementDate ||'',Validators.required],
      object: [item.object || '',Validators.required],
      reference: [item.reference || '',Validators.required],
      note: [item.note || '',Validators.required]
    })
  }

 
loadContracts(){
  this.contractService.getItems().subscribe((data: contract[]) => {
    this.contracts = data;
    console.log("Contracts data", data);
  });
}

  
  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}
