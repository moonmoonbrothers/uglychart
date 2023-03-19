import type Widget from "../widget/Widget";
import Flex, {
  type CrossAxisAlignment,
  type MainAxisAlignment,
} from "./base/BaseFlex";

export default function Row({
  children,
  mainAxisAlignment = "start",
  crossAxisAlignment = "center",
}: {
  children: Widget[];
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
}) {
  return new Flex({
    children,
    direction: "row",
    mainAxisAlignment,
    crossAxisAlignment,
  });
}
