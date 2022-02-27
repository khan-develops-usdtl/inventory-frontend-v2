import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BottomToolbarService {

  constructor() { }

  private isDeleteButtonDisabled = new BehaviorSubject<boolean>(true)
  currentIsDeleteButtonDisabled = this.isDeleteButtonDisabled.asObservable()
  setIsDeleteButtonDisabled(value: boolean): void {
    this.isDeleteButtonDisabled.next(value)
  }

  private isAssignToDisabled = new BehaviorSubject<boolean>(true)
  currentIsAssignToDisabled = this.isAssignToDisabled.asObservable()
  setIsAssignToDisabled(value: boolean): void {
    this.isAssignToDisabled.next(value)
  }

  private isExpanded = new BehaviorSubject<boolean>(false);
  currentIsExpanded = this.isExpanded.asObservable();
  setIsExpanded(value: boolean) {
    this.isExpanded.next(value)
  }

  private grandTotal = new BehaviorSubject<number>(0)
  currentGrandTotal = this.grandTotal.asObservable()
  setGrandTotal(value: number) {
    this.grandTotal.next(value)
  }
}
