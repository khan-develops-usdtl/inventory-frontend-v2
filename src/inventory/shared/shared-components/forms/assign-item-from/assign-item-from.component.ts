import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IMaster } from 'src/inventory/admin/master/master.model';
import { MasterService } from 'src/inventory/admin/master/master.service';
import { IInventory } from 'src/inventory/inventory.state';
import { clearSearch } from 'src/inventory/shared/store/search/search.actions';
import { SnackbarService } from '../../snackbar/snackbar.service';

@Component({
  selector: 'inventory-assign-item-from',
  templateUrl: './assign-item-from.component.html',
  styleUrls: ['./assign-item-from.component.scss']
})
export class AssignItemFromComponent implements OnInit {
  assignItemForm: FormGroup
  all: boolean = false
  departments = [
    { name: "Extractions", value: "extractions", checked: false },
    { name: "Mass Spec", value: "mass_spec", checked: false },
    { name: "Receiving", value: "receiving", checked: false },
    { name: "Screening", value: "screening", checked: false },
    { name: "Quality", value: "quality", checked: false },
    { name: "StoreRoom", value: "store_room", checked: false },
    { name: "R&D", value: "rd", checked: false },
    { name: "Shipping", value: "shipping", checked: false },
    { name: "General", value: "general", checked: false },
    { name: "Office Supply", value: "office_supply", checked: false },
    { name: "Breakroom", value: "breakroom", checked: false },
    { name: "Chemicals", value: "chemicals", checked: false },

  ]

  constructor(
    private _store: Store<IInventory>,
    private _masterService: MasterService,
    private _dialog: MatDialogRef<AssignItemFromComponent>,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public selected: IMaster[],
    private _snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.assignItemForm = this._fb.group({
      checkArray: this._fb.array([], [Validators.required])
    })
  }

  handleSelectChange($event: any) {
    const checkArray: FormArray = this.assignItemForm.get('checkArray') as FormArray
    if ($event.checked) {
      checkArray.push(new FormControl($event.source.value))
    } else {
      const idx = checkArray.controls.findIndex(e => (e.value === $event.source.value))
      checkArray.removeAt(idx)
    }
  }

  handleSelectAll($event: any) {
    const checkArray: FormArray = this.assignItemForm.get('checkArray') as FormArray
    checkArray.clear()
    this.departments.map(department => {
      department.checked = false
    })
    if ($event.checked) {
      this.departments.map(department => {
        checkArray.push(new FormControl(department.value))
        department.checked = true
      })
    } else {
      checkArray.clear()
      this.departments.map(department => {
        department.checked = false
      })
    }
  }

  onClose() {
    this._dialog.close()
  }

  onSubmit() {
    this.selected.map(async masterItem => {
       this._masterService.assigItem(masterItem.id, this.assignItemForm.value.checkArray).subscribe({
        next: () => {
          this._snackbarService.openSnackbar("Item(s) assigned successfully", "SUCCESS")
         },
         error: () => {
          this._snackbarService.openSnackbar("Item(s) could not be assigned", "ERROR")
         },
         complete: () => {
            this._store.dispatch(clearSearch())
         }
      })
    })
    this._dialog.close()
  }
}
