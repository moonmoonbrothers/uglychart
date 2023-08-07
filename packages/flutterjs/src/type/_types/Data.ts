abstract class Data {
  plus(other: Data): Data {
    throw Error("plus is not implemented");
  }

  minus(other: Data): Data {
    return this.plus(other.multiply(-1));
  }

  multiply(value: number): Data {
    throw Error("multiply is not implemented");
  }

  equals(other: Data): boolean {
    throw Error("equals is not implemented");
  }
}

export default Data;
