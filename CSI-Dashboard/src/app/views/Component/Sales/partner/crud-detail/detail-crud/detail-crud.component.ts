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
import { addAddressComponent } from '../../../add-address/add-address.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddAddressService } from '../../../add-address/add-address.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail-crud',
  templateUrl: './detail-crud.component.html'
})
export class DetailCrudComponent implements OnInit {
id: number
partner :Partner
public dataSource: MatTableDataSource<contact>;
public dataSource2: MatTableDataSource<req>;
public dataSource3: MatTableDataSource<address>;

public displayedColumns: any;
public displayedColumns2: any;
public displayedColumns3 : any;
public socialMedias : socialMedia[]
public addresses : address[]
contacts: contact[]

  constructor(
    private route: ActivatedRoute,
    private partnerService: CrudPartnerService,
    private addressService : AddAddressService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private loader: AppLoaderService
    ) { 
      this.dataSource = new MatTableDataSource<contact>([]);
      this.dataSource2 = new MatTableDataSource<req>([]);
      this.dataSource3 = new MatTableDataSource<address>([]);
    }

  getDisplayedColumns() {
    return ['firstName','lastName','function'];
  }
  getDisplayedColumns3() {
    return ['ville','street' ,'actions'];
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
    this.getAddresses2();
    //this.getContactsByPartner();
    this.displayedColumns = this.getDisplayedColumns();
    this.displayedColumns2 = this.getDisplayedColumns2();
    this.displayedColumns3 = this.getDisplayedColumns3();
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
      this.dataSource3 = data;
      
    });
  }
  getAddresses2() {
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
  
    
    deleteAddress(id: number) {
      this.partnerService.deleteAddress(id)
        .subscribe(
          response => {
            console.log(response);
            // Reload the addresses list after deletion
            this.getAddresses();
          },
          error => {
            console.log(error);
          }
        );
           }
           openPopUp(data:  any , isNew?) {
            let title = isNew ? 'Ajouter addresse' : 'Modifier Address';
            let dialogRef: MatDialogRef<any> = this.dialog.open(addAddressComponent, {
              width: '1000px',
              disableClose: true,
              data: { title: title, payload: data , partnerId: this.partner.id,}
            })
            dialogRef.afterClosed()
              .subscribe(res => {
                if(!res) {
                  // If user press cancel
                  return;
                }
                if (isNew) {
                  this.loader.open('Ajout en cours');
                  this.addressService.addAddress(res)
                    .subscribe((data :any)=> {
                      this.dataSource = data;
                      this.loader.close();
                      this.snack.open('Partenaire addresse avec succès!', 'OK', { duration: 2000 });
                      this.getAddresses()
                    })
                }else {
                  this.loader.open('modification en cours');
                  this.addressService.updateAddress(data.id,res)
                    .subscribe((data:any) => {
                      this.dataSource = data ;
                      this.loader.close();
                      this.snack.open('Partenaire modifié avec succées !', 'OK', { duration: 2000 });
                      this.getAddresses();
                    })
                } 
              })

          }
}

