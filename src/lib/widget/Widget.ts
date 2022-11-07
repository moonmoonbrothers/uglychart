export interface Widget {
  ctx: CanvasRenderingContext2D
  rect: { x: number; y: number; width: number; height: number }
  render(): void
}