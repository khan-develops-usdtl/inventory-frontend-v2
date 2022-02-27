import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationStart, Router, Event } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IMaster } from 'src/inventory/admin/master/master.model';
import { ShippingService } from 'src/inventory/admin/shipping/shipping.service';
import { IStoreRoom } from 'src/inventory/admin/store-room/store-room.model';
import { StoreRoomService } from 'src/inventory/admin/store-room/store-room.service';
import { AuthService } from 'src/inventory/auth/auth.service';
import { IDepartment } from 'src/inventory/departments/departments-models/departments.model';
import { ExtractionsService } from 'src/inventory/departments/extractions/extractions.service';
import { MassSpecService } from 'src/inventory/departments/mass-spec/mass-spec.service';
import { QualityService } from 'src/inventory/departments/quality/quality.service';
import { RdService } from 'src/inventory/departments/rd/rd.service';
import { ReceivingService } from 'src/inventory/departments/receiving/receiving.service';
import { ScreeningService } from 'src/inventory/departments/screening/screening.service';
import { IInventory } from 'src/inventory/inventory.state';
import { clearSearch } from 'src/inventory/shared/store/search/search.actions';
import { AssignItemFromComponent } from '../../forms/assign-item-from/assign-item-from.component';
import { NewItemFormComponent } from '../../forms/new-item-form/new-item-form.component';
import { BottomToolbarService } from './bottom-toolbar.service';
import { ChemicalsService } from 'src/inventory/departments/chemicals/chemicals.service';


@Component({
  selector: 'inventory-bottom-toolbar',
  templateUrl: './bottom-toolbar.component.html',
  styleUrls: ['./bottom-toolbar.component.scss']
})
export class BottomToolbarComponent implements OnInit {
  @Output() deleteEvent = new EventEmitter<boolean>(true)
  @Output() downloadEvent = new EventEmitter<boolean>(true)
  @Output() sendEvent = new EventEmitter<boolean>(true)
  @Output() downloadPDFEvent = new EventEmitter<boolean>(true)
  @Input() selected: IMaster[] | IStoreRoom[] | IDepartment[]

  grandTotal$: Observable<number> = this._bottomToolbarService.currentGrandTotal
  isGrandTotalVisible: boolean = true
  isPdfButtonVisible: boolean = false

  isDeleteButtonDisabled$: Observable<boolean> = this._bottomToolbarService.currentIsDeleteButtonDisabled
  isAssignToDisabled$: Observable<boolean> = this._bottomToolbarService.currentIsAssignToDisabled
  isExpanded: boolean
  addAssingIconsVisible: boolean
  isDeleteButtonVisible: boolean
  isExpandButtonVisible: boolean
  isDownloadButtonVisible: boolean;
  isSendButtonVisible: boolean;

  constructor(
    private _authService: AuthService,
    public dialog: MatDialog,
    private _router: Router,
    private _bottomToolbarService: BottomToolbarService,
    private _storeRoomService: StoreRoomService,
    private _shippingService: ShippingService,
    private _extractionsService: ExtractionsService,
    private _massSpecService: MassSpecService,
    private _receivingService: ReceivingService,
    private _rdService: RdService,
    private _screeningService: ScreeningService,
    private _qualityService: QualityService,
    private _store: Store<IInventory>,
    private _chemicalsService: ChemicalsService
  ) { }

  ngOnInit(): void {
    this._bottomToolbarService.currentIsExpanded.subscribe({
      next: value => {
        this.isExpanded = value
      }
    })

    this._router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: Event) => {
      this._bottomToolbarService.setIsDeleteButtonDisabled(true)
      this._bottomToolbarService.setIsExpanded(false)
    });

    if (this._router.url === '/master') {
      this.addAssingIconsVisible = true
      this.isDeleteButtonVisible = true
      this.isExpandButtonVisible = true
      this.isGrandTotalVisible = false
      this.isSendButtonVisible = false
      this.isDownloadButtonVisible = false
      this.isPdfButtonVisible = false
      this._store.dispatch(clearSearch())
    } else if (this._router.url === '/chemicals') {
      this.addAssingIconsVisible = false
      this.isDeleteButtonVisible = true
      this.isExpandButtonVisible = true
      this.isGrandTotalVisible = false
      this.isSendButtonVisible = false
      this.isDownloadButtonVisible = true
      this.isPdfButtonVisible = false
      this._store.dispatch(clearSearch())
    } else if (this._router.url === '/store-room') {
      this.addAssingIconsVisible = false
      this.isDeleteButtonVisible = true
      this.isExpandButtonVisible = true
      this.getStoreRoomGrandTotal()
      this.isGrandTotalVisible = true
      this.isSendButtonVisible = true
      this.isDownloadButtonVisible = true
      this.isPdfButtonVisible = false
      this._store.dispatch(clearSearch())
    } else if (this._router.url === '/extractions') {
      if (this._authService.isLoggedIn() && this._authService.currentUser().group === 'inventory_admin') {
        this.isDeleteButtonVisible = true
        this.isSendButtonVisible = true
        this.isDownloadButtonVisible = true
      } else {
        this.isDeleteButtonVisible = false
        this.isSendButtonVisible = false
        this.isDownloadButtonVisible = false
      }
      this.isExpandButtonVisible = true
      this.addAssingIconsVisible = false
      this.isGrandTotalVisible = true
      this.isPdfButtonVisible = false
      this.getExtractionsGrandTotal()
      this._store.dispatch(clearSearch())
    } else if (this._router.url === '/mass-spec') {
      if (this._authService.isLoggedIn() && this._authService.currentUser().group === 'inventory_admin') {
        this.isDeleteButtonVisible = true
        this.isSendButtonVisible = true
        this.isDownloadButtonVisible = true
      } else {
        this.isDeleteButtonVisible = false
        this.isSendButtonVisible = false
        this.isDownloadButtonVisible = false
      }
      this.isExpandButtonVisible = true
      this.addAssingIconsVisible = false
      this.isGrandTotalVisible = true
      this.isPdfButtonVisible = false
      this.getMassSpecGrandTotal()
      this._store.dispatch(clearSearch())
    } else if (this._router.url === '/receiving') {
      if (this._authService.isLoggedIn() && this._authService.currentUser().group === 'inventory_admin') {
        this.isDeleteButtonVisible = true
        this.isSendButtonVisible = true
        this.isDownloadButtonVisible = true
      } else {
        this.isDeleteButtonVisible = false
        this.isSendButtonVisible = false
        this.isDownloadButtonVisible = false
      }
      this.isExpandButtonVisible = true
      this.addAssingIconsVisible = false
      this.isGrandTotalVisible = true
      this.isPdfButtonVisible = false
      this.getReceivingGrandTotal()
      this._store.dispatch(clearSearch())
    } else if (this._router.url === '/r&d') {
      if (this._authService.isLoggedIn() && this._authService.currentUser().group === 'inventory_admin') {
        this.isDeleteButtonVisible = true
        this.isSendButtonVisible = true
        this.isDownloadButtonVisible = true
      } else {
        this.isDeleteButtonVisible = false
        this.isSendButtonVisible = false
        this.isDownloadButtonVisible = false
      }
      this.isExpandButtonVisible = true
      this.addAssingIconsVisible = false
      this.isGrandTotalVisible = true
      this.isPdfButtonVisible = false
      this.getRdGrandTotal()
      this._store.dispatch(clearSearch())
    } else if (this._router.url === '/screening') {
      if (this._authService.isLoggedIn() && this._authService.currentUser().group === 'inventory_admin') {
        this.isDeleteButtonVisible = true
        this.isSendButtonVisible = true
        this.isDownloadButtonVisible = true
      } else {
        this.isDeleteButtonVisible = false
        this.isSendButtonVisible = false
        this.isDownloadButtonVisible = false
      }
      this.isExpandButtonVisible = true
      this.addAssingIconsVisible = false
      this.isGrandTotalVisible = true
      this.isPdfButtonVisible = false
      this.getScreeningGrandTotal()
      this._store.dispatch(clearSearch())
    } else if (this._router.url === '/quality') {
      if (this._authService.isLoggedIn() && this._authService.currentUser().group === 'inventory_admin') {
        this.isDeleteButtonVisible = true
        this.isSendButtonVisible = true
        this.isDownloadButtonVisible = true
      } else {
        this.isDeleteButtonVisible = false
        this.isSendButtonVisible = false
        this.isDownloadButtonVisible = false
      }
      this.isExpandButtonVisible = true
      this.addAssingIconsVisible = false
      this.isGrandTotalVisible = true
      this.isPdfButtonVisible = false
      this.getQualityGrandTotal()
      this._store.dispatch(clearSearch())
    } else if (this._router.url === '/shipping') {
      if (this._authService.isLoggedIn() && this._authService.currentUser().group === 'inventory_admin') {
        this.isDeleteButtonVisible = true
        this.isSendButtonVisible = true
        this.isDownloadButtonVisible = true
      } else {
        this.isDeleteButtonVisible = false
        this.isSendButtonVisible = false
        this.isDownloadButtonVisible = false
      }
      this.isExpandButtonVisible = true
      this.addAssingIconsVisible = false
      this.isGrandTotalVisible = true
      this.isPdfButtonVisible = false
      this.getshippingGrandTotal()
      this._store.dispatch(clearSearch())
   
    } else if (this._router.url === '/general-request') {
      this.addAssingIconsVisible = false
      this.isDeleteButtonVisible = false
      this.isExpandButtonVisible = false
      this.isGrandTotalVisible = false
      this.isPdfButtonVisible = false
      this._store.dispatch(clearSearch())
    } else if (this._router.url === '/store-room-request') {
      this.addAssingIconsVisible = false
      this.isDeleteButtonVisible = false
      this.isExpandButtonVisible = false
      this.isGrandTotalVisible = false
      this.isPdfButtonVisible = false
      this._store.dispatch(clearSearch())
    } else if (this._router.url === '/office-supply-request') {
      this.addAssingIconsVisible = false
      this.isDeleteButtonVisible = false
      this.isExpandButtonVisible = false
      this.isGrandTotalVisible = false
      this.isPdfButtonVisible = false
      this._store.dispatch(clearSearch())
    } else if (this._router.url === '/admin-general-request') {
      this.addAssingIconsVisible = false
      this.isDeleteButtonVisible = false
      this.isExpandButtonVisible = false
      this.isGrandTotalVisible = false
      this.isPdfButtonVisible = false
      this._store.dispatch(clearSearch())
    } else if (this._router.url === '/admin-store-room-request') {
      this.addAssingIconsVisible = false
      this.isDeleteButtonVisible = false
      this.isExpandButtonVisible = false
      this.isGrandTotalVisible = false
      this.isPdfButtonVisible = false
      this._store.dispatch(clearSearch())
    } else if (this._router.url === '/admin-office-supply-request') {
      this.addAssingIconsVisible = false
      this.isDeleteButtonVisible = false
      this.isExpandButtonVisible = false
      this.isGrandTotalVisible = false
      this.isPdfButtonVisible = false
      this._store.dispatch(clearSearch())
    } else if (this._router.url === '/admin-breakroom-request') {
      this.addAssingIconsVisible = false
      this.isDeleteButtonVisible = false
      this.isExpandButtonVisible = false
      this.isGrandTotalVisible = false
      this.isPdfButtonVisible = false
    } else if (this._router.url === '/chemicals') {
      this.addAssingIconsVisible = false
      this.isDeleteButtonVisible = true
      this.isExpandButtonVisible = true
      this.getChemicalsGrandTotal()
      this.isGrandTotalVisible = true
      this.isSendButtonVisible = true
      this.isDownloadButtonVisible = true
      this.isPdfButtonVisible = false
      this._store.dispatch(clearSearch())
   

  }

}

  openDialog(): void {
    const dialogConfig = new MatDialogConfig
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(NewItemFormComponent, dialogConfig).afterClosed().subscribe()

  }

  openAssignDialog(): void {
    const dialogConfig = new MatDialogConfig
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = "800px"
    dialogConfig.data = this.selected
    this.dialog.open(AssignItemFromComponent, dialogConfig).afterClosed().subscribe({
      next: () => {
        this._bottomToolbarService.setIsDeleteButtonDisabled(false)
      }
    })
  }

  handleDelete() {
    this.deleteEvent.emit(true)
  }

  setIsExpanded() {
    this._bottomToolbarService.setIsExpanded(!this.isExpanded)
  }
  
  downloadPDF() {
    this.downloadPDFEvent.emit(true)
  }

  download() {
    if (this._router.url === '/store-room') {
      this.downloadEvent.emit(true)
    } else if (this._router.url === '/extractions') {
      this.downloadEvent.emit(true)
    } else if (this._router.url === '/mass-spec') {
      this.downloadEvent.emit(true)
    } else if (this._router.url === '/receiving') {
      this.downloadEvent.emit(true)
    } else if (this._router.url === '/r&d') {
      this.downloadEvent.emit(true)
    } else if (this._router.url === '/screening') {
      this.downloadEvent.emit(true)
    } else if (this._router.url === '/quality') {
      this.downloadEvent.emit(true)
    } else if (this._router.url === '/shipping') {
      this.downloadEvent.emit(true)
    } else if (this._router.url === '/safety') {
      this.downloadEvent.emit(true)
    } else if (this._router.url === '/general-request') {
      this.downloadEvent.emit(true)
    } else if (this._router.url === '/store-room-request') {
      this.downloadEvent.emit(true)
    } else if (this._router.url === '/office-supply-request') {
      this.downloadEvent.emit(true)
    } else if (this._router.url ==='/chemicals') {
      this.downloadEvent.emit(true)
    }
    
  }

  send() {
    if (this._router.url === '/store-room') {
      this.sendEvent.emit(true)
    } else if (this._router.url === '/extractions') {
      this.sendEvent.emit(true)
    } else if (this._router.url === '/mass-spec') {
      this.sendEvent.emit(true)
    } else if (this._router.url === '/receiving') {
      this.sendEvent.emit(true)
    } else if (this._router.url === '/r&d') {
      this.sendEvent.emit(true)
    } else if (this._router.url === '/screening') {
      this.sendEvent.emit(true)
    } else if (this._router.url === '/quality') {
      this.sendEvent.emit(true)
    } else if (this._router.url === '/shipping') {
      this.sendEvent.emit(true)
    } else if (this._router.url === '/safety') {
      this.sendEvent.emit(true)
    } else if (this._router.url === '/general-request') {
      this.sendEvent.emit(true)
    } else if (this._router.url === '/store-room-request') {
      this.sendEvent.emit(true)
    } else if (this._router.url === '/office-supply-request') {
      this.sendEvent.emit(true)
    }else if (this._router.url === '/chemicals') {
      this.sendEvent.emit(true)
    }
  }

  getStoreRoomGrandTotal() {
    this.grandTotal$ = this._storeRoomService.getStoreRoomItems().pipe(map(items => {
      return items.reduce((acc, item) => { return acc + (item.master.average_unit_price * item.quantity) }, 0)
    }))
  }
  getshippingGrandTotal() {
    this.grandTotal$ = this._shippingService.getShippingItems().pipe(map(items => {
      return items.reduce((acc, item) => { return acc + (item.master.average_unit_price * item.quantity) }, 0)
    }))
  }
  getExtractionsGrandTotal() {
    this.grandTotal$ = this._extractionsService.getTotalItems().pipe(map(items => {
      return items.reduce((acc, item) => { return acc + (item.master.average_unit_price * item.quantity) }, 0)
    }))
  }
  getMassSpecGrandTotal() {
    this.grandTotal$ = this._massSpecService.getTotalItems().pipe(map(items => {
      return items.reduce((acc, item) => { return acc + (item.master.average_unit_price * item.quantity) }, 0)
    }))
  }
  getReceivingGrandTotal() {
    this.grandTotal$ = this._receivingService.getTotalItems().pipe(map(items => {
      return items.reduce((acc, item) => { return acc + (item.master.average_unit_price * item.quantity) }, 0)
    }))
  }
  getRdGrandTotal() {
    this.grandTotal$ = this._rdService.getTotalItems().pipe(map(items => {
      return items.reduce((acc, item) => { return acc + (item.master.average_unit_price * item.quantity) }, 0)
    }))
  }
  getScreeningGrandTotal() {
    this.grandTotal$ = this._screeningService.getTotalItems().pipe(map(items => {
      return items.reduce((acc, item) => { return acc + (item.master.average_unit_price * item.quantity) }, 0)
    }))
  }
  getQualityGrandTotal() {
    this.grandTotal$ = this._qualityService.getTotalItems().pipe(map(items => {
      return items.reduce((acc, item) => { return acc + (item.master.average_unit_price * item.quantity) }, 0)
    }))
  }
  getChemicalsGrandTotal() {
    this.grandTotal$ = this._chemicalsService.getTotalItems().pipe(map(items => {
      return items.reduce((acc, item) => { return acc + (item.master.average_unit_price * item.quantity) }, 0)
    }))
  }
}

