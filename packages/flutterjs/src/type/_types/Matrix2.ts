class Matrix2 {
  get storage() {
    return this._m2storage
  }
  _m2storage: Array9
}

export default Matrix2

type Array9 = [
  number,
  number,
  number,
  number,
];
