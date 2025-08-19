// services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ProductResponseDto, SupplierResponseDto } from './home.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) { }

  getProductsNeedReorder(): Observable<ProductResponseDto[]> {
    return this.http.get<ProductResponseDto[]>(`${this.apiUrl}/reorder`);
  }

  getProductWithMinOrders(): Observable<ProductResponseDto> {
    return this.http.get<ProductResponseDto>(`${this.apiUrl}/min-orders-product`);
  }

  getLargestSupplier(): Observable<SupplierResponseDto> {
    return this.http.get<SupplierResponseDto>(`${this.apiUrl}/largest-supplier`);
  }
}
