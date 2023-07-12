import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'app/shared/models/Order';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { OrdersPopComponent } from '../orders-pop/orders-pop.component';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: MatTableDataSource<Order>;
  public displayedColumns: any;
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private orderService: OrdersService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) {
    this.dataSource = new MatTableDataSource<Order>([]);
  }

  ngOnInit(): void {
    this.displayedColumns = this.getDisplayedColumns();
    this.getItems()
  }

  getDisplayedColumns() {
    return [

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
    this.getItemSub = this.orderService.getOrders()
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
          this.orderService.deleteOrder(row)
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
  let dialogRef: MatDialogRef<any> = this.dialog.open(OrdersPopComponent, {
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
        this.orderService.addOrder(res)
          .subscribe((data :any)=> {
            this.dataSource = data;
            this.loader.close();
            this.snack.open('Opportunité ajoutée avec succès !', 'OK', { duration: 2000 });
            this.getItems();
          })
      } else {
        this.loader.open('Mise à jour opportunité');
        this.orderService.updateOrder(data.id, res)
          .subscribe((data:any) => {
            this.dataSource = data ;
            this.loader.close();
            this.snack.open('Opportunité mise à jour !', 'OK', { duration: 2000 });
            this.getItems();
          })
      }
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

}
