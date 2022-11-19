export const LINE_HEIGHT_NORMAL = 2

export function getTextWidth({ text, font }: { text: string; font: string }) {
  const ctx = getCtx()
  ctx.font = font
  return Math.ceil(ctx.measureText(text).width)
}

/*
 * Calculate height of canvas text
 * https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics
 * */
export function getTextHeight({ text, font }: { text: string; font: string }) {
  const splitedTexts = text.split("\n")
  return (
    _getTextHeight({ text: "00", font }) * splitedTexts.length +
    LINE_HEIGHT_NORMAL * (splitedTexts.length - 1)
  )
}

function _getTextHeight({ text, font }: { text: string; font: string }) {
  const ctx = getCtx()
  ctx.font = font
  const { actualBoundingBoxAscent, actualBoundingBoxDescent } =
    ctx.measureText(text)
  const validActualBoundingBox =
    isNumber(actualBoundingBoxAscent) && isNumber(actualBoundingBoxDescent)

  return validActualBoundingBox
    ? Math.ceil(
        Math.abs(actualBoundingBoxAscent) + Math.abs(actualBoundingBoxDescent)
      ) + 1
    : getFontHeight(font)
}

function getFontHeight(font: string) {
  const fontSize = font.match(/\d+(?=px)/)

  return parseInt(String(Number(fontSize) * LINE_HEIGHT_NORMAL), 10)
}

function isNumber(value: unknown): value is number {
  return typeof value === "number"
}

function getCtx() {
  if (!window)
    throw { message: "it should not be callded until browser is mounted" }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ctx = document.createElement("canvas").getContext("2d")!
  return ctx
}
