import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { map } from 'rxjs/operators';
import { IRequest } from 'src/inventory/departments/departments-models/request.model';
import { GeneralRequestService } from 'src/inventory/departments/requests/general-request/general-request.service';
import { IInventory } from 'src/inventory/inventory.state';
import { ConfirmationDialogService } from 'src/inventory/shared/shared-components/dialog/confirmation-dialog/confirmation-dialog.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { AdminColumnsDefService } from '../../../admin-services/admin-columns-defs.service';
import { GeneralRequestViewStatusRendererComponent } from './general-request-view-status-renderer/general-request-view-status-renderer.component';
import { GeneralRequestViewService } from './general-request-view.service';

@Component({
  selector: 'inventory-general-request-view',
  templateUrl: './general-request-view.component.html',
  styleUrls: ['./general-request-view.component.scss']
})
export class GeneralRequestViewComponent implements OnInit {
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
    private _generalRequestViewService: GeneralRequestViewService,
    private _generalRequestService: GeneralRequestService,
    private _updaterService: UpdaterService,
    private _adminColumnsDefService: AdminColumnsDefService,
    private _confirmationDialogService: ConfirmationDialogService,
    private _store: Store<IInventory>
  ) {
    this.frameworkComponents = { dropdownRenderer: GeneralRequestViewStatusRendererComponent }
    this.context = { generalRequestViewComponent: this }
  }

  ngOnInit(): void {
    this._updaterService.currentGeneralRequestUpdater.subscribe({
      next: () => this.getRequestIViewtems()
    })
    this.getRequestIViewtems()
    this.defaultColDef = this._adminColumnsDefService.getDefaultColDef()
    this.columnDefs = this._adminColumnsDefService.getColumnsDefs()
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    this._store.select('search').subscribe((value) => {
      this.gridApi.setQuickFilter(value);
    })
  }

  getRequestIViewtems(): void {
    this._generalRequestViewService.getRequestViewItems().pipe(map(requestViewItems => {
      return requestViewItems.filter(requestViewItem => requestViewItem.is_confirmed === true).map(requestViewItem => ({
        ...requestViewItem,
        item: requestViewItem.master.item,
        recent_cn: requestViewItem.master.recent_cn,
      }))
    })).subscribe((requestItems) => { this.rowData = requestItems })
  }

  handleUpdate(params: any) {
    const data = {...params.data, time_updated: new Date()}
    this._generalRequestViewService.updateRequestViewItem(params.data.id, data).subscribe(() => this.getRequestIViewtems())
  }

  download() {
    this.gridApi.exportDataAsCsv()
  }

  handleDelete() {
    this._confirmationDialogService.confirmationDialog("Would you like to delete selected items?").afterClosed().subscribe({
      next: res => {
        if (res === true) {
          this.selected.map(item => {
            this._generalRequestService.deleteGeneralRequestItem(item.id).subscribe(() => this.getRequestIViewtems())
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


