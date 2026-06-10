export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ── Sizing ────────────────────────────────────────────────────────────────────
export interface Sex { id: number; code: string; displayName: string }
export interface Modeltype { id: number; code: string; description: string | null; displayName: string }
export interface Size { id: number; code: string; displayName: string }
export interface ModeltypeSex {
  id: number; modeltypeId: number; sexId: number; displayName: string;
  modeltype: Modeltype; sex: Sex;
}
export interface ModeltypeSexSize {
  id: number; modeltypeSexId: number; sizeId: number; displayName: string;
  modeltypeSex: ModeltypeSex; size: Size;
}

// ── Materials ─────────────────────────────────────────────────────────────────
export interface Supplier { id: number; company: string | null; name: string | null; surname: string | null; displayName: string }
export interface UnitMeasurement { id: number; code: string; description: string | null; displayName: string }
export interface MaterialType { id: number; code: string; description: string | null; displayName: string }
export interface Material {
  id: number; code: string; description: string | null; displayName: string;
  unitmeasurementId: number | null; unitmeasurement: UnitMeasurement | null;
  materialtypes: MaterialType[];
  supplierId: number | null; supplier: Supplier | null;
}

// ── Compositions ──────────────────────────────────────────────────────────────
export interface FixedCompositionMaterial {
  id: number; fixedCompositionId: number; materialId: number; quantity: number;
  material: Material;
}
export interface FixedComposition {
  id: number; code: string; description: string | null; displayName: string;
  materials: FixedCompositionMaterial[];
}
export interface DynamicCompositionMaterial {
  id: number; dynamicCompositionId: number; materialId: number; quantity: number;
  material: Material;
}
export interface DynamicComposition {
  id: number; code: string; description: string | null; displayName: string;
  materials: DynamicCompositionMaterial[];
}

// ── Catalog ───────────────────────────────────────────────────────────────────
export interface Project {
  id: number; name: string; displayName: string;
  articles: { id: number; displayName: string }[];
  collections: { id: number; displayName: string }[];
}
export interface Collection {
  id: number; name: string; displayName: string;
  projects: { id: number; name: string; displayName: string }[];
}
export interface Article {
  id: number; name: string; description: string | null; displayName: string;
  modeltypesSexId: number;
  fixedCompositionId: number | null;
  fixedComposition: FixedComposition | null;
  modeltypesSex: { id: number; displayName: string; modeltype: Modeltype; sex: Sex };
  projects: { id: number; name: string; displayName: string }[];
}
export interface Fabric {
  id: number; code: string; description: string | null; price: number | null; displayName: string;
  articleId: number; article: { id: number; name: string; displayName: string };
  dynamicCompositionId: number | null; dynamicComposition: DynamicComposition | null;
}

// ── Customers ─────────────────────────────────────────────────────────────────
export interface Customer {
  id: number;
  company: string | null; name: string | null; surname: string | null;
  email: string | null; phone: string | null;
  address: string | null; city: string | null; country: string | null;
  vatApplied: number | null; displayName: string;
}

// ── Orders ────────────────────────────────────────────────────────────────────
export interface OrderTotals {
  partialTotal: number; discountAmount: number;
  subtotal: number; vat: number; grandTotal: number;
}
export interface OrderHeader {
  id: number; orderNumber: string | null; date: string | null;
  discount: number | null; notes: string | null; displayName: string;
  customerId: number; customer: Customer;
  totals: OrderTotals;
  orderDetails?: OrderDetail[];
}
export interface OrderDetail {
  id: number; orderHeaderId: number; quantity: number | null; note: string | null;
  articleId: number | null; article: Article | null;
  fabricId: number | null; fabric: Fabric | null;
  modeltypeSexSizeId: number | null; modeltypeSexSize: ModeltypeSexSize | null;
}
export interface FabricOption { id: number; code: string; description: string | null; displayName: string }
export interface SizeOption { modeltypeSexSizeId: number; sizeCode: string; displayName: string }
