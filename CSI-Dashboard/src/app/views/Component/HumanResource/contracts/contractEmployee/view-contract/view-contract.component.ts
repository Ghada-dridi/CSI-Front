//import { html2pdf } from 'html2pdf.js';


import { benefit, exceptionalFee } from './../../../../../../shared/models/avantagesContrat';
import { ActivatedRoute } from '@angular/router';
import { ContractEmployeeService } from '../contract-employee.service';
import { contract } from './../../../../../../shared/models/contract';
import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-view-contract',
  templateUrl: './view-contract.component.html',
  styleUrls: ['./view-contract.component.scss']
})
export class ViewContractComponent implements OnInit {
  id: number;
  contract : contract;

    
  public displayedColumnsE: any;
    
  public displayedColumnsB: any;
  public dataSourceB: MatTableDataSource<benefit>;
  public dataSourceE: MatTableDataSource<exceptionalFee>;
  public exceptionalFees : exceptionalFee[]
  public benefits : benefit[]


 
    constructor(private route: ActivatedRoute,
      private crudService: ContractEmployeeService,
      private dialog: MatDialog,
      private snack: MatSnackBar,
      private loader: AppLoaderService,
      @Inject(DOCUMENT) private document: Document) {

        this.dataSourceB = new MatTableDataSource<benefit>([]);
        
        this.dataSourceE = new MatTableDataSource<exceptionalFee>([]);
       }

      getDisplayedColumnsB() {
        return ['number','name' ,'description'];
      }
      getDisplayedColumnsE() {
        return ['number','name' ,'description'];
      }
  
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.getContract();
      this.getExceptionalFee();
      this.getBenefit();

      this.displayedColumnsE=this.getDisplayedColumnsE();
      this.displayedColumnsB=this.getDisplayedColumnsB();
      console.log(this.id)
      
   //   this.document.body.classList.add('print-body-content');
  
    }

    ngOnDestroy() {
//this.document.body.classList.remove('print-body-content');
    }
    getContract() {
      this.crudService.getItem(this.id).subscribe((data: any) => {
        this.contract = data;
  
      });
    }
  /************************************ get exceptionnal fee by contractId *********************************************************/
    getExceptionalFee() {
      this.crudService.getItemFee(this.id).subscribe((data: any) => {
        this.dataSourceE = data;
        
      });
    }
    /********************************* get benefit by idContract *******************************/
    getBenefit() {
      this.crudService.getItemBenefit(this.id).subscribe((data: any) => {
        this.dataSourceB = data;
        
      });
    }

    /******************************************  téléchargement du PDF   ****************************************/
    /*downloadContract() {
      const element = document.getElementById("formImprime");
      html2pdf()
        .from(element)
        .save('MonContrat.pdf');
    }
    */
  
    /********************************************  imprimer contrat     ******************************************/
 

    print(){
      const printableArea = document.getElementById('formImprime');
      var originalContents = document.body.innerHTML;
      var printContents = document.getElementById('formImprime').innerHTML;
      document.body.innerHTML = printContents ;
      window.print();
      document.body.innerHTML = originalContents;
    }


    //////print remove unwated thing ///////
    /*print() {
      const printableArea = document.getElementById('formImprime');
      var originalContents = document.body.innerHTML;
      var printContents = document.getElementById('formImprime').innerHTML;
      document.body.innerHTML = printContents;
    
      // Remove the local host link
      var links = document.getElementsByTagName('a');
      for (var i = 0; i < links.length; i++) {
        links[i].href = '';
      }
    
      // Remove the template name
      var formImprime = document.getElementById('formImprime');
      if (formImprime) {
        formImprime.style.display = 'none';
      }
    
      window.print();
      document.body.innerHTML = originalContents;
    }*/

}



  
    