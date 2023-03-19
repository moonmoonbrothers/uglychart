import type Widget from "../widget/Widget";
import Flex from "./Flex";
import type { MainAxisAlignment, CrossAxisAlignment } from "./base/BaseFlex";

export default function Row({
  children,
  mainAxisAlignment = "start",
  crossAxisAlignment = "center",
}: {
  children: Widget[];
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
}) {
  return Flex({
    children,
    direction: "horizontal",
    mainAxisAlignment,
    crossAxisAlignment,
  });
}
