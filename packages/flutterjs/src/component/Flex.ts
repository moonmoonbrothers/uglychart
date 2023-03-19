import type Widget from "../widget/Widget";
import BaseFlex, {
  type CrossAxisAlignment,
  type MainAxisAlignment,
  type Axis,
} from "./base/BaseFlex";

export default function Flex({
  children,
  mainAxisAlignment = "start",
  crossAxisAlignment = "center",
  direction,
}: {
  children: Widget[];
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  direction: Axis,
}) {
  return new BaseFlex({
    children,
    direction,
    mainAxisAlignment,
    crossAxisAlignment,
  });
}
