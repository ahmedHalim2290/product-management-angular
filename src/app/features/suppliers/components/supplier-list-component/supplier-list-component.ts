import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SupplierService } from '../../supplier.service';
import { Supplier } from '../../models/supplier';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './supplier-list-component.html',
  styleUrl: './supplier-list-component.css'
})
export class SupplierListComponent implements OnInit {

  suppliers: Supplier[] = [];
  loading = true;

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.loading = true;
    this.supplierService.getSuppliers().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
        this.loading = false;
        this.cdr.detectChanges();

      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load suppliers'
        });
        this.loading = false;
      }
    });
  }

  editSupplier(id: number): void {
    this.router.navigate(['/suppliers/edit', id]);
  }

  viewSupplier(id: number): void {
    this.router.navigate(['/suppliers/details', id]);
  }

  deleteSupplier(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this supplier?',
      accept: () => {
        this.supplierService.deleteSupplier(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Supplier deleted successfully'
            });
            this.loadSuppliers();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete supplier'
            });
          }
        });
      }
    });
  }

  navigateToAddSupplier() {
    this.router.navigate(['/suppliers/add']);
  }
}
