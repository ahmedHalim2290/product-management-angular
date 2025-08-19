import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Supplier } from '../../models/supplier';
import { SupplierService } from '../../supplier.service';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ],
  templateUrl: './supplier-form-component.html',
  styleUrl: './supplier-form-component.css'
})
export class SupplierFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private supplierService = inject(SupplierService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);

  supplierForm!: FormGroup;
  isEditMode = false;
  supplierId: number | null = null;
  loading = false;

  ngOnInit(): void {
    this.initForm();

    this.supplierId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.supplierId;

    if (this.isEditMode) {
      this.loadSupplier();
    }
  }

  initForm(): void {
    this.supplierForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  loadSupplier(): void {
    if (this.supplierId) {
      this.loading = true;
      this.supplierService.getSupplier(this.supplierId).subscribe({
        next: (supplier) => {
          this.supplierForm.patchValue(supplier);
          this.loading = false;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load supplier'
          });
          this.loading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      this.loading = true;
      const formValue = this.supplierForm.value;

      if (this.isEditMode && this.supplierId) {
        const updateDto: Supplier = {
          name: formValue.name,
          id: this.supplierId
        };
        this.supplierService.updateSupplier(updateDto).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Supplier updated successfully'
            });
            this.router.navigate(['/suppliers']);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update supplier'
            });
            this.loading = false;
          }
        });
      } else {
        const createDto: Supplier = {
          id: 0,
          name: formValue.name
        };

        this.supplierService.createSupplier(createDto).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Supplier created successfully'
            });
            this.router.navigate(['/suppliers']);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to create supplier'
            });
            this.loading = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.supplierForm.controls).forEach(key => {
      this.supplierForm.get(key)?.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/suppliers']);
  }
}
