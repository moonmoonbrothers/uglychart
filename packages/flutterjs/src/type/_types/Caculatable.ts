abstract class Calculatable {
  plus(other: Calculatable): Calculatable {
    throw Error("plus is not implemented");
  }

  minus(other: Calculatable): Calculatable {
    return this.plus(other.multiply(-1));
  }

  multiply(value: number): Calculatable {
    throw Error("multiply is not implemented");
  }

  equals(other: Calculatable): boolean {
    throw Error("equals is not implemented");
  }
}

export default Calculatable;
