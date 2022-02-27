import { Component, OnInit } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { IDepartment } from '../../departments-models/departments.model';
import * as moment from 'moment'
import { ICellRendererParams } from 'ag-grid-community';
import { Router } from '@angular/router';
import { AuthService } from 'src/inventory/auth/auth.service';
import { QualityService } from '../quality.service';

@Component({
  selector: 'inventory-quality-received-renderer',
  templateUrl: './quality-received-renderer.component.html',
  styleUrls: ['./quality-received-renderer.component.scss']
})
export class QualityReceivedRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  rowItem: IDepartment;
  maxDate: string = moment(new Date()).format("YYYY-MM-DD");
  cellValue: string;
  params: ICellRendererParams;
  qualityDetails: any;

  constructor(
    private _router: Router,
    private _qualityService: QualityService,
    private _authService: AuthService,
  ) { }

  agInit(params: ICellRendererParams): void {
    this.params = params
    this.rowItem = params.node.data
    this.cellValue = moment(this.getValueToDisplay(params)).format('YYYY-MM-DD')
    this.qualityDetails = this.params.context.qualityDetails
  }

  refresh(params: ICellRendererParams): any {
    this.cellValue = this.getValueToDisplay(params)
  }

  onDateChange(event: any) {
    const received = moment(event.target.value).format()
    this.rowItem = {...this.rowItem, received_date: received}
    this._qualityService.updateItem(this.rowItem.id, this.rowItem, this._authService.currentUser()).subscribe({
      next: resData => {
        this.cellValue = moment(resData.received_date).format('YYYY-MM-DD')
        this.qualityDetails.getItemsByMasterId(resData.item_id)
      }
    })
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}

