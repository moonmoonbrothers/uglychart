import Element from "../element/Element";
class BuildOwner {
  private onNeedVisualUpdate: () => void;
  private dirtyElements: Element[] = [];
  constructor({ onNeedVisualUpdate }: { onNeedVisualUpdate: () => void }) {
    this.onNeedVisualUpdate = () => onNeedVisualUpdate();
  }

  scheduleFor(elememt: Element) {
    this.dirtyElements.push(elememt);
    this.requestVisualUpdate();
  }

  private requestVisualUpdate() {
    this.onNeedVisualUpdate();
  }

  flushBuild() {
    const dirtyElements = this.dirtyElements;
    this.dirtyElements = [];

    dirtyElements
      .sort((a, b) => a.depth - b.depth)
      .forEach((elememt) => {
        if (!elememt.dirty) return;
        elememt.rebuild();
      });
  }
}

export default BuildOwner;
