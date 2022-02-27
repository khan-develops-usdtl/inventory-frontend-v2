import { Component } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { IDepartment } from '../../departments-models/departments.model';
import * as moment from 'moment'
import { ICellRendererParams } from 'ag-grid-community';
import { AuthService } from 'src/inventory/auth/auth.service';
import { RdService } from '../rd.service';

@Component({
  selector: 'inventory-rd-received-renderer',
  templateUrl: './rd-received-renderer.component.html',
  styleUrls: ['./rd-received-renderer.component.scss']
})
export class RdReceivedRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  rowItem: IDepartment;
  maxDate: string = moment(new Date()).format("YYYY-MM-DD");
  cellValue: string;
  params: ICellRendererParams;
  rdDetails: any;

  constructor(
    private _rdService: RdService,
    private _authService: AuthService,
  ) { }

  agInit(params: ICellRendererParams): void {
    this.params = params
    this.rowItem = params.node.data
    this.cellValue = moment(this.getValueToDisplay(params)).format('YYYY-MM-DD')
    this.rdDetails = this.params.context.rdDetails
  }

  refresh(params: ICellRendererParams): any {
    this.cellValue = this.getValueToDisplay(params)
  }

  onDateChange(event: any) {
    const received = moment(event.target.value).format()
    this.rowItem = {...this.rowItem, received_date: received}
    this._rdService.updateItem(this.rowItem.id, this.rowItem, this._authService.currentUser()).subscribe({
      next: resData => {
        this.cellValue = moment(resData.received_date).format('YYYY-MM-DD')
        this.rdDetails.getItemsByMasterId(resData.item_id)
      }
    })
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}


