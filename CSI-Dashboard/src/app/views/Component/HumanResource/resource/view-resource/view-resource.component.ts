import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { ResourceService } from '../resource.service';
import { Resource } from 'app/shared/models/Resource';
import { ActivatedRoute, Router } from '@angular/router';
import { Civility, Departement, MaritalSituation, ResourceType, Title, WorkLocation } from 'app/shared/models/Employee';
import { availability } from 'app/shared/models/availability';
import { MatTableDataSource } from '@angular/material/table';
import { ContractTitle, contract } from 'app/shared/models/contract';
import { AvailabilityComponent } from '../availability/availability.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateAvailabilityComponent } from '../update-availability/update-availability.component';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { ViewAvailabilityComponent } from '../view-availability/view-availability.component';


@Component({
  selector: 'app-view-resource',
  templateUrl: './view-resource.component.html',
  styleUrls: ['./view-resource.component.scss']
})
export class ViewResourceComponent implements OnInit {
public resource : Resource;
public id : number;
photoUrl : any
public displayedColumnsC: any;
public displayedColumnsD: any;
public dataSourceC: MatTableDataSource<contract>;
public dataSourceD: MatTableDataSource<availability>;
public contracts : contract[];
public availabilities : availability[];



  constructor(private resourceService : ResourceService,
    private route : ActivatedRoute,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    @Inject(DOCUMENT) private document: Document) {
        
      this.dataSourceC = new MatTableDataSource<contract>([]);
      this.dataSourceD = new MatTableDataSource<availability>([]);
    }

    getDisplayedColumnsC() {
      return ['number','reference','contractTitle','actions' ];
    }
    getDisplayedColumnsD() {
      return ['number','startDate','endDate', 'period','actions'];
    }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getResource();
    this.getContract();
    this.getAvailability();
  
    this.displayedColumnsD=this.getDisplayedColumnsD();
    this.displayedColumnsC=this.getDisplayedColumnsC();
  } 
getResource(){
  this.resourceService.getItem(this.id).subscribe((data: any) => {
    this.resource = data;
    console.log(data)

  });
}
getContract() {
  this.resourceService.getItemContract(this.id).subscribe((data: any) => {
    this.dataSourceC = data;
    
  });
}
getAvailability() {
  this.resourceService.getItemAvailability(this.id).subscribe((data: any) => {
    this.dataSourceD = data;
    
  });
}

onAvailability(data: any): void {

    const dialogRef: MatDialogRef<any> = this.dialog.open(UpdateAvailabilityComponent, {
      width: '720px',
      disableClose: true,
      data: { payload: data }
    });
  
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loader.open('Modifier motif');
        this.resourceService.updateAvailability(data.id, res).subscribe((updatedData: any) => {
     
          this.snack.open('Indisponibilité modifiée!', 'OK', { duration: 4000 });
          this.loader.close();
          this.getAvailability();
        });
      } else {
        // If user presses cancel
        return;
      }
    });
  }


  openPopUpView(row: any): void {
    const dialogRef = this.dialog.open(ViewAvailabilityComponent, {
      width: '600px',
      data:  { availability : row},
    });
  
    dialogRef.afterOpened().subscribe(() => {
      console.log('Dialog opened successfully.');
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      // Code executed after the dialog is closed
    }, error => {
      console.error('An error occurred while opening the dialog:', error);
      // Handle the error appropriately (e.g., display an error message)
    });
  }

/*************************************** La traduction des enums**********************************/
departementMap = {
  [Departement.ARCHITECTURE]: 'Architecture',
  [Departement.COMPTABILITE]: 'Comptabilité',
  [Departement.DESIGN]: 'Design',
  [Departement.DEVELOPPEMENT]: 'Développement',
  [Departement.FINANCES]: 'Finance',
  [Departement.JURIDIQUE]: 'Juridique',
  [Departement.MARKETING]: 'Marketing',
  [Departement.QUALITE]: 'Qualité',
  [Departement.RESSOURCES_HUMAINES]: 'Ressources_Humaines',
  [Departement.SUPPORT]: 'Support',
  [Departement.TESTS]: 'Tests',
  [Departement.VENTE]: 'Vente'
};

employeeTitleMap = {
  [Title.FRONT_END_DEVELOPER]: 'Développeur Front-End',
  [Title.BACK_END_DEVELOPER]: 'Développeur Back-End',
  [Title.FULLSTACK_DEVELOPER]: 'Développeur Full-Stack',
  [Title.CRM]: 'CRM',
  [Title.HUMAN_RESOURCE_MANAGER]: 'Responsable des Ressources Humaines',
  [Title.HUMAN_RESOURCE]: 'Ressources Humaines',
  [Title.PROJECT_MANAGER]: 'Chef de Projet',
  [Title.TECH_LEAD]: 'Responsable Technique',
  [Title.UI_UX_DESIGNER]: 'Concepteur UI/UX',
  [Title.QA_ENGINEER]: 'Ingénieur QA',
  [Title.DEVOPS_ENGINEER]: 'Ingénieur DevOps',
  [Title.WEB_DEVELOPER]: 'Développeur Web',
  [Title.OFFICE_MANAGER]: 'Responsable d/Agence',
  [Title.ACCOUNTANT]: 'Comptable',
  [Title.SALES_REPRESENTATIVE]: 'Représentant Commercial',
  [Title.CUSTOMER_SUPPORT_SPECIALIST]: 'Spécialiste du Support Client',
  [Title.MARKETING_COORDINATOR]: 'Coordinateur Marketing'
  
};
maritalSituationMap = {
  [MaritalSituation.SINGLE]:'Célibataire',
  [MaritalSituation.MARRIED]:'Marrié',
 [MaritalSituation.DIVORCED]:'Divorcé',
 [MaritalSituation.WIDOWED] :'Veuf/Veuve',
 [MaritalSituation.COMPLICATED] :'Compliqué'
};
resourceTypeMap = {
  [ResourceType.BACKOFFICE_RESOURCE]:'Ressource BackOffice',
  [ResourceType.EXTERNAL_RESOURCE]:'Ressource Externe',
 [ResourceType.INTERNAL_RESOURCE]:'Ressource Interne'
};

  civilityMap = {
    [Civility.MS]:'Mlle',
    [Civility.MRS]:'Mme',
    [Civility.MR]:'Mr'
  };


  workLocationMap= {
    [WorkLocation.MAIN]:'Principale',
    [WorkLocation.OTHER_LOCATION]:'Autre Location'
  };

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
