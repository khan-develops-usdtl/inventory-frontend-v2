import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IDepartment } from '../../departments-models/departments.model';
import { ChemicalsService } from '../chemicals.service';
import { ChemicalsDetailsComponent } from '../chemicals-details/chemicals-details.component';

@Component({
  selector: 'inventory-chemicals-quantity-renderer',
  templateUrl: './chemicals-quantity-renderer.component.html',
  styleUrls: ['./chemicals-quantity-renderer.component.scss']
})
export class ChemicalsQuantityRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  rowItem: IDepartment;
  cellValue: number
  params: ICellRendererParams;

  constructor(
    private _router: Router,
    private dialog: MatDialog,
  ) { }

  agInit(params: ICellRendererParams): void {
    this.params = params
    this.rowItem = params.node.data
    this.cellValue = this.getValueToDisplay(params) === null ? 0 : this.getValueToDisplay(params)
  }

  refresh(params: ICellRendererParams): any {
    this.cellValue = this.getValueToDisplay(params)
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.rowItem;
    dialogConfig.width = "100%"
    this.dialog.open(ChemicalsDetailsComponent, dialogConfig).afterClosed().subscribe()
  }
  buttonClicked() {
    this.openDialog()
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}


