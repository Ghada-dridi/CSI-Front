import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    return ['photo', 'serialNumber','firstName', 'lastName',  'title', 'departement','actions'];
  }
  
  getItems() {    
    this.getItemSub = this.contractEmployeeService.getItems()
      .subscribe((data:any)  => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }
  
  
}
