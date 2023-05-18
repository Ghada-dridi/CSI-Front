import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-ngx-table-popup',
  templateUrl: './equipment-table-popup.component.html'
})
export class EquipmentTablePopupComponent implements OnInit {
  public itemForm: UntypedFormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EquipmentTablePopupComponent>,
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
    
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      serialNumber: [item.serialNumber || '', Validators.required],
      type: [item.type || '',Validators.required],
      deliveryDate: [item.deliveryDate || '',Validators.required],
      returnDate: [item.returnDate || '',Validators.required],
      comment: [item.comment || '',Validators.required],
      resource: [item.resource || ''],
    
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
