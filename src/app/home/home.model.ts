export interface ProductResponseDto {
  id: number;
  name: string;
  quantityPerUnit: string;
  reorderLevel: number;
  supplierId: number;
  supplierName: string;
  unitPrice: number;
  unitsInStock: number;
  unitsOnOrder: number;
}

export interface SupplierResponseDto {
  id: number;
  name: string;
  productCount: number;
}
