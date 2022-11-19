import applyMixins from "./applyMixins"
import { getTextHeight, getTextWidth } from "./getTextSize"

export { applyMixins, getTextHeight, getTextWidth }

export default class Utils {
  static sumReducer = (acc: number, value: number) => acc + value

  static sum(values: number[]) {
    return values.reduce(Utils.sumReducer, 0)
  }

  static repeat<T>(value: T, count: number) {
    return Array.from({ length: count }, () => value)
  }
}
