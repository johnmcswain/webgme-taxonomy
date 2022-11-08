var app = (function () {
  "use strict";
  function e() {}
  const t = (e) => e;
  function n(e, t) {
    for (const n in t) e[n] = t[n];
    return e;
  }
  function i(e) {
    return e();
  }
  function r() {
    return Object.create(null);
  }
  function s(e) {
    e.forEach(i);
  }
  function o(e) {
    return "function" == typeof e;
  }
  function a(e, t) {
    return e != e
      ? t == t
      : e !== t || (e && "object" == typeof e) || "function" == typeof e;
  }
  function l(t, n, i) {
    t.$$.on_destroy.push(
      (function (t, ...n) {
        if (null == t) return e;
        const i = t.subscribe(...n);
        return i.unsubscribe ? () => i.unsubscribe() : i;
      })(n, i)
    );
  }
  function c(e, t, n, i) {
    if (e) {
      const r = u(e, t, n, i);
      return e[0](r);
    }
  }
  function u(e, t, i, r) {
    return e[1] && r ? n(i.ctx.slice(), e[1](r(t))) : i.ctx;
  }
  function d(e, t, n, i) {
    if (e[2] && i) {
      const r = e[2](i(n));
      if (void 0 === t.dirty) return r;
      if ("object" == typeof r) {
        const e = [],
          n = Math.max(t.dirty.length, r.length);
        for (let i = 0; i < n; i += 1) e[i] = t.dirty[i] | r[i];
        return e;
      }
      return t.dirty | r;
    }
    return t.dirty;
  }
  function p(e, t, n, i, r, s) {
    if (r) {
      const o = u(t, n, i, s);
      e.p(o, r);
    }
  }
  function f(e) {
    if (e.ctx.length > 32) {
      const t = [],
        n = e.ctx.length / 32;
      for (let e = 0; e < n; e++) t[e] = -1;
      return t;
    }
    return -1;
  }
  function h(e) {
    const t = {};
    for (const n in e) "$" !== n[0] && (t[n] = e[n]);
    return t;
  }
  function m(e, t) {
    const n = {};
    t = new Set(t);
    for (const i in e) t.has(i) || "$" === i[0] || (n[i] = e[i]);
    return n;
  }
  function g(e) {
    const t = {};
    for (const n in e) t[n] = !0;
    return t;
  }
  function $(e) {
    return null == e ? "" : e;
  }
  function y(e, t, n) {
    return e.set(n), t;
  }
  function v(t) {
    return t && o(t.destroy) ? t.destroy : e;
  }
  const I = "undefined" != typeof window;
  let b = I ? () => window.performance.now() : () => Date.now(),
    E = I ? (e) => requestAnimationFrame(e) : e;
  const x = new Set();
  function A(e) {
    x.forEach((t) => {
      t.c(e) || (x.delete(t), t.f());
    }),
      0 !== x.size && E(A);
  }
  function C(e) {
    let t;
    return (
      0 === x.size && E(A),
      {
        promise: new Promise((n) => {
          x.add((t = { c: e, f: n }));
        }),
        abort() {
          x.delete(t);
        },
      }
    );
  }
  function _(e, t) {
    e.appendChild(t);
  }
  function S(e) {
    if (!e) return document;
    const t = e.getRootNode ? e.getRootNode() : e.ownerDocument;
    return t && t.host ? t : e.ownerDocument;
  }
  function T(e) {
    const t = M("style");
    return (
      (function (e, t) {
        _(e.head || e, t);
      })(S(e), t),
      t.sheet
    );
  }
  function L(e, t, n) {
    e.insertBefore(t, n || null);
  }
  function O(e) {
    e.parentNode.removeChild(e);
  }
  function w(e, t) {
    for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t);
  }
  function M(e) {
    return document.createElement(e);
  }
  function N(e) {
    return document.createElementNS("http://www.w3.org/2000/svg", e);
  }
  function D(e) {
    return document.createTextNode(e);
  }
  function R() {
    return D(" ");
  }
  function F() {
    return D("");
  }
  function k(e, t, n, i) {
    return e.addEventListener(t, n, i), () => e.removeEventListener(t, n, i);
  }
  function U(e, t, n) {
    null == n
      ? e.removeAttribute(t)
      : e.getAttribute(t) !== n && e.setAttribute(t, n);
  }
  function H(e, t) {
    const n = Object.getOwnPropertyDescriptors(e.__proto__);
    for (const i in t)
      null == t[i]
        ? e.removeAttribute(i)
        : "style" === i
        ? (e.style.cssText = t[i])
        : "__value" === i
        ? (e.value = e[i] = t[i])
        : n[i] && n[i].set
        ? (e[i] = t[i])
        : U(e, i, t[i]);
  }
  function P(e, t) {
    (t = "" + t), e.wholeText !== t && (e.data = t);
  }
  function B(e, t) {
    e.value = null == t ? "" : t;
  }
  function V(e, t, n, i) {
    null === n
      ? e.style.removeProperty(t)
      : e.style.setProperty(t, n, i ? "important" : "");
  }
  function j(e, t, n) {
    e.classList[n ? "add" : "remove"](t);
  }
  function z(e, t, { bubbles: n = !1, cancelable: i = !1 } = {}) {
    const r = document.createEvent("CustomEvent");
    return r.initCustomEvent(e, n, i, t), r;
  }
  class G {
    constructor(e = !1) {
      (this.is_svg = !1), (this.is_svg = e), (this.e = this.n = null);
    }
    c(e) {
      this.h(e);
    }
    m(e, t, n = null) {
      this.e ||
        (this.is_svg ? (this.e = N(t.nodeName)) : (this.e = M(t.nodeName)),
        (this.t = t),
        this.c(e)),
        this.i(n);
    }
    h(e) {
      (this.e.innerHTML = e), (this.n = Array.from(this.e.childNodes));
    }
    i(e) {
      for (let t = 0; t < this.n.length; t += 1) L(this.t, this.n[t], e);
    }
    p(e) {
      this.d(), this.h(e), this.i(this.a);
    }
    d() {
      this.n.forEach(O);
    }
  }
  const W = new Map();
  let q,
    K = 0;
  function X(e, t, n, i, r, s, o, a = 0) {
    const l = 16.666 / i;
    let c = "{\n";
    for (let e = 0; e <= 1; e += l) {
      const i = t + (n - t) * s(e);
      c += 100 * e + `%{${o(i, 1 - i)}}\n`;
    }
    const u = c + `100% {${o(n, 1 - n)}}\n}`,
      d = `__svelte_${(function (e) {
        let t = 5381,
          n = e.length;
        for (; n--; ) t = ((t << 5) - t) ^ e.charCodeAt(n);
        return t >>> 0;
      })(u)}_${a}`,
      p = S(e),
      { stylesheet: f, rules: h } =
        W.get(p) ||
        (function (e, t) {
          const n = { stylesheet: T(t), rules: {} };
          return W.set(e, n), n;
        })(p, e);
    h[d] ||
      ((h[d] = !0), f.insertRule(`@keyframes ${d} ${u}`, f.cssRules.length));
    const m = e.style.animation || "";
    return (
      (e.style.animation = `${
        m ? `${m}, ` : ""
      }${d} ${i}ms linear ${r}ms 1 both`),
      (K += 1),
      d
    );
  }
  function Y(e, t) {
    const n = (e.style.animation || "").split(", "),
      i = n.filter(
        t ? (e) => e.indexOf(t) < 0 : (e) => -1 === e.indexOf("__svelte")
      ),
      r = n.length - i.length;
    r &&
      ((e.style.animation = i.join(", ")),
      (K -= r),
      K ||
        E(() => {
          K ||
            (W.forEach((e) => {
              const { stylesheet: t } = e;
              let n = t.cssRules.length;
              for (; n--; ) t.deleteRule(n);
              e.rules = {};
            }),
            W.clear());
        }));
  }
  function Q(e, t) {
    const n = e.getBoundingClientRect();
    if (t.left !== n.left || t.top !== n.top) {
      const i = getComputedStyle(e),
        r = "none" === i.transform ? "" : i.transform;
      e.style.transform = `${r} translate(${t.left - n.left}px, ${
        t.top - n.top
      }px)`;
    }
  }
  function J(e) {
    q = e;
  }
  function Z() {
    if (!q) throw new Error("Function called outside component initialization");
    return q;
  }
  function ee(e) {
    Z().$$.on_mount.push(e);
  }
  function te(e) {
    Z().$$.on_destroy.push(e);
  }
  function ne() {
    const e = Z();
    return (t, n, { cancelable: i = !1 } = {}) => {
      const r = e.$$.callbacks[t];
      if (r) {
        const s = z(t, n, { cancelable: i });
        return (
          r.slice().forEach((t) => {
            t.call(e, s);
          }),
          !s.defaultPrevented
        );
      }
      return !0;
    };
  }
  function ie(e, t) {
    return Z().$$.context.set(e, t), t;
  }
  function re(e) {
    return Z().$$.context.get(e);
  }
  function se(e, t) {
    const n = e.$$.callbacks[t.type];
    n && n.slice().forEach((e) => e.call(this, t));
  }
  const oe = [],
    ae = [],
    le = [],
    ce = [],
    ue = Promise.resolve();
  let de = !1;
  function pe() {
    de || ((de = !0), ue.then(ye));
  }
  function fe(e) {
    le.push(e);
  }
  function he(e) {
    ce.push(e);
  }
  const me = new Set();
  let ge,
    $e = 0;
  function ye() {
    const e = q;
    do {
      for (; $e < oe.length; ) {
        const e = oe[$e];
        $e++, J(e), ve(e.$$);
      }
      for (J(null), oe.length = 0, $e = 0; ae.length; ) ae.pop()();
      for (let e = 0; e < le.length; e += 1) {
        const t = le[e];
        me.has(t) || (me.add(t), t());
      }
      le.length = 0;
    } while (oe.length);
    for (; ce.length; ) ce.pop()();
    (de = !1), me.clear(), J(e);
  }
  function ve(e) {
    if (null !== e.fragment) {
      e.update(), s(e.before_update);
      const t = e.dirty;
      (e.dirty = [-1]),
        e.fragment && e.fragment.p(e.ctx, t),
        e.after_update.forEach(fe);
    }
  }
  function Ie() {
    return (
      ge ||
        ((ge = Promise.resolve()),
        ge.then(() => {
          ge = null;
        })),
      ge
    );
  }
  function be(e, t, n) {
    e.dispatchEvent(z(`${t ? "intro" : "outro"}${n}`));
  }
  const Ee = new Set();
  let xe;
  function Ae() {
    xe = { r: 0, c: [], p: xe };
  }
  function Ce() {
    xe.r || s(xe.c), (xe = xe.p);
  }
  function _e(e, t) {
    e && e.i && (Ee.delete(e), e.i(t));
  }
  function Se(e, t, n, i) {
    if (e && e.o) {
      if (Ee.has(e)) return;
      Ee.add(e),
        xe.c.push(() => {
          Ee.delete(e), i && (n && e.d(1), i());
        }),
        e.o(t);
    } else i && i();
  }
  const Te = { duration: 0 };
  const Le =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof globalThis
      ? globalThis
      : global;
  function Oe(e, t) {
    Se(e, 1, 1, () => {
      t.delete(e.key);
    });
  }
  function we(e, t) {
    e.f(), Oe(e, t);
  }
  function Me(e, t, n, i, r, s, o, a, l, c, u, d) {
    let p = e.length,
      f = s.length,
      h = p;
    const m = {};
    for (; h--; ) m[e[h].key] = h;
    const g = [],
      $ = new Map(),
      y = new Map();
    for (h = f; h--; ) {
      const e = d(r, s, h),
        a = n(e);
      let l = o.get(a);
      l ? i && l.p(e, t) : ((l = c(a, e)), l.c()),
        $.set(a, (g[h] = l)),
        a in m && y.set(a, Math.abs(h - m[a]));
    }
    const v = new Set(),
      I = new Set();
    function b(e) {
      _e(e, 1), e.m(a, u), o.set(e.key, e), (u = e.first), f--;
    }
    for (; p && f; ) {
      const t = g[f - 1],
        n = e[p - 1],
        i = t.key,
        r = n.key;
      t === n
        ? ((u = t.first), p--, f--)
        : $.has(r)
        ? !o.has(i) || v.has(i)
          ? b(t)
          : I.has(r)
          ? p--
          : y.get(i) > y.get(r)
          ? (I.add(i), b(t))
          : (v.add(r), p--)
        : (l(n, o), p--);
    }
    for (; p--; ) {
      const t = e[p];
      $.has(t.key) || l(t, o);
    }
    for (; f; ) b(g[f - 1]);
    return g;
  }
  function Ne(e, t) {
    const n = {},
      i = {},
      r = { $$scope: 1 };
    let s = e.length;
    for (; s--; ) {
      const o = e[s],
        a = t[s];
      if (a) {
        for (const e in o) e in a || (i[e] = 1);
        for (const e in a) r[e] || ((n[e] = a[e]), (r[e] = 1));
        e[s] = a;
      } else for (const e in o) r[e] = 1;
    }
    for (const e in i) e in n || (n[e] = void 0);
    return n;
  }
  function De(e) {
    return "object" == typeof e && null !== e ? e : {};
  }
  function Re(e, t, n) {
    const i = e.$$.props[t];
    void 0 !== i && ((e.$$.bound[i] = n), n(e.$$.ctx[i]));
  }
  function Fe(e) {
    e && e.c();
  }
  function ke(e, t, n, r) {
    const { fragment: a, on_mount: l, on_destroy: c, after_update: u } = e.$$;
    a && a.m(t, n),
      r ||
        fe(() => {
          const t = l.map(i).filter(o);
          c ? c.push(...t) : s(t), (e.$$.on_mount = []);
        }),
      u.forEach(fe);
  }
  function Ue(e, t) {
    const n = e.$$;
    null !== n.fragment &&
      (s(n.on_destroy),
      n.fragment && n.fragment.d(t),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function He(t, n, i, o, a, l, c, u = [-1]) {
    const d = q;
    J(t);
    const p = (t.$$ = {
      fragment: null,
      ctx: null,
      props: l,
      update: e,
      not_equal: a,
      bound: r(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(n.context || (d ? d.$$.context : [])),
      callbacks: r(),
      dirty: u,
      skip_bound: !1,
      root: n.target || d.$$.root,
    });
    c && c(p.root);
    let f = !1;
    if (
      ((p.ctx = i
        ? i(t, n.props || {}, (e, n, ...i) => {
            const r = i.length ? i[0] : n;
            return (
              p.ctx &&
                a(p.ctx[e], (p.ctx[e] = r)) &&
                (!p.skip_bound && p.bound[e] && p.bound[e](r),
                f &&
                  (function (e, t) {
                    -1 === e.$$.dirty[0] &&
                      (oe.push(e), pe(), e.$$.dirty.fill(0)),
                      (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
                  })(t, e)),
              n
            );
          })
        : []),
      p.update(),
      (f = !0),
      s(p.before_update),
      (p.fragment = !!o && o(p.ctx)),
      n.target)
    ) {
      if (n.hydrate) {
        const e = (function (e) {
          return Array.from(e.childNodes);
        })(n.target);
        p.fragment && p.fragment.l(e), e.forEach(O);
      } else p.fragment && p.fragment.c();
      n.intro && _e(t.$$.fragment),
        ke(t, n.target, n.anchor, n.customElement),
        ye();
    }
    J(d);
  }
  class Pe {
    $destroy() {
      Ue(this, 1), (this.$destroy = e);
    }
    $on(e, t) {
      const n = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
      return (
        n.push(t),
        () => {
          const e = n.indexOf(t);
          -1 !== e && n.splice(e, 1);
        }
      );
    }
    $set(e) {
      var t;
      this.$$set &&
        ((t = e), 0 !== Object.keys(t).length) &&
        ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
    }
  }
  var Be;
  !(function (e) {
    e.valueForId = function (e, t) {
      return e.ID === t ? e.value : e[t];
    };
  })(Be || (Be = {}));
  class Ve {
    constructor(e, t) {
      (this.id = e), (this.value = t);
    }
  }
  class je {
    constructor(e, t, n, i, r) {
      (this.value = null),
        (this.selected = !1),
        (this.expanded = !1),
        (this.id = e),
        (this.name = t),
        (this.type = n),
        (this.value = i),
        (this.children = r);
    }
    select() {
      this.selected = !0;
    }
    expand() {
      this.expanded = !0;
    }
    findPath(e) {
      const t =
        this.id === e
          ? []
          : this.children.reduce((t, n) => t || n.findPath(e), null);
      return t && t.unshift(this), t;
    }
    canMatch(e) {
      return e.ID === this.id || e.hasOwnProperty(this.id);
    }
    isMatch(e) {
      if (e.ID === this.id && e.value == this.value) return !0;
      return e.hasOwnProperty(this.id) && e[this.id] === this.value;
    }
    lean() {
      return new Ve(this.id, this.value);
    }
    static fromDict(e) {
      const t = e.children.map(je.fromDict);
      return new je(e.id, e.name, e.type, e.value, t);
    }
  }
  var ze = function (e, t) {
    return (
      (ze =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t;
          }) ||
        function (e, t) {
          for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        }),
      ze(e, t)
    );
  };
  function Ge(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError(
        "Class extends value " + String(t) + " is not a constructor or null"
      );
    function n() {
      this.constructor = e;
    }
    ze(e, t),
      (e.prototype =
        null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
  }
  var We = function () {
    return (
      (We =
        Object.assign ||
        function (e) {
          for (var t, n = 1, i = arguments.length; n < i; n++)
            for (var r in (t = arguments[n]))
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e;
        }),
      We.apply(this, arguments)
    );
  };
  function qe(e, t, n, i) {
    return new (n || (n = Promise))(function (r, s) {
      function o(e) {
        try {
          l(i.next(e));
        } catch (e) {
          s(e);
        }
      }
      function a(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          s(e);
        }
      }
      function l(e) {
        var t;
        e.done
          ? r(e.value)
          : ((t = e.value),
            t instanceof n
              ? t
              : new n(function (e) {
                  e(t);
                })).then(o, a);
      }
      l((i = i.apply(e, t || [])).next());
    });
  }
  function Ke(e, t) {
    var n,
      i,
      r,
      s,
      o = {
        label: 0,
        sent: function () {
          if (1 & r[0]) throw r[1];
          return r[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (s = { next: a(0), throw: a(1), return: a(2) }),
      "function" == typeof Symbol &&
        (s[Symbol.iterator] = function () {
          return this;
        }),
      s
    );
    function a(s) {
      return function (a) {
        return (function (s) {
          if (n) throw new TypeError("Generator is already executing.");
          for (; o; )
            try {
              if (
                ((n = 1),
                i &&
                  (r =
                    2 & s[0]
                      ? i.return
                      : s[0]
                      ? i.throw || ((r = i.return) && r.call(i), 0)
                      : i.next) &&
                  !(r = r.call(i, s[1])).done)
              )
                return r;
              switch (((i = 0), r && (s = [2 & s[0], r.value]), s[0])) {
                case 0:
                case 1:
                  r = s;
                  break;
                case 4:
                  return o.label++, { value: s[1], done: !1 };
                case 5:
                  o.label++, (i = s[1]), (s = [0]);
                  continue;
                case 7:
                  (s = o.ops.pop()), o.trys.pop();
                  continue;
                default:
                  if (
                    !((r = o.trys),
                    (r = r.length > 0 && r[r.length - 1]) ||
                      (6 !== s[0] && 2 !== s[0]))
                  ) {
                    o = 0;
                    continue;
                  }
                  if (3 === s[0] && (!r || (s[1] > r[0] && s[1] < r[3]))) {
                    o.label = s[1];
                    break;
                  }
                  if (6 === s[0] && o.label < r[1]) {
                    (o.label = r[1]), (r = s);
                    break;
                  }
                  if (r && o.label < r[2]) {
                    (o.label = r[2]), o.ops.push(s);
                    break;
                  }
                  r[2] && o.ops.pop(), o.trys.pop();
                  continue;
              }
              s = t.call(e, o);
            } catch (e) {
              (s = [6, e]), (i = 0);
            } finally {
              n = r = 0;
            }
          if (5 & s[0]) throw s[1];
          return { value: s[0] ? s[1] : void 0, done: !0 };
        })([s, a]);
      };
    }
  }
  function Xe(e) {
    var t = "function" == typeof Symbol && Symbol.iterator,
      n = t && e[t],
      i = 0;
    if (n) return n.call(e);
    if (e && "number" == typeof e.length)
      return {
        next: function () {
          return (
            e && i >= e.length && (e = void 0), { value: e && e[i++], done: !e }
          );
        },
      };
    throw new TypeError(
      t ? "Object is not iterable." : "Symbol.iterator is not defined."
    );
  }
  function Ye(e, t) {
    var n = "function" == typeof Symbol && e[Symbol.iterator];
    if (!n) return e;
    var i,
      r,
      s = n.call(e),
      o = [];
    try {
      for (; (void 0 === t || t-- > 0) && !(i = s.next()).done; )
        o.push(i.value);
    } catch (e) {
      r = { error: e };
    } finally {
      try {
        i && !i.done && (n = s.return) && n.call(s);
      } finally {
        if (r) throw r.error;
      }
    }
    return o;
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
  var Qe = (function () {
    function e(e) {
      void 0 === e && (e = {}), (this.adapter = e);
    }
    return (
      Object.defineProperty(e, "cssClasses", {
        get: function () {
          return {};
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "strings", {
        get: function () {
          return {};
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "numbers", {
        get: function () {
          return {};
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "defaultAdapter", {
        get: function () {
          return {};
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.init = function () {}),
      (e.prototype.destroy = function () {}),
      e
    );
  })();
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
   */ var Je = Object.freeze({
    __proto__: null,
    applyPassive: function (e) {
      return (
        void 0 === e && (e = window),
        !!(function (e) {
          void 0 === e && (e = window);
          var t = !1;
          try {
            var n = {
                get passive() {
                  return (t = !0), !1;
                },
              },
              i = function () {};
            e.document.addEventListener("test", i, n),
              e.document.removeEventListener("test", i, n);
          } catch (e) {
            t = !1;
          }
          return t;
        })(e) && { passive: !0 }
      );
    },
  });
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
   */ function Ze(e, t) {
    return (e.matches || e.webkitMatchesSelector || e.msMatchesSelector).call(
      e,
      t
    );
  }
  var et,
    tt = Object.freeze({
      __proto__: null,
      closest: function (e, t) {
        if (e.closest) return e.closest(t);
        for (var n = e; n; ) {
          if (Ze(n, t)) return n;
          n = n.parentElement;
        }
        return null;
      },
      matches: Ze,
      estimateScrollWidth: function (e) {
        var t = e;
        if (null !== t.offsetParent) return t.scrollWidth;
        var n = t.cloneNode(!0);
        n.style.setProperty("position", "absolute"),
          n.style.setProperty("transform", "translate(-9999px, -9999px)"),
          document.documentElement.appendChild(n);
        var i = n.scrollWidth;
        return document.documentElement.removeChild(n), i;
      },
    }),
    nt = {
      BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
      FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
      FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
      ROOT: "mdc-ripple-upgraded",
      UNBOUNDED: "mdc-ripple-upgraded--unbounded",
    },
    it = {
      VAR_FG_SCALE: "--mdc-ripple-fg-scale",
      VAR_FG_SIZE: "--mdc-ripple-fg-size",
      VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
      VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
      VAR_LEFT: "--mdc-ripple-left",
      VAR_TOP: "--mdc-ripple-top",
    },
    rt = {
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
   */
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
  var st = ["touchstart", "pointerdown", "mousedown", "keydown"],
    ot = ["touchend", "pointerup", "mouseup", "contextmenu"],
    at = [],
    lt = (function (e) {
      function t(n) {
        var i = e.call(this, We(We({}, t.defaultAdapter), n)) || this;
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
          (i.activateHandler = function (e) {
            i.activateImpl(e);
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
        Ge(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return nt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return it;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return rt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
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
        (t.prototype.init = function () {
          var e = this,
            n = this.supportsPressRipple();
          if ((this.registerRootHandlers(n), n)) {
            var i = t.cssClasses,
              r = i.ROOT,
              s = i.UNBOUNDED;
            requestAnimationFrame(function () {
              e.adapter.addClass(r),
                e.adapter.isUnbounded() &&
                  (e.adapter.addClass(s), e.layoutInternal());
            });
          }
        }),
        (t.prototype.destroy = function () {
          var e = this;
          if (this.supportsPressRipple()) {
            this.activationTimer &&
              (clearTimeout(this.activationTimer),
              (this.activationTimer = 0),
              this.adapter.removeClass(t.cssClasses.FG_ACTIVATION)),
              this.fgDeactivationRemovalTimer &&
                (clearTimeout(this.fgDeactivationRemovalTimer),
                (this.fgDeactivationRemovalTimer = 0),
                this.adapter.removeClass(t.cssClasses.FG_DEACTIVATION));
            var n = t.cssClasses,
              i = n.ROOT,
              r = n.UNBOUNDED;
            requestAnimationFrame(function () {
              e.adapter.removeClass(i),
                e.adapter.removeClass(r),
                e.removeCssVars();
            });
          }
          this.deregisterRootHandlers(), this.deregisterDeactivationHandlers();
        }),
        (t.prototype.activate = function (e) {
          this.activateImpl(e);
        }),
        (t.prototype.deactivate = function () {
          this.deactivateImpl();
        }),
        (t.prototype.layout = function () {
          var e = this;
          this.layoutFrame && cancelAnimationFrame(this.layoutFrame),
            (this.layoutFrame = requestAnimationFrame(function () {
              e.layoutInternal(), (e.layoutFrame = 0);
            }));
        }),
        (t.prototype.setUnbounded = function (e) {
          var n = t.cssClasses.UNBOUNDED;
          e ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (t.prototype.handleFocus = function () {
          var e = this;
          requestAnimationFrame(function () {
            return e.adapter.addClass(t.cssClasses.BG_FOCUSED);
          });
        }),
        (t.prototype.handleBlur = function () {
          var e = this;
          requestAnimationFrame(function () {
            return e.adapter.removeClass(t.cssClasses.BG_FOCUSED);
          });
        }),
        (t.prototype.supportsPressRipple = function () {
          return this.adapter.browserSupportsCssVars();
        }),
        (t.prototype.defaultActivationState = function () {
          return {
            activationEvent: void 0,
            hasDeactivationUXRun: !1,
            isActivated: !1,
            isProgrammatic: !1,
            wasActivatedByPointer: !1,
            wasElementMadeActive: !1,
          };
        }),
        (t.prototype.registerRootHandlers = function (e) {
          var t, n;
          if (e) {
            try {
              for (var i = Xe(st), r = i.next(); !r.done; r = i.next()) {
                var s = r.value;
                this.adapter.registerInteractionHandler(
                  s,
                  this.activateHandler
                );
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                r && !r.done && (n = i.return) && n.call(i);
              } finally {
                if (t) throw t.error;
              }
            }
            this.adapter.isUnbounded() &&
              this.adapter.registerResizeHandler(this.resizeHandler);
          }
          this.adapter.registerInteractionHandler("focus", this.focusHandler),
            this.adapter.registerInteractionHandler("blur", this.blurHandler);
        }),
        (t.prototype.registerDeactivationHandlers = function (e) {
          var t, n;
          if ("keydown" === e.type)
            this.adapter.registerInteractionHandler(
              "keyup",
              this.deactivateHandler
            );
          else
            try {
              for (var i = Xe(ot), r = i.next(); !r.done; r = i.next()) {
                var s = r.value;
                this.adapter.registerDocumentInteractionHandler(
                  s,
                  this.deactivateHandler
                );
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                r && !r.done && (n = i.return) && n.call(i);
              } finally {
                if (t) throw t.error;
              }
            }
        }),
        (t.prototype.deregisterRootHandlers = function () {
          var e, t;
          try {
            for (var n = Xe(st), i = n.next(); !i.done; i = n.next()) {
              var r = i.value;
              this.adapter.deregisterInteractionHandler(
                r,
                this.activateHandler
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              i && !i.done && (t = n.return) && t.call(n);
            } finally {
              if (e) throw e.error;
            }
          }
          this.adapter.deregisterInteractionHandler("focus", this.focusHandler),
            this.adapter.deregisterInteractionHandler("blur", this.blurHandler),
            this.adapter.isUnbounded() &&
              this.adapter.deregisterResizeHandler(this.resizeHandler);
        }),
        (t.prototype.deregisterDeactivationHandlers = function () {
          var e, t;
          this.adapter.deregisterInteractionHandler(
            "keyup",
            this.deactivateHandler
          );
          try {
            for (var n = Xe(ot), i = n.next(); !i.done; i = n.next()) {
              var r = i.value;
              this.adapter.deregisterDocumentInteractionHandler(
                r,
                this.deactivateHandler
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              i && !i.done && (t = n.return) && t.call(n);
            } finally {
              if (e) throw e.error;
            }
          }
        }),
        (t.prototype.removeCssVars = function () {
          var e = this,
            n = t.strings;
          Object.keys(n).forEach(function (t) {
            0 === t.indexOf("VAR_") && e.adapter.updateCssVariable(n[t], null);
          });
        }),
        (t.prototype.activateImpl = function (e) {
          var t = this;
          if (!this.adapter.isSurfaceDisabled()) {
            var n = this.activationState;
            if (!n.isActivated) {
              var i = this.previousActivationEvent;
              if (!(i && void 0 !== e && i.type !== e.type))
                (n.isActivated = !0),
                  (n.isProgrammatic = void 0 === e),
                  (n.activationEvent = e),
                  (n.wasActivatedByPointer =
                    !n.isProgrammatic &&
                    void 0 !== e &&
                    ("mousedown" === e.type ||
                      "touchstart" === e.type ||
                      "pointerdown" === e.type)),
                  void 0 !== e &&
                  at.length > 0 &&
                  at.some(function (e) {
                    return t.adapter.containsEventTarget(e);
                  })
                    ? this.resetActivationState()
                    : (void 0 !== e &&
                        (at.push(e.target),
                        this.registerDeactivationHandlers(e)),
                      (n.wasElementMadeActive = this.checkElementMadeActive(e)),
                      n.wasElementMadeActive && this.animateActivation(),
                      requestAnimationFrame(function () {
                        (at = []),
                          n.wasElementMadeActive ||
                            void 0 === e ||
                            (" " !== e.key && 32 !== e.keyCode) ||
                            ((n.wasElementMadeActive =
                              t.checkElementMadeActive(e)),
                            n.wasElementMadeActive && t.animateActivation()),
                          n.wasElementMadeActive ||
                            (t.activationState = t.defaultActivationState());
                      }));
            }
          }
        }),
        (t.prototype.checkElementMadeActive = function (e) {
          return (
            void 0 === e ||
            "keydown" !== e.type ||
            this.adapter.isSurfaceActive()
          );
        }),
        (t.prototype.animateActivation = function () {
          var e = this,
            n = t.strings,
            i = n.VAR_FG_TRANSLATE_START,
            r = n.VAR_FG_TRANSLATE_END,
            s = t.cssClasses,
            o = s.FG_DEACTIVATION,
            a = s.FG_ACTIVATION,
            l = t.numbers.DEACTIVATION_TIMEOUT_MS;
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
            this.adapter.updateCssVariable(r, u),
            clearTimeout(this.activationTimer),
            clearTimeout(this.fgDeactivationRemovalTimer),
            this.rmBoundedActivationClasses(),
            this.adapter.removeClass(o),
            this.adapter.computeBoundingRect(),
            this.adapter.addClass(a),
            (this.activationTimer = setTimeout(function () {
              e.activationTimerCallback();
            }, l));
        }),
        (t.prototype.getFgTranslationCoordinates = function () {
          var e,
            t = this.activationState,
            n = t.activationEvent;
          return {
            startPoint: (e = {
              x:
                (e = t.wasActivatedByPointer
                  ? (function (e, t, n) {
                      if (!e) return { x: 0, y: 0 };
                      var i,
                        r,
                        s = t.x,
                        o = t.y,
                        a = s + n.left,
                        l = o + n.top;
                      if ("touchstart" === e.type) {
                        var c = e;
                        (i = c.changedTouches[0].pageX - a),
                          (r = c.changedTouches[0].pageY - l);
                      } else {
                        var u = e;
                        (i = u.pageX - a), (r = u.pageY - l);
                      }
                      return { x: i, y: r };
                    })(
                      n,
                      this.adapter.getWindowPageOffset(),
                      this.adapter.computeBoundingRect()
                    )
                  : { x: this.frame.width / 2, y: this.frame.height / 2 }).x -
                this.initialSize / 2,
              y: e.y - this.initialSize / 2,
            }),
            endPoint: {
              x: this.frame.width / 2 - this.initialSize / 2,
              y: this.frame.height / 2 - this.initialSize / 2,
            },
          };
        }),
        (t.prototype.runDeactivationUXLogicIfReady = function () {
          var e = this,
            n = t.cssClasses.FG_DEACTIVATION,
            i = this.activationState,
            r = i.hasDeactivationUXRun,
            s = i.isActivated;
          (r || !s) &&
            this.activationAnimationHasEnded &&
            (this.rmBoundedActivationClasses(),
            this.adapter.addClass(n),
            (this.fgDeactivationRemovalTimer = setTimeout(function () {
              e.adapter.removeClass(n);
            }, rt.FG_DEACTIVATION_MS)));
        }),
        (t.prototype.rmBoundedActivationClasses = function () {
          var e = t.cssClasses.FG_ACTIVATION;
          this.adapter.removeClass(e),
            (this.activationAnimationHasEnded = !1),
            this.adapter.computeBoundingRect();
        }),
        (t.prototype.resetActivationState = function () {
          var e = this;
          (this.previousActivationEvent = this.activationState.activationEvent),
            (this.activationState = this.defaultActivationState()),
            setTimeout(function () {
              return (e.previousActivationEvent = void 0);
            }, t.numbers.TAP_DELAY_MS);
        }),
        (t.prototype.deactivateImpl = function () {
          var e = this,
            t = this.activationState;
          if (t.isActivated) {
            var n = We({}, t);
            t.isProgrammatic
              ? (requestAnimationFrame(function () {
                  e.animateDeactivation(n);
                }),
                this.resetActivationState())
              : (this.deregisterDeactivationHandlers(),
                requestAnimationFrame(function () {
                  (e.activationState.hasDeactivationUXRun = !0),
                    e.animateDeactivation(n),
                    e.resetActivationState();
                }));
          }
        }),
        (t.prototype.animateDeactivation = function (e) {
          var t = e.wasActivatedByPointer,
            n = e.wasElementMadeActive;
          (t || n) && this.runDeactivationUXLogicIfReady();
        }),
        (t.prototype.layoutInternal = function () {
          var e = this;
          this.frame = this.adapter.computeBoundingRect();
          var n = Math.max(this.frame.height, this.frame.width);
          this.maxRadius = this.adapter.isUnbounded()
            ? n
            : Math.sqrt(
                Math.pow(e.frame.width, 2) + Math.pow(e.frame.height, 2)
              ) + t.numbers.PADDING;
          var i = Math.floor(n * t.numbers.INITIAL_ORIGIN_SCALE);
          this.adapter.isUnbounded() && i % 2 != 0
            ? (this.initialSize = i - 1)
            : (this.initialSize = i),
            (this.fgScale = "" + this.maxRadius / this.initialSize),
            this.updateLayoutCssVars();
        }),
        (t.prototype.updateLayoutCssVars = function () {
          var e = t.strings,
            n = e.VAR_FG_SIZE,
            i = e.VAR_LEFT,
            r = e.VAR_TOP,
            s = e.VAR_FG_SCALE;
          this.adapter.updateCssVariable(n, this.initialSize + "px"),
            this.adapter.updateCssVariable(s, this.fgScale),
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
                r,
                this.unboundedCoords.top + "px"
              ));
        }),
        t
      );
    })(Qe),
    ct = {
      FIXED_CLASS: "mdc-top-app-bar--fixed",
      FIXED_SCROLLED_CLASS: "mdc-top-app-bar--fixed-scrolled",
      SHORT_CLASS: "mdc-top-app-bar--short",
      SHORT_COLLAPSED_CLASS: "mdc-top-app-bar--short-collapsed",
      SHORT_HAS_ACTION_ITEM_CLASS: "mdc-top-app-bar--short-has-action-item",
    },
    ut = { DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100, MAX_TOP_APP_BAR_HEIGHT: 128 },
    dt = {
      ACTION_ITEM_SELECTOR: ".mdc-top-app-bar__action-item",
      NAVIGATION_EVENT: "MDCTopAppBar:nav",
      NAVIGATION_ICON_SELECTOR: ".mdc-top-app-bar__navigation-icon",
      ROOT_SELECTOR: ".mdc-top-app-bar",
      TITLE_SELECTOR: ".mdc-top-app-bar__title",
    },
    pt = (function (e) {
      function t(n) {
        return e.call(this, We(We({}, t.defaultAdapter), n)) || this;
      }
      return (
        Ge(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return dt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return ct;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return ut;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
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
        (t.prototype.handleTargetScroll = function () {}),
        (t.prototype.handleWindowResize = function () {}),
        (t.prototype.handleNavigationClick = function () {
          this.adapter.notifyNavigationIconClicked();
        }),
        t
      );
    })(Qe),
    ft = (function (e) {
      function t(t) {
        var n = e.call(this, t) || this;
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
        Ge(t, e),
        (t.prototype.destroy = function () {
          e.prototype.destroy.call(this), this.adapter.setStyle("top", "");
        }),
        (t.prototype.handleTargetScroll = function () {
          var e = Math.max(this.adapter.getViewportScrollY(), 0),
            t = e - this.lastScrollPosition;
          (this.lastScrollPosition = e),
            this.isCurrentlyBeingResized ||
              ((this.currentAppBarOffsetTop -= t),
              this.currentAppBarOffsetTop > 0
                ? (this.currentAppBarOffsetTop = 0)
                : Math.abs(this.currentAppBarOffsetTop) >
                    this.topAppBarHeight &&
                  (this.currentAppBarOffsetTop = -this.topAppBarHeight),
              this.moveTopAppBar());
        }),
        (t.prototype.handleWindowResize = function () {
          var e = this;
          this.resizeThrottleId ||
            (this.resizeThrottleId = setTimeout(function () {
              (e.resizeThrottleId = 0), e.throttledResizeHandler();
            }, ut.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)),
            (this.isCurrentlyBeingResized = !0),
            this.resizeDebounceId && clearTimeout(this.resizeDebounceId),
            (this.resizeDebounceId = setTimeout(function () {
              e.handleTargetScroll(),
                (e.isCurrentlyBeingResized = !1),
                (e.resizeDebounceId = 0);
            }, ut.DEBOUNCE_THROTTLE_RESIZE_TIME_MS));
        }),
        (t.prototype.checkForUpdate = function () {
          var e = -this.topAppBarHeight,
            t = this.currentAppBarOffsetTop < 0,
            n = this.currentAppBarOffsetTop > e,
            i = t && n;
          if (i) this.wasDocked = !1;
          else {
            if (!this.wasDocked) return (this.wasDocked = !0), !0;
            if (this.isDockedShowing !== n)
              return (this.isDockedShowing = n), !0;
          }
          return i;
        }),
        (t.prototype.moveTopAppBar = function () {
          if (this.checkForUpdate()) {
            var e = this.currentAppBarOffsetTop;
            Math.abs(e) >= this.topAppBarHeight &&
              (e = -ut.MAX_TOP_APP_BAR_HEIGHT),
              this.adapter.setStyle("top", e + "px");
          }
        }),
        (t.prototype.throttledResizeHandler = function () {
          var e = this.adapter.getTopAppBarHeight();
          this.topAppBarHeight !== e &&
            ((this.wasDocked = !1),
            (this.currentAppBarOffsetTop -= this.topAppBarHeight - e),
            (this.topAppBarHeight = e)),
            this.handleTargetScroll();
        }),
        t
      );
    })(pt),
    ht = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t.wasScrolled = !1), t;
      }
      return (
        Ge(t, e),
        (t.prototype.handleTargetScroll = function () {
          this.adapter.getViewportScrollY() <= 0
            ? this.wasScrolled &&
              (this.adapter.removeClass(ct.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !1))
            : this.wasScrolled ||
              (this.adapter.addClass(ct.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !0));
        }),
        t
      );
    })(ft),
    mt = (function (e) {
      function t(t) {
        var n = e.call(this, t) || this;
        return (n.collapsed = !1), (n.isAlwaysCollapsed = !1), n;
      }
      return (
        Ge(t, e),
        Object.defineProperty(t.prototype, "isCollapsed", {
          get: function () {
            return this.collapsed;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.init = function () {
          e.prototype.init.call(this),
            this.adapter.getTotalActionItems() > 0 &&
              this.adapter.addClass(ct.SHORT_HAS_ACTION_ITEM_CLASS),
            this.setAlwaysCollapsed(
              this.adapter.hasClass(ct.SHORT_COLLAPSED_CLASS)
            );
        }),
        (t.prototype.setAlwaysCollapsed = function (e) {
          (this.isAlwaysCollapsed = !!e),
            this.isAlwaysCollapsed ? this.collapse() : this.maybeCollapseBar();
        }),
        (t.prototype.getAlwaysCollapsed = function () {
          return this.isAlwaysCollapsed;
        }),
        (t.prototype.handleTargetScroll = function () {
          this.maybeCollapseBar();
        }),
        (t.prototype.maybeCollapseBar = function () {
          this.isAlwaysCollapsed ||
            (this.adapter.getViewportScrollY() <= 0
              ? this.collapsed && this.uncollapse()
              : this.collapsed || this.collapse());
        }),
        (t.prototype.uncollapse = function () {
          this.adapter.removeClass(ct.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !1);
        }),
        (t.prototype.collapse = function () {
          this.adapter.addClass(ct.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !0);
        }),
        t
      );
    })(pt);
  const gt = [];
  function $t(t, n = e) {
    let i;
    const r = new Set();
    function s(e) {
      if (a(t, e) && ((t = e), i)) {
        const e = !gt.length;
        for (const e of r) e[1](), gt.push(e, t);
        if (e) {
          for (let e = 0; e < gt.length; e += 2) gt[e][0](gt[e + 1]);
          gt.length = 0;
        }
      }
    }
    return {
      set: s,
      update: function (e) {
        s(e(t));
      },
      subscribe: function (o, a = e) {
        const l = [o, a];
        return (
          r.add(l),
          1 === r.size && (i = n(s) || e),
          o(t),
          () => {
            r.delete(l), 0 === r.size && (i(), (i = null));
          }
        );
      },
    };
  }
  function yt(e) {
    return Object.entries(e)
      .filter(([e, t]) => "" !== e && t)
      .map(([e]) => e)
      .join(" ");
  }
  function vt(e, t, n, i = { bubbles: !0 }, r = !1) {
    if ("undefined" != typeof Event && e) {
      const s = new CustomEvent(
        t,
        Object.assign(Object.assign({}, i), { detail: n })
      );
      if ((null == e || e.dispatchEvent(s), r && t.startsWith("SMUI"))) {
        const r = new CustomEvent(
          t.replace(/^SMUI/g, () => "MDC"),
          Object.assign(Object.assign({}, i), { detail: n })
        );
        null == e || e.dispatchEvent(r),
          r.defaultPrevented && s.preventDefault();
      }
      return s;
    }
  }
  function It(e, t) {
    let n = Object.getOwnPropertyNames(e);
    const i = {};
    for (let r = 0; r < n.length; r++) {
      const s = n[r],
        o = s.indexOf("$");
      (-1 !== o && -1 !== t.indexOf(s.substring(0, o + 1))) ||
        (-1 === t.indexOf(s) && (i[s] = e[s]));
    }
    return i;
  }
  const bt =
      /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/,
    Et =
      /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
  function xt(e) {
    let t,
      n = [];
    function i(t) {
      se(e, t);
    }
    return (
      (e.$on = (e, i) => {
        let r = e,
          s = () => {};
        t ? (s = t(r, i)) : n.push([r, i]);
        return (
          r.match(bt) &&
            console &&
            console.warn(
              'Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ',
              r
            ),
          () => {
            s();
          }
        );
      }),
      (e) => {
        const r = [],
          s = {};
        t = (t, n) => {
          let o = t,
            a = n,
            l = !1;
          const c = o.match(bt),
            u = o.match(Et),
            d = c || u;
          if (o.match(/^SMUI:\w+:/)) {
            const e = o.split(":");
            let t = "";
            for (let n = 0; n < e.length; n++)
              t +=
                n === e.length - 1
                  ? ":" + e[n]
                  : e[n]
                      .split("-")
                      .map((e) => e.slice(0, 1).toUpperCase() + e.slice(1))
                      .join("");
            console.warn(
              `The event ${o.split("$")[0]} has been renamed to ${
                t.split("$")[0]
              }.`
            ),
              (o = t);
          }
          if (d) {
            const e = o.split(c ? ":" : "$");
            o = e[0];
            const t = Object.fromEntries(e.slice(1).map((e) => [e, !0]));
            t.passive && ((l = l || {}), (l.passive = !0)),
              t.nonpassive && ((l = l || {}), (l.passive = !1)),
              t.capture && ((l = l || {}), (l.capture = !0)),
              t.once && ((l = l || {}), (l.once = !0)),
              t.preventDefault &&
                ((p = a),
                (a = function (e) {
                  return e.preventDefault(), p.call(this, e);
                })),
              t.stopPropagation &&
                (a = (function (e) {
                  return function (t) {
                    return t.stopPropagation(), e.call(this, t);
                  };
                })(a));
          }
          var p;
          const f = k(e, o, a, l),
            h = () => {
              f();
              const e = r.indexOf(h);
              e > -1 && r.splice(e, 1);
            };
          return r.push(h), o in s || (s[o] = k(e, o, i)), h;
        };
        for (let e = 0; e < n.length; e++) t(n[e][0], n[e][1]);
        return {
          destroy: () => {
            for (let e = 0; e < r.length; e++) r[e]();
            for (let e of Object.entries(s)) e[1]();
          },
        };
      }
    );
  }
  function At(e, t) {
    let n = Object.getOwnPropertyNames(e);
    const i = {};
    for (let r = 0; r < n.length; r++) {
      const s = n[r];
      s.substring(0, t.length) === t && (i[s.substring(t.length)] = e[s]);
    }
    return i;
  }
  function Ct(e, t) {
    let n = [];
    if (t)
      for (let i = 0; i < t.length; i++) {
        const r = t[i],
          s = Array.isArray(r) ? r[0] : r;
        Array.isArray(r) && r.length > 1 ? n.push(s(e, r[1])) : n.push(s(e));
      }
    return {
      update(e) {
        if (((e && e.length) || 0) != n.length)
          throw new Error(
            "You must not change the length of an actions array."
          );
        if (e)
          for (let t = 0; t < e.length; t++) {
            const i = n[t];
            if (i && i.update) {
              const n = e[t];
              Array.isArray(n) && n.length > 1 ? i.update(n[1]) : i.update();
            }
          }
      },
      destroy() {
        for (let e = 0; e < n.length; e++) {
          const t = n[e];
          t && t.destroy && t.destroy();
        }
      },
    };
  }
  const { window: _t } = Le;
  function St(e) {
    let t, i, r, a, l, u, h;
    const m = e[22].default,
      g = c(m, e, e[21], null);
    let $ = [
        {
          class: (i = yt({
            [e[2]]: !0,
            "mdc-top-app-bar": !0,
            "mdc-top-app-bar--short": "short" === e[4],
            "mdc-top-app-bar--short-collapsed": e[0],
            "mdc-top-app-bar--fixed": "fixed" === e[4],
            "smui-top-app-bar--static": "static" === e[4],
            "smui-top-app-bar--color-secondary": "secondary" === e[5],
            "mdc-top-app-bar--prominent": e[6],
            "mdc-top-app-bar--dense": e[7],
            ...e[11],
          })),
        },
        { style: (r = Object.entries(e[12]).map(Tt).concat([e[3]]).join(" ")) },
        e[15],
      ],
      y = {};
    for (let e = 0; e < $.length; e += 1) y = n(y, $[e]);
    return {
      c() {
        (t = M("header")), g && g.c(), H(t, y);
      },
      m(n, i) {
        L(n, t, i),
          g && g.m(t, null),
          e[25](t),
          (l = !0),
          u ||
            ((h = [
              k(_t, "resize", e[23]),
              k(_t, "scroll", e[24]),
              v((a = Ct.call(null, t, e[1]))),
              v(e[13].call(null, t)),
              k(t, "SMUITopAppBarIconButton:nav", e[26]),
            ]),
            (u = !0));
      },
      p(e, n) {
        g &&
          g.p &&
          (!l || 2097152 & n[0]) &&
          p(g, m, e, e[21], l ? d(m, e[21], n, null) : f(e[21]), null),
          H(
            t,
            (y = Ne($, [
              (!l ||
                (2293 & n[0] &&
                  i !==
                    (i = yt({
                      [e[2]]: !0,
                      "mdc-top-app-bar": !0,
                      "mdc-top-app-bar--short": "short" === e[4],
                      "mdc-top-app-bar--short-collapsed": e[0],
                      "mdc-top-app-bar--fixed": "fixed" === e[4],
                      "smui-top-app-bar--static": "static" === e[4],
                      "smui-top-app-bar--color-secondary": "secondary" === e[5],
                      "mdc-top-app-bar--prominent": e[6],
                      "mdc-top-app-bar--dense": e[7],
                      ...e[11],
                    })))) && { class: i },
              (!l ||
                (4104 & n[0] &&
                  r !==
                    (r = Object.entries(e[12])
                      .map(Tt)
                      .concat([e[3]])
                      .join(" ")))) && { style: r },
              32768 & n[0] && e[15],
            ]))
          ),
          a && o(a.update) && 2 & n[0] && a.update.call(null, e[1]);
      },
      i(e) {
        l || (_e(g, e), (l = !0));
      },
      o(e) {
        Se(g, e), (l = !1);
      },
      d(n) {
        n && O(t), g && g.d(n), e[25](null), (u = !1), s(h);
      },
    };
  }
  const Tt = ([e, t]) => `${e}: ${t};`;
  function Lt(e, t, i) {
    const r = [
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
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t;
    const l = xt(Z());
    let c = () => {};
    function u(e) {
      return e === c;
    }
    let { use: d = [] } = t,
      { class: p = "" } = t,
      { style: f = "" } = t,
      { variant: g = "standard" } = t,
      { color: $ = "primary" } = t,
      { collapsed: y = c } = t;
    const v = !u(y) && !!y;
    u(y) && (y = !1);
    let I,
      b,
      E,
      { prominent: x = !1 } = t,
      { dense: A = !1 } = t,
      { scrollTarget: C } = t,
      _ = {},
      S = {},
      T = {
        subscribe: $t({ variant: g, prominent: x, dense: A }, (e) => {
          i(18, (E = e));
        }).subscribe,
      };
    let L,
      O = g;
    function w() {
      return new ({ static: pt, short: mt, fixed: ht }[g] || ft)({
        hasClass: M,
        addClass: N,
        removeClass: D,
        setStyle: R,
        getTopAppBarHeight: () => I.clientHeight,
        notifyNavigationIconClicked: () =>
          vt(I, "SMUITopAppBar:nav", void 0, void 0, !0),
        getViewportScrollY: () =>
          null == C ? window.pageYOffset : C.scrollTop,
        getTotalActionItems: () =>
          I.querySelectorAll(".mdc-top-app-bar__action-item").length,
      });
    }
    function M(e) {
      return e in _ ? _[e] : k().classList.contains(e);
    }
    function N(e) {
      _[e] || i(11, (_[e] = !0), _);
    }
    function D(e) {
      (e in _ && !_[e]) || i(11, (_[e] = !1), _);
    }
    function R(e, t) {
      S[e] != t &&
        ("" === t || null == t
          ? (delete S[e], i(12, S), i(20, O), i(4, g), i(9, b))
          : i(12, (S[e] = t), S));
    }
    function F() {
      b &&
        (b.handleTargetScroll(),
        "short" === g && i(0, (y = "isCollapsed" in b && b.isCollapsed)));
    }
    function k() {
      return I;
    }
    ee(
      () => (
        i(9, (b = w())),
        b.init(),
        () => {
          b.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(15, (s = m(t, r))),
          "use" in e && i(1, (d = e.use)),
          "class" in e && i(2, (p = e.class)),
          "style" in e && i(3, (f = e.style)),
          "variant" in e && i(4, (g = e.variant)),
          "color" in e && i(5, ($ = e.color)),
          "collapsed" in e && i(0, (y = e.collapsed)),
          "prominent" in e && i(6, (x = e.prominent)),
          "dense" in e && i(7, (A = e.dense)),
          "scrollTarget" in e && i(8, (C = e.scrollTarget)),
          "$$scope" in e && i(21, (a = e.$$scope));
      }),
      (e.$$.update = () => {
        262352 & e.$$.dirty[0] &&
          E &&
          E({ variant: g, prominent: x, dense: A }),
          1049104 & e.$$.dirty[0] &&
            O !== g &&
            b &&
            (i(20, (O = g)),
            b.destroy(),
            i(11, (_ = {})),
            i(12, (S = {})),
            i(9, (b = w())),
            b.init()),
          528 & e.$$.dirty[0] &&
            b &&
            "short" === g &&
            "setAlwaysCollapsed" in b &&
            b.setAlwaysCollapsed(v),
          524544 & e.$$.dirty[0] &&
            L !== C &&
            (L && L.removeEventListener("scroll", F),
            C && C.addEventListener("scroll", F),
            i(19, (L = C)));
      }),
      [
        y,
        d,
        p,
        f,
        g,
        $,
        x,
        A,
        C,
        b,
        I,
        _,
        S,
        l,
        F,
        s,
        function () {
          return T;
        },
        k,
        E,
        L,
        O,
        a,
        o,
        () => "short" !== g && "fixed" !== g && b && b.handleWindowResize(),
        () => null == C && F(),
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (I = e), i(10, I);
          });
        },
        () => b && b.handleNavigationClick(),
      ]
    );
  }
  class Ot extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          Lt,
          St,
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
  function wt(e) {
    let t, i, r, a, l;
    const u = e[6].default,
      h = c(u, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = M("div")), h && h.c(), H(t, g);
      },
      m(n, s) {
        L(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          a ||
            ((l = [v((i = Ct.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (a = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, u, e, e[5], r ? d(u, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && o(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (_e(h, e), (r = !0));
      },
      o(e) {
        Se(h, e), (r = !1);
      },
      d(n) {
        n && O(t), h && h.d(n), e[7](null), (a = !1), s(l);
      },
    };
  }
  function Mt(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t,
      { use: l = [] } = t;
    const c = xt(Z());
    let u;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (a = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  class Nt extends Pe {
    constructor(e) {
      super(), He(this, e, Mt, wt, a, { use: 0, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function Dt(e) {
    let t;
    const n = e[10].default,
      i = c(n, e, e[12], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 4096 & r) &&
          p(i, n, e, e[12], t ? d(n, e[12], r, null) : f(e[12]), null);
      },
      i(e) {
        t || (_e(i, e), (t = !0));
      },
      o(e) {
        Se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Rt(e) {
    let t, i, r;
    const s = [
      { use: [e[7], ...e[0]] },
      { class: yt({ [e[1]]: !0, [e[5]]: !0, ...e[4] }) },
      e[6],
      e[8],
    ];
    var o = e[2];
    function a(e) {
      let t = { $$slots: { default: [Dt] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) t = n(t, s[e]);
      return { props: t };
    }
    return (
      o && ((t = new o(a(e))), e[11](t)),
      {
        c() {
          t && Fe(t.$$.fragment), (i = F());
        },
        m(e, n) {
          t && ke(t, e, n), L(e, i, n), (r = !0);
        },
        p(e, [n]) {
          const r =
            499 & n
              ? Ne(s, [
                  129 & n && { use: [e[7], ...e[0]] },
                  50 & n && { class: yt({ [e[1]]: !0, [e[5]]: !0, ...e[4] }) },
                  64 & n && De(e[6]),
                  256 & n && De(e[8]),
                ])
              : {};
          if (
            (4096 & n && (r.$$scope = { dirty: n, ctx: e }), o !== (o = e[2]))
          ) {
            if (t) {
              Ae();
              const e = t;
              Se(e.$$.fragment, 1, 0, () => {
                Ue(e, 1);
              }),
                Ce();
            }
            o
              ? ((t = new o(a(e))),
                e[11](t),
                Fe(t.$$.fragment),
                _e(t.$$.fragment, 1),
                ke(t, i.parentNode, i))
              : (t = null);
          } else o && t.$set(r);
        },
        i(e) {
          r || (t && _e(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          t && Se(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[11](null), n && O(i), t && Ue(t, n);
        },
      }
    );
  }
  const Ft = {
    component: Nt,
    class: "",
    classMap: {},
    contexts: {},
    props: {},
  };
  function kt(e, t, i) {
    const r = ["use", "class", "component", "getElement"];
    let s,
      o = m(t, r),
      { $$slots: a = {}, $$scope: l } = t,
      { use: c = [] } = t,
      { class: u = "" } = t;
    const d = Ft.class,
      p = {},
      f = [],
      g = Ft.contexts,
      $ = Ft.props;
    let { component: y = Ft.component } = t;
    Object.entries(Ft.classMap).forEach(([e, t]) => {
      const n = re(t);
      n &&
        "subscribe" in n &&
        f.push(
          n.subscribe((t) => {
            i(4, (p[e] = t), p);
          })
        );
    });
    const v = xt(Z());
    for (let e in g) g.hasOwnProperty(e) && ie(e, g[e]);
    return (
      te(() => {
        for (const e of f) e();
      }),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(8, (o = m(t, r))),
          "use" in e && i(0, (c = e.use)),
          "class" in e && i(1, (u = e.class)),
          "component" in e && i(2, (y = e.component)),
          "$$scope" in e && i(12, (l = e.$$scope));
      }),
      [
        c,
        u,
        y,
        s,
        p,
        d,
        $,
        v,
        o,
        function () {
          return s.getElement();
        },
        a,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (s = e), i(3, s);
          });
        },
        l,
      ]
    );
  }
  class Ut extends Pe {
    constructor(e) {
      super(),
        He(this, e, kt, Rt, a, {
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
  const Ht = Object.assign({}, Ft);
  function Pt(e) {
    return new Proxy(Ut, {
      construct: function (t, n) {
        return Object.assign(Ft, Ht, e), new t(...n);
      },
      get: function (t, n) {
        return Object.assign(Ft, Ht, e), t[n];
      },
    });
  }
  function Bt(e) {
    let t, i, r, a, l;
    const u = e[7].default,
      h = c(u, e, e[6], null);
    let m = [{ href: e[1] }, e[4]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = M("a")), h && h.c(), H(t, g);
      },
      m(n, s) {
        L(n, t, s),
          h && h.m(t, null),
          e[8](t),
          (r = !0),
          a ||
            ((l = [v((i = Ct.call(null, t, e[0]))), v(e[3].call(null, t))]),
            (a = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 64 & n) &&
          p(h, u, e, e[6], r ? d(u, e[6], n, null) : f(e[6]), null),
          H(t, (g = Ne(m, [(!r || 2 & n) && { href: e[1] }, 16 & n && e[4]]))),
          i && o(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (_e(h, e), (r = !0));
      },
      o(e) {
        Se(h, e), (r = !1);
      },
      d(n) {
        n && O(t), h && h.d(n), e[8](null), (a = !1), s(l);
      },
    };
  }
  function Vt(e, t, i) {
    const r = ["use", "href", "getElement"];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t,
      { use: l = [] } = t,
      { href: c = "javascript:void(0);" } = t;
    const u = xt(Z());
    let d;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(4, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "href" in e && i(1, (c = e.href)),
          "$$scope" in e && i(6, (a = e.$$scope));
      }),
      [
        l,
        c,
        d,
        u,
        s,
        function () {
          return d;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (d = e), i(2, d);
          });
        },
      ]
    );
  }
  function jt(e) {
    let t, i, r, a, l;
    const u = e[6].default,
      h = c(u, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = M("button")), h && h.c(), H(t, g);
      },
      m(n, s) {
        L(n, t, s),
          h && h.m(t, null),
          t.autofocus && t.focus(),
          e[7](t),
          (r = !0),
          a ||
            ((l = [v((i = Ct.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (a = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, u, e, e[5], r ? d(u, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && o(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (_e(h, e), (r = !0));
      },
      o(e) {
        Se(h, e), (r = !1);
      },
      d(n) {
        n && O(t), h && h.d(n), e[7](null), (a = !1), s(l);
      },
    };
  }
  function zt(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t,
      { use: l = [] } = t;
    const c = xt(Z());
    let u;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (a = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  function Gt(e) {
    let t, i, r, a, l;
    const u = e[6].default,
      h = c(u, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = M("h1")), h && h.c(), H(t, g);
      },
      m(n, s) {
        L(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          a ||
            ((l = [v((i = Ct.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (a = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, u, e, e[5], r ? d(u, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && o(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (_e(h, e), (r = !0));
      },
      o(e) {
        Se(h, e), (r = !1);
      },
      d(n) {
        n && O(t), h && h.d(n), e[7](null), (a = !1), s(l);
      },
    };
  }
  function Wt(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t,
      { use: l = [] } = t;
    const c = xt(Z());
    let u;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (a = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  function qt(e) {
    let t, i, r, a, l;
    const u = e[6].default,
      h = c(u, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = M("h2")), h && h.c(), H(t, g);
      },
      m(n, s) {
        L(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          a ||
            ((l = [v((i = Ct.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (a = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, u, e, e[5], r ? d(u, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && o(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (_e(h, e), (r = !0));
      },
      o(e) {
        Se(h, e), (r = !1);
      },
      d(n) {
        n && O(t), h && h.d(n), e[7](null), (a = !1), s(l);
      },
    };
  }
  function Kt(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t,
      { use: l = [] } = t;
    const c = xt(Z());
    let u;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (a = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  function Xt(e) {
    let t, i, r, a, l;
    const u = e[6].default,
      h = c(u, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = M("h3")), h && h.c(), H(t, g);
      },
      m(n, s) {
        L(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          a ||
            ((l = [v((i = Ct.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (a = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, u, e, e[5], r ? d(u, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && o(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (_e(h, e), (r = !0));
      },
      o(e) {
        Se(h, e), (r = !1);
      },
      d(n) {
        n && O(t), h && h.d(n), e[7](null), (a = !1), s(l);
      },
    };
  }
  function Yt(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t,
      { use: l = [] } = t;
    const c = xt(Z());
    let u;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (a = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  function Qt(e) {
    let t, i, r, a, l;
    const u = e[6].default,
      h = c(u, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = M("li")), h && h.c(), H(t, g);
      },
      m(n, s) {
        L(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          a ||
            ((l = [v((i = Ct.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (a = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, u, e, e[5], r ? d(u, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && o(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (_e(h, e), (r = !0));
      },
      o(e) {
        Se(h, e), (r = !1);
      },
      d(n) {
        n && O(t), h && h.d(n), e[7](null), (a = !1), s(l);
      },
    };
  }
  function Jt(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t,
      { use: l = [] } = t;
    const c = xt(Z());
    let u;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (a = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  function Zt(e) {
    let t, i, r, a, l;
    const u = e[6].default,
      h = c(u, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = M("nav")), h && h.c(), H(t, g);
      },
      m(n, s) {
        L(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          a ||
            ((l = [v((i = Ct.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (a = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, u, e, e[5], r ? d(u, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && o(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (_e(h, e), (r = !0));
      },
      o(e) {
        Se(h, e), (r = !1);
      },
      d(n) {
        n && O(t), h && h.d(n), e[7](null), (a = !1), s(l);
      },
    };
  }
  function en(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t,
      { use: l = [] } = t;
    const c = xt(Z());
    let u;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (a = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  function tn(e) {
    let t, i, r, a, l;
    const u = e[6].default,
      h = c(u, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = M("span")), h && h.c(), H(t, g);
      },
      m(n, s) {
        L(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          a ||
            ((l = [v((i = Ct.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (a = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, u, e, e[5], r ? d(u, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && o(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (_e(h, e), (r = !0));
      },
      o(e) {
        Se(h, e), (r = !1);
      },
      d(n) {
        n && O(t), h && h.d(n), e[7](null), (a = !1), s(l);
      },
    };
  }
  function nn(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t,
      { use: l = [] } = t;
    const c = xt(Z());
    let u;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (a = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  class rn extends Pe {
    constructor(e) {
      super(), He(this, e, nn, tn, a, { use: 0, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function sn(e) {
    let t, i, r, a, l;
    const u = e[6].default,
      h = c(u, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = M("ul")), h && h.c(), H(t, g);
      },
      m(n, s) {
        L(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          a ||
            ((l = [v((i = Ct.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (a = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, u, e, e[5], r ? d(u, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && o(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (_e(h, e), (r = !0));
      },
      o(e) {
        Se(h, e), (r = !1);
      },
      d(n) {
        n && O(t), h && h.d(n), e[7](null), (a = !1), s(l);
      },
    };
  }
  function on(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t,
      { use: l = [] } = t;
    const c = xt(Z());
    let u;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (a = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  const an = class extends Pe {
      constructor(e) {
        super(), He(this, e, Vt, Bt, a, { use: 0, href: 1, getElement: 5 });
      }
      get getElement() {
        return this.$$.ctx[5];
      }
    },
    ln = class extends Pe {
      constructor(e) {
        super(), He(this, e, zt, jt, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    cn = Nt,
    un = class extends Pe {
      constructor(e) {
        super(), He(this, e, Wt, Gt, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    dn = class extends Pe {
      constructor(e) {
        super(), He(this, e, Kt, qt, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    pn = class extends Pe {
      constructor(e) {
        super(), He(this, e, Yt, Xt, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    fn = class extends Pe {
      constructor(e) {
        super(), He(this, e, Jt, Qt, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    hn = class extends Pe {
      constructor(e) {
        super(), He(this, e, en, Zt, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    mn = rn,
    gn = class extends Pe {
      constructor(e) {
        super(), He(this, e, on, sn, a, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    };
  var $n = Pt({ class: "mdc-top-app-bar__row", component: cn });
  function yn(e) {
    let t, i, r, a, l, u;
    const h = e[9].default,
      m = c(h, e, e[8], null);
    let g = [
        {
          class: (i = yt({
            [e[1]]: !0,
            "mdc-top-app-bar__section": !0,
            "mdc-top-app-bar__section--align-start": "start" === e[2],
            "mdc-top-app-bar__section--align-end": "end" === e[2],
          })),
        },
        e[3] ? { role: "toolbar" } : {},
        e[6],
      ],
      $ = {};
    for (let e = 0; e < g.length; e += 1) $ = n($, g[e]);
    return {
      c() {
        (t = M("section")), m && m.c(), H(t, $);
      },
      m(n, i) {
        L(n, t, i),
          m && m.m(t, null),
          e[10](t),
          (a = !0),
          l ||
            ((u = [v((r = Ct.call(null, t, e[0]))), v(e[5].call(null, t))]),
            (l = !0));
      },
      p(e, [n]) {
        m &&
          m.p &&
          (!a || 256 & n) &&
          p(m, h, e, e[8], a ? d(h, e[8], n, null) : f(e[8]), null),
          H(
            t,
            ($ = Ne(g, [
              (!a ||
                (6 & n &&
                  i !==
                    (i = yt({
                      [e[1]]: !0,
                      "mdc-top-app-bar__section": !0,
                      "mdc-top-app-bar__section--align-start": "start" === e[2],
                      "mdc-top-app-bar__section--align-end": "end" === e[2],
                    })))) && { class: i },
              8 & n && (e[3] ? { role: "toolbar" } : {}),
              64 & n && e[6],
            ]))
          ),
          r && o(r.update) && 1 & n && r.update.call(null, e[0]);
      },
      i(e) {
        a || (_e(m, e), (a = !0));
      },
      o(e) {
        Se(m, e), (a = !1);
      },
      d(n) {
        n && O(t), m && m.d(n), e[10](null), (l = !1), s(u);
      },
    };
  }
  function vn(e, t, i) {
    const r = ["use", "class", "align", "toolbar", "getElement"];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t;
    const l = xt(Z());
    let c,
      { use: u = [] } = t,
      { class: d = "" } = t,
      { align: p = "start" } = t,
      { toolbar: f = !1 } = t;
    return (
      ie(
        "SMUI:icon-button:context",
        f ? "top-app-bar:action" : "top-app-bar:navigation"
      ),
      ie(
        "SMUI:button:context",
        f ? "top-app-bar:action" : "top-app-bar:navigation"
      ),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(6, (s = m(t, r))),
          "use" in e && i(0, (u = e.use)),
          "class" in e && i(1, (d = e.class)),
          "align" in e && i(2, (p = e.align)),
          "toolbar" in e && i(3, (f = e.toolbar)),
          "$$scope" in e && i(8, (a = e.$$scope));
      }),
      [
        u,
        d,
        p,
        f,
        c,
        l,
        s,
        function () {
          return c;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (c = e), i(4, c);
          });
        },
      ]
    );
  }
  var In = Pt({ class: "mdc-top-app-bar__title", component: mn });
  const bn = class extends Pe {
    constructor(e) {
      super(),
        He(this, e, vn, yn, a, {
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
  class En {
    constructor(e, t) {
      (this._value = e), (this._error = t);
    }
    map(e) {
      if (this._error) return new En(null, this._error);
      {
        const t = e(this._value);
        return new En(t, null);
      }
    }
    mapError(e) {
      if (this._error) {
        const t = e(this._error);
        return new En(null, t);
      }
      return new En(this._value, null);
    }
    unwrap() {
      if (this._error) throw this._error;
      return this._value;
    }
  }
  function xn(e, t) {
    return e.reduce((e, n) => {
      const i = t(n);
      return void 0 !== i && e.push(i), e;
    }, []);
  }
  function An(e) {
    return e[0].toUpperCase() + e.substring(1);
  }
  function Cn(e) {
    const t = document.createElement("a");
    t.setAttribute("href", e), t.setAttribute("target", "_blank"), t.click();
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
  var _n = {
      LABEL_FLOAT_ABOVE: "mdc-floating-label--float-above",
      LABEL_REQUIRED: "mdc-floating-label--required",
      LABEL_SHAKE: "mdc-floating-label--shake",
      ROOT: "mdc-floating-label",
    },
    Sn = (function (e) {
      function t(n) {
        var i = e.call(this, We(We({}, t.defaultAdapter), n)) || this;
        return (
          (i.shakeAnimationEndHandler = function () {
            i.handleShakeAnimationEnd();
          }),
          i
        );
      }
      return (
        Ge(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return _n;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
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
        (t.prototype.init = function () {
          this.adapter.registerInteractionHandler(
            "animationend",
            this.shakeAnimationEndHandler
          );
        }),
        (t.prototype.destroy = function () {
          this.adapter.deregisterInteractionHandler(
            "animationend",
            this.shakeAnimationEndHandler
          );
        }),
        (t.prototype.getWidth = function () {
          return this.adapter.getWidth();
        }),
        (t.prototype.shake = function (e) {
          var n = t.cssClasses.LABEL_SHAKE;
          e ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (t.prototype.float = function (e) {
          var n = t.cssClasses,
            i = n.LABEL_FLOAT_ABOVE,
            r = n.LABEL_SHAKE;
          e
            ? this.adapter.addClass(i)
            : (this.adapter.removeClass(i), this.adapter.removeClass(r));
        }),
        (t.prototype.setRequired = function (e) {
          var n = t.cssClasses.LABEL_REQUIRED;
          e ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (t.prototype.handleShakeAnimationEnd = function () {
          var e = t.cssClasses.LABEL_SHAKE;
          this.adapter.removeClass(e);
        }),
        t
      );
    })(Qe),
    Tn = {
      LINE_RIPPLE_ACTIVE: "mdc-line-ripple--active",
      LINE_RIPPLE_DEACTIVATING: "mdc-line-ripple--deactivating",
    },
    Ln = (function (e) {
      function t(n) {
        var i = e.call(this, We(We({}, t.defaultAdapter), n)) || this;
        return (
          (i.transitionEndHandler = function (e) {
            i.handleTransitionEnd(e);
          }),
          i
        );
      }
      return (
        Ge(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Tn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
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
        (t.prototype.init = function () {
          this.adapter.registerEventHandler(
            "transitionend",
            this.transitionEndHandler
          );
        }),
        (t.prototype.destroy = function () {
          this.adapter.deregisterEventHandler(
            "transitionend",
            this.transitionEndHandler
          );
        }),
        (t.prototype.activate = function () {
          this.adapter.removeClass(Tn.LINE_RIPPLE_DEACTIVATING),
            this.adapter.addClass(Tn.LINE_RIPPLE_ACTIVE);
        }),
        (t.prototype.setRippleCenter = function (e) {
          this.adapter.setStyle("transform-origin", e + "px center");
        }),
        (t.prototype.deactivate = function () {
          this.adapter.addClass(Tn.LINE_RIPPLE_DEACTIVATING);
        }),
        (t.prototype.handleTransitionEnd = function (e) {
          var t = this.adapter.hasClass(Tn.LINE_RIPPLE_DEACTIVATING);
          "opacity" === e.propertyName &&
            t &&
            (this.adapter.removeClass(Tn.LINE_RIPPLE_ACTIVE),
            this.adapter.removeClass(Tn.LINE_RIPPLE_DEACTIVATING));
        }),
        t
      );
    })(Qe),
    On = { NOTCH_ELEMENT_SELECTOR: ".mdc-notched-outline__notch" },
    wn = { NOTCH_ELEMENT_PADDING: 8 },
    Mn = {
      NO_LABEL: "mdc-notched-outline--no-label",
      OUTLINE_NOTCHED: "mdc-notched-outline--notched",
      OUTLINE_UPGRADED: "mdc-notched-outline--upgraded",
    },
    Nn = (function (e) {
      function t(n) {
        return e.call(this, We(We({}, t.defaultAdapter), n)) || this;
      }
      return (
        Ge(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return On;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Mn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return wn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
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
        (t.prototype.notch = function (e) {
          var n = t.cssClasses.OUTLINE_NOTCHED;
          e > 0 && (e += wn.NOTCH_ELEMENT_PADDING),
            this.adapter.setNotchWidthProperty(e),
            this.adapter.addClass(n);
        }),
        (t.prototype.closeNotch = function () {
          var e = t.cssClasses.OUTLINE_NOTCHED;
          this.adapter.removeClass(e), this.adapter.removeNotchWidthProperty();
        }),
        t
      );
    })(Qe),
    Dn = {
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
    Rn = {
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
    Fn = { LABEL_SCALE: 0.75 },
    kn = [
      "pattern",
      "min",
      "max",
      "required",
      "step",
      "minlength",
      "maxlength",
    ],
    Un = ["color", "date", "datetime-local", "month", "range", "time", "week"],
    Hn = ["mousedown", "touchstart"],
    Pn = ["click", "keydown"],
    Bn = (function (e) {
      function t(n, i) {
        void 0 === i && (i = {});
        var r = e.call(this, We(We({}, t.defaultAdapter), n)) || this;
        return (
          (r.isFocused = !1),
          (r.receivedUserInput = !1),
          (r.valid = !0),
          (r.useNativeValidation = !0),
          (r.validateOnValueChange = !0),
          (r.helperText = i.helperText),
          (r.characterCounter = i.characterCounter),
          (r.leadingIcon = i.leadingIcon),
          (r.trailingIcon = i.trailingIcon),
          (r.inputFocusHandler = function () {
            r.activateFocus();
          }),
          (r.inputBlurHandler = function () {
            r.deactivateFocus();
          }),
          (r.inputInputHandler = function () {
            r.handleInput();
          }),
          (r.setPointerXOffset = function (e) {
            r.setTransformOrigin(e);
          }),
          (r.textFieldInteractionHandler = function () {
            r.handleTextFieldInteraction();
          }),
          (r.validationAttributeChangeHandler = function (e) {
            r.handleValidationAttributeChange(e);
          }),
          r
        );
      }
      return (
        Ge(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Rn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Dn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Fn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "shouldAlwaysFloat", {
          get: function () {
            var e = this.getNativeInput().type;
            return Un.indexOf(e) >= 0;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "shouldFloat", {
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
        Object.defineProperty(t.prototype, "shouldShake", {
          get: function () {
            return !this.isFocused && !this.isValid() && !!this.getValue();
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
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
        (t.prototype.init = function () {
          var e, t, n, i;
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
            for (var r = Xe(Hn), s = r.next(); !s.done; s = r.next()) {
              var o = s.value;
              this.adapter.registerInputInteractionHandler(
                o,
                this.setPointerXOffset
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              s && !s.done && (t = r.return) && t.call(r);
            } finally {
              if (e) throw e.error;
            }
          }
          try {
            for (var a = Xe(Pn), l = a.next(); !l.done; l = a.next()) {
              o = l.value;
              this.adapter.registerTextFieldInteractionHandler(
                o,
                this.textFieldInteractionHandler
              );
            }
          } catch (e) {
            n = { error: e };
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
        (t.prototype.destroy = function () {
          var e, t, n, i;
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
            for (var r = Xe(Hn), s = r.next(); !s.done; s = r.next()) {
              var o = s.value;
              this.adapter.deregisterInputInteractionHandler(
                o,
                this.setPointerXOffset
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              s && !s.done && (t = r.return) && t.call(r);
            } finally {
              if (e) throw e.error;
            }
          }
          try {
            for (var a = Xe(Pn), l = a.next(); !l.done; l = a.next()) {
              o = l.value;
              this.adapter.deregisterTextFieldInteractionHandler(
                o,
                this.textFieldInteractionHandler
              );
            }
          } catch (e) {
            n = { error: e };
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
        (t.prototype.handleTextFieldInteraction = function () {
          var e = this.adapter.getNativeInput();
          (e && e.disabled) || (this.receivedUserInput = !0);
        }),
        (t.prototype.handleValidationAttributeChange = function (e) {
          var t = this;
          e.some(function (e) {
            return (
              kn.indexOf(e) > -1 &&
              (t.styleValidity(!0),
              t.adapter.setLabelRequired(t.getNativeInput().required),
              !0)
            );
          }),
            e.indexOf("maxlength") > -1 &&
              this.setcharacterCounter(this.getValue().length);
        }),
        (t.prototype.notchOutline = function (e) {
          if (this.adapter.hasOutline() && this.adapter.hasLabel())
            if (e) {
              var t = this.adapter.getLabelWidth() * Fn.LABEL_SCALE;
              this.adapter.notchOutline(t);
            } else this.adapter.closeOutline();
        }),
        (t.prototype.activateFocus = function () {
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
        (t.prototype.setTransformOrigin = function (e) {
          if (!this.isDisabled() && !this.adapter.hasOutline()) {
            var t = e.touches,
              n = t ? t[0] : e,
              i = n.target.getBoundingClientRect(),
              r = n.clientX - i.left;
            this.adapter.setLineRippleTransformOrigin(r);
          }
        }),
        (t.prototype.handleInput = function () {
          this.autoCompleteFocus(),
            this.setcharacterCounter(this.getValue().length);
        }),
        (t.prototype.autoCompleteFocus = function () {
          this.receivedUserInput || this.activateFocus();
        }),
        (t.prototype.deactivateFocus = function () {
          (this.isFocused = !1), this.adapter.deactivateLineRipple();
          var e = this.isValid();
          this.styleValidity(e),
            this.styleFocused(this.isFocused),
            this.adapter.hasLabel() &&
              (this.notchOutline(this.shouldFloat),
              this.adapter.floatLabel(this.shouldFloat),
              this.styleFloating(this.shouldFloat),
              this.adapter.shakeLabel(this.shouldShake)),
            this.shouldFloat || (this.receivedUserInput = !1);
        }),
        (t.prototype.getValue = function () {
          return this.getNativeInput().value;
        }),
        (t.prototype.setValue = function (e) {
          if (
            (this.getValue() !== e && (this.getNativeInput().value = e),
            this.setcharacterCounter(e.length),
            this.validateOnValueChange)
          ) {
            var t = this.isValid();
            this.styleValidity(t);
          }
          this.adapter.hasLabel() &&
            (this.notchOutline(this.shouldFloat),
            this.adapter.floatLabel(this.shouldFloat),
            this.styleFloating(this.shouldFloat),
            this.validateOnValueChange &&
              this.adapter.shakeLabel(this.shouldShake));
        }),
        (t.prototype.isValid = function () {
          return this.useNativeValidation
            ? this.isNativeInputValid()
            : this.valid;
        }),
        (t.prototype.setValid = function (e) {
          (this.valid = e), this.styleValidity(e);
          var t = !e && !this.isFocused && !!this.getValue();
          this.adapter.hasLabel() && this.adapter.shakeLabel(t);
        }),
        (t.prototype.setValidateOnValueChange = function (e) {
          this.validateOnValueChange = e;
        }),
        (t.prototype.getValidateOnValueChange = function () {
          return this.validateOnValueChange;
        }),
        (t.prototype.setUseNativeValidation = function (e) {
          this.useNativeValidation = e;
        }),
        (t.prototype.isDisabled = function () {
          return this.getNativeInput().disabled;
        }),
        (t.prototype.setDisabled = function (e) {
          (this.getNativeInput().disabled = e), this.styleDisabled(e);
        }),
        (t.prototype.setHelperTextContent = function (e) {
          this.helperText && this.helperText.setContent(e);
        }),
        (t.prototype.setLeadingIconAriaLabel = function (e) {
          this.leadingIcon && this.leadingIcon.setAriaLabel(e);
        }),
        (t.prototype.setLeadingIconContent = function (e) {
          this.leadingIcon && this.leadingIcon.setContent(e);
        }),
        (t.prototype.setTrailingIconAriaLabel = function (e) {
          this.trailingIcon && this.trailingIcon.setAriaLabel(e);
        }),
        (t.prototype.setTrailingIconContent = function (e) {
          this.trailingIcon && this.trailingIcon.setContent(e);
        }),
        (t.prototype.setcharacterCounter = function (e) {
          if (this.characterCounter) {
            var t = this.getNativeInput().maxLength;
            if (-1 === t)
              throw new Error(
                "MDCTextFieldFoundation: Expected maxlength html property on text input or textarea."
              );
            this.characterCounter.setCounterValue(e, t);
          }
        }),
        (t.prototype.isBadInput = function () {
          return this.getNativeInput().validity.badInput || !1;
        }),
        (t.prototype.isNativeInputValid = function () {
          return this.getNativeInput().validity.valid;
        }),
        (t.prototype.styleValidity = function (e) {
          var n = t.cssClasses.INVALID;
          if (
            (e ? this.adapter.removeClass(n) : this.adapter.addClass(n),
            this.helperText)
          ) {
            if (
              (this.helperText.setValidity(e), !this.helperText.isValidation())
            )
              return;
            var i = this.helperText.isVisible(),
              r = this.helperText.getId();
            i && r
              ? this.adapter.setInputAttr(Dn.ARIA_DESCRIBEDBY, r)
              : this.adapter.removeInputAttr(Dn.ARIA_DESCRIBEDBY);
          }
        }),
        (t.prototype.styleFocused = function (e) {
          var n = t.cssClasses.FOCUSED;
          e ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (t.prototype.styleDisabled = function (e) {
          var n = t.cssClasses,
            i = n.DISABLED,
            r = n.INVALID;
          e
            ? (this.adapter.addClass(i), this.adapter.removeClass(r))
            : this.adapter.removeClass(i),
            this.leadingIcon && this.leadingIcon.setDisabled(e),
            this.trailingIcon && this.trailingIcon.setDisabled(e);
        }),
        (t.prototype.styleFloating = function (e) {
          var n = t.cssClasses.LABEL_FLOATING;
          e ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (t.prototype.getNativeInput = function () {
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
        t
      );
    })(Qe),
    Vn = "mdc-dom-focus-sentinel",
    jn = (function () {
      function e(e, t) {
        void 0 === t && (t = {}),
          (this.root = e),
          (this.options = t),
          (this.elFocusedBeforeTrapFocus = null);
      }
      return (
        (e.prototype.trapFocus = function () {
          var e = this.getFocusableElements(this.root);
          if (0 === e.length)
            throw new Error(
              "FocusTrap: Element must have at least one focusable child."
            );
          (this.elFocusedBeforeTrapFocus =
            document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null),
            this.wrapTabFocus(this.root),
            this.options.skipInitialFocus ||
              this.focusInitialElement(e, this.options.initialFocusEl);
        }),
        (e.prototype.releaseFocus = function () {
          [].slice
            .call(this.root.querySelectorAll("." + Vn))
            .forEach(function (e) {
              e.parentElement.removeChild(e);
            }),
            !this.options.skipRestoreFocus &&
              this.elFocusedBeforeTrapFocus &&
              this.elFocusedBeforeTrapFocus.focus();
        }),
        (e.prototype.wrapTabFocus = function (e) {
          var t = this,
            n = this.createSentinel(),
            i = this.createSentinel();
          n.addEventListener("focus", function () {
            var n = t.getFocusableElements(e);
            n.length > 0 && n[n.length - 1].focus();
          }),
            i.addEventListener("focus", function () {
              var n = t.getFocusableElements(e);
              n.length > 0 && n[0].focus();
            }),
            e.insertBefore(n, e.children[0]),
            e.appendChild(i);
        }),
        (e.prototype.focusInitialElement = function (e, t) {
          var n = 0;
          t && (n = Math.max(e.indexOf(t), 0)), e[n].focus();
        }),
        (e.prototype.getFocusableElements = function (e) {
          return [].slice
            .call(
              e.querySelectorAll(
                "[autofocus], [tabindex], a, input, textarea, select, button"
              )
            )
            .filter(function (e) {
              var t =
                  "true" === e.getAttribute("aria-disabled") ||
                  null != e.getAttribute("disabled") ||
                  null != e.getAttribute("hidden") ||
                  "true" === e.getAttribute("aria-hidden"),
                n =
                  e.tabIndex >= 0 &&
                  e.getBoundingClientRect().width > 0 &&
                  !e.classList.contains(Vn) &&
                  !t,
                i = !1;
              if (n) {
                var r = getComputedStyle(e);
                i = "none" === r.display || "hidden" === r.visibility;
              }
              return n && !i;
            });
        }),
        (e.prototype.createSentinel = function () {
          var e = document.createElement("div");
          return (
            e.setAttribute("tabindex", "0"),
            e.setAttribute("aria-hidden", "true"),
            e.classList.add(Vn),
            e
          );
        }),
        e
      );
    })(),
    zn = Object.freeze({ __proto__: null, FocusTrap: jn }),
    Gn = "Unknown",
    Wn = "Backspace",
    qn = "Enter",
    Kn = "Spacebar",
    Xn = "PageUp",
    Yn = "PageDown",
    Qn = "End",
    Jn = "Home",
    Zn = "ArrowLeft",
    ei = "ArrowUp",
    ti = "ArrowRight",
    ni = "ArrowDown",
    ii = "Delete",
    ri = "Escape",
    si = "Tab",
    oi = new Set();
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
   */ oi.add(Wn),
    oi.add(qn),
    oi.add(Kn),
    oi.add(Xn),
    oi.add(Yn),
    oi.add(Qn),
    oi.add(Jn),
    oi.add(Zn),
    oi.add(ei),
    oi.add(ti),
    oi.add(ni),
    oi.add(ii),
    oi.add(ri),
    oi.add(si);
  var ai = 8,
    li = 13,
    ci = 32,
    ui = 33,
    di = 34,
    pi = 35,
    fi = 36,
    hi = 37,
    mi = 38,
    gi = 39,
    $i = 40,
    yi = 46,
    vi = 27,
    Ii = 9,
    bi = new Map();
  bi.set(ai, Wn),
    bi.set(li, qn),
    bi.set(ci, Kn),
    bi.set(ui, Xn),
    bi.set(di, Yn),
    bi.set(pi, Qn),
    bi.set(fi, Jn),
    bi.set(hi, Zn),
    bi.set(mi, ei),
    bi.set(gi, ti),
    bi.set($i, ni),
    bi.set(yi, ii),
    bi.set(vi, ri),
    bi.set(Ii, si);
  var Ei = new Set();
  function xi(e) {
    var t = e.key;
    if (oi.has(t)) return t;
    var n = bi.get(e.keyCode);
    return n || Gn;
  }
  function Ai(e) {
    let t;
    const n = e[9].default,
      i = c(n, e, e[11], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 2048 & r) &&
          p(i, n, e, e[11], t ? d(n, e[11], r, null) : f(e[11]), null);
      },
      i(e) {
        t || (_e(i, e), (t = !0));
      },
      o(e) {
        Se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Ci(e) {
    let t, i, r;
    const s = [
      { use: [e[4], ...e[0]] },
      {
        class: yt({
          [e[1]]: !0,
          "mdc-button__label": "button" === e[5],
          "mdc-fab__label": "fab" === e[5],
          "mdc-tab__text-label": "tab" === e[5],
          "mdc-image-list__label": "image-list" === e[5],
          "mdc-snackbar__label": "snackbar" === e[5],
          "mdc-banner__text": "banner" === e[5],
          "mdc-segmented-button__label": "segmented-button" === e[5],
          "mdc-data-table__pagination-rows-per-page-label":
            "data-table:pagination" === e[5],
          "mdc-data-table__header-cell-label":
            "data-table:sortable-header-cell" === e[5],
        }),
      },
      "snackbar" === e[5] ? { "aria-atomic": "false" } : {},
      { tabindex: e[6] },
      e[7],
    ];
    var o = e[2];
    function a(e) {
      let t = { $$slots: { default: [Ai] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) t = n(t, s[e]);
      return { props: t };
    }
    return (
      o && ((t = new o(a(e))), e[10](t)),
      {
        c() {
          t && Fe(t.$$.fragment), (i = F());
        },
        m(e, n) {
          t && ke(t, e, n), L(e, i, n), (r = !0);
        },
        p(e, [n]) {
          const r =
            243 & n
              ? Ne(s, [
                  17 & n && { use: [e[4], ...e[0]] },
                  34 & n && {
                    class: yt({
                      [e[1]]: !0,
                      "mdc-button__label": "button" === e[5],
                      "mdc-fab__label": "fab" === e[5],
                      "mdc-tab__text-label": "tab" === e[5],
                      "mdc-image-list__label": "image-list" === e[5],
                      "mdc-snackbar__label": "snackbar" === e[5],
                      "mdc-banner__text": "banner" === e[5],
                      "mdc-segmented-button__label":
                        "segmented-button" === e[5],
                      "mdc-data-table__pagination-rows-per-page-label":
                        "data-table:pagination" === e[5],
                      "mdc-data-table__header-cell-label":
                        "data-table:sortable-header-cell" === e[5],
                    }),
                  },
                  32 & n &&
                    De("snackbar" === e[5] ? { "aria-atomic": "false" } : {}),
                  64 & n && { tabindex: e[6] },
                  128 & n && De(e[7]),
                ])
              : {};
          if (
            (2048 & n && (r.$$scope = { dirty: n, ctx: e }), o !== (o = e[2]))
          ) {
            if (t) {
              Ae();
              const e = t;
              Se(e.$$.fragment, 1, 0, () => {
                Ue(e, 1);
              }),
                Ce();
            }
            o
              ? ((t = new o(a(e))),
                e[10](t),
                Fe(t.$$.fragment),
                _e(t.$$.fragment, 1),
                ke(t, i.parentNode, i))
              : (t = null);
          } else o && t.$set(r);
        },
        i(e) {
          r || (t && _e(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          t && Se(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[10](null), n && O(i), t && Ue(t, n);
        },
      }
    );
  }
  function _i(e, t, i) {
    const r = ["use", "class", "component", "getElement"];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t;
    const l = xt(Z());
    let c,
      { use: u = [] } = t,
      { class: d = "" } = t,
      { component: p = rn } = t;
    const f = re("SMUI:label:context"),
      g = re("SMUI:label:tabindex");
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(7, (s = m(t, r))),
          "use" in e && i(0, (u = e.use)),
          "class" in e && i(1, (d = e.class)),
          "component" in e && i(2, (p = e.component)),
          "$$scope" in e && i(11, (a = e.$$scope));
      }),
      [
        u,
        d,
        p,
        c,
        l,
        f,
        g,
        s,
        function () {
          return c.getElement();
        },
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (c = e), i(3, c);
          });
        },
        a,
      ]
    );
  }
  Ei.add(Xn),
    Ei.add(Yn),
    Ei.add(Qn),
    Ei.add(Jn),
    Ei.add(Zn),
    Ei.add(ei),
    Ei.add(ti),
    Ei.add(ni);
  function Si(e) {
    let t;
    const n = e[4].default,
      i = c(n, e, e[3], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, [r]) {
        i &&
          i.p &&
          (!t || 8 & r) &&
          p(i, n, e, e[3], t ? d(n, e[3], r, null) : f(e[3]), null);
      },
      i(e) {
        t || (_e(i, e), (t = !0));
      },
      o(e) {
        Se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Ti(e, t, n) {
    let i,
      { $$slots: r = {}, $$scope: s } = t,
      { key: o } = t,
      { value: a } = t;
    const c = $t(a);
    return (
      l(e, c, (e) => n(5, (i = e))),
      ie(o, c),
      te(() => {
        c.set(void 0);
      }),
      (e.$$set = (e) => {
        "key" in e && n(1, (o = e.key)),
          "value" in e && n(2, (a = e.value)),
          "$$scope" in e && n(3, (s = e.$$scope));
      }),
      (e.$$.update = () => {
        4 & e.$$.dirty && y(c, (i = a), i);
      }),
      [c, o, a, s, r]
    );
  }
  class Li extends Pe {
    constructor(e) {
      super(), He(this, e, Ti, Si, a, { key: 1, value: 2 });
    }
  }
  const Oi = class extends Pe {
      constructor(e) {
        super(),
          He(this, e, _i, Ci, a, {
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
    { applyPassive: wi } = Je,
    { matches: Mi } = tt;
  function Ni(
    e,
    {
      ripple: t = !0,
      surface: n = !1,
      unbounded: i = !1,
      disabled: r = !1,
      color: s,
      active: o,
      rippleElement: a,
      eventTarget: l,
      activeTarget: c,
      addClass: u = (t) => e.classList.add(t),
      removeClass: d = (t) => e.classList.remove(t),
      addStyle: p = (t, n) => e.style.setProperty(t, n),
      initPromise: f = Promise.resolve(),
    } = {}
  ) {
    let h,
      m,
      g = re("SMUI:addLayoutListener"),
      $ = o,
      y = l,
      v = c;
    function I() {
      n
        ? (u("mdc-ripple-surface"),
          "primary" === s
            ? (u("smui-ripple-surface--primary"),
              d("smui-ripple-surface--secondary"))
            : "secondary" === s
            ? (d("smui-ripple-surface--primary"),
              u("smui-ripple-surface--secondary"))
            : (d("smui-ripple-surface--primary"),
              d("smui-ripple-surface--secondary")))
        : (d("mdc-ripple-surface"),
          d("smui-ripple-surface--primary"),
          d("smui-ripple-surface--secondary")),
        h &&
          $ !== o &&
          (($ = o), o ? h.activate() : !1 === o && h.deactivate()),
        t && !h
          ? ((h = new lt({
              addClass: u,
              browserSupportsCssVars: () =>
                (function (e, t) {
                  void 0 === t && (t = !1);
                  var n,
                    i = e.CSS;
                  if ("boolean" == typeof et && !t) return et;
                  if (!i || "function" != typeof i.supports) return !1;
                  var r = i.supports("--css-vars", "yes"),
                    s =
                      i.supports("(--css-vars: yes)") &&
                      i.supports("color", "#00000000");
                  return (n = r || s), t || (et = n), n;
                })(window),
              computeBoundingRect: () => (a || e).getBoundingClientRect(),
              containsEventTarget: (t) => e.contains(t),
              deregisterDocumentInteractionHandler: (e, t) =>
                document.documentElement.removeEventListener(e, t, wi()),
              deregisterInteractionHandler: (t, n) =>
                (l || e).removeEventListener(t, n, wi()),
              deregisterResizeHandler: (e) =>
                window.removeEventListener("resize", e),
              getWindowPageOffset: () => ({
                x: window.pageXOffset,
                y: window.pageYOffset,
              }),
              isSurfaceActive: () => (null == o ? Mi(c || e, ":active") : o),
              isSurfaceDisabled: () => !!r,
              isUnbounded: () => !!i,
              registerDocumentInteractionHandler: (e, t) =>
                document.documentElement.addEventListener(e, t, wi()),
              registerInteractionHandler: (t, n) =>
                (l || e).addEventListener(t, n, wi()),
              registerResizeHandler: (e) =>
                window.addEventListener("resize", e),
              removeClass: d,
              updateCssVariable: p,
            })),
            f.then(() => {
              h && (h.init(), h.setUnbounded(i));
            }))
          : h &&
            !t &&
            f.then(() => {
              h && (h.destroy(), (h = void 0));
            }),
        !h ||
          (y === l && v === c) ||
          ((y = l),
          (v = c),
          h.destroy(),
          requestAnimationFrame(() => {
            h && (h.init(), h.setUnbounded(i));
          })),
        !t && i && u("mdc-ripple-upgraded--unbounded");
    }
    return (
      I(),
      g &&
        (m = g(function () {
          h && h.layout();
        })),
      {
        update(h) {
          ({
            ripple: t,
            surface: n,
            unbounded: i,
            disabled: r,
            color: s,
            active: o,
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
              addClass: (t) => e.classList.add(t),
              removeClass: (t) => e.classList.remove(t),
              addStyle: (t, n) => e.style.setProperty(t, n),
              initPromise: Promise.resolve(),
            },
            h
          )),
            I();
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
  function Di(e) {
    let t, i, r, a, l, u, h, m;
    const g = e[22].default,
      $ = c(g, e, e[21], null);
    let y = [
        {
          class: (i = yt({
            [e[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": e[0],
            "mdc-floating-label--required": e[1],
            ...e[8],
          })),
        },
        { style: (r = Object.entries(e[9]).map(Ui).concat([e[4]]).join(" ")) },
        { for: (a = e[5] || (e[11] ? e[11].id : void 0)) },
        e[12],
      ],
      I = {};
    for (let e = 0; e < y.length; e += 1) I = n(I, y[e]);
    return {
      c() {
        (t = M("label")), $ && $.c(), H(t, I);
      },
      m(n, i) {
        L(n, t, i),
          $ && $.m(t, null),
          e[24](t),
          (u = !0),
          h ||
            ((m = [v((l = Ct.call(null, t, e[2]))), v(e[10].call(null, t))]),
            (h = !0));
      },
      p(e, n) {
        $ &&
          $.p &&
          (!u || 2097152 & n) &&
          p($, g, e, e[21], u ? d(g, e[21], n, null) : f(e[21]), null),
          H(
            t,
            (I = Ne(y, [
              (!u ||
                (267 & n &&
                  i !==
                    (i = yt({
                      [e[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": e[0],
                      "mdc-floating-label--required": e[1],
                      ...e[8],
                    })))) && { class: i },
              (!u ||
                (528 & n &&
                  r !==
                    (r = Object.entries(e[9])
                      .map(Ui)
                      .concat([e[4]])
                      .join(" ")))) && { style: r },
              (!u ||
                (32 & n &&
                  a !== (a = e[5] || (e[11] ? e[11].id : void 0)))) && {
                for: a,
              },
              4096 & n && e[12],
            ]))
          ),
          l && o(l.update) && 4 & n && l.update.call(null, e[2]);
      },
      i(e) {
        u || (_e($, e), (u = !0));
      },
      o(e) {
        Se($, e), (u = !1);
      },
      d(n) {
        n && O(t), $ && $.d(n), e[24](null), (h = !1), s(m);
      },
    };
  }
  function Ri(e) {
    let t, i, r, a, l, u, h;
    const m = e[22].default,
      g = c(m, e, e[21], null);
    let $ = [
        {
          class: (i = yt({
            [e[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": e[0],
            "mdc-floating-label--required": e[1],
            ...e[8],
          })),
        },
        { style: (r = Object.entries(e[9]).map(ki).concat([e[4]]).join(" ")) },
        e[12],
      ],
      y = {};
    for (let e = 0; e < $.length; e += 1) y = n(y, $[e]);
    return {
      c() {
        (t = M("span")), g && g.c(), H(t, y);
      },
      m(n, i) {
        L(n, t, i),
          g && g.m(t, null),
          e[23](t),
          (l = !0),
          u ||
            ((h = [v((a = Ct.call(null, t, e[2]))), v(e[10].call(null, t))]),
            (u = !0));
      },
      p(e, n) {
        g &&
          g.p &&
          (!l || 2097152 & n) &&
          p(g, m, e, e[21], l ? d(m, e[21], n, null) : f(e[21]), null),
          H(
            t,
            (y = Ne($, [
              (!l ||
                (267 & n &&
                  i !==
                    (i = yt({
                      [e[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": e[0],
                      "mdc-floating-label--required": e[1],
                      ...e[8],
                    })))) && { class: i },
              (!l ||
                (528 & n &&
                  r !==
                    (r = Object.entries(e[9])
                      .map(ki)
                      .concat([e[4]])
                      .join(" ")))) && { style: r },
              4096 & n && e[12],
            ]))
          ),
          a && o(a.update) && 4 & n && a.update.call(null, e[2]);
      },
      i(e) {
        l || (_e(g, e), (l = !0));
      },
      o(e) {
        Se(g, e), (l = !1);
      },
      d(n) {
        n && O(t), g && g.d(n), e[23](null), (u = !1), s(h);
      },
    };
  }
  function Fi(e) {
    let t, n, i, r;
    const s = [Ri, Di],
      o = [];
    function a(e, t) {
      return e[6] ? 0 : 1;
    }
    return (
      (t = a(e)),
      (n = o[t] = s[t](e)),
      {
        c() {
          n.c(), (i = F());
        },
        m(e, n) {
          o[t].m(e, n), L(e, i, n), (r = !0);
        },
        p(e, [r]) {
          let l = t;
          (t = a(e)),
            t === l
              ? o[t].p(e, r)
              : (Ae(),
                Se(o[l], 1, 1, () => {
                  o[l] = null;
                }),
                Ce(),
                (n = o[t]),
                n ? n.p(e, r) : ((n = o[t] = s[t](e)), n.c()),
                _e(n, 1),
                n.m(i.parentNode, i));
        },
        i(e) {
          r || (_e(n), (r = !0));
        },
        o(e) {
          Se(n), (r = !1);
        },
        d(e) {
          o[t].d(e), e && O(i);
        },
      }
    );
  }
  const ki = ([e, t]) => `${e}: ${t};`,
    Ui = ([e, t]) => `${e}: ${t};`;
  function Hi(e, t, i) {
    const r = [
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
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t;
    var l;
    const c = xt(Z());
    let u,
      d,
      { use: p = [] } = t,
      { class: f = "" } = t,
      { style: g = "" } = t,
      { for: $ } = t,
      { floatAbove: y = !1 } = t,
      { required: v = !1 } = t,
      { wrapped: I = !1 } = t,
      b = {},
      E = {},
      x =
        null !== (l = re("SMUI:generic:input:props")) && void 0 !== l ? l : {},
      A = y,
      C = v;
    function _(e) {
      b[e] || i(8, (b[e] = !0), b);
    }
    function S(e) {
      (e in b && !b[e]) || i(8, (b[e] = !1), b);
    }
    function T(e, t) {
      E[e] != t &&
        ("" === t || null == t ? (delete E[e], i(9, E)) : i(9, (E[e] = t), E));
    }
    function L(e) {
      e in E && (delete E[e], i(9, E));
    }
    function O() {
      return u;
    }
    return (
      ee(() => {
        i(
          18,
          (d = new Sn({
            addClass: _,
            removeClass: S,
            getWidth: () => {
              var e, t;
              const n = O(),
                i = n.cloneNode(!0);
              null === (e = n.parentNode) || void 0 === e || e.appendChild(i),
                i.classList.add("smui-floating-label--remove-transition"),
                i.classList.add("smui-floating-label--force-size"),
                i.classList.remove("mdc-floating-label--float-above");
              const r = i.scrollWidth;
              return (
                null === (t = n.parentNode) || void 0 === t || t.removeChild(i),
                r
              );
            },
            registerInteractionHandler: (e, t) => O().addEventListener(e, t),
            deregisterInteractionHandler: (e, t) =>
              O().removeEventListener(e, t),
          }))
        );
        const e = {
          get element() {
            return O();
          },
          addStyle: T,
          removeStyle: L,
        };
        return (
          vt(u, "SMUIFloatingLabel:mount", e),
          d.init(),
          () => {
            vt(u, "SMUIFloatingLabel:unmount", e), d.destroy();
          }
        );
      }),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(12, (s = m(t, r))),
          "use" in e && i(2, (p = e.use)),
          "class" in e && i(3, (f = e.class)),
          "style" in e && i(4, (g = e.style)),
          "for" in e && i(5, ($ = e.for)),
          "floatAbove" in e && i(0, (y = e.floatAbove)),
          "required" in e && i(1, (v = e.required)),
          "wrapped" in e && i(6, (I = e.wrapped)),
          "$$scope" in e && i(21, (a = e.$$scope));
      }),
      (e.$$.update = () => {
        786433 & e.$$.dirty && d && A !== y && (i(19, (A = y)), d.float(y)),
          1310722 & e.$$.dirty &&
            d &&
            C !== v &&
            (i(20, (C = v)), d.setRequired(v));
      }),
      [
        y,
        v,
        p,
        f,
        g,
        $,
        I,
        u,
        b,
        E,
        c,
        x,
        s,
        function (e) {
          d.shake(e);
        },
        function (e) {
          i(0, (y = e));
        },
        function (e) {
          i(1, (v = e));
        },
        function () {
          return d.getWidth();
        },
        O,
        d,
        A,
        C,
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (u = e), i(7, u);
          });
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (u = e), i(7, u);
          });
        },
      ]
    );
  }
  class Pi extends Pe {
    constructor(e) {
      super(),
        He(this, e, Hi, Fi, a, {
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
  function Bi(t) {
    let i,
      r,
      a,
      l,
      c,
      u,
      d = [
        {
          class: (r = yt({
            [t[1]]: !0,
            "mdc-line-ripple": !0,
            "mdc-line-ripple--active": t[3],
            ...t[5],
          })),
        },
        { style: (a = Object.entries(t[6]).map(Vi).concat([t[2]]).join(" ")) },
        t[8],
      ],
      p = {};
    for (let e = 0; e < d.length; e += 1) p = n(p, d[e]);
    return {
      c() {
        (i = M("div")), H(i, p);
      },
      m(e, n) {
        L(e, i, n),
          t[13](i),
          c ||
            ((u = [v((l = Ct.call(null, i, t[0]))), v(t[7].call(null, i))]),
            (c = !0));
      },
      p(e, [t]) {
        H(
          i,
          (p = Ne(d, [
            42 & t &&
              r !==
                (r = yt({
                  [e[1]]: !0,
                  "mdc-line-ripple": !0,
                  "mdc-line-ripple--active": e[3],
                  ...e[5],
                })) && { class: r },
            68 & t &&
              a !==
                (a = Object.entries(e[6]).map(Vi).concat([e[2]]).join(" ")) && {
                style: a,
              },
            256 & t && e[8],
          ]))
        ),
          l && o(l.update) && 1 & t && l.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && O(i), t[13](null), (c = !1), s(u);
      },
    };
  }
  const Vi = ([e, t]) => `${e}: ${t};`;
  function ji(e, t, i) {
    const r = [
      "use",
      "class",
      "style",
      "active",
      "activate",
      "deactivate",
      "setRippleCenter",
      "getElement",
    ];
    let s = m(t, r);
    const o = xt(Z());
    let a,
      l,
      { use: c = [] } = t,
      { class: u = "" } = t,
      { style: d = "" } = t,
      { active: p = !1 } = t,
      f = {},
      g = {};
    function $(e) {
      return e in f ? f[e] : b().classList.contains(e);
    }
    function y(e) {
      f[e] || i(5, (f[e] = !0), f);
    }
    function v(e) {
      (e in f && !f[e]) || i(5, (f[e] = !1), f);
    }
    function I(e, t) {
      g[e] != t &&
        ("" === t || null == t ? (delete g[e], i(6, g)) : i(6, (g[e] = t), g));
    }
    function b() {
      return a;
    }
    return (
      ee(
        () => (
          (l = new Ln({
            addClass: y,
            removeClass: v,
            hasClass: $,
            setStyle: I,
            registerEventHandler: (e, t) => b().addEventListener(e, t),
            deregisterEventHandler: (e, t) => b().removeEventListener(e, t),
          })),
          l.init(),
          () => {
            l.destroy();
          }
        )
      ),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(8, (s = m(t, r))),
          "use" in e && i(0, (c = e.use)),
          "class" in e && i(1, (u = e.class)),
          "style" in e && i(2, (d = e.style)),
          "active" in e && i(3, (p = e.active));
      }),
      [
        c,
        u,
        d,
        p,
        a,
        f,
        g,
        o,
        s,
        function () {
          l.activate();
        },
        function () {
          l.deactivate();
        },
        function (e) {
          l.setRippleCenter(e);
        },
        b,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (a = e), i(4, a);
          });
        },
      ]
    );
  }
  class zi extends Pe {
    constructor(e) {
      super(),
        He(this, e, ji, Bi, a, {
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
  function Gi(e) {
    let t, n, i;
    const r = e[14].default,
      s = c(r, e, e[13], null);
    return {
      c() {
        (t = M("div")),
          s && s.c(),
          U(t, "class", "mdc-notched-outline__notch"),
          U(t, "style", (n = Object.entries(e[7]).map(qi).join(" ")));
      },
      m(e, n) {
        L(e, t, n), s && s.m(t, null), (i = !0);
      },
      p(e, o) {
        s &&
          s.p &&
          (!i || 8192 & o) &&
          p(s, r, e, e[13], i ? d(r, e[13], o, null) : f(e[13]), null),
          (!i ||
            (128 & o && n !== (n = Object.entries(e[7]).map(qi).join(" ")))) &&
            U(t, "style", n);
      },
      i(e) {
        i || (_e(s, e), (i = !0));
      },
      o(e) {
        Se(s, e), (i = !1);
      },
      d(e) {
        e && O(t), s && s.d(e);
      },
    };
  }
  function Wi(e) {
    let t,
      i,
      r,
      a,
      l,
      c,
      u,
      d,
      p,
      f,
      h = !e[3] && Gi(e),
      m = [
        {
          class: (c = yt({
            [e[1]]: !0,
            "mdc-notched-outline": !0,
            "mdc-notched-outline--notched": e[2],
            "mdc-notched-outline--no-label": e[3],
            ...e[6],
          })),
        },
        e[9],
      ],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = M("div")),
          (i = M("div")),
          (r = R()),
          h && h.c(),
          (a = R()),
          (l = M("div")),
          U(i, "class", "mdc-notched-outline__leading"),
          U(l, "class", "mdc-notched-outline__trailing"),
          H(t, g);
      },
      m(n, s) {
        L(n, t, s),
          _(t, i),
          _(t, r),
          h && h.m(t, null),
          _(t, a),
          _(t, l),
          e[15](t),
          (d = !0),
          p ||
            ((f = [
              v((u = Ct.call(null, t, e[0]))),
              v(e[8].call(null, t)),
              k(t, "SMUIFloatingLabel:mount", e[16]),
              k(t, "SMUIFloatingLabel:unmount", e[17]),
            ]),
            (p = !0));
      },
      p(e, [n]) {
        e[3]
          ? h &&
            (Ae(),
            Se(h, 1, 1, () => {
              h = null;
            }),
            Ce())
          : h
          ? (h.p(e, n), 8 & n && _e(h, 1))
          : ((h = Gi(e)), h.c(), _e(h, 1), h.m(t, a)),
          H(
            t,
            (g = Ne(m, [
              (!d ||
                (78 & n &&
                  c !==
                    (c = yt({
                      [e[1]]: !0,
                      "mdc-notched-outline": !0,
                      "mdc-notched-outline--notched": e[2],
                      "mdc-notched-outline--no-label": e[3],
                      ...e[6],
                    })))) && { class: c },
              512 & n && e[9],
            ]))
          ),
          u && o(u.update) && 1 & n && u.update.call(null, e[0]);
      },
      i(e) {
        d || (_e(h), (d = !0));
      },
      o(e) {
        Se(h), (d = !1);
      },
      d(n) {
        n && O(t), h && h.d(), e[15](null), (p = !1), s(f);
      },
    };
  }
  const qi = ([e, t]) => `${e}: ${t};`;
  function Ki(e, t, i) {
    const r = [
      "use",
      "class",
      "notched",
      "noLabel",
      "notch",
      "closeNotch",
      "getElement",
    ];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t;
    const l = xt(Z());
    let c,
      u,
      d,
      { use: p = [] } = t,
      { class: f = "" } = t,
      { notched: g = !1 } = t,
      { noLabel: $ = !1 } = t,
      y = {},
      v = {};
    function I(e) {
      y[e] || i(6, (y[e] = !0), y);
    }
    function b(e) {
      (e in y && !y[e]) || i(6, (y[e] = !1), y);
    }
    ee(
      () => (
        (u = new Nn({
          addClass: I,
          removeClass: b,
          setNotchWidthProperty: (e) => {
            return (
              (n = e + "px"),
              void (
                v[(t = "width")] != n &&
                ("" === n || null == n
                  ? (delete v[t], i(7, v))
                  : i(7, (v[t] = n), v))
              )
            );
            var t, n;
          },
          removeNotchWidthProperty: () => {
            var e;
            (e = "width") in v && (delete v[e], i(7, v));
          },
        })),
        u.init(),
        () => {
          u.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(9, (s = m(t, r))),
          "use" in e && i(0, (p = e.use)),
          "class" in e && i(1, (f = e.class)),
          "notched" in e && i(2, (g = e.notched)),
          "noLabel" in e && i(3, ($ = e.noLabel)),
          "$$scope" in e && i(13, (a = e.$$scope));
      }),
      (e.$$.update = () => {
        16 & e.$$.dirty &&
          (d
            ? (d.addStyle("transition-duration", "0s"),
              I("mdc-notched-outline--upgraded"),
              requestAnimationFrame(() => {
                d && d.removeStyle("transition-duration");
              }))
            : b("mdc-notched-outline--upgraded"));
      }),
      [
        p,
        f,
        g,
        $,
        d,
        c,
        y,
        v,
        l,
        s,
        function (e) {
          u.notch(e);
        },
        function () {
          u.closeNotch();
        },
        function () {
          return c;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (c = e), i(5, c);
          });
        },
        (e) => i(4, (d = e.detail)),
        () => i(4, (d = void 0)),
      ]
    );
  }
  class Xi extends Pe {
    constructor(e) {
      super(),
        He(this, e, Ki, Wi, a, {
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
  var Yi = Pt({ class: "mdc-text-field-helper-line", component: cn }),
    Qi = Pt({
      class: "mdc-text-field__affix mdc-text-field__affix--prefix",
      component: mn,
    }),
    Ji = Pt({
      class: "mdc-text-field__affix mdc-text-field__affix--suffix",
      component: mn,
    });
  function Zi(t) {
    let i,
      r,
      a,
      l,
      c,
      u = [
        { class: (r = yt({ [t[1]]: !0, "mdc-text-field__input": !0 })) },
        { type: t[2] },
        { placeholder: t[3] },
        t[4],
        t[6],
        t[10],
      ],
      d = {};
    for (let e = 0; e < u.length; e += 1) d = n(d, u[e]);
    return {
      c() {
        (i = M("input")), H(i, d);
      },
      m(e, n) {
        L(e, i, n),
          i.autofocus && i.focus(),
          t[26](i),
          l ||
            ((c = [
              v((a = Ct.call(null, i, t[0]))),
              v(t[7].call(null, i)),
              k(i, "input", t[27]),
              k(i, "change", t[9]),
              k(i, "blur", t[24]),
              k(i, "focus", t[25]),
            ]),
            (l = !0));
      },
      p(e, [t]) {
        H(
          i,
          (d = Ne(u, [
            2 & t &&
              r !== (r = yt({ [e[1]]: !0, "mdc-text-field__input": !0 })) && {
                class: r,
              },
            4 & t && { type: e[2] },
            8 & t && { placeholder: e[3] },
            16 & t && e[4],
            64 & t && e[6],
            1024 & t && e[10],
          ]))
        ),
          a && o(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && O(i), t[26](null), (l = !1), s(c);
      },
    };
  }
  function er(e, t, i) {
    const r = [
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
    let s = m(t, r);
    const o = xt(Z());
    let a = () => {};
    let { use: l = [] } = t,
      { class: c = "" } = t,
      { type: u = "text" } = t,
      { placeholder: d = " " } = t,
      { value: p = a } = t;
    const f = (function (e) {
      return e === a;
    })(p);
    f && (p = "");
    let { files: g = null } = t,
      { dirty: $ = !1 } = t,
      { invalid: y = !1 } = t,
      { updateInvalid: v = !0 } = t,
      { emptyValueNull: I = null === p } = t;
    f && I && (p = null);
    let b,
      { emptyValueUndefined: E = void 0 === p } = t;
    f && E && (p = void 0);
    let x = {},
      A = {};
    function C(e) {
      if ("file" !== u)
        if ("" === e.currentTarget.value && I) i(11, (p = null));
        else if ("" === e.currentTarget.value && E) i(11, (p = void 0));
        else
          switch (u) {
            case "number":
            case "range":
              i(
                11,
                (p = (function (e) {
                  if ("" === e) {
                    const e = new Number(Number.NaN);
                    return (e.length = 0), e;
                  }
                  return +e;
                })(e.currentTarget.value))
              );
              break;
            default:
              i(11, (p = e.currentTarget.value));
          }
      else i(12, (g = e.currentTarget.files));
    }
    function _() {
      return b;
    }
    ee(() => {
      v && i(14, (y = b.matches(":invalid")));
    });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(10, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "class" in e && i(1, (c = e.class)),
          "type" in e && i(2, (u = e.type)),
          "placeholder" in e && i(3, (d = e.placeholder)),
          "value" in e && i(11, (p = e.value)),
          "files" in e && i(12, (g = e.files)),
          "dirty" in e && i(13, ($ = e.dirty)),
          "invalid" in e && i(14, (y = e.invalid)),
          "updateInvalid" in e && i(15, (v = e.updateInvalid)),
          "emptyValueNull" in e && i(16, (I = e.emptyValueNull)),
          "emptyValueUndefined" in e && i(17, (E = e.emptyValueUndefined));
      }),
      (e.$$.update = () => {
        2068 & e.$$.dirty &&
          ("file" === u
            ? (delete A.value, i(4, A), i(2, u), i(11, p))
            : i(4, (A.value = null == p ? "" : p), A));
      }),
      [
        l,
        c,
        u,
        d,
        A,
        b,
        x,
        o,
        C,
        function (e) {
          ("file" !== u && "range" !== u) || C(e),
            i(13, ($ = !0)),
            v && i(14, (y = b.matches(":invalid")));
        },
        s,
        p,
        g,
        $,
        y,
        v,
        I,
        E,
        function (e) {
          var t;
          return e in x
            ? null !== (t = x[e]) && void 0 !== t
              ? t
              : null
            : _().getAttribute(e);
        },
        function (e, t) {
          x[e] !== t && i(6, (x[e] = t), x);
        },
        function (e) {
          (e in x && null == x[e]) || i(6, (x[e] = void 0), x);
        },
        function () {
          _().focus();
        },
        function () {
          _().blur();
        },
        _,
        function (t) {
          se.call(this, e, t);
        },
        function (t) {
          se.call(this, e, t);
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (b = e), i(5, b);
          });
        },
        (e) => "file" !== u && C(e),
      ]
    );
  }
  class tr extends Pe {
    constructor(e) {
      super(),
        He(this, e, er, Zi, a, {
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
  function nr(t) {
    let i,
      r,
      a,
      l,
      c,
      u,
      d = [
        { class: (r = yt({ [t[2]]: !0, "mdc-text-field__input": !0 })) },
        { style: (a = `${t[4] ? "" : "resize: none; "}${t[3]}`) },
        t[6],
        t[9],
      ],
      p = {};
    for (let e = 0; e < d.length; e += 1) p = n(p, d[e]);
    return {
      c() {
        (i = M("textarea")), H(i, p);
      },
      m(e, n) {
        L(e, i, n),
          i.autofocus && i.focus(),
          t[21](i),
          B(i, t[0]),
          c ||
            ((u = [
              v((l = Ct.call(null, i, t[1]))),
              v(t[7].call(null, i)),
              k(i, "change", t[8]),
              k(i, "blur", t[19]),
              k(i, "focus", t[20]),
              k(i, "input", t[22]),
            ]),
            (c = !0));
      },
      p(e, [t]) {
        H(
          i,
          (p = Ne(d, [
            4 & t &&
              r !== (r = yt({ [e[2]]: !0, "mdc-text-field__input": !0 })) && {
                class: r,
              },
            24 & t &&
              a !== (a = `${e[4] ? "" : "resize: none; "}${e[3]}`) && {
                style: a,
              },
            64 & t && e[6],
            512 & t && e[9],
          ]))
        ),
          l && o(l.update) && 2 & t && l.update.call(null, e[1]),
          1 & t && B(i, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && O(i), t[21](null), (c = !1), s(u);
      },
    };
  }
  function ir(e, t, i) {
    const r = [
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
    let s = m(t, r);
    const o = xt(Z());
    let a,
      { use: l = [] } = t,
      { class: c = "" } = t,
      { style: u = "" } = t,
      { value: d = "" } = t,
      { dirty: p = !1 } = t,
      { invalid: f = !1 } = t,
      { updateInvalid: g = !0 } = t,
      { resizable: $ = !0 } = t,
      y = {};
    function v() {
      return a;
    }
    return (
      ee(() => {
        g && i(11, (f = a.matches(":invalid")));
      }),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(9, (s = m(t, r))),
          "use" in e && i(1, (l = e.use)),
          "class" in e && i(2, (c = e.class)),
          "style" in e && i(3, (u = e.style)),
          "value" in e && i(0, (d = e.value)),
          "dirty" in e && i(10, (p = e.dirty)),
          "invalid" in e && i(11, (f = e.invalid)),
          "updateInvalid" in e && i(12, (g = e.updateInvalid)),
          "resizable" in e && i(4, ($ = e.resizable));
      }),
      [
        d,
        l,
        c,
        u,
        $,
        a,
        y,
        o,
        function () {
          i(10, (p = !0)), g && i(11, (f = a.matches(":invalid")));
        },
        s,
        p,
        f,
        g,
        function (e) {
          var t;
          return e in y
            ? null !== (t = y[e]) && void 0 !== t
              ? t
              : null
            : v().getAttribute(e);
        },
        function (e, t) {
          y[e] !== t && i(6, (y[e] = t), y);
        },
        function (e) {
          (e in y && null == y[e]) || i(6, (y[e] = void 0), y);
        },
        function () {
          v().focus();
        },
        function () {
          v().blur();
        },
        v,
        function (t) {
          se.call(this, e, t);
        },
        function (t) {
          se.call(this, e, t);
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (a = e), i(5, a);
          });
        },
        function () {
          (d = this.value), i(0, d);
        },
      ]
    );
  }
  class rr extends Pe {
    constructor(e) {
      super(),
        He(this, e, ir, nr, a, {
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
  const sr = (e) => ({}),
    or = (e) => ({}),
    ar = (e) => ({}),
    lr = (e) => ({}),
    cr = (e) => ({}),
    ur = (e) => ({}),
    dr = (e) => ({}),
    pr = (e) => ({}),
    fr = (e) => ({}),
    hr = (e) => ({}),
    mr = (e) => ({}),
    gr = (e) => ({}),
    $r = (e) => ({}),
    yr = (e) => ({}),
    vr = (e) => ({}),
    Ir = (e) => ({}),
    br = (e) => ({}),
    Er = (e) => ({}),
    xr = (e) => ({}),
    Ar = (e) => ({}),
    Cr = (e) => ({}),
    _r = (e) => ({}),
    Sr = (e) => ({}),
    Tr = (e) => ({});
  function Lr(e) {
    let t, i, r, a, l, u, h, m, g, $, y, I, b, E;
    const x = e[51].label,
      A = c(x, e, e[90], hr);
    r = new Li({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [wr] },
        $$scope: { ctx: e },
      },
    });
    const C = e[51].default,
      S = c(C, e, e[90], null);
    u = new Li({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !1,
        $$slots: { default: [Mr] },
        $$scope: { ctx: e },
      },
    });
    const T = e[51].ripple,
      w = c(T, e, e[90], lr);
    let N = [
        {
          class: (m = yt({
            [e[9]]: !0,
            "mdc-text-field": !0,
            "mdc-text-field--disabled": e[12],
            "mdc-text-field--textarea": e[14],
            "mdc-text-field--filled": "filled" === e[15],
            "mdc-text-field--outlined": "outlined" === e[15],
            "smui-text-field--standard": "standard" === e[15] && !e[14],
            "mdc-text-field--no-label": e[16] || !e[42].label,
            "mdc-text-field--with-leading-icon": e[42].leadingIcon,
            "mdc-text-field--with-trailing-icon": e[42].trailingIcon,
            "mdc-text-field--invalid": e[1],
            ...e[25],
          })),
        },
        {
          style: (g = Object.entries(e[26]).map(es).concat([e[10]]).join(" ")),
        },
        It(e[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      D = {};
    for (let e = 0; e < N.length; e += 1) D = n(D, N[e]);
    return {
      c() {
        (t = M("div")),
          A && A.c(),
          (i = R()),
          Fe(r.$$.fragment),
          (a = R()),
          S && S.c(),
          (l = R()),
          Fe(u.$$.fragment),
          (h = R()),
          w && w.c(),
          H(t, D);
      },
      m(n, s) {
        L(n, t, s),
          A && A.m(t, null),
          _(t, i),
          ke(r, t, null),
          _(t, a),
          S && S.m(t, null),
          _(t, l),
          ke(u, t, null),
          _(t, h),
          w && w.m(t, null),
          e[80](t),
          (I = !0),
          b ||
            ((E = [
              v(
                ($ = Ni.call(null, t, {
                  ripple: e[11],
                  unbounded: !1,
                  addClass: e[38],
                  removeClass: e[39],
                  addStyle: e[40],
                }))
              ),
              v((y = Ct.call(null, t, e[8]))),
              v(e[34].call(null, t)),
              k(t, "SMUITextfieldLeadingIcon:mount", e[81]),
              k(t, "SMUITextfieldLeadingIcon:unmount", e[82]),
              k(t, "SMUITextfieldTrailingIcon:mount", e[83]),
              k(t, "SMUITextfieldTrailingIcon:unmount", e[84]),
            ]),
            (b = !0));
      },
      p(e, n) {
        A &&
          A.p &&
          (!I || 268435456 & n[2]) &&
          p(A, x, e, e[90], I ? d(x, e[90], n, fr) : f(e[90]), hr);
        const i = {};
        268435456 & n[2] && (i.$$scope = { dirty: n, ctx: e }),
          r.$set(i),
          S &&
            S.p &&
            (!I || 268435456 & n[2]) &&
            p(S, C, e, e[90], I ? d(C, e[90], n, null) : f(e[90]), null);
        const s = {};
        268435456 & n[2] && (s.$$scope = { dirty: n, ctx: e }),
          u.$set(s),
          w &&
            w.p &&
            (!I || 268435456 & n[2]) &&
            p(w, T, e, e[90], I ? d(T, e[90], n, ar) : f(e[90]), lr),
          H(
            t,
            (D = Ne(N, [
              (!I ||
                ((33673730 & n[0]) | (2048 & n[1]) &&
                  m !==
                    (m = yt({
                      [e[9]]: !0,
                      "mdc-text-field": !0,
                      "mdc-text-field--disabled": e[12],
                      "mdc-text-field--textarea": e[14],
                      "mdc-text-field--filled": "filled" === e[15],
                      "mdc-text-field--outlined": "outlined" === e[15],
                      "smui-text-field--standard":
                        "standard" === e[15] && !e[14],
                      "mdc-text-field--no-label": e[16] || !e[42].label,
                      "mdc-text-field--with-leading-icon": e[42].leadingIcon,
                      "mdc-text-field--with-trailing-icon": e[42].trailingIcon,
                      "mdc-text-field--invalid": e[1],
                      ...e[25],
                    })))) && { class: m },
              (!I ||
                (67109888 & n[0] &&
                  g !==
                    (g = Object.entries(e[26])
                      .map(es)
                      .concat([e[10]])
                      .join(" ")))) && { style: g },
              1024 & n[1] &&
                It(e[41], [
                  "input$",
                  "label$",
                  "ripple$",
                  "outline$",
                  "helperLine$",
                ]),
            ]))
          ),
          $ &&
            o($.update) &&
            2048 & n[0] &&
            $.update.call(null, {
              ripple: e[11],
              unbounded: !1,
              addClass: e[38],
              removeClass: e[39],
              addStyle: e[40],
            }),
          y && o(y.update) && 256 & n[0] && y.update.call(null, e[8]);
      },
      i(e) {
        I ||
          (_e(A, e),
          _e(r.$$.fragment, e),
          _e(S, e),
          _e(u.$$.fragment, e),
          _e(w, e),
          (I = !0));
      },
      o(e) {
        Se(A, e),
          Se(r.$$.fragment, e),
          Se(S, e),
          Se(u.$$.fragment, e),
          Se(w, e),
          (I = !1);
      },
      d(n) {
        n && O(t),
          A && A.d(n),
          Ue(r),
          S && S.d(n),
          Ue(u),
          w && w.d(n),
          e[80](null),
          (b = !1),
          s(E);
      },
    };
  }
  function Or(e) {
    let t,
      i,
      r,
      a,
      l,
      u,
      h,
      m,
      g,
      $,
      y,
      I,
      b,
      E,
      x,
      A,
      C,
      S,
      T = !e[14] && "outlined" !== e[15] && Nr(e),
      w = (e[14] || "outlined" === e[15]) && kr(e);
    a = new Li({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [Br] },
        $$scope: { ctx: e },
      },
    });
    const N = e[51].default,
      D = c(N, e, e[90], null),
      F = [jr, Vr],
      U = [];
    function P(e, t) {
      return e[14] && "string" == typeof e[0] ? 0 : 1;
    }
    (h = P(e)),
      (m = U[h] = F[h](e)),
      ($ = new Li({
        props: {
          key: "SMUI:textfield:icon:leading",
          value: !1,
          $$slots: { default: [Kr] },
          $$scope: { ctx: e },
        },
      }));
    let B = !e[14] && "outlined" !== e[15] && e[11] && Xr(e),
      V = [
        {
          class: (I = yt({
            [e[9]]: !0,
            "mdc-text-field": !0,
            "mdc-text-field--disabled": e[12],
            "mdc-text-field--textarea": e[14],
            "mdc-text-field--filled": "filled" === e[15],
            "mdc-text-field--outlined": "outlined" === e[15],
            "smui-text-field--standard": "standard" === e[15] && !e[14],
            "mdc-text-field--no-label":
              e[16] || (null == e[17] && !e[42].label),
            "mdc-text-field--label-floating":
              e[28] || (null != e[0] && "" !== e[0]),
            "mdc-text-field--with-leading-icon": e[35](e[22])
              ? e[42].leadingIcon
              : e[22],
            "mdc-text-field--with-trailing-icon": e[35](e[23])
              ? e[42].trailingIcon
              : e[23],
            "mdc-text-field--with-internal-counter":
              e[14] && e[42].internalCounter,
            "mdc-text-field--invalid": e[1],
            ...e[25],
          })),
        },
        {
          style: (b = Object.entries(e[26]).map(Zr).concat([e[10]]).join(" ")),
        },
        { for: void 0 },
        It(e[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      j = {};
    for (let e = 0; e < V.length; e += 1) j = n(j, V[e]);
    return {
      c() {
        (t = M("label")),
          T && T.c(),
          (i = R()),
          w && w.c(),
          (r = R()),
          Fe(a.$$.fragment),
          (l = R()),
          D && D.c(),
          (u = R()),
          m.c(),
          (g = R()),
          Fe($.$$.fragment),
          (y = R()),
          B && B.c(),
          H(t, j);
      },
      m(n, s) {
        L(n, t, s),
          T && T.m(t, null),
          _(t, i),
          w && w.m(t, null),
          _(t, r),
          ke(a, t, null),
          _(t, l),
          D && D.m(t, null),
          _(t, u),
          U[h].m(t, null),
          _(t, g),
          ke($, t, null),
          _(t, y),
          B && B.m(t, null),
          e[73](t),
          (A = !0),
          C ||
            ((S = [
              v(
                (E = Ni.call(null, t, {
                  ripple: !e[14] && "filled" === e[15],
                  unbounded: !1,
                  addClass: e[38],
                  removeClass: e[39],
                  addStyle: e[40],
                  eventTarget: e[33],
                  activeTarget: e[33],
                  initPromise: e[37],
                }))
              ),
              v((x = Ct.call(null, t, e[8]))),
              v(e[34].call(null, t)),
              k(t, "SMUITextfieldLeadingIcon:mount", e[74]),
              k(t, "SMUITextfieldLeadingIcon:unmount", e[75]),
              k(t, "SMUITextfieldTrailingIcon:mount", e[76]),
              k(t, "SMUITextfieldTrailingIcon:unmount", e[77]),
              k(t, "SMUITextfieldCharacterCounter:mount", e[78]),
              k(t, "SMUITextfieldCharacterCounter:unmount", e[79]),
            ]),
            (C = !0));
      },
      p(e, n) {
        e[14] || "outlined" === e[15]
          ? T &&
            (Ae(),
            Se(T, 1, 1, () => {
              T = null;
            }),
            Ce())
          : T
          ? (T.p(e, n), 49152 & n[0] && _e(T, 1))
          : ((T = Nr(e)), T.c(), _e(T, 1), T.m(t, i)),
          e[14] || "outlined" === e[15]
            ? w
              ? (w.p(e, n), 49152 & n[0] && _e(w, 1))
              : ((w = kr(e)), w.c(), _e(w, 1), w.m(t, r))
            : w &&
              (Ae(),
              Se(w, 1, 1, () => {
                w = null;
              }),
              Ce());
        const s = {};
        268435456 & n[2] && (s.$$scope = { dirty: n, ctx: e }),
          a.$set(s),
          D &&
            D.p &&
            (!A || 268435456 & n[2]) &&
            p(D, N, e, e[90], A ? d(N, e[90], n, null) : f(e[90]), null);
        let l = h;
        (h = P(e)),
          h === l
            ? U[h].p(e, n)
            : (Ae(),
              Se(U[l], 1, 1, () => {
                U[l] = null;
              }),
              Ce(),
              (m = U[h]),
              m ? m.p(e, n) : ((m = U[h] = F[h](e)), m.c()),
              _e(m, 1),
              m.m(t, g));
        const c = {};
        268435456 & n[2] && (c.$$scope = { dirty: n, ctx: e }),
          $.$set(c),
          !e[14] && "outlined" !== e[15] && e[11]
            ? B
              ? (B.p(e, n), 51200 & n[0] && _e(B, 1))
              : ((B = Xr(e)), B.c(), _e(B, 1), B.m(t, null))
            : B &&
              (Ae(),
              Se(B, 1, 1, () => {
                B = null;
              }),
              Ce()),
          H(
            t,
            (j = Ne(V, [
              (!A ||
                ((314823171 & n[0]) | (2048 & n[1]) &&
                  I !==
                    (I = yt({
                      [e[9]]: !0,
                      "mdc-text-field": !0,
                      "mdc-text-field--disabled": e[12],
                      "mdc-text-field--textarea": e[14],
                      "mdc-text-field--filled": "filled" === e[15],
                      "mdc-text-field--outlined": "outlined" === e[15],
                      "smui-text-field--standard":
                        "standard" === e[15] && !e[14],
                      "mdc-text-field--no-label":
                        e[16] || (null == e[17] && !e[42].label),
                      "mdc-text-field--label-floating":
                        e[28] || (null != e[0] && "" !== e[0]),
                      "mdc-text-field--with-leading-icon": e[35](e[22])
                        ? e[42].leadingIcon
                        : e[22],
                      "mdc-text-field--with-trailing-icon": e[35](e[23])
                        ? e[42].trailingIcon
                        : e[23],
                      "mdc-text-field--with-internal-counter":
                        e[14] && e[42].internalCounter,
                      "mdc-text-field--invalid": e[1],
                      ...e[25],
                    })))) && { class: I },
              (!A ||
                (67109888 & n[0] &&
                  b !==
                    (b = Object.entries(e[26])
                      .map(Zr)
                      .concat([e[10]])
                      .join(" ")))) && { style: b },
              { for: void 0 },
              1024 & n[1] &&
                It(e[41], [
                  "input$",
                  "label$",
                  "ripple$",
                  "outline$",
                  "helperLine$",
                ]),
            ]))
          ),
          E &&
            o(E.update) &&
            (49152 & n[0]) | (4 & n[1]) &&
            E.update.call(null, {
              ripple: !e[14] && "filled" === e[15],
              unbounded: !1,
              addClass: e[38],
              removeClass: e[39],
              addStyle: e[40],
              eventTarget: e[33],
              activeTarget: e[33],
              initPromise: e[37],
            }),
          x && o(x.update) && 256 & n[0] && x.update.call(null, e[8]);
      },
      i(e) {
        A ||
          (_e(T),
          _e(w),
          _e(a.$$.fragment, e),
          _e(D, e),
          _e(m),
          _e($.$$.fragment, e),
          _e(B),
          (A = !0));
      },
      o(e) {
        Se(T),
          Se(w),
          Se(a.$$.fragment, e),
          Se(D, e),
          Se(m),
          Se($.$$.fragment, e),
          Se(B),
          (A = !1);
      },
      d(n) {
        n && O(t),
          T && T.d(),
          w && w.d(),
          Ue(a),
          D && D.d(n),
          U[h].d(),
          Ue($),
          B && B.d(),
          e[73](null),
          (C = !1),
          s(S);
      },
    };
  }
  function wr(e) {
    let t;
    const n = e[51].leadingIcon,
      i = c(n, e, e[90], pr);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 268435456 & r[2]) &&
          p(i, n, e, e[90], t ? d(n, e[90], r, dr) : f(e[90]), pr);
      },
      i(e) {
        t || (_e(i, e), (t = !0));
      },
      o(e) {
        Se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Mr(e) {
    let t;
    const n = e[51].trailingIcon,
      i = c(n, e, e[90], ur);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 268435456 & r[2]) &&
          p(i, n, e, e[90], t ? d(n, e[90], r, cr) : f(e[90]), ur);
      },
      i(e) {
        t || (_e(i, e), (t = !0));
      },
      o(e) {
        Se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Nr(e) {
    let t,
      n,
      i,
      r = "filled" === e[15] && Dr(),
      s = !e[16] && (null != e[17] || e[42].label) && Rr(e);
    return {
      c() {
        r && r.c(), (t = R()), s && s.c(), (n = F());
      },
      m(e, o) {
        r && r.m(e, o), L(e, t, o), s && s.m(e, o), L(e, n, o), (i = !0);
      },
      p(e, i) {
        "filled" === e[15]
          ? r || ((r = Dr()), r.c(), r.m(t.parentNode, t))
          : r && (r.d(1), (r = null)),
          e[16] || (null == e[17] && !e[42].label)
            ? s &&
              (Ae(),
              Se(s, 1, 1, () => {
                s = null;
              }),
              Ce())
            : s
            ? (s.p(e, i), (196608 & i[0]) | (2048 & i[1]) && _e(s, 1))
            : ((s = Rr(e)), s.c(), _e(s, 1), s.m(n.parentNode, n));
      },
      i(e) {
        i || (_e(s), (i = !0));
      },
      o(e) {
        Se(s), (i = !1);
      },
      d(e) {
        r && r.d(e), e && O(t), s && s.d(e), e && O(n);
      },
    };
  }
  function Dr(e) {
    let t;
    return {
      c() {
        (t = M("span")), U(t, "class", "mdc-text-field__ripple");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Rr(e) {
    let t, i;
    const r = [
      { floatAbove: e[28] || (null != e[0] && "" !== e[0]) },
      { required: e[13] },
      { wrapped: !0 },
      At(e[41], "label$"),
    ];
    let s = { $$slots: { default: [Fr] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new Pi({ props: s })),
      e[52](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i =
            (268443649 & n[0]) | (1024 & n[1])
              ? Ne(r, [
                  268435457 & n[0] && {
                    floatAbove: e[28] || (null != e[0] && "" !== e[0]),
                  },
                  8192 & n[0] && { required: e[13] },
                  r[2],
                  1024 & n[1] && De(At(e[41], "label$")),
                ])
              : {};
          (131072 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          i || (_e(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[52](null), Ue(t, n);
        },
      }
    );
  }
  function Fr(e) {
    let t,
      n,
      i = (null == e[17] ? "" : e[17]) + "";
    const r = e[51].label,
      s = c(r, e, e[90], Tr);
    return {
      c() {
        (t = D(i)), s && s.c();
      },
      m(e, i) {
        L(e, t, i), s && s.m(e, i), (n = !0);
      },
      p(e, o) {
        (!n || 131072 & o[0]) &&
          i !== (i = (null == e[17] ? "" : e[17]) + "") &&
          P(t, i),
          s &&
            s.p &&
            (!n || 268435456 & o[2]) &&
            p(s, r, e, e[90], n ? d(r, e[90], o, Sr) : f(e[90]), Tr);
      },
      i(e) {
        n || (_e(s, e), (n = !0));
      },
      o(e) {
        Se(s, e), (n = !1);
      },
      d(e) {
        e && O(t), s && s.d(e);
      },
    };
  }
  function kr(e) {
    let t, i;
    const r = [
      { noLabel: e[16] || (null == e[17] && !e[42].label) },
      At(e[41], "outline$"),
    ];
    let s = { $$slots: { default: [Pr] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new Xi({ props: s })),
      e[54](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i =
            (196608 & n[0]) | (3072 & n[1])
              ? Ne(r, [
                  (196608 & n[0]) | (2048 & n[1]) && {
                    noLabel: e[16] || (null == e[17] && !e[42].label),
                  },
                  1024 & n[1] && De(At(e[41], "outline$")),
                ])
              : {};
          (268640289 & n[0]) | (3072 & n[1]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          i || (_e(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[54](null), Ue(t, n);
        },
      }
    );
  }
  function Ur(e) {
    let t, i;
    const r = [
      { floatAbove: e[28] || (null != e[0] && "" !== e[0]) },
      { required: e[13] },
      { wrapped: !0 },
      At(e[41], "label$"),
    ];
    let s = { $$slots: { default: [Hr] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new Pi({ props: s })),
      e[53](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i =
            (268443649 & n[0]) | (1024 & n[1])
              ? Ne(r, [
                  268435457 & n[0] && {
                    floatAbove: e[28] || (null != e[0] && "" !== e[0]),
                  },
                  8192 & n[0] && { required: e[13] },
                  r[2],
                  1024 & n[1] && De(At(e[41], "label$")),
                ])
              : {};
          (131072 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          i || (_e(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[53](null), Ue(t, n);
        },
      }
    );
  }
  function Hr(e) {
    let t,
      n,
      i = (null == e[17] ? "" : e[17]) + "";
    const r = e[51].label,
      s = c(r, e, e[90], _r);
    return {
      c() {
        (t = D(i)), s && s.c();
      },
      m(e, i) {
        L(e, t, i), s && s.m(e, i), (n = !0);
      },
      p(e, o) {
        (!n || 131072 & o[0]) &&
          i !== (i = (null == e[17] ? "" : e[17]) + "") &&
          P(t, i),
          s &&
            s.p &&
            (!n || 268435456 & o[2]) &&
            p(s, r, e, e[90], n ? d(r, e[90], o, Cr) : f(e[90]), _r);
      },
      i(e) {
        n || (_e(s, e), (n = !0));
      },
      o(e) {
        Se(s, e), (n = !1);
      },
      d(e) {
        e && O(t), s && s.d(e);
      },
    };
  }
  function Pr(e) {
    let t,
      n,
      i = !e[16] && (null != e[17] || e[42].label) && Ur(e);
    return {
      c() {
        i && i.c(), (t = F());
      },
      m(e, r) {
        i && i.m(e, r), L(e, t, r), (n = !0);
      },
      p(e, n) {
        e[16] || (null == e[17] && !e[42].label)
          ? i &&
            (Ae(),
            Se(i, 1, 1, () => {
              i = null;
            }),
            Ce())
          : i
          ? (i.p(e, n), (196608 & n[0]) | (2048 & n[1]) && _e(i, 1))
          : ((i = Ur(e)), i.c(), _e(i, 1), i.m(t.parentNode, t));
      },
      i(e) {
        n || (_e(i), (n = !0));
      },
      o(e) {
        Se(i), (n = !1);
      },
      d(e) {
        i && i.d(e), e && O(t);
      },
    };
  }
  function Br(e) {
    let t;
    const n = e[51].leadingIcon,
      i = c(n, e, e[90], Ar);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 268435456 & r[2]) &&
          p(i, n, e, e[90], t ? d(n, e[90], r, xr) : f(e[90]), Ar);
      },
      i(e) {
        t || (_e(i, e), (t = !0));
      },
      o(e) {
        Se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Vr(e) {
    let t, i, r, s, o, a, l, u, h, m;
    const g = e[51].prefix,
      $ = c(g, e, e[90], Ir);
    let y = null != e[20] && zr(e);
    const v = [
      { type: e[18] },
      { disabled: e[12] },
      { required: e[13] },
      { updateInvalid: e[19] },
      { "aria-controls": e[27] },
      { "aria-describedby": e[27] },
      e[16] && null != e[17] ? { placeholder: e[17] } : {},
      At(e[41], "input$"),
    ];
    function I(t) {
      e[64](t);
    }
    function b(t) {
      e[65](t);
    }
    function E(t) {
      e[66](t);
    }
    function x(t) {
      e[67](t);
    }
    let A = {};
    for (let e = 0; e < v.length; e += 1) A = n(A, v[e]);
    void 0 !== e[0] && (A.value = e[0]),
      void 0 !== e[3] && (A.files = e[3]),
      void 0 !== e[4] && (A.dirty = e[4]),
      void 0 !== e[1] && (A.invalid = e[1]),
      (r = new tr({ props: A })),
      e[63](r),
      ae.push(() => Re(r, "value", I)),
      ae.push(() => Re(r, "files", b)),
      ae.push(() => Re(r, "dirty", E)),
      ae.push(() => Re(r, "invalid", x)),
      r.$on("blur", e[68]),
      r.$on("focus", e[69]),
      r.$on("blur", e[70]),
      r.$on("focus", e[71]);
    let C = null != e[21] && Wr(e);
    const _ = e[51].suffix,
      S = c(_, e, e[90], yr);
    return {
      c() {
        $ && $.c(),
          (t = R()),
          y && y.c(),
          (i = R()),
          Fe(r.$$.fragment),
          (u = R()),
          C && C.c(),
          (h = R()),
          S && S.c();
      },
      m(e, n) {
        $ && $.m(e, n),
          L(e, t, n),
          y && y.m(e, n),
          L(e, i, n),
          ke(r, e, n),
          L(e, u, n),
          C && C.m(e, n),
          L(e, h, n),
          S && S.m(e, n),
          (m = !0);
      },
      p(e, t) {
        $ &&
          $.p &&
          (!m || 268435456 & t[2]) &&
          p($, g, e, e[90], m ? d(g, e[90], t, vr) : f(e[90]), Ir),
          null != e[20]
            ? y
              ? (y.p(e, t), 1048576 & t[0] && _e(y, 1))
              : ((y = zr(e)), y.c(), _e(y, 1), y.m(i.parentNode, i))
            : y &&
              (Ae(),
              Se(y, 1, 1, () => {
                y = null;
              }),
              Ce());
        const n =
          (135213056 & t[0]) | (1024 & t[1])
            ? Ne(v, [
                262144 & t[0] && { type: e[18] },
                4096 & t[0] && { disabled: e[12] },
                8192 & t[0] && { required: e[13] },
                524288 & t[0] && { updateInvalid: e[19] },
                134217728 & t[0] && { "aria-controls": e[27] },
                134217728 & t[0] && { "aria-describedby": e[27] },
                196608 & t[0] &&
                  De(e[16] && null != e[17] ? { placeholder: e[17] } : {}),
                1024 & t[1] && De(At(e[41], "input$")),
              ])
            : {};
        !s && 1 & t[0] && ((s = !0), (n.value = e[0]), he(() => (s = !1))),
          !o && 8 & t[0] && ((o = !0), (n.files = e[3]), he(() => (o = !1))),
          !a && 16 & t[0] && ((a = !0), (n.dirty = e[4]), he(() => (a = !1))),
          !l && 2 & t[0] && ((l = !0), (n.invalid = e[1]), he(() => (l = !1))),
          r.$set(n),
          null != e[21]
            ? C
              ? (C.p(e, t), 2097152 & t[0] && _e(C, 1))
              : ((C = Wr(e)), C.c(), _e(C, 1), C.m(h.parentNode, h))
            : C &&
              (Ae(),
              Se(C, 1, 1, () => {
                C = null;
              }),
              Ce()),
          S &&
            S.p &&
            (!m || 268435456 & t[2]) &&
            p(S, _, e, e[90], m ? d(_, e[90], t, $r) : f(e[90]), yr);
      },
      i(e) {
        m || (_e($, e), _e(y), _e(r.$$.fragment, e), _e(C), _e(S, e), (m = !0));
      },
      o(e) {
        Se($, e), Se(y), Se(r.$$.fragment, e), Se(C), Se(S, e), (m = !1);
      },
      d(n) {
        $ && $.d(n),
          n && O(t),
          y && y.d(n),
          n && O(i),
          e[63](null),
          Ue(r, n),
          n && O(u),
          C && C.d(n),
          n && O(h),
          S && S.d(n);
      },
    };
  }
  function jr(e) {
    let t, i, r, s, o, a, l, u;
    const h = [
      { disabled: e[12] },
      { required: e[13] },
      { updateInvalid: e[19] },
      { "aria-controls": e[27] },
      { "aria-describedby": e[27] },
      At(e[41], "input$"),
    ];
    function m(t) {
      e[56](t);
    }
    function g(t) {
      e[57](t);
    }
    function $(t) {
      e[58](t);
    }
    let y = {};
    for (let e = 0; e < h.length; e += 1) y = n(y, h[e]);
    void 0 !== e[0] && (y.value = e[0]),
      void 0 !== e[4] && (y.dirty = e[4]),
      void 0 !== e[1] && (y.invalid = e[1]),
      (i = new rr({ props: y })),
      e[55](i),
      ae.push(() => Re(i, "value", m)),
      ae.push(() => Re(i, "dirty", g)),
      ae.push(() => Re(i, "invalid", $)),
      i.$on("blur", e[59]),
      i.$on("focus", e[60]),
      i.$on("blur", e[61]),
      i.$on("focus", e[62]);
    const v = e[51].internalCounter,
      I = c(v, e, e[90], Er);
    return {
      c() {
        (t = M("span")),
          Fe(i.$$.fragment),
          (a = R()),
          I && I.c(),
          U(
            t,
            "class",
            (l = yt({
              "mdc-text-field__resizer":
                !("input$resizable" in e[41]) || e[41].input$resizable,
            }))
          );
      },
      m(e, n) {
        L(e, t, n), ke(i, t, null), _(t, a), I && I.m(t, null), (u = !0);
      },
      p(e, n) {
        const a =
          (134754304 & n[0]) | (1024 & n[1])
            ? Ne(h, [
                4096 & n[0] && { disabled: e[12] },
                8192 & n[0] && { required: e[13] },
                524288 & n[0] && { updateInvalid: e[19] },
                134217728 & n[0] && { "aria-controls": e[27] },
                134217728 & n[0] && { "aria-describedby": e[27] },
                1024 & n[1] && De(At(e[41], "input$")),
              ])
            : {};
        !r && 1 & n[0] && ((r = !0), (a.value = e[0]), he(() => (r = !1))),
          !s && 16 & n[0] && ((s = !0), (a.dirty = e[4]), he(() => (s = !1))),
          !o && 2 & n[0] && ((o = !0), (a.invalid = e[1]), he(() => (o = !1))),
          i.$set(a),
          I &&
            I.p &&
            (!u || 268435456 & n[2]) &&
            p(I, v, e, e[90], u ? d(v, e[90], n, br) : f(e[90]), Er),
          (!u ||
            (1024 & n[1] &&
              l !==
                (l = yt({
                  "mdc-text-field__resizer":
                    !("input$resizable" in e[41]) || e[41].input$resizable,
                })))) &&
            U(t, "class", l);
      },
      i(e) {
        u || (_e(i.$$.fragment, e), _e(I, e), (u = !0));
      },
      o(e) {
        Se(i.$$.fragment, e), Se(I, e), (u = !1);
      },
      d(n) {
        n && O(t), e[55](null), Ue(i), I && I.d(n);
      },
    };
  }
  function zr(e) {
    let t, n;
    return (
      (t = new Qi({
        props: { $$slots: { default: [Gr] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (1048576 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Gr(e) {
    let t;
    return {
      c() {
        t = D(e[20]);
      },
      m(e, n) {
        L(e, t, n);
      },
      p(e, n) {
        1048576 & n[0] && P(t, e[20]);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Wr(e) {
    let t, n;
    return (
      (t = new Ji({
        props: { $$slots: { default: [qr] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (2097152 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function qr(e) {
    let t;
    return {
      c() {
        t = D(e[21]);
      },
      m(e, n) {
        L(e, t, n);
      },
      p(e, n) {
        2097152 & n[0] && P(t, e[21]);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Kr(e) {
    let t;
    const n = e[51].trailingIcon,
      i = c(n, e, e[90], gr);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 268435456 & r[2]) &&
          p(i, n, e, e[90], t ? d(n, e[90], r, mr) : f(e[90]), gr);
      },
      i(e) {
        t || (_e(i, e), (t = !0));
      },
      o(e) {
        Se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Xr(e) {
    let t, i;
    const r = [At(e[41], "ripple$")];
    let s = {};
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new zi({ props: s })),
      e[72](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i = 1024 & n[1] ? Ne(r, [De(At(e[41], "ripple$"))]) : {};
          t.$set(i);
        },
        i(e) {
          i || (_e(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[72](null), Ue(t, n);
        },
      }
    );
  }
  function Yr(e) {
    let t, i;
    const r = [At(e[41], "helperLine$")];
    let s = { $$slots: { default: [Qr] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new Yi({ props: s })),
      t.$on("SMUITextfieldHelperText:id", e[85]),
      t.$on("SMUITextfieldHelperText:mount", e[86]),
      t.$on("SMUITextfieldHelperText:unmount", e[87]),
      t.$on("SMUITextfieldCharacterCounter:mount", e[88]),
      t.$on("SMUITextfieldCharacterCounter:unmount", e[89]),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i = 1024 & n[1] ? Ne(r, [De(At(e[41], "helperLine$"))]) : {};
          268435456 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          i || (_e(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Qr(e) {
    let t;
    const n = e[51].helper,
      i = c(n, e, e[90], or);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 268435456 & r[2]) &&
          p(i, n, e, e[90], t ? d(n, e[90], r, sr) : f(e[90]), or);
      },
      i(e) {
        t || (_e(i, e), (t = !0));
      },
      o(e) {
        Se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Jr(e) {
    let t, n, i, r, s;
    const o = [Or, Lr],
      a = [];
    (t = (function (e, t) {
      return e[36] ? 0 : 1;
    })(e)),
      (n = a[t] = o[t](e));
    let l = e[42].helper && Yr(e);
    return {
      c() {
        n.c(), (i = R()), l && l.c(), (r = F());
      },
      m(e, n) {
        a[t].m(e, n), L(e, i, n), l && l.m(e, n), L(e, r, n), (s = !0);
      },
      p(e, t) {
        n.p(e, t),
          e[42].helper
            ? l
              ? (l.p(e, t), 2048 & t[1] && _e(l, 1))
              : ((l = Yr(e)), l.c(), _e(l, 1), l.m(r.parentNode, r))
            : l &&
              (Ae(),
              Se(l, 1, 1, () => {
                l = null;
              }),
              Ce());
      },
      i(e) {
        s || (_e(n), _e(l), (s = !0));
      },
      o(e) {
        Se(n), Se(l), (s = !1);
      },
      d(e) {
        a[t].d(e), e && O(i), l && l.d(e), e && O(r);
      },
    };
  }
  const Zr = ([e, t]) => `${e}: ${t};`,
    es = ([e, t]) => `${e}: ${t};`;
  function ts(e, t, i) {
    let r;
    const s = [
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
    let o = m(t, s),
      { $$slots: a = {}, $$scope: l } = t;
    const c = g(a),
      { applyPassive: u } = Je,
      d = xt(Z());
    let p = () => {};
    function f(e) {
      return e === p;
    }
    let { use: $ = [] } = t,
      { class: y = "" } = t,
      { style: v = "" } = t,
      { ripple: I = !0 } = t,
      { disabled: b = !1 } = t,
      { required: E = !1 } = t,
      { textarea: x = !1 } = t,
      { variant: A = x ? "outlined" : "standard" } = t,
      { noLabel: C = !1 } = t,
      { label: _ } = t,
      { type: S = "text" } = t,
      { value: T = o.input$emptyValueUndefined ? void 0 : p } = t,
      { files: L = p } = t;
    const O = !f(T) || !f(L);
    f(T) && (T = void 0), f(L) && (L = null);
    let { invalid: w = p } = t,
      { updateInvalid: M = f(w) } = t;
    f(w) && (w = !1);
    let N,
      D,
      R,
      F,
      k,
      U,
      H,
      P,
      B,
      { dirty: V = !1 } = t,
      { prefix: j } = t,
      { suffix: z } = t,
      { validateOnValueChange: G = M } = t,
      { useNativeValidation: W = M } = t,
      { withLeadingIcon: q = p } = t,
      { withTrailingIcon: K = p } = t,
      { input: X } = t,
      { floatingLabel: Y } = t,
      { lineRipple: Q } = t,
      { notchedOutline: J } = t,
      ne = {},
      ie = {},
      se = !1,
      oe = re("SMUI:addLayoutListener"),
      le = new Promise((e) => (k = e)),
      ce = T;
    function de(e) {
      var t;
      return e in ne
        ? null !== (t = ne[e]) && void 0 !== t
          ? t
          : null
        : ge().classList.contains(e);
    }
    function fe(e) {
      ne[e] || i(25, (ne[e] = !0), ne);
    }
    function he(e) {
      (e in ne && !ne[e]) || i(25, (ne[e] = !1), ne);
    }
    function me() {
      if (D) {
        const e = D.shouldFloat;
        D.notchOutline(e);
      }
    }
    function ge() {
      return N;
    }
    oe && (F = oe(me)),
      ee(() => {
        if (
          (i(
            49,
            (D = new Bn(
              {
                addClass: fe,
                removeClass: he,
                hasClass: de,
                registerTextFieldInteractionHandler: (e, t) =>
                  ge().addEventListener(e, t),
                deregisterTextFieldInteractionHandler: (e, t) =>
                  ge().removeEventListener(e, t),
                registerValidationAttributeChangeHandler: (e) => {
                  const t = new MutationObserver((t) => {
                      W &&
                        e(
                          ((e) =>
                            e.map((e) => e.attributeName).filter((e) => e))(t)
                        );
                    }),
                    n = { attributes: !0 };
                  return X && t.observe(X.getElement(), n), t;
                },
                deregisterValidationAttributeChangeHandler: (e) => {
                  e.disconnect();
                },
                getNativeInput: () => {
                  var e;
                  return null !== (e = null == X ? void 0 : X.getElement()) &&
                    void 0 !== e
                    ? e
                    : null;
                },
                setInputAttr: (e, t) => {
                  null == X || X.addAttr(e, t);
                },
                removeInputAttr: (e) => {
                  null == X || X.removeAttr(e);
                },
                isFocused: () =>
                  document.activeElement ===
                  (null == X ? void 0 : X.getElement()),
                registerInputInteractionHandler: (e, t) => {
                  null == X || X.getElement().addEventListener(e, t, u());
                },
                deregisterInputInteractionHandler: (e, t) => {
                  null == X || X.getElement().removeEventListener(e, t, u());
                },
                floatLabel: (e) => Y && Y.float(e),
                getLabelWidth: () => (Y ? Y.getWidth() : 0),
                hasLabel: () => !!Y,
                shakeLabel: (e) => Y && Y.shake(e),
                setLabelRequired: (e) => Y && Y.setRequired(e),
                activateLineRipple: () => Q && Q.activate(),
                deactivateLineRipple: () => Q && Q.deactivate(),
                setLineRippleTransformOrigin: (e) => Q && Q.setRippleCenter(e),
                closeOutline: () => J && J.closeNotch(),
                hasOutline: () => !!J,
                notchOutline: (e) => J && J.notch(e),
              },
              {
                get helperText() {
                  return P;
                },
                get characterCounter() {
                  return B;
                },
                get leadingIcon() {
                  return U;
                },
                get trailingIcon() {
                  return H;
                },
              }
            ))
          ),
          O)
        ) {
          if (null == X)
            throw new Error(
              "SMUI Textfield initialized without Input component."
            );
          D.init();
        } else
          (pe(), ue).then(() => {
            if (null == X)
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
      te(() => {
        F && F();
      });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(41, (o = m(t, s))),
          "use" in e && i(8, ($ = e.use)),
          "class" in e && i(9, (y = e.class)),
          "style" in e && i(10, (v = e.style)),
          "ripple" in e && i(11, (I = e.ripple)),
          "disabled" in e && i(12, (b = e.disabled)),
          "required" in e && i(13, (E = e.required)),
          "textarea" in e && i(14, (x = e.textarea)),
          "variant" in e && i(15, (A = e.variant)),
          "noLabel" in e && i(16, (C = e.noLabel)),
          "label" in e && i(17, (_ = e.label)),
          "type" in e && i(18, (S = e.type)),
          "value" in e && i(0, (T = e.value)),
          "files" in e && i(3, (L = e.files)),
          "invalid" in e && i(1, (w = e.invalid)),
          "updateInvalid" in e && i(19, (M = e.updateInvalid)),
          "dirty" in e && i(4, (V = e.dirty)),
          "prefix" in e && i(20, (j = e.prefix)),
          "suffix" in e && i(21, (z = e.suffix)),
          "validateOnValueChange" in e && i(43, (G = e.validateOnValueChange)),
          "useNativeValidation" in e && i(44, (W = e.useNativeValidation)),
          "withLeadingIcon" in e && i(22, (q = e.withLeadingIcon)),
          "withTrailingIcon" in e && i(23, (K = e.withTrailingIcon)),
          "input" in e && i(2, (X = e.input)),
          "floatingLabel" in e && i(5, (Y = e.floatingLabel)),
          "lineRipple" in e && i(6, (Q = e.lineRipple)),
          "notchedOutline" in e && i(7, (J = e.notchedOutline)),
          "$$scope" in e && i(90, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        if (
          (4 & e.$$.dirty[0] && i(33, (r = X && X.getElement())),
          (524290 & e.$$.dirty[0]) | (262144 & e.$$.dirty[1]) &&
            D &&
            D.isValid() !== !w &&
            (M ? i(1, (w = !D.isValid())) : D.setValid(!w)),
          266240 & e.$$.dirty[1] &&
            D &&
            D.getValidateOnValueChange() !== G &&
            D.setValidateOnValueChange(!f(G) && G),
          270336 & e.$$.dirty[1] && D && D.setUseNativeValidation(!!f(W) || W),
          (4096 & e.$$.dirty[0]) | (262144 & e.$$.dirty[1]) &&
            D &&
            D.setDisabled(b),
          (1 & e.$$.dirty[0]) | (786432 & e.$$.dirty[1]) && D && O && ce !== T)
        ) {
          i(50, (ce = T));
          const e = `${T}`;
          D.getValue() !== e && D.setValue(e);
        }
      }),
      [
        T,
        w,
        X,
        L,
        V,
        Y,
        Q,
        J,
        $,
        y,
        v,
        I,
        b,
        E,
        x,
        A,
        C,
        _,
        S,
        M,
        j,
        z,
        q,
        K,
        N,
        ne,
        ie,
        R,
        se,
        U,
        H,
        P,
        B,
        r,
        d,
        f,
        O,
        le,
        fe,
        he,
        function (e, t) {
          ie[e] != t &&
            ("" === t || null == t
              ? (delete ie[e], i(26, ie))
              : i(26, (ie[e] = t), ie));
        },
        o,
        c,
        G,
        W,
        function () {
          null == X || X.focus();
        },
        function () {
          null == X || X.blur();
        },
        me,
        ge,
        D,
        ce,
        a,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (Y = e), i(5, Y);
          });
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (Y = e), i(5, Y);
          });
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (J = e), i(7, J);
          });
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (X = e), i(2, X);
          });
        },
        function (e) {
          (T = e), i(0, T);
        },
        function (e) {
          (V = e), i(4, V);
        },
        function (e) {
          (w = e), i(1, w), i(49, D), i(19, M);
        },
        () => i(28, (se = !1)),
        () => i(28, (se = !0)),
        (e) => vt(N, "blur", e),
        (e) => vt(N, "focus", e),
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (X = e), i(2, X);
          });
        },
        function (e) {
          (T = e), i(0, T);
        },
        function (e) {
          (L = e), i(3, L);
        },
        function (e) {
          (V = e), i(4, V);
        },
        function (e) {
          (w = e), i(1, w), i(49, D), i(19, M);
        },
        () => i(28, (se = !1)),
        () => i(28, (se = !0)),
        (e) => vt(N, "blur", e),
        (e) => vt(N, "focus", e),
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (Q = e), i(6, Q);
          });
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (N = e), i(24, N);
          });
        },
        (e) => i(29, (U = e.detail)),
        () => i(29, (U = void 0)),
        (e) => i(30, (H = e.detail)),
        () => i(30, (H = void 0)),
        (e) => i(32, (B = e.detail)),
        () => i(32, (B = void 0)),
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (N = e), i(24, N);
          });
        },
        (e) => i(29, (U = e.detail)),
        () => i(29, (U = void 0)),
        (e) => i(30, (H = e.detail)),
        () => i(30, (H = void 0)),
        (e) => i(27, (R = e.detail)),
        (e) => i(31, (P = e.detail)),
        () => {
          i(27, (R = void 0)), i(31, (P = void 0));
        },
        (e) => i(32, (B = e.detail)),
        () => i(32, (B = void 0)),
        l,
      ]
    );
  }
  class ns extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          ts,
          Jr,
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
   */ var is = {
      ICON_BUTTON_ON: "mdc-icon-button--on",
      ROOT: "mdc-icon-button",
    },
    rs = {
      ARIA_LABEL: "aria-label",
      ARIA_PRESSED: "aria-pressed",
      DATA_ARIA_LABEL_OFF: "data-aria-label-off",
      DATA_ARIA_LABEL_ON: "data-aria-label-on",
      CHANGE_EVENT: "MDCIconButtonToggle:change",
    },
    ss = (function (e) {
      function t(n) {
        var i = e.call(this, We(We({}, t.defaultAdapter), n)) || this;
        return (i.hasToggledAriaLabel = !1), i;
      }
      return (
        Ge(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return is;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return rs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
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
        (t.prototype.init = function () {
          var e = this.adapter.getAttr(rs.DATA_ARIA_LABEL_ON),
            t = this.adapter.getAttr(rs.DATA_ARIA_LABEL_OFF);
          if (e && t) {
            if (null !== this.adapter.getAttr(rs.ARIA_PRESSED))
              throw new Error(
                "MDCIconButtonToggleFoundation: Button should not set `aria-pressed` if it has a toggled aria label."
              );
            this.hasToggledAriaLabel = !0;
          } else this.adapter.setAttr(rs.ARIA_PRESSED, String(this.isOn()));
        }),
        (t.prototype.handleClick = function () {
          this.toggle(), this.adapter.notifyChange({ isOn: this.isOn() });
        }),
        (t.prototype.isOn = function () {
          return this.adapter.hasClass(is.ICON_BUTTON_ON);
        }),
        (t.prototype.toggle = function (e) {
          if (
            (void 0 === e && (e = !this.isOn()),
            e
              ? this.adapter.addClass(is.ICON_BUTTON_ON)
              : this.adapter.removeClass(is.ICON_BUTTON_ON),
            this.hasToggledAriaLabel)
          ) {
            var t = e
              ? this.adapter.getAttr(rs.DATA_ARIA_LABEL_ON)
              : this.adapter.getAttr(rs.DATA_ARIA_LABEL_OFF);
            this.adapter.setAttr(rs.ARIA_LABEL, t || "");
          } else this.adapter.setAttr(rs.ARIA_PRESSED, "" + e);
        }),
        t
      );
    })(Qe);
  function os(e) {
    let t;
    return {
      c() {
        (t = M("div")), U(t, "class", "mdc-icon-button__touch");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function as(e) {
    let t, n, i, r;
    const s = e[32].default,
      o = c(s, e, e[36], null);
    let a = e[8] && os();
    return {
      c() {
        (t = M("div")),
          (n = R()),
          o && o.c(),
          a && a.c(),
          (i = F()),
          U(t, "class", "mdc-icon-button__ripple");
      },
      m(e, s) {
        L(e, t, s),
          L(e, n, s),
          o && o.m(e, s),
          a && a.m(e, s),
          L(e, i, s),
          (r = !0);
      },
      p(e, t) {
        o &&
          o.p &&
          (!r || 32 & t[1]) &&
          p(o, s, e, e[36], r ? d(s, e[36], t, null) : f(e[36]), null),
          e[8]
            ? a || ((a = os()), a.c(), a.m(i.parentNode, i))
            : a && (a.d(1), (a = null));
      },
      i(e) {
        r || (_e(o, e), (r = !0));
      },
      o(e) {
        Se(o, e), (r = !1);
      },
      d(e) {
        e && O(t), e && O(n), o && o.d(e), a && a.d(e), e && O(i);
      },
    };
  }
  function ls(e) {
    let t, i, r;
    const s = [
      {
        use: [
          [
            Ni,
            {
              ripple: e[4],
              unbounded: !0,
              color: e[5],
              disabled: !!e[28].disabled,
              addClass: e[25],
              removeClass: e[26],
              addStyle: e[27],
            },
          ],
          e[21],
          ...e[1],
        ],
      },
      {
        class: yt({
          [e[2]]: !0,
          "mdc-icon-button": !0,
          "mdc-icon-button--on": !e[22](e[0]) && e[0],
          "mdc-icon-button--touch": e[8],
          "mdc-icon-button--display-flex": e[9],
          "smui-icon-button--size-button": "button" === e[10],
          "mdc-icon-button--reduced-size":
            "mini" === e[10] || "button" === e[10],
          "mdc-card__action": "card:action" === e[23],
          "mdc-card__action--icon": "card:action" === e[23],
          "mdc-top-app-bar__navigation-icon":
            "top-app-bar:navigation" === e[23],
          "mdc-top-app-bar__action-item": "top-app-bar:action" === e[23],
          "mdc-snackbar__dismiss": "snackbar:actions" === e[23],
          "mdc-data-table__pagination-button":
            "data-table:pagination" === e[23],
          "mdc-data-table__sort-icon-button":
            "data-table:sortable-header-cell" === e[23],
          "mdc-dialog__close": "dialog:header" === e[23] && "close" === e[12],
          ...e[17],
        }),
      },
      { style: Object.entries(e[18]).map(cs).concat([e[3]]).join(" ") },
      { "aria-pressed": e[22](e[0]) ? null : e[0] ? "true" : "false" },
      { "aria-label": e[0] ? e[6] : e[7] },
      { "data-aria-label-on": e[6] },
      { "data-aria-label-off": e[7] },
      { "aria-describedby": e[24] },
      { href: e[11] },
      e[20],
      e[19],
      e[28],
    ];
    var o = e[13];
    function a(e) {
      let t = { $$slots: { default: [as] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) t = n(t, s[e]);
      return { props: t };
    }
    return (
      o &&
        ((t = new o(a(e))),
        e[33](t),
        t.$on("click", e[34]),
        t.$on("click", e[35])),
      {
        c() {
          t && Fe(t.$$.fragment), (i = F());
        },
        m(e, n) {
          t && ke(t, e, n), L(e, i, n), (r = !0);
        },
        p(e, n) {
          const r =
            536748031 & n[0]
              ? Ne(s, [
                  505413682 & n[0] && {
                    use: [
                      [
                        Ni,
                        {
                          ripple: e[4],
                          unbounded: !0,
                          color: e[5],
                          disabled: !!e[28].disabled,
                          addClass: e[25],
                          removeClass: e[26],
                          addStyle: e[27],
                        },
                      ],
                      e[21],
                      ...e[1],
                    ],
                  },
                  12719877 & n[0] && {
                    class: yt({
                      [e[2]]: !0,
                      "mdc-icon-button": !0,
                      "mdc-icon-button--on": !e[22](e[0]) && e[0],
                      "mdc-icon-button--touch": e[8],
                      "mdc-icon-button--display-flex": e[9],
                      "smui-icon-button--size-button": "button" === e[10],
                      "mdc-icon-button--reduced-size":
                        "mini" === e[10] || "button" === e[10],
                      "mdc-card__action": "card:action" === e[23],
                      "mdc-card__action--icon": "card:action" === e[23],
                      "mdc-top-app-bar__navigation-icon":
                        "top-app-bar:navigation" === e[23],
                      "mdc-top-app-bar__action-item":
                        "top-app-bar:action" === e[23],
                      "mdc-snackbar__dismiss": "snackbar:actions" === e[23],
                      "mdc-data-table__pagination-button":
                        "data-table:pagination" === e[23],
                      "mdc-data-table__sort-icon-button":
                        "data-table:sortable-header-cell" === e[23],
                      "mdc-dialog__close":
                        "dialog:header" === e[23] && "close" === e[12],
                      ...e[17],
                    }),
                  },
                  262152 & n[0] && {
                    style: Object.entries(e[18])
                      .map(cs)
                      .concat([e[3]])
                      .join(" "),
                  },
                  4194305 & n[0] && {
                    "aria-pressed": e[22](e[0])
                      ? null
                      : e[0]
                      ? "true"
                      : "false",
                  },
                  193 & n[0] && { "aria-label": e[0] ? e[6] : e[7] },
                  64 & n[0] && { "data-aria-label-on": e[6] },
                  128 & n[0] && { "data-aria-label-off": e[7] },
                  16777216 & n[0] && { "aria-describedby": e[24] },
                  2048 & n[0] && { href: e[11] },
                  1048576 & n[0] && De(e[20]),
                  524288 & n[0] && De(e[19]),
                  268435456 & n[0] && De(e[28]),
                ])
              : {};
          if (
            ((256 & n[0]) | (32 & n[1]) && (r.$$scope = { dirty: n, ctx: e }),
            o !== (o = e[13]))
          ) {
            if (t) {
              Ae();
              const e = t;
              Se(e.$$.fragment, 1, 0, () => {
                Ue(e, 1);
              }),
                Ce();
            }
            o
              ? ((t = new o(a(e))),
                e[33](t),
                t.$on("click", e[34]),
                t.$on("click", e[35]),
                Fe(t.$$.fragment),
                _e(t.$$.fragment, 1),
                ke(t, i.parentNode, i))
              : (t = null);
          } else o && t.$set(r);
        },
        i(e) {
          r || (t && _e(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          t && Se(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[33](null), n && O(i), t && Ue(t, n);
        },
      }
    );
  }
  const cs = ([e, t]) => `${e}: ${t};`;
  function us(e, t, i) {
    let r;
    const s = [
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
    let o = m(t, s),
      { $$slots: a = {}, $$scope: l } = t;
    const c = xt(Z());
    let u = () => {};
    function d(e) {
      return e === u;
    }
    let p,
      f,
      { use: g = [] } = t,
      { class: $ = "" } = t,
      { style: y = "" } = t,
      { ripple: v = !0 } = t,
      { color: I } = t,
      { toggle: b = !1 } = t,
      { pressed: E = u } = t,
      { ariaLabelOn: x } = t,
      { ariaLabelOff: A } = t,
      { touch: C = !1 } = t,
      { displayFlex: _ = !0 } = t,
      { size: S = "normal" } = t,
      { href: T } = t,
      { action: L } = t,
      O = {},
      w = {},
      M = {},
      N = re("SMUI:icon-button:context"),
      D = re("SMUI:icon-button:aria-describedby"),
      { component: R = null == T ? ln : an } = t,
      F = o.disabled;
    ie("SMUI:icon:context", "icon-button");
    let k = null;
    function U(e) {
      return e in O ? O[e] : j().classList.contains(e);
    }
    function H(e) {
      O[e] || i(17, (O[e] = !0), O);
    }
    function P(e) {
      (e in O && !O[e]) || i(17, (O[e] = !1), O);
    }
    function B(e) {
      var t;
      return e in M
        ? null !== (t = M[e]) && void 0 !== t
          ? t
          : null
        : j().getAttribute(e);
    }
    function V(e, t) {
      M[e] !== t && i(19, (M[e] = t), M);
    }
    function j() {
      return p.getElement();
    }
    te(() => {
      f && f.destroy();
    });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(28, (o = m(t, s))),
          "use" in e && i(1, (g = e.use)),
          "class" in e && i(2, ($ = e.class)),
          "style" in e && i(3, (y = e.style)),
          "ripple" in e && i(4, (v = e.ripple)),
          "color" in e && i(5, (I = e.color)),
          "toggle" in e && i(29, (b = e.toggle)),
          "pressed" in e && i(0, (E = e.pressed)),
          "ariaLabelOn" in e && i(6, (x = e.ariaLabelOn)),
          "ariaLabelOff" in e && i(7, (A = e.ariaLabelOff)),
          "touch" in e && i(8, (C = e.touch)),
          "displayFlex" in e && i(9, (_ = e.displayFlex)),
          "size" in e && i(10, (S = e.size)),
          "href" in e && i(11, (T = e.href)),
          "action" in e && i(12, (L = e.action)),
          "component" in e && i(13, (R = e.component)),
          "$$scope" in e && i(36, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        if (
          (4096 & e.$$.dirty[0] &&
            i(
              20,
              (r = (() => {
                if ("data-table:pagination" !== N)
                  return "dialog:header" === N
                    ? { "data-mdc-dialog-action": L }
                    : { action: L };
                switch (L) {
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
          F !== o.disabled)
        ) {
          const e = j();
          "blur" in e && e.blur(), i(30, (F = o.disabled));
        }
        (536969216 & e.$$.dirty[0]) | (1 & e.$$.dirty[1]) &&
          p &&
          j() &&
          b !== k &&
          (b && !f
            ? (i(
                16,
                (f = new ss({
                  addClass: H,
                  hasClass: U,
                  notifyChange: (e) => {
                    !(function (e) {
                      i(0, (E = e.isOn));
                    })(e),
                      vt(j(), "SMUIIconButtonToggle:change", e, void 0, !0);
                  },
                  removeClass: P,
                  getAttr: B,
                  setAttr: V,
                }))
              ),
              f.init())
            : !b &&
              f &&
              (f.destroy(),
              i(16, (f = void 0)),
              i(17, (O = {})),
              i(19, (M = {}))),
          i(31, (k = b))),
          65537 & e.$$.dirty[0] && f && !d(E) && f.isOn() !== E && f.toggle(E);
      }),
      [
        E,
        g,
        $,
        y,
        v,
        I,
        x,
        A,
        C,
        _,
        S,
        T,
        L,
        R,
        j,
        p,
        f,
        O,
        w,
        M,
        r,
        c,
        d,
        N,
        D,
        H,
        P,
        function (e, t) {
          w[e] != t &&
            ("" === t || null == t
              ? (delete w[e], i(18, w))
              : i(18, (w[e] = t), w));
        },
        o,
        b,
        F,
        k,
        a,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (p = e), i(15, p);
          });
        },
        () => f && f.handleClick(),
        () =>
          "top-app-bar:navigation" === N &&
          vt(j(), "SMUITopAppBarIconButton:nav"),
        l,
      ]
    );
  }
  class ds extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          us,
          ls,
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
  function ps(e) {
    const t = e - 1;
    return t * t * t + 1;
  }
  function fs(e, { delay: n = 0, duration: i = 400, easing: r = t } = {}) {
    const s = +getComputedStyle(e).opacity;
    return {
      delay: n,
      duration: i,
      easing: r,
      css: (e) => "opacity: " + e * s,
    };
  }
  function hs(
    e,
    {
      delay: t = 0,
      duration: n = 400,
      easing: i = ps,
      x: r = 0,
      y: s = 0,
      opacity: o = 0,
    } = {}
  ) {
    const a = getComputedStyle(e),
      l = +a.opacity,
      c = "none" === a.transform ? "" : a.transform,
      u = l * (1 - o);
    return {
      delay: t,
      duration: n,
      easing: i,
      css: (e, t) =>
        `\n\t\t\ttransform: ${c} translate(${(1 - e) * r}px, ${
          (1 - e) * s
        }px);\n\t\t\topacity: ${l - u * t}`,
    };
  }
  function ms(e, { from: t, to: n }, i = {}) {
    const r = getComputedStyle(e),
      s = "none" === r.transform ? "" : r.transform,
      [a, l] = r.transformOrigin.split(" ").map(parseFloat),
      c = t.left + (t.width * a) / n.width - (n.left + a),
      u = t.top + (t.height * l) / n.height - (n.top + l),
      {
        delay: d = 0,
        duration: p = (e) => 120 * Math.sqrt(e),
        easing: f = ps,
      } = i;
    return {
      delay: d,
      duration: o(p) ? p(Math.sqrt(c * c + u * u)) : p,
      easing: f,
      css: (e, i) => {
        const r = i * c,
          o = i * u,
          a = e + (i * t.width) / n.width,
          l = e + (i * t.height) / n.height;
        return `transform: ${s} translate(${r}px, ${o}px) scale(${a}, ${l});`;
      },
    };
  }
  const gs = {
      duration: 4e3,
      initial: 1,
      next: 0,
      pausable: !1,
      dismissable: !0,
      reversed: !1,
      intro: { x: 256 },
    },
    $s = (() => {
      const { subscribe: e, update: t } = $t([]);
      let n = 0;
      const i = {},
        r = (e) => e instanceof Object;
      return {
        subscribe: e,
        push: (e, s = {}) => {
          const o = { target: "default", ...(r(e) ? e : { ...s, msg: e }) },
            a = i[o.target] || {},
            l = {
              ...gs,
              ...a,
              ...o,
              theme: { ...a.theme, ...o.theme },
              classes: [...(a.classes || []), ...(o.classes || [])],
              id: ++n,
            };
          return t((e) => (l.reversed ? [...e, l] : [l, ...e])), n;
        },
        pop: (e) => {
          t((t) => {
            if (!t.length || 0 === e) return [];
            if (r(e)) return t.filter((t) => e(t));
            const n = e || Math.max(...t.map((e) => e.id));
            return t.filter((e) => e.id !== n);
          });
        },
        set: (e, n = {}) => {
          const i = r(e) ? { ...e } : { ...n, id: e };
          t((e) => {
            const t = e.findIndex((e) => e.id === i.id);
            return t > -1 && (e[t] = { ...e[t], ...i }), e;
          });
        },
        _init: (e = "default", t = {}) => ((i[e] = t), i),
      };
    })();
  function ys(e) {
    return "[object Date]" === Object.prototype.toString.call(e);
  }
  function vs(e, t) {
    if (e === t || e != e) return () => e;
    const n = typeof e;
    if (n !== typeof t || Array.isArray(e) !== Array.isArray(t))
      throw new Error("Cannot interpolate values of different type");
    if (Array.isArray(e)) {
      const n = t.map((t, n) => vs(e[n], t));
      return (e) => n.map((t) => t(e));
    }
    if ("object" === n) {
      if (!e || !t) throw new Error("Object cannot be null");
      if (ys(e) && ys(t)) {
        e = e.getTime();
        const n = (t = t.getTime()) - e;
        return (t) => new Date(e + t * n);
      }
      const n = Object.keys(t),
        i = {};
      return (
        n.forEach((n) => {
          i[n] = vs(e[n], t[n]);
        }),
        (e) => {
          const t = {};
          return (
            n.forEach((n) => {
              t[n] = i[n](e);
            }),
            t
          );
        }
      );
    }
    if ("number" === n) {
      const n = t - e;
      return (t) => e + t * n;
    }
    throw new Error(`Cannot interpolate ${n} values`);
  }
  function Is(t) {
    let n,
      i,
      r = t[0].msg + "";
    return {
      c() {
        (n = new G(!1)), (i = F()), (n.a = i);
      },
      m(e, t) {
        n.m(r, e, t), L(e, i, t);
      },
      p(e, t) {
        1 & t && r !== (r = e[0].msg + "") && n.p(r);
      },
      i: e,
      o: e,
      d(e) {
        e && O(i), e && n.d();
      },
    };
  }
  function bs(e) {
    let t, i, r;
    const s = [e[6]()];
    var o = e[0].component.src;
    function a(e) {
      let t = {};
      for (let e = 0; e < s.length; e += 1) t = n(t, s[e]);
      return { props: t };
    }
    return (
      o && (t = new o(a())),
      {
        c() {
          t && Fe(t.$$.fragment), (i = F());
        },
        m(e, n) {
          t && ke(t, e, n), L(e, i, n), (r = !0);
        },
        p(e, n) {
          const r = 64 & n ? Ne(s, [De(e[6]())]) : {};
          if (o !== (o = e[0].component.src)) {
            if (t) {
              Ae();
              const e = t;
              Se(e.$$.fragment, 1, 0, () => {
                Ue(e, 1);
              }),
                Ce();
            }
            o
              ? ((t = new o(a())),
                Fe(t.$$.fragment),
                _e(t.$$.fragment, 1),
                ke(t, i.parentNode, i))
              : (t = null);
          } else o && t.$set(r);
        },
        i(e) {
          r || (t && _e(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          t && Se(t.$$.fragment, e), (r = !1);
        },
        d(e) {
          e && O(i), t && Ue(t, e);
        },
      }
    );
  }
  function Es(t) {
    let n, i, r;
    return {
      c() {
        (n = M("div")),
          (n.textContent = "✕"),
          U(n, "class", "_toastBtn pe svelte-5er0t9"),
          U(n, "role", "button"),
          U(n, "tabindex", "-1");
      },
      m(e, s) {
        L(e, n, s), i || ((r = k(n, "click", t[3])), (i = !0));
      },
      p: e,
      d(e) {
        e && O(n), (i = !1), r();
      },
    };
  }
  function xs(e) {
    let t, n, i, r, o, a, l, c, u, d;
    const p = [bs, Is],
      f = [];
    function h(e, t) {
      return e[0].component ? 0 : 1;
    }
    (i = h(e)), (r = f[i] = p[i](e));
    let m = e[0].dismissable && Es(e);
    return {
      c() {
        (t = M("div")),
          (n = M("div")),
          r.c(),
          (o = R()),
          m && m.c(),
          (a = R()),
          (l = M("progress")),
          U(n, "role", "status"),
          U(n, "class", "_toastMsg svelte-5er0t9"),
          j(n, "pe", e[0].component),
          U(l, "class", "_toastBar svelte-5er0t9"),
          (l.value = e[1]),
          U(t, "class", "_toastItem svelte-5er0t9"),
          j(t, "pe", e[0].pausable);
      },
      m(r, s) {
        L(r, t, s),
          _(t, n),
          f[i].m(n, null),
          _(t, o),
          m && m.m(t, null),
          _(t, a),
          _(t, l),
          (c = !0),
          u ||
            ((d = [k(t, "mouseenter", e[4]), k(t, "mouseleave", e[5])]),
            (u = !0));
      },
      p(e, [s]) {
        let o = i;
        (i = h(e)),
          i === o
            ? f[i].p(e, s)
            : (Ae(),
              Se(f[o], 1, 1, () => {
                f[o] = null;
              }),
              Ce(),
              (r = f[i]),
              r ? r.p(e, s) : ((r = f[i] = p[i](e)), r.c()),
              _e(r, 1),
              r.m(n, null)),
          1 & s && j(n, "pe", e[0].component),
          e[0].dismissable
            ? m
              ? m.p(e, s)
              : ((m = Es(e)), m.c(), m.m(t, a))
            : m && (m.d(1), (m = null)),
          (!c || 2 & s) && (l.value = e[1]),
          1 & s && j(t, "pe", e[0].pausable);
      },
      i(e) {
        c || (_e(r), (c = !0));
      },
      o(e) {
        Se(r), (c = !1);
      },
      d(e) {
        e && O(t), f[i].d(), m && m.d(), (u = !1), s(d);
      },
    };
  }
  function As(e, i, r) {
    let s,
      { item: o } = i;
    const a = (function (e, i = {}) {
      const r = $t(e);
      let s,
        o = e;
      function a(a, l) {
        if (null == e) return r.set((e = a)), Promise.resolve();
        o = a;
        let c = s,
          u = !1,
          {
            delay: d = 0,
            duration: p = 400,
            easing: f = t,
            interpolate: h = vs,
          } = n(n({}, i), l);
        if (0 === p)
          return (
            c && (c.abort(), (c = null)), r.set((e = o)), Promise.resolve()
          );
        const m = b() + d;
        let g;
        return (
          (s = C((t) => {
            if (t < m) return !0;
            u ||
              ((g = h(e, a)),
              "function" == typeof p && (p = p(e, a)),
              (u = !0)),
              c && (c.abort(), (c = null));
            const n = t - m;
            return n > p
              ? (r.set((e = a)), !1)
              : (r.set((e = g(f(n / p)))), !0);
          })),
          s.promise
        );
      }
      return {
        set: a,
        update: (t, n) => a(t(o, e), n),
        subscribe: r.subscribe,
      };
    })(o.initial, { duration: o.duration, easing: t });
    l(e, a, (e) => r(1, (s = e)));
    const c = () => $s.pop(o.id),
      u = () => {
        (1 !== s && 0 !== s) || c();
      };
    let d = o.initial,
      p = d,
      f = !1;
    return (
      te(() => {
        "function" == typeof o.onpop && o.onpop(o.id);
      }),
      (e.$$set = (e) => {
        "item" in e && r(0, (o = e.item));
      }),
      (e.$$.update = () => {
        1 & e.$$.dirty &&
          void 0 !== o.progress &&
          r(0, (o.next = o.progress), o),
          131 & e.$$.dirty &&
            d !== o.next &&
            (r(7, (d = o.next)), (p = s), (f = !1), a.set(d).then(u));
      }),
      [
        o,
        s,
        a,
        c,
        () => {
          o.pausable && !f && s !== d && (a.set(s, { duration: 0 }), (f = !0));
        },
        () => {
          if (f) {
            const e = o.duration,
              t = e - e * ((s - p) / (d - p));
            a.set(d, { duration: t }).then(u), (f = !1);
          }
        },
        () => {
          const { props: e = {}, sendIdTo: t } = o.component;
          return t && (e[t] = o.id), e;
        },
        d,
      ]
    );
  }
  class Cs extends Pe {
    constructor(e) {
      super(), He(this, e, As, xs, a, { item: 0 });
    }
  }
  function _s(e, t, n) {
    const i = e.slice();
    return (i[5] = t[n]), i;
  }
  function Ss(n, i) {
    let r,
      a,
      l,
      c,
      u,
      d,
      p,
      f,
      h,
      m = e;
    return (
      (a = new Cs({ props: { item: i[5] } })),
      {
        key: n,
        first: null,
        c() {
          (r = M("li")),
            Fe(a.$$.fragment),
            (l = R()),
            U(r, "class", (c = $(i[5].classes.join(" ")) + " svelte-yh90az")),
            U(r, "style", (u = i[1](i[5].theme))),
            (this.first = r);
        },
        m(e, t) {
          L(e, r, t), ke(a, r, null), _(r, l), (h = !0);
        },
        p(e, t) {
          i = e;
          const n = {};
          1 & t && (n.item = i[5]),
            a.$set(n),
            (!h ||
              (1 & t &&
                c !== (c = $(i[5].classes.join(" ")) + " svelte-yh90az"))) &&
              U(r, "class", c),
            (!h || (1 & t && u !== (u = i[1](i[5].theme)))) && U(r, "style", u);
        },
        r() {
          f = r.getBoundingClientRect();
        },
        f() {
          !(function (e) {
            const t = getComputedStyle(e);
            if ("absolute" !== t.position && "fixed" !== t.position) {
              const { width: n, height: i } = t,
                r = e.getBoundingClientRect();
              (e.style.position = "absolute"),
                (e.style.width = n),
                (e.style.height = i),
                Q(e, r);
            }
          })(r),
            m(),
            Q(r, f);
        },
        a() {
          m(),
            (m = (function (n, i, r, s) {
              if (!i) return e;
              const o = n.getBoundingClientRect();
              if (
                i.left === o.left &&
                i.right === o.right &&
                i.top === o.top &&
                i.bottom === o.bottom
              )
                return e;
              const {
                delay: a = 0,
                duration: l = 300,
                easing: c = t,
                start: u = b() + a,
                end: d = u + l,
                tick: p = e,
                css: f,
              } = r(n, { from: i, to: o }, s);
              let h,
                m = !0,
                g = !1;
              function $() {
                f && Y(n, h), (m = !1);
              }
              return (
                C((e) => {
                  if (
                    (!g && e >= u && (g = !0),
                    g && e >= d && (p(1, 0), $()),
                    !m)
                  )
                    return !1;
                  if (g) {
                    const t = 0 + 1 * c((e - u) / l);
                    p(t, 1 - t);
                  }
                  return !0;
                }),
                f && (h = X(n, 0, 1, l, a, c, f)),
                a || (g = !0),
                p(0, 1),
                $
              );
            })(r, f, ms, { duration: 200 }));
        },
        i(n) {
          h ||
            (_e(a.$$.fragment, n),
            fe(() => {
              p && p.end(1),
                (d = (function (n, i, r) {
                  let s,
                    a,
                    l = i(n, r),
                    c = !1,
                    u = 0;
                  function d() {
                    s && Y(n, s);
                  }
                  function p() {
                    const {
                      delay: i = 0,
                      duration: r = 300,
                      easing: o = t,
                      tick: p = e,
                      css: f,
                    } = l || Te;
                    f && (s = X(n, 0, 1, r, i, o, f, u++)), p(0, 1);
                    const h = b() + i,
                      m = h + r;
                    a && a.abort(),
                      (c = !0),
                      fe(() => be(n, !0, "start")),
                      (a = C((e) => {
                        if (c) {
                          if (e >= m)
                            return p(1, 0), be(n, !0, "end"), d(), (c = !1);
                          if (e >= h) {
                            const t = o((e - h) / r);
                            p(t, 1 - t);
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
                        Y(n),
                        o(l) ? ((l = l()), Ie().then(p)) : p());
                    },
                    invalidate() {
                      f = !1;
                    },
                    end() {
                      c && (d(), (c = !1));
                    },
                  };
                })(r, hs, i[5].intro)),
                d.start();
            }),
            (h = !0));
        },
        o(n) {
          Se(a.$$.fragment, n),
            d && d.invalidate(),
            (p = (function (n, i, r) {
              let a,
                l = i(n, r),
                c = !0;
              const u = xe;
              function d() {
                const {
                  delay: i = 0,
                  duration: r = 300,
                  easing: o = t,
                  tick: d = e,
                  css: p,
                } = l || Te;
                p && (a = X(n, 1, 0, r, i, o, p));
                const f = b() + i,
                  h = f + r;
                fe(() => be(n, !1, "start")),
                  C((e) => {
                    if (c) {
                      if (e >= h)
                        return d(0, 1), be(n, !1, "end"), --u.r || s(u.c), !1;
                      if (e >= f) {
                        const t = o((e - f) / r);
                        d(1 - t, t);
                      }
                    }
                    return c;
                  });
              }
              return (
                (u.r += 1),
                o(l)
                  ? Ie().then(() => {
                      (l = l()), d();
                    })
                  : d(),
                {
                  end(e) {
                    e && l.tick && l.tick(1, 0), c && (a && Y(n, a), (c = !1));
                  },
                }
              );
            })(r, fs, {})),
            (h = !1);
        },
        d(e) {
          e && O(r), Ue(a), e && p && p.end();
        },
      }
    );
  }
  function Ts(e) {
    let t,
      n,
      i = [],
      r = new Map(),
      s = e[0];
    const o = (e) => e[5].id;
    for (let t = 0; t < s.length; t += 1) {
      let n = _s(e, s, t),
        a = o(n);
      r.set(a, (i[t] = Ss(a, n)));
    }
    return {
      c() {
        t = M("ul");
        for (let e = 0; e < i.length; e += 1) i[e].c();
        U(t, "class", "_toastContainer svelte-yh90az");
      },
      m(e, r) {
        L(e, t, r);
        for (let e = 0; e < i.length; e += 1) i[e].m(t, null);
        n = !0;
      },
      p(e, [n]) {
        if (3 & n) {
          (s = e[0]), Ae();
          for (let e = 0; e < i.length; e += 1) i[e].r();
          i = Me(i, n, o, 1, e, s, r, t, we, Ss, null, _s);
          for (let e = 0; e < i.length; e += 1) i[e].a();
          Ce();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < s.length; e += 1) _e(i[e]);
          n = !0;
        }
      },
      o(e) {
        for (let e = 0; e < i.length; e += 1) Se(i[e]);
        n = !1;
      },
      d(e) {
        e && O(t);
        for (let e = 0; e < i.length; e += 1) i[e].d();
      },
    };
  }
  function Ls(e, t, n) {
    let i;
    l(e, $s, (e) => n(4, (i = e)));
    let r,
      { options: s = {} } = t,
      { target: o = "default" } = t;
    return (
      (e.$$set = (e) => {
        "options" in e && n(2, (s = e.options)),
          "target" in e && n(3, (o = e.target));
      }),
      (e.$$.update = () => {
        12 & e.$$.dirty && $s._init(o, s),
          24 & e.$$.dirty && n(0, (r = i.filter((e) => e.target === o)));
      }),
      [
        r,
        (e) => Object.keys(e).reduce((t, n) => `${t}${n}:${e[n]};`, ""),
        s,
        o,
        i,
      ]
    );
  }
  class Os extends Pe {
    constructor(e) {
      super(), He(this, e, Ls, Ts, a, { options: 2, target: 3 });
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
   */ var ws,
    Ms,
    Ns = {
      LIST_ITEM_ACTIVATED_CLASS: "mdc-list-item--activated",
      LIST_ITEM_CLASS: "mdc-list-item",
      LIST_ITEM_DISABLED_CLASS: "mdc-list-item--disabled",
      LIST_ITEM_SELECTED_CLASS: "mdc-list-item--selected",
      LIST_ITEM_TEXT_CLASS: "mdc-list-item__text",
      LIST_ITEM_PRIMARY_TEXT_CLASS: "mdc-list-item__primary-text",
      ROOT: "mdc-list",
    };
  ((ws = {})["" + Ns.LIST_ITEM_ACTIVATED_CLASS] = "mdc-list-item--activated"),
    (ws["" + Ns.LIST_ITEM_CLASS] = "mdc-list-item"),
    (ws["" + Ns.LIST_ITEM_DISABLED_CLASS] = "mdc-list-item--disabled"),
    (ws["" + Ns.LIST_ITEM_SELECTED_CLASS] = "mdc-list-item--selected"),
    (ws["" + Ns.LIST_ITEM_PRIMARY_TEXT_CLASS] = "mdc-list-item__primary-text"),
    (ws["" + Ns.ROOT] = "mdc-list");
  var Ds =
      (((Ms = {})["" + Ns.LIST_ITEM_ACTIVATED_CLASS] =
        "mdc-deprecated-list-item--activated"),
      (Ms["" + Ns.LIST_ITEM_CLASS] = "mdc-deprecated-list-item"),
      (Ms["" + Ns.LIST_ITEM_DISABLED_CLASS] =
        "mdc-deprecated-list-item--disabled"),
      (Ms["" + Ns.LIST_ITEM_SELECTED_CLASS] =
        "mdc-deprecated-list-item--selected"),
      (Ms["" + Ns.LIST_ITEM_TEXT_CLASS] = "mdc-deprecated-list-item__text"),
      (Ms["" + Ns.LIST_ITEM_PRIMARY_TEXT_CLASS] =
        "mdc-deprecated-list-item__primary-text"),
      (Ms["" + Ns.ROOT] = "mdc-deprecated-list"),
      Ms),
    Rs = {
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
        Ns.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        Ns.LIST_ITEM_CLASS +
        " a,\n    ." +
        Ds[Ns.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        Ds[Ns.LIST_ITEM_CLASS] +
        " a\n  ",
      DEPRECATED_SELECTOR: ".mdc-deprecated-list",
      FOCUSABLE_CHILD_ELEMENTS:
        "\n    ." +
        Ns.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        Ns.LIST_ITEM_CLASS +
        " a,\n    ." +
        Ns.LIST_ITEM_CLASS +
        ' input[type="radio"]:not(:disabled),\n    .' +
        Ns.LIST_ITEM_CLASS +
        ' input[type="checkbox"]:not(:disabled),\n    .' +
        Ds[Ns.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        Ds[Ns.LIST_ITEM_CLASS] +
        " a,\n    ." +
        Ds[Ns.LIST_ITEM_CLASS] +
        ' input[type="radio"]:not(:disabled),\n    .' +
        Ds[Ns.LIST_ITEM_CLASS] +
        ' input[type="checkbox"]:not(:disabled)\n  ',
      RADIO_SELECTOR: 'input[type="radio"]',
      SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]',
    },
    Fs = { UNSET_INDEX: -1, TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300 },
    ks = ["input", "button", "textarea", "select"],
    Us = function (e) {
      var t = e.target;
      if (t) {
        var n = ("" + t.tagName).toLowerCase();
        -1 === ks.indexOf(n) && e.preventDefault();
      }
    };
  function Hs(e, t) {
    var n,
      i = e.nextChar,
      r = e.focusItemAtIndex,
      s = e.sortedIndexByFirstChar,
      o = e.focusedItemIndex,
      a = e.skipFocus,
      l = e.isItemAtIndexDisabled;
    return (
      clearTimeout(t.bufferClearTimeout),
      (t.bufferClearTimeout = setTimeout(function () {
        Bs(t);
      }, Fs.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS)),
      (t.typeaheadBuffer = t.typeaheadBuffer + i),
      (n =
        1 === t.typeaheadBuffer.length
          ? (function (e, t, n, i) {
              var r = i.typeaheadBuffer[0],
                s = e.get(r);
              if (!s) return -1;
              if (
                r === i.currentFirstChar &&
                s[i.sortedIndexCursor].index === t
              ) {
                i.sortedIndexCursor = (i.sortedIndexCursor + 1) % s.length;
                var o = s[i.sortedIndexCursor].index;
                if (!n(o)) return o;
              }
              i.currentFirstChar = r;
              var a,
                l = -1;
              for (a = 0; a < s.length; a++)
                if (!n(s[a].index)) {
                  l = a;
                  break;
                }
              for (; a < s.length; a++)
                if (s[a].index > t && !n(s[a].index)) {
                  l = a;
                  break;
                }
              if (-1 !== l)
                return (i.sortedIndexCursor = l), s[i.sortedIndexCursor].index;
              return -1;
            })(s, o, l, t)
          : (function (e, t, n) {
              var i = n.typeaheadBuffer[0],
                r = e.get(i);
              if (!r) return -1;
              var s = r[n.sortedIndexCursor];
              if (0 === s.text.lastIndexOf(n.typeaheadBuffer, 0) && !t(s.index))
                return s.index;
              var o = (n.sortedIndexCursor + 1) % r.length,
                a = -1;
              for (; o !== n.sortedIndexCursor; ) {
                var l = r[o],
                  c = 0 === l.text.lastIndexOf(n.typeaheadBuffer, 0),
                  u = !t(l.index);
                if (c && u) {
                  a = o;
                  break;
                }
                o = (o + 1) % r.length;
              }
              if (-1 !== a)
                return (n.sortedIndexCursor = a), r[n.sortedIndexCursor].index;
              return -1;
            })(s, l, t)),
      -1 === n || a || r(n),
      n
    );
  }
  function Ps(e) {
    return e.typeaheadBuffer.length > 0;
  }
  function Bs(e) {
    e.typeaheadBuffer = "";
  }
  function Vs(e, t) {
    var n = e.event,
      i = e.isTargetListItem,
      r = e.focusedItemIndex,
      s = e.focusItemAtIndex,
      o = e.sortedIndexByFirstChar,
      a = e.isItemAtIndexDisabled,
      l = "ArrowLeft" === xi(n),
      c = "ArrowUp" === xi(n),
      u = "ArrowRight" === xi(n),
      d = "ArrowDown" === xi(n),
      p = "Home" === xi(n),
      f = "End" === xi(n),
      h = "Enter" === xi(n),
      m = "Spacebar" === xi(n);
    return n.ctrlKey || n.metaKey || l || c || u || d || p || f || h
      ? -1
      : m || 1 !== n.key.length
      ? m
        ? (i && Us(n),
          i && Ps(t)
            ? Hs(
                {
                  focusItemAtIndex: s,
                  focusedItemIndex: r,
                  nextChar: " ",
                  sortedIndexByFirstChar: o,
                  skipFocus: !1,
                  isItemAtIndexDisabled: a,
                },
                t
              )
            : -1)
        : -1
      : (Us(n),
        Hs(
          {
            focusItemAtIndex: s,
            focusedItemIndex: r,
            nextChar: n.key.toLowerCase(),
            sortedIndexByFirstChar: o,
            skipFocus: !1,
            isItemAtIndexDisabled: a,
          },
          t
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
   */ var js = (function (e) {
    function t(n) {
      var i = e.call(this, We(We({}, t.defaultAdapter), n)) || this;
      return (
        (i.wrapFocus = !1),
        (i.isVertical = !0),
        (i.isSingleSelectionList = !1),
        (i.selectedIndex = Fs.UNSET_INDEX),
        (i.focusedItemIndex = Fs.UNSET_INDEX),
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
      Ge(t, e),
      Object.defineProperty(t, "strings", {
        get: function () {
          return Rs;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "cssClasses", {
        get: function () {
          return Ns;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "numbers", {
        get: function () {
          return Fs;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "defaultAdapter", {
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
      (t.prototype.layout = function () {
        0 !== this.adapter.getListItemCount() &&
          (this.adapter.hasCheckboxAtIndex(0)
            ? (this.isCheckboxList = !0)
            : this.adapter.hasRadioAtIndex(0)
            ? (this.isRadioList = !0)
            : this.maybeInitializeSingleSelection(),
          this.hasTypeahead &&
            (this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex()));
      }),
      (t.prototype.getFocusedItemIndex = function () {
        return this.focusedItemIndex;
      }),
      (t.prototype.setWrapFocus = function (e) {
        this.wrapFocus = e;
      }),
      (t.prototype.setVerticalOrientation = function (e) {
        this.isVertical = e;
      }),
      (t.prototype.setSingleSelection = function (e) {
        (this.isSingleSelectionList = e),
          e &&
            (this.maybeInitializeSingleSelection(),
            (this.selectedIndex = this.getSelectedIndexFromDOM()));
      }),
      (t.prototype.maybeInitializeSingleSelection = function () {
        var e = this.getSelectedIndexFromDOM();
        e !== Fs.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            e,
            Ns.LIST_ITEM_ACTIVATED_CLASS
          ) && this.setUseActivatedClass(!0),
          (this.isSingleSelectionList = !0),
          (this.selectedIndex = e));
      }),
      (t.prototype.getSelectedIndexFromDOM = function () {
        for (
          var e = Fs.UNSET_INDEX, t = this.adapter.getListItemCount(), n = 0;
          n < t;
          n++
        ) {
          var i = this.adapter.listItemAtIndexHasClass(
              n,
              Ns.LIST_ITEM_SELECTED_CLASS
            ),
            r = this.adapter.listItemAtIndexHasClass(
              n,
              Ns.LIST_ITEM_ACTIVATED_CLASS
            );
          if (i || r) {
            e = n;
            break;
          }
        }
        return e;
      }),
      (t.prototype.setHasTypeahead = function (e) {
        (this.hasTypeahead = e),
          e && (this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex());
      }),
      (t.prototype.isTypeaheadInProgress = function () {
        return this.hasTypeahead && Ps(this.typeaheadState);
      }),
      (t.prototype.setUseActivatedClass = function (e) {
        this.useActivatedClass = e;
      }),
      (t.prototype.setUseSelectedAttribute = function (e) {
        this.useSelectedAttr = e;
      }),
      (t.prototype.getSelectedIndex = function () {
        return this.selectedIndex;
      }),
      (t.prototype.setSelectedIndex = function (e, t) {
        var n = (void 0 === t ? {} : t).forceUpdate;
        this.isIndexValid(e) &&
          (this.isCheckboxList
            ? this.setCheckboxAtIndex(e)
            : this.isRadioList
            ? this.setRadioAtIndex(e)
            : this.setSingleSelectionAtIndex(e, { forceUpdate: n }));
      }),
      (t.prototype.handleFocusIn = function (e) {
        e >= 0 &&
          ((this.focusedItemIndex = e),
          this.adapter.setAttributeForElementIndex(e, "tabindex", "0"),
          this.adapter.setTabIndexForListItemChildren(e, "0"));
      }),
      (t.prototype.handleFocusOut = function (e) {
        var t = this;
        e >= 0 &&
          (this.adapter.setAttributeForElementIndex(e, "tabindex", "-1"),
          this.adapter.setTabIndexForListItemChildren(e, "-1")),
          setTimeout(function () {
            t.adapter.isFocusInsideList() ||
              t.setTabindexToFirstSelectedOrFocusedItem();
          }, 0);
      }),
      (t.prototype.handleKeydown = function (e, t, n) {
        var i = this,
          r = "ArrowLeft" === xi(e),
          s = "ArrowUp" === xi(e),
          o = "ArrowRight" === xi(e),
          a = "ArrowDown" === xi(e),
          l = "Home" === xi(e),
          c = "End" === xi(e),
          u = "Enter" === xi(e),
          d = "Spacebar" === xi(e),
          p = "A" === e.key || "a" === e.key;
        if (this.adapter.isRootFocused()) {
          s || c
            ? (e.preventDefault(), this.focusLastElement())
            : (a || l) && (e.preventDefault(), this.focusFirstElement()),
            this.hasTypeahead &&
              Vs(
                {
                  event: e,
                  focusItemAtIndex: function (e) {
                    i.focusItemAtIndex(e);
                  },
                  focusedItemIndex: -1,
                  isTargetListItem: t,
                  sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                  isItemAtIndexDisabled: function (e) {
                    return i.adapter.listItemAtIndexHasClass(
                      e,
                      Ns.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
        } else {
          var f = this.adapter.getFocusedElementIndex();
          if (!(-1 === f && (f = n) < 0)) {
            if ((this.isVertical && a) || (!this.isVertical && o))
              Us(e), this.focusNextElement(f);
            else if ((this.isVertical && s) || (!this.isVertical && r))
              Us(e), this.focusPrevElement(f);
            else if (l) Us(e), this.focusFirstElement();
            else if (c) Us(e), this.focusLastElement();
            else if (p && e.ctrlKey && this.isCheckboxList)
              e.preventDefault(),
                this.toggleAll(
                  this.selectedIndex === Fs.UNSET_INDEX
                    ? []
                    : this.selectedIndex
                );
            else if ((u || d) && t) {
              var h = e.target;
              if (h && "A" === h.tagName && u) return;
              if (
                (Us(e),
                this.adapter.listItemAtIndexHasClass(
                  f,
                  Ns.LIST_ITEM_DISABLED_CLASS
                ))
              )
                return;
              this.isTypeaheadInProgress() ||
                (this.isSelectableList() && this.setSelectedIndexOnAction(f),
                this.adapter.notifyAction(f));
            }
            if (this.hasTypeahead)
              Vs(
                {
                  event: e,
                  focusItemAtIndex: function (e) {
                    i.focusItemAtIndex(e);
                  },
                  focusedItemIndex: this.focusedItemIndex,
                  isTargetListItem: t,
                  sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                  isItemAtIndexDisabled: function (e) {
                    return i.adapter.listItemAtIndexHasClass(
                      e,
                      Ns.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
          }
        }
      }),
      (t.prototype.handleClick = function (e, t) {
        e !== Fs.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            e,
            Ns.LIST_ITEM_DISABLED_CLASS
          ) ||
            (this.isSelectableList() && this.setSelectedIndexOnAction(e, t),
            this.adapter.notifyAction(e)));
      }),
      (t.prototype.focusNextElement = function (e) {
        var t = e + 1;
        if (t >= this.adapter.getListItemCount()) {
          if (!this.wrapFocus) return e;
          t = 0;
        }
        return this.focusItemAtIndex(t), t;
      }),
      (t.prototype.focusPrevElement = function (e) {
        var t = e - 1;
        if (t < 0) {
          if (!this.wrapFocus) return e;
          t = this.adapter.getListItemCount() - 1;
        }
        return this.focusItemAtIndex(t), t;
      }),
      (t.prototype.focusFirstElement = function () {
        return this.focusItemAtIndex(0), 0;
      }),
      (t.prototype.focusLastElement = function () {
        var e = this.adapter.getListItemCount() - 1;
        return this.focusItemAtIndex(e), e;
      }),
      (t.prototype.focusInitialElement = function () {
        var e = this.getFirstSelectedOrFocusedItemIndex();
        return this.focusItemAtIndex(e), e;
      }),
      (t.prototype.setEnabled = function (e, t) {
        this.isIndexValid(e) &&
          (t
            ? (this.adapter.removeClassForElementIndex(
                e,
                Ns.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                e,
                Rs.ARIA_DISABLED,
                "false"
              ))
            : (this.adapter.addClassForElementIndex(
                e,
                Ns.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                e,
                Rs.ARIA_DISABLED,
                "true"
              )));
      }),
      (t.prototype.setSingleSelectionAtIndex = function (e, t) {
        var n = (void 0 === t ? {} : t).forceUpdate;
        if (this.selectedIndex !== e || n) {
          var i = Ns.LIST_ITEM_SELECTED_CLASS;
          this.useActivatedClass && (i = Ns.LIST_ITEM_ACTIVATED_CLASS),
            this.selectedIndex !== Fs.UNSET_INDEX &&
              this.adapter.removeClassForElementIndex(this.selectedIndex, i),
            this.setAriaForSingleSelectionAtIndex(e),
            this.setTabindexAtIndex(e),
            e !== Fs.UNSET_INDEX && this.adapter.addClassForElementIndex(e, i),
            (this.selectedIndex = e);
        }
      }),
      (t.prototype.setAriaForSingleSelectionAtIndex = function (e) {
        this.selectedIndex === Fs.UNSET_INDEX &&
          (this.ariaCurrentAttrValue = this.adapter.getAttributeForElementIndex(
            e,
            Rs.ARIA_CURRENT
          ));
        var t = null !== this.ariaCurrentAttrValue,
          n = t ? Rs.ARIA_CURRENT : Rs.ARIA_SELECTED;
        if (
          (this.selectedIndex !== Fs.UNSET_INDEX &&
            this.adapter.setAttributeForElementIndex(
              this.selectedIndex,
              n,
              "false"
            ),
          e !== Fs.UNSET_INDEX)
        ) {
          var i = t ? this.ariaCurrentAttrValue : "true";
          this.adapter.setAttributeForElementIndex(e, n, i);
        }
      }),
      (t.prototype.getSelectionAttribute = function () {
        return this.useSelectedAttr ? Rs.ARIA_SELECTED : Rs.ARIA_CHECKED;
      }),
      (t.prototype.setRadioAtIndex = function (e) {
        var t = this.getSelectionAttribute();
        this.adapter.setCheckedCheckboxOrRadioAtIndex(e, !0),
          this.selectedIndex !== Fs.UNSET_INDEX &&
            this.adapter.setAttributeForElementIndex(
              this.selectedIndex,
              t,
              "false"
            ),
          this.adapter.setAttributeForElementIndex(e, t, "true"),
          (this.selectedIndex = e);
      }),
      (t.prototype.setCheckboxAtIndex = function (e) {
        for (
          var t = this.getSelectionAttribute(), n = 0;
          n < this.adapter.getListItemCount();
          n++
        ) {
          var i = !1;
          e.indexOf(n) >= 0 && (i = !0),
            this.adapter.setCheckedCheckboxOrRadioAtIndex(n, i),
            this.adapter.setAttributeForElementIndex(
              n,
              t,
              i ? "true" : "false"
            );
        }
        this.selectedIndex = e;
      }),
      (t.prototype.setTabindexAtIndex = function (e) {
        this.focusedItemIndex === Fs.UNSET_INDEX && 0 !== e
          ? this.adapter.setAttributeForElementIndex(0, "tabindex", "-1")
          : this.focusedItemIndex >= 0 &&
            this.focusedItemIndex !== e &&
            this.adapter.setAttributeForElementIndex(
              this.focusedItemIndex,
              "tabindex",
              "-1"
            ),
          this.selectedIndex instanceof Array ||
            this.selectedIndex === e ||
            this.adapter.setAttributeForElementIndex(
              this.selectedIndex,
              "tabindex",
              "-1"
            ),
          e !== Fs.UNSET_INDEX &&
            this.adapter.setAttributeForElementIndex(e, "tabindex", "0");
      }),
      (t.prototype.isSelectableList = function () {
        return (
          this.isSingleSelectionList || this.isCheckboxList || this.isRadioList
        );
      }),
      (t.prototype.setTabindexToFirstSelectedOrFocusedItem = function () {
        var e = this.getFirstSelectedOrFocusedItemIndex();
        this.setTabindexAtIndex(e);
      }),
      (t.prototype.getFirstSelectedOrFocusedItemIndex = function () {
        return this.isSelectableList()
          ? "number" == typeof this.selectedIndex &&
            this.selectedIndex !== Fs.UNSET_INDEX
            ? this.selectedIndex
            : this.selectedIndex instanceof Array &&
              this.selectedIndex.length > 0
            ? this.selectedIndex.reduce(function (e, t) {
                return Math.min(e, t);
              })
            : 0
          : Math.max(this.focusedItemIndex, 0);
      }),
      (t.prototype.isIndexValid = function (e) {
        var t = this;
        if (e instanceof Array) {
          if (!this.isCheckboxList)
            throw new Error(
              "MDCListFoundation: Array of index is only supported for checkbox based list"
            );
          return (
            0 === e.length ||
            e.some(function (e) {
              return t.isIndexInRange(e);
            })
          );
        }
        if ("number" == typeof e) {
          if (this.isCheckboxList)
            throw new Error(
              "MDCListFoundation: Expected array of index for checkbox based list but got number: " +
                e
            );
          return (
            this.isIndexInRange(e) ||
            (this.isSingleSelectionList && e === Fs.UNSET_INDEX)
          );
        }
        return !1;
      }),
      (t.prototype.isIndexInRange = function (e) {
        var t = this.adapter.getListItemCount();
        return e >= 0 && e < t;
      }),
      (t.prototype.setSelectedIndexOnAction = function (e, t) {
        void 0 === t && (t = !0),
          this.isCheckboxList
            ? this.toggleCheckboxAtIndex(e, t)
            : this.setSelectedIndex(e);
      }),
      (t.prototype.toggleCheckboxAtIndex = function (e, t) {
        var n = this.getSelectionAttribute(),
          i = this.adapter.isCheckboxCheckedAtIndex(e);
        t && ((i = !i), this.adapter.setCheckedCheckboxOrRadioAtIndex(e, i)),
          this.adapter.setAttributeForElementIndex(e, n, i ? "true" : "false");
        var r =
          this.selectedIndex === Fs.UNSET_INDEX
            ? []
            : this.selectedIndex.slice();
        i
          ? r.push(e)
          : (r = r.filter(function (t) {
              return t !== e;
            })),
          (this.selectedIndex = r);
      }),
      (t.prototype.focusItemAtIndex = function (e) {
        this.adapter.focusItemAtIndex(e), (this.focusedItemIndex = e);
      }),
      (t.prototype.toggleAll = function (e) {
        var t = this.adapter.getListItemCount();
        if (e.length === t) this.setCheckboxAtIndex([]);
        else {
          for (var n = [], i = 0; i < t; i++)
            (!this.adapter.listItemAtIndexHasClass(
              i,
              Ns.LIST_ITEM_DISABLED_CLASS
            ) ||
              e.indexOf(i) > -1) &&
              n.push(i);
          this.setCheckboxAtIndex(n);
        }
      }),
      (t.prototype.typeaheadMatchItem = function (e, t, n) {
        var i = this;
        return (
          void 0 === n && (n = !1),
          Hs(
            {
              focusItemAtIndex: function (e) {
                i.focusItemAtIndex(e);
              },
              focusedItemIndex: t || this.focusedItemIndex,
              nextChar: e,
              sortedIndexByFirstChar: this.sortedIndexByFirstChar,
              skipFocus: n,
              isItemAtIndexDisabled: function (e) {
                return i.adapter.listItemAtIndexHasClass(
                  e,
                  Ns.LIST_ITEM_DISABLED_CLASS
                );
              },
            },
            this.typeaheadState
          )
        );
      }),
      (t.prototype.typeaheadInitSortedIndex = function () {
        return (function (e, t) {
          for (var n = new Map(), i = 0; i < e; i++) {
            var r = t(i).trim();
            if (r) {
              var s = r[0].toLowerCase();
              n.has(s) || n.set(s, []),
                n.get(s).push({ text: r.toLowerCase(), index: i });
            }
          }
          return (
            n.forEach(function (e) {
              e.sort(function (e, t) {
                return e.index - t.index;
              });
            }),
            n
          );
        })(this.adapter.getListItemCount(), this.adapter.getPrimaryTextAtIndex);
      }),
      (t.prototype.clearTypeaheadBuffer = function () {
        Bs(this.typeaheadState);
      }),
      t
    );
  })(Qe);
  function zs(e) {
    let t;
    const n = e[37].default,
      i = c(n, e, e[43], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 4096 & r[1]) &&
          p(i, n, e, e[43], t ? d(n, e[43], r, null) : f(e[43]), null);
      },
      i(e) {
        t || (_e(i, e), (t = !0));
      },
      o(e) {
        Se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Gs(e) {
    let t, i, r;
    const s = [
      { use: [e[17], ...e[0]] },
      {
        class: yt({
          [e[1]]: !0,
          "mdc-deprecated-list": !0,
          "mdc-deprecated-list--non-interactive": e[2],
          "mdc-deprecated-list--dense": e[3],
          "mdc-deprecated-list--textual-list": e[4],
          "mdc-deprecated-list--avatar-list": e[5] || e[18],
          "mdc-deprecated-list--icon-list": e[6],
          "mdc-deprecated-list--image-list": e[7],
          "mdc-deprecated-list--thumbnail-list": e[8],
          "mdc-deprecated-list--video-list": e[9],
          "mdc-deprecated-list--two-line": e[10],
          "smui-list--three-line": e[11] && !e[10],
        }),
      },
      { role: e[15] },
      e[23],
    ];
    var o = e[12];
    function a(e) {
      let t = { $$slots: { default: [zs] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) t = n(t, s[e]);
      return { props: t };
    }
    return (
      o &&
        ((t = new o(a(e))),
        e[38](t),
        t.$on("keydown", e[39]),
        t.$on("focusin", e[40]),
        t.$on("focusout", e[41]),
        t.$on("click", e[42]),
        t.$on("SMUIListItem:mount", e[19]),
        t.$on("SMUIListItem:unmount", e[20]),
        t.$on("SMUI:action", e[21])),
      {
        c() {
          t && Fe(t.$$.fragment), (i = F());
        },
        m(e, n) {
          t && ke(t, e, n), L(e, i, n), (r = !0);
        },
        p(e, n) {
          const r =
            8818687 & n[0]
              ? Ne(s, [
                  131073 & n[0] && { use: [e[17], ...e[0]] },
                  266238 & n[0] && {
                    class: yt({
                      [e[1]]: !0,
                      "mdc-deprecated-list": !0,
                      "mdc-deprecated-list--non-interactive": e[2],
                      "mdc-deprecated-list--dense": e[3],
                      "mdc-deprecated-list--textual-list": e[4],
                      "mdc-deprecated-list--avatar-list": e[5] || e[18],
                      "mdc-deprecated-list--icon-list": e[6],
                      "mdc-deprecated-list--image-list": e[7],
                      "mdc-deprecated-list--thumbnail-list": e[8],
                      "mdc-deprecated-list--video-list": e[9],
                      "mdc-deprecated-list--two-line": e[10],
                      "smui-list--three-line": e[11] && !e[10],
                    }),
                  },
                  32768 & n[0] && { role: e[15] },
                  8388608 & n[0] && De(e[23]),
                ])
              : {};
          if (
            (4096 & n[1] && (r.$$scope = { dirty: n, ctx: e }),
            o !== (o = e[12]))
          ) {
            if (t) {
              Ae();
              const e = t;
              Se(e.$$.fragment, 1, 0, () => {
                Ue(e, 1);
              }),
                Ce();
            }
            o
              ? ((t = new o(a(e))),
                e[38](t),
                t.$on("keydown", e[39]),
                t.$on("focusin", e[40]),
                t.$on("focusout", e[41]),
                t.$on("click", e[42]),
                t.$on("SMUIListItem:mount", e[19]),
                t.$on("SMUIListItem:unmount", e[20]),
                t.$on("SMUI:action", e[21]),
                Fe(t.$$.fragment),
                _e(t.$$.fragment, 1),
                ke(t, i.parentNode, i))
              : (t = null);
          } else o && t.$set(r);
        },
        i(e) {
          r || (t && _e(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          t && Se(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[38](null), n && O(i), t && Ue(t, n);
        },
      }
    );
  }
  function Ws(e, t, i) {
    const r = [
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
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t;
    var l;
    const { closest: c, matches: u } = tt,
      d = xt(Z());
    let p,
      f,
      { use: g = [] } = t,
      { class: $ = "" } = t,
      { nonInteractive: y = !1 } = t,
      { dense: v = !1 } = t,
      { textualList: I = !1 } = t,
      { avatarList: b = !1 } = t,
      { iconList: E = !1 } = t,
      { imageList: x = !1 } = t,
      { thumbnailList: A = !1 } = t,
      { videoList: C = !1 } = t,
      { twoLine: _ = !1 } = t,
      { threeLine: S = !1 } = t,
      { vertical: T = !0 } = t,
      {
        wrapFocus: L = null !== (l = re("SMUI:list:wrapFocus")) &&
          void 0 !== l &&
          l,
      } = t,
      { singleSelection: O = !1 } = t,
      { selectedIndex: w = -1 } = t,
      { radioList: M = !1 } = t,
      { checkList: N = !1 } = t,
      { hasTypeahead: D = !1 } = t,
      R = [],
      F = re("SMUI:list:role"),
      k = re("SMUI:list:nav");
    const U = new WeakMap();
    let H,
      P = re("SMUI:dialog:selection"),
      B = re("SMUI:addLayoutListener"),
      { component: V = k ? hn : gn } = t;
    function j() {
      return null == p
        ? []
        : [...oe().children]
            .map((e) => U.get(e))
            .filter((e) => e && e._smui_list_item_accessor);
    }
    function z(e) {
      const t = j()[e];
      t && "focus" in t.element && t.element.focus();
    }
    function G(e, t) {
      var n;
      const i = j()[e];
      return null !== (n = i && i.hasClass(t)) && void 0 !== n && n;
    }
    function W(e, t) {
      const n = j()[e];
      n && n.addClass(t);
    }
    function q(e, t) {
      const n = j()[e];
      n && n.removeClass(t);
    }
    function K(e, t, n) {
      const i = j()[e];
      i && i.addAttr(t, n);
    }
    function X(e, t) {
      const n = j()[e];
      n && n.removeAttr(t);
    }
    function Y(e, t) {
      const n = j()[e];
      return n ? n.getAttr(t) : null;
    }
    function Q(e) {
      var t;
      const n = j()[e];
      return null !== (t = n && n.getPrimaryText()) && void 0 !== t ? t : "";
    }
    function J(e) {
      const t = c(e, ".mdc-deprecated-list-item, .mdc-deprecated-list");
      return t && u(t, ".mdc-deprecated-list-item")
        ? j()
            .map((e) => (null == e ? void 0 : e.element))
            .indexOf(t)
        : -1;
    }
    function ne() {
      return f.layout();
    }
    function se() {
      return f.getSelectedIndex();
    }
    function oe() {
      return p.getElement();
    }
    ie("SMUI:list:nonInteractive", y),
      ie("SMUI:separator:context", "list"),
      F ||
        (O
          ? ((F = "listbox"), ie("SMUI:list:item:role", "option"))
          : M
          ? ((F = "radiogroup"), ie("SMUI:list:item:role", "radio"))
          : N
          ? ((F = "group"), ie("SMUI:list:item:role", "checkbox"))
          : ((F = "list"), ie("SMUI:list:item:role", void 0))),
      B && (H = B(ne)),
      ee(() => {
        i(
          13,
          (f = new js({
            addClassForElementIndex: W,
            focusItemAtIndex: z,
            getAttributeForElementIndex: (e, t) => {
              var n, i;
              return null !==
                (i =
                  null === (n = j()[e]) || void 0 === n
                    ? void 0
                    : n.getAttr(t)) && void 0 !== i
                ? i
                : null;
            },
            getFocusedElementIndex: () =>
              document.activeElement
                ? j()
                    .map((e) => e.element)
                    .indexOf(document.activeElement)
                : -1,
            getListItemCount: () => R.length,
            getPrimaryTextAtIndex: Q,
            hasCheckboxAtIndex: (e) => {
              var t, n;
              return (
                null !==
                  (n =
                    null === (t = j()[e]) || void 0 === t
                      ? void 0
                      : t.hasCheckbox) &&
                void 0 !== n &&
                n
              );
            },
            hasRadioAtIndex: (e) => {
              var t, n;
              return (
                null !==
                  (n =
                    null === (t = j()[e]) || void 0 === t
                      ? void 0
                      : t.hasRadio) &&
                void 0 !== n &&
                n
              );
            },
            isCheckboxCheckedAtIndex: (e) => {
              var t;
              const n = j()[e];
              return (
                null !==
                  (t = (null == n ? void 0 : n.hasCheckbox) && n.checked) &&
                void 0 !== t &&
                t
              );
            },
            isFocusInsideList: () =>
              null != p &&
              oe() !== document.activeElement &&
              oe().contains(document.activeElement),
            isRootFocused: () => null != p && document.activeElement === oe(),
            listItemAtIndexHasClass: G,
            notifyAction: (e) => {
              i(24, (w = e)),
                null != p &&
                  vt(oe(), "SMUIList:action", { index: e }, void 0, !0);
            },
            removeClassForElementIndex: q,
            setAttributeForElementIndex: K,
            setCheckedCheckboxOrRadioAtIndex: (e, t) => {
              j()[e].checked = t;
            },
            setTabIndexForListItemChildren: (e, t) => {
              const n = j()[e];
              Array.prototype.forEach.call(
                n.element.querySelectorAll("button:not(:disabled), a"),
                (e) => {
                  e.setAttribute("tabindex", t);
                }
              );
            },
          }))
        );
        const e = {
          get element() {
            return oe();
          },
          get items() {
            return R;
          },
          get typeaheadInProgress() {
            return f.isTypeaheadInProgress();
          },
          typeaheadMatchItem: (e, t) => f.typeaheadMatchItem(e, t, !0),
          getOrderedList: j,
          focusItemAtIndex: z,
          addClassForElementIndex: W,
          removeClassForElementIndex: q,
          setAttributeForElementIndex: K,
          removeAttributeForElementIndex: X,
          getAttributeFromElementIndex: Y,
          getPrimaryTextAtIndex: Q,
        };
        return (
          vt(oe(), "SMUIList:mount", e),
          f.init(),
          () => {
            f.destroy();
          }
        );
      }),
      te(() => {
        H && H();
      });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(23, (s = m(t, r))),
          "use" in e && i(0, (g = e.use)),
          "class" in e && i(1, ($ = e.class)),
          "nonInteractive" in e && i(2, (y = e.nonInteractive)),
          "dense" in e && i(3, (v = e.dense)),
          "textualList" in e && i(4, (I = e.textualList)),
          "avatarList" in e && i(5, (b = e.avatarList)),
          "iconList" in e && i(6, (E = e.iconList)),
          "imageList" in e && i(7, (x = e.imageList)),
          "thumbnailList" in e && i(8, (A = e.thumbnailList)),
          "videoList" in e && i(9, (C = e.videoList)),
          "twoLine" in e && i(10, (_ = e.twoLine)),
          "threeLine" in e && i(11, (S = e.threeLine)),
          "vertical" in e && i(25, (T = e.vertical)),
          "wrapFocus" in e && i(26, (L = e.wrapFocus)),
          "singleSelection" in e && i(27, (O = e.singleSelection)),
          "selectedIndex" in e && i(24, (w = e.selectedIndex)),
          "radioList" in e && i(28, (M = e.radioList)),
          "checkList" in e && i(29, (N = e.checkList)),
          "hasTypeahead" in e && i(30, (D = e.hasTypeahead)),
          "component" in e && i(12, (V = e.component)),
          "$$scope" in e && i(43, (a = e.$$scope));
      }),
      (e.$$.update = () => {
        33562624 & e.$$.dirty[0] && f && f.setVerticalOrientation(T),
          67117056 & e.$$.dirty[0] && f && f.setWrapFocus(L),
          1073750016 & e.$$.dirty[0] && f && f.setHasTypeahead(D),
          134225920 & e.$$.dirty[0] && f && f.setSingleSelection(O),
          151003136 & e.$$.dirty[0] &&
            f &&
            O &&
            se() !== w &&
            f.setSelectedIndex(w);
      }),
      [
        g,
        $,
        y,
        v,
        I,
        b,
        E,
        x,
        A,
        C,
        _,
        S,
        V,
        f,
        p,
        F,
        u,
        d,
        P,
        function (e) {
          R.push(e.detail),
            U.set(e.detail.element, e.detail),
            O && e.detail.selected && i(24, (w = J(e.detail.element))),
            e.stopPropagation();
        },
        function (e) {
          var t;
          const n =
            null !== (t = e.detail && R.indexOf(e.detail)) && void 0 !== t
              ? t
              : -1;
          -1 !== n && (R.splice(n, 1), U.delete(e.detail.element)),
            e.stopPropagation();
        },
        function (e) {
          if (M || N) {
            const t = J(e.target);
            if (-1 !== t) {
              const e = j()[t];
              e &&
                ((M && !e.checked) || N) &&
                ((e.checked = !e.checked),
                e.activateRipple(),
                window.requestAnimationFrame(() => {
                  e.deactivateRipple();
                }));
            }
          }
        },
        J,
        s,
        w,
        T,
        L,
        O,
        M,
        N,
        D,
        ne,
        function (e, t) {
          return f.setEnabled(e, t);
        },
        function () {
          return f.isTypeaheadInProgress();
        },
        se,
        function () {
          return f.getFocusedItemIndex();
        },
        oe,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (p = e), i(14, p);
          });
        },
        (e) =>
          f &&
          f.handleKeydown(
            e,
            e.target.classList.contains("mdc-deprecated-list-item"),
            J(e.target)
          ),
        (e) => f && f.handleFocusIn(J(e.target)),
        (e) => f && f.handleFocusOut(J(e.target)),
        (e) =>
          f &&
          f.handleClick(
            J(e.target),
            !u(e.target, 'input[type="checkbox"], input[type="radio"]')
          ),
        a,
      ]
    );
  }
  class qs extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          Ws,
          Gs,
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
  function Ks(e) {
    let t;
    return {
      c() {
        (t = M("span")), U(t, "class", "mdc-deprecated-list-item__ripple");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Xs(e) {
    let t,
      n,
      i = e[7] && Ks();
    const r = e[32].default,
      s = c(r, e, e[35], null);
    return {
      c() {
        i && i.c(), (t = F()), s && s.c();
      },
      m(e, r) {
        i && i.m(e, r), L(e, t, r), s && s.m(e, r), (n = !0);
      },
      p(e, o) {
        e[7]
          ? i || ((i = Ks()), i.c(), i.m(t.parentNode, t))
          : i && (i.d(1), (i = null)),
          s &&
            s.p &&
            (!n || 16 & o[1]) &&
            p(s, r, e, e[35], n ? d(r, e[35], o, null) : f(e[35]), null);
      },
      i(e) {
        n || (_e(s, e), (n = !0));
      },
      o(e) {
        Se(s, e), (n = !1);
      },
      d(e) {
        i && i.d(e), e && O(t), s && s.d(e);
      },
    };
  }
  function Ys(e) {
    let t, i, r;
    const s = [
      {
        use: [
          ...(e[6]
            ? []
            : [
                [
                  Ni,
                  {
                    ripple: !e[14],
                    unbounded: !1,
                    color: (e[1] || e[0]) && null == e[5] ? "primary" : e[5],
                    disabled: e[9],
                    addClass: e[22],
                    removeClass: e[23],
                    addStyle: e[24],
                  },
                ],
              ]),
          e[20],
          ...e[2],
        ],
      },
      {
        class: yt({
          [e[3]]: !0,
          "mdc-deprecated-list-item": !0,
          "mdc-deprecated-list-item--activated": e[1],
          "mdc-deprecated-list-item--selected": e[0],
          "mdc-deprecated-list-item--disabled": e[9],
          "mdc-menu-item--selected": !e[21] && "menuitem" === e[8] && e[0],
          "smui-menu-item--non-interactive": e[6],
          ...e[16],
        }),
      },
      { style: Object.entries(e[17]).map(Js).concat([e[4]]).join(" ") },
      e[21] && e[1] ? { "aria-current": "page" } : {},
      e[21] ? {} : { role: e[8] },
      e[21] || "option" !== e[8]
        ? {}
        : { "aria-selected": e[0] ? "true" : "false" },
      e[21] || ("radio" !== e[8] && "checkbox" !== e[8])
        ? {}
        : { "aria-checked": e[14] && e[14].checked ? "true" : "false" },
      e[21] ? {} : { "aria-disabled": e[9] ? "true" : "false" },
      { "data-menu-item-skip-restore-focus": e[10] || void 0 },
      { tabindex: e[19] },
      { href: e[11] },
      e[18],
      e[27],
    ];
    var o = e[12];
    function a(e) {
      let t = { $$slots: { default: [Xs] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) t = n(t, s[e]);
      return { props: t };
    }
    return (
      o &&
        ((t = new o(a(e))),
        e[33](t),
        t.$on("click", e[13]),
        t.$on("keydown", e[25]),
        t.$on("SMUIGenericInput:mount", e[26]),
        t.$on("SMUIGenericInput:unmount", e[34])),
      {
        c() {
          t && Fe(t.$$.fragment), (i = F());
        },
        m(e, n) {
          t && ke(t, e, n), L(e, i, n), (r = !0);
        },
        p(e, n) {
          const r =
            167726975 & n[0]
              ? Ne(s, [
                  30425703 & n[0] && {
                    use: [
                      ...(e[6]
                        ? []
                        : [
                            [
                              Ni,
                              {
                                ripple: !e[14],
                                unbounded: !1,
                                color:
                                  (e[1] || e[0]) && null == e[5]
                                    ? "primary"
                                    : e[5],
                                disabled: e[9],
                                addClass: e[22],
                                removeClass: e[23],
                                addStyle: e[24],
                              },
                            ],
                          ]),
                      e[20],
                      ...e[2],
                    ],
                  },
                  2163531 & n[0] && {
                    class: yt({
                      [e[3]]: !0,
                      "mdc-deprecated-list-item": !0,
                      "mdc-deprecated-list-item--activated": e[1],
                      "mdc-deprecated-list-item--selected": e[0],
                      "mdc-deprecated-list-item--disabled": e[9],
                      "mdc-menu-item--selected":
                        !e[21] && "menuitem" === e[8] && e[0],
                      "smui-menu-item--non-interactive": e[6],
                      ...e[16],
                    }),
                  },
                  131088 & n[0] && {
                    style: Object.entries(e[17])
                      .map(Js)
                      .concat([e[4]])
                      .join(" "),
                  },
                  2097154 & n[0] &&
                    De(e[21] && e[1] ? { "aria-current": "page" } : {}),
                  2097408 & n[0] && De(e[21] ? {} : { role: e[8] }),
                  2097409 & n[0] &&
                    De(
                      e[21] || "option" !== e[8]
                        ? {}
                        : { "aria-selected": e[0] ? "true" : "false" }
                    ),
                  2113792 & n[0] &&
                    De(
                      e[21] || ("radio" !== e[8] && "checkbox" !== e[8])
                        ? {}
                        : {
                            "aria-checked":
                              e[14] && e[14].checked ? "true" : "false",
                          }
                    ),
                  2097664 & n[0] &&
                    De(
                      e[21] ? {} : { "aria-disabled": e[9] ? "true" : "false" }
                    ),
                  1024 & n[0] && {
                    "data-menu-item-skip-restore-focus": e[10] || void 0,
                  },
                  524288 & n[0] && { tabindex: e[19] },
                  2048 & n[0] && { href: e[11] },
                  262144 & n[0] && De(e[18]),
                  134217728 & n[0] && De(e[27]),
                ])
              : {};
          if (
            ((128 & n[0]) | (16 & n[1]) && (r.$$scope = { dirty: n, ctx: e }),
            o !== (o = e[12]))
          ) {
            if (t) {
              Ae();
              const e = t;
              Se(e.$$.fragment, 1, 0, () => {
                Ue(e, 1);
              }),
                Ce();
            }
            o
              ? ((t = new o(a(e))),
                e[33](t),
                t.$on("click", e[13]),
                t.$on("keydown", e[25]),
                t.$on("SMUIGenericInput:mount", e[26]),
                t.$on("SMUIGenericInput:unmount", e[34]),
                Fe(t.$$.fragment),
                _e(t.$$.fragment, 1),
                ke(t, i.parentNode, i))
              : (t = null);
          } else o && t.$set(r);
        },
        i(e) {
          r || (t && _e(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          t && Se(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[33](null), n && O(i), t && Ue(t, n);
        },
      }
    );
  }
  let Qs = 0;
  const Js = ([e, t]) => `${e}: ${t};`;
  function Zs(e, t, i) {
    let r;
    const s = [
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
    let o = m(t, s),
      { $$slots: a = {}, $$scope: l } = t;
    var c;
    const u = xt(Z());
    let d = () => {};
    let { use: p = [] } = t,
      { class: f = "" } = t,
      { style: g = "" } = t,
      { color: $ } = t,
      {
        nonInteractive: y = null !== (c = re("SMUI:list:nonInteractive")) &&
          void 0 !== c &&
          c,
      } = t;
    ie("SMUI:list:nonInteractive", void 0);
    let { ripple: v = !y } = t,
      { activated: I = !1 } = t,
      { role: b = re("SMUI:list:item:role") } = t;
    ie("SMUI:list:item:role", void 0);
    let E,
      x,
      A,
      { selected: C = !1 } = t,
      { disabled: _ = !1 } = t,
      { skipRestoreFocus: S = !1 } = t,
      { tabindex: T = d } = t,
      { inputId: L = "SMUI-form-field-list-" + Qs++ } = t,
      { href: O } = t,
      w = {},
      M = {},
      N = {},
      D = re("SMUI:list:item:nav"),
      { component: R = D ? (O ? an : mn) : fn } = t;
    function F(e) {
      return e in w ? w[e] : G().classList.contains(e);
    }
    function k(e) {
      w[e] || i(16, (w[e] = !0), w);
    }
    function U(e) {
      (e in w && !w[e]) || i(16, (w[e] = !1), w);
    }
    function H(e) {
      var t;
      return e in N
        ? null !== (t = N[e]) && void 0 !== t
          ? t
          : null
        : G().getAttribute(e);
    }
    function P(e, t) {
      N[e] !== t && i(18, (N[e] = t), N);
    }
    function B(e) {
      (e in N && null == N[e]) || i(18, (N[e] = void 0), N);
    }
    function V() {
      let e = !0,
        t = E.getElement();
      for (; t.nextElementSibling; )
        if (
          ((t = t.nextElementSibling),
          1 === t.nodeType && t.classList.contains("mdc-deprecated-list-item"))
        ) {
          const n = t.attributes.getNamedItem("tabindex");
          if (n && "0" === n.value) {
            e = !1;
            break;
          }
        }
      e && i(19, (r = 0));
    }
    function j(e) {
      _ || vt(G(), "SMUI:action", e);
    }
    function z() {
      var e, t, n;
      const i = G(),
        r = i.querySelector(".mdc-deprecated-list-item__primary-text");
      if (r) return null !== (e = r.textContent) && void 0 !== e ? e : "";
      const s = i.querySelector(".mdc-deprecated-list-item__text");
      return s
        ? null !== (t = s.textContent) && void 0 !== t
          ? t
          : ""
        : null !== (n = i.textContent) && void 0 !== n
        ? n
        : "";
    }
    function G() {
      return E.getElement();
    }
    ie("SMUI:generic:input:props", { id: L }),
      ie("SMUI:separator:context", void 0),
      ee(() => {
        if (!C && !y) {
          let e = !0,
            t = E;
          for (; t.previousSibling; )
            if (
              ((t = t.previousSibling),
              1 === t.nodeType &&
                t.classList.contains("mdc-deprecated-list-item") &&
                !t.classList.contains("mdc-deprecated-list-item--disabled"))
            ) {
              e = !1;
              break;
            }
          e && (A = window.requestAnimationFrame(V));
        }
        const e = {
          _smui_list_item_accessor: !0,
          get element() {
            return G();
          },
          get selected() {
            return C;
          },
          set selected(e) {
            i(0, (C = e));
          },
          hasClass: F,
          addClass: k,
          removeClass: U,
          getAttr: H,
          addAttr: P,
          removeAttr: B,
          getPrimaryText: z,
          get checked() {
            var e;
            return null !== (e = x && x.checked) && void 0 !== e && e;
          },
          set checked(e) {
            x && i(14, (x.checked = !!e), x);
          },
          get hasCheckbox() {
            return !(!x || !("_smui_checkbox_accessor" in x));
          },
          get hasRadio() {
            return !(!x || !("_smui_radio_accessor" in x));
          },
          activateRipple() {
            x && x.activateRipple();
          },
          deactivateRipple() {
            x && x.deactivateRipple();
          },
          getValue: () => o.value,
          action: j,
          get tabindex() {
            return r;
          },
          set tabindex(e) {
            i(28, (T = e));
          },
          get disabled() {
            return _;
          },
          get activated() {
            return I;
          },
          set activated(e) {
            i(1, (I = e));
          },
        };
        return (
          vt(G(), "SMUIListItem:mount", e),
          () => {
            vt(G(), "SMUIListItem:unmount", e);
          }
        );
      }),
      te(() => {
        A && window.cancelAnimationFrame(A);
      });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(27, (o = m(t, s))),
          "use" in e && i(2, (p = e.use)),
          "class" in e && i(3, (f = e.class)),
          "style" in e && i(4, (g = e.style)),
          "color" in e && i(5, ($ = e.color)),
          "nonInteractive" in e && i(6, (y = e.nonInteractive)),
          "ripple" in e && i(7, (v = e.ripple)),
          "activated" in e && i(1, (I = e.activated)),
          "role" in e && i(8, (b = e.role)),
          "selected" in e && i(0, (C = e.selected)),
          "disabled" in e && i(9, (_ = e.disabled)),
          "skipRestoreFocus" in e && i(10, (S = e.skipRestoreFocus)),
          "tabindex" in e && i(28, (T = e.tabindex)),
          "inputId" in e && i(29, (L = e.inputId)),
          "href" in e && i(11, (O = e.href)),
          "component" in e && i(12, (R = e.component)),
          "$$scope" in e && i(35, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        268452417 & e.$$.dirty[0] &&
          i(
            19,
            (r = T === d ? (y || _ || !(C || (x && x.checked)) ? -1 : 0) : T)
          );
      }),
      [
        C,
        I,
        p,
        f,
        g,
        $,
        y,
        v,
        b,
        _,
        S,
        O,
        R,
        j,
        x,
        E,
        w,
        M,
        N,
        r,
        u,
        D,
        k,
        U,
        function (e, t) {
          M[e] != t &&
            ("" === t || null == t
              ? (delete M[e], i(17, M))
              : i(17, (M[e] = t), M));
        },
        function (e) {
          const t = "Enter" === e.key,
            n = "Space" === e.key;
          (t || n) && j(e);
        },
        function (e) {
          ("_smui_checkbox_accessor" in e.detail ||
            "_smui_radio_accessor" in e.detail) &&
            i(14, (x = e.detail));
        },
        o,
        T,
        L,
        z,
        G,
        a,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (E = e), i(15, E);
          });
        },
        () => i(14, (x = void 0)),
        l,
      ]
    );
  }
  var eo = Pt({ class: "mdc-deprecated-list-item__text", component: mn }),
    to = Pt({ class: "mdc-deprecated-list-item__primary-text", component: mn }),
    no = Pt({
      class: "mdc-deprecated-list-item__secondary-text",
      component: mn,
    });
  function io(e) {
    let t, i, r, a, l, u;
    const h = e[8].default,
      m = c(h, e, e[7], null);
    let g = [
        {
          class: (i = yt({
            [e[1]]: !0,
            "mdc-deprecated-list-item__graphic": !0,
            "mdc-menu__selection-group-icon": e[4],
          })),
        },
        e[5],
      ],
      $ = {};
    for (let e = 0; e < g.length; e += 1) $ = n($, g[e]);
    return {
      c() {
        (t = M("span")), m && m.c(), H(t, $);
      },
      m(n, i) {
        L(n, t, i),
          m && m.m(t, null),
          e[9](t),
          (a = !0),
          l ||
            ((u = [v((r = Ct.call(null, t, e[0]))), v(e[3].call(null, t))]),
            (l = !0));
      },
      p(e, [n]) {
        m &&
          m.p &&
          (!a || 128 & n) &&
          p(m, h, e, e[7], a ? d(h, e[7], n, null) : f(e[7]), null),
          H(
            t,
            ($ = Ne(g, [
              (!a ||
                (2 & n &&
                  i !==
                    (i = yt({
                      [e[1]]: !0,
                      "mdc-deprecated-list-item__graphic": !0,
                      "mdc-menu__selection-group-icon": e[4],
                    })))) && { class: i },
              32 & n && e[5],
            ]))
          ),
          r && o(r.update) && 1 & n && r.update.call(null, e[0]);
      },
      i(e) {
        a || (_e(m, e), (a = !0));
      },
      o(e) {
        Se(m, e), (a = !1);
      },
      d(n) {
        n && O(t), m && m.d(n), e[9](null), (l = !1), s(u);
      },
    };
  }
  function ro(e, t, i) {
    const r = ["use", "class", "getElement"];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t;
    const l = xt(Z());
    let c,
      { use: u = [] } = t,
      { class: d = "" } = t,
      p = re("SMUI:list:graphic:menu-selection-group");
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(5, (s = m(t, r))),
          "use" in e && i(0, (u = e.use)),
          "class" in e && i(1, (d = e.class)),
          "$$scope" in e && i(7, (a = e.$$scope));
      }),
      [
        u,
        d,
        c,
        l,
        p,
        s,
        function () {
          return c;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (c = e), i(2, c);
          });
        },
      ]
    );
  }
  var so = Pt({ class: "mdc-deprecated-list-item__meta", component: mn });
  Pt({ class: "mdc-deprecated-list-group", component: cn }),
    Pt({ class: "mdc-deprecated-list-group__subheader", component: pn });
  const oo = class extends Pe {
      constructor(e) {
        super(),
          He(
            this,
            e,
            Zs,
            Ys,
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
    ao = class extends Pe {
      constructor(e) {
        super(), He(this, e, ro, io, a, { use: 0, class: 1, getElement: 6 });
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
  var lo = {
      ANIMATE: "mdc-drawer--animate",
      CLOSING: "mdc-drawer--closing",
      DISMISSIBLE: "mdc-drawer--dismissible",
      MODAL: "mdc-drawer--modal",
      OPEN: "mdc-drawer--open",
      OPENING: "mdc-drawer--opening",
      ROOT: "mdc-drawer",
    },
    co = {
      APP_CONTENT_SELECTOR: ".mdc-drawer-app-content",
      CLOSE_EVENT: "MDCDrawer:closed",
      OPEN_EVENT: "MDCDrawer:opened",
      SCRIM_SELECTOR: ".mdc-drawer-scrim",
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      LIST_ITEM_ACTIVATED_SELECTOR:
        ".mdc-list-item--activated,.mdc-deprecated-list-item--activated",
    },
    uo = (function (e) {
      function t(n) {
        var i = e.call(this, We(We({}, t.defaultAdapter), n)) || this;
        return (i.animationFrame = 0), (i.animationTimer = 0), i;
      }
      return (
        Ge(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return co;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return lo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
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
        (t.prototype.destroy = function () {
          this.animationFrame && cancelAnimationFrame(this.animationFrame),
            this.animationTimer && clearTimeout(this.animationTimer);
        }),
        (t.prototype.open = function () {
          var e = this;
          this.isOpen() ||
            this.isOpening() ||
            this.isClosing() ||
            (this.adapter.addClass(lo.OPEN),
            this.adapter.addClass(lo.ANIMATE),
            this.runNextAnimationFrame(function () {
              e.adapter.addClass(lo.OPENING);
            }),
            this.adapter.saveFocus());
        }),
        (t.prototype.close = function () {
          !this.isOpen() ||
            this.isOpening() ||
            this.isClosing() ||
            this.adapter.addClass(lo.CLOSING);
        }),
        (t.prototype.isOpen = function () {
          return this.adapter.hasClass(lo.OPEN);
        }),
        (t.prototype.isOpening = function () {
          return (
            this.adapter.hasClass(lo.OPENING) ||
            this.adapter.hasClass(lo.ANIMATE)
          );
        }),
        (t.prototype.isClosing = function () {
          return this.adapter.hasClass(lo.CLOSING);
        }),
        (t.prototype.handleKeydown = function (e) {
          var t = e.keyCode;
          ("Escape" === e.key || 27 === t) && this.close();
        }),
        (t.prototype.handleTransitionEnd = function (e) {
          var t = lo.OPENING,
            n = lo.CLOSING,
            i = lo.OPEN,
            r = lo.ANIMATE,
            s = lo.ROOT;
          this.isElement(e.target) &&
            this.adapter.elementHasClass(e.target, s) &&
            (this.isClosing()
              ? (this.adapter.removeClass(i),
                this.closed(),
                this.adapter.restoreFocus(),
                this.adapter.notifyClose())
              : (this.adapter.focusActiveNavigationItem(),
                this.opened(),
                this.adapter.notifyOpen()),
            this.adapter.removeClass(r),
            this.adapter.removeClass(t),
            this.adapter.removeClass(n));
        }),
        (t.prototype.opened = function () {}),
        (t.prototype.closed = function () {}),
        (t.prototype.runNextAnimationFrame = function (e) {
          var t = this;
          cancelAnimationFrame(this.animationFrame),
            (this.animationFrame = requestAnimationFrame(function () {
              (t.animationFrame = 0),
                clearTimeout(t.animationTimer),
                (t.animationTimer = setTimeout(e, 0));
            }));
        }),
        (t.prototype.isElement = function (e) {
          return Boolean(e.classList);
        }),
        t
      );
    })(Qe),
    po = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        Ge(t, e),
        (t.prototype.handleScrimClick = function () {
          this.close();
        }),
        (t.prototype.opened = function () {
          this.adapter.trapFocus();
        }),
        (t.prototype.closed = function () {
          this.adapter.releaseFocus();
        }),
        t
      );
    })(uo);
  function fo(e) {
    let t, i, r, a, l, u;
    const h = e[15].default,
      m = c(h, e, e[14], null);
    let g = [
        {
          class: (i = yt({
            [e[1]]: !0,
            "mdc-drawer": !0,
            "mdc-drawer--dismissible": "dismissible" === e[2],
            "mdc-drawer--modal": "modal" === e[2],
            "smui-drawer__absolute": "modal" === e[2] && !e[3],
            ...e[6],
          })),
        },
        e[8],
      ],
      $ = {};
    for (let e = 0; e < g.length; e += 1) $ = n($, g[e]);
    return {
      c() {
        (t = M("aside")), m && m.c(), H(t, $);
      },
      m(n, i) {
        L(n, t, i),
          m && m.m(t, null),
          e[16](t),
          (a = !0),
          l ||
            ((u = [
              v((r = Ct.call(null, t, e[0]))),
              v(e[7].call(null, t)),
              k(t, "keydown", e[17]),
              k(t, "transitionend", e[18]),
            ]),
            (l = !0));
      },
      p(e, [n]) {
        m &&
          m.p &&
          (!a || 16384 & n) &&
          p(m, h, e, e[14], a ? d(h, e[14], n, null) : f(e[14]), null),
          H(
            t,
            ($ = Ne(g, [
              (!a ||
                (78 & n &&
                  i !==
                    (i = yt({
                      [e[1]]: !0,
                      "mdc-drawer": !0,
                      "mdc-drawer--dismissible": "dismissible" === e[2],
                      "mdc-drawer--modal": "modal" === e[2],
                      "smui-drawer__absolute": "modal" === e[2] && !e[3],
                      ...e[6],
                    })))) && { class: i },
              256 & n && e[8],
            ]))
          ),
          r && o(r.update) && 1 & n && r.update.call(null, e[0]);
      },
      i(e) {
        a || (_e(m, e), (a = !0));
      },
      o(e) {
        Se(m, e), (a = !1);
      },
      d(n) {
        n && O(t), m && m.d(n), e[16](null), (l = !1), s(u);
      },
    };
  }
  function ho(e, t, i) {
    const r = [
      "use",
      "class",
      "variant",
      "open",
      "fixed",
      "setOpen",
      "isOpen",
      "getElement",
    ];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t;
    const { FocusTrap: l } = zn,
      c = xt(Z());
    let u,
      d,
      p,
      { use: f = [] } = t,
      { class: g = "" } = t,
      { variant: $ } = t,
      { open: y = !1 } = t,
      { fixed: v = !0 } = t,
      I = {},
      b = null,
      E = !1;
    ie("SMUI:list:nav", !0),
      ie("SMUI:list:item:nav", !0),
      ie("SMUI:list:wrapFocus", !0);
    let x = $;
    function A() {
      var e, t;
      E && E.removeEventListener("SMUIDrawerScrim:click", T),
        "modal" === $ &&
          ((E =
            null !==
              (t =
                null === (e = u.parentNode) || void 0 === e
                  ? void 0
                  : e.querySelector(".mdc-drawer-scrim")) &&
            void 0 !== t &&
            t),
          E && E.addEventListener("SMUIDrawerScrim:click", T));
      const n = "dismissible" === $ ? uo : "modal" === $ ? po : void 0;
      return n
        ? new n({
            addClass: _,
            removeClass: S,
            hasClass: C,
            elementHasClass: (e, t) => e.classList.contains(t),
            saveFocus: () => (b = document.activeElement),
            restoreFocus: () => {
              b &&
                "focus" in b &&
                u.contains(document.activeElement) &&
                b.focus();
            },
            focusActiveNavigationItem: () => {
              const e = u.querySelector(
                ".mdc-list-item--activated,.mdc-deprecated-list-item--activated"
              );
              e && e.focus();
            },
            notifyClose: () => {
              i(9, (y = !1)), vt(u, "SMUIDrawer:closed", void 0, void 0, !0);
            },
            notifyOpen: () => {
              i(9, (y = !0)), vt(u, "SMUIDrawer:opened", void 0, void 0, !0);
            },
            trapFocus: () => p.trapFocus(),
            releaseFocus: () => p.releaseFocus(),
          })
        : void 0;
    }
    function C(e) {
      return e in I ? I[e] : L().classList.contains(e);
    }
    function _(e) {
      I[e] || i(6, (I[e] = !0), I);
    }
    function S(e) {
      (e in I && !I[e]) || i(6, (I[e] = !1), I);
    }
    function T() {
      d && "handleScrimClick" in d && d.handleScrimClick();
    }
    function L() {
      return u;
    }
    ee(() => {
      (p = new l(u, { skipInitialFocus: !0 })), i(4, (d = A())), d && d.init();
    }),
      te(() => {
        d && d.destroy(),
          E && E.removeEventListener("SMUIDrawerScrim:click", T);
      });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(8, (s = m(t, r))),
          "use" in e && i(0, (f = e.use)),
          "class" in e && i(1, (g = e.class)),
          "variant" in e && i(2, ($ = e.variant)),
          "open" in e && i(9, (y = e.open)),
          "fixed" in e && i(3, (v = e.fixed)),
          "$$scope" in e && i(14, (a = e.$$scope));
      }),
      (e.$$.update = () => {
        8212 & e.$$.dirty &&
          x !== $ &&
          (i(13, (x = $)),
          d && d.destroy(),
          i(6, (I = {})),
          i(4, (d = A())),
          d && d.init()),
          528 & e.$$.dirty &&
            d &&
            d.isOpen() !== y &&
            (y ? d.open() : d.close());
      }),
      [
        f,
        g,
        $,
        v,
        d,
        u,
        I,
        c,
        s,
        y,
        function (e) {
          i(9, (y = e));
        },
        function () {
          return y;
        },
        L,
        x,
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (u = e), i(5, u);
          });
        },
        (e) => d && d.handleKeydown(e),
        (e) => d && d.handleTransitionEnd(e),
      ]
    );
  }
  class mo extends Pe {
    constructor(e) {
      super(),
        He(this, e, ho, fo, a, {
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
  var go = Pt({ class: "mdc-drawer-app-content", component: cn }),
    $o = Pt({ class: "mdc-drawer__content", component: cn });
  Pt({ class: "mdc-drawer__header", component: cn }),
    Pt({ class: "mdc-drawer__title", component: un }),
    Pt({ class: "mdc-drawer__subtitle", component: dn });
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
  var yo = {
    animation: { prefixed: "-webkit-animation", standard: "animation" },
    transform: { prefixed: "-webkit-transform", standard: "transform" },
    transition: { prefixed: "-webkit-transition", standard: "transition" },
  };
  function vo(e, t) {
    if (
      (function (e) {
        return (
          Boolean(e.document) && "function" == typeof e.document.createElement
        );
      })(e) &&
      t in yo
    ) {
      var n = e.document.createElement("div"),
        i = yo[t],
        r = i.standard,
        s = i.prefixed;
      return r in n.style ? r : s;
    }
    return t;
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
   */ var Io = {
      CLOSED_CLASS: "mdc-linear-progress--closed",
      CLOSED_ANIMATION_OFF_CLASS: "mdc-linear-progress--closed-animation-off",
      INDETERMINATE_CLASS: "mdc-linear-progress--indeterminate",
      REVERSED_CLASS: "mdc-linear-progress--reversed",
      ANIMATION_READY_CLASS: "mdc-linear-progress--animation-ready",
    },
    bo = {
      ARIA_HIDDEN: "aria-hidden",
      ARIA_VALUEMAX: "aria-valuemax",
      ARIA_VALUEMIN: "aria-valuemin",
      ARIA_VALUENOW: "aria-valuenow",
      BUFFER_BAR_SELECTOR: ".mdc-linear-progress__buffer-bar",
      FLEX_BASIS: "flex-basis",
      PRIMARY_BAR_SELECTOR: ".mdc-linear-progress__primary-bar",
    },
    Eo = 0.8367142,
    xo = 2.00611057,
    Ao = 0.37651913,
    Co = 0.84386165,
    _o = 1.60277782,
    So = (function (e) {
      function t(n) {
        var i = e.call(this, We(We({}, t.defaultAdapter), n)) || this;
        return (i.observer = null), i;
      }
      return (
        Ge(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Io;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return bo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
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
        (t.prototype.init = function () {
          var e = this;
          (this.determinate = !this.adapter.hasClass(Io.INDETERMINATE_CLASS)),
            this.adapter.addClass(Io.ANIMATION_READY_CLASS),
            (this.progress = 0),
            (this.buffer = 1),
            (this.observer = this.adapter.attachResizeObserver(function (t) {
              var n, i;
              if (!e.determinate)
                try {
                  for (var r = Xe(t), s = r.next(); !s.done; s = r.next()) {
                    var o = s.value;
                    o.contentRect &&
                      e.calculateAndSetDimensions(o.contentRect.width);
                  }
                } catch (e) {
                  n = { error: e };
                } finally {
                  try {
                    s && !s.done && (i = r.return) && i.call(r);
                  } finally {
                    if (n) throw n.error;
                  }
                }
            })),
            !this.determinate &&
              this.observer &&
              this.calculateAndSetDimensions(this.adapter.getWidth());
        }),
        (t.prototype.setDeterminate = function (e) {
          if (((this.determinate = e), this.determinate))
            return (
              this.adapter.removeClass(Io.INDETERMINATE_CLASS),
              this.adapter.setAttribute(
                bo.ARIA_VALUENOW,
                this.progress.toString()
              ),
              this.adapter.setAttribute(bo.ARIA_VALUEMAX, "1"),
              this.adapter.setAttribute(bo.ARIA_VALUEMIN, "0"),
              this.setPrimaryBarProgress(this.progress),
              void this.setBufferBarProgress(this.buffer)
            );
          this.observer &&
            this.calculateAndSetDimensions(this.adapter.getWidth()),
            this.adapter.addClass(Io.INDETERMINATE_CLASS),
            this.adapter.removeAttribute(bo.ARIA_VALUENOW),
            this.adapter.removeAttribute(bo.ARIA_VALUEMAX),
            this.adapter.removeAttribute(bo.ARIA_VALUEMIN),
            this.setPrimaryBarProgress(1),
            this.setBufferBarProgress(1);
        }),
        (t.prototype.isDeterminate = function () {
          return this.determinate;
        }),
        (t.prototype.setProgress = function (e) {
          (this.progress = e),
            this.determinate &&
              (this.setPrimaryBarProgress(e),
              this.adapter.setAttribute(bo.ARIA_VALUENOW, e.toString()));
        }),
        (t.prototype.getProgress = function () {
          return this.progress;
        }),
        (t.prototype.setBuffer = function (e) {
          (this.buffer = e), this.determinate && this.setBufferBarProgress(e);
        }),
        (t.prototype.getBuffer = function () {
          return this.buffer;
        }),
        (t.prototype.open = function () {
          this.adapter.removeClass(Io.CLOSED_CLASS),
            this.adapter.removeClass(Io.CLOSED_ANIMATION_OFF_CLASS),
            this.adapter.removeAttribute(bo.ARIA_HIDDEN);
        }),
        (t.prototype.close = function () {
          this.adapter.addClass(Io.CLOSED_CLASS),
            this.adapter.setAttribute(bo.ARIA_HIDDEN, "true");
        }),
        (t.prototype.isClosed = function () {
          return this.adapter.hasClass(Io.CLOSED_CLASS);
        }),
        (t.prototype.handleTransitionEnd = function () {
          this.adapter.hasClass(Io.CLOSED_CLASS) &&
            this.adapter.addClass(Io.CLOSED_ANIMATION_OFF_CLASS);
        }),
        (t.prototype.destroy = function () {
          e.prototype.destroy.call(this),
            this.observer && this.observer.disconnect();
        }),
        (t.prototype.restartAnimation = function () {
          this.adapter.removeClass(Io.ANIMATION_READY_CLASS),
            this.adapter.forceLayout(),
            this.adapter.addClass(Io.ANIMATION_READY_CLASS);
        }),
        (t.prototype.setPrimaryBarProgress = function (e) {
          var t = "scaleX(" + e + ")",
            n =
              "undefined" != typeof window
                ? vo(window, "transform")
                : "transform";
          this.adapter.setPrimaryBarStyle(n, t);
        }),
        (t.prototype.setBufferBarProgress = function (e) {
          var t = 100 * e + "%";
          this.adapter.setBufferBarStyle(bo.FLEX_BASIS, t);
        }),
        (t.prototype.calculateAndSetDimensions = function (e) {
          var t = e * Eo,
            n = e * xo,
            i = e * Ao,
            r = e * Co,
            s = e * _o;
          this.adapter.setStyle("--mdc-linear-progress-primary-half", t + "px"),
            this.adapter.setStyle(
              "--mdc-linear-progress-primary-half-neg",
              -t + "px"
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
              r + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-half-neg",
              -r + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-full",
              s + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-full-neg",
              -s + "px"
            ),
            this.restartAnimation();
        }),
        t
      );
    })(Qe);
  function To(t) {
    let i,
      r,
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
      b,
      E,
      x,
      A,
      C,
      S = [
        {
          class: ($ = yt({
            [t[1]]: !0,
            "mdc-linear-progress": !0,
            "mdc-linear-progress--indeterminate": t[3],
            "mdc-linear-progress--closed": t[4],
            "mdc-data-table__linear-progress": "data-table" === t[14],
            ...t[8],
          })),
        },
        { style: (y = Object.entries(t[10]).map(wo).concat([t[2]]).join(" ")) },
        { role: "progressbar" },
        { "aria-valuemin": (I = 0) },
        { "aria-valuemax": (b = 1) },
        { "aria-valuenow": (E = t[3] ? void 0 : t[5]) },
        t[9],
        t[16],
      ],
      T = {};
    for (let e = 0; e < S.length; e += 1) T = n(T, S[e]);
    return {
      c() {
        (i = M("div")),
          (r = M("div")),
          (a = M("div")),
          (c = R()),
          (u = M("div")),
          (d = R()),
          (p = M("div")),
          (f = M("span")),
          (m = R()),
          (g = M("div")),
          (g.innerHTML =
            '<span class="mdc-linear-progress__bar-inner"></span>'),
          U(a, "class", "mdc-linear-progress__buffer-bar"),
          U(a, "style", (l = Object.entries(t[11]).map(Lo).join(" "))),
          U(u, "class", "mdc-linear-progress__buffer-dots"),
          U(r, "class", "mdc-linear-progress__buffer"),
          U(f, "class", "mdc-linear-progress__bar-inner"),
          U(
            p,
            "class",
            "mdc-linear-progress__bar mdc-linear-progress__primary-bar"
          ),
          U(p, "style", (h = Object.entries(t[12]).map(Oo).join(" "))),
          U(
            g,
            "class",
            "mdc-linear-progress__bar mdc-linear-progress__secondary-bar"
          ),
          H(i, T);
      },
      m(e, n) {
        L(e, i, n),
          _(i, r),
          _(r, a),
          _(r, c),
          _(r, u),
          _(i, d),
          _(i, p),
          _(p, f),
          _(i, m),
          _(i, g),
          t[19](i),
          A ||
            ((C = [
              v((x = Ct.call(null, i, t[0]))),
              v(t[13].call(null, i)),
              k(i, "transitionend", t[20]),
            ]),
            (A = !0));
      },
      p(e, [t]) {
        2048 & t &&
          l !== (l = Object.entries(e[11]).map(Lo).join(" ")) &&
          U(a, "style", l),
          4096 & t &&
            h !== (h = Object.entries(e[12]).map(Oo).join(" ")) &&
            U(p, "style", h),
          H(
            i,
            (T = Ne(S, [
              282 & t &&
                $ !==
                  ($ = yt({
                    [e[1]]: !0,
                    "mdc-linear-progress": !0,
                    "mdc-linear-progress--indeterminate": e[3],
                    "mdc-linear-progress--closed": e[4],
                    "mdc-data-table__linear-progress": "data-table" === e[14],
                    ...e[8],
                  })) && { class: $ },
              1028 & t &&
                y !==
                  (y = Object.entries(e[10])
                    .map(wo)
                    .concat([e[2]])
                    .join(" ")) && { style: y },
              { role: "progressbar" },
              { "aria-valuemin": 0 },
              { "aria-valuemax": 1 },
              40 & t &&
                E !== (E = e[3] ? void 0 : e[5]) && { "aria-valuenow": E },
              512 & t && e[9],
              65536 & t && e[16],
            ]))
          ),
          x && o(x.update) && 1 & t && x.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && O(i), t[19](null), (A = !1), s(C);
      },
    };
  }
  const Lo = ([e, t]) => `${e}: ${t};`,
    Oo = ([e, t]) => `${e}: ${t};`,
    wo = ([e, t]) => `${e}: ${t};`;
  function Mo(e, t, i) {
    const r = [
      "use",
      "class",
      "style",
      "indeterminate",
      "closed",
      "progress",
      "buffer",
      "getElement",
    ];
    let s,
      o = m(t, r);
    const a = xt(Z());
    let c,
      u,
      { use: d = [] } = t,
      { class: p = "" } = t,
      { style: f = "" } = t,
      { indeterminate: g = !1 } = t,
      { closed: $ = !1 } = t,
      { progress: v = 0 } = t,
      { buffer: I } = t,
      b = {},
      E = {},
      x = {},
      A = {},
      C = {},
      _ = re("SMUI:linear-progress:context"),
      S = re("SMUI:linear-progress:closed");
    function T(e) {
      return e in b ? b[e] : F().classList.contains(e);
    }
    function L(e) {
      b[e] || i(8, (b[e] = !0), b);
    }
    function O(e) {
      (e in b && !b[e]) || i(8, (b[e] = !1), b);
    }
    function w(e, t) {
      E[e] !== t && i(9, (E[e] = t), E);
    }
    function M(e) {
      (e in E && null == E[e]) || i(9, (E[e] = void 0), E);
    }
    function N(e, t) {
      x[e] != t &&
        ("" === t || null == t
          ? (delete x[e], i(10, x))
          : i(10, (x[e] = t), x));
    }
    function D(e, t) {
      A[e] != t &&
        ("" === t || null == t
          ? (delete A[e], i(11, A))
          : i(11, (A[e] = t), A));
    }
    function R(e, t) {
      C[e] != t &&
        ("" === t || null == t
          ? (delete C[e], i(12, C))
          : i(12, (C[e] = t), C));
    }
    function F() {
      return c;
    }
    l(e, S, (e) => i(21, (s = e))),
      ee(
        () => (
          i(
            6,
            (u = new So({
              addClass: L,
              forceLayout: () => {
                F().getBoundingClientRect();
              },
              setBufferBarStyle: D,
              setPrimaryBarStyle: R,
              hasClass: T,
              removeAttribute: M,
              removeClass: O,
              setAttribute: w,
              setStyle: N,
              attachResizeObserver: (e) => {
                const t = window.ResizeObserver;
                if (t) {
                  const n = new t(e);
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
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(16, (o = m(t, r))),
          "use" in e && i(0, (d = e.use)),
          "class" in e && i(1, (p = e.class)),
          "style" in e && i(2, (f = e.style)),
          "indeterminate" in e && i(3, (g = e.indeterminate)),
          "closed" in e && i(4, ($ = e.closed)),
          "progress" in e && i(5, (v = e.progress)),
          "buffer" in e && i(17, (I = e.buffer));
      }),
      (e.$$.update = () => {
        16 & e.$$.dirty && S && y(S, (s = $), s),
          72 & e.$$.dirty &&
            u &&
            u.isDeterminate() !== !g &&
            u.setDeterminate(!g),
          96 & e.$$.dirty && u && u.getProgress() !== v && u.setProgress(v),
          131136 & e.$$.dirty &&
            u &&
            (null == I ? u.setBuffer(1) : u.setBuffer(I)),
          80 & e.$$.dirty && u && ($ ? u.close() : u.open());
      }),
      [
        d,
        p,
        f,
        g,
        $,
        v,
        u,
        c,
        b,
        E,
        x,
        A,
        C,
        a,
        _,
        S,
        o,
        I,
        F,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (c = e), i(7, c);
          });
        },
        () => u && u.handleTransitionEnd(),
      ]
    );
  }
  class No extends Pe {
    constructor(e) {
      super(),
        He(this, e, Mo, To, a, {
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
   */ var Do,
    Ro,
    Fo = {
      ANCHOR: "mdc-menu-surface--anchor",
      ANIMATING_CLOSED: "mdc-menu-surface--animating-closed",
      ANIMATING_OPEN: "mdc-menu-surface--animating-open",
      FIXED: "mdc-menu-surface--fixed",
      IS_OPEN_BELOW: "mdc-menu-surface--is-open-below",
      OPEN: "mdc-menu-surface--open",
      ROOT: "mdc-menu-surface",
    },
    ko = {
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
    Uo = {
      TRANSITION_OPEN_DURATION: 120,
      TRANSITION_CLOSE_DURATION: 75,
      MARGIN_TO_EDGE: 32,
      ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: 0.67,
      TOUCH_EVENT_WAIT_MS: 30,
    };
  !(function (e) {
    (e[(e.BOTTOM = 1)] = "BOTTOM"),
      (e[(e.CENTER = 2)] = "CENTER"),
      (e[(e.RIGHT = 4)] = "RIGHT"),
      (e[(e.FLIP_RTL = 8)] = "FLIP_RTL");
  })(Do || (Do = {})),
    (function (e) {
      (e[(e.TOP_LEFT = 0)] = "TOP_LEFT"),
        (e[(e.TOP_RIGHT = 4)] = "TOP_RIGHT"),
        (e[(e.BOTTOM_LEFT = 1)] = "BOTTOM_LEFT"),
        (e[(e.BOTTOM_RIGHT = 5)] = "BOTTOM_RIGHT"),
        (e[(e.TOP_START = 8)] = "TOP_START"),
        (e[(e.TOP_END = 12)] = "TOP_END"),
        (e[(e.BOTTOM_START = 9)] = "BOTTOM_START"),
        (e[(e.BOTTOM_END = 13)] = "BOTTOM_END");
    })(Ro || (Ro = {}));
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
  var Ho,
    Po = (function (e) {
      function t(n) {
        var i = e.call(this, We(We({}, t.defaultAdapter), n)) || this;
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
          (i.anchorCorner = Ro.TOP_START),
          (i.originCorner = Ro.TOP_START),
          (i.anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 }),
          (i.position = { x: 0, y: 0 }),
          i
        );
      }
      return (
        Ge(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Fo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return ko;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Uo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "Corner", {
          get: function () {
            return Ro;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
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
        (t.prototype.init = function () {
          var e = t.cssClasses,
            n = e.ROOT,
            i = e.OPEN;
          if (!this.adapter.hasClass(n))
            throw new Error(n + " class required in root element.");
          this.adapter.hasClass(i) && (this.isSurfaceOpen = !0);
        }),
        (t.prototype.destroy = function () {
          clearTimeout(this.openAnimationEndTimerId),
            clearTimeout(this.closeAnimationEndTimerId),
            cancelAnimationFrame(this.animationRequestId);
        }),
        (t.prototype.setAnchorCorner = function (e) {
          this.anchorCorner = e;
        }),
        (t.prototype.flipCornerHorizontally = function () {
          this.originCorner = this.originCorner ^ Do.RIGHT;
        }),
        (t.prototype.setAnchorMargin = function (e) {
          (this.anchorMargin.top = e.top || 0),
            (this.anchorMargin.right = e.right || 0),
            (this.anchorMargin.bottom = e.bottom || 0),
            (this.anchorMargin.left = e.left || 0);
        }),
        (t.prototype.setIsHoisted = function (e) {
          this.isHoistedElement = e;
        }),
        (t.prototype.setFixedPosition = function (e) {
          this.isFixedPosition = e;
        }),
        (t.prototype.isFixed = function () {
          return this.isFixedPosition;
        }),
        (t.prototype.setAbsolutePosition = function (e, t) {
          (this.position.x = this.isFinite(e) ? e : 0),
            (this.position.y = this.isFinite(t) ? t : 0);
        }),
        (t.prototype.setIsHorizontallyCenteredOnViewport = function (e) {
          this.isHorizontallyCenteredOnViewport = e;
        }),
        (t.prototype.setQuickOpen = function (e) {
          this.isQuickOpen = e;
        }),
        (t.prototype.setMaxHeight = function (e) {
          this.maxHeight = e;
        }),
        (t.prototype.isOpen = function () {
          return this.isSurfaceOpen;
        }),
        (t.prototype.open = function () {
          var e = this;
          this.isSurfaceOpen ||
            (this.adapter.saveFocus(),
            this.isQuickOpen
              ? ((this.isSurfaceOpen = !0),
                this.adapter.addClass(t.cssClasses.OPEN),
                (this.dimensions = this.adapter.getInnerDimensions()),
                this.autoposition(),
                this.adapter.notifyOpen())
              : (this.adapter.addClass(t.cssClasses.ANIMATING_OPEN),
                (this.animationRequestId = requestAnimationFrame(function () {
                  (e.dimensions = e.adapter.getInnerDimensions()),
                    e.autoposition(),
                    e.adapter.addClass(t.cssClasses.OPEN),
                    (e.openAnimationEndTimerId = setTimeout(function () {
                      (e.openAnimationEndTimerId = 0),
                        e.adapter.removeClass(t.cssClasses.ANIMATING_OPEN),
                        e.adapter.notifyOpen();
                    }, Uo.TRANSITION_OPEN_DURATION));
                })),
                (this.isSurfaceOpen = !0)));
        }),
        (t.prototype.close = function (e) {
          var n = this;
          if ((void 0 === e && (e = !1), this.isSurfaceOpen)) {
            if ((this.adapter.notifyClosing(), this.isQuickOpen))
              return (
                (this.isSurfaceOpen = !1),
                e || this.maybeRestoreFocus(),
                this.adapter.removeClass(t.cssClasses.OPEN),
                this.adapter.removeClass(t.cssClasses.IS_OPEN_BELOW),
                void this.adapter.notifyClose()
              );
            this.adapter.addClass(t.cssClasses.ANIMATING_CLOSED),
              requestAnimationFrame(function () {
                n.adapter.removeClass(t.cssClasses.OPEN),
                  n.adapter.removeClass(t.cssClasses.IS_OPEN_BELOW),
                  (n.closeAnimationEndTimerId = setTimeout(function () {
                    (n.closeAnimationEndTimerId = 0),
                      n.adapter.removeClass(t.cssClasses.ANIMATING_CLOSED),
                      n.adapter.notifyClose();
                  }, Uo.TRANSITION_CLOSE_DURATION));
              }),
              (this.isSurfaceOpen = !1),
              e || this.maybeRestoreFocus();
          }
        }),
        (t.prototype.handleBodyClick = function (e) {
          var t = e.target;
          this.adapter.isElementInContainer(t) || this.close();
        }),
        (t.prototype.handleKeydown = function (e) {
          var t = e.keyCode;
          ("Escape" === e.key || 27 === t) && this.close();
        }),
        (t.prototype.autoposition = function () {
          var e;
          this.measurements = this.getAutoLayoutmeasurements();
          var n = this.getoriginCorner(),
            i = this.getMenuSurfaceMaxHeight(n),
            r = this.hasBit(n, Do.BOTTOM) ? "bottom" : "top",
            s = this.hasBit(n, Do.RIGHT) ? "right" : "left",
            o = this.getHorizontalOriginOffset(n),
            a = this.getVerticalOriginOffset(n),
            l = this.measurements,
            c = l.anchorSize,
            u = l.surfaceSize,
            d = (((e = {})[s] = o), (e[r] = a), e);
          c.width / u.width > Uo.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO &&
            (s = "center"),
            (this.isHoistedElement || this.isFixedPosition) &&
              this.adjustPositionForHoistedElement(d),
            this.adapter.setTransformOrigin(s + " " + r),
            this.adapter.setPosition(d),
            this.adapter.setMaxHeight(i ? i + "px" : ""),
            this.hasBit(n, Do.BOTTOM) ||
              this.adapter.addClass(t.cssClasses.IS_OPEN_BELOW);
        }),
        (t.prototype.getAutoLayoutmeasurements = function () {
          var e = this.adapter.getAnchorDimensions(),
            t = this.adapter.getBodyDimensions(),
            n = this.adapter.getWindowDimensions(),
            i = this.adapter.getWindowScroll();
          return (
            e ||
              (e = {
                top: this.position.y,
                right: this.position.x,
                bottom: this.position.y,
                left: this.position.x,
                width: 0,
                height: 0,
              }),
            {
              anchorSize: e,
              bodySize: t,
              surfaceSize: this.dimensions,
              viewportDistance: {
                top: e.top,
                right: n.width - e.right,
                bottom: n.height - e.bottom,
                left: e.left,
              },
              viewportSize: n,
              windowScroll: i,
            }
          );
        }),
        (t.prototype.getoriginCorner = function () {
          var e,
            n,
            i = this.originCorner,
            r = this.measurements,
            s = r.viewportDistance,
            o = r.anchorSize,
            a = r.surfaceSize,
            l = t.numbers.MARGIN_TO_EDGE;
          this.hasBit(this.anchorCorner, Do.BOTTOM)
            ? ((e = s.top - l + this.anchorMargin.bottom),
              (n = s.bottom - l - this.anchorMargin.bottom))
            : ((e = s.top - l + this.anchorMargin.top),
              (n = s.bottom - l + o.height - this.anchorMargin.top)),
            !(n - a.height > 0) && e > n && (i = this.setBit(i, Do.BOTTOM));
          var c,
            u,
            d = this.adapter.isRtl(),
            p = this.hasBit(this.anchorCorner, Do.FLIP_RTL),
            f =
              this.hasBit(this.anchorCorner, Do.RIGHT) ||
              this.hasBit(i, Do.RIGHT),
            h = !1;
          (h = d && p ? !f : f)
            ? ((c = s.left + o.width + this.anchorMargin.right),
              (u = s.right - this.anchorMargin.right))
            : ((c = s.left + this.anchorMargin.left),
              (u = s.right + o.width - this.anchorMargin.left));
          var m = c - a.width > 0,
            g = u - a.width > 0,
            $ = this.hasBit(i, Do.FLIP_RTL) && this.hasBit(i, Do.RIGHT);
          return (
            (g && $ && d) || (!m && $)
              ? (i = this.unsetBit(i, Do.RIGHT))
              : ((m && h && d) || (m && !h && f) || (!g && c >= u)) &&
                (i = this.setBit(i, Do.RIGHT)),
            i
          );
        }),
        (t.prototype.getMenuSurfaceMaxHeight = function (e) {
          if (this.maxHeight > 0) return this.maxHeight;
          var n = this.measurements.viewportDistance,
            i = 0,
            r = this.hasBit(e, Do.BOTTOM),
            s = this.hasBit(this.anchorCorner, Do.BOTTOM),
            o = t.numbers.MARGIN_TO_EDGE;
          return (
            r
              ? ((i = n.top + this.anchorMargin.top - o),
                s || (i += this.measurements.anchorSize.height))
              : ((i =
                  n.bottom -
                  this.anchorMargin.bottom +
                  this.measurements.anchorSize.height -
                  o),
                s && (i -= this.measurements.anchorSize.height)),
            i
          );
        }),
        (t.prototype.getHorizontalOriginOffset = function (e) {
          var t = this.measurements.anchorSize,
            n = this.hasBit(e, Do.RIGHT),
            i = this.hasBit(this.anchorCorner, Do.RIGHT);
          if (n) {
            var r = i
              ? t.width - this.anchorMargin.left
              : this.anchorMargin.right;
            return this.isHoistedElement || this.isFixedPosition
              ? r -
                  (this.measurements.viewportSize.width -
                    this.measurements.bodySize.width)
              : r;
          }
          return i ? t.width - this.anchorMargin.right : this.anchorMargin.left;
        }),
        (t.prototype.getVerticalOriginOffset = function (e) {
          var t = this.measurements.anchorSize,
            n = this.hasBit(e, Do.BOTTOM),
            i = this.hasBit(this.anchorCorner, Do.BOTTOM);
          return n
            ? i
              ? t.height - this.anchorMargin.top
              : -this.anchorMargin.bottom
            : i
            ? t.height + this.anchorMargin.bottom
            : this.anchorMargin.top;
        }),
        (t.prototype.adjustPositionForHoistedElement = function (e) {
          var t,
            n,
            i = this.measurements,
            r = i.windowScroll,
            s = i.viewportDistance,
            o = i.surfaceSize,
            a = i.viewportSize,
            l = Object.keys(e);
          try {
            for (var c = Xe(l), u = c.next(); !u.done; u = c.next()) {
              var d = u.value,
                p = e[d] || 0;
              !this.isHorizontallyCenteredOnViewport ||
              ("left" !== d && "right" !== d)
                ? ((p += s[d]),
                  this.isFixedPosition ||
                    ("top" === d
                      ? (p += r.y)
                      : "bottom" === d
                      ? (p -= r.y)
                      : "left" === d
                      ? (p += r.x)
                      : (p -= r.x)),
                  (e[d] = p))
                : (e[d] = (a.width - o.width) / 2);
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              u && !u.done && (n = c.return) && n.call(c);
            } finally {
              if (t) throw t.error;
            }
          }
        }),
        (t.prototype.maybeRestoreFocus = function () {
          var e = this,
            t = this.adapter.isFocused(),
            n =
              document.activeElement &&
              this.adapter.isElementInContainer(document.activeElement);
          (t || n) &&
            setTimeout(function () {
              e.adapter.restoreFocus();
            }, Uo.TOUCH_EVENT_WAIT_MS);
        }),
        (t.prototype.hasBit = function (e, t) {
          return Boolean(e & t);
        }),
        (t.prototype.setBit = function (e, t) {
          return e | t;
        }),
        (t.prototype.unsetBit = function (e, t) {
          return e ^ t;
        }),
        (t.prototype.isFinite = function (e) {
          return "number" == typeof e && isFinite(e);
        }),
        t
      );
    })(Qe),
    Bo = {
      MENU_SELECTED_LIST_ITEM: "mdc-menu-item--selected",
      MENU_SELECTION_GROUP: "mdc-menu__selection-group",
      ROOT: "mdc-menu",
    },
    Vo = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_DISABLED_ATTR: "aria-disabled",
      CHECKBOX_SELECTOR: 'input[type="checkbox"]',
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      SELECTED_EVENT: "MDCMenu:selected",
      SKIP_RESTORE_FOCUS: "data-menu-item-skip-restore-focus",
    },
    jo = { FOCUS_ROOT_INDEX: -1 };
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
   */ !(function (e) {
    (e[(e.NONE = 0)] = "NONE"),
      (e[(e.LIST_ROOT = 1)] = "LIST_ROOT"),
      (e[(e.FIRST_ITEM = 2)] = "FIRST_ITEM"),
      (e[(e.LAST_ITEM = 3)] = "LAST_ITEM");
  })(Ho || (Ho = {}));
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
  var zo = (function (e) {
      function t(n) {
        var i = e.call(this, We(We({}, t.defaultAdapter), n)) || this;
        return (
          (i.closeAnimationEndTimerId = 0),
          (i.defaultFocusState = Ho.LIST_ROOT),
          (i.selectedIndex = -1),
          i
        );
      }
      return (
        Ge(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Bo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Vo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return jo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
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
        (t.prototype.destroy = function () {
          this.closeAnimationEndTimerId &&
            clearTimeout(this.closeAnimationEndTimerId),
            this.adapter.closeSurface();
        }),
        (t.prototype.handleKeydown = function (e) {
          var t = e.key,
            n = e.keyCode;
          ("Tab" === t || 9 === n) && this.adapter.closeSurface(!0);
        }),
        (t.prototype.handleItemAction = function (e) {
          var t = this,
            n = this.adapter.getElementIndex(e);
          if (!(n < 0)) {
            this.adapter.notifySelected({ index: n });
            var i =
              "true" ===
              this.adapter.getAttributeFromElementAtIndex(
                n,
                Vo.SKIP_RESTORE_FOCUS
              );
            this.adapter.closeSurface(i),
              (this.closeAnimationEndTimerId = setTimeout(function () {
                var n = t.adapter.getElementIndex(e);
                n >= 0 &&
                  t.adapter.isSelectableItemAtIndex(n) &&
                  t.setSelectedIndex(n);
              }, Po.numbers.TRANSITION_CLOSE_DURATION));
          }
        }),
        (t.prototype.handleMenuSurfaceOpened = function () {
          switch (this.defaultFocusState) {
            case Ho.FIRST_ITEM:
              this.adapter.focusItemAtIndex(0);
              break;
            case Ho.LAST_ITEM:
              this.adapter.focusItemAtIndex(
                this.adapter.getMenuItemCount() - 1
              );
              break;
            case Ho.NONE:
              break;
            default:
              this.adapter.focusListRoot();
          }
        }),
        (t.prototype.setDefaultFocusState = function (e) {
          this.defaultFocusState = e;
        }),
        (t.prototype.getSelectedIndex = function () {
          return this.selectedIndex;
        }),
        (t.prototype.setSelectedIndex = function (e) {
          if (
            (this.validatedIndex(e), !this.adapter.isSelectableItemAtIndex(e))
          )
            throw new Error(
              "MDCMenuFoundation: No selection group at specified index."
            );
          var t = this.adapter.getSelectedSiblingOfItemAtIndex(e);
          t >= 0 &&
            (this.adapter.removeAttributeFromElementAtIndex(
              t,
              Vo.ARIA_CHECKED_ATTR
            ),
            this.adapter.removeClassFromElementAtIndex(
              t,
              Bo.MENU_SELECTED_LIST_ITEM
            )),
            this.adapter.addClassToElementAtIndex(
              e,
              Bo.MENU_SELECTED_LIST_ITEM
            ),
            this.adapter.addAttributeToElementAtIndex(
              e,
              Vo.ARIA_CHECKED_ATTR,
              "true"
            ),
            (this.selectedIndex = e);
        }),
        (t.prototype.setEnabled = function (e, t) {
          this.validatedIndex(e),
            t
              ? (this.adapter.removeClassFromElementAtIndex(
                  e,
                  Ns.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  e,
                  Vo.ARIA_DISABLED_ATTR,
                  "false"
                ))
              : (this.adapter.addClassToElementAtIndex(
                  e,
                  Ns.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  e,
                  Vo.ARIA_DISABLED_ATTR,
                  "true"
                ));
        }),
        (t.prototype.validatedIndex = function (e) {
          var t = this.adapter.getMenuItemCount();
          if (!(e >= 0 && e < t))
            throw new Error(
              "MDCMenuFoundation: No list item at specified index."
            );
        }),
        t
      );
    })(Qe),
    Go = {
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
    Wo = {
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
    qo = { LABEL_SCALE: 0.75, UNSET_INDEX: -1, CLICK_DEBOUNCE_TIMEOUT_MS: 330 },
    Ko = (function (e) {
      function t(n, i) {
        void 0 === i && (i = {});
        var r = e.call(this, We(We({}, t.defaultAdapter), n)) || this;
        return (
          (r.disabled = !1),
          (r.isMenuOpen = !1),
          (r.useDefaultValidation = !0),
          (r.customValidity = !0),
          (r.lastSelectedIndex = qo.UNSET_INDEX),
          (r.clickDebounceTimeout = 0),
          (r.recentlyClicked = !1),
          (r.leadingIcon = i.leadingIcon),
          (r.helperText = i.helperText),
          r
        );
      }
      return (
        Ge(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Go;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return qo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Wo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
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
        (t.prototype.getSelectedIndex = function () {
          return this.adapter.getSelectedIndex();
        }),
        (t.prototype.setSelectedIndex = function (e, t, n) {
          void 0 === t && (t = !1),
            void 0 === n && (n = !1),
            e >= this.adapter.getMenuItemCount() ||
              (e === qo.UNSET_INDEX
                ? this.adapter.setSelectedText("")
                : this.adapter.setSelectedText(
                    this.adapter.getMenuItemTextAtIndex(e).trim()
                  ),
              this.adapter.setSelectedIndex(e),
              t && this.adapter.closeMenu(),
              n || this.lastSelectedIndex === e || this.handleChange(),
              (this.lastSelectedIndex = e));
        }),
        (t.prototype.setValue = function (e, t) {
          void 0 === t && (t = !1);
          var n = this.adapter.getMenuItemValues().indexOf(e);
          this.setSelectedIndex(n, !1, t);
        }),
        (t.prototype.getValue = function () {
          var e = this.adapter.getSelectedIndex(),
            t = this.adapter.getMenuItemValues();
          return e !== qo.UNSET_INDEX ? t[e] : "";
        }),
        (t.prototype.getDisabled = function () {
          return this.disabled;
        }),
        (t.prototype.setDisabled = function (e) {
          (this.disabled = e),
            this.disabled
              ? (this.adapter.addClass(Go.DISABLED), this.adapter.closeMenu())
              : this.adapter.removeClass(Go.DISABLED),
            this.leadingIcon && this.leadingIcon.setDisabled(this.disabled),
            this.disabled
              ? this.adapter.removeSelectAnchorAttr("tabindex")
              : this.adapter.setSelectAnchorAttr("tabindex", "0"),
            this.adapter.setSelectAnchorAttr(
              "aria-disabled",
              this.disabled.toString()
            );
        }),
        (t.prototype.openMenu = function () {
          this.adapter.addClass(Go.ACTIVATED),
            this.adapter.openMenu(),
            (this.isMenuOpen = !0),
            this.adapter.setSelectAnchorAttr("aria-expanded", "true");
        }),
        (t.prototype.setHelperTextContent = function (e) {
          this.helperText && this.helperText.setContent(e);
        }),
        (t.prototype.layout = function () {
          if (this.adapter.hasLabel()) {
            var e = this.getValue().length > 0,
              t = this.adapter.hasClass(Go.FOCUSED),
              n = e || t,
              i = this.adapter.hasClass(Go.REQUIRED);
            this.notchOutline(n),
              this.adapter.floatLabel(n),
              this.adapter.setLabelRequired(i);
          }
        }),
        (t.prototype.layoutOptions = function () {
          var e = this.adapter.getMenuItemValues().indexOf(this.getValue());
          this.setSelectedIndex(e, !1, !0);
        }),
        (t.prototype.handleMenuOpened = function () {
          if (0 !== this.adapter.getMenuItemValues().length) {
            var e = this.getSelectedIndex(),
              t = e >= 0 ? e : 0;
            this.adapter.focusMenuItemAtIndex(t);
          }
        }),
        (t.prototype.handleMenuClosing = function () {
          this.adapter.setSelectAnchorAttr("aria-expanded", "false");
        }),
        (t.prototype.handleMenuClosed = function () {
          this.adapter.removeClass(Go.ACTIVATED),
            (this.isMenuOpen = !1),
            this.adapter.isSelectAnchorFocused() || this.blur();
        }),
        (t.prototype.handleChange = function () {
          this.layout(),
            this.adapter.notifyChange(this.getValue()),
            this.adapter.hasClass(Go.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (t.prototype.handleMenuItemAction = function (e) {
          this.setSelectedIndex(e, !0);
        }),
        (t.prototype.handleFocus = function () {
          this.adapter.addClass(Go.FOCUSED),
            this.layout(),
            this.adapter.activateBottomLine();
        }),
        (t.prototype.handleBlur = function () {
          this.isMenuOpen || this.blur();
        }),
        (t.prototype.handleClick = function (e) {
          this.disabled ||
            this.recentlyClicked ||
            (this.setClickDebounceTimeout(),
            this.isMenuOpen
              ? this.adapter.closeMenu()
              : (this.adapter.setRippleCenter(e), this.openMenu()));
        }),
        (t.prototype.handleKeydown = function (e) {
          if (!this.isMenuOpen && this.adapter.hasClass(Go.FOCUSED)) {
            var t = xi(e) === qn,
              n = xi(e) === Kn,
              i = xi(e) === ei,
              r = xi(e) === ni;
            if (
              !(e.ctrlKey || e.metaKey) &&
              ((!n && e.key && 1 === e.key.length) ||
                (n && this.adapter.isTypeaheadInProgress()))
            ) {
              var s = n ? " " : e.key,
                o = this.adapter.typeaheadMatchItem(s, this.getSelectedIndex());
              return (
                o >= 0 && this.setSelectedIndex(o), void e.preventDefault()
              );
            }
            (t || n || i || r) &&
              (i && this.getSelectedIndex() > 0
                ? this.setSelectedIndex(this.getSelectedIndex() - 1)
                : r &&
                  this.getSelectedIndex() <
                    this.adapter.getMenuItemCount() - 1 &&
                  this.setSelectedIndex(this.getSelectedIndex() + 1),
              this.openMenu(),
              e.preventDefault());
          }
        }),
        (t.prototype.notchOutline = function (e) {
          if (this.adapter.hasOutline()) {
            var t = this.adapter.hasClass(Go.FOCUSED);
            if (e) {
              var n = qo.LABEL_SCALE,
                i = this.adapter.getLabelWidth() * n;
              this.adapter.notchOutline(i);
            } else t || this.adapter.closeOutline();
          }
        }),
        (t.prototype.setLeadingIconAriaLabel = function (e) {
          this.leadingIcon && this.leadingIcon.setAriaLabel(e);
        }),
        (t.prototype.setLeadingIconContent = function (e) {
          this.leadingIcon && this.leadingIcon.setContent(e);
        }),
        (t.prototype.getUseDefaultValidation = function () {
          return this.useDefaultValidation;
        }),
        (t.prototype.setUseDefaultValidation = function (e) {
          this.useDefaultValidation = e;
        }),
        (t.prototype.setValid = function (e) {
          this.useDefaultValidation || (this.customValidity = e),
            this.adapter.setSelectAnchorAttr("aria-invalid", (!e).toString()),
            e
              ? (this.adapter.removeClass(Go.INVALID),
                this.adapter.removeMenuClass(Go.MENU_INVALID))
              : (this.adapter.addClass(Go.INVALID),
                this.adapter.addMenuClass(Go.MENU_INVALID)),
            this.syncHelperTextValidity(e);
        }),
        (t.prototype.isValid = function () {
          return this.useDefaultValidation &&
            this.adapter.hasClass(Go.REQUIRED) &&
            !this.adapter.hasClass(Go.DISABLED)
            ? this.getSelectedIndex() !== qo.UNSET_INDEX &&
                (0 !== this.getSelectedIndex() || Boolean(this.getValue()))
            : this.customValidity;
        }),
        (t.prototype.setRequired = function (e) {
          e
            ? this.adapter.addClass(Go.REQUIRED)
            : this.adapter.removeClass(Go.REQUIRED),
            this.adapter.setSelectAnchorAttr("aria-required", e.toString()),
            this.adapter.setLabelRequired(e);
        }),
        (t.prototype.getRequired = function () {
          return "true" === this.adapter.getSelectAnchorAttr("aria-required");
        }),
        (t.prototype.init = function () {
          var e = this.adapter.getAnchorElement();
          e &&
            (this.adapter.setMenuAnchorElement(e),
            this.adapter.setMenuAnchorCorner(Ro.BOTTOM_START)),
            this.adapter.setMenuWrapFocus(!1),
            this.setDisabled(this.adapter.hasClass(Go.DISABLED)),
            this.syncHelperTextValidity(!this.adapter.hasClass(Go.INVALID)),
            this.layout(),
            this.layoutOptions();
        }),
        (t.prototype.blur = function () {
          this.adapter.removeClass(Go.FOCUSED),
            this.layout(),
            this.adapter.deactivateBottomLine(),
            this.adapter.hasClass(Go.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (t.prototype.syncHelperTextValidity = function (e) {
          if (this.helperText) {
            this.helperText.setValidity(e);
            var t = this.helperText.isVisible(),
              n = this.helperText.getId();
            t && n
              ? this.adapter.setSelectAnchorAttr(Wo.ARIA_DESCRIBEDBY, n)
              : this.adapter.removeSelectAnchorAttr(Wo.ARIA_DESCRIBEDBY);
          }
        }),
        (t.prototype.setClickDebounceTimeout = function () {
          var e = this;
          clearTimeout(this.clickDebounceTimeout),
            (this.clickDebounceTimeout = setTimeout(function () {
              e.recentlyClicked = !1;
            }, qo.CLICK_DEBOUNCE_TIMEOUT_MS)),
            (this.recentlyClicked = !0);
        }),
        t
      );
    })(Qe),
    Xo = { ARIA_HIDDEN: "aria-hidden", ROLE: "role" },
    Yo = {
      HELPER_TEXT_VALIDATION_MSG: "mdc-select-helper-text--validation-msg",
      HELPER_TEXT_VALIDATION_MSG_PERSISTENT:
        "mdc-select-helper-text--validation-msg-persistent",
    },
    Qo = (function (e) {
      function t(n) {
        return e.call(this, We(We({}, t.defaultAdapter), n)) || this;
      }
      return (
        Ge(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Yo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Xo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
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
        (t.prototype.getId = function () {
          return this.adapter.getAttr("id");
        }),
        (t.prototype.isVisible = function () {
          return "true" !== this.adapter.getAttr(Xo.ARIA_HIDDEN);
        }),
        (t.prototype.setContent = function (e) {
          this.adapter.setContent(e);
        }),
        (t.prototype.setValidation = function (e) {
          e
            ? this.adapter.addClass(Yo.HELPER_TEXT_VALIDATION_MSG)
            : this.adapter.removeClass(Yo.HELPER_TEXT_VALIDATION_MSG);
        }),
        (t.prototype.setValidationMsgPersistent = function (e) {
          e
            ? this.adapter.addClass(Yo.HELPER_TEXT_VALIDATION_MSG_PERSISTENT)
            : this.adapter.removeClass(
                Yo.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
              );
        }),
        (t.prototype.setValidity = function (e) {
          if (this.adapter.hasClass(Yo.HELPER_TEXT_VALIDATION_MSG)) {
            var t = this.adapter.hasClass(
              Yo.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
            );
            if (!e || t)
              return (
                this.showToScreenReader(),
                void (e
                  ? this.adapter.removeAttr(Xo.ROLE)
                  : this.adapter.setAttr(Xo.ROLE, "alert"))
              );
            this.adapter.removeAttr(Xo.ROLE), this.hide();
          }
        }),
        (t.prototype.showToScreenReader = function () {
          this.adapter.removeAttr(Xo.ARIA_HIDDEN);
        }),
        (t.prototype.hide = function () {
          this.adapter.setAttr(Xo.ARIA_HIDDEN, "true");
        }),
        t
      );
    })(Qe);
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
   */ const { document: Jo } = Le;
  function Zo(e) {
    let t, i, r, a, l, u, h, m;
    const g = e[31].default,
      $ = c(g, e, e[30], null);
    let y = [
        {
          class: (r = yt({
            [e[2]]: !0,
            "mdc-menu-surface": !0,
            "mdc-menu-surface--fixed": e[5],
            "mdc-menu-surface--open": e[4],
            "smui-menu-surface--static": e[4],
            "mdc-menu-surface--fullwidth": e[7],
            ...e[10],
          })),
        },
        { style: (a = Object.entries(e[11]).map(ea).concat([e[3]]).join(" ")) },
        e[13],
      ],
      I = {};
    for (let e = 0; e < y.length; e += 1) I = n(I, y[e]);
    return {
      c() {
        (t = R()), (i = M("div")), $ && $.c(), H(i, I);
      },
      m(n, r) {
        L(n, t, r),
          L(n, i, r),
          $ && $.m(i, null),
          e[33](i),
          (u = !0),
          h ||
            ((m = [
              k(Jo.body, "click", e[32], !0),
              v((l = Ct.call(null, i, e[1]))),
              v(e[12].call(null, i)),
              k(i, "keydown", e[34]),
            ]),
            (h = !0));
      },
      p(e, t) {
        $ &&
          $.p &&
          (!u || 1073741824 & t[0]) &&
          p($, g, e, e[30], u ? d(g, e[30], t, null) : f(e[30]), null),
          H(
            i,
            (I = Ne(y, [
              (!u ||
                (1204 & t[0] &&
                  r !==
                    (r = yt({
                      [e[2]]: !0,
                      "mdc-menu-surface": !0,
                      "mdc-menu-surface--fixed": e[5],
                      "mdc-menu-surface--open": e[4],
                      "smui-menu-surface--static": e[4],
                      "mdc-menu-surface--fullwidth": e[7],
                      ...e[10],
                    })))) && { class: r },
              (!u ||
                (2056 & t[0] &&
                  a !==
                    (a = Object.entries(e[11])
                      .map(ea)
                      .concat([e[3]])
                      .join(" ")))) && { style: a },
              8192 & t[0] && e[13],
            ]))
          ),
          l && o(l.update) && 2 & t[0] && l.update.call(null, e[1]);
      },
      i(e) {
        u || (_e($, e), (u = !0));
      },
      o(e) {
        Se($, e), (u = !1);
      },
      d(n) {
        n && O(t), n && O(i), $ && $.d(n), e[33](null), (h = !1), s(m);
      },
    };
  }
  const ea = ([e, t]) => `${e}: ${t};`;
  function ta(e, t, i) {
    const r = [
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
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t;
    var l, c, u;
    const d = xt(Z());
    let p,
      f,
      g,
      { use: $ = [] } = t,
      { class: y = "" } = t,
      { style: v = "" } = t,
      { static: I = !1 } = t,
      { anchor: b = !0 } = t,
      { fixed: E = !1 } = t,
      { open: x = I } = t,
      { managed: A = !1 } = t,
      { fullWidth: C = !1 } = t,
      { quickOpen: _ = !1 } = t,
      { anchorElement: S } = t,
      { anchorCorner: T } = t,
      { anchorMargin: L = { top: 0, right: 0, bottom: 0, left: 0 } } = t,
      { maxHeight: O = 0 } = t,
      { horizontallyCenteredOnViewport: w = !1 } = t,
      M = {},
      N = {};
    ie("SMUI:list:role", "menu"), ie("SMUI:list:item:role", "menuitem");
    const D = Ro;
    function R(e) {
      return e in M ? M[e] : H().classList.contains(e);
    }
    function F(e) {
      M[e] || i(10, (M[e] = !0), M);
    }
    function k(e) {
      (e in M && !M[e]) || i(10, (M[e] = !1), M);
    }
    function U(e) {
      f.close(e), i(0, (x = !1));
    }
    function H() {
      return p;
    }
    ee(() => {
      i(
        9,
        (f = new Po({
          addClass: F,
          removeClass: k,
          hasClass: R,
          hasAnchor: () => !!S,
          notifyClose: () => {
            A || i(0, (x = I)),
              x || vt(p, "SMUIMenuSurface:closed", void 0, void 0, !0);
          },
          notifyClosing: () => {
            A || i(0, (x = I)),
              x || vt(p, "SMUIMenuSurface:closing", void 0, void 0, !0);
          },
          notifyOpen: () => {
            A || i(0, (x = !0)),
              x && vt(p, "SMUIMenuSurface:opened", void 0, void 0, !0);
          },
          isElementInContainer: (e) => p.contains(e),
          isRtl: () =>
            "rtl" === getComputedStyle(p).getPropertyValue("direction"),
          setTransformOrigin: (e) => {
            i(11, (N["transform-origin"] = e), N);
          },
          isFocused: () => document.activeElement === p,
          saveFocus: () => {
            var e;
            g =
              null !== (e = document.activeElement) && void 0 !== e
                ? e
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
          setPosition: (e) => {
            i(11, (N.left = "left" in e ? `${e.left}px` : ""), N),
              i(11, (N.right = "right" in e ? `${e.right}px` : ""), N),
              i(11, (N.top = "top" in e ? `${e.top}px` : ""), N),
              i(11, (N.bottom = "bottom" in e ? `${e.bottom}px` : ""), N);
          },
          setMaxHeight: (e) => {
            i(11, (N["max-height"] = e), N);
          },
        }))
      );
      return (
        vt(p, "SMUIMenuSurface:mount", {
          get open() {
            return x;
          },
          set open(e) {
            i(0, (x = e));
          },
          closeProgrammatic: U,
        }),
        f.init(),
        () => {
          var e;
          const t = f.isHoistedElement;
          f.destroy(),
            t &&
              (null === (e = p.parentNode) || void 0 === e || e.removeChild(p));
        }
      );
    }),
      te(() => {
        var e;
        b &&
          p &&
          (null === (e = p.parentElement) ||
            void 0 === e ||
            e.classList.remove("mdc-menu-surface--anchor"));
      });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(13, (s = m(t, r))),
          "use" in e && i(1, ($ = e.use)),
          "class" in e && i(2, (y = e.class)),
          "style" in e && i(3, (v = e.style)),
          "static" in e && i(4, (I = e.static)),
          "anchor" in e && i(15, (b = e.anchor)),
          "fixed" in e && i(5, (E = e.fixed)),
          "open" in e && i(0, (x = e.open)),
          "managed" in e && i(6, (A = e.managed)),
          "fullWidth" in e && i(7, (C = e.fullWidth)),
          "quickOpen" in e && i(16, (_ = e.quickOpen)),
          "anchorElement" in e && i(14, (S = e.anchorElement)),
          "anchorCorner" in e && i(17, (T = e.anchorCorner)),
          "anchorMargin" in e && i(18, (L = e.anchorMargin)),
          "maxHeight" in e && i(19, (O = e.maxHeight)),
          "horizontallyCenteredOnViewport" in e &&
            i(20, (w = e.horizontallyCenteredOnViewport)),
          "$$scope" in e && i(30, (a = e.$$scope));
      }),
      (e.$$.update = () => {
        939557120 & e.$$.dirty[0] &&
          p &&
          b &&
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
          513 & e.$$.dirty[0] &&
            f &&
            f.isOpen() !== x &&
            (x ? f.open() : f.close()),
          66048 & e.$$.dirty[0] && f && f.setQuickOpen(_),
          544 & e.$$.dirty[0] && f && f.setFixedPosition(E),
          524800 & e.$$.dirty[0] && f && f.setMaxHeight(O),
          1049088 & e.$$.dirty[0] &&
            f &&
            f.setIsHorizontallyCenteredOnViewport(w),
          131584 & e.$$.dirty[0] &&
            f &&
            null != T &&
            ("string" == typeof T
              ? f.setAnchorCorner(D[T])
              : f.setAnchorCorner(T)),
          262656 & e.$$.dirty[0] && f && f.setAnchorMargin(L);
      }),
      [
        x,
        $,
        y,
        v,
        I,
        E,
        A,
        C,
        p,
        f,
        M,
        N,
        d,
        s,
        S,
        b,
        _,
        T,
        L,
        O,
        w,
        function () {
          return x;
        },
        function (e) {
          i(0, (x = e));
        },
        function (e, t) {
          return f.setAbsolutePosition(e, t);
        },
        function (e) {
          return f.setIsHoisted(e);
        },
        function () {
          return f.isFixed();
        },
        H,
        l,
        c,
        u,
        a,
        o,
        (e) => f && x && !A && f.handleBodyClick(e),
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (p = e), i(8, p);
          });
        },
        (e) => f && f.handleKeydown(e),
      ]
    );
  }
  class na extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          ta,
          Zo,
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
  function ia(
    e,
    {
      addClass: t = (t) => e.classList.add(t),
      removeClass: n = (t) => e.classList.remove(t),
    } = {}
  ) {
    return (
      t("mdc-menu-surface--anchor"),
      {
        destroy() {
          n("mdc-menu-surface--anchor");
        },
      }
    );
  }
  function ra(e) {
    let t;
    const n = e[17].default,
      i = c(n, e, e[22], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 4194304 & r) &&
          p(i, n, e, e[22], t ? d(n, e[22], r, null) : f(e[22]), null);
      },
      i(e) {
        t || (_e(i, e), (t = !0));
      },
      o(e) {
        Se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function sa(e) {
    let t, i, r;
    const s = [
      { use: e[5] },
      { class: yt({ [e[1]]: !0, "mdc-menu": !0 }) },
      e[9],
    ];
    function o(t) {
      e[19](t);
    }
    let a = { $$slots: { default: [ra] }, $$scope: { ctx: e } };
    for (let e = 0; e < s.length; e += 1) a = n(a, s[e]);
    return (
      void 0 !== e[0] && (a.open = e[0]),
      (t = new na({ props: a })),
      e[18](t),
      ae.push(() => Re(t, "open", o)),
      t.$on("SMUIMenuSurface:mount", e[7]),
      t.$on("SMUIList:mount", e[8]),
      t.$on("SMUIMenuSurface:opened", e[20]),
      t.$on("keydown", e[6]),
      t.$on("SMUIList:action", e[21]),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (r = !0);
        },
        p(e, [n]) {
          const r =
            546 & n
              ? Ne(s, [
                  32 & n && { use: e[5] },
                  2 & n && { class: yt({ [e[1]]: !0, "mdc-menu": !0 }) },
                  512 & n && De(e[9]),
                ])
              : {};
          4194304 & n && (r.$$scope = { dirty: n, ctx: e }),
            !i && 1 & n && ((i = !0), (r.open = e[0]), he(() => (i = !1))),
            t.$set(r);
        },
        i(e) {
          r || (_e(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[18](null), Ue(t, n);
        },
      }
    );
  }
  function oa(e, t, i) {
    let r;
    const s = [
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
    let o = m(t, s),
      { $$slots: a = {}, $$scope: l } = t;
    const { closest: c } = tt,
      u = xt(Z());
    let d,
      p,
      f,
      g,
      { use: $ = [] } = t,
      { class: y = "" } = t,
      { open: v = !1 } = t;
    function I() {
      return d.getElement();
    }
    ee(
      () => (
        i(
          3,
          (p = new zo({
            addClassToElementAtIndex: (e, t) => {
              g.addClassForElementIndex(e, t);
            },
            removeClassFromElementAtIndex: (e, t) => {
              g.removeClassForElementIndex(e, t);
            },
            addAttributeToElementAtIndex: (e, t, n) => {
              g.setAttributeForElementIndex(e, t, n);
            },
            removeAttributeFromElementAtIndex: (e, t) => {
              g.removeAttributeForElementIndex(e, t);
            },
            getAttributeFromElementAtIndex: (e, t) =>
              g.getAttributeFromElementIndex(e, t),
            elementContainsClass: (e, t) => e.classList.contains(t),
            closeSurface: (e) => f.closeProgrammatic(e),
            getElementIndex: (e) =>
              g
                .getOrderedList()
                .map((e) => e.element)
                .indexOf(e),
            notifySelected: (e) =>
              vt(
                I(),
                "SMUIMenu:selected",
                { index: e.index, item: g.getOrderedList()[e.index].element },
                void 0,
                !0
              ),
            getMenuItemCount: () => g.items.length,
            focusItemAtIndex: (e) => g.focusItemAtIndex(e),
            focusListRoot: () => "focus" in g.element && g.element.focus(),
            isSelectableItemAtIndex: (e) =>
              !!c(g.getOrderedList()[e].element, `.${Bo.MENU_SELECTION_GROUP}`),
            getSelectedSiblingOfItemAtIndex: (e) => {
              const t = g.getOrderedList(),
                n = c(t[e].element, `.${Bo.MENU_SELECTION_GROUP}`),
                i =
                  null == n
                    ? void 0
                    : n.querySelector(`.${Bo.MENU_SELECTED_LIST_ITEM}`);
              return i ? t.map((e) => e.element).indexOf(i) : -1;
            },
          }))
        ),
        vt(I(), "SMUIMenu:mount", p),
        p.init(),
        () => {
          p.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(9, (o = m(t, s))),
          "use" in e && i(10, ($ = e.use)),
          "class" in e && i(1, (y = e.class)),
          "open" in e && i(0, (v = e.open)),
          "$$scope" in e && i(22, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        1024 & e.$$.dirty && i(5, (r = [u, ...$]));
      }),
      [
        v,
        y,
        d,
        p,
        g,
        r,
        function (e) {
          p && p.handleKeydown(e);
        },
        function (e) {
          f || (f = e.detail);
        },
        function (e) {
          g || i(4, (g = e.detail));
        },
        o,
        $,
        function () {
          return v;
        },
        function (e) {
          i(0, (v = e));
        },
        function (e) {
          p.setDefaultFocusState(e);
        },
        function () {
          return p.getSelectedIndex();
        },
        function () {
          return d;
        },
        I,
        a,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (d = e), i(2, d);
          });
        },
        function (e) {
          (v = e), i(0, v);
        },
        () => p && p.handleMenuSurfaceOpened(),
        (e) =>
          p && p.handleItemAction(g.getOrderedList()[e.detail.index].element),
        l,
      ]
    );
  }
  class aa extends Pe {
    constructor(e) {
      super(),
        He(this, e, oa, sa, a, {
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
  function la(t) {
    let n;
    return {
      c() {
        n = D(t[8]);
      },
      m(e, t) {
        L(e, n, t);
      },
      p(e, t) {
        256 & t && P(n, e[8]);
      },
      i: e,
      o: e,
      d(e) {
        e && O(n);
      },
    };
  }
  function ca(e) {
    let t;
    const n = e[13].default,
      i = c(n, e, e[12], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 4096 & r) &&
          p(i, n, e, e[12], t ? d(n, e[12], r, null) : f(e[12]), null);
      },
      i(e) {
        t || (_e(i, e), (t = !0));
      },
      o(e) {
        Se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function ua(e) {
    let t, i, r, a, l, c, u, d, p;
    const f = [ca, la],
      h = [];
    function m(e, t) {
      return null == e[8] ? 0 : 1;
    }
    (i = m(e)), (r = h[i] = f[i](e));
    let g = [
        {
          class: (a = yt({
            [e[1]]: !0,
            "mdc-select-helper-text": !0,
            "mdc-select-helper-text--validation-msg": e[4],
            "mdc-select-helper-text--validation-msg-persistent": e[3],
            ...e[6],
          })),
        },
        { "aria-hidden": (l = e[3] ? void 0 : "true") },
        { id: e[2] },
        e[7],
        e[10],
      ],
      $ = {};
    for (let e = 0; e < g.length; e += 1) $ = n($, g[e]);
    return {
      c() {
        (t = M("div")), r.c(), H(t, $);
      },
      m(n, r) {
        L(n, t, r),
          h[i].m(t, null),
          e[14](t),
          (u = !0),
          d ||
            ((p = [v((c = Ct.call(null, t, e[0]))), v(e[9].call(null, t))]),
            (d = !0));
      },
      p(e, [n]) {
        let s = i;
        (i = m(e)),
          i === s
            ? h[i].p(e, n)
            : (Ae(),
              Se(h[s], 1, 1, () => {
                h[s] = null;
              }),
              Ce(),
              (r = h[i]),
              r ? r.p(e, n) : ((r = h[i] = f[i](e)), r.c()),
              _e(r, 1),
              r.m(t, null)),
          H(
            t,
            ($ = Ne(g, [
              (!u ||
                (90 & n &&
                  a !==
                    (a = yt({
                      [e[1]]: !0,
                      "mdc-select-helper-text": !0,
                      "mdc-select-helper-text--validation-msg": e[4],
                      "mdc-select-helper-text--validation-msg-persistent": e[3],
                      ...e[6],
                    })))) && { class: a },
              (!u || (8 & n && l !== (l = e[3] ? void 0 : "true"))) && {
                "aria-hidden": l,
              },
              (!u || 4 & n) && { id: e[2] },
              128 & n && e[7],
              1024 & n && e[10],
            ]))
          ),
          c && o(c.update) && 1 & n && c.update.call(null, e[0]);
      },
      i(e) {
        u || (_e(r), (u = !0));
      },
      o(e) {
        Se(r), (u = !1);
      },
      d(n) {
        n && O(t), h[i].d(), e[14](null), (d = !1), s(p);
      },
    };
  }
  Pt({ class: "mdc-menu__selection-group-icon", component: ao });
  let da = 0;
  function pa(e, t, i) {
    const r = [
      "use",
      "class",
      "id",
      "persistent",
      "validationMsg",
      "getElement",
    ];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t;
    const l = xt(Z());
    let c,
      u,
      d,
      { use: p = [] } = t,
      { class: f = "" } = t,
      { id: g = "SMUI-select-helper-text-" + da++ } = t,
      { persistent: $ = !1 } = t,
      { validationMsg: y = !1 } = t,
      v = {},
      I = {};
    function b(e) {
      return e in v ? v[e] : S().classList.contains(e);
    }
    function E(e) {
      v[e] || i(6, (v[e] = !0), v);
    }
    function x(e) {
      (e in v && !v[e]) || i(6, (v[e] = !1), v);
    }
    function A(e) {
      var t;
      return e in I
        ? null !== (t = I[e]) && void 0 !== t
          ? t
          : null
        : S().getAttribute(e);
    }
    function C(e, t) {
      I[e] !== t && i(7, (I[e] = t), I);
    }
    function _(e) {
      (e in I && null == I[e]) || i(7, (I[e] = void 0), I);
    }
    function S() {
      return c;
    }
    return (
      ee(
        () => (
          (u = new Qo({
            addClass: E,
            removeClass: x,
            hasClass: b,
            getAttr: A,
            setAttr: C,
            removeAttr: _,
            setContent: (e) => {
              i(8, (d = e));
            },
          })),
          g.startsWith("SMUI-select-helper-text-") &&
            vt(S(), "SMUISelectHelperText:id", g),
          vt(S(), "SMUISelectHelperText:mount", u),
          u.init(),
          () => {
            vt(S(), "SMUISelectHelperText:unmount", u), u.destroy();
          }
        )
      ),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(10, (s = m(t, r))),
          "use" in e && i(0, (p = e.use)),
          "class" in e && i(1, (f = e.class)),
          "id" in e && i(2, (g = e.id)),
          "persistent" in e && i(3, ($ = e.persistent)),
          "validationMsg" in e && i(4, (y = e.validationMsg)),
          "$$scope" in e && i(12, (a = e.$$scope));
      }),
      [
        p,
        f,
        g,
        $,
        y,
        c,
        v,
        I,
        d,
        l,
        s,
        S,
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (c = e), i(5, c);
          });
        },
      ]
    );
  }
  class fa extends Pe {
    constructor(e) {
      super(),
        He(this, e, pa, ua, a, {
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
  const ha = (e) => ({}),
    ma = (e) => ({}),
    ga = (e) => ({}),
    $a = (e) => ({}),
    ya = (e) => ({}),
    va = (e) => ({}),
    Ia = (e) => ({}),
    ba = (e) => ({});
  function Ea(e) {
    let t,
      i = [
        { type: "hidden" },
        { required: e[10] },
        { disabled: e[6] },
        { value: e[0] },
        At(e[53], "input$"),
      ],
      r = {};
    for (let e = 0; e < i.length; e += 1) r = n(r, i[e]);
    return {
      c() {
        (t = M("input")), H(t, r);
      },
      m(e, n) {
        L(e, t, n), t.autofocus && t.focus();
      },
      p(e, n) {
        H(
          t,
          (r = Ne(i, [
            { type: "hidden" },
            1024 & n[0] && { required: e[10] },
            64 & n[0] && { disabled: e[6] },
            1 & n[0] && { value: e[0] },
            4194304 & n[1] && At(e[53], "input$"),
          ]))
        );
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function xa(e) {
    let t;
    return {
      c() {
        (t = M("span")), U(t, "class", "mdc-select__ripple");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Aa(e) {
    let t, i;
    const r = [
      { id: e[11] + "-smui-label" },
      { floatAbove: "" !== e[43] },
      { required: e[10] },
      At(e[53], "label$"),
    ];
    let s = { $$slots: { default: [Ca] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new Pi({ props: s })),
      e[66](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i =
            (3072 & n[0]) | (4198400 & n[1])
              ? Ne(r, [
                  2048 & n[0] && { id: e[11] + "-smui-label" },
                  4096 & n[1] && { floatAbove: "" !== e[43] },
                  1024 & n[0] && { required: e[10] },
                  4194304 & n[1] && De(At(e[53], "label$")),
                ])
              : {};
          (512 & n[0]) | (134217728 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          i || (_e(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[66](null), Ue(t, n);
        },
      }
    );
  }
  function Ca(e) {
    let t,
      n,
      i = (null == e[9] ? "" : e[9]) + "";
    const r = e[63].label,
      s = c(r, e, e[89], ba);
    return {
      c() {
        (t = D(i)), s && s.c();
      },
      m(e, i) {
        L(e, t, i), s && s.m(e, i), (n = !0);
      },
      p(e, o) {
        (!n || 512 & o[0]) &&
          i !== (i = (null == e[9] ? "" : e[9]) + "") &&
          P(t, i),
          s &&
            s.p &&
            (!n || 134217728 & o[2]) &&
            p(s, r, e, e[89], n ? d(r, e[89], o, Ia) : f(e[89]), ba);
      },
      i(e) {
        n || (_e(s, e), (n = !0));
      },
      o(e) {
        Se(s, e), (n = !1);
      },
      d(e) {
        e && O(t), s && s.d(e);
      },
    };
  }
  function _a(e) {
    let t, i;
    const r = [
      { noLabel: e[8] || (null == e[9] && !e[52].label) },
      At(e[53], "outline$"),
    ];
    let s = { $$slots: { default: [La] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new Xi({ props: s })),
      e[68](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i =
            (768 & n[0]) | (6291456 & n[1])
              ? Ne(r, [
                  (768 & n[0]) | (2097152 & n[1]) && {
                    noLabel: e[8] || (null == e[9] && !e[52].label),
                  },
                  4194304 & n[1] && De(At(e[53], "outline$")),
                ])
              : {};
          (3840 & n[0]) | (6296064 & n[1]) | (134217728 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          i || (_e(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[68](null), Ue(t, n);
        },
      }
    );
  }
  function Sa(e) {
    let t, i;
    const r = [
      { id: e[11] + "-smui-label" },
      { floatAbove: "" !== e[43] },
      { required: e[10] },
      At(e[53], "label$"),
    ];
    let s = { $$slots: { default: [Ta] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new Pi({ props: s })),
      e[67](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i =
            (3072 & n[0]) | (4198400 & n[1])
              ? Ne(r, [
                  2048 & n[0] && { id: e[11] + "-smui-label" },
                  4096 & n[1] && { floatAbove: "" !== e[43] },
                  1024 & n[0] && { required: e[10] },
                  4194304 & n[1] && De(At(e[53], "label$")),
                ])
              : {};
          (512 & n[0]) | (134217728 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          i || (_e(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[67](null), Ue(t, n);
        },
      }
    );
  }
  function Ta(e) {
    let t,
      n,
      i = (null == e[9] ? "" : e[9]) + "";
    const r = e[63].label,
      s = c(r, e, e[89], va);
    return {
      c() {
        (t = D(i)), s && s.c();
      },
      m(e, i) {
        L(e, t, i), s && s.m(e, i), (n = !0);
      },
      p(e, o) {
        (!n || 512 & o[0]) &&
          i !== (i = (null == e[9] ? "" : e[9]) + "") &&
          P(t, i),
          s &&
            s.p &&
            (!n || 134217728 & o[2]) &&
            p(s, r, e, e[89], n ? d(r, e[89], o, ya) : f(e[89]), va);
      },
      i(e) {
        n || (_e(s, e), (n = !0));
      },
      o(e) {
        Se(s, e), (n = !1);
      },
      d(e) {
        e && O(t), s && s.d(e);
      },
    };
  }
  function La(e) {
    let t,
      n,
      i = !e[8] && (null != e[9] || e[52].label) && Sa(e);
    return {
      c() {
        i && i.c(), (t = F());
      },
      m(e, r) {
        i && i.m(e, r), L(e, t, r), (n = !0);
      },
      p(e, n) {
        e[8] || (null == e[9] && !e[52].label)
          ? i &&
            (Ae(),
            Se(i, 1, 1, () => {
              i = null;
            }),
            Ce())
          : i
          ? (i.p(e, n), (768 & n[0]) | (2097152 & n[1]) && _e(i, 1))
          : ((i = Sa(e)), i.c(), _e(i, 1), i.m(t.parentNode, t));
      },
      i(e) {
        n || (_e(i), (n = !0));
      },
      o(e) {
        Se(i), (n = !1);
      },
      d(e) {
        i && i.d(e), e && O(t);
      },
    };
  }
  function Oa(e) {
    let t, i;
    const r = [At(e[53], "ripple$")];
    let s = {};
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new zi({ props: s })),
      e[70](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i = 4194304 & n[1] ? Ne(r, [De(At(e[53], "ripple$"))]) : {};
          t.$set(i);
        },
        i(e) {
          i || (_e(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[70](null), Ue(t, n);
        },
      }
    );
  }
  function wa(e) {
    let t;
    const n = e[63].default,
      i = c(n, e, e[89], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 134217728 & r[2]) &&
          p(i, n, e, e[89], t ? d(n, e[89], r, null) : f(e[89]), null);
      },
      i(e) {
        t || (_e(i, e), (t = !0));
      },
      o(e) {
        Se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Ma(e) {
    let t, i, r;
    const s = [{ role: "listbox" }, { wrapFocus: e[36] }, At(e[53], "list$")];
    function o(t) {
      e[76](t);
    }
    let a = { $$slots: { default: [wa] }, $$scope: { ctx: e } };
    for (let e = 0; e < s.length; e += 1) a = n(a, s[e]);
    return (
      void 0 !== e[24] && (a.selectedIndex = e[24]),
      (t = new qs({ props: a })),
      ae.push(() => Re(t, "selectedIndex", o)),
      t.$on("SMUIList:mount", e[77]),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (r = !0);
        },
        p(e, n) {
          const r =
            4194336 & n[1]
              ? Ne(s, [
                  s[0],
                  32 & n[1] && { wrapFocus: e[36] },
                  4194304 & n[1] && De(At(e[53], "list$")),
                ])
              : {};
          134217728 & n[2] && (r.$$scope = { dirty: n, ctx: e }),
            !i &&
              16777216 & n[0] &&
              ((i = !0), (r.selectedIndex = e[24]), he(() => (i = !1))),
            t.$set(r);
        },
        i(e) {
          r || (_e(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Na(e) {
    let t, i;
    const r = [At(e[53], "helperText$")];
    let s = { $$slots: { default: [Da] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new fa({ props: s })),
      t.$on("SMUISelectHelperText:id", e[86]),
      t.$on("SMUISelectHelperText:mount", e[87]),
      t.$on("SMUISelectHelperText:unmount", e[88]),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i = 4194304 & n[1] ? Ne(r, [De(At(e[53], "helperText$"))]) : {};
          134217728 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          i || (_e(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Da(e) {
    let t;
    const n = e[63].helperText,
      i = c(n, e, e[89], ma);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 134217728 & r[2]) &&
          p(i, n, e, e[89], t ? d(n, e[89], r, ha) : f(e[89]), ma);
      },
      i(e) {
        t || (_e(i, e), (t = !0));
      },
      o(e) {
        Se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Ra(e) {
    let t,
      i,
      r,
      a,
      l,
      u,
      h,
      m,
      g,
      $,
      y,
      I,
      b,
      E,
      x,
      A,
      C,
      S,
      T,
      w,
      B,
      V,
      j,
      z,
      G,
      W,
      q,
      K,
      X,
      Y,
      Q,
      J,
      Z,
      ee,
      te,
      ne,
      ie,
      re,
      se,
      oe,
      le = e[12] && Ea(e),
      ce = "filled" === e[7] && xa(),
      ue =
        "outlined" !== e[7] && !e[8] && (null != e[9] || e[52].label) && Aa(e),
      de = "outlined" === e[7] && _a(e);
    const pe = e[63].leadingIcon,
      fe = c(pe, e, e[89], $a);
    let me = [
        { id: (y = e[11] + "-smui-selected-text") },
        { class: (I = yt({ [e[19]]: !0, "mdc-select__selected-text": !0 })) },
        { role: "button" },
        { "aria-haspopup": "listbox" },
        { "aria-labelledby": (b = e[11] + "-smui-label") },
        At(e[53], "selectedText$"),
      ],
      ge = {};
    for (let e = 0; e < me.length; e += 1) ge = n(ge, me[e]);
    let $e = [
        {
          class: (x = yt({
            [e[17]]: !0,
            "mdc-select__selected-text-container": !0,
          })),
        },
        At(e[53], "selectedTextContainer$"),
      ],
      ye = {};
    for (let e = 0; e < $e.length; e += 1) ye = n(ye, $e[e]);
    let ve = [
        { class: (V = yt({ [e[21]]: !0, "mdc-select__dropdown-icon": !0 })) },
        At(e[53], "dropdownIcon$"),
      ],
      Ie = {};
    for (let e = 0; e < ve.length; e += 1) Ie = n(Ie, ve[e]);
    let be = "outlined" !== e[7] && e[5] && Oa(e),
      Ee = [
        { class: (G = yt({ [e[15]]: !0, "mdc-select__anchor": !0 })) },
        { "aria-required": (W = e[10] ? "true" : void 0) },
        { "aria-disabled": (q = e[6] ? "true" : void 0) },
        { "aria-controls": e[31] },
        { "aria-describedby": e[31] },
        e[29],
        At(e[53], "anchor$"),
      ],
      xe = {};
    for (let e = 0; e < Ee.length; e += 1) xe = n(xe, Ee[e]);
    const Te = [
      { class: yt({ [e[22]]: !0, "mdc-select__menu": !0, ...e[33] }) },
      { fullWidth: !0 },
      { anchor: !1 },
      { anchorElement: e[34] },
      { anchorCorner: e[35] },
      At(e[53], "menu$"),
    ];
    function Le(t) {
      e[78](t);
    }
    let Oe = { $$slots: { default: [Ma] }, $$scope: { ctx: e } };
    for (let e = 0; e < Te.length; e += 1) Oe = n(Oe, Te[e]);
    void 0 !== e[32] && (Oe.open = e[32]),
      (Y = new aa({ props: Oe })),
      ae.push(() => Re(Y, "open", Le)),
      Y.$on("SMUIMenu:selected", e[79]),
      Y.$on("SMUIMenuSurface:closing", e[80]),
      Y.$on("SMUIMenuSurface:closed", e[81]),
      Y.$on("SMUIMenuSurface:opened", e[82]);
    let we = [
        {
          class: (J = yt({
            [e[3]]: !0,
            "mdc-select": !0,
            "mdc-select--required": e[10],
            "mdc-select--disabled": e[6],
            "mdc-select--filled": "filled" === e[7],
            "mdc-select--outlined": "outlined" === e[7],
            "smui-select--standard": "standard" === e[7],
            "mdc-select--with-leading-icon": e[45](e[13])
              ? e[52].leadingIcon
              : e[13],
            "mdc-select--no-label": e[8] || (null == e[9] && !e[52].label),
            "mdc-select--invalid": e[1],
            "mdc-select--activated": e[32],
            "mdc-data-table__pagination-rows-per-page-select":
              "data-table:pagination" === e[46],
            ...e[26],
          })),
        },
        { style: (Z = Object.entries(e[27]).map(ka).concat([e[4]]).join(" ")) },
        It(e[53], [
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
      Me = {};
    for (let e = 0; e < we.length; e += 1) Me = n(Me, we[e]);
    let He = e[52].helperText && Na(e);
    return {
      c() {
        (t = M("div")),
          le && le.c(),
          (i = R()),
          (r = M("div")),
          ce && ce.c(),
          (a = R()),
          ue && ue.c(),
          (l = R()),
          de && de.c(),
          (u = R()),
          fe && fe.c(),
          (h = R()),
          (m = M("span")),
          (g = M("span")),
          ($ = D(e[43])),
          (C = R()),
          (S = M("span")),
          (T = N("svg")),
          (w = N("polygon")),
          (B = N("polygon")),
          (z = R()),
          be && be.c(),
          (X = R()),
          Fe(Y.$$.fragment),
          (ne = R()),
          He && He.c(),
          (ie = F()),
          H(g, ge),
          H(m, ye),
          U(w, "class", "mdc-select__dropdown-icon-inactive"),
          U(w, "stroke", "none"),
          U(w, "fill-rule", "evenodd"),
          U(w, "points", "7 10 12 15 17 10"),
          U(B, "class", "mdc-select__dropdown-icon-active"),
          U(B, "stroke", "none"),
          U(B, "fill-rule", "evenodd"),
          U(B, "points", "7 15 12 10 17 15"),
          U(T, "class", "mdc-select__dropdown-icon-graphic"),
          U(T, "viewBox", "7 10 10 5"),
          U(T, "focusable", "false"),
          H(S, Ie),
          H(r, xe),
          H(t, Me);
      },
      m(n, s) {
        L(n, t, s),
          le && le.m(t, null),
          _(t, i),
          _(t, r),
          ce && ce.m(r, null),
          _(r, a),
          ue && ue.m(r, null),
          _(r, l),
          de && de.m(r, null),
          _(r, u),
          fe && fe.m(r, null),
          _(r, h),
          _(r, m),
          _(m, g),
          _(g, $),
          e[69](g),
          _(r, C),
          _(r, S),
          _(S, T),
          _(T, w),
          _(T, B),
          _(r, z),
          be && be.m(r, null),
          e[71](r),
          _(t, X),
          ke(Y, t, null),
          e[83](t),
          L(n, ne, s),
          He && He.m(n, s),
          L(n, ie, s),
          (re = !0),
          se ||
            ((oe = [
              v((E = Ct.call(null, g, e[18]))),
              v((A = Ct.call(null, m, e[16]))),
              v((j = Ct.call(null, S, e[20]))),
              v((K = Ct.call(null, r, e[14]))),
              k(r, "focus", e[72]),
              k(r, "blur", e[73]),
              k(r, "click", e[74]),
              k(r, "keydown", e[75]),
              k(r, "focus", e[64]),
              k(r, "blur", e[65]),
              v(
                (ee = Ni.call(null, t, {
                  ripple: "filled" === e[7],
                  unbounded: !1,
                  addClass: e[49],
                  removeClass: e[50],
                  addStyle: e[51],
                }))
              ),
              v(ia.call(null, t, { addClass: e[49], removeClass: e[50] })),
              v((te = Ct.call(null, t, e[2]))),
              v(e[44].call(null, t)),
              k(t, "SMUISelectLeadingIcon:mount", e[84]),
              k(t, "SMUISelectLeadingIcon:unmount", e[85]),
            ]),
            (se = !0));
      },
      p(e, n) {
        e[12]
          ? le
            ? le.p(e, n)
            : ((le = Ea(e)), le.c(), le.m(t, i))
          : le && (le.d(1), (le = null)),
          "filled" === e[7]
            ? ce || ((ce = xa()), ce.c(), ce.m(r, a))
            : ce && (ce.d(1), (ce = null)),
          "outlined" === e[7] || e[8] || (null == e[9] && !e[52].label)
            ? ue &&
              (Ae(),
              Se(ue, 1, 1, () => {
                ue = null;
              }),
              Ce())
            : ue
            ? (ue.p(e, n), (896 & n[0]) | (2097152 & n[1]) && _e(ue, 1))
            : ((ue = Aa(e)), ue.c(), _e(ue, 1), ue.m(r, l)),
          "outlined" === e[7]
            ? de
              ? (de.p(e, n), 128 & n[0] && _e(de, 1))
              : ((de = _a(e)), de.c(), _e(de, 1), de.m(r, u))
            : de &&
              (Ae(),
              Se(de, 1, 1, () => {
                de = null;
              }),
              Ce()),
          fe &&
            fe.p &&
            (!re || 134217728 & n[2]) &&
            p(fe, pe, e, e[89], re ? d(pe, e[89], n, ga) : f(e[89]), $a),
          (!re || 4096 & n[1]) && P($, e[43]),
          H(
            g,
            (ge = Ne(me, [
              (!re ||
                (2048 & n[0] && y !== (y = e[11] + "-smui-selected-text"))) && {
                id: y,
              },
              (!re ||
                (524288 & n[0] &&
                  I !==
                    (I = yt({
                      [e[19]]: !0,
                      "mdc-select__selected-text": !0,
                    })))) && { class: I },
              { role: "button" },
              { "aria-haspopup": "listbox" },
              (!re || (2048 & n[0] && b !== (b = e[11] + "-smui-label"))) && {
                "aria-labelledby": b,
              },
              4194304 & n[1] && At(e[53], "selectedText$"),
            ]))
          ),
          E && o(E.update) && 262144 & n[0] && E.update.call(null, e[18]),
          H(
            m,
            (ye = Ne($e, [
              (!re ||
                (131072 & n[0] &&
                  x !==
                    (x = yt({
                      [e[17]]: !0,
                      "mdc-select__selected-text-container": !0,
                    })))) && { class: x },
              4194304 & n[1] && At(e[53], "selectedTextContainer$"),
            ]))
          ),
          A && o(A.update) && 65536 & n[0] && A.update.call(null, e[16]),
          H(
            S,
            (Ie = Ne(ve, [
              (!re ||
                (2097152 & n[0] &&
                  V !==
                    (V = yt({
                      [e[21]]: !0,
                      "mdc-select__dropdown-icon": !0,
                    })))) && { class: V },
              4194304 & n[1] && At(e[53], "dropdownIcon$"),
            ]))
          ),
          j && o(j.update) && 1048576 & n[0] && j.update.call(null, e[20]),
          "outlined" !== e[7] && e[5]
            ? be
              ? (be.p(e, n), 160 & n[0] && _e(be, 1))
              : ((be = Oa(e)), be.c(), _e(be, 1), be.m(r, null))
            : be &&
              (Ae(),
              Se(be, 1, 1, () => {
                be = null;
              }),
              Ce()),
          H(
            r,
            (xe = Ne(Ee, [
              (!re ||
                (32768 & n[0] &&
                  G !==
                    (G = yt({ [e[15]]: !0, "mdc-select__anchor": !0 })))) && {
                class: G,
              },
              (!re || (1024 & n[0] && W !== (W = e[10] ? "true" : void 0))) && {
                "aria-required": W,
              },
              (!re || (64 & n[0] && q !== (q = e[6] ? "true" : void 0))) && {
                "aria-disabled": q,
              },
              (!re || 1 & n[1]) && { "aria-controls": e[31] },
              (!re || 1 & n[1]) && { "aria-describedby": e[31] },
              536870912 & n[0] && e[29],
              4194304 & n[1] && At(e[53], "anchor$"),
            ]))
          ),
          K && o(K.update) && 16384 & n[0] && K.update.call(null, e[14]);
        const s =
          (4194304 & n[0]) | (4194332 & n[1])
            ? Ne(Te, [
                (4194304 & n[0]) | (4 & n[1]) && {
                  class: yt({ [e[22]]: !0, "mdc-select__menu": !0, ...e[33] }),
                },
                Te[1],
                Te[2],
                8 & n[1] && { anchorElement: e[34] },
                16 & n[1] && { anchorCorner: e[35] },
                4194304 & n[1] && De(At(e[53], "menu$")),
              ])
            : {};
        (16777216 & n[0]) | (4194400 & n[1]) | (134217728 & n[2]) &&
          (s.$$scope = { dirty: n, ctx: e }),
          !Q && 2 & n[1] && ((Q = !0), (s.open = e[32]), he(() => (Q = !1))),
          Y.$set(s),
          H(
            t,
            (Me = Ne(we, [
              (!re ||
                ((67119050 & n[0]) | (2097154 & n[1]) &&
                  J !==
                    (J = yt({
                      [e[3]]: !0,
                      "mdc-select": !0,
                      "mdc-select--required": e[10],
                      "mdc-select--disabled": e[6],
                      "mdc-select--filled": "filled" === e[7],
                      "mdc-select--outlined": "outlined" === e[7],
                      "smui-select--standard": "standard" === e[7],
                      "mdc-select--with-leading-icon": e[45](e[13])
                        ? e[52].leadingIcon
                        : e[13],
                      "mdc-select--no-label":
                        e[8] || (null == e[9] && !e[52].label),
                      "mdc-select--invalid": e[1],
                      "mdc-select--activated": e[32],
                      "mdc-data-table__pagination-rows-per-page-select":
                        "data-table:pagination" === e[46],
                      ...e[26],
                    })))) && { class: J },
              (!re ||
                (134217744 & n[0] &&
                  Z !==
                    (Z = Object.entries(e[27])
                      .map(ka)
                      .concat([e[4]])
                      .join(" ")))) && { style: Z },
              4194304 & n[1] &&
                It(e[53], [
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
          ee &&
            o(ee.update) &&
            128 & n[0] &&
            ee.update.call(null, {
              ripple: "filled" === e[7],
              unbounded: !1,
              addClass: e[49],
              removeClass: e[50],
              addStyle: e[51],
            }),
          te && o(te.update) && 4 & n[0] && te.update.call(null, e[2]),
          e[52].helperText
            ? He
              ? (He.p(e, n), 2097152 & n[1] && _e(He, 1))
              : ((He = Na(e)), He.c(), _e(He, 1), He.m(ie.parentNode, ie))
            : He &&
              (Ae(),
              Se(He, 1, 1, () => {
                He = null;
              }),
              Ce());
      },
      i(e) {
        re ||
          (_e(ue),
          _e(de),
          _e(fe, e),
          _e(be),
          _e(Y.$$.fragment, e),
          _e(He),
          (re = !0));
      },
      o(e) {
        Se(ue),
          Se(de),
          Se(fe, e),
          Se(be),
          Se(Y.$$.fragment, e),
          Se(He),
          (re = !1);
      },
      d(n) {
        n && O(t),
          le && le.d(),
          ce && ce.d(),
          ue && ue.d(),
          de && de.d(),
          fe && fe.d(n),
          e[69](null),
          be && be.d(),
          e[71](null),
          Ue(Y),
          e[83](null),
          n && O(ne),
          He && He.d(n),
          n && O(ie),
          (se = !1),
          s(oe);
      },
    };
  }
  let Fa = 0;
  const ka = ([e, t]) => `${e}: ${t};`;
  function Ua(e, t, i) {
    const r = [
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
    let s,
      o,
      a = m(t, r),
      { $$slots: c = {}, $$scope: u } = t;
    const d = g(c),
      p = xt(Z());
    let f = () => {};
    function $(e) {
      return e === f;
    }
    let { use: v = [] } = t,
      { class: I = "" } = t,
      { style: b = "" } = t,
      { ripple: E = !0 } = t,
      { disabled: x = !1 } = t,
      { variant: A = "standard" } = t,
      { noLabel: C = !1 } = t,
      { label: _ } = t,
      { value: S = "" } = t,
      { key: T = (e) => e } = t,
      { dirty: L = !1 } = t,
      { invalid: O = f } = t,
      { updateInvalid: w = $(O) } = t;
    const M = $(O);
    $(O) && (O = !1);
    let N,
      D,
      R,
      F,
      k,
      U,
      H,
      P,
      B,
      V,
      j,
      z,
      G,
      W,
      { required: q = !1 } = t,
      { inputId: K = "SMUI-select-" + Fa++ } = t,
      { hiddenInput: X = !1 } = t,
      { withLeadingIcon: Y = f } = t,
      { anchor$use: Q = [] } = t,
      { anchor$class: J = "" } = t,
      { selectedTextContainer$use: ne = [] } = t,
      { selectedTextContainer$class: oe = "" } = t,
      { selectedText$use: le = [] } = t,
      { selectedText$class: ce = "" } = t,
      { dropdownIcon$use: ue = [] } = t,
      { dropdownIcon$class: de = "" } = t,
      { menu$class: pe = "" } = t,
      fe = {},
      he = {},
      me = {},
      ge = -1,
      $e = re("SMUI:addLayoutListener"),
      ye = !1,
      ve = {},
      Ie = !1,
      be = re("SMUI:select:context");
    ie("SMUI:list:role", ""), ie("SMUI:list:nav", !1);
    const Ee = $t("");
    l(e, Ee, (e) => i(43, (s = e))), ie("SMUI:select:selectedText", Ee);
    const xe = $t(S);
    l(e, xe, (e) => i(91, (o = e))), ie("SMUI:select:value", xe);
    let Ae = ge;
    function Ce(e) {
      return e in fe ? fe[e] : Fe().classList.contains(e);
    }
    function _e(e) {
      fe[e] || i(26, (fe[e] = !0), fe);
    }
    function Se(e) {
      (e in fe && !fe[e]) || i(26, (fe[e] = !1), fe);
    }
    function Te(e) {
      ve[e] || i(33, (ve[e] = !0), ve);
    }
    function Le(e) {
      (e in ve && !ve[e]) || i(33, (ve[e] = !1), ve);
    }
    function Oe(e) {
      var t;
      return e in me
        ? null !== (t = me[e]) && void 0 !== t
          ? t
          : null
        : Fe().getAttribute(e);
    }
    function we(e, t) {
      me[e] !== t && i(29, (me[e] = t), me);
    }
    function Me(e) {
      (e in me && null == me[e]) || i(29, (me[e] = void 0), me);
    }
    function Ne() {
      return B.getOrderedList().map((e) => e.getValue());
    }
    function De(e) {
      D.setUseDefaultValidation(e);
    }
    function Re() {
      D.layout();
    }
    function Fe() {
      return N;
    }
    $e && (U = $e(Re)),
      ee(
        () => (
          i(
            23,
            (D = new Ko(
              {
                setSelectedText: (e) => {
                  y(Ee, (s = e), s);
                },
                isSelectAnchorFocused: () => document.activeElement === R,
                getSelectAnchorAttr: Oe,
                setSelectAnchorAttr: we,
                removeSelectAnchorAttr: Me,
                addMenuClass: Te,
                removeMenuClass: Le,
                openMenu: () => {
                  i(32, (ye = !0));
                },
                closeMenu: () => {
                  i(32, (ye = !1));
                },
                getAnchorElement: () => R,
                setMenuAnchorElement: (e) => {
                  i(34, (H = e));
                },
                setMenuAnchorCorner: (e) => {
                  i(35, (P = e));
                },
                setMenuWrapFocus: (e) => {
                  i(36, (Ie = e));
                },
                getSelectedIndex: () => ge,
                setSelectedIndex: (e) => {
                  i(62, (Ae = e)), i(24, (ge = e)), i(0, (S = Ne()[ge]));
                },
                focusMenuItemAtIndex: (e) => {
                  B.focusItemAtIndex(e);
                },
                getMenuItemCount: () => B.items.length,
                getMenuItemValues: () => Ne().map(T),
                getMenuItemTextAtIndex: (e) => B.getPrimaryTextAtIndex(e),
                isTypeaheadInProgress: () => B.typeaheadInProgress,
                typeaheadMatchItem: (e, t) => B.typeaheadMatchItem(e, t),
                addClass: _e,
                removeClass: Se,
                hasClass: Ce,
                setRippleCenter: (e) => G && G.setRippleCenter(e),
                activateBottomLine: () => G && G.activate(),
                deactivateBottomLine: () => G && G.deactivate(),
                notifyChange: (e) => {
                  i(54, (L = !0)),
                    w && i(1, (O = !D.isValid())),
                    vt(
                      Fe(),
                      "SMUISelect:change",
                      { value: S, index: ge },
                      void 0,
                      !0
                    );
                },
                hasOutline: () => !!W,
                notchOutline: (e) => W && W.notch(e),
                closeOutline: () => W && W.closeNotch(),
                hasLabel: () => !!z,
                floatLabel: (e) => z && z.float(e),
                getLabelWidth: () => (z ? z.getWidth() : 0),
                setLabelRequired: (e) => z && z.setRequired(e),
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
          i(24, (ge = Ne().indexOf(S))),
          D.init(),
          De(M),
          () => {
            D.destroy();
          }
        )
      ),
      te(() => {
        U && U();
      });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(53, (a = m(t, r))),
          "use" in e && i(2, (v = e.use)),
          "class" in e && i(3, (I = e.class)),
          "style" in e && i(4, (b = e.style)),
          "ripple" in e && i(5, (E = e.ripple)),
          "disabled" in e && i(6, (x = e.disabled)),
          "variant" in e && i(7, (A = e.variant)),
          "noLabel" in e && i(8, (C = e.noLabel)),
          "label" in e && i(9, (_ = e.label)),
          "value" in e && i(0, (S = e.value)),
          "key" in e && i(55, (T = e.key)),
          "dirty" in e && i(54, (L = e.dirty)),
          "invalid" in e && i(1, (O = e.invalid)),
          "updateInvalid" in e && i(56, (w = e.updateInvalid)),
          "required" in e && i(10, (q = e.required)),
          "inputId" in e && i(11, (K = e.inputId)),
          "hiddenInput" in e && i(12, (X = e.hiddenInput)),
          "withLeadingIcon" in e && i(13, (Y = e.withLeadingIcon)),
          "anchor$use" in e && i(14, (Q = e.anchor$use)),
          "anchor$class" in e && i(15, (J = e.anchor$class)),
          "selectedTextContainer$use" in e &&
            i(16, (ne = e.selectedTextContainer$use)),
          "selectedTextContainer$class" in e &&
            i(17, (oe = e.selectedTextContainer$class)),
          "selectedText$use" in e && i(18, (le = e.selectedText$use)),
          "selectedText$class" in e && i(19, (ce = e.selectedText$class)),
          "dropdownIcon$use" in e && i(20, (ue = e.dropdownIcon$use)),
          "dropdownIcon$class" in e && i(21, (de = e.dropdownIcon$class)),
          "menu$class" in e && i(22, (pe = e.menu$class)),
          "$$scope" in e && i(89, (u = e.$$scope));
      }),
      (e.$$.update = () => {
        if ((25165825 & e.$$.dirty[0]) | (1 & e.$$.dirty[2]) && Ae !== ge)
          if ((i(62, (Ae = ge)), D)) D.setSelectedIndex(ge, !1, !0);
          else {
            const e = Ne();
            S !== e[ge] && i(0, (S = e[ge]));
          }
        1 & e.$$.dirty[0] && y(xe, (o = S), o),
          (8388609 & e.$$.dirty[0]) | (16777216 & e.$$.dirty[1]) &&
            D &&
            D.getValue() !== T(S) &&
            D.setValue(T(S)),
          8388672 & e.$$.dirty[0] &&
            D &&
            D.getDisabled() !== x &&
            D.setDisabled(x),
          (8388610 & e.$$.dirty[0]) | (41943040 & e.$$.dirty[1]) &&
            D &&
            L &&
            D.isValid() !== !O &&
            (w ? i(1, (O = !D.isValid())) : D.setValid(!O)),
          8389632 & e.$$.dirty[0] &&
            D &&
            D.getRequired() !== q &&
            D.setRequired(q);
      }),
      [
        S,
        O,
        v,
        I,
        b,
        E,
        x,
        A,
        C,
        _,
        q,
        K,
        X,
        Y,
        Q,
        J,
        ne,
        oe,
        le,
        ce,
        ue,
        de,
        pe,
        D,
        ge,
        N,
        fe,
        he,
        R,
        me,
        F,
        k,
        ye,
        ve,
        H,
        P,
        Ie,
        B,
        V,
        j,
        z,
        G,
        W,
        s,
        p,
        $,
        be,
        Ee,
        xe,
        _e,
        Se,
        function (e, t) {
          he[e] != t &&
            ("" === t || null == t
              ? (delete he[e], i(27, he))
              : i(27, (he[e] = t), he));
        },
        d,
        a,
        L,
        T,
        w,
        function () {
          return D.getUseDefaultValidation();
        },
        De,
        function () {
          R.focus();
        },
        Re,
        Fe,
        Ae,
        c,
        function (t) {
          se.call(this, e, t);
        },
        function (t) {
          se.call(this, e, t);
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (z = e), i(40, z);
          });
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (z = e), i(40, z);
          });
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (W = e), i(42, W);
          });
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (F = e), i(30, F);
          });
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (G = e), i(41, G);
          });
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (R = e), i(28, R);
          });
        },
        () => D && D.handleFocus(),
        () => D && D.handleBlur(),
        (e) => {
          R.focus(),
            D &&
              D.handleClick(
                (function (e) {
                  const t = e.currentTarget.getBoundingClientRect();
                  return (
                    ((function (e) {
                      return "touches" in e;
                    })(e)
                      ? e.touches[0].clientX
                      : e.clientX) - t.left
                  );
                })(e)
              );
        },
        (e) => D && D.handleKeydown(e),
        function (e) {
          (ge = e), i(24, ge);
        },
        (e) => i(37, (B = e.detail)),
        function (e) {
          (ye = e), i(32, ye);
        },
        (e) => D && D.handleMenuItemAction(e.detail.index),
        () => D && D.handleMenuClosing(),
        () => D && D.handleMenuClosed(),
        () => D && D.handleMenuOpened(),
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (N = e), i(25, N);
          });
        },
        (e) => i(38, (V = e.detail)),
        () => i(38, (V = void 0)),
        (e) => i(31, (k = e.detail)),
        (e) => i(39, (j = e.detail)),
        () => {
          i(31, (k = void 0)), i(39, (j = void 0));
        },
        u,
      ]
    );
  }
  class Ha extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          Ua,
          Ra,
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
  function Pa(e) {
    let t;
    const n = e[11].default,
      i = c(n, e, e[13], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 8192 & r) &&
          p(i, n, e, e[13], t ? d(n, e[13], r, null) : f(e[13]), null);
      },
      i(e) {
        t || (_e(i, e), (t = !0));
      },
      o(e) {
        Se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Ba(e) {
    let t, i;
    const r = [
      { use: e[3] },
      { "data-value": e[0] },
      { value: e[0] },
      { selected: e[2] },
      e[6],
    ];
    let s = { $$slots: { default: [Pa] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new oo({ props: s })),
      e[12](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, [n]) {
          const i =
            77 & n
              ? Ne(r, [
                  8 & n && { use: e[3] },
                  1 & n && { "data-value": e[0] },
                  1 & n && { value: e[0] },
                  4 & n && { selected: e[2] },
                  64 & n && De(e[6]),
                ])
              : {};
          8192 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          i || (_e(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[12](null), Ue(t, n);
        },
      }
    );
  }
  function Va(e, t, i) {
    let r, s;
    const o = ["use", "class", "value", "getElement"];
    let a,
      c,
      u = m(t, o),
      { $$slots: d = {}, $$scope: p } = t;
    const f = xt(Z());
    let { use: g = [] } = t;
    let $,
      { value: v = "" } = t;
    const I = re("SMUI:select:selectedText");
    l(e, I, (e) => i(14, (a = e)));
    const b = re("SMUI:select:value");
    function E() {
      s && $ && y(I, (a = $.getPrimaryText()), a);
    }
    return (
      l(e, b, (e) => i(10, (c = e))),
      ie("SMUI:list:item:role", "option"),
      ee(E),
      te(E),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(6, (u = m(t, o))),
          "use" in e && i(7, (g = e.use)),
          "value" in e && i(0, (v = e.value)),
          "$$scope" in e && i(13, (p = e.$$scope));
      }),
      (e.$$.update = () => {
        128 & e.$$.dirty && i(3, (r = [f, ...g])),
          1025 & e.$$.dirty && i(2, (s = null != v && "" !== v && c === v));
      }),
      [
        v,
        $,
        s,
        r,
        I,
        b,
        u,
        g,
        "",
        function () {
          return $.getElement();
        },
        c,
        d,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            ($ = e), i(1, $);
          });
        },
        p,
      ]
    );
  }
  const ja = class extends Pe {
    constructor(e) {
      super(),
        He(this, e, Va, Ba, a, { use: 7, class: 8, value: 0, getElement: 9 });
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
  var za,
    Ga = (function () {
      function e() {
        this.rafIDs = new Map();
      }
      return (
        (e.prototype.request = function (e, t) {
          var n = this;
          this.cancel(e);
          var i = requestAnimationFrame(function (i) {
            n.rafIDs.delete(e), t(i);
          });
          this.rafIDs.set(e, i);
        }),
        (e.prototype.cancel = function (e) {
          var t = this.rafIDs.get(e);
          t && (cancelAnimationFrame(t), this.rafIDs.delete(e));
        }),
        (e.prototype.cancelAll = function () {
          var e = this;
          this.rafIDs.forEach(function (t, n) {
            e.cancel(n);
          });
        }),
        (e.prototype.getQueue = function () {
          var e = [];
          return (
            this.rafIDs.forEach(function (t, n) {
              e.push(n);
            }),
            e
          );
        }),
        e
      );
    })(),
    Wa = {
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
    qa = {
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
    Ka = {
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
   */ !(function (e) {
    (e.POLL_SCROLL_POS = "poll_scroll_position"),
      (e.POLL_LAYOUT_CHANGE = "poll_layout_change");
  })(za || (za = {}));
  var Xa = (function (e) {
    function t(n) {
      var i = e.call(this, We(We({}, t.defaultAdapter), n)) || this;
      return (
        (i.dialogOpen = !1),
        (i.isFullscreen = !1),
        (i.animationFrame = 0),
        (i.animationTimer = 0),
        (i.escapeKeyAction = qa.CLOSE_ACTION),
        (i.scrimClickAction = qa.CLOSE_ACTION),
        (i.autoStackButtons = !0),
        (i.areButtonsStacked = !1),
        (i.suppressDefaultPressSelector = qa.SUPPRESS_DEFAULT_PRESS_SELECTOR),
        (i.animFrame = new Ga()),
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
      Ge(t, e),
      Object.defineProperty(t, "cssClasses", {
        get: function () {
          return Wa;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "strings", {
        get: function () {
          return qa;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "numbers", {
        get: function () {
          return Ka;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "defaultAdapter", {
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
      (t.prototype.init = function () {
        this.adapter.hasClass(Wa.STACKED) && this.setAutoStackButtons(!1),
          (this.isFullscreen = this.adapter.hasClass(Wa.FULLSCREEN));
      }),
      (t.prototype.destroy = function () {
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
      (t.prototype.open = function (e) {
        var t = this;
        (this.dialogOpen = !0),
          this.adapter.notifyOpening(),
          this.adapter.addClass(Wa.OPENING),
          this.isFullscreen &&
            this.adapter.registerContentEventHandler(
              "scroll",
              this.contentScrollHandler
            ),
          e &&
            e.isAboveFullscreenDialog &&
            this.adapter.addClass(Wa.SCRIM_HIDDEN),
          this.adapter.registerWindowEventHandler(
            "resize",
            this.windowResizeHandler
          ),
          this.adapter.registerWindowEventHandler(
            "orientationchange",
            this.windowOrientationChangeHandler
          ),
          this.runNextAnimationFrame(function () {
            t.adapter.addClass(Wa.OPEN),
              t.adapter.addBodyClass(Wa.SCROLL_LOCK),
              t.layout(),
              (t.animationTimer = setTimeout(function () {
                t.handleAnimationTimerEnd(),
                  t.adapter.trapFocus(t.adapter.getInitialFocusEl()),
                  t.adapter.notifyOpened();
              }, Ka.DIALOG_ANIMATION_OPEN_TIME_MS));
          });
      }),
      (t.prototype.close = function (e) {
        var t = this;
        void 0 === e && (e = ""),
          this.dialogOpen &&
            ((this.dialogOpen = !1),
            this.adapter.notifyClosing(e),
            this.adapter.addClass(Wa.CLOSING),
            this.adapter.removeClass(Wa.OPEN),
            this.adapter.removeBodyClass(Wa.SCROLL_LOCK),
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
              t.adapter.releaseFocus(),
                t.handleAnimationTimerEnd(),
                t.adapter.notifyClosed(e);
            }, Ka.DIALOG_ANIMATION_CLOSE_TIME_MS)));
      }),
      (t.prototype.showSurfaceScrim = function () {
        var e = this;
        this.adapter.addClass(Wa.SURFACE_SCRIM_SHOWING),
          this.runNextAnimationFrame(function () {
            e.adapter.addClass(Wa.SURFACE_SCRIM_SHOWN);
          });
      }),
      (t.prototype.hideSurfaceScrim = function () {
        this.adapter.removeClass(Wa.SURFACE_SCRIM_SHOWN),
          this.adapter.addClass(Wa.SURFACE_SCRIM_HIDING);
      }),
      (t.prototype.handleSurfaceScrimTransitionEnd = function () {
        this.adapter.removeClass(Wa.SURFACE_SCRIM_HIDING),
          this.adapter.removeClass(Wa.SURFACE_SCRIM_SHOWING);
      }),
      (t.prototype.isOpen = function () {
        return this.dialogOpen;
      }),
      (t.prototype.getEscapeKeyAction = function () {
        return this.escapeKeyAction;
      }),
      (t.prototype.setEscapeKeyAction = function (e) {
        this.escapeKeyAction = e;
      }),
      (t.prototype.getScrimClickAction = function () {
        return this.scrimClickAction;
      }),
      (t.prototype.setScrimClickAction = function (e) {
        this.scrimClickAction = e;
      }),
      (t.prototype.getAutoStackButtons = function () {
        return this.autoStackButtons;
      }),
      (t.prototype.setAutoStackButtons = function (e) {
        this.autoStackButtons = e;
      }),
      (t.prototype.getSuppressDefaultPressSelector = function () {
        return this.suppressDefaultPressSelector;
      }),
      (t.prototype.setSuppressDefaultPressSelector = function (e) {
        this.suppressDefaultPressSelector = e;
      }),
      (t.prototype.layout = function () {
        var e = this;
        this.animFrame.request(za.POLL_LAYOUT_CHANGE, function () {
          e.layoutInternal();
        });
      }),
      (t.prototype.handleClick = function (e) {
        if (
          this.adapter.eventTargetMatches(e.target, qa.SCRIM_SELECTOR) &&
          "" !== this.scrimClickAction
        )
          this.close(this.scrimClickAction);
        else {
          var t = this.adapter.getActionFromEvent(e);
          t && this.close(t);
        }
      }),
      (t.prototype.handleKeydown = function (e) {
        var t = "Enter" === e.key || 13 === e.keyCode;
        if (t && !this.adapter.getActionFromEvent(e)) {
          var n = e.composedPath ? e.composedPath()[0] : e.target,
            i =
              !this.suppressDefaultPressSelector ||
              !this.adapter.eventTargetMatches(
                n,
                this.suppressDefaultPressSelector
              );
          t && i && this.adapter.clickDefaultButton();
        }
      }),
      (t.prototype.handleDocumentKeydown = function (e) {
        ("Escape" === e.key || 27 === e.keyCode) &&
          "" !== this.escapeKeyAction &&
          this.close(this.escapeKeyAction);
      }),
      (t.prototype.handleScrollEvent = function () {
        var e = this;
        this.animFrame.request(za.POLL_SCROLL_POS, function () {
          e.toggleScrollDividerHeader(), e.toggleScrollDividerFooter();
        });
      }),
      (t.prototype.layoutInternal = function () {
        this.autoStackButtons && this.detectStackedButtons(),
          this.toggleScrollableClasses();
      }),
      (t.prototype.handleAnimationTimerEnd = function () {
        (this.animationTimer = 0),
          this.adapter.removeClass(Wa.OPENING),
          this.adapter.removeClass(Wa.CLOSING);
      }),
      (t.prototype.runNextAnimationFrame = function (e) {
        var t = this;
        cancelAnimationFrame(this.animationFrame),
          (this.animationFrame = requestAnimationFrame(function () {
            (t.animationFrame = 0),
              clearTimeout(t.animationTimer),
              (t.animationTimer = setTimeout(e, 0));
          }));
      }),
      (t.prototype.detectStackedButtons = function () {
        this.adapter.removeClass(Wa.STACKED);
        var e = this.adapter.areButtonsStacked();
        e && this.adapter.addClass(Wa.STACKED),
          e !== this.areButtonsStacked &&
            (this.adapter.reverseButtons(), (this.areButtonsStacked = e));
      }),
      (t.prototype.toggleScrollableClasses = function () {
        this.adapter.removeClass(Wa.SCROLLABLE),
          this.adapter.isContentScrollable() &&
            (this.adapter.addClass(Wa.SCROLLABLE),
            this.isFullscreen &&
              (this.toggleScrollDividerHeader(),
              this.toggleScrollDividerFooter()));
      }),
      (t.prototype.toggleScrollDividerHeader = function () {
        this.adapter.isScrollableContentAtTop()
          ? this.adapter.hasClass(Wa.SCROLL_DIVIDER_HEADER) &&
            this.adapter.removeClass(Wa.SCROLL_DIVIDER_HEADER)
          : this.adapter.addClass(Wa.SCROLL_DIVIDER_HEADER);
      }),
      (t.prototype.toggleScrollDividerFooter = function () {
        this.adapter.isScrollableContentAtBottom()
          ? this.adapter.hasClass(Wa.SCROLL_DIVIDER_FOOTER) &&
            this.adapter.removeClass(Wa.SCROLL_DIVIDER_FOOTER)
          : this.adapter.addClass(Wa.SCROLL_DIVIDER_FOOTER);
      }),
      t
    );
  })(Qe);
  const { document: Ya, window: Qa } = Le,
    Ja = (e) => ({}),
    Za = (e) => ({});
  function el(t) {
    let n, i, r;
    return {
      c() {
        (n = M("div")), U(n, "class", "mdc-dialog__surface-scrim");
      },
      m(e, s) {
        L(e, n, s), i || ((r = k(n, "transitionend", t[31])), (i = !0));
      },
      p: e,
      d(e) {
        e && O(n), (i = !1), r();
      },
    };
  }
  function tl(e) {
    let t, i, r, a, l, u, h, m, g, $, y, I, b, E, x;
    const A = e[27].default,
      C = c(A, e, e[26], null);
    let S = e[5] && el(e),
      T = [
        { class: (u = yt({ [e[7]]: !0, "mdc-dialog__surface": !0 })) },
        { role: "alertdialog" },
        { "aria-modal": "true" },
        At(e[17], "surface$"),
      ],
      w = {};
    for (let e = 0; e < T.length; e += 1) w = n(w, T[e]);
    let N = [
        { class: (h = yt({ [e[6]]: !0, "mdc-dialog__container": !0 })) },
        At(e[17], "container$"),
      ],
      D = {};
    for (let e = 0; e < N.length; e += 1) D = n(D, N[e]);
    let F = [
        {
          class: ($ = yt({
            [e[2]]: !0,
            "mdc-dialog": !0,
            "mdc-dialog--stacked": !e[4],
            "mdc-dialog--fullscreen": e[5],
            "smui-dialog--selection": e[3],
            ...e[10],
          })),
        },
        { role: "alertdialog" },
        { "aria-modal": "true" },
        It(e[17], ["container$", "surface$"]),
      ],
      P = {};
    for (let e = 0; e < F.length; e += 1) P = n(P, F[e]);
    const B = e[27].over,
      V = c(B, e, e[26], Za);
    return {
      c() {
        (t = R()),
          (i = M("div")),
          (r = M("div")),
          (a = M("div")),
          C && C.c(),
          (l = R()),
          S && S.c(),
          (m = R()),
          (g = M("div")),
          (I = R()),
          V && V.c(),
          H(a, w),
          H(r, D),
          U(g, "class", "mdc-dialog__scrim"),
          H(i, P);
      },
      m(n, s) {
        L(n, t, s),
          L(n, i, s),
          _(i, r),
          _(r, a),
          C && C.m(a, null),
          _(a, l),
          S && S.m(a, null),
          _(i, m),
          _(i, g),
          e[32](i),
          L(n, I, s),
          V && V.m(n, s),
          (b = !0),
          E ||
            ((x = [
              k(Qa, "resize", e[28]),
              k(Qa, "orientationchange", e[29]),
              k(Ya.body, "keydown", e[30]),
              v((y = Ct.call(null, i, e[1]))),
              v(e[11].call(null, i)),
              k(i, "SMUIDialog:opening", e[14]),
              k(i, "SMUIDialog:opened", e[15]),
              k(i, "SMUIDialog:closed", e[16]),
              k(i, "click", e[33]),
              k(i, "keydown", e[34]),
            ]),
            (E = !0));
      },
      p(e, t) {
        C &&
          C.p &&
          (!b || 67108864 & t[0]) &&
          p(C, A, e, e[26], b ? d(A, e[26], t, null) : f(e[26]), null),
          e[5]
            ? S
              ? S.p(e, t)
              : ((S = el(e)), S.c(), S.m(a, null))
            : S && (S.d(1), (S = null)),
          H(
            a,
            (w = Ne(T, [
              (!b ||
                (128 & t[0] &&
                  u !==
                    (u = yt({ [e[7]]: !0, "mdc-dialog__surface": !0 })))) && {
                class: u,
              },
              { role: "alertdialog" },
              { "aria-modal": "true" },
              131072 & t[0] && At(e[17], "surface$"),
            ]))
          ),
          H(
            r,
            (D = Ne(N, [
              (!b ||
                (64 & t[0] &&
                  h !==
                    (h = yt({ [e[6]]: !0, "mdc-dialog__container": !0 })))) && {
                class: h,
              },
              131072 & t[0] && At(e[17], "container$"),
            ]))
          ),
          H(
            i,
            (P = Ne(F, [
              (!b ||
                (1084 & t[0] &&
                  $ !==
                    ($ = yt({
                      [e[2]]: !0,
                      "mdc-dialog": !0,
                      "mdc-dialog--stacked": !e[4],
                      "mdc-dialog--fullscreen": e[5],
                      "smui-dialog--selection": e[3],
                      ...e[10],
                    })))) && { class: $ },
              { role: "alertdialog" },
              { "aria-modal": "true" },
              131072 & t[0] && It(e[17], ["container$", "surface$"]),
            ]))
          ),
          y && o(y.update) && 2 & t[0] && y.update.call(null, e[1]),
          V &&
            V.p &&
            (!b || 67108864 & t[0]) &&
            p(V, B, e, e[26], b ? d(B, e[26], t, Ja) : f(e[26]), Za);
      },
      i(e) {
        b || (_e(C, e), _e(V, e), (b = !0));
      },
      o(e) {
        Se(C, e), Se(V, e), (b = !1);
      },
      d(n) {
        n && O(t),
          n && O(i),
          C && C.d(n),
          S && S.d(),
          e[32](null),
          n && O(I),
          V && V.d(n),
          (E = !1),
          s(x);
      },
    };
  }
  function nl(e, t, i) {
    const r = [
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
    let s,
      o,
      a = m(t, r),
      { $$slots: c = {}, $$scope: u } = t;
    var d;
    const { FocusTrap: p } = zn,
      { closest: f, matches: g } = tt,
      $ = xt(Z());
    let v,
      I,
      b,
      { use: E = [] } = t,
      { class: x = "" } = t,
      { open: A = !1 } = t,
      { selection: C = !1 } = t,
      { escapeKeyAction: _ = "close" } = t,
      { scrimClickAction: S = "close" } = t,
      { autoStackButtons: T = !0 } = t,
      { fullscreen: L = !1 } = t,
      { container$class: O = "" } = t,
      { surface$class: w = "" } = t,
      M = {},
      N = $t(!1);
    l(e, N, (e) => i(38, (o = e)));
    let D = re("SMUI:dialog:aboveFullscreen"),
      R =
        null !== (d = re("SMUI:dialog:aboveFullscreenShown")) && void 0 !== d
          ? d
          : $t(!1);
    l(e, R, (e) => i(25, (s = e)));
    let F,
      k = re("SMUI:addLayoutListener"),
      U = [];
    ie("SMUI:dialog:actions:reversed", N),
      ie(
        "SMUI:addLayoutListener",
        (e) => (
          U.push(e),
          () => {
            const t = U.indexOf(e);
            t >= 0 && U.splice(t, 1);
          }
        )
      ),
      ie("SMUI:dialog:selection", C),
      ie("SMUI:dialog:aboveFullscreen", D || L),
      ie("SMUI:dialog:aboveFullscreenShown", R),
      k && (F = k(G));
    let H = s;
    function P(e) {
      return e in M ? M[e] : W().classList.contains(e);
    }
    function B(e) {
      M[e] || i(10, (M[e] = !0), M);
    }
    function V(e) {
      (e in M && !M[e]) || i(10, (M[e] = !1), M);
    }
    function j() {
      return v.querySelector(".mdc-dialog__content");
    }
    function z() {
      return v.querySelector("[data-mdc-dialog-initial-focus]");
    }
    function G() {
      return I.layout();
    }
    function W() {
      return v;
    }
    ee(() => {
      var e;
      return (
        (b = new p(v, {
          initialFocusEl: null !== (e = z()) && void 0 !== e ? e : void 0,
        })),
        i(
          8,
          (I = new Xa({
            addBodyClass: (e) => document.body.classList.add(e),
            addClass: B,
            areButtonsStacked: () => {
              return (
                (e = [].slice.call(v.querySelectorAll(".mdc-dialog__button"))),
                (t = new Set()),
                [].forEach.call(e, function (e) {
                  return t.add(e.offsetTop);
                }),
                t.size > 1
              );
              var e, t;
            },
            clickDefaultButton: () => {
              const e = v.querySelector("[data-mdc-dialog-button-default");
              e && e.click();
            },
            eventTargetMatches: (e, t) => !!e && g(e, t),
            getActionFromEvent: (e) => {
              if (!e.target) return "";
              const t = f(e.target, "[data-mdc-dialog-action]");
              return t && t.getAttribute("data-mdc-dialog-action");
            },
            getInitialFocusEl: z,
            hasClass: P,
            isContentScrollable: () => {
              return !!(e = j()) && e.scrollHeight > e.offsetHeight;
              var e;
            },
            notifyClosed: (e) => {
              i(0, (A = !1)),
                vt(
                  W(),
                  "SMUIDialog:closed",
                  e ? { action: e } : {},
                  void 0,
                  !0
                );
            },
            notifyClosing: (e) =>
              vt(W(), "SMUIDialog:closing", e ? { action: e } : {}, void 0, !0),
            notifyOpened: () => vt(W(), "SMUIDialog:opened", {}, void 0, !0),
            notifyOpening: () => vt(W(), "SMUIDialog:opening", {}, void 0, !0),
            releaseFocus: () => b.releaseFocus(),
            removeBodyClass: (e) => document.body.classList.remove(e),
            removeClass: V,
            reverseButtons: () => {
              y(N, (o = !0), o);
            },
            trapFocus: () => b.trapFocus(),
            registerContentEventHandler: (e, t) => {
              const n = j();
              n instanceof HTMLElement && n.addEventListener(e, t);
            },
            deregisterContentEventHandler: (e, t) => {
              const n = j();
              n instanceof HTMLElement && n.removeEventListener(e, t);
            },
            isScrollableContentAtTop: () => {
              return !!(e = j()) && 0 === e.scrollTop;
              var e;
            },
            isScrollableContentAtBottom: () => {
              return (
                !!(e = j()) &&
                Math.ceil(e.scrollHeight - e.scrollTop) === e.clientHeight
              );
              var e;
            },
            registerWindowEventHandler: (e, t) => {
              window.addEventListener(e, t);
            },
            deregisterWindowEventHandler: (e, t) => {
              window.removeEventListener(e, t);
            },
          }))
        ),
        I.init(),
        () => {
          I.destroy();
        }
      );
    }),
      te(() => {
        F && F();
      });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(17, (a = m(t, r))),
          "use" in e && i(1, (E = e.use)),
          "class" in e && i(2, (x = e.class)),
          "open" in e && i(0, (A = e.open)),
          "selection" in e && i(3, (C = e.selection)),
          "escapeKeyAction" in e && i(18, (_ = e.escapeKeyAction)),
          "scrimClickAction" in e && i(19, (S = e.scrimClickAction)),
          "autoStackButtons" in e && i(4, (T = e.autoStackButtons)),
          "fullscreen" in e && i(5, (L = e.fullscreen)),
          "container$class" in e && i(6, (O = e.container$class)),
          "surface$class" in e && i(7, (w = e.surface$class)),
          "$$scope" in e && i(26, (u = e.$$scope));
      }),
      (e.$$.update = () => {
        262400 & e.$$.dirty[0] &&
          I &&
          I.getEscapeKeyAction() !== _ &&
          I.setEscapeKeyAction(_),
          524544 & e.$$.dirty[0] &&
            I &&
            I.getScrimClickAction() !== S &&
            I.setScrimClickAction(S),
          272 & e.$$.dirty[0] &&
            I &&
            I.getAutoStackButtons() !== T &&
            I.setAutoStackButtons(T),
          16 & e.$$.dirty[0] && (T || y(N, (o = !0), o)),
          257 & e.$$.dirty[0] &&
            I &&
            I.isOpen() !== A &&
            (A ? I.open({ isAboveFullscreenDialog: !!D }) : I.close()),
          50331936 & e.$$.dirty[0] &&
            L &&
            I &&
            H !== s &&
            (i(24, (H = s)), s ? I.showSurfaceScrim() : I.hideSurfaceScrim());
      }),
      [
        A,
        E,
        x,
        C,
        T,
        L,
        O,
        w,
        I,
        v,
        M,
        $,
        N,
        R,
        function () {
          D && y(R, (s = !0), s),
            requestAnimationFrame(() => {
              U.forEach((e) => e());
            });
        },
        function () {
          U.forEach((e) => e());
        },
        function () {
          D && y(R, (s = !1), s);
        },
        a,
        _,
        S,
        function () {
          return A;
        },
        function (e) {
          i(0, (A = e));
        },
        G,
        W,
        H,
        s,
        u,
        c,
        () => A && I && I.layout(),
        () => A && I && I.layout(),
        (e) => A && I && I.handleDocumentKeydown(e),
        () => I && I.handleSurfaceScrimTransitionEnd(),
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (v = e), i(9, v);
          });
        },
        (e) => I && I.handleClick(e),
        (e) => I && I.handleKeydown(e),
      ]
    );
  }
  class il extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          nl,
          tl,
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
  Pt({
    class: "mdc-dialog__header",
    component: cn,
    contexts: { "SMUI:icon-button:context": "dialog:header" },
  });
  var rl = Pt({ class: "mdc-dialog__title", component: dn }),
    sl = Pt({ class: "mdc-dialog__content", component: cn }),
    ol = Pt({
      class: "mdc-dialog__actions",
      component: cn,
      classMap: {
        "smui-dialog__actions--reversed": "SMUI:dialog:actions:reversed",
      },
      contexts: { "SMUI:button:context": "dialog:action" },
    });
  function al(e) {
    let t;
    return {
      c() {
        (t = M("div")), U(t, "class", "mdc-button__touch");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function ll(e) {
    let t, n, i, r;
    const s = e[27].default,
      o = c(s, e, e[29], null);
    let a = e[6] && al();
    return {
      c() {
        (t = M("div")),
          (n = R()),
          o && o.c(),
          a && a.c(),
          (i = F()),
          U(t, "class", "mdc-button__ripple");
      },
      m(e, s) {
        L(e, t, s),
          L(e, n, s),
          o && o.m(e, s),
          a && a.m(e, s),
          L(e, i, s),
          (r = !0);
      },
      p(e, t) {
        o &&
          o.p &&
          (!r || 536870912 & t) &&
          p(o, s, e, e[29], r ? d(s, e[29], t, null) : f(e[29]), null),
          e[6]
            ? a || ((a = al()), a.c(), a.m(i.parentNode, i))
            : a && (a.d(1), (a = null));
      },
      i(e) {
        r || (_e(o, e), (r = !0));
      },
      o(e) {
        Se(o, e), (r = !1);
      },
      d(e) {
        e && O(t), e && O(n), o && o.d(e), a && a.d(e), e && O(i);
      },
    };
  }
  function cl(e) {
    let t, i, r;
    const s = [
      {
        use: [
          [
            Ni,
            {
              ripple: e[3],
              unbounded: !1,
              color: e[4],
              disabled: !!e[22].disabled,
              addClass: e[18],
              removeClass: e[19],
              addStyle: e[20],
            },
          ],
          e[16],
          ...e[0],
        ],
      },
      {
        class: yt({
          [e[1]]: !0,
          "mdc-button": !0,
          "mdc-button--raised": "raised" === e[5],
          "mdc-button--unelevated": "unelevated" === e[5],
          "mdc-button--outlined": "outlined" === e[5],
          "smui-button--color-secondary": "secondary" === e[4],
          "mdc-button--touch": e[6],
          "mdc-card__action": "card:action" === e[17],
          "mdc-card__action--button": "card:action" === e[17],
          "mdc-dialog__button": "dialog:action" === e[17],
          "mdc-top-app-bar__navigation-icon":
            "top-app-bar:navigation" === e[17],
          "mdc-top-app-bar__action-item": "top-app-bar:action" === e[17],
          "mdc-snackbar__action": "snackbar:actions" === e[17],
          "mdc-banner__secondary-action": "banner" === e[17] && e[8],
          "mdc-banner__primary-action": "banner" === e[17] && !e[8],
          "mdc-tooltip__action": "tooltip:rich-actions" === e[17],
          ...e[11],
        }),
      },
      { style: Object.entries(e[12]).map(ul).concat([e[2]]).join(" ") },
      e[15],
      e[14],
      e[13],
      { href: e[7] },
      e[22],
    ];
    var o = e[9];
    function a(e) {
      let t = { $$slots: { default: [ll] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) t = n(t, s[e]);
      return { props: t };
    }
    return (
      o && ((t = new o(a(e))), e[28](t), t.$on("click", e[21])),
      {
        c() {
          t && Fe(t.$$.fragment), (i = F());
        },
        m(e, n) {
          t && ke(t, e, n), L(e, i, n), (r = !0);
        },
        p(e, [n]) {
          const r =
            6289919 & n
              ? Ne(s, [
                  6094873 & n && {
                    use: [
                      [
                        Ni,
                        {
                          ripple: e[3],
                          unbounded: !1,
                          color: e[4],
                          disabled: !!e[22].disabled,
                          addClass: e[18],
                          removeClass: e[19],
                          addStyle: e[20],
                        },
                      ],
                      e[16],
                      ...e[0],
                    ],
                  },
                  133490 & n && {
                    class: yt({
                      [e[1]]: !0,
                      "mdc-button": !0,
                      "mdc-button--raised": "raised" === e[5],
                      "mdc-button--unelevated": "unelevated" === e[5],
                      "mdc-button--outlined": "outlined" === e[5],
                      "smui-button--color-secondary": "secondary" === e[4],
                      "mdc-button--touch": e[6],
                      "mdc-card__action": "card:action" === e[17],
                      "mdc-card__action--button": "card:action" === e[17],
                      "mdc-dialog__button": "dialog:action" === e[17],
                      "mdc-top-app-bar__navigation-icon":
                        "top-app-bar:navigation" === e[17],
                      "mdc-top-app-bar__action-item":
                        "top-app-bar:action" === e[17],
                      "mdc-snackbar__action": "snackbar:actions" === e[17],
                      "mdc-banner__secondary-action":
                        "banner" === e[17] && e[8],
                      "mdc-banner__primary-action": "banner" === e[17] && !e[8],
                      "mdc-tooltip__action": "tooltip:rich-actions" === e[17],
                      ...e[11],
                    }),
                  },
                  4100 & n && {
                    style: Object.entries(e[12])
                      .map(ul)
                      .concat([e[2]])
                      .join(" "),
                  },
                  32768 & n && De(e[15]),
                  16384 & n && De(e[14]),
                  8192 & n && De(e[13]),
                  128 & n && { href: e[7] },
                  4194304 & n && De(e[22]),
                ])
              : {};
          if (
            (536870976 & n && (r.$$scope = { dirty: n, ctx: e }),
            o !== (o = e[9]))
          ) {
            if (t) {
              Ae();
              const e = t;
              Se(e.$$.fragment, 1, 0, () => {
                Ue(e, 1);
              }),
                Ce();
            }
            o
              ? ((t = new o(a(e))),
                e[28](t),
                t.$on("click", e[21]),
                Fe(t.$$.fragment),
                _e(t.$$.fragment, 1),
                ke(t, i.parentNode, i))
              : (t = null);
          } else o && t.$set(r);
        },
        i(e) {
          r || (t && _e(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          t && Se(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[28](null), n && O(i), t && Ue(t, n);
        },
      }
    );
  }
  const ul = ([e, t]) => `${e}: ${t};`;
  function dl(e, t, i) {
    let r, s, o;
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
    let l = m(t, a),
      { $$slots: c = {}, $$scope: u } = t;
    const d = xt(Z());
    let p,
      { use: f = [] } = t,
      { class: g = "" } = t,
      { style: $ = "" } = t,
      { ripple: y = !0 } = t,
      { color: v = "primary" } = t,
      { variant: I = "text" } = t,
      { touch: b = !1 } = t,
      { href: E } = t,
      { action: x = "close" } = t,
      { defaultAction: A = !1 } = t,
      { secondary: C = !1 } = t,
      _ = {},
      S = {},
      T = re("SMUI:button:context"),
      { component: L = null == E ? ln : an } = t,
      O = l.disabled;
    function w() {
      return p.getElement();
    }
    return (
      ie("SMUI:label:context", "button"),
      ie("SMUI:icon:context", "button"),
      (e.$$set = (e) => {
        i(30, (t = n(n({}, t), h(e)))),
          i(22, (l = m(t, a))),
          "use" in e && i(0, (f = e.use)),
          "class" in e && i(1, (g = e.class)),
          "style" in e && i(2, ($ = e.style)),
          "ripple" in e && i(3, (y = e.ripple)),
          "color" in e && i(4, (v = e.color)),
          "variant" in e && i(5, (I = e.variant)),
          "touch" in e && i(6, (b = e.touch)),
          "href" in e && i(7, (E = e.href)),
          "action" in e && i(23, (x = e.action)),
          "defaultAction" in e && i(24, (A = e.defaultAction)),
          "secondary" in e && i(8, (C = e.secondary)),
          "component" in e && i(9, (L = e.component)),
          "$$scope" in e && i(29, (u = e.$$scope));
      }),
      (e.$$.update = () => {
        i(
          15,
          (r =
            "dialog:action" === T && null != x
              ? { "data-mdc-dialog-action": x }
              : { action: t.action })
        ),
          i(
            14,
            (s =
              "dialog:action" === T && A
                ? { "data-mdc-dialog-button-default": "" }
                : { default: t.default })
          ),
          i(13, (o = "banner" === T ? {} : { secondary: t.secondary })),
          O !== l.disabled && (w().blur(), i(26, (O = l.disabled)));
      }),
      (t = h(t)),
      [
        f,
        g,
        $,
        y,
        v,
        I,
        b,
        E,
        C,
        L,
        p,
        _,
        S,
        o,
        s,
        r,
        d,
        T,
        function (e) {
          _[e] || i(11, (_[e] = !0), _);
        },
        function (e) {
          (e in _ && !_[e]) || i(11, (_[e] = !1), _);
        },
        function (e, t) {
          S[e] != t &&
            ("" === t || null == t
              ? (delete S[e], i(12, S))
              : i(12, (S[e] = t), S));
        },
        function () {
          "banner" === T &&
            vt(
              w(),
              C
                ? "SMUIBannerButton:secondaryActionClick"
                : "SMUIBannerButton:primaryActionClick"
            );
        },
        l,
        x,
        A,
        w,
        O,
        c,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (p = e), i(10, p);
          });
        },
        u,
      ]
    );
  }
  class pl extends Pe {
    constructor(e) {
      super(),
        He(this, e, dl, cl, a, {
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
  var fl = new Map([
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
  function hl(e, t) {
    var n = (function (e) {
      var t = e.name;
      if (t && -1 !== t.lastIndexOf(".") && !e.type) {
        var n = t.split(".").pop().toLowerCase(),
          i = fl.get(n);
        i &&
          Object.defineProperty(e, "type", {
            value: i,
            writable: !1,
            configurable: !1,
            enumerable: !0,
          });
      }
      return e;
    })(e);
    if ("string" != typeof n.path) {
      var i = e.webkitRelativePath;
      Object.defineProperty(n, "path", {
        value:
          "string" == typeof t
            ? t
            : "string" == typeof i && i.length > 0
            ? i
            : e.name,
        writable: !1,
        configurable: !1,
        enumerable: !0,
      });
    }
    return n;
  }
  var ml = [".DS_Store", "Thumbs.db"];
  function gl(e) {
    return qe(this, void 0, void 0, function () {
      return Ke(this, function (t) {
        return [
          2,
          ((n = e),
          n.dataTransfer && e.dataTransfer
            ? yl(e.dataTransfer, e.type)
            : $l(e)),
        ];
        var n;
      });
    });
  }
  function $l(e) {
    return (null !== e.target && e.target.files ? Il(e.target.files) : []).map(
      function (e) {
        return hl(e);
      }
    );
  }
  function yl(e, t) {
    return qe(this, void 0, void 0, function () {
      var n;
      return Ke(this, function (i) {
        switch (i.label) {
          case 0:
            return e.items
              ? ((n = Il(e.items).filter(function (e) {
                  return "file" === e.kind;
                })),
                "drop" !== t ? [2, n] : [4, Promise.all(n.map(bl))])
              : [3, 2];
          case 1:
            return [2, vl(El(i.sent()))];
          case 2:
            return [
              2,
              vl(
                Il(e.files).map(function (e) {
                  return hl(e);
                })
              ),
            ];
        }
      });
    });
  }
  function vl(e) {
    return e.filter(function (e) {
      return -1 === ml.indexOf(e.name);
    });
  }
  function Il(e) {
    for (var t = [], n = 0; n < e.length; n++) {
      var i = e[n];
      t.push(i);
    }
    return t;
  }
  function bl(e) {
    if ("function" != typeof e.webkitGetAsEntry) return xl(e);
    var t = e.webkitGetAsEntry();
    return t && t.isDirectory ? Cl(t) : xl(e);
  }
  function El(e) {
    return e.reduce(function (e, t) {
      return (function () {
        for (var e = [], t = 0; t < arguments.length; t++)
          e = e.concat(Ye(arguments[t]));
        return e;
      })(e, Array.isArray(t) ? El(t) : [t]);
    }, []);
  }
  function xl(e) {
    var t = e.getAsFile();
    if (!t) return Promise.reject(e + " is not a File");
    var n = hl(t);
    return Promise.resolve(n);
  }
  function Al(e) {
    return qe(this, void 0, void 0, function () {
      return Ke(this, function (t) {
        return [2, e.isDirectory ? Cl(e) : _l(e)];
      });
    });
  }
  function Cl(e) {
    var t = e.createReader();
    return new Promise(function (e, n) {
      var i = [];
      !(function r() {
        var s = this;
        t.readEntries(
          function (t) {
            return qe(s, void 0, void 0, function () {
              var s, o, a;
              return Ke(this, function (l) {
                switch (l.label) {
                  case 0:
                    if (t.length) return [3, 5];
                    l.label = 1;
                  case 1:
                    return l.trys.push([1, 3, , 4]), [4, Promise.all(i)];
                  case 2:
                    return (s = l.sent()), e(s), [3, 4];
                  case 3:
                    return (o = l.sent()), n(o), [3, 4];
                  case 4:
                    return [3, 6];
                  case 5:
                    (a = Promise.all(t.map(Al))), i.push(a), r(), (l.label = 6);
                  case 6:
                    return [2];
                }
              });
            });
          },
          function (e) {
            n(e);
          }
        );
      })();
    });
  }
  function _l(e) {
    return qe(this, void 0, void 0, function () {
      return Ke(this, function (t) {
        return [
          2,
          new Promise(function (t, n) {
            e.file(
              function (n) {
                var i = hl(n, e.fullPath);
                t(i);
              },
              function (e) {
                n(e);
              }
            );
          }),
        ];
      });
    });
  }
  const Sl = (e) => {
      e = Array.isArray(e) && 1 === e.length ? e[0] : e;
      return {
        code: "file-invalid-type",
        message: `File type must be ${
          Array.isArray(e) ? `one of ${e.join(", ")}` : e
        }`,
      };
    },
    Tl = (e) => ({
      code: "file-too-large",
      message: `File is larger than ${e} bytes`,
    }),
    Ll = (e) => ({
      code: "file-too-small",
      message: `File is smaller than ${e} bytes`,
    }),
    Ol = { code: "too-many-files", message: "Too many files" };
  function wl(e, t) {
    const n =
      "application/x-moz-file" === e.type ||
      (function (e, t) {
        if (e && t) {
          const n = Array.isArray(t) ? t : t.split(","),
            i = e.name || "",
            r = (e.type || "").toLowerCase(),
            s = r.replace(/\/.*$/, "");
          return n.some((e) => {
            const t = e.trim().toLowerCase();
            return "." === t.charAt(0)
              ? i.toLowerCase().endsWith(t)
              : t.endsWith("/*")
              ? s === t.replace(/\/.*$/, "")
              : r === t;
          });
        }
        return !0;
      })(e, t);
    return [n, n ? null : Sl(t)];
  }
  function Ml(e) {
    return null != e;
  }
  function Nl(e) {
    return "function" == typeof e.isPropagationStopped
      ? e.isPropagationStopped()
      : void 0 !== e.cancelBubble && e.cancelBubble;
  }
  function Dl(e) {
    return e.dataTransfer
      ? Array.prototype.some.call(
          e.dataTransfer.types,
          (e) => "Files" === e || "application/x-moz-file" === e
        )
      : !!e.target && !!e.target.files;
  }
  function Rl(t) {
    let n, i, r, o, a, l, u;
    const h = t[32].default,
      m = c(h, t, t[31], null),
      g =
        m ||
        (function (t) {
          let n;
          return {
            c() {
              (n = M("p")),
                (n.textContent =
                  "Drag 'n' drop some files here, or click to select files");
            },
            m(e, t) {
              L(e, n, t);
            },
            p: e,
            d(e) {
              e && O(n);
            },
          };
        })();
    return {
      c() {
        (n = M("div")),
          (i = M("input")),
          (r = R()),
          g && g.c(),
          U(i, "accept", t[0]),
          (i.multiple = t[1]),
          U(i, "type", "file"),
          U(i, "name", t[5]),
          U(i, "autocomplete", "off"),
          U(i, "tabindex", "-1"),
          V(i, "display", "none"),
          U(n, "tabindex", "0"),
          U(
            n,
            "class",
            (o = (t[4] ? "" : "dropzone") + " " + t[2] + " svelte-817dg2")
          ),
          U(n, "style", t[3]);
      },
      m(e, s) {
        L(e, n, s),
          _(n, i),
          t[33](i),
          _(n, r),
          g && g.m(n, null),
          t[34](n),
          (a = !0),
          l ||
            ((u = [
              k(window, "focus", t[21]),
              k(window, "dragover", t[19]),
              k(window, "drop", t[20]),
              k(i, "change", t[15]),
              k(i, "click", Fl),
              k(n, "keydown", t[17](t[8])),
              k(n, "focus", t[17](t[9])),
              k(n, "blur", t[17](t[10])),
              k(n, "click", t[16](t[11])),
              k(n, "dragenter", t[18](t[12])),
              k(n, "dragover", t[18](t[13])),
              k(n, "dragleave", t[18](t[14])),
              k(n, "drop", t[18](t[15])),
            ]),
            (l = !0));
      },
      p(e, t) {
        (!a || 1 & t[0]) && U(i, "accept", e[0]),
          (!a || 2 & t[0]) && (i.multiple = e[1]),
          (!a || 32 & t[0]) && U(i, "name", e[5]),
          m &&
            m.p &&
            (!a || 1 & t[1]) &&
            p(m, h, e, e[31], a ? d(h, e[31], t, null) : f(e[31]), null),
          (!a ||
            (20 & t[0] &&
              o !==
                (o =
                  (e[4] ? "" : "dropzone") + " " + e[2] + " svelte-817dg2"))) &&
            U(n, "class", o),
          (!a || 8 & t[0]) && U(n, "style", e[3]);
      },
      i(e) {
        a || (_e(g, e), (a = !0));
      },
      o(e) {
        Se(g, e), (a = !1);
      },
      d(e) {
        e && O(n), t[33](null), g && g.d(e), t[34](null), (l = !1), s(u);
      },
    };
  }
  function Fl(e) {
    e.stopPropagation();
  }
  function kl(e, t, n) {
    let { $$slots: i = {}, $$scope: r } = t,
      { accept: s } = t,
      { disabled: o = !1 } = t,
      { getFilesFromEvent: a = gl } = t,
      { maxSize: l = 1 / 0 } = t,
      { minSize: c = 0 } = t,
      { multiple: u = !0 } = t,
      { preventDropOnDocument: d = !0 } = t,
      { noClick: p = !1 } = t,
      { noKeyboard: f = !1 } = t,
      { noDrag: h = !1 } = t,
      { noDragEventsBubbling: m = !1 } = t,
      { containerClasses: g = "" } = t,
      { containerStyles: $ = "" } = t,
      { disableDefaultStyles: y = !1 } = t,
      { name: v = "" } = t;
    const I = ne();
    let b,
      E,
      x = {
        isFocused: !1,
        isFileDialogActive: !1,
        isDragActive: !1,
        isDragAccept: !1,
        isDragReject: !1,
        draggedFiles: [],
        acceptedFiles: [],
        fileRejections: [],
      };
    function A() {
      E && (n(7, (E.value = null), E), (x.isFileDialogActive = !0), E.click());
    }
    function C(e) {
      return o ? null : e;
    }
    function _(e) {
      m && e.stopPropagation();
    }
    let S = [];
    return (
      te(() => {
        n(7, (E = null));
      }),
      (e.$$set = (e) => {
        "accept" in e && n(0, (s = e.accept)),
          "disabled" in e && n(22, (o = e.disabled)),
          "getFilesFromEvent" in e && n(23, (a = e.getFilesFromEvent)),
          "maxSize" in e && n(24, (l = e.maxSize)),
          "minSize" in e && n(25, (c = e.minSize)),
          "multiple" in e && n(1, (u = e.multiple)),
          "preventDropOnDocument" in e && n(26, (d = e.preventDropOnDocument)),
          "noClick" in e && n(27, (p = e.noClick)),
          "noKeyboard" in e && n(28, (f = e.noKeyboard)),
          "noDrag" in e && n(29, (h = e.noDrag)),
          "noDragEventsBubbling" in e && n(30, (m = e.noDragEventsBubbling)),
          "containerClasses" in e && n(2, (g = e.containerClasses)),
          "containerStyles" in e && n(3, ($ = e.containerStyles)),
          "disableDefaultStyles" in e && n(4, (y = e.disableDefaultStyles)),
          "name" in e && n(5, (v = e.name)),
          "$$scope" in e && n(31, (r = e.$$scope));
      }),
      [
        s,
        u,
        g,
        $,
        y,
        v,
        b,
        E,
        function (e) {
          b &&
            b.isEqualNode(e.target) &&
            ((32 !== e.keyCode && 13 !== e.keyCode) ||
              (e.preventDefault(), A()));
        },
        function () {
          x.isFocused = !0;
        },
        function () {
          x.isFocused = !1;
        },
        function () {
          p ||
            (!(function (e = window.navigator.userAgent) {
              return (
                (function (e) {
                  return (
                    -1 !== e.indexOf("MSIE") || -1 !== e.indexOf("Trident/")
                  );
                })(e) ||
                (function (e) {
                  return -1 !== e.indexOf("Edge/");
                })(e)
              );
            })()
              ? A()
              : setTimeout(A, 0));
        },
        function (e) {
          e.preventDefault(),
            _(e),
            (S = [...S, e.target]),
            Dl(e) &&
              Promise.resolve(a(e)).then((t) => {
                (Nl(e) && !m) ||
                  ((x.draggedFiles = t),
                  (x.isDragActive = !0),
                  I("dragenter", { dragEvent: e }));
              });
        },
        function (e) {
          if ((e.preventDefault(), _(e), e.dataTransfer))
            try {
              e.dataTransfer.dropEffect = "copy";
            } catch {}
          return Dl(e) && I("dragover", { dragEvent: e }), !1;
        },
        function (e) {
          e.preventDefault(), _(e);
          const t = S.filter((e) => b && b.contains(e)),
            n = t.indexOf(e.target);
          -1 !== n && t.splice(n, 1),
            (S = t),
            t.length > 0 ||
              ((x.isDragActive = !1),
              (x.draggedFiles = []),
              Dl(e) && I("dragleave", { dragEvent: e }));
        },
        function (e) {
          e.preventDefault(),
            _(e),
            (S = []),
            Dl(e) &&
              (I("filedropped", { event: e }),
              Promise.resolve(a(e)).then((t) => {
                if (Nl(e) && !m) return;
                const n = [],
                  i = [];
                t.forEach((e) => {
                  const [t, r] = wl(e, s),
                    [o, a] = (function (e, t, n) {
                      if (Ml(e.size))
                        if (Ml(t) && Ml(n)) {
                          if (e.size > n) return [!1, Tl(n)];
                          if (e.size < t) return [!1, Ll(t)];
                        } else {
                          if (Ml(t) && e.size < t) return [!1, Ll(t)];
                          if (Ml(n) && e.size > n) return [!1, Tl(n)];
                        }
                      return [!0, null];
                    })(e, c, l);
                  if (t && o) n.push(e);
                  else {
                    const t = [r, a].filter((e) => e);
                    i.push({ file: e, errors: t });
                  }
                }),
                  !u &&
                    n.length > 1 &&
                    (n.forEach((e) => {
                      i.push({ file: e, errors: [Ol] });
                    }),
                    n.splice(0)),
                  (x.acceptedFiles = n),
                  (x.fileRejections = i),
                  I("drop", { acceptedFiles: n, fileRejections: i, event: e }),
                  i.length > 0 &&
                    I("droprejected", { fileRejections: i, event: e }),
                  n.length > 0 &&
                    I("dropaccepted", { acceptedFiles: n, event: e });
              })),
            (x.isFileDialogActive = !1),
            (x.isDragActive = !1),
            (x.draggedFiles = []),
            (x.acceptedFiles = []),
            (x.fileRejections = []);
        },
        C,
        function (e) {
          return f ? null : C(e);
        },
        function (e) {
          return h ? null : C(e);
        },
        function (e) {
          d && e.preventDefault();
        },
        function (e) {
          d && ((b && b.contains(e.target)) || (e.preventDefault(), (S = [])));
        },
        function () {
          x.isFileDialogActive &&
            setTimeout(() => {
              if (E) {
                const { files: e } = E;
                e.length ||
                  ((x.isFileDialogActive = !1), I("filedialogcancel"));
              }
            }, 300);
        },
        o,
        a,
        l,
        c,
        d,
        p,
        f,
        h,
        m,
        r,
        i,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (E = e), n(7, E);
          });
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (b = e), n(6, b);
          });
        },
      ]
    );
  }
  class Ul extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          kl,
          Rl,
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
   */ var Hl = {
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
    Pl = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_CHECKED_INDETERMINATE_VALUE: "mixed",
      DATA_INDETERMINATE_ATTR: "data-indeterminate",
      NATIVE_CONTROL_SELECTOR: ".mdc-checkbox__native-control",
      TRANSITION_STATE_CHECKED: "checked",
      TRANSITION_STATE_INDETERMINATE: "indeterminate",
      TRANSITION_STATE_INIT: "init",
      TRANSITION_STATE_UNCHECKED: "unchecked",
    },
    Bl = { ANIM_END_LATCH_MS: 250 },
    Vl = (function (e) {
      function t(n) {
        var i = e.call(this, We(We({}, t.defaultAdapter), n)) || this;
        return (
          (i.currentCheckState = Pl.TRANSITION_STATE_INIT),
          (i.currentAnimationClass = ""),
          (i.animEndLatchTimer = 0),
          (i.enableAnimationEndHandler = !1),
          i
        );
      }
      return (
        Ge(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Hl;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Pl;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Bl;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
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
        (t.prototype.init = function () {
          (this.currentCheckState = this.determineCheckState()),
            this.updateAriaChecked(),
            this.adapter.addClass(Hl.UPGRADED);
        }),
        (t.prototype.destroy = function () {
          clearTimeout(this.animEndLatchTimer);
        }),
        (t.prototype.setDisabled = function (e) {
          this.adapter.setNativeControlDisabled(e),
            e
              ? this.adapter.addClass(Hl.DISABLED)
              : this.adapter.removeClass(Hl.DISABLED);
        }),
        (t.prototype.handleAnimationEnd = function () {
          var e = this;
          this.enableAnimationEndHandler &&
            (clearTimeout(this.animEndLatchTimer),
            (this.animEndLatchTimer = setTimeout(function () {
              e.adapter.removeClass(e.currentAnimationClass),
                (e.enableAnimationEndHandler = !1);
            }, Bl.ANIM_END_LATCH_MS)));
        }),
        (t.prototype.handleChange = function () {
          this.transitionCheckState();
        }),
        (t.prototype.transitionCheckState = function () {
          if (this.adapter.hasNativeControl()) {
            var e = this.currentCheckState,
              t = this.determineCheckState();
            if (e !== t) {
              this.updateAriaChecked();
              var n = Hl.SELECTED;
              t === Pl.TRANSITION_STATE_UNCHECKED
                ? this.adapter.removeClass(n)
                : this.adapter.addClass(n),
                this.currentAnimationClass.length > 0 &&
                  (clearTimeout(this.animEndLatchTimer),
                  this.adapter.forceLayout(),
                  this.adapter.removeClass(this.currentAnimationClass)),
                (this.currentAnimationClass = this.getTransitionAnimationClass(
                  e,
                  t
                )),
                (this.currentCheckState = t),
                this.adapter.isAttachedToDOM() &&
                  this.currentAnimationClass.length > 0 &&
                  (this.adapter.addClass(this.currentAnimationClass),
                  (this.enableAnimationEndHandler = !0));
            }
          }
        }),
        (t.prototype.determineCheckState = function () {
          var e = Pl.TRANSITION_STATE_INDETERMINATE,
            t = Pl.TRANSITION_STATE_CHECKED,
            n = Pl.TRANSITION_STATE_UNCHECKED;
          return this.adapter.isIndeterminate()
            ? e
            : this.adapter.isChecked()
            ? t
            : n;
        }),
        (t.prototype.getTransitionAnimationClass = function (e, n) {
          var i = Pl.TRANSITION_STATE_INIT,
            r = Pl.TRANSITION_STATE_CHECKED,
            s = Pl.TRANSITION_STATE_UNCHECKED,
            o = t.cssClasses,
            a = o.ANIM_UNCHECKED_CHECKED,
            l = o.ANIM_UNCHECKED_INDETERMINATE,
            c = o.ANIM_CHECKED_UNCHECKED,
            u = o.ANIM_CHECKED_INDETERMINATE,
            d = o.ANIM_INDETERMINATE_CHECKED,
            p = o.ANIM_INDETERMINATE_UNCHECKED;
          switch (e) {
            case i:
              return n === s ? "" : n === r ? d : p;
            case s:
              return n === r ? a : l;
            case r:
              return n === s ? c : u;
            default:
              return n === r ? d : p;
          }
        }),
        (t.prototype.updateAriaChecked = function () {
          this.adapter.isIndeterminate()
            ? this.adapter.setNativeControlAttr(
                Pl.ARIA_CHECKED_ATTR,
                Pl.ARIA_CHECKED_INDETERMINATE_VALUE
              )
            : this.adapter.removeNativeControlAttr(Pl.ARIA_CHECKED_ATTR);
        }),
        t
      );
    })(Qe);
  function jl(t) {
    let i,
      r,
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
      b,
      E = [
        { class: (a = yt({ [t[9]]: !0, "mdc-checkbox__native-control": !0 })) },
        { type: "checkbox" },
        t[20],
        { disabled: t[1] },
        { __value: (l = t[19](t[7]) ? t[6] : t[7]) },
        { "data-indeterminate": (c = !t[19](t[0]) && t[0] ? "true" : void 0) },
        t[16],
        At(t[26], "input$"),
      ],
      x = {};
    for (let e = 0; e < E.length; e += 1) x = n(x, E[e]);
    let A = [
        {
          class: (m = yt({
            [t[3]]: !0,
            "mdc-checkbox": !0,
            "mdc-checkbox--disabled": t[1],
            "mdc-checkbox--touch": t[5],
            "mdc-data-table__header-row-checkbox":
              "data-table" === t[21] && t[22],
            "mdc-data-table__row-checkbox": "data-table" === t[21] && !t[22],
            ...t[14],
          })),
        },
        { style: (g = Object.entries(t[15]).map(zl).concat([t[4]]).join(" ")) },
        It(t[26], ["input$"]),
      ],
      C = {};
    for (let e = 0; e < A.length; e += 1) C = n(C, A[e]);
    return {
      c() {
        (i = M("div")),
          (r = M("input")),
          (d = R()),
          (p = M("div")),
          (p.innerHTML =
            '<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"><path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg> \n    <div class="mdc-checkbox__mixedmark"></div>'),
          (f = R()),
          (h = M("div")),
          H(r, x),
          U(p, "class", "mdc-checkbox__background"),
          U(h, "class", "mdc-checkbox__ripple"),
          H(i, C);
      },
      m(e, n) {
        L(e, i, n),
          _(i, r),
          r.autofocus && r.focus(),
          t[36](r),
          (r.checked = t[12]),
          _(i, d),
          _(i, p),
          _(i, f),
          _(i, h),
          t[38](i),
          I ||
            ((b = [
              v((u = Ct.call(null, r, t[8]))),
              k(r, "change", t[37]),
              k(r, "blur", t[34]),
              k(r, "focus", t[35]),
              v(($ = Ct.call(null, i, t[2]))),
              v(t[18].call(null, i)),
              v(
                (y = Ni.call(null, i, {
                  unbounded: !0,
                  addClass: t[23],
                  removeClass: t[24],
                  addStyle: t[25],
                  active: t[17],
                  eventTarget: t[11],
                }))
              ),
              k(i, "animationend", t[39]),
            ]),
            (I = !0));
      },
      p(e, t) {
        H(
          r,
          (x = Ne(E, [
            512 & t[0] &&
              a !==
                (a = yt({
                  [e[9]]: !0,
                  "mdc-checkbox__native-control": !0,
                })) && { class: a },
            { type: "checkbox" },
            e[20],
            2 & t[0] && { disabled: e[1] },
            192 & t[0] &&
              l !== (l = e[19](e[7]) ? e[6] : e[7]) && { __value: l },
            1 & t[0] &&
              c !== (c = !e[19](e[0]) && e[0] ? "true" : void 0) && {
                "data-indeterminate": c,
              },
            65536 & t[0] && e[16],
            67108864 & t[0] && At(e[26], "input$"),
          ]))
        ),
          u && o(u.update) && 256 & t[0] && u.update.call(null, e[8]),
          4096 & t[0] && (r.checked = e[12]),
          H(
            i,
            (C = Ne(A, [
              16426 & t[0] &&
                m !==
                  (m = yt({
                    [e[3]]: !0,
                    "mdc-checkbox": !0,
                    "mdc-checkbox--disabled": e[1],
                    "mdc-checkbox--touch": e[5],
                    "mdc-data-table__header-row-checkbox":
                      "data-table" === e[21] && e[22],
                    "mdc-data-table__row-checkbox":
                      "data-table" === e[21] && !e[22],
                    ...e[14],
                  })) && { class: m },
              32784 & t[0] &&
                g !==
                  (g = Object.entries(e[15])
                    .map(zl)
                    .concat([e[4]])
                    .join(" ")) && { style: g },
              67108864 & t[0] && It(e[26], ["input$"]),
            ]))
          ),
          $ && o($.update) && 4 & t[0] && $.update.call(null, e[2]),
          y &&
            o(y.update) &&
            133120 & t[0] &&
            y.update.call(null, {
              unbounded: !0,
              addClass: e[23],
              removeClass: e[24],
              addStyle: e[25],
              active: e[17],
              eventTarget: e[11],
            });
      },
      i: e,
      o: e,
      d(e) {
        e && O(i), t[36](null), t[38](null), (I = !1), s(b);
      },
    };
  }
  const zl = ([e, t]) => `${e}: ${t};`;
  function Gl(e, t, i) {
    const r = [
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
    let s = m(t, r);
    var o;
    const a = xt(Z());
    let l = () => {};
    function c(e) {
      return e === l;
    }
    let u,
      d,
      p,
      { use: f = [] } = t,
      { class: g = "" } = t,
      { style: $ = "" } = t,
      { disabled: y = !1 } = t,
      { touch: v = !1 } = t,
      { indeterminate: I = l } = t,
      { group: b = l } = t,
      { checked: E = l } = t,
      { value: x = null } = t,
      { valueKey: A = l } = t,
      { input$use: C = [] } = t,
      { input$class: _ = "" } = t,
      S = {},
      T = {},
      L = {},
      O = !1,
      w =
        null !== (o = re("SMUI:generic:input:props")) && void 0 !== o ? o : {},
      M = c(b) ? !c(E) && (null != E ? E : void 0) : -1 !== b.indexOf(x),
      N = re("SMUI:checkbox:context"),
      D = re("SMUI:data-table:row:header"),
      R = E,
      F = c(b) ? [] : [...b],
      k = M;
    function U(e) {
      S[e] || i(14, (S[e] = !0), S);
    }
    function H(e) {
      (e in S && !S[e]) || i(14, (S[e] = !1), S);
    }
    function P(e, t) {
      L[e] !== t && i(16, (L[e] = t), L);
    }
    function B(e) {
      (e in L && null == L[e]) || i(16, (L[e] = void 0), L);
    }
    function V() {
      return u;
    }
    ee(() => {
      i(11, (p.indeterminate = !c(I) && I), p),
        i(
          10,
          (d = new Vl({
            addClass: U,
            forceLayout: () => u.offsetWidth,
            hasNativeControl: () => !0,
            isAttachedToDOM: () => Boolean(u.parentNode),
            isChecked: () => null != M && M,
            isIndeterminate: () => !c(I) && I,
            removeClass: H,
            removeNativeControlAttr: B,
            setNativeControlAttr: P,
            setNativeControlDisabled: (e) => i(1, (y = e)),
          }))
        );
      const e = {
        _smui_checkbox_accessor: !0,
        get element() {
          return V();
        },
        get checked() {
          return null != M && M;
        },
        set checked(e) {
          M !== e && i(12, (M = e));
        },
        get indeterminate() {
          return !c(I) && I;
        },
        set indeterminate(e) {
          i(0, (I = e));
        },
        activateRipple() {
          y || i(17, (O = !0));
        },
        deactivateRipple() {
          i(17, (O = !1));
        },
      };
      return (
        vt(u, "SMUIGenericInput:mount", e),
        vt(u, "SMUICheckbox:mount", e),
        d.init(),
        () => {
          vt(u, "SMUIGenericInput:unmount", e),
            vt(u, "SMUICheckbox:unmount", e),
            d.destroy();
        }
      );
    });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(26, (s = m(t, r))),
          "use" in e && i(2, (f = e.use)),
          "class" in e && i(3, (g = e.class)),
          "style" in e && i(4, ($ = e.style)),
          "disabled" in e && i(1, (y = e.disabled)),
          "touch" in e && i(5, (v = e.touch)),
          "indeterminate" in e && i(0, (I = e.indeterminate)),
          "group" in e && i(27, (b = e.group)),
          "checked" in e && i(28, (E = e.checked)),
          "value" in e && i(6, (x = e.value)),
          "valueKey" in e && i(7, (A = e.valueKey)),
          "input$use" in e && i(8, (C = e.input$use)),
          "input$class" in e && i(9, (_ = e.input$class));
      }),
      (e.$$.update = () => {
        if ((402660417 & e.$$.dirty[0]) | (7 & e.$$.dirty[1])) {
          let e = !1;
          if (!c(b))
            if (k !== M) {
              const t = b.indexOf(x);
              M && -1 === t
                ? (b.push(x),
                  i(27, b),
                  i(33, k),
                  i(12, M),
                  i(6, x),
                  i(32, F),
                  i(28, E),
                  i(31, R),
                  i(0, I),
                  i(11, p),
                  i(10, d))
                : M ||
                  -1 === t ||
                  (b.splice(t, 1),
                  i(27, b),
                  i(33, k),
                  i(12, M),
                  i(6, x),
                  i(32, F),
                  i(28, E),
                  i(31, R),
                  i(0, I),
                  i(11, p),
                  i(10, d)),
                (e = !0);
            } else {
              const t = F.indexOf(x),
                n = b.indexOf(x);
              t > -1 && -1 === n
                ? (i(12, (M = !1)), (e = !0))
                : n > -1 && -1 === t && (i(12, (M = !0)), (e = !0));
            }
          c(E)
            ? !!k != !!M && (e = !0)
            : E !== (null != M ? M : null) &&
              (E === R
                ? (i(28, (E = null != M ? M : null)), c(I) || i(0, (I = !1)))
                : i(12, (M = null != E ? E : void 0)),
              (e = !0)),
            p &&
              (c(I)
                ? p.indeterminate &&
                  (i(11, (p.indeterminate = !1), p), (e = !0))
                : !I && p.indeterminate
                ? (i(11, (p.indeterminate = !1), p), (e = !0))
                : I &&
                  !p.indeterminate &&
                  (i(11, (p.indeterminate = !0), p), (e = !0))),
            i(31, (R = E)),
            i(32, (F = c(b) ? [] : [...b])),
            i(33, (k = M)),
            e && d && d.handleChange();
        }
      }),
      [
        I,
        y,
        f,
        g,
        $,
        v,
        x,
        A,
        C,
        _,
        d,
        p,
        M,
        u,
        S,
        T,
        L,
        O,
        a,
        c,
        w,
        N,
        D,
        U,
        H,
        function (e, t) {
          T[e] != t &&
            ("" === t || null == t
              ? (delete T[e], i(15, T))
              : i(15, (T[e] = t), T));
        },
        s,
        b,
        E,
        function () {
          return w && w.id;
        },
        V,
        R,
        F,
        k,
        function (t) {
          se.call(this, e, t);
        },
        function (t) {
          se.call(this, e, t);
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (p = e),
              i(11, p),
              i(27, b),
              i(33, k),
              i(12, M),
              i(6, x),
              i(32, F),
              i(28, E),
              i(31, R),
              i(0, I),
              i(10, d);
          });
        },
        function () {
          (M = this.checked),
            i(12, M),
            i(27, b),
            i(33, k),
            i(6, x),
            i(32, F),
            i(28, E),
            i(31, R),
            i(0, I),
            i(11, p),
            i(10, d);
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (u = e), i(13, u);
          });
        },
        () => d && d.handleAnimationEnd(),
      ]
    );
  }
  class Wl extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          Gl,
          jl,
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
   */ var ql = { ROOT: "mdc-form-field" },
    Kl = { LABEL_SELECTOR: ".mdc-form-field > label" },
    Xl = (function (e) {
      function t(n) {
        var i = e.call(this, We(We({}, t.defaultAdapter), n)) || this;
        return (
          (i.click = function () {
            i.handleClick();
          }),
          i
        );
      }
      return (
        Ge(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return ql;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Kl;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
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
        (t.prototype.init = function () {
          this.adapter.registerInteractionHandler("click", this.click);
        }),
        (t.prototype.destroy = function () {
          this.adapter.deregisterInteractionHandler("click", this.click);
        }),
        (t.prototype.handleClick = function () {
          var e = this;
          this.adapter.activateInputRipple(),
            requestAnimationFrame(function () {
              e.adapter.deactivateInputRipple();
            });
        }),
        t
      );
    })(Qe);
  const Yl = (e) => ({}),
    Ql = (e) => ({});
  function Jl(e) {
    let t, i, r, a, l, u, h, m, g;
    const $ = e[13].default,
      y = c($, e, e[12], null),
      I = e[13].label,
      b = c(I, e, e[12], Ql);
    let E = [{ for: e[4] }, At(e[10], "label$")],
      x = {};
    for (let e = 0; e < E.length; e += 1) x = n(x, E[e]);
    let A = [
        {
          class: (l = yt({
            [e[1]]: !0,
            "mdc-form-field": !0,
            "mdc-form-field--align-end": "end" === e[2],
            "mdc-form-field--nowrap": e[3],
          })),
        },
        It(e[10], ["label$"]),
      ],
      C = {};
    for (let e = 0; e < A.length; e += 1) C = n(C, A[e]);
    return {
      c() {
        (t = M("div")),
          y && y.c(),
          (i = R()),
          (r = M("label")),
          b && b.c(),
          H(r, x),
          H(t, C);
      },
      m(n, s) {
        L(n, t, s),
          y && y.m(t, null),
          _(t, i),
          _(t, r),
          b && b.m(r, null),
          e[14](r),
          e[15](t),
          (h = !0),
          m ||
            ((g = [
              v((a = Ct.call(null, r, e[5]))),
              v((u = Ct.call(null, t, e[0]))),
              v(e[9].call(null, t)),
              k(t, "SMUIGenericInput:mount", e[16]),
              k(t, "SMUIGenericInput:unmount", e[17]),
            ]),
            (m = !0));
      },
      p(e, [n]) {
        y &&
          y.p &&
          (!h || 4096 & n) &&
          p(y, $, e, e[12], h ? d($, e[12], n, null) : f(e[12]), null),
          b &&
            b.p &&
            (!h || 4096 & n) &&
            p(b, I, e, e[12], h ? d(I, e[12], n, Yl) : f(e[12]), Ql),
          H(
            r,
            (x = Ne(E, [
              (!h || 16 & n) && { for: e[4] },
              1024 & n && At(e[10], "label$"),
            ]))
          ),
          a && o(a.update) && 32 & n && a.update.call(null, e[5]),
          H(
            t,
            (C = Ne(A, [
              (!h ||
                (14 & n &&
                  l !==
                    (l = yt({
                      [e[1]]: !0,
                      "mdc-form-field": !0,
                      "mdc-form-field--align-end": "end" === e[2],
                      "mdc-form-field--nowrap": e[3],
                    })))) && { class: l },
              1024 & n && It(e[10], ["label$"]),
            ]))
          ),
          u && o(u.update) && 1 & n && u.update.call(null, e[0]);
      },
      i(e) {
        h || (_e(y, e), _e(b, e), (h = !0));
      },
      o(e) {
        Se(y, e), Se(b, e), (h = !1);
      },
      d(n) {
        n && O(t),
          y && y.d(n),
          b && b.d(n),
          e[14](null),
          e[15](null),
          (m = !1),
          s(g);
      },
    };
  }
  let Zl = 0;
  function ec(e, t, i) {
    const r = [
      "use",
      "class",
      "align",
      "noWrap",
      "inputId",
      "label$use",
      "getElement",
    ];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t;
    const l = xt(Z());
    let c,
      u,
      d,
      p,
      { use: f = [] } = t,
      { class: g = "" } = t,
      { align: $ = "start" } = t,
      { noWrap: y = !1 } = t,
      { inputId: v = "SMUI-form-field-" + Zl++ } = t,
      { label$use: I = [] } = t;
    ie("SMUI:generic:input:props", { id: v }),
      ee(
        () => (
          (u = new Xl({
            activateInputRipple: () => {
              p && p.activateRipple();
            },
            deactivateInputRipple: () => {
              p && p.deactivateRipple();
            },
            deregisterInteractionHandler: (e, t) => {
              d.removeEventListener(e, t);
            },
            registerInteractionHandler: (e, t) => {
              d.addEventListener(e, t);
            },
          })),
          u.init(),
          () => {
            u.destroy();
          }
        )
      );
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(10, (s = m(t, r))),
          "use" in e && i(0, (f = e.use)),
          "class" in e && i(1, (g = e.class)),
          "align" in e && i(2, ($ = e.align)),
          "noWrap" in e && i(3, (y = e.noWrap)),
          "inputId" in e && i(4, (v = e.inputId)),
          "label$use" in e && i(5, (I = e.label$use)),
          "$$scope" in e && i(12, (a = e.$$scope));
      }),
      [
        f,
        g,
        $,
        y,
        v,
        I,
        c,
        d,
        p,
        l,
        s,
        function () {
          return c;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (d = e), i(7, d);
          });
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (c = e), i(6, c);
          });
        },
        (e) => i(8, (p = e.detail)),
        () => i(8, (p = void 0)),
      ]
    );
  }
  class tc extends Pe {
    constructor(e) {
      super(),
        He(this, e, ec, Jl, a, {
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
  function nc(e, t, n) {
    const i = e.slice();
    return (i[56] = t[n]), (i[58] = n), i;
  }
  const ic = (e) => ({}),
    rc = (e) => ({}),
    sc = (e) => ({ match: 32768 & e[0] }),
    oc = (e) => ({ match: e[56] }),
    ac = (e) => ({}),
    lc = (e) => ({}),
    cc = (e) => ({}),
    uc = (e) => ({});
  function dc(e) {
    let t,
      n,
      i = e[15],
      r = [];
    for (let t = 0; t < i.length; t += 1) r[t] = vc(nc(e, i, t));
    const s = (e) =>
      Se(r[e], 1, 1, () => {
        r[e] = null;
      });
    let o = null;
    return (
      i.length || (o = hc(e)),
      {
        c() {
          for (let e = 0; e < r.length; e += 1) r[e].c();
          (t = F()), o && o.c();
        },
        m(e, i) {
          for (let t = 0; t < r.length; t += 1) r[t].m(e, i);
          L(e, t, i), o && o.m(e, i), (n = !0);
        },
        p(e, n) {
          if ((25396017 & n[0]) | (2097152 & n[1])) {
            let a;
            for (i = e[15], a = 0; a < i.length; a += 1) {
              const s = nc(e, i, a);
              r[a]
                ? (r[a].p(s, n), _e(r[a], 1))
                : ((r[a] = vc(s)),
                  r[a].c(),
                  _e(r[a], 1),
                  r[a].m(t.parentNode, t));
            }
            for (Ae(), a = i.length; a < r.length; a += 1) s(a);
            Ce(),
              !i.length && o
                ? o.p(e, n)
                : i.length
                ? o &&
                  (Ae(),
                  Se(o, 1, 1, () => {
                    o = null;
                  }),
                  Ce())
                : ((o = hc(e)), o.c(), _e(o, 1), o.m(t.parentNode, t));
          }
        },
        i(e) {
          if (!n) {
            for (let e = 0; e < i.length; e += 1) _e(r[e]);
            n = !0;
          }
        },
        o(e) {
          r = r.filter(Boolean);
          for (let e = 0; e < r.length; e += 1) Se(r[e]);
          n = !1;
        },
        d(e) {
          w(r, e), e && O(t), o && o.d(e);
        },
      }
    );
  }
  function pc(e) {
    let t, n;
    return (
      (t = new oo({
        props: {
          disabled: !0,
          $$slots: { default: [bc] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2097152 & n[1] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function fc(e) {
    let t, n;
    return (
      (t = new oo({
        props: {
          disabled: !0,
          $$slots: { default: [xc] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2097152 & n[1] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function hc(e) {
    let t, n;
    return (
      (t = new oo({
        props: {
          disabled: e[9],
          $$slots: { default: [gc] },
          $$scope: { ctx: e },
        },
      })),
      t.$on("SMUI:action", e[49]),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          512 & n[0] && (i.disabled = e[9]),
            2097152 & n[1] && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function mc(e) {
    let t;
    return {
      c() {
        t = D("No matches found.");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function gc(e) {
    let t, n;
    const i = e[42]["no-matches"],
      r = c(i, e, e[52], rc),
      s =
        r ||
        (function (e) {
          let t, n;
          return (
            (t = new eo({
              props: { $$slots: { default: [mc] }, $$scope: { ctx: e } },
            })),
            {
              c() {
                Fe(t.$$.fragment);
              },
              m(e, i) {
                ke(t, e, i), (n = !0);
              },
              p(e, n) {
                const i = {};
                2097152 & n[1] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
              },
              i(e) {
                n || (_e(t.$$.fragment, e), (n = !0));
              },
              o(e) {
                Se(t.$$.fragment, e), (n = !1);
              },
              d(e) {
                Ue(t, e);
              },
            }
          );
        })(e);
    return {
      c() {
        s && s.c(), (t = R());
      },
      m(e, i) {
        s && s.m(e, i), L(e, t, i), (n = !0);
      },
      p(e, t) {
        r &&
          r.p &&
          (!n || 2097152 & t[1]) &&
          p(r, i, e, e[52], n ? d(i, e[52], t, ic) : f(e[52]), rc);
      },
      i(e) {
        n || (_e(s, e), (n = !0));
      },
      o(e) {
        Se(s, e), (n = !1);
      },
      d(e) {
        s && s.d(e), e && O(t);
      },
    };
  }
  function $c(e) {
    let t,
      n = e[5](e[56]) + "";
    return {
      c() {
        t = D(n);
      },
      m(e, n) {
        L(e, t, n);
      },
      p(e, i) {
        32800 & i[0] && n !== (n = e[5](e[56]) + "") && P(t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function yc(e) {
    let t, n;
    const i = e[42].match,
      r = c(i, e, e[52], oc),
      s =
        r ||
        (function (e) {
          let t, n;
          return (
            (t = new eo({
              props: { $$slots: { default: [$c] }, $$scope: { ctx: e } },
            })),
            {
              c() {
                Fe(t.$$.fragment);
              },
              m(e, i) {
                ke(t, e, i), (n = !0);
              },
              p(e, n) {
                const i = {};
                (32800 & n[0]) | (2097152 & n[1]) &&
                  (i.$$scope = { dirty: n, ctx: e }),
                  t.$set(i);
              },
              i(e) {
                n || (_e(t.$$.fragment, e), (n = !0));
              },
              o(e) {
                Se(t.$$.fragment, e), (n = !1);
              },
              d(e) {
                Ue(t, e);
              },
            }
          );
        })(e);
    return {
      c() {
        s && s.c(), (t = R());
      },
      m(e, i) {
        s && s.m(e, i), L(e, t, i), (n = !0);
      },
      p(e, t) {
        r
          ? r.p &&
            (!n || (32768 & t[0]) | (2097152 & t[1])) &&
            p(r, i, e, e[52], n ? d(i, e[52], t, sc) : f(e[52]), oc)
          : s && s.p && (!n || 32800 & t[0]) && s.p(e, n ? t : [-1, -1]);
      },
      i(e) {
        n || (_e(s, e), (n = !0));
      },
      o(e) {
        Se(s, e), (n = !1);
      },
      d(e) {
        s && s.d(e), e && O(t);
      },
    };
  }
  function vc(e) {
    let t, n;
    return (
      (t = new oo({
        props: {
          disabled: e[4](e[56]),
          selected: e[56] === e[0],
          $$slots: { default: [yc] },
          $$scope: { ctx: e },
        },
      })),
      t.$on("mouseenter", function () {
        return e[47](e[58]);
      }),
      t.$on("SMUI:action", function () {
        return e[48](e[56]);
      }),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(n, i) {
          e = n;
          const r = {};
          32784 & i[0] && (r.disabled = e[4](e[56])),
            32769 & i[0] && (r.selected = e[56] === e[0]),
            (32800 & i[0]) | (2097152 & i[1]) &&
              (r.$$scope = { dirty: i, ctx: e }),
            t.$set(r);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Ic(e) {
    let t;
    return {
      c() {
        t = D("Error while fetching suggestions.");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function bc(e) {
    let t;
    const n = e[42].error,
      i = c(n, e, e[52], lc),
      r =
        i ||
        (function (e) {
          let t, n;
          return (
            (t = new eo({
              props: { $$slots: { default: [Ic] }, $$scope: { ctx: e } },
            })),
            {
              c() {
                Fe(t.$$.fragment);
              },
              m(e, i) {
                ke(t, e, i), (n = !0);
              },
              p(e, n) {
                const i = {};
                2097152 & n[1] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
              },
              i(e) {
                n || (_e(t.$$.fragment, e), (n = !0));
              },
              o(e) {
                Se(t.$$.fragment, e), (n = !1);
              },
              d(e) {
                Ue(t, e);
              },
            }
          );
        })(e);
    return {
      c() {
        r && r.c();
      },
      m(e, n) {
        r && r.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 2097152 & r[1]) &&
          p(i, n, e, e[52], t ? d(n, e[52], r, ac) : f(e[52]), lc);
      },
      i(e) {
        t || (_e(r, e), (t = !0));
      },
      o(e) {
        Se(r, e), (t = !1);
      },
      d(e) {
        r && r.d(e);
      },
    };
  }
  function Ec(e) {
    let t;
    return {
      c() {
        t = D("Loading...");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function xc(e) {
    let t;
    const n = e[42].loading,
      i = c(n, e, e[52], uc),
      r =
        i ||
        (function (e) {
          let t, n;
          return (
            (t = new eo({
              props: { $$slots: { default: [Ec] }, $$scope: { ctx: e } },
            })),
            {
              c() {
                Fe(t.$$.fragment);
              },
              m(e, i) {
                ke(t, e, i), (n = !0);
              },
              p(e, n) {
                const i = {};
                2097152 & n[1] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
              },
              i(e) {
                n || (_e(t.$$.fragment, e), (n = !0));
              },
              o(e) {
                Se(t.$$.fragment, e), (n = !1);
              },
              d(e) {
                Ue(t, e);
              },
            }
          );
        })(e);
    return {
      c() {
        r && r.c();
      },
      m(e, n) {
        r && r.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 2097152 & r[1]) &&
          p(i, n, e, e[52], t ? d(n, e[52], r, cc) : f(e[52]), uc);
      },
      i(e) {
        t || (_e(r, e), (t = !0));
      },
      o(e) {
        Se(r, e), (t = !1);
      },
      d(e) {
        r && r.d(e);
      },
    };
  }
  function Ac(e) {
    let t, n, i, r;
    const s = [fc, pc, dc],
      o = [];
    function a(e, t) {
      return e[13] ? 0 : e[19] ? 1 : 2;
    }
    return (
      (t = a(e)),
      (n = o[t] = s[t](e)),
      {
        c() {
          n.c(), (i = F());
        },
        m(e, n) {
          o[t].m(e, n), L(e, i, n), (r = !0);
        },
        p(e, r) {
          let l = t;
          (t = a(e)),
            t === l
              ? o[t].p(e, r)
              : (Ae(),
                Se(o[l], 1, 1, () => {
                  o[l] = null;
                }),
                Ce(),
                (n = o[t]),
                n ? n.p(e, r) : ((n = o[t] = s[t](e)), n.c()),
                _e(n, 1),
                n.m(i.parentNode, i));
        },
        i(e) {
          r || (_e(n), (r = !0));
        },
        o(e) {
          Se(n), (r = !1);
        },
        d(e) {
          o[t].d(e), e && O(i);
        },
      }
    );
  }
  function Cc(e) {
    let t, i;
    const r = [At(e[27], "list$")];
    let s = { $$slots: { default: [Ac] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new qs({ props: s })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i = 134217728 & n[0] ? Ne(r, [De(At(e[27], "list$"))]) : {};
          (762673 & n[0]) | (2097152 & n[1]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          i || (_e(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function _c(e) {
    let t, i, r, a, l, u, h, m, g, $;
    const y = e[42].default,
      I = c(y, e, e[52], null),
      b =
        I ||
        (function (e) {
          let t, i, r;
          const s = [
            { label: e[6] },
            { disabled: e[7] },
            At(e[27], "textfield$"),
          ];
          function o(t) {
            e[43](t);
          }
          let a = {};
          for (let e = 0; e < s.length; e += 1) a = n(a, s[e]);
          return (
            void 0 !== e[1] && (a.value = e[1]),
            (t = new ns({ props: a })),
            ae.push(() => Re(t, "value", o)),
            {
              c() {
                Fe(t.$$.fragment);
              },
              m(e, n) {
                ke(t, e, n), (r = !0);
              },
              p(e, n) {
                const r =
                  134217920 & n[0]
                    ? Ne(s, [
                        64 & n[0] && { label: e[6] },
                        128 & n[0] && { disabled: e[7] },
                        134217728 & n[0] && De(At(e[27], "textfield$")),
                      ])
                    : {};
                !i &&
                  2 & n[0] &&
                  ((i = !0), (r.value = e[1]), he(() => (i = !1))),
                  t.$set(r);
              },
              i(e) {
                r || (_e(t.$$.fragment, e), (r = !0));
              },
              o(e) {
                Se(t.$$.fragment, e), (r = !1);
              },
              d(e) {
                Ue(t, e);
              },
            }
          );
        })(e),
      E = [
        { class: yt({ [e[10]]: !0, "smui-autocomplete__menu": !0 }) },
        { managed: !0 },
        { open: e[20] },
        { anchor: e[11] },
        { anchorCorner: e[12] },
        At(e[27], "menu$"),
      ];
    function x(t) {
      e[50](t);
    }
    let A = { $$slots: { default: [Cc] }, $$scope: { ctx: e } };
    for (let e = 0; e < E.length; e += 1) A = n(A, E[e]);
    void 0 !== e[17] && (A.anchorElement = e[17]),
      (a = new aa({ props: A })),
      ae.push(() => Re(a, "anchorElement", x)),
      a.$on("SMUIList:mount", e[22]);
    let C = [
        { class: (u = yt({ [e[3]]: !0, "smui-autocomplete": !0 })) },
        It(e[27], ["menu$", "textfield$", "list$"]),
      ],
      S = {};
    for (let e = 0; e < C.length; e += 1) S = n(S, C[e]);
    return {
      c() {
        (t = M("div")),
          (i = M("div")),
          b && b.c(),
          (r = R()),
          Fe(a.$$.fragment),
          H(t, S);
      },
      m(n, s) {
        L(n, t, s),
          _(t, i),
          b && b.m(i, null),
          e[44](i),
          _(t, r),
          ke(a, t, null),
          e[51](t),
          (m = !0),
          g ||
            (($ = [
              k(i, "focusin", e[45]),
              k(i, "focusout", e[26]),
              k(i, "input", e[46]),
              k(i, "keydown", e[25], !0),
              v(ia.call(null, t)),
              v((h = Ct.call(null, t, e[2]))),
              v(e[21].call(null, t)),
            ]),
            (g = !0));
      },
      p(e, n) {
        I
          ? I.p &&
            (!m || 2097152 & n[1]) &&
            p(I, y, e, e[52], m ? d(y, e[52], n, null) : f(e[52]), null)
          : b && b.p && (!m || 134217922 & n[0]) && b.p(e, m ? n : [-1, -1]);
        const i =
          135273472 & n[0]
            ? Ne(E, [
                1024 & n[0] && {
                  class: yt({ [e[10]]: !0, "smui-autocomplete__menu": !0 }),
                },
                E[1],
                1048576 & n[0] && { open: e[20] },
                2048 & n[0] && { anchor: e[11] },
                4096 & n[0] && { anchorCorner: e[12] },
                134217728 & n[0] && De(At(e[27], "menu$")),
              ])
            : {};
        (134980401 & n[0]) | (2097152 & n[1]) &&
          (i.$$scope = { dirty: n, ctx: e }),
          !l &&
            131072 & n[0] &&
            ((l = !0), (i.anchorElement = e[17]), he(() => (l = !1))),
          a.$set(i),
          H(
            t,
            (S = Ne(C, [
              (!m ||
                (8 & n[0] &&
                  u !== (u = yt({ [e[3]]: !0, "smui-autocomplete": !0 })))) && {
                class: u,
              },
              134217728 & n[0] && It(e[27], ["menu$", "textfield$", "list$"]),
            ]))
          ),
          h && o(h.update) && 4 & n[0] && h.update.call(null, e[2]);
      },
      i(e) {
        m || (_e(b, e), _e(a.$$.fragment, e), (m = !0));
      },
      o(e) {
        Se(b, e), Se(a.$$.fragment, e), (m = !1);
      },
      d(n) {
        n && O(t), b && b.d(n), e[44](null), Ue(a), e[51](null), (g = !1), s($);
      },
    };
  }
  function Sc(e, t, i) {
    let r;
    const s = [
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
    let o = m(t, s),
      { $$slots: a = {}, $$scope: l } = t;
    const c = xt(Z());
    let u,
      d,
      p,
      f,
      g,
      $,
      { use: y = [] } = t,
      { class: v = "" } = t,
      { options: I = [] } = t,
      { value: b } = t,
      { getOptionDisabled: E = () => !1 } = t,
      { getOptionLabel: x = (e) => (null == e ? "" : `${e}`) } = t,
      { text: A = x(b) } = t,
      { label: C } = t,
      { disabled: _ = !1 } = t,
      { toggle: S = !1 } = t,
      { combobox: T = !1 } = t,
      { clearOnBlur: L = !T } = t,
      { selectOnExactMatch: O = !0 } = t,
      { showMenuWithNoInput: w = !0 } = t,
      { noMatchesActionDisabled: M = !0 } = t,
      {
        search: N = async (e) => {
          const t = e.toLowerCase(),
            n = "function" == typeof I ? await I() : I || [];
          if ("" === t) return n;
          const i = n.filter((e) => x(e).toLowerCase().includes(t));
          return (
            i.sort((e, n) => {
              const i = x(e).toLowerCase(),
                r = x(n).toLowerCase();
              return i.startsWith(t) && !r.startsWith(t)
                ? -1
                : r.startsWith(t) && !i.startsWith(t)
                ? 1
                : 0;
            }),
            i
          );
        },
      } = t,
      { menu$class: D = "" } = t,
      { menu$anchor: R = !1 } = t,
      { menu$anchorCorner: F = "BOTTOM_START" } = t,
      k = !1,
      U = !1,
      H = !1,
      P = [],
      B = -1,
      V = b;
    function j(e, t = !0) {
      t && i(1, (A = x(e))),
        i(0, (b = e)),
        t || i(40, (V = e)),
        vt(u, "SMUIAutocomplete:selected", e);
    }
    function z(e, t = !0) {
      t && i(1, (A = "")),
        i(0, (b = void 0)),
        t || i(40, (V = void 0)),
        vt(u, "SMUIAutocomplete:deselected", e);
    }
    function G(e) {
      e === b ? z(e) : j(e);
    }
    function W() {
      return p ? p.getOrderedList().filter((e) => !e.disabled) : [];
    }
    async function q() {
      i(13, (k = !0)), i(19, (U = !1));
      try {
        const e = await N(A);
        if (!1 !== e && (i(15, (P = e)), O)) {
          const e = P.find((e) => x(e) === A);
          e && b !== e && j(e);
        }
      } catch (e) {
        i(19, (U = !0));
      }
      i(13, (k = !1));
    }
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(27, (o = m(t, s))),
          "use" in e && i(2, (y = e.use)),
          "class" in e && i(3, (v = e.class)),
          "options" in e && i(28, (I = e.options)),
          "value" in e && i(0, (b = e.value)),
          "getOptionDisabled" in e && i(4, (E = e.getOptionDisabled)),
          "getOptionLabel" in e && i(5, (x = e.getOptionLabel)),
          "text" in e && i(1, (A = e.text)),
          "label" in e && i(6, (C = e.label)),
          "disabled" in e && i(7, (_ = e.disabled)),
          "toggle" in e && i(8, (S = e.toggle)),
          "combobox" in e && i(29, (T = e.combobox)),
          "clearOnBlur" in e && i(30, (L = e.clearOnBlur)),
          "selectOnExactMatch" in e && i(31, (O = e.selectOnExactMatch)),
          "showMenuWithNoInput" in e && i(32, (w = e.showMenuWithNoInput)),
          "noMatchesActionDisabled" in e &&
            i(9, (M = e.noMatchesActionDisabled)),
          "search" in e && i(33, (N = e.search)),
          "menu$class" in e && i(10, (D = e.menu$class)),
          "menu$anchor" in e && i(11, (R = e.menu$anchor)),
          "menu$anchorCorner" in e && i(12, (F = e.menu$anchorCorner)),
          "$$scope" in e && i(52, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        if (
          ((536870947 & e.$$.dirty[0]) | (512 & e.$$.dirty[1]) &&
            (T || V === b
              ? T && i(0, (b = A))
              : (i(1, (A = x(b))), i(40, (V = b)))),
          (536928259 & e.$$.dirty[0]) | (2 & e.$$.dirty[1]) &&
            i(
              20,
              (r =
                H &&
                ("" !== A || w) &&
                (k ||
                  (!T && !(1 === P.length && P[0] === b)) ||
                  (T && !!P.length && !(1 === P.length && P[0] === b))))
            ),
          (536870947 & e.$$.dirty[0]) | (256 & e.$$.dirty[1]) &&
            g !== A &&
            (T || null == b || x(b) === A || z(b, !1), q(), i(39, (g = A))),
          (268435456 & e.$$.dirty[0]) | (4 & e.$$.dirty[1]) && q(),
          (65536 & e.$$.dirty[0]) | (1216 & e.$$.dirty[1]) && $ !== B)
        ) {
          const e = W();
          -1 === B
            ? i(38, (f = void 0))
            : (i(38, (f = e[B])),
              f &&
                (i(38, (f.activated = !0), f),
                (t = f.element),
                ((n = t.getBoundingClientRect()).top >= 0 &&
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
            e.forEach((e, t) => {
              t !== B && (e.activated = !1);
            }),
            p &&
              p.getOrderedList().forEach((e) => {
                e.tabindex = -1;
              }),
            i(41, ($ = B));
        }
        var t, n;
      }),
      [
        b,
        A,
        y,
        v,
        E,
        x,
        C,
        _,
        S,
        M,
        D,
        R,
        F,
        k,
        H,
        P,
        B,
        u,
        d,
        U,
        r,
        c,
        function (e) {
          p || i(37, (p = e.detail));
        },
        j,
        G,
        function (e) {
          if (!T || P.length)
            if ("ArrowDown" === e.key)
              e.preventDefault(),
                -1 === B || B === W().length - 1
                  ? i(16, (B = 0))
                  : i(16, B++, B);
            else if ("ArrowUp" === e.key)
              e.preventDefault(),
                -1 === B || 0 === B
                  ? i(16, (B = W().length - 1))
                  : i(16, B--, B);
            else if ("Enter" === e.key) {
              e.preventDefault();
              const t = W();
              f && (t[B] && t[B].action(e), i(16, (B = -1)));
            }
        },
        async function (e) {
          (e.relatedTarget &&
            -1 !==
              W()
                .map((e) => e.element)
                .indexOf(e.relatedTarget)) ||
            (i(16, (B = -1)),
            i(14, (H = !1)),
            L && null == b && i(1, (A = "")));
        },
        o,
        I,
        T,
        L,
        O,
        w,
        N,
        function () {
          if (d) {
            const e = d.querySelector("input.mdc-text-field__input");
            e && e.focus();
          }
        },
        function () {
          if (d) {
            const e = d.querySelector("input.mdc-text-field__input");
            e && e.blur();
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
        function (e) {
          (A = e), i(1, A), i(29, T), i(40, V), i(0, b), i(5, x);
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (d = e), i(18, d);
          });
        },
        () => {
          i(14, (H = !0));
        },
        () => {
          i(16, (B = -1));
        },
        (e) => {
          i(16, (B = e));
        },
        (e) => (S ? G(e) : j(e)),
        (e) => vt(u, "SMUIAutocomplete:noMatchesAction", e),
        function (e) {
          (u = e), i(17, u);
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (u = e), i(17, u);
          });
        },
        l,
      ]
    );
  }
  class Tc extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          Sc,
          _c,
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
  function Lc(e) {
    return Array.isArray ? Array.isArray(e) : "[object Array]" === Fc(e);
  }
  function Oc(e) {
    return "string" == typeof e;
  }
  function wc(e) {
    return "number" == typeof e;
  }
  function Mc(e) {
    return (
      !0 === e ||
      !1 === e ||
      ((function (e) {
        return Nc(e) && null !== e;
      })(e) &&
        "[object Boolean]" == Fc(e))
    );
  }
  function Nc(e) {
    return "object" == typeof e;
  }
  function Dc(e) {
    return null != e;
  }
  function Rc(e) {
    return !e.trim().length;
  }
  function Fc(e) {
    return null == e
      ? void 0 === e
        ? "[object Undefined]"
        : "[object Null]"
      : Object.prototype.toString.call(e);
  }
  const kc = Object.prototype.hasOwnProperty;
  class Uc {
    constructor(e) {
      (this._keys = []), (this._keyMap = {});
      let t = 0;
      e.forEach((e) => {
        let n = Hc(e);
        (t += n.weight),
          this._keys.push(n),
          (this._keyMap[n.id] = n),
          (t += n.weight);
      }),
        this._keys.forEach((e) => {
          e.weight /= t;
        });
    }
    get(e) {
      return this._keyMap[e];
    }
    keys() {
      return this._keys;
    }
    toJSON() {
      return JSON.stringify(this._keys);
    }
  }
  function Hc(e) {
    let t = null,
      n = null,
      i = null,
      r = 1,
      s = null;
    if (Oc(e) || Lc(e)) (i = e), (t = Pc(e)), (n = Bc(e));
    else {
      if (!kc.call(e, "name"))
        throw new Error(((e) => `Missing ${e} property in key`)("name"));
      const o = e.name;
      if (((i = o), kc.call(e, "weight") && ((r = e.weight), r <= 0)))
        throw new Error(
          ((e) => `Property 'weight' in key '${e}' must be a positive integer`)(
            o
          )
        );
      (t = Pc(o)), (n = Bc(o)), (s = e.getFn);
    }
    return { path: t, id: n, weight: r, src: i, getFn: s };
  }
  function Pc(e) {
    return Lc(e) ? e : e.split(".");
  }
  function Bc(e) {
    return Lc(e) ? e.join(".") : e;
  }
  var Vc = {
    isCaseSensitive: !1,
    includeScore: !1,
    keys: [],
    shouldSort: !0,
    sortFn: (e, t) =>
      e.score === t.score
        ? e.idx < t.idx
          ? -1
          : 1
        : e.score < t.score
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
      getFn: function (e, t) {
        let n = [],
          i = !1;
        const r = (e, t, s) => {
          if (Dc(e))
            if (t[s]) {
              const o = e[t[s]];
              if (!Dc(o)) return;
              if (s === t.length - 1 && (Oc(o) || wc(o) || Mc(o)))
                n.push(
                  (function (e) {
                    return null == e
                      ? ""
                      : (function (e) {
                          if ("string" == typeof e) return e;
                          let t = e + "";
                          return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
                        })(e);
                  })(o)
                );
              else if (Lc(o)) {
                i = !0;
                for (let e = 0, n = o.length; e < n; e += 1) r(o[e], t, s + 1);
              } else t.length && r(o, t, s + 1);
            } else n.push(e);
        };
        return r(e, Oc(t) ? t.split(".") : t, 0), i ? n : n[0];
      },
      ignoreLocation: !1,
      ignoreFieldNorm: !1,
      fieldNormWeight: 1,
    },
  };
  const jc = /[^ ]+/g;
  class zc {
    constructor({
      getFn: e = Vc.getFn,
      fieldNormWeight: t = Vc.fieldNormWeight,
    } = {}) {
      (this.norm = (function (e = 1, t = 3) {
        const n = new Map(),
          i = Math.pow(10, t);
        return {
          get(t) {
            const r = t.match(jc).length;
            if (n.has(r)) return n.get(r);
            const s = 1 / Math.pow(r, 0.5 * e),
              o = parseFloat(Math.round(s * i) / i);
            return n.set(r, o), o;
          },
          clear() {
            n.clear();
          },
        };
      })(t, 3)),
        (this.getFn = e),
        (this.isCreated = !1),
        this.setIndexRecords();
    }
    setSources(e = []) {
      this.docs = e;
    }
    setIndexRecords(e = []) {
      this.records = e;
    }
    setKeys(e = []) {
      (this.keys = e),
        (this._keysMap = {}),
        e.forEach((e, t) => {
          this._keysMap[e.id] = t;
        });
    }
    create() {
      !this.isCreated &&
        this.docs.length &&
        ((this.isCreated = !0),
        Oc(this.docs[0])
          ? this.docs.forEach((e, t) => {
              this._addString(e, t);
            })
          : this.docs.forEach((e, t) => {
              this._addObject(e, t);
            }),
        this.norm.clear());
    }
    add(e) {
      const t = this.size();
      Oc(e) ? this._addString(e, t) : this._addObject(e, t);
    }
    removeAt(e) {
      this.records.splice(e, 1);
      for (let t = e, n = this.size(); t < n; t += 1) this.records[t].i -= 1;
    }
    getValueForItemAtKeyId(e, t) {
      return e[this._keysMap[t]];
    }
    size() {
      return this.records.length;
    }
    _addString(e, t) {
      if (!Dc(e) || Rc(e)) return;
      let n = { v: e, i: t, n: this.norm.get(e) };
      this.records.push(n);
    }
    _addObject(e, t) {
      let n = { i: t, $: {} };
      this.keys.forEach((t, i) => {
        let r = t.getFn ? t.getFn(e) : this.getFn(e, t.path);
        if (Dc(r))
          if (Lc(r)) {
            let e = [];
            const t = [{ nestedArrIndex: -1, value: r }];
            for (; t.length; ) {
              const { nestedArrIndex: n, value: i } = t.pop();
              if (Dc(i))
                if (Oc(i) && !Rc(i)) {
                  let t = { v: i, i: n, n: this.norm.get(i) };
                  e.push(t);
                } else
                  Lc(i) &&
                    i.forEach((e, n) => {
                      t.push({ nestedArrIndex: n, value: e });
                    });
            }
            n.$[i] = e;
          } else if (Oc(r) && !Rc(r)) {
            let e = { v: r, n: this.norm.get(r) };
            n.$[i] = e;
          }
      }),
        this.records.push(n);
    }
    toJSON() {
      return { keys: this.keys, records: this.records };
    }
  }
  function Gc(
    e,
    t,
    { getFn: n = Vc.getFn, fieldNormWeight: i = Vc.fieldNormWeight } = {}
  ) {
    const r = new zc({ getFn: n, fieldNormWeight: i });
    return r.setKeys(e.map(Hc)), r.setSources(t), r.create(), r;
  }
  function Wc(
    e,
    {
      errors: t = 0,
      currentLocation: n = 0,
      expectedLocation: i = 0,
      distance: r = Vc.distance,
      ignoreLocation: s = Vc.ignoreLocation,
    } = {}
  ) {
    const o = t / e.length;
    if (s) return o;
    const a = Math.abs(i - n);
    return r ? o + a / r : a ? 1 : o;
  }
  const qc = 32;
  function Kc(
    e,
    t,
    n,
    {
      location: i = Vc.location,
      distance: r = Vc.distance,
      threshold: s = Vc.threshold,
      findAllMatches: o = Vc.findAllMatches,
      minMatchCharLength: a = Vc.minMatchCharLength,
      includeMatches: l = Vc.includeMatches,
      ignoreLocation: c = Vc.ignoreLocation,
    } = {}
  ) {
    if (t.length > qc) throw new Error(`Pattern length exceeds max of ${qc}.`);
    const u = t.length,
      d = e.length,
      p = Math.max(0, Math.min(i, d));
    let f = s,
      h = p;
    const m = a > 1 || l,
      g = m ? Array(d) : [];
    let $;
    for (; ($ = e.indexOf(t, h)) > -1; ) {
      let e = Wc(t, {
        currentLocation: $,
        expectedLocation: p,
        distance: r,
        ignoreLocation: c,
      });
      if (((f = Math.min(e, f)), (h = $ + u), m)) {
        let e = 0;
        for (; e < u; ) (g[$ + e] = 1), (e += 1);
      }
    }
    h = -1;
    let y = [],
      v = 1,
      I = u + d;
    const b = 1 << (u - 1);
    for (let i = 0; i < u; i += 1) {
      let s = 0,
        a = I;
      for (; s < a; ) {
        Wc(t, {
          errors: i,
          currentLocation: p + a,
          expectedLocation: p,
          distance: r,
          ignoreLocation: c,
        }) <= f
          ? (s = a)
          : (I = a),
          (a = Math.floor((I - s) / 2 + s));
      }
      I = a;
      let l = Math.max(1, p - a + 1),
        $ = o ? d : Math.min(p + a, d) + u,
        E = Array($ + 2);
      E[$ + 1] = (1 << i) - 1;
      for (let s = $; s >= l; s -= 1) {
        let o = s - 1,
          a = n[e.charAt(o)];
        if (
          (m && (g[o] = +!!a),
          (E[s] = ((E[s + 1] << 1) | 1) & a),
          i && (E[s] |= ((y[s + 1] | y[s]) << 1) | 1 | y[s + 1]),
          E[s] & b &&
            ((v = Wc(t, {
              errors: i,
              currentLocation: o,
              expectedLocation: p,
              distance: r,
              ignoreLocation: c,
            })),
            v <= f))
        ) {
          if (((f = v), (h = o), h <= p)) break;
          l = Math.max(1, 2 * p - h);
        }
      }
      if (
        Wc(t, {
          errors: i + 1,
          currentLocation: p,
          expectedLocation: p,
          distance: r,
          ignoreLocation: c,
        }) > f
      )
        break;
      y = E;
    }
    const E = { isMatch: h >= 0, score: Math.max(0.001, v) };
    if (m) {
      const e = (function (e = [], t = Vc.minMatchCharLength) {
        let n = [],
          i = -1,
          r = -1,
          s = 0;
        for (let o = e.length; s < o; s += 1) {
          let o = e[s];
          o && -1 === i
            ? (i = s)
            : o ||
              -1 === i ||
              ((r = s - 1), r - i + 1 >= t && n.push([i, r]), (i = -1));
        }
        return e[s - 1] && s - i >= t && n.push([i, s - 1]), n;
      })(g, a);
      e.length ? l && (E.indices = e) : (E.isMatch = !1);
    }
    return E;
  }
  function Xc(e) {
    let t = {};
    for (let n = 0, i = e.length; n < i; n += 1) {
      const r = e.charAt(n);
      t[r] = (t[r] || 0) | (1 << (i - n - 1));
    }
    return t;
  }
  class Yc {
    constructor(
      e,
      {
        location: t = Vc.location,
        threshold: n = Vc.threshold,
        distance: i = Vc.distance,
        includeMatches: r = Vc.includeMatches,
        findAllMatches: s = Vc.findAllMatches,
        minMatchCharLength: o = Vc.minMatchCharLength,
        isCaseSensitive: a = Vc.isCaseSensitive,
        ignoreLocation: l = Vc.ignoreLocation,
      } = {}
    ) {
      if (
        ((this.options = {
          location: t,
          threshold: n,
          distance: i,
          includeMatches: r,
          findAllMatches: s,
          minMatchCharLength: o,
          isCaseSensitive: a,
          ignoreLocation: l,
        }),
        (this.pattern = a ? e : e.toLowerCase()),
        (this.chunks = []),
        !this.pattern.length)
      )
        return;
      const c = (e, t) => {
          this.chunks.push({ pattern: e, alphabet: Xc(e), startIndex: t });
        },
        u = this.pattern.length;
      if (u > qc) {
        let e = 0;
        const t = u % qc,
          n = u - t;
        for (; e < n; ) c(this.pattern.substr(e, qc), e), (e += qc);
        if (t) {
          const e = u - qc;
          c(this.pattern.substr(e), e);
        }
      } else c(this.pattern, 0);
    }
    searchIn(e) {
      const { isCaseSensitive: t, includeMatches: n } = this.options;
      if ((t || (e = e.toLowerCase()), this.pattern === e)) {
        let t = { isMatch: !0, score: 0 };
        return n && (t.indices = [[0, e.length - 1]]), t;
      }
      const {
        location: i,
        distance: r,
        threshold: s,
        findAllMatches: o,
        minMatchCharLength: a,
        ignoreLocation: l,
      } = this.options;
      let c = [],
        u = 0,
        d = !1;
      this.chunks.forEach(({ pattern: t, alphabet: p, startIndex: f }) => {
        const {
          isMatch: h,
          score: m,
          indices: g,
        } = Kc(e, t, p, {
          location: i + f,
          distance: r,
          threshold: s,
          findAllMatches: o,
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
  const Qc = [];
  function Jc(e, t) {
    for (let n = 0, i = Qc.length; n < i; n += 1) {
      let i = Qc[n];
      if (i.condition(e, t)) return new i(e, t);
    }
    return new Yc(e, t);
  }
  const Zc = "$and",
    eu = "$or",
    tu = "$path",
    nu = "$val",
    iu = (e) => !(!e[Zc] && !e[eu]),
    ru = (e) => ({ [Zc]: Object.keys(e).map((t) => ({ [t]: e[t] })) });
  function su(e, t) {
    const n = e.matches;
    (t.matches = []),
      Dc(n) &&
        n.forEach((e) => {
          if (!Dc(e.indices) || !e.indices.length) return;
          const { indices: n, value: i } = e;
          let r = { indices: n, value: i };
          e.key && (r.key = e.key.src),
            e.idx > -1 && (r.refIndex = e.idx),
            t.matches.push(r);
        });
  }
  function ou(e, t) {
    t.score = e.score;
  }
  class au {
    constructor(e, t = {}, n) {
      if (((this.options = { ...Vc, ...t }), this.options.useExtendedSearch))
        throw new Error("Extended search is not available");
      (this._keyStore = new Uc(this.options.keys)), this.setCollection(e, n);
    }
    setCollection(e, t) {
      if (((this._docs = e), t && !(t instanceof zc)))
        throw new Error("Incorrect 'index' type");
      this._myIndex =
        t ||
        Gc(this.options.keys, this._docs, {
          getFn: this.options.getFn,
          fieldNormWeight: this.options.fieldNormWeight,
        });
    }
    add(e) {
      Dc(e) && (this._docs.push(e), this._myIndex.add(e));
    }
    remove(e = () => !1) {
      const t = [];
      for (let n = 0, i = this._docs.length; n < i; n += 1) {
        const r = this._docs[n];
        e(r, n) && (this.removeAt(n), (n -= 1), (i -= 1), t.push(r));
      }
      return t;
    }
    removeAt(e) {
      this._docs.splice(e, 1), this._myIndex.removeAt(e);
    }
    getIndex() {
      return this._myIndex;
    }
    search(e, { limit: t = -1 } = {}) {
      const {
        includeMatches: n,
        includeScore: i,
        shouldSort: r,
        sortFn: s,
        ignoreFieldNorm: o,
      } = this.options;
      let a = Oc(e)
        ? Oc(this._docs[0])
          ? this._searchStringList(e)
          : this._searchObjectList(e)
        : this._searchLogical(e);
      return (
        (function (e, { ignoreFieldNorm: t = Vc.ignoreFieldNorm }) {
          e.forEach((e) => {
            let n = 1;
            e.matches.forEach(({ key: e, norm: i, score: r }) => {
              const s = e ? e.weight : null;
              n *= Math.pow(
                0 === r && s ? Number.EPSILON : r,
                (s || 1) * (t ? 1 : i)
              );
            }),
              (e.score = n);
          });
        })(a, { ignoreFieldNorm: o }),
        r && a.sort(s),
        wc(t) && t > -1 && (a = a.slice(0, t)),
        (function (
          e,
          t,
          {
            includeMatches: n = Vc.includeMatches,
            includeScore: i = Vc.includeScore,
          } = {}
        ) {
          const r = [];
          return (
            n && r.push(su),
            i && r.push(ou),
            e.map((e) => {
              const { idx: n } = e,
                i = { item: t[n], refIndex: n };
              return (
                r.length &&
                  r.forEach((t) => {
                    t(e, i);
                  }),
                i
              );
            })
          );
        })(a, this._docs, { includeMatches: n, includeScore: i })
      );
    }
    _searchStringList(e) {
      const t = Jc(e, this.options),
        { records: n } = this._myIndex,
        i = [];
      return (
        n.forEach(({ v: e, i: n, n: r }) => {
          if (!Dc(e)) return;
          const { isMatch: s, score: o, indices: a } = t.searchIn(e);
          s &&
            i.push({
              item: e,
              idx: n,
              matches: [{ score: o, value: e, norm: r, indices: a }],
            });
        }),
        i
      );
    }
    _searchLogical(e) {
      throw new Error("Logical search is not available");
    }
    _searchObjectList(e) {
      const t = Jc(e, this.options),
        { keys: n, records: i } = this._myIndex,
        r = [];
      return (
        i.forEach(({ $: e, i: i }) => {
          if (!Dc(e)) return;
          let s = [];
          n.forEach((n, i) => {
            s.push(...this._findMatches({ key: n, value: e[i], searcher: t }));
          }),
            s.length && r.push({ idx: i, item: e, matches: s });
        }),
        r
      );
    }
    _findMatches({ key: e, value: t, searcher: n }) {
      if (!Dc(t)) return [];
      let i = [];
      if (Lc(t))
        t.forEach(({ v: t, i: r, n: s }) => {
          if (!Dc(t)) return;
          const { isMatch: o, score: a, indices: l } = n.searchIn(t);
          o &&
            i.push({ score: a, key: e, value: t, idx: r, norm: s, indices: l });
        });
      else {
        const { v: r, n: s } = t,
          { isMatch: o, score: a, indices: l } = n.searchIn(r);
        o && i.push({ score: a, key: e, value: r, norm: s, indices: l });
      }
      return i;
    }
  }
  (au.version = "6.6.2"),
    (au.createIndex = Gc),
    (au.parseIndex = function (
      e,
      { getFn: t = Vc.getFn, fieldNormWeight: n = Vc.fieldNormWeight } = {}
    ) {
      const { keys: i, records: r } = e,
        s = new zc({ getFn: t, fieldNormWeight: n });
      return s.setKeys(i), s.setIndexRecords(r), s;
    }),
    (au.config = Vc),
    (au.parseQuery = function (e, t, { auto: n = !0 } = {}) {
      const i = (e) => {
        let r = Object.keys(e);
        const s = ((e) => !!e[tu])(e);
        if (!s && r.length > 1 && !iu(e)) return i(ru(e));
        if (((e) => !Lc(e) && Nc(e) && !iu(e))(e)) {
          const i = s ? e[tu] : r[0],
            o = s ? e[nu] : e[i];
          if (!Oc(o)) throw new Error(((e) => `Invalid value for key ${e}`)(i));
          const a = { keyId: Bc(i), pattern: o };
          return n && (a.searcher = Jc(o, t)), a;
        }
        let o = { children: [], operator: r[0] };
        return (
          r.forEach((t) => {
            const n = e[t];
            Lc(n) &&
              n.forEach((e) => {
                o.children.push(i(e));
              });
          }),
          o
        );
      };
      return iu(e) || (e = ru(e)), i(e);
    });
  const lu = { ignoreLocation: !0 };
  function cu(e, t, n) {
    const i = e.slice();
    return (i[19] = t[n]), i;
  }
  function uu(e, t, n) {
    const i = e.slice();
    return (i[19] = t[n]), i;
  }
  function du(e) {
    let t, n;
    return (
      (t = new tc({
        props: { $$slots: { label: [gu], default: [mu] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          16777220 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function pu(e) {
    let t, n;
    return (
      (t = new tc({
        props: { $$slots: { default: [Iu] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          16777228 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function fu(e) {
    let t, n;
    return (
      (t = new tc({
        props: { $$slots: { default: [bu] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          16777228 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function hu(e) {
    let t, n;
    return (
      (t = new tc({
        props: { $$slots: { default: [Eu] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          16777244 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function mu(e) {
    let t, n, i;
    function r(t) {
      e[15](t);
    }
    let s = { indeterminate: null === e[2] };
    return (
      void 0 !== e[2] && (s.checked = e[2]),
      (t = new Wl({ props: s })),
      ae.push(() => Re(t, "checked", r)),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, i) {
          const r = {};
          4 & i && (r.indeterminate = null === e[2]),
            !n && 4 & i && ((n = !0), (r.checked = e[2]), he(() => (n = !1))),
            t.$set(r);
        },
        i(e) {
          i || (_e(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function gu(t) {
    let n;
    return {
      c() {
        (n = M("span")), (n.textContent = `${t[6]}`), U(n, "slot", "label");
      },
      m(e, t) {
        L(e, n, t);
      },
      p: e,
      d(e) {
        e && O(n);
      },
    };
  }
  function $u(t) {
    let n,
      i = t[19].name + "";
    return {
      c() {
        n = D(i);
      },
      m(e, t) {
        L(e, n, t);
      },
      p: e,
      d(e) {
        e && O(n);
      },
    };
  }
  function yu(e) {
    let t, n;
    return (
      (t = new ja({
        props: {
          value: e[19].name,
          $$slots: { default: [$u] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          16777216 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function vu(e) {
    let t,
      n,
      i = e[7],
      r = [];
    for (let t = 0; t < i.length; t += 1) r[t] = yu(uu(e, i, t));
    const s = (e) =>
      Se(r[e], 1, 1, () => {
        r[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < r.length; e += 1) r[e].c();
        t = F();
      },
      m(e, i) {
        for (let t = 0; t < r.length; t += 1) r[t].m(e, i);
        L(e, t, i), (n = !0);
      },
      p(e, n) {
        if (128 & n) {
          let o;
          for (i = e[7], o = 0; o < i.length; o += 1) {
            const s = uu(e, i, o);
            r[o]
              ? (r[o].p(s, n), _e(r[o], 1))
              : ((r[o] = yu(s)),
                r[o].c(),
                _e(r[o], 1),
                r[o].m(t.parentNode, t));
          }
          for (Ae(), o = i.length; o < r.length; o += 1) s(o);
          Ce();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < i.length; e += 1) _e(r[e]);
          n = !0;
        }
      },
      o(e) {
        r = r.filter(Boolean);
        for (let e = 0; e < r.length; e += 1) Se(r[e]);
        n = !1;
      },
      d(e) {
        w(r, e), e && O(t);
      },
    };
  }
  function Iu(e) {
    let t, n, i, r, s, o;
    function a(t) {
      e[13](t);
    }
    let l = { indeterminate: null === e[2] };
    function c(t) {
      e[14](t);
    }
    void 0 !== e[2] && (l.checked = e[2]),
      (t = new Wl({ props: l })),
      ae.push(() => Re(t, "checked", a));
    let u = { label: e[6], $$slots: { default: [vu] }, $$scope: { ctx: e } };
    return (
      void 0 !== e[3] && (u.value = e[3]),
      (r = new Ha({ props: u })),
      ae.push(() => Re(r, "value", c)),
      {
        c() {
          Fe(t.$$.fragment), (i = R()), Fe(r.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), L(e, i, n), ke(r, e, n), (o = !0);
        },
        p(e, i) {
          const o = {};
          4 & i && (o.indeterminate = null === e[2]),
            !n && 4 & i && ((n = !0), (o.checked = e[2]), he(() => (n = !1))),
            t.$set(o);
          const a = {};
          16777216 & i && (a.$$scope = { dirty: i, ctx: e }),
            !s && 8 & i && ((s = !0), (a.value = e[3]), he(() => (s = !1))),
            r.$set(a);
        },
        i(e) {
          o || (_e(t.$$.fragment, e), _e(r.$$.fragment, e), (o = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), Se(r.$$.fragment, e), (o = !1);
        },
        d(e) {
          Ue(t, e), e && O(i), Ue(r, e);
        },
      }
    );
  }
  function bu(e) {
    let t, n, i, r, s, o;
    function a(t) {
      e[11](t);
    }
    let l = { indeterminate: null === e[2] };
    function c(t) {
      e[12](t);
    }
    void 0 !== e[2] && (l.checked = e[2]),
      (t = new Wl({ props: l })),
      ae.push(() => Re(t, "checked", a));
    let u = { label: e[6], type: "number" };
    return (
      void 0 !== e[3] && (u.value = e[3]),
      (r = new ns({ props: u })),
      ae.push(() => Re(r, "value", c)),
      {
        c() {
          Fe(t.$$.fragment), (i = R()), Fe(r.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), L(e, i, n), ke(r, e, n), (o = !0);
        },
        p(e, i) {
          const o = {};
          4 & i && (o.indeterminate = null === e[2]),
            !n && 4 & i && ((n = !0), (o.checked = e[2]), he(() => (n = !1))),
            t.$set(o);
          const a = {};
          !s && 8 & i && ((s = !0), (a.value = e[3]), he(() => (s = !1))),
            r.$set(a);
        },
        i(e) {
          o || (_e(t.$$.fragment, e), _e(r.$$.fragment, e), (o = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), Se(r.$$.fragment, e), (o = !1);
        },
        d(e) {
          Ue(t, e), e && O(i), Ue(r, e);
        },
      }
    );
  }
  function Eu(e) {
    let t, n, i, r, s, o;
    function a(t) {
      e[9](t);
    }
    let l = { indeterminate: null === e[2] };
    function c(t) {
      e[10](t);
    }
    void 0 !== e[2] && (l.checked = e[2]),
      (t = new Wl({ props: l })),
      ae.push(() => Re(t, "checked", a));
    let u = { combobox: !0, label: e[6], search: e[4] };
    return (
      void 0 !== e[3] && (u.value = e[3]),
      (r = new Tc({ props: u })),
      ae.push(() => Re(r, "value", c)),
      {
        c() {
          Fe(t.$$.fragment), (i = R()), Fe(r.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), L(e, i, n), ke(r, e, n), (o = !0);
        },
        p(e, i) {
          const o = {};
          4 & i && (o.indeterminate = null === e[2]),
            !n && 4 & i && ((n = !0), (o.checked = e[2]), he(() => (n = !1))),
            t.$set(o);
          const a = {};
          16 & i && (a.search = e[4]),
            !s && 8 & i && ((s = !0), (a.value = e[3]), he(() => (s = !1))),
            r.$set(a);
        },
        i(e) {
          o || (_e(t.$$.fragment, e), _e(r.$$.fragment, e), (o = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), Se(r.$$.fragment, e), (o = !1);
        },
        d(e) {
          Ue(t, e), e && O(i), Ue(r, e);
        },
      }
    );
  }
  function xu(e) {
    let t,
      n,
      i,
      r,
      s,
      o,
      a = e[0].expanded && Au(e);
    return {
      c() {
        (t = M("div")),
          (t.textContent = "▶"),
          (n = R()),
          a && a.c(),
          (i = F()),
          U(t, "class", "arrow svelte-7av3ky"),
          j(t, "arrowDown", e[5]);
      },
      m(l, c) {
        L(l, t, c),
          L(l, n, c),
          a && a.m(l, c),
          L(l, i, c),
          (r = !0),
          s || ((o = k(t, "click", e[8])), (s = !0));
      },
      p(e, n) {
        32 & n && j(t, "arrowDown", e[5]),
          e[0].expanded
            ? a
              ? (a.p(e, n), 1 & n && _e(a, 1))
              : ((a = Au(e)), a.c(), _e(a, 1), a.m(i.parentNode, i))
            : a &&
              (Ae(),
              Se(a, 1, 1, () => {
                a = null;
              }),
              Ce());
      },
      i(e) {
        r || (_e(a), (r = !0));
      },
      o(e) {
        Se(a), (r = !1);
      },
      d(e) {
        e && O(t), e && O(n), a && a.d(e), e && O(i), (s = !1), o();
      },
    };
  }
  function Au(e) {
    let t,
      n,
      i = e[7],
      r = [];
    for (let t = 0; t < i.length; t += 1) r[t] = Cu(cu(e, i, t));
    const s = (e) =>
      Se(r[e], 1, 1, () => {
        r[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < r.length; e += 1) r[e].c();
        t = F();
      },
      m(e, i) {
        for (let t = 0; t < r.length; t += 1) r[t].m(e, i);
        L(e, t, i), (n = !0);
      },
      p(e, n) {
        if (130 & n) {
          let o;
          for (i = e[7], o = 0; o < i.length; o += 1) {
            const s = cu(e, i, o);
            r[o]
              ? (r[o].p(s, n), _e(r[o], 1))
              : ((r[o] = Cu(s)),
                r[o].c(),
                _e(r[o], 1),
                r[o].m(t.parentNode, t));
          }
          for (Ae(), o = i.length; o < r.length; o += 1) s(o);
          Ce();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < i.length; e += 1) _e(r[e]);
          n = !0;
        }
      },
      o(e) {
        r = r.filter(Boolean);
        for (let e = 0; e < r.length; e += 1) Se(r[e]);
        n = !1;
      },
      d(e) {
        w(r, e), e && O(t);
      },
    };
  }
  function Cu(e) {
    let t, n;
    return (
      (t = new Tu({ props: { tree: e[19], tags: e[1] } })),
      t.$on("change", e[16]),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2 & n && (i.tags = e[1]), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function _u(e) {
    let t, n, i, r, s, o;
    const a = [hu, fu, pu, du],
      l = [];
    function c(e, t) {
      return "TextField" === e[0].type
        ? 0
        : "IntegerField" === e[0].type
        ? 1
        : "EnumField" === e[0].type
        ? 2
        : 3;
    }
    (i = c(e)), (r = l[i] = a[i](e));
    let u = e[7].length > 0 && "EnumField" !== e[0].type && xu(e);
    return {
      c() {
        (t = M("ul")),
          (n = M("li")),
          r.c(),
          (s = R()),
          u && u.c(),
          U(t, "class", "svelte-7av3ky");
      },
      m(e, r) {
        L(e, t, r),
          _(t, n),
          l[i].m(n, null),
          _(n, s),
          u && u.m(n, null),
          (o = !0);
      },
      p(e, [t]) {
        let o = i;
        (i = c(e)),
          i === o
            ? l[i].p(e, t)
            : (Ae(),
              Se(l[o], 1, 1, () => {
                l[o] = null;
              }),
              Ce(),
              (r = l[i]),
              r ? r.p(e, t) : ((r = l[i] = a[i](e)), r.c()),
              _e(r, 1),
              r.m(n, s)),
          e[7].length > 0 && "EnumField" !== e[0].type
            ? u
              ? (u.p(e, t), 1 & t && _e(u, 1))
              : ((u = xu(e)), u.c(), _e(u, 1), u.m(n, null))
            : u &&
              (Ae(),
              Se(u, 1, 1, () => {
                u = null;
              }),
              Ce());
      },
      i(e) {
        o || (_e(r), _e(u), (o = !0));
      },
      o(e) {
        Se(r), Se(u), (o = !1);
      },
      d(e) {
        e && O(t), l[i].d(), u && u.d();
      },
    };
  }
  function Su(e, t, n) {
    let i,
      { tree: r } = t;
    const { name: s, children: o } = r;
    let a,
      { tags: l = [] } = t;
    let c = void 0 !== r.selected && r.selected,
      u = r.value || null;
    const d = ne();
    return (
      (e.$$set = (e) => {
        "tree" in e && n(0, (r = e.tree)), "tags" in e && n(1, (l = e.tags));
      }),
      (e.$$.update = () => {
        12 & e.$$.dirty &&
          (console.log("checked:", c),
          n(0, (r.selected = c), r),
          n(0, (r.value = u), r),
          d("change", { tree: r })),
          3 & e.$$.dirty &&
            "TextField" === r.type &&
            n(
              4,
              (a = (function (e, t) {
                const n = t
                    .map((t) => Be.valueForId(t, e))
                    .sort()
                    .filter((e, t, n) => null != e && e !== n[t - 1]),
                  i = new au(n, lu);
                return async (e) =>
                  e ? i.search(e).map(({ item: e }) => e) : n;
              })(r.id, l))
            ),
          1 & e.$$.dirty && n(5, (i = r.expanded));
      }),
      [
        r,
        l,
        c,
        u,
        a,
        i,
        s,
        o,
        () => {
          n(0, (r.expanded = !r.expanded), r);
        },
        function (e) {
          (c = e), n(2, c);
        },
        function (e) {
          (u = e), n(3, u);
        },
        function (e) {
          (c = e), n(2, c);
        },
        function (e) {
          (u = e), n(3, u);
        },
        function (e) {
          (c = e), n(2, c);
        },
        function (e) {
          (u = e), n(3, u);
        },
        function (e) {
          (c = e), n(2, c);
        },
        function (t) {
          se.call(this, e, t);
        },
      ]
    );
  }
  class Tu extends Pe {
    constructor(e) {
      super(), He(this, e, Su, _u, a, { tree: 0, tags: 1 });
    }
  }
  function Lu(e, t, n) {
    const i = e.slice();
    return (i[5] = t[n]), i;
  }
  function Ou(e, t) {
    let i, r, s;
    const o = [t[5]];
    let a = {};
    for (let e = 0; e < o.length; e += 1) a = n(a, o[e]);
    return (
      (r = new Tu({ props: a })),
      r.$on("change", t[1]),
      {
        key: e,
        first: null,
        c() {
          (i = F()), Fe(r.$$.fragment), (this.first = i);
        },
        m(e, t) {
          L(e, i, t), ke(r, e, t), (s = !0);
        },
        p(e, n) {
          t = e;
          const i = 1 & n ? Ne(o, [De(t[5])]) : {};
          r.$set(i);
        },
        i(e) {
          s || (_e(r.$$.fragment, e), (s = !0));
        },
        o(e) {
          Se(r.$$.fragment, e), (s = !1);
        },
        d(e) {
          e && O(i), Ue(r, e);
        },
      }
    );
  }
  function wu(e) {
    let t,
      n,
      i = [],
      r = new Map(),
      s = e[0];
    const o = (e) => e[5].tree.id;
    for (let t = 0; t < s.length; t += 1) {
      let n = Lu(e, s, t),
        a = o(n);
      r.set(a, (i[t] = Ou(a, n)));
    }
    return {
      c() {
        t = M("main");
        for (let e = 0; e < i.length; e += 1) i[e].c();
      },
      m(e, r) {
        L(e, t, r);
        for (let e = 0; e < i.length; e += 1) i[e].m(t, null);
        n = !0;
      },
      p(e, [n]) {
        3 & n &&
          ((s = e[0]),
          Ae(),
          (i = Me(i, n, o, 1, e, s, r, t, Oe, Ou, null, Lu)),
          Ce());
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < s.length; e += 1) _e(i[e]);
          n = !0;
        }
      },
      o(e) {
        for (let e = 0; e < i.length; e += 1) Se(i[e]);
        n = !1;
      },
      d(e) {
        e && O(t);
        for (let e = 0; e < i.length; e += 1) i[e].d();
      },
    };
  }
  function Mu(e) {
    const t = e.children.flatMap(Mu);
    return e.selected && t.push(e), t;
  }
  function Nu(e, t, n) {
    let i,
      { trees: r = [] } = t,
      { tags: s = [] } = t;
    const o = ne();
    return (
      (e.$$set = (e) => {
        "trees" in e && n(2, (r = e.trees)), "tags" in e && n(3, (s = e.tags));
      }),
      (e.$$.update = () => {
        12 & e.$$.dirty &&
          n(
            0,
            (i = r.map((e) => ({
              tree: e,
              tags: s.filter((t) => e.canMatch(t)),
            })))
          );
      }),
      [
        i,
        function () {
          const e = r.flatMap(Mu);
          o("change", { filterTags: e });
        },
        r,
        s,
      ]
    );
  }
  class Du extends Pe {
    constructor(e) {
      super(), He(this, e, Nu, wu, a, { trees: 2, tags: 3 });
    }
  }
  function Ru(e) {
    let t, i, r, a, l, u;
    const h = e[9].default,
      m = c(h, e, e[8], null);
    let g = [
        {
          class: (i = yt({
            [e[1]]: !0,
            "mdc-card": !0,
            "mdc-card--outlined": "outlined" === e[2],
            "smui-card--padded": e[3],
          })),
        },
        e[6],
      ],
      $ = {};
    for (let e = 0; e < g.length; e += 1) $ = n($, g[e]);
    return {
      c() {
        (t = M("div")), m && m.c(), H(t, $);
      },
      m(n, i) {
        L(n, t, i),
          m && m.m(t, null),
          e[10](t),
          (a = !0),
          l ||
            ((u = [v((r = Ct.call(null, t, e[0]))), v(e[5].call(null, t))]),
            (l = !0));
      },
      p(e, [n]) {
        m &&
          m.p &&
          (!a || 256 & n) &&
          p(m, h, e, e[8], a ? d(h, e[8], n, null) : f(e[8]), null),
          H(
            t,
            ($ = Ne(g, [
              (!a ||
                (14 & n &&
                  i !==
                    (i = yt({
                      [e[1]]: !0,
                      "mdc-card": !0,
                      "mdc-card--outlined": "outlined" === e[2],
                      "smui-card--padded": e[3],
                    })))) && { class: i },
              64 & n && e[6],
            ]))
          ),
          r && o(r.update) && 1 & n && r.update.call(null, e[0]);
      },
      i(e) {
        a || (_e(m, e), (a = !0));
      },
      o(e) {
        Se(m, e), (a = !1);
      },
      d(n) {
        n && O(t), m && m.d(n), e[10](null), (l = !1), s(u);
      },
    };
  }
  function Fu(e, t, i) {
    const r = ["use", "class", "variant", "padded", "getElement"];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t;
    const l = xt(Z());
    let c,
      { use: u = [] } = t,
      { class: d = "" } = t,
      { variant: p = "raised" } = t,
      { padded: f = !1 } = t;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(6, (s = m(t, r))),
          "use" in e && i(0, (u = e.use)),
          "class" in e && i(1, (d = e.class)),
          "variant" in e && i(2, (p = e.variant)),
          "padded" in e && i(3, (f = e.padded)),
          "$$scope" in e && i(8, (a = e.$$scope));
      }),
      [
        u,
        d,
        p,
        f,
        c,
        l,
        s,
        function () {
          return c;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (c = e), i(4, c);
          });
        },
      ]
    );
  }
  class ku extends Pe {
    constructor(e) {
      super(),
        He(this, e, Fu, Ru, a, {
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
  var Uu = Pt({ class: "smui-card__content", component: cn });
  function Hu(e) {
    let t, i, r, a, l, u;
    const h = e[8].default,
      m = c(h, e, e[7], null);
    let g = [
        {
          class: (i = yt({
            [e[1]]: !0,
            "mdc-card__actions": !0,
            "mdc-card__actions--full-bleed": e[2],
          })),
        },
        e[5],
      ],
      $ = {};
    for (let e = 0; e < g.length; e += 1) $ = n($, g[e]);
    return {
      c() {
        (t = M("div")), m && m.c(), H(t, $);
      },
      m(n, i) {
        L(n, t, i),
          m && m.m(t, null),
          e[9](t),
          (a = !0),
          l ||
            ((u = [v((r = Ct.call(null, t, e[0]))), v(e[4].call(null, t))]),
            (l = !0));
      },
      p(e, [n]) {
        m &&
          m.p &&
          (!a || 128 & n) &&
          p(m, h, e, e[7], a ? d(h, e[7], n, null) : f(e[7]), null),
          H(
            t,
            ($ = Ne(g, [
              (!a ||
                (6 & n &&
                  i !==
                    (i = yt({
                      [e[1]]: !0,
                      "mdc-card__actions": !0,
                      "mdc-card__actions--full-bleed": e[2],
                    })))) && { class: i },
              32 & n && e[5],
            ]))
          ),
          r && o(r.update) && 1 & n && r.update.call(null, e[0]);
      },
      i(e) {
        a || (_e(m, e), (a = !0));
      },
      o(e) {
        Se(m, e), (a = !1);
      },
      d(n) {
        n && O(t), m && m.d(n), e[9](null), (l = !1), s(u);
      },
    };
  }
  function Pu(e, t, i) {
    const r = ["use", "class", "fullBleed", "getElement"];
    let s = m(t, r),
      { $$slots: o = {}, $$scope: a } = t;
    const l = xt(Z());
    let c,
      { use: u = [] } = t,
      { class: d = "" } = t,
      { fullBleed: p = !1 } = t;
    return (
      ie("SMUI:button:context", "card:action"),
      ie("SMUI:icon-button:context", "card:action"),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(5, (s = m(t, r))),
          "use" in e && i(0, (u = e.use)),
          "class" in e && i(1, (d = e.class)),
          "fullBleed" in e && i(2, (p = e.fullBleed)),
          "$$scope" in e && i(7, (a = e.$$scope));
      }),
      [
        u,
        d,
        p,
        c,
        l,
        s,
        function () {
          return c;
        },
        a,
        o,
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (c = e), i(3, c);
          });
        },
      ]
    );
  }
  Pt({ class: "mdc-card__media-content", component: cn });
  Pt({ class: "mdc-card__action-buttons", component: cn }),
    Pt({ class: "mdc-card__action-icons", component: cn });
  const Bu = class extends Pe {
    constructor(e) {
      super(),
        He(this, e, Pu, Hu, a, {
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
  function Vu(e, t, n) {
    const i = e.slice();
    return (i[22] = t[n]), i;
  }
  function ju(e) {
    let t;
    return {
      c() {
        t = D("more_vert");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function zu(e) {
    let t;
    return {
      c() {
        t = D("Show more...");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Gu(e) {
    let t, n;
    return (
      (t = new eo({
        props: { $$slots: { default: [zu] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          33554432 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Wu(e) {
    let t;
    return {
      c() {
        t = D("Show all...");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function qu(e) {
    let t, n;
    return (
      (t = new eo({
        props: { $$slots: { default: [Wu] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          33554432 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Ku(e) {
    let t, n, i, r;
    return (
      (t = new oo({
        props: { $$slots: { default: [Gu] }, $$scope: { ctx: e } },
      })),
      t.$on("SMUI:action", e[13]),
      (i = new oo({
        props: { $$slots: { default: [qu] }, $$scope: { ctx: e } },
      })),
      i.$on("SMUI:action", e[14]),
      {
        c() {
          Fe(t.$$.fragment), (n = R()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), L(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          33554432 & n && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          33554432 & n && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          r || (_e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && O(n), Ue(i, e);
        },
      }
    );
  }
  function Xu(e) {
    let t, n;
    return (
      (t = new qs({
        props: { $$slots: { default: [Ku] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          33554437 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Yu(e) {
    let t,
      n = e[22].displayName + "";
    return {
      c() {
        t = D(n);
      },
      m(e, n) {
        L(e, t, n);
      },
      p(e, i) {
        32 & i && n !== (n = e[22].displayName + "") && P(t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Qu(e) {
    let t,
      n = e[22].time ? "Uploaded on " + dd(e[22].time) : "";
    return {
      c() {
        t = D(n);
      },
      m(e, n) {
        L(e, t, n);
      },
      p(e, i) {
        32 & i &&
          n !== (n = e[22].time ? "Uploaded on " + dd(e[22].time) : "") &&
          P(t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Ju(e) {
    let t, n, i, r;
    return (
      (t = new to({
        props: { $$slots: { default: [Yu] }, $$scope: { ctx: e } },
      })),
      (i = new no({
        props: { $$slots: { default: [Qu] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment), (n = R()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), L(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          33554464 & n && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          33554464 & n && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          r || (_e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && O(n), Ue(i, e);
        },
      }
    );
  }
  function Zu(e) {
    let t, n, i;
    function r(t) {
      e[16](t);
    }
    let s = { value: e[22].id };
    return (
      void 0 !== e[6] && (s.group = e[6]),
      (t = new Wl({ props: s })),
      ae.push(() => Re(t, "group", r)),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, i) {
          const r = {};
          32 & i && (r.value = e[22].id),
            !n && 64 & i && ((n = !0), (r.group = e[6]), he(() => (n = !1))),
            t.$set(r);
        },
        i(e) {
          i || (_e(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function ed(e) {
    let t, n, i, r, s;
    return (
      (t = new eo({
        props: { $$slots: { default: [Ju] }, $$scope: { ctx: e } },
      })),
      (i = new so({
        props: { $$slots: { default: [Zu] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment), (n = R()), Fe(i.$$.fragment), (r = R());
        },
        m(e, o) {
          ke(t, e, o), L(e, n, o), ke(i, e, o), L(e, r, o), (s = !0);
        },
        p(e, n) {
          const r = {};
          33554464 & n && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          33554528 & n && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          s || (_e(t.$$.fragment, e), _e(i.$$.fragment, e), (s = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), Se(i.$$.fragment, e), (s = !1);
        },
        d(e) {
          Ue(t, e), e && O(n), Ue(i, e), e && O(r);
        },
      }
    );
  }
  function td(e, t) {
    let n, i, r;
    return (
      (i = new oo({
        props: { $$slots: { default: [ed] }, $$scope: { ctx: t } },
      })),
      {
        key: e,
        first: null,
        c() {
          (n = F()), Fe(i.$$.fragment), (this.first = n);
        },
        m(e, t) {
          L(e, n, t), ke(i, e, t), (r = !0);
        },
        p(e, n) {
          t = e;
          const r = {};
          33554528 & n && (r.$$scope = { dirty: n, ctx: t }), i.$set(r);
        },
        i(e) {
          r || (_e(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          e && O(n), Ue(i, e);
        },
      }
    );
  }
  function nd(e) {
    let t,
      n,
      i = [],
      r = new Map(),
      s = e[5];
    const o = (e) => e[22].id;
    for (let t = 0; t < s.length; t += 1) {
      let n = Vu(e, s, t),
        a = o(n);
      r.set(a, (i[t] = td(a, n)));
    }
    return {
      c() {
        for (let e = 0; e < i.length; e += 1) i[e].c();
        t = F();
      },
      m(e, r) {
        for (let t = 0; t < i.length; t += 1) i[t].m(e, r);
        L(e, t, r), (n = !0);
      },
      p(e, n) {
        96 & n &&
          ((s = e[5]),
          Ae(),
          (i = Me(i, n, o, 1, e, s, r, t.parentNode, Oe, td, t, Vu)),
          Ce());
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < s.length; e += 1) _e(i[e]);
          n = !0;
        }
      },
      o(e) {
        for (let e = 0; e < i.length; e += 1) Se(i[e]);
        n = !1;
      },
      d(e) {
        for (let t = 0; t < i.length; t += 1) i[t].d(e);
        e && O(t);
      },
    };
  }
  function id(e) {
    let t,
      n,
      i,
      r,
      s,
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
      I = An(e[1]) + "",
      b = e[0].displayName + "",
      E = Math.min(1, e[2]) + "",
      x = e[0].children.length + "";
    return (
      (h = new ds({
        props: {
          class: "material-icons",
          style: "vertical-align: middle; margin: 0; padding: 0;",
          title: "Options",
          $$slots: { default: [ju] },
          $$scope: { ctx: e },
        },
      })),
      h.$on("click", e[12]),
      (g = new aa({
        props: {
          anchorCorner: "BOTTOM_RIGHT",
          $$slots: { default: [Xu] },
          $$scope: { ctx: e },
        },
      })),
      e[15](g),
      (y = new qs({
        props: {
          checkList: !0,
          $$slots: { default: [nd] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          (t = M("h2")),
            (n = D(I)),
            (i = D("s in ")),
            (r = D(b)),
            (s = R()),
            (o = M("h4")),
            (a = D("Showing ")),
            (l = D(E)),
            (c = D("-")),
            (u = D(e[2])),
            (d = D(" of ")),
            (p = D(x)),
            (f = R()),
            Fe(h.$$.fragment),
            (m = R()),
            Fe(g.$$.fragment),
            ($ = R()),
            Fe(y.$$.fragment),
            U(t, "class", "mdc-typography--headline6"),
            V(t, "margin", "0"),
            U(o, "class", "mdc-typography--subtitle3"),
            V(o, "margin", "0"),
            V(o, "color", "#888"),
            V(o, "text-align", "right");
        },
        m(e, I) {
          L(e, t, I),
            _(t, n),
            _(t, i),
            _(t, r),
            L(e, s, I),
            L(e, o, I),
            _(o, a),
            _(o, l),
            _(o, c),
            _(o, u),
            _(o, d),
            _(o, p),
            _(o, f),
            ke(h, o, null),
            _(o, m),
            ke(g, o, null),
            L(e, $, I),
            ke(y, e, I),
            (v = !0);
        },
        p(e, t) {
          (!v || 2 & t) && I !== (I = An(e[1]) + "") && P(n, I),
            (!v || 1 & t) && b !== (b = e[0].displayName + "") && P(r, b),
            (!v || 4 & t) && E !== (E = Math.min(1, e[2]) + "") && P(l, E),
            (!v || 4 & t) && P(u, e[2]),
            (!v || 1 & t) && x !== (x = e[0].children.length + "") && P(p, x);
          const i = {};
          33554432 & t && (i.$$scope = { dirty: t, ctx: e }), h.$set(i);
          const s = {};
          33554437 & t && (s.$$scope = { dirty: t, ctx: e }), g.$set(s);
          const o = {};
          33554528 & t && (o.$$scope = { dirty: t, ctx: e }), y.$set(o);
        },
        i(e) {
          v ||
            (_e(h.$$.fragment, e),
            _e(g.$$.fragment, e),
            _e(y.$$.fragment, e),
            (v = !0));
        },
        o(e) {
          Se(h.$$.fragment, e),
            Se(g.$$.fragment, e),
            Se(y.$$.fragment, e),
            (v = !1);
        },
        d(n) {
          n && O(t),
            n && O(s),
            n && O(o),
            Ue(h),
            e[15](null),
            Ue(g),
            n && O($),
            Ue(y, n);
        },
      }
    );
  }
  function rd(e) {
    let t;
    return {
      c() {
        t = D("Upload");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function sd(e) {
    let t, n;
    return (
      (t = new Oi({
        props: { $$slots: { default: [rd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          33554432 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function od(e) {
    let t;
    return {
      c() {
        t = D("Download");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function ad(e) {
    let t, n;
    return (
      (t = new Oi({
        props: { $$slots: { default: [od] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          33554432 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function ld(e) {
    let t, n, i, r;
    return (
      (t = new pl({
        props: { $$slots: { default: [sd] }, $$scope: { ctx: e } },
      })),
      t.$on("click", e[10]),
      (i = new pl({
        props: {
          disabled: 0 == e[6].length,
          $$slots: { default: [ad] },
          $$scope: { ctx: e },
        },
      })),
      i.$on("click", e[9]),
      {
        c() {
          Fe(t.$$.fragment), (n = R()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), L(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          33554432 & n && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          64 & n && (s.disabled = 0 == e[6].length),
            33554432 & n && (s.$$scope = { dirty: n, ctx: e }),
            i.$set(s);
        },
        i(e) {
          r || (_e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && O(n), Ue(i, e);
        },
      }
    );
  }
  function cd(e) {
    let t, n, i, r;
    return (
      (t = new Uu({
        props: { $$slots: { default: [id] }, $$scope: { ctx: e } },
      })),
      (i = new Bu({
        props: { $$slots: { default: [ld] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment), (n = R()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), L(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          33554663 & n && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          33554496 & n && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          r || (_e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && O(n), Ue(i, e);
        },
      }
    );
  }
  function ud(e) {
    let t,
      n,
      i,
      r,
      s,
      o,
      a = !1,
      l = () => {
        a = !1;
      };
    return (
      fe(e[11]),
      (i = new ku({
        props: { $$slots: { default: [cd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          (n = M("div")),
            Fe(i.$$.fragment),
            U(n, "class", "card-container svelte-11g709w"),
            j(n, "sticky", e[8] > e[4]);
        },
        m(c, u) {
          L(c, n, u),
            ke(i, n, null),
            e[17](n),
            (r = !0),
            s ||
              ((o = k(window, "scroll", () => {
                (a = !0), clearTimeout(t), (t = setTimeout(l, 100)), e[11]();
              })),
              (s = !0));
        },
        p(e, [r]) {
          256 & r &&
            !a &&
            ((a = !0),
            clearTimeout(t),
            scrollTo(window.pageXOffset, e[8]),
            (t = setTimeout(l, 100)));
          const s = {};
          33554663 & r && (s.$$scope = { dirty: r, ctx: e }),
            i.$set(s),
            272 & r && j(n, "sticky", e[8] > e[4]);
        },
        i(e) {
          r || (_e(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(i.$$.fragment, e), (r = !1);
        },
        d(t) {
          t && O(n), Ue(i), e[17](null), (s = !1), o();
        },
      }
    );
  }
  function dd(e) {
    return new Date(e).toLocaleDateString("en-us", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }
  function pd(e, t, n) {
    let i,
      { artifactSet: r } = t,
      { contentType: s = "artifact" } = t,
      o = 10,
      a = [],
      l = [];
    const c = ne();
    let u,
      d,
      p = null;
    function f() {
      r &&
        p !== r.hash &&
        (n(6, (l = [])),
        (p = r.hash),
        n(2, (o = Math.min(r.children.length, 10))),
        h(o));
    }
    function h(e) {
      if (r) {
        const t = r.children.length - e;
        n(5, (a = r.children.slice(t, t + e)));
      }
    }
    f();
    let m = 0;
    return (
      (e.$$set = (e) => {
        "artifactSet" in e && n(0, (r = e.artifactSet)),
          "contentType" in e && n(1, (s = e.contentType));
      }),
      (e.$$.update = () => {
        if (
          (1 & e.$$.dirty && f(), 4 & e.$$.dirty && h(o), 24 & e.$$.dirty && d)
        ) {
          const e = d.offsetParent.getBoundingClientRect();
          n(4, (m = e.top + d.offsetTop)), console.log(m);
        }
      }),
      [
        r,
        s,
        o,
        d,
        m,
        a,
        l,
        i,
        u,
        async function () {
          c("download", { artifactSet: r, artifactIds: [...l] });
        },
        async function () {
          c("upload", { artifactSet: r });
        },
        function () {
          n(8, (u = window.pageYOffset));
        },
        () => i.setOpen(!0),
        () => n(2, (o = Math.min(r.children.length, o + 10))),
        () => n(2, (o = r.children.length)),
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (i = e), n(7, i);
          });
        },
        function (e) {
          (l = e), n(6, l);
        },
        function (e) {
          ae[e ? "unshift" : "push"](() => {
            (d = e), n(3, d);
          });
        },
      ]
    );
  }
  class fd extends Pe {
    constructor(e) {
      super(), He(this, e, pd, ud, a, { artifactSet: 0, contentType: 1 });
    }
  }
  class hd {
    constructor(e, t) {
      (this.id = e), (this.version = t);
    }
    supports(e) {
      return this.id === e.id && this.version.supports(e.version);
    }
    static from(e) {
      let t;
      if (e.tag) t = new gd(e.commit, e.tag);
      else if (e.branch) t = new $d(e.commit, e.branch);
      else {
        if (!e.commit) {
          const t = JSON.stringify(e);
          throw new Error(`Could not find tag, branch, or commit in ${t}`);
        }
        t = new md(e.commit);
      }
      return new hd(e.id, t);
    }
  }
  class md {
    constructor(e) {
      this.hash = e;
    }
    supports(e) {
      return e.hash === this.hash;
    }
  }
  class gd extends md {
    constructor(e, t) {
      super(e), (this.version = vd.parse(t));
    }
    supports(e) {
      return e instanceof gd
        ? this.version.major === e.version.major && this.version.gte(e.version)
        : super.supports(e);
    }
  }
  class $d extends md {
    constructor(e, t) {
      super(e), (this.name = t);
    }
    supports(e) {
      return e instanceof $d ? e.name === this.name : super.supports(e);
    }
  }
  class yd extends Error {
    constructor(e) {
      super(`Unable to parse: ${e}`);
    }
  }
  class vd {
    constructor(e, t = 0, n = 0) {
      (this.major = e), (this.minor = t), (this.patch = n);
    }
    gte(e) {
      return (
        !(this.major < e.major) &&
        !(this.minor < e.minor) &&
        !(this.patch < e.patch)
      );
    }
    static parse(e) {
      e = e.replace(/^v?/, "");
      const [t, n = 0, i = 0] = e.split(".").map((t) => {
        if (!/\d+/.test(t)) throw new yd(e);
        return parseInt(t);
      });
      return new vd(t, n, i);
    }
  }
  class Id {
    constructor() {
      this.baseUrl = window.location.href
        .replace("Search", "TagFormat")
        .replace(/static.*$/, "human");
    }
    async toHumanFormat(e) {
      const t = encodeURIComponent(JSON.stringify(e)),
        n = `${this.baseUrl}?tags=${t}`,
        i = await fetch(n);
      if (i.status > 399) throw new bd(await i.text());
      return await i.json();
    }
  }
  class bd extends Error {}
  class Ed {
    constructor() {
      const e = window.location.href.split("/");
      e.pop(), e.pop(), (this.baseUrl = e.join("/") + "/artifacts/");
    }
    async listArtifacts() {
      const e = (await this._fetchJson(this.baseUrl)).mapError(
        (e) => new Cd(e.message)
      );
      return xn(await e.unwrap(), (e) =>
        class {
          static tryFrom(e) {
            if (e.displayName) {
              const t = [e.id, ...e.children.map((e) => e.id).sort()].join("/");
              return (
                (e.hash = t),
                (e.children = e.children.map(
                  (e) => (e.taxonomy && (e.taxonomy = hd.from(e.taxonomy)), e)
                )),
                e
              );
            }
            console.log("Found malformed data. Filtering out. Data:", e);
          }
        }.tryFrom(e)
      );
    }
    async getDownloadUrl(e, ...t) {
      const n = `ids=${encodeURIComponent(JSON.stringify(t))}`;
      return this.baseUrl + e + `/download?${n}`;
    }
    async pushArtifact(e, t) {
      console.log("Uploading to", t, e.name);
      const n = {
        method: "PUT",
        headers: {
          Accept: "application/xml",
          "Content-Type": "application/octet-stream",
          "x-ms-blob-type": "BlockBlob",
          "x-ms-encryption-algorithm": "AES256",
        },
        body: e,
      };
      return (await this._fetch(t, n))
        .mapError((e) => new Sd(e.message))
        .unwrap();
    }
    async appendArtifact(e, t, n) {
      console.log({ action: "append", metadata: t, files: n });
      const i = (function (e) {
          return (
            e.children.sort((e, t) =>
              e.time === t.time
                ? e.displayName < t.displayName
                  ? -1
                  : 1
                : e.time < t.time
                ? -1
                : 1
            ),
            e.children[e.children.length - 1]
          );
        })(e),
        r = i && i.id,
        s = r ? "?lastId=" + encodeURIComponent(r) : "",
        o = this.baseUrl + e.id + "/uploadUrl" + s,
        a = n.map((e) => e.name),
        l = {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ metadata: t, filenames: a }),
        },
        c = (
          await (await this._fetchJson(o, l))
            .mapError((e) => new Sd(e.message))
            .unwrap()
        ).map(async (e) => {
          const t = e.name.substring(4),
            i = n.find((e) => e.name == t);
          !(function (e, t) {
            if (!e) throw t;
          })(!!i, new Sd("Could not find upload URL for " + t)),
            await this.pushArtifact(i, e.sasUrl);
        });
      await Promise.all(c), console.log("Append artifact:", t, n);
    }
    async updateArtifact(e, t) {
      console.log("Updating artifact:", e, t);
    }
    async createArtifact(e, t) {
      console.log("Creating artifact:", e, t);
      const n = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metadata: e }),
      };
      return (await this._fetchJson(this.baseUrl, n))
        .mapError((e) => new _d(e.message))
        .unwrap();
    }
    async _fetch(e, t = null) {
      const n = await fetch(e, t);
      let i = null;
      return n.status > 399 && (i = new xd(await n.text())), new En(n, i);
    }
    async _fetchJson(e, t = null) {
      return (await this._fetch(e, t)).map((e) => e.json());
    }
  }
  class xd extends Error {
    constructor(e) {
      super(e);
    }
  }
  class Ad extends xd {
    constructor(e, t) {
      super(`Unable to ${e}: ${t}`);
    }
  }
  class Cd extends Ad {
    constructor(e) {
      super("list artifacts", e);
    }
  }
  class _d extends Ad {
    constructor(e) {
      super("create", e);
    }
  }
  class Sd extends Ad {
    constructor(e) {
      super("append", e);
    }
  }
  function Td(e, t, n) {
    const i = e.slice();
    return (i[65] = t[n]), i;
  }
  function Ld(e, t, n) {
    const i = e.slice();
    return (i[71] = t[n]), i;
  }
  function Od(e) {
    let t,
      n,
      i = (e[9] && e[9].displayName) + "";
    return {
      c() {
        (t = D("Append data to ")), (n = D(i));
      },
      m(e, i) {
        L(e, t, i), L(e, n, i);
      },
      p(e, t) {
        512 & t[0] && i !== (i = (e[9] && e[9].displayName) + "") && P(n, i);
      },
      d(e) {
        e && O(t), e && O(n);
      },
    };
  }
  function wd(e) {
    let t,
      n,
      i = e[71].name + "";
    return {
      c() {
        (t = M("li")), (n = D(i)), U(t, "class", "svelte-z7sp86");
      },
      m(e, i) {
        L(e, t, i), _(t, n);
      },
      p(e, t) {
        256 & t[0] && i !== (i = e[71].name + "") && P(n, i);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Md(t) {
    let n;
    return {
      c() {
        (n = M("p")),
          (n.textContent = "Select dataset to upload."),
          U(n, "class", "svelte-z7sp86");
      },
      m(e, t) {
        L(e, n, t);
      },
      p: e,
      d(e) {
        e && O(n);
      },
    };
  }
  function Nd(t) {
    let n;
    return {
      c() {
        (n = M("p")),
          (n.textContent = "Select tags file for dataset."),
          U(n, "class", "svelte-z7sp86");
      },
      m(e, t) {
        L(e, n, t);
      },
      p: e,
      d(e) {
        e && O(n);
      },
    };
  }
  function Dd(e) {
    let t,
      n,
      i,
      r,
      s,
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
      I,
      b,
      E,
      x,
      A,
      C = (e[10] ? e[10].taxonomyTags.map(fp).join(", ") : "") + "";
    function S(t) {
      e[24](t);
    }
    let T = { label: "Name" };
    void 0 !== e[11] && (T.value = e[11]),
      (t = new ns({ props: T })),
      ae.push(() => Re(t, "value", S));
    let N = e[8],
      F = [];
    for (let t = 0; t < N.length; t += 1) F[t] = wd(Ld(e, N, t));
    return (
      (u = new Ul({
        props: {
          multiple: !0,
          $$slots: { default: [Md] },
          $$scope: { ctx: e },
        },
      })),
      u.$on("drop", e[18]),
      (I = new Ul({
        props: {
          accept: ".json",
          $$slots: { default: [Nd] },
          $$scope: { ctx: e },
        },
      })),
      I.$on("drop", e[19]),
      {
        c() {
          Fe(t.$$.fragment),
            (i = R()),
            (r = M("p")),
            (s = D(e[0])),
            (o = D(" file(s):")),
            (a = R()),
            (l = M("ul"));
          for (let e = 0; e < F.length; e += 1) F[e].c();
          (c = R()),
            Fe(u.$$.fragment),
            (d = R()),
            (p = M("p")),
            (f = D("Taxonomy Terms ")),
            (h = M("span")),
            (h.textContent = "(optional)"),
            (m = D(":")),
            (g = M("br")),
            ($ = R()),
            (y = D(C)),
            (v = R()),
            Fe(I.$$.fragment),
            (b = R()),
            (E = M("a")),
            (x = D("Click to select tags for your dataset.")),
            U(r, "class", "svelte-z7sp86"),
            U(l, "class", "svelte-z7sp86"),
            V(h, "font-style", "italic"),
            U(h, "class", "svelte-z7sp86"),
            U(g, "class", "svelte-z7sp86"),
            U(p, "class", "svelte-z7sp86"),
            U(E, "target", "_blank"),
            U(
              E,
              "href",
              window.location.href.replace("/Search/", "/TagCreator/")
            ),
            U(E, "class", "svelte-z7sp86");
        },
        m(e, n) {
          ke(t, e, n),
            L(e, i, n),
            L(e, r, n),
            _(r, s),
            _(r, o),
            L(e, a, n),
            L(e, l, n);
          for (let e = 0; e < F.length; e += 1) F[e].m(l, null);
          L(e, c, n),
            ke(u, e, n),
            L(e, d, n),
            L(e, p, n),
            _(p, f),
            _(p, h),
            _(p, m),
            _(p, g),
            _(p, $),
            _(p, y),
            L(e, v, n),
            ke(I, e, n),
            L(e, b, n),
            L(e, E, n),
            _(E, x),
            (A = !0);
        },
        p(e, i) {
          const r = {};
          if (
            (!n &&
              2048 & i[0] &&
              ((n = !0), (r.value = e[11]), he(() => (n = !1))),
            t.$set(r),
            (!A || 1 & i[0]) && P(s, e[0]),
            256 & i[0])
          ) {
            let t;
            for (N = e[8], t = 0; t < N.length; t += 1) {
              const n = Ld(e, N, t);
              F[t] ? F[t].p(n, i) : ((F[t] = wd(n)), F[t].c(), F[t].m(l, null));
            }
            for (; t < F.length; t += 1) F[t].d(1);
            F.length = N.length;
          }
          const o = {};
          4096 & i[2] && (o.$$scope = { dirty: i, ctx: e }),
            u.$set(o),
            (!A || 1024 & i[0]) &&
              C !==
                (C =
                  (e[10] ? e[10].taxonomyTags.map(fp).join(", ") : "") + "") &&
              P(y, C);
          const a = {};
          4096 & i[2] && (a.$$scope = { dirty: i, ctx: e }), I.$set(a);
        },
        i(e) {
          A ||
            (_e(t.$$.fragment, e),
            _e(u.$$.fragment, e),
            _e(I.$$.fragment, e),
            (A = !0));
        },
        o(e) {
          Se(t.$$.fragment, e),
            Se(u.$$.fragment, e),
            Se(I.$$.fragment, e),
            (A = !1);
        },
        d(e) {
          Ue(t, e),
            e && O(i),
            e && O(r),
            e && O(a),
            e && O(l),
            w(F, e),
            e && O(c),
            Ue(u, e),
            e && O(d),
            e && O(p),
            e && O(v),
            Ue(I, e),
            e && O(b),
            e && O(E);
        },
      }
    );
  }
  function Rd(e) {
    let t;
    return {
      c() {
        t = D("Cancel");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Fd(e) {
    let t, n;
    return (
      (t = new Oi({
        props: { $$slots: { default: [Rd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          4096 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function kd(e) {
    let t;
    return {
      c() {
        t = D("Upload");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Ud(e) {
    let t, n;
    return (
      (t = new Oi({
        props: { $$slots: { default: [kd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          4096 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Hd(e) {
    let t, n, i, r;
    return (
      (t = new pl({
        props: { $$slots: { default: [Fd] }, $$scope: { ctx: e } },
      })),
      (i = new pl({
        props: { $$slots: { default: [Ud] }, $$scope: { ctx: e } },
      })),
      i.$on("click", e[25]),
      {
        c() {
          Fe(t.$$.fragment), (n = R()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), L(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          4096 & n[2] && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          4096 & n[2] && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          r || (_e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && O(n), Ue(i, e);
        },
      }
    );
  }
  function Pd(e) {
    let t, n, i, r, s, o;
    return (
      (t = new rl({
        props: { id: "title", $$slots: { default: [Od] }, $$scope: { ctx: e } },
      })),
      (i = new sl({
        props: {
          id: "content",
          $$slots: { default: [Dd] },
          $$scope: { ctx: e },
        },
      })),
      (s = new ol({
        props: { $$slots: { default: [Hd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment),
            (n = R()),
            Fe(i.$$.fragment),
            (r = R()),
            Fe(s.$$.fragment);
        },
        m(e, a) {
          ke(t, e, a),
            L(e, n, a),
            ke(i, e, a),
            L(e, r, a),
            ke(s, e, a),
            (o = !0);
        },
        p(e, n) {
          const r = {};
          (512 & n[0]) | (4096 & n[2]) && (r.$$scope = { dirty: n, ctx: e }),
            t.$set(r);
          const o = {};
          (3329 & n[0]) | (4096 & n[2]) && (o.$$scope = { dirty: n, ctx: e }),
            i.$set(o);
          const a = {};
          4096 & n[2] && (a.$$scope = { dirty: n, ctx: e }), s.$set(a);
        },
        i(e) {
          o ||
            (_e(t.$$.fragment, e),
            _e(i.$$.fragment, e),
            _e(s.$$.fragment, e),
            (o = !0));
        },
        o(e) {
          Se(t.$$.fragment, e),
            Se(i.$$.fragment, e),
            Se(s.$$.fragment, e),
            (o = !1);
        },
        d(e) {
          Ue(t, e), e && O(n), Ue(i, e), e && O(r), Ue(s, e);
        },
      }
    );
  }
  function Bd(e) {
    let t;
    return {
      c() {
        t = D("Create new dataset");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Vd(e) {
    let t, n, i;
    function r(t) {
      e[27](t);
    }
    let s = { label: "Name" };
    return (
      void 0 !== e[13] && (s.value = e[13]),
      (t = new ns({ props: s })),
      ae.push(() => Re(t, "value", r)),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, i) {
          const r = {};
          !n &&
            8192 & i[0] &&
            ((n = !0), (r.value = e[13]), he(() => (n = !1))),
            t.$set(r);
        },
        i(e) {
          i || (_e(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function jd(e) {
    let t;
    return {
      c() {
        t = D("Cancel");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function zd(e) {
    let t, n;
    return (
      (t = new Oi({
        props: { $$slots: { default: [jd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          4096 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Gd(e) {
    let t;
    return {
      c() {
        t = D("Submit");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Wd(e) {
    let t, n;
    return (
      (t = new Oi({
        props: { $$slots: { default: [Gd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          4096 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function qd(e) {
    let t, n, i, r;
    return (
      (t = new pl({
        props: { $$slots: { default: [zd] }, $$scope: { ctx: e } },
      })),
      (i = new pl({
        props: { $$slots: { default: [Wd] }, $$scope: { ctx: e } },
      })),
      i.$on("click", e[28]),
      {
        c() {
          Fe(t.$$.fragment), (n = R()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), L(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          4096 & n[2] && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          4096 & n[2] && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          r || (_e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && O(n), Ue(i, e);
        },
      }
    );
  }
  function Kd(e) {
    let t, n, i, r, s, o;
    return (
      (t = new rl({
        props: { id: "title", $$slots: { default: [Bd] }, $$scope: { ctx: e } },
      })),
      (i = new sl({
        props: {
          id: "content",
          $$slots: { default: [Vd] },
          $$scope: { ctx: e },
        },
      })),
      (s = new ol({
        props: { $$slots: { default: [qd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment),
            (n = R()),
            Fe(i.$$.fragment),
            (r = R()),
            Fe(s.$$.fragment);
        },
        m(e, a) {
          ke(t, e, a),
            L(e, n, a),
            ke(i, e, a),
            L(e, r, a),
            ke(s, e, a),
            (o = !0);
        },
        p(e, n) {
          const r = {};
          4096 & n[2] && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const o = {};
          (8192 & n[0]) | (4096 & n[2]) && (o.$$scope = { dirty: n, ctx: e }),
            i.$set(o);
          const a = {};
          4096 & n[2] && (a.$$scope = { dirty: n, ctx: e }), s.$set(a);
        },
        i(e) {
          o ||
            (_e(t.$$.fragment, e),
            _e(i.$$.fragment, e),
            _e(s.$$.fragment, e),
            (o = !0));
        },
        o(e) {
          Se(t.$$.fragment, e),
            Se(i.$$.fragment, e),
            Se(s.$$.fragment, e),
            (o = !1);
        },
        d(e) {
          Ue(t, e), e && O(n), Ue(i, e), e && O(r), Ue(s, e);
        },
      }
    );
  }
  function Xd(e) {
    let t;
    return {
      c() {
        t = D(e[4]);
      },
      m(e, n) {
        L(e, t, n);
      },
      p(e, n) {
        16 & n[0] && P(t, e[4]);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Yd(e) {
    let t, n;
    return (
      (t = new In({
        props: { $$slots: { default: [Xd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (16 & n[0]) | (4096 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Qd(e) {
    let t;
    return {
      c() {
        t = D("file_upload");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Jd(e) {
    let t;
    return {
      c() {
        t = D("open_in_new");
      },
      m(e, n) {
        L(e, t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function Zd(e) {
    let t, n, i, r;
    return (
      (t = new ds({
        props: {
          class: "material-icons",
          "aria-label": "Upload dataset",
          ripple: !1,
          $$slots: { default: [Qd] },
          $$scope: { ctx: e },
        },
      })),
      t.$on("click", e[30]),
      (i = new ds({
        props: {
          class: "material-icons",
          "aria-label": "Edit taxonomy",
          ripple: !1,
          $$slots: { default: [Jd] },
          $$scope: { ctx: e },
        },
      })),
      i.$on("click", e[23]),
      {
        c() {
          Fe(t.$$.fragment), (n = R()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), L(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          4096 & n[2] && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          4096 & n[2] && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          r || (_e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && O(n), Ue(i, e);
        },
      }
    );
  }
  function ep(e) {
    let t, n, i, r;
    return (
      (t = new bn({
        props: { $$slots: { default: [Yd] }, $$scope: { ctx: e } },
      })),
      (i = new bn({
        props: {
          align: "end",
          toolbar: !0,
          $$slots: { default: [Zd] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          Fe(t.$$.fragment), (n = R()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), L(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          (16 & n[0]) | (4096 & n[2]) && (r.$$scope = { dirty: n, ctx: e }),
            t.$set(r);
          const s = {};
          (4096 & n[0]) | (4096 & n[2]) && (s.$$scope = { dirty: n, ctx: e }),
            i.$set(s);
        },
        i(e) {
          r || (_e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && O(n), Ue(i, e);
        },
      }
    );
  }
  function tp(e) {
    let t, n;
    return (
      (t = new $n({
        props: { $$slots: { default: [ep] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (4112 & n[0]) | (4096 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function np(e) {
    let t, n;
    return (
      (t = new No({ props: { indeterminate: !0 } })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function ip(e) {
    let t, n, i, r, s, o, a;
    function l(t) {
      e[31](t);
    }
    let c = { label: "Search..." };
    return (
      void 0 !== e[2] && (c.value = e[2]),
      (t = new ns({ props: c })),
      ae.push(() => Re(t, "value", l)),
      (o = new Du({ props: { trees: e[5], tags: e[15] } })),
      o.$on("change", e[32]),
      {
        c() {
          Fe(t.$$.fragment),
            (i = R()),
            (r = M("span")),
            (r.textContent = "Advanced Filters"),
            (s = R()),
            Fe(o.$$.fragment),
            U(r, "class", "filter-header svelte-z7sp86");
        },
        m(e, n) {
          ke(t, e, n),
            L(e, i, n),
            L(e, r, n),
            L(e, s, n),
            ke(o, e, n),
            (a = !0);
        },
        p(e, i) {
          const r = {};
          !n && 4 & i[0] && ((n = !0), (r.value = e[2]), he(() => (n = !1))),
            t.$set(r);
          const s = {};
          32 & i[0] && (s.trees = e[5]),
            32768 & i[0] && (s.tags = e[15]),
            o.$set(s);
        },
        i(e) {
          a || (_e(t.$$.fragment, e), _e(o.$$.fragment, e), (a = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), Se(o.$$.fragment, e), (a = !1);
        },
        d(e) {
          Ue(t, e), e && O(i), e && O(r), e && O(s), Ue(o, e);
        },
      }
    );
  }
  function rp(e) {
    let t, n;
    return (
      (t = new $o({
        props: { $$slots: { default: [ip] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (32812 & n[0]) | (4096 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (_e(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function sp(e) {
    let t,
      n = e[65].displayName + "";
    return {
      c() {
        t = D(n);
      },
      m(e, n) {
        L(e, t, n);
      },
      p(e, i) {
        2 & i[0] && n !== (n = e[65].displayName + "") && P(t, n);
      },
      d(e) {
        e && O(t);
      },
    };
  }
  function op(e) {
    let t, n, i, r;
    return (
      (t = new to({
        props: { $$slots: { default: [sp] }, $$scope: { ctx: e } },
      })),
      (i = new no({})),
      {
        c() {
          Fe(t.$$.fragment), (n = R()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), L(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const i = {};
          (2 & n[0]) | (4096 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          r || (_e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && O(n), Ue(i, e);
        },
      }
    );
  }
  function ap(e) {
    let t, n, i, r;
    return (
      (t = new eo({
        props: { $$slots: { default: [op] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment), (n = R()), (i = R());
        },
        m(e, s) {
          ke(t, e, s), L(e, n, s), L(e, i, s), (r = !0);
        },
        p(e, n) {
          const i = {};
          (2 & n[0]) | (4096 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          r || (_e(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && O(n), e && O(i);
        },
      }
    );
  }
  function lp(e, t) {
    let n, i, r;
    return (
      (i = new oo({
        props: { $$slots: { default: [ap] }, $$scope: { ctx: t } },
      })),
      i.$on("SMUI:action", function () {
        return t[33](t[65]);
      }),
      {
        key: e,
        first: null,
        c() {
          (n = F()), Fe(i.$$.fragment), (this.first = n);
        },
        m(e, t) {
          L(e, n, t), ke(i, e, t), (r = !0);
        },
        p(e, n) {
          t = e;
          const r = {};
          (2 & n[0]) | (4096 & n[2]) && (r.$$scope = { dirty: n, ctx: t }),
            i.$set(r);
        },
        i(e) {
          r || (_e(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          e && O(n), Ue(i, e);
        },
      }
    );
  }
  function cp(e) {
    let t,
      n,
      i = [],
      r = new Map(),
      s = e[1];
    const o = (e) => e[65].hash;
    for (let t = 0; t < s.length; t += 1) {
      let n = Td(e, s, t),
        a = o(n);
      r.set(a, (i[t] = lp(a, n)));
    }
    return {
      c() {
        for (let e = 0; e < i.length; e += 1) i[e].c();
        t = F();
      },
      m(e, r) {
        for (let t = 0; t < i.length; t += 1) i[t].m(e, r);
        L(e, t, r), (n = !0);
      },
      p(e, n) {
        65538 & n[0] &&
          ((s = e[1]),
          Ae(),
          (i = Me(i, n, o, 1, e, s, r, t.parentNode, Oe, lp, t, Td)),
          Ce());
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < s.length; e += 1) _e(i[e]);
          n = !0;
        }
      },
      o(e) {
        for (let e = 0; e < i.length; e += 1) Se(i[e]);
        n = !1;
      },
      d(e) {
        for (let t = 0; t < i.length; t += 1) i[t].d(e);
        e && O(t);
      },
    };
  }
  function up(e) {
    let t, n, i, r;
    function s(t) {
      e[34](t);
    }
    function o(t) {
      e[35](t);
    }
    let a = {};
    return (
      void 0 !== e[14] && (a.artifactSet = e[14]),
      void 0 !== e[0] && (a.contentType = e[0]),
      (t = new fd({ props: a })),
      ae.push(() => Re(t, "artifactSet", s)),
      ae.push(() => Re(t, "contentType", o)),
      t.$on("download", e[36]),
      t.$on("upload", e[37]),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (r = !0);
        },
        p(e, r) {
          const s = {};
          !n &&
            16384 & r[0] &&
            ((n = !0), (s.artifactSet = e[14]), he(() => (n = !1))),
            !i &&
              1 & r[0] &&
              ((i = !0), (s.contentType = e[0]), he(() => (i = !1))),
            t.$set(s);
        },
        i(e) {
          r || (_e(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          Se(t.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function dp(e) {
    let t, n, i, r, s;
    n = new qs({
      props: {
        twoLine: !0,
        avatarList: !0,
        $$slots: { default: [cp] },
        $$scope: { ctx: e },
      },
    });
    let o = e[14] && up(e);
    return {
      c() {
        (t = M("main")),
          Fe(n.$$.fragment),
          (i = R()),
          o && o.c(),
          (r = F()),
          V(t, "display", "inline-block"),
          V(t, "vertical-align", "top"),
          U(t, "class", "svelte-z7sp86");
      },
      m(e, a) {
        L(e, t, a),
          ke(n, t, null),
          L(e, i, a),
          o && o.m(e, a),
          L(e, r, a),
          (s = !0);
      },
      p(e, t) {
        const i = {};
        (2 & t[0]) | (4096 & t[2]) && (i.$$scope = { dirty: t, ctx: e }),
          n.$set(i),
          e[14]
            ? o
              ? (o.p(e, t), 16384 & t[0] && _e(o, 1))
              : ((o = up(e)), o.c(), _e(o, 1), o.m(r.parentNode, r))
            : o &&
              (Ae(),
              Se(o, 1, 1, () => {
                o = null;
              }),
              Ce());
      },
      i(e) {
        s || (_e(n.$$.fragment, e), _e(o), (s = !0));
      },
      o(e) {
        Se(n.$$.fragment, e), Se(o), (s = !1);
      },
      d(e) {
        e && O(t), Ue(n), e && O(i), o && o.d(e), e && O(r);
      },
    };
  }
  function pp(e) {
    let t,
      n,
      i,
      r,
      s,
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
      I,
      b,
      E,
      x,
      A,
      C,
      S;
    function T(t) {
      e[26](t);
    }
    document.title = t = e[4];
    let w = {
      "aria-labelledby": "title",
      "aria-describedby": "content",
      $$slots: { default: [Pd] },
      $$scope: { ctx: e },
    };
    function N(t) {
      e[29](t);
    }
    void 0 !== e[7] && (w.open = e[7]),
      (i = new il({ props: w })),
      ae.push(() => Re(i, "open", T));
    let D = {
      "aria-labelledby": "title",
      "aria-describedby": "content",
      $$slots: { default: [Kd] },
      $$scope: { ctx: e },
    };
    void 0 !== e[12] && (D.open = e[12]),
      (o = new il({ props: D })),
      ae.push(() => Re(o, "open", N)),
      (c = new Ot({
        props: {
          variant: "static",
          $$slots: { default: [tp] },
          $$scope: { ctx: e },
        },
      }));
    let F = e[6] && np();
    return (
      (p = new Os({ props: { options: { classes: ["log"] } } })),
      (m = new mo({
        props: {
          style: "width: 360px",
          $$slots: { default: [rp] },
          $$scope: { ctx: e },
        },
      })),
      ($ = new go({
        props: { $$slots: { default: [dp] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          (n = R()),
            Fe(i.$$.fragment),
            (s = R()),
            Fe(o.$$.fragment),
            (l = R()),
            Fe(c.$$.fragment),
            (u = R()),
            F && F.c(),
            (d = R()),
            Fe(p.$$.fragment),
            (f = R()),
            (h = M("div")),
            Fe(m.$$.fragment),
            (g = R()),
            Fe($.$$.fragment),
            (y = R()),
            (v = M("link")),
            (I = R()),
            (b = M("link")),
            (E = R()),
            (x = M("link")),
            (A = R()),
            (C = M("link")),
            U(h, "class", "drawer-container svelte-z7sp86"),
            U(v, "rel", "stylesheet"),
            U(
              v,
              "href",
              "https://fonts.googleapis.com/icon?family=Material+Icons"
            ),
            U(v, "class", "svelte-z7sp86"),
            U(b, "rel", "stylesheet"),
            U(
              b,
              "href",
              "https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
            ),
            U(b, "class", "svelte-z7sp86"),
            U(x, "rel", "stylesheet"),
            U(x, "href", "https://fonts.googleapis.com/css?family=Roboto+Mono"),
            U(x, "class", "svelte-z7sp86"),
            U(C, "rel", "stylesheet"),
            U(C, "href", "build/smui.css"),
            U(C, "class", "svelte-z7sp86");
        },
        m(e, t) {
          L(e, n, t),
            ke(i, e, t),
            L(e, s, t),
            ke(o, e, t),
            L(e, l, t),
            ke(c, e, t),
            L(e, u, t),
            F && F.m(e, t),
            L(e, d, t),
            ke(p, e, t),
            L(e, f, t),
            L(e, h, t),
            ke(m, h, null),
            _(h, g),
            ke($, h, null),
            L(e, y, t),
            L(e, v, t),
            L(e, I, t),
            L(e, b, t),
            L(e, E, t),
            L(e, x, t),
            L(e, A, t),
            L(e, C, t),
            (S = !0);
        },
        p(e, n) {
          (!S || 16 & n[0]) && t !== (t = e[4]) && (document.title = t);
          const s = {};
          (3841 & n[0]) | (4096 & n[2]) && (s.$$scope = { dirty: n, ctx: e }),
            !r && 128 & n[0] && ((r = !0), (s.open = e[7]), he(() => (r = !1))),
            i.$set(s);
          const l = {};
          (8192 & n[0]) | (4096 & n[2]) && (l.$$scope = { dirty: n, ctx: e }),
            !a &&
              4096 & n[0] &&
              ((a = !0), (l.open = e[12]), he(() => (a = !1))),
            o.$set(l);
          const u = {};
          (4112 & n[0]) | (4096 & n[2]) && (u.$$scope = { dirty: n, ctx: e }),
            c.$set(u),
            e[6]
              ? F
                ? 64 & n[0] && _e(F, 1)
                : ((F = np()), F.c(), _e(F, 1), F.m(d.parentNode, d))
              : F &&
                (Ae(),
                Se(F, 1, 1, () => {
                  F = null;
                }),
                Ce());
          const p = {};
          (32812 & n[0]) | (4096 & n[2]) && (p.$$scope = { dirty: n, ctx: e }),
            m.$set(p);
          const f = {};
          (16387 & n[0]) | (4096 & n[2]) && (f.$$scope = { dirty: n, ctx: e }),
            $.$set(f);
        },
        i(e) {
          S ||
            (_e(i.$$.fragment, e),
            _e(o.$$.fragment, e),
            _e(c.$$.fragment, e),
            _e(F),
            _e(p.$$.fragment, e),
            _e(m.$$.fragment, e),
            _e($.$$.fragment, e),
            (S = !0));
        },
        o(e) {
          Se(i.$$.fragment, e),
            Se(o.$$.fragment, e),
            Se(c.$$.fragment, e),
            Se(F),
            Se(p.$$.fragment, e),
            Se(m.$$.fragment, e),
            Se($.$$.fragment, e),
            (S = !1);
        },
        d(e) {
          e && O(n),
            Ue(i, e),
            e && O(s),
            Ue(o, e),
            e && O(l),
            Ue(c, e),
            e && O(u),
            F && F.d(e),
            e && O(d),
            Ue(p, e),
            e && O(f),
            e && O(h),
            Ue(m),
            Ue($),
            e && O(y),
            e && O(v),
            e && O(I),
            e && O(b),
            e && O(E),
            e && O(x),
            e && O(A),
            e && O(C);
        },
      }
    );
  }
  const fp = (e) => e.Tag;
  function hp(e, t, n) {
    let i,
      r,
      s = "Data",
      o = [];
    const a = new Ed();
    let l = [],
      c = [];
    const u = new URLSearchParams(location.search);
    let d = u.get("searchQuery") || "",
      p = [];
    function f(e, t) {
      n(
        1,
        (c = l.filter((n) =>
          ((n) => {
            const { displayName: i, taxonomyTags: r = [] } = n;
            return (
              !!t.every((e) => !!r.find((t) => e.isMatch(t))) &&
              (!e || i.toLowerCase().includes(e.toLowerCase()))
            );
          })(n)
        ))
      );
      const i = new URLSearchParams();
      i.set("searchQuery", e);
      const r = t.map((e) => e.lean());
      i.set("filterTags", JSON.stringify(r)),
        (function (e) {
          const t = new URLSearchParams(location.search);
          [...e.entries()].forEach(([e, n]) => t.set(e, n)),
            window.history.replaceState(
              {},
              "",
              `${location.pathname}?${t.toString()}`
            );
        })(i);
    }
    function h(e) {
      $s.push(e, { classes: ["warn"] });
    }
    function m(e) {
      $s.push(e, { classes: ["info"] });
    }
    let g,
      $,
      y = !1;
    async function v() {
      n(6, (y = !0));
      try {
        (l = await a.listArtifacts()),
          l.forEach((e) => {
            const t = e.children.filter(
              (e) => e.taxonomy && $.supports(e.taxonomy)
            );
            e.children = t;
          });
      } catch (e) {
        if (
          (h(
            e instanceof xd
              ? e.message
              : "An error occurred. Please try again later"
          ),
          !(e instanceof xd))
        )
          throw e;
      }
      n(6, (y = !1)), console.log({ allItems: l }), f(d, p);
    }
    class I extends class {
      constructor(e, t) {
        (this.type = e), (this.data = t);
      }
    } {
      constructor(e) {
        super("ItemSelected", e);
      }
    }
    const b = [];
    let E;
    function x(e) {
      (E = e),
        b.forEach(([t, n]) => t.postMessage(new I(e), n)),
        n(14, (F = e));
    }
    window.addEventListener(
      "message",
      function (e) {
        const { data: t } = e;
        "subscribe" === t.type &&
          (b.push([e.source, e.origin]),
          E && e.source.postMessage(new I(E), e.origin));
      },
      !1
    ),
      (async function () {
        (g = await (async function () {
          const e = window.location.href.split("/");
          e.pop(), e.pop();
          const t = e.join("/") + "/configuration.json";
          try {
            const e = await fetch(t);
            return await e.json();
          } catch (e) {
            throw (
              (h(
                "An error occurred. Please double check the URL and try again."
              ),
              e)
            );
          }
        })()),
          ($ = hd.from(g.project));
        const e = je.fromDict(g.taxonomy);
        n(
          5,
          (o = (function (e) {
            let t = [e];
            for (; 1 === t.length; ) t = t[0].children;
            return t;
          })(e))
        ),
          n(
            3,
            (p = (function (e) {
              if (e)
                return xn(JSON.parse(e), (e) => {
                  const t = o.reduce((t, n) => t || n.findPath(e.id), null);
                  if (!t) return void console.warn("Could not find tag for", e);
                  const n = t.pop();
                  return (
                    (n.value = e.value),
                    n.select(),
                    t.forEach((e) => e.expand()),
                    n
                  );
                });
              return [];
            })(u.get("filterTags")))
          ),
          n(0, (s = g.name)),
          v();
      })();
    let A,
      C,
      _ = !1,
      S = [],
      T = "",
      L = new Id();
    async function O(e) {
      n(9, (A = e)), n(11, (T = A.displayName));
      try {
        n(10, (C = { taxonomyTags: await L.toHumanFormat(A.taxonomyTags) }));
      } catch (e) {
        e instanceof bd
          ? console.warn(
              "Latest artifact has invalid taxonomy tags:",
              e.message
            )
          : console.error(
              "An error occurred while setting default tags",
              e.stack
            );
      }
      n(7, (_ = !0));
    }
    async function w() {
      if (!S) return h(`${s} file required.`);
      const e = C;
      e.displayName = T;
      const t = (function (e, t = 6e4) {
        return $s.push(e, { classes: ["info"], dismissable: !1, duration: t });
      })("Upload in progress");
      try {
        await a.appendArtifact(A, e, S), m("Upload complete!"), v();
      } catch (e) {
        console.log(e), h(`Unable to upload: ${e.message}`);
      }
      var n;
      (n = t), $s.pop(n);
    }
    var M;
    let N =
        "create" ===
        ((M = window.location.href),
        Object.fromEntries(
          (M.split("?")[1] || "").split("&").map((e) => e.split("="))
        )).action,
      D = [];
    async function R() {
      await a.createArtifact({ displayName: k }, D),
        h("Submitted creation request.");
    }
    let F,
      k = "";
    async function U(e) {
      const { artifactSet: t, artifactIds: n } = e;
      try {
        if (0 === n.length) return h("Nothing to download: No data found.");
        m(`Downloading ${n.length} from ${t.displayName}...`);
        Cn(await a.getDownloadUrl(t.id, ...n));
      } catch (e) {
        return h(e.message);
      }
    }
    return (
      (e.$$.update = () => {
        1 & e.$$.dirty[0] && n(4, (r = `${s} Dashboard`)),
          12 & e.$$.dirty[0] && f(d, p),
          2 & e.$$.dirty[0] &&
            n(
              15,
              (i = c.flatMap((e) => {
                var t;
                return null !== (t = e.taxonomyTags) && void 0 !== t ? t : [];
              }))
            ),
          e.$$.dirty[0];
      }),
      [
        s,
        c,
        d,
        p,
        r,
        o,
        y,
        _,
        S,
        A,
        C,
        T,
        N,
        k,
        F,
        i,
        x,
        O,
        function (e) {
          const { acceptedFiles: t } = e.detail;
          t.length && n(8, (S = t));
        },
        async function (e) {
          const [t] = e.detail.acceptedFiles;
          t &&
            n(
              10,
              (C = JSON.parse(
                await (async function (e) {
                  return new Promise((t, n) => {
                    const i = new FileReader();
                    (i.onload = () =>
                      i.error
                        ? (console.log("error:", i.error), n(i.error))
                        : t(i.result)),
                      i.readAsText(e);
                  });
                })(t)
              ))
            );
        },
        w,
        R,
        U,
        function () {
          var e;
          Cn(
            window.location.href.replace(/routers\/Search.*/, "") +
              "?" +
              ((e = {
                project: g.project.id,
                commit: g.project.commit,
                node: g.contentTypePath,
              }),
              Object.entries(e)
                .map(([e, t]) => `${e}=${encodeURIComponent(t)}`)
                .join("&"))
          );
        },
        function (e) {
          (T = e), n(11, T);
        },
        () => w(),
        function (e) {
          (_ = e), n(7, _);
        },
        function (e) {
          (k = e), n(13, k);
        },
        () => R(),
        function (e) {
          (N = e), n(12, N);
        },
        () => n(12, (N = !0)),
        function (e) {
          (d = e), n(2, d);
        },
        (e) => n(3, (p = e.detail.filterTags.map(je.fromDict))),
        (e) => x(e),
        function (e) {
          (F = e), n(14, F);
        },
        function (e) {
          (s = e), n(0, s);
        },
        (e) => U(e.detail),
        (e) => O(e.detail.artifactSet),
      ]
    );
  }
  return new (class extends Pe {
    constructor(e) {
      super(), He(this, e, hp, pp, a, {}, null, [-1, -1, -1]);
    }
  })({ target: document.body, props: { name: "world" } });
})();
//# sourceMappingURL=bundle.js.map
