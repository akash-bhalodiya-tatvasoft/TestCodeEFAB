import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword implements OnInit {
  private fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<ChangePassword>);
  protected dialogData = inject(MAT_DIALOG_DATA);
  protected changePasswordData = this.dialogData.data;
  changePasswordForm!: FormGroup;

  ngOnInit(): void {
    this.changePasswordForm = this.fb.nonNullable.group(
      {
        currentPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  submit() {
    if (this.changePasswordForm.valid) {
      this.dialogRef.close(this.changePasswordForm.value);
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }

  passwordsMatchValidator(control: AbstractControl) {
    const form = control as FormGroup;
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }
}
