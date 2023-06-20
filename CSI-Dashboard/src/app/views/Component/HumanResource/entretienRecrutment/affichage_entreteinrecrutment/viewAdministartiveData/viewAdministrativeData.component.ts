import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministrativeData } from 'app/shared/models/AdministrativeData';
import { entretienRecrutmentService } from '../../entretienRecrutment.service';

@Component({
  selector: 'app-view-administrative-data',
  templateUrl: './viewAdministrativeData.component.html',
  styleUrls :['./viewAdministrativeData.component.scss'] 

})
export class ViewAdministrativeDataComponent {
  administrativeData: AdministrativeData;
  id: number;

  constructor(
    private service:entretienRecrutmentService,
    public dialogRef: MatDialogRef<ViewAdministrativeDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.administrativeData = data.payload;
  }
  ngOnInit(): void {
    if (this.data) {
        this.id = this.data.employeeId;
        console.log(this.id) // Update this line
        this.getInterviewDetails(); // Call the method to retrieve the interview details
      } }
      getInterviewDetails() {
        console.log(this.id); // Make sure the id is not undefined
        this.service.getAdministrativeDataById(this.id).subscribe((data: any) => {
          this.administrativeData = data;
          console.log(this.id); // Check the retrieved data
        });
      }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
