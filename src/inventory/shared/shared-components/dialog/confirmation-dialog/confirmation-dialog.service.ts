import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  confirmationDialog(message: string) {
    return this.dialog.open(
      ConfirmationDialogComponent,
      {
        panelClass: 'confirm-dialog-container',
        disableClose: true,
        position: { top: "5em" },
        data: {
          message: message
        }
      });
  }
}
