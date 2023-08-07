import Animation from "./Animation";
abstract class Animitable<T> {
  transform(value: number): T {
    throw new Error("transform must be implemented");
  }
  evaluate(animation: Animation<number>): T {
    return this.transform(animation.value);
  }
  animated(animation: Animation<number>): Animation<T> {
    return new AnimatedEvaludation({ parent: animation, animitable: this });
  }
}

class AnimatedEvaludation<T> extends Animation<T> {
  parent: Animation<number>;
  animitable: Animitable<T>;
  constructor({
    animitable,
    parent,
  }: {
    animitable: Animitable<T>;
    parent: Animation<number>;
  }) {
    super();
    this.parent = parent;
    this.animitable = animitable;
  }
  get value(): T {
    return this.animitable.evaluate(this.parent);
  }
}

export default Animitable;
