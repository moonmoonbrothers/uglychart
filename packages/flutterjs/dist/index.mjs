var gs = Object.defineProperty;
var os = (a, s, t) => s in a ? gs(a, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[s] = t;
var o = (a, s, t) => (os(a, typeof s != "symbol" ? s + "" : s, t), t);
class k {
  constructor({ x: s, y: t }) {
    o(this, "x");
    o(this, "y");
    this.x = s, this.y = t;
  }
  static raw({ x: s, y: t }) {
    return new k({ x: s, y: t });
  }
  static zero() {
    return k.raw({ x: 0, y: 0 });
  }
  plus({ x: s, y: t }) {
    return k.raw({ x: this.x + s, y: this.y + t });
  }
}
class E {
  constructor(s, t, e, r) {
    this.left = s, this.top = t, this.right = e, this.bottom = r;
  }
  get width() {
    return this.right - this.left;
  }
  get height() {
    return this.bottom - this.top;
  }
  get shortestSide() {
    return Math.min(Math.abs(this.width), Math.abs(this.height));
  }
  get longestSide() {
    return Math.max(Math.abs(this.width), Math.abs(this.height));
  }
  get topLeft() {
    return new k({ x: this.left, y: this.top });
  }
  get topCenter() {
    return new k({ x: this.left + this.width / 2, y: this.top });
  }
  get topRight() {
    return new k({ x: this.right, y: this.top });
  }
  get center() {
    return new k({
      x: this.left + this.width / 2,
      y: this.top + this.height / 2
    });
  }
  static fromLTRB({
    left: s,
    top: t,
    right: e,
    bottom: r
  }) {
    return new E(s, t, e, r);
  }
  static fromLTWH({
    left: s,
    top: t,
    width: e,
    height: r
  }) {
    return E.fromLTRB({
      left: s,
      top: t,
      right: s + e,
      bottom: t + r
    });
  }
  static fromCircle({ center: s, radius: t }) {
    return E.fromCenter({ center: s, width: 2 * t, height: 2 * t });
  }
  static fromCenter({
    center: s,
    width: t,
    height: e
  }) {
    return E.fromLTRB({
      left: s.x - t / 2,
      top: s.y - e / 2,
      right: s.x + t / 2,
      bottom: s.y + e / 2
    });
  }
  static fromPoints(s, t) {
    return E.fromLTRB({
      left: Math.min(s.x, t.x),
      top: Math.min(s.y, t.y),
      right: Math.max(s.x, t.x),
      bottom: Math.max(s.y, t.y)
    });
  }
  inflate(s) {
    return E.fromLTRB({
      left: this.left - s,
      top: this.top - s,
      right: this.right + s,
      bottom: this.bottom + s
    });
  }
  deflate(s) {
    return this.inflate(-s);
  }
}
const K = class {
  // -1 ~ 1
  constructor({ x: s, y: t }) {
    o(this, "x");
    // -1 ~ 1
    o(this, "y");
    this.x = s, this.y = t;
  }
  add(s) {
    return new K({
      x: this.x + s.x,
      y: this.y + s.y
    });
  }
  alongOffset(s) {
    const t = s.x / 2, e = s.y / 2;
    return k.raw({
      x: t + this.x * t,
      y: e + this.y * e
    });
  }
  alongSize(s) {
    const t = s.width / 2, e = s.height / 2;
    return k.raw({
      x: t + this.x * t,
      y: e + this.y * e
    });
  }
  withRect(s) {
    const t = s.width / 2, e = s.height / 2;
    return k.raw({
      x: s.left + t + this.x * t,
      y: s.top + e + this.y * e
    });
  }
  /// Returns a rect of the given size, aligned within given rect as specified
  /// by this alignment.
  ///
  /// For example, a 100×100 size inscribed on a 200×200 rect using
  /// [Alignment.topLeft] would be the 100×100 rect at the top left of
  inscribe(s, t) {
    const e = (t.width - s.width) / 2, r = (t.height - s.height) / 2;
    return E.fromLTWH({
      left: t.left + e + this.x * e,
      top: t.top + r + this.y * r,
      width: s.width,
      height: s.height
    });
  }
  static lerp({
    start: s,
    end: t,
    t: e
  }) {
    if (!(s == null && t == null))
      return s == null ? new K({
        x: ut(0, t.x, e),
        y: ut(0, t.y, e)
      }) : t == null ? new K({
        x: ut(s.x, 0, e),
        y: ut(s.y, 0, e)
      }) : new K({
        x: ut(s.x, t.x, e),
        y: ut(s.y, t.y, e)
      });
  }
  getOffset({
    target: s,
    current: t
  }) {
    return new k({
      x: (1 + this.x) * (t.width - s.width) / 2,
      y: (1 + this.y) * (t.height - s.height) / 2
    });
  }
  static of({ x: s, y: t }) {
    return new K({ x: s, y: t });
  }
  resolve(s) {
    return this;
  }
};
let I = K;
o(I, "topLeft", K.of({ x: -1, y: -1 })), o(I, "topCenter", K.of({ x: 0, y: -1 })), o(I, "topRight", K.of({ x: 1, y: -1 })), o(I, "centerLeft", K.of({ x: -1, y: 0 })), o(I, "center", K.of({ x: 0, y: 0 })), o(I, "centerRight", K.of({ x: 1, y: 0 })), o(I, "bottomLeft", K.of({ x: -1, y: 1 })), o(I, "bottomCenter", K.of({ x: 0, y: 1 })), o(I, "bottomRight", K.of({ x: 1, y: 1 }));
function ut(a, s, t) {
  if (t > 1 || t < 0)
    throw new Error("value must be between 0 and 1: " + t.toString());
  return a + (s - a) * t;
}
const yt = class {
  constructor({ width: s, height: t }) {
    o(this, "width");
    o(this, "height");
    this.width = s, this.height = t;
  }
  static maximum() {
    return new yt({ width: 1 / 0, height: 1 / 0 });
  }
  get isFinite() {
    return Number.isFinite(this.width) && Number.isFinite(this.height);
  }
  get shortest() {
    return Math.min(this.width, this.height);
  }
  get longest() {
    return Math.max(this.width, this.height);
  }
  minus(s) {
    return new k({
      x: this.width - s.width,
      y: this.height - s.height
    });
  }
};
let C = yt;
o(C, "zero", new yt({ width: 0, height: 0 })), //depricated because javascript is vernerable for unexpected mutating variable
o(C, "infinite", new yt({ width: 1 / 0, height: 1 / 0 }));
class W {
  constructor({
    maxHeight: s = 1 / 0,
    maxWidth: t = 1 / 0,
    minHeight: e = 0,
    minWidth: r = 0
  } = {}) {
    o(this, "minWidth");
    o(this, "maxWidth");
    o(this, "minHeight");
    o(this, "maxHeight");
    this.minWidth = r, this.maxWidth = t, this.minHeight = e, this.maxHeight = s;
  }
  static expand({
    width: s = 1 / 0,
    height: t = 1 / 0
  } = {}) {
    return new W({
      maxHeight: t,
      minHeight: t,
      maxWidth: s,
      minWidth: s
    });
  }
  static zero() {
    return new W({
      minHeight: 0,
      maxHeight: 0,
      minWidth: 0,
      maxWidth: 0
    });
  }
  static loose(s) {
    return new W({
      minHeight: 0,
      maxHeight: s.height,
      minWidth: 0,
      maxWidth: s.width
    });
  }
  static tight({ width: s, height: t }) {
    return new W({
      maxHeight: t,
      minHeight: t,
      maxWidth: s,
      minWidth: s
    });
  }
  static tightFor({ width: s, height: t }) {
    return new W({
      maxHeight: t ?? 1 / 0,
      minHeight: t ?? 0,
      maxWidth: s ?? 1 / 0,
      minWidth: s ?? 0
    });
  }
  enforce(s) {
    return new W({
      minWidth: s.constrainWidth(this.minWidth),
      maxWidth: s.constrainWidth(this.maxWidth),
      minHeight: s.constrainHeight(this.minHeight),
      maxHeight: s.constrainHeight(this.maxHeight)
    });
  }
  loosen() {
    return new W({
      ...this,
      minHeight: 0,
      minWidth: 0
    });
  }
  constrain({ width: s, height: t }) {
    return new C({
      width: this.constrainWidth(s),
      height: this.constrainHeight(t)
    });
  }
  normalize() {
    return new W({
      ...this,
      minHeight: Math.min(this.minHeight, this.maxHeight),
      minWidth: Math.min(this.minWidth, this.maxWidth)
    });
  }
  getMax(s) {
    return s === "width" ? this.maxWidth : this.maxHeight;
  }
  getMin(s) {
    return s === "width" ? this.minWidth : this.minHeight;
  }
  get hasTightWidth() {
    return this.maxWidth === this.minWidth;
  }
  get hasTightHeight() {
    return this.maxHeight === this.minHeight;
  }
  get isTight() {
    return this.hasTightWidth && this.hasBoundedHeight;
  }
  get hasBoundedWidth() {
    return this.maxWidth !== 1 / 0;
  }
  get hasBoundedHeight() {
    return this.maxHeight !== 1 / 0;
  }
  get isUnbounded() {
    return !this.hasBoundedHeight && !this.hasBoundedWidth;
  }
  get hasInfiniteWidth() {
    return this.minWidth >= 1 / 0;
  }
  get hasInfiniteHeight() {
    return this.minHeight >= 1 / 0;
  }
  copyWith({
    maxHeight: s,
    maxWidth: t,
    minHeight: e,
    minWidth: r
  }) {
    return new W({
      minHeight: e ?? this.minHeight,
      maxHeight: s ?? this.maxHeight,
      minWidth: r ?? this.minWidth,
      maxWidth: t ?? this.maxWidth
    });
  }
  // Return new box constraints that are smaller by the given dimensions.
  deflate(s) {
    const t = s.horizontal, e = s.vertical, r = Math.max(0, this.minWidth - t), h = Math.max(0, this.minHeight - e);
    return new W({
      minWidth: r,
      maxWidth: Math.max(r, this.maxWidth - t),
      minHeight: h,
      maxHeight: Math.max(h, this.maxHeight - e)
    });
  }
  constrainWidth(s = 1 / 0) {
    return this.clampDouble(s, this.minWidth, this.maxWidth);
  }
  constrainHeight(s = 1 / 0) {
    return this.clampDouble(s, this.minHeight, this.maxHeight);
  }
  tighten({ width: s, height: t }) {
    return new W({
      minWidth: s == null ? this.minWidth : this.clampDouble(s, this.minWidth, this.maxWidth),
      maxWidth: s == null ? this.maxWidth : this.clampDouble(s, this.minWidth, this.maxWidth),
      minHeight: t == null ? this.minHeight : this.clampDouble(t, this.minHeight, this.maxHeight),
      maxHeight: t == null ? this.maxHeight : this.clampDouble(t, this.minHeight, this.maxHeight)
    });
  }
  widthConstraints() {
    return new W({
      minWidth: this.minWidth,
      maxWidth: this.maxWidth
    });
  }
  heightConstraints() {
    return new W({
      minHeight: this.minHeight,
      maxHeight: this.maxHeight
    });
  }
  get smallest() {
    return new C({
      width: this.constrainWidth(0),
      height: this.constrainHeight(0)
    });
  }
  get biggest() {
    return new C({
      width: this.constrainWidth(),
      height: this.constrainHeight()
    });
  }
  clampDouble(s, t, e) {
    return Math.min(e, Math.max(t, s));
  }
}
class Et {
  constructor({ top: s, bottom: t, left: e, right: r }) {
    o(this, "top");
    o(this, "bottom");
    o(this, "left");
    o(this, "right");
    this.top = s, this.bottom = t, this.left = e, this.right = r;
  }
  get horizontal() {
    return this.left + this.right;
  }
  get vertical() {
    return this.top + this.bottom;
  }
  deflateRect(s) {
    return E.fromLTRB({
      left: s.left + this.left,
      top: s.top + this.top,
      bottom: s.bottom - this.bottom,
      right: s.right - this.right
    });
  }
  add(s) {
    return new Et({
      left: this.left + s.left,
      right: this.right + s.right,
      bottom: this.bottom + s.bottom,
      top: this.top + s.top
    });
  }
}
class et extends Et {
  static all(s) {
    return new et({
      top: s,
      bottom: s,
      left: s,
      right: s
    });
  }
  static symmetric({
    horizontal: s = 0,
    vertical: t = 0
  }) {
    return new et({
      top: t,
      bottom: t,
      left: s,
      right: s
    });
  }
  static only({
    top: s = 0,
    bottom: t = 0,
    left: e = 0,
    right: r = 0
  }) {
    return new et({
      top: s,
      bottom: t,
      left: e,
      right: r
    });
  }
  static fromLTRB({
    left: s,
    right: t,
    top: e,
    bottom: r
  }) {
    return new et({
      left: s,
      right: t,
      bottom: r,
      top: e
    });
  }
}
class Rt {
  constructor({ x: s = 0, y: t = 0 }) {
    o(this, "x");
    o(this, "y");
    this.x = s, this.y = t;
  }
  static only({ x: s = 0, y: t = 0 }) {
    return new Rt({ x: s, y: t });
  }
  static all(s) {
    return new Rt({ x: s, y: s });
  }
}
let Pe = class {
  constructor({
    topLeft: s,
    topRight: t,
    bottomLeft: e,
    bottomRight: r
  }) {
    o(this, "topLeft");
    o(this, "topRight");
    o(this, "bottomLeft");
    o(this, "bottomRight");
    this.bottomLeft = e, this.bottomRight = r, this.topLeft = s, this.topRight = t;
  }
};
class U {
  constructor() {
    o(this, "_d", "");
  }
  getD() {
    return this._d;
  }
  moveTo(s) {
    return this._moveTo(s, !1);
  }
  relativeMoveTo(s) {
    return this._moveTo(s, !0);
  }
  lineTo(s) {
    return this._lineTo(s, !1);
  }
  relativeLineTo(s) {
    return this._lineTo(s, !0);
  }
  quadraticBezierTo(s) {
    return this._quadraticBezierTo(s, !1);
  }
  relativeQuadraticBezierTo(s) {
    return this._quadraticBezierTo(s, !0);
  }
  cubicTo(s) {
    return this._cubicTo(s, !1);
  }
  relativeCubicTo(s) {
    return this._cubicTo(s, !0);
  }
  arcToPoint(s) {
    return this._arcToPoint(s, !1);
  }
  relativeArcToPoint(s) {
    return this._arcToPoint(s, !0);
  }
  addRect(s) {
    return this.moveTo({ x: s.left, y: s.top }).lineTo({ x: s.right, y: s.top }).lineTo({ x: s.right, y: s.bottom }).lineTo({ x: s.left, y: s.bottom }).close();
  }
  addRRect(s, { clockwise: t = !0 } = {}) {
    if (s.width == 0 || s.height == 0)
      return this;
    const {
      left: e,
      right: r,
      top: h,
      bottom: g,
      tlRadiusX: n,
      tlRadiusY: u,
      trRadiusX: v,
      trRadiusY: x,
      blRadiusX: m,
      blRadiusY: y,
      brRadiusX: z,
      brRadiusY: d
    } = s, c = {
      rotation: 0,
      largeArc: !1,
      clockwise: t
    }, w = [
      { x: e, y: h + u },
      { x: n, y: h },
      { x: r - v, y: h },
      { x: r, y: h + x },
      { x: r, y: g - d },
      { x: r - z, y: g },
      { x: e + m, y: g },
      { x: e, y: g - y }
    ], l = [
      { x: n, y: u },
      { x: v, y: x },
      { x: z, y: d },
      { x: m, y }
    ];
    return t || (w.reverse(), l.reverse()), this.moveTo(w[0]).arcToPoint({
      ...c,
      radius: l[0],
      endPoint: w[1]
    }).lineTo(w[2]).arcToPoint({
      ...c,
      radius: l[1],
      endPoint: w[3]
    }).lineTo(w[4]).arcToPoint({
      ...c,
      radius: l[2],
      endPoint: w[5]
    }).lineTo(w[6]).arcToPoint({
      ...c,
      radius: l[3],
      endPoint: w[7]
    }).close();
  }
  addDRRect({ inner: s, outer: t }) {
    return new U().addRRect(t).addRRect(s, { clockwise: !1 });
  }
  addOval(s) {
    const t = {
      rotation: 0,
      radius: { x: s.width / 2, y: s.height / 2 },
      largeArc: !1,
      clockwise: !0
    }, e = { x: s.left, y: (s.top + s.bottom) / 2 }, r = { x: s.right, y: (s.top + s.bottom) / 2 };
    return this.moveTo(e).arcToPoint({
      ...t,
      endPoint: r
    }).arcToPoint({
      ...t,
      endPoint: e
    }).close();
  }
  addPolygons(s) {
    if (s.length < 3)
      throw Error("polygons need at least 3 points");
    return this.moveTo(s[0]), s.slice(1).forEach((t) => this.lineTo(t)), this.close();
  }
  close() {
    return this._d += "Z", this;
  }
  _quadraticBezierTo({
    controlPoint: s,
    endPoint: t
  }, e) {
    return this._d += `${e ? "q" : "Q"}${s.x} ${s.y} ${t.x} ${t.y}`, this;
  }
  _lineTo({ x: s, y: t }, e) {
    return this._d += `${e ? "l" : "L"}${s} ${t}`, this;
  }
  _moveTo({ x: s, y: t }, e) {
    return this._d += `${e ? "m" : "M"}${s} ${t}`, this;
  }
  _cubicTo({
    startControlPoint: s,
    endControlPoint: t,
    endPoint: e
  }, r) {
    return this._d += `${r ? "c" : "C"}${s.x} ${s.y} ${t.x} ${t.y} ${e.x} ${e.y}`, this;
  }
  _arcToPoint({
    endPoint: s,
    radius: t,
    rotation: e,
    largeArc: r,
    clockwise: h
  }, g) {
    return this._d += `${g ? "a" : "A"}${t.x} ${t.y} ${e} ${r ? 1 : 0} ${h ? 1 : 0} ${s.x} ${s.y}`, this;
  }
}
function $(a, s) {
  if (!a)
    throw new Error(s || "Assertion failed");
}
function as(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var ns = function(a, s) {
  return Object.assign(document.createElement("canvas"), { width: a, height: s });
};
const _s = ns(0, 0), Yt = _s.getContext("2d");
function us() {
  return Yt;
}
function vs({
  text: a,
  font: s
}) {
  const t = us();
  return t.font = s, Math.ceil(t.measureText(a).width);
}
const jt = class {
  static sum(s) {
    return s.reduce(jt.sumReducer, 0);
  }
  static repeat(s, t) {
    return Array.from({ length: t }, () => s);
  }
  static clampDouble(s, t, e) {
    return Math.min(e, Math.max(t, s));
  }
};
let V = jt;
o(V, "sumReducer", (s, t) => s + t), o(V, "maxReducer", (s, t) => Math.max(s, t)), o(V, "minReducer", (s, t) => Math.min(s, t));
const ot = class {
  constructor(s, t) {
    this.x = s, this.y = t;
  }
  static circular(s) {
    return ot.elliptical({ x: s, y: s });
  }
  static elliptical({ x: s, y: t }) {
    return new ot(s, t);
  }
  clamp({ minimum: s, maximum: t }) {
    return s ?? (s = ot.circular(-1 / 0)), t ?? (t = ot.circular(1 / 0)), ot.elliptical({
      x: V.clampDouble(this.x, s.x, t.x),
      y: V.clampDouble(this.y, s.y, t.y)
    });
  }
  clampValues({
    maximumX: s = 1 / 0,
    maximumY: t = 1 / 0,
    minimumX: e = -1 / 0,
    minimumY: r = -1 / 0
  }) {
    return ot.elliptical({
      x: V.clampDouble(this.x, e, s),
      y: V.clampDouble(this.y, r, t)
    });
  }
};
let M = ot;
o(M, "zero", ot.circular(0));
class lt {
  constructor(s, t, e, r, h, g, n, u, v, x, m, y) {
    this.top = s, this.left = t, this.bottom = e, this.right = r, this.tlRadiusX = h, this.tlRadiusY = g, this.blRadiusX = n, this.blRadiusY = u, this.trRadiusX = v, this.trRadiusY = x, this.brRadiusX = m, this.brRadiusY = y;
  }
  get width() {
    return this.right - this.left;
  }
  get height() {
    return this.bottom - this.top;
  }
  static fromLTRBXY({
    left: s,
    top: t,
    right: e,
    bottom: r,
    radiusX: h,
    radiusY: g
  }) {
    return this.raw({
      top: t,
      left: s,
      right: e,
      bottom: r,
      tlRadiusX: h,
      tlRadiusY: g,
      trRadiusX: h,
      trRadiusY: g,
      blRadiusX: h,
      blRadiusY: g,
      brRadiusX: h,
      brRadiusY: g
    });
  }
  static fromLTRBR({
    left: s,
    radius: t,
    top: e,
    right: r,
    bottom: h
  }) {
    return this.fromLTRBXY({
      left: s,
      top: e,
      right: r,
      bottom: h,
      radiusX: t.x,
      radiusY: t.y
    });
  }
  static fromRectXY({
    radiusX: s,
    radiusY: t,
    rect: e
  }) {
    return this.raw({
      top: e.top,
      left: e.left,
      right: e.right,
      bottom: e.bottom,
      tlRadiusX: s,
      tlRadiusY: t,
      trRadiusX: s,
      trRadiusY: t,
      blRadiusX: s,
      blRadiusY: t,
      brRadiusX: s,
      brRadiusY: t
    });
  }
  static fromRecAndRadius({ radius: s, rect: t }) {
    return this.fromRectXY({
      radiusX: s.x,
      radiusY: s.y,
      rect: t
    });
  }
  static fromLTRBAndCorners({
    left: s,
    right: t,
    bottom: e,
    top: r,
    topLeft: h = M.zero,
    topRight: g = M.zero,
    bottomLeft: n = M.zero,
    bottomRight: u = M.zero
  }) {
    return this.raw({
      left: s,
      right: t,
      bottom: e,
      top: r,
      tlRadiusX: h.x,
      tlRadiusY: h.y,
      trRadiusX: g.x,
      trRadiusY: g.y,
      blRadiusX: n.x,
      blRadiusY: n.y,
      brRadiusX: u.x,
      brRadiusY: u.y
    });
  }
  static fromRectAndCorners({
    rect: s,
    topLeft: t = M.zero,
    topRight: e = M.zero,
    bottomLeft: r = M.zero,
    bottomRight: h = M.zero
  }) {
    return this.fromLTRBAndCorners({
      left: s.left,
      right: s.right,
      bottom: s.bottom,
      top: s.top,
      topLeft: t,
      topRight: e,
      bottomLeft: r,
      bottomRight: h
    });
  }
  static raw({
    top: s,
    left: t,
    bottom: e,
    right: r,
    tlRadiusX: h,
    tlRadiusY: g,
    blRadiusX: n,
    blRadiusY: u,
    trRadiusX: v,
    trRadiusY: x,
    brRadiusX: m,
    brRadiusY: y
  }) {
    return new lt(
      s,
      t,
      e,
      r,
      h,
      g,
      n,
      u,
      v,
      x,
      m,
      y
    );
  }
  inflate(s) {
    return lt.raw({
      left: this.left - s,
      top: this.top - s,
      right: this.right + s,
      bottom: this.bottom + s,
      tlRadiusX: Math.max(0, this.tlRadiusX + s),
      trRadiusX: Math.max(0, this.trRadiusX + s),
      blRadiusX: Math.max(0, this.blRadiusX + s),
      brRadiusX: Math.max(0, this.brRadiusX + s),
      tlRadiusY: Math.max(0, this.tlRadiusY + s),
      trRadiusY: Math.max(0, this.trRadiusY + s),
      blRadiusY: Math.max(0, this.blRadiusY + s),
      brRadiusY: Math.max(0, this.brRadiusY + s)
    });
  }
  deflate(s) {
    return this.inflate(-s);
  }
}
var J = /* @__PURE__ */ ((a) => (a.rtl = "rtl", a.ltr = "ltr", a))(J || {}), xs = /* @__PURE__ */ ((a) => (a.min = "min", a.max = "max", a))(xs || {}), ws = /* @__PURE__ */ ((a) => (a.up = "up", a.down = "down", a))(ws || {}), ys = /* @__PURE__ */ ((a) => (a.start = "start", a.end = "end", a.center = "center", a.spaceBetween = "spaceBetween", a.spaceAround = "spaceAround", a.spaceEvenly = "spaceEvenly", a))(ys || {}), ms = /* @__PURE__ */ ((a) => (a.start = "start", a.end = "end", a.center = "center", a.stretch = "stretch", a))(ms || {}), ls = /* @__PURE__ */ ((a) => (a.horizontal = "horizontal", a.vertical = "vertical", a))(ls || {});
class Ut {
  constructor(...s) {
    o(this, "_m3storage");
    this._m3storage = s;
  }
  get storage() {
    return this._m3storage;
  }
  static zero() {
    return new Ut(0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class i {
  constructor(s, t, e, r) {
    o(this, "_v4storage");
    this._v4storage = [s, t, e, r];
  }
  get storage() {
    return this._v4storage;
  }
  static zero() {
    return new i(0, 0, 0, 0);
  }
  set xy(s) {
    const t = s._v2storage;
    this._v4storage[0] = t[0], this._v4storage[1] = t[1];
  }
  set xz(s) {
    const t = s._v2storage;
    this._v4storage[0] = t[0], this._v4storage[2] = t[1];
  }
  set xw(s) {
    const t = s._v2storage;
    this._v4storage[0] = t[0], this._v4storage[3] = t[1];
  }
  set yx(s) {
    const t = s._v2storage;
    this._v4storage[1] = t[0], this._v4storage[0] = t[1];
  }
  set yz(s) {
    const t = s._v2storage;
    this._v4storage[1] = t[0], this._v4storage[2] = t[1];
  }
  set yw(s) {
    const t = s._v2storage;
    this._v4storage[1] = t[0], this._v4storage[3] = t[1];
  }
  set zx(s) {
    const t = s._v2storage;
    this._v4storage[2] = t[0], this._v4storage[0] = t[1];
  }
  set zy(s) {
    const t = s._v2storage;
    this._v4storage[2] = t[0], this._v4storage[1] = t[1];
  }
  set zw(s) {
    const t = s._v2storage;
    this._v4storage[2] = t[0], this._v4storage[3] = t[1];
  }
  set wx(s) {
    const t = s._v2storage;
    this._v4storage[3] = t[0], this._v4storage[0] = t[1];
  }
  set wy(s) {
    const t = s._v2storage;
    this._v4storage[3] = t[0], this._v4storage[1] = t[1];
  }
  set wz(s) {
    const t = s._v2storage;
    this._v4storage[3] = t[0], this._v4storage[2] = t[1];
  }
  set xyz(s) {
    const t = s._v3storage;
    this._v4storage[0] = t[0], this._v4storage[1] = t[1], this._v4storage[2] = t[2];
  }
  set xyw(s) {
    const t = s._v3storage;
    this._v4storage[0] = t[0], this._v4storage[1] = t[1], this._v4storage[3] = t[2];
  }
  set xzy(s) {
    const t = s._v3storage;
    this._v4storage[0] = t[0], this._v4storage[2] = t[1], this._v4storage[1] = t[2];
  }
  set xzw(s) {
    const t = s._v3storage;
    this._v4storage[0] = t[0], this._v4storage[2] = t[1], this._v4storage[3] = t[2];
  }
  set xwy(s) {
    const t = s._v3storage;
    this._v4storage[0] = t[0], this._v4storage[3] = t[1], this._v4storage[1] = t[2];
  }
  set xwz(s) {
    const t = s._v3storage;
    this._v4storage[0] = t[0], this._v4storage[3] = t[1], this._v4storage[2] = t[2];
  }
  set yxz(s) {
    const t = s._v3storage;
    this._v4storage[1] = t[0], this._v4storage[0] = t[1], this._v4storage[2] = t[2];
  }
  set yxw(s) {
    const t = s._v3storage;
    this._v4storage[1] = t[0], this._v4storage[0] = t[1], this._v4storage[3] = t[2];
  }
  set yzx(s) {
    const t = s._v3storage;
    this._v4storage[1] = t[0], this._v4storage[2] = t[1], this._v4storage[0] = t[2];
  }
  set yzw(s) {
    const t = s._v3storage;
    this._v4storage[1] = t[0], this._v4storage[2] = t[1], this._v4storage[3] = t[2];
  }
  set ywx(s) {
    const t = s._v3storage;
    this._v4storage[1] = t[0], this._v4storage[3] = t[1], this._v4storage[0] = t[2];
  }
  set ywz(s) {
    const t = s._v3storage;
    this._v4storage[1] = t[0], this._v4storage[3] = t[1], this._v4storage[2] = t[2];
  }
  set zxy(s) {
    const t = s._v3storage;
    this._v4storage[2] = t[0], this._v4storage[0] = t[1], this._v4storage[1] = t[2];
  }
  set zxw(s) {
    const t = s._v3storage;
    this._v4storage[2] = t[0], this._v4storage[0] = t[1], this._v4storage[3] = t[2];
  }
  set zyx(s) {
    const t = s._v3storage;
    this._v4storage[2] = t[0], this._v4storage[1] = t[1], this._v4storage[0] = t[2];
  }
  set zyw(s) {
    const t = s._v3storage;
    this._v4storage[2] = t[0], this._v4storage[1] = t[1], this._v4storage[3] = t[2];
  }
  set zwx(s) {
    const t = s._v3storage;
    this._v4storage[2] = t[0], this._v4storage[3] = t[1], this._v4storage[0] = t[2];
  }
  set zwy(s) {
    const t = s._v3storage;
    this._v4storage[2] = t[0], this._v4storage[3] = t[1], this._v4storage[1] = t[2];
  }
  set wxy(s) {
    const t = s._v3storage;
    this._v4storage[3] = t[0], this._v4storage[0] = t[1], this._v4storage[1] = t[2];
  }
  set wxz(s) {
    const t = s._v3storage;
    this._v4storage[3] = t[0], this._v4storage[0] = t[1], this._v4storage[2] = t[2];
  }
  set wyx(s) {
    const t = s._v3storage;
    this._v4storage[3] = t[0], this._v4storage[1] = t[1], this._v4storage[0] = t[2];
  }
  set wyz(s) {
    const t = s._v3storage;
    this._v4storage[3] = t[0], this._v4storage[1] = t[1], this._v4storage[2] = t[2];
  }
  set wzx(s) {
    const t = s._v3storage;
    this._v4storage[3] = t[0], this._v4storage[2] = t[1], this._v4storage[0] = t[2];
  }
  set wzy(s) {
    const t = s._v3storage;
    this._v4storage[3] = t[0], this._v4storage[2] = t[1], this._v4storage[1] = t[2];
  }
  set xyzw(s) {
    const t = s._v4storage;
    this._v4storage[0] = t[0], this._v4storage[1] = t[1], this._v4storage[2] = t[2], this._v4storage[3] = t[3];
  }
  set xywz(s) {
    const t = s._v4storage;
    this._v4storage[0] = t[0], this._v4storage[1] = t[1], this._v4storage[3] = t[2], this._v4storage[2] = t[3];
  }
  set xzyw(s) {
    const t = s._v4storage;
    this._v4storage[0] = t[0], this._v4storage[2] = t[1], this._v4storage[1] = t[2], this._v4storage[3] = t[3];
  }
  set xzwy(s) {
    const t = s._v4storage;
    this._v4storage[0] = t[0], this._v4storage[2] = t[1], this._v4storage[3] = t[2], this._v4storage[1] = t[3];
  }
  set xwyz(s) {
    const t = s._v4storage;
    this._v4storage[0] = t[0], this._v4storage[3] = t[1], this._v4storage[1] = t[2], this._v4storage[2] = t[3];
  }
  set xwzy(s) {
    const t = s._v4storage;
    this._v4storage[0] = t[0], this._v4storage[3] = t[1], this._v4storage[2] = t[2], this._v4storage[1] = t[3];
  }
  set yxzw(s) {
    const t = s._v4storage;
    this._v4storage[1] = t[0], this._v4storage[0] = t[1], this._v4storage[2] = t[2], this._v4storage[3] = t[3];
  }
  set yxwz(s) {
    const t = s._v4storage;
    this._v4storage[1] = t[0], this._v4storage[0] = t[1], this._v4storage[3] = t[2], this._v4storage[2] = t[3];
  }
  set yzxw(s) {
    const t = s._v4storage;
    this._v4storage[1] = t[0], this._v4storage[2] = t[1], this._v4storage[0] = t[2], this._v4storage[3] = t[3];
  }
  set yzwx(s) {
    const t = s._v4storage;
    this._v4storage[1] = t[0], this._v4storage[2] = t[1], this._v4storage[3] = t[2], this._v4storage[0] = t[3];
  }
  set ywxz(s) {
    const t = s._v4storage;
    this._v4storage[1] = t[0], this._v4storage[3] = t[1], this._v4storage[0] = t[2], this._v4storage[2] = t[3];
  }
  set ywzx(s) {
    const t = s._v4storage;
    this._v4storage[1] = t[0], this._v4storage[3] = t[1], this._v4storage[2] = t[2], this._v4storage[0] = t[3];
  }
  set zxyw(s) {
    const t = s._v4storage;
    this._v4storage[2] = t[0], this._v4storage[0] = t[1], this._v4storage[1] = t[2], this._v4storage[3] = t[3];
  }
  set zxwy(s) {
    const t = s._v4storage;
    this._v4storage[2] = t[0], this._v4storage[0] = t[1], this._v4storage[3] = t[2], this._v4storage[1] = t[3];
  }
  set zyxw(s) {
    const t = s._v4storage;
    this._v4storage[2] = t[0], this._v4storage[1] = t[1], this._v4storage[0] = t[2], this._v4storage[3] = t[3];
  }
  set zywx(s) {
    const t = s._v4storage;
    this._v4storage[2] = t[0], this._v4storage[1] = t[1], this._v4storage[3] = t[2], this._v4storage[0] = t[3];
  }
  set zwxy(s) {
    const t = s._v4storage;
    this._v4storage[2] = t[0], this._v4storage[3] = t[1], this._v4storage[0] = t[2], this._v4storage[1] = t[3];
  }
  set zwyx(s) {
    const t = s._v4storage;
    this._v4storage[2] = t[0], this._v4storage[3] = t[1], this._v4storage[1] = t[2], this._v4storage[0] = t[3];
  }
  set wxyz(s) {
    const t = s._v4storage;
    this._v4storage[3] = t[0], this._v4storage[0] = t[1], this._v4storage[1] = t[2], this._v4storage[2] = t[3];
  }
  set wxzy(s) {
    const t = s._v4storage;
    this._v4storage[3] = t[0], this._v4storage[0] = t[1], this._v4storage[2] = t[2], this._v4storage[1] = t[3];
  }
  set wyxz(s) {
    const t = s._v4storage;
    this._v4storage[3] = t[0], this._v4storage[1] = t[1], this._v4storage[0] = t[2], this._v4storage[2] = t[3];
  }
  set wyzx(s) {
    const t = s._v4storage;
    this._v4storage[3] = t[0], this._v4storage[1] = t[1], this._v4storage[2] = t[2], this._v4storage[0] = t[3];
  }
  set wzxy(s) {
    const t = s._v4storage;
    this._v4storage[3] = t[0], this._v4storage[2] = t[1], this._v4storage[0] = t[2], this._v4storage[1] = t[3];
  }
  set wzyx(s) {
    const t = s._v4storage;
    this._v4storage[3] = t[0], this._v4storage[2] = t[1], this._v4storage[1] = t[2], this._v4storage[0] = t[3];
  }
  set r(s) {
    this.x = s;
  }
  set g(s) {
    this.y = s;
  }
  set b(s) {
    this.z = s;
  }
  set a(s) {
    this.w = s;
  }
  set s(s) {
    this.x = s;
  }
  set t(s) {
    this.y = s;
  }
  set p(s) {
    this.z = s;
  }
  set q(s) {
    this.w = s;
  }
  set x(s) {
    this._v4storage[0] = s;
  }
  set y(s) {
    this._v4storage[1] = s;
  }
  set z(s) {
    this._v4storage[2] = s;
  }
  set w(s) {
    this._v4storage[3] = s;
  }
  set rg(s) {
    this.xy = s;
  }
  set rb(s) {
    this.xz = s;
  }
  set ra(s) {
    this.xw = s;
  }
  set gr(s) {
    this.yx = s;
  }
  set gb(s) {
    this.yz = s;
  }
  set ga(s) {
    this.yw = s;
  }
  set br(s) {
    this.zx = s;
  }
  set bg(s) {
    this.zy = s;
  }
  set ba(s) {
    this.zw = s;
  }
  set ar(s) {
    this.wx = s;
  }
  set ag(s) {
    this.wy = s;
  }
  set ab(s) {
    this.wz = s;
  }
  set rgb(s) {
    this.xyz = s;
  }
  set rga(s) {
    this.xyw = s;
  }
  set rbg(s) {
    this.xzy = s;
  }
  set rba(s) {
    this.xzw = s;
  }
  set rag(s) {
    this.xwy = s;
  }
  set rab(s) {
    this.xwz = s;
  }
  set grb(s) {
    this.yxz = s;
  }
  set gra(s) {
    this.yxw = s;
  }
  set gbr(s) {
    this.yzx = s;
  }
  set gba(s) {
    this.yzw = s;
  }
  set gar(s) {
    this.ywx = s;
  }
  set gab(s) {
    this.ywz = s;
  }
  set brg(s) {
    this.zxy = s;
  }
  set bra(s) {
    this.zxw = s;
  }
  set bgr(s) {
    this.zyx = s;
  }
  set bga(s) {
    this.zyw = s;
  }
  set bar(s) {
    this.zwx = s;
  }
  set bag(s) {
    this.zwy = s;
  }
  set arg(s) {
    this.wxy = s;
  }
  set arb(s) {
    this.wxz = s;
  }
  set agr(s) {
    this.wyx = s;
  }
  set agb(s) {
    this.wyz = s;
  }
  set abr(s) {
    this.wzx = s;
  }
  set abg(s) {
    this.wzy = s;
  }
  set rgba(s) {
    this.xyzw = s;
  }
  set rgab(s) {
    this.xywz = s;
  }
  set rbga(s) {
    this.xzyw = s;
  }
  set rbag(s) {
    this.xzwy = s;
  }
  set ragb(s) {
    this.xwyz = s;
  }
  set rabg(s) {
    this.xwzy = s;
  }
  set grba(s) {
    this.yxzw = s;
  }
  set grab(s) {
    this.yxwz = s;
  }
  set gbra(s) {
    this.yzxw = s;
  }
  set gbar(s) {
    this.yzwx = s;
  }
  set garb(s) {
    this.ywxz = s;
  }
  set gabr(s) {
    this.ywzx = s;
  }
  set brga(s) {
    this.zxyw = s;
  }
  set brag(s) {
    this.zxwy = s;
  }
  set bgra(s) {
    this.zyxw = s;
  }
  set bgar(s) {
    this.zywx = s;
  }
  set barg(s) {
    this.zwxy = s;
  }
  set bagr(s) {
    this.zwyx = s;
  }
  set argb(s) {
    this.wxyz = s;
  }
  set arbg(s) {
    this.wxzy = s;
  }
  set agrb(s) {
    this.wyxz = s;
  }
  set agbr(s) {
    this.wyzx = s;
  }
  set abrg(s) {
    this.wzxy = s;
  }
  set abgr(s) {
    this.wzyx = s;
  }
  set st(s) {
    this.xy = s;
  }
  set sp(s) {
    this.xz = s;
  }
  set sq(s) {
    this.xw = s;
  }
  set ts(s) {
    this.yx = s;
  }
  set tp(s) {
    this.yz = s;
  }
  set tq(s) {
    this.yw = s;
  }
  set ps(s) {
    this.zx = s;
  }
  set pt(s) {
    this.zy = s;
  }
  set pq(s) {
    this.zw = s;
  }
  set qs(s) {
    this.wx = s;
  }
  set qt(s) {
    this.wy = s;
  }
  set qp(s) {
    this.wz = s;
  }
  set stp(s) {
    this.xyz = s;
  }
  set stq(s) {
    this.xyw = s;
  }
  set spt(s) {
    this.xzy = s;
  }
  set spq(s) {
    this.xzw = s;
  }
  set sqt(s) {
    this.xwy = s;
  }
  set sqp(s) {
    this.xwz = s;
  }
  set tsp(s) {
    this.yxz = s;
  }
  set tsq(s) {
    this.yxw = s;
  }
  set tps(s) {
    this.yzx = s;
  }
  set tpq(s) {
    this.yzw = s;
  }
  set tqs(s) {
    this.ywx = s;
  }
  set tqp(s) {
    this.ywz = s;
  }
  set pst(s) {
    this.zxy = s;
  }
  set psq(s) {
    this.zxw = s;
  }
  set pts(s) {
    this.zyx = s;
  }
  set ptq(s) {
    this.zyw = s;
  }
  set pqs(s) {
    this.zwx = s;
  }
  set pqt(s) {
    this.zwy = s;
  }
  set qst(s) {
    this.wxy = s;
  }
  set qsp(s) {
    this.wxz = s;
  }
  set qts(s) {
    this.wyx = s;
  }
  set qtp(s) {
    this.wyz = s;
  }
  set qps(s) {
    this.wzx = s;
  }
  set qpt(s) {
    this.wzy = s;
  }
  set stpq(s) {
    this.xyzw = s;
  }
  set stqp(s) {
    this.xywz = s;
  }
  set sptq(s) {
    this.xzyw = s;
  }
  set spqt(s) {
    this.xzwy = s;
  }
  set sqtp(s) {
    this.xwyz = s;
  }
  set sqpt(s) {
    this.xwzy = s;
  }
  set tspq(s) {
    this.yxzw = s;
  }
  set tsqp(s) {
    this.yxwz = s;
  }
  set tpsq(s) {
    this.yzxw = s;
  }
  set tpqs(s) {
    this.yzwx = s;
  }
  set tqsp(s) {
    this.ywxz = s;
  }
  set tqps(s) {
    this.ywzx = s;
  }
  set pstq(s) {
    this.zxyw = s;
  }
  set psqt(s) {
    this.zxwy = s;
  }
  set ptsq(s) {
    this.zyxw = s;
  }
  set ptqs(s) {
    this.zywx = s;
  }
  set pqst(s) {
    this.zwxy = s;
  }
  set pqts(s) {
    this.zwyx = s;
  }
  set qstp(s) {
    this.wxyz = s;
  }
  set qspt(s) {
    this.wxzy = s;
  }
  set qtsp(s) {
    this.wyxz = s;
  }
  set qtps(s) {
    this.wyzx = s;
  }
  set qpst(s) {
    this.wzxy = s;
  }
  set qpts(s) {
    this.wzyx = s;
  }
  get xx() {
    return new T(this._v4storage[0], this._v4storage[0]);
  }
  get xy() {
    return new T(this._v4storage[0], this._v4storage[1]);
  }
  get xz() {
    return new T(this._v4storage[0], this._v4storage[2]);
  }
  get xw() {
    return new T(this._v4storage[0], this._v4storage[3]);
  }
  get yx() {
    return new T(this._v4storage[1], this._v4storage[0]);
  }
  get yy() {
    return new T(this._v4storage[1], this._v4storage[1]);
  }
  get yz() {
    return new T(this._v4storage[1], this._v4storage[2]);
  }
  get yw() {
    return new T(this._v4storage[1], this._v4storage[3]);
  }
  get zx() {
    return new T(this._v4storage[2], this._v4storage[0]);
  }
  get zy() {
    return new T(this._v4storage[2], this._v4storage[1]);
  }
  get zz() {
    return new T(this._v4storage[2], this._v4storage[2]);
  }
  get zw() {
    return new T(this._v4storage[2], this._v4storage[3]);
  }
  get wx() {
    return new T(this._v4storage[3], this._v4storage[0]);
  }
  get wy() {
    return new T(this._v4storage[3], this._v4storage[1]);
  }
  get wz() {
    return new T(this._v4storage[3], this._v4storage[2]);
  }
  get ww() {
    return new T(this._v4storage[3], this._v4storage[3]);
  }
  get xxx() {
    return new p(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get xxy() {
    return new p(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get xxz() {
    return new p(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get xxw() {
    return new p(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get xyx() {
    return new p(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get xyy() {
    return new p(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get xyz() {
    return new p(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get xyw() {
    return new p(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get xzx() {
    return new p(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get xzy() {
    return new p(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get xzz() {
    return new p(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get xzw() {
    return new p(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get xwx() {
    return new p(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get xwy() {
    return new p(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get xwz() {
    return new p(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get xww() {
    return new p(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get yxx() {
    return new p(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get yxy() {
    return new p(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get yxz() {
    return new p(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get yxw() {
    return new p(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get yyx() {
    return new p(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get yyy() {
    return new p(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get yyz() {
    return new p(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get yyw() {
    return new p(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get yzx() {
    return new p(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get yzy() {
    return new p(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get yzz() {
    return new p(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get yzw() {
    return new p(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get ywx() {
    return new p(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get ywy() {
    return new p(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get ywz() {
    return new p(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get yww() {
    return new p(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get zxx() {
    return new p(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get zxy() {
    return new p(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get zxz() {
    return new p(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get zxw() {
    return new p(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get zyx() {
    return new p(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get zyy() {
    return new p(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get zyz() {
    return new p(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get zyw() {
    return new p(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get zzx() {
    return new p(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get zzy() {
    return new p(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get zzz() {
    return new p(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get zzw() {
    return new p(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get zwx() {
    return new p(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get zwy() {
    return new p(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get zwz() {
    return new p(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get zww() {
    return new p(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get wxx() {
    return new p(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get wxy() {
    return new p(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get wxz() {
    return new p(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get wxw() {
    return new p(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get wyx() {
    return new p(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get wyy() {
    return new p(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get wyz() {
    return new p(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get wyw() {
    return new p(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get wzx() {
    return new p(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get wzy() {
    return new p(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get wzz() {
    return new p(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get wzw() {
    return new p(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get wwx() {
    return new p(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get wwy() {
    return new p(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get wwz() {
    return new p(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get www() {
    return new p(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get xxxx() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get xxxy() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get xxxz() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get xxxw() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get xxyx() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get xxyy() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get xxyz() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get xxyw() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get xxzx() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get xxzy() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get xxzz() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get xxzw() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get xxwx() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get xxwy() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get xxwz() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get xxww() {
    return new i(
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get xyxx() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get xyxy() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get xyxz() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get xyxw() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get xyyx() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get xyyy() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get xyyz() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get xyyw() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get xyzx() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get xyzy() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get xyzz() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get xyzw() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get xywx() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get xywy() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get xywz() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get xyww() {
    return new i(
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get xzxx() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get xzxy() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get xzxz() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get xzxw() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get xzyx() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get xzyy() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get xzyz() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get xzyw() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get xzzx() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get xzzy() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get xzzz() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get xzzw() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get xzwx() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get xzwy() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get xzwz() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get xzww() {
    return new i(
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get xwxx() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get xwxy() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get xwxz() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get xwxw() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get xwyx() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get xwyy() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get xwyz() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get xwyw() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get xwzx() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get xwzy() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get xwzz() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get xwzw() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get xwwx() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get xwwy() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get xwwz() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get xwww() {
    return new i(
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get yxxx() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get yxxy() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get yxxz() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get yxxw() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get yxyx() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get yxyy() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get yxyz() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get yxyw() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get yxzx() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get yxzy() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get yxzz() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get yxzw() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get yxwx() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get yxwy() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get yxwz() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get yxww() {
    return new i(
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get yyxx() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get yyxy() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get yyxz() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get yyxw() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get yyyx() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get yyyy() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get yyyz() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get yyyw() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get yyzx() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get yyzy() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get yyzz() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get yyzw() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get yywx() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get yywy() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get yywz() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get yyww() {
    return new i(
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get yzxx() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get yzxy() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get yzxz() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get yzxw() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get yzyx() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get yzyy() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get yzyz() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get yzyw() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get yzzx() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get yzzy() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get yzzz() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get yzzw() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get yzwx() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get yzwy() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get yzwz() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get yzww() {
    return new i(
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get ywxx() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get ywxy() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get ywxz() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get ywxw() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get ywyx() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get ywyy() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get ywyz() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get ywyw() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get ywzx() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get ywzy() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get ywzz() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get ywzw() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get ywwx() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get ywwy() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get ywwz() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get ywww() {
    return new i(
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get zxxx() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get zxxy() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get zxxz() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get zxxw() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get zxyx() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get zxyy() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get zxyz() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get zxyw() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get zxzx() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get zxzy() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get zxzz() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get zxzw() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get zxwx() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get zxwy() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get zxwz() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get zxww() {
    return new i(
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get zyxx() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get zyxy() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get zyxz() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get zyxw() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get zyyx() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get zyyy() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get zyyz() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get zyyw() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get zyzx() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get zyzy() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get zyzz() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get zyzw() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get zywx() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get zywy() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get zywz() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get zyww() {
    return new i(
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get zzxx() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get zzxy() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get zzxz() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get zzxw() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get zzyx() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get zzyy() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get zzyz() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get zzyw() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get zzzx() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get zzzy() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get zzzz() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get zzzw() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get zzwx() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get zzwy() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get zzwz() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get zzww() {
    return new i(
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get zwxx() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get zwxy() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get zwxz() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get zwxw() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get zwyx() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get zwyy() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get zwyz() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get zwyw() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get zwzx() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get zwzy() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get zwzz() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get zwzw() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get zwwx() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get zwwy() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get zwwz() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get zwww() {
    return new i(
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get wxxx() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get wxxy() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get wxxz() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get wxxw() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get wxyx() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get wxyy() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get wxyz() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get wxyw() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get wxzx() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get wxzy() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get wxzz() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get wxzw() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get wxwx() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get wxwy() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get wxwz() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get wxww() {
    return new i(
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get wyxx() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get wyxy() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get wyxz() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get wyxw() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get wyyx() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get wyyy() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get wyyz() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get wyyw() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get wyzx() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get wyzy() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get wyzz() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get wyzw() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get wywx() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get wywy() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get wywz() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get wyww() {
    return new i(
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get wzxx() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get wzxy() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get wzxz() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get wzxw() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get wzyx() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get wzyy() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get wzyz() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get wzyw() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get wzzx() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get wzzy() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get wzzz() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get wzzw() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get wzwx() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get wzwy() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get wzwz() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get wzww() {
    return new i(
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get wwxx() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[0]
    );
  }
  get wwxy() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[1]
    );
  }
  get wwxz() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[2]
    );
  }
  get wwxw() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[0],
      this._v4storage[3]
    );
  }
  get wwyx() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[0]
    );
  }
  get wwyy() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[1]
    );
  }
  get wwyz() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[2]
    );
  }
  get wwyw() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[1],
      this._v4storage[3]
    );
  }
  get wwzx() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[0]
    );
  }
  get wwzy() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[1]
    );
  }
  get wwzz() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[2]
    );
  }
  get wwzw() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[2],
      this._v4storage[3]
    );
  }
  get wwwx() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[0]
    );
  }
  get wwwy() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[1]
    );
  }
  get wwwz() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[2]
    );
  }
  get wwww() {
    return new i(
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[3],
      this._v4storage[3]
    );
  }
  get r() {
    return this.x;
  }
  get g() {
    return this.y;
  }
  get b() {
    return this.z;
  }
  get a() {
    return this.w;
  }
  get s() {
    return this.x;
  }
  get t() {
    return this.y;
  }
  get p() {
    return this.z;
  }
  get q() {
    return this.w;
  }
  get x() {
    return this._v4storage[0];
  }
  get y() {
    return this._v4storage[1];
  }
  get z() {
    return this._v4storage[2];
  }
  get w() {
    return this._v4storage[3];
  }
  get rr() {
    return this.xx;
  }
  get rg() {
    return this.xy;
  }
  get rb() {
    return this.xz;
  }
  get ra() {
    return this.xw;
  }
  get gr() {
    return this.yx;
  }
  get gg() {
    return this.yy;
  }
  get gb() {
    return this.yz;
  }
  get ga() {
    return this.yw;
  }
  get br() {
    return this.zx;
  }
  get bg() {
    return this.zy;
  }
  get bb() {
    return this.zz;
  }
  get ba() {
    return this.zw;
  }
  get ar() {
    return this.wx;
  }
  get ag() {
    return this.wy;
  }
  get ab() {
    return this.wz;
  }
  get aa() {
    return this.ww;
  }
  get rrr() {
    return this.xxx;
  }
  get rrg() {
    return this.xxy;
  }
  get rrb() {
    return this.xxz;
  }
  get rra() {
    return this.xxw;
  }
  get rgr() {
    return this.xyx;
  }
  get rgg() {
    return this.xyy;
  }
  get rgb() {
    return this.xyz;
  }
  get rga() {
    return this.xyw;
  }
  get rbr() {
    return this.xzx;
  }
  get rbg() {
    return this.xzy;
  }
  get rbb() {
    return this.xzz;
  }
  get rba() {
    return this.xzw;
  }
  get rar() {
    return this.xwx;
  }
  get rag() {
    return this.xwy;
  }
  get rab() {
    return this.xwz;
  }
  get raa() {
    return this.xww;
  }
  get grr() {
    return this.yxx;
  }
  get grg() {
    return this.yxy;
  }
  get grb() {
    return this.yxz;
  }
  get gra() {
    return this.yxw;
  }
  get ggr() {
    return this.yyx;
  }
  get ggg() {
    return this.yyy;
  }
  get ggb() {
    return this.yyz;
  }
  get gga() {
    return this.yyw;
  }
  get gbr() {
    return this.yzx;
  }
  get gbg() {
    return this.yzy;
  }
  get gbb() {
    return this.yzz;
  }
  get gba() {
    return this.yzw;
  }
  get gar() {
    return this.ywx;
  }
  get gag() {
    return this.ywy;
  }
  get gab() {
    return this.ywz;
  }
  get gaa() {
    return this.yww;
  }
  get brr() {
    return this.zxx;
  }
  get brg() {
    return this.zxy;
  }
  get brb() {
    return this.zxz;
  }
  get bra() {
    return this.zxw;
  }
  get bgr() {
    return this.zyx;
  }
  get bgg() {
    return this.zyy;
  }
  get bgb() {
    return this.zyz;
  }
  get bga() {
    return this.zyw;
  }
  get bbr() {
    return this.zzx;
  }
  get bbg() {
    return this.zzy;
  }
  get bbb() {
    return this.zzz;
  }
  get bba() {
    return this.zzw;
  }
  get bar() {
    return this.zwx;
  }
  get bag() {
    return this.zwy;
  }
  get bab() {
    return this.zwz;
  }
  get baa() {
    return this.zww;
  }
  get arr() {
    return this.wxx;
  }
  get arg() {
    return this.wxy;
  }
  get arb() {
    return this.wxz;
  }
  get ara() {
    return this.wxw;
  }
  get agr() {
    return this.wyx;
  }
  get agg() {
    return this.wyy;
  }
  get agb() {
    return this.wyz;
  }
  get aga() {
    return this.wyw;
  }
  get abr() {
    return this.wzx;
  }
  get abg() {
    return this.wzy;
  }
  get abb() {
    return this.wzz;
  }
  get aba() {
    return this.wzw;
  }
  get aar() {
    return this.wwx;
  }
  get aag() {
    return this.wwy;
  }
  get aab() {
    return this.wwz;
  }
  get aaa() {
    return this.www;
  }
  get rrrr() {
    return this.xxxx;
  }
  get rrrg() {
    return this.xxxy;
  }
  get rrrb() {
    return this.xxxz;
  }
  get rrra() {
    return this.xxxw;
  }
  get rrgr() {
    return this.xxyx;
  }
  get rrgg() {
    return this.xxyy;
  }
  get rrgb() {
    return this.xxyz;
  }
  get rrga() {
    return this.xxyw;
  }
  get rrbr() {
    return this.xxzx;
  }
  get rrbg() {
    return this.xxzy;
  }
  get rrbb() {
    return this.xxzz;
  }
  get rrba() {
    return this.xxzw;
  }
  get rrar() {
    return this.xxwx;
  }
  get rrag() {
    return this.xxwy;
  }
  get rrab() {
    return this.xxwz;
  }
  get rraa() {
    return this.xxww;
  }
  get rgrr() {
    return this.xyxx;
  }
  get rgrg() {
    return this.xyxy;
  }
  get rgrb() {
    return this.xyxz;
  }
  get rgra() {
    return this.xyxw;
  }
  get rggr() {
    return this.xyyx;
  }
  get rggg() {
    return this.xyyy;
  }
  get rggb() {
    return this.xyyz;
  }
  get rgga() {
    return this.xyyw;
  }
  get rgbr() {
    return this.xyzx;
  }
  get rgbg() {
    return this.xyzy;
  }
  get rgbb() {
    return this.xyzz;
  }
  get rgba() {
    return this.xyzw;
  }
  get rgar() {
    return this.xywx;
  }
  get rgag() {
    return this.xywy;
  }
  get rgab() {
    return this.xywz;
  }
  get rgaa() {
    return this.xyww;
  }
  get rbrr() {
    return this.xzxx;
  }
  get rbrg() {
    return this.xzxy;
  }
  get rbrb() {
    return this.xzxz;
  }
  get rbra() {
    return this.xzxw;
  }
  get rbgr() {
    return this.xzyx;
  }
  get rbgg() {
    return this.xzyy;
  }
  get rbgb() {
    return this.xzyz;
  }
  get rbga() {
    return this.xzyw;
  }
  get rbbr() {
    return this.xzzx;
  }
  get rbbg() {
    return this.xzzy;
  }
  get rbbb() {
    return this.xzzz;
  }
  get rbba() {
    return this.xzzw;
  }
  get rbar() {
    return this.xzwx;
  }
  get rbag() {
    return this.xzwy;
  }
  get rbab() {
    return this.xzwz;
  }
  get rbaa() {
    return this.xzww;
  }
  get rarr() {
    return this.xwxx;
  }
  get rarg() {
    return this.xwxy;
  }
  get rarb() {
    return this.xwxz;
  }
  get rara() {
    return this.xwxw;
  }
  get ragr() {
    return this.xwyx;
  }
  get ragg() {
    return this.xwyy;
  }
  get ragb() {
    return this.xwyz;
  }
  get raga() {
    return this.xwyw;
  }
  get rabr() {
    return this.xwzx;
  }
  get rabg() {
    return this.xwzy;
  }
  get rabb() {
    return this.xwzz;
  }
  get raba() {
    return this.xwzw;
  }
  get raar() {
    return this.xwwx;
  }
  get raag() {
    return this.xwwy;
  }
  get raab() {
    return this.xwwz;
  }
  get raaa() {
    return this.xwww;
  }
  get grrr() {
    return this.yxxx;
  }
  get grrg() {
    return this.yxxy;
  }
  get grrb() {
    return this.yxxz;
  }
  get grra() {
    return this.yxxw;
  }
  get grgr() {
    return this.yxyx;
  }
  get grgg() {
    return this.yxyy;
  }
  get grgb() {
    return this.yxyz;
  }
  get grga() {
    return this.yxyw;
  }
  get grbr() {
    return this.yxzx;
  }
  get grbg() {
    return this.yxzy;
  }
  get grbb() {
    return this.yxzz;
  }
  get grba() {
    return this.yxzw;
  }
  get grar() {
    return this.yxwx;
  }
  get grag() {
    return this.yxwy;
  }
  get grab() {
    return this.yxwz;
  }
  get graa() {
    return this.yxww;
  }
  get ggrr() {
    return this.yyxx;
  }
  get ggrg() {
    return this.yyxy;
  }
  get ggrb() {
    return this.yyxz;
  }
  get ggra() {
    return this.yyxw;
  }
  get gggr() {
    return this.yyyx;
  }
  get gggg() {
    return this.yyyy;
  }
  get gggb() {
    return this.yyyz;
  }
  get ggga() {
    return this.yyyw;
  }
  get ggbr() {
    return this.yyzx;
  }
  get ggbg() {
    return this.yyzy;
  }
  get ggbb() {
    return this.yyzz;
  }
  get ggba() {
    return this.yyzw;
  }
  get ggar() {
    return this.yywx;
  }
  get ggag() {
    return this.yywy;
  }
  get ggab() {
    return this.yywz;
  }
  get ggaa() {
    return this.yyww;
  }
  get gbrr() {
    return this.yzxx;
  }
  get gbrg() {
    return this.yzxy;
  }
  get gbrb() {
    return this.yzxz;
  }
  get gbra() {
    return this.yzxw;
  }
  get gbgr() {
    return this.yzyx;
  }
  get gbgg() {
    return this.yzyy;
  }
  get gbgb() {
    return this.yzyz;
  }
  get gbga() {
    return this.yzyw;
  }
  get gbbr() {
    return this.yzzx;
  }
  get gbbg() {
    return this.yzzy;
  }
  get gbbb() {
    return this.yzzz;
  }
  get gbba() {
    return this.yzzw;
  }
  get gbar() {
    return this.yzwx;
  }
  get gbag() {
    return this.yzwy;
  }
  get gbab() {
    return this.yzwz;
  }
  get gbaa() {
    return this.yzww;
  }
  get garr() {
    return this.ywxx;
  }
  get garg() {
    return this.ywxy;
  }
  get garb() {
    return this.ywxz;
  }
  get gara() {
    return this.ywxw;
  }
  get gagr() {
    return this.ywyx;
  }
  get gagg() {
    return this.ywyy;
  }
  get gagb() {
    return this.ywyz;
  }
  get gaga() {
    return this.ywyw;
  }
  get gabr() {
    return this.ywzx;
  }
  get gabg() {
    return this.ywzy;
  }
  get gabb() {
    return this.ywzz;
  }
  get gaba() {
    return this.ywzw;
  }
  get gaar() {
    return this.ywwx;
  }
  get gaag() {
    return this.ywwy;
  }
  get gaab() {
    return this.ywwz;
  }
  get gaaa() {
    return this.ywww;
  }
  get brrr() {
    return this.zxxx;
  }
  get brrg() {
    return this.zxxy;
  }
  get brrb() {
    return this.zxxz;
  }
  get brra() {
    return this.zxxw;
  }
  get brgr() {
    return this.zxyx;
  }
  get brgg() {
    return this.zxyy;
  }
  get brgb() {
    return this.zxyz;
  }
  get brga() {
    return this.zxyw;
  }
  get brbr() {
    return this.zxzx;
  }
  get brbg() {
    return this.zxzy;
  }
  get brbb() {
    return this.zxzz;
  }
  get brba() {
    return this.zxzw;
  }
  get brar() {
    return this.zxwx;
  }
  get brag() {
    return this.zxwy;
  }
  get brab() {
    return this.zxwz;
  }
  get braa() {
    return this.zxww;
  }
  get bgrr() {
    return this.zyxx;
  }
  get bgrg() {
    return this.zyxy;
  }
  get bgrb() {
    return this.zyxz;
  }
  get bgra() {
    return this.zyxw;
  }
  get bggr() {
    return this.zyyx;
  }
  get bggg() {
    return this.zyyy;
  }
  get bggb() {
    return this.zyyz;
  }
  get bgga() {
    return this.zyyw;
  }
  get bgbr() {
    return this.zyzx;
  }
  get bgbg() {
    return this.zyzy;
  }
  get bgbb() {
    return this.zyzz;
  }
  get bgba() {
    return this.zyzw;
  }
  get bgar() {
    return this.zywx;
  }
  get bgag() {
    return this.zywy;
  }
  get bgab() {
    return this.zywz;
  }
  get bgaa() {
    return this.zyww;
  }
  get bbrr() {
    return this.zzxx;
  }
  get bbrg() {
    return this.zzxy;
  }
  get bbrb() {
    return this.zzxz;
  }
  get bbra() {
    return this.zzxw;
  }
  get bbgr() {
    return this.zzyx;
  }
  get bbgg() {
    return this.zzyy;
  }
  get bbgb() {
    return this.zzyz;
  }
  get bbga() {
    return this.zzyw;
  }
  get bbbr() {
    return this.zzzx;
  }
  get bbbg() {
    return this.zzzy;
  }
  get bbbb() {
    return this.zzzz;
  }
  get bbba() {
    return this.zzzw;
  }
  get bbar() {
    return this.zzwx;
  }
  get bbag() {
    return this.zzwy;
  }
  get bbab() {
    return this.zzwz;
  }
  get bbaa() {
    return this.zzww;
  }
  get barr() {
    return this.zwxx;
  }
  get barg() {
    return this.zwxy;
  }
  get barb() {
    return this.zwxz;
  }
  get bara() {
    return this.zwxw;
  }
  get bagr() {
    return this.zwyx;
  }
  get bagg() {
    return this.zwyy;
  }
  get bagb() {
    return this.zwyz;
  }
  get baga() {
    return this.zwyw;
  }
  get babr() {
    return this.zwzx;
  }
  get babg() {
    return this.zwzy;
  }
  get babb() {
    return this.zwzz;
  }
  get baba() {
    return this.zwzw;
  }
  get baar() {
    return this.zwwx;
  }
  get baag() {
    return this.zwwy;
  }
  get baab() {
    return this.zwwz;
  }
  get baaa() {
    return this.zwww;
  }
  get arrr() {
    return this.wxxx;
  }
  get arrg() {
    return this.wxxy;
  }
  get arrb() {
    return this.wxxz;
  }
  get arra() {
    return this.wxxw;
  }
  get argr() {
    return this.wxyx;
  }
  get argg() {
    return this.wxyy;
  }
  get argb() {
    return this.wxyz;
  }
  get arga() {
    return this.wxyw;
  }
  get arbr() {
    return this.wxzx;
  }
  get arbg() {
    return this.wxzy;
  }
  get arbb() {
    return this.wxzz;
  }
  get arba() {
    return this.wxzw;
  }
  get arar() {
    return this.wxwx;
  }
  get arag() {
    return this.wxwy;
  }
  get arab() {
    return this.wxwz;
  }
  get araa() {
    return this.wxww;
  }
  get agrr() {
    return this.wyxx;
  }
  get agrg() {
    return this.wyxy;
  }
  get agrb() {
    return this.wyxz;
  }
  get agra() {
    return this.wyxw;
  }
  get aggr() {
    return this.wyyx;
  }
  get aggg() {
    return this.wyyy;
  }
  get aggb() {
    return this.wyyz;
  }
  get agga() {
    return this.wyyw;
  }
  get agbr() {
    return this.wyzx;
  }
  get agbg() {
    return this.wyzy;
  }
  get agbb() {
    return this.wyzz;
  }
  get agba() {
    return this.wyzw;
  }
  get agar() {
    return this.wywx;
  }
  get agag() {
    return this.wywy;
  }
  get agab() {
    return this.wywz;
  }
  get agaa() {
    return this.wyww;
  }
  get abrr() {
    return this.wzxx;
  }
  get abrg() {
    return this.wzxy;
  }
  get abrb() {
    return this.wzxz;
  }
  get abra() {
    return this.wzxw;
  }
  get abgr() {
    return this.wzyx;
  }
  get abgg() {
    return this.wzyy;
  }
  get abgb() {
    return this.wzyz;
  }
  get abga() {
    return this.wzyw;
  }
  get abbr() {
    return this.wzzx;
  }
  get abbg() {
    return this.wzzy;
  }
  get abbb() {
    return this.wzzz;
  }
  get abba() {
    return this.wzzw;
  }
  get abar() {
    return this.wzwx;
  }
  get abag() {
    return this.wzwy;
  }
  get abab() {
    return this.wzwz;
  }
  get abaa() {
    return this.wzww;
  }
  get aarr() {
    return this.wwxx;
  }
  get aarg() {
    return this.wwxy;
  }
  get aarb() {
    return this.wwxz;
  }
  get aara() {
    return this.wwxw;
  }
  get aagr() {
    return this.wwyx;
  }
  get aagg() {
    return this.wwyy;
  }
  get aagb() {
    return this.wwyz;
  }
  get aaga() {
    return this.wwyw;
  }
  get aabr() {
    return this.wwzx;
  }
  get aabg() {
    return this.wwzy;
  }
  get aabb() {
    return this.wwzz;
  }
  get aaba() {
    return this.wwzw;
  }
  get aaar() {
    return this.wwwx;
  }
  get aaag() {
    return this.wwwy;
  }
  get aaab() {
    return this.wwwz;
  }
  get aaaa() {
    return this.wwww;
  }
  get ss() {
    return this.xx;
  }
  get st() {
    return this.xy;
  }
  get sp() {
    return this.xz;
  }
  get sq() {
    return this.xw;
  }
  get ts() {
    return this.yx;
  }
  get tt() {
    return this.yy;
  }
  get tp() {
    return this.yz;
  }
  get tq() {
    return this.yw;
  }
  get ps() {
    return this.zx;
  }
  get pt() {
    return this.zy;
  }
  get pp() {
    return this.zz;
  }
  get pq() {
    return this.zw;
  }
  get qs() {
    return this.wx;
  }
  get qt() {
    return this.wy;
  }
  get qp() {
    return this.wz;
  }
  get qq() {
    return this.ww;
  }
  get sss() {
    return this.xxx;
  }
  get sst() {
    return this.xxy;
  }
  get ssp() {
    return this.xxz;
  }
  get ssq() {
    return this.xxw;
  }
  get sts() {
    return this.xyx;
  }
  get stt() {
    return this.xyy;
  }
  get stp() {
    return this.xyz;
  }
  get stq() {
    return this.xyw;
  }
  get sps() {
    return this.xzx;
  }
  get spt() {
    return this.xzy;
  }
  get spp() {
    return this.xzz;
  }
  get spq() {
    return this.xzw;
  }
  get sqs() {
    return this.xwx;
  }
  get sqt() {
    return this.xwy;
  }
  get sqp() {
    return this.xwz;
  }
  get sqq() {
    return this.xww;
  }
  get tss() {
    return this.yxx;
  }
  get tst() {
    return this.yxy;
  }
  get tsp() {
    return this.yxz;
  }
  get tsq() {
    return this.yxw;
  }
  get tts() {
    return this.yyx;
  }
  get ttt() {
    return this.yyy;
  }
  get ttp() {
    return this.yyz;
  }
  get ttq() {
    return this.yyw;
  }
  get tps() {
    return this.yzx;
  }
  get tpt() {
    return this.yzy;
  }
  get tpp() {
    return this.yzz;
  }
  get tpq() {
    return this.yzw;
  }
  get tqs() {
    return this.ywx;
  }
  get tqt() {
    return this.ywy;
  }
  get tqp() {
    return this.ywz;
  }
  get tqq() {
    return this.yww;
  }
  get pss() {
    return this.zxx;
  }
  get pst() {
    return this.zxy;
  }
  get psp() {
    return this.zxz;
  }
  get psq() {
    return this.zxw;
  }
  get pts() {
    return this.zyx;
  }
  get ptt() {
    return this.zyy;
  }
  get ptp() {
    return this.zyz;
  }
  get ptq() {
    return this.zyw;
  }
  get pps() {
    return this.zzx;
  }
  get ppt() {
    return this.zzy;
  }
  get ppp() {
    return this.zzz;
  }
  get ppq() {
    return this.zzw;
  }
  get pqs() {
    return this.zwx;
  }
  get pqt() {
    return this.zwy;
  }
  get pqp() {
    return this.zwz;
  }
  get pqq() {
    return this.zww;
  }
  get qss() {
    return this.wxx;
  }
  get qst() {
    return this.wxy;
  }
  get qsp() {
    return this.wxz;
  }
  get qsq() {
    return this.wxw;
  }
  get qts() {
    return this.wyx;
  }
  get qtt() {
    return this.wyy;
  }
  get qtp() {
    return this.wyz;
  }
  get qtq() {
    return this.wyw;
  }
  get qps() {
    return this.wzx;
  }
  get qpt() {
    return this.wzy;
  }
  get qpp() {
    return this.wzz;
  }
  get qpq() {
    return this.wzw;
  }
  get qqs() {
    return this.wwx;
  }
  get qqt() {
    return this.wwy;
  }
  get qqp() {
    return this.wwz;
  }
  get qqq() {
    return this.www;
  }
  get ssss() {
    return this.xxxx;
  }
  get ssst() {
    return this.xxxy;
  }
  get sssp() {
    return this.xxxz;
  }
  get sssq() {
    return this.xxxw;
  }
  get ssts() {
    return this.xxyx;
  }
  get sstt() {
    return this.xxyy;
  }
  get sstp() {
    return this.xxyz;
  }
  get sstq() {
    return this.xxyw;
  }
  get ssps() {
    return this.xxzx;
  }
  get sspt() {
    return this.xxzy;
  }
  get sspp() {
    return this.xxzz;
  }
  get sspq() {
    return this.xxzw;
  }
  get ssqs() {
    return this.xxwx;
  }
  get ssqt() {
    return this.xxwy;
  }
  get ssqp() {
    return this.xxwz;
  }
  get ssqq() {
    return this.xxww;
  }
  get stss() {
    return this.xyxx;
  }
  get stst() {
    return this.xyxy;
  }
  get stsp() {
    return this.xyxz;
  }
  get stsq() {
    return this.xyxw;
  }
  get stts() {
    return this.xyyx;
  }
  get sttt() {
    return this.xyyy;
  }
  get sttp() {
    return this.xyyz;
  }
  get sttq() {
    return this.xyyw;
  }
  get stps() {
    return this.xyzx;
  }
  get stpt() {
    return this.xyzy;
  }
  get stpp() {
    return this.xyzz;
  }
  get stpq() {
    return this.xyzw;
  }
  get stqs() {
    return this.xywx;
  }
  get stqt() {
    return this.xywy;
  }
  get stqp() {
    return this.xywz;
  }
  get stqq() {
    return this.xyww;
  }
  get spss() {
    return this.xzxx;
  }
  get spst() {
    return this.xzxy;
  }
  get spsp() {
    return this.xzxz;
  }
  get spsq() {
    return this.xzxw;
  }
  get spts() {
    return this.xzyx;
  }
  get sptt() {
    return this.xzyy;
  }
  get sptp() {
    return this.xzyz;
  }
  get sptq() {
    return this.xzyw;
  }
  get spps() {
    return this.xzzx;
  }
  get sppt() {
    return this.xzzy;
  }
  get sppp() {
    return this.xzzz;
  }
  get sppq() {
    return this.xzzw;
  }
  get spqs() {
    return this.xzwx;
  }
  get spqt() {
    return this.xzwy;
  }
  get spqp() {
    return this.xzwz;
  }
  get spqq() {
    return this.xzww;
  }
  get sqss() {
    return this.xwxx;
  }
  get sqst() {
    return this.xwxy;
  }
  get sqsp() {
    return this.xwxz;
  }
  get sqsq() {
    return this.xwxw;
  }
  get sqts() {
    return this.xwyx;
  }
  get sqtt() {
    return this.xwyy;
  }
  get sqtp() {
    return this.xwyz;
  }
  get sqtq() {
    return this.xwyw;
  }
  get sqps() {
    return this.xwzx;
  }
  get sqpt() {
    return this.xwzy;
  }
  get sqpp() {
    return this.xwzz;
  }
  get sqpq() {
    return this.xwzw;
  }
  get sqqs() {
    return this.xwwx;
  }
  get sqqt() {
    return this.xwwy;
  }
  get sqqp() {
    return this.xwwz;
  }
  get sqqq() {
    return this.xwww;
  }
  get tsss() {
    return this.yxxx;
  }
  get tsst() {
    return this.yxxy;
  }
  get tssp() {
    return this.yxxz;
  }
  get tssq() {
    return this.yxxw;
  }
  get tsts() {
    return this.yxyx;
  }
  get tstt() {
    return this.yxyy;
  }
  get tstp() {
    return this.yxyz;
  }
  get tstq() {
    return this.yxyw;
  }
  get tsps() {
    return this.yxzx;
  }
  get tspt() {
    return this.yxzy;
  }
  get tspp() {
    return this.yxzz;
  }
  get tspq() {
    return this.yxzw;
  }
  get tsqs() {
    return this.yxwx;
  }
  get tsqt() {
    return this.yxwy;
  }
  get tsqp() {
    return this.yxwz;
  }
  get tsqq() {
    return this.yxww;
  }
  get ttss() {
    return this.yyxx;
  }
  get ttst() {
    return this.yyxy;
  }
  get ttsp() {
    return this.yyxz;
  }
  get ttsq() {
    return this.yyxw;
  }
  get ttts() {
    return this.yyyx;
  }
  get tttt() {
    return this.yyyy;
  }
  get tttp() {
    return this.yyyz;
  }
  get tttq() {
    return this.yyyw;
  }
  get ttps() {
    return this.yyzx;
  }
  get ttpt() {
    return this.yyzy;
  }
  get ttpp() {
    return this.yyzz;
  }
  get ttpq() {
    return this.yyzw;
  }
  get ttqs() {
    return this.yywx;
  }
  get ttqt() {
    return this.yywy;
  }
  get ttqp() {
    return this.yywz;
  }
  get ttqq() {
    return this.yyww;
  }
  get tpss() {
    return this.yzxx;
  }
  get tpst() {
    return this.yzxy;
  }
  get tpsp() {
    return this.yzxz;
  }
  get tpsq() {
    return this.yzxw;
  }
  get tpts() {
    return this.yzyx;
  }
  get tptt() {
    return this.yzyy;
  }
  get tptp() {
    return this.yzyz;
  }
  get tptq() {
    return this.yzyw;
  }
  get tpps() {
    return this.yzzx;
  }
  get tppt() {
    return this.yzzy;
  }
  get tppp() {
    return this.yzzz;
  }
  get tppq() {
    return this.yzzw;
  }
  get tpqs() {
    return this.yzwx;
  }
  get tpqt() {
    return this.yzwy;
  }
  get tpqp() {
    return this.yzwz;
  }
  get tpqq() {
    return this.yzww;
  }
  get tqss() {
    return this.ywxx;
  }
  get tqst() {
    return this.ywxy;
  }
  get tqsp() {
    return this.ywxz;
  }
  get tqsq() {
    return this.ywxw;
  }
  get tqts() {
    return this.ywyx;
  }
  get tqtt() {
    return this.ywyy;
  }
  get tqtp() {
    return this.ywyz;
  }
  get tqtq() {
    return this.ywyw;
  }
  get tqps() {
    return this.ywzx;
  }
  get tqpt() {
    return this.ywzy;
  }
  get tqpp() {
    return this.ywzz;
  }
  get tqpq() {
    return this.ywzw;
  }
  get tqqs() {
    return this.ywwx;
  }
  get tqqt() {
    return this.ywwy;
  }
  get tqqp() {
    return this.ywwz;
  }
  get tqqq() {
    return this.ywww;
  }
  get psss() {
    return this.zxxx;
  }
  get psst() {
    return this.zxxy;
  }
  get pssp() {
    return this.zxxz;
  }
  get pssq() {
    return this.zxxw;
  }
  get psts() {
    return this.zxyx;
  }
  get pstt() {
    return this.zxyy;
  }
  get pstp() {
    return this.zxyz;
  }
  get pstq() {
    return this.zxyw;
  }
  get psps() {
    return this.zxzx;
  }
  get pspt() {
    return this.zxzy;
  }
  get pspp() {
    return this.zxzz;
  }
  get pspq() {
    return this.zxzw;
  }
  get psqs() {
    return this.zxwx;
  }
  get psqt() {
    return this.zxwy;
  }
  get psqp() {
    return this.zxwz;
  }
  get psqq() {
    return this.zxww;
  }
  get ptss() {
    return this.zyxx;
  }
  get ptst() {
    return this.zyxy;
  }
  get ptsp() {
    return this.zyxz;
  }
  get ptsq() {
    return this.zyxw;
  }
  get ptts() {
    return this.zyyx;
  }
  get pttt() {
    return this.zyyy;
  }
  get pttp() {
    return this.zyyz;
  }
  get pttq() {
    return this.zyyw;
  }
  get ptps() {
    return this.zyzx;
  }
  get ptpt() {
    return this.zyzy;
  }
  get ptpp() {
    return this.zyzz;
  }
  get ptpq() {
    return this.zyzw;
  }
  get ptqs() {
    return this.zywx;
  }
  get ptqt() {
    return this.zywy;
  }
  get ptqp() {
    return this.zywz;
  }
  get ptqq() {
    return this.zyww;
  }
  get ppss() {
    return this.zzxx;
  }
  get ppst() {
    return this.zzxy;
  }
  get ppsp() {
    return this.zzxz;
  }
  get ppsq() {
    return this.zzxw;
  }
  get ppts() {
    return this.zzyx;
  }
  get pptt() {
    return this.zzyy;
  }
  get pptp() {
    return this.zzyz;
  }
  get pptq() {
    return this.zzyw;
  }
  get ppps() {
    return this.zzzx;
  }
  get pppt() {
    return this.zzzy;
  }
  get pppp() {
    return this.zzzz;
  }
  get pppq() {
    return this.zzzw;
  }
  get ppqs() {
    return this.zzwx;
  }
  get ppqt() {
    return this.zzwy;
  }
  get ppqp() {
    return this.zzwz;
  }
  get ppqq() {
    return this.zzww;
  }
  get pqss() {
    return this.zwxx;
  }
  get pqst() {
    return this.zwxy;
  }
  get pqsp() {
    return this.zwxz;
  }
  get pqsq() {
    return this.zwxw;
  }
  get pqts() {
    return this.zwyx;
  }
  get pqtt() {
    return this.zwyy;
  }
  get pqtp() {
    return this.zwyz;
  }
  get pqtq() {
    return this.zwyw;
  }
  get pqps() {
    return this.zwzx;
  }
  get pqpt() {
    return this.zwzy;
  }
  get pqpp() {
    return this.zwzz;
  }
  get pqpq() {
    return this.zwzw;
  }
  get pqqs() {
    return this.zwwx;
  }
  get pqqt() {
    return this.zwwy;
  }
  get pqqp() {
    return this.zwwz;
  }
  get pqqq() {
    return this.zwww;
  }
  get qsss() {
    return this.wxxx;
  }
  get qsst() {
    return this.wxxy;
  }
  get qssp() {
    return this.wxxz;
  }
  get qssq() {
    return this.wxxw;
  }
  get qsts() {
    return this.wxyx;
  }
  get qstt() {
    return this.wxyy;
  }
  get qstp() {
    return this.wxyz;
  }
  get qstq() {
    return this.wxyw;
  }
  get qsps() {
    return this.wxzx;
  }
  get qspt() {
    return this.wxzy;
  }
  get qspp() {
    return this.wxzz;
  }
  get qspq() {
    return this.wxzw;
  }
  get qsqs() {
    return this.wxwx;
  }
  get qsqt() {
    return this.wxwy;
  }
  get qsqp() {
    return this.wxwz;
  }
  get qsqq() {
    return this.wxww;
  }
  get qtss() {
    return this.wyxx;
  }
  get qtst() {
    return this.wyxy;
  }
  get qtsp() {
    return this.wyxz;
  }
  get qtsq() {
    return this.wyxw;
  }
  get qtts() {
    return this.wyyx;
  }
  get qttt() {
    return this.wyyy;
  }
  get qttp() {
    return this.wyyz;
  }
  get qttq() {
    return this.wyyw;
  }
  get qtps() {
    return this.wyzx;
  }
  get qtpt() {
    return this.wyzy;
  }
  get qtpp() {
    return this.wyzz;
  }
  get qtpq() {
    return this.wyzw;
  }
  get qtqs() {
    return this.wywx;
  }
  get qtqt() {
    return this.wywy;
  }
  get qtqp() {
    return this.wywz;
  }
  get qtqq() {
    return this.wyww;
  }
  get qpss() {
    return this.wzxx;
  }
  get qpst() {
    return this.wzxy;
  }
  get qpsp() {
    return this.wzxz;
  }
  get qpsq() {
    return this.wzxw;
  }
  get qpts() {
    return this.wzyx;
  }
  get qptt() {
    return this.wzyy;
  }
  get qptp() {
    return this.wzyz;
  }
  get qptq() {
    return this.wzyw;
  }
  get qpps() {
    return this.wzzx;
  }
  get qppt() {
    return this.wzzy;
  }
  get qppp() {
    return this.wzzz;
  }
  get qppq() {
    return this.wzzw;
  }
  get qpqs() {
    return this.wzwx;
  }
  get qpqt() {
    return this.wzwy;
  }
  get qpqp() {
    return this.wzwz;
  }
  get qpqq() {
    return this.wzww;
  }
  get qqss() {
    return this.wwxx;
  }
  get qqst() {
    return this.wwxy;
  }
  get qqsp() {
    return this.wwxz;
  }
  get qqsq() {
    return this.wwxw;
  }
  get qqts() {
    return this.wwyx;
  }
  get qqtt() {
    return this.wwyy;
  }
  get qqtp() {
    return this.wwyz;
  }
  get qqtq() {
    return this.wwyw;
  }
  get qqps() {
    return this.wwzx;
  }
  get qqpt() {
    return this.wwzy;
  }
  get qqpp() {
    return this.wwzz;
  }
  get qqpq() {
    return this.wwzw;
  }
  get qqqs() {
    return this.wwwx;
  }
  get qqqt() {
    return this.wwwy;
  }
  get qqqp() {
    return this.wwwz;
  }
  get qqqq() {
    return this.wwww;
  }
}
class vt {
  constructor(s, t) {
    o(this, "_v2storage");
    this._v2storage = [s, t];
  }
  set xy(s) {
    const t = s._v2storage;
    this._v2storage[0] = t[0], this._v2storage[1] = t[1];
  }
  set yx(s) {
    const t = s._v2storage;
    this._v2storage[1] = t[0], this._v2storage[0] = t[1];
  }
  set r(s) {
    this.x = s;
  }
  set g(s) {
    this.y = s;
  }
  set s(s) {
    this.x = s;
  }
  set t(s) {
    this.y = s;
  }
  set x(s) {
    this._v2storage[0] = s;
  }
  set y(s) {
    this._v2storage[1] = s;
  }
  set rg(s) {
    this.xy = s;
  }
  set gr(s) {
    this.yx = s;
  }
  set st(s) {
    this.xy = s;
  }
  set ts(s) {
    this.yx = s;
  }
  get xx() {
    return new vt(this._v2storage[0], this._v2storage[0]);
  }
  get xy() {
    return new vt(this._v2storage[0], this._v2storage[1]);
  }
  get yx() {
    return new vt(this._v2storage[1], this._v2storage[0]);
  }
  get yy() {
    return new vt(this._v2storage[1], this._v2storage[1]);
  }
  get xxx() {
    return new p(
      this._v2storage[0],
      this._v2storage[0],
      this._v2storage[0]
    );
  }
  get xxy() {
    return new p(
      this._v2storage[0],
      this._v2storage[0],
      this._v2storage[1]
    );
  }
  get xyx() {
    return new p(
      this._v2storage[0],
      this._v2storage[1],
      this._v2storage[0]
    );
  }
  get xyy() {
    return new p(
      this._v2storage[0],
      this._v2storage[1],
      this._v2storage[1]
    );
  }
  get yxx() {
    return new p(
      this._v2storage[1],
      this._v2storage[0],
      this._v2storage[0]
    );
  }
  get yxy() {
    return new p(
      this._v2storage[1],
      this._v2storage[0],
      this._v2storage[1]
    );
  }
  get yyx() {
    return new p(
      this._v2storage[1],
      this._v2storage[1],
      this._v2storage[0]
    );
  }
  get yyy() {
    return new p(
      this._v2storage[1],
      this._v2storage[1],
      this._v2storage[1]
    );
  }
  get xxxx() {
    return new i(
      this._v2storage[0],
      this._v2storage[0],
      this._v2storage[0],
      this._v2storage[0]
    );
  }
  get xxxy() {
    return new i(
      this._v2storage[0],
      this._v2storage[0],
      this._v2storage[0],
      this._v2storage[1]
    );
  }
  get xxyx() {
    return new i(
      this._v2storage[0],
      this._v2storage[0],
      this._v2storage[1],
      this._v2storage[0]
    );
  }
  get xxyy() {
    return new i(
      this._v2storage[0],
      this._v2storage[0],
      this._v2storage[1],
      this._v2storage[1]
    );
  }
  get xyxx() {
    return new i(
      this._v2storage[0],
      this._v2storage[1],
      this._v2storage[0],
      this._v2storage[0]
    );
  }
  get xyxy() {
    return new i(
      this._v2storage[0],
      this._v2storage[1],
      this._v2storage[0],
      this._v2storage[1]
    );
  }
  get xyyx() {
    return new i(
      this._v2storage[0],
      this._v2storage[1],
      this._v2storage[1],
      this._v2storage[0]
    );
  }
  get xyyy() {
    return new i(
      this._v2storage[0],
      this._v2storage[1],
      this._v2storage[1],
      this._v2storage[1]
    );
  }
  get yxxx() {
    return new i(
      this._v2storage[1],
      this._v2storage[0],
      this._v2storage[0],
      this._v2storage[0]
    );
  }
  get yxxy() {
    return new i(
      this._v2storage[1],
      this._v2storage[0],
      this._v2storage[0],
      this._v2storage[1]
    );
  }
  get yxyx() {
    return new i(
      this._v2storage[1],
      this._v2storage[0],
      this._v2storage[1],
      this._v2storage[0]
    );
  }
  get yxyy() {
    return new i(
      this._v2storage[1],
      this._v2storage[0],
      this._v2storage[1],
      this._v2storage[1]
    );
  }
  get yyxx() {
    return new i(
      this._v2storage[1],
      this._v2storage[1],
      this._v2storage[0],
      this._v2storage[0]
    );
  }
  get yyxy() {
    return new i(
      this._v2storage[1],
      this._v2storage[1],
      this._v2storage[0],
      this._v2storage[1]
    );
  }
  get yyyx() {
    return new i(
      this._v2storage[1],
      this._v2storage[1],
      this._v2storage[1],
      this._v2storage[0]
    );
  }
  get yyyy() {
    return new i(
      this._v2storage[1],
      this._v2storage[1],
      this._v2storage[1],
      this._v2storage[1]
    );
  }
  get r() {
    return this.x;
  }
  get g() {
    return this.y;
  }
  get s() {
    return this.x;
  }
  get t() {
    return this.y;
  }
  get x() {
    return this._v2storage[0];
  }
  get y() {
    return this._v2storage[1];
  }
  get rr() {
    return this.xx;
  }
  get rg() {
    return this.xy;
  }
  get gr() {
    return this.yx;
  }
  get gg() {
    return this.yy;
  }
  get rrr() {
    return this.xxx;
  }
  get rrg() {
    return this.xxy;
  }
  get rgr() {
    return this.xyx;
  }
  get rgg() {
    return this.xyy;
  }
  get grr() {
    return this.yxx;
  }
  get grg() {
    return this.yxy;
  }
  get ggr() {
    return this.yyx;
  }
  get ggg() {
    return this.yyy;
  }
  get rrrr() {
    return this.xxxx;
  }
  get rrrg() {
    return this.xxxy;
  }
  get rrgr() {
    return this.xxyx;
  }
  get rrgg() {
    return this.xxyy;
  }
  get rgrr() {
    return this.xyxx;
  }
  get rgrg() {
    return this.xyxy;
  }
  get rggr() {
    return this.xyyx;
  }
  get rggg() {
    return this.xyyy;
  }
  get grrr() {
    return this.yxxx;
  }
  get grrg() {
    return this.yxxy;
  }
  get grgr() {
    return this.yxyx;
  }
  get grgg() {
    return this.yxyy;
  }
  get ggrr() {
    return this.yyxx;
  }
  get ggrg() {
    return this.yyxy;
  }
  get gggr() {
    return this.yyyx;
  }
  get gggg() {
    return this.yyyy;
  }
  getss() {
    return this.xx;
  }
  getst() {
    return this.xy;
  }
  getts() {
    return this.yx;
  }
  gettt() {
    return this.yy;
  }
  get sss() {
    return this.xxx;
  }
  get sst() {
    return this.xxy;
  }
  get sts() {
    return this.xyx;
  }
  get stt() {
    return this.xyy;
  }
  get tss() {
    return this.yxx;
  }
  get tst() {
    return this.yxy;
  }
  get tts() {
    return this.yyx;
  }
  get ttt() {
    return this.yyy;
  }
  get ssss() {
    return this.xxxx;
  }
  get ssst() {
    return this.xxxy;
  }
  get ssts() {
    return this.xxyx;
  }
  get sstt() {
    return this.xxyy;
  }
  get stss() {
    return this.xyxx;
  }
  get stst() {
    return this.xyxy;
  }
  get stts() {
    return this.xyyx;
  }
  get sttt() {
    return this.xyyy;
  }
  get tsss() {
    return this.yxxx;
  }
  get tsst() {
    return this.yxxy;
  }
  get tsts() {
    return this.yxyx;
  }
  get tstt() {
    return this.yxyy;
  }
  get ttss() {
    return this.yyxx;
  }
  get ttst() {
    return this.yyxy;
  }
  get ttts() {
    return this.yyyx;
  }
  get tttt() {
    return this.yyyy;
  }
}
const T = vt;
class A {
  constructor(s, t, e) {
    o(this, "_v3storage");
    this._v3storage = [s, t, e];
  }
  get storage() {
    return this._v3storage;
  }
  static copy(s) {
    return new A(...s._v3storage);
  }
  setValues(s, t, e) {
    this._v3storage[0] = s, this._v3storage[1] = t, this._v3storage[2] = e;
  }
  setZero() {
    this._v3storage[0] = 0, this._v3storage[1] = 0, this._v3storage[2] = 0;
  }
  setFrom(s) {
    const t = s._v3storage;
    this._v3storage[0] = t[0], this._v3storage[1] = t[1], this._v3storage[2] = t[2];
  }
  splat(s) {
    this._v3storage[0] = s, this._v3storage[1] = s, this._v3storage[2] = s;
  }
  toString() {
    return `[${this._v3storage[0]},${this._v3storage[1]},${this._v3storage[2]}]`;
  }
  /**
   * Set the length of the vector. A negative `value` will change the vectors
   * orientation and a `value` of zero will set the vector to zero.
   */
  set length(s) {
    if (s === 0)
      this.setZero();
    else {
      let t = this.length;
      if (t === 0)
        return;
      t = s / t, this._v3storage[0] *= t, this._v3storage[1] *= t, this._v3storage[2] *= t;
    }
  }
  /**
   * Length.
   */
  get length() {
    return Math.sqrt(this.length2);
  }
  /**
   * Length squared.
   */
  get length2() {
    let s = 0;
    return s += this._v3storage[0] * this._v3storage[0], s += this._v3storage[1] * this._v3storage[1], s += this._v3storage[2] * this._v3storage[2], s;
  }
  /**
   * Normalizes this.
   */
  normalize() {
    const s = this.length;
    if (s === 0)
      return 0;
    const t = 1 / s;
    return this._v3storage[0] *= t, this._v3storage[1] *= t, this._v3storage[2] *= t, s;
  }
  /// Normalizes copy of this.
  normalized() {
    const s = A.copy(this);
    return s.normalize(), s;
  }
  /// Normalize vector into [out].
  normalizeInto(s) {
    return s.setFrom(this), s.normalize(), s;
  }
  /// Distance from this to [arg]
  distanceTo(s) {
    return Math.sqrt(this.distanceToSquared(s));
  }
  /// Squared distance from this to [arg]
  distanceToSquared(s) {
    const t = s._v3storage, e = this._v3storage[0] - t[0], r = this._v3storage[1] - t[1], h = this._v3storage[2] - t[2];
    return e * e + r * r + h * h;
  }
  /// Returns the angle between this vector and [other] in radians.
  angleTo(s) {
    const t = s._v3storage;
    if (this._v3storage[0] === t[0] && this._v3storage[1] === t[1] && this._v3storage[2] === t[2])
      return 0;
    const e = this.dot(s) / (this.length * s.length);
    return Math.acos(Math.min(Math.max(e, -1), 1));
  }
  /// Returns the signed angle between this and [other] around [normal]
  /// in radians.
  angleToSigned(s, t) {
    const e = this.angleTo(s);
    return this.cross(s).dot(t) < 0 ? -e : e;
  }
  /// Inner product.
  dot(s) {
    const t = s._v3storage;
    let e = 0;
    return e += this._v3storage[0] * t[0], e += this._v3storage[1] * t[1], e += this._v3storage[2] * t[2], e;
  }
  /**
   * Transforms this into the product of this as a row vector,
   * postmultiplied by matrix, [arg].
   * If [arg] is a rotation matrix, this is a computational shortcut for applying,
   * the inverse of the transformation.
   */
  postmultiply(s) {
    const t = s.storage, e = this._v3storage[0], r = this._v3storage[1], h = this._v3storage[2];
    this._v3storage[0] = e * t[0] + r * t[1] + h * t[2], this._v3storage[1] = e * t[3] + r * t[4] + h * t[5], this._v3storage[2] = e * t[6] + r * t[7] + h * t[8];
  }
  /// Cross product.
  cross(s) {
    const t = this._v3storage[0], e = this._v3storage[1], r = this._v3storage[2], h = s._v3storage, g = h[0], n = h[1], u = h[2];
    return new A(e * u - r * n, r * g - t * u, t * n - e * g);
  }
  /// Cross product. Stores result in [out].
  crossInto(s, t) {
    const e = this._v3storage[0], r = this._v3storage[1], h = this._v3storage[2], g = s._v3storage, n = g[0], u = g[1], v = g[2], x = t._v3storage;
    return x[0] = r * v - h * u, x[1] = h * n - e * v, x[2] = e * u - r * n, t;
  }
  reflected(s) {
    const t = this.clone();
    return t.reflect(s), t;
  }
  clone() {
    return A.copy(this);
  }
  reflect(s) {
    this.sub(s.scaled(2 * s.dot(this)));
  }
  /// Projects this using the projection matrix [arg]
  applyProjection(s) {
    const t = s._m4storage, e = this._v3storage[0], r = this._v3storage[1], h = this._v3storage[2], g = 1 / (t[3] * e + t[7] * r + t[11] * h + t[15]);
    this._v3storage[0] = (t[0] * e + t[4] * r + t[8] * h + t[12]) * g, this._v3storage[1] = (t[1] * e + t[5] * r + t[9] * h + t[13]) * g, this._v3storage[2] = (t[2] * e + t[6] * r + t[10] * h + t[14]) * g;
  }
  // /// Applies a rotation specified by [axis] and [angle].
  // void applyAxisAngle(Vector3 axis, double angle) {
  //   applyQuaternion(Quaternion.axisAngle(axis, angle));
  // }
  // /// Applies a quaternion transform.
  // void applyQuaternion(Quaternion arg) {
  //   final argStorage = arg._qStorage;
  //   final v0 = _v3storage[0];
  //   final v1 = _v3storage[1];
  //   final v2 = _v3storage[2];
  //   final qx = argStorage[0];
  //   final qy = argStorage[1];
  //   final qz = argStorage[2];
  //   final qw = argStorage[3];
  //   final ix = qw * v0 + qy * v2 - qz * v1;
  //   final iy = qw * v1 + qz * v0 - qx * v2;
  //   final iz = qw * v2 + qx * v1 - qy * v0;
  //   final iw = -qx * v0 - qy * v1 - qz * v2;
  //   _v3storage[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  //   _v3storage[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  //   _v3storage[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  // }
  /// Multiplies this by [arg].
  applyMatrix3(s) {
    const t = s.storage, e = this._v3storage[0], r = this._v3storage[1], h = this._v3storage[2];
    this._v3storage[0] = t[0] * e + t[3] * r + t[6] * h, this._v3storage[1] = t[1] * e + t[4] * r + t[7] * h, this._v3storage[2] = t[2] * e + t[5] * r + t[8] * h;
  }
  /// Multiplies this by a 4x3 subset of [arg]. Expects [arg] to be an affine
  /// transformation matrix.
  applyMatrix4(s) {
    const t = s._m4storage, e = this._v3storage[0], r = this._v3storage[1], h = this._v3storage[2];
    this._v3storage[0] = t[0] * e + t[4] * r + t[8] * h + t[12], this._v3storage[1] = t[1] * e + t[5] * r + t[9] * h + t[13], this._v3storage[2] = t[2] * e + t[6] * r + t[10] * h + t[14];
  }
  /// Relative error between this and [correct]
  relativeError(s) {
    const t = s.length, e = this.clone();
    return e.sub(s), e.length / t;
  }
  /// Absolute error between this and [correct]
  absoluteError(s) {
    const t = this.clone();
    return t.sub(s), t.length;
  }
  /**
   * Returns true if any component is infinite.
   */
  get isInfinite() {
    let s = !1;
    return s = s || !isFinite(this._v3storage[0]), s = s || !isFinite(this._v3storage[1]), s = s || !isFinite(this._v3storage[2]), s;
  }
  /**
   * Returns true if any component is NaN.
   */
  get isNaN() {
    let s = !1;
    return s = s || isNaN(this._v3storage[0]), s = s || isNaN(this._v3storage[1]), s = s || isNaN(this._v3storage[2]), s;
  }
  /**
   * Add `arg` to this vector.
   */
  add(s) {
    const t = s._v3storage;
    this._v3storage[0] += t[0], this._v3storage[1] += t[1], this._v3storage[2] += t[2];
  }
  /**
   * Add [arg] scaled by [factor] to this.
   */
  addScaled(s, t) {
    const e = s._v3storage;
    this._v3storage[0] += e[0] * t, this._v3storage[1] += e[1] * t, this._v3storage[2] += e[2] * t;
  }
  sub(s) {
    const t = s._v3storage;
    this._v3storage[0] -= t[0], this._v3storage[1] -= t[1], this._v3storage[2] -= t[2];
  }
  /**
   * Multiply entries in this with entries in [arg].
   */
  multiply(s) {
    const t = s._v3storage;
    this._v3storage[0] = this._v3storage[0] * t[0], this._v3storage[1] = this._v3storage[1] * t[1], this._v3storage[2] = this._v3storage[2] * t[2];
  }
  /**
   * Divide entries in this with entries in [arg].
   */
  divide(s) {
    const t = s._v3storage;
    this._v3storage[0] /= t[0], this._v3storage[1] /= t[1], this._v3storage[2] /= t[2];
  }
  /**
    Scale this.
  */
  scale(s) {
    this._v3storage[2] *= s, this._v3storage[1] *= s, this._v3storage[0] *= s;
  }
  /**
  
  Create a copy of this and scale it by [arg].
  */
  scaled(s) {
    const t = this.clone();
    return t.scale(s), t;
  }
  /**
   * Negate each component of this vector.
   */
  negate() {
    this._v3storage[2] = -this._v3storage[2], this._v3storage[1] = -this._v3storage[1], this._v3storage[0] = -this._v3storage[0];
  }
  /**
   * Absolute value.
   */
  absolute() {
    this._v3storage[0] = Math.abs(this._v3storage[0]), this._v3storage[1] = Math.abs(this._v3storage[1]), this._v3storage[2] = Math.abs(this._v3storage[2]);
  }
  /**
  
  Clamp each entry n in this in the range [min[n]]-[max[n]].
  */
  clamp(s, t) {
    const e = s.storage, r = t.storage;
    this._v3storage[0] = this._clamp(
      this._v3storage[0],
      e[0],
      r[0]
    ), this._v3storage[1] = this._clamp(
      this._v3storage[1],
      e[1],
      r[1]
    ), this._v3storage[2] = this._clamp(
      this._v3storage[2],
      e[2],
      r[2]
    );
  }
  /**
   * Clamp entries in this in the range [min]-[max].
   */
  clampScalar(s, t) {
    this._v3storage[0] = this._clamp(this._v3storage[0], s, t), this._v3storage[1] = this._clamp(this._v3storage[1], s, t), this._v3storage[2] = this._clamp(this._v3storage[2], s, t);
  }
  /**
  Floor entries in this.
  */
  floor() {
    this._v3storage[0] = Math.floor(this._v3storage[0]), this._v3storage[1] = Math.floor(this._v3storage[1]), this._v3storage[2] = Math.floor(this._v3storage[2]);
  }
  /**
  
  Ceil entries in this.
  */
  ceil() {
    this._v3storage[0] = Math.ceil(this._v3storage[0]), this._v3storage[1] = Math.ceil(this._v3storage[1]), this._v3storage[2] = Math.ceil(this._v3storage[2]);
  }
  /**
  Round entries in this.
  */
  round() {
    this._v3storage[0] = Math.round(this._v3storage[0]), this._v3storage[1] = Math.round(this._v3storage[1]), this._v3storage[2] = Math.round(this._v3storage[2]);
  }
  _clamp(s, t, e) {
    return Math.max(t, Math.min(e, s));
  }
  set xy(s) {
    const t = s._v2storage;
    this._v3storage[0] = t[0], this._v3storage[1] = t[1];
  }
  set xz(s) {
    const t = s._v2storage;
    this._v3storage[0] = t[0], this._v3storage[2] = t[1];
  }
  set yx(s) {
    const t = s._v2storage;
    this._v3storage[1] = t[0], this._v3storage[0] = t[1];
  }
  set yz(s) {
    const t = s._v2storage;
    this._v3storage[1] = t[0], this._v3storage[2] = t[1];
  }
  set zx(s) {
    const t = s._v2storage;
    this._v3storage[2] = t[0], this._v3storage[0] = t[1];
  }
  set zy(s) {
    const t = s._v2storage;
    this._v3storage[2] = t[0], this._v3storage[1] = t[1];
  }
  set xyz(s) {
    const t = s._v3storage;
    this._v3storage[0] = t[0], this._v3storage[1] = t[1], this._v3storage[2] = t[2];
  }
  set xzy(s) {
    const t = s._v3storage;
    this._v3storage[0] = t[0], this._v3storage[2] = t[1], this._v3storage[1] = t[2];
  }
  set yxz(s) {
    const t = s._v3storage;
    this._v3storage[1] = t[0], this._v3storage[0] = t[1], this._v3storage[2] = t[2];
  }
  set yzx(s) {
    const t = s._v3storage;
    this._v3storage[1] = t[0], this._v3storage[2] = t[1], this._v3storage[0] = t[2];
  }
  set zxy(s) {
    const t = s._v3storage;
    this._v3storage[2] = t[0], this._v3storage[0] = t[1], this._v3storage[1] = t[2];
  }
  set zyx(s) {
    const t = s._v3storage;
    this._v3storage[2] = t[0], this._v3storage[1] = t[1], this._v3storage[0] = t[2];
  }
  set r(s) {
    this.x = s;
  }
  set g(s) {
    this.y = s;
  }
  set b(s) {
    this.z = s;
  }
  set s(s) {
    this.x = s;
  }
  set t(s) {
    this.y = s;
  }
  set p(s) {
    this.z = s;
  }
  set x(s) {
    this._v3storage[0] = s;
  }
  set y(s) {
    this._v3storage[1] = s;
  }
  set z(s) {
    this._v3storage[2] = s;
  }
  set rg(s) {
    this.xy = s;
  }
  set rb(s) {
    this.xz = s;
  }
  set gr(s) {
    this.yx = s;
  }
  set gb(s) {
    this.yz = s;
  }
  set br(s) {
    this.zx = s;
  }
  set bg(s) {
    this.zy = s;
  }
  set rgb(s) {
    this.xyz = s;
  }
  set rbg(s) {
    this.xzy = s;
  }
  set grb(s) {
    this.yxz = s;
  }
  set gbr(s) {
    this.yzx = s;
  }
  set brg(s) {
    this.zxy = s;
  }
  set bgr(s) {
    this.zyx = s;
  }
  set st(s) {
    this.xy = s;
  }
  set sp(s) {
    this.xz = s;
  }
  set ts(s) {
    this.yx = s;
  }
  set tp(s) {
    this.yz = s;
  }
  set ps(s) {
    this.zx = s;
  }
  set pt(s) {
    this.zy = s;
  }
  set stp(s) {
    this.xyz = s;
  }
  set spt(s) {
    this.xzy = s;
  }
  set tsp(s) {
    this.yxz = s;
  }
  set tps(s) {
    this.yzx = s;
  }
  set pst(s) {
    this.zxy = s;
  }
  set pts(s) {
    this.zyx = s;
  }
  get xx() {
    return new T(this._v3storage[0], this._v3storage[0]);
  }
  get xy() {
    return new T(this._v3storage[0], this._v3storage[1]);
  }
  get xz() {
    return new T(this._v3storage[0], this._v3storage[2]);
  }
  get yx() {
    return new T(this._v3storage[1], this._v3storage[0]);
  }
  get yy() {
    return new T(this._v3storage[1], this._v3storage[1]);
  }
  get yz() {
    return new T(this._v3storage[1], this._v3storage[2]);
  }
  get zx() {
    return new T(this._v3storage[2], this._v3storage[0]);
  }
  get zy() {
    return new T(this._v3storage[2], this._v3storage[1]);
  }
  get zz() {
    return new T(this._v3storage[2], this._v3storage[2]);
  }
  get xxx() {
    return new A(
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[0]
    );
  }
  get xxy() {
    return new A(
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[1]
    );
  }
  get xxz() {
    return new A(
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[2]
    );
  }
  get xyx() {
    return new A(
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[0]
    );
  }
  get xyy() {
    return new A(
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[1]
    );
  }
  get xyz() {
    return new A(
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[2]
    );
  }
  get xzx() {
    return new A(
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[0]
    );
  }
  get xzy() {
    return new A(
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[1]
    );
  }
  get xzz() {
    return new A(
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[2]
    );
  }
  get yxx() {
    return new A(
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[0]
    );
  }
  get yxy() {
    return new A(
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[1]
    );
  }
  get yxz() {
    return new A(
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[2]
    );
  }
  get yyx() {
    return new A(
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[0]
    );
  }
  get yyy() {
    return new A(
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[1]
    );
  }
  get yyz() {
    return new A(
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[2]
    );
  }
  get yzx() {
    return new A(
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[0]
    );
  }
  get yzy() {
    return new A(
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[1]
    );
  }
  get yzz() {
    return new A(
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[2]
    );
  }
  get zxx() {
    return new A(
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[0]
    );
  }
  get zxy() {
    return new A(
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[1]
    );
  }
  get zxz() {
    return new A(
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[2]
    );
  }
  get zyx() {
    return new A(
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[0]
    );
  }
  get zyy() {
    return new A(
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[1]
    );
  }
  get zyz() {
    return new A(
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[2]
    );
  }
  get zzx() {
    return new A(
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[0]
    );
  }
  get zzy() {
    return new A(
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[1]
    );
  }
  get zzz() {
    return new A(
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[2]
    );
  }
  get xxxx() {
    return new i(
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[0]
    );
  }
  get xxxy() {
    return new i(
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[1]
    );
  }
  get xxxz() {
    return new i(
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[2]
    );
  }
  get xxyx() {
    return new i(
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[0]
    );
  }
  get xxyy() {
    return new i(
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[1]
    );
  }
  get xxyz() {
    return new i(
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[2]
    );
  }
  get xxzx() {
    return new i(
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[0]
    );
  }
  get xxzy() {
    return new i(
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[1]
    );
  }
  get xxzz() {
    return new i(
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[2]
    );
  }
  get xyxx() {
    return new i(
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[0]
    );
  }
  get xyxy() {
    return new i(
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[1]
    );
  }
  get xyxz() {
    return new i(
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[2]
    );
  }
  get xyyx() {
    return new i(
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[0]
    );
  }
  get xyyy() {
    return new i(
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[1]
    );
  }
  get xyyz() {
    return new i(
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[2]
    );
  }
  get xyzx() {
    return new i(
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[0]
    );
  }
  get xyzy() {
    return new i(
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[1]
    );
  }
  get xyzz() {
    return new i(
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[2]
    );
  }
  get xzxx() {
    return new i(
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[0]
    );
  }
  get xzxy() {
    return new i(
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[1]
    );
  }
  get xzxz() {
    return new i(
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[2]
    );
  }
  get xzyx() {
    return new i(
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[0]
    );
  }
  get xzyy() {
    return new i(
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[1]
    );
  }
  get xzyz() {
    return new i(
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[2]
    );
  }
  get xzzx() {
    return new i(
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[0]
    );
  }
  get xzzy() {
    return new i(
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[1]
    );
  }
  get xzzz() {
    return new i(
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[2]
    );
  }
  get yxxx() {
    return new i(
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[0]
    );
  }
  get yxxy() {
    return new i(
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[1]
    );
  }
  get yxxz() {
    return new i(
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[2]
    );
  }
  get yxyx() {
    return new i(
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[0]
    );
  }
  get yxyy() {
    return new i(
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[1]
    );
  }
  get yxyz() {
    return new i(
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[2]
    );
  }
  get yxzx() {
    return new i(
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[0]
    );
  }
  get yxzy() {
    return new i(
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[1]
    );
  }
  get yxzz() {
    return new i(
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[2]
    );
  }
  get yyxx() {
    return new i(
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[0]
    );
  }
  get yyxy() {
    return new i(
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[1]
    );
  }
  get yyxz() {
    return new i(
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[2]
    );
  }
  get yyyx() {
    return new i(
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[0]
    );
  }
  get yyyy() {
    return new i(
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[1]
    );
  }
  get yyyz() {
    return new i(
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[2]
    );
  }
  get yyzx() {
    return new i(
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[0]
    );
  }
  get yyzy() {
    return new i(
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[1]
    );
  }
  get yyzz() {
    return new i(
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[2]
    );
  }
  get yzxx() {
    return new i(
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[0]
    );
  }
  get yzxy() {
    return new i(
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[1]
    );
  }
  get yzxz() {
    return new i(
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[2]
    );
  }
  get yzyx() {
    return new i(
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[0]
    );
  }
  get yzyy() {
    return new i(
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[1]
    );
  }
  get yzyz() {
    return new i(
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[2]
    );
  }
  get yzzx() {
    return new i(
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[0]
    );
  }
  get yzzy() {
    return new i(
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[1]
    );
  }
  get yzzz() {
    return new i(
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[2]
    );
  }
  get zxxx() {
    return new i(
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[0]
    );
  }
  get zxxy() {
    return new i(
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[1]
    );
  }
  get zxxz() {
    return new i(
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[0],
      this._v3storage[2]
    );
  }
  get zxyx() {
    return new i(
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[0]
    );
  }
  get zxyy() {
    return new i(
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[1]
    );
  }
  get zxyz() {
    return new i(
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[1],
      this._v3storage[2]
    );
  }
  get zxzx() {
    return new i(
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[0]
    );
  }
  get zxzy() {
    return new i(
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[1]
    );
  }
  get zxzz() {
    return new i(
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[2],
      this._v3storage[2]
    );
  }
  get zyxx() {
    return new i(
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[0]
    );
  }
  get zyxy() {
    return new i(
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[1]
    );
  }
  get zyxz() {
    return new i(
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[0],
      this._v3storage[2]
    );
  }
  get zyyx() {
    return new i(
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[0]
    );
  }
  get zyyy() {
    return new i(
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[1]
    );
  }
  get zyyz() {
    return new i(
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[1],
      this._v3storage[2]
    );
  }
  get zyzx() {
    return new i(
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[0]
    );
  }
  get zyzy() {
    return new i(
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[1]
    );
  }
  get zyzz() {
    return new i(
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[2],
      this._v3storage[2]
    );
  }
  get zzxx() {
    return new i(
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[0]
    );
  }
  get zzxy() {
    return new i(
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[1]
    );
  }
  get zzxz() {
    return new i(
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[0],
      this._v3storage[2]
    );
  }
  get zzyx() {
    return new i(
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[0]
    );
  }
  get zzyy() {
    return new i(
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[1]
    );
  }
  get zzyz() {
    return new i(
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[1],
      this._v3storage[2]
    );
  }
  get zzzx() {
    return new i(
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[0]
    );
  }
  get zzzy() {
    return new i(
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[1]
    );
  }
  get zzzz() {
    return new i(
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[2],
      this._v3storage[2]
    );
  }
  get r() {
    return this.x;
  }
  get g() {
    return this.y;
  }
  get b() {
    return this.z;
  }
  get s() {
    return this.x;
  }
  get t() {
    return this.y;
  }
  get p() {
    return this.z;
  }
  get x() {
    return this._v3storage[0];
  }
  get y() {
    return this._v3storage[1];
  }
  get z() {
    return this._v3storage[2];
  }
  get rr() {
    return this.xx;
  }
  get rg() {
    return this.xy;
  }
  get rb() {
    return this.xz;
  }
  get gr() {
    return this.yx;
  }
  get gg() {
    return this.yy;
  }
  get gb() {
    return this.yz;
  }
  get br() {
    return this.zx;
  }
  get bg() {
    return this.zy;
  }
  get bb() {
    return this.zz;
  }
  get rrr() {
    return this.xxx;
  }
  get rrg() {
    return this.xxy;
  }
  get rrb() {
    return this.xxz;
  }
  get rgr() {
    return this.xzx;
  }
  get rgg() {
    return this.xyy;
  }
  get rgb() {
    return this.xyz;
  }
  get rbr() {
    return this.xzx;
  }
  get rbg() {
    return this.xzy;
  }
  get rbb() {
    return this.xzz;
  }
  get grr() {
    return this.yxx;
  }
  get grg() {
    return this.yxy;
  }
  get grb() {
    return this.yxz;
  }
  get ggr() {
    return this.yyx;
  }
  get ggg() {
    return this.yyy;
  }
  get ggb() {
    return this.yyz;
  }
  get gbr() {
    return this.yxz;
  }
  get gbg() {
    return this.yzy;
  }
  get gbb() {
    return this.yzz;
  }
  get brr() {
    return this.zxx;
  }
  get brg() {
    return this.zxy;
  }
  get brb() {
    return this.zxz;
  }
  get bgr() {
    return this.zyx;
  }
  get bgg() {
    return this.zyy;
  }
  get bgb() {
    return this.zyz;
  }
  get bbr() {
    return this.zzx;
  }
  get bbg() {
    return this.zzy;
  }
  get bbb() {
    return this.zzz;
  }
  get rrrr() {
    return this.xxxx;
  }
  get rrrg() {
    return this.xxxy;
  }
  get rrrb() {
    return this.xxxz;
  }
  get rrgr() {
    return this.xxyx;
  }
  get rrgg() {
    return this.xxyy;
  }
  get rrgb() {
    return this.xxyz;
  }
  get rrbr() {
    return this.xxzx;
  }
  get rrbg() {
    return this.xxzy;
  }
  get rrbb() {
    return this.xxzz;
  }
  get rgrr() {
    return this.xyxx;
  }
  get rgrg() {
    return this.xyxy;
  }
  get rgrb() {
    return this.xyxz;
  }
  get rggr() {
    return this.xyyx;
  }
  get rggg() {
    return this.xyyy;
  }
  get rggb() {
    return this.xyyz;
  }
  get rgbr() {
    return this.xyzx;
  }
  get rgbg() {
    return this.xyzy;
  }
  get rgbb() {
    return this.xyzz;
  }
  get rbrr() {
    return this.xzxx;
  }
  get rbrg() {
    return this.xzxy;
  }
  get rbrb() {
    return this.xzxz;
  }
  get rbgr() {
    return this.xzyx;
  }
  get rbgg() {
    return this.xzyy;
  }
  get rbgb() {
    return this.xzyz;
  }
  get rbbr() {
    return this.xzzx;
  }
  get rbbg() {
    return this.xzzy;
  }
  get rbbb() {
    return this.xzzz;
  }
  get grrr() {
    return this.yxxx;
  }
  get grrg() {
    return this.yxxy;
  }
  get grrb() {
    return this.yxxz;
  }
  get grgr() {
    return this.yxyx;
  }
  get grgg() {
    return this.yxyy;
  }
  get grgb() {
    return this.yxyz;
  }
  get grbr() {
    return this.yxzx;
  }
  get grbg() {
    return this.yxzy;
  }
  get grbb() {
    return this.yxzz;
  }
  get ggrr() {
    return this.yyxx;
  }
  get ggrg() {
    return this.yyxy;
  }
  get ggrb() {
    return this.yyxz;
  }
  get gggr() {
    return this.yyyx;
  }
  get gggg() {
    return this.yyyy;
  }
  get gggb() {
    return this.yyyz;
  }
  get ggbr() {
    return this.yyzx;
  }
  get ggbg() {
    return this.yyzy;
  }
  get ggbb() {
    return this.yyzz;
  }
  get gbrr() {
    return this.yzxx;
  }
  get gbrg() {
    return this.yzxy;
  }
  get gbrb() {
    return this.yzxz;
  }
  get gbgr() {
    return this.yzyx;
  }
  get gbgg() {
    return this.yzyy;
  }
  get gbgb() {
    return this.yzyz;
  }
  get gbbr() {
    return this.yzzx;
  }
  get gbbg() {
    return this.yzzy;
  }
  get gbbb() {
    return this.yzzz;
  }
  get brrr() {
    return this.zxxx;
  }
  get brrg() {
    return this.zxxy;
  }
  get brrb() {
    return this.zxxz;
  }
  get brgr() {
    return this.zxyx;
  }
  get brgg() {
    return this.zxyy;
  }
  get brgb() {
    return this.zxyz;
  }
  get brbr() {
    return this.zxzx;
  }
  get brbg() {
    return this.zxzy;
  }
  get brbb() {
    return this.zxzz;
  }
  get bgrr() {
    return this.zyxx;
  }
  get bgrg() {
    return this.zyxy;
  }
  get bgrb() {
    return this.zyxz;
  }
  get bggr() {
    return this.zyyx;
  }
  get bggg() {
    return this.zyyy;
  }
  get bggb() {
    return this.zyyz;
  }
  get bgbr() {
    return this.zyzx;
  }
  get bgbg() {
    return this.zyzy;
  }
  get bgbb() {
    return this.zyzz;
  }
  get bbrr() {
    return this.zzxx;
  }
  get bbrg() {
    return this.zzxy;
  }
  get bbrb() {
    return this.zzxz;
  }
  get bbgr() {
    return this.zzyx;
  }
  get bbgg() {
    return this.zzyy;
  }
  get bbgb() {
    return this.zzyz;
  }
  get bbbr() {
    return this.zzzx;
  }
  get bbbg() {
    return this.zzzy;
  }
  get bbbb() {
    return this.zzzz;
  }
  get ss() {
    return this.xx;
  }
  get st() {
    return this.xy;
  }
  get sp() {
    return this.xz;
  }
  get ts() {
    return this.yx;
  }
  get tt() {
    return this.yy;
  }
  get tp() {
    return this.yz;
  }
  get ps() {
    return this.zx;
  }
  get pt() {
    return this.zy;
  }
  get pp() {
    return this.zz;
  }
  get sss() {
    return this.xxx;
  }
  get sst() {
    return this.xxy;
  }
  get ssp() {
    return this.xxz;
  }
  get sts() {
    return this.xyx;
  }
  get stt() {
    return this.xyy;
  }
  get stp() {
    return this.xyz;
  }
  get sps() {
    return this.xzx;
  }
  get spt() {
    return this.xzy;
  }
  get spp() {
    return this.xzz;
  }
  get tss() {
    return this.yxx;
  }
  get tst() {
    return this.yxy;
  }
  get tsp() {
    return this.yxz;
  }
  get tts() {
    return this.yyx;
  }
  get ttt() {
    return this.yyy;
  }
  get ttp() {
    return this.yyz;
  }
  get tps() {
    return this.yzx;
  }
  get tpt() {
    return this.yzy;
  }
  get tpp() {
    return this.yzz;
  }
  get pss() {
    return this.zxx;
  }
  get pst() {
    return this.zxy;
  }
  get psp() {
    return this.zxz;
  }
  get pts() {
    return this.zyx;
  }
  get ptt() {
    return this.zyy;
  }
  get ptp() {
    return this.zyz;
  }
  get pps() {
    return this.zzx;
  }
  get ppt() {
    return this.zzy;
  }
  get ppp() {
    return this.zzz;
  }
  get ssss() {
    return this.xxxx;
  }
  get ssst() {
    return this.xxxy;
  }
  get sssp() {
    return this.xxxz;
  }
  get ssts() {
    return this.xxyx;
  }
  get sstt() {
    return this.xxyy;
  }
  get sstp() {
    return this.xxyz;
  }
  get ssps() {
    return this.xxzx;
  }
  get sspt() {
    return this.xxzy;
  }
  get sspp() {
    return this.xxzz;
  }
  get stss() {
    return this.xyxx;
  }
  get stst() {
    return this.xyxy;
  }
  get stsp() {
    return this.xyxz;
  }
  get stts() {
    return this.xyyx;
  }
  get sttt() {
    return this.xyyy;
  }
  get sttp() {
    return this.xyyz;
  }
  get stps() {
    return this.xyzx;
  }
  get stpt() {
    return this.xyzy;
  }
  get stpp() {
    return this.xyzz;
  }
  get spss() {
    return this.xzxx;
  }
  get spst() {
    return this.xzxy;
  }
  get spsp() {
    return this.xzxz;
  }
  get spts() {
    return this.xzyx;
  }
  get sptt() {
    return this.xzyy;
  }
  get sptp() {
    return this.xzyz;
  }
  get spps() {
    return this.xzzx;
  }
  get sppt() {
    return this.xzzy;
  }
  get sppp() {
    return this.xzzz;
  }
  get tsss() {
    return this.yxxx;
  }
  get tsst() {
    return this.yxxy;
  }
  get tssp() {
    return this.yxxz;
  }
  get tsts() {
    return this.yxyx;
  }
  get tstt() {
    return this.yxyy;
  }
  get tstp() {
    return this.yxyz;
  }
  get tsps() {
    return this.yxzx;
  }
  get tspt() {
    return this.yxzy;
  }
  get tspp() {
    return this.yxzz;
  }
  get ttss() {
    return this.yyxx;
  }
  get ttst() {
    return this.yyxy;
  }
  get ttsp() {
    return this.yyxz;
  }
  get ttts() {
    return this.yyyx;
  }
  get tttt() {
    return this.yyyy;
  }
  get tttp() {
    return this.yyyz;
  }
  get ttps() {
    return this.yyzx;
  }
  get ttpt() {
    return this.yyzy;
  }
  get ttpp() {
    return this.yyzz;
  }
  get tpss() {
    return this.yzxx;
  }
  get tpst() {
    return this.yzxy;
  }
  get tpsp() {
    return this.yzxz;
  }
  get tpts() {
    return this.yzyx;
  }
  get tptt() {
    return this.yzyy;
  }
  get tptp() {
    return this.yzyz;
  }
  get tpps() {
    return this.yzzx;
  }
  get tppt() {
    return this.yzzy;
  }
  get tppp() {
    return this.yzzz;
  }
  get psss() {
    return this.zxxx;
  }
  get psst() {
    return this.zxxy;
  }
  get pssp() {
    return this.zxxz;
  }
  get psts() {
    return this.zxyx;
  }
  get pstt() {
    return this.zxyy;
  }
  get pstp() {
    return this.zxyz;
  }
  get psps() {
    return this.zxzx;
  }
  get pspt() {
    return this.zxzy;
  }
  get pspp() {
    return this.zxzz;
  }
  get ptss() {
    return this.zyxx;
  }
  get ptst() {
    return this.zyxy;
  }
  get ptsp() {
    return this.zyxz;
  }
  get ptts() {
    return this.zyyx;
  }
  get pttt() {
    return this.zyyy;
  }
  get pttp() {
    return this.zyyz;
  }
  get ptps() {
    return this.zyzx;
  }
  get ptpt() {
    return this.zyzy;
  }
  get ptpp() {
    return this.zyzz;
  }
  get ppss() {
    return this.zzxx;
  }
  get ppst() {
    return this.zzxy;
  }
  get ppsp() {
    return this.zzxz;
  }
  get ppts() {
    return this.zzyx;
  }
  get pptt() {
    return this.zzyy;
  }
  get pptp() {
    return this.zzyz;
  }
  get ppps() {
    return this.zzzx;
  }
  get pppt() {
    return this.zzzy;
  }
  get pppp() {
    return this.zzzz;
  }
}
const p = A;
class L {
  constructor(s, t, e, r, h, g, n, u, v, x, m, y, z, d, c, w) {
    // 4 x 4 matrix
    o(this, "_m4storage");
    this._m4storage = [
      s,
      t,
      e,
      r,
      h,
      g,
      n,
      u,
      v,
      x,
      m,
      y,
      z,
      d,
      c,
      w
    ];
  }
  get storage() {
    return this._m4storage;
  }
  get dimension() {
    return 4;
  }
  static zero() {
    return new L(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  static copy(s) {
    return new L(...s._m4storage);
  }
  /**
   * Solve [A] * [x] = [b].
   */
  static solve2(s, t, e) {
    const r = s.entry(0, 0), h = s.entry(0, 1), g = s.entry(1, 0), n = s.entry(1, 1), u = e.x - s._m4storage[8], v = e.y - s._m4storage[9];
    let x = r * n - h * g;
    x != 0 && (x = 1 / x), t.x = x * (n * u - h * v), t.y = x * (r * v - g * u);
  }
  /**
   * Solve [A] * [x] = [b].
   */
  static solve3(s, t, e) {
    const r = s.entry(0, 0), h = s.entry(1, 0), g = s.entry(2, 0), n = s.entry(0, 1), u = s.entry(1, 1), v = s.entry(2, 1), x = s.entry(0, 2), m = s.entry(1, 2), y = s.entry(2, 2), z = e.x - s._m4storage[12], d = e.y - s._m4storage[13], c = e.z - s._m4storage[14];
    let w, l, _, R;
    w = u * y - v * m, l = v * x - n * y, _ = n * m - u * x, R = r * w + h * l + g * _, R !== 0 && (R = 1 / R);
    const B = R * (z * w + d * l + c * _);
    w = -(m * c - y * d), l = -(y * z - x * c), _ = -(x * d - m * z);
    const f = R * (r * w + h * l + g * _);
    w = -(d * v - c * u), l = -(c * n - z * v), _ = -(z * u - d * n);
    const b = R * (r * w + h * l + g * _);
    t.x = B, t.y = f, t.z = b;
  }
  /// Solve [A] * [x] = [b].
  static solve(s, t, e) {
    const r = s._m4storage[0], h = s._m4storage[1], g = s._m4storage[2], n = s._m4storage[3], u = s._m4storage[4], v = s._m4storage[5], x = s._m4storage[6], m = s._m4storage[7], y = s._m4storage[8], z = s._m4storage[9], d = s._m4storage[10], c = s._m4storage[11], w = s._m4storage[12], l = s._m4storage[13], _ = s._m4storage[14], R = s._m4storage[15], B = r * v - h * u, f = r * x - g * u, b = r * m - n * u, q = h * x - g * v, S = h * m - n * v, P = g * m - n * x, O = y * l - z * w, F = y * _ - d * w, D = y * R - c * w, j = z * _ - d * l, Y = z * R - c * l, G = d * R - c * _, H = e.storage[0], it = e.storage[1], ht = e.storage[2], pt = e.storage[3];
    var at = B * G - f * Y + b * j + q * D - S * F + P * O;
    at != 0 && (at = 1 / at), t.x = at * ((v * G - x * Y + m * j) * H - (u * G - x * D + m * F) * it + (u * Y - v * D + m * O) * ht - (u * j - v * F + x * O) * pt), t.y = at * -((h * G - g * Y + n * j) * H - (r * G - g * D + n * F) * it + (r * Y - h * D + n * O) * ht - (r * j - h * F + g * O) * pt), t.z = at * ((l * P - _ * S + R * q) * H - (w * P - _ * b + R * f) * it + (w * S - l * b + R * B) * ht - (w * q - l * f + _ * B) * pt), t.w = at * -((z * P - d * S + c * q) * H - (y * P - d * b + c * f) * it + (y * S - z * b + c * B) * ht - (y * q - z * f + d * B) * pt);
  }
  /// Returns a matrix that is the inverse of [other] if [other] is invertible,
  /// otherwise `null`.
  static tryInvert(s) {
    const t = L.zero();
    return t.copyInverse(s) == 0 ? null : t;
  }
  static identity() {
    const s = L.zero();
    return s.setIdentity(), s;
  }
  static translation(s) {
    const t = L.zero();
    return t.setIdentity(), t.setTranslation(s), t;
  }
  static translationValues(s, t, e) {
    const r = L.zero();
    return r.setIdentity(), r.setTranslationRaw(s, t, e), r;
  }
  static diagonal3(s) {
    const t = L.zero(), e = t._m4storage, r = s._v3storage;
    return e[15] = 1, e[10] = r[2], e[5] = r[1], e[0] = r[0], t;
  }
  static diagonal3Values(s, t, e) {
    const r = L.zero();
    return r._m4storage[15] = 1, r._m4storage[10] = e, r._m4storage[5] = t, r._m4storage[0] = s, r;
  }
  static skewX(s) {
    const t = L.identity();
    return t._m4storage[4] = Math.tan(s), t;
  }
  static skewY(s) {
    const t = L.identity();
    return t._m4storage[1] = Math.tan(s), t;
  }
  static skew(s, t) {
    const e = L.identity();
    return e._m4storage[1] = Math.tan(t), e._m4storage[4] = Math.tan(s), e;
  }
  /**
  
  Return index in storage for [row], [col] value.
  */
  index(s, t) {
    return t * 4 + s;
  }
  /**
  
  Value at [row], [col].
  */
  entry(s, t) {
    if (s < 0 || s >= this.dimension || t < 0 || t >= this.dimension)
      throw new RangeError("Invalid row/column indices");
    return this._m4storage[this.index(s, t)];
  }
  /**
  
  Set value at [row], [col] to be [v].
  */
  setEntry(s, t, e) {
    if (s < 0 || s >= this.dimension || t < 0 || t >= this.dimension)
      throw new RangeError("Invalid row/column indices");
    this._m4storage[this.index(s, t)] = e;
  }
  /// Sets the diagonal to [arg]
  splatDiagonal(s) {
    this._m4storage[0] = s, this._m4storage[5] = s, this._m4storage[10] = s, this._m4storage[15] = s;
  }
  setValues(s, t, e, r, h, g, n, u, v, x, m, y, z, d, c, w) {
    this._m4storage[15] = w, this._m4storage[14] = c, this._m4storage[13] = d, this._m4storage[12] = z, this._m4storage[11] = y, this._m4storage[10] = m, this._m4storage[9] = x, this._m4storage[8] = v, this._m4storage[7] = u, this._m4storage[6] = n, this._m4storage[5] = g, this._m4storage[4] = h, this._m4storage[3] = r, this._m4storage[2] = e, this._m4storage[1] = t, this._m4storage[0] = s;
  }
  /**
   * Sets the entire matrix to the column values.
   */
  setColumns(s, t, e, r) {
    const h = s._v4storage, g = t._v4storage, n = e._v4storage, u = r._v4storage;
    this._m4storage[0] = h[0], this._m4storage[1] = h[1], this._m4storage[2] = h[2], this._m4storage[3] = h[3], this._m4storage[4] = g[0], this._m4storage[5] = g[1], this._m4storage[6] = g[2], this._m4storage[7] = g[3], this._m4storage[8] = n[0], this._m4storage[9] = n[1], this._m4storage[10] = n[2], this._m4storage[11] = n[3], this._m4storage[12] = u[0], this._m4storage[13] = u[1], this._m4storage[14] = u[2], this._m4storage[15] = u[3];
  }
  /**
  
  Sets the entire matrix to the matrix in [arg].
  */
  setFrom(s) {
    const t = s._m4storage;
    this._m4storage[15] = t[15], this._m4storage[14] = t[14], this._m4storage[13] = t[13], this._m4storage[12] = t[12], this._m4storage[11] = t[11], this._m4storage[10] = t[10], this._m4storage[9] = t[9], this._m4storage[8] = t[8], this._m4storage[7] = t[7], this._m4storage[6] = t[6], this._m4storage[5] = t[5], this._m4storage[4] = t[4], this._m4storage[3] = t[3], this._m4storage[2] = t[2], this._m4storage[1] = t[1], this._m4storage[0] = t[0];
  }
  //   /// Sets the matrix from translation [arg0] and rotation [arg1].
  // void setFromTranslationRotation(Vector3 arg0, Quaternion arg1) {
  //   final arg1Storage = arg1._qStorage;
  //   final x = arg1Storage[0];
  //   final y = arg1Storage[1];
  //   final z = arg1Storage[2];
  //   final w = arg1Storage[3];
  //   final x2 = x + x;
  //   final y2 = y + y;
  //   final z2 = z + z;
  //   final xx = x * x2;
  //   final xy = x * y2;
  //   final xz = x * z2;
  //   final yy = y * y2;
  //   final yz = y * z2;
  //   final zz = z * z2;
  //   final wx = w * x2;
  //   final wy = w * y2;
  //   final wz = w * z2;
  //   final arg0Storage = arg0._v3storage;
  //   _m4storage[0] = 1.0 - (yy + zz);
  //   _m4storage[1] = xy + wz;
  //   _m4storage[2] = xz - wy;
  //   _m4storage[3] = 0.0;
  //   _m4storage[4] = xy - wz;
  //   _m4storage[5] = 1.0 - (xx + zz);
  //   _m4storage[6] = yz + wx;
  //   _m4storage[7] = 0.0;
  //   _m4storage[8] = xz + wy;
  //   _m4storage[9] = yz - wx;
  //   _m4storage[10] = 1.0 - (xx + yy);
  //   _m4storage[11] = 0.0;
  //   _m4storage[12] = arg0Storage[0];
  //   _m4storage[13] = arg0Storage[1];
  //   _m4storage[14] = arg0Storage[2];
  //   _m4storage[15] = 1.0;
  // }
  // /// Sets the matrix from [translation], [rotation] and [scale].
  // void setFromTranslationRotationScale(
  //     Vector3 translation, Quaternion rotation, Vector3 scale) {
  //   setFromTranslationRotation(translation, rotation);
  //   this.scale(scale);
  // }
  /// Sets the upper 2x2 of the matrix to be [arg].
  setUpper2x2(s) {
    const t = s._m2storage;
    this._m4storage[0] = t[0], this._m4storage[1] = t[1], this._m4storage[4] = t[2], this._m4storage[5] = t[3];
  }
  /// Sets the diagonal of the matrix to be [arg].
  setDiagonal(s) {
    const t = s._v4storage;
    this._m4storage[0] = t[0], this._m4storage[5] = t[1], this._m4storage[10] = t[2], this._m4storage[15] = t[3];
  }
  setOuter(s, t) {
    const e = s._v4storage, r = t._v4storage;
    this._m4storage[0] = e[0] * r[0], this._m4storage[1] = e[0] * r[1], this._m4storage[2] = e[0] * r[2], this._m4storage[3] = e[0] * r[3], this._m4storage[4] = e[1] * r[0], this._m4storage[5] = e[1] * r[1], this._m4storage[6] = e[1] * r[2], this._m4storage[7] = e[1] * r[3], this._m4storage[8] = e[2] * r[0], this._m4storage[9] = e[2] * r[1], this._m4storage[10] = e[2] * r[2], this._m4storage[11] = e[2] * r[3], this._m4storage[12] = e[3] * r[0], this._m4storage[13] = e[3] * r[1], this._m4storage[14] = e[3] * r[2], this._m4storage[15] = e[3] * r[3];
  }
  /** Returns row 0 */
  get row0() {
    return this.getRow(0);
  }
  /** Returns row 1 */
  get row1() {
    return this.getRow(1);
  }
  /** Returns row 2 */
  get row2() {
    return this.getRow(2);
  }
  /** Returns row 3 */
  get row3() {
    return this.getRow(3);
  }
  /** Sets row 0 to [arg] */
  set row0(s) {
    this.setRow(0, s);
  }
  /** Sets row 1 to [arg] */
  set row1(s) {
    this.setRow(1, s);
  }
  /** Sets row 2 to [arg] */
  set row2(s) {
    this.setRow(2, s);
  }
  /** Sets row 3 to [arg] */
  set row3(s) {
    this.setRow(3, s);
  }
  /** Assigns the [row] of the matrix [arg] */
  setRow(s, t) {
    const e = t._v4storage;
    this._m4storage[this.index(s, 0)] = e[0], this._m4storage[this.index(s, 1)] = e[1], this._m4storage[this.index(s, 2)] = e[2], this._m4storage[this.index(s, 3)] = e[3];
  }
  /** Gets the [row] of the matrix */
  getRow(s) {
    const t = i.zero(), e = t._v4storage;
    return e[0] = this._m4storage[this.index(s, 0)], e[1] = this._m4storage[this.index(s, 1)], e[2] = this._m4storage[this.index(s, 2)], e[3] = this._m4storage[this.index(s, 3)], t;
  }
  /**
   * Assigns the [column] of the matrix [arg]
   * @param column the column index
   * @param arg the vector to be assigned
   */
  setColumn(s, t) {
    const e = s * 4, r = t._v4storage;
    this._m4storage[e + 3] = r[3], this._m4storage[e + 2] = r[2], this._m4storage[e + 1] = r[1], this._m4storage[e + 0] = r[0];
  }
  /**
   * Gets the [column] of the matrix
   * @param column the column index
   * @returns the column as a Vector4
   */
  getColumn(s) {
    const t = i.zero(), e = t._v4storage, r = s * 4;
    return e[3] = this._m4storage[r + 3], e[2] = this._m4storage[r + 2], e[1] = this._m4storage[r + 1], e[0] = this._m4storage[r + 0], t;
  }
  /** Clone matrix. */
  clone() {
    return L.copy(this);
  }
  /**
   * Copy into [arg].
   */
  copyInto(s) {
    const t = s._m4storage;
    return t[0] = this._m4storage[0], t[1] = this._m4storage[1], t[2] = this._m4storage[2], t[3] = this._m4storage[3], t[4] = this._m4storage[4], t[5] = this._m4storage[5], t[6] = this._m4storage[6], t[7] = this._m4storage[7], t[8] = this._m4storage[8], t[9] = this._m4storage[9], t[10] = this._m4storage[10], t[11] = this._m4storage[11], t[12] = this._m4storage[12], t[13] = this._m4storage[13], t[14] = this._m4storage[14], t[15] = this._m4storage[15], s;
  }
  /**
   * Translate this matrix by a [Vector3], [Vector4], or x,y,z
   * @param x the x coordinate or Vector3/Vector4 to translate by.
   * @param y the y coordinate or undefined if `x` is a Vector3/Vector4.
   * @param z the z coordinate or undefined if `x` is a Vector3/Vector4.
   */
  translate(s, t, e) {
    let r, h, g;
    const n = s instanceof i ? s.w : 1;
    if (s instanceof p)
      r = s.x, h = s.y, g = s.z;
    else if (s instanceof i)
      r = s.x, h = s.y, g = s.z;
    else if (typeof s == "number")
      r = s, h = t || 0, g = e || 0;
    else
      throw new Error("Unsupported argument type.");
    const u = this._m4storage[0] * r + this._m4storage[4] * h + this._m4storage[8] * g + this._m4storage[12] * n, v = this._m4storage[1] * r + this._m4storage[5] * h + this._m4storage[9] * g + this._m4storage[13] * n, x = this._m4storage[2] * r + this._m4storage[6] * h + this._m4storage[10] * g + this._m4storage[14] * n, m = this._m4storage[3] * r + this._m4storage[7] * h + this._m4storage[11] * g + this._m4storage[15] * n;
    return this._m4storage[12] = u, this._m4storage[13] = v, this._m4storage[14] = x, this._m4storage[15] = m, this;
  }
  /**
   * Multiplies this matrix by a translation from the left.
   * The translation can be specified with a [Vector3], [Vector4], or x, y, z.
   */
  leftTranslate(s, t = 0, e = 0) {
    let r, h, g;
    const n = s instanceof i ? s.w : 1;
    if (s instanceof p)
      r = s.x, h = s.y, g = s.z;
    else if (s instanceof i)
      r = s.x, h = s.y, g = s.z;
    else if (typeof s == "number")
      r = s, h = t, g = e;
    else
      throw new Error("Invalid argument type");
    return this._m4storage[0] += r * this._m4storage[3], this._m4storage[1] += h * this._m4storage[3], this._m4storage[2] += g * this._m4storage[3], this._m4storage[3] = n * this._m4storage[3], this._m4storage[4] += r * this._m4storage[7], this._m4storage[5] += h * this._m4storage[7], this._m4storage[6] += g * this._m4storage[7], this._m4storage[7] = n * this._m4storage[7], this._m4storage[8] += r * this._m4storage[11], this._m4storage[9] += h * this._m4storage[11], this._m4storage[10] += g * this._m4storage[11], this._m4storage[11] = n * this._m4storage[11], this._m4storage[12] += r * this._m4storage[15], this._m4storage[13] += h * this._m4storage[15], this._m4storage[14] += g * this._m4storage[15], this._m4storage[15] = n * this._m4storage[15], this;
  }
  /**
  
  Rotate this matrix [angle] radians around [axis].
  */
  rotate(s, t) {
    const e = s.length, r = s._v3storage, h = r[0] / e, g = r[1] / e, n = r[2] / e, u = Math.cos(t), v = Math.sin(t), x = 1 - u, m = h * h * x + u, y = h * g * x - n * v, z = h * n * x + g * v, d = g * h * x + n * v, c = g * g * x + u, w = g * n * x - h * v, l = n * h * x - g * v, _ = n * g * x + h * v, R = n * n * x + u, B = this._m4storage[0] * m + this._m4storage[4] * d + this._m4storage[8] * l, f = this._m4storage[1] * m + this._m4storage[5] * d + this._m4storage[9] * l, b = this._m4storage[2] * m + this._m4storage[6] * d + this._m4storage[10] * l, q = this._m4storage[3] * m + this._m4storage[7] * d + this._m4storage[11] * l, S = this._m4storage[0] * y + this._m4storage[4] * c + this._m4storage[8] * _, P = this._m4storage[1] * y + this._m4storage[5] * c + this._m4storage[9] * _, O = this._m4storage[2] * y + this._m4storage[6] * c + this._m4storage[10] * _, F = this._m4storage[3] * y + this._m4storage[7] * c + this._m4storage[11] * _, D = this._m4storage[0] * z + this._m4storage[4] * w + this._m4storage[8] * R, j = this._m4storage[1] * z + this._m4storage[5] * w + this._m4storage[9] * R, Y = this._m4storage[2] * z + this._m4storage[6] * w + this._m4storage[10] * R, G = this._m4storage[3] * z + this._m4storage[7] * w + this._m4storage[11] * R;
    return this._m4storage[0] = B, this._m4storage[1] = f, this._m4storage[2] = b, this._m4storage[3] = q, this._m4storage[4] = S, this._m4storage[5] = P, this._m4storage[6] = O, this._m4storage[7] = F, this._m4storage[8] = D, this._m4storage[9] = j, this._m4storage[10] = Y, this._m4storage[11] = G, this;
  }
  /// Rotate this [angle] radians around X
  rotateX(s) {
    const t = Math.cos(s), e = Math.sin(s), r = this._m4storage[4] * t + this._m4storage[8] * e, h = this._m4storage[5] * t + this._m4storage[9] * e, g = this._m4storage[6] * t + this._m4storage[10] * e, n = this._m4storage[7] * t + this._m4storage[11] * e, u = this._m4storage[4] * -e + this._m4storage[8] * t, v = this._m4storage[5] * -e + this._m4storage[9] * t, x = this._m4storage[6] * -e + this._m4storage[10] * t, m = this._m4storage[7] * -e + this._m4storage[11] * t;
    return this._m4storage[4] = r, this._m4storage[5] = h, this._m4storage[6] = g, this._m4storage[7] = n, this._m4storage[8] = u, this._m4storage[9] = v, this._m4storage[10] = x, this._m4storage[11] = m, this;
  }
  /**
   * Rotate this matrix [angle] radians around Y
   */
  rotateY(s) {
    const t = Math.cos(s), e = Math.sin(s), r = this._m4storage[0] * t + this._m4storage[8] * -e, h = this._m4storage[1] * t + this._m4storage[9] * -e, g = this._m4storage[2] * t + this._m4storage[10] * -e, n = this._m4storage[3] * t + this._m4storage[11] * -e, u = this._m4storage[0] * e + this._m4storage[8] * t, v = this._m4storage[1] * e + this._m4storage[9] * t, x = this._m4storage[2] * e + this._m4storage[10] * t, m = this._m4storage[3] * e + this._m4storage[11] * t;
    return this._m4storage[0] = r, this._m4storage[1] = h, this._m4storage[2] = g, this._m4storage[3] = n, this._m4storage[8] = u, this._m4storage[9] = v, this._m4storage[10] = x, this._m4storage[11] = m, this;
  }
  /**
   * Rotate this matrix [angle] radians around Z
   */
  rotateZ(s) {
    const t = Math.cos(s), e = Math.sin(s), r = this._m4storage[0] * t + this._m4storage[4] * e, h = this._m4storage[1] * t + this._m4storage[5] * e, g = this._m4storage[2] * t + this._m4storage[6] * e, n = this._m4storage[3] * t + this._m4storage[7] * e, u = this._m4storage[0] * -e + this._m4storage[4] * t, v = this._m4storage[1] * -e + this._m4storage[5] * t, x = this._m4storage[2] * -e + this._m4storage[6] * t, m = this._m4storage[3] * -e + this._m4storage[7] * t;
    return this._m4storage[0] = r, this._m4storage[1] = h, this._m4storage[2] = g, this._m4storage[3] = n, this._m4storage[4] = u, this._m4storage[5] = v, this._m4storage[6] = x, this._m4storage[7] = m, this;
  }
  /**
   * Scale this matrix by a Vector3, Vector4, or x,y,z
   */
  scale(s, t, e) {
    let r, h, g;
    const n = s instanceof i ? s.w : 1;
    if (s instanceof p)
      r = s.x, h = s.y, g = s.z;
    else if (s instanceof i)
      r = s.x, h = s.y, g = s.z;
    else if (typeof s == "number")
      r = s, h = t ?? s, g = e ?? s;
    else
      throw new Error("Unsupported type for scale operation");
    return this._m4storage[0] *= r, this._m4storage[1] *= r, this._m4storage[2] *= r, this._m4storage[3] *= r, this._m4storage[4] *= h, this._m4storage[5] *= h, this._m4storage[6] *= h, this._m4storage[7] *= h, this._m4storage[8] *= g, this._m4storage[9] *= g, this._m4storage[10] *= g, this._m4storage[11] *= g, this._m4storage[12] *= n, this._m4storage[13] *= n, this._m4storage[14] *= n, this._m4storage[15] *= n, this;
  }
  /**
   * Create a copy of this scaled by a [Vector3], [Vector4] or [x],[y], and [z].
   */
  scaled(s, t, e) {
    const r = this.clone();
    return r.scale(s, t, e), r;
  }
  /// Zeros this.
  setZero() {
    this._m4storage[0] = 0, this._m4storage[1] = 0, this._m4storage[2] = 0, this._m4storage[3] = 0, this._m4storage[4] = 0, this._m4storage[5] = 0, this._m4storage[6] = 0, this._m4storage[7] = 0, this._m4storage[8] = 0, this._m4storage[9] = 0, this._m4storage[10] = 0, this._m4storage[11] = 0, this._m4storage[12] = 0, this._m4storage[13] = 0, this._m4storage[14] = 0, this._m4storage[15] = 0;
  }
  /// Makes this into the identity matrix.
  setIdentity() {
    this._m4storage[0] = 1, this._m4storage[1] = 0, this._m4storage[2] = 0, this._m4storage[3] = 0, this._m4storage[4] = 0, this._m4storage[5] = 1, this._m4storage[6] = 0, this._m4storage[7] = 0, this._m4storage[8] = 0, this._m4storage[9] = 0, this._m4storage[10] = 1, this._m4storage[11] = 0, this._m4storage[12] = 0, this._m4storage[13] = 0, this._m4storage[14] = 0, this._m4storage[15] = 1;
  }
  /// Returns the transpose of this.
  transposed() {
    const s = this.clone();
    return s.transpose(), s;
  }
  transpose() {
    let s;
    s = this._m4storage[4], this._m4storage[4] = this._m4storage[1], this._m4storage[1] = s, s = this._m4storage[8], this._m4storage[8] = this._m4storage[2], this._m4storage[2] = s, s = this._m4storage[12], this._m4storage[12] = this._m4storage[3], this._m4storage[3] = s, s = this._m4storage[9], this._m4storage[9] = this._m4storage[6], this._m4storage[6] = s, s = this._m4storage[13], this._m4storage[13] = this._m4storage[7], this._m4storage[7] = s, s = this._m4storage[14], this._m4storage[14] = this._m4storage[11], this._m4storage[11] = s;
  }
  /**
   * Returns the component wise absolute value of this.
   */
  absolute() {
    const s = L.zero(), t = s._m4storage;
    return t[0] = Math.abs(this._m4storage[0]), t[1] = Math.abs(this._m4storage[1]), t[2] = Math.abs(this._m4storage[2]), t[3] = Math.abs(this._m4storage[3]), t[4] = Math.abs(this._m4storage[4]), t[5] = Math.abs(this._m4storage[5]), t[6] = Math.abs(this._m4storage[6]), t[7] = Math.abs(this._m4storage[7]), t[8] = Math.abs(this._m4storage[8]), t[9] = Math.abs(this._m4storage[9]), t[10] = Math.abs(this._m4storage[10]), t[11] = Math.abs(this._m4storage[11]), t[12] = Math.abs(this._m4storage[12]), t[13] = Math.abs(this._m4storage[13]), t[14] = Math.abs(this._m4storage[14]), t[15] = Math.abs(this._m4storage[15]), s;
  }
  determinant() {
    const s = this._m4storage[0] * this._m4storage[5] - this._m4storage[1] * this._m4storage[4], t = this._m4storage[0] * this._m4storage[6] - this._m4storage[2] * this._m4storage[4], e = this._m4storage[0] * this._m4storage[7] - this._m4storage[3] * this._m4storage[4], r = this._m4storage[1] * this._m4storage[6] - this._m4storage[2] * this._m4storage[5], h = this._m4storage[1] * this._m4storage[7] - this._m4storage[3] * this._m4storage[5], g = this._m4storage[2] * this._m4storage[7] - this._m4storage[3] * this._m4storage[6], n = this._m4storage[8] * r - this._m4storage[9] * t + this._m4storage[10] * s, u = this._m4storage[8] * h - this._m4storage[9] * e + this._m4storage[11] * s, v = this._m4storage[8] * g - this._m4storage[10] * e + this._m4storage[11] * t;
    return -(this._m4storage[9] * g - this._m4storage[10] * h + this._m4storage[11] * r) * this._m4storage[12] + v * this._m4storage[13] - u * this._m4storage[14] + n * this._m4storage[15];
  }
  /** Returns the dot product of row [i] and [v]. */
  dotRow(s, t) {
    const e = t._v4storage;
    return this._m4storage[s] * e[0] + this._m4storage[4 + s] * e[1] + this._m4storage[8 + s] * e[2] + this._m4storage[12 + s] * e[3];
  }
  /** Returns the dot product of column [j] and [v]. */
  dotColumn(s, t) {
    const e = t._v4storage;
    return this._m4storage[s * 4] * e[0] + this._m4storage[s * 4 + 1] * e[1] + this._m4storage[s * 4 + 2] * e[2] + this._m4storage[s * 4 + 3] * e[3];
  }
  /** Returns the trace of the matrix. The trace of a matrix is the sum of the diagonal entries. */
  trace() {
    let s = 0;
    return s += this._m4storage[0], s += this._m4storage[5], s += this._m4storage[10], s += this._m4storage[15], s;
  }
  /**
   * Returns infinity norm of the matrix. Used for numerical analysis.
   */
  infinityNorm() {
    let s = 0;
    {
      let t = 0;
      t += Math.abs(this._m4storage[0]), t += Math.abs(this._m4storage[1]), t += Math.abs(this._m4storage[2]), t += Math.abs(this._m4storage[3]), s = t > s ? t : s;
    }
    {
      let t = 0;
      t += Math.abs(this._m4storage[4]), t += Math.abs(this._m4storage[5]), t += Math.abs(this._m4storage[6]), t += Math.abs(this._m4storage[7]), s = t > s ? t : s;
    }
    {
      let t = 0;
      t += Math.abs(this._m4storage[8]), t += Math.abs(this._m4storage[9]), t += Math.abs(this._m4storage[10]), t += Math.abs(this._m4storage[11]), s = t > s ? t : s;
    }
    {
      let t = 0;
      t += Math.abs(this._m4storage[12]), t += Math.abs(this._m4storage[13]), t += Math.abs(this._m4storage[14]), t += Math.abs(this._m4storage[15]), s = t > s ? t : s;
    }
    return s;
  }
  /// Returns relative error between this and [correct]
  relativeError(s) {
    s.sub(this);
    const t = s, e = s.infinityNorm();
    return t.infinityNorm() / e;
  }
  /**
   * Returns absolute error between this and [correct]
   */
  absoluteError(s) {
    const t = this.infinityNorm(), e = s.infinityNorm();
    return Math.abs(t - e);
  }
  getTranslation() {
    const s = this._m4storage[14], t = this._m4storage[13], e = this._m4storage[12];
    return new p(e, t, s);
  }
  /// Sets the translation vector in this homogeneous transformation matrix.
  setTranslation(s) {
    const t = s._v3storage, e = t[2], r = t[1], h = t[0];
    this._m4storage[14] = e, this._m4storage[13] = r, this._m4storage[12] = h;
  }
  /**
   * Sets the translation vector in this homogeneous transformation matrix.
   */
  setTranslationRaw(s, t, e) {
    this._m4storage[14] = e, this._m4storage[13] = t, this._m4storage[12] = s;
  }
  /// Returns the rotation matrix from this homogeneous transformation matrix.
  getRotation() {
    const s = Ut.zero();
    return this.copyRotation(s), s;
  }
  copyRotation(s) {
    const t = s._m3storage;
    t[0] = this._m4storage[0], t[1] = this._m4storage[1], t[2] = this._m4storage[2], t[3] = this._m4storage[4], t[4] = this._m4storage[5], t[5] = this._m4storage[6], t[6] = this._m4storage[8], t[7] = this._m4storage[9], t[8] = this._m4storage[10];
  }
  /// Sets the rotation matrix in this homogeneous transformation matrix.
  setRotation(s) {
    const t = s._m3storage;
    this._m4storage[0] = t[0], this._m4storage[1] = t[1], this._m4storage[2] = t[2], this._m4storage[4] = t[3], this._m4storage[5] = t[4], this._m4storage[6] = t[5], this._m4storage[8] = t[6], this._m4storage[9] = t[7], this._m4storage[10] = t[8];
  }
  /**
   * Returns the normal matrix from this homogeneous transformation matrix. The normal
   * matrix is the transpose of the inverse of the top-left 3x3 part of this 4x4 matrix.
   */
  // getNormalMatrix(): Matrix3 {
  //   const normalMatrix = Matrix3.identity();
  //   this.copyNormalMatrix(normalMatrix);
  //   return normalMatrix;
  // }
  /// Returns the max scale value of the 3 axes.
  getMaxScaleOnAxis() {
    const s = this._m4storage[0] * this._m4storage[0] + this._m4storage[1] * this._m4storage[1] + this._m4storage[2] * this._m4storage[2], t = this._m4storage[4] * this._m4storage[4] + this._m4storage[5] * this._m4storage[5] + this._m4storage[6] * this._m4storage[6], e = this._m4storage[8] * this._m4storage[8] + this._m4storage[9] * this._m4storage[9] + this._m4storage[10] * this._m4storage[10];
    return Math.sqrt(Math.max(s, Math.max(t, e)));
  }
  /// Transposes just the upper 3x3 rotation matrix.
  transposeRotation() {
    let s;
    s = this._m4storage[1], this._m4storage[1] = this._m4storage[4], this._m4storage[4] = s, s = this._m4storage[2], this._m4storage[2] = this._m4storage[8], this._m4storage[8] = s, s = this._m4storage[4], this._m4storage[4] = this._m4storage[1], this._m4storage[1] = s, s = this._m4storage[6], this._m4storage[6] = this._m4storage[9], this._m4storage[9] = s, s = this._m4storage[8], this._m4storage[8] = this._m4storage[2], this._m4storage[2] = s, s = this._m4storage[9], this._m4storage[9] = this._m4storage[6], this._m4storage[6] = s;
  }
  /// Invert this.
  invert() {
    return this.copyInverse(this);
  }
  // Set this matrix to be the inverse of [arg]
  copyInverse(s) {
    const t = s._m4storage, e = t[0], r = t[1], h = t[2], g = t[3], n = t[4], u = t[5], v = t[6], x = t[7], m = t[8], y = t[9], z = t[10], d = t[11], c = t[12], w = t[13], l = t[14], _ = t[15], R = e * u - r * n, B = e * v - h * n, f = e * x - g * n, b = r * v - h * u, q = r * x - g * u, S = h * x - g * v, P = m * w - y * c, O = m * l - z * c, F = m * _ - d * c, D = y * l - z * w, j = y * _ - d * w, Y = z * _ - d * l, G = R * Y - B * j + f * D + b * F - q * O + S * P;
    if (G == 0)
      return this.setFrom(s), 0;
    const H = 1 / G;
    return this._m4storage[0] = (u * Y - v * j + x * D) * H, this._m4storage[1] = (-r * Y + h * j - g * D) * H, this._m4storage[2] = (w * S - l * q + _ * b) * H, this._m4storage[3] = (-y * S + z * q - d * b) * H, this._m4storage[4] = (-n * Y + v * F - x * O) * H, this._m4storage[5] = (e * Y - h * F + g * O) * H, this._m4storage[6] = (-c * S + l * f - _ * B) * H, this._m4storage[7] = (m * S - z * f + d * B) * H, this._m4storage[8] = (n * j - u * F + x * P) * H, this._m4storage[9] = (-e * j + r * F - g * P) * H, this._m4storage[10] = (c * q - w * f + _ * R) * H, this._m4storage[11] = (-m * q + y * f - d * R) * H, this._m4storage[12] = (-n * D + u * O - v * P) * H, this._m4storage[13] = (e * D - r * O + h * P) * H, this._m4storage[14] = (-c * b + w * B - l * R) * H, this._m4storage[15] = (m * b - y * B + z * R) * H, G;
  }
  invertRotation() {
    const s = this.determinant();
    if (s == 0)
      return 0;
    const t = 1 / s;
    let e, r, h, g, n, u, v, x, m;
    return e = t * (this._m4storage[5] * this._m4storage[10] - this._m4storage[6] * this._m4storage[9]), r = t * (this._m4storage[2] * this._m4storage[9] - this._m4storage[1] * this._m4storage[10]), h = t * (this._m4storage[1] * this._m4storage[6] - this._m4storage[2] * this._m4storage[5]), g = t * (this._m4storage[6] * this._m4storage[8] - this._m4storage[4] * this._m4storage[10]), n = t * (this._m4storage[0] * this._m4storage[10] - this._m4storage[2] * this._m4storage[8]), u = t * (this._m4storage[2] * this._m4storage[4] - this._m4storage[0] * this._m4storage[6]), v = t * (this._m4storage[4] * this._m4storage[9] - this._m4storage[5] * this._m4storage[8]), x = t * (this._m4storage[1] * this._m4storage[8] - this._m4storage[0] * this._m4storage[9]), m = t * (this._m4storage[0] * this._m4storage[5] - this._m4storage[1] * this._m4storage[4]), this._m4storage[0] = e, this._m4storage[1] = r, this._m4storage[2] = h, this._m4storage[4] = g, this._m4storage[5] = n, this._m4storage[6] = u, this._m4storage[8] = v, this._m4storage[9] = x, this._m4storage[10] = m, s;
  }
  /// Sets the upper 3x3 to a rotation of [radians] around X
  setRotationX(s) {
    const t = Math.cos(s), e = Math.sin(s);
    this._m4storage[0] = 1, this._m4storage[1] = 0, this._m4storage[2] = 0, this._m4storage[4] = 0, this._m4storage[5] = t, this._m4storage[6] = e, this._m4storage[8] = 0, this._m4storage[9] = -e, this._m4storage[10] = t, this._m4storage[3] = 0, this._m4storage[7] = 0, this._m4storage[11] = 0;
  }
  /// Sets the upper 3x3 to a rotation of [radians] around Y
  setRotationY(s) {
    const t = Math.cos(s), e = Math.sin(s);
    this._m4storage[0] = t, this._m4storage[1] = 0, this._m4storage[2] = -e, this._m4storage[4] = 0, this._m4storage[5] = 1, this._m4storage[6] = 0, this._m4storage[8] = e, this._m4storage[9] = 0, this._m4storage[10] = t, this._m4storage[3] = 0, this._m4storage[7] = 0, this._m4storage[11] = 0;
  }
  /// Sets the upper 3x3 to a rotation of [radians] around Z
  setRotationZ(s) {
    const t = Math.cos(s), e = Math.sin(s);
    this._m4storage[0] = t, this._m4storage[1] = e, this._m4storage[2] = 0, this._m4storage[4] = -e, this._m4storage[5] = t, this._m4storage[6] = 0, this._m4storage[8] = 0, this._m4storage[9] = 0, this._m4storage[10] = 1, this._m4storage[3] = 0, this._m4storage[7] = 0, this._m4storage[11] = 0;
  }
  /// Converts into Adjugate matrix and scales by [scale]
  scaleAdjoint(s) {
    const t = this._m4storage[0], e = this._m4storage[4], r = this._m4storage[8], h = this._m4storage[12], g = this._m4storage[1], n = this._m4storage[5], u = this._m4storage[9], v = this._m4storage[13], x = this._m4storage[2], m = this._m4storage[6], y = this._m4storage[10], z = this._m4storage[14], d = this._m4storage[3], c = this._m4storage[7], w = this._m4storage[11], l = this._m4storage[15];
    this._m4storage[0] = (n * (y * l - w * z) - u * (m * l - c * z) + v * (m * w - c * y)) * s, this._m4storage[1] = -(g * (y * l - w * z) - u * (x * l - d * z) + v * (x * w - d * y)) * s, this._m4storage[2] = (g * (m * l - c * z) - n * (x * l - d * z) + v * (x * c - d * m)) * s, this._m4storage[3] = -(g * (m * w - c * y) - n * (x * w - d * y) + u * (x * c - d * m)) * s, this._m4storage[4] = -(e * (y * l - w * z) - r * (m * l - c * z) + h * (m * w - c * y)) * s, this._m4storage[5] = (t * (y * l - w * z) - r * (x * l - d * z) + h * (x * w - d * y)) * s, this._m4storage[6] = -(t * (m * l - c * z) - e * (x * l - d * z) + h * (x * c - d * m)) * s, this._m4storage[7] = (t * (m * w - c * y) - e * (x * w - d * y) + r * (x * c - d * m)) * s, this._m4storage[8] = (e * (u * l - w * v) - r * (n * l - c * v) + h * (n * w - c * u)) * s, this._m4storage[9] = -(t * (u * l - w * v) - r * (g * l - d * v) + h * (g * w - d * u)) * s, this._m4storage[10] = (t * (n * l - c * v) - e * (g * l - d * v) + h * (g * c - d * n)) * s, this._m4storage[11] = -(t * (n * w - c * u) - e * (g * w - d * u) + r * (g * c - d * n)) * s, this._m4storage[12] = -(e * (u * z - y * v) - r * (n * z - m * v) + h * (n * y - m * u)) * s, this._m4storage[13] = (t * (u * z - y * v) - r * (g * z - x * v) + h * (g * y - x * u)) * s, this._m4storage[14] = -(t * (n * z - m * v) - e * (g * z - x * v) + h * (g * m - x * n)) * s, this._m4storage[15] = (t * (n * y - m * u) - e * (g * y - x * u) + r * (g * m - x * n)) * s;
  }
  /// Rotates [arg] by the absolute rotation of this
  /// Returns [arg].
  /// Primarily used by AABB transformation code.
  absoluteRotate(s) {
    const t = Math.abs(this._m4storage[0]), e = Math.abs(this._m4storage[4]), r = Math.abs(this._m4storage[8]), h = Math.abs(this._m4storage[1]), g = Math.abs(this._m4storage[5]), n = Math.abs(this._m4storage[9]), u = Math.abs(this._m4storage[2]), v = Math.abs(this._m4storage[6]), x = Math.abs(this._m4storage[10]), m = s._v3storage, y = m[0], z = m[1], d = m[2];
    return m[0] = y * t + z * e + d * r + 0 * 0, m[1] = y * h + z * g + d * n + 0 * 0, m[2] = y * u + z * v + d * x + 0 * 0, s;
  }
  /// Adds [o] to this.
  add(s) {
    const t = s._m4storage;
    this._m4storage[0] = this._m4storage[0] + t[0], this._m4storage[1] = this._m4storage[1] + t[1], this._m4storage[2] = this._m4storage[2] + t[2], this._m4storage[3] = this._m4storage[3] + t[3], this._m4storage[4] = this._m4storage[4] + t[4], this._m4storage[5] = this._m4storage[5] + t[5], this._m4storage[6] = this._m4storage[6] + t[6], this._m4storage[7] = this._m4storage[7] + t[7], this._m4storage[8] = this._m4storage[8] + t[8], this._m4storage[9] = this._m4storage[9] + t[9], this._m4storage[10] = this._m4storage[10] + t[10], this._m4storage[11] = this._m4storage[11] + t[11], this._m4storage[12] = this._m4storage[12] + t[12], this._m4storage[13] = this._m4storage[13] + t[13], this._m4storage[14] = this._m4storage[14] + t[14], this._m4storage[15] = this._m4storage[15] + t[15];
  }
  /// Subtracts [o] from this.
  sub(s) {
    const t = s._m4storage;
    this._m4storage[0] = this._m4storage[0] - t[0], this._m4storage[1] = this._m4storage[1] - t[1], this._m4storage[2] = this._m4storage[2] - t[2], this._m4storage[3] = this._m4storage[3] - t[3], this._m4storage[4] = this._m4storage[4] - t[4], this._m4storage[5] = this._m4storage[5] - t[5], this._m4storage[6] = this._m4storage[6] - t[6], this._m4storage[7] = this._m4storage[7] - t[7], this._m4storage[8] = this._m4storage[8] - t[8], this._m4storage[9] = this._m4storage[9] - t[9], this._m4storage[10] = this._m4storage[10] - t[10], this._m4storage[11] = this._m4storage[11] - t[11], this._m4storage[12] = this._m4storage[12] - t[12], this._m4storage[13] = this._m4storage[13] - t[13], this._m4storage[14] = this._m4storage[14] - t[14], this._m4storage[15] = this._m4storage[15] - t[15];
  }
  /// Negate this.
  negate() {
    this._m4storage[0] = -this._m4storage[0], this._m4storage[1] = -this._m4storage[1], this._m4storage[2] = -this._m4storage[2], this._m4storage[3] = -this._m4storage[3], this._m4storage[4] = -this._m4storage[4], this._m4storage[5] = -this._m4storage[5], this._m4storage[6] = -this._m4storage[6], this._m4storage[7] = -this._m4storage[7], this._m4storage[8] = -this._m4storage[8], this._m4storage[9] = -this._m4storage[9], this._m4storage[10] = -this._m4storage[10], this._m4storage[11] = -this._m4storage[11], this._m4storage[12] = -this._m4storage[12], this._m4storage[13] = -this._m4storage[13], this._m4storage[14] = -this._m4storage[14], this._m4storage[15] = -this._m4storage[15];
  }
  /// Multiply this by [arg].
  multiply(s) {
    const t = this._m4storage[0], e = this._m4storage[4], r = this._m4storage[8], h = this._m4storage[12], g = this._m4storage[1], n = this._m4storage[5], u = this._m4storage[9], v = this._m4storage[13], x = this._m4storage[2], m = this._m4storage[6], y = this._m4storage[10], z = this._m4storage[14], d = this._m4storage[3], c = this._m4storage[7], w = this._m4storage[11], l = this._m4storage[15], _ = s._m4storage, R = _[0], B = _[4], f = _[8], b = _[12], q = _[1], S = _[5], P = _[9], O = _[13], F = _[2], D = _[6], j = _[10], Y = _[14], G = _[3], H = _[7], it = _[11], ht = _[15];
    this._m4storage[0] = t * R + e * q + r * F + h * G, this._m4storage[4] = t * B + e * S + r * D + h * H, this._m4storage[8] = t * f + e * P + r * j + h * it, this._m4storage[12] = t * b + e * O + r * Y + h * ht, this._m4storage[1] = g * R + n * q + u * F + v * G, this._m4storage[5] = g * B + n * S + u * D + v * H, this._m4storage[9] = g * f + n * P + u * j + v * it, this._m4storage[13] = g * b + n * O + u * Y + v * ht, this._m4storage[2] = x * R + m * q + y * F + z * G, this._m4storage[6] = x * B + m * S + y * D + z * H, this._m4storage[10] = x * f + m * P + y * j + z * it, this._m4storage[14] = x * b + m * O + y * Y + z * ht, this._m4storage[3] = d * R + c * q + w * F + l * G, this._m4storage[7] = d * B + c * S + w * D + l * H, this._m4storage[11] = d * f + c * P + w * j + l * it, this._m4storage[15] = d * b + c * O + w * Y + l * ht;
  }
  /// Multiply a copy of this with [arg].
  multiplied(s) {
    const t = this.clone();
    return t.multiply(s), t;
  }
  /// Multiply a transposed this with [arg].
  transposeMultiply(s) {
    const t = this._m4storage[0], e = this._m4storage[1], r = this._m4storage[2], h = this._m4storage[3], g = this._m4storage[4], n = this._m4storage[5], u = this._m4storage[6], v = this._m4storage[7], x = this._m4storage[8], m = this._m4storage[9], y = this._m4storage[10], z = this._m4storage[11], d = this._m4storage[12], c = this._m4storage[13], w = this._m4storage[14], l = this._m4storage[15], _ = s._m4storage;
    this._m4storage[0] = t * _[0] + e * _[1] + r * _[2] + h * _[3], this._m4storage[4] = t * _[4] + e * _[5] + r * _[6] + h * _[7], this._m4storage[8] = t * _[8] + e * _[9] + r * _[10] + h * _[11], this._m4storage[12] = t * _[12] + e * _[13] + r * _[14] + h * _[15], this._m4storage[1] = g * _[0] + n * _[1] + u * _[2] + v * _[3], this._m4storage[5] = g * _[4] + n * _[5] + u * _[6] + v * _[7], this._m4storage[9] = g * _[8] + n * _[9] + u * _[10] + v * _[11], this._m4storage[13] = g * _[12] + n * _[13] + u * _[14] + v * _[15], this._m4storage[2] = x * _[0] + m * _[1] + y * _[2] + z * _[3], this._m4storage[6] = x * _[4] + m * _[5] + y * _[6] + z * _[7], this._m4storage[10] = x * _[8] + m * _[9] + y * _[10] + z * _[11], this._m4storage[14] = x * _[12] + m * _[13] + y * _[14] + z * _[15], this._m4storage[3] = d * _[0] + c * _[1] + w * _[2] + l * _[3], this._m4storage[7] = d * _[4] + c * _[5] + w * _[6] + l * _[7], this._m4storage[11] = d * _[8] + c * _[9] + w * _[10] + l * _[11], this._m4storage[15] = d * _[12] + c * _[13] + w * _[14] + l * _[15];
  }
  /// Multiply this with a transposed [arg].
  multiplyTranspose(s) {
    const t = this._m4storage[0], e = this._m4storage[4], r = this._m4storage[8], h = this._m4storage[12], g = this._m4storage[1], n = this._m4storage[5], u = this._m4storage[9], v = this._m4storage[13], x = this._m4storage[2], m = this._m4storage[6], y = this._m4storage[10], z = this._m4storage[14], d = this._m4storage[3], c = this._m4storage[7], w = this._m4storage[11], l = this._m4storage[15], _ = s._m4storage;
    this._m4storage[0] = t * _[0] + e * _[4] + r * _[8] + h * _[12], this._m4storage[4] = t * _[1] + e * _[5] + r * _[9] + h * _[13], this._m4storage[8] = t * _[2] + e * _[6] + r * _[10] + h * _[14], this._m4storage[12] = t * _[3] + e * _[7] + r * _[11] + h * _[15], this._m4storage[1] = g * _[0] + n * _[4] + u * _[8] + v * _[12], this._m4storage[5] = g * _[1] + n * _[5] + u * _[9] + v * _[13], this._m4storage[9] = g * _[2] + n * _[6] + u * _[10] + v * _[14], this._m4storage[13] = g * _[3] + n * _[7] + u * _[11] + v * _[15], this._m4storage[2] = x * _[0] + m * _[4] + y * _[8] + z * _[12], this._m4storage[6] = x * _[1] + m * _[5] + y * _[9] + z * _[13], this._m4storage[10] = x * _[2] + m * _[6] + y * _[10] + z * _[14], this._m4storage[14] = x * _[3] + m * _[7] + y * _[11] + z * _[15], this._m4storage[3] = d * _[0] + c * _[4] + w * _[8] + l * _[12], this._m4storage[7] = d * _[1] + c * _[5] + w * _[9] + l * _[13], this._m4storage[11] = d * _[2] + c * _[6] + w * _[10] + l * _[14], this._m4storage[15] = d * _[3] + c * _[7] + w * _[11] + l * _[15];
  }
  // /// Decomposes this into [translation], [rotation] and [scale] components.
  // void decompose(Vector3 translation, Quaternion rotation, Vector3 scale) {
  //   final v = _decomposeV ??= Vector3.zero();
  //   var sx = (v..setValues(_m4storage[0], _m4storage[1], _m4storage[2])).length;
  //   final sy =
  //       (v..setValues(_m4storage[4], _m4storage[5], _m4storage[6])).length;
  //   final sz =
  //       (v..setValues(_m4storage[8], _m4storage[9], _m4storage[10])).length;
  //   if (determinant() < 0) {
  //     sx = -sx;
  //   }
  //   translation._v3storage[0] = _m4storage[12];
  //   translation._v3storage[1] = _m4storage[13];
  //   translation._v3storage[2] = _m4storage[14];
  //   final invSX = 1.0 / sx;
  //   final invSY = 1.0 / sy;
  //   final invSZ = 1.0 / sz;
  //   final m = _decomposeM ??= Matrix4.zero();
  //   m.setFrom(this);
  //   m._m4storage[0] *= invSX;
  //   m._m4storage[1] *= invSX;
  //   m._m4storage[2] *= invSX;
  //   m._m4storage[4] *= invSY;
  //   m._m4storage[5] *= invSY;
  //   m._m4storage[6] *= invSY;
  //   m._m4storage[8] *= invSZ;
  //   m._m4storage[9] *= invSZ;
  //   m._m4storage[10] *= invSZ;
  //   final r = _decomposeR ??= Matrix3.zero();
  //   m.copyRotation(r);
  //   rotation.setFromRotation(r);
  //   scale._v3storage[0] = sx;
  //   scale._v3storage[1] = sy;
  //   scale._v3storage[2] = sz;
  // }
  /// Rotate [arg] of type [Vector3] using the rotation defined by this.
  rotate3(s) {
    const t = s._v3storage, e = this._m4storage[0] * t[0] + this._m4storage[4] * t[1] + this._m4storage[8] * t[2], r = this._m4storage[1] * t[0] + this._m4storage[5] * t[1] + this._m4storage[9] * t[2], h = this._m4storage[2] * t[0] + this._m4storage[6] * t[1] + this._m4storage[10] * t[2];
    return t[0] = e, t[1] = r, t[2] = h, s;
  }
  /// Transform [arg] of type [Vector4] using the transformation defined by
  /// this.
  transform(s) {
    const t = s._v4storage, e = this._m4storage[0] * t[0] + this._m4storage[4] * t[1] + this._m4storage[8] * t[2] + this._m4storage[12] * t[3], r = this._m4storage[1] * t[0] + this._m4storage[5] * t[1] + this._m4storage[9] * t[2] + this._m4storage[13] * t[3], h = this._m4storage[2] * t[0] + this._m4storage[6] * t[1] + this._m4storage[10] * t[2] + this._m4storage[14] * t[3], g = this._m4storage[3] * t[0] + this._m4storage[7] * t[1] + this._m4storage[11] * t[2] + this._m4storage[15] * t[3];
    return t[0] = e, t[1] = r, t[2] = h, t[3] = g, s;
  }
  /// Transform [arg] of type [Vector3] using the perspective transformation
  /// defined by this.
  perspectiveTransform(s) {
    const t = s._v3storage, e = this._m4storage[0] * t[0] + this._m4storage[4] * t[1] + this._m4storage[8] * t[2] + this._m4storage[12], r = this._m4storage[1] * t[0] + this._m4storage[5] * t[1] + this._m4storage[9] * t[2] + this._m4storage[13], h = this._m4storage[2] * t[0] + this._m4storage[6] * t[1] + this._m4storage[10] * t[2] + this._m4storage[14], g = 1 / (this._m4storage[3] * t[0] + this._m4storage[7] * t[1] + this._m4storage[11] * t[2] + this._m4storage[15]);
    return t[0] = e * g, t[1] = r * g, t[2] = h * g, s;
  }
  // Copies this into [array] starting at [offset].
  copyIntoArray(s, t = 0) {
    const e = t;
    s[e + 15] = this._m4storage[15], s[e + 14] = this._m4storage[14], s[e + 13] = this._m4storage[13], s[e + 12] = this._m4storage[12], s[e + 11] = this._m4storage[11], s[e + 10] = this._m4storage[10], s[e + 9] = this._m4storage[9], s[e + 8] = this._m4storage[8], s[e + 7] = this._m4storage[7], s[e + 6] = this._m4storage[6], s[e + 5] = this._m4storage[5], s[e + 4] = this._m4storage[4], s[e + 3] = this._m4storage[3], s[e + 2] = this._m4storage[2], s[e + 1] = this._m4storage[1], s[e + 0] = this._m4storage[0];
  }
  /**
   * Copies elements from `array` into this starting at `offset`.
   */
  copyFromArray(s, t = 0) {
    const e = t;
    this._m4storage[15] = s[e + 15], this._m4storage[14] = s[e + 14], this._m4storage[13] = s[e + 13], this._m4storage[12] = s[e + 12], this._m4storage[11] = s[e + 11], this._m4storage[10] = s[e + 10], this._m4storage[9] = s[e + 9], this._m4storage[8] = s[e + 8], this._m4storage[7] = s[e + 7], this._m4storage[6] = s[e + 6], this._m4storage[5] = s[e + 5], this._m4storage[4] = s[e + 4], this._m4storage[3] = s[e + 3], this._m4storage[2] = s[e + 2], this._m4storage[1] = s[e + 1], this._m4storage[0] = s[e + 0];
  }
  get right() {
    const s = this._m4storage[0], t = this._m4storage[1], e = this._m4storage[2];
    return new p(s, t, e);
  }
  get up() {
    const s = this._m4storage[4], t = this._m4storage[5], e = this._m4storage[6];
    return new p(s, t, e);
  }
  get forward() {
    const s = this._m4storage[8], t = this._m4storage[9], e = this._m4storage[10];
    return new p(s, t, e);
  }
  /// Is this the identity matrix?
  isIdentity() {
    return this._m4storage[0] == 1 && // col 1
    this._m4storage[1] == 0 && this._m4storage[2] == 0 && this._m4storage[3] == 0 && this._m4storage[4] == 0 && // col 2
    this._m4storage[5] == 1 && this._m4storage[6] == 0 && this._m4storage[7] == 0 && this._m4storage[8] == 0 && // col 3
    this._m4storage[9] == 0 && this._m4storage[10] == 1 && this._m4storage[11] == 0 && this._m4storage[12] == 0 && // col 4
    this._m4storage[13] == 0 && this._m4storage[14] == 0 && this._m4storage[15] == 1;
  }
  /// Is this the zero matrix?
  isZero() {
    return this._m4storage[0] == 0 && // col 1
    this._m4storage[1] == 0 && this._m4storage[2] == 0 && this._m4storage[3] == 0 && this._m4storage[4] == 0 && // col 2
    this._m4storage[5] == 0 && this._m4storage[6] == 0 && this._m4storage[7] == 0 && this._m4storage[8] == 0 && // col 3
    this._m4storage[9] == 0 && this._m4storage[10] == 0 && this._m4storage[11] == 0 && this._m4storage[12] == 0 && // col 4
    this._m4storage[13] == 0 && this._m4storage[14] == 0 && this._m4storage[15] == 0;
  }
}
var cs = /* @__PURE__ */ ((a) => (a.loose = "loose", a.expand = "expand", a.passthrough = "passthrough", a))(cs || {});
class zs {
  constructor({
    topLeft: s,
    topRight: t,
    bottomLeft: e,
    bottomRight: r
  }) {
    o(this, "topLeft");
    o(this, "topRight");
    o(this, "bottomLeft");
    o(this, "bottomRight");
    this.bottomLeft = e, this.bottomRight = r, this.topLeft = s, this.topRight = t;
  }
  toRRect(s) {
    throw new Error("Not implemented");
  }
}
const mt = class extends zs {
  static all(s) {
    return this.only({
      topLeft: s,
      topRight: s,
      bottomLeft: s,
      bottomRight: s
    });
  }
  static circular(s) {
    return this.all(M.circular(s));
  }
  static vertical({
    top: s = M.zero,
    bottom: t = M.zero
  }) {
    return this.only({
      topLeft: s,
      topRight: s,
      bottomLeft: t,
      bottomRight: t
    });
  }
  static left({
    left: s = M.zero,
    right: t = M.zero
  }) {
    return this.only({
      topLeft: s,
      bottomLeft: s,
      topRight: t,
      bottomRight: t
    });
  }
  static only({
    topLeft: s = M.zero,
    topRight: t = M.zero,
    bottomLeft: e = M.zero,
    bottomRight: r = M.zero
  }) {
    return new mt({
      topLeft: s,
      topRight: t,
      bottomLeft: e,
      bottomRight: r
    });
  }
  copyWith({
    topLeft: s = this.topLeft,
    topRight: t = this.topRight,
    bottomLeft: e = this.bottomLeft,
    bottomRight: r = this.bottomRight
  }) {
    return mt.only({
      topLeft: s,
      topRight: t,
      bottomLeft: e,
      bottomRight: r
    });
  }
  toRRect(s) {
    return lt.fromRectAndCorners({
      rect: s,
      topLeft: this.topLeft.clamp({ minimum: M.zero }),
      topRight: this.topRight.clamp({ minimum: M.zero }),
      bottomLeft: this.bottomLeft.clamp({ minimum: M.zero }),
      bottomRight: this.bottomRight.clamp({ minimum: M.zero })
    });
  }
};
let wt = mt;
o(wt, "zero", mt.all(M.zero));
var ds = /* @__PURE__ */ ((a) => (a.normal = "normal", a))(ds || {});
const Wt = class {
  constructor({
    style: s = "solid",
    width: t = 1,
    color: e = "black",
    strokeAlign: r = Wt.strokeAlignInside
  } = {}) {
    o(this, "color");
    o(this, "width");
    o(this, "style");
    o(this, "strokeAlign");
    this.color = e, this.style = s, this.width = t, this.strokeAlign = r;
  }
  get strokeInset() {
    return this.width * (1 - (1 + this.strokeAlign) / 2);
  }
  get strokeOutset() {
    return this.width * (1 + this.strokeAlign) / 2;
  }
  get strokeOffset() {
    return this.width * this.strokeAlign;
  }
  paint(s) {
    this.style === "none" ? (s.setAttribute("stroke-width", "0"), s.setAttribute("stroke", "transparent")) : (s.setAttribute("stroke-width", `${this.width}`), s.setAttribute("stroke", `${this.color}`)), s.setAttribute("fill", "none");
  }
};
let X = Wt;
o(X, "strokeAlignInside", -1), o(X, "strokeAlignCenter", 0), o(X, "strokeAlignOutside", 1), o(X, "none", new Wt({ width: 0, style: "none" }));
class ft {
  get dimensions() {
    throw new Error("Method not implemented.");
  }
  getInnerPath(s) {
    return new U().addRect(this.dimensions.deflateRect(s));
  }
  getOuterPath(s) {
    return new U().addRect(s);
  }
  paint(s, t) {
    throw new Error("Method not implemented.");
  }
  static paintUniformBorderWidthRadius(s, {
    side: t,
    borderRadius: e,
    rect: r
  }) {
    $(t.style !== "none");
    const h = s.top;
    h.setAttribute("stroke-width", "0"), h.setAttribute("fill", t.color);
    const g = e.toRRect(r), n = g.deflate(t.strokeInset), u = g.inflate(t.strokeOutset);
    h.setAttribute("d", new U().addDRRect({ inner: n, outer: u }).getD()), ["bottom"].forEach((v) => {
      const x = s[v];
      X.none.paint(x);
    });
  }
  static paintUniformBorderWidthCircle(s, { side: t, rect: e }) {
    $(t.style !== "none");
    const r = s.top;
    t.paint(r), r.setAttribute(
      "d",
      new U().addOval(
        E.fromCircle({
          center: e.center,
          radius: (e.shortestSide + t.strokeOffset) / 2
        })
      ).getD()
    ), ["bottom"].forEach((h) => {
      const g = s[h];
      X.none.paint(g);
    });
  }
  static paintUniformBorderWidthRectangle(s, { side: t, rect: e }) {
    $(t.style !== "none");
    const r = s.top;
    t.paint(r), r.setAttribute(
      "d",
      new U().addRect(e.inflate(t.strokeOffset / 2)).getD()
    ), ["bottom"].forEach((h) => {
      const g = s[h];
      X.none.paint(g);
    });
  }
}
class qt extends ft {
  constructor({
    top: t = X.none,
    right: e = X.none,
    bottom: r = X.none,
    left: h = X.none
  }) {
    super();
    o(this, "top");
    o(this, "right");
    o(this, "bottom");
    o(this, "left");
    this.top = t, this.right = e, this.bottom = r, this.left = h;
  }
  static fromBorderSide(t) {
    return new qt({ left: t, right: t, bottom: t, top: t });
  }
  static symmetric({
    vertical: t = X.none,
    horizontal: e = X.none
  }) {
    return new qt({
      left: t,
      right: t,
      top: e,
      bottom: e
    });
  }
  static all({
    color: t = "black",
    width: e = 1,
    style: r = "solid",
    strokeAlign: h = X.strokeAlignInside
  } = {}) {
    const g = new X({ strokeAlign: h, style: r, color: t, width: e });
    return qt.fromBorderSide(g);
  }
  get dimensions() {
    return this._widthIsUniform ? et.all(this.top.strokeInset) : et.fromLTRB({
      left: this.left.strokeInset,
      right: this.right.strokeInset,
      bottom: this.bottom.strokeInset,
      top: this.top.strokeInset
    });
  }
  get isUniform() {
    return this._colorIsUniform && this._styleIsUniform && this._strokeAlignIsUniform && this._widthIsUniform;
  }
  paint(t, {
    rect: e,
    borderRadius: r,
    shape: h = "rectangle"
  }) {
    if (this.isUniform)
      switch (this.top.style) {
        case "none":
          Object.values(t).forEach((g) => {
            g.setAttribute("stroke-width", "0"), g.setAttribute("fill", "none"), g.setAttribute("d", "");
          });
          return;
        case "solid":
          switch (h) {
            case "circle":
              $(
                r == null,
                "A borderRadius can only be given for rectangular boxes."
              ), ft.paintUniformBorderWidthCircle(t, {
                side: this.top,
                rect: e
              });
              break;
            case "rectangle":
              if (r != null && r != wt.zero) {
                ft.paintUniformBorderWidthRadius(t, {
                  side: this.top,
                  borderRadius: r,
                  rect: e
                });
                return;
              }
              ft.paintUniformBorderWidthRectangle(t, {
                side: this.top,
                rect: e
              });
              break;
          }
          return;
      }
    $(
      (() => {
        if (r != null) {
          const g = `
          A borderRadius can only be given for a uniform Border.
          The following is not uniform: `;
          this._colorIsUniform || new Error(g + "BorderSide.color"), this._widthIsUniform || new Error(g + "BorderSide.width"), this._styleIsUniform || new Error(g + "BorderSide.style"), this._strokeAlignIsUniform || new Error(g + "BorderSide.strokeAlign");
        }
        return !0;
      })()
    ), $(
      (() => {
        if (h != "rectangle") {
          const g = `
          A Border can only be drawn as a circle if it is uniform.
          The following is not uniform: `;
          this._colorIsUniform || new Error(g + "BorderSide.color"), this._widthIsUniform || new Error(g + "BorderSide.width"), this._styleIsUniform || new Error(g + "BorderSide.style"), this._strokeAlignIsUniform || new Error(g + "BorderSide.strokeAlign");
        }
        return !0;
      })()
    ), $(
      (() => (this._strokeAlignIsUniform || this.top.strokeAlign != X.strokeAlignInside, !0))()
    ), this.paintBorder(t, { rect: e });
  }
  paintBorder(t, { rect: e }) {
    switch (t.bottom.setAttribute("stroke-width", "0"), t.top.setAttribute("stroke-width", "0"), t.left.setAttribute("stroke-width", "0"), t.right.setAttribute("stroke-width", "0"), this.top.style) {
      case "solid":
        t.top.setAttribute("fill", this.top.color);
        const r = new U();
        r.moveTo({ x: e.left, y: e.top }), r.lineTo({ x: e.right, y: e.top }), this.top.width === 0 ? (t.top.setAttribute("fill", "none"), t.top.setAttribute("stroke", "none")) : (r.lineTo({
          x: e.right - this.right.width,
          y: e.top + this.top.width
        }), r.lineTo({
          x: e.left + this.left.width,
          y: e.top + this.top.width
        })), r.close(), t.top.setAttribute("d", r.getD());
        break;
      case "none":
        t.top.setAttribute("d", "");
        break;
    }
    switch (this.right.style) {
      case "solid":
        t.right.setAttribute("fill", this.right.color);
        const r = new U();
        r.moveTo({ x: e.right, y: e.top }), r.lineTo({ x: e.right, y: e.bottom }), this.right.width === 0 ? (t.right.setAttribute("fill", "none"), t.right.setAttribute("stroke", "none")) : (r.lineTo({
          x: e.right - this.right.width,
          y: e.bottom - this.bottom.width
        }), r.lineTo({
          x: e.right - this.right.width,
          y: e.top + this.top.width
        })), r.close(), t.right.setAttribute("d", r.getD());
        break;
      case "none":
        t.right.setAttribute("d", "");
        break;
    }
    switch (this.bottom.style) {
      case "solid":
        t.bottom.setAttribute("fill", this.bottom.color);
        const r = new U();
        r.moveTo({ x: e.right, y: e.bottom }), r.lineTo({ x: e.left, y: e.bottom }), this.bottom.width === 0 ? (t.bottom.setAttribute("fill", "none"), t.bottom.setAttribute("stroke", "none")) : (r.lineTo({
          x: e.left + this.left.width,
          y: e.bottom - this.bottom.width
        }), r.lineTo({
          x: e.right - this.right.width,
          y: e.bottom - this.bottom.width
        })), r.close(), t.bottom.setAttribute("d", r.getD());
        break;
      case "none":
        t.bottom.setAttribute("d", "");
        break;
    }
    switch (this.left.style) {
      case "solid":
        t.left.setAttribute("fill", this.left.color);
        const r = new U();
        r.moveTo({ x: e.left, y: e.bottom }), r.lineTo({ x: e.left, y: e.top }), this.left.width === 0 ? (t.left.setAttribute("fill", "none"), t.left.setAttribute("stroke", "none")) : (r.lineTo({
          x: e.left + this.left.width,
          y: e.top + this.top.width
        }), r.lineTo({
          x: e.left + this.left.width,
          y: e.bottom - this.bottom.width
        })), r.close(), t.left.setAttribute("d", r.getD());
        break;
      case "none":
        t.left.setAttribute("d", "");
        break;
    }
  }
  get _colorIsUniform() {
    const t = this.top.color;
    return this.right.color == t && this.bottom.color == t && this.left.color == t;
  }
  get _widthIsUniform() {
    const t = this.top.width;
    return this.right.width === t && this.bottom.width === t && this.left.width === t;
  }
  get _styleIsUniform() {
    const t = this.top.style;
    return this.right.style == t && this.bottom.style == t && this.left.style == t;
  }
  get _strokeAlignIsUniform() {
    const t = this.top.strokeAlign;
    return this.right.strokeAlign == t && this.bottom.strokeAlign == t && this.left.strokeAlign == t;
  }
}
class ps {
  /*
    Those are not implemented
    gradient?: Gradient
    blendMode?: BlendMode
    image?: DecorationImage
  */
  constructor({
    color: s = "transparent",
    border: t,
    borderRadius: e,
    shape: r = "rectangle",
    boxShadow: h
  }) {
    o(this, "color");
    o(this, "border");
    o(this, "borderRadius");
    o(this, "boxShadow");
    o(this, "shape");
    this.color = s, this.border = t, this.borderRadius = e, this.shape = r, this.boxShadow = h;
  }
  get padding() {
    var s;
    return (s = this.border) == null ? void 0 : s.dimensions;
  }
  getClipPath(s) {
    switch (this.shape) {
      case "circle":
        const t = s.center, e = s.shortestSide / 2, r = E.fromCircle({ center: t, radius: e });
        return new U().addOval(r);
      case "rectangle":
        return this.borderRadius != null ? new U().addRRect(this.borderRadius.toRRect(s)) : new U().addRect(s);
    }
  }
  createBoxPainter() {
    return new fs(this);
  }
}
class fs {
  constructor(s) {
    this.decoration = s;
  }
  paint(s, t) {
    var r;
    const e = E.fromLTWH({
      left: 0,
      top: 0,
      width: t.width,
      height: t.height
    });
    this.paintBackgroundColor(s.box, e), this.paintShadows(s.box), (r = this.decoration.border) == null || r.paint(
      {
        top: s.topBorder,
        bottom: s.bottomBorder,
        left: s.leftBorder,
        right: s.rightBorder
      },
      {
        rect: e,
        shape: this.decoration.shape,
        borderRadius: this.decoration.borderRadius
      }
    );
  }
  paintShadows(s) {
    if (this.decoration.boxShadow == null || this.decoration.boxShadow.length === 0) {
      s.removeAttribute("filter");
      return;
    }
    const t = this.decoration.boxShadow.reduce(
      (e, r) => e + ` drop-shadow(${r.offset.x} ${r.offset.y} ${r.blurRadius} ${r.color})`,
      ""
    );
    s.setAttribute("filter", t);
  }
  paintBackgroundColor(s, t) {
    if (s.setAttribute("stroke-width", "0"), s.setAttribute("fill", this.decoration.color || "none"), this.decoration.borderRadius == null) {
      s.setAttribute("d", new U().addRect(t).getD());
      return;
    }
    s.setAttribute(
      "d",
      new U().addRRect(
        lt.fromRectAndCorners({
          rect: t,
          topLeft: this.decoration.borderRadius.topLeft,
          topRight: this.decoration.borderRadius.topRight,
          bottomLeft: this.decoration.borderRadius.bottomLeft,
          bottomRight: this.decoration.borderRadius.bottomRight
        })
      ).getD()
    );
  }
}
class Oe {
  // spreadRadius: number = 0
  // blurStyle = normal
  constructor({
    color: s = "black",
    offset: t = { x: 0, y: 0 },
    blurRadius: e = 0
  } = {}) {
    o(this, "color");
    o(this, "offset");
    o(this, "blurRadius");
    this.color = s, this.offset = t, this.blurRadius = e;
  }
}
var _t = /* @__PURE__ */ ((a) => (a.left = "left", a.right = "right", a.center = "center", a.start = "start", a.end = "end", a))(_t || {}), nt = /* @__PURE__ */ ((a) => (a.clip = "clip", a.visible = "visible", a.ellipsis = "ellipsis", a))(nt || {}), xt = /* @__PURE__ */ ((a) => (a.parent = "parent", a.longestLine = "longestLine", a))(xt || {}), bs = /* @__PURE__ */ ((a) => (a.alphabetic = "alphabetic", a.ideographic = "ideographic", a))(bs || {});
class St {
  constructor({
    inherit: s = !0,
    color: t,
    fontSize: e,
    fontWeight: r,
    fontFamily: h,
    textBaseline: g,
    fontStyle: n,
    height: u
  } = {}) {
    o(this, "inherit");
    o(this, "color");
    o(this, "fontSize");
    o(this, "fontWeight");
    o(this, "fontFamily");
    o(this, "textBaseline");
    o(this, "fontStyle");
    /// The height of this text span, as a multiple of the font size.
    ///
    /// When [height] is null or omitted, the line height will be determined
    /// by the font's metrics directly, which may differ from the fontSize.
    /// When [height] is non-null, the line height of the span of text will be a
    /// multiple of [fontSize] and be exactly `fontSize * height` logical pixels
    /// tall.
    o(this, "height");
    this.inherit = s, this.color = t, this.fontSize = e, this.fontWeight = r, this.fontFamily = h, this.textBaseline = g, this.fontStyle = n, this.height = u;
  }
  copyWidth({
    inherit: s = this.inherit,
    color: t = this.color,
    fontSize: e = this.fontSize,
    fontWeight: r = this.fontWeight,
    fontFamily: h = this.fontFamily,
    textBaseline: g = this.textBaseline,
    fontStyle: n = this.fontStyle,
    height: u = this.height
  }) {
    return new St({
      inherit: s,
      color: t,
      fontFamily: h,
      fontSize: e,
      fontWeight: r,
      textBaseline: g,
      fontStyle: n,
      height: u
    });
  }
  merge(s) {
    return s == null ? this : s.inherit ? this.copyWidth({
      ...s
    }) : s;
  }
  getParagraphStyle({
    textAlign: s,
    textDirection: t,
    maxLines: e,
    fontFamily: r = this.fontFamily,
    fontSize: h = this.fontSize,
    fontWeight: g = this.fontWeight,
    fontStyle: n = this.fontStyle,
    ellipsis: u,
    height: v = this.height,
    textScaleFactor: x = 1
  }) {
    return new qs({
      textAlign: s,
      textDirection: t,
      maxLines: e,
      fontFamily: r,
      fontStyle: n,
      fontWeight: g,
      ellipsis: u,
      height: v,
      fontSize: (h ?? 16) * x
    });
  }
}
class qs {
  constructor({
    textAlign: s,
    textDirection: t,
    maxLines: e,
    fontFamily: r,
    fontSize: h,
    fontStyle: g,
    fontWeight: n,
    ellipsis: u,
    height: v
  }) {
    o(this, "textAlign");
    o(this, "textDirection");
    o(this, "maxLines");
    o(this, "fontFamily");
    o(this, "fontSize");
    o(this, "fontWeight");
    o(this, "fontStyle");
    o(this, "ellipsis");
    o(this, "height");
    this.textAlign = s, this.textDirection = t, this.maxLines = e, this.fontFamily = r, this.fontSize = h, this.fontStyle = g, this.fontWeight = n, this.ellipsis = u, this.height = v;
  }
}
var Kt = /* @__PURE__ */ ((a) => (a.normal = "normal", a.italic = "italic", a))(Kt || {});
class Rs {
  constructor({ style: s }) {
    o(this, "style");
    this.style = s;
  }
  computeToPlainText() {
    throw new Error("Not implemented: computeToPlainText");
  }
  build(s, t) {
    throw new Error("Not implemented: build");
  }
  visitChildren(s) {
    throw new Error("Not implemented: visitChildren");
  }
  toPlainText() {
    return this.computeToPlainText();
  }
}
class Ss extends Rs {
  constructor({
    style: t = new St(),
    text: e,
    children: r = []
  }) {
    super({ style: t });
    o(this, "text");
    o(this, "children");
    this.children = r, this.text = e;
  }
  visitChildren(t) {
    t(this), this.children.forEach((e) => e.visitChildren(t));
  }
  computeToPlainText() {
    return this.text || "";
  }
  build(t, e = this.style ?? new St()) {
    const r = e.merge(this.style), { fontFamily: h, fontSize: g, fontStyle: n, fontWeight: u, color: v, height: x } = r;
    t.addText({
      fontFamily: h,
      fontSize: g,
      fontWeight: u,
      fontStyle: n,
      color: v,
      height: x,
      content: this.computeToPlainText()
    }), this.children.forEach((m) => {
      m.build(t, r);
    });
  }
}
var Ot = {}, Ws = {
  get exports() {
    return Ot;
  },
  set exports(a) {
    Ot = a;
  }
};
(function(a) {
  var s = (() => {
    var t = Object.defineProperty, e = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, h = Object.prototype.propertyIsEnumerable, g = (w, l, _) => l in w ? t(w, l, { enumerable: !0, configurable: !0, writable: !0, value: _ }) : w[l] = _, n = (w, l) => {
      for (var _ in l || (l = {}))
        r.call(l, _) && g(w, _, l[_]);
      if (e)
        for (var _ of e(l))
          h.call(l, _) && g(w, _, l[_]);
      return w;
    }, u = (w) => t(w, "__esModule", { value: !0 }), v = (w, l) => {
      u(w);
      for (var _ in l)
        t(w, _, { get: l[_], enumerable: !0 });
    }, x = {};
    v(x, {
      DEFAULT_UUID_LENGTH: () => y,
      default: () => c
    });
    var m = "4.4.4", y = 6, z = {
      dictionary: "alphanum",
      shuffle: !0,
      debug: !1,
      length: y
    }, d = class extends Function {
      constructor(w = {}) {
        super(), this.dictIndex = 0, this.dictRange = [], this.lowerBound = 0, this.upperBound = 0, this.dictLength = 0, this._digit_first_ascii = 48, this._digit_last_ascii = 58, this._alpha_lower_first_ascii = 97, this._alpha_lower_last_ascii = 123, this._hex_last_ascii = 103, this._alpha_upper_first_ascii = 65, this._alpha_upper_last_ascii = 91, this._number_dict_ranges = {
          digits: [this._digit_first_ascii, this._digit_last_ascii]
        }, this._alpha_dict_ranges = {
          lowerCase: [this._alpha_lower_first_ascii, this._alpha_lower_last_ascii],
          upperCase: [this._alpha_upper_first_ascii, this._alpha_upper_last_ascii]
        }, this._alpha_lower_dict_ranges = {
          lowerCase: [this._alpha_lower_first_ascii, this._alpha_lower_last_ascii]
        }, this._alpha_upper_dict_ranges = {
          upperCase: [this._alpha_upper_first_ascii, this._alpha_upper_last_ascii]
        }, this._alphanum_dict_ranges = {
          digits: [this._digit_first_ascii, this._digit_last_ascii],
          lowerCase: [this._alpha_lower_first_ascii, this._alpha_lower_last_ascii],
          upperCase: [this._alpha_upper_first_ascii, this._alpha_upper_last_ascii]
        }, this._alphanum_lower_dict_ranges = {
          digits: [this._digit_first_ascii, this._digit_last_ascii],
          lowerCase: [this._alpha_lower_first_ascii, this._alpha_lower_last_ascii]
        }, this._alphanum_upper_dict_ranges = {
          digits: [this._digit_first_ascii, this._digit_last_ascii],
          upperCase: [this._alpha_upper_first_ascii, this._alpha_upper_last_ascii]
        }, this._hex_dict_ranges = {
          decDigits: [this._digit_first_ascii, this._digit_last_ascii],
          alphaDigits: [this._alpha_lower_first_ascii, this._hex_last_ascii]
        }, this.log = (...f) => {
          const b = [...f];
          if (b[0] = `[short-unique-id] ${f[0]}`, this.debug === !0 && typeof console < "u" && console !== null)
            return console.log(...b);
        }, this.setDictionary = (f, b) => {
          let q;
          if (f && Array.isArray(f) && f.length > 1)
            q = f;
          else {
            q = [];
            let S;
            this.dictIndex = S = 0;
            const P = `_${f}_dict_ranges`, O = this[P];
            Object.keys(O).forEach((F) => {
              const D = F;
              for (this.dictRange = O[D], this.lowerBound = this.dictRange[0], this.upperBound = this.dictRange[1], this.dictIndex = S = this.lowerBound; this.lowerBound <= this.upperBound ? S < this.upperBound : S > this.upperBound; this.dictIndex = this.lowerBound <= this.upperBound ? S += 1 : S -= 1)
                q.push(String.fromCharCode(this.dictIndex));
            });
          }
          b && (q = q.sort(() => Math.random() - 0.5)), this.dict = q, this.dictLength = this.dict.length, this.counter = 0;
        }, this.seq = () => this.sequentialUUID(), this.sequentialUUID = () => {
          let f, b, q = "";
          f = this.counter;
          do
            b = f % this.dictLength, f = Math.trunc(f / this.dictLength), q += this.dict[b];
          while (f !== 0);
          return this.counter += 1, q;
        }, this.randomUUID = (f = this.uuidLength || y) => {
          let b, q, S;
          if (f === null || typeof f > "u" || f < 1)
            throw new Error("Invalid UUID Length Provided");
          for (b = "", S = 0; S < f; S += 1)
            q = parseInt((Math.random() * this.dictLength).toFixed(0), 10) % this.dictLength, b += this.dict[q];
          return b;
        }, this.availableUUIDs = (f = this.uuidLength) => parseFloat(Math.pow([...new Set(this.dict)].length, f).toFixed(0)), this.approxMaxBeforeCollision = (f = this.availableUUIDs(this.uuidLength)) => parseFloat(Math.sqrt(Math.PI / 2 * f).toFixed(20)), this.collisionProbability = (f = this.availableUUIDs(this.uuidLength), b = this.uuidLength) => parseFloat((this.approxMaxBeforeCollision(f) / this.availableUUIDs(b)).toFixed(20)), this.uniqueness = (f = this.availableUUIDs(this.uuidLength)) => {
          const b = parseFloat((1 - this.approxMaxBeforeCollision(f) / f).toFixed(20));
          return b > 1 ? 1 : b < 0 ? 0 : b;
        }, this.getVersion = () => this.version, this.stamp = (f) => {
          if (typeof f != "number" || f < 10)
            throw new Error("Param finalLength must be number greater than 10");
          const b = Math.floor(+/* @__PURE__ */ new Date() / 1e3).toString(16), q = f - 9, S = Math.round(Math.random() * (q > 15 ? 15 : q)), P = this.randomUUID(q);
          return `${P.substr(0, S)}${b}${P.substr(S)}${S.toString(16)}`;
        }, this.parseStamp = (f) => {
          if (f.length < 10)
            throw new Error("Stamp length invalid");
          const b = parseInt(f.substr(f.length - 1, 1), 16);
          return new Date(parseInt(f.substr(b, 8), 16) * 1e3);
        };
        const l = n(n({}, z), w);
        this.counter = 0, this.debug = !1, this.dict = [], this.version = m;
        const {
          dictionary: _,
          shuffle: R,
          length: B
        } = l;
        return this.uuidLength = B, this.setDictionary(_, R), this.debug = l.debug, this.log(this.dict), this.log(`Generator instantiated with Dictionary Size ${this.dictLength}`), new Proxy(this, {
          apply: (f, b, q) => this.randomUUID(...q)
        });
      }
    }, c = d;
    return c.default = d, x;
  })();
  a.exports = s.default, typeof window < "u" && (s = s.default);
})(Ws);
const As = /* @__PURE__ */ as(Ot), Is = new As({ dictionary: "hex" });
class ct {
  constructor({ isPainter: s }) {
    o(this, "isPainter");
    o(this, "id", Is.randomUUID(6));
    o(this, "ownerElement");
    o(this, "type", this.constructor.name);
    o(this, "size", C.zero);
    o(this, "constraints", W.loose(C.maximum()));
    o(this, "offset", k.zero());
    this.isPainter = s;
  }
  get children() {
    return this.ownerElement.children.map((s) => s.renderObject);
  }
  layout(s) {
    this.constraints = s.normalize(), this.preformLayout();
  }
  paint(s, t, e, r = L.identity(), h = 1) {
    const g = t.plus(this.offset);
    if (this.isPainter) {
      const { svgEls: x, container: m } = this.findOrAppendSvgEl(s);
      e && m.setAttribute("clip-path", `url(#${e})`), m.setAttribute("opacity", `${h}`), this.performPaint(x, s), Object.values(x).forEach(
        (y) => this.setSvgTransform(y, g, r)
      );
    }
    const n = this.getChildClipId(e), u = this.getChildMatrix4(r), v = this.getChildOpacity(h);
    this.paintChildren(s, {
      offset: g,
      clipId: n,
      matrix4: u,
      opacity: v
    });
  }
  paintChildren(s, {
    offset: t,
    clipId: e,
    matrix4: r,
    opacity: h
  }) {
    this.children.forEach(
      (g) => g.paint(s, t, e, r, h)
    );
  }
  getChildMatrix4(s) {
    return s;
  }
  getChildOpacity(s) {
    return s;
  }
  setSvgTransform(s, t, e) {
    const r = s.getAttribute("style") || "";
    s.setAttribute(
      "style",
      `${r} transform: translate(${t.x}px, ${t.y}px) matrix3d(${e.storage.join(",")});`
    );
  }
  attach(s) {
    this.ownerElement = s;
  }
  dispose(s) {
    var t;
    this.isPainter && ((t = s.findSvgEl(this.id)) == null || t.remove()), this.children.forEach((e) => e.dispose(s));
  }
  //It is like computeIntrinsicMinWidth on Flutter
  getIntrinsicWidth(s) {
    return 0;
  }
  //It is like computeIntrinsicMinHeight on Flutter
  getIntrinsicHeight(s) {
    return 0;
  }
  findOrAppendSvgEl(s) {
    const { findSvgEl: t, appendSvgEl: e } = s, r = t(this.id);
    let h = {}, g;
    if (r)
      if (g = r, r.nodeName === "g")
        for (let n = 0; n < r.children.length; n++) {
          const u = r.children[n], v = u.getAttribute("data-render-name");
          h[v] = u;
        }
      else {
        const n = r.getAttribute("data-render-name");
        h[n] = r;
      }
    else {
      h = this.createDefaultSvgEl(s), Object.entries(h).forEach(([u, v]) => {
        v.setAttribute("data-render-name", u);
      });
      const n = Object.values(h);
      if (n.length === 1 && n[0].nodeName === "CLIPPATH") {
        const u = n[0];
        g = u, s.setId(u, this.id), u.setAttribute("data-render-type", this.type), e(u);
      } else {
        const u = s.createSvgEl("g");
        g = u, s.setId(u, this.id), e(u), u.setAttribute("data-render-type", this.type), n.forEach((v) => {
          u.appendChild(v);
        });
      }
    }
    return { svgEls: h, container: g };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createDefaultSvgEl(s) {
    throw { message: "not implemented defaultSvgEl" };
  }
  /*
   * Do not call this method directly. instead call layout
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  preformLayout() {
    throw { message: "not implemented performLayout" };
  }
  /*
   * Do not call this method directly. instead call paint
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  performPaint(s, t) {
  }
  getChildClipId(s) {
    return s;
  }
}
class Cs extends ct {
  constructor() {
    super({ isPainter: !1 });
  }
  preformLayout() {
    const s = this.constraints;
    if (!s.isTight)
      throw { message: "constraint must be tight on render view" };
    this.size = new C({
      width: s.maxWidth,
      height: s.maxHeight
    }), this.children.forEach((t) => t.layout(W.loose(this.size)));
  }
}
class zt {
  constructor(s) {
    o(this, "key");
    o(this, "runtimeType", this.constructor.name);
    this.key = s;
  }
  createElement() {
    throw { message: "not implemented" };
  }
  static canUpdate(s, t) {
    return s.runtimeType === t.runtimeType && s.key === t.key;
  }
}
class At {
  constructor(s) {
    o(this, "owner");
    o(this, "widget");
    o(this, "parent");
    this.widget = s;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  visitChildren(s) {
    throw { message: "not implemented" };
  }
  get renderObject() {
    let s = null;
    const t = (e) => {
      e instanceof Qt ? s = e._renderObject : e.visitChildren(t);
    };
    if (t(this), s == null)
      throw { message: "can not find render object" };
    return s;
  }
  //There are 5 case
  // 1. child is not null, but widget is null
  // in this case, child must be unmounted
  // 2. child is null, widget is null
  // nothing happend
  // 3. child is null, widget is not null
  // newWidget would be inflated,
  // 4. child is not null, widget is not null, and widget can be update
  // in this case, just update widget configruation
  // 5. it is similar to 4 but widget can not be update,
  // in this case, child must be unmounted and newWidget would be inflated
  updateChild(s, t) {
    if (s != null && t == null)
      return s.unmount(), null;
    if (!(s == null && t == null))
      return s == null && t != null ? this.inflateWidget(t) : s != null && t != null && zt.canUpdate(s.widget, t) ? (s.update(t), s) : (s.unmount(), this.inflateWidget(t));
  }
  unmount() {
    this.parent = void 0, this.renderObject.dispose(this.owner.paintContext);
  }
  mount(s) {
    s && (this.owner = s.owner), this.parent = s;
  }
  update(s) {
    this.widget = s;
  }
  inflateWidget(s) {
    const t = s.createElement();
    return t.mount(this), t;
  }
  rebuild() {
    this.performRebuild();
  }
  performRebuild() {
    throw { message: "not implemented rebuild" };
  }
}
class Hs extends At {
  constructor(t) {
    super(t);
    o(this, "children");
    o(this, "_renderObject");
  }
  createRenderObject() {
    const t = this.widget.createRenderObject();
    return t.attach(this), t;
  }
  mount(t) {
    super.mount(t), this._renderObject = this.createRenderObject(), this.children = this.widget.children.map((e) => this.inflateWidget(e));
  }
  update(t) {
    super.update(t), this.performRebuild();
    const e = this.widget.children;
    this.updateChilren(e);
  }
  updateChilren(t) {
    const e = [], r = this.children, h = t.map((g) => {
      const n = r.findIndex(
        (v, x) => !e.includes(x) && zt.canUpdate(g, v.widget)
      );
      let u;
      return n === -1 ? u = null : (u = r[n], e.push(n)), this.updateChild(u, g);
    });
    r.forEach((g, n) => {
      e.includes(n) || g.unmount();
    }), this.children = h;
  }
  performRebuild() {
    this.widget.updateRenderObject(this._renderObject);
  }
  visitChildren(t) {
    this.children.forEach(t);
  }
}
const Qt = Hs;
class It extends zt {
  constructor({ children: t = [] }) {
    super();
    o(this, "children");
    this.children = t;
  }
  createElement() {
    return new Qt(this);
  }
  createRenderObject() {
    throw { message: "not implemented createRenderObject" };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateRenderObject(t) {
    throw { message: "not implemented updatedRenderObject" };
  }
}
class Ts extends It {
  constructor({ app: s }) {
    super({ children: [s] });
  }
  createRenderObject() {
    return new Cs();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateRenderObject(s) {
  }
}
class Fe {
  constructor({
    view: s,
    document: t = document,
    window: e = window,
    ssrSize: r = C.zero
  }) {
    o(this, "root");
    o(this, "owner");
    o(this, "viewSize");
    this.viewSize = r, this.owner = new Ms({ view: s, document: t, window: e });
  }
  runApp(s) {
    return this.root = new Ts({
      app: s
    }).createElement(), this.root.mount(void 0), this.draw(), this.owner.view.innerHTML;
  }
  setConfig({
    document: s,
    window: t,
    view: e
  }) {
    s && (this.owner.document = s), t && (this.owner.window = t), e && (this.owner.view = e);
  }
  onMount({
    view: s,
    resizeTarget: t
  }) {
    s && (this.owner.view = s), this.owner.window = window, this.owner.document = document, t && this.observeCanvasSize(t);
  }
  observeCanvasSize(s) {
    const t = (r) => {
      const { width: h, height: g } = r.target.getBoundingClientRect();
      this.owner.view.setAttribute("width", `${h}`), this.owner.view.setAttribute("height", `${g}`), this.viewSize = new C({ width: h, height: g });
    };
    new ResizeObserver((r) => {
      const h = r[0];
      t(h), this.draw();
    }).observe(s);
  }
  draw() {
    this.viewSize.width === 0 || this.viewSize.height === 0 || (this.layout(), this.paint());
  }
  rebuild() {
    this.root.children[0].rebuild();
  }
  layout() {
    this.root.renderObject.layout(W.tight(this.viewSize));
  }
  paint() {
    this.root.renderObject.paint(this.owner.paintContext, k.zero());
  }
}
class Ms {
  constructor({
    document: s,
    window: t,
    view: e
  }) {
    o(this, "document");
    o(this, "window");
    o(this, "view");
    this.document = s, this.window = t, this.view = e;
  }
  setConfig({
    document: s,
    window: t,
    view: e
  }) {
    this.document = s, this.window = t, this.view = e;
  }
  get paintContext() {
    const { document: s, view: t } = this;
    return {
      createSvgEl(e) {
        return s.createElementNS(
          "http://www.w3.org/2000/svg",
          e
        );
      },
      setId(e, r) {
        e.setAttribute("data-render-id", r);
      },
      appendSvgEl(e) {
        t.appendChild(e);
      },
      findSvgEl(e) {
        return t.querySelector(
          `[data-render-id="${e}"]`
        );
      }
    };
  }
}
class Ps extends At {
  constructor(t) {
    super(t);
    o(this, "child");
    o(this, "widget");
    this.widget = t;
  }
  mount(t) {
    super.mount(t), this._firstBuild();
  }
  update(t) {
    super.update(t), this.rebuild();
  }
  initState() {
    this.widget.initState(this);
  }
  build() {
    return this.widget.build(this);
  }
  _firstBuild() {
    this.performRebuild();
  }
  performRebuild() {
    this.initState();
    const t = this.build();
    this.child = this.updateChild(this.child, t);
  }
  visitChildren(t) {
    t(this.child);
  }
}
class Jt extends zt {
  constructor({
    child: t,
    providerKey: e,
    value: r
  }) {
    super();
    o(this, "providerKey");
    o(this, "value");
    o(this, "child");
    this.child = t, this.providerKey = e, this.value = r;
  }
  static of(t, e) {
    let r = e.parent;
    for (; r != null; ) {
      const h = r;
      if (r = h.parent, h instanceof Xt && h.providerKey === t)
        return h.value;
    }
    throw { message: "can not find requested provider value" };
  }
  createElement() {
    return new Xt(this);
  }
}
class Xt extends At {
  constructor(t) {
    super(t);
    o(this, "widget");
    o(this, "child");
    this.widget = t;
  }
  get providerKey() {
    return this.widget.providerKey;
  }
  get value() {
    return this.widget.value;
  }
  visitChildren(t) {
    t(this.child);
  }
  mount(t) {
    super.mount(t), this.child = this.inflateWidget(this.widget.child);
  }
  update(t) {
    super.update(t), this.performRebuild();
  }
  performRebuild() {
    this.child = this.updateChild(this.child, this.child.widget);
  }
}
function Bs(a) {
  return new Jt(a);
}
Bs.of = Jt.of;
class $t extends ct {
}
class De extends ct {
}
class Z extends ct {
  get child() {
    return this.children[0];
  }
  preformLayout() {
    this.child == null ? this.size = this.computeSizeForNoChild(this.constraints) : (this.child.layout(this.constraints), this.size = this.constraints.constrain(this.child.size));
  }
  computeSizeForNoChild(s) {
    return s.constrain(C.zero);
  }
  getIntrinsicWidth(s) {
    var t;
    return ((t = this.child) == null ? void 0 : t.getIntrinsicWidth(s)) || 0;
  }
  getIntrinsicHeight(s) {
    var t;
    return ((t = this.child) == null ? void 0 : t.getIntrinsicHeight(s)) || 0;
  }
}
class Ct extends Z {
  constructor({
    alignment: t = I.center,
    textDirection: e
  }) {
    super({
      isPainter: !1
    });
    o(this, "alignment");
    o(this, "textDirection");
    this.alignment = t, this.textDirection = e;
  }
  get resolvedAlignment() {
    return this.alignment.resolve(this.textDirection);
  }
  alignChild() {
    if (this.child == null)
      throw Error("child must not be null");
    if (this.resolvedAlignment == null)
      throw Error("resolved alignment must not be null");
    this.child.offset = this.resolvedAlignment.alongOffset(
      k.raw({
        x: this.size.width - this.child.size.width,
        y: this.size.height - this.child.size.height
      })
    );
  }
}
class Vt extends zt {
  createElement() {
    return new Ps(this);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  initState(s) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(s) {
    throw { message: "not implemented" };
  }
}
class Le extends At {
}
class Nt extends It {
}
class N extends It {
  constructor({ child: t } = {}) {
    super({ children: [] });
    o(this, "_child");
    this.child = t;
  }
  set child(t) {
    this._child = t, t ? this.children[0] = t : this.children;
  }
  get child() {
    return this._child;
  }
  createRenderObject() {
    return new Z({ isPainter: !0 });
  }
}
class Ht extends N {
  constructor({ child: t, clipper: e }) {
    super({ child: t });
    o(this, "clipper");
    this.clipper = e;
  }
  createRenderObject() {
    return new Os({ clipper: this.clipper });
  }
  updateRenderObject(t) {
    t.clipper = this.clipper;
  }
}
class Os extends Z {
  constructor({ clipper: t }) {
    super({ isPainter: !0 });
    o(this, "clipper");
    this.clipper = t;
  }
  getChildClipId(t) {
    return this.id;
  }
  performPaint({ clipPath: t }) {
    const e = t.getElementsByTagName("path")[0], r = this.clipper(this.size).getD();
    e.setAttribute("d", r);
  }
  createDefaultSvgEl({ createSvgEl: t }) {
    const e = t("clipPath");
    e.setAttribute("id", this.id);
    const r = t("path");
    return r.setAttribute("stroke-width", "0"), e.appendChild(r), {
      clipPath: e
    };
  }
}
function dt({
  child: a,
  clipper: s,
  clipped: t = !0
}) {
  return t ? new Ht({
    child: a,
    clipper: (e) => new U().addRect(s(e))
  }) : a;
}
let Fs = class extends N {
  constructor({
    flex: t = 1,
    child: e,
    fit: r = "loose"
  } = {}) {
    super({ child: e });
    o(this, "flex");
    o(this, "fit");
    if (t < 0)
      throw { message: "flex must not be under zero" };
    this.flex = t, this.fit = r;
  }
  createRenderObject() {
    return new Ft({ flex: this.flex, fit: this.fit });
  }
  updateRenderObject(t) {
    t.flex = this.flex, t.fit = this.fit;
  }
};
class Ft extends Z {
  constructor({ flex: t, fit: e }) {
    super({ isPainter: !1 });
    o(this, "flex");
    o(this, "fit");
    this.flex = t, this.fit = e;
  }
}
let Ds = class extends Nt {
  constructor({
    children: t,
    direction: e,
    mainAxisAlignment: r = "start",
    crossAxisAlignment: h = "center",
    verticalDirection: g = "down",
    mainAxisSize: n = "max"
  }) {
    super({ children: t });
    o(this, "direction");
    o(this, "mainAxisAlignment");
    o(this, "crossAxisAlignment");
    o(this, "verticalDirection");
    o(this, "mainAxisSize");
    this.direction = e, this.mainAxisAlignment = r, this.crossAxisAlignment = h, this.verticalDirection = g, this.mainAxisSize = n;
  }
  createRenderObject() {
    return new Ls({
      direction: this.direction,
      mainAxisAlignment: this.mainAxisAlignment,
      crossAxisAlignment: this.crossAxisAlignment,
      verticalDirection: this.verticalDirection,
      mainAxisSize: this.mainAxisSize
    });
  }
  updateRenderObject(t) {
    t.direction = this.direction, t.mainAxisAlignment = this.mainAxisAlignment, t.crossAxisAlignment = this.crossAxisAlignment, t.verticalDirection = this.verticalDirection, t.mainAxisSize = this.mainAxisSize;
  }
};
class Ls extends $t {
  constructor({
    direction: t,
    mainAxisAlignment: e,
    crossAxisAlignment: r,
    verticalDirection: h,
    mainAxisSize: g
  }) {
    super({ isPainter: !1 });
    o(this, "direction");
    o(this, "mainAxisAlignment");
    o(this, "crossAxisAlignment");
    o(this, "verticalDirection");
    o(this, "mainAxisSize");
    this.direction = t, this.mainAxisAlignment = e, this.crossAxisAlignment = r, this.verticalDirection = h, this.mainAxisSize = g;
  }
  get mainAxisSizeName() {
    return this.direction === "horizontal" ? "width" : "height";
  }
  get crossAxisSizeName() {
    return this.direction === "horizontal" ? "height" : "width";
  }
  get minMainAxisSizeName() {
    return this.direction === "horizontal" ? "minWidth" : "minHeight";
  }
  get maxMainAxisSizeName() {
    return this.direction === "horizontal" ? "maxWidth" : "maxHeight";
  }
  get minCrossAxisSizeName() {
    return this.direction === "horizontal" ? "minHeight" : "minWidth";
  }
  get maxCrossAxisSizeName() {
    return this.direction === "horizontal" ? "maxHeight" : "maxWidth";
  }
  preformLayout() {
    let t = 0, [e, r, h] = [
      0,
      0,
      0
    ];
    const g = this.verticalDirection === "down" ? this.children : [...this.children].reverse();
    g.forEach((v) => {
      v.layout(this.constraints);
      const x = v instanceof Ft ? v.flex : 0;
      t += x, x === 0 && (e += v.size[this.mainAxisSizeName]), r = this.crossAxisAlignment === "stretch" ? this.constraints.getMax(this.crossAxisSizeName) : Math.max(r, v.size[this.crossAxisSizeName]);
    });
    const n = (this.constraints.getMax(this.mainAxisSizeName) - e) / t;
    g.forEach((v) => {
      let x;
      if (!(v instanceof Ft))
        x = this.getNonFlexItemConstraint(r);
      else {
        const y = v.flex * n;
        x = this.getFlexItemConstraint(
          y,
          v.fit
        );
      }
      v.layout(x.enforce(this.constraints));
    }), this.size = this.constraints.constrain(
      new C({
        [this.mainAxisSizeName]: this.mainAxisSize === "max" ? this.constraints.getMax(this.mainAxisSizeName) : g.map((v) => v.size[this.mainAxisSizeName]).reduce((v, x) => v + x),
        [this.crossAxisSizeName]: r
      })
    );
    const u = this.getChildOffsetsOnMainAxis(
      g.map(({ size: v }) => v[this.mainAxisSizeName])
    );
    g.forEach((v, x) => {
      const [m, y] = this.direction === "horizontal" ? ["x", "y"] : ["y", "x"];
      v.offset[m] = u[x], v.offset[y] = this.getChildOffsetOnCrossAxis(
        v.size[this.crossAxisSizeName]
      );
    });
  }
  getNonFlexItemConstraint(t) {
    let e;
    switch (this.crossAxisAlignment) {
      case "stretch":
        e = W.tightFor({
          [this.crossAxisSizeName]: t
        });
        break;
      default:
        e = this.constraints;
    }
    return e.enforce(this.constraints);
  }
  getFlexItemConstraint(t, e) {
    return new W({
      [this.minCrossAxisSizeName]: this.crossAxisAlignment === "stretch" ? this.constraints[this.maxCrossAxisSizeName] : 0,
      [this.maxCrossAxisSizeName]: this.constraints[this.maxCrossAxisSizeName],
      [this.maxMainAxisSizeName]: t,
      [this.minMainAxisSizeName]: e === "tight" ? t : 0
    });
  }
  getChildOffsetsOnMainAxis(t) {
    let e = [];
    const r = (g, n) => g + n, h = this.size[this.mainAxisSizeName] - t.reduce(r, 0);
    switch (this.mainAxisAlignment) {
      case "start":
        e = this._getChildOffsetsOnMainAxis({
          startOffset: 0,
          additionalSpace: 0,
          childMainAxisValues: t
        });
        break;
      case "end":
        e = this._getChildOffsetsOnMainAxis({
          startOffset: h,
          additionalSpace: 0,
          childMainAxisValues: t
        });
        break;
      case "spaceAround":
        const g = h / t.length;
        e = this._getChildOffsetsOnMainAxis({
          startOffset: g / 2,
          additionalSpace: g,
          childMainAxisValues: t
        });
        break;
      case "spaceBetween":
        e = this._getChildOffsetsOnMainAxis({
          startOffset: 0,
          additionalSpace: h / (t.length - 1),
          childMainAxisValues: t
        });
        break;
      case "spaceEvenly":
        const n = h / (t.length + 1);
        e = this._getChildOffsetsOnMainAxis({
          startOffset: n,
          additionalSpace: n,
          childMainAxisValues: t
        });
        break;
      case "center":
        e = this._getChildOffsetsOnMainAxis({
          startOffset: h / 2,
          additionalSpace: 0,
          childMainAxisValues: t
        });
        break;
      default:
        throw new Error(
          `this mainAixsAlignment(${this.mainAxisAlignment}) is not supported yet`
        );
    }
    return e;
  }
  _getChildOffsetsOnMainAxis({
    startOffset: t,
    childMainAxisValues: e,
    additionalSpace: r
  }) {
    const h = [];
    let g = t;
    return e.forEach((n) => {
      h.push(g), g += n + r;
    }), h;
  }
  getChildOffsetOnCrossAxis(t) {
    const e = this.size[this.crossAxisSizeName];
    let r;
    switch (this.crossAxisAlignment) {
      case "center":
        r = (e - t) / 2;
        break;
      case "start":
        r = 0;
        break;
      case "end":
        r = e - t;
        break;
      case "stretch":
        r = 0;
        break;
    }
    return r;
  }
  getIntrinsicHeight(t) {
    const e = (g, n) => g + n, r = (g, n) => Math.max(g, n), h = this.children.map(
      (g) => g.getIntrinsicHeight(t)
    );
    return this.direction === "horizontal" ? h.reduce(r, 0) : h.reduce(e, 0);
  }
  getIntrinsicWidth(t) {
    const e = (g, n) => g + n, r = (g, n) => Math.max(g, n), h = this.children.map(
      (g) => g.getIntrinsicWidth(t)
    );
    return this.direction === "vertical" ? h.reduce(r, 0) : h.reduce(e, 0);
  }
}
function ts({
  children: a,
  mainAxisAlignment: s = "start",
  crossAxisAlignment: t = "center",
  direction: e,
  clipped: r = !1,
  verticalDirection: h = "down",
  mainAxisSize: g = "max"
}) {
  return dt({
    clipped: r,
    clipper: (n) => E.fromLTWH({
      left: 0,
      top: 0,
      width: n.width,
      height: n.height
    }),
    child: new Ds({
      children: a,
      direction: e,
      verticalDirection: h,
      mainAxisSize: g,
      mainAxisAlignment: s,
      crossAxisAlignment: t
    })
  });
}
function Ue({
  children: a,
  mainAxisAlignment: s,
  crossAxisAlignment: t,
  verticalDirection: e,
  mainAxisSize: r
}) {
  return ts({
    children: a,
    direction: "vertical",
    mainAxisAlignment: s,
    crossAxisAlignment: t,
    verticalDirection: e,
    mainAxisSize: r
  });
}
function $e({
  children: a,
  mainAxisAlignment: s,
  crossAxisAlignment: t,
  verticalDirection: e,
  mainAxisSize: r
}) {
  return ts({
    children: a,
    direction: "horizontal",
    mainAxisAlignment: s,
    crossAxisAlignment: t,
    verticalDirection: e,
    mainAxisSize: r
  });
}
function ks({ fontSize: a }) {
  return a;
}
const bt = {
  fontFamily: "serif",
  fontSize: 16,
  fontWeight: "normal",
  fontColor: "black"
};
class Es {
  constructor({
    text: s,
    textAlign: t = _t.start,
    textDirection: e,
    textScaleFactor: r = 1,
    maxLines: h,
    ellipsis: g,
    textWidthBasis: n = xt.parent
  }) {
    o(this, "text");
    o(this, "textAlign");
    o(this, "textDirection");
    o(this, "ellipsis");
    o(this, "textScaleFactor");
    o(this, "maxLines");
    o(this, "textWidthBasis");
    o(this, "paragraph");
    this.text = s, this.textAlign = t, this.textDirection = e, this.textScaleFactor = r, this.maxLines = h, this.ellipsis = g, this.textWidthBasis = n;
  }
  get plainText() {
    var s;
    return ((s = this.text) == null ? void 0 : s.toPlainText()) || "";
  }
  get width() {
    return this.paragraph == null ? 0 : this.paragraph.width;
  }
  get height() {
    return this.paragraph == null ? 0 : this.paragraph.height;
  }
  get intrinsicWidth() {
    return this.paragraph == null ? 0 : this.paragraph.intrinsicWidth;
  }
  get intrinsicHeight() {
    return this.paragraph == null ? 0 : this.paragraph.intrinsicHeight;
  }
  get longestLine() {
    return this.paragraph == null ? 0 : this.paragraph.longestLine;
  }
  paint(s, { createSvgEl: t }) {
    this.resetText(s), $(this.paragraph != null), this.paragraph.lines.forEach((e) => {
      e.spanBoxes.forEach(
        ({ offset: r, fontFamily: h, content: g, fontSize: n, fontWeight: u, color: v }) => {
          const x = t("tspan");
          x.setAttribute("x", `${r.x}`), x.setAttribute("y", `${r.y}`), x.setAttribute("text-anchor", "start"), x.setAttribute("alignment-baseline", "text-before-edge"), x.setAttribute("fill", v), x.setAttribute("font-size", `${n}`), x.setAttribute("font-family", `${h}`), x.setAttribute("font-weight", u), x.textContent = g, s.appendChild(x);
        }
      );
    });
  }
  createParagraph(s) {
    return new Us(s ?? null, {
      textAlign: this.textAlign,
      ellipsis: this.ellipsis,
      textDirection: this.textDirection || J.ltr
    });
  }
  resetText(s) {
    for (; s.firstChild; )
      s.removeChild(s.firstChild);
  }
  layout({
    minWidth: s = 0,
    maxWidth: t = 1 / 0
  } = {}) {
    this.paragraph = this.createParagraph(this.text), this.layoutParagraph({ minWidth: s, maxWidth: t });
  }
  layoutParagraph({
    minWidth: s = 0,
    maxWidth: t = 1 / 0
  }) {
    if (this.paragraph.layout(t), s !== t) {
      let e;
      switch (this.textWidthBasis) {
        case xt.longestLine:
          e = this.paragraph.longestLine;
          break;
        case xt.parent:
          e = this.intrinsicWidth;
          break;
      }
      e = V.clampDouble(e, s, t), e !== this.paragraph.width && this.paragraph.layout(e);
    }
  }
}
class Us {
  constructor(s, {
    textAlign: t,
    ellipsis: e,
    textDirection: r
  }) {
    o(this, "ellipsis");
    o(this, "source", []);
    o(this, "lines", []);
    o(this, "textDirection");
    o(this, "textAlign");
    // It is only valid after layout call
    o(this, "width", 0);
    this.ellipsis = e, this.textAlign = t, this.textDirection = r, this.build(s);
  }
  build(s) {
    s == null || s.build(this);
  }
  get height() {
    return this.lines.reduce((s, t) => s + t.height, 0);
  }
  get longestLine() {
    return this.lines.reduce((s, t) => Math.max(s, t.width), 0);
  }
  get intrinsicWidth() {
    return this.lines.reduce((s, t) => s + t.width, 0);
  }
  get intrinsicHeight() {
    return this.lines.reduce((s, t) => Math.max(s + t.height), 0);
  }
  layout(s = 1 / 0) {
    this.width = s, this.lines = [];
    let t = new Zt();
    this.source.forEach(
      ({
        content: e,
        fontFamily: r,
        fontSize: h,
        fontStyle: g,
        fontWeight: n,
        color: u,
        height: v
      }) => {
        const x = e.split(/(\s|\n)/);
        let m = "", y = 0;
        const z = ks({ fontSize: h }), d = `${n} ${h}px ${r}`;
        x.forEach((w) => {
          let l = vs({
            text: w,
            font: d
          });
          t.width + y + l > this.width || w === `
` ? (c(), this.addLine(t), t = new Zt(), [" ", `
`].includes(w) ? (y = 0, m = "") : (y = l, m = w)) : (m += w, y += l);
        }), c();
        function c() {
          m && t.addSpanBox(
            new $s({
              content: m,
              fontFamily: r,
              fontSize: h,
              fontStyle: g,
              fontWeight: n,
              color: u,
              height: v,
              size: {
                height: z,
                width: y
              }
            })
          );
        }
      }
    ), this.addLine(t), this.align();
  }
  addLine(s) {
    s.spanBoxes.length !== 0 && this.lines.push(s);
  }
  align() {
    let s = 0;
    this.lines.forEach((t) => {
      t.layout(this.resolvedTextAlign, {
        paragraphWidth: this.width,
        offsetY: s
      }), s += t.height;
    });
  }
  get resolvedTextAlign() {
    return this.textAlign === _t.start ? this.textDirection === J.ltr ? "left" : "right" : this.textAlign === _t.end ? this.textDirection === J.ltr ? "right" : "left" : this.textAlign;
  }
  addText({
    fontFamily: s = bt.fontFamily,
    fontSize: t = bt.fontSize,
    fontWeight: e = bt.fontWeight,
    content: r = "",
    height: h = 1.2,
    fontStyle: g = Kt.normal,
    color: n = bt.fontColor
  }) {
    this.source.push({
      height: h,
      fontFamily: s,
      fontSize: t,
      fontWeight: e,
      content: r,
      color: n,
      fontStyle: g
    });
  }
}
class $s {
  constructor({
    fontFamily: s,
    fontSize: t,
    fontStyle: e,
    fontWeight: r,
    color: h,
    content: g,
    height: n,
    size: u
  }) {
    o(this, "fontSize");
    o(this, "fontFamily");
    o(this, "fontWeight");
    o(this, "fontStyle");
    o(this, "color");
    o(this, "content");
    o(this, "height");
    // this is line height
    o(this, "size");
    o(this, "offset", { x: 0, y: 0 });
    this.fontFamily = s, this.fontStyle = e, this.fontWeight = r, this.color = h, this.content = g, this.height = n, this.size = u, this.fontSize = t;
  }
}
class Zt {
  constructor() {
    o(this, "spanBoxes", []);
  }
  get height() {
    return this.spanBoxes.reduce(
      (s, { size: t, height: e }) => Math.max(s, t.height * e),
      0
    );
  }
  get width() {
    return this.spanBoxes.reduce((s, { size: t }) => s + t.width, 0);
  }
  layout(s, { paragraphWidth: t, offsetY: e }) {
    switch (this.spanBoxes.forEach((r) => {
      r.offset.y = e + this.height - r.size.height;
    }), s) {
      case "left":
        this.alignHorizontally(0);
        break;
      case "right":
        this.alignHorizontally(t - this.width);
        break;
      case "center":
        this.alignHorizontally((t - this.width) / 2);
        break;
    }
  }
  alignHorizontally(s) {
    let t = s;
    this.spanBoxes.forEach((e) => {
      e.offset.x = t, t += e.size.width;
    });
  }
  addSpanBox(s) {
    this.spanBoxes.push(s);
  }
}
let Ns = class extends It {
  constructor({
    text: t,
    textAlign: e = _t.start,
    textDirection: r,
    softWrap: h = !0,
    overflow: g = nt.clip,
    textScaleFactor: n = 1,
    maxLines: u,
    textWidthBasis: v = xt.parent
  }) {
    super({ children: [] });
    o(this, "text");
    o(this, "textAlign");
    o(this, "textDirection");
    o(this, "softWrap");
    o(this, "overflow");
    o(this, "textScaleFactor");
    o(this, "maxLines");
    o(this, "textWidthBasis");
    this.text = t, this.textAlign = e, this.textDirection = r, this.softWrap = h, this.overflow = g, this.textScaleFactor = n, this.maxLines = u, this.textWidthBasis = v;
  }
  createRenderObject() {
    return new js({
      text: this.text,
      textAlign: this.textAlign,
      textDirection: this.textDirection || J.ltr,
      softWrap: this.softWrap,
      overflow: this.overflow,
      textScaleFactor: this.textScaleFactor,
      maxLines: this.maxLines,
      textWidthBasis: this.textWidthBasis
    });
  }
  updateRenderObject(t) {
    t.softWrap = this.softWrap, t.overflow = this.overflow, t.textScaleFactor = this.textScaleFactor, t.maxLines = this.maxLines, t.textWidthBasis = this.textWidthBasis, t.text = this.text, t.textAlign = this.textAlign, t.textDirection = this.textDirection || J.ltr;
  }
};
class js extends ct {
  constructor({
    text: t,
    textAlign: e = _t.start,
    textDirection: r,
    softWrap: h = !0,
    overflow: g = nt.clip,
    textScaleFactor: n = 1,
    maxLines: u,
    textWidthBasis: v = xt.parent
  }) {
    super({ isPainter: !0 });
    // text: InlineSpan;
    // textAlign: TextAlign;
    // textDirection?: TextDirection;
    o(this, "softWrap");
    o(this, "overflow");
    // textScaleFactor: number;
    // maxLines?: number;
    // textWidthBasis: TextWidthBasis;
    o(this, "textPainter");
    this.softWrap = h, this.overflow = g, this.textPainter = new Es({
      text: t,
      textAlign: e,
      textDirection: r,
      textScaleFactor: n,
      maxLines: u,
      ellipsis: g == nt.ellipsis ? "…" : void 0,
      textWidthBasis: v
    });
  }
  get text() {
    return this.textPainter.text;
  }
  set text(t) {
    this.textPainter.text = t;
  }
  get textWidthBasis() {
    return this.textPainter.textWidthBasis;
  }
  set textWidthBasis(t) {
    this.textPainter.textWidthBasis = t;
  }
  get textAlign() {
    return this.textPainter.textAlign;
  }
  set textAlign(t) {
    this.textPainter.textAlign = t;
  }
  get textDirection() {
    return this.textPainter.textDirection;
  }
  set textDirection(t) {
    this.textPainter.textDirection;
  }
  get textScaleFactor() {
    return this.textPainter.textScaleFactor;
  }
  set textScaleFactor(t) {
    this.textPainter.textScaleFactor = t;
  }
  get maxLines() {
    return this.textPainter.maxLines;
  }
  set maxLines(t) {
    this.textPainter.maxLines = t;
  }
  performPaint({
    text: t
  }, e) {
    this.textPainter.paint(t, e);
  }
  preformLayout() {
    this.layoutText({
      maxWidth: this.constraints.maxWidth,
      minWidth: this.constraints.minWidth
    }), this.size = this.constraints.constrain(
      new C({
        width: this.textPainter.width,
        height: this.textPainter.height
      })
    );
  }
  layoutText({
    maxWidth: t = 1 / 0,
    minWidth: e = 0
  }) {
    const r = this.softWrap || this.overflow === nt.ellipsis;
    this.textPainter.layout({
      minWidth: e,
      maxWidth: r ? t : 1 / 0
    });
  }
  getIntrinsicHeight() {
    return this.textPainter.layout(), this.textPainter.intrinsicHeight;
  }
  getIntrinsicWidth() {
    return this.textPainter.layout(), this.textPainter.intrinsicWidth;
  }
  createDefaultSvgEl({ createSvgEl: t }) {
    return {
      text: t("text")
    };
  }
}
function Ys({ overflow: a = nt.visible, ...s }) {
  return dt({
    clipped: a === nt.clip,
    clipper: (t) => E.fromLTWH({ left: 0, top: 0, width: t.width, height: t.width }),
    child: new Ns({
      overflow: a,
      ...s
    })
  });
}
function Xs(a, s = {}) {
  return new ss({ ...s, data: a });
}
Xs.rich = (a, s = {}) => new ss({ ...s, textSpan: a });
class ss extends Vt {
  constructor({
    data: t,
    textSpan: e,
    softWrap: r,
    textAlign: h,
    textDirection: g,
    textWidthBasis: n,
    style: u,
    overflow: v
  }) {
    super();
    o(this, "data");
    //This will be null if a data is provided instead
    o(this, "textSpan");
    o(this, "style");
    o(this, "textAlign");
    o(this, "textDirection");
    o(this, "softWrap");
    o(this, "textWidthBasis");
    o(this, "overflow");
    this.softWrap = r, this.textAlign = h, this.textDirection = g, this.textWidthBasis = n, this.style = u, this.overflow = v, this.data = t, this.textSpan = e;
  }
  //DefaultTextSTyle.of(context) 추가할 예정
  build(t) {
    return Ys({
      textAlign: this.textAlign ?? _t.start,
      textDirection: this.textDirection,
      softWrap: this.softWrap,
      overflow: this.overflow,
      textWidthBasis: this.textWidthBasis,
      text: new Ss({
        style: this.style,
        text: this.data,
        children: this.textSpan && [this.textSpan]
      })
    });
  }
}
function Zs({
  child: a,
  flex: s = 1,
  fit: t = "loose"
} = {}) {
  return new Fs({
    child: a,
    fit: t,
    flex: s
  });
}
function es({ flex: a, child: s }) {
  return Zs({
    flex: a,
    child: s,
    fit: "tight"
  });
}
class Gs extends N {
  constructor({
    child: t,
    constraints: e
  }) {
    super({ child: t });
    o(this, "constraints");
    this.constraints = e;
  }
  createRenderObject() {
    return new Ks({ constraint: this.constraints });
  }
  updateRenderObject(t) {
    t.constraints = this.constraints;
  }
}
class Ks extends Z {
  constructor({ constraint: t }) {
    super({ isPainter: !1 });
    o(this, "additionalConstraint");
    this.additionalConstraint = t;
  }
  preformLayout() {
    this.constraints = this.additionalConstraint.enforce(this.constraints);
    let t = C.zero;
    this.child != null && (this.child.layout(this.constraints), t = this.child.size), this.size = this.constraints.constrain(t);
  }
  getIntrinsicHeight(t) {
    if (this.additionalConstraint.hasBoundedHeight && this.additionalConstraint.hasTightHeight)
      return this.additionalConstraint.minHeight;
    const e = super.getIntrinsicHeight(t);
    return this.additionalConstraint.hasInfiniteHeight ? e : this.additionalConstraint.constrainHeight(e);
  }
  getIntrinsicWidth(t) {
    if (this.additionalConstraint.hasBoundedWidth && this.additionalConstraint.hasTightWidth)
      return this.additionalConstraint.minWidth;
    const e = super.getIntrinsicWidth(t);
    return this.additionalConstraint.hasInfiniteWidth ? e : this.additionalConstraint.constrainWidth(e);
  }
}
function Dt({
  child: a,
  constraints: s
}) {
  return new Gs({
    child: a,
    constraints: s
  });
}
function rt({
  width: a,
  height: s,
  child: t
}) {
  return Dt({
    child: t,
    constraints: W.tightFor({ width: a, height: s })
  });
}
rt.shrink = ({
  child: a,
  width: s = 0,
  height: t = 0
} = {}) => rt({ width: s, height: t, child: a });
rt.expand = ({
  child: a,
  width: s = 1 / 0,
  height: t = 1 / 0
} = {}) => rt({ width: 1 / 0, height: 1 / 0, child: a });
rt.fromSize = ({ child: a, size: s } = {}) => rt({ width: s == null ? void 0 : s.width, height: s == null ? void 0 : s.height, child: a });
rt.square = ({
  child: a,
  dimension: s
} = {}) => rt({ width: s, height: s, child: a });
let rs = class extends N {
  constructor({
    child: t,
    widthFactor: e,
    heightFactor: r,
    alignment: h = I.center
  }) {
    super({ child: t });
    o(this, "widthFactor");
    o(this, "heightFactor");
    o(this, "alignment");
    this.alignment = h, this.widthFactor = e, this.heightFactor = r;
  }
  createRenderObject() {
    return new Qs({
      alignment: this.alignment,
      widthFactor: this.widthFactor,
      heightFactor: this.heightFactor
    });
  }
  updateRenderObject(t) {
    t.alignment = this.alignment, t.widthFactor = this.widthFactor, t.heightFactor = this.heightFactor;
  }
};
class Qs extends Ct {
  constructor({
    alignment: t,
    widthFactor: e,
    heightFactor: r
  }) {
    super({ alignment: t, textDirection: J.ltr });
    o(this, "widthFactor");
    o(this, "heightFactor");
    if (e != null && e < 0)
      throw new Error("widthFactor must be greater than zero");
    if (r != null && r < 0)
      throw new Error("heightFactor must be greater than zero");
    this.widthFactor = e, this.heightFactor = r;
  }
  preformLayout() {
    const t = this.constraints, e = this.widthFactor != null || t.maxWidth == 1 / 0, r = this.heightFactor != null || t.maxHeight == 1 / 0;
    this.child != null ? (this.child.layout(t.loosen()), this.size = t.constrain(
      new C({
        width: e ? this.child.size.width * (this.widthFactor ?? 1) : 1 / 0,
        height: r ? this.child.size.height * (this.heightFactor ?? 1) : 1 / 0
      })
    ), this.alignChild()) : this.size = t.constrain(
      new C({
        width: e ? 0 : 1 / 0,
        height: r ? 0 : 1 / 0
      })
    );
  }
}
function is({
  child: a,
  alignment: s = I.center,
  widthFactor: t,
  heightFactor: e
}) {
  return new rs({
    child: a,
    alignment: s,
    widthFactor: t,
    heightFactor: e
  });
}
let Js = class extends N {
  constructor({ color: t, child: e }) {
    super({ child: e });
    o(this, "color");
    this.color = t;
  }
  createRenderObject() {
    return new Vs({ color: this.color });
  }
  updateRenderObject(t) {
    t.color = this.color;
  }
};
class Vs extends Z {
  constructor({ color: t }) {
    super({ isPainter: !0 });
    o(this, "color");
    this.color = t;
  }
  performPaint({ rect: t }) {
    t.setAttribute("fill", this.color), t.setAttribute("width", `${this.size.width}`), t.setAttribute("height", `${this.size.height}`);
  }
  createDefaultSvgEl({ createSvgEl: t }) {
    return {
      rect: t("rect")
    };
  }
}
function te({
  child: a,
  color: s
}) {
  return new Js({
    child: a,
    color: s
  });
}
let se = class extends N {
  constructor({
    decoration: t,
    child: e
  }) {
    super({ child: e });
    o(this, "decoration");
    this.decoration = t;
  }
  createRenderObject() {
    return new ee({ decoration: this.decoration });
  }
  updateRenderObject(t) {
    t.decoration = this.decoration;
  }
};
class ee extends Z {
  constructor({ decoration: t }) {
    super({ isPainter: !0 });
    o(this, "decoration");
    this.decoration = t;
  }
  performPaint(t) {
    this.decoration.createBoxPainter().paint(t, this.size);
  }
  createDefaultSvgEl({ createSvgEl: t }) {
    return {
      box: t("path"),
      topBorder: t("path"),
      leftBorder: t("path"),
      rightBorder: t("path"),
      bottomBorder: t("path")
    };
  }
}
function Gt({
  decoration: a,
  child: s
}) {
  return new se({ decoration: a, child: s });
}
class re extends N {
  constructor({
    child: t,
    maxHeight: e = 1 / 0,
    maxWidth: r = 1 / 0
  }) {
    super({ child: t });
    o(this, "maxWidth");
    o(this, "maxHeight");
    this.maxHeight = e, this.maxWidth = r;
  }
  createRenderObject() {
    return new ie({
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth
    });
  }
  updateRenderObject(t) {
    t.maxHeight = this.maxHeight, t.maxWidth = this.maxWidth;
  }
}
class ie extends Z {
  constructor({
    maxHeight: t = 1 / 0,
    maxWidth: e = 1 / 0
  }) {
    super({ isPainter: !1 });
    o(this, "maxWidth");
    o(this, "maxHeight");
    this.maxHeight = t, this.maxWidth = e;
  }
  preformLayout() {
    if (this.child == null) {
      this.size = this.limitConstraints(this.constraints).constrain(C.zero);
      return;
    }
    this.child.layout(this.limitConstraints(this.constraints)), this.size = this.child.size;
  }
  limitConstraints(t) {
    return new W({
      minHeight: t.minHeight,
      minWidth: t.minWidth,
      maxWidth: t.hasBoundedWidth ? t.maxWidth : t.constrainWidth(this.maxWidth),
      maxHeight: t.hasBoundedHeight ? t.maxHeight : t.constrainHeight(this.maxHeight)
    });
  }
}
function he({
  maxHeight: a = 1 / 0,
  maxWidth: s = 1 / 0,
  child: t
}) {
  return new re({
    maxHeight: a,
    maxWidth: s,
    child: t
  });
}
let ge = class extends N {
  constructor({
    padding: t = et.all(0),
    child: e
  }) {
    super({ child: e });
    o(this, "padding");
    this.padding = t;
  }
  createRenderObject() {
    return new oe({
      padding: this.padding
    });
  }
  updateRenderObject(t) {
    t.padding = this.padding;
  }
};
class oe extends Z {
  constructor({ padding: t }) {
    super({ isPainter: !1 });
    o(this, "padding");
    this.padding = t;
  }
  preformLayout() {
    if (this.child == null)
      return;
    const { top: t, left: e, right: r, bottom: h } = this.padding, g = this.constraints.deflate(this.padding);
    this.child.layout(g);
    const { size: n } = this.child;
    this.size = this.constraints.constrain(
      new C({
        width: n.width + e + r,
        height: n.height + t + h
      })
    ), this.child.offset = new k({ x: e, y: t });
  }
  getIntrinsicWidth(t) {
    return super.getIntrinsicWidth(t) + this.padding.horizontal;
  }
  getIntrinsicHeight(t) {
    return super.getIntrinsicHeight(t) + this.padding.vertical;
  }
}
function Lt({
  padding: a = et.all(0),
  child: s
}) {
  if (s instanceof es)
    throw { message: "Padding must not have a Expanded Widget" };
  return new ge({ padding: a, child: s });
}
let Tt = class gt extends N {
  constructor({
    child: t,
    transform: e,
    origin: r,
    alignment: h
  }) {
    super({ child: t });
    o(this, "origin");
    o(this, "alignment");
    o(this, "transform");
    this.transform = e, this.origin = r, this.alignment = h;
  }
  static rotate({
    angle: t,
    origin: e,
    alignment: r = I.center,
    child: h
  }) {
    return new gt({
      child: h,
      origin: e,
      alignment: r,
      transform: gt._computeRotation(t)
    });
  }
  static translate({ child: t, offset: e }) {
    return new gt({
      child: t,
      transform: L.translationValues(e.x, e.y, 0),
      origin: void 0,
      alignment: void 0
    });
  }
  static scale({
    child: t,
    scale: e,
    scaleX: r,
    scaleY: h,
    origin: g,
    alignment: n = I.center
  }) {
    return $(
      !(e == null && r == null && h == null),
      "At least one of 'scale', 'scaleX' and 'scaleY' is required to be non-null"
    ), $(
      e == null || r == null && h == null,
      "If 'scale' is non-null then 'scaleX' and 'scaleY' must be left null"
    ), new gt({
      child: t,
      origin: g,
      alignment: n,
      transform: L.diagonal3Values(
        e ?? r ?? 1,
        e ?? h ?? 1,
        1
      )
    });
  }
  createRenderObject() {
    return new ae({
      transform: this.transform,
      origin: this.origin,
      alignment: this.alignment
    });
  }
  updateRenderObject(t) {
    t.transform = this.transform, t.origin = this.origin, t.alignment = this.alignment;
  }
  static _computeRotation(t) {
    if (t == 0)
      return L.identity();
    const e = Math.sin(t);
    if (e == 1)
      return gt._createZRotation(1, 0);
    if (e == -1)
      return gt._createZRotation(-1, 0);
    const r = Math.cos(t);
    return r == -1 ? gt._createZRotation(0, -1) : gt._createZRotation(e, r);
  }
  static _createZRotation(t, e) {
    const r = L.zero();
    return r.storage[0] = e, r.storage[1] = t, r.storage[4] = -t, r.storage[5] = e, r.storage[10] = 1, r.storage[15] = 1, r;
  }
};
class ae extends Z {
  constructor({
    origin: t,
    alignment: e,
    transform: r,
    textDirection: h = J.ltr
  }) {
    super({ isPainter: !1 });
    o(this, "origin");
    o(this, "alignment");
    o(this, "transform");
    o(this, "textDirection");
    this.transform = r, this.origin = t, this.alignment = e, this.textDirection = h;
  }
  get _effectiveTransform() {
    var n;
    const t = (n = this.alignment) == null ? void 0 : n.resolve(this.textDirection), e = (t == null ? void 0 : t.alongSize(this.size)) ?? {
      x: 0,
      y: 0
    }, r = this.origin ?? { x: 0, y: 0 }, h = {
      x: r.x + e.x,
      y: r.y + e.y
    }, g = L.identity();
    return g.translate(h.x, h.y), g.multiply(this.transform), g.translate(-h.x, -h.y), g;
  }
  getChildMatrix4(t) {
    return t.multiplied(this._effectiveTransform);
  }
}
function Mt({
  child: a,
  transform: s,
  origin: t,
  alignment: e
}) {
  return new Tt({
    child: a,
    transform: s,
    alignment: e,
    origin: t
  });
}
Mt.rotate = Tt.rotate;
Mt.scale = Tt.scale;
Mt.translate = Tt.translate;
function ne({
  child: a,
  clipper: s,
  clipped: t = !0
}) {
  return t ? new Ht({ child: a, clipper: s }) : a;
}
function Ge({
  padding: a,
  margin: s,
  child: t,
  color: e,
  width: r,
  height: h,
  alignment: g,
  decoration: n,
  constraints: u,
  clipped: v = !1,
  transform: x,
  transformAlignment: m
} = {}) {
  u = r != null || h != null ? (u == null ? void 0 : u.tighten({ width: r, height: h })) ?? W.tightFor({ width: r, height: h }) : u, $(
    e == null || n == null,
    "Color must be null when decoration is defined"
  );
  let y = t;
  y == null && (u == null || !u.isTight) ? y = he({
    maxHeight: 0,
    maxWidth: 0,
    child: Dt({
      constraints: W.expand()
    })
  }) : g != null && (y = is({ child: y, alignment: g }));
  let z;
  return n == null || n.padding == null ? z = a : a == null ? z = n.padding : a.add(n.padding), z != null && (y = Lt({ padding: z, child: y })), e != null && (y = te({
    color: e,
    child: y
  })), v && ($(
    n != null,
    "Decoration must not be null when clipped is true"
  ), y = ne({
    clipper: (d) => n.getClipPath(
      E.fromLTWH({
        width: d.width,
        height: d.height,
        left: 0,
        top: 0
      })
    ),
    clipped: v,
    child: y
  })), (e != null || n != null) && (e != null ? y = Gt({
    decoration: new ps({
      color: e
    }),
    child: y
  }) : y = Gt({
    decoration: n,
    child: y
  })), u != null && (y = Dt({
    child: y,
    constraints: u
  })), s != null && (y = Lt({
    child: y,
    padding: s
  })), x != null && (y = Mt({
    transform: x,
    alignment: m,
    child: y
  })), y;
}
function Ke(a) {
  return new _e(a);
}
class _e extends Vt {
  constructor(t) {
    super();
    o(this, "builder");
    this.builder = t;
  }
  build(t) {
    return this.builder(t);
  }
}
function Qe({
  child: a,
  widthFactor: s,
  heightFactor: t
}) {
  return new rs({
    child: a,
    widthFactor: s,
    heightFactor: t,
    alignment: I.center
  });
}
class ue extends Nt {
  constructor({
    templateColumns: t = [],
    templateRows: e = [],
    autoColumn: r = tt.Fr(1),
    autoRow: h = tt.Fr(1),
    childrenByRow: g
  }) {
    super({ children: g.flat() });
    o(this, "templateRows");
    o(this, "templateColumns");
    o(this, "autoColumn");
    o(this, "autoRow");
    o(this, "columnCounts");
    this.columnCounts = g.map((n) => n.length), this.templateRows = e, this.templateColumns = t, this.autoColumn = r, this.autoRow = h;
  }
  createRenderObject() {
    return new ve({ ...this });
  }
  updateRenderObject(t) {
    t.templateRows = this.templateRows, t.templateColumns = this.templateColumns, t.autoColumn = this.autoColumn, t.autoRow = this.autoRow, t.columnCounts = this.columnCounts;
  }
}
class ve extends $t {
  // describe column count per row, example) [3,3,3,2]
  constructor({
    templateColumns: t,
    templateRows: e,
    autoColumn: r,
    autoRow: h,
    columnCounts: g
  }) {
    super({ isPainter: !1 });
    o(this, "templateRows");
    o(this, "templateColumns");
    o(this, "autoColumn");
    o(this, "autoRow");
    o(this, "columnCounts");
    this.columnCounts = g, this.templateRows = e, this.templateColumns = t, this.autoColumn = r, this.autoRow = h;
  }
  get rowCount() {
    return this.columnCounts.length;
  }
  get columnCount() {
    return this.columnCounts.reduce((t, e) => Math.max(t, e), 0);
  }
  get childrenByRow() {
    let t = 0;
    return this.columnCounts.map((e) => {
      const r = this.children.slice(t, t + e);
      return t += e, r;
    });
  }
  get columns() {
    return Array.from(
      { length: this.columnCount },
      (t, e) => this.templateColumns[e] ?? this.autoColumn
    );
  }
  get rows() {
    return Array.from(
      { length: this.rowCount },
      (t, e) => this.templateRows[e] ?? this.autoRow
    );
  }
  preformLayout() {
    this.size = this.constraints.constrain(C.infinite);
    const t = Array.from(
      { length: this.columnCount },
      () => 0
    ), e = Array.from(
      { length: this.rowCount },
      () => 0
    );
    this.childrenByRow.forEach((c, w) => {
      c.forEach((l, _) => {
        this.columns[_].type === "content-fit" && (t[_] = Math.max(
          l.getIntrinsicWidth(this.constraints.maxHeight),
          t[_]
        )), this.rows[w].type === "content-fit" && (e[w] = Math.max(
          l.getIntrinsicHeight(this.constraints.maxWidth),
          e[w]
        ));
      });
    });
    const r = this.columns.map(
      ({ type: c, value: w }, l) => {
        let _ = 0;
        return c === "content-fit" ? _ = t[l] : c === "px" ? _ = w : c === "percent" && (_ = w / 100 * this.size.width), _;
      }
    ), h = this.rows.map(({ type: c, value: w }, l) => {
      let _ = 0;
      return c === "content-fit" ? _ = e[l] : c === "px" ? _ = w : c === "percent" && (_ = w / 100 * this.size.height), _;
    }), g = (c, w) => c + w, n = this.columns.filter(({ type: c }) => c === "fr").map(({ value: c }) => c).reduce(g, 0), u = r.reduce(g, 0), v = (this.size.width - u) / n, x = this.columns.map(({ type: c, value: w }, l) => {
      let _ = 0;
      return c === "fr" ? _ = w * v : _ = r[l], _;
    }), m = this.rows.filter(({ type: c }) => c === "fr").map(({ value: c }) => c).reduce(g, 0), y = h.reduce(g, 0), z = (this.size.height - y) / m, d = this.rows.map(({ type: c, value: w }, l) => {
      let _ = 0;
      return c === "fr" ? _ = w * z : _ = h[l], _;
    });
    this.childrenByRow.forEach((c, w) => {
      c.forEach((l, _) => {
        const R = new W({
          ...this.constraints,
          maxHeight: d[w],
          maxWidth: x[_]
        });
        l.layout(R), l.offset = new k({
          x: x.slice(0, _).reduce(g, 0),
          y: d.slice(0, w).reduce(g, 0)
        });
      });
    });
  }
}
class tt {
  constructor({
    type: s,
    value: t
  }) {
    o(this, "type");
    o(this, "value");
    this.type = s, this.value = t;
  }
  static Fr(s) {
    return new tt({ value: s, type: "fr" });
  }
  static Px(s) {
    return new tt({ value: s, type: "px" });
  }
  static ContentFit() {
    return new tt({ value: 0, type: "content-fit" });
  }
  // 0 ~ 100
  static Percent(s) {
    return new tt({ value: s, type: "percent" });
  }
  repeat(s) {
    return Array.from({ length: s }, () => this);
  }
}
function Pt({
  childrenByRow: a,
  alignment: s = I.center,
  gap: t = Rt.all(0),
  ...e
}) {
  const r = a.map((h, g) => h.map((n) => n || rt.shrink()).map(
    (n, u) => Lt({
      padding: et.only({
        left: u === 0 ? 0 : t.x,
        top: g === 0 ? 0 : t.y
      }),
      child: n
    })
  ).map((n) => is({ child: n, alignment: s })));
  return new ue({ childrenByRow: r, ...e });
}
Pt.Fr = tt.Fr;
Pt.ContentFit = tt.ContentFit;
Pt.Percent = tt.Percent;
Pt.Px = tt.Px;
class xe extends N {
  constructor({
    top: t,
    bottom: e,
    left: r,
    right: h,
    width: g,
    height: n,
    child: u
  }) {
    super({ child: u });
    o(this, "top");
    o(this, "bottom");
    o(this, "right");
    o(this, "left");
    o(this, "width");
    o(this, "height");
    this.top = t, this.bottom = e, this.left = r, this.right = h, this.width = g, this.height = n;
  }
  createRenderObject() {
    return new kt({
      top: this.top,
      left: this.left,
      right: this.right,
      bottom: this.bottom,
      width: this.width,
      height: this.height
    });
  }
  updateRenderObject(t) {
    t.top = this.top, t.left = this.left, t.bottom = this.bottom, t.right = this.right, t.width = this.width, t.height = this.height;
  }
}
class kt extends Z {
  constructor({
    top: t,
    bottom: e,
    left: r,
    right: h,
    width: g,
    height: n
  }) {
    super({ isPainter: !1 });
    o(this, "top");
    o(this, "bottom");
    o(this, "right");
    o(this, "left");
    o(this, "width");
    o(this, "height");
    this.top = t, this.bottom = e, this.left = r, this.right = h, this.width = g, this.height = n;
  }
  get isPositioned() {
    return this.top != null || this.bottom != null || this.left != null || this.right != null || this.width != null || this.height != null;
  }
  getIntrinsicWidth(t) {
    var e;
    return ((e = this.child) == null ? void 0 : e.getIntrinsicWidth(t)) || 0;
  }
  getIntrinsicHeight(t) {
    var e;
    return ((e = this.child) == null ? void 0 : e.getIntrinsicHeight(t)) || 0;
  }
}
class hs extends Nt {
  constructor({
    children: t,
    fit: e = "loose",
    alignment: r = I.topLeft
  }) {
    super({ children: t });
    o(this, "alignment");
    o(this, "fit");
    this.alignment = r, this.fit = e;
  }
  createRenderObject() {
    return new Bt({
      alignment: this.alignment,
      fit: this.fit
    });
  }
  updateRenderObject(t) {
    t.alignment = this.alignment, t.fit = this.fit;
  }
}
class Bt extends $t {
  constructor({
    fit: t = "loose",
    alignment: e = I.topLeft,
    textDirection: r = J.ltr
  }) {
    super({ isPainter: !1 });
    o(this, "alignment");
    o(this, "fit");
    o(this, "textDirection");
    this.alignment = e, this.fit = t, this.textDirection = r;
  }
  get resolvedAlignment() {
    return this.alignment.resolve(this.textDirection);
  }
  computeSize({ constraints: t }) {
    let e = !1;
    if (this.children.length === 0)
      return t.biggest.isFinite ? t.biggest : t.smallest;
    let [r, h] = [t.minWidth, t.minHeight], g;
    switch (this.fit) {
      case "loose":
        g = t.loosen();
        break;
      case "expand":
        g = W.tight(t.biggest);
        break;
      case "passthrough":
        g = t;
        break;
    }
    this.children.forEach((u) => {
      u instanceof kt && u.isPositioned || (e = !0, u.layout(g), r = Math.max(r, u.size.width), h = Math.max(h, u.size.height));
    });
    let n;
    return e ? (n = new C({ width: r, height: h }), $(n.width === t.constrainWidth(r)), $(n.height === t.constrainHeight(h))) : n = t.biggest, n;
  }
  static layoutPositionedChild({
    child: t,
    alignment: e,
    size: r
  }) {
    $(t.isPositioned, "child must be positioned");
    let h = new W();
    t.left != null && t.right != null ? h = h.tighten({
      width: r.width - (t.left + t.right)
    }) : t.width != null && (h = h.tighten({
      width: t.width
    })), t.top != null && t.bottom != null ? h = h.tighten({
      height: r.height - (t.top + t.bottom)
    }) : t.height != null && (h = h.tighten({
      height: t.height
    })), t.layout(h);
    let g;
    t.left != null ? g = t.left : t.right != null ? g = r.width - t.right - t.size.width : g = e.alongOffset(r.minus(t.size)).x;
    let n;
    t.top != null ? n = t.top : t.bottom != null ? n = r.height - t.bottom - t.size.height : n = e.alongOffset(r.minus(t.size)).y, t.offset = new k({ x: g, y: n });
  }
  preformLayout() {
    this.size = this.computeSize({
      constraints: this.constraints
    }), this.children.forEach((t) => {
      t instanceof kt && t.isPositioned ? Bt.layoutPositionedChild({
        child: t,
        size: this.size,
        alignment: this.resolvedAlignment
      }) : t.offset = this.resolvedAlignment.alongOffset(
        this.size.minus(t.size)
      );
    });
  }
  getIntrinsicWidth(t) {
    return this.children.map((e) => e.getIntrinsicWidth(t)).reduce(V.maxReducer, 0);
  }
  getIntrinsicHeight(t) {
    return this.children.map((e) => e.getIntrinsicHeight(t)).reduce(V.maxReducer, 0);
  }
}
function Je({
  clipped: a = !1,
  children: s,
  alignment: t = I.topLeft,
  fit: e = "loose"
}) {
  return dt({
    clipped: a,
    clipper: (r) => E.fromLTWH({
      left: 0,
      top: 0,
      width: r.width,
      height: r.height
    }),
    child: new hs({ children: s, alignment: t, fit: e })
  });
}
function Ve(a) {
  return new xe(a);
}
function tr({
  child: a,
  clipper: s,
  clipped: t = !0
}) {
  return t ? new Ht({
    child: a,
    clipper: (e) => new U().addOval(s(e))
  }) : a;
}
class Q extends N {
  constructor({
    alignment: t = I.center,
    child: e,
    constraintsTransform: r,
    textDirection: h = J.ltr
  }) {
    super({
      child: e
    });
    o(this, "alignment");
    o(this, "textDirection");
    o(this, "constraintsTransform");
    this.alignment = t, this.textDirection = h, this.constraintsTransform = r;
  }
  createRenderObject() {
    return new we({
      alignment: this.alignment,
      textDirection: this.textDirection,
      constraintsTransform: this.constraintsTransform
    });
  }
  updateRenderObject(t) {
    t.alignment = this.alignment, t.textDirection = this.textDirection, t.constraintsTransform = this.constraintsTransform;
  }
}
o(Q, "unmodified", (t) => t), o(Q, "unconstrained", (t) => new W()), o(Q, "widthUnconstrained", (t) => t.heightConstraints()), o(Q, "heightUnconstrained", (t) => t.widthConstraints()), o(Q, "maxHeightUnconstrained", (t) => t.copyWith({ maxHeight: 1 / 0 })), o(Q, "maxWidthUnconstrained", (t) => t.copyWith({ maxWidth: 1 / 0 })), o(Q, "maxUnconstrained", (t) => t.copyWith({ maxWidth: 1 / 0, maxHeight: 1 / 0 }));
class we extends Ct {
  constructor({
    alignment: t,
    textDirection: e,
    constraintsTransform: r
  }) {
    super({
      alignment: t,
      textDirection: e
    });
    o(this, "constraintsTransform");
    this.constraintsTransform = r;
  }
  getIntrinsicHeight(t) {
    return super.getIntrinsicHeight(
      this.constraintsTransform(new W({ maxWidth: t })).maxWidth
    );
  }
  getIntrinsicWidth(t) {
    return super.getIntrinsicWidth(
      this.constraintsTransform(new W({ maxHeight: t })).maxHeight
    );
  }
  preformLayout() {
    if (this.child == null) {
      this.size = this.constraints.smallest;
      return;
    }
    const t = this.constraintsTransform(this.constraints);
    this.child.layout(t), this.size = this.constraints.constrain(this.child.size), this.alignChild();
  }
}
function st({
  clipped: a = !1,
  alignment: s = I.center,
  textDirection: t = J.ltr,
  constraintsTransform: e,
  child: r
}) {
  return dt({
    clipped: a,
    clipper: (h) => E.fromLTWH({
      left: 0,
      top: 0,
      width: h.width,
      height: h.height
    }),
    child: new Q({
      alignment: s,
      textDirection: t,
      constraintsTransform: e,
      child: r
    })
  });
}
st.heightUnconstrained = Q.heightUnconstrained;
st.maxHeightUnconstrained = Q.maxHeightUnconstrained;
st.maxUnconstrained = Q.maxUnconstrained;
st.maxWidthUnconstrained = Q.maxWidthUnconstrained;
st.unconstrained = Q.unconstrained;
st.unmodified = Q.unmodified;
st.widthUnconstrained = Q.widthUnconstrained;
function sr({
  alignment: a = I.center,
  clipped: s = !1,
  child: t,
  textDirection: e,
  constrainedAxis: r
}) {
  return st({
    alignment: a,
    child: t,
    clipped: s,
    textDirection: e,
    constraintsTransform: function() {
      if (r == null)
        return st.unconstrained;
      switch (r) {
        case "vertical":
          return st.widthUnconstrained;
        case "horizontal":
          return st.heightUnconstrained;
      }
    }()
  });
}
class ye extends N {
  constructor({
    maxHeight: t,
    maxWidth: e,
    minHeight: r,
    minWidth: h,
    alignment: g = I.center,
    child: n
  }) {
    super({ child: n });
    o(this, "minWidth");
    o(this, "maxWidth");
    o(this, "minHeight");
    o(this, "maxHeight");
    o(this, "alignment");
    this.maxHeight = t, this.maxWidth = e, this.minHeight = r, this.minWidth = h, this.alignment = g;
  }
  createRenderObject() {
    return new me({
      alignment: this.alignment,
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      minHeight: this.minHeight,
      minWidth: this.minWidth
    });
  }
  updateRenderObject(t) {
    t.maxHeight = this.maxHeight, t.maxWidth = this.maxWidth, t.minHeight = this.minHeight, t.minWidth = this.minWidth;
  }
}
class me extends Ct {
  constructor({
    maxHeight: t,
    maxWidth: e,
    minHeight: r,
    minWidth: h,
    alignment: g = I.center
  }) {
    super({ alignment: g, textDirection: J.ltr });
    o(this, "minWidth");
    o(this, "maxWidth");
    o(this, "minHeight");
    o(this, "maxHeight");
    this.maxHeight = t, this.maxWidth = e, this.minHeight = r, this.minWidth = h;
  }
  preformLayout() {
    this.size = this.constraints.biggest, this.child != null && (this.child.layout(this.getInnerConstraints(this.constraints)), this.alignChild());
  }
  getInnerConstraints(t) {
    return new W({
      minHeight: this.minHeight ?? t.minHeight,
      maxHeight: this.maxHeight ?? t.maxHeight,
      minWidth: this.minWidth ?? t.minWidth,
      maxWidth: this.maxWidth ?? t.maxWidth
    });
  }
}
function er({
  alignment: a = I.center,
  maxHeight: s,
  maxWidth: t,
  minHeight: e,
  minWidth: r,
  child: h
}) {
  return new ye({
    child: h,
    alignment: a,
    maxHeight: s,
    maxWidth: t,
    minHeight: e,
    minWidth: r
  });
}
function rr({ flex: a } = {}) {
  return es({
    flex: a,
    child: rt.shrink()
  });
}
class le extends N {
  constructor({
    child: t,
    widthFactor: e,
    heightFactor: r,
    alignment: h = I.center
  }) {
    super({ child: t });
    o(this, "widthFactor");
    o(this, "heightFactor");
    o(this, "alignment");
    this.alignment = h, this.widthFactor = e, this.heightFactor = r;
  }
  createRenderObject() {
    return new ce({
      alignment: this.alignment,
      widthFactor: this.widthFactor,
      heightFactor: this.heightFactor
    });
  }
  updateRenderObject(t) {
    t.alignment = this.alignment, t.widthFactor = this.widthFactor, t.heightFactor = this.heightFactor;
  }
}
class ce extends Ct {
  constructor({
    alignment: t,
    widthFactor: e,
    heightFactor: r
  }) {
    super({ alignment: t, textDirection: J.ltr });
    o(this, "widthFactor");
    o(this, "heightFactor");
    if (e != null && e < 0)
      throw new Error("widthFactor must be greater than zero");
    if (r != null && r < 0)
      throw new Error("heightFactor must be greater than zero");
    this.widthFactor = e, this.heightFactor = r;
  }
  getInnerConstraints(t) {
    let { minHeight: e, maxHeight: r, maxWidth: h, minWidth: g } = t;
    if (this.widthFactor != null) {
      const n = this.widthFactor * h;
      g = n, h = n;
    }
    if (this.heightFactor != null) {
      const n = this.heightFactor * r;
      e = n, r = n;
    }
    return new W({
      maxHeight: r,
      maxWidth: h,
      minHeight: e,
      minWidth: g
    });
  }
  preformLayout() {
    this.child != null ? (this.child.layout(this.getInnerConstraints(this.constraints)), this.size = this.constraints.constrain(this.child.size), this.alignChild()) : this.size = this.constraints.constrain(
      this.getInnerConstraints(this.constraints).constrain(C.zero)
    );
  }
  getIntrinsicHeight(t) {
    let e;
    return this.child == null ? e = super.getIntrinsicHeight(t) : e = this.child.getIntrinsicHeight(t * (this.widthFactor ?? 1)), e / (this.heightFactor ?? 1);
  }
  getIntrinsicWidth(t) {
    let e;
    return this.child == null ? e = super.getIntrinsicWidth(t) : e = this.child.getIntrinsicWidth(t * (this.heightFactor ?? 1)), e / (this.widthFactor ?? 1);
  }
}
function ir({
  child: a,
  alignment: s = I.center,
  widthFactor: t,
  heightFactor: e
}) {
  return new le({
    child: a,
    alignment: s,
    widthFactor: t,
    heightFactor: e
  });
}
class ze extends N {
  createRenderObject() {
    return new de({ isPainter: !1 });
  }
  updateRenderObject(s) {
  }
}
class de extends Z {
  preformLayout() {
    if (this.child == null)
      return;
    const s = this.child.getIntrinsicHeight(this.constraints.maxWidth) || 0, t = W.tightFor({ height: s }).enforce(
      this.constraints
    );
    this.child.layout(t), this.size = this.child.size;
  }
}
function hr({ child: a }) {
  return new ze({ child: a });
}
class pe extends N {
  createRenderObject() {
    return new fe({ isPainter: !1 });
  }
  updateRenderObject(s) {
  }
}
class fe extends Z {
  preformLayout() {
    if (this.child == null)
      return;
    const s = this.child.getIntrinsicWidth(this.constraints.maxHeight) || 0, t = W.tightFor({ width: s }).enforce(
      this.constraints
    );
    this.child.layout(t), this.size = this.child.size;
  }
}
function gr({ child: a }) {
  return new pe({ child: a });
}
let be = class extends N {
  constructor({
    child: t,
    translation: e
  }) {
    super({ child: t });
    o(this, "translation");
    this.translation = e;
  }
  createRenderObject() {
    return new qe({
      translation: this.translation
    });
  }
  updateRenderObject(t) {
    t.translation = this.translation;
  }
};
class qe extends Z {
  constructor({ translation: t }) {
    super({ isPainter: !1 });
    o(this, "translation");
    this.translation = t;
  }
  preformLayout() {
    this.child != null && (this.child.layout(this.constraints), this.size = this.child.size, this.child.offset = new k({
      x: this.translation.x * this.size.width,
      y: this.translation.y * this.size.height
    }));
  }
}
function ar({
  translation: a,
  child: s
}) {
  return new be({ translation: a, child: s });
}
let Re = class extends N {
  constructor({ child: t, opacity: e }) {
    super({ child: t });
    o(this, "opacity");
    this.opacity = e;
  }
  createRenderObject() {
    return new Se({
      opacity: this.opacity
    });
  }
  updateRenderObject(t) {
    t.opacity = this.opacity;
  }
};
class Se extends Z {
  constructor({ opacity: t }) {
    super({ isPainter: !1 });
    o(this, "_opacity");
    this.opacity = t;
  }
  get opacity() {
    return this._opacity;
  }
  set opacity(t) {
    $(t >= 0 && t <= 1), this._opacity = t;
  }
  preformLayout() {
    this.child != null && (this.child.layout(this.constraints), this.size = this.child.size);
  }
  getChildOpacity(t) {
    return t * this.opacity;
  }
}
function _r({ opacity: a, child: s }) {
  return new Re({ opacity: a, child: s });
}
let We = class extends N {
  constructor({ child: t, aspectRatio: e }) {
    super({ child: t });
    o(this, "aspectRatio");
    this.aspectRatio = e;
  }
  createRenderObject() {
    return new Ae({
      aspectRatio: this.aspectRatio
    });
  }
  updateRenderObject(t) {
    t.aspectRatio = this.aspectRatio;
  }
};
class Ae extends Z {
  constructor({ aspectRatio: t }) {
    super({ isPainter: !1 });
    o(this, "_aspectRatio");
    this.aspectRatio = t;
  }
  get aspectRatio() {
    return this._aspectRatio;
  }
  set aspectRatio(t) {
    $(t > 0), $(Number.isFinite(t)), this._aspectRatio = t;
  }
  getIntrinsicWidth(t) {
    return Number.isFinite(t) ? t * this.aspectRatio : this.child != null ? this.child.getIntrinsicWidth(t) : 0;
  }
  getIntrinsicHeight(t) {
    return Number.isFinite(t) ? t / this.aspectRatio : this.child != null ? this.child.getIntrinsicHeight(t) : 0;
  }
  _applyAspectRatio(t) {
    if (t.isTight)
      return t.smallest;
    let e = t.maxWidth, r;
    return Number.isFinite(e) ? r = e / this.aspectRatio : (r = t.maxHeight, e = r * this.aspectRatio), e > t.maxWidth && (e = t.maxWidth, r = e / this.aspectRatio), r > t.maxHeight && (r = t.maxHeight, e = r * this.aspectRatio), e < t.minWidth && (e = t.minWidth, r = e / this.aspectRatio), r < t.minHeight && (r = t.minHeight, e = r * this.aspectRatio), t.constrain(new C({ width: e, height: r }));
  }
  preformLayout() {
    this.size = this._applyAspectRatio(this.constraints), this.child != null && this.child.layout(W.tight(this.size));
  }
}
function vr({
  aspectRatio: a,
  child: s
}) {
  return new We({ aspectRatio: a, child: s });
}
let Ie = class extends hs {
  constructor({
    children: t,
    index: e = 0,
    sizing: r = "loose",
    alignment: h
  }) {
    super({ children: t, fit: r, alignment: h });
    o(this, "index");
    this.index = e;
  }
  createRenderObject() {
    return new Ce({
      index: this.index,
      fit: this.fit,
      alignment: this.alignment
    });
  }
  updateRenderObject(t) {
    t.index = t.index, t.fit = this.fit, t.alignment = this.alignment;
  }
};
class Ce extends Bt {
  constructor({
    index: t,
    fit: e,
    alignment: r
  }) {
    super({ alignment: r, fit: e });
    o(this, "index");
    this.index = t;
  }
  paintChildren(t, {
    offset: e,
    clipId: r,
    matrix4: h,
    opacity: g
  }) {
    this.children.forEach((u) => u.dispose(t));
    const n = this.children[this.index];
    $(n != null), n.paint(t, e, r, h, g);
  }
}
function wr({
  clipped: a,
  children: s,
  alignment: t,
  sizing: e = "loose",
  index: r = 0
}) {
  return dt({
    clipped: a,
    clipper: (h) => E.fromLTWH({
      left: 0,
      top: 0,
      width: h.width,
      height: h.height
    }),
    child: new Ie({ children: s, alignment: t, sizing: e, index: r })
  });
}
function yr({
  child: a,
  borderRadius: s = wt.zero,
  clipped: t = !0,
  clipper: e
}) {
  return t ? new Ht({
    child: a,
    clipper: (r) => new U().addRRect(
      e ? e(r) : s.toRRect(
        E.fromLTWH({
          left: 0,
          top: 0,
          width: r.width,
          height: r.height
        })
      )
    )
  }) : a;
}
class He extends N {
  constructor({
    child: t,
    size: e = C.zero,
    painter: r
  }) {
    super({ child: t });
    o(this, "painter");
    o(this, "size");
    this.painter = r, this.size = e;
  }
  createRenderObject() {
    return new Te({
      painter: this.painter,
      preferredSize: this.size
    });
  }
  updateRenderObject(t) {
    t.painter = this.painter, t.preferredSize = this.size;
  }
}
class Te extends Z {
  constructor({
    preferredSize: t = C.zero,
    painter: e
  }) {
    super({ isPainter: !0 });
    o(this, "painter");
    o(this, "preferredSize");
    this.painter = e, this.preferredSize = t;
  }
  computeSizeForNoChild(t) {
    return t.constrain(this.preferredSize);
  }
  performPaint(t, e) {
    this.painter.paint(t, this.size);
  }
  createDefaultSvgEl(t) {
    return this.painter.createDefaultSvgEl(t);
  }
  getIntrinsicWidth(t) {
    return this.child == null ? Number.isFinite(this.preferredSize.width) ? this.preferredSize.width : 0 : super.getIntrinsicWidth(t);
  }
  getIntrinsicHeight(t) {
    return this.child == null ? Number.isFinite(this.preferredSize.height) ? this.preferredSize.height : 0 : super.getIntrinsicHeight(t);
  }
}
function mr({
  size: a = C.zero,
  painter: s,
  child: t
}) {
  return new He({
    child: t,
    painter: s,
    size: a
  });
}
export {
  is as Align,
  I as Alignment,
  Fe as AppRunner,
  vr as AspectRatio,
  ls as Axis,
  qt as Border,
  wt as BorderRadius,
  Pe as BorderRadiusGeometry,
  X as BorderSide,
  ds as BorderStyle,
  ps as BoxDecoration,
  Oe as BoxShadow,
  Le as BuildContext,
  Ke as Builder,
  Qe as Center,
  tr as ClipOval,
  ne as ClipPath,
  yr as ClipRRect,
  dt as ClipRect,
  te as ColoredBox,
  Ue as Column,
  Ps as ComponentElement,
  Vt as ComponentWidget,
  Dt as ConstrainedBox,
  W as Constraints,
  st as ConstraintsTransformBox,
  Ge as Container,
  ms as CrossAxisAlignment,
  mr as CustomPaint,
  Gt as DecoratedBox,
  et as EdgeInsets,
  At as Element,
  es as Expanded,
  ts as Flex,
  Zs as Flexible,
  ar as FractionalTranslation,
  ir as FractionallySizedBox,
  Rt as Gap,
  Pt as Grid,
  wr as IndexedStack,
  hr as IntrinsicHeight,
  gr as IntrinsicWidth,
  he as LimitedBox,
  ys as MainAxisAlignment,
  xs as MainAxisSize,
  L as Matrix4,
  $t as MultiChildRenderObject,
  Nt as MultiChildRenderObjectWidget,
  k as Offset,
  _r as Opacity,
  er as OverflowBox,
  Ms as Owner,
  Lt as Padding,
  U as Path,
  Ve as Positioned,
  Bs as Provider,
  lt as RRect,
  M as Radius,
  E as Rect,
  Ct as RenderAligningShiftedBox,
  De as RenderBox,
  ct as RenderObject,
  Qt as RenderObjectElement,
  Ts as RenderObjectToWidgetAdapter,
  It as RenderObjectWidget,
  Cs as RenderView,
  Ys as RichText,
  $e as Row,
  Z as SingleChildRenderObject,
  N as SingleChildRenderObjectWidget,
  C as Size,
  rt as SizedBox,
  rr as Spacer,
  Je as Stack,
  cs as StackFit,
  Xs as Text,
  _t as TextAlign,
  bs as TextBaseline,
  J as TextDirection,
  nt as TextOverflow,
  Ss as TextSpan,
  St as TextStyle,
  xt as TextWidthBasis,
  Mt as Transform,
  sr as UnconstrainedBox,
  V as Utils,
  ws as VerticalDirection,
  zt as Widget
};
