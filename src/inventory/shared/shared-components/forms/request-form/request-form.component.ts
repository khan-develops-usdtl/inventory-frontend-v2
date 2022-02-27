import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/inventory/auth/auth.service';
import { IRequest } from 'src/inventory/departments/departments-models/request.model';
import { GeneralRequestService } from 'src/inventory/departments/requests/general-request/general-request.service';
import { OfficeSupplyRequestService } from 'src/inventory/departments/requests/office-supply-request/office-supply-request.service';
import { StoreRoomRequestService } from 'src/inventory/departments/requests/store-room-request/store-room-request.service';

export interface Requests {
  item_id: number;
  quantity: number;
}

@Component({
  selector: 'inventory-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {
  requestForm: FormGroup
  itemLength: number = 0

  constructor(
    private _authService: AuthService,
    private _generalRequestService: GeneralRequestService,
    private _storeRoomRequestService: StoreRoomRequestService,
    private _officeSupplyRequestService: OfficeSupplyRequestService,
    private _router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<RequestFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public selected: IRequest[]
  ) { }
  ngOnInit(): void {
    this.initForm()
    this.requestForm.value.requests.map((request: any) => {
      if(request.item.length > this.itemLength) {
        this.itemLength = request.item.length
      }
    })
  }

  initForm() {
    const requests = new FormArray([])
    this.selected.map(request => {
      requests.push(
        new FormGroup({
          user: new FormControl(this._authService.currentUser().fullName),
          department: new FormControl(this._authService.currentUser().department),
          status: new FormControl('pending'),
          item_id: new FormControl(request.item_id),
          item: new FormControl(request.master.item),
          quantity: new FormControl(null, Validators.required),
          custom_text: new FormControl(null),
          is_confirmed: new FormControl(false),
          location: new FormControl(request.location)
        })
      )
    })
    this.requestForm = this.formBuilder.group({
      requests: requests
    })
    
  }

  getControls() {
    return (this.requestForm.get('requests') as FormArray).controls;
  }

  onSubmit() {
    if(this._router.url === "/general-request") {
      this.requestForm.value.requests.map((requestItem: IRequest) =>
        this._generalRequestService.createGeneralRequestItem(requestItem).subscribe({
          next: res => { }
        })
      )
    }
    if(this._router.url === "/store-room-request") {
      this.requestForm.value.requests.map((requestItem: IRequest) =>
        this._storeRoomRequestService.createStoreRoomRequestItem(requestItem).subscribe({
          next: res => { }
        })
      )
    }
    if(this._router.url === "/office-supply-request") {
      this.requestForm.value.requests.map((requestItem: IRequest) =>
        this._officeSupplyRequestService.createOfficeSupplyRequesttem(requestItem).subscribe({
          next: res => { }
        })
      )
    }
    this.dialog.close()
  }

  onClose() {
    this.dialog.close()
  }
}

