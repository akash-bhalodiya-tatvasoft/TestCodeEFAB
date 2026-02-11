import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialog } from '../components';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private readonly dialog = inject(MatDialog);

  confirm(data: {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    panelClass?: string[];
  }): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      panelClass: data.panelClass || '',
      disableClose: true,
      data: {
        title: data.title || 'Confirm Action',
        message: data.message || 'Are you sure you want to proceed?',
        confirmText: data.confirmText || 'Confirm',
        cancelText: data.cancelText || 'Cancel',
      },
    });

    return dialogRef.afterClosed();
  }
}
