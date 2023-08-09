abstract class Data {
  equals(other: Data): boolean {
    throw new Error("equals not implemented");
  }
}

export default Data;
