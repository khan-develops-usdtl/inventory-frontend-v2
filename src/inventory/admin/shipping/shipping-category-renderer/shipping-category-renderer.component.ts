import { Component } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IMaster } from 'src/inventory/admin/master/master.model';
import { MasterService } from 'src/inventory/admin/master/master.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';
import { IDepartment } from '../../../departments/departments-models/departments.model';

@Component({
  selector: 'inventory-shipping-category-renderer',
  templateUrl: './shipping-category-renderer.component.html',
  styleUrls: ['./shipping-category-renderer.component.scss']
})
export class ShippingCategoryRendererComponent implements  AgRendererComponent, ICellRendererAngularComp {
  categories: string[] = ['GC', 'LC', 'Columns', 'General', 'Gases', 'Solvents', 'LDTD', 'Sciex', 'Break Room', 'Office Supply']
  rowItem: IMaster;
  cellValue: string;
  params: ICellRendererParams;

  constructor(
    private _updaterService: UpdaterService,
    private _masterService: MasterService
  ) { }

  agInit(params: ICellRendererParams): void {
    this.params = params
    this.rowItem = params.node.data.master
    this.cellValue = this.getValueToDisplay(params)
  }

  refresh(params: ICellRendererParams): any {
    this.cellValue = this.getValueToDisplay(params)
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
  updateCategory(category: string) {
    const masterItem = {...this.rowItem, category: category}
    this._masterService.updateMasterItem(masterItem.id, masterItem).subscribe({
      next: masterItem => {
        this.cellValue = masterItem.category
        this._updaterService.setShippingUpdater(true)
      },
      error: error => error
    })
  }
}
