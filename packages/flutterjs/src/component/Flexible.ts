import type Widget from "../widget/Widget";
import _Flexible from "./base/BaseFlexible";
import {} from "../../src/utils";

export default function Flexible({
  child,
  flex = 1,
  fit = "loose",
}: {
  child?: Widget;
  flex?: number;
  fit?: "loose" | "tight";
} = {}) {
  return new _Flexible({
    child,
    fit,
    flex,
  });
}
