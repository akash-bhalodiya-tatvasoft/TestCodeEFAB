import { DialogContainer } from '@angular/cdk/dialog';
import { Component, inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogOptions } from './models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-generic-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './generic-dialog.html',
  styleUrl: './generic-dialog.scss',
})
export class GenericDialog {
  dialogRef = inject(MatDialogRef<DialogContainer>);
  options = inject<DialogOptions>(MAT_DIALOG_DATA);
  injector = inject(Injector);
  customInjector!:Injector;

  ngOnInit(){
    this.customInjector = this.createChildInjector();
  }

  createChildInjector() {
    return Injector.create({
      providers: [{ provide: 'DIALOG_DATA', useValue: this.options.data }],
      parent: this.injector,
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
