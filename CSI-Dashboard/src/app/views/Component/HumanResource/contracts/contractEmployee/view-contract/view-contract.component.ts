import { ActivatedRoute } from '@angular/router';
import { ContractEmployeeService } from '../contract-employee.service';
import { contract } from './../../../../../../shared/models/contract';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-contract',
  templateUrl: './view-contract.component.html',
  styleUrls: ['./view-contract.component.scss']
})
export class ViewContractComponent implements OnInit {
  id: number
  contract : contract 
    constructor(private route: ActivatedRoute,
      private crudService: ContractEmployeeService) { }
  
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.getPartner();
  
      console.log(this.id)
    
  
    }
    getPartner() {
      this.crudService.getItem(this.id).subscribe((data: any) => {
        this.contract = data;
  
      });
    }
  

  

}
