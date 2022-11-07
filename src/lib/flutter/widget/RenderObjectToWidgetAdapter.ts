import type RenderObject from "../renderobject/RenderObject"
import RenderView from "../renderobject/RenderView"
import RenderObjectWidget from "./RenderObjectWidget"
import type Widget from "./Widget"

class RenderObjectToWidgetAdapter extends RenderObjectWidget {
  constructor({ app }: { app: Widget }) {
    super({ children: [app] })
  }

  createRenderObject(): RenderObject {
      return new RenderView()
  }
}

export default RenderObjectToWidgetAdapter
