import Vector from "./Vector";
import Vector2 from "./Vector2";
import Vector3 from "./Vector3";

export class Vector4 implements Vector {
  _v4storage: [number, number, number, number];

  set xy(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[1] = argStorage[1];
  }
  set xz(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[2] = argStorage[1];
  }
  set xw(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[3] = argStorage[1];
  }
  set yx(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[0] = argStorage[1];
  }
  set yz(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[2] = argStorage[1];
  }
  set yw(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[3] = argStorage[1];
  }
  set zx(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[0] = argStorage[1];
  }
  set zy(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[1] = argStorage[1];
  }
  set zw(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[3] = argStorage[1];
  }
  set wx(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[0] = argStorage[1];
  }

  set wy(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[1] = argStorage[1];
  }

  set wz(arg: Vector2) {
    const argStorage = arg._v2storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[2] = argStorage[1];
  }

  set xyz(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[1] = argStorage[1];
    this._v4storage[2] = argStorage[2];
  }

  set xyw(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[1] = argStorage[1];
    this._v4storage[3] = argStorage[2];
  }

  set xzy(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[2] = argStorage[1];
    this._v4storage[1] = argStorage[2];
  }

  set xzw(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[2] = argStorage[1];
    this._v4storage[3] = argStorage[2];
  }

  set xwy(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[3] = argStorage[1];
    this._v4storage[1] = argStorage[2];
  }

  set xwz(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[3] = argStorage[1];
    this._v4storage[2] = argStorage[2];
  }

  set yxz(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[0] = argStorage[1];
    this._v4storage[2] = argStorage[2];
  }

  set yxw(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[0] = argStorage[1];
    this._v4storage[3] = argStorage[2];
  }

  set yzx(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[2] = argStorage[1];
    this._v4storage[0] = argStorage[2];
  }

  set yzw(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[2] = argStorage[1];
    this._v4storage[3] = argStorage[2];
  }

  set ywx(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[3] = argStorage[1];
    this._v4storage[0] = argStorage[2];
  }

  set ywz(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[3] = argStorage[1];
    this._v4storage[2] = argStorage[2];
  }

  set zxy(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[0] = argStorage[1];
    this._v4storage[1] = argStorage[2];
  }

  set zxw(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[0] = argStorage[1];
    this._v4storage[3] = argStorage[2];
  }

  set zyx(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[1] = argStorage[1];
    this._v4storage[0] = argStorage[2];
  }

  set zyw(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[1] = argStorage[1];
    this._v4storage[3] = argStorage[2];
  }

  set zwx(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[3] = argStorage[1];
    this._v4storage[0] = argStorage[2];
  }

  set zwy(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[3] = argStorage[1];
    this._v4storage[1] = argStorage[2];
  }

  set wxy(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[0] = argStorage[1];
    this._v4storage[1] = argStorage[2];
  }

  set wxz(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[0] = argStorage[1];
    this._v4storage[2] = argStorage[2];
  }

  set wyx(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[1] = argStorage[1];
    this._v4storage[0] = argStorage[2];
  }

  set wyz(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[1] = argStorage[1];
    this._v4storage[2] = argStorage[2];
  }

  set wzx(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[2] = argStorage[1];
    this._v4storage[0] = argStorage[2];
  }

  set wzy(arg: Vector3) {
    const argStorage = arg._v3storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[2] = argStorage[1];
    this._v4storage[1] = argStorage[2];
  }
  set xyzw(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[1] = argStorage[1];
    this._v4storage[2] = argStorage[2];
    this._v4storage[3] = argStorage[3];
  }

  set xywz(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[1] = argStorage[1];
    this._v4storage[3] = argStorage[2];
    this._v4storage[2] = argStorage[3];
  }

  set xzyw(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[2] = argStorage[1];
    this._v4storage[1] = argStorage[2];
    this._v4storage[3] = argStorage[3];
  }

  set xzwy(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[2] = argStorage[1];
    this._v4storage[3] = argStorage[2];
    this._v4storage[1] = argStorage[3];
  }

  set xwyz(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[3] = argStorage[1];
    this._v4storage[1] = argStorage[2];
    this._v4storage[2] = argStorage[3];
  }

  set xwzy(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[0] = argStorage[0];
    this._v4storage[3] = argStorage[1];
    this._v4storage[2] = argStorage[2];
    this._v4storage[1] = argStorage[3];
  }

  set yxzw(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[0] = argStorage[1];
    this._v4storage[2] = argStorage[2];
    this._v4storage[3] = argStorage[3];
  }

  set yxwz(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[0] = argStorage[1];
    this._v4storage[3] = argStorage[2];
    this._v4storage[2] = argStorage[3];
  }

  set yzxw(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[2] = argStorage[1];
    this._v4storage[0] = argStorage[2];
    this._v4storage[3] = argStorage[3];
  }

  set yzwx(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[2] = argStorage[1];
    this._v4storage[3] = argStorage[2];
    this._v4storage[0] = argStorage[3];
  }

  set ywxz(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[3] = argStorage[1];
    this._v4storage[0] = argStorage[2];
    this._v4storage[2] = argStorage[3];
  }

  set ywzx(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[1] = argStorage[0];
    this._v4storage[3] = argStorage[1];
    this._v4storage[2] = argStorage[2];
    this._v4storage[0] = argStorage[3];
  }

  set zxyw(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[0] = argStorage[1];
    this._v4storage[1] = argStorage[2];
    this._v4storage[3] = argStorage[3];
  }

  set zxwy(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[0] = argStorage[1];
    this._v4storage[3] = argStorage[2];
    this._v4storage[1] = argStorage[3];
  }

  set zyxw(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[1] = argStorage[1];
    this._v4storage[0] = argStorage[2];
    this._v4storage[3] = argStorage[3];
  }

  set zywx(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[1] = argStorage[1];
    this._v4storage[3] = argStorage[2];
    this._v4storage[0] = argStorage[3];
  }

  set zwxy(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[3] = argStorage[1];
    this._v4storage[0] = argStorage[2];
    this._v4storage[1] = argStorage[3];
  }

  set zwyx(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[2] = argStorage[0];
    this._v4storage[3] = argStorage[1];
    this._v4storage[1] = argStorage[2];
    this._v4storage[0] = argStorage[3];
  }

  set wxyz(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[0] = argStorage[1];
    this._v4storage[1] = argStorage[2];
    this._v4storage[2] = argStorage[3];
  }

  set wxzy(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[0] = argStorage[1];
    this._v4storage[2] = argStorage[2];
    this._v4storage[1] = argStorage[3];
  }

  set wyxz(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[1] = argStorage[1];
    this._v4storage[0] = argStorage[2];
    this._v4storage[2] = argStorage[3];
  }

  set wyzx(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[1] = argStorage[1];
    this._v4storage[2] = argStorage[2];
    this._v4storage[0] = argStorage[3];
  }

  set wzxy(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[2] = argStorage[1];
    this._v4storage[0] = argStorage[2];
    this._v4storage[1] = argStorage[3];
  }

  set wzyx(arg: Vector4) {
    const argStorage = arg._v4storage;
    this._v4storage[3] = argStorage[0];
    this._v4storage[2] = argStorage[1];
    this._v4storage[1] = argStorage[2];
    this._v4storage[0] = argStorage[3];
  }

  set r(arg: number) {
    this.x = arg;
  }
  set g(arg: number) {
    this.y = arg;
  }
  set b(arg: number) {
    this.z = arg;
  }
  set a(arg: number) {
    this.w = arg;
  }
  set s(arg: number) {
    this.x = arg;
  }
  set t(arg: number) {
    this.y = arg;
  }
  set p(arg: number) {
    this.z = arg;
  }
  set q(arg: number) {
    this.w = arg;
  }
  set x(arg: number) {
    this._v4storage[0] = arg;
  }
  set y(arg: number) {
    this._v4storage[1] = arg;
  }
  set z(arg: number) {
    this._v4storage[2] = arg;
  }
  set w(arg: number) {
    this._v4storage[3] = arg;
  }
  set rg(arg: Vector2) {
    this.xy = arg;
  }
  set rb(arg: Vector2) {
    this.xz = arg;
  }
  set ra(arg: Vector2) {
    this.xw = arg;
  }
  set gr(arg: Vector2) {
    this.yx = arg;
  }
  set gb(arg: Vector2) {
    this.yz = arg;
  }
  set ga(arg: Vector2) {
    this.yw = arg;
  }
  set br(arg: Vector2) {
    this.zx = arg;
  }
  set bg(arg: Vector2) {
    this.zy = arg;
  }
  set ba(arg: Vector2) {
    this.zw = arg;
  }
  set ar(arg: Vector2) {
    this.wx = arg;
  }
  set ag(arg: Vector2) {
    this.wy = arg;
  }
  set ab(arg: Vector2) {
    this.wz = arg;
  }
  set rgb(arg: Vector3) {
    this.xyz = arg;
  }
  set rga(arg: Vector3) {
    this.xyw = arg;
  }
  set rbg(arg: Vector3) {
    this.xzy = arg;
  }
  set rba(arg: Vector3) {
    this.xzw = arg;
  }
  set rag(arg: Vector3) {
    this.xwy = arg;
  }
  set rab(arg: Vector3) {
    this.xwz = arg;
  }
  set grb(arg: Vector3) {
    this.yxz = arg;
  }
  set gra(arg: Vector3) {
    this.yxw = arg;
  }
  set gbr(arg: Vector3) {
    this.yzx = arg;
  }
  set gba(arg: Vector3) {
    this.yzw = arg;
  }
  set gar(arg: Vector3) {
    this.ywx = arg;
  }
  set gab(arg: Vector3) {
    this.ywz = arg;
  }
  set brg(arg: Vector3) {
    this.zxy = arg;
  }
  set bra(arg: Vector3) {
    this.zxw = arg;
  }
  set bgr(arg: Vector3) {
    this.zyx = arg;
  }
  set bga(arg: Vector3) {
    this.zyw = arg;
  }
  set bar(arg: Vector3) {
    this.zwx = arg;
  }
  set bag(arg: Vector3) {
    this.zwy = arg;
  }
  set arg(arg: Vector3) {
    this.wxy = arg;
  }
  set arb(arg: Vector3) {
    this.wxz = arg;
  }
  set agr(arg: Vector3) {
    this.wyx = arg;
  }
  set agb(arg: Vector3) {
    this.wyz = arg;
  }
  set abr(arg: Vector3) {
    this.wzx = arg;
  }
  set abg(arg: Vector3) {
    this.wzy = arg;
  }
  set rgba(arg: Vector4) {
    this.xyzw = arg;
  }
  set rgab(arg: Vector4) {
    this.xywz = arg;
  }
  set rbga(arg: Vector4) {
    this.xzyw = arg;
  }
  set rbag(arg: Vector4) {
    this.xzwy = arg;
  }
  set ragb(arg: Vector4) {
    this.xwyz = arg;
  }
  set rabg(arg: Vector4) {
    this.xwzy = arg;
  }
  set grba(arg: Vector4) {
    this.yxzw = arg;
  }
  set grab(arg: Vector4) {
    this.yxwz = arg;
  }
  set gbra(arg: Vector4) {
    this.yzxw = arg;
  }
  set gbar(arg: Vector4) {
    this.yzwx = arg;
  }
  set garb(arg: Vector4) {
    this.ywxz = arg;
  }
  set gabr(arg: Vector4) {
    this.ywzx = arg;
  }
  set brga(arg: Vector4) {
    this.zxyw = arg;
  }
  set brag(arg: Vector4) {
    this.zxwy = arg;
  }
  set bgra(arg: Vector4) {
    this.zyxw = arg;
  }
  set bgar(arg: Vector4) {
    this.zywx = arg;
  }
  set barg(arg: Vector4) {
    this.zwxy = arg;
  }
  set bagr(arg: Vector4) {
    this.zwyx = arg;
  }
  set argb(arg: Vector4) {
    this.wxyz = arg;
  }
  set arbg(arg: Vector4) {
    this.wxzy = arg;
  }
  set agrb(arg: Vector4) {
    this.wyxz = arg;
  }
  set agbr(arg: Vector4) {
    this.wyzx = arg;
  }
  set abrg(arg: Vector4) {
    this.wzxy = arg;
  }
  set abgr(arg: Vector4) {
    this.wzyx = arg;
  }
  set st(arg: Vector2) {
    this.xy = arg;
  }
  set sp(arg: Vector2) {
    this.xz = arg;
  }
  set sq(arg: Vector2) {
    this.xw = arg;
  }
  set ts(arg: Vector2) {
    this.yx = arg;
  }
  set tp(arg: Vector2) {
    this.yz = arg;
  }
  set tq(arg: Vector2) {
    this.yw = arg;
  }
  set ps(arg: Vector2) {
    this.zx = arg;
  }
  set pt(arg: Vector2) {
    this.zy = arg;
  }
  set pq(arg: Vector2) {
    this.zw = arg;
  }
  set qs(arg: Vector2) {
    this.wx = arg;
  }
  set qt(arg: Vector2) {
    this.wy = arg;
  }
  set qp(arg: Vector2) {
    this.wz = arg;
  }
  set stp(arg: Vector3) {
    this.xyz = arg;
  }
  set stq(arg: Vector3) {
    this.xyw = arg;
  }
  set spt(arg: Vector3) {
    this.xzy = arg;
  }
  set spq(arg: Vector3) {
    this.xzw = arg;
  }
  set sqt(arg: Vector3) {
    this.xwy = arg;
  }
  set sqp(arg: Vector3) {
    this.xwz = arg;
  }
  set tsp(arg: Vector3) {
    this.yxz = arg;
  }
  set tsq(arg: Vector3) {
    this.yxw = arg;
  }
  set tps(arg: Vector3) {
    this.yzx = arg;
  }
  set tpq(arg: Vector3) {
    this.yzw = arg;
  }
  set tqs(arg: Vector3) {
    this.ywx = arg;
  }
  set tqp(arg: Vector3) {
    this.ywz = arg;
  }
  set pst(arg: Vector3) {
    this.zxy = arg;
  }
  set psq(arg: Vector3) {
    this.zxw = arg;
  }
  set pts(arg: Vector3) {
    this.zyx = arg;
  }
  set ptq(arg: Vector3) {
    this.zyw = arg;
  }
  set pqs(arg: Vector3) {
    this.zwx = arg;
  }
  set pqt(arg: Vector3) {
    this.zwy = arg;
  }
  set qst(arg: Vector3) {
    this.wxy = arg;
  }
  set qsp(arg: Vector3) {
    this.wxz = arg;
  }
  set qts(arg: Vector3) {
    this.wyx = arg;
  }
  set qtp(arg: Vector3) {
    this.wyz = arg;
  }
  set qps(arg: Vector3) {
    this.wzx = arg;
  }
  set qpt(arg: Vector3) {
    this.wzy = arg;
  }
  set stpq(arg: Vector4) {
    this.xyzw = arg;
  }
  set stqp(arg: Vector4) {
    this.xywz = arg;
  }
  set sptq(arg: Vector4) {
    this.xzyw = arg;
  }
  set spqt(arg: Vector4) {
    this.xzwy = arg;
  }
  set sqtp(arg: Vector4) {
    this.xwyz = arg;
  }
  set sqpt(arg: Vector4) {
    this.xwzy = arg;
  }
  set tspq(arg: Vector4) {
    this.yxzw = arg;
  }
  set tsqp(arg: Vector4) {
    this.yxwz = arg;
  }
  set tpsq(arg: Vector4) {
    this.yzxw = arg;
  }
  set tpqs(arg: Vector4) {
    this.yzwx = arg;
  }
  set tqsp(arg: Vector4) {
    this.ywxz = arg;
  }
  set tqps(arg: Vector4) {
    this.ywzx = arg;
  }
  set pstq(arg: Vector4) {
    this.zxyw = arg;
  }
  set psqt(arg: Vector4) {
    this.zxwy = arg;
  }
  set ptsq(arg: Vector4) {
    this.zyxw = arg;
  }
  set ptqs(arg: Vector4) {
    this.zywx = arg;
  }
  set pqst(arg: Vector4) {
    this.zwxy = arg;
  }
  set pqts(arg: Vector4) {
    this.zwyx = arg;
  }
  set qstp(arg: Vector4) {
    this.wxyz = arg;
  }
  set qspt(arg: Vector4) {
    this.wxzy = arg;
  }
  set qtsp(arg: Vector4) {
    this.wyxz = arg;
  }
  set qtps(arg: Vector4) {
    this.wyzx = arg;
  }
  set qpst(arg: Vector4) {
    this.wzxy = arg;
  }
  set qpts(arg: Vector4) {
    this.wzyx = arg;
  }
}

export default Vector4;
