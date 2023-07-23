import type Widget from "../widget/Widget";
import BaseGuestureDetector from "./base/BaseGestureDetector";

export default function ColoredBox({
  child,
  onClick,
}: {
  child?: Widget;
  onClick?: () => void;
}) {
  return new BaseGuestureDetector({
    child,
    onClick,
  });
}
