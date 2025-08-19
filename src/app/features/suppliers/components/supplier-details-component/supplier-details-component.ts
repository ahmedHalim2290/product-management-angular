import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Supplier } from '../../models/supplier';
import { SupplierService } from '../../supplier.service';

@Component({
  selector: 'app-supplier-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CardModule],
  templateUrl: './supplier-details-component.html',
  styleUrl: './supplier-details-component.css'
})
export class SupplierDetailsComponent implements OnInit {
  private supplierService = inject(SupplierService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  supplier: Supplier | null = null;
  loading = true;

  ngOnInit(): void {
    const supplierId = this.route.snapshot.params['id'];
    this.loadSupplier(supplierId);
  }

  loadSupplier(id: number): void {
    this.loading = true;
    this.supplierService.getSupplier(id).subscribe({
      next: (supplier) => {
        this.supplier = supplier;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load supplier', err);
        this.loading = false;
      }
    });
  }

  editSupplier(): void {
    if (this.supplier) {
      this.router.navigate(['/suppliers/edit', this.supplier.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/suppliers']);
  }
}
