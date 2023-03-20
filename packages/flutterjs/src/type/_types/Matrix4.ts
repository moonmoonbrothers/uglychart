class Matrix4 {
  // 4 x 4 matrix
  storage: Array16;

  static zero(): Matrix4 {
    return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
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
    this.storage = [
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

  /// Sets the diagonal to [arg]
  splatDiagonal(arg: number) {
    this.storage[0] = arg
    this.storage[5] = arg
    this.storage[10] = arg
    this.storage[15] = arg
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
    this.storage[15] = arg15
    this.storage[14] = arg14
    this.storage[13] = arg13
    this.storage[12] = arg12
    this.storage[11] = arg11
    this.storage[10] = arg10
    this.storage[9] = arg9
    this.storage[8] = arg8
    this.storage[7] = arg7
    this.storage[6] = arg6
    this.storage[5] = arg5
    this.storage[4] = arg4
    this.storage[3] = arg3
    this.storage[2] = arg2
    this.storage[1] = arg1
    this.storage[0] = arg0
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
