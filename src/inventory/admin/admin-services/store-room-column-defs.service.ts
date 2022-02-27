import { Injectable } from '@angular/core';
import { OrderService } from 'src/inventory/shared/shared-services/order.service';

@Injectable({
  providedIn: 'root'
})
export class StoreRoomColumnDefsService {

  constructor(
    private _orderService: OrderService,
  ) { }

  getColumnDefs() {
    const columnDefs = [
      {
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
      },
      {
        headerName: 'Item_ID',
        field: 'item_id',
        minWidth: 100,
        maxWidth: 110,

        suppressMenu: true,
        filter: 'agNumberColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Item',
        field: 'item',
        minWidth: 300,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },

      {
        headerName: 'Purchase Unit',
        field: 'purchase_unit',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Part Number',
        field: 'part_number',
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
        headerName: 'Location',
        field: 'location',
        editable: true,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Total Quantity',
        field: 'quantity',
        minWidth: 125,
        maxWidth: 125,
        suppressMenu: true,
        editable: true,
        'type': 'numericColumn',
      },
      {
        headerName: 'Usage Level',
        field: 'usage_level',
        editable: true,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Min Quantity',
        field: 'min_quantity',
        'type': 'numericColumn',
        editable: true,
        valueSetter: (params: any) => { params.data.min_quantity = params.newValue ? Number(params.newValue) : null }
      },
      {
        headerName: 'Max Quantity',
        field: 'max_quantity',
        'type': 'numericColumn',
        editable: true,
        valueSetter: (params: any) => { params.data.max_quantity = params.newValue ? Number(params.newValue) : null }
      },
      {
        headerName: 'Order Quantity',
        field: 'order_quantity',
        minWidth: 130,
        maxWidth: 130,
        cellStyle: this._orderService.styleOrder,
        valueGetter: this._orderService.getOrderNumber,
        comparator: (valueA: any, valueB:any, nodeA: any, nodeB: any, isInverted: any) => {

          if (valueA === valueB) return 0;
          return (valueA > valueB) ? 1 : -1;
        }
      },

      {
        headerName: 'Issued',
        editable: true,
        valueSetter: this._orderService.setIssued,
        suppressCellFlash: true,
        cellStyle: { 'border': 'solid 1px #C4C4C4' },
      },
      {
        headerName: 'Received', editable: true, valueSetter: this._orderService.setReceived, suppressCellFlash: true,
        cellStyle: { 'border': 'solid 1px #C4C4C4' },
      },
      {
        headerName: 'Unit Price', 
        field: 'average_unit_price'
      },
      {
        headerName: 'Total Price', 
        suppressCellFlash: true,
        minWidth: 130,
        maxWidth: 130,
        valueGetter: (params: any) => {
          return params.data.average_unit_price ? (params.data.average_unit_price * params.data.quantity).toFixed(2) : null
        },
        valueFormatter: (params: any) => {
          return '$' + params.value
        },
      },
      {
        headerName: 'Comments',
        field: 'comment',
        minWidth: 200,
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
      flex: 1,
    }
    return defaultColDef
  }
}
