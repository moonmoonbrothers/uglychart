import type Widget from "../widget/Widget";
import Flex from "./Flex";
import type {
  MainAxisAlignment,
  CrossAxisAlignment,
  VerticalDirection,
} from "./base/BaseFlex";

export default function Column({
  children,
  mainAxisAlignment = "start",
  crossAxisAlignment = "center",
  verticalDirection = "down",
}: {
  children: Widget[];
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  verticalDirection?: VerticalDirection;
}) {
  return Flex({
    children,
    direction: "vertical",
    mainAxisAlignment,
    crossAxisAlignment,
    verticalDirection
  });
}
