import { Evaluation } from 'app/shared/models/Evaluation';
import { entretienRecrutmentService } from './../entretienRecrutment.service';
import { crudEntretien } from '../crud_entretienRecrutment.routing';


import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { NgxTablePopupComponent } from 'app/views/cruds/crud-ngx-table/ngx-table-popup/ngx-table-popup.component';
import { Subscription } from 'rxjs';
import { CrudService } from '../../candidate/CandidatCrud/candidat-crud.service';
import { ajoutEntretienPopupComponent } from '../add_evaluation/addEntretien-popup/addEntretien-popup.component';


@Component({
  selector: 'evaluation-form',
  templateUrl: './crud_entretienRecrutment.component.html'
})
export class crudEntretienRecrutmentComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: any;
  public displayedColumns: any;
  public getItemSub: Subscription;
  classAdded = false;
  evaluation :Evaluation;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudEntretien: entretienRecrutmentService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private router: Router
  ) { }
   

  goToCV() {
    this.router.navigate(['cvCandidat/cvCandidat-crud']);
  }

  ngOnInit() {
    this.displayedColumns = this.getDisplayedColumns();
    this.getItems()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }

  getDisplayedColumns() {
    return ['name', 'last name', 'offre', 'note globale', 'status', 'actions'];
  }

    
    getItems() {    
      this.getItemSub = this.crudEntretien.getItems()
        .subscribe((data:any)  => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })    
         }

  applyFilter(event :Event){
    const FilterValue = (event.target as HTMLInputElement).value ;
     this.dataSource.filter = FilterValue.trim().toLowerCase();
 
 }


  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.name}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open('Deleting Candidat');
          this.crudEntretien.deleteItem(row)
            .subscribe(data => {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Candidat deleted!', 'OK', { duration: 4000 })
            })
        }
      })
  }
  
  openEvaluationCandidat(){
    this.router.navigate(['CandidatEvaluation/evaluationCandidat'])
  }
  goToEvaluer(){
    this.router.navigate(['evaluationCrud/crudEvaluation'])
  }

  
   openPopUp(): void {
    const dialogRef = this.dialog.open(ajoutEntretienPopupComponent, {
      width: '900px',
      data: { /* any data you want to pass */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Result:', result);
    });
  }

  /*onShowEvaluation() {
    if (this.classAdded) {
      // Class has already been added, so just open the view
      this.openView();
    } else {
      // Class hasn't been added, so create a new class, add it, and open the view
      const newClass = new MyClass();
      this.myClassService.addClass(newClass).subscribe(() => {
        this.classAdded = true;
        this.openView();
      });
    }
  }*/
  
  openView(row: any) {
    this.router.navigate(['/CandidatEvaluation', row.id]);
  }




  saveEvaluation1(): void {
    this.crudEntretien.addEvaluation(this.evaluation).subscribe(
      response => console.log('Evaluation added successfully'),
      error => console.error('Error adding evaluation:', error)
    );
  }

  saveEvaluation(row: any): void {
    // Set the ID of the evaluation to the selected row ID
    this.evaluation.id = row.id;
    
    // Call the addEvaluation() method with the evaluation object as a parameter
    this.crudEntretien.addEvaluation(this.evaluation).subscribe(
      response => console.log('Evaluation added successfully'),
      error => console.error('Error adding evaluation:', error)
    );
  }

}

