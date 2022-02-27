import { Component } from '@angular/core';
import { AgFrameworkComponent, } from 'ag-grid-angular';
import { IFloatingFilter, IFloatingFilterParams, NumberFilter, TextFilterModel } from 'ag-grid-community';
import { ExtractionsService } from '../extractions.service';

export interface FloatingFilterComponentParams extends IFloatingFilterParams {
  value: string;
}

@Component({
  selector: 'inventory-extractions-category-filter',
  templateUrl: './extractions-category-filter.component.html',
  styleUrls: ['./extractions-category-filter.component.scss']
})
export class ExtractionsCategoryFilterComponent implements IFloatingFilter, AgFrameworkComponent<FloatingFilterComponentParams> {
  categories: string[] = ['all']
  selected: string
  params: FloatingFilterComponentParams;

  constructor(
    private _extractionsService: ExtractionsService
  ) { }

  agInit(params: any): void {
    this._extractionsService.getTotalItems().subscribe(totalItems => {
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
