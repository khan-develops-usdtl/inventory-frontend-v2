import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  static _snackbar: any
  constructor(
    private _snackbar: MatSnackBar,
  ) {
    OrderService._snackbar = this._snackbar
  }

  getOrderNumber(params: any) {
    if (params.data.min_quantity === null || params.data.max_quantity === null) {
      return "no min/max"
    } else if (params.data.min_quantity === 1 && params.data.max_quantity === 1) {
      if (params.data.quantity === 0) {
        return 1
      }
      return 0
    } else {
      if (params.data.quantity - params.data.min_quantity > 0) {
        return 0
      }
      return Number(params.data.max_quantity - params.data.quantity)

    }
  }
  styleOrder(params: any) {
    if (params.data.min_quantity === null || params.data.max_quantity === null) {
      return { 'background-color': '#eded00', 'text-align': 'center'}
    } else if (params.data.min_quantity === 1 && params.data.max_quantity === 1) {
      if (params.data.quantity === 0) {
        return { 'background-color': '#FF0000', 'font-weight': 900, 'color': 'black', 'font-size': '1.2em', 'text-align': 'center'  }
      }
      return { 'background-color': '#3CB371', 'text-align': 'center', 'font-size': '1.2em', 'color': 'black', 'font-weight': 900,}
    }
    else {
      if (params.data.quantity - params.data.min_quantity > 0) {
        return { 'background-color': '#3CB371', 'text-align': 'center', 'font-size': '1.2em', 'color': 'black', 'font-weight': 900,}
      }
      return { 'background-color': '#FF0000', 'font-weight': 900, 'color': 'black', 'font-size': '1.2em', 'text-align': 'center'  }
    }
  }

  styleExpiration(params: any) {
    const dt = new Date()
    dt.setMonth(dt.getMonth() + 1)
    if(new Date(params.data.expiration_date) < dt) {
      return { 'border': '1px solid #FF0000', "padding": 0 }
    }
    return { "padding": 0 }
  }

  setIssued(params: any) {
    if (params.newValue) {
      if (params.data.quantity - Number(params.newValue) < 0) {
        OrderService.getSnackbar('Cannot issue more than total on hand.')
        return
      }
      params.data.quantity = params.data.quantity - Number(params.newValue)
      if (params.data.quantity <= params.data.min_quantity) {
        params.data.order_quantity = params.data.max_quantity - params.data.quantity
      }
    }
  }

  setReceived(params: any) {
    if (params.newValue) {
      params.data.quantity = params.data.quantity + Number(params.newValue)
      if(params.data.min_quantity === 1 && params.data.max_quantity === 1 && params.data.quantity === 1) {
        params.data.order_quantity = 0
      } else if (params.data.quantity > params.data.min_quantity) {
        params.data.order_quantity = 0
      }
    }
  }

  static getSnackbar(message: string) {
    OrderService._snackbar.open(
      message,
      'ERROR',
      {
        duration: 6000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'ERROR',
        data: {
          message: message,
          type: 'ERROR'
        }
      }
    )
  }
}
