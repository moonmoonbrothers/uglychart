import Vector from "./Vector";

export class Vector2 implements Vector {
  _v2storage: [number, number]

  constructor(arg0: number, arg1: number,) {
    this._v2storage = [arg0, arg1];
  }
}

export default Vector2