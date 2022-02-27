import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { map } from 'rxjs/operators';
import { IRequest } from 'src/inventory/departments/departments-models/request.model';
import { IInventory } from 'src/inventory/inventory.state';
import { ConfirmationDialogService } from 'src/inventory/shared/shared-components/dialog/confirmation-dialog/confirmation-dialog.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { AdminColumnsDefService } from '../../../admin-services/admin-columns-defs.service';
import { OfficeSupplyRequestViewStatusRendererComponent } from './office-supply-request-view-status-renderer/office-supply-request-view-status-renderer.component';
import { OfficeSupplyRequestViewService } from './office-supply-request-view.service';

@Component({
  selector: 'inventory-office-supply-request-view',
  templateUrl: './office-supply-request-view.component.html',
  styleUrls: ['./office-supply-request-view.component.scss']
})
export class OfficeSupplyRequestViewComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  isDeleteButtonDisabled: boolean = true;
  selected: IRequest[];
  searchValue: string;
  editText: string = 'Start Editing';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  frameworkComponents: any;
  context: any;

  constructor(
    private _officeSupplyRequestViewService: OfficeSupplyRequestViewService,
    private _updaterService: UpdaterService,
    private _adminColumnsDefService: AdminColumnsDefService,
    private _confirmationDialogService: ConfirmationDialogService,
    private _store: Store<IInventory>
  ) {
    this.frameworkComponents = { dropdownRenderer: OfficeSupplyRequestViewStatusRendererComponent }
  }

  ngOnInit(): void {
    this._updaterService.currentOfficeSupplyRequestUpdater.subscribe({
      next: () => this.getRequestViewtems()
    })
    this.getRequestViewtems()
    this.defaultColDef = this._adminColumnsDefService.getDefaultColDef()
    this.columnDefs = this._adminColumnsDefService.getColumnsDefs()
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit()
    this._store.select('search').subscribe((value) => {
      this.gridApi.setQuickFilter(value);
    })
  }

  getRequestViewtems(): void {
    this._officeSupplyRequestViewService.getRequestViewItems().pipe(map(requestViewItems => {
      return requestViewItems.filter(requestViewItem => requestViewItem.is_confirmed === true).map(requestViewItem => ({
        ...requestViewItem,
        item: requestViewItem.master.item,
        recent_cn: requestViewItem.master.recent_cn,

      }))
    })).subscribe((requestItems) => { this.rowData = requestItems })
  }

  download() {
    this.gridApi.exportDataAsCsv()
  }

  handleUpdate(params: any) {
    this._officeSupplyRequestViewService.updateRequestViewItem(params.data.id, params.data).subscribe(() => this.getRequestViewtems())
  }

  handleDelete() {
    this._confirmationDialogService.confirmationDialog("Would you like to delete selected items?").afterClosed().subscribe({
      next: res => {
        if (res === true) {
          this.selected.map(item => {
            this._officeSupplyRequestViewService.deleteRequestViewItem(item.id).subscribe(() => this.getRequestViewtems())
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
    this.isDeleteButtonDisabled = this.selected.length === 0
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


