import { AgGridAngular } from 'ag-grid-angular';
import { ExtractionsService } from '../extractions.service';
import { AuthService } from 'src/inventory/auth/auth.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdaterService } from '../../../shared/shared-services/updater.service';
import { SnackbarService } from 'src/inventory/shared/shared-components/snackbar/snackbar.service';
import { DepartmentsColumnsDefsService } from '../../departments-services/departments-columns-defs.service';
import { ExtractionsExpirationRendererComponent } from '../extractions-expiration-renderer/extractions-expiration-renderer.component';
import { ExtractionsReceivedRendererComponent } from '../extractions-received-renderer/extractions-received-renderer.component';
import { AdminDepartmentColumnsDefsService } from '../../departments-services/admin-columns-defs.service';

@Component({
  selector: 'inventory-extractions-details',
  templateUrl: './extractions-details.component.html',
  styleUrls: ['./extractions-details.component.scss']
})
export class ExtractionsDetailsComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  rowData: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  total: number;
  frameworkComponents: any;
  context: any;

  constructor(
    private _authService: AuthService,
    private _updaterService: UpdaterService,
    private _departmentsColumnsDefsService: DepartmentsColumnsDefsService,
    private _adminColumnsDefsService: AdminDepartmentColumnsDefsService,
    private _snackbarService: SnackbarService,
    private _extractionsService: ExtractionsService,
    private _dialog: MatDialogRef<ExtractionsDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public rowItem: any,
  ) {
    this.frameworkComponents = {
      expirationRenderer: ExtractionsExpirationRendererComponent,
      receivedRenderer: ExtractionsReceivedRendererComponent
    }
    this.context = { extractionDetails: this }
  }

  ngOnInit(): void {
    if (this._authService.isLoggedIn() && this._authService.currentUser().group === 'inventory_admin') {
      this.columnDefs = this._adminColumnsDefsService.getAdminDetailsColumnsDefs()
    } else {
      this.columnDefs = this._departmentsColumnsDefsService.getDepartmentsDetailsColumnsDefs()
    }
    this.defaultColDef = this._departmentsColumnsDefsService.getDepartmentsDetailsDefaultColDef()
    this.getItemsByMasterId(this.rowItem.item_id)
  }

  handleUpdate(event: any) {
    this._extractionsService.updateItem(event.data.id, event.data, this._authService.currentUser()).subscribe({
      next: (item) => {
        this._updaterService.setExtractionsUpdater(true)
        this.getItemsByMasterId(this.rowItem.item_id)
        this._extractionsService.getTotalItem(item.item_id).subscribe({
          next: totalItem => {
            this.rowItem.quantity = totalItem.quantity
          }
        })
      },
      error: () => {
        this._snackbarService.openSnackbar('Item could not be updated', 'ERROR')
      }
    })
  }

  getItemsByMasterId(id: number) {
    this._extractionsService.getItemsByMasterId(id).subscribe({
      next: items => {
        this.rowData = items
      }
    })
  }

  onClose() {
    this._dialog.close()
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit()
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
}
