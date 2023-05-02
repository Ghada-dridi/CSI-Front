import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'app/shared/models/Employee';
import { candidatAffichageService } from './candidatAffichage.service';


@Component({
  selector: 'affich-form',
  templateUrl: './candidatAffichage.component.html',
  styleUrls:  ['./candidatAffichage.component.scss']
})



export class candidatAffichageComponent  {
  
  id: number
  employee :Employee

    constructor(  private affichageService: candidatAffichageService ,
      private route: ActivatedRoute) { }
  
    ngOnInit(): void {
     this.id = this.route.snapshot.params['id'];
      this.getEmployee();

      /*this.route.paramMap.subscribe(params => {
        this.id = params.get['id'];
      });*/
    
    }

    getEmployee() {
      this.affichageService.getItem(this.id).subscribe((data: any) => {
        this.employee = data;
  
      });
    }

 
}

