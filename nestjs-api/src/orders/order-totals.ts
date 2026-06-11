import { Prisma } from '@prisma/client';

const { Decimal } = Prisma;
type DecimalInput = Prisma.Decimal | number | string | null | undefined;

/**
 * Order totals, in plain numbers (the JSON boundary). All monetary fields are
 * rounded to 2 decimals.
 */
export interface OrderTotals {
  partialTotal: number;
  discountAmount: number;
  subtotal: number;
  vat: number;
  grandTotal: number;
}

/** Single order line as far as the money math is concerned. */
export interface OrderTotalsLine {
  /** Frozen unit price (OrderDetail.unitPrice snapshot), not the live fabric price. */
  unitPrice: DecimalInput;
  quantity: number | null;
}

function dec(value: DecimalInput): Prisma.Decimal {
  return value === null || value === undefined ? new Decimal(0) : new Decimal(value);
}

function money(value: Prisma.Decimal): number {
  // Explicit half-up rounding to the cent; Number() conversion only at this boundary.
  return value.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
}

/**
 * Single source of truth for order monetary totals — shared by the orders API
 * and the PDF reports so they can never drift apart.
 *
 *   partialTotal   = SUM(unitPrice * quantity)
 *   discountAmount = partialTotal * discount / 100
 *   subtotal       = partialTotal - discountAmount
 *   vat            = vatApplied * subtotal / 100
 *   grandTotal     = subtotal + vat
 *
 * unitPrice is the frozen snapshot stored on each line; discount and vatApplied
 * are the per-order values (vatApplied is the OrderHeader.vatAppliedSnapshot).
 */
export function computeOrderTotals(
  lines: OrderTotalsLine[],
  discount: DecimalInput,
  vatApplied: DecimalInput,
): OrderTotals {
  const partialTotal = lines.reduce(
    (sum, line) => sum.plus(dec(line.unitPrice).times(line.quantity ?? 0)),
    new Decimal(0),
  );
  const discountAmount = partialTotal.times(dec(discount)).dividedBy(100);
  const subtotal = partialTotal.minus(discountAmount);
  const vat = dec(vatApplied).times(subtotal).dividedBy(100);
  const grandTotal = subtotal.plus(vat);

  return {
    partialTotal: money(partialTotal),
    discountAmount: money(discountAmount),
    subtotal: money(subtotal),
    vat: money(vat),
    grandTotal: money(grandTotal),
  };
}
