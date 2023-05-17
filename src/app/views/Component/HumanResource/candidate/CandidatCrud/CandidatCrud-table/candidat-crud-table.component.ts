import { ResourceType } from './../../../../../../shared/models/Employee';
import { CrudService } from './../candidat-crud.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { CompanyStatus, Country } from 'app/shared/models/Partner';
import { Civility, Employee, EmployeeStatus, MaritalSituation, Provenance , Title} from 'app/shared/models/Employee';
import { Service } from 'app/shared/models/contact';
import { LanguageLevel, Languages } from 'app/shared/models/Language';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Invoice } from 'app/shared/models/invoice.model';

@Component({
  selector: 'app-candidat-crud',
  templateUrl: './candidat-crud-table.component.html'
})


export class CandidatCrudTableComponent implements OnInit {
  formData = {}
  console = console;
  submitted = false;
  visible = true;
  employee : Employee
  selectable = true;
  removable = true;
  addOnBlur = true;
  public itemForm: FormGroup;;
  selectedFile: File;
  formWidth = 200; //declare and initialize formWidth property
  formHeight = 700; //declare and initialize formHeight property
  title :any[]= Object.values(Title);
  EmployeeStatus :any= Object.values(EmployeeStatus);
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [];
  defaultStatus = EmployeeStatus.PRE_QUALIFIED;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  public dataSource: any;
  public displayedColumns: any;
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
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private router: Router
  ) { }
   
 
  ngOnInit() {
    
    this.displayedColumns = this.getDisplayedColumns();
    this.getItems();
  }


  updateEmployee(id: number){
    this.router.navigate(["candidatUpdate/updateCandidat", id]);
  }
  goToCV() {
    this.router.navigate(['cvCandidat/cvCandidat-crud']);
  }
  

  getDisplayedColumns() {
    return ['firstName', 'lastName', 'title',  'status', 'actions'];
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

  
  

  getItems() {    
    this.getItemSub = this.crudService.getItems()
      .subscribe((data:any)  => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }
  /*applyFilterFirstName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.filterPredicate = (data, filter) => {
      return data.firstName.trim().toLowerCase().indexOf(filter) !== -1;
    };
  }
  applyFilterLastName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.filterPredicate = (data, filter) => {
      return data.lastName.trim().toLowerCase().indexOf(filter) !== -1;
    };
  }
  applyFilterTitle(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.filterPredicate = (data, filter) => {
      return data.title.trim().toLowerCase().indexOf(filter) !== -1;
    };
  }*/


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
  
 
  /*addResourceType(employee : Employee ) {
    
    switch ( ResourceType[ResourceType[employee.resourceType]]) {
      case  ResourceType[ResourceType.BACKOFFICE_RESOURCE] :
        this.router.navigate(['add-backoffice-resource/add-backOffice-crud']);
        break;
        case  ResourceType[ResourceType.EXTERNAL_RESOURCE] :
        this.router.navigate(['add-external-resource/add-external-crud']);
        break;
        case  ResourceType[ResourceType.INTERNAL_RESOURCE] :
        this.router.navigate(['add-resource/add-resource-crud']);
        break;
       

  }
}*/
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
              this.getItems();
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
 
  createRepeatForm(): FormGroup {
    return this._formBuilder.group({
    });
  }

  /***************************  méthode converted to ressource***************************/
   
}
