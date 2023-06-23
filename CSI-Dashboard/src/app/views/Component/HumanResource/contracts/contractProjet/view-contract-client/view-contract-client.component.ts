import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractClientService } from '../contract-client.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { contractClient } from 'app/shared/models/contractClient';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-view-contract-client',
  templateUrl: './view-contract-client.component.html',
  styleUrls: ['./view-contract-client.component.scss']
})
export class ViewContractClientComponent implements OnInit {

  id: number;
  contract : contractClient;

  constructor(private route: ActivatedRoute,
    private crudService: ContractClientService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
      this.getContract();
  }
  getContract() {
    this.crudService.getItem(this.id).subscribe((data: any) => {
      this.contract = data;

    });
  }
}
