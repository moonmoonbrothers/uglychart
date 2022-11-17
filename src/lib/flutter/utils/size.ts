/* eslint-disable @typescript-eslint/no-unused-vars */
type SizeProps = {
  width: number
  height: number
}

class Size {
  width: number
  height: number
  constructor({ width, height }: SizeProps) {
    this.width = width
    this.height = height
  }

  static zero(): Size {
    return new Size({ width: 0, height: 0 })
  }

  //depricated
  static maximum(): Size {
    return new Size({ width: Infinity, height: Infinity })
  }

  static infinite: Size = new Size({ width: Infinity, height: Infinity })

  get shortest() {
    return Math.min(this.width, this.height)
  }

  get longest() {
    return Math.max(this.width, this.height)
  }
}

export default Size
