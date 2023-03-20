import Matrix2 from "./Matrix2";
import Vector3 from "./Vector3";
import Vector4 from "./Vector4";

class Matrix4 {
  // 4 x 4 matrix
  _m4storage: Array16;

  get dimension() {
    return 4;
  }
  static zero(): Matrix4 {
    return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  static copy(arg: Matrix4): Matrix4 {
    return new Matrix4(...arg._m4storage);
  }

  constructor(
    arg0: number,
    arg1: number,
    arg2: number,
    arg3: number,
    arg4: number,
    arg5: number,
    arg6: number,
    arg7: number,
    arg8: number,
    arg9: number,
    arg10: number,
    arg11: number,
    arg12: number,
    arg13: number,
    arg14: number,
    arg15: number
  ) {
    this._m4storage = [
      arg0,
      arg1,
      arg2,
      arg3,
      arg4,
      arg5,
      arg6,
      arg7,
      arg8,
      arg9,
      arg10,
      arg11,
      arg12,
      arg13,
      arg14,
      arg15,
    ];
  }
  /**

Return index in storage for [row], [col] value.
*/
  index(row: number, col: number): number {
    return col * 4 + row;
  }
  /**

Value at [row], [col].
*/
  entry(row: number, col: number): number {
    if (row < 0 || row >= this.dimension || col < 0 || col >= this.dimension) {
      throw new RangeError("Invalid row/column indices");
    }
    return this._m4storage[this.index(row, col)];
  }
  /**

Set value at [row], [col] to be [v].
*/
  setEntry(row: number, col: number, v: number): void {
    if (row < 0 || row >= this.dimension || col < 0 || col >= this.dimension) {
      throw new RangeError("Invalid row/column indices");
    }
    this._m4storage[this.index(row, col)] = v;
  }

  /// Sets the diagonal to [arg]
  splatDiagonal(arg: number) {
    this._m4storage[0] = arg;
    this._m4storage[5] = arg;
    this._m4storage[10] = arg;
    this._m4storage[15] = arg;
  }

  setValues(
    arg0: number,
    arg1: number,
    arg2: number,
    arg3: number,
    arg4: number,
    arg5: number,
    arg6: number,
    arg7: number,
    arg8: number,
    arg9: number,
    arg10: number,
    arg11: number,
    arg12: number,
    arg13: number,
    arg14: number,
    arg15: number
  ) {
    this._m4storage[15] = arg15;
    this._m4storage[14] = arg14;
    this._m4storage[13] = arg13;
    this._m4storage[12] = arg12;
    this._m4storage[11] = arg11;
    this._m4storage[10] = arg10;
    this._m4storage[9] = arg9;
    this._m4storage[8] = arg8;
    this._m4storage[7] = arg7;
    this._m4storage[6] = arg6;
    this._m4storage[5] = arg5;
    this._m4storage[4] = arg4;
    this._m4storage[3] = arg3;
    this._m4storage[2] = arg2;
    this._m4storage[1] = arg1;
    this._m4storage[0] = arg0;
  }
  /**
   * Sets the entire matrix to the column values.
   */
  setColumns(arg0: Vector4, arg1: Vector4, arg2: Vector4, arg3: Vector4): void {
    const arg0Storage = arg0._v4storage;
    const arg1Storage = arg1._v4storage;
    const arg2Storage = arg2._v4storage;
    const arg3Storage = arg3._v4storage;
    this._m4storage[0] = arg0Storage[0];
    this._m4storage[1] = arg0Storage[1];
    this._m4storage[2] = arg0Storage[2];
    this._m4storage[3] = arg0Storage[3];
    this._m4storage[4] = arg1Storage[0];
    this._m4storage[5] = arg1Storage[1];
    this._m4storage[6] = arg1Storage[2];
    this._m4storage[7] = arg1Storage[3];
    this._m4storage[8] = arg2Storage[0];
    this._m4storage[9] = arg2Storage[1];
    this._m4storage[10] = arg2Storage[2];
    this._m4storage[11] = arg2Storage[3];
    this._m4storage[12] = arg3Storage[0];
    this._m4storage[13] = arg3Storage[1];
    this._m4storage[14] = arg3Storage[2];
    this._m4storage[15] = arg3Storage[3];
  }
  /**

Sets the entire matrix to the matrix in [arg].
*/
  setFrom(arg: Matrix4): void {
    const argStorage = arg._m4storage;
    this._m4storage[15] = argStorage[15];
    this._m4storage[14] = argStorage[14];
    this._m4storage[13] = argStorage[13];
    this._m4storage[12] = argStorage[12];
    this._m4storage[11] = argStorage[11];
    this._m4storage[10] = argStorage[10];
    this._m4storage[9] = argStorage[9];
    this._m4storage[8] = argStorage[8];
    this._m4storage[7] = argStorage[7];
    this._m4storage[6] = argStorage[6];
    this._m4storage[5] = argStorage[5];
    this._m4storage[4] = argStorage[4];
    this._m4storage[3] = argStorage[3];
    this._m4storage[2] = argStorage[2];
    this._m4storage[1] = argStorage[1];
    this._m4storage[0] = argStorage[0];
  }
  //   /// Sets the matrix from translation [arg0] and rotation [arg1].
  // void setFromTranslationRotation(Vector3 arg0, Quaternion arg1) {
  //   final arg1Storage = arg1._qStorage;
  //   final x = arg1Storage[0];
  //   final y = arg1Storage[1];
  //   final z = arg1Storage[2];
  //   final w = arg1Storage[3];
  //   final x2 = x + x;
  //   final y2 = y + y;
  //   final z2 = z + z;
  //   final xx = x * x2;
  //   final xy = x * y2;
  //   final xz = x * z2;
  //   final yy = y * y2;
  //   final yz = y * z2;
  //   final zz = z * z2;
  //   final wx = w * x2;
  //   final wy = w * y2;
  //   final wz = w * z2;

  //   final arg0Storage = arg0._v3storage;
  //   _m4storage[0] = 1.0 - (yy + zz);
  //   _m4storage[1] = xy + wz;
  //   _m4storage[2] = xz - wy;
  //   _m4storage[3] = 0.0;
  //   _m4storage[4] = xy - wz;
  //   _m4storage[5] = 1.0 - (xx + zz);
  //   _m4storage[6] = yz + wx;
  //   _m4storage[7] = 0.0;
  //   _m4storage[8] = xz + wy;
  //   _m4storage[9] = yz - wx;
  //   _m4storage[10] = 1.0 - (xx + yy);
  //   _m4storage[11] = 0.0;
  //   _m4storage[12] = arg0Storage[0];
  //   _m4storage[13] = arg0Storage[1];
  //   _m4storage[14] = arg0Storage[2];
  //   _m4storage[15] = 1.0;
  // }

  // /// Sets the matrix from [translation], [rotation] and [scale].
  // void setFromTranslationRotationScale(
  //     Vector3 translation, Quaternion rotation, Vector3 scale) {
  //   setFromTranslationRotation(translation, rotation);
  //   this.scale(scale);
  // }
  /// Sets the upper 2x2 of the matrix to be [arg].
  public setUpper2x2(arg: Matrix2): void {
    const argStorage = arg._m2storage;
    this._m4storage[0] = argStorage[0];
    this._m4storage[1] = argStorage[1];
    this._m4storage[4] = argStorage[2];
    this._m4storage[5] = argStorage[3];
  }
  /// Sets the diagonal of the matrix to be [arg].
  setDiagonal(arg: Vector4): void {
    const argStorage = arg._v4storage;
    this._m4storage[0] = argStorage[0];
    this._m4storage[5] = argStorage[1];
    this._m4storage[10] = argStorage[2];
    this._m4storage[15] = argStorage[3];
  }
  setOuter(u: Vector4, v: Vector4): void {
    const uStorage = u._v4storage;
    const vStorage = v._v4storage;
    this._m4storage[0] = uStorage[0] * vStorage[0];
    this._m4storage[1] = uStorage[0] * vStorage[1];
    this._m4storage[2] = uStorage[0] * vStorage[2];
    this._m4storage[3] = uStorage[0] * vStorage[3];
    this._m4storage[4] = uStorage[1] * vStorage[0];
    this._m4storage[5] = uStorage[1] * vStorage[1];
    this._m4storage[6] = uStorage[1] * vStorage[2];
    this._m4storage[7] = uStorage[1] * vStorage[3];
    this._m4storage[8] = uStorage[2] * vStorage[0];
    this._m4storage[9] = uStorage[2] * vStorage[1];
    this._m4storage[10] = uStorage[2] * vStorage[2];
    this._m4storage[11] = uStorage[2] * vStorage[3];
    this._m4storage[12] = uStorage[3] * vStorage[0];
    this._m4storage[13] = uStorage[3] * vStorage[1];
    this._m4storage[14] = uStorage[3] * vStorage[2];
    this._m4storage[15] = uStorage[3] * vStorage[3];
  }
  /** Returns row 0 */
  get row0(): Vector4 {
    return this.getRow(0);
  }

  /** Returns row 1 */
  get row1(): Vector4 {
    return this.getRow(1);
  }

  /** Returns row 2 */
  get row2(): Vector4 {
    return this.getRow(2);
  }

  /** Returns row 3 */
  get row3(): Vector4 {
    return this.getRow(3);
  }

  /** Sets row 0 to [arg] */
  set row0(arg: Vector4) {
    this.setRow(0, arg);
  }

  /** Sets row 1 to [arg] */
  set row1(arg: Vector4) {
    this.setRow(1, arg);
  }

  /** Sets row 2 to [arg] */
  set row2(arg: Vector4) {
    this.setRow(2, arg);
  }

  /** Sets row 3 to [arg] */
  set row3(arg: Vector4) {
    this.setRow(3, arg);
  }

  /** Assigns the [row] of the matrix [arg] */
  setRow(row: number, arg: Vector4): void {
    const argStorage = arg._v4storage;
    this._m4storage[this.index(row, 0)] = argStorage[0];
    this._m4storage[this.index(row, 1)] = argStorage[1];
    this._m4storage[this.index(row, 2)] = argStorage[2];
    this._m4storage[this.index(row, 3)] = argStorage[3];
  }

  /** Gets the [row] of the matrix */
  getRow(row: number): Vector4 {
    const r = Vector4.zero();
    const rStorage = r._v4storage;
    rStorage[0] = this._m4storage[this.index(row, 0)];
    rStorage[1] = this._m4storage[this.index(row, 1)];
    rStorage[2] = this._m4storage[this.index(row, 2)];
    rStorage[3] = this._m4storage[this.index(row, 3)];
    return r;
  }
  /**
   * Assigns the [column] of the matrix [arg]
   * @param column the column index
   * @param arg the vector to be assigned
   */
  public setColumn(column: number, arg: Vector4): void {
    const entry = column * 4;
    const argStorage = arg._v4storage;
    this._m4storage[entry + 3] = argStorage[3];
    this._m4storage[entry + 2] = argStorage[2];
    this._m4storage[entry + 1] = argStorage[1];
    this._m4storage[entry + 0] = argStorage[0];
  }

  /**
   * Gets the [column] of the matrix
   * @param column the column index
   * @returns the column as a Vector4
   */
  public getColumn(column: number): Vector4 {
    const r = Vector4.zero();
    const rStorage = r._v4storage;
    const entry = column * 4;
    rStorage[3] = this._m4storage[entry + 3];
    rStorage[2] = this._m4storage[entry + 2];
    rStorage[1] = this._m4storage[entry + 1];
    rStorage[0] = this._m4storage[entry + 0];
    return r;
  }

  /** Clone matrix. */
  public clone(): Matrix4 {
    return Matrix4.copy(this);
  }
  /**
   * Copy into [arg].
   */
  copyInto(arg: Matrix4): Matrix4 {
    const argStorage = arg._m4storage;
    argStorage[0] = this._m4storage[0];
    argStorage[1] = this._m4storage[1];
    argStorage[2] = this._m4storage[2];
    argStorage[3] = this._m4storage[3];
    argStorage[4] = this._m4storage[4];
    argStorage[5] = this._m4storage[5];
    argStorage[6] = this._m4storage[6];
    argStorage[7] = this._m4storage[7];
    argStorage[8] = this._m4storage[8];
    argStorage[9] = this._m4storage[9];
    argStorage[10] = this._m4storage[10];
    argStorage[11] = this._m4storage[11];
    argStorage[12] = this._m4storage[12];
    argStorage[13] = this._m4storage[13];
    argStorage[14] = this._m4storage[14];
    argStorage[15] = this._m4storage[15];
    return arg;
  }

  /**
   * Translate this matrix by a [Vector3], [Vector4], or x,y,z
   * @param x the x coordinate or Vector3/Vector4 to translate by.
   * @param y the y coordinate or undefined if `x` is a Vector3/Vector4.
   * @param z the z coordinate or undefined if `x` is a Vector3/Vector4.
   */
  translate(x: Vector3 | Vector4 | number, y?: number, z?: number): void {
    let tx: number, ty: number, tz: number;
    const tw = x instanceof Vector4 ? x.w : 1.0;
    if (x instanceof Vector3) {
      tx = x.x;
      ty = x.y;
      tz = x.z;
    } else if (x instanceof Vector4) {
      tx = x.x;
      ty = x.y;
      tz = x.z;
    } else if (typeof x === "number") {
      tx = x;
      ty = y || 0.0;
      tz = z || 0.0;
    } else {
      throw new Error("Unsupported argument type.");
    }
    const t1 =
      this._m4storage[0] * tx +
      this._m4storage[4] * ty +
      this._m4storage[8] * tz +
      this._m4storage[12] * tw;
    const t2 =
      this._m4storage[1] * tx +
      this._m4storage[5] * ty +
      this._m4storage[9] * tz +
      this._m4storage[13] * tw;
    const t3 =
      this._m4storage[2] * tx +
      this._m4storage[6] * ty +
      this._m4storage[10] * tz +
      this._m4storage[14] * tw;
    const t4 =
      this._m4storage[3] * tx +
      this._m4storage[7] * ty +
      this._m4storage[11] * tz +
      this._m4storage[15] * tw;
    this._m4storage[12] = t1;
    this._m4storage[13] = t2;
    this._m4storage[14] = t3;
    this._m4storage[15] = t4;
  }
  /**
   * Multiplies this matrix by a translation from the left.
   * The translation can be specified with a [Vector3], [Vector4], or x, y, z.
   */
  leftTranslate(x: Vector3 | Vector4 | number, y = 0.0, z = 0.0): void {
    let tx, ty, tz;
    const tw = x instanceof Vector4 ? x.w : 1.0;

    if (x instanceof Vector3) {
      tx = x.x;
      ty = x.y;
      tz = x.z;
    } else if (x instanceof Vector4) {
      tx = x.x;
      ty = x.y;
      tz = x.z;
    } else if (typeof x === "number") {
      tx = x;
      ty = y;
      tz = z;
    } else {
      throw new Error("Invalid argument type");
    }

    // Column 1
    this._m4storage[0] += tx * this._m4storage[3];
    this._m4storage[1] += ty * this._m4storage[3];
    this._m4storage[2] += tz * this._m4storage[3];
    this._m4storage[3] = tw * this._m4storage[3];

    // Column 2
    this._m4storage[4] += tx * this._m4storage[7];
    this._m4storage[5] += ty * this._m4storage[7];
    this._m4storage[6] += tz * this._m4storage[7];
    this._m4storage[7] = tw * this._m4storage[7];

    // Column 3
    this._m4storage[8] += tx * this._m4storage[11];
    this._m4storage[9] += ty * this._m4storage[11];
    this._m4storage[10] += tz * this._m4storage[11];
    this._m4storage[11] = tw * this._m4storage[11];

    // Column 4
    this._m4storage[12] += tx * this._m4storage[15];
    this._m4storage[13] += ty * this._m4storage[15];
    this._m4storage[14] += tz * this._m4storage[15];
    this._m4storage[15] = tw * this._m4storage[15];
  }
  /**

Rotate this matrix [angle] radians around [axis].
*/
  rotate(axis: Vector3, angle: number): void {
    const len = axis.length;
    const axisStorage = axis._v3storage;
    const x = axisStorage[0] / len;
    const y = axisStorage[1] / len;
    const z = axisStorage[2] / len;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const C = 1.0 - c;
    const m11 = x * x * C + c;
    const m12 = x * y * C - z * s;
    const m13 = x * z * C + y * s;
    const m21 = y * x * C + z * s;
    const m22 = y * y * C + c;
    const m23 = y * z * C - x * s;
    const m31 = z * x * C - y * s;
    const m32 = z * y * C + x * s;
    const m33 = z * z * C + c;
    const t1 =
      this._m4storage[0] * m11 +
      this._m4storage[4] * m21 +
      this._m4storage[8] * m31;
    const t2 =
      this._m4storage[1] * m11 +
      this._m4storage[5] * m21 +
      this._m4storage[9] * m31;
    const t3 =
      this._m4storage[2] * m11 +
      this._m4storage[6] * m21 +
      this._m4storage[10] * m31;
    const t4 =
      this._m4storage[3] * m11 +
      this._m4storage[7] * m21 +
      this._m4storage[11] * m31;
    const t5 =
      this._m4storage[0] * m12 +
      this._m4storage[4] * m22 +
      this._m4storage[8] * m32;
    const t6 =
      this._m4storage[1] * m12 +
      this._m4storage[5] * m22 +
      this._m4storage[9] * m32;
    const t7 =
      this._m4storage[2] * m12 +
      this._m4storage[6] * m22 +
      this._m4storage[10] * m32;
    const t8 =
      this._m4storage[3] * m12 +
      this._m4storage[7] * m22 +
      this._m4storage[11] * m32;
    const t9 =
      this._m4storage[0] * m13 +
      this._m4storage[4] * m23 +
      this._m4storage[8] * m33;
    const t10 =
      this._m4storage[1] * m13 +
      this._m4storage[5] * m23 +
      this._m4storage[9] * m33;
    const t11 =
      this._m4storage[2] * m13 +
      this._m4storage[6] * m23 +
      this._m4storage[10] * m33;
    const t12 =
      this._m4storage[3] * m13 +
      this._m4storage[7] * m23 +
      this._m4storage[11] * m33;

    this._m4storage[0] = t1;
    this._m4storage[1] = t2;
    this._m4storage[2] = t3;
    this._m4storage[3] = t4;
    this._m4storage[4] = t5;
    this._m4storage[5] = t6;
    this._m4storage[6] = t7;
    this._m4storage[7] = t8;
    this._m4storage[8] = t9;
    this._m4storage[9] = t10;
    this._m4storage[10] = t11;
    this._m4storage[11] = t12;
  }
  /// Rotate this [angle] radians around X
  rotateX(angle: number): void {
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const t1 = this._m4storage[4] * cosAngle + this._m4storage[8] * sinAngle;
    const t2 = this._m4storage[5] * cosAngle + this._m4storage[9] * sinAngle;
    const t3 = this._m4storage[6] * cosAngle + this._m4storage[10] * sinAngle;
    const t4 = this._m4storage[7] * cosAngle + this._m4storage[11] * sinAngle;
    const t5 = this._m4storage[4] * -sinAngle + this._m4storage[8] * cosAngle;
    const t6 = this._m4storage[5] * -sinAngle + this._m4storage[9] * cosAngle;
    const t7 = this._m4storage[6] * -sinAngle + this._m4storage[10] * cosAngle;
    const t8 = this._m4storage[7] * -sinAngle + this._m4storage[11] * cosAngle;
    this._m4storage[4] = t1;
    this._m4storage[5] = t2;
    this._m4storage[6] = t3;
    this._m4storage[7] = t4;
    this._m4storage[8] = t5;
    this._m4storage[9] = t6;
    this._m4storage[10] = t7;
    this._m4storage[11] = t8;
  }
  /**
   * Rotate this matrix [angle] radians around Y
   */
  rotateY(angle: number): void {
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const t1 = this._m4storage[0] * cosAngle + this._m4storage[8] * -sinAngle;
    const t2 = this._m4storage[1] * cosAngle + this._m4storage[9] * -sinAngle;
    const t3 = this._m4storage[2] * cosAngle + this._m4storage[10] * -sinAngle;
    const t4 = this._m4storage[3] * cosAngle + this._m4storage[11] * -sinAngle;
    const t5 = this._m4storage[0] * sinAngle + this._m4storage[8] * cosAngle;
    const t6 = this._m4storage[1] * sinAngle + this._m4storage[9] * cosAngle;
    const t7 = this._m4storage[2] * sinAngle + this._m4storage[10] * cosAngle;
    const t8 = this._m4storage[3] * sinAngle + this._m4storage[11] * cosAngle;
    this._m4storage[0] = t1;
    this._m4storage[1] = t2;
    this._m4storage[2] = t3;
    this._m4storage[3] = t4;
    this._m4storage[8] = t5;
    this._m4storage[9] = t6;
    this._m4storage[10] = t7;
    this._m4storage[11] = t8;
  }

  /**
   * Rotate this matrix [angle] radians around Z
   */
  rotateZ(angle: number): void {
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const t1 = this._m4storage[0] * cosAngle + this._m4storage[4] * sinAngle;
    const t2 = this._m4storage[1] * cosAngle + this._m4storage[5] * sinAngle;
    const t3 = this._m4storage[2] * cosAngle + this._m4storage[6] * sinAngle;
    const t4 = this._m4storage[3] * cosAngle + this._m4storage[7] * sinAngle;
    const t5 = this._m4storage[0] * -sinAngle + this._m4storage[4] * cosAngle;
    const t6 = this._m4storage[1] * -sinAngle + this._m4storage[5] * cosAngle;
    const t7 = this._m4storage[2] * -sinAngle + this._m4storage[6] * cosAngle;
    const t8 = this._m4storage[3] * -sinAngle + this._m4storage[7] * cosAngle;
    this._m4storage[0] = t1;
    this._m4storage[1] = t2;
    this._m4storage[2] = t3;
    this._m4storage[3] = t4;
    this._m4storage[4] = t5;
    this._m4storage[5] = t6;
    this._m4storage[6] = t7;
    this._m4storage[7] = t8;
  }
  /**
   * Scale this matrix by a Vector3, Vector4, or x,y,z
   */
  public scale(x: Vector3 | Vector4 | number, y?: number, z?: number): void {
    let sx: number;
    let sy: number;
    let sz: number;
    const sw = x instanceof Vector4 ? x.w : 1.0;
    if (x instanceof Vector3) {
      sx = x.x;
      sy = x.y;
      sz = x.z;
    } else if (x instanceof Vector4) {
      sx = x.x;
      sy = x.y;
      sz = x.z;
    } else if (typeof x === "number") {
      sx = x;
      sy = y ?? x;
      sz = z ?? x;
    } else {
      throw new Error("Unsupported type for scale operation");
    }
    this._m4storage[0] *= sx;
    this._m4storage[1] *= sx;
    this._m4storage[2] *= sx;
    this._m4storage[3] *= sx;
    this._m4storage[4] *= sy;
    this._m4storage[5] *= sy;
    this._m4storage[6] *= sy;
    this._m4storage[7] *= sy;
    this._m4storage[8] *= sz;
    this._m4storage[9] *= sz;
    this._m4storage[10] *= sz;
    this._m4storage[11] *= sz;
    this._m4storage[12] *= sw;
    this._m4storage[13] *= sw;
    this._m4storage[14] *= sw;
    this._m4storage[15] *= sw;
  }
  /**
   * Create a copy of this scaled by a [Vector3], [Vector4] or [x],[y], and [z].
   */
  public scaled(
    x: Vector3 | Vector4 | number,
    y?: number,
    z?: number
  ): Matrix4 {
    const result = this.clone();
    result.scale(x, y, z);
    return result;
  }
  /// Zeros this.
  setZero() {
    this._m4storage[0] = 0.0;
    this._m4storage[1] = 0.0;
    this._m4storage[2] = 0.0;
    this._m4storage[3] = 0.0;
    this._m4storage[4] = 0.0;
    this._m4storage[5] = 0.0;
    this._m4storage[6] = 0.0;
    this._m4storage[7] = 0.0;
    this._m4storage[8] = 0.0;
    this._m4storage[9] = 0.0;
    this._m4storage[10] = 0.0;
    this._m4storage[11] = 0.0;
    this._m4storage[12] = 0.0;
    this._m4storage[13] = 0.0;
    this._m4storage[14] = 0.0;
    this._m4storage[15] = 0.0;
  }

  /// Makes this into the identity matrix.
  setIdentity() {
    this._m4storage[0] = 1.0;
    this._m4storage[1] = 0.0;
    this._m4storage[2] = 0.0;
    this._m4storage[3] = 0.0;
    this._m4storage[4] = 0.0;
    this._m4storage[5] = 1.0;
    this._m4storage[6] = 0.0;
    this._m4storage[7] = 0.0;
    this._m4storage[8] = 0.0;
    this._m4storage[9] = 0.0;
    this._m4storage[10] = 1.0;
    this._m4storage[11] = 0.0;
    this._m4storage[12] = 0.0;
    this._m4storage[13] = 0.0;
    this._m4storage[14] = 0.0;
    this._m4storage[15] = 1.0;
  }
  /// Returns the transpose of this.
  transposed(): Matrix4 {
    const result = this.clone();
    result.transpose();
    return result;
  }

  transpose(): void {
    let temp: number;
    temp = this._m4storage[4];
    this._m4storage[4] = this._m4storage[1];
    this._m4storage[1] = temp;
    temp = this._m4storage[8];
    this._m4storage[8] = this._m4storage[2];
    this._m4storage[2] = temp;
    temp = this._m4storage[12];
    this._m4storage[12] = this._m4storage[3];
    this._m4storage[3] = temp;
    temp = this._m4storage[9];
    this._m4storage[9] = this._m4storage[6];
    this._m4storage[6] = temp;
    temp = this._m4storage[13];
    this._m4storage[13] = this._m4storage[7];
    this._m4storage[7] = temp;
    temp = this._m4storage[14];
    this._m4storage[14] = this._m4storage[11];
    this._m4storage[11] = temp;
  }

  /**
   * Returns the component wise absolute value of this.
   */
  public absolute(): Matrix4 {
    const r = Matrix4.zero();
    const rStorage = r._m4storage;
    rStorage[0] = Math.abs(this._m4storage[0]);
    rStorage[1] = Math.abs(this._m4storage[1]);
    rStorage[2] = Math.abs(this._m4storage[2]);
    rStorage[3] = Math.abs(this._m4storage[3]);
    rStorage[4] = Math.abs(this._m4storage[4]);
    rStorage[5] = Math.abs(this._m4storage[5]);
    rStorage[6] = Math.abs(this._m4storage[6]);
    rStorage[7] = Math.abs(this._m4storage[7]);
    rStorage[8] = Math.abs(this._m4storage[8]);
    rStorage[9] = Math.abs(this._m4storage[9]);
    rStorage[10] = Math.abs(this._m4storage[10]);
    rStorage[11] = Math.abs(this._m4storage[11]);
    rStorage[12] = Math.abs(this._m4storage[12]);
    rStorage[13] = Math.abs(this._m4storage[13]);
    rStorage[14] = Math.abs(this._m4storage[14]);
    rStorage[15] = Math.abs(this._m4storage[15]);
    return r;
  }
  determinant(): number {
    const det2_01_01 =
      this._m4storage[0] * this._m4storage[5] -
      this._m4storage[1] * this._m4storage[4];
    const det2_01_02 =
      this._m4storage[0] * this._m4storage[6] -
      this._m4storage[2] * this._m4storage[4];
    const det2_01_03 =
      this._m4storage[0] * this._m4storage[7] -
      this._m4storage[3] * this._m4storage[4];
    const det2_01_12 =
      this._m4storage[1] * this._m4storage[6] -
      this._m4storage[2] * this._m4storage[5];
    const det2_01_13 =
      this._m4storage[1] * this._m4storage[7] -
      this._m4storage[3] * this._m4storage[5];
    const det2_01_23 =
      this._m4storage[2] * this._m4storage[7] -
      this._m4storage[3] * this._m4storage[6];
    const det3_201_012 =
      this._m4storage[8] * det2_01_12 -
      this._m4storage[9] * det2_01_02 +
      this._m4storage[10] * det2_01_01;
    const det3_201_013 =
      this._m4storage[8] * det2_01_13 -
      this._m4storage[9] * det2_01_03 +
      this._m4storage[11] * det2_01_01;
    const det3_201_023 =
      this._m4storage[8] * det2_01_23 -
      this._m4storage[10] * det2_01_03 +
      this._m4storage[11] * det2_01_02;
    const det3_201_123 =
      this._m4storage[9] * det2_01_23 -
      this._m4storage[10] * det2_01_13 +
      this._m4storage[11] * det2_01_12;
    return (
      -det3_201_123 * this._m4storage[12] +
      det3_201_023 * this._m4storage[13] -
      det3_201_013 * this._m4storage[14] +
      det3_201_012 * this._m4storage[15]
    );
  }
  /** Returns the dot product of row [i] and [v]. */
  dotRow(i: number, v: Vector4): number {
    const vStorage = v._v4storage;
    return (
      this._m4storage[i] * vStorage[0] +
      this._m4storage[4 + i] * vStorage[1] +
      this._m4storage[8 + i] * vStorage[2] +
      this._m4storage[12 + i] * vStorage[3]
    );
  }

  /** Returns the dot product of column [j] and [v]. */
  dotColumn(j: number, v: Vector4): number {
    const vStorage = v._v4storage;
    return (
      this._m4storage[j * 4] * vStorage[0] +
      this._m4storage[j * 4 + 1] * vStorage[1] +
      this._m4storage[j * 4 + 2] * vStorage[2] +
      this._m4storage[j * 4 + 3] * vStorage[3]
    );
  }

  /** Returns the trace of the matrix. The trace of a matrix is the sum of the diagonal entries. */
  trace(): number {
    let t = 0.0;
    t += this._m4storage[0];
    t += this._m4storage[5];
    t += this._m4storage[10];
    t += this._m4storage[15];
    return t;
  }
  /**
   * Returns infinity norm of the matrix. Used for numerical analysis.
   */
  infinityNorm(): number {
    let norm = 0.0;
    {
      let row_norm = 0.0;
      row_norm += Math.abs(this._m4storage[0]);
      row_norm += Math.abs(this._m4storage[1]);
      row_norm += Math.abs(this._m4storage[2]);
      row_norm += Math.abs(this._m4storage[3]);
      norm = row_norm > norm ? row_norm : norm;
    }
    {
      let row_norm = 0.0;
      row_norm += Math.abs(this._m4storage[4]);
      row_norm += Math.abs(this._m4storage[5]);
      row_norm += Math.abs(this._m4storage[6]);
      row_norm += Math.abs(this._m4storage[7]);
      norm = row_norm > norm ? row_norm : norm;
    }
    {
      let row_norm = 0.0;
      row_norm += Math.abs(this._m4storage[8]);
      row_norm += Math.abs(this._m4storage[9]);
      row_norm += Math.abs(this._m4storage[10]);
      row_norm += Math.abs(this._m4storage[11]);
      norm = row_norm > norm ? row_norm : norm;
    }
    {
      let row_norm = 0.0;
      row_norm += Math.abs(this._m4storage[12]);
      row_norm += Math.abs(this._m4storage[13]);
      row_norm += Math.abs(this._m4storage[14]);
      row_norm += Math.abs(this._m4storage[15]);
      norm = row_norm > norm ? row_norm : norm;
    }
    return norm;
  }
  /// Returns relative error between this and [correct]
  relativeError(correct: Matrix4): number {
    const diff = correct.subtract(this);
    const correct_norm = correct.infinityNorm();
    const diff_norm = diff.infinityNorm();
    return diff_norm / correct_norm;
  }
  /**
   * Returns absolute error between this and [correct]
   */
  public absoluteError(correct: Matrix4): number {
    const thisNorm = this.infinityNorm();
    const correctNorm = correct.infinityNorm();
    const diffNorm = Math.abs(thisNorm - correctNorm);
    return diffNorm;
  }
  getTranslation(): Vector3 {
    const z = this._m4storage[14];
    const y = this._m4storage[13];
    const x = this._m4storage[12];
    return new Vector3(x, y, z);
  }
  /// Sets the translation vector in this homogeneous transformation matrix.
  setTranslation(t: Vector3): void {
    const tStorage = t._v3storage;
    const z = tStorage[2];
    const y = tStorage[1];
    const x = tStorage[0];
    this._m4storage[14] = z;
    this._m4storage[13] = y;
    this._m4storage[12] = x;
  }
}

type Array16 = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

export default Matrix4;
