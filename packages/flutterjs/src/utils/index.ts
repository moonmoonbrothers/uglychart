import applyMixins from "./applyMixins";
import assert from "./assert";
import { getTextHeight, getTextWidth } from "./getTextSize";

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
}
