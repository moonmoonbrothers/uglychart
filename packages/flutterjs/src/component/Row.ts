import type Widget from "../widget/Widget";
import Flex from "./Flex";
import type {
  MainAxisAlignment,
  CrossAxisAlignment,
  VerticalDirection,
  MainAxisSize,
} from "./base/BaseFlex";

export default function Row({
  children,
  mainAxisAlignment,
  crossAxisAlignment,
  verticalDirection,
  mainAxisSize,
}: {
  children: Widget[];
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  verticalDirection?: VerticalDirection;
  mainAxisSize?: MainAxisSize;
}) {
  return Flex({
    children,
    direction: "horizontal",
    mainAxisAlignment,
    crossAxisAlignment,
    verticalDirection,
    mainAxisSize
  });
}
