import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Affectation, Equipment, StatusDisponibility } from 'app/shared/models/equipment';
import { EquipmentService } from '../../equipment.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'app/shared/models/Employee';
import { assEquipmentEmployee } from 'app/shared/models/assEquipmentEmployee';

@Component({
  selector: 'app-view-equipment',
  templateUrl: './view-equipment.component.html',
  styleUrls: ['./view-equipment.component.scss']
})
export class ViewEquipmentComponent implements OnInit {
  public equipment : Equipment;
  public assEqEm : assEquipmentEmployee;
  public employee : Employee;
  public id : number;

  constructor(
    private equipmentService :EquipmentService,
    private dialog: MatDialogRef<ViewEquipmentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    const data = this.data;
  this.equipment= data.equipment;
  this.employee = data.employee;
  this.assEqEm = data.assEqEm;
 // this.getEquipment();
      }
 
  /*getEquipment(){
    this.equipmentService.getEquipment(this.id).subscribe((data: any) => {
      this.equipment = data;
      console.log(data)
    });
  }*/
 
  closeDialog(): void {
    this.dialog.close();
  }
  StatusDisponibilityMap = {
    [StatusDisponibility.AVAILABLE]: 'Disponible',
    [StatusDisponibility.UNAVAILABLE]: 'Indisponible'
    
  };
 AffectationMap={
  [Affectation.AFFECTED]:'Affecté',
  [Affectation.UNAFFECTED]:'Non Affecté'
 }
}
