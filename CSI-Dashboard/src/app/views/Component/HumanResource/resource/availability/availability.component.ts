import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ResourceService } from '../resource.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { differenceInDays } from 'date-fns';


@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {

 
  public itemForm: UntypedFormGroup;
  showMotif = false;
 
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AvailabilityComponent>,
    private fb: UntypedFormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private resourceService : ResourceService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {

    this.itemForm = this.fb.group({
      employeeNum:[this.data.id || '', Validators.required],
      startDate: [ '', Validators.required],
      endDate:[ '', Validators.required],
      period:[ '', Validators.required],
      comment:['', Validators.required]
 })


 
 if (this.itemForm.controls['startDate'].value && this.itemForm.controls['endDate'].value) {
  this.calculatePeriod();
}
  }
/************************************ End ngOnInit ************************************/

  calculatePeriod() {
    const startDate = this.itemForm.controls['startDate'].value;
    const endDate = this.itemForm.controls['endDate'].value;
  
    if (startDate && endDate) {
      const days = differenceInDays(new Date(endDate), new Date(startDate));
      this.itemForm.controls['period'].setValue(days);
    }
  }
  
  
  
  
  submit() {

    console.log(this.itemForm.value);
    
    this.resourceService.addAvailability(this.itemForm.value).subscribe(
      (updatedData: any) => {

        this.dialogRef.close(true);
        this.snack.open('Indisponibilité ajoutée!', 'OK', { duration: 4000 });
      },
      (error: any) => {
        this.loader.close();
        //this.snack.open('Une erreur s\'est produite lors de l\'affectation de l\'équipement.', 'OK', { duration: 4000 });
      }
    );
    
  }
  

}
 