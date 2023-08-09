import applyMixins from "./applyMixins";
import assert from "./assert";
import lerp from "./lerp";
import { getTextHeight, getTextWidth } from "./getTextSize";
import { Calculatable } from "../type";

export { assert, applyMixins, getTextHeight, getTextWidth };

export default class Utils {
  static sumReducer = (acc: number, value: number) => acc + value;
  static maxReducer = (acc: number, value: number) => Math.max(acc, value);
  static minReducer = (acc: number, value: number) => Math.min(acc, value);

  static sum(values: number[]) {
    return values.reduce(Utils.sumReducer, 0);
  }

  static repeat<T>(value: T, count: number) {
    return Array.from({ length: count }, () => value);
  }

  static clampDouble(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
  }

  static arrayEqual(a: any[], b: any[]): boolean {
    if (a.length !== b.length) return false;

    return a.every((value, i) => value === b[i]);
  }

  static lerp<T extends Calculatable | number>(a: T, b: T, t: number) {
    if (typeof a === "number") {
      return lerp(a, b as number, t);
    }

    assert(b instanceof Calculatable);

    return a.plus((b as Calculatable).minus(a).multiply(-1));
  }
}
