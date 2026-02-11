import { Component, EventEmitter, inject, output, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog, GenericDialog } from '../../../../../shared/components';
import { ChangePassword } from '../../../../../features/change-password/change-password';
import { Logout } from '../../../../../features/logout/logout';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  toggle = output<void>();

  logout() {
    const dialogRef = this.dialog.open(GenericDialog, {
      width: '400px',
      panelClass: "custom-modal-wrap",
      disableClose: true,
      data: {
        title: 'Logout',
        component: Logout,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.router.navigate(['/login']);
      } else {
        console.log('Action cancelled');
      }
    });
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(GenericDialog, {
      width: '550px',
      panelClass: "custom-modal-wrap",
      disableClose: true,
      autoFocus: true,
      data: {
        title: 'Change Password',
        component: ChangePassword
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log('Change password data - ',res);
      }
      else console.log('Cancelled');
    });
  }
}
