import { CrudService } from './../candidat-crud.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { NgxTablePopupComponent } from 'app/views/cruds/crud-ngx-table/ngx-table-popup/ngx-table-popup.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Fruit } from 'assets/examples/material/input-chip/input-chip.component';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Civility, Employee, EmployeeStatus, MaritalSituation, Provenance, Title } from 'app/shared/models/Employee';
import { ResourceType } from './../../../../../../shared/models/Employee';
import { LanguageLevel, Languages } from 'app/shared/models/Language';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs-compat';
import { ConvertToResourceComponent } from '../../../convertToResource/convertToResource.component';
import { updateCandidatService } from '../../updateCandidat/updateCandidat.service';


@Component({
  selector: 'app-candidat-crud',
  templateUrl: './candidat-crud-table.component.html',
  styleUrls: ['./candidat-crud-table.component.scss'],
})


export class CandidatCrudTableComponent implements OnInit,OnDestroy {
  popup: MatDialogRef<any>;
  formData = {}
  console = console;
  submitted = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  public itemForm: FormGroup;;
  selectedFile: File;
  formWidth = 200; //declare and initialize formWidth property
  formHeight = 700; //declare and initialize formHeight property
  title :string[]= Object.values(Title);
  EmployeeStatus :any= Object.values(EmployeeStatus);
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [];
  defaultStatus = EmployeeStatus.PRE_QUALIFIED;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  public dataSource: any;
  public displayedColumns: any;
  public getEmployeesub: Subscription;
  public getItemSub: Subscription;

  submitBtnLabel = 'Save';
  editMode = false;
  employeeId: number //| null = null;
  employeeList: Employee[];
  filteredEmployees: Employee[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private update : updateCandidatService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private router: Router
  ) { }
   
 
  ngOnInit() {
    
    this.displayedColumns = this.getDisplayedColumns();
    this.getEmployees();
  }


  updateEmployee(id: number){
    this.router.navigate(["candidatUpdate/updateCandidat", id]);
  }
  goToCV() {
    this.router.navigate(['cvCandidat/cvCandidat-crud']);
  }
  
  /*goToTemplate() {
    this.router.navigate(['templcv/templateDuCv']);
  }*/

  getDisplayedColumns() {
    return ['firstName', 'lastName', 'title',  'status', 'actions'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    if (this.getEmployeesub) {
      this.getEmployeesub.unsubscribe()
    }
  }

  
  

  

  applyFilterr(event: Event, key: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const filterWords = filterValue.split(' ');
  
    this.dataSource.filterPredicate = (data, filter) => {
      // Split the data value into words and convert to lowercase
      const dataWords = data[key].trim().toLowerCase().split(' ');
  
      // Check if all filter words are present in the data (case-insensitive)
      return filterWords.every(word => {
        return dataWords.some(dataWord => dataWord.indexOf(word.toLowerCase()) !== -1);
      });
    };
  
    this.dataSource.filter = filterValue;
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  getRoute(resourceType: string): string {
    switch (resourceType) {
      case ResourceType[ResourceType.BACKOFFICE_RESOURCE]:
        return 'add-backoffice-resource/add-backOffice-crud';
      case ResourceType[ResourceType.EXTERNAL_RESOURCE]:
        return 'add-external-resource/add-external-crud';
      case ResourceType[ResourceType.INTERNAL_RESOURCE]:
        return 'add-resource/add-resource-crud';
      default:
        return '';
    }
  }
  
  addResourceType(row: Employee) {
    const resourceType = ResourceType[ResourceType[row.resourceType]];
    this.router.navigate([this.getRoute(resourceType)], { state: { row } });
  }
    
  
  
  
  
  deleteCandidate(row) {
    this.confirmService.confirm({message: `Delete ${row.firstName}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open('Supprission du candidat');
          this.crudService.deleteItem(row.id)
            .subscribe((data:any)=> {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('candidat supprimé!', 'OK', { duration: 20});
              this.getEmployees();
            })
        }
      })
  }

add(){
  this.router.navigateByUrl('cvCandidat/cvCandidat-crud');
}
 applyFilter(event :Event){
    const FilterValue = (event.target as HTMLInputElement).value ;
     this.dataSource.filter = FilterValue.trim().toLowerCase();
 
 }
 

  getStatusColor(employeeStatus: string): { color: string, displayText: string } {
    const STATUS_DATA = {
      IN_PROCESS: { color: 'primary', displayText: 'En processus' },
      IN_PROGRESS: { color: 'primary', displayText: 'En progrès' },
      PRE_QUALIFIED: { color: 'red', displayText: 'Non qualifié' },
      TOP_PROFILES: { color: 'purple', displayText: 'Top profiles' },
      CONVERTED_TO_RESOURCE: { color: 'purple', displayText: 'Converti en ressource ' },
      DO_NOT_CONTACT : { color:'red', displayText: 'A ne plus contacter' },
      ARCHIVE: { color: 'gray', displayText: 'Archivé' }
    };
    return STATUS_DATA[employeeStatus] || { color: 'primary', displayText: 'En processus' };
}
/*
changeEmployeeStatus(employeeStatus: string, employeeId: number): void {
  console.log('Changing employee status to:', employeeStatus);
  let updateObservable: Observable<any>;
  switch (employeeStatus) {
    case 'employeeStatus.IN_PROCESS':
      updateObservable = this.crudService.updateToInProcessById(employeeId);
      break;
    case 'employeeStatus.IN_PROGRESS':
      updateObservable = this.crudService.updateToInProgressById(employeeId);
      break;
    case 'employeeStatus.PRE_QUALIFIED':
      updateObservable = this.crudService.updateToPreQualifiedById(employeeId);
      break;
    case 'employeeStatus.TOP_PROFILES':
      updateObservable = this.crudService.updateToTopProfilesById(employeeId);
      break;
      case 'employeeStatus.DO_NOT_CONTACT':
        updateObservable = this.crudService.updateToDoNotContactById(employeeId);
        break;
    case 'employeeStatus.CONVERTED_TO_RESOURCE':
      updateObservable = this.crudService.updateToConvertedToResourceById(employeeId);
      break;
    case 'employeeStatus.ARCHIVE':
      updateObservable = this.crudService.updateToArchiveById(employeeId);
      break;
    default:
      // Cas de statut de contrat non géré
      console.error('Statut de candidat non géré');
      return;
  }
  
  updateObservable.subscribe(
    (data) => {
      // handle success
      console.log('Mise à jour effectuée avec succès');
      this.getEmployees();    
    },
    (error) => {
      console.error('Erreur lors de la mise à jour : ', error);
    }
  );
}*/

changeEmployeeStatus(employeeStatus: string, employeeId: number, row: Employee): void {
  console.log('Changing employee status to:', employeeStatus);
  let updateObservable: Observable<any>;

  switch (employeeStatus) {
    case 'employeeStatus.IN_PROCESS':
      updateObservable = this.crudService.updateToInProcessById(employeeId);
      this.getEmployees();
      break;
    case 'employeeStatus.IN_PROGRESS':
      updateObservable = this.crudService.updateToInProgressById(employeeId);
      this.getEmployees();
      break;
    case 'employeeStatus.PRE_QUALIFIED':
      updateObservable = this.crudService.updateToPreQualifiedById(employeeId);
      this.getEmployees();
      break;
    case 'employeeStatus.TOP_PROFILES':
      updateObservable = this.crudService.updateToTopProfilesById(employeeId);
      this.getEmployees();
      break;
    case 'employeeStatus.DO_NOT_CONTACT':
      updateObservable = this.crudService.updateToDoNotContactById(employeeId);
      this.getEmployees();
      break;
    case 'employeeStatus.CONVERTED_TO_RESOURCE':
      updateObservable = this.crudService.updateToConvertedToResourceById(employeeId);
      this.getEmployees();
      break;
    case 'employeeStatus.ARCHIVE':
      updateObservable = this.crudService.updateToArchiveById(employeeId);
      this.getEmployees();
      break;
    default:
      // Cas de statut de contrat non géré
      console.error('Statut de candidat non géré');
      this.getEmployees();
      return;
  }

  // S'abonner à l'observable pour attendre la fin de la mise à jour du statut
 updateObservable.subscribe(() => {
    if (employeeStatus === 'employeeStatus.CONVERTED_TO_RESOURCE') {
      const resourceType = ResourceType[ResourceType[row.resourceType]];
      console.log(row);
      this.openPopUpEmployee(row);
      
    } else {
      // Perform any other necessary actions after updating the status
      // ...
    }
  });

}




employeeTitleMap = {
  [Title.FRONT_END_DEVELOPER]: 'Développeur Front-End',
  [Title.BACK_END_DEVELOPER]: 'Développeur Back-End',
  [Title.FULLSTACK_DEVELOPER]: 'Développeur Full-Stack',
  [Title.CRM]: 'CRM',
  [Title.HUMAN_RESOURCE_MANAGER]: 'Responsable des Ressources Humaines',
  [Title.HUMAN_RESOURCE]: 'Ressources Humaines',
  [Title.PROJECT_MANAGER]: 'Chef de Projet',
  [Title.TECH_LEAD]: 'Chef de Projet',
  [Title.UI_UX_DESIGNER]: 'Concepteur UI/UX',
  [Title.QA_ENGINEER]: 'Ingénieur QA',
  [Title.DEVOPS_ENGINEER]: 'Ingénieur DevOps',
  [Title.WEB_DEVELOPER]: 'Développeur Web',
  [Title.OFFICE_MANAGER]: 'Responsable d Agence',
  [Title.ACCOUNTANT]: 'Comptable',
  [Title.SALES_REPRESENTATIVE]: 'Représentant Commercial',
  [Title.CUSTOMER_SUPPORT_SPECIALIST]: 'Spécialiste du Support Client',
  [Title.MARKETING_COORDINATOR]: 'Coordinateur Marketing'
  
};

showInput1 = false;
showInput2 = false;
showInput3 = false;
showInput4 = false;

toggleInput1() {
  this.showInput1 = !this.showInput1;
}

toggleInput2() {
  this.showInput2 = !this.showInput2;
}
toggleInput3() {
  this.showInput3 = !this.showInput3;
}toggleInput4() {
  this.showInput4 = !this.showInput4;
}




getEmployees() {    
  this.getEmployeesub = this.crudService.getItems()
    .subscribe((data:any)  => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    
}
getItems() {    
  this.getItemSub = this.update.getItems()
    .subscribe((data:any)  => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

}
/*openPopUpEmployee(data: any = {}, isNew?: boolean) {
  console.log(data);
  const title = isNew ? 'Nouvelle education' : 'Modifier education';
  const dialogRef: MatDialogRef<any> = this.dialog.open(ConvertToResourceComponent, {
    width: '1000px',
    disableClose: true,
    data: { title: title, payload: data }
  });

  dialogRef.afterClosed()
    .subscribe(res => {
      if (!res) {

        return;
      }
      if (isNew) {
        this.loader.open('Ajout en cours');
        this.update.addItem(res)
          .subscribe((data: any) => {
            this.dataSource = data;
            this.loader.close();
            this.snack.open('Employee ajoutée avec succès!', 'OK', { duration: 2000 });
            this.getItems();
          })
      } else {
        console.log('else');
        const updatedData = { ...data, ...res, employeeStatus: EmployeeStatus.CONVERTED_TO_RESOURCE};
        this.update.updateEmployee(data.id, updatedData).subscribe(
          (response) => {
            console.log('Employee updated successfully', response);
            this.snack.open('Employee modifié avec succès!', 'OK', { duration: 2000 });
            this.getItems();
          },
          (error) => {
            console.error('Error updating Employee', error);
            this.snack.open('Une erreur est survenue lors de la modification de l Employee', 'OK', { duration: 2000 });
          }
        );
      }
    });
}*/
openPopUpEmployee(data: any = {}) {
  const title = 'Modifier Employee';
  const dialogRef: MatDialogRef<any> = this.dialog.open(ConvertToResourceComponent, {
    width: '1000px',
    height: '600px',
    disableClose: true,
    data: { title: title, payload: data }
  });

  dialogRef.afterClosed().subscribe(res => {
    if (res) {
      const updatedData = { ...data, ...res};
      this.update.updateEmployee(data.id, res).subscribe(
        (response) => {
          console.log('Item updated successfully', response);
          this.snack.open('Compte bancaire modifié avec succès!', 'OK', { duration: 2000 });

          // Update the status after updating the employee
          this.crudService.updateToConvertedToResourceById(data.id).subscribe(
            (statusResponse) => {
              console.log('Status updated successfully', statusResponse);
              this.snack.open('Status modifié avec succès!', 'OK', { duration: 2000 });
              this.getItems(); // Refresh the employee list if needed
            },
            (statusError) => {
              console.error('Error updating status', statusError);
              this.snack.open('Une erreur est survenue lors de la modification du statut.', 'OK', { duration: 2000 });
            }
          );
        },
        (error) => {
          console.error('Error updating item', error);
          this.snack.open('Une erreur est survenue lors de la modification du compte bancaire.', 'OK', { duration: 2000 });
        }
      );
    }
  });
}



}
