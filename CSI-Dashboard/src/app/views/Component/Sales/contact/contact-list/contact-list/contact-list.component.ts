import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { ContactService } from '../../contact.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service'; 
import { contact } from 'app/shared/models/Contact';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  animations: egretAnimations
})
export class ContactListComponent implements OnInit,OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

 
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: any;
  public getItemSub: Subscription;

  
  constructor( private snack: MatSnackBar,private dialog: MatDialog,
   private loader: AppLoaderService,private ContactService :ContactService,private confirmService: AppConfirmService ) {
    this.dataSource = new MatTableDataSource<contact>([]);
    }
   
   
   getDisplayedColumns() {
    return ['firstName','lastName','function','emailOne','emailTwo','phoneNumberOne','phoneNumberTwo','actions'];
  }


  ngOnInit(): void {
  
    this.displayedColumns = this.getDisplayedColumns();
    this.getItems()
  }

  getItems() {    
    this.getItemSub =this.ContactService.getItems().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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

  applyFilter(event :Event){
    const FilterValue = (event.target as HTMLInputElement).value ;
     this.dataSource.filter = FilterValue.trim().toLowerCase();
 
 }
 deleteItem(row) {
  this.confirmService.confirm({message: `Delete ${row.name}?`})
    .subscribe(res => {
      if (res) {
        this.loader.open('Deleting Partner');
        this.ContactService.deleteItem(row)
          .subscribe((data:any)=> {
            this.dataSource = data;
            this.loader.close();
            this.snack.open('Partner deleted!', 'OK', { duration: 2000 });
            this.getItems();
          })
      }
    })
}


}


