import MultiChildRenderObject from "$lib/flutter/renderobject/MultiChildRenderObject"
import type RenderObject from "$lib/flutter/renderobject/RenderObject"
import { Constraint, Size, Offset } from "$lib/flutter/type"
import MultiChildRenderObjectWidget from "$lib/flutter/widget/MultiChildRenerObjectWidget"
import type Widget from "$lib/flutter/widget/Widget"

export type BaseGridProps = {
  templateRows?: GridTemplate[]
  templateColumns?: GridTemplate[]
  autoColumn?: GridTemplate
  autoRow?: GridTemplate
}

class BaseGrid extends MultiChildRenderObjectWidget {
  templateRows: GridTemplate[]
  templateColumns: GridTemplate[]
  autoColumn: GridTemplate
  autoRow: GridTemplate
  columnCounts: number[]
  constructor({
    templateColumns = [],
    templateRows = [],
    autoColumn = GridTemplate.Fr(1),
    autoRow = GridTemplate.Fr(1),
    childrenByRow,
  }: BaseGridProps & {
    childrenByRow: Widget[][]
  }) {
    super({ children: childrenByRow.flat() })
    this.columnCounts = childrenByRow.map((children) => children.length)
    this.templateRows = templateRows
    this.templateColumns = templateColumns
    this.autoColumn = autoColumn
    this.autoRow = autoRow
  }

  override createRenderObject(): RenderBaseGrid {
    return new RenderBaseGrid({ ...this })
  }
}

class RenderBaseGrid extends MultiChildRenderObject {
  templateRows: GridTemplate[]
  templateColumns: GridTemplate[]
  autoColumn: GridTemplate
  autoRow: GridTemplate
  columnCounts: number[] // describe column count per row, example) [3,3,3,2]
  constructor({
    templateColumns,
    templateRows,
    autoColumn,
    autoRow,
    columnCounts,
  }: Required<BaseGridProps> & { columnCounts: number[] }) {
    super()
    this.columnCounts = columnCounts
    this.templateRows = templateRows
    this.templateColumns = templateColumns
    this.autoColumn = autoColumn
    this.autoRow = autoRow
  }

  private get rowCount(): number {
    return this.columnCounts.length
  }

  private get columnCount(): number {
    return this.columnCounts.reduce((acc, current) => Math.max(acc, current), 0)
  }

  private get childrenByRow(): RenderObject[][] {
    /*
      children's length must be same with columnCounts sum.
    */
    let previous = 0
    return this.columnCounts.map((current) => {
      const result = this.children.slice(previous, previous + current)
      previous += current
      return result
    })
  }

  private get columns(): GridTemplate[] {
    return Array.from(
      { length: this.columnCount },
      (_, i) => this.templateColumns[i] ?? this.autoColumn
    )
  }

  private get rows(): GridTemplate[] {
    return Array.from(
      { length: this.rowCount },
      (_, i) => this.templateRows[i] ?? this.autoRow
    )
  }

  protected preformLayout(): void {
    // stretch to fit parent
    this.size = this.constraint.constrain(Size.infinite)

    const contentFitColumnWidths: number[] = Array.from(
      { length: this.columnCount },
      () => 0
    )
    const contentFitRowHeights: number[] = Array.from(
      { length: this.rowCount },
      () => 0
    )

    this.childrenByRow.forEach((columnChildren, rowIndex) => {
      columnChildren.forEach((child, columnIndex) => {
        if (this.columns[columnIndex].type === "content-fit") {
          contentFitColumnWidths[columnIndex] = Math.max(
            child.getIntrinsicWidth(),
            contentFitColumnWidths[columnIndex]
          )
        }

        if (this.rows[rowIndex].type === "content-fit") {
          contentFitRowHeights[rowIndex] = Math.max(
            child.getIntrinsicHeight(),
            contentFitRowHeights[rowIndex]
          )
        }
      })
    })

    const fixedColumnWidths: number[] = this.columns.map(
      ({ type, value }, i) => {
        let result = 0
        if (type === "content-fit") {
          result = contentFitColumnWidths[i]
        } else if (type === "px") {
          result = value
        } else if (type === "percent") {
          result = (value / 100) * this.size.width
        }

        return result
      }
    )

    const fixedRowHeights: number[] = this.rows.map(({ type, value }, i) => {
      let result = 0
      if (type === "content-fit") {
        result = contentFitRowHeights[i]
      } else if (type === "px") {
        result = value
      } else if (type === "percent") {
        result = (value / 100) * this.size.height
      }

      return result
    })

    const sum = (acc: number, value: number) => acc + value
    const totalFrOnWidth = this.columns
      .filter(({ type }) => type === "fr")
      .map(({ value }) => value)
      .reduce(sum, 0)
    const totalFixedWidth = fixedColumnWidths.reduce(sum, 0)
    const frUnitOnWidth = (this.size.width - totalFixedWidth) / totalFrOnWidth
    const widths = this.columns.map(({ type, value }, i) => {
      let result = 0
      if (type === "fr") {
        result = value * frUnitOnWidth
      } else {
        result = fixedColumnWidths[i]
      }
      return result
    })

    const totalFrOnHeight = this.rows
      .filter(({ type }) => type === "fr")
      .map(({ value }) => value)
      .reduce(sum, 0)
    const totalFixedHeight = fixedRowHeights.reduce(sum, 0)
    const frUnitOnHieght =
      (this.size.height - totalFixedHeight) / totalFrOnHeight
    const heights = this.rows.map(({ type, value }, i) => {
      let result = 0
      if (type === "fr") {
        result = value * frUnitOnHieght
      } else {
        result = fixedRowHeights[i]
      }
      return result
    })

    this.childrenByRow.forEach((columnChildren, rowIndex) => {
      columnChildren.forEach((child, columnIndex) => {
        const childConstraint = new Constraint({
          ...this.constraint,
          maxHeight: heights[rowIndex],
          maxWidth: widths[columnIndex],
        })

        child.layout(childConstraint)

        child.offset = new Offset({
          x: widths.slice(0, columnIndex).reduce(sum, 0),
          y: heights.slice(0, rowIndex).reduce(sum, 0),
        })
      })
    })
  }
}

export class GridTemplate {
  type: "px" | "percent" | "fr" | "content-fit"
  value: number
  constructor({
    type,
    value,
  }: {
    value: number
    type: "px" | "percent" | "fr" | "content-fit"
  }) {
    this.type = type
    this.value = value
  }

  static Fr(value: number) {
    return new GridTemplate({ value, type: "fr" })
  }

  static Px(value: number) {
    return new GridTemplate({ value, type: "px" })
  }

  static ContentFit() {
    return new GridTemplate({ value: 0, type: "content-fit" })
  }

  // 0 ~ 100
  static Percent(value: number) {
    return new GridTemplate({ value, type: "percent" })
  }

  repeat(count: number): GridTemplate[] {
    return Array.from({ length: count }, () => this)
  }
}

export default BaseGrid
