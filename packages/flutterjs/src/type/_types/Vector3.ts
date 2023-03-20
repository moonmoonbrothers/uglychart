import Vector from "./Vector";

export class Vector3 implements Vector {
  _v3storage: [number, number, number]

  constructor(arg0: number, arg1: number, arg2: number) {
    this._v3storage = [arg0, arg1, arg2];
  }
}

export default Vector3