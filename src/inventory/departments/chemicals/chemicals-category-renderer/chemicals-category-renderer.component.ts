import { Component } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IMaster } from 'src/inventory/admin/master/master.model';
import { MasterService } from 'src/inventory/admin/master/master.service';
import { UpdaterService } from 'src/inventory/shared/shared-services/updater.service';


@Component({
  selector: 'inventory-chemicals-category-renderer',
  templateUrl: './chemicals-category-renderer.component.html',
  styleUrls: ['./chemicals-category-renderer.component.scss']
})
export class ChemicalsCategoryRendererComponent implements  AgRendererComponent, ICellRendererAngularComp {
  categories: string[] = ['Item', 'Recent CN', 'Location', 'Quantity', 'CAS#', 'Physical State', 'Container Size', 'Health HZ', 'Fire HZ', 'Reactivity', 'Specific HZ']
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
        this._updaterService.setQualityUpdater(true)
      },
      error: error => error
    })
  }
}

