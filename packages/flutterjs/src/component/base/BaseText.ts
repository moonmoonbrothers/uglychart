import { getTextHeight, getTextWidth } from '../../utils';
import RenderObject from '../../renderobject/RenderObject';
import { Size } from '../../type';
import type { PaintContext } from '../../utils/type';
import RenderObjectWidget from '../../widget/RenderObjectWidget';

type TextAlign = 'middle' | 'end' | 'start';
type TextBaseline =
	| 'text-before-edge'
	| 'text-after-edge'
	| 'alphabetic'
	| 'ideographic'
	| 'middle'
	| 'hanging'
	| 'top'
	| 'bottom';
type TextStyle = {
	fontFamily: string;
	fontSize: string;
	fontWeight: string;
	fontColor: string;
};

export type TextProps = {
	style?: Partial<TextStyle>;
	textAlign?: TextAlign;
	textBaseline?: TextBaseline;
};

class Text extends RenderObjectWidget {
	text: string;
	style: TextStyle;
	textAlign: TextAlign;
	textBaseline: TextBaseline;
	constructor(
		text: string,
		{
			textAlign = 'start',
			textBaseline = 'text-before-edge',
			style: {
				fontFamily = 'serif',
				fontSize = '16px',
				fontWeight = 'normal',
				fontColor = 'black'
			} = {}
		}: TextProps
	) {
		super({ children: [] });
		this.text = text;
		this.style = { fontColor, fontFamily, fontSize, fontWeight };
		(this.textAlign = textAlign), (this.textBaseline = textBaseline);
	}

	createRenderObject(): RenderObject {
		return new RenderText({
			text: this.text,
			style: this.style,
			textAlign: this.textAlign,
			textBaseline: this.textBaseline
		});
	}

	updateRenderObject(renderObject: RenderText): void {
		renderObject.text = this.text;
		renderObject.style = this.style;
		renderObject.textAlign = this.textAlign;
		renderObject.textBaseline = this.textBaseline;
	}
}

class RenderText extends RenderObject {
	text: string;
	textBaseline: TextBaseline;
	textAlign: TextAlign;
	style: TextStyle;
	constructor({
		text,
		textAlign,
		textBaseline,
		style
	}: {
		text: string;
		textBaseline: TextBaseline;
		textAlign: TextAlign;
		style: TextStyle;
	}) {
		super({ isPainter: true });
		this.text = text;
		this.style = style;
		this.textBaseline = textBaseline;
		this.textAlign = textAlign;
	}
	get font(): string {
		const { fontWeight, fontSize, fontFamily } = this.style;
		return `${fontWeight} ${fontSize} ${fontFamily}`;
	}

	protected performPaint({ text: textEl }: { [key: string]: SVGElement }): void {
		const { fontFamily, fontColor, fontSize, fontWeight } = this.style;
		textEl.setAttribute('id', this.id);
		textEl.setAttribute('text-anchor', this.textAlign);
		textEl.setAttribute('alignment-baseline', this.textBaseline);
		textEl.setAttribute('fill', fontColor);
		textEl.setAttribute('font-size', fontSize);
		textEl.setAttribute('font-family', fontFamily);
		textEl.setAttribute('font-weight', fontWeight);
		textEl.textContent = this.text;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected preformLayout(): void {
		const size = new Size({
			width: getTextWidth({ text: this.text, font: this.font }),
			height: getTextHeight({ text: this.text, font: this.font })
		});
		this.size = size;
	}

	override getIntrinsicHeight(): number {
		return getTextHeight({ text: this.text, font: this.font });
	}

	override getIntrinsicWidth(): number {
		return getTextWidth({ text: this.text, font: this.font });
	}

	createDefaultSvgEl({ createSvgEl }: PaintContext): { [key: string]: SVGElement } {
		return {
			text: createSvgEl('text')
		};
	}
}

export default Text;
