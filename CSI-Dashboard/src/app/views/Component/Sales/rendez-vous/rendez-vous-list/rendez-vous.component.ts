import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service'; 
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service'; 
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


import { egretAnimations } from 'app/shared/animations/egret-animations';
import { RendezVousPopupComponent } from '../rendez-vous-popup/rendez-vous-popup.component';
import { RendezVousService } from '../rendez-vous.service';
import { RendezVous } from 'app/shared/models/rendez-vous';
import { ContactService } from '../../contact/contact.service';
import { contact } from 'app/shared/models/contact';
import { CalendarEvent, CalendarView } from 'angular-calendar';


@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  
})
export class RendezVouslistComponent implements OnInit , OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  public dataSource: MatTableDataSource<RendezVous>;
  public displayedColumns: any;
  public getItemSub: Subscription;
  private ContactId : number; 
  private contact : contact ;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  calendarOptions: any = {};
  contacts: contact[] = [];
  appointments: any[] = [];
  @Input() events: any[];
  @Input() options: any;
  constructor(
    
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private rendezVousService: RendezVousService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private contactService: ContactService
  ) {     this.dataSource = new MatTableDataSource<RendezVous>([]);}

  ngOnInit() {
    
    this.displayedColumns = this.getDisplayedColumns();
    this.getItems()
 
   

  }

  getDisplayedColumns() {
    return ['Date','Time','Duration','Location','Subject','Contact','actions'];
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
    this.getItemSub = this.rendezVousService.getItems()
      .subscribe((data:any)  => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }


  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.name}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open('supprission du rendez-vous');
          this.rendezVousService.deleteItem(row)
            .subscribe((data:any)=> {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('rendez-vous supprimé !', 'OK', { duration: 2000 });
              this.getItems();
            })
        }
      })
  }

  applyFilter(event :Event){
    const FilterValue = (event.target as HTMLInputElement).value ;
     this.dataSource.filter = FilterValue.trim().toLowerCase();
 
 }

 openPopUp(data:  any , isNew?) {
  let title = isNew ? 'Nouveau rendez-vous' : 'Modifier rendez-vous';
  let dialogRef: MatDialogRef<any> = this.dialog.open(RendezVousPopupComponent, {
    width: '720px',
    disableClose: true,
    data: { title: title, payload: data }
  })
  dialogRef.afterClosed()
    .subscribe(res => {
      if(!res) {
        // If user press cancel
        return;
      }
      if (isNew) {
        this.loader.open('ajout du nouveau rendez-vous');
        this.rendezVousService.addItem(res)
          .subscribe((data :any)=> {
            this.dataSource = data;
            this.loader.close();
            this.snack.open('Rendez-vouz ajouté !', 'OK', { duration: 2000 });
            this.getItems();
          })
      } else {
        this.loader.open('mise a jour du rendez-vous');
        this.rendezVousService.updateItem(data.id, res)
          .subscribe((data:any) => {
            this.dataSource = data ;
            this.loader.close();
            this.snack.open('rendez-vous mis a jour!', 'OK', { duration: 2000 });
            this.getItems();
          })
      }
    })
}
}