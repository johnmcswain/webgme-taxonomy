var app = (function () {
  "use strict";
  function t() {}
  const e = (t) => t;
  function n(t, e) {
    for (const n in e) t[n] = e[n];
    return t;
  }
  function i(t) {
    return t();
  }
  function o() {
    return Object.create(null);
  }
  function r(t) {
    t.forEach(i);
  }
  function s(t) {
    return "function" == typeof t;
  }
  function a(t, e) {
    return t != t
      ? e == e
      : t !== e || (t && "object" == typeof t) || "function" == typeof t;
  }
  function l(e, n, i) {
    e.$$.on_destroy.push(
      (function (e, ...n) {
        if (null == e) return t;
        const i = e.subscribe(...n);
        return i.unsubscribe ? () => i.unsubscribe() : i;
      })(n, i)
    );
  }
  function c(t, e, n, i) {
    if (t) {
      const o = u(t, e, n, i);
      return t[0](o);
    }
  }
  function u(t, e, i, o) {
    return t[1] && o ? n(i.ctx.slice(), t[1](o(e))) : i.ctx;
  }
  function d(t, e, n, i) {
    if (t[2] && i) {
      const o = t[2](i(n));
      if (void 0 === e.dirty) return o;
      if ("object" == typeof o) {
        const t = [],
          n = Math.max(e.dirty.length, o.length);
        for (let i = 0; i < n; i += 1) t[i] = e.dirty[i] | o[i];
        return t;
      }
      return e.dirty | o;
    }
    return e.dirty;
  }
  function p(t, e, n, i, o, r) {
    if (o) {
      const s = u(e, n, i, r);
      t.p(s, o);
    }
  }
  function f(t) {
    if (t.ctx.length > 32) {
      const e = [],
        n = t.ctx.length / 32;
      for (let t = 0; t < n; t++) e[t] = -1;
      return e;
    }
    return -1;
  }
  function h(t) {
    const e = {};
    for (const n in t) "$" !== n[0] && (e[n] = t[n]);
    return e;
  }
  function m(t, e) {
    const n = {};
    e = new Set(e);
    for (const i in t) e.has(i) || "$" === i[0] || (n[i] = t[i]);
    return n;
  }
  function g(t) {
    const e = {};
    for (const n in t) e[n] = !0;
    return e;
  }
  function $(t) {
    return null == t ? "" : t;
  }
  function y(t, e, n) {
    return t.set(n), e;
  }
  function I(e) {
    return e && s(e.destroy) ? e.destroy : t;
  }
  const v = "undefined" != typeof window;
  let E = v ? () => window.performance.now() : () => Date.now(),
    b = v ? (t) => requestAnimationFrame(t) : t;
  const A = new Set();
  function C(t) {
    A.forEach((e) => {
      e.c(t) || (A.delete(e), e.f());
    }),
      0 !== A.size && b(C);
  }
  function _(t) {
    let e;
    return (
      0 === A.size && b(C),
      {
        promise: new Promise((n) => {
          A.add((e = { c: t, f: n }));
        }),
        abort() {
          A.delete(e);
        },
      }
    );
  }
  function x(t, e) {
    t.appendChild(e);
  }
  function S(t) {
    if (!t) return document;
    const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
    return e && e.host ? e : t.ownerDocument;
  }
  function T(t) {
    const e = N("style");
    return (
      (function (t, e) {
        x(t.head || t, e);
      })(S(t), e),
      e.sheet
    );
  }
  function O(t, e, n) {
    t.insertBefore(e, n || null);
  }
  function L(t) {
    t.parentNode.removeChild(t);
  }
  function w(t, e) {
    for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
  }
  function N(t) {
    return document.createElement(t);
  }
  function R(t) {
    return document.createElementNS("http://www.w3.org/2000/svg", t);
  }
  function D(t) {
    return document.createTextNode(t);
  }
  function M() {
    return D(" ");
  }
  function F() {
    return D("");
  }
  function k(t, e, n, i) {
    return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i);
  }
  function P(t) {
    return function (e) {
      return e.stopPropagation(), t.call(this, e);
    };
  }
  function U(t, e, n) {
    null == n
      ? t.removeAttribute(e)
      : t.getAttribute(e) !== n && t.setAttribute(e, n);
  }
  function H(t, e) {
    const n = Object.getOwnPropertyDescriptors(t.__proto__);
    for (const i in e)
      null == e[i]
        ? t.removeAttribute(i)
        : "style" === i
        ? (t.style.cssText = e[i])
        : "__value" === i
        ? (t.value = t[i] = e[i])
        : n[i] && n[i].set
        ? (t[i] = e[i])
        : U(t, i, e[i]);
  }
  function B(t, e) {
    (e = "" + e), t.wholeText !== e && (t.data = e);
  }
  function V(t, e) {
    t.value = null == e ? "" : e;
  }
  function j(t, e, n, i) {
    null === n
      ? t.style.removeProperty(e)
      : t.style.setProperty(e, n, i ? "important" : "");
  }
  function K(t, e, n) {
    t.classList[n ? "add" : "remove"](e);
  }
  function G(t, e, { bubbles: n = !1, cancelable: i = !1 } = {}) {
    const o = document.createEvent("CustomEvent");
    return o.initCustomEvent(t, n, i, e), o;
  }
  class W {
    constructor(t = !1) {
      (this.is_svg = !1), (this.is_svg = t), (this.e = this.n = null);
    }
    c(t) {
      this.h(t);
    }
    m(t, e, n = null) {
      this.e ||
        (this.is_svg ? (this.e = R(e.nodeName)) : (this.e = N(e.nodeName)),
        (this.t = e),
        this.c(t)),
        this.i(n);
    }
    h(t) {
      (this.e.innerHTML = t), (this.n = Array.from(this.e.childNodes));
    }
    i(t) {
      for (let e = 0; e < this.n.length; e += 1) O(this.t, this.n[e], t);
    }
    p(t) {
      this.d(), this.h(t), this.i(this.a);
    }
    d() {
      this.n.forEach(L);
    }
  }
  const z = new Map();
  let q,
    Y = 0;
  function X(t, e, n, i, o, r, s, a = 0) {
    const l = 16.666 / i;
    let c = "{\n";
    for (let t = 0; t <= 1; t += l) {
      const i = e + (n - e) * r(t);
      c += 100 * t + `%{${s(i, 1 - i)}}\n`;
    }
    const u = c + `100% {${s(n, 1 - n)}}\n}`,
      d = `__svelte_${(function (t) {
        let e = 5381,
          n = t.length;
        for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n);
        return e >>> 0;
      })(u)}_${a}`,
      p = S(t),
      { stylesheet: f, rules: h } =
        z.get(p) ||
        (function (t, e) {
          const n = { stylesheet: T(e), rules: {} };
          return z.set(t, n), n;
        })(p, t);
    h[d] ||
      ((h[d] = !0), f.insertRule(`@keyframes ${d} ${u}`, f.cssRules.length));
    const m = t.style.animation || "";
    return (
      (t.style.animation = `${
        m ? `${m}, ` : ""
      }${d} ${i}ms linear ${o}ms 1 both`),
      (Y += 1),
      d
    );
  }
  function Q(t, e) {
    const n = (t.style.animation || "").split(", "),
      i = n.filter(
        e ? (t) => t.indexOf(e) < 0 : (t) => -1 === t.indexOf("__svelte")
      ),
      o = n.length - i.length;
    o &&
      ((t.style.animation = i.join(", ")),
      (Y -= o),
      Y ||
        b(() => {
          Y ||
            (z.forEach((t) => {
              const { stylesheet: e } = t;
              let n = e.cssRules.length;
              for (; n--; ) e.deleteRule(n);
              t.rules = {};
            }),
            z.clear());
        }));
  }
  function J(t, e) {
    const n = t.getBoundingClientRect();
    if (e.left !== n.left || e.top !== n.top) {
      const i = getComputedStyle(t),
        o = "none" === i.transform ? "" : i.transform;
      t.style.transform = `${o} translate(${e.left - n.left}px, ${
        e.top - n.top
      }px)`;
    }
  }
  function Z(t) {
    q = t;
  }
  function tt() {
    if (!q) throw new Error("Function called outside component initialization");
    return q;
  }
  function et(t) {
    tt().$$.on_mount.push(t);
  }
  function nt(t) {
    tt().$$.on_destroy.push(t);
  }
  function it() {
    const t = tt();
    return (e, n, { cancelable: i = !1 } = {}) => {
      const o = t.$$.callbacks[e];
      if (o) {
        const r = G(e, n, { cancelable: i });
        return (
          o.slice().forEach((e) => {
            e.call(t, r);
          }),
          !r.defaultPrevented
        );
      }
      return !0;
    };
  }
  function ot(t, e) {
    return tt().$$.context.set(t, e), e;
  }
  function rt(t) {
    return tt().$$.context.get(t);
  }
  function st(t, e) {
    const n = t.$$.callbacks[e.type];
    n && n.slice().forEach((t) => t.call(this, e));
  }
  const at = [],
    lt = [],
    ct = [],
    ut = [],
    dt = Promise.resolve();
  let pt = !1;
  function ft() {
    pt || ((pt = !0), dt.then(vt));
  }
  function ht() {
    return ft(), dt;
  }
  function mt(t) {
    ct.push(t);
  }
  function gt(t) {
    ut.push(t);
  }
  const $t = new Set();
  let yt,
    It = 0;
  function vt() {
    const t = q;
    do {
      for (; It < at.length; ) {
        const t = at[It];
        It++, Z(t), Et(t.$$);
      }
      for (Z(null), at.length = 0, It = 0; lt.length; ) lt.pop()();
      for (let t = 0; t < ct.length; t += 1) {
        const e = ct[t];
        $t.has(e) || ($t.add(e), e());
      }
      ct.length = 0;
    } while (at.length);
    for (; ut.length; ) ut.pop()();
    (pt = !1), $t.clear(), Z(t);
  }
  function Et(t) {
    if (null !== t.fragment) {
      t.update(), r(t.before_update);
      const e = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, e),
        t.after_update.forEach(mt);
    }
  }
  function bt() {
    return (
      yt ||
        ((yt = Promise.resolve()),
        yt.then(() => {
          yt = null;
        })),
      yt
    );
  }
  function At(t, e, n) {
    t.dispatchEvent(G(`${e ? "intro" : "outro"}${n}`));
  }
  const Ct = new Set();
  let _t;
  function xt() {
    _t = { r: 0, c: [], p: _t };
  }
  function St() {
    _t.r || r(_t.c), (_t = _t.p);
  }
  function Tt(t, e) {
    t && t.i && (Ct.delete(t), t.i(e));
  }
  function Ot(t, e, n, i) {
    if (t && t.o) {
      if (Ct.has(t)) return;
      Ct.add(t),
        _t.c.push(() => {
          Ct.delete(t), i && (n && t.d(1), i());
        }),
        t.o(e);
    } else i && i();
  }
  const Lt = { duration: 0 };
  const wt =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof globalThis
      ? globalThis
      : global;
  function Nt(t, e) {
    Ot(t, 1, 1, () => {
      e.delete(t.key);
    });
  }
  function Rt(t, e) {
    t.f(), Nt(t, e);
  }
  function Dt(t, e, n, i, o, r, s, a, l, c, u, d) {
    let p = t.length,
      f = r.length,
      h = p;
    const m = {};
    for (; h--; ) m[t[h].key] = h;
    const g = [],
      $ = new Map(),
      y = new Map();
    for (h = f; h--; ) {
      const t = d(o, r, h),
        a = n(t);
      let l = s.get(a);
      l ? i && l.p(t, e) : ((l = c(a, t)), l.c()),
        $.set(a, (g[h] = l)),
        a in m && y.set(a, Math.abs(h - m[a]));
    }
    const I = new Set(),
      v = new Set();
    function E(t) {
      Tt(t, 1), t.m(a, u), s.set(t.key, t), (u = t.first), f--;
    }
    for (; p && f; ) {
      const e = g[f - 1],
        n = t[p - 1],
        i = e.key,
        o = n.key;
      e === n
        ? ((u = e.first), p--, f--)
        : $.has(o)
        ? !s.has(i) || I.has(i)
          ? E(e)
          : v.has(o)
          ? p--
          : y.get(i) > y.get(o)
          ? (v.add(i), E(e))
          : (I.add(o), p--)
        : (l(n, s), p--);
    }
    for (; p--; ) {
      const e = t[p];
      $.has(e.key) || l(e, s);
    }
    for (; f; ) E(g[f - 1]);
    return g;
  }
  function Mt(t, e) {
    const n = {},
      i = {},
      o = { $$scope: 1 };
    let r = t.length;
    for (; r--; ) {
      const s = t[r],
        a = e[r];
      if (a) {
        for (const t in s) t in a || (i[t] = 1);
        for (const t in a) o[t] || ((n[t] = a[t]), (o[t] = 1));
        t[r] = a;
      } else for (const t in s) o[t] = 1;
    }
    for (const t in i) t in n || (n[t] = void 0);
    return n;
  }
  function Ft(t) {
    return "object" == typeof t && null !== t ? t : {};
  }
  function kt(t, e, n) {
    const i = t.$$.props[e];
    void 0 !== i && ((t.$$.bound[i] = n), n(t.$$.ctx[i]));
  }
  function Pt(t) {
    t && t.c();
  }
  function Ut(t, e, n, o) {
    const { fragment: a, on_mount: l, on_destroy: c, after_update: u } = t.$$;
    a && a.m(e, n),
      o ||
        mt(() => {
          const e = l.map(i).filter(s);
          c ? c.push(...e) : r(e), (t.$$.on_mount = []);
        }),
      u.forEach(mt);
  }
  function Ht(t, e) {
    const n = t.$$;
    null !== n.fragment &&
      (r(n.on_destroy),
      n.fragment && n.fragment.d(e),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function Bt(e, n, i, s, a, l, c, u = [-1]) {
    const d = q;
    Z(e);
    const p = (e.$$ = {
      fragment: null,
      ctx: null,
      props: l,
      update: t,
      not_equal: a,
      bound: o(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(n.context || (d ? d.$$.context : [])),
      callbacks: o(),
      dirty: u,
      skip_bound: !1,
      root: n.target || d.$$.root,
    });
    c && c(p.root);
    let f = !1;
    if (
      ((p.ctx = i
        ? i(e, n.props || {}, (t, n, ...i) => {
            const o = i.length ? i[0] : n;
            return (
              p.ctx &&
                a(p.ctx[t], (p.ctx[t] = o)) &&
                (!p.skip_bound && p.bound[t] && p.bound[t](o),
                f &&
                  (function (t, e) {
                    -1 === t.$$.dirty[0] &&
                      (at.push(t), ft(), t.$$.dirty.fill(0)),
                      (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
                  })(e, t)),
              n
            );
          })
        : []),
      p.update(),
      (f = !0),
      r(p.before_update),
      (p.fragment = !!s && s(p.ctx)),
      n.target)
    ) {
      if (n.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(n.target);
        p.fragment && p.fragment.l(t), t.forEach(L);
      } else p.fragment && p.fragment.c();
      n.intro && Tt(e.$$.fragment),
        Ut(e, n.target, n.anchor, n.customElement),
        vt();
    }
    Z(d);
  }
  class Vt {
    $destroy() {
      Ht(this, 1), (this.$destroy = t);
    }
    $on(t, e) {
      const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
      return (
        n.push(e),
        () => {
          const t = n.indexOf(e);
          -1 !== t && n.splice(t, 1);
        }
      );
    }
    $set(t) {
      var e;
      this.$$set &&
        ((e = t), 0 !== Object.keys(e).length) &&
        ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
    }
  }
  var jt;
  !(function (t) {
    t.valueForId = function (t, e) {
      return t.ID === e ? t.value : t[e];
    };
  })(jt || (jt = {}));
  class Kt {
    constructor(t, e) {
      (this.id = t), (this.value = e);
    }
  }
  class Gt {
    constructor(t, e, n, i, o) {
      (this.value = null),
        (this.selected = !1),
        (this.expanded = !1),
        (this.id = t),
        (this.name = e),
        (this.type = n),
        (this.value = i),
        (this.children = o);
    }
    select() {
      this.selected = !0;
    }
    expand() {
      this.expanded = !0;
    }
    findPath(t) {
      const e =
        this.id === t
          ? []
          : this.children.reduce((e, n) => e || n.findPath(t), null);
      return e && e.unshift(this), e;
    }
    canMatch(t) {
      return t.ID === this.id || t.hasOwnProperty(this.id);
    }
    isMatch(t) {
      let e = t.ID === this.id && t.value == this.value;
      return (
        e || (e = t.hasOwnProperty(this.id) && t[this.id] === this.value), e
      );
    }
    lean() {
      return new Kt(this.id, this.value);
    }
    static register(t, e) {
      return (this.filterTypes[t] = e);
    }
    static fromDict(t) {
      const e = this.fromDicts(t.children);
      return new this(t.id, t.name, t.type, t.value, e);
    }
    static fromDicts(t) {
      return t.map((t) => (this.filterTypes[t.type] || this).fromDict(t), this);
    }
  }
  Gt.filterTypes = {};
  class Wt {
    constructor(t, e) {
      (this._value = t), (this._error = e);
    }
    map(t) {
      if (this._error) return new Wt(null, this._error);
      {
        const e = t(this._value);
        return new Wt(e, null);
      }
    }
    mapError(t) {
      if (this._error) {
        const e = t(this._error);
        return new Wt(null, e);
      }
      return new Wt(this._value, null);
    }
    unwrap() {
      if (this._error) throw this._error;
      return this._value;
    }
  }
  function zt(t, e) {
    return t.reduce((t, n) => {
      const i = e(n);
      return void 0 !== i && t.push(i), t;
    }, []);
  }
  function qt(t) {
    return t[0].toUpperCase() + t.substring(1);
  }
  function Yt(t) {
    const e = document.createElement("a");
    e.setAttribute("href", t), e.setAttribute("target", "_blank"), e.click();
  }
  Gt.register(
    "SetField",
    class extends Gt {
      constructor(t, e, n, i, o) {
        super(t, e, n, i, o);
      }
      isMatch(t) {
        var e, n;
        return (function (t, e, n) {
          var i;
          if (t === e) return !0;
          if (t.length !== e.length) return !1;
          const [o, r] = (null == n ? void 0 : n.ignoreOrder)
              ? [[...t].sort(), [...e].sort()]
              : [t, e],
            s =
              null !== (i = null == n ? void 0 : n.equals) && void 0 !== i
                ? i
                : Object.is;
          return !o.some((t, e) => !s(t, r[e]));
        })(
          null !== (e = this.value) && void 0 !== e ? e : [],
          (null !== (n = jt.valueForId(t, this.id)) && void 0 !== n
            ? n
            : []
          ).map((t) => t.ID),
          { ignoreOrder: !0 }
        );
      }
    }
  );
  var Xt = function (t, e) {
    return (
      (Xt =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, e) {
            t.__proto__ = e;
          }) ||
        function (t, e) {
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        }),
      Xt(t, e)
    );
  };
  function Qt(t, e) {
    if ("function" != typeof e && null !== e)
      throw new TypeError(
        "Class extends value " + String(e) + " is not a constructor or null"
      );
    function n() {
      this.constructor = t;
    }
    Xt(t, e),
      (t.prototype =
        null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
  }
  var Jt = function () {
    return (
      (Jt =
        Object.assign ||
        function (t) {
          for (var e, n = 1, i = arguments.length; n < i; n++)
            for (var o in (e = arguments[n]))
              Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
          return t;
        }),
      Jt.apply(this, arguments)
    );
  };
  function Zt(t, e, n, i) {
    return new (n || (n = Promise))(function (o, r) {
      function s(t) {
        try {
          l(i.next(t));
        } catch (t) {
          r(t);
        }
      }
      function a(t) {
        try {
          l(i.throw(t));
        } catch (t) {
          r(t);
        }
      }
      function l(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof n
              ? e
              : new n(function (t) {
                  t(e);
                })).then(s, a);
      }
      l((i = i.apply(t, e || [])).next());
    });
  }
  function te(t, e) {
    var n,
      i,
      o,
      r,
      s = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (r = { next: a(0), throw: a(1), return: a(2) }),
      "function" == typeof Symbol &&
        (r[Symbol.iterator] = function () {
          return this;
        }),
      r
    );
    function a(r) {
      return function (a) {
        return (function (r) {
          if (n) throw new TypeError("Generator is already executing.");
          for (; s; )
            try {
              if (
                ((n = 1),
                i &&
                  (o =
                    2 & r[0]
                      ? i.return
                      : r[0]
                      ? i.throw || ((o = i.return) && o.call(i), 0)
                      : i.next) &&
                  !(o = o.call(i, r[1])).done)
              )
                return o;
              switch (((i = 0), o && (r = [2 & r[0], o.value]), r[0])) {
                case 0:
                case 1:
                  o = r;
                  break;
                case 4:
                  return s.label++, { value: r[1], done: !1 };
                case 5:
                  s.label++, (i = r[1]), (r = [0]);
                  continue;
                case 7:
                  (r = s.ops.pop()), s.trys.pop();
                  continue;
                default:
                  if (
                    !((o = s.trys),
                    (o = o.length > 0 && o[o.length - 1]) ||
                      (6 !== r[0] && 2 !== r[0]))
                  ) {
                    s = 0;
                    continue;
                  }
                  if (3 === r[0] && (!o || (r[1] > o[0] && r[1] < o[3]))) {
                    s.label = r[1];
                    break;
                  }
                  if (6 === r[0] && s.label < o[1]) {
                    (s.label = o[1]), (o = r);
                    break;
                  }
                  if (o && s.label < o[2]) {
                    (s.label = o[2]), s.ops.push(r);
                    break;
                  }
                  o[2] && s.ops.pop(), s.trys.pop();
                  continue;
              }
              r = e.call(t, s);
            } catch (t) {
              (r = [6, t]), (i = 0);
            } finally {
              n = o = 0;
            }
          if (5 & r[0]) throw r[1];
          return { value: r[0] ? r[1] : void 0, done: !0 };
        })([r, a]);
      };
    }
  }
  function ee(t) {
    var e = "function" == typeof Symbol && Symbol.iterator,
      n = e && t[e],
      i = 0;
    if (n) return n.call(t);
    if (t && "number" == typeof t.length)
      return {
        next: function () {
          return (
            t && i >= t.length && (t = void 0), { value: t && t[i++], done: !t }
          );
        },
      };
    throw new TypeError(
      e ? "Object is not iterable." : "Symbol.iterator is not defined."
    );
  }
  function ne(t, e) {
    var n = "function" == typeof Symbol && t[Symbol.iterator];
    if (!n) return t;
    var i,
      o,
      r = n.call(t),
      s = [];
    try {
      for (; (void 0 === e || e-- > 0) && !(i = r.next()).done; )
        s.push(i.value);
    } catch (t) {
      o = { error: t };
    } finally {
      try {
        i && !i.done && (n = r.return) && n.call(r);
      } finally {
        if (o) throw o.error;
      }
    }
    return s;
  }
  function ie(t, e, n) {
    if (n || 2 === arguments.length)
      for (var i, o = 0, r = e.length; o < r; o++)
        (!i && o in e) ||
          (i || (i = Array.prototype.slice.call(e, 0, o)), (i[o] = e[o]));
    return t.concat(i || Array.prototype.slice.call(e));
  }
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var oe = (function () {
      function t(t) {
        void 0 === t && (t = {}), (this.adapter = t);
      }
      return (
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return {};
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return {};
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return {};
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {};
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.init = function () {}),
        (t.prototype.destroy = function () {}),
        t
      );
    })(),
    re = (function () {
      function t(t, e) {
        for (var n = [], i = 2; i < arguments.length; i++)
          n[i - 2] = arguments[i];
        (this.root = t),
          this.initialize.apply(this, ie([], ne(n))),
          (this.foundation = void 0 === e ? this.getDefaultFoundation() : e),
          this.foundation.init(),
          this.initialSyncWithDOM();
      }
      return (
        (t.attachTo = function (e) {
          return new t(e, new oe({}));
        }),
        (t.prototype.initialize = function () {}),
        (t.prototype.getDefaultFoundation = function () {
          throw new Error(
            "Subclasses must override getDefaultFoundation to return a properly configured foundation class"
          );
        }),
        (t.prototype.initialSyncWithDOM = function () {}),
        (t.prototype.destroy = function () {
          this.foundation.destroy();
        }),
        (t.prototype.listen = function (t, e, n) {
          this.root.addEventListener(t, e, n);
        }),
        (t.prototype.unlisten = function (t, e, n) {
          this.root.removeEventListener(t, e, n);
        }),
        (t.prototype.emit = function (t, e, n) {
          var i;
          void 0 === n && (n = !1),
            "function" == typeof CustomEvent
              ? (i = new CustomEvent(t, { bubbles: n, detail: e }))
              : (i = document.createEvent("CustomEvent")).initCustomEvent(
                  t,
                  n,
                  !1,
                  e
                ),
            this.root.dispatchEvent(i);
        }),
        t
      );
    })();
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  /**
   * @license
   * Copyright 2019 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  function se(t) {
    return (
      void 0 === t && (t = window),
      !!(function (t) {
        void 0 === t && (t = window);
        var e = !1;
        try {
          var n = {
              get passive() {
                return (e = !0), !1;
              },
            },
            i = function () {};
          t.document.addEventListener("test", i, n),
            t.document.removeEventListener("test", i, n);
        } catch (t) {
          e = !1;
        }
        return e;
      })(t) && { passive: !0 }
    );
  }
  var ae = Object.freeze({ __proto__: null, applyPassive: se });
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ function le(t, e) {
    return (t.matches || t.webkitMatchesSelector || t.msMatchesSelector).call(
      t,
      e
    );
  }
  var ce,
    ue = Object.freeze({
      __proto__: null,
      closest: function (t, e) {
        if (t.closest) return t.closest(e);
        for (var n = t; n; ) {
          if (le(n, e)) return n;
          n = n.parentElement;
        }
        return null;
      },
      matches: le,
      estimateScrollWidth: function (t) {
        var e = t;
        if (null !== e.offsetParent) return e.scrollWidth;
        var n = e.cloneNode(!0);
        n.style.setProperty("position", "absolute"),
          n.style.setProperty("transform", "translate(-9999px, -9999px)"),
          document.documentElement.appendChild(n);
        var i = n.scrollWidth;
        return document.documentElement.removeChild(n), i;
      },
    }),
    de = {
      BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
      FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
      FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
      ROOT: "mdc-ripple-upgraded",
      UNBOUNDED: "mdc-ripple-upgraded--unbounded",
    },
    pe = {
      VAR_FG_SCALE: "--mdc-ripple-fg-scale",
      VAR_FG_SIZE: "--mdc-ripple-fg-size",
      VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
      VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
      VAR_LEFT: "--mdc-ripple-left",
      VAR_TOP: "--mdc-ripple-top",
    },
    fe = {
      DEACTIVATION_TIMEOUT_MS: 225,
      FG_DEACTIVATION_MS: 150,
      INITIAL_ORIGIN_SCALE: 0.6,
      PADDING: 10,
      TAP_DELAY_MS: 300,
    };
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ function he(t, e) {
    void 0 === e && (e = !1);
    var n,
      i = t.CSS;
    if ("boolean" == typeof ce && !e) return ce;
    if (!(i && "function" == typeof i.supports)) return !1;
    var o = i.supports("--css-vars", "yes"),
      r = i.supports("(--css-vars: yes)") && i.supports("color", "#00000000");
    return (n = o || r), e || (ce = n), n;
  }
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var me = ["touchstart", "pointerdown", "mousedown", "keydown"],
    ge = ["touchend", "pointerup", "mouseup", "contextmenu"],
    $e = [],
    ye = (function (t) {
      function e(n) {
        var i = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
        return (
          (i.activationAnimationHasEnded = !1),
          (i.activationTimer = 0),
          (i.fgDeactivationRemovalTimer = 0),
          (i.fgScale = "0"),
          (i.frame = { width: 0, height: 0 }),
          (i.initialSize = 0),
          (i.layoutFrame = 0),
          (i.maxRadius = 0),
          (i.unboundedCoords = { left: 0, top: 0 }),
          (i.activationState = i.defaultActivationState()),
          (i.activationTimerCallback = function () {
            (i.activationAnimationHasEnded = !0),
              i.runDeactivationUXLogicIfReady();
          }),
          (i.activateHandler = function (t) {
            i.activateImpl(t);
          }),
          (i.deactivateHandler = function () {
            i.deactivateImpl();
          }),
          (i.focusHandler = function () {
            i.handleFocus();
          }),
          (i.blurHandler = function () {
            i.handleBlur();
          }),
          (i.resizeHandler = function () {
            i.layout();
          }),
          i
        );
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return de;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "strings", {
          get: function () {
            return pe;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "numbers", {
          get: function () {
            return fe;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              browserSupportsCssVars: function () {
                return !0;
              },
              computeBoundingRect: function () {
                return {
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  width: 0,
                  height: 0,
                };
              },
              containsEventTarget: function () {
                return !0;
              },
              deregisterDocumentInteractionHandler: function () {},
              deregisterInteractionHandler: function () {},
              deregisterResizeHandler: function () {},
              getWindowPageOffset: function () {
                return { x: 0, y: 0 };
              },
              isSurfaceActive: function () {
                return !0;
              },
              isSurfaceDisabled: function () {
                return !0;
              },
              isUnbounded: function () {
                return !0;
              },
              registerDocumentInteractionHandler: function () {},
              registerInteractionHandler: function () {},
              registerResizeHandler: function () {},
              removeClass: function () {},
              updateCssVariable: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.init = function () {
          var t = this,
            n = this.supportsPressRipple();
          if ((this.registerRootHandlers(n), n)) {
            var i = e.cssClasses,
              o = i.ROOT,
              r = i.UNBOUNDED;
            requestAnimationFrame(function () {
              t.adapter.addClass(o),
                t.adapter.isUnbounded() &&
                  (t.adapter.addClass(r), t.layoutInternal());
            });
          }
        }),
        (e.prototype.destroy = function () {
          var t = this;
          if (this.supportsPressRipple()) {
            this.activationTimer &&
              (clearTimeout(this.activationTimer),
              (this.activationTimer = 0),
              this.adapter.removeClass(e.cssClasses.FG_ACTIVATION)),
              this.fgDeactivationRemovalTimer &&
                (clearTimeout(this.fgDeactivationRemovalTimer),
                (this.fgDeactivationRemovalTimer = 0),
                this.adapter.removeClass(e.cssClasses.FG_DEACTIVATION));
            var n = e.cssClasses,
              i = n.ROOT,
              o = n.UNBOUNDED;
            requestAnimationFrame(function () {
              t.adapter.removeClass(i),
                t.adapter.removeClass(o),
                t.removeCssVars();
            });
          }
          this.deregisterRootHandlers(), this.deregisterDeactivationHandlers();
        }),
        (e.prototype.activate = function (t) {
          this.activateImpl(t);
        }),
        (e.prototype.deactivate = function () {
          this.deactivateImpl();
        }),
        (e.prototype.layout = function () {
          var t = this;
          this.layoutFrame && cancelAnimationFrame(this.layoutFrame),
            (this.layoutFrame = requestAnimationFrame(function () {
              t.layoutInternal(), (t.layoutFrame = 0);
            }));
        }),
        (e.prototype.setUnbounded = function (t) {
          var n = e.cssClasses.UNBOUNDED;
          t ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (e.prototype.handleFocus = function () {
          var t = this;
          requestAnimationFrame(function () {
            return t.adapter.addClass(e.cssClasses.BG_FOCUSED);
          });
        }),
        (e.prototype.handleBlur = function () {
          var t = this;
          requestAnimationFrame(function () {
            return t.adapter.removeClass(e.cssClasses.BG_FOCUSED);
          });
        }),
        (e.prototype.supportsPressRipple = function () {
          return this.adapter.browserSupportsCssVars();
        }),
        (e.prototype.defaultActivationState = function () {
          return {
            activationEvent: void 0,
            hasDeactivationUXRun: !1,
            isActivated: !1,
            isProgrammatic: !1,
            wasActivatedByPointer: !1,
            wasElementMadeActive: !1,
          };
        }),
        (e.prototype.registerRootHandlers = function (t) {
          var e, n;
          if (t) {
            try {
              for (var i = ee(me), o = i.next(); !o.done; o = i.next()) {
                var r = o.value;
                this.adapter.registerInteractionHandler(
                  r,
                  this.activateHandler
                );
              }
            } catch (t) {
              e = { error: t };
            } finally {
              try {
                o && !o.done && (n = i.return) && n.call(i);
              } finally {
                if (e) throw e.error;
              }
            }
            this.adapter.isUnbounded() &&
              this.adapter.registerResizeHandler(this.resizeHandler);
          }
          this.adapter.registerInteractionHandler("focus", this.focusHandler),
            this.adapter.registerInteractionHandler("blur", this.blurHandler);
        }),
        (e.prototype.registerDeactivationHandlers = function (t) {
          var e, n;
          if ("keydown" === t.type)
            this.adapter.registerInteractionHandler(
              "keyup",
              this.deactivateHandler
            );
          else
            try {
              for (var i = ee(ge), o = i.next(); !o.done; o = i.next()) {
                var r = o.value;
                this.adapter.registerDocumentInteractionHandler(
                  r,
                  this.deactivateHandler
                );
              }
            } catch (t) {
              e = { error: t };
            } finally {
              try {
                o && !o.done && (n = i.return) && n.call(i);
              } finally {
                if (e) throw e.error;
              }
            }
        }),
        (e.prototype.deregisterRootHandlers = function () {
          var t, e;
          try {
            for (var n = ee(me), i = n.next(); !i.done; i = n.next()) {
              var o = i.value;
              this.adapter.deregisterInteractionHandler(
                o,
                this.activateHandler
              );
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              i && !i.done && (e = n.return) && e.call(n);
            } finally {
              if (t) throw t.error;
            }
          }
          this.adapter.deregisterInteractionHandler("focus", this.focusHandler),
            this.adapter.deregisterInteractionHandler("blur", this.blurHandler),
            this.adapter.isUnbounded() &&
              this.adapter.deregisterResizeHandler(this.resizeHandler);
        }),
        (e.prototype.deregisterDeactivationHandlers = function () {
          var t, e;
          this.adapter.deregisterInteractionHandler(
            "keyup",
            this.deactivateHandler
          );
          try {
            for (var n = ee(ge), i = n.next(); !i.done; i = n.next()) {
              var o = i.value;
              this.adapter.deregisterDocumentInteractionHandler(
                o,
                this.deactivateHandler
              );
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              i && !i.done && (e = n.return) && e.call(n);
            } finally {
              if (t) throw t.error;
            }
          }
        }),
        (e.prototype.removeCssVars = function () {
          var t = this,
            n = e.strings;
          Object.keys(n).forEach(function (e) {
            0 === e.indexOf("VAR_") && t.adapter.updateCssVariable(n[e], null);
          });
        }),
        (e.prototype.activateImpl = function (t) {
          var e = this;
          if (!this.adapter.isSurfaceDisabled()) {
            var n = this.activationState;
            if (!n.isActivated) {
              var i = this.previousActivationEvent;
              if (!(i && void 0 !== t && i.type !== t.type))
                (n.isActivated = !0),
                  (n.isProgrammatic = void 0 === t),
                  (n.activationEvent = t),
                  (n.wasActivatedByPointer =
                    !n.isProgrammatic &&
                    void 0 !== t &&
                    ("mousedown" === t.type ||
                      "touchstart" === t.type ||
                      "pointerdown" === t.type)),
                  void 0 !== t &&
                  $e.length > 0 &&
                  $e.some(function (t) {
                    return e.adapter.containsEventTarget(t);
                  })
                    ? this.resetActivationState()
                    : (void 0 !== t &&
                        ($e.push(t.target),
                        this.registerDeactivationHandlers(t)),
                      (n.wasElementMadeActive = this.checkElementMadeActive(t)),
                      n.wasElementMadeActive && this.animateActivation(),
                      requestAnimationFrame(function () {
                        ($e = []),
                          n.wasElementMadeActive ||
                            void 0 === t ||
                            (" " !== t.key && 32 !== t.keyCode) ||
                            ((n.wasElementMadeActive =
                              e.checkElementMadeActive(t)),
                            n.wasElementMadeActive && e.animateActivation()),
                          n.wasElementMadeActive ||
                            (e.activationState = e.defaultActivationState());
                      }));
            }
          }
        }),
        (e.prototype.checkElementMadeActive = function (t) {
          return (
            void 0 === t ||
            "keydown" !== t.type ||
            this.adapter.isSurfaceActive()
          );
        }),
        (e.prototype.animateActivation = function () {
          var t = this,
            n = e.strings,
            i = n.VAR_FG_TRANSLATE_START,
            o = n.VAR_FG_TRANSLATE_END,
            r = e.cssClasses,
            s = r.FG_DEACTIVATION,
            a = r.FG_ACTIVATION,
            l = e.numbers.DEACTIVATION_TIMEOUT_MS;
          this.layoutInternal();
          var c = "",
            u = "";
          if (!this.adapter.isUnbounded()) {
            var d = this.getFgTranslationCoordinates(),
              p = d.startPoint,
              f = d.endPoint;
            (c = p.x + "px, " + p.y + "px"), (u = f.x + "px, " + f.y + "px");
          }
          this.adapter.updateCssVariable(i, c),
            this.adapter.updateCssVariable(o, u),
            clearTimeout(this.activationTimer),
            clearTimeout(this.fgDeactivationRemovalTimer),
            this.rmBoundedActivationClasses(),
            this.adapter.removeClass(s),
            this.adapter.computeBoundingRect(),
            this.adapter.addClass(a),
            (this.activationTimer = setTimeout(function () {
              t.activationTimerCallback();
            }, l));
        }),
        (e.prototype.getFgTranslationCoordinates = function () {
          var t,
            e = this.activationState,
            n = e.activationEvent;
          return {
            startPoint: (t = {
              x:
                (t = e.wasActivatedByPointer
                  ? (function (t, e, n) {
                      if (!t) return { x: 0, y: 0 };
                      var i,
                        o,
                        r = e.x,
                        s = e.y,
                        a = r + n.left,
                        l = s + n.top;
                      if ("touchstart" === t.type) {
                        var c = t;
                        (i = c.changedTouches[0].pageX - a),
                          (o = c.changedTouches[0].pageY - l);
                      } else {
                        var u = t;
                        (i = u.pageX - a), (o = u.pageY - l);
                      }
                      return { x: i, y: o };
                    })(
                      n,
                      this.adapter.getWindowPageOffset(),
                      this.adapter.computeBoundingRect()
                    )
                  : { x: this.frame.width / 2, y: this.frame.height / 2 }).x -
                this.initialSize / 2,
              y: t.y - this.initialSize / 2,
            }),
            endPoint: {
              x: this.frame.width / 2 - this.initialSize / 2,
              y: this.frame.height / 2 - this.initialSize / 2,
            },
          };
        }),
        (e.prototype.runDeactivationUXLogicIfReady = function () {
          var t = this,
            n = e.cssClasses.FG_DEACTIVATION,
            i = this.activationState,
            o = i.hasDeactivationUXRun,
            r = i.isActivated;
          (o || !r) &&
            this.activationAnimationHasEnded &&
            (this.rmBoundedActivationClasses(),
            this.adapter.addClass(n),
            (this.fgDeactivationRemovalTimer = setTimeout(function () {
              t.adapter.removeClass(n);
            }, fe.FG_DEACTIVATION_MS)));
        }),
        (e.prototype.rmBoundedActivationClasses = function () {
          var t = e.cssClasses.FG_ACTIVATION;
          this.adapter.removeClass(t),
            (this.activationAnimationHasEnded = !1),
            this.adapter.computeBoundingRect();
        }),
        (e.prototype.resetActivationState = function () {
          var t = this;
          (this.previousActivationEvent = this.activationState.activationEvent),
            (this.activationState = this.defaultActivationState()),
            setTimeout(function () {
              return (t.previousActivationEvent = void 0);
            }, e.numbers.TAP_DELAY_MS);
        }),
        (e.prototype.deactivateImpl = function () {
          var t = this,
            e = this.activationState;
          if (e.isActivated) {
            var n = Jt({}, e);
            e.isProgrammatic
              ? (requestAnimationFrame(function () {
                  t.animateDeactivation(n);
                }),
                this.resetActivationState())
              : (this.deregisterDeactivationHandlers(),
                requestAnimationFrame(function () {
                  (t.activationState.hasDeactivationUXRun = !0),
                    t.animateDeactivation(n),
                    t.resetActivationState();
                }));
          }
        }),
        (e.prototype.animateDeactivation = function (t) {
          var e = t.wasActivatedByPointer,
            n = t.wasElementMadeActive;
          (e || n) && this.runDeactivationUXLogicIfReady();
        }),
        (e.prototype.layoutInternal = function () {
          var t = this;
          this.frame = this.adapter.computeBoundingRect();
          var n = Math.max(this.frame.height, this.frame.width);
          this.maxRadius = this.adapter.isUnbounded()
            ? n
            : Math.sqrt(
                Math.pow(t.frame.width, 2) + Math.pow(t.frame.height, 2)
              ) + e.numbers.PADDING;
          var i = Math.floor(n * e.numbers.INITIAL_ORIGIN_SCALE);
          this.adapter.isUnbounded() && i % 2 != 0
            ? (this.initialSize = i - 1)
            : (this.initialSize = i),
            (this.fgScale = "" + this.maxRadius / this.initialSize),
            this.updateLayoutCssVars();
        }),
        (e.prototype.updateLayoutCssVars = function () {
          var t = e.strings,
            n = t.VAR_FG_SIZE,
            i = t.VAR_LEFT,
            o = t.VAR_TOP,
            r = t.VAR_FG_SCALE;
          this.adapter.updateCssVariable(n, this.initialSize + "px"),
            this.adapter.updateCssVariable(r, this.fgScale),
            this.adapter.isUnbounded() &&
              ((this.unboundedCoords = {
                left: Math.round(this.frame.width / 2 - this.initialSize / 2),
                top: Math.round(this.frame.height / 2 - this.initialSize / 2),
              }),
              this.adapter.updateCssVariable(
                i,
                this.unboundedCoords.left + "px"
              ),
              this.adapter.updateCssVariable(
                o,
                this.unboundedCoords.top + "px"
              ));
        }),
        e
      );
    })(oe),
    Ie = (function (t) {
      function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.disabled = !1), e;
      }
      return (
        Qt(e, t),
        (e.attachTo = function (t, n) {
          void 0 === n && (n = { isUnbounded: void 0 });
          var i = new e(t);
          return void 0 !== n.isUnbounded && (i.unbounded = n.isUnbounded), i;
        }),
        (e.createAdapter = function (t) {
          return {
            addClass: function (e) {
              return t.root.classList.add(e);
            },
            browserSupportsCssVars: function () {
              return he(window);
            },
            computeBoundingRect: function () {
              return t.root.getBoundingClientRect();
            },
            containsEventTarget: function (e) {
              return t.root.contains(e);
            },
            deregisterDocumentInteractionHandler: function (t, e) {
              return document.documentElement.removeEventListener(t, e, se());
            },
            deregisterInteractionHandler: function (e, n) {
              return t.root.removeEventListener(e, n, se());
            },
            deregisterResizeHandler: function (t) {
              return window.removeEventListener("resize", t);
            },
            getWindowPageOffset: function () {
              return { x: window.pageXOffset, y: window.pageYOffset };
            },
            isSurfaceActive: function () {
              return le(t.root, ":active");
            },
            isSurfaceDisabled: function () {
              return Boolean(t.disabled);
            },
            isUnbounded: function () {
              return Boolean(t.unbounded);
            },
            registerDocumentInteractionHandler: function (t, e) {
              return document.documentElement.addEventListener(t, e, se());
            },
            registerInteractionHandler: function (e, n) {
              return t.root.addEventListener(e, n, se());
            },
            registerResizeHandler: function (t) {
              return window.addEventListener("resize", t);
            },
            removeClass: function (e) {
              return t.root.classList.remove(e);
            },
            updateCssVariable: function (e, n) {
              return t.root.style.setProperty(e, n);
            },
          };
        }),
        Object.defineProperty(e.prototype, "unbounded", {
          get: function () {
            return Boolean(this.isUnbounded);
          },
          set: function (t) {
            (this.isUnbounded = Boolean(t)), this.setUnbounded();
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.activate = function () {
          this.foundation.activate();
        }),
        (e.prototype.deactivate = function () {
          this.foundation.deactivate();
        }),
        (e.prototype.layout = function () {
          this.foundation.layout();
        }),
        (e.prototype.getDefaultFoundation = function () {
          return new ye(e.createAdapter(this));
        }),
        (e.prototype.initialSyncWithDOM = function () {
          var t = this.root;
          this.isUnbounded = "mdcRippleIsUnbounded" in t.dataset;
        }),
        (e.prototype.setUnbounded = function () {
          this.foundation.setUnbounded(Boolean(this.isUnbounded));
        }),
        e
      );
    })(re),
    ve = {
      FIXED_CLASS: "mdc-top-app-bar--fixed",
      FIXED_SCROLLED_CLASS: "mdc-top-app-bar--fixed-scrolled",
      SHORT_CLASS: "mdc-top-app-bar--short",
      SHORT_COLLAPSED_CLASS: "mdc-top-app-bar--short-collapsed",
      SHORT_HAS_ACTION_ITEM_CLASS: "mdc-top-app-bar--short-has-action-item",
    },
    Ee = { DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100, MAX_TOP_APP_BAR_HEIGHT: 128 },
    be = {
      ACTION_ITEM_SELECTOR: ".mdc-top-app-bar__action-item",
      NAVIGATION_EVENT: "MDCTopAppBar:nav",
      NAVIGATION_ICON_SELECTOR: ".mdc-top-app-bar__navigation-icon",
      ROOT_SELECTOR: ".mdc-top-app-bar",
      TITLE_SELECTOR: ".mdc-top-app-bar__title",
    },
    Ae = (function (t) {
      function e(n) {
        return t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "strings", {
          get: function () {
            return be;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return ve;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "numbers", {
          get: function () {
            return Ee;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              hasClass: function () {
                return !1;
              },
              setStyle: function () {},
              getTopAppBarHeight: function () {
                return 0;
              },
              notifyNavigationIconClicked: function () {},
              getViewportScrollY: function () {
                return 0;
              },
              getTotalActionItems: function () {
                return 0;
              },
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.handleTargetScroll = function () {}),
        (e.prototype.handleWindowResize = function () {}),
        (e.prototype.handleNavigationClick = function () {
          this.adapter.notifyNavigationIconClicked();
        }),
        e
      );
    })(oe),
    Ce = (function (t) {
      function e(e) {
        var n = t.call(this, e) || this;
        return (
          (n.wasDocked = !0),
          (n.isDockedShowing = !0),
          (n.currentAppBarOffsetTop = 0),
          (n.isCurrentlyBeingResized = !1),
          (n.resizeThrottleId = 0),
          (n.resizeDebounceId = 0),
          (n.lastScrollPosition = n.adapter.getViewportScrollY()),
          (n.topAppBarHeight = n.adapter.getTopAppBarHeight()),
          n
        );
      }
      return (
        Qt(e, t),
        (e.prototype.destroy = function () {
          t.prototype.destroy.call(this), this.adapter.setStyle("top", "");
        }),
        (e.prototype.handleTargetScroll = function () {
          var t = Math.max(this.adapter.getViewportScrollY(), 0),
            e = t - this.lastScrollPosition;
          (this.lastScrollPosition = t),
            this.isCurrentlyBeingResized ||
              ((this.currentAppBarOffsetTop -= e),
              this.currentAppBarOffsetTop > 0
                ? (this.currentAppBarOffsetTop = 0)
                : Math.abs(this.currentAppBarOffsetTop) >
                    this.topAppBarHeight &&
                  (this.currentAppBarOffsetTop = -this.topAppBarHeight),
              this.moveTopAppBar());
        }),
        (e.prototype.handleWindowResize = function () {
          var t = this;
          this.resizeThrottleId ||
            (this.resizeThrottleId = setTimeout(function () {
              (t.resizeThrottleId = 0), t.throttledResizeHandler();
            }, Ee.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)),
            (this.isCurrentlyBeingResized = !0),
            this.resizeDebounceId && clearTimeout(this.resizeDebounceId),
            (this.resizeDebounceId = setTimeout(function () {
              t.handleTargetScroll(),
                (t.isCurrentlyBeingResized = !1),
                (t.resizeDebounceId = 0);
            }, Ee.DEBOUNCE_THROTTLE_RESIZE_TIME_MS));
        }),
        (e.prototype.checkForUpdate = function () {
          var t = -this.topAppBarHeight,
            e = this.currentAppBarOffsetTop < 0,
            n = this.currentAppBarOffsetTop > t,
            i = e && n;
          if (i) this.wasDocked = !1;
          else {
            if (!this.wasDocked) return (this.wasDocked = !0), !0;
            if (this.isDockedShowing !== n)
              return (this.isDockedShowing = n), !0;
          }
          return i;
        }),
        (e.prototype.moveTopAppBar = function () {
          if (this.checkForUpdate()) {
            var t = this.currentAppBarOffsetTop;
            Math.abs(t) >= this.topAppBarHeight &&
              (t = -Ee.MAX_TOP_APP_BAR_HEIGHT),
              this.adapter.setStyle("top", t + "px");
          }
        }),
        (e.prototype.throttledResizeHandler = function () {
          var t = this.adapter.getTopAppBarHeight();
          this.topAppBarHeight !== t &&
            ((this.wasDocked = !1),
            (this.currentAppBarOffsetTop -= this.topAppBarHeight - t),
            (this.topAppBarHeight = t)),
            this.handleTargetScroll();
        }),
        e
      );
    })(Ae),
    _e = (function (t) {
      function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.wasScrolled = !1), e;
      }
      return (
        Qt(e, t),
        (e.prototype.handleTargetScroll = function () {
          this.adapter.getViewportScrollY() <= 0
            ? this.wasScrolled &&
              (this.adapter.removeClass(ve.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !1))
            : this.wasScrolled ||
              (this.adapter.addClass(ve.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !0));
        }),
        e
      );
    })(Ce),
    xe = (function (t) {
      function e(e) {
        var n = t.call(this, e) || this;
        return (n.collapsed = !1), (n.isAlwaysCollapsed = !1), n;
      }
      return (
        Qt(e, t),
        Object.defineProperty(e.prototype, "isCollapsed", {
          get: function () {
            return this.collapsed;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.init = function () {
          t.prototype.init.call(this),
            this.adapter.getTotalActionItems() > 0 &&
              this.adapter.addClass(ve.SHORT_HAS_ACTION_ITEM_CLASS),
            this.setAlwaysCollapsed(
              this.adapter.hasClass(ve.SHORT_COLLAPSED_CLASS)
            );
        }),
        (e.prototype.setAlwaysCollapsed = function (t) {
          (this.isAlwaysCollapsed = !!t),
            this.isAlwaysCollapsed ? this.collapse() : this.maybeCollapseBar();
        }),
        (e.prototype.getAlwaysCollapsed = function () {
          return this.isAlwaysCollapsed;
        }),
        (e.prototype.handleTargetScroll = function () {
          this.maybeCollapseBar();
        }),
        (e.prototype.maybeCollapseBar = function () {
          this.isAlwaysCollapsed ||
            (this.adapter.getViewportScrollY() <= 0
              ? this.collapsed && this.uncollapse()
              : this.collapsed || this.collapse());
        }),
        (e.prototype.uncollapse = function () {
          this.adapter.removeClass(ve.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !1);
        }),
        (e.prototype.collapse = function () {
          this.adapter.addClass(ve.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !0);
        }),
        e
      );
    })(Ae);
  const Se = [];
  function Te(e, n = t) {
    let i;
    const o = new Set();
    function r(t) {
      if (a(e, t) && ((e = t), i)) {
        const t = !Se.length;
        for (const t of o) t[1](), Se.push(t, e);
        if (t) {
          for (let t = 0; t < Se.length; t += 2) Se[t][0](Se[t + 1]);
          Se.length = 0;
        }
      }
    }
    return {
      set: r,
      update: function (t) {
        r(t(e));
      },
      subscribe: function (s, a = t) {
        const l = [s, a];
        return (
          o.add(l),
          1 === o.size && (i = n(r) || t),
          s(e),
          () => {
            o.delete(l), 0 === o.size && (i(), (i = null));
          }
        );
      },
    };
  }
  function Oe(t) {
    return Object.entries(t)
      .filter(([t, e]) => "" !== t && e)
      .map(([t]) => t)
      .join(" ");
  }
  function Le(t, e, n, i = { bubbles: !0 }, o = !1) {
    if ("undefined" != typeof Event && t) {
      const r = new CustomEvent(
        e,
        Object.assign(Object.assign({}, i), { detail: n })
      );
      if ((null == t || t.dispatchEvent(r), o && e.startsWith("SMUI"))) {
        const o = new CustomEvent(
          e.replace(/^SMUI/g, () => "MDC"),
          Object.assign(Object.assign({}, i), { detail: n })
        );
        null == t || t.dispatchEvent(o),
          o.defaultPrevented && r.preventDefault();
      }
      return r;
    }
  }
  function we(t, e) {
    let n = Object.getOwnPropertyNames(t);
    const i = {};
    for (let o = 0; o < n.length; o++) {
      const r = n[o],
        s = r.indexOf("$");
      (-1 !== s && -1 !== e.indexOf(r.substring(0, s + 1))) ||
        (-1 === e.indexOf(r) && (i[r] = t[r]));
    }
    return i;
  }
  const Ne =
      /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/,
    Re =
      /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
  function De(t) {
    let e,
      n = [];
    function i(e) {
      st(t, e);
    }
    return (
      (t.$on = (t, i) => {
        let o = t,
          r = () => {};
        e ? (r = e(o, i)) : n.push([o, i]);
        return (
          o.match(Ne) &&
            console &&
            console.warn(
              'Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ',
              o
            ),
          () => {
            r();
          }
        );
      }),
      (t) => {
        const o = [],
          r = {};
        e = (e, n) => {
          let s = e,
            a = n,
            l = !1;
          const c = s.match(Ne),
            u = s.match(Re),
            d = c || u;
          if (s.match(/^SMUI:\w+:/)) {
            const t = s.split(":");
            let e = "";
            for (let n = 0; n < t.length; n++)
              e +=
                n === t.length - 1
                  ? ":" + t[n]
                  : t[n]
                      .split("-")
                      .map((t) => t.slice(0, 1).toUpperCase() + t.slice(1))
                      .join("");
            console.warn(
              `The event ${s.split("$")[0]} has been renamed to ${
                e.split("$")[0]
              }.`
            ),
              (s = e);
          }
          if (d) {
            const t = s.split(c ? ":" : "$");
            s = t[0];
            const e = Object.fromEntries(t.slice(1).map((t) => [t, !0]));
            e.passive && ((l = l || {}), (l.passive = !0)),
              e.nonpassive && ((l = l || {}), (l.passive = !1)),
              e.capture && ((l = l || {}), (l.capture = !0)),
              e.once && ((l = l || {}), (l.once = !0)),
              e.preventDefault &&
                ((p = a),
                (a = function (t) {
                  return t.preventDefault(), p.call(this, t);
                })),
              e.stopPropagation && (a = P(a));
          }
          var p;
          const f = k(t, s, a, l),
            h = () => {
              f();
              const t = o.indexOf(h);
              t > -1 && o.splice(t, 1);
            };
          return o.push(h), s in r || (r[s] = k(t, s, i)), h;
        };
        for (let t = 0; t < n.length; t++) e(n[t][0], n[t][1]);
        return {
          destroy: () => {
            for (let t = 0; t < o.length; t++) o[t]();
            for (let t of Object.entries(r)) t[1]();
          },
        };
      }
    );
  }
  function Me(t, e) {
    let n = Object.getOwnPropertyNames(t);
    const i = {};
    for (let o = 0; o < n.length; o++) {
      const r = n[o];
      r.substring(0, e.length) === e && (i[r.substring(e.length)] = t[r]);
    }
    return i;
  }
  function Fe(t, e) {
    let n = [];
    if (e)
      for (let i = 0; i < e.length; i++) {
        const o = e[i],
          r = Array.isArray(o) ? o[0] : o;
        Array.isArray(o) && o.length > 1 ? n.push(r(t, o[1])) : n.push(r(t));
      }
    return {
      update(t) {
        if (((t && t.length) || 0) != n.length)
          throw new Error(
            "You must not change the length of an actions array."
          );
        if (t)
          for (let e = 0; e < t.length; e++) {
            const i = n[e];
            if (i && i.update) {
              const n = t[e];
              Array.isArray(n) && n.length > 1 ? i.update(n[1]) : i.update();
            }
          }
      },
      destroy() {
        for (let t = 0; t < n.length; t++) {
          const e = n[t];
          e && e.destroy && e.destroy();
        }
      },
    };
  }
  const { window: ke } = wt;
  function Pe(t) {
    let e, i, o, a, l, u, h;
    const m = t[22].default,
      g = c(m, t, t[21], null);
    let $ = [
        {
          class: (i = Oe({
            [t[2]]: !0,
            "mdc-top-app-bar": !0,
            "mdc-top-app-bar--short": "short" === t[4],
            "mdc-top-app-bar--short-collapsed": t[0],
            "mdc-top-app-bar--fixed": "fixed" === t[4],
            "smui-top-app-bar--static": "static" === t[4],
            "smui-top-app-bar--color-secondary": "secondary" === t[5],
            "mdc-top-app-bar--prominent": t[6],
            "mdc-top-app-bar--dense": t[7],
            ...t[11],
          })),
        },
        { style: (o = Object.entries(t[12]).map(Ue).concat([t[3]]).join(" ")) },
        t[15],
      ],
      y = {};
    for (let t = 0; t < $.length; t += 1) y = n(y, $[t]);
    return {
      c() {
        (e = N("header")), g && g.c(), H(e, y);
      },
      m(n, i) {
        O(n, e, i),
          g && g.m(e, null),
          t[25](e),
          (l = !0),
          u ||
            ((h = [
              k(ke, "resize", t[23]),
              k(ke, "scroll", t[24]),
              I((a = Fe.call(null, e, t[1]))),
              I(t[13].call(null, e)),
              k(e, "SMUITopAppBarIconButton:nav", t[26]),
            ]),
            (u = !0));
      },
      p(t, n) {
        g &&
          g.p &&
          (!l || 2097152 & n[0]) &&
          p(g, m, t, t[21], l ? d(m, t[21], n, null) : f(t[21]), null),
          H(
            e,
            (y = Mt($, [
              (!l ||
                (2293 & n[0] &&
                  i !==
                    (i = Oe({
                      [t[2]]: !0,
                      "mdc-top-app-bar": !0,
                      "mdc-top-app-bar--short": "short" === t[4],
                      "mdc-top-app-bar--short-collapsed": t[0],
                      "mdc-top-app-bar--fixed": "fixed" === t[4],
                      "smui-top-app-bar--static": "static" === t[4],
                      "smui-top-app-bar--color-secondary": "secondary" === t[5],
                      "mdc-top-app-bar--prominent": t[6],
                      "mdc-top-app-bar--dense": t[7],
                      ...t[11],
                    })))) && { class: i },
              (!l ||
                (4104 & n[0] &&
                  o !==
                    (o = Object.entries(t[12])
                      .map(Ue)
                      .concat([t[3]])
                      .join(" ")))) && { style: o },
              32768 & n[0] && t[15],
            ]))
          ),
          a && s(a.update) && 2 & n[0] && a.update.call(null, t[1]);
      },
      i(t) {
        l || (Tt(g, t), (l = !0));
      },
      o(t) {
        Ot(g, t), (l = !1);
      },
      d(n) {
        n && L(e), g && g.d(n), t[25](null), (u = !1), r(h);
      },
    };
  }
  const Ue = ([t, e]) => `${t}: ${e};`;
  function He(t, e, i) {
    const o = [
      "use",
      "class",
      "style",
      "variant",
      "color",
      "collapsed",
      "prominent",
      "dense",
      "scrollTarget",
      "getPropStore",
      "getElement",
    ];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e;
    const l = De(tt());
    let c = () => {};
    function u(t) {
      return t === c;
    }
    let { use: d = [] } = e,
      { class: p = "" } = e,
      { style: f = "" } = e,
      { variant: g = "standard" } = e,
      { color: $ = "primary" } = e,
      { collapsed: y = c } = e;
    const I = !u(y) && !!y;
    u(y) && (y = !1);
    let v,
      E,
      b,
      { prominent: A = !1 } = e,
      { dense: C = !1 } = e,
      { scrollTarget: _ } = e,
      x = {},
      S = {},
      T = {
        subscribe: Te({ variant: g, prominent: A, dense: C }, (t) => {
          i(18, (b = t));
        }).subscribe,
      };
    let O,
      L = g;
    function w() {
      return new ({ static: Ae, short: xe, fixed: _e }[g] || Ce)({
        hasClass: N,
        addClass: R,
        removeClass: D,
        setStyle: M,
        getTopAppBarHeight: () => v.clientHeight,
        notifyNavigationIconClicked: () =>
          Le(v, "SMUITopAppBar:nav", void 0, void 0, !0),
        getViewportScrollY: () =>
          null == _ ? window.pageYOffset : _.scrollTop,
        getTotalActionItems: () =>
          v.querySelectorAll(".mdc-top-app-bar__action-item").length,
      });
    }
    function N(t) {
      return t in x ? x[t] : k().classList.contains(t);
    }
    function R(t) {
      x[t] || i(11, (x[t] = !0), x);
    }
    function D(t) {
      (t in x && !x[t]) || i(11, (x[t] = !1), x);
    }
    function M(t, e) {
      S[t] != e &&
        ("" === e || null == e
          ? (delete S[t], i(12, S), i(20, L), i(4, g), i(9, E))
          : i(12, (S[t] = e), S));
    }
    function F() {
      E &&
        (E.handleTargetScroll(),
        "short" === g && i(0, (y = "isCollapsed" in E && E.isCollapsed)));
    }
    function k() {
      return v;
    }
    et(
      () => (
        i(9, (E = w())),
        E.init(),
        () => {
          E.destroy();
        }
      )
    );
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(15, (r = m(e, o))),
          "use" in t && i(1, (d = t.use)),
          "class" in t && i(2, (p = t.class)),
          "style" in t && i(3, (f = t.style)),
          "variant" in t && i(4, (g = t.variant)),
          "color" in t && i(5, ($ = t.color)),
          "collapsed" in t && i(0, (y = t.collapsed)),
          "prominent" in t && i(6, (A = t.prominent)),
          "dense" in t && i(7, (C = t.dense)),
          "scrollTarget" in t && i(8, (_ = t.scrollTarget)),
          "$$scope" in t && i(21, (a = t.$$scope));
      }),
      (t.$$.update = () => {
        262352 & t.$$.dirty[0] &&
          b &&
          b({ variant: g, prominent: A, dense: C }),
          1049104 & t.$$.dirty[0] &&
            L !== g &&
            E &&
            (i(20, (L = g)),
            E.destroy(),
            i(11, (x = {})),
            i(12, (S = {})),
            i(9, (E = w())),
            E.init()),
          528 & t.$$.dirty[0] &&
            E &&
            "short" === g &&
            "setAlwaysCollapsed" in E &&
            E.setAlwaysCollapsed(I),
          524544 & t.$$.dirty[0] &&
            O !== _ &&
            (O && O.removeEventListener("scroll", F),
            _ && _.addEventListener("scroll", F),
            i(19, (O = _)));
      }),
      [
        y,
        d,
        p,
        f,
        g,
        $,
        A,
        C,
        _,
        E,
        v,
        x,
        S,
        l,
        F,
        r,
        function () {
          return T;
        },
        k,
        b,
        O,
        L,
        a,
        s,
        () => "short" !== g && "fixed" !== g && E && E.handleWindowResize(),
        () => null == _ && F(),
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (v = t), i(10, v);
          });
        },
        () => E && E.handleNavigationClick(),
      ]
    );
  }
  class Be extends Vt {
    constructor(t) {
      super(),
        Bt(
          this,
          t,
          He,
          Pe,
          a,
          {
            use: 1,
            class: 2,
            style: 3,
            variant: 4,
            color: 5,
            collapsed: 0,
            prominent: 6,
            dense: 7,
            scrollTarget: 8,
            getPropStore: 16,
            getElement: 17,
          },
          null,
          [-1, -1]
        );
    }
    get getPropStore() {
      return this.$$.ctx[16];
    }
    get getElement() {
      return this.$$.ctx[17];
    }
  }
  function Ve(t) {
    let e, i, o, a, l;
    const u = t[6].default,
      h = c(u, t, t[5], null);
    let m = [t[3]],
      g = {};
    for (let t = 0; t < m.length; t += 1) g = n(g, m[t]);
    return {
      c() {
        (e = N("div")), h && h.c(), H(e, g);
      },
      m(n, r) {
        O(n, e, r),
          h && h.m(e, null),
          t[7](e),
          (o = !0),
          a ||
            ((l = [I((i = Fe.call(null, e, t[0]))), I(t[2].call(null, e))]),
            (a = !0));
      },
      p(t, [n]) {
        h &&
          h.p &&
          (!o || 32 & n) &&
          p(h, u, t, t[5], o ? d(u, t[5], n, null) : f(t[5]), null),
          H(e, (g = Mt(m, [8 & n && t[3]]))),
          i && s(i.update) && 1 & n && i.update.call(null, t[0]);
      },
      i(t) {
        o || (Tt(h, t), (o = !0));
      },
      o(t) {
        Ot(h, t), (o = !1);
      },
      d(n) {
        n && L(e), h && h.d(n), t[7](null), (a = !1), r(l);
      },
    };
  }
  function je(t, e, i) {
    const o = ["use", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e,
      { use: l = [] } = e;
    const c = De(tt());
    let u;
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(3, (r = m(e, o))),
          "use" in t && i(0, (l = t.use)),
          "$$scope" in t && i(5, (a = t.$$scope));
      }),
      [
        l,
        u,
        c,
        r,
        function () {
          return u;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(1, u);
          });
        },
      ]
    );
  }
  class Ke extends Vt {
    constructor(t) {
      super(), Bt(this, t, je, Ve, a, { use: 0, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function Ge(t) {
    let e;
    const n = t[10].default,
      i = c(n, t, t[12], null);
    return {
      c() {
        i && i.c();
      },
      m(t, n) {
        i && i.m(t, n), (e = !0);
      },
      p(t, o) {
        i &&
          i.p &&
          (!e || 4096 & o) &&
          p(i, n, t, t[12], e ? d(n, t[12], o, null) : f(t[12]), null);
      },
      i(t) {
        e || (Tt(i, t), (e = !0));
      },
      o(t) {
        Ot(i, t), (e = !1);
      },
      d(t) {
        i && i.d(t);
      },
    };
  }
  function We(t) {
    let e, i, o;
    const r = [
      { use: [t[7], ...t[0]] },
      { class: Oe({ [t[1]]: !0, [t[5]]: !0, ...t[4] }) },
      t[6],
      t[8],
    ];
    var s = t[2];
    function a(t) {
      let e = { $$slots: { default: [Ge] }, $$scope: { ctx: t } };
      for (let t = 0; t < r.length; t += 1) e = n(e, r[t]);
      return { props: e };
    }
    return (
      s && ((e = new s(a(t))), t[11](e)),
      {
        c() {
          e && Pt(e.$$.fragment), (i = F());
        },
        m(t, n) {
          e && Ut(e, t, n), O(t, i, n), (o = !0);
        },
        p(t, [n]) {
          const o =
            499 & n
              ? Mt(r, [
                  129 & n && { use: [t[7], ...t[0]] },
                  50 & n && { class: Oe({ [t[1]]: !0, [t[5]]: !0, ...t[4] }) },
                  64 & n && Ft(t[6]),
                  256 & n && Ft(t[8]),
                ])
              : {};
          if (
            (4096 & n && (o.$$scope = { dirty: n, ctx: t }), s !== (s = t[2]))
          ) {
            if (e) {
              xt();
              const t = e;
              Ot(t.$$.fragment, 1, 0, () => {
                Ht(t, 1);
              }),
                St();
            }
            s
              ? ((e = new s(a(t))),
                t[11](e),
                Pt(e.$$.fragment),
                Tt(e.$$.fragment, 1),
                Ut(e, i.parentNode, i))
              : (e = null);
          } else s && e.$set(o);
        },
        i(t) {
          o || (e && Tt(e.$$.fragment, t), (o = !0));
        },
        o(t) {
          e && Ot(e.$$.fragment, t), (o = !1);
        },
        d(n) {
          t[11](null), n && L(i), e && Ht(e, n);
        },
      }
    );
  }
  const ze = {
    component: Ke,
    class: "",
    classMap: {},
    contexts: {},
    props: {},
  };
  function qe(t, e, i) {
    const o = ["use", "class", "component", "getElement"];
    let r,
      s = m(e, o),
      { $$slots: a = {}, $$scope: l } = e,
      { use: c = [] } = e,
      { class: u = "" } = e;
    const d = ze.class,
      p = {},
      f = [],
      g = ze.contexts,
      $ = ze.props;
    let { component: y = ze.component } = e;
    Object.entries(ze.classMap).forEach(([t, e]) => {
      const n = rt(e);
      n &&
        "subscribe" in n &&
        f.push(
          n.subscribe((e) => {
            i(4, (p[t] = e), p);
          })
        );
    });
    const I = De(tt());
    for (let t in g) g.hasOwnProperty(t) && ot(t, g[t]);
    return (
      nt(() => {
        for (const t of f) t();
      }),
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(8, (s = m(e, o))),
          "use" in t && i(0, (c = t.use)),
          "class" in t && i(1, (u = t.class)),
          "component" in t && i(2, (y = t.component)),
          "$$scope" in t && i(12, (l = t.$$scope));
      }),
      [
        c,
        u,
        y,
        r,
        p,
        d,
        $,
        I,
        s,
        function () {
          return r.getElement();
        },
        a,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (r = t), i(3, r);
          });
        },
        l,
      ]
    );
  }
  class Ye extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, qe, We, a, {
          use: 0,
          class: 1,
          component: 2,
          getElement: 9,
        });
    }
    get getElement() {
      return this.$$.ctx[9];
    }
  }
  const Xe = Object.assign({}, ze);
  function Qe(t) {
    return new Proxy(Ye, {
      construct: function (e, n) {
        return Object.assign(ze, Xe, t), new e(...n);
      },
      get: function (e, n) {
        return Object.assign(ze, Xe, t), e[n];
      },
    });
  }
  function Je(t) {
    let e, i, o, a, l;
    const u = t[7].default,
      h = c(u, t, t[6], null);
    let m = [{ href: t[1] }, t[4]],
      g = {};
    for (let t = 0; t < m.length; t += 1) g = n(g, m[t]);
    return {
      c() {
        (e = N("a")), h && h.c(), H(e, g);
      },
      m(n, r) {
        O(n, e, r),
          h && h.m(e, null),
          t[8](e),
          (o = !0),
          a ||
            ((l = [I((i = Fe.call(null, e, t[0]))), I(t[3].call(null, e))]),
            (a = !0));
      },
      p(t, [n]) {
        h &&
          h.p &&
          (!o || 64 & n) &&
          p(h, u, t, t[6], o ? d(u, t[6], n, null) : f(t[6]), null),
          H(e, (g = Mt(m, [(!o || 2 & n) && { href: t[1] }, 16 & n && t[4]]))),
          i && s(i.update) && 1 & n && i.update.call(null, t[0]);
      },
      i(t) {
        o || (Tt(h, t), (o = !0));
      },
      o(t) {
        Ot(h, t), (o = !1);
      },
      d(n) {
        n && L(e), h && h.d(n), t[8](null), (a = !1), r(l);
      },
    };
  }
  function Ze(t, e, i) {
    const o = ["use", "href", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e,
      { use: l = [] } = e,
      { href: c = "javascript:void(0);" } = e;
    const u = De(tt());
    let d;
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(4, (r = m(e, o))),
          "use" in t && i(0, (l = t.use)),
          "href" in t && i(1, (c = t.href)),
          "$$scope" in t && i(6, (a = t.$$scope));
      }),
      [
        l,
        c,
        d,
        u,
        r,
        function () {
          return d;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (d = t), i(2, d);
          });
        },
      ]
    );
  }
  function tn(t) {
    let e, i, o, a, l;
    const u = t[6].default,
      h = c(u, t, t[5], null);
    let m = [t[3]],
      g = {};
    for (let t = 0; t < m.length; t += 1) g = n(g, m[t]);
    return {
      c() {
        (e = N("button")), h && h.c(), H(e, g);
      },
      m(n, r) {
        O(n, e, r),
          h && h.m(e, null),
          e.autofocus && e.focus(),
          t[7](e),
          (o = !0),
          a ||
            ((l = [I((i = Fe.call(null, e, t[0]))), I(t[2].call(null, e))]),
            (a = !0));
      },
      p(t, [n]) {
        h &&
          h.p &&
          (!o || 32 & n) &&
          p(h, u, t, t[5], o ? d(u, t[5], n, null) : f(t[5]), null),
          H(e, (g = Mt(m, [8 & n && t[3]]))),
          i && s(i.update) && 1 & n && i.update.call(null, t[0]);
      },
      i(t) {
        o || (Tt(h, t), (o = !0));
      },
      o(t) {
        Ot(h, t), (o = !1);
      },
      d(n) {
        n && L(e), h && h.d(n), t[7](null), (a = !1), r(l);
      },
    };
  }
  function en(t, e, i) {
    const o = ["use", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e,
      { use: l = [] } = e;
    const c = De(tt());
    let u;
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(3, (r = m(e, o))),
          "use" in t && i(0, (l = t.use)),
          "$$scope" in t && i(5, (a = t.$$scope));
      }),
      [
        l,
        u,
        c,
        r,
        function () {
          return u;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(1, u);
          });
        },
      ]
    );
  }
  function nn(t) {
    let e, i, o, a, l;
    const u = t[6].default,
      h = c(u, t, t[5], null);
    let m = [t[3]],
      g = {};
    for (let t = 0; t < m.length; t += 1) g = n(g, m[t]);
    return {
      c() {
        (e = N("h1")), h && h.c(), H(e, g);
      },
      m(n, r) {
        O(n, e, r),
          h && h.m(e, null),
          t[7](e),
          (o = !0),
          a ||
            ((l = [I((i = Fe.call(null, e, t[0]))), I(t[2].call(null, e))]),
            (a = !0));
      },
      p(t, [n]) {
        h &&
          h.p &&
          (!o || 32 & n) &&
          p(h, u, t, t[5], o ? d(u, t[5], n, null) : f(t[5]), null),
          H(e, (g = Mt(m, [8 & n && t[3]]))),
          i && s(i.update) && 1 & n && i.update.call(null, t[0]);
      },
      i(t) {
        o || (Tt(h, t), (o = !0));
      },
      o(t) {
        Ot(h, t), (o = !1);
      },
      d(n) {
        n && L(e), h && h.d(n), t[7](null), (a = !1), r(l);
      },
    };
  }
  function on(t, e, i) {
    const o = ["use", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e,
      { use: l = [] } = e;
    const c = De(tt());
    let u;
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(3, (r = m(e, o))),
          "use" in t && i(0, (l = t.use)),
          "$$scope" in t && i(5, (a = t.$$scope));
      }),
      [
        l,
        u,
        c,
        r,
        function () {
          return u;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(1, u);
          });
        },
      ]
    );
  }
  function rn(t) {
    let e, i, o, a, l;
    const u = t[6].default,
      h = c(u, t, t[5], null);
    let m = [t[3]],
      g = {};
    for (let t = 0; t < m.length; t += 1) g = n(g, m[t]);
    return {
      c() {
        (e = N("h2")), h && h.c(), H(e, g);
      },
      m(n, r) {
        O(n, e, r),
          h && h.m(e, null),
          t[7](e),
          (o = !0),
          a ||
            ((l = [I((i = Fe.call(null, e, t[0]))), I(t[2].call(null, e))]),
            (a = !0));
      },
      p(t, [n]) {
        h &&
          h.p &&
          (!o || 32 & n) &&
          p(h, u, t, t[5], o ? d(u, t[5], n, null) : f(t[5]), null),
          H(e, (g = Mt(m, [8 & n && t[3]]))),
          i && s(i.update) && 1 & n && i.update.call(null, t[0]);
      },
      i(t) {
        o || (Tt(h, t), (o = !0));
      },
      o(t) {
        Ot(h, t), (o = !1);
      },
      d(n) {
        n && L(e), h && h.d(n), t[7](null), (a = !1), r(l);
      },
    };
  }
  function sn(t, e, i) {
    const o = ["use", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e,
      { use: l = [] } = e;
    const c = De(tt());
    let u;
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(3, (r = m(e, o))),
          "use" in t && i(0, (l = t.use)),
          "$$scope" in t && i(5, (a = t.$$scope));
      }),
      [
        l,
        u,
        c,
        r,
        function () {
          return u;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(1, u);
          });
        },
      ]
    );
  }
  function an(t) {
    let e, i, o, a, l;
    const u = t[6].default,
      h = c(u, t, t[5], null);
    let m = [t[3]],
      g = {};
    for (let t = 0; t < m.length; t += 1) g = n(g, m[t]);
    return {
      c() {
        (e = N("h3")), h && h.c(), H(e, g);
      },
      m(n, r) {
        O(n, e, r),
          h && h.m(e, null),
          t[7](e),
          (o = !0),
          a ||
            ((l = [I((i = Fe.call(null, e, t[0]))), I(t[2].call(null, e))]),
            (a = !0));
      },
      p(t, [n]) {
        h &&
          h.p &&
          (!o || 32 & n) &&
          p(h, u, t, t[5], o ? d(u, t[5], n, null) : f(t[5]), null),
          H(e, (g = Mt(m, [8 & n && t[3]]))),
          i && s(i.update) && 1 & n && i.update.call(null, t[0]);
      },
      i(t) {
        o || (Tt(h, t), (o = !0));
      },
      o(t) {
        Ot(h, t), (o = !1);
      },
      d(n) {
        n && L(e), h && h.d(n), t[7](null), (a = !1), r(l);
      },
    };
  }
  function ln(t, e, i) {
    const o = ["use", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e,
      { use: l = [] } = e;
    const c = De(tt());
    let u;
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(3, (r = m(e, o))),
          "use" in t && i(0, (l = t.use)),
          "$$scope" in t && i(5, (a = t.$$scope));
      }),
      [
        l,
        u,
        c,
        r,
        function () {
          return u;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(1, u);
          });
        },
      ]
    );
  }
  function cn(t) {
    let e, i, o, a, l;
    const u = t[6].default,
      h = c(u, t, t[5], null);
    let m = [t[3]],
      g = {};
    for (let t = 0; t < m.length; t += 1) g = n(g, m[t]);
    return {
      c() {
        (e = N("h5")), h && h.c(), H(e, g);
      },
      m(n, r) {
        O(n, e, r),
          h && h.m(e, null),
          t[7](e),
          (o = !0),
          a ||
            ((l = [I((i = Fe.call(null, e, t[0]))), I(t[2].call(null, e))]),
            (a = !0));
      },
      p(t, [n]) {
        h &&
          h.p &&
          (!o || 32 & n) &&
          p(h, u, t, t[5], o ? d(u, t[5], n, null) : f(t[5]), null),
          H(e, (g = Mt(m, [8 & n && t[3]]))),
          i && s(i.update) && 1 & n && i.update.call(null, t[0]);
      },
      i(t) {
        o || (Tt(h, t), (o = !0));
      },
      o(t) {
        Ot(h, t), (o = !1);
      },
      d(n) {
        n && L(e), h && h.d(n), t[7](null), (a = !1), r(l);
      },
    };
  }
  function un(t, e, i) {
    const o = ["use", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e,
      { use: l = [] } = e;
    const c = De(tt());
    let u;
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(3, (r = m(e, o))),
          "use" in t && i(0, (l = t.use)),
          "$$scope" in t && i(5, (a = t.$$scope));
      }),
      [
        l,
        u,
        c,
        r,
        function () {
          return u;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(1, u);
          });
        },
      ]
    );
  }
  function dn(t) {
    let e, i, o, a, l;
    const u = t[6].default,
      h = c(u, t, t[5], null);
    let m = [t[3]],
      g = {};
    for (let t = 0; t < m.length; t += 1) g = n(g, m[t]);
    return {
      c() {
        (e = N("h6")), h && h.c(), H(e, g);
      },
      m(n, r) {
        O(n, e, r),
          h && h.m(e, null),
          t[7](e),
          (o = !0),
          a ||
            ((l = [I((i = Fe.call(null, e, t[0]))), I(t[2].call(null, e))]),
            (a = !0));
      },
      p(t, [n]) {
        h &&
          h.p &&
          (!o || 32 & n) &&
          p(h, u, t, t[5], o ? d(u, t[5], n, null) : f(t[5]), null),
          H(e, (g = Mt(m, [8 & n && t[3]]))),
          i && s(i.update) && 1 & n && i.update.call(null, t[0]);
      },
      i(t) {
        o || (Tt(h, t), (o = !0));
      },
      o(t) {
        Ot(h, t), (o = !1);
      },
      d(n) {
        n && L(e), h && h.d(n), t[7](null), (a = !1), r(l);
      },
    };
  }
  function pn(t, e, i) {
    const o = ["use", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e,
      { use: l = [] } = e;
    const c = De(tt());
    let u;
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(3, (r = m(e, o))),
          "use" in t && i(0, (l = t.use)),
          "$$scope" in t && i(5, (a = t.$$scope));
      }),
      [
        l,
        u,
        c,
        r,
        function () {
          return u;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(1, u);
          });
        },
      ]
    );
  }
  function fn(t) {
    let e, i, o, a, l;
    const u = t[6].default,
      h = c(u, t, t[5], null);
    let m = [t[3]],
      g = {};
    for (let t = 0; t < m.length; t += 1) g = n(g, m[t]);
    return {
      c() {
        (e = N("li")), h && h.c(), H(e, g);
      },
      m(n, r) {
        O(n, e, r),
          h && h.m(e, null),
          t[7](e),
          (o = !0),
          a ||
            ((l = [I((i = Fe.call(null, e, t[0]))), I(t[2].call(null, e))]),
            (a = !0));
      },
      p(t, [n]) {
        h &&
          h.p &&
          (!o || 32 & n) &&
          p(h, u, t, t[5], o ? d(u, t[5], n, null) : f(t[5]), null),
          H(e, (g = Mt(m, [8 & n && t[3]]))),
          i && s(i.update) && 1 & n && i.update.call(null, t[0]);
      },
      i(t) {
        o || (Tt(h, t), (o = !0));
      },
      o(t) {
        Ot(h, t), (o = !1);
      },
      d(n) {
        n && L(e), h && h.d(n), t[7](null), (a = !1), r(l);
      },
    };
  }
  function hn(t, e, i) {
    const o = ["use", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e,
      { use: l = [] } = e;
    const c = De(tt());
    let u;
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(3, (r = m(e, o))),
          "use" in t && i(0, (l = t.use)),
          "$$scope" in t && i(5, (a = t.$$scope));
      }),
      [
        l,
        u,
        c,
        r,
        function () {
          return u;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(1, u);
          });
        },
      ]
    );
  }
  function mn(t) {
    let e, i, o, a, l;
    const u = t[6].default,
      h = c(u, t, t[5], null);
    let m = [t[3]],
      g = {};
    for (let t = 0; t < m.length; t += 1) g = n(g, m[t]);
    return {
      c() {
        (e = N("nav")), h && h.c(), H(e, g);
      },
      m(n, r) {
        O(n, e, r),
          h && h.m(e, null),
          t[7](e),
          (o = !0),
          a ||
            ((l = [I((i = Fe.call(null, e, t[0]))), I(t[2].call(null, e))]),
            (a = !0));
      },
      p(t, [n]) {
        h &&
          h.p &&
          (!o || 32 & n) &&
          p(h, u, t, t[5], o ? d(u, t[5], n, null) : f(t[5]), null),
          H(e, (g = Mt(m, [8 & n && t[3]]))),
          i && s(i.update) && 1 & n && i.update.call(null, t[0]);
      },
      i(t) {
        o || (Tt(h, t), (o = !0));
      },
      o(t) {
        Ot(h, t), (o = !1);
      },
      d(n) {
        n && L(e), h && h.d(n), t[7](null), (a = !1), r(l);
      },
    };
  }
  function gn(t, e, i) {
    const o = ["use", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e,
      { use: l = [] } = e;
    const c = De(tt());
    let u;
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(3, (r = m(e, o))),
          "use" in t && i(0, (l = t.use)),
          "$$scope" in t && i(5, (a = t.$$scope));
      }),
      [
        l,
        u,
        c,
        r,
        function () {
          return u;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(1, u);
          });
        },
      ]
    );
  }
  function $n(t) {
    let e, i, o, a, l;
    const u = t[6].default,
      h = c(u, t, t[5], null);
    let m = [t[3]],
      g = {};
    for (let t = 0; t < m.length; t += 1) g = n(g, m[t]);
    return {
      c() {
        (e = N("span")), h && h.c(), H(e, g);
      },
      m(n, r) {
        O(n, e, r),
          h && h.m(e, null),
          t[7](e),
          (o = !0),
          a ||
            ((l = [I((i = Fe.call(null, e, t[0]))), I(t[2].call(null, e))]),
            (a = !0));
      },
      p(t, [n]) {
        h &&
          h.p &&
          (!o || 32 & n) &&
          p(h, u, t, t[5], o ? d(u, t[5], n, null) : f(t[5]), null),
          H(e, (g = Mt(m, [8 & n && t[3]]))),
          i && s(i.update) && 1 & n && i.update.call(null, t[0]);
      },
      i(t) {
        o || (Tt(h, t), (o = !0));
      },
      o(t) {
        Ot(h, t), (o = !1);
      },
      d(n) {
        n && L(e), h && h.d(n), t[7](null), (a = !1), r(l);
      },
    };
  }
  function yn(t, e, i) {
    const o = ["use", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e,
      { use: l = [] } = e;
    const c = De(tt());
    let u;
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(3, (r = m(e, o))),
          "use" in t && i(0, (l = t.use)),
          "$$scope" in t && i(5, (a = t.$$scope));
      }),
      [
        l,
        u,
        c,
        r,
        function () {
          return u;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(1, u);
          });
        },
      ]
    );
  }
  class In extends Vt {
    constructor(t) {
      super(), Bt(this, t, yn, $n, a, { use: 0, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function vn(t) {
    let e, i, o, a, l;
    const u = t[6].default,
      h = c(u, t, t[5], null);
    let m = [t[3]],
      g = {};
    for (let t = 0; t < m.length; t += 1) g = n(g, m[t]);
    return {
      c() {
        (e = N("ul")), h && h.c(), H(e, g);
      },
      m(n, r) {
        O(n, e, r),
          h && h.m(e, null),
          t[7](e),
          (o = !0),
          a ||
            ((l = [I((i = Fe.call(null, e, t[0]))), I(t[2].call(null, e))]),
            (a = !0));
      },
      p(t, [n]) {
        h &&
          h.p &&
          (!o || 32 & n) &&
          p(h, u, t, t[5], o ? d(u, t[5], n, null) : f(t[5]), null),
          H(e, (g = Mt(m, [8 & n && t[3]]))),
          i && s(i.update) && 1 & n && i.update.call(null, t[0]);
      },
      i(t) {
        o || (Tt(h, t), (o = !0));
      },
      o(t) {
        Ot(h, t), (o = !1);
      },
      d(n) {
        n && L(e), h && h.d(n), t[7](null), (a = !1), r(l);
      },
    };
  }
  function En(t, e, i) {
    const o = ["use", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e,
      { use: l = [] } = e;
    const c = De(tt());
    let u;
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(3, (r = m(e, o))),
          "use" in t && i(0, (l = t.use)),
          "$$scope" in t && i(5, (a = t.$$scope));
      }),
      [
        l,
        u,
        c,
        r,
        function () {
          return u;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(1, u);
          });
        },
      ]
    );
  }
  const bn = class extends Vt {
      constructor(t) {
        super(), Bt(this, t, Ze, Je, a, { use: 0, href: 1, getElement: 5 });
      }
      get getElement() {
        return this.$$.ctx[5];
      }
    },
    An = class extends Vt {
      constructor(t) {
        super(), Bt(this, t, en, tn, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Cn = Ke,
    _n = class extends Vt {
      constructor(t) {
        super(), Bt(this, t, on, nn, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    xn = class extends Vt {
      constructor(t) {
        super(), Bt(this, t, sn, rn, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Sn = class extends Vt {
      constructor(t) {
        super(), Bt(this, t, ln, an, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Tn = class extends Vt {
      constructor(t) {
        super(), Bt(this, t, un, cn, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    On = class extends Vt {
      constructor(t) {
        super(), Bt(this, t, pn, dn, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Ln = class extends Vt {
      constructor(t) {
        super(), Bt(this, t, hn, fn, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    wn = class extends Vt {
      constructor(t) {
        super(), Bt(this, t, gn, mn, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Nn = In,
    Rn = class extends Vt {
      constructor(t) {
        super(), Bt(this, t, En, vn, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    };
  var Dn = Qe({ class: "mdc-top-app-bar__row", component: Cn });
  function Mn(t) {
    let e, i, o, a, l, u;
    const h = t[9].default,
      m = c(h, t, t[8], null);
    let g = [
        {
          class: (i = Oe({
            [t[1]]: !0,
            "mdc-top-app-bar__section": !0,
            "mdc-top-app-bar__section--align-start": "start" === t[2],
            "mdc-top-app-bar__section--align-end": "end" === t[2],
          })),
        },
        t[3] ? { role: "toolbar" } : {},
        t[6],
      ],
      $ = {};
    for (let t = 0; t < g.length; t += 1) $ = n($, g[t]);
    return {
      c() {
        (e = N("section")), m && m.c(), H(e, $);
      },
      m(n, i) {
        O(n, e, i),
          m && m.m(e, null),
          t[10](e),
          (a = !0),
          l ||
            ((u = [I((o = Fe.call(null, e, t[0]))), I(t[5].call(null, e))]),
            (l = !0));
      },
      p(t, [n]) {
        m &&
          m.p &&
          (!a || 256 & n) &&
          p(m, h, t, t[8], a ? d(h, t[8], n, null) : f(t[8]), null),
          H(
            e,
            ($ = Mt(g, [
              (!a ||
                (6 & n &&
                  i !==
                    (i = Oe({
                      [t[1]]: !0,
                      "mdc-top-app-bar__section": !0,
                      "mdc-top-app-bar__section--align-start": "start" === t[2],
                      "mdc-top-app-bar__section--align-end": "end" === t[2],
                    })))) && { class: i },
              8 & n && (t[3] ? { role: "toolbar" } : {}),
              64 & n && t[6],
            ]))
          ),
          o && s(o.update) && 1 & n && o.update.call(null, t[0]);
      },
      i(t) {
        a || (Tt(m, t), (a = !0));
      },
      o(t) {
        Ot(m, t), (a = !1);
      },
      d(n) {
        n && L(e), m && m.d(n), t[10](null), (l = !1), r(u);
      },
    };
  }
  function Fn(t, e, i) {
    const o = ["use", "class", "align", "toolbar", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e;
    const l = De(tt());
    let c,
      { use: u = [] } = e,
      { class: d = "" } = e,
      { align: p = "start" } = e,
      { toolbar: f = !1 } = e;
    return (
      ot(
        "SMUI:icon-button:context",
        f ? "top-app-bar:action" : "top-app-bar:navigation"
      ),
      ot(
        "SMUI:button:context",
        f ? "top-app-bar:action" : "top-app-bar:navigation"
      ),
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(6, (r = m(e, o))),
          "use" in t && i(0, (u = t.use)),
          "class" in t && i(1, (d = t.class)),
          "align" in t && i(2, (p = t.align)),
          "toolbar" in t && i(3, (f = t.toolbar)),
          "$$scope" in t && i(8, (a = t.$$scope));
      }),
      [
        u,
        d,
        p,
        f,
        c,
        l,
        r,
        function () {
          return c;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (c = t), i(4, c);
          });
        },
      ]
    );
  }
  var kn = Qe({ class: "mdc-top-app-bar__title", component: Nn });
  const Pn = class extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, Fn, Mn, a, {
          use: 0,
          class: 1,
          align: 2,
          toolbar: 3,
          getElement: 7,
        });
    }
    get getElement() {
      return this.$$.ctx[7];
    }
  };
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var Un = {
      LABEL_FLOAT_ABOVE: "mdc-floating-label--float-above",
      LABEL_REQUIRED: "mdc-floating-label--required",
      LABEL_SHAKE: "mdc-floating-label--shake",
      ROOT: "mdc-floating-label",
    },
    Hn = (function (t) {
      function e(n) {
        var i = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
        return (
          (i.shakeAnimationEndHandler = function () {
            i.handleShakeAnimationEnd();
          }),
          i
        );
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return Un;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              getWidth: function () {
                return 0;
              },
              registerInteractionHandler: function () {},
              deregisterInteractionHandler: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.init = function () {
          this.adapter.registerInteractionHandler(
            "animationend",
            this.shakeAnimationEndHandler
          );
        }),
        (e.prototype.destroy = function () {
          this.adapter.deregisterInteractionHandler(
            "animationend",
            this.shakeAnimationEndHandler
          );
        }),
        (e.prototype.getWidth = function () {
          return this.adapter.getWidth();
        }),
        (e.prototype.shake = function (t) {
          var n = e.cssClasses.LABEL_SHAKE;
          t ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (e.prototype.float = function (t) {
          var n = e.cssClasses,
            i = n.LABEL_FLOAT_ABOVE,
            o = n.LABEL_SHAKE;
          t
            ? this.adapter.addClass(i)
            : (this.adapter.removeClass(i), this.adapter.removeClass(o));
        }),
        (e.prototype.setRequired = function (t) {
          var n = e.cssClasses.LABEL_REQUIRED;
          t ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (e.prototype.handleShakeAnimationEnd = function () {
          var t = e.cssClasses.LABEL_SHAKE;
          this.adapter.removeClass(t);
        }),
        e
      );
    })(oe),
    Bn = {
      LINE_RIPPLE_ACTIVE: "mdc-line-ripple--active",
      LINE_RIPPLE_DEACTIVATING: "mdc-line-ripple--deactivating",
    },
    Vn = (function (t) {
      function e(n) {
        var i = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
        return (
          (i.transitionEndHandler = function (t) {
            i.handleTransitionEnd(t);
          }),
          i
        );
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return Bn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              hasClass: function () {
                return !1;
              },
              setStyle: function () {},
              registerEventHandler: function () {},
              deregisterEventHandler: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.init = function () {
          this.adapter.registerEventHandler(
            "transitionend",
            this.transitionEndHandler
          );
        }),
        (e.prototype.destroy = function () {
          this.adapter.deregisterEventHandler(
            "transitionend",
            this.transitionEndHandler
          );
        }),
        (e.prototype.activate = function () {
          this.adapter.removeClass(Bn.LINE_RIPPLE_DEACTIVATING),
            this.adapter.addClass(Bn.LINE_RIPPLE_ACTIVE);
        }),
        (e.prototype.setRippleCenter = function (t) {
          this.adapter.setStyle("transform-origin", t + "px center");
        }),
        (e.prototype.deactivate = function () {
          this.adapter.addClass(Bn.LINE_RIPPLE_DEACTIVATING);
        }),
        (e.prototype.handleTransitionEnd = function (t) {
          var e = this.adapter.hasClass(Bn.LINE_RIPPLE_DEACTIVATING);
          "opacity" === t.propertyName &&
            e &&
            (this.adapter.removeClass(Bn.LINE_RIPPLE_ACTIVE),
            this.adapter.removeClass(Bn.LINE_RIPPLE_DEACTIVATING));
        }),
        e
      );
    })(oe),
    jn = { NOTCH_ELEMENT_SELECTOR: ".mdc-notched-outline__notch" },
    Kn = { NOTCH_ELEMENT_PADDING: 8 },
    Gn = {
      NO_LABEL: "mdc-notched-outline--no-label",
      OUTLINE_NOTCHED: "mdc-notched-outline--notched",
      OUTLINE_UPGRADED: "mdc-notched-outline--upgraded",
    },
    Wn = (function (t) {
      function e(n) {
        return t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "strings", {
          get: function () {
            return jn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return Gn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "numbers", {
          get: function () {
            return Kn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              setNotchWidthProperty: function () {},
              removeNotchWidthProperty: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.notch = function (t) {
          var n = e.cssClasses.OUTLINE_NOTCHED;
          t > 0 && (t += Kn.NOTCH_ELEMENT_PADDING),
            this.adapter.setNotchWidthProperty(t),
            this.adapter.addClass(n);
        }),
        (e.prototype.closeNotch = function () {
          var t = e.cssClasses.OUTLINE_NOTCHED;
          this.adapter.removeClass(t), this.adapter.removeNotchWidthProperty();
        }),
        e
      );
    })(oe),
    zn = {
      ARIA_CONTROLS: "aria-controls",
      ARIA_DESCRIBEDBY: "aria-describedby",
      INPUT_SELECTOR: ".mdc-text-field__input",
      LABEL_SELECTOR: ".mdc-floating-label",
      LEADING_ICON_SELECTOR: ".mdc-text-field__icon--leading",
      LINE_RIPPLE_SELECTOR: ".mdc-line-ripple",
      OUTLINE_SELECTOR: ".mdc-notched-outline",
      PREFIX_SELECTOR: ".mdc-text-field__affix--prefix",
      SUFFIX_SELECTOR: ".mdc-text-field__affix--suffix",
      TRAILING_ICON_SELECTOR: ".mdc-text-field__icon--trailing",
    },
    qn = {
      DISABLED: "mdc-text-field--disabled",
      FOCUSED: "mdc-text-field--focused",
      HELPER_LINE: "mdc-text-field-helper-line",
      INVALID: "mdc-text-field--invalid",
      LABEL_FLOATING: "mdc-text-field--label-floating",
      NO_LABEL: "mdc-text-field--no-label",
      OUTLINED: "mdc-text-field--outlined",
      ROOT: "mdc-text-field",
      TEXTAREA: "mdc-text-field--textarea",
      WITH_LEADING_ICON: "mdc-text-field--with-leading-icon",
      WITH_TRAILING_ICON: "mdc-text-field--with-trailing-icon",
      WITH_INTERNAL_COUNTER: "mdc-text-field--with-internal-counter",
    },
    Yn = { LABEL_SCALE: 0.75 },
    Xn = [
      "pattern",
      "min",
      "max",
      "required",
      "step",
      "minlength",
      "maxlength",
    ],
    Qn = ["color", "date", "datetime-local", "month", "range", "time", "week"],
    Jn = ["mousedown", "touchstart"],
    Zn = ["click", "keydown"],
    ti = (function (t) {
      function e(n, i) {
        void 0 === i && (i = {});
        var o = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
        return (
          (o.isFocused = !1),
          (o.receivedUserInput = !1),
          (o.valid = !0),
          (o.useNativeValidation = !0),
          (o.validateOnValueChange = !0),
          (o.helperText = i.helperText),
          (o.characterCounter = i.characterCounter),
          (o.leadingIcon = i.leadingIcon),
          (o.trailingIcon = i.trailingIcon),
          (o.inputFocusHandler = function () {
            o.activateFocus();
          }),
          (o.inputBlurHandler = function () {
            o.deactivateFocus();
          }),
          (o.inputInputHandler = function () {
            o.handleInput();
          }),
          (o.setPointerXOffset = function (t) {
            o.setTransformOrigin(t);
          }),
          (o.textFieldInteractionHandler = function () {
            o.handleTextFieldInteraction();
          }),
          (o.validationAttributeChangeHandler = function (t) {
            o.handleValidationAttributeChange(t);
          }),
          o
        );
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return qn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "strings", {
          get: function () {
            return zn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "numbers", {
          get: function () {
            return Yn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "shouldAlwaysFloat", {
          get: function () {
            var t = this.getNativeInput().type;
            return Qn.indexOf(t) >= 0;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "shouldFloat", {
          get: function () {
            return (
              this.shouldAlwaysFloat ||
              this.isFocused ||
              !!this.getValue() ||
              this.isBadInput()
            );
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "shouldShake", {
          get: function () {
            return !this.isFocused && !this.isValid() && !!this.getValue();
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              hasClass: function () {
                return !0;
              },
              setInputAttr: function () {},
              removeInputAttr: function () {},
              registerTextFieldInteractionHandler: function () {},
              deregisterTextFieldInteractionHandler: function () {},
              registerInputInteractionHandler: function () {},
              deregisterInputInteractionHandler: function () {},
              registerValidationAttributeChangeHandler: function () {
                return new MutationObserver(function () {});
              },
              deregisterValidationAttributeChangeHandler: function () {},
              getNativeInput: function () {
                return null;
              },
              isFocused: function () {
                return !1;
              },
              activateLineRipple: function () {},
              deactivateLineRipple: function () {},
              setLineRippleTransformOrigin: function () {},
              shakeLabel: function () {},
              floatLabel: function () {},
              setLabelRequired: function () {},
              hasLabel: function () {
                return !1;
              },
              getLabelWidth: function () {
                return 0;
              },
              hasOutline: function () {
                return !1;
              },
              notchOutline: function () {},
              closeOutline: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.init = function () {
          var t, e, n, i;
          this.adapter.hasLabel() &&
            this.getNativeInput().required &&
            this.adapter.setLabelRequired(!0),
            this.adapter.isFocused()
              ? this.inputFocusHandler()
              : this.adapter.hasLabel() &&
                this.shouldFloat &&
                (this.notchOutline(!0),
                this.adapter.floatLabel(!0),
                this.styleFloating(!0)),
            this.adapter.registerInputInteractionHandler(
              "focus",
              this.inputFocusHandler
            ),
            this.adapter.registerInputInteractionHandler(
              "blur",
              this.inputBlurHandler
            ),
            this.adapter.registerInputInteractionHandler(
              "input",
              this.inputInputHandler
            );
          try {
            for (var o = ee(Jn), r = o.next(); !r.done; r = o.next()) {
              var s = r.value;
              this.adapter.registerInputInteractionHandler(
                s,
                this.setPointerXOffset
              );
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              r && !r.done && (e = o.return) && e.call(o);
            } finally {
              if (t) throw t.error;
            }
          }
          try {
            for (var a = ee(Zn), l = a.next(); !l.done; l = a.next()) {
              s = l.value;
              this.adapter.registerTextFieldInteractionHandler(
                s,
                this.textFieldInteractionHandler
              );
            }
          } catch (t) {
            n = { error: t };
          } finally {
            try {
              l && !l.done && (i = a.return) && i.call(a);
            } finally {
              if (n) throw n.error;
            }
          }
          (this.validationObserver =
            this.adapter.registerValidationAttributeChangeHandler(
              this.validationAttributeChangeHandler
            )),
            this.setcharacterCounter(this.getValue().length);
        }),
        (e.prototype.destroy = function () {
          var t, e, n, i;
          this.adapter.deregisterInputInteractionHandler(
            "focus",
            this.inputFocusHandler
          ),
            this.adapter.deregisterInputInteractionHandler(
              "blur",
              this.inputBlurHandler
            ),
            this.adapter.deregisterInputInteractionHandler(
              "input",
              this.inputInputHandler
            );
          try {
            for (var o = ee(Jn), r = o.next(); !r.done; r = o.next()) {
              var s = r.value;
              this.adapter.deregisterInputInteractionHandler(
                s,
                this.setPointerXOffset
              );
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              r && !r.done && (e = o.return) && e.call(o);
            } finally {
              if (t) throw t.error;
            }
          }
          try {
            for (var a = ee(Zn), l = a.next(); !l.done; l = a.next()) {
              s = l.value;
              this.adapter.deregisterTextFieldInteractionHandler(
                s,
                this.textFieldInteractionHandler
              );
            }
          } catch (t) {
            n = { error: t };
          } finally {
            try {
              l && !l.done && (i = a.return) && i.call(a);
            } finally {
              if (n) throw n.error;
            }
          }
          this.adapter.deregisterValidationAttributeChangeHandler(
            this.validationObserver
          );
        }),
        (e.prototype.handleTextFieldInteraction = function () {
          var t = this.adapter.getNativeInput();
          (t && t.disabled) || (this.receivedUserInput = !0);
        }),
        (e.prototype.handleValidationAttributeChange = function (t) {
          var e = this;
          t.some(function (t) {
            return (
              Xn.indexOf(t) > -1 &&
              (e.styleValidity(!0),
              e.adapter.setLabelRequired(e.getNativeInput().required),
              !0)
            );
          }),
            t.indexOf("maxlength") > -1 &&
              this.setcharacterCounter(this.getValue().length);
        }),
        (e.prototype.notchOutline = function (t) {
          if (this.adapter.hasOutline() && this.adapter.hasLabel())
            if (t) {
              var e = this.adapter.getLabelWidth() * Yn.LABEL_SCALE;
              this.adapter.notchOutline(e);
            } else this.adapter.closeOutline();
        }),
        (e.prototype.activateFocus = function () {
          (this.isFocused = !0),
            this.styleFocused(this.isFocused),
            this.adapter.activateLineRipple(),
            this.adapter.hasLabel() &&
              (this.notchOutline(this.shouldFloat),
              this.adapter.floatLabel(this.shouldFloat),
              this.styleFloating(this.shouldFloat),
              this.adapter.shakeLabel(this.shouldShake)),
            !this.helperText ||
              (!this.helperText.isPersistent() &&
                this.helperText.isValidation() &&
                this.valid) ||
              this.helperText.showToScreenReader();
        }),
        (e.prototype.setTransformOrigin = function (t) {
          if (!this.isDisabled() && !this.adapter.hasOutline()) {
            var e = t.touches,
              n = e ? e[0] : t,
              i = n.target.getBoundingClientRect(),
              o = n.clientX - i.left;
            this.adapter.setLineRippleTransformOrigin(o);
          }
        }),
        (e.prototype.handleInput = function () {
          this.autoCompleteFocus(),
            this.setcharacterCounter(this.getValue().length);
        }),
        (e.prototype.autoCompleteFocus = function () {
          this.receivedUserInput || this.activateFocus();
        }),
        (e.prototype.deactivateFocus = function () {
          (this.isFocused = !1), this.adapter.deactivateLineRipple();
          var t = this.isValid();
          this.styleValidity(t),
            this.styleFocused(this.isFocused),
            this.adapter.hasLabel() &&
              (this.notchOutline(this.shouldFloat),
              this.adapter.floatLabel(this.shouldFloat),
              this.styleFloating(this.shouldFloat),
              this.adapter.shakeLabel(this.shouldShake)),
            this.shouldFloat || (this.receivedUserInput = !1);
        }),
        (e.prototype.getValue = function () {
          return this.getNativeInput().value;
        }),
        (e.prototype.setValue = function (t) {
          if (
            (this.getValue() !== t && (this.getNativeInput().value = t),
            this.setcharacterCounter(t.length),
            this.validateOnValueChange)
          ) {
            var e = this.isValid();
            this.styleValidity(e);
          }
          this.adapter.hasLabel() &&
            (this.notchOutline(this.shouldFloat),
            this.adapter.floatLabel(this.shouldFloat),
            this.styleFloating(this.shouldFloat),
            this.validateOnValueChange &&
              this.adapter.shakeLabel(this.shouldShake));
        }),
        (e.prototype.isValid = function () {
          return this.useNativeValidation
            ? this.isNativeInputValid()
            : this.valid;
        }),
        (e.prototype.setValid = function (t) {
          (this.valid = t), this.styleValidity(t);
          var e = !t && !this.isFocused && !!this.getValue();
          this.adapter.hasLabel() && this.adapter.shakeLabel(e);
        }),
        (e.prototype.setValidateOnValueChange = function (t) {
          this.validateOnValueChange = t;
        }),
        (e.prototype.getValidateOnValueChange = function () {
          return this.validateOnValueChange;
        }),
        (e.prototype.setUseNativeValidation = function (t) {
          this.useNativeValidation = t;
        }),
        (e.prototype.isDisabled = function () {
          return this.getNativeInput().disabled;
        }),
        (e.prototype.setDisabled = function (t) {
          (this.getNativeInput().disabled = t), this.styleDisabled(t);
        }),
        (e.prototype.setHelperTextContent = function (t) {
          this.helperText && this.helperText.setContent(t);
        }),
        (e.prototype.setLeadingIconAriaLabel = function (t) {
          this.leadingIcon && this.leadingIcon.setAriaLabel(t);
        }),
        (e.prototype.setLeadingIconContent = function (t) {
          this.leadingIcon && this.leadingIcon.setContent(t);
        }),
        (e.prototype.setTrailingIconAriaLabel = function (t) {
          this.trailingIcon && this.trailingIcon.setAriaLabel(t);
        }),
        (e.prototype.setTrailingIconContent = function (t) {
          this.trailingIcon && this.trailingIcon.setContent(t);
        }),
        (e.prototype.setcharacterCounter = function (t) {
          if (this.characterCounter) {
            var e = this.getNativeInput().maxLength;
            if (-1 === e)
              throw new Error(
                "MDCTextFieldFoundation: Expected maxlength html property on text input or textarea."
              );
            this.characterCounter.setCounterValue(t, e);
          }
        }),
        (e.prototype.isBadInput = function () {
          return this.getNativeInput().validity.badInput || !1;
        }),
        (e.prototype.isNativeInputValid = function () {
          return this.getNativeInput().validity.valid;
        }),
        (e.prototype.styleValidity = function (t) {
          var n = e.cssClasses.INVALID;
          if (
            (t ? this.adapter.removeClass(n) : this.adapter.addClass(n),
            this.helperText)
          ) {
            if (
              (this.helperText.setValidity(t), !this.helperText.isValidation())
            )
              return;
            var i = this.helperText.isVisible(),
              o = this.helperText.getId();
            i && o
              ? this.adapter.setInputAttr(zn.ARIA_DESCRIBEDBY, o)
              : this.adapter.removeInputAttr(zn.ARIA_DESCRIBEDBY);
          }
        }),
        (e.prototype.styleFocused = function (t) {
          var n = e.cssClasses.FOCUSED;
          t ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (e.prototype.styleDisabled = function (t) {
          var n = e.cssClasses,
            i = n.DISABLED,
            o = n.INVALID;
          t
            ? (this.adapter.addClass(i), this.adapter.removeClass(o))
            : this.adapter.removeClass(i),
            this.leadingIcon && this.leadingIcon.setDisabled(t),
            this.trailingIcon && this.trailingIcon.setDisabled(t);
        }),
        (e.prototype.styleFloating = function (t) {
          var n = e.cssClasses.LABEL_FLOATING;
          t ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (e.prototype.getNativeInput = function () {
          return (
            (this.adapter ? this.adapter.getNativeInput() : null) || {
              disabled: !1,
              maxLength: -1,
              required: !1,
              type: "input",
              validity: { badInput: !1, valid: !0 },
              value: "",
            }
          );
        }),
        e
      );
    })(oe),
    ei = "mdc-dom-focus-sentinel",
    ni = (function () {
      function t(t, e) {
        void 0 === e && (e = {}),
          (this.root = t),
          (this.options = e),
          (this.elFocusedBeforeTrapFocus = null);
      }
      return (
        (t.prototype.trapFocus = function () {
          var t = this.getFocusableElements(this.root);
          if (0 === t.length)
            throw new Error(
              "FocusTrap: Element must have at least one focusable child."
            );
          (this.elFocusedBeforeTrapFocus =
            document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null),
            this.wrapTabFocus(this.root),
            this.options.skipInitialFocus ||
              this.focusInitialElement(t, this.options.initialFocusEl);
        }),
        (t.prototype.releaseFocus = function () {
          [].slice
            .call(this.root.querySelectorAll("." + ei))
            .forEach(function (t) {
              t.parentElement.removeChild(t);
            }),
            !this.options.skipRestoreFocus &&
              this.elFocusedBeforeTrapFocus &&
              this.elFocusedBeforeTrapFocus.focus();
        }),
        (t.prototype.wrapTabFocus = function (t) {
          var e = this,
            n = this.createSentinel(),
            i = this.createSentinel();
          n.addEventListener("focus", function () {
            var n = e.getFocusableElements(t);
            n.length > 0 && n[n.length - 1].focus();
          }),
            i.addEventListener("focus", function () {
              var n = e.getFocusableElements(t);
              n.length > 0 && n[0].focus();
            }),
            t.insertBefore(n, t.children[0]),
            t.appendChild(i);
        }),
        (t.prototype.focusInitialElement = function (t, e) {
          var n = 0;
          e && (n = Math.max(t.indexOf(e), 0)), t[n].focus();
        }),
        (t.prototype.getFocusableElements = function (t) {
          return [].slice
            .call(
              t.querySelectorAll(
                "[autofocus], [tabindex], a, input, textarea, select, button"
              )
            )
            .filter(function (t) {
              var e =
                  "true" === t.getAttribute("aria-disabled") ||
                  null != t.getAttribute("disabled") ||
                  null != t.getAttribute("hidden") ||
                  "true" === t.getAttribute("aria-hidden"),
                n =
                  t.tabIndex >= 0 &&
                  t.getBoundingClientRect().width > 0 &&
                  !t.classList.contains(ei) &&
                  !e,
                i = !1;
              if (n) {
                var o = getComputedStyle(t);
                i = "none" === o.display || "hidden" === o.visibility;
              }
              return n && !i;
            });
        }),
        (t.prototype.createSentinel = function () {
          var t = document.createElement("div");
          return (
            t.setAttribute("tabindex", "0"),
            t.setAttribute("aria-hidden", "true"),
            t.classList.add(ei),
            t
          );
        }),
        t
      );
    })(),
    ii = Object.freeze({ __proto__: null, FocusTrap: ni }),
    oi = "Unknown",
    ri = "Backspace",
    si = "Enter",
    ai = "Spacebar",
    li = "PageUp",
    ci = "PageDown",
    ui = "End",
    di = "Home",
    pi = "ArrowLeft",
    fi = "ArrowUp",
    hi = "ArrowRight",
    mi = "ArrowDown",
    gi = "Delete",
    $i = "Escape",
    yi = "Tab",
    Ii = new Set();
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ Ii.add(ri),
    Ii.add(si),
    Ii.add(ai),
    Ii.add(li),
    Ii.add(ci),
    Ii.add(ui),
    Ii.add(di),
    Ii.add(pi),
    Ii.add(fi),
    Ii.add(hi),
    Ii.add(mi),
    Ii.add(gi),
    Ii.add($i),
    Ii.add(yi);
  var vi = 8,
    Ei = 13,
    bi = 32,
    Ai = 33,
    Ci = 34,
    _i = 35,
    xi = 36,
    Si = 37,
    Ti = 38,
    Oi = 39,
    Li = 40,
    wi = 46,
    Ni = 27,
    Ri = 9,
    Di = new Map();
  Di.set(vi, ri),
    Di.set(Ei, si),
    Di.set(bi, ai),
    Di.set(Ai, li),
    Di.set(Ci, ci),
    Di.set(_i, ui),
    Di.set(xi, di),
    Di.set(Si, pi),
    Di.set(Ti, fi),
    Di.set(Oi, hi),
    Di.set(Li, mi),
    Di.set(wi, gi),
    Di.set(Ni, $i),
    Di.set(Ri, yi);
  var Mi = new Set();
  function Fi(t) {
    var e = t.key;
    if (Ii.has(e)) return e;
    var n = Di.get(t.keyCode);
    return n || oi;
  }
  function ki(t) {
    let e;
    const n = t[9].default,
      i = c(n, t, t[11], null);
    return {
      c() {
        i && i.c();
      },
      m(t, n) {
        i && i.m(t, n), (e = !0);
      },
      p(t, o) {
        i &&
          i.p &&
          (!e || 2048 & o) &&
          p(i, n, t, t[11], e ? d(n, t[11], o, null) : f(t[11]), null);
      },
      i(t) {
        e || (Tt(i, t), (e = !0));
      },
      o(t) {
        Ot(i, t), (e = !1);
      },
      d(t) {
        i && i.d(t);
      },
    };
  }
  function Pi(t) {
    let e, i, o;
    const r = [
      { use: [t[4], ...t[0]] },
      {
        class: Oe({
          [t[1]]: !0,
          "mdc-button__label": "button" === t[5],
          "mdc-fab__label": "fab" === t[5],
          "mdc-tab__text-label": "tab" === t[5],
          "mdc-image-list__label": "image-list" === t[5],
          "mdc-snackbar__label": "snackbar" === t[5],
          "mdc-banner__text": "banner" === t[5],
          "mdc-segmented-button__label": "segmented-button" === t[5],
          "mdc-data-table__pagination-rows-per-page-label":
            "data-table:pagination" === t[5],
          "mdc-data-table__header-cell-label":
            "data-table:sortable-header-cell" === t[5],
        }),
      },
      "snackbar" === t[5] ? { "aria-atomic": "false" } : {},
      { tabindex: t[6] },
      t[7],
    ];
    var s = t[2];
    function a(t) {
      let e = { $$slots: { default: [ki] }, $$scope: { ctx: t } };
      for (let t = 0; t < r.length; t += 1) e = n(e, r[t]);
      return { props: e };
    }
    return (
      s && ((e = new s(a(t))), t[10](e)),
      {
        c() {
          e && Pt(e.$$.fragment), (i = F());
        },
        m(t, n) {
          e && Ut(e, t, n), O(t, i, n), (o = !0);
        },
        p(t, [n]) {
          const o =
            243 & n
              ? Mt(r, [
                  17 & n && { use: [t[4], ...t[0]] },
                  34 & n && {
                    class: Oe({
                      [t[1]]: !0,
                      "mdc-button__label": "button" === t[5],
                      "mdc-fab__label": "fab" === t[5],
                      "mdc-tab__text-label": "tab" === t[5],
                      "mdc-image-list__label": "image-list" === t[5],
                      "mdc-snackbar__label": "snackbar" === t[5],
                      "mdc-banner__text": "banner" === t[5],
                      "mdc-segmented-button__label":
                        "segmented-button" === t[5],
                      "mdc-data-table__pagination-rows-per-page-label":
                        "data-table:pagination" === t[5],
                      "mdc-data-table__header-cell-label":
                        "data-table:sortable-header-cell" === t[5],
                    }),
                  },
                  32 & n &&
                    Ft("snackbar" === t[5] ? { "aria-atomic": "false" } : {}),
                  64 & n && { tabindex: t[6] },
                  128 & n && Ft(t[7]),
                ])
              : {};
          if (
            (2048 & n && (o.$$scope = { dirty: n, ctx: t }), s !== (s = t[2]))
          ) {
            if (e) {
              xt();
              const t = e;
              Ot(t.$$.fragment, 1, 0, () => {
                Ht(t, 1);
              }),
                St();
            }
            s
              ? ((e = new s(a(t))),
                t[10](e),
                Pt(e.$$.fragment),
                Tt(e.$$.fragment, 1),
                Ut(e, i.parentNode, i))
              : (e = null);
          } else s && e.$set(o);
        },
        i(t) {
          o || (e && Tt(e.$$.fragment, t), (o = !0));
        },
        o(t) {
          e && Ot(e.$$.fragment, t), (o = !1);
        },
        d(n) {
          t[10](null), n && L(i), e && Ht(e, n);
        },
      }
    );
  }
  function Ui(t, e, i) {
    const o = ["use", "class", "component", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e;
    const l = De(tt());
    let c,
      { use: u = [] } = e,
      { class: d = "" } = e,
      { component: p = In } = e;
    const f = rt("SMUI:label:context"),
      g = rt("SMUI:label:tabindex");
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(7, (r = m(e, o))),
          "use" in t && i(0, (u = t.use)),
          "class" in t && i(1, (d = t.class)),
          "component" in t && i(2, (p = t.component)),
          "$$scope" in t && i(11, (a = t.$$scope));
      }),
      [
        u,
        d,
        p,
        c,
        l,
        f,
        g,
        r,
        function () {
          return c.getElement();
        },
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (c = t), i(3, c);
          });
        },
        a,
      ]
    );
  }
  Mi.add(li),
    Mi.add(ci),
    Mi.add(ui),
    Mi.add(di),
    Mi.add(pi),
    Mi.add(fi),
    Mi.add(hi),
    Mi.add(mi);
  function Hi(t) {
    let e;
    const n = t[4].default,
      i = c(n, t, t[3], null);
    return {
      c() {
        i && i.c();
      },
      m(t, n) {
        i && i.m(t, n), (e = !0);
      },
      p(t, [o]) {
        i &&
          i.p &&
          (!e || 8 & o) &&
          p(i, n, t, t[3], e ? d(n, t[3], o, null) : f(t[3]), null);
      },
      i(t) {
        e || (Tt(i, t), (e = !0));
      },
      o(t) {
        Ot(i, t), (e = !1);
      },
      d(t) {
        i && i.d(t);
      },
    };
  }
  function Bi(t, e, n) {
    let i,
      { $$slots: o = {}, $$scope: r } = e,
      { key: s } = e,
      { value: a } = e;
    const c = Te(a);
    return (
      l(t, c, (t) => n(5, (i = t))),
      ot(s, c),
      nt(() => {
        c.set(void 0);
      }),
      (t.$$set = (t) => {
        "key" in t && n(1, (s = t.key)),
          "value" in t && n(2, (a = t.value)),
          "$$scope" in t && n(3, (r = t.$$scope));
      }),
      (t.$$.update = () => {
        4 & t.$$.dirty && y(c, (i = a), i);
      }),
      [c, s, a, r, o]
    );
  }
  class Vi extends Vt {
    constructor(t) {
      super(), Bt(this, t, Bi, Hi, a, { key: 1, value: 2 });
    }
  }
  const ji = class extends Vt {
      constructor(t) {
        super(),
          Bt(this, t, Ui, Pi, a, {
            use: 0,
            class: 1,
            component: 2,
            getElement: 8,
          });
      }
      get getElement() {
        return this.$$.ctx[8];
      }
    },
    { applyPassive: Ki } = ae,
    { matches: Gi } = ue;
  function Wi(
    t,
    {
      ripple: e = !0,
      surface: n = !1,
      unbounded: i = !1,
      disabled: o = !1,
      color: r,
      active: s,
      rippleElement: a,
      eventTarget: l,
      activeTarget: c,
      addClass: u = (e) => t.classList.add(e),
      removeClass: d = (e) => t.classList.remove(e),
      addStyle: p = (e, n) => t.style.setProperty(e, n),
      initPromise: f = Promise.resolve(),
    } = {}
  ) {
    let h,
      m,
      g = rt("SMUI:addLayoutListener"),
      $ = s,
      y = l,
      I = c;
    function v() {
      n
        ? (u("mdc-ripple-surface"),
          "primary" === r
            ? (u("smui-ripple-surface--primary"),
              d("smui-ripple-surface--secondary"))
            : "secondary" === r
            ? (d("smui-ripple-surface--primary"),
              u("smui-ripple-surface--secondary"))
            : (d("smui-ripple-surface--primary"),
              d("smui-ripple-surface--secondary")))
        : (d("mdc-ripple-surface"),
          d("smui-ripple-surface--primary"),
          d("smui-ripple-surface--secondary")),
        h &&
          $ !== s &&
          (($ = s), s ? h.activate() : !1 === s && h.deactivate()),
        e && !h
          ? ((h = new ye({
              addClass: u,
              browserSupportsCssVars: () => he(window),
              computeBoundingRect: () => (a || t).getBoundingClientRect(),
              containsEventTarget: (e) => t.contains(e),
              deregisterDocumentInteractionHandler: (t, e) =>
                document.documentElement.removeEventListener(t, e, Ki()),
              deregisterInteractionHandler: (e, n) =>
                (l || t).removeEventListener(e, n, Ki()),
              deregisterResizeHandler: (t) =>
                window.removeEventListener("resize", t),
              getWindowPageOffset: () => ({
                x: window.pageXOffset,
                y: window.pageYOffset,
              }),
              isSurfaceActive: () => (null == s ? Gi(c || t, ":active") : s),
              isSurfaceDisabled: () => !!o,
              isUnbounded: () => !!i,
              registerDocumentInteractionHandler: (t, e) =>
                document.documentElement.addEventListener(t, e, Ki()),
              registerInteractionHandler: (e, n) =>
                (l || t).addEventListener(e, n, Ki()),
              registerResizeHandler: (t) =>
                window.addEventListener("resize", t),
              removeClass: d,
              updateCssVariable: p,
            })),
            f.then(() => {
              h && (h.init(), h.setUnbounded(i));
            }))
          : h &&
            !e &&
            f.then(() => {
              h && (h.destroy(), (h = void 0));
            }),
        !h ||
          (y === l && I === c) ||
          ((y = l),
          (I = c),
          h.destroy(),
          requestAnimationFrame(() => {
            h && (h.init(), h.setUnbounded(i));
          })),
        !e && i && u("mdc-ripple-upgraded--unbounded");
    }
    return (
      v(),
      g &&
        (m = g(function () {
          h && h.layout();
        })),
      {
        update(h) {
          ({
            ripple: e,
            surface: n,
            unbounded: i,
            disabled: o,
            color: r,
            active: s,
            rippleElement: a,
            eventTarget: l,
            activeTarget: c,
            addClass: u,
            removeClass: d,
            addStyle: p,
            initPromise: f,
          } = Object.assign(
            {
              ripple: !0,
              surface: !1,
              unbounded: !1,
              disabled: !1,
              color: void 0,
              active: void 0,
              rippleElement: void 0,
              eventTarget: void 0,
              activeTarget: void 0,
              addClass: (e) => t.classList.add(e),
              removeClass: (e) => t.classList.remove(e),
              addStyle: (e, n) => t.style.setProperty(e, n),
              initPromise: Promise.resolve(),
            },
            h
          )),
            v();
        },
        destroy() {
          h &&
            (h.destroy(),
            (h = void 0),
            d("mdc-ripple-surface"),
            d("smui-ripple-surface--primary"),
            d("smui-ripple-surface--secondary")),
            m && m();
        },
      }
    );
  }
  function zi(t) {
    let e, i, o, a, l, u, h, m;
    const g = t[22].default,
      $ = c(g, t, t[21], null);
    let y = [
        {
          class: (i = Oe({
            [t[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": t[0],
            "mdc-floating-label--required": t[1],
            ...t[8],
          })),
        },
        { style: (o = Object.entries(t[9]).map(Qi).concat([t[4]]).join(" ")) },
        { for: (a = t[5] || (t[11] ? t[11].id : void 0)) },
        t[12],
      ],
      v = {};
    for (let t = 0; t < y.length; t += 1) v = n(v, y[t]);
    return {
      c() {
        (e = N("label")), $ && $.c(), H(e, v);
      },
      m(n, i) {
        O(n, e, i),
          $ && $.m(e, null),
          t[24](e),
          (u = !0),
          h ||
            ((m = [I((l = Fe.call(null, e, t[2]))), I(t[10].call(null, e))]),
            (h = !0));
      },
      p(t, n) {
        $ &&
          $.p &&
          (!u || 2097152 & n) &&
          p($, g, t, t[21], u ? d(g, t[21], n, null) : f(t[21]), null),
          H(
            e,
            (v = Mt(y, [
              (!u ||
                (267 & n &&
                  i !==
                    (i = Oe({
                      [t[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": t[0],
                      "mdc-floating-label--required": t[1],
                      ...t[8],
                    })))) && { class: i },
              (!u ||
                (528 & n &&
                  o !==
                    (o = Object.entries(t[9])
                      .map(Qi)
                      .concat([t[4]])
                      .join(" ")))) && { style: o },
              (!u ||
                (32 & n &&
                  a !== (a = t[5] || (t[11] ? t[11].id : void 0)))) && {
                for: a,
              },
              4096 & n && t[12],
            ]))
          ),
          l && s(l.update) && 4 & n && l.update.call(null, t[2]);
      },
      i(t) {
        u || (Tt($, t), (u = !0));
      },
      o(t) {
        Ot($, t), (u = !1);
      },
      d(n) {
        n && L(e), $ && $.d(n), t[24](null), (h = !1), r(m);
      },
    };
  }
  function qi(t) {
    let e, i, o, a, l, u, h;
    const m = t[22].default,
      g = c(m, t, t[21], null);
    let $ = [
        {
          class: (i = Oe({
            [t[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": t[0],
            "mdc-floating-label--required": t[1],
            ...t[8],
          })),
        },
        { style: (o = Object.entries(t[9]).map(Xi).concat([t[4]]).join(" ")) },
        t[12],
      ],
      y = {};
    for (let t = 0; t < $.length; t += 1) y = n(y, $[t]);
    return {
      c() {
        (e = N("span")), g && g.c(), H(e, y);
      },
      m(n, i) {
        O(n, e, i),
          g && g.m(e, null),
          t[23](e),
          (l = !0),
          u ||
            ((h = [I((a = Fe.call(null, e, t[2]))), I(t[10].call(null, e))]),
            (u = !0));
      },
      p(t, n) {
        g &&
          g.p &&
          (!l || 2097152 & n) &&
          p(g, m, t, t[21], l ? d(m, t[21], n, null) : f(t[21]), null),
          H(
            e,
            (y = Mt($, [
              (!l ||
                (267 & n &&
                  i !==
                    (i = Oe({
                      [t[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": t[0],
                      "mdc-floating-label--required": t[1],
                      ...t[8],
                    })))) && { class: i },
              (!l ||
                (528 & n &&
                  o !==
                    (o = Object.entries(t[9])
                      .map(Xi)
                      .concat([t[4]])
                      .join(" ")))) && { style: o },
              4096 & n && t[12],
            ]))
          ),
          a && s(a.update) && 4 & n && a.update.call(null, t[2]);
      },
      i(t) {
        l || (Tt(g, t), (l = !0));
      },
      o(t) {
        Ot(g, t), (l = !1);
      },
      d(n) {
        n && L(e), g && g.d(n), t[23](null), (u = !1), r(h);
      },
    };
  }
  function Yi(t) {
    let e, n, i, o;
    const r = [qi, zi],
      s = [];
    function a(t, e) {
      return t[6] ? 0 : 1;
    }
    return (
      (e = a(t)),
      (n = s[e] = r[e](t)),
      {
        c() {
          n.c(), (i = F());
        },
        m(t, n) {
          s[e].m(t, n), O(t, i, n), (o = !0);
        },
        p(t, [o]) {
          let l = e;
          (e = a(t)),
            e === l
              ? s[e].p(t, o)
              : (xt(),
                Ot(s[l], 1, 1, () => {
                  s[l] = null;
                }),
                St(),
                (n = s[e]),
                n ? n.p(t, o) : ((n = s[e] = r[e](t)), n.c()),
                Tt(n, 1),
                n.m(i.parentNode, i));
        },
        i(t) {
          o || (Tt(n), (o = !0));
        },
        o(t) {
          Ot(n), (o = !1);
        },
        d(t) {
          s[e].d(t), t && L(i);
        },
      }
    );
  }
  const Xi = ([t, e]) => `${t}: ${e};`,
    Qi = ([t, e]) => `${t}: ${e};`;
  function Ji(t, e, i) {
    const o = [
      "use",
      "class",
      "style",
      "for",
      "floatAbove",
      "required",
      "wrapped",
      "shake",
      "float",
      "setRequired",
      "getWidth",
      "getElement",
    ];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e;
    var l;
    const c = De(tt());
    let u,
      d,
      { use: p = [] } = e,
      { class: f = "" } = e,
      { style: g = "" } = e,
      { for: $ } = e,
      { floatAbove: y = !1 } = e,
      { required: I = !1 } = e,
      { wrapped: v = !1 } = e,
      E = {},
      b = {},
      A =
        null !== (l = rt("SMUI:generic:input:props")) && void 0 !== l ? l : {},
      C = y,
      _ = I;
    function x(t) {
      E[t] || i(8, (E[t] = !0), E);
    }
    function S(t) {
      (t in E && !E[t]) || i(8, (E[t] = !1), E);
    }
    function T(t, e) {
      b[t] != e &&
        ("" === e || null == e ? (delete b[t], i(9, b)) : i(9, (b[t] = e), b));
    }
    function O(t) {
      t in b && (delete b[t], i(9, b));
    }
    function L() {
      return u;
    }
    return (
      et(() => {
        i(
          18,
          (d = new Hn({
            addClass: x,
            removeClass: S,
            getWidth: () => {
              var t, e;
              const n = L(),
                i = n.cloneNode(!0);
              null === (t = n.parentNode) || void 0 === t || t.appendChild(i),
                i.classList.add("smui-floating-label--remove-transition"),
                i.classList.add("smui-floating-label--force-size"),
                i.classList.remove("mdc-floating-label--float-above");
              const o = i.scrollWidth;
              return (
                null === (e = n.parentNode) || void 0 === e || e.removeChild(i),
                o
              );
            },
            registerInteractionHandler: (t, e) => L().addEventListener(t, e),
            deregisterInteractionHandler: (t, e) =>
              L().removeEventListener(t, e),
          }))
        );
        const t = {
          get element() {
            return L();
          },
          addStyle: T,
          removeStyle: O,
        };
        return (
          Le(u, "SMUIFloatingLabel:mount", t),
          d.init(),
          () => {
            Le(u, "SMUIFloatingLabel:unmount", t), d.destroy();
          }
        );
      }),
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(12, (r = m(e, o))),
          "use" in t && i(2, (p = t.use)),
          "class" in t && i(3, (f = t.class)),
          "style" in t && i(4, (g = t.style)),
          "for" in t && i(5, ($ = t.for)),
          "floatAbove" in t && i(0, (y = t.floatAbove)),
          "required" in t && i(1, (I = t.required)),
          "wrapped" in t && i(6, (v = t.wrapped)),
          "$$scope" in t && i(21, (a = t.$$scope));
      }),
      (t.$$.update = () => {
        786433 & t.$$.dirty && d && C !== y && (i(19, (C = y)), d.float(y)),
          1310722 & t.$$.dirty &&
            d &&
            _ !== I &&
            (i(20, (_ = I)), d.setRequired(I));
      }),
      [
        y,
        I,
        p,
        f,
        g,
        $,
        v,
        u,
        E,
        b,
        c,
        A,
        r,
        function (t) {
          d.shake(t);
        },
        function (t) {
          i(0, (y = t));
        },
        function (t) {
          i(1, (I = t));
        },
        function () {
          return d.getWidth();
        },
        L,
        d,
        C,
        _,
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(7, u);
          });
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(7, u);
          });
        },
      ]
    );
  }
  class Zi extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, Ji, Yi, a, {
          use: 2,
          class: 3,
          style: 4,
          for: 5,
          floatAbove: 0,
          required: 1,
          wrapped: 6,
          shake: 13,
          float: 14,
          setRequired: 15,
          getWidth: 16,
          getElement: 17,
        });
    }
    get shake() {
      return this.$$.ctx[13];
    }
    get float() {
      return this.$$.ctx[14];
    }
    get setRequired() {
      return this.$$.ctx[15];
    }
    get getWidth() {
      return this.$$.ctx[16];
    }
    get getElement() {
      return this.$$.ctx[17];
    }
  }
  function to(e) {
    let i,
      o,
      a,
      l,
      c,
      u,
      d = [
        {
          class: (o = Oe({
            [e[1]]: !0,
            "mdc-line-ripple": !0,
            "mdc-line-ripple--active": e[3],
            ...e[5],
          })),
        },
        { style: (a = Object.entries(e[6]).map(eo).concat([e[2]]).join(" ")) },
        e[8],
      ],
      p = {};
    for (let t = 0; t < d.length; t += 1) p = n(p, d[t]);
    return {
      c() {
        (i = N("div")), H(i, p);
      },
      m(t, n) {
        O(t, i, n),
          e[13](i),
          c ||
            ((u = [I((l = Fe.call(null, i, e[0]))), I(e[7].call(null, i))]),
            (c = !0));
      },
      p(t, [e]) {
        H(
          i,
          (p = Mt(d, [
            42 & e &&
              o !==
                (o = Oe({
                  [t[1]]: !0,
                  "mdc-line-ripple": !0,
                  "mdc-line-ripple--active": t[3],
                  ...t[5],
                })) && { class: o },
            68 & e &&
              a !==
                (a = Object.entries(t[6]).map(eo).concat([t[2]]).join(" ")) && {
                style: a,
              },
            256 & e && t[8],
          ]))
        ),
          l && s(l.update) && 1 & e && l.update.call(null, t[0]);
      },
      i: t,
      o: t,
      d(t) {
        t && L(i), e[13](null), (c = !1), r(u);
      },
    };
  }
  const eo = ([t, e]) => `${t}: ${e};`;
  function no(t, e, i) {
    const o = [
      "use",
      "class",
      "style",
      "active",
      "activate",
      "deactivate",
      "setRippleCenter",
      "getElement",
    ];
    let r = m(e, o);
    const s = De(tt());
    let a,
      l,
      { use: c = [] } = e,
      { class: u = "" } = e,
      { style: d = "" } = e,
      { active: p = !1 } = e,
      f = {},
      g = {};
    function $(t) {
      return t in f ? f[t] : E().classList.contains(t);
    }
    function y(t) {
      f[t] || i(5, (f[t] = !0), f);
    }
    function I(t) {
      (t in f && !f[t]) || i(5, (f[t] = !1), f);
    }
    function v(t, e) {
      g[t] != e &&
        ("" === e || null == e ? (delete g[t], i(6, g)) : i(6, (g[t] = e), g));
    }
    function E() {
      return a;
    }
    return (
      et(
        () => (
          (l = new Vn({
            addClass: y,
            removeClass: I,
            hasClass: $,
            setStyle: v,
            registerEventHandler: (t, e) => E().addEventListener(t, e),
            deregisterEventHandler: (t, e) => E().removeEventListener(t, e),
          })),
          l.init(),
          () => {
            l.destroy();
          }
        )
      ),
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(8, (r = m(e, o))),
          "use" in t && i(0, (c = t.use)),
          "class" in t && i(1, (u = t.class)),
          "style" in t && i(2, (d = t.style)),
          "active" in t && i(3, (p = t.active));
      }),
      [
        c,
        u,
        d,
        p,
        a,
        f,
        g,
        s,
        r,
        function () {
          l.activate();
        },
        function () {
          l.deactivate();
        },
        function (t) {
          l.setRippleCenter(t);
        },
        E,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (a = t), i(4, a);
          });
        },
      ]
    );
  }
  class io extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, no, to, a, {
          use: 0,
          class: 1,
          style: 2,
          active: 3,
          activate: 9,
          deactivate: 10,
          setRippleCenter: 11,
          getElement: 12,
        });
    }
    get activate() {
      return this.$$.ctx[9];
    }
    get deactivate() {
      return this.$$.ctx[10];
    }
    get setRippleCenter() {
      return this.$$.ctx[11];
    }
    get getElement() {
      return this.$$.ctx[12];
    }
  }
  function oo(t) {
    let e, n, i;
    const o = t[14].default,
      r = c(o, t, t[13], null);
    return {
      c() {
        (e = N("div")),
          r && r.c(),
          U(e, "class", "mdc-notched-outline__notch"),
          U(e, "style", (n = Object.entries(t[7]).map(so).join(" ")));
      },
      m(t, n) {
        O(t, e, n), r && r.m(e, null), (i = !0);
      },
      p(t, s) {
        r &&
          r.p &&
          (!i || 8192 & s) &&
          p(r, o, t, t[13], i ? d(o, t[13], s, null) : f(t[13]), null),
          (!i ||
            (128 & s && n !== (n = Object.entries(t[7]).map(so).join(" ")))) &&
            U(e, "style", n);
      },
      i(t) {
        i || (Tt(r, t), (i = !0));
      },
      o(t) {
        Ot(r, t), (i = !1);
      },
      d(t) {
        t && L(e), r && r.d(t);
      },
    };
  }
  function ro(t) {
    let e,
      i,
      o,
      a,
      l,
      c,
      u,
      d,
      p,
      f,
      h = !t[3] && oo(t),
      m = [
        {
          class: (c = Oe({
            [t[1]]: !0,
            "mdc-notched-outline": !0,
            "mdc-notched-outline--notched": t[2],
            "mdc-notched-outline--no-label": t[3],
            ...t[6],
          })),
        },
        t[9],
      ],
      g = {};
    for (let t = 0; t < m.length; t += 1) g = n(g, m[t]);
    return {
      c() {
        (e = N("div")),
          (i = N("div")),
          (o = M()),
          h && h.c(),
          (a = M()),
          (l = N("div")),
          U(i, "class", "mdc-notched-outline__leading"),
          U(l, "class", "mdc-notched-outline__trailing"),
          H(e, g);
      },
      m(n, r) {
        O(n, e, r),
          x(e, i),
          x(e, o),
          h && h.m(e, null),
          x(e, a),
          x(e, l),
          t[15](e),
          (d = !0),
          p ||
            ((f = [
              I((u = Fe.call(null, e, t[0]))),
              I(t[8].call(null, e)),
              k(e, "SMUIFloatingLabel:mount", t[16]),
              k(e, "SMUIFloatingLabel:unmount", t[17]),
            ]),
            (p = !0));
      },
      p(t, [n]) {
        t[3]
          ? h &&
            (xt(),
            Ot(h, 1, 1, () => {
              h = null;
            }),
            St())
          : h
          ? (h.p(t, n), 8 & n && Tt(h, 1))
          : ((h = oo(t)), h.c(), Tt(h, 1), h.m(e, a)),
          H(
            e,
            (g = Mt(m, [
              (!d ||
                (78 & n &&
                  c !==
                    (c = Oe({
                      [t[1]]: !0,
                      "mdc-notched-outline": !0,
                      "mdc-notched-outline--notched": t[2],
                      "mdc-notched-outline--no-label": t[3],
                      ...t[6],
                    })))) && { class: c },
              512 & n && t[9],
            ]))
          ),
          u && s(u.update) && 1 & n && u.update.call(null, t[0]);
      },
      i(t) {
        d || (Tt(h), (d = !0));
      },
      o(t) {
        Ot(h), (d = !1);
      },
      d(n) {
        n && L(e), h && h.d(), t[15](null), (p = !1), r(f);
      },
    };
  }
  const so = ([t, e]) => `${t}: ${e};`;
  function ao(t, e, i) {
    const o = [
      "use",
      "class",
      "notched",
      "noLabel",
      "notch",
      "closeNotch",
      "getElement",
    ];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e;
    const l = De(tt());
    let c,
      u,
      d,
      { use: p = [] } = e,
      { class: f = "" } = e,
      { notched: g = !1 } = e,
      { noLabel: $ = !1 } = e,
      y = {},
      I = {};
    function v(t) {
      y[t] || i(6, (y[t] = !0), y);
    }
    function E(t) {
      (t in y && !y[t]) || i(6, (y[t] = !1), y);
    }
    et(
      () => (
        (u = new Wn({
          addClass: v,
          removeClass: E,
          setNotchWidthProperty: (t) => {
            return (
              (n = t + "px"),
              void (
                I[(e = "width")] != n &&
                ("" === n || null == n
                  ? (delete I[e], i(7, I))
                  : i(7, (I[e] = n), I))
              )
            );
            var e, n;
          },
          removeNotchWidthProperty: () => {
            var t;
            (t = "width") in I && (delete I[t], i(7, I));
          },
        })),
        u.init(),
        () => {
          u.destroy();
        }
      )
    );
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(9, (r = m(e, o))),
          "use" in t && i(0, (p = t.use)),
          "class" in t && i(1, (f = t.class)),
          "notched" in t && i(2, (g = t.notched)),
          "noLabel" in t && i(3, ($ = t.noLabel)),
          "$$scope" in t && i(13, (a = t.$$scope));
      }),
      (t.$$.update = () => {
        16 & t.$$.dirty &&
          (d
            ? (d.addStyle("transition-duration", "0s"),
              v("mdc-notched-outline--upgraded"),
              requestAnimationFrame(() => {
                d && d.removeStyle("transition-duration");
              }))
            : E("mdc-notched-outline--upgraded"));
      }),
      [
        p,
        f,
        g,
        $,
        d,
        c,
        y,
        I,
        l,
        r,
        function (t) {
          u.notch(t);
        },
        function () {
          u.closeNotch();
        },
        function () {
          return c;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (c = t), i(5, c);
          });
        },
        (t) => i(4, (d = t.detail)),
        () => i(4, (d = void 0)),
      ]
    );
  }
  class lo extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, ao, ro, a, {
          use: 0,
          class: 1,
          notched: 2,
          noLabel: 3,
          notch: 10,
          closeNotch: 11,
          getElement: 12,
        });
    }
    get notch() {
      return this.$$.ctx[10];
    }
    get closeNotch() {
      return this.$$.ctx[11];
    }
    get getElement() {
      return this.$$.ctx[12];
    }
  }
  var co = Qe({ class: "mdc-text-field-helper-line", component: Cn }),
    uo = Qe({
      class: "mdc-text-field__affix mdc-text-field__affix--prefix",
      component: Nn,
    }),
    po = Qe({
      class: "mdc-text-field__affix mdc-text-field__affix--suffix",
      component: Nn,
    });
  function fo(e) {
    let i,
      o,
      a,
      l,
      c,
      u = [
        { class: (o = Oe({ [e[1]]: !0, "mdc-text-field__input": !0 })) },
        { type: e[2] },
        { placeholder: e[3] },
        e[4],
        e[6],
        e[10],
      ],
      d = {};
    for (let t = 0; t < u.length; t += 1) d = n(d, u[t]);
    return {
      c() {
        (i = N("input")), H(i, d);
      },
      m(t, n) {
        O(t, i, n),
          i.autofocus && i.focus(),
          e[26](i),
          l ||
            ((c = [
              I((a = Fe.call(null, i, e[0]))),
              I(e[7].call(null, i)),
              k(i, "input", e[27]),
              k(i, "change", e[9]),
              k(i, "blur", e[24]),
              k(i, "focus", e[25]),
            ]),
            (l = !0));
      },
      p(t, [e]) {
        H(
          i,
          (d = Mt(u, [
            2 & e &&
              o !== (o = Oe({ [t[1]]: !0, "mdc-text-field__input": !0 })) && {
                class: o,
              },
            4 & e && { type: t[2] },
            8 & e && { placeholder: t[3] },
            16 & e && t[4],
            64 & e && t[6],
            1024 & e && t[10],
          ]))
        ),
          a && s(a.update) && 1 & e && a.update.call(null, t[0]);
      },
      i: t,
      o: t,
      d(t) {
        t && L(i), e[26](null), (l = !1), r(c);
      },
    };
  }
  function ho(t, e, i) {
    const o = [
      "use",
      "class",
      "type",
      "placeholder",
      "value",
      "files",
      "dirty",
      "invalid",
      "updateInvalid",
      "emptyValueNull",
      "emptyValueUndefined",
      "getAttr",
      "addAttr",
      "removeAttr",
      "focus",
      "blur",
      "getElement",
    ];
    let r = m(e, o);
    const s = De(tt());
    let a = () => {};
    let { use: l = [] } = e,
      { class: c = "" } = e,
      { type: u = "text" } = e,
      { placeholder: d = " " } = e,
      { value: p = a } = e;
    const f = (function (t) {
      return t === a;
    })(p);
    f && (p = "");
    let { files: g = null } = e,
      { dirty: $ = !1 } = e,
      { invalid: y = !1 } = e,
      { updateInvalid: I = !0 } = e,
      { emptyValueNull: v = null === p } = e;
    f && v && (p = null);
    let E,
      { emptyValueUndefined: b = void 0 === p } = e;
    f && b && (p = void 0);
    let A = {},
      C = {};
    function _(t) {
      if ("file" !== u)
        if ("" === t.currentTarget.value && v) i(11, (p = null));
        else if ("" === t.currentTarget.value && b) i(11, (p = void 0));
        else
          switch (u) {
            case "number":
            case "range":
              i(
                11,
                (p = (function (t) {
                  if ("" === t) {
                    const t = new Number(Number.NaN);
                    return (t.length = 0), t;
                  }
                  return +t;
                })(t.currentTarget.value))
              );
              break;
            default:
              i(11, (p = t.currentTarget.value));
          }
      else i(12, (g = t.currentTarget.files));
    }
    function x() {
      return E;
    }
    et(() => {
      I && i(14, (y = E.matches(":invalid")));
    });
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(10, (r = m(e, o))),
          "use" in t && i(0, (l = t.use)),
          "class" in t && i(1, (c = t.class)),
          "type" in t && i(2, (u = t.type)),
          "placeholder" in t && i(3, (d = t.placeholder)),
          "value" in t && i(11, (p = t.value)),
          "files" in t && i(12, (g = t.files)),
          "dirty" in t && i(13, ($ = t.dirty)),
          "invalid" in t && i(14, (y = t.invalid)),
          "updateInvalid" in t && i(15, (I = t.updateInvalid)),
          "emptyValueNull" in t && i(16, (v = t.emptyValueNull)),
          "emptyValueUndefined" in t && i(17, (b = t.emptyValueUndefined));
      }),
      (t.$$.update = () => {
        2068 & t.$$.dirty &&
          ("file" === u
            ? (delete C.value, i(4, C), i(2, u), i(11, p))
            : i(4, (C.value = null == p ? "" : p), C));
      }),
      [
        l,
        c,
        u,
        d,
        C,
        E,
        A,
        s,
        _,
        function (t) {
          ("file" !== u && "range" !== u) || _(t),
            i(13, ($ = !0)),
            I && i(14, (y = E.matches(":invalid")));
        },
        r,
        p,
        g,
        $,
        y,
        I,
        v,
        b,
        function (t) {
          var e;
          return t in A
            ? null !== (e = A[t]) && void 0 !== e
              ? e
              : null
            : x().getAttribute(t);
        },
        function (t, e) {
          A[t] !== e && i(6, (A[t] = e), A);
        },
        function (t) {
          (t in A && null == A[t]) || i(6, (A[t] = void 0), A);
        },
        function () {
          x().focus();
        },
        function () {
          x().blur();
        },
        x,
        function (e) {
          st.call(this, t, e);
        },
        function (e) {
          st.call(this, t, e);
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (E = t), i(5, E);
          });
        },
        (t) => "file" !== u && _(t),
      ]
    );
  }
  class mo extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, ho, fo, a, {
          use: 0,
          class: 1,
          type: 2,
          placeholder: 3,
          value: 11,
          files: 12,
          dirty: 13,
          invalid: 14,
          updateInvalid: 15,
          emptyValueNull: 16,
          emptyValueUndefined: 17,
          getAttr: 18,
          addAttr: 19,
          removeAttr: 20,
          focus: 21,
          blur: 22,
          getElement: 23,
        });
    }
    get getAttr() {
      return this.$$.ctx[18];
    }
    get addAttr() {
      return this.$$.ctx[19];
    }
    get removeAttr() {
      return this.$$.ctx[20];
    }
    get focus() {
      return this.$$.ctx[21];
    }
    get blur() {
      return this.$$.ctx[22];
    }
    get getElement() {
      return this.$$.ctx[23];
    }
  }
  function go(e) {
    let i,
      o,
      a,
      l,
      c,
      u,
      d = [
        { class: (o = Oe({ [e[2]]: !0, "mdc-text-field__input": !0 })) },
        { style: (a = `${e[4] ? "" : "resize: none; "}${e[3]}`) },
        e[6],
        e[9],
      ],
      p = {};
    for (let t = 0; t < d.length; t += 1) p = n(p, d[t]);
    return {
      c() {
        (i = N("textarea")), H(i, p);
      },
      m(t, n) {
        O(t, i, n),
          i.autofocus && i.focus(),
          e[21](i),
          V(i, e[0]),
          c ||
            ((u = [
              I((l = Fe.call(null, i, e[1]))),
              I(e[7].call(null, i)),
              k(i, "change", e[8]),
              k(i, "blur", e[19]),
              k(i, "focus", e[20]),
              k(i, "input", e[22]),
            ]),
            (c = !0));
      },
      p(t, [e]) {
        H(
          i,
          (p = Mt(d, [
            4 & e &&
              o !== (o = Oe({ [t[2]]: !0, "mdc-text-field__input": !0 })) && {
                class: o,
              },
            24 & e &&
              a !== (a = `${t[4] ? "" : "resize: none; "}${t[3]}`) && {
                style: a,
              },
            64 & e && t[6],
            512 & e && t[9],
          ]))
        ),
          l && s(l.update) && 2 & e && l.update.call(null, t[1]),
          1 & e && V(i, t[0]);
      },
      i: t,
      o: t,
      d(t) {
        t && L(i), e[21](null), (c = !1), r(u);
      },
    };
  }
  function $o(t, e, i) {
    const o = [
      "use",
      "class",
      "style",
      "value",
      "dirty",
      "invalid",
      "updateInvalid",
      "resizable",
      "getAttr",
      "addAttr",
      "removeAttr",
      "focus",
      "blur",
      "getElement",
    ];
    let r = m(e, o);
    const s = De(tt());
    let a,
      { use: l = [] } = e,
      { class: c = "" } = e,
      { style: u = "" } = e,
      { value: d = "" } = e,
      { dirty: p = !1 } = e,
      { invalid: f = !1 } = e,
      { updateInvalid: g = !0 } = e,
      { resizable: $ = !0 } = e,
      y = {};
    function I() {
      return a;
    }
    return (
      et(() => {
        g && i(11, (f = a.matches(":invalid")));
      }),
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(9, (r = m(e, o))),
          "use" in t && i(1, (l = t.use)),
          "class" in t && i(2, (c = t.class)),
          "style" in t && i(3, (u = t.style)),
          "value" in t && i(0, (d = t.value)),
          "dirty" in t && i(10, (p = t.dirty)),
          "invalid" in t && i(11, (f = t.invalid)),
          "updateInvalid" in t && i(12, (g = t.updateInvalid)),
          "resizable" in t && i(4, ($ = t.resizable));
      }),
      [
        d,
        l,
        c,
        u,
        $,
        a,
        y,
        s,
        function () {
          i(10, (p = !0)), g && i(11, (f = a.matches(":invalid")));
        },
        r,
        p,
        f,
        g,
        function (t) {
          var e;
          return t in y
            ? null !== (e = y[t]) && void 0 !== e
              ? e
              : null
            : I().getAttribute(t);
        },
        function (t, e) {
          y[t] !== e && i(6, (y[t] = e), y);
        },
        function (t) {
          (t in y && null == y[t]) || i(6, (y[t] = void 0), y);
        },
        function () {
          I().focus();
        },
        function () {
          I().blur();
        },
        I,
        function (e) {
          st.call(this, t, e);
        },
        function (e) {
          st.call(this, t, e);
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (a = t), i(5, a);
          });
        },
        function () {
          (d = this.value), i(0, d);
        },
      ]
    );
  }
  class yo extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, $o, go, a, {
          use: 1,
          class: 2,
          style: 3,
          value: 0,
          dirty: 10,
          invalid: 11,
          updateInvalid: 12,
          resizable: 4,
          getAttr: 13,
          addAttr: 14,
          removeAttr: 15,
          focus: 16,
          blur: 17,
          getElement: 18,
        });
    }
    get getAttr() {
      return this.$$.ctx[13];
    }
    get addAttr() {
      return this.$$.ctx[14];
    }
    get removeAttr() {
      return this.$$.ctx[15];
    }
    get focus() {
      return this.$$.ctx[16];
    }
    get blur() {
      return this.$$.ctx[17];
    }
    get getElement() {
      return this.$$.ctx[18];
    }
  }
  const Io = (t) => ({}),
    vo = (t) => ({}),
    Eo = (t) => ({}),
    bo = (t) => ({}),
    Ao = (t) => ({}),
    Co = (t) => ({}),
    _o = (t) => ({}),
    xo = (t) => ({}),
    So = (t) => ({}),
    To = (t) => ({}),
    Oo = (t) => ({}),
    Lo = (t) => ({}),
    wo = (t) => ({}),
    No = (t) => ({}),
    Ro = (t) => ({}),
    Do = (t) => ({}),
    Mo = (t) => ({}),
    Fo = (t) => ({}),
    ko = (t) => ({}),
    Po = (t) => ({}),
    Uo = (t) => ({}),
    Ho = (t) => ({}),
    Bo = (t) => ({}),
    Vo = (t) => ({});
  function jo(t) {
    let e, i, o, a, l, u, h, m, g, $, y, v, E, b;
    const A = t[51].label,
      C = c(A, t, t[90], To);
    o = new Vi({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [Go] },
        $$scope: { ctx: t },
      },
    });
    const _ = t[51].default,
      S = c(_, t, t[90], null);
    u = new Vi({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !1,
        $$slots: { default: [Wo] },
        $$scope: { ctx: t },
      },
    });
    const T = t[51].ripple,
      w = c(T, t, t[90], bo);
    let R = [
        {
          class: (m = Oe({
            [t[9]]: !0,
            "mdc-text-field": !0,
            "mdc-text-field--disabled": t[12],
            "mdc-text-field--textarea": t[14],
            "mdc-text-field--filled": "filled" === t[15],
            "mdc-text-field--outlined": "outlined" === t[15],
            "smui-text-field--standard": "standard" === t[15] && !t[14],
            "mdc-text-field--no-label": t[16] || !t[42].label,
            "mdc-text-field--with-leading-icon": t[42].leadingIcon,
            "mdc-text-field--with-trailing-icon": t[42].trailingIcon,
            "mdc-text-field--invalid": t[1],
            ...t[25],
          })),
        },
        {
          style: (g = Object.entries(t[26]).map(hr).concat([t[10]]).join(" ")),
        },
        we(t[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      D = {};
    for (let t = 0; t < R.length; t += 1) D = n(D, R[t]);
    return {
      c() {
        (e = N("div")),
          C && C.c(),
          (i = M()),
          Pt(o.$$.fragment),
          (a = M()),
          S && S.c(),
          (l = M()),
          Pt(u.$$.fragment),
          (h = M()),
          w && w.c(),
          H(e, D);
      },
      m(n, r) {
        O(n, e, r),
          C && C.m(e, null),
          x(e, i),
          Ut(o, e, null),
          x(e, a),
          S && S.m(e, null),
          x(e, l),
          Ut(u, e, null),
          x(e, h),
          w && w.m(e, null),
          t[80](e),
          (v = !0),
          E ||
            ((b = [
              I(
                ($ = Wi.call(null, e, {
                  ripple: t[11],
                  unbounded: !1,
                  addClass: t[38],
                  removeClass: t[39],
                  addStyle: t[40],
                }))
              ),
              I((y = Fe.call(null, e, t[8]))),
              I(t[34].call(null, e)),
              k(e, "SMUITextfieldLeadingIcon:mount", t[81]),
              k(e, "SMUITextfieldLeadingIcon:unmount", t[82]),
              k(e, "SMUITextfieldTrailingIcon:mount", t[83]),
              k(e, "SMUITextfieldTrailingIcon:unmount", t[84]),
            ]),
            (E = !0));
      },
      p(t, n) {
        C &&
          C.p &&
          (!v || 268435456 & n[2]) &&
          p(C, A, t, t[90], v ? d(A, t[90], n, So) : f(t[90]), To);
        const i = {};
        268435456 & n[2] && (i.$$scope = { dirty: n, ctx: t }),
          o.$set(i),
          S &&
            S.p &&
            (!v || 268435456 & n[2]) &&
            p(S, _, t, t[90], v ? d(_, t[90], n, null) : f(t[90]), null);
        const r = {};
        268435456 & n[2] && (r.$$scope = { dirty: n, ctx: t }),
          u.$set(r),
          w &&
            w.p &&
            (!v || 268435456 & n[2]) &&
            p(w, T, t, t[90], v ? d(T, t[90], n, Eo) : f(t[90]), bo),
          H(
            e,
            (D = Mt(R, [
              (!v ||
                ((33673730 & n[0]) | (2048 & n[1]) &&
                  m !==
                    (m = Oe({
                      [t[9]]: !0,
                      "mdc-text-field": !0,
                      "mdc-text-field--disabled": t[12],
                      "mdc-text-field--textarea": t[14],
                      "mdc-text-field--filled": "filled" === t[15],
                      "mdc-text-field--outlined": "outlined" === t[15],
                      "smui-text-field--standard":
                        "standard" === t[15] && !t[14],
                      "mdc-text-field--no-label": t[16] || !t[42].label,
                      "mdc-text-field--with-leading-icon": t[42].leadingIcon,
                      "mdc-text-field--with-trailing-icon": t[42].trailingIcon,
                      "mdc-text-field--invalid": t[1],
                      ...t[25],
                    })))) && { class: m },
              (!v ||
                (67109888 & n[0] &&
                  g !==
                    (g = Object.entries(t[26])
                      .map(hr)
                      .concat([t[10]])
                      .join(" ")))) && { style: g },
              1024 & n[1] &&
                we(t[41], [
                  "input$",
                  "label$",
                  "ripple$",
                  "outline$",
                  "helperLine$",
                ]),
            ]))
          ),
          $ &&
            s($.update) &&
            2048 & n[0] &&
            $.update.call(null, {
              ripple: t[11],
              unbounded: !1,
              addClass: t[38],
              removeClass: t[39],
              addStyle: t[40],
            }),
          y && s(y.update) && 256 & n[0] && y.update.call(null, t[8]);
      },
      i(t) {
        v ||
          (Tt(C, t),
          Tt(o.$$.fragment, t),
          Tt(S, t),
          Tt(u.$$.fragment, t),
          Tt(w, t),
          (v = !0));
      },
      o(t) {
        Ot(C, t),
          Ot(o.$$.fragment, t),
          Ot(S, t),
          Ot(u.$$.fragment, t),
          Ot(w, t),
          (v = !1);
      },
      d(n) {
        n && L(e),
          C && C.d(n),
          Ht(o),
          S && S.d(n),
          Ht(u),
          w && w.d(n),
          t[80](null),
          (E = !1),
          r(b);
      },
    };
  }
  function Ko(t) {
    let e,
      i,
      o,
      a,
      l,
      u,
      h,
      m,
      g,
      $,
      y,
      v,
      E,
      b,
      A,
      C,
      _,
      S,
      T = !t[14] && "outlined" !== t[15] && zo(t),
      w = (t[14] || "outlined" === t[15]) && Qo(t);
    a = new Vi({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [er] },
        $$scope: { ctx: t },
      },
    });
    const R = t[51].default,
      D = c(R, t, t[90], null),
      F = [ir, nr],
      P = [];
    function U(t, e) {
      return t[14] && "string" == typeof t[0] ? 0 : 1;
    }
    (h = U(t)),
      (m = P[h] = F[h](t)),
      ($ = new Vi({
        props: {
          key: "SMUI:textfield:icon:leading",
          value: !1,
          $$slots: { default: [lr] },
          $$scope: { ctx: t },
        },
      }));
    let B = !t[14] && "outlined" !== t[15] && t[11] && cr(t),
      V = [
        {
          class: (v = Oe({
            [t[9]]: !0,
            "mdc-text-field": !0,
            "mdc-text-field--disabled": t[12],
            "mdc-text-field--textarea": t[14],
            "mdc-text-field--filled": "filled" === t[15],
            "mdc-text-field--outlined": "outlined" === t[15],
            "smui-text-field--standard": "standard" === t[15] && !t[14],
            "mdc-text-field--no-label":
              t[16] || (null == t[17] && !t[42].label),
            "mdc-text-field--label-floating":
              t[28] || (null != t[0] && "" !== t[0]),
            "mdc-text-field--with-leading-icon": t[35](t[22])
              ? t[42].leadingIcon
              : t[22],
            "mdc-text-field--with-trailing-icon": t[35](t[23])
              ? t[42].trailingIcon
              : t[23],
            "mdc-text-field--with-internal-counter":
              t[14] && t[42].internalCounter,
            "mdc-text-field--invalid": t[1],
            ...t[25],
          })),
        },
        {
          style: (E = Object.entries(t[26]).map(fr).concat([t[10]]).join(" ")),
        },
        { for: void 0 },
        we(t[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      j = {};
    for (let t = 0; t < V.length; t += 1) j = n(j, V[t]);
    return {
      c() {
        (e = N("label")),
          T && T.c(),
          (i = M()),
          w && w.c(),
          (o = M()),
          Pt(a.$$.fragment),
          (l = M()),
          D && D.c(),
          (u = M()),
          m.c(),
          (g = M()),
          Pt($.$$.fragment),
          (y = M()),
          B && B.c(),
          H(e, j);
      },
      m(n, r) {
        O(n, e, r),
          T && T.m(e, null),
          x(e, i),
          w && w.m(e, null),
          x(e, o),
          Ut(a, e, null),
          x(e, l),
          D && D.m(e, null),
          x(e, u),
          P[h].m(e, null),
          x(e, g),
          Ut($, e, null),
          x(e, y),
          B && B.m(e, null),
          t[73](e),
          (C = !0),
          _ ||
            ((S = [
              I(
                (b = Wi.call(null, e, {
                  ripple: !t[14] && "filled" === t[15],
                  unbounded: !1,
                  addClass: t[38],
                  removeClass: t[39],
                  addStyle: t[40],
                  eventTarget: t[33],
                  activeTarget: t[33],
                  initPromise: t[37],
                }))
              ),
              I((A = Fe.call(null, e, t[8]))),
              I(t[34].call(null, e)),
              k(e, "SMUITextfieldLeadingIcon:mount", t[74]),
              k(e, "SMUITextfieldLeadingIcon:unmount", t[75]),
              k(e, "SMUITextfieldTrailingIcon:mount", t[76]),
              k(e, "SMUITextfieldTrailingIcon:unmount", t[77]),
              k(e, "SMUITextfieldCharacterCounter:mount", t[78]),
              k(e, "SMUITextfieldCharacterCounter:unmount", t[79]),
            ]),
            (_ = !0));
      },
      p(t, n) {
        t[14] || "outlined" === t[15]
          ? T &&
            (xt(),
            Ot(T, 1, 1, () => {
              T = null;
            }),
            St())
          : T
          ? (T.p(t, n), 49152 & n[0] && Tt(T, 1))
          : ((T = zo(t)), T.c(), Tt(T, 1), T.m(e, i)),
          t[14] || "outlined" === t[15]
            ? w
              ? (w.p(t, n), 49152 & n[0] && Tt(w, 1))
              : ((w = Qo(t)), w.c(), Tt(w, 1), w.m(e, o))
            : w &&
              (xt(),
              Ot(w, 1, 1, () => {
                w = null;
              }),
              St());
        const r = {};
        268435456 & n[2] && (r.$$scope = { dirty: n, ctx: t }),
          a.$set(r),
          D &&
            D.p &&
            (!C || 268435456 & n[2]) &&
            p(D, R, t, t[90], C ? d(R, t[90], n, null) : f(t[90]), null);
        let l = h;
        (h = U(t)),
          h === l
            ? P[h].p(t, n)
            : (xt(),
              Ot(P[l], 1, 1, () => {
                P[l] = null;
              }),
              St(),
              (m = P[h]),
              m ? m.p(t, n) : ((m = P[h] = F[h](t)), m.c()),
              Tt(m, 1),
              m.m(e, g));
        const c = {};
        268435456 & n[2] && (c.$$scope = { dirty: n, ctx: t }),
          $.$set(c),
          !t[14] && "outlined" !== t[15] && t[11]
            ? B
              ? (B.p(t, n), 51200 & n[0] && Tt(B, 1))
              : ((B = cr(t)), B.c(), Tt(B, 1), B.m(e, null))
            : B &&
              (xt(),
              Ot(B, 1, 1, () => {
                B = null;
              }),
              St()),
          H(
            e,
            (j = Mt(V, [
              (!C ||
                ((314823171 & n[0]) | (2048 & n[1]) &&
                  v !==
                    (v = Oe({
                      [t[9]]: !0,
                      "mdc-text-field": !0,
                      "mdc-text-field--disabled": t[12],
                      "mdc-text-field--textarea": t[14],
                      "mdc-text-field--filled": "filled" === t[15],
                      "mdc-text-field--outlined": "outlined" === t[15],
                      "smui-text-field--standard":
                        "standard" === t[15] && !t[14],
                      "mdc-text-field--no-label":
                        t[16] || (null == t[17] && !t[42].label),
                      "mdc-text-field--label-floating":
                        t[28] || (null != t[0] && "" !== t[0]),
                      "mdc-text-field--with-leading-icon": t[35](t[22])
                        ? t[42].leadingIcon
                        : t[22],
                      "mdc-text-field--with-trailing-icon": t[35](t[23])
                        ? t[42].trailingIcon
                        : t[23],
                      "mdc-text-field--with-internal-counter":
                        t[14] && t[42].internalCounter,
                      "mdc-text-field--invalid": t[1],
                      ...t[25],
                    })))) && { class: v },
              (!C ||
                (67109888 & n[0] &&
                  E !==
                    (E = Object.entries(t[26])
                      .map(fr)
                      .concat([t[10]])
                      .join(" ")))) && { style: E },
              { for: void 0 },
              1024 & n[1] &&
                we(t[41], [
                  "input$",
                  "label$",
                  "ripple$",
                  "outline$",
                  "helperLine$",
                ]),
            ]))
          ),
          b &&
            s(b.update) &&
            (49152 & n[0]) | (4 & n[1]) &&
            b.update.call(null, {
              ripple: !t[14] && "filled" === t[15],
              unbounded: !1,
              addClass: t[38],
              removeClass: t[39],
              addStyle: t[40],
              eventTarget: t[33],
              activeTarget: t[33],
              initPromise: t[37],
            }),
          A && s(A.update) && 256 & n[0] && A.update.call(null, t[8]);
      },
      i(t) {
        C ||
          (Tt(T),
          Tt(w),
          Tt(a.$$.fragment, t),
          Tt(D, t),
          Tt(m),
          Tt($.$$.fragment, t),
          Tt(B),
          (C = !0));
      },
      o(t) {
        Ot(T),
          Ot(w),
          Ot(a.$$.fragment, t),
          Ot(D, t),
          Ot(m),
          Ot($.$$.fragment, t),
          Ot(B),
          (C = !1);
      },
      d(n) {
        n && L(e),
          T && T.d(),
          w && w.d(),
          Ht(a),
          D && D.d(n),
          P[h].d(),
          Ht($),
          B && B.d(),
          t[73](null),
          (_ = !1),
          r(S);
      },
    };
  }
  function Go(t) {
    let e;
    const n = t[51].leadingIcon,
      i = c(n, t, t[90], xo);
    return {
      c() {
        i && i.c();
      },
      m(t, n) {
        i && i.m(t, n), (e = !0);
      },
      p(t, o) {
        i &&
          i.p &&
          (!e || 268435456 & o[2]) &&
          p(i, n, t, t[90], e ? d(n, t[90], o, _o) : f(t[90]), xo);
      },
      i(t) {
        e || (Tt(i, t), (e = !0));
      },
      o(t) {
        Ot(i, t), (e = !1);
      },
      d(t) {
        i && i.d(t);
      },
    };
  }
  function Wo(t) {
    let e;
    const n = t[51].trailingIcon,
      i = c(n, t, t[90], Co);
    return {
      c() {
        i && i.c();
      },
      m(t, n) {
        i && i.m(t, n), (e = !0);
      },
      p(t, o) {
        i &&
          i.p &&
          (!e || 268435456 & o[2]) &&
          p(i, n, t, t[90], e ? d(n, t[90], o, Ao) : f(t[90]), Co);
      },
      i(t) {
        e || (Tt(i, t), (e = !0));
      },
      o(t) {
        Ot(i, t), (e = !1);
      },
      d(t) {
        i && i.d(t);
      },
    };
  }
  function zo(t) {
    let e,
      n,
      i,
      o = "filled" === t[15] && qo(),
      r = !t[16] && (null != t[17] || t[42].label) && Yo(t);
    return {
      c() {
        o && o.c(), (e = M()), r && r.c(), (n = F());
      },
      m(t, s) {
        o && o.m(t, s), O(t, e, s), r && r.m(t, s), O(t, n, s), (i = !0);
      },
      p(t, i) {
        "filled" === t[15]
          ? o || ((o = qo()), o.c(), o.m(e.parentNode, e))
          : o && (o.d(1), (o = null)),
          t[16] || (null == t[17] && !t[42].label)
            ? r &&
              (xt(),
              Ot(r, 1, 1, () => {
                r = null;
              }),
              St())
            : r
            ? (r.p(t, i), (196608 & i[0]) | (2048 & i[1]) && Tt(r, 1))
            : ((r = Yo(t)), r.c(), Tt(r, 1), r.m(n.parentNode, n));
      },
      i(t) {
        i || (Tt(r), (i = !0));
      },
      o(t) {
        Ot(r), (i = !1);
      },
      d(t) {
        o && o.d(t), t && L(e), r && r.d(t), t && L(n);
      },
    };
  }
  function qo(t) {
    let e;
    return {
      c() {
        (e = N("span")), U(e, "class", "mdc-text-field__ripple");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function Yo(t) {
    let e, i;
    const o = [
      { floatAbove: t[28] || (null != t[0] && "" !== t[0]) },
      { required: t[13] },
      { wrapped: !0 },
      Me(t[41], "label$"),
    ];
    let r = { $$slots: { default: [Xo] }, $$scope: { ctx: t } };
    for (let t = 0; t < o.length; t += 1) r = n(r, o[t]);
    return (
      (e = new Zi({ props: r })),
      t[52](e),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, n) {
          const i =
            (268443649 & n[0]) | (1024 & n[1])
              ? Mt(o, [
                  268435457 & n[0] && {
                    floatAbove: t[28] || (null != t[0] && "" !== t[0]),
                  },
                  8192 & n[0] && { required: t[13] },
                  o[2],
                  1024 & n[1] && Ft(Me(t[41], "label$")),
                ])
              : {};
          (131072 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(n) {
          t[52](null), Ht(e, n);
        },
      }
    );
  }
  function Xo(t) {
    let e,
      n,
      i = (null == t[17] ? "" : t[17]) + "";
    const o = t[51].label,
      r = c(o, t, t[90], Vo);
    return {
      c() {
        (e = D(i)), r && r.c();
      },
      m(t, i) {
        O(t, e, i), r && r.m(t, i), (n = !0);
      },
      p(t, s) {
        (!n || 131072 & s[0]) &&
          i !== (i = (null == t[17] ? "" : t[17]) + "") &&
          B(e, i),
          r &&
            r.p &&
            (!n || 268435456 & s[2]) &&
            p(r, o, t, t[90], n ? d(o, t[90], s, Bo) : f(t[90]), Vo);
      },
      i(t) {
        n || (Tt(r, t), (n = !0));
      },
      o(t) {
        Ot(r, t), (n = !1);
      },
      d(t) {
        t && L(e), r && r.d(t);
      },
    };
  }
  function Qo(t) {
    let e, i;
    const o = [
      { noLabel: t[16] || (null == t[17] && !t[42].label) },
      Me(t[41], "outline$"),
    ];
    let r = { $$slots: { default: [tr] }, $$scope: { ctx: t } };
    for (let t = 0; t < o.length; t += 1) r = n(r, o[t]);
    return (
      (e = new lo({ props: r })),
      t[54](e),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, n) {
          const i =
            (196608 & n[0]) | (3072 & n[1])
              ? Mt(o, [
                  (196608 & n[0]) | (2048 & n[1]) && {
                    noLabel: t[16] || (null == t[17] && !t[42].label),
                  },
                  1024 & n[1] && Ft(Me(t[41], "outline$")),
                ])
              : {};
          (268640289 & n[0]) | (3072 & n[1]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(n) {
          t[54](null), Ht(e, n);
        },
      }
    );
  }
  function Jo(t) {
    let e, i;
    const o = [
      { floatAbove: t[28] || (null != t[0] && "" !== t[0]) },
      { required: t[13] },
      { wrapped: !0 },
      Me(t[41], "label$"),
    ];
    let r = { $$slots: { default: [Zo] }, $$scope: { ctx: t } };
    for (let t = 0; t < o.length; t += 1) r = n(r, o[t]);
    return (
      (e = new Zi({ props: r })),
      t[53](e),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, n) {
          const i =
            (268443649 & n[0]) | (1024 & n[1])
              ? Mt(o, [
                  268435457 & n[0] && {
                    floatAbove: t[28] || (null != t[0] && "" !== t[0]),
                  },
                  8192 & n[0] && { required: t[13] },
                  o[2],
                  1024 & n[1] && Ft(Me(t[41], "label$")),
                ])
              : {};
          (131072 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(n) {
          t[53](null), Ht(e, n);
        },
      }
    );
  }
  function Zo(t) {
    let e,
      n,
      i = (null == t[17] ? "" : t[17]) + "";
    const o = t[51].label,
      r = c(o, t, t[90], Ho);
    return {
      c() {
        (e = D(i)), r && r.c();
      },
      m(t, i) {
        O(t, e, i), r && r.m(t, i), (n = !0);
      },
      p(t, s) {
        (!n || 131072 & s[0]) &&
          i !== (i = (null == t[17] ? "" : t[17]) + "") &&
          B(e, i),
          r &&
            r.p &&
            (!n || 268435456 & s[2]) &&
            p(r, o, t, t[90], n ? d(o, t[90], s, Uo) : f(t[90]), Ho);
      },
      i(t) {
        n || (Tt(r, t), (n = !0));
      },
      o(t) {
        Ot(r, t), (n = !1);
      },
      d(t) {
        t && L(e), r && r.d(t);
      },
    };
  }
  function tr(t) {
    let e,
      n,
      i = !t[16] && (null != t[17] || t[42].label) && Jo(t);
    return {
      c() {
        i && i.c(), (e = F());
      },
      m(t, o) {
        i && i.m(t, o), O(t, e, o), (n = !0);
      },
      p(t, n) {
        t[16] || (null == t[17] && !t[42].label)
          ? i &&
            (xt(),
            Ot(i, 1, 1, () => {
              i = null;
            }),
            St())
          : i
          ? (i.p(t, n), (196608 & n[0]) | (2048 & n[1]) && Tt(i, 1))
          : ((i = Jo(t)), i.c(), Tt(i, 1), i.m(e.parentNode, e));
      },
      i(t) {
        n || (Tt(i), (n = !0));
      },
      o(t) {
        Ot(i), (n = !1);
      },
      d(t) {
        i && i.d(t), t && L(e);
      },
    };
  }
  function er(t) {
    let e;
    const n = t[51].leadingIcon,
      i = c(n, t, t[90], Po);
    return {
      c() {
        i && i.c();
      },
      m(t, n) {
        i && i.m(t, n), (e = !0);
      },
      p(t, o) {
        i &&
          i.p &&
          (!e || 268435456 & o[2]) &&
          p(i, n, t, t[90], e ? d(n, t[90], o, ko) : f(t[90]), Po);
      },
      i(t) {
        e || (Tt(i, t), (e = !0));
      },
      o(t) {
        Ot(i, t), (e = !1);
      },
      d(t) {
        i && i.d(t);
      },
    };
  }
  function nr(t) {
    let e, i, o, r, s, a, l, u, h, m;
    const g = t[51].prefix,
      $ = c(g, t, t[90], Do);
    let y = null != t[20] && or(t);
    const I = [
      { type: t[18] },
      { disabled: t[12] },
      { required: t[13] },
      { updateInvalid: t[19] },
      { "aria-controls": t[27] },
      { "aria-describedby": t[27] },
      t[16] && null != t[17] ? { placeholder: t[17] } : {},
      Me(t[41], "input$"),
    ];
    function v(e) {
      t[64](e);
    }
    function E(e) {
      t[65](e);
    }
    function b(e) {
      t[66](e);
    }
    function A(e) {
      t[67](e);
    }
    let C = {};
    for (let t = 0; t < I.length; t += 1) C = n(C, I[t]);
    void 0 !== t[0] && (C.value = t[0]),
      void 0 !== t[3] && (C.files = t[3]),
      void 0 !== t[4] && (C.dirty = t[4]),
      void 0 !== t[1] && (C.invalid = t[1]),
      (o = new mo({ props: C })),
      t[63](o),
      lt.push(() => kt(o, "value", v)),
      lt.push(() => kt(o, "files", E)),
      lt.push(() => kt(o, "dirty", b)),
      lt.push(() => kt(o, "invalid", A)),
      o.$on("blur", t[68]),
      o.$on("focus", t[69]),
      o.$on("blur", t[70]),
      o.$on("focus", t[71]);
    let _ = null != t[21] && sr(t);
    const x = t[51].suffix,
      S = c(x, t, t[90], No);
    return {
      c() {
        $ && $.c(),
          (e = M()),
          y && y.c(),
          (i = M()),
          Pt(o.$$.fragment),
          (u = M()),
          _ && _.c(),
          (h = M()),
          S && S.c();
      },
      m(t, n) {
        $ && $.m(t, n),
          O(t, e, n),
          y && y.m(t, n),
          O(t, i, n),
          Ut(o, t, n),
          O(t, u, n),
          _ && _.m(t, n),
          O(t, h, n),
          S && S.m(t, n),
          (m = !0);
      },
      p(t, e) {
        $ &&
          $.p &&
          (!m || 268435456 & e[2]) &&
          p($, g, t, t[90], m ? d(g, t[90], e, Ro) : f(t[90]), Do),
          null != t[20]
            ? y
              ? (y.p(t, e), 1048576 & e[0] && Tt(y, 1))
              : ((y = or(t)), y.c(), Tt(y, 1), y.m(i.parentNode, i))
            : y &&
              (xt(),
              Ot(y, 1, 1, () => {
                y = null;
              }),
              St());
        const n =
          (135213056 & e[0]) | (1024 & e[1])
            ? Mt(I, [
                262144 & e[0] && { type: t[18] },
                4096 & e[0] && { disabled: t[12] },
                8192 & e[0] && { required: t[13] },
                524288 & e[0] && { updateInvalid: t[19] },
                134217728 & e[0] && { "aria-controls": t[27] },
                134217728 & e[0] && { "aria-describedby": t[27] },
                196608 & e[0] &&
                  Ft(t[16] && null != t[17] ? { placeholder: t[17] } : {}),
                1024 & e[1] && Ft(Me(t[41], "input$")),
              ])
            : {};
        !r && 1 & e[0] && ((r = !0), (n.value = t[0]), gt(() => (r = !1))),
          !s && 8 & e[0] && ((s = !0), (n.files = t[3]), gt(() => (s = !1))),
          !a && 16 & e[0] && ((a = !0), (n.dirty = t[4]), gt(() => (a = !1))),
          !l && 2 & e[0] && ((l = !0), (n.invalid = t[1]), gt(() => (l = !1))),
          o.$set(n),
          null != t[21]
            ? _
              ? (_.p(t, e), 2097152 & e[0] && Tt(_, 1))
              : ((_ = sr(t)), _.c(), Tt(_, 1), _.m(h.parentNode, h))
            : _ &&
              (xt(),
              Ot(_, 1, 1, () => {
                _ = null;
              }),
              St()),
          S &&
            S.p &&
            (!m || 268435456 & e[2]) &&
            p(S, x, t, t[90], m ? d(x, t[90], e, wo) : f(t[90]), No);
      },
      i(t) {
        m || (Tt($, t), Tt(y), Tt(o.$$.fragment, t), Tt(_), Tt(S, t), (m = !0));
      },
      o(t) {
        Ot($, t), Ot(y), Ot(o.$$.fragment, t), Ot(_), Ot(S, t), (m = !1);
      },
      d(n) {
        $ && $.d(n),
          n && L(e),
          y && y.d(n),
          n && L(i),
          t[63](null),
          Ht(o, n),
          n && L(u),
          _ && _.d(n),
          n && L(h),
          S && S.d(n);
      },
    };
  }
  function ir(t) {
    let e, i, o, r, s, a, l, u;
    const h = [
      { disabled: t[12] },
      { required: t[13] },
      { updateInvalid: t[19] },
      { "aria-controls": t[27] },
      { "aria-describedby": t[27] },
      Me(t[41], "input$"),
    ];
    function m(e) {
      t[56](e);
    }
    function g(e) {
      t[57](e);
    }
    function $(e) {
      t[58](e);
    }
    let y = {};
    for (let t = 0; t < h.length; t += 1) y = n(y, h[t]);
    void 0 !== t[0] && (y.value = t[0]),
      void 0 !== t[4] && (y.dirty = t[4]),
      void 0 !== t[1] && (y.invalid = t[1]),
      (i = new yo({ props: y })),
      t[55](i),
      lt.push(() => kt(i, "value", m)),
      lt.push(() => kt(i, "dirty", g)),
      lt.push(() => kt(i, "invalid", $)),
      i.$on("blur", t[59]),
      i.$on("focus", t[60]),
      i.$on("blur", t[61]),
      i.$on("focus", t[62]);
    const I = t[51].internalCounter,
      v = c(I, t, t[90], Fo);
    return {
      c() {
        (e = N("span")),
          Pt(i.$$.fragment),
          (a = M()),
          v && v.c(),
          U(
            e,
            "class",
            (l = Oe({
              "mdc-text-field__resizer":
                !("input$resizable" in t[41]) || t[41].input$resizable,
            }))
          );
      },
      m(t, n) {
        O(t, e, n), Ut(i, e, null), x(e, a), v && v.m(e, null), (u = !0);
      },
      p(t, n) {
        const a =
          (134754304 & n[0]) | (1024 & n[1])
            ? Mt(h, [
                4096 & n[0] && { disabled: t[12] },
                8192 & n[0] && { required: t[13] },
                524288 & n[0] && { updateInvalid: t[19] },
                134217728 & n[0] && { "aria-controls": t[27] },
                134217728 & n[0] && { "aria-describedby": t[27] },
                1024 & n[1] && Ft(Me(t[41], "input$")),
              ])
            : {};
        !o && 1 & n[0] && ((o = !0), (a.value = t[0]), gt(() => (o = !1))),
          !r && 16 & n[0] && ((r = !0), (a.dirty = t[4]), gt(() => (r = !1))),
          !s && 2 & n[0] && ((s = !0), (a.invalid = t[1]), gt(() => (s = !1))),
          i.$set(a),
          v &&
            v.p &&
            (!u || 268435456 & n[2]) &&
            p(v, I, t, t[90], u ? d(I, t[90], n, Mo) : f(t[90]), Fo),
          (!u ||
            (1024 & n[1] &&
              l !==
                (l = Oe({
                  "mdc-text-field__resizer":
                    !("input$resizable" in t[41]) || t[41].input$resizable,
                })))) &&
            U(e, "class", l);
      },
      i(t) {
        u || (Tt(i.$$.fragment, t), Tt(v, t), (u = !0));
      },
      o(t) {
        Ot(i.$$.fragment, t), Ot(v, t), (u = !1);
      },
      d(n) {
        n && L(e), t[55](null), Ht(i), v && v.d(n);
      },
    };
  }
  function or(t) {
    let e, n;
    return (
      (e = new uo({
        props: { $$slots: { default: [rr] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          (1048576 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function rr(t) {
    let e;
    return {
      c() {
        e = D(t[20]);
      },
      m(t, n) {
        O(t, e, n);
      },
      p(t, n) {
        1048576 & n[0] && B(e, t[20]);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function sr(t) {
    let e, n;
    return (
      (e = new po({
        props: { $$slots: { default: [ar] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          (2097152 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function ar(t) {
    let e;
    return {
      c() {
        e = D(t[21]);
      },
      m(t, n) {
        O(t, e, n);
      },
      p(t, n) {
        2097152 & n[0] && B(e, t[21]);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function lr(t) {
    let e;
    const n = t[51].trailingIcon,
      i = c(n, t, t[90], Lo);
    return {
      c() {
        i && i.c();
      },
      m(t, n) {
        i && i.m(t, n), (e = !0);
      },
      p(t, o) {
        i &&
          i.p &&
          (!e || 268435456 & o[2]) &&
          p(i, n, t, t[90], e ? d(n, t[90], o, Oo) : f(t[90]), Lo);
      },
      i(t) {
        e || (Tt(i, t), (e = !0));
      },
      o(t) {
        Ot(i, t), (e = !1);
      },
      d(t) {
        i && i.d(t);
      },
    };
  }
  function cr(t) {
    let e, i;
    const o = [Me(t[41], "ripple$")];
    let r = {};
    for (let t = 0; t < o.length; t += 1) r = n(r, o[t]);
    return (
      (e = new io({ props: r })),
      t[72](e),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, n) {
          const i = 1024 & n[1] ? Mt(o, [Ft(Me(t[41], "ripple$"))]) : {};
          e.$set(i);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(n) {
          t[72](null), Ht(e, n);
        },
      }
    );
  }
  function ur(t) {
    let e, i;
    const o = [Me(t[41], "helperLine$")];
    let r = { $$slots: { default: [dr] }, $$scope: { ctx: t } };
    for (let t = 0; t < o.length; t += 1) r = n(r, o[t]);
    return (
      (e = new co({ props: r })),
      e.$on("SMUITextfieldHelperText:id", t[85]),
      e.$on("SMUITextfieldHelperText:mount", t[86]),
      e.$on("SMUITextfieldHelperText:unmount", t[87]),
      e.$on("SMUITextfieldCharacterCounter:mount", t[88]),
      e.$on("SMUITextfieldCharacterCounter:unmount", t[89]),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, n) {
          const i = 1024 & n[1] ? Mt(o, [Ft(Me(t[41], "helperLine$"))]) : {};
          268435456 & n[2] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function dr(t) {
    let e;
    const n = t[51].helper,
      i = c(n, t, t[90], vo);
    return {
      c() {
        i && i.c();
      },
      m(t, n) {
        i && i.m(t, n), (e = !0);
      },
      p(t, o) {
        i &&
          i.p &&
          (!e || 268435456 & o[2]) &&
          p(i, n, t, t[90], e ? d(n, t[90], o, Io) : f(t[90]), vo);
      },
      i(t) {
        e || (Tt(i, t), (e = !0));
      },
      o(t) {
        Ot(i, t), (e = !1);
      },
      d(t) {
        i && i.d(t);
      },
    };
  }
  function pr(t) {
    let e, n, i, o, r;
    const s = [Ko, jo],
      a = [];
    (e = (function (t, e) {
      return t[36] ? 0 : 1;
    })(t)),
      (n = a[e] = s[e](t));
    let l = t[42].helper && ur(t);
    return {
      c() {
        n.c(), (i = M()), l && l.c(), (o = F());
      },
      m(t, n) {
        a[e].m(t, n), O(t, i, n), l && l.m(t, n), O(t, o, n), (r = !0);
      },
      p(t, e) {
        n.p(t, e),
          t[42].helper
            ? l
              ? (l.p(t, e), 2048 & e[1] && Tt(l, 1))
              : ((l = ur(t)), l.c(), Tt(l, 1), l.m(o.parentNode, o))
            : l &&
              (xt(),
              Ot(l, 1, 1, () => {
                l = null;
              }),
              St());
      },
      i(t) {
        r || (Tt(n), Tt(l), (r = !0));
      },
      o(t) {
        Ot(n), Ot(l), (r = !1);
      },
      d(t) {
        a[e].d(t), t && L(i), l && l.d(t), t && L(o);
      },
    };
  }
  const fr = ([t, e]) => `${t}: ${e};`,
    hr = ([t, e]) => `${t}: ${e};`;
  function mr(t, e, i) {
    let o;
    const r = [
      "use",
      "class",
      "style",
      "ripple",
      "disabled",
      "required",
      "textarea",
      "variant",
      "noLabel",
      "label",
      "type",
      "value",
      "files",
      "invalid",
      "updateInvalid",
      "dirty",
      "prefix",
      "suffix",
      "validateOnValueChange",
      "useNativeValidation",
      "withLeadingIcon",
      "withTrailingIcon",
      "input",
      "floatingLabel",
      "lineRipple",
      "notchedOutline",
      "focus",
      "blur",
      "layout",
      "getElement",
    ];
    let s = m(e, r),
      { $$slots: a = {}, $$scope: l } = e;
    const c = g(a),
      { applyPassive: u } = ae,
      d = De(tt());
    let p = () => {};
    function f(t) {
      return t === p;
    }
    let { use: $ = [] } = e,
      { class: y = "" } = e,
      { style: I = "" } = e,
      { ripple: v = !0 } = e,
      { disabled: E = !1 } = e,
      { required: b = !1 } = e,
      { textarea: A = !1 } = e,
      { variant: C = A ? "outlined" : "standard" } = e,
      { noLabel: _ = !1 } = e,
      { label: x } = e,
      { type: S = "text" } = e,
      { value: T = s.input$emptyValueUndefined ? void 0 : p } = e,
      { files: O = p } = e;
    const L = !f(T) || !f(O);
    f(T) && (T = void 0), f(O) && (O = null);
    let { invalid: w = p } = e,
      { updateInvalid: N = f(w) } = e;
    f(w) && (w = !1);
    let R,
      D,
      M,
      F,
      k,
      P,
      U,
      H,
      B,
      { dirty: V = !1 } = e,
      { prefix: j } = e,
      { suffix: K } = e,
      { validateOnValueChange: G = N } = e,
      { useNativeValidation: W = N } = e,
      { withLeadingIcon: z = p } = e,
      { withTrailingIcon: q = p } = e,
      { input: Y } = e,
      { floatingLabel: X } = e,
      { lineRipple: Q } = e,
      { notchedOutline: J } = e,
      Z = {},
      it = {},
      ot = !1,
      st = rt("SMUI:addLayoutListener"),
      at = new Promise((t) => (k = t)),
      ct = T;
    function ut(t) {
      var e;
      return t in Z
        ? null !== (e = Z[t]) && void 0 !== e
          ? e
          : null
        : mt().classList.contains(t);
    }
    function dt(t) {
      Z[t] || i(25, (Z[t] = !0), Z);
    }
    function pt(t) {
      (t in Z && !Z[t]) || i(25, (Z[t] = !1), Z);
    }
    function ft() {
      if (D) {
        const t = D.shouldFloat;
        D.notchOutline(t);
      }
    }
    function mt() {
      return R;
    }
    st && (F = st(ft)),
      et(() => {
        if (
          (i(
            49,
            (D = new ti(
              {
                addClass: dt,
                removeClass: pt,
                hasClass: ut,
                registerTextFieldInteractionHandler: (t, e) =>
                  mt().addEventListener(t, e),
                deregisterTextFieldInteractionHandler: (t, e) =>
                  mt().removeEventListener(t, e),
                registerValidationAttributeChangeHandler: (t) => {
                  const e = new MutationObserver((e) => {
                      W &&
                        t(
                          ((t) =>
                            t.map((t) => t.attributeName).filter((t) => t))(e)
                        );
                    }),
                    n = { attributes: !0 };
                  return Y && e.observe(Y.getElement(), n), e;
                },
                deregisterValidationAttributeChangeHandler: (t) => {
                  t.disconnect();
                },
                getNativeInput: () => {
                  var t;
                  return null !== (t = null == Y ? void 0 : Y.getElement()) &&
                    void 0 !== t
                    ? t
                    : null;
                },
                setInputAttr: (t, e) => {
                  null == Y || Y.addAttr(t, e);
                },
                removeInputAttr: (t) => {
                  null == Y || Y.removeAttr(t);
                },
                isFocused: () =>
                  document.activeElement ===
                  (null == Y ? void 0 : Y.getElement()),
                registerInputInteractionHandler: (t, e) => {
                  null == Y || Y.getElement().addEventListener(t, e, u());
                },
                deregisterInputInteractionHandler: (t, e) => {
                  null == Y || Y.getElement().removeEventListener(t, e, u());
                },
                floatLabel: (t) => X && X.float(t),
                getLabelWidth: () => (X ? X.getWidth() : 0),
                hasLabel: () => !!X,
                shakeLabel: (t) => X && X.shake(t),
                setLabelRequired: (t) => X && X.setRequired(t),
                activateLineRipple: () => Q && Q.activate(),
                deactivateLineRipple: () => Q && Q.deactivate(),
                setLineRippleTransformOrigin: (t) => Q && Q.setRippleCenter(t),
                closeOutline: () => J && J.closeNotch(),
                hasOutline: () => !!J,
                notchOutline: (t) => J && J.notch(t),
              },
              {
                get helperText() {
                  return H;
                },
                get characterCounter() {
                  return B;
                },
                get leadingIcon() {
                  return P;
                },
                get trailingIcon() {
                  return U;
                },
              }
            ))
          ),
          L)
        ) {
          if (null == Y)
            throw new Error(
              "SMUI Textfield initialized without Input component."
            );
          D.init();
        } else
          ht().then(() => {
            if (null == Y)
              throw new Error(
                "SMUI Textfield initialized without Input component."
              );
            D.init();
          });
        return (
          k(),
          () => {
            D.destroy();
          }
        );
      }),
      nt(() => {
        F && F();
      });
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(41, (s = m(e, r))),
          "use" in t && i(8, ($ = t.use)),
          "class" in t && i(9, (y = t.class)),
          "style" in t && i(10, (I = t.style)),
          "ripple" in t && i(11, (v = t.ripple)),
          "disabled" in t && i(12, (E = t.disabled)),
          "required" in t && i(13, (b = t.required)),
          "textarea" in t && i(14, (A = t.textarea)),
          "variant" in t && i(15, (C = t.variant)),
          "noLabel" in t && i(16, (_ = t.noLabel)),
          "label" in t && i(17, (x = t.label)),
          "type" in t && i(18, (S = t.type)),
          "value" in t && i(0, (T = t.value)),
          "files" in t && i(3, (O = t.files)),
          "invalid" in t && i(1, (w = t.invalid)),
          "updateInvalid" in t && i(19, (N = t.updateInvalid)),
          "dirty" in t && i(4, (V = t.dirty)),
          "prefix" in t && i(20, (j = t.prefix)),
          "suffix" in t && i(21, (K = t.suffix)),
          "validateOnValueChange" in t && i(43, (G = t.validateOnValueChange)),
          "useNativeValidation" in t && i(44, (W = t.useNativeValidation)),
          "withLeadingIcon" in t && i(22, (z = t.withLeadingIcon)),
          "withTrailingIcon" in t && i(23, (q = t.withTrailingIcon)),
          "input" in t && i(2, (Y = t.input)),
          "floatingLabel" in t && i(5, (X = t.floatingLabel)),
          "lineRipple" in t && i(6, (Q = t.lineRipple)),
          "notchedOutline" in t && i(7, (J = t.notchedOutline)),
          "$$scope" in t && i(90, (l = t.$$scope));
      }),
      (t.$$.update = () => {
        if (
          (4 & t.$$.dirty[0] && i(33, (o = Y && Y.getElement())),
          (524290 & t.$$.dirty[0]) | (262144 & t.$$.dirty[1]) &&
            D &&
            D.isValid() !== !w &&
            (N ? i(1, (w = !D.isValid())) : D.setValid(!w)),
          266240 & t.$$.dirty[1] &&
            D &&
            D.getValidateOnValueChange() !== G &&
            D.setValidateOnValueChange(!f(G) && G),
          270336 & t.$$.dirty[1] && D && D.setUseNativeValidation(!!f(W) || W),
          (4096 & t.$$.dirty[0]) | (262144 & t.$$.dirty[1]) &&
            D &&
            D.setDisabled(E),
          (1 & t.$$.dirty[0]) | (786432 & t.$$.dirty[1]) && D && L && ct !== T)
        ) {
          i(50, (ct = T));
          const t = `${T}`;
          D.getValue() !== t && D.setValue(t);
        }
      }),
      [
        T,
        w,
        Y,
        O,
        V,
        X,
        Q,
        J,
        $,
        y,
        I,
        v,
        E,
        b,
        A,
        C,
        _,
        x,
        S,
        N,
        j,
        K,
        z,
        q,
        R,
        Z,
        it,
        M,
        ot,
        P,
        U,
        H,
        B,
        o,
        d,
        f,
        L,
        at,
        dt,
        pt,
        function (t, e) {
          it[t] != e &&
            ("" === e || null == e
              ? (delete it[t], i(26, it))
              : i(26, (it[t] = e), it));
        },
        s,
        c,
        G,
        W,
        function () {
          null == Y || Y.focus();
        },
        function () {
          null == Y || Y.blur();
        },
        ft,
        mt,
        D,
        ct,
        a,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (X = t), i(5, X);
          });
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (X = t), i(5, X);
          });
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (J = t), i(7, J);
          });
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (Y = t), i(2, Y);
          });
        },
        function (t) {
          (T = t), i(0, T);
        },
        function (t) {
          (V = t), i(4, V);
        },
        function (t) {
          (w = t), i(1, w), i(49, D), i(19, N);
        },
        () => i(28, (ot = !1)),
        () => i(28, (ot = !0)),
        (t) => Le(R, "blur", t),
        (t) => Le(R, "focus", t),
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (Y = t), i(2, Y);
          });
        },
        function (t) {
          (T = t), i(0, T);
        },
        function (t) {
          (O = t), i(3, O);
        },
        function (t) {
          (V = t), i(4, V);
        },
        function (t) {
          (w = t), i(1, w), i(49, D), i(19, N);
        },
        () => i(28, (ot = !1)),
        () => i(28, (ot = !0)),
        (t) => Le(R, "blur", t),
        (t) => Le(R, "focus", t),
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (Q = t), i(6, Q);
          });
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (R = t), i(24, R);
          });
        },
        (t) => i(29, (P = t.detail)),
        () => i(29, (P = void 0)),
        (t) => i(30, (U = t.detail)),
        () => i(30, (U = void 0)),
        (t) => i(32, (B = t.detail)),
        () => i(32, (B = void 0)),
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (R = t), i(24, R);
          });
        },
        (t) => i(29, (P = t.detail)),
        () => i(29, (P = void 0)),
        (t) => i(30, (U = t.detail)),
        () => i(30, (U = void 0)),
        (t) => i(27, (M = t.detail)),
        (t) => i(31, (H = t.detail)),
        () => {
          i(27, (M = void 0)), i(31, (H = void 0));
        },
        (t) => i(32, (B = t.detail)),
        () => i(32, (B = void 0)),
        l,
      ]
    );
  }
  class gr extends Vt {
    constructor(t) {
      super(),
        Bt(
          this,
          t,
          mr,
          pr,
          a,
          {
            use: 8,
            class: 9,
            style: 10,
            ripple: 11,
            disabled: 12,
            required: 13,
            textarea: 14,
            variant: 15,
            noLabel: 16,
            label: 17,
            type: 18,
            value: 0,
            files: 3,
            invalid: 1,
            updateInvalid: 19,
            dirty: 4,
            prefix: 20,
            suffix: 21,
            validateOnValueChange: 43,
            useNativeValidation: 44,
            withLeadingIcon: 22,
            withTrailingIcon: 23,
            input: 2,
            floatingLabel: 5,
            lineRipple: 6,
            notchedOutline: 7,
            focus: 45,
            blur: 46,
            layout: 47,
            getElement: 48,
          },
          null,
          [-1, -1, -1, -1]
        );
    }
    get focus() {
      return this.$$.ctx[45];
    }
    get blur() {
      return this.$$.ctx[46];
    }
    get layout() {
      return this.$$.ctx[47];
    }
    get getElement() {
      return this.$$.ctx[48];
    }
  }
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var $r = {
      ICON_BUTTON_ON: "mdc-icon-button--on",
      ROOT: "mdc-icon-button",
    },
    yr = {
      ARIA_LABEL: "aria-label",
      ARIA_PRESSED: "aria-pressed",
      DATA_ARIA_LABEL_OFF: "data-aria-label-off",
      DATA_ARIA_LABEL_ON: "data-aria-label-on",
      CHANGE_EVENT: "MDCIconButtonToggle:change",
    },
    Ir = (function (t) {
      function e(n) {
        var i = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
        return (i.hasToggledAriaLabel = !1), i;
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return $r;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "strings", {
          get: function () {
            return yr;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              hasClass: function () {
                return !1;
              },
              notifyChange: function () {},
              removeClass: function () {},
              getAttr: function () {
                return null;
              },
              setAttr: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.init = function () {
          var t = this.adapter.getAttr(yr.DATA_ARIA_LABEL_ON),
            e = this.adapter.getAttr(yr.DATA_ARIA_LABEL_OFF);
          if (t && e) {
            if (null !== this.adapter.getAttr(yr.ARIA_PRESSED))
              throw new Error(
                "MDCIconButtonToggleFoundation: Button should not set `aria-pressed` if it has a toggled aria label."
              );
            this.hasToggledAriaLabel = !0;
          } else this.adapter.setAttr(yr.ARIA_PRESSED, String(this.isOn()));
        }),
        (e.prototype.handleClick = function () {
          this.toggle(), this.adapter.notifyChange({ isOn: this.isOn() });
        }),
        (e.prototype.isOn = function () {
          return this.adapter.hasClass($r.ICON_BUTTON_ON);
        }),
        (e.prototype.toggle = function (t) {
          if (
            (void 0 === t && (t = !this.isOn()),
            t
              ? this.adapter.addClass($r.ICON_BUTTON_ON)
              : this.adapter.removeClass($r.ICON_BUTTON_ON),
            this.hasToggledAriaLabel)
          ) {
            var e = t
              ? this.adapter.getAttr(yr.DATA_ARIA_LABEL_ON)
              : this.adapter.getAttr(yr.DATA_ARIA_LABEL_OFF);
            this.adapter.setAttr(yr.ARIA_LABEL, e || "");
          } else this.adapter.setAttr(yr.ARIA_PRESSED, "" + t);
        }),
        e
      );
    })(oe);
  function vr(t) {
    let e;
    return {
      c() {
        (e = N("div")), U(e, "class", "mdc-icon-button__touch");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function Er(t) {
    let e, n, i, o;
    const r = t[32].default,
      s = c(r, t, t[36], null);
    let a = t[8] && vr();
    return {
      c() {
        (e = N("div")),
          (n = M()),
          s && s.c(),
          a && a.c(),
          (i = F()),
          U(e, "class", "mdc-icon-button__ripple");
      },
      m(t, r) {
        O(t, e, r),
          O(t, n, r),
          s && s.m(t, r),
          a && a.m(t, r),
          O(t, i, r),
          (o = !0);
      },
      p(t, e) {
        s &&
          s.p &&
          (!o || 32 & e[1]) &&
          p(s, r, t, t[36], o ? d(r, t[36], e, null) : f(t[36]), null),
          t[8]
            ? a || ((a = vr()), a.c(), a.m(i.parentNode, i))
            : a && (a.d(1), (a = null));
      },
      i(t) {
        o || (Tt(s, t), (o = !0));
      },
      o(t) {
        Ot(s, t), (o = !1);
      },
      d(t) {
        t && L(e), t && L(n), s && s.d(t), a && a.d(t), t && L(i);
      },
    };
  }
  function br(t) {
    let e, i, o;
    const r = [
      {
        use: [
          [
            Wi,
            {
              ripple: t[4],
              unbounded: !0,
              color: t[5],
              disabled: !!t[28].disabled,
              addClass: t[25],
              removeClass: t[26],
              addStyle: t[27],
            },
          ],
          t[21],
          ...t[1],
        ],
      },
      {
        class: Oe({
          [t[2]]: !0,
          "mdc-icon-button": !0,
          "mdc-icon-button--on": !t[22](t[0]) && t[0],
          "mdc-icon-button--touch": t[8],
          "mdc-icon-button--display-flex": t[9],
          "smui-icon-button--size-button": "button" === t[10],
          "mdc-icon-button--reduced-size":
            "mini" === t[10] || "button" === t[10],
          "mdc-card__action": "card:action" === t[23],
          "mdc-card__action--icon": "card:action" === t[23],
          "mdc-top-app-bar__navigation-icon":
            "top-app-bar:navigation" === t[23],
          "mdc-top-app-bar__action-item": "top-app-bar:action" === t[23],
          "mdc-snackbar__dismiss": "snackbar:actions" === t[23],
          "mdc-data-table__pagination-button":
            "data-table:pagination" === t[23],
          "mdc-data-table__sort-icon-button":
            "data-table:sortable-header-cell" === t[23],
          "mdc-dialog__close": "dialog:header" === t[23] && "close" === t[12],
          ...t[17],
        }),
      },
      { style: Object.entries(t[18]).map(Ar).concat([t[3]]).join(" ") },
      { "aria-pressed": t[22](t[0]) ? null : t[0] ? "true" : "false" },
      { "aria-label": t[0] ? t[6] : t[7] },
      { "data-aria-label-on": t[6] },
      { "data-aria-label-off": t[7] },
      { "aria-describedby": t[24] },
      { href: t[11] },
      t[20],
      t[19],
      t[28],
    ];
    var s = t[13];
    function a(t) {
      let e = { $$slots: { default: [Er] }, $$scope: { ctx: t } };
      for (let t = 0; t < r.length; t += 1) e = n(e, r[t]);
      return { props: e };
    }
    return (
      s &&
        ((e = new s(a(t))),
        t[33](e),
        e.$on("click", t[34]),
        e.$on("click", t[35])),
      {
        c() {
          e && Pt(e.$$.fragment), (i = F());
        },
        m(t, n) {
          e && Ut(e, t, n), O(t, i, n), (o = !0);
        },
        p(t, n) {
          const o =
            536748031 & n[0]
              ? Mt(r, [
                  505413682 & n[0] && {
                    use: [
                      [
                        Wi,
                        {
                          ripple: t[4],
                          unbounded: !0,
                          color: t[5],
                          disabled: !!t[28].disabled,
                          addClass: t[25],
                          removeClass: t[26],
                          addStyle: t[27],
                        },
                      ],
                      t[21],
                      ...t[1],
                    ],
                  },
                  12719877 & n[0] && {
                    class: Oe({
                      [t[2]]: !0,
                      "mdc-icon-button": !0,
                      "mdc-icon-button--on": !t[22](t[0]) && t[0],
                      "mdc-icon-button--touch": t[8],
                      "mdc-icon-button--display-flex": t[9],
                      "smui-icon-button--size-button": "button" === t[10],
                      "mdc-icon-button--reduced-size":
                        "mini" === t[10] || "button" === t[10],
                      "mdc-card__action": "card:action" === t[23],
                      "mdc-card__action--icon": "card:action" === t[23],
                      "mdc-top-app-bar__navigation-icon":
                        "top-app-bar:navigation" === t[23],
                      "mdc-top-app-bar__action-item":
                        "top-app-bar:action" === t[23],
                      "mdc-snackbar__dismiss": "snackbar:actions" === t[23],
                      "mdc-data-table__pagination-button":
                        "data-table:pagination" === t[23],
                      "mdc-data-table__sort-icon-button":
                        "data-table:sortable-header-cell" === t[23],
                      "mdc-dialog__close":
                        "dialog:header" === t[23] && "close" === t[12],
                      ...t[17],
                    }),
                  },
                  262152 & n[0] && {
                    style: Object.entries(t[18])
                      .map(Ar)
                      .concat([t[3]])
                      .join(" "),
                  },
                  4194305 & n[0] && {
                    "aria-pressed": t[22](t[0])
                      ? null
                      : t[0]
                      ? "true"
                      : "false",
                  },
                  193 & n[0] && { "aria-label": t[0] ? t[6] : t[7] },
                  64 & n[0] && { "data-aria-label-on": t[6] },
                  128 & n[0] && { "data-aria-label-off": t[7] },
                  16777216 & n[0] && { "aria-describedby": t[24] },
                  2048 & n[0] && { href: t[11] },
                  1048576 & n[0] && Ft(t[20]),
                  524288 & n[0] && Ft(t[19]),
                  268435456 & n[0] && Ft(t[28]),
                ])
              : {};
          if (
            ((256 & n[0]) | (32 & n[1]) && (o.$$scope = { dirty: n, ctx: t }),
            s !== (s = t[13]))
          ) {
            if (e) {
              xt();
              const t = e;
              Ot(t.$$.fragment, 1, 0, () => {
                Ht(t, 1);
              }),
                St();
            }
            s
              ? ((e = new s(a(t))),
                t[33](e),
                e.$on("click", t[34]),
                e.$on("click", t[35]),
                Pt(e.$$.fragment),
                Tt(e.$$.fragment, 1),
                Ut(e, i.parentNode, i))
              : (e = null);
          } else s && e.$set(o);
        },
        i(t) {
          o || (e && Tt(e.$$.fragment, t), (o = !0));
        },
        o(t) {
          e && Ot(e.$$.fragment, t), (o = !1);
        },
        d(n) {
          t[33](null), n && L(i), e && Ht(e, n);
        },
      }
    );
  }
  const Ar = ([t, e]) => `${t}: ${e};`;
  function Cr(t, e, i) {
    let o;
    const r = [
      "use",
      "class",
      "style",
      "ripple",
      "color",
      "toggle",
      "pressed",
      "ariaLabelOn",
      "ariaLabelOff",
      "touch",
      "displayFlex",
      "size",
      "href",
      "action",
      "component",
      "getElement",
    ];
    let s = m(e, r),
      { $$slots: a = {}, $$scope: l } = e;
    const c = De(tt());
    let u = () => {};
    function d(t) {
      return t === u;
    }
    let p,
      f,
      { use: g = [] } = e,
      { class: $ = "" } = e,
      { style: y = "" } = e,
      { ripple: I = !0 } = e,
      { color: v } = e,
      { toggle: E = !1 } = e,
      { pressed: b = u } = e,
      { ariaLabelOn: A } = e,
      { ariaLabelOff: C } = e,
      { touch: _ = !1 } = e,
      { displayFlex: x = !0 } = e,
      { size: S = "normal" } = e,
      { href: T } = e,
      { action: O } = e,
      L = {},
      w = {},
      N = {},
      R = rt("SMUI:icon-button:context"),
      D = rt("SMUI:icon-button:aria-describedby"),
      { component: M = null == T ? An : bn } = e,
      F = s.disabled;
    ot("SMUI:icon:context", "icon-button");
    let k = null;
    function P(t) {
      return t in L ? L[t] : j().classList.contains(t);
    }
    function U(t) {
      L[t] || i(17, (L[t] = !0), L);
    }
    function H(t) {
      (t in L && !L[t]) || i(17, (L[t] = !1), L);
    }
    function B(t) {
      var e;
      return t in N
        ? null !== (e = N[t]) && void 0 !== e
          ? e
          : null
        : j().getAttribute(t);
    }
    function V(t, e) {
      N[t] !== e && i(19, (N[t] = e), N);
    }
    function j() {
      return p.getElement();
    }
    nt(() => {
      f && f.destroy();
    });
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(28, (s = m(e, r))),
          "use" in t && i(1, (g = t.use)),
          "class" in t && i(2, ($ = t.class)),
          "style" in t && i(3, (y = t.style)),
          "ripple" in t && i(4, (I = t.ripple)),
          "color" in t && i(5, (v = t.color)),
          "toggle" in t && i(29, (E = t.toggle)),
          "pressed" in t && i(0, (b = t.pressed)),
          "ariaLabelOn" in t && i(6, (A = t.ariaLabelOn)),
          "ariaLabelOff" in t && i(7, (C = t.ariaLabelOff)),
          "touch" in t && i(8, (_ = t.touch)),
          "displayFlex" in t && i(9, (x = t.displayFlex)),
          "size" in t && i(10, (S = t.size)),
          "href" in t && i(11, (T = t.href)),
          "action" in t && i(12, (O = t.action)),
          "component" in t && i(13, (M = t.component)),
          "$$scope" in t && i(36, (l = t.$$scope));
      }),
      (t.$$.update = () => {
        if (
          (4096 & t.$$.dirty[0] &&
            i(
              20,
              (o = (() => {
                if ("data-table:pagination" !== R)
                  return "dialog:header" === R
                    ? { "data-mdc-dialog-action": O }
                    : { action: O };
                switch (O) {
                  case "first-page":
                    return { "data-first-page": "true" };
                  case "prev-page":
                    return { "data-prev-page": "true" };
                  case "next-page":
                    return { "data-next-page": "true" };
                  case "last-page":
                    return { "data-last-page": "true" };
                  default:
                    return { "data-action": "true" };
                }
              })())
            ),
          F !== s.disabled)
        ) {
          const t = j();
          "blur" in t && t.blur(), i(30, (F = s.disabled));
        }
        (536969216 & t.$$.dirty[0]) | (1 & t.$$.dirty[1]) &&
          p &&
          j() &&
          E !== k &&
          (E && !f
            ? (i(
                16,
                (f = new Ir({
                  addClass: U,
                  hasClass: P,
                  notifyChange: (t) => {
                    !(function (t) {
                      i(0, (b = t.isOn));
                    })(t),
                      Le(j(), "SMUIIconButtonToggle:change", t, void 0, !0);
                  },
                  removeClass: H,
                  getAttr: B,
                  setAttr: V,
                }))
              ),
              f.init())
            : !E &&
              f &&
              (f.destroy(),
              i(16, (f = void 0)),
              i(17, (L = {})),
              i(19, (N = {}))),
          i(31, (k = E))),
          65537 & t.$$.dirty[0] && f && !d(b) && f.isOn() !== b && f.toggle(b);
      }),
      [
        b,
        g,
        $,
        y,
        I,
        v,
        A,
        C,
        _,
        x,
        S,
        T,
        O,
        M,
        j,
        p,
        f,
        L,
        w,
        N,
        o,
        c,
        d,
        R,
        D,
        U,
        H,
        function (t, e) {
          w[t] != e &&
            ("" === e || null == e
              ? (delete w[t], i(18, w))
              : i(18, (w[t] = e), w));
        },
        s,
        E,
        F,
        k,
        a,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (p = t), i(15, p);
          });
        },
        () => f && f.handleClick(),
        () =>
          "top-app-bar:navigation" === R &&
          Le(j(), "SMUITopAppBarIconButton:nav"),
        l,
      ]
    );
  }
  class _r extends Vt {
    constructor(t) {
      super(),
        Bt(
          this,
          t,
          Cr,
          br,
          a,
          {
            use: 1,
            class: 2,
            style: 3,
            ripple: 4,
            color: 5,
            toggle: 29,
            pressed: 0,
            ariaLabelOn: 6,
            ariaLabelOff: 7,
            touch: 8,
            displayFlex: 9,
            size: 10,
            href: 11,
            action: 12,
            component: 13,
            getElement: 14,
          },
          null,
          [-1, -1]
        );
    }
    get getElement() {
      return this.$$.ctx[14];
    }
  }
  function xr(t) {
    const e = t - 1;
    return e * e * e + 1;
  }
  function Sr(t, { delay: n = 0, duration: i = 400, easing: o = e } = {}) {
    const r = +getComputedStyle(t).opacity;
    return {
      delay: n,
      duration: i,
      easing: o,
      css: (t) => "opacity: " + t * r,
    };
  }
  function Tr(
    t,
    {
      delay: e = 0,
      duration: n = 400,
      easing: i = xr,
      x: o = 0,
      y: r = 0,
      opacity: s = 0,
    } = {}
  ) {
    const a = getComputedStyle(t),
      l = +a.opacity,
      c = "none" === a.transform ? "" : a.transform,
      u = l * (1 - s);
    return {
      delay: e,
      duration: n,
      easing: i,
      css: (t, e) =>
        `\n\t\t\ttransform: ${c} translate(${(1 - t) * o}px, ${
          (1 - t) * r
        }px);\n\t\t\topacity: ${l - u * e}`,
    };
  }
  function Or(t, { from: e, to: n }, i = {}) {
    const o = getComputedStyle(t),
      r = "none" === o.transform ? "" : o.transform,
      [a, l] = o.transformOrigin.split(" ").map(parseFloat),
      c = e.left + (e.width * a) / n.width - (n.left + a),
      u = e.top + (e.height * l) / n.height - (n.top + l),
      {
        delay: d = 0,
        duration: p = (t) => 120 * Math.sqrt(t),
        easing: f = xr,
      } = i;
    return {
      delay: d,
      duration: s(p) ? p(Math.sqrt(c * c + u * u)) : p,
      easing: f,
      css: (t, i) => {
        const o = i * c,
          s = i * u,
          a = t + (i * e.width) / n.width,
          l = t + (i * e.height) / n.height;
        return `transform: ${r} translate(${o}px, ${s}px) scale(${a}, ${l});`;
      },
    };
  }
  const Lr = {
      duration: 4e3,
      initial: 1,
      next: 0,
      pausable: !1,
      dismissable: !0,
      reversed: !1,
      intro: { x: 256 },
    },
    wr = (() => {
      const { subscribe: t, update: e } = Te([]);
      let n = 0;
      const i = {},
        o = (t) => t instanceof Object;
      return {
        subscribe: t,
        push: (t, r = {}) => {
          const s = { target: "default", ...(o(t) ? t : { ...r, msg: t }) },
            a = i[s.target] || {},
            l = {
              ...Lr,
              ...a,
              ...s,
              theme: { ...a.theme, ...s.theme },
              classes: [...(a.classes || []), ...(s.classes || [])],
              id: ++n,
            };
          return e((t) => (l.reversed ? [...t, l] : [l, ...t])), n;
        },
        pop: (t) => {
          e((e) => {
            if (!e.length || 0 === t) return [];
            if (o(t)) return e.filter((e) => t(e));
            const n = t || Math.max(...e.map((t) => t.id));
            return e.filter((t) => t.id !== n);
          });
        },
        set: (t, n = {}) => {
          const i = o(t) ? { ...t } : { ...n, id: t };
          e((t) => {
            const e = t.findIndex((t) => t.id === i.id);
            return e > -1 && (t[e] = { ...t[e], ...i }), t;
          });
        },
        _init: (t = "default", e = {}) => ((i[t] = e), i),
      };
    })();
  function Nr(t) {
    return "[object Date]" === Object.prototype.toString.call(t);
  }
  function Rr(t, e) {
    if (t === e || t != t) return () => t;
    const n = typeof t;
    if (n !== typeof e || Array.isArray(t) !== Array.isArray(e))
      throw new Error("Cannot interpolate values of different type");
    if (Array.isArray(t)) {
      const n = e.map((e, n) => Rr(t[n], e));
      return (t) => n.map((e) => e(t));
    }
    if ("object" === n) {
      if (!t || !e) throw new Error("Object cannot be null");
      if (Nr(t) && Nr(e)) {
        t = t.getTime();
        const n = (e = e.getTime()) - t;
        return (e) => new Date(t + e * n);
      }
      const n = Object.keys(e),
        i = {};
      return (
        n.forEach((n) => {
          i[n] = Rr(t[n], e[n]);
        }),
        (t) => {
          const e = {};
          return (
            n.forEach((n) => {
              e[n] = i[n](t);
            }),
            e
          );
        }
      );
    }
    if ("number" === n) {
      const n = e - t;
      return (e) => t + e * n;
    }
    throw new Error(`Cannot interpolate ${n} values`);
  }
  function Dr(e) {
    let n,
      i,
      o = e[0].msg + "";
    return {
      c() {
        (n = new W(!1)), (i = F()), (n.a = i);
      },
      m(t, e) {
        n.m(o, t, e), O(t, i, e);
      },
      p(t, e) {
        1 & e && o !== (o = t[0].msg + "") && n.p(o);
      },
      i: t,
      o: t,
      d(t) {
        t && L(i), t && n.d();
      },
    };
  }
  function Mr(t) {
    let e, i, o;
    const r = [t[6]()];
    var s = t[0].component.src;
    function a(t) {
      let e = {};
      for (let t = 0; t < r.length; t += 1) e = n(e, r[t]);
      return { props: e };
    }
    return (
      s && (e = new s(a())),
      {
        c() {
          e && Pt(e.$$.fragment), (i = F());
        },
        m(t, n) {
          e && Ut(e, t, n), O(t, i, n), (o = !0);
        },
        p(t, n) {
          const o = 64 & n ? Mt(r, [Ft(t[6]())]) : {};
          if (s !== (s = t[0].component.src)) {
            if (e) {
              xt();
              const t = e;
              Ot(t.$$.fragment, 1, 0, () => {
                Ht(t, 1);
              }),
                St();
            }
            s
              ? ((e = new s(a())),
                Pt(e.$$.fragment),
                Tt(e.$$.fragment, 1),
                Ut(e, i.parentNode, i))
              : (e = null);
          } else s && e.$set(o);
        },
        i(t) {
          o || (e && Tt(e.$$.fragment, t), (o = !0));
        },
        o(t) {
          e && Ot(e.$$.fragment, t), (o = !1);
        },
        d(t) {
          t && L(i), e && Ht(e, t);
        },
      }
    );
  }
  function Fr(e) {
    let n, i, o;
    return {
      c() {
        (n = N("div")),
          (n.textContent = "✕"),
          U(n, "class", "_toastBtn pe svelte-5er0t9"),
          U(n, "role", "button"),
          U(n, "tabindex", "-1");
      },
      m(t, r) {
        O(t, n, r), i || ((o = k(n, "click", e[3])), (i = !0));
      },
      p: t,
      d(t) {
        t && L(n), (i = !1), o();
      },
    };
  }
  function kr(t) {
    let e, n, i, o, s, a, l, c, u, d;
    const p = [Mr, Dr],
      f = [];
    function h(t, e) {
      return t[0].component ? 0 : 1;
    }
    (i = h(t)), (o = f[i] = p[i](t));
    let m = t[0].dismissable && Fr(t);
    return {
      c() {
        (e = N("div")),
          (n = N("div")),
          o.c(),
          (s = M()),
          m && m.c(),
          (a = M()),
          (l = N("progress")),
          U(n, "role", "status"),
          U(n, "class", "_toastMsg svelte-5er0t9"),
          K(n, "pe", t[0].component),
          U(l, "class", "_toastBar svelte-5er0t9"),
          (l.value = t[1]),
          U(e, "class", "_toastItem svelte-5er0t9"),
          K(e, "pe", t[0].pausable);
      },
      m(o, r) {
        O(o, e, r),
          x(e, n),
          f[i].m(n, null),
          x(e, s),
          m && m.m(e, null),
          x(e, a),
          x(e, l),
          (c = !0),
          u ||
            ((d = [k(e, "mouseenter", t[4]), k(e, "mouseleave", t[5])]),
            (u = !0));
      },
      p(t, [r]) {
        let s = i;
        (i = h(t)),
          i === s
            ? f[i].p(t, r)
            : (xt(),
              Ot(f[s], 1, 1, () => {
                f[s] = null;
              }),
              St(),
              (o = f[i]),
              o ? o.p(t, r) : ((o = f[i] = p[i](t)), o.c()),
              Tt(o, 1),
              o.m(n, null)),
          1 & r && K(n, "pe", t[0].component),
          t[0].dismissable
            ? m
              ? m.p(t, r)
              : ((m = Fr(t)), m.c(), m.m(e, a))
            : m && (m.d(1), (m = null)),
          (!c || 2 & r) && (l.value = t[1]),
          1 & r && K(e, "pe", t[0].pausable);
      },
      i(t) {
        c || (Tt(o), (c = !0));
      },
      o(t) {
        Ot(o), (c = !1);
      },
      d(t) {
        t && L(e), f[i].d(), m && m.d(), (u = !1), r(d);
      },
    };
  }
  function Pr(t, i, o) {
    let r,
      { item: s } = i;
    const a = (function (t, i = {}) {
      const o = Te(t);
      let r,
        s = t;
      function a(a, l) {
        if (null == t) return o.set((t = a)), Promise.resolve();
        s = a;
        let c = r,
          u = !1,
          {
            delay: d = 0,
            duration: p = 400,
            easing: f = e,
            interpolate: h = Rr,
          } = n(n({}, i), l);
        if (0 === p)
          return (
            c && (c.abort(), (c = null)), o.set((t = s)), Promise.resolve()
          );
        const m = E() + d;
        let g;
        return (
          (r = _((e) => {
            if (e < m) return !0;
            u ||
              ((g = h(t, a)),
              "function" == typeof p && (p = p(t, a)),
              (u = !0)),
              c && (c.abort(), (c = null));
            const n = e - m;
            return n > p
              ? (o.set((t = a)), !1)
              : (o.set((t = g(f(n / p)))), !0);
          })),
          r.promise
        );
      }
      return {
        set: a,
        update: (e, n) => a(e(s, t), n),
        subscribe: o.subscribe,
      };
    })(s.initial, { duration: s.duration, easing: e });
    l(t, a, (t) => o(1, (r = t)));
    const c = () => wr.pop(s.id),
      u = () => {
        (1 !== r && 0 !== r) || c();
      };
    let d = s.initial,
      p = d,
      f = !1;
    return (
      nt(() => {
        "function" == typeof s.onpop && s.onpop(s.id);
      }),
      (t.$$set = (t) => {
        "item" in t && o(0, (s = t.item));
      }),
      (t.$$.update = () => {
        1 & t.$$.dirty &&
          void 0 !== s.progress &&
          o(0, (s.next = s.progress), s),
          131 & t.$$.dirty &&
            d !== s.next &&
            (o(7, (d = s.next)), (p = r), (f = !1), a.set(d).then(u));
      }),
      [
        s,
        r,
        a,
        c,
        () => {
          s.pausable && !f && r !== d && (a.set(r, { duration: 0 }), (f = !0));
        },
        () => {
          if (f) {
            const t = s.duration,
              e = t - t * ((r - p) / (d - p));
            a.set(d, { duration: e }).then(u), (f = !1);
          }
        },
        () => {
          const { props: t = {}, sendIdTo: e } = s.component;
          return e && (t[e] = s.id), t;
        },
        d,
      ]
    );
  }
  class Ur extends Vt {
    constructor(t) {
      super(), Bt(this, t, Pr, kr, a, { item: 0 });
    }
  }
  function Hr(t, e, n) {
    const i = t.slice();
    return (i[5] = e[n]), i;
  }
  function Br(n, i) {
    let o,
      a,
      l,
      c,
      u,
      d,
      p,
      f,
      h,
      m = t;
    return (
      (a = new Ur({ props: { item: i[5] } })),
      {
        key: n,
        first: null,
        c() {
          (o = N("li")),
            Pt(a.$$.fragment),
            (l = M()),
            U(o, "class", (c = $(i[5].classes.join(" ")) + " svelte-yh90az")),
            U(o, "style", (u = i[1](i[5].theme))),
            (this.first = o);
        },
        m(t, e) {
          O(t, o, e), Ut(a, o, null), x(o, l), (h = !0);
        },
        p(t, e) {
          i = t;
          const n = {};
          1 & e && (n.item = i[5]),
            a.$set(n),
            (!h ||
              (1 & e &&
                c !== (c = $(i[5].classes.join(" ")) + " svelte-yh90az"))) &&
              U(o, "class", c),
            (!h || (1 & e && u !== (u = i[1](i[5].theme)))) && U(o, "style", u);
        },
        r() {
          f = o.getBoundingClientRect();
        },
        f() {
          !(function (t) {
            const e = getComputedStyle(t);
            if ("absolute" !== e.position && "fixed" !== e.position) {
              const { width: n, height: i } = e,
                o = t.getBoundingClientRect();
              (t.style.position = "absolute"),
                (t.style.width = n),
                (t.style.height = i),
                J(t, o);
            }
          })(o),
            m(),
            J(o, f);
        },
        a() {
          m(),
            (m = (function (n, i, o, r) {
              if (!i) return t;
              const s = n.getBoundingClientRect();
              if (
                i.left === s.left &&
                i.right === s.right &&
                i.top === s.top &&
                i.bottom === s.bottom
              )
                return t;
              const {
                delay: a = 0,
                duration: l = 300,
                easing: c = e,
                start: u = E() + a,
                end: d = u + l,
                tick: p = t,
                css: f,
              } = o(n, { from: i, to: s }, r);
              let h,
                m = !0,
                g = !1;
              function $() {
                f && Q(n, h), (m = !1);
              }
              return (
                _((t) => {
                  if (
                    (!g && t >= u && (g = !0),
                    g && t >= d && (p(1, 0), $()),
                    !m)
                  )
                    return !1;
                  if (g) {
                    const e = 0 + 1 * c((t - u) / l);
                    p(e, 1 - e);
                  }
                  return !0;
                }),
                f && (h = X(n, 0, 1, l, a, c, f)),
                a || (g = !0),
                p(0, 1),
                $
              );
            })(o, f, Or, { duration: 200 }));
        },
        i(n) {
          h ||
            (Tt(a.$$.fragment, n),
            mt(() => {
              p && p.end(1),
                (d = (function (n, i, o) {
                  let r,
                    a,
                    l = i(n, o),
                    c = !1,
                    u = 0;
                  function d() {
                    r && Q(n, r);
                  }
                  function p() {
                    const {
                      delay: i = 0,
                      duration: o = 300,
                      easing: s = e,
                      tick: p = t,
                      css: f,
                    } = l || Lt;
                    f && (r = X(n, 0, 1, o, i, s, f, u++)), p(0, 1);
                    const h = E() + i,
                      m = h + o;
                    a && a.abort(),
                      (c = !0),
                      mt(() => At(n, !0, "start")),
                      (a = _((t) => {
                        if (c) {
                          if (t >= m)
                            return p(1, 0), At(n, !0, "end"), d(), (c = !1);
                          if (t >= h) {
                            const e = s((t - h) / o);
                            p(e, 1 - e);
                          }
                        }
                        return c;
                      }));
                  }
                  let f = !1;
                  return {
                    start() {
                      f ||
                        ((f = !0),
                        Q(n),
                        s(l) ? ((l = l()), bt().then(p)) : p());
                    },
                    invalidate() {
                      f = !1;
                    },
                    end() {
                      c && (d(), (c = !1));
                    },
                  };
                })(o, Tr, i[5].intro)),
                d.start();
            }),
            (h = !0));
        },
        o(n) {
          Ot(a.$$.fragment, n),
            d && d.invalidate(),
            (p = (function (n, i, o) {
              let a,
                l = i(n, o),
                c = !0;
              const u = _t;
              function d() {
                const {
                  delay: i = 0,
                  duration: o = 300,
                  easing: s = e,
                  tick: d = t,
                  css: p,
                } = l || Lt;
                p && (a = X(n, 1, 0, o, i, s, p));
                const f = E() + i,
                  h = f + o;
                mt(() => At(n, !1, "start")),
                  _((t) => {
                    if (c) {
                      if (t >= h)
                        return d(0, 1), At(n, !1, "end"), --u.r || r(u.c), !1;
                      if (t >= f) {
                        const e = s((t - f) / o);
                        d(1 - e, e);
                      }
                    }
                    return c;
                  });
              }
              return (
                (u.r += 1),
                s(l)
                  ? bt().then(() => {
                      (l = l()), d();
                    })
                  : d(),
                {
                  end(t) {
                    t && l.tick && l.tick(1, 0), c && (a && Q(n, a), (c = !1));
                  },
                }
              );
            })(o, Sr, {})),
            (h = !1);
        },
        d(t) {
          t && L(o), Ht(a), t && p && p.end();
        },
      }
    );
  }
  function Vr(t) {
    let e,
      n,
      i = [],
      o = new Map(),
      r = t[0];
    const s = (t) => t[5].id;
    for (let e = 0; e < r.length; e += 1) {
      let n = Hr(t, r, e),
        a = s(n);
      o.set(a, (i[e] = Br(a, n)));
    }
    return {
      c() {
        e = N("ul");
        for (let t = 0; t < i.length; t += 1) i[t].c();
        U(e, "class", "_toastContainer svelte-yh90az");
      },
      m(t, o) {
        O(t, e, o);
        for (let t = 0; t < i.length; t += 1) i[t].m(e, null);
        n = !0;
      },
      p(t, [n]) {
        if (3 & n) {
          (r = t[0]), xt();
          for (let t = 0; t < i.length; t += 1) i[t].r();
          i = Dt(i, n, s, 1, t, r, o, e, Rt, Br, null, Hr);
          for (let t = 0; t < i.length; t += 1) i[t].a();
          St();
        }
      },
      i(t) {
        if (!n) {
          for (let t = 0; t < r.length; t += 1) Tt(i[t]);
          n = !0;
        }
      },
      o(t) {
        for (let t = 0; t < i.length; t += 1) Ot(i[t]);
        n = !1;
      },
      d(t) {
        t && L(e);
        for (let t = 0; t < i.length; t += 1) i[t].d();
      },
    };
  }
  function jr(t, e, n) {
    let i;
    l(t, wr, (t) => n(4, (i = t)));
    let o,
      { options: r = {} } = e,
      { target: s = "default" } = e;
    return (
      (t.$$set = (t) => {
        "options" in t && n(2, (r = t.options)),
          "target" in t && n(3, (s = t.target));
      }),
      (t.$$.update = () => {
        12 & t.$$.dirty && wr._init(s, r),
          24 & t.$$.dirty && n(0, (o = i.filter((t) => t.target === s)));
      }),
      [
        o,
        (t) => Object.keys(t).reduce((e, n) => `${e}${n}:${t[n]};`, ""),
        r,
        s,
        i,
      ]
    );
  }
  class Kr extends Vt {
    constructor(t) {
      super(), Bt(this, t, jr, Vr, a, { options: 2, target: 3 });
    }
  }
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var Gr,
    Wr,
    zr = {
      LIST_ITEM_ACTIVATED_CLASS: "mdc-list-item--activated",
      LIST_ITEM_CLASS: "mdc-list-item",
      LIST_ITEM_DISABLED_CLASS: "mdc-list-item--disabled",
      LIST_ITEM_SELECTED_CLASS: "mdc-list-item--selected",
      LIST_ITEM_TEXT_CLASS: "mdc-list-item__text",
      LIST_ITEM_PRIMARY_TEXT_CLASS: "mdc-list-item__primary-text",
      ROOT: "mdc-list",
    };
  ((Gr = {})["" + zr.LIST_ITEM_ACTIVATED_CLASS] = "mdc-list-item--activated"),
    (Gr["" + zr.LIST_ITEM_CLASS] = "mdc-list-item"),
    (Gr["" + zr.LIST_ITEM_DISABLED_CLASS] = "mdc-list-item--disabled"),
    (Gr["" + zr.LIST_ITEM_SELECTED_CLASS] = "mdc-list-item--selected"),
    (Gr["" + zr.LIST_ITEM_PRIMARY_TEXT_CLASS] = "mdc-list-item__primary-text"),
    (Gr["" + zr.ROOT] = "mdc-list");
  var qr =
      (((Wr = {})["" + zr.LIST_ITEM_ACTIVATED_CLASS] =
        "mdc-deprecated-list-item--activated"),
      (Wr["" + zr.LIST_ITEM_CLASS] = "mdc-deprecated-list-item"),
      (Wr["" + zr.LIST_ITEM_DISABLED_CLASS] =
        "mdc-deprecated-list-item--disabled"),
      (Wr["" + zr.LIST_ITEM_SELECTED_CLASS] =
        "mdc-deprecated-list-item--selected"),
      (Wr["" + zr.LIST_ITEM_TEXT_CLASS] = "mdc-deprecated-list-item__text"),
      (Wr["" + zr.LIST_ITEM_PRIMARY_TEXT_CLASS] =
        "mdc-deprecated-list-item__primary-text"),
      (Wr["" + zr.ROOT] = "mdc-deprecated-list"),
      Wr),
    Yr = {
      ACTION_EVENT: "MDCList:action",
      ARIA_CHECKED: "aria-checked",
      ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
      ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
      ARIA_CURRENT: "aria-current",
      ARIA_DISABLED: "aria-disabled",
      ARIA_ORIENTATION: "aria-orientation",
      ARIA_ORIENTATION_HORIZONTAL: "horizontal",
      ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
      ARIA_SELECTED: "aria-selected",
      ARIA_INTERACTIVE_ROLES_SELECTOR: '[role="listbox"], [role="menu"]',
      ARIA_MULTI_SELECTABLE_SELECTOR: '[aria-multiselectable="true"]',
      CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
      CHECKBOX_SELECTOR: 'input[type="checkbox"]',
      CHILD_ELEMENTS_TO_TOGGLE_TABINDEX:
        "\n    ." +
        zr.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        zr.LIST_ITEM_CLASS +
        " a,\n    ." +
        qr[zr.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        qr[zr.LIST_ITEM_CLASS] +
        " a\n  ",
      DEPRECATED_SELECTOR: ".mdc-deprecated-list",
      FOCUSABLE_CHILD_ELEMENTS:
        "\n    ." +
        zr.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        zr.LIST_ITEM_CLASS +
        " a,\n    ." +
        zr.LIST_ITEM_CLASS +
        ' input[type="radio"]:not(:disabled),\n    .' +
        zr.LIST_ITEM_CLASS +
        ' input[type="checkbox"]:not(:disabled),\n    .' +
        qr[zr.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        qr[zr.LIST_ITEM_CLASS] +
        " a,\n    ." +
        qr[zr.LIST_ITEM_CLASS] +
        ' input[type="radio"]:not(:disabled),\n    .' +
        qr[zr.LIST_ITEM_CLASS] +
        ' input[type="checkbox"]:not(:disabled)\n  ',
      RADIO_SELECTOR: 'input[type="radio"]',
      SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]',
    },
    Xr = { UNSET_INDEX: -1, TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300 },
    Qr = ["input", "button", "textarea", "select"],
    Jr = function (t) {
      var e = t.target;
      if (e) {
        var n = ("" + e.tagName).toLowerCase();
        -1 === Qr.indexOf(n) && t.preventDefault();
      }
    };
  function Zr(t, e) {
    var n,
      i = t.nextChar,
      o = t.focusItemAtIndex,
      r = t.sortedIndexByFirstChar,
      s = t.focusedItemIndex,
      a = t.skipFocus,
      l = t.isItemAtIndexDisabled;
    return (
      clearTimeout(e.bufferClearTimeout),
      (e.bufferClearTimeout = setTimeout(function () {
        es(e);
      }, Xr.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS)),
      (e.typeaheadBuffer = e.typeaheadBuffer + i),
      (n =
        1 === e.typeaheadBuffer.length
          ? (function (t, e, n, i) {
              var o = i.typeaheadBuffer[0],
                r = t.get(o);
              if (!r) return -1;
              if (
                o === i.currentFirstChar &&
                r[i.sortedIndexCursor].index === e
              ) {
                i.sortedIndexCursor = (i.sortedIndexCursor + 1) % r.length;
                var s = r[i.sortedIndexCursor].index;
                if (!n(s)) return s;
              }
              i.currentFirstChar = o;
              var a,
                l = -1;
              for (a = 0; a < r.length; a++)
                if (!n(r[a].index)) {
                  l = a;
                  break;
                }
              for (; a < r.length; a++)
                if (r[a].index > e && !n(r[a].index)) {
                  l = a;
                  break;
                }
              if (-1 !== l)
                return (i.sortedIndexCursor = l), r[i.sortedIndexCursor].index;
              return -1;
            })(r, s, l, e)
          : (function (t, e, n) {
              var i = n.typeaheadBuffer[0],
                o = t.get(i);
              if (!o) return -1;
              var r = o[n.sortedIndexCursor];
              if (0 === r.text.lastIndexOf(n.typeaheadBuffer, 0) && !e(r.index))
                return r.index;
              var s = (n.sortedIndexCursor + 1) % o.length,
                a = -1;
              for (; s !== n.sortedIndexCursor; ) {
                var l = o[s],
                  c = 0 === l.text.lastIndexOf(n.typeaheadBuffer, 0),
                  u = !e(l.index);
                if (c && u) {
                  a = s;
                  break;
                }
                s = (s + 1) % o.length;
              }
              if (-1 !== a)
                return (n.sortedIndexCursor = a), o[n.sortedIndexCursor].index;
              return -1;
            })(r, l, e)),
      -1 === n || a || o(n),
      n
    );
  }
  function ts(t) {
    return t.typeaheadBuffer.length > 0;
  }
  function es(t) {
    t.typeaheadBuffer = "";
  }
  function ns(t, e) {
    var n = t.event,
      i = t.isTargetListItem,
      o = t.focusedItemIndex,
      r = t.focusItemAtIndex,
      s = t.sortedIndexByFirstChar,
      a = t.isItemAtIndexDisabled,
      l = "ArrowLeft" === Fi(n),
      c = "ArrowUp" === Fi(n),
      u = "ArrowRight" === Fi(n),
      d = "ArrowDown" === Fi(n),
      p = "Home" === Fi(n),
      f = "End" === Fi(n),
      h = "Enter" === Fi(n),
      m = "Spacebar" === Fi(n);
    return n.ctrlKey || n.metaKey || l || c || u || d || p || f || h
      ? -1
      : m || 1 !== n.key.length
      ? m
        ? (i && Jr(n),
          i && ts(e)
            ? Zr(
                {
                  focusItemAtIndex: r,
                  focusedItemIndex: o,
                  nextChar: " ",
                  sortedIndexByFirstChar: s,
                  skipFocus: !1,
                  isItemAtIndexDisabled: a,
                },
                e
              )
            : -1)
        : -1
      : (Jr(n),
        Zr(
          {
            focusItemAtIndex: r,
            focusedItemIndex: o,
            nextChar: n.key.toLowerCase(),
            sortedIndexByFirstChar: s,
            skipFocus: !1,
            isItemAtIndexDisabled: a,
          },
          e
        ));
  }
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var is = (function (t) {
    function e(n) {
      var i = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
      return (
        (i.wrapFocus = !1),
        (i.isVertical = !0),
        (i.isSingleSelectionList = !1),
        (i.selectedIndex = Xr.UNSET_INDEX),
        (i.focusedItemIndex = Xr.UNSET_INDEX),
        (i.useActivatedClass = !1),
        (i.useSelectedAttr = !1),
        (i.ariaCurrentAttrValue = null),
        (i.isCheckboxList = !1),
        (i.isRadioList = !1),
        (i.hasTypeahead = !1),
        (i.typeaheadState = {
          bufferClearTimeout: 0,
          currentFirstChar: "",
          sortedIndexCursor: 0,
          typeaheadBuffer: "",
        }),
        (i.sortedIndexByFirstChar = new Map()),
        i
      );
    }
    return (
      Qt(e, t),
      Object.defineProperty(e, "strings", {
        get: function () {
          return Yr;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "cssClasses", {
        get: function () {
          return zr;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "numbers", {
        get: function () {
          return Xr;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "defaultAdapter", {
        get: function () {
          return {
            addClassForElementIndex: function () {},
            focusItemAtIndex: function () {},
            getAttributeForElementIndex: function () {
              return null;
            },
            getFocusedElementIndex: function () {
              return 0;
            },
            getListItemCount: function () {
              return 0;
            },
            hasCheckboxAtIndex: function () {
              return !1;
            },
            hasRadioAtIndex: function () {
              return !1;
            },
            isCheckboxCheckedAtIndex: function () {
              return !1;
            },
            isFocusInsideList: function () {
              return !1;
            },
            isRootFocused: function () {
              return !1;
            },
            listItemAtIndexHasClass: function () {
              return !1;
            },
            notifyAction: function () {},
            removeClassForElementIndex: function () {},
            setAttributeForElementIndex: function () {},
            setCheckedCheckboxOrRadioAtIndex: function () {},
            setTabIndexForListItemChildren: function () {},
            getPrimaryTextAtIndex: function () {
              return "";
            },
          };
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.layout = function () {
        0 !== this.adapter.getListItemCount() &&
          (this.adapter.hasCheckboxAtIndex(0)
            ? (this.isCheckboxList = !0)
            : this.adapter.hasRadioAtIndex(0)
            ? (this.isRadioList = !0)
            : this.maybeInitializeSingleSelection(),
          this.hasTypeahead &&
            (this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex()));
      }),
      (e.prototype.getFocusedItemIndex = function () {
        return this.focusedItemIndex;
      }),
      (e.prototype.setWrapFocus = function (t) {
        this.wrapFocus = t;
      }),
      (e.prototype.setVerticalOrientation = function (t) {
        this.isVertical = t;
      }),
      (e.prototype.setSingleSelection = function (t) {
        (this.isSingleSelectionList = t),
          t &&
            (this.maybeInitializeSingleSelection(),
            (this.selectedIndex = this.getSelectedIndexFromDOM()));
      }),
      (e.prototype.maybeInitializeSingleSelection = function () {
        var t = this.getSelectedIndexFromDOM();
        t !== Xr.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            t,
            zr.LIST_ITEM_ACTIVATED_CLASS
          ) && this.setUseActivatedClass(!0),
          (this.isSingleSelectionList = !0),
          (this.selectedIndex = t));
      }),
      (e.prototype.getSelectedIndexFromDOM = function () {
        for (
          var t = Xr.UNSET_INDEX, e = this.adapter.getListItemCount(), n = 0;
          n < e;
          n++
        ) {
          var i = this.adapter.listItemAtIndexHasClass(
              n,
              zr.LIST_ITEM_SELECTED_CLASS
            ),
            o = this.adapter.listItemAtIndexHasClass(
              n,
              zr.LIST_ITEM_ACTIVATED_CLASS
            );
          if (i || o) {
            t = n;
            break;
          }
        }
        return t;
      }),
      (e.prototype.setHasTypeahead = function (t) {
        (this.hasTypeahead = t),
          t && (this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex());
      }),
      (e.prototype.isTypeaheadInProgress = function () {
        return this.hasTypeahead && ts(this.typeaheadState);
      }),
      (e.prototype.setUseActivatedClass = function (t) {
        this.useActivatedClass = t;
      }),
      (e.prototype.setUseSelectedAttribute = function (t) {
        this.useSelectedAttr = t;
      }),
      (e.prototype.getSelectedIndex = function () {
        return this.selectedIndex;
      }),
      (e.prototype.setSelectedIndex = function (t, e) {
        var n = (void 0 === e ? {} : e).forceUpdate;
        this.isIndexValid(t) &&
          (this.isCheckboxList
            ? this.setCheckboxAtIndex(t)
            : this.isRadioList
            ? this.setRadioAtIndex(t)
            : this.setSingleSelectionAtIndex(t, { forceUpdate: n }));
      }),
      (e.prototype.handleFocusIn = function (t) {
        t >= 0 &&
          ((this.focusedItemIndex = t),
          this.adapter.setAttributeForElementIndex(t, "tabindex", "0"),
          this.adapter.setTabIndexForListItemChildren(t, "0"));
      }),
      (e.prototype.handleFocusOut = function (t) {
        var e = this;
        t >= 0 &&
          (this.adapter.setAttributeForElementIndex(t, "tabindex", "-1"),
          this.adapter.setTabIndexForListItemChildren(t, "-1")),
          setTimeout(function () {
            e.adapter.isFocusInsideList() ||
              e.setTabindexToFirstSelectedOrFocusedItem();
          }, 0);
      }),
      (e.prototype.handleKeydown = function (t, e, n) {
        var i = this,
          o = "ArrowLeft" === Fi(t),
          r = "ArrowUp" === Fi(t),
          s = "ArrowRight" === Fi(t),
          a = "ArrowDown" === Fi(t),
          l = "Home" === Fi(t),
          c = "End" === Fi(t),
          u = "Enter" === Fi(t),
          d = "Spacebar" === Fi(t),
          p = "A" === t.key || "a" === t.key;
        if (this.adapter.isRootFocused()) {
          r || c
            ? (t.preventDefault(), this.focusLastElement())
            : (a || l) && (t.preventDefault(), this.focusFirstElement()),
            this.hasTypeahead &&
              ns(
                {
                  event: t,
                  focusItemAtIndex: function (t) {
                    i.focusItemAtIndex(t);
                  },
                  focusedItemIndex: -1,
                  isTargetListItem: e,
                  sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                  isItemAtIndexDisabled: function (t) {
                    return i.adapter.listItemAtIndexHasClass(
                      t,
                      zr.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
        } else {
          var f = this.adapter.getFocusedElementIndex();
          if (!(-1 === f && (f = n) < 0)) {
            if ((this.isVertical && a) || (!this.isVertical && s))
              Jr(t), this.focusNextElement(f);
            else if ((this.isVertical && r) || (!this.isVertical && o))
              Jr(t), this.focusPrevElement(f);
            else if (l) Jr(t), this.focusFirstElement();
            else if (c) Jr(t), this.focusLastElement();
            else if (p && t.ctrlKey && this.isCheckboxList)
              t.preventDefault(),
                this.toggleAll(
                  this.selectedIndex === Xr.UNSET_INDEX
                    ? []
                    : this.selectedIndex
                );
            else if ((u || d) && e) {
              var h = t.target;
              if (h && "A" === h.tagName && u) return;
              if (
                (Jr(t),
                this.adapter.listItemAtIndexHasClass(
                  f,
                  zr.LIST_ITEM_DISABLED_CLASS
                ))
              )
                return;
              this.isTypeaheadInProgress() ||
                (this.isSelectableList() && this.setSelectedIndexOnAction(f),
                this.adapter.notifyAction(f));
            }
            if (this.hasTypeahead)
              ns(
                {
                  event: t,
                  focusItemAtIndex: function (t) {
                    i.focusItemAtIndex(t);
                  },
                  focusedItemIndex: this.focusedItemIndex,
                  isTargetListItem: e,
                  sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                  isItemAtIndexDisabled: function (t) {
                    return i.adapter.listItemAtIndexHasClass(
                      t,
                      zr.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
          }
        }
      }),
      (e.prototype.handleClick = function (t, e) {
        t !== Xr.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            t,
            zr.LIST_ITEM_DISABLED_CLASS
          ) ||
            (this.isSelectableList() && this.setSelectedIndexOnAction(t, e),
            this.adapter.notifyAction(t)));
      }),
      (e.prototype.focusNextElement = function (t) {
        var e = t + 1;
        if (e >= this.adapter.getListItemCount()) {
          if (!this.wrapFocus) return t;
          e = 0;
        }
        return this.focusItemAtIndex(e), e;
      }),
      (e.prototype.focusPrevElement = function (t) {
        var e = t - 1;
        if (e < 0) {
          if (!this.wrapFocus) return t;
          e = this.adapter.getListItemCount() - 1;
        }
        return this.focusItemAtIndex(e), e;
      }),
      (e.prototype.focusFirstElement = function () {
        return this.focusItemAtIndex(0), 0;
      }),
      (e.prototype.focusLastElement = function () {
        var t = this.adapter.getListItemCount() - 1;
        return this.focusItemAtIndex(t), t;
      }),
      (e.prototype.focusInitialElement = function () {
        var t = this.getFirstSelectedOrFocusedItemIndex();
        return this.focusItemAtIndex(t), t;
      }),
      (e.prototype.setEnabled = function (t, e) {
        this.isIndexValid(t) &&
          (e
            ? (this.adapter.removeClassForElementIndex(
                t,
                zr.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                t,
                Yr.ARIA_DISABLED,
                "false"
              ))
            : (this.adapter.addClassForElementIndex(
                t,
                zr.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                t,
                Yr.ARIA_DISABLED,
                "true"
              )));
      }),
      (e.prototype.setSingleSelectionAtIndex = function (t, e) {
        var n = (void 0 === e ? {} : e).forceUpdate;
        if (this.selectedIndex !== t || n) {
          var i = zr.LIST_ITEM_SELECTED_CLASS;
          this.useActivatedClass && (i = zr.LIST_ITEM_ACTIVATED_CLASS),
            this.selectedIndex !== Xr.UNSET_INDEX &&
              this.adapter.removeClassForElementIndex(this.selectedIndex, i),
            this.setAriaForSingleSelectionAtIndex(t),
            this.setTabindexAtIndex(t),
            t !== Xr.UNSET_INDEX && this.adapter.addClassForElementIndex(t, i),
            (this.selectedIndex = t);
        }
      }),
      (e.prototype.setAriaForSingleSelectionAtIndex = function (t) {
        this.selectedIndex === Xr.UNSET_INDEX &&
          (this.ariaCurrentAttrValue = this.adapter.getAttributeForElementIndex(
            t,
            Yr.ARIA_CURRENT
          ));
        var e = null !== this.ariaCurrentAttrValue,
          n = e ? Yr.ARIA_CURRENT : Yr.ARIA_SELECTED;
        if (
          (this.selectedIndex !== Xr.UNSET_INDEX &&
            this.adapter.setAttributeForElementIndex(
              this.selectedIndex,
              n,
              "false"
            ),
          t !== Xr.UNSET_INDEX)
        ) {
          var i = e ? this.ariaCurrentAttrValue : "true";
          this.adapter.setAttributeForElementIndex(t, n, i);
        }
      }),
      (e.prototype.getSelectionAttribute = function () {
        return this.useSelectedAttr ? Yr.ARIA_SELECTED : Yr.ARIA_CHECKED;
      }),
      (e.prototype.setRadioAtIndex = function (t) {
        var e = this.getSelectionAttribute();
        this.adapter.setCheckedCheckboxOrRadioAtIndex(t, !0),
          this.selectedIndex !== Xr.UNSET_INDEX &&
            this.adapter.setAttributeForElementIndex(
              this.selectedIndex,
              e,
              "false"
            ),
          this.adapter.setAttributeForElementIndex(t, e, "true"),
          (this.selectedIndex = t);
      }),
      (e.prototype.setCheckboxAtIndex = function (t) {
        for (
          var e = this.getSelectionAttribute(), n = 0;
          n < this.adapter.getListItemCount();
          n++
        ) {
          var i = !1;
          t.indexOf(n) >= 0 && (i = !0),
            this.adapter.setCheckedCheckboxOrRadioAtIndex(n, i),
            this.adapter.setAttributeForElementIndex(
              n,
              e,
              i ? "true" : "false"
            );
        }
        this.selectedIndex = t;
      }),
      (e.prototype.setTabindexAtIndex = function (t) {
        this.focusedItemIndex === Xr.UNSET_INDEX && 0 !== t
          ? this.adapter.setAttributeForElementIndex(0, "tabindex", "-1")
          : this.focusedItemIndex >= 0 &&
            this.focusedItemIndex !== t &&
            this.adapter.setAttributeForElementIndex(
              this.focusedItemIndex,
              "tabindex",
              "-1"
            ),
          this.selectedIndex instanceof Array ||
            this.selectedIndex === t ||
            this.adapter.setAttributeForElementIndex(
              this.selectedIndex,
              "tabindex",
              "-1"
            ),
          t !== Xr.UNSET_INDEX &&
            this.adapter.setAttributeForElementIndex(t, "tabindex", "0");
      }),
      (e.prototype.isSelectableList = function () {
        return (
          this.isSingleSelectionList || this.isCheckboxList || this.isRadioList
        );
      }),
      (e.prototype.setTabindexToFirstSelectedOrFocusedItem = function () {
        var t = this.getFirstSelectedOrFocusedItemIndex();
        this.setTabindexAtIndex(t);
      }),
      (e.prototype.getFirstSelectedOrFocusedItemIndex = function () {
        return this.isSelectableList()
          ? "number" == typeof this.selectedIndex &&
            this.selectedIndex !== Xr.UNSET_INDEX
            ? this.selectedIndex
            : this.selectedIndex instanceof Array &&
              this.selectedIndex.length > 0
            ? this.selectedIndex.reduce(function (t, e) {
                return Math.min(t, e);
              })
            : 0
          : Math.max(this.focusedItemIndex, 0);
      }),
      (e.prototype.isIndexValid = function (t) {
        var e = this;
        if (t instanceof Array) {
          if (!this.isCheckboxList)
            throw new Error(
              "MDCListFoundation: Array of index is only supported for checkbox based list"
            );
          return (
            0 === t.length ||
            t.some(function (t) {
              return e.isIndexInRange(t);
            })
          );
        }
        if ("number" == typeof t) {
          if (this.isCheckboxList)
            throw new Error(
              "MDCListFoundation: Expected array of index for checkbox based list but got number: " +
                t
            );
          return (
            this.isIndexInRange(t) ||
            (this.isSingleSelectionList && t === Xr.UNSET_INDEX)
          );
        }
        return !1;
      }),
      (e.prototype.isIndexInRange = function (t) {
        var e = this.adapter.getListItemCount();
        return t >= 0 && t < e;
      }),
      (e.prototype.setSelectedIndexOnAction = function (t, e) {
        void 0 === e && (e = !0),
          this.isCheckboxList
            ? this.toggleCheckboxAtIndex(t, e)
            : this.setSelectedIndex(t);
      }),
      (e.prototype.toggleCheckboxAtIndex = function (t, e) {
        var n = this.getSelectionAttribute(),
          i = this.adapter.isCheckboxCheckedAtIndex(t);
        e && ((i = !i), this.adapter.setCheckedCheckboxOrRadioAtIndex(t, i)),
          this.adapter.setAttributeForElementIndex(t, n, i ? "true" : "false");
        var o =
          this.selectedIndex === Xr.UNSET_INDEX
            ? []
            : this.selectedIndex.slice();
        i
          ? o.push(t)
          : (o = o.filter(function (e) {
              return e !== t;
            })),
          (this.selectedIndex = o);
      }),
      (e.prototype.focusItemAtIndex = function (t) {
        this.adapter.focusItemAtIndex(t), (this.focusedItemIndex = t);
      }),
      (e.prototype.toggleAll = function (t) {
        var e = this.adapter.getListItemCount();
        if (t.length === e) this.setCheckboxAtIndex([]);
        else {
          for (var n = [], i = 0; i < e; i++)
            (!this.adapter.listItemAtIndexHasClass(
              i,
              zr.LIST_ITEM_DISABLED_CLASS
            ) ||
              t.indexOf(i) > -1) &&
              n.push(i);
          this.setCheckboxAtIndex(n);
        }
      }),
      (e.prototype.typeaheadMatchItem = function (t, e, n) {
        var i = this;
        return (
          void 0 === n && (n = !1),
          Zr(
            {
              focusItemAtIndex: function (t) {
                i.focusItemAtIndex(t);
              },
              focusedItemIndex: e || this.focusedItemIndex,
              nextChar: t,
              sortedIndexByFirstChar: this.sortedIndexByFirstChar,
              skipFocus: n,
              isItemAtIndexDisabled: function (t) {
                return i.adapter.listItemAtIndexHasClass(
                  t,
                  zr.LIST_ITEM_DISABLED_CLASS
                );
              },
            },
            this.typeaheadState
          )
        );
      }),
      (e.prototype.typeaheadInitSortedIndex = function () {
        return (function (t, e) {
          for (var n = new Map(), i = 0; i < t; i++) {
            var o = e(i).trim();
            if (o) {
              var r = o[0].toLowerCase();
              n.has(r) || n.set(r, []),
                n.get(r).push({ text: o.toLowerCase(), index: i });
            }
          }
          return (
            n.forEach(function (t) {
              t.sort(function (t, e) {
                return t.index - e.index;
              });
            }),
            n
          );
        })(this.adapter.getListItemCount(), this.adapter.getPrimaryTextAtIndex);
      }),
      (e.prototype.clearTypeaheadBuffer = function () {
        es(this.typeaheadState);
      }),
      e
    );
  })(oe);
  function os(t) {
    let e;
    const n = t[37].default,
      i = c(n, t, t[43], null);
    return {
      c() {
        i && i.c();
      },
      m(t, n) {
        i && i.m(t, n), (e = !0);
      },
      p(t, o) {
        i &&
          i.p &&
          (!e || 4096 & o[1]) &&
          p(i, n, t, t[43], e ? d(n, t[43], o, null) : f(t[43]), null);
      },
      i(t) {
        e || (Tt(i, t), (e = !0));
      },
      o(t) {
        Ot(i, t), (e = !1);
      },
      d(t) {
        i && i.d(t);
      },
    };
  }
  function rs(t) {
    let e, i, o;
    const r = [
      { use: [t[17], ...t[0]] },
      {
        class: Oe({
          [t[1]]: !0,
          "mdc-deprecated-list": !0,
          "mdc-deprecated-list--non-interactive": t[2],
          "mdc-deprecated-list--dense": t[3],
          "mdc-deprecated-list--textual-list": t[4],
          "mdc-deprecated-list--avatar-list": t[5] || t[18],
          "mdc-deprecated-list--icon-list": t[6],
          "mdc-deprecated-list--image-list": t[7],
          "mdc-deprecated-list--thumbnail-list": t[8],
          "mdc-deprecated-list--video-list": t[9],
          "mdc-deprecated-list--two-line": t[10],
          "smui-list--three-line": t[11] && !t[10],
        }),
      },
      { role: t[15] },
      t[23],
    ];
    var s = t[12];
    function a(t) {
      let e = { $$slots: { default: [os] }, $$scope: { ctx: t } };
      for (let t = 0; t < r.length; t += 1) e = n(e, r[t]);
      return { props: e };
    }
    return (
      s &&
        ((e = new s(a(t))),
        t[38](e),
        e.$on("keydown", t[39]),
        e.$on("focusin", t[40]),
        e.$on("focusout", t[41]),
        e.$on("click", t[42]),
        e.$on("SMUIListItem:mount", t[19]),
        e.$on("SMUIListItem:unmount", t[20]),
        e.$on("SMUI:action", t[21])),
      {
        c() {
          e && Pt(e.$$.fragment), (i = F());
        },
        m(t, n) {
          e && Ut(e, t, n), O(t, i, n), (o = !0);
        },
        p(t, n) {
          const o =
            8818687 & n[0]
              ? Mt(r, [
                  131073 & n[0] && { use: [t[17], ...t[0]] },
                  266238 & n[0] && {
                    class: Oe({
                      [t[1]]: !0,
                      "mdc-deprecated-list": !0,
                      "mdc-deprecated-list--non-interactive": t[2],
                      "mdc-deprecated-list--dense": t[3],
                      "mdc-deprecated-list--textual-list": t[4],
                      "mdc-deprecated-list--avatar-list": t[5] || t[18],
                      "mdc-deprecated-list--icon-list": t[6],
                      "mdc-deprecated-list--image-list": t[7],
                      "mdc-deprecated-list--thumbnail-list": t[8],
                      "mdc-deprecated-list--video-list": t[9],
                      "mdc-deprecated-list--two-line": t[10],
                      "smui-list--three-line": t[11] && !t[10],
                    }),
                  },
                  32768 & n[0] && { role: t[15] },
                  8388608 & n[0] && Ft(t[23]),
                ])
              : {};
          if (
            (4096 & n[1] && (o.$$scope = { dirty: n, ctx: t }),
            s !== (s = t[12]))
          ) {
            if (e) {
              xt();
              const t = e;
              Ot(t.$$.fragment, 1, 0, () => {
                Ht(t, 1);
              }),
                St();
            }
            s
              ? ((e = new s(a(t))),
                t[38](e),
                e.$on("keydown", t[39]),
                e.$on("focusin", t[40]),
                e.$on("focusout", t[41]),
                e.$on("click", t[42]),
                e.$on("SMUIListItem:mount", t[19]),
                e.$on("SMUIListItem:unmount", t[20]),
                e.$on("SMUI:action", t[21]),
                Pt(e.$$.fragment),
                Tt(e.$$.fragment, 1),
                Ut(e, i.parentNode, i))
              : (e = null);
          } else s && e.$set(o);
        },
        i(t) {
          o || (e && Tt(e.$$.fragment, t), (o = !0));
        },
        o(t) {
          e && Ot(e.$$.fragment, t), (o = !1);
        },
        d(n) {
          t[38](null), n && L(i), e && Ht(e, n);
        },
      }
    );
  }
  function ss(t, e, i) {
    const o = [
      "use",
      "class",
      "nonInteractive",
      "dense",
      "textualList",
      "avatarList",
      "iconList",
      "imageList",
      "thumbnailList",
      "videoList",
      "twoLine",
      "threeLine",
      "vertical",
      "wrapFocus",
      "singleSelection",
      "selectedIndex",
      "radioList",
      "checkList",
      "hasTypeahead",
      "component",
      "layout",
      "setEnabled",
      "getTypeaheadInProgress",
      "getSelectedIndex",
      "getFocusedItemIndex",
      "getElement",
    ];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e;
    var l;
    const { closest: c, matches: u } = ue,
      d = De(tt());
    let p,
      f,
      { use: g = [] } = e,
      { class: $ = "" } = e,
      { nonInteractive: y = !1 } = e,
      { dense: I = !1 } = e,
      { textualList: v = !1 } = e,
      { avatarList: E = !1 } = e,
      { iconList: b = !1 } = e,
      { imageList: A = !1 } = e,
      { thumbnailList: C = !1 } = e,
      { videoList: _ = !1 } = e,
      { twoLine: x = !1 } = e,
      { threeLine: S = !1 } = e,
      { vertical: T = !0 } = e,
      {
        wrapFocus: O = null !== (l = rt("SMUI:list:wrapFocus")) &&
          void 0 !== l &&
          l,
      } = e,
      { singleSelection: L = !1 } = e,
      { selectedIndex: w = -1 } = e,
      { radioList: N = !1 } = e,
      { checkList: R = !1 } = e,
      { hasTypeahead: D = !1 } = e,
      M = [],
      F = rt("SMUI:list:role"),
      k = rt("SMUI:list:nav");
    const P = new WeakMap();
    let U,
      H = rt("SMUI:dialog:selection"),
      B = rt("SMUI:addLayoutListener"),
      { component: V = k ? wn : Rn } = e;
    function j() {
      return null == p
        ? []
        : [...st().children]
            .map((t) => P.get(t))
            .filter((t) => t && t._smui_list_item_accessor);
    }
    function K(t) {
      const e = j()[t];
      e && "focus" in e.element && e.element.focus();
    }
    function G(t, e) {
      var n;
      const i = j()[t];
      return null !== (n = i && i.hasClass(e)) && void 0 !== n && n;
    }
    function W(t, e) {
      const n = j()[t];
      n && n.addClass(e);
    }
    function z(t, e) {
      const n = j()[t];
      n && n.removeClass(e);
    }
    function q(t, e, n) {
      const i = j()[t];
      i && i.addAttr(e, n);
    }
    function Y(t, e) {
      const n = j()[t];
      n && n.removeAttr(e);
    }
    function X(t, e) {
      const n = j()[t];
      return n ? n.getAttr(e) : null;
    }
    function Q(t) {
      var e;
      const n = j()[t];
      return null !== (e = n && n.getPrimaryText()) && void 0 !== e ? e : "";
    }
    function J(t) {
      const e = c(t, ".mdc-deprecated-list-item, .mdc-deprecated-list");
      return e && u(e, ".mdc-deprecated-list-item")
        ? j()
            .map((t) => (null == t ? void 0 : t.element))
            .indexOf(e)
        : -1;
    }
    function Z() {
      return f.layout();
    }
    function it() {
      return f.getSelectedIndex();
    }
    function st() {
      return p.getElement();
    }
    ot("SMUI:list:nonInteractive", y),
      ot("SMUI:separator:context", "list"),
      F ||
        (L
          ? ((F = "listbox"), ot("SMUI:list:item:role", "option"))
          : N
          ? ((F = "radiogroup"), ot("SMUI:list:item:role", "radio"))
          : R
          ? ((F = "group"), ot("SMUI:list:item:role", "checkbox"))
          : ((F = "list"), ot("SMUI:list:item:role", void 0))),
      B && (U = B(Z)),
      et(() => {
        i(
          13,
          (f = new is({
            addClassForElementIndex: W,
            focusItemAtIndex: K,
            getAttributeForElementIndex: (t, e) => {
              var n, i;
              return null !==
                (i =
                  null === (n = j()[t]) || void 0 === n
                    ? void 0
                    : n.getAttr(e)) && void 0 !== i
                ? i
                : null;
            },
            getFocusedElementIndex: () =>
              document.activeElement
                ? j()
                    .map((t) => t.element)
                    .indexOf(document.activeElement)
                : -1,
            getListItemCount: () => M.length,
            getPrimaryTextAtIndex: Q,
            hasCheckboxAtIndex: (t) => {
              var e, n;
              return (
                null !==
                  (n =
                    null === (e = j()[t]) || void 0 === e
                      ? void 0
                      : e.hasCheckbox) &&
                void 0 !== n &&
                n
              );
            },
            hasRadioAtIndex: (t) => {
              var e, n;
              return (
                null !==
                  (n =
                    null === (e = j()[t]) || void 0 === e
                      ? void 0
                      : e.hasRadio) &&
                void 0 !== n &&
                n
              );
            },
            isCheckboxCheckedAtIndex: (t) => {
              var e;
              const n = j()[t];
              return (
                null !==
                  (e = (null == n ? void 0 : n.hasCheckbox) && n.checked) &&
                void 0 !== e &&
                e
              );
            },
            isFocusInsideList: () =>
              null != p &&
              st() !== document.activeElement &&
              st().contains(document.activeElement),
            isRootFocused: () => null != p && document.activeElement === st(),
            listItemAtIndexHasClass: G,
            notifyAction: (t) => {
              i(24, (w = t)),
                null != p &&
                  Le(st(), "SMUIList:action", { index: t }, void 0, !0);
            },
            removeClassForElementIndex: z,
            setAttributeForElementIndex: q,
            setCheckedCheckboxOrRadioAtIndex: (t, e) => {
              j()[t].checked = e;
            },
            setTabIndexForListItemChildren: (t, e) => {
              const n = j()[t];
              Array.prototype.forEach.call(
                n.element.querySelectorAll("button:not(:disabled), a"),
                (t) => {
                  t.setAttribute("tabindex", e);
                }
              );
            },
          }))
        );
        const t = {
          get element() {
            return st();
          },
          get items() {
            return M;
          },
          get typeaheadInProgress() {
            return f.isTypeaheadInProgress();
          },
          typeaheadMatchItem: (t, e) => f.typeaheadMatchItem(t, e, !0),
          getOrderedList: j,
          focusItemAtIndex: K,
          addClassForElementIndex: W,
          removeClassForElementIndex: z,
          setAttributeForElementIndex: q,
          removeAttributeForElementIndex: Y,
          getAttributeFromElementIndex: X,
          getPrimaryTextAtIndex: Q,
        };
        return (
          Le(st(), "SMUIList:mount", t),
          f.init(),
          () => {
            f.destroy();
          }
        );
      }),
      nt(() => {
        U && U();
      });
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(23, (r = m(e, o))),
          "use" in t && i(0, (g = t.use)),
          "class" in t && i(1, ($ = t.class)),
          "nonInteractive" in t && i(2, (y = t.nonInteractive)),
          "dense" in t && i(3, (I = t.dense)),
          "textualList" in t && i(4, (v = t.textualList)),
          "avatarList" in t && i(5, (E = t.avatarList)),
          "iconList" in t && i(6, (b = t.iconList)),
          "imageList" in t && i(7, (A = t.imageList)),
          "thumbnailList" in t && i(8, (C = t.thumbnailList)),
          "videoList" in t && i(9, (_ = t.videoList)),
          "twoLine" in t && i(10, (x = t.twoLine)),
          "threeLine" in t && i(11, (S = t.threeLine)),
          "vertical" in t && i(25, (T = t.vertical)),
          "wrapFocus" in t && i(26, (O = t.wrapFocus)),
          "singleSelection" in t && i(27, (L = t.singleSelection)),
          "selectedIndex" in t && i(24, (w = t.selectedIndex)),
          "radioList" in t && i(28, (N = t.radioList)),
          "checkList" in t && i(29, (R = t.checkList)),
          "hasTypeahead" in t && i(30, (D = t.hasTypeahead)),
          "component" in t && i(12, (V = t.component)),
          "$$scope" in t && i(43, (a = t.$$scope));
      }),
      (t.$$.update = () => {
        33562624 & t.$$.dirty[0] && f && f.setVerticalOrientation(T),
          67117056 & t.$$.dirty[0] && f && f.setWrapFocus(O),
          1073750016 & t.$$.dirty[0] && f && f.setHasTypeahead(D),
          134225920 & t.$$.dirty[0] && f && f.setSingleSelection(L),
          151003136 & t.$$.dirty[0] &&
            f &&
            L &&
            it() !== w &&
            f.setSelectedIndex(w);
      }),
      [
        g,
        $,
        y,
        I,
        v,
        E,
        b,
        A,
        C,
        _,
        x,
        S,
        V,
        f,
        p,
        F,
        u,
        d,
        H,
        function (t) {
          M.push(t.detail),
            P.set(t.detail.element, t.detail),
            L && t.detail.selected && i(24, (w = J(t.detail.element))),
            t.stopPropagation();
        },
        function (t) {
          var e;
          const n =
            null !== (e = t.detail && M.indexOf(t.detail)) && void 0 !== e
              ? e
              : -1;
          -1 !== n && (M.splice(n, 1), P.delete(t.detail.element)),
            t.stopPropagation();
        },
        function (t) {
          if (N || R) {
            const e = J(t.target);
            if (-1 !== e) {
              const t = j()[e];
              t &&
                ((N && !t.checked) || R) &&
                ((t.checked = !t.checked),
                t.activateRipple(),
                window.requestAnimationFrame(() => {
                  t.deactivateRipple();
                }));
            }
          }
        },
        J,
        r,
        w,
        T,
        O,
        L,
        N,
        R,
        D,
        Z,
        function (t, e) {
          return f.setEnabled(t, e);
        },
        function () {
          return f.isTypeaheadInProgress();
        },
        it,
        function () {
          return f.getFocusedItemIndex();
        },
        st,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (p = t), i(14, p);
          });
        },
        (t) =>
          f &&
          f.handleKeydown(
            t,
            t.target.classList.contains("mdc-deprecated-list-item"),
            J(t.target)
          ),
        (t) => f && f.handleFocusIn(J(t.target)),
        (t) => f && f.handleFocusOut(J(t.target)),
        (t) =>
          f &&
          f.handleClick(
            J(t.target),
            !u(t.target, 'input[type="checkbox"], input[type="radio"]')
          ),
        a,
      ]
    );
  }
  class as extends Vt {
    constructor(t) {
      super(),
        Bt(
          this,
          t,
          ss,
          rs,
          a,
          {
            use: 0,
            class: 1,
            nonInteractive: 2,
            dense: 3,
            textualList: 4,
            avatarList: 5,
            iconList: 6,
            imageList: 7,
            thumbnailList: 8,
            videoList: 9,
            twoLine: 10,
            threeLine: 11,
            vertical: 25,
            wrapFocus: 26,
            singleSelection: 27,
            selectedIndex: 24,
            radioList: 28,
            checkList: 29,
            hasTypeahead: 30,
            component: 12,
            layout: 31,
            setEnabled: 32,
            getTypeaheadInProgress: 33,
            getSelectedIndex: 34,
            getFocusedItemIndex: 35,
            getElement: 36,
          },
          null,
          [-1, -1]
        );
    }
    get layout() {
      return this.$$.ctx[31];
    }
    get setEnabled() {
      return this.$$.ctx[32];
    }
    get getTypeaheadInProgress() {
      return this.$$.ctx[33];
    }
    get getSelectedIndex() {
      return this.$$.ctx[34];
    }
    get getFocusedItemIndex() {
      return this.$$.ctx[35];
    }
    get getElement() {
      return this.$$.ctx[36];
    }
  }
  function ls(t) {
    let e;
    return {
      c() {
        (e = N("span")), U(e, "class", "mdc-deprecated-list-item__ripple");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function cs(t) {
    let e,
      n,
      i = t[7] && ls();
    const o = t[32].default,
      r = c(o, t, t[35], null);
    return {
      c() {
        i && i.c(), (e = F()), r && r.c();
      },
      m(t, o) {
        i && i.m(t, o), O(t, e, o), r && r.m(t, o), (n = !0);
      },
      p(t, s) {
        t[7]
          ? i || ((i = ls()), i.c(), i.m(e.parentNode, e))
          : i && (i.d(1), (i = null)),
          r &&
            r.p &&
            (!n || 16 & s[1]) &&
            p(r, o, t, t[35], n ? d(o, t[35], s, null) : f(t[35]), null);
      },
      i(t) {
        n || (Tt(r, t), (n = !0));
      },
      o(t) {
        Ot(r, t), (n = !1);
      },
      d(t) {
        i && i.d(t), t && L(e), r && r.d(t);
      },
    };
  }
  function us(t) {
    let e, i, o;
    const r = [
      {
        use: [
          ...(t[6]
            ? []
            : [
                [
                  Wi,
                  {
                    ripple: !t[14],
                    unbounded: !1,
                    color: (t[1] || t[0]) && null == t[5] ? "primary" : t[5],
                    disabled: t[9],
                    addClass: t[22],
                    removeClass: t[23],
                    addStyle: t[24],
                  },
                ],
              ]),
          t[20],
          ...t[2],
        ],
      },
      {
        class: Oe({
          [t[3]]: !0,
          "mdc-deprecated-list-item": !0,
          "mdc-deprecated-list-item--activated": t[1],
          "mdc-deprecated-list-item--selected": t[0],
          "mdc-deprecated-list-item--disabled": t[9],
          "mdc-menu-item--selected": !t[21] && "menuitem" === t[8] && t[0],
          "smui-menu-item--non-interactive": t[6],
          ...t[16],
        }),
      },
      { style: Object.entries(t[17]).map(ps).concat([t[4]]).join(" ") },
      t[21] && t[1] ? { "aria-current": "page" } : {},
      t[21] ? {} : { role: t[8] },
      t[21] || "option" !== t[8]
        ? {}
        : { "aria-selected": t[0] ? "true" : "false" },
      t[21] || ("radio" !== t[8] && "checkbox" !== t[8])
        ? {}
        : { "aria-checked": t[14] && t[14].checked ? "true" : "false" },
      t[21] ? {} : { "aria-disabled": t[9] ? "true" : "false" },
      { "data-menu-item-skip-restore-focus": t[10] || void 0 },
      { tabindex: t[19] },
      { href: t[11] },
      t[18],
      t[27],
    ];
    var s = t[12];
    function a(t) {
      let e = { $$slots: { default: [cs] }, $$scope: { ctx: t } };
      for (let t = 0; t < r.length; t += 1) e = n(e, r[t]);
      return { props: e };
    }
    return (
      s &&
        ((e = new s(a(t))),
        t[33](e),
        e.$on("click", t[13]),
        e.$on("keydown", t[25]),
        e.$on("SMUIGenericInput:mount", t[26]),
        e.$on("SMUIGenericInput:unmount", t[34])),
      {
        c() {
          e && Pt(e.$$.fragment), (i = F());
        },
        m(t, n) {
          e && Ut(e, t, n), O(t, i, n), (o = !0);
        },
        p(t, n) {
          const o =
            167726975 & n[0]
              ? Mt(r, [
                  30425703 & n[0] && {
                    use: [
                      ...(t[6]
                        ? []
                        : [
                            [
                              Wi,
                              {
                                ripple: !t[14],
                                unbounded: !1,
                                color:
                                  (t[1] || t[0]) && null == t[5]
                                    ? "primary"
                                    : t[5],
                                disabled: t[9],
                                addClass: t[22],
                                removeClass: t[23],
                                addStyle: t[24],
                              },
                            ],
                          ]),
                      t[20],
                      ...t[2],
                    ],
                  },
                  2163531 & n[0] && {
                    class: Oe({
                      [t[3]]: !0,
                      "mdc-deprecated-list-item": !0,
                      "mdc-deprecated-list-item--activated": t[1],
                      "mdc-deprecated-list-item--selected": t[0],
                      "mdc-deprecated-list-item--disabled": t[9],
                      "mdc-menu-item--selected":
                        !t[21] && "menuitem" === t[8] && t[0],
                      "smui-menu-item--non-interactive": t[6],
                      ...t[16],
                    }),
                  },
                  131088 & n[0] && {
                    style: Object.entries(t[17])
                      .map(ps)
                      .concat([t[4]])
                      .join(" "),
                  },
                  2097154 & n[0] &&
                    Ft(t[21] && t[1] ? { "aria-current": "page" } : {}),
                  2097408 & n[0] && Ft(t[21] ? {} : { role: t[8] }),
                  2097409 & n[0] &&
                    Ft(
                      t[21] || "option" !== t[8]
                        ? {}
                        : { "aria-selected": t[0] ? "true" : "false" }
                    ),
                  2113792 & n[0] &&
                    Ft(
                      t[21] || ("radio" !== t[8] && "checkbox" !== t[8])
                        ? {}
                        : {
                            "aria-checked":
                              t[14] && t[14].checked ? "true" : "false",
                          }
                    ),
                  2097664 & n[0] &&
                    Ft(
                      t[21] ? {} : { "aria-disabled": t[9] ? "true" : "false" }
                    ),
                  1024 & n[0] && {
                    "data-menu-item-skip-restore-focus": t[10] || void 0,
                  },
                  524288 & n[0] && { tabindex: t[19] },
                  2048 & n[0] && { href: t[11] },
                  262144 & n[0] && Ft(t[18]),
                  134217728 & n[0] && Ft(t[27]),
                ])
              : {};
          if (
            ((128 & n[0]) | (16 & n[1]) && (o.$$scope = { dirty: n, ctx: t }),
            s !== (s = t[12]))
          ) {
            if (e) {
              xt();
              const t = e;
              Ot(t.$$.fragment, 1, 0, () => {
                Ht(t, 1);
              }),
                St();
            }
            s
              ? ((e = new s(a(t))),
                t[33](e),
                e.$on("click", t[13]),
                e.$on("keydown", t[25]),
                e.$on("SMUIGenericInput:mount", t[26]),
                e.$on("SMUIGenericInput:unmount", t[34]),
                Pt(e.$$.fragment),
                Tt(e.$$.fragment, 1),
                Ut(e, i.parentNode, i))
              : (e = null);
          } else s && e.$set(o);
        },
        i(t) {
          o || (e && Tt(e.$$.fragment, t), (o = !0));
        },
        o(t) {
          e && Ot(e.$$.fragment, t), (o = !1);
        },
        d(n) {
          t[33](null), n && L(i), e && Ht(e, n);
        },
      }
    );
  }
  let ds = 0;
  const ps = ([t, e]) => `${t}: ${e};`;
  function fs(t, e, i) {
    let o;
    const r = [
      "use",
      "class",
      "style",
      "color",
      "nonInteractive",
      "ripple",
      "activated",
      "role",
      "selected",
      "disabled",
      "skipRestoreFocus",
      "tabindex",
      "inputId",
      "href",
      "component",
      "action",
      "getPrimaryText",
      "getElement",
    ];
    let s = m(e, r),
      { $$slots: a = {}, $$scope: l } = e;
    var c;
    const u = De(tt());
    let d = () => {};
    let { use: p = [] } = e,
      { class: f = "" } = e,
      { style: g = "" } = e,
      { color: $ } = e,
      {
        nonInteractive: y = null !== (c = rt("SMUI:list:nonInteractive")) &&
          void 0 !== c &&
          c,
      } = e;
    ot("SMUI:list:nonInteractive", void 0);
    let { ripple: I = !y } = e,
      { activated: v = !1 } = e,
      { role: E = rt("SMUI:list:item:role") } = e;
    ot("SMUI:list:item:role", void 0);
    let b,
      A,
      C,
      { selected: _ = !1 } = e,
      { disabled: x = !1 } = e,
      { skipRestoreFocus: S = !1 } = e,
      { tabindex: T = d } = e,
      { inputId: O = "SMUI-form-field-list-" + ds++ } = e,
      { href: L } = e,
      w = {},
      N = {},
      R = {},
      D = rt("SMUI:list:item:nav"),
      { component: M = D ? (L ? bn : Nn) : Ln } = e;
    function F(t) {
      return t in w ? w[t] : G().classList.contains(t);
    }
    function k(t) {
      w[t] || i(16, (w[t] = !0), w);
    }
    function P(t) {
      (t in w && !w[t]) || i(16, (w[t] = !1), w);
    }
    function U(t) {
      var e;
      return t in R
        ? null !== (e = R[t]) && void 0 !== e
          ? e
          : null
        : G().getAttribute(t);
    }
    function H(t, e) {
      R[t] !== e && i(18, (R[t] = e), R);
    }
    function B(t) {
      (t in R && null == R[t]) || i(18, (R[t] = void 0), R);
    }
    function V() {
      let t = !0,
        e = b.getElement();
      for (; e.nextElementSibling; )
        if (
          ((e = e.nextElementSibling),
          1 === e.nodeType && e.classList.contains("mdc-deprecated-list-item"))
        ) {
          const n = e.attributes.getNamedItem("tabindex");
          if (n && "0" === n.value) {
            t = !1;
            break;
          }
        }
      t && i(19, (o = 0));
    }
    function j(t) {
      x || Le(G(), "SMUI:action", t);
    }
    function K() {
      var t, e, n;
      const i = G(),
        o = i.querySelector(".mdc-deprecated-list-item__primary-text");
      if (o) return null !== (t = o.textContent) && void 0 !== t ? t : "";
      const r = i.querySelector(".mdc-deprecated-list-item__text");
      return r
        ? null !== (e = r.textContent) && void 0 !== e
          ? e
          : ""
        : null !== (n = i.textContent) && void 0 !== n
        ? n
        : "";
    }
    function G() {
      return b.getElement();
    }
    ot("SMUI:generic:input:props", { id: O }),
      ot("SMUI:separator:context", void 0),
      et(() => {
        if (!_ && !y) {
          let t = !0,
            e = b;
          for (; e.previousSibling; )
            if (
              ((e = e.previousSibling),
              1 === e.nodeType &&
                e.classList.contains("mdc-deprecated-list-item") &&
                !e.classList.contains("mdc-deprecated-list-item--disabled"))
            ) {
              t = !1;
              break;
            }
          t && (C = window.requestAnimationFrame(V));
        }
        const t = {
          _smui_list_item_accessor: !0,
          get element() {
            return G();
          },
          get selected() {
            return _;
          },
          set selected(t) {
            i(0, (_ = t));
          },
          hasClass: F,
          addClass: k,
          removeClass: P,
          getAttr: U,
          addAttr: H,
          removeAttr: B,
          getPrimaryText: K,
          get checked() {
            var t;
            return null !== (t = A && A.checked) && void 0 !== t && t;
          },
          set checked(t) {
            A && i(14, (A.checked = !!t), A);
          },
          get hasCheckbox() {
            return !(!A || !("_smui_checkbox_accessor" in A));
          },
          get hasRadio() {
            return !(!A || !("_smui_radio_accessor" in A));
          },
          activateRipple() {
            A && A.activateRipple();
          },
          deactivateRipple() {
            A && A.deactivateRipple();
          },
          getValue: () => s.value,
          action: j,
          get tabindex() {
            return o;
          },
          set tabindex(t) {
            i(28, (T = t));
          },
          get disabled() {
            return x;
          },
          get activated() {
            return v;
          },
          set activated(t) {
            i(1, (v = t));
          },
        };
        return (
          Le(G(), "SMUIListItem:mount", t),
          () => {
            Le(G(), "SMUIListItem:unmount", t);
          }
        );
      }),
      nt(() => {
        C && window.cancelAnimationFrame(C);
      });
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(27, (s = m(e, r))),
          "use" in t && i(2, (p = t.use)),
          "class" in t && i(3, (f = t.class)),
          "style" in t && i(4, (g = t.style)),
          "color" in t && i(5, ($ = t.color)),
          "nonInteractive" in t && i(6, (y = t.nonInteractive)),
          "ripple" in t && i(7, (I = t.ripple)),
          "activated" in t && i(1, (v = t.activated)),
          "role" in t && i(8, (E = t.role)),
          "selected" in t && i(0, (_ = t.selected)),
          "disabled" in t && i(9, (x = t.disabled)),
          "skipRestoreFocus" in t && i(10, (S = t.skipRestoreFocus)),
          "tabindex" in t && i(28, (T = t.tabindex)),
          "inputId" in t && i(29, (O = t.inputId)),
          "href" in t && i(11, (L = t.href)),
          "component" in t && i(12, (M = t.component)),
          "$$scope" in t && i(35, (l = t.$$scope));
      }),
      (t.$$.update = () => {
        268452417 & t.$$.dirty[0] &&
          i(
            19,
            (o = T === d ? (y || x || !(_ || (A && A.checked)) ? -1 : 0) : T)
          );
      }),
      [
        _,
        v,
        p,
        f,
        g,
        $,
        y,
        I,
        E,
        x,
        S,
        L,
        M,
        j,
        A,
        b,
        w,
        N,
        R,
        o,
        u,
        D,
        k,
        P,
        function (t, e) {
          N[t] != e &&
            ("" === e || null == e
              ? (delete N[t], i(17, N))
              : i(17, (N[t] = e), N));
        },
        function (t) {
          const e = "Enter" === t.key,
            n = "Space" === t.key;
          (e || n) && j(t);
        },
        function (t) {
          ("_smui_checkbox_accessor" in t.detail ||
            "_smui_radio_accessor" in t.detail) &&
            i(14, (A = t.detail));
        },
        s,
        T,
        O,
        K,
        G,
        a,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (b = t), i(15, b);
          });
        },
        () => i(14, (A = void 0)),
        l,
      ]
    );
  }
  var hs = Qe({ class: "mdc-deprecated-list-item__text", component: Nn }),
    ms = Qe({ class: "mdc-deprecated-list-item__primary-text", component: Nn }),
    gs = Qe({
      class: "mdc-deprecated-list-item__secondary-text",
      component: Nn,
    });
  function $s(t) {
    let e, i, o, a, l, u;
    const h = t[8].default,
      m = c(h, t, t[7], null);
    let g = [
        {
          class: (i = Oe({
            [t[1]]: !0,
            "mdc-deprecated-list-item__graphic": !0,
            "mdc-menu__selection-group-icon": t[4],
          })),
        },
        t[5],
      ],
      $ = {};
    for (let t = 0; t < g.length; t += 1) $ = n($, g[t]);
    return {
      c() {
        (e = N("span")), m && m.c(), H(e, $);
      },
      m(n, i) {
        O(n, e, i),
          m && m.m(e, null),
          t[9](e),
          (a = !0),
          l ||
            ((u = [I((o = Fe.call(null, e, t[0]))), I(t[3].call(null, e))]),
            (l = !0));
      },
      p(t, [n]) {
        m &&
          m.p &&
          (!a || 128 & n) &&
          p(m, h, t, t[7], a ? d(h, t[7], n, null) : f(t[7]), null),
          H(
            e,
            ($ = Mt(g, [
              (!a ||
                (2 & n &&
                  i !==
                    (i = Oe({
                      [t[1]]: !0,
                      "mdc-deprecated-list-item__graphic": !0,
                      "mdc-menu__selection-group-icon": t[4],
                    })))) && { class: i },
              32 & n && t[5],
            ]))
          ),
          o && s(o.update) && 1 & n && o.update.call(null, t[0]);
      },
      i(t) {
        a || (Tt(m, t), (a = !0));
      },
      o(t) {
        Ot(m, t), (a = !1);
      },
      d(n) {
        n && L(e), m && m.d(n), t[9](null), (l = !1), r(u);
      },
    };
  }
  function ys(t, e, i) {
    const o = ["use", "class", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e;
    const l = De(tt());
    let c,
      { use: u = [] } = e,
      { class: d = "" } = e,
      p = rt("SMUI:list:graphic:menu-selection-group");
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(5, (r = m(e, o))),
          "use" in t && i(0, (u = t.use)),
          "class" in t && i(1, (d = t.class)),
          "$$scope" in t && i(7, (a = t.$$scope));
      }),
      [
        u,
        d,
        c,
        l,
        p,
        r,
        function () {
          return c;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (c = t), i(2, c);
          });
        },
      ]
    );
  }
  var Is = Qe({ class: "mdc-deprecated-list-item__meta", component: Nn });
  Qe({ class: "mdc-deprecated-list-group", component: Cn }),
    Qe({ class: "mdc-deprecated-list-group__subheader", component: Sn });
  const vs = class extends Vt {
      constructor(t) {
        super(),
          Bt(
            this,
            t,
            fs,
            us,
            a,
            {
              use: 2,
              class: 3,
              style: 4,
              color: 5,
              nonInteractive: 6,
              ripple: 7,
              activated: 1,
              role: 8,
              selected: 0,
              disabled: 9,
              skipRestoreFocus: 10,
              tabindex: 28,
              inputId: 29,
              href: 11,
              component: 12,
              action: 13,
              getPrimaryText: 30,
              getElement: 31,
            },
            null,
            [-1, -1]
          );
      }
      get action() {
        return this.$$.ctx[13];
      }
      get getPrimaryText() {
        return this.$$.ctx[30];
      }
      get getElement() {
        return this.$$.ctx[31];
      }
    },
    Es = class extends Vt {
      constructor(t) {
        super(), Bt(this, t, ys, $s, a, { use: 0, class: 1, getElement: 6 });
      }
      get getElement() {
        return this.$$.ctx[6];
      }
    };
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var bs = {
      ANIMATE: "mdc-drawer--animate",
      CLOSING: "mdc-drawer--closing",
      DISMISSIBLE: "mdc-drawer--dismissible",
      MODAL: "mdc-drawer--modal",
      OPEN: "mdc-drawer--open",
      OPENING: "mdc-drawer--opening",
      ROOT: "mdc-drawer",
    },
    As = {
      APP_CONTENT_SELECTOR: ".mdc-drawer-app-content",
      CLOSE_EVENT: "MDCDrawer:closed",
      OPEN_EVENT: "MDCDrawer:opened",
      SCRIM_SELECTOR: ".mdc-drawer-scrim",
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      LIST_ITEM_ACTIVATED_SELECTOR:
        ".mdc-list-item--activated,.mdc-deprecated-list-item--activated",
    },
    Cs = (function (t) {
      function e(n) {
        var i = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
        return (i.animationFrame = 0), (i.animationTimer = 0), i;
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "strings", {
          get: function () {
            return As;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return bs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              hasClass: function () {
                return !1;
              },
              elementHasClass: function () {
                return !1;
              },
              notifyClose: function () {},
              notifyOpen: function () {},
              saveFocus: function () {},
              restoreFocus: function () {},
              focusActiveNavigationItem: function () {},
              trapFocus: function () {},
              releaseFocus: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.destroy = function () {
          this.animationFrame && cancelAnimationFrame(this.animationFrame),
            this.animationTimer && clearTimeout(this.animationTimer);
        }),
        (e.prototype.open = function () {
          var t = this;
          this.isOpen() ||
            this.isOpening() ||
            this.isClosing() ||
            (this.adapter.addClass(bs.OPEN),
            this.adapter.addClass(bs.ANIMATE),
            this.runNextAnimationFrame(function () {
              t.adapter.addClass(bs.OPENING);
            }),
            this.adapter.saveFocus());
        }),
        (e.prototype.close = function () {
          !this.isOpen() ||
            this.isOpening() ||
            this.isClosing() ||
            this.adapter.addClass(bs.CLOSING);
        }),
        (e.prototype.isOpen = function () {
          return this.adapter.hasClass(bs.OPEN);
        }),
        (e.prototype.isOpening = function () {
          return (
            this.adapter.hasClass(bs.OPENING) ||
            this.adapter.hasClass(bs.ANIMATE)
          );
        }),
        (e.prototype.isClosing = function () {
          return this.adapter.hasClass(bs.CLOSING);
        }),
        (e.prototype.handleKeydown = function (t) {
          var e = t.keyCode;
          ("Escape" === t.key || 27 === e) && this.close();
        }),
        (e.prototype.handleTransitionEnd = function (t) {
          var e = bs.OPENING,
            n = bs.CLOSING,
            i = bs.OPEN,
            o = bs.ANIMATE,
            r = bs.ROOT;
          this.isElement(t.target) &&
            this.adapter.elementHasClass(t.target, r) &&
            (this.isClosing()
              ? (this.adapter.removeClass(i),
                this.closed(),
                this.adapter.restoreFocus(),
                this.adapter.notifyClose())
              : (this.adapter.focusActiveNavigationItem(),
                this.opened(),
                this.adapter.notifyOpen()),
            this.adapter.removeClass(o),
            this.adapter.removeClass(e),
            this.adapter.removeClass(n));
        }),
        (e.prototype.opened = function () {}),
        (e.prototype.closed = function () {}),
        (e.prototype.runNextAnimationFrame = function (t) {
          var e = this;
          cancelAnimationFrame(this.animationFrame),
            (this.animationFrame = requestAnimationFrame(function () {
              (e.animationFrame = 0),
                clearTimeout(e.animationTimer),
                (e.animationTimer = setTimeout(t, 0));
            }));
        }),
        (e.prototype.isElement = function (t) {
          return Boolean(t.classList);
        }),
        e
      );
    })(oe),
    _s = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        Qt(e, t),
        (e.prototype.handleScrimClick = function () {
          this.close();
        }),
        (e.prototype.opened = function () {
          this.adapter.trapFocus();
        }),
        (e.prototype.closed = function () {
          this.adapter.releaseFocus();
        }),
        e
      );
    })(Cs);
  function xs(t) {
    let e, i, o, a, l, u;
    const h = t[15].default,
      m = c(h, t, t[14], null);
    let g = [
        {
          class: (i = Oe({
            [t[1]]: !0,
            "mdc-drawer": !0,
            "mdc-drawer--dismissible": "dismissible" === t[2],
            "mdc-drawer--modal": "modal" === t[2],
            "smui-drawer__absolute": "modal" === t[2] && !t[3],
            ...t[6],
          })),
        },
        t[8],
      ],
      $ = {};
    for (let t = 0; t < g.length; t += 1) $ = n($, g[t]);
    return {
      c() {
        (e = N("aside")), m && m.c(), H(e, $);
      },
      m(n, i) {
        O(n, e, i),
          m && m.m(e, null),
          t[16](e),
          (a = !0),
          l ||
            ((u = [
              I((o = Fe.call(null, e, t[0]))),
              I(t[7].call(null, e)),
              k(e, "keydown", t[17]),
              k(e, "transitionend", t[18]),
            ]),
            (l = !0));
      },
      p(t, [n]) {
        m &&
          m.p &&
          (!a || 16384 & n) &&
          p(m, h, t, t[14], a ? d(h, t[14], n, null) : f(t[14]), null),
          H(
            e,
            ($ = Mt(g, [
              (!a ||
                (78 & n &&
                  i !==
                    (i = Oe({
                      [t[1]]: !0,
                      "mdc-drawer": !0,
                      "mdc-drawer--dismissible": "dismissible" === t[2],
                      "mdc-drawer--modal": "modal" === t[2],
                      "smui-drawer__absolute": "modal" === t[2] && !t[3],
                      ...t[6],
                    })))) && { class: i },
              256 & n && t[8],
            ]))
          ),
          o && s(o.update) && 1 & n && o.update.call(null, t[0]);
      },
      i(t) {
        a || (Tt(m, t), (a = !0));
      },
      o(t) {
        Ot(m, t), (a = !1);
      },
      d(n) {
        n && L(e), m && m.d(n), t[16](null), (l = !1), r(u);
      },
    };
  }
  function Ss(t, e, i) {
    const o = [
      "use",
      "class",
      "variant",
      "open",
      "fixed",
      "setOpen",
      "isOpen",
      "getElement",
    ];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e;
    const { FocusTrap: l } = ii,
      c = De(tt());
    let u,
      d,
      p,
      { use: f = [] } = e,
      { class: g = "" } = e,
      { variant: $ } = e,
      { open: y = !1 } = e,
      { fixed: I = !0 } = e,
      v = {},
      E = null,
      b = !1;
    ot("SMUI:list:nav", !0),
      ot("SMUI:list:item:nav", !0),
      ot("SMUI:list:wrapFocus", !0);
    let A = $;
    function C() {
      var t, e;
      b && b.removeEventListener("SMUIDrawerScrim:click", T),
        "modal" === $ &&
          ((b =
            null !==
              (e =
                null === (t = u.parentNode) || void 0 === t
                  ? void 0
                  : t.querySelector(".mdc-drawer-scrim")) &&
            void 0 !== e &&
            e),
          b && b.addEventListener("SMUIDrawerScrim:click", T));
      const n = "dismissible" === $ ? Cs : "modal" === $ ? _s : void 0;
      return n
        ? new n({
            addClass: x,
            removeClass: S,
            hasClass: _,
            elementHasClass: (t, e) => t.classList.contains(e),
            saveFocus: () => (E = document.activeElement),
            restoreFocus: () => {
              E &&
                "focus" in E &&
                u.contains(document.activeElement) &&
                E.focus();
            },
            focusActiveNavigationItem: () => {
              const t = u.querySelector(
                ".mdc-list-item--activated,.mdc-deprecated-list-item--activated"
              );
              t && t.focus();
            },
            notifyClose: () => {
              i(9, (y = !1)), Le(u, "SMUIDrawer:closed", void 0, void 0, !0);
            },
            notifyOpen: () => {
              i(9, (y = !0)), Le(u, "SMUIDrawer:opened", void 0, void 0, !0);
            },
            trapFocus: () => p.trapFocus(),
            releaseFocus: () => p.releaseFocus(),
          })
        : void 0;
    }
    function _(t) {
      return t in v ? v[t] : O().classList.contains(t);
    }
    function x(t) {
      v[t] || i(6, (v[t] = !0), v);
    }
    function S(t) {
      (t in v && !v[t]) || i(6, (v[t] = !1), v);
    }
    function T() {
      d && "handleScrimClick" in d && d.handleScrimClick();
    }
    function O() {
      return u;
    }
    et(() => {
      (p = new l(u, { skipInitialFocus: !0 })), i(4, (d = C())), d && d.init();
    }),
      nt(() => {
        d && d.destroy(),
          b && b.removeEventListener("SMUIDrawerScrim:click", T);
      });
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(8, (r = m(e, o))),
          "use" in t && i(0, (f = t.use)),
          "class" in t && i(1, (g = t.class)),
          "variant" in t && i(2, ($ = t.variant)),
          "open" in t && i(9, (y = t.open)),
          "fixed" in t && i(3, (I = t.fixed)),
          "$$scope" in t && i(14, (a = t.$$scope));
      }),
      (t.$$.update = () => {
        8212 & t.$$.dirty &&
          A !== $ &&
          (i(13, (A = $)),
          d && d.destroy(),
          i(6, (v = {})),
          i(4, (d = C())),
          d && d.init()),
          528 & t.$$.dirty &&
            d &&
            d.isOpen() !== y &&
            (y ? d.open() : d.close());
      }),
      [
        f,
        g,
        $,
        I,
        d,
        u,
        v,
        c,
        r,
        y,
        function (t) {
          i(9, (y = t));
        },
        function () {
          return y;
        },
        O,
        A,
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(5, u);
          });
        },
        (t) => d && d.handleKeydown(t),
        (t) => d && d.handleTransitionEnd(t),
      ]
    );
  }
  class Ts extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, Ss, xs, a, {
          use: 0,
          class: 1,
          variant: 2,
          open: 9,
          fixed: 3,
          setOpen: 10,
          isOpen: 11,
          getElement: 12,
        });
    }
    get setOpen() {
      return this.$$.ctx[10];
    }
    get isOpen() {
      return this.$$.ctx[11];
    }
    get getElement() {
      return this.$$.ctx[12];
    }
  }
  var Os = Qe({ class: "mdc-drawer-app-content", component: Cn }),
    Ls = Qe({ class: "mdc-drawer__content", component: Cn });
  Qe({ class: "mdc-drawer__header", component: Cn }),
    Qe({ class: "mdc-drawer__title", component: _n }),
    Qe({ class: "mdc-drawer__subtitle", component: xn });
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var ws = {
    animation: { prefixed: "-webkit-animation", standard: "animation" },
    transform: { prefixed: "-webkit-transform", standard: "transform" },
    transition: { prefixed: "-webkit-transition", standard: "transition" },
  };
  function Ns(t, e) {
    if (
      (function (t) {
        return (
          Boolean(t.document) && "function" == typeof t.document.createElement
        );
      })(t) &&
      e in ws
    ) {
      var n = t.document.createElement("div"),
        i = ws[e],
        o = i.standard,
        r = i.prefixed;
      return o in n.style ? o : r;
    }
    return e;
  }
  /**
   * @license
   * Copyright 2017 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var Rs = {
      CLOSED_CLASS: "mdc-linear-progress--closed",
      CLOSED_ANIMATION_OFF_CLASS: "mdc-linear-progress--closed-animation-off",
      INDETERMINATE_CLASS: "mdc-linear-progress--indeterminate",
      REVERSED_CLASS: "mdc-linear-progress--reversed",
      ANIMATION_READY_CLASS: "mdc-linear-progress--animation-ready",
    },
    Ds = {
      ARIA_HIDDEN: "aria-hidden",
      ARIA_VALUEMAX: "aria-valuemax",
      ARIA_VALUEMIN: "aria-valuemin",
      ARIA_VALUENOW: "aria-valuenow",
      BUFFER_BAR_SELECTOR: ".mdc-linear-progress__buffer-bar",
      FLEX_BASIS: "flex-basis",
      PRIMARY_BAR_SELECTOR: ".mdc-linear-progress__primary-bar",
    },
    Ms = 0.8367142,
    Fs = 2.00611057,
    ks = 0.37651913,
    Ps = 0.84386165,
    Us = 1.60277782,
    Hs = (function (t) {
      function e(n) {
        var i = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
        return (i.observer = null), i;
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return Rs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "strings", {
          get: function () {
            return Ds;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              attachResizeObserver: function () {
                return null;
              },
              forceLayout: function () {},
              getWidth: function () {
                return 0;
              },
              hasClass: function () {
                return !1;
              },
              setBufferBarStyle: function () {
                return null;
              },
              setPrimaryBarStyle: function () {
                return null;
              },
              setStyle: function () {},
              removeAttribute: function () {},
              removeClass: function () {},
              setAttribute: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.init = function () {
          var t = this;
          (this.determinate = !this.adapter.hasClass(Rs.INDETERMINATE_CLASS)),
            this.adapter.addClass(Rs.ANIMATION_READY_CLASS),
            (this.progress = 0),
            (this.buffer = 1),
            (this.observer = this.adapter.attachResizeObserver(function (e) {
              var n, i;
              if (!t.determinate)
                try {
                  for (var o = ee(e), r = o.next(); !r.done; r = o.next()) {
                    var s = r.value;
                    s.contentRect &&
                      t.calculateAndSetDimensions(s.contentRect.width);
                  }
                } catch (t) {
                  n = { error: t };
                } finally {
                  try {
                    r && !r.done && (i = o.return) && i.call(o);
                  } finally {
                    if (n) throw n.error;
                  }
                }
            })),
            !this.determinate &&
              this.observer &&
              this.calculateAndSetDimensions(this.adapter.getWidth());
        }),
        (e.prototype.setDeterminate = function (t) {
          if (((this.determinate = t), this.determinate))
            return (
              this.adapter.removeClass(Rs.INDETERMINATE_CLASS),
              this.adapter.setAttribute(
                Ds.ARIA_VALUENOW,
                this.progress.toString()
              ),
              this.adapter.setAttribute(Ds.ARIA_VALUEMAX, "1"),
              this.adapter.setAttribute(Ds.ARIA_VALUEMIN, "0"),
              this.setPrimaryBarProgress(this.progress),
              void this.setBufferBarProgress(this.buffer)
            );
          this.observer &&
            this.calculateAndSetDimensions(this.adapter.getWidth()),
            this.adapter.addClass(Rs.INDETERMINATE_CLASS),
            this.adapter.removeAttribute(Ds.ARIA_VALUENOW),
            this.adapter.removeAttribute(Ds.ARIA_VALUEMAX),
            this.adapter.removeAttribute(Ds.ARIA_VALUEMIN),
            this.setPrimaryBarProgress(1),
            this.setBufferBarProgress(1);
        }),
        (e.prototype.isDeterminate = function () {
          return this.determinate;
        }),
        (e.prototype.setProgress = function (t) {
          (this.progress = t),
            this.determinate &&
              (this.setPrimaryBarProgress(t),
              this.adapter.setAttribute(Ds.ARIA_VALUENOW, t.toString()));
        }),
        (e.prototype.getProgress = function () {
          return this.progress;
        }),
        (e.prototype.setBuffer = function (t) {
          (this.buffer = t), this.determinate && this.setBufferBarProgress(t);
        }),
        (e.prototype.getBuffer = function () {
          return this.buffer;
        }),
        (e.prototype.open = function () {
          this.adapter.removeClass(Rs.CLOSED_CLASS),
            this.adapter.removeClass(Rs.CLOSED_ANIMATION_OFF_CLASS),
            this.adapter.removeAttribute(Ds.ARIA_HIDDEN);
        }),
        (e.prototype.close = function () {
          this.adapter.addClass(Rs.CLOSED_CLASS),
            this.adapter.setAttribute(Ds.ARIA_HIDDEN, "true");
        }),
        (e.prototype.isClosed = function () {
          return this.adapter.hasClass(Rs.CLOSED_CLASS);
        }),
        (e.prototype.handleTransitionEnd = function () {
          this.adapter.hasClass(Rs.CLOSED_CLASS) &&
            this.adapter.addClass(Rs.CLOSED_ANIMATION_OFF_CLASS);
        }),
        (e.prototype.destroy = function () {
          t.prototype.destroy.call(this),
            this.observer && this.observer.disconnect();
        }),
        (e.prototype.restartAnimation = function () {
          this.adapter.removeClass(Rs.ANIMATION_READY_CLASS),
            this.adapter.forceLayout(),
            this.adapter.addClass(Rs.ANIMATION_READY_CLASS);
        }),
        (e.prototype.setPrimaryBarProgress = function (t) {
          var e = "scaleX(" + t + ")",
            n =
              "undefined" != typeof window
                ? Ns(window, "transform")
                : "transform";
          this.adapter.setPrimaryBarStyle(n, e);
        }),
        (e.prototype.setBufferBarProgress = function (t) {
          var e = 100 * t + "%";
          this.adapter.setBufferBarStyle(Ds.FLEX_BASIS, e);
        }),
        (e.prototype.calculateAndSetDimensions = function (t) {
          var e = t * Ms,
            n = t * Fs,
            i = t * ks,
            o = t * Ps,
            r = t * Us;
          this.adapter.setStyle("--mdc-linear-progress-primary-half", e + "px"),
            this.adapter.setStyle(
              "--mdc-linear-progress-primary-half-neg",
              -e + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-primary-full",
              n + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-primary-full-neg",
              -n + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-quarter",
              i + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-quarter-neg",
              -i + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-half",
              o + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-half-neg",
              -o + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-full",
              r + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-full-neg",
              -r + "px"
            ),
            this.restartAnimation();
        }),
        e
      );
    })(oe);
  function Bs(e) {
    let i,
      o,
      a,
      l,
      c,
      u,
      d,
      p,
      f,
      h,
      m,
      g,
      $,
      y,
      v,
      E,
      b,
      A,
      C,
      _,
      S = [
        {
          class: ($ = Oe({
            [e[1]]: !0,
            "mdc-linear-progress": !0,
            "mdc-linear-progress--indeterminate": e[3],
            "mdc-linear-progress--closed": e[4],
            "mdc-data-table__linear-progress": "data-table" === e[14],
            ...e[8],
          })),
        },
        { style: (y = Object.entries(e[10]).map(Ks).concat([e[2]]).join(" ")) },
        { role: "progressbar" },
        { "aria-valuemin": (v = 0) },
        { "aria-valuemax": (E = 1) },
        { "aria-valuenow": (b = e[3] ? void 0 : e[5]) },
        e[9],
        e[16],
      ],
      T = {};
    for (let t = 0; t < S.length; t += 1) T = n(T, S[t]);
    return {
      c() {
        (i = N("div")),
          (o = N("div")),
          (a = N("div")),
          (c = M()),
          (u = N("div")),
          (d = M()),
          (p = N("div")),
          (f = N("span")),
          (m = M()),
          (g = N("div")),
          (g.innerHTML =
            '<span class="mdc-linear-progress__bar-inner"></span>'),
          U(a, "class", "mdc-linear-progress__buffer-bar"),
          U(a, "style", (l = Object.entries(e[11]).map(Vs).join(" "))),
          U(u, "class", "mdc-linear-progress__buffer-dots"),
          U(o, "class", "mdc-linear-progress__buffer"),
          U(f, "class", "mdc-linear-progress__bar-inner"),
          U(
            p,
            "class",
            "mdc-linear-progress__bar mdc-linear-progress__primary-bar"
          ),
          U(p, "style", (h = Object.entries(e[12]).map(js).join(" "))),
          U(
            g,
            "class",
            "mdc-linear-progress__bar mdc-linear-progress__secondary-bar"
          ),
          H(i, T);
      },
      m(t, n) {
        O(t, i, n),
          x(i, o),
          x(o, a),
          x(o, c),
          x(o, u),
          x(i, d),
          x(i, p),
          x(p, f),
          x(i, m),
          x(i, g),
          e[19](i),
          C ||
            ((_ = [
              I((A = Fe.call(null, i, e[0]))),
              I(e[13].call(null, i)),
              k(i, "transitionend", e[20]),
            ]),
            (C = !0));
      },
      p(t, [e]) {
        2048 & e &&
          l !== (l = Object.entries(t[11]).map(Vs).join(" ")) &&
          U(a, "style", l),
          4096 & e &&
            h !== (h = Object.entries(t[12]).map(js).join(" ")) &&
            U(p, "style", h),
          H(
            i,
            (T = Mt(S, [
              282 & e &&
                $ !==
                  ($ = Oe({
                    [t[1]]: !0,
                    "mdc-linear-progress": !0,
                    "mdc-linear-progress--indeterminate": t[3],
                    "mdc-linear-progress--closed": t[4],
                    "mdc-data-table__linear-progress": "data-table" === t[14],
                    ...t[8],
                  })) && { class: $ },
              1028 & e &&
                y !==
                  (y = Object.entries(t[10])
                    .map(Ks)
                    .concat([t[2]])
                    .join(" ")) && { style: y },
              { role: "progressbar" },
              { "aria-valuemin": 0 },
              { "aria-valuemax": 1 },
              40 & e &&
                b !== (b = t[3] ? void 0 : t[5]) && { "aria-valuenow": b },
              512 & e && t[9],
              65536 & e && t[16],
            ]))
          ),
          A && s(A.update) && 1 & e && A.update.call(null, t[0]);
      },
      i: t,
      o: t,
      d(t) {
        t && L(i), e[19](null), (C = !1), r(_);
      },
    };
  }
  const Vs = ([t, e]) => `${t}: ${e};`,
    js = ([t, e]) => `${t}: ${e};`,
    Ks = ([t, e]) => `${t}: ${e};`;
  function Gs(t, e, i) {
    const o = [
      "use",
      "class",
      "style",
      "indeterminate",
      "closed",
      "progress",
      "buffer",
      "getElement",
    ];
    let r,
      s = m(e, o);
    const a = De(tt());
    let c,
      u,
      { use: d = [] } = e,
      { class: p = "" } = e,
      { style: f = "" } = e,
      { indeterminate: g = !1 } = e,
      { closed: $ = !1 } = e,
      { progress: I = 0 } = e,
      { buffer: v } = e,
      E = {},
      b = {},
      A = {},
      C = {},
      _ = {},
      x = rt("SMUI:linear-progress:context"),
      S = rt("SMUI:linear-progress:closed");
    function T(t) {
      return t in E ? E[t] : F().classList.contains(t);
    }
    function O(t) {
      E[t] || i(8, (E[t] = !0), E);
    }
    function L(t) {
      (t in E && !E[t]) || i(8, (E[t] = !1), E);
    }
    function w(t, e) {
      b[t] !== e && i(9, (b[t] = e), b);
    }
    function N(t) {
      (t in b && null == b[t]) || i(9, (b[t] = void 0), b);
    }
    function R(t, e) {
      A[t] != e &&
        ("" === e || null == e
          ? (delete A[t], i(10, A))
          : i(10, (A[t] = e), A));
    }
    function D(t, e) {
      C[t] != e &&
        ("" === e || null == e
          ? (delete C[t], i(11, C))
          : i(11, (C[t] = e), C));
    }
    function M(t, e) {
      _[t] != e &&
        ("" === e || null == e
          ? (delete _[t], i(12, _))
          : i(12, (_[t] = e), _));
    }
    function F() {
      return c;
    }
    l(t, S, (t) => i(21, (r = t))),
      et(
        () => (
          i(
            6,
            (u = new Hs({
              addClass: O,
              forceLayout: () => {
                F().getBoundingClientRect();
              },
              setBufferBarStyle: D,
              setPrimaryBarStyle: M,
              hasClass: T,
              removeAttribute: N,
              removeClass: L,
              setAttribute: w,
              setStyle: R,
              attachResizeObserver: (t) => {
                const e = window.ResizeObserver;
                if (e) {
                  const n = new e(t);
                  return n.observe(F()), n;
                }
                return null;
              },
              getWidth: () => F().offsetWidth,
            }))
          ),
          u.init(),
          () => {
            u.destroy();
          }
        )
      );
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(16, (s = m(e, o))),
          "use" in t && i(0, (d = t.use)),
          "class" in t && i(1, (p = t.class)),
          "style" in t && i(2, (f = t.style)),
          "indeterminate" in t && i(3, (g = t.indeterminate)),
          "closed" in t && i(4, ($ = t.closed)),
          "progress" in t && i(5, (I = t.progress)),
          "buffer" in t && i(17, (v = t.buffer));
      }),
      (t.$$.update = () => {
        16 & t.$$.dirty && S && y(S, (r = $), r),
          72 & t.$$.dirty &&
            u &&
            u.isDeterminate() !== !g &&
            u.setDeterminate(!g),
          96 & t.$$.dirty && u && u.getProgress() !== I && u.setProgress(I),
          131136 & t.$$.dirty &&
            u &&
            (null == v ? u.setBuffer(1) : u.setBuffer(v)),
          80 & t.$$.dirty && u && ($ ? u.close() : u.open());
      }),
      [
        d,
        p,
        f,
        g,
        $,
        I,
        u,
        c,
        E,
        b,
        A,
        C,
        _,
        a,
        x,
        S,
        s,
        v,
        F,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (c = t), i(7, c);
          });
        },
        () => u && u.handleTransitionEnd(),
      ]
    );
  }
  class Ws extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, Gs, Bs, a, {
          use: 0,
          class: 1,
          style: 2,
          indeterminate: 3,
          closed: 4,
          progress: 5,
          buffer: 17,
          getElement: 18,
        });
    }
    get getElement() {
      return this.$$.ctx[18];
    }
  }
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var zs,
    qs,
    Ys = {
      ANCHOR: "mdc-menu-surface--anchor",
      ANIMATING_CLOSED: "mdc-menu-surface--animating-closed",
      ANIMATING_OPEN: "mdc-menu-surface--animating-open",
      FIXED: "mdc-menu-surface--fixed",
      IS_OPEN_BELOW: "mdc-menu-surface--is-open-below",
      OPEN: "mdc-menu-surface--open",
      ROOT: "mdc-menu-surface",
    },
    Xs = {
      CLOSED_EVENT: "MDCMenuSurface:closed",
      CLOSING_EVENT: "MDCMenuSurface:closing",
      OPENED_EVENT: "MDCMenuSurface:opened",
      FOCUSABLE_ELEMENTS: [
        "button:not(:disabled)",
        '[href]:not([aria-disabled="true"])',
        "input:not(:disabled)",
        "select:not(:disabled)",
        "textarea:not(:disabled)",
        '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])',
      ].join(", "),
    },
    Qs = {
      TRANSITION_OPEN_DURATION: 120,
      TRANSITION_CLOSE_DURATION: 75,
      MARGIN_TO_EDGE: 32,
      ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: 0.67,
      TOUCH_EVENT_WAIT_MS: 30,
    };
  !(function (t) {
    (t[(t.BOTTOM = 1)] = "BOTTOM"),
      (t[(t.CENTER = 2)] = "CENTER"),
      (t[(t.RIGHT = 4)] = "RIGHT"),
      (t[(t.FLIP_RTL = 8)] = "FLIP_RTL");
  })(zs || (zs = {})),
    (function (t) {
      (t[(t.TOP_LEFT = 0)] = "TOP_LEFT"),
        (t[(t.TOP_RIGHT = 4)] = "TOP_RIGHT"),
        (t[(t.BOTTOM_LEFT = 1)] = "BOTTOM_LEFT"),
        (t[(t.BOTTOM_RIGHT = 5)] = "BOTTOM_RIGHT"),
        (t[(t.TOP_START = 8)] = "TOP_START"),
        (t[(t.TOP_END = 12)] = "TOP_END"),
        (t[(t.BOTTOM_START = 9)] = "BOTTOM_START"),
        (t[(t.BOTTOM_END = 13)] = "BOTTOM_END");
    })(qs || (qs = {}));
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var Js,
    Zs = (function (t) {
      function e(n) {
        var i = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
        return (
          (i.isSurfaceOpen = !1),
          (i.isQuickOpen = !1),
          (i.isHoistedElement = !1),
          (i.isFixedPosition = !1),
          (i.isHorizontallyCenteredOnViewport = !1),
          (i.maxHeight = 0),
          (i.openAnimationEndTimerId = 0),
          (i.closeAnimationEndTimerId = 0),
          (i.animationRequestId = 0),
          (i.anchorCorner = qs.TOP_START),
          (i.originCorner = qs.TOP_START),
          (i.anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 }),
          (i.position = { x: 0, y: 0 }),
          i
        );
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return Ys;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "strings", {
          get: function () {
            return Xs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "numbers", {
          get: function () {
            return Qs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "Corner", {
          get: function () {
            return qs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              hasClass: function () {
                return !1;
              },
              hasAnchor: function () {
                return !1;
              },
              isElementInContainer: function () {
                return !1;
              },
              isFocused: function () {
                return !1;
              },
              isRtl: function () {
                return !1;
              },
              getInnerDimensions: function () {
                return { height: 0, width: 0 };
              },
              getAnchorDimensions: function () {
                return null;
              },
              getWindowDimensions: function () {
                return { height: 0, width: 0 };
              },
              getBodyDimensions: function () {
                return { height: 0, width: 0 };
              },
              getWindowScroll: function () {
                return { x: 0, y: 0 };
              },
              setPosition: function () {},
              setMaxHeight: function () {},
              setTransformOrigin: function () {},
              saveFocus: function () {},
              restoreFocus: function () {},
              notifyClose: function () {},
              notifyOpen: function () {},
              notifyClosing: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.init = function () {
          var t = e.cssClasses,
            n = t.ROOT,
            i = t.OPEN;
          if (!this.adapter.hasClass(n))
            throw new Error(n + " class required in root element.");
          this.adapter.hasClass(i) && (this.isSurfaceOpen = !0);
        }),
        (e.prototype.destroy = function () {
          clearTimeout(this.openAnimationEndTimerId),
            clearTimeout(this.closeAnimationEndTimerId),
            cancelAnimationFrame(this.animationRequestId);
        }),
        (e.prototype.setAnchorCorner = function (t) {
          this.anchorCorner = t;
        }),
        (e.prototype.flipCornerHorizontally = function () {
          this.originCorner = this.originCorner ^ zs.RIGHT;
        }),
        (e.prototype.setAnchorMargin = function (t) {
          (this.anchorMargin.top = t.top || 0),
            (this.anchorMargin.right = t.right || 0),
            (this.anchorMargin.bottom = t.bottom || 0),
            (this.anchorMargin.left = t.left || 0);
        }),
        (e.prototype.setIsHoisted = function (t) {
          this.isHoistedElement = t;
        }),
        (e.prototype.setFixedPosition = function (t) {
          this.isFixedPosition = t;
        }),
        (e.prototype.isFixed = function () {
          return this.isFixedPosition;
        }),
        (e.prototype.setAbsolutePosition = function (t, e) {
          (this.position.x = this.isFinite(t) ? t : 0),
            (this.position.y = this.isFinite(e) ? e : 0);
        }),
        (e.prototype.setIsHorizontallyCenteredOnViewport = function (t) {
          this.isHorizontallyCenteredOnViewport = t;
        }),
        (e.prototype.setQuickOpen = function (t) {
          this.isQuickOpen = t;
        }),
        (e.prototype.setMaxHeight = function (t) {
          this.maxHeight = t;
        }),
        (e.prototype.isOpen = function () {
          return this.isSurfaceOpen;
        }),
        (e.prototype.open = function () {
          var t = this;
          this.isSurfaceOpen ||
            (this.adapter.saveFocus(),
            this.isQuickOpen
              ? ((this.isSurfaceOpen = !0),
                this.adapter.addClass(e.cssClasses.OPEN),
                (this.dimensions = this.adapter.getInnerDimensions()),
                this.autoposition(),
                this.adapter.notifyOpen())
              : (this.adapter.addClass(e.cssClasses.ANIMATING_OPEN),
                (this.animationRequestId = requestAnimationFrame(function () {
                  (t.dimensions = t.adapter.getInnerDimensions()),
                    t.autoposition(),
                    t.adapter.addClass(e.cssClasses.OPEN),
                    (t.openAnimationEndTimerId = setTimeout(function () {
                      (t.openAnimationEndTimerId = 0),
                        t.adapter.removeClass(e.cssClasses.ANIMATING_OPEN),
                        t.adapter.notifyOpen();
                    }, Qs.TRANSITION_OPEN_DURATION));
                })),
                (this.isSurfaceOpen = !0)));
        }),
        (e.prototype.close = function (t) {
          var n = this;
          if ((void 0 === t && (t = !1), this.isSurfaceOpen)) {
            if ((this.adapter.notifyClosing(), this.isQuickOpen))
              return (
                (this.isSurfaceOpen = !1),
                t || this.maybeRestoreFocus(),
                this.adapter.removeClass(e.cssClasses.OPEN),
                this.adapter.removeClass(e.cssClasses.IS_OPEN_BELOW),
                void this.adapter.notifyClose()
              );
            this.adapter.addClass(e.cssClasses.ANIMATING_CLOSED),
              requestAnimationFrame(function () {
                n.adapter.removeClass(e.cssClasses.OPEN),
                  n.adapter.removeClass(e.cssClasses.IS_OPEN_BELOW),
                  (n.closeAnimationEndTimerId = setTimeout(function () {
                    (n.closeAnimationEndTimerId = 0),
                      n.adapter.removeClass(e.cssClasses.ANIMATING_CLOSED),
                      n.adapter.notifyClose();
                  }, Qs.TRANSITION_CLOSE_DURATION));
              }),
              (this.isSurfaceOpen = !1),
              t || this.maybeRestoreFocus();
          }
        }),
        (e.prototype.handleBodyClick = function (t) {
          var e = t.target;
          this.adapter.isElementInContainer(e) || this.close();
        }),
        (e.prototype.handleKeydown = function (t) {
          var e = t.keyCode;
          ("Escape" === t.key || 27 === e) && this.close();
        }),
        (e.prototype.autoposition = function () {
          var t;
          this.measurements = this.getAutoLayoutmeasurements();
          var n = this.getoriginCorner(),
            i = this.getMenuSurfaceMaxHeight(n),
            o = this.hasBit(n, zs.BOTTOM) ? "bottom" : "top",
            r = this.hasBit(n, zs.RIGHT) ? "right" : "left",
            s = this.getHorizontalOriginOffset(n),
            a = this.getVerticalOriginOffset(n),
            l = this.measurements,
            c = l.anchorSize,
            u = l.surfaceSize,
            d = (((t = {})[r] = s), (t[o] = a), t);
          c.width / u.width > Qs.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO &&
            (r = "center"),
            (this.isHoistedElement || this.isFixedPosition) &&
              this.adjustPositionForHoistedElement(d),
            this.adapter.setTransformOrigin(r + " " + o),
            this.adapter.setPosition(d),
            this.adapter.setMaxHeight(i ? i + "px" : ""),
            this.hasBit(n, zs.BOTTOM) ||
              this.adapter.addClass(e.cssClasses.IS_OPEN_BELOW);
        }),
        (e.prototype.getAutoLayoutmeasurements = function () {
          var t = this.adapter.getAnchorDimensions(),
            e = this.adapter.getBodyDimensions(),
            n = this.adapter.getWindowDimensions(),
            i = this.adapter.getWindowScroll();
          return (
            t ||
              (t = {
                top: this.position.y,
                right: this.position.x,
                bottom: this.position.y,
                left: this.position.x,
                width: 0,
                height: 0,
              }),
            {
              anchorSize: t,
              bodySize: e,
              surfaceSize: this.dimensions,
              viewportDistance: {
                top: t.top,
                right: n.width - t.right,
                bottom: n.height - t.bottom,
                left: t.left,
              },
              viewportSize: n,
              windowScroll: i,
            }
          );
        }),
        (e.prototype.getoriginCorner = function () {
          var t,
            n,
            i = this.originCorner,
            o = this.measurements,
            r = o.viewportDistance,
            s = o.anchorSize,
            a = o.surfaceSize,
            l = e.numbers.MARGIN_TO_EDGE;
          this.hasBit(this.anchorCorner, zs.BOTTOM)
            ? ((t = r.top - l + this.anchorMargin.bottom),
              (n = r.bottom - l - this.anchorMargin.bottom))
            : ((t = r.top - l + this.anchorMargin.top),
              (n = r.bottom - l + s.height - this.anchorMargin.top)),
            !(n - a.height > 0) && t > n && (i = this.setBit(i, zs.BOTTOM));
          var c,
            u,
            d = this.adapter.isRtl(),
            p = this.hasBit(this.anchorCorner, zs.FLIP_RTL),
            f =
              this.hasBit(this.anchorCorner, zs.RIGHT) ||
              this.hasBit(i, zs.RIGHT),
            h = !1;
          (h = d && p ? !f : f)
            ? ((c = r.left + s.width + this.anchorMargin.right),
              (u = r.right - this.anchorMargin.right))
            : ((c = r.left + this.anchorMargin.left),
              (u = r.right + s.width - this.anchorMargin.left));
          var m = c - a.width > 0,
            g = u - a.width > 0,
            $ = this.hasBit(i, zs.FLIP_RTL) && this.hasBit(i, zs.RIGHT);
          return (
            (g && $ && d) || (!m && $)
              ? (i = this.unsetBit(i, zs.RIGHT))
              : ((m && h && d) || (m && !h && f) || (!g && c >= u)) &&
                (i = this.setBit(i, zs.RIGHT)),
            i
          );
        }),
        (e.prototype.getMenuSurfaceMaxHeight = function (t) {
          if (this.maxHeight > 0) return this.maxHeight;
          var n = this.measurements.viewportDistance,
            i = 0,
            o = this.hasBit(t, zs.BOTTOM),
            r = this.hasBit(this.anchorCorner, zs.BOTTOM),
            s = e.numbers.MARGIN_TO_EDGE;
          return (
            o
              ? ((i = n.top + this.anchorMargin.top - s),
                r || (i += this.measurements.anchorSize.height))
              : ((i =
                  n.bottom -
                  this.anchorMargin.bottom +
                  this.measurements.anchorSize.height -
                  s),
                r && (i -= this.measurements.anchorSize.height)),
            i
          );
        }),
        (e.prototype.getHorizontalOriginOffset = function (t) {
          var e = this.measurements.anchorSize,
            n = this.hasBit(t, zs.RIGHT),
            i = this.hasBit(this.anchorCorner, zs.RIGHT);
          if (n) {
            var o = i
              ? e.width - this.anchorMargin.left
              : this.anchorMargin.right;
            return this.isHoistedElement || this.isFixedPosition
              ? o -
                  (this.measurements.viewportSize.width -
                    this.measurements.bodySize.width)
              : o;
          }
          return i ? e.width - this.anchorMargin.right : this.anchorMargin.left;
        }),
        (e.prototype.getVerticalOriginOffset = function (t) {
          var e = this.measurements.anchorSize,
            n = this.hasBit(t, zs.BOTTOM),
            i = this.hasBit(this.anchorCorner, zs.BOTTOM);
          return n
            ? i
              ? e.height - this.anchorMargin.top
              : -this.anchorMargin.bottom
            : i
            ? e.height + this.anchorMargin.bottom
            : this.anchorMargin.top;
        }),
        (e.prototype.adjustPositionForHoistedElement = function (t) {
          var e,
            n,
            i = this.measurements,
            o = i.windowScroll,
            r = i.viewportDistance,
            s = i.surfaceSize,
            a = i.viewportSize,
            l = Object.keys(t);
          try {
            for (var c = ee(l), u = c.next(); !u.done; u = c.next()) {
              var d = u.value,
                p = t[d] || 0;
              !this.isHorizontallyCenteredOnViewport ||
              ("left" !== d && "right" !== d)
                ? ((p += r[d]),
                  this.isFixedPosition ||
                    ("top" === d
                      ? (p += o.y)
                      : "bottom" === d
                      ? (p -= o.y)
                      : "left" === d
                      ? (p += o.x)
                      : (p -= o.x)),
                  (t[d] = p))
                : (t[d] = (a.width - s.width) / 2);
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              u && !u.done && (n = c.return) && n.call(c);
            } finally {
              if (e) throw e.error;
            }
          }
        }),
        (e.prototype.maybeRestoreFocus = function () {
          var t = this,
            e = this.adapter.isFocused(),
            n =
              document.activeElement &&
              this.adapter.isElementInContainer(document.activeElement);
          (e || n) &&
            setTimeout(function () {
              t.adapter.restoreFocus();
            }, Qs.TOUCH_EVENT_WAIT_MS);
        }),
        (e.prototype.hasBit = function (t, e) {
          return Boolean(t & e);
        }),
        (e.prototype.setBit = function (t, e) {
          return t | e;
        }),
        (e.prototype.unsetBit = function (t, e) {
          return t ^ e;
        }),
        (e.prototype.isFinite = function (t) {
          return "number" == typeof t && isFinite(t);
        }),
        e
      );
    })(oe),
    ta = {
      MENU_SELECTED_LIST_ITEM: "mdc-menu-item--selected",
      MENU_SELECTION_GROUP: "mdc-menu__selection-group",
      ROOT: "mdc-menu",
    },
    ea = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_DISABLED_ATTR: "aria-disabled",
      CHECKBOX_SELECTOR: 'input[type="checkbox"]',
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      SELECTED_EVENT: "MDCMenu:selected",
      SKIP_RESTORE_FOCUS: "data-menu-item-skip-restore-focus",
    },
    na = { FOCUS_ROOT_INDEX: -1 };
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ !(function (t) {
    (t[(t.NONE = 0)] = "NONE"),
      (t[(t.LIST_ROOT = 1)] = "LIST_ROOT"),
      (t[(t.FIRST_ITEM = 2)] = "FIRST_ITEM"),
      (t[(t.LAST_ITEM = 3)] = "LAST_ITEM");
  })(Js || (Js = {}));
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var ia = (function (t) {
      function e(n) {
        var i = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
        return (
          (i.closeAnimationEndTimerId = 0),
          (i.defaultFocusState = Js.LIST_ROOT),
          (i.selectedIndex = -1),
          i
        );
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return ta;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "strings", {
          get: function () {
            return ea;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "numbers", {
          get: function () {
            return na;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              addClassToElementAtIndex: function () {},
              removeClassFromElementAtIndex: function () {},
              addAttributeToElementAtIndex: function () {},
              removeAttributeFromElementAtIndex: function () {},
              getAttributeFromElementAtIndex: function () {
                return null;
              },
              elementContainsClass: function () {
                return !1;
              },
              closeSurface: function () {},
              getElementIndex: function () {
                return -1;
              },
              notifySelected: function () {},
              getMenuItemCount: function () {
                return 0;
              },
              focusItemAtIndex: function () {},
              focusListRoot: function () {},
              getSelectedSiblingOfItemAtIndex: function () {
                return -1;
              },
              isSelectableItemAtIndex: function () {
                return !1;
              },
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.destroy = function () {
          this.closeAnimationEndTimerId &&
            clearTimeout(this.closeAnimationEndTimerId),
            this.adapter.closeSurface();
        }),
        (e.prototype.handleKeydown = function (t) {
          var e = t.key,
            n = t.keyCode;
          ("Tab" === e || 9 === n) && this.adapter.closeSurface(!0);
        }),
        (e.prototype.handleItemAction = function (t) {
          var e = this,
            n = this.adapter.getElementIndex(t);
          if (!(n < 0)) {
            this.adapter.notifySelected({ index: n });
            var i =
              "true" ===
              this.adapter.getAttributeFromElementAtIndex(
                n,
                ea.SKIP_RESTORE_FOCUS
              );
            this.adapter.closeSurface(i),
              (this.closeAnimationEndTimerId = setTimeout(function () {
                var n = e.adapter.getElementIndex(t);
                n >= 0 &&
                  e.adapter.isSelectableItemAtIndex(n) &&
                  e.setSelectedIndex(n);
              }, Zs.numbers.TRANSITION_CLOSE_DURATION));
          }
        }),
        (e.prototype.handleMenuSurfaceOpened = function () {
          switch (this.defaultFocusState) {
            case Js.FIRST_ITEM:
              this.adapter.focusItemAtIndex(0);
              break;
            case Js.LAST_ITEM:
              this.adapter.focusItemAtIndex(
                this.adapter.getMenuItemCount() - 1
              );
              break;
            case Js.NONE:
              break;
            default:
              this.adapter.focusListRoot();
          }
        }),
        (e.prototype.setDefaultFocusState = function (t) {
          this.defaultFocusState = t;
        }),
        (e.prototype.getSelectedIndex = function () {
          return this.selectedIndex;
        }),
        (e.prototype.setSelectedIndex = function (t) {
          if (
            (this.validatedIndex(t), !this.adapter.isSelectableItemAtIndex(t))
          )
            throw new Error(
              "MDCMenuFoundation: No selection group at specified index."
            );
          var e = this.adapter.getSelectedSiblingOfItemAtIndex(t);
          e >= 0 &&
            (this.adapter.removeAttributeFromElementAtIndex(
              e,
              ea.ARIA_CHECKED_ATTR
            ),
            this.adapter.removeClassFromElementAtIndex(
              e,
              ta.MENU_SELECTED_LIST_ITEM
            )),
            this.adapter.addClassToElementAtIndex(
              t,
              ta.MENU_SELECTED_LIST_ITEM
            ),
            this.adapter.addAttributeToElementAtIndex(
              t,
              ea.ARIA_CHECKED_ATTR,
              "true"
            ),
            (this.selectedIndex = t);
        }),
        (e.prototype.setEnabled = function (t, e) {
          this.validatedIndex(t),
            e
              ? (this.adapter.removeClassFromElementAtIndex(
                  t,
                  zr.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  t,
                  ea.ARIA_DISABLED_ATTR,
                  "false"
                ))
              : (this.adapter.addClassToElementAtIndex(
                  t,
                  zr.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  t,
                  ea.ARIA_DISABLED_ATTR,
                  "true"
                ));
        }),
        (e.prototype.validatedIndex = function (t) {
          var e = this.adapter.getMenuItemCount();
          if (!(t >= 0 && t < e))
            throw new Error(
              "MDCMenuFoundation: No list item at specified index."
            );
        }),
        e
      );
    })(oe),
    oa = {
      ACTIVATED: "mdc-select--activated",
      DISABLED: "mdc-select--disabled",
      FOCUSED: "mdc-select--focused",
      INVALID: "mdc-select--invalid",
      MENU_INVALID: "mdc-select__menu--invalid",
      OUTLINED: "mdc-select--outlined",
      REQUIRED: "mdc-select--required",
      ROOT: "mdc-select",
      WITH_LEADING_ICON: "mdc-select--with-leading-icon",
    },
    ra = {
      ARIA_CONTROLS: "aria-controls",
      ARIA_DESCRIBEDBY: "aria-describedby",
      ARIA_SELECTED_ATTR: "aria-selected",
      CHANGE_EVENT: "MDCSelect:change",
      HIDDEN_INPUT_SELECTOR: 'input[type="hidden"]',
      LABEL_SELECTOR: ".mdc-floating-label",
      LEADING_ICON_SELECTOR: ".mdc-select__icon",
      LINE_RIPPLE_SELECTOR: ".mdc-line-ripple",
      MENU_SELECTOR: ".mdc-select__menu",
      OUTLINE_SELECTOR: ".mdc-notched-outline",
      SELECTED_TEXT_SELECTOR: ".mdc-select__selected-text",
      SELECT_ANCHOR_SELECTOR: ".mdc-select__anchor",
      VALUE_ATTR: "data-value",
    },
    sa = { LABEL_SCALE: 0.75, UNSET_INDEX: -1, CLICK_DEBOUNCE_TIMEOUT_MS: 330 },
    aa = (function (t) {
      function e(n, i) {
        void 0 === i && (i = {});
        var o = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
        return (
          (o.disabled = !1),
          (o.isMenuOpen = !1),
          (o.useDefaultValidation = !0),
          (o.customValidity = !0),
          (o.lastSelectedIndex = sa.UNSET_INDEX),
          (o.clickDebounceTimeout = 0),
          (o.recentlyClicked = !1),
          (o.leadingIcon = i.leadingIcon),
          (o.helperText = i.helperText),
          o
        );
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return oa;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "numbers", {
          get: function () {
            return sa;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "strings", {
          get: function () {
            return ra;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              hasClass: function () {
                return !1;
              },
              activateBottomLine: function () {},
              deactivateBottomLine: function () {},
              getSelectedIndex: function () {
                return -1;
              },
              setSelectedIndex: function () {},
              hasLabel: function () {
                return !1;
              },
              floatLabel: function () {},
              getLabelWidth: function () {
                return 0;
              },
              setLabelRequired: function () {},
              hasOutline: function () {
                return !1;
              },
              notchOutline: function () {},
              closeOutline: function () {},
              setRippleCenter: function () {},
              notifyChange: function () {},
              setSelectedText: function () {},
              isSelectAnchorFocused: function () {
                return !1;
              },
              getSelectAnchorAttr: function () {
                return "";
              },
              setSelectAnchorAttr: function () {},
              removeSelectAnchorAttr: function () {},
              addMenuClass: function () {},
              removeMenuClass: function () {},
              openMenu: function () {},
              closeMenu: function () {},
              getAnchorElement: function () {
                return null;
              },
              setMenuAnchorElement: function () {},
              setMenuAnchorCorner: function () {},
              setMenuWrapFocus: function () {},
              focusMenuItemAtIndex: function () {},
              getMenuItemCount: function () {
                return 0;
              },
              getMenuItemValues: function () {
                return [];
              },
              getMenuItemTextAtIndex: function () {
                return "";
              },
              isTypeaheadInProgress: function () {
                return !1;
              },
              typeaheadMatchItem: function () {
                return -1;
              },
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.getSelectedIndex = function () {
          return this.adapter.getSelectedIndex();
        }),
        (e.prototype.setSelectedIndex = function (t, e, n) {
          void 0 === e && (e = !1),
            void 0 === n && (n = !1),
            t >= this.adapter.getMenuItemCount() ||
              (t === sa.UNSET_INDEX
                ? this.adapter.setSelectedText("")
                : this.adapter.setSelectedText(
                    this.adapter.getMenuItemTextAtIndex(t).trim()
                  ),
              this.adapter.setSelectedIndex(t),
              e && this.adapter.closeMenu(),
              n || this.lastSelectedIndex === t || this.handleChange(),
              (this.lastSelectedIndex = t));
        }),
        (e.prototype.setValue = function (t, e) {
          void 0 === e && (e = !1);
          var n = this.adapter.getMenuItemValues().indexOf(t);
          this.setSelectedIndex(n, !1, e);
        }),
        (e.prototype.getValue = function () {
          var t = this.adapter.getSelectedIndex(),
            e = this.adapter.getMenuItemValues();
          return t !== sa.UNSET_INDEX ? e[t] : "";
        }),
        (e.prototype.getDisabled = function () {
          return this.disabled;
        }),
        (e.prototype.setDisabled = function (t) {
          (this.disabled = t),
            this.disabled
              ? (this.adapter.addClass(oa.DISABLED), this.adapter.closeMenu())
              : this.adapter.removeClass(oa.DISABLED),
            this.leadingIcon && this.leadingIcon.setDisabled(this.disabled),
            this.disabled
              ? this.adapter.removeSelectAnchorAttr("tabindex")
              : this.adapter.setSelectAnchorAttr("tabindex", "0"),
            this.adapter.setSelectAnchorAttr(
              "aria-disabled",
              this.disabled.toString()
            );
        }),
        (e.prototype.openMenu = function () {
          this.adapter.addClass(oa.ACTIVATED),
            this.adapter.openMenu(),
            (this.isMenuOpen = !0),
            this.adapter.setSelectAnchorAttr("aria-expanded", "true");
        }),
        (e.prototype.setHelperTextContent = function (t) {
          this.helperText && this.helperText.setContent(t);
        }),
        (e.prototype.layout = function () {
          if (this.adapter.hasLabel()) {
            var t = this.getValue().length > 0,
              e = this.adapter.hasClass(oa.FOCUSED),
              n = t || e,
              i = this.adapter.hasClass(oa.REQUIRED);
            this.notchOutline(n),
              this.adapter.floatLabel(n),
              this.adapter.setLabelRequired(i);
          }
        }),
        (e.prototype.layoutOptions = function () {
          var t = this.adapter.getMenuItemValues().indexOf(this.getValue());
          this.setSelectedIndex(t, !1, !0);
        }),
        (e.prototype.handleMenuOpened = function () {
          if (0 !== this.adapter.getMenuItemValues().length) {
            var t = this.getSelectedIndex(),
              e = t >= 0 ? t : 0;
            this.adapter.focusMenuItemAtIndex(e);
          }
        }),
        (e.prototype.handleMenuClosing = function () {
          this.adapter.setSelectAnchorAttr("aria-expanded", "false");
        }),
        (e.prototype.handleMenuClosed = function () {
          this.adapter.removeClass(oa.ACTIVATED),
            (this.isMenuOpen = !1),
            this.adapter.isSelectAnchorFocused() || this.blur();
        }),
        (e.prototype.handleChange = function () {
          this.layout(),
            this.adapter.notifyChange(this.getValue()),
            this.adapter.hasClass(oa.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (e.prototype.handleMenuItemAction = function (t) {
          this.setSelectedIndex(t, !0);
        }),
        (e.prototype.handleFocus = function () {
          this.adapter.addClass(oa.FOCUSED),
            this.layout(),
            this.adapter.activateBottomLine();
        }),
        (e.prototype.handleBlur = function () {
          this.isMenuOpen || this.blur();
        }),
        (e.prototype.handleClick = function (t) {
          this.disabled ||
            this.recentlyClicked ||
            (this.setClickDebounceTimeout(),
            this.isMenuOpen
              ? this.adapter.closeMenu()
              : (this.adapter.setRippleCenter(t), this.openMenu()));
        }),
        (e.prototype.handleKeydown = function (t) {
          if (!this.isMenuOpen && this.adapter.hasClass(oa.FOCUSED)) {
            var e = Fi(t) === si,
              n = Fi(t) === ai,
              i = Fi(t) === fi,
              o = Fi(t) === mi;
            if (
              !(t.ctrlKey || t.metaKey) &&
              ((!n && t.key && 1 === t.key.length) ||
                (n && this.adapter.isTypeaheadInProgress()))
            ) {
              var r = n ? " " : t.key,
                s = this.adapter.typeaheadMatchItem(r, this.getSelectedIndex());
              return (
                s >= 0 && this.setSelectedIndex(s), void t.preventDefault()
              );
            }
            (e || n || i || o) &&
              (i && this.getSelectedIndex() > 0
                ? this.setSelectedIndex(this.getSelectedIndex() - 1)
                : o &&
                  this.getSelectedIndex() <
                    this.adapter.getMenuItemCount() - 1 &&
                  this.setSelectedIndex(this.getSelectedIndex() + 1),
              this.openMenu(),
              t.preventDefault());
          }
        }),
        (e.prototype.notchOutline = function (t) {
          if (this.adapter.hasOutline()) {
            var e = this.adapter.hasClass(oa.FOCUSED);
            if (t) {
              var n = sa.LABEL_SCALE,
                i = this.adapter.getLabelWidth() * n;
              this.adapter.notchOutline(i);
            } else e || this.adapter.closeOutline();
          }
        }),
        (e.prototype.setLeadingIconAriaLabel = function (t) {
          this.leadingIcon && this.leadingIcon.setAriaLabel(t);
        }),
        (e.prototype.setLeadingIconContent = function (t) {
          this.leadingIcon && this.leadingIcon.setContent(t);
        }),
        (e.prototype.getUseDefaultValidation = function () {
          return this.useDefaultValidation;
        }),
        (e.prototype.setUseDefaultValidation = function (t) {
          this.useDefaultValidation = t;
        }),
        (e.prototype.setValid = function (t) {
          this.useDefaultValidation || (this.customValidity = t),
            this.adapter.setSelectAnchorAttr("aria-invalid", (!t).toString()),
            t
              ? (this.adapter.removeClass(oa.INVALID),
                this.adapter.removeMenuClass(oa.MENU_INVALID))
              : (this.adapter.addClass(oa.INVALID),
                this.adapter.addMenuClass(oa.MENU_INVALID)),
            this.syncHelperTextValidity(t);
        }),
        (e.prototype.isValid = function () {
          return this.useDefaultValidation &&
            this.adapter.hasClass(oa.REQUIRED) &&
            !this.adapter.hasClass(oa.DISABLED)
            ? this.getSelectedIndex() !== sa.UNSET_INDEX &&
                (0 !== this.getSelectedIndex() || Boolean(this.getValue()))
            : this.customValidity;
        }),
        (e.prototype.setRequired = function (t) {
          t
            ? this.adapter.addClass(oa.REQUIRED)
            : this.adapter.removeClass(oa.REQUIRED),
            this.adapter.setSelectAnchorAttr("aria-required", t.toString()),
            this.adapter.setLabelRequired(t);
        }),
        (e.prototype.getRequired = function () {
          return "true" === this.adapter.getSelectAnchorAttr("aria-required");
        }),
        (e.prototype.init = function () {
          var t = this.adapter.getAnchorElement();
          t &&
            (this.adapter.setMenuAnchorElement(t),
            this.adapter.setMenuAnchorCorner(qs.BOTTOM_START)),
            this.adapter.setMenuWrapFocus(!1),
            this.setDisabled(this.adapter.hasClass(oa.DISABLED)),
            this.syncHelperTextValidity(!this.adapter.hasClass(oa.INVALID)),
            this.layout(),
            this.layoutOptions();
        }),
        (e.prototype.blur = function () {
          this.adapter.removeClass(oa.FOCUSED),
            this.layout(),
            this.adapter.deactivateBottomLine(),
            this.adapter.hasClass(oa.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (e.prototype.syncHelperTextValidity = function (t) {
          if (this.helperText) {
            this.helperText.setValidity(t);
            var e = this.helperText.isVisible(),
              n = this.helperText.getId();
            e && n
              ? this.adapter.setSelectAnchorAttr(ra.ARIA_DESCRIBEDBY, n)
              : this.adapter.removeSelectAnchorAttr(ra.ARIA_DESCRIBEDBY);
          }
        }),
        (e.prototype.setClickDebounceTimeout = function () {
          var t = this;
          clearTimeout(this.clickDebounceTimeout),
            (this.clickDebounceTimeout = setTimeout(function () {
              t.recentlyClicked = !1;
            }, sa.CLICK_DEBOUNCE_TIMEOUT_MS)),
            (this.recentlyClicked = !0);
        }),
        e
      );
    })(oe),
    la = { ARIA_HIDDEN: "aria-hidden", ROLE: "role" },
    ca = {
      HELPER_TEXT_VALIDATION_MSG: "mdc-select-helper-text--validation-msg",
      HELPER_TEXT_VALIDATION_MSG_PERSISTENT:
        "mdc-select-helper-text--validation-msg-persistent",
    },
    ua = (function (t) {
      function e(n) {
        return t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return ca;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "strings", {
          get: function () {
            return la;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              hasClass: function () {
                return !1;
              },
              setAttr: function () {},
              getAttr: function () {
                return null;
              },
              removeAttr: function () {},
              setContent: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.getId = function () {
          return this.adapter.getAttr("id");
        }),
        (e.prototype.isVisible = function () {
          return "true" !== this.adapter.getAttr(la.ARIA_HIDDEN);
        }),
        (e.prototype.setContent = function (t) {
          this.adapter.setContent(t);
        }),
        (e.prototype.setValidation = function (t) {
          t
            ? this.adapter.addClass(ca.HELPER_TEXT_VALIDATION_MSG)
            : this.adapter.removeClass(ca.HELPER_TEXT_VALIDATION_MSG);
        }),
        (e.prototype.setValidationMsgPersistent = function (t) {
          t
            ? this.adapter.addClass(ca.HELPER_TEXT_VALIDATION_MSG_PERSISTENT)
            : this.adapter.removeClass(
                ca.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
              );
        }),
        (e.prototype.setValidity = function (t) {
          if (this.adapter.hasClass(ca.HELPER_TEXT_VALIDATION_MSG)) {
            var e = this.adapter.hasClass(
              ca.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
            );
            if (!t || e)
              return (
                this.showToScreenReader(),
                void (t
                  ? this.adapter.removeAttr(la.ROLE)
                  : this.adapter.setAttr(la.ROLE, "alert"))
              );
            this.adapter.removeAttr(la.ROLE), this.hide();
          }
        }),
        (e.prototype.showToScreenReader = function () {
          this.adapter.removeAttr(la.ARIA_HIDDEN);
        }),
        (e.prototype.hide = function () {
          this.adapter.setAttr(la.ARIA_HIDDEN, "true");
        }),
        e
      );
    })(oe);
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ const { document: da } = wt;
  function pa(t) {
    let e, i, o, a, l, u, h, m;
    const g = t[31].default,
      $ = c(g, t, t[30], null);
    let y = [
        {
          class: (o = Oe({
            [t[2]]: !0,
            "mdc-menu-surface": !0,
            "mdc-menu-surface--fixed": t[5],
            "mdc-menu-surface--open": t[4],
            "smui-menu-surface--static": t[4],
            "mdc-menu-surface--fullwidth": t[7],
            ...t[10],
          })),
        },
        { style: (a = Object.entries(t[11]).map(fa).concat([t[3]]).join(" ")) },
        t[13],
      ],
      v = {};
    for (let t = 0; t < y.length; t += 1) v = n(v, y[t]);
    return {
      c() {
        (e = M()), (i = N("div")), $ && $.c(), H(i, v);
      },
      m(n, o) {
        O(n, e, o),
          O(n, i, o),
          $ && $.m(i, null),
          t[33](i),
          (u = !0),
          h ||
            ((m = [
              k(da.body, "click", t[32], !0),
              I((l = Fe.call(null, i, t[1]))),
              I(t[12].call(null, i)),
              k(i, "keydown", t[34]),
            ]),
            (h = !0));
      },
      p(t, e) {
        $ &&
          $.p &&
          (!u || 1073741824 & e[0]) &&
          p($, g, t, t[30], u ? d(g, t[30], e, null) : f(t[30]), null),
          H(
            i,
            (v = Mt(y, [
              (!u ||
                (1204 & e[0] &&
                  o !==
                    (o = Oe({
                      [t[2]]: !0,
                      "mdc-menu-surface": !0,
                      "mdc-menu-surface--fixed": t[5],
                      "mdc-menu-surface--open": t[4],
                      "smui-menu-surface--static": t[4],
                      "mdc-menu-surface--fullwidth": t[7],
                      ...t[10],
                    })))) && { class: o },
              (!u ||
                (2056 & e[0] &&
                  a !==
                    (a = Object.entries(t[11])
                      .map(fa)
                      .concat([t[3]])
                      .join(" ")))) && { style: a },
              8192 & e[0] && t[13],
            ]))
          ),
          l && s(l.update) && 2 & e[0] && l.update.call(null, t[1]);
      },
      i(t) {
        u || (Tt($, t), (u = !0));
      },
      o(t) {
        Ot($, t), (u = !1);
      },
      d(n) {
        n && L(e), n && L(i), $ && $.d(n), t[33](null), (h = !1), r(m);
      },
    };
  }
  const fa = ([t, e]) => `${t}: ${e};`;
  function ha(t, e, i) {
    const o = [
      "use",
      "class",
      "style",
      "static",
      "anchor",
      "fixed",
      "open",
      "managed",
      "fullWidth",
      "quickOpen",
      "anchorElement",
      "anchorCorner",
      "anchorMargin",
      "maxHeight",
      "horizontallyCenteredOnViewport",
      "isOpen",
      "setOpen",
      "setAbsolutePosition",
      "setIsHoisted",
      "isFixed",
      "getElement",
    ];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e;
    var l, c, u;
    const d = De(tt());
    let p,
      f,
      g,
      { use: $ = [] } = e,
      { class: y = "" } = e,
      { style: I = "" } = e,
      { static: v = !1 } = e,
      { anchor: E = !0 } = e,
      { fixed: b = !1 } = e,
      { open: A = v } = e,
      { managed: C = !1 } = e,
      { fullWidth: _ = !1 } = e,
      { quickOpen: x = !1 } = e,
      { anchorElement: S } = e,
      { anchorCorner: T } = e,
      { anchorMargin: O = { top: 0, right: 0, bottom: 0, left: 0 } } = e,
      { maxHeight: L = 0 } = e,
      { horizontallyCenteredOnViewport: w = !1 } = e,
      N = {},
      R = {};
    ot("SMUI:list:role", "menu"), ot("SMUI:list:item:role", "menuitem");
    const D = qs;
    function M(t) {
      return t in N ? N[t] : U().classList.contains(t);
    }
    function F(t) {
      N[t] || i(10, (N[t] = !0), N);
    }
    function k(t) {
      (t in N && !N[t]) || i(10, (N[t] = !1), N);
    }
    function P(t) {
      f.close(t), i(0, (A = !1));
    }
    function U() {
      return p;
    }
    et(() => {
      i(
        9,
        (f = new Zs({
          addClass: F,
          removeClass: k,
          hasClass: M,
          hasAnchor: () => !!S,
          notifyClose: () => {
            C || i(0, (A = v)),
              A || Le(p, "SMUIMenuSurface:closed", void 0, void 0, !0);
          },
          notifyClosing: () => {
            C || i(0, (A = v)),
              A || Le(p, "SMUIMenuSurface:closing", void 0, void 0, !0);
          },
          notifyOpen: () => {
            C || i(0, (A = !0)),
              A && Le(p, "SMUIMenuSurface:opened", void 0, void 0, !0);
          },
          isElementInContainer: (t) => p.contains(t),
          isRtl: () =>
            "rtl" === getComputedStyle(p).getPropertyValue("direction"),
          setTransformOrigin: (t) => {
            i(11, (R["transform-origin"] = t), R);
          },
          isFocused: () => document.activeElement === p,
          saveFocus: () => {
            var t;
            g =
              null !== (t = document.activeElement) && void 0 !== t
                ? t
                : void 0;
          },
          restoreFocus: () => {
            (!p || p.contains(document.activeElement)) &&
              g &&
              document.contains(g) &&
              "focus" in g &&
              g.focus();
          },
          getInnerDimensions: () => ({
            width: p.offsetWidth,
            height: p.offsetHeight,
          }),
          getAnchorDimensions: () => (S ? S.getBoundingClientRect() : null),
          getWindowDimensions: () => ({
            width: window.innerWidth,
            height: window.innerHeight,
          }),
          getBodyDimensions: () => ({
            width: document.body.clientWidth,
            height: document.body.clientHeight,
          }),
          getWindowScroll: () => ({
            x: window.pageXOffset,
            y: window.pageYOffset,
          }),
          setPosition: (t) => {
            i(11, (R.left = "left" in t ? `${t.left}px` : ""), R),
              i(11, (R.right = "right" in t ? `${t.right}px` : ""), R),
              i(11, (R.top = "top" in t ? `${t.top}px` : ""), R),
              i(11, (R.bottom = "bottom" in t ? `${t.bottom}px` : ""), R);
          },
          setMaxHeight: (t) => {
            i(11, (R["max-height"] = t), R);
          },
        }))
      );
      return (
        Le(p, "SMUIMenuSurface:mount", {
          get open() {
            return A;
          },
          set open(t) {
            i(0, (A = t));
          },
          closeProgrammatic: P,
        }),
        f.init(),
        () => {
          var t;
          const e = f.isHoistedElement;
          f.destroy(),
            e &&
              (null === (t = p.parentNode) || void 0 === t || t.removeChild(p));
        }
      );
    }),
      nt(() => {
        var t;
        E &&
          p &&
          (null === (t = p.parentElement) ||
            void 0 === t ||
            t.classList.remove("mdc-menu-surface--anchor"));
      });
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(13, (r = m(e, o))),
          "use" in t && i(1, ($ = t.use)),
          "class" in t && i(2, (y = t.class)),
          "style" in t && i(3, (I = t.style)),
          "static" in t && i(4, (v = t.static)),
          "anchor" in t && i(15, (E = t.anchor)),
          "fixed" in t && i(5, (b = t.fixed)),
          "open" in t && i(0, (A = t.open)),
          "managed" in t && i(6, (C = t.managed)),
          "fullWidth" in t && i(7, (_ = t.fullWidth)),
          "quickOpen" in t && i(16, (x = t.quickOpen)),
          "anchorElement" in t && i(14, (S = t.anchorElement)),
          "anchorCorner" in t && i(17, (T = t.anchorCorner)),
          "anchorMargin" in t && i(18, (O = t.anchorMargin)),
          "maxHeight" in t && i(19, (L = t.maxHeight)),
          "horizontallyCenteredOnViewport" in t &&
            i(20, (w = t.horizontallyCenteredOnViewport)),
          "$$scope" in t && i(30, (a = t.$$scope));
      }),
      (t.$$.update = () => {
        939557120 & t.$$.dirty[0] &&
          p &&
          E &&
          !(null === i(27, (l = p.parentElement)) || void 0 === l
            ? void 0
            : l.classList.contains("mdc-menu-surface--anchor")) &&
          (null === i(28, (c = p.parentElement)) ||
            void 0 === c ||
            c.classList.add("mdc-menu-surface--anchor"),
          i(
            14,
            (S =
              null !== i(29, (u = p.parentElement)) && void 0 !== u
                ? u
                : void 0)
          )),
          513 & t.$$.dirty[0] &&
            f &&
            f.isOpen() !== A &&
            (A ? f.open() : f.close()),
          66048 & t.$$.dirty[0] && f && f.setQuickOpen(x),
          544 & t.$$.dirty[0] && f && f.setFixedPosition(b),
          524800 & t.$$.dirty[0] && f && f.setMaxHeight(L),
          1049088 & t.$$.dirty[0] &&
            f &&
            f.setIsHorizontallyCenteredOnViewport(w),
          131584 & t.$$.dirty[0] &&
            f &&
            null != T &&
            ("string" == typeof T
              ? f.setAnchorCorner(D[T])
              : f.setAnchorCorner(T)),
          262656 & t.$$.dirty[0] && f && f.setAnchorMargin(O);
      }),
      [
        A,
        $,
        y,
        I,
        v,
        b,
        C,
        _,
        p,
        f,
        N,
        R,
        d,
        r,
        S,
        E,
        x,
        T,
        O,
        L,
        w,
        function () {
          return A;
        },
        function (t) {
          i(0, (A = t));
        },
        function (t, e) {
          return f.setAbsolutePosition(t, e);
        },
        function (t) {
          return f.setIsHoisted(t);
        },
        function () {
          return f.isFixed();
        },
        U,
        l,
        c,
        u,
        a,
        s,
        (t) => f && A && !C && f.handleBodyClick(t),
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (p = t), i(8, p);
          });
        },
        (t) => f && f.handleKeydown(t),
      ]
    );
  }
  class ma extends Vt {
    constructor(t) {
      super(),
        Bt(
          this,
          t,
          ha,
          pa,
          a,
          {
            use: 1,
            class: 2,
            style: 3,
            static: 4,
            anchor: 15,
            fixed: 5,
            open: 0,
            managed: 6,
            fullWidth: 7,
            quickOpen: 16,
            anchorElement: 14,
            anchorCorner: 17,
            anchorMargin: 18,
            maxHeight: 19,
            horizontallyCenteredOnViewport: 20,
            isOpen: 21,
            setOpen: 22,
            setAbsolutePosition: 23,
            setIsHoisted: 24,
            isFixed: 25,
            getElement: 26,
          },
          null,
          [-1, -1]
        );
    }
    get isOpen() {
      return this.$$.ctx[21];
    }
    get setOpen() {
      return this.$$.ctx[22];
    }
    get setAbsolutePosition() {
      return this.$$.ctx[23];
    }
    get setIsHoisted() {
      return this.$$.ctx[24];
    }
    get isFixed() {
      return this.$$.ctx[25];
    }
    get getElement() {
      return this.$$.ctx[26];
    }
  }
  function ga(
    t,
    {
      addClass: e = (e) => t.classList.add(e),
      removeClass: n = (e) => t.classList.remove(e),
    } = {}
  ) {
    return (
      e("mdc-menu-surface--anchor"),
      {
        destroy() {
          n("mdc-menu-surface--anchor");
        },
      }
    );
  }
  function $a(t) {
    let e;
    const n = t[17].default,
      i = c(n, t, t[22], null);
    return {
      c() {
        i && i.c();
      },
      m(t, n) {
        i && i.m(t, n), (e = !0);
      },
      p(t, o) {
        i &&
          i.p &&
          (!e || 4194304 & o) &&
          p(i, n, t, t[22], e ? d(n, t[22], o, null) : f(t[22]), null);
      },
      i(t) {
        e || (Tt(i, t), (e = !0));
      },
      o(t) {
        Ot(i, t), (e = !1);
      },
      d(t) {
        i && i.d(t);
      },
    };
  }
  function ya(t) {
    let e, i, o;
    const r = [
      { use: t[5] },
      { class: Oe({ [t[1]]: !0, "mdc-menu": !0 }) },
      t[9],
    ];
    function s(e) {
      t[19](e);
    }
    let a = { $$slots: { default: [$a] }, $$scope: { ctx: t } };
    for (let t = 0; t < r.length; t += 1) a = n(a, r[t]);
    return (
      void 0 !== t[0] && (a.open = t[0]),
      (e = new ma({ props: a })),
      t[18](e),
      lt.push(() => kt(e, "open", s)),
      e.$on("SMUIMenuSurface:mount", t[7]),
      e.$on("SMUIList:mount", t[8]),
      e.$on("SMUIMenuSurface:opened", t[20]),
      e.$on("keydown", t[6]),
      e.$on("SMUIList:action", t[21]),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (o = !0);
        },
        p(t, [n]) {
          const o =
            546 & n
              ? Mt(r, [
                  32 & n && { use: t[5] },
                  2 & n && { class: Oe({ [t[1]]: !0, "mdc-menu": !0 }) },
                  512 & n && Ft(t[9]),
                ])
              : {};
          4194304 & n && (o.$$scope = { dirty: n, ctx: t }),
            !i && 1 & n && ((i = !0), (o.open = t[0]), gt(() => (i = !1))),
            e.$set(o);
        },
        i(t) {
          o || (Tt(e.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (o = !1);
        },
        d(n) {
          t[18](null), Ht(e, n);
        },
      }
    );
  }
  function Ia(t, e, i) {
    let o;
    const r = [
      "use",
      "class",
      "open",
      "isOpen",
      "setOpen",
      "setDefaultFocusState",
      "getSelectedIndex",
      "getMenuSurface",
      "getElement",
    ];
    let s = m(e, r),
      { $$slots: a = {}, $$scope: l } = e;
    const { closest: c } = ue,
      u = De(tt());
    let d,
      p,
      f,
      g,
      { use: $ = [] } = e,
      { class: y = "" } = e,
      { open: I = !1 } = e;
    function v() {
      return d.getElement();
    }
    et(
      () => (
        i(
          3,
          (p = new ia({
            addClassToElementAtIndex: (t, e) => {
              g.addClassForElementIndex(t, e);
            },
            removeClassFromElementAtIndex: (t, e) => {
              g.removeClassForElementIndex(t, e);
            },
            addAttributeToElementAtIndex: (t, e, n) => {
              g.setAttributeForElementIndex(t, e, n);
            },
            removeAttributeFromElementAtIndex: (t, e) => {
              g.removeAttributeForElementIndex(t, e);
            },
            getAttributeFromElementAtIndex: (t, e) =>
              g.getAttributeFromElementIndex(t, e),
            elementContainsClass: (t, e) => t.classList.contains(e),
            closeSurface: (t) => f.closeProgrammatic(t),
            getElementIndex: (t) =>
              g
                .getOrderedList()
                .map((t) => t.element)
                .indexOf(t),
            notifySelected: (t) =>
              Le(
                v(),
                "SMUIMenu:selected",
                { index: t.index, item: g.getOrderedList()[t.index].element },
                void 0,
                !0
              ),
            getMenuItemCount: () => g.items.length,
            focusItemAtIndex: (t) => g.focusItemAtIndex(t),
            focusListRoot: () => "focus" in g.element && g.element.focus(),
            isSelectableItemAtIndex: (t) =>
              !!c(g.getOrderedList()[t].element, `.${ta.MENU_SELECTION_GROUP}`),
            getSelectedSiblingOfItemAtIndex: (t) => {
              const e = g.getOrderedList(),
                n = c(e[t].element, `.${ta.MENU_SELECTION_GROUP}`),
                i =
                  null == n
                    ? void 0
                    : n.querySelector(`.${ta.MENU_SELECTED_LIST_ITEM}`);
              return i ? e.map((t) => t.element).indexOf(i) : -1;
            },
          }))
        ),
        Le(v(), "SMUIMenu:mount", p),
        p.init(),
        () => {
          p.destroy();
        }
      )
    );
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(9, (s = m(e, r))),
          "use" in t && i(10, ($ = t.use)),
          "class" in t && i(1, (y = t.class)),
          "open" in t && i(0, (I = t.open)),
          "$$scope" in t && i(22, (l = t.$$scope));
      }),
      (t.$$.update = () => {
        1024 & t.$$.dirty && i(5, (o = [u, ...$]));
      }),
      [
        I,
        y,
        d,
        p,
        g,
        o,
        function (t) {
          p && p.handleKeydown(t);
        },
        function (t) {
          f || (f = t.detail);
        },
        function (t) {
          g || i(4, (g = t.detail));
        },
        s,
        $,
        function () {
          return I;
        },
        function (t) {
          i(0, (I = t));
        },
        function (t) {
          p.setDefaultFocusState(t);
        },
        function () {
          return p.getSelectedIndex();
        },
        function () {
          return d;
        },
        v,
        a,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (d = t), i(2, d);
          });
        },
        function (t) {
          (I = t), i(0, I);
        },
        () => p && p.handleMenuSurfaceOpened(),
        (t) =>
          p && p.handleItemAction(g.getOrderedList()[t.detail.index].element),
        l,
      ]
    );
  }
  class va extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, Ia, ya, a, {
          use: 10,
          class: 1,
          open: 0,
          isOpen: 11,
          setOpen: 12,
          setDefaultFocusState: 13,
          getSelectedIndex: 14,
          getMenuSurface: 15,
          getElement: 16,
        });
    }
    get isOpen() {
      return this.$$.ctx[11];
    }
    get setOpen() {
      return this.$$.ctx[12];
    }
    get setDefaultFocusState() {
      return this.$$.ctx[13];
    }
    get getSelectedIndex() {
      return this.$$.ctx[14];
    }
    get getMenuSurface() {
      return this.$$.ctx[15];
    }
    get getElement() {
      return this.$$.ctx[16];
    }
  }
  function Ea(e) {
    let n;
    return {
      c() {
        n = D(e[8]);
      },
      m(t, e) {
        O(t, n, e);
      },
      p(t, e) {
        256 & e && B(n, t[8]);
      },
      i: t,
      o: t,
      d(t) {
        t && L(n);
      },
    };
  }
  function ba(t) {
    let e;
    const n = t[13].default,
      i = c(n, t, t[12], null);
    return {
      c() {
        i && i.c();
      },
      m(t, n) {
        i && i.m(t, n), (e = !0);
      },
      p(t, o) {
        i &&
          i.p &&
          (!e || 4096 & o) &&
          p(i, n, t, t[12], e ? d(n, t[12], o, null) : f(t[12]), null);
      },
      i(t) {
        e || (Tt(i, t), (e = !0));
      },
      o(t) {
        Ot(i, t), (e = !1);
      },
      d(t) {
        i && i.d(t);
      },
    };
  }
  function Aa(t) {
    let e, i, o, a, l, c, u, d, p;
    const f = [ba, Ea],
      h = [];
    function m(t, e) {
      return null == t[8] ? 0 : 1;
    }
    (i = m(t)), (o = h[i] = f[i](t));
    let g = [
        {
          class: (a = Oe({
            [t[1]]: !0,
            "mdc-select-helper-text": !0,
            "mdc-select-helper-text--validation-msg": t[4],
            "mdc-select-helper-text--validation-msg-persistent": t[3],
            ...t[6],
          })),
        },
        { "aria-hidden": (l = t[3] ? void 0 : "true") },
        { id: t[2] },
        t[7],
        t[10],
      ],
      $ = {};
    for (let t = 0; t < g.length; t += 1) $ = n($, g[t]);
    return {
      c() {
        (e = N("div")), o.c(), H(e, $);
      },
      m(n, o) {
        O(n, e, o),
          h[i].m(e, null),
          t[14](e),
          (u = !0),
          d ||
            ((p = [I((c = Fe.call(null, e, t[0]))), I(t[9].call(null, e))]),
            (d = !0));
      },
      p(t, [n]) {
        let r = i;
        (i = m(t)),
          i === r
            ? h[i].p(t, n)
            : (xt(),
              Ot(h[r], 1, 1, () => {
                h[r] = null;
              }),
              St(),
              (o = h[i]),
              o ? o.p(t, n) : ((o = h[i] = f[i](t)), o.c()),
              Tt(o, 1),
              o.m(e, null)),
          H(
            e,
            ($ = Mt(g, [
              (!u ||
                (90 & n &&
                  a !==
                    (a = Oe({
                      [t[1]]: !0,
                      "mdc-select-helper-text": !0,
                      "mdc-select-helper-text--validation-msg": t[4],
                      "mdc-select-helper-text--validation-msg-persistent": t[3],
                      ...t[6],
                    })))) && { class: a },
              (!u || (8 & n && l !== (l = t[3] ? void 0 : "true"))) && {
                "aria-hidden": l,
              },
              (!u || 4 & n) && { id: t[2] },
              128 & n && t[7],
              1024 & n && t[10],
            ]))
          ),
          c && s(c.update) && 1 & n && c.update.call(null, t[0]);
      },
      i(t) {
        u || (Tt(o), (u = !0));
      },
      o(t) {
        Ot(o), (u = !1);
      },
      d(n) {
        n && L(e), h[i].d(), t[14](null), (d = !1), r(p);
      },
    };
  }
  Qe({ class: "mdc-menu__selection-group-icon", component: Es });
  let Ca = 0;
  function _a(t, e, i) {
    const o = [
      "use",
      "class",
      "id",
      "persistent",
      "validationMsg",
      "getElement",
    ];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e;
    const l = De(tt());
    let c,
      u,
      d,
      { use: p = [] } = e,
      { class: f = "" } = e,
      { id: g = "SMUI-select-helper-text-" + Ca++ } = e,
      { persistent: $ = !1 } = e,
      { validationMsg: y = !1 } = e,
      I = {},
      v = {};
    function E(t) {
      return t in I ? I[t] : S().classList.contains(t);
    }
    function b(t) {
      I[t] || i(6, (I[t] = !0), I);
    }
    function A(t) {
      (t in I && !I[t]) || i(6, (I[t] = !1), I);
    }
    function C(t) {
      var e;
      return t in v
        ? null !== (e = v[t]) && void 0 !== e
          ? e
          : null
        : S().getAttribute(t);
    }
    function _(t, e) {
      v[t] !== e && i(7, (v[t] = e), v);
    }
    function x(t) {
      (t in v && null == v[t]) || i(7, (v[t] = void 0), v);
    }
    function S() {
      return c;
    }
    return (
      et(
        () => (
          (u = new ua({
            addClass: b,
            removeClass: A,
            hasClass: E,
            getAttr: C,
            setAttr: _,
            removeAttr: x,
            setContent: (t) => {
              i(8, (d = t));
            },
          })),
          g.startsWith("SMUI-select-helper-text-") &&
            Le(S(), "SMUISelectHelperText:id", g),
          Le(S(), "SMUISelectHelperText:mount", u),
          u.init(),
          () => {
            Le(S(), "SMUISelectHelperText:unmount", u), u.destroy();
          }
        )
      ),
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(10, (r = m(e, o))),
          "use" in t && i(0, (p = t.use)),
          "class" in t && i(1, (f = t.class)),
          "id" in t && i(2, (g = t.id)),
          "persistent" in t && i(3, ($ = t.persistent)),
          "validationMsg" in t && i(4, (y = t.validationMsg)),
          "$$scope" in t && i(12, (a = t.$$scope));
      }),
      [
        p,
        f,
        g,
        $,
        y,
        c,
        I,
        v,
        d,
        l,
        r,
        S,
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (c = t), i(5, c);
          });
        },
      ]
    );
  }
  class xa extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, _a, Aa, a, {
          use: 0,
          class: 1,
          id: 2,
          persistent: 3,
          validationMsg: 4,
          getElement: 11,
        });
    }
    get getElement() {
      return this.$$.ctx[11];
    }
  }
  const Sa = (t) => ({}),
    Ta = (t) => ({}),
    Oa = (t) => ({}),
    La = (t) => ({}),
    wa = (t) => ({}),
    Na = (t) => ({}),
    Ra = (t) => ({}),
    Da = (t) => ({});
  function Ma(t) {
    let e,
      i = [
        { type: "hidden" },
        { required: t[10] },
        { disabled: t[6] },
        { value: t[0] },
        Me(t[53], "input$"),
      ],
      o = {};
    for (let t = 0; t < i.length; t += 1) o = n(o, i[t]);
    return {
      c() {
        (e = N("input")), H(e, o);
      },
      m(t, n) {
        O(t, e, n), e.autofocus && e.focus();
      },
      p(t, n) {
        H(
          e,
          (o = Mt(i, [
            { type: "hidden" },
            1024 & n[0] && { required: t[10] },
            64 & n[0] && { disabled: t[6] },
            1 & n[0] && { value: t[0] },
            4194304 & n[1] && Me(t[53], "input$"),
          ]))
        );
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function Fa(t) {
    let e;
    return {
      c() {
        (e = N("span")), U(e, "class", "mdc-select__ripple");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function ka(t) {
    let e, i;
    const o = [
      { id: t[11] + "-smui-label" },
      { floatAbove: "" !== t[43] },
      { required: t[10] },
      Me(t[53], "label$"),
    ];
    let r = { $$slots: { default: [Pa] }, $$scope: { ctx: t } };
    for (let t = 0; t < o.length; t += 1) r = n(r, o[t]);
    return (
      (e = new Zi({ props: r })),
      t[66](e),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, n) {
          const i =
            (3072 & n[0]) | (4198400 & n[1])
              ? Mt(o, [
                  2048 & n[0] && { id: t[11] + "-smui-label" },
                  4096 & n[1] && { floatAbove: "" !== t[43] },
                  1024 & n[0] && { required: t[10] },
                  4194304 & n[1] && Ft(Me(t[53], "label$")),
                ])
              : {};
          (512 & n[0]) | (134217728 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(n) {
          t[66](null), Ht(e, n);
        },
      }
    );
  }
  function Pa(t) {
    let e,
      n,
      i = (null == t[9] ? "" : t[9]) + "";
    const o = t[63].label,
      r = c(o, t, t[89], Da);
    return {
      c() {
        (e = D(i)), r && r.c();
      },
      m(t, i) {
        O(t, e, i), r && r.m(t, i), (n = !0);
      },
      p(t, s) {
        (!n || 512 & s[0]) &&
          i !== (i = (null == t[9] ? "" : t[9]) + "") &&
          B(e, i),
          r &&
            r.p &&
            (!n || 134217728 & s[2]) &&
            p(r, o, t, t[89], n ? d(o, t[89], s, Ra) : f(t[89]), Da);
      },
      i(t) {
        n || (Tt(r, t), (n = !0));
      },
      o(t) {
        Ot(r, t), (n = !1);
      },
      d(t) {
        t && L(e), r && r.d(t);
      },
    };
  }
  function Ua(t) {
    let e, i;
    const o = [
      { noLabel: t[8] || (null == t[9] && !t[52].label) },
      Me(t[53], "outline$"),
    ];
    let r = { $$slots: { default: [Va] }, $$scope: { ctx: t } };
    for (let t = 0; t < o.length; t += 1) r = n(r, o[t]);
    return (
      (e = new lo({ props: r })),
      t[68](e),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, n) {
          const i =
            (768 & n[0]) | (6291456 & n[1])
              ? Mt(o, [
                  (768 & n[0]) | (2097152 & n[1]) && {
                    noLabel: t[8] || (null == t[9] && !t[52].label),
                  },
                  4194304 & n[1] && Ft(Me(t[53], "outline$")),
                ])
              : {};
          (3840 & n[0]) | (6296064 & n[1]) | (134217728 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(n) {
          t[68](null), Ht(e, n);
        },
      }
    );
  }
  function Ha(t) {
    let e, i;
    const o = [
      { id: t[11] + "-smui-label" },
      { floatAbove: "" !== t[43] },
      { required: t[10] },
      Me(t[53], "label$"),
    ];
    let r = { $$slots: { default: [Ba] }, $$scope: { ctx: t } };
    for (let t = 0; t < o.length; t += 1) r = n(r, o[t]);
    return (
      (e = new Zi({ props: r })),
      t[67](e),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, n) {
          const i =
            (3072 & n[0]) | (4198400 & n[1])
              ? Mt(o, [
                  2048 & n[0] && { id: t[11] + "-smui-label" },
                  4096 & n[1] && { floatAbove: "" !== t[43] },
                  1024 & n[0] && { required: t[10] },
                  4194304 & n[1] && Ft(Me(t[53], "label$")),
                ])
              : {};
          (512 & n[0]) | (134217728 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(n) {
          t[67](null), Ht(e, n);
        },
      }
    );
  }
  function Ba(t) {
    let e,
      n,
      i = (null == t[9] ? "" : t[9]) + "";
    const o = t[63].label,
      r = c(o, t, t[89], Na);
    return {
      c() {
        (e = D(i)), r && r.c();
      },
      m(t, i) {
        O(t, e, i), r && r.m(t, i), (n = !0);
      },
      p(t, s) {
        (!n || 512 & s[0]) &&
          i !== (i = (null == t[9] ? "" : t[9]) + "") &&
          B(e, i),
          r &&
            r.p &&
            (!n || 134217728 & s[2]) &&
            p(r, o, t, t[89], n ? d(o, t[89], s, wa) : f(t[89]), Na);
      },
      i(t) {
        n || (Tt(r, t), (n = !0));
      },
      o(t) {
        Ot(r, t), (n = !1);
      },
      d(t) {
        t && L(e), r && r.d(t);
      },
    };
  }
  function Va(t) {
    let e,
      n,
      i = !t[8] && (null != t[9] || t[52].label) && Ha(t);
    return {
      c() {
        i && i.c(), (e = F());
      },
      m(t, o) {
        i && i.m(t, o), O(t, e, o), (n = !0);
      },
      p(t, n) {
        t[8] || (null == t[9] && !t[52].label)
          ? i &&
            (xt(),
            Ot(i, 1, 1, () => {
              i = null;
            }),
            St())
          : i
          ? (i.p(t, n), (768 & n[0]) | (2097152 & n[1]) && Tt(i, 1))
          : ((i = Ha(t)), i.c(), Tt(i, 1), i.m(e.parentNode, e));
      },
      i(t) {
        n || (Tt(i), (n = !0));
      },
      o(t) {
        Ot(i), (n = !1);
      },
      d(t) {
        i && i.d(t), t && L(e);
      },
    };
  }
  function ja(t) {
    let e, i;
    const o = [Me(t[53], "ripple$")];
    let r = {};
    for (let t = 0; t < o.length; t += 1) r = n(r, o[t]);
    return (
      (e = new io({ props: r })),
      t[70](e),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, n) {
          const i = 4194304 & n[1] ? Mt(o, [Ft(Me(t[53], "ripple$"))]) : {};
          e.$set(i);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(n) {
          t[70](null), Ht(e, n);
        },
      }
    );
  }
  function Ka(t) {
    let e;
    const n = t[63].default,
      i = c(n, t, t[89], null);
    return {
      c() {
        i && i.c();
      },
      m(t, n) {
        i && i.m(t, n), (e = !0);
      },
      p(t, o) {
        i &&
          i.p &&
          (!e || 134217728 & o[2]) &&
          p(i, n, t, t[89], e ? d(n, t[89], o, null) : f(t[89]), null);
      },
      i(t) {
        e || (Tt(i, t), (e = !0));
      },
      o(t) {
        Ot(i, t), (e = !1);
      },
      d(t) {
        i && i.d(t);
      },
    };
  }
  function Ga(t) {
    let e, i, o;
    const r = [{ role: "listbox" }, { wrapFocus: t[36] }, Me(t[53], "list$")];
    function s(e) {
      t[76](e);
    }
    let a = { $$slots: { default: [Ka] }, $$scope: { ctx: t } };
    for (let t = 0; t < r.length; t += 1) a = n(a, r[t]);
    return (
      void 0 !== t[24] && (a.selectedIndex = t[24]),
      (e = new as({ props: a })),
      lt.push(() => kt(e, "selectedIndex", s)),
      e.$on("SMUIList:mount", t[77]),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (o = !0);
        },
        p(t, n) {
          const o =
            4194336 & n[1]
              ? Mt(r, [
                  r[0],
                  32 & n[1] && { wrapFocus: t[36] },
                  4194304 & n[1] && Ft(Me(t[53], "list$")),
                ])
              : {};
          134217728 & n[2] && (o.$$scope = { dirty: n, ctx: t }),
            !i &&
              16777216 & n[0] &&
              ((i = !0), (o.selectedIndex = t[24]), gt(() => (i = !1))),
            e.$set(o);
        },
        i(t) {
          o || (Tt(e.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (o = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function Wa(t) {
    let e, i;
    const o = [Me(t[53], "helperText$")];
    let r = { $$slots: { default: [za] }, $$scope: { ctx: t } };
    for (let t = 0; t < o.length; t += 1) r = n(r, o[t]);
    return (
      (e = new xa({ props: r })),
      e.$on("SMUISelectHelperText:id", t[86]),
      e.$on("SMUISelectHelperText:mount", t[87]),
      e.$on("SMUISelectHelperText:unmount", t[88]),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, n) {
          const i = 4194304 & n[1] ? Mt(o, [Ft(Me(t[53], "helperText$"))]) : {};
          134217728 & n[2] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function za(t) {
    let e;
    const n = t[63].helperText,
      i = c(n, t, t[89], Ta);
    return {
      c() {
        i && i.c();
      },
      m(t, n) {
        i && i.m(t, n), (e = !0);
      },
      p(t, o) {
        i &&
          i.p &&
          (!e || 134217728 & o[2]) &&
          p(i, n, t, t[89], e ? d(n, t[89], o, Sa) : f(t[89]), Ta);
      },
      i(t) {
        e || (Tt(i, t), (e = !0));
      },
      o(t) {
        Ot(i, t), (e = !1);
      },
      d(t) {
        i && i.d(t);
      },
    };
  }
  function qa(t) {
    let e,
      i,
      o,
      a,
      l,
      u,
      h,
      m,
      g,
      $,
      y,
      v,
      E,
      b,
      A,
      C,
      _,
      S,
      T,
      w,
      P,
      V,
      j,
      K,
      G,
      W,
      z,
      q,
      Y,
      X,
      Q,
      J,
      Z,
      tt,
      et,
      nt,
      it,
      ot,
      rt,
      st,
      at = t[12] && Ma(t),
      ct = "filled" === t[7] && Fa(),
      ut =
        "outlined" !== t[7] && !t[8] && (null != t[9] || t[52].label) && ka(t),
      dt = "outlined" === t[7] && Ua(t);
    const pt = t[63].leadingIcon,
      ft = c(pt, t, t[89], La);
    let ht = [
        { id: (y = t[11] + "-smui-selected-text") },
        { class: (v = Oe({ [t[19]]: !0, "mdc-select__selected-text": !0 })) },
        { role: "button" },
        { "aria-haspopup": "listbox" },
        { "aria-labelledby": (E = t[11] + "-smui-label") },
        Me(t[53], "selectedText$"),
      ],
      mt = {};
    for (let t = 0; t < ht.length; t += 1) mt = n(mt, ht[t]);
    let $t = [
        {
          class: (A = Oe({
            [t[17]]: !0,
            "mdc-select__selected-text-container": !0,
          })),
        },
        Me(t[53], "selectedTextContainer$"),
      ],
      yt = {};
    for (let t = 0; t < $t.length; t += 1) yt = n(yt, $t[t]);
    let It = [
        { class: (V = Oe({ [t[21]]: !0, "mdc-select__dropdown-icon": !0 })) },
        Me(t[53], "dropdownIcon$"),
      ],
      vt = {};
    for (let t = 0; t < It.length; t += 1) vt = n(vt, It[t]);
    let Et = "outlined" !== t[7] && t[5] && ja(t),
      bt = [
        { class: (G = Oe({ [t[15]]: !0, "mdc-select__anchor": !0 })) },
        { "aria-required": (W = t[10] ? "true" : void 0) },
        { "aria-disabled": (z = t[6] ? "true" : void 0) },
        { "aria-controls": t[31] },
        { "aria-describedby": t[31] },
        t[29],
        Me(t[53], "anchor$"),
      ],
      At = {};
    for (let t = 0; t < bt.length; t += 1) At = n(At, bt[t]);
    const Ct = [
      { class: Oe({ [t[22]]: !0, "mdc-select__menu": !0, ...t[33] }) },
      { fullWidth: !0 },
      { anchor: !1 },
      { anchorElement: t[34] },
      { anchorCorner: t[35] },
      Me(t[53], "menu$"),
    ];
    function _t(e) {
      t[78](e);
    }
    let Lt = { $$slots: { default: [Ga] }, $$scope: { ctx: t } };
    for (let t = 0; t < Ct.length; t += 1) Lt = n(Lt, Ct[t]);
    void 0 !== t[32] && (Lt.open = t[32]),
      (X = new va({ props: Lt })),
      lt.push(() => kt(X, "open", _t)),
      X.$on("SMUIMenu:selected", t[79]),
      X.$on("SMUIMenuSurface:closing", t[80]),
      X.$on("SMUIMenuSurface:closed", t[81]),
      X.$on("SMUIMenuSurface:opened", t[82]);
    let wt = [
        {
          class: (J = Oe({
            [t[3]]: !0,
            "mdc-select": !0,
            "mdc-select--required": t[10],
            "mdc-select--disabled": t[6],
            "mdc-select--filled": "filled" === t[7],
            "mdc-select--outlined": "outlined" === t[7],
            "smui-select--standard": "standard" === t[7],
            "mdc-select--with-leading-icon": t[45](t[13])
              ? t[52].leadingIcon
              : t[13],
            "mdc-select--no-label": t[8] || (null == t[9] && !t[52].label),
            "mdc-select--invalid": t[1],
            "mdc-select--activated": t[32],
            "mdc-data-table__pagination-rows-per-page-select":
              "data-table:pagination" === t[46],
            ...t[26],
          })),
        },
        { style: (Z = Object.entries(t[27]).map(Xa).concat([t[4]]).join(" ")) },
        we(t[53], [
          "input$",
          "anchor$",
          "label$",
          "outline$",
          "selectedTextContainer$",
          "selectedText$",
          "dropdownIcon$",
          "ripple$",
          "menu$",
          "list$",
          "helperText$",
        ]),
      ],
      Nt = {};
    for (let t = 0; t < wt.length; t += 1) Nt = n(Nt, wt[t]);
    let Rt = t[52].helperText && Wa(t);
    return {
      c() {
        (e = N("div")),
          at && at.c(),
          (i = M()),
          (o = N("div")),
          ct && ct.c(),
          (a = M()),
          ut && ut.c(),
          (l = M()),
          dt && dt.c(),
          (u = M()),
          ft && ft.c(),
          (h = M()),
          (m = N("span")),
          (g = N("span")),
          ($ = D(t[43])),
          (_ = M()),
          (S = N("span")),
          (T = R("svg")),
          (w = R("polygon")),
          (P = R("polygon")),
          (K = M()),
          Et && Et.c(),
          (Y = M()),
          Pt(X.$$.fragment),
          (nt = M()),
          Rt && Rt.c(),
          (it = F()),
          H(g, mt),
          H(m, yt),
          U(w, "class", "mdc-select__dropdown-icon-inactive"),
          U(w, "stroke", "none"),
          U(w, "fill-rule", "evenodd"),
          U(w, "points", "7 10 12 15 17 10"),
          U(P, "class", "mdc-select__dropdown-icon-active"),
          U(P, "stroke", "none"),
          U(P, "fill-rule", "evenodd"),
          U(P, "points", "7 15 12 10 17 15"),
          U(T, "class", "mdc-select__dropdown-icon-graphic"),
          U(T, "viewBox", "7 10 10 5"),
          U(T, "focusable", "false"),
          H(S, vt),
          H(o, At),
          H(e, Nt);
      },
      m(n, r) {
        O(n, e, r),
          at && at.m(e, null),
          x(e, i),
          x(e, o),
          ct && ct.m(o, null),
          x(o, a),
          ut && ut.m(o, null),
          x(o, l),
          dt && dt.m(o, null),
          x(o, u),
          ft && ft.m(o, null),
          x(o, h),
          x(o, m),
          x(m, g),
          x(g, $),
          t[69](g),
          x(o, _),
          x(o, S),
          x(S, T),
          x(T, w),
          x(T, P),
          x(o, K),
          Et && Et.m(o, null),
          t[71](o),
          x(e, Y),
          Ut(X, e, null),
          t[83](e),
          O(n, nt, r),
          Rt && Rt.m(n, r),
          O(n, it, r),
          (ot = !0),
          rt ||
            ((st = [
              I((b = Fe.call(null, g, t[18]))),
              I((C = Fe.call(null, m, t[16]))),
              I((j = Fe.call(null, S, t[20]))),
              I((q = Fe.call(null, o, t[14]))),
              k(o, "focus", t[72]),
              k(o, "blur", t[73]),
              k(o, "click", t[74]),
              k(o, "keydown", t[75]),
              k(o, "focus", t[64]),
              k(o, "blur", t[65]),
              I(
                (tt = Wi.call(null, e, {
                  ripple: "filled" === t[7],
                  unbounded: !1,
                  addClass: t[49],
                  removeClass: t[50],
                  addStyle: t[51],
                }))
              ),
              I(ga.call(null, e, { addClass: t[49], removeClass: t[50] })),
              I((et = Fe.call(null, e, t[2]))),
              I(t[44].call(null, e)),
              k(e, "SMUISelectLeadingIcon:mount", t[84]),
              k(e, "SMUISelectLeadingIcon:unmount", t[85]),
            ]),
            (rt = !0));
      },
      p(t, n) {
        t[12]
          ? at
            ? at.p(t, n)
            : ((at = Ma(t)), at.c(), at.m(e, i))
          : at && (at.d(1), (at = null)),
          "filled" === t[7]
            ? ct || ((ct = Fa()), ct.c(), ct.m(o, a))
            : ct && (ct.d(1), (ct = null)),
          "outlined" === t[7] || t[8] || (null == t[9] && !t[52].label)
            ? ut &&
              (xt(),
              Ot(ut, 1, 1, () => {
                ut = null;
              }),
              St())
            : ut
            ? (ut.p(t, n), (896 & n[0]) | (2097152 & n[1]) && Tt(ut, 1))
            : ((ut = ka(t)), ut.c(), Tt(ut, 1), ut.m(o, l)),
          "outlined" === t[7]
            ? dt
              ? (dt.p(t, n), 128 & n[0] && Tt(dt, 1))
              : ((dt = Ua(t)), dt.c(), Tt(dt, 1), dt.m(o, u))
            : dt &&
              (xt(),
              Ot(dt, 1, 1, () => {
                dt = null;
              }),
              St()),
          ft &&
            ft.p &&
            (!ot || 134217728 & n[2]) &&
            p(ft, pt, t, t[89], ot ? d(pt, t[89], n, Oa) : f(t[89]), La),
          (!ot || 4096 & n[1]) && B($, t[43]),
          H(
            g,
            (mt = Mt(ht, [
              (!ot ||
                (2048 & n[0] && y !== (y = t[11] + "-smui-selected-text"))) && {
                id: y,
              },
              (!ot ||
                (524288 & n[0] &&
                  v !==
                    (v = Oe({
                      [t[19]]: !0,
                      "mdc-select__selected-text": !0,
                    })))) && { class: v },
              { role: "button" },
              { "aria-haspopup": "listbox" },
              (!ot || (2048 & n[0] && E !== (E = t[11] + "-smui-label"))) && {
                "aria-labelledby": E,
              },
              4194304 & n[1] && Me(t[53], "selectedText$"),
            ]))
          ),
          b && s(b.update) && 262144 & n[0] && b.update.call(null, t[18]),
          H(
            m,
            (yt = Mt($t, [
              (!ot ||
                (131072 & n[0] &&
                  A !==
                    (A = Oe({
                      [t[17]]: !0,
                      "mdc-select__selected-text-container": !0,
                    })))) && { class: A },
              4194304 & n[1] && Me(t[53], "selectedTextContainer$"),
            ]))
          ),
          C && s(C.update) && 65536 & n[0] && C.update.call(null, t[16]),
          H(
            S,
            (vt = Mt(It, [
              (!ot ||
                (2097152 & n[0] &&
                  V !==
                    (V = Oe({
                      [t[21]]: !0,
                      "mdc-select__dropdown-icon": !0,
                    })))) && { class: V },
              4194304 & n[1] && Me(t[53], "dropdownIcon$"),
            ]))
          ),
          j && s(j.update) && 1048576 & n[0] && j.update.call(null, t[20]),
          "outlined" !== t[7] && t[5]
            ? Et
              ? (Et.p(t, n), 160 & n[0] && Tt(Et, 1))
              : ((Et = ja(t)), Et.c(), Tt(Et, 1), Et.m(o, null))
            : Et &&
              (xt(),
              Ot(Et, 1, 1, () => {
                Et = null;
              }),
              St()),
          H(
            o,
            (At = Mt(bt, [
              (!ot ||
                (32768 & n[0] &&
                  G !==
                    (G = Oe({ [t[15]]: !0, "mdc-select__anchor": !0 })))) && {
                class: G,
              },
              (!ot || (1024 & n[0] && W !== (W = t[10] ? "true" : void 0))) && {
                "aria-required": W,
              },
              (!ot || (64 & n[0] && z !== (z = t[6] ? "true" : void 0))) && {
                "aria-disabled": z,
              },
              (!ot || 1 & n[1]) && { "aria-controls": t[31] },
              (!ot || 1 & n[1]) && { "aria-describedby": t[31] },
              536870912 & n[0] && t[29],
              4194304 & n[1] && Me(t[53], "anchor$"),
            ]))
          ),
          q && s(q.update) && 16384 & n[0] && q.update.call(null, t[14]);
        const r =
          (4194304 & n[0]) | (4194332 & n[1])
            ? Mt(Ct, [
                (4194304 & n[0]) | (4 & n[1]) && {
                  class: Oe({ [t[22]]: !0, "mdc-select__menu": !0, ...t[33] }),
                },
                Ct[1],
                Ct[2],
                8 & n[1] && { anchorElement: t[34] },
                16 & n[1] && { anchorCorner: t[35] },
                4194304 & n[1] && Ft(Me(t[53], "menu$")),
              ])
            : {};
        (16777216 & n[0]) | (4194400 & n[1]) | (134217728 & n[2]) &&
          (r.$$scope = { dirty: n, ctx: t }),
          !Q && 2 & n[1] && ((Q = !0), (r.open = t[32]), gt(() => (Q = !1))),
          X.$set(r),
          H(
            e,
            (Nt = Mt(wt, [
              (!ot ||
                ((67119050 & n[0]) | (2097154 & n[1]) &&
                  J !==
                    (J = Oe({
                      [t[3]]: !0,
                      "mdc-select": !0,
                      "mdc-select--required": t[10],
                      "mdc-select--disabled": t[6],
                      "mdc-select--filled": "filled" === t[7],
                      "mdc-select--outlined": "outlined" === t[7],
                      "smui-select--standard": "standard" === t[7],
                      "mdc-select--with-leading-icon": t[45](t[13])
                        ? t[52].leadingIcon
                        : t[13],
                      "mdc-select--no-label":
                        t[8] || (null == t[9] && !t[52].label),
                      "mdc-select--invalid": t[1],
                      "mdc-select--activated": t[32],
                      "mdc-data-table__pagination-rows-per-page-select":
                        "data-table:pagination" === t[46],
                      ...t[26],
                    })))) && { class: J },
              (!ot ||
                (134217744 & n[0] &&
                  Z !==
                    (Z = Object.entries(t[27])
                      .map(Xa)
                      .concat([t[4]])
                      .join(" ")))) && { style: Z },
              4194304 & n[1] &&
                we(t[53], [
                  "input$",
                  "anchor$",
                  "label$",
                  "outline$",
                  "selectedTextContainer$",
                  "selectedText$",
                  "dropdownIcon$",
                  "ripple$",
                  "menu$",
                  "list$",
                  "helperText$",
                ]),
            ]))
          ),
          tt &&
            s(tt.update) &&
            128 & n[0] &&
            tt.update.call(null, {
              ripple: "filled" === t[7],
              unbounded: !1,
              addClass: t[49],
              removeClass: t[50],
              addStyle: t[51],
            }),
          et && s(et.update) && 4 & n[0] && et.update.call(null, t[2]),
          t[52].helperText
            ? Rt
              ? (Rt.p(t, n), 2097152 & n[1] && Tt(Rt, 1))
              : ((Rt = Wa(t)), Rt.c(), Tt(Rt, 1), Rt.m(it.parentNode, it))
            : Rt &&
              (xt(),
              Ot(Rt, 1, 1, () => {
                Rt = null;
              }),
              St());
      },
      i(t) {
        ot ||
          (Tt(ut),
          Tt(dt),
          Tt(ft, t),
          Tt(Et),
          Tt(X.$$.fragment, t),
          Tt(Rt),
          (ot = !0));
      },
      o(t) {
        Ot(ut),
          Ot(dt),
          Ot(ft, t),
          Ot(Et),
          Ot(X.$$.fragment, t),
          Ot(Rt),
          (ot = !1);
      },
      d(n) {
        n && L(e),
          at && at.d(),
          ct && ct.d(),
          ut && ut.d(),
          dt && dt.d(),
          ft && ft.d(n),
          t[69](null),
          Et && Et.d(),
          t[71](null),
          Ht(X),
          t[83](null),
          n && L(nt),
          Rt && Rt.d(n),
          n && L(it),
          (rt = !1),
          r(st);
      },
    };
  }
  let Ya = 0;
  const Xa = ([t, e]) => `${t}: ${e};`;
  function Qa(t, e, i) {
    const o = [
      "use",
      "class",
      "style",
      "ripple",
      "disabled",
      "variant",
      "noLabel",
      "label",
      "value",
      "key",
      "dirty",
      "invalid",
      "updateInvalid",
      "required",
      "inputId",
      "hiddenInput",
      "withLeadingIcon",
      "anchor$use",
      "anchor$class",
      "selectedTextContainer$use",
      "selectedTextContainer$class",
      "selectedText$use",
      "selectedText$class",
      "dropdownIcon$use",
      "dropdownIcon$class",
      "menu$class",
      "getUseDefaultValidation",
      "setUseDefaultValidation",
      "focus",
      "layout",
      "getElement",
    ];
    let r,
      s,
      a = m(e, o),
      { $$slots: c = {}, $$scope: u } = e;
    const d = g(c),
      p = De(tt());
    let f = () => {};
    function $(t) {
      return t === f;
    }
    let { use: I = [] } = e,
      { class: v = "" } = e,
      { style: E = "" } = e,
      { ripple: b = !0 } = e,
      { disabled: A = !1 } = e,
      { variant: C = "standard" } = e,
      { noLabel: _ = !1 } = e,
      { label: x } = e,
      { value: S = "" } = e,
      { key: T = (t) => t } = e,
      { dirty: O = !1 } = e,
      { invalid: L = f } = e,
      { updateInvalid: w = $(L) } = e;
    const N = $(L);
    $(L) && (L = !1);
    let R,
      D,
      M,
      F,
      k,
      P,
      U,
      H,
      B,
      V,
      j,
      K,
      G,
      W,
      { required: z = !1 } = e,
      { inputId: q = "SMUI-select-" + Ya++ } = e,
      { hiddenInput: Y = !1 } = e,
      { withLeadingIcon: X = f } = e,
      { anchor$use: Q = [] } = e,
      { anchor$class: J = "" } = e,
      { selectedTextContainer$use: Z = [] } = e,
      { selectedTextContainer$class: it = "" } = e,
      { selectedText$use: at = [] } = e,
      { selectedText$class: ct = "" } = e,
      { dropdownIcon$use: ut = [] } = e,
      { dropdownIcon$class: dt = "" } = e,
      { menu$class: pt = "" } = e,
      ft = {},
      ht = {},
      mt = {},
      gt = -1,
      $t = rt("SMUI:addLayoutListener"),
      yt = !1,
      It = {},
      vt = !1,
      Et = rt("SMUI:select:context");
    ot("SMUI:list:role", ""), ot("SMUI:list:nav", !1);
    const bt = Te("");
    l(t, bt, (t) => i(43, (r = t))), ot("SMUI:select:selectedText", bt);
    const At = Te(S);
    l(t, At, (t) => i(91, (s = t))), ot("SMUI:select:value", At);
    let Ct = gt;
    function _t(t) {
      return t in ft ? ft[t] : Ft().classList.contains(t);
    }
    function xt(t) {
      ft[t] || i(26, (ft[t] = !0), ft);
    }
    function St(t) {
      (t in ft && !ft[t]) || i(26, (ft[t] = !1), ft);
    }
    function Tt(t) {
      It[t] || i(33, (It[t] = !0), It);
    }
    function Ot(t) {
      (t in It && !It[t]) || i(33, (It[t] = !1), It);
    }
    function Lt(t) {
      var e;
      return t in mt
        ? null !== (e = mt[t]) && void 0 !== e
          ? e
          : null
        : Ft().getAttribute(t);
    }
    function wt(t, e) {
      mt[t] !== e && i(29, (mt[t] = e), mt);
    }
    function Nt(t) {
      (t in mt && null == mt[t]) || i(29, (mt[t] = void 0), mt);
    }
    function Rt() {
      return B.getOrderedList().map((t) => t.getValue());
    }
    function Dt(t) {
      D.setUseDefaultValidation(t);
    }
    function Mt() {
      D.layout();
    }
    function Ft() {
      return R;
    }
    $t && (P = $t(Mt)),
      et(
        () => (
          i(
            23,
            (D = new aa(
              {
                setSelectedText: (t) => {
                  y(bt, (r = t), r);
                },
                isSelectAnchorFocused: () => document.activeElement === M,
                getSelectAnchorAttr: Lt,
                setSelectAnchorAttr: wt,
                removeSelectAnchorAttr: Nt,
                addMenuClass: Tt,
                removeMenuClass: Ot,
                openMenu: () => {
                  i(32, (yt = !0));
                },
                closeMenu: () => {
                  i(32, (yt = !1));
                },
                getAnchorElement: () => M,
                setMenuAnchorElement: (t) => {
                  i(34, (U = t));
                },
                setMenuAnchorCorner: (t) => {
                  i(35, (H = t));
                },
                setMenuWrapFocus: (t) => {
                  i(36, (vt = t));
                },
                getSelectedIndex: () => gt,
                setSelectedIndex: (t) => {
                  i(62, (Ct = t)), i(24, (gt = t)), i(0, (S = Rt()[gt]));
                },
                focusMenuItemAtIndex: (t) => {
                  B.focusItemAtIndex(t);
                },
                getMenuItemCount: () => B.items.length,
                getMenuItemValues: () => Rt().map(T),
                getMenuItemTextAtIndex: (t) => B.getPrimaryTextAtIndex(t),
                isTypeaheadInProgress: () => B.typeaheadInProgress,
                typeaheadMatchItem: (t, e) => B.typeaheadMatchItem(t, e),
                addClass: xt,
                removeClass: St,
                hasClass: _t,
                setRippleCenter: (t) => G && G.setRippleCenter(t),
                activateBottomLine: () => G && G.activate(),
                deactivateBottomLine: () => G && G.deactivate(),
                notifyChange: (t) => {
                  i(54, (O = !0)),
                    w && i(1, (L = !D.isValid())),
                    Le(
                      Ft(),
                      "SMUISelect:change",
                      { value: S, index: gt },
                      void 0,
                      !0
                    );
                },
                hasOutline: () => !!W,
                notchOutline: (t) => W && W.notch(t),
                closeOutline: () => W && W.closeNotch(),
                hasLabel: () => !!K,
                floatLabel: (t) => K && K.float(t),
                getLabelWidth: () => (K ? K.getWidth() : 0),
                setLabelRequired: (t) => K && K.setRequired(t),
              },
              {
                get helperText() {
                  return j;
                },
                get leadingIcon() {
                  return V;
                },
              }
            ))
          ),
          i(24, (gt = Rt().indexOf(S))),
          D.init(),
          Dt(N),
          () => {
            D.destroy();
          }
        )
      ),
      nt(() => {
        P && P();
      });
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(53, (a = m(e, o))),
          "use" in t && i(2, (I = t.use)),
          "class" in t && i(3, (v = t.class)),
          "style" in t && i(4, (E = t.style)),
          "ripple" in t && i(5, (b = t.ripple)),
          "disabled" in t && i(6, (A = t.disabled)),
          "variant" in t && i(7, (C = t.variant)),
          "noLabel" in t && i(8, (_ = t.noLabel)),
          "label" in t && i(9, (x = t.label)),
          "value" in t && i(0, (S = t.value)),
          "key" in t && i(55, (T = t.key)),
          "dirty" in t && i(54, (O = t.dirty)),
          "invalid" in t && i(1, (L = t.invalid)),
          "updateInvalid" in t && i(56, (w = t.updateInvalid)),
          "required" in t && i(10, (z = t.required)),
          "inputId" in t && i(11, (q = t.inputId)),
          "hiddenInput" in t && i(12, (Y = t.hiddenInput)),
          "withLeadingIcon" in t && i(13, (X = t.withLeadingIcon)),
          "anchor$use" in t && i(14, (Q = t.anchor$use)),
          "anchor$class" in t && i(15, (J = t.anchor$class)),
          "selectedTextContainer$use" in t &&
            i(16, (Z = t.selectedTextContainer$use)),
          "selectedTextContainer$class" in t &&
            i(17, (it = t.selectedTextContainer$class)),
          "selectedText$use" in t && i(18, (at = t.selectedText$use)),
          "selectedText$class" in t && i(19, (ct = t.selectedText$class)),
          "dropdownIcon$use" in t && i(20, (ut = t.dropdownIcon$use)),
          "dropdownIcon$class" in t && i(21, (dt = t.dropdownIcon$class)),
          "menu$class" in t && i(22, (pt = t.menu$class)),
          "$$scope" in t && i(89, (u = t.$$scope));
      }),
      (t.$$.update = () => {
        if ((25165825 & t.$$.dirty[0]) | (1 & t.$$.dirty[2]) && Ct !== gt)
          if ((i(62, (Ct = gt)), D)) D.setSelectedIndex(gt, !1, !0);
          else {
            const t = Rt();
            S !== t[gt] && i(0, (S = t[gt]));
          }
        1 & t.$$.dirty[0] && y(At, (s = S), s),
          (8388609 & t.$$.dirty[0]) | (16777216 & t.$$.dirty[1]) &&
            D &&
            D.getValue() !== T(S) &&
            D.setValue(T(S)),
          8388672 & t.$$.dirty[0] &&
            D &&
            D.getDisabled() !== A &&
            D.setDisabled(A),
          (8388610 & t.$$.dirty[0]) | (41943040 & t.$$.dirty[1]) &&
            D &&
            O &&
            D.isValid() !== !L &&
            (w ? i(1, (L = !D.isValid())) : D.setValid(!L)),
          8389632 & t.$$.dirty[0] &&
            D &&
            D.getRequired() !== z &&
            D.setRequired(z);
      }),
      [
        S,
        L,
        I,
        v,
        E,
        b,
        A,
        C,
        _,
        x,
        z,
        q,
        Y,
        X,
        Q,
        J,
        Z,
        it,
        at,
        ct,
        ut,
        dt,
        pt,
        D,
        gt,
        R,
        ft,
        ht,
        M,
        mt,
        F,
        k,
        yt,
        It,
        U,
        H,
        vt,
        B,
        V,
        j,
        K,
        G,
        W,
        r,
        p,
        $,
        Et,
        bt,
        At,
        xt,
        St,
        function (t, e) {
          ht[t] != e &&
            ("" === e || null == e
              ? (delete ht[t], i(27, ht))
              : i(27, (ht[t] = e), ht));
        },
        d,
        a,
        O,
        T,
        w,
        function () {
          return D.getUseDefaultValidation();
        },
        Dt,
        function () {
          M.focus();
        },
        Mt,
        Ft,
        Ct,
        c,
        function (e) {
          st.call(this, t, e);
        },
        function (e) {
          st.call(this, t, e);
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (K = t), i(40, K);
          });
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (K = t), i(40, K);
          });
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (W = t), i(42, W);
          });
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (F = t), i(30, F);
          });
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (G = t), i(41, G);
          });
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (M = t), i(28, M);
          });
        },
        () => D && D.handleFocus(),
        () => D && D.handleBlur(),
        (t) => {
          M.focus(),
            D &&
              D.handleClick(
                (function (t) {
                  const e = t.currentTarget.getBoundingClientRect();
                  return (
                    ((function (t) {
                      return "touches" in t;
                    })(t)
                      ? t.touches[0].clientX
                      : t.clientX) - e.left
                  );
                })(t)
              );
        },
        (t) => D && D.handleKeydown(t),
        function (t) {
          (gt = t), i(24, gt);
        },
        (t) => i(37, (B = t.detail)),
        function (t) {
          (yt = t), i(32, yt);
        },
        (t) => D && D.handleMenuItemAction(t.detail.index),
        () => D && D.handleMenuClosing(),
        () => D && D.handleMenuClosed(),
        () => D && D.handleMenuOpened(),
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (R = t), i(25, R);
          });
        },
        (t) => i(38, (V = t.detail)),
        () => i(38, (V = void 0)),
        (t) => i(31, (k = t.detail)),
        (t) => i(39, (j = t.detail)),
        () => {
          i(31, (k = void 0)), i(39, (j = void 0));
        },
        u,
      ]
    );
  }
  class Ja extends Vt {
    constructor(t) {
      super(),
        Bt(
          this,
          t,
          Qa,
          qa,
          a,
          {
            use: 2,
            class: 3,
            style: 4,
            ripple: 5,
            disabled: 6,
            variant: 7,
            noLabel: 8,
            label: 9,
            value: 0,
            key: 55,
            dirty: 54,
            invalid: 1,
            updateInvalid: 56,
            required: 10,
            inputId: 11,
            hiddenInput: 12,
            withLeadingIcon: 13,
            anchor$use: 14,
            anchor$class: 15,
            selectedTextContainer$use: 16,
            selectedTextContainer$class: 17,
            selectedText$use: 18,
            selectedText$class: 19,
            dropdownIcon$use: 20,
            dropdownIcon$class: 21,
            menu$class: 22,
            getUseDefaultValidation: 57,
            setUseDefaultValidation: 58,
            focus: 59,
            layout: 60,
            getElement: 61,
          },
          null,
          [-1, -1, -1, -1]
        );
    }
    get getUseDefaultValidation() {
      return this.$$.ctx[57];
    }
    get setUseDefaultValidation() {
      return this.$$.ctx[58];
    }
    get focus() {
      return this.$$.ctx[59];
    }
    get layout() {
      return this.$$.ctx[60];
    }
    get getElement() {
      return this.$$.ctx[61];
    }
  }
  function Za(t) {
    let e;
    const n = t[11].default,
      i = c(n, t, t[13], null);
    return {
      c() {
        i && i.c();
      },
      m(t, n) {
        i && i.m(t, n), (e = !0);
      },
      p(t, o) {
        i &&
          i.p &&
          (!e || 8192 & o) &&
          p(i, n, t, t[13], e ? d(n, t[13], o, null) : f(t[13]), null);
      },
      i(t) {
        e || (Tt(i, t), (e = !0));
      },
      o(t) {
        Ot(i, t), (e = !1);
      },
      d(t) {
        i && i.d(t);
      },
    };
  }
  function tl(t) {
    let e, i;
    const o = [
      { use: t[3] },
      { "data-value": t[0] },
      { value: t[0] },
      { selected: t[2] },
      t[6],
    ];
    let r = { $$slots: { default: [Za] }, $$scope: { ctx: t } };
    for (let t = 0; t < o.length; t += 1) r = n(r, o[t]);
    return (
      (e = new vs({ props: r })),
      t[12](e),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, [n]) {
          const i =
            77 & n
              ? Mt(o, [
                  8 & n && { use: t[3] },
                  1 & n && { "data-value": t[0] },
                  1 & n && { value: t[0] },
                  4 & n && { selected: t[2] },
                  64 & n && Ft(t[6]),
                ])
              : {};
          8192 & n && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(n) {
          t[12](null), Ht(e, n);
        },
      }
    );
  }
  function el(t, e, i) {
    let o, r;
    const s = ["use", "class", "value", "getElement"];
    let a,
      c,
      u = m(e, s),
      { $$slots: d = {}, $$scope: p } = e;
    const f = De(tt());
    let { use: g = [] } = e;
    let $,
      { value: I = "" } = e;
    const v = rt("SMUI:select:selectedText");
    l(t, v, (t) => i(14, (a = t)));
    const E = rt("SMUI:select:value");
    function b() {
      r && $ && y(v, (a = $.getPrimaryText()), a);
    }
    return (
      l(t, E, (t) => i(10, (c = t))),
      ot("SMUI:list:item:role", "option"),
      et(b),
      nt(b),
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(6, (u = m(e, s))),
          "use" in t && i(7, (g = t.use)),
          "value" in t && i(0, (I = t.value)),
          "$$scope" in t && i(13, (p = t.$$scope));
      }),
      (t.$$.update = () => {
        128 & t.$$.dirty && i(3, (o = [f, ...g])),
          1025 & t.$$.dirty && i(2, (r = null != I && "" !== I && c === I));
      }),
      [
        I,
        $,
        r,
        o,
        v,
        E,
        u,
        g,
        "",
        function () {
          return $.getElement();
        },
        c,
        d,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            ($ = t), i(1, $);
          });
        },
        p,
      ]
    );
  }
  const nl = class extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, el, tl, a, { use: 7, class: 8, value: 0, getElement: 9 });
    }
    get class() {
      return this.$$.ctx[8];
    }
    get getElement() {
      return this.$$.ctx[9];
    }
  };
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  /**
   * @license
   * Copyright 2020 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var il,
    ol = (function () {
      function t() {
        this.rafIDs = new Map();
      }
      return (
        (t.prototype.request = function (t, e) {
          var n = this;
          this.cancel(t);
          var i = requestAnimationFrame(function (i) {
            n.rafIDs.delete(t), e(i);
          });
          this.rafIDs.set(t, i);
        }),
        (t.prototype.cancel = function (t) {
          var e = this.rafIDs.get(t);
          e && (cancelAnimationFrame(e), this.rafIDs.delete(t));
        }),
        (t.prototype.cancelAll = function () {
          var t = this;
          this.rafIDs.forEach(function (e, n) {
            t.cancel(n);
          });
        }),
        (t.prototype.getQueue = function () {
          var t = [];
          return (
            this.rafIDs.forEach(function (e, n) {
              t.push(n);
            }),
            t
          );
        }),
        t
      );
    })(),
    rl = {
      CLOSING: "mdc-dialog--closing",
      OPEN: "mdc-dialog--open",
      OPENING: "mdc-dialog--opening",
      SCROLLABLE: "mdc-dialog--scrollable",
      SCROLL_LOCK: "mdc-dialog-scroll-lock",
      STACKED: "mdc-dialog--stacked",
      FULLSCREEN: "mdc-dialog--fullscreen",
      SCROLL_DIVIDER_HEADER: "mdc-dialog-scroll-divider-header",
      SCROLL_DIVIDER_FOOTER: "mdc-dialog-scroll-divider-footer",
      SURFACE_SCRIM_SHOWN: "mdc-dialog__surface-scrim--shown",
      SURFACE_SCRIM_SHOWING: "mdc-dialog__surface-scrim--showing",
      SURFACE_SCRIM_HIDING: "mdc-dialog__surface-scrim--hiding",
      SCRIM_HIDDEN: "mdc-dialog__scrim--hidden",
    },
    sl = {
      ACTION_ATTRIBUTE: "data-mdc-dialog-action",
      BUTTON_DEFAULT_ATTRIBUTE: "data-mdc-dialog-button-default",
      BUTTON_SELECTOR: ".mdc-dialog__button",
      CLOSED_EVENT: "MDCDialog:closed",
      CLOSE_ACTION: "close",
      CLOSING_EVENT: "MDCDialog:closing",
      CONTAINER_SELECTOR: ".mdc-dialog__container",
      CONTENT_SELECTOR: ".mdc-dialog__content",
      DESTROY_ACTION: "destroy",
      INITIAL_FOCUS_ATTRIBUTE: "data-mdc-dialog-initial-focus",
      OPENED_EVENT: "MDCDialog:opened",
      OPENING_EVENT: "MDCDialog:opening",
      SCRIM_SELECTOR: ".mdc-dialog__scrim",
      SUPPRESS_DEFAULT_PRESS_SELECTOR: [
        "textarea",
        ".mdc-menu .mdc-list-item",
        ".mdc-menu .mdc-deprecated-list-item",
      ].join(", "),
      SURFACE_SELECTOR: ".mdc-dialog__surface",
    },
    al = {
      DIALOG_ANIMATION_CLOSE_TIME_MS: 75,
      DIALOG_ANIMATION_OPEN_TIME_MS: 150,
    };
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ !(function (t) {
    (t.POLL_SCROLL_POS = "poll_scroll_position"),
      (t.POLL_LAYOUT_CHANGE = "poll_layout_change");
  })(il || (il = {}));
  var ll = (function (t) {
    function e(n) {
      var i = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
      return (
        (i.dialogOpen = !1),
        (i.isFullscreen = !1),
        (i.animationFrame = 0),
        (i.animationTimer = 0),
        (i.escapeKeyAction = sl.CLOSE_ACTION),
        (i.scrimClickAction = sl.CLOSE_ACTION),
        (i.autoStackButtons = !0),
        (i.areButtonsStacked = !1),
        (i.suppressDefaultPressSelector = sl.SUPPRESS_DEFAULT_PRESS_SELECTOR),
        (i.animFrame = new ol()),
        (i.contentScrollHandler = function () {
          i.handleScrollEvent();
        }),
        (i.windowResizeHandler = function () {
          i.layout();
        }),
        (i.windowOrientationChangeHandler = function () {
          i.layout();
        }),
        i
      );
    }
    return (
      Qt(e, t),
      Object.defineProperty(e, "cssClasses", {
        get: function () {
          return rl;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "strings", {
        get: function () {
          return sl;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "numbers", {
        get: function () {
          return al;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "defaultAdapter", {
        get: function () {
          return {
            addBodyClass: function () {},
            addClass: function () {},
            areButtonsStacked: function () {
              return !1;
            },
            clickDefaultButton: function () {},
            eventTargetMatches: function () {
              return !1;
            },
            getActionFromEvent: function () {
              return "";
            },
            getInitialFocusEl: function () {
              return null;
            },
            hasClass: function () {
              return !1;
            },
            isContentScrollable: function () {
              return !1;
            },
            notifyClosed: function () {},
            notifyClosing: function () {},
            notifyOpened: function () {},
            notifyOpening: function () {},
            releaseFocus: function () {},
            removeBodyClass: function () {},
            removeClass: function () {},
            reverseButtons: function () {},
            trapFocus: function () {},
            registerContentEventHandler: function () {},
            deregisterContentEventHandler: function () {},
            isScrollableContentAtTop: function () {
              return !1;
            },
            isScrollableContentAtBottom: function () {
              return !1;
            },
            registerWindowEventHandler: function () {},
            deregisterWindowEventHandler: function () {},
          };
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.init = function () {
        this.adapter.hasClass(rl.STACKED) && this.setAutoStackButtons(!1),
          (this.isFullscreen = this.adapter.hasClass(rl.FULLSCREEN));
      }),
      (e.prototype.destroy = function () {
        this.animationTimer &&
          (clearTimeout(this.animationTimer), this.handleAnimationTimerEnd()),
          this.isFullscreen &&
            this.adapter.deregisterContentEventHandler(
              "scroll",
              this.contentScrollHandler
            ),
          this.animFrame.cancelAll(),
          this.adapter.deregisterWindowEventHandler(
            "resize",
            this.windowResizeHandler
          ),
          this.adapter.deregisterWindowEventHandler(
            "orientationchange",
            this.windowOrientationChangeHandler
          );
      }),
      (e.prototype.open = function (t) {
        var e = this;
        (this.dialogOpen = !0),
          this.adapter.notifyOpening(),
          this.adapter.addClass(rl.OPENING),
          this.isFullscreen &&
            this.adapter.registerContentEventHandler(
              "scroll",
              this.contentScrollHandler
            ),
          t &&
            t.isAboveFullscreenDialog &&
            this.adapter.addClass(rl.SCRIM_HIDDEN),
          this.adapter.registerWindowEventHandler(
            "resize",
            this.windowResizeHandler
          ),
          this.adapter.registerWindowEventHandler(
            "orientationchange",
            this.windowOrientationChangeHandler
          ),
          this.runNextAnimationFrame(function () {
            e.adapter.addClass(rl.OPEN),
              e.adapter.addBodyClass(rl.SCROLL_LOCK),
              e.layout(),
              (e.animationTimer = setTimeout(function () {
                e.handleAnimationTimerEnd(),
                  e.adapter.trapFocus(e.adapter.getInitialFocusEl()),
                  e.adapter.notifyOpened();
              }, al.DIALOG_ANIMATION_OPEN_TIME_MS));
          });
      }),
      (e.prototype.close = function (t) {
        var e = this;
        void 0 === t && (t = ""),
          this.dialogOpen &&
            ((this.dialogOpen = !1),
            this.adapter.notifyClosing(t),
            this.adapter.addClass(rl.CLOSING),
            this.adapter.removeClass(rl.OPEN),
            this.adapter.removeBodyClass(rl.SCROLL_LOCK),
            this.isFullscreen &&
              this.adapter.deregisterContentEventHandler(
                "scroll",
                this.contentScrollHandler
              ),
            this.adapter.deregisterWindowEventHandler(
              "resize",
              this.windowResizeHandler
            ),
            this.adapter.deregisterWindowEventHandler(
              "orientationchange",
              this.windowOrientationChangeHandler
            ),
            cancelAnimationFrame(this.animationFrame),
            (this.animationFrame = 0),
            clearTimeout(this.animationTimer),
            (this.animationTimer = setTimeout(function () {
              e.adapter.releaseFocus(),
                e.handleAnimationTimerEnd(),
                e.adapter.notifyClosed(t);
            }, al.DIALOG_ANIMATION_CLOSE_TIME_MS)));
      }),
      (e.prototype.showSurfaceScrim = function () {
        var t = this;
        this.adapter.addClass(rl.SURFACE_SCRIM_SHOWING),
          this.runNextAnimationFrame(function () {
            t.adapter.addClass(rl.SURFACE_SCRIM_SHOWN);
          });
      }),
      (e.prototype.hideSurfaceScrim = function () {
        this.adapter.removeClass(rl.SURFACE_SCRIM_SHOWN),
          this.adapter.addClass(rl.SURFACE_SCRIM_HIDING);
      }),
      (e.prototype.handleSurfaceScrimTransitionEnd = function () {
        this.adapter.removeClass(rl.SURFACE_SCRIM_HIDING),
          this.adapter.removeClass(rl.SURFACE_SCRIM_SHOWING);
      }),
      (e.prototype.isOpen = function () {
        return this.dialogOpen;
      }),
      (e.prototype.getEscapeKeyAction = function () {
        return this.escapeKeyAction;
      }),
      (e.prototype.setEscapeKeyAction = function (t) {
        this.escapeKeyAction = t;
      }),
      (e.prototype.getScrimClickAction = function () {
        return this.scrimClickAction;
      }),
      (e.prototype.setScrimClickAction = function (t) {
        this.scrimClickAction = t;
      }),
      (e.prototype.getAutoStackButtons = function () {
        return this.autoStackButtons;
      }),
      (e.prototype.setAutoStackButtons = function (t) {
        this.autoStackButtons = t;
      }),
      (e.prototype.getSuppressDefaultPressSelector = function () {
        return this.suppressDefaultPressSelector;
      }),
      (e.prototype.setSuppressDefaultPressSelector = function (t) {
        this.suppressDefaultPressSelector = t;
      }),
      (e.prototype.layout = function () {
        var t = this;
        this.animFrame.request(il.POLL_LAYOUT_CHANGE, function () {
          t.layoutInternal();
        });
      }),
      (e.prototype.handleClick = function (t) {
        if (
          this.adapter.eventTargetMatches(t.target, sl.SCRIM_SELECTOR) &&
          "" !== this.scrimClickAction
        )
          this.close(this.scrimClickAction);
        else {
          var e = this.adapter.getActionFromEvent(t);
          e && this.close(e);
        }
      }),
      (e.prototype.handleKeydown = function (t) {
        var e = "Enter" === t.key || 13 === t.keyCode;
        if (e && !this.adapter.getActionFromEvent(t)) {
          var n = t.composedPath ? t.composedPath()[0] : t.target,
            i =
              !this.suppressDefaultPressSelector ||
              !this.adapter.eventTargetMatches(
                n,
                this.suppressDefaultPressSelector
              );
          e && i && this.adapter.clickDefaultButton();
        }
      }),
      (e.prototype.handleDocumentKeydown = function (t) {
        ("Escape" === t.key || 27 === t.keyCode) &&
          "" !== this.escapeKeyAction &&
          this.close(this.escapeKeyAction);
      }),
      (e.prototype.handleScrollEvent = function () {
        var t = this;
        this.animFrame.request(il.POLL_SCROLL_POS, function () {
          t.toggleScrollDividerHeader(), t.toggleScrollDividerFooter();
        });
      }),
      (e.prototype.layoutInternal = function () {
        this.autoStackButtons && this.detectStackedButtons(),
          this.toggleScrollableClasses();
      }),
      (e.prototype.handleAnimationTimerEnd = function () {
        (this.animationTimer = 0),
          this.adapter.removeClass(rl.OPENING),
          this.adapter.removeClass(rl.CLOSING);
      }),
      (e.prototype.runNextAnimationFrame = function (t) {
        var e = this;
        cancelAnimationFrame(this.animationFrame),
          (this.animationFrame = requestAnimationFrame(function () {
            (e.animationFrame = 0),
              clearTimeout(e.animationTimer),
              (e.animationTimer = setTimeout(t, 0));
          }));
      }),
      (e.prototype.detectStackedButtons = function () {
        this.adapter.removeClass(rl.STACKED);
        var t = this.adapter.areButtonsStacked();
        t && this.adapter.addClass(rl.STACKED),
          t !== this.areButtonsStacked &&
            (this.adapter.reverseButtons(), (this.areButtonsStacked = t));
      }),
      (e.prototype.toggleScrollableClasses = function () {
        this.adapter.removeClass(rl.SCROLLABLE),
          this.adapter.isContentScrollable() &&
            (this.adapter.addClass(rl.SCROLLABLE),
            this.isFullscreen &&
              (this.toggleScrollDividerHeader(),
              this.toggleScrollDividerFooter()));
      }),
      (e.prototype.toggleScrollDividerHeader = function () {
        this.adapter.isScrollableContentAtTop()
          ? this.adapter.hasClass(rl.SCROLL_DIVIDER_HEADER) &&
            this.adapter.removeClass(rl.SCROLL_DIVIDER_HEADER)
          : this.adapter.addClass(rl.SCROLL_DIVIDER_HEADER);
      }),
      (e.prototype.toggleScrollDividerFooter = function () {
        this.adapter.isScrollableContentAtBottom()
          ? this.adapter.hasClass(rl.SCROLL_DIVIDER_FOOTER) &&
            this.adapter.removeClass(rl.SCROLL_DIVIDER_FOOTER)
          : this.adapter.addClass(rl.SCROLL_DIVIDER_FOOTER);
      }),
      e
    );
  })(oe);
  const { document: cl, window: ul } = wt,
    dl = (t) => ({}),
    pl = (t) => ({});
  function fl(e) {
    let n, i, o;
    return {
      c() {
        (n = N("div")), U(n, "class", "mdc-dialog__surface-scrim");
      },
      m(t, r) {
        O(t, n, r), i || ((o = k(n, "transitionend", e[31])), (i = !0));
      },
      p: t,
      d(t) {
        t && L(n), (i = !1), o();
      },
    };
  }
  function hl(t) {
    let e, i, o, a, l, u, h, m, g, $, y, v, E, b, A;
    const C = t[27].default,
      _ = c(C, t, t[26], null);
    let S = t[5] && fl(t),
      T = [
        { class: (u = Oe({ [t[7]]: !0, "mdc-dialog__surface": !0 })) },
        { role: "alertdialog" },
        { "aria-modal": "true" },
        Me(t[17], "surface$"),
      ],
      w = {};
    for (let t = 0; t < T.length; t += 1) w = n(w, T[t]);
    let R = [
        { class: (h = Oe({ [t[6]]: !0, "mdc-dialog__container": !0 })) },
        Me(t[17], "container$"),
      ],
      D = {};
    for (let t = 0; t < R.length; t += 1) D = n(D, R[t]);
    let F = [
        {
          class: ($ = Oe({
            [t[2]]: !0,
            "mdc-dialog": !0,
            "mdc-dialog--stacked": !t[4],
            "mdc-dialog--fullscreen": t[5],
            "smui-dialog--selection": t[3],
            ...t[10],
          })),
        },
        { role: "alertdialog" },
        { "aria-modal": "true" },
        we(t[17], ["container$", "surface$"]),
      ],
      P = {};
    for (let t = 0; t < F.length; t += 1) P = n(P, F[t]);
    const B = t[27].over,
      V = c(B, t, t[26], pl);
    return {
      c() {
        (e = M()),
          (i = N("div")),
          (o = N("div")),
          (a = N("div")),
          _ && _.c(),
          (l = M()),
          S && S.c(),
          (m = M()),
          (g = N("div")),
          (v = M()),
          V && V.c(),
          H(a, w),
          H(o, D),
          U(g, "class", "mdc-dialog__scrim"),
          H(i, P);
      },
      m(n, r) {
        O(n, e, r),
          O(n, i, r),
          x(i, o),
          x(o, a),
          _ && _.m(a, null),
          x(a, l),
          S && S.m(a, null),
          x(i, m),
          x(i, g),
          t[32](i),
          O(n, v, r),
          V && V.m(n, r),
          (E = !0),
          b ||
            ((A = [
              k(ul, "resize", t[28]),
              k(ul, "orientationchange", t[29]),
              k(cl.body, "keydown", t[30]),
              I((y = Fe.call(null, i, t[1]))),
              I(t[11].call(null, i)),
              k(i, "SMUIDialog:opening", t[14]),
              k(i, "SMUIDialog:opened", t[15]),
              k(i, "SMUIDialog:closed", t[16]),
              k(i, "click", t[33]),
              k(i, "keydown", t[34]),
            ]),
            (b = !0));
      },
      p(t, e) {
        _ &&
          _.p &&
          (!E || 67108864 & e[0]) &&
          p(_, C, t, t[26], E ? d(C, t[26], e, null) : f(t[26]), null),
          t[5]
            ? S
              ? S.p(t, e)
              : ((S = fl(t)), S.c(), S.m(a, null))
            : S && (S.d(1), (S = null)),
          H(
            a,
            (w = Mt(T, [
              (!E ||
                (128 & e[0] &&
                  u !==
                    (u = Oe({ [t[7]]: !0, "mdc-dialog__surface": !0 })))) && {
                class: u,
              },
              { role: "alertdialog" },
              { "aria-modal": "true" },
              131072 & e[0] && Me(t[17], "surface$"),
            ]))
          ),
          H(
            o,
            (D = Mt(R, [
              (!E ||
                (64 & e[0] &&
                  h !==
                    (h = Oe({ [t[6]]: !0, "mdc-dialog__container": !0 })))) && {
                class: h,
              },
              131072 & e[0] && Me(t[17], "container$"),
            ]))
          ),
          H(
            i,
            (P = Mt(F, [
              (!E ||
                (1084 & e[0] &&
                  $ !==
                    ($ = Oe({
                      [t[2]]: !0,
                      "mdc-dialog": !0,
                      "mdc-dialog--stacked": !t[4],
                      "mdc-dialog--fullscreen": t[5],
                      "smui-dialog--selection": t[3],
                      ...t[10],
                    })))) && { class: $ },
              { role: "alertdialog" },
              { "aria-modal": "true" },
              131072 & e[0] && we(t[17], ["container$", "surface$"]),
            ]))
          ),
          y && s(y.update) && 2 & e[0] && y.update.call(null, t[1]),
          V &&
            V.p &&
            (!E || 67108864 & e[0]) &&
            p(V, B, t, t[26], E ? d(B, t[26], e, dl) : f(t[26]), pl);
      },
      i(t) {
        E || (Tt(_, t), Tt(V, t), (E = !0));
      },
      o(t) {
        Ot(_, t), Ot(V, t), (E = !1);
      },
      d(n) {
        n && L(e),
          n && L(i),
          _ && _.d(n),
          S && S.d(),
          t[32](null),
          n && L(v),
          V && V.d(n),
          (b = !1),
          r(A);
      },
    };
  }
  function ml(t, e, i) {
    const o = [
      "use",
      "class",
      "open",
      "selection",
      "escapeKeyAction",
      "scrimClickAction",
      "autoStackButtons",
      "fullscreen",
      "container$class",
      "surface$class",
      "isOpen",
      "setOpen",
      "layout",
      "getElement",
    ];
    let r,
      s,
      a = m(e, o),
      { $$slots: c = {}, $$scope: u } = e;
    var d;
    const { FocusTrap: p } = ii,
      { closest: f, matches: g } = ue,
      $ = De(tt());
    let I,
      v,
      E,
      { use: b = [] } = e,
      { class: A = "" } = e,
      { open: C = !1 } = e,
      { selection: _ = !1 } = e,
      { escapeKeyAction: x = "close" } = e,
      { scrimClickAction: S = "close" } = e,
      { autoStackButtons: T = !0 } = e,
      { fullscreen: O = !1 } = e,
      { container$class: L = "" } = e,
      { surface$class: w = "" } = e,
      N = {},
      R = Te(!1);
    l(t, R, (t) => i(38, (s = t)));
    let D = rt("SMUI:dialog:aboveFullscreen"),
      M =
        null !== (d = rt("SMUI:dialog:aboveFullscreenShown")) && void 0 !== d
          ? d
          : Te(!1);
    l(t, M, (t) => i(25, (r = t)));
    let F,
      k = rt("SMUI:addLayoutListener"),
      P = [];
    ot("SMUI:dialog:actions:reversed", R),
      ot(
        "SMUI:addLayoutListener",
        (t) => (
          P.push(t),
          () => {
            const e = P.indexOf(t);
            e >= 0 && P.splice(e, 1);
          }
        )
      ),
      ot("SMUI:dialog:selection", _),
      ot("SMUI:dialog:aboveFullscreen", D || O),
      ot("SMUI:dialog:aboveFullscreenShown", M),
      k && (F = k(G));
    let U = r;
    function H(t) {
      return t in N ? N[t] : W().classList.contains(t);
    }
    function B(t) {
      N[t] || i(10, (N[t] = !0), N);
    }
    function V(t) {
      (t in N && !N[t]) || i(10, (N[t] = !1), N);
    }
    function j() {
      return I.querySelector(".mdc-dialog__content");
    }
    function K() {
      return I.querySelector("[data-mdc-dialog-initial-focus]");
    }
    function G() {
      return v.layout();
    }
    function W() {
      return I;
    }
    et(() => {
      var t;
      return (
        (E = new p(I, {
          initialFocusEl: null !== (t = K()) && void 0 !== t ? t : void 0,
        })),
        i(
          8,
          (v = new ll({
            addBodyClass: (t) => document.body.classList.add(t),
            addClass: B,
            areButtonsStacked: () => {
              return (
                (t = [].slice.call(I.querySelectorAll(".mdc-dialog__button"))),
                (e = new Set()),
                [].forEach.call(t, function (t) {
                  return e.add(t.offsetTop);
                }),
                e.size > 1
              );
              var t, e;
            },
            clickDefaultButton: () => {
              const t = I.querySelector("[data-mdc-dialog-button-default");
              t && t.click();
            },
            eventTargetMatches: (t, e) => !!t && g(t, e),
            getActionFromEvent: (t) => {
              if (!t.target) return "";
              const e = f(t.target, "[data-mdc-dialog-action]");
              return e && e.getAttribute("data-mdc-dialog-action");
            },
            getInitialFocusEl: K,
            hasClass: H,
            isContentScrollable: () => {
              return !!(t = j()) && t.scrollHeight > t.offsetHeight;
              var t;
            },
            notifyClosed: (t) => {
              i(0, (C = !1)),
                Le(
                  W(),
                  "SMUIDialog:closed",
                  t ? { action: t } : {},
                  void 0,
                  !0
                );
            },
            notifyClosing: (t) =>
              Le(W(), "SMUIDialog:closing", t ? { action: t } : {}, void 0, !0),
            notifyOpened: () => Le(W(), "SMUIDialog:opened", {}, void 0, !0),
            notifyOpening: () => Le(W(), "SMUIDialog:opening", {}, void 0, !0),
            releaseFocus: () => E.releaseFocus(),
            removeBodyClass: (t) => document.body.classList.remove(t),
            removeClass: V,
            reverseButtons: () => {
              y(R, (s = !0), s);
            },
            trapFocus: () => E.trapFocus(),
            registerContentEventHandler: (t, e) => {
              const n = j();
              n instanceof HTMLElement && n.addEventListener(t, e);
            },
            deregisterContentEventHandler: (t, e) => {
              const n = j();
              n instanceof HTMLElement && n.removeEventListener(t, e);
            },
            isScrollableContentAtTop: () => {
              return !!(t = j()) && 0 === t.scrollTop;
              var t;
            },
            isScrollableContentAtBottom: () => {
              return (
                !!(t = j()) &&
                Math.ceil(t.scrollHeight - t.scrollTop) === t.clientHeight
              );
              var t;
            },
            registerWindowEventHandler: (t, e) => {
              window.addEventListener(t, e);
            },
            deregisterWindowEventHandler: (t, e) => {
              window.removeEventListener(t, e);
            },
          }))
        ),
        v.init(),
        () => {
          v.destroy();
        }
      );
    }),
      nt(() => {
        F && F();
      });
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(17, (a = m(e, o))),
          "use" in t && i(1, (b = t.use)),
          "class" in t && i(2, (A = t.class)),
          "open" in t && i(0, (C = t.open)),
          "selection" in t && i(3, (_ = t.selection)),
          "escapeKeyAction" in t && i(18, (x = t.escapeKeyAction)),
          "scrimClickAction" in t && i(19, (S = t.scrimClickAction)),
          "autoStackButtons" in t && i(4, (T = t.autoStackButtons)),
          "fullscreen" in t && i(5, (O = t.fullscreen)),
          "container$class" in t && i(6, (L = t.container$class)),
          "surface$class" in t && i(7, (w = t.surface$class)),
          "$$scope" in t && i(26, (u = t.$$scope));
      }),
      (t.$$.update = () => {
        262400 & t.$$.dirty[0] &&
          v &&
          v.getEscapeKeyAction() !== x &&
          v.setEscapeKeyAction(x),
          524544 & t.$$.dirty[0] &&
            v &&
            v.getScrimClickAction() !== S &&
            v.setScrimClickAction(S),
          272 & t.$$.dirty[0] &&
            v &&
            v.getAutoStackButtons() !== T &&
            v.setAutoStackButtons(T),
          16 & t.$$.dirty[0] && (T || y(R, (s = !0), s)),
          257 & t.$$.dirty[0] &&
            v &&
            v.isOpen() !== C &&
            (C ? v.open({ isAboveFullscreenDialog: !!D }) : v.close()),
          50331936 & t.$$.dirty[0] &&
            O &&
            v &&
            U !== r &&
            (i(24, (U = r)), r ? v.showSurfaceScrim() : v.hideSurfaceScrim());
      }),
      [
        C,
        b,
        A,
        _,
        T,
        O,
        L,
        w,
        v,
        I,
        N,
        $,
        R,
        M,
        function () {
          D && y(M, (r = !0), r),
            requestAnimationFrame(() => {
              P.forEach((t) => t());
            });
        },
        function () {
          P.forEach((t) => t());
        },
        function () {
          D && y(M, (r = !1), r);
        },
        a,
        x,
        S,
        function () {
          return C;
        },
        function (t) {
          i(0, (C = t));
        },
        G,
        W,
        U,
        r,
        u,
        c,
        () => C && v && v.layout(),
        () => C && v && v.layout(),
        (t) => C && v && v.handleDocumentKeydown(t),
        () => v && v.handleSurfaceScrimTransitionEnd(),
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (I = t), i(9, I);
          });
        },
        (t) => v && v.handleClick(t),
        (t) => v && v.handleKeydown(t),
      ]
    );
  }
  class gl extends Vt {
    constructor(t) {
      super(),
        Bt(
          this,
          t,
          ml,
          hl,
          a,
          {
            use: 1,
            class: 2,
            open: 0,
            selection: 3,
            escapeKeyAction: 18,
            scrimClickAction: 19,
            autoStackButtons: 4,
            fullscreen: 5,
            container$class: 6,
            surface$class: 7,
            isOpen: 20,
            setOpen: 21,
            layout: 22,
            getElement: 23,
          },
          null,
          [-1, -1]
        );
    }
    get isOpen() {
      return this.$$.ctx[20];
    }
    get setOpen() {
      return this.$$.ctx[21];
    }
    get layout() {
      return this.$$.ctx[22];
    }
    get getElement() {
      return this.$$.ctx[23];
    }
  }
  Qe({
    class: "mdc-dialog__header",
    component: Cn,
    contexts: { "SMUI:icon-button:context": "dialog:header" },
  });
  var $l = Qe({ class: "mdc-dialog__title", component: xn }),
    yl = Qe({ class: "mdc-dialog__content", component: Cn }),
    Il = Qe({
      class: "mdc-dialog__actions",
      component: Cn,
      classMap: {
        "smui-dialog__actions--reversed": "SMUI:dialog:actions:reversed",
      },
      contexts: { "SMUI:button:context": "dialog:action" },
    });
  function vl(t) {
    let e;
    return {
      c() {
        (e = N("div")), U(e, "class", "mdc-button__touch");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function El(t) {
    let e, n, i, o;
    const r = t[27].default,
      s = c(r, t, t[29], null);
    let a = t[6] && vl();
    return {
      c() {
        (e = N("div")),
          (n = M()),
          s && s.c(),
          a && a.c(),
          (i = F()),
          U(e, "class", "mdc-button__ripple");
      },
      m(t, r) {
        O(t, e, r),
          O(t, n, r),
          s && s.m(t, r),
          a && a.m(t, r),
          O(t, i, r),
          (o = !0);
      },
      p(t, e) {
        s &&
          s.p &&
          (!o || 536870912 & e) &&
          p(s, r, t, t[29], o ? d(r, t[29], e, null) : f(t[29]), null),
          t[6]
            ? a || ((a = vl()), a.c(), a.m(i.parentNode, i))
            : a && (a.d(1), (a = null));
      },
      i(t) {
        o || (Tt(s, t), (o = !0));
      },
      o(t) {
        Ot(s, t), (o = !1);
      },
      d(t) {
        t && L(e), t && L(n), s && s.d(t), a && a.d(t), t && L(i);
      },
    };
  }
  function bl(t) {
    let e, i, o;
    const r = [
      {
        use: [
          [
            Wi,
            {
              ripple: t[3],
              unbounded: !1,
              color: t[4],
              disabled: !!t[22].disabled,
              addClass: t[18],
              removeClass: t[19],
              addStyle: t[20],
            },
          ],
          t[16],
          ...t[0],
        ],
      },
      {
        class: Oe({
          [t[1]]: !0,
          "mdc-button": !0,
          "mdc-button--raised": "raised" === t[5],
          "mdc-button--unelevated": "unelevated" === t[5],
          "mdc-button--outlined": "outlined" === t[5],
          "smui-button--color-secondary": "secondary" === t[4],
          "mdc-button--touch": t[6],
          "mdc-card__action": "card:action" === t[17],
          "mdc-card__action--button": "card:action" === t[17],
          "mdc-dialog__button": "dialog:action" === t[17],
          "mdc-top-app-bar__navigation-icon":
            "top-app-bar:navigation" === t[17],
          "mdc-top-app-bar__action-item": "top-app-bar:action" === t[17],
          "mdc-snackbar__action": "snackbar:actions" === t[17],
          "mdc-banner__secondary-action": "banner" === t[17] && t[8],
          "mdc-banner__primary-action": "banner" === t[17] && !t[8],
          "mdc-tooltip__action": "tooltip:rich-actions" === t[17],
          ...t[11],
        }),
      },
      { style: Object.entries(t[12]).map(Al).concat([t[2]]).join(" ") },
      t[15],
      t[14],
      t[13],
      { href: t[7] },
      t[22],
    ];
    var s = t[9];
    function a(t) {
      let e = { $$slots: { default: [El] }, $$scope: { ctx: t } };
      for (let t = 0; t < r.length; t += 1) e = n(e, r[t]);
      return { props: e };
    }
    return (
      s && ((e = new s(a(t))), t[28](e), e.$on("click", t[21])),
      {
        c() {
          e && Pt(e.$$.fragment), (i = F());
        },
        m(t, n) {
          e && Ut(e, t, n), O(t, i, n), (o = !0);
        },
        p(t, [n]) {
          const o =
            6289919 & n
              ? Mt(r, [
                  6094873 & n && {
                    use: [
                      [
                        Wi,
                        {
                          ripple: t[3],
                          unbounded: !1,
                          color: t[4],
                          disabled: !!t[22].disabled,
                          addClass: t[18],
                          removeClass: t[19],
                          addStyle: t[20],
                        },
                      ],
                      t[16],
                      ...t[0],
                    ],
                  },
                  133490 & n && {
                    class: Oe({
                      [t[1]]: !0,
                      "mdc-button": !0,
                      "mdc-button--raised": "raised" === t[5],
                      "mdc-button--unelevated": "unelevated" === t[5],
                      "mdc-button--outlined": "outlined" === t[5],
                      "smui-button--color-secondary": "secondary" === t[4],
                      "mdc-button--touch": t[6],
                      "mdc-card__action": "card:action" === t[17],
                      "mdc-card__action--button": "card:action" === t[17],
                      "mdc-dialog__button": "dialog:action" === t[17],
                      "mdc-top-app-bar__navigation-icon":
                        "top-app-bar:navigation" === t[17],
                      "mdc-top-app-bar__action-item":
                        "top-app-bar:action" === t[17],
                      "mdc-snackbar__action": "snackbar:actions" === t[17],
                      "mdc-banner__secondary-action":
                        "banner" === t[17] && t[8],
                      "mdc-banner__primary-action": "banner" === t[17] && !t[8],
                      "mdc-tooltip__action": "tooltip:rich-actions" === t[17],
                      ...t[11],
                    }),
                  },
                  4100 & n && {
                    style: Object.entries(t[12])
                      .map(Al)
                      .concat([t[2]])
                      .join(" "),
                  },
                  32768 & n && Ft(t[15]),
                  16384 & n && Ft(t[14]),
                  8192 & n && Ft(t[13]),
                  128 & n && { href: t[7] },
                  4194304 & n && Ft(t[22]),
                ])
              : {};
          if (
            (536870976 & n && (o.$$scope = { dirty: n, ctx: t }),
            s !== (s = t[9]))
          ) {
            if (e) {
              xt();
              const t = e;
              Ot(t.$$.fragment, 1, 0, () => {
                Ht(t, 1);
              }),
                St();
            }
            s
              ? ((e = new s(a(t))),
                t[28](e),
                e.$on("click", t[21]),
                Pt(e.$$.fragment),
                Tt(e.$$.fragment, 1),
                Ut(e, i.parentNode, i))
              : (e = null);
          } else s && e.$set(o);
        },
        i(t) {
          o || (e && Tt(e.$$.fragment, t), (o = !0));
        },
        o(t) {
          e && Ot(e.$$.fragment, t), (o = !1);
        },
        d(n) {
          t[28](null), n && L(i), e && Ht(e, n);
        },
      }
    );
  }
  const Al = ([t, e]) => `${t}: ${e};`;
  function Cl(t, e, i) {
    let o, r, s;
    const a = [
      "use",
      "class",
      "style",
      "ripple",
      "color",
      "variant",
      "touch",
      "href",
      "action",
      "defaultAction",
      "secondary",
      "component",
      "getElement",
    ];
    let l = m(e, a),
      { $$slots: c = {}, $$scope: u } = e;
    const d = De(tt());
    let p,
      { use: f = [] } = e,
      { class: g = "" } = e,
      { style: $ = "" } = e,
      { ripple: y = !0 } = e,
      { color: I = "primary" } = e,
      { variant: v = "text" } = e,
      { touch: E = !1 } = e,
      { href: b } = e,
      { action: A = "close" } = e,
      { defaultAction: C = !1 } = e,
      { secondary: _ = !1 } = e,
      x = {},
      S = {},
      T = rt("SMUI:button:context"),
      { component: O = null == b ? An : bn } = e,
      L = l.disabled;
    function w() {
      return p.getElement();
    }
    return (
      ot("SMUI:label:context", "button"),
      ot("SMUI:icon:context", "button"),
      (t.$$set = (t) => {
        i(30, (e = n(n({}, e), h(t)))),
          i(22, (l = m(e, a))),
          "use" in t && i(0, (f = t.use)),
          "class" in t && i(1, (g = t.class)),
          "style" in t && i(2, ($ = t.style)),
          "ripple" in t && i(3, (y = t.ripple)),
          "color" in t && i(4, (I = t.color)),
          "variant" in t && i(5, (v = t.variant)),
          "touch" in t && i(6, (E = t.touch)),
          "href" in t && i(7, (b = t.href)),
          "action" in t && i(23, (A = t.action)),
          "defaultAction" in t && i(24, (C = t.defaultAction)),
          "secondary" in t && i(8, (_ = t.secondary)),
          "component" in t && i(9, (O = t.component)),
          "$$scope" in t && i(29, (u = t.$$scope));
      }),
      (t.$$.update = () => {
        i(
          15,
          (o =
            "dialog:action" === T && null != A
              ? { "data-mdc-dialog-action": A }
              : { action: e.action })
        ),
          i(
            14,
            (r =
              "dialog:action" === T && C
                ? { "data-mdc-dialog-button-default": "" }
                : { default: e.default })
          ),
          i(13, (s = "banner" === T ? {} : { secondary: e.secondary })),
          L !== l.disabled && (w().blur(), i(26, (L = l.disabled)));
      }),
      (e = h(e)),
      [
        f,
        g,
        $,
        y,
        I,
        v,
        E,
        b,
        _,
        O,
        p,
        x,
        S,
        s,
        r,
        o,
        d,
        T,
        function (t) {
          x[t] || i(11, (x[t] = !0), x);
        },
        function (t) {
          (t in x && !x[t]) || i(11, (x[t] = !1), x);
        },
        function (t, e) {
          S[t] != e &&
            ("" === e || null == e
              ? (delete S[t], i(12, S))
              : i(12, (S[t] = e), S));
        },
        function () {
          "banner" === T &&
            Le(
              w(),
              _
                ? "SMUIBannerButton:secondaryActionClick"
                : "SMUIBannerButton:primaryActionClick"
            );
        },
        l,
        A,
        C,
        w,
        L,
        c,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (p = t), i(10, p);
          });
        },
        u,
      ]
    );
  }
  class _l extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, Cl, bl, a, {
          use: 0,
          class: 1,
          style: 2,
          ripple: 3,
          color: 4,
          variant: 5,
          touch: 6,
          href: 7,
          action: 23,
          defaultAction: 24,
          secondary: 8,
          component: 9,
          getElement: 25,
        });
    }
    get getElement() {
      return this.$$.ctx[25];
    }
  }
  function xl(t) {
    let e, i, o, a, l, u;
    const h = t[12].default,
      m = c(h, t, t[11], null);
    let g = [
        {
          class: (i = Oe({
            [t[1]]: !0,
            "smui-paper": !0,
            "smui-paper--raised": "raised" === t[2],
            "smui-paper--unelevated": "unelevated" === t[2],
            "smui-paper--outlined": "outlined" === t[2],
            ["smui-paper--elevation-z" + t[5]]: 0 !== t[5] && "raised" === t[2],
            "smui-paper--rounded": !t[3],
            ["smui-paper--color-" + t[4]]: "default" !== t[4],
            "smui-paper-transition": t[6],
          })),
        },
        t[9],
      ],
      $ = {};
    for (let t = 0; t < g.length; t += 1) $ = n($, g[t]);
    return {
      c() {
        (e = N("div")), m && m.c(), H(e, $);
      },
      m(n, i) {
        O(n, e, i),
          m && m.m(e, null),
          t[13](e),
          (a = !0),
          l ||
            ((u = [I((o = Fe.call(null, e, t[0]))), I(t[8].call(null, e))]),
            (l = !0));
      },
      p(t, [n]) {
        m &&
          m.p &&
          (!a || 2048 & n) &&
          p(m, h, t, t[11], a ? d(h, t[11], n, null) : f(t[11]), null),
          H(
            e,
            ($ = Mt(g, [
              (!a ||
                (126 & n &&
                  i !==
                    (i = Oe({
                      [t[1]]: !0,
                      "smui-paper": !0,
                      "smui-paper--raised": "raised" === t[2],
                      "smui-paper--unelevated": "unelevated" === t[2],
                      "smui-paper--outlined": "outlined" === t[2],
                      ["smui-paper--elevation-z" + t[5]]:
                        0 !== t[5] && "raised" === t[2],
                      "smui-paper--rounded": !t[3],
                      ["smui-paper--color-" + t[4]]: "default" !== t[4],
                      "smui-paper-transition": t[6],
                    })))) && { class: i },
              512 & n && t[9],
            ]))
          ),
          o && s(o.update) && 1 & n && o.update.call(null, t[0]);
      },
      i(t) {
        a || (Tt(m, t), (a = !0));
      },
      o(t) {
        Ot(m, t), (a = !1);
      },
      d(n) {
        n && L(e), m && m.d(n), t[13](null), (l = !1), r(u);
      },
    };
  }
  function Sl(t, e, i) {
    const o = [
      "use",
      "class",
      "variant",
      "square",
      "color",
      "elevation",
      "transition",
      "getElement",
    ];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e;
    const l = De(tt());
    let c,
      { use: u = [] } = e,
      { class: d = "" } = e,
      { variant: p = "raised" } = e,
      { square: f = !1 } = e,
      { color: g = "default" } = e,
      { elevation: $ = 1 } = e,
      { transition: y = !1 } = e;
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(9, (r = m(e, o))),
          "use" in t && i(0, (u = t.use)),
          "class" in t && i(1, (d = t.class)),
          "variant" in t && i(2, (p = t.variant)),
          "square" in t && i(3, (f = t.square)),
          "color" in t && i(4, (g = t.color)),
          "elevation" in t && i(5, ($ = t.elevation)),
          "transition" in t && i(6, (y = t.transition)),
          "$$scope" in t && i(11, (a = t.$$scope));
      }),
      [
        u,
        d,
        p,
        f,
        g,
        $,
        y,
        c,
        l,
        r,
        function () {
          return c;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (c = t), i(7, c);
          });
        },
      ]
    );
  }
  class Tl extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, Sl, xl, a, {
          use: 0,
          class: 1,
          variant: 2,
          square: 3,
          color: 4,
          elevation: 5,
          transition: 6,
          getElement: 10,
        });
    }
    get getElement() {
      return this.$$.ctx[10];
    }
  }
  var Ol = Qe({ class: "smui-paper__content", component: Cn });
  Qe({ class: "smui-paper__title", component: Tn }),
    Qe({ class: "smui-paper__subtitle", component: On });
  var Ll = new Map([
    ["avi", "video/avi"],
    ["gif", "image/gif"],
    ["ico", "image/x-icon"],
    ["jpeg", "image/jpeg"],
    ["jpg", "image/jpeg"],
    ["mkv", "video/x-matroska"],
    ["mov", "video/quicktime"],
    ["mp4", "video/mp4"],
    ["pdf", "application/pdf"],
    ["png", "image/png"],
    ["zip", "application/zip"],
    ["doc", "application/msword"],
    [
      "docx",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  ]);
  function wl(t, e) {
    var n = (function (t) {
      var e = t.name;
      if (e && -1 !== e.lastIndexOf(".") && !t.type) {
        var n = e.split(".").pop().toLowerCase(),
          i = Ll.get(n);
        i &&
          Object.defineProperty(t, "type", {
            value: i,
            writable: !1,
            configurable: !1,
            enumerable: !0,
          });
      }
      return t;
    })(t);
    if ("string" != typeof n.path) {
      var i = t.webkitRelativePath;
      Object.defineProperty(n, "path", {
        value:
          "string" == typeof e
            ? e
            : "string" == typeof i && i.length > 0
            ? i
            : t.name,
        writable: !1,
        configurable: !1,
        enumerable: !0,
      });
    }
    return n;
  }
  var Nl = [".DS_Store", "Thumbs.db"];
  function Rl(t) {
    return Zt(this, void 0, void 0, function () {
      return te(this, function (e) {
        return [
          2,
          ((n = t),
          n.dataTransfer && t.dataTransfer
            ? Ml(t.dataTransfer, t.type)
            : Dl(t)),
        ];
        var n;
      });
    });
  }
  function Dl(t) {
    return (null !== t.target && t.target.files ? kl(t.target.files) : []).map(
      function (t) {
        return wl(t);
      }
    );
  }
  function Ml(t, e) {
    return Zt(this, void 0, void 0, function () {
      var n;
      return te(this, function (i) {
        switch (i.label) {
          case 0:
            return t.items
              ? ((n = kl(t.items).filter(function (t) {
                  return "file" === t.kind;
                })),
                "drop" !== e ? [2, n] : [4, Promise.all(n.map(Pl))])
              : [3, 2];
          case 1:
            return [2, Fl(Ul(i.sent()))];
          case 2:
            return [
              2,
              Fl(
                kl(t.files).map(function (t) {
                  return wl(t);
                })
              ),
            ];
        }
      });
    });
  }
  function Fl(t) {
    return t.filter(function (t) {
      return -1 === Nl.indexOf(t.name);
    });
  }
  function kl(t) {
    for (var e = [], n = 0; n < t.length; n++) {
      var i = t[n];
      e.push(i);
    }
    return e;
  }
  function Pl(t) {
    if ("function" != typeof t.webkitGetAsEntry) return Hl(t);
    var e = t.webkitGetAsEntry();
    return e && e.isDirectory ? Vl(e) : Hl(t);
  }
  function Ul(t) {
    return t.reduce(function (t, e) {
      return (function () {
        for (var t = [], e = 0; e < arguments.length; e++)
          t = t.concat(ne(arguments[e]));
        return t;
      })(t, Array.isArray(e) ? Ul(e) : [e]);
    }, []);
  }
  function Hl(t) {
    var e = t.getAsFile();
    if (!e) return Promise.reject(t + " is not a File");
    var n = wl(e);
    return Promise.resolve(n);
  }
  function Bl(t) {
    return Zt(this, void 0, void 0, function () {
      return te(this, function (e) {
        return [2, t.isDirectory ? Vl(t) : jl(t)];
      });
    });
  }
  function Vl(t) {
    var e = t.createReader();
    return new Promise(function (t, n) {
      var i = [];
      !(function o() {
        var r = this;
        e.readEntries(
          function (e) {
            return Zt(r, void 0, void 0, function () {
              var r, s, a;
              return te(this, function (l) {
                switch (l.label) {
                  case 0:
                    if (e.length) return [3, 5];
                    l.label = 1;
                  case 1:
                    return l.trys.push([1, 3, , 4]), [4, Promise.all(i)];
                  case 2:
                    return (r = l.sent()), t(r), [3, 4];
                  case 3:
                    return (s = l.sent()), n(s), [3, 4];
                  case 4:
                    return [3, 6];
                  case 5:
                    (a = Promise.all(e.map(Bl))), i.push(a), o(), (l.label = 6);
                  case 6:
                    return [2];
                }
              });
            });
          },
          function (t) {
            n(t);
          }
        );
      })();
    });
  }
  function jl(t) {
    return Zt(this, void 0, void 0, function () {
      return te(this, function (e) {
        return [
          2,
          new Promise(function (e, n) {
            t.file(
              function (n) {
                var i = wl(n, t.fullPath);
                e(i);
              },
              function (t) {
                n(t);
              }
            );
          }),
        ];
      });
    });
  }
  const Kl = (t) => {
      t = Array.isArray(t) && 1 === t.length ? t[0] : t;
      return {
        code: "file-invalid-type",
        message: `File type must be ${
          Array.isArray(t) ? `one of ${t.join(", ")}` : t
        }`,
      };
    },
    Gl = (t) => ({
      code: "file-too-large",
      message: `File is larger than ${t} bytes`,
    }),
    Wl = (t) => ({
      code: "file-too-small",
      message: `File is smaller than ${t} bytes`,
    }),
    zl = { code: "too-many-files", message: "Too many files" };
  function ql(t, e) {
    const n =
      "application/x-moz-file" === t.type ||
      (function (t, e) {
        if (t && e) {
          const n = Array.isArray(e) ? e : e.split(","),
            i = t.name || "",
            o = (t.type || "").toLowerCase(),
            r = o.replace(/\/.*$/, "");
          return n.some((t) => {
            const e = t.trim().toLowerCase();
            return "." === e.charAt(0)
              ? i.toLowerCase().endsWith(e)
              : e.endsWith("/*")
              ? r === e.replace(/\/.*$/, "")
              : o === e;
          });
        }
        return !0;
      })(t, e);
    return [n, n ? null : Kl(e)];
  }
  function Yl(t) {
    return null != t;
  }
  function Xl(t) {
    return "function" == typeof t.isPropagationStopped
      ? t.isPropagationStopped()
      : void 0 !== t.cancelBubble && t.cancelBubble;
  }
  function Ql(t) {
    return t.dataTransfer
      ? Array.prototype.some.call(
          t.dataTransfer.types,
          (t) => "Files" === t || "application/x-moz-file" === t
        )
      : !!t.target && !!t.target.files;
  }
  function Jl(e) {
    let n, i, o, s, a, l, u;
    const h = e[32].default,
      m = c(h, e, e[31], null),
      g =
        m ||
        (function (e) {
          let n;
          return {
            c() {
              (n = N("p")),
                (n.textContent =
                  "Drag 'n' drop some files here, or click to select files");
            },
            m(t, e) {
              O(t, n, e);
            },
            p: t,
            d(t) {
              t && L(n);
            },
          };
        })();
    return {
      c() {
        (n = N("div")),
          (i = N("input")),
          (o = M()),
          g && g.c(),
          U(i, "accept", e[0]),
          (i.multiple = e[1]),
          U(i, "type", "file"),
          U(i, "name", e[5]),
          U(i, "autocomplete", "off"),
          U(i, "tabindex", "-1"),
          j(i, "display", "none"),
          U(n, "tabindex", "0"),
          U(
            n,
            "class",
            (s = (e[4] ? "" : "dropzone") + " " + e[2] + " svelte-817dg2")
          ),
          U(n, "style", e[3]);
      },
      m(t, r) {
        O(t, n, r),
          x(n, i),
          e[33](i),
          x(n, o),
          g && g.m(n, null),
          e[34](n),
          (a = !0),
          l ||
            ((u = [
              k(window, "focus", e[21]),
              k(window, "dragover", e[19]),
              k(window, "drop", e[20]),
              k(i, "change", e[15]),
              k(i, "click", Zl),
              k(n, "keydown", e[17](e[8])),
              k(n, "focus", e[17](e[9])),
              k(n, "blur", e[17](e[10])),
              k(n, "click", e[16](e[11])),
              k(n, "dragenter", e[18](e[12])),
              k(n, "dragover", e[18](e[13])),
              k(n, "dragleave", e[18](e[14])),
              k(n, "drop", e[18](e[15])),
            ]),
            (l = !0));
      },
      p(t, e) {
        (!a || 1 & e[0]) && U(i, "accept", t[0]),
          (!a || 2 & e[0]) && (i.multiple = t[1]),
          (!a || 32 & e[0]) && U(i, "name", t[5]),
          m &&
            m.p &&
            (!a || 1 & e[1]) &&
            p(m, h, t, t[31], a ? d(h, t[31], e, null) : f(t[31]), null),
          (!a ||
            (20 & e[0] &&
              s !==
                (s =
                  (t[4] ? "" : "dropzone") + " " + t[2] + " svelte-817dg2"))) &&
            U(n, "class", s),
          (!a || 8 & e[0]) && U(n, "style", t[3]);
      },
      i(t) {
        a || (Tt(g, t), (a = !0));
      },
      o(t) {
        Ot(g, t), (a = !1);
      },
      d(t) {
        t && L(n), e[33](null), g && g.d(t), e[34](null), (l = !1), r(u);
      },
    };
  }
  function Zl(t) {
    t.stopPropagation();
  }
  function tc(t, e, n) {
    let { $$slots: i = {}, $$scope: o } = e,
      { accept: r } = e,
      { disabled: s = !1 } = e,
      { getFilesFromEvent: a = Rl } = e,
      { maxSize: l = 1 / 0 } = e,
      { minSize: c = 0 } = e,
      { multiple: u = !0 } = e,
      { preventDropOnDocument: d = !0 } = e,
      { noClick: p = !1 } = e,
      { noKeyboard: f = !1 } = e,
      { noDrag: h = !1 } = e,
      { noDragEventsBubbling: m = !1 } = e,
      { containerClasses: g = "" } = e,
      { containerStyles: $ = "" } = e,
      { disableDefaultStyles: y = !1 } = e,
      { name: I = "" } = e;
    const v = it();
    let E,
      b,
      A = {
        isFocused: !1,
        isFileDialogActive: !1,
        isDragActive: !1,
        isDragAccept: !1,
        isDragReject: !1,
        draggedFiles: [],
        acceptedFiles: [],
        fileRejections: [],
      };
    function C() {
      b && (n(7, (b.value = null), b), (A.isFileDialogActive = !0), b.click());
    }
    function _(t) {
      return s ? null : t;
    }
    function x(t) {
      m && t.stopPropagation();
    }
    let S = [];
    return (
      nt(() => {
        n(7, (b = null));
      }),
      (t.$$set = (t) => {
        "accept" in t && n(0, (r = t.accept)),
          "disabled" in t && n(22, (s = t.disabled)),
          "getFilesFromEvent" in t && n(23, (a = t.getFilesFromEvent)),
          "maxSize" in t && n(24, (l = t.maxSize)),
          "minSize" in t && n(25, (c = t.minSize)),
          "multiple" in t && n(1, (u = t.multiple)),
          "preventDropOnDocument" in t && n(26, (d = t.preventDropOnDocument)),
          "noClick" in t && n(27, (p = t.noClick)),
          "noKeyboard" in t && n(28, (f = t.noKeyboard)),
          "noDrag" in t && n(29, (h = t.noDrag)),
          "noDragEventsBubbling" in t && n(30, (m = t.noDragEventsBubbling)),
          "containerClasses" in t && n(2, (g = t.containerClasses)),
          "containerStyles" in t && n(3, ($ = t.containerStyles)),
          "disableDefaultStyles" in t && n(4, (y = t.disableDefaultStyles)),
          "name" in t && n(5, (I = t.name)),
          "$$scope" in t && n(31, (o = t.$$scope));
      }),
      [
        r,
        u,
        g,
        $,
        y,
        I,
        E,
        b,
        function (t) {
          E &&
            E.isEqualNode(t.target) &&
            ((32 !== t.keyCode && 13 !== t.keyCode) ||
              (t.preventDefault(), C()));
        },
        function () {
          A.isFocused = !0;
        },
        function () {
          A.isFocused = !1;
        },
        function () {
          p ||
            (!(function (t = window.navigator.userAgent) {
              return (
                (function (t) {
                  return (
                    -1 !== t.indexOf("MSIE") || -1 !== t.indexOf("Trident/")
                  );
                })(t) ||
                (function (t) {
                  return -1 !== t.indexOf("Edge/");
                })(t)
              );
            })()
              ? C()
              : setTimeout(C, 0));
        },
        function (t) {
          t.preventDefault(),
            x(t),
            (S = [...S, t.target]),
            Ql(t) &&
              Promise.resolve(a(t)).then((e) => {
                (Xl(t) && !m) ||
                  ((A.draggedFiles = e),
                  (A.isDragActive = !0),
                  v("dragenter", { dragEvent: t }));
              });
        },
        function (t) {
          if ((t.preventDefault(), x(t), t.dataTransfer))
            try {
              t.dataTransfer.dropEffect = "copy";
            } catch {}
          return Ql(t) && v("dragover", { dragEvent: t }), !1;
        },
        function (t) {
          t.preventDefault(), x(t);
          const e = S.filter((t) => E && E.contains(t)),
            n = e.indexOf(t.target);
          -1 !== n && e.splice(n, 1),
            (S = e),
            e.length > 0 ||
              ((A.isDragActive = !1),
              (A.draggedFiles = []),
              Ql(t) && v("dragleave", { dragEvent: t }));
        },
        function (t) {
          t.preventDefault(),
            x(t),
            (S = []),
            Ql(t) &&
              (v("filedropped", { event: t }),
              Promise.resolve(a(t)).then((e) => {
                if (Xl(t) && !m) return;
                const n = [],
                  i = [];
                e.forEach((t) => {
                  const [e, o] = ql(t, r),
                    [s, a] = (function (t, e, n) {
                      if (Yl(t.size))
                        if (Yl(e) && Yl(n)) {
                          if (t.size > n) return [!1, Gl(n)];
                          if (t.size < e) return [!1, Wl(e)];
                        } else {
                          if (Yl(e) && t.size < e) return [!1, Wl(e)];
                          if (Yl(n) && t.size > n) return [!1, Gl(n)];
                        }
                      return [!0, null];
                    })(t, c, l);
                  if (e && s) n.push(t);
                  else {
                    const e = [o, a].filter((t) => t);
                    i.push({ file: t, errors: e });
                  }
                }),
                  !u &&
                    n.length > 1 &&
                    (n.forEach((t) => {
                      i.push({ file: t, errors: [zl] });
                    }),
                    n.splice(0)),
                  (A.acceptedFiles = n),
                  (A.fileRejections = i),
                  v("drop", { acceptedFiles: n, fileRejections: i, event: t }),
                  i.length > 0 &&
                    v("droprejected", { fileRejections: i, event: t }),
                  n.length > 0 &&
                    v("dropaccepted", { acceptedFiles: n, event: t });
              })),
            (A.isFileDialogActive = !1),
            (A.isDragActive = !1),
            (A.draggedFiles = []),
            (A.acceptedFiles = []),
            (A.fileRejections = []);
        },
        _,
        function (t) {
          return f ? null : _(t);
        },
        function (t) {
          return h ? null : _(t);
        },
        function (t) {
          d && t.preventDefault();
        },
        function (t) {
          d && ((E && E.contains(t.target)) || (t.preventDefault(), (S = [])));
        },
        function () {
          A.isFileDialogActive &&
            setTimeout(() => {
              if (b) {
                const { files: t } = b;
                t.length ||
                  ((A.isFileDialogActive = !1), v("filedialogcancel"));
              }
            }, 300);
        },
        s,
        a,
        l,
        c,
        d,
        p,
        f,
        h,
        m,
        o,
        i,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (b = t), n(7, b);
          });
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (E = t), n(6, E);
          });
        },
      ]
    );
  }
  class ec extends Vt {
    constructor(t) {
      super(),
        Bt(
          this,
          t,
          tc,
          Jl,
          a,
          {
            accept: 0,
            disabled: 22,
            getFilesFromEvent: 23,
            maxSize: 24,
            minSize: 25,
            multiple: 1,
            preventDropOnDocument: 26,
            noClick: 27,
            noKeyboard: 28,
            noDrag: 29,
            noDragEventsBubbling: 30,
            containerClasses: 2,
            containerStyles: 3,
            disableDefaultStyles: 4,
            name: 5,
          },
          null,
          [-1, -1]
        );
    }
  }
  function nc(t) {
    let e, i, o, a, l, u;
    const h = t[9].default,
      m = c(h, t, t[8], null);
    let g = [
        {
          class: (i = Oe({
            [t[1]]: !0,
            "mdc-card": !0,
            "mdc-card--outlined": "outlined" === t[2],
            "smui-card--padded": t[3],
          })),
        },
        t[6],
      ],
      $ = {};
    for (let t = 0; t < g.length; t += 1) $ = n($, g[t]);
    return {
      c() {
        (e = N("div")), m && m.c(), H(e, $);
      },
      m(n, i) {
        O(n, e, i),
          m && m.m(e, null),
          t[10](e),
          (a = !0),
          l ||
            ((u = [I((o = Fe.call(null, e, t[0]))), I(t[5].call(null, e))]),
            (l = !0));
      },
      p(t, [n]) {
        m &&
          m.p &&
          (!a || 256 & n) &&
          p(m, h, t, t[8], a ? d(h, t[8], n, null) : f(t[8]), null),
          H(
            e,
            ($ = Mt(g, [
              (!a ||
                (14 & n &&
                  i !==
                    (i = Oe({
                      [t[1]]: !0,
                      "mdc-card": !0,
                      "mdc-card--outlined": "outlined" === t[2],
                      "smui-card--padded": t[3],
                    })))) && { class: i },
              64 & n && t[6],
            ]))
          ),
          o && s(o.update) && 1 & n && o.update.call(null, t[0]);
      },
      i(t) {
        a || (Tt(m, t), (a = !0));
      },
      o(t) {
        Ot(m, t), (a = !1);
      },
      d(n) {
        n && L(e), m && m.d(n), t[10](null), (l = !1), r(u);
      },
    };
  }
  function ic(t, e, i) {
    const o = ["use", "class", "variant", "padded", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e;
    const l = De(tt());
    let c,
      { use: u = [] } = e,
      { class: d = "" } = e,
      { variant: p = "raised" } = e,
      { padded: f = !1 } = e;
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(6, (r = m(e, o))),
          "use" in t && i(0, (u = t.use)),
          "class" in t && i(1, (d = t.class)),
          "variant" in t && i(2, (p = t.variant)),
          "padded" in t && i(3, (f = t.padded)),
          "$$scope" in t && i(8, (a = t.$$scope));
      }),
      [
        u,
        d,
        p,
        f,
        c,
        l,
        r,
        function () {
          return c;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (c = t), i(4, c);
          });
        },
      ]
    );
  }
  class oc extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, ic, nc, a, {
          use: 0,
          class: 1,
          variant: 2,
          padded: 3,
          getElement: 7,
        });
    }
    get getElement() {
      return this.$$.ctx[7];
    }
  }
  var rc = Qe({ class: "smui-card__content", component: Cn });
  function sc(t) {
    let e, i, o, a, l, u;
    const h = t[8].default,
      m = c(h, t, t[7], null);
    let g = [
        {
          class: (i = Oe({
            [t[1]]: !0,
            "mdc-card__actions": !0,
            "mdc-card__actions--full-bleed": t[2],
          })),
        },
        t[5],
      ],
      $ = {};
    for (let t = 0; t < g.length; t += 1) $ = n($, g[t]);
    return {
      c() {
        (e = N("div")), m && m.c(), H(e, $);
      },
      m(n, i) {
        O(n, e, i),
          m && m.m(e, null),
          t[9](e),
          (a = !0),
          l ||
            ((u = [I((o = Fe.call(null, e, t[0]))), I(t[4].call(null, e))]),
            (l = !0));
      },
      p(t, [n]) {
        m &&
          m.p &&
          (!a || 128 & n) &&
          p(m, h, t, t[7], a ? d(h, t[7], n, null) : f(t[7]), null),
          H(
            e,
            ($ = Mt(g, [
              (!a ||
                (6 & n &&
                  i !==
                    (i = Oe({
                      [t[1]]: !0,
                      "mdc-card__actions": !0,
                      "mdc-card__actions--full-bleed": t[2],
                    })))) && { class: i },
              32 & n && t[5],
            ]))
          ),
          o && s(o.update) && 1 & n && o.update.call(null, t[0]);
      },
      i(t) {
        a || (Tt(m, t), (a = !0));
      },
      o(t) {
        Ot(m, t), (a = !1);
      },
      d(n) {
        n && L(e), m && m.d(n), t[9](null), (l = !1), r(u);
      },
    };
  }
  function ac(t, e, i) {
    const o = ["use", "class", "fullBleed", "getElement"];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e;
    const l = De(tt());
    let c,
      { use: u = [] } = e,
      { class: d = "" } = e,
      { fullBleed: p = !1 } = e;
    return (
      ot("SMUI:button:context", "card:action"),
      ot("SMUI:icon-button:context", "card:action"),
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(5, (r = m(e, o))),
          "use" in t && i(0, (u = t.use)),
          "class" in t && i(1, (d = t.class)),
          "fullBleed" in t && i(2, (p = t.fullBleed)),
          "$$scope" in t && i(7, (a = t.$$scope));
      }),
      [
        u,
        d,
        p,
        c,
        l,
        r,
        function () {
          return c;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (c = t), i(3, c);
          });
        },
      ]
    );
  }
  Qe({ class: "mdc-card__media-content", component: Cn });
  Qe({ class: "mdc-card__action-buttons", component: Cn }),
    Qe({ class: "mdc-card__action-icons", component: Cn });
  const lc = class extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, ac, sc, a, {
          use: 0,
          class: 1,
          fullBleed: 2,
          getElement: 6,
        });
    }
    get getElement() {
      return this.$$.ctx[6];
    }
  };
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var cc = {
      ANIM_CHECKED_INDETERMINATE: "mdc-checkbox--anim-checked-indeterminate",
      ANIM_CHECKED_UNCHECKED: "mdc-checkbox--anim-checked-unchecked",
      ANIM_INDETERMINATE_CHECKED: "mdc-checkbox--anim-indeterminate-checked",
      ANIM_INDETERMINATE_UNCHECKED:
        "mdc-checkbox--anim-indeterminate-unchecked",
      ANIM_UNCHECKED_CHECKED: "mdc-checkbox--anim-unchecked-checked",
      ANIM_UNCHECKED_INDETERMINATE:
        "mdc-checkbox--anim-unchecked-indeterminate",
      BACKGROUND: "mdc-checkbox__background",
      CHECKED: "mdc-checkbox--checked",
      CHECKMARK: "mdc-checkbox__checkmark",
      CHECKMARK_PATH: "mdc-checkbox__checkmark-path",
      DISABLED: "mdc-checkbox--disabled",
      INDETERMINATE: "mdc-checkbox--indeterminate",
      MIXEDMARK: "mdc-checkbox__mixedmark",
      NATIVE_CONTROL: "mdc-checkbox__native-control",
      ROOT: "mdc-checkbox",
      SELECTED: "mdc-checkbox--selected",
      UPGRADED: "mdc-checkbox--upgraded",
    },
    uc = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_CHECKED_INDETERMINATE_VALUE: "mixed",
      DATA_INDETERMINATE_ATTR: "data-indeterminate",
      NATIVE_CONTROL_SELECTOR: ".mdc-checkbox__native-control",
      TRANSITION_STATE_CHECKED: "checked",
      TRANSITION_STATE_INDETERMINATE: "indeterminate",
      TRANSITION_STATE_INIT: "init",
      TRANSITION_STATE_UNCHECKED: "unchecked",
    },
    dc = { ANIM_END_LATCH_MS: 250 },
    pc = (function (t) {
      function e(n) {
        var i = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
        return (
          (i.currentCheckState = uc.TRANSITION_STATE_INIT),
          (i.currentAnimationClass = ""),
          (i.animEndLatchTimer = 0),
          (i.enableAnimationEndHandler = !1),
          i
        );
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return cc;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "strings", {
          get: function () {
            return uc;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "numbers", {
          get: function () {
            return dc;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              forceLayout: function () {},
              hasNativeControl: function () {
                return !1;
              },
              isAttachedToDOM: function () {
                return !1;
              },
              isChecked: function () {
                return !1;
              },
              isIndeterminate: function () {
                return !1;
              },
              removeClass: function () {},
              removeNativeControlAttr: function () {},
              setNativeControlAttr: function () {},
              setNativeControlDisabled: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.init = function () {
          (this.currentCheckState = this.determineCheckState()),
            this.updateAriaChecked(),
            this.adapter.addClass(cc.UPGRADED);
        }),
        (e.prototype.destroy = function () {
          clearTimeout(this.animEndLatchTimer);
        }),
        (e.prototype.setDisabled = function (t) {
          this.adapter.setNativeControlDisabled(t),
            t
              ? this.adapter.addClass(cc.DISABLED)
              : this.adapter.removeClass(cc.DISABLED);
        }),
        (e.prototype.handleAnimationEnd = function () {
          var t = this;
          this.enableAnimationEndHandler &&
            (clearTimeout(this.animEndLatchTimer),
            (this.animEndLatchTimer = setTimeout(function () {
              t.adapter.removeClass(t.currentAnimationClass),
                (t.enableAnimationEndHandler = !1);
            }, dc.ANIM_END_LATCH_MS)));
        }),
        (e.prototype.handleChange = function () {
          this.transitionCheckState();
        }),
        (e.prototype.transitionCheckState = function () {
          if (this.adapter.hasNativeControl()) {
            var t = this.currentCheckState,
              e = this.determineCheckState();
            if (t !== e) {
              this.updateAriaChecked();
              var n = cc.SELECTED;
              e === uc.TRANSITION_STATE_UNCHECKED
                ? this.adapter.removeClass(n)
                : this.adapter.addClass(n),
                this.currentAnimationClass.length > 0 &&
                  (clearTimeout(this.animEndLatchTimer),
                  this.adapter.forceLayout(),
                  this.adapter.removeClass(this.currentAnimationClass)),
                (this.currentAnimationClass = this.getTransitionAnimationClass(
                  t,
                  e
                )),
                (this.currentCheckState = e),
                this.adapter.isAttachedToDOM() &&
                  this.currentAnimationClass.length > 0 &&
                  (this.adapter.addClass(this.currentAnimationClass),
                  (this.enableAnimationEndHandler = !0));
            }
          }
        }),
        (e.prototype.determineCheckState = function () {
          var t = uc.TRANSITION_STATE_INDETERMINATE,
            e = uc.TRANSITION_STATE_CHECKED,
            n = uc.TRANSITION_STATE_UNCHECKED;
          return this.adapter.isIndeterminate()
            ? t
            : this.adapter.isChecked()
            ? e
            : n;
        }),
        (e.prototype.getTransitionAnimationClass = function (t, n) {
          var i = uc.TRANSITION_STATE_INIT,
            o = uc.TRANSITION_STATE_CHECKED,
            r = uc.TRANSITION_STATE_UNCHECKED,
            s = e.cssClasses,
            a = s.ANIM_UNCHECKED_CHECKED,
            l = s.ANIM_UNCHECKED_INDETERMINATE,
            c = s.ANIM_CHECKED_UNCHECKED,
            u = s.ANIM_CHECKED_INDETERMINATE,
            d = s.ANIM_INDETERMINATE_CHECKED,
            p = s.ANIM_INDETERMINATE_UNCHECKED;
          switch (t) {
            case i:
              return n === r ? "" : n === o ? d : p;
            case r:
              return n === o ? a : l;
            case o:
              return n === r ? c : u;
            default:
              return n === o ? d : p;
          }
        }),
        (e.prototype.updateAriaChecked = function () {
          this.adapter.isIndeterminate()
            ? this.adapter.setNativeControlAttr(
                uc.ARIA_CHECKED_ATTR,
                uc.ARIA_CHECKED_INDETERMINATE_VALUE
              )
            : this.adapter.removeNativeControlAttr(uc.ARIA_CHECKED_ATTR);
        }),
        e
      );
    })(oe);
  function fc(e) {
    let i,
      o,
      a,
      l,
      c,
      u,
      d,
      p,
      f,
      h,
      m,
      g,
      $,
      y,
      v,
      E,
      b = [
        { class: (a = Oe({ [e[9]]: !0, "mdc-checkbox__native-control": !0 })) },
        { type: "checkbox" },
        e[20],
        { disabled: e[1] },
        { __value: (l = e[19](e[7]) ? e[6] : e[7]) },
        { "data-indeterminate": (c = !e[19](e[0]) && e[0] ? "true" : void 0) },
        e[16],
        Me(e[26], "input$"),
      ],
      A = {};
    for (let t = 0; t < b.length; t += 1) A = n(A, b[t]);
    let C = [
        {
          class: (m = Oe({
            [e[3]]: !0,
            "mdc-checkbox": !0,
            "mdc-checkbox--disabled": e[1],
            "mdc-checkbox--touch": e[5],
            "mdc-data-table__header-row-checkbox":
              "data-table" === e[21] && e[22],
            "mdc-data-table__row-checkbox": "data-table" === e[21] && !e[22],
            ...e[14],
          })),
        },
        { style: (g = Object.entries(e[15]).map(hc).concat([e[4]]).join(" ")) },
        we(e[26], ["input$"]),
      ],
      _ = {};
    for (let t = 0; t < C.length; t += 1) _ = n(_, C[t]);
    return {
      c() {
        (i = N("div")),
          (o = N("input")),
          (d = M()),
          (p = N("div")),
          (p.innerHTML =
            '<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"><path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg> \n    <div class="mdc-checkbox__mixedmark"></div>'),
          (f = M()),
          (h = N("div")),
          H(o, A),
          U(p, "class", "mdc-checkbox__background"),
          U(h, "class", "mdc-checkbox__ripple"),
          H(i, _);
      },
      m(t, n) {
        O(t, i, n),
          x(i, o),
          o.autofocus && o.focus(),
          e[36](o),
          (o.checked = e[12]),
          x(i, d),
          x(i, p),
          x(i, f),
          x(i, h),
          e[38](i),
          v ||
            ((E = [
              I((u = Fe.call(null, o, e[8]))),
              k(o, "change", e[37]),
              k(o, "blur", e[34]),
              k(o, "focus", e[35]),
              I(($ = Fe.call(null, i, e[2]))),
              I(e[18].call(null, i)),
              I(
                (y = Wi.call(null, i, {
                  unbounded: !0,
                  addClass: e[23],
                  removeClass: e[24],
                  addStyle: e[25],
                  active: e[17],
                  eventTarget: e[11],
                }))
              ),
              k(i, "animationend", e[39]),
            ]),
            (v = !0));
      },
      p(t, e) {
        H(
          o,
          (A = Mt(b, [
            512 & e[0] &&
              a !==
                (a = Oe({
                  [t[9]]: !0,
                  "mdc-checkbox__native-control": !0,
                })) && { class: a },
            { type: "checkbox" },
            t[20],
            2 & e[0] && { disabled: t[1] },
            192 & e[0] &&
              l !== (l = t[19](t[7]) ? t[6] : t[7]) && { __value: l },
            1 & e[0] &&
              c !== (c = !t[19](t[0]) && t[0] ? "true" : void 0) && {
                "data-indeterminate": c,
              },
            65536 & e[0] && t[16],
            67108864 & e[0] && Me(t[26], "input$"),
          ]))
        ),
          u && s(u.update) && 256 & e[0] && u.update.call(null, t[8]),
          4096 & e[0] && (o.checked = t[12]),
          H(
            i,
            (_ = Mt(C, [
              16426 & e[0] &&
                m !==
                  (m = Oe({
                    [t[3]]: !0,
                    "mdc-checkbox": !0,
                    "mdc-checkbox--disabled": t[1],
                    "mdc-checkbox--touch": t[5],
                    "mdc-data-table__header-row-checkbox":
                      "data-table" === t[21] && t[22],
                    "mdc-data-table__row-checkbox":
                      "data-table" === t[21] && !t[22],
                    ...t[14],
                  })) && { class: m },
              32784 & e[0] &&
                g !==
                  (g = Object.entries(t[15])
                    .map(hc)
                    .concat([t[4]])
                    .join(" ")) && { style: g },
              67108864 & e[0] && we(t[26], ["input$"]),
            ]))
          ),
          $ && s($.update) && 4 & e[0] && $.update.call(null, t[2]),
          y &&
            s(y.update) &&
            133120 & e[0] &&
            y.update.call(null, {
              unbounded: !0,
              addClass: t[23],
              removeClass: t[24],
              addStyle: t[25],
              active: t[17],
              eventTarget: t[11],
            });
      },
      i: t,
      o: t,
      d(t) {
        t && L(i), e[36](null), e[38](null), (v = !1), r(E);
      },
    };
  }
  const hc = ([t, e]) => `${t}: ${e};`;
  function mc(t, e, i) {
    const o = [
      "use",
      "class",
      "style",
      "disabled",
      "touch",
      "indeterminate",
      "group",
      "checked",
      "value",
      "valueKey",
      "input$use",
      "input$class",
      "getId",
      "getElement",
    ];
    let r = m(e, o);
    var s;
    const a = De(tt());
    let l = () => {};
    function c(t) {
      return t === l;
    }
    let u,
      d,
      p,
      { use: f = [] } = e,
      { class: g = "" } = e,
      { style: $ = "" } = e,
      { disabled: y = !1 } = e,
      { touch: I = !1 } = e,
      { indeterminate: v = l } = e,
      { group: E = l } = e,
      { checked: b = l } = e,
      { value: A = null } = e,
      { valueKey: C = l } = e,
      { input$use: _ = [] } = e,
      { input$class: x = "" } = e,
      S = {},
      T = {},
      O = {},
      L = !1,
      w =
        null !== (s = rt("SMUI:generic:input:props")) && void 0 !== s ? s : {},
      N = c(E) ? !c(b) && (null != b ? b : void 0) : -1 !== E.indexOf(A),
      R = rt("SMUI:checkbox:context"),
      D = rt("SMUI:data-table:row:header"),
      M = b,
      F = c(E) ? [] : [...E],
      k = N;
    function P(t) {
      S[t] || i(14, (S[t] = !0), S);
    }
    function U(t) {
      (t in S && !S[t]) || i(14, (S[t] = !1), S);
    }
    function H(t, e) {
      O[t] !== e && i(16, (O[t] = e), O);
    }
    function B(t) {
      (t in O && null == O[t]) || i(16, (O[t] = void 0), O);
    }
    function V() {
      return u;
    }
    et(() => {
      i(11, (p.indeterminate = !c(v) && v), p),
        i(
          10,
          (d = new pc({
            addClass: P,
            forceLayout: () => u.offsetWidth,
            hasNativeControl: () => !0,
            isAttachedToDOM: () => Boolean(u.parentNode),
            isChecked: () => null != N && N,
            isIndeterminate: () => !c(v) && v,
            removeClass: U,
            removeNativeControlAttr: B,
            setNativeControlAttr: H,
            setNativeControlDisabled: (t) => i(1, (y = t)),
          }))
        );
      const t = {
        _smui_checkbox_accessor: !0,
        get element() {
          return V();
        },
        get checked() {
          return null != N && N;
        },
        set checked(t) {
          N !== t && i(12, (N = t));
        },
        get indeterminate() {
          return !c(v) && v;
        },
        set indeterminate(t) {
          i(0, (v = t));
        },
        activateRipple() {
          y || i(17, (L = !0));
        },
        deactivateRipple() {
          i(17, (L = !1));
        },
      };
      return (
        Le(u, "SMUIGenericInput:mount", t),
        Le(u, "SMUICheckbox:mount", t),
        d.init(),
        () => {
          Le(u, "SMUIGenericInput:unmount", t),
            Le(u, "SMUICheckbox:unmount", t),
            d.destroy();
        }
      );
    });
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(26, (r = m(e, o))),
          "use" in t && i(2, (f = t.use)),
          "class" in t && i(3, (g = t.class)),
          "style" in t && i(4, ($ = t.style)),
          "disabled" in t && i(1, (y = t.disabled)),
          "touch" in t && i(5, (I = t.touch)),
          "indeterminate" in t && i(0, (v = t.indeterminate)),
          "group" in t && i(27, (E = t.group)),
          "checked" in t && i(28, (b = t.checked)),
          "value" in t && i(6, (A = t.value)),
          "valueKey" in t && i(7, (C = t.valueKey)),
          "input$use" in t && i(8, (_ = t.input$use)),
          "input$class" in t && i(9, (x = t.input$class));
      }),
      (t.$$.update = () => {
        if ((402660417 & t.$$.dirty[0]) | (7 & t.$$.dirty[1])) {
          let t = !1;
          if (!c(E))
            if (k !== N) {
              const e = E.indexOf(A);
              N && -1 === e
                ? (E.push(A),
                  i(27, E),
                  i(33, k),
                  i(12, N),
                  i(6, A),
                  i(32, F),
                  i(28, b),
                  i(31, M),
                  i(0, v),
                  i(11, p),
                  i(10, d))
                : N ||
                  -1 === e ||
                  (E.splice(e, 1),
                  i(27, E),
                  i(33, k),
                  i(12, N),
                  i(6, A),
                  i(32, F),
                  i(28, b),
                  i(31, M),
                  i(0, v),
                  i(11, p),
                  i(10, d)),
                (t = !0);
            } else {
              const e = F.indexOf(A),
                n = E.indexOf(A);
              e > -1 && -1 === n
                ? (i(12, (N = !1)), (t = !0))
                : n > -1 && -1 === e && (i(12, (N = !0)), (t = !0));
            }
          c(b)
            ? !!k != !!N && (t = !0)
            : b !== (null != N ? N : null) &&
              (b === M
                ? (i(28, (b = null != N ? N : null)), c(v) || i(0, (v = !1)))
                : i(12, (N = null != b ? b : void 0)),
              (t = !0)),
            p &&
              (c(v)
                ? p.indeterminate &&
                  (i(11, (p.indeterminate = !1), p), (t = !0))
                : !v && p.indeterminate
                ? (i(11, (p.indeterminate = !1), p), (t = !0))
                : v &&
                  !p.indeterminate &&
                  (i(11, (p.indeterminate = !0), p), (t = !0))),
            i(31, (M = b)),
            i(32, (F = c(E) ? [] : [...E])),
            i(33, (k = N)),
            t && d && d.handleChange();
        }
      }),
      [
        v,
        y,
        f,
        g,
        $,
        I,
        A,
        C,
        _,
        x,
        d,
        p,
        N,
        u,
        S,
        T,
        O,
        L,
        a,
        c,
        w,
        R,
        D,
        P,
        U,
        function (t, e) {
          T[t] != e &&
            ("" === e || null == e
              ? (delete T[t], i(15, T))
              : i(15, (T[t] = e), T));
        },
        r,
        E,
        b,
        function () {
          return w && w.id;
        },
        V,
        M,
        F,
        k,
        function (e) {
          st.call(this, t, e);
        },
        function (e) {
          st.call(this, t, e);
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (p = t),
              i(11, p),
              i(27, E),
              i(33, k),
              i(12, N),
              i(6, A),
              i(32, F),
              i(28, b),
              i(31, M),
              i(0, v),
              i(10, d);
          });
        },
        function () {
          (N = this.checked),
            i(12, N),
            i(27, E),
            i(33, k),
            i(6, A),
            i(32, F),
            i(28, b),
            i(31, M),
            i(0, v),
            i(11, p),
            i(10, d);
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(13, u);
          });
        },
        () => d && d.handleAnimationEnd(),
      ]
    );
  }
  class gc extends Vt {
    constructor(t) {
      super(),
        Bt(
          this,
          t,
          mc,
          fc,
          a,
          {
            use: 2,
            class: 3,
            style: 4,
            disabled: 1,
            touch: 5,
            indeterminate: 0,
            group: 27,
            checked: 28,
            value: 6,
            valueKey: 7,
            input$use: 8,
            input$class: 9,
            getId: 29,
            getElement: 30,
          },
          null,
          [-1, -1]
        );
    }
    get getId() {
      return this.$$.ctx[29];
    }
    get getElement() {
      return this.$$.ctx[30];
    }
  }
  function $c(t, e, n) {
    const i = t.slice();
    return (i[22] = e[n]), i;
  }
  function yc(t) {
    let e;
    return {
      c() {
        e = D("more_vert");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function Ic(t) {
    let e;
    return {
      c() {
        e = D("Show more...");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function vc(t) {
    let e, n;
    return (
      (e = new hs({
        props: { $$slots: { default: [Ic] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          33554432 & n && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function Ec(t) {
    let e;
    return {
      c() {
        e = D("Show all...");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function bc(t) {
    let e, n;
    return (
      (e = new hs({
        props: { $$slots: { default: [Ec] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          33554432 & n && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function Ac(t) {
    let e, n, i, o;
    return (
      (e = new vs({
        props: { $$slots: { default: [vc] }, $$scope: { ctx: t } },
      })),
      e.$on("SMUI:action", t[13]),
      (i = new vs({
        props: { $$slots: { default: [bc] }, $$scope: { ctx: t } },
      })),
      i.$on("SMUI:action", t[14]),
      {
        c() {
          Pt(e.$$.fragment), (n = M()), Pt(i.$$.fragment);
        },
        m(t, r) {
          Ut(e, t, r), O(t, n, r), Ut(i, t, r), (o = !0);
        },
        p(t, n) {
          const o = {};
          33554432 & n && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
          const r = {};
          33554432 & n && (r.$$scope = { dirty: n, ctx: t }), i.$set(r);
        },
        i(t) {
          o || (Tt(e.$$.fragment, t), Tt(i.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), Ot(i.$$.fragment, t), (o = !1);
        },
        d(t) {
          Ht(e, t), t && L(n), Ht(i, t);
        },
      }
    );
  }
  function Cc(t) {
    let e, n;
    return (
      (e = new as({
        props: { $$slots: { default: [Ac] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          33554437 & n && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function _c(t) {
    let e,
      n = t[22].displayName + "";
    return {
      c() {
        e = D(n);
      },
      m(t, n) {
        O(t, e, n);
      },
      p(t, i) {
        16 & i && n !== (n = t[22].displayName + "") && B(e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function xc(t) {
    let e,
      n = t[22].time ? "Uploaded on " + Hc(t[22].time) : "";
    return {
      c() {
        e = D(n);
      },
      m(t, n) {
        O(t, e, n);
      },
      p(t, i) {
        16 & i &&
          n !== (n = t[22].time ? "Uploaded on " + Hc(t[22].time) : "") &&
          B(e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function Sc(t) {
    let e, n, i, o;
    return (
      (e = new ms({
        props: { $$slots: { default: [_c] }, $$scope: { ctx: t } },
      })),
      (i = new gs({
        props: { $$slots: { default: [xc] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment), (n = M()), Pt(i.$$.fragment);
        },
        m(t, r) {
          Ut(e, t, r), O(t, n, r), Ut(i, t, r), (o = !0);
        },
        p(t, n) {
          const o = {};
          33554448 & n && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
          const r = {};
          33554448 & n && (r.$$scope = { dirty: n, ctx: t }), i.$set(r);
        },
        i(t) {
          o || (Tt(e.$$.fragment, t), Tt(i.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), Ot(i.$$.fragment, t), (o = !1);
        },
        d(t) {
          Ht(e, t), t && L(n), Ht(i, t);
        },
      }
    );
  }
  function Tc(t) {
    let e, n, i;
    function o(e) {
      t[16](e);
    }
    let r = { value: t[22].id };
    return (
      void 0 !== t[5] && (r.group = t[5]),
      (e = new gc({ props: r })),
      lt.push(() => kt(e, "group", o)),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, i) {
          const o = {};
          16 & i && (o.value = t[22].id),
            !n && 32 & i && ((n = !0), (o.group = t[5]), gt(() => (n = !1))),
            e.$set(o);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function Oc(t) {
    let e, n, i, o, r;
    return (
      (e = new hs({
        props: { $$slots: { default: [Sc] }, $$scope: { ctx: t } },
      })),
      (i = new Is({
        props: { $$slots: { default: [Tc] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment), (n = M()), Pt(i.$$.fragment), (o = M());
        },
        m(t, s) {
          Ut(e, t, s), O(t, n, s), Ut(i, t, s), O(t, o, s), (r = !0);
        },
        p(t, n) {
          const o = {};
          33554448 & n && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
          const r = {};
          33554480 & n && (r.$$scope = { dirty: n, ctx: t }), i.$set(r);
        },
        i(t) {
          r || (Tt(e.$$.fragment, t), Tt(i.$$.fragment, t), (r = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), Ot(i.$$.fragment, t), (r = !1);
        },
        d(t) {
          Ht(e, t), t && L(n), Ht(i, t), t && L(o);
        },
      }
    );
  }
  function Lc(t, e) {
    let n, i, o;
    return (
      (i = new vs({
        props: { $$slots: { default: [Oc] }, $$scope: { ctx: e } },
      })),
      {
        key: t,
        first: null,
        c() {
          (n = F()), Pt(i.$$.fragment), (this.first = n);
        },
        m(t, e) {
          O(t, n, e), Ut(i, t, e), (o = !0);
        },
        p(t, n) {
          e = t;
          const o = {};
          33554480 & n && (o.$$scope = { dirty: n, ctx: e }), i.$set(o);
        },
        i(t) {
          o || (Tt(i.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(i.$$.fragment, t), (o = !1);
        },
        d(t) {
          t && L(n), Ht(i, t);
        },
      }
    );
  }
  function wc(t) {
    let e,
      n,
      i = [],
      o = new Map(),
      r = t[4];
    const s = (t) => t[22].id;
    for (let e = 0; e < r.length; e += 1) {
      let n = $c(t, r, e),
        a = s(n);
      o.set(a, (i[e] = Lc(a, n)));
    }
    return {
      c() {
        for (let t = 0; t < i.length; t += 1) i[t].c();
        e = F();
      },
      m(t, o) {
        for (let e = 0; e < i.length; e += 1) i[e].m(t, o);
        O(t, e, o), (n = !0);
      },
      p(t, n) {
        48 & n &&
          ((r = t[4]),
          xt(),
          (i = Dt(i, n, s, 1, t, r, o, e.parentNode, Nt, Lc, e, $c)),
          St());
      },
      i(t) {
        if (!n) {
          for (let t = 0; t < r.length; t += 1) Tt(i[t]);
          n = !0;
        }
      },
      o(t) {
        for (let t = 0; t < i.length; t += 1) Ot(i[t]);
        n = !1;
      },
      d(t) {
        for (let e = 0; e < i.length; e += 1) i[e].d(t);
        t && L(e);
      },
    };
  }
  function Nc(t) {
    let e,
      n,
      i,
      o,
      r,
      s,
      a,
      l,
      c,
      u,
      d,
      p,
      f,
      h,
      m,
      g,
      $,
      y,
      I,
      v = qt(t[1]) + "",
      E = t[0].displayName + "",
      b = Math.min(1, t[2]) + "",
      A = t[0].children.length + "";
    return (
      (h = new _r({
        props: {
          class: "material-icons",
          style: "vertical-align: middle; margin: 0; padding: 0;",
          title: "Options",
          $$slots: { default: [yc] },
          $$scope: { ctx: t },
        },
      })),
      h.$on("click", t[12]),
      (g = new va({
        props: {
          anchorCorner: "BOTTOM_RIGHT",
          $$slots: { default: [Cc] },
          $$scope: { ctx: t },
        },
      })),
      t[15](g),
      (y = new as({
        props: {
          checkList: !0,
          $$slots: { default: [wc] },
          $$scope: { ctx: t },
        },
      })),
      {
        c() {
          (e = N("h2")),
            (n = D(v)),
            (i = D("s in ")),
            (o = D(E)),
            (r = M()),
            (s = N("h4")),
            (a = D("Showing ")),
            (l = D(b)),
            (c = D("-")),
            (u = D(t[2])),
            (d = D(" of ")),
            (p = D(A)),
            (f = M()),
            Pt(h.$$.fragment),
            (m = M()),
            Pt(g.$$.fragment),
            ($ = M()),
            Pt(y.$$.fragment),
            U(e, "class", "mdc-typography--headline6"),
            j(e, "margin", "0"),
            U(s, "class", "mdc-typography--subtitle3"),
            j(s, "margin", "0"),
            j(s, "color", "#888"),
            j(s, "text-align", "right");
        },
        m(t, v) {
          O(t, e, v),
            x(e, n),
            x(e, i),
            x(e, o),
            O(t, r, v),
            O(t, s, v),
            x(s, a),
            x(s, l),
            x(s, c),
            x(s, u),
            x(s, d),
            x(s, p),
            x(s, f),
            Ut(h, s, null),
            x(s, m),
            Ut(g, s, null),
            O(t, $, v),
            Ut(y, t, v),
            (I = !0);
        },
        p(t, e) {
          (!I || 2 & e) && v !== (v = qt(t[1]) + "") && B(n, v),
            (!I || 1 & e) && E !== (E = t[0].displayName + "") && B(o, E),
            (!I || 4 & e) && b !== (b = Math.min(1, t[2]) + "") && B(l, b),
            (!I || 4 & e) && B(u, t[2]),
            (!I || 1 & e) && A !== (A = t[0].children.length + "") && B(p, A);
          const i = {};
          33554432 & e && (i.$$scope = { dirty: e, ctx: t }), h.$set(i);
          const r = {};
          33554437 & e && (r.$$scope = { dirty: e, ctx: t }), g.$set(r);
          const s = {};
          33554480 & e && (s.$$scope = { dirty: e, ctx: t }), y.$set(s);
        },
        i(t) {
          I ||
            (Tt(h.$$.fragment, t),
            Tt(g.$$.fragment, t),
            Tt(y.$$.fragment, t),
            (I = !0));
        },
        o(t) {
          Ot(h.$$.fragment, t),
            Ot(g.$$.fragment, t),
            Ot(y.$$.fragment, t),
            (I = !1);
        },
        d(n) {
          n && L(e),
            n && L(r),
            n && L(s),
            Ht(h),
            t[15](null),
            Ht(g),
            n && L($),
            Ht(y, n);
        },
      }
    );
  }
  function Rc(t) {
    let e;
    return {
      c() {
        e = D("Upload");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function Dc(t) {
    let e, n;
    return (
      (e = new ji({
        props: { $$slots: { default: [Rc] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          33554432 & n && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function Mc(t) {
    let e;
    return {
      c() {
        e = D("Download");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function Fc(t) {
    let e, n;
    return (
      (e = new ji({
        props: { $$slots: { default: [Mc] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          33554432 & n && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function kc(t) {
    let e, n, i, o;
    return (
      (e = new _l({
        props: { $$slots: { default: [Dc] }, $$scope: { ctx: t } },
      })),
      e.$on("click", t[10]),
      (i = new _l({
        props: {
          disabled: 0 == t[5].length,
          $$slots: { default: [Fc] },
          $$scope: { ctx: t },
        },
      })),
      i.$on("click", t[9]),
      {
        c() {
          Pt(e.$$.fragment), (n = M()), Pt(i.$$.fragment);
        },
        m(t, r) {
          Ut(e, t, r), O(t, n, r), Ut(i, t, r), (o = !0);
        },
        p(t, n) {
          const o = {};
          33554432 & n && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
          const r = {};
          32 & n && (r.disabled = 0 == t[5].length),
            33554432 & n && (r.$$scope = { dirty: n, ctx: t }),
            i.$set(r);
        },
        i(t) {
          o || (Tt(e.$$.fragment, t), Tt(i.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), Ot(i.$$.fragment, t), (o = !1);
        },
        d(t) {
          Ht(e, t), t && L(n), Ht(i, t);
        },
      }
    );
  }
  function Pc(t) {
    let e, n, i, o;
    return (
      (e = new rc({
        props: { $$slots: { default: [Nc] }, $$scope: { ctx: t } },
      })),
      (i = new lc({
        props: { $$slots: { default: [kc] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment), (n = M()), Pt(i.$$.fragment);
        },
        m(t, r) {
          Ut(e, t, r), O(t, n, r), Ut(i, t, r), (o = !0);
        },
        p(t, n) {
          const o = {};
          33554551 & n && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
          const r = {};
          33554464 & n && (r.$$scope = { dirty: n, ctx: t }), i.$set(r);
        },
        i(t) {
          o || (Tt(e.$$.fragment, t), Tt(i.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), Ot(i.$$.fragment, t), (o = !1);
        },
        d(t) {
          Ht(e, t), t && L(n), Ht(i, t);
        },
      }
    );
  }
  function Uc(t) {
    let e,
      n,
      i,
      o,
      r,
      s,
      a = !1,
      l = () => {
        a = !1;
      };
    return (
      mt(t[11]),
      (i = new oc({
        props: { $$slots: { default: [Pc] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          (n = N("div")),
            Pt(i.$$.fragment),
            U(n, "class", "card-container svelte-11g709w"),
            K(n, "sticky", t[7] > t[8]);
        },
        m(c, u) {
          O(c, n, u),
            Ut(i, n, null),
            t[17](n),
            (o = !0),
            r ||
              ((s = k(window, "scroll", () => {
                (a = !0), clearTimeout(e), (e = setTimeout(l, 100)), t[11]();
              })),
              (r = !0));
        },
        p(t, [o]) {
          128 & o &&
            !a &&
            ((a = !0),
            clearTimeout(e),
            scrollTo(window.pageXOffset, t[7]),
            (e = setTimeout(l, 100)));
          const r = {};
          33554551 & o && (r.$$scope = { dirty: o, ctx: t }),
            i.$set(r),
            384 & o && K(n, "sticky", t[7] > t[8]);
        },
        i(t) {
          o || (Tt(i.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(i.$$.fragment, t), (o = !1);
        },
        d(e) {
          e && L(n), Ht(i), t[17](null), (r = !1), s();
        },
      }
    );
  }
  function Hc(t) {
    return new Date(t).toLocaleDateString("en-us", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }
  function Bc(t, e, n) {
    let i,
      { artifactSet: o } = e,
      { contentType: r = "artifact" } = e,
      s = 10,
      a = [],
      l = [];
    const c = it();
    let u,
      d,
      p = null;
    function f() {
      o &&
        p !== o.hash &&
        (n(5, (l = [])),
        (p = o.hash),
        n(2, (s = Math.min(o.children.length, 10))),
        h(s));
    }
    function h(t) {
      if (o) {
        const e = o.children.length - t;
        n(4, (a = o.children.slice(e, e + t)));
      }
    }
    f();
    let m = 0;
    return (
      (t.$$set = (t) => {
        "artifactSet" in t && n(0, (o = t.artifactSet)),
          "contentType" in t && n(1, (r = t.contentType));
      }),
      (t.$$.update = () => {
        if (
          (1 & t.$$.dirty && f(), 4 & t.$$.dirty && h(s), 8 & t.$$.dirty && d)
        ) {
          const t = d.offsetParent.getBoundingClientRect();
          n(8, (m = t.top + d.offsetTop));
        }
      }),
      [
        o,
        r,
        s,
        d,
        a,
        l,
        i,
        u,
        m,
        async function () {
          c("download", { artifactSet: o, artifactIds: [...l] });
        },
        async function () {
          c("upload", { artifactSet: o });
        },
        function () {
          n(7, (u = window.pageYOffset));
        },
        () => i.setOpen(!0),
        () => n(2, (s = Math.min(o.children.length, s + 10))),
        () => n(2, (s = o.children.length)),
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (i = t), n(6, i);
          });
        },
        function (t) {
          (l = t), n(5, l);
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (d = t), n(3, d);
          });
        },
      ]
    );
  }
  class Vc extends Vt {
    constructor(t) {
      super(), Bt(this, t, Bc, Uc, a, { artifactSet: 0, contentType: 1 });
    }
  }
  /**
   * @license
   * Copyright 2017 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var jc = { ROOT: "mdc-form-field" },
    Kc = { LABEL_SELECTOR: ".mdc-form-field > label" },
    Gc = (function (t) {
      function e(n) {
        var i = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
        return (
          (i.click = function () {
            i.handleClick();
          }),
          i
        );
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return jc;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "strings", {
          get: function () {
            return Kc;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              activateInputRipple: function () {},
              deactivateInputRipple: function () {},
              deregisterInteractionHandler: function () {},
              registerInteractionHandler: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.init = function () {
          this.adapter.registerInteractionHandler("click", this.click);
        }),
        (e.prototype.destroy = function () {
          this.adapter.deregisterInteractionHandler("click", this.click);
        }),
        (e.prototype.handleClick = function () {
          var t = this;
          this.adapter.activateInputRipple(),
            requestAnimationFrame(function () {
              t.adapter.deactivateInputRipple();
            });
        }),
        e
      );
    })(oe);
  const Wc = (t) => ({}),
    zc = (t) => ({});
  function qc(t) {
    let e, i, o, a, l, u, h, m, g;
    const $ = t[13].default,
      y = c($, t, t[12], null),
      v = t[13].label,
      E = c(v, t, t[12], zc);
    let b = [{ for: t[4] }, Me(t[10], "label$")],
      A = {};
    for (let t = 0; t < b.length; t += 1) A = n(A, b[t]);
    let C = [
        {
          class: (l = Oe({
            [t[1]]: !0,
            "mdc-form-field": !0,
            "mdc-form-field--align-end": "end" === t[2],
            "mdc-form-field--nowrap": t[3],
          })),
        },
        we(t[10], ["label$"]),
      ],
      _ = {};
    for (let t = 0; t < C.length; t += 1) _ = n(_, C[t]);
    return {
      c() {
        (e = N("div")),
          y && y.c(),
          (i = M()),
          (o = N("label")),
          E && E.c(),
          H(o, A),
          H(e, _);
      },
      m(n, r) {
        O(n, e, r),
          y && y.m(e, null),
          x(e, i),
          x(e, o),
          E && E.m(o, null),
          t[14](o),
          t[15](e),
          (h = !0),
          m ||
            ((g = [
              I((a = Fe.call(null, o, t[5]))),
              I((u = Fe.call(null, e, t[0]))),
              I(t[9].call(null, e)),
              k(e, "SMUIGenericInput:mount", t[16]),
              k(e, "SMUIGenericInput:unmount", t[17]),
            ]),
            (m = !0));
      },
      p(t, [n]) {
        y &&
          y.p &&
          (!h || 4096 & n) &&
          p(y, $, t, t[12], h ? d($, t[12], n, null) : f(t[12]), null),
          E &&
            E.p &&
            (!h || 4096 & n) &&
            p(E, v, t, t[12], h ? d(v, t[12], n, Wc) : f(t[12]), zc),
          H(
            o,
            (A = Mt(b, [
              (!h || 16 & n) && { for: t[4] },
              1024 & n && Me(t[10], "label$"),
            ]))
          ),
          a && s(a.update) && 32 & n && a.update.call(null, t[5]),
          H(
            e,
            (_ = Mt(C, [
              (!h ||
                (14 & n &&
                  l !==
                    (l = Oe({
                      [t[1]]: !0,
                      "mdc-form-field": !0,
                      "mdc-form-field--align-end": "end" === t[2],
                      "mdc-form-field--nowrap": t[3],
                    })))) && { class: l },
              1024 & n && we(t[10], ["label$"]),
            ]))
          ),
          u && s(u.update) && 1 & n && u.update.call(null, t[0]);
      },
      i(t) {
        h || (Tt(y, t), Tt(E, t), (h = !0));
      },
      o(t) {
        Ot(y, t), Ot(E, t), (h = !1);
      },
      d(n) {
        n && L(e),
          y && y.d(n),
          E && E.d(n),
          t[14](null),
          t[15](null),
          (m = !1),
          r(g);
      },
    };
  }
  let Yc = 0;
  function Xc(t, e, i) {
    const o = [
      "use",
      "class",
      "align",
      "noWrap",
      "inputId",
      "label$use",
      "getElement",
    ];
    let r = m(e, o),
      { $$slots: s = {}, $$scope: a } = e;
    const l = De(tt());
    let c,
      u,
      d,
      p,
      { use: f = [] } = e,
      { class: g = "" } = e,
      { align: $ = "start" } = e,
      { noWrap: y = !1 } = e,
      { inputId: I = "SMUI-form-field-" + Yc++ } = e,
      { label$use: v = [] } = e;
    ot("SMUI:generic:input:props", { id: I }),
      et(
        () => (
          (u = new Gc({
            activateInputRipple: () => {
              p && p.activateRipple();
            },
            deactivateInputRipple: () => {
              p && p.deactivateRipple();
            },
            deregisterInteractionHandler: (t, e) => {
              d.removeEventListener(t, e);
            },
            registerInteractionHandler: (t, e) => {
              d.addEventListener(t, e);
            },
          })),
          u.init(),
          () => {
            u.destroy();
          }
        )
      );
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(10, (r = m(e, o))),
          "use" in t && i(0, (f = t.use)),
          "class" in t && i(1, (g = t.class)),
          "align" in t && i(2, ($ = t.align)),
          "noWrap" in t && i(3, (y = t.noWrap)),
          "inputId" in t && i(4, (I = t.inputId)),
          "label$use" in t && i(5, (v = t.label$use)),
          "$$scope" in t && i(12, (a = t.$$scope));
      }),
      [
        f,
        g,
        $,
        y,
        I,
        v,
        c,
        d,
        p,
        l,
        r,
        function () {
          return c;
        },
        a,
        s,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (d = t), i(7, d);
          });
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (c = t), i(6, c);
          });
        },
        (t) => i(8, (p = t.detail)),
        () => i(8, (p = void 0)),
      ]
    );
  }
  class Qc extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, Xc, qc, a, {
          use: 0,
          class: 1,
          align: 2,
          noWrap: 3,
          inputId: 4,
          label$use: 5,
          getElement: 11,
        });
    }
    get getElement() {
      return this.$$.ctx[11];
    }
  }
  function Jc(t, e, n) {
    const i = t.slice();
    return (i[56] = e[n]), (i[58] = n), i;
  }
  const Zc = (t) => ({}),
    tu = (t) => ({}),
    eu = (t) => ({ match: 32768 & t[0] }),
    nu = (t) => ({ match: t[56] }),
    iu = (t) => ({}),
    ou = (t) => ({}),
    ru = (t) => ({}),
    su = (t) => ({});
  function au(t) {
    let e,
      n,
      i = t[15],
      o = [];
    for (let e = 0; e < i.length; e += 1) o[e] = mu(Jc(t, i, e));
    const r = (t) =>
      Ot(o[t], 1, 1, () => {
        o[t] = null;
      });
    let s = null;
    return (
      i.length || (s = uu(t)),
      {
        c() {
          for (let t = 0; t < o.length; t += 1) o[t].c();
          (e = F()), s && s.c();
        },
        m(t, i) {
          for (let e = 0; e < o.length; e += 1) o[e].m(t, i);
          O(t, e, i), s && s.m(t, i), (n = !0);
        },
        p(t, n) {
          if ((25396017 & n[0]) | (2097152 & n[1])) {
            let a;
            for (i = t[15], a = 0; a < i.length; a += 1) {
              const r = Jc(t, i, a);
              o[a]
                ? (o[a].p(r, n), Tt(o[a], 1))
                : ((o[a] = mu(r)),
                  o[a].c(),
                  Tt(o[a], 1),
                  o[a].m(e.parentNode, e));
            }
            for (xt(), a = i.length; a < o.length; a += 1) r(a);
            St(),
              !i.length && s
                ? s.p(t, n)
                : i.length
                ? s &&
                  (xt(),
                  Ot(s, 1, 1, () => {
                    s = null;
                  }),
                  St())
                : ((s = uu(t)), s.c(), Tt(s, 1), s.m(e.parentNode, e));
          }
        },
        i(t) {
          if (!n) {
            for (let t = 0; t < i.length; t += 1) Tt(o[t]);
            n = !0;
          }
        },
        o(t) {
          o = o.filter(Boolean);
          for (let t = 0; t < o.length; t += 1) Ot(o[t]);
          n = !1;
        },
        d(t) {
          w(o, t), t && L(e), s && s.d(t);
        },
      }
    );
  }
  function lu(t) {
    let e, n;
    return (
      (e = new vs({
        props: {
          disabled: !0,
          $$slots: { default: [$u] },
          $$scope: { ctx: t },
        },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          2097152 & n[1] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function cu(t) {
    let e, n;
    return (
      (e = new vs({
        props: {
          disabled: !0,
          $$slots: { default: [Iu] },
          $$scope: { ctx: t },
        },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          2097152 & n[1] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function uu(t) {
    let e, n;
    return (
      (e = new vs({
        props: {
          disabled: t[9],
          $$slots: { default: [pu] },
          $$scope: { ctx: t },
        },
      })),
      e.$on("SMUI:action", t[49]),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          512 & n[0] && (i.disabled = t[9]),
            2097152 & n[1] && (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function du(t) {
    let e;
    return {
      c() {
        e = D("No matches found.");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function pu(t) {
    let e, n;
    const i = t[42]["no-matches"],
      o = c(i, t, t[52], tu),
      r =
        o ||
        (function (t) {
          let e, n;
          return (
            (e = new hs({
              props: { $$slots: { default: [du] }, $$scope: { ctx: t } },
            })),
            {
              c() {
                Pt(e.$$.fragment);
              },
              m(t, i) {
                Ut(e, t, i), (n = !0);
              },
              p(t, n) {
                const i = {};
                2097152 & n[1] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
              },
              i(t) {
                n || (Tt(e.$$.fragment, t), (n = !0));
              },
              o(t) {
                Ot(e.$$.fragment, t), (n = !1);
              },
              d(t) {
                Ht(e, t);
              },
            }
          );
        })(t);
    return {
      c() {
        r && r.c(), (e = M());
      },
      m(t, i) {
        r && r.m(t, i), O(t, e, i), (n = !0);
      },
      p(t, e) {
        o &&
          o.p &&
          (!n || 2097152 & e[1]) &&
          p(o, i, t, t[52], n ? d(i, t[52], e, Zc) : f(t[52]), tu);
      },
      i(t) {
        n || (Tt(r, t), (n = !0));
      },
      o(t) {
        Ot(r, t), (n = !1);
      },
      d(t) {
        r && r.d(t), t && L(e);
      },
    };
  }
  function fu(t) {
    let e,
      n = t[5](t[56]) + "";
    return {
      c() {
        e = D(n);
      },
      m(t, n) {
        O(t, e, n);
      },
      p(t, i) {
        32800 & i[0] && n !== (n = t[5](t[56]) + "") && B(e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function hu(t) {
    let e, n;
    const i = t[42].match,
      o = c(i, t, t[52], nu),
      r =
        o ||
        (function (t) {
          let e, n;
          return (
            (e = new hs({
              props: { $$slots: { default: [fu] }, $$scope: { ctx: t } },
            })),
            {
              c() {
                Pt(e.$$.fragment);
              },
              m(t, i) {
                Ut(e, t, i), (n = !0);
              },
              p(t, n) {
                const i = {};
                (32800 & n[0]) | (2097152 & n[1]) &&
                  (i.$$scope = { dirty: n, ctx: t }),
                  e.$set(i);
              },
              i(t) {
                n || (Tt(e.$$.fragment, t), (n = !0));
              },
              o(t) {
                Ot(e.$$.fragment, t), (n = !1);
              },
              d(t) {
                Ht(e, t);
              },
            }
          );
        })(t);
    return {
      c() {
        r && r.c(), (e = M());
      },
      m(t, i) {
        r && r.m(t, i), O(t, e, i), (n = !0);
      },
      p(t, e) {
        o
          ? o.p &&
            (!n || (32768 & e[0]) | (2097152 & e[1])) &&
            p(o, i, t, t[52], n ? d(i, t[52], e, eu) : f(t[52]), nu)
          : r && r.p && (!n || 32800 & e[0]) && r.p(t, n ? e : [-1, -1]);
      },
      i(t) {
        n || (Tt(r, t), (n = !0));
      },
      o(t) {
        Ot(r, t), (n = !1);
      },
      d(t) {
        r && r.d(t), t && L(e);
      },
    };
  }
  function mu(t) {
    let e, n;
    return (
      (e = new vs({
        props: {
          disabled: t[4](t[56]),
          selected: t[56] === t[0],
          $$slots: { default: [hu] },
          $$scope: { ctx: t },
        },
      })),
      e.$on("mouseenter", function () {
        return t[47](t[58]);
      }),
      e.$on("SMUI:action", function () {
        return t[48](t[56]);
      }),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(n, i) {
          t = n;
          const o = {};
          32784 & i[0] && (o.disabled = t[4](t[56])),
            32769 & i[0] && (o.selected = t[56] === t[0]),
            (32800 & i[0]) | (2097152 & i[1]) &&
              (o.$$scope = { dirty: i, ctx: t }),
            e.$set(o);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function gu(t) {
    let e;
    return {
      c() {
        e = D("Error while fetching suggestions.");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function $u(t) {
    let e;
    const n = t[42].error,
      i = c(n, t, t[52], ou),
      o =
        i ||
        (function (t) {
          let e, n;
          return (
            (e = new hs({
              props: { $$slots: { default: [gu] }, $$scope: { ctx: t } },
            })),
            {
              c() {
                Pt(e.$$.fragment);
              },
              m(t, i) {
                Ut(e, t, i), (n = !0);
              },
              p(t, n) {
                const i = {};
                2097152 & n[1] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
              },
              i(t) {
                n || (Tt(e.$$.fragment, t), (n = !0));
              },
              o(t) {
                Ot(e.$$.fragment, t), (n = !1);
              },
              d(t) {
                Ht(e, t);
              },
            }
          );
        })(t);
    return {
      c() {
        o && o.c();
      },
      m(t, n) {
        o && o.m(t, n), (e = !0);
      },
      p(t, o) {
        i &&
          i.p &&
          (!e || 2097152 & o[1]) &&
          p(i, n, t, t[52], e ? d(n, t[52], o, iu) : f(t[52]), ou);
      },
      i(t) {
        e || (Tt(o, t), (e = !0));
      },
      o(t) {
        Ot(o, t), (e = !1);
      },
      d(t) {
        o && o.d(t);
      },
    };
  }
  function yu(t) {
    let e;
    return {
      c() {
        e = D("Loading...");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function Iu(t) {
    let e;
    const n = t[42].loading,
      i = c(n, t, t[52], su),
      o =
        i ||
        (function (t) {
          let e, n;
          return (
            (e = new hs({
              props: { $$slots: { default: [yu] }, $$scope: { ctx: t } },
            })),
            {
              c() {
                Pt(e.$$.fragment);
              },
              m(t, i) {
                Ut(e, t, i), (n = !0);
              },
              p(t, n) {
                const i = {};
                2097152 & n[1] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
              },
              i(t) {
                n || (Tt(e.$$.fragment, t), (n = !0));
              },
              o(t) {
                Ot(e.$$.fragment, t), (n = !1);
              },
              d(t) {
                Ht(e, t);
              },
            }
          );
        })(t);
    return {
      c() {
        o && o.c();
      },
      m(t, n) {
        o && o.m(t, n), (e = !0);
      },
      p(t, o) {
        i &&
          i.p &&
          (!e || 2097152 & o[1]) &&
          p(i, n, t, t[52], e ? d(n, t[52], o, ru) : f(t[52]), su);
      },
      i(t) {
        e || (Tt(o, t), (e = !0));
      },
      o(t) {
        Ot(o, t), (e = !1);
      },
      d(t) {
        o && o.d(t);
      },
    };
  }
  function vu(t) {
    let e, n, i, o;
    const r = [cu, lu, au],
      s = [];
    function a(t, e) {
      return t[13] ? 0 : t[19] ? 1 : 2;
    }
    return (
      (e = a(t)),
      (n = s[e] = r[e](t)),
      {
        c() {
          n.c(), (i = F());
        },
        m(t, n) {
          s[e].m(t, n), O(t, i, n), (o = !0);
        },
        p(t, o) {
          let l = e;
          (e = a(t)),
            e === l
              ? s[e].p(t, o)
              : (xt(),
                Ot(s[l], 1, 1, () => {
                  s[l] = null;
                }),
                St(),
                (n = s[e]),
                n ? n.p(t, o) : ((n = s[e] = r[e](t)), n.c()),
                Tt(n, 1),
                n.m(i.parentNode, i));
        },
        i(t) {
          o || (Tt(n), (o = !0));
        },
        o(t) {
          Ot(n), (o = !1);
        },
        d(t) {
          s[e].d(t), t && L(i);
        },
      }
    );
  }
  function Eu(t) {
    let e, i;
    const o = [Me(t[27], "list$")];
    let r = { $$slots: { default: [vu] }, $$scope: { ctx: t } };
    for (let t = 0; t < o.length; t += 1) r = n(r, o[t]);
    return (
      (e = new as({ props: r })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, n) {
          const i = 134217728 & n[0] ? Mt(o, [Ft(Me(t[27], "list$"))]) : {};
          (762673 & n[0]) | (2097152 & n[1]) &&
            (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function bu(t) {
    let e, i, o, a, l, u, h, m, g, $;
    const y = t[42].default,
      v = c(y, t, t[52], null),
      E =
        v ||
        (function (t) {
          let e, i, o;
          const r = [
            { label: t[6] },
            { disabled: t[7] },
            Me(t[27], "textfield$"),
          ];
          function s(e) {
            t[43](e);
          }
          let a = {};
          for (let t = 0; t < r.length; t += 1) a = n(a, r[t]);
          return (
            void 0 !== t[1] && (a.value = t[1]),
            (e = new gr({ props: a })),
            lt.push(() => kt(e, "value", s)),
            {
              c() {
                Pt(e.$$.fragment);
              },
              m(t, n) {
                Ut(e, t, n), (o = !0);
              },
              p(t, n) {
                const o =
                  134217920 & n[0]
                    ? Mt(r, [
                        64 & n[0] && { label: t[6] },
                        128 & n[0] && { disabled: t[7] },
                        134217728 & n[0] && Ft(Me(t[27], "textfield$")),
                      ])
                    : {};
                !i &&
                  2 & n[0] &&
                  ((i = !0), (o.value = t[1]), gt(() => (i = !1))),
                  e.$set(o);
              },
              i(t) {
                o || (Tt(e.$$.fragment, t), (o = !0));
              },
              o(t) {
                Ot(e.$$.fragment, t), (o = !1);
              },
              d(t) {
                Ht(e, t);
              },
            }
          );
        })(t),
      b = [
        { class: Oe({ [t[10]]: !0, "smui-autocomplete__menu": !0 }) },
        { managed: !0 },
        { open: t[20] },
        { anchor: t[11] },
        { anchorCorner: t[12] },
        Me(t[27], "menu$"),
      ];
    function A(e) {
      t[50](e);
    }
    let C = { $$slots: { default: [Eu] }, $$scope: { ctx: t } };
    for (let t = 0; t < b.length; t += 1) C = n(C, b[t]);
    void 0 !== t[17] && (C.anchorElement = t[17]),
      (a = new va({ props: C })),
      lt.push(() => kt(a, "anchorElement", A)),
      a.$on("SMUIList:mount", t[22]);
    let _ = [
        { class: (u = Oe({ [t[3]]: !0, "smui-autocomplete": !0 })) },
        we(t[27], ["menu$", "textfield$", "list$"]),
      ],
      S = {};
    for (let t = 0; t < _.length; t += 1) S = n(S, _[t]);
    return {
      c() {
        (e = N("div")),
          (i = N("div")),
          E && E.c(),
          (o = M()),
          Pt(a.$$.fragment),
          H(e, S);
      },
      m(n, r) {
        O(n, e, r),
          x(e, i),
          E && E.m(i, null),
          t[44](i),
          x(e, o),
          Ut(a, e, null),
          t[51](e),
          (m = !0),
          g ||
            (($ = [
              k(i, "focusin", t[45]),
              k(i, "focusout", t[26]),
              k(i, "input", t[46]),
              k(i, "keydown", t[25], !0),
              I(ga.call(null, e)),
              I((h = Fe.call(null, e, t[2]))),
              I(t[21].call(null, e)),
            ]),
            (g = !0));
      },
      p(t, n) {
        v
          ? v.p &&
            (!m || 2097152 & n[1]) &&
            p(v, y, t, t[52], m ? d(y, t[52], n, null) : f(t[52]), null)
          : E && E.p && (!m || 134217922 & n[0]) && E.p(t, m ? n : [-1, -1]);
        const i =
          135273472 & n[0]
            ? Mt(b, [
                1024 & n[0] && {
                  class: Oe({ [t[10]]: !0, "smui-autocomplete__menu": !0 }),
                },
                b[1],
                1048576 & n[0] && { open: t[20] },
                2048 & n[0] && { anchor: t[11] },
                4096 & n[0] && { anchorCorner: t[12] },
                134217728 & n[0] && Ft(Me(t[27], "menu$")),
              ])
            : {};
        (134980401 & n[0]) | (2097152 & n[1]) &&
          (i.$$scope = { dirty: n, ctx: t }),
          !l &&
            131072 & n[0] &&
            ((l = !0), (i.anchorElement = t[17]), gt(() => (l = !1))),
          a.$set(i),
          H(
            e,
            (S = Mt(_, [
              (!m ||
                (8 & n[0] &&
                  u !== (u = Oe({ [t[3]]: !0, "smui-autocomplete": !0 })))) && {
                class: u,
              },
              134217728 & n[0] && we(t[27], ["menu$", "textfield$", "list$"]),
            ]))
          ),
          h && s(h.update) && 4 & n[0] && h.update.call(null, t[2]);
      },
      i(t) {
        m || (Tt(E, t), Tt(a.$$.fragment, t), (m = !0));
      },
      o(t) {
        Ot(E, t), Ot(a.$$.fragment, t), (m = !1);
      },
      d(n) {
        n && L(e), E && E.d(n), t[44](null), Ht(a), t[51](null), (g = !1), r($);
      },
    };
  }
  function Au(t, e, i) {
    let o;
    const r = [
      "use",
      "class",
      "options",
      "value",
      "getOptionDisabled",
      "getOptionLabel",
      "text",
      "label",
      "disabled",
      "toggle",
      "combobox",
      "clearOnBlur",
      "selectOnExactMatch",
      "showMenuWithNoInput",
      "noMatchesActionDisabled",
      "search",
      "menu$class",
      "menu$anchor",
      "menu$anchorCorner",
      "focus",
      "blur",
      "getElement",
    ];
    let s = m(e, r),
      { $$slots: a = {}, $$scope: l } = e;
    const c = De(tt());
    let u,
      d,
      p,
      f,
      g,
      $,
      { use: y = [] } = e,
      { class: I = "" } = e,
      { options: v = [] } = e,
      { value: E } = e,
      { getOptionDisabled: b = () => !1 } = e,
      { getOptionLabel: A = (t) => (null == t ? "" : `${t}`) } = e,
      { text: C = A(E) } = e,
      { label: _ } = e,
      { disabled: x = !1 } = e,
      { toggle: S = !1 } = e,
      { combobox: T = !1 } = e,
      { clearOnBlur: O = !T } = e,
      { selectOnExactMatch: L = !0 } = e,
      { showMenuWithNoInput: w = !0 } = e,
      { noMatchesActionDisabled: N = !0 } = e,
      {
        search: R = async (t) => {
          const e = t.toLowerCase(),
            n = "function" == typeof v ? await v() : v || [];
          if ("" === e) return n;
          const i = n.filter((t) => A(t).toLowerCase().includes(e));
          return (
            i.sort((t, n) => {
              const i = A(t).toLowerCase(),
                o = A(n).toLowerCase();
              return i.startsWith(e) && !o.startsWith(e)
                ? -1
                : o.startsWith(e) && !i.startsWith(e)
                ? 1
                : 0;
            }),
            i
          );
        },
      } = e,
      { menu$class: D = "" } = e,
      { menu$anchor: M = !1 } = e,
      { menu$anchorCorner: F = "BOTTOM_START" } = e,
      k = !1,
      P = !1,
      U = !1,
      H = [],
      B = -1,
      V = E;
    function j(t, e = !0) {
      e && i(1, (C = A(t))),
        i(0, (E = t)),
        e || i(40, (V = t)),
        Le(u, "SMUIAutocomplete:selected", t);
    }
    function K(t, e = !0) {
      e && i(1, (C = "")),
        i(0, (E = void 0)),
        e || i(40, (V = void 0)),
        Le(u, "SMUIAutocomplete:deselected", t);
    }
    function G(t) {
      t === E ? K(t) : j(t);
    }
    function W() {
      return p ? p.getOrderedList().filter((t) => !t.disabled) : [];
    }
    async function z() {
      i(13, (k = !0)), i(19, (P = !1));
      try {
        const t = await R(C);
        if (!1 !== t && (i(15, (H = t)), L)) {
          const t = H.find((t) => A(t) === C);
          t && E !== t && j(t);
        }
      } catch (t) {
        i(19, (P = !0));
      }
      i(13, (k = !1));
    }
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(27, (s = m(e, r))),
          "use" in t && i(2, (y = t.use)),
          "class" in t && i(3, (I = t.class)),
          "options" in t && i(28, (v = t.options)),
          "value" in t && i(0, (E = t.value)),
          "getOptionDisabled" in t && i(4, (b = t.getOptionDisabled)),
          "getOptionLabel" in t && i(5, (A = t.getOptionLabel)),
          "text" in t && i(1, (C = t.text)),
          "label" in t && i(6, (_ = t.label)),
          "disabled" in t && i(7, (x = t.disabled)),
          "toggle" in t && i(8, (S = t.toggle)),
          "combobox" in t && i(29, (T = t.combobox)),
          "clearOnBlur" in t && i(30, (O = t.clearOnBlur)),
          "selectOnExactMatch" in t && i(31, (L = t.selectOnExactMatch)),
          "showMenuWithNoInput" in t && i(32, (w = t.showMenuWithNoInput)),
          "noMatchesActionDisabled" in t &&
            i(9, (N = t.noMatchesActionDisabled)),
          "search" in t && i(33, (R = t.search)),
          "menu$class" in t && i(10, (D = t.menu$class)),
          "menu$anchor" in t && i(11, (M = t.menu$anchor)),
          "menu$anchorCorner" in t && i(12, (F = t.menu$anchorCorner)),
          "$$scope" in t && i(52, (l = t.$$scope));
      }),
      (t.$$.update = () => {
        if (
          ((536870947 & t.$$.dirty[0]) | (512 & t.$$.dirty[1]) &&
            (T || V === E
              ? T && i(0, (E = C))
              : (i(1, (C = A(E))), i(40, (V = E)))),
          (536928259 & t.$$.dirty[0]) | (2 & t.$$.dirty[1]) &&
            i(
              20,
              (o =
                U &&
                ("" !== C || w) &&
                (k ||
                  (!T && !(1 === H.length && H[0] === E)) ||
                  (T && !!H.length && !(1 === H.length && H[0] === E))))
            ),
          (536870947 & t.$$.dirty[0]) | (256 & t.$$.dirty[1]) &&
            g !== C &&
            (T || null == E || A(E) === C || K(E, !1), z(), i(39, (g = C))),
          (268435456 & t.$$.dirty[0]) | (4 & t.$$.dirty[1]) && z(),
          (65536 & t.$$.dirty[0]) | (1216 & t.$$.dirty[1]) && $ !== B)
        ) {
          const t = W();
          -1 === B
            ? i(38, (f = void 0))
            : (i(38, (f = t[B])),
              f &&
                (i(38, (f.activated = !0), f),
                (e = f.element),
                ((n = e.getBoundingClientRect()).top >= 0 &&
                  n.left >= 0 &&
                  n.bottom <=
                    (window.innerHeight ||
                      document.documentElement.clientHeight) &&
                  n.right <=
                    (window.innerWidth ||
                      document.documentElement.clientWidth)) ||
                  f.element.scrollIntoView({
                    block: "end",
                    inline: "nearest",
                  }))),
            t.forEach((t, e) => {
              e !== B && (t.activated = !1);
            }),
            p &&
              p.getOrderedList().forEach((t) => {
                t.tabindex = -1;
              }),
            i(41, ($ = B));
        }
        var e, n;
      }),
      [
        E,
        C,
        y,
        I,
        b,
        A,
        _,
        x,
        S,
        N,
        D,
        M,
        F,
        k,
        U,
        H,
        B,
        u,
        d,
        P,
        o,
        c,
        function (t) {
          p || i(37, (p = t.detail));
        },
        j,
        G,
        function (t) {
          if (!T || H.length)
            if ("ArrowDown" === t.key)
              t.preventDefault(),
                -1 === B || B === W().length - 1
                  ? i(16, (B = 0))
                  : i(16, B++, B);
            else if ("ArrowUp" === t.key)
              t.preventDefault(),
                -1 === B || 0 === B
                  ? i(16, (B = W().length - 1))
                  : i(16, B--, B);
            else if ("Enter" === t.key) {
              t.preventDefault();
              const e = W();
              f && (e[B] && e[B].action(t), i(16, (B = -1)));
            }
        },
        async function (t) {
          (t.relatedTarget &&
            -1 !==
              W()
                .map((t) => t.element)
                .indexOf(t.relatedTarget)) ||
            (i(16, (B = -1)),
            i(14, (U = !1)),
            O && null == E && i(1, (C = "")));
        },
        s,
        v,
        T,
        O,
        L,
        w,
        R,
        function () {
          if (d) {
            const t = d.querySelector("input.mdc-text-field__input");
            t && t.focus();
          }
        },
        function () {
          if (d) {
            const t = d.querySelector("input.mdc-text-field__input");
            t && t.blur();
          }
        },
        function () {
          return u;
        },
        p,
        f,
        g,
        V,
        $,
        a,
        function (t) {
          (C = t), i(1, C), i(29, T), i(40, V), i(0, E), i(5, A);
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (d = t), i(18, d);
          });
        },
        () => {
          i(14, (U = !0));
        },
        () => {
          i(16, (B = -1));
        },
        (t) => {
          i(16, (B = t));
        },
        (t) => (S ? G(t) : j(t)),
        (t) => Le(u, "SMUIAutocomplete:noMatchesAction", t),
        function (t) {
          (u = t), i(17, u);
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), i(17, u);
          });
        },
        l,
      ]
    );
  }
  class Cu extends Vt {
    constructor(t) {
      super(),
        Bt(
          this,
          t,
          Au,
          bu,
          a,
          {
            use: 2,
            class: 3,
            options: 28,
            value: 0,
            getOptionDisabled: 4,
            getOptionLabel: 5,
            text: 1,
            label: 6,
            disabled: 7,
            toggle: 8,
            combobox: 29,
            clearOnBlur: 30,
            selectOnExactMatch: 31,
            showMenuWithNoInput: 32,
            noMatchesActionDisabled: 9,
            search: 33,
            menu$class: 10,
            menu$anchor: 11,
            menu$anchorCorner: 12,
            focus: 34,
            blur: 35,
            getElement: 36,
          },
          null,
          [-1, -1]
        );
    }
    get focus() {
      return this.$$.ctx[34];
    }
    get blur() {
      return this.$$.ctx[35];
    }
    get getElement() {
      return this.$$.ctx[36];
    }
  }
  /**
   * @license
   * Copyright 2020 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var _u;
  !(function (t) {
    (t.POLITE = "polite"), (t.ASSERTIVE = "assertive");
  })(_u || (_u = {}));
  var xu,
    Su = (function () {
      function t() {
        this.liveRegions = new Map();
      }
      return (
        (t.getInstance = function () {
          return t.instance || (t.instance = new t()), t.instance;
        }),
        (t.prototype.say = function (t, e) {
          var n,
            i,
            o =
              null !== (n = null == e ? void 0 : e.priority) && void 0 !== n
                ? n
                : _u.POLITE,
            r =
              null !== (i = null == e ? void 0 : e.ownerDocument) &&
              void 0 !== i
                ? i
                : document,
            s = this.getLiveRegion(o, r);
          function a() {
            (s.textContent = ""), r.removeEventListener("click", a);
          }
          (s.textContent = ""),
            setTimeout(function () {
              (s.textContent = t), r.addEventListener("click", a);
            }, 1);
        }),
        (t.prototype.getLiveRegion = function (t, e) {
          var n = this.liveRegions.get(e);
          n || ((n = new Map()), this.liveRegions.set(e, n));
          var i = n.get(t);
          if (i && e.body.contains(i)) return i;
          var o = this.createLiveRegion(t, e);
          return n.set(t, o), o;
        }),
        (t.prototype.createLiveRegion = function (t, e) {
          var n = e.createElement("div");
          return (
            (n.style.position = "absolute"),
            (n.style.top = "-9999px"),
            (n.style.left = "-9999px"),
            (n.style.height = "1px"),
            (n.style.overflow = "hidden"),
            n.setAttribute("aria-atomic", "true"),
            n.setAttribute("aria-live", t),
            n.setAttribute("data-mdc-dom-announce", "true"),
            e.body.appendChild(n),
            n
          );
        }),
        t
      );
    })();
  /**
   * @license
   * Copyright 2020 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ !(function (t) {
    (t[(t.UNSPECIFIED = 0)] = "UNSPECIFIED"),
      (t[(t.CLICK = 1)] = "CLICK"),
      (t[(t.BACKSPACE_KEY = 2)] = "BACKSPACE_KEY"),
      (t[(t.DELETE_KEY = 3)] = "DELETE_KEY"),
      (t[(t.SPACEBAR_KEY = 4)] = "SPACEBAR_KEY"),
      (t[(t.ENTER_KEY = 5)] = "ENTER_KEY");
  })(xu || (xu = {}));
  var Tu,
    Ou,
    Lu = {
      ARIA_HIDDEN: "aria-hidden",
      INTERACTION_EVENT: "MDCChipTrailingAction:interaction",
      NAVIGATION_EVENT: "MDCChipTrailingAction:navigation",
      TAB_INDEX: "tabindex",
    },
    wu = (function (t) {
      function e(n) {
        return t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "strings", {
          get: function () {
            return Lu;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              focus: function () {},
              getAttribute: function () {
                return null;
              },
              setAttribute: function () {},
              notifyInteraction: function () {},
              notifyNavigation: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.handleClick = function (t) {
          t.stopPropagation(), this.adapter.notifyInteraction(xu.CLICK);
        }),
        (e.prototype.handleKeydown = function (t) {
          t.stopPropagation();
          var e = Fi(t);
          if (this.shouldNotifyInteractionFromKey(e)) {
            var n = this.getTriggerFromKey(e);
            this.adapter.notifyInteraction(n);
          } else
            (function (t) {
              return Mi.has(Fi(t));
            })(t) && this.adapter.notifyNavigation(e);
        }),
        (e.prototype.removeFocus = function () {
          this.adapter.setAttribute(Lu.TAB_INDEX, "-1");
        }),
        (e.prototype.focus = function () {
          this.adapter.setAttribute(Lu.TAB_INDEX, "0"), this.adapter.focus();
        }),
        (e.prototype.isNavigable = function () {
          return "true" !== this.adapter.getAttribute(Lu.ARIA_HIDDEN);
        }),
        (e.prototype.shouldNotifyInteractionFromKey = function (t) {
          return t === si || t === ai || t === ri || t === gi;
        }),
        (e.prototype.getTriggerFromKey = function (t) {
          return t === ai
            ? xu.SPACEBAR_KEY
            : t === si
            ? xu.ENTER_KEY
            : t === gi
            ? xu.DELETE_KEY
            : t === ri
            ? xu.BACKSPACE_KEY
            : xu.UNSPECIFIED;
        }),
        e
      );
    })(oe),
    Nu = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        Qt(e, t),
        Object.defineProperty(e.prototype, "ripple", {
          get: function () {
            return this.rippleSurface;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.attachTo = function (t) {
          return new e(t);
        }),
        (e.prototype.initialize = function (t) {
          void 0 === t &&
            (t = function (t, e) {
              return new Ie(t, e);
            });
          var e = Ie.createAdapter(this);
          this.rippleSurface = t(this.root, new ye(e));
        }),
        (e.prototype.initialSyncWithDOM = function () {
          var t = this;
          (this.handleClick = function (e) {
            t.foundation.handleClick(e);
          }),
            (this.handleKeydown = function (e) {
              t.foundation.handleKeydown(e);
            }),
            this.listen("click", this.handleClick),
            this.listen("keydown", this.handleKeydown);
        }),
        (e.prototype.destroy = function () {
          this.rippleSurface.destroy(),
            this.unlisten("click", this.handleClick),
            this.unlisten("keydown", this.handleKeydown),
            t.prototype.destroy.call(this);
        }),
        (e.prototype.getDefaultFoundation = function () {
          var t = this,
            e = {
              focus: function () {
                t.root.focus();
              },
              getAttribute: function (e) {
                return t.root.getAttribute(e);
              },
              notifyInteraction: function (e) {
                return t.emit(Lu.INTERACTION_EVENT, { trigger: e }, !0);
              },
              notifyNavigation: function (e) {
                t.emit(Lu.NAVIGATION_EVENT, { key: e }, !0);
              },
              setAttribute: function (e, n) {
                t.root.setAttribute(e, n);
              },
            };
          return new wu(e);
        }),
        (e.prototype.isNavigable = function () {
          return this.foundation.isNavigable();
        }),
        (e.prototype.focus = function () {
          this.foundation.focus();
        }),
        (e.prototype.removeFocus = function () {
          this.foundation.removeFocus();
        }),
        e
      );
    })(re);
  /**
   * @license
   * Copyright 2020 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ !(function (t) {
    (t.LEFT = "left"), (t.RIGHT = "right");
  })(Tu || (Tu = {})),
    (function (t) {
      (t.PRIMARY = "primary"), (t.TRAILING = "trailing"), (t.NONE = "none");
    })(Ou || (Ou = {}));
  var Ru = {
      ADDED_ANNOUNCEMENT_ATTRIBUTE: "data-mdc-chip-added-announcement",
      ARIA_CHECKED: "aria-checked",
      ARROW_DOWN_KEY: "ArrowDown",
      ARROW_LEFT_KEY: "ArrowLeft",
      ARROW_RIGHT_KEY: "ArrowRight",
      ARROW_UP_KEY: "ArrowUp",
      BACKSPACE_KEY: "Backspace",
      CHECKMARK_SELECTOR: ".mdc-chip__checkmark",
      DELETE_KEY: "Delete",
      END_KEY: "End",
      ENTER_KEY: "Enter",
      ENTRY_ANIMATION_NAME: "mdc-chip-entry",
      HOME_KEY: "Home",
      IE_ARROW_DOWN_KEY: "Down",
      IE_ARROW_LEFT_KEY: "Left",
      IE_ARROW_RIGHT_KEY: "Right",
      IE_ARROW_UP_KEY: "Up",
      IE_DELETE_KEY: "Del",
      INTERACTION_EVENT: "MDCChip:interaction",
      LEADING_ICON_SELECTOR: ".mdc-chip__icon--leading",
      NAVIGATION_EVENT: "MDCChip:navigation",
      PRIMARY_ACTION_SELECTOR: ".mdc-chip__primary-action",
      REMOVED_ANNOUNCEMENT_ATTRIBUTE: "data-mdc-chip-removed-announcement",
      REMOVAL_EVENT: "MDCChip:removal",
      SELECTION_EVENT: "MDCChip:selection",
      SPACEBAR_KEY: " ",
      TAB_INDEX: "tabindex",
      TRAILING_ACTION_SELECTOR: ".mdc-chip-trailing-action",
      TRAILING_ICON_INTERACTION_EVENT: "MDCChip:trailingIconInteraction",
      TRAILING_ICON_SELECTOR: ".mdc-chip__icon--trailing",
    },
    Du = {
      CHECKMARK: "mdc-chip__checkmark",
      CHIP_EXIT: "mdc-chip--exit",
      DELETABLE: "mdc-chip--deletable",
      EDITABLE: "mdc-chip--editable",
      EDITING: "mdc-chip--editing",
      HIDDEN_LEADING_ICON: "mdc-chip__icon--leading-hidden",
      LEADING_ICON: "mdc-chip__icon--leading",
      PRIMARY_ACTION: "mdc-chip__primary-action",
      PRIMARY_ACTION_FOCUSED: "mdc-chip--primary-action-focused",
      SELECTED: "mdc-chip--selected",
      TEXT: "mdc-chip__text",
      TRAILING_ACTION: "mdc-chip__trailing-action",
      TRAILING_ICON: "mdc-chip__icon--trailing",
    },
    Mu = new Set();
  Mu.add(Ru.ARROW_LEFT_KEY),
    Mu.add(Ru.ARROW_RIGHT_KEY),
    Mu.add(Ru.ARROW_DOWN_KEY),
    Mu.add(Ru.ARROW_UP_KEY),
    Mu.add(Ru.END_KEY),
    Mu.add(Ru.HOME_KEY),
    Mu.add(Ru.IE_ARROW_LEFT_KEY),
    Mu.add(Ru.IE_ARROW_RIGHT_KEY),
    Mu.add(Ru.IE_ARROW_DOWN_KEY),
    Mu.add(Ru.IE_ARROW_UP_KEY);
  var Fu = new Set();
  Fu.add(Ru.ARROW_UP_KEY),
    Fu.add(Ru.ARROW_DOWN_KEY),
    Fu.add(Ru.HOME_KEY),
    Fu.add(Ru.END_KEY),
    Fu.add(Ru.IE_ARROW_UP_KEY),
    Fu.add(Ru.IE_ARROW_DOWN_KEY);
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var ku,
    Pu = { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 };
  !(function (t) {
    (t[(t.SHOULD_FOCUS = 0)] = "SHOULD_FOCUS"),
      (t[(t.SHOULD_NOT_FOCUS = 1)] = "SHOULD_NOT_FOCUS");
  })(ku || (ku = {}));
  var Uu = (function (t) {
      function e(n) {
        var i = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
        return (
          (i.shouldRemoveOnTrailingIconClick = !0),
          (i.shouldFocusPrimaryActionOnClick = !0),
          i
        );
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "strings", {
          get: function () {
            return Ru;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return Du;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              addClassToLeadingIcon: function () {},
              eventTargetHasClass: function () {
                return !1;
              },
              focusPrimaryAction: function () {},
              focusTrailingAction: function () {},
              getAttribute: function () {
                return null;
              },
              getCheckmarkBoundingClientRect: function () {
                return Pu;
              },
              getComputedStyleValue: function () {
                return "";
              },
              getRootBoundingClientRect: function () {
                return Pu;
              },
              hasClass: function () {
                return !1;
              },
              hasLeadingIcon: function () {
                return !1;
              },
              isRTL: function () {
                return !1;
              },
              isTrailingActionNavigable: function () {
                return !1;
              },
              notifyEditFinish: function () {},
              notifyEditStart: function () {},
              notifyInteraction: function () {},
              notifyNavigation: function () {},
              notifyRemoval: function () {},
              notifySelection: function () {},
              notifyTrailingIconInteraction: function () {},
              removeClass: function () {},
              removeClassFromLeadingIcon: function () {},
              removeTrailingActionFocus: function () {},
              setPrimaryActionAttr: function () {},
              setStyleProperty: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.isSelected = function () {
          return this.adapter.hasClass(Du.SELECTED);
        }),
        (e.prototype.isEditable = function () {
          return this.adapter.hasClass(Du.EDITABLE);
        }),
        (e.prototype.isEditing = function () {
          return this.adapter.hasClass(Du.EDITING);
        }),
        (e.prototype.setSelected = function (t) {
          this.setSelectedImpl(t), this.notifySelection(t);
        }),
        (e.prototype.setSelectedFromChipSet = function (t, e) {
          this.setSelectedImpl(t), e && this.notifyIgnoredSelection(t);
        }),
        (e.prototype.getShouldRemoveOnTrailingIconClick = function () {
          return this.shouldRemoveOnTrailingIconClick;
        }),
        (e.prototype.setShouldRemoveOnTrailingIconClick = function (t) {
          this.shouldRemoveOnTrailingIconClick = t;
        }),
        (e.prototype.setShouldFocusPrimaryActionOnClick = function (t) {
          this.shouldFocusPrimaryActionOnClick = t;
        }),
        (e.prototype.getDimensions = function () {
          var t = this,
            e = function () {
              return t.adapter.getRootBoundingClientRect();
            };
          if (!this.adapter.hasLeadingIcon()) {
            var n = t.adapter.getCheckmarkBoundingClientRect();
            if (n) {
              var i = e();
              return {
                bottom: i.bottom,
                height: i.height,
                left: i.left,
                right: i.right,
                top: i.top,
                width: i.width + n.height,
              };
            }
          }
          return e();
        }),
        (e.prototype.beginExit = function () {
          this.adapter.addClass(Du.CHIP_EXIT);
        }),
        (e.prototype.handleClick = function () {
          this.adapter.notifyInteraction(),
            this.setPrimaryActionFocusable(this.getFocusBehavior());
        }),
        (e.prototype.handleDoubleClick = function () {
          this.isEditable() && this.startEditing();
        }),
        (e.prototype.handleTransitionEnd = function (t) {
          var e = this,
            n = this.adapter.eventTargetHasClass(t.target, Du.CHIP_EXIT),
            i = "width" === t.propertyName,
            o = "opacity" === t.propertyName;
          if (n && o) {
            var r = this.adapter.getComputedStyleValue("width");
            requestAnimationFrame(function () {
              e.adapter.setStyleProperty("width", r),
                e.adapter.setStyleProperty("padding", "0"),
                e.adapter.setStyleProperty("margin", "0"),
                requestAnimationFrame(function () {
                  e.adapter.setStyleProperty("width", "0");
                });
            });
          } else {
            if (n && i) {
              this.removeFocus();
              var s = this.adapter.getAttribute(
                Ru.REMOVED_ANNOUNCEMENT_ATTRIBUTE
              );
              this.adapter.notifyRemoval(s);
            }
            if (o) {
              var a =
                  this.adapter.eventTargetHasClass(t.target, Du.LEADING_ICON) &&
                  this.adapter.hasClass(Du.SELECTED),
                l =
                  this.adapter.eventTargetHasClass(t.target, Du.CHECKMARK) &&
                  !this.adapter.hasClass(Du.SELECTED);
              a
                ? this.adapter.addClassToLeadingIcon(Du.HIDDEN_LEADING_ICON)
                : l &&
                  this.adapter.removeClassFromLeadingIcon(
                    Du.HIDDEN_LEADING_ICON
                  );
            }
          }
        }),
        (e.prototype.handleFocusIn = function (t) {
          this.eventFromPrimaryAction(t) &&
            this.adapter.addClass(Du.PRIMARY_ACTION_FOCUSED);
        }),
        (e.prototype.handleFocusOut = function (t) {
          this.eventFromPrimaryAction(t) &&
            (this.isEditing() && this.finishEditing(),
            this.adapter.removeClass(Du.PRIMARY_ACTION_FOCUSED));
        }),
        (e.prototype.handleTrailingActionInteraction = function () {
          this.adapter.notifyTrailingIconInteraction(), this.removeChip();
        }),
        (e.prototype.handleKeydown = function (t) {
          if (!this.isEditing())
            return (
              this.isEditable() &&
                this.shouldStartEditing(t) &&
                (t.preventDefault(), this.startEditing()),
              this.shouldNotifyInteraction(t)
                ? (this.adapter.notifyInteraction(),
                  void this.setPrimaryActionFocusable(this.getFocusBehavior()))
                : this.isDeleteAction(t)
                ? (t.preventDefault(), void this.removeChip())
                : void (
                    Mu.has(t.key) &&
                    (t.preventDefault(),
                    this.focusNextAction(t.key, Ou.PRIMARY))
                  )
            );
          this.shouldFinishEditing(t) &&
            (t.preventDefault(), this.finishEditing());
        }),
        (e.prototype.handleTrailingActionNavigation = function (t) {
          this.focusNextAction(t.detail.key, Ou.TRAILING);
        }),
        (e.prototype.removeFocus = function () {
          this.adapter.setPrimaryActionAttr(Ru.TAB_INDEX, "-1"),
            this.adapter.removeTrailingActionFocus();
        }),
        (e.prototype.focusPrimaryAction = function () {
          this.setPrimaryActionFocusable(ku.SHOULD_FOCUS);
        }),
        (e.prototype.focusTrailingAction = function () {
          if (this.adapter.isTrailingActionNavigable())
            return (
              this.adapter.setPrimaryActionAttr(Ru.TAB_INDEX, "-1"),
              void this.adapter.focusTrailingAction()
            );
          this.focusPrimaryAction();
        }),
        (e.prototype.setPrimaryActionFocusable = function (t) {
          this.adapter.setPrimaryActionAttr(Ru.TAB_INDEX, "0"),
            t === ku.SHOULD_FOCUS && this.adapter.focusPrimaryAction(),
            this.adapter.removeTrailingActionFocus();
        }),
        (e.prototype.getFocusBehavior = function () {
          return this.shouldFocusPrimaryActionOnClick
            ? ku.SHOULD_FOCUS
            : ku.SHOULD_NOT_FOCUS;
        }),
        (e.prototype.focusNextAction = function (t, e) {
          var n = this.adapter.isTrailingActionNavigable(),
            i = this.getDirection(t);
          !Fu.has(t) && n
            ? e !== Ou.PRIMARY || i !== Tu.RIGHT
              ? e !== Ou.TRAILING || i !== Tu.LEFT
                ? this.adapter.notifyNavigation(t, Ou.NONE)
                : this.focusPrimaryAction()
              : this.focusTrailingAction()
            : this.adapter.notifyNavigation(t, e);
        }),
        (e.prototype.getDirection = function (t) {
          var e = this.adapter.isRTL();
          return (!e &&
            (t === Ru.ARROW_LEFT_KEY || t === Ru.IE_ARROW_LEFT_KEY)) ||
            (e && (t === Ru.ARROW_RIGHT_KEY || t === Ru.IE_ARROW_RIGHT_KEY))
            ? Tu.LEFT
            : Tu.RIGHT;
        }),
        (e.prototype.removeChip = function () {
          this.shouldRemoveOnTrailingIconClick && this.beginExit();
        }),
        (e.prototype.shouldStartEditing = function (t) {
          return this.eventFromPrimaryAction(t) && t.key === Ru.ENTER_KEY;
        }),
        (e.prototype.shouldFinishEditing = function (t) {
          return t.key === Ru.ENTER_KEY;
        }),
        (e.prototype.shouldNotifyInteraction = function (t) {
          return t.key === Ru.ENTER_KEY || t.key === Ru.SPACEBAR_KEY;
        }),
        (e.prototype.isDeleteAction = function (t) {
          return (
            this.adapter.hasClass(Du.DELETABLE) &&
            (t.key === Ru.BACKSPACE_KEY ||
              t.key === Ru.DELETE_KEY ||
              t.key === Ru.IE_DELETE_KEY)
          );
        }),
        (e.prototype.setSelectedImpl = function (t) {
          t
            ? (this.adapter.addClass(Du.SELECTED),
              this.adapter.setPrimaryActionAttr(Ru.ARIA_CHECKED, "true"))
            : (this.adapter.removeClass(Du.SELECTED),
              this.adapter.setPrimaryActionAttr(Ru.ARIA_CHECKED, "false"));
        }),
        (e.prototype.notifySelection = function (t) {
          this.adapter.notifySelection(t, !1);
        }),
        (e.prototype.notifyIgnoredSelection = function (t) {
          this.adapter.notifySelection(t, !0);
        }),
        (e.prototype.eventFromPrimaryAction = function (t) {
          return this.adapter.eventTargetHasClass(t.target, Du.PRIMARY_ACTION);
        }),
        (e.prototype.startEditing = function () {
          this.adapter.addClass(Du.EDITING), this.adapter.notifyEditStart();
        }),
        (e.prototype.finishEditing = function () {
          this.adapter.removeClass(Du.EDITING), this.adapter.notifyEditFinish();
        }),
        e
      );
    })(oe),
    Hu = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        Qt(e, t),
        Object.defineProperty(e.prototype, "selected", {
          get: function () {
            return this.foundation.isSelected();
          },
          set: function (t) {
            this.foundation.setSelected(t);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "shouldRemoveOnTrailingIconClick", {
          get: function () {
            return this.foundation.getShouldRemoveOnTrailingIconClick();
          },
          set: function (t) {
            this.foundation.setShouldRemoveOnTrailingIconClick(t);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(
          e.prototype,
          "setShouldFocusPrimaryActionOnClick",
          {
            set: function (t) {
              this.foundation.setShouldFocusPrimaryActionOnClick(t);
            },
            enumerable: !1,
            configurable: !0,
          }
        ),
        Object.defineProperty(e.prototype, "ripple", {
          get: function () {
            return this.rippleSurface;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "id", {
          get: function () {
            return this.root.id;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.attachTo = function (t) {
          return new e(t);
        }),
        (e.prototype.initialize = function (t, e) {
          var n = this;
          void 0 === t &&
            (t = function (t, e) {
              return new Ie(t, e);
            }),
            void 0 === e &&
              (e = function (t) {
                return new Nu(t);
              }),
            (this.leadingIcon = this.root.querySelector(
              Ru.LEADING_ICON_SELECTOR
            )),
            (this.checkmark = this.root.querySelector(Ru.CHECKMARK_SELECTOR)),
            (this.primaryAction = this.root.querySelector(
              Ru.PRIMARY_ACTION_SELECTOR
            ));
          var i = this.root.querySelector(Ru.TRAILING_ACTION_SELECTOR);
          i && (this.trailingAction = e(i));
          var o = Jt(Jt({}, Ie.createAdapter(this)), {
            computeBoundingRect: function () {
              return n.foundation.getDimensions();
            },
          });
          this.rippleSurface = t(this.root, new ye(o));
        }),
        (e.prototype.initialSyncWithDOM = function () {
          var t = this;
          (this.handleTrailingActionInteraction = function () {
            t.foundation.handleTrailingActionInteraction();
          }),
            (this.handleTrailingActionNavigation = function (e) {
              t.foundation.handleTrailingActionNavigation(e);
            }),
            (this.handleClick = function () {
              t.foundation.handleClick();
            }),
            (this.handleKeydown = function (e) {
              t.foundation.handleKeydown(e);
            }),
            (this.handleTransitionEnd = function (e) {
              t.foundation.handleTransitionEnd(e);
            }),
            (this.handleFocusIn = function (e) {
              t.foundation.handleFocusIn(e);
            }),
            (this.handleFocusOut = function (e) {
              t.foundation.handleFocusOut(e);
            }),
            this.listen("transitionend", this.handleTransitionEnd),
            this.listen("click", this.handleClick),
            this.listen("keydown", this.handleKeydown),
            this.listen("focusin", this.handleFocusIn),
            this.listen("focusout", this.handleFocusOut),
            this.trailingAction &&
              (this.listen(
                Lu.INTERACTION_EVENT,
                this.handleTrailingActionInteraction
              ),
              this.listen(
                Lu.NAVIGATION_EVENT,
                this.handleTrailingActionNavigation
              ));
        }),
        (e.prototype.destroy = function () {
          this.rippleSurface.destroy(),
            this.unlisten("transitionend", this.handleTransitionEnd),
            this.unlisten("keydown", this.handleKeydown),
            this.unlisten("click", this.handleClick),
            this.unlisten("focusin", this.handleFocusIn),
            this.unlisten("focusout", this.handleFocusOut),
            this.trailingAction &&
              (this.unlisten(
                Lu.INTERACTION_EVENT,
                this.handleTrailingActionInteraction
              ),
              this.unlisten(
                Lu.NAVIGATION_EVENT,
                this.handleTrailingActionNavigation
              )),
            t.prototype.destroy.call(this);
        }),
        (e.prototype.beginExit = function () {
          this.foundation.beginExit();
        }),
        (e.prototype.getDefaultFoundation = function () {
          var t = this,
            e = {
              addClass: function (e) {
                return t.root.classList.add(e);
              },
              addClassToLeadingIcon: function (e) {
                t.leadingIcon && t.leadingIcon.classList.add(e);
              },
              eventTargetHasClass: function (t, e) {
                return !!t && t.classList.contains(e);
              },
              focusPrimaryAction: function () {
                t.primaryAction && t.primaryAction.focus();
              },
              focusTrailingAction: function () {
                t.trailingAction && t.trailingAction.focus();
              },
              getAttribute: function (e) {
                return t.root.getAttribute(e);
              },
              getCheckmarkBoundingClientRect: function () {
                return t.checkmark ? t.checkmark.getBoundingClientRect() : null;
              },
              getComputedStyleValue: function (e) {
                return window.getComputedStyle(t.root).getPropertyValue(e);
              },
              getRootBoundingClientRect: function () {
                return t.root.getBoundingClientRect();
              },
              hasClass: function (e) {
                return t.root.classList.contains(e);
              },
              hasLeadingIcon: function () {
                return !!t.leadingIcon;
              },
              isRTL: function () {
                return (
                  "rtl" ===
                  window.getComputedStyle(t.root).getPropertyValue("direction")
                );
              },
              isTrailingActionNavigable: function () {
                return !!t.trailingAction && t.trailingAction.isNavigable();
              },
              notifyInteraction: function () {
                return t.emit(Ru.INTERACTION_EVENT, { chipId: t.id }, !0);
              },
              notifyNavigation: function (e, n) {
                return t.emit(
                  Ru.NAVIGATION_EVENT,
                  { chipId: t.id, key: e, source: n },
                  !0
                );
              },
              notifyRemoval: function (e) {
                t.emit(
                  Ru.REMOVAL_EVENT,
                  { chipId: t.id, removedAnnouncement: e },
                  !0
                );
              },
              notifySelection: function (e, n) {
                return t.emit(
                  Ru.SELECTION_EVENT,
                  { chipId: t.id, selected: e, shouldIgnore: n },
                  !0
                );
              },
              notifyTrailingIconInteraction: function () {
                return t.emit(
                  Ru.TRAILING_ICON_INTERACTION_EVENT,
                  { chipId: t.id },
                  !0
                );
              },
              notifyEditStart: function () {},
              notifyEditFinish: function () {},
              removeClass: function (e) {
                return t.root.classList.remove(e);
              },
              removeClassFromLeadingIcon: function (e) {
                t.leadingIcon && t.leadingIcon.classList.remove(e);
              },
              removeTrailingActionFocus: function () {
                t.trailingAction && t.trailingAction.removeFocus();
              },
              setPrimaryActionAttr: function (e, n) {
                t.primaryAction && t.primaryAction.setAttribute(e, n);
              },
              setStyleProperty: function (e, n) {
                return t.root.style.setProperty(e, n);
              },
            };
          return new Uu(e);
        }),
        (e.prototype.setSelectedFromChipSet = function (t, e) {
          this.foundation.setSelectedFromChipSet(t, e);
        }),
        (e.prototype.focusPrimaryAction = function () {
          this.foundation.focusPrimaryAction();
        }),
        (e.prototype.focusTrailingAction = function () {
          this.foundation.focusTrailingAction();
        }),
        (e.prototype.removeFocus = function () {
          this.foundation.removeFocus();
        }),
        (e.prototype.remove = function () {
          var t = this.root.parentNode;
          null !== t && t.removeChild(this.root);
        }),
        e
      );
    })(re),
    Bu = { CHIP_SELECTOR: ".mdc-chip" },
    Vu = { CHOICE: "mdc-chip-set--choice", FILTER: "mdc-chip-set--filter" },
    ju = (function (t) {
      function e(n) {
        var i = t.call(this, Jt(Jt({}, e.defaultAdapter), n)) || this;
        return (i.selectedChipIds = []), i;
      }
      return (
        Qt(e, t),
        Object.defineProperty(e, "strings", {
          get: function () {
            return Bu;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "cssClasses", {
          get: function () {
            return Vu;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e, "defaultAdapter", {
          get: function () {
            return {
              announceMessage: function () {},
              focusChipPrimaryActionAtIndex: function () {},
              focusChipTrailingActionAtIndex: function () {},
              getChipListCount: function () {
                return -1;
              },
              getIndexOfChipById: function () {
                return -1;
              },
              hasClass: function () {
                return !1;
              },
              isRTL: function () {
                return !1;
              },
              removeChipAtIndex: function () {},
              removeFocusFromChipAtIndex: function () {},
              selectChipAtIndex: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.getSelectedChipIds = function () {
          return this.selectedChipIds.slice();
        }),
        (e.prototype.select = function (t) {
          this.selectImpl(t, !1);
        }),
        (e.prototype.handleChipInteraction = function (t) {
          var e = t.chipId,
            n = this.adapter.getIndexOfChipById(e);
          this.removeFocusFromChipsExcept(n),
            (this.adapter.hasClass(Vu.CHOICE) ||
              this.adapter.hasClass(Vu.FILTER)) &&
              this.toggleSelect(e);
        }),
        (e.prototype.handleChipSelection = function (t) {
          var e = t.chipId,
            n = t.selected;
          if (!t.shouldIgnore) {
            var i = this.selectedChipIds.indexOf(e) >= 0;
            n && !i ? this.select(e) : !n && i && this.deselectImpl(e);
          }
        }),
        (e.prototype.handleChipRemoval = function (t) {
          var e = t.chipId,
            n = t.removedAnnouncement;
          n && this.adapter.announceMessage(n);
          var i = this.adapter.getIndexOfChipById(e);
          this.deselectAndNotifyClients(e), this.adapter.removeChipAtIndex(i);
          var o = this.adapter.getChipListCount() - 1;
          if (!(o < 0)) {
            var r = Math.min(i, o);
            this.removeFocusFromChipsExcept(r),
              this.adapter.focusChipTrailingActionAtIndex(r);
          }
        }),
        (e.prototype.handleChipNavigation = function (t) {
          var e = t.chipId,
            n = t.key,
            i = t.source,
            o = this.adapter.getChipListCount() - 1,
            r = this.adapter.getIndexOfChipById(e);
          if (-1 !== r && Mu.has(n)) {
            var s = this.adapter.isRTL();
            (!s && (n === Ru.ARROW_RIGHT_KEY || n === Ru.IE_ARROW_RIGHT_KEY)) ||
            (s && (n === Ru.ARROW_LEFT_KEY || n === Ru.IE_ARROW_LEFT_KEY)) ||
            n === Ru.ARROW_DOWN_KEY ||
            n === Ru.IE_ARROW_DOWN_KEY
              ? r++
              : n === Ru.HOME_KEY
              ? (r = 0)
              : n === Ru.END_KEY
              ? (r = o)
              : r--,
              r < 0 ||
                r > o ||
                (this.removeFocusFromChipsExcept(r),
                this.focusChipAction(r, n, i));
          }
        }),
        (e.prototype.focusChipAction = function (t, e, n) {
          var i = Fu.has(e);
          if (i && n === Ou.PRIMARY)
            return this.adapter.focusChipPrimaryActionAtIndex(t);
          if (i && n === Ou.TRAILING)
            return this.adapter.focusChipTrailingActionAtIndex(t);
          var o = this.getDirection(e);
          return o === Tu.LEFT
            ? this.adapter.focusChipTrailingActionAtIndex(t)
            : o === Tu.RIGHT
            ? this.adapter.focusChipPrimaryActionAtIndex(t)
            : void 0;
        }),
        (e.prototype.getDirection = function (t) {
          var e = this.adapter.isRTL();
          return (!e &&
            (t === Ru.ARROW_LEFT_KEY || t === Ru.IE_ARROW_LEFT_KEY)) ||
            (e && (t === Ru.ARROW_RIGHT_KEY || t === Ru.IE_ARROW_RIGHT_KEY))
            ? Tu.LEFT
            : Tu.RIGHT;
        }),
        (e.prototype.deselectImpl = function (t, e) {
          void 0 === e && (e = !1);
          var n = this.selectedChipIds.indexOf(t);
          if (n >= 0) {
            this.selectedChipIds.splice(n, 1);
            var i = this.adapter.getIndexOfChipById(t);
            this.adapter.selectChipAtIndex(i, !1, e);
          }
        }),
        (e.prototype.deselectAndNotifyClients = function (t) {
          this.deselectImpl(t, !0);
        }),
        (e.prototype.toggleSelect = function (t) {
          this.selectedChipIds.indexOf(t) >= 0
            ? this.deselectAndNotifyClients(t)
            : this.selectAndNotifyClients(t);
        }),
        (e.prototype.removeFocusFromChipsExcept = function (t) {
          for (var e = this.adapter.getChipListCount(), n = 0; n < e; n++)
            n !== t && this.adapter.removeFocusFromChipAtIndex(n);
        }),
        (e.prototype.selectAndNotifyClients = function (t) {
          this.selectImpl(t, !0);
        }),
        (e.prototype.selectImpl = function (t, e) {
          if (!(this.selectedChipIds.indexOf(t) >= 0)) {
            if (
              this.adapter.hasClass(Vu.CHOICE) &&
              this.selectedChipIds.length > 0
            ) {
              var n = this.selectedChipIds[0],
                i = this.adapter.getIndexOfChipById(n);
              (this.selectedChipIds = []),
                this.adapter.selectChipAtIndex(i, !1, e);
            }
            this.selectedChipIds.push(t);
            var o = this.adapter.getIndexOfChipById(t);
            this.adapter.selectChipAtIndex(o, !0, e);
          }
        }),
        e
      );
    })(oe),
    Ku = Uu.strings,
    Gu = Ku.INTERACTION_EVENT,
    Wu = Ku.SELECTION_EVENT,
    zu = Ku.REMOVAL_EVENT,
    qu = Ku.NAVIGATION_EVENT,
    Yu = ju.strings.CHIP_SELECTOR,
    Xu = 0,
    Qu = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        Qt(e, t),
        (e.attachTo = function (t) {
          return new e(t);
        }),
        Object.defineProperty(e.prototype, "chips", {
          get: function () {
            return this.chipsList.slice();
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "selectedChipIds", {
          get: function () {
            return this.foundation.getSelectedChipIds();
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.initialize = function (t) {
          void 0 === t &&
            (t = function (t) {
              return new Hu(t);
            }),
            (this.chipFactory = t),
            (this.chipsList = this.instantiateChips(this.chipFactory));
        }),
        (e.prototype.initialSyncWithDOM = function () {
          var t,
            e,
            n = this;
          try {
            for (
              var i = ee(this.chipsList), o = i.next();
              !o.done;
              o = i.next()
            ) {
              var r = o.value;
              r.id && r.selected && this.foundation.select(r.id);
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              o && !o.done && (e = i.return) && e.call(i);
            } finally {
              if (t) throw t.error;
            }
          }
          (this.handleChipInteraction = function (t) {
            return n.foundation.handleChipInteraction(t.detail);
          }),
            (this.handleChipSelection = function (t) {
              return n.foundation.handleChipSelection(t.detail);
            }),
            (this.handleChipRemoval = function (t) {
              return n.foundation.handleChipRemoval(t.detail);
            }),
            (this.handleChipNavigation = function (t) {
              return n.foundation.handleChipNavigation(t.detail);
            }),
            this.listen(Gu, this.handleChipInteraction),
            this.listen(Wu, this.handleChipSelection),
            this.listen(zu, this.handleChipRemoval),
            this.listen(qu, this.handleChipNavigation);
        }),
        (e.prototype.destroy = function () {
          var e, n;
          try {
            for (
              var i = ee(this.chipsList), o = i.next();
              !o.done;
              o = i.next()
            ) {
              o.value.destroy();
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              o && !o.done && (n = i.return) && n.call(i);
            } finally {
              if (e) throw e.error;
            }
          }
          this.unlisten(Gu, this.handleChipInteraction),
            this.unlisten(Wu, this.handleChipSelection),
            this.unlisten(zu, this.handleChipRemoval),
            this.unlisten(qu, this.handleChipNavigation),
            t.prototype.destroy.call(this);
        }),
        (e.prototype.addChip = function (t) {
          (t.id = t.id || "mdc-chip-" + ++Xu),
            this.chipsList.push(this.chipFactory(t));
        }),
        (e.prototype.getDefaultFoundation = function () {
          var t = this;
          return new ju({
            announceMessage: function (t) {
              !(function (t, e) {
                Su.getInstance().say(t, e);
              })(t);
            },
            focusChipPrimaryActionAtIndex: function (e) {
              t.chipsList[e].focusPrimaryAction();
            },
            focusChipTrailingActionAtIndex: function (e) {
              t.chipsList[e].focusTrailingAction();
            },
            getChipListCount: function () {
              return t.chips.length;
            },
            getIndexOfChipById: function (e) {
              return t.findChipIndex(e);
            },
            hasClass: function (e) {
              return t.root.classList.contains(e);
            },
            isRTL: function () {
              return (
                "rtl" ===
                window.getComputedStyle(t.root).getPropertyValue("direction")
              );
            },
            removeChipAtIndex: function (e) {
              e >= 0 &&
                e < t.chips.length &&
                (t.chipsList[e].destroy(),
                t.chipsList[e].remove(),
                t.chipsList.splice(e, 1));
            },
            removeFocusFromChipAtIndex: function (e) {
              t.chipsList[e].removeFocus();
            },
            selectChipAtIndex: function (e, n, i) {
              e >= 0 &&
                e < t.chips.length &&
                t.chipsList[e].setSelectedFromChipSet(n, i);
            },
          });
        }),
        (e.prototype.instantiateChips = function (t) {
          return [].slice
            .call(this.root.querySelectorAll(Yu))
            .map(function (e) {
              return (e.id = e.id || "mdc-chip-" + ++Xu), t(e);
            });
        }),
        (e.prototype.findChipIndex = function (t) {
          for (var e = 0; e < this.chips.length; e++)
            if (this.chipsList[e].id === t) return e;
          return -1;
        }),
        e
      );
    })(re),
    Ju = Object.freeze({
      __proto__: null,
      trailingActionStrings: Lu,
      MDCChipTrailingAction: Nu,
      MDCChipTrailingActionFoundation: wu,
      chipCssClasses: Du,
      chipStrings: Ru,
      MDCChip: Hu,
      MDCChipFoundation: Uu,
      chipSetCssClasses: Vu,
      chipSetStrings: Bu,
      MDCChipSet: Qu,
      MDCChipSetFoundation: ju,
    });
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ function Zu(t) {
    let e;
    return {
      c() {
        (e = N("div")), U(e, "class", "mdc-chip__ripple");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function td(t) {
    let e;
    return {
      c() {
        (e = N("div")), U(e, "class", "mdc-chip__touch");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function ed(t) {
    let e,
      n,
      i,
      o,
      r = t[3] && !t[13] && Zu();
    const s = t[31].default,
      a = c(s, t, t[44], null);
    let l = t[4] && td();
    return {
      c() {
        r && r.c(), (e = M()), a && a.c(), (n = M()), l && l.c(), (i = F());
      },
      m(t, s) {
        r && r.m(t, s),
          O(t, e, s),
          a && a.m(t, s),
          O(t, n, s),
          l && l.m(t, s),
          O(t, i, s),
          (o = !0);
      },
      p(t, n) {
        t[3] && !t[13]
          ? r || ((r = Zu()), r.c(), r.m(e.parentNode, e))
          : r && (r.d(1), (r = null)),
          a &&
            a.p &&
            (!o || 8192 & n[1]) &&
            p(a, s, t, t[44], o ? d(s, t[44], n, null) : f(t[44]), null),
          t[4]
            ? l || ((l = td()), l.c(), l.m(i.parentNode, i))
            : l && (l.d(1), (l = null));
      },
      i(t) {
        o || (Tt(a, t), (o = !0));
      },
      o(t) {
        Ot(a, t), (o = !1);
      },
      d(t) {
        r && r.d(t), t && L(e), a && a.d(t), t && L(n), l && l.d(t), t && L(i);
      },
    };
  }
  function nd(t) {
    let e, i, o;
    const r = [
      {
        use: [
          [
            Wi,
            {
              ripple: t[3] && !t[13],
              unbounded: !1,
              addClass: t[22],
              removeClass: t[23],
              addStyle: t[24],
            },
          ],
          t[14],
          ...t[0],
        ],
      },
      {
        class: Oe({
          [t[1]]: !0,
          "mdc-chip": !0,
          "mdc-chip--selected": t[7],
          "mdc-chip--touch": t[4],
          ...t[9],
        }),
      },
      { style: Object.entries(t[10]).map(id).concat([t[2]]).join(" ") },
      { role: "row" },
      t[25],
    ];
    var s = t[5];
    function a(t) {
      let e = { $$slots: { default: [ed] }, $$scope: { ctx: t } };
      for (let t = 0; t < r.length; t += 1) e = n(e, r[t]);
      return { props: e };
    }
    return (
      s &&
        ((e = new s(a(t))),
        t[32](e),
        e.$on("transitionend", t[33]),
        e.$on("click", t[34]),
        e.$on("keydown", t[35]),
        e.$on("focusin", t[36]),
        e.$on("focusout", t[37]),
        e.$on("SMUIChipTrailingAction:interaction", t[38]),
        e.$on("SMUIChipTrailingAction:navigation", t[39]),
        e.$on("SMUIChipsChipPrimaryAction:mount", t[40]),
        e.$on("SMUIChipsChipPrimaryAction:unmount", t[41]),
        e.$on("SMUIChipsChipTrailingAction:mount", t[42]),
        e.$on("SMUIChipsChipTrailingAction:unmount", t[43])),
      {
        c() {
          e && Pt(e.$$.fragment), (i = F());
        },
        m(t, n) {
          e && Ut(e, t, n), O(t, i, n), (o = !0);
        },
        p(t, n) {
          const o =
            62940831 & n[0]
              ? Mt(r, [
                  29384713 & n[0] && {
                    use: [
                      [
                        Wi,
                        {
                          ripple: t[3] && !t[13],
                          unbounded: !1,
                          addClass: t[22],
                          removeClass: t[23],
                          addStyle: t[24],
                        },
                      ],
                      t[14],
                      ...t[0],
                    ],
                  },
                  658 & n[0] && {
                    class: Oe({
                      [t[1]]: !0,
                      "mdc-chip": !0,
                      "mdc-chip--selected": t[7],
                      "mdc-chip--touch": t[4],
                      ...t[9],
                    }),
                  },
                  1028 & n[0] && {
                    style: Object.entries(t[10])
                      .map(id)
                      .concat([t[2]])
                      .join(" "),
                  },
                  r[3],
                  33554432 & n[0] && Ft(t[25]),
                ])
              : {};
          if (
            ((8216 & n[0]) | (8192 & n[1]) &&
              (o.$$scope = { dirty: n, ctx: t }),
            s !== (s = t[5]))
          ) {
            if (e) {
              xt();
              const t = e;
              Ot(t.$$.fragment, 1, 0, () => {
                Ht(t, 1);
              }),
                St();
            }
            s
              ? ((e = new s(a(t))),
                t[32](e),
                e.$on("transitionend", t[33]),
                e.$on("click", t[34]),
                e.$on("keydown", t[35]),
                e.$on("focusin", t[36]),
                e.$on("focusout", t[37]),
                e.$on("SMUIChipTrailingAction:interaction", t[38]),
                e.$on("SMUIChipTrailingAction:navigation", t[39]),
                e.$on("SMUIChipsChipPrimaryAction:mount", t[40]),
                e.$on("SMUIChipsChipPrimaryAction:unmount", t[41]),
                e.$on("SMUIChipsChipTrailingAction:mount", t[42]),
                e.$on("SMUIChipsChipTrailingAction:unmount", t[43]),
                Pt(e.$$.fragment),
                Tt(e.$$.fragment, 1),
                Ut(e, i.parentNode, i))
              : (e = null);
          } else s && e.$set(o);
        },
        i(t) {
          o || (e && Tt(e.$$.fragment, t), (o = !0));
        },
        o(t) {
          e && Ot(e.$$.fragment, t), (o = !1);
        },
        d(n) {
          t[32](null), n && L(i), e && Ht(e, n);
        },
      }
    );
  }
  const id = ([t, e]) => `${t}: ${e};`;
  function od(t, e, i) {
    const o = [
      "use",
      "class",
      "style",
      "chip",
      "ripple",
      "touch",
      "shouldRemoveOnTrailingIconClick",
      "shouldFocusPrimaryActionOnClick",
      "component",
      "getElement",
    ];
    let r,
      s,
      a,
      c,
      u,
      d,
      p,
      f = m(e, o),
      { $$slots: g = {}, $$scope: $ } = e;
    const { MDCChipFoundation: I } = Ju,
      v = De(tt());
    let E,
      b,
      { use: A = [] } = e,
      { class: C = "" } = e,
      { style: _ = "" } = e,
      { chip: x } = e,
      { ripple: S = !0 } = e,
      { touch: T = !1 } = e,
      { shouldRemoveOnTrailingIconClick: O = !0 } = e,
      { shouldFocusPrimaryActionOnClick: L = !0 } = e,
      w = {},
      N = {},
      R = {};
    const D = rt("SMUI:chips:chip:initialSelected");
    l(t, D, (t) => i(50, (d = t)));
    let M,
      F,
      k = d;
    const P = rt("SMUI:chips:nonInteractive");
    l(t, P, (t) => i(13, (p = t)));
    const U = rt("SMUI:chips:choice");
    l(t, U, (t) => i(46, (s = t)));
    const H = rt("SMUI:chips:chip:index");
    l(t, H, (t) => i(45, (r = t)));
    let { component: B = Cn } = e;
    const V = Te(O);
    l(t, V, (t) => i(49, (u = t))),
      ot("SMUI:chips:chip:shouldRemoveOnTrailingIconClick", V);
    const j = Te(k);
    l(t, j, (t) => i(48, (c = t))), ot("SMUI:chips:chip:isSelected", j);
    const K = Te(N);
    if (
      (l(t, K, (t) => i(47, (a = t))),
      ot("SMUI:chips:chip:leadingIconClasses", K),
      ot("SMUI:chips:chip:focusable", (s && k) || 0 === r),
      !x)
    )
      throw new Error(
        "The chip property is required! It should be passed down from the Set to the Chip."
      );
    function G(t) {
      return t in w ? w[t] : st().classList.contains(t);
    }
    function W(t) {
      w[t] || i(9, (w[t] = !0), w);
    }
    function z(t) {
      (t in w && !w[t]) || i(9, (w[t] = !1), w);
    }
    function q(t) {
      N[t] || i(30, (N[t] = !0), N);
    }
    function Y(t) {
      (t in N && !N[t]) || i(30, (N[t] = !1), N);
    }
    function X(t, e) {
      R[t] != e &&
        ("" === e || null == e
          ? (delete R[t], i(10, R))
          : i(10, (R[t] = e), R));
    }
    function Q(t) {
      return t in R ? R[t] : getComputedStyle(st()).getPropertyValue(t);
    }
    function J(t, e) {
      i(7, (k = t)), b.setSelectedFromChipSet(k, e);
    }
    function Z() {
      b.focusPrimaryAction();
    }
    function nt() {
      b.focusTrailingAction();
    }
    function it() {
      b.removeFocus();
    }
    function st() {
      return E.getElement();
    }
    et(() => {
      i(
        6,
        (b = new I({
          addClass: W,
          addClassToLeadingIcon: q,
          eventTargetHasClass: (t, e) =>
            !(!t || !("classList" in t)) && t.classList.contains(e),
          focusPrimaryAction: () => {
            M && M.focus();
          },
          focusTrailingAction: () => {
            F && F.focus();
          },
          getAttribute: (t) => st().getAttribute(t),
          getCheckmarkBoundingClientRect: () => {
            const t = st().querySelector(".mdc-chip__checkmark");
            return t ? t.getBoundingClientRect() : null;
          },
          getComputedStyleValue: Q,
          getRootBoundingClientRect: () => st().getBoundingClientRect(),
          hasClass: G,
          hasLeadingIcon: () =>
            !!st().querySelector(".mdc-chip__icon--leading"),
          isRTL: () =>
            "rtl" === getComputedStyle(st()).getPropertyValue("direction"),
          isTrailingActionNavigable: () => !!F && F.isNavigable(),
          notifyInteraction: () =>
            Le(st(), "SMUIChip:interaction", { chipId: x }, void 0, !0),
          notifyNavigation: (t, e) =>
            Le(
              st(),
              "SMUIChip:navigation",
              { chipId: x, key: t, source: e },
              void 0,
              !0
            ),
          notifyRemoval: (t) => {
            Le(
              st(),
              "SMUIChip:removal",
              { chipId: x, removedAnnouncement: t },
              void 0,
              !0
            );
          },
          notifySelection: (t, e) =>
            Le(
              st(),
              "SMUIChip:selection",
              { chipId: x, selected: t, shouldIgnore: e },
              void 0,
              !0
            ),
          notifyTrailingIconInteraction: () =>
            Le(
              st(),
              "SMUIChip:trailingIconInteraction",
              { chipId: x },
              void 0,
              !0
            ),
          notifyEditStart: () => {},
          notifyEditFinish: () => {},
          removeClass: z,
          removeClassFromLeadingIcon: Y,
          removeTrailingActionFocus: () => {
            F && F.removeFocus();
          },
          setPrimaryActionAttr: (t, e) => {
            M && M.addAttr(t, e);
          },
          setStyleProperty: X,
        }))
      );
      const t = {
        chipId: x,
        get selected() {
          return k;
        },
        focusPrimaryAction: Z,
        focusTrailingAction: nt,
        removeFocus: it,
        setSelectedFromChipSet: J,
      };
      return (
        Le(st(), "SMUIChipsChip:mount", t),
        b.init(),
        () => {
          Le(st(), "SMUIChipsChip:unmount", t), b.destroy();
        }
      );
    });
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(25, (f = m(e, o))),
          "use" in t && i(0, (A = t.use)),
          "class" in t && i(1, (C = t.class)),
          "style" in t && i(2, (_ = t.style)),
          "chip" in t && i(26, (x = t.chip)),
          "ripple" in t && i(3, (S = t.ripple)),
          "touch" in t && i(4, (T = t.touch)),
          "shouldRemoveOnTrailingIconClick" in t &&
            i(27, (O = t.shouldRemoveOnTrailingIconClick)),
          "shouldFocusPrimaryActionOnClick" in t &&
            i(28, (L = t.shouldFocusPrimaryActionOnClick)),
          "component" in t && i(5, (B = t.component)),
          "$$scope" in t && i(44, ($ = t.$$scope));
      }),
      (t.$$.update = () => {
        134217728 & t.$$.dirty[0] && y(V, (u = O), u),
          128 & t.$$.dirty[0] && y(j, (c = k), c),
          1073741824 & t.$$.dirty[0] && y(K, (a = N), a),
          134217792 & t.$$.dirty[0] &&
            b &&
            b.getShouldRemoveOnTrailingIconClick() !== O &&
            b.setShouldRemoveOnTrailingIconClick(O),
          268435520 & t.$$.dirty[0] &&
            b &&
            b.setShouldFocusPrimaryActionOnClick(L);
      }),
      [
        A,
        C,
        _,
        S,
        T,
        B,
        b,
        k,
        E,
        w,
        R,
        M,
        F,
        p,
        v,
        D,
        P,
        U,
        H,
        V,
        j,
        K,
        W,
        z,
        X,
        f,
        x,
        O,
        L,
        st,
        N,
        g,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (E = t), i(8, E);
          });
        },
        (t) => b && b.handleTransitionEnd(t),
        () => b && b.handleClick(),
        (t) => b && b.handleKeydown(t),
        (t) => b && b.handleFocusIn(t),
        (t) => b && b.handleFocusOut(t),
        () => b && b.handleTrailingActionInteraction(),
        (t) => b && b.handleTrailingActionNavigation(t),
        (t) => i(11, (M = t.detail)),
        () => i(11, (M = void 0)),
        (t) => i(12, (F = t.detail)),
        () => i(12, (F = void 0)),
        $,
      ]
    );
  }
  class rd extends Vt {
    constructor(t) {
      super(),
        Bt(
          this,
          t,
          od,
          nd,
          a,
          {
            use: 0,
            class: 1,
            style: 2,
            chip: 26,
            ripple: 3,
            touch: 4,
            shouldRemoveOnTrailingIconClick: 27,
            shouldFocusPrimaryActionOnClick: 28,
            component: 5,
            getElement: 29,
          },
          null,
          [-1, -1]
        );
    }
    get getElement() {
      return this.$$.ctx[29];
    }
  }
  function sd(e) {
    let i,
      o,
      r,
      a,
      l,
      c,
      u,
      d = [
        { class: (a = Oe({ [e[1]]: !0, "mdc-chip__checkmark": !0 })) },
        e[3],
      ],
      p = {};
    for (let t = 0; t < d.length; t += 1) p = n(p, d[t]);
    return {
      c() {
        (i = N("span")),
          (o = R("svg")),
          (r = R("path")),
          U(r, "class", "mdc-chip__checkmark-path"),
          U(r, "fill", "none"),
          U(r, "stroke", "black"),
          U(r, "d", "M1.73,12.91 8.1,19.28 22.79,4.59"),
          U(o, "class", "mdc-chip__checkmark-svg"),
          U(o, "viewBox", "-2 -3 30 30"),
          H(i, p);
      },
      m(t, n) {
        O(t, i, n),
          x(i, o),
          x(o, r),
          e[5](i),
          c || ((u = I((l = Fe.call(null, i, e[0])))), (c = !0));
      },
      p(t, [e]) {
        H(
          i,
          (p = Mt(d, [
            2 & e &&
              a !== (a = Oe({ [t[1]]: !0, "mdc-chip__checkmark": !0 })) && {
                class: a,
              },
            8 & e && t[3],
          ]))
        ),
          l && s(l.update) && 1 & e && l.update.call(null, t[0]);
      },
      i: t,
      o: t,
      d(t) {
        t && L(i), e[5](null), (c = !1), u();
      },
    };
  }
  function ad(t, e, i) {
    const o = ["use", "class", "getElement"];
    let r,
      s = m(e, o),
      { use: a = [] } = e,
      { class: l = "" } = e;
    return (
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(3, (s = m(e, o))),
          "use" in t && i(0, (a = t.use)),
          "class" in t && i(1, (l = t.class));
      }),
      [
        a,
        l,
        r,
        s,
        function () {
          return r;
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (r = t), i(2, r);
          });
        },
      ]
    );
  }
  class ld extends Vt {
    constructor(t) {
      super(), Bt(this, t, ad, sd, a, { use: 0, class: 1, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function cd(t) {
    let e, n;
    return (
      (e = new ld({ props: {} })),
      t[22](e),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          e.$set({});
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(n) {
          t[22](null), Ht(e, n);
        },
      }
    );
  }
  function ud(t) {
    let e, i, o, r, s;
    const a = t[21].default,
      l = c(a, t, t[20], null);
    let u = [
        { class: (o = Oe({ [t[1]]: !0, "mdc-chip__primary-action": !0 })) },
        { role: (r = t[7] ? "checkbox" : t[9] ? "radio" : "button") },
        t[7] || t[9] ? { "aria-selected": t[10] ? "true" : "false" } : {},
        { tabindex: t[2] },
        t[6],
        t[16],
      ],
      h = {};
    for (let t = 0; t < u.length; t += 1) h = n(h, u[t]);
    return {
      c() {
        (e = N("span")),
          (i = N("span")),
          l && l.c(),
          U(i, "class", "mdc-chip__text"),
          H(e, h);
      },
      m(n, o) {
        O(n, e, o), x(e, i), l && l.m(i, null), t[23](e), (s = !0);
      },
      p(t, n) {
        l &&
          l.p &&
          (!s || 1048576 & n) &&
          p(l, a, t, t[20], s ? d(a, t[20], n, null) : f(t[20]), null),
          H(
            e,
            (h = Mt(u, [
              (!s ||
                (2 & n &&
                  o !==
                    (o = Oe({
                      [t[1]]: !0,
                      "mdc-chip__primary-action": !0,
                    })))) && { class: o },
              (!s ||
                (640 & n &&
                  r !==
                    (r = t[7] ? "checkbox" : t[9] ? "radio" : "button"))) && {
                role: r,
              },
              1664 & n &&
                (t[7] || t[9]
                  ? { "aria-selected": t[10] ? "true" : "false" }
                  : {}),
              (!s || 4 & n) && { tabindex: t[2] },
              64 & n && t[6],
              65536 & n && t[16],
            ]))
          );
      },
      i(t) {
        s || (Tt(l, t), (s = !0));
      },
      o(t) {
        Ot(l, t), (s = !1);
      },
      d(n) {
        n && L(e), l && l.d(n), t[23](null);
      },
    };
  }
  function dd(t) {
    let e, n;
    const i = t[21].default,
      o = c(i, t, t[20], null);
    return {
      c() {
        (e = N("span")), o && o.c(), U(e, "class", "mdc-chip__text");
      },
      m(t, i) {
        O(t, e, i), o && o.m(e, null), (n = !0);
      },
      p(t, e) {
        o &&
          o.p &&
          (!n || 1048576 & e) &&
          p(o, i, t, t[20], n ? d(i, t[20], e, null) : f(t[20]), null);
      },
      i(t) {
        n || (Tt(o, t), (n = !0));
      },
      o(t) {
        Ot(o, t), (n = !1);
      },
      d(t) {
        t && L(e), o && o.d(t);
      },
    };
  }
  function pd(t) {
    let e,
      n,
      i,
      o,
      a,
      l,
      c,
      u,
      d = t[7] && cd(t);
    const p = [dd, ud],
      f = [];
    function h(t, e) {
      return t[8] ? 0 : 1;
    }
    return (
      (i = h(t)),
      (o = f[i] = p[i](t)),
      {
        c() {
          d && d.c(),
            (e = M()),
            (n = N("span")),
            o.c(),
            U(n, "role", "gridcell");
        },
        m(o, r) {
          d && d.m(o, r),
            O(o, e, r),
            O(o, n, r),
            f[i].m(n, null),
            t[24](n),
            (l = !0),
            c ||
              ((u = [I((a = Fe.call(null, n, t[0]))), I(t[11].call(null, n))]),
              (c = !0));
        },
        p(t, [r]) {
          t[7]
            ? d
              ? (d.p(t, r), 128 & r && Tt(d, 1))
              : ((d = cd(t)), d.c(), Tt(d, 1), d.m(e.parentNode, e))
            : d &&
              (xt(),
              Ot(d, 1, 1, () => {
                d = null;
              }),
              St());
          let l = i;
          (i = h(t)),
            i === l
              ? f[i].p(t, r)
              : (xt(),
                Ot(f[l], 1, 1, () => {
                  f[l] = null;
                }),
                St(),
                (o = f[i]),
                o ? o.p(t, r) : ((o = f[i] = p[i](t)), o.c()),
                Tt(o, 1),
                o.m(n, null)),
            a && s(a.update) && 1 & r && a.update.call(null, t[0]);
        },
        i(t) {
          l || (Tt(d), Tt(o), (l = !0));
        },
        o(t) {
          Ot(d), Ot(o), (l = !1);
        },
        d(o) {
          d && d.d(o),
            o && L(e),
            o && L(n),
            f[i].d(),
            t[24](null),
            (c = !1),
            r(u);
        },
      }
    );
  }
  function fd(t, e, i) {
    const o = ["use", "class", "tabindex", "focus", "getInput", "getElement"];
    let r,
      s,
      a,
      c,
      u = m(e, o),
      { $$slots: d = {}, $$scope: p } = e;
    const f = De(tt());
    let g,
      $,
      y,
      { use: I = [] } = e,
      { class: v = "" } = e,
      { tabindex: E = rt("SMUI:chips:chip:focusable") ? 0 : -1 } = e,
      b = {};
    const A = rt("SMUI:chips:nonInteractive");
    l(t, A, (t) => i(8, (s = t)));
    const C = rt("SMUI:chips:choice");
    l(t, C, (t) => i(9, (a = t)));
    const _ = rt("SMUI:chips:filter");
    l(t, _, (t) => i(7, (r = t)));
    const x = rt("SMUI:chips:chip:isSelected");
    function S(t, e) {
      b[t] !== e && i(6, (b[t] = e), b);
    }
    function T() {
      var t;
      (t = () => {
        y && y.focus();
      }),
        b.tabindex !== g.getAttribute("tabindex") ? ht().then(t) : t();
    }
    function O() {
      return g;
    }
    return (
      l(t, x, (t) => i(10, (c = t))),
      et(() => {
        let t = { focus: T, addAttr: S };
        return (
          Le(O(), "SMUIChipsChipPrimaryAction:mount", t),
          () => {
            Le(O(), "SMUIChipsChipPrimaryAction:unmount", t);
          }
        );
      }),
      (t.$$set = (t) => {
        (e = n(n({}, e), h(t))),
          i(16, (u = m(e, o))),
          "use" in t && i(0, (I = t.use)),
          "class" in t && i(1, (v = t.class)),
          "tabindex" in t && i(2, (E = t.tabindex)),
          "$$scope" in t && i(20, (p = t.$$scope));
      }),
      [
        I,
        v,
        E,
        g,
        $,
        y,
        b,
        r,
        s,
        a,
        c,
        f,
        A,
        C,
        _,
        x,
        u,
        T,
        function () {
          return $ && $.getElement();
        },
        O,
        p,
        d,
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            ($ = t), i(4, $);
          });
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (y = t), i(5, y);
          });
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (g = t), i(3, g);
          });
        },
      ]
    );
  }
  const hd = class extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, fd, pd, a, {
          use: 0,
          class: 1,
          tabindex: 2,
          focus: 17,
          getInput: 18,
          getElement: 19,
        });
    }
    get focus() {
      return this.$$.ctx[17];
    }
    get getInput() {
      return this.$$.ctx[18];
    }
    get getElement() {
      return this.$$.ctx[19];
    }
  };
  function md(t, e, n) {
    const i = t.slice();
    return (i[17] = e[n]), i;
  }
  function gd(t) {
    let e,
      n = t[17].label + "";
    return {
      c() {
        e = D(n);
      },
      m(t, n) {
        O(t, e, n);
      },
      p(t, i) {
        64 & i && n !== (n = t[17].label + "") && B(e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function $d(t) {
    let e, n, i, o, r, s, a;
    function l() {
      return t[11](t[17]);
    }
    return (
      (e = new hd({
        props: { $$slots: { default: [gd] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment),
            (n = M()),
            (i = N("div")),
            (i.innerHTML =
              '<span class="mdc-deprecated-chip-trailing-action__ripple"></span> \n            <span class="material-icons mdc-deprecated-chip-trailing-action__icon">cancel</span>'),
            (o = M()),
            U(
              i,
              "class",
              "mdc-deprecated-chip-trailing-action mdc-ripple-upgraded"
            );
        },
        m(t, c) {
          Ut(e, t, c),
            O(t, n, c),
            O(t, i, c),
            O(t, o, c),
            (r = !0),
            s || ((a = k(i, "click", P(l))), (s = !0));
        },
        p(n, i) {
          t = n;
          const o = {};
          1048640 & i && (o.$$scope = { dirty: i, ctx: t }), e.$set(o);
        },
        i(t) {
          r || (Tt(e.$$.fragment, t), (r = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (r = !1);
        },
        d(t) {
          Ht(e, t), t && L(n), t && L(i), t && L(o), (s = !1), a();
        },
      }
    );
  }
  function yd(t) {
    let e, n;
    return (
      (e = new rd({
        props: { chip: t[17], $$slots: { default: [$d] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          64 & n && (i.chip = t[17]),
            1048640 & n && (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function Id(t) {
    let e,
      n,
      i = t[6],
      o = [];
    for (let e = 0; e < i.length; e += 1) o[e] = yd(md(t, i, e));
    const r = (t) =>
      Ot(o[t], 1, 1, () => {
        o[t] = null;
      });
    return {
      c() {
        for (let t = 0; t < o.length; t += 1) o[t].c();
        e = F();
      },
      m(t, i) {
        for (let e = 0; e < o.length; e += 1) o[e].m(t, i);
        O(t, e, i), (n = !0);
      },
      p(t, n) {
        if (192 & n) {
          let s;
          for (i = t[6], s = 0; s < i.length; s += 1) {
            const r = md(t, i, s);
            o[s]
              ? (o[s].p(r, n), Tt(o[s], 1))
              : ((o[s] = yd(r)),
                o[s].c(),
                Tt(o[s], 1),
                o[s].m(e.parentNode, e));
          }
          for (xt(), s = i.length; s < o.length; s += 1) r(s);
          St();
        }
      },
      i(t) {
        if (!n) {
          for (let t = 0; t < i.length; t += 1) Tt(o[t]);
          n = !0;
        }
      },
      o(t) {
        o = o.filter(Boolean);
        for (let t = 0; t < o.length; t += 1) Ot(o[t]);
        n = !1;
      },
      d(t) {
        w(o, t), t && L(e);
      },
    };
  }
  function vd(t) {
    let e, n, i;
    function o(e) {
      t[12](e);
    }
    let r = {
      label: t[0],
      class: t[5] ? "has-values" : "",
      $$slots: { default: [Id] },
      $$scope: { ctx: t },
    };
    return (
      void 0 !== t[3] && (r.value = t[3]),
      (e = new gr({ props: r })),
      lt.push(() => kt(e, "value", o)),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, i) {
          const o = {};
          1 & i && (o.label = t[0]),
            32 & i && (o.class = t[5] ? "has-values" : ""),
            1048640 & i && (o.$$scope = { dirty: i, ctx: t }),
            !n && 8 & i && ((n = !0), (o.value = t[3]), gt(() => (n = !1))),
            e.$set(o);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function Ed(t) {
    let e;
    return {
      c() {
        e = D("check");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function bd(t) {
    let e,
      n = t[16].label + "";
    return {
      c() {
        e = D(n);
      },
      m(t, n) {
        O(t, e, n);
      },
      p(t, i) {
        65536 & i && n !== (n = t[16].label + "") && B(e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function Ad(t) {
    let e, n, i, o, r;
    return (
      (n = new Es({
        props: {
          class: "material-icons",
          $$slots: { default: [Ed] },
          $$scope: { ctx: t },
        },
      })),
      (o = new hs({
        props: { $$slots: { default: [bd] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          (e = N("span")),
            Pt(n.$$.fragment),
            (i = M()),
            Pt(o.$$.fragment),
            U(e, "slot", "match"),
            U(e, "class", "multiselect-menu-item-wrapper"),
            K(e, "selected", t[6].includes(t[16]));
        },
        m(t, s) {
          O(t, e, s), Ut(n, e, null), x(e, i), Ut(o, e, null), (r = !0);
        },
        p(t, i) {
          const r = {};
          1048576 & i && (r.$$scope = { dirty: i, ctx: t }), n.$set(r);
          const s = {};
          1114112 & i && (s.$$scope = { dirty: i, ctx: t }),
            o.$set(s),
            65600 & i && K(e, "selected", t[6].includes(t[16]));
        },
        i(t) {
          r || (Tt(n.$$.fragment, t), Tt(o.$$.fragment, t), (r = !0));
        },
        o(t) {
          Ot(n.$$.fragment, t), Ot(o.$$.fragment, t), (r = !1);
        },
        d(t) {
          t && L(e), Ht(n), Ht(o);
        },
      }
    );
  }
  function Cd(t) {
    let e, n, i, o;
    function r(e) {
      t[14](e);
    }
    let s = {
      options: t[1],
      label: t[0],
      getOptionLabel: _d,
      selectOnExactMatch: !1,
      $$slots: {
        match: [
          Ad,
          ({ match: t }) => ({ 16: t }),
          ({ match: t }) => (t ? 65536 : 0),
        ],
        default: [vd],
      },
      $$scope: { ctx: t },
    };
    return (
      void 0 !== t[4] && (s.value = t[4]),
      (n = new Cu({ props: s })),
      t[13](n),
      lt.push(() => kt(n, "value", r)),
      n.$on("SMUIAutocomplete:selected", t[8]),
      {
        c() {
          (e = N("div")),
            Pt(n.$$.fragment),
            U(e, "class", "multiselect svelte-ggzb6p");
        },
        m(t, i) {
          O(t, e, i), Ut(n, e, null), (o = !0);
        },
        p(t, [e]) {
          const o = {};
          2 & e && (o.options = t[1]),
            1 & e && (o.label = t[0]),
            1114217 & e && (o.$$scope = { dirty: e, ctx: t }),
            !i && 16 & e && ((i = !0), (o.value = t[4]), gt(() => (i = !1))),
            n.$set(o);
        },
        i(t) {
          o || (Tt(n.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(n.$$.fragment, t), (o = !1);
        },
        d(i) {
          i && L(e), t[13](null), Ht(n);
        },
      }
    );
  }
  function _d(t) {
    var e;
    return null !== (e = null == t ? void 0 : t.label) && void 0 !== e ? e : "";
  }
  function xd(t, e, n) {
    let i,
      o,
      { label: r = null } = e,
      { options: s = [] } = e,
      { value: a = [] } = e,
      { singleSelect: l = !1 } = e;
    const c = it();
    let u,
      d = "",
      p = null;
    function f(t) {
      const e = a.indexOf(t.value),
        i = e < 0;
      i ? a.push(t.value) : a.splice(e, 1),
        n(9, a),
        c("selectionChange", { option: t, selected: i });
    }
    return (
      (t.$$set = (t) => {
        "label" in t && n(0, (r = t.label)),
          "options" in t && n(1, (s = t.options)),
          "value" in t && n(9, (a = t.value)),
          "singleSelect" in t && n(10, (l = t.singleSelect));
      }),
      (t.$$.update = () => {
        512 & t.$$.dirty && null == a && n(9, (a = [])),
          514 & t.$$.dirty &&
            n(6, (i = a.map((t) => s.find((e) => e.value === t)))),
          512 & t.$$.dirty && n(5, (o = !!(null == a ? void 0 : a.length)));
      }),
      [
        r,
        s,
        u,
        d,
        p,
        o,
        i,
        f,
        function (t) {
          f(t.detail),
            n(3, (d = "")),
            n(4, (p = null)),
            u.focus(),
            l && u.blur();
        },
        a,
        l,
        (t) => f(t),
        function (t) {
          (d = t), n(3, d);
        },
        function (t) {
          lt[t ? "unshift" : "push"](() => {
            (u = t), n(2, u);
          });
        },
        function (t) {
          (p = t), n(4, p);
        },
      ]
    );
  }
  class Sd extends Vt {
    constructor(t) {
      super(),
        Bt(this, t, xd, Cd, a, {
          label: 0,
          options: 1,
          value: 9,
          singleSelect: 10,
        });
    }
  }
  function Td(t) {
    return Array.isArray ? Array.isArray(t) : "[object Array]" === Md(t);
  }
  function Od(t) {
    return "string" == typeof t;
  }
  function Ld(t) {
    return "number" == typeof t;
  }
  function wd(t) {
    return (
      !0 === t ||
      !1 === t ||
      ((function (t) {
        return Nd(t) && null !== t;
      })(t) &&
        "[object Boolean]" == Md(t))
    );
  }
  function Nd(t) {
    return "object" == typeof t;
  }
  function Rd(t) {
    return null != t;
  }
  function Dd(t) {
    return !t.trim().length;
  }
  function Md(t) {
    return null == t
      ? void 0 === t
        ? "[object Undefined]"
        : "[object Null]"
      : Object.prototype.toString.call(t);
  }
  const Fd = Object.prototype.hasOwnProperty;
  class kd {
    constructor(t) {
      (this._keys = []), (this._keyMap = {});
      let e = 0;
      t.forEach((t) => {
        let n = Pd(t);
        (e += n.weight),
          this._keys.push(n),
          (this._keyMap[n.id] = n),
          (e += n.weight);
      }),
        this._keys.forEach((t) => {
          t.weight /= e;
        });
    }
    get(t) {
      return this._keyMap[t];
    }
    keys() {
      return this._keys;
    }
    toJSON() {
      return JSON.stringify(this._keys);
    }
  }
  function Pd(t) {
    let e = null,
      n = null,
      i = null,
      o = 1,
      r = null;
    if (Od(t) || Td(t)) (i = t), (e = Ud(t)), (n = Hd(t));
    else {
      if (!Fd.call(t, "name"))
        throw new Error(((t) => `Missing ${t} property in key`)("name"));
      const s = t.name;
      if (((i = s), Fd.call(t, "weight") && ((o = t.weight), o <= 0)))
        throw new Error(
          ((t) => `Property 'weight' in key '${t}' must be a positive integer`)(
            s
          )
        );
      (e = Ud(s)), (n = Hd(s)), (r = t.getFn);
    }
    return { path: e, id: n, weight: o, src: i, getFn: r };
  }
  function Ud(t) {
    return Td(t) ? t : t.split(".");
  }
  function Hd(t) {
    return Td(t) ? t.join(".") : t;
  }
  var Bd = {
    isCaseSensitive: !1,
    includeScore: !1,
    keys: [],
    shouldSort: !0,
    sortFn: (t, e) =>
      t.score === e.score
        ? t.idx < e.idx
          ? -1
          : 1
        : t.score < e.score
        ? -1
        : 1,
    includeMatches: !1,
    findAllMatches: !1,
    minMatchCharLength: 1,
    location: 0,
    threshold: 0.6,
    distance: 100,
    ...{
      useExtendedSearch: !1,
      getFn: function (t, e) {
        let n = [],
          i = !1;
        const o = (t, e, r) => {
          if (Rd(t))
            if (e[r]) {
              const s = t[e[r]];
              if (!Rd(s)) return;
              if (r === e.length - 1 && (Od(s) || Ld(s) || wd(s)))
                n.push(
                  (function (t) {
                    return null == t
                      ? ""
                      : (function (t) {
                          if ("string" == typeof t) return t;
                          let e = t + "";
                          return "0" == e && 1 / t == -1 / 0 ? "-0" : e;
                        })(t);
                  })(s)
                );
              else if (Td(s)) {
                i = !0;
                for (let t = 0, n = s.length; t < n; t += 1) o(s[t], e, r + 1);
              } else e.length && o(s, e, r + 1);
            } else n.push(t);
        };
        return o(t, Od(e) ? e.split(".") : e, 0), i ? n : n[0];
      },
      ignoreLocation: !1,
      ignoreFieldNorm: !1,
      fieldNormWeight: 1,
    },
  };
  const Vd = /[^ ]+/g;
  class jd {
    constructor({
      getFn: t = Bd.getFn,
      fieldNormWeight: e = Bd.fieldNormWeight,
    } = {}) {
      (this.norm = (function (t = 1, e = 3) {
        const n = new Map(),
          i = Math.pow(10, e);
        return {
          get(e) {
            const o = e.match(Vd).length;
            if (n.has(o)) return n.get(o);
            const r = 1 / Math.pow(o, 0.5 * t),
              s = parseFloat(Math.round(r * i) / i);
            return n.set(o, s), s;
          },
          clear() {
            n.clear();
          },
        };
      })(e, 3)),
        (this.getFn = t),
        (this.isCreated = !1),
        this.setIndexRecords();
    }
    setSources(t = []) {
      this.docs = t;
    }
    setIndexRecords(t = []) {
      this.records = t;
    }
    setKeys(t = []) {
      (this.keys = t),
        (this._keysMap = {}),
        t.forEach((t, e) => {
          this._keysMap[t.id] = e;
        });
    }
    create() {
      !this.isCreated &&
        this.docs.length &&
        ((this.isCreated = !0),
        Od(this.docs[0])
          ? this.docs.forEach((t, e) => {
              this._addString(t, e);
            })
          : this.docs.forEach((t, e) => {
              this._addObject(t, e);
            }),
        this.norm.clear());
    }
    add(t) {
      const e = this.size();
      Od(t) ? this._addString(t, e) : this._addObject(t, e);
    }
    removeAt(t) {
      this.records.splice(t, 1);
      for (let e = t, n = this.size(); e < n; e += 1) this.records[e].i -= 1;
    }
    getValueForItemAtKeyId(t, e) {
      return t[this._keysMap[e]];
    }
    size() {
      return this.records.length;
    }
    _addString(t, e) {
      if (!Rd(t) || Dd(t)) return;
      let n = { v: t, i: e, n: this.norm.get(t) };
      this.records.push(n);
    }
    _addObject(t, e) {
      let n = { i: e, $: {} };
      this.keys.forEach((e, i) => {
        let o = e.getFn ? e.getFn(t) : this.getFn(t, e.path);
        if (Rd(o))
          if (Td(o)) {
            let t = [];
            const e = [{ nestedArrIndex: -1, value: o }];
            for (; e.length; ) {
              const { nestedArrIndex: n, value: i } = e.pop();
              if (Rd(i))
                if (Od(i) && !Dd(i)) {
                  let e = { v: i, i: n, n: this.norm.get(i) };
                  t.push(e);
                } else
                  Td(i) &&
                    i.forEach((t, n) => {
                      e.push({ nestedArrIndex: n, value: t });
                    });
            }
            n.$[i] = t;
          } else if (Od(o) && !Dd(o)) {
            let t = { v: o, n: this.norm.get(o) };
            n.$[i] = t;
          }
      }),
        this.records.push(n);
    }
    toJSON() {
      return { keys: this.keys, records: this.records };
    }
  }
  function Kd(
    t,
    e,
    { getFn: n = Bd.getFn, fieldNormWeight: i = Bd.fieldNormWeight } = {}
  ) {
    const o = new jd({ getFn: n, fieldNormWeight: i });
    return o.setKeys(t.map(Pd)), o.setSources(e), o.create(), o;
  }
  function Gd(
    t,
    {
      errors: e = 0,
      currentLocation: n = 0,
      expectedLocation: i = 0,
      distance: o = Bd.distance,
      ignoreLocation: r = Bd.ignoreLocation,
    } = {}
  ) {
    const s = e / t.length;
    if (r) return s;
    const a = Math.abs(i - n);
    return o ? s + a / o : a ? 1 : s;
  }
  const Wd = 32;
  function zd(
    t,
    e,
    n,
    {
      location: i = Bd.location,
      distance: o = Bd.distance,
      threshold: r = Bd.threshold,
      findAllMatches: s = Bd.findAllMatches,
      minMatchCharLength: a = Bd.minMatchCharLength,
      includeMatches: l = Bd.includeMatches,
      ignoreLocation: c = Bd.ignoreLocation,
    } = {}
  ) {
    if (e.length > Wd) throw new Error(`Pattern length exceeds max of ${Wd}.`);
    const u = e.length,
      d = t.length,
      p = Math.max(0, Math.min(i, d));
    let f = r,
      h = p;
    const m = a > 1 || l,
      g = m ? Array(d) : [];
    let $;
    for (; ($ = t.indexOf(e, h)) > -1; ) {
      let t = Gd(e, {
        currentLocation: $,
        expectedLocation: p,
        distance: o,
        ignoreLocation: c,
      });
      if (((f = Math.min(t, f)), (h = $ + u), m)) {
        let t = 0;
        for (; t < u; ) (g[$ + t] = 1), (t += 1);
      }
    }
    h = -1;
    let y = [],
      I = 1,
      v = u + d;
    const E = 1 << (u - 1);
    for (let i = 0; i < u; i += 1) {
      let r = 0,
        a = v;
      for (; r < a; ) {
        Gd(e, {
          errors: i,
          currentLocation: p + a,
          expectedLocation: p,
          distance: o,
          ignoreLocation: c,
        }) <= f
          ? (r = a)
          : (v = a),
          (a = Math.floor((v - r) / 2 + r));
      }
      v = a;
      let l = Math.max(1, p - a + 1),
        $ = s ? d : Math.min(p + a, d) + u,
        b = Array($ + 2);
      b[$ + 1] = (1 << i) - 1;
      for (let r = $; r >= l; r -= 1) {
        let s = r - 1,
          a = n[t.charAt(s)];
        if (
          (m && (g[s] = +!!a),
          (b[r] = ((b[r + 1] << 1) | 1) & a),
          i && (b[r] |= ((y[r + 1] | y[r]) << 1) | 1 | y[r + 1]),
          b[r] & E &&
            ((I = Gd(e, {
              errors: i,
              currentLocation: s,
              expectedLocation: p,
              distance: o,
              ignoreLocation: c,
            })),
            I <= f))
        ) {
          if (((f = I), (h = s), h <= p)) break;
          l = Math.max(1, 2 * p - h);
        }
      }
      if (
        Gd(e, {
          errors: i + 1,
          currentLocation: p,
          expectedLocation: p,
          distance: o,
          ignoreLocation: c,
        }) > f
      )
        break;
      y = b;
    }
    const b = { isMatch: h >= 0, score: Math.max(0.001, I) };
    if (m) {
      const t = (function (t = [], e = Bd.minMatchCharLength) {
        let n = [],
          i = -1,
          o = -1,
          r = 0;
        for (let s = t.length; r < s; r += 1) {
          let s = t[r];
          s && -1 === i
            ? (i = r)
            : s ||
              -1 === i ||
              ((o = r - 1), o - i + 1 >= e && n.push([i, o]), (i = -1));
        }
        return t[r - 1] && r - i >= e && n.push([i, r - 1]), n;
      })(g, a);
      t.length ? l && (b.indices = t) : (b.isMatch = !1);
    }
    return b;
  }
  function qd(t) {
    let e = {};
    for (let n = 0, i = t.length; n < i; n += 1) {
      const o = t.charAt(n);
      e[o] = (e[o] || 0) | (1 << (i - n - 1));
    }
    return e;
  }
  class Yd {
    constructor(
      t,
      {
        location: e = Bd.location,
        threshold: n = Bd.threshold,
        distance: i = Bd.distance,
        includeMatches: o = Bd.includeMatches,
        findAllMatches: r = Bd.findAllMatches,
        minMatchCharLength: s = Bd.minMatchCharLength,
        isCaseSensitive: a = Bd.isCaseSensitive,
        ignoreLocation: l = Bd.ignoreLocation,
      } = {}
    ) {
      if (
        ((this.options = {
          location: e,
          threshold: n,
          distance: i,
          includeMatches: o,
          findAllMatches: r,
          minMatchCharLength: s,
          isCaseSensitive: a,
          ignoreLocation: l,
        }),
        (this.pattern = a ? t : t.toLowerCase()),
        (this.chunks = []),
        !this.pattern.length)
      )
        return;
      const c = (t, e) => {
          this.chunks.push({ pattern: t, alphabet: qd(t), startIndex: e });
        },
        u = this.pattern.length;
      if (u > Wd) {
        let t = 0;
        const e = u % Wd,
          n = u - e;
        for (; t < n; ) c(this.pattern.substr(t, Wd), t), (t += Wd);
        if (e) {
          const t = u - Wd;
          c(this.pattern.substr(t), t);
        }
      } else c(this.pattern, 0);
    }
    searchIn(t) {
      const { isCaseSensitive: e, includeMatches: n } = this.options;
      if ((e || (t = t.toLowerCase()), this.pattern === t)) {
        let e = { isMatch: !0, score: 0 };
        return n && (e.indices = [[0, t.length - 1]]), e;
      }
      const {
        location: i,
        distance: o,
        threshold: r,
        findAllMatches: s,
        minMatchCharLength: a,
        ignoreLocation: l,
      } = this.options;
      let c = [],
        u = 0,
        d = !1;
      this.chunks.forEach(({ pattern: e, alphabet: p, startIndex: f }) => {
        const {
          isMatch: h,
          score: m,
          indices: g,
        } = zd(t, e, p, {
          location: i + f,
          distance: o,
          threshold: r,
          findAllMatches: s,
          minMatchCharLength: a,
          includeMatches: n,
          ignoreLocation: l,
        });
        h && (d = !0), (u += m), h && g && (c = [...c, ...g]);
      });
      let p = { isMatch: d, score: d ? u / this.chunks.length : 1 };
      return d && n && (p.indices = c), p;
    }
  }
  const Xd = [];
  function Qd(t, e) {
    for (let n = 0, i = Xd.length; n < i; n += 1) {
      let i = Xd[n];
      if (i.condition(t, e)) return new i(t, e);
    }
    return new Yd(t, e);
  }
  const Jd = "$and",
    Zd = "$or",
    tp = "$path",
    ep = "$val",
    np = (t) => !(!t[Jd] && !t[Zd]),
    ip = (t) => ({ [Jd]: Object.keys(t).map((e) => ({ [e]: t[e] })) });
  function op(t, e) {
    const n = t.matches;
    (e.matches = []),
      Rd(n) &&
        n.forEach((t) => {
          if (!Rd(t.indices) || !t.indices.length) return;
          const { indices: n, value: i } = t;
          let o = { indices: n, value: i };
          t.key && (o.key = t.key.src),
            t.idx > -1 && (o.refIndex = t.idx),
            e.matches.push(o);
        });
  }
  function rp(t, e) {
    e.score = t.score;
  }
  class sp {
    constructor(t, e = {}, n) {
      if (((this.options = { ...Bd, ...e }), this.options.useExtendedSearch))
        throw new Error("Extended search is not available");
      (this._keyStore = new kd(this.options.keys)), this.setCollection(t, n);
    }
    setCollection(t, e) {
      if (((this._docs = t), e && !(e instanceof jd)))
        throw new Error("Incorrect 'index' type");
      this._myIndex =
        e ||
        Kd(this.options.keys, this._docs, {
          getFn: this.options.getFn,
          fieldNormWeight: this.options.fieldNormWeight,
        });
    }
    add(t) {
      Rd(t) && (this._docs.push(t), this._myIndex.add(t));
    }
    remove(t = () => !1) {
      const e = [];
      for (let n = 0, i = this._docs.length; n < i; n += 1) {
        const o = this._docs[n];
        t(o, n) && (this.removeAt(n), (n -= 1), (i -= 1), e.push(o));
      }
      return e;
    }
    removeAt(t) {
      this._docs.splice(t, 1), this._myIndex.removeAt(t);
    }
    getIndex() {
      return this._myIndex;
    }
    search(t, { limit: e = -1 } = {}) {
      const {
        includeMatches: n,
        includeScore: i,
        shouldSort: o,
        sortFn: r,
        ignoreFieldNorm: s,
      } = this.options;
      let a = Od(t)
        ? Od(this._docs[0])
          ? this._searchStringList(t)
          : this._searchObjectList(t)
        : this._searchLogical(t);
      return (
        (function (t, { ignoreFieldNorm: e = Bd.ignoreFieldNorm }) {
          t.forEach((t) => {
            let n = 1;
            t.matches.forEach(({ key: t, norm: i, score: o }) => {
              const r = t ? t.weight : null;
              n *= Math.pow(
                0 === o && r ? Number.EPSILON : o,
                (r || 1) * (e ? 1 : i)
              );
            }),
              (t.score = n);
          });
        })(a, { ignoreFieldNorm: s }),
        o && a.sort(r),
        Ld(e) && e > -1 && (a = a.slice(0, e)),
        (function (
          t,
          e,
          {
            includeMatches: n = Bd.includeMatches,
            includeScore: i = Bd.includeScore,
          } = {}
        ) {
          const o = [];
          return (
            n && o.push(op),
            i && o.push(rp),
            t.map((t) => {
              const { idx: n } = t,
                i = { item: e[n], refIndex: n };
              return (
                o.length &&
                  o.forEach((e) => {
                    e(t, i);
                  }),
                i
              );
            })
          );
        })(a, this._docs, { includeMatches: n, includeScore: i })
      );
    }
    _searchStringList(t) {
      const e = Qd(t, this.options),
        { records: n } = this._myIndex,
        i = [];
      return (
        n.forEach(({ v: t, i: n, n: o }) => {
          if (!Rd(t)) return;
          const { isMatch: r, score: s, indices: a } = e.searchIn(t);
          r &&
            i.push({
              item: t,
              idx: n,
              matches: [{ score: s, value: t, norm: o, indices: a }],
            });
        }),
        i
      );
    }
    _searchLogical(t) {
      throw new Error("Logical search is not available");
    }
    _searchObjectList(t) {
      const e = Qd(t, this.options),
        { keys: n, records: i } = this._myIndex,
        o = [];
      return (
        i.forEach(({ $: t, i: i }) => {
          if (!Rd(t)) return;
          let r = [];
          n.forEach((n, i) => {
            r.push(...this._findMatches({ key: n, value: t[i], searcher: e }));
          }),
            r.length && o.push({ idx: i, item: t, matches: r });
        }),
        o
      );
    }
    _findMatches({ key: t, value: e, searcher: n }) {
      if (!Rd(e)) return [];
      let i = [];
      if (Td(e))
        e.forEach(({ v: e, i: o, n: r }) => {
          if (!Rd(e)) return;
          const { isMatch: s, score: a, indices: l } = n.searchIn(e);
          s &&
            i.push({ score: a, key: t, value: e, idx: o, norm: r, indices: l });
        });
      else {
        const { v: o, n: r } = e,
          { isMatch: s, score: a, indices: l } = n.searchIn(o);
        s && i.push({ score: a, key: t, value: o, norm: r, indices: l });
      }
      return i;
    }
  }
  (sp.version = "6.6.2"),
    (sp.createIndex = Kd),
    (sp.parseIndex = function (
      t,
      { getFn: e = Bd.getFn, fieldNormWeight: n = Bd.fieldNormWeight } = {}
    ) {
      const { keys: i, records: o } = t,
        r = new jd({ getFn: e, fieldNormWeight: n });
      return r.setKeys(i), r.setIndexRecords(o), r;
    }),
    (sp.config = Bd),
    (sp.parseQuery = function (t, e, { auto: n = !0 } = {}) {
      const i = (t) => {
        let o = Object.keys(t);
        const r = ((t) => !!t[tp])(t);
        if (!r && o.length > 1 && !np(t)) return i(ip(t));
        if (((t) => !Td(t) && Nd(t) && !np(t))(t)) {
          const i = r ? t[tp] : o[0],
            s = r ? t[ep] : t[i];
          if (!Od(s)) throw new Error(((t) => `Invalid value for key ${t}`)(i));
          const a = { keyId: Hd(i), pattern: s };
          return n && (a.searcher = Qd(s, e)), a;
        }
        let s = { children: [], operator: o[0] };
        return (
          o.forEach((e) => {
            const n = t[e];
            Td(n) &&
              n.forEach((t) => {
                s.children.push(i(t));
              });
          }),
          s
        );
      };
      return np(t) || (t = ip(t)), i(t);
    });
  const ap = { ignoreLocation: !0 };
  function lp(t, e, n) {
    const i = t.slice();
    return (i[22] = e[n]), i;
  }
  function cp(t, e, n) {
    const i = t.slice();
    return (i[22] = e[n]), i;
  }
  function up(t) {
    let e, n;
    return (
      (e = new Qc({
        props: { $$slots: { label: [gp], default: [mp] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          134217732 & n && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function dp(t) {
    let e, n;
    return (
      (e = new Qc({
        props: { $$slots: { default: [$p] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          134217740 & n && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function pp(t) {
    let e, n;
    return (
      (e = new Qc({
        props: { $$slots: { default: [Ep] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          134217740 & n && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function fp(t) {
    let e, n;
    return (
      (e = new Qc({
        props: { $$slots: { default: [bp] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          134217740 & n && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function hp(t) {
    let e, n;
    return (
      (e = new Qc({
        props: { $$slots: { default: [Ap] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          134217756 & n && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function mp(t) {
    let e, n, i;
    function o(e) {
      t[18](e);
    }
    let r = { indeterminate: null === t[2] };
    return (
      void 0 !== t[2] && (r.checked = t[2]),
      (e = new gc({ props: r })),
      lt.push(() => kt(e, "checked", o)),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, i) {
          const o = {};
          4 & i && (o.indeterminate = null === t[2]),
            !n && 4 & i && ((n = !0), (o.checked = t[2]), gt(() => (n = !1))),
            e.$set(o);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function gp(e) {
    let n;
    return {
      c() {
        (n = N("span")), (n.textContent = `${e[7]}`), U(n, "slot", "label");
      },
      m(t, e) {
        O(t, n, e);
      },
      p: t,
      d(t) {
        t && L(n);
      },
    };
  }
  function $p(t) {
    let e, n, i, o, r, s;
    function a(e) {
      t[16](e);
    }
    let l = { indeterminate: null === t[2] };
    function c(e) {
      t[17](e);
    }
    void 0 !== t[2] && (l.checked = t[2]),
      (e = new gc({ props: l })),
      lt.push(() => kt(e, "checked", a));
    let u = { label: t[7], options: t[8].map(Tp) };
    return (
      void 0 !== t[3] && (u.value = t[3]),
      (o = new Sd({ props: u })),
      lt.push(() => kt(o, "value", c)),
      {
        c() {
          Pt(e.$$.fragment), (i = M()), Pt(o.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), O(t, i, n), Ut(o, t, n), (s = !0);
        },
        p(t, i) {
          const s = {};
          4 & i && (s.indeterminate = null === t[2]),
            !n && 4 & i && ((n = !0), (s.checked = t[2]), gt(() => (n = !1))),
            e.$set(s);
          const a = {};
          !r && 8 & i && ((r = !0), (a.value = t[3]), gt(() => (r = !1))),
            o.$set(a);
        },
        i(t) {
          s || (Tt(e.$$.fragment, t), Tt(o.$$.fragment, t), (s = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), Ot(o.$$.fragment, t), (s = !1);
        },
        d(t) {
          Ht(e, t), t && L(i), Ht(o, t);
        },
      }
    );
  }
  function yp(e) {
    let n,
      i = e[22].name + "";
    return {
      c() {
        n = D(i);
      },
      m(t, e) {
        O(t, n, e);
      },
      p: t,
      d(t) {
        t && L(n);
      },
    };
  }
  function Ip(t) {
    let e, n;
    return (
      (e = new nl({
        props: {
          value: t[22].id,
          $$slots: { default: [yp] },
          $$scope: { ctx: t },
        },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          134217728 & n && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function vp(t) {
    let e,
      n,
      i = t[8],
      o = [];
    for (let e = 0; e < i.length; e += 1) o[e] = Ip(cp(t, i, e));
    const r = (t) =>
      Ot(o[t], 1, 1, () => {
        o[t] = null;
      });
    return {
      c() {
        for (let t = 0; t < o.length; t += 1) o[t].c();
        e = F();
      },
      m(t, i) {
        for (let e = 0; e < o.length; e += 1) o[e].m(t, i);
        O(t, e, i), (n = !0);
      },
      p(t, n) {
        if (256 & n) {
          let s;
          for (i = t[8], s = 0; s < i.length; s += 1) {
            const r = cp(t, i, s);
            o[s]
              ? (o[s].p(r, n), Tt(o[s], 1))
              : ((o[s] = Ip(r)),
                o[s].c(),
                Tt(o[s], 1),
                o[s].m(e.parentNode, e));
          }
          for (xt(), s = i.length; s < o.length; s += 1) r(s);
          St();
        }
      },
      i(t) {
        if (!n) {
          for (let t = 0; t < i.length; t += 1) Tt(o[t]);
          n = !0;
        }
      },
      o(t) {
        o = o.filter(Boolean);
        for (let t = 0; t < o.length; t += 1) Ot(o[t]);
        n = !1;
      },
      d(t) {
        w(o, t), t && L(e);
      },
    };
  }
  function Ep(t) {
    let e, n, i, o, r, s;
    function a(e) {
      t[14](e);
    }
    let l = { indeterminate: null === t[2] };
    function c(e) {
      t[15](e);
    }
    void 0 !== t[2] && (l.checked = t[2]),
      (e = new gc({ props: l })),
      lt.push(() => kt(e, "checked", a));
    let u = { label: t[7], $$slots: { default: [vp] }, $$scope: { ctx: t } };
    return (
      void 0 !== t[3] && (u.value = t[3]),
      (o = new Ja({ props: u })),
      lt.push(() => kt(o, "value", c)),
      {
        c() {
          Pt(e.$$.fragment), (i = M()), Pt(o.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), O(t, i, n), Ut(o, t, n), (s = !0);
        },
        p(t, i) {
          const s = {};
          4 & i && (s.indeterminate = null === t[2]),
            !n && 4 & i && ((n = !0), (s.checked = t[2]), gt(() => (n = !1))),
            e.$set(s);
          const a = {};
          134217728 & i && (a.$$scope = { dirty: i, ctx: t }),
            !r && 8 & i && ((r = !0), (a.value = t[3]), gt(() => (r = !1))),
            o.$set(a);
        },
        i(t) {
          s || (Tt(e.$$.fragment, t), Tt(o.$$.fragment, t), (s = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), Ot(o.$$.fragment, t), (s = !1);
        },
        d(t) {
          Ht(e, t), t && L(i), Ht(o, t);
        },
      }
    );
  }
  function bp(t) {
    let e, n, i, o, r, s;
    function a(e) {
      t[12](e);
    }
    let l = { indeterminate: null === t[2] };
    function c(e) {
      t[13](e);
    }
    void 0 !== t[2] && (l.checked = t[2]),
      (e = new gc({ props: l })),
      lt.push(() => kt(e, "checked", a));
    let u = { label: t[7], type: "number" };
    return (
      void 0 !== t[3] && (u.value = t[3]),
      (o = new gr({ props: u })),
      lt.push(() => kt(o, "value", c)),
      {
        c() {
          Pt(e.$$.fragment), (i = M()), Pt(o.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), O(t, i, n), Ut(o, t, n), (s = !0);
        },
        p(t, i) {
          const s = {};
          4 & i && (s.indeterminate = null === t[2]),
            !n && 4 & i && ((n = !0), (s.checked = t[2]), gt(() => (n = !1))),
            e.$set(s);
          const a = {};
          !r && 8 & i && ((r = !0), (a.value = t[3]), gt(() => (r = !1))),
            o.$set(a);
        },
        i(t) {
          s || (Tt(e.$$.fragment, t), Tt(o.$$.fragment, t), (s = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), Ot(o.$$.fragment, t), (s = !1);
        },
        d(t) {
          Ht(e, t), t && L(i), Ht(o, t);
        },
      }
    );
  }
  function Ap(t) {
    let e, n, i, o, r, s;
    function a(e) {
      t[10](e);
    }
    let l = { indeterminate: null === t[2] };
    function c(e) {
      t[11](e);
    }
    void 0 !== t[2] && (l.checked = t[2]),
      (e = new gc({ props: l })),
      lt.push(() => kt(e, "checked", a));
    let u = { combobox: !0, label: t[7], search: t[4] };
    return (
      void 0 !== t[3] && (u.value = t[3]),
      (o = new Cu({ props: u })),
      lt.push(() => kt(o, "value", c)),
      {
        c() {
          Pt(e.$$.fragment), (i = M()), Pt(o.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), O(t, i, n), Ut(o, t, n), (s = !0);
        },
        p(t, i) {
          const s = {};
          4 & i && (s.indeterminate = null === t[2]),
            !n && 4 & i && ((n = !0), (s.checked = t[2]), gt(() => (n = !1))),
            e.$set(s);
          const a = {};
          16 & i && (a.search = t[4]),
            !r && 8 & i && ((r = !0), (a.value = t[3]), gt(() => (r = !1))),
            o.$set(a);
        },
        i(t) {
          s || (Tt(e.$$.fragment, t), Tt(o.$$.fragment, t), (s = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), Ot(o.$$.fragment, t), (s = !1);
        },
        d(t) {
          Ht(e, t), t && L(i), Ht(o, t);
        },
      }
    );
  }
  function Cp(t) {
    let e,
      n,
      i,
      o,
      r,
      s,
      a = t[0].expanded && _p(t);
    return {
      c() {
        (e = N("div")),
          (e.textContent = "▶"),
          (n = M()),
          a && a.c(),
          (i = F()),
          U(e, "class", "arrow svelte-7av3ky"),
          K(e, "arrowDown", t[6]);
      },
      m(l, c) {
        O(l, e, c),
          O(l, n, c),
          a && a.m(l, c),
          O(l, i, c),
          (o = !0),
          r || ((s = k(e, "click", t[9])), (r = !0));
      },
      p(t, n) {
        64 & n && K(e, "arrowDown", t[6]),
          t[0].expanded
            ? a
              ? (a.p(t, n), 1 & n && Tt(a, 1))
              : ((a = _p(t)), a.c(), Tt(a, 1), a.m(i.parentNode, i))
            : a &&
              (xt(),
              Ot(a, 1, 1, () => {
                a = null;
              }),
              St());
      },
      i(t) {
        o || (Tt(a), (o = !0));
      },
      o(t) {
        Ot(a), (o = !1);
      },
      d(t) {
        t && L(e), t && L(n), a && a.d(t), t && L(i), (r = !1), s();
      },
    };
  }
  function _p(t) {
    let e,
      n,
      i = t[8],
      o = [];
    for (let e = 0; e < i.length; e += 1) o[e] = xp(lp(t, i, e));
    const r = (t) =>
      Ot(o[t], 1, 1, () => {
        o[t] = null;
      });
    return {
      c() {
        for (let t = 0; t < o.length; t += 1) o[t].c();
        e = F();
      },
      m(t, i) {
        for (let e = 0; e < o.length; e += 1) o[e].m(t, i);
        O(t, e, i), (n = !0);
      },
      p(t, n) {
        if (258 & n) {
          let s;
          for (i = t[8], s = 0; s < i.length; s += 1) {
            const r = lp(t, i, s);
            o[s]
              ? (o[s].p(r, n), Tt(o[s], 1))
              : ((o[s] = xp(r)),
                o[s].c(),
                Tt(o[s], 1),
                o[s].m(e.parentNode, e));
          }
          for (xt(), s = i.length; s < o.length; s += 1) r(s);
          St();
        }
      },
      i(t) {
        if (!n) {
          for (let t = 0; t < i.length; t += 1) Tt(o[t]);
          n = !0;
        }
      },
      o(t) {
        o = o.filter(Boolean);
        for (let t = 0; t < o.length; t += 1) Ot(o[t]);
        n = !1;
      },
      d(t) {
        w(o, t), t && L(e);
      },
    };
  }
  function xp(t) {
    let e, n;
    return (
      (e = new Lp({ props: { tree: t[22], tags: t[1] } })),
      e.$on("change", t[19]),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          2 & n && (i.tags = t[1]), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function Sp(t) {
    let e, n, i, o, r, s;
    const a = [hp, fp, pp, dp, up],
      l = [];
    function c(t, e) {
      return "TextField" === t[0].type
        ? 0
        : "IntegerField" === t[0].type
        ? 1
        : "EnumField" === t[0].type
        ? 2
        : "SetField" === t[0].type
        ? 3
        : 4;
    }
    (i = c(t)), (o = l[i] = a[i](t));
    let u = t[5] && Cp(t);
    return {
      c() {
        (e = N("ul")),
          (n = N("li")),
          o.c(),
          (r = M()),
          u && u.c(),
          U(e, "class", "svelte-7av3ky");
      },
      m(t, o) {
        O(t, e, o),
          x(e, n),
          l[i].m(n, null),
          x(n, r),
          u && u.m(n, null),
          (s = !0);
      },
      p(t, [e]) {
        let s = i;
        (i = c(t)),
          i === s
            ? l[i].p(t, e)
            : (xt(),
              Ot(l[s], 1, 1, () => {
                l[s] = null;
              }),
              St(),
              (o = l[i]),
              o ? o.p(t, e) : ((o = l[i] = a[i](t)), o.c()),
              Tt(o, 1),
              o.m(n, r)),
          t[5]
            ? u
              ? (u.p(t, e), 32 & e && Tt(u, 1))
              : ((u = Cp(t)), u.c(), Tt(u, 1), u.m(n, null))
            : u &&
              (xt(),
              Ot(u, 1, 1, () => {
                u = null;
              }),
              St());
      },
      i(t) {
        s || (Tt(o), Tt(u), (s = !0));
      },
      o(t) {
        Ot(o), Ot(u), (s = !1);
      },
      d(t) {
        t && L(e), l[i].d(), u && u.d();
      },
    };
  }
  const Tp = ({ name: t, id: e }) => ({ label: t, value: e });
  function Op(t, e, n) {
    let i,
      o,
      { tree: r } = e;
    const { name: s, children: a } = r;
    let l,
      { tags: c = [] } = e;
    let u = void 0 !== r.selected && r.selected,
      d = r.value || null;
    const p = it();
    return (
      (t.$$set = (t) => {
        "tree" in t && n(0, (r = t.tree)), "tags" in t && n(1, (c = t.tags));
      }),
      (t.$$.update = () => {
        12 & t.$$.dirty &&
          (console.log("checked:", u),
          n(0, (r.selected = u), r),
          n(0, (r.value = d), r),
          p("change", { tree: r })),
          3 & t.$$.dirty &&
            "TextField" === r.type &&
            n(
              4,
              (l = (function (t, e) {
                const n = e
                    .map((e) => jt.valueForId(e, t))
                    .sort()
                    .filter((t, e, n) => null != t && t !== n[e - 1]),
                  i = new sp(n, ap);
                return async (t) =>
                  t ? i.search(t).map(({ item: t }) => t) : n;
              })(r.id, c))
            ),
          1 & t.$$.dirty && n(6, (i = r.expanded)),
          1 & t.$$.dirty &&
            n(5, (o = a.length && !["EnumField", "SetField"].includes(r.type)));
      }),
      [
        r,
        c,
        u,
        d,
        l,
        o,
        i,
        s,
        a,
        () => {
          n(0, (r.expanded = !r.expanded), r);
        },
        function (t) {
          (u = t), n(2, u);
        },
        function (t) {
          (d = t), n(3, d);
        },
        function (t) {
          (u = t), n(2, u);
        },
        function (t) {
          (d = t), n(3, d);
        },
        function (t) {
          (u = t), n(2, u);
        },
        function (t) {
          (d = t), n(3, d);
        },
        function (t) {
          (u = t), n(2, u);
        },
        function (t) {
          (d = t), n(3, d);
        },
        function (t) {
          (u = t), n(2, u);
        },
        function (e) {
          st.call(this, t, e);
        },
      ]
    );
  }
  class Lp extends Vt {
    constructor(t) {
      super(), Bt(this, t, Op, Sp, a, { tree: 0, tags: 1 });
    }
  }
  function wp(t, e, n) {
    const i = t.slice();
    return (i[5] = e[n]), i;
  }
  function Np(t, e) {
    let i, o, r;
    const s = [e[5]];
    let a = {};
    for (let t = 0; t < s.length; t += 1) a = n(a, s[t]);
    return (
      (o = new Lp({ props: a })),
      o.$on("change", e[1]),
      {
        key: t,
        first: null,
        c() {
          (i = F()), Pt(o.$$.fragment), (this.first = i);
        },
        m(t, e) {
          O(t, i, e), Ut(o, t, e), (r = !0);
        },
        p(t, n) {
          e = t;
          const i = 1 & n ? Mt(s, [Ft(e[5])]) : {};
          o.$set(i);
        },
        i(t) {
          r || (Tt(o.$$.fragment, t), (r = !0));
        },
        o(t) {
          Ot(o.$$.fragment, t), (r = !1);
        },
        d(t) {
          t && L(i), Ht(o, t);
        },
      }
    );
  }
  function Rp(t) {
    let e,
      n,
      i = [],
      o = new Map(),
      r = t[0];
    const s = (t) => t[5].tree.id;
    for (let e = 0; e < r.length; e += 1) {
      let n = wp(t, r, e),
        a = s(n);
      o.set(a, (i[e] = Np(a, n)));
    }
    return {
      c() {
        e = N("main");
        for (let t = 0; t < i.length; t += 1) i[t].c();
      },
      m(t, o) {
        O(t, e, o);
        for (let t = 0; t < i.length; t += 1) i[t].m(e, null);
        n = !0;
      },
      p(t, [n]) {
        3 & n &&
          ((r = t[0]),
          xt(),
          (i = Dt(i, n, s, 1, t, r, o, e, Nt, Np, null, wp)),
          St());
      },
      i(t) {
        if (!n) {
          for (let t = 0; t < r.length; t += 1) Tt(i[t]);
          n = !0;
        }
      },
      o(t) {
        for (let t = 0; t < i.length; t += 1) Ot(i[t]);
        n = !1;
      },
      d(t) {
        t && L(e);
        for (let t = 0; t < i.length; t += 1) i[t].d();
      },
    };
  }
  function Dp(t) {
    const e = t.children.flatMap(Dp);
    return t.selected && e.push(t), e;
  }
  function Mp(t, e, n) {
    let i,
      { trees: o = [] } = e,
      { tags: r = [] } = e;
    const s = it();
    return (
      (t.$$set = (t) => {
        "trees" in t && n(2, (o = t.trees)), "tags" in t && n(3, (r = t.tags));
      }),
      (t.$$.update = () => {
        12 & t.$$.dirty &&
          n(
            0,
            (i = o.map((t) => ({
              tree: t,
              tags: r.filter((e) => t.canMatch(e)),
            })))
          );
      }),
      [
        i,
        function () {
          const t = o.flatMap(Dp);
          s("change", { filterTags: t });
        },
        o,
        r,
      ]
    );
  }
  class Fp extends Vt {
    constructor(t) {
      super(), Bt(this, t, Mp, Rp, a, { trees: 2, tags: 3 });
    }
  }
  var kp;
  !(function (t) {
    (t.Term = "Term"),
      (t.IntegerField = "IntegerField"),
      (t.TextField = "TextField");
  })(kp || (kp = {}));
  class Pp extends Gt {}
  class Up {
    constructor(t, e) {
      (this.id = t), (this.version = e);
    }
    supports(t) {
      return this.id === t.id && this.version.supports(t.version);
    }
    static from(t) {
      let e;
      if (t.tag) e = new Bp(t.commit, t.tag);
      else if (t.branch) e = new Vp(t.commit, t.branch);
      else {
        if (!t.commit) {
          const e = JSON.stringify(t);
          throw new Error(`Could not find tag, branch, or commit in ${e}`);
        }
        e = new Hp(t.commit);
      }
      return new Up(t.id, e);
    }
  }
  class Hp {
    constructor(t) {
      this.hash = t;
    }
    supports(t) {
      return t.hash === this.hash;
    }
  }
  class Bp extends Hp {
    constructor(t, e) {
      super(t), (this.version = Kp.parse(e));
    }
    supports(t) {
      return t instanceof Bp
        ? this.version.major === t.version.major && this.version.gte(t.version)
        : super.supports(t);
    }
  }
  class Vp extends Hp {
    constructor(t, e) {
      super(t), (this.name = e);
    }
    supports(t) {
      return t instanceof Vp ? t.name === this.name : super.supports(t);
    }
  }
  class jp extends Error {
    constructor(t) {
      super(`Unable to parse: ${t}`);
    }
  }
  class Kp {
    constructor(t, e = 0, n = 0) {
      (this.major = t), (this.minor = e), (this.patch = n);
    }
    gte(t) {
      return (
        !(this.major < t.major) &&
        !(this.minor < t.minor) &&
        !(this.patch < t.patch)
      );
    }
    static parse(t) {
      t = t.replace(/^v?/, "");
      const [e, n = 0, i = 0] = t.split(".").map((e) => {
        if (!/\d+/.test(e)) throw new jp(t);
        return parseInt(e);
      });
      return new Kp(e, n, i);
    }
  }
  class Gp {
    constructor() {
      this.baseUrl = window.location.href
        .replace("Search", "TagFormat")
        .replace(/static.*$/, "human");
    }
    async toHumanFormat(t) {
      const e = encodeURIComponent(JSON.stringify(t)),
        n = `${this.baseUrl}?tags=${e}`,
        i = await fetch(n);
      if (i.status > 399) throw new Wp(await i.text());
      return await i.json();
    }
  }
  class Wp extends Error {}
  class zp {
    constructor() {
      const t = window.location.href.split("/");
      t.pop(), t.pop(), (this.baseUrl = t.join("/") + "/artifacts/");
    }
    async listArtifacts() {
      const t = (await this._fetchJson(this.baseUrl)).mapError(
        (t) => new Xp(t.message)
      );
      return zt(await t.unwrap(), (t) =>
        class {
          static tryFrom(t) {
            if (t.displayName) {
              const e = [t.id, ...t.children.map((t) => t.id).sort()].join("/");
              return (
                (t.hash = e),
                (t.children = t.children.map(
                  (t) => (t.taxonomy && (t.taxonomy = Up.from(t.taxonomy)), t)
                )),
                t
              );
            }
            console.log("Found malformed data. Filtering out. Data:", t);
          }
        }.tryFrom(t)
      );
    }
    async getDownloadUrl(t, ...e) {
      const n = `ids=${encodeURIComponent(JSON.stringify(e))}`;
      return this.baseUrl + t + `/download?${n}`;
    }
    async pushArtifact(t, e) {
      console.log("Uploading to", e, t.name);
      const n = {
        method: "PUT",
        headers: {
          Accept: "application/xml",
          "Content-Type": "application/octet-stream",
          "x-ms-blob-type": "BlockBlob",
          "x-ms-encryption-algorithm": "AES256",
        },
        body: t,
      };
      return (await this._fetch(e, n))
        .mapError((t) => new Jp(t.message))
        .unwrap();
    }
    async appendArtifact(t, e, n) {
      console.log({ action: "append", metadata: e, files: n });
      const i = (function (t) {
          return (
            t.children.sort((t, e) =>
              t.time === e.time
                ? t.displayName < e.displayName
                  ? -1
                  : 1
                : t.time < e.time
                ? -1
                : 1
            ),
            t.children[t.children.length - 1]
          );
        })(t),
        o = i && i.id,
        r = o ? "?lastId=" + encodeURIComponent(o) : "",
        s = this.baseUrl + t.id + "/uploadUrl" + r,
        a = n.map((t) => t.name),
        l = {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ metadata: e, filenames: a }),
        },
        c = (
          await (await this._fetchJson(s, l))
            .mapError((t) => new Jp(t.message))
            .unwrap()
        ).map(async (t) => {
          const e = t.name.substring(4),
            i = n.find((t) => t.name == e);
          !(function (t, e) {
            if (!t) throw e;
          })(!!i, new Jp("Could not find upload URL for " + e)),
            await this.pushArtifact(i, t.sasUrl);
        });
      await Promise.all(c), console.log("Append artifact:", e, n);
    }
    async updateArtifact(t, e) {
      console.log("Updating artifact:", t, e);
    }
    async createArtifact(t, e) {
      console.log("Creating artifact:", t, e),
        (t.taxonomyTags = t.taxonomyTags || []);
      const n = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metadata: t }),
      };
      return (await this._fetchJson(this.baseUrl, n))
        .mapError((t) => new Qp(t.message))
        .unwrap();
    }
    async _fetch(t, e = null) {
      const n = await fetch(t, e);
      let i = null;
      return n.status > 399 && (i = new qp(await n.text())), new Wt(n, i);
    }
    async _fetchJson(t, e = null) {
      return (await this._fetch(t, e)).map((t) => t.json());
    }
  }
  class qp extends Error {
    constructor(t) {
      super(t);
    }
  }
  class Yp extends qp {
    constructor(t, e) {
      super(`Unable to ${t}: ${e}`);
    }
  }
  class Xp extends Yp {
    constructor(t) {
      super("list artifacts", t);
    }
  }
  class Qp extends Yp {
    constructor(t) {
      super("create", t);
    }
  }
  class Jp extends Yp {
    constructor(t) {
      super("append", t);
    }
  }
  function Zp(t, e, n) {
    const i = t.slice();
    return (i[65] = e[n]), i;
  }
  function tf(t, e, n) {
    const i = t.slice();
    return (i[71] = e[n]), i;
  }
  function ef(t) {
    let e,
      n,
      i = (t[10] && t[10].displayName) + "";
    return {
      c() {
        (e = D("Append data to ")), (n = D(i));
      },
      m(t, i) {
        O(t, e, i), O(t, n, i);
      },
      p(t, e) {
        1024 & e[0] && i !== (i = (t[10] && t[10].displayName) + "") && B(n, i);
      },
      d(t) {
        t && L(e), t && L(n);
      },
    };
  }
  function nf(t) {
    let e,
      n,
      i = t[71].name + "";
    return {
      c() {
        (e = N("li")), (n = D(i)), U(e, "class", "svelte-x9elkr");
      },
      m(t, i) {
        O(t, e, i), x(e, n);
      },
      p(t, e) {
        512 & e[0] && i !== (i = t[71].name + "") && B(n, i);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function of(e) {
    let n;
    return {
      c() {
        (n = N("p")),
          (n.textContent = "Select dataset to upload."),
          U(n, "class", "svelte-x9elkr");
      },
      m(t, e) {
        O(t, n, e);
      },
      p: t,
      d(t) {
        t && L(n);
      },
    };
  }
  function rf(e) {
    let n;
    return {
      c() {
        (n = N("p")),
          (n.textContent = "Select tags file for dataset."),
          U(n, "class", "svelte-x9elkr");
      },
      m(t, e) {
        O(t, n, e);
      },
      p: t,
      d(t) {
        t && L(n);
      },
    };
  }
  function sf(t) {
    let e,
      n,
      i,
      o,
      r,
      s,
      a,
      l,
      c,
      u,
      d,
      p,
      f,
      h,
      m,
      g,
      $,
      y,
      I,
      v,
      E,
      b,
      A,
      C,
      _ = (t[11] ? t[11].taxonomyTags.map(jf).join(", ") : "") + "";
    function S(e) {
      t[24](e);
    }
    let T = { label: "Name" };
    void 0 !== t[12] && (T.value = t[12]),
      (e = new gr({ props: T })),
      lt.push(() => kt(e, "value", S));
    let R = t[9],
      F = [];
    for (let e = 0; e < R.length; e += 1) F[e] = nf(tf(t, R, e));
    return (
      (u = new ec({
        props: {
          multiple: !0,
          $$slots: { default: [of] },
          $$scope: { ctx: t },
        },
      })),
      u.$on("drop", t[18]),
      (v = new ec({
        props: {
          accept: ".json",
          $$slots: { default: [rf] },
          $$scope: { ctx: t },
        },
      })),
      v.$on("drop", t[19]),
      {
        c() {
          Pt(e.$$.fragment),
            (i = M()),
            (o = N("p")),
            (r = D(t[0])),
            (s = D(" file(s):")),
            (a = M()),
            (l = N("ul"));
          for (let t = 0; t < F.length; t += 1) F[t].c();
          (c = M()),
            Pt(u.$$.fragment),
            (d = M()),
            (p = N("p")),
            (f = D("Taxonomy Terms ")),
            (h = N("span")),
            (h.textContent = "(optional)"),
            (m = D(":")),
            (g = N("br")),
            ($ = M()),
            (y = D(_)),
            (I = M()),
            Pt(v.$$.fragment),
            (E = M()),
            (b = N("a")),
            (A = D("Click to select tags for your dataset.")),
            U(o, "class", "svelte-x9elkr"),
            U(l, "class", "svelte-x9elkr"),
            j(h, "font-style", "italic"),
            U(h, "class", "svelte-x9elkr"),
            U(g, "class", "svelte-x9elkr"),
            U(p, "class", "svelte-x9elkr"),
            U(b, "target", "_blank"),
            U(
              b,
              "href",
              window.location.href.replace("/Search/", "/TagCreator/")
            ),
            U(b, "class", "svelte-x9elkr");
        },
        m(t, n) {
          Ut(e, t, n),
            O(t, i, n),
            O(t, o, n),
            x(o, r),
            x(o, s),
            O(t, a, n),
            O(t, l, n);
          for (let t = 0; t < F.length; t += 1) F[t].m(l, null);
          O(t, c, n),
            Ut(u, t, n),
            O(t, d, n),
            O(t, p, n),
            x(p, f),
            x(p, h),
            x(p, m),
            x(p, g),
            x(p, $),
            x(p, y),
            O(t, I, n),
            Ut(v, t, n),
            O(t, E, n),
            O(t, b, n),
            x(b, A),
            (C = !0);
        },
        p(t, i) {
          const o = {};
          if (
            (!n &&
              4096 & i[0] &&
              ((n = !0), (o.value = t[12]), gt(() => (n = !1))),
            e.$set(o),
            (!C || 1 & i[0]) && B(r, t[0]),
            512 & i[0])
          ) {
            let e;
            for (R = t[9], e = 0; e < R.length; e += 1) {
              const n = tf(t, R, e);
              F[e] ? F[e].p(n, i) : ((F[e] = nf(n)), F[e].c(), F[e].m(l, null));
            }
            for (; e < F.length; e += 1) F[e].d(1);
            F.length = R.length;
          }
          const s = {};
          4096 & i[2] && (s.$$scope = { dirty: i, ctx: t }),
            u.$set(s),
            (!C || 2048 & i[0]) &&
              _ !==
                (_ =
                  (t[11] ? t[11].taxonomyTags.map(jf).join(", ") : "") + "") &&
              B(y, _);
          const a = {};
          4096 & i[2] && (a.$$scope = { dirty: i, ctx: t }), v.$set(a);
        },
        i(t) {
          C ||
            (Tt(e.$$.fragment, t),
            Tt(u.$$.fragment, t),
            Tt(v.$$.fragment, t),
            (C = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t),
            Ot(u.$$.fragment, t),
            Ot(v.$$.fragment, t),
            (C = !1);
        },
        d(t) {
          Ht(e, t),
            t && L(i),
            t && L(o),
            t && L(a),
            t && L(l),
            w(F, t),
            t && L(c),
            Ht(u, t),
            t && L(d),
            t && L(p),
            t && L(I),
            Ht(v, t),
            t && L(E),
            t && L(b);
        },
      }
    );
  }
  function af(t) {
    let e;
    return {
      c() {
        e = D("Cancel");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function lf(t) {
    let e, n;
    return (
      (e = new ji({
        props: { $$slots: { default: [af] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          4096 & n[2] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function cf(t) {
    let e;
    return {
      c() {
        e = D("Upload");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function uf(t) {
    let e, n;
    return (
      (e = new ji({
        props: { $$slots: { default: [cf] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          4096 & n[2] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function df(t) {
    let e, n, i, o;
    return (
      (e = new _l({
        props: { $$slots: { default: [lf] }, $$scope: { ctx: t } },
      })),
      (i = new _l({
        props: { $$slots: { default: [uf] }, $$scope: { ctx: t } },
      })),
      i.$on("click", t[25]),
      {
        c() {
          Pt(e.$$.fragment), (n = M()), Pt(i.$$.fragment);
        },
        m(t, r) {
          Ut(e, t, r), O(t, n, r), Ut(i, t, r), (o = !0);
        },
        p(t, n) {
          const o = {};
          4096 & n[2] && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
          const r = {};
          4096 & n[2] && (r.$$scope = { dirty: n, ctx: t }), i.$set(r);
        },
        i(t) {
          o || (Tt(e.$$.fragment, t), Tt(i.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), Ot(i.$$.fragment, t), (o = !1);
        },
        d(t) {
          Ht(e, t), t && L(n), Ht(i, t);
        },
      }
    );
  }
  function pf(t) {
    let e, n, i, o, r, s;
    return (
      (e = new $l({
        props: { id: "title", $$slots: { default: [ef] }, $$scope: { ctx: t } },
      })),
      (i = new yl({
        props: {
          id: "content",
          $$slots: { default: [sf] },
          $$scope: { ctx: t },
        },
      })),
      (r = new Il({
        props: { $$slots: { default: [df] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment),
            (n = M()),
            Pt(i.$$.fragment),
            (o = M()),
            Pt(r.$$.fragment);
        },
        m(t, a) {
          Ut(e, t, a),
            O(t, n, a),
            Ut(i, t, a),
            O(t, o, a),
            Ut(r, t, a),
            (s = !0);
        },
        p(t, n) {
          const o = {};
          (1024 & n[0]) | (4096 & n[2]) && (o.$$scope = { dirty: n, ctx: t }),
            e.$set(o);
          const s = {};
          (6657 & n[0]) | (4096 & n[2]) && (s.$$scope = { dirty: n, ctx: t }),
            i.$set(s);
          const a = {};
          4096 & n[2] && (a.$$scope = { dirty: n, ctx: t }), r.$set(a);
        },
        i(t) {
          s ||
            (Tt(e.$$.fragment, t),
            Tt(i.$$.fragment, t),
            Tt(r.$$.fragment, t),
            (s = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t),
            Ot(i.$$.fragment, t),
            Ot(r.$$.fragment, t),
            (s = !1);
        },
        d(t) {
          Ht(e, t), t && L(n), Ht(i, t), t && L(o), Ht(r, t);
        },
      }
    );
  }
  function ff(t) {
    let e;
    return {
      c() {
        e = D("Create new dataset");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function hf(t) {
    let e, n, i;
    function o(e) {
      t[27](e);
    }
    let r = { label: "Name" };
    return (
      void 0 !== t[14] && (r.value = t[14]),
      (e = new gr({ props: r })),
      lt.push(() => kt(e, "value", o)),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (i = !0);
        },
        p(t, i) {
          const o = {};
          !n &&
            16384 & i[0] &&
            ((n = !0), (o.value = t[14]), gt(() => (n = !1))),
            e.$set(o);
        },
        i(t) {
          i || (Tt(e.$$.fragment, t), (i = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (i = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function mf(t) {
    let e;
    return {
      c() {
        e = D("Cancel");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function gf(t) {
    let e, n;
    return (
      (e = new ji({
        props: { $$slots: { default: [mf] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          4096 & n[2] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function $f(t) {
    let e;
    return {
      c() {
        e = D("Submit");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function yf(t) {
    let e, n;
    return (
      (e = new ji({
        props: { $$slots: { default: [$f] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          4096 & n[2] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function If(t) {
    let e, n, i, o;
    return (
      (e = new _l({
        props: { $$slots: { default: [gf] }, $$scope: { ctx: t } },
      })),
      (i = new _l({
        props: { $$slots: { default: [yf] }, $$scope: { ctx: t } },
      })),
      i.$on("click", t[28]),
      {
        c() {
          Pt(e.$$.fragment), (n = M()), Pt(i.$$.fragment);
        },
        m(t, r) {
          Ut(e, t, r), O(t, n, r), Ut(i, t, r), (o = !0);
        },
        p(t, n) {
          const o = {};
          4096 & n[2] && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
          const r = {};
          4096 & n[2] && (r.$$scope = { dirty: n, ctx: t }), i.$set(r);
        },
        i(t) {
          o || (Tt(e.$$.fragment, t), Tt(i.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), Ot(i.$$.fragment, t), (o = !1);
        },
        d(t) {
          Ht(e, t), t && L(n), Ht(i, t);
        },
      }
    );
  }
  function vf(t) {
    let e, n, i, o, r, s;
    return (
      (e = new $l({
        props: { id: "title", $$slots: { default: [ff] }, $$scope: { ctx: t } },
      })),
      (i = new yl({
        props: {
          id: "content",
          $$slots: { default: [hf] },
          $$scope: { ctx: t },
        },
      })),
      (r = new Il({
        props: { $$slots: { default: [If] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment),
            (n = M()),
            Pt(i.$$.fragment),
            (o = M()),
            Pt(r.$$.fragment);
        },
        m(t, a) {
          Ut(e, t, a),
            O(t, n, a),
            Ut(i, t, a),
            O(t, o, a),
            Ut(r, t, a),
            (s = !0);
        },
        p(t, n) {
          const o = {};
          4096 & n[2] && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
          const s = {};
          (16384 & n[0]) | (4096 & n[2]) && (s.$$scope = { dirty: n, ctx: t }),
            i.$set(s);
          const a = {};
          4096 & n[2] && (a.$$scope = { dirty: n, ctx: t }), r.$set(a);
        },
        i(t) {
          s ||
            (Tt(e.$$.fragment, t),
            Tt(i.$$.fragment, t),
            Tt(r.$$.fragment, t),
            (s = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t),
            Ot(i.$$.fragment, t),
            Ot(r.$$.fragment, t),
            (s = !1);
        },
        d(t) {
          Ht(e, t), t && L(n), Ht(i, t), t && L(o), Ht(r, t);
        },
      }
    );
  }
  function Ef(t) {
    let e;
    return {
      c() {
        e = D(t[5]);
      },
      m(t, n) {
        O(t, e, n);
      },
      p(t, n) {
        32 & n[0] && B(e, t[5]);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function bf(t) {
    let e, n;
    return (
      (e = new kn({
        props: { $$slots: { default: [Ef] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          (32 & n[0]) | (4096 & n[2]) && (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function Af(t) {
    let e;
    return {
      c() {
        e = D("file_upload");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function Cf(t) {
    let e;
    return {
      c() {
        e = D("open_in_new");
      },
      m(t, n) {
        O(t, e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function _f(t) {
    let e, n, i, o;
    return (
      (e = new _r({
        props: {
          class: "material-icons",
          "aria-label": "Upload dataset",
          ripple: !1,
          $$slots: { default: [Af] },
          $$scope: { ctx: t },
        },
      })),
      e.$on("click", t[30]),
      (i = new _r({
        props: {
          class: "material-icons",
          "aria-label": "Edit taxonomy",
          ripple: !1,
          $$slots: { default: [Cf] },
          $$scope: { ctx: t },
        },
      })),
      i.$on("click", t[23]),
      {
        c() {
          Pt(e.$$.fragment), (n = M()), Pt(i.$$.fragment);
        },
        m(t, r) {
          Ut(e, t, r), O(t, n, r), Ut(i, t, r), (o = !0);
        },
        p(t, n) {
          const o = {};
          4096 & n[2] && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
          const r = {};
          4096 & n[2] && (r.$$scope = { dirty: n, ctx: t }), i.$set(r);
        },
        i(t) {
          o || (Tt(e.$$.fragment, t), Tt(i.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), Ot(i.$$.fragment, t), (o = !1);
        },
        d(t) {
          Ht(e, t), t && L(n), Ht(i, t);
        },
      }
    );
  }
  function xf(t) {
    let e, n, i, o;
    return (
      (e = new Pn({
        props: { $$slots: { default: [bf] }, $$scope: { ctx: t } },
      })),
      (i = new Pn({
        props: {
          align: "end",
          toolbar: !0,
          $$slots: { default: [_f] },
          $$scope: { ctx: t },
        },
      })),
      {
        c() {
          Pt(e.$$.fragment), (n = M()), Pt(i.$$.fragment);
        },
        m(t, r) {
          Ut(e, t, r), O(t, n, r), Ut(i, t, r), (o = !0);
        },
        p(t, n) {
          const o = {};
          (32 & n[0]) | (4096 & n[2]) && (o.$$scope = { dirty: n, ctx: t }),
            e.$set(o);
          const r = {};
          (8192 & n[0]) | (4096 & n[2]) && (r.$$scope = { dirty: n, ctx: t }),
            i.$set(r);
        },
        i(t) {
          o || (Tt(e.$$.fragment, t), Tt(i.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), Ot(i.$$.fragment, t), (o = !1);
        },
        d(t) {
          Ht(e, t), t && L(n), Ht(i, t);
        },
      }
    );
  }
  function Sf(t) {
    let e, n;
    return (
      (e = new Dn({
        props: { $$slots: { default: [xf] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          (8224 & n[0]) | (4096 & n[2]) && (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function Tf(t) {
    let e, n;
    return (
      (e = new Ws({ props: { indeterminate: !0 } })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function Of(t) {
    let e, n, i, o, r, s, a;
    function l(e) {
      t[31](e);
    }
    let c = { label: "Search..." };
    return (
      void 0 !== t[2] && (c.value = t[2]),
      (e = new gr({ props: c })),
      lt.push(() => kt(e, "value", l)),
      (s = new Fp({ props: { trees: t[6], tags: t[15] } })),
      s.$on("change", t[32]),
      {
        c() {
          Pt(e.$$.fragment),
            (i = M()),
            (o = N("span")),
            (o.textContent = "Advanced Filters"),
            (r = M()),
            Pt(s.$$.fragment),
            U(o, "class", "filter-header svelte-x9elkr");
        },
        m(t, n) {
          Ut(e, t, n),
            O(t, i, n),
            O(t, o, n),
            O(t, r, n),
            Ut(s, t, n),
            (a = !0);
        },
        p(t, i) {
          const o = {};
          !n && 4 & i[0] && ((n = !0), (o.value = t[2]), gt(() => (n = !1))),
            e.$set(o);
          const r = {};
          64 & i[0] && (r.trees = t[6]),
            32768 & i[0] && (r.tags = t[15]),
            s.$set(r);
        },
        i(t) {
          a || (Tt(e.$$.fragment, t), Tt(s.$$.fragment, t), (a = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), Ot(s.$$.fragment, t), (a = !1);
        },
        d(t) {
          Ht(e, t), t && L(i), t && L(o), t && L(r), Ht(s, t);
        },
      }
    );
  }
  function Lf(t) {
    let e, n;
    return (
      (e = new Ls({
        props: { $$slots: { default: [Of] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          (32844 & n[0]) | (4096 & n[2]) && (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function wf(t) {
    let e, n;
    return (
      (e = new Tl({
        props: {
          variant: "unelevated",
          class: "empty",
          $$slots: { default: [Df] },
          $$scope: { ctx: t },
        },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          4096 & n[2] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function Nf(t) {
    let e, n;
    return (
      (e = new as({
        props: {
          twoLine: !0,
          avatarList: !0,
          $$slots: { default: [Uf] },
          $$scope: { ctx: t },
        },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          (2 & n[0]) | (4096 & n[2]) && (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function Rf(e) {
    let n;
    return {
      c() {
        (n = N("p")),
          (n.textContent = "No results found"),
          U(n, "class", "svelte-x9elkr");
      },
      m(t, e) {
        O(t, n, e);
      },
      p: t,
      d(t) {
        t && L(n);
      },
    };
  }
  function Df(t) {
    let e, n;
    return (
      (e = new Ol({
        props: { $$slots: { default: [Rf] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, i) {
          Ut(e, t, i), (n = !0);
        },
        p(t, n) {
          const i = {};
          4096 & n[2] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        },
        i(t) {
          n || (Tt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function Mf(t) {
    let e,
      n = t[65].displayName + "";
    return {
      c() {
        e = D(n);
      },
      m(t, n) {
        O(t, e, n);
      },
      p(t, i) {
        2 & i[0] && n !== (n = t[65].displayName + "") && B(e, n);
      },
      d(t) {
        t && L(e);
      },
    };
  }
  function Ff(t) {
    let e, n, i, o;
    return (
      (e = new ms({
        props: { $$slots: { default: [Mf] }, $$scope: { ctx: t } },
      })),
      (i = new gs({})),
      {
        c() {
          Pt(e.$$.fragment), (n = M()), Pt(i.$$.fragment);
        },
        m(t, r) {
          Ut(e, t, r), O(t, n, r), Ut(i, t, r), (o = !0);
        },
        p(t, n) {
          const i = {};
          (2 & n[0]) | (4096 & n[2]) && (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          o || (Tt(e.$$.fragment, t), Tt(i.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), Ot(i.$$.fragment, t), (o = !1);
        },
        d(t) {
          Ht(e, t), t && L(n), Ht(i, t);
        },
      }
    );
  }
  function kf(t) {
    let e, n, i, o;
    return (
      (e = new hs({
        props: { $$slots: { default: [Ff] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          Pt(e.$$.fragment), (n = M()), (i = M());
        },
        m(t, r) {
          Ut(e, t, r), O(t, n, r), O(t, i, r), (o = !0);
        },
        p(t, n) {
          const i = {};
          (2 & n[0]) | (4096 & n[2]) && (i.$$scope = { dirty: n, ctx: t }),
            e.$set(i);
        },
        i(t) {
          o || (Tt(e.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (o = !1);
        },
        d(t) {
          Ht(e, t), t && L(n), t && L(i);
        },
      }
    );
  }
  function Pf(t, e) {
    let n, i, o;
    return (
      (i = new vs({
        props: { $$slots: { default: [kf] }, $$scope: { ctx: e } },
      })),
      i.$on("SMUI:action", function () {
        return e[33](e[65]);
      }),
      {
        key: t,
        first: null,
        c() {
          (n = F()), Pt(i.$$.fragment), (this.first = n);
        },
        m(t, e) {
          O(t, n, e), Ut(i, t, e), (o = !0);
        },
        p(t, n) {
          e = t;
          const o = {};
          (2 & n[0]) | (4096 & n[2]) && (o.$$scope = { dirty: n, ctx: e }),
            i.$set(o);
        },
        i(t) {
          o || (Tt(i.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(i.$$.fragment, t), (o = !1);
        },
        d(t) {
          t && L(n), Ht(i, t);
        },
      }
    );
  }
  function Uf(t) {
    let e,
      n,
      i = [],
      o = new Map(),
      r = t[1];
    const s = (t) => t[65].hash;
    for (let e = 0; e < r.length; e += 1) {
      let n = Zp(t, r, e),
        a = s(n);
      o.set(a, (i[e] = Pf(a, n)));
    }
    return {
      c() {
        for (let t = 0; t < i.length; t += 1) i[t].c();
        e = F();
      },
      m(t, o) {
        for (let e = 0; e < i.length; e += 1) i[e].m(t, o);
        O(t, e, o), (n = !0);
      },
      p(t, n) {
        65538 & n[0] &&
          ((r = t[1]),
          xt(),
          (i = Dt(i, n, s, 1, t, r, o, e.parentNode, Nt, Pf, e, Zp)),
          St());
      },
      i(t) {
        if (!n) {
          for (let t = 0; t < r.length; t += 1) Tt(i[t]);
          n = !0;
        }
      },
      o(t) {
        for (let t = 0; t < i.length; t += 1) Ot(i[t]);
        n = !1;
      },
      d(t) {
        for (let e = 0; e < i.length; e += 1) i[e].d(t);
        t && L(e);
      },
    };
  }
  function Hf(t) {
    let e, n, i, o;
    function r(e) {
      t[34](e);
    }
    function s(e) {
      t[35](e);
    }
    let a = {};
    return (
      void 0 !== t[4] && (a.artifactSet = t[4]),
      void 0 !== t[0] && (a.contentType = t[0]),
      (e = new Vc({ props: a })),
      lt.push(() => kt(e, "artifactSet", r)),
      lt.push(() => kt(e, "contentType", s)),
      e.$on("download", t[36]),
      e.$on("upload", t[37]),
      {
        c() {
          Pt(e.$$.fragment);
        },
        m(t, n) {
          Ut(e, t, n), (o = !0);
        },
        p(t, o) {
          const r = {};
          !n &&
            16 & o[0] &&
            ((n = !0), (r.artifactSet = t[4]), gt(() => (n = !1))),
            !i &&
              1 & o[0] &&
              ((i = !0), (r.contentType = t[0]), gt(() => (i = !1))),
            e.$set(r);
        },
        i(t) {
          o || (Tt(e.$$.fragment, t), (o = !0));
        },
        o(t) {
          Ot(e.$$.fragment, t), (o = !1);
        },
        d(t) {
          Ht(e, t);
        },
      }
    );
  }
  function Bf(t) {
    let e, n, i, o, r, s;
    const a = [Nf, wf],
      l = [];
    function c(t, e) {
      return t[1].length ? 0 : t[7] ? -1 : 1;
    }
    ~(n = c(t)) && (i = l[n] = a[n](t));
    let u = t[4] && Hf(t);
    return {
      c() {
        (e = N("main")),
          i && i.c(),
          (o = M()),
          u && u.c(),
          (r = F()),
          j(e, "display", "inline-block"),
          j(e, "vertical-align", "top"),
          U(e, "class", "svelte-x9elkr");
      },
      m(t, i) {
        O(t, e, i),
          ~n && l[n].m(e, null),
          O(t, o, i),
          u && u.m(t, i),
          O(t, r, i),
          (s = !0);
      },
      p(t, o) {
        let s = n;
        (n = c(t)),
          n === s
            ? ~n && l[n].p(t, o)
            : (i &&
                (xt(),
                Ot(l[s], 1, 1, () => {
                  l[s] = null;
                }),
                St()),
              ~n
                ? ((i = l[n]),
                  i ? i.p(t, o) : ((i = l[n] = a[n](t)), i.c()),
                  Tt(i, 1),
                  i.m(e, null))
                : (i = null)),
          t[4]
            ? u
              ? (u.p(t, o), 16 & o[0] && Tt(u, 1))
              : ((u = Hf(t)), u.c(), Tt(u, 1), u.m(r.parentNode, r))
            : u &&
              (xt(),
              Ot(u, 1, 1, () => {
                u = null;
              }),
              St());
      },
      i(t) {
        s || (Tt(i), Tt(u), (s = !0));
      },
      o(t) {
        Ot(i), Ot(u), (s = !1);
      },
      d(t) {
        t && L(e), ~n && l[n].d(), t && L(o), u && u.d(t), t && L(r);
      },
    };
  }
  function Vf(t) {
    let e,
      n,
      i,
      o,
      r,
      s,
      a,
      l,
      c,
      u,
      d,
      p,
      f,
      h,
      m,
      g,
      $,
      y,
      I,
      v,
      E,
      b,
      A,
      C,
      _,
      S;
    function T(e) {
      t[26](e);
    }
    document.title = e = t[5];
    let w = {
      "aria-labelledby": "title",
      "aria-describedby": "content",
      $$slots: { default: [pf] },
      $$scope: { ctx: t },
    };
    function R(e) {
      t[29](e);
    }
    void 0 !== t[8] && (w.open = t[8]),
      (i = new gl({ props: w })),
      lt.push(() => kt(i, "open", T));
    let D = {
      "aria-labelledby": "title",
      "aria-describedby": "content",
      $$slots: { default: [vf] },
      $$scope: { ctx: t },
    };
    void 0 !== t[13] && (D.open = t[13]),
      (s = new gl({ props: D })),
      lt.push(() => kt(s, "open", R)),
      (c = new Be({
        props: {
          variant: "static",
          $$slots: { default: [Sf] },
          $$scope: { ctx: t },
        },
      }));
    let F = t[7] && Tf();
    return (
      (p = new Kr({ props: { options: { classes: ["log"] } } })),
      (m = new Ts({
        props: {
          style: "width: 360px",
          $$slots: { default: [Lf] },
          $$scope: { ctx: t },
        },
      })),
      ($ = new Os({
        props: { $$slots: { default: [Bf] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          (n = M()),
            Pt(i.$$.fragment),
            (r = M()),
            Pt(s.$$.fragment),
            (l = M()),
            Pt(c.$$.fragment),
            (u = M()),
            F && F.c(),
            (d = M()),
            Pt(p.$$.fragment),
            (f = M()),
            (h = N("div")),
            Pt(m.$$.fragment),
            (g = M()),
            Pt($.$$.fragment),
            (y = M()),
            (I = N("link")),
            (v = M()),
            (E = N("link")),
            (b = M()),
            (A = N("link")),
            (C = M()),
            (_ = N("link")),
            U(h, "class", "drawer-container svelte-x9elkr"),
            U(I, "rel", "stylesheet"),
            U(
              I,
              "href",
              "https://fonts.googleapis.com/icon?family=Material+Icons"
            ),
            U(I, "class", "svelte-x9elkr"),
            U(E, "rel", "stylesheet"),
            U(
              E,
              "href",
              "https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
            ),
            U(E, "class", "svelte-x9elkr"),
            U(A, "rel", "stylesheet"),
            U(A, "href", "https://fonts.googleapis.com/css?family=Roboto+Mono"),
            U(A, "class", "svelte-x9elkr"),
            U(_, "rel", "stylesheet"),
            U(_, "href", "build/smui.css"),
            U(_, "class", "svelte-x9elkr");
        },
        m(t, e) {
          O(t, n, e),
            Ut(i, t, e),
            O(t, r, e),
            Ut(s, t, e),
            O(t, l, e),
            Ut(c, t, e),
            O(t, u, e),
            F && F.m(t, e),
            O(t, d, e),
            Ut(p, t, e),
            O(t, f, e),
            O(t, h, e),
            Ut(m, h, null),
            x(h, g),
            Ut($, h, null),
            O(t, y, e),
            O(t, I, e),
            O(t, v, e),
            O(t, E, e),
            O(t, b, e),
            O(t, A, e),
            O(t, C, e),
            O(t, _, e),
            (S = !0);
        },
        p(t, n) {
          (!S || 32 & n[0]) && e !== (e = t[5]) && (document.title = e);
          const r = {};
          (7681 & n[0]) | (4096 & n[2]) && (r.$$scope = { dirty: n, ctx: t }),
            !o && 256 & n[0] && ((o = !0), (r.open = t[8]), gt(() => (o = !1))),
            i.$set(r);
          const l = {};
          (16384 & n[0]) | (4096 & n[2]) && (l.$$scope = { dirty: n, ctx: t }),
            !a &&
              8192 & n[0] &&
              ((a = !0), (l.open = t[13]), gt(() => (a = !1))),
            s.$set(l);
          const u = {};
          (8224 & n[0]) | (4096 & n[2]) && (u.$$scope = { dirty: n, ctx: t }),
            c.$set(u),
            t[7]
              ? F
                ? 128 & n[0] && Tt(F, 1)
                : ((F = Tf()), F.c(), Tt(F, 1), F.m(d.parentNode, d))
              : F &&
                (xt(),
                Ot(F, 1, 1, () => {
                  F = null;
                }),
                St());
          const p = {};
          (32844 & n[0]) | (4096 & n[2]) && (p.$$scope = { dirty: n, ctx: t }),
            m.$set(p);
          const f = {};
          (147 & n[0]) | (4096 & n[2]) && (f.$$scope = { dirty: n, ctx: t }),
            $.$set(f);
        },
        i(t) {
          S ||
            (Tt(i.$$.fragment, t),
            Tt(s.$$.fragment, t),
            Tt(c.$$.fragment, t),
            Tt(F),
            Tt(p.$$.fragment, t),
            Tt(m.$$.fragment, t),
            Tt($.$$.fragment, t),
            (S = !0));
        },
        o(t) {
          Ot(i.$$.fragment, t),
            Ot(s.$$.fragment, t),
            Ot(c.$$.fragment, t),
            Ot(F),
            Ot(p.$$.fragment, t),
            Ot(m.$$.fragment, t),
            Ot($.$$.fragment, t),
            (S = !1);
        },
        d(t) {
          t && L(n),
            Ht(i, t),
            t && L(r),
            Ht(s, t),
            t && L(l),
            Ht(c, t),
            t && L(u),
            F && F.d(t),
            t && L(d),
            Ht(p, t),
            t && L(f),
            t && L(h),
            Ht(m),
            Ht($),
            t && L(y),
            t && L(I),
            t && L(v),
            t && L(E),
            t && L(b),
            t && L(A),
            t && L(C),
            t && L(_);
        },
      }
    );
  }
  const jf = (t) => t.Tag;
  function Kf(t, e, n) {
    let i,
      o,
      r = "Data",
      s = [];
    const a = new zp();
    let l = [],
      c = [];
    const u = new URLSearchParams(location.search);
    let d = u.get("searchQuery") || "",
      p = [];
    function f(t, e) {
      n(
        1,
        (c = l.filter((n) =>
          ((n) => {
            const { displayName: i, taxonomyTags: o = [] } = n;
            return (
              !!e.every((t) => !!o.find((e) => t.isMatch(e))) &&
              (!t || i.toLowerCase().includes(t.toLowerCase()))
            );
          })(n)
        ))
      );
      const i = new URLSearchParams();
      i.set("searchQuery", t);
      const o = e.map((t) => t.lean());
      i.set("filterTags", JSON.stringify(o)),
        (function (t) {
          const e = new URLSearchParams(location.search);
          [...t.entries()].forEach(([t, n]) => e.set(t, n)),
            window.history.replaceState(
              {},
              "",
              `${location.pathname}?${e.toString()}`
            );
        })(i);
    }
    function h(t) {
      wr.push(t, { classes: ["warn"] });
    }
    function m(t) {
      wr.push(t, { classes: ["info"] });
    }
    let g,
      $,
      y = !1;
    async function I() {
      n(7, (y = !0));
      try {
        (l = await a.listArtifacts()),
          l.forEach((t) => {
            const e = t.children.filter(
              (t) => t.taxonomy && $.supports(t.taxonomy)
            );
            t.children = e;
          });
      } catch (t) {
        if (
          (h(
            t instanceof qp
              ? t.message
              : "An error occurred. Please try again later"
          ),
          !(t instanceof qp))
        )
          throw t;
      }
      n(7, (y = !1)), console.log({ allItems: l }), f(d, p);
    }
    class v extends class {
      constructor(t, e) {
        (this.type = t), (this.data = e);
      }
    } {
      constructor(t) {
        super("ItemSelected", t);
      }
    }
    const E = [];
    let b;
    function A(t) {
      (b = t), E.forEach(([e, n]) => e.postMessage(new v(t), n)), n(4, (F = t));
    }
    window.addEventListener(
      "message",
      function (t) {
        const { data: e } = t;
        "subscribe" === e.type &&
          (E.push([t.source, t.origin]),
          b && t.source.postMessage(new v(b), t.origin));
      },
      !1
    ),
      (async function () {
        (g = await (async function () {
          const t = window.location.href.split("/");
          t.pop(), t.pop();
          const e = t.join("/") + "/configuration.json";
          try {
            const t = await fetch(e);
            return await t.json();
          } catch (t) {
            throw (
              (h(
                "An error occurred. Please double check the URL and try again."
              ),
              t)
            );
          }
        })()),
          ($ = Up.from(g.project));
        const t = Pp.fromDict(g.taxonomy);
        n(
          6,
          (s = (function (t) {
            let e = [t];
            for (; 1 === e.length; ) e = e[0].children;
            return e;
          })(t))
        ),
          n(
            3,
            (p = (function (t) {
              if (t)
                return zt(JSON.parse(t), (t) => {
                  const e = s.reduce((e, n) => e || n.findPath(t.id), null);
                  if (!e) return void console.warn("Could not find tag for", t);
                  const n = e.pop();
                  return (
                    (n.value = t.value),
                    n.select(),
                    e.forEach((t) => t.expand()),
                    n
                  );
                });
              return [];
            })(u.get("filterTags")))
          ),
          n(0, (r = g.name)),
          I();
      })();
    let C,
      _,
      x = !1,
      S = [],
      T = "",
      O = new Gp();
    async function L(t) {
      n(10, (C = t)), n(12, (T = C.displayName));
      try {
        n(11, (_ = { taxonomyTags: await O.toHumanFormat(C.taxonomyTags) }));
      } catch (t) {
        t instanceof Wp
          ? console.warn(
              "Latest artifact has invalid taxonomy tags:",
              t.message
            )
          : console.error(
              "An error occurred while setting default tags",
              t.stack
            );
      }
      n(8, (x = !0));
    }
    async function w() {
      if (!S) return h(`${r} file required.`);
      const t = _;
      t.displayName = T;
      const e = (function (t, e = 6e4) {
        return wr.push(t, { classes: ["info"], dismissable: !1, duration: e });
      })("Upload in progress");
      try {
        await a.appendArtifact(C, t, S), m("Upload complete!"), I();
      } catch (t) {
        console.log(t), h(`Unable to upload: ${t.message}`);
      }
      var n;
      (n = e), wr.pop(n);
    }
    var N;
    let R =
        "create" ===
        ((N = window.location.href),
        Object.fromEntries(
          (N.split("?")[1] || "").split("&").map((t) => t.split("="))
        )).action,
      D = [];
    async function M() {
      const t = await a.createArtifact({ displayName: k }, D);
      m(t), "Created!" === t && I();
    }
    let F,
      k = "";
    async function P(t) {
      const { artifactSet: e, artifactIds: n } = t;
      try {
        if (0 === n.length) return h("Nothing to download: No data found.");
        m(`Downloading ${n.length} from ${e.displayName}...`);
        Yt(await a.getDownloadUrl(e.id, ...n));
      } catch (t) {
        return h(t.message);
      }
    }
    return (
      (t.$$.update = () => {
        1 & t.$$.dirty[0] && n(5, (o = `${r} Dashboard`)),
          12 & t.$$.dirty[0] && f(d, p),
          2 & t.$$.dirty[0] &&
            n(
              15,
              (i = c.flatMap((t) => {
                var e;
                return null !== (e = t.taxonomyTags) && void 0 !== e ? e : [];
              }))
            ),
          t.$$.dirty[0],
          18 & t.$$.dirty[0] && (c.includes(F) || n(4, (F = null)));
      }),
      [
        r,
        c,
        d,
        p,
        F,
        o,
        s,
        y,
        x,
        S,
        C,
        _,
        T,
        R,
        k,
        i,
        A,
        L,
        function (t) {
          const { acceptedFiles: e } = t.detail;
          e.length && n(9, (S = e));
        },
        async function (t) {
          const [e] = t.detail.acceptedFiles;
          e &&
            n(
              11,
              (_ = JSON.parse(
                await (async function (t) {
                  return new Promise((e, n) => {
                    const i = new FileReader();
                    (i.onload = () =>
                      i.error
                        ? (console.log("error:", i.error), n(i.error))
                        : e(i.result)),
                      i.readAsText(t);
                  });
                })(e)
              ))
            );
        },
        w,
        M,
        P,
        function () {
          var t;
          Yt(
            window.location.href.replace(/routers\/Search.*/, "") +
              "?" +
              ((t = {
                project: g.project.id,
                commit: g.project.commit,
                node: g.contentTypePath,
              }),
              Object.entries(t)
                .map(([t, e]) => `${t}=${encodeURIComponent(e)}`)
                .join("&"))
          );
        },
        function (t) {
          (T = t), n(12, T);
        },
        () => w(),
        function (t) {
          (x = t), n(8, x);
        },
        function (t) {
          (k = t), n(14, k);
        },
        () => M(),
        function (t) {
          (R = t), n(13, R);
        },
        () => n(13, (R = !0)),
        function (t) {
          (d = t), n(2, d);
        },
        (t) => n(3, (p = Gt.fromDicts(t.detail.filterTags))),
        (t) => A(t),
        function (t) {
          (F = t), n(4, F), n(1, c);
        },
        function (t) {
          (r = t), n(0, r);
        },
        (t) => P(t.detail),
        (t) => L(t.detail.artifactSet),
      ]
    );
  }
  return new (class extends Vt {
    constructor(t) {
      super(), Bt(this, t, Kf, Vf, a, {}, null, [-1, -1, -1]);
    }
  })({ target: document.body, props: { name: "world" } });
})();
//# sourceMappingURL=bundle.js.map
