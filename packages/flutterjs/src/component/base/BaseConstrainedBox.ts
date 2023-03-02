import SingleChildRenderObject from '../../renderobject/SingleChildRenderObject';
import { Size, Constraint } from '../../type';
import SingleChildRenderObjectWidget from '../../widget/SingleChildRenderObjectWidget';
import type Widget from '../../widget/Widget';

class BaseConstraintBox extends SingleChildRenderObjectWidget {
	constraint: Constraint;
	constructor({ child, constraint }: { child?: Widget; constraint: Constraint }) {
		super({ child });
		this.constraint = constraint;
	}

	createRenderObject(): SingleChildRenderObject {
		return new RenderConstraintBox({ constraint: this.constraint });
	}

	updateRenderObject(renderObject: RenderConstraintBox): void {
		renderObject.constraint = this.constraint;
	}
}

class RenderConstraintBox extends SingleChildRenderObject {
	additionalConstraint: Constraint;
	constructor({ constraint }: { constraint: Constraint }) {
		super({ isPainter: false });
		this.additionalConstraint = constraint;
	}

	protected override preformLayout(): void {
		this.constraint = this.additionalConstraint.enforce(this.constraint);
		let size = Size.zero();
		if (this.child != null) {
			this.child.layout(this.constraint);
			size = this.child.size;
		}
		this.size = this.constraint.constrain(size);
	}

	override getIntrinsicHeight(): number {
		if (this.additionalConstraint.hasTightHeight) return this.additionalConstraint.minHeight;
		return Math.max(this.additionalConstraint.minHeight, this.child?.getIntrinsicHeight() || 0);
	}

	override getIntrinsicWidth(): number {
		if (this.additionalConstraint.hasTightWidth) return this.additionalConstraint.minWidth;
		return Math.max(this.additionalConstraint.minWidth, this.child?.getIntrinsicWidth() || 0);
	}
}

export default BaseConstraintBox;
