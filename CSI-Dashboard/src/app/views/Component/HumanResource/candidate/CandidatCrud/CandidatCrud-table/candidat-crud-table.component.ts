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
import { Civility, Employee, EmployeeStatus, MaritalSituation, Provenance, Title } from 'app/shared/models/Employee';
import { Service } from 'app/shared/models/contact';
import { LanguageLevel, Languages } from 'app/shared/models/Language';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-candidat-crud',
  templateUrl: './candidat-crud-table.component.html'
})


export class CandidatCrudTableComponent implements OnInit {
  formData = {}
  console = console;
 
  public itemForm: FormGroup;;
  Provenance = Object.values(Provenance);
  countries: Country[];
  states: string[];
  selectedFile: File;
  title :string[]= Object.values(Title);
  Civility :string []= Object.values(Civility);
  MaritalSituation :string []= Object.values(MaritalSituation);
  EmployeeStatus :any= Object.values(EmployeeStatus);
  formWidth = 200; //declare and initialize formWidth property
  formHeight = 700; //declare and initialize formHeight property
  Languages : string[] = Object.values(Languages);
  LanguageLevel : string[] = Object.values(LanguageLevel);

  submitted = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  public dataSource: any;
  public displayedColumns: any;
  public getItemSub: Subscription;
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

    /////Countries////
    this.itemForm.get("country").valueChanges.subscribe((country) => {
      this.itemForm.get("city").reset();
      if (country) {
        this.states = this.crudService.getStatesByCountry(country);
   
      }
    });
  }


   /*openAffichage() {
    this.router.navigate(['candidatAffichage/:id/candidatFiche']);
  }*/

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
}
