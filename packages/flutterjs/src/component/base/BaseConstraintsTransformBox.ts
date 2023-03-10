import RenderObject from '../../renderobject/RenderObject';
import SingleChildRenderObject from '../../renderobject/SingleChildRenderObject';
import SingleChildRenderObjectWidget from '../../widget/SingleChildRenderObjectWidget';

class BaseConstraintsTransformBox extends SingleChildRenderObjectWidget {
  static a() {

  }

  createRenderObject(): SingleChildRenderObject {
    throw {}
  }

  updateRenderObject(renderObject: RenderObject): void {
      
  }
}

class RenderConstraintsTransformBox extends BaseConstraintsTransformBox {


}


export default BaseConstraintsTransformBox