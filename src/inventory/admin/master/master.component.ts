import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { IInventory } from 'src/inventory/inventory.state';
import { BottomToolbarService } from 'src/inventory/shared/shared-components/navbar/bottom-toolbar/bottom-toolbar.service';
import { SnackbarService } from 'src/inventory/shared/shared-components/snackbar/snackbar.service';
import { IMaster } from './master.model';
import { MasterService } from './master.service';

@Component({
  selector: 'inventory-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  searchValue$: Observable<string>
  selected: IMaster[]
  rowData: any
  columnDefs: any
  gridApi: any
  gridColumnApi: any
  defaultColDef: any

  constructor(
    private _snackbarService: SnackbarService,
    private _store: Store<IInventory>,
    private _masterService: MasterService,
    private _bottomToolbarService: BottomToolbarService
  ) {
    this._store.select('search')

  }

  ngOnInit(): void {
    this.getColumnDefs()
    this.getDefaultColDef()
    this.getMasterItems()
  }

  getMasterItems() {
    this._masterService.getMasterItems().subscribe({
      next: masterItems => {
        this._masterService.setMasterItems(masterItems)
      }
    })
  }

  onGridReady(params: any) {
    this.rowData = this._masterService.currentMasterItems
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

  handleUpdate($event: any) {
    this._masterService.updateMasterItem($event.data.id, $event.data).subscribe({
      next: () => { },
      error: () => {
        this._snackbarService.openSnackbar('Item could not be updated', 'ERROR')
      }
    })
  }

  handleDelete($event: any) {

    this.selected.map(item => {
      this._masterService.deleteMasterItem(item.id).subscribe(() =>
        this._masterService.getMasterItems().subscribe({
          next: () => {
            this.getMasterItems()
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
    return this.columnDefs = [
      {
        headerName: 'ID',
        field: 'id',
        minWidth: 100,
        maxWidth: 100,
        checkboxSelection: true,
        suppressMenu: true,
        filter: 'agNumberColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Item',
        field: 'item',
        minWidth: 250,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Purchase Unit',
        field: 'purchase_unit',
        filter: false,
      },
      {
        headerName: 'Manufacturer',
        field: 'manufacturer',
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
        headerName: 'Recent Vendor',
        field: 'recent_vendor',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Fisher CN',
        field: 'fisher_cn',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'VWR CN',
        field: 'vwr_cn',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Lab Source CN',
        field: 'lab_source_cn',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Next Advance CN',
        field: 'next_advance_cn',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Category',
        field: 'category',
        suppressMenu: true,
        filter: false,
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Average Unit Price',
        field: 'average_unit_price',
        filter: false,
        valueFormatter: function (params: any) {
          return params.data.average_unit_price = parseFloat(params.data.average_unit_price).toFixed(2)
        },
        valueSetter: (params: any) => {
          params.data.average_unit_price = Number(params.newValue)
        },
 
      },
      {
        headerName: 'Comments',
        field: 'comments',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Type',
        field: 'type',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: 'Group',
        field: 'group',
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      
    ]
  }

  getDefaultColDef() {
    return this.defaultColDef = {
      editable: true,
      resizable: true,
      sortable: true,
    }
  }
}