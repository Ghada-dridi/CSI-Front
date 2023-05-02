import { crudEntretien } from './crud_entretienRecrutment.routing';


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
import { crud_entretienRecrutmentService } from './crud_entretienRecrutment.service';


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
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudEntretien: crud_entretienRecrutmentService,
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
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      })
  }

  applyFilter(event :Event){
    const FilterValue = (event.target as HTMLInputElement).value ;
     this.dataSource.filter = FilterValue.trim().toLowerCase();
 
 }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new Candidat' : 'Update Candidat';
    let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        if (isNew) {
          this.loader.open('Adding new Candidat');
          this.crudEntretien.addItem(res)
            .subscribe(data => {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Candidat Added!', 'OK', { duration: 4000 })
            })
        } else {
          this.loader.open('Updating Candidat');
          this.crudEntretien.updateItem(data._id, res)
            .subscribe(data => {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Candidat Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }
  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.name}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open('Deleting Candidat');
          this.crudEntretien.removeItem(row)
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
  
  
}

