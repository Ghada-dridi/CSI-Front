import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { contact } from 'app/shared/models/contact';
import { Availability, RequirementStatus, RequirementType, WorkField, req } from 'app/shared/models/req';
import { ReqService } from '../req.service';
import { Partner } from 'app/shared/models/Partner';
import { CrudPartnerService } from '../../partner/crudPartner.service';

@Component({
  selector: 'app-req-detail',
  templateUrl: './req-detail.component.html'
})
export class ReqDetailComponent implements OnInit {
  id: number
  req: req
  partner: Partner
  constructor(
    private route: ActivatedRoute,
    private reqService: ReqService,
    private partnerService: CrudPartnerService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.getReq()
  }

  getReq(){
    this.reqService.getItem(this.id).subscribe((data: any) => {
      this.req = data;
      console.log(this.req);
      console.log(this.req.partnerId)
      this.partnerReq();
      this.getPartner()
    })
  }

  getPartner() {
    if (this.req && this.req.partnerId) {
      this.partnerService.getItem(this.req.partnerId).subscribe((data: any) => {
        this.partner = data;
        console.log(this.partner);
        console.log(this.partner.name)
      });
    }
  }

  partnerReq():boolean{
    if(this.req.company!=null)
    return true
    else return false
  }

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
    [RequirementType.MANAGEMENT]:'Management',
    [RequirementType.RECRUITMENT]:'Recrutement',
    [RequirementType.INTERN_PROJECT] :'Projet interne'
  };

  reqStatusMap = {
    [RequirementStatus.POSITIONED]:'Positionné',
    [RequirementStatus.WON]:'Gagné',
    [RequirementStatus.LOST] :'Perdu',
    [RequirementStatus.ABANDONED] :'Abandonné',
    [RequirementStatus.IN_PROGRESS] :'En cours',
  };

  availabilityMap = {
    [Availability.ASAP]: "Le plus tôt possible",
    [Availability.FROM]: "A partir de",
    [Availability.IMMEDIATELY]: "Immédiatement",
    [Availability.MONTH_MAXIMUM]: "Un mois au maximum",
    [Availability.THREE_MONTHS_MINIMUM]: "Trois mois au minimum"
  }
  
}
