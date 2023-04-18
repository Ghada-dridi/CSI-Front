import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudPartnerService } from '../../crudPartner.service';
import { MatTableDataSource } from '@angular/material/table';
import { Partner } from 'app/shared/models/Partner';
import { contact } from 'app/shared/models/contact';
import { Subscription } from 'rxjs';
import { req } from 'app/shared/models/req';
import { socialMedia } from 'app/shared/models/socialMedia';
import { address } from 'app/shared/models/address';

@Component({
  selector: 'app-detail-crud',
  templateUrl: './detail-crud.component.html'
})
export class DetailCrudComponent implements OnInit {
id: number
partner :Partner
public dataSource: MatTableDataSource<contact>;
public dataSource2: MatTableDataSource<req>;

public displayedColumns: any;
public displayedColumns2: any;
public socialMedias : socialMedia[]
public addresses : address[]
contacts: contact[]

  constructor(
    private route: ActivatedRoute,
    private partnerService: CrudPartnerService,
    ) { 
      this.dataSource = new MatTableDataSource<contact>([]);
      this.dataSource2 = new MatTableDataSource<req>([]);
    }

  getDisplayedColumns() {
    return ['firstName','lastName','function','actions'];
  }
  getDisplayedColumns2() {
    return ['title','description',
    
    'totalCandidateNumber','requirementType','requirementStatus','availability'
    ];
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['iiid'];
    this.getPartner();
    this.getSocialMedias()
    this.getContacts();
    this.getRequirements();
    this.getAddresses();
    //this.getContactsByPartner();
    this.displayedColumns = this.getDisplayedColumns();
    this.displayedColumns2 = this.getDisplayedColumns2();
    console.log(this.id)
  }

  getPartner() {
    this.partnerService.getItem(this.id).subscribe((data: any) => {
      this.partner = data;
      //this.getContactsByPartner();
      this.getContacts();
    });
  }
  getSocialMedias() {
    this.partnerService.getItemSocialMedias(this.id).subscribe((data: any) => {
      this.socialMedias = data;
      
    });
  }
  getAddresses() {
    this.partnerService.getItemAddresses(this.id).subscribe((data: any) => {
      this.addresses = data;
      
    });
  }
  getContacts() {
    
    this.partnerService.getItemContact(this.id).subscribe((data) => {
      {
        this.dataSource = new MatTableDataSource(data);
     
       
      }
    })}
    getRequirements() {
    
      this.partnerService.getItemReq(this.id).subscribe((data) => {
        {
          this.dataSource2 = new MatTableDataSource(data);
       
         
        }
    })}
  /*getContactsByPartner() {
    this.partnerService.getContactsByPartnerId(this.id).subscribe((contacts: any) => {
        this.contacts = contacts;
      },
      error => console.error(error)
    );
  }*/
}

