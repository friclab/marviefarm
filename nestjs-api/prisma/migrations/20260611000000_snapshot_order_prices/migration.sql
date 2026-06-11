-- Freeze per-order monetary inputs so later edits to fabric.price / customer.vatApplied
-- do not retroactively change saved orders' totals.

-- AlterTable: frozen unit price per order line
ALTER TABLE `orderdetails` ADD COLUMN `unit_price` DECIMAL(10, 2) NULL AFTER `qta`;

-- AlterTable: frozen VAT rate per order header
ALTER TABLE `orderheaders` ADD COLUMN `vat_applied_snapshot` DECIMAL(5, 2) NULL AFTER `discount`;

-- Backfill (one-shot): best available estimate is the current value of each source.
UPDATE `orderdetails` od
  JOIN `fabrics` f ON f.id = od.fabric_id
  SET od.unit_price = f.price
  WHERE od.unit_price IS NULL AND od.fabric_id IS NOT NULL;

UPDATE `orderheaders` oh
  JOIN `customers` c ON c.id = oh.customer_id
  SET oh.vat_applied_snapshot = c.vat_applied
  WHERE oh.vat_applied_snapshot IS NULL;
