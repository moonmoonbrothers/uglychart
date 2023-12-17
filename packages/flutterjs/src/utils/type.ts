export type PaintContext = {
  createSvgEl: (tagName: keyof SVGElementTagNameMap) => SVGElement;
  appendSvgEl: (el: SVGElement) => void;
  findSvgEl: (key: string) => SVGAElement | undefined | null;
  insertSvgEl: (el: SVGElement, index: number) => void;
  setId: (el: SVGElement, id: string) => void;
  isOnBrowser: boolean;
};

export type VoidCallback = () => void;
export type Nullable = undefined | null;
