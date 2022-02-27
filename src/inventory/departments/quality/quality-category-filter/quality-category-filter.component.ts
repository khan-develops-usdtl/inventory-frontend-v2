
import { Component } from '@angular/core';
import { AgFrameworkComponent, } from 'ag-grid-angular';
import { IFloatingFilter, IFloatingFilterParams, NumberFilter, TextFilterModel } from 'ag-grid-community';
import { QualityService } from '../quality.service';

export interface FloatingFilterComponentParams extends IFloatingFilterParams {
  value: string;
}

@Component({
  selector: 'inventory-quality-category-filter',
  templateUrl: './quality-category-filter.component.html',
  styleUrls: ['./quality-category-filter.component.scss']
})
export class QualityCategoryFilterComponent implements  IFloatingFilter, AgFrameworkComponent<FloatingFilterComponentParams> {
  categories: string[] = ['all']
  selected: string
  params: FloatingFilterComponentParams;

  constructor(
    private _qualityService: QualityService
  ) { }

  agInit(params: any): void {
    this._qualityService.getItems().subscribe(totalItems => {
      totalItems.map(totalItem => {
        if(totalItem.master.category && this.categories.indexOf(totalItem.master.category) < 0 ) {
          this.categories.push(totalItem.master.category)
        }
      })
    }
    )
    this.params = params;
    this.selected = 'all'
  }

  valueChanged() {
    let valueToUse = this.selected === 'all' ? null : this.selected
    this.params.parentFilterInstance(function (instance) {
      (<NumberFilter>instance).onFloatingFilterChanged(
        'greaterThan',
        valueToUse
      );
    });
  }

  onParentModelChanged(parentModel: TextFilterModel): void {
    if (!parentModel) {
      this.selected = 'all';
    } else {
      this.selected = parentModel.filter;
    }
  }
}
