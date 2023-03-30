import Container from "./Container";
import type Widget from "../widget/Widget";
import SizedBox from "./SizedBox";

// It's different from flutter's implementation
// But behaviors are same
export default function ColoredBox({
  child,
  color,
}: {
  child?: Widget;
  color: string;
}) {
  if (child == null) {
    return SizedBox.shrink();
  }

  return Container({
    child,
    color,
  });
}
