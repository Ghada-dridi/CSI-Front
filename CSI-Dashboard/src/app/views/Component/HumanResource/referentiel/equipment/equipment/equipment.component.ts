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
import { StatusDisponibility } from 'app/shared/models/equipment';
import { Router } from '@angular/router';
import { Employee } from 'app/shared/models/Employee';


@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit , OnDestroy{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    StatusDisponibility :any= Object.values(StatusDisponibility);
    
    public dataSource: any;
 

    employees: Employee[] = [];
    public displayedColumns: any;
    public getItemSub: Subscription;
    constructor(
      private router: Router,
      private dialog: MatDialog,
      private snack: MatSnackBar,
      private equipmentService : EquipmentService,
      private confirmService: AppConfirmService,
      private loader: AppLoaderService
    ) { }
  
    ngOnInit() {

      
      this.displayedColumns = this.getDisplayedColumns();
      this.getItems();
      this.loadEmployes(); // Chargement des employés
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
      return ['reference','serialNumber', 'type','acquisitionDate','purchasePrise','status','affectable','actions'];
    }
  
    getItems() {    
       this.equipmentService.getEquipments()
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
    }
  
    openPopUp(data: any = {}, isNew?) {
      let title = isNew ? 'Ajouter un nouvel équipement' : 'Modifier équipment';
    
      let dialogRef: MatDialogRef<any> = this.dialog.open(EquipmentTablePopupComponent, {
        width: '720px',
        height:'650px',
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
   

   /******************************************** la fonction du changement de couleur du status*************************************/
   getStatusColor(status: string): { color: string, displayText: string } {

    const STATUS_DATA = {
      AVAILABLE: { color: 'primary', displayText: 'Disponible' },
      UNAVAILABLE : { color:'green', displayText: 'Indisponible' },
  
    };
      // Check if the status exists in the STATUS_DATA object
     if (status && STATUS_DATA.hasOwnProperty(status)) {
     return STATUS_DATA[status];
}

      // Default to 'AVAILABLE' if the status is not found
      return STATUS_DATA['AVAILABLE'];

  }
   
  


  
  /***************************************************   Apply filter   *******************************************************/
  applyFilterr(event: Event, key: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.filterPredicate = (data, filter) => {
      return data[key].trim().toLowerCase().indexOf(filter) !== -1;
    };
  }

  /*************************************************  Api pour récupérer la liset des employées ************************************************/
loadEmployes() {
  this.equipmentService.getResources().subscribe((data: Employee[]) => {
    this.employees = data;
    console.log("Employees data", data);
  });
}


getEmployeeName(employeeId: number): string {
  const employee = this.employees.find(emp => emp.id === employeeId);
  if (employee) {
    return `${employee.firstName} ${employee.lastName}`;
  }
  return '';
}


setEquipment(id_equipement:any , id_employé:any){
  console.log("yy : "+ id_equipement + "=> ttt : " + id_employé);
  
}

getStatusClass(status: string): string {
  if (status === 'AVAILABLE') {
    return 'available';
  } else if (status === 'UNAVAILABLE') {
    return 'unavailable';
  }
  return '';
}

getStatusTranslation(status: string): string {
  if (status === 'AVAILABLE') {
    return 'Disponible';
  } else if (status === 'UNAVAILABLE') {
    return 'Indisponible';
  }
  return '';
}

}
