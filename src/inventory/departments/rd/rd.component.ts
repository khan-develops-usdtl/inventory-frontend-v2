import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { AuthService } from 'src/inventory/auth/auth.service';
import { IInventory } from 'src/inventory/inventory.state';
import { BottomToolbarService } from 'src/inventory/shared/shared-components/navbar/bottom-toolbar/bottom-toolbar.service';
import { SnackbarService } from 'src/inventory/shared/shared-components/snackbar/snackbar.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { IDepartment } from '../departments-models/departments.model';
import { AdminDepartmentColumnsDefsService } from '../departments-services/admin-columns-defs.service';
import { DepartmentsColumnsDefsService } from '../departments-services/departments-columns-defs.service';
import { RdCategoryFilterComponent } from './rd-category-filter/rd-category-filter.component';
import { RdCategoryRendererComponent } from './rd-category-renderer/rd-category-renderer.component';
import { RdQuantityRendererComponent } from './rd-quantity-renderer/rd-quantity-renderer.component';
import { RdService } from './rd.service';



@Component({
  selector: 'inventory-rd',
  templateUrl: './rd.component.html',
  styleUrls: ['./rd.component.scss']
})
export class RdComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular | undefined;
  selected: IDepartment[]
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
    private _updaterService: UpdaterService,
    private _rdService: RdService,
    private _bottomToolbarService: BottomToolbarService,
    private _departmentsColumnsDefsService: DepartmentsColumnsDefsService,
    private _adminColumnsDefsService: AdminDepartmentColumnsDefsService,
    private _authService: AuthService
  ) {
    this.frameworkComponents = {
      quantityRenderer: RdQuantityRendererComponent,
      categoryRenderer: RdCategoryRendererComponent,
      categoryFilter: RdCategoryFilterComponent,
    }
    this.context = { extractionComponent: this }
  }

  ngOnInit(): void {
    this._updaterService.currentRdUpdater.subscribe({
      next: () => {
        this.getTotal()
      }
    })
    if(this._authService.currentUser().group === 'inventory_admin') {
      this.columnDefs = this._adminColumnsDefsService.getAdminDepartmentsColumnsDefs()
      this.defaultColDef = this._adminColumnsDefsService.getAdminDepartmentsDefaultColDef()
    } else {
      this.columnDefs = this._departmentsColumnsDefsService.getDepartmentsColumnsDefs()
      this.defaultColDef = this._departmentsColumnsDefsService.getDepartmentsDefaultColDef()
    }
    this.getTotal()
  }

  getTotal() {
    this.rowData = this._rdService.getTotalItems()
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
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
    this._rdService.sendEmailReport().subscribe({
      next: () => this._snackbarService.openSnackbar('Email has been sent', 'SUCCESS'),
      error: () => this._snackbarService.openSnackbar('Email has not been sent', 'ERROR')
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

  handleDelete($event: any) {
    this.selected.map(item => {
      this._rdService.deleteItem(item.id).subscribe(() =>
        this._rdService.getItems().subscribe({
          next: () => {
            this.getTotal()
            this.selected = []
            this._bottomToolbarService.setIsDeleteButtonDisabled(this.selected.length === 0)
          }
        })
      )
    })
  }

  autoSizeAll() {
    var allColumnIds: any[] = [];
    this.gridColumnApi.getAllColumns().forEach(function (column: { colId: any; }) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, false);
  }
}





