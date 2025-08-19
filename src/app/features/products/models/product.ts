import { Supplier } from "../../suppliers/models/supplier";

export interface Product {
  id: number;
  name: string;
  quantityPerUnitName: string;
  quantityPerUnit: number;
  reorderLevel: number;
  supplierId: number;
  unitPrice: number;
  unitsInStock: number;
  unitsOnOrder: number;
  supplierName: string;
  supplier?: Supplier;
}

export interface ProductStatistics {
  productsNeedReorder: Product[];
  largestSupplier: Supplier;
  productWithMinOrders: Product;
}

