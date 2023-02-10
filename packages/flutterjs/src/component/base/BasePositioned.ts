import SingleChildRenderObject from '../../renderobject/SingleChildRenderObject';
import { Size } from '../../type';
import SingleChildRenderObjectWidget from '../../widget/SingleChildRenderObjectWidget';
import type Widget from '../../widget/Widget';

class BasePositioned extends SingleChildRenderObjectWidget {
	top?: number;
	bottom?: number;
	right?: number;
	left?: number;
	constructor({
		top,
		bottom,
		left,
		right,
		child
	}: {
		top?: number;
		bottom?: number;
		left?: number;
		right?: number;
		child?: Widget;
	}) {
		super({ child });
		this.top = top;
		this.bottom = bottom;
		this.left = left;
		this.right = right;
	}

	createRenderObject(): RenderPositioned {
		return new RenderPositioned({ ...this });
	}

	updateRenderObject(renderObject: RenderPositioned): void {
		renderObject.top = this.top;
		renderObject.left = this.left;
		renderObject.bottom = this.bottom;
		renderObject.right = this.right;
	}
}

export class RenderPositioned extends SingleChildRenderObject {
	top?: number;
	bottom?: number;
	right?: number;
	left?: number;
	constructor({
		top,
		bottom,
		left,
		right
	}: {
		top?: number;
		bottom?: number;
		left?: number;
		right?: number;
	}) {
		super({ isPainter: false });
		this.top = top;
		this.bottom = bottom;
		this.left = left;
		this.right = right;
	}

	protected preformLayout(): void {
		let size = Size.zero();
		if (this.child) {
			this.child.layout(this.constraint);
			size = this.child.size;
		}
		this.size = this.constraint.constrain(size);
	}

	override getIntrinsicWidth(): number {
		return this.child?.getIntrinsicWidth() || 0;
	}

	override getIntrinsicHeight(): number {
		return this.child?.getIntrinsicHeight() || 0;
	}
}

export default BasePositioned;