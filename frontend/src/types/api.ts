export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ── Sizing ────────────────────────────────────────────────────────────────────
export interface Sex { id: number; code: string; description: string | null; displayName: string }
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
export interface ModeltypeSexDependents {
  orderCount: number;
  sizeCount: number;
  articles: { id: number; name: string }[];
  canDelete: boolean;
  canReassign: boolean;
}

// ── Materials ─────────────────────────────────────────────────────────────────
export interface Supplier { id: number; company: string | null; name: string | null; surname: string | null; displayName: string }
export interface UnitMeasurement { id: number; code: string; description: string | null; displayName: string }
export interface MaterialType { id: number; code: string; description: string | null; seasonal: boolean; displayName: string }
export type MaterialUsage = 'FIXED' | 'DYNAMIC' | 'BOTH';
export interface Material {
  id: number; code: string; description: string | null; price: number | null; displayName: string;
  usage: MaterialUsage;
  unitmeasurementId: number | null; unitmeasurement: UnitMeasurement | null;
  materialtypes: MaterialType[];
  supplierId: number | null; supplier: Supplier | null;
  collectionId: number | null; collection: { id: number; name: string; displayName: string } | null;
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
  collectionId: number | null;
  collection: { id: number; name: string; displayName: string } | null;
  articles: { id: number; name: string; displayName: string }[];
}
export interface Collection {
  id: number; name: string; type: string | null; year: number | null; displayName: string;
  projects: { id: number; name: string; displayName?: string }[];
}
export interface Article {
  id: number; name: string; description: string | null; displayName: string;
  modeltypesSexId: number;
  fixedCompositionId: number | null;
  fixedComposition: FixedComposition | null;
  modeltypesSex: { id: number; displayName: string; modeltype: Modeltype; sex: Sex };
  projectId: number | null;
  project: { id: number; name: string } | null;
  collection: { id: number; name: string; displayName: string } | null;
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
  collectionId: number | null; collection: { id: number; name: string } | null;
  totals: OrderTotals;
  orderDetails?: OrderDetail[];
}
export interface OrderDetail {
  id: number; orderHeaderId: number; quantity: number | null; note: string | null;
  unitPrice: number | null;
  articleId: number | null; article: Article | null;
  fabricId: number | null; fabric: Fabric | null;
  modeltypeSexSizeId: number | null; modeltypeSexSize: ModeltypeSexSize | null;
}
export interface FabricOption { id: number; code: string; description: string | null; displayName: string }
export interface SizeOption { modeltypeSexSizeId: number; sizeCode: string; displayName: string }

// ── Reports ───────────────────────────────────────────────────────────────────
export interface CostPreviewMaterial {
  compoType: 'F' | 'D';
  compoId: number;
  code: string;
  description: string | null;
  unit: string;
  quantity: number;
  price: number;
  cost: number;
}
export interface CostPreviewVariant {
  code: string;
  description: string | null;
  materials: CostPreviewMaterial[];
  total: number;
  totalWithMultiplier: number;
}
export interface CostPreviewArticle {
  name: string;
  description: string | null;
  variants: CostPreviewVariant[];
}
export interface CostPreview {
  multiplier: number;
  articles: CostPreviewArticle[];
}

export interface MaterialConsumptionRow {
  materialId: number;
  code: string;
  description: string | null;
  unit: string | null;
  quantity: number;
  price: number | null;
  cost: number | null;
}
export interface MaterialConsumption {
  orderId: number | null;
  rows: MaterialConsumptionRow[];
  totalCost: number;
}
