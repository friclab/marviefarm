/**
 * Replicates the MultipleDisplayFieldsBehavior from the legacy CakePHP app.
 * Joins non-empty, non-null fields with the given separator.
 *
 * Examples (matching original PHP sprintf patterns):
 *   code + description  → joinDisplay([code, description])           → "C001 - Cotton"
 *   company + name + surname → joinDisplay([company, fullName(n,s)]) → "Acme - John Doe"
 */
export function joinDisplay(
  fields: (string | null | undefined)[],
  separator = ' - ',
): string {
  return fields
    .filter((f): f is string => f != null && f.trim() !== '')
    .join(separator);
}

/** Builds "name surname" for person models (Supplier, Customer). */
export function fullPersonName(
  name: string | null | undefined,
  surname: string | null | undefined,
): string | null {
  const parts = [name, surname].filter((f): f is string => f != null && f.trim() !== '');
  return parts.length > 0 ? parts.join(' ') : null;
}
