import Element from "../element/Element";
class BuildOwner {
  onBuildSchedule: () => void;
  dirtyElements: Element[] = [];

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
