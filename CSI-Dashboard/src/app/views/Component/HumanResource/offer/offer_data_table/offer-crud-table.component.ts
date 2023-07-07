
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Title } from 'app/shared/models/Employee';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { OfferService } from '../offer.service';
import { Offer, OfferStatus } from 'app/shared/models/Offer';
import { OfferPopupComponent } from '../offer-popup/offer-popup.component';
import { OfferDetailPopupComponent } from '../affichage_offer/affichage_offer.component';

@Component({
  selector: 'offer-crud',
  templateUrl: './offer-crud-table.component.html',
  styleUrls: ['./offer-crud-table.component.scss'],
})


export class OfferCrudTableComponent implements OnInit {
  formData = {}
  console = console;

  public itemForm: FormGroup;;

  selectedFile: File;
  title: string[] = Object.values(Title);

  formWidth = 200; //declare and initialize formWidth property
  formHeight = 700; //declare and initialize formHeight property




  showInput1 = false;
  showInput2 = false;
  showInput3 = false;
  showInput4 = false;
  showInput5 = false;
  submitted = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  offerStatus: any = Object.values(OfferStatus);
  defaultStatus = OfferStatus.OPEN;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  offerId: number
  public dataSource: MatTableDataSource<Offer>;
  public displayedColumns: any;
  public getItemSub: Subscription;



  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: OfferService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) { this.dataSource = new MatTableDataSource<Offer>([]); }

  ngOnInit() {
    this.displayedColumns = this.getDisplayedColumns();
    this.getItems()
  }

  getDisplayedColumns() {
    return ['reference', 'title', 'startDate', 'endDate', 'statut', 'actions'];
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
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }


  openPopupDetails(row: any, isNew?: boolean): void {
    const title = isNew ? 'Nouvelle offre' : 'Détails de l\'offre';
    const dialogRef: MatDialogRef<OfferDetailPopupComponent> = this.dialog.open(OfferDetailPopupComponent, {
      width: '400px',
      disableClose: true,
      data: { title: title, payload: { id: row.id, ...row } }
    });
  
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        // If user presses cancel
        return;
      }
  
      if (isNew) {
        // Handle adding new offer
      } else {
        // Handle updating existing offer
      }
    });
  }

  openPopUp(data: any, isNew?) {
    let title = isNew ? 'Nouvelle offre' : 'Modifier offre';
    let dialogRef: MatDialogRef<any> = this.dialog.open(OfferPopupComponent, {
      width: '1000px',
      disableClose: true,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;

        }
        if (isNew) {
          this.loader.open('Ajout en cours');
          this.crudService.addItem(res)
            .subscribe((data: any) => {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Offre ajoutée avec succès!', 'OK', { duration: 2000 });
              this.getItems();
            })
        } 
        else {
          this.loader.open('modification en cours');
          this.crudService.updateItem(data.id, res)
            .subscribe((data: any) => {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Offre modifiée avec succées !', 'OK', { duration: 2000 });
              this.getItems();
            })
        }
      })
  }


  deleteItem(row) {
    this.confirmService.confirm({ message: `Delete ${row.name}?` })
      .subscribe(res => {
        if (res) {
          this.loader.open('Supprssion de l`offre');
          this.crudService.deleteItem(row)
            .subscribe((data: any) => {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Offre supprimée!', 'OK', { duration: 2000 });
              this.getItems();
            })
        }
      })
  }


  applyFilter(event :Event){
    const FilterValue = (event.target as HTMLInputElement).value ;
     this.dataSource.filter = FilterValue.trim().toLowerCase();
 
 }

  Affiche(id: number) {
    this.router.navigate(["affichageOffer/affichageOffer", id]);
  }





  getStatusColor(offerStatus: string): { color: string, displayText: string } {
    const STATUS_DATA = {
      OPEN: { color: 'primary', displayText: 'Ouverte' },
      ENDED: { color: 'red', displayText: 'Cloturé' }
    };
    return STATUS_DATA[offerStatus] || { color: 'primary', displayText: 'Ouverte' };
  }

  changeOffereStatus(offerStatus: string, offerId: number): void {
    console.log('Changing offer status to:', offerStatus);
    let updateObservable: Observable<any>;
    switch (offerStatus) {

      case 'offerStatus.OPEN':
        updateObservable = this.crudService.updateToOpenById(offerId);
        break;

      case 'offerStatus.ENDED':
        updateObservable = this.crudService.updateToEndedById(offerId);
        break;
      default:
        // Cas de statut de contrat non géré
        console.error('Statut de l offre non géré');
        return;
    }

    updateObservable.subscribe(
      (data) => {
        // handle success
        console.log('Mise à jour effectuée avec succès');
        this.getItems();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour : ', error);
      }
    );
  }

  applyStatusFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data, filter) => {
      const status = this.getStatusColor(data.offerStatus).displayText.toLowerCase();
      return status.includes(filter);
    };

    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleInput1() {
    this.showInput1 = !this.showInput1;
  }
  
  toggleInput2() {
    this.showInput2 = !this.showInput2;
  }
  
  toggleInput3() {
    this.showInput3 = !this.showInput3;
  }
  toggleInput4() {
    this.showInput4 = !this.showInput4;
  }

  toggleInput5() {
    this.showInput5 = !this.showInput5;
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
}
