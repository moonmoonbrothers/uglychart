import { RenderObjectElement } from "../element";
import type RenderObject from "../renderobject/RenderObject";
import RenderView from "../renderobject/RenderView";
import { RenderContext } from "../runApp";
import { BuildOwner, RenderOwner } from "../scheduler";
import RenderObjectWidget from "./RenderObjectWidget";
import type Widget from "./Widget";

class RenderObjectToWidgetAdapter extends RenderObjectWidget {
  renderOwner: RenderOwner;
  buidlOwner: BuildOwner;
  renderContext: RenderContext;
  constructor({
    app,
    renderOwner,
    buildOwner,
    renderContext,
  }: {
    app: Widget;
    renderOwner: RenderOwner;
    buildOwner: BuildOwner;
    renderContext: RenderContext;
  }) {
    super({ children: [app] });
    this.renderOwner = renderOwner;
    this.buidlOwner = buildOwner;
    this.renderContext = renderContext;
  }

  createElement(): RenderObjectElement {
    const el = super.createElement();
    el.renderContext = this.renderContext;
    el.renderOwner = this.renderOwner;
    el.buildOwner = this.buidlOwner;
    return el;
  }

  createRenderObject(): RenderObject {
    return new RenderView();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateRenderObject(renderObject: RenderObject): void {
    //
  }
}

export default RenderObjectToWidgetAdapter;
