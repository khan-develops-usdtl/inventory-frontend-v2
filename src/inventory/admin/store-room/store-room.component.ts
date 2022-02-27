import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/inventory/auth/auth.service';
import { OrderService } from 'src/inventory/shared/shared-services/order.service';
import { IInventory } from 'src/inventory/inventory.state';
import { BottomToolbarService } from 'src/inventory/shared/shared-components/navbar/bottom-toolbar/bottom-toolbar.service';
import { SnackbarService } from 'src/inventory/shared/shared-components/snackbar/snackbar.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { StoreRoomColumnDefsService } from '../admin-services/store-room-column-defs.service';
import { StoreRoomCategoryFilterComponent } from './store-room-category-filter/store-room-category-filter.component';
import { StoreRoomCategoryRendererComponent } from './store-room-category-renderer/store-room-category-renderer.component';
import { IStoreRoom } from './store-room.model';
import { StoreRoomService } from './store-room.service';

@Component({
  selector: 'inventory-store-room',
  templateUrl: './store-room.component.html',
  styleUrls: ['./store-room.component.scss']
})
export class StoreRoomComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  searchValue$: Observable<string>
  @Output() selected: IStoreRoom[] = []
  rowData: any
  columnDefs: any
  gridApi: any
  gridColumnApi: any
  defaultColDef: any
  frameworkComponents: any
  getRowStyle: any

  constructor(
    private _store: Store<IInventory>,
    private _orderService: OrderService,
    private _storeRoomService: StoreRoomService,
    private _bottomToolbarService: BottomToolbarService,
    private _snackbarService: SnackbarService,
    private _authService: AuthService,
    private _updaterService: UpdaterService,
    private _storeRoomColumnDefsService: StoreRoomColumnDefsService
  ) {
    this.frameworkComponents = {
      categoryRenderer: StoreRoomCategoryRendererComponent,
      categoryFilter: StoreRoomCategoryFilterComponent,
    }
  }

  ngOnInit(): void {
    this.getColumnDefs()
    this.getDefaultColDef()
    // this.columnDefs = this._storeRoomColumnDefsService.getColumnDefs()
    // this.defaultColDef = this._storeRoomColumnDefsService.getDefaultColDef()
    this.getStoreRoomItems()
  }

  getStoreRoomItems() {
    this.rowData = this._storeRoomService.getStoreRoomItems().pipe(map(storeRoomItemsRes => {
      return storeRoomItemsRes.map(storeRoomItem => ({
        ...storeRoomItem,
        item: storeRoomItem.master.item,
        purchase_unit: storeRoomItem.master.purchase_unit,
        part_number: storeRoomItem.master.part_number,
        recent_cn: storeRoomItem.master.recent_cn,
        category: storeRoomItem.master.category,
        comments: storeRoomItem.master.comments,
        average_unit_price: storeRoomItem.master.average_unit_price
      }))
    }))
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this._bottomToolbarService.currentIsExpanded.subscribe({
      next: (value) => {
        if (value) { this.autoSizeAll() }
        else { this.sizeToFit() }
      }
    })
    this._store.select('search').subscribe((value) => {
      this.gridApi.setQuickFilter(value);
    })
  }

  download() {
    this.gridApi.exportDataAsCsv()
  }

  send() {
    this._storeRoomService.sendEmailReport().subscribe({
      next: () => this._snackbarService.openSnackbar('Email has been sent', 'SUCCESS'),
      error: () => this._snackbarService.openSnackbar('Email has not been sent', 'ERROR')
    })
  }

  handleUpdate(rowItem: any) {
    this._storeRoomService.updateItem(rowItem.data.id, rowItem.data, this._authService.currentUser()).subscribe({
      next: (item) => {
        this._updaterService.setStoreRoomUpdater(true)
      },
      error: () => {
        this._snackbarService.openSnackbar('Item could not be updated', 'ERROR')
      }
    })
  }

  handleDelete($event: any) {
    this.selected.map(item => {
      this._storeRoomService.deleteStoreRoomItem(item.id).subscribe(() =>
        this._storeRoomService.getStoreRoomItems().subscribe({
          next: () => {
            this.getStoreRoomItems()
            this.selected = []
            this._bottomToolbarService.setIsDeleteButtonDisabled(this.selected.length === 0)
            this._bottomToolbarService.setIsAssignToDisabled(!(this.selected.length > 0))
          }
        })
      )
    })
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selected = selectedNodes.map(node => node.data)
    this.selected = selected
    this._bottomToolbarService.setIsDeleteButtonDisabled(selected.length === 0)
    this._bottomToolbarService.setIsAssignToDisabled(!(selected.length > 0))
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
        headerName: 'Location',
        field: 'location',
        editable: true
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
        valueFormatter: this._orderService.getOrderNumber
      },
      {
        headerName: 'Unit Price',
        field: 'average_unit_price',
        minWidth: 130,
        maxWidth: 130,
       
      },
      


      {
        headerName: 'Issued',
        field: 'last_issued',
        editable: true,
        valueSetter: this._orderService.setIssued,
        suppressCellFlash: true,
      },
      {
        headerName: 'Received',
        field: 'last_received',
        editable: true, 
        valueSetter: this._orderService.setReceived, 
        suppressCellFlash: true,
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
    ]
  }

  getDefaultColDef() {
    this.defaultColDef = {
      resizable: true,
      sortable: true,
    }
  }
}
