import { Injectable } from '@angular/core';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class AdminColumnsDefService {

  constructor() { }

  getColumnsDefs() {
    const columnDefs = [
      {
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        minWidth: 50,
        maxWidth: 50,
      },
      {
        headerName: 'Item_ID',
        field: 'item_id',
        minWidth: 100,
        maxWidth: 100,

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
        editable: true
      },
      {
        headerName: 'Department',
        field: 'department'
      },
      {
        headerName: 'Status',
        field: 'status',
        cellStyle: { 'background-color': '#ededed', 'font-weight': 600 },
        cellRenderer: 'dropdownRenderer'
      },
      {
        headerName: 'Comments',
        field: 'comment',
        minWidth: 200,
        editable: true,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Custom Text',
        field: 'custom_text',
        editable: true
      },
      {
        headerName: 'Time Requested', field: 'time_requested', valueFormatter: function (params: any) {
          return params.data.time_requested ? moment(params.data.time_requested).format('MM/DD/YYYY hh:mm:ss a') : null
        }
      },
      {
        headerName: 'Time Updated', field: 'time_updated', valueFormatter: function (params: any) {
          return params.data.time_updated ? moment(params.data.time_updated).format('MM/DD/YYYY hh:mm:ss a') : null
        }
      },

    ]
    return columnDefs
  }

  getDefaultColDef() {
    const defaultColDef = {
      resizable: true,
      sortable: true,
      enableCellChangeFlash: true,
      floatingFilter: true,
    }
    return defaultColDef
  }
}
