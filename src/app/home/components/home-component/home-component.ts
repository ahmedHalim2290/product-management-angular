import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProductResponseDto, SupplierResponseDto } from '../../home.model';
import { MessageService } from 'primeng/api';
import { DashboardService } from '../../home.service';

import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';


@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
  standalone: true,
  imports: [
    MenubarModule,
    CardModule,
    ProgressBarModule,
    ChartModule,
    ToastModule,
    TagModule
  ],
})
export class HomeComponent implements OnInit {
  title = 'Inventory Management System';
  items: MenuItem[] = [];
  reorderProducts: ProductResponseDto[] = [];
  minOrderProduct: ProductResponseDto | null = null;
  largestSupplier: SupplierResponseDto | null = null;
  loading = {
    reorder: true,
    minOrder: true,
    supplier: true
  };

  constructor(
    private dashboardService: DashboardService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadStatistics();
  }


  private loadStatistics() {
    // Load products that need reorder
    this.dashboardService.getProductsNeedReorder().subscribe({
      next: (data) => {
        this.reorderProducts = data;
        this.loading.reorder = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading reorder products:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load products needing reorder'
        });
        this.loading.reorder = false;
      }
    });

    // Load product with minimum orders
    this.dashboardService.getProductWithMinOrders().subscribe({
      next: (data) => {
        this.minOrderProduct = data;
        this.loading.minOrder = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading product with min orders:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load product with minimum orders'
        });
        this.loading.minOrder = false;
      }
    });

    // Load largest supplier
    this.dashboardService.getLargestSupplier().subscribe({
      next: (data) => {
        this.largestSupplier = data;
        this.loading.supplier = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading largest supplier:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load largest supplier'
        });
        this.loading.supplier = false;
      }
    });
  }


  calculateStockPercentage(product: ProductResponseDto): number {
    if (product.reorderLevel <= 0) return 0;
    return Math.min(100, (product.unitsInStock / product.reorderLevel) * 100);
  }

}
