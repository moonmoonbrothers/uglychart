import defaultColors from "./defaultChartColors";

export const Utils = {
  notNullOrUndefined<T>(value: T | undefined | null): value is T {
    return value != null;
  },
  sum(acc: number, value: number): number {
    return acc + value;
  },
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer I>
    ? Array<DeepPartial<I>>
    : DeepPartial<T[P]>;
};

export { defaultColors };
