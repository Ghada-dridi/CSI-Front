import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Benefit } from 'app/shared/models/Benefit';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BenefitService } from '../benefit.service';
import { BenefitPopComponent } from '../benefit-pop/benefit-pop.component';
import { egretAnimations } from 'app/shared/animations/egret-animations';


@Component({
  selector: 'app-benefit-list',
  templateUrl: './benefit-list.component.html',
  animations: egretAnimations
})
export class BenefitListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  public dataSource: MatTableDataSource<Benefit>;
  public displayedColumns: any;
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private benefitService: BenefitService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) { 
      this.dataSource = new MatTableDataSource<Benefit>([])
    }

  ngOnInit(): void {
    this.displayedColumns = this.getDisplayedColumns();
    this.getItems()
  }

  getDisplayedColumns() {
    return [
      'titled','totalCost','costEfficiency','exceptionalCosts','actions'
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

  openPopUp(data:  any , isNew?) {
    let title = isNew ? 'Ajouter prestation' : 'Mettre à jour prestation';
    let dialogRef: MatDialogRef<any> = this.dialog.open(BenefitPopComponent, {
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
          this.loader.open('Ajout besoin en cours');
          this.benefitService.addItem(res)
            .subscribe((data :any)=> {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Besoin ajouté avec succès !', 'OK', { duration: 2000 });
              this.getItems();
            })
        } else {
          this.loader.open('Mise à jour besoin');
          this.benefitService.updateItem(data.id, res)
            .subscribe((data:any) => {
              this.dataSource = data ;
              this.loader.close();
              this.snack.open('Besoin mis à jour !', 'OK', { duration: 2000 });
              this.getItems();
            })
        }
      })
  }

  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.name}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open('Suppression besoin en cours');
          this.benefitService.deleteItem(row)
            .subscribe((data:any)=> {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Besoin supprimé !', 'OK', { duration: 2000 });
              this.getItems();
            })
        }
      })
  }

  applyFilter(event :Event){
    const FilterValue = (event.target as HTMLInputElement).value ;
     this.dataSource.filter = FilterValue.trim().toLowerCase();
  }

  getItems() {    
    this.getItemSub = this.benefitService.getItems()
      .subscribe((data:any)  => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }
}
