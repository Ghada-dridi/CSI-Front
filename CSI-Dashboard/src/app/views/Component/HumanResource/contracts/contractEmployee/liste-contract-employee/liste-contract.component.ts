import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ContractEmployeeService } from '../contract-employee.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatTableDataSource } from '@angular/material/table';
import { ContractTitle, contract } from 'app/shared/models/contract';
import { ContractStatus } from 'app/shared/models/contract';
import { Observable } from 'rxjs-compat';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-liste-contract',
  templateUrl: './liste-contract.component.html',
  styleUrls: ['./liste-contract.component.scss']
})
export class ListeContractComponent implements OnInit {

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  acceptedCount: number;
  refusedCount: number;
  pendingCount: number;
  sentCount: number;
  expiredCount: number;
  public dataSource:MatTableDataSource<contract>;
  public displayedColumns: any;
  public getItemSub: Subscription;

  
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private contractEmployeeService: ContractEmployeeService ,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) {   this.dataSource = new MatTableDataSource<contract>([]);}

  ngOnInit() {
    this.displayedColumns = this.getDisplayedColumns();
    this.getItems();
    this.getAllSentCount();
    this.getAllAccepetedCount();
    this.getAllRefusedCount();
    this.getAllPendingCount();
    this.getAllExpiredCount();

   
    
   
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }

  getDisplayedColumns() {
    return ['reference','contractTitle','contractDate', 'validityDate', 'contractStatus','actions'];
  }
  
  getItems() {    
    this.getItemSub = this.contractEmployeeService.getItems()
      .subscribe((data:any)  => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }

/****************************************  get ColorStatus ********************************************/
  getStatusColor(contractStatus: string): { color: string, displayText: string } {

    const STATUS_DATA = {
      ACCEPTED: { color: 'purple', displayText: 'Accepté' },
      SENT: { color: 'primary', displayText: 'Envoyé' },
      REFUSED: { color: 'red', displayText: 'Refusé' },
      STILL_PENDING: { color: 'grey', displayText: 'en cours' },
      EXPIRED: { color: 'green', displayText: 'Expiré' }
    };
    
    
    
    
    return contractStatus ? STATUS_DATA[contractStatus] :  { color: 'yellow', displayText: 'null ' };


  }
  /**********************************************  change contract status    *************************************************/
  changeContractStatus(contractStatus: string, contractId: number): void {
    let updateObservable: Observable<any>;
  
    switch (contractStatus) {
      case 'ContractStatus.SENT':
        updateObservable = this.contractEmployeeService.updateToSentById(contractId);
        break;
      case 'ContractStatus.ACCEPTED':
        updateObservable = this.contractEmployeeService.updateToAcceptedById(contractId);
        break;
      case 'ContractStatus.REFUSED':
        updateObservable = this.contractEmployeeService.updateToRefusedById(contractId);
        break;
        case 'ContractStatus.EXPIRED':
          updateObservable = this.contractEmployeeService.updateToExpiredById(contractId);
          break;
      default:
        // Cas de statut de contrat non géré
        console.error('Statut de contrat non géré');
        return;
    }
  
    if (updateObservable) {
      updateObservable.subscribe(
        () => {
          console.log('Statut mis à jour avec succès');
          this.getItems();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du statut', error);
        }
      );
    }
  }
  /******************************************* le redirection à l'interface de la modification *****************************************************/
  
  redirectToUpdateEmployeeContract(data:any) {
    this.router.navigate(["/updateContract/update-employee-contract"], { state: { row: data } });
  }
  
  
 


  /************************************************ delete contract    ***********************************************************/
  deleteItem(row) {
    
    this.confirmService.confirm({message: `Voulez vous supprimer ce contrat?`})
      .subscribe(res => {
        if (res) {
          this.loader.open('supprimer contrat');
          this.contractEmployeeService.deleteItem(row.id)
          .subscribe((data:any)=> {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Contrat  supprimé!', 'OK', { duration: 4000 })
              this.getItems();
            })
        }
      })
  }
/************************************** statistiques **************************************/
getAllSentCount(): void {
  this.contractEmployeeService.getAllSent().subscribe(
    (response: any) => {
      this.sentCount = response;
    },
    (error: any) => {
      console.error('Erreur lors de la récupération du nombre de commentaires :', error);
    }
  );
}


getAllAccepetedCount(): void {
  this.contractEmployeeService.getAllAccepted().subscribe(
    (response: any) => {
      this.acceptedCount = response;
    },
    (error: any) => {
      console.error('Erreur lors de la récupération du nombre de commentaires :', error);
    }
  );
}

getAllRefusedCount(): void {
  this.contractEmployeeService.getAllRefused().subscribe(
    (response: any) => {
      this.refusedCount = response;
    },
    (error: any) => {
      console.error('Erreur lors de la récupération du nombre de commentaires :', error);
    }
  );
}

getAllPendingCount(): void {
  this.contractEmployeeService.getAllPending().subscribe(
    (response: any) => {
      this.pendingCount = response;
    },
    (error: any) => {
      console.error('Erreur lors de la récupération du nombre de commentaires :', error);
    }
  );
}

getAllExpiredCount(): void {
  this.contractEmployeeService.getAllExpired().subscribe(
    (response: any) => {
      this.expiredCount = response;
    },
    (error: any) => {
      console.error('Erreur lors de la récupération du nombre de commentaires :', error);
    }
  );
}
  /***************************************************   Apply filter   *******************************************************/
  applyFilterr(event: Event, key: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.filterPredicate = (data, filter) => {
      return data[key].trim().toLowerCase().indexOf(filter) !== -1;
    };
  }
  


  applyFilter(event :Event){
    const FilterValue = (event.target as HTMLInputElement).value ;
     this.dataSource.filter = FilterValue.trim().toLowerCase();
 
 }


  ContractTitleMap = {
    [ContractTitle.PERMANENT_EMPLOYMENT_CONTRACT]: 'Contrat de travail à durée indéterminée',
    [ContractTitle.FIXED_TERM_EMPLOYMENT_CONTRACT]: 'Contrat de travail à durée déterminée',
    [ContractTitle.PROFESSIONALIZATION_CONTRACT]: 'Contrat de professionnalisation',
    [ContractTitle.SEASONAL_WORK_CONTRACT]: 'Contrat de travail saisonnier',
    [ContractTitle.PART_TIME_WORK_CONTRACT]: 'Contrat de travail à temps partiel',
    [ContractTitle.STUDY_CONTRACT]: 'Contrat d\'alternance',
    [ContractTitle.TEMPORARY_WORK_CONTRACT]: 'Contrat de travail intérimaire'
  };
}
