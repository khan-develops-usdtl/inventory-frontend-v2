import { Injectable } from '@angular/core';
import { OrderService } from '../../shared/shared-services/order.service';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class DepartmentsColumnsDefsService {

  constructor(
    private _orderService: OrderService,
  ) { }

  getDepartmentsColumnsDefs() {
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
        minWidth: 350,
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
        headerName: 'Total Quantity',
        field: 'quantity',
        minWidth: 125,
        maxWidth: 125,
        suppressMenu: true,
        'type': 'numericColumn',
        cellRenderer: 'quantityRenderer',
        cellStyle: { 'padding': '0', 'margin': '0', 'line-height': '36px' }
      },
      {
        headerName: 'Usage Level',
        field: 'usage_level',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Min Quantity', field: 'min_quantity', minWidth: 120, maxWidth: 120, 'type': 'numericColumn',
        valueSetter: (params: any) => { params.data.min_quantity = params.newValue ? Number(params.newValue) : null }
      },
      {
        headerName: 'Max Quantity', field: 'max_quantity', minWidth: 120, maxWidth: 120, 'type': 'numericColumn',
        valueSetter: (params: any) => { params.data.max_quantity = params.newValue ? Number(params.newValue) : null }
      },
      {
        headerName: 'Order Quantity',
        field: 'order_quantity',
        minWidth: 130,
        maxWidth: 130,
        cellStyle: this._orderService.styleOrder,
        valueGetter: this._orderService.getOrderNumber,
        comparator: (valueA: number, valueB: number, nodeA: any, nodeB: any, isInverted: any) => {
          if (valueA === valueB) return 0;
          return (valueA > valueB) ? 1 : -1;
        }
      },
      {
        headerName: 'Unit Price',
        field: 'average_unit_price',
        minWidth: 100,
        maxWidth: 100,
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
        field: 'comments',
        minWidth: 200,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Category',
        field: 'category',
        minWidth: 150,
        maxWidth: 150,
        suppressMenu: true,
        filter: true,
        cellRenderer: 'categoryRenderer',
        floatingFilterComponent: 'categoryFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
        cellStyle: { 'font-weight': 600, 'padding-right': 0 }
      },
    ]
    return columnDefs
  }

  getDepartmentsDefaultColDef() {
    const defaultColDef = {
      resizable: true,
      sortable: true,
      enableCellChangeFlash: true,
      floatingFilter: true,
    }
    return defaultColDef
  }

  getDepartmentsDetailsColumnsDefs() {
    const columnDefs = [
      {
        headerName: 'ID',
        field: 'id',
        minWidth: 100,
        maxWidth: 100,
      },
      {
        headerName: 'Location',
        field: 'location',
      },
      {
        headerName: 'Qty',
        minWidth: 90,
        maxWidth: 90,
        field: 'quantity',
        editable: true,
        'type': 'numericColumn',
        cellStyle: { 'background-color': '#ADD8E6', 'font-weight': '700', 'font-size': '1.1em' },
        valueSetter: (params: any) => { params.data.quantity = Number(params.newValue) }
      },
      {
        headerName: 'Usage Level',
        field: 'usage_level',
      },
      {
        headerName: 'Min Qty',
        minWidth: 120,
        maxWidth: 120,
        field: 'min_quantity', 'type': 'numericColumn',
        valueSetter: (params: any) => { params.data.min_quantity = params.newValue ? Number(params.newValue) : null }
      },
      {
        headerName: 'Max Qty',
        minWidth: 120,
        maxWidth: 120,
        field: 'max_quantity', 'type': 'numericColumn',
        valueSetter: (params: any) => { params.data.max_quantity = params.newValue ? Number(params.newValue) : null }
      },
      {
        headerName: 'Lot #',
        field: 'lot_number',
        'type': 'numericColumn',
        valueSetter: (params: any) => { params.data.lot_number = params.newValue ? Number(params.newValue) : null },
        editable: true,
      },
      {
        headerName: 'Expiration Date',
        field: 'expiration_date',
        cellRenderer: 'expirationRenderer',
        valueFormatter: function (params: any) {
          return params.data.received_date ? moment(params.data.expiration_date).format('MM/DD/YYYY') : null
        }
      },
      {
        headerName: 'Received Date',
        field: 'received_date',
        cellRenderer: 'receivedRenderer',
        cellStyle: { "padding": 0, },
        valueFormatter: function (params: any) {
          return params.data.received_date ? moment(params.data.received_date).format('MM/DD/YYYY') : null
        }
      },
    ]
    return columnDefs
  }

  getDepartmentsDetailsDefaultColDef() {
    const defaultColDef = {
      resizable: true,
      enableCellChangeFlash: true
    }
    return defaultColDef
  }

  getRequestColumnDefs() {
    const columnDefs = [
      {
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        minWidth: 50,
        maxWidth: 50,
      },
      {
        headerName: 'Item ID',
        field: 'item_id',
        maxWidth: 100,
        suppressMenu: true,
        filter: 'agNumberColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Item',
        field: 'item',
        minWidth: 450,
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
        headerName: 'Comments',
        field: 'comments',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      }
    ]
    return columnDefs
  }

  getRequestDefaultColDef() {
    const defaultColDef = {
      resizable: true,
      sortable: true,
      floatingFilter: true
    }
    return defaultColDef
  }
}
