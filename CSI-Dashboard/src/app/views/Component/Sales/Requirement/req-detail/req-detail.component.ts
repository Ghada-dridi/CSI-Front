import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { contact } from 'app/shared/models/contact';
import { Availability, RequirementStatus, RequirementType, WorkField, req } from 'app/shared/models/req';
import { ReqService } from '../req.service';

@Component({
  selector: 'app-req-detail',
  templateUrl: './req-detail.component.html'
})
export class ReqDetailComponent implements OnInit {
  id: number
  req: req

  constructor(private route: ActivatedRoute,
    private reqService: ReqService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.getReq()
  }

  getReq(){
    this.reqService.getItem(this.id).subscribe((data: any) => {
      this.req = data;
      console.log(data)
    })
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
    [RequirementType.INTERN_PROJECT] :'Projet interne',
    [RequirementType.PRODUCT]: 'Produit'
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
