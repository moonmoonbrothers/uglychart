export const LINE_HEIGHT_NORMAL = 2
import { createCanvas } from 'canvas';
const canvas = createCanvas(0,0)
const ctx = canvas.getContext('2d')

function getCtx() {
  // brouswer에서는 다른걸 써야 할지도..?
  if(typeof window !== "undefined") {
    return ctx
  } else {
    return ctx
  }
}

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
