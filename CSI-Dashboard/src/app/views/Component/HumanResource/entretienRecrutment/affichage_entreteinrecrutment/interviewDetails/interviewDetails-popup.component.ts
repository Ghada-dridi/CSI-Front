import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { entretienRecrutmentService } from '../../entretienRecrutment.service';
import { Interview } from 'app/shared/models/Interview';

@Component({
  selector: 'app-interview-details-dialog',
  templateUrl: './interviewDetails-popup.component.html',
})
export class InterviewDetailsDialogComponent implements OnInit {
    interview:Interview;
    id:number;
  constructor(
    private service:entretienRecrutmentService,
    public dialogRef: MatDialogRef<InterviewDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    if (this.data) {
        this.id = this.data.interviewId;
        console.log(this.id) // Update this line
        this.getInterviewDetails(); // Call the method to retrieve the interview details
      } }
      getInterviewDetails() {
        console.log(this.id); // Make sure the id is not undefined
        this.service.getInterview(this.id).subscribe((data: any) => {
          this.interview = data;
          console.log(this.interview); // Check the retrieved data
        });
      }
      


  onCloseClick(): void {
    this.dialogRef.close();
  }
}
