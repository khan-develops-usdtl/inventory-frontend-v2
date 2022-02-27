import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { map } from 'rxjs/operators';
import { IRequest } from 'src/inventory/departments/departments-models/request.model';
import { IInventory } from 'src/inventory/inventory.state';
import { ConfirmationDialogService } from 'src/inventory/shared/shared-components/dialog/confirmation-dialog/confirmation-dialog.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { AdminColumnsDefService } from '../../../admin-services/admin-columns-defs.service';
import { StoreRoomRequestViewStatusRendererComponent } from './store-room-request-view-status-renderer/store-room-request-view-status-renderer.component';
import { StoreRoomRequestViewService } from './store-room-request-view.service';

@Component({
  selector: 'inventory-store-room-request-view',
  templateUrl: './store-room-request-view.component.html',
  styleUrls: ['./store-room-request-view.component.scss']
})
export class StoreRoomRequestViewComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  isDeleteButtonDisabled: boolean = true;
  selected: IRequest[];
  searchValue: string;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  frameworkComponents: any;
  context: any;

  constructor(
    private _storeRoomRequestViewService: StoreRoomRequestViewService,
    private _updaterService: UpdaterService,
    private _adminColumnsDefService: AdminColumnsDefService,
    private _confirmationDialogService: ConfirmationDialogService,
    private _store: Store<IInventory>
  ) {
    this.frameworkComponents = { dropdownRenderer: StoreRoomRequestViewStatusRendererComponent }
    this.context = { storeRoomRequestViewComponent: this }
  }

  ngOnInit(): void {
    this._updaterService.currentStoreRoomRequestItem.subscribe({
      next: (requestViewItem) => {
      }
    })
    this.getRequestViewtems()
    this.defaultColDef = this._adminColumnsDefService.getDefaultColDef()
    this.columnDefs = this._adminColumnsDefService.getColumnsDefs()
  }

  download() {
    this.gridApi.exportDataAsCsv()
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    this._store.select('search').subscribe((value) => {
      this.gridApi.setQuickFilter(value);
    })
  }

  getRequestViewtems(): void {
    this._storeRoomRequestViewService.getRequestViewItems().pipe(map(requestViewItems => {
      return requestViewItems.filter(requestViewItem => requestViewItem.is_confirmed === true).map(requestViewItem => ({
        ...requestViewItem,
        item: requestViewItem.master.item,
        recent_cn: requestViewItem.master.recent_cn,
      }))
    })).subscribe((requestItems) => { 
      this.rowData = requestItems })
  }

  handleUpdate(params: any) {
    const data = {...params.data, time_updated: new Date()}
    this._storeRoomRequestViewService.updateRequestViewItem(params.data.id, data).subscribe(() => this.getRequestViewtems())
  }

  handleDelete() {
    this._confirmationDialogService.confirmationDialog("Would you like to delete selected items?").afterClosed().subscribe({
      next: res => {
        if (res === true) {
          this.selected.map(item => {
            this._storeRoomRequestViewService.deleteRequestViewItem(item.id).subscribe(() => this.getRequestViewtems())
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

  handleSearch(value: string) {
    this.gridApi.setQuickFilter(value);
  }

  onSearchClear() {
    this.searchValue = ''
  }
}


