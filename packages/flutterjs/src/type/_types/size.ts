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

  static maximum(): Size {
    return new Size({ width: Infinity, height: Infinity })
  }

  //depricated because javascript is vernerable for unexpected mutating variable
  static infinite: Size = new Size({ width: Infinity, height: Infinity })

  get shortest() {
    return Math.min(this.width, this.height)
  }

  get longest() {
    return Math.max(this.width, this.height)
  }
}

export default Size
