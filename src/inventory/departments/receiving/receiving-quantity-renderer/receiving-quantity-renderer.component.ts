import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IDepartment } from '../../departments-models/departments.model';
import { ReceivingDetailsComponent } from '../receiving-details/receiving-details.component';

@Component({
  selector: 'inventory-receiving-quantity-renderer',
  templateUrl: './receiving-quantity-renderer.component.html',
  styleUrls: ['./receiving-quantity-renderer.component.scss']
})
export class ReceivingQuantityRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
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
    this.dialog.open(ReceivingDetailsComponent, dialogConfig).afterClosed().subscribe()
  }
  buttonClicked() {
    this.openDialog()
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}


