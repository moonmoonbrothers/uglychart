import BaseAnimatedPositioned from "./base/BaseAnimatedPositioned";

export default function Positioned(
  ...props: ConstructorParameters<typeof BaseAnimatedPositioned>
) {
  return new BaseAnimatedPositioned(...props);
}
