import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { SnackbarService } from 'src/inventory/shared/shared-components/snackbar/snackbar.service';
import { DepartmentsColumnsDefsService } from '../../departments-services/departments-columns-defs.service';
import { UpdaterService } from '../../../shared/shared-services/updater.service';
import { QualityService } from '../quality.service';
import { AuthService } from 'src/inventory/auth/auth.service';
import { AdminDepartmentColumnsDefsService } from '../../departments-services/admin-columns-defs.service';
import { QualityExpirationRendererComponent } from '../quality-expiration-renderer/quality-expiration-renderer.component';
import { QualityReceivedRendererComponent } from '../quality-received-renderer/quality-received-renderer.component';

@Component({
  selector: 'inventory-quality-details',
  templateUrl: './quality-details.component.html',
  styleUrls: ['./quality-details.component.scss']
})
export class QualityDetailsComponent implements OnInit {
  user = 'admin'

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  rowData: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  context: any;
  frameworkComponents: any;

  constructor(
    private _authService: AuthService,
    private _updaterService: UpdaterService,
    private _departmentsColumnsDefsService: DepartmentsColumnsDefsService,
    private _adminColumnsDefsService: AdminDepartmentColumnsDefsService,
    private _snackbarService: SnackbarService,
    private _qualityService: QualityService,
    private _dialog: MatDialogRef<QualityDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public rowItem: any,
  ) { 
    this.context = { qualityDetails: this }
    this.frameworkComponents = {
      expirationRenderer: QualityExpirationRendererComponent,
      receivedRenderer: QualityReceivedRendererComponent
     }
  }

  ngOnInit(): void {
    if(this._authService.isLoggedIn() && this._authService.currentUser().group === 'inventory_admin') {
      this.columnDefs = this._adminColumnsDefsService.getAdminDetailsColumnsDefs()
    } else {
      this.columnDefs = this._departmentsColumnsDefsService.getDepartmentsDetailsColumnsDefs()
    }
    this.defaultColDef = this._departmentsColumnsDefsService.getDepartmentsDetailsDefaultColDef()


    this.getItemsByMasterId(this.rowItem.item_id)
  }

  handleUpdate(event: any) {
    this._qualityService.updateItem(event.data.id, event.data, this._authService.currentUser()).subscribe({
      next: (item) => {
        this._updaterService.setQualityUpdater(true)
        this.getItemsByMasterId(this.rowItem.item_id)
        this._qualityService.getTotalItem(item.item_id).subscribe({
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
    this._qualityService.getItemsByMasterId(id).subscribe({
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
