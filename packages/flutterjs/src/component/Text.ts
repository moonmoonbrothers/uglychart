import {
  TextAlign,
  TextDirection,
  TextOverflow,
  TextSpan,
  TextStyle,
  TextWidthBasis,
} from "../type";
import InlineSpan from "../type/_types/Inline-span";
import { BuildContext, StatelessWidget } from "../widget";
import Widget from "../widget/Widget";
import RichText from "./RichText";

function Text(text: string, props: TextProps = {}) {
  return new _Text({ ...props, data: text });
}

Text.rich = (textSpan: InlineSpan, props: TextProps = {}) => {
  return new _Text({ ...props, textSpan });
};

export default Text;

class _Text extends StatelessWidget {
  data?: string;
  //This will be null if a data is provided instead
  textSpan?: InlineSpan;
  style?: TextStyle;
  textAlign?: TextAlign;
  textDirection?: TextDirection;
  softWrap?: boolean;
  textWidthBasis?: TextWidthBasis;
  overflow?: TextOverflow;

  constructor({
    data,
    textSpan,
    softWrap,
    textAlign,
    textDirection,
    textWidthBasis,
    style,
    overflow,
  }: TextProps & { data?: string; textSpan?: InlineSpan }) {
    super();
    this.softWrap = softWrap;
    this.textAlign = textAlign;
    this.textDirection = textDirection;
    this.textWidthBasis = textWidthBasis;
    this.style = style;
    this.overflow = overflow;

    this.data = data;
    this.textSpan = textSpan;
  }

  //DefaultTextSTyle.of(context) 추가할 예정
  build(context: BuildContext): Widget {
    //const defaultTextStyle = DefaultTExtStyle.of(context);
    return RichText({
      textAlign: this.textAlign ?? TextAlign.start,
      textDirection: this.textDirection,
      softWrap: this.softWrap,
      overflow: this.overflow,
      textWidthBasis: this.textWidthBasis,
      text: new TextSpan({
        style: this.style,
        text: this.data,
        children: this.textSpan && [this.textSpan],
      }),
    });
  }
}

type TextProps = {
  overflow?: TextOverflow;
  style?: TextStyle;
  textAlign?: TextAlign;
  textDirection?: TextDirection;
  softWrap?: boolean;
  textWidthBasis?: TextWidthBasis;
};
