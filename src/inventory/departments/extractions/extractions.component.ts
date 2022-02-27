import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { IInventory } from 'src/inventory/inventory.state';
import { ExtractionsService } from './extractions.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IDepartment } from '../departments-models/departments.model';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { SnackbarService } from 'src/inventory/shared/shared-components/snackbar/snackbar.service';
import { DepartmentsColumnsDefsService } from '../departments-services/departments-columns-defs.service';
import { ExtractionsCategoryFilterComponent } from './extractions-category-filter/extractions-category-filter.component';
import { BottomToolbarService } from 'src/inventory/shared/shared-components/navbar/bottom-toolbar/bottom-toolbar.service';
import { ExtractionsCategoryRendererComponent } from './extractions-category-renderer/extractions-category-renderer.component';
import { ExtractionsQuantityRendererComponent } from './extractions-quantity-renderer/extractions-quantity-renderer.component';
import { AdminDepartmentColumnsDefsService } from '../departments-services/admin-columns-defs.service';
import { AuthService } from 'src/inventory/auth/auth.service';

@Component({
  selector: 'inventory-extractions',
  templateUrl: './extractions.component.html',
  styleUrls: ['./extractions.component.scss']
})
export class ExtractionsComponent implements OnInit {
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
    private _extractionsService: ExtractionsService,
    private _bottomToolbarService: BottomToolbarService,
    private _departmentsColumnsDefsService: DepartmentsColumnsDefsService,
    private _adminColumnsDefsService: AdminDepartmentColumnsDefsService,
    private _authService: AuthService
  ) {
    this.frameworkComponents = {
      quantityRenderer: ExtractionsQuantityRendererComponent,
      categoryRenderer: ExtractionsCategoryRendererComponent,
      categoryFilter: ExtractionsCategoryFilterComponent,
    }
    this.context = { extractionComponent: this }
  }

  ngOnInit(): void {
    this._updaterService.currentExtractionsUpdater.subscribe({
      next: () => {
        this.getExtractionsTotal()
      }
    })
    if(this._authService.currentUser().group === 'inventory_admin') {
      this.columnDefs = this._adminColumnsDefsService.getAdminDepartmentsColumnsDefs()
      this.defaultColDef = this._adminColumnsDefsService.getAdminDepartmentsDefaultColDef()
    } else {
      this.columnDefs = this._departmentsColumnsDefsService.getDepartmentsColumnsDefs()
      this.defaultColDef = this._departmentsColumnsDefsService.getDepartmentsDefaultColDef()
    }

    this.getExtractionsTotal()
  }

  getExtractionsTotal() {
    this.rowData = this._extractionsService.getTotalItems()
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

  handleDelete($event: any) {
    this.selected.map(item => {
      this._extractionsService.deleteExtractionItem(item.id).subscribe(() =>
        this._extractionsService.getItems().subscribe({
          next: () => {
            this.getExtractionsTotal()
            this.selected = []
          }
        })
      )
    })
  }

  download() {
    this.gridApi.exportDataAsCsv()
  }

  send() {
    this._extractionsService.sendEmailReport().subscribe({
      next: () => this._snackbarService.openSnackbar('Email has been sent', 'SUCCESS'),
      error: () => this._snackbarService.openSnackbar('Email has not been sent', 'ERROR')
    })
  }
}
