import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { ResourceService } from '../../resource.service';
import { MatTableDataSource } from '@angular/material/table';
import { Employee, Title } from 'app/shared/models/Employee';

import { UpdateResourceComponent } from '../../update-resource/update-resource.component';
import { AvailabilityComponent } from '../../availability/availability.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit,OnDestroy{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  public dataSource:MatTableDataSource<Employee>;
  public displayedColumns: any;
  public getItemSub: Subscription;
 

  constructor(

    private dialog: MatDialog,
    private snack: MatSnackBar,
    private resourceService: ResourceService ,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) {     this.dataSource = new MatTableDataSource<Employee>([]);}


  
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
    return ['photo', 'serialNumber','firstName', 'lastName','title','actions'];
  }
  
  getItems() {    
    this.getItemSub = this.resourceService.getItems()
      .subscribe((data:any)  => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  deleteItem(row) {
    
    this.confirmService.confirm({message: `Delete ${row.firstName} ${row.lastName}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open('supprimer ressource interne');
          this.resourceService.deleteItem(row.id)
          .subscribe((data:any)=> {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Ressource interne supprimée!', 'OK', { duration: 4000 })
              this.getItems();
            })
        }
      })
  }

  onAvailability(data: any): void {

    const dialogRef: MatDialogRef<any> = this.dialog.open(AvailabilityComponent, {
      width: '720px',
      disableClose: true,
      // ken tlawj aal availability 
      data: { id: data.id }
    });

    dialogRef.afterClosed().subscribe(res => {
    //  if (res && res.equipmentId) {  // Check if res and res.equipmentId are not null or undefined
      //  this.loader.open('Ajouter une indisponibilité à un employée');
    /*    this.resourceService.addAvailability(res).subscribe(
          (updatedData: any) => {
            this.dataSource = updatedData;
            this.loader.close();
            this.getItems();*/
            if(res == true)
            this.snack.open('Indisponibilité ajoutée!', 'OK', { duration: 4000 });
        /*  },
          (error: any) => {
            this.loader.close();
            //this.snack.open('Une erreur s\'est produite lors de l\'affectation de l\'équipement.', 'OK', { duration: 4000 });
          }
        );*/
        /*  } else {
        // If user presses cancel or res.equipmentId is null or undefined
        return;
      }*/
    });
  }
  
  /*************************** Apply filter global  **************************/
  applyFilter(event :Event){
    const FilterValue = (event.target as HTMLInputElement).value ;
     this.dataSource.filter = FilterValue.trim().toLowerCase();
 
 }
  employeeTitleMap = {
    [Title.FRONT_END_DEVELOPER]: 'Développeur Front-End',
    [Title.BACK_END_DEVELOPER]: 'Développeur Back-End',
    [Title.FULLSTACK_DEVELOPER]: 'Développeur Full-Stack',
    [Title.CRM]: 'CRM',
    [Title.HUMAN_RESOURCE_MANAGER]: 'Responsable des Ressources Humaines',
    [Title.HUMAN_RESOURCE]: 'Ressources Humaines',
    [Title.PROJECT_MANAGER]: 'Chef de Projet',
    [Title.TECH_LEAD]: 'Responsable Technique',
    [Title.UI_UX_DESIGNER]: 'Concepteur UI/UX',
    [Title.QA_ENGINEER]: 'Ingénieur QA',
    [Title.DEVOPS_ENGINEER]: 'Ingénieur DevOps',
    [Title.WEB_DEVELOPER]: 'Développeur Web',
    [Title.OFFICE_MANAGER]: 'Responsable d Agence',
    [Title.ACCOUNTANT]: 'Comptable',
    [Title.SALES_REPRESENTATIVE]: 'Représentant Commercial',
    [Title.CUSTOMER_SUPPORT_SPECIALIST]: 'Spécialiste du Support Client',
    [Title.MARKETING_COORDINATOR]: 'Coordinateur Marketing'
    
  };

  /***************************************  Modifier employé ****************************************************/
  /*
  openPopUp(data: any = {}, isNew?) {
    console.log(data);
    
    let title = isNew ? 'Ajouter un nouvel équipement' : 'Modifier équipment';
  
    const dialogRef: MatDialogRef<any> =  this.dialog.open(UpdateResourceComponent
      
      , {
      width: '720px',
    //  disableClose: true,
      data: { title: title, payload: data }
    })
    // dialogRef.afterClosed()
    //   .subscribe(res => {
    //     if(!res) {
    //       // If user press cancel
    //       return;
    //     }
       
    //       this.loader.open('Modifier ressource');
    //       this.resourceService.updateItem(data.id, res)
    //         .subscribe((data:any) => {
    //           this.dataSource = data;
    //           this.loader.close();
    //           this.getItems();
    //           this.snack.open('Ressource modifié!', 'OK', { duration: 4000 })
    //         })
      
    //   })
  }*/
}




  
