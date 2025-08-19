import { Routes } from '@angular/router';
import { SupplierListComponent } from './components/supplier-list-component/supplier-list-component';
import { SupplierDetailsComponent } from './components/supplier-details-component/supplier-details-component';
import { SupplierFormComponent } from './components/supplier-form-component/supplier-form-component';

export const SUPPLIER_ROUTES: Routes = [
  { path: '', component: SupplierListComponent, title: 'Suppliers - List' },
  { path: 'details/:id', component: SupplierDetailsComponent, title: 'Supplier - Details' },
  { path: 'add', component: SupplierFormComponent, title: 'Supplier - Create New' },
  { path: 'edit/:id', component: SupplierFormComponent, title: 'Supplier - Edit' },
  { path: '', redirectTo: '/supplier', pathMatch: 'full' }
];
