
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service'; 
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service'; 
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReqService } from '../../req.service';
import { Availability, PaymentType, RequirementStatus, RequirementType, WorkField, req } from 'app/shared/models/req';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { ReqpopComponent } from '../../req-pop/reqpop/reqpop.component';
import { ProfilePopComponent } from '../../profile-pop/profile-pop.component';

@Component({
  selector: 'app-reqlist',
  templateUrl: './reqlist.component.html',
  animations: egretAnimations
})
export class ReqlistComponent implements OnInit , OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  public dataSource: MatTableDataSource<req>;
  public displayedColumns: any;
  public getItemSub: Subscription;
 


  constructor(
    
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private ReqService: ReqService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) {     this.dataSource = new MatTableDataSource<req>([]);}

  ngOnInit() {
    this.displayedColumns = this.getDisplayedColumns();
    this.getItems()
 

      
  }

  getDisplayedColumns() {
    return [
      'title','requirementType','requirementStatus','paymentType','actions',
    ];
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

  getItems() {    
    this.getItemSub = this.ReqService.getItems()
      .subscribe((data:any)  => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource)
      })

  }


  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.name}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open('Suppression opportunité en cours');
          this.ReqService.deleteItem(row)
            .subscribe((data:any)=> {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Opportunité supprimée !', 'OK', { duration: 2000 });
              this.getItems();
            })
        }
      })
  }

  applyFilter(event :Event){
    const FilterValue = (event.target as HTMLInputElement).value ;
     this.dataSource.filter = FilterValue.trim().toLowerCase();
 }

 openPopUp(data:  any , isNew?) {
  let title = isNew ? 'Ajouter opportunité' : 'Mettre à jour opportunité';
  let dialogRef: MatDialogRef<any> = this.dialog.open(ReqpopComponent, {
    height: '620px',
    width: '720px',
    disableClose: true,
    data: { title: title, payload: data , isNew: isNew}
  })
  dialogRef.afterClosed()
    .subscribe(res => {
      if(!res) {
        // If user press cancel
        return;
      }
      if (isNew) {
        this.loader.open('Ajout opportunité en cours');
        this.ReqService.addReq(res)
          .subscribe((data :any)=> {
            this.dataSource = data;
            this.loader.close();
            this.snack.open('Opportunité ajoutée avec succès !', 'OK', { duration: 2000 });
            this.getItems();
          })
      } else {
        this.loader.open('Mise à jour opportunité');
        this.ReqService.updateReq(data.id, res)
          .subscribe((data:any) => {
            this.dataSource = data ;
            this.loader.close();
            this.snack.open('Opportunité mise à jour !', 'OK', { duration: 2000 });
            this.getItems();
          })
      }
    })
}

openPopUp2(requirementId: number) {
  let title = 'Ajouter profil demandé'
  let dialogRef: MatDialogRef<any> = this.dialog.open(ProfilePopComponent, {
    height: '620px',
    width: '720px',
    disableClose: true,
    data: { title: title, payload: {} , requirementNum: requirementId}
  })
  dialogRef.afterClosed()
    .subscribe(res => {
      if(!res) {
        // If user press cancel
        return;
      }
        this.loader.open('Ajout profil demandé en cours');
        console.log(res)
        this.ReqService.addProfile(res)
          .subscribe((data :any)=> {
            this.dataSource = data;
            this.loader.close();
            this.snack.open('Profil demandé ajoutée avec succès !', 'OK', { duration: 2000 });
            this.getItems();
          })
      })
    }
    
  ////////////filtrer  par colonne //////////////
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

  workFieldMap = {
    [WorkField.IT]:'IT',
    [WorkField.INDUSTRY]:'Industrie',
   [WorkField.SALES]:'Ventes',
   [WorkField.AGRICULTURE] :'Agriculture',
   [WorkField.BANKING] :'Banking',
   [WorkField.E_COM] :'E-Commerce',
   [WorkField.ASSURANCE] :'Assurance',
   [WorkField.FINANCE] :'Finance'
  };

  paymentTypeMap = {
    [PaymentType.FOR_SETTLEMENT]:'En régie',
    [PaymentType.IN_PACKAGE]:'En forfait'
  }

  reqTypeMap = {
    [RequirementType.RESOURCE]:'Ressource',
    [RequirementType.PROJECT]:'Projet'
  }

  reqStatusMap = {
    [RequirementStatus.OPEN]:'Ouverte',
    [RequirementStatus.POSITIONED]:'Positionné',
    [RequirementStatus.WON]:'Gagné',
    [RequirementStatus.LOST] :'Perdu',
    [RequirementStatus.ABANDONED] :'Abandonné',
    [RequirementStatus.IN_PROGRESS] :'En cours',
  };

  availabilityMap = {
    [Availability.ASAP]: "ASAP",
    [Availability.FROM]: "A partir de",
    [Availability.IMMEDIATELY]: "Immédiatement"
  }
}