import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../shared/components';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationService } from '../../shared';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly confirmService = inject(ConfirmationService);
  private dialog = inject(MatDialog);

  deleteUser() {

    this.confirmService.confirm({
      title: 'Delete User',
      message: 'Are you sure you want to delete this user?',
      confirmText: 'Delete'
    }).subscribe(confirmed => {
      if (confirmed) {
        console.log('User deleted');
      } else {
        console.log('Action cancelled');
      }
    });
  }
}
