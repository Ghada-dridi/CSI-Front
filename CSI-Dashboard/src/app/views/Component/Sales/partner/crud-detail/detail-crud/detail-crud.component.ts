import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudPartnerService } from '../../crudPartner.service';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyStatus, LegalStatus, Partner, PaymentCondition, PaymentMode, Provenance } from 'app/shared/models/Partner';
import { contact } from 'app/shared/models/contact';
import { WorkField, req } from 'app/shared/models/req';
import { socialMedia } from 'app/shared/models/socialMedia';
import { address } from 'app/shared/models/address';
import { addAddressComponent } from '../../../add-address/add-address.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddAddressService } from '../../../add-address/add-address.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../../../contact/contact.service';
import { ContactPopComponent } from '../../../contact/contact-pop/contact-pop/contact-pop.component';
import { ReqpopComponent } from '../../../Requirement/req-pop/reqpop/reqpop.component';
import { ReqService } from '../../../Requirement/req.service';
import { PartnerContactPopComponent } from '../../partner-contact-pop/partner-contact-pop.component';
import { SocialMediaPopComponent } from '../../social-media-pop/social-media-pop.component';
import { OfferedPopComponent } from '../../offered-pop/offered-pop.component';
import { offeredService } from 'app/shared/models/offeredService';
import { AccountPopComponent } from '../../account-pop/account-pop.component';
import { BankAccount } from 'app/shared/models/BankAccount';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-crud',
  templateUrl: './detail-crud.component.html'
})
export class DetailCrudComponent implements OnInit {
id: number
partner :Partner
public dataSource: MatTableDataSource<contact>;
public dataSource1: MatTableDataSource<socialMedia>;
public dataSource2: MatTableDataSource<req>;
public dataSource3: MatTableDataSource<address>;
public dataSource4: MatTableDataSource<offeredService>;
public dataSource5: MatTableDataSource<BankAccount>;

public displayedColumns: any;
public displayedColumns2: any;
public displayedColumns3 : any;
public socialMedias : socialMedia[]
public addresses : address[]
public contacts: contact[]
public offered: offeredService[]
public accounts: BankAccount[]


  constructor(
    private route: ActivatedRoute,
    private partnerService: CrudPartnerService,
    private addressService : AddAddressService,
    private reqService : ReqService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    private datePipe: DatePipe
    ) { 
      this.dataSource = new MatTableDataSource<contact>([]);
      this.dataSource1 = new MatTableDataSource<socialMedia>([]);
      this.dataSource2 = new MatTableDataSource<req>([]);
      this.dataSource3 = new MatTableDataSource<address>([]);
      this.dataSource4 = new MatTableDataSource<offeredService>([]);
      this.dataSource5 = new MatTableDataSource<BankAccount>([]);
    }

  getDisplayedColumns() {
    return ['firstName','lastName','function' , 'actions'];
  }
  getDisplayedColumns3() {
    return ['ville','street' ,'actions'];
  }
  getDisplayedColumns2() {
    return ['title','description',
    'requirementType','requirementStatus','availability' , 'actions'
    ];
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['iiid'];
    this.getPartner();
    this.getSocialMedias();
    this.getContacts();
    this.getRequirements();
    this.getAddresses();
    this.getAddresses2();
    this.getOffered();
    this.getAccounts();
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
      this.addresses = data;
      
    });
  }
  getAddresses2() {
    this.partnerService.getItemAddresses(this.id).subscribe((data: any) => {
      {
        this.dataSource3 = new MatTableDataSource(data);
      }
    });
  }
  getContacts() {
    
    this.partnerService.getItemContact(this.id).subscribe((data: any) => {
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

    getOffered() {
      this.partnerService.getItemOffered(this.id).subscribe((data: any) => {
        this.offered = data;
        
      });
    }

    getAccounts() {
      this.partnerService.getItemAccounts(this.id).subscribe((data: any) => {
        this.accounts = data;
        
      });
    }
  
    
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
           deleteBesoin(id: number) {
            this.partnerService.deleteBesoin(id)
              .subscribe(
                response => {
                  console.log(response);
                  // Reload the addresses list after deletion
                  this.getRequirements();
                },
                error => {
                  console.log(error);
                }
              );
                 }
           deleteContact(id: number) {
            this.partnerService.deleteContact(id)
              .subscribe(
                response => {
                  console.log(response);
                  // Reload the addresses list after deletion
                  this.getContacts();
                },
                error => {
                  console.log(error);
                }
              );
                 }

  deleteSocialMedia(id: number) {
    this.partnerService.deleteSocialMedia(id)
      .subscribe(
        response => {
          console.log(response);
          // Reload the addresses list after deletion
          this.getSocialMedias();
        },
        error => {
          console.log(error);
        }
      );
    }

    deleteAccount(id: number) {
      this.partnerService.deleteAccount(id)
        .subscribe(
          response => {
            console.log(response);
            // Reload the addresses list after deletion
            this.getAccounts();
          },
          error => {
            console.log(error);
          }
        );
      }

      deleteOffered(id: number) {
        this.partnerService.deleteOffered(id)
          .subscribe(
            response => {
              console.log(response);
              // Reload the addresses list after deletion
              this.getOffered();
            },
            error => {
              console.log(error);
            }
          );
        }

           openPopUp(data: any = {} , isNew?) {
            let title = isNew ? 'Ajouter adresse' : 'Modifier Adresse';
            let dialogRef: MatDialogRef<any> = this.dialog.open(addAddressComponent, {
              width: '1000px',
              disableClose: true,
              data: { title: title, payload: data , partnerId: this.partner.id}
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
                      this.addresses = data;
                      this.loader.close();
                       this.snack.open(' addresse ajoutée avec succès!', 'OK', { duration: 2000 });
                       this.getAddresses()
                    })
                }else {
                  this.loader.open('modification en cours');
                  this.addressService.updateAddress(data.id,res)
                    .subscribe((data:any) => {
                      this.addresses = data ;
                      this.loader.close();
                      this.snack.open('Adresse modifiée avec succés !', 'OK', { duration: 2000 });
                      this.getAddresses();
                    })
                } 
              })

          }
          openPopUp2(data: any = {}, isNew?) {
            let title = isNew ? 'Nouveau contact' : 'Mettre à jour contact';
            let dialogRef: MatDialogRef<any> = this.dialog.open(PartnerContactPopComponent, {
              width: '720px',
              disableClose: true,
              data: { title: title, payload: data ,  partnerId : this.partner.id }
            })
            dialogRef.afterClosed()
              .subscribe(res => {
                if(!res) {
                  // If user press cancel
                  return;
                }
                if (isNew) {
                  this.loader.open('Ajout en cours');
                  console.log(data.partnerId)
                  this.partnerService.addContact(res)
                    .subscribe((data:any) => {
                      this.dataSource = data;
                      this.loader.close();
                      this.snack.open('Contact ajouté avec succès!', 'OK', { duration: 4000 })
                      this.getContacts()
                    })
                } else {
                  this.loader.open('Mise à jour');
                  console.log(data.contactId)
                  console.log(this.partner.id)
                  console.log(res.partnerNum)
                  this.partnerService.updateContact(data.contactId, res)
                    .subscribe((data :any) => {
                      this.dataSource = data;
                      this.loader.close();
                      this.snack.open('Contact mis à jour avec succès!', 'OK', { duration: 4000 })
                      this.getContacts();
                    })
                    console.log(this.partner.id)
                    console.log(res.partnerNum)
                }
              })
          }

          
          openPopUp3(data: any = {}, isNew?) {
            let title = isNew ? 'Nouveau besoin' : 'Mettre à jour besoin';
            let dialogRef: MatDialogRef<any> = this.dialog.open(ReqpopComponent, {
              width: '720px',
              disableClose: true,
              data: { title: title, payload: data ,  partnerId:this.partner.id }
            })
            dialogRef.afterClosed()
              .subscribe(res => {
                if(!res) {
                  // If user press cancel
                  return;
                }
                if (isNew) {
                  this.loader.open('Ajout en cours');
                  this.reqService.addReq(res)
                    .subscribe((data:any) => {
                      this.dataSource2 = data;
                      this.loader.close();
                      this.snack.open('Besoin ajouté avec succès!', 'OK', { duration: 4000 })
                      this.getRequirements()
                    })
                } else {
                  this.loader.open('Mise à jour');
                  this.reqService.updateReq(data.id, res)
                    .subscribe((data :any) => {
                      this.dataSource2 = data;
                      this.loader.close();
                      this.snack.open('Besoin mis à jour avec succès!', 'OK', { duration: 4000 })
                      this.getRequirements();
                    })
                }
              })
          }

          openPopUp4(data: any = {} , isNew?) {
            let title = isNew ? 'Ajouter social media' : 'Modifier social media';
            let dialogRef: MatDialogRef<any> = this.dialog.open(SocialMediaPopComponent, {
              width: '1000px',
              disableClose: true,
              data: { title: title, payload: data , partnerId: this.partner.id}
            })
            dialogRef.afterClosed()
              .subscribe(res => {
                if(!res) {
                  // If user press cancel
                  return;
                }
                if (isNew) {
                  this.loader.open('Ajout en cours');
                  this.partnerService.addPartnerSocialMedia(res)
                    .subscribe((data :any)=> {
                      this.dataSource1 = data;
                      console.log(this.dataSource1)
                      this.loader.close();
                       this.snack.open('Social media ajoutée avec succès!', 'OK', { duration: 2000 });
                       this.getSocialMedias()
                    })
                }else {
                  this.loader.open('modification en cours');
                  console.log(data.id)
                  this.partnerService.updateSocialMedia(data.id, res)
                    .subscribe((data:any) => {
                      this.dataSource1 = data ;
                      this.loader.close();
                      this.snack.open('Social media modifiée avec succés!', 'OK', { duration: 2000 });
                      this.getSocialMedias();
                    })
                } 
              })
          }

          openPopUp5(data: any = {} , isNew?) {
            let title = isNew ? 'Ajouter service offert' : 'Modifier service offert';
            let dialogRef: MatDialogRef<any> = this.dialog.open(OfferedPopComponent, {
              width: '1000px',
              disableClose: true,
              data: { title: title, payload: data , partnerId: this.partner.id}
            })
            dialogRef.afterClosed()
              .subscribe(res => {
                if(!res) {
                  // If user press cancel
                  return;
                }
                if (isNew) {
                  this.loader.open('Ajout en cours');
                  console.log(this.partner.id)
                  console.log(data.partnerId)
                  this.partnerService.addOffered(res)
                    .subscribe((data :any)=> {
                      this.dataSource4 = data;
                      this.loader.close();
                       this.snack.open('Service offert ajouté avec succès!', 'OK', { duration: 2000 });
                       this.getOffered()
                    })
                }else {
                  this.loader.open('modification en cours');
                  console.log(data.id)
                  this.partnerService.updateOffered(data.id, res)
                    .subscribe((data:any) => {
                      this.dataSource4 = data ;
                      this.loader.close();
                      this.snack.open('Service offert modifié avec succés!', 'OK', { duration: 2000 });
                      this.getOffered();
                    })
                } 
              })
          }

          openPopUp6(data: any = {} , isNew?) {
            let title = isNew ? 'Ajouter compte bancaire' : 'Modifier compte bancaire';
            let dialogRef: MatDialogRef<any> = this.dialog.open(AccountPopComponent, {
              width: '1000px',
              disableClose: true,
              data: { title: title, payload: data , partnerId: this.partner.id}
            })
            dialogRef.afterClosed()
              .subscribe(res => {
                if(!res) {
                  // If user press cancel
                  return;
                }
                if (isNew) {
                  this.loader.open('Ajout en cours');
                  console.log(this.partner.id)
                  console.log(data.partnerId)
                  this.partnerService.addAccount(res)
                    .subscribe((data :any)=> {
                      this.dataSource5 = data;
                      this.loader.close();
                       this.snack.open('Compte bancaire ajouté avec succès!', 'OK', { duration: 2000 });
                       this.getAccounts()
                    })
                }else {
                  this.loader.open('modification en cours');
                  console.log(data.id)
                  this.partnerService.updateAccount(data.id, res)
                    .subscribe((data:any) => {
                      this.dataSource5 = data ;
                      this.loader.close();
                      this.snack.open('Compte bancaire modifié avec succés!', 'OK', { duration: 2000 });
                      this.getAccounts();
                    })
                } 
              })
          }

          redirectToLink(link: string): void {
            if (!link.startsWith('http') && !link.startsWith('https')) {
              link = 'http://' + link;
            }
            window.open(link, '_blank');
          }

          companyStatusMap = {
            [CompanyStatus.PROSPECT]:'Prospect',
            [CompanyStatus.SUPPLIER]:'Fournisseur',
           [CompanyStatus.CLIENT]:'Client'
          };
        
          provenanceMap = {
            [Provenance.JOBS_FORUM]:'Salon des entreprises',
            [Provenance.RECOMMENDATION]:'Recommendation',
           [Provenance.COOPERATION]:'Coopération',
           [Provenance.OTHER] :'Autre'
          };
        
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
        
          legalStatusMap = {
            [LegalStatus.SA]:'SA',
            [LegalStatus.SARL]:'SARL'
          }

          paymentConditionMap = {
            [PaymentCondition.IMMEDIATE]:'Paiement immédiat',
            [PaymentCondition.ADVANCED]:"Paiement à l'avance",
            [PaymentCondition.ORDER]:'Paiement à la commande',
            [PaymentCondition.ON_DELIVERY] :'Paiement à la livraison',
            [PaymentCondition._30_DAYS] :'Paiement à 30 jours nets',
            [PaymentCondition._60_DAYS] :'Paiement à 60 jours nets ',
            [PaymentCondition._90_DAYS] :'Paiement à 90 jours nets',
            [PaymentCondition.IN_TERM] :'Paiement à terme',
            [PaymentCondition.ADVANCE] :'Paiement anticipé',
            [PaymentCondition.AT_REQUEST] :'Paiement à la réception'
          }
        
          paymentModeMap = {
            [PaymentMode.CASH]:'Cash',
            [PaymentMode.CREDIT]:'Crédit',
            [PaymentMode.DEBIT_CARD]:'Carte de débit',
            [PaymentMode.BANK_TRANSFER] :'Virement bancaire',
            [PaymentMode.PAYPAL] :'Paypal',
            [PaymentMode.CHECK] :'Chèque'
          }

          formatDate(date: string): string {
            return this.datePipe.transform(date, 'dd-MM-yyyy');
          }
}

