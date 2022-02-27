import { Injectable } from '@angular/core';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class RequestColumnDefsService {

  constructor() { }

  getColumnDefs() {
    const columnDefs = [
      {
        headerName: 'Item_ID',
        field: 'item_id',
        maxWidth: 110,
        minWidth: 110,
        checkboxSelection: true,
        suppressMenu: true,
        filter: 'agNumberColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Item',
        field: 'item',
        minWidth: 350,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Recent CN',
        field: 'recent_cn',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
      },
      {
        headerName: 'Status',
        field: 'status',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Time Requested',
        field: 'time_requested', valueFormatter: function (params: any) {
          return params.data.time_requested ? moment(params.data.time_requested).format('MM/DD/YYYY hh:mm:ss a') : null
        }
      },
      {
        headerName: 'Time Updated',
        field: 'time_updated', valueFormatter: function (params: any) {
          return params.data.time_updated ? moment(params.data.time_updated).format('MM/DD/YYYY hh:mm:ss a') : null
        }
      },
      {
        headerName: 'Comment',
        field: 'comment',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
    ]
    return columnDefs
  }

  getDefaultColDef() {
    const defaultColDef = {
      resizable: true,
      sortable: true,
      floatingFilter: true,
    }
    return defaultColDef
  }
}
