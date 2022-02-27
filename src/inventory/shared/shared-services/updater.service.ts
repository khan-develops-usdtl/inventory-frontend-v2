import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRequestView } from 'src/inventory/admin/admin-models/requestView.model';
import { IStoreRoom } from 'src/inventory/admin/store-room/store-room.model';

@Injectable({
  providedIn: 'root'
})
export class UpdaterService {

  constructor() { }

  private masterUpdater = new BehaviorSubject<boolean>(false)
  currentMasterUpdater = this.masterUpdater.asObservable()
  setmasterUpdater(value: boolean) {
    this.masterUpdater.next(value)
  }
  private storeRoomUpdater = new BehaviorSubject<boolean>(false)
  currentstoreRoomUpdater = this.storeRoomUpdater.asObservable()
  setStoreRoomUpdater(value: boolean) {
    this.storeRoomUpdater.next(value)
  }
  private officeSupplyUpdater = new BehaviorSubject<boolean>(false)
  currentofficeSupplyUpdater = this.officeSupplyUpdater.asObservable()
  setOfficeSupplyUpdater(value: boolean) {
    this.officeSupplyUpdater.next(value)
  }
  private extractionsUpdater = new BehaviorSubject<boolean>(false)
  currentExtractionsUpdater = this.extractionsUpdater.asObservable()
  setExtractionsUpdater(value: boolean) {
    this.extractionsUpdater.next(value)
  }
  private massSpecUpdater = new BehaviorSubject<boolean>(false)
  currentMassSpecUpdater = this.massSpecUpdater.asObservable()
  setMassSpecUpdater(value: boolean) {
    this.massSpecUpdater.next(value)
  }
  private receivingUpdater = new BehaviorSubject<boolean>(false)
  currentReceivingUpdater = this.receivingUpdater.asObservable()
  setReceivingUpdater(value: boolean) {
    this.receivingUpdater.next(value)
  }
  private rdUpdater = new BehaviorSubject<boolean>(false)
  currentRdUpdater = this.rdUpdater.asObservable()
  setRdUpdater(value: boolean) {
    this.rdUpdater.next(value)
  }
  private screeningUpdater = new BehaviorSubject<boolean>(false)
  currentScreeningUpdater = this.screeningUpdater.asObservable()
  setScreeningUpdater(value: boolean) {
    this.screeningUpdater.next(value)
  }
  private qualityUpdater = new BehaviorSubject<boolean>(false)
  currentQualityUpdater = this.qualityUpdater.asObservable()
  setQualityUpdater(value: boolean) {
    this.qualityUpdater.next(value)
  }
  private shippingUpdater = new BehaviorSubject<boolean>(false)
  currentShippingUpdater = this.shippingUpdater.asObservable()
  setShippingUpdater(value: boolean) {
    this.shippingUpdater.next(value)
  }
  private genralUpdater = new BehaviorSubject<boolean>(false)
  currentGeneralUpdater = this.genralUpdater.asObservable()
  setGeneralUpdater(value: boolean) {
    this.genralUpdater.next(value)
  }
  private generalRequestUpdater = new BehaviorSubject<boolean>(false)
  currentGeneralRequestUpdater = this.generalRequestUpdater.asObservable()
  setGeneralRequestUpdater(value: boolean) {
    this.generalRequestUpdater.next(value)
  }
  private storeRoomRequestUpdater = new BehaviorSubject<boolean>(false)
  currentStoreRoomRequestUpdater = this.storeRoomRequestUpdater.asObservable()
  setStoreRoomRequestUpdater(value: boolean) {
    this.storeRoomRequestUpdater.next(value)
  }
  private storeRoomRequestItem = new BehaviorSubject<IRequestView>(undefined)
  currentStoreRoomRequestItem = this.storeRoomRequestItem.asObservable()
  setStoreRoomRequestItem(storeRoomItem: IRequestView) {
    this.storeRoomRequestItem.next(storeRoomItem)
  }
  private officeSupplyRequestUpdater = new BehaviorSubject<boolean>(false)
  currentOfficeSupplyRequestUpdater = this.officeSupplyRequestUpdater.asObservable()
  setOfficeSupplyRequestUpdater(value: boolean) {
    this.officeSupplyRequestUpdater.next(value)
  }
  private breakroomRequestUpdater = new BehaviorSubject<boolean>(false)
  currentBreakroomRequestUpdater = this.breakroomRequestUpdater.asObservable()
  setBreakroomRequestUpdater(value: boolean) {
    this.breakroomRequestUpdater.next(value)
  }
  private chemicalsUpdater = new BehaviorSubject<boolean>(false)
  currentchemicalsUpdater = this.chemicalsUpdater.asObservable()
  setchemicalsUpdater(value: boolean) {
    this.chemicalsUpdater.next(value)
  }
}
