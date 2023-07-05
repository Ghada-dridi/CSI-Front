import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { contact } from 'app/shared/models/contact';
import { Availability, RequirementStatus, RequirementType, WorkField, req } from 'app/shared/models/req';
import { ReqService } from '../req.service';
import { CompanyStatus, Partner } from 'app/shared/models/Partner';
import { CrudPartnerService } from '../../partner/crudPartner.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_DATE_FORMATS } from '../../partner/partner-stepper/partner-stepper.component';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { DateUtilsService } from '../date.utils.service';
import { ProfilePopComponent } from '../profile-pop/profile-pop.component';
import { MatTableDataSource } from '@angular/material/table';
import { RequestedProfile } from 'app/shared/models/RequestedProfile';

@Component({
  selector: 'app-req-detail',
  templateUrl: './req-detail.component.html'
})
export class ReqDetailComponent implements OnInit {
  id: number
  req: req
  partner: Partner
  dataSource = new MatTableDataSource<RequestedProfile>([])
  public profiles: RequestedProfile[]

  public displayedColumns: any;

  getDisplayedColumns() {
    return ['candidateNumber','function','experienceYears' , 'period' , 'actions'];
  }

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private reqService: ReqService,
    private partnerService: CrudPartnerService,
    private loader: AppLoaderService
    //private datePipe : DatePipe
    ) {
      this.dataSource = new MatTableDataSource<RequestedProfile>([])
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.getReq()
    this.displayedColumns = this.getDisplayedColumns();
    this.getProfiles()
    
  }

  getReq(){
    this.reqService.getItem(this.id).subscribe((data: any) => {
      this.req = data
      //this.partnerReq();
      this.getPartner()
    })
  }

  getPartner() {
    if (this.req && this.req.partnerId) {
      this.partnerService.getItem(this.req.partnerId).subscribe((data: any) => {
        this.partner = data;
        console.log(this.partner);
        console.log(this.partner.name)
        this.partnershipType()
      });
    }
  }

  getProfiles() {
    this.reqService.getItemProfiles(this.id).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data)
      console.log(data)
    });
  }

  partnershipType() {
    const refs = this.partner.refs

    if(this.partner.companyStatus == CompanyStatus.SUPPLIER){
      for(let i=0 ; i<this.partner.refs.length ; i++){
        if (refs[i].startsWith('PR')){
          this.partner.companyStatus = CompanyStatus.PROSPECT
          break
        }
        else if(refs[i].startsWith('CL')){
          this.partner.companyStatus = CompanyStatus.CLIENT
          break
        }
      }
    }
  }

  openPopUp2(data: any = {}, isNew?) {
    let title = isNew ? 'Ajouter profil demandé' : 'Mettre à jour profil demandé';
    let dialogRef: MatDialogRef<any> = this.dialog.open(ProfilePopComponent, {
      height: '620px',
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data, requirementId: this.req.id } 
    });
  
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        if (isNew) {
          this.loader.open('Ajout profil demandé en cours');
          console.log(res)
          this.reqService.addProfile(res)
            .subscribe((data :any)=> {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Profil demandé ajoutée avec succès !', 'OK', { duration: 2000 });
              this.getProfiles();
            })
        } else {
          console.log(res)
          this.loader.open('Mise à jour profil demandé')
          this.reqService.updateProfile(data.id, res)
            .subscribe((data:any) => {
              this.dataSource = data ;
              this.loader.close();
              this.snack.open('Profil demandé mise à jour !', 'OK', { duration: 2000 });
              this.getProfiles();
            })
        }
      })
  }

  deleteProfile(id: number) {
    this.reqService.deleteProfile(id)
      .subscribe(
        response => {
          console.log(response);
          // Reload the profiles list after deletion
          this.getProfiles();
        },
        error => {
          console.log(error);
        }
      );
         }

  /*partnerReq():boolean{
    if(this.req.company!=null)
    return true
    else return false
  }*/

  /*formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }*/

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

  reqTypeMap = {
    [RequirementType.FOR_SETTLEMENT]:'En régie',
    [RequirementType.IN_PACKAGE]:'En forfait'
  }

  reqStatusMap = {
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

  companyStatusMap = {
    [CompanyStatus.PROSPECT]:'Prospect',
    [CompanyStatus.SUPPLIER]:'Fournisseur',
    [CompanyStatus.CLIENT]:'Client',
    [CompanyStatus.CLIENT_SUPPLIER]:'Client / Fournisseur'
  }
  
}
