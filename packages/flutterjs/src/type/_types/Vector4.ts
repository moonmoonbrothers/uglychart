import Vector from "./Vector";
import Vector2 from "./Vector2";
import Vector3 from "./Vector3";

export  class Vector4 implements Vector {
  _v4storage: [number, number, number, number];

  set xy(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[1] = argStorage[1];
  }
  set xz(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[2] = argStorage[1];
  }
  set xw(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[3] = argStorage[1];
  }
  set yx(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[0] = argStorage[1];
  }
  set yz(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[2] = argStorage[1];
  }
  set yw(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[3] = argStorage[1];
  }
  set zx(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[0] = argStorage[1];
  }
  set zy(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[1] = argStorage[1];
  }
  set zw(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[3] = argStorage[1];
  }
  set wx(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[0] = argStorage[1];
  }

  set wy(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[1] = argStorage[1];
  }

  set wz(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[2] = argStorage[1];
  }

  set xyz(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[1] = argStorage[1];
    this._v4storage[2] = argStorage[2];
  }

  set xyw(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[1] = argStorage[1];
    this._v4storage[3] = argStorage[2];
  }

  set xzy(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[2] = argStorage[1];
    this._v4storage[1] = argStorage[2];
  }

  set xzw(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[2] = argStorage[1];
    this._v4storage[3] = argStorage[2];
  }

  set xwy(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[3] = argStorage[1];
    this._v4storage[1] = argStorage[2];
  }

  set xwz(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[3] = argStorage[1];
    this._v4storage[2] = argStorage[2];
  }

  set yxz(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[0] = argStorage[1];
    this._v4storage[2] = argStorage[2];
  }

  set yxw(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[0] = argStorage[1];
    this._v4storage[3] = argStorage[2];
  }

  set yzx(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[2] = argStorage[1];
    this._v4storage[0] = argStorage[2];
  }

  set r(arg: number) {
    this.x = arg;
  }
  set g(arg: number) {
    this.y = arg;
  }
  set b(arg: number) {
    this.z = arg;
  }
  set a(arg: number) {
    this.w = arg;
  }
  set s(arg: number) {
    this.x = arg;
  }
  set t(arg: number) {
    this.y = arg;
  }
  set p(arg: number) {
    this.z = arg;
  }
  set q(arg: number) {
    this.w = arg;
  }
  set x(arg: number) {
    this._v4storage[0] = arg;
  }
  set y(arg: number) {
    this._v4storage[1] = arg;
  }
  set z(arg: number) {
    this._v4storage[2] = arg;
  }
  set w(arg: number) {
    this._v4storage[3] = arg;
  }
}

export default Vector4