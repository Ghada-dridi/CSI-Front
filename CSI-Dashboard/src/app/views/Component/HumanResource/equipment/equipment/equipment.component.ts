import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { EquipmentService } from '../equipment.service';
import { EquipmentTablePopupComponent } from './equipment-table-popup/equipment-table-popup.component';
import { MatTableDataSource } from '@angular/material/table';
import { ViewEquipmentComponent } from './view-equipment/view-equipment.component';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit , OnDestroy{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    public dataSource: any;
    public displayedColumns: any;
    public getItemSub: Subscription;
    constructor(
      private dialog: MatDialog,
      private snack: MatSnackBar,
      private equipmentService : EquipmentService,
      private confirmService: AppConfirmService,
      private loader: AppLoaderService
    ) { }
  
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
      return ['serialNumber', 'type', 'deliveryDate', 'returnDate', 'resource', 'actions'];
    }
  
    getItems() {    
       this.equipmentService.getEquipments()
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
        })
    }
  
    openPopUp(data: any = {}, isNew?) {
      let title = isNew ? 'Ajouter un nouvel équipement' : 'Modifier équipment';
    
      let dialogRef: MatDialogRef<any> = this.dialog.open(EquipmentTablePopupComponent, {
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
            this.loader.open('Ajout nouvel équipement');
            this.equipmentService.addEquipment(res)
              .subscribe(data => {
                this.dataSource= data;
              
                this.loader.close();
                this.getItems();
                this.snack.open('Equipement ajouté!', 'OK', { duration: 4000 })
              })
          } else {
            this.loader.open('Modifier équipement');
            this.equipmentService.updateEquipment(data.id, res)
              .subscribe((data:any) => {
                this.dataSource = data;
                this.loader.close();
                this.getItems();
                this.snack.open('Equipement modifié!', 'OK', { duration: 4000 })
              })
          }
        })
    }
    deleteItem(row) {
      this.confirmService.confirm({message: `Etes-vous sûr(e) de vouloir supprimer cet équipement ?`})
        .subscribe(res => {
          if (res) {
            this.loader.open('Supprimer équipement');
            this.equipmentService.deleteEquipment(row)
              .subscribe(data => {
                this.dataSource = data;
                this.loader.close();
                this.getItems();
                this.snack.open('Equipement Supprimé!', 'OK', { duration: 4000 })
              
              })
          }
        })
    }
    openPopUpView(row: any): void {
      const dialogRef = this.dialog.open(ViewEquipmentComponent, {
        width: '700px',
        data:  { equipment : row},
      });
    
      dialogRef.afterOpened().subscribe(() => {
        console.log('Dialog opened successfully.');
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed with result:', result);
        // Code executed after the dialog is closed
      }, error => {
        console.error('An error occurred while opening the dialog:', error);
        // Handle the error appropriately (e.g., display an error message)
      });
    }
    
}

