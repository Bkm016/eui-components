export type ClassValue = string | false | null | undefined;

/** Joins truthy class names. */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

/** Renders a boolean as a presence-only data attribute. */
export function flag(value: boolean | undefined): "" | undefined {
  return value ? "" : undefined;
}
