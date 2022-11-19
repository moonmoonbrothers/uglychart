import Alignment from "../type/_types/alignment"
import { EdgeInsets, Gap } from "$lib/flutter/type"
import type Widget from "../widget/Widget"
import Align from "./Align"
import BaseGrid, { GridTemplate, type BaseGridProps } from "./base/BaseGrid"
import LimitedBox from "./base/LimitedBox"
import Padding from "./Padding"

function Grid({
  childrenByRow: _childrenByRow,
  alignment = Alignment.center,
  gap = Gap.all(0),
  ...props
}: BaseGridProps & {
  childrenByRow: (Widget | null | undefined)[][]
  alignment?: Alignment
  gap?: Gap
}): BaseGrid {
  const childrenByRow = _childrenByRow.map((children, rowIndex) => {
    return children
      .map((child) => child || new LimitedBox({ width: 0, height: 0 }))
      .map((child, columnIndex) =>
        Padding({
          padding: EdgeInsets.only({
            left: columnIndex === 0 ? 0 : gap.x,
            top: rowIndex === 0 ? 0 : gap.y,
          }),
          child,
        })
      )
      .map((child) => Align({ child: child, alignment }))
  })
  return new BaseGrid({ childrenByRow, ...props })
}

Grid.Fr = GridTemplate.Fr
Grid.ContentFit = GridTemplate.ContentFit
Grid.Percent = GridTemplate.Percent
Grid.Px = GridTemplate.Px

export default Grid
