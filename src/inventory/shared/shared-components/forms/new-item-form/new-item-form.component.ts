import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MasterService } from 'src/inventory/admin/master/master.service';
import { SnackbarService } from '../../snackbar/snackbar.service';

@Component({
  selector: 'inventory-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.scss']
})
export class NewItemFormComponent implements OnInit{
  newItemForm: FormGroup
  all: boolean = false
  categories = [
    {name: 'GC', value: 'gc'}, 
    {name: 'LC', value: 'lc'}, 
    {name: 'Columns', value: 'columns'}, 
    {name: 'General', value: 'general'}, 
    {name: 'Gases', value: 'gases'}, 
    {name: 'Solvetns', value: 'solvents'}, 
    {name: 'LDTD', value: 'ldtd'}, 
    {name: 'Sciex', value: 'sciex'}, 
    {name: 'Breakroom', value: 'breakroom'}, 
    {name: 'Office Supply', value: 'office_supply'}, 
    {name: 'Chemicals', value : 'chemicals'}

  ]
  departments = [
    {name: 'Extractions', value: 'extractions'},
    {name: 'Mass Spec', value: 'mass_spec'},
    {name: 'Receiving', value: 'receiving'},
    {name: 'Screening', value: 'screening'},
    {name: 'Quality', value: 'quality'},
    {name: 'Store Room', value: 'store_room'},
    {name: 'R&D', value: 'rd'},
    {name: 'Shipping', value: 'shipping'},
    {name: 'General', value: 'general'},
    {name: 'Office Supply', value: 'office_supply'},
    {name: 'Breakroom', value: 'breakroom'},
    {name: 'Chemicals', value:'chemicals'}
  ]

  constructor(
    private _snackbarService: SnackbarService,
    private fb: FormBuilder,
    private _dialog: MatDialogRef<NewItemFormComponent>,
    private _masterService: MasterService
  ) {
    this.newItemForm = this.fb.group({
      item: [null, Validators.required],
      purchase_unit: [null, Validators.required],
      part_number: [null, Validators.required],
      recent_cn: [null, Validators.required],
      recent_vendor: [null, Validators.required],
      fisher_cn: [null, Validators.required],
      vwr_cn: [null, Validators.required],
      next_advance_cn: [null, Validators.required],
      lab_source_cn: [null, Validators.required],
      average_unit_price: 0.0,
      manufacturer: null,
      category: null,
      comments: null,
      type: null,
      group: null,
      extractions: false,
      mass_spec: false,
      receiving: false,
      screening: false,
      quality: false,
      store_room: false,
      rd: false,
      shipping: false,
      department_request: false,
      office_supply: false,
      breakroom: false,
      chemicals: false,
    })
  }

  ngOnInit(): void {
  }

  handleSelectAll($event: any) {
    if($event.checked) {
      this.newItemForm.controls['extractions'].setValue(true)
      this.newItemForm.controls['mass_spec'].setValue(true)
      this.newItemForm.controls['receiving'].setValue(true)
      this.newItemForm.controls['screening'].setValue(true)
      this.newItemForm.controls['quality'].setValue(true)
      this.newItemForm.controls['store_room'].setValue(true)
      this.newItemForm.controls['rd'].setValue(true)
      this.newItemForm.controls['shipping'].setValue(true)
      this.newItemForm.controls['general'].setValue(true)
      this.newItemForm.controls['office_supply'].setValue(true)
      this.newItemForm.controls['chemicals'].setValue(true)

    } else {
      this.newItemForm.controls['extractions'].setValue(false)
      this.newItemForm.controls['mass_spec'].setValue(false)
      this.newItemForm.controls['receiving'].setValue(false)
      this.newItemForm.controls['screening'].setValue(false)
      this.newItemForm.controls['quality'].setValue(false)
      this.newItemForm.controls['store_room'].setValue(false)
      this.newItemForm.controls['rd'].setValue(false)
      this.newItemForm.controls['shipping'].setValue(false)
      this.newItemForm.controls['general'].setValue(false)
      this.newItemForm.controls['office_supply'].setValue(false)
      this.newItemForm.controls['chemicals'].setValue(false)
    }
  }

  getErrorMessage() {
    return 'This field is required';
  }

  onSubmit() {
    this._masterService.createMasterItem(this.newItemForm.value).subscribe({
      next: () => {
        this._masterService.getMasterItems().subscribe({
          next: masterItems => {
            this._masterService.setMasterItems(masterItems)
          }
        })
        this._snackbarService.openSnackbar('Item successfully created', 'SUCCESS')
      },
      error: () => {
        this._snackbarService.openSnackbar('Item could not be created', 'ERROR')
      }
    })
    this._dialog.close()
  }

  onClose() {
    this._dialog.close()
  }

  onClear() {
    this.newItemForm.reset();
  }
}
