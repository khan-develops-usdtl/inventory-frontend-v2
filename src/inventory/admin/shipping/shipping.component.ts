import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/inventory/auth/auth.service';
import { IInventory } from 'src/inventory/inventory.state';
import { BottomToolbarService } from 'src/inventory/shared/shared-components/navbar/bottom-toolbar/bottom-toolbar.service';
import { SnackbarService } from 'src/inventory/shared/shared-components/snackbar/snackbar.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { OrderService } from '../../shared/shared-services/order.service';
import { StoreRoomColumnDefsService } from '../admin-services/store-room-column-defs.service';
import { ShippingCategoryFilterComponent } from './shipping-category-filter/shipping-category-filter.component';
import { ShippingCategoryRendererComponent } from './shipping-category-renderer/shipping-category-renderer.component';
import { IShipping } from './shipping.model';
import { ShippingService } from './shipping.service';




@Component({
  selector: 'inventory-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular | undefined;
  selected: IShipping[]
  rowData: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  context: any;
  frameworkComponents: any;

  constructor(
    private _store: Store<IInventory>,
    private _snackbarService: SnackbarService,
    private _orderService: OrderService,
    private _updaterService: UpdaterService,
    private _shippingService: ShippingService,
    private _bottomToolbarService: BottomToolbarService,
    private _storeRoomColumnDefsService: StoreRoomColumnDefsService,
    private _authService: AuthService
  ) {
    this.frameworkComponents = {
      categoryRenderer: ShippingCategoryRendererComponent,
      categoryFilter: ShippingCategoryFilterComponent
    }
  }

  ngOnInit(): void {

    this._updaterService.currentShippingUpdater.subscribe({
      next: () => {
        this.getShippingItems()
      }
    })
    this.columnDefs = this._storeRoomColumnDefsService.getColumnDefs()
    this.defaultColDef = this._storeRoomColumnDefsService.getDefaultColDef()
    // this.getColumnDefs()
    // this.getColumnDefsForAdmin()
    // this.getDefaultColDef()
  }

  getShippingItems() {
    this.rowData = this._shippingService.getShippingItems().pipe(map(shippingItemsRes => {
      return shippingItemsRes.map(shippingItem => ({
        ...shippingItem,
        item: shippingItem.master.item,
        purchase_unit: shippingItem.master.purchase_unit,
        part_number: shippingItem.master.part_number,
        recent_cn: shippingItem.master.recent_cn,
        comments: shippingItem.master.comments,
        category: shippingItem.master.category,
        average_unit_price: shippingItem.master.average_unit_price,
      })
      )
    }))
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    this.getShippingItems()
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
    this._shippingService.sendEmailReport().subscribe({
      next: () => this._snackbarService.openSnackbar('Email has been sent', 'SUCCESS'),
      error: () => this._snackbarService.openSnackbar('Email has not been sent', 'ERROR')
    })
  }

  handleUpdate(rowItem: any) {
    this._shippingService.updateItem(rowItem.data.id, rowItem.data, this._authService.currentUser()).subscribe({
      next: (item) => {
        this._updaterService.setShippingUpdater(true)
      },
      error: () => {
        this._snackbarService.openSnackbar('Item could not be updated', 'ERROR')
      }
    })
  }

  handleDelete($event: any) {
    this.selected.map(item => {
      this._shippingService.deleteItem(item.id).subscribe(() =>
        this._shippingService.getShippingItems().subscribe({
          next: () => {
            this.getShippingItems()
            this.selected = []
            this._bottomToolbarService.setIsDeleteButtonDisabled(this.selected.length === 0)
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
        headerName: 'Location',
        field: 'location',
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
        headerName: 'Need To Order',
        field: 'order_quantity',
        minWidth: 130,
        maxWidth: 130,
        cellStyle: this._orderService.styleOrder,
        valueFormatter: this._orderService.getOrderNumber
      },
      {
        headerName: 'Category',
        field: 'category',
        minWidth: 120,
        maxWidth: 120,
        suppressMenu: true,
        filter: true,
        floatingFilterComponent: 'categoryFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
        cellStyle: { 'background-color': '#ededed', 'font-weight': 600, 'padding-right': 0 }
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
      enableCellChangeFlash: true,
      floatingFilter: true,
    }
  }

  getColumnDefsForAdmin() {
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
        editable: true,
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
        minWidth: 120,
        maxWidth: 120, 'type': 'numericColumn',
        editable: true,
        valueSetter: (params: any) => { params.data.min_quantity = params.newValue ? Number(params.newValue) : null }
      },
      {
        headerName: 'Max Quantity',
        field: 'max_quantity',
        minWidth: 120,
        maxWidth: 120, 'type': 'numericColumn',
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
        headerName: 'Category',
        field: 'category',
        minWidth: 150,
        maxWidth: 150,
        suppressMenu: true,
        filter: true,
        cellRenderer: 'categoryRenderer',
        floatingFilterComponent: 'categoryFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
        cellStyle: { 'background-color': '#ededed', 'font-weight': 600, 'padding-right': 0 }
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
}



