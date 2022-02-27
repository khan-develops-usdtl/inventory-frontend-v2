import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRequest } from 'src/inventory/departments/departments-models/request.model';
import { BreakroomRequestService } from 'src/inventory/departments/requests/breakroom-request/breakroom-request.service';
import { ConfirmationDialogService } from 'src/inventory/shared/shared-components/dialog/confirmation-dialog/confirmation-dialog.service';
import { SnackbarService } from 'src/inventory/shared/shared-components/snackbar/snackbar.service';

@Component({
  selector: 'inventory-breakroom-request-items',
  templateUrl: './breakroom-request-items.component.html',
  styleUrls: ['./breakroom-request-items.component.scss']
})
export class BreakroomRequestItemsComponent implements OnInit {
  isDeleteButtonDisabled: boolean = true
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  searchValue$: Observable<string>
  selected: IRequest[] = []
  rowData: any
  columnDefs: any
  gridApi: any
  gridColumnApi: any
  defaultColDef: any

  constructor(
    private _snackbarService: SnackbarService,
    private _breakroomService: BreakroomRequestService,
    private _confirmationDialogService: ConfirmationDialogService,
  ) {
  }

  ngOnInit(): void {
    this.getColumnDefs()
    this.getDefaultColDef()
    // this.columnDefs = this._storeRoomColumnDefsService.getColumnDefs()
    // this.defaultColDef = this._storeRoomColumnDefsService.getDefaultColDef()
    this.getGeneralItems()
  }

  getGeneralItems() {
    this.rowData = this._breakroomService.getBreakroomItems().pipe(map(iItemsRes => {
      return iItemsRes.map(item => ({
        ...item,
        item: item.master.item,
        purchase_unit: item.master.purchase_unit,
        part_number: item.master.part_number,
        recent_cn: item.master.recent_cn,
        category: item.master.category,
        comments: item.master.comments,
        average_unit_price: item.master.average_unit_price
      }))
    }))
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit()
  }

  handleDelete() {
    this._confirmationDialogService.confirmationDialog("Would you like to delete selected items?").afterClosed().subscribe({
      next: res => {
        if (res === true) {
          this.selected.map(item => {
            this._breakroomService.deleteBreakroomRequestItem(item.id).subscribe(() => this.getGeneralItems())
            this.isDeleteButtonDisabled = true
          })
        }
      }
    })
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selected = selectedNodes.map(node => node.data)
    this.selected = selected
    this.isDeleteButtonDisabled = selected.length === 0
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  autoSizeAll() {
    var allColumnIds: any[] = [];
    this.gridColumnApi.getAllColumns().forEach(function (column: { colId: any; }) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, false);
  }

  getColumnDefs() {
    this.columnDefs = [
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
        headerName: 'Total Quantity',
        field: 'quantity',
        minWidth: 125,
        maxWidth: 125,
        suppressMenu: true,
        'type': 'numericColumn',
        cellStyle: { 'text-align': 'center', 'font-size': 'medium', 'font-weight': 900, 'background-color': '#ededed' }
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
        headerName: 'Comments',
        field: 'comments',
        minWidth: 200,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
    ]
  }

  getDefaultColDef() {
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      floatingFilter: true,
      flex: 1,
    }
  }
}
