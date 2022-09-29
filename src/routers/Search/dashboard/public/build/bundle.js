var app = (function () {
  "use strict";
  function e() {}
  function t(e, t) {
    for (const n in t) e[n] = t[n];
    return e;
  }
  function n(e) {
    return e();
  }
  function i() {
    return Object.create(null);
  }
  function a(e) {
    e.forEach(n);
  }
  function s(e) {
    return "function" == typeof e;
  }
  function r(e, t) {
    return e != e
      ? t == t
      : e !== t || (e && "object" == typeof e) || "function" == typeof e;
  }
  function o(t, n, i) {
    t.$$.on_destroy.push(
      (function (t, ...n) {
        if (null == t) return e;
        const i = t.subscribe(...n);
        return i.unsubscribe ? () => i.unsubscribe() : i;
      })(n, i)
    );
  }
  function l(e, t, n, i) {
    if (e) {
      const a = c(e, t, n, i);
      return e[0](a);
    }
  }
  function c(e, n, i, a) {
    return e[1] && a ? t(i.ctx.slice(), e[1](a(n))) : i.ctx;
  }
  function u(e, t, n, i) {
    if (e[2] && i) {
      const a = e[2](i(n));
      if (void 0 === t.dirty) return a;
      if ("object" == typeof a) {
        const e = [],
          n = Math.max(t.dirty.length, a.length);
        for (let i = 0; i < n; i += 1) e[i] = t.dirty[i] | a[i];
        return e;
      }
      return t.dirty | a;
    }
    return t.dirty;
  }
  function d(e, t, n, i, a, s) {
    if (a) {
      const r = c(t, n, i, s);
      e.p(r, a);
    }
  }
  function p(e) {
    if (e.ctx.length > 32) {
      const t = [],
        n = e.ctx.length / 32;
      for (let e = 0; e < n; e++) t[e] = -1;
      return t;
    }
    return -1;
  }
  function f(e) {
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
  function h(e) {
    const t = {};
    for (const n in e) t[n] = !0;
    return t;
  }
  function g(e, t, n) {
    return e.set(n), t;
  }
  function $(t) {
    return t && s(t.destroy) ? t.destroy : e;
  }
  function I(e, t) {
    e.appendChild(t);
  }
  function v(e, t, n) {
    e.insertBefore(t, n || null);
  }
  function b(e) {
    e.parentNode.removeChild(e);
  }
  function y(e, t) {
    for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t);
  }
  function E(e) {
    return document.createElement(e);
  }
  function A(e) {
    return document.createElementNS("http://www.w3.org/2000/svg", e);
  }
  function C(e) {
    return document.createTextNode(e);
  }
  function _() {
    return C(" ");
  }
  function x() {
    return C("");
  }
  function S(e, t, n, i) {
    return e.addEventListener(t, n, i), () => e.removeEventListener(t, n, i);
  }
  function T(e, t, n) {
    null == n
      ? e.removeAttribute(t)
      : e.getAttribute(t) !== n && e.setAttribute(t, n);
  }
  function O(e, t) {
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
        : T(e, i, t[i]);
  }
  function L(e, t) {
    (t = "" + t), e.wholeText !== t && (e.data = t);
  }
  function w(e, t) {
    e.value = null == t ? "" : t;
  }
  function D(e, t, n, i) {
    null === n
      ? e.style.removeProperty(t)
      : e.style.setProperty(t, n, i ? "important" : "");
  }
  function N(e, t, n) {
    e.classList[n ? "add" : "remove"](t);
  }
  let M;
  function R(e) {
    M = e;
  }
  function F() {
    if (!M) throw new Error("Function called outside component initialization");
    return M;
  }
  function k(e) {
    F().$$.on_mount.push(e);
  }
  function U(e) {
    F().$$.on_destroy.push(e);
  }
  function P() {
    const e = F();
    return (t, n, { cancelable: i = !1 } = {}) => {
      const a = e.$$.callbacks[t];
      if (a) {
        const s = (function (
          e,
          t,
          { bubbles: n = !1, cancelable: i = !1 } = {}
        ) {
          const a = document.createEvent("CustomEvent");
          return a.initCustomEvent(e, n, i, t), a;
        })(t, n, { cancelable: i });
        return (
          a.slice().forEach((t) => {
            t.call(e, s);
          }),
          !s.defaultPrevented
        );
      }
      return !0;
    };
  }
  function H(e, t) {
    return F().$$.context.set(e, t), t;
  }
  function B(e) {
    return F().$$.context.get(e);
  }
  function V(e, t) {
    const n = e.$$.callbacks[t.type];
    n && n.slice().forEach((e) => e.call(this, t));
  }
  const j = [],
    z = [],
    G = [],
    q = [],
    K = Promise.resolve();
  let W = !1;
  function X() {
    W || ((W = !0), K.then(ee));
  }
  function Y(e) {
    G.push(e);
  }
  function Q(e) {
    q.push(e);
  }
  const J = new Set();
  let Z = 0;
  function ee() {
    const e = M;
    do {
      for (; Z < j.length; ) {
        const e = j[Z];
        Z++, R(e), te(e.$$);
      }
      for (R(null), j.length = 0, Z = 0; z.length; ) z.pop()();
      for (let e = 0; e < G.length; e += 1) {
        const t = G[e];
        J.has(t) || (J.add(t), t());
      }
      G.length = 0;
    } while (j.length);
    for (; q.length; ) q.pop()();
    (W = !1), J.clear(), R(e);
  }
  function te(e) {
    if (null !== e.fragment) {
      e.update(), a(e.before_update);
      const t = e.dirty;
      (e.dirty = [-1]),
        e.fragment && e.fragment.p(e.ctx, t),
        e.after_update.forEach(Y);
    }
  }
  const ne = new Set();
  let ie;
  function ae() {
    ie = { r: 0, c: [], p: ie };
  }
  function se() {
    ie.r || a(ie.c), (ie = ie.p);
  }
  function re(e, t) {
    e && e.i && (ne.delete(e), e.i(t));
  }
  function oe(e, t, n, i) {
    if (e && e.o) {
      if (ne.has(e)) return;
      ne.add(e),
        ie.c.push(() => {
          ne.delete(e), i && (n && e.d(1), i());
        }),
        e.o(t);
    } else i && i();
  }
  const le =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof globalThis
      ? globalThis
      : global;
  function ce(e, t) {
    oe(e, 1, 1, () => {
      t.delete(e.key);
    });
  }
  function ue(e, t) {
    const n = {},
      i = {},
      a = { $$scope: 1 };
    let s = e.length;
    for (; s--; ) {
      const r = e[s],
        o = t[s];
      if (o) {
        for (const e in r) e in o || (i[e] = 1);
        for (const e in o) a[e] || ((n[e] = o[e]), (a[e] = 1));
        e[s] = o;
      } else for (const e in r) a[e] = 1;
    }
    for (const e in i) e in n || (n[e] = void 0);
    return n;
  }
  function de(e) {
    return "object" == typeof e && null !== e ? e : {};
  }
  function pe(e, t, n) {
    const i = e.$$.props[t];
    void 0 !== i && ((e.$$.bound[i] = n), n(e.$$.ctx[i]));
  }
  function fe(e) {
    e && e.c();
  }
  function me(e, t, i, r) {
    const { fragment: o, on_mount: l, on_destroy: c, after_update: u } = e.$$;
    o && o.m(t, i),
      r ||
        Y(() => {
          const t = l.map(n).filter(s);
          c ? c.push(...t) : a(t), (e.$$.on_mount = []);
        }),
      u.forEach(Y);
  }
  function he(e, t) {
    const n = e.$$;
    null !== n.fragment &&
      (a(n.on_destroy),
      n.fragment && n.fragment.d(t),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function ge(t, n, s, r, o, l, c, u = [-1]) {
    const d = M;
    R(t);
    const p = (t.$$ = {
      fragment: null,
      ctx: null,
      props: l,
      update: e,
      not_equal: o,
      bound: i(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(n.context || (d ? d.$$.context : [])),
      callbacks: i(),
      dirty: u,
      skip_bound: !1,
      root: n.target || d.$$.root,
    });
    c && c(p.root);
    let f = !1;
    if (
      ((p.ctx = s
        ? s(t, n.props || {}, (e, n, ...i) => {
            const a = i.length ? i[0] : n;
            return (
              p.ctx &&
                o(p.ctx[e], (p.ctx[e] = a)) &&
                (!p.skip_bound && p.bound[e] && p.bound[e](a),
                f &&
                  (function (e, t) {
                    -1 === e.$$.dirty[0] &&
                      (j.push(e), X(), e.$$.dirty.fill(0)),
                      (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
                  })(t, e)),
              n
            );
          })
        : []),
      p.update(),
      (f = !0),
      a(p.before_update),
      (p.fragment = !!r && r(p.ctx)),
      n.target)
    ) {
      if (n.hydrate) {
        const e = (function (e) {
          return Array.from(e.childNodes);
        })(n.target);
        p.fragment && p.fragment.l(e), e.forEach(b);
      } else p.fragment && p.fragment.c();
      n.intro && re(t.$$.fragment),
        me(t, n.target, n.anchor, n.customElement),
        ee();
    }
    R(d);
  }
  class $e {
    $destroy() {
      he(this, 1), (this.$destroy = e);
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
  class Ie {
    constructor(e, t) {
      (this.id = e), (this.value = t);
    }
  }
  class ve {
    constructor(e, t, n, i, a) {
      (this.value = null),
        (this.selected = !1),
        (this.expanded = !1),
        (this.id = e),
        (this.name = t),
        (this.type = n),
        (this.value = i),
        (this.children = a);
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
    isMatch(e) {
      if (e.ID === this.id && e.value == this.value) return !0;
      return e.hasOwnProperty(this.id) && e[this.id] === this.value;
    }
    lean() {
      return new Ie(this.id, this.value);
    }
    static fromDict(e) {
      const t = e.children.map(ve.fromDict);
      return new ve(e.id, e.name, e.type, e.value, t);
    }
  }
  var be = function (e, t) {
    return (
      (be =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t;
          }) ||
        function (e, t) {
          for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        }),
      be(e, t)
    );
  };
  function ye(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError(
        "Class extends value " + String(t) + " is not a constructor or null"
      );
    function n() {
      this.constructor = e;
    }
    be(e, t),
      (e.prototype =
        null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
  }
  var Ee = function () {
    return (
      (Ee =
        Object.assign ||
        function (e) {
          for (var t, n = 1, i = arguments.length; n < i; n++)
            for (var a in (t = arguments[n]))
              Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
          return e;
        }),
      Ee.apply(this, arguments)
    );
  };
  function Ae(e, t, n, i) {
    return new (n || (n = Promise))(function (a, s) {
      function r(e) {
        try {
          l(i.next(e));
        } catch (e) {
          s(e);
        }
      }
      function o(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          s(e);
        }
      }
      function l(e) {
        var t;
        e.done
          ? a(e.value)
          : ((t = e.value),
            t instanceof n
              ? t
              : new n(function (e) {
                  e(t);
                })).then(r, o);
      }
      l((i = i.apply(e, t || [])).next());
    });
  }
  function Ce(e, t) {
    var n,
      i,
      a,
      s,
      r = {
        label: 0,
        sent: function () {
          if (1 & a[0]) throw a[1];
          return a[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (s = { next: o(0), throw: o(1), return: o(2) }),
      "function" == typeof Symbol &&
        (s[Symbol.iterator] = function () {
          return this;
        }),
      s
    );
    function o(s) {
      return function (o) {
        return (function (s) {
          if (n) throw new TypeError("Generator is already executing.");
          for (; r; )
            try {
              if (
                ((n = 1),
                i &&
                  (a =
                    2 & s[0]
                      ? i.return
                      : s[0]
                      ? i.throw || ((a = i.return) && a.call(i), 0)
                      : i.next) &&
                  !(a = a.call(i, s[1])).done)
              )
                return a;
              switch (((i = 0), a && (s = [2 & s[0], a.value]), s[0])) {
                case 0:
                case 1:
                  a = s;
                  break;
                case 4:
                  return r.label++, { value: s[1], done: !1 };
                case 5:
                  r.label++, (i = s[1]), (s = [0]);
                  continue;
                case 7:
                  (s = r.ops.pop()), r.trys.pop();
                  continue;
                default:
                  if (
                    !((a = r.trys),
                    (a = a.length > 0 && a[a.length - 1]) ||
                      (6 !== s[0] && 2 !== s[0]))
                  ) {
                    r = 0;
                    continue;
                  }
                  if (3 === s[0] && (!a || (s[1] > a[0] && s[1] < a[3]))) {
                    r.label = s[1];
                    break;
                  }
                  if (6 === s[0] && r.label < a[1]) {
                    (r.label = a[1]), (a = s);
                    break;
                  }
                  if (a && r.label < a[2]) {
                    (r.label = a[2]), r.ops.push(s);
                    break;
                  }
                  a[2] && r.ops.pop(), r.trys.pop();
                  continue;
              }
              s = t.call(e, r);
            } catch (e) {
              (s = [6, e]), (i = 0);
            } finally {
              n = a = 0;
            }
          if (5 & s[0]) throw s[1];
          return { value: s[0] ? s[1] : void 0, done: !0 };
        })([s, o]);
      };
    }
  }
  function _e(e) {
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
  function xe(e, t) {
    var n = "function" == typeof Symbol && e[Symbol.iterator];
    if (!n) return e;
    var i,
      a,
      s = n.call(e),
      r = [];
    try {
      for (; (void 0 === t || t-- > 0) && !(i = s.next()).done; )
        r.push(i.value);
    } catch (e) {
      a = { error: e };
    } finally {
      try {
        i && !i.done && (n = s.return) && n.call(s);
      } finally {
        if (a) throw a.error;
      }
    }
    return r;
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
  var Se = (function () {
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
   */ var Te = Object.freeze({
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
   */ function Oe(e, t) {
    return (e.matches || e.webkitMatchesSelector || e.msMatchesSelector).call(
      e,
      t
    );
  }
  var Le,
    we = Object.freeze({
      __proto__: null,
      closest: function (e, t) {
        if (e.closest) return e.closest(t);
        for (var n = e; n; ) {
          if (Oe(n, t)) return n;
          n = n.parentElement;
        }
        return null;
      },
      matches: Oe,
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
    De = {
      BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
      FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
      FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
      ROOT: "mdc-ripple-upgraded",
      UNBOUNDED: "mdc-ripple-upgraded--unbounded",
    },
    Ne = {
      VAR_FG_SCALE: "--mdc-ripple-fg-scale",
      VAR_FG_SIZE: "--mdc-ripple-fg-size",
      VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
      VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
      VAR_LEFT: "--mdc-ripple-left",
      VAR_TOP: "--mdc-ripple-top",
    },
    Me = {
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
  var Re = ["touchstart", "pointerdown", "mousedown", "keydown"],
    Fe = ["touchend", "pointerup", "mouseup", "contextmenu"],
    ke = [],
    Ue = (function (e) {
      function t(n) {
        var i = e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
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
        ye(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return De;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Ne;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Me;
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
              a = i.ROOT,
              s = i.UNBOUNDED;
            requestAnimationFrame(function () {
              e.adapter.addClass(a),
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
              a = n.UNBOUNDED;
            requestAnimationFrame(function () {
              e.adapter.removeClass(i),
                e.adapter.removeClass(a),
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
              for (var i = _e(Re), a = i.next(); !a.done; a = i.next()) {
                var s = a.value;
                this.adapter.registerInteractionHandler(
                  s,
                  this.activateHandler
                );
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                a && !a.done && (n = i.return) && n.call(i);
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
              for (var i = _e(Fe), a = i.next(); !a.done; a = i.next()) {
                var s = a.value;
                this.adapter.registerDocumentInteractionHandler(
                  s,
                  this.deactivateHandler
                );
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                a && !a.done && (n = i.return) && n.call(i);
              } finally {
                if (t) throw t.error;
              }
            }
        }),
        (t.prototype.deregisterRootHandlers = function () {
          var e, t;
          try {
            for (var n = _e(Re), i = n.next(); !i.done; i = n.next()) {
              var a = i.value;
              this.adapter.deregisterInteractionHandler(
                a,
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
            for (var n = _e(Fe), i = n.next(); !i.done; i = n.next()) {
              var a = i.value;
              this.adapter.deregisterDocumentInteractionHandler(
                a,
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
                  ke.length > 0 &&
                  ke.some(function (e) {
                    return t.adapter.containsEventTarget(e);
                  })
                    ? this.resetActivationState()
                    : (void 0 !== e &&
                        (ke.push(e.target),
                        this.registerDeactivationHandlers(e)),
                      (n.wasElementMadeActive = this.checkElementMadeActive(e)),
                      n.wasElementMadeActive && this.animateActivation(),
                      requestAnimationFrame(function () {
                        (ke = []),
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
            a = n.VAR_FG_TRANSLATE_END,
            s = t.cssClasses,
            r = s.FG_DEACTIVATION,
            o = s.FG_ACTIVATION,
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
            this.adapter.updateCssVariable(a, u),
            clearTimeout(this.activationTimer),
            clearTimeout(this.fgDeactivationRemovalTimer),
            this.rmBoundedActivationClasses(),
            this.adapter.removeClass(r),
            this.adapter.computeBoundingRect(),
            this.adapter.addClass(o),
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
                        a,
                        s = t.x,
                        r = t.y,
                        o = s + n.left,
                        l = r + n.top;
                      if ("touchstart" === e.type) {
                        var c = e;
                        (i = c.changedTouches[0].pageX - o),
                          (a = c.changedTouches[0].pageY - l);
                      } else {
                        var u = e;
                        (i = u.pageX - o), (a = u.pageY - l);
                      }
                      return { x: i, y: a };
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
            a = i.hasDeactivationUXRun,
            s = i.isActivated;
          (a || !s) &&
            this.activationAnimationHasEnded &&
            (this.rmBoundedActivationClasses(),
            this.adapter.addClass(n),
            (this.fgDeactivationRemovalTimer = setTimeout(function () {
              e.adapter.removeClass(n);
            }, Me.FG_DEACTIVATION_MS)));
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
            var n = Ee({}, t);
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
            a = e.VAR_TOP,
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
                a,
                this.unboundedCoords.top + "px"
              ));
        }),
        t
      );
    })(Se),
    Pe = {
      FIXED_CLASS: "mdc-top-app-bar--fixed",
      FIXED_SCROLLED_CLASS: "mdc-top-app-bar--fixed-scrolled",
      SHORT_CLASS: "mdc-top-app-bar--short",
      SHORT_COLLAPSED_CLASS: "mdc-top-app-bar--short-collapsed",
      SHORT_HAS_ACTION_ITEM_CLASS: "mdc-top-app-bar--short-has-action-item",
    },
    He = { DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100, MAX_TOP_APP_BAR_HEIGHT: 128 },
    Be = {
      ACTION_ITEM_SELECTOR: ".mdc-top-app-bar__action-item",
      NAVIGATION_EVENT: "MDCTopAppBar:nav",
      NAVIGATION_ICON_SELECTOR: ".mdc-top-app-bar__navigation-icon",
      ROOT_SELECTOR: ".mdc-top-app-bar",
      TITLE_SELECTOR: ".mdc-top-app-bar__title",
    },
    Ve = (function (e) {
      function t(n) {
        return e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Be;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Pe;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return He;
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
    })(Se),
    je = (function (e) {
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
        ye(t, e),
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
            }, He.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)),
            (this.isCurrentlyBeingResized = !0),
            this.resizeDebounceId && clearTimeout(this.resizeDebounceId),
            (this.resizeDebounceId = setTimeout(function () {
              e.handleTargetScroll(),
                (e.isCurrentlyBeingResized = !1),
                (e.resizeDebounceId = 0);
            }, He.DEBOUNCE_THROTTLE_RESIZE_TIME_MS));
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
              (e = -He.MAX_TOP_APP_BAR_HEIGHT),
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
    })(Ve),
    ze = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t.wasScrolled = !1), t;
      }
      return (
        ye(t, e),
        (t.prototype.handleTargetScroll = function () {
          this.adapter.getViewportScrollY() <= 0
            ? this.wasScrolled &&
              (this.adapter.removeClass(Pe.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !1))
            : this.wasScrolled ||
              (this.adapter.addClass(Pe.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !0));
        }),
        t
      );
    })(je),
    Ge = (function (e) {
      function t(t) {
        var n = e.call(this, t) || this;
        return (n.collapsed = !1), (n.isAlwaysCollapsed = !1), n;
      }
      return (
        ye(t, e),
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
              this.adapter.addClass(Pe.SHORT_HAS_ACTION_ITEM_CLASS),
            this.setAlwaysCollapsed(
              this.adapter.hasClass(Pe.SHORT_COLLAPSED_CLASS)
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
          this.adapter.removeClass(Pe.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !1);
        }),
        (t.prototype.collapse = function () {
          this.adapter.addClass(Pe.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !0);
        }),
        t
      );
    })(Ve);
  const qe = [];
  function Ke(t, n = e) {
    let i;
    const a = new Set();
    function s(e) {
      if (r(t, e) && ((t = e), i)) {
        const e = !qe.length;
        for (const e of a) e[1](), qe.push(e, t);
        if (e) {
          for (let e = 0; e < qe.length; e += 2) qe[e][0](qe[e + 1]);
          qe.length = 0;
        }
      }
    }
    return {
      set: s,
      update: function (e) {
        s(e(t));
      },
      subscribe: function (r, o = e) {
        const l = [r, o];
        return (
          a.add(l),
          1 === a.size && (i = n(s) || e),
          r(t),
          () => {
            a.delete(l), 0 === a.size && (i(), (i = null));
          }
        );
      },
    };
  }
  function We(e) {
    return Object.entries(e)
      .filter(([e, t]) => "" !== e && t)
      .map(([e]) => e)
      .join(" ");
  }
  function Xe(e, t, n, i = { bubbles: !0 }, a = !1) {
    if ("undefined" != typeof Event && e) {
      const s = new CustomEvent(
        t,
        Object.assign(Object.assign({}, i), { detail: n })
      );
      if ((null == e || e.dispatchEvent(s), a && t.startsWith("SMUI"))) {
        const a = new CustomEvent(
          t.replace(/^SMUI/g, () => "MDC"),
          Object.assign(Object.assign({}, i), { detail: n })
        );
        null == e || e.dispatchEvent(a),
          a.defaultPrevented && s.preventDefault();
      }
      return s;
    }
  }
  function Ye(e, t) {
    let n = Object.getOwnPropertyNames(e);
    const i = {};
    for (let a = 0; a < n.length; a++) {
      const s = n[a],
        r = s.indexOf("$");
      (-1 !== r && -1 !== t.indexOf(s.substring(0, r + 1))) ||
        (-1 === t.indexOf(s) && (i[s] = e[s]));
    }
    return i;
  }
  const Qe =
      /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/,
    Je =
      /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
  function Ze(e) {
    let t,
      n = [];
    function i(t) {
      V(e, t);
    }
    return (
      (e.$on = (e, i) => {
        let a = e,
          s = () => {};
        t ? (s = t(a, i)) : n.push([a, i]);
        return (
          a.match(Qe) &&
            console &&
            console.warn(
              'Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ',
              a
            ),
          () => {
            s();
          }
        );
      }),
      (e) => {
        const a = [],
          s = {};
        t = (t, n) => {
          let r = t,
            o = n,
            l = !1;
          const c = r.match(Qe),
            u = r.match(Je),
            d = c || u;
          if (r.match(/^SMUI:\w+:/)) {
            const e = r.split(":");
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
              `The event ${r.split("$")[0]} has been renamed to ${
                t.split("$")[0]
              }.`
            ),
              (r = t);
          }
          if (d) {
            const e = r.split(c ? ":" : "$");
            r = e[0];
            const t = Object.fromEntries(e.slice(1).map((e) => [e, !0]));
            t.passive && ((l = l || {}), (l.passive = !0)),
              t.nonpassive && ((l = l || {}), (l.passive = !1)),
              t.capture && ((l = l || {}), (l.capture = !0)),
              t.once && ((l = l || {}), (l.once = !0)),
              t.preventDefault &&
                ((p = o),
                (o = function (e) {
                  return e.preventDefault(), p.call(this, e);
                })),
              t.stopPropagation &&
                (o = (function (e) {
                  return function (t) {
                    return t.stopPropagation(), e.call(this, t);
                  };
                })(o));
          }
          var p;
          const f = S(e, r, o, l),
            m = () => {
              f();
              const e = a.indexOf(m);
              e > -1 && a.splice(e, 1);
            };
          return a.push(m), r in s || (s[r] = S(e, r, i)), m;
        };
        for (let e = 0; e < n.length; e++) t(n[e][0], n[e][1]);
        return {
          destroy: () => {
            for (let e = 0; e < a.length; e++) a[e]();
            for (let e of Object.entries(s)) e[1]();
          },
        };
      }
    );
  }
  function et(e, t) {
    let n = Object.getOwnPropertyNames(e);
    const i = {};
    for (let a = 0; a < n.length; a++) {
      const s = n[a];
      s.substring(0, t.length) === t && (i[s.substring(t.length)] = e[s]);
    }
    return i;
  }
  function tt(e, t) {
    let n = [];
    if (t)
      for (let i = 0; i < t.length; i++) {
        const a = t[i],
          s = Array.isArray(a) ? a[0] : a;
        Array.isArray(a) && a.length > 1 ? n.push(s(e, a[1])) : n.push(s(e));
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
  const { window: nt } = le;
  function it(e) {
    let n, i, r, o, c, f, m;
    const h = e[22].default,
      g = l(h, e, e[21], null);
    let I = [
        {
          class: (i = We({
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
        { style: (r = Object.entries(e[12]).map(at).concat([e[3]]).join(" ")) },
        e[15],
      ],
      y = {};
    for (let e = 0; e < I.length; e += 1) y = t(y, I[e]);
    return {
      c() {
        (n = E("header")), g && g.c(), O(n, y);
      },
      m(t, i) {
        v(t, n, i),
          g && g.m(n, null),
          e[25](n),
          (c = !0),
          f ||
            ((m = [
              S(nt, "resize", e[23]),
              S(nt, "scroll", e[24]),
              $((o = tt.call(null, n, e[1]))),
              $(e[13].call(null, n)),
              S(n, "SMUITopAppBarIconButton:nav", e[26]),
            ]),
            (f = !0));
      },
      p(e, t) {
        g &&
          g.p &&
          (!c || 2097152 & t[0]) &&
          d(g, h, e, e[21], c ? u(h, e[21], t, null) : p(e[21]), null),
          O(
            n,
            (y = ue(I, [
              (!c ||
                (2293 & t[0] &&
                  i !==
                    (i = We({
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
              (!c ||
                (4104 & t[0] &&
                  r !==
                    (r = Object.entries(e[12])
                      .map(at)
                      .concat([e[3]])
                      .join(" ")))) && { style: r },
              32768 & t[0] && e[15],
            ]))
          ),
          o && s(o.update) && 2 & t[0] && o.update.call(null, e[1]);
      },
      i(e) {
        c || (re(g, e), (c = !0));
      },
      o(e) {
        oe(g, e), (c = !1);
      },
      d(t) {
        t && b(n), g && g.d(t), e[25](null), (f = !1), a(m);
      },
    };
  }
  const at = ([e, t]) => `${e}: ${t};`;
  function st(e, n, i) {
    const a = [
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
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n;
    const l = Ze(F());
    let c = () => {};
    function u(e) {
      return e === c;
    }
    let { use: d = [] } = n,
      { class: p = "" } = n,
      { style: h = "" } = n,
      { variant: g = "standard" } = n,
      { color: $ = "primary" } = n,
      { collapsed: I = c } = n;
    const v = !u(I) && !!I;
    u(I) && (I = !1);
    let b,
      y,
      E,
      { prominent: A = !1 } = n,
      { dense: C = !1 } = n,
      { scrollTarget: _ } = n,
      x = {},
      S = {},
      T = {
        subscribe: Ke({ variant: g, prominent: A, dense: C }, (e) => {
          i(18, (E = e));
        }).subscribe,
      };
    let O,
      L = g;
    function w() {
      return new ({ static: Ve, short: Ge, fixed: ze }[g] || je)({
        hasClass: D,
        addClass: N,
        removeClass: M,
        setStyle: R,
        getTopAppBarHeight: () => b.clientHeight,
        notifyNavigationIconClicked: () =>
          Xe(b, "SMUITopAppBar:nav", void 0, void 0, !0),
        getViewportScrollY: () =>
          null == _ ? window.pageYOffset : _.scrollTop,
        getTotalActionItems: () =>
          b.querySelectorAll(".mdc-top-app-bar__action-item").length,
      });
    }
    function D(e) {
      return e in x ? x[e] : P().classList.contains(e);
    }
    function N(e) {
      x[e] || i(11, (x[e] = !0), x);
    }
    function M(e) {
      (e in x && !x[e]) || i(11, (x[e] = !1), x);
    }
    function R(e, t) {
      S[e] != t &&
        ("" === t || null == t
          ? (delete S[e], i(12, S), i(20, L), i(4, g), i(9, y))
          : i(12, (S[e] = t), S));
    }
    function U() {
      y &&
        (y.handleTargetScroll(),
        "short" === g && i(0, (I = "isCollapsed" in y && y.isCollapsed)));
    }
    function P() {
      return b;
    }
    k(
      () => (
        i(9, (y = w())),
        y.init(),
        () => {
          y.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(15, (s = m(n, a))),
          "use" in e && i(1, (d = e.use)),
          "class" in e && i(2, (p = e.class)),
          "style" in e && i(3, (h = e.style)),
          "variant" in e && i(4, (g = e.variant)),
          "color" in e && i(5, ($ = e.color)),
          "collapsed" in e && i(0, (I = e.collapsed)),
          "prominent" in e && i(6, (A = e.prominent)),
          "dense" in e && i(7, (C = e.dense)),
          "scrollTarget" in e && i(8, (_ = e.scrollTarget)),
          "$$scope" in e && i(21, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        262352 & e.$$.dirty[0] &&
          E &&
          E({ variant: g, prominent: A, dense: C }),
          1049104 & e.$$.dirty[0] &&
            L !== g &&
            y &&
            (i(20, (L = g)),
            y.destroy(),
            i(11, (x = {})),
            i(12, (S = {})),
            i(9, (y = w())),
            y.init()),
          528 & e.$$.dirty[0] &&
            y &&
            "short" === g &&
            "setAlwaysCollapsed" in y &&
            y.setAlwaysCollapsed(v),
          524544 & e.$$.dirty[0] &&
            O !== _ &&
            (O && O.removeEventListener("scroll", U),
            _ && _.addEventListener("scroll", U),
            i(19, (O = _)));
      }),
      [
        I,
        d,
        p,
        h,
        g,
        $,
        A,
        C,
        _,
        y,
        b,
        x,
        S,
        l,
        U,
        s,
        function () {
          return T;
        },
        P,
        E,
        O,
        L,
        o,
        r,
        () => "short" !== g && "fixed" !== g && y && y.handleWindowResize(),
        () => null == _ && U(),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (b = e), i(10, b);
          });
        },
        () => y && y.handleNavigationClick(),
      ]
    );
  }
  class rt extends $e {
    constructor(e) {
      super(),
        ge(
          this,
          e,
          st,
          it,
          r,
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
  function ot(e) {
    let n, i, r, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("div")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((c = [$((i = tt.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!r || 32 & t) &&
          d(m, f, e, e[5], r ? u(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ue(h, [8 & t && e[3]]))),
          i && s(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        r || (re(m, e), (r = !0));
      },
      o(e) {
        oe(m, e), (r = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function lt(e, n, i) {
    const a = ["use", "getElement"];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ze(F());
    let u;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (s = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  class ct extends $e {
    constructor(e) {
      super(), ge(this, e, lt, ot, r, { use: 0, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function ut(e) {
    let t;
    const n = e[10].default,
      i = l(n, e, e[12], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 4096 & a) &&
          d(i, n, e, e[12], t ? u(n, e[12], a, null) : p(e[12]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function dt(e) {
    let n, i, a;
    const s = [
      { use: [e[7], ...e[0]] },
      { class: We({ [e[1]]: !0, [e[5]]: !0, ...e[4] }) },
      e[6],
      e[8],
    ];
    var r = e[2];
    function o(e) {
      let n = { $$slots: { default: [ut] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) n = t(n, s[e]);
      return { props: n };
    }
    return (
      r && ((n = new r(o(e))), e[11](n)),
      {
        c() {
          n && fe(n.$$.fragment), (i = x());
        },
        m(e, t) {
          n && me(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, [t]) {
          const a =
            499 & t
              ? ue(s, [
                  129 & t && { use: [e[7], ...e[0]] },
                  50 & t && { class: We({ [e[1]]: !0, [e[5]]: !0, ...e[4] }) },
                  64 & t && de(e[6]),
                  256 & t && de(e[8]),
                ])
              : {};
          if (
            (4096 & t && (a.$$scope = { dirty: t, ctx: e }), r !== (r = e[2]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                he(e, 1);
              }),
                se();
            }
            r
              ? ((n = new r(o(e))),
                e[11](n),
                fe(n.$$.fragment),
                re(n.$$.fragment, 1),
                me(n, i.parentNode, i))
              : (n = null);
          } else r && n.$set(a);
        },
        i(e) {
          a || (n && re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[11](null), t && b(i), n && he(n, t);
        },
      }
    );
  }
  const pt = {
    component: ct,
    class: "",
    classMap: {},
    contexts: {},
    props: {},
  };
  function ft(e, n, i) {
    const a = ["use", "class", "component", "getElement"];
    let s,
      r = m(n, a),
      { $$slots: o = {}, $$scope: l } = n,
      { use: c = [] } = n,
      { class: u = "" } = n;
    const d = pt.class,
      p = {},
      h = [],
      g = pt.contexts,
      $ = pt.props;
    let { component: I = pt.component } = n;
    Object.entries(pt.classMap).forEach(([e, t]) => {
      const n = B(t);
      n &&
        "subscribe" in n &&
        h.push(
          n.subscribe((t) => {
            i(4, (p[e] = t), p);
          })
        );
    });
    const v = Ze(F());
    for (let e in g) g.hasOwnProperty(e) && H(e, g[e]);
    return (
      U(() => {
        for (const e of h) e();
      }),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(8, (r = m(n, a))),
          "use" in e && i(0, (c = e.use)),
          "class" in e && i(1, (u = e.class)),
          "component" in e && i(2, (I = e.component)),
          "$$scope" in e && i(12, (l = e.$$scope));
      }),
      [
        c,
        u,
        I,
        s,
        p,
        d,
        $,
        v,
        r,
        function () {
          return s.getElement();
        },
        o,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (s = e), i(3, s);
          });
        },
        l,
      ]
    );
  }
  class mt extends $e {
    constructor(e) {
      super(),
        ge(this, e, ft, dt, r, {
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
  const ht = Object.assign({}, pt);
  function gt(e) {
    return new Proxy(mt, {
      construct: function (t, n) {
        return Object.assign(pt, ht, e), new t(...n);
      },
      get: function (t, n) {
        return Object.assign(pt, ht, e), t[n];
      },
    });
  }
  function $t(e) {
    let n, i, r, o, c;
    const f = e[7].default,
      m = l(f, e, e[6], null);
    let h = [{ href: e[1] }, e[4]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("a")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[8](n),
          (r = !0),
          o ||
            ((c = [$((i = tt.call(null, n, e[0]))), $(e[3].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!r || 64 & t) &&
          d(m, f, e, e[6], r ? u(f, e[6], t, null) : p(e[6]), null),
          O(n, (g = ue(h, [(!r || 2 & t) && { href: e[1] }, 16 & t && e[4]]))),
          i && s(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        r || (re(m, e), (r = !0));
      },
      o(e) {
        oe(m, e), (r = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[8](null), (o = !1), a(c);
      },
    };
  }
  function It(e, n, i) {
    const a = ["use", "href", "getElement"];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n,
      { use: l = [] } = n,
      { href: c = "javascript:void(0);" } = n;
    const u = Ze(F());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(4, (s = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "href" in e && i(1, (c = e.href)),
          "$$scope" in e && i(6, (o = e.$$scope));
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
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (d = e), i(2, d);
          });
        },
      ]
    );
  }
  function vt(e) {
    let n, i, r, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("button")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          n.autofocus && n.focus(),
          e[7](n),
          (r = !0),
          o ||
            ((c = [$((i = tt.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!r || 32 & t) &&
          d(m, f, e, e[5], r ? u(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ue(h, [8 & t && e[3]]))),
          i && s(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        r || (re(m, e), (r = !0));
      },
      o(e) {
        oe(m, e), (r = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function bt(e, n, i) {
    const a = ["use", "getElement"];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ze(F());
    let u;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (s = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  function yt(e) {
    let n, i, r, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("h1")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((c = [$((i = tt.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!r || 32 & t) &&
          d(m, f, e, e[5], r ? u(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ue(h, [8 & t && e[3]]))),
          i && s(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        r || (re(m, e), (r = !0));
      },
      o(e) {
        oe(m, e), (r = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function Et(e, n, i) {
    const a = ["use", "getElement"];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ze(F());
    let u;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (s = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  function At(e) {
    let n, i, r, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("h2")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((c = [$((i = tt.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!r || 32 & t) &&
          d(m, f, e, e[5], r ? u(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ue(h, [8 & t && e[3]]))),
          i && s(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        r || (re(m, e), (r = !0));
      },
      o(e) {
        oe(m, e), (r = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function Ct(e, n, i) {
    const a = ["use", "getElement"];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ze(F());
    let u;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (s = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  function _t(e) {
    let n, i, r, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("h3")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((c = [$((i = tt.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!r || 32 & t) &&
          d(m, f, e, e[5], r ? u(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ue(h, [8 & t && e[3]]))),
          i && s(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        r || (re(m, e), (r = !0));
      },
      o(e) {
        oe(m, e), (r = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function xt(e, n, i) {
    const a = ["use", "getElement"];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ze(F());
    let u;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (s = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  function St(e) {
    let n, i, r, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("li")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((c = [$((i = tt.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!r || 32 & t) &&
          d(m, f, e, e[5], r ? u(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ue(h, [8 & t && e[3]]))),
          i && s(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        r || (re(m, e), (r = !0));
      },
      o(e) {
        oe(m, e), (r = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function Tt(e, n, i) {
    const a = ["use", "getElement"];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ze(F());
    let u;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (s = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  function Ot(e) {
    let n, i, r, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("nav")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((c = [$((i = tt.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!r || 32 & t) &&
          d(m, f, e, e[5], r ? u(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ue(h, [8 & t && e[3]]))),
          i && s(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        r || (re(m, e), (r = !0));
      },
      o(e) {
        oe(m, e), (r = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function Lt(e, n, i) {
    const a = ["use", "getElement"];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ze(F());
    let u;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (s = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  function wt(e) {
    let n, i, r, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("span")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((c = [$((i = tt.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!r || 32 & t) &&
          d(m, f, e, e[5], r ? u(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ue(h, [8 & t && e[3]]))),
          i && s(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        r || (re(m, e), (r = !0));
      },
      o(e) {
        oe(m, e), (r = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function Dt(e, n, i) {
    const a = ["use", "getElement"];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ze(F());
    let u;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (s = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  class Nt extends $e {
    constructor(e) {
      super(), ge(this, e, Dt, wt, r, { use: 0, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function Mt(e) {
    let n, i, r, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("ul")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((c = [$((i = tt.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!r || 32 & t) &&
          d(m, f, e, e[5], r ? u(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ue(h, [8 & t && e[3]]))),
          i && s(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        r || (re(m, e), (r = !0));
      },
      o(e) {
        oe(m, e), (r = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function Rt(e, n, i) {
    const a = ["use", "getElement"];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ze(F());
    let u;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (s = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        u,
        c,
        s,
        function () {
          return u;
        },
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(1, u);
          });
        },
      ]
    );
  }
  const Ft = class extends $e {
      constructor(e) {
        super(), ge(this, e, It, $t, r, { use: 0, href: 1, getElement: 5 });
      }
      get getElement() {
        return this.$$.ctx[5];
      }
    },
    kt = class extends $e {
      constructor(e) {
        super(), ge(this, e, bt, vt, r, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Ut = ct,
    Pt = class extends $e {
      constructor(e) {
        super(), ge(this, e, Et, yt, r, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Ht = class extends $e {
      constructor(e) {
        super(), ge(this, e, Ct, At, r, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Bt = class extends $e {
      constructor(e) {
        super(), ge(this, e, xt, _t, r, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Vt = class extends $e {
      constructor(e) {
        super(), ge(this, e, Tt, St, r, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    jt = class extends $e {
      constructor(e) {
        super(), ge(this, e, Lt, Ot, r, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    zt = Nt,
    Gt = class extends $e {
      constructor(e) {
        super(), ge(this, e, Rt, Mt, r, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    };
  var qt = gt({ class: "mdc-top-app-bar__row", component: Ut });
  function Kt(e) {
    let n, i, r, o, c, f;
    const m = e[9].default,
      h = l(m, e, e[8], null);
    let g = [
        {
          class: (i = We({
            [e[1]]: !0,
            "mdc-top-app-bar__section": !0,
            "mdc-top-app-bar__section--align-start": "start" === e[2],
            "mdc-top-app-bar__section--align-end": "end" === e[2],
          })),
        },
        e[3] ? { role: "toolbar" } : {},
        e[6],
      ],
      I = {};
    for (let e = 0; e < g.length; e += 1) I = t(I, g[e]);
    return {
      c() {
        (n = E("section")), h && h.c(), O(n, I);
      },
      m(t, i) {
        v(t, n, i),
          h && h.m(n, null),
          e[10](n),
          (o = !0),
          c ||
            ((f = [$((r = tt.call(null, n, e[0]))), $(e[5].call(null, n))]),
            (c = !0));
      },
      p(e, [t]) {
        h &&
          h.p &&
          (!o || 256 & t) &&
          d(h, m, e, e[8], o ? u(m, e[8], t, null) : p(e[8]), null),
          O(
            n,
            (I = ue(g, [
              (!o ||
                (6 & t &&
                  i !==
                    (i = We({
                      [e[1]]: !0,
                      "mdc-top-app-bar__section": !0,
                      "mdc-top-app-bar__section--align-start": "start" === e[2],
                      "mdc-top-app-bar__section--align-end": "end" === e[2],
                    })))) && { class: i },
              8 & t && (e[3] ? { role: "toolbar" } : {}),
              64 & t && e[6],
            ]))
          ),
          r && s(r.update) && 1 & t && r.update.call(null, e[0]);
      },
      i(e) {
        o || (re(h, e), (o = !0));
      },
      o(e) {
        oe(h, e), (o = !1);
      },
      d(t) {
        t && b(n), h && h.d(t), e[10](null), (c = !1), a(f);
      },
    };
  }
  function Wt(e, n, i) {
    const a = ["use", "class", "align", "toolbar", "getElement"];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n;
    const l = Ze(F());
    let c,
      { use: u = [] } = n,
      { class: d = "" } = n,
      { align: p = "start" } = n,
      { toolbar: h = !1 } = n;
    return (
      H(
        "SMUI:icon-button:context",
        h ? "top-app-bar:action" : "top-app-bar:navigation"
      ),
      H(
        "SMUI:button:context",
        h ? "top-app-bar:action" : "top-app-bar:navigation"
      ),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(6, (s = m(n, a))),
          "use" in e && i(0, (u = e.use)),
          "class" in e && i(1, (d = e.class)),
          "align" in e && i(2, (p = e.align)),
          "toolbar" in e && i(3, (h = e.toolbar)),
          "$$scope" in e && i(8, (o = e.$$scope));
      }),
      [
        u,
        d,
        p,
        h,
        c,
        l,
        s,
        function () {
          return c;
        },
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (c = e), i(4, c);
          });
        },
      ]
    );
  }
  var Xt = gt({ class: "mdc-top-app-bar__title", component: zt });
  const Yt = class extends $e {
    constructor(e) {
      super(),
        ge(this, e, Wt, Kt, r, {
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
  class Qt {
    constructor(e, t) {
      (this._value = e), (this._error = t);
    }
    map(e) {
      if (this._error) return new Qt(null, this._error);
      {
        const t = e(this._value);
        return new Qt(t, null);
      }
    }
    mapError(e) {
      if (this._error) {
        const t = e(this._error);
        return new Qt(null, t);
      }
      return new Qt(this._value, null);
    }
    unwrap() {
      if (this._error) throw this._error;
      return this._value;
    }
  }
  function Jt(e, t) {
    return e.reduce((e, n) => {
      const i = t(n);
      return void 0 !== i && e.push(i), e;
    }, []);
  }
  function Zt(e) {
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
   */ var en = {
      LABEL_FLOAT_ABOVE: "mdc-floating-label--float-above",
      LABEL_REQUIRED: "mdc-floating-label--required",
      LABEL_SHAKE: "mdc-floating-label--shake",
      ROOT: "mdc-floating-label",
    },
    tn = (function (e) {
      function t(n) {
        var i = e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
        return (
          (i.shakeAnimationEndHandler = function () {
            i.handleShakeAnimationEnd();
          }),
          i
        );
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return en;
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
            a = n.LABEL_SHAKE;
          e
            ? this.adapter.addClass(i)
            : (this.adapter.removeClass(i), this.adapter.removeClass(a));
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
    })(Se),
    nn = {
      LINE_RIPPLE_ACTIVE: "mdc-line-ripple--active",
      LINE_RIPPLE_DEACTIVATING: "mdc-line-ripple--deactivating",
    },
    an = (function (e) {
      function t(n) {
        var i = e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
        return (
          (i.transitionEndHandler = function (e) {
            i.handleTransitionEnd(e);
          }),
          i
        );
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return nn;
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
          this.adapter.removeClass(nn.LINE_RIPPLE_DEACTIVATING),
            this.adapter.addClass(nn.LINE_RIPPLE_ACTIVE);
        }),
        (t.prototype.setRippleCenter = function (e) {
          this.adapter.setStyle("transform-origin", e + "px center");
        }),
        (t.prototype.deactivate = function () {
          this.adapter.addClass(nn.LINE_RIPPLE_DEACTIVATING);
        }),
        (t.prototype.handleTransitionEnd = function (e) {
          var t = this.adapter.hasClass(nn.LINE_RIPPLE_DEACTIVATING);
          "opacity" === e.propertyName &&
            t &&
            (this.adapter.removeClass(nn.LINE_RIPPLE_ACTIVE),
            this.adapter.removeClass(nn.LINE_RIPPLE_DEACTIVATING));
        }),
        t
      );
    })(Se),
    sn = { NOTCH_ELEMENT_SELECTOR: ".mdc-notched-outline__notch" },
    rn = { NOTCH_ELEMENT_PADDING: 8 },
    on = {
      NO_LABEL: "mdc-notched-outline--no-label",
      OUTLINE_NOTCHED: "mdc-notched-outline--notched",
      OUTLINE_UPGRADED: "mdc-notched-outline--upgraded",
    },
    ln = (function (e) {
      function t(n) {
        return e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return sn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return on;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return rn;
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
          e > 0 && (e += rn.NOTCH_ELEMENT_PADDING),
            this.adapter.setNotchWidthProperty(e),
            this.adapter.addClass(n);
        }),
        (t.prototype.closeNotch = function () {
          var e = t.cssClasses.OUTLINE_NOTCHED;
          this.adapter.removeClass(e), this.adapter.removeNotchWidthProperty();
        }),
        t
      );
    })(Se),
    cn = {
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
    un = {
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
    dn = { LABEL_SCALE: 0.75 },
    pn = [
      "pattern",
      "min",
      "max",
      "required",
      "step",
      "minlength",
      "maxlength",
    ],
    fn = ["color", "date", "datetime-local", "month", "range", "time", "week"],
    mn = ["mousedown", "touchstart"],
    hn = ["click", "keydown"],
    gn = (function (e) {
      function t(n, i) {
        void 0 === i && (i = {});
        var a = e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
        return (
          (a.isFocused = !1),
          (a.receivedUserInput = !1),
          (a.valid = !0),
          (a.useNativeValidation = !0),
          (a.validateOnValueChange = !0),
          (a.helperText = i.helperText),
          (a.characterCounter = i.characterCounter),
          (a.leadingIcon = i.leadingIcon),
          (a.trailingIcon = i.trailingIcon),
          (a.inputFocusHandler = function () {
            a.activateFocus();
          }),
          (a.inputBlurHandler = function () {
            a.deactivateFocus();
          }),
          (a.inputInputHandler = function () {
            a.handleInput();
          }),
          (a.setPointerXOffset = function (e) {
            a.setTransformOrigin(e);
          }),
          (a.textFieldInteractionHandler = function () {
            a.handleTextFieldInteraction();
          }),
          (a.validationAttributeChangeHandler = function (e) {
            a.handleValidationAttributeChange(e);
          }),
          a
        );
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return un;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return cn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return dn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "shouldAlwaysFloat", {
          get: function () {
            var e = this.getNativeInput().type;
            return fn.indexOf(e) >= 0;
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
            for (var a = _e(mn), s = a.next(); !s.done; s = a.next()) {
              var r = s.value;
              this.adapter.registerInputInteractionHandler(
                r,
                this.setPointerXOffset
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              s && !s.done && (t = a.return) && t.call(a);
            } finally {
              if (e) throw e.error;
            }
          }
          try {
            for (var o = _e(hn), l = o.next(); !l.done; l = o.next()) {
              r = l.value;
              this.adapter.registerTextFieldInteractionHandler(
                r,
                this.textFieldInteractionHandler
              );
            }
          } catch (e) {
            n = { error: e };
          } finally {
            try {
              l && !l.done && (i = o.return) && i.call(o);
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
            for (var a = _e(mn), s = a.next(); !s.done; s = a.next()) {
              var r = s.value;
              this.adapter.deregisterInputInteractionHandler(
                r,
                this.setPointerXOffset
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              s && !s.done && (t = a.return) && t.call(a);
            } finally {
              if (e) throw e.error;
            }
          }
          try {
            for (var o = _e(hn), l = o.next(); !l.done; l = o.next()) {
              r = l.value;
              this.adapter.deregisterTextFieldInteractionHandler(
                r,
                this.textFieldInteractionHandler
              );
            }
          } catch (e) {
            n = { error: e };
          } finally {
            try {
              l && !l.done && (i = o.return) && i.call(o);
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
              pn.indexOf(e) > -1 &&
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
              var t = this.adapter.getLabelWidth() * dn.LABEL_SCALE;
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
              a = n.clientX - i.left;
            this.adapter.setLineRippleTransformOrigin(a);
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
              a = this.helperText.getId();
            i && a
              ? this.adapter.setInputAttr(cn.ARIA_DESCRIBEDBY, a)
              : this.adapter.removeInputAttr(cn.ARIA_DESCRIBEDBY);
          }
        }),
        (t.prototype.styleFocused = function (e) {
          var n = t.cssClasses.FOCUSED;
          e ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (t.prototype.styleDisabled = function (e) {
          var n = t.cssClasses,
            i = n.DISABLED,
            a = n.INVALID;
          e
            ? (this.adapter.addClass(i), this.adapter.removeClass(a))
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
    })(Se),
    $n = "mdc-dom-focus-sentinel",
    In = (function () {
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
            .call(this.root.querySelectorAll("." + $n))
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
                  !e.classList.contains($n) &&
                  !t,
                i = !1;
              if (n) {
                var a = getComputedStyle(e);
                i = "none" === a.display || "hidden" === a.visibility;
              }
              return n && !i;
            });
        }),
        (e.prototype.createSentinel = function () {
          var e = document.createElement("div");
          return (
            e.setAttribute("tabindex", "0"),
            e.setAttribute("aria-hidden", "true"),
            e.classList.add($n),
            e
          );
        }),
        e
      );
    })(),
    vn = Object.freeze({ __proto__: null, FocusTrap: In }),
    bn = "Unknown",
    yn = "Backspace",
    En = "Enter",
    An = "Spacebar",
    Cn = "PageUp",
    _n = "PageDown",
    xn = "End",
    Sn = "Home",
    Tn = "ArrowLeft",
    On = "ArrowUp",
    Ln = "ArrowRight",
    wn = "ArrowDown",
    Dn = "Delete",
    Nn = "Escape",
    Mn = "Tab",
    Rn = new Set();
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
   */ Rn.add(yn),
    Rn.add(En),
    Rn.add(An),
    Rn.add(Cn),
    Rn.add(_n),
    Rn.add(xn),
    Rn.add(Sn),
    Rn.add(Tn),
    Rn.add(On),
    Rn.add(Ln),
    Rn.add(wn),
    Rn.add(Dn),
    Rn.add(Nn),
    Rn.add(Mn);
  var Fn = 8,
    kn = 13,
    Un = 32,
    Pn = 33,
    Hn = 34,
    Bn = 35,
    Vn = 36,
    jn = 37,
    zn = 38,
    Gn = 39,
    qn = 40,
    Kn = 46,
    Wn = 27,
    Xn = 9,
    Yn = new Map();
  Yn.set(Fn, yn),
    Yn.set(kn, En),
    Yn.set(Un, An),
    Yn.set(Pn, Cn),
    Yn.set(Hn, _n),
    Yn.set(Bn, xn),
    Yn.set(Vn, Sn),
    Yn.set(jn, Tn),
    Yn.set(zn, On),
    Yn.set(Gn, Ln),
    Yn.set(qn, wn),
    Yn.set(Kn, Dn),
    Yn.set(Wn, Nn),
    Yn.set(Xn, Mn);
  var Qn = new Set();
  function Jn(e) {
    var t = e.key;
    if (Rn.has(t)) return t;
    var n = Yn.get(e.keyCode);
    return n || bn;
  }
  function Zn(e) {
    let t;
    const n = e[9].default,
      i = l(n, e, e[11], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 2048 & a) &&
          d(i, n, e, e[11], t ? u(n, e[11], a, null) : p(e[11]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function ei(e) {
    let n, i, a;
    const s = [
      { use: [e[4], ...e[0]] },
      {
        class: We({
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
    var r = e[2];
    function o(e) {
      let n = { $$slots: { default: [Zn] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) n = t(n, s[e]);
      return { props: n };
    }
    return (
      r && ((n = new r(o(e))), e[10](n)),
      {
        c() {
          n && fe(n.$$.fragment), (i = x());
        },
        m(e, t) {
          n && me(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, [t]) {
          const a =
            243 & t
              ? ue(s, [
                  17 & t && { use: [e[4], ...e[0]] },
                  34 & t && {
                    class: We({
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
                  32 & t &&
                    de("snackbar" === e[5] ? { "aria-atomic": "false" } : {}),
                  64 & t && { tabindex: e[6] },
                  128 & t && de(e[7]),
                ])
              : {};
          if (
            (2048 & t && (a.$$scope = { dirty: t, ctx: e }), r !== (r = e[2]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                he(e, 1);
              }),
                se();
            }
            r
              ? ((n = new r(o(e))),
                e[10](n),
                fe(n.$$.fragment),
                re(n.$$.fragment, 1),
                me(n, i.parentNode, i))
              : (n = null);
          } else r && n.$set(a);
        },
        i(e) {
          a || (n && re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[10](null), t && b(i), n && he(n, t);
        },
      }
    );
  }
  function ti(e, n, i) {
    const a = ["use", "class", "component", "getElement"];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n;
    const l = Ze(F());
    let c,
      { use: u = [] } = n,
      { class: d = "" } = n,
      { component: p = Nt } = n;
    const h = B("SMUI:label:context"),
      g = B("SMUI:label:tabindex");
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(7, (s = m(n, a))),
          "use" in e && i(0, (u = e.use)),
          "class" in e && i(1, (d = e.class)),
          "component" in e && i(2, (p = e.component)),
          "$$scope" in e && i(11, (o = e.$$scope));
      }),
      [
        u,
        d,
        p,
        c,
        l,
        h,
        g,
        s,
        function () {
          return c.getElement();
        },
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (c = e), i(3, c);
          });
        },
        o,
      ]
    );
  }
  Qn.add(Cn),
    Qn.add(_n),
    Qn.add(xn),
    Qn.add(Sn),
    Qn.add(Tn),
    Qn.add(On),
    Qn.add(Ln),
    Qn.add(wn);
  function ni(e) {
    let t;
    const n = e[4].default,
      i = l(n, e, e[3], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, [a]) {
        i &&
          i.p &&
          (!t || 8 & a) &&
          d(i, n, e, e[3], t ? u(n, e[3], a, null) : p(e[3]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function ii(e, t, n) {
    let i,
      { $$slots: a = {}, $$scope: s } = t,
      { key: r } = t,
      { value: l } = t;
    const c = Ke(l);
    return (
      o(e, c, (e) => n(5, (i = e))),
      H(r, c),
      U(() => {
        c.set(void 0);
      }),
      (e.$$set = (e) => {
        "key" in e && n(1, (r = e.key)),
          "value" in e && n(2, (l = e.value)),
          "$$scope" in e && n(3, (s = e.$$scope));
      }),
      (e.$$.update = () => {
        4 & e.$$.dirty && g(c, (i = l), i);
      }),
      [c, r, l, s, a]
    );
  }
  class ai extends $e {
    constructor(e) {
      super(), ge(this, e, ii, ni, r, { key: 1, value: 2 });
    }
  }
  const si = class extends $e {
      constructor(e) {
        super(),
          ge(this, e, ti, ei, r, {
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
    { applyPassive: ri } = Te,
    { matches: oi } = we;
  function li(
    e,
    {
      ripple: t = !0,
      surface: n = !1,
      unbounded: i = !1,
      disabled: a = !1,
      color: s,
      active: r,
      rippleElement: o,
      eventTarget: l,
      activeTarget: c,
      addClass: u = (t) => e.classList.add(t),
      removeClass: d = (t) => e.classList.remove(t),
      addStyle: p = (t, n) => e.style.setProperty(t, n),
      initPromise: f = Promise.resolve(),
    } = {}
  ) {
    let m,
      h,
      g = B("SMUI:addLayoutListener"),
      $ = r,
      I = l,
      v = c;
    function b() {
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
        m &&
          $ !== r &&
          (($ = r), r ? m.activate() : !1 === r && m.deactivate()),
        t && !m
          ? ((m = new Ue({
              addClass: u,
              browserSupportsCssVars: () =>
                (function (e, t) {
                  void 0 === t && (t = !1);
                  var n,
                    i = e.CSS;
                  if ("boolean" == typeof Le && !t) return Le;
                  if (!i || "function" != typeof i.supports) return !1;
                  var a = i.supports("--css-vars", "yes"),
                    s =
                      i.supports("(--css-vars: yes)") &&
                      i.supports("color", "#00000000");
                  return (n = a || s), t || (Le = n), n;
                })(window),
              computeBoundingRect: () => (o || e).getBoundingClientRect(),
              containsEventTarget: (t) => e.contains(t),
              deregisterDocumentInteractionHandler: (e, t) =>
                document.documentElement.removeEventListener(e, t, ri()),
              deregisterInteractionHandler: (t, n) =>
                (l || e).removeEventListener(t, n, ri()),
              deregisterResizeHandler: (e) =>
                window.removeEventListener("resize", e),
              getWindowPageOffset: () => ({
                x: window.pageXOffset,
                y: window.pageYOffset,
              }),
              isSurfaceActive: () => (null == r ? oi(c || e, ":active") : r),
              isSurfaceDisabled: () => !!a,
              isUnbounded: () => !!i,
              registerDocumentInteractionHandler: (e, t) =>
                document.documentElement.addEventListener(e, t, ri()),
              registerInteractionHandler: (t, n) =>
                (l || e).addEventListener(t, n, ri()),
              registerResizeHandler: (e) =>
                window.addEventListener("resize", e),
              removeClass: d,
              updateCssVariable: p,
            })),
            f.then(() => {
              m && (m.init(), m.setUnbounded(i));
            }))
          : m &&
            !t &&
            f.then(() => {
              m && (m.destroy(), (m = void 0));
            }),
        !m ||
          (I === l && v === c) ||
          ((I = l),
          (v = c),
          m.destroy(),
          requestAnimationFrame(() => {
            m && (m.init(), m.setUnbounded(i));
          })),
        !t && i && u("mdc-ripple-upgraded--unbounded");
    }
    return (
      b(),
      g &&
        (h = g(function () {
          m && m.layout();
        })),
      {
        update(m) {
          ({
            ripple: t,
            surface: n,
            unbounded: i,
            disabled: a,
            color: s,
            active: r,
            rippleElement: o,
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
            m
          )),
            b();
        },
        destroy() {
          m &&
            (m.destroy(),
            (m = void 0),
            d("mdc-ripple-surface"),
            d("smui-ripple-surface--primary"),
            d("smui-ripple-surface--secondary")),
            h && h();
        },
      }
    );
  }
  function ci(e) {
    let n, i, r, o, c, f, m, h;
    const g = e[22].default,
      I = l(g, e, e[21], null);
    let y = [
        {
          class: (i = We({
            [e[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": e[0],
            "mdc-floating-label--required": e[1],
            ...e[8],
          })),
        },
        { style: (r = Object.entries(e[9]).map(fi).concat([e[4]]).join(" ")) },
        { for: (o = e[5] || (e[11] ? e[11].id : void 0)) },
        e[12],
      ],
      A = {};
    for (let e = 0; e < y.length; e += 1) A = t(A, y[e]);
    return {
      c() {
        (n = E("label")), I && I.c(), O(n, A);
      },
      m(t, i) {
        v(t, n, i),
          I && I.m(n, null),
          e[24](n),
          (f = !0),
          m ||
            ((h = [$((c = tt.call(null, n, e[2]))), $(e[10].call(null, n))]),
            (m = !0));
      },
      p(e, t) {
        I &&
          I.p &&
          (!f || 2097152 & t) &&
          d(I, g, e, e[21], f ? u(g, e[21], t, null) : p(e[21]), null),
          O(
            n,
            (A = ue(y, [
              (!f ||
                (267 & t &&
                  i !==
                    (i = We({
                      [e[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": e[0],
                      "mdc-floating-label--required": e[1],
                      ...e[8],
                    })))) && { class: i },
              (!f ||
                (528 & t &&
                  r !==
                    (r = Object.entries(e[9])
                      .map(fi)
                      .concat([e[4]])
                      .join(" ")))) && { style: r },
              (!f ||
                (32 & t &&
                  o !== (o = e[5] || (e[11] ? e[11].id : void 0)))) && {
                for: o,
              },
              4096 & t && e[12],
            ]))
          ),
          c && s(c.update) && 4 & t && c.update.call(null, e[2]);
      },
      i(e) {
        f || (re(I, e), (f = !0));
      },
      o(e) {
        oe(I, e), (f = !1);
      },
      d(t) {
        t && b(n), I && I.d(t), e[24](null), (m = !1), a(h);
      },
    };
  }
  function ui(e) {
    let n, i, r, o, c, f, m;
    const h = e[22].default,
      g = l(h, e, e[21], null);
    let I = [
        {
          class: (i = We({
            [e[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": e[0],
            "mdc-floating-label--required": e[1],
            ...e[8],
          })),
        },
        { style: (r = Object.entries(e[9]).map(pi).concat([e[4]]).join(" ")) },
        e[12],
      ],
      y = {};
    for (let e = 0; e < I.length; e += 1) y = t(y, I[e]);
    return {
      c() {
        (n = E("span")), g && g.c(), O(n, y);
      },
      m(t, i) {
        v(t, n, i),
          g && g.m(n, null),
          e[23](n),
          (c = !0),
          f ||
            ((m = [$((o = tt.call(null, n, e[2]))), $(e[10].call(null, n))]),
            (f = !0));
      },
      p(e, t) {
        g &&
          g.p &&
          (!c || 2097152 & t) &&
          d(g, h, e, e[21], c ? u(h, e[21], t, null) : p(e[21]), null),
          O(
            n,
            (y = ue(I, [
              (!c ||
                (267 & t &&
                  i !==
                    (i = We({
                      [e[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": e[0],
                      "mdc-floating-label--required": e[1],
                      ...e[8],
                    })))) && { class: i },
              (!c ||
                (528 & t &&
                  r !==
                    (r = Object.entries(e[9])
                      .map(pi)
                      .concat([e[4]])
                      .join(" ")))) && { style: r },
              4096 & t && e[12],
            ]))
          ),
          o && s(o.update) && 4 & t && o.update.call(null, e[2]);
      },
      i(e) {
        c || (re(g, e), (c = !0));
      },
      o(e) {
        oe(g, e), (c = !1);
      },
      d(t) {
        t && b(n), g && g.d(t), e[23](null), (f = !1), a(m);
      },
    };
  }
  function di(e) {
    let t, n, i, a;
    const s = [ui, ci],
      r = [];
    function o(e, t) {
      return e[6] ? 0 : 1;
    }
    return (
      (t = o(e)),
      (n = r[t] = s[t](e)),
      {
        c() {
          n.c(), (i = x());
        },
        m(e, n) {
          r[t].m(e, n), v(e, i, n), (a = !0);
        },
        p(e, [a]) {
          let l = t;
          (t = o(e)),
            t === l
              ? r[t].p(e, a)
              : (ae(),
                oe(r[l], 1, 1, () => {
                  r[l] = null;
                }),
                se(),
                (n = r[t]),
                n ? n.p(e, a) : ((n = r[t] = s[t](e)), n.c()),
                re(n, 1),
                n.m(i.parentNode, i));
        },
        i(e) {
          a || (re(n), (a = !0));
        },
        o(e) {
          oe(n), (a = !1);
        },
        d(e) {
          r[t].d(e), e && b(i);
        },
      }
    );
  }
  const pi = ([e, t]) => `${e}: ${t};`,
    fi = ([e, t]) => `${e}: ${t};`;
  function mi(e, n, i) {
    const a = [
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
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n;
    var l;
    const c = Ze(F());
    let u,
      d,
      { use: p = [] } = n,
      { class: h = "" } = n,
      { style: g = "" } = n,
      { for: $ } = n,
      { floatAbove: I = !1 } = n,
      { required: v = !1 } = n,
      { wrapped: b = !1 } = n,
      y = {},
      E = {},
      A = null !== (l = B("SMUI:generic:input:props")) && void 0 !== l ? l : {},
      C = I,
      _ = v;
    function x(e) {
      y[e] || i(8, (y[e] = !0), y);
    }
    function S(e) {
      (e in y && !y[e]) || i(8, (y[e] = !1), y);
    }
    function T(e, t) {
      E[e] != t &&
        ("" === t || null == t ? (delete E[e], i(9, E)) : i(9, (E[e] = t), E));
    }
    function O(e) {
      e in E && (delete E[e], i(9, E));
    }
    function L() {
      return u;
    }
    return (
      k(() => {
        i(
          18,
          (d = new tn({
            addClass: x,
            removeClass: S,
            getWidth: () => {
              var e, t;
              const n = L(),
                i = n.cloneNode(!0);
              null === (e = n.parentNode) || void 0 === e || e.appendChild(i),
                i.classList.add("smui-floating-label--remove-transition"),
                i.classList.add("smui-floating-label--force-size"),
                i.classList.remove("mdc-floating-label--float-above");
              const a = i.scrollWidth;
              return (
                null === (t = n.parentNode) || void 0 === t || t.removeChild(i),
                a
              );
            },
            registerInteractionHandler: (e, t) => L().addEventListener(e, t),
            deregisterInteractionHandler: (e, t) =>
              L().removeEventListener(e, t),
          }))
        );
        const e = {
          get element() {
            return L();
          },
          addStyle: T,
          removeStyle: O,
        };
        return (
          Xe(u, "SMUIFloatingLabel:mount", e),
          d.init(),
          () => {
            Xe(u, "SMUIFloatingLabel:unmount", e), d.destroy();
          }
        );
      }),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(12, (s = m(n, a))),
          "use" in e && i(2, (p = e.use)),
          "class" in e && i(3, (h = e.class)),
          "style" in e && i(4, (g = e.style)),
          "for" in e && i(5, ($ = e.for)),
          "floatAbove" in e && i(0, (I = e.floatAbove)),
          "required" in e && i(1, (v = e.required)),
          "wrapped" in e && i(6, (b = e.wrapped)),
          "$$scope" in e && i(21, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        786433 & e.$$.dirty && d && C !== I && (i(19, (C = I)), d.float(I)),
          1310722 & e.$$.dirty &&
            d &&
            _ !== v &&
            (i(20, (_ = v)), d.setRequired(v));
      }),
      [
        I,
        v,
        p,
        h,
        g,
        $,
        b,
        u,
        y,
        E,
        c,
        A,
        s,
        function (e) {
          d.shake(e);
        },
        function (e) {
          i(0, (I = e));
        },
        function (e) {
          i(1, (v = e));
        },
        function () {
          return d.getWidth();
        },
        L,
        d,
        C,
        _,
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(7, u);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(7, u);
          });
        },
      ]
    );
  }
  class hi extends $e {
    constructor(e) {
      super(),
        ge(this, e, mi, di, r, {
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
  function gi(n) {
    let i,
      r,
      o,
      l,
      c,
      u,
      d = [
        {
          class: (r = We({
            [n[1]]: !0,
            "mdc-line-ripple": !0,
            "mdc-line-ripple--active": n[3],
            ...n[5],
          })),
        },
        { style: (o = Object.entries(n[6]).map($i).concat([n[2]]).join(" ")) },
        n[8],
      ],
      p = {};
    for (let e = 0; e < d.length; e += 1) p = t(p, d[e]);
    return {
      c() {
        (i = E("div")), O(i, p);
      },
      m(e, t) {
        v(e, i, t),
          n[13](i),
          c ||
            ((u = [$((l = tt.call(null, i, n[0]))), $(n[7].call(null, i))]),
            (c = !0));
      },
      p(e, [t]) {
        O(
          i,
          (p = ue(d, [
            42 & t &&
              r !==
                (r = We({
                  [e[1]]: !0,
                  "mdc-line-ripple": !0,
                  "mdc-line-ripple--active": e[3],
                  ...e[5],
                })) && { class: r },
            68 & t &&
              o !==
                (o = Object.entries(e[6]).map($i).concat([e[2]]).join(" ")) && {
                style: o,
              },
            256 & t && e[8],
          ]))
        ),
          l && s(l.update) && 1 & t && l.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && b(i), n[13](null), (c = !1), a(u);
      },
    };
  }
  const $i = ([e, t]) => `${e}: ${t};`;
  function Ii(e, n, i) {
    const a = [
      "use",
      "class",
      "style",
      "active",
      "activate",
      "deactivate",
      "setRippleCenter",
      "getElement",
    ];
    let s = m(n, a);
    const r = Ze(F());
    let o,
      l,
      { use: c = [] } = n,
      { class: u = "" } = n,
      { style: d = "" } = n,
      { active: p = !1 } = n,
      h = {},
      g = {};
    function $(e) {
      return e in h ? h[e] : y().classList.contains(e);
    }
    function I(e) {
      h[e] || i(5, (h[e] = !0), h);
    }
    function v(e) {
      (e in h && !h[e]) || i(5, (h[e] = !1), h);
    }
    function b(e, t) {
      g[e] != t &&
        ("" === t || null == t ? (delete g[e], i(6, g)) : i(6, (g[e] = t), g));
    }
    function y() {
      return o;
    }
    return (
      k(
        () => (
          (l = new an({
            addClass: I,
            removeClass: v,
            hasClass: $,
            setStyle: b,
            registerEventHandler: (e, t) => y().addEventListener(e, t),
            deregisterEventHandler: (e, t) => y().removeEventListener(e, t),
          })),
          l.init(),
          () => {
            l.destroy();
          }
        )
      ),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(8, (s = m(n, a))),
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
        o,
        h,
        g,
        r,
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
        y,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (o = e), i(4, o);
          });
        },
      ]
    );
  }
  class vi extends $e {
    constructor(e) {
      super(),
        ge(this, e, Ii, gi, r, {
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
  function bi(e) {
    let t, n, i;
    const a = e[14].default,
      s = l(a, e, e[13], null);
    return {
      c() {
        (t = E("div")),
          s && s.c(),
          T(t, "class", "mdc-notched-outline__notch"),
          T(t, "style", (n = Object.entries(e[7]).map(Ei).join(" ")));
      },
      m(e, n) {
        v(e, t, n), s && s.m(t, null), (i = !0);
      },
      p(e, r) {
        s &&
          s.p &&
          (!i || 8192 & r) &&
          d(s, a, e, e[13], i ? u(a, e[13], r, null) : p(e[13]), null),
          (!i ||
            (128 & r && n !== (n = Object.entries(e[7]).map(Ei).join(" ")))) &&
            T(t, "style", n);
      },
      i(e) {
        i || (re(s, e), (i = !0));
      },
      o(e) {
        oe(s, e), (i = !1);
      },
      d(e) {
        e && b(t), s && s.d(e);
      },
    };
  }
  function yi(e) {
    let n,
      i,
      r,
      o,
      l,
      c,
      u,
      d,
      p,
      f,
      m = !e[3] && bi(e),
      h = [
        {
          class: (c = We({
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
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("div")),
          (i = E("div")),
          (r = _()),
          m && m.c(),
          (o = _()),
          (l = E("div")),
          T(i, "class", "mdc-notched-outline__leading"),
          T(l, "class", "mdc-notched-outline__trailing"),
          O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          I(n, i),
          I(n, r),
          m && m.m(n, null),
          I(n, o),
          I(n, l),
          e[15](n),
          (d = !0),
          p ||
            ((f = [
              $((u = tt.call(null, n, e[0]))),
              $(e[8].call(null, n)),
              S(n, "SMUIFloatingLabel:mount", e[16]),
              S(n, "SMUIFloatingLabel:unmount", e[17]),
            ]),
            (p = !0));
      },
      p(e, [t]) {
        e[3]
          ? m &&
            (ae(),
            oe(m, 1, 1, () => {
              m = null;
            }),
            se())
          : m
          ? (m.p(e, t), 8 & t && re(m, 1))
          : ((m = bi(e)), m.c(), re(m, 1), m.m(n, o)),
          O(
            n,
            (g = ue(h, [
              (!d ||
                (78 & t &&
                  c !==
                    (c = We({
                      [e[1]]: !0,
                      "mdc-notched-outline": !0,
                      "mdc-notched-outline--notched": e[2],
                      "mdc-notched-outline--no-label": e[3],
                      ...e[6],
                    })))) && { class: c },
              512 & t && e[9],
            ]))
          ),
          u && s(u.update) && 1 & t && u.update.call(null, e[0]);
      },
      i(e) {
        d || (re(m), (d = !0));
      },
      o(e) {
        oe(m), (d = !1);
      },
      d(t) {
        t && b(n), m && m.d(), e[15](null), (p = !1), a(f);
      },
    };
  }
  const Ei = ([e, t]) => `${e}: ${t};`;
  function Ai(e, n, i) {
    const a = [
      "use",
      "class",
      "notched",
      "noLabel",
      "notch",
      "closeNotch",
      "getElement",
    ];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n;
    const l = Ze(F());
    let c,
      u,
      d,
      { use: p = [] } = n,
      { class: h = "" } = n,
      { notched: g = !1 } = n,
      { noLabel: $ = !1 } = n,
      I = {},
      v = {};
    function b(e) {
      I[e] || i(6, (I[e] = !0), I);
    }
    function y(e) {
      (e in I && !I[e]) || i(6, (I[e] = !1), I);
    }
    k(
      () => (
        (u = new ln({
          addClass: b,
          removeClass: y,
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
        (n = t(t({}, n), f(e))),
          i(9, (s = m(n, a))),
          "use" in e && i(0, (p = e.use)),
          "class" in e && i(1, (h = e.class)),
          "notched" in e && i(2, (g = e.notched)),
          "noLabel" in e && i(3, ($ = e.noLabel)),
          "$$scope" in e && i(13, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        16 & e.$$.dirty &&
          (d
            ? (d.addStyle("transition-duration", "0s"),
              b("mdc-notched-outline--upgraded"),
              requestAnimationFrame(() => {
                d && d.removeStyle("transition-duration");
              }))
            : y("mdc-notched-outline--upgraded"));
      }),
      [
        p,
        h,
        g,
        $,
        d,
        c,
        I,
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
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (c = e), i(5, c);
          });
        },
        (e) => i(4, (d = e.detail)),
        () => i(4, (d = void 0)),
      ]
    );
  }
  class Ci extends $e {
    constructor(e) {
      super(),
        ge(this, e, Ai, yi, r, {
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
  var _i = gt({ class: "mdc-text-field-helper-line", component: Ut }),
    xi = gt({
      class: "mdc-text-field__affix mdc-text-field__affix--prefix",
      component: zt,
    }),
    Si = gt({
      class: "mdc-text-field__affix mdc-text-field__affix--suffix",
      component: zt,
    });
  function Ti(n) {
    let i,
      r,
      o,
      l,
      c,
      u = [
        { class: (r = We({ [n[1]]: !0, "mdc-text-field__input": !0 })) },
        { type: n[2] },
        { placeholder: n[3] },
        n[4],
        n[6],
        n[10],
      ],
      d = {};
    for (let e = 0; e < u.length; e += 1) d = t(d, u[e]);
    return {
      c() {
        (i = E("input")), O(i, d);
      },
      m(e, t) {
        v(e, i, t),
          i.autofocus && i.focus(),
          n[26](i),
          l ||
            ((c = [
              $((o = tt.call(null, i, n[0]))),
              $(n[7].call(null, i)),
              S(i, "input", n[27]),
              S(i, "change", n[9]),
              S(i, "blur", n[24]),
              S(i, "focus", n[25]),
            ]),
            (l = !0));
      },
      p(e, [t]) {
        O(
          i,
          (d = ue(u, [
            2 & t &&
              r !== (r = We({ [e[1]]: !0, "mdc-text-field__input": !0 })) && {
                class: r,
              },
            4 & t && { type: e[2] },
            8 & t && { placeholder: e[3] },
            16 & t && e[4],
            64 & t && e[6],
            1024 & t && e[10],
          ]))
        ),
          o && s(o.update) && 1 & t && o.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && b(i), n[26](null), (l = !1), a(c);
      },
    };
  }
  function Oi(e, n, i) {
    const a = [
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
    let s = m(n, a);
    const r = Ze(F());
    let o = () => {};
    let { use: l = [] } = n,
      { class: c = "" } = n,
      { type: u = "text" } = n,
      { placeholder: d = " " } = n,
      { value: p = o } = n;
    const h = (function (e) {
      return e === o;
    })(p);
    h && (p = "");
    let { files: g = null } = n,
      { dirty: $ = !1 } = n,
      { invalid: I = !1 } = n,
      { updateInvalid: v = !0 } = n,
      { emptyValueNull: b = null === p } = n;
    h && b && (p = null);
    let y,
      { emptyValueUndefined: E = void 0 === p } = n;
    h && E && (p = void 0);
    let A = {},
      C = {};
    function _(e) {
      if ("file" !== u)
        if ("" === e.currentTarget.value && b) i(11, (p = null));
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
    function x() {
      return y;
    }
    k(() => {
      v && i(14, (I = y.matches(":invalid")));
    });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(10, (s = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "class" in e && i(1, (c = e.class)),
          "type" in e && i(2, (u = e.type)),
          "placeholder" in e && i(3, (d = e.placeholder)),
          "value" in e && i(11, (p = e.value)),
          "files" in e && i(12, (g = e.files)),
          "dirty" in e && i(13, ($ = e.dirty)),
          "invalid" in e && i(14, (I = e.invalid)),
          "updateInvalid" in e && i(15, (v = e.updateInvalid)),
          "emptyValueNull" in e && i(16, (b = e.emptyValueNull)),
          "emptyValueUndefined" in e && i(17, (E = e.emptyValueUndefined));
      }),
      (e.$$.update = () => {
        2068 & e.$$.dirty &&
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
        y,
        A,
        r,
        _,
        function (e) {
          ("file" !== u && "range" !== u) || _(e),
            i(13, ($ = !0)),
            v && i(14, (I = y.matches(":invalid")));
        },
        s,
        p,
        g,
        $,
        I,
        v,
        b,
        E,
        function (e) {
          var t;
          return e in A
            ? null !== (t = A[e]) && void 0 !== t
              ? t
              : null
            : x().getAttribute(e);
        },
        function (e, t) {
          A[e] !== t && i(6, (A[e] = t), A);
        },
        function (e) {
          (e in A && null == A[e]) || i(6, (A[e] = void 0), A);
        },
        function () {
          x().focus();
        },
        function () {
          x().blur();
        },
        x,
        function (t) {
          V.call(this, e, t);
        },
        function (t) {
          V.call(this, e, t);
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (y = e), i(5, y);
          });
        },
        (e) => "file" !== u && _(e),
      ]
    );
  }
  class Li extends $e {
    constructor(e) {
      super(),
        ge(this, e, Oi, Ti, r, {
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
  function wi(n) {
    let i,
      r,
      o,
      l,
      c,
      u,
      d = [
        { class: (r = We({ [n[2]]: !0, "mdc-text-field__input": !0 })) },
        { style: (o = `${n[4] ? "" : "resize: none; "}${n[3]}`) },
        n[6],
        n[9],
      ],
      p = {};
    for (let e = 0; e < d.length; e += 1) p = t(p, d[e]);
    return {
      c() {
        (i = E("textarea")), O(i, p);
      },
      m(e, t) {
        v(e, i, t),
          i.autofocus && i.focus(),
          n[21](i),
          w(i, n[0]),
          c ||
            ((u = [
              $((l = tt.call(null, i, n[1]))),
              $(n[7].call(null, i)),
              S(i, "change", n[8]),
              S(i, "blur", n[19]),
              S(i, "focus", n[20]),
              S(i, "input", n[22]),
            ]),
            (c = !0));
      },
      p(e, [t]) {
        O(
          i,
          (p = ue(d, [
            4 & t &&
              r !== (r = We({ [e[2]]: !0, "mdc-text-field__input": !0 })) && {
                class: r,
              },
            24 & t &&
              o !== (o = `${e[4] ? "" : "resize: none; "}${e[3]}`) && {
                style: o,
              },
            64 & t && e[6],
            512 & t && e[9],
          ]))
        ),
          l && s(l.update) && 2 & t && l.update.call(null, e[1]),
          1 & t && w(i, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && b(i), n[21](null), (c = !1), a(u);
      },
    };
  }
  function Di(e, n, i) {
    const a = [
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
    let s = m(n, a);
    const r = Ze(F());
    let o,
      { use: l = [] } = n,
      { class: c = "" } = n,
      { style: u = "" } = n,
      { value: d = "" } = n,
      { dirty: p = !1 } = n,
      { invalid: h = !1 } = n,
      { updateInvalid: g = !0 } = n,
      { resizable: $ = !0 } = n,
      I = {};
    function v() {
      return o;
    }
    return (
      k(() => {
        g && i(11, (h = o.matches(":invalid")));
      }),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(9, (s = m(n, a))),
          "use" in e && i(1, (l = e.use)),
          "class" in e && i(2, (c = e.class)),
          "style" in e && i(3, (u = e.style)),
          "value" in e && i(0, (d = e.value)),
          "dirty" in e && i(10, (p = e.dirty)),
          "invalid" in e && i(11, (h = e.invalid)),
          "updateInvalid" in e && i(12, (g = e.updateInvalid)),
          "resizable" in e && i(4, ($ = e.resizable));
      }),
      [
        d,
        l,
        c,
        u,
        $,
        o,
        I,
        r,
        function () {
          i(10, (p = !0)), g && i(11, (h = o.matches(":invalid")));
        },
        s,
        p,
        h,
        g,
        function (e) {
          var t;
          return e in I
            ? null !== (t = I[e]) && void 0 !== t
              ? t
              : null
            : v().getAttribute(e);
        },
        function (e, t) {
          I[e] !== t && i(6, (I[e] = t), I);
        },
        function (e) {
          (e in I && null == I[e]) || i(6, (I[e] = void 0), I);
        },
        function () {
          v().focus();
        },
        function () {
          v().blur();
        },
        v,
        function (t) {
          V.call(this, e, t);
        },
        function (t) {
          V.call(this, e, t);
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (o = e), i(5, o);
          });
        },
        function () {
          (d = this.value), i(0, d);
        },
      ]
    );
  }
  class Ni extends $e {
    constructor(e) {
      super(),
        ge(this, e, Di, wi, r, {
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
  const Mi = (e) => ({}),
    Ri = (e) => ({}),
    Fi = (e) => ({}),
    ki = (e) => ({}),
    Ui = (e) => ({}),
    Pi = (e) => ({}),
    Hi = (e) => ({}),
    Bi = (e) => ({}),
    Vi = (e) => ({}),
    ji = (e) => ({}),
    zi = (e) => ({}),
    Gi = (e) => ({}),
    qi = (e) => ({}),
    Ki = (e) => ({}),
    Wi = (e) => ({}),
    Xi = (e) => ({}),
    Yi = (e) => ({}),
    Qi = (e) => ({}),
    Ji = (e) => ({}),
    Zi = (e) => ({}),
    ea = (e) => ({}),
    ta = (e) => ({}),
    na = (e) => ({}),
    ia = (e) => ({});
  function aa(e) {
    let n, i, r, o, c, f, m, h, g, y, A, C, x, T;
    const L = e[51].label,
      w = l(L, e, e[90], ji);
    r = new ai({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [ra] },
        $$scope: { ctx: e },
      },
    });
    const D = e[51].default,
      N = l(D, e, e[90], null);
    f = new ai({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !1,
        $$slots: { default: [oa] },
        $$scope: { ctx: e },
      },
    });
    const M = e[51].ripple,
      R = l(M, e, e[90], ki);
    let F = [
        {
          class: (h = We({
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
          style: (g = Object.entries(e[26]).map(Oa).concat([e[10]]).join(" ")),
        },
        Ye(e[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      k = {};
    for (let e = 0; e < F.length; e += 1) k = t(k, F[e]);
    return {
      c() {
        (n = E("div")),
          w && w.c(),
          (i = _()),
          fe(r.$$.fragment),
          (o = _()),
          N && N.c(),
          (c = _()),
          fe(f.$$.fragment),
          (m = _()),
          R && R.c(),
          O(n, k);
      },
      m(t, a) {
        v(t, n, a),
          w && w.m(n, null),
          I(n, i),
          me(r, n, null),
          I(n, o),
          N && N.m(n, null),
          I(n, c),
          me(f, n, null),
          I(n, m),
          R && R.m(n, null),
          e[80](n),
          (C = !0),
          x ||
            ((T = [
              $(
                (y = li.call(null, n, {
                  ripple: e[11],
                  unbounded: !1,
                  addClass: e[38],
                  removeClass: e[39],
                  addStyle: e[40],
                }))
              ),
              $((A = tt.call(null, n, e[8]))),
              $(e[34].call(null, n)),
              S(n, "SMUITextfieldLeadingIcon:mount", e[81]),
              S(n, "SMUITextfieldLeadingIcon:unmount", e[82]),
              S(n, "SMUITextfieldTrailingIcon:mount", e[83]),
              S(n, "SMUITextfieldTrailingIcon:unmount", e[84]),
            ]),
            (x = !0));
      },
      p(e, t) {
        w &&
          w.p &&
          (!C || 268435456 & t[2]) &&
          d(w, L, e, e[90], C ? u(L, e[90], t, Vi) : p(e[90]), ji);
        const i = {};
        268435456 & t[2] && (i.$$scope = { dirty: t, ctx: e }),
          r.$set(i),
          N &&
            N.p &&
            (!C || 268435456 & t[2]) &&
            d(N, D, e, e[90], C ? u(D, e[90], t, null) : p(e[90]), null);
        const a = {};
        268435456 & t[2] && (a.$$scope = { dirty: t, ctx: e }),
          f.$set(a),
          R &&
            R.p &&
            (!C || 268435456 & t[2]) &&
            d(R, M, e, e[90], C ? u(M, e[90], t, Fi) : p(e[90]), ki),
          O(
            n,
            (k = ue(F, [
              (!C ||
                ((33673730 & t[0]) | (2048 & t[1]) &&
                  h !==
                    (h = We({
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
                    })))) && { class: h },
              (!C ||
                (67109888 & t[0] &&
                  g !==
                    (g = Object.entries(e[26])
                      .map(Oa)
                      .concat([e[10]])
                      .join(" ")))) && { style: g },
              1024 & t[1] &&
                Ye(e[41], [
                  "input$",
                  "label$",
                  "ripple$",
                  "outline$",
                  "helperLine$",
                ]),
            ]))
          ),
          y &&
            s(y.update) &&
            2048 & t[0] &&
            y.update.call(null, {
              ripple: e[11],
              unbounded: !1,
              addClass: e[38],
              removeClass: e[39],
              addStyle: e[40],
            }),
          A && s(A.update) && 256 & t[0] && A.update.call(null, e[8]);
      },
      i(e) {
        C ||
          (re(w, e),
          re(r.$$.fragment, e),
          re(N, e),
          re(f.$$.fragment, e),
          re(R, e),
          (C = !0));
      },
      o(e) {
        oe(w, e),
          oe(r.$$.fragment, e),
          oe(N, e),
          oe(f.$$.fragment, e),
          oe(R, e),
          (C = !1);
      },
      d(t) {
        t && b(n),
          w && w.d(t),
          he(r),
          N && N.d(t),
          he(f),
          R && R.d(t),
          e[80](null),
          (x = !1),
          a(T);
      },
    };
  }
  function sa(e) {
    let n,
      i,
      r,
      o,
      c,
      f,
      m,
      h,
      g,
      y,
      A,
      C,
      x,
      T,
      L,
      w,
      D,
      N,
      M = !e[14] && "outlined" !== e[15] && la(e),
      R = (e[14] || "outlined" === e[15]) && pa(e);
    o = new ai({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [ga] },
        $$scope: { ctx: e },
      },
    });
    const F = e[51].default,
      k = l(F, e, e[90], null),
      U = [Ia, $a],
      P = [];
    function H(e, t) {
      return e[14] && "string" == typeof e[0] ? 0 : 1;
    }
    (m = H(e)),
      (h = P[m] = U[m](e)),
      (y = new ai({
        props: {
          key: "SMUI:textfield:icon:leading",
          value: !1,
          $$slots: { default: [Aa] },
          $$scope: { ctx: e },
        },
      }));
    let B = !e[14] && "outlined" !== e[15] && e[11] && Ca(e),
      V = [
        {
          class: (C = We({
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
          style: (x = Object.entries(e[26]).map(Ta).concat([e[10]]).join(" ")),
        },
        { for: void 0 },
        Ye(e[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      j = {};
    for (let e = 0; e < V.length; e += 1) j = t(j, V[e]);
    return {
      c() {
        (n = E("label")),
          M && M.c(),
          (i = _()),
          R && R.c(),
          (r = _()),
          fe(o.$$.fragment),
          (c = _()),
          k && k.c(),
          (f = _()),
          h.c(),
          (g = _()),
          fe(y.$$.fragment),
          (A = _()),
          B && B.c(),
          O(n, j);
      },
      m(t, a) {
        v(t, n, a),
          M && M.m(n, null),
          I(n, i),
          R && R.m(n, null),
          I(n, r),
          me(o, n, null),
          I(n, c),
          k && k.m(n, null),
          I(n, f),
          P[m].m(n, null),
          I(n, g),
          me(y, n, null),
          I(n, A),
          B && B.m(n, null),
          e[73](n),
          (w = !0),
          D ||
            ((N = [
              $(
                (T = li.call(null, n, {
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
              $((L = tt.call(null, n, e[8]))),
              $(e[34].call(null, n)),
              S(n, "SMUITextfieldLeadingIcon:mount", e[74]),
              S(n, "SMUITextfieldLeadingIcon:unmount", e[75]),
              S(n, "SMUITextfieldTrailingIcon:mount", e[76]),
              S(n, "SMUITextfieldTrailingIcon:unmount", e[77]),
              S(n, "SMUITextfieldCharacterCounter:mount", e[78]),
              S(n, "SMUITextfieldCharacterCounter:unmount", e[79]),
            ]),
            (D = !0));
      },
      p(e, t) {
        e[14] || "outlined" === e[15]
          ? M &&
            (ae(),
            oe(M, 1, 1, () => {
              M = null;
            }),
            se())
          : M
          ? (M.p(e, t), 49152 & t[0] && re(M, 1))
          : ((M = la(e)), M.c(), re(M, 1), M.m(n, i)),
          e[14] || "outlined" === e[15]
            ? R
              ? (R.p(e, t), 49152 & t[0] && re(R, 1))
              : ((R = pa(e)), R.c(), re(R, 1), R.m(n, r))
            : R &&
              (ae(),
              oe(R, 1, 1, () => {
                R = null;
              }),
              se());
        const a = {};
        268435456 & t[2] && (a.$$scope = { dirty: t, ctx: e }),
          o.$set(a),
          k &&
            k.p &&
            (!w || 268435456 & t[2]) &&
            d(k, F, e, e[90], w ? u(F, e[90], t, null) : p(e[90]), null);
        let l = m;
        (m = H(e)),
          m === l
            ? P[m].p(e, t)
            : (ae(),
              oe(P[l], 1, 1, () => {
                P[l] = null;
              }),
              se(),
              (h = P[m]),
              h ? h.p(e, t) : ((h = P[m] = U[m](e)), h.c()),
              re(h, 1),
              h.m(n, g));
        const c = {};
        268435456 & t[2] && (c.$$scope = { dirty: t, ctx: e }),
          y.$set(c),
          !e[14] && "outlined" !== e[15] && e[11]
            ? B
              ? (B.p(e, t), 51200 & t[0] && re(B, 1))
              : ((B = Ca(e)), B.c(), re(B, 1), B.m(n, null))
            : B &&
              (ae(),
              oe(B, 1, 1, () => {
                B = null;
              }),
              se()),
          O(
            n,
            (j = ue(V, [
              (!w ||
                ((314823171 & t[0]) | (2048 & t[1]) &&
                  C !==
                    (C = We({
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
                    })))) && { class: C },
              (!w ||
                (67109888 & t[0] &&
                  x !==
                    (x = Object.entries(e[26])
                      .map(Ta)
                      .concat([e[10]])
                      .join(" ")))) && { style: x },
              { for: void 0 },
              1024 & t[1] &&
                Ye(e[41], [
                  "input$",
                  "label$",
                  "ripple$",
                  "outline$",
                  "helperLine$",
                ]),
            ]))
          ),
          T &&
            s(T.update) &&
            (49152 & t[0]) | (4 & t[1]) &&
            T.update.call(null, {
              ripple: !e[14] && "filled" === e[15],
              unbounded: !1,
              addClass: e[38],
              removeClass: e[39],
              addStyle: e[40],
              eventTarget: e[33],
              activeTarget: e[33],
              initPromise: e[37],
            }),
          L && s(L.update) && 256 & t[0] && L.update.call(null, e[8]);
      },
      i(e) {
        w ||
          (re(M),
          re(R),
          re(o.$$.fragment, e),
          re(k, e),
          re(h),
          re(y.$$.fragment, e),
          re(B),
          (w = !0));
      },
      o(e) {
        oe(M),
          oe(R),
          oe(o.$$.fragment, e),
          oe(k, e),
          oe(h),
          oe(y.$$.fragment, e),
          oe(B),
          (w = !1);
      },
      d(t) {
        t && b(n),
          M && M.d(),
          R && R.d(),
          he(o),
          k && k.d(t),
          P[m].d(),
          he(y),
          B && B.d(),
          e[73](null),
          (D = !1),
          a(N);
      },
    };
  }
  function ra(e) {
    let t;
    const n = e[51].leadingIcon,
      i = l(n, e, e[90], Bi);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 268435456 & a[2]) &&
          d(i, n, e, e[90], t ? u(n, e[90], a, Hi) : p(e[90]), Bi);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function oa(e) {
    let t;
    const n = e[51].trailingIcon,
      i = l(n, e, e[90], Pi);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 268435456 & a[2]) &&
          d(i, n, e, e[90], t ? u(n, e[90], a, Ui) : p(e[90]), Pi);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function la(e) {
    let t,
      n,
      i,
      a = "filled" === e[15] && ca(),
      s = !e[16] && (null != e[17] || e[42].label) && ua(e);
    return {
      c() {
        a && a.c(), (t = _()), s && s.c(), (n = x());
      },
      m(e, r) {
        a && a.m(e, r), v(e, t, r), s && s.m(e, r), v(e, n, r), (i = !0);
      },
      p(e, i) {
        "filled" === e[15]
          ? a || ((a = ca()), a.c(), a.m(t.parentNode, t))
          : a && (a.d(1), (a = null)),
          e[16] || (null == e[17] && !e[42].label)
            ? s &&
              (ae(),
              oe(s, 1, 1, () => {
                s = null;
              }),
              se())
            : s
            ? (s.p(e, i), (196608 & i[0]) | (2048 & i[1]) && re(s, 1))
            : ((s = ua(e)), s.c(), re(s, 1), s.m(n.parentNode, n));
      },
      i(e) {
        i || (re(s), (i = !0));
      },
      o(e) {
        oe(s), (i = !1);
      },
      d(e) {
        a && a.d(e), e && b(t), s && s.d(e), e && b(n);
      },
    };
  }
  function ca(e) {
    let t;
    return {
      c() {
        (t = E("span")), T(t, "class", "mdc-text-field__ripple");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function ua(e) {
    let n, i;
    const a = [
      { floatAbove: e[28] || (null != e[0] && "" !== e[0]) },
      { required: e[13] },
      { wrapped: !0 },
      et(e[41], "label$"),
    ];
    let s = { $$slots: { default: [da] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) s = t(s, a[e]);
    return (
      (n = new hi({ props: s })),
      e[52](n),
      {
        c() {
          fe(n.$$.fragment);
        },
        m(e, t) {
          me(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (268443649 & t[0]) | (1024 & t[1])
              ? ue(a, [
                  268435457 & t[0] && {
                    floatAbove: e[28] || (null != e[0] && "" !== e[0]),
                  },
                  8192 & t[0] && { required: e[13] },
                  a[2],
                  1024 & t[1] && de(et(e[41], "label$")),
                ])
              : {};
          (131072 & t[0]) | (268435456 & t[2]) &&
            (i.$$scope = { dirty: t, ctx: e }),
            n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[52](null), he(n, t);
        },
      }
    );
  }
  function da(e) {
    let t,
      n,
      i = (null == e[17] ? "" : e[17]) + "";
    const a = e[51].label,
      s = l(a, e, e[90], ia);
    return {
      c() {
        (t = C(i)), s && s.c();
      },
      m(e, i) {
        v(e, t, i), s && s.m(e, i), (n = !0);
      },
      p(e, r) {
        (!n || 131072 & r[0]) &&
          i !== (i = (null == e[17] ? "" : e[17]) + "") &&
          L(t, i),
          s &&
            s.p &&
            (!n || 268435456 & r[2]) &&
            d(s, a, e, e[90], n ? u(a, e[90], r, na) : p(e[90]), ia);
      },
      i(e) {
        n || (re(s, e), (n = !0));
      },
      o(e) {
        oe(s, e), (n = !1);
      },
      d(e) {
        e && b(t), s && s.d(e);
      },
    };
  }
  function pa(e) {
    let n, i;
    const a = [
      { noLabel: e[16] || (null == e[17] && !e[42].label) },
      et(e[41], "outline$"),
    ];
    let s = { $$slots: { default: [ha] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) s = t(s, a[e]);
    return (
      (n = new Ci({ props: s })),
      e[54](n),
      {
        c() {
          fe(n.$$.fragment);
        },
        m(e, t) {
          me(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (196608 & t[0]) | (3072 & t[1])
              ? ue(a, [
                  (196608 & t[0]) | (2048 & t[1]) && {
                    noLabel: e[16] || (null == e[17] && !e[42].label),
                  },
                  1024 & t[1] && de(et(e[41], "outline$")),
                ])
              : {};
          (268640289 & t[0]) | (3072 & t[1]) | (268435456 & t[2]) &&
            (i.$$scope = { dirty: t, ctx: e }),
            n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[54](null), he(n, t);
        },
      }
    );
  }
  function fa(e) {
    let n, i;
    const a = [
      { floatAbove: e[28] || (null != e[0] && "" !== e[0]) },
      { required: e[13] },
      { wrapped: !0 },
      et(e[41], "label$"),
    ];
    let s = { $$slots: { default: [ma] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) s = t(s, a[e]);
    return (
      (n = new hi({ props: s })),
      e[53](n),
      {
        c() {
          fe(n.$$.fragment);
        },
        m(e, t) {
          me(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (268443649 & t[0]) | (1024 & t[1])
              ? ue(a, [
                  268435457 & t[0] && {
                    floatAbove: e[28] || (null != e[0] && "" !== e[0]),
                  },
                  8192 & t[0] && { required: e[13] },
                  a[2],
                  1024 & t[1] && de(et(e[41], "label$")),
                ])
              : {};
          (131072 & t[0]) | (268435456 & t[2]) &&
            (i.$$scope = { dirty: t, ctx: e }),
            n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[53](null), he(n, t);
        },
      }
    );
  }
  function ma(e) {
    let t,
      n,
      i = (null == e[17] ? "" : e[17]) + "";
    const a = e[51].label,
      s = l(a, e, e[90], ta);
    return {
      c() {
        (t = C(i)), s && s.c();
      },
      m(e, i) {
        v(e, t, i), s && s.m(e, i), (n = !0);
      },
      p(e, r) {
        (!n || 131072 & r[0]) &&
          i !== (i = (null == e[17] ? "" : e[17]) + "") &&
          L(t, i),
          s &&
            s.p &&
            (!n || 268435456 & r[2]) &&
            d(s, a, e, e[90], n ? u(a, e[90], r, ea) : p(e[90]), ta);
      },
      i(e) {
        n || (re(s, e), (n = !0));
      },
      o(e) {
        oe(s, e), (n = !1);
      },
      d(e) {
        e && b(t), s && s.d(e);
      },
    };
  }
  function ha(e) {
    let t,
      n,
      i = !e[16] && (null != e[17] || e[42].label) && fa(e);
    return {
      c() {
        i && i.c(), (t = x());
      },
      m(e, a) {
        i && i.m(e, a), v(e, t, a), (n = !0);
      },
      p(e, n) {
        e[16] || (null == e[17] && !e[42].label)
          ? i &&
            (ae(),
            oe(i, 1, 1, () => {
              i = null;
            }),
            se())
          : i
          ? (i.p(e, n), (196608 & n[0]) | (2048 & n[1]) && re(i, 1))
          : ((i = fa(e)), i.c(), re(i, 1), i.m(t.parentNode, t));
      },
      i(e) {
        n || (re(i), (n = !0));
      },
      o(e) {
        oe(i), (n = !1);
      },
      d(e) {
        i && i.d(e), e && b(t);
      },
    };
  }
  function ga(e) {
    let t;
    const n = e[51].leadingIcon,
      i = l(n, e, e[90], Zi);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 268435456 & a[2]) &&
          d(i, n, e, e[90], t ? u(n, e[90], a, Ji) : p(e[90]), Zi);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function $a(e) {
    let n, i, a, s, r, o, c, f, m, h;
    const g = e[51].prefix,
      $ = l(g, e, e[90], Xi);
    let I = null != e[20] && va(e);
    const y = [
      { type: e[18] },
      { disabled: e[12] },
      { required: e[13] },
      { updateInvalid: e[19] },
      { "aria-controls": e[27] },
      { "aria-describedby": e[27] },
      e[16] && null != e[17] ? { placeholder: e[17] } : {},
      et(e[41], "input$"),
    ];
    function E(t) {
      e[64](t);
    }
    function A(t) {
      e[65](t);
    }
    function C(t) {
      e[66](t);
    }
    function x(t) {
      e[67](t);
    }
    let S = {};
    for (let e = 0; e < y.length; e += 1) S = t(S, y[e]);
    void 0 !== e[0] && (S.value = e[0]),
      void 0 !== e[3] && (S.files = e[3]),
      void 0 !== e[4] && (S.dirty = e[4]),
      void 0 !== e[1] && (S.invalid = e[1]),
      (a = new Li({ props: S })),
      e[63](a),
      z.push(() => pe(a, "value", E)),
      z.push(() => pe(a, "files", A)),
      z.push(() => pe(a, "dirty", C)),
      z.push(() => pe(a, "invalid", x)),
      a.$on("blur", e[68]),
      a.$on("focus", e[69]),
      a.$on("blur", e[70]),
      a.$on("focus", e[71]);
    let T = null != e[21] && ya(e);
    const O = e[51].suffix,
      L = l(O, e, e[90], Ki);
    return {
      c() {
        $ && $.c(),
          (n = _()),
          I && I.c(),
          (i = _()),
          fe(a.$$.fragment),
          (f = _()),
          T && T.c(),
          (m = _()),
          L && L.c();
      },
      m(e, t) {
        $ && $.m(e, t),
          v(e, n, t),
          I && I.m(e, t),
          v(e, i, t),
          me(a, e, t),
          v(e, f, t),
          T && T.m(e, t),
          v(e, m, t),
          L && L.m(e, t),
          (h = !0);
      },
      p(e, t) {
        $ &&
          $.p &&
          (!h || 268435456 & t[2]) &&
          d($, g, e, e[90], h ? u(g, e[90], t, Wi) : p(e[90]), Xi),
          null != e[20]
            ? I
              ? (I.p(e, t), 1048576 & t[0] && re(I, 1))
              : ((I = va(e)), I.c(), re(I, 1), I.m(i.parentNode, i))
            : I &&
              (ae(),
              oe(I, 1, 1, () => {
                I = null;
              }),
              se());
        const n =
          (135213056 & t[0]) | (1024 & t[1])
            ? ue(y, [
                262144 & t[0] && { type: e[18] },
                4096 & t[0] && { disabled: e[12] },
                8192 & t[0] && { required: e[13] },
                524288 & t[0] && { updateInvalid: e[19] },
                134217728 & t[0] && { "aria-controls": e[27] },
                134217728 & t[0] && { "aria-describedby": e[27] },
                196608 & t[0] &&
                  de(e[16] && null != e[17] ? { placeholder: e[17] } : {}),
                1024 & t[1] && de(et(e[41], "input$")),
              ])
            : {};
        !s && 1 & t[0] && ((s = !0), (n.value = e[0]), Q(() => (s = !1))),
          !r && 8 & t[0] && ((r = !0), (n.files = e[3]), Q(() => (r = !1))),
          !o && 16 & t[0] && ((o = !0), (n.dirty = e[4]), Q(() => (o = !1))),
          !c && 2 & t[0] && ((c = !0), (n.invalid = e[1]), Q(() => (c = !1))),
          a.$set(n),
          null != e[21]
            ? T
              ? (T.p(e, t), 2097152 & t[0] && re(T, 1))
              : ((T = ya(e)), T.c(), re(T, 1), T.m(m.parentNode, m))
            : T &&
              (ae(),
              oe(T, 1, 1, () => {
                T = null;
              }),
              se()),
          L &&
            L.p &&
            (!h || 268435456 & t[2]) &&
            d(L, O, e, e[90], h ? u(O, e[90], t, qi) : p(e[90]), Ki);
      },
      i(e) {
        h || (re($, e), re(I), re(a.$$.fragment, e), re(T), re(L, e), (h = !0));
      },
      o(e) {
        oe($, e), oe(I), oe(a.$$.fragment, e), oe(T), oe(L, e), (h = !1);
      },
      d(t) {
        $ && $.d(t),
          t && b(n),
          I && I.d(t),
          t && b(i),
          e[63](null),
          he(a, t),
          t && b(f),
          T && T.d(t),
          t && b(m),
          L && L.d(t);
      },
    };
  }
  function Ia(e) {
    let n, i, a, s, r, o, c, f;
    const m = [
      { disabled: e[12] },
      { required: e[13] },
      { updateInvalid: e[19] },
      { "aria-controls": e[27] },
      { "aria-describedby": e[27] },
      et(e[41], "input$"),
    ];
    function h(t) {
      e[56](t);
    }
    function g(t) {
      e[57](t);
    }
    function $(t) {
      e[58](t);
    }
    let y = {};
    for (let e = 0; e < m.length; e += 1) y = t(y, m[e]);
    void 0 !== e[0] && (y.value = e[0]),
      void 0 !== e[4] && (y.dirty = e[4]),
      void 0 !== e[1] && (y.invalid = e[1]),
      (i = new Ni({ props: y })),
      e[55](i),
      z.push(() => pe(i, "value", h)),
      z.push(() => pe(i, "dirty", g)),
      z.push(() => pe(i, "invalid", $)),
      i.$on("blur", e[59]),
      i.$on("focus", e[60]),
      i.$on("blur", e[61]),
      i.$on("focus", e[62]);
    const A = e[51].internalCounter,
      C = l(A, e, e[90], Qi);
    return {
      c() {
        (n = E("span")),
          fe(i.$$.fragment),
          (o = _()),
          C && C.c(),
          T(
            n,
            "class",
            (c = We({
              "mdc-text-field__resizer":
                !("input$resizable" in e[41]) || e[41].input$resizable,
            }))
          );
      },
      m(e, t) {
        v(e, n, t), me(i, n, null), I(n, o), C && C.m(n, null), (f = !0);
      },
      p(e, t) {
        const o =
          (134754304 & t[0]) | (1024 & t[1])
            ? ue(m, [
                4096 & t[0] && { disabled: e[12] },
                8192 & t[0] && { required: e[13] },
                524288 & t[0] && { updateInvalid: e[19] },
                134217728 & t[0] && { "aria-controls": e[27] },
                134217728 & t[0] && { "aria-describedby": e[27] },
                1024 & t[1] && de(et(e[41], "input$")),
              ])
            : {};
        !a && 1 & t[0] && ((a = !0), (o.value = e[0]), Q(() => (a = !1))),
          !s && 16 & t[0] && ((s = !0), (o.dirty = e[4]), Q(() => (s = !1))),
          !r && 2 & t[0] && ((r = !0), (o.invalid = e[1]), Q(() => (r = !1))),
          i.$set(o),
          C &&
            C.p &&
            (!f || 268435456 & t[2]) &&
            d(C, A, e, e[90], f ? u(A, e[90], t, Yi) : p(e[90]), Qi),
          (!f ||
            (1024 & t[1] &&
              c !==
                (c = We({
                  "mdc-text-field__resizer":
                    !("input$resizable" in e[41]) || e[41].input$resizable,
                })))) &&
            T(n, "class", c);
      },
      i(e) {
        f || (re(i.$$.fragment, e), re(C, e), (f = !0));
      },
      o(e) {
        oe(i.$$.fragment, e), oe(C, e), (f = !1);
      },
      d(t) {
        t && b(n), e[55](null), he(i), C && C.d(t);
      },
    };
  }
  function va(e) {
    let t, n;
    return (
      (t = new xi({
        props: { $$slots: { default: [ba] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (1048576 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function ba(e) {
    let t;
    return {
      c() {
        t = C(e[20]);
      },
      m(e, n) {
        v(e, t, n);
      },
      p(e, n) {
        1048576 & n[0] && L(t, e[20]);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function ya(e) {
    let t, n;
    return (
      (t = new Si({
        props: { $$slots: { default: [Ea] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (2097152 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function Ea(e) {
    let t;
    return {
      c() {
        t = C(e[21]);
      },
      m(e, n) {
        v(e, t, n);
      },
      p(e, n) {
        2097152 & n[0] && L(t, e[21]);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Aa(e) {
    let t;
    const n = e[51].trailingIcon,
      i = l(n, e, e[90], Gi);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 268435456 & a[2]) &&
          d(i, n, e, e[90], t ? u(n, e[90], a, zi) : p(e[90]), Gi);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Ca(e) {
    let n, i;
    const a = [et(e[41], "ripple$")];
    let s = {};
    for (let e = 0; e < a.length; e += 1) s = t(s, a[e]);
    return (
      (n = new vi({ props: s })),
      e[72](n),
      {
        c() {
          fe(n.$$.fragment);
        },
        m(e, t) {
          me(n, e, t), (i = !0);
        },
        p(e, t) {
          const i = 1024 & t[1] ? ue(a, [de(et(e[41], "ripple$"))]) : {};
          n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[72](null), he(n, t);
        },
      }
    );
  }
  function _a(e) {
    let n, i;
    const a = [et(e[41], "helperLine$")];
    let s = { $$slots: { default: [xa] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) s = t(s, a[e]);
    return (
      (n = new _i({ props: s })),
      n.$on("SMUITextfieldHelperText:id", e[85]),
      n.$on("SMUITextfieldHelperText:mount", e[86]),
      n.$on("SMUITextfieldHelperText:unmount", e[87]),
      n.$on("SMUITextfieldCharacterCounter:mount", e[88]),
      n.$on("SMUITextfieldCharacterCounter:unmount", e[89]),
      {
        c() {
          fe(n.$$.fragment);
        },
        m(e, t) {
          me(n, e, t), (i = !0);
        },
        p(e, t) {
          const i = 1024 & t[1] ? ue(a, [de(et(e[41], "helperLine$"))]) : {};
          268435456 & t[2] && (i.$$scope = { dirty: t, ctx: e }), n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(e) {
          he(n, e);
        },
      }
    );
  }
  function xa(e) {
    let t;
    const n = e[51].helper,
      i = l(n, e, e[90], Ri);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 268435456 & a[2]) &&
          d(i, n, e, e[90], t ? u(n, e[90], a, Mi) : p(e[90]), Ri);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Sa(e) {
    let t, n, i, a, s;
    const r = [sa, aa],
      o = [];
    (t = (function (e, t) {
      return e[36] ? 0 : 1;
    })(e)),
      (n = o[t] = r[t](e));
    let l = e[42].helper && _a(e);
    return {
      c() {
        n.c(), (i = _()), l && l.c(), (a = x());
      },
      m(e, n) {
        o[t].m(e, n), v(e, i, n), l && l.m(e, n), v(e, a, n), (s = !0);
      },
      p(e, t) {
        n.p(e, t),
          e[42].helper
            ? l
              ? (l.p(e, t), 2048 & t[1] && re(l, 1))
              : ((l = _a(e)), l.c(), re(l, 1), l.m(a.parentNode, a))
            : l &&
              (ae(),
              oe(l, 1, 1, () => {
                l = null;
              }),
              se());
      },
      i(e) {
        s || (re(n), re(l), (s = !0));
      },
      o(e) {
        oe(n), oe(l), (s = !1);
      },
      d(e) {
        o[t].d(e), e && b(i), l && l.d(e), e && b(a);
      },
    };
  }
  const Ta = ([e, t]) => `${e}: ${t};`,
    Oa = ([e, t]) => `${e}: ${t};`;
  function La(e, n, i) {
    let a;
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
    let r = m(n, s),
      { $$slots: o = {}, $$scope: l } = n;
    const c = h(o),
      { applyPassive: u } = Te,
      d = Ze(F());
    let p = () => {};
    function g(e) {
      return e === p;
    }
    let { use: $ = [] } = n,
      { class: I = "" } = n,
      { style: v = "" } = n,
      { ripple: b = !0 } = n,
      { disabled: y = !1 } = n,
      { required: E = !1 } = n,
      { textarea: A = !1 } = n,
      { variant: C = A ? "outlined" : "standard" } = n,
      { noLabel: _ = !1 } = n,
      { label: x } = n,
      { type: S = "text" } = n,
      { value: T = r.input$emptyValueUndefined ? void 0 : p } = n,
      { files: O = p } = n;
    const L = !g(T) || !g(O);
    g(T) && (T = void 0), g(O) && (O = null);
    let { invalid: w = p } = n,
      { updateInvalid: D = g(w) } = n;
    g(w) && (w = !1);
    let N,
      M,
      R,
      P,
      H,
      V,
      j,
      G,
      q,
      { dirty: W = !1 } = n,
      { prefix: Y } = n,
      { suffix: Q } = n,
      { validateOnValueChange: J = D } = n,
      { useNativeValidation: Z = D } = n,
      { withLeadingIcon: ee = p } = n,
      { withTrailingIcon: te = p } = n,
      { input: ne } = n,
      { floatingLabel: ie } = n,
      { lineRipple: ae } = n,
      { notchedOutline: se } = n,
      re = {},
      oe = {},
      le = !1,
      ce = B("SMUI:addLayoutListener"),
      ue = new Promise((e) => (H = e)),
      de = T;
    function pe(e) {
      var t;
      return e in re
        ? null !== (t = re[e]) && void 0 !== t
          ? t
          : null
        : ge().classList.contains(e);
    }
    function fe(e) {
      re[e] || i(25, (re[e] = !0), re);
    }
    function me(e) {
      (e in re && !re[e]) || i(25, (re[e] = !1), re);
    }
    function he() {
      if (M) {
        const e = M.shouldFloat;
        M.notchOutline(e);
      }
    }
    function ge() {
      return N;
    }
    ce && (P = ce(he)),
      k(() => {
        if (
          (i(
            49,
            (M = new gn(
              {
                addClass: fe,
                removeClass: me,
                hasClass: pe,
                registerTextFieldInteractionHandler: (e, t) =>
                  ge().addEventListener(e, t),
                deregisterTextFieldInteractionHandler: (e, t) =>
                  ge().removeEventListener(e, t),
                registerValidationAttributeChangeHandler: (e) => {
                  const t = new MutationObserver((t) => {
                      Z &&
                        e(
                          ((e) =>
                            e.map((e) => e.attributeName).filter((e) => e))(t)
                        );
                    }),
                    n = { attributes: !0 };
                  return ne && t.observe(ne.getElement(), n), t;
                },
                deregisterValidationAttributeChangeHandler: (e) => {
                  e.disconnect();
                },
                getNativeInput: () => {
                  var e;
                  return null !== (e = null == ne ? void 0 : ne.getElement()) &&
                    void 0 !== e
                    ? e
                    : null;
                },
                setInputAttr: (e, t) => {
                  null == ne || ne.addAttr(e, t);
                },
                removeInputAttr: (e) => {
                  null == ne || ne.removeAttr(e);
                },
                isFocused: () =>
                  document.activeElement ===
                  (null == ne ? void 0 : ne.getElement()),
                registerInputInteractionHandler: (e, t) => {
                  null == ne || ne.getElement().addEventListener(e, t, u());
                },
                deregisterInputInteractionHandler: (e, t) => {
                  null == ne || ne.getElement().removeEventListener(e, t, u());
                },
                floatLabel: (e) => ie && ie.float(e),
                getLabelWidth: () => (ie ? ie.getWidth() : 0),
                hasLabel: () => !!ie,
                shakeLabel: (e) => ie && ie.shake(e),
                setLabelRequired: (e) => ie && ie.setRequired(e),
                activateLineRipple: () => ae && ae.activate(),
                deactivateLineRipple: () => ae && ae.deactivate(),
                setLineRippleTransformOrigin: (e) =>
                  ae && ae.setRippleCenter(e),
                closeOutline: () => se && se.closeNotch(),
                hasOutline: () => !!se,
                notchOutline: (e) => se && se.notch(e),
              },
              {
                get helperText() {
                  return G;
                },
                get characterCounter() {
                  return q;
                },
                get leadingIcon() {
                  return V;
                },
                get trailingIcon() {
                  return j;
                },
              }
            ))
          ),
          L)
        ) {
          if (null == ne)
            throw new Error(
              "SMUI Textfield initialized without Input component."
            );
          M.init();
        } else
          (X(), K).then(() => {
            if (null == ne)
              throw new Error(
                "SMUI Textfield initialized without Input component."
              );
            M.init();
          });
        return (
          H(),
          () => {
            M.destroy();
          }
        );
      }),
      U(() => {
        P && P();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(41, (r = m(n, s))),
          "use" in e && i(8, ($ = e.use)),
          "class" in e && i(9, (I = e.class)),
          "style" in e && i(10, (v = e.style)),
          "ripple" in e && i(11, (b = e.ripple)),
          "disabled" in e && i(12, (y = e.disabled)),
          "required" in e && i(13, (E = e.required)),
          "textarea" in e && i(14, (A = e.textarea)),
          "variant" in e && i(15, (C = e.variant)),
          "noLabel" in e && i(16, (_ = e.noLabel)),
          "label" in e && i(17, (x = e.label)),
          "type" in e && i(18, (S = e.type)),
          "value" in e && i(0, (T = e.value)),
          "files" in e && i(3, (O = e.files)),
          "invalid" in e && i(1, (w = e.invalid)),
          "updateInvalid" in e && i(19, (D = e.updateInvalid)),
          "dirty" in e && i(4, (W = e.dirty)),
          "prefix" in e && i(20, (Y = e.prefix)),
          "suffix" in e && i(21, (Q = e.suffix)),
          "validateOnValueChange" in e && i(43, (J = e.validateOnValueChange)),
          "useNativeValidation" in e && i(44, (Z = e.useNativeValidation)),
          "withLeadingIcon" in e && i(22, (ee = e.withLeadingIcon)),
          "withTrailingIcon" in e && i(23, (te = e.withTrailingIcon)),
          "input" in e && i(2, (ne = e.input)),
          "floatingLabel" in e && i(5, (ie = e.floatingLabel)),
          "lineRipple" in e && i(6, (ae = e.lineRipple)),
          "notchedOutline" in e && i(7, (se = e.notchedOutline)),
          "$$scope" in e && i(90, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        if (
          (4 & e.$$.dirty[0] && i(33, (a = ne && ne.getElement())),
          (524290 & e.$$.dirty[0]) | (262144 & e.$$.dirty[1]) &&
            M &&
            M.isValid() !== !w &&
            (D ? i(1, (w = !M.isValid())) : M.setValid(!w)),
          266240 & e.$$.dirty[1] &&
            M &&
            M.getValidateOnValueChange() !== J &&
            M.setValidateOnValueChange(!g(J) && J),
          270336 & e.$$.dirty[1] && M && M.setUseNativeValidation(!!g(Z) || Z),
          (4096 & e.$$.dirty[0]) | (262144 & e.$$.dirty[1]) &&
            M &&
            M.setDisabled(y),
          (1 & e.$$.dirty[0]) | (786432 & e.$$.dirty[1]) && M && L && de !== T)
        ) {
          i(50, (de = T));
          const e = `${T}`;
          M.getValue() !== e && M.setValue(e);
        }
      }),
      [
        T,
        w,
        ne,
        O,
        W,
        ie,
        ae,
        se,
        $,
        I,
        v,
        b,
        y,
        E,
        A,
        C,
        _,
        x,
        S,
        D,
        Y,
        Q,
        ee,
        te,
        N,
        re,
        oe,
        R,
        le,
        V,
        j,
        G,
        q,
        a,
        d,
        g,
        L,
        ue,
        fe,
        me,
        function (e, t) {
          oe[e] != t &&
            ("" === t || null == t
              ? (delete oe[e], i(26, oe))
              : i(26, (oe[e] = t), oe));
        },
        r,
        c,
        J,
        Z,
        function () {
          null == ne || ne.focus();
        },
        function () {
          null == ne || ne.blur();
        },
        he,
        ge,
        M,
        de,
        o,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (ie = e), i(5, ie);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (ie = e), i(5, ie);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (se = e), i(7, se);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (ne = e), i(2, ne);
          });
        },
        function (e) {
          (T = e), i(0, T);
        },
        function (e) {
          (W = e), i(4, W);
        },
        function (e) {
          (w = e), i(1, w), i(49, M), i(19, D);
        },
        () => i(28, (le = !1)),
        () => i(28, (le = !0)),
        (e) => Xe(N, "blur", e),
        (e) => Xe(N, "focus", e),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (ne = e), i(2, ne);
          });
        },
        function (e) {
          (T = e), i(0, T);
        },
        function (e) {
          (O = e), i(3, O);
        },
        function (e) {
          (W = e), i(4, W);
        },
        function (e) {
          (w = e), i(1, w), i(49, M), i(19, D);
        },
        () => i(28, (le = !1)),
        () => i(28, (le = !0)),
        (e) => Xe(N, "blur", e),
        (e) => Xe(N, "focus", e),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (ae = e), i(6, ae);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (N = e), i(24, N);
          });
        },
        (e) => i(29, (V = e.detail)),
        () => i(29, (V = void 0)),
        (e) => i(30, (j = e.detail)),
        () => i(30, (j = void 0)),
        (e) => i(32, (q = e.detail)),
        () => i(32, (q = void 0)),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (N = e), i(24, N);
          });
        },
        (e) => i(29, (V = e.detail)),
        () => i(29, (V = void 0)),
        (e) => i(30, (j = e.detail)),
        () => i(30, (j = void 0)),
        (e) => i(27, (R = e.detail)),
        (e) => i(31, (G = e.detail)),
        () => {
          i(27, (R = void 0)), i(31, (G = void 0));
        },
        (e) => i(32, (q = e.detail)),
        () => i(32, (q = void 0)),
        l,
      ]
    );
  }
  class wa extends $e {
    constructor(e) {
      super(),
        ge(
          this,
          e,
          La,
          Sa,
          r,
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
   */ var Da = {
      ICON_BUTTON_ON: "mdc-icon-button--on",
      ROOT: "mdc-icon-button",
    },
    Na = {
      ARIA_LABEL: "aria-label",
      ARIA_PRESSED: "aria-pressed",
      DATA_ARIA_LABEL_OFF: "data-aria-label-off",
      DATA_ARIA_LABEL_ON: "data-aria-label-on",
      CHANGE_EVENT: "MDCIconButtonToggle:change",
    },
    Ma = (function (e) {
      function t(n) {
        var i = e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
        return (i.hasToggledAriaLabel = !1), i;
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Da;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Na;
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
          var e = this.adapter.getAttr(Na.DATA_ARIA_LABEL_ON),
            t = this.adapter.getAttr(Na.DATA_ARIA_LABEL_OFF);
          if (e && t) {
            if (null !== this.adapter.getAttr(Na.ARIA_PRESSED))
              throw new Error(
                "MDCIconButtonToggleFoundation: Button should not set `aria-pressed` if it has a toggled aria label."
              );
            this.hasToggledAriaLabel = !0;
          } else this.adapter.setAttr(Na.ARIA_PRESSED, String(this.isOn()));
        }),
        (t.prototype.handleClick = function () {
          this.toggle(), this.adapter.notifyChange({ isOn: this.isOn() });
        }),
        (t.prototype.isOn = function () {
          return this.adapter.hasClass(Da.ICON_BUTTON_ON);
        }),
        (t.prototype.toggle = function (e) {
          if (
            (void 0 === e && (e = !this.isOn()),
            e
              ? this.adapter.addClass(Da.ICON_BUTTON_ON)
              : this.adapter.removeClass(Da.ICON_BUTTON_ON),
            this.hasToggledAriaLabel)
          ) {
            var t = e
              ? this.adapter.getAttr(Na.DATA_ARIA_LABEL_ON)
              : this.adapter.getAttr(Na.DATA_ARIA_LABEL_OFF);
            this.adapter.setAttr(Na.ARIA_LABEL, t || "");
          } else this.adapter.setAttr(Na.ARIA_PRESSED, "" + e);
        }),
        t
      );
    })(Se);
  function Ra(e) {
    let t;
    return {
      c() {
        (t = E("div")), T(t, "class", "mdc-icon-button__touch");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Fa(e) {
    let t, n, i, a;
    const s = e[32].default,
      r = l(s, e, e[36], null);
    let o = e[8] && Ra();
    return {
      c() {
        (t = E("div")),
          (n = _()),
          r && r.c(),
          o && o.c(),
          (i = x()),
          T(t, "class", "mdc-icon-button__ripple");
      },
      m(e, s) {
        v(e, t, s),
          v(e, n, s),
          r && r.m(e, s),
          o && o.m(e, s),
          v(e, i, s),
          (a = !0);
      },
      p(e, t) {
        r &&
          r.p &&
          (!a || 32 & t[1]) &&
          d(r, s, e, e[36], a ? u(s, e[36], t, null) : p(e[36]), null),
          e[8]
            ? o || ((o = Ra()), o.c(), o.m(i.parentNode, i))
            : o && (o.d(1), (o = null));
      },
      i(e) {
        a || (re(r, e), (a = !0));
      },
      o(e) {
        oe(r, e), (a = !1);
      },
      d(e) {
        e && b(t), e && b(n), r && r.d(e), o && o.d(e), e && b(i);
      },
    };
  }
  function ka(e) {
    let n, i, a;
    const s = [
      {
        use: [
          [
            li,
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
        class: We({
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
      { style: Object.entries(e[18]).map(Ua).concat([e[3]]).join(" ") },
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
    var r = e[13];
    function o(e) {
      let n = { $$slots: { default: [Fa] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) n = t(n, s[e]);
      return { props: n };
    }
    return (
      r &&
        ((n = new r(o(e))),
        e[33](n),
        n.$on("click", e[34]),
        n.$on("click", e[35])),
      {
        c() {
          n && fe(n.$$.fragment), (i = x());
        },
        m(e, t) {
          n && me(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, t) {
          const a =
            536748031 & t[0]
              ? ue(s, [
                  505413682 & t[0] && {
                    use: [
                      [
                        li,
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
                  12719877 & t[0] && {
                    class: We({
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
                  262152 & t[0] && {
                    style: Object.entries(e[18])
                      .map(Ua)
                      .concat([e[3]])
                      .join(" "),
                  },
                  4194305 & t[0] && {
                    "aria-pressed": e[22](e[0])
                      ? null
                      : e[0]
                      ? "true"
                      : "false",
                  },
                  193 & t[0] && { "aria-label": e[0] ? e[6] : e[7] },
                  64 & t[0] && { "data-aria-label-on": e[6] },
                  128 & t[0] && { "data-aria-label-off": e[7] },
                  16777216 & t[0] && { "aria-describedby": e[24] },
                  2048 & t[0] && { href: e[11] },
                  1048576 & t[0] && de(e[20]),
                  524288 & t[0] && de(e[19]),
                  268435456 & t[0] && de(e[28]),
                ])
              : {};
          if (
            ((256 & t[0]) | (32 & t[1]) && (a.$$scope = { dirty: t, ctx: e }),
            r !== (r = e[13]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                he(e, 1);
              }),
                se();
            }
            r
              ? ((n = new r(o(e))),
                e[33](n),
                n.$on("click", e[34]),
                n.$on("click", e[35]),
                fe(n.$$.fragment),
                re(n.$$.fragment, 1),
                me(n, i.parentNode, i))
              : (n = null);
          } else r && n.$set(a);
        },
        i(e) {
          a || (n && re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[33](null), t && b(i), n && he(n, t);
        },
      }
    );
  }
  const Ua = ([e, t]) => `${e}: ${t};`;
  function Pa(e, n, i) {
    let a;
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
    let r = m(n, s),
      { $$slots: o = {}, $$scope: l } = n;
    const c = Ze(F());
    let u = () => {};
    function d(e) {
      return e === u;
    }
    let p,
      h,
      { use: g = [] } = n,
      { class: $ = "" } = n,
      { style: I = "" } = n,
      { ripple: v = !0 } = n,
      { color: b } = n,
      { toggle: y = !1 } = n,
      { pressed: E = u } = n,
      { ariaLabelOn: A } = n,
      { ariaLabelOff: C } = n,
      { touch: _ = !1 } = n,
      { displayFlex: x = !0 } = n,
      { size: S = "normal" } = n,
      { href: T } = n,
      { action: O } = n,
      L = {},
      w = {},
      D = {},
      N = B("SMUI:icon-button:context"),
      M = B("SMUI:icon-button:aria-describedby"),
      { component: R = null == T ? kt : Ft } = n,
      k = r.disabled;
    H("SMUI:icon:context", "icon-button");
    let P = null;
    function V(e) {
      return e in L ? L[e] : W().classList.contains(e);
    }
    function j(e) {
      L[e] || i(17, (L[e] = !0), L);
    }
    function G(e) {
      (e in L && !L[e]) || i(17, (L[e] = !1), L);
    }
    function q(e) {
      var t;
      return e in D
        ? null !== (t = D[e]) && void 0 !== t
          ? t
          : null
        : W().getAttribute(e);
    }
    function K(e, t) {
      D[e] !== t && i(19, (D[e] = t), D);
    }
    function W() {
      return p.getElement();
    }
    U(() => {
      h && h.destroy();
    });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(28, (r = m(n, s))),
          "use" in e && i(1, (g = e.use)),
          "class" in e && i(2, ($ = e.class)),
          "style" in e && i(3, (I = e.style)),
          "ripple" in e && i(4, (v = e.ripple)),
          "color" in e && i(5, (b = e.color)),
          "toggle" in e && i(29, (y = e.toggle)),
          "pressed" in e && i(0, (E = e.pressed)),
          "ariaLabelOn" in e && i(6, (A = e.ariaLabelOn)),
          "ariaLabelOff" in e && i(7, (C = e.ariaLabelOff)),
          "touch" in e && i(8, (_ = e.touch)),
          "displayFlex" in e && i(9, (x = e.displayFlex)),
          "size" in e && i(10, (S = e.size)),
          "href" in e && i(11, (T = e.href)),
          "action" in e && i(12, (O = e.action)),
          "component" in e && i(13, (R = e.component)),
          "$$scope" in e && i(36, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        if (
          (4096 & e.$$.dirty[0] &&
            i(
              20,
              (a = (() => {
                if ("data-table:pagination" !== N)
                  return "dialog:header" === N
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
          k !== r.disabled)
        ) {
          const e = W();
          "blur" in e && e.blur(), i(30, (k = r.disabled));
        }
        (536969216 & e.$$.dirty[0]) | (1 & e.$$.dirty[1]) &&
          p &&
          W() &&
          y !== P &&
          (y && !h
            ? (i(
                16,
                (h = new Ma({
                  addClass: j,
                  hasClass: V,
                  notifyChange: (e) => {
                    !(function (e) {
                      i(0, (E = e.isOn));
                    })(e),
                      Xe(W(), "SMUIIconButtonToggle:change", e, void 0, !0);
                  },
                  removeClass: G,
                  getAttr: q,
                  setAttr: K,
                }))
              ),
              h.init())
            : !y &&
              h &&
              (h.destroy(),
              i(16, (h = void 0)),
              i(17, (L = {})),
              i(19, (D = {}))),
          i(31, (P = y))),
          65537 & e.$$.dirty[0] && h && !d(E) && h.isOn() !== E && h.toggle(E);
      }),
      [
        E,
        g,
        $,
        I,
        v,
        b,
        A,
        C,
        _,
        x,
        S,
        T,
        O,
        R,
        W,
        p,
        h,
        L,
        w,
        D,
        a,
        c,
        d,
        N,
        M,
        j,
        G,
        function (e, t) {
          w[e] != t &&
            ("" === t || null == t
              ? (delete w[e], i(18, w))
              : i(18, (w[e] = t), w));
        },
        r,
        y,
        k,
        P,
        o,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (p = e), i(15, p);
          });
        },
        () => h && h.handleClick(),
        () =>
          "top-app-bar:navigation" === N &&
          Xe(W(), "SMUITopAppBarIconButton:nav"),
        l,
      ]
    );
  }
  class Ha extends $e {
    constructor(e) {
      super(),
        ge(
          this,
          e,
          Pa,
          ka,
          r,
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
   */ var Ba,
    Va,
    ja = {
      LIST_ITEM_ACTIVATED_CLASS: "mdc-list-item--activated",
      LIST_ITEM_CLASS: "mdc-list-item",
      LIST_ITEM_DISABLED_CLASS: "mdc-list-item--disabled",
      LIST_ITEM_SELECTED_CLASS: "mdc-list-item--selected",
      LIST_ITEM_TEXT_CLASS: "mdc-list-item__text",
      LIST_ITEM_PRIMARY_TEXT_CLASS: "mdc-list-item__primary-text",
      ROOT: "mdc-list",
    };
  ((Ba = {})["" + ja.LIST_ITEM_ACTIVATED_CLASS] = "mdc-list-item--activated"),
    (Ba["" + ja.LIST_ITEM_CLASS] = "mdc-list-item"),
    (Ba["" + ja.LIST_ITEM_DISABLED_CLASS] = "mdc-list-item--disabled"),
    (Ba["" + ja.LIST_ITEM_SELECTED_CLASS] = "mdc-list-item--selected"),
    (Ba["" + ja.LIST_ITEM_PRIMARY_TEXT_CLASS] = "mdc-list-item__primary-text"),
    (Ba["" + ja.ROOT] = "mdc-list");
  var za =
      (((Va = {})["" + ja.LIST_ITEM_ACTIVATED_CLASS] =
        "mdc-deprecated-list-item--activated"),
      (Va["" + ja.LIST_ITEM_CLASS] = "mdc-deprecated-list-item"),
      (Va["" + ja.LIST_ITEM_DISABLED_CLASS] =
        "mdc-deprecated-list-item--disabled"),
      (Va["" + ja.LIST_ITEM_SELECTED_CLASS] =
        "mdc-deprecated-list-item--selected"),
      (Va["" + ja.LIST_ITEM_TEXT_CLASS] = "mdc-deprecated-list-item__text"),
      (Va["" + ja.LIST_ITEM_PRIMARY_TEXT_CLASS] =
        "mdc-deprecated-list-item__primary-text"),
      (Va["" + ja.ROOT] = "mdc-deprecated-list"),
      Va),
    Ga = {
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
        ja.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        ja.LIST_ITEM_CLASS +
        " a,\n    ." +
        za[ja.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        za[ja.LIST_ITEM_CLASS] +
        " a\n  ",
      DEPRECATED_SELECTOR: ".mdc-deprecated-list",
      FOCUSABLE_CHILD_ELEMENTS:
        "\n    ." +
        ja.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        ja.LIST_ITEM_CLASS +
        " a,\n    ." +
        ja.LIST_ITEM_CLASS +
        ' input[type="radio"]:not(:disabled),\n    .' +
        ja.LIST_ITEM_CLASS +
        ' input[type="checkbox"]:not(:disabled),\n    .' +
        za[ja.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        za[ja.LIST_ITEM_CLASS] +
        " a,\n    ." +
        za[ja.LIST_ITEM_CLASS] +
        ' input[type="radio"]:not(:disabled),\n    .' +
        za[ja.LIST_ITEM_CLASS] +
        ' input[type="checkbox"]:not(:disabled)\n  ',
      RADIO_SELECTOR: 'input[type="radio"]',
      SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]',
    },
    qa = { UNSET_INDEX: -1, TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300 },
    Ka = ["input", "button", "textarea", "select"],
    Wa = function (e) {
      var t = e.target;
      if (t) {
        var n = ("" + t.tagName).toLowerCase();
        -1 === Ka.indexOf(n) && e.preventDefault();
      }
    };
  function Xa(e, t) {
    var n,
      i = e.nextChar,
      a = e.focusItemAtIndex,
      s = e.sortedIndexByFirstChar,
      r = e.focusedItemIndex,
      o = e.skipFocus,
      l = e.isItemAtIndexDisabled;
    return (
      clearTimeout(t.bufferClearTimeout),
      (t.bufferClearTimeout = setTimeout(function () {
        Qa(t);
      }, qa.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS)),
      (t.typeaheadBuffer = t.typeaheadBuffer + i),
      (n =
        1 === t.typeaheadBuffer.length
          ? (function (e, t, n, i) {
              var a = i.typeaheadBuffer[0],
                s = e.get(a);
              if (!s) return -1;
              if (
                a === i.currentFirstChar &&
                s[i.sortedIndexCursor].index === t
              ) {
                i.sortedIndexCursor = (i.sortedIndexCursor + 1) % s.length;
                var r = s[i.sortedIndexCursor].index;
                if (!n(r)) return r;
              }
              i.currentFirstChar = a;
              var o,
                l = -1;
              for (o = 0; o < s.length; o++)
                if (!n(s[o].index)) {
                  l = o;
                  break;
                }
              for (; o < s.length; o++)
                if (s[o].index > t && !n(s[o].index)) {
                  l = o;
                  break;
                }
              if (-1 !== l)
                return (i.sortedIndexCursor = l), s[i.sortedIndexCursor].index;
              return -1;
            })(s, r, l, t)
          : (function (e, t, n) {
              var i = n.typeaheadBuffer[0],
                a = e.get(i);
              if (!a) return -1;
              var s = a[n.sortedIndexCursor];
              if (0 === s.text.lastIndexOf(n.typeaheadBuffer, 0) && !t(s.index))
                return s.index;
              var r = (n.sortedIndexCursor + 1) % a.length,
                o = -1;
              for (; r !== n.sortedIndexCursor; ) {
                var l = a[r],
                  c = 0 === l.text.lastIndexOf(n.typeaheadBuffer, 0),
                  u = !t(l.index);
                if (c && u) {
                  o = r;
                  break;
                }
                r = (r + 1) % a.length;
              }
              if (-1 !== o)
                return (n.sortedIndexCursor = o), a[n.sortedIndexCursor].index;
              return -1;
            })(s, l, t)),
      -1 === n || o || a(n),
      n
    );
  }
  function Ya(e) {
    return e.typeaheadBuffer.length > 0;
  }
  function Qa(e) {
    e.typeaheadBuffer = "";
  }
  function Ja(e, t) {
    var n = e.event,
      i = e.isTargetListItem,
      a = e.focusedItemIndex,
      s = e.focusItemAtIndex,
      r = e.sortedIndexByFirstChar,
      o = e.isItemAtIndexDisabled,
      l = "ArrowLeft" === Jn(n),
      c = "ArrowUp" === Jn(n),
      u = "ArrowRight" === Jn(n),
      d = "ArrowDown" === Jn(n),
      p = "Home" === Jn(n),
      f = "End" === Jn(n),
      m = "Enter" === Jn(n),
      h = "Spacebar" === Jn(n);
    return n.ctrlKey || n.metaKey || l || c || u || d || p || f || m
      ? -1
      : h || 1 !== n.key.length
      ? h
        ? (i && Wa(n),
          i && Ya(t)
            ? Xa(
                {
                  focusItemAtIndex: s,
                  focusedItemIndex: a,
                  nextChar: " ",
                  sortedIndexByFirstChar: r,
                  skipFocus: !1,
                  isItemAtIndexDisabled: o,
                },
                t
              )
            : -1)
        : -1
      : (Wa(n),
        Xa(
          {
            focusItemAtIndex: s,
            focusedItemIndex: a,
            nextChar: n.key.toLowerCase(),
            sortedIndexByFirstChar: r,
            skipFocus: !1,
            isItemAtIndexDisabled: o,
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
   */ var Za = (function (e) {
    function t(n) {
      var i = e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
      return (
        (i.wrapFocus = !1),
        (i.isVertical = !0),
        (i.isSingleSelectionList = !1),
        (i.selectedIndex = qa.UNSET_INDEX),
        (i.focusedItemIndex = qa.UNSET_INDEX),
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
      ye(t, e),
      Object.defineProperty(t, "strings", {
        get: function () {
          return Ga;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "cssClasses", {
        get: function () {
          return ja;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "numbers", {
        get: function () {
          return qa;
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
        e !== qa.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            e,
            ja.LIST_ITEM_ACTIVATED_CLASS
          ) && this.setUseActivatedClass(!0),
          (this.isSingleSelectionList = !0),
          (this.selectedIndex = e));
      }),
      (t.prototype.getSelectedIndexFromDOM = function () {
        for (
          var e = qa.UNSET_INDEX, t = this.adapter.getListItemCount(), n = 0;
          n < t;
          n++
        ) {
          var i = this.adapter.listItemAtIndexHasClass(
              n,
              ja.LIST_ITEM_SELECTED_CLASS
            ),
            a = this.adapter.listItemAtIndexHasClass(
              n,
              ja.LIST_ITEM_ACTIVATED_CLASS
            );
          if (i || a) {
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
        return this.hasTypeahead && Ya(this.typeaheadState);
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
          a = "ArrowLeft" === Jn(e),
          s = "ArrowUp" === Jn(e),
          r = "ArrowRight" === Jn(e),
          o = "ArrowDown" === Jn(e),
          l = "Home" === Jn(e),
          c = "End" === Jn(e),
          u = "Enter" === Jn(e),
          d = "Spacebar" === Jn(e),
          p = "A" === e.key || "a" === e.key;
        if (this.adapter.isRootFocused()) {
          s || c
            ? (e.preventDefault(), this.focusLastElement())
            : (o || l) && (e.preventDefault(), this.focusFirstElement()),
            this.hasTypeahead &&
              Ja(
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
                      ja.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
        } else {
          var f = this.adapter.getFocusedElementIndex();
          if (!(-1 === f && (f = n) < 0)) {
            if ((this.isVertical && o) || (!this.isVertical && r))
              Wa(e), this.focusNextElement(f);
            else if ((this.isVertical && s) || (!this.isVertical && a))
              Wa(e), this.focusPrevElement(f);
            else if (l) Wa(e), this.focusFirstElement();
            else if (c) Wa(e), this.focusLastElement();
            else if (p && e.ctrlKey && this.isCheckboxList)
              e.preventDefault(),
                this.toggleAll(
                  this.selectedIndex === qa.UNSET_INDEX
                    ? []
                    : this.selectedIndex
                );
            else if ((u || d) && t) {
              var m = e.target;
              if (m && "A" === m.tagName && u) return;
              if (
                (Wa(e),
                this.adapter.listItemAtIndexHasClass(
                  f,
                  ja.LIST_ITEM_DISABLED_CLASS
                ))
              )
                return;
              this.isTypeaheadInProgress() ||
                (this.isSelectableList() && this.setSelectedIndexOnAction(f),
                this.adapter.notifyAction(f));
            }
            if (this.hasTypeahead)
              Ja(
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
                      ja.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
          }
        }
      }),
      (t.prototype.handleClick = function (e, t) {
        e !== qa.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            e,
            ja.LIST_ITEM_DISABLED_CLASS
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
                ja.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                e,
                Ga.ARIA_DISABLED,
                "false"
              ))
            : (this.adapter.addClassForElementIndex(
                e,
                ja.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                e,
                Ga.ARIA_DISABLED,
                "true"
              )));
      }),
      (t.prototype.setSingleSelectionAtIndex = function (e, t) {
        var n = (void 0 === t ? {} : t).forceUpdate;
        if (this.selectedIndex !== e || n) {
          var i = ja.LIST_ITEM_SELECTED_CLASS;
          this.useActivatedClass && (i = ja.LIST_ITEM_ACTIVATED_CLASS),
            this.selectedIndex !== qa.UNSET_INDEX &&
              this.adapter.removeClassForElementIndex(this.selectedIndex, i),
            this.setAriaForSingleSelectionAtIndex(e),
            this.setTabindexAtIndex(e),
            e !== qa.UNSET_INDEX && this.adapter.addClassForElementIndex(e, i),
            (this.selectedIndex = e);
        }
      }),
      (t.prototype.setAriaForSingleSelectionAtIndex = function (e) {
        this.selectedIndex === qa.UNSET_INDEX &&
          (this.ariaCurrentAttrValue = this.adapter.getAttributeForElementIndex(
            e,
            Ga.ARIA_CURRENT
          ));
        var t = null !== this.ariaCurrentAttrValue,
          n = t ? Ga.ARIA_CURRENT : Ga.ARIA_SELECTED;
        if (
          (this.selectedIndex !== qa.UNSET_INDEX &&
            this.adapter.setAttributeForElementIndex(
              this.selectedIndex,
              n,
              "false"
            ),
          e !== qa.UNSET_INDEX)
        ) {
          var i = t ? this.ariaCurrentAttrValue : "true";
          this.adapter.setAttributeForElementIndex(e, n, i);
        }
      }),
      (t.prototype.getSelectionAttribute = function () {
        return this.useSelectedAttr ? Ga.ARIA_SELECTED : Ga.ARIA_CHECKED;
      }),
      (t.prototype.setRadioAtIndex = function (e) {
        var t = this.getSelectionAttribute();
        this.adapter.setCheckedCheckboxOrRadioAtIndex(e, !0),
          this.selectedIndex !== qa.UNSET_INDEX &&
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
        this.focusedItemIndex === qa.UNSET_INDEX && 0 !== e
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
          e !== qa.UNSET_INDEX &&
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
            this.selectedIndex !== qa.UNSET_INDEX
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
            (this.isSingleSelectionList && e === qa.UNSET_INDEX)
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
        var a =
          this.selectedIndex === qa.UNSET_INDEX
            ? []
            : this.selectedIndex.slice();
        i
          ? a.push(e)
          : (a = a.filter(function (t) {
              return t !== e;
            })),
          (this.selectedIndex = a);
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
              ja.LIST_ITEM_DISABLED_CLASS
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
          Xa(
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
                  ja.LIST_ITEM_DISABLED_CLASS
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
            var a = t(i).trim();
            if (a) {
              var s = a[0].toLowerCase();
              n.has(s) || n.set(s, []),
                n.get(s).push({ text: a.toLowerCase(), index: i });
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
        Qa(this.typeaheadState);
      }),
      t
    );
  })(Se);
  function es(e) {
    let t;
    const n = e[37].default,
      i = l(n, e, e[43], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 4096 & a[1]) &&
          d(i, n, e, e[43], t ? u(n, e[43], a, null) : p(e[43]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function ts(e) {
    let n, i, a;
    const s = [
      { use: [e[17], ...e[0]] },
      {
        class: We({
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
    var r = e[12];
    function o(e) {
      let n = { $$slots: { default: [es] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) n = t(n, s[e]);
      return { props: n };
    }
    return (
      r &&
        ((n = new r(o(e))),
        e[38](n),
        n.$on("keydown", e[39]),
        n.$on("focusin", e[40]),
        n.$on("focusout", e[41]),
        n.$on("click", e[42]),
        n.$on("SMUIListItem:mount", e[19]),
        n.$on("SMUIListItem:unmount", e[20]),
        n.$on("SMUI:action", e[21])),
      {
        c() {
          n && fe(n.$$.fragment), (i = x());
        },
        m(e, t) {
          n && me(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, t) {
          const a =
            8818687 & t[0]
              ? ue(s, [
                  131073 & t[0] && { use: [e[17], ...e[0]] },
                  266238 & t[0] && {
                    class: We({
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
                  32768 & t[0] && { role: e[15] },
                  8388608 & t[0] && de(e[23]),
                ])
              : {};
          if (
            (4096 & t[1] && (a.$$scope = { dirty: t, ctx: e }),
            r !== (r = e[12]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                he(e, 1);
              }),
                se();
            }
            r
              ? ((n = new r(o(e))),
                e[38](n),
                n.$on("keydown", e[39]),
                n.$on("focusin", e[40]),
                n.$on("focusout", e[41]),
                n.$on("click", e[42]),
                n.$on("SMUIListItem:mount", e[19]),
                n.$on("SMUIListItem:unmount", e[20]),
                n.$on("SMUI:action", e[21]),
                fe(n.$$.fragment),
                re(n.$$.fragment, 1),
                me(n, i.parentNode, i))
              : (n = null);
          } else r && n.$set(a);
        },
        i(e) {
          a || (n && re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[38](null), t && b(i), n && he(n, t);
        },
      }
    );
  }
  function ns(e, n, i) {
    const a = [
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
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n;
    var l;
    const { closest: c, matches: u } = we,
      d = Ze(F());
    let p,
      h,
      { use: g = [] } = n,
      { class: $ = "" } = n,
      { nonInteractive: I = !1 } = n,
      { dense: v = !1 } = n,
      { textualList: b = !1 } = n,
      { avatarList: y = !1 } = n,
      { iconList: E = !1 } = n,
      { imageList: A = !1 } = n,
      { thumbnailList: C = !1 } = n,
      { videoList: _ = !1 } = n,
      { twoLine: x = !1 } = n,
      { threeLine: S = !1 } = n,
      { vertical: T = !0 } = n,
      {
        wrapFocus: O = null !== (l = B("SMUI:list:wrapFocus")) &&
          void 0 !== l &&
          l,
      } = n,
      { singleSelection: L = !1 } = n,
      { selectedIndex: w = -1 } = n,
      { radioList: D = !1 } = n,
      { checkList: N = !1 } = n,
      { hasTypeahead: M = !1 } = n,
      R = [],
      P = B("SMUI:list:role"),
      V = B("SMUI:list:nav");
    const j = new WeakMap();
    let G,
      q = B("SMUI:dialog:selection"),
      K = B("SMUI:addLayoutListener"),
      { component: W = V ? jt : Gt } = n;
    function X() {
      return null == p
        ? []
        : [...oe().children]
            .map((e) => j.get(e))
            .filter((e) => e && e._smui_list_item_accessor);
    }
    function Y(e) {
      const t = X()[e];
      t && "focus" in t.element && t.element.focus();
    }
    function Q(e, t) {
      var n;
      const i = X()[e];
      return null !== (n = i && i.hasClass(t)) && void 0 !== n && n;
    }
    function J(e, t) {
      const n = X()[e];
      n && n.addClass(t);
    }
    function Z(e, t) {
      const n = X()[e];
      n && n.removeClass(t);
    }
    function ee(e, t, n) {
      const i = X()[e];
      i && i.addAttr(t, n);
    }
    function te(e, t) {
      const n = X()[e];
      n && n.removeAttr(t);
    }
    function ne(e, t) {
      const n = X()[e];
      return n ? n.getAttr(t) : null;
    }
    function ie(e) {
      var t;
      const n = X()[e];
      return null !== (t = n && n.getPrimaryText()) && void 0 !== t ? t : "";
    }
    function ae(e) {
      const t = c(e, ".mdc-deprecated-list-item, .mdc-deprecated-list");
      return t && u(t, ".mdc-deprecated-list-item")
        ? X()
            .map((e) => (null == e ? void 0 : e.element))
            .indexOf(t)
        : -1;
    }
    function se() {
      return h.layout();
    }
    function re() {
      return h.getSelectedIndex();
    }
    function oe() {
      return p.getElement();
    }
    H("SMUI:list:nonInteractive", I),
      H("SMUI:separator:context", "list"),
      P ||
        (L
          ? ((P = "listbox"), H("SMUI:list:item:role", "option"))
          : D
          ? ((P = "radiogroup"), H("SMUI:list:item:role", "radio"))
          : N
          ? ((P = "group"), H("SMUI:list:item:role", "checkbox"))
          : ((P = "list"), H("SMUI:list:item:role", void 0))),
      K && (G = K(se)),
      k(() => {
        i(
          13,
          (h = new Za({
            addClassForElementIndex: J,
            focusItemAtIndex: Y,
            getAttributeForElementIndex: (e, t) => {
              var n, i;
              return null !==
                (i =
                  null === (n = X()[e]) || void 0 === n
                    ? void 0
                    : n.getAttr(t)) && void 0 !== i
                ? i
                : null;
            },
            getFocusedElementIndex: () =>
              document.activeElement
                ? X()
                    .map((e) => e.element)
                    .indexOf(document.activeElement)
                : -1,
            getListItemCount: () => R.length,
            getPrimaryTextAtIndex: ie,
            hasCheckboxAtIndex: (e) => {
              var t, n;
              return (
                null !==
                  (n =
                    null === (t = X()[e]) || void 0 === t
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
                    null === (t = X()[e]) || void 0 === t
                      ? void 0
                      : t.hasRadio) &&
                void 0 !== n &&
                n
              );
            },
            isCheckboxCheckedAtIndex: (e) => {
              var t;
              const n = X()[e];
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
            listItemAtIndexHasClass: Q,
            notifyAction: (e) => {
              i(24, (w = e)),
                null != p &&
                  Xe(oe(), "SMUIList:action", { index: e }, void 0, !0);
            },
            removeClassForElementIndex: Z,
            setAttributeForElementIndex: ee,
            setCheckedCheckboxOrRadioAtIndex: (e, t) => {
              X()[e].checked = t;
            },
            setTabIndexForListItemChildren: (e, t) => {
              const n = X()[e];
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
            return h.isTypeaheadInProgress();
          },
          typeaheadMatchItem: (e, t) => h.typeaheadMatchItem(e, t, !0),
          getOrderedList: X,
          focusItemAtIndex: Y,
          addClassForElementIndex: J,
          removeClassForElementIndex: Z,
          setAttributeForElementIndex: ee,
          removeAttributeForElementIndex: te,
          getAttributeFromElementIndex: ne,
          getPrimaryTextAtIndex: ie,
        };
        return (
          Xe(oe(), "SMUIList:mount", e),
          h.init(),
          () => {
            h.destroy();
          }
        );
      }),
      U(() => {
        G && G();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(23, (s = m(n, a))),
          "use" in e && i(0, (g = e.use)),
          "class" in e && i(1, ($ = e.class)),
          "nonInteractive" in e && i(2, (I = e.nonInteractive)),
          "dense" in e && i(3, (v = e.dense)),
          "textualList" in e && i(4, (b = e.textualList)),
          "avatarList" in e && i(5, (y = e.avatarList)),
          "iconList" in e && i(6, (E = e.iconList)),
          "imageList" in e && i(7, (A = e.imageList)),
          "thumbnailList" in e && i(8, (C = e.thumbnailList)),
          "videoList" in e && i(9, (_ = e.videoList)),
          "twoLine" in e && i(10, (x = e.twoLine)),
          "threeLine" in e && i(11, (S = e.threeLine)),
          "vertical" in e && i(25, (T = e.vertical)),
          "wrapFocus" in e && i(26, (O = e.wrapFocus)),
          "singleSelection" in e && i(27, (L = e.singleSelection)),
          "selectedIndex" in e && i(24, (w = e.selectedIndex)),
          "radioList" in e && i(28, (D = e.radioList)),
          "checkList" in e && i(29, (N = e.checkList)),
          "hasTypeahead" in e && i(30, (M = e.hasTypeahead)),
          "component" in e && i(12, (W = e.component)),
          "$$scope" in e && i(43, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        33562624 & e.$$.dirty[0] && h && h.setVerticalOrientation(T),
          67117056 & e.$$.dirty[0] && h && h.setWrapFocus(O),
          1073750016 & e.$$.dirty[0] && h && h.setHasTypeahead(M),
          134225920 & e.$$.dirty[0] && h && h.setSingleSelection(L),
          151003136 & e.$$.dirty[0] &&
            h &&
            L &&
            re() !== w &&
            h.setSelectedIndex(w);
      }),
      [
        g,
        $,
        I,
        v,
        b,
        y,
        E,
        A,
        C,
        _,
        x,
        S,
        W,
        h,
        p,
        P,
        u,
        d,
        q,
        function (e) {
          R.push(e.detail),
            j.set(e.detail.element, e.detail),
            L && e.detail.selected && i(24, (w = ae(e.detail.element))),
            e.stopPropagation();
        },
        function (e) {
          var t;
          const n =
            null !== (t = e.detail && R.indexOf(e.detail)) && void 0 !== t
              ? t
              : -1;
          -1 !== n && (R.splice(n, 1), j.delete(e.detail.element)),
            e.stopPropagation();
        },
        function (e) {
          if (D || N) {
            const t = ae(e.target);
            if (-1 !== t) {
              const e = X()[t];
              e &&
                ((D && !e.checked) || N) &&
                ((e.checked = !e.checked),
                e.activateRipple(),
                window.requestAnimationFrame(() => {
                  e.deactivateRipple();
                }));
            }
          }
        },
        ae,
        s,
        w,
        T,
        O,
        L,
        D,
        N,
        M,
        se,
        function (e, t) {
          return h.setEnabled(e, t);
        },
        function () {
          return h.isTypeaheadInProgress();
        },
        re,
        function () {
          return h.getFocusedItemIndex();
        },
        oe,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (p = e), i(14, p);
          });
        },
        (e) =>
          h &&
          h.handleKeydown(
            e,
            e.target.classList.contains("mdc-deprecated-list-item"),
            ae(e.target)
          ),
        (e) => h && h.handleFocusIn(ae(e.target)),
        (e) => h && h.handleFocusOut(ae(e.target)),
        (e) =>
          h &&
          h.handleClick(
            ae(e.target),
            !u(e.target, 'input[type="checkbox"], input[type="radio"]')
          ),
        o,
      ]
    );
  }
  class is extends $e {
    constructor(e) {
      super(),
        ge(
          this,
          e,
          ns,
          ts,
          r,
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
  function as(e) {
    let t;
    return {
      c() {
        (t = E("span")), T(t, "class", "mdc-deprecated-list-item__ripple");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function ss(e) {
    let t,
      n,
      i = e[7] && as();
    const a = e[32].default,
      s = l(a, e, e[35], null);
    return {
      c() {
        i && i.c(), (t = x()), s && s.c();
      },
      m(e, a) {
        i && i.m(e, a), v(e, t, a), s && s.m(e, a), (n = !0);
      },
      p(e, r) {
        e[7]
          ? i || ((i = as()), i.c(), i.m(t.parentNode, t))
          : i && (i.d(1), (i = null)),
          s &&
            s.p &&
            (!n || 16 & r[1]) &&
            d(s, a, e, e[35], n ? u(a, e[35], r, null) : p(e[35]), null);
      },
      i(e) {
        n || (re(s, e), (n = !0));
      },
      o(e) {
        oe(s, e), (n = !1);
      },
      d(e) {
        i && i.d(e), e && b(t), s && s.d(e);
      },
    };
  }
  function rs(e) {
    let n, i, a;
    const s = [
      {
        use: [
          ...(e[6]
            ? []
            : [
                [
                  li,
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
        class: We({
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
      { style: Object.entries(e[17]).map(ls).concat([e[4]]).join(" ") },
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
    var r = e[12];
    function o(e) {
      let n = { $$slots: { default: [ss] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) n = t(n, s[e]);
      return { props: n };
    }
    return (
      r &&
        ((n = new r(o(e))),
        e[33](n),
        n.$on("click", e[13]),
        n.$on("keydown", e[25]),
        n.$on("SMUIGenericInput:mount", e[26]),
        n.$on("SMUIGenericInput:unmount", e[34])),
      {
        c() {
          n && fe(n.$$.fragment), (i = x());
        },
        m(e, t) {
          n && me(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, t) {
          const a =
            167726975 & t[0]
              ? ue(s, [
                  30425703 & t[0] && {
                    use: [
                      ...(e[6]
                        ? []
                        : [
                            [
                              li,
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
                  2163531 & t[0] && {
                    class: We({
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
                  131088 & t[0] && {
                    style: Object.entries(e[17])
                      .map(ls)
                      .concat([e[4]])
                      .join(" "),
                  },
                  2097154 & t[0] &&
                    de(e[21] && e[1] ? { "aria-current": "page" } : {}),
                  2097408 & t[0] && de(e[21] ? {} : { role: e[8] }),
                  2097409 & t[0] &&
                    de(
                      e[21] || "option" !== e[8]
                        ? {}
                        : { "aria-selected": e[0] ? "true" : "false" }
                    ),
                  2113792 & t[0] &&
                    de(
                      e[21] || ("radio" !== e[8] && "checkbox" !== e[8])
                        ? {}
                        : {
                            "aria-checked":
                              e[14] && e[14].checked ? "true" : "false",
                          }
                    ),
                  2097664 & t[0] &&
                    de(
                      e[21] ? {} : { "aria-disabled": e[9] ? "true" : "false" }
                    ),
                  1024 & t[0] && {
                    "data-menu-item-skip-restore-focus": e[10] || void 0,
                  },
                  524288 & t[0] && { tabindex: e[19] },
                  2048 & t[0] && { href: e[11] },
                  262144 & t[0] && de(e[18]),
                  134217728 & t[0] && de(e[27]),
                ])
              : {};
          if (
            ((128 & t[0]) | (16 & t[1]) && (a.$$scope = { dirty: t, ctx: e }),
            r !== (r = e[12]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                he(e, 1);
              }),
                se();
            }
            r
              ? ((n = new r(o(e))),
                e[33](n),
                n.$on("click", e[13]),
                n.$on("keydown", e[25]),
                n.$on("SMUIGenericInput:mount", e[26]),
                n.$on("SMUIGenericInput:unmount", e[34]),
                fe(n.$$.fragment),
                re(n.$$.fragment, 1),
                me(n, i.parentNode, i))
              : (n = null);
          } else r && n.$set(a);
        },
        i(e) {
          a || (n && re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[33](null), t && b(i), n && he(n, t);
        },
      }
    );
  }
  let os = 0;
  const ls = ([e, t]) => `${e}: ${t};`;
  function cs(e, n, i) {
    let a;
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
    let r = m(n, s),
      { $$slots: o = {}, $$scope: l } = n;
    var c;
    const u = Ze(F());
    let d = () => {};
    let { use: p = [] } = n,
      { class: h = "" } = n,
      { style: g = "" } = n,
      { color: $ } = n,
      {
        nonInteractive: I = null !== (c = B("SMUI:list:nonInteractive")) &&
          void 0 !== c &&
          c,
      } = n;
    H("SMUI:list:nonInteractive", void 0);
    let { ripple: v = !I } = n,
      { activated: b = !1 } = n,
      { role: y = B("SMUI:list:item:role") } = n;
    H("SMUI:list:item:role", void 0);
    let E,
      A,
      C,
      { selected: _ = !1 } = n,
      { disabled: x = !1 } = n,
      { skipRestoreFocus: S = !1 } = n,
      { tabindex: T = d } = n,
      { inputId: O = "SMUI-form-field-list-" + os++ } = n,
      { href: L } = n,
      w = {},
      D = {},
      N = {},
      M = B("SMUI:list:item:nav"),
      { component: R = M ? (L ? Ft : zt) : Vt } = n;
    function P(e) {
      return e in w ? w[e] : Q().classList.contains(e);
    }
    function V(e) {
      w[e] || i(16, (w[e] = !0), w);
    }
    function j(e) {
      (e in w && !w[e]) || i(16, (w[e] = !1), w);
    }
    function G(e) {
      var t;
      return e in N
        ? null !== (t = N[e]) && void 0 !== t
          ? t
          : null
        : Q().getAttribute(e);
    }
    function q(e, t) {
      N[e] !== t && i(18, (N[e] = t), N);
    }
    function K(e) {
      (e in N && null == N[e]) || i(18, (N[e] = void 0), N);
    }
    function W() {
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
      e && i(19, (a = 0));
    }
    function X(e) {
      x || Xe(Q(), "SMUI:action", e);
    }
    function Y() {
      var e, t, n;
      const i = Q(),
        a = i.querySelector(".mdc-deprecated-list-item__primary-text");
      if (a) return null !== (e = a.textContent) && void 0 !== e ? e : "";
      const s = i.querySelector(".mdc-deprecated-list-item__text");
      return s
        ? null !== (t = s.textContent) && void 0 !== t
          ? t
          : ""
        : null !== (n = i.textContent) && void 0 !== n
        ? n
        : "";
    }
    function Q() {
      return E.getElement();
    }
    H("SMUI:generic:input:props", { id: O }),
      H("SMUI:separator:context", void 0),
      k(() => {
        if (!_ && !I) {
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
          e && (C = window.requestAnimationFrame(W));
        }
        const e = {
          _smui_list_item_accessor: !0,
          get element() {
            return Q();
          },
          get selected() {
            return _;
          },
          set selected(e) {
            i(0, (_ = e));
          },
          hasClass: P,
          addClass: V,
          removeClass: j,
          getAttr: G,
          addAttr: q,
          removeAttr: K,
          getPrimaryText: Y,
          get checked() {
            var e;
            return null !== (e = A && A.checked) && void 0 !== e && e;
          },
          set checked(e) {
            A && i(14, (A.checked = !!e), A);
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
          getValue: () => r.value,
          action: X,
          get tabindex() {
            return a;
          },
          set tabindex(e) {
            i(28, (T = e));
          },
          get disabled() {
            return x;
          },
          get activated() {
            return b;
          },
          set activated(e) {
            i(1, (b = e));
          },
        };
        return (
          Xe(Q(), "SMUIListItem:mount", e),
          () => {
            Xe(Q(), "SMUIListItem:unmount", e);
          }
        );
      }),
      U(() => {
        C && window.cancelAnimationFrame(C);
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(27, (r = m(n, s))),
          "use" in e && i(2, (p = e.use)),
          "class" in e && i(3, (h = e.class)),
          "style" in e && i(4, (g = e.style)),
          "color" in e && i(5, ($ = e.color)),
          "nonInteractive" in e && i(6, (I = e.nonInteractive)),
          "ripple" in e && i(7, (v = e.ripple)),
          "activated" in e && i(1, (b = e.activated)),
          "role" in e && i(8, (y = e.role)),
          "selected" in e && i(0, (_ = e.selected)),
          "disabled" in e && i(9, (x = e.disabled)),
          "skipRestoreFocus" in e && i(10, (S = e.skipRestoreFocus)),
          "tabindex" in e && i(28, (T = e.tabindex)),
          "inputId" in e && i(29, (O = e.inputId)),
          "href" in e && i(11, (L = e.href)),
          "component" in e && i(12, (R = e.component)),
          "$$scope" in e && i(35, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        268452417 & e.$$.dirty[0] &&
          i(
            19,
            (a = T === d ? (I || x || !(_ || (A && A.checked)) ? -1 : 0) : T)
          );
      }),
      [
        _,
        b,
        p,
        h,
        g,
        $,
        I,
        v,
        y,
        x,
        S,
        L,
        R,
        X,
        A,
        E,
        w,
        D,
        N,
        a,
        u,
        M,
        V,
        j,
        function (e, t) {
          D[e] != t &&
            ("" === t || null == t
              ? (delete D[e], i(17, D))
              : i(17, (D[e] = t), D));
        },
        function (e) {
          const t = "Enter" === e.key,
            n = "Space" === e.key;
          (t || n) && X(e);
        },
        function (e) {
          ("_smui_checkbox_accessor" in e.detail ||
            "_smui_radio_accessor" in e.detail) &&
            i(14, (A = e.detail));
        },
        r,
        T,
        O,
        Y,
        Q,
        o,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (E = e), i(15, E);
          });
        },
        () => i(14, (A = void 0)),
        l,
      ]
    );
  }
  var us = gt({ class: "mdc-deprecated-list-item__text", component: zt }),
    ds = gt({ class: "mdc-deprecated-list-item__primary-text", component: zt }),
    ps = gt({
      class: "mdc-deprecated-list-item__secondary-text",
      component: zt,
    });
  function fs(e) {
    let n, i, r, o, c, f;
    const m = e[8].default,
      h = l(m, e, e[7], null);
    let g = [
        {
          class: (i = We({
            [e[1]]: !0,
            "mdc-deprecated-list-item__graphic": !0,
            "mdc-menu__selection-group-icon": e[4],
          })),
        },
        e[5],
      ],
      I = {};
    for (let e = 0; e < g.length; e += 1) I = t(I, g[e]);
    return {
      c() {
        (n = E("span")), h && h.c(), O(n, I);
      },
      m(t, i) {
        v(t, n, i),
          h && h.m(n, null),
          e[9](n),
          (o = !0),
          c ||
            ((f = [$((r = tt.call(null, n, e[0]))), $(e[3].call(null, n))]),
            (c = !0));
      },
      p(e, [t]) {
        h &&
          h.p &&
          (!o || 128 & t) &&
          d(h, m, e, e[7], o ? u(m, e[7], t, null) : p(e[7]), null),
          O(
            n,
            (I = ue(g, [
              (!o ||
                (2 & t &&
                  i !==
                    (i = We({
                      [e[1]]: !0,
                      "mdc-deprecated-list-item__graphic": !0,
                      "mdc-menu__selection-group-icon": e[4],
                    })))) && { class: i },
              32 & t && e[5],
            ]))
          ),
          r && s(r.update) && 1 & t && r.update.call(null, e[0]);
      },
      i(e) {
        o || (re(h, e), (o = !0));
      },
      o(e) {
        oe(h, e), (o = !1);
      },
      d(t) {
        t && b(n), h && h.d(t), e[9](null), (c = !1), a(f);
      },
    };
  }
  function ms(e, n, i) {
    const a = ["use", "class", "getElement"];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n;
    const l = Ze(F());
    let c,
      { use: u = [] } = n,
      { class: d = "" } = n,
      p = B("SMUI:list:graphic:menu-selection-group");
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(5, (s = m(n, a))),
          "use" in e && i(0, (u = e.use)),
          "class" in e && i(1, (d = e.class)),
          "$$scope" in e && i(7, (o = e.$$scope));
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
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (c = e), i(2, c);
          });
        },
      ]
    );
  }
  gt({ class: "mdc-deprecated-list-item__meta", component: zt }),
    gt({ class: "mdc-deprecated-list-group", component: Ut }),
    gt({ class: "mdc-deprecated-list-group__subheader", component: Bt });
  const hs = class extends $e {
      constructor(e) {
        super(),
          ge(
            this,
            e,
            cs,
            rs,
            r,
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
    gs = class extends $e {
      constructor(e) {
        super(), ge(this, e, ms, fs, r, { use: 0, class: 1, getElement: 6 });
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
  var $s = {
      ANIMATE: "mdc-drawer--animate",
      CLOSING: "mdc-drawer--closing",
      DISMISSIBLE: "mdc-drawer--dismissible",
      MODAL: "mdc-drawer--modal",
      OPEN: "mdc-drawer--open",
      OPENING: "mdc-drawer--opening",
      ROOT: "mdc-drawer",
    },
    Is = {
      APP_CONTENT_SELECTOR: ".mdc-drawer-app-content",
      CLOSE_EVENT: "MDCDrawer:closed",
      OPEN_EVENT: "MDCDrawer:opened",
      SCRIM_SELECTOR: ".mdc-drawer-scrim",
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      LIST_ITEM_ACTIVATED_SELECTOR:
        ".mdc-list-item--activated,.mdc-deprecated-list-item--activated",
    },
    vs = (function (e) {
      function t(n) {
        var i = e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
        return (i.animationFrame = 0), (i.animationTimer = 0), i;
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Is;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return $s;
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
            (this.adapter.addClass($s.OPEN),
            this.adapter.addClass($s.ANIMATE),
            this.runNextAnimationFrame(function () {
              e.adapter.addClass($s.OPENING);
            }),
            this.adapter.saveFocus());
        }),
        (t.prototype.close = function () {
          !this.isOpen() ||
            this.isOpening() ||
            this.isClosing() ||
            this.adapter.addClass($s.CLOSING);
        }),
        (t.prototype.isOpen = function () {
          return this.adapter.hasClass($s.OPEN);
        }),
        (t.prototype.isOpening = function () {
          return (
            this.adapter.hasClass($s.OPENING) ||
            this.adapter.hasClass($s.ANIMATE)
          );
        }),
        (t.prototype.isClosing = function () {
          return this.adapter.hasClass($s.CLOSING);
        }),
        (t.prototype.handleKeydown = function (e) {
          var t = e.keyCode;
          ("Escape" === e.key || 27 === t) && this.close();
        }),
        (t.prototype.handleTransitionEnd = function (e) {
          var t = $s.OPENING,
            n = $s.CLOSING,
            i = $s.OPEN,
            a = $s.ANIMATE,
            s = $s.ROOT;
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
            this.adapter.removeClass(a),
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
    })(Se),
    bs = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        ye(t, e),
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
    })(vs);
  function ys(e) {
    let n, i, r, o, c, f;
    const m = e[15].default,
      h = l(m, e, e[14], null);
    let g = [
        {
          class: (i = We({
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
      I = {};
    for (let e = 0; e < g.length; e += 1) I = t(I, g[e]);
    return {
      c() {
        (n = E("aside")), h && h.c(), O(n, I);
      },
      m(t, i) {
        v(t, n, i),
          h && h.m(n, null),
          e[16](n),
          (o = !0),
          c ||
            ((f = [
              $((r = tt.call(null, n, e[0]))),
              $(e[7].call(null, n)),
              S(n, "keydown", e[17]),
              S(n, "transitionend", e[18]),
            ]),
            (c = !0));
      },
      p(e, [t]) {
        h &&
          h.p &&
          (!o || 16384 & t) &&
          d(h, m, e, e[14], o ? u(m, e[14], t, null) : p(e[14]), null),
          O(
            n,
            (I = ue(g, [
              (!o ||
                (78 & t &&
                  i !==
                    (i = We({
                      [e[1]]: !0,
                      "mdc-drawer": !0,
                      "mdc-drawer--dismissible": "dismissible" === e[2],
                      "mdc-drawer--modal": "modal" === e[2],
                      "smui-drawer__absolute": "modal" === e[2] && !e[3],
                      ...e[6],
                    })))) && { class: i },
              256 & t && e[8],
            ]))
          ),
          r && s(r.update) && 1 & t && r.update.call(null, e[0]);
      },
      i(e) {
        o || (re(h, e), (o = !0));
      },
      o(e) {
        oe(h, e), (o = !1);
      },
      d(t) {
        t && b(n), h && h.d(t), e[16](null), (c = !1), a(f);
      },
    };
  }
  function Es(e, n, i) {
    const a = [
      "use",
      "class",
      "variant",
      "open",
      "fixed",
      "setOpen",
      "isOpen",
      "getElement",
    ];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n;
    const { FocusTrap: l } = vn,
      c = Ze(F());
    let u,
      d,
      p,
      { use: h = [] } = n,
      { class: g = "" } = n,
      { variant: $ } = n,
      { open: I = !1 } = n,
      { fixed: v = !0 } = n,
      b = {},
      y = null,
      E = !1;
    H("SMUI:list:nav", !0),
      H("SMUI:list:item:nav", !0),
      H("SMUI:list:wrapFocus", !0);
    let A = $;
    function C() {
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
      const n = "dismissible" === $ ? vs : "modal" === $ ? bs : void 0;
      return n
        ? new n({
            addClass: x,
            removeClass: S,
            hasClass: _,
            elementHasClass: (e, t) => e.classList.contains(t),
            saveFocus: () => (y = document.activeElement),
            restoreFocus: () => {
              y &&
                "focus" in y &&
                u.contains(document.activeElement) &&
                y.focus();
            },
            focusActiveNavigationItem: () => {
              const e = u.querySelector(
                ".mdc-list-item--activated,.mdc-deprecated-list-item--activated"
              );
              e && e.focus();
            },
            notifyClose: () => {
              i(9, (I = !1)), Xe(u, "SMUIDrawer:closed", void 0, void 0, !0);
            },
            notifyOpen: () => {
              i(9, (I = !0)), Xe(u, "SMUIDrawer:opened", void 0, void 0, !0);
            },
            trapFocus: () => p.trapFocus(),
            releaseFocus: () => p.releaseFocus(),
          })
        : void 0;
    }
    function _(e) {
      return e in b ? b[e] : O().classList.contains(e);
    }
    function x(e) {
      b[e] || i(6, (b[e] = !0), b);
    }
    function S(e) {
      (e in b && !b[e]) || i(6, (b[e] = !1), b);
    }
    function T() {
      d && "handleScrimClick" in d && d.handleScrimClick();
    }
    function O() {
      return u;
    }
    k(() => {
      (p = new l(u, { skipInitialFocus: !0 })), i(4, (d = C())), d && d.init();
    }),
      U(() => {
        d && d.destroy(),
          E && E.removeEventListener("SMUIDrawerScrim:click", T);
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(8, (s = m(n, a))),
          "use" in e && i(0, (h = e.use)),
          "class" in e && i(1, (g = e.class)),
          "variant" in e && i(2, ($ = e.variant)),
          "open" in e && i(9, (I = e.open)),
          "fixed" in e && i(3, (v = e.fixed)),
          "$$scope" in e && i(14, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        8212 & e.$$.dirty &&
          A !== $ &&
          (i(13, (A = $)),
          d && d.destroy(),
          i(6, (b = {})),
          i(4, (d = C())),
          d && d.init()),
          528 & e.$$.dirty &&
            d &&
            d.isOpen() !== I &&
            (I ? d.open() : d.close());
      }),
      [
        h,
        g,
        $,
        v,
        d,
        u,
        b,
        c,
        s,
        I,
        function (e) {
          i(9, (I = e));
        },
        function () {
          return I;
        },
        O,
        A,
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(5, u);
          });
        },
        (e) => d && d.handleKeydown(e),
        (e) => d && d.handleTransitionEnd(e),
      ]
    );
  }
  class As extends $e {
    constructor(e) {
      super(),
        ge(this, e, Es, ys, r, {
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
  var Cs = gt({ class: "mdc-drawer-app-content", component: Ut }),
    _s = gt({ class: "mdc-drawer__content", component: Ut });
  gt({ class: "mdc-drawer__header", component: Ut }),
    gt({ class: "mdc-drawer__title", component: Pt }),
    gt({ class: "mdc-drawer__subtitle", component: Ht });
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
  var xs = {
    animation: { prefixed: "-webkit-animation", standard: "animation" },
    transform: { prefixed: "-webkit-transform", standard: "transform" },
    transition: { prefixed: "-webkit-transition", standard: "transition" },
  };
  function Ss(e, t) {
    if (
      (function (e) {
        return (
          Boolean(e.document) && "function" == typeof e.document.createElement
        );
      })(e) &&
      t in xs
    ) {
      var n = e.document.createElement("div"),
        i = xs[t],
        a = i.standard,
        s = i.prefixed;
      return a in n.style ? a : s;
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
   */ var Ts = {
      CLOSED_CLASS: "mdc-linear-progress--closed",
      CLOSED_ANIMATION_OFF_CLASS: "mdc-linear-progress--closed-animation-off",
      INDETERMINATE_CLASS: "mdc-linear-progress--indeterminate",
      REVERSED_CLASS: "mdc-linear-progress--reversed",
      ANIMATION_READY_CLASS: "mdc-linear-progress--animation-ready",
    },
    Os = {
      ARIA_HIDDEN: "aria-hidden",
      ARIA_VALUEMAX: "aria-valuemax",
      ARIA_VALUEMIN: "aria-valuemin",
      ARIA_VALUENOW: "aria-valuenow",
      BUFFER_BAR_SELECTOR: ".mdc-linear-progress__buffer-bar",
      FLEX_BASIS: "flex-basis",
      PRIMARY_BAR_SELECTOR: ".mdc-linear-progress__primary-bar",
    },
    Ls = 0.8367142,
    ws = 2.00611057,
    Ds = 0.37651913,
    Ns = 0.84386165,
    Ms = 1.60277782,
    Rs = (function (e) {
      function t(n) {
        var i = e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
        return (i.observer = null), i;
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Ts;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Os;
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
          (this.determinate = !this.adapter.hasClass(Ts.INDETERMINATE_CLASS)),
            this.adapter.addClass(Ts.ANIMATION_READY_CLASS),
            (this.progress = 0),
            (this.buffer = 1),
            (this.observer = this.adapter.attachResizeObserver(function (t) {
              var n, i;
              if (!e.determinate)
                try {
                  for (var a = _e(t), s = a.next(); !s.done; s = a.next()) {
                    var r = s.value;
                    r.contentRect &&
                      e.calculateAndSetDimensions(r.contentRect.width);
                  }
                } catch (e) {
                  n = { error: e };
                } finally {
                  try {
                    s && !s.done && (i = a.return) && i.call(a);
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
              this.adapter.removeClass(Ts.INDETERMINATE_CLASS),
              this.adapter.setAttribute(
                Os.ARIA_VALUENOW,
                this.progress.toString()
              ),
              this.adapter.setAttribute(Os.ARIA_VALUEMAX, "1"),
              this.adapter.setAttribute(Os.ARIA_VALUEMIN, "0"),
              this.setPrimaryBarProgress(this.progress),
              void this.setBufferBarProgress(this.buffer)
            );
          this.observer &&
            this.calculateAndSetDimensions(this.adapter.getWidth()),
            this.adapter.addClass(Ts.INDETERMINATE_CLASS),
            this.adapter.removeAttribute(Os.ARIA_VALUENOW),
            this.adapter.removeAttribute(Os.ARIA_VALUEMAX),
            this.adapter.removeAttribute(Os.ARIA_VALUEMIN),
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
              this.adapter.setAttribute(Os.ARIA_VALUENOW, e.toString()));
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
          this.adapter.removeClass(Ts.CLOSED_CLASS),
            this.adapter.removeClass(Ts.CLOSED_ANIMATION_OFF_CLASS),
            this.adapter.removeAttribute(Os.ARIA_HIDDEN);
        }),
        (t.prototype.close = function () {
          this.adapter.addClass(Ts.CLOSED_CLASS),
            this.adapter.setAttribute(Os.ARIA_HIDDEN, "true");
        }),
        (t.prototype.isClosed = function () {
          return this.adapter.hasClass(Ts.CLOSED_CLASS);
        }),
        (t.prototype.handleTransitionEnd = function () {
          this.adapter.hasClass(Ts.CLOSED_CLASS) &&
            this.adapter.addClass(Ts.CLOSED_ANIMATION_OFF_CLASS);
        }),
        (t.prototype.destroy = function () {
          e.prototype.destroy.call(this),
            this.observer && this.observer.disconnect();
        }),
        (t.prototype.restartAnimation = function () {
          this.adapter.removeClass(Ts.ANIMATION_READY_CLASS),
            this.adapter.forceLayout(),
            this.adapter.addClass(Ts.ANIMATION_READY_CLASS);
        }),
        (t.prototype.setPrimaryBarProgress = function (e) {
          var t = "scaleX(" + e + ")",
            n =
              "undefined" != typeof window
                ? Ss(window, "transform")
                : "transform";
          this.adapter.setPrimaryBarStyle(n, t);
        }),
        (t.prototype.setBufferBarProgress = function (e) {
          var t = 100 * e + "%";
          this.adapter.setBufferBarStyle(Os.FLEX_BASIS, t);
        }),
        (t.prototype.calculateAndSetDimensions = function (e) {
          var t = e * Ls,
            n = e * ws,
            i = e * Ds,
            a = e * Ns,
            s = e * Ms;
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
              a + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-half-neg",
              -a + "px"
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
    })(Se);
  function Fs(n) {
    let i,
      r,
      o,
      l,
      c,
      u,
      d,
      p,
      f,
      m,
      h,
      g,
      y,
      A,
      C,
      x,
      L,
      w,
      D,
      N,
      M = [
        {
          class: (y = We({
            [n[1]]: !0,
            "mdc-linear-progress": !0,
            "mdc-linear-progress--indeterminate": n[3],
            "mdc-linear-progress--closed": n[4],
            "mdc-data-table__linear-progress": "data-table" === n[14],
            ...n[8],
          })),
        },
        { style: (A = Object.entries(n[10]).map(Ps).concat([n[2]]).join(" ")) },
        { role: "progressbar" },
        { "aria-valuemin": (C = 0) },
        { "aria-valuemax": (x = 1) },
        { "aria-valuenow": (L = n[3] ? void 0 : n[5]) },
        n[9],
        n[16],
      ],
      R = {};
    for (let e = 0; e < M.length; e += 1) R = t(R, M[e]);
    return {
      c() {
        (i = E("div")),
          (r = E("div")),
          (o = E("div")),
          (c = _()),
          (u = E("div")),
          (d = _()),
          (p = E("div")),
          (f = E("span")),
          (h = _()),
          (g = E("div")),
          (g.innerHTML =
            '<span class="mdc-linear-progress__bar-inner"></span>'),
          T(o, "class", "mdc-linear-progress__buffer-bar"),
          T(o, "style", (l = Object.entries(n[11]).map(ks).join(" "))),
          T(u, "class", "mdc-linear-progress__buffer-dots"),
          T(r, "class", "mdc-linear-progress__buffer"),
          T(f, "class", "mdc-linear-progress__bar-inner"),
          T(
            p,
            "class",
            "mdc-linear-progress__bar mdc-linear-progress__primary-bar"
          ),
          T(p, "style", (m = Object.entries(n[12]).map(Us).join(" "))),
          T(
            g,
            "class",
            "mdc-linear-progress__bar mdc-linear-progress__secondary-bar"
          ),
          O(i, R);
      },
      m(e, t) {
        v(e, i, t),
          I(i, r),
          I(r, o),
          I(r, c),
          I(r, u),
          I(i, d),
          I(i, p),
          I(p, f),
          I(i, h),
          I(i, g),
          n[19](i),
          D ||
            ((N = [
              $((w = tt.call(null, i, n[0]))),
              $(n[13].call(null, i)),
              S(i, "transitionend", n[20]),
            ]),
            (D = !0));
      },
      p(e, [t]) {
        2048 & t &&
          l !== (l = Object.entries(e[11]).map(ks).join(" ")) &&
          T(o, "style", l),
          4096 & t &&
            m !== (m = Object.entries(e[12]).map(Us).join(" ")) &&
            T(p, "style", m),
          O(
            i,
            (R = ue(M, [
              282 & t &&
                y !==
                  (y = We({
                    [e[1]]: !0,
                    "mdc-linear-progress": !0,
                    "mdc-linear-progress--indeterminate": e[3],
                    "mdc-linear-progress--closed": e[4],
                    "mdc-data-table__linear-progress": "data-table" === e[14],
                    ...e[8],
                  })) && { class: y },
              1028 & t &&
                A !==
                  (A = Object.entries(e[10])
                    .map(Ps)
                    .concat([e[2]])
                    .join(" ")) && { style: A },
              { role: "progressbar" },
              { "aria-valuemin": 0 },
              { "aria-valuemax": 1 },
              40 & t &&
                L !== (L = e[3] ? void 0 : e[5]) && { "aria-valuenow": L },
              512 & t && e[9],
              65536 & t && e[16],
            ]))
          ),
          w && s(w.update) && 1 & t && w.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && b(i), n[19](null), (D = !1), a(N);
      },
    };
  }
  const ks = ([e, t]) => `${e}: ${t};`,
    Us = ([e, t]) => `${e}: ${t};`,
    Ps = ([e, t]) => `${e}: ${t};`;
  function Hs(e, n, i) {
    const a = [
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
      r = m(n, a);
    const l = Ze(F());
    let c,
      u,
      { use: d = [] } = n,
      { class: p = "" } = n,
      { style: h = "" } = n,
      { indeterminate: $ = !1 } = n,
      { closed: I = !1 } = n,
      { progress: v = 0 } = n,
      { buffer: b } = n,
      y = {},
      E = {},
      A = {},
      C = {},
      _ = {},
      x = B("SMUI:linear-progress:context"),
      S = B("SMUI:linear-progress:closed");
    function T(e) {
      return e in y ? y[e] : U().classList.contains(e);
    }
    function O(e) {
      y[e] || i(8, (y[e] = !0), y);
    }
    function L(e) {
      (e in y && !y[e]) || i(8, (y[e] = !1), y);
    }
    function w(e, t) {
      E[e] !== t && i(9, (E[e] = t), E);
    }
    function D(e) {
      (e in E && null == E[e]) || i(9, (E[e] = void 0), E);
    }
    function N(e, t) {
      A[e] != t &&
        ("" === t || null == t
          ? (delete A[e], i(10, A))
          : i(10, (A[e] = t), A));
    }
    function M(e, t) {
      C[e] != t &&
        ("" === t || null == t
          ? (delete C[e], i(11, C))
          : i(11, (C[e] = t), C));
    }
    function R(e, t) {
      _[e] != t &&
        ("" === t || null == t
          ? (delete _[e], i(12, _))
          : i(12, (_[e] = t), _));
    }
    function U() {
      return c;
    }
    o(e, S, (e) => i(21, (s = e))),
      k(
        () => (
          i(
            6,
            (u = new Rs({
              addClass: O,
              forceLayout: () => {
                U().getBoundingClientRect();
              },
              setBufferBarStyle: M,
              setPrimaryBarStyle: R,
              hasClass: T,
              removeAttribute: D,
              removeClass: L,
              setAttribute: w,
              setStyle: N,
              attachResizeObserver: (e) => {
                const t = window.ResizeObserver;
                if (t) {
                  const n = new t(e);
                  return n.observe(U()), n;
                }
                return null;
              },
              getWidth: () => U().offsetWidth,
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
        (n = t(t({}, n), f(e))),
          i(16, (r = m(n, a))),
          "use" in e && i(0, (d = e.use)),
          "class" in e && i(1, (p = e.class)),
          "style" in e && i(2, (h = e.style)),
          "indeterminate" in e && i(3, ($ = e.indeterminate)),
          "closed" in e && i(4, (I = e.closed)),
          "progress" in e && i(5, (v = e.progress)),
          "buffer" in e && i(17, (b = e.buffer));
      }),
      (e.$$.update = () => {
        16 & e.$$.dirty && S && g(S, (s = I), s),
          72 & e.$$.dirty &&
            u &&
            u.isDeterminate() !== !$ &&
            u.setDeterminate(!$),
          96 & e.$$.dirty && u && u.getProgress() !== v && u.setProgress(v),
          131136 & e.$$.dirty &&
            u &&
            (null == b ? u.setBuffer(1) : u.setBuffer(b)),
          80 & e.$$.dirty && u && (I ? u.close() : u.open());
      }),
      [
        d,
        p,
        h,
        $,
        I,
        v,
        u,
        c,
        y,
        E,
        A,
        C,
        _,
        l,
        x,
        S,
        r,
        b,
        U,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (c = e), i(7, c);
          });
        },
        () => u && u.handleTransitionEnd(),
      ]
    );
  }
  class Bs extends $e {
    constructor(e) {
      super(),
        ge(this, e, Hs, Fs, r, {
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
   */ var Vs,
    js,
    zs = {
      ANCHOR: "mdc-menu-surface--anchor",
      ANIMATING_CLOSED: "mdc-menu-surface--animating-closed",
      ANIMATING_OPEN: "mdc-menu-surface--animating-open",
      FIXED: "mdc-menu-surface--fixed",
      IS_OPEN_BELOW: "mdc-menu-surface--is-open-below",
      OPEN: "mdc-menu-surface--open",
      ROOT: "mdc-menu-surface",
    },
    Gs = {
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
    qs = {
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
  })(Vs || (Vs = {})),
    (function (e) {
      (e[(e.TOP_LEFT = 0)] = "TOP_LEFT"),
        (e[(e.TOP_RIGHT = 4)] = "TOP_RIGHT"),
        (e[(e.BOTTOM_LEFT = 1)] = "BOTTOM_LEFT"),
        (e[(e.BOTTOM_RIGHT = 5)] = "BOTTOM_RIGHT"),
        (e[(e.TOP_START = 8)] = "TOP_START"),
        (e[(e.TOP_END = 12)] = "TOP_END"),
        (e[(e.BOTTOM_START = 9)] = "BOTTOM_START"),
        (e[(e.BOTTOM_END = 13)] = "BOTTOM_END");
    })(js || (js = {}));
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
  var Ks,
    Ws = (function (e) {
      function t(n) {
        var i = e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
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
          (i.anchorCorner = js.TOP_START),
          (i.originCorner = js.TOP_START),
          (i.anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 }),
          (i.position = { x: 0, y: 0 }),
          i
        );
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return zs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Gs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return qs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "Corner", {
          get: function () {
            return js;
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
          this.originCorner = this.originCorner ^ Vs.RIGHT;
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
                    }, qs.TRANSITION_OPEN_DURATION));
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
                  }, qs.TRANSITION_CLOSE_DURATION));
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
            a = this.hasBit(n, Vs.BOTTOM) ? "bottom" : "top",
            s = this.hasBit(n, Vs.RIGHT) ? "right" : "left",
            r = this.getHorizontalOriginOffset(n),
            o = this.getVerticalOriginOffset(n),
            l = this.measurements,
            c = l.anchorSize,
            u = l.surfaceSize,
            d = (((e = {})[s] = r), (e[a] = o), e);
          c.width / u.width > qs.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO &&
            (s = "center"),
            (this.isHoistedElement || this.isFixedPosition) &&
              this.adjustPositionForHoistedElement(d),
            this.adapter.setTransformOrigin(s + " " + a),
            this.adapter.setPosition(d),
            this.adapter.setMaxHeight(i ? i + "px" : ""),
            this.hasBit(n, Vs.BOTTOM) ||
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
            a = this.measurements,
            s = a.viewportDistance,
            r = a.anchorSize,
            o = a.surfaceSize,
            l = t.numbers.MARGIN_TO_EDGE;
          this.hasBit(this.anchorCorner, Vs.BOTTOM)
            ? ((e = s.top - l + this.anchorMargin.bottom),
              (n = s.bottom - l - this.anchorMargin.bottom))
            : ((e = s.top - l + this.anchorMargin.top),
              (n = s.bottom - l + r.height - this.anchorMargin.top)),
            !(n - o.height > 0) && e > n && (i = this.setBit(i, Vs.BOTTOM));
          var c,
            u,
            d = this.adapter.isRtl(),
            p = this.hasBit(this.anchorCorner, Vs.FLIP_RTL),
            f =
              this.hasBit(this.anchorCorner, Vs.RIGHT) ||
              this.hasBit(i, Vs.RIGHT),
            m = !1;
          (m = d && p ? !f : f)
            ? ((c = s.left + r.width + this.anchorMargin.right),
              (u = s.right - this.anchorMargin.right))
            : ((c = s.left + this.anchorMargin.left),
              (u = s.right + r.width - this.anchorMargin.left));
          var h = c - o.width > 0,
            g = u - o.width > 0,
            $ = this.hasBit(i, Vs.FLIP_RTL) && this.hasBit(i, Vs.RIGHT);
          return (
            (g && $ && d) || (!h && $)
              ? (i = this.unsetBit(i, Vs.RIGHT))
              : ((h && m && d) || (h && !m && f) || (!g && c >= u)) &&
                (i = this.setBit(i, Vs.RIGHT)),
            i
          );
        }),
        (t.prototype.getMenuSurfaceMaxHeight = function (e) {
          if (this.maxHeight > 0) return this.maxHeight;
          var n = this.measurements.viewportDistance,
            i = 0,
            a = this.hasBit(e, Vs.BOTTOM),
            s = this.hasBit(this.anchorCorner, Vs.BOTTOM),
            r = t.numbers.MARGIN_TO_EDGE;
          return (
            a
              ? ((i = n.top + this.anchorMargin.top - r),
                s || (i += this.measurements.anchorSize.height))
              : ((i =
                  n.bottom -
                  this.anchorMargin.bottom +
                  this.measurements.anchorSize.height -
                  r),
                s && (i -= this.measurements.anchorSize.height)),
            i
          );
        }),
        (t.prototype.getHorizontalOriginOffset = function (e) {
          var t = this.measurements.anchorSize,
            n = this.hasBit(e, Vs.RIGHT),
            i = this.hasBit(this.anchorCorner, Vs.RIGHT);
          if (n) {
            var a = i
              ? t.width - this.anchorMargin.left
              : this.anchorMargin.right;
            return this.isHoistedElement || this.isFixedPosition
              ? a -
                  (this.measurements.viewportSize.width -
                    this.measurements.bodySize.width)
              : a;
          }
          return i ? t.width - this.anchorMargin.right : this.anchorMargin.left;
        }),
        (t.prototype.getVerticalOriginOffset = function (e) {
          var t = this.measurements.anchorSize,
            n = this.hasBit(e, Vs.BOTTOM),
            i = this.hasBit(this.anchorCorner, Vs.BOTTOM);
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
            a = i.windowScroll,
            s = i.viewportDistance,
            r = i.surfaceSize,
            o = i.viewportSize,
            l = Object.keys(e);
          try {
            for (var c = _e(l), u = c.next(); !u.done; u = c.next()) {
              var d = u.value,
                p = e[d] || 0;
              !this.isHorizontallyCenteredOnViewport ||
              ("left" !== d && "right" !== d)
                ? ((p += s[d]),
                  this.isFixedPosition ||
                    ("top" === d
                      ? (p += a.y)
                      : "bottom" === d
                      ? (p -= a.y)
                      : "left" === d
                      ? (p += a.x)
                      : (p -= a.x)),
                  (e[d] = p))
                : (e[d] = (o.width - r.width) / 2);
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
            }, qs.TOUCH_EVENT_WAIT_MS);
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
    })(Se),
    Xs = {
      MENU_SELECTED_LIST_ITEM: "mdc-menu-item--selected",
      MENU_SELECTION_GROUP: "mdc-menu__selection-group",
      ROOT: "mdc-menu",
    },
    Ys = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_DISABLED_ATTR: "aria-disabled",
      CHECKBOX_SELECTOR: 'input[type="checkbox"]',
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      SELECTED_EVENT: "MDCMenu:selected",
      SKIP_RESTORE_FOCUS: "data-menu-item-skip-restore-focus",
    },
    Qs = { FOCUS_ROOT_INDEX: -1 };
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
  })(Ks || (Ks = {}));
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
  var Js = (function (e) {
      function t(n) {
        var i = e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
        return (
          (i.closeAnimationEndTimerId = 0),
          (i.defaultFocusState = Ks.LIST_ROOT),
          (i.selectedIndex = -1),
          i
        );
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Xs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Ys;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Qs;
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
                Ys.SKIP_RESTORE_FOCUS
              );
            this.adapter.closeSurface(i),
              (this.closeAnimationEndTimerId = setTimeout(function () {
                var n = t.adapter.getElementIndex(e);
                n >= 0 &&
                  t.adapter.isSelectableItemAtIndex(n) &&
                  t.setSelectedIndex(n);
              }, Ws.numbers.TRANSITION_CLOSE_DURATION));
          }
        }),
        (t.prototype.handleMenuSurfaceOpened = function () {
          switch (this.defaultFocusState) {
            case Ks.FIRST_ITEM:
              this.adapter.focusItemAtIndex(0);
              break;
            case Ks.LAST_ITEM:
              this.adapter.focusItemAtIndex(
                this.adapter.getMenuItemCount() - 1
              );
              break;
            case Ks.NONE:
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
              Ys.ARIA_CHECKED_ATTR
            ),
            this.adapter.removeClassFromElementAtIndex(
              t,
              Xs.MENU_SELECTED_LIST_ITEM
            )),
            this.adapter.addClassToElementAtIndex(
              e,
              Xs.MENU_SELECTED_LIST_ITEM
            ),
            this.adapter.addAttributeToElementAtIndex(
              e,
              Ys.ARIA_CHECKED_ATTR,
              "true"
            ),
            (this.selectedIndex = e);
        }),
        (t.prototype.setEnabled = function (e, t) {
          this.validatedIndex(e),
            t
              ? (this.adapter.removeClassFromElementAtIndex(
                  e,
                  ja.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  e,
                  Ys.ARIA_DISABLED_ATTR,
                  "false"
                ))
              : (this.adapter.addClassToElementAtIndex(
                  e,
                  ja.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  e,
                  Ys.ARIA_DISABLED_ATTR,
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
    })(Se),
    Zs = {
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
    er = {
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
    tr = { LABEL_SCALE: 0.75, UNSET_INDEX: -1, CLICK_DEBOUNCE_TIMEOUT_MS: 330 },
    nr = (function (e) {
      function t(n, i) {
        void 0 === i && (i = {});
        var a = e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
        return (
          (a.disabled = !1),
          (a.isMenuOpen = !1),
          (a.useDefaultValidation = !0),
          (a.customValidity = !0),
          (a.lastSelectedIndex = tr.UNSET_INDEX),
          (a.clickDebounceTimeout = 0),
          (a.recentlyClicked = !1),
          (a.leadingIcon = i.leadingIcon),
          (a.helperText = i.helperText),
          a
        );
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Zs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return tr;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return er;
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
              (e === tr.UNSET_INDEX
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
          return e !== tr.UNSET_INDEX ? t[e] : "";
        }),
        (t.prototype.getDisabled = function () {
          return this.disabled;
        }),
        (t.prototype.setDisabled = function (e) {
          (this.disabled = e),
            this.disabled
              ? (this.adapter.addClass(Zs.DISABLED), this.adapter.closeMenu())
              : this.adapter.removeClass(Zs.DISABLED),
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
          this.adapter.addClass(Zs.ACTIVATED),
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
              t = this.adapter.hasClass(Zs.FOCUSED),
              n = e || t,
              i = this.adapter.hasClass(Zs.REQUIRED);
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
          this.adapter.removeClass(Zs.ACTIVATED),
            (this.isMenuOpen = !1),
            this.adapter.isSelectAnchorFocused() || this.blur();
        }),
        (t.prototype.handleChange = function () {
          this.layout(),
            this.adapter.notifyChange(this.getValue()),
            this.adapter.hasClass(Zs.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (t.prototype.handleMenuItemAction = function (e) {
          this.setSelectedIndex(e, !0);
        }),
        (t.prototype.handleFocus = function () {
          this.adapter.addClass(Zs.FOCUSED),
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
          if (!this.isMenuOpen && this.adapter.hasClass(Zs.FOCUSED)) {
            var t = Jn(e) === En,
              n = Jn(e) === An,
              i = Jn(e) === On,
              a = Jn(e) === wn;
            if (
              !(e.ctrlKey || e.metaKey) &&
              ((!n && e.key && 1 === e.key.length) ||
                (n && this.adapter.isTypeaheadInProgress()))
            ) {
              var s = n ? " " : e.key,
                r = this.adapter.typeaheadMatchItem(s, this.getSelectedIndex());
              return (
                r >= 0 && this.setSelectedIndex(r), void e.preventDefault()
              );
            }
            (t || n || i || a) &&
              (i && this.getSelectedIndex() > 0
                ? this.setSelectedIndex(this.getSelectedIndex() - 1)
                : a &&
                  this.getSelectedIndex() <
                    this.adapter.getMenuItemCount() - 1 &&
                  this.setSelectedIndex(this.getSelectedIndex() + 1),
              this.openMenu(),
              e.preventDefault());
          }
        }),
        (t.prototype.notchOutline = function (e) {
          if (this.adapter.hasOutline()) {
            var t = this.adapter.hasClass(Zs.FOCUSED);
            if (e) {
              var n = tr.LABEL_SCALE,
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
              ? (this.adapter.removeClass(Zs.INVALID),
                this.adapter.removeMenuClass(Zs.MENU_INVALID))
              : (this.adapter.addClass(Zs.INVALID),
                this.adapter.addMenuClass(Zs.MENU_INVALID)),
            this.syncHelperTextValidity(e);
        }),
        (t.prototype.isValid = function () {
          return this.useDefaultValidation &&
            this.adapter.hasClass(Zs.REQUIRED) &&
            !this.adapter.hasClass(Zs.DISABLED)
            ? this.getSelectedIndex() !== tr.UNSET_INDEX &&
                (0 !== this.getSelectedIndex() || Boolean(this.getValue()))
            : this.customValidity;
        }),
        (t.prototype.setRequired = function (e) {
          e
            ? this.adapter.addClass(Zs.REQUIRED)
            : this.adapter.removeClass(Zs.REQUIRED),
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
            this.adapter.setMenuAnchorCorner(js.BOTTOM_START)),
            this.adapter.setMenuWrapFocus(!1),
            this.setDisabled(this.adapter.hasClass(Zs.DISABLED)),
            this.syncHelperTextValidity(!this.adapter.hasClass(Zs.INVALID)),
            this.layout(),
            this.layoutOptions();
        }),
        (t.prototype.blur = function () {
          this.adapter.removeClass(Zs.FOCUSED),
            this.layout(),
            this.adapter.deactivateBottomLine(),
            this.adapter.hasClass(Zs.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (t.prototype.syncHelperTextValidity = function (e) {
          if (this.helperText) {
            this.helperText.setValidity(e);
            var t = this.helperText.isVisible(),
              n = this.helperText.getId();
            t && n
              ? this.adapter.setSelectAnchorAttr(er.ARIA_DESCRIBEDBY, n)
              : this.adapter.removeSelectAnchorAttr(er.ARIA_DESCRIBEDBY);
          }
        }),
        (t.prototype.setClickDebounceTimeout = function () {
          var e = this;
          clearTimeout(this.clickDebounceTimeout),
            (this.clickDebounceTimeout = setTimeout(function () {
              e.recentlyClicked = !1;
            }, tr.CLICK_DEBOUNCE_TIMEOUT_MS)),
            (this.recentlyClicked = !0);
        }),
        t
      );
    })(Se),
    ir = { ARIA_HIDDEN: "aria-hidden", ROLE: "role" },
    ar = {
      HELPER_TEXT_VALIDATION_MSG: "mdc-select-helper-text--validation-msg",
      HELPER_TEXT_VALIDATION_MSG_PERSISTENT:
        "mdc-select-helper-text--validation-msg-persistent",
    },
    sr = (function (e) {
      function t(n) {
        return e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return ar;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return ir;
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
          return "true" !== this.adapter.getAttr(ir.ARIA_HIDDEN);
        }),
        (t.prototype.setContent = function (e) {
          this.adapter.setContent(e);
        }),
        (t.prototype.setValidation = function (e) {
          e
            ? this.adapter.addClass(ar.HELPER_TEXT_VALIDATION_MSG)
            : this.adapter.removeClass(ar.HELPER_TEXT_VALIDATION_MSG);
        }),
        (t.prototype.setValidationMsgPersistent = function (e) {
          e
            ? this.adapter.addClass(ar.HELPER_TEXT_VALIDATION_MSG_PERSISTENT)
            : this.adapter.removeClass(
                ar.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
              );
        }),
        (t.prototype.setValidity = function (e) {
          if (this.adapter.hasClass(ar.HELPER_TEXT_VALIDATION_MSG)) {
            var t = this.adapter.hasClass(
              ar.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
            );
            if (!e || t)
              return (
                this.showToScreenReader(),
                void (e
                  ? this.adapter.removeAttr(ir.ROLE)
                  : this.adapter.setAttr(ir.ROLE, "alert"))
              );
            this.adapter.removeAttr(ir.ROLE), this.hide();
          }
        }),
        (t.prototype.showToScreenReader = function () {
          this.adapter.removeAttr(ir.ARIA_HIDDEN);
        }),
        (t.prototype.hide = function () {
          this.adapter.setAttr(ir.ARIA_HIDDEN, "true");
        }),
        t
      );
    })(Se);
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
   */ const { document: rr } = le;
  function or(e) {
    let n, i, r, o, c, f, m, h;
    const g = e[31].default,
      I = l(g, e, e[30], null);
    let y = [
        {
          class: (r = We({
            [e[2]]: !0,
            "mdc-menu-surface": !0,
            "mdc-menu-surface--fixed": e[5],
            "mdc-menu-surface--open": e[4],
            "smui-menu-surface--static": e[4],
            "mdc-menu-surface--fullwidth": e[7],
            ...e[10],
          })),
        },
        { style: (o = Object.entries(e[11]).map(lr).concat([e[3]]).join(" ")) },
        e[13],
      ],
      A = {};
    for (let e = 0; e < y.length; e += 1) A = t(A, y[e]);
    return {
      c() {
        (n = _()), (i = E("div")), I && I.c(), O(i, A);
      },
      m(t, a) {
        v(t, n, a),
          v(t, i, a),
          I && I.m(i, null),
          e[33](i),
          (f = !0),
          m ||
            ((h = [
              S(rr.body, "click", e[32], !0),
              $((c = tt.call(null, i, e[1]))),
              $(e[12].call(null, i)),
              S(i, "keydown", e[34]),
            ]),
            (m = !0));
      },
      p(e, t) {
        I &&
          I.p &&
          (!f || 1073741824 & t[0]) &&
          d(I, g, e, e[30], f ? u(g, e[30], t, null) : p(e[30]), null),
          O(
            i,
            (A = ue(y, [
              (!f ||
                (1204 & t[0] &&
                  r !==
                    (r = We({
                      [e[2]]: !0,
                      "mdc-menu-surface": !0,
                      "mdc-menu-surface--fixed": e[5],
                      "mdc-menu-surface--open": e[4],
                      "smui-menu-surface--static": e[4],
                      "mdc-menu-surface--fullwidth": e[7],
                      ...e[10],
                    })))) && { class: r },
              (!f ||
                (2056 & t[0] &&
                  o !==
                    (o = Object.entries(e[11])
                      .map(lr)
                      .concat([e[3]])
                      .join(" ")))) && { style: o },
              8192 & t[0] && e[13],
            ]))
          ),
          c && s(c.update) && 2 & t[0] && c.update.call(null, e[1]);
      },
      i(e) {
        f || (re(I, e), (f = !0));
      },
      o(e) {
        oe(I, e), (f = !1);
      },
      d(t) {
        t && b(n), t && b(i), I && I.d(t), e[33](null), (m = !1), a(h);
      },
    };
  }
  const lr = ([e, t]) => `${e}: ${t};`;
  function cr(e, n, i) {
    const a = [
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
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n;
    var l, c, u;
    const d = Ze(F());
    let p,
      h,
      g,
      { use: $ = [] } = n,
      { class: I = "" } = n,
      { style: v = "" } = n,
      { static: b = !1 } = n,
      { anchor: y = !0 } = n,
      { fixed: E = !1 } = n,
      { open: A = b } = n,
      { managed: C = !1 } = n,
      { fullWidth: _ = !1 } = n,
      { quickOpen: x = !1 } = n,
      { anchorElement: S } = n,
      { anchorCorner: T } = n,
      { anchorMargin: O = { top: 0, right: 0, bottom: 0, left: 0 } } = n,
      { maxHeight: L = 0 } = n,
      { horizontallyCenteredOnViewport: w = !1 } = n,
      D = {},
      N = {};
    H("SMUI:list:role", "menu"), H("SMUI:list:item:role", "menuitem");
    const M = js;
    function R(e) {
      return e in D ? D[e] : j().classList.contains(e);
    }
    function P(e) {
      D[e] || i(10, (D[e] = !0), D);
    }
    function B(e) {
      (e in D && !D[e]) || i(10, (D[e] = !1), D);
    }
    function V(e) {
      h.close(e), i(0, (A = !1));
    }
    function j() {
      return p;
    }
    k(() => {
      i(
        9,
        (h = new Ws({
          addClass: P,
          removeClass: B,
          hasClass: R,
          hasAnchor: () => !!S,
          notifyClose: () => {
            C || i(0, (A = b)),
              A || Xe(p, "SMUIMenuSurface:closed", void 0, void 0, !0);
          },
          notifyClosing: () => {
            C || i(0, (A = b)),
              A || Xe(p, "SMUIMenuSurface:closing", void 0, void 0, !0);
          },
          notifyOpen: () => {
            C || i(0, (A = !0)),
              A && Xe(p, "SMUIMenuSurface:opened", void 0, void 0, !0);
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
        Xe(p, "SMUIMenuSurface:mount", {
          get open() {
            return A;
          },
          set open(e) {
            i(0, (A = e));
          },
          closeProgrammatic: V,
        }),
        h.init(),
        () => {
          var e;
          const t = h.isHoistedElement;
          h.destroy(),
            t &&
              (null === (e = p.parentNode) || void 0 === e || e.removeChild(p));
        }
      );
    }),
      U(() => {
        var e;
        y &&
          p &&
          (null === (e = p.parentElement) ||
            void 0 === e ||
            e.classList.remove("mdc-menu-surface--anchor"));
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(13, (s = m(n, a))),
          "use" in e && i(1, ($ = e.use)),
          "class" in e && i(2, (I = e.class)),
          "style" in e && i(3, (v = e.style)),
          "static" in e && i(4, (b = e.static)),
          "anchor" in e && i(15, (y = e.anchor)),
          "fixed" in e && i(5, (E = e.fixed)),
          "open" in e && i(0, (A = e.open)),
          "managed" in e && i(6, (C = e.managed)),
          "fullWidth" in e && i(7, (_ = e.fullWidth)),
          "quickOpen" in e && i(16, (x = e.quickOpen)),
          "anchorElement" in e && i(14, (S = e.anchorElement)),
          "anchorCorner" in e && i(17, (T = e.anchorCorner)),
          "anchorMargin" in e && i(18, (O = e.anchorMargin)),
          "maxHeight" in e && i(19, (L = e.maxHeight)),
          "horizontallyCenteredOnViewport" in e &&
            i(20, (w = e.horizontallyCenteredOnViewport)),
          "$$scope" in e && i(30, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        939557120 & e.$$.dirty[0] &&
          p &&
          y &&
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
            h &&
            h.isOpen() !== A &&
            (A ? h.open() : h.close()),
          66048 & e.$$.dirty[0] && h && h.setQuickOpen(x),
          544 & e.$$.dirty[0] && h && h.setFixedPosition(E),
          524800 & e.$$.dirty[0] && h && h.setMaxHeight(L),
          1049088 & e.$$.dirty[0] &&
            h &&
            h.setIsHorizontallyCenteredOnViewport(w),
          131584 & e.$$.dirty[0] &&
            h &&
            null != T &&
            ("string" == typeof T
              ? h.setAnchorCorner(M[T])
              : h.setAnchorCorner(T)),
          262656 & e.$$.dirty[0] && h && h.setAnchorMargin(O);
      }),
      [
        A,
        $,
        I,
        v,
        b,
        E,
        C,
        _,
        p,
        h,
        D,
        N,
        d,
        s,
        S,
        y,
        x,
        T,
        O,
        L,
        w,
        function () {
          return A;
        },
        function (e) {
          i(0, (A = e));
        },
        function (e, t) {
          return h.setAbsolutePosition(e, t);
        },
        function (e) {
          return h.setIsHoisted(e);
        },
        function () {
          return h.isFixed();
        },
        j,
        l,
        c,
        u,
        o,
        r,
        (e) => h && A && !C && h.handleBodyClick(e),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (p = e), i(8, p);
          });
        },
        (e) => h && h.handleKeydown(e),
      ]
    );
  }
  class ur extends $e {
    constructor(e) {
      super(),
        ge(
          this,
          e,
          cr,
          or,
          r,
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
  function dr(
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
  function pr(e) {
    let t;
    const n = e[16].default,
      i = l(n, e, e[21], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 2097152 & a) &&
          d(i, n, e, e[21], t ? u(n, e[21], a, null) : p(e[21]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function fr(e) {
    let n, i, a;
    const s = [
      { use: e[5] },
      { class: We({ [e[1]]: !0, "mdc-menu": !0 }) },
      e[9],
    ];
    function r(t) {
      e[18](t);
    }
    let o = { $$slots: { default: [pr] }, $$scope: { ctx: e } };
    for (let e = 0; e < s.length; e += 1) o = t(o, s[e]);
    return (
      void 0 !== e[0] && (o.open = e[0]),
      (n = new ur({ props: o })),
      e[17](n),
      z.push(() => pe(n, "open", r)),
      n.$on("SMUIMenuSurface:mount", e[7]),
      n.$on("SMUIList:mount", e[8]),
      n.$on("SMUIMenuSurface:opened", e[19]),
      n.$on("keydown", e[6]),
      n.$on("SMUIList:action", e[20]),
      {
        c() {
          fe(n.$$.fragment);
        },
        m(e, t) {
          me(n, e, t), (a = !0);
        },
        p(e, [t]) {
          const a =
            546 & t
              ? ue(s, [
                  32 & t && { use: e[5] },
                  2 & t && { class: We({ [e[1]]: !0, "mdc-menu": !0 }) },
                  512 & t && de(e[9]),
                ])
              : {};
          2097152 & t && (a.$$scope = { dirty: t, ctx: e }),
            !i && 1 & t && ((i = !0), (a.open = e[0]), Q(() => (i = !1))),
            n.$set(a);
        },
        i(e) {
          a || (re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[17](null), he(n, t);
        },
      }
    );
  }
  function mr(e, n, i) {
    let a;
    const s = [
      "use",
      "class",
      "open",
      "isOpen",
      "setOpen",
      "setDefaultFocusState",
      "getSelectedIndex",
      "getElement",
    ];
    let r = m(n, s),
      { $$slots: o = {}, $$scope: l } = n;
    const { closest: c } = we,
      u = Ze(F());
    let d,
      p,
      h,
      g,
      { use: $ = [] } = n,
      { class: I = "" } = n,
      { open: v = !1 } = n;
    function b() {
      return d.getElement();
    }
    k(
      () => (
        i(
          3,
          (p = new Js({
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
            closeSurface: (e) => h.closeProgrammatic(e),
            getElementIndex: (e) =>
              g
                .getOrderedList()
                .map((e) => e.element)
                .indexOf(e),
            notifySelected: (e) =>
              Xe(
                b(),
                "SMUIMenu:selected",
                { index: e.index, item: g.getOrderedList()[e.index].element },
                void 0,
                !0
              ),
            getMenuItemCount: () => g.items.length,
            focusItemAtIndex: (e) => g.focusItemAtIndex(e),
            focusListRoot: () => "focus" in g.element && g.element.focus(),
            isSelectableItemAtIndex: (e) =>
              !!c(g.getOrderedList()[e].element, `.${Xs.MENU_SELECTION_GROUP}`),
            getSelectedSiblingOfItemAtIndex: (e) => {
              const t = g.getOrderedList(),
                n = c(t[e].element, `.${Xs.MENU_SELECTION_GROUP}`),
                i =
                  null == n
                    ? void 0
                    : n.querySelector(`.${Xs.MENU_SELECTED_LIST_ITEM}`);
              return i ? t.map((e) => e.element).indexOf(i) : -1;
            },
          }))
        ),
        Xe(b(), "SMUIMenu:mount", p),
        p.init(),
        () => {
          p.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(9, (r = m(n, s))),
          "use" in e && i(10, ($ = e.use)),
          "class" in e && i(1, (I = e.class)),
          "open" in e && i(0, (v = e.open)),
          "$$scope" in e && i(21, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        1024 & e.$$.dirty && i(5, (a = [u, ...$]));
      }),
      [
        v,
        I,
        d,
        p,
        g,
        a,
        function (e) {
          p && p.handleKeydown(e);
        },
        function (e) {
          h || (h = e.detail);
        },
        function (e) {
          g || i(4, (g = e.detail));
        },
        r,
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
        b,
        o,
        function (e) {
          z[e ? "unshift" : "push"](() => {
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
  class hr extends $e {
    constructor(e) {
      super(),
        ge(this, e, mr, fr, r, {
          use: 10,
          class: 1,
          open: 0,
          isOpen: 11,
          setOpen: 12,
          setDefaultFocusState: 13,
          getSelectedIndex: 14,
          getElement: 15,
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
    get getElement() {
      return this.$$.ctx[15];
    }
  }
  function gr(t) {
    let n;
    return {
      c() {
        n = C(t[8]);
      },
      m(e, t) {
        v(e, n, t);
      },
      p(e, t) {
        256 & t && L(n, e[8]);
      },
      i: e,
      o: e,
      d(e) {
        e && b(n);
      },
    };
  }
  function $r(e) {
    let t;
    const n = e[13].default,
      i = l(n, e, e[12], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 4096 & a) &&
          d(i, n, e, e[12], t ? u(n, e[12], a, null) : p(e[12]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Ir(e) {
    let n, i, r, o, l, c, u, d, p;
    const f = [$r, gr],
      m = [];
    function h(e, t) {
      return null == e[8] ? 0 : 1;
    }
    (i = h(e)), (r = m[i] = f[i](e));
    let g = [
        {
          class: (o = We({
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
      I = {};
    for (let e = 0; e < g.length; e += 1) I = t(I, g[e]);
    return {
      c() {
        (n = E("div")), r.c(), O(n, I);
      },
      m(t, a) {
        v(t, n, a),
          m[i].m(n, null),
          e[14](n),
          (u = !0),
          d ||
            ((p = [$((c = tt.call(null, n, e[0]))), $(e[9].call(null, n))]),
            (d = !0));
      },
      p(e, [t]) {
        let a = i;
        (i = h(e)),
          i === a
            ? m[i].p(e, t)
            : (ae(),
              oe(m[a], 1, 1, () => {
                m[a] = null;
              }),
              se(),
              (r = m[i]),
              r ? r.p(e, t) : ((r = m[i] = f[i](e)), r.c()),
              re(r, 1),
              r.m(n, null)),
          O(
            n,
            (I = ue(g, [
              (!u ||
                (90 & t &&
                  o !==
                    (o = We({
                      [e[1]]: !0,
                      "mdc-select-helper-text": !0,
                      "mdc-select-helper-text--validation-msg": e[4],
                      "mdc-select-helper-text--validation-msg-persistent": e[3],
                      ...e[6],
                    })))) && { class: o },
              (!u || (8 & t && l !== (l = e[3] ? void 0 : "true"))) && {
                "aria-hidden": l,
              },
              (!u || 4 & t) && { id: e[2] },
              128 & t && e[7],
              1024 & t && e[10],
            ]))
          ),
          c && s(c.update) && 1 & t && c.update.call(null, e[0]);
      },
      i(e) {
        u || (re(r), (u = !0));
      },
      o(e) {
        oe(r), (u = !1);
      },
      d(t) {
        t && b(n), m[i].d(), e[14](null), (d = !1), a(p);
      },
    };
  }
  gt({ class: "mdc-menu__selection-group-icon", component: gs });
  let vr = 0;
  function br(e, n, i) {
    const a = [
      "use",
      "class",
      "id",
      "persistent",
      "validationMsg",
      "getElement",
    ];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n;
    const l = Ze(F());
    let c,
      u,
      d,
      { use: p = [] } = n,
      { class: h = "" } = n,
      { id: g = "SMUI-select-helper-text-" + vr++ } = n,
      { persistent: $ = !1 } = n,
      { validationMsg: I = !1 } = n,
      v = {},
      b = {};
    function y(e) {
      return e in v ? v[e] : S().classList.contains(e);
    }
    function E(e) {
      v[e] || i(6, (v[e] = !0), v);
    }
    function A(e) {
      (e in v && !v[e]) || i(6, (v[e] = !1), v);
    }
    function C(e) {
      var t;
      return e in b
        ? null !== (t = b[e]) && void 0 !== t
          ? t
          : null
        : S().getAttribute(e);
    }
    function _(e, t) {
      b[e] !== t && i(7, (b[e] = t), b);
    }
    function x(e) {
      (e in b && null == b[e]) || i(7, (b[e] = void 0), b);
    }
    function S() {
      return c;
    }
    return (
      k(
        () => (
          (u = new sr({
            addClass: E,
            removeClass: A,
            hasClass: y,
            getAttr: C,
            setAttr: _,
            removeAttr: x,
            setContent: (e) => {
              i(8, (d = e));
            },
          })),
          g.startsWith("SMUI-select-helper-text-") &&
            Xe(S(), "SMUISelectHelperText:id", g),
          Xe(S(), "SMUISelectHelperText:mount", u),
          u.init(),
          () => {
            Xe(S(), "SMUISelectHelperText:unmount", u), u.destroy();
          }
        )
      ),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(10, (s = m(n, a))),
          "use" in e && i(0, (p = e.use)),
          "class" in e && i(1, (h = e.class)),
          "id" in e && i(2, (g = e.id)),
          "persistent" in e && i(3, ($ = e.persistent)),
          "validationMsg" in e && i(4, (I = e.validationMsg)),
          "$$scope" in e && i(12, (o = e.$$scope));
      }),
      [
        p,
        h,
        g,
        $,
        I,
        c,
        v,
        b,
        d,
        l,
        s,
        S,
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (c = e), i(5, c);
          });
        },
      ]
    );
  }
  class yr extends $e {
    constructor(e) {
      super(),
        ge(this, e, br, Ir, r, {
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
  const Er = (e) => ({}),
    Ar = (e) => ({}),
    Cr = (e) => ({}),
    _r = (e) => ({}),
    xr = (e) => ({}),
    Sr = (e) => ({}),
    Tr = (e) => ({}),
    Or = (e) => ({});
  function Lr(e) {
    let n,
      i = [
        { type: "hidden" },
        { required: e[10] },
        { disabled: e[6] },
        { value: e[0] },
        et(e[53], "input$"),
      ],
      a = {};
    for (let e = 0; e < i.length; e += 1) a = t(a, i[e]);
    return {
      c() {
        (n = E("input")), O(n, a);
      },
      m(e, t) {
        v(e, n, t), n.autofocus && n.focus();
      },
      p(e, t) {
        O(
          n,
          (a = ue(i, [
            { type: "hidden" },
            1024 & t[0] && { required: e[10] },
            64 & t[0] && { disabled: e[6] },
            1 & t[0] && { value: e[0] },
            4194304 & t[1] && et(e[53], "input$"),
          ]))
        );
      },
      d(e) {
        e && b(n);
      },
    };
  }
  function wr(e) {
    let t;
    return {
      c() {
        (t = E("span")), T(t, "class", "mdc-select__ripple");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Dr(e) {
    let n, i;
    const a = [
      { id: e[11] + "-smui-label" },
      { floatAbove: "" !== e[43] },
      { required: e[10] },
      et(e[53], "label$"),
    ];
    let s = { $$slots: { default: [Nr] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) s = t(s, a[e]);
    return (
      (n = new hi({ props: s })),
      e[66](n),
      {
        c() {
          fe(n.$$.fragment);
        },
        m(e, t) {
          me(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (3072 & t[0]) | (4198400 & t[1])
              ? ue(a, [
                  2048 & t[0] && { id: e[11] + "-smui-label" },
                  4096 & t[1] && { floatAbove: "" !== e[43] },
                  1024 & t[0] && { required: e[10] },
                  4194304 & t[1] && de(et(e[53], "label$")),
                ])
              : {};
          (512 & t[0]) | (134217728 & t[2]) &&
            (i.$$scope = { dirty: t, ctx: e }),
            n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[66](null), he(n, t);
        },
      }
    );
  }
  function Nr(e) {
    let t,
      n,
      i = (null == e[9] ? "" : e[9]) + "";
    const a = e[63].label,
      s = l(a, e, e[89], Or);
    return {
      c() {
        (t = C(i)), s && s.c();
      },
      m(e, i) {
        v(e, t, i), s && s.m(e, i), (n = !0);
      },
      p(e, r) {
        (!n || 512 & r[0]) &&
          i !== (i = (null == e[9] ? "" : e[9]) + "") &&
          L(t, i),
          s &&
            s.p &&
            (!n || 134217728 & r[2]) &&
            d(s, a, e, e[89], n ? u(a, e[89], r, Tr) : p(e[89]), Or);
      },
      i(e) {
        n || (re(s, e), (n = !0));
      },
      o(e) {
        oe(s, e), (n = !1);
      },
      d(e) {
        e && b(t), s && s.d(e);
      },
    };
  }
  function Mr(e) {
    let n, i;
    const a = [
      { noLabel: e[8] || (null == e[9] && !e[52].label) },
      et(e[53], "outline$"),
    ];
    let s = { $$slots: { default: [kr] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) s = t(s, a[e]);
    return (
      (n = new Ci({ props: s })),
      e[68](n),
      {
        c() {
          fe(n.$$.fragment);
        },
        m(e, t) {
          me(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (768 & t[0]) | (6291456 & t[1])
              ? ue(a, [
                  (768 & t[0]) | (2097152 & t[1]) && {
                    noLabel: e[8] || (null == e[9] && !e[52].label),
                  },
                  4194304 & t[1] && de(et(e[53], "outline$")),
                ])
              : {};
          (3840 & t[0]) | (6296064 & t[1]) | (134217728 & t[2]) &&
            (i.$$scope = { dirty: t, ctx: e }),
            n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[68](null), he(n, t);
        },
      }
    );
  }
  function Rr(e) {
    let n, i;
    const a = [
      { id: e[11] + "-smui-label" },
      { floatAbove: "" !== e[43] },
      { required: e[10] },
      et(e[53], "label$"),
    ];
    let s = { $$slots: { default: [Fr] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) s = t(s, a[e]);
    return (
      (n = new hi({ props: s })),
      e[67](n),
      {
        c() {
          fe(n.$$.fragment);
        },
        m(e, t) {
          me(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (3072 & t[0]) | (4198400 & t[1])
              ? ue(a, [
                  2048 & t[0] && { id: e[11] + "-smui-label" },
                  4096 & t[1] && { floatAbove: "" !== e[43] },
                  1024 & t[0] && { required: e[10] },
                  4194304 & t[1] && de(et(e[53], "label$")),
                ])
              : {};
          (512 & t[0]) | (134217728 & t[2]) &&
            (i.$$scope = { dirty: t, ctx: e }),
            n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[67](null), he(n, t);
        },
      }
    );
  }
  function Fr(e) {
    let t,
      n,
      i = (null == e[9] ? "" : e[9]) + "";
    const a = e[63].label,
      s = l(a, e, e[89], Sr);
    return {
      c() {
        (t = C(i)), s && s.c();
      },
      m(e, i) {
        v(e, t, i), s && s.m(e, i), (n = !0);
      },
      p(e, r) {
        (!n || 512 & r[0]) &&
          i !== (i = (null == e[9] ? "" : e[9]) + "") &&
          L(t, i),
          s &&
            s.p &&
            (!n || 134217728 & r[2]) &&
            d(s, a, e, e[89], n ? u(a, e[89], r, xr) : p(e[89]), Sr);
      },
      i(e) {
        n || (re(s, e), (n = !0));
      },
      o(e) {
        oe(s, e), (n = !1);
      },
      d(e) {
        e && b(t), s && s.d(e);
      },
    };
  }
  function kr(e) {
    let t,
      n,
      i = !e[8] && (null != e[9] || e[52].label) && Rr(e);
    return {
      c() {
        i && i.c(), (t = x());
      },
      m(e, a) {
        i && i.m(e, a), v(e, t, a), (n = !0);
      },
      p(e, n) {
        e[8] || (null == e[9] && !e[52].label)
          ? i &&
            (ae(),
            oe(i, 1, 1, () => {
              i = null;
            }),
            se())
          : i
          ? (i.p(e, n), (768 & n[0]) | (2097152 & n[1]) && re(i, 1))
          : ((i = Rr(e)), i.c(), re(i, 1), i.m(t.parentNode, t));
      },
      i(e) {
        n || (re(i), (n = !0));
      },
      o(e) {
        oe(i), (n = !1);
      },
      d(e) {
        i && i.d(e), e && b(t);
      },
    };
  }
  function Ur(e) {
    let n, i;
    const a = [et(e[53], "ripple$")];
    let s = {};
    for (let e = 0; e < a.length; e += 1) s = t(s, a[e]);
    return (
      (n = new vi({ props: s })),
      e[70](n),
      {
        c() {
          fe(n.$$.fragment);
        },
        m(e, t) {
          me(n, e, t), (i = !0);
        },
        p(e, t) {
          const i = 4194304 & t[1] ? ue(a, [de(et(e[53], "ripple$"))]) : {};
          n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[70](null), he(n, t);
        },
      }
    );
  }
  function Pr(e) {
    let t;
    const n = e[63].default,
      i = l(n, e, e[89], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 134217728 & a[2]) &&
          d(i, n, e, e[89], t ? u(n, e[89], a, null) : p(e[89]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Hr(e) {
    let n, i, a;
    const s = [{ role: "listbox" }, { wrapFocus: e[36] }, et(e[53], "list$")];
    function r(t) {
      e[76](t);
    }
    let o = { $$slots: { default: [Pr] }, $$scope: { ctx: e } };
    for (let e = 0; e < s.length; e += 1) o = t(o, s[e]);
    return (
      void 0 !== e[24] && (o.selectedIndex = e[24]),
      (n = new is({ props: o })),
      z.push(() => pe(n, "selectedIndex", r)),
      n.$on("SMUIList:mount", e[77]),
      {
        c() {
          fe(n.$$.fragment);
        },
        m(e, t) {
          me(n, e, t), (a = !0);
        },
        p(e, t) {
          const a =
            4194336 & t[1]
              ? ue(s, [
                  s[0],
                  32 & t[1] && { wrapFocus: e[36] },
                  4194304 & t[1] && de(et(e[53], "list$")),
                ])
              : {};
          134217728 & t[2] && (a.$$scope = { dirty: t, ctx: e }),
            !i &&
              16777216 & t[0] &&
              ((i = !0), (a.selectedIndex = e[24]), Q(() => (i = !1))),
            n.$set(a);
        },
        i(e) {
          a || (re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (a = !1);
        },
        d(e) {
          he(n, e);
        },
      }
    );
  }
  function Br(e) {
    let n, i;
    const a = [et(e[53], "helperText$")];
    let s = { $$slots: { default: [Vr] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) s = t(s, a[e]);
    return (
      (n = new yr({ props: s })),
      n.$on("SMUISelectHelperText:id", e[86]),
      n.$on("SMUISelectHelperText:mount", e[87]),
      n.$on("SMUISelectHelperText:unmount", e[88]),
      {
        c() {
          fe(n.$$.fragment);
        },
        m(e, t) {
          me(n, e, t), (i = !0);
        },
        p(e, t) {
          const i = 4194304 & t[1] ? ue(a, [de(et(e[53], "helperText$"))]) : {};
          134217728 & t[2] && (i.$$scope = { dirty: t, ctx: e }), n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(e) {
          he(n, e);
        },
      }
    );
  }
  function Vr(e) {
    let t;
    const n = e[63].helperText,
      i = l(n, e, e[89], Ar);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 134217728 & a[2]) &&
          d(i, n, e, e[89], t ? u(n, e[89], a, Er) : p(e[89]), Ar);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function jr(e) {
    let n,
      i,
      r,
      o,
      c,
      f,
      m,
      h,
      g,
      y,
      w,
      D,
      N,
      M,
      R,
      F,
      k,
      U,
      P,
      H,
      B,
      V,
      j,
      G,
      q,
      K,
      W,
      X,
      Y,
      J,
      Z,
      ee,
      te,
      ne,
      ie,
      le,
      ce,
      ge,
      $e,
      Ie,
      ve = e[12] && Lr(e),
      be = "filled" === e[7] && wr(),
      ye =
        "outlined" !== e[7] && !e[8] && (null != e[9] || e[52].label) && Dr(e),
      Ee = "outlined" === e[7] && Mr(e);
    const Ae = e[63].leadingIcon,
      Ce = l(Ae, e, e[89], _r);
    let _e = [
        { id: (w = e[11] + "-smui-selected-text") },
        { class: (D = We({ [e[19]]: !0, "mdc-select__selected-text": !0 })) },
        { role: "button" },
        { "aria-haspopup": "listbox" },
        { "aria-labelledby": (N = e[11] + "-smui-label") },
        et(e[53], "selectedText$"),
      ],
      xe = {};
    for (let e = 0; e < _e.length; e += 1) xe = t(xe, _e[e]);
    let Se = [
        {
          class: (R = We({
            [e[17]]: !0,
            "mdc-select__selected-text-container": !0,
          })),
        },
        et(e[53], "selectedTextContainer$"),
      ],
      Te = {};
    for (let e = 0; e < Se.length; e += 1) Te = t(Te, Se[e]);
    let Oe = [
        { class: (V = We({ [e[21]]: !0, "mdc-select__dropdown-icon": !0 })) },
        et(e[53], "dropdownIcon$"),
      ],
      Le = {};
    for (let e = 0; e < Oe.length; e += 1) Le = t(Le, Oe[e]);
    let we = "outlined" !== e[7] && e[5] && Ur(e),
      De = [
        { class: (q = We({ [e[15]]: !0, "mdc-select__anchor": !0 })) },
        { "aria-required": (K = e[10] ? "true" : void 0) },
        { "aria-disabled": (W = e[6] ? "true" : void 0) },
        { "aria-controls": e[31] },
        { "aria-describedby": e[31] },
        e[29],
        et(e[53], "anchor$"),
      ],
      Ne = {};
    for (let e = 0; e < De.length; e += 1) Ne = t(Ne, De[e]);
    const Me = [
      { class: We({ [e[22]]: !0, "mdc-select__menu": !0, ...e[33] }) },
      { fullWidth: !0 },
      { anchor: !1 },
      { anchorElement: e[34] },
      { anchorCorner: e[35] },
      et(e[53], "menu$"),
    ];
    function Re(t) {
      e[78](t);
    }
    let Fe = { $$slots: { default: [Hr] }, $$scope: { ctx: e } };
    for (let e = 0; e < Me.length; e += 1) Fe = t(Fe, Me[e]);
    void 0 !== e[32] && (Fe.open = e[32]),
      (J = new hr({ props: Fe })),
      z.push(() => pe(J, "open", Re)),
      J.$on("SMUIMenu:selected", e[79]),
      J.$on("SMUIMenuSurface:closing", e[80]),
      J.$on("SMUIMenuSurface:closed", e[81]),
      J.$on("SMUIMenuSurface:opened", e[82]);
    let ke = [
        {
          class: (ee = We({
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
        {
          style: (te = Object.entries(e[27]).map(Gr).concat([e[4]]).join(" ")),
        },
        Ye(e[53], [
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
      Ue = {};
    for (let e = 0; e < ke.length; e += 1) Ue = t(Ue, ke[e]);
    let Pe = e[52].helperText && Br(e);
    return {
      c() {
        (n = E("div")),
          ve && ve.c(),
          (i = _()),
          (r = E("div")),
          be && be.c(),
          (o = _()),
          ye && ye.c(),
          (c = _()),
          Ee && Ee.c(),
          (f = _()),
          Ce && Ce.c(),
          (m = _()),
          (h = E("span")),
          (g = E("span")),
          (y = C(e[43])),
          (k = _()),
          (U = E("span")),
          (P = A("svg")),
          (H = A("polygon")),
          (B = A("polygon")),
          (G = _()),
          we && we.c(),
          (Y = _()),
          fe(J.$$.fragment),
          (le = _()),
          Pe && Pe.c(),
          (ce = x()),
          O(g, xe),
          O(h, Te),
          T(H, "class", "mdc-select__dropdown-icon-inactive"),
          T(H, "stroke", "none"),
          T(H, "fill-rule", "evenodd"),
          T(H, "points", "7 10 12 15 17 10"),
          T(B, "class", "mdc-select__dropdown-icon-active"),
          T(B, "stroke", "none"),
          T(B, "fill-rule", "evenodd"),
          T(B, "points", "7 15 12 10 17 15"),
          T(P, "class", "mdc-select__dropdown-icon-graphic"),
          T(P, "viewBox", "7 10 10 5"),
          T(P, "focusable", "false"),
          O(U, Le),
          O(r, Ne),
          O(n, Ue);
      },
      m(t, a) {
        v(t, n, a),
          ve && ve.m(n, null),
          I(n, i),
          I(n, r),
          be && be.m(r, null),
          I(r, o),
          ye && ye.m(r, null),
          I(r, c),
          Ee && Ee.m(r, null),
          I(r, f),
          Ce && Ce.m(r, null),
          I(r, m),
          I(r, h),
          I(h, g),
          I(g, y),
          e[69](g),
          I(r, k),
          I(r, U),
          I(U, P),
          I(P, H),
          I(P, B),
          I(r, G),
          we && we.m(r, null),
          e[71](r),
          I(n, Y),
          me(J, n, null),
          e[83](n),
          v(t, le, a),
          Pe && Pe.m(t, a),
          v(t, ce, a),
          (ge = !0),
          $e ||
            ((Ie = [
              $((M = tt.call(null, g, e[18]))),
              $((F = tt.call(null, h, e[16]))),
              $((j = tt.call(null, U, e[20]))),
              $((X = tt.call(null, r, e[14]))),
              S(r, "focus", e[72]),
              S(r, "blur", e[73]),
              S(r, "click", e[74]),
              S(r, "keydown", e[75]),
              S(r, "focus", e[64]),
              S(r, "blur", e[65]),
              $(
                (ne = li.call(null, n, {
                  ripple: "filled" === e[7],
                  unbounded: !1,
                  addClass: e[49],
                  removeClass: e[50],
                  addStyle: e[51],
                }))
              ),
              $(dr.call(null, n, { addClass: e[49], removeClass: e[50] })),
              $((ie = tt.call(null, n, e[2]))),
              $(e[44].call(null, n)),
              S(n, "SMUISelectLeadingIcon:mount", e[84]),
              S(n, "SMUISelectLeadingIcon:unmount", e[85]),
            ]),
            ($e = !0));
      },
      p(e, t) {
        e[12]
          ? ve
            ? ve.p(e, t)
            : ((ve = Lr(e)), ve.c(), ve.m(n, i))
          : ve && (ve.d(1), (ve = null)),
          "filled" === e[7]
            ? be || ((be = wr()), be.c(), be.m(r, o))
            : be && (be.d(1), (be = null)),
          "outlined" === e[7] || e[8] || (null == e[9] && !e[52].label)
            ? ye &&
              (ae(),
              oe(ye, 1, 1, () => {
                ye = null;
              }),
              se())
            : ye
            ? (ye.p(e, t), (896 & t[0]) | (2097152 & t[1]) && re(ye, 1))
            : ((ye = Dr(e)), ye.c(), re(ye, 1), ye.m(r, c)),
          "outlined" === e[7]
            ? Ee
              ? (Ee.p(e, t), 128 & t[0] && re(Ee, 1))
              : ((Ee = Mr(e)), Ee.c(), re(Ee, 1), Ee.m(r, f))
            : Ee &&
              (ae(),
              oe(Ee, 1, 1, () => {
                Ee = null;
              }),
              se()),
          Ce &&
            Ce.p &&
            (!ge || 134217728 & t[2]) &&
            d(Ce, Ae, e, e[89], ge ? u(Ae, e[89], t, Cr) : p(e[89]), _r),
          (!ge || 4096 & t[1]) && L(y, e[43]),
          O(
            g,
            (xe = ue(_e, [
              (!ge ||
                (2048 & t[0] && w !== (w = e[11] + "-smui-selected-text"))) && {
                id: w,
              },
              (!ge ||
                (524288 & t[0] &&
                  D !==
                    (D = We({
                      [e[19]]: !0,
                      "mdc-select__selected-text": !0,
                    })))) && { class: D },
              { role: "button" },
              { "aria-haspopup": "listbox" },
              (!ge || (2048 & t[0] && N !== (N = e[11] + "-smui-label"))) && {
                "aria-labelledby": N,
              },
              4194304 & t[1] && et(e[53], "selectedText$"),
            ]))
          ),
          M && s(M.update) && 262144 & t[0] && M.update.call(null, e[18]),
          O(
            h,
            (Te = ue(Se, [
              (!ge ||
                (131072 & t[0] &&
                  R !==
                    (R = We({
                      [e[17]]: !0,
                      "mdc-select__selected-text-container": !0,
                    })))) && { class: R },
              4194304 & t[1] && et(e[53], "selectedTextContainer$"),
            ]))
          ),
          F && s(F.update) && 65536 & t[0] && F.update.call(null, e[16]),
          O(
            U,
            (Le = ue(Oe, [
              (!ge ||
                (2097152 & t[0] &&
                  V !==
                    (V = We({
                      [e[21]]: !0,
                      "mdc-select__dropdown-icon": !0,
                    })))) && { class: V },
              4194304 & t[1] && et(e[53], "dropdownIcon$"),
            ]))
          ),
          j && s(j.update) && 1048576 & t[0] && j.update.call(null, e[20]),
          "outlined" !== e[7] && e[5]
            ? we
              ? (we.p(e, t), 160 & t[0] && re(we, 1))
              : ((we = Ur(e)), we.c(), re(we, 1), we.m(r, null))
            : we &&
              (ae(),
              oe(we, 1, 1, () => {
                we = null;
              }),
              se()),
          O(
            r,
            (Ne = ue(De, [
              (!ge ||
                (32768 & t[0] &&
                  q !==
                    (q = We({ [e[15]]: !0, "mdc-select__anchor": !0 })))) && {
                class: q,
              },
              (!ge || (1024 & t[0] && K !== (K = e[10] ? "true" : void 0))) && {
                "aria-required": K,
              },
              (!ge || (64 & t[0] && W !== (W = e[6] ? "true" : void 0))) && {
                "aria-disabled": W,
              },
              (!ge || 1 & t[1]) && { "aria-controls": e[31] },
              (!ge || 1 & t[1]) && { "aria-describedby": e[31] },
              536870912 & t[0] && e[29],
              4194304 & t[1] && et(e[53], "anchor$"),
            ]))
          ),
          X && s(X.update) && 16384 & t[0] && X.update.call(null, e[14]);
        const a =
          (4194304 & t[0]) | (4194332 & t[1])
            ? ue(Me, [
                (4194304 & t[0]) | (4 & t[1]) && {
                  class: We({ [e[22]]: !0, "mdc-select__menu": !0, ...e[33] }),
                },
                Me[1],
                Me[2],
                8 & t[1] && { anchorElement: e[34] },
                16 & t[1] && { anchorCorner: e[35] },
                4194304 & t[1] && de(et(e[53], "menu$")),
              ])
            : {};
        (16777216 & t[0]) | (4194400 & t[1]) | (134217728 & t[2]) &&
          (a.$$scope = { dirty: t, ctx: e }),
          !Z && 2 & t[1] && ((Z = !0), (a.open = e[32]), Q(() => (Z = !1))),
          J.$set(a),
          O(
            n,
            (Ue = ue(ke, [
              (!ge ||
                ((67119050 & t[0]) | (2097154 & t[1]) &&
                  ee !==
                    (ee = We({
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
                    })))) && { class: ee },
              (!ge ||
                (134217744 & t[0] &&
                  te !==
                    (te = Object.entries(e[27])
                      .map(Gr)
                      .concat([e[4]])
                      .join(" ")))) && { style: te },
              4194304 & t[1] &&
                Ye(e[53], [
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
          ne &&
            s(ne.update) &&
            128 & t[0] &&
            ne.update.call(null, {
              ripple: "filled" === e[7],
              unbounded: !1,
              addClass: e[49],
              removeClass: e[50],
              addStyle: e[51],
            }),
          ie && s(ie.update) && 4 & t[0] && ie.update.call(null, e[2]),
          e[52].helperText
            ? Pe
              ? (Pe.p(e, t), 2097152 & t[1] && re(Pe, 1))
              : ((Pe = Br(e)), Pe.c(), re(Pe, 1), Pe.m(ce.parentNode, ce))
            : Pe &&
              (ae(),
              oe(Pe, 1, 1, () => {
                Pe = null;
              }),
              se());
      },
      i(e) {
        ge ||
          (re(ye),
          re(Ee),
          re(Ce, e),
          re(we),
          re(J.$$.fragment, e),
          re(Pe),
          (ge = !0));
      },
      o(e) {
        oe(ye),
          oe(Ee),
          oe(Ce, e),
          oe(we),
          oe(J.$$.fragment, e),
          oe(Pe),
          (ge = !1);
      },
      d(t) {
        t && b(n),
          ve && ve.d(),
          be && be.d(),
          ye && ye.d(),
          Ee && Ee.d(),
          Ce && Ce.d(t),
          e[69](null),
          we && we.d(),
          e[71](null),
          he(J),
          e[83](null),
          t && b(le),
          Pe && Pe.d(t),
          t && b(ce),
          ($e = !1),
          a(Ie);
      },
    };
  }
  let zr = 0;
  const Gr = ([e, t]) => `${e}: ${t};`;
  function qr(e, n, i) {
    const a = [
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
      r,
      l = m(n, a),
      { $$slots: c = {}, $$scope: u } = n;
    const d = h(c),
      p = Ze(F());
    let $ = () => {};
    function I(e) {
      return e === $;
    }
    let { use: v = [] } = n,
      { class: b = "" } = n,
      { style: y = "" } = n,
      { ripple: E = !0 } = n,
      { disabled: A = !1 } = n,
      { variant: C = "standard" } = n,
      { noLabel: _ = !1 } = n,
      { label: x } = n,
      { value: S = "" } = n,
      { key: T = (e) => e } = n,
      { dirty: O = !1 } = n,
      { invalid: L = $ } = n,
      { updateInvalid: w = I(L) } = n;
    const D = I(L);
    I(L) && (L = !1);
    let N,
      M,
      R,
      P,
      j,
      G,
      q,
      K,
      W,
      X,
      Y,
      Q,
      J,
      Z,
      { required: ee = !1 } = n,
      { inputId: te = "SMUI-select-" + zr++ } = n,
      { hiddenInput: ne = !1 } = n,
      { withLeadingIcon: ie = $ } = n,
      { anchor$use: ae = [] } = n,
      { anchor$class: se = "" } = n,
      { selectedTextContainer$use: re = [] } = n,
      { selectedTextContainer$class: oe = "" } = n,
      { selectedText$use: le = [] } = n,
      { selectedText$class: ce = "" } = n,
      { dropdownIcon$use: ue = [] } = n,
      { dropdownIcon$class: de = "" } = n,
      { menu$class: pe = "" } = n,
      fe = {},
      me = {},
      he = {},
      ge = -1,
      $e = B("SMUI:addLayoutListener"),
      Ie = !1,
      ve = {},
      be = !1,
      ye = B("SMUI:select:context");
    H("SMUI:list:role", ""), H("SMUI:list:nav", !1);
    const Ee = Ke("");
    o(e, Ee, (e) => i(43, (s = e))), H("SMUI:select:selectedText", Ee);
    const Ae = Ke(S);
    o(e, Ae, (e) => i(91, (r = e))), H("SMUI:select:value", Ae);
    let Ce = ge;
    function _e(e) {
      return e in fe ? fe[e] : Fe().classList.contains(e);
    }
    function xe(e) {
      fe[e] || i(26, (fe[e] = !0), fe);
    }
    function Se(e) {
      (e in fe && !fe[e]) || i(26, (fe[e] = !1), fe);
    }
    function Te(e) {
      ve[e] || i(33, (ve[e] = !0), ve);
    }
    function Oe(e) {
      (e in ve && !ve[e]) || i(33, (ve[e] = !1), ve);
    }
    function Le(e) {
      var t;
      return e in he
        ? null !== (t = he[e]) && void 0 !== t
          ? t
          : null
        : Fe().getAttribute(e);
    }
    function we(e, t) {
      he[e] !== t && i(29, (he[e] = t), he);
    }
    function De(e) {
      (e in he && null == he[e]) || i(29, (he[e] = void 0), he);
    }
    function Ne() {
      return W.getOrderedList().map((e) => e.getValue());
    }
    function Me(e) {
      M.setUseDefaultValidation(e);
    }
    function Re() {
      M.layout();
    }
    function Fe() {
      return N;
    }
    $e && (G = $e(Re)),
      k(
        () => (
          i(
            23,
            (M = new nr(
              {
                setSelectedText: (e) => {
                  g(Ee, (s = e), s);
                },
                isSelectAnchorFocused: () => document.activeElement === R,
                getSelectAnchorAttr: Le,
                setSelectAnchorAttr: we,
                removeSelectAnchorAttr: De,
                addMenuClass: Te,
                removeMenuClass: Oe,
                openMenu: () => {
                  i(32, (Ie = !0));
                },
                closeMenu: () => {
                  i(32, (Ie = !1));
                },
                getAnchorElement: () => R,
                setMenuAnchorElement: (e) => {
                  i(34, (q = e));
                },
                setMenuAnchorCorner: (e) => {
                  i(35, (K = e));
                },
                setMenuWrapFocus: (e) => {
                  i(36, (be = e));
                },
                getSelectedIndex: () => ge,
                setSelectedIndex: (e) => {
                  i(62, (Ce = e)), i(24, (ge = e)), i(0, (S = Ne()[ge]));
                },
                focusMenuItemAtIndex: (e) => {
                  W.focusItemAtIndex(e);
                },
                getMenuItemCount: () => W.items.length,
                getMenuItemValues: () => Ne().map(T),
                getMenuItemTextAtIndex: (e) => W.getPrimaryTextAtIndex(e),
                isTypeaheadInProgress: () => W.typeaheadInProgress,
                typeaheadMatchItem: (e, t) => W.typeaheadMatchItem(e, t),
                addClass: xe,
                removeClass: Se,
                hasClass: _e,
                setRippleCenter: (e) => J && J.setRippleCenter(e),
                activateBottomLine: () => J && J.activate(),
                deactivateBottomLine: () => J && J.deactivate(),
                notifyChange: (e) => {
                  i(54, (O = !0)),
                    w && i(1, (L = !M.isValid())),
                    Xe(
                      Fe(),
                      "SMUISelect:change",
                      { value: S, index: ge },
                      void 0,
                      !0
                    );
                },
                hasOutline: () => !!Z,
                notchOutline: (e) => Z && Z.notch(e),
                closeOutline: () => Z && Z.closeNotch(),
                hasLabel: () => !!Q,
                floatLabel: (e) => Q && Q.float(e),
                getLabelWidth: () => (Q ? Q.getWidth() : 0),
                setLabelRequired: (e) => Q && Q.setRequired(e),
              },
              {
                get helperText() {
                  return Y;
                },
                get leadingIcon() {
                  return X;
                },
              }
            ))
          ),
          i(24, (ge = Ne().indexOf(S))),
          M.init(),
          Me(D),
          () => {
            M.destroy();
          }
        )
      ),
      U(() => {
        G && G();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(53, (l = m(n, a))),
          "use" in e && i(2, (v = e.use)),
          "class" in e && i(3, (b = e.class)),
          "style" in e && i(4, (y = e.style)),
          "ripple" in e && i(5, (E = e.ripple)),
          "disabled" in e && i(6, (A = e.disabled)),
          "variant" in e && i(7, (C = e.variant)),
          "noLabel" in e && i(8, (_ = e.noLabel)),
          "label" in e && i(9, (x = e.label)),
          "value" in e && i(0, (S = e.value)),
          "key" in e && i(55, (T = e.key)),
          "dirty" in e && i(54, (O = e.dirty)),
          "invalid" in e && i(1, (L = e.invalid)),
          "updateInvalid" in e && i(56, (w = e.updateInvalid)),
          "required" in e && i(10, (ee = e.required)),
          "inputId" in e && i(11, (te = e.inputId)),
          "hiddenInput" in e && i(12, (ne = e.hiddenInput)),
          "withLeadingIcon" in e && i(13, (ie = e.withLeadingIcon)),
          "anchor$use" in e && i(14, (ae = e.anchor$use)),
          "anchor$class" in e && i(15, (se = e.anchor$class)),
          "selectedTextContainer$use" in e &&
            i(16, (re = e.selectedTextContainer$use)),
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
        if ((25165825 & e.$$.dirty[0]) | (1 & e.$$.dirty[2]) && Ce !== ge)
          if ((i(62, (Ce = ge)), M)) M.setSelectedIndex(ge, !1, !0);
          else {
            const e = Ne();
            S !== e[ge] && i(0, (S = e[ge]));
          }
        1 & e.$$.dirty[0] && g(Ae, (r = S), r),
          (8388609 & e.$$.dirty[0]) | (16777216 & e.$$.dirty[1]) &&
            M &&
            M.getValue() !== T(S) &&
            M.setValue(T(S)),
          8388672 & e.$$.dirty[0] &&
            M &&
            M.getDisabled() !== A &&
            M.setDisabled(A),
          (8388610 & e.$$.dirty[0]) | (41943040 & e.$$.dirty[1]) &&
            M &&
            O &&
            M.isValid() !== !L &&
            (w ? i(1, (L = !M.isValid())) : M.setValid(!L)),
          8389632 & e.$$.dirty[0] &&
            M &&
            M.getRequired() !== ee &&
            M.setRequired(ee);
      }),
      [
        S,
        L,
        v,
        b,
        y,
        E,
        A,
        C,
        _,
        x,
        ee,
        te,
        ne,
        ie,
        ae,
        se,
        re,
        oe,
        le,
        ce,
        ue,
        de,
        pe,
        M,
        ge,
        N,
        fe,
        me,
        R,
        he,
        P,
        j,
        Ie,
        ve,
        q,
        K,
        be,
        W,
        X,
        Y,
        Q,
        J,
        Z,
        s,
        p,
        I,
        ye,
        Ee,
        Ae,
        xe,
        Se,
        function (e, t) {
          me[e] != t &&
            ("" === t || null == t
              ? (delete me[e], i(27, me))
              : i(27, (me[e] = t), me));
        },
        d,
        l,
        O,
        T,
        w,
        function () {
          return M.getUseDefaultValidation();
        },
        Me,
        function () {
          R.focus();
        },
        Re,
        Fe,
        Ce,
        c,
        function (t) {
          V.call(this, e, t);
        },
        function (t) {
          V.call(this, e, t);
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (Q = e), i(40, Q);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (Q = e), i(40, Q);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (Z = e), i(42, Z);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (P = e), i(30, P);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (J = e), i(41, J);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (R = e), i(28, R);
          });
        },
        () => M && M.handleFocus(),
        () => M && M.handleBlur(),
        (e) => {
          R.focus(),
            M &&
              M.handleClick(
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
        (e) => M && M.handleKeydown(e),
        function (e) {
          (ge = e), i(24, ge);
        },
        (e) => i(37, (W = e.detail)),
        function (e) {
          (Ie = e), i(32, Ie);
        },
        (e) => M && M.handleMenuItemAction(e.detail.index),
        () => M && M.handleMenuClosing(),
        () => M && M.handleMenuClosed(),
        () => M && M.handleMenuOpened(),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (N = e), i(25, N);
          });
        },
        (e) => i(38, (X = e.detail)),
        () => i(38, (X = void 0)),
        (e) => i(31, (j = e.detail)),
        (e) => i(39, (Y = e.detail)),
        () => {
          i(31, (j = void 0)), i(39, (Y = void 0));
        },
        u,
      ]
    );
  }
  class Kr extends $e {
    constructor(e) {
      super(),
        ge(
          this,
          e,
          qr,
          jr,
          r,
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
  function Wr(e) {
    let t;
    const n = e[11].default,
      i = l(n, e, e[13], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 8192 & a) &&
          d(i, n, e, e[13], t ? u(n, e[13], a, null) : p(e[13]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Xr(e) {
    let n, i;
    const a = [
      { use: e[3] },
      { "data-value": e[0] },
      { value: e[0] },
      { selected: e[2] },
      e[6],
    ];
    let s = { $$slots: { default: [Wr] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) s = t(s, a[e]);
    return (
      (n = new hs({ props: s })),
      e[12](n),
      {
        c() {
          fe(n.$$.fragment);
        },
        m(e, t) {
          me(n, e, t), (i = !0);
        },
        p(e, [t]) {
          const i =
            77 & t
              ? ue(a, [
                  8 & t && { use: e[3] },
                  1 & t && { "data-value": e[0] },
                  1 & t && { value: e[0] },
                  4 & t && { selected: e[2] },
                  64 & t && de(e[6]),
                ])
              : {};
          8192 & t && (i.$$scope = { dirty: t, ctx: e }), n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[12](null), he(n, t);
        },
      }
    );
  }
  function Yr(e, n, i) {
    let a, s;
    const r = ["use", "class", "value", "getElement"];
    let l,
      c,
      u = m(n, r),
      { $$slots: d = {}, $$scope: p } = n;
    const h = Ze(F());
    let { use: $ = [] } = n;
    let I,
      { value: v = "" } = n;
    const b = B("SMUI:select:selectedText");
    o(e, b, (e) => i(14, (l = e)));
    const y = B("SMUI:select:value");
    function E() {
      s && I && g(b, (l = I.getPrimaryText()), l);
    }
    return (
      o(e, y, (e) => i(10, (c = e))),
      H("SMUI:list:item:role", "option"),
      k(E),
      U(E),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(6, (u = m(n, r))),
          "use" in e && i(7, ($ = e.use)),
          "value" in e && i(0, (v = e.value)),
          "$$scope" in e && i(13, (p = e.$$scope));
      }),
      (e.$$.update = () => {
        128 & e.$$.dirty && i(3, (a = [h, ...$])),
          1025 & e.$$.dirty && i(2, (s = null != v && "" !== v && c === v));
      }),
      [
        v,
        I,
        s,
        a,
        b,
        y,
        u,
        $,
        "",
        function () {
          return I.getElement();
        },
        c,
        d,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (I = e), i(1, I);
          });
        },
        p,
      ]
    );
  }
  const Qr = class extends $e {
    constructor(e) {
      super(),
        ge(this, e, Yr, Xr, r, { use: 7, class: 8, value: 0, getElement: 9 });
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
  var Jr,
    Zr = (function () {
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
    eo = {
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
    to = {
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
    no = {
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
  })(Jr || (Jr = {}));
  var io = (function (e) {
    function t(n) {
      var i = e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
      return (
        (i.dialogOpen = !1),
        (i.isFullscreen = !1),
        (i.animationFrame = 0),
        (i.animationTimer = 0),
        (i.escapeKeyAction = to.CLOSE_ACTION),
        (i.scrimClickAction = to.CLOSE_ACTION),
        (i.autoStackButtons = !0),
        (i.areButtonsStacked = !1),
        (i.suppressDefaultPressSelector = to.SUPPRESS_DEFAULT_PRESS_SELECTOR),
        (i.animFrame = new Zr()),
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
      ye(t, e),
      Object.defineProperty(t, "cssClasses", {
        get: function () {
          return eo;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "strings", {
        get: function () {
          return to;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "numbers", {
        get: function () {
          return no;
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
        this.adapter.hasClass(eo.STACKED) && this.setAutoStackButtons(!1),
          (this.isFullscreen = this.adapter.hasClass(eo.FULLSCREEN));
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
          this.adapter.addClass(eo.OPENING),
          this.isFullscreen &&
            this.adapter.registerContentEventHandler(
              "scroll",
              this.contentScrollHandler
            ),
          e &&
            e.isAboveFullscreenDialog &&
            this.adapter.addClass(eo.SCRIM_HIDDEN),
          this.adapter.registerWindowEventHandler(
            "resize",
            this.windowResizeHandler
          ),
          this.adapter.registerWindowEventHandler(
            "orientationchange",
            this.windowOrientationChangeHandler
          ),
          this.runNextAnimationFrame(function () {
            t.adapter.addClass(eo.OPEN),
              t.adapter.addBodyClass(eo.SCROLL_LOCK),
              t.layout(),
              (t.animationTimer = setTimeout(function () {
                t.handleAnimationTimerEnd(),
                  t.adapter.trapFocus(t.adapter.getInitialFocusEl()),
                  t.adapter.notifyOpened();
              }, no.DIALOG_ANIMATION_OPEN_TIME_MS));
          });
      }),
      (t.prototype.close = function (e) {
        var t = this;
        void 0 === e && (e = ""),
          this.dialogOpen &&
            ((this.dialogOpen = !1),
            this.adapter.notifyClosing(e),
            this.adapter.addClass(eo.CLOSING),
            this.adapter.removeClass(eo.OPEN),
            this.adapter.removeBodyClass(eo.SCROLL_LOCK),
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
            }, no.DIALOG_ANIMATION_CLOSE_TIME_MS)));
      }),
      (t.prototype.showSurfaceScrim = function () {
        var e = this;
        this.adapter.addClass(eo.SURFACE_SCRIM_SHOWING),
          this.runNextAnimationFrame(function () {
            e.adapter.addClass(eo.SURFACE_SCRIM_SHOWN);
          });
      }),
      (t.prototype.hideSurfaceScrim = function () {
        this.adapter.removeClass(eo.SURFACE_SCRIM_SHOWN),
          this.adapter.addClass(eo.SURFACE_SCRIM_HIDING);
      }),
      (t.prototype.handleSurfaceScrimTransitionEnd = function () {
        this.adapter.removeClass(eo.SURFACE_SCRIM_HIDING),
          this.adapter.removeClass(eo.SURFACE_SCRIM_SHOWING);
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
        this.animFrame.request(Jr.POLL_LAYOUT_CHANGE, function () {
          e.layoutInternal();
        });
      }),
      (t.prototype.handleClick = function (e) {
        if (
          this.adapter.eventTargetMatches(e.target, to.SCRIM_SELECTOR) &&
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
        this.animFrame.request(Jr.POLL_SCROLL_POS, function () {
          e.toggleScrollDividerHeader(), e.toggleScrollDividerFooter();
        });
      }),
      (t.prototype.layoutInternal = function () {
        this.autoStackButtons && this.detectStackedButtons(),
          this.toggleScrollableClasses();
      }),
      (t.prototype.handleAnimationTimerEnd = function () {
        (this.animationTimer = 0),
          this.adapter.removeClass(eo.OPENING),
          this.adapter.removeClass(eo.CLOSING);
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
        this.adapter.removeClass(eo.STACKED);
        var e = this.adapter.areButtonsStacked();
        e && this.adapter.addClass(eo.STACKED),
          e !== this.areButtonsStacked &&
            (this.adapter.reverseButtons(), (this.areButtonsStacked = e));
      }),
      (t.prototype.toggleScrollableClasses = function () {
        this.adapter.removeClass(eo.SCROLLABLE),
          this.adapter.isContentScrollable() &&
            (this.adapter.addClass(eo.SCROLLABLE),
            this.isFullscreen &&
              (this.toggleScrollDividerHeader(),
              this.toggleScrollDividerFooter()));
      }),
      (t.prototype.toggleScrollDividerHeader = function () {
        this.adapter.isScrollableContentAtTop()
          ? this.adapter.hasClass(eo.SCROLL_DIVIDER_HEADER) &&
            this.adapter.removeClass(eo.SCROLL_DIVIDER_HEADER)
          : this.adapter.addClass(eo.SCROLL_DIVIDER_HEADER);
      }),
      (t.prototype.toggleScrollDividerFooter = function () {
        this.adapter.isScrollableContentAtBottom()
          ? this.adapter.hasClass(eo.SCROLL_DIVIDER_FOOTER) &&
            this.adapter.removeClass(eo.SCROLL_DIVIDER_FOOTER)
          : this.adapter.addClass(eo.SCROLL_DIVIDER_FOOTER);
      }),
      t
    );
  })(Se);
  const { document: ao, window: so } = le,
    ro = (e) => ({}),
    oo = (e) => ({});
  function lo(t) {
    let n, i, a;
    return {
      c() {
        (n = E("div")), T(n, "class", "mdc-dialog__surface-scrim");
      },
      m(e, s) {
        v(e, n, s), i || ((a = S(n, "transitionend", t[31])), (i = !0));
      },
      p: e,
      d(e) {
        e && b(n), (i = !1), a();
      },
    };
  }
  function co(e) {
    let n, i, r, o, c, f, m, h, g, y, A, C, x, L, w;
    const D = e[27].default,
      N = l(D, e, e[26], null);
    let M = e[5] && lo(e),
      R = [
        { class: (f = We({ [e[7]]: !0, "mdc-dialog__surface": !0 })) },
        { role: "alertdialog" },
        { "aria-modal": "true" },
        et(e[17], "surface$"),
      ],
      F = {};
    for (let e = 0; e < R.length; e += 1) F = t(F, R[e]);
    let k = [
        { class: (m = We({ [e[6]]: !0, "mdc-dialog__container": !0 })) },
        et(e[17], "container$"),
      ],
      U = {};
    for (let e = 0; e < k.length; e += 1) U = t(U, k[e]);
    let P = [
        {
          class: (y = We({
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
        Ye(e[17], ["container$", "surface$"]),
      ],
      H = {};
    for (let e = 0; e < P.length; e += 1) H = t(H, P[e]);
    const B = e[27].over,
      V = l(B, e, e[26], oo);
    return {
      c() {
        (n = _()),
          (i = E("div")),
          (r = E("div")),
          (o = E("div")),
          N && N.c(),
          (c = _()),
          M && M.c(),
          (h = _()),
          (g = E("div")),
          (C = _()),
          V && V.c(),
          O(o, F),
          O(r, U),
          T(g, "class", "mdc-dialog__scrim"),
          O(i, H);
      },
      m(t, a) {
        v(t, n, a),
          v(t, i, a),
          I(i, r),
          I(r, o),
          N && N.m(o, null),
          I(o, c),
          M && M.m(o, null),
          I(i, h),
          I(i, g),
          e[32](i),
          v(t, C, a),
          V && V.m(t, a),
          (x = !0),
          L ||
            ((w = [
              S(so, "resize", e[28]),
              S(so, "orientationchange", e[29]),
              S(ao.body, "keydown", e[30]),
              $((A = tt.call(null, i, e[1]))),
              $(e[11].call(null, i)),
              S(i, "SMUIDialog:opening", e[14]),
              S(i, "SMUIDialog:opened", e[15]),
              S(i, "SMUIDialog:closed", e[16]),
              S(i, "click", e[33]),
              S(i, "keydown", e[34]),
            ]),
            (L = !0));
      },
      p(e, t) {
        N &&
          N.p &&
          (!x || 67108864 & t[0]) &&
          d(N, D, e, e[26], x ? u(D, e[26], t, null) : p(e[26]), null),
          e[5]
            ? M
              ? M.p(e, t)
              : ((M = lo(e)), M.c(), M.m(o, null))
            : M && (M.d(1), (M = null)),
          O(
            o,
            (F = ue(R, [
              (!x ||
                (128 & t[0] &&
                  f !==
                    (f = We({ [e[7]]: !0, "mdc-dialog__surface": !0 })))) && {
                class: f,
              },
              { role: "alertdialog" },
              { "aria-modal": "true" },
              131072 & t[0] && et(e[17], "surface$"),
            ]))
          ),
          O(
            r,
            (U = ue(k, [
              (!x ||
                (64 & t[0] &&
                  m !==
                    (m = We({ [e[6]]: !0, "mdc-dialog__container": !0 })))) && {
                class: m,
              },
              131072 & t[0] && et(e[17], "container$"),
            ]))
          ),
          O(
            i,
            (H = ue(P, [
              (!x ||
                (1084 & t[0] &&
                  y !==
                    (y = We({
                      [e[2]]: !0,
                      "mdc-dialog": !0,
                      "mdc-dialog--stacked": !e[4],
                      "mdc-dialog--fullscreen": e[5],
                      "smui-dialog--selection": e[3],
                      ...e[10],
                    })))) && { class: y },
              { role: "alertdialog" },
              { "aria-modal": "true" },
              131072 & t[0] && Ye(e[17], ["container$", "surface$"]),
            ]))
          ),
          A && s(A.update) && 2 & t[0] && A.update.call(null, e[1]),
          V &&
            V.p &&
            (!x || 67108864 & t[0]) &&
            d(V, B, e, e[26], x ? u(B, e[26], t, ro) : p(e[26]), oo);
      },
      i(e) {
        x || (re(N, e), re(V, e), (x = !0));
      },
      o(e) {
        oe(N, e), oe(V, e), (x = !1);
      },
      d(t) {
        t && b(n),
          t && b(i),
          N && N.d(t),
          M && M.d(),
          e[32](null),
          t && b(C),
          V && V.d(t),
          (L = !1),
          a(w);
      },
    };
  }
  function uo(e, n, i) {
    const a = [
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
      r,
      l = m(n, a),
      { $$slots: c = {}, $$scope: u } = n;
    var d;
    const { FocusTrap: p } = vn,
      { closest: h, matches: $ } = we,
      I = Ze(F());
    let v,
      b,
      y,
      { use: E = [] } = n,
      { class: A = "" } = n,
      { open: C = !1 } = n,
      { selection: _ = !1 } = n,
      { escapeKeyAction: x = "close" } = n,
      { scrimClickAction: S = "close" } = n,
      { autoStackButtons: T = !0 } = n,
      { fullscreen: O = !1 } = n,
      { container$class: L = "" } = n,
      { surface$class: w = "" } = n,
      D = {},
      N = Ke(!1);
    o(e, N, (e) => i(38, (r = e)));
    let M = B("SMUI:dialog:aboveFullscreen"),
      R =
        null !== (d = B("SMUI:dialog:aboveFullscreenShown")) && void 0 !== d
          ? d
          : Ke(!1);
    o(e, R, (e) => i(25, (s = e)));
    let P,
      V = B("SMUI:addLayoutListener"),
      j = [];
    H("SMUI:dialog:actions:reversed", N),
      H(
        "SMUI:addLayoutListener",
        (e) => (
          j.push(e),
          () => {
            const t = j.indexOf(e);
            t >= 0 && j.splice(t, 1);
          }
        )
      ),
      H("SMUI:dialog:selection", _),
      H("SMUI:dialog:aboveFullscreen", M || O),
      H("SMUI:dialog:aboveFullscreenShown", R),
      V && (P = V(Q));
    let G = s;
    function q(e) {
      return e in D ? D[e] : J().classList.contains(e);
    }
    function K(e) {
      D[e] || i(10, (D[e] = !0), D);
    }
    function W(e) {
      (e in D && !D[e]) || i(10, (D[e] = !1), D);
    }
    function X() {
      return v.querySelector(".mdc-dialog__content");
    }
    function Y() {
      return v.querySelector("[data-mdc-dialog-initial-focus]");
    }
    function Q() {
      return b.layout();
    }
    function J() {
      return v;
    }
    k(() => {
      var e;
      return (
        (y = new p(v, {
          initialFocusEl: null !== (e = Y()) && void 0 !== e ? e : void 0,
        })),
        i(
          8,
          (b = new io({
            addBodyClass: (e) => document.body.classList.add(e),
            addClass: K,
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
            eventTargetMatches: (e, t) => !!e && $(e, t),
            getActionFromEvent: (e) => {
              if (!e.target) return "";
              const t = h(e.target, "[data-mdc-dialog-action]");
              return t && t.getAttribute("data-mdc-dialog-action");
            },
            getInitialFocusEl: Y,
            hasClass: q,
            isContentScrollable: () => {
              return !!(e = X()) && e.scrollHeight > e.offsetHeight;
              var e;
            },
            notifyClosed: (e) => {
              i(0, (C = !1)),
                Xe(
                  J(),
                  "SMUIDialog:closed",
                  e ? { action: e } : {},
                  void 0,
                  !0
                );
            },
            notifyClosing: (e) =>
              Xe(J(), "SMUIDialog:closing", e ? { action: e } : {}, void 0, !0),
            notifyOpened: () => Xe(J(), "SMUIDialog:opened", {}, void 0, !0),
            notifyOpening: () => Xe(J(), "SMUIDialog:opening", {}, void 0, !0),
            releaseFocus: () => y.releaseFocus(),
            removeBodyClass: (e) => document.body.classList.remove(e),
            removeClass: W,
            reverseButtons: () => {
              g(N, (r = !0), r);
            },
            trapFocus: () => y.trapFocus(),
            registerContentEventHandler: (e, t) => {
              const n = X();
              n instanceof HTMLElement && n.addEventListener(e, t);
            },
            deregisterContentEventHandler: (e, t) => {
              const n = X();
              n instanceof HTMLElement && n.removeEventListener(e, t);
            },
            isScrollableContentAtTop: () => {
              return !!(e = X()) && 0 === e.scrollTop;
              var e;
            },
            isScrollableContentAtBottom: () => {
              return (
                !!(e = X()) &&
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
        b.init(),
        () => {
          b.destroy();
        }
      );
    }),
      U(() => {
        P && P();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(17, (l = m(n, a))),
          "use" in e && i(1, (E = e.use)),
          "class" in e && i(2, (A = e.class)),
          "open" in e && i(0, (C = e.open)),
          "selection" in e && i(3, (_ = e.selection)),
          "escapeKeyAction" in e && i(18, (x = e.escapeKeyAction)),
          "scrimClickAction" in e && i(19, (S = e.scrimClickAction)),
          "autoStackButtons" in e && i(4, (T = e.autoStackButtons)),
          "fullscreen" in e && i(5, (O = e.fullscreen)),
          "container$class" in e && i(6, (L = e.container$class)),
          "surface$class" in e && i(7, (w = e.surface$class)),
          "$$scope" in e && i(26, (u = e.$$scope));
      }),
      (e.$$.update = () => {
        262400 & e.$$.dirty[0] &&
          b &&
          b.getEscapeKeyAction() !== x &&
          b.setEscapeKeyAction(x),
          524544 & e.$$.dirty[0] &&
            b &&
            b.getScrimClickAction() !== S &&
            b.setScrimClickAction(S),
          272 & e.$$.dirty[0] &&
            b &&
            b.getAutoStackButtons() !== T &&
            b.setAutoStackButtons(T),
          16 & e.$$.dirty[0] && (T || g(N, (r = !0), r)),
          257 & e.$$.dirty[0] &&
            b &&
            b.isOpen() !== C &&
            (C ? b.open({ isAboveFullscreenDialog: !!M }) : b.close()),
          50331936 & e.$$.dirty[0] &&
            O &&
            b &&
            G !== s &&
            (i(24, (G = s)), s ? b.showSurfaceScrim() : b.hideSurfaceScrim());
      }),
      [
        C,
        E,
        A,
        _,
        T,
        O,
        L,
        w,
        b,
        v,
        D,
        I,
        N,
        R,
        function () {
          M && g(R, (s = !0), s),
            requestAnimationFrame(() => {
              j.forEach((e) => e());
            });
        },
        function () {
          j.forEach((e) => e());
        },
        function () {
          M && g(R, (s = !1), s);
        },
        l,
        x,
        S,
        function () {
          return C;
        },
        function (e) {
          i(0, (C = e));
        },
        Q,
        J,
        G,
        s,
        u,
        c,
        () => C && b && b.layout(),
        () => C && b && b.layout(),
        (e) => C && b && b.handleDocumentKeydown(e),
        () => b && b.handleSurfaceScrimTransitionEnd(),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (v = e), i(9, v);
          });
        },
        (e) => b && b.handleClick(e),
        (e) => b && b.handleKeydown(e),
      ]
    );
  }
  class po extends $e {
    constructor(e) {
      super(),
        ge(
          this,
          e,
          uo,
          co,
          r,
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
  gt({
    class: "mdc-dialog__header",
    component: Ut,
    contexts: { "SMUI:icon-button:context": "dialog:header" },
  });
  var fo = gt({ class: "mdc-dialog__title", component: Ht }),
    mo = gt({ class: "mdc-dialog__content", component: Ut }),
    ho = gt({
      class: "mdc-dialog__actions",
      component: Ut,
      classMap: {
        "smui-dialog__actions--reversed": "SMUI:dialog:actions:reversed",
      },
      contexts: { "SMUI:button:context": "dialog:action" },
    });
  function go(e) {
    return (
      e.setAttribute("data-mdc-dialog-initial-focus", ""),
      {
        destroy() {
          e.removeAttribute("data-mdc-dialog-initial-focus");
        },
      }
    );
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
   */ var $o = { NATIVE_CONTROL_SELECTOR: ".mdc-radio__native-control" },
    Io = { DISABLED: "mdc-radio--disabled", ROOT: "mdc-radio" },
    vo = (function (e) {
      function t(n) {
        return e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Io;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return $o;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              setNativeControlDisabled: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.setDisabled = function (e) {
          var n = t.cssClasses.DISABLED;
          this.adapter.setNativeControlDisabled(e),
            e ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        t
      );
    })(Se);
  function bo(n) {
    let i,
      r,
      o,
      l,
      c,
      u,
      d,
      p,
      f,
      m,
      h,
      g,
      y,
      A,
      C,
      x = [
        { class: (o = We({ [n[9]]: !0, "mdc-radio__native-control": !0 })) },
        { type: "radio" },
        n[16],
        { disabled: n[0] },
        { __value: (l = n[15](n[7]) ? n[6] : n[7]) },
        et(n[20], "input$"),
      ],
      L = {};
    for (let e = 0; e < x.length; e += 1) L = t(L, x[e]);
    let w = [
        {
          class: (m = We({
            [n[3]]: !0,
            "mdc-radio": !0,
            "mdc-radio--disabled": n[0],
            "mdc-radio--touch": n[5],
            ...n[11],
          })),
        },
        { style: (h = Object.entries(n[12]).map(yo).concat([n[4]]).join(" ")) },
        Ye(n[20], ["input$"]),
      ],
      D = {};
    for (let e = 0; e < w.length; e += 1) D = t(D, w[e]);
    return {
      c() {
        (i = E("div")),
          (r = E("input")),
          (u = _()),
          (d = E("div")),
          (d.innerHTML =
            '<div class="mdc-radio__outer-circle"></div> \n    <div class="mdc-radio__inner-circle"></div>'),
          (p = _()),
          (f = E("div")),
          O(r, L),
          n[26][0].push(r),
          T(d, "class", "mdc-radio__background"),
          T(f, "class", "mdc-radio__ripple"),
          O(i, D);
      },
      m(e, t) {
        v(e, i, t),
          I(i, r),
          r.autofocus && r.focus(),
          (r.checked = r.__value === n[1]),
          I(i, u),
          I(i, d),
          I(i, p),
          I(i, f),
          n[27](i),
          A ||
            ((C = [
              $((c = tt.call(null, r, n[8]))),
              S(r, "change", n[25]),
              S(r, "blur", n[23]),
              S(r, "focus", n[24]),
              $(
                (g = li.call(null, i, {
                  unbounded: !0,
                  active: n[13],
                  addClass: n[17],
                  removeClass: n[18],
                  addStyle: n[19],
                }))
              ),
              $((y = tt.call(null, i, n[2]))),
              $(n[14].call(null, i)),
            ]),
            (A = !0));
      },
      p(e, [t]) {
        O(
          r,
          (L = ue(x, [
            512 & t &&
              o !==
                (o = We({ [e[9]]: !0, "mdc-radio__native-control": !0 })) && {
                class: o,
              },
            { type: "radio" },
            e[16],
            1 & t && { disabled: e[0] },
            192 & t && l !== (l = e[15](e[7]) ? e[6] : e[7]) && { __value: l },
            1048576 & t && et(e[20], "input$"),
          ]))
        ),
          c && s(c.update) && 256 & t && c.update.call(null, e[8]),
          2 & t && (r.checked = r.__value === e[1]),
          O(
            i,
            (D = ue(w, [
              2089 & t &&
                m !==
                  (m = We({
                    [e[3]]: !0,
                    "mdc-radio": !0,
                    "mdc-radio--disabled": e[0],
                    "mdc-radio--touch": e[5],
                    ...e[11],
                  })) && { class: m },
              4112 & t &&
                h !==
                  (h = Object.entries(e[12])
                    .map(yo)
                    .concat([e[4]])
                    .join(" ")) && { style: h },
              1048576 & t && Ye(e[20], ["input$"]),
            ]))
          ),
          g &&
            s(g.update) &&
            8192 & t &&
            g.update.call(null, {
              unbounded: !0,
              active: e[13],
              addClass: e[17],
              removeClass: e[18],
              addStyle: e[19],
            }),
          y && s(y.update) && 4 & t && y.update.call(null, e[2]);
      },
      i: e,
      o: e,
      d(e) {
        e && b(i),
          n[26][0].splice(n[26][0].indexOf(r), 1),
          n[27](null),
          (A = !1),
          a(C);
      },
    };
  }
  const yo = ([e, t]) => `${e}: ${t};`;
  function Eo(e, n, i) {
    const a = [
      "use",
      "class",
      "style",
      "disabled",
      "touch",
      "group",
      "value",
      "valueKey",
      "input$use",
      "input$class",
      "getId",
      "getElement",
    ];
    let s = m(n, a);
    var r;
    const o = Ze(F());
    let l = () => {};
    let c,
      u,
      { use: d = [] } = n,
      { class: p = "" } = n,
      { style: h = "" } = n,
      { disabled: g = !1 } = n,
      { touch: $ = !1 } = n,
      { group: I } = n,
      { value: v = null } = n,
      { valueKey: b = l } = n,
      { input$use: y = [] } = n,
      { input$class: E = "" } = n,
      A = {},
      C = {},
      _ = !1,
      x = null !== (r = B("SMUI:generic:input:props")) && void 0 !== r ? r : {};
    function S(e) {
      A[e] || i(11, (A[e] = !0), A);
    }
    function T(e) {
      (e in A && !A[e]) || i(11, (A[e] = !1), A);
    }
    function O() {
      return c;
    }
    k(() => {
      u = new vo({
        addClass: S,
        removeClass: T,
        setNativeControlDisabled: (e) => i(0, (g = e)),
      });
      const e = {
        _smui_radio_accessor: !0,
        get element() {
          return O();
        },
        get checked() {
          return I === v;
        },
        set checked(e) {
          e && I !== v ? i(1, (I = v)) : e || I !== v || i(1, (I = void 0));
        },
        activateRipple() {
          g || i(13, (_ = !0));
        },
        deactivateRipple() {
          i(13, (_ = !1));
        },
      };
      return (
        Xe(c, "SMUIGenericInput:mount", e),
        u.init(),
        () => {
          Xe(c, "SMUIGenericInput:unmount", e), u.destroy();
        }
      );
    });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(20, (s = m(n, a))),
          "use" in e && i(2, (d = e.use)),
          "class" in e && i(3, (p = e.class)),
          "style" in e && i(4, (h = e.style)),
          "disabled" in e && i(0, (g = e.disabled)),
          "touch" in e && i(5, ($ = e.touch)),
          "group" in e && i(1, (I = e.group)),
          "value" in e && i(6, (v = e.value)),
          "valueKey" in e && i(7, (b = e.valueKey)),
          "input$use" in e && i(8, (y = e.input$use)),
          "input$class" in e && i(9, (E = e.input$class));
      }),
      [
        g,
        I,
        d,
        p,
        h,
        $,
        v,
        b,
        y,
        E,
        c,
        A,
        C,
        _,
        o,
        function (e) {
          return e === l;
        },
        x,
        S,
        T,
        function (e, t) {
          C[e] != t &&
            ("" === t || null == t
              ? (delete C[e], i(12, C))
              : i(12, (C[e] = t), C));
        },
        s,
        function () {
          return x && x.id;
        },
        O,
        function (t) {
          V.call(this, e, t);
        },
        function (t) {
          V.call(this, e, t);
        },
        function () {
          (I = this.__value), i(1, I);
        },
        [[]],
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (c = e), i(10, c);
          });
        },
      ]
    );
  }
  class Ao extends $e {
    constructor(e) {
      super(),
        ge(this, e, Eo, bo, r, {
          use: 2,
          class: 3,
          style: 4,
          disabled: 0,
          touch: 5,
          group: 1,
          value: 6,
          valueKey: 7,
          input$use: 8,
          input$class: 9,
          getId: 21,
          getElement: 22,
        });
    }
    get getId() {
      return this.$$.ctx[21];
    }
    get getElement() {
      return this.$$.ctx[22];
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
   */ var Co = {
      CLOSING: "mdc-snackbar--closing",
      OPEN: "mdc-snackbar--open",
      OPENING: "mdc-snackbar--opening",
    },
    _o = {
      ACTION_SELECTOR: ".mdc-snackbar__action",
      ARIA_LIVE_LABEL_TEXT_ATTR: "data-mdc-snackbar-label-text",
      CLOSED_EVENT: "MDCSnackbar:closed",
      CLOSING_EVENT: "MDCSnackbar:closing",
      DISMISS_SELECTOR: ".mdc-snackbar__dismiss",
      LABEL_SELECTOR: ".mdc-snackbar__label",
      OPENED_EVENT: "MDCSnackbar:opened",
      OPENING_EVENT: "MDCSnackbar:opening",
      REASON_ACTION: "action",
      REASON_DISMISS: "dismiss",
      SURFACE_SELECTOR: ".mdc-snackbar__surface",
    },
    xo = {
      DEFAULT_AUTO_DISMISS_TIMEOUT_MS: 5e3,
      INDETERMINATE: -1,
      MAX_AUTO_DISMISS_TIMEOUT_MS: 1e4,
      MIN_AUTO_DISMISS_TIMEOUT_MS: 4e3,
      SNACKBAR_ANIMATION_CLOSE_TIME_MS: 75,
      SNACKBAR_ANIMATION_OPEN_TIME_MS: 150,
      ARIA_LIVE_DELAY_MS: 1e3,
    },
    So = xo.ARIA_LIVE_DELAY_MS,
    To = _o.ARIA_LIVE_LABEL_TEXT_ATTR;
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
  var Oo = Co.OPENING,
    Lo = Co.OPEN,
    wo = Co.CLOSING,
    Do = _o.REASON_ACTION,
    No = _o.REASON_DISMISS,
    Mo = (function (e) {
      function t(n) {
        var i = e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
        return (
          (i.opened = !1),
          (i.animationFrame = 0),
          (i.animationTimer = 0),
          (i.autoDismissTimer = 0),
          (i.autoDismissTimeoutMs = xo.DEFAULT_AUTO_DISMISS_TIMEOUT_MS),
          (i.closeOnEscape = !0),
          i
        );
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Co;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return _o;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return xo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              announce: function () {},
              notifyClosed: function () {},
              notifyClosing: function () {},
              notifyOpened: function () {},
              notifyOpening: function () {},
              removeClass: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.destroy = function () {
          this.clearAutoDismissTimer(),
            cancelAnimationFrame(this.animationFrame),
            (this.animationFrame = 0),
            clearTimeout(this.animationTimer),
            (this.animationTimer = 0),
            this.adapter.removeClass(Oo),
            this.adapter.removeClass(Lo),
            this.adapter.removeClass(wo);
        }),
        (t.prototype.open = function () {
          var e = this;
          this.clearAutoDismissTimer(),
            (this.opened = !0),
            this.adapter.notifyOpening(),
            this.adapter.removeClass(wo),
            this.adapter.addClass(Oo),
            this.adapter.announce(),
            this.runNextAnimationFrame(function () {
              e.adapter.addClass(Lo),
                (e.animationTimer = setTimeout(function () {
                  var t = e.getTimeoutMs();
                  e.handleAnimationTimerEnd(),
                    e.adapter.notifyOpened(),
                    t !== xo.INDETERMINATE &&
                      (e.autoDismissTimer = setTimeout(function () {
                        e.close(No);
                      }, t));
                }, xo.SNACKBAR_ANIMATION_OPEN_TIME_MS));
            });
        }),
        (t.prototype.close = function (e) {
          var t = this;
          void 0 === e && (e = ""),
            this.opened &&
              (cancelAnimationFrame(this.animationFrame),
              (this.animationFrame = 0),
              this.clearAutoDismissTimer(),
              (this.opened = !1),
              this.adapter.notifyClosing(e),
              this.adapter.addClass(Co.CLOSING),
              this.adapter.removeClass(Co.OPEN),
              this.adapter.removeClass(Co.OPENING),
              clearTimeout(this.animationTimer),
              (this.animationTimer = setTimeout(function () {
                t.handleAnimationTimerEnd(), t.adapter.notifyClosed(e);
              }, xo.SNACKBAR_ANIMATION_CLOSE_TIME_MS)));
        }),
        (t.prototype.isOpen = function () {
          return this.opened;
        }),
        (t.prototype.getTimeoutMs = function () {
          return this.autoDismissTimeoutMs;
        }),
        (t.prototype.setTimeoutMs = function (e) {
          var t = xo.MIN_AUTO_DISMISS_TIMEOUT_MS,
            n = xo.MAX_AUTO_DISMISS_TIMEOUT_MS;
          if (!(e === xo.INDETERMINATE || (e <= n && e >= t)))
            throw new Error(
              "\n        timeoutMs must be an integer in the range " +
                t +
                "–" +
                n +
                "\n        (or " +
                xo.INDETERMINATE +
                " to disable), but got '" +
                e +
                "'"
            );
          this.autoDismissTimeoutMs = e;
        }),
        (t.prototype.getCloseOnEscape = function () {
          return this.closeOnEscape;
        }),
        (t.prototype.setCloseOnEscape = function (e) {
          this.closeOnEscape = e;
        }),
        (t.prototype.handleKeyDown = function (e) {
          ("Escape" === e.key || 27 === e.keyCode) &&
            this.getCloseOnEscape() &&
            this.close(No);
        }),
        (t.prototype.handleActionButtonClick = function (e) {
          this.close(Do);
        }),
        (t.prototype.handleActionIconClick = function (e) {
          this.close(No);
        }),
        (t.prototype.clearAutoDismissTimer = function () {
          clearTimeout(this.autoDismissTimer), (this.autoDismissTimer = 0);
        }),
        (t.prototype.handleAnimationTimerEnd = function () {
          (this.animationTimer = 0),
            this.adapter.removeClass(Co.OPENING),
            this.adapter.removeClass(Co.CLOSING);
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
        t
      );
    })(Se);
  function Ro(e) {
    let n, i, r, o, c, f, m, h, g;
    const y = e[25].default,
      A = l(y, e, e[24], null);
    let C = [
        { class: (r = We({ [e[4]]: !0, "mdc-snackbar__surface": !0 })) },
        { role: "status" },
        { "aria-relevant": "additions" },
        et(e[12], "surface$"),
      ],
      _ = {};
    for (let e = 0; e < C.length; e += 1) _ = t(_, C[e]);
    let x = [
        {
          class: (c = We({
            [e[1]]: !0,
            "mdc-snackbar": !0,
            "mdc-snackbar--stacked": "stacked" === e[2],
            "mdc-snackbar--leading": e[3],
            ...e[8],
          })),
        },
        Ye(e[12], ["surface$"]),
      ],
      T = {};
    for (let e = 0; e < x.length; e += 1) T = t(T, x[e]);
    return {
      c() {
        (n = E("aside")), (i = E("div")), A && A.c(), O(i, _), O(n, T);
      },
      m(t, a) {
        v(t, n, a),
          I(n, i),
          A && A.m(i, null),
          e[26](n),
          (m = !0),
          h ||
            ((g = [
              $((o = tt.call(null, i, e[5]))),
              S(i, "click", e[10]),
              $((f = tt.call(null, n, e[0]))),
              $(e[9].call(null, n)),
              S(n, "SMUISnackbar:closed", e[11]),
              S(n, "keydown", e[27]),
            ]),
            (h = !0));
      },
      p(e, t) {
        A &&
          A.p &&
          (!m || 16777216 & t[0]) &&
          d(A, y, e, e[24], m ? u(y, e[24], t, null) : p(e[24]), null),
          O(
            i,
            (_ = ue(C, [
              (!m ||
                (16 & t[0] &&
                  r !==
                    (r = We({ [e[4]]: !0, "mdc-snackbar__surface": !0 })))) && {
                class: r,
              },
              { role: "status" },
              { "aria-relevant": "additions" },
              4096 & t[0] && et(e[12], "surface$"),
            ]))
          ),
          o && s(o.update) && 32 & t[0] && o.update.call(null, e[5]),
          O(
            n,
            (T = ue(x, [
              (!m ||
                (270 & t[0] &&
                  c !==
                    (c = We({
                      [e[1]]: !0,
                      "mdc-snackbar": !0,
                      "mdc-snackbar--stacked": "stacked" === e[2],
                      "mdc-snackbar--leading": e[3],
                      ...e[8],
                    })))) && { class: c },
              4096 & t[0] && Ye(e[12], ["surface$"]),
            ]))
          ),
          f && s(f.update) && 1 & t[0] && f.update.call(null, e[0]);
      },
      i(e) {
        m || (re(A, e), (m = !0));
      },
      o(e) {
        oe(A, e), (m = !1);
      },
      d(t) {
        t && b(n), A && A.d(t), e[26](null), (h = !1), a(g);
      },
    };
  }
  let Fo = Promise.resolve();
  function ko(e, n, i) {
    const a = [
      "use",
      "class",
      "variant",
      "leading",
      "timeoutMs",
      "closeOnEscape",
      "labelText",
      "actionButtonText",
      "surface$class",
      "surface$use",
      "open",
      "forceOpen",
      "close",
      "isOpen",
      "getLabelElement",
      "getActionButtonElement",
      "getElement",
    ];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n;
    const { closest: l } = we,
      c = Ze(F());
    let u = () => {};
    function d(e) {
      return e === u;
    }
    let p,
      h,
      g,
      { use: $ = [] } = n,
      { class: I = "" } = n,
      { variant: v = "" } = n,
      { leading: b = !1 } = n,
      { timeoutMs: y = 5e3 } = n,
      { closeOnEscape: E = !0 } = n,
      { labelText: A = u } = n,
      { actionButtonText: C = u } = n,
      { surface$class: _ = "" } = n,
      { surface$use: x = [] } = n,
      S = {},
      T = new Promise((e) => (g = e));
    function O(e) {
      S[e] || i(8, (S[e] = !0), S);
    }
    function L(e) {
      (e in S && !S[e]) || i(8, (S[e] = !1), S);
    }
    function w() {
      var e;
      return null !== (e = N().querySelector(".mdc-snackbar__label")) &&
        void 0 !== e
        ? e
        : document.createElement("div");
    }
    function D() {
      var e;
      return null !== (e = N().querySelector(".mdc-snackbar__action")) &&
        void 0 !== e
        ? e
        : document.createElement("button");
    }
    function N() {
      return p;
    }
    H("SMUI:label:context", "snackbar"),
      k(
        () => (
          i(
            6,
            (h = new Mo({
              addClass: O,
              announce: () =>
                (function (e, t) {
                  void 0 === t && (t = e);
                  var n = e.getAttribute("aria-live"),
                    i = t.textContent.trim();
                  i &&
                    n &&
                    (e.setAttribute("aria-live", "off"),
                    (t.textContent = ""),
                    (t.innerHTML =
                      '<span style="display: inline-block; width: 0; height: 1px;">&nbsp;</span>'),
                    t.setAttribute(To, i),
                    setTimeout(function () {
                      e.setAttribute("aria-live", n),
                        t.removeAttribute(To),
                        (t.textContent = i);
                    }, So));
                })(w()),
              notifyClosed: (e) =>
                Xe(
                  N(),
                  "SMUISnackbar:closed",
                  e ? { reason: e } : {},
                  void 0,
                  !0
                ),
              notifyClosing: (e) =>
                Xe(
                  N(),
                  "SMUISnackbar:closing",
                  e ? { reason: e } : {},
                  void 0,
                  !0
                ),
              notifyOpened: () =>
                Xe(N(), "SMUISnackbar:opened", void 0, void 0, !0),
              notifyOpening: () =>
                Xe(N(), "SMUISnackbar:opening", void 0, void 0, !0),
              removeClass: L,
            }))
          ),
          h.init(),
          () => {
            h.destroy();
          }
        )
      );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(12, (s = m(n, a))),
          "use" in e && i(0, ($ = e.use)),
          "class" in e && i(1, (I = e.class)),
          "variant" in e && i(2, (v = e.variant)),
          "leading" in e && i(3, (b = e.leading)),
          "timeoutMs" in e && i(13, (y = e.timeoutMs)),
          "closeOnEscape" in e && i(14, (E = e.closeOnEscape)),
          "labelText" in e && i(15, (A = e.labelText)),
          "actionButtonText" in e && i(16, (C = e.actionButtonText)),
          "surface$class" in e && i(4, (_ = e.surface$class)),
          "surface$use" in e && i(5, (x = e.surface$use)),
          "$$scope" in e && i(24, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        8256 & e.$$.dirty[0] &&
          h &&
          h.getTimeoutMs() !== y &&
          h.setTimeoutMs(y),
          16448 & e.$$.dirty[0] &&
            h &&
            h.getCloseOnEscape() !== E &&
            h.setCloseOnEscape(E),
          32832 & e.$$.dirty[0] &&
            h &&
            !d(A) &&
            w().textContent !== A &&
            (w().textContent = A),
          65600 & e.$$.dirty[0] &&
            h &&
            !d(C) &&
            D().textContent !== C &&
            (D().textContent = C);
      }),
      [
        $,
        I,
        v,
        b,
        _,
        x,
        h,
        p,
        S,
        c,
        function (e) {
          const t = e.target;
          h &&
            (l(t, ".mdc-snackbar__action")
              ? h.handleActionButtonClick(e)
              : l(t, ".mdc-snackbar__dismiss") && h.handleActionIconClick(e));
        },
        function () {
          g(), (T = new Promise((e) => (g = e)));
        },
        s,
        y,
        E,
        A,
        C,
        function () {
          Fo = Fo.then(() => (h.open(), T));
        },
        function () {
          return h.open();
        },
        function (e) {
          return h.close(e);
        },
        function () {
          return h.isOpen();
        },
        w,
        D,
        N,
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (p = e), i(7, p);
          });
        },
        (e) => h && h.handleKeyDown(e),
      ]
    );
  }
  class Uo extends $e {
    constructor(e) {
      super(),
        ge(
          this,
          e,
          ko,
          Ro,
          r,
          {
            use: 0,
            class: 1,
            variant: 2,
            leading: 3,
            timeoutMs: 13,
            closeOnEscape: 14,
            labelText: 15,
            actionButtonText: 16,
            surface$class: 4,
            surface$use: 5,
            open: 17,
            forceOpen: 18,
            close: 19,
            isOpen: 20,
            getLabelElement: 21,
            getActionButtonElement: 22,
            getElement: 23,
          },
          null,
          [-1, -1]
        );
    }
    get open() {
      return this.$$.ctx[17];
    }
    get forceOpen() {
      return this.$$.ctx[18];
    }
    get close() {
      return this.$$.ctx[19];
    }
    get isOpen() {
      return this.$$.ctx[20];
    }
    get getLabelElement() {
      return this.$$.ctx[21];
    }
    get getActionButtonElement() {
      return this.$$.ctx[22];
    }
    get getElement() {
      return this.$$.ctx[23];
    }
  }
  var Po = gt({
    class: "mdc-snackbar__actions",
    props: { "aria-atomic": "true" },
    contexts: {
      "SMUI:button:context": "snackbar:actions",
      "SMUI:icon-button:context": "snackbar:actions",
      "SMUI:label:context": void 0,
    },
    component: Ut,
  });
  function Ho(e) {
    let t;
    return {
      c() {
        (t = E("div")), T(t, "class", "mdc-button__touch");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Bo(e) {
    let t, n, i, a;
    const s = e[27].default,
      r = l(s, e, e[29], null);
    let o = e[6] && Ho();
    return {
      c() {
        (t = E("div")),
          (n = _()),
          r && r.c(),
          o && o.c(),
          (i = x()),
          T(t, "class", "mdc-button__ripple");
      },
      m(e, s) {
        v(e, t, s),
          v(e, n, s),
          r && r.m(e, s),
          o && o.m(e, s),
          v(e, i, s),
          (a = !0);
      },
      p(e, t) {
        r &&
          r.p &&
          (!a || 536870912 & t) &&
          d(r, s, e, e[29], a ? u(s, e[29], t, null) : p(e[29]), null),
          e[6]
            ? o || ((o = Ho()), o.c(), o.m(i.parentNode, i))
            : o && (o.d(1), (o = null));
      },
      i(e) {
        a || (re(r, e), (a = !0));
      },
      o(e) {
        oe(r, e), (a = !1);
      },
      d(e) {
        e && b(t), e && b(n), r && r.d(e), o && o.d(e), e && b(i);
      },
    };
  }
  function Vo(e) {
    let n, i, a;
    const s = [
      {
        use: [
          [
            li,
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
        class: We({
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
      { style: Object.entries(e[12]).map(jo).concat([e[2]]).join(" ") },
      e[15],
      e[14],
      e[13],
      { href: e[7] },
      e[22],
    ];
    var r = e[9];
    function o(e) {
      let n = { $$slots: { default: [Bo] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) n = t(n, s[e]);
      return { props: n };
    }
    return (
      r && ((n = new r(o(e))), e[28](n), n.$on("click", e[21])),
      {
        c() {
          n && fe(n.$$.fragment), (i = x());
        },
        m(e, t) {
          n && me(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, [t]) {
          const a =
            6289919 & t
              ? ue(s, [
                  6094873 & t && {
                    use: [
                      [
                        li,
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
                  133490 & t && {
                    class: We({
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
                  4100 & t && {
                    style: Object.entries(e[12])
                      .map(jo)
                      .concat([e[2]])
                      .join(" "),
                  },
                  32768 & t && de(e[15]),
                  16384 & t && de(e[14]),
                  8192 & t && de(e[13]),
                  128 & t && { href: e[7] },
                  4194304 & t && de(e[22]),
                ])
              : {};
          if (
            (536870976 & t && (a.$$scope = { dirty: t, ctx: e }),
            r !== (r = e[9]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                he(e, 1);
              }),
                se();
            }
            r
              ? ((n = new r(o(e))),
                e[28](n),
                n.$on("click", e[21]),
                fe(n.$$.fragment),
                re(n.$$.fragment, 1),
                me(n, i.parentNode, i))
              : (n = null);
          } else r && n.$set(a);
        },
        i(e) {
          a || (n && re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[28](null), t && b(i), n && he(n, t);
        },
      }
    );
  }
  const jo = ([e, t]) => `${e}: ${t};`;
  function zo(e, n, i) {
    let a, s, r;
    const o = [
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
    let l = m(n, o),
      { $$slots: c = {}, $$scope: u } = n;
    const d = Ze(F());
    let p,
      { use: h = [] } = n,
      { class: g = "" } = n,
      { style: $ = "" } = n,
      { ripple: I = !0 } = n,
      { color: v = "primary" } = n,
      { variant: b = "text" } = n,
      { touch: y = !1 } = n,
      { href: E } = n,
      { action: A = "close" } = n,
      { defaultAction: C = !1 } = n,
      { secondary: _ = !1 } = n,
      x = {},
      S = {},
      T = B("SMUI:button:context"),
      { component: O = null == E ? kt : Ft } = n,
      L = l.disabled;
    function w() {
      return p.getElement();
    }
    return (
      H("SMUI:label:context", "button"),
      H("SMUI:icon:context", "button"),
      (e.$$set = (e) => {
        i(30, (n = t(t({}, n), f(e)))),
          i(22, (l = m(n, o))),
          "use" in e && i(0, (h = e.use)),
          "class" in e && i(1, (g = e.class)),
          "style" in e && i(2, ($ = e.style)),
          "ripple" in e && i(3, (I = e.ripple)),
          "color" in e && i(4, (v = e.color)),
          "variant" in e && i(5, (b = e.variant)),
          "touch" in e && i(6, (y = e.touch)),
          "href" in e && i(7, (E = e.href)),
          "action" in e && i(23, (A = e.action)),
          "defaultAction" in e && i(24, (C = e.defaultAction)),
          "secondary" in e && i(8, (_ = e.secondary)),
          "component" in e && i(9, (O = e.component)),
          "$$scope" in e && i(29, (u = e.$$scope));
      }),
      (e.$$.update = () => {
        i(
          15,
          (a =
            "dialog:action" === T && null != A
              ? { "data-mdc-dialog-action": A }
              : { action: n.action })
        ),
          i(
            14,
            (s =
              "dialog:action" === T && C
                ? { "data-mdc-dialog-button-default": "" }
                : { default: n.default })
          ),
          i(13, (r = "banner" === T ? {} : { secondary: n.secondary })),
          L !== l.disabled && (w().blur(), i(26, (L = l.disabled)));
      }),
      (n = f(n)),
      [
        h,
        g,
        $,
        I,
        v,
        b,
        y,
        E,
        _,
        O,
        p,
        x,
        S,
        r,
        s,
        a,
        d,
        T,
        function (e) {
          x[e] || i(11, (x[e] = !0), x);
        },
        function (e) {
          (e in x && !x[e]) || i(11, (x[e] = !1), x);
        },
        function (e, t) {
          S[e] != t &&
            ("" === t || null == t
              ? (delete S[e], i(12, S))
              : i(12, (S[e] = t), S));
        },
        function () {
          "banner" === T &&
            Xe(
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
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (p = e), i(10, p);
          });
        },
        u,
      ]
    );
  }
  class Go extends $e {
    constructor(e) {
      super(),
        ge(this, e, zo, Vo, r, {
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
  var qo = new Map([
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
  function Ko(e, t) {
    var n = (function (e) {
      var t = e.name;
      if (t && -1 !== t.lastIndexOf(".") && !e.type) {
        var n = t.split(".").pop().toLowerCase(),
          i = qo.get(n);
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
  var Wo = [".DS_Store", "Thumbs.db"];
  function Xo(e) {
    return Ae(this, void 0, void 0, function () {
      return Ce(this, function (t) {
        return [
          2,
          ((n = e),
          n.dataTransfer && e.dataTransfer
            ? Qo(e.dataTransfer, e.type)
            : Yo(e)),
        ];
        var n;
      });
    });
  }
  function Yo(e) {
    return (null !== e.target && e.target.files ? Zo(e.target.files) : []).map(
      function (e) {
        return Ko(e);
      }
    );
  }
  function Qo(e, t) {
    return Ae(this, void 0, void 0, function () {
      var n;
      return Ce(this, function (i) {
        switch (i.label) {
          case 0:
            return e.items
              ? ((n = Zo(e.items).filter(function (e) {
                  return "file" === e.kind;
                })),
                "drop" !== t ? [2, n] : [4, Promise.all(n.map(el))])
              : [3, 2];
          case 1:
            return [2, Jo(tl(i.sent()))];
          case 2:
            return [
              2,
              Jo(
                Zo(e.files).map(function (e) {
                  return Ko(e);
                })
              ),
            ];
        }
      });
    });
  }
  function Jo(e) {
    return e.filter(function (e) {
      return -1 === Wo.indexOf(e.name);
    });
  }
  function Zo(e) {
    for (var t = [], n = 0; n < e.length; n++) {
      var i = e[n];
      t.push(i);
    }
    return t;
  }
  function el(e) {
    if ("function" != typeof e.webkitGetAsEntry) return nl(e);
    var t = e.webkitGetAsEntry();
    return t && t.isDirectory ? al(t) : nl(e);
  }
  function tl(e) {
    return e.reduce(function (e, t) {
      return (function () {
        for (var e = [], t = 0; t < arguments.length; t++)
          e = e.concat(xe(arguments[t]));
        return e;
      })(e, Array.isArray(t) ? tl(t) : [t]);
    }, []);
  }
  function nl(e) {
    var t = e.getAsFile();
    if (!t) return Promise.reject(e + " is not a File");
    var n = Ko(t);
    return Promise.resolve(n);
  }
  function il(e) {
    return Ae(this, void 0, void 0, function () {
      return Ce(this, function (t) {
        return [2, e.isDirectory ? al(e) : sl(e)];
      });
    });
  }
  function al(e) {
    var t = e.createReader();
    return new Promise(function (e, n) {
      var i = [];
      !(function a() {
        var s = this;
        t.readEntries(
          function (t) {
            return Ae(s, void 0, void 0, function () {
              var s, r, o;
              return Ce(this, function (l) {
                switch (l.label) {
                  case 0:
                    if (t.length) return [3, 5];
                    l.label = 1;
                  case 1:
                    return l.trys.push([1, 3, , 4]), [4, Promise.all(i)];
                  case 2:
                    return (s = l.sent()), e(s), [3, 4];
                  case 3:
                    return (r = l.sent()), n(r), [3, 4];
                  case 4:
                    return [3, 6];
                  case 5:
                    (o = Promise.all(t.map(il))), i.push(o), a(), (l.label = 6);
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
  function sl(e) {
    return Ae(this, void 0, void 0, function () {
      return Ce(this, function (t) {
        return [
          2,
          new Promise(function (t, n) {
            e.file(
              function (n) {
                var i = Ko(n, e.fullPath);
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
  const rl = (e) => {
      e = Array.isArray(e) && 1 === e.length ? e[0] : e;
      return {
        code: "file-invalid-type",
        message: `File type must be ${
          Array.isArray(e) ? `one of ${e.join(", ")}` : e
        }`,
      };
    },
    ol = (e) => ({
      code: "file-too-large",
      message: `File is larger than ${e} bytes`,
    }),
    ll = (e) => ({
      code: "file-too-small",
      message: `File is smaller than ${e} bytes`,
    }),
    cl = { code: "too-many-files", message: "Too many files" };
  function ul(e, t) {
    const n =
      "application/x-moz-file" === e.type ||
      (function (e, t) {
        if (e && t) {
          const n = Array.isArray(t) ? t : t.split(","),
            i = e.name || "",
            a = (e.type || "").toLowerCase(),
            s = a.replace(/\/.*$/, "");
          return n.some((e) => {
            const t = e.trim().toLowerCase();
            return "." === t.charAt(0)
              ? i.toLowerCase().endsWith(t)
              : t.endsWith("/*")
              ? s === t.replace(/\/.*$/, "")
              : a === t;
          });
        }
        return !0;
      })(e, t);
    return [n, n ? null : rl(t)];
  }
  function dl(e) {
    return null != e;
  }
  function pl(e) {
    return "function" == typeof e.isPropagationStopped
      ? e.isPropagationStopped()
      : void 0 !== e.cancelBubble && e.cancelBubble;
  }
  function fl(e) {
    return e.dataTransfer
      ? Array.prototype.some.call(
          e.dataTransfer.types,
          (e) => "Files" === e || "application/x-moz-file" === e
        )
      : !!e.target && !!e.target.files;
  }
  function ml(t) {
    let n, i, s, r, o, c, f;
    const m = t[32].default,
      h = l(m, t, t[31], null),
      g =
        h ||
        (function (t) {
          let n;
          return {
            c() {
              (n = E("p")),
                (n.textContent =
                  "Drag 'n' drop some files here, or click to select files");
            },
            m(e, t) {
              v(e, n, t);
            },
            p: e,
            d(e) {
              e && b(n);
            },
          };
        })();
    return {
      c() {
        (n = E("div")),
          (i = E("input")),
          (s = _()),
          g && g.c(),
          T(i, "accept", t[0]),
          (i.multiple = t[1]),
          T(i, "type", "file"),
          T(i, "name", t[5]),
          T(i, "autocomplete", "off"),
          T(i, "tabindex", "-1"),
          D(i, "display", "none"),
          T(n, "tabindex", "0"),
          T(
            n,
            "class",
            (r = (t[4] ? "" : "dropzone") + " " + t[2] + " svelte-817dg2")
          ),
          T(n, "style", t[3]);
      },
      m(e, a) {
        v(e, n, a),
          I(n, i),
          t[33](i),
          I(n, s),
          g && g.m(n, null),
          t[34](n),
          (o = !0),
          c ||
            ((f = [
              S(window, "focus", t[21]),
              S(window, "dragover", t[19]),
              S(window, "drop", t[20]),
              S(i, "change", t[15]),
              S(i, "click", hl),
              S(n, "keydown", t[17](t[8])),
              S(n, "focus", t[17](t[9])),
              S(n, "blur", t[17](t[10])),
              S(n, "click", t[16](t[11])),
              S(n, "dragenter", t[18](t[12])),
              S(n, "dragover", t[18](t[13])),
              S(n, "dragleave", t[18](t[14])),
              S(n, "drop", t[18](t[15])),
            ]),
            (c = !0));
      },
      p(e, t) {
        (!o || 1 & t[0]) && T(i, "accept", e[0]),
          (!o || 2 & t[0]) && (i.multiple = e[1]),
          (!o || 32 & t[0]) && T(i, "name", e[5]),
          h &&
            h.p &&
            (!o || 1 & t[1]) &&
            d(h, m, e, e[31], o ? u(m, e[31], t, null) : p(e[31]), null),
          (!o ||
            (20 & t[0] &&
              r !==
                (r =
                  (e[4] ? "" : "dropzone") + " " + e[2] + " svelte-817dg2"))) &&
            T(n, "class", r),
          (!o || 8 & t[0]) && T(n, "style", e[3]);
      },
      i(e) {
        o || (re(g, e), (o = !0));
      },
      o(e) {
        oe(g, e), (o = !1);
      },
      d(e) {
        e && b(n), t[33](null), g && g.d(e), t[34](null), (c = !1), a(f);
      },
    };
  }
  function hl(e) {
    e.stopPropagation();
  }
  function gl(e, t, n) {
    let { $$slots: i = {}, $$scope: a } = t,
      { accept: s } = t,
      { disabled: r = !1 } = t,
      { getFilesFromEvent: o = Xo } = t,
      { maxSize: l = 1 / 0 } = t,
      { minSize: c = 0 } = t,
      { multiple: u = !0 } = t,
      { preventDropOnDocument: d = !0 } = t,
      { noClick: p = !1 } = t,
      { noKeyboard: f = !1 } = t,
      { noDrag: m = !1 } = t,
      { noDragEventsBubbling: h = !1 } = t,
      { containerClasses: g = "" } = t,
      { containerStyles: $ = "" } = t,
      { disableDefaultStyles: I = !1 } = t,
      { name: v = "" } = t;
    const b = P();
    let y,
      E,
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
      E && (n(7, (E.value = null), E), (A.isFileDialogActive = !0), E.click());
    }
    function _(e) {
      return r ? null : e;
    }
    function x(e) {
      h && e.stopPropagation();
    }
    let S = [];
    return (
      U(() => {
        n(7, (E = null));
      }),
      (e.$$set = (e) => {
        "accept" in e && n(0, (s = e.accept)),
          "disabled" in e && n(22, (r = e.disabled)),
          "getFilesFromEvent" in e && n(23, (o = e.getFilesFromEvent)),
          "maxSize" in e && n(24, (l = e.maxSize)),
          "minSize" in e && n(25, (c = e.minSize)),
          "multiple" in e && n(1, (u = e.multiple)),
          "preventDropOnDocument" in e && n(26, (d = e.preventDropOnDocument)),
          "noClick" in e && n(27, (p = e.noClick)),
          "noKeyboard" in e && n(28, (f = e.noKeyboard)),
          "noDrag" in e && n(29, (m = e.noDrag)),
          "noDragEventsBubbling" in e && n(30, (h = e.noDragEventsBubbling)),
          "containerClasses" in e && n(2, (g = e.containerClasses)),
          "containerStyles" in e && n(3, ($ = e.containerStyles)),
          "disableDefaultStyles" in e && n(4, (I = e.disableDefaultStyles)),
          "name" in e && n(5, (v = e.name)),
          "$$scope" in e && n(31, (a = e.$$scope));
      }),
      [
        s,
        u,
        g,
        $,
        I,
        v,
        y,
        E,
        function (e) {
          y &&
            y.isEqualNode(e.target) &&
            ((32 !== e.keyCode && 13 !== e.keyCode) ||
              (e.preventDefault(), C()));
        },
        function () {
          A.isFocused = !0;
        },
        function () {
          A.isFocused = !1;
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
              ? C()
              : setTimeout(C, 0));
        },
        function (e) {
          e.preventDefault(),
            x(e),
            (S = [...S, e.target]),
            fl(e) &&
              Promise.resolve(o(e)).then((t) => {
                (pl(e) && !h) ||
                  ((A.draggedFiles = t),
                  (A.isDragActive = !0),
                  b("dragenter", { dragEvent: e }));
              });
        },
        function (e) {
          if ((e.preventDefault(), x(e), e.dataTransfer))
            try {
              e.dataTransfer.dropEffect = "copy";
            } catch {}
          return fl(e) && b("dragover", { dragEvent: e }), !1;
        },
        function (e) {
          e.preventDefault(), x(e);
          const t = S.filter((e) => y && y.contains(e)),
            n = t.indexOf(e.target);
          -1 !== n && t.splice(n, 1),
            (S = t),
            t.length > 0 ||
              ((A.isDragActive = !1),
              (A.draggedFiles = []),
              fl(e) && b("dragleave", { dragEvent: e }));
        },
        function (e) {
          e.preventDefault(),
            x(e),
            (S = []),
            fl(e) &&
              (b("filedropped", { event: e }),
              Promise.resolve(o(e)).then((t) => {
                if (pl(e) && !h) return;
                const n = [],
                  i = [];
                t.forEach((e) => {
                  const [t, a] = ul(e, s),
                    [r, o] = (function (e, t, n) {
                      if (dl(e.size))
                        if (dl(t) && dl(n)) {
                          if (e.size > n) return [!1, ol(n)];
                          if (e.size < t) return [!1, ll(t)];
                        } else {
                          if (dl(t) && e.size < t) return [!1, ll(t)];
                          if (dl(n) && e.size > n) return [!1, ol(n)];
                        }
                      return [!0, null];
                    })(e, c, l);
                  if (t && r) n.push(e);
                  else {
                    const t = [a, o].filter((e) => e);
                    i.push({ file: e, errors: t });
                  }
                }),
                  !u &&
                    n.length > 1 &&
                    (n.forEach((e) => {
                      i.push({ file: e, errors: [cl] });
                    }),
                    n.splice(0)),
                  (A.acceptedFiles = n),
                  (A.fileRejections = i),
                  b("drop", { acceptedFiles: n, fileRejections: i, event: e }),
                  i.length > 0 &&
                    b("droprejected", { fileRejections: i, event: e }),
                  n.length > 0 &&
                    b("dropaccepted", { acceptedFiles: n, event: e });
              })),
            (A.isFileDialogActive = !1),
            (A.isDragActive = !1),
            (A.draggedFiles = []),
            (A.acceptedFiles = []),
            (A.fileRejections = []);
        },
        _,
        function (e) {
          return f ? null : _(e);
        },
        function (e) {
          return m ? null : _(e);
        },
        function (e) {
          d && e.preventDefault();
        },
        function (e) {
          d && ((y && y.contains(e.target)) || (e.preventDefault(), (S = [])));
        },
        function () {
          A.isFileDialogActive &&
            setTimeout(() => {
              if (E) {
                const { files: e } = E;
                e.length ||
                  ((A.isFileDialogActive = !1), b("filedialogcancel"));
              }
            }, 300);
        },
        r,
        o,
        l,
        c,
        d,
        p,
        f,
        m,
        h,
        a,
        i,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (E = e), n(7, E);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (y = e), n(6, y);
          });
        },
      ]
    );
  }
  class $l extends $e {
    constructor(e) {
      super(),
        ge(
          this,
          e,
          gl,
          ml,
          r,
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
   */ var Il = {
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
    vl = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_CHECKED_INDETERMINATE_VALUE: "mixed",
      DATA_INDETERMINATE_ATTR: "data-indeterminate",
      NATIVE_CONTROL_SELECTOR: ".mdc-checkbox__native-control",
      TRANSITION_STATE_CHECKED: "checked",
      TRANSITION_STATE_INDETERMINATE: "indeterminate",
      TRANSITION_STATE_INIT: "init",
      TRANSITION_STATE_UNCHECKED: "unchecked",
    },
    bl = { ANIM_END_LATCH_MS: 250 },
    yl = (function (e) {
      function t(n) {
        var i = e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
        return (
          (i.currentCheckState = vl.TRANSITION_STATE_INIT),
          (i.currentAnimationClass = ""),
          (i.animEndLatchTimer = 0),
          (i.enableAnimationEndHandler = !1),
          i
        );
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Il;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return vl;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return bl;
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
            this.adapter.addClass(Il.UPGRADED);
        }),
        (t.prototype.destroy = function () {
          clearTimeout(this.animEndLatchTimer);
        }),
        (t.prototype.setDisabled = function (e) {
          this.adapter.setNativeControlDisabled(e),
            e
              ? this.adapter.addClass(Il.DISABLED)
              : this.adapter.removeClass(Il.DISABLED);
        }),
        (t.prototype.handleAnimationEnd = function () {
          var e = this;
          this.enableAnimationEndHandler &&
            (clearTimeout(this.animEndLatchTimer),
            (this.animEndLatchTimer = setTimeout(function () {
              e.adapter.removeClass(e.currentAnimationClass),
                (e.enableAnimationEndHandler = !1);
            }, bl.ANIM_END_LATCH_MS)));
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
              var n = Il.SELECTED;
              t === vl.TRANSITION_STATE_UNCHECKED
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
          var e = vl.TRANSITION_STATE_INDETERMINATE,
            t = vl.TRANSITION_STATE_CHECKED,
            n = vl.TRANSITION_STATE_UNCHECKED;
          return this.adapter.isIndeterminate()
            ? e
            : this.adapter.isChecked()
            ? t
            : n;
        }),
        (t.prototype.getTransitionAnimationClass = function (e, n) {
          var i = vl.TRANSITION_STATE_INIT,
            a = vl.TRANSITION_STATE_CHECKED,
            s = vl.TRANSITION_STATE_UNCHECKED,
            r = t.cssClasses,
            o = r.ANIM_UNCHECKED_CHECKED,
            l = r.ANIM_UNCHECKED_INDETERMINATE,
            c = r.ANIM_CHECKED_UNCHECKED,
            u = r.ANIM_CHECKED_INDETERMINATE,
            d = r.ANIM_INDETERMINATE_CHECKED,
            p = r.ANIM_INDETERMINATE_UNCHECKED;
          switch (e) {
            case i:
              return n === s ? "" : n === a ? d : p;
            case s:
              return n === a ? o : l;
            case a:
              return n === s ? c : u;
            default:
              return n === a ? d : p;
          }
        }),
        (t.prototype.updateAriaChecked = function () {
          this.adapter.isIndeterminate()
            ? this.adapter.setNativeControlAttr(
                vl.ARIA_CHECKED_ATTR,
                vl.ARIA_CHECKED_INDETERMINATE_VALUE
              )
            : this.adapter.removeNativeControlAttr(vl.ARIA_CHECKED_ATTR);
        }),
        t
      );
    })(Se);
  function El(n) {
    let i,
      r,
      o,
      l,
      c,
      u,
      d,
      p,
      f,
      m,
      h,
      g,
      y,
      A,
      C,
      x,
      L = [
        { class: (o = We({ [n[9]]: !0, "mdc-checkbox__native-control": !0 })) },
        { type: "checkbox" },
        n[20],
        { disabled: n[1] },
        { __value: (l = n[19](n[7]) ? n[6] : n[7]) },
        { "data-indeterminate": (c = !n[19](n[0]) && n[0] ? "true" : void 0) },
        n[16],
        et(n[26], "input$"),
      ],
      w = {};
    for (let e = 0; e < L.length; e += 1) w = t(w, L[e]);
    let D = [
        {
          class: (h = We({
            [n[3]]: !0,
            "mdc-checkbox": !0,
            "mdc-checkbox--disabled": n[1],
            "mdc-checkbox--touch": n[5],
            "mdc-data-table__header-row-checkbox":
              "data-table" === n[21] && n[22],
            "mdc-data-table__row-checkbox": "data-table" === n[21] && !n[22],
            ...n[14],
          })),
        },
        { style: (g = Object.entries(n[15]).map(Al).concat([n[4]]).join(" ")) },
        Ye(n[26], ["input$"]),
      ],
      N = {};
    for (let e = 0; e < D.length; e += 1) N = t(N, D[e]);
    return {
      c() {
        (i = E("div")),
          (r = E("input")),
          (d = _()),
          (p = E("div")),
          (p.innerHTML =
            '<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"><path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg> \n    <div class="mdc-checkbox__mixedmark"></div>'),
          (f = _()),
          (m = E("div")),
          O(r, w),
          T(p, "class", "mdc-checkbox__background"),
          T(m, "class", "mdc-checkbox__ripple"),
          O(i, N);
      },
      m(e, t) {
        v(e, i, t),
          I(i, r),
          r.autofocus && r.focus(),
          n[36](r),
          (r.checked = n[12]),
          I(i, d),
          I(i, p),
          I(i, f),
          I(i, m),
          n[38](i),
          C ||
            ((x = [
              $((u = tt.call(null, r, n[8]))),
              S(r, "change", n[37]),
              S(r, "blur", n[34]),
              S(r, "focus", n[35]),
              $((y = tt.call(null, i, n[2]))),
              $(n[18].call(null, i)),
              $(
                (A = li.call(null, i, {
                  unbounded: !0,
                  addClass: n[23],
                  removeClass: n[24],
                  addStyle: n[25],
                  active: n[17],
                  eventTarget: n[11],
                }))
              ),
              S(i, "animationend", n[39]),
            ]),
            (C = !0));
      },
      p(e, t) {
        O(
          r,
          (w = ue(L, [
            512 & t[0] &&
              o !==
                (o = We({
                  [e[9]]: !0,
                  "mdc-checkbox__native-control": !0,
                })) && { class: o },
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
            67108864 & t[0] && et(e[26], "input$"),
          ]))
        ),
          u && s(u.update) && 256 & t[0] && u.update.call(null, e[8]),
          4096 & t[0] && (r.checked = e[12]),
          O(
            i,
            (N = ue(D, [
              16426 & t[0] &&
                h !==
                  (h = We({
                    [e[3]]: !0,
                    "mdc-checkbox": !0,
                    "mdc-checkbox--disabled": e[1],
                    "mdc-checkbox--touch": e[5],
                    "mdc-data-table__header-row-checkbox":
                      "data-table" === e[21] && e[22],
                    "mdc-data-table__row-checkbox":
                      "data-table" === e[21] && !e[22],
                    ...e[14],
                  })) && { class: h },
              32784 & t[0] &&
                g !==
                  (g = Object.entries(e[15])
                    .map(Al)
                    .concat([e[4]])
                    .join(" ")) && { style: g },
              67108864 & t[0] && Ye(e[26], ["input$"]),
            ]))
          ),
          y && s(y.update) && 4 & t[0] && y.update.call(null, e[2]),
          A &&
            s(A.update) &&
            133120 & t[0] &&
            A.update.call(null, {
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
        e && b(i), n[36](null), n[38](null), (C = !1), a(x);
      },
    };
  }
  const Al = ([e, t]) => `${e}: ${t};`;
  function Cl(e, n, i) {
    const a = [
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
    let s = m(n, a);
    var r;
    const o = Ze(F());
    let l = () => {};
    function c(e) {
      return e === l;
    }
    let u,
      d,
      p,
      { use: h = [] } = n,
      { class: g = "" } = n,
      { style: $ = "" } = n,
      { disabled: I = !1 } = n,
      { touch: v = !1 } = n,
      { indeterminate: b = l } = n,
      { group: y = l } = n,
      { checked: E = l } = n,
      { value: A = null } = n,
      { valueKey: C = l } = n,
      { input$use: _ = [] } = n,
      { input$class: x = "" } = n,
      S = {},
      T = {},
      O = {},
      L = !1,
      w = null !== (r = B("SMUI:generic:input:props")) && void 0 !== r ? r : {},
      D = c(y) ? !c(E) && (null != E ? E : void 0) : -1 !== y.indexOf(A),
      N = B("SMUI:checkbox:context"),
      M = B("SMUI:data-table:row:header"),
      R = E,
      U = c(y) ? [] : [...y],
      P = D;
    function H(e) {
      S[e] || i(14, (S[e] = !0), S);
    }
    function j(e) {
      (e in S && !S[e]) || i(14, (S[e] = !1), S);
    }
    function G(e, t) {
      O[e] !== t && i(16, (O[e] = t), O);
    }
    function q(e) {
      (e in O && null == O[e]) || i(16, (O[e] = void 0), O);
    }
    function K() {
      return u;
    }
    k(() => {
      i(11, (p.indeterminate = !c(b) && b), p),
        i(
          10,
          (d = new yl({
            addClass: H,
            forceLayout: () => u.offsetWidth,
            hasNativeControl: () => !0,
            isAttachedToDOM: () => Boolean(u.parentNode),
            isChecked: () => null != D && D,
            isIndeterminate: () => !c(b) && b,
            removeClass: j,
            removeNativeControlAttr: q,
            setNativeControlAttr: G,
            setNativeControlDisabled: (e) => i(1, (I = e)),
          }))
        );
      const e = {
        _smui_checkbox_accessor: !0,
        get element() {
          return K();
        },
        get checked() {
          return null != D && D;
        },
        set checked(e) {
          D !== e && i(12, (D = e));
        },
        get indeterminate() {
          return !c(b) && b;
        },
        set indeterminate(e) {
          i(0, (b = e));
        },
        activateRipple() {
          I || i(17, (L = !0));
        },
        deactivateRipple() {
          i(17, (L = !1));
        },
      };
      return (
        Xe(u, "SMUIGenericInput:mount", e),
        Xe(u, "SMUICheckbox:mount", e),
        d.init(),
        () => {
          Xe(u, "SMUIGenericInput:unmount", e),
            Xe(u, "SMUICheckbox:unmount", e),
            d.destroy();
        }
      );
    });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(26, (s = m(n, a))),
          "use" in e && i(2, (h = e.use)),
          "class" in e && i(3, (g = e.class)),
          "style" in e && i(4, ($ = e.style)),
          "disabled" in e && i(1, (I = e.disabled)),
          "touch" in e && i(5, (v = e.touch)),
          "indeterminate" in e && i(0, (b = e.indeterminate)),
          "group" in e && i(27, (y = e.group)),
          "checked" in e && i(28, (E = e.checked)),
          "value" in e && i(6, (A = e.value)),
          "valueKey" in e && i(7, (C = e.valueKey)),
          "input$use" in e && i(8, (_ = e.input$use)),
          "input$class" in e && i(9, (x = e.input$class));
      }),
      (e.$$.update = () => {
        if ((402660417 & e.$$.dirty[0]) | (7 & e.$$.dirty[1])) {
          let e = !1;
          if (!c(y))
            if (P !== D) {
              const t = y.indexOf(A);
              D && -1 === t
                ? (y.push(A),
                  i(27, y),
                  i(33, P),
                  i(12, D),
                  i(6, A),
                  i(32, U),
                  i(28, E),
                  i(31, R),
                  i(0, b),
                  i(11, p),
                  i(10, d))
                : D ||
                  -1 === t ||
                  (y.splice(t, 1),
                  i(27, y),
                  i(33, P),
                  i(12, D),
                  i(6, A),
                  i(32, U),
                  i(28, E),
                  i(31, R),
                  i(0, b),
                  i(11, p),
                  i(10, d)),
                (e = !0);
            } else {
              const t = U.indexOf(A),
                n = y.indexOf(A);
              t > -1 && -1 === n
                ? (i(12, (D = !1)), (e = !0))
                : n > -1 && -1 === t && (i(12, (D = !0)), (e = !0));
            }
          c(E)
            ? !!P != !!D && (e = !0)
            : E !== (null != D ? D : null) &&
              (E === R
                ? (i(28, (E = null != D ? D : null)), c(b) || i(0, (b = !1)))
                : i(12, (D = null != E ? E : void 0)),
              (e = !0)),
            p &&
              (c(b)
                ? p.indeterminate &&
                  (i(11, (p.indeterminate = !1), p), (e = !0))
                : !b && p.indeterminate
                ? (i(11, (p.indeterminate = !1), p), (e = !0))
                : b &&
                  !p.indeterminate &&
                  (i(11, (p.indeterminate = !0), p), (e = !0))),
            i(31, (R = E)),
            i(32, (U = c(y) ? [] : [...y])),
            i(33, (P = D)),
            e && d && d.handleChange();
        }
      }),
      [
        b,
        I,
        h,
        g,
        $,
        v,
        A,
        C,
        _,
        x,
        d,
        p,
        D,
        u,
        S,
        T,
        O,
        L,
        o,
        c,
        w,
        N,
        M,
        H,
        j,
        function (e, t) {
          T[e] != t &&
            ("" === t || null == t
              ? (delete T[e], i(15, T))
              : i(15, (T[e] = t), T));
        },
        s,
        y,
        E,
        function () {
          return w && w.id;
        },
        K,
        R,
        U,
        P,
        function (t) {
          V.call(this, e, t);
        },
        function (t) {
          V.call(this, e, t);
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (p = e),
              i(11, p),
              i(27, y),
              i(33, P),
              i(12, D),
              i(6, A),
              i(32, U),
              i(28, E),
              i(31, R),
              i(0, b),
              i(10, d);
          });
        },
        function () {
          (D = this.checked),
            i(12, D),
            i(27, y),
            i(33, P),
            i(6, A),
            i(32, U),
            i(28, E),
            i(31, R),
            i(0, b),
            i(11, p),
            i(10, d);
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(13, u);
          });
        },
        () => d && d.handleAnimationEnd(),
      ]
    );
  }
  class _l extends $e {
    constructor(e) {
      super(),
        ge(
          this,
          e,
          Cl,
          El,
          r,
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
   */ var xl = { ROOT: "mdc-form-field" },
    Sl = { LABEL_SELECTOR: ".mdc-form-field > label" },
    Tl = (function (e) {
      function t(n) {
        var i = e.call(this, Ee(Ee({}, t.defaultAdapter), n)) || this;
        return (
          (i.click = function () {
            i.handleClick();
          }),
          i
        );
      }
      return (
        ye(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return xl;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Sl;
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
    })(Se);
  const Ol = (e) => ({}),
    Ll = (e) => ({});
  function wl(e) {
    let n, i, r, o, c, f, m, h, g;
    const y = e[13].default,
      A = l(y, e, e[12], null),
      C = e[13].label,
      x = l(C, e, e[12], Ll);
    let T = [{ for: e[4] }, et(e[10], "label$")],
      L = {};
    for (let e = 0; e < T.length; e += 1) L = t(L, T[e]);
    let w = [
        {
          class: (c = We({
            [e[1]]: !0,
            "mdc-form-field": !0,
            "mdc-form-field--align-end": "end" === e[2],
            "mdc-form-field--nowrap": e[3],
          })),
        },
        Ye(e[10], ["label$"]),
      ],
      D = {};
    for (let e = 0; e < w.length; e += 1) D = t(D, w[e]);
    return {
      c() {
        (n = E("div")),
          A && A.c(),
          (i = _()),
          (r = E("label")),
          x && x.c(),
          O(r, L),
          O(n, D);
      },
      m(t, a) {
        v(t, n, a),
          A && A.m(n, null),
          I(n, i),
          I(n, r),
          x && x.m(r, null),
          e[14](r),
          e[15](n),
          (m = !0),
          h ||
            ((g = [
              $((o = tt.call(null, r, e[5]))),
              $((f = tt.call(null, n, e[0]))),
              $(e[9].call(null, n)),
              S(n, "SMUIGenericInput:mount", e[16]),
              S(n, "SMUIGenericInput:unmount", e[17]),
            ]),
            (h = !0));
      },
      p(e, [t]) {
        A &&
          A.p &&
          (!m || 4096 & t) &&
          d(A, y, e, e[12], m ? u(y, e[12], t, null) : p(e[12]), null),
          x &&
            x.p &&
            (!m || 4096 & t) &&
            d(x, C, e, e[12], m ? u(C, e[12], t, Ol) : p(e[12]), Ll),
          O(
            r,
            (L = ue(T, [
              (!m || 16 & t) && { for: e[4] },
              1024 & t && et(e[10], "label$"),
            ]))
          ),
          o && s(o.update) && 32 & t && o.update.call(null, e[5]),
          O(
            n,
            (D = ue(w, [
              (!m ||
                (14 & t &&
                  c !==
                    (c = We({
                      [e[1]]: !0,
                      "mdc-form-field": !0,
                      "mdc-form-field--align-end": "end" === e[2],
                      "mdc-form-field--nowrap": e[3],
                    })))) && { class: c },
              1024 & t && Ye(e[10], ["label$"]),
            ]))
          ),
          f && s(f.update) && 1 & t && f.update.call(null, e[0]);
      },
      i(e) {
        m || (re(A, e), re(x, e), (m = !0));
      },
      o(e) {
        oe(A, e), oe(x, e), (m = !1);
      },
      d(t) {
        t && b(n),
          A && A.d(t),
          x && x.d(t),
          e[14](null),
          e[15](null),
          (h = !1),
          a(g);
      },
    };
  }
  let Dl = 0;
  function Nl(e, n, i) {
    const a = [
      "use",
      "class",
      "align",
      "noWrap",
      "inputId",
      "label$use",
      "getElement",
    ];
    let s = m(n, a),
      { $$slots: r = {}, $$scope: o } = n;
    const l = Ze(F());
    let c,
      u,
      d,
      p,
      { use: h = [] } = n,
      { class: g = "" } = n,
      { align: $ = "start" } = n,
      { noWrap: I = !1 } = n,
      { inputId: v = "SMUI-form-field-" + Dl++ } = n,
      { label$use: b = [] } = n;
    H("SMUI:generic:input:props", { id: v }),
      k(
        () => (
          (u = new Tl({
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
        (n = t(t({}, n), f(e))),
          i(10, (s = m(n, a))),
          "use" in e && i(0, (h = e.use)),
          "class" in e && i(1, (g = e.class)),
          "align" in e && i(2, ($ = e.align)),
          "noWrap" in e && i(3, (I = e.noWrap)),
          "inputId" in e && i(4, (v = e.inputId)),
          "label$use" in e && i(5, (b = e.label$use)),
          "$$scope" in e && i(12, (o = e.$$scope));
      }),
      [
        h,
        g,
        $,
        I,
        v,
        b,
        c,
        d,
        p,
        l,
        s,
        function () {
          return c;
        },
        o,
        r,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (d = e), i(7, d);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (c = e), i(6, c);
          });
        },
        (e) => i(8, (p = e.detail)),
        () => i(8, (p = void 0)),
      ]
    );
  }
  class Ml extends $e {
    constructor(e) {
      super(),
        ge(this, e, Nl, wl, r, {
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
  function Rl(e, t, n) {
    const i = e.slice();
    return (i[16] = t[n]), i;
  }
  function Fl(e, t, n) {
    const i = e.slice();
    return (i[16] = t[n]), i;
  }
  function kl(e) {
    let t, n;
    return (
      (t = new Ml({
        props: { $$slots: { label: [Vl], default: [Bl] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2097154 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function Ul(e) {
    let t, n;
    return (
      (t = new Ml({
        props: { $$slots: { default: [ql] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2097158 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function Pl(e) {
    let t, n;
    return (
      (t = new Ml({
        props: { $$slots: { default: [Kl] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2097158 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function Hl(e) {
    let t, n;
    return (
      (t = new Ml({
        props: { $$slots: { default: [Wl] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2097158 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function Bl(e) {
    let t, n, i;
    function a(t) {
      e[13](t);
    }
    let s = { indeterminate: null === e[1] };
    return (
      void 0 !== e[1] && (s.checked = e[1]),
      (t = new _l({ props: s })),
      z.push(() => pe(t, "checked", a)),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, n) {
          me(t, e, n), (i = !0);
        },
        p(e, i) {
          const a = {};
          2 & i && (a.indeterminate = null === e[1]),
            !n && 2 & i && ((n = !0), (a.checked = e[1]), Q(() => (n = !1))),
            t.$set(a);
        },
        i(e) {
          i || (re(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function Vl(t) {
    let n;
    return {
      c() {
        (n = E("span")), (n.textContent = `${t[4]}`), T(n, "slot", "label");
      },
      m(e, t) {
        v(e, n, t);
      },
      p: e,
      d(e) {
        e && b(n);
      },
    };
  }
  function jl(t) {
    let n,
      i = t[16].name + "";
    return {
      c() {
        n = C(i);
      },
      m(e, t) {
        v(e, n, t);
      },
      p: e,
      d(e) {
        e && b(n);
      },
    };
  }
  function zl(e) {
    let t, n;
    return (
      (t = new Qr({
        props: {
          value: e[16].name,
          $$slots: { default: [jl] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2097152 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function Gl(e) {
    let t,
      n,
      i = e[5],
      a = [];
    for (let t = 0; t < i.length; t += 1) a[t] = zl(Fl(e, i, t));
    const s = (e) =>
      oe(a[e], 1, 1, () => {
        a[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < a.length; e += 1) a[e].c();
        t = x();
      },
      m(e, i) {
        for (let t = 0; t < a.length; t += 1) a[t].m(e, i);
        v(e, t, i), (n = !0);
      },
      p(e, n) {
        if (32 & n) {
          let r;
          for (i = e[5], r = 0; r < i.length; r += 1) {
            const s = Fl(e, i, r);
            a[r]
              ? (a[r].p(s, n), re(a[r], 1))
              : ((a[r] = zl(s)),
                a[r].c(),
                re(a[r], 1),
                a[r].m(t.parentNode, t));
          }
          for (ae(), r = i.length; r < a.length; r += 1) s(r);
          se();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < i.length; e += 1) re(a[e]);
          n = !0;
        }
      },
      o(e) {
        a = a.filter(Boolean);
        for (let e = 0; e < a.length; e += 1) oe(a[e]);
        n = !1;
      },
      d(e) {
        y(a, e), e && b(t);
      },
    };
  }
  function ql(e) {
    let t, n, i, a, s, r;
    function o(t) {
      e[11](t);
    }
    let l = { indeterminate: null === e[1] };
    function c(t) {
      e[12](t);
    }
    void 0 !== e[1] && (l.checked = e[1]),
      (t = new _l({ props: l })),
      z.push(() => pe(t, "checked", o));
    let u = { label: e[4], $$slots: { default: [Gl] }, $$scope: { ctx: e } };
    return (
      void 0 !== e[2] && (u.value = e[2]),
      (a = new Kr({ props: u })),
      z.push(() => pe(a, "value", c)),
      {
        c() {
          fe(t.$$.fragment), (i = _()), fe(a.$$.fragment);
        },
        m(e, n) {
          me(t, e, n), v(e, i, n), me(a, e, n), (r = !0);
        },
        p(e, i) {
          const r = {};
          2 & i && (r.indeterminate = null === e[1]),
            !n && 2 & i && ((n = !0), (r.checked = e[1]), Q(() => (n = !1))),
            t.$set(r);
          const o = {};
          2097152 & i && (o.$$scope = { dirty: i, ctx: e }),
            !s && 4 & i && ((s = !0), (o.value = e[2]), Q(() => (s = !1))),
            a.$set(o);
        },
        i(e) {
          r || (re(t.$$.fragment, e), re(a.$$.fragment, e), (r = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(a.$$.fragment, e), (r = !1);
        },
        d(e) {
          he(t, e), e && b(i), he(a, e);
        },
      }
    );
  }
  function Kl(e) {
    let t, n, i, a, s, r;
    function o(t) {
      e[9](t);
    }
    let l = { indeterminate: null === e[1] };
    function c(t) {
      e[10](t);
    }
    void 0 !== e[1] && (l.checked = e[1]),
      (t = new _l({ props: l })),
      z.push(() => pe(t, "checked", o));
    let u = { label: e[4], type: "number" };
    return (
      void 0 !== e[2] && (u.value = e[2]),
      (a = new wa({ props: u })),
      z.push(() => pe(a, "value", c)),
      {
        c() {
          fe(t.$$.fragment), (i = _()), fe(a.$$.fragment);
        },
        m(e, n) {
          me(t, e, n), v(e, i, n), me(a, e, n), (r = !0);
        },
        p(e, i) {
          const r = {};
          2 & i && (r.indeterminate = null === e[1]),
            !n && 2 & i && ((n = !0), (r.checked = e[1]), Q(() => (n = !1))),
            t.$set(r);
          const o = {};
          !s && 4 & i && ((s = !0), (o.value = e[2]), Q(() => (s = !1))),
            a.$set(o);
        },
        i(e) {
          r || (re(t.$$.fragment, e), re(a.$$.fragment, e), (r = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(a.$$.fragment, e), (r = !1);
        },
        d(e) {
          he(t, e), e && b(i), he(a, e);
        },
      }
    );
  }
  function Wl(e) {
    let t, n, i, a, s, r;
    function o(t) {
      e[7](t);
    }
    let l = { indeterminate: null === e[1] };
    function c(t) {
      e[8](t);
    }
    void 0 !== e[1] && (l.checked = e[1]),
      (t = new _l({ props: l })),
      z.push(() => pe(t, "checked", o));
    let u = { label: e[4] };
    return (
      void 0 !== e[2] && (u.value = e[2]),
      (a = new wa({ props: u })),
      z.push(() => pe(a, "value", c)),
      {
        c() {
          fe(t.$$.fragment), (i = _()), fe(a.$$.fragment);
        },
        m(e, n) {
          me(t, e, n), v(e, i, n), me(a, e, n), (r = !0);
        },
        p(e, i) {
          const r = {};
          2 & i && (r.indeterminate = null === e[1]),
            !n && 2 & i && ((n = !0), (r.checked = e[1]), Q(() => (n = !1))),
            t.$set(r);
          const o = {};
          !s && 4 & i && ((s = !0), (o.value = e[2]), Q(() => (s = !1))),
            a.$set(o);
        },
        i(e) {
          r || (re(t.$$.fragment, e), re(a.$$.fragment, e), (r = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(a.$$.fragment, e), (r = !1);
        },
        d(e) {
          he(t, e), e && b(i), he(a, e);
        },
      }
    );
  }
  function Xl(e) {
    let t,
      n,
      i,
      a,
      s,
      r,
      o = e[0].expanded && Yl(e);
    return {
      c() {
        (t = E("div")),
          (t.textContent = "▶"),
          (n = _()),
          o && o.c(),
          (i = x()),
          T(t, "class", "arrow svelte-7av3ky"),
          N(t, "arrowDown", e[3]);
      },
      m(l, c) {
        v(l, t, c),
          v(l, n, c),
          o && o.m(l, c),
          v(l, i, c),
          (a = !0),
          s || ((r = S(t, "click", e[6])), (s = !0));
      },
      p(e, n) {
        8 & n && N(t, "arrowDown", e[3]),
          e[0].expanded
            ? o
              ? (o.p(e, n), 1 & n && re(o, 1))
              : ((o = Yl(e)), o.c(), re(o, 1), o.m(i.parentNode, i))
            : o &&
              (ae(),
              oe(o, 1, 1, () => {
                o = null;
              }),
              se());
      },
      i(e) {
        a || (re(o), (a = !0));
      },
      o(e) {
        oe(o), (a = !1);
      },
      d(e) {
        e && b(t), e && b(n), o && o.d(e), e && b(i), (s = !1), r();
      },
    };
  }
  function Yl(e) {
    let t,
      n,
      i = e[5],
      a = [];
    for (let t = 0; t < i.length; t += 1) a[t] = Ql(Rl(e, i, t));
    const s = (e) =>
      oe(a[e], 1, 1, () => {
        a[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < a.length; e += 1) a[e].c();
        t = x();
      },
      m(e, i) {
        for (let t = 0; t < a.length; t += 1) a[t].m(e, i);
        v(e, t, i), (n = !0);
      },
      p(e, n) {
        if (32 & n) {
          let r;
          for (i = e[5], r = 0; r < i.length; r += 1) {
            const s = Rl(e, i, r);
            a[r]
              ? (a[r].p(s, n), re(a[r], 1))
              : ((a[r] = Ql(s)),
                a[r].c(),
                re(a[r], 1),
                a[r].m(t.parentNode, t));
          }
          for (ae(), r = i.length; r < a.length; r += 1) s(r);
          se();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < i.length; e += 1) re(a[e]);
          n = !0;
        }
      },
      o(e) {
        a = a.filter(Boolean);
        for (let e = 0; e < a.length; e += 1) oe(a[e]);
        n = !1;
      },
      d(e) {
        y(a, e), e && b(t);
      },
    };
  }
  function Ql(t) {
    let n, i;
    return (
      (n = new ec({ props: { tree: t[16] } })),
      n.$on("change", t[14]),
      {
        c() {
          fe(n.$$.fragment);
        },
        m(e, t) {
          me(n, e, t), (i = !0);
        },
        p: e,
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(e) {
          he(n, e);
        },
      }
    );
  }
  function Jl(e) {
    let t, n, i, a, s, r;
    const o = [Hl, Pl, Ul, kl],
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
    (i = c(e)), (a = l[i] = o[i](e));
    let u = e[5].length > 0 && "EnumField" !== e[0].type && Xl(e);
    return {
      c() {
        (t = E("ul")),
          (n = E("li")),
          a.c(),
          (s = _()),
          u && u.c(),
          T(t, "class", "svelte-7av3ky");
      },
      m(e, a) {
        v(e, t, a),
          I(t, n),
          l[i].m(n, null),
          I(n, s),
          u && u.m(n, null),
          (r = !0);
      },
      p(e, [t]) {
        let r = i;
        (i = c(e)),
          i === r
            ? l[i].p(e, t)
            : (ae(),
              oe(l[r], 1, 1, () => {
                l[r] = null;
              }),
              se(),
              (a = l[i]),
              a ? a.p(e, t) : ((a = l[i] = o[i](e)), a.c()),
              re(a, 1),
              a.m(n, s)),
          e[5].length > 0 && "EnumField" !== e[0].type
            ? u
              ? (u.p(e, t), 1 & t && re(u, 1))
              : ((u = Xl(e)), u.c(), re(u, 1), u.m(n, null))
            : u &&
              (ae(),
              oe(u, 1, 1, () => {
                u = null;
              }),
              se());
      },
      i(e) {
        r || (re(a), re(u), (r = !0));
      },
      o(e) {
        oe(a), oe(u), (r = !1);
      },
      d(e) {
        e && b(t), l[i].d(), u && u.d();
      },
    };
  }
  function Zl(e, t, n) {
    let i,
      { tree: a } = t;
    const { name: s, children: r } = a;
    let o = void 0 !== a.selected && a.selected,
      l = a.value || null;
    const c = P();
    return (
      (e.$$set = (e) => {
        "tree" in e && n(0, (a = e.tree));
      }),
      (e.$$.update = () => {
        7 & e.$$.dirty &&
          (console.log("checked:", o),
          n(0, (a.selected = o), a),
          n(0, (a.value = l), a),
          c("change", { tree: a })),
          1 & e.$$.dirty && n(3, (i = a.expanded));
      }),
      [
        a,
        o,
        l,
        i,
        s,
        r,
        () => {
          n(0, (a.expanded = !a.expanded), a);
        },
        function (e) {
          (o = e), n(1, o);
        },
        function (e) {
          (l = e), n(2, l);
        },
        function (e) {
          (o = e), n(1, o);
        },
        function (e) {
          (l = e), n(2, l);
        },
        function (e) {
          (o = e), n(1, o);
        },
        function (e) {
          (l = e), n(2, l);
        },
        function (e) {
          (o = e), n(1, o);
        },
        function (t) {
          V.call(this, e, t);
        },
      ]
    );
  }
  class ec extends $e {
    constructor(e) {
      super(), ge(this, e, Zl, Jl, r, { tree: 0 });
    }
  }
  function tc(e, t, n) {
    const i = e.slice();
    return (i[3] = t[n]), i;
  }
  function nc(e) {
    let t, n;
    return (
      (t = new ec({ props: { tree: e[3] } })),
      t.$on("change", e[1]),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          1 & n && (i.tree = e[3]), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function ic(e) {
    let t,
      n,
      i = e[0],
      a = [];
    for (let t = 0; t < i.length; t += 1) a[t] = nc(tc(e, i, t));
    const s = (e) =>
      oe(a[e], 1, 1, () => {
        a[e] = null;
      });
    return {
      c() {
        t = E("main");
        for (let e = 0; e < a.length; e += 1) a[e].c();
      },
      m(e, i) {
        v(e, t, i);
        for (let e = 0; e < a.length; e += 1) a[e].m(t, null);
        n = !0;
      },
      p(e, [n]) {
        if (3 & n) {
          let r;
          for (i = e[0], r = 0; r < i.length; r += 1) {
            const s = tc(e, i, r);
            a[r]
              ? (a[r].p(s, n), re(a[r], 1))
              : ((a[r] = nc(s)), a[r].c(), re(a[r], 1), a[r].m(t, null));
          }
          for (ae(), r = i.length; r < a.length; r += 1) s(r);
          se();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < i.length; e += 1) re(a[e]);
          n = !0;
        }
      },
      o(e) {
        a = a.filter(Boolean);
        for (let e = 0; e < a.length; e += 1) oe(a[e]);
        n = !1;
      },
      d(e) {
        e && b(t), y(a, e);
      },
    };
  }
  function ac(e) {
    const t = e.children.flatMap(ac);
    return e.selected && t.push(e), t;
  }
  function sc(e, t, n) {
    let { trees: i } = t;
    const a = P();
    return (
      (e.$$set = (e) => {
        "trees" in e && n(0, (i = e.trees));
      }),
      [
        i,
        function () {
          const e = i.flatMap(ac);
          a("change", { filterTags: e });
        },
      ]
    );
  }
  class rc extends $e {
    constructor(e) {
      super(), ge(this, e, sc, ic, r, { trees: 0 });
    }
  }
  class oc {
    constructor() {
      this.baseUrl = window.location.href
        .replace("Search", "TagFormat")
        .replace(/static.*$/, "human");
    }
    async toHumanFormat(e) {
      const t = encodeURIComponent(JSON.stringify(e)),
        n = `${this.baseUrl}?tags=${t}`,
        i = await fetch(n);
      if (i.status > 399) throw new lc(await i.text());
      return await i.json();
    }
  }
  class lc extends Error {}
  class cc {
    constructor() {
      const e = window.location.href.split("/");
      e.pop(), e.pop(), (this.baseUrl = e.join("/") + "/artifacts/");
    }
    async listArtifacts() {
      const e = (await this._fetchJson(this.baseUrl)).mapError(
        (e) => new pc(e.message)
      );
      return Jt(await e.unwrap(), (e) =>
        class {
          static tryFrom(e) {
            if (e.displayName) {
              const t = [e.id, ...e.children.map((e) => e.id).sort()].join("/");
              return (e.hash = t), e;
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
    async readFile(e) {
      return new Promise((t, n) => {
        const i = new FileReader();
        (i.onload = () =>
          i.error ? (console.log("error:", i.error), n(i.error)) : t(i.result)),
          i.readAsArrayBuffer(e);
      });
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
        body: await this.readFile(e),
      };
      return (await this._fetch(t, n))
        .mapError((e) => new mc(e.message))
        .unwrap();
    }
    async appendArtifact(e, t, n) {
      console.log({ action: "append", metadata: t, files: n });
      const i = Zt(e),
        a = i && i.id,
        s = a ? "?lastId=" + encodeURIComponent(a) : "",
        r = this.baseUrl + e.id + "/uploadUrl" + s,
        o = n.map((e) => e.name),
        l = {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ metadata: t, filenames: o }),
        },
        c = (
          await (await this._fetchJson(r, l))
            .mapError((e) => new mc(e.message))
            .unwrap()
        ).map(async (e) => {
          const t = e.name.substring(4),
            i = n.find((e) => e.name == t);
          !(function (e, t) {
            if (!e) throw t;
          })(!!i, new mc("Could not find upload URL for " + t)),
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
        .mapError((e) => new fc(e.message))
        .unwrap();
    }
    async _fetch(e, t = null) {
      const n = await fetch(e, t);
      let i = null;
      return n.status > 399 && (i = new uc(await n.text())), new Qt(n, i);
    }
    async _fetchJson(e, t = null) {
      return (await this._fetch(e, t)).map((e) => e.json());
    }
  }
  class uc extends Error {
    constructor(e) {
      super(e);
    }
  }
  class dc extends uc {
    constructor(e, t) {
      super(`Unable to ${e}: ${t}`);
    }
  }
  class pc extends dc {
    constructor(e) {
      super("list artifacts", e);
    }
  }
  class fc extends dc {
    constructor(e) {
      super("create", e);
    }
  }
  class mc extends dc {
    constructor(e) {
      super("append", e);
    }
  }
  const { document: hc } = le;
  function gc(e, t, n) {
    const i = e.slice();
    return (i[66] = t[n]), i;
  }
  function $c(e, t, n) {
    const i = e.slice();
    return (i[72] = t[n]), i;
  }
  function Ic(e) {
    let t,
      n,
      i = (e[17] && e[17].displayName) + "";
    return {
      c() {
        (t = C("Download ")), (n = C(i));
      },
      m(e, i) {
        v(e, t, i), v(e, n, i);
      },
      p(e, t) {
        131072 & t[0] &&
          i !== (i = (e[17] && e[17].displayName) + "") &&
          L(n, i);
      },
      d(e) {
        e && b(t), e && b(n);
      },
    };
  }
  function vc(e) {
    let t, n, i;
    function a(t) {
      e[27](t);
    }
    let s = { value: "all" };
    return (
      void 0 !== e[18] && (s.group = e[18]),
      (t = new Ao({ props: s })),
      z.push(() => pe(t, "group", a)),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, n) {
          me(t, e, n), (i = !0);
        },
        p(e, i) {
          const a = {};
          !n &&
            262144 & i[0] &&
            ((n = !0), (a.group = e[18]), Q(() => (n = !1))),
            t.$set(a);
        },
        i(e) {
          i || (re(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function bc(e) {
    let t;
    return {
      c() {
        t = C("All Data");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function yc(e) {
    let t, n, i, a;
    return (
      (t = new gs({
        props: { $$slots: { default: [vc] }, $$scope: { ctx: e } },
      })),
      (i = new us({
        props: { $$slots: { default: [bc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment), (n = _()), fe(i.$$.fragment);
        },
        m(e, s) {
          me(t, e, s), v(e, n, s), me(i, e, s), (a = !0);
        },
        p(e, n) {
          const a = {};
          (262144 & n[0]) | (8192 & n[2]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
          const s = {};
          8192 & n[2] && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          a || (re(t.$$.fragment, e), re(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          he(t, e), e && b(n), he(i, e);
        },
      }
    );
  }
  function Ec(e) {
    let t, n, i;
    function a(t) {
      e[28](t);
    }
    let s = { value: "latest" };
    return (
      void 0 !== e[18] && (s.group = e[18]),
      (t = new Ao({ props: s })),
      z.push(() => pe(t, "group", a)),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, n) {
          me(t, e, n), (i = !0);
        },
        p(e, i) {
          const a = {};
          !n &&
            262144 & i[0] &&
            ((n = !0), (a.group = e[18]), Q(() => (n = !1))),
            t.$set(a);
        },
        i(e) {
          i || (re(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function Ac(e) {
    let t;
    return {
      c() {
        t = C("Latest Data");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Cc(e) {
    let t, n, i, a;
    return (
      (t = new gs({
        props: { $$slots: { default: [Ec] }, $$scope: { ctx: e } },
      })),
      (i = new us({
        props: { $$slots: { default: [Ac] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment), (n = _()), fe(i.$$.fragment);
        },
        m(e, s) {
          me(t, e, s), v(e, n, s), me(i, e, s), (a = !0);
        },
        p(e, n) {
          const a = {};
          (262144 & n[0]) | (8192 & n[2]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
          const s = {};
          8192 & n[2] && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          a || (re(t.$$.fragment, e), re(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          he(t, e), e && b(n), he(i, e);
        },
      }
    );
  }
  function _c(e) {
    let t, n, i, a;
    return (
      (t = new hs({
        props: { $$slots: { default: [yc] }, $$scope: { ctx: e } },
      })),
      (i = new hs({
        props: { use: [go], $$slots: { default: [Cc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment), (n = _()), fe(i.$$.fragment);
        },
        m(e, s) {
          me(t, e, s), v(e, n, s), me(i, e, s), (a = !0);
        },
        p(e, n) {
          const a = {};
          (262144 & n[0]) | (8192 & n[2]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
          const s = {};
          (262144 & n[0]) | (8192 & n[2]) && (s.$$scope = { dirty: n, ctx: e }),
            i.$set(s);
        },
        i(e) {
          a || (re(t.$$.fragment, e), re(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          he(t, e), e && b(n), he(i, e);
        },
      }
    );
  }
  function xc(e) {
    let t, n, i, a;
    return (
      (i = new is({
        props: {
          radioList: !0,
          $$slots: { default: [_c] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          (t = E("p")),
            (t.textContent = "What would you like to download?"),
            (n = _()),
            fe(i.$$.fragment),
            T(t, "class", "svelte-1l4jzu8");
        },
        m(e, s) {
          v(e, t, s), v(e, n, s), me(i, e, s), (a = !0);
        },
        p(e, t) {
          const n = {};
          (262144 & t[0]) | (8192 & t[2]) && (n.$$scope = { dirty: t, ctx: e }),
            i.$set(n);
        },
        i(e) {
          a || (re(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          e && b(t), e && b(n), he(i, e);
        },
      }
    );
  }
  function Sc(e) {
    let t;
    return {
      c() {
        t = C("Cancel");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Tc(e) {
    let t, n;
    return (
      (t = new si({
        props: { $$slots: { default: [Sc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          8192 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function Oc(e) {
    let t;
    return {
      c() {
        t = C("Download");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Lc(e) {
    let t, n;
    return (
      (t = new si({
        props: { $$slots: { default: [Oc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          8192 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function wc(e) {
    let t, n, i, a;
    return (
      (t = new Go({
        props: { $$slots: { default: [Tc] }, $$scope: { ctx: e } },
      })),
      (i = new Go({
        props: { $$slots: { default: [Lc] }, $$scope: { ctx: e } },
      })),
      i.$on("click", e[29]),
      {
        c() {
          fe(t.$$.fragment), (n = _()), fe(i.$$.fragment);
        },
        m(e, s) {
          me(t, e, s), v(e, n, s), me(i, e, s), (a = !0);
        },
        p(e, n) {
          const a = {};
          8192 & n[2] && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
          const s = {};
          8192 & n[2] && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          a || (re(t.$$.fragment, e), re(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          he(t, e), e && b(n), he(i, e);
        },
      }
    );
  }
  function Dc(e) {
    let t, n, i, a, s, r;
    return (
      (t = new fo({
        props: { id: "title", $$slots: { default: [Ic] }, $$scope: { ctx: e } },
      })),
      (i = new mo({
        props: {
          id: "content",
          $$slots: { default: [xc] },
          $$scope: { ctx: e },
        },
      })),
      (s = new ho({
        props: { $$slots: { default: [wc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment),
            (n = _()),
            fe(i.$$.fragment),
            (a = _()),
            fe(s.$$.fragment);
        },
        m(e, o) {
          me(t, e, o),
            v(e, n, o),
            me(i, e, o),
            v(e, a, o),
            me(s, e, o),
            (r = !0);
        },
        p(e, n) {
          const a = {};
          (131072 & n[0]) | (8192 & n[2]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
          const r = {};
          (262144 & n[0]) | (8192 & n[2]) && (r.$$scope = { dirty: n, ctx: e }),
            i.$set(r);
          const o = {};
          8192 & n[2] && (o.$$scope = { dirty: n, ctx: e }), s.$set(o);
        },
        i(e) {
          r ||
            (re(t.$$.fragment, e),
            re(i.$$.fragment, e),
            re(s.$$.fragment, e),
            (r = !0));
        },
        o(e) {
          oe(t.$$.fragment, e),
            oe(i.$$.fragment, e),
            oe(s.$$.fragment, e),
            (r = !1);
        },
        d(e) {
          he(t, e), e && b(n), he(i, e), e && b(a), he(s, e);
        },
      }
    );
  }
  function Nc(e) {
    let t,
      n,
      i = (e[11] && e[11].displayName) + "";
    return {
      c() {
        (t = C("Append data to ")), (n = C(i));
      },
      m(e, i) {
        v(e, t, i), v(e, n, i);
      },
      p(e, t) {
        2048 & t[0] && i !== (i = (e[11] && e[11].displayName) + "") && L(n, i);
      },
      d(e) {
        e && b(t), e && b(n);
      },
    };
  }
  function Mc(e) {
    let t,
      n,
      i = e[72].name + "";
    return {
      c() {
        (t = E("li")), (n = C(i)), T(t, "class", "svelte-1l4jzu8");
      },
      m(e, i) {
        v(e, t, i), I(t, n);
      },
      p(e, t) {
        1024 & t[0] && i !== (i = e[72].name + "") && L(n, i);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Rc(t) {
    let n;
    return {
      c() {
        (n = E("p")),
          (n.textContent = "Select dataset to upload."),
          T(n, "class", "svelte-1l4jzu8");
      },
      m(e, t) {
        v(e, n, t);
      },
      p: e,
      d(e) {
        e && b(n);
      },
    };
  }
  function Fc(t) {
    let n;
    return {
      c() {
        (n = E("p")),
          (n.textContent = "Select tags file for dataset."),
          T(n, "class", "svelte-1l4jzu8");
      },
      m(e, t) {
        v(e, n, t);
      },
      p: e,
      d(e) {
        e && b(n);
      },
    };
  }
  function kc(e) {
    let t,
      n,
      i,
      a,
      s,
      r,
      o,
      l,
      c,
      u,
      d,
      p,
      f,
      m,
      h,
      g,
      $,
      A,
      x,
      S,
      O,
      w,
      N,
      M,
      R = (e[12] ? e[12].taxonomyTags.map(Iu).join(", ") : "") + "";
    function F(t) {
      e[31](t);
    }
    let k = { label: "Name" };
    void 0 !== e[13] && (k.value = e[13]),
      (t = new wa({ props: k })),
      z.push(() => pe(t, "value", F));
    let U = e[10],
      P = [];
    for (let t = 0; t < U.length; t += 1) P[t] = Mc($c(e, U, t));
    return (
      (u = new $l({
        props: {
          multiple: !0,
          $$slots: { default: [Rc] },
          $$scope: { ctx: e },
        },
      })),
      u.$on("drop", e[21]),
      (S = new $l({
        props: {
          accept: ".json",
          $$slots: { default: [Fc] },
          $$scope: { ctx: e },
        },
      })),
      S.$on("drop", e[22]),
      {
        c() {
          fe(t.$$.fragment),
            (i = _()),
            (a = E("p")),
            (s = C(e[0])),
            (r = C(" file(s):")),
            (o = _()),
            (l = E("ul"));
          for (let e = 0; e < P.length; e += 1) P[e].c();
          (c = _()),
            fe(u.$$.fragment),
            (d = _()),
            (p = E("p")),
            (f = C("Taxonomy Terms ")),
            (m = E("span")),
            (m.textContent = "(optional)"),
            (h = C(":")),
            (g = E("br")),
            ($ = _()),
            (A = C(R)),
            (x = _()),
            fe(S.$$.fragment),
            (O = _()),
            (w = E("a")),
            (N = C("Click to select tags for your dataset.")),
            T(a, "class", "svelte-1l4jzu8"),
            T(l, "class", "svelte-1l4jzu8"),
            D(m, "font-style", "italic"),
            T(m, "class", "svelte-1l4jzu8"),
            T(g, "class", "svelte-1l4jzu8"),
            T(p, "class", "svelte-1l4jzu8"),
            T(w, "target", "_blank"),
            T(
              w,
              "href",
              window.location.href.replace("/Search/", "/TagCreator/")
            ),
            T(w, "class", "svelte-1l4jzu8");
        },
        m(e, n) {
          me(t, e, n),
            v(e, i, n),
            v(e, a, n),
            I(a, s),
            I(a, r),
            v(e, o, n),
            v(e, l, n);
          for (let e = 0; e < P.length; e += 1) P[e].m(l, null);
          v(e, c, n),
            me(u, e, n),
            v(e, d, n),
            v(e, p, n),
            I(p, f),
            I(p, m),
            I(p, h),
            I(p, g),
            I(p, $),
            I(p, A),
            v(e, x, n),
            me(S, e, n),
            v(e, O, n),
            v(e, w, n),
            I(w, N),
            (M = !0);
        },
        p(e, i) {
          const a = {};
          if (
            (!n &&
              8192 & i[0] &&
              ((n = !0), (a.value = e[13]), Q(() => (n = !1))),
            t.$set(a),
            (!M || 1 & i[0]) && L(s, e[0]),
            1024 & i[0])
          ) {
            let t;
            for (U = e[10], t = 0; t < U.length; t += 1) {
              const n = $c(e, U, t);
              P[t] ? P[t].p(n, i) : ((P[t] = Mc(n)), P[t].c(), P[t].m(l, null));
            }
            for (; t < P.length; t += 1) P[t].d(1);
            P.length = U.length;
          }
          const r = {};
          8192 & i[2] && (r.$$scope = { dirty: i, ctx: e }),
            u.$set(r),
            (!M || 4096 & i[0]) &&
              R !==
                (R =
                  (e[12] ? e[12].taxonomyTags.map(Iu).join(", ") : "") + "") &&
              L(A, R);
          const o = {};
          8192 & i[2] && (o.$$scope = { dirty: i, ctx: e }), S.$set(o);
        },
        i(e) {
          M ||
            (re(t.$$.fragment, e),
            re(u.$$.fragment, e),
            re(S.$$.fragment, e),
            (M = !0));
        },
        o(e) {
          oe(t.$$.fragment, e),
            oe(u.$$.fragment, e),
            oe(S.$$.fragment, e),
            (M = !1);
        },
        d(e) {
          he(t, e),
            e && b(i),
            e && b(a),
            e && b(o),
            e && b(l),
            y(P, e),
            e && b(c),
            he(u, e),
            e && b(d),
            e && b(p),
            e && b(x),
            he(S, e),
            e && b(O),
            e && b(w);
        },
      }
    );
  }
  function Uc(e) {
    let t;
    return {
      c() {
        t = C("Cancel");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Pc(e) {
    let t, n;
    return (
      (t = new si({
        props: { $$slots: { default: [Uc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          8192 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function Hc(e) {
    let t;
    return {
      c() {
        t = C("Upload");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Bc(e) {
    let t, n;
    return (
      (t = new si({
        props: { $$slots: { default: [Hc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          8192 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function Vc(e) {
    let t, n, i, a;
    return (
      (t = new Go({
        props: { $$slots: { default: [Pc] }, $$scope: { ctx: e } },
      })),
      (i = new Go({
        props: { $$slots: { default: [Bc] }, $$scope: { ctx: e } },
      })),
      i.$on("click", e[32]),
      {
        c() {
          fe(t.$$.fragment), (n = _()), fe(i.$$.fragment);
        },
        m(e, s) {
          me(t, e, s), v(e, n, s), me(i, e, s), (a = !0);
        },
        p(e, n) {
          const a = {};
          8192 & n[2] && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
          const s = {};
          8192 & n[2] && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          a || (re(t.$$.fragment, e), re(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          he(t, e), e && b(n), he(i, e);
        },
      }
    );
  }
  function jc(e) {
    let t, n, i, a, s, r;
    return (
      (t = new fo({
        props: { id: "title", $$slots: { default: [Nc] }, $$scope: { ctx: e } },
      })),
      (i = new mo({
        props: {
          id: "content",
          $$slots: { default: [kc] },
          $$scope: { ctx: e },
        },
      })),
      (s = new ho({
        props: { $$slots: { default: [Vc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment),
            (n = _()),
            fe(i.$$.fragment),
            (a = _()),
            fe(s.$$.fragment);
        },
        m(e, o) {
          me(t, e, o),
            v(e, n, o),
            me(i, e, o),
            v(e, a, o),
            me(s, e, o),
            (r = !0);
        },
        p(e, n) {
          const a = {};
          (2048 & n[0]) | (8192 & n[2]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
          const r = {};
          (13313 & n[0]) | (8192 & n[2]) && (r.$$scope = { dirty: n, ctx: e }),
            i.$set(r);
          const o = {};
          8192 & n[2] && (o.$$scope = { dirty: n, ctx: e }), s.$set(o);
        },
        i(e) {
          r ||
            (re(t.$$.fragment, e),
            re(i.$$.fragment, e),
            re(s.$$.fragment, e),
            (r = !0));
        },
        o(e) {
          oe(t.$$.fragment, e),
            oe(i.$$.fragment, e),
            oe(s.$$.fragment, e),
            (r = !1);
        },
        d(e) {
          he(t, e), e && b(n), he(i, e), e && b(a), he(s, e);
        },
      }
    );
  }
  function zc(e) {
    let t;
    return {
      c() {
        t = C("Create new dataset");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Gc(e) {
    let t, n, i;
    function a(t) {
      e[34](t);
    }
    let s = { label: "Name" };
    return (
      void 0 !== e[15] && (s.value = e[15]),
      (t = new wa({ props: s })),
      z.push(() => pe(t, "value", a)),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, n) {
          me(t, e, n), (i = !0);
        },
        p(e, i) {
          const a = {};
          !n &&
            32768 & i[0] &&
            ((n = !0), (a.value = e[15]), Q(() => (n = !1))),
            t.$set(a);
        },
        i(e) {
          i || (re(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function qc(e) {
    let t;
    return {
      c() {
        t = C("Cancel");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Kc(e) {
    let t, n;
    return (
      (t = new si({
        props: { $$slots: { default: [qc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          8192 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function Wc(e) {
    let t;
    return {
      c() {
        t = C("Submit");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Xc(e) {
    let t, n;
    return (
      (t = new si({
        props: { $$slots: { default: [Wc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          8192 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function Yc(e) {
    let t, n, i, a;
    return (
      (t = new Go({
        props: { $$slots: { default: [Kc] }, $$scope: { ctx: e } },
      })),
      (i = new Go({
        props: { $$slots: { default: [Xc] }, $$scope: { ctx: e } },
      })),
      i.$on("click", e[35]),
      {
        c() {
          fe(t.$$.fragment), (n = _()), fe(i.$$.fragment);
        },
        m(e, s) {
          me(t, e, s), v(e, n, s), me(i, e, s), (a = !0);
        },
        p(e, n) {
          const a = {};
          8192 & n[2] && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
          const s = {};
          8192 & n[2] && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          a || (re(t.$$.fragment, e), re(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          he(t, e), e && b(n), he(i, e);
        },
      }
    );
  }
  function Qc(e) {
    let t, n, i, a, s, r;
    return (
      (t = new fo({
        props: { id: "title", $$slots: { default: [zc] }, $$scope: { ctx: e } },
      })),
      (i = new mo({
        props: {
          id: "content",
          $$slots: { default: [Gc] },
          $$scope: { ctx: e },
        },
      })),
      (s = new ho({
        props: { $$slots: { default: [Yc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment),
            (n = _()),
            fe(i.$$.fragment),
            (a = _()),
            fe(s.$$.fragment);
        },
        m(e, o) {
          me(t, e, o),
            v(e, n, o),
            me(i, e, o),
            v(e, a, o),
            me(s, e, o),
            (r = !0);
        },
        p(e, n) {
          const a = {};
          8192 & n[2] && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
          const r = {};
          (32768 & n[0]) | (8192 & n[2]) && (r.$$scope = { dirty: n, ctx: e }),
            i.$set(r);
          const o = {};
          8192 & n[2] && (o.$$scope = { dirty: n, ctx: e }), s.$set(o);
        },
        i(e) {
          r ||
            (re(t.$$.fragment, e),
            re(i.$$.fragment, e),
            re(s.$$.fragment, e),
            (r = !0));
        },
        o(e) {
          oe(t.$$.fragment, e),
            oe(i.$$.fragment, e),
            oe(s.$$.fragment, e),
            (r = !1);
        },
        d(e) {
          he(t, e), e && b(n), he(i, e), e && b(a), he(s, e);
        },
      }
    );
  }
  function Jc(e) {
    let t;
    return {
      c() {
        t = C(e[6]);
      },
      m(e, n) {
        v(e, t, n);
      },
      p(e, n) {
        64 & n[0] && L(t, e[6]);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Zc(e) {
    let t, n;
    return (
      (t = new Xt({
        props: { $$slots: { default: [Jc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (64 & n[0]) | (8192 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function eu(e) {
    let t;
    return {
      c() {
        t = C("file_upload");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function tu(e) {
    let t, n;
    return (
      (t = new Ha({
        props: {
          class: "material-icons",
          "aria-label": "Upload dataset",
          ripple: !1,
          $$slots: { default: [eu] },
          $$scope: { ctx: e },
        },
      })),
      t.$on("click", e[37]),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          8192 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function nu(e) {
    let t, n, i, a;
    return (
      (t = new Yt({
        props: { $$slots: { default: [Zc] }, $$scope: { ctx: e } },
      })),
      (i = new Yt({
        props: {
          align: "end",
          toolbar: !0,
          $$slots: { default: [tu] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          fe(t.$$.fragment), (n = _()), fe(i.$$.fragment);
        },
        m(e, s) {
          me(t, e, s), v(e, n, s), me(i, e, s), (a = !0);
        },
        p(e, n) {
          const a = {};
          (64 & n[0]) | (8192 & n[2]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
          const s = {};
          (16384 & n[0]) | (8192 & n[2]) && (s.$$scope = { dirty: n, ctx: e }),
            i.$set(s);
        },
        i(e) {
          a || (re(t.$$.fragment, e), re(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          he(t, e), e && b(n), he(i, e);
        },
      }
    );
  }
  function iu(e) {
    let t, n;
    return (
      (t = new qt({
        props: { $$slots: { default: [nu] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (16448 & n[0]) | (8192 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function au(e) {
    let t, n;
    return (
      (t = new Bs({ props: { indeterminate: !0 } })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function su(e) {
    let t;
    return {
      c() {
        t = C("close");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function ru(e) {
    let t, n;
    return (
      (t = new Ha({
        props: {
          class: "material-icons",
          title: "Dismiss",
          $$slots: { default: [su] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          8192 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function ou(e) {
    let t, n, i, a;
    return (
      (t = new si({})),
      (i = new Po({
        props: { $$slots: { default: [ru] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment), (n = _()), fe(i.$$.fragment);
        },
        m(e, s) {
          me(t, e, s), v(e, n, s), me(i, e, s), (a = !0);
        },
        p(e, t) {
          const n = {};
          8192 & t[2] && (n.$$scope = { dirty: t, ctx: e }), i.$set(n);
        },
        i(e) {
          a || (re(t.$$.fragment, e), re(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          he(t, e), e && b(n), he(i, e);
        },
      }
    );
  }
  function lu(e) {
    let t, n, i, a, s, r, o;
    function l(t) {
      e[39](t);
    }
    let c = { label: "Search..." };
    return (
      void 0 !== e[2] && (c.value = e[2]),
      (t = new wa({ props: c })),
      z.push(() => pe(t, "value", l)),
      (r = new rc({ props: { trees: e[7] } })),
      r.$on("change", e[40]),
      {
        c() {
          fe(t.$$.fragment),
            (i = _()),
            (a = E("span")),
            (a.textContent = "Advanced Filters"),
            (s = _()),
            fe(r.$$.fragment),
            T(a, "class", "filter-header svelte-1l4jzu8");
        },
        m(e, n) {
          me(t, e, n),
            v(e, i, n),
            v(e, a, n),
            v(e, s, n),
            me(r, e, n),
            (o = !0);
        },
        p(e, i) {
          const a = {};
          !n && 4 & i[0] && ((n = !0), (a.value = e[2]), Q(() => (n = !1))),
            t.$set(a);
          const s = {};
          128 & i[0] && (s.trees = e[7]), r.$set(s);
        },
        i(e) {
          o || (re(t.$$.fragment, e), re(r.$$.fragment, e), (o = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(r.$$.fragment, e), (o = !1);
        },
        d(e) {
          he(t, e), e && b(i), e && b(a), e && b(s), he(r, e);
        },
      }
    );
  }
  function cu(e) {
    let t, n;
    return (
      (t = new _s({
        props: { $$slots: { default: [lu] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment);
        },
        m(e, i) {
          me(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (140 & n[0]) | (8192 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          he(t, e);
        },
      }
    );
  }
  function uu(e) {
    let t,
      n = e[66].displayName + "";
    return {
      c() {
        t = C(n);
      },
      m(e, n) {
        v(e, t, n);
      },
      p(e, i) {
        2 & i[0] && n !== (n = e[66].displayName + "") && L(t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function du(e) {
    let t, n, i, r, o;
    return {
      c() {
        (t = E("a")),
          (t.textContent = "Download"),
          (n = _()),
          (i = E("a")),
          (i.textContent = "Append Data"),
          D(t, "margin-right", "15px"),
          T(t, "class", "svelte-1l4jzu8"),
          D(i, "margin-right", "15px"),
          T(i, "class", "svelte-1l4jzu8");
      },
      m(a, l) {
        v(a, t, l),
          v(a, n, l),
          v(a, i, l),
          r ||
            ((o = [
              S(t, "click", function () {
                s(e[26](e[66])) && e[26](e[66]).apply(this, arguments);
              }),
              S(i, "click", function () {
                s(e[20](e[66])) && e[20](e[66]).apply(this, arguments);
              }),
            ]),
            (r = !0));
      },
      p(t, n) {
        e = t;
      },
      d(e) {
        e && b(t), e && b(n), e && b(i), (r = !1), a(o);
      },
    };
  }
  function pu(e) {
    let t, n, i, a;
    return (
      (t = new ds({
        props: { $$slots: { default: [uu] }, $$scope: { ctx: e } },
      })),
      (i = new ps({
        props: { $$slots: { default: [du] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment), (n = _()), fe(i.$$.fragment);
        },
        m(e, s) {
          me(t, e, s), v(e, n, s), me(i, e, s), (a = !0);
        },
        p(e, n) {
          const a = {};
          (2 & n[0]) | (8192 & n[2]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
          const s = {};
          (2 & n[0]) | (8192 & n[2]) && (s.$$scope = { dirty: n, ctx: e }),
            i.$set(s);
        },
        i(e) {
          a || (re(t.$$.fragment, e), re(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          he(t, e), e && b(n), he(i, e);
        },
      }
    );
  }
  function fu(e) {
    let t, n, i, a;
    return (
      (t = new us({
        props: { $$slots: { default: [pu] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          fe(t.$$.fragment), (n = _()), (i = _());
        },
        m(e, s) {
          me(t, e, s), v(e, n, s), v(e, i, s), (a = !0);
        },
        p(e, n) {
          const i = {};
          (2 & n[0]) | (8192 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          a || (re(t.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (a = !1);
        },
        d(e) {
          he(t, e), e && b(n), e && b(i);
        },
      }
    );
  }
  function mu(e, t) {
    let n, i, a;
    return (
      (i = new hs({
        props: { $$slots: { default: [fu] }, $$scope: { ctx: t } },
      })),
      i.$on("SMUI:action", function () {
        return t[41](t[66]);
      }),
      {
        key: e,
        first: null,
        c() {
          (n = x()), fe(i.$$.fragment), (this.first = n);
        },
        m(e, t) {
          v(e, n, t), me(i, e, t), (a = !0);
        },
        p(e, n) {
          t = e;
          const a = {};
          (2 & n[0]) | (8192 & n[2]) && (a.$$scope = { dirty: n, ctx: t }),
            i.$set(a);
        },
        i(e) {
          a || (re(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          e && b(n), he(i, e);
        },
      }
    );
  }
  function hu(e) {
    let t,
      n,
      i = [],
      a = new Map(),
      s = e[1];
    const r = (e) => e[66].hash;
    for (let t = 0; t < s.length; t += 1) {
      let n = gc(e, s, t),
        o = r(n);
      a.set(o, (i[t] = mu(o, n)));
    }
    return {
      c() {
        for (let e = 0; e < i.length; e += 1) i[e].c();
        t = x();
      },
      m(e, a) {
        for (let t = 0; t < i.length; t += 1) i[t].m(e, a);
        v(e, t, a), (n = !0);
      },
      p(e, n) {
        68681730 & n[0] &&
          ((s = e[1]),
          ae(),
          (i = (function (e, t, n, i, a, s, r, o, l, c, u, d) {
            let p = e.length,
              f = s.length,
              m = p;
            const h = {};
            for (; m--; ) h[e[m].key] = m;
            const g = [],
              $ = new Map(),
              I = new Map();
            for (m = f; m--; ) {
              const e = d(a, s, m),
                o = n(e);
              let l = r.get(o);
              l ? i && l.p(e, t) : ((l = c(o, e)), l.c()),
                $.set(o, (g[m] = l)),
                o in h && I.set(o, Math.abs(m - h[o]));
            }
            const v = new Set(),
              b = new Set();
            function y(e) {
              re(e, 1), e.m(o, u), r.set(e.key, e), (u = e.first), f--;
            }
            for (; p && f; ) {
              const t = g[f - 1],
                n = e[p - 1],
                i = t.key,
                a = n.key;
              t === n
                ? ((u = t.first), p--, f--)
                : $.has(a)
                ? !r.has(i) || v.has(i)
                  ? y(t)
                  : b.has(a)
                  ? p--
                  : I.get(i) > I.get(a)
                  ? (b.add(i), y(t))
                  : (v.add(a), p--)
                : (l(n, r), p--);
            }
            for (; p--; ) {
              const t = e[p];
              $.has(t.key) || l(t, r);
            }
            for (; f; ) y(g[f - 1]);
            return g;
          })(i, n, r, 1, e, s, a, t.parentNode, ce, mu, t, gc)),
          se());
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < s.length; e += 1) re(i[e]);
          n = !0;
        }
      },
      o(e) {
        for (let e = 0; e < i.length; e += 1) oe(i[e]);
        n = !1;
      },
      d(e) {
        for (let t = 0; t < i.length; t += 1) i[t].d(e);
        e && b(t);
      },
    };
  }
  function gu(e) {
    let t, n, i;
    return (
      (n = new is({
        props: {
          twoLine: !0,
          avatarList: !0,
          $$slots: { default: [hu] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          (t = E("main")), fe(n.$$.fragment), T(t, "class", "svelte-1l4jzu8");
        },
        m(e, a) {
          v(e, t, a), me(n, t, null), (i = !0);
        },
        p(e, t) {
          const i = {};
          (2 & t[0]) | (8192 & t[2]) && (i.$$scope = { dirty: t, ctx: e }),
            n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(e) {
          e && b(t), he(n);
        },
      }
    );
  }
  function $u(e) {
    let t,
      n,
      i,
      a,
      s,
      r,
      o,
      l,
      c,
      u,
      d,
      p,
      f,
      m,
      h,
      g,
      $,
      y,
      A,
      C,
      x,
      S,
      O,
      L,
      w,
      D,
      N,
      M,
      R;
    function F(t) {
      e[30](t);
    }
    hc.title = t = e[6];
    let k = {
      "aria-labelledby": "title",
      "aria-describedby": "content",
      $$slots: { default: [Dc] },
      $$scope: { ctx: e },
    };
    function U(t) {
      e[33](t);
    }
    void 0 !== e[16] && (k.open = e[16]),
      (i = new po({ props: k })),
      z.push(() => pe(i, "open", F));
    let P = {
      "aria-labelledby": "title",
      "aria-describedby": "content",
      $$slots: { default: [jc] },
      $$scope: { ctx: e },
    };
    function H(t) {
      e[36](t);
    }
    void 0 !== e[9] && (P.open = e[9]),
      (r = new po({ props: P })),
      z.push(() => pe(r, "open", U));
    let B = {
      "aria-labelledby": "title",
      "aria-describedby": "content",
      $$slots: { default: [Qc] },
      $$scope: { ctx: e },
    };
    void 0 !== e[14] && (B.open = e[14]),
      (c = new po({ props: B })),
      z.push(() => pe(c, "open", H)),
      (p = new rt({
        props: {
          variant: "static",
          $$slots: { default: [iu] },
          $$scope: { ctx: e },
        },
      }));
    let V = e[8] && au(),
      j = {
        labelText: e[5],
        timeoutMs: -1,
        $$slots: { default: [ou] },
        $$scope: { ctx: e },
      };
    return (
      (h = new Uo({ props: j })),
      e[38](h),
      (y = new As({
        props: {
          style: "width: 360px",
          $$slots: { default: [cu] },
          $$scope: { ctx: e },
        },
      })),
      (C = new Cs({
        props: { $$slots: { default: [gu] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          (n = _()),
            fe(i.$$.fragment),
            (s = _()),
            fe(r.$$.fragment),
            (l = _()),
            fe(c.$$.fragment),
            (d = _()),
            fe(p.$$.fragment),
            (f = _()),
            V && V.c(),
            (m = _()),
            fe(h.$$.fragment),
            (g = _()),
            ($ = E("div")),
            fe(y.$$.fragment),
            (A = _()),
            fe(C.$$.fragment),
            (x = _()),
            (S = E("link")),
            (O = _()),
            (L = E("link")),
            (w = _()),
            (D = E("link")),
            (N = _()),
            (M = E("link")),
            T($, "class", "drawer-container svelte-1l4jzu8"),
            T(S, "rel", "stylesheet"),
            T(
              S,
              "href",
              "https://fonts.googleapis.com/icon?family=Material+Icons"
            ),
            T(S, "class", "svelte-1l4jzu8"),
            T(L, "rel", "stylesheet"),
            T(
              L,
              "href",
              "https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
            ),
            T(L, "class", "svelte-1l4jzu8"),
            T(D, "rel", "stylesheet"),
            T(D, "href", "https://fonts.googleapis.com/css?family=Roboto+Mono"),
            T(D, "class", "svelte-1l4jzu8"),
            T(M, "rel", "stylesheet"),
            T(M, "href", "build/smui.css"),
            T(M, "class", "svelte-1l4jzu8");
        },
        m(e, t) {
          v(e, n, t),
            me(i, e, t),
            v(e, s, t),
            me(r, e, t),
            v(e, l, t),
            me(c, e, t),
            v(e, d, t),
            me(p, e, t),
            v(e, f, t),
            V && V.m(e, t),
            v(e, m, t),
            me(h, e, t),
            v(e, g, t),
            v(e, $, t),
            me(y, $, null),
            I($, A),
            me(C, $, null),
            v(e, x, t),
            v(e, S, t),
            v(e, O, t),
            v(e, L, t),
            v(e, w, t),
            v(e, D, t),
            v(e, N, t),
            v(e, M, t),
            (R = !0);
        },
        p(e, n) {
          (!R || 64 & n[0]) && t !== (t = e[6]) && (hc.title = t);
          const s = {};
          (393216 & n[0]) | (8192 & n[2]) && (s.$$scope = { dirty: n, ctx: e }),
            !a &&
              65536 & n[0] &&
              ((a = !0), (s.open = e[16]), Q(() => (a = !1))),
            i.$set(s);
          const l = {};
          (15361 & n[0]) | (8192 & n[2]) && (l.$$scope = { dirty: n, ctx: e }),
            !o && 512 & n[0] && ((o = !0), (l.open = e[9]), Q(() => (o = !1))),
            r.$set(l);
          const d = {};
          (32768 & n[0]) | (8192 & n[2]) && (d.$$scope = { dirty: n, ctx: e }),
            !u &&
              16384 & n[0] &&
              ((u = !0), (d.open = e[14]), Q(() => (u = !1))),
            c.$set(d);
          const f = {};
          (16448 & n[0]) | (8192 & n[2]) && (f.$$scope = { dirty: n, ctx: e }),
            p.$set(f),
            e[8]
              ? V
                ? 256 & n[0] && re(V, 1)
                : ((V = au()), V.c(), re(V, 1), V.m(m.parentNode, m))
              : V &&
                (ae(),
                oe(V, 1, 1, () => {
                  V = null;
                }),
                se());
          const g = {};
          32 & n[0] && (g.labelText = e[5]),
            8192 & n[2] && (g.$$scope = { dirty: n, ctx: e }),
            h.$set(g);
          const $ = {};
          (140 & n[0]) | (8192 & n[2]) && ($.$$scope = { dirty: n, ctx: e }),
            y.$set($);
          const I = {};
          (2 & n[0]) | (8192 & n[2]) && (I.$$scope = { dirty: n, ctx: e }),
            C.$set(I);
        },
        i(e) {
          R ||
            (re(i.$$.fragment, e),
            re(r.$$.fragment, e),
            re(c.$$.fragment, e),
            re(p.$$.fragment, e),
            re(V),
            re(h.$$.fragment, e),
            re(y.$$.fragment, e),
            re(C.$$.fragment, e),
            (R = !0));
        },
        o(e) {
          oe(i.$$.fragment, e),
            oe(r.$$.fragment, e),
            oe(c.$$.fragment, e),
            oe(p.$$.fragment, e),
            oe(V),
            oe(h.$$.fragment, e),
            oe(y.$$.fragment, e),
            oe(C.$$.fragment, e),
            (R = !1);
        },
        d(t) {
          t && b(n),
            he(i, t),
            t && b(s),
            he(r, t),
            t && b(l),
            he(c, t),
            t && b(d),
            he(p, t),
            t && b(f),
            V && V.d(t),
            t && b(m),
            e[38](null),
            he(h, t),
            t && b(g),
            t && b($),
            he(y),
            he(C),
            t && b(x),
            t && b(S),
            t && b(O),
            t && b(L),
            t && b(w),
            t && b(D),
            t && b(N),
            t && b(M);
        },
      }
    );
  }
  const Iu = (e) => e.Tag;
  function vu(e, t, n) {
    let i,
      a = "Data",
      s = [];
    const r = new cc();
    let o = [],
      l = [];
    const c = new URLSearchParams(location.search);
    let u,
      d,
      p = c.get("searchQuery") || "",
      f = [];
    function m(e, t) {
      n(
        1,
        (l = o.filter((n) =>
          ((n) => {
            const { displayName: i, taxonomyTags: a } = n;
            return (
              !!t.every((e) => !!a.find((t) => e.isMatch(t))) &&
              (!e || i.toLowerCase().includes(e.toLowerCase()))
            );
          })(n)
        ))
      );
      const i = new URLSearchParams();
      i.set("searchQuery", e);
      const a = t.map((e) => e.lean());
      i.set("filterTags", JSON.stringify(a)),
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
      n(5, (d = e));
    }
    function g(e) {
      n(5, (d = e));
    }
    let $ = !1;
    async function I() {
      n(8, ($ = !0));
      try {
        o = await r.listArtifacts();
      } catch (e) {
        if (
          (h(
            e instanceof uc
              ? e.message
              : "An error occurred. Please try again later"
          ),
          !(e instanceof uc))
        )
          throw e;
      }
      n(8, ($ = !1)), console.log({ allItems: o }), m(p, f);
    }
    class v extends class {
      constructor(e, t) {
        (this.type = e), (this.data = t);
      }
    } {
      constructor(e) {
        super("ItemSelected", e);
      }
    }
    const b = [];
    let y;
    function E(e) {
      (y = e), b.forEach(([t, n]) => t.postMessage(new v(e), n));
    }
    window.addEventListener(
      "message",
      function (e) {
        const { data: t } = e;
        "subscribe" === t.type &&
          (b.push([e.source, e.origin]),
          y && e.source.postMessage(new v(y), e.origin));
      },
      !1
    ),
      (async function () {
        const e = await (async function () {
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
          })(),
          t = ve.fromDict(e.taxonomy);
        n(
          7,
          (s = (function (e) {
            let t = [e];
            for (; 1 === t.length; ) t = t[0].children;
            return t;
          })(t))
        ),
          n(
            3,
            (f = (function (e) {
              if (e)
                return Jt(JSON.parse(e), (e) => {
                  const t = s.reduce((t, n) => t || n.findPath(e.id), null);
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
            })(c.get("filterTags")))
          ),
          n(0, (a = e.name)),
          I();
      })();
    let A,
      C,
      _ = !1,
      x = [],
      S = "",
      T = new oc();
    async function O() {
      if (!x) return h(`${a} file required.`);
      const e = C;
      (e.displayName = S),
        g("Upload in progress"),
        await r.appendArtifact(A, e, x),
        g("Upload complete!"),
        I();
    }
    var L;
    let w =
        "create" ===
        ((L = window.location.href),
        Object.fromEntries(
          (L.split("?")[1] || "").split("&").map((e) => e.split("="))
        )).action,
      D = [];
    async function N() {
      await r.createArtifact({ displayName: R }, D),
        h("Submitted creation request.");
    }
    let M,
      R = "",
      F = !1,
      k = "all";
    async function U() {
      try {
        const e =
          "all" === k
            ? M.children.map((e) => e.id)
            : (function (e) {
                const t = Zt(e),
                  n = [];
                t && n.push(t.id);
                return n;
              })(M);
        if (0 === e.length) return h("Nothing to download: No data found.");
        const t = await r.getDownloadUrl(M.id, ...e),
          n = document.createElement("a");
        n.setAttribute("href", t),
          n.setAttribute("target", "_blank"),
          n.click();
      } catch (e) {
        return h(e.message);
      }
    }
    return (
      (e.$$.update = () => {
        1 & e.$$.dirty[0] && n(6, (i = `${a} Dashboard`)),
          12 & e.$$.dirty[0] && m(p, f),
          48 & e.$$.dirty[0] && d && u.open(),
          e.$$.dirty[0];
      }),
      [
        a,
        l,
        p,
        f,
        u,
        d,
        i,
        s,
        $,
        _,
        x,
        A,
        C,
        S,
        w,
        R,
        F,
        M,
        k,
        E,
        async function (e) {
          n(11, (A = e)), n(13, (S = A.displayName));
          try {
            n(
              12,
              (C = { taxonomyTags: await T.toHumanFormat(A.taxonomyTags) })
            );
          } catch (e) {
            e instanceof lc
              ? console.warn(
                  "Latest artifact has invalid taxonomy tags:",
                  e.message
                )
              : console.error(
                  "An error occurred while setting default tags",
                  e.stack
                );
          }
          n(9, (_ = !0));
        },
        function (e) {
          const { acceptedFiles: t } = e.detail;
          t.length && n(10, (x = t));
        },
        async function (e) {
          const [t] = e.detail.acceptedFiles;
          t &&
            n(
              12,
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
        O,
        N,
        U,
        function (e) {
          n(17, (M = e)), n(16, (F = !0));
        },
        function (e) {
          (k = e), n(18, k);
        },
        function (e) {
          (k = e), n(18, k);
        },
        () => U(),
        function (e) {
          (F = e), n(16, F);
        },
        function (e) {
          (S = e), n(13, S);
        },
        () => O(),
        function (e) {
          (_ = e), n(9, _);
        },
        function (e) {
          (R = e), n(15, R);
        },
        () => N(),
        function (e) {
          (w = e), n(14, w);
        },
        () => n(14, (w = !0)),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), n(4, u);
          });
        },
        function (e) {
          (p = e), n(2, p);
        },
        (e) => n(3, (f = e.detail.filterTags.map(ve.fromDict))),
        (e) => E(e),
      ]
    );
  }
  return new (class extends $e {
    constructor(e) {
      super(), ge(this, e, vu, $u, r, {}, null, [-1, -1, -1]);
    }
  })({ target: document.body, props: { name: "world" } });
})();
//# sourceMappingURL=bundle.js.map
