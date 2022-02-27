import { Component } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AuthService } from 'src/inventory/auth/auth.service';
import { IDepartment } from '../../departments-models/departments.model';
import * as moment from 'moment'
import { QualityService } from '../quality.service';

@Component({
  selector: 'inventory-quality-expiration-renderer',
  templateUrl: './quality-expiration-renderer.component.html',
  styleUrls: ['./quality-expiration-renderer.component.scss']
})
export class QualityExpirationRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  rowItem: IDepartment;
  cellValue: string;
  minDate: string = moment(new Date()).format("YYYY-MM-DD")
  params: ICellRendererParams;
  qualityDetails: any;

  constructor(
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
    const expiration = moment(event.target.value).format()
    this.rowItem = {...this.rowItem, expiration_date: expiration}
    this._qualityService.updateItem(this.rowItem.id, this.rowItem, this._authService.currentUser()).subscribe({
      next: resData => {
        this.cellValue = moment(resData.expiration_date).format('YYYY-MM-DD')
        this.qualityDetails.getItemsByMasterId(resData.item_id)
      }
    })
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}

