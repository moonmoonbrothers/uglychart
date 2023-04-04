import TextOverflow from "./TextOverflow";

class TextStyle {
  inherit: boolean;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  textBaseline?: string;
  overflow?: TextOverflow;

  constructor({
    inherit = true,
    color,
    fontSize,
    fontWeight,
    fontFamily,
    textBaseline,
    overflow,
  }: TextStyleProps) {
    this.inherit = inherit;
    this.color = color;
    this.fontSize = fontSize;
    this.fontWeight = fontWeight;
    this.fontFamily = fontFamily;
    this.textBaseline = textBaseline;
    this.overflow = overflow;
  }

  copyWidth({
    inherit = this.inherit,
    color = this.color,
    fontSize = this.fontSize,
    fontWeight = this.fontWeight,
    fontFamily = this.fontFamily,
    textBaseline = this.textBaseline,
    overflow = this.overflow,
  }: TextStyleProps): TextStyle {
    return new TextStyle({
      inherit,
      color,
      fontFamily,
      overflow,
      fontSize,
      fontWeight,
      textBaseline,
    });
  }

  merge(other?: TextStyle): TextStyle {
    if(other == null) return this

    if(!other.inherit) return other

    return this.copyWidth({
      ...other
    })
  }
}

type TextStyleProps = {
  inherit?: boolean;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  textBaseline?: string;
  fontFamily?: string;
  overflow?: TextOverflow;
};
