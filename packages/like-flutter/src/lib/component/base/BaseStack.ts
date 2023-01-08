import MultiChildRenderObject from '../../renderobject/MultiChildRenderObject';
import { Size } from '../../type';
import Utils from '../../utils';
import MultiChildRenderObjectWidget from '../../widget/MultiChildRenderObjectWidget';
import { RenderPositioned } from './BasePositioned';

export default class BaseStack extends MultiChildRenderObjectWidget {
	createRenderObject(): RenderStack {
		return new RenderStack();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	updateRenderObject(renderObject: RenderStack): void {
		//
	}
}

class RenderStack extends MultiChildRenderObject {
	constructor() {
		super({ isPainter: false });
	}

	protected preformLayout(): void {
		const loosened = this.constraint.loosen();
		const size = Size.zero();
		this.children.forEach((child) => {
			child.layout(loosened);
			size.width = Math.max(child.size.width, size.width);
			size.height = Math.max(child.size.height, size.height);
		});
		this.size = this.constraint.constrain(size);

		this.children.forEach((child) => {
			if (!(child instanceof RenderPositioned)) return;

			if (child.left != null) {
				child.offset.x = child.left;
			} else if (child.right != null) {
				child.offset.x = this.size.width - (child.size.width + child.right);
			}

			if (child.top != null) {
				child.offset.y = child.top;
			} else if (child.bottom != null) {
				child.offset.y = this.size.height - (child.size.height + child.bottom);
			}
		});
	}

	getIntrinsicWidth(): number {
		return this.children.map((child) => child.getIntrinsicWidth()).reduce(Utils.maxReducer, 0);
	}

	getIntrinsicHeight(): number {
		return this.children.map((child) => child.getIntrinsicHeight()).reduce(Utils.maxReducer, 0);
	}
}
