import {
  type Widget,
  type Alignment,
  ConstraintsTransformBox,
  SizedBox,
} from "@moonmoonbrothers/flutterjs";
export default function IgnoreChildSize({
  ignoreHeight = false,
  ignoreWidth = false,
  child,
  alignment,
}: {
  ignoreWidth?: boolean;
  ignoreHeight?: boolean;
  child?: Widget;
  alignment?: Alignment;
}) {
  return SizedBox({
    width: ignoreWidth ? 0 : undefined,
    height: ignoreHeight ? 0 : undefined,
    child: ConstraintsTransformBox({
      alignment,
      constraintsTransform:
        ignoreWidth && ignoreHeight
          ? ConstraintsTransformBox.maxUnconstrained
          : ignoreWidth
          ? ConstraintsTransformBox.maxWidthUnconstrained
          : ignoreHeight
          ? ConstraintsTransformBox.maxHeightUnconstrained
          : ConstraintsTransformBox.unmodified,
      child: child,
    }),
  });
}
