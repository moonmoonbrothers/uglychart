import Data from "./data";
abstract class Calculatable extends Data {
  plus(other: Calculatable): Calculatable {
    throw Error("plus is not implemented");
  }

  minus(other: Calculatable): Calculatable {
    return this.plus(other.multiply(-1));
  }

  multiply(value: number): Calculatable {
    throw Error("multiply is not implemented");
  }
}

export default Calculatable;
