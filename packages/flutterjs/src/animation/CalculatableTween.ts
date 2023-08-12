import { Calculatable, Data } from "../type";
import Tween from "./Tween";

class CalculatableTween<T extends Calculatable> extends Tween<T> {
  protected lerp(t: number): T {
    const { begin, end } = this;
    return begin.plus(end.minus(begin).multiply(t)) as T;
  }
}

export default CalculatableTween;