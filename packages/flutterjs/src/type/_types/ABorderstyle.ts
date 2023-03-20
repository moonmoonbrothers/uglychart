export type Border = {
  thickness: number
  color: string
}

class BorderStyle {
  top: Border
  left: Border
  bottom: Border
  right: Border
  constructor({
    bottom,
    top,
    left,
    right,
  }: {
    top: Border
    left: Border
    bottom: Border
    right: Border
  }) {
    this.top = top
    this.left = left
    this.right = right
    this.bottom = bottom
  }

  static only({
    top: {
      color: topColor = "black",
      thickness: topThickness = 1,
    } = {
      color: "rgba(0,0,0,0)",
      thickness: 0,
    },
    bottom: {
      color: bottomColor = "black",
      thickness: bottomThickness = 1,
    } = {
      color: "rgba(0,0,0,0)",
      thickness: 0,
    },
    left: {
      color: leftColor = "black",
      thickness: leftThickness = 1,
    } = {
      color: "rgba(0,0,0,0)",
      thickness: 0,
    },
    right: {
      color: rightColor = "black",
      thickness: rightThickness = 1,
    } = {
      color: "rgba(0,0,0,0)",
      thickness: 0,
    },
  }: {
    top?: Partial<Border>
    left?: Partial<Border>
    bottom?: Partial<Border>
    right?: Partial<Border>
  }) {
    return new BorderStyle({
      bottom: {
        color: bottomColor,
        thickness: bottomThickness,
      },
      right: {
        color: rightColor,
        thickness: rightThickness,
      },
      left: {
        color: leftColor,
        thickness: leftThickness,
      },
      top: {
        color: topColor,
        thickness: topThickness,
      },
    })
  }

  static all({ color = "black", thickness = 1 }: Partial<Border>) {
    const value = {
      thickness,
      color,
    }
    return new BorderStyle({
      bottom: value,
      top: value,
      left: value,
      right: value,
    })
  }
}

export default BorderStyle