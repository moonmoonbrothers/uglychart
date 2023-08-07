import { Data } from "../type";
import Animitable from "./Animitable";

class Tween<T extends Data | number = Data | number> extends Animitable<T> {
  begin: T;
  end: T;
  constructor({ begin, end }: { begin: T; end?: T }) {
    super();
    this.begin = begin;
    this.end = end ?? begin;
  }

  transform(value: number): T {
    if (value === 0) return this.begin;
    if (value === 1) return this.end;
    return this.lerp(value);
  }

  private lerp(t: number): T {
    const { begin } = this;
    if (typeof begin === "number") {
      const end = this.end as number;
      return (begin + (end - begin) * t) as T;
    } else {
      const end = this.end as Data;
      return begin.plus(end.minus(begin).multiply(t)) as T;
    }
  }
}

export default Tween;
