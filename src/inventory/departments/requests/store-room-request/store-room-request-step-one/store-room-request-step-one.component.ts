import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { map } from 'rxjs/operators';
import { DepartmentsColumnsDefsService } from 'src/inventory/departments/departments-services/departments-columns-defs.service';
import { IInventory } from 'src/inventory/inventory.state';
import { RequestFormComponent } from 'src/inventory/shared/shared-components/forms/request-form/request-form.component';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { IRequest } from '../../../departments-models/request.model';
import { StoreRoomRequestService } from '../store-room-request.service';

@Component({
  selector: 'inventory-store-room-request-step-one',
  templateUrl: './store-room-request-step-one.component.html',
  styleUrls: ['./store-room-request-step-one.component.scss']
})
export class StoreRoomRequestStepOneComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  isSendButtonDisabled: boolean = true
  isConfirmButtonDisabled: boolean = true
  selected: IRequest[]
  searchValue: string;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  context: any;
  confirmationSelectedItems: any;
  confirmationData: any

  constructor(
    private dialog: MatDialog,
    private _storeRoomRequestService: StoreRoomRequestService,
    private _departmentsColumnsDefsService: DepartmentsColumnsDefsService,
    private _updaterService: UpdaterService,
    private _store: Store<IInventory>
  ) { }

  ngOnInit(): void {
    this.getRequestItems()
    this.defaultColDef = this._departmentsColumnsDefsService.getRequestDefaultColDef()
    this.columnDefs = this._departmentsColumnsDefsService.getRequestColumnDefs()
  }

  getRequestItems(): void {
    this.rowData = this._storeRoomRequestService.getStoreRoomItems().pipe(map(storeRoomItems => {
      return storeRoomItems.map(storeRoomItem => ({
        ...storeRoomItem,
        item: storeRoomItem.master.item,
        purchase_unit: storeRoomItem.master.purchase_unit,
        part_number: storeRoomItem.master.part_number,
        recent_cn: storeRoomItem.master.recent_cn,
        comments: storeRoomItem.master.comments,
        category: storeRoomItem.master.category
      }))
    }))
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selected = selectedNodes.map(node => node.data)
    this.selected = selected
    this.isSendButtonDisabled = selected.length === 0
  }

  handleSendRequest() {
    this.openDialog()
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.selected
    this.dialog.open(RequestFormComponent, dialogConfig).afterClosed().subscribe(() => {
      this.gridApi.deselectAll()
      this._updaterService.setStoreRoomRequestUpdater(true)
    })
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    this._store.select('search').subscribe((value) => {
      this.gridApi.setQuickFilter(value);
    })
  }

  handleSearch(value: string) {
    this.gridApi.setQuickFilter(value);
  }

  handleClearSearch() {
    this.searchValue = ''
    this.handleSearch(this.searchValue)
  }

}

