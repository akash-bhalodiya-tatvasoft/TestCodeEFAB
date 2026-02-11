import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SharedModule {}
