import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute } from '@angular/router';

import { Partner } from 'app/shared/models/Partner';
import { req } from 'app/shared/models/req';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CrudPartnerService } from '../../crudPartner.service';
import { contact } from 'app/shared/models/contact';
@Component({
  selector: 'app-contacts-details',
  templateUrl: './contacts-details.component.html',
  
})
export class ContactsDetailsComponent implements OnInit {
    displayedColumns: any;
  
   // Declare requirements as an empty array
    public dataSource: MatTableDataSource<contact>;
 id: number
 partner :Partner

  constructor( private route: ActivatedRoute,
    private crudService: CrudPartnerService,private dialog: MatDialog,
    private snack: MatSnackBar,
  
    private confirmService: AppConfirmService,
    private loader: AppLoaderService) {   this.dataSource = new MatTableDataSource<contact>([]);}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['iiiid'];
    this.getRequirements();
    this.displayedColumns = this.getDisplayedColumns();
    
}
getDisplayedColumns() {
  return ['firstName','lastName','function','actions'];
  }
  getRequirements() {
    
    this.crudService.getItemContact(this.id).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
 
    });
  }}
