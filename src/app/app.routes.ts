import { Routes } from '@angular/router';
import { HomeComponent } from './home/components/home-component/home-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/product.routes').then(m => m.PRODUCT_ROUTES)
  },

  {
    path: 'suppliers',
    loadChildren: () => import('./features/suppliers/supplier.routes').then(m => m.SUPPLIER_ROUTES)
  },
];
