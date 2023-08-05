import { animate } from "popmotion";
class AnimationController {
  isAnimating = false;
  status: "dismissed" | "forward" | "reverse" | "completed";
  private _value: number;
  get value() {
    if (this._value == null) throw Error("need to animate first");
    return this._value;
  }
  private set value(val) {
    this._value = val;
  }
  private readonly lowerBound: number;
  private readonly upperBound: number;
  private readonly duration: number;
  private animation: {
    stop: () => void;
  } | null = null;
  constructor({
    duration,
    lowerBound = 0,
    upperBound = 1,
  }: {
    lowerBound?: number;
    upperBound?: number;
    duration: number;
  }) {
    this.duration = duration;
    this.upperBound = upperBound;
    this.lowerBound = lowerBound;
  }

  reset() {
    this.value = this.lowerBound;
  }

  forward({ from }: { from?: number } = {}) {
    if (from != null) {
      this._value = from;
    } else if (this._value == null) {
      this._value = this.lowerBound;
    }
    this.status = "forward";
    this.animate(this.upperBound);
  }
  reverse({ from }: { from?: number } = {}) {
    if (from != null) {
      this._value = from;
    } else if (this._value == null) {
      this._value = this.lowerBound;
    }
    this.status = "reverse";
    this.animate(this.lowerBound);
  }
  repeat({ reverse = false }: { reverse?: boolean } = {}) {
    this._value = this.lowerBound;
    this.animate(this.value, {
      repeatType: reverse ? "reverse" : "loop",
      repeat: Infinity,
    });
  }
  stop() {
    this.animation?.stop();

    if (this.isAnimating) {
      this.status = "dismissed";
    }
  }

  private animate(
    target: number,
    {
      repeat,
      repeatType,
    }: { repeat?: number; repeatType?: "loop" | "reverse" } = {}
  ) {
    if (typeof window === "undefined") return;
    this.animation?.stop();
    this.animation = animate({
      from: this.value,
      to: target,
      duration: this.duration,
      repeat,
      repeatType,
      onPlay: () => {
        this.isAnimating = true;
      },
      onRepeat: () => {},
      onUpdate: (latest) => {
        this.value = latest;
      },
      onComplete: () => {
        this.isAnimating = false;
        this.status = "completed";
      },
    });
  }
}

export default AnimationController;
