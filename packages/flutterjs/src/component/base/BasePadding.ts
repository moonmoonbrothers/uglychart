import SingleChildRenderObject from '../../renderobject/SingleChildRenderObject';
import { Size, Offset, EdgeInsets, Constraint } from '../../type';
import SingleChildRenderObjectWidget from '../../widget/SingleChildRenderObjectWidget';
import type Widget from '../../widget/Widget';

export default class Padding extends SingleChildRenderObjectWidget {
	padding: EdgeInsets;
	constructor({ padding = EdgeInsets.all(0), child }: { padding?: EdgeInsets; child?: Widget }) {
		super({ child });
		this.padding = padding;
	}

	createRenderObject(): RenderPadding {
		return new RenderPadding({
			padding: this.padding
		});
	}

	updateRenderObject(renderObject: RenderPadding): void {
		renderObject.padding = this.padding;
	}
}

class RenderPadding extends SingleChildRenderObject {
	padding: EdgeInsets;
	constructor({ padding }: { padding: EdgeInsets }) {
		super({ isPainter: false });
		this.padding = padding;
	}
	protected preformLayout(): void {
		if (this.child == null) return;
		const { top, left, right, bottom } = this.padding;
		const childContraint = new Constraint({
			...this.constraint,
			maxHeight: this.constraint.maxHeight - (top + bottom),
			maxWidth: this.constraint.maxWidth - (left + right)
		});

		this.child.layout(childContraint);
		const { size: childSize } = this.child;

		this.size = this.constraint.constrain(
			new Size({
				width: childSize.width + left + right,
				height: childSize.height + top + bottom
			})
		);

		this.child.offset = new Offset({ x: left, y: top });
	}
}
