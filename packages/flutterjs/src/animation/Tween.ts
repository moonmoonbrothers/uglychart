import Animitable from "./Animitable";

class Tween<T> extends Animitable<T> {
  begin: T;
  end: T;
  plus: (a: T, b: T) => T;
  constantMultiply: (constant: number, value: T) => T;
  constructor({
    begin,
    end,
    plus,
    constantMultiply,
  }: {
    begin: T;
    end?: T;
    plus: (a: T, b: T) => T;
    constantMultiply: (constant: number, value: T) => T;
  }) {
    super();
    this.begin = begin;
    this.end = end ?? begin;
    this.plus = plus;
    this.constantMultiply = constantMultiply;
  }

  transform(value: number): T {
    if (value === 0) return this.begin;
    if (value === 1) return this.end;
    return this.lerp(value);
  }

  private lerp(t: number): T {
    return this.plus(
      this.begin,
      this.constantMultiply(
        t,
        this.plus(this.end, this.constantMultiply(-1, this.begin))
      )
    );
  }
}

export default Tween;
