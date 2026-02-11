import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
})
export class Logout {
  dialogRef = inject(MatDialogRef<Logout>);

  logout() {
    this.dialogRef.close(false);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
