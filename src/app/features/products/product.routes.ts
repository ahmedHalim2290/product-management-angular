import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list-component/product-list-component';
import { ProductDetailsComponent } from './components/product-details-component/product-details-component';
import { ProductFormComponent } from './components/product-form-component/product-form-component';

export const PRODUCT_ROUTES: Routes = [
  { path: '', component: ProductListComponent, title: 'Products - List' },
  { path: 'details/:id', component: ProductDetailsComponent, title: 'Products - Details' },
  { path: 'add', component: ProductFormComponent, title: 'Products - Create New' },
  { path: 'edit/:id', component: ProductFormComponent, title: 'Products - Edit' },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];
