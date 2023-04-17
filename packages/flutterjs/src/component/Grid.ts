import type Widget from "../widget/Widget";
import BaseGrid, { GridTemplate, type BaseGridProps } from "./base/BaseGrid";

function Grid({
  childrenByRow,
  ...props
}: BaseGridProps & {
  childrenByRow: (Widget | null | undefined)[][];
}): BaseGrid {
  return new BaseGrid({ childrenByRow, ...props });
}

Grid.Fr = GridTemplate.Fr;
Grid.ContentFit = GridTemplate.ContentFit;
Grid.Percent = GridTemplate.Percent;
Grid.Px = GridTemplate.Px;

export default Grid;
