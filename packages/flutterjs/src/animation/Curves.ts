import {
  linear,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate,
  bounceIn,
  bounceInOut,
  bounceOut,
} from "popmotion";
import Curve from "./Curve";

const transforms = {
  linear,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate,
  bounceIn,
  bounceInOut,
  bounceOut,
};

namespace Curves {
  export const linear = new Curve(transforms.linear);
  export const easeIn = new Curve(transforms.easeIn);
  export const easeInOut = new Curve(transforms.easeInOut);
  export const easeOut = new Curve(transforms.easeOut);
  export const circIn = new Curve(transforms.circIn);
  export const circInOut = new Curve(transforms.circInOut);
  export const circOut = new Curve(transforms.circInOut);
  export const backIn = new Curve(transforms.backIn);
  export const backInOut = new Curve(transforms.backInOut);
  export const backOut = new Curve(transforms.backOut);
  export const anticipate = new Curve(transforms.anticipate);
  export const bounceIn = new Curve(transforms.bounceIn);
  export const bounceInOut = new Curve(transforms.bounceInOut);
  export const bounceOut = new Curve(transforms.bounceOut);
}

export default Curves;