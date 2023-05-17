import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ContractEmployeeService } from '../contract-employee.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatTableDataSource } from '@angular/material/table';
import { contract } from 'app/shared/models/contract';


@Component({
  selector: 'app-liste-contract',
  templateUrl: './liste-contract.component.html',
  styleUrls: ['./liste-contract.component.scss']
})
export class ListeContractComponent implements OnInit {

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  public dataSource:MatTableDataSource<contract>;
  public displayedColumns: any;
  public getItemSub: Subscription;

  
  constructor(
    
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private contractEmployeeService: ContractEmployeeService ,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) {   this.dataSource = new MatTableDataSource<contract>([]);}

  ngOnInit() {
    this.displayedColumns = this.getDisplayedColumns();
    this.getItems();
   
    
   
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
    return ['contractTitle', 'contractPlace','contractDate', 'contractStatus','actions'];
  }
  
  getItems() {    
    this.getItemSub = this.contractEmployeeService.getItems()
      .subscribe((data:any)  => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }


  getStatusColor(contractStatus: string): { color: string, displayText: string } {
    const STATUS_DATA = {
      ACCEPTED: { color: 'green', displayText: 'Accepté' },
      STILL_PENDING: { color:'primary', displayText: 'Envoyé' },
      REFUSED: { color: 'red', displayText: 'Refusé' }
    };
    
    return STATUS_DATA[contractStatus];


  }

  /*
  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Ajouter une absence' : 'Modifier absence';
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupCreateTimeOffComponent, {
      width: '1000px',
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
          this.loader.open('Ajouter Absence');
          this.contractEmployeeService.addItem(res)
            .subscribe(data => {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Absence Ajoutée!', 'OK', { duration: 4000 })
            })
        } else {
          this.loader.open('Modifier Absence');
          this.contractEmployeeService.updateItem(data._id, res)
            .subscribe(data => {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Absence Modifiée!', 'OK', { duration: 4000 })
            })
        }
      })
  }*/
  deleteItem(row) {
    
    this.confirmService.confirm({message: `Voulez vous supprimer ce contrat?`})
      .subscribe(res => {
        if (res) {
          this.loader.open('supprimer contrat');
          this.contractEmployeeService.deleteItem(row.id)
          .subscribe((data:any)=> {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Contrat  supprimé!', 'OK', { duration: 4000 })
              this.getItems();
            })
        }
      })
  }

  
}
