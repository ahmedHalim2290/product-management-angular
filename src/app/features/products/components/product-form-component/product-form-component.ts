import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../../../suppliers/supplier.service';
import { Supplier } from '../../../suppliers/models/supplier';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    AutoCompleteModule,
    ButtonModule,
    CommonModule
  ],
  templateUrl: './product-form-component.html',
  styleUrls: ['./product-form-component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId: number | null = null;
  suppliers: Supplier[] = [];
  loading = true;
  quantityPerUnitList: { id: number, name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef

  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      quantityPerUnit: ['', Validators.required],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      unitsInStock: [0, [Validators.required, Validators.min(0)]],
      unitsOnOrder: [0, [Validators.required, Validators.min(0)]],
      reorderLevel: [0, [Validators.required, Validators.min(0)]],
      supplierId: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.productId;
    this.quantityPerUnitList = [
      { id: 1, name: 'Kilo' },
      { id: 2, name: 'Box' },
      { id: 3, name: 'Can' },
      { id: 4, name: 'Liter' },
      { id: 5, name: 'Bottle' },
    ];


    if (this.isEditMode) {
      this.loadProductForEdit();
    }

    // Load suppliers for dropdown
    this.loadSuppliers();
  }

  loadProductForEdit(): void {
    this.productService.getProduct(this.productId!).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          quantityPerUnit: product.quantityPerUnit,
          unitPrice: product.unitPrice,
          unitsInStock: product.unitsInStock,
          unitsOnOrder: product.unitsOnOrder,
          reorderLevel: product.reorderLevel,
          supplierId: product.supplierId
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load product'
        });
        this.router.navigate(['/products']);
      }
    });
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

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const productData = this.productForm.value;

    if (this.isEditMode) {
      productData.id = this.productId;

      this.productService.updateProduct(productData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product updated successfully'
          });
          this.router.navigate(['/products']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update product'
          });
        }
      });
    } else {
      this.productService.createProduct(productData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product added successfully'
          });
          this.router.navigate(['/products']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add product'
          });
        }
      });
    }
  }

  navigateToProducts() {
    this.router.navigate(['/products'])
  }
}
