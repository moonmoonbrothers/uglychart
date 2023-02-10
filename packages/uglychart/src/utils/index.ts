export const Utils = {
  notNullOrUndefined<T>(value: T | undefined | null): value is T {
    return value != null
  },
  sum(acc: number, value: number): number {
    return acc + value
  }
}
