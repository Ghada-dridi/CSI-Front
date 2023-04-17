import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudPartnerService } from '../../crudPartner.service';
import { MatTableDataSource } from '@angular/material/table';
import { Partner } from 'app/shared/models/Partner';
import { contact } from 'app/shared/models/contact';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-detail-crud',
  templateUrl: './detail-crud.component.html'
})
export class DetailCrudComponent implements OnInit {
id: number
partner :Partner
public dataSource: MatTableDataSource<contact>;
public displayedColumns: any;
contacts: contact[]

  constructor(
    private route: ActivatedRoute,
    private partnerService: CrudPartnerService,
    ) { 
      this.dataSource = new MatTableDataSource<contact>([]);
    }

  getDisplayedColumns() {
    return ['firstName','lastName','function','actions'];
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['iiid'];
    this.getPartner();
    this.getContactsByPartner();
    this.displayedColumns = this.getDisplayedColumns();
    console.log(this.id)
  }

  getPartner() {
    this.partnerService.getItem(this.id).subscribe((data: any) => {
      this.partner = data;
      this.getContactsByPartner();
    });
  }

  getContactsByPartner() {
    this.partnerService.getContactsByPartnerId(this.id).subscribe((contacts: any) => {
        this.contacts = contacts;
      },
      error => console.error(error)
    );
  }
}

