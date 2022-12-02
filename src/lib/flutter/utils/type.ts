export type PaintContext = {
  createSvgEl: (tagName :keyof SVGElementTagNameMap, renderId: string) => SVGElement
  appendSvgEl: (el: SVGElement) => void
  findSvgEl: (key: string) => SVGAElement | undefined | null
}