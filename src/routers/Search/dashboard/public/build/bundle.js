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
  function r(e) {
    return "function" == typeof e;
  }
  function s(e, t) {
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
  function d(e, t, n, i) {
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
  function u(e, t, n, i, a, r) {
    if (a) {
      const s = c(t, n, i, r);
      e.p(s, a);
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
    return t && r(t.destroy) ? t.destroy : e;
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
  function E(e, t) {
    for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t);
  }
  function y(e) {
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
  function S() {
    return C("");
  }
  function T(e, t, n, i) {
    return e.addEventListener(t, n, i), () => e.removeEventListener(t, n, i);
  }
  function x(e, t, n) {
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
        : x(e, i, t[i]);
  }
  function L(e, t) {
    (t = "" + t), e.wholeText !== t && (e.data = t);
  }
  function D(e, t) {
    e.value = null == t ? "" : t;
  }
  function N(e, t, n) {
    e.classList[n ? "add" : "remove"](t);
  }
  let M;
  function w(e) {
    M = e;
  }
  function R() {
    if (!M) throw new Error("Function called outside component initialization");
    return M;
  }
  function F(e) {
    R().$$.on_mount.push(e);
  }
  function k(e) {
    R().$$.on_destroy.push(e);
  }
  function U() {
    const e = R();
    return (t, n, { cancelable: i = !1 } = {}) => {
      const a = e.$$.callbacks[t];
      if (a) {
        const r = (function (
          e,
          t,
          { bubbles: n = !1, cancelable: i = !1 } = {}
        ) {
          const a = document.createEvent("CustomEvent");
          return a.initCustomEvent(e, n, i, t), a;
        })(t, n, { cancelable: i });
        return (
          a.slice().forEach((t) => {
            t.call(e, r);
          }),
          !r.defaultPrevented
        );
      }
      return !0;
    };
  }
  function P(e, t) {
    return R().$$.context.set(e, t), t;
  }
  function H(e) {
    return R().$$.context.get(e);
  }
  function B(e, t) {
    const n = e.$$.callbacks[t.type];
    n && n.slice().forEach((e) => e.call(this, t));
  }
  const V = [],
    j = [],
    z = [],
    G = [],
    q = Promise.resolve();
  let K = !1;
  function W() {
    K || ((K = !0), q.then(J));
  }
  function X(e) {
    z.push(e);
  }
  function Y(e) {
    G.push(e);
  }
  const Q = new Set();
  let Z = 0;
  function J() {
    const e = M;
    do {
      for (; Z < V.length; ) {
        const e = V[Z];
        Z++, w(e), ee(e.$$);
      }
      for (w(null), V.length = 0, Z = 0; j.length; ) j.pop()();
      for (let e = 0; e < z.length; e += 1) {
        const t = z[e];
        Q.has(t) || (Q.add(t), t());
      }
      z.length = 0;
    } while (V.length);
    for (; G.length; ) G.pop()();
    (K = !1), Q.clear(), w(e);
  }
  function ee(e) {
    if (null !== e.fragment) {
      e.update(), a(e.before_update);
      const t = e.dirty;
      (e.dirty = [-1]),
        e.fragment && e.fragment.p(e.ctx, t),
        e.after_update.forEach(X);
    }
  }
  const te = new Set();
  let ne;
  function ie() {
    ne = { r: 0, c: [], p: ne };
  }
  function ae() {
    ne.r || a(ne.c), (ne = ne.p);
  }
  function re(e, t) {
    e && e.i && (te.delete(e), e.i(t));
  }
  function se(e, t, n, i) {
    if (e && e.o) {
      if (te.has(e)) return;
      te.add(e),
        ne.c.push(() => {
          te.delete(e), i && (n && e.d(1), i());
        }),
        e.o(t);
    } else i && i();
  }
  const oe =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof globalThis
      ? globalThis
      : global;
  function le(e, t) {
    const n = {},
      i = {},
      a = { $$scope: 1 };
    let r = e.length;
    for (; r--; ) {
      const s = e[r],
        o = t[r];
      if (o) {
        for (const e in s) e in o || (i[e] = 1);
        for (const e in o) a[e] || ((n[e] = o[e]), (a[e] = 1));
        e[r] = o;
      } else for (const e in s) a[e] = 1;
    }
    for (const e in i) e in n || (n[e] = void 0);
    return n;
  }
  function ce(e) {
    return "object" == typeof e && null !== e ? e : {};
  }
  function de(e, t, n) {
    const i = e.$$.props[t];
    void 0 !== i && ((e.$$.bound[i] = n), n(e.$$.ctx[i]));
  }
  function ue(e) {
    e && e.c();
  }
  function pe(e, t, i, s) {
    const { fragment: o, on_mount: l, on_destroy: c, after_update: d } = e.$$;
    o && o.m(t, i),
      s ||
        X(() => {
          const t = l.map(n).filter(r);
          c ? c.push(...t) : a(t), (e.$$.on_mount = []);
        }),
      d.forEach(X);
  }
  function fe(e, t) {
    const n = e.$$;
    null !== n.fragment &&
      (a(n.on_destroy),
      n.fragment && n.fragment.d(t),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function me(t, n, r, s, o, l, c, d = [-1]) {
    const u = M;
    w(t);
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
      context: new Map(n.context || (u ? u.$$.context : [])),
      callbacks: i(),
      dirty: d,
      skip_bound: !1,
      root: n.target || u.$$.root,
    });
    c && c(p.root);
    let f = !1;
    if (
      ((p.ctx = r
        ? r(t, n.props || {}, (e, n, ...i) => {
            const a = i.length ? i[0] : n;
            return (
              p.ctx &&
                o(p.ctx[e], (p.ctx[e] = a)) &&
                (!p.skip_bound && p.bound[e] && p.bound[e](a),
                f &&
                  (function (e, t) {
                    -1 === e.$$.dirty[0] &&
                      (V.push(e), W(), e.$$.dirty.fill(0)),
                      (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
                  })(t, e)),
              n
            );
          })
        : []),
      p.update(),
      (f = !0),
      a(p.before_update),
      (p.fragment = !!s && s(p.ctx)),
      n.target)
    ) {
      if (n.hydrate) {
        const e = (function (e) {
          return Array.from(e.childNodes);
        })(n.target);
        p.fragment && p.fragment.l(e), e.forEach(b);
      } else p.fragment && p.fragment.c();
      n.intro && re(t.$$.fragment),
        pe(t, n.target, n.anchor, n.customElement),
        J();
    }
    w(u);
  }
  class he {
    $destroy() {
      fe(this, 1), (this.$destroy = e);
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
  var ge = function (e, t) {
    return (
      (ge =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t;
          }) ||
        function (e, t) {
          for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        }),
      ge(e, t)
    );
  };
  function $e(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError(
        "Class extends value " + String(t) + " is not a constructor or null"
      );
    function n() {
      this.constructor = e;
    }
    ge(e, t),
      (e.prototype =
        null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
  }
  var Ie = function () {
    return (
      (Ie =
        Object.assign ||
        function (e) {
          for (var t, n = 1, i = arguments.length; n < i; n++)
            for (var a in (t = arguments[n]))
              Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
          return e;
        }),
      Ie.apply(this, arguments)
    );
  };
  function ve(e, t, n, i) {
    return new (n || (n = Promise))(function (a, r) {
      function s(e) {
        try {
          l(i.next(e));
        } catch (e) {
          r(e);
        }
      }
      function o(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          r(e);
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
                })).then(s, o);
      }
      l((i = i.apply(e, t || [])).next());
    });
  }
  function be(e, t) {
    var n,
      i,
      a,
      r,
      s = {
        label: 0,
        sent: function () {
          if (1 & a[0]) throw a[1];
          return a[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (r = { next: o(0), throw: o(1), return: o(2) }),
      "function" == typeof Symbol &&
        (r[Symbol.iterator] = function () {
          return this;
        }),
      r
    );
    function o(r) {
      return function (o) {
        return (function (r) {
          if (n) throw new TypeError("Generator is already executing.");
          for (; s; )
            try {
              if (
                ((n = 1),
                i &&
                  (a =
                    2 & r[0]
                      ? i.return
                      : r[0]
                      ? i.throw || ((a = i.return) && a.call(i), 0)
                      : i.next) &&
                  !(a = a.call(i, r[1])).done)
              )
                return a;
              switch (((i = 0), a && (r = [2 & r[0], a.value]), r[0])) {
                case 0:
                case 1:
                  a = r;
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
                    !((a = s.trys),
                    (a = a.length > 0 && a[a.length - 1]) ||
                      (6 !== r[0] && 2 !== r[0]))
                  ) {
                    s = 0;
                    continue;
                  }
                  if (3 === r[0] && (!a || (r[1] > a[0] && r[1] < a[3]))) {
                    s.label = r[1];
                    break;
                  }
                  if (6 === r[0] && s.label < a[1]) {
                    (s.label = a[1]), (a = r);
                    break;
                  }
                  if (a && s.label < a[2]) {
                    (s.label = a[2]), s.ops.push(r);
                    break;
                  }
                  a[2] && s.ops.pop(), s.trys.pop();
                  continue;
              }
              r = t.call(e, s);
            } catch (e) {
              (r = [6, e]), (i = 0);
            } finally {
              n = a = 0;
            }
          if (5 & r[0]) throw r[1];
          return { value: r[0] ? r[1] : void 0, done: !0 };
        })([r, o]);
      };
    }
  }
  function Ee(e) {
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
  function ye(e, t) {
    var n = "function" == typeof Symbol && e[Symbol.iterator];
    if (!n) return e;
    var i,
      a,
      r = n.call(e),
      s = [];
    try {
      for (; (void 0 === t || t-- > 0) && !(i = r.next()).done; )
        s.push(i.value);
    } catch (e) {
      a = { error: e };
    } finally {
      try {
        i && !i.done && (n = r.return) && n.call(r);
      } finally {
        if (a) throw a.error;
      }
    }
    return s;
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
  var Ae = (function () {
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
   */ var Ce = Object.freeze({
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
   */ function _e(e, t) {
    return (e.matches || e.webkitMatchesSelector || e.msMatchesSelector).call(
      e,
      t
    );
  }
  var Se,
    Te = Object.freeze({
      __proto__: null,
      closest: function (e, t) {
        if (e.closest) return e.closest(t);
        for (var n = e; n; ) {
          if (_e(n, t)) return n;
          n = n.parentElement;
        }
        return null;
      },
      matches: _e,
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
    xe = {
      BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
      FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
      FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
      ROOT: "mdc-ripple-upgraded",
      UNBOUNDED: "mdc-ripple-upgraded--unbounded",
    },
    Oe = {
      VAR_FG_SCALE: "--mdc-ripple-fg-scale",
      VAR_FG_SIZE: "--mdc-ripple-fg-size",
      VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
      VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
      VAR_LEFT: "--mdc-ripple-left",
      VAR_TOP: "--mdc-ripple-top",
    },
    Le = {
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
  var De = ["touchstart", "pointerdown", "mousedown", "keydown"],
    Ne = ["touchend", "pointerup", "mouseup", "contextmenu"],
    Me = [],
    we = (function (e) {
      function t(n) {
        var i = e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
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
        $e(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return xe;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Oe;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Le;
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
              r = i.UNBOUNDED;
            requestAnimationFrame(function () {
              e.adapter.addClass(a),
                e.adapter.isUnbounded() &&
                  (e.adapter.addClass(r), e.layoutInternal());
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
              for (var i = Ee(De), a = i.next(); !a.done; a = i.next()) {
                var r = a.value;
                this.adapter.registerInteractionHandler(
                  r,
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
              for (var i = Ee(Ne), a = i.next(); !a.done; a = i.next()) {
                var r = a.value;
                this.adapter.registerDocumentInteractionHandler(
                  r,
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
            for (var n = Ee(De), i = n.next(); !i.done; i = n.next()) {
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
            for (var n = Ee(Ne), i = n.next(); !i.done; i = n.next()) {
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
                  Me.length > 0 &&
                  Me.some(function (e) {
                    return t.adapter.containsEventTarget(e);
                  })
                    ? this.resetActivationState()
                    : (void 0 !== e &&
                        (Me.push(e.target),
                        this.registerDeactivationHandlers(e)),
                      (n.wasElementMadeActive = this.checkElementMadeActive(e)),
                      n.wasElementMadeActive && this.animateActivation(),
                      requestAnimationFrame(function () {
                        (Me = []),
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
            r = t.cssClasses,
            s = r.FG_DEACTIVATION,
            o = r.FG_ACTIVATION,
            l = t.numbers.DEACTIVATION_TIMEOUT_MS;
          this.layoutInternal();
          var c = "",
            d = "";
          if (!this.adapter.isUnbounded()) {
            var u = this.getFgTranslationCoordinates(),
              p = u.startPoint,
              f = u.endPoint;
            (c = p.x + "px, " + p.y + "px"), (d = f.x + "px, " + f.y + "px");
          }
          this.adapter.updateCssVariable(i, c),
            this.adapter.updateCssVariable(a, d),
            clearTimeout(this.activationTimer),
            clearTimeout(this.fgDeactivationRemovalTimer),
            this.rmBoundedActivationClasses(),
            this.adapter.removeClass(s),
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
                        r = t.x,
                        s = t.y,
                        o = r + n.left,
                        l = s + n.top;
                      if ("touchstart" === e.type) {
                        var c = e;
                        (i = c.changedTouches[0].pageX - o),
                          (a = c.changedTouches[0].pageY - l);
                      } else {
                        var d = e;
                        (i = d.pageX - o), (a = d.pageY - l);
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
            r = i.isActivated;
          (a || !r) &&
            this.activationAnimationHasEnded &&
            (this.rmBoundedActivationClasses(),
            this.adapter.addClass(n),
            (this.fgDeactivationRemovalTimer = setTimeout(function () {
              e.adapter.removeClass(n);
            }, Le.FG_DEACTIVATION_MS)));
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
            var n = Ie({}, t);
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
            r = e.VAR_FG_SCALE;
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
                a,
                this.unboundedCoords.top + "px"
              ));
        }),
        t
      );
    })(Ae),
    Re = {
      FIXED_CLASS: "mdc-top-app-bar--fixed",
      FIXED_SCROLLED_CLASS: "mdc-top-app-bar--fixed-scrolled",
      SHORT_CLASS: "mdc-top-app-bar--short",
      SHORT_COLLAPSED_CLASS: "mdc-top-app-bar--short-collapsed",
      SHORT_HAS_ACTION_ITEM_CLASS: "mdc-top-app-bar--short-has-action-item",
    },
    Fe = { DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100, MAX_TOP_APP_BAR_HEIGHT: 128 },
    ke = {
      ACTION_ITEM_SELECTOR: ".mdc-top-app-bar__action-item",
      NAVIGATION_EVENT: "MDCTopAppBar:nav",
      NAVIGATION_ICON_SELECTOR: ".mdc-top-app-bar__navigation-icon",
      ROOT_SELECTOR: ".mdc-top-app-bar",
      TITLE_SELECTOR: ".mdc-top-app-bar__title",
    },
    Ue = (function (e) {
      function t(n) {
        return e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
      }
      return (
        $e(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return ke;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Re;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Fe;
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
    })(Ae),
    Pe = (function (e) {
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
        $e(t, e),
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
            }, Fe.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)),
            (this.isCurrentlyBeingResized = !0),
            this.resizeDebounceId && clearTimeout(this.resizeDebounceId),
            (this.resizeDebounceId = setTimeout(function () {
              e.handleTargetScroll(),
                (e.isCurrentlyBeingResized = !1),
                (e.resizeDebounceId = 0);
            }, Fe.DEBOUNCE_THROTTLE_RESIZE_TIME_MS));
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
              (e = -Fe.MAX_TOP_APP_BAR_HEIGHT),
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
    })(Ue),
    He = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t.wasScrolled = !1), t;
      }
      return (
        $e(t, e),
        (t.prototype.handleTargetScroll = function () {
          this.adapter.getViewportScrollY() <= 0
            ? this.wasScrolled &&
              (this.adapter.removeClass(Re.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !1))
            : this.wasScrolled ||
              (this.adapter.addClass(Re.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !0));
        }),
        t
      );
    })(Pe),
    Be = (function (e) {
      function t(t) {
        var n = e.call(this, t) || this;
        return (n.collapsed = !1), (n.isAlwaysCollapsed = !1), n;
      }
      return (
        $e(t, e),
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
              this.adapter.addClass(Re.SHORT_HAS_ACTION_ITEM_CLASS),
            this.setAlwaysCollapsed(
              this.adapter.hasClass(Re.SHORT_COLLAPSED_CLASS)
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
          this.adapter.removeClass(Re.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !1);
        }),
        (t.prototype.collapse = function () {
          this.adapter.addClass(Re.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !0);
        }),
        t
      );
    })(Ue);
  const Ve = [];
  function je(t, n = e) {
    let i;
    const a = new Set();
    function r(e) {
      if (s(t, e) && ((t = e), i)) {
        const e = !Ve.length;
        for (const e of a) e[1](), Ve.push(e, t);
        if (e) {
          for (let e = 0; e < Ve.length; e += 2) Ve[e][0](Ve[e + 1]);
          Ve.length = 0;
        }
      }
    }
    return {
      set: r,
      update: function (e) {
        r(e(t));
      },
      subscribe: function (s, o = e) {
        const l = [s, o];
        return (
          a.add(l),
          1 === a.size && (i = n(r) || e),
          s(t),
          () => {
            a.delete(l), 0 === a.size && (i(), (i = null));
          }
        );
      },
    };
  }
  function ze(e) {
    return Object.entries(e)
      .filter(([e, t]) => "" !== e && t)
      .map(([e]) => e)
      .join(" ");
  }
  function Ge(e, t, n, i = { bubbles: !0 }, a = !1) {
    if ("undefined" != typeof Event && e) {
      const r = new CustomEvent(
        t,
        Object.assign(Object.assign({}, i), { detail: n })
      );
      if ((null == e || e.dispatchEvent(r), a && t.startsWith("SMUI"))) {
        const a = new CustomEvent(
          t.replace(/^SMUI/g, () => "MDC"),
          Object.assign(Object.assign({}, i), { detail: n })
        );
        null == e || e.dispatchEvent(a),
          a.defaultPrevented && r.preventDefault();
      }
      return r;
    }
  }
  function qe(e, t) {
    let n = Object.getOwnPropertyNames(e);
    const i = {};
    for (let a = 0; a < n.length; a++) {
      const r = n[a],
        s = r.indexOf("$");
      (-1 !== s && -1 !== t.indexOf(r.substring(0, s + 1))) ||
        (-1 === t.indexOf(r) && (i[r] = e[r]));
    }
    return i;
  }
  const Ke =
      /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/,
    We =
      /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
  function Xe(e) {
    let t,
      n = [];
    function i(t) {
      B(e, t);
    }
    return (
      (e.$on = (e, i) => {
        let a = e,
          r = () => {};
        t ? (r = t(a, i)) : n.push([a, i]);
        return (
          a.match(Ke) &&
            console &&
            console.warn(
              'Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ',
              a
            ),
          () => {
            r();
          }
        );
      }),
      (e) => {
        const a = [],
          r = {};
        t = (t, n) => {
          let s = t,
            o = n,
            l = !1;
          const c = s.match(Ke),
            d = s.match(We),
            u = c || d;
          if (s.match(/^SMUI:\w+:/)) {
            const e = s.split(":");
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
              `The event ${s.split("$")[0]} has been renamed to ${
                t.split("$")[0]
              }.`
            ),
              (s = t);
          }
          if (u) {
            const e = s.split(c ? ":" : "$");
            s = e[0];
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
          const f = T(e, s, o, l),
            m = () => {
              f();
              const e = a.indexOf(m);
              e > -1 && a.splice(e, 1);
            };
          return a.push(m), s in r || (r[s] = T(e, s, i)), m;
        };
        for (let e = 0; e < n.length; e++) t(n[e][0], n[e][1]);
        return {
          destroy: () => {
            for (let e = 0; e < a.length; e++) a[e]();
            for (let e of Object.entries(r)) e[1]();
          },
        };
      }
    );
  }
  function Ye(e, t) {
    let n = Object.getOwnPropertyNames(e);
    const i = {};
    for (let a = 0; a < n.length; a++) {
      const r = n[a];
      r.substring(0, t.length) === t && (i[r.substring(t.length)] = e[r]);
    }
    return i;
  }
  function Qe(e, t) {
    let n = [];
    if (t)
      for (let i = 0; i < t.length; i++) {
        const a = t[i],
          r = Array.isArray(a) ? a[0] : a;
        Array.isArray(a) && a.length > 1 ? n.push(r(e, a[1])) : n.push(r(e));
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
  const { window: Ze } = oe;
  function Je(e) {
    let n, i, s, o, c, f, m;
    const h = e[22].default,
      g = l(h, e, e[21], null);
    let I = [
        {
          class: (i = ze({
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
        { style: (s = Object.entries(e[12]).map(et).concat([e[3]]).join(" ")) },
        e[15],
      ],
      E = {};
    for (let e = 0; e < I.length; e += 1) E = t(E, I[e]);
    return {
      c() {
        (n = y("header")), g && g.c(), O(n, E);
      },
      m(t, i) {
        v(t, n, i),
          g && g.m(n, null),
          e[25](n),
          (c = !0),
          f ||
            ((m = [
              T(Ze, "resize", e[23]),
              T(Ze, "scroll", e[24]),
              $((o = Qe.call(null, n, e[1]))),
              $(e[13].call(null, n)),
              T(n, "SMUITopAppBarIconButton:nav", e[26]),
            ]),
            (f = !0));
      },
      p(e, t) {
        g &&
          g.p &&
          (!c || 2097152 & t[0]) &&
          u(g, h, e, e[21], c ? d(h, e[21], t, null) : p(e[21]), null),
          O(
            n,
            (E = le(I, [
              (!c ||
                (2293 & t[0] &&
                  i !==
                    (i = ze({
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
                  s !==
                    (s = Object.entries(e[12])
                      .map(et)
                      .concat([e[3]])
                      .join(" ")))) && { style: s },
              32768 & t[0] && e[15],
            ]))
          ),
          o && r(o.update) && 2 & t[0] && o.update.call(null, e[1]);
      },
      i(e) {
        c || (re(g, e), (c = !0));
      },
      o(e) {
        se(g, e), (c = !1);
      },
      d(t) {
        t && b(n), g && g.d(t), e[25](null), (f = !1), a(m);
      },
    };
  }
  const et = ([e, t]) => `${e}: ${t};`;
  function tt(e, n, i) {
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
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const l = Xe(R());
    let c = () => {};
    function d(e) {
      return e === c;
    }
    let { use: u = [] } = n,
      { class: p = "" } = n,
      { style: h = "" } = n,
      { variant: g = "standard" } = n,
      { color: $ = "primary" } = n,
      { collapsed: I = c } = n;
    const v = !d(I) && !!I;
    d(I) && (I = !1);
    let b,
      E,
      y,
      { prominent: A = !1 } = n,
      { dense: C = !1 } = n,
      { scrollTarget: _ } = n,
      S = {},
      T = {},
      x = {
        subscribe: je({ variant: g, prominent: A, dense: C }, (e) => {
          i(18, (y = e));
        }).subscribe,
      };
    let O,
      L = g;
    function D() {
      return new ({ static: Ue, short: Be, fixed: He }[g] || Pe)({
        hasClass: N,
        addClass: M,
        removeClass: w,
        setStyle: k,
        getTopAppBarHeight: () => b.clientHeight,
        notifyNavigationIconClicked: () =>
          Ge(b, "SMUITopAppBar:nav", void 0, void 0, !0),
        getViewportScrollY: () =>
          null == _ ? window.pageYOffset : _.scrollTop,
        getTotalActionItems: () =>
          b.querySelectorAll(".mdc-top-app-bar__action-item").length,
      });
    }
    function N(e) {
      return e in S ? S[e] : P().classList.contains(e);
    }
    function M(e) {
      S[e] || i(11, (S[e] = !0), S);
    }
    function w(e) {
      (e in S && !S[e]) || i(11, (S[e] = !1), S);
    }
    function k(e, t) {
      T[e] != t &&
        ("" === t || null == t
          ? (delete T[e], i(12, T), i(20, L), i(4, g), i(9, E))
          : i(12, (T[e] = t), T));
    }
    function U() {
      E &&
        (E.handleTargetScroll(),
        "short" === g && i(0, (I = "isCollapsed" in E && E.isCollapsed)));
    }
    function P() {
      return b;
    }
    F(
      () => (
        i(9, (E = D())),
        E.init(),
        () => {
          E.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(15, (r = m(n, a))),
          "use" in e && i(1, (u = e.use)),
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
          y &&
          y({ variant: g, prominent: A, dense: C }),
          1049104 & e.$$.dirty[0] &&
            L !== g &&
            E &&
            (i(20, (L = g)),
            E.destroy(),
            i(11, (S = {})),
            i(12, (T = {})),
            i(9, (E = D())),
            E.init()),
          528 & e.$$.dirty[0] &&
            E &&
            "short" === g &&
            "setAlwaysCollapsed" in E &&
            E.setAlwaysCollapsed(v),
          524544 & e.$$.dirty[0] &&
            O !== _ &&
            (O && O.removeEventListener("scroll", U),
            _ && _.addEventListener("scroll", U),
            i(19, (O = _)));
      }),
      [
        I,
        u,
        p,
        h,
        g,
        $,
        A,
        C,
        _,
        E,
        b,
        S,
        T,
        l,
        U,
        r,
        function () {
          return x;
        },
        P,
        y,
        O,
        L,
        o,
        s,
        () => "short" !== g && "fixed" !== g && E && E.handleWindowResize(),
        () => null == _ && U(),
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (b = e), i(10, b);
          });
        },
        () => E && E.handleNavigationClick(),
      ]
    );
  }
  class nt extends he {
    constructor(e) {
      super(),
        me(
          this,
          e,
          tt,
          Je,
          s,
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
  function it(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = y("div")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Qe.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = le(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (re(m, e), (s = !0));
      },
      o(e) {
        se(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function at(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Xe(R());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  class rt extends he {
    constructor(e) {
      super(), me(this, e, at, it, s, { use: 0, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function st(e) {
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
          u(i, n, e, e[12], t ? d(n, e[12], a, null) : p(e[12]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function ot(e) {
    let n, i, a;
    const r = [
      { use: [e[7], ...e[0]] },
      { class: ze({ [e[1]]: !0, [e[5]]: !0, ...e[4] }) },
      e[6],
      e[8],
    ];
    var s = e[2];
    function o(e) {
      let n = { $$slots: { default: [st] }, $$scope: { ctx: e } };
      for (let e = 0; e < r.length; e += 1) n = t(n, r[e]);
      return { props: n };
    }
    return (
      s && ((n = new s(o(e))), e[11](n)),
      {
        c() {
          n && ue(n.$$.fragment), (i = S());
        },
        m(e, t) {
          n && pe(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, [t]) {
          const a =
            499 & t
              ? le(r, [
                  129 & t && { use: [e[7], ...e[0]] },
                  50 & t && { class: ze({ [e[1]]: !0, [e[5]]: !0, ...e[4] }) },
                  64 & t && ce(e[6]),
                  256 & t && ce(e[8]),
                ])
              : {};
          if (
            (4096 & t && (a.$$scope = { dirty: t, ctx: e }), s !== (s = e[2]))
          ) {
            if (n) {
              ie();
              const e = n;
              se(e.$$.fragment, 1, 0, () => {
                fe(e, 1);
              }),
                ae();
            }
            s
              ? ((n = new s(o(e))),
                e[11](n),
                ue(n.$$.fragment),
                re(n.$$.fragment, 1),
                pe(n, i.parentNode, i))
              : (n = null);
          } else s && n.$set(a);
        },
        i(e) {
          a || (n && re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && se(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[11](null), t && b(i), n && fe(n, t);
        },
      }
    );
  }
  const lt = {
    component: rt,
    class: "",
    classMap: {},
    contexts: {},
    props: {},
  };
  function ct(e, n, i) {
    const a = ["use", "class", "component", "getElement"];
    let r,
      s = m(n, a),
      { $$slots: o = {}, $$scope: l } = n,
      { use: c = [] } = n,
      { class: d = "" } = n;
    const u = lt.class,
      p = {},
      h = [],
      g = lt.contexts,
      $ = lt.props;
    let { component: I = lt.component } = n;
    Object.entries(lt.classMap).forEach(([e, t]) => {
      const n = H(t);
      n &&
        "subscribe" in n &&
        h.push(
          n.subscribe((t) => {
            i(4, (p[e] = t), p);
          })
        );
    });
    const v = Xe(R());
    for (let e in g) g.hasOwnProperty(e) && P(e, g[e]);
    return (
      k(() => {
        for (const e of h) e();
      }),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(8, (s = m(n, a))),
          "use" in e && i(0, (c = e.use)),
          "class" in e && i(1, (d = e.class)),
          "component" in e && i(2, (I = e.component)),
          "$$scope" in e && i(12, (l = e.$$scope));
      }),
      [
        c,
        d,
        I,
        r,
        p,
        u,
        $,
        v,
        s,
        function () {
          return r.getElement();
        },
        o,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (r = e), i(3, r);
          });
        },
        l,
      ]
    );
  }
  class dt extends he {
    constructor(e) {
      super(),
        me(this, e, ct, ot, s, {
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
  const ut = Object.assign({}, lt);
  function pt(e) {
    return new Proxy(dt, {
      construct: function (t, n) {
        return Object.assign(lt, ut, e), new t(...n);
      },
      get: function (t, n) {
        return Object.assign(lt, ut, e), t[n];
      },
    });
  }
  function ft(e) {
    let n, i, s, o, c;
    const f = e[7].default,
      m = l(f, e, e[6], null);
    let h = [{ href: e[1] }, e[4]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = y("a")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[8](n),
          (s = !0),
          o ||
            ((c = [$((i = Qe.call(null, n, e[0]))), $(e[3].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 64 & t) &&
          u(m, f, e, e[6], s ? d(f, e[6], t, null) : p(e[6]), null),
          O(n, (g = le(h, [(!s || 2 & t) && { href: e[1] }, 16 & t && e[4]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (re(m, e), (s = !0));
      },
      o(e) {
        se(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[8](null), (o = !1), a(c);
      },
    };
  }
  function mt(e, n, i) {
    const a = ["use", "href", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n,
      { href: c = "javascript:void(0);" } = n;
    const d = Xe(R());
    let u;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(4, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "href" in e && i(1, (c = e.href)),
          "$$scope" in e && i(6, (o = e.$$scope));
      }),
      [
        l,
        c,
        u,
        d,
        r,
        function () {
          return u;
        },
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (u = e), i(2, u);
          });
        },
      ]
    );
  }
  function ht(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = y("button")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          n.autofocus && n.focus(),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Qe.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = le(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (re(m, e), (s = !0));
      },
      o(e) {
        se(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function gt(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Xe(R());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function $t(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = y("h1")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Qe.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = le(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (re(m, e), (s = !0));
      },
      o(e) {
        se(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function It(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Xe(R());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function vt(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = y("h2")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Qe.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = le(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (re(m, e), (s = !0));
      },
      o(e) {
        se(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function bt(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Xe(R());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function Et(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = y("h3")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Qe.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = le(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (re(m, e), (s = !0));
      },
      o(e) {
        se(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function yt(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Xe(R());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function At(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = y("li")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Qe.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = le(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (re(m, e), (s = !0));
      },
      o(e) {
        se(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function Ct(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Xe(R());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function _t(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = y("nav")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Qe.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = le(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (re(m, e), (s = !0));
      },
      o(e) {
        se(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function St(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Xe(R());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function Tt(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = y("span")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Qe.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = le(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (re(m, e), (s = !0));
      },
      o(e) {
        se(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function xt(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Xe(R());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  class Ot extends he {
    constructor(e) {
      super(), me(this, e, xt, Tt, s, { use: 0, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function Lt(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = y("ul")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Qe.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = le(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (re(m, e), (s = !0));
      },
      o(e) {
        se(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function Dt(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Xe(R());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  const Nt = class extends he {
      constructor(e) {
        super(), me(this, e, mt, ft, s, { use: 0, href: 1, getElement: 5 });
      }
      get getElement() {
        return this.$$.ctx[5];
      }
    },
    Mt = class extends he {
      constructor(e) {
        super(), me(this, e, gt, ht, s, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    wt = rt,
    Rt = class extends he {
      constructor(e) {
        super(), me(this, e, It, $t, s, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Ft = class extends he {
      constructor(e) {
        super(), me(this, e, bt, vt, s, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    kt = class extends he {
      constructor(e) {
        super(), me(this, e, yt, Et, s, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Ut = class extends he {
      constructor(e) {
        super(), me(this, e, Ct, At, s, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Pt = class extends he {
      constructor(e) {
        super(), me(this, e, St, _t, s, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Ht = Ot,
    Bt = class extends he {
      constructor(e) {
        super(), me(this, e, Dt, Lt, s, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    };
  var Vt = pt({ class: "mdc-top-app-bar__row", component: wt });
  function jt(e) {
    let n, i, s, o, c, f;
    const m = e[9].default,
      h = l(m, e, e[8], null);
    let g = [
        {
          class: (i = ze({
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
        (n = y("section")), h && h.c(), O(n, I);
      },
      m(t, i) {
        v(t, n, i),
          h && h.m(n, null),
          e[10](n),
          (o = !0),
          c ||
            ((f = [$((s = Qe.call(null, n, e[0]))), $(e[5].call(null, n))]),
            (c = !0));
      },
      p(e, [t]) {
        h &&
          h.p &&
          (!o || 256 & t) &&
          u(h, m, e, e[8], o ? d(m, e[8], t, null) : p(e[8]), null),
          O(
            n,
            (I = le(g, [
              (!o ||
                (6 & t &&
                  i !==
                    (i = ze({
                      [e[1]]: !0,
                      "mdc-top-app-bar__section": !0,
                      "mdc-top-app-bar__section--align-start": "start" === e[2],
                      "mdc-top-app-bar__section--align-end": "end" === e[2],
                    })))) && { class: i },
              8 & t && (e[3] ? { role: "toolbar" } : {}),
              64 & t && e[6],
            ]))
          ),
          s && r(s.update) && 1 & t && s.update.call(null, e[0]);
      },
      i(e) {
        o || (re(h, e), (o = !0));
      },
      o(e) {
        se(h, e), (o = !1);
      },
      d(t) {
        t && b(n), h && h.d(t), e[10](null), (c = !1), a(f);
      },
    };
  }
  function zt(e, n, i) {
    const a = ["use", "class", "align", "toolbar", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const l = Xe(R());
    let c,
      { use: d = [] } = n,
      { class: u = "" } = n,
      { align: p = "start" } = n,
      { toolbar: h = !1 } = n;
    return (
      P(
        "SMUI:icon-button:context",
        h ? "top-app-bar:action" : "top-app-bar:navigation"
      ),
      P(
        "SMUI:button:context",
        h ? "top-app-bar:action" : "top-app-bar:navigation"
      ),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(6, (r = m(n, a))),
          "use" in e && i(0, (d = e.use)),
          "class" in e && i(1, (u = e.class)),
          "align" in e && i(2, (p = e.align)),
          "toolbar" in e && i(3, (h = e.toolbar)),
          "$$scope" in e && i(8, (o = e.$$scope));
      }),
      [
        d,
        u,
        p,
        h,
        c,
        l,
        r,
        function () {
          return c;
        },
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (c = e), i(4, c);
          });
        },
      ]
    );
  }
  var Gt = pt({ class: "mdc-top-app-bar__title", component: Ht });
  const qt = class extends he {
    constructor(e) {
      super(),
        me(this, e, zt, jt, s, {
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
   */ var Kt = {
      LABEL_FLOAT_ABOVE: "mdc-floating-label--float-above",
      LABEL_REQUIRED: "mdc-floating-label--required",
      LABEL_SHAKE: "mdc-floating-label--shake",
      ROOT: "mdc-floating-label",
    },
    Wt = (function (e) {
      function t(n) {
        var i = e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
        return (
          (i.shakeAnimationEndHandler = function () {
            i.handleShakeAnimationEnd();
          }),
          i
        );
      }
      return (
        $e(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Kt;
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
    })(Ae),
    Xt = {
      LINE_RIPPLE_ACTIVE: "mdc-line-ripple--active",
      LINE_RIPPLE_DEACTIVATING: "mdc-line-ripple--deactivating",
    },
    Yt = (function (e) {
      function t(n) {
        var i = e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
        return (
          (i.transitionEndHandler = function (e) {
            i.handleTransitionEnd(e);
          }),
          i
        );
      }
      return (
        $e(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Xt;
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
          this.adapter.removeClass(Xt.LINE_RIPPLE_DEACTIVATING),
            this.adapter.addClass(Xt.LINE_RIPPLE_ACTIVE);
        }),
        (t.prototype.setRippleCenter = function (e) {
          this.adapter.setStyle("transform-origin", e + "px center");
        }),
        (t.prototype.deactivate = function () {
          this.adapter.addClass(Xt.LINE_RIPPLE_DEACTIVATING);
        }),
        (t.prototype.handleTransitionEnd = function (e) {
          var t = this.adapter.hasClass(Xt.LINE_RIPPLE_DEACTIVATING);
          "opacity" === e.propertyName &&
            t &&
            (this.adapter.removeClass(Xt.LINE_RIPPLE_ACTIVE),
            this.adapter.removeClass(Xt.LINE_RIPPLE_DEACTIVATING));
        }),
        t
      );
    })(Ae),
    Qt = { NOTCH_ELEMENT_SELECTOR: ".mdc-notched-outline__notch" },
    Zt = { NOTCH_ELEMENT_PADDING: 8 },
    Jt = {
      NO_LABEL: "mdc-notched-outline--no-label",
      OUTLINE_NOTCHED: "mdc-notched-outline--notched",
      OUTLINE_UPGRADED: "mdc-notched-outline--upgraded",
    },
    en = (function (e) {
      function t(n) {
        return e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
      }
      return (
        $e(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Qt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Jt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Zt;
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
          e > 0 && (e += Zt.NOTCH_ELEMENT_PADDING),
            this.adapter.setNotchWidthProperty(e),
            this.adapter.addClass(n);
        }),
        (t.prototype.closeNotch = function () {
          var e = t.cssClasses.OUTLINE_NOTCHED;
          this.adapter.removeClass(e), this.adapter.removeNotchWidthProperty();
        }),
        t
      );
    })(Ae),
    tn = {
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
    nn = {
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
    an = { LABEL_SCALE: 0.75 },
    rn = [
      "pattern",
      "min",
      "max",
      "required",
      "step",
      "minlength",
      "maxlength",
    ],
    sn = ["color", "date", "datetime-local", "month", "range", "time", "week"],
    on = ["mousedown", "touchstart"],
    ln = ["click", "keydown"],
    cn = (function (e) {
      function t(n, i) {
        void 0 === i && (i = {});
        var a = e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
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
        $e(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return nn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return tn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return an;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "shouldAlwaysFloat", {
          get: function () {
            var e = this.getNativeInput().type;
            return sn.indexOf(e) >= 0;
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
            for (var a = Ee(on), r = a.next(); !r.done; r = a.next()) {
              var s = r.value;
              this.adapter.registerInputInteractionHandler(
                s,
                this.setPointerXOffset
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              r && !r.done && (t = a.return) && t.call(a);
            } finally {
              if (e) throw e.error;
            }
          }
          try {
            for (var o = Ee(ln), l = o.next(); !l.done; l = o.next()) {
              s = l.value;
              this.adapter.registerTextFieldInteractionHandler(
                s,
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
            for (var a = Ee(on), r = a.next(); !r.done; r = a.next()) {
              var s = r.value;
              this.adapter.deregisterInputInteractionHandler(
                s,
                this.setPointerXOffset
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              r && !r.done && (t = a.return) && t.call(a);
            } finally {
              if (e) throw e.error;
            }
          }
          try {
            for (var o = Ee(ln), l = o.next(); !l.done; l = o.next()) {
              s = l.value;
              this.adapter.deregisterTextFieldInteractionHandler(
                s,
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
              rn.indexOf(e) > -1 &&
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
              var t = this.adapter.getLabelWidth() * an.LABEL_SCALE;
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
              ? this.adapter.setInputAttr(tn.ARIA_DESCRIBEDBY, a)
              : this.adapter.removeInputAttr(tn.ARIA_DESCRIBEDBY);
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
    })(Ae),
    dn = "mdc-dom-focus-sentinel",
    un = (function () {
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
            .call(this.root.querySelectorAll("." + dn))
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
                  !e.classList.contains(dn) &&
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
            e.classList.add(dn),
            e
          );
        }),
        e
      );
    })(),
    pn = Object.freeze({ __proto__: null, FocusTrap: un }),
    fn = "Unknown",
    mn = "Backspace",
    hn = "Enter",
    gn = "Spacebar",
    $n = "PageUp",
    In = "PageDown",
    vn = "End",
    bn = "Home",
    En = "ArrowLeft",
    yn = "ArrowUp",
    An = "ArrowRight",
    Cn = "ArrowDown",
    _n = "Delete",
    Sn = "Escape",
    Tn = "Tab",
    xn = new Set();
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
   */ xn.add(mn),
    xn.add(hn),
    xn.add(gn),
    xn.add($n),
    xn.add(In),
    xn.add(vn),
    xn.add(bn),
    xn.add(En),
    xn.add(yn),
    xn.add(An),
    xn.add(Cn),
    xn.add(_n),
    xn.add(Sn),
    xn.add(Tn);
  var On = 8,
    Ln = 13,
    Dn = 32,
    Nn = 33,
    Mn = 34,
    wn = 35,
    Rn = 36,
    Fn = 37,
    kn = 38,
    Un = 39,
    Pn = 40,
    Hn = 46,
    Bn = 27,
    Vn = 9,
    jn = new Map();
  jn.set(On, mn),
    jn.set(Ln, hn),
    jn.set(Dn, gn),
    jn.set(Nn, $n),
    jn.set(Mn, In),
    jn.set(wn, vn),
    jn.set(Rn, bn),
    jn.set(Fn, En),
    jn.set(kn, yn),
    jn.set(Un, An),
    jn.set(Pn, Cn),
    jn.set(Hn, _n),
    jn.set(Bn, Sn),
    jn.set(Vn, Tn);
  var zn = new Set();
  function Gn(e) {
    var t = e.key;
    if (xn.has(t)) return t;
    var n = jn.get(e.keyCode);
    return n || fn;
  }
  function qn(e) {
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
          u(i, n, e, e[11], t ? d(n, e[11], a, null) : p(e[11]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Kn(e) {
    let n, i, a;
    const r = [
      { use: [e[4], ...e[0]] },
      {
        class: ze({
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
    var s = e[2];
    function o(e) {
      let n = { $$slots: { default: [qn] }, $$scope: { ctx: e } };
      for (let e = 0; e < r.length; e += 1) n = t(n, r[e]);
      return { props: n };
    }
    return (
      s && ((n = new s(o(e))), e[10](n)),
      {
        c() {
          n && ue(n.$$.fragment), (i = S());
        },
        m(e, t) {
          n && pe(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, [t]) {
          const a =
            243 & t
              ? le(r, [
                  17 & t && { use: [e[4], ...e[0]] },
                  34 & t && {
                    class: ze({
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
                    ce("snackbar" === e[5] ? { "aria-atomic": "false" } : {}),
                  64 & t && { tabindex: e[6] },
                  128 & t && ce(e[7]),
                ])
              : {};
          if (
            (2048 & t && (a.$$scope = { dirty: t, ctx: e }), s !== (s = e[2]))
          ) {
            if (n) {
              ie();
              const e = n;
              se(e.$$.fragment, 1, 0, () => {
                fe(e, 1);
              }),
                ae();
            }
            s
              ? ((n = new s(o(e))),
                e[10](n),
                ue(n.$$.fragment),
                re(n.$$.fragment, 1),
                pe(n, i.parentNode, i))
              : (n = null);
          } else s && n.$set(a);
        },
        i(e) {
          a || (n && re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && se(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[10](null), t && b(i), n && fe(n, t);
        },
      }
    );
  }
  function Wn(e, n, i) {
    const a = ["use", "class", "component", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const l = Xe(R());
    let c,
      { use: d = [] } = n,
      { class: u = "" } = n,
      { component: p = Ot } = n;
    const h = H("SMUI:label:context"),
      g = H("SMUI:label:tabindex");
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(7, (r = m(n, a))),
          "use" in e && i(0, (d = e.use)),
          "class" in e && i(1, (u = e.class)),
          "component" in e && i(2, (p = e.component)),
          "$$scope" in e && i(11, (o = e.$$scope));
      }),
      [
        d,
        u,
        p,
        c,
        l,
        h,
        g,
        r,
        function () {
          return c.getElement();
        },
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (c = e), i(3, c);
          });
        },
        o,
      ]
    );
  }
  zn.add($n),
    zn.add(In),
    zn.add(vn),
    zn.add(bn),
    zn.add(En),
    zn.add(yn),
    zn.add(An),
    zn.add(Cn);
  function Xn(e) {
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
          u(i, n, e, e[3], t ? d(n, e[3], a, null) : p(e[3]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Yn(e, t, n) {
    let i,
      { $$slots: a = {}, $$scope: r } = t,
      { key: s } = t,
      { value: l } = t;
    const c = je(l);
    return (
      o(e, c, (e) => n(5, (i = e))),
      P(s, c),
      k(() => {
        c.set(void 0);
      }),
      (e.$$set = (e) => {
        "key" in e && n(1, (s = e.key)),
          "value" in e && n(2, (l = e.value)),
          "$$scope" in e && n(3, (r = e.$$scope));
      }),
      (e.$$.update = () => {
        4 & e.$$.dirty && g(c, (i = l), i);
      }),
      [c, s, l, r, a]
    );
  }
  class Qn extends he {
    constructor(e) {
      super(), me(this, e, Yn, Xn, s, { key: 1, value: 2 });
    }
  }
  const Zn = class extends he {
      constructor(e) {
        super(),
          me(this, e, Wn, Kn, s, {
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
    { applyPassive: Jn } = Ce,
    { matches: ei } = Te;
  function ti(
    e,
    {
      ripple: t = !0,
      surface: n = !1,
      unbounded: i = !1,
      disabled: a = !1,
      color: r,
      active: s,
      rippleElement: o,
      eventTarget: l,
      activeTarget: c,
      addClass: d = (t) => e.classList.add(t),
      removeClass: u = (t) => e.classList.remove(t),
      addStyle: p = (t, n) => e.style.setProperty(t, n),
      initPromise: f = Promise.resolve(),
    } = {}
  ) {
    let m,
      h,
      g = H("SMUI:addLayoutListener"),
      $ = s,
      I = l,
      v = c;
    function b() {
      n
        ? (d("mdc-ripple-surface"),
          "primary" === r
            ? (d("smui-ripple-surface--primary"),
              u("smui-ripple-surface--secondary"))
            : "secondary" === r
            ? (u("smui-ripple-surface--primary"),
              d("smui-ripple-surface--secondary"))
            : (u("smui-ripple-surface--primary"),
              u("smui-ripple-surface--secondary")))
        : (u("mdc-ripple-surface"),
          u("smui-ripple-surface--primary"),
          u("smui-ripple-surface--secondary")),
        m &&
          $ !== s &&
          (($ = s), s ? m.activate() : !1 === s && m.deactivate()),
        t && !m
          ? ((m = new we({
              addClass: d,
              browserSupportsCssVars: () =>
                (function (e, t) {
                  void 0 === t && (t = !1);
                  var n,
                    i = e.CSS;
                  if ("boolean" == typeof Se && !t) return Se;
                  if (!i || "function" != typeof i.supports) return !1;
                  var a = i.supports("--css-vars", "yes"),
                    r =
                      i.supports("(--css-vars: yes)") &&
                      i.supports("color", "#00000000");
                  return (n = a || r), t || (Se = n), n;
                })(window),
              computeBoundingRect: () => (o || e).getBoundingClientRect(),
              containsEventTarget: (t) => e.contains(t),
              deregisterDocumentInteractionHandler: (e, t) =>
                document.documentElement.removeEventListener(e, t, Jn()),
              deregisterInteractionHandler: (t, n) =>
                (l || e).removeEventListener(t, n, Jn()),
              deregisterResizeHandler: (e) =>
                window.removeEventListener("resize", e),
              getWindowPageOffset: () => ({
                x: window.pageXOffset,
                y: window.pageYOffset,
              }),
              isSurfaceActive: () => (null == s ? ei(c || e, ":active") : s),
              isSurfaceDisabled: () => !!a,
              isUnbounded: () => !!i,
              registerDocumentInteractionHandler: (e, t) =>
                document.documentElement.addEventListener(e, t, Jn()),
              registerInteractionHandler: (t, n) =>
                (l || e).addEventListener(t, n, Jn()),
              registerResizeHandler: (e) =>
                window.addEventListener("resize", e),
              removeClass: u,
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
        !t && i && d("mdc-ripple-upgraded--unbounded");
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
            color: r,
            active: s,
            rippleElement: o,
            eventTarget: l,
            activeTarget: c,
            addClass: d,
            removeClass: u,
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
            u("mdc-ripple-surface"),
            u("smui-ripple-surface--primary"),
            u("smui-ripple-surface--secondary")),
            h && h();
        },
      }
    );
  }
  function ni(e) {
    let n, i, s, o, c, f, m, h;
    const g = e[22].default,
      I = l(g, e, e[21], null);
    let E = [
        {
          class: (i = ze({
            [e[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": e[0],
            "mdc-floating-label--required": e[1],
            ...e[8],
          })),
        },
        { style: (s = Object.entries(e[9]).map(si).concat([e[4]]).join(" ")) },
        { for: (o = e[5] || (e[11] ? e[11].id : void 0)) },
        e[12],
      ],
      A = {};
    for (let e = 0; e < E.length; e += 1) A = t(A, E[e]);
    return {
      c() {
        (n = y("label")), I && I.c(), O(n, A);
      },
      m(t, i) {
        v(t, n, i),
          I && I.m(n, null),
          e[24](n),
          (f = !0),
          m ||
            ((h = [$((c = Qe.call(null, n, e[2]))), $(e[10].call(null, n))]),
            (m = !0));
      },
      p(e, t) {
        I &&
          I.p &&
          (!f || 2097152 & t) &&
          u(I, g, e, e[21], f ? d(g, e[21], t, null) : p(e[21]), null),
          O(
            n,
            (A = le(E, [
              (!f ||
                (267 & t &&
                  i !==
                    (i = ze({
                      [e[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": e[0],
                      "mdc-floating-label--required": e[1],
                      ...e[8],
                    })))) && { class: i },
              (!f ||
                (528 & t &&
                  s !==
                    (s = Object.entries(e[9])
                      .map(si)
                      .concat([e[4]])
                      .join(" ")))) && { style: s },
              (!f ||
                (32 & t &&
                  o !== (o = e[5] || (e[11] ? e[11].id : void 0)))) && {
                for: o,
              },
              4096 & t && e[12],
            ]))
          ),
          c && r(c.update) && 4 & t && c.update.call(null, e[2]);
      },
      i(e) {
        f || (re(I, e), (f = !0));
      },
      o(e) {
        se(I, e), (f = !1);
      },
      d(t) {
        t && b(n), I && I.d(t), e[24](null), (m = !1), a(h);
      },
    };
  }
  function ii(e) {
    let n, i, s, o, c, f, m;
    const h = e[22].default,
      g = l(h, e, e[21], null);
    let I = [
        {
          class: (i = ze({
            [e[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": e[0],
            "mdc-floating-label--required": e[1],
            ...e[8],
          })),
        },
        { style: (s = Object.entries(e[9]).map(ri).concat([e[4]]).join(" ")) },
        e[12],
      ],
      E = {};
    for (let e = 0; e < I.length; e += 1) E = t(E, I[e]);
    return {
      c() {
        (n = y("span")), g && g.c(), O(n, E);
      },
      m(t, i) {
        v(t, n, i),
          g && g.m(n, null),
          e[23](n),
          (c = !0),
          f ||
            ((m = [$((o = Qe.call(null, n, e[2]))), $(e[10].call(null, n))]),
            (f = !0));
      },
      p(e, t) {
        g &&
          g.p &&
          (!c || 2097152 & t) &&
          u(g, h, e, e[21], c ? d(h, e[21], t, null) : p(e[21]), null),
          O(
            n,
            (E = le(I, [
              (!c ||
                (267 & t &&
                  i !==
                    (i = ze({
                      [e[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": e[0],
                      "mdc-floating-label--required": e[1],
                      ...e[8],
                    })))) && { class: i },
              (!c ||
                (528 & t &&
                  s !==
                    (s = Object.entries(e[9])
                      .map(ri)
                      .concat([e[4]])
                      .join(" ")))) && { style: s },
              4096 & t && e[12],
            ]))
          ),
          o && r(o.update) && 4 & t && o.update.call(null, e[2]);
      },
      i(e) {
        c || (re(g, e), (c = !0));
      },
      o(e) {
        se(g, e), (c = !1);
      },
      d(t) {
        t && b(n), g && g.d(t), e[23](null), (f = !1), a(m);
      },
    };
  }
  function ai(e) {
    let t, n, i, a;
    const r = [ii, ni],
      s = [];
    function o(e, t) {
      return e[6] ? 0 : 1;
    }
    return (
      (t = o(e)),
      (n = s[t] = r[t](e)),
      {
        c() {
          n.c(), (i = S());
        },
        m(e, n) {
          s[t].m(e, n), v(e, i, n), (a = !0);
        },
        p(e, [a]) {
          let l = t;
          (t = o(e)),
            t === l
              ? s[t].p(e, a)
              : (ie(),
                se(s[l], 1, 1, () => {
                  s[l] = null;
                }),
                ae(),
                (n = s[t]),
                n ? n.p(e, a) : ((n = s[t] = r[t](e)), n.c()),
                re(n, 1),
                n.m(i.parentNode, i));
        },
        i(e) {
          a || (re(n), (a = !0));
        },
        o(e) {
          se(n), (a = !1);
        },
        d(e) {
          s[t].d(e), e && b(i);
        },
      }
    );
  }
  const ri = ([e, t]) => `${e}: ${t};`,
    si = ([e, t]) => `${e}: ${t};`;
  function oi(e, n, i) {
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
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    var l;
    const c = Xe(R());
    let d,
      u,
      { use: p = [] } = n,
      { class: h = "" } = n,
      { style: g = "" } = n,
      { for: $ } = n,
      { floatAbove: I = !1 } = n,
      { required: v = !1 } = n,
      { wrapped: b = !1 } = n,
      E = {},
      y = {},
      A = null !== (l = H("SMUI:generic:input:props")) && void 0 !== l ? l : {},
      C = I,
      _ = v;
    function S(e) {
      E[e] || i(8, (E[e] = !0), E);
    }
    function T(e) {
      (e in E && !E[e]) || i(8, (E[e] = !1), E);
    }
    function x(e, t) {
      y[e] != t &&
        ("" === t || null == t ? (delete y[e], i(9, y)) : i(9, (y[e] = t), y));
    }
    function O(e) {
      e in y && (delete y[e], i(9, y));
    }
    function L() {
      return d;
    }
    return (
      F(() => {
        i(
          18,
          (u = new Wt({
            addClass: S,
            removeClass: T,
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
          addStyle: x,
          removeStyle: O,
        };
        return (
          Ge(d, "SMUIFloatingLabel:mount", e),
          u.init(),
          () => {
            Ge(d, "SMUIFloatingLabel:unmount", e), u.destroy();
          }
        );
      }),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(12, (r = m(n, a))),
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
        786433 & e.$$.dirty && u && C !== I && (i(19, (C = I)), u.float(I)),
          1310722 & e.$$.dirty &&
            u &&
            _ !== v &&
            (i(20, (_ = v)), u.setRequired(v));
      }),
      [
        I,
        v,
        p,
        h,
        g,
        $,
        b,
        d,
        E,
        y,
        c,
        A,
        r,
        function (e) {
          u.shake(e);
        },
        function (e) {
          i(0, (I = e));
        },
        function (e) {
          i(1, (v = e));
        },
        function () {
          return u.getWidth();
        },
        L,
        u,
        C,
        _,
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (d = e), i(7, d);
          });
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (d = e), i(7, d);
          });
        },
      ]
    );
  }
  class li extends he {
    constructor(e) {
      super(),
        me(this, e, oi, ai, s, {
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
  function ci(n) {
    let i,
      s,
      o,
      l,
      c,
      d,
      u = [
        {
          class: (s = ze({
            [n[1]]: !0,
            "mdc-line-ripple": !0,
            "mdc-line-ripple--active": n[3],
            ...n[5],
          })),
        },
        { style: (o = Object.entries(n[6]).map(di).concat([n[2]]).join(" ")) },
        n[8],
      ],
      p = {};
    for (let e = 0; e < u.length; e += 1) p = t(p, u[e]);
    return {
      c() {
        (i = y("div")), O(i, p);
      },
      m(e, t) {
        v(e, i, t),
          n[13](i),
          c ||
            ((d = [$((l = Qe.call(null, i, n[0]))), $(n[7].call(null, i))]),
            (c = !0));
      },
      p(e, [t]) {
        O(
          i,
          (p = le(u, [
            42 & t &&
              s !==
                (s = ze({
                  [e[1]]: !0,
                  "mdc-line-ripple": !0,
                  "mdc-line-ripple--active": e[3],
                  ...e[5],
                })) && { class: s },
            68 & t &&
              o !==
                (o = Object.entries(e[6]).map(di).concat([e[2]]).join(" ")) && {
                style: o,
              },
            256 & t && e[8],
          ]))
        ),
          l && r(l.update) && 1 & t && l.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && b(i), n[13](null), (c = !1), a(d);
      },
    };
  }
  const di = ([e, t]) => `${e}: ${t};`;
  function ui(e, n, i) {
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
    let r = m(n, a);
    const s = Xe(R());
    let o,
      l,
      { use: c = [] } = n,
      { class: d = "" } = n,
      { style: u = "" } = n,
      { active: p = !1 } = n,
      h = {},
      g = {};
    function $(e) {
      return e in h ? h[e] : E().classList.contains(e);
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
    function E() {
      return o;
    }
    return (
      F(
        () => (
          (l = new Yt({
            addClass: I,
            removeClass: v,
            hasClass: $,
            setStyle: b,
            registerEventHandler: (e, t) => E().addEventListener(e, t),
            deregisterEventHandler: (e, t) => E().removeEventListener(e, t),
          })),
          l.init(),
          () => {
            l.destroy();
          }
        )
      ),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(8, (r = m(n, a))),
          "use" in e && i(0, (c = e.use)),
          "class" in e && i(1, (d = e.class)),
          "style" in e && i(2, (u = e.style)),
          "active" in e && i(3, (p = e.active));
      }),
      [
        c,
        d,
        u,
        p,
        o,
        h,
        g,
        s,
        r,
        function () {
          l.activate();
        },
        function () {
          l.deactivate();
        },
        function (e) {
          l.setRippleCenter(e);
        },
        E,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (o = e), i(4, o);
          });
        },
      ]
    );
  }
  class pi extends he {
    constructor(e) {
      super(),
        me(this, e, ui, ci, s, {
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
  function fi(e) {
    let t, n, i;
    const a = e[14].default,
      r = l(a, e, e[13], null);
    return {
      c() {
        (t = y("div")),
          r && r.c(),
          x(t, "class", "mdc-notched-outline__notch"),
          x(t, "style", (n = Object.entries(e[7]).map(hi).join(" ")));
      },
      m(e, n) {
        v(e, t, n), r && r.m(t, null), (i = !0);
      },
      p(e, s) {
        r &&
          r.p &&
          (!i || 8192 & s) &&
          u(r, a, e, e[13], i ? d(a, e[13], s, null) : p(e[13]), null),
          (!i ||
            (128 & s && n !== (n = Object.entries(e[7]).map(hi).join(" ")))) &&
            x(t, "style", n);
      },
      i(e) {
        i || (re(r, e), (i = !0));
      },
      o(e) {
        se(r, e), (i = !1);
      },
      d(e) {
        e && b(t), r && r.d(e);
      },
    };
  }
  function mi(e) {
    let n,
      i,
      s,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      m = !e[3] && fi(e),
      h = [
        {
          class: (c = ze({
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
        (n = y("div")),
          (i = y("div")),
          (s = _()),
          m && m.c(),
          (o = _()),
          (l = y("div")),
          x(i, "class", "mdc-notched-outline__leading"),
          x(l, "class", "mdc-notched-outline__trailing"),
          O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          I(n, i),
          I(n, s),
          m && m.m(n, null),
          I(n, o),
          I(n, l),
          e[15](n),
          (u = !0),
          p ||
            ((f = [
              $((d = Qe.call(null, n, e[0]))),
              $(e[8].call(null, n)),
              T(n, "SMUIFloatingLabel:mount", e[16]),
              T(n, "SMUIFloatingLabel:unmount", e[17]),
            ]),
            (p = !0));
      },
      p(e, [t]) {
        e[3]
          ? m &&
            (ie(),
            se(m, 1, 1, () => {
              m = null;
            }),
            ae())
          : m
          ? (m.p(e, t), 8 & t && re(m, 1))
          : ((m = fi(e)), m.c(), re(m, 1), m.m(n, o)),
          O(
            n,
            (g = le(h, [
              (!u ||
                (78 & t &&
                  c !==
                    (c = ze({
                      [e[1]]: !0,
                      "mdc-notched-outline": !0,
                      "mdc-notched-outline--notched": e[2],
                      "mdc-notched-outline--no-label": e[3],
                      ...e[6],
                    })))) && { class: c },
              512 & t && e[9],
            ]))
          ),
          d && r(d.update) && 1 & t && d.update.call(null, e[0]);
      },
      i(e) {
        u || (re(m), (u = !0));
      },
      o(e) {
        se(m), (u = !1);
      },
      d(t) {
        t && b(n), m && m.d(), e[15](null), (p = !1), a(f);
      },
    };
  }
  const hi = ([e, t]) => `${e}: ${t};`;
  function gi(e, n, i) {
    const a = [
      "use",
      "class",
      "notched",
      "noLabel",
      "notch",
      "closeNotch",
      "getElement",
    ];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const l = Xe(R());
    let c,
      d,
      u,
      { use: p = [] } = n,
      { class: h = "" } = n,
      { notched: g = !1 } = n,
      { noLabel: $ = !1 } = n,
      I = {},
      v = {};
    function b(e) {
      I[e] || i(6, (I[e] = !0), I);
    }
    function E(e) {
      (e in I && !I[e]) || i(6, (I[e] = !1), I);
    }
    F(
      () => (
        (d = new en({
          addClass: b,
          removeClass: E,
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
        d.init(),
        () => {
          d.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(9, (r = m(n, a))),
          "use" in e && i(0, (p = e.use)),
          "class" in e && i(1, (h = e.class)),
          "notched" in e && i(2, (g = e.notched)),
          "noLabel" in e && i(3, ($ = e.noLabel)),
          "$$scope" in e && i(13, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        16 & e.$$.dirty &&
          (u
            ? (u.addStyle("transition-duration", "0s"),
              b("mdc-notched-outline--upgraded"),
              requestAnimationFrame(() => {
                u && u.removeStyle("transition-duration");
              }))
            : E("mdc-notched-outline--upgraded"));
      }),
      [
        p,
        h,
        g,
        $,
        u,
        c,
        I,
        v,
        l,
        r,
        function (e) {
          d.notch(e);
        },
        function () {
          d.closeNotch();
        },
        function () {
          return c;
        },
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (c = e), i(5, c);
          });
        },
        (e) => i(4, (u = e.detail)),
        () => i(4, (u = void 0)),
      ]
    );
  }
  class $i extends he {
    constructor(e) {
      super(),
        me(this, e, gi, mi, s, {
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
  var Ii = pt({ class: "mdc-text-field-helper-line", component: wt }),
    vi = pt({
      class: "mdc-text-field__affix mdc-text-field__affix--prefix",
      component: Ht,
    }),
    bi = pt({
      class: "mdc-text-field__affix mdc-text-field__affix--suffix",
      component: Ht,
    });
  function Ei(n) {
    let i,
      s,
      o,
      l,
      c,
      d = [
        { class: (s = ze({ [n[1]]: !0, "mdc-text-field__input": !0 })) },
        { type: n[2] },
        { placeholder: n[3] },
        n[4],
        n[6],
        n[10],
      ],
      u = {};
    for (let e = 0; e < d.length; e += 1) u = t(u, d[e]);
    return {
      c() {
        (i = y("input")), O(i, u);
      },
      m(e, t) {
        v(e, i, t),
          i.autofocus && i.focus(),
          n[26](i),
          l ||
            ((c = [
              $((o = Qe.call(null, i, n[0]))),
              $(n[7].call(null, i)),
              T(i, "input", n[27]),
              T(i, "change", n[9]),
              T(i, "blur", n[24]),
              T(i, "focus", n[25]),
            ]),
            (l = !0));
      },
      p(e, [t]) {
        O(
          i,
          (u = le(d, [
            2 & t &&
              s !== (s = ze({ [e[1]]: !0, "mdc-text-field__input": !0 })) && {
                class: s,
              },
            4 & t && { type: e[2] },
            8 & t && { placeholder: e[3] },
            16 & t && e[4],
            64 & t && e[6],
            1024 & t && e[10],
          ]))
        ),
          o && r(o.update) && 1 & t && o.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && b(i), n[26](null), (l = !1), a(c);
      },
    };
  }
  function yi(e, n, i) {
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
    let r = m(n, a);
    const s = Xe(R());
    let o = () => {};
    let { use: l = [] } = n,
      { class: c = "" } = n,
      { type: d = "text" } = n,
      { placeholder: u = " " } = n,
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
    let E,
      { emptyValueUndefined: y = void 0 === p } = n;
    h && y && (p = void 0);
    let A = {},
      C = {};
    function _(e) {
      if ("file" !== d)
        if ("" === e.currentTarget.value && b) i(11, (p = null));
        else if ("" === e.currentTarget.value && y) i(11, (p = void 0));
        else
          switch (d) {
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
    function S() {
      return E;
    }
    F(() => {
      v && i(14, (I = E.matches(":invalid")));
    });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(10, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "class" in e && i(1, (c = e.class)),
          "type" in e && i(2, (d = e.type)),
          "placeholder" in e && i(3, (u = e.placeholder)),
          "value" in e && i(11, (p = e.value)),
          "files" in e && i(12, (g = e.files)),
          "dirty" in e && i(13, ($ = e.dirty)),
          "invalid" in e && i(14, (I = e.invalid)),
          "updateInvalid" in e && i(15, (v = e.updateInvalid)),
          "emptyValueNull" in e && i(16, (b = e.emptyValueNull)),
          "emptyValueUndefined" in e && i(17, (y = e.emptyValueUndefined));
      }),
      (e.$$.update = () => {
        2068 & e.$$.dirty &&
          ("file" === d
            ? (delete C.value, i(4, C), i(2, d), i(11, p))
            : i(4, (C.value = null == p ? "" : p), C));
      }),
      [
        l,
        c,
        d,
        u,
        C,
        E,
        A,
        s,
        _,
        function (e) {
          ("file" !== d && "range" !== d) || _(e),
            i(13, ($ = !0)),
            v && i(14, (I = E.matches(":invalid")));
        },
        r,
        p,
        g,
        $,
        I,
        v,
        b,
        y,
        function (e) {
          var t;
          return e in A
            ? null !== (t = A[e]) && void 0 !== t
              ? t
              : null
            : S().getAttribute(e);
        },
        function (e, t) {
          A[e] !== t && i(6, (A[e] = t), A);
        },
        function (e) {
          (e in A && null == A[e]) || i(6, (A[e] = void 0), A);
        },
        function () {
          S().focus();
        },
        function () {
          S().blur();
        },
        S,
        function (t) {
          B.call(this, e, t);
        },
        function (t) {
          B.call(this, e, t);
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (E = e), i(5, E);
          });
        },
        (e) => "file" !== d && _(e),
      ]
    );
  }
  class Ai extends he {
    constructor(e) {
      super(),
        me(this, e, yi, Ei, s, {
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
  function Ci(n) {
    let i,
      s,
      o,
      l,
      c,
      d,
      u = [
        { class: (s = ze({ [n[2]]: !0, "mdc-text-field__input": !0 })) },
        { style: (o = `${n[4] ? "" : "resize: none; "}${n[3]}`) },
        n[6],
        n[9],
      ],
      p = {};
    for (let e = 0; e < u.length; e += 1) p = t(p, u[e]);
    return {
      c() {
        (i = y("textarea")), O(i, p);
      },
      m(e, t) {
        v(e, i, t),
          i.autofocus && i.focus(),
          n[21](i),
          D(i, n[0]),
          c ||
            ((d = [
              $((l = Qe.call(null, i, n[1]))),
              $(n[7].call(null, i)),
              T(i, "change", n[8]),
              T(i, "blur", n[19]),
              T(i, "focus", n[20]),
              T(i, "input", n[22]),
            ]),
            (c = !0));
      },
      p(e, [t]) {
        O(
          i,
          (p = le(u, [
            4 & t &&
              s !== (s = ze({ [e[2]]: !0, "mdc-text-field__input": !0 })) && {
                class: s,
              },
            24 & t &&
              o !== (o = `${e[4] ? "" : "resize: none; "}${e[3]}`) && {
                style: o,
              },
            64 & t && e[6],
            512 & t && e[9],
          ]))
        ),
          l && r(l.update) && 2 & t && l.update.call(null, e[1]),
          1 & t && D(i, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && b(i), n[21](null), (c = !1), a(d);
      },
    };
  }
  function _i(e, n, i) {
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
    let r = m(n, a);
    const s = Xe(R());
    let o,
      { use: l = [] } = n,
      { class: c = "" } = n,
      { style: d = "" } = n,
      { value: u = "" } = n,
      { dirty: p = !1 } = n,
      { invalid: h = !1 } = n,
      { updateInvalid: g = !0 } = n,
      { resizable: $ = !0 } = n,
      I = {};
    function v() {
      return o;
    }
    return (
      F(() => {
        g && i(11, (h = o.matches(":invalid")));
      }),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(9, (r = m(n, a))),
          "use" in e && i(1, (l = e.use)),
          "class" in e && i(2, (c = e.class)),
          "style" in e && i(3, (d = e.style)),
          "value" in e && i(0, (u = e.value)),
          "dirty" in e && i(10, (p = e.dirty)),
          "invalid" in e && i(11, (h = e.invalid)),
          "updateInvalid" in e && i(12, (g = e.updateInvalid)),
          "resizable" in e && i(4, ($ = e.resizable));
      }),
      [
        u,
        l,
        c,
        d,
        $,
        o,
        I,
        s,
        function () {
          i(10, (p = !0)), g && i(11, (h = o.matches(":invalid")));
        },
        r,
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
          B.call(this, e, t);
        },
        function (t) {
          B.call(this, e, t);
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (o = e), i(5, o);
          });
        },
        function () {
          (u = this.value), i(0, u);
        },
      ]
    );
  }
  class Si extends he {
    constructor(e) {
      super(),
        me(this, e, _i, Ci, s, {
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
  const Ti = (e) => ({}),
    xi = (e) => ({}),
    Oi = (e) => ({}),
    Li = (e) => ({}),
    Di = (e) => ({}),
    Ni = (e) => ({}),
    Mi = (e) => ({}),
    wi = (e) => ({}),
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
    Yi = (e) => ({});
  function Qi(e) {
    let n, i, s, o, c, f, m, h, g, E, A, C, S, x;
    const L = e[51].label,
      D = l(L, e, e[90], Fi);
    s = new Qn({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [Ji] },
        $$scope: { ctx: e },
      },
    });
    const N = e[51].default,
      M = l(N, e, e[90], null);
    f = new Qn({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !1,
        $$slots: { default: [ea] },
        $$scope: { ctx: e },
      },
    });
    const w = e[51].ripple,
      R = l(w, e, e[90], Li);
    let F = [
        {
          class: (h = ze({
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
          style: (g = Object.entries(e[26]).map(ya).concat([e[10]]).join(" ")),
        },
        qe(e[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      k = {};
    for (let e = 0; e < F.length; e += 1) k = t(k, F[e]);
    return {
      c() {
        (n = y("div")),
          D && D.c(),
          (i = _()),
          ue(s.$$.fragment),
          (o = _()),
          M && M.c(),
          (c = _()),
          ue(f.$$.fragment),
          (m = _()),
          R && R.c(),
          O(n, k);
      },
      m(t, a) {
        v(t, n, a),
          D && D.m(n, null),
          I(n, i),
          pe(s, n, null),
          I(n, o),
          M && M.m(n, null),
          I(n, c),
          pe(f, n, null),
          I(n, m),
          R && R.m(n, null),
          e[80](n),
          (C = !0),
          S ||
            ((x = [
              $(
                (E = ti.call(null, n, {
                  ripple: e[11],
                  unbounded: !1,
                  addClass: e[38],
                  removeClass: e[39],
                  addStyle: e[40],
                }))
              ),
              $((A = Qe.call(null, n, e[8]))),
              $(e[34].call(null, n)),
              T(n, "SMUITextfieldLeadingIcon:mount", e[81]),
              T(n, "SMUITextfieldLeadingIcon:unmount", e[82]),
              T(n, "SMUITextfieldTrailingIcon:mount", e[83]),
              T(n, "SMUITextfieldTrailingIcon:unmount", e[84]),
            ]),
            (S = !0));
      },
      p(e, t) {
        D &&
          D.p &&
          (!C || 268435456 & t[2]) &&
          u(D, L, e, e[90], C ? d(L, e[90], t, Ri) : p(e[90]), Fi);
        const i = {};
        268435456 & t[2] && (i.$$scope = { dirty: t, ctx: e }),
          s.$set(i),
          M &&
            M.p &&
            (!C || 268435456 & t[2]) &&
            u(M, N, e, e[90], C ? d(N, e[90], t, null) : p(e[90]), null);
        const a = {};
        268435456 & t[2] && (a.$$scope = { dirty: t, ctx: e }),
          f.$set(a),
          R &&
            R.p &&
            (!C || 268435456 & t[2]) &&
            u(R, w, e, e[90], C ? d(w, e[90], t, Oi) : p(e[90]), Li),
          O(
            n,
            (k = le(F, [
              (!C ||
                ((33673730 & t[0]) | (2048 & t[1]) &&
                  h !==
                    (h = ze({
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
                      .map(ya)
                      .concat([e[10]])
                      .join(" ")))) && { style: g },
              1024 & t[1] &&
                qe(e[41], [
                  "input$",
                  "label$",
                  "ripple$",
                  "outline$",
                  "helperLine$",
                ]),
            ]))
          ),
          E &&
            r(E.update) &&
            2048 & t[0] &&
            E.update.call(null, {
              ripple: e[11],
              unbounded: !1,
              addClass: e[38],
              removeClass: e[39],
              addStyle: e[40],
            }),
          A && r(A.update) && 256 & t[0] && A.update.call(null, e[8]);
      },
      i(e) {
        C ||
          (re(D, e),
          re(s.$$.fragment, e),
          re(M, e),
          re(f.$$.fragment, e),
          re(R, e),
          (C = !0));
      },
      o(e) {
        se(D, e),
          se(s.$$.fragment, e),
          se(M, e),
          se(f.$$.fragment, e),
          se(R, e),
          (C = !1);
      },
      d(t) {
        t && b(n),
          D && D.d(t),
          fe(s),
          M && M.d(t),
          fe(f),
          R && R.d(t),
          e[80](null),
          (S = !1),
          a(x);
      },
    };
  }
  function Zi(e) {
    let n,
      i,
      s,
      o,
      c,
      f,
      m,
      h,
      g,
      E,
      A,
      C,
      S,
      x,
      L,
      D,
      N,
      M,
      w = !e[14] && "outlined" !== e[15] && ta(e),
      R = (e[14] || "outlined" === e[15]) && ra(e);
    o = new Qn({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [ca] },
        $$scope: { ctx: e },
      },
    });
    const F = e[51].default,
      k = l(F, e, e[90], null),
      U = [ua, da],
      P = [];
    function H(e, t) {
      return e[14] && "string" == typeof e[0] ? 0 : 1;
    }
    (m = H(e)),
      (h = P[m] = U[m](e)),
      (E = new Qn({
        props: {
          key: "SMUI:textfield:icon:leading",
          value: !1,
          $$slots: { default: [ga] },
          $$scope: { ctx: e },
        },
      }));
    let B = !e[14] && "outlined" !== e[15] && e[11] && $a(e),
      V = [
        {
          class: (C = ze({
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
          style: (S = Object.entries(e[26]).map(Ea).concat([e[10]]).join(" ")),
        },
        { for: void 0 },
        qe(e[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      j = {};
    for (let e = 0; e < V.length; e += 1) j = t(j, V[e]);
    return {
      c() {
        (n = y("label")),
          w && w.c(),
          (i = _()),
          R && R.c(),
          (s = _()),
          ue(o.$$.fragment),
          (c = _()),
          k && k.c(),
          (f = _()),
          h.c(),
          (g = _()),
          ue(E.$$.fragment),
          (A = _()),
          B && B.c(),
          O(n, j);
      },
      m(t, a) {
        v(t, n, a),
          w && w.m(n, null),
          I(n, i),
          R && R.m(n, null),
          I(n, s),
          pe(o, n, null),
          I(n, c),
          k && k.m(n, null),
          I(n, f),
          P[m].m(n, null),
          I(n, g),
          pe(E, n, null),
          I(n, A),
          B && B.m(n, null),
          e[73](n),
          (D = !0),
          N ||
            ((M = [
              $(
                (x = ti.call(null, n, {
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
              $((L = Qe.call(null, n, e[8]))),
              $(e[34].call(null, n)),
              T(n, "SMUITextfieldLeadingIcon:mount", e[74]),
              T(n, "SMUITextfieldLeadingIcon:unmount", e[75]),
              T(n, "SMUITextfieldTrailingIcon:mount", e[76]),
              T(n, "SMUITextfieldTrailingIcon:unmount", e[77]),
              T(n, "SMUITextfieldCharacterCounter:mount", e[78]),
              T(n, "SMUITextfieldCharacterCounter:unmount", e[79]),
            ]),
            (N = !0));
      },
      p(e, t) {
        e[14] || "outlined" === e[15]
          ? w &&
            (ie(),
            se(w, 1, 1, () => {
              w = null;
            }),
            ae())
          : w
          ? (w.p(e, t), 49152 & t[0] && re(w, 1))
          : ((w = ta(e)), w.c(), re(w, 1), w.m(n, i)),
          e[14] || "outlined" === e[15]
            ? R
              ? (R.p(e, t), 49152 & t[0] && re(R, 1))
              : ((R = ra(e)), R.c(), re(R, 1), R.m(n, s))
            : R &&
              (ie(),
              se(R, 1, 1, () => {
                R = null;
              }),
              ae());
        const a = {};
        268435456 & t[2] && (a.$$scope = { dirty: t, ctx: e }),
          o.$set(a),
          k &&
            k.p &&
            (!D || 268435456 & t[2]) &&
            u(k, F, e, e[90], D ? d(F, e[90], t, null) : p(e[90]), null);
        let l = m;
        (m = H(e)),
          m === l
            ? P[m].p(e, t)
            : (ie(),
              se(P[l], 1, 1, () => {
                P[l] = null;
              }),
              ae(),
              (h = P[m]),
              h ? h.p(e, t) : ((h = P[m] = U[m](e)), h.c()),
              re(h, 1),
              h.m(n, g));
        const c = {};
        268435456 & t[2] && (c.$$scope = { dirty: t, ctx: e }),
          E.$set(c),
          !e[14] && "outlined" !== e[15] && e[11]
            ? B
              ? (B.p(e, t), 51200 & t[0] && re(B, 1))
              : ((B = $a(e)), B.c(), re(B, 1), B.m(n, null))
            : B &&
              (ie(),
              se(B, 1, 1, () => {
                B = null;
              }),
              ae()),
          O(
            n,
            (j = le(V, [
              (!D ||
                ((314823171 & t[0]) | (2048 & t[1]) &&
                  C !==
                    (C = ze({
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
              (!D ||
                (67109888 & t[0] &&
                  S !==
                    (S = Object.entries(e[26])
                      .map(Ea)
                      .concat([e[10]])
                      .join(" ")))) && { style: S },
              { for: void 0 },
              1024 & t[1] &&
                qe(e[41], [
                  "input$",
                  "label$",
                  "ripple$",
                  "outline$",
                  "helperLine$",
                ]),
            ]))
          ),
          x &&
            r(x.update) &&
            (49152 & t[0]) | (4 & t[1]) &&
            x.update.call(null, {
              ripple: !e[14] && "filled" === e[15],
              unbounded: !1,
              addClass: e[38],
              removeClass: e[39],
              addStyle: e[40],
              eventTarget: e[33],
              activeTarget: e[33],
              initPromise: e[37],
            }),
          L && r(L.update) && 256 & t[0] && L.update.call(null, e[8]);
      },
      i(e) {
        D ||
          (re(w),
          re(R),
          re(o.$$.fragment, e),
          re(k, e),
          re(h),
          re(E.$$.fragment, e),
          re(B),
          (D = !0));
      },
      o(e) {
        se(w),
          se(R),
          se(o.$$.fragment, e),
          se(k, e),
          se(h),
          se(E.$$.fragment, e),
          se(B),
          (D = !1);
      },
      d(t) {
        t && b(n),
          w && w.d(),
          R && R.d(),
          fe(o),
          k && k.d(t),
          P[m].d(),
          fe(E),
          B && B.d(),
          e[73](null),
          (N = !1),
          a(M);
      },
    };
  }
  function Ji(e) {
    let t;
    const n = e[51].leadingIcon,
      i = l(n, e, e[90], wi);
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
          u(i, n, e, e[90], t ? d(n, e[90], a, Mi) : p(e[90]), wi);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function ea(e) {
    let t;
    const n = e[51].trailingIcon,
      i = l(n, e, e[90], Ni);
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
          u(i, n, e, e[90], t ? d(n, e[90], a, Di) : p(e[90]), Ni);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function ta(e) {
    let t,
      n,
      i,
      a = "filled" === e[15] && na(),
      r = !e[16] && (null != e[17] || e[42].label) && ia(e);
    return {
      c() {
        a && a.c(), (t = _()), r && r.c(), (n = S());
      },
      m(e, s) {
        a && a.m(e, s), v(e, t, s), r && r.m(e, s), v(e, n, s), (i = !0);
      },
      p(e, i) {
        "filled" === e[15]
          ? a || ((a = na()), a.c(), a.m(t.parentNode, t))
          : a && (a.d(1), (a = null)),
          e[16] || (null == e[17] && !e[42].label)
            ? r &&
              (ie(),
              se(r, 1, 1, () => {
                r = null;
              }),
              ae())
            : r
            ? (r.p(e, i), (196608 & i[0]) | (2048 & i[1]) && re(r, 1))
            : ((r = ia(e)), r.c(), re(r, 1), r.m(n.parentNode, n));
      },
      i(e) {
        i || (re(r), (i = !0));
      },
      o(e) {
        se(r), (i = !1);
      },
      d(e) {
        a && a.d(e), e && b(t), r && r.d(e), e && b(n);
      },
    };
  }
  function na(e) {
    let t;
    return {
      c() {
        (t = y("span")), x(t, "class", "mdc-text-field__ripple");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function ia(e) {
    let n, i;
    const a = [
      { floatAbove: e[28] || (null != e[0] && "" !== e[0]) },
      { required: e[13] },
      { wrapped: !0 },
      Ye(e[41], "label$"),
    ];
    let r = { $$slots: { default: [aa] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new li({ props: r })),
      e[52](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (268443649 & t[0]) | (1024 & t[1])
              ? le(a, [
                  268435457 & t[0] && {
                    floatAbove: e[28] || (null != e[0] && "" !== e[0]),
                  },
                  8192 & t[0] && { required: e[13] },
                  a[2],
                  1024 & t[1] && ce(Ye(e[41], "label$")),
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
          se(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[52](null), fe(n, t);
        },
      }
    );
  }
  function aa(e) {
    let t,
      n,
      i = (null == e[17] ? "" : e[17]) + "";
    const a = e[51].label,
      r = l(a, e, e[90], Yi);
    return {
      c() {
        (t = C(i)), r && r.c();
      },
      m(e, i) {
        v(e, t, i), r && r.m(e, i), (n = !0);
      },
      p(e, s) {
        (!n || 131072 & s[0]) &&
          i !== (i = (null == e[17] ? "" : e[17]) + "") &&
          L(t, i),
          r &&
            r.p &&
            (!n || 268435456 & s[2]) &&
            u(r, a, e, e[90], n ? d(a, e[90], s, Xi) : p(e[90]), Yi);
      },
      i(e) {
        n || (re(r, e), (n = !0));
      },
      o(e) {
        se(r, e), (n = !1);
      },
      d(e) {
        e && b(t), r && r.d(e);
      },
    };
  }
  function ra(e) {
    let n, i;
    const a = [
      { noLabel: e[16] || (null == e[17] && !e[42].label) },
      Ye(e[41], "outline$"),
    ];
    let r = { $$slots: { default: [la] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new $i({ props: r })),
      e[54](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (196608 & t[0]) | (3072 & t[1])
              ? le(a, [
                  (196608 & t[0]) | (2048 & t[1]) && {
                    noLabel: e[16] || (null == e[17] && !e[42].label),
                  },
                  1024 & t[1] && ce(Ye(e[41], "outline$")),
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
          se(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[54](null), fe(n, t);
        },
      }
    );
  }
  function sa(e) {
    let n, i;
    const a = [
      { floatAbove: e[28] || (null != e[0] && "" !== e[0]) },
      { required: e[13] },
      { wrapped: !0 },
      Ye(e[41], "label$"),
    ];
    let r = { $$slots: { default: [oa] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new li({ props: r })),
      e[53](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (268443649 & t[0]) | (1024 & t[1])
              ? le(a, [
                  268435457 & t[0] && {
                    floatAbove: e[28] || (null != e[0] && "" !== e[0]),
                  },
                  8192 & t[0] && { required: e[13] },
                  a[2],
                  1024 & t[1] && ce(Ye(e[41], "label$")),
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
          se(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[53](null), fe(n, t);
        },
      }
    );
  }
  function oa(e) {
    let t,
      n,
      i = (null == e[17] ? "" : e[17]) + "";
    const a = e[51].label,
      r = l(a, e, e[90], Wi);
    return {
      c() {
        (t = C(i)), r && r.c();
      },
      m(e, i) {
        v(e, t, i), r && r.m(e, i), (n = !0);
      },
      p(e, s) {
        (!n || 131072 & s[0]) &&
          i !== (i = (null == e[17] ? "" : e[17]) + "") &&
          L(t, i),
          r &&
            r.p &&
            (!n || 268435456 & s[2]) &&
            u(r, a, e, e[90], n ? d(a, e[90], s, Ki) : p(e[90]), Wi);
      },
      i(e) {
        n || (re(r, e), (n = !0));
      },
      o(e) {
        se(r, e), (n = !1);
      },
      d(e) {
        e && b(t), r && r.d(e);
      },
    };
  }
  function la(e) {
    let t,
      n,
      i = !e[16] && (null != e[17] || e[42].label) && sa(e);
    return {
      c() {
        i && i.c(), (t = S());
      },
      m(e, a) {
        i && i.m(e, a), v(e, t, a), (n = !0);
      },
      p(e, n) {
        e[16] || (null == e[17] && !e[42].label)
          ? i &&
            (ie(),
            se(i, 1, 1, () => {
              i = null;
            }),
            ae())
          : i
          ? (i.p(e, n), (196608 & n[0]) | (2048 & n[1]) && re(i, 1))
          : ((i = sa(e)), i.c(), re(i, 1), i.m(t.parentNode, t));
      },
      i(e) {
        n || (re(i), (n = !0));
      },
      o(e) {
        se(i), (n = !1);
      },
      d(e) {
        i && i.d(e), e && b(t);
      },
    };
  }
  function ca(e) {
    let t;
    const n = e[51].leadingIcon,
      i = l(n, e, e[90], qi);
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
          u(i, n, e, e[90], t ? d(n, e[90], a, Gi) : p(e[90]), qi);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function da(e) {
    let n, i, a, r, s, o, c, f, m, h;
    const g = e[51].prefix,
      $ = l(g, e, e[90], Vi);
    let I = null != e[20] && pa(e);
    const E = [
      { type: e[18] },
      { disabled: e[12] },
      { required: e[13] },
      { updateInvalid: e[19] },
      { "aria-controls": e[27] },
      { "aria-describedby": e[27] },
      e[16] && null != e[17] ? { placeholder: e[17] } : {},
      Ye(e[41], "input$"),
    ];
    function y(t) {
      e[64](t);
    }
    function A(t) {
      e[65](t);
    }
    function C(t) {
      e[66](t);
    }
    function S(t) {
      e[67](t);
    }
    let T = {};
    for (let e = 0; e < E.length; e += 1) T = t(T, E[e]);
    void 0 !== e[0] && (T.value = e[0]),
      void 0 !== e[3] && (T.files = e[3]),
      void 0 !== e[4] && (T.dirty = e[4]),
      void 0 !== e[1] && (T.invalid = e[1]),
      (a = new Ai({ props: T })),
      e[63](a),
      j.push(() => de(a, "value", y)),
      j.push(() => de(a, "files", A)),
      j.push(() => de(a, "dirty", C)),
      j.push(() => de(a, "invalid", S)),
      a.$on("blur", e[68]),
      a.$on("focus", e[69]),
      a.$on("blur", e[70]),
      a.$on("focus", e[71]);
    let x = null != e[21] && ma(e);
    const O = e[51].suffix,
      L = l(O, e, e[90], Hi);
    return {
      c() {
        $ && $.c(),
          (n = _()),
          I && I.c(),
          (i = _()),
          ue(a.$$.fragment),
          (f = _()),
          x && x.c(),
          (m = _()),
          L && L.c();
      },
      m(e, t) {
        $ && $.m(e, t),
          v(e, n, t),
          I && I.m(e, t),
          v(e, i, t),
          pe(a, e, t),
          v(e, f, t),
          x && x.m(e, t),
          v(e, m, t),
          L && L.m(e, t),
          (h = !0);
      },
      p(e, t) {
        $ &&
          $.p &&
          (!h || 268435456 & t[2]) &&
          u($, g, e, e[90], h ? d(g, e[90], t, Bi) : p(e[90]), Vi),
          null != e[20]
            ? I
              ? (I.p(e, t), 1048576 & t[0] && re(I, 1))
              : ((I = pa(e)), I.c(), re(I, 1), I.m(i.parentNode, i))
            : I &&
              (ie(),
              se(I, 1, 1, () => {
                I = null;
              }),
              ae());
        const n =
          (135213056 & t[0]) | (1024 & t[1])
            ? le(E, [
                262144 & t[0] && { type: e[18] },
                4096 & t[0] && { disabled: e[12] },
                8192 & t[0] && { required: e[13] },
                524288 & t[0] && { updateInvalid: e[19] },
                134217728 & t[0] && { "aria-controls": e[27] },
                134217728 & t[0] && { "aria-describedby": e[27] },
                196608 & t[0] &&
                  ce(e[16] && null != e[17] ? { placeholder: e[17] } : {}),
                1024 & t[1] && ce(Ye(e[41], "input$")),
              ])
            : {};
        !r && 1 & t[0] && ((r = !0), (n.value = e[0]), Y(() => (r = !1))),
          !s && 8 & t[0] && ((s = !0), (n.files = e[3]), Y(() => (s = !1))),
          !o && 16 & t[0] && ((o = !0), (n.dirty = e[4]), Y(() => (o = !1))),
          !c && 2 & t[0] && ((c = !0), (n.invalid = e[1]), Y(() => (c = !1))),
          a.$set(n),
          null != e[21]
            ? x
              ? (x.p(e, t), 2097152 & t[0] && re(x, 1))
              : ((x = ma(e)), x.c(), re(x, 1), x.m(m.parentNode, m))
            : x &&
              (ie(),
              se(x, 1, 1, () => {
                x = null;
              }),
              ae()),
          L &&
            L.p &&
            (!h || 268435456 & t[2]) &&
            u(L, O, e, e[90], h ? d(O, e[90], t, Pi) : p(e[90]), Hi);
      },
      i(e) {
        h || (re($, e), re(I), re(a.$$.fragment, e), re(x), re(L, e), (h = !0));
      },
      o(e) {
        se($, e), se(I), se(a.$$.fragment, e), se(x), se(L, e), (h = !1);
      },
      d(t) {
        $ && $.d(t),
          t && b(n),
          I && I.d(t),
          t && b(i),
          e[63](null),
          fe(a, t),
          t && b(f),
          x && x.d(t),
          t && b(m),
          L && L.d(t);
      },
    };
  }
  function ua(e) {
    let n, i, a, r, s, o, c, f;
    const m = [
      { disabled: e[12] },
      { required: e[13] },
      { updateInvalid: e[19] },
      { "aria-controls": e[27] },
      { "aria-describedby": e[27] },
      Ye(e[41], "input$"),
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
    let E = {};
    for (let e = 0; e < m.length; e += 1) E = t(E, m[e]);
    void 0 !== e[0] && (E.value = e[0]),
      void 0 !== e[4] && (E.dirty = e[4]),
      void 0 !== e[1] && (E.invalid = e[1]),
      (i = new Si({ props: E })),
      e[55](i),
      j.push(() => de(i, "value", h)),
      j.push(() => de(i, "dirty", g)),
      j.push(() => de(i, "invalid", $)),
      i.$on("blur", e[59]),
      i.$on("focus", e[60]),
      i.$on("blur", e[61]),
      i.$on("focus", e[62]);
    const A = e[51].internalCounter,
      C = l(A, e, e[90], zi);
    return {
      c() {
        (n = y("span")),
          ue(i.$$.fragment),
          (o = _()),
          C && C.c(),
          x(
            n,
            "class",
            (c = ze({
              "mdc-text-field__resizer":
                !("input$resizable" in e[41]) || e[41].input$resizable,
            }))
          );
      },
      m(e, t) {
        v(e, n, t), pe(i, n, null), I(n, o), C && C.m(n, null), (f = !0);
      },
      p(e, t) {
        const o =
          (134754304 & t[0]) | (1024 & t[1])
            ? le(m, [
                4096 & t[0] && { disabled: e[12] },
                8192 & t[0] && { required: e[13] },
                524288 & t[0] && { updateInvalid: e[19] },
                134217728 & t[0] && { "aria-controls": e[27] },
                134217728 & t[0] && { "aria-describedby": e[27] },
                1024 & t[1] && ce(Ye(e[41], "input$")),
              ])
            : {};
        !a && 1 & t[0] && ((a = !0), (o.value = e[0]), Y(() => (a = !1))),
          !r && 16 & t[0] && ((r = !0), (o.dirty = e[4]), Y(() => (r = !1))),
          !s && 2 & t[0] && ((s = !0), (o.invalid = e[1]), Y(() => (s = !1))),
          i.$set(o),
          C &&
            C.p &&
            (!f || 268435456 & t[2]) &&
            u(C, A, e, e[90], f ? d(A, e[90], t, ji) : p(e[90]), zi),
          (!f ||
            (1024 & t[1] &&
              c !==
                (c = ze({
                  "mdc-text-field__resizer":
                    !("input$resizable" in e[41]) || e[41].input$resizable,
                })))) &&
            x(n, "class", c);
      },
      i(e) {
        f || (re(i.$$.fragment, e), re(C, e), (f = !0));
      },
      o(e) {
        se(i.$$.fragment, e), se(C, e), (f = !1);
      },
      d(t) {
        t && b(n), e[55](null), fe(i), C && C.d(t);
      },
    };
  }
  function pa(e) {
    let t, n;
    return (
      (t = new vi({
        props: { $$slots: { default: [fa] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
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
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function fa(e) {
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
  function ma(e) {
    let t, n;
    return (
      (t = new bi({
        props: { $$slots: { default: [ha] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
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
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function ha(e) {
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
  function ga(e) {
    let t;
    const n = e[51].trailingIcon,
      i = l(n, e, e[90], Ui);
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
          u(i, n, e, e[90], t ? d(n, e[90], a, ki) : p(e[90]), Ui);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function $a(e) {
    let n, i;
    const a = [Ye(e[41], "ripple$")];
    let r = {};
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new pi({ props: r })),
      e[72](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i = 1024 & t[1] ? le(a, [ce(Ye(e[41], "ripple$"))]) : {};
          n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          se(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[72](null), fe(n, t);
        },
      }
    );
  }
  function Ia(e) {
    let n, i;
    const a = [Ye(e[41], "helperLine$")];
    let r = { $$slots: { default: [va] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new Ii({ props: r })),
      n.$on("SMUITextfieldHelperText:id", e[85]),
      n.$on("SMUITextfieldHelperText:mount", e[86]),
      n.$on("SMUITextfieldHelperText:unmount", e[87]),
      n.$on("SMUITextfieldCharacterCounter:mount", e[88]),
      n.$on("SMUITextfieldCharacterCounter:unmount", e[89]),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i = 1024 & t[1] ? le(a, [ce(Ye(e[41], "helperLine$"))]) : {};
          268435456 & t[2] && (i.$$scope = { dirty: t, ctx: e }), n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          se(n.$$.fragment, e), (i = !1);
        },
        d(e) {
          fe(n, e);
        },
      }
    );
  }
  function va(e) {
    let t;
    const n = e[51].helper,
      i = l(n, e, e[90], xi);
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
          u(i, n, e, e[90], t ? d(n, e[90], a, Ti) : p(e[90]), xi);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function ba(e) {
    let t, n, i, a, r;
    const s = [Zi, Qi],
      o = [];
    (t = (function (e, t) {
      return e[36] ? 0 : 1;
    })(e)),
      (n = o[t] = s[t](e));
    let l = e[42].helper && Ia(e);
    return {
      c() {
        n.c(), (i = _()), l && l.c(), (a = S());
      },
      m(e, n) {
        o[t].m(e, n), v(e, i, n), l && l.m(e, n), v(e, a, n), (r = !0);
      },
      p(e, t) {
        n.p(e, t),
          e[42].helper
            ? l
              ? (l.p(e, t), 2048 & t[1] && re(l, 1))
              : ((l = Ia(e)), l.c(), re(l, 1), l.m(a.parentNode, a))
            : l &&
              (ie(),
              se(l, 1, 1, () => {
                l = null;
              }),
              ae());
      },
      i(e) {
        r || (re(n), re(l), (r = !0));
      },
      o(e) {
        se(n), se(l), (r = !1);
      },
      d(e) {
        o[t].d(e), e && b(i), l && l.d(e), e && b(a);
      },
    };
  }
  const Ea = ([e, t]) => `${e}: ${t};`,
    ya = ([e, t]) => `${e}: ${t};`;
  function Aa(e, n, i) {
    let a;
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
    let s = m(n, r),
      { $$slots: o = {}, $$scope: l } = n;
    const c = h(o),
      { applyPassive: d } = Ce,
      u = Xe(R());
    let p = () => {};
    function g(e) {
      return e === p;
    }
    let { use: $ = [] } = n,
      { class: I = "" } = n,
      { style: v = "" } = n,
      { ripple: b = !0 } = n,
      { disabled: E = !1 } = n,
      { required: y = !1 } = n,
      { textarea: A = !1 } = n,
      { variant: C = A ? "outlined" : "standard" } = n,
      { noLabel: _ = !1 } = n,
      { label: S } = n,
      { type: T = "text" } = n,
      { value: x = s.input$emptyValueUndefined ? void 0 : p } = n,
      { files: O = p } = n;
    const L = !g(x) || !g(O);
    g(x) && (x = void 0), g(O) && (O = null);
    let { invalid: D = p } = n,
      { updateInvalid: N = g(D) } = n;
    g(D) && (D = !1);
    let M,
      w,
      U,
      P,
      B,
      V,
      z,
      G,
      K,
      { dirty: X = !1 } = n,
      { prefix: Y } = n,
      { suffix: Q } = n,
      { validateOnValueChange: Z = N } = n,
      { useNativeValidation: J = N } = n,
      { withLeadingIcon: ee = p } = n,
      { withTrailingIcon: te = p } = n,
      { input: ne } = n,
      { floatingLabel: ie } = n,
      { lineRipple: ae } = n,
      { notchedOutline: re } = n,
      se = {},
      oe = {},
      le = !1,
      ce = H("SMUI:addLayoutListener"),
      de = new Promise((e) => (B = e)),
      ue = x;
    function pe(e) {
      var t;
      return e in se
        ? null !== (t = se[e]) && void 0 !== t
          ? t
          : null
        : ge().classList.contains(e);
    }
    function fe(e) {
      se[e] || i(25, (se[e] = !0), se);
    }
    function me(e) {
      (e in se && !se[e]) || i(25, (se[e] = !1), se);
    }
    function he() {
      if (w) {
        const e = w.shouldFloat;
        w.notchOutline(e);
      }
    }
    function ge() {
      return M;
    }
    ce && (P = ce(he)),
      F(() => {
        if (
          (i(
            49,
            (w = new cn(
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
                      J &&
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
                  null == ne || ne.getElement().addEventListener(e, t, d());
                },
                deregisterInputInteractionHandler: (e, t) => {
                  null == ne || ne.getElement().removeEventListener(e, t, d());
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
                closeOutline: () => re && re.closeNotch(),
                hasOutline: () => !!re,
                notchOutline: (e) => re && re.notch(e),
              },
              {
                get helperText() {
                  return G;
                },
                get characterCounter() {
                  return K;
                },
                get leadingIcon() {
                  return V;
                },
                get trailingIcon() {
                  return z;
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
          w.init();
        } else
          (W(), q).then(() => {
            if (null == ne)
              throw new Error(
                "SMUI Textfield initialized without Input component."
              );
            w.init();
          });
        return (
          B(),
          () => {
            w.destroy();
          }
        );
      }),
      k(() => {
        P && P();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(41, (s = m(n, r))),
          "use" in e && i(8, ($ = e.use)),
          "class" in e && i(9, (I = e.class)),
          "style" in e && i(10, (v = e.style)),
          "ripple" in e && i(11, (b = e.ripple)),
          "disabled" in e && i(12, (E = e.disabled)),
          "required" in e && i(13, (y = e.required)),
          "textarea" in e && i(14, (A = e.textarea)),
          "variant" in e && i(15, (C = e.variant)),
          "noLabel" in e && i(16, (_ = e.noLabel)),
          "label" in e && i(17, (S = e.label)),
          "type" in e && i(18, (T = e.type)),
          "value" in e && i(0, (x = e.value)),
          "files" in e && i(3, (O = e.files)),
          "invalid" in e && i(1, (D = e.invalid)),
          "updateInvalid" in e && i(19, (N = e.updateInvalid)),
          "dirty" in e && i(4, (X = e.dirty)),
          "prefix" in e && i(20, (Y = e.prefix)),
          "suffix" in e && i(21, (Q = e.suffix)),
          "validateOnValueChange" in e && i(43, (Z = e.validateOnValueChange)),
          "useNativeValidation" in e && i(44, (J = e.useNativeValidation)),
          "withLeadingIcon" in e && i(22, (ee = e.withLeadingIcon)),
          "withTrailingIcon" in e && i(23, (te = e.withTrailingIcon)),
          "input" in e && i(2, (ne = e.input)),
          "floatingLabel" in e && i(5, (ie = e.floatingLabel)),
          "lineRipple" in e && i(6, (ae = e.lineRipple)),
          "notchedOutline" in e && i(7, (re = e.notchedOutline)),
          "$$scope" in e && i(90, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        if (
          (4 & e.$$.dirty[0] && i(33, (a = ne && ne.getElement())),
          (524290 & e.$$.dirty[0]) | (262144 & e.$$.dirty[1]) &&
            w &&
            w.isValid() !== !D &&
            (N ? i(1, (D = !w.isValid())) : w.setValid(!D)),
          266240 & e.$$.dirty[1] &&
            w &&
            w.getValidateOnValueChange() !== Z &&
            w.setValidateOnValueChange(!g(Z) && Z),
          270336 & e.$$.dirty[1] && w && w.setUseNativeValidation(!!g(J) || J),
          (4096 & e.$$.dirty[0]) | (262144 & e.$$.dirty[1]) &&
            w &&
            w.setDisabled(E),
          (1 & e.$$.dirty[0]) | (786432 & e.$$.dirty[1]) && w && L && ue !== x)
        ) {
          i(50, (ue = x));
          const e = `${x}`;
          w.getValue() !== e && w.setValue(e);
        }
      }),
      [
        x,
        D,
        ne,
        O,
        X,
        ie,
        ae,
        re,
        $,
        I,
        v,
        b,
        E,
        y,
        A,
        C,
        _,
        S,
        T,
        N,
        Y,
        Q,
        ee,
        te,
        M,
        se,
        oe,
        U,
        le,
        V,
        z,
        G,
        K,
        a,
        u,
        g,
        L,
        de,
        fe,
        me,
        function (e, t) {
          oe[e] != t &&
            ("" === t || null == t
              ? (delete oe[e], i(26, oe))
              : i(26, (oe[e] = t), oe));
        },
        s,
        c,
        Z,
        J,
        function () {
          null == ne || ne.focus();
        },
        function () {
          null == ne || ne.blur();
        },
        he,
        ge,
        w,
        ue,
        o,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (ie = e), i(5, ie);
          });
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (ie = e), i(5, ie);
          });
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (re = e), i(7, re);
          });
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (ne = e), i(2, ne);
          });
        },
        function (e) {
          (x = e), i(0, x);
        },
        function (e) {
          (X = e), i(4, X);
        },
        function (e) {
          (D = e), i(1, D), i(49, w), i(19, N);
        },
        () => i(28, (le = !1)),
        () => i(28, (le = !0)),
        (e) => Ge(M, "blur", e),
        (e) => Ge(M, "focus", e),
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (ne = e), i(2, ne);
          });
        },
        function (e) {
          (x = e), i(0, x);
        },
        function (e) {
          (O = e), i(3, O);
        },
        function (e) {
          (X = e), i(4, X);
        },
        function (e) {
          (D = e), i(1, D), i(49, w), i(19, N);
        },
        () => i(28, (le = !1)),
        () => i(28, (le = !0)),
        (e) => Ge(M, "blur", e),
        (e) => Ge(M, "focus", e),
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (ae = e), i(6, ae);
          });
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (M = e), i(24, M);
          });
        },
        (e) => i(29, (V = e.detail)),
        () => i(29, (V = void 0)),
        (e) => i(30, (z = e.detail)),
        () => i(30, (z = void 0)),
        (e) => i(32, (K = e.detail)),
        () => i(32, (K = void 0)),
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (M = e), i(24, M);
          });
        },
        (e) => i(29, (V = e.detail)),
        () => i(29, (V = void 0)),
        (e) => i(30, (z = e.detail)),
        () => i(30, (z = void 0)),
        (e) => i(27, (U = e.detail)),
        (e) => i(31, (G = e.detail)),
        () => {
          i(27, (U = void 0)), i(31, (G = void 0));
        },
        (e) => i(32, (K = e.detail)),
        () => i(32, (K = void 0)),
        l,
      ]
    );
  }
  class Ca extends he {
    constructor(e) {
      super(),
        me(
          this,
          e,
          Aa,
          ba,
          s,
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
   */ var _a = {
      ICON_BUTTON_ON: "mdc-icon-button--on",
      ROOT: "mdc-icon-button",
    },
    Sa = {
      ARIA_LABEL: "aria-label",
      ARIA_PRESSED: "aria-pressed",
      DATA_ARIA_LABEL_OFF: "data-aria-label-off",
      DATA_ARIA_LABEL_ON: "data-aria-label-on",
      CHANGE_EVENT: "MDCIconButtonToggle:change",
    },
    Ta = (function (e) {
      function t(n) {
        var i = e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
        return (i.hasToggledAriaLabel = !1), i;
      }
      return (
        $e(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return _a;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Sa;
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
          var e = this.adapter.getAttr(Sa.DATA_ARIA_LABEL_ON),
            t = this.adapter.getAttr(Sa.DATA_ARIA_LABEL_OFF);
          if (e && t) {
            if (null !== this.adapter.getAttr(Sa.ARIA_PRESSED))
              throw new Error(
                "MDCIconButtonToggleFoundation: Button should not set `aria-pressed` if it has a toggled aria label."
              );
            this.hasToggledAriaLabel = !0;
          } else this.adapter.setAttr(Sa.ARIA_PRESSED, String(this.isOn()));
        }),
        (t.prototype.handleClick = function () {
          this.toggle(), this.adapter.notifyChange({ isOn: this.isOn() });
        }),
        (t.prototype.isOn = function () {
          return this.adapter.hasClass(_a.ICON_BUTTON_ON);
        }),
        (t.prototype.toggle = function (e) {
          if (
            (void 0 === e && (e = !this.isOn()),
            e
              ? this.adapter.addClass(_a.ICON_BUTTON_ON)
              : this.adapter.removeClass(_a.ICON_BUTTON_ON),
            this.hasToggledAriaLabel)
          ) {
            var t = e
              ? this.adapter.getAttr(Sa.DATA_ARIA_LABEL_ON)
              : this.adapter.getAttr(Sa.DATA_ARIA_LABEL_OFF);
            this.adapter.setAttr(Sa.ARIA_LABEL, t || "");
          } else this.adapter.setAttr(Sa.ARIA_PRESSED, "" + e);
        }),
        t
      );
    })(Ae);
  function xa(e) {
    let t;
    return {
      c() {
        (t = y("div")), x(t, "class", "mdc-icon-button__touch");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Oa(e) {
    let t, n, i, a;
    const r = e[32].default,
      s = l(r, e, e[36], null);
    let o = e[8] && xa();
    return {
      c() {
        (t = y("div")),
          (n = _()),
          s && s.c(),
          o && o.c(),
          (i = S()),
          x(t, "class", "mdc-icon-button__ripple");
      },
      m(e, r) {
        v(e, t, r),
          v(e, n, r),
          s && s.m(e, r),
          o && o.m(e, r),
          v(e, i, r),
          (a = !0);
      },
      p(e, t) {
        s &&
          s.p &&
          (!a || 32 & t[1]) &&
          u(s, r, e, e[36], a ? d(r, e[36], t, null) : p(e[36]), null),
          e[8]
            ? o || ((o = xa()), o.c(), o.m(i.parentNode, i))
            : o && (o.d(1), (o = null));
      },
      i(e) {
        a || (re(s, e), (a = !0));
      },
      o(e) {
        se(s, e), (a = !1);
      },
      d(e) {
        e && b(t), e && b(n), s && s.d(e), o && o.d(e), e && b(i);
      },
    };
  }
  function La(e) {
    let n, i, a;
    const r = [
      {
        use: [
          [
            ti,
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
        class: ze({
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
      { style: Object.entries(e[18]).map(Da).concat([e[3]]).join(" ") },
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
    var s = e[13];
    function o(e) {
      let n = { $$slots: { default: [Oa] }, $$scope: { ctx: e } };
      for (let e = 0; e < r.length; e += 1) n = t(n, r[e]);
      return { props: n };
    }
    return (
      s &&
        ((n = new s(o(e))),
        e[33](n),
        n.$on("click", e[34]),
        n.$on("click", e[35])),
      {
        c() {
          n && ue(n.$$.fragment), (i = S());
        },
        m(e, t) {
          n && pe(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, t) {
          const a =
            536748031 & t[0]
              ? le(r, [
                  505413682 & t[0] && {
                    use: [
                      [
                        ti,
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
                    class: ze({
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
                      .map(Da)
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
                  1048576 & t[0] && ce(e[20]),
                  524288 & t[0] && ce(e[19]),
                  268435456 & t[0] && ce(e[28]),
                ])
              : {};
          if (
            ((256 & t[0]) | (32 & t[1]) && (a.$$scope = { dirty: t, ctx: e }),
            s !== (s = e[13]))
          ) {
            if (n) {
              ie();
              const e = n;
              se(e.$$.fragment, 1, 0, () => {
                fe(e, 1);
              }),
                ae();
            }
            s
              ? ((n = new s(o(e))),
                e[33](n),
                n.$on("click", e[34]),
                n.$on("click", e[35]),
                ue(n.$$.fragment),
                re(n.$$.fragment, 1),
                pe(n, i.parentNode, i))
              : (n = null);
          } else s && n.$set(a);
        },
        i(e) {
          a || (n && re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && se(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[33](null), t && b(i), n && fe(n, t);
        },
      }
    );
  }
  const Da = ([e, t]) => `${e}: ${t};`;
  function Na(e, n, i) {
    let a;
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
    let s = m(n, r),
      { $$slots: o = {}, $$scope: l } = n;
    const c = Xe(R());
    let d = () => {};
    function u(e) {
      return e === d;
    }
    let p,
      h,
      { use: g = [] } = n,
      { class: $ = "" } = n,
      { style: I = "" } = n,
      { ripple: v = !0 } = n,
      { color: b } = n,
      { toggle: E = !1 } = n,
      { pressed: y = d } = n,
      { ariaLabelOn: A } = n,
      { ariaLabelOff: C } = n,
      { touch: _ = !1 } = n,
      { displayFlex: S = !0 } = n,
      { size: T = "normal" } = n,
      { href: x } = n,
      { action: O } = n,
      L = {},
      D = {},
      N = {},
      M = H("SMUI:icon-button:context"),
      w = H("SMUI:icon-button:aria-describedby"),
      { component: F = null == x ? Mt : Nt } = n,
      U = s.disabled;
    P("SMUI:icon:context", "icon-button");
    let B = null;
    function V(e) {
      return e in L ? L[e] : W().classList.contains(e);
    }
    function z(e) {
      L[e] || i(17, (L[e] = !0), L);
    }
    function G(e) {
      (e in L && !L[e]) || i(17, (L[e] = !1), L);
    }
    function q(e) {
      var t;
      return e in N
        ? null !== (t = N[e]) && void 0 !== t
          ? t
          : null
        : W().getAttribute(e);
    }
    function K(e, t) {
      N[e] !== t && i(19, (N[e] = t), N);
    }
    function W() {
      return p.getElement();
    }
    k(() => {
      h && h.destroy();
    });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(28, (s = m(n, r))),
          "use" in e && i(1, (g = e.use)),
          "class" in e && i(2, ($ = e.class)),
          "style" in e && i(3, (I = e.style)),
          "ripple" in e && i(4, (v = e.ripple)),
          "color" in e && i(5, (b = e.color)),
          "toggle" in e && i(29, (E = e.toggle)),
          "pressed" in e && i(0, (y = e.pressed)),
          "ariaLabelOn" in e && i(6, (A = e.ariaLabelOn)),
          "ariaLabelOff" in e && i(7, (C = e.ariaLabelOff)),
          "touch" in e && i(8, (_ = e.touch)),
          "displayFlex" in e && i(9, (S = e.displayFlex)),
          "size" in e && i(10, (T = e.size)),
          "href" in e && i(11, (x = e.href)),
          "action" in e && i(12, (O = e.action)),
          "component" in e && i(13, (F = e.component)),
          "$$scope" in e && i(36, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        if (
          (4096 & e.$$.dirty[0] &&
            i(
              20,
              (a = (() => {
                if ("data-table:pagination" !== M)
                  return "dialog:header" === M
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
          U !== s.disabled)
        ) {
          const e = W();
          "blur" in e && e.blur(), i(30, (U = s.disabled));
        }
        (536969216 & e.$$.dirty[0]) | (1 & e.$$.dirty[1]) &&
          p &&
          W() &&
          E !== B &&
          (E && !h
            ? (i(
                16,
                (h = new Ta({
                  addClass: z,
                  hasClass: V,
                  notifyChange: (e) => {
                    !(function (e) {
                      i(0, (y = e.isOn));
                    })(e),
                      Ge(W(), "SMUIIconButtonToggle:change", e, void 0, !0);
                  },
                  removeClass: G,
                  getAttr: q,
                  setAttr: K,
                }))
              ),
              h.init())
            : !E &&
              h &&
              (h.destroy(),
              i(16, (h = void 0)),
              i(17, (L = {})),
              i(19, (N = {}))),
          i(31, (B = E))),
          65537 & e.$$.dirty[0] && h && !u(y) && h.isOn() !== y && h.toggle(y);
      }),
      [
        y,
        g,
        $,
        I,
        v,
        b,
        A,
        C,
        _,
        S,
        T,
        x,
        O,
        F,
        W,
        p,
        h,
        L,
        D,
        N,
        a,
        c,
        u,
        M,
        w,
        z,
        G,
        function (e, t) {
          D[e] != t &&
            ("" === t || null == t
              ? (delete D[e], i(18, D))
              : i(18, (D[e] = t), D));
        },
        s,
        E,
        U,
        B,
        o,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (p = e), i(15, p);
          });
        },
        () => h && h.handleClick(),
        () =>
          "top-app-bar:navigation" === M &&
          Ge(W(), "SMUITopAppBarIconButton:nav"),
        l,
      ]
    );
  }
  class Ma extends he {
    constructor(e) {
      super(),
        me(
          this,
          e,
          Na,
          La,
          s,
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
   */ var wa,
    Ra,
    Fa = {
      LIST_ITEM_ACTIVATED_CLASS: "mdc-list-item--activated",
      LIST_ITEM_CLASS: "mdc-list-item",
      LIST_ITEM_DISABLED_CLASS: "mdc-list-item--disabled",
      LIST_ITEM_SELECTED_CLASS: "mdc-list-item--selected",
      LIST_ITEM_TEXT_CLASS: "mdc-list-item__text",
      LIST_ITEM_PRIMARY_TEXT_CLASS: "mdc-list-item__primary-text",
      ROOT: "mdc-list",
    };
  ((wa = {})["" + Fa.LIST_ITEM_ACTIVATED_CLASS] = "mdc-list-item--activated"),
    (wa["" + Fa.LIST_ITEM_CLASS] = "mdc-list-item"),
    (wa["" + Fa.LIST_ITEM_DISABLED_CLASS] = "mdc-list-item--disabled"),
    (wa["" + Fa.LIST_ITEM_SELECTED_CLASS] = "mdc-list-item--selected"),
    (wa["" + Fa.LIST_ITEM_PRIMARY_TEXT_CLASS] = "mdc-list-item__primary-text"),
    (wa["" + Fa.ROOT] = "mdc-list");
  var ka =
      (((Ra = {})["" + Fa.LIST_ITEM_ACTIVATED_CLASS] =
        "mdc-deprecated-list-item--activated"),
      (Ra["" + Fa.LIST_ITEM_CLASS] = "mdc-deprecated-list-item"),
      (Ra["" + Fa.LIST_ITEM_DISABLED_CLASS] =
        "mdc-deprecated-list-item--disabled"),
      (Ra["" + Fa.LIST_ITEM_SELECTED_CLASS] =
        "mdc-deprecated-list-item--selected"),
      (Ra["" + Fa.LIST_ITEM_TEXT_CLASS] = "mdc-deprecated-list-item__text"),
      (Ra["" + Fa.LIST_ITEM_PRIMARY_TEXT_CLASS] =
        "mdc-deprecated-list-item__primary-text"),
      (Ra["" + Fa.ROOT] = "mdc-deprecated-list"),
      Ra),
    Ua = {
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
        Fa.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        Fa.LIST_ITEM_CLASS +
        " a,\n    ." +
        ka[Fa.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        ka[Fa.LIST_ITEM_CLASS] +
        " a\n  ",
      DEPRECATED_SELECTOR: ".mdc-deprecated-list",
      FOCUSABLE_CHILD_ELEMENTS:
        "\n    ." +
        Fa.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        Fa.LIST_ITEM_CLASS +
        " a,\n    ." +
        Fa.LIST_ITEM_CLASS +
        ' input[type="radio"]:not(:disabled),\n    .' +
        Fa.LIST_ITEM_CLASS +
        ' input[type="checkbox"]:not(:disabled),\n    .' +
        ka[Fa.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        ka[Fa.LIST_ITEM_CLASS] +
        " a,\n    ." +
        ka[Fa.LIST_ITEM_CLASS] +
        ' input[type="radio"]:not(:disabled),\n    .' +
        ka[Fa.LIST_ITEM_CLASS] +
        ' input[type="checkbox"]:not(:disabled)\n  ',
      RADIO_SELECTOR: 'input[type="radio"]',
      SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]',
    },
    Pa = { UNSET_INDEX: -1, TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300 },
    Ha = ["input", "button", "textarea", "select"],
    Ba = function (e) {
      var t = e.target;
      if (t) {
        var n = ("" + t.tagName).toLowerCase();
        -1 === Ha.indexOf(n) && e.preventDefault();
      }
    };
  function Va(e, t) {
    var n,
      i = e.nextChar,
      a = e.focusItemAtIndex,
      r = e.sortedIndexByFirstChar,
      s = e.focusedItemIndex,
      o = e.skipFocus,
      l = e.isItemAtIndexDisabled;
    return (
      clearTimeout(t.bufferClearTimeout),
      (t.bufferClearTimeout = setTimeout(function () {
        za(t);
      }, Pa.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS)),
      (t.typeaheadBuffer = t.typeaheadBuffer + i),
      (n =
        1 === t.typeaheadBuffer.length
          ? (function (e, t, n, i) {
              var a = i.typeaheadBuffer[0],
                r = e.get(a);
              if (!r) return -1;
              if (
                a === i.currentFirstChar &&
                r[i.sortedIndexCursor].index === t
              ) {
                i.sortedIndexCursor = (i.sortedIndexCursor + 1) % r.length;
                var s = r[i.sortedIndexCursor].index;
                if (!n(s)) return s;
              }
              i.currentFirstChar = a;
              var o,
                l = -1;
              for (o = 0; o < r.length; o++)
                if (!n(r[o].index)) {
                  l = o;
                  break;
                }
              for (; o < r.length; o++)
                if (r[o].index > t && !n(r[o].index)) {
                  l = o;
                  break;
                }
              if (-1 !== l)
                return (i.sortedIndexCursor = l), r[i.sortedIndexCursor].index;
              return -1;
            })(r, s, l, t)
          : (function (e, t, n) {
              var i = n.typeaheadBuffer[0],
                a = e.get(i);
              if (!a) return -1;
              var r = a[n.sortedIndexCursor];
              if (0 === r.text.lastIndexOf(n.typeaheadBuffer, 0) && !t(r.index))
                return r.index;
              var s = (n.sortedIndexCursor + 1) % a.length,
                o = -1;
              for (; s !== n.sortedIndexCursor; ) {
                var l = a[s],
                  c = 0 === l.text.lastIndexOf(n.typeaheadBuffer, 0),
                  d = !t(l.index);
                if (c && d) {
                  o = s;
                  break;
                }
                s = (s + 1) % a.length;
              }
              if (-1 !== o)
                return (n.sortedIndexCursor = o), a[n.sortedIndexCursor].index;
              return -1;
            })(r, l, t)),
      -1 === n || o || a(n),
      n
    );
  }
  function ja(e) {
    return e.typeaheadBuffer.length > 0;
  }
  function za(e) {
    e.typeaheadBuffer = "";
  }
  function Ga(e, t) {
    var n = e.event,
      i = e.isTargetListItem,
      a = e.focusedItemIndex,
      r = e.focusItemAtIndex,
      s = e.sortedIndexByFirstChar,
      o = e.isItemAtIndexDisabled,
      l = "ArrowLeft" === Gn(n),
      c = "ArrowUp" === Gn(n),
      d = "ArrowRight" === Gn(n),
      u = "ArrowDown" === Gn(n),
      p = "Home" === Gn(n),
      f = "End" === Gn(n),
      m = "Enter" === Gn(n),
      h = "Spacebar" === Gn(n);
    return n.ctrlKey || n.metaKey || l || c || d || u || p || f || m
      ? -1
      : h || 1 !== n.key.length
      ? h
        ? (i && Ba(n),
          i && ja(t)
            ? Va(
                {
                  focusItemAtIndex: r,
                  focusedItemIndex: a,
                  nextChar: " ",
                  sortedIndexByFirstChar: s,
                  skipFocus: !1,
                  isItemAtIndexDisabled: o,
                },
                t
              )
            : -1)
        : -1
      : (Ba(n),
        Va(
          {
            focusItemAtIndex: r,
            focusedItemIndex: a,
            nextChar: n.key.toLowerCase(),
            sortedIndexByFirstChar: s,
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
   */ var qa = (function (e) {
    function t(n) {
      var i = e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
      return (
        (i.wrapFocus = !1),
        (i.isVertical = !0),
        (i.isSingleSelectionList = !1),
        (i.selectedIndex = Pa.UNSET_INDEX),
        (i.focusedItemIndex = Pa.UNSET_INDEX),
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
      $e(t, e),
      Object.defineProperty(t, "strings", {
        get: function () {
          return Ua;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "cssClasses", {
        get: function () {
          return Fa;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "numbers", {
        get: function () {
          return Pa;
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
        e !== Pa.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            e,
            Fa.LIST_ITEM_ACTIVATED_CLASS
          ) && this.setUseActivatedClass(!0),
          (this.isSingleSelectionList = !0),
          (this.selectedIndex = e));
      }),
      (t.prototype.getSelectedIndexFromDOM = function () {
        for (
          var e = Pa.UNSET_INDEX, t = this.adapter.getListItemCount(), n = 0;
          n < t;
          n++
        ) {
          var i = this.adapter.listItemAtIndexHasClass(
              n,
              Fa.LIST_ITEM_SELECTED_CLASS
            ),
            a = this.adapter.listItemAtIndexHasClass(
              n,
              Fa.LIST_ITEM_ACTIVATED_CLASS
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
        return this.hasTypeahead && ja(this.typeaheadState);
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
          a = "ArrowLeft" === Gn(e),
          r = "ArrowUp" === Gn(e),
          s = "ArrowRight" === Gn(e),
          o = "ArrowDown" === Gn(e),
          l = "Home" === Gn(e),
          c = "End" === Gn(e),
          d = "Enter" === Gn(e),
          u = "Spacebar" === Gn(e),
          p = "A" === e.key || "a" === e.key;
        if (this.adapter.isRootFocused()) {
          r || c
            ? (e.preventDefault(), this.focusLastElement())
            : (o || l) && (e.preventDefault(), this.focusFirstElement()),
            this.hasTypeahead &&
              Ga(
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
                      Fa.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
        } else {
          var f = this.adapter.getFocusedElementIndex();
          if (!(-1 === f && (f = n) < 0)) {
            if ((this.isVertical && o) || (!this.isVertical && s))
              Ba(e), this.focusNextElement(f);
            else if ((this.isVertical && r) || (!this.isVertical && a))
              Ba(e), this.focusPrevElement(f);
            else if (l) Ba(e), this.focusFirstElement();
            else if (c) Ba(e), this.focusLastElement();
            else if (p && e.ctrlKey && this.isCheckboxList)
              e.preventDefault(),
                this.toggleAll(
                  this.selectedIndex === Pa.UNSET_INDEX
                    ? []
                    : this.selectedIndex
                );
            else if ((d || u) && t) {
              var m = e.target;
              if (m && "A" === m.tagName && d) return;
              if (
                (Ba(e),
                this.adapter.listItemAtIndexHasClass(
                  f,
                  Fa.LIST_ITEM_DISABLED_CLASS
                ))
              )
                return;
              this.isTypeaheadInProgress() ||
                (this.isSelectableList() && this.setSelectedIndexOnAction(f),
                this.adapter.notifyAction(f));
            }
            if (this.hasTypeahead)
              Ga(
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
                      Fa.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
          }
        }
      }),
      (t.prototype.handleClick = function (e, t) {
        e !== Pa.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            e,
            Fa.LIST_ITEM_DISABLED_CLASS
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
                Fa.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                e,
                Ua.ARIA_DISABLED,
                "false"
              ))
            : (this.adapter.addClassForElementIndex(
                e,
                Fa.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                e,
                Ua.ARIA_DISABLED,
                "true"
              )));
      }),
      (t.prototype.setSingleSelectionAtIndex = function (e, t) {
        var n = (void 0 === t ? {} : t).forceUpdate;
        if (this.selectedIndex !== e || n) {
          var i = Fa.LIST_ITEM_SELECTED_CLASS;
          this.useActivatedClass && (i = Fa.LIST_ITEM_ACTIVATED_CLASS),
            this.selectedIndex !== Pa.UNSET_INDEX &&
              this.adapter.removeClassForElementIndex(this.selectedIndex, i),
            this.setAriaForSingleSelectionAtIndex(e),
            this.setTabindexAtIndex(e),
            e !== Pa.UNSET_INDEX && this.adapter.addClassForElementIndex(e, i),
            (this.selectedIndex = e);
        }
      }),
      (t.prototype.setAriaForSingleSelectionAtIndex = function (e) {
        this.selectedIndex === Pa.UNSET_INDEX &&
          (this.ariaCurrentAttrValue = this.adapter.getAttributeForElementIndex(
            e,
            Ua.ARIA_CURRENT
          ));
        var t = null !== this.ariaCurrentAttrValue,
          n = t ? Ua.ARIA_CURRENT : Ua.ARIA_SELECTED;
        if (
          (this.selectedIndex !== Pa.UNSET_INDEX &&
            this.adapter.setAttributeForElementIndex(
              this.selectedIndex,
              n,
              "false"
            ),
          e !== Pa.UNSET_INDEX)
        ) {
          var i = t ? this.ariaCurrentAttrValue : "true";
          this.adapter.setAttributeForElementIndex(e, n, i);
        }
      }),
      (t.prototype.getSelectionAttribute = function () {
        return this.useSelectedAttr ? Ua.ARIA_SELECTED : Ua.ARIA_CHECKED;
      }),
      (t.prototype.setRadioAtIndex = function (e) {
        var t = this.getSelectionAttribute();
        this.adapter.setCheckedCheckboxOrRadioAtIndex(e, !0),
          this.selectedIndex !== Pa.UNSET_INDEX &&
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
        this.focusedItemIndex === Pa.UNSET_INDEX && 0 !== e
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
          e !== Pa.UNSET_INDEX &&
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
            this.selectedIndex !== Pa.UNSET_INDEX
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
            (this.isSingleSelectionList && e === Pa.UNSET_INDEX)
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
          this.selectedIndex === Pa.UNSET_INDEX
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
              Fa.LIST_ITEM_DISABLED_CLASS
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
          Va(
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
                  Fa.LIST_ITEM_DISABLED_CLASS
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
              var r = a[0].toLowerCase();
              n.has(r) || n.set(r, []),
                n.get(r).push({ text: a.toLowerCase(), index: i });
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
        za(this.typeaheadState);
      }),
      t
    );
  })(Ae);
  function Ka(e) {
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
          u(i, n, e, e[43], t ? d(n, e[43], a, null) : p(e[43]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Wa(e) {
    let n, i, a;
    const r = [
      { use: [e[17], ...e[0]] },
      {
        class: ze({
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
    var s = e[12];
    function o(e) {
      let n = { $$slots: { default: [Ka] }, $$scope: { ctx: e } };
      for (let e = 0; e < r.length; e += 1) n = t(n, r[e]);
      return { props: n };
    }
    return (
      s &&
        ((n = new s(o(e))),
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
          n && ue(n.$$.fragment), (i = S());
        },
        m(e, t) {
          n && pe(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, t) {
          const a =
            8818687 & t[0]
              ? le(r, [
                  131073 & t[0] && { use: [e[17], ...e[0]] },
                  266238 & t[0] && {
                    class: ze({
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
                  8388608 & t[0] && ce(e[23]),
                ])
              : {};
          if (
            (4096 & t[1] && (a.$$scope = { dirty: t, ctx: e }),
            s !== (s = e[12]))
          ) {
            if (n) {
              ie();
              const e = n;
              se(e.$$.fragment, 1, 0, () => {
                fe(e, 1);
              }),
                ae();
            }
            s
              ? ((n = new s(o(e))),
                e[38](n),
                n.$on("keydown", e[39]),
                n.$on("focusin", e[40]),
                n.$on("focusout", e[41]),
                n.$on("click", e[42]),
                n.$on("SMUIListItem:mount", e[19]),
                n.$on("SMUIListItem:unmount", e[20]),
                n.$on("SMUI:action", e[21]),
                ue(n.$$.fragment),
                re(n.$$.fragment, 1),
                pe(n, i.parentNode, i))
              : (n = null);
          } else s && n.$set(a);
        },
        i(e) {
          a || (n && re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && se(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[38](null), t && b(i), n && fe(n, t);
        },
      }
    );
  }
  function Xa(e, n, i) {
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
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    var l;
    const { closest: c, matches: d } = Te,
      u = Xe(R());
    let p,
      h,
      { use: g = [] } = n,
      { class: $ = "" } = n,
      { nonInteractive: I = !1 } = n,
      { dense: v = !1 } = n,
      { textualList: b = !1 } = n,
      { avatarList: E = !1 } = n,
      { iconList: y = !1 } = n,
      { imageList: A = !1 } = n,
      { thumbnailList: C = !1 } = n,
      { videoList: _ = !1 } = n,
      { twoLine: S = !1 } = n,
      { threeLine: T = !1 } = n,
      { vertical: x = !0 } = n,
      {
        wrapFocus: O = null !== (l = H("SMUI:list:wrapFocus")) &&
          void 0 !== l &&
          l,
      } = n,
      { singleSelection: L = !1 } = n,
      { selectedIndex: D = -1 } = n,
      { radioList: N = !1 } = n,
      { checkList: M = !1 } = n,
      { hasTypeahead: w = !1 } = n,
      U = [],
      B = H("SMUI:list:role"),
      V = H("SMUI:list:nav");
    const z = new WeakMap();
    let G,
      q = H("SMUI:dialog:selection"),
      K = H("SMUI:addLayoutListener"),
      { component: W = V ? Pt : Bt } = n;
    function X() {
      return null == p
        ? []
        : [...oe().children]
            .map((e) => z.get(e))
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
    function Z(e, t) {
      const n = X()[e];
      n && n.addClass(t);
    }
    function J(e, t) {
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
      return t && d(t, ".mdc-deprecated-list-item")
        ? X()
            .map((e) => (null == e ? void 0 : e.element))
            .indexOf(t)
        : -1;
    }
    function re() {
      return h.layout();
    }
    function se() {
      return h.getSelectedIndex();
    }
    function oe() {
      return p.getElement();
    }
    P("SMUI:list:nonInteractive", I),
      P("SMUI:separator:context", "list"),
      B ||
        (L
          ? ((B = "listbox"), P("SMUI:list:item:role", "option"))
          : N
          ? ((B = "radiogroup"), P("SMUI:list:item:role", "radio"))
          : M
          ? ((B = "group"), P("SMUI:list:item:role", "checkbox"))
          : ((B = "list"), P("SMUI:list:item:role", void 0))),
      K && (G = K(re)),
      F(() => {
        i(
          13,
          (h = new qa({
            addClassForElementIndex: Z,
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
            getListItemCount: () => U.length,
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
              i(24, (D = e)),
                null != p &&
                  Ge(oe(), "SMUIList:action", { index: e }, void 0, !0);
            },
            removeClassForElementIndex: J,
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
            return U;
          },
          get typeaheadInProgress() {
            return h.isTypeaheadInProgress();
          },
          typeaheadMatchItem: (e, t) => h.typeaheadMatchItem(e, t, !0),
          getOrderedList: X,
          focusItemAtIndex: Y,
          addClassForElementIndex: Z,
          removeClassForElementIndex: J,
          setAttributeForElementIndex: ee,
          removeAttributeForElementIndex: te,
          getAttributeFromElementIndex: ne,
          getPrimaryTextAtIndex: ie,
        };
        return (
          Ge(oe(), "SMUIList:mount", e),
          h.init(),
          () => {
            h.destroy();
          }
        );
      }),
      k(() => {
        G && G();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(23, (r = m(n, a))),
          "use" in e && i(0, (g = e.use)),
          "class" in e && i(1, ($ = e.class)),
          "nonInteractive" in e && i(2, (I = e.nonInteractive)),
          "dense" in e && i(3, (v = e.dense)),
          "textualList" in e && i(4, (b = e.textualList)),
          "avatarList" in e && i(5, (E = e.avatarList)),
          "iconList" in e && i(6, (y = e.iconList)),
          "imageList" in e && i(7, (A = e.imageList)),
          "thumbnailList" in e && i(8, (C = e.thumbnailList)),
          "videoList" in e && i(9, (_ = e.videoList)),
          "twoLine" in e && i(10, (S = e.twoLine)),
          "threeLine" in e && i(11, (T = e.threeLine)),
          "vertical" in e && i(25, (x = e.vertical)),
          "wrapFocus" in e && i(26, (O = e.wrapFocus)),
          "singleSelection" in e && i(27, (L = e.singleSelection)),
          "selectedIndex" in e && i(24, (D = e.selectedIndex)),
          "radioList" in e && i(28, (N = e.radioList)),
          "checkList" in e && i(29, (M = e.checkList)),
          "hasTypeahead" in e && i(30, (w = e.hasTypeahead)),
          "component" in e && i(12, (W = e.component)),
          "$$scope" in e && i(43, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        33562624 & e.$$.dirty[0] && h && h.setVerticalOrientation(x),
          67117056 & e.$$.dirty[0] && h && h.setWrapFocus(O),
          1073750016 & e.$$.dirty[0] && h && h.setHasTypeahead(w),
          134225920 & e.$$.dirty[0] && h && h.setSingleSelection(L),
          151003136 & e.$$.dirty[0] &&
            h &&
            L &&
            se() !== D &&
            h.setSelectedIndex(D);
      }),
      [
        g,
        $,
        I,
        v,
        b,
        E,
        y,
        A,
        C,
        _,
        S,
        T,
        W,
        h,
        p,
        B,
        d,
        u,
        q,
        function (e) {
          U.push(e.detail),
            z.set(e.detail.element, e.detail),
            L && e.detail.selected && i(24, (D = ae(e.detail.element))),
            e.stopPropagation();
        },
        function (e) {
          var t;
          const n =
            null !== (t = e.detail && U.indexOf(e.detail)) && void 0 !== t
              ? t
              : -1;
          -1 !== n && (U.splice(n, 1), z.delete(e.detail.element)),
            e.stopPropagation();
        },
        function (e) {
          if (N || M) {
            const t = ae(e.target);
            if (-1 !== t) {
              const e = X()[t];
              e &&
                ((N && !e.checked) || M) &&
                ((e.checked = !e.checked),
                e.activateRipple(),
                window.requestAnimationFrame(() => {
                  e.deactivateRipple();
                }));
            }
          }
        },
        ae,
        r,
        D,
        x,
        O,
        L,
        N,
        M,
        w,
        re,
        function (e, t) {
          return h.setEnabled(e, t);
        },
        function () {
          return h.isTypeaheadInProgress();
        },
        se,
        function () {
          return h.getFocusedItemIndex();
        },
        oe,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
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
            !d(e.target, 'input[type="checkbox"], input[type="radio"]')
          ),
        o,
      ]
    );
  }
  class Ya extends he {
    constructor(e) {
      super(),
        me(
          this,
          e,
          Xa,
          Wa,
          s,
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
  function Qa(e) {
    let t;
    return {
      c() {
        (t = y("span")), x(t, "class", "mdc-deprecated-list-item__ripple");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Za(e) {
    let t,
      n,
      i = e[7] && Qa();
    const a = e[32].default,
      r = l(a, e, e[35], null);
    return {
      c() {
        i && i.c(), (t = S()), r && r.c();
      },
      m(e, a) {
        i && i.m(e, a), v(e, t, a), r && r.m(e, a), (n = !0);
      },
      p(e, s) {
        e[7]
          ? i || ((i = Qa()), i.c(), i.m(t.parentNode, t))
          : i && (i.d(1), (i = null)),
          r &&
            r.p &&
            (!n || 16 & s[1]) &&
            u(r, a, e, e[35], n ? d(a, e[35], s, null) : p(e[35]), null);
      },
      i(e) {
        n || (re(r, e), (n = !0));
      },
      o(e) {
        se(r, e), (n = !1);
      },
      d(e) {
        i && i.d(e), e && b(t), r && r.d(e);
      },
    };
  }
  function Ja(e) {
    let n, i, a;
    const r = [
      {
        use: [
          ...(e[6]
            ? []
            : [
                [
                  ti,
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
        class: ze({
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
      { style: Object.entries(e[17]).map(tr).concat([e[4]]).join(" ") },
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
    var s = e[12];
    function o(e) {
      let n = { $$slots: { default: [Za] }, $$scope: { ctx: e } };
      for (let e = 0; e < r.length; e += 1) n = t(n, r[e]);
      return { props: n };
    }
    return (
      s &&
        ((n = new s(o(e))),
        e[33](n),
        n.$on("click", e[13]),
        n.$on("keydown", e[25]),
        n.$on("SMUIGenericInput:mount", e[26]),
        n.$on("SMUIGenericInput:unmount", e[34])),
      {
        c() {
          n && ue(n.$$.fragment), (i = S());
        },
        m(e, t) {
          n && pe(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, t) {
          const a =
            167726975 & t[0]
              ? le(r, [
                  30425703 & t[0] && {
                    use: [
                      ...(e[6]
                        ? []
                        : [
                            [
                              ti,
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
                    class: ze({
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
                      .map(tr)
                      .concat([e[4]])
                      .join(" "),
                  },
                  2097154 & t[0] &&
                    ce(e[21] && e[1] ? { "aria-current": "page" } : {}),
                  2097408 & t[0] && ce(e[21] ? {} : { role: e[8] }),
                  2097409 & t[0] &&
                    ce(
                      e[21] || "option" !== e[8]
                        ? {}
                        : { "aria-selected": e[0] ? "true" : "false" }
                    ),
                  2113792 & t[0] &&
                    ce(
                      e[21] || ("radio" !== e[8] && "checkbox" !== e[8])
                        ? {}
                        : {
                            "aria-checked":
                              e[14] && e[14].checked ? "true" : "false",
                          }
                    ),
                  2097664 & t[0] &&
                    ce(
                      e[21] ? {} : { "aria-disabled": e[9] ? "true" : "false" }
                    ),
                  1024 & t[0] && {
                    "data-menu-item-skip-restore-focus": e[10] || void 0,
                  },
                  524288 & t[0] && { tabindex: e[19] },
                  2048 & t[0] && { href: e[11] },
                  262144 & t[0] && ce(e[18]),
                  134217728 & t[0] && ce(e[27]),
                ])
              : {};
          if (
            ((128 & t[0]) | (16 & t[1]) && (a.$$scope = { dirty: t, ctx: e }),
            s !== (s = e[12]))
          ) {
            if (n) {
              ie();
              const e = n;
              se(e.$$.fragment, 1, 0, () => {
                fe(e, 1);
              }),
                ae();
            }
            s
              ? ((n = new s(o(e))),
                e[33](n),
                n.$on("click", e[13]),
                n.$on("keydown", e[25]),
                n.$on("SMUIGenericInput:mount", e[26]),
                n.$on("SMUIGenericInput:unmount", e[34]),
                ue(n.$$.fragment),
                re(n.$$.fragment, 1),
                pe(n, i.parentNode, i))
              : (n = null);
          } else s && n.$set(a);
        },
        i(e) {
          a || (n && re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && se(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[33](null), t && b(i), n && fe(n, t);
        },
      }
    );
  }
  let er = 0;
  const tr = ([e, t]) => `${e}: ${t};`;
  function nr(e, n, i) {
    let a;
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
    let s = m(n, r),
      { $$slots: o = {}, $$scope: l } = n;
    var c;
    const d = Xe(R());
    let u = () => {};
    let { use: p = [] } = n,
      { class: h = "" } = n,
      { style: g = "" } = n,
      { color: $ } = n,
      {
        nonInteractive: I = null !== (c = H("SMUI:list:nonInteractive")) &&
          void 0 !== c &&
          c,
      } = n;
    P("SMUI:list:nonInteractive", void 0);
    let { ripple: v = !I } = n,
      { activated: b = !1 } = n,
      { role: E = H("SMUI:list:item:role") } = n;
    P("SMUI:list:item:role", void 0);
    let y,
      A,
      C,
      { selected: _ = !1 } = n,
      { disabled: S = !1 } = n,
      { skipRestoreFocus: T = !1 } = n,
      { tabindex: x = u } = n,
      { inputId: O = "SMUI-form-field-list-" + er++ } = n,
      { href: L } = n,
      D = {},
      N = {},
      M = {},
      w = H("SMUI:list:item:nav"),
      { component: U = w ? (L ? Nt : Ht) : Ut } = n;
    function B(e) {
      return e in D ? D[e] : Q().classList.contains(e);
    }
    function V(e) {
      D[e] || i(16, (D[e] = !0), D);
    }
    function z(e) {
      (e in D && !D[e]) || i(16, (D[e] = !1), D);
    }
    function G(e) {
      var t;
      return e in M
        ? null !== (t = M[e]) && void 0 !== t
          ? t
          : null
        : Q().getAttribute(e);
    }
    function q(e, t) {
      M[e] !== t && i(18, (M[e] = t), M);
    }
    function K(e) {
      (e in M && null == M[e]) || i(18, (M[e] = void 0), M);
    }
    function W() {
      let e = !0,
        t = y.getElement();
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
      S || Ge(Q(), "SMUI:action", e);
    }
    function Y() {
      var e, t, n;
      const i = Q(),
        a = i.querySelector(".mdc-deprecated-list-item__primary-text");
      if (a) return null !== (e = a.textContent) && void 0 !== e ? e : "";
      const r = i.querySelector(".mdc-deprecated-list-item__text");
      return r
        ? null !== (t = r.textContent) && void 0 !== t
          ? t
          : ""
        : null !== (n = i.textContent) && void 0 !== n
        ? n
        : "";
    }
    function Q() {
      return y.getElement();
    }
    P("SMUI:generic:input:props", { id: O }),
      P("SMUI:separator:context", void 0),
      F(() => {
        if (!_ && !I) {
          let e = !0,
            t = y;
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
          hasClass: B,
          addClass: V,
          removeClass: z,
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
          getValue: () => s.value,
          action: X,
          get tabindex() {
            return a;
          },
          set tabindex(e) {
            i(28, (x = e));
          },
          get disabled() {
            return S;
          },
          get activated() {
            return b;
          },
          set activated(e) {
            i(1, (b = e));
          },
        };
        return (
          Ge(Q(), "SMUIListItem:mount", e),
          () => {
            Ge(Q(), "SMUIListItem:unmount", e);
          }
        );
      }),
      k(() => {
        C && window.cancelAnimationFrame(C);
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(27, (s = m(n, r))),
          "use" in e && i(2, (p = e.use)),
          "class" in e && i(3, (h = e.class)),
          "style" in e && i(4, (g = e.style)),
          "color" in e && i(5, ($ = e.color)),
          "nonInteractive" in e && i(6, (I = e.nonInteractive)),
          "ripple" in e && i(7, (v = e.ripple)),
          "activated" in e && i(1, (b = e.activated)),
          "role" in e && i(8, (E = e.role)),
          "selected" in e && i(0, (_ = e.selected)),
          "disabled" in e && i(9, (S = e.disabled)),
          "skipRestoreFocus" in e && i(10, (T = e.skipRestoreFocus)),
          "tabindex" in e && i(28, (x = e.tabindex)),
          "inputId" in e && i(29, (O = e.inputId)),
          "href" in e && i(11, (L = e.href)),
          "component" in e && i(12, (U = e.component)),
          "$$scope" in e && i(35, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        268452417 & e.$$.dirty[0] &&
          i(
            19,
            (a = x === u ? (I || S || !(_ || (A && A.checked)) ? -1 : 0) : x)
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
        E,
        S,
        T,
        L,
        U,
        X,
        A,
        y,
        D,
        N,
        M,
        a,
        d,
        w,
        V,
        z,
        function (e, t) {
          N[e] != t &&
            ("" === t || null == t
              ? (delete N[e], i(17, N))
              : i(17, (N[e] = t), N));
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
        s,
        x,
        O,
        Y,
        Q,
        o,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (y = e), i(15, y);
          });
        },
        () => i(14, (A = void 0)),
        l,
      ]
    );
  }
  var ir = pt({ class: "mdc-deprecated-list-item__text", component: Ht }),
    ar = pt({ class: "mdc-deprecated-list-item__primary-text", component: Ht }),
    rr = pt({
      class: "mdc-deprecated-list-item__secondary-text",
      component: Ht,
    });
  function sr(e) {
    let n, i, s, o, c, f;
    const m = e[8].default,
      h = l(m, e, e[7], null);
    let g = [
        {
          class: (i = ze({
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
        (n = y("span")), h && h.c(), O(n, I);
      },
      m(t, i) {
        v(t, n, i),
          h && h.m(n, null),
          e[9](n),
          (o = !0),
          c ||
            ((f = [$((s = Qe.call(null, n, e[0]))), $(e[3].call(null, n))]),
            (c = !0));
      },
      p(e, [t]) {
        h &&
          h.p &&
          (!o || 128 & t) &&
          u(h, m, e, e[7], o ? d(m, e[7], t, null) : p(e[7]), null),
          O(
            n,
            (I = le(g, [
              (!o ||
                (2 & t &&
                  i !==
                    (i = ze({
                      [e[1]]: !0,
                      "mdc-deprecated-list-item__graphic": !0,
                      "mdc-menu__selection-group-icon": e[4],
                    })))) && { class: i },
              32 & t && e[5],
            ]))
          ),
          s && r(s.update) && 1 & t && s.update.call(null, e[0]);
      },
      i(e) {
        o || (re(h, e), (o = !0));
      },
      o(e) {
        se(h, e), (o = !1);
      },
      d(t) {
        t && b(n), h && h.d(t), e[9](null), (c = !1), a(f);
      },
    };
  }
  function or(e, n, i) {
    const a = ["use", "class", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const l = Xe(R());
    let c,
      { use: d = [] } = n,
      { class: u = "" } = n,
      p = H("SMUI:list:graphic:menu-selection-group");
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(5, (r = m(n, a))),
          "use" in e && i(0, (d = e.use)),
          "class" in e && i(1, (u = e.class)),
          "$$scope" in e && i(7, (o = e.$$scope));
      }),
      [
        d,
        u,
        c,
        l,
        p,
        r,
        function () {
          return c;
        },
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (c = e), i(2, c);
          });
        },
      ]
    );
  }
  pt({ class: "mdc-deprecated-list-item__meta", component: Ht }),
    pt({ class: "mdc-deprecated-list-group", component: wt }),
    pt({ class: "mdc-deprecated-list-group__subheader", component: kt });
  const lr = class extends he {
      constructor(e) {
        super(),
          me(
            this,
            e,
            nr,
            Ja,
            s,
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
    cr = class extends he {
      constructor(e) {
        super(), me(this, e, or, sr, s, { use: 0, class: 1, getElement: 6 });
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
  var dr = {
      ANIMATE: "mdc-drawer--animate",
      CLOSING: "mdc-drawer--closing",
      DISMISSIBLE: "mdc-drawer--dismissible",
      MODAL: "mdc-drawer--modal",
      OPEN: "mdc-drawer--open",
      OPENING: "mdc-drawer--opening",
      ROOT: "mdc-drawer",
    },
    ur = {
      APP_CONTENT_SELECTOR: ".mdc-drawer-app-content",
      CLOSE_EVENT: "MDCDrawer:closed",
      OPEN_EVENT: "MDCDrawer:opened",
      SCRIM_SELECTOR: ".mdc-drawer-scrim",
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      LIST_ITEM_ACTIVATED_SELECTOR:
        ".mdc-list-item--activated,.mdc-deprecated-list-item--activated",
    },
    pr = (function (e) {
      function t(n) {
        var i = e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
        return (i.animationFrame = 0), (i.animationTimer = 0), i;
      }
      return (
        $e(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return ur;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return dr;
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
            (this.adapter.addClass(dr.OPEN),
            this.adapter.addClass(dr.ANIMATE),
            this.runNextAnimationFrame(function () {
              e.adapter.addClass(dr.OPENING);
            }),
            this.adapter.saveFocus());
        }),
        (t.prototype.close = function () {
          !this.isOpen() ||
            this.isOpening() ||
            this.isClosing() ||
            this.adapter.addClass(dr.CLOSING);
        }),
        (t.prototype.isOpen = function () {
          return this.adapter.hasClass(dr.OPEN);
        }),
        (t.prototype.isOpening = function () {
          return (
            this.adapter.hasClass(dr.OPENING) ||
            this.adapter.hasClass(dr.ANIMATE)
          );
        }),
        (t.prototype.isClosing = function () {
          return this.adapter.hasClass(dr.CLOSING);
        }),
        (t.prototype.handleKeydown = function (e) {
          var t = e.keyCode;
          ("Escape" === e.key || 27 === t) && this.close();
        }),
        (t.prototype.handleTransitionEnd = function (e) {
          var t = dr.OPENING,
            n = dr.CLOSING,
            i = dr.OPEN,
            a = dr.ANIMATE,
            r = dr.ROOT;
          this.isElement(e.target) &&
            this.adapter.elementHasClass(e.target, r) &&
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
    })(Ae),
    fr = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        $e(t, e),
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
    })(pr);
  function mr(e) {
    let n, i, s, o, c, f;
    const m = e[15].default,
      h = l(m, e, e[14], null);
    let g = [
        {
          class: (i = ze({
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
        (n = y("aside")), h && h.c(), O(n, I);
      },
      m(t, i) {
        v(t, n, i),
          h && h.m(n, null),
          e[16](n),
          (o = !0),
          c ||
            ((f = [
              $((s = Qe.call(null, n, e[0]))),
              $(e[7].call(null, n)),
              T(n, "keydown", e[17]),
              T(n, "transitionend", e[18]),
            ]),
            (c = !0));
      },
      p(e, [t]) {
        h &&
          h.p &&
          (!o || 16384 & t) &&
          u(h, m, e, e[14], o ? d(m, e[14], t, null) : p(e[14]), null),
          O(
            n,
            (I = le(g, [
              (!o ||
                (78 & t &&
                  i !==
                    (i = ze({
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
          s && r(s.update) && 1 & t && s.update.call(null, e[0]);
      },
      i(e) {
        o || (re(h, e), (o = !0));
      },
      o(e) {
        se(h, e), (o = !1);
      },
      d(t) {
        t && b(n), h && h.d(t), e[16](null), (c = !1), a(f);
      },
    };
  }
  function hr(e, n, i) {
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
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const { FocusTrap: l } = pn,
      c = Xe(R());
    let d,
      u,
      p,
      { use: h = [] } = n,
      { class: g = "" } = n,
      { variant: $ } = n,
      { open: I = !1 } = n,
      { fixed: v = !0 } = n,
      b = {},
      E = null,
      y = !1;
    P("SMUI:list:nav", !0),
      P("SMUI:list:item:nav", !0),
      P("SMUI:list:wrapFocus", !0);
    let A = $;
    function C() {
      var e, t;
      y && y.removeEventListener("SMUIDrawerScrim:click", x),
        "modal" === $ &&
          ((y =
            null !==
              (t =
                null === (e = d.parentNode) || void 0 === e
                  ? void 0
                  : e.querySelector(".mdc-drawer-scrim")) &&
            void 0 !== t &&
            t),
          y && y.addEventListener("SMUIDrawerScrim:click", x));
      const n = "dismissible" === $ ? pr : "modal" === $ ? fr : void 0;
      return n
        ? new n({
            addClass: S,
            removeClass: T,
            hasClass: _,
            elementHasClass: (e, t) => e.classList.contains(t),
            saveFocus: () => (E = document.activeElement),
            restoreFocus: () => {
              E &&
                "focus" in E &&
                d.contains(document.activeElement) &&
                E.focus();
            },
            focusActiveNavigationItem: () => {
              const e = d.querySelector(
                ".mdc-list-item--activated,.mdc-deprecated-list-item--activated"
              );
              e && e.focus();
            },
            notifyClose: () => {
              i(9, (I = !1)), Ge(d, "SMUIDrawer:closed", void 0, void 0, !0);
            },
            notifyOpen: () => {
              i(9, (I = !0)), Ge(d, "SMUIDrawer:opened", void 0, void 0, !0);
            },
            trapFocus: () => p.trapFocus(),
            releaseFocus: () => p.releaseFocus(),
          })
        : void 0;
    }
    function _(e) {
      return e in b ? b[e] : O().classList.contains(e);
    }
    function S(e) {
      b[e] || i(6, (b[e] = !0), b);
    }
    function T(e) {
      (e in b && !b[e]) || i(6, (b[e] = !1), b);
    }
    function x() {
      u && "handleScrimClick" in u && u.handleScrimClick();
    }
    function O() {
      return d;
    }
    F(() => {
      (p = new l(d, { skipInitialFocus: !0 })), i(4, (u = C())), u && u.init();
    }),
      k(() => {
        u && u.destroy(),
          y && y.removeEventListener("SMUIDrawerScrim:click", x);
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(8, (r = m(n, a))),
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
          u && u.destroy(),
          i(6, (b = {})),
          i(4, (u = C())),
          u && u.init()),
          528 & e.$$.dirty &&
            u &&
            u.isOpen() !== I &&
            (I ? u.open() : u.close());
      }),
      [
        h,
        g,
        $,
        v,
        u,
        d,
        b,
        c,
        r,
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
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (d = e), i(5, d);
          });
        },
        (e) => u && u.handleKeydown(e),
        (e) => u && u.handleTransitionEnd(e),
      ]
    );
  }
  class gr extends he {
    constructor(e) {
      super(),
        me(this, e, hr, mr, s, {
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
  var $r = pt({ class: "mdc-drawer-app-content", component: wt }),
    Ir = pt({ class: "mdc-drawer__content", component: wt });
  pt({ class: "mdc-drawer__header", component: wt }),
    pt({ class: "mdc-drawer__title", component: Rt }),
    pt({ class: "mdc-drawer__subtitle", component: Ft });
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
  var vr = {
    animation: { prefixed: "-webkit-animation", standard: "animation" },
    transform: { prefixed: "-webkit-transform", standard: "transform" },
    transition: { prefixed: "-webkit-transition", standard: "transition" },
  };
  function br(e, t) {
    if (
      (function (e) {
        return (
          Boolean(e.document) && "function" == typeof e.document.createElement
        );
      })(e) &&
      t in vr
    ) {
      var n = e.document.createElement("div"),
        i = vr[t],
        a = i.standard,
        r = i.prefixed;
      return a in n.style ? a : r;
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
   */ var Er = {
      CLOSED_CLASS: "mdc-linear-progress--closed",
      CLOSED_ANIMATION_OFF_CLASS: "mdc-linear-progress--closed-animation-off",
      INDETERMINATE_CLASS: "mdc-linear-progress--indeterminate",
      REVERSED_CLASS: "mdc-linear-progress--reversed",
      ANIMATION_READY_CLASS: "mdc-linear-progress--animation-ready",
    },
    yr = {
      ARIA_HIDDEN: "aria-hidden",
      ARIA_VALUEMAX: "aria-valuemax",
      ARIA_VALUEMIN: "aria-valuemin",
      ARIA_VALUENOW: "aria-valuenow",
      BUFFER_BAR_SELECTOR: ".mdc-linear-progress__buffer-bar",
      FLEX_BASIS: "flex-basis",
      PRIMARY_BAR_SELECTOR: ".mdc-linear-progress__primary-bar",
    },
    Ar = 0.8367142,
    Cr = 2.00611057,
    _r = 0.37651913,
    Sr = 0.84386165,
    Tr = 1.60277782,
    xr = (function (e) {
      function t(n) {
        var i = e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
        return (i.observer = null), i;
      }
      return (
        $e(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Er;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return yr;
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
          (this.determinate = !this.adapter.hasClass(Er.INDETERMINATE_CLASS)),
            this.adapter.addClass(Er.ANIMATION_READY_CLASS),
            (this.progress = 0),
            (this.buffer = 1),
            (this.observer = this.adapter.attachResizeObserver(function (t) {
              var n, i;
              if (!e.determinate)
                try {
                  for (var a = Ee(t), r = a.next(); !r.done; r = a.next()) {
                    var s = r.value;
                    s.contentRect &&
                      e.calculateAndSetDimensions(s.contentRect.width);
                  }
                } catch (e) {
                  n = { error: e };
                } finally {
                  try {
                    r && !r.done && (i = a.return) && i.call(a);
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
              this.adapter.removeClass(Er.INDETERMINATE_CLASS),
              this.adapter.setAttribute(
                yr.ARIA_VALUENOW,
                this.progress.toString()
              ),
              this.adapter.setAttribute(yr.ARIA_VALUEMAX, "1"),
              this.adapter.setAttribute(yr.ARIA_VALUEMIN, "0"),
              this.setPrimaryBarProgress(this.progress),
              void this.setBufferBarProgress(this.buffer)
            );
          this.observer &&
            this.calculateAndSetDimensions(this.adapter.getWidth()),
            this.adapter.addClass(Er.INDETERMINATE_CLASS),
            this.adapter.removeAttribute(yr.ARIA_VALUENOW),
            this.adapter.removeAttribute(yr.ARIA_VALUEMAX),
            this.adapter.removeAttribute(yr.ARIA_VALUEMIN),
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
              this.adapter.setAttribute(yr.ARIA_VALUENOW, e.toString()));
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
          this.adapter.removeClass(Er.CLOSED_CLASS),
            this.adapter.removeClass(Er.CLOSED_ANIMATION_OFF_CLASS),
            this.adapter.removeAttribute(yr.ARIA_HIDDEN);
        }),
        (t.prototype.close = function () {
          this.adapter.addClass(Er.CLOSED_CLASS),
            this.adapter.setAttribute(yr.ARIA_HIDDEN, "true");
        }),
        (t.prototype.isClosed = function () {
          return this.adapter.hasClass(Er.CLOSED_CLASS);
        }),
        (t.prototype.handleTransitionEnd = function () {
          this.adapter.hasClass(Er.CLOSED_CLASS) &&
            this.adapter.addClass(Er.CLOSED_ANIMATION_OFF_CLASS);
        }),
        (t.prototype.destroy = function () {
          e.prototype.destroy.call(this),
            this.observer && this.observer.disconnect();
        }),
        (t.prototype.restartAnimation = function () {
          this.adapter.removeClass(Er.ANIMATION_READY_CLASS),
            this.adapter.forceLayout(),
            this.adapter.addClass(Er.ANIMATION_READY_CLASS);
        }),
        (t.prototype.setPrimaryBarProgress = function (e) {
          var t = "scaleX(" + e + ")",
            n =
              "undefined" != typeof window
                ? br(window, "transform")
                : "transform";
          this.adapter.setPrimaryBarStyle(n, t);
        }),
        (t.prototype.setBufferBarProgress = function (e) {
          var t = 100 * e + "%";
          this.adapter.setBufferBarStyle(yr.FLEX_BASIS, t);
        }),
        (t.prototype.calculateAndSetDimensions = function (e) {
          var t = e * Ar,
            n = e * Cr,
            i = e * _r,
            a = e * Sr,
            r = e * Tr;
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
              r + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-full-neg",
              -r + "px"
            ),
            this.restartAnimation();
        }),
        t
      );
    })(Ae);
  function Or(n) {
    let i,
      s,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      m,
      h,
      g,
      E,
      A,
      C,
      S,
      L,
      D,
      N,
      M,
      w = [
        {
          class: (E = ze({
            [n[1]]: !0,
            "mdc-linear-progress": !0,
            "mdc-linear-progress--indeterminate": n[3],
            "mdc-linear-progress--closed": n[4],
            "mdc-data-table__linear-progress": "data-table" === n[14],
            ...n[8],
          })),
        },
        { style: (A = Object.entries(n[10]).map(Nr).concat([n[2]]).join(" ")) },
        { role: "progressbar" },
        { "aria-valuemin": (C = 0) },
        { "aria-valuemax": (S = 1) },
        { "aria-valuenow": (L = n[3] ? void 0 : n[5]) },
        n[9],
        n[16],
      ],
      R = {};
    for (let e = 0; e < w.length; e += 1) R = t(R, w[e]);
    return {
      c() {
        (i = y("div")),
          (s = y("div")),
          (o = y("div")),
          (c = _()),
          (d = y("div")),
          (u = _()),
          (p = y("div")),
          (f = y("span")),
          (h = _()),
          (g = y("div")),
          (g.innerHTML =
            '<span class="mdc-linear-progress__bar-inner"></span>'),
          x(o, "class", "mdc-linear-progress__buffer-bar"),
          x(o, "style", (l = Object.entries(n[11]).map(Lr).join(" "))),
          x(d, "class", "mdc-linear-progress__buffer-dots"),
          x(s, "class", "mdc-linear-progress__buffer"),
          x(f, "class", "mdc-linear-progress__bar-inner"),
          x(
            p,
            "class",
            "mdc-linear-progress__bar mdc-linear-progress__primary-bar"
          ),
          x(p, "style", (m = Object.entries(n[12]).map(Dr).join(" "))),
          x(
            g,
            "class",
            "mdc-linear-progress__bar mdc-linear-progress__secondary-bar"
          ),
          O(i, R);
      },
      m(e, t) {
        v(e, i, t),
          I(i, s),
          I(s, o),
          I(s, c),
          I(s, d),
          I(i, u),
          I(i, p),
          I(p, f),
          I(i, h),
          I(i, g),
          n[19](i),
          N ||
            ((M = [
              $((D = Qe.call(null, i, n[0]))),
              $(n[13].call(null, i)),
              T(i, "transitionend", n[20]),
            ]),
            (N = !0));
      },
      p(e, [t]) {
        2048 & t &&
          l !== (l = Object.entries(e[11]).map(Lr).join(" ")) &&
          x(o, "style", l),
          4096 & t &&
            m !== (m = Object.entries(e[12]).map(Dr).join(" ")) &&
            x(p, "style", m),
          O(
            i,
            (R = le(w, [
              282 & t &&
                E !==
                  (E = ze({
                    [e[1]]: !0,
                    "mdc-linear-progress": !0,
                    "mdc-linear-progress--indeterminate": e[3],
                    "mdc-linear-progress--closed": e[4],
                    "mdc-data-table__linear-progress": "data-table" === e[14],
                    ...e[8],
                  })) && { class: E },
              1028 & t &&
                A !==
                  (A = Object.entries(e[10])
                    .map(Nr)
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
          D && r(D.update) && 1 & t && D.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && b(i), n[19](null), (N = !1), a(M);
      },
    };
  }
  const Lr = ([e, t]) => `${e}: ${t};`,
    Dr = ([e, t]) => `${e}: ${t};`,
    Nr = ([e, t]) => `${e}: ${t};`;
  function Mr(e, n, i) {
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
    let r,
      s = m(n, a);
    const l = Xe(R());
    let c,
      d,
      { use: u = [] } = n,
      { class: p = "" } = n,
      { style: h = "" } = n,
      { indeterminate: $ = !1 } = n,
      { closed: I = !1 } = n,
      { progress: v = 0 } = n,
      { buffer: b } = n,
      E = {},
      y = {},
      A = {},
      C = {},
      _ = {},
      S = H("SMUI:linear-progress:context"),
      T = H("SMUI:linear-progress:closed");
    function x(e) {
      return e in E ? E[e] : U().classList.contains(e);
    }
    function O(e) {
      E[e] || i(8, (E[e] = !0), E);
    }
    function L(e) {
      (e in E && !E[e]) || i(8, (E[e] = !1), E);
    }
    function D(e, t) {
      y[e] !== t && i(9, (y[e] = t), y);
    }
    function N(e) {
      (e in y && null == y[e]) || i(9, (y[e] = void 0), y);
    }
    function M(e, t) {
      A[e] != t &&
        ("" === t || null == t
          ? (delete A[e], i(10, A))
          : i(10, (A[e] = t), A));
    }
    function w(e, t) {
      C[e] != t &&
        ("" === t || null == t
          ? (delete C[e], i(11, C))
          : i(11, (C[e] = t), C));
    }
    function k(e, t) {
      _[e] != t &&
        ("" === t || null == t
          ? (delete _[e], i(12, _))
          : i(12, (_[e] = t), _));
    }
    function U() {
      return c;
    }
    o(e, T, (e) => i(21, (r = e))),
      F(
        () => (
          i(
            6,
            (d = new xr({
              addClass: O,
              forceLayout: () => {
                U().getBoundingClientRect();
              },
              setBufferBarStyle: w,
              setPrimaryBarStyle: k,
              hasClass: x,
              removeAttribute: N,
              removeClass: L,
              setAttribute: D,
              setStyle: M,
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
          d.init(),
          () => {
            d.destroy();
          }
        )
      );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(16, (s = m(n, a))),
          "use" in e && i(0, (u = e.use)),
          "class" in e && i(1, (p = e.class)),
          "style" in e && i(2, (h = e.style)),
          "indeterminate" in e && i(3, ($ = e.indeterminate)),
          "closed" in e && i(4, (I = e.closed)),
          "progress" in e && i(5, (v = e.progress)),
          "buffer" in e && i(17, (b = e.buffer));
      }),
      (e.$$.update = () => {
        16 & e.$$.dirty && T && g(T, (r = I), r),
          72 & e.$$.dirty &&
            d &&
            d.isDeterminate() !== !$ &&
            d.setDeterminate(!$),
          96 & e.$$.dirty && d && d.getProgress() !== v && d.setProgress(v),
          131136 & e.$$.dirty &&
            d &&
            (null == b ? d.setBuffer(1) : d.setBuffer(b)),
          80 & e.$$.dirty && d && (I ? d.close() : d.open());
      }),
      [
        u,
        p,
        h,
        $,
        I,
        v,
        d,
        c,
        E,
        y,
        A,
        C,
        _,
        l,
        S,
        T,
        s,
        b,
        U,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (c = e), i(7, c);
          });
        },
        () => d && d.handleTransitionEnd(),
      ]
    );
  }
  class wr extends he {
    constructor(e) {
      super(),
        me(this, e, Mr, Or, s, {
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
  var Rr,
    Fr = (function () {
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
    kr = {
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
    Ur = {
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
    Pr = {
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
  })(Rr || (Rr = {}));
  var Hr = (function (e) {
    function t(n) {
      var i = e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
      return (
        (i.dialogOpen = !1),
        (i.isFullscreen = !1),
        (i.animationFrame = 0),
        (i.animationTimer = 0),
        (i.escapeKeyAction = Ur.CLOSE_ACTION),
        (i.scrimClickAction = Ur.CLOSE_ACTION),
        (i.autoStackButtons = !0),
        (i.areButtonsStacked = !1),
        (i.suppressDefaultPressSelector = Ur.SUPPRESS_DEFAULT_PRESS_SELECTOR),
        (i.animFrame = new Fr()),
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
      $e(t, e),
      Object.defineProperty(t, "cssClasses", {
        get: function () {
          return kr;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "strings", {
        get: function () {
          return Ur;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "numbers", {
        get: function () {
          return Pr;
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
        this.adapter.hasClass(kr.STACKED) && this.setAutoStackButtons(!1),
          (this.isFullscreen = this.adapter.hasClass(kr.FULLSCREEN));
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
          this.adapter.addClass(kr.OPENING),
          this.isFullscreen &&
            this.adapter.registerContentEventHandler(
              "scroll",
              this.contentScrollHandler
            ),
          e &&
            e.isAboveFullscreenDialog &&
            this.adapter.addClass(kr.SCRIM_HIDDEN),
          this.adapter.registerWindowEventHandler(
            "resize",
            this.windowResizeHandler
          ),
          this.adapter.registerWindowEventHandler(
            "orientationchange",
            this.windowOrientationChangeHandler
          ),
          this.runNextAnimationFrame(function () {
            t.adapter.addClass(kr.OPEN),
              t.adapter.addBodyClass(kr.SCROLL_LOCK),
              t.layout(),
              (t.animationTimer = setTimeout(function () {
                t.handleAnimationTimerEnd(),
                  t.adapter.trapFocus(t.adapter.getInitialFocusEl()),
                  t.adapter.notifyOpened();
              }, Pr.DIALOG_ANIMATION_OPEN_TIME_MS));
          });
      }),
      (t.prototype.close = function (e) {
        var t = this;
        void 0 === e && (e = ""),
          this.dialogOpen &&
            ((this.dialogOpen = !1),
            this.adapter.notifyClosing(e),
            this.adapter.addClass(kr.CLOSING),
            this.adapter.removeClass(kr.OPEN),
            this.adapter.removeBodyClass(kr.SCROLL_LOCK),
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
            }, Pr.DIALOG_ANIMATION_CLOSE_TIME_MS)));
      }),
      (t.prototype.showSurfaceScrim = function () {
        var e = this;
        this.adapter.addClass(kr.SURFACE_SCRIM_SHOWING),
          this.runNextAnimationFrame(function () {
            e.adapter.addClass(kr.SURFACE_SCRIM_SHOWN);
          });
      }),
      (t.prototype.hideSurfaceScrim = function () {
        this.adapter.removeClass(kr.SURFACE_SCRIM_SHOWN),
          this.adapter.addClass(kr.SURFACE_SCRIM_HIDING);
      }),
      (t.prototype.handleSurfaceScrimTransitionEnd = function () {
        this.adapter.removeClass(kr.SURFACE_SCRIM_HIDING),
          this.adapter.removeClass(kr.SURFACE_SCRIM_SHOWING);
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
        this.animFrame.request(Rr.POLL_LAYOUT_CHANGE, function () {
          e.layoutInternal();
        });
      }),
      (t.prototype.handleClick = function (e) {
        if (
          this.adapter.eventTargetMatches(e.target, Ur.SCRIM_SELECTOR) &&
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
        this.animFrame.request(Rr.POLL_SCROLL_POS, function () {
          e.toggleScrollDividerHeader(), e.toggleScrollDividerFooter();
        });
      }),
      (t.prototype.layoutInternal = function () {
        this.autoStackButtons && this.detectStackedButtons(),
          this.toggleScrollableClasses();
      }),
      (t.prototype.handleAnimationTimerEnd = function () {
        (this.animationTimer = 0),
          this.adapter.removeClass(kr.OPENING),
          this.adapter.removeClass(kr.CLOSING);
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
        this.adapter.removeClass(kr.STACKED);
        var e = this.adapter.areButtonsStacked();
        e && this.adapter.addClass(kr.STACKED),
          e !== this.areButtonsStacked &&
            (this.adapter.reverseButtons(), (this.areButtonsStacked = e));
      }),
      (t.prototype.toggleScrollableClasses = function () {
        this.adapter.removeClass(kr.SCROLLABLE),
          this.adapter.isContentScrollable() &&
            (this.adapter.addClass(kr.SCROLLABLE),
            this.isFullscreen &&
              (this.toggleScrollDividerHeader(),
              this.toggleScrollDividerFooter()));
      }),
      (t.prototype.toggleScrollDividerHeader = function () {
        this.adapter.isScrollableContentAtTop()
          ? this.adapter.hasClass(kr.SCROLL_DIVIDER_HEADER) &&
            this.adapter.removeClass(kr.SCROLL_DIVIDER_HEADER)
          : this.adapter.addClass(kr.SCROLL_DIVIDER_HEADER);
      }),
      (t.prototype.toggleScrollDividerFooter = function () {
        this.adapter.isScrollableContentAtBottom()
          ? this.adapter.hasClass(kr.SCROLL_DIVIDER_FOOTER) &&
            this.adapter.removeClass(kr.SCROLL_DIVIDER_FOOTER)
          : this.adapter.addClass(kr.SCROLL_DIVIDER_FOOTER);
      }),
      t
    );
  })(Ae);
  const { document: Br, window: Vr } = oe,
    jr = (e) => ({}),
    zr = (e) => ({});
  function Gr(t) {
    let n, i, a;
    return {
      c() {
        (n = y("div")), x(n, "class", "mdc-dialog__surface-scrim");
      },
      m(e, r) {
        v(e, n, r), i || ((a = T(n, "transitionend", t[31])), (i = !0));
      },
      p: e,
      d(e) {
        e && b(n), (i = !1), a();
      },
    };
  }
  function qr(e) {
    let n, i, s, o, c, f, m, h, g, E, A, C, S, L, D;
    const N = e[27].default,
      M = l(N, e, e[26], null);
    let w = e[5] && Gr(e),
      R = [
        { class: (f = ze({ [e[7]]: !0, "mdc-dialog__surface": !0 })) },
        { role: "alertdialog" },
        { "aria-modal": "true" },
        Ye(e[17], "surface$"),
      ],
      F = {};
    for (let e = 0; e < R.length; e += 1) F = t(F, R[e]);
    let k = [
        { class: (m = ze({ [e[6]]: !0, "mdc-dialog__container": !0 })) },
        Ye(e[17], "container$"),
      ],
      U = {};
    for (let e = 0; e < k.length; e += 1) U = t(U, k[e]);
    let P = [
        {
          class: (E = ze({
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
        qe(e[17], ["container$", "surface$"]),
      ],
      H = {};
    for (let e = 0; e < P.length; e += 1) H = t(H, P[e]);
    const B = e[27].over,
      V = l(B, e, e[26], zr);
    return {
      c() {
        (n = _()),
          (i = y("div")),
          (s = y("div")),
          (o = y("div")),
          M && M.c(),
          (c = _()),
          w && w.c(),
          (h = _()),
          (g = y("div")),
          (C = _()),
          V && V.c(),
          O(o, F),
          O(s, U),
          x(g, "class", "mdc-dialog__scrim"),
          O(i, H);
      },
      m(t, a) {
        v(t, n, a),
          v(t, i, a),
          I(i, s),
          I(s, o),
          M && M.m(o, null),
          I(o, c),
          w && w.m(o, null),
          I(i, h),
          I(i, g),
          e[32](i),
          v(t, C, a),
          V && V.m(t, a),
          (S = !0),
          L ||
            ((D = [
              T(Vr, "resize", e[28]),
              T(Vr, "orientationchange", e[29]),
              T(Br.body, "keydown", e[30]),
              $((A = Qe.call(null, i, e[1]))),
              $(e[11].call(null, i)),
              T(i, "SMUIDialog:opening", e[14]),
              T(i, "SMUIDialog:opened", e[15]),
              T(i, "SMUIDialog:closed", e[16]),
              T(i, "click", e[33]),
              T(i, "keydown", e[34]),
            ]),
            (L = !0));
      },
      p(e, t) {
        M &&
          M.p &&
          (!S || 67108864 & t[0]) &&
          u(M, N, e, e[26], S ? d(N, e[26], t, null) : p(e[26]), null),
          e[5]
            ? w
              ? w.p(e, t)
              : ((w = Gr(e)), w.c(), w.m(o, null))
            : w && (w.d(1), (w = null)),
          O(
            o,
            (F = le(R, [
              (!S ||
                (128 & t[0] &&
                  f !==
                    (f = ze({ [e[7]]: !0, "mdc-dialog__surface": !0 })))) && {
                class: f,
              },
              { role: "alertdialog" },
              { "aria-modal": "true" },
              131072 & t[0] && Ye(e[17], "surface$"),
            ]))
          ),
          O(
            s,
            (U = le(k, [
              (!S ||
                (64 & t[0] &&
                  m !==
                    (m = ze({ [e[6]]: !0, "mdc-dialog__container": !0 })))) && {
                class: m,
              },
              131072 & t[0] && Ye(e[17], "container$"),
            ]))
          ),
          O(
            i,
            (H = le(P, [
              (!S ||
                (1084 & t[0] &&
                  E !==
                    (E = ze({
                      [e[2]]: !0,
                      "mdc-dialog": !0,
                      "mdc-dialog--stacked": !e[4],
                      "mdc-dialog--fullscreen": e[5],
                      "smui-dialog--selection": e[3],
                      ...e[10],
                    })))) && { class: E },
              { role: "alertdialog" },
              { "aria-modal": "true" },
              131072 & t[0] && qe(e[17], ["container$", "surface$"]),
            ]))
          ),
          A && r(A.update) && 2 & t[0] && A.update.call(null, e[1]),
          V &&
            V.p &&
            (!S || 67108864 & t[0]) &&
            u(V, B, e, e[26], S ? d(B, e[26], t, jr) : p(e[26]), zr);
      },
      i(e) {
        S || (re(M, e), re(V, e), (S = !0));
      },
      o(e) {
        se(M, e), se(V, e), (S = !1);
      },
      d(t) {
        t && b(n),
          t && b(i),
          M && M.d(t),
          w && w.d(),
          e[32](null),
          t && b(C),
          V && V.d(t),
          (L = !1),
          a(D);
      },
    };
  }
  function Kr(e, n, i) {
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
    let r,
      s,
      l = m(n, a),
      { $$slots: c = {}, $$scope: d } = n;
    var u;
    const { FocusTrap: p } = pn,
      { closest: h, matches: $ } = Te,
      I = Xe(R());
    let v,
      b,
      E,
      { use: y = [] } = n,
      { class: A = "" } = n,
      { open: C = !1 } = n,
      { selection: _ = !1 } = n,
      { escapeKeyAction: S = "close" } = n,
      { scrimClickAction: T = "close" } = n,
      { autoStackButtons: x = !0 } = n,
      { fullscreen: O = !1 } = n,
      { container$class: L = "" } = n,
      { surface$class: D = "" } = n,
      N = {},
      M = je(!1);
    o(e, M, (e) => i(38, (s = e)));
    let w = H("SMUI:dialog:aboveFullscreen"),
      U =
        null !== (u = H("SMUI:dialog:aboveFullscreenShown")) && void 0 !== u
          ? u
          : je(!1);
    o(e, U, (e) => i(25, (r = e)));
    let B,
      V = H("SMUI:addLayoutListener"),
      z = [];
    P("SMUI:dialog:actions:reversed", M),
      P(
        "SMUI:addLayoutListener",
        (e) => (
          z.push(e),
          () => {
            const t = z.indexOf(e);
            t >= 0 && z.splice(t, 1);
          }
        )
      ),
      P("SMUI:dialog:selection", _),
      P("SMUI:dialog:aboveFullscreen", w || O),
      P("SMUI:dialog:aboveFullscreenShown", U),
      V && (B = V(Q));
    let G = r;
    function q(e) {
      return e in N ? N[e] : Z().classList.contains(e);
    }
    function K(e) {
      N[e] || i(10, (N[e] = !0), N);
    }
    function W(e) {
      (e in N && !N[e]) || i(10, (N[e] = !1), N);
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
    function Z() {
      return v;
    }
    F(() => {
      var e;
      return (
        (E = new p(v, {
          initialFocusEl: null !== (e = Y()) && void 0 !== e ? e : void 0,
        })),
        i(
          8,
          (b = new Hr({
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
                Ge(
                  Z(),
                  "SMUIDialog:closed",
                  e ? { action: e } : {},
                  void 0,
                  !0
                );
            },
            notifyClosing: (e) =>
              Ge(Z(), "SMUIDialog:closing", e ? { action: e } : {}, void 0, !0),
            notifyOpened: () => Ge(Z(), "SMUIDialog:opened", {}, void 0, !0),
            notifyOpening: () => Ge(Z(), "SMUIDialog:opening", {}, void 0, !0),
            releaseFocus: () => E.releaseFocus(),
            removeBodyClass: (e) => document.body.classList.remove(e),
            removeClass: W,
            reverseButtons: () => {
              g(M, (s = !0), s);
            },
            trapFocus: () => E.trapFocus(),
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
      k(() => {
        B && B();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(17, (l = m(n, a))),
          "use" in e && i(1, (y = e.use)),
          "class" in e && i(2, (A = e.class)),
          "open" in e && i(0, (C = e.open)),
          "selection" in e && i(3, (_ = e.selection)),
          "escapeKeyAction" in e && i(18, (S = e.escapeKeyAction)),
          "scrimClickAction" in e && i(19, (T = e.scrimClickAction)),
          "autoStackButtons" in e && i(4, (x = e.autoStackButtons)),
          "fullscreen" in e && i(5, (O = e.fullscreen)),
          "container$class" in e && i(6, (L = e.container$class)),
          "surface$class" in e && i(7, (D = e.surface$class)),
          "$$scope" in e && i(26, (d = e.$$scope));
      }),
      (e.$$.update = () => {
        262400 & e.$$.dirty[0] &&
          b &&
          b.getEscapeKeyAction() !== S &&
          b.setEscapeKeyAction(S),
          524544 & e.$$.dirty[0] &&
            b &&
            b.getScrimClickAction() !== T &&
            b.setScrimClickAction(T),
          272 & e.$$.dirty[0] &&
            b &&
            b.getAutoStackButtons() !== x &&
            b.setAutoStackButtons(x),
          16 & e.$$.dirty[0] && (x || g(M, (s = !0), s)),
          257 & e.$$.dirty[0] &&
            b &&
            b.isOpen() !== C &&
            (C ? b.open({ isAboveFullscreenDialog: !!w }) : b.close()),
          50331936 & e.$$.dirty[0] &&
            O &&
            b &&
            G !== r &&
            (i(24, (G = r)), r ? b.showSurfaceScrim() : b.hideSurfaceScrim());
      }),
      [
        C,
        y,
        A,
        _,
        x,
        O,
        L,
        D,
        b,
        v,
        N,
        I,
        M,
        U,
        function () {
          w && g(U, (r = !0), r),
            requestAnimationFrame(() => {
              z.forEach((e) => e());
            });
        },
        function () {
          z.forEach((e) => e());
        },
        function () {
          w && g(U, (r = !1), r);
        },
        l,
        S,
        T,
        function () {
          return C;
        },
        function (e) {
          i(0, (C = e));
        },
        Q,
        Z,
        G,
        r,
        d,
        c,
        () => C && b && b.layout(),
        () => C && b && b.layout(),
        (e) => C && b && b.handleDocumentKeydown(e),
        () => b && b.handleSurfaceScrimTransitionEnd(),
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (v = e), i(9, v);
          });
        },
        (e) => b && b.handleClick(e),
        (e) => b && b.handleKeydown(e),
      ]
    );
  }
  class Wr extends he {
    constructor(e) {
      super(),
        me(
          this,
          e,
          Kr,
          qr,
          s,
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
  pt({
    class: "mdc-dialog__header",
    component: wt,
    contexts: { "SMUI:icon-button:context": "dialog:header" },
  });
  var Xr = pt({ class: "mdc-dialog__title", component: Ft }),
    Yr = pt({ class: "mdc-dialog__content", component: wt }),
    Qr = pt({
      class: "mdc-dialog__actions",
      component: wt,
      classMap: {
        "smui-dialog__actions--reversed": "SMUI:dialog:actions:reversed",
      },
      contexts: { "SMUI:button:context": "dialog:action" },
    }),
    Zr = {
      CLOSING: "mdc-snackbar--closing",
      OPEN: "mdc-snackbar--open",
      OPENING: "mdc-snackbar--opening",
    },
    Jr = {
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
    es = {
      DEFAULT_AUTO_DISMISS_TIMEOUT_MS: 5e3,
      INDETERMINATE: -1,
      MAX_AUTO_DISMISS_TIMEOUT_MS: 1e4,
      MIN_AUTO_DISMISS_TIMEOUT_MS: 4e3,
      SNACKBAR_ANIMATION_CLOSE_TIME_MS: 75,
      SNACKBAR_ANIMATION_OPEN_TIME_MS: 150,
      ARIA_LIVE_DELAY_MS: 1e3,
    },
    ts = es.ARIA_LIVE_DELAY_MS,
    ns = Jr.ARIA_LIVE_LABEL_TEXT_ATTR;
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
  var is = Zr.OPENING,
    as = Zr.OPEN,
    rs = Zr.CLOSING,
    ss = Jr.REASON_ACTION,
    os = Jr.REASON_DISMISS,
    ls = (function (e) {
      function t(n) {
        var i = e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
        return (
          (i.opened = !1),
          (i.animationFrame = 0),
          (i.animationTimer = 0),
          (i.autoDismissTimer = 0),
          (i.autoDismissTimeoutMs = es.DEFAULT_AUTO_DISMISS_TIMEOUT_MS),
          (i.closeOnEscape = !0),
          i
        );
      }
      return (
        $e(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Zr;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Jr;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return es;
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
            this.adapter.removeClass(is),
            this.adapter.removeClass(as),
            this.adapter.removeClass(rs);
        }),
        (t.prototype.open = function () {
          var e = this;
          this.clearAutoDismissTimer(),
            (this.opened = !0),
            this.adapter.notifyOpening(),
            this.adapter.removeClass(rs),
            this.adapter.addClass(is),
            this.adapter.announce(),
            this.runNextAnimationFrame(function () {
              e.adapter.addClass(as),
                (e.animationTimer = setTimeout(function () {
                  var t = e.getTimeoutMs();
                  e.handleAnimationTimerEnd(),
                    e.adapter.notifyOpened(),
                    t !== es.INDETERMINATE &&
                      (e.autoDismissTimer = setTimeout(function () {
                        e.close(os);
                      }, t));
                }, es.SNACKBAR_ANIMATION_OPEN_TIME_MS));
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
              this.adapter.addClass(Zr.CLOSING),
              this.adapter.removeClass(Zr.OPEN),
              this.adapter.removeClass(Zr.OPENING),
              clearTimeout(this.animationTimer),
              (this.animationTimer = setTimeout(function () {
                t.handleAnimationTimerEnd(), t.adapter.notifyClosed(e);
              }, es.SNACKBAR_ANIMATION_CLOSE_TIME_MS)));
        }),
        (t.prototype.isOpen = function () {
          return this.opened;
        }),
        (t.prototype.getTimeoutMs = function () {
          return this.autoDismissTimeoutMs;
        }),
        (t.prototype.setTimeoutMs = function (e) {
          var t = es.MIN_AUTO_DISMISS_TIMEOUT_MS,
            n = es.MAX_AUTO_DISMISS_TIMEOUT_MS;
          if (!(e === es.INDETERMINATE || (e <= n && e >= t)))
            throw new Error(
              "\n        timeoutMs must be an integer in the range " +
                t +
                "–" +
                n +
                "\n        (or " +
                es.INDETERMINATE +
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
            this.close(os);
        }),
        (t.prototype.handleActionButtonClick = function (e) {
          this.close(ss);
        }),
        (t.prototype.handleActionIconClick = function (e) {
          this.close(os);
        }),
        (t.prototype.clearAutoDismissTimer = function () {
          clearTimeout(this.autoDismissTimer), (this.autoDismissTimer = 0);
        }),
        (t.prototype.handleAnimationTimerEnd = function () {
          (this.animationTimer = 0),
            this.adapter.removeClass(Zr.OPENING),
            this.adapter.removeClass(Zr.CLOSING);
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
    })(Ae);
  function cs(e) {
    let n, i, s, o, c, f, m, h, g;
    const E = e[25].default,
      A = l(E, e, e[24], null);
    let C = [
        { class: (s = ze({ [e[4]]: !0, "mdc-snackbar__surface": !0 })) },
        { role: "status" },
        { "aria-relevant": "additions" },
        Ye(e[12], "surface$"),
      ],
      _ = {};
    for (let e = 0; e < C.length; e += 1) _ = t(_, C[e]);
    let S = [
        {
          class: (c = ze({
            [e[1]]: !0,
            "mdc-snackbar": !0,
            "mdc-snackbar--stacked": "stacked" === e[2],
            "mdc-snackbar--leading": e[3],
            ...e[8],
          })),
        },
        qe(e[12], ["surface$"]),
      ],
      x = {};
    for (let e = 0; e < S.length; e += 1) x = t(x, S[e]);
    return {
      c() {
        (n = y("aside")), (i = y("div")), A && A.c(), O(i, _), O(n, x);
      },
      m(t, a) {
        v(t, n, a),
          I(n, i),
          A && A.m(i, null),
          e[26](n),
          (m = !0),
          h ||
            ((g = [
              $((o = Qe.call(null, i, e[5]))),
              T(i, "click", e[10]),
              $((f = Qe.call(null, n, e[0]))),
              $(e[9].call(null, n)),
              T(n, "SMUISnackbar:closed", e[11]),
              T(n, "keydown", e[27]),
            ]),
            (h = !0));
      },
      p(e, t) {
        A &&
          A.p &&
          (!m || 16777216 & t[0]) &&
          u(A, E, e, e[24], m ? d(E, e[24], t, null) : p(e[24]), null),
          O(
            i,
            (_ = le(C, [
              (!m ||
                (16 & t[0] &&
                  s !==
                    (s = ze({ [e[4]]: !0, "mdc-snackbar__surface": !0 })))) && {
                class: s,
              },
              { role: "status" },
              { "aria-relevant": "additions" },
              4096 & t[0] && Ye(e[12], "surface$"),
            ]))
          ),
          o && r(o.update) && 32 & t[0] && o.update.call(null, e[5]),
          O(
            n,
            (x = le(S, [
              (!m ||
                (270 & t[0] &&
                  c !==
                    (c = ze({
                      [e[1]]: !0,
                      "mdc-snackbar": !0,
                      "mdc-snackbar--stacked": "stacked" === e[2],
                      "mdc-snackbar--leading": e[3],
                      ...e[8],
                    })))) && { class: c },
              4096 & t[0] && qe(e[12], ["surface$"]),
            ]))
          ),
          f && r(f.update) && 1 & t[0] && f.update.call(null, e[0]);
      },
      i(e) {
        m || (re(A, e), (m = !0));
      },
      o(e) {
        se(A, e), (m = !1);
      },
      d(t) {
        t && b(n), A && A.d(t), e[26](null), (h = !1), a(g);
      },
    };
  }
  let ds = Promise.resolve();
  function us(e, n, i) {
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
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const { closest: l } = Te,
      c = Xe(R());
    let d = () => {};
    function u(e) {
      return e === d;
    }
    let p,
      h,
      g,
      { use: $ = [] } = n,
      { class: I = "" } = n,
      { variant: v = "" } = n,
      { leading: b = !1 } = n,
      { timeoutMs: E = 5e3 } = n,
      { closeOnEscape: y = !0 } = n,
      { labelText: A = d } = n,
      { actionButtonText: C = d } = n,
      { surface$class: _ = "" } = n,
      { surface$use: S = [] } = n,
      T = {},
      x = new Promise((e) => (g = e));
    function O(e) {
      T[e] || i(8, (T[e] = !0), T);
    }
    function L(e) {
      (e in T && !T[e]) || i(8, (T[e] = !1), T);
    }
    function D() {
      var e;
      return null !== (e = M().querySelector(".mdc-snackbar__label")) &&
        void 0 !== e
        ? e
        : document.createElement("div");
    }
    function N() {
      var e;
      return null !== (e = M().querySelector(".mdc-snackbar__action")) &&
        void 0 !== e
        ? e
        : document.createElement("button");
    }
    function M() {
      return p;
    }
    P("SMUI:label:context", "snackbar"),
      F(
        () => (
          i(
            6,
            (h = new ls({
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
                    t.setAttribute(ns, i),
                    setTimeout(function () {
                      e.setAttribute("aria-live", n),
                        t.removeAttribute(ns),
                        (t.textContent = i);
                    }, ts));
                })(D()),
              notifyClosed: (e) =>
                Ge(
                  M(),
                  "SMUISnackbar:closed",
                  e ? { reason: e } : {},
                  void 0,
                  !0
                ),
              notifyClosing: (e) =>
                Ge(
                  M(),
                  "SMUISnackbar:closing",
                  e ? { reason: e } : {},
                  void 0,
                  !0
                ),
              notifyOpened: () =>
                Ge(M(), "SMUISnackbar:opened", void 0, void 0, !0),
              notifyOpening: () =>
                Ge(M(), "SMUISnackbar:opening", void 0, void 0, !0),
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
          i(12, (r = m(n, a))),
          "use" in e && i(0, ($ = e.use)),
          "class" in e && i(1, (I = e.class)),
          "variant" in e && i(2, (v = e.variant)),
          "leading" in e && i(3, (b = e.leading)),
          "timeoutMs" in e && i(13, (E = e.timeoutMs)),
          "closeOnEscape" in e && i(14, (y = e.closeOnEscape)),
          "labelText" in e && i(15, (A = e.labelText)),
          "actionButtonText" in e && i(16, (C = e.actionButtonText)),
          "surface$class" in e && i(4, (_ = e.surface$class)),
          "surface$use" in e && i(5, (S = e.surface$use)),
          "$$scope" in e && i(24, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        8256 & e.$$.dirty[0] &&
          h &&
          h.getTimeoutMs() !== E &&
          h.setTimeoutMs(E),
          16448 & e.$$.dirty[0] &&
            h &&
            h.getCloseOnEscape() !== y &&
            h.setCloseOnEscape(y),
          32832 & e.$$.dirty[0] &&
            h &&
            !u(A) &&
            D().textContent !== A &&
            (D().textContent = A),
          65600 & e.$$.dirty[0] &&
            h &&
            !u(C) &&
            N().textContent !== C &&
            (N().textContent = C);
      }),
      [
        $,
        I,
        v,
        b,
        _,
        S,
        h,
        p,
        T,
        c,
        function (e) {
          const t = e.target;
          h &&
            (l(t, ".mdc-snackbar__action")
              ? h.handleActionButtonClick(e)
              : l(t, ".mdc-snackbar__dismiss") && h.handleActionIconClick(e));
        },
        function () {
          g(), (x = new Promise((e) => (g = e)));
        },
        r,
        E,
        y,
        A,
        C,
        function () {
          ds = ds.then(() => (h.open(), x));
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
        D,
        N,
        M,
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (p = e), i(7, p);
          });
        },
        (e) => h && h.handleKeyDown(e),
      ]
    );
  }
  class ps extends he {
    constructor(e) {
      super(),
        me(
          this,
          e,
          us,
          cs,
          s,
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
  var fs = pt({
    class: "mdc-snackbar__actions",
    props: { "aria-atomic": "true" },
    contexts: {
      "SMUI:button:context": "snackbar:actions",
      "SMUI:icon-button:context": "snackbar:actions",
      "SMUI:label:context": void 0,
    },
    component: wt,
  });
  function ms(e) {
    let t;
    return {
      c() {
        (t = y("div")), x(t, "class", "mdc-button__touch");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function hs(e) {
    let t, n, i, a;
    const r = e[27].default,
      s = l(r, e, e[29], null);
    let o = e[6] && ms();
    return {
      c() {
        (t = y("div")),
          (n = _()),
          s && s.c(),
          o && o.c(),
          (i = S()),
          x(t, "class", "mdc-button__ripple");
      },
      m(e, r) {
        v(e, t, r),
          v(e, n, r),
          s && s.m(e, r),
          o && o.m(e, r),
          v(e, i, r),
          (a = !0);
      },
      p(e, t) {
        s &&
          s.p &&
          (!a || 536870912 & t) &&
          u(s, r, e, e[29], a ? d(r, e[29], t, null) : p(e[29]), null),
          e[6]
            ? o || ((o = ms()), o.c(), o.m(i.parentNode, i))
            : o && (o.d(1), (o = null));
      },
      i(e) {
        a || (re(s, e), (a = !0));
      },
      o(e) {
        se(s, e), (a = !1);
      },
      d(e) {
        e && b(t), e && b(n), s && s.d(e), o && o.d(e), e && b(i);
      },
    };
  }
  function gs(e) {
    let n, i, a;
    const r = [
      {
        use: [
          [
            ti,
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
        class: ze({
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
      { style: Object.entries(e[12]).map($s).concat([e[2]]).join(" ") },
      e[15],
      e[14],
      e[13],
      { href: e[7] },
      e[22],
    ];
    var s = e[9];
    function o(e) {
      let n = { $$slots: { default: [hs] }, $$scope: { ctx: e } };
      for (let e = 0; e < r.length; e += 1) n = t(n, r[e]);
      return { props: n };
    }
    return (
      s && ((n = new s(o(e))), e[28](n), n.$on("click", e[21])),
      {
        c() {
          n && ue(n.$$.fragment), (i = S());
        },
        m(e, t) {
          n && pe(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, [t]) {
          const a =
            6289919 & t
              ? le(r, [
                  6094873 & t && {
                    use: [
                      [
                        ti,
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
                    class: ze({
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
                      .map($s)
                      .concat([e[2]])
                      .join(" "),
                  },
                  32768 & t && ce(e[15]),
                  16384 & t && ce(e[14]),
                  8192 & t && ce(e[13]),
                  128 & t && { href: e[7] },
                  4194304 & t && ce(e[22]),
                ])
              : {};
          if (
            (536870976 & t && (a.$$scope = { dirty: t, ctx: e }),
            s !== (s = e[9]))
          ) {
            if (n) {
              ie();
              const e = n;
              se(e.$$.fragment, 1, 0, () => {
                fe(e, 1);
              }),
                ae();
            }
            s
              ? ((n = new s(o(e))),
                e[28](n),
                n.$on("click", e[21]),
                ue(n.$$.fragment),
                re(n.$$.fragment, 1),
                pe(n, i.parentNode, i))
              : (n = null);
          } else s && n.$set(a);
        },
        i(e) {
          a || (n && re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && se(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[28](null), t && b(i), n && fe(n, t);
        },
      }
    );
  }
  const $s = ([e, t]) => `${e}: ${t};`;
  function Is(e, n, i) {
    let a, r, s;
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
      { $$slots: c = {}, $$scope: d } = n;
    const u = Xe(R());
    let p,
      { use: h = [] } = n,
      { class: g = "" } = n,
      { style: $ = "" } = n,
      { ripple: I = !0 } = n,
      { color: v = "primary" } = n,
      { variant: b = "text" } = n,
      { touch: E = !1 } = n,
      { href: y } = n,
      { action: A = "close" } = n,
      { defaultAction: C = !1 } = n,
      { secondary: _ = !1 } = n,
      S = {},
      T = {},
      x = H("SMUI:button:context"),
      { component: O = null == y ? Mt : Nt } = n,
      L = l.disabled;
    function D() {
      return p.getElement();
    }
    return (
      P("SMUI:label:context", "button"),
      P("SMUI:icon:context", "button"),
      (e.$$set = (e) => {
        i(30, (n = t(t({}, n), f(e)))),
          i(22, (l = m(n, o))),
          "use" in e && i(0, (h = e.use)),
          "class" in e && i(1, (g = e.class)),
          "style" in e && i(2, ($ = e.style)),
          "ripple" in e && i(3, (I = e.ripple)),
          "color" in e && i(4, (v = e.color)),
          "variant" in e && i(5, (b = e.variant)),
          "touch" in e && i(6, (E = e.touch)),
          "href" in e && i(7, (y = e.href)),
          "action" in e && i(23, (A = e.action)),
          "defaultAction" in e && i(24, (C = e.defaultAction)),
          "secondary" in e && i(8, (_ = e.secondary)),
          "component" in e && i(9, (O = e.component)),
          "$$scope" in e && i(29, (d = e.$$scope));
      }),
      (e.$$.update = () => {
        i(
          15,
          (a =
            "dialog:action" === x && null != A
              ? { "data-mdc-dialog-action": A }
              : { action: n.action })
        ),
          i(
            14,
            (r =
              "dialog:action" === x && C
                ? { "data-mdc-dialog-button-default": "" }
                : { default: n.default })
          ),
          i(13, (s = "banner" === x ? {} : { secondary: n.secondary })),
          L !== l.disabled && (D().blur(), i(26, (L = l.disabled)));
      }),
      (n = f(n)),
      [
        h,
        g,
        $,
        I,
        v,
        b,
        E,
        y,
        _,
        O,
        p,
        S,
        T,
        s,
        r,
        a,
        u,
        x,
        function (e) {
          S[e] || i(11, (S[e] = !0), S);
        },
        function (e) {
          (e in S && !S[e]) || i(11, (S[e] = !1), S);
        },
        function (e, t) {
          T[e] != t &&
            ("" === t || null == t
              ? (delete T[e], i(12, T))
              : i(12, (T[e] = t), T));
        },
        function () {
          "banner" === x &&
            Ge(
              D(),
              _
                ? "SMUIBannerButton:secondaryActionClick"
                : "SMUIBannerButton:primaryActionClick"
            );
        },
        l,
        A,
        C,
        D,
        L,
        c,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (p = e), i(10, p);
          });
        },
        d,
      ]
    );
  }
  class vs extends he {
    constructor(e) {
      super(),
        me(this, e, Is, gs, s, {
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
  var bs = new Map([
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
  function Es(e, t) {
    var n = (function (e) {
      var t = e.name;
      if (t && -1 !== t.lastIndexOf(".") && !e.type) {
        var n = t.split(".").pop().toLowerCase(),
          i = bs.get(n);
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
  var ys = [".DS_Store", "Thumbs.db"];
  function As(e) {
    return ve(this, void 0, void 0, function () {
      return be(this, function (t) {
        return [
          2,
          ((n = e),
          n.dataTransfer && e.dataTransfer
            ? _s(e.dataTransfer, e.type)
            : Cs(e)),
        ];
        var n;
      });
    });
  }
  function Cs(e) {
    return (null !== e.target && e.target.files ? Ts(e.target.files) : []).map(
      function (e) {
        return Es(e);
      }
    );
  }
  function _s(e, t) {
    return ve(this, void 0, void 0, function () {
      var n;
      return be(this, function (i) {
        switch (i.label) {
          case 0:
            return e.items
              ? ((n = Ts(e.items).filter(function (e) {
                  return "file" === e.kind;
                })),
                "drop" !== t ? [2, n] : [4, Promise.all(n.map(xs))])
              : [3, 2];
          case 1:
            return [2, Ss(Os(i.sent()))];
          case 2:
            return [
              2,
              Ss(
                Ts(e.files).map(function (e) {
                  return Es(e);
                })
              ),
            ];
        }
      });
    });
  }
  function Ss(e) {
    return e.filter(function (e) {
      return -1 === ys.indexOf(e.name);
    });
  }
  function Ts(e) {
    for (var t = [], n = 0; n < e.length; n++) {
      var i = e[n];
      t.push(i);
    }
    return t;
  }
  function xs(e) {
    if ("function" != typeof e.webkitGetAsEntry) return Ls(e);
    var t = e.webkitGetAsEntry();
    return t && t.isDirectory ? Ns(t) : Ls(e);
  }
  function Os(e) {
    return e.reduce(function (e, t) {
      return (function () {
        for (var e = [], t = 0; t < arguments.length; t++)
          e = e.concat(ye(arguments[t]));
        return e;
      })(e, Array.isArray(t) ? Os(t) : [t]);
    }, []);
  }
  function Ls(e) {
    var t = e.getAsFile();
    if (!t) return Promise.reject(e + " is not a File");
    var n = Es(t);
    return Promise.resolve(n);
  }
  function Ds(e) {
    return ve(this, void 0, void 0, function () {
      return be(this, function (t) {
        return [2, e.isDirectory ? Ns(e) : Ms(e)];
      });
    });
  }
  function Ns(e) {
    var t = e.createReader();
    return new Promise(function (e, n) {
      var i = [];
      !(function a() {
        var r = this;
        t.readEntries(
          function (t) {
            return ve(r, void 0, void 0, function () {
              var r, s, o;
              return be(this, function (l) {
                switch (l.label) {
                  case 0:
                    if (t.length) return [3, 5];
                    l.label = 1;
                  case 1:
                    return l.trys.push([1, 3, , 4]), [4, Promise.all(i)];
                  case 2:
                    return (r = l.sent()), e(r), [3, 4];
                  case 3:
                    return (s = l.sent()), n(s), [3, 4];
                  case 4:
                    return [3, 6];
                  case 5:
                    (o = Promise.all(t.map(Ds))), i.push(o), a(), (l.label = 6);
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
  function Ms(e) {
    return ve(this, void 0, void 0, function () {
      return be(this, function (t) {
        return [
          2,
          new Promise(function (t, n) {
            e.file(
              function (n) {
                var i = Es(n, e.fullPath);
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
  const ws = (e) => {
      e = Array.isArray(e) && 1 === e.length ? e[0] : e;
      return {
        code: "file-invalid-type",
        message: `File type must be ${
          Array.isArray(e) ? `one of ${e.join(", ")}` : e
        }`,
      };
    },
    Rs = (e) => ({
      code: "file-too-large",
      message: `File is larger than ${e} bytes`,
    }),
    Fs = (e) => ({
      code: "file-too-small",
      message: `File is smaller than ${e} bytes`,
    }),
    ks = { code: "too-many-files", message: "Too many files" };
  function Us(e, t) {
    const n =
      "application/x-moz-file" === e.type ||
      (function (e, t) {
        if (e && t) {
          const n = Array.isArray(t) ? t : t.split(","),
            i = e.name || "",
            a = (e.type || "").toLowerCase(),
            r = a.replace(/\/.*$/, "");
          return n.some((e) => {
            const t = e.trim().toLowerCase();
            return "." === t.charAt(0)
              ? i.toLowerCase().endsWith(t)
              : t.endsWith("/*")
              ? r === t.replace(/\/.*$/, "")
              : a === t;
          });
        }
        return !0;
      })(e, t);
    return [n, n ? null : ws(t)];
  }
  function Ps(e) {
    return null != e;
  }
  function Hs(e) {
    return "function" == typeof e.isPropagationStopped
      ? e.isPropagationStopped()
      : void 0 !== e.cancelBubble && e.cancelBubble;
  }
  function Bs(e) {
    return e.dataTransfer
      ? Array.prototype.some.call(
          e.dataTransfer.types,
          (e) => "Files" === e || "application/x-moz-file" === e
        )
      : !!e.target && !!e.target.files;
  }
  function Vs(t) {
    let n, i, r, s, o, c, f;
    const m = t[32].default,
      h = l(m, t, t[31], null),
      g =
        h ||
        (function (t) {
          let n;
          return {
            c() {
              (n = y("p")),
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
        var e, a, o, l;
        (n = y("div")),
          (i = y("input")),
          (r = _()),
          g && g.c(),
          x(i, "accept", t[0]),
          (i.multiple = t[1]),
          x(i, "type", "file"),
          x(i, "name", t[5]),
          x(i, "autocomplete", "off"),
          x(i, "tabindex", "-1"),
          (e = i),
          (a = "display"),
          null === (o = "none")
            ? e.style.removeProperty(a)
            : e.style.setProperty(a, o, l ? "important" : ""),
          x(n, "tabindex", "0"),
          x(
            n,
            "class",
            (s = (t[4] ? "" : "dropzone") + " " + t[2] + " svelte-817dg2")
          ),
          x(n, "style", t[3]);
      },
      m(e, a) {
        v(e, n, a),
          I(n, i),
          t[33](i),
          I(n, r),
          g && g.m(n, null),
          t[34](n),
          (o = !0),
          c ||
            ((f = [
              T(window, "focus", t[21]),
              T(window, "dragover", t[19]),
              T(window, "drop", t[20]),
              T(i, "change", t[15]),
              T(i, "click", js),
              T(n, "keydown", t[17](t[8])),
              T(n, "focus", t[17](t[9])),
              T(n, "blur", t[17](t[10])),
              T(n, "click", t[16](t[11])),
              T(n, "dragenter", t[18](t[12])),
              T(n, "dragover", t[18](t[13])),
              T(n, "dragleave", t[18](t[14])),
              T(n, "drop", t[18](t[15])),
            ]),
            (c = !0));
      },
      p(e, t) {
        (!o || 1 & t[0]) && x(i, "accept", e[0]),
          (!o || 2 & t[0]) && (i.multiple = e[1]),
          (!o || 32 & t[0]) && x(i, "name", e[5]),
          h &&
            h.p &&
            (!o || 1 & t[1]) &&
            u(h, m, e, e[31], o ? d(m, e[31], t, null) : p(e[31]), null),
          (!o ||
            (20 & t[0] &&
              s !==
                (s =
                  (e[4] ? "" : "dropzone") + " " + e[2] + " svelte-817dg2"))) &&
            x(n, "class", s),
          (!o || 8 & t[0]) && x(n, "style", e[3]);
      },
      i(e) {
        o || (re(g, e), (o = !0));
      },
      o(e) {
        se(g, e), (o = !1);
      },
      d(e) {
        e && b(n), t[33](null), g && g.d(e), t[34](null), (c = !1), a(f);
      },
    };
  }
  function js(e) {
    e.stopPropagation();
  }
  function zs(e, t, n) {
    let { $$slots: i = {}, $$scope: a } = t,
      { accept: r } = t,
      { disabled: s = !1 } = t,
      { getFilesFromEvent: o = As } = t,
      { maxSize: l = 1 / 0 } = t,
      { minSize: c = 0 } = t,
      { multiple: d = !0 } = t,
      { preventDropOnDocument: u = !0 } = t,
      { noClick: p = !1 } = t,
      { noKeyboard: f = !1 } = t,
      { noDrag: m = !1 } = t,
      { noDragEventsBubbling: h = !1 } = t,
      { containerClasses: g = "" } = t,
      { containerStyles: $ = "" } = t,
      { disableDefaultStyles: I = !1 } = t,
      { name: v = "" } = t;
    const b = U();
    let E,
      y,
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
      y && (n(7, (y.value = null), y), (A.isFileDialogActive = !0), y.click());
    }
    function _(e) {
      return s ? null : e;
    }
    function S(e) {
      h && e.stopPropagation();
    }
    let T = [];
    return (
      k(() => {
        n(7, (y = null));
      }),
      (e.$$set = (e) => {
        "accept" in e && n(0, (r = e.accept)),
          "disabled" in e && n(22, (s = e.disabled)),
          "getFilesFromEvent" in e && n(23, (o = e.getFilesFromEvent)),
          "maxSize" in e && n(24, (l = e.maxSize)),
          "minSize" in e && n(25, (c = e.minSize)),
          "multiple" in e && n(1, (d = e.multiple)),
          "preventDropOnDocument" in e && n(26, (u = e.preventDropOnDocument)),
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
        r,
        d,
        g,
        $,
        I,
        v,
        E,
        y,
        function (e) {
          E &&
            E.isEqualNode(e.target) &&
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
            S(e),
            (T = [...T, e.target]),
            Bs(e) &&
              Promise.resolve(o(e)).then((t) => {
                (Hs(e) && !h) ||
                  ((A.draggedFiles = t),
                  (A.isDragActive = !0),
                  b("dragenter", { dragEvent: e }));
              });
        },
        function (e) {
          if ((e.preventDefault(), S(e), e.dataTransfer))
            try {
              e.dataTransfer.dropEffect = "copy";
            } catch {}
          return Bs(e) && b("dragover", { dragEvent: e }), !1;
        },
        function (e) {
          e.preventDefault(), S(e);
          const t = T.filter((e) => E && E.contains(e)),
            n = t.indexOf(e.target);
          -1 !== n && t.splice(n, 1),
            (T = t),
            t.length > 0 ||
              ((A.isDragActive = !1),
              (A.draggedFiles = []),
              Bs(e) && b("dragleave", { dragEvent: e }));
        },
        function (e) {
          e.preventDefault(),
            S(e),
            (T = []),
            Bs(e) &&
              (b("filedropped", { event: e }),
              Promise.resolve(o(e)).then((t) => {
                if (Hs(e) && !h) return;
                const n = [],
                  i = [];
                t.forEach((e) => {
                  const [t, a] = Us(e, r),
                    [s, o] = (function (e, t, n) {
                      if (Ps(e.size))
                        if (Ps(t) && Ps(n)) {
                          if (e.size > n) return [!1, Rs(n)];
                          if (e.size < t) return [!1, Fs(t)];
                        } else {
                          if (Ps(t) && e.size < t) return [!1, Fs(t)];
                          if (Ps(n) && e.size > n) return [!1, Rs(n)];
                        }
                      return [!0, null];
                    })(e, c, l);
                  if (t && s) n.push(e);
                  else {
                    const t = [a, o].filter((e) => e);
                    i.push({ file: e, errors: t });
                  }
                }),
                  !d &&
                    n.length > 1 &&
                    (n.forEach((e) => {
                      i.push({ file: e, errors: [ks] });
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
          u && e.preventDefault();
        },
        function (e) {
          u && ((E && E.contains(e.target)) || (e.preventDefault(), (T = [])));
        },
        function () {
          A.isFileDialogActive &&
            setTimeout(() => {
              if (y) {
                const { files: e } = y;
                e.length ||
                  ((A.isFileDialogActive = !1), b("filedialogcancel"));
              }
            }, 300);
        },
        s,
        o,
        l,
        c,
        u,
        p,
        f,
        m,
        h,
        a,
        i,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (y = e), n(7, y);
          });
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (E = e), n(6, E);
          });
        },
      ]
    );
  }
  class Gs extends he {
    constructor(e) {
      super(),
        me(
          this,
          e,
          zs,
          Vs,
          s,
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
   */ var qs = {
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
    Ks = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_CHECKED_INDETERMINATE_VALUE: "mixed",
      DATA_INDETERMINATE_ATTR: "data-indeterminate",
      NATIVE_CONTROL_SELECTOR: ".mdc-checkbox__native-control",
      TRANSITION_STATE_CHECKED: "checked",
      TRANSITION_STATE_INDETERMINATE: "indeterminate",
      TRANSITION_STATE_INIT: "init",
      TRANSITION_STATE_UNCHECKED: "unchecked",
    },
    Ws = { ANIM_END_LATCH_MS: 250 },
    Xs = (function (e) {
      function t(n) {
        var i = e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
        return (
          (i.currentCheckState = Ks.TRANSITION_STATE_INIT),
          (i.currentAnimationClass = ""),
          (i.animEndLatchTimer = 0),
          (i.enableAnimationEndHandler = !1),
          i
        );
      }
      return (
        $e(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return qs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Ks;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Ws;
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
            this.adapter.addClass(qs.UPGRADED);
        }),
        (t.prototype.destroy = function () {
          clearTimeout(this.animEndLatchTimer);
        }),
        (t.prototype.setDisabled = function (e) {
          this.adapter.setNativeControlDisabled(e),
            e
              ? this.adapter.addClass(qs.DISABLED)
              : this.adapter.removeClass(qs.DISABLED);
        }),
        (t.prototype.handleAnimationEnd = function () {
          var e = this;
          this.enableAnimationEndHandler &&
            (clearTimeout(this.animEndLatchTimer),
            (this.animEndLatchTimer = setTimeout(function () {
              e.adapter.removeClass(e.currentAnimationClass),
                (e.enableAnimationEndHandler = !1);
            }, Ws.ANIM_END_LATCH_MS)));
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
              var n = qs.SELECTED;
              t === Ks.TRANSITION_STATE_UNCHECKED
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
          var e = Ks.TRANSITION_STATE_INDETERMINATE,
            t = Ks.TRANSITION_STATE_CHECKED,
            n = Ks.TRANSITION_STATE_UNCHECKED;
          return this.adapter.isIndeterminate()
            ? e
            : this.adapter.isChecked()
            ? t
            : n;
        }),
        (t.prototype.getTransitionAnimationClass = function (e, n) {
          var i = Ks.TRANSITION_STATE_INIT,
            a = Ks.TRANSITION_STATE_CHECKED,
            r = Ks.TRANSITION_STATE_UNCHECKED,
            s = t.cssClasses,
            o = s.ANIM_UNCHECKED_CHECKED,
            l = s.ANIM_UNCHECKED_INDETERMINATE,
            c = s.ANIM_CHECKED_UNCHECKED,
            d = s.ANIM_CHECKED_INDETERMINATE,
            u = s.ANIM_INDETERMINATE_CHECKED,
            p = s.ANIM_INDETERMINATE_UNCHECKED;
          switch (e) {
            case i:
              return n === r ? "" : n === a ? u : p;
            case r:
              return n === a ? o : l;
            case a:
              return n === r ? c : d;
            default:
              return n === a ? u : p;
          }
        }),
        (t.prototype.updateAriaChecked = function () {
          this.adapter.isIndeterminate()
            ? this.adapter.setNativeControlAttr(
                Ks.ARIA_CHECKED_ATTR,
                Ks.ARIA_CHECKED_INDETERMINATE_VALUE
              )
            : this.adapter.removeNativeControlAttr(Ks.ARIA_CHECKED_ATTR);
        }),
        t
      );
    })(Ae);
  function Ys(n) {
    let i,
      s,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      m,
      h,
      g,
      E,
      A,
      C,
      S,
      L = [
        { class: (o = ze({ [n[9]]: !0, "mdc-checkbox__native-control": !0 })) },
        { type: "checkbox" },
        n[20],
        { disabled: n[1] },
        { __value: (l = n[19](n[7]) ? n[6] : n[7]) },
        { "data-indeterminate": (c = !n[19](n[0]) && n[0] ? "true" : void 0) },
        n[16],
        Ye(n[26], "input$"),
      ],
      D = {};
    for (let e = 0; e < L.length; e += 1) D = t(D, L[e]);
    let N = [
        {
          class: (h = ze({
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
        { style: (g = Object.entries(n[15]).map(Qs).concat([n[4]]).join(" ")) },
        qe(n[26], ["input$"]),
      ],
      M = {};
    for (let e = 0; e < N.length; e += 1) M = t(M, N[e]);
    return {
      c() {
        (i = y("div")),
          (s = y("input")),
          (u = _()),
          (p = y("div")),
          (p.innerHTML =
            '<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"><path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg> \n    <div class="mdc-checkbox__mixedmark"></div>'),
          (f = _()),
          (m = y("div")),
          O(s, D),
          x(p, "class", "mdc-checkbox__background"),
          x(m, "class", "mdc-checkbox__ripple"),
          O(i, M);
      },
      m(e, t) {
        v(e, i, t),
          I(i, s),
          s.autofocus && s.focus(),
          n[36](s),
          (s.checked = n[12]),
          I(i, u),
          I(i, p),
          I(i, f),
          I(i, m),
          n[38](i),
          C ||
            ((S = [
              $((d = Qe.call(null, s, n[8]))),
              T(s, "change", n[37]),
              T(s, "blur", n[34]),
              T(s, "focus", n[35]),
              $((E = Qe.call(null, i, n[2]))),
              $(n[18].call(null, i)),
              $(
                (A = ti.call(null, i, {
                  unbounded: !0,
                  addClass: n[23],
                  removeClass: n[24],
                  addStyle: n[25],
                  active: n[17],
                  eventTarget: n[11],
                }))
              ),
              T(i, "animationend", n[39]),
            ]),
            (C = !0));
      },
      p(e, t) {
        O(
          s,
          (D = le(L, [
            512 & t[0] &&
              o !==
                (o = ze({
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
            67108864 & t[0] && Ye(e[26], "input$"),
          ]))
        ),
          d && r(d.update) && 256 & t[0] && d.update.call(null, e[8]),
          4096 & t[0] && (s.checked = e[12]),
          O(
            i,
            (M = le(N, [
              16426 & t[0] &&
                h !==
                  (h = ze({
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
                    .map(Qs)
                    .concat([e[4]])
                    .join(" ")) && { style: g },
              67108864 & t[0] && qe(e[26], ["input$"]),
            ]))
          ),
          E && r(E.update) && 4 & t[0] && E.update.call(null, e[2]),
          A &&
            r(A.update) &&
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
        e && b(i), n[36](null), n[38](null), (C = !1), a(S);
      },
    };
  }
  const Qs = ([e, t]) => `${e}: ${t};`;
  function Zs(e, n, i) {
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
    let r = m(n, a);
    var s;
    const o = Xe(R());
    let l = () => {};
    function c(e) {
      return e === l;
    }
    let d,
      u,
      p,
      { use: h = [] } = n,
      { class: g = "" } = n,
      { style: $ = "" } = n,
      { disabled: I = !1 } = n,
      { touch: v = !1 } = n,
      { indeterminate: b = l } = n,
      { group: E = l } = n,
      { checked: y = l } = n,
      { value: A = null } = n,
      { valueKey: C = l } = n,
      { input$use: _ = [] } = n,
      { input$class: S = "" } = n,
      T = {},
      x = {},
      O = {},
      L = !1,
      D = null !== (s = H("SMUI:generic:input:props")) && void 0 !== s ? s : {},
      N = c(E) ? !c(y) && (null != y ? y : void 0) : -1 !== E.indexOf(A),
      M = H("SMUI:checkbox:context"),
      w = H("SMUI:data-table:row:header"),
      k = y,
      U = c(E) ? [] : [...E],
      P = N;
    function V(e) {
      T[e] || i(14, (T[e] = !0), T);
    }
    function z(e) {
      (e in T && !T[e]) || i(14, (T[e] = !1), T);
    }
    function G(e, t) {
      O[e] !== t && i(16, (O[e] = t), O);
    }
    function q(e) {
      (e in O && null == O[e]) || i(16, (O[e] = void 0), O);
    }
    function K() {
      return d;
    }
    F(() => {
      i(11, (p.indeterminate = !c(b) && b), p),
        i(
          10,
          (u = new Xs({
            addClass: V,
            forceLayout: () => d.offsetWidth,
            hasNativeControl: () => !0,
            isAttachedToDOM: () => Boolean(d.parentNode),
            isChecked: () => null != N && N,
            isIndeterminate: () => !c(b) && b,
            removeClass: z,
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
          return null != N && N;
        },
        set checked(e) {
          N !== e && i(12, (N = e));
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
        Ge(d, "SMUIGenericInput:mount", e),
        Ge(d, "SMUICheckbox:mount", e),
        u.init(),
        () => {
          Ge(d, "SMUIGenericInput:unmount", e),
            Ge(d, "SMUICheckbox:unmount", e),
            u.destroy();
        }
      );
    });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(26, (r = m(n, a))),
          "use" in e && i(2, (h = e.use)),
          "class" in e && i(3, (g = e.class)),
          "style" in e && i(4, ($ = e.style)),
          "disabled" in e && i(1, (I = e.disabled)),
          "touch" in e && i(5, (v = e.touch)),
          "indeterminate" in e && i(0, (b = e.indeterminate)),
          "group" in e && i(27, (E = e.group)),
          "checked" in e && i(28, (y = e.checked)),
          "value" in e && i(6, (A = e.value)),
          "valueKey" in e && i(7, (C = e.valueKey)),
          "input$use" in e && i(8, (_ = e.input$use)),
          "input$class" in e && i(9, (S = e.input$class));
      }),
      (e.$$.update = () => {
        if ((402660417 & e.$$.dirty[0]) | (7 & e.$$.dirty[1])) {
          let e = !1;
          if (!c(E))
            if (P !== N) {
              const t = E.indexOf(A);
              N && -1 === t
                ? (E.push(A),
                  i(27, E),
                  i(33, P),
                  i(12, N),
                  i(6, A),
                  i(32, U),
                  i(28, y),
                  i(31, k),
                  i(0, b),
                  i(11, p),
                  i(10, u))
                : N ||
                  -1 === t ||
                  (E.splice(t, 1),
                  i(27, E),
                  i(33, P),
                  i(12, N),
                  i(6, A),
                  i(32, U),
                  i(28, y),
                  i(31, k),
                  i(0, b),
                  i(11, p),
                  i(10, u)),
                (e = !0);
            } else {
              const t = U.indexOf(A),
                n = E.indexOf(A);
              t > -1 && -1 === n
                ? (i(12, (N = !1)), (e = !0))
                : n > -1 && -1 === t && (i(12, (N = !0)), (e = !0));
            }
          c(y)
            ? !!P != !!N && (e = !0)
            : y !== (null != N ? N : null) &&
              (y === k
                ? (i(28, (y = null != N ? N : null)), c(b) || i(0, (b = !1)))
                : i(12, (N = null != y ? y : void 0)),
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
            i(31, (k = y)),
            i(32, (U = c(E) ? [] : [...E])),
            i(33, (P = N)),
            e && u && u.handleChange();
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
        S,
        u,
        p,
        N,
        d,
        T,
        x,
        O,
        L,
        o,
        c,
        D,
        M,
        w,
        V,
        z,
        function (e, t) {
          x[e] != t &&
            ("" === t || null == t
              ? (delete x[e], i(15, x))
              : i(15, (x[e] = t), x));
        },
        r,
        E,
        y,
        function () {
          return D && D.id;
        },
        K,
        k,
        U,
        P,
        function (t) {
          B.call(this, e, t);
        },
        function (t) {
          B.call(this, e, t);
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (p = e),
              i(11, p),
              i(27, E),
              i(33, P),
              i(12, N),
              i(6, A),
              i(32, U),
              i(28, y),
              i(31, k),
              i(0, b),
              i(10, u);
          });
        },
        function () {
          (N = this.checked),
            i(12, N),
            i(27, E),
            i(33, P),
            i(6, A),
            i(32, U),
            i(28, y),
            i(31, k),
            i(0, b),
            i(11, p),
            i(10, u);
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (d = e), i(13, d);
          });
        },
        () => u && u.handleAnimationEnd(),
      ]
    );
  }
  class Js extends he {
    constructor(e) {
      super(),
        me(
          this,
          e,
          Zs,
          Ys,
          s,
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
   */ var eo = { ROOT: "mdc-form-field" },
    to = { LABEL_SELECTOR: ".mdc-form-field > label" },
    no = (function (e) {
      function t(n) {
        var i = e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
        return (
          (i.click = function () {
            i.handleClick();
          }),
          i
        );
      }
      return (
        $e(t, e),
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
    })(Ae);
  const io = (e) => ({}),
    ao = (e) => ({});
  function ro(e) {
    let n, i, s, o, c, f, m, h, g;
    const E = e[13].default,
      A = l(E, e, e[12], null),
      C = e[13].label,
      S = l(C, e, e[12], ao);
    let x = [{ for: e[4] }, Ye(e[10], "label$")],
      L = {};
    for (let e = 0; e < x.length; e += 1) L = t(L, x[e]);
    let D = [
        {
          class: (c = ze({
            [e[1]]: !0,
            "mdc-form-field": !0,
            "mdc-form-field--align-end": "end" === e[2],
            "mdc-form-field--nowrap": e[3],
          })),
        },
        qe(e[10], ["label$"]),
      ],
      N = {};
    for (let e = 0; e < D.length; e += 1) N = t(N, D[e]);
    return {
      c() {
        (n = y("div")),
          A && A.c(),
          (i = _()),
          (s = y("label")),
          S && S.c(),
          O(s, L),
          O(n, N);
      },
      m(t, a) {
        v(t, n, a),
          A && A.m(n, null),
          I(n, i),
          I(n, s),
          S && S.m(s, null),
          e[14](s),
          e[15](n),
          (m = !0),
          h ||
            ((g = [
              $((o = Qe.call(null, s, e[5]))),
              $((f = Qe.call(null, n, e[0]))),
              $(e[9].call(null, n)),
              T(n, "SMUIGenericInput:mount", e[16]),
              T(n, "SMUIGenericInput:unmount", e[17]),
            ]),
            (h = !0));
      },
      p(e, [t]) {
        A &&
          A.p &&
          (!m || 4096 & t) &&
          u(A, E, e, e[12], m ? d(E, e[12], t, null) : p(e[12]), null),
          S &&
            S.p &&
            (!m || 4096 & t) &&
            u(S, C, e, e[12], m ? d(C, e[12], t, io) : p(e[12]), ao),
          O(
            s,
            (L = le(x, [
              (!m || 16 & t) && { for: e[4] },
              1024 & t && Ye(e[10], "label$"),
            ]))
          ),
          o && r(o.update) && 32 & t && o.update.call(null, e[5]),
          O(
            n,
            (N = le(D, [
              (!m ||
                (14 & t &&
                  c !==
                    (c = ze({
                      [e[1]]: !0,
                      "mdc-form-field": !0,
                      "mdc-form-field--align-end": "end" === e[2],
                      "mdc-form-field--nowrap": e[3],
                    })))) && { class: c },
              1024 & t && qe(e[10], ["label$"]),
            ]))
          ),
          f && r(f.update) && 1 & t && f.update.call(null, e[0]);
      },
      i(e) {
        m || (re(A, e), re(S, e), (m = !0));
      },
      o(e) {
        se(A, e), se(S, e), (m = !1);
      },
      d(t) {
        t && b(n),
          A && A.d(t),
          S && S.d(t),
          e[14](null),
          e[15](null),
          (h = !1),
          a(g);
      },
    };
  }
  let so = 0;
  function oo(e, n, i) {
    const a = [
      "use",
      "class",
      "align",
      "noWrap",
      "inputId",
      "label$use",
      "getElement",
    ];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const l = Xe(R());
    let c,
      d,
      u,
      p,
      { use: h = [] } = n,
      { class: g = "" } = n,
      { align: $ = "start" } = n,
      { noWrap: I = !1 } = n,
      { inputId: v = "SMUI-form-field-" + so++ } = n,
      { label$use: b = [] } = n;
    P("SMUI:generic:input:props", { id: v }),
      F(
        () => (
          (d = new no({
            activateInputRipple: () => {
              p && p.activateRipple();
            },
            deactivateInputRipple: () => {
              p && p.deactivateRipple();
            },
            deregisterInteractionHandler: (e, t) => {
              u.removeEventListener(e, t);
            },
            registerInteractionHandler: (e, t) => {
              u.addEventListener(e, t);
            },
          })),
          d.init(),
          () => {
            d.destroy();
          }
        )
      );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(10, (r = m(n, a))),
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
        u,
        p,
        l,
        r,
        function () {
          return c;
        },
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (u = e), i(7, u);
          });
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (c = e), i(6, c);
          });
        },
        (e) => i(8, (p = e.detail)),
        () => i(8, (p = void 0)),
      ]
    );
  }
  class lo extends he {
    constructor(e) {
      super(),
        me(this, e, oo, ro, s, {
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
   */ var co,
    uo,
    po = {
      ANCHOR: "mdc-menu-surface--anchor",
      ANIMATING_CLOSED: "mdc-menu-surface--animating-closed",
      ANIMATING_OPEN: "mdc-menu-surface--animating-open",
      FIXED: "mdc-menu-surface--fixed",
      IS_OPEN_BELOW: "mdc-menu-surface--is-open-below",
      OPEN: "mdc-menu-surface--open",
      ROOT: "mdc-menu-surface",
    },
    fo = {
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
    mo = {
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
  })(co || (co = {})),
    (function (e) {
      (e[(e.TOP_LEFT = 0)] = "TOP_LEFT"),
        (e[(e.TOP_RIGHT = 4)] = "TOP_RIGHT"),
        (e[(e.BOTTOM_LEFT = 1)] = "BOTTOM_LEFT"),
        (e[(e.BOTTOM_RIGHT = 5)] = "BOTTOM_RIGHT"),
        (e[(e.TOP_START = 8)] = "TOP_START"),
        (e[(e.TOP_END = 12)] = "TOP_END"),
        (e[(e.BOTTOM_START = 9)] = "BOTTOM_START"),
        (e[(e.BOTTOM_END = 13)] = "BOTTOM_END");
    })(uo || (uo = {}));
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
  var ho,
    go = (function (e) {
      function t(n) {
        var i = e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
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
          (i.anchorCorner = uo.TOP_START),
          (i.originCorner = uo.TOP_START),
          (i.anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 }),
          (i.position = { x: 0, y: 0 }),
          i
        );
      }
      return (
        $e(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return po;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return fo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return mo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "Corner", {
          get: function () {
            return uo;
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
          this.originCorner = this.originCorner ^ co.RIGHT;
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
                    }, mo.TRANSITION_OPEN_DURATION));
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
                  }, mo.TRANSITION_CLOSE_DURATION));
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
            a = this.hasBit(n, co.BOTTOM) ? "bottom" : "top",
            r = this.hasBit(n, co.RIGHT) ? "right" : "left",
            s = this.getHorizontalOriginOffset(n),
            o = this.getVerticalOriginOffset(n),
            l = this.measurements,
            c = l.anchorSize,
            d = l.surfaceSize,
            u = (((e = {})[r] = s), (e[a] = o), e);
          c.width / d.width > mo.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO &&
            (r = "center"),
            (this.isHoistedElement || this.isFixedPosition) &&
              this.adjustPositionForHoistedElement(u),
            this.adapter.setTransformOrigin(r + " " + a),
            this.adapter.setPosition(u),
            this.adapter.setMaxHeight(i ? i + "px" : ""),
            this.hasBit(n, co.BOTTOM) ||
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
            r = a.viewportDistance,
            s = a.anchorSize,
            o = a.surfaceSize,
            l = t.numbers.MARGIN_TO_EDGE;
          this.hasBit(this.anchorCorner, co.BOTTOM)
            ? ((e = r.top - l + this.anchorMargin.bottom),
              (n = r.bottom - l - this.anchorMargin.bottom))
            : ((e = r.top - l + this.anchorMargin.top),
              (n = r.bottom - l + s.height - this.anchorMargin.top)),
            !(n - o.height > 0) && e > n && (i = this.setBit(i, co.BOTTOM));
          var c,
            d,
            u = this.adapter.isRtl(),
            p = this.hasBit(this.anchorCorner, co.FLIP_RTL),
            f =
              this.hasBit(this.anchorCorner, co.RIGHT) ||
              this.hasBit(i, co.RIGHT),
            m = !1;
          (m = u && p ? !f : f)
            ? ((c = r.left + s.width + this.anchorMargin.right),
              (d = r.right - this.anchorMargin.right))
            : ((c = r.left + this.anchorMargin.left),
              (d = r.right + s.width - this.anchorMargin.left));
          var h = c - o.width > 0,
            g = d - o.width > 0,
            $ = this.hasBit(i, co.FLIP_RTL) && this.hasBit(i, co.RIGHT);
          return (
            (g && $ && u) || (!h && $)
              ? (i = this.unsetBit(i, co.RIGHT))
              : ((h && m && u) || (h && !m && f) || (!g && c >= d)) &&
                (i = this.setBit(i, co.RIGHT)),
            i
          );
        }),
        (t.prototype.getMenuSurfaceMaxHeight = function (e) {
          if (this.maxHeight > 0) return this.maxHeight;
          var n = this.measurements.viewportDistance,
            i = 0,
            a = this.hasBit(e, co.BOTTOM),
            r = this.hasBit(this.anchorCorner, co.BOTTOM),
            s = t.numbers.MARGIN_TO_EDGE;
          return (
            a
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
        (t.prototype.getHorizontalOriginOffset = function (e) {
          var t = this.measurements.anchorSize,
            n = this.hasBit(e, co.RIGHT),
            i = this.hasBit(this.anchorCorner, co.RIGHT);
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
            n = this.hasBit(e, co.BOTTOM),
            i = this.hasBit(this.anchorCorner, co.BOTTOM);
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
            r = i.viewportDistance,
            s = i.surfaceSize,
            o = i.viewportSize,
            l = Object.keys(e);
          try {
            for (var c = Ee(l), d = c.next(); !d.done; d = c.next()) {
              var u = d.value,
                p = e[u] || 0;
              !this.isHorizontallyCenteredOnViewport ||
              ("left" !== u && "right" !== u)
                ? ((p += r[u]),
                  this.isFixedPosition ||
                    ("top" === u
                      ? (p += a.y)
                      : "bottom" === u
                      ? (p -= a.y)
                      : "left" === u
                      ? (p += a.x)
                      : (p -= a.x)),
                  (e[u] = p))
                : (e[u] = (o.width - s.width) / 2);
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              d && !d.done && (n = c.return) && n.call(c);
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
            }, mo.TOUCH_EVENT_WAIT_MS);
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
    })(Ae),
    $o = {
      MENU_SELECTED_LIST_ITEM: "mdc-menu-item--selected",
      MENU_SELECTION_GROUP: "mdc-menu__selection-group",
      ROOT: "mdc-menu",
    },
    Io = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_DISABLED_ATTR: "aria-disabled",
      CHECKBOX_SELECTOR: 'input[type="checkbox"]',
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      SELECTED_EVENT: "MDCMenu:selected",
      SKIP_RESTORE_FOCUS: "data-menu-item-skip-restore-focus",
    },
    vo = { FOCUS_ROOT_INDEX: -1 };
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
  })(ho || (ho = {}));
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
  var bo = (function (e) {
      function t(n) {
        var i = e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
        return (
          (i.closeAnimationEndTimerId = 0),
          (i.defaultFocusState = ho.LIST_ROOT),
          (i.selectedIndex = -1),
          i
        );
      }
      return (
        $e(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return $o;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Io;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return vo;
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
                Io.SKIP_RESTORE_FOCUS
              );
            this.adapter.closeSurface(i),
              (this.closeAnimationEndTimerId = setTimeout(function () {
                var n = t.adapter.getElementIndex(e);
                n >= 0 &&
                  t.adapter.isSelectableItemAtIndex(n) &&
                  t.setSelectedIndex(n);
              }, go.numbers.TRANSITION_CLOSE_DURATION));
          }
        }),
        (t.prototype.handleMenuSurfaceOpened = function () {
          switch (this.defaultFocusState) {
            case ho.FIRST_ITEM:
              this.adapter.focusItemAtIndex(0);
              break;
            case ho.LAST_ITEM:
              this.adapter.focusItemAtIndex(
                this.adapter.getMenuItemCount() - 1
              );
              break;
            case ho.NONE:
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
              Io.ARIA_CHECKED_ATTR
            ),
            this.adapter.removeClassFromElementAtIndex(
              t,
              $o.MENU_SELECTED_LIST_ITEM
            )),
            this.adapter.addClassToElementAtIndex(
              e,
              $o.MENU_SELECTED_LIST_ITEM
            ),
            this.adapter.addAttributeToElementAtIndex(
              e,
              Io.ARIA_CHECKED_ATTR,
              "true"
            ),
            (this.selectedIndex = e);
        }),
        (t.prototype.setEnabled = function (e, t) {
          this.validatedIndex(e),
            t
              ? (this.adapter.removeClassFromElementAtIndex(
                  e,
                  Fa.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  e,
                  Io.ARIA_DISABLED_ATTR,
                  "false"
                ))
              : (this.adapter.addClassToElementAtIndex(
                  e,
                  Fa.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  e,
                  Io.ARIA_DISABLED_ATTR,
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
    })(Ae),
    Eo = {
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
    yo = {
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
    Ao = { LABEL_SCALE: 0.75, UNSET_INDEX: -1, CLICK_DEBOUNCE_TIMEOUT_MS: 330 },
    Co = (function (e) {
      function t(n, i) {
        void 0 === i && (i = {});
        var a = e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
        return (
          (a.disabled = !1),
          (a.isMenuOpen = !1),
          (a.useDefaultValidation = !0),
          (a.customValidity = !0),
          (a.lastSelectedIndex = Ao.UNSET_INDEX),
          (a.clickDebounceTimeout = 0),
          (a.recentlyClicked = !1),
          (a.leadingIcon = i.leadingIcon),
          (a.helperText = i.helperText),
          a
        );
      }
      return (
        $e(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Eo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Ao;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return yo;
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
              (e === Ao.UNSET_INDEX
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
          return e !== Ao.UNSET_INDEX ? t[e] : "";
        }),
        (t.prototype.getDisabled = function () {
          return this.disabled;
        }),
        (t.prototype.setDisabled = function (e) {
          (this.disabled = e),
            this.disabled
              ? (this.adapter.addClass(Eo.DISABLED), this.adapter.closeMenu())
              : this.adapter.removeClass(Eo.DISABLED),
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
          this.adapter.addClass(Eo.ACTIVATED),
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
              t = this.adapter.hasClass(Eo.FOCUSED),
              n = e || t,
              i = this.adapter.hasClass(Eo.REQUIRED);
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
          this.adapter.removeClass(Eo.ACTIVATED),
            (this.isMenuOpen = !1),
            this.adapter.isSelectAnchorFocused() || this.blur();
        }),
        (t.prototype.handleChange = function () {
          this.layout(),
            this.adapter.notifyChange(this.getValue()),
            this.adapter.hasClass(Eo.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (t.prototype.handleMenuItemAction = function (e) {
          this.setSelectedIndex(e, !0);
        }),
        (t.prototype.handleFocus = function () {
          this.adapter.addClass(Eo.FOCUSED),
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
          if (!this.isMenuOpen && this.adapter.hasClass(Eo.FOCUSED)) {
            var t = Gn(e) === hn,
              n = Gn(e) === gn,
              i = Gn(e) === yn,
              a = Gn(e) === Cn;
            if (
              !(e.ctrlKey || e.metaKey) &&
              ((!n && e.key && 1 === e.key.length) ||
                (n && this.adapter.isTypeaheadInProgress()))
            ) {
              var r = n ? " " : e.key,
                s = this.adapter.typeaheadMatchItem(r, this.getSelectedIndex());
              return (
                s >= 0 && this.setSelectedIndex(s), void e.preventDefault()
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
            var t = this.adapter.hasClass(Eo.FOCUSED);
            if (e) {
              var n = Ao.LABEL_SCALE,
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
              ? (this.adapter.removeClass(Eo.INVALID),
                this.adapter.removeMenuClass(Eo.MENU_INVALID))
              : (this.adapter.addClass(Eo.INVALID),
                this.adapter.addMenuClass(Eo.MENU_INVALID)),
            this.syncHelperTextValidity(e);
        }),
        (t.prototype.isValid = function () {
          return this.useDefaultValidation &&
            this.adapter.hasClass(Eo.REQUIRED) &&
            !this.adapter.hasClass(Eo.DISABLED)
            ? this.getSelectedIndex() !== Ao.UNSET_INDEX &&
                (0 !== this.getSelectedIndex() || Boolean(this.getValue()))
            : this.customValidity;
        }),
        (t.prototype.setRequired = function (e) {
          e
            ? this.adapter.addClass(Eo.REQUIRED)
            : this.adapter.removeClass(Eo.REQUIRED),
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
            this.adapter.setMenuAnchorCorner(uo.BOTTOM_START)),
            this.adapter.setMenuWrapFocus(!1),
            this.setDisabled(this.adapter.hasClass(Eo.DISABLED)),
            this.syncHelperTextValidity(!this.adapter.hasClass(Eo.INVALID)),
            this.layout(),
            this.layoutOptions();
        }),
        (t.prototype.blur = function () {
          this.adapter.removeClass(Eo.FOCUSED),
            this.layout(),
            this.adapter.deactivateBottomLine(),
            this.adapter.hasClass(Eo.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (t.prototype.syncHelperTextValidity = function (e) {
          if (this.helperText) {
            this.helperText.setValidity(e);
            var t = this.helperText.isVisible(),
              n = this.helperText.getId();
            t && n
              ? this.adapter.setSelectAnchorAttr(yo.ARIA_DESCRIBEDBY, n)
              : this.adapter.removeSelectAnchorAttr(yo.ARIA_DESCRIBEDBY);
          }
        }),
        (t.prototype.setClickDebounceTimeout = function () {
          var e = this;
          clearTimeout(this.clickDebounceTimeout),
            (this.clickDebounceTimeout = setTimeout(function () {
              e.recentlyClicked = !1;
            }, Ao.CLICK_DEBOUNCE_TIMEOUT_MS)),
            (this.recentlyClicked = !0);
        }),
        t
      );
    })(Ae),
    _o = { ARIA_HIDDEN: "aria-hidden", ROLE: "role" },
    So = {
      HELPER_TEXT_VALIDATION_MSG: "mdc-select-helper-text--validation-msg",
      HELPER_TEXT_VALIDATION_MSG_PERSISTENT:
        "mdc-select-helper-text--validation-msg-persistent",
    },
    To = (function (e) {
      function t(n) {
        return e.call(this, Ie(Ie({}, t.defaultAdapter), n)) || this;
      }
      return (
        $e(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return So;
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
          return "true" !== this.adapter.getAttr(_o.ARIA_HIDDEN);
        }),
        (t.prototype.setContent = function (e) {
          this.adapter.setContent(e);
        }),
        (t.prototype.setValidation = function (e) {
          e
            ? this.adapter.addClass(So.HELPER_TEXT_VALIDATION_MSG)
            : this.adapter.removeClass(So.HELPER_TEXT_VALIDATION_MSG);
        }),
        (t.prototype.setValidationMsgPersistent = function (e) {
          e
            ? this.adapter.addClass(So.HELPER_TEXT_VALIDATION_MSG_PERSISTENT)
            : this.adapter.removeClass(
                So.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
              );
        }),
        (t.prototype.setValidity = function (e) {
          if (this.adapter.hasClass(So.HELPER_TEXT_VALIDATION_MSG)) {
            var t = this.adapter.hasClass(
              So.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
            );
            if (!e || t)
              return (
                this.showToScreenReader(),
                void (e
                  ? this.adapter.removeAttr(_o.ROLE)
                  : this.adapter.setAttr(_o.ROLE, "alert"))
              );
            this.adapter.removeAttr(_o.ROLE), this.hide();
          }
        }),
        (t.prototype.showToScreenReader = function () {
          this.adapter.removeAttr(_o.ARIA_HIDDEN);
        }),
        (t.prototype.hide = function () {
          this.adapter.setAttr(_o.ARIA_HIDDEN, "true");
        }),
        t
      );
    })(Ae);
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
   */ const { document: xo } = oe;
  function Oo(e) {
    let n, i, s, o, c, f, m, h;
    const g = e[31].default,
      I = l(g, e, e[30], null);
    let E = [
        {
          class: (s = ze({
            [e[2]]: !0,
            "mdc-menu-surface": !0,
            "mdc-menu-surface--fixed": e[5],
            "mdc-menu-surface--open": e[4],
            "smui-menu-surface--static": e[4],
            "mdc-menu-surface--fullwidth": e[7],
            ...e[10],
          })),
        },
        { style: (o = Object.entries(e[11]).map(Lo).concat([e[3]]).join(" ")) },
        e[13],
      ],
      A = {};
    for (let e = 0; e < E.length; e += 1) A = t(A, E[e]);
    return {
      c() {
        (n = _()), (i = y("div")), I && I.c(), O(i, A);
      },
      m(t, a) {
        v(t, n, a),
          v(t, i, a),
          I && I.m(i, null),
          e[33](i),
          (f = !0),
          m ||
            ((h = [
              T(xo.body, "click", e[32], !0),
              $((c = Qe.call(null, i, e[1]))),
              $(e[12].call(null, i)),
              T(i, "keydown", e[34]),
            ]),
            (m = !0));
      },
      p(e, t) {
        I &&
          I.p &&
          (!f || 1073741824 & t[0]) &&
          u(I, g, e, e[30], f ? d(g, e[30], t, null) : p(e[30]), null),
          O(
            i,
            (A = le(E, [
              (!f ||
                (1204 & t[0] &&
                  s !==
                    (s = ze({
                      [e[2]]: !0,
                      "mdc-menu-surface": !0,
                      "mdc-menu-surface--fixed": e[5],
                      "mdc-menu-surface--open": e[4],
                      "smui-menu-surface--static": e[4],
                      "mdc-menu-surface--fullwidth": e[7],
                      ...e[10],
                    })))) && { class: s },
              (!f ||
                (2056 & t[0] &&
                  o !==
                    (o = Object.entries(e[11])
                      .map(Lo)
                      .concat([e[3]])
                      .join(" ")))) && { style: o },
              8192 & t[0] && e[13],
            ]))
          ),
          c && r(c.update) && 2 & t[0] && c.update.call(null, e[1]);
      },
      i(e) {
        f || (re(I, e), (f = !0));
      },
      o(e) {
        se(I, e), (f = !1);
      },
      d(t) {
        t && b(n), t && b(i), I && I.d(t), e[33](null), (m = !1), a(h);
      },
    };
  }
  const Lo = ([e, t]) => `${e}: ${t};`;
  function Do(e, n, i) {
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
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    var l, c, d;
    const u = Xe(R());
    let p,
      h,
      g,
      { use: $ = [] } = n,
      { class: I = "" } = n,
      { style: v = "" } = n,
      { static: b = !1 } = n,
      { anchor: E = !0 } = n,
      { fixed: y = !1 } = n,
      { open: A = b } = n,
      { managed: C = !1 } = n,
      { fullWidth: _ = !1 } = n,
      { quickOpen: S = !1 } = n,
      { anchorElement: T } = n,
      { anchorCorner: x } = n,
      { anchorMargin: O = { top: 0, right: 0, bottom: 0, left: 0 } } = n,
      { maxHeight: L = 0 } = n,
      { horizontallyCenteredOnViewport: D = !1 } = n,
      N = {},
      M = {};
    P("SMUI:list:role", "menu"), P("SMUI:list:item:role", "menuitem");
    const w = uo;
    function U(e) {
      return e in N ? N[e] : z().classList.contains(e);
    }
    function H(e) {
      N[e] || i(10, (N[e] = !0), N);
    }
    function B(e) {
      (e in N && !N[e]) || i(10, (N[e] = !1), N);
    }
    function V(e) {
      h.close(e), i(0, (A = !1));
    }
    function z() {
      return p;
    }
    F(() => {
      i(
        9,
        (h = new go({
          addClass: H,
          removeClass: B,
          hasClass: U,
          hasAnchor: () => !!T,
          notifyClose: () => {
            C || i(0, (A = b)),
              A || Ge(p, "SMUIMenuSurface:closed", void 0, void 0, !0);
          },
          notifyClosing: () => {
            C || i(0, (A = b)),
              A || Ge(p, "SMUIMenuSurface:closing", void 0, void 0, !0);
          },
          notifyOpen: () => {
            C || i(0, (A = !0)),
              A && Ge(p, "SMUIMenuSurface:opened", void 0, void 0, !0);
          },
          isElementInContainer: (e) => p.contains(e),
          isRtl: () =>
            "rtl" === getComputedStyle(p).getPropertyValue("direction"),
          setTransformOrigin: (e) => {
            i(11, (M["transform-origin"] = e), M);
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
          getAnchorDimensions: () => (T ? T.getBoundingClientRect() : null),
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
            i(11, (M.left = "left" in e ? `${e.left}px` : ""), M),
              i(11, (M.right = "right" in e ? `${e.right}px` : ""), M),
              i(11, (M.top = "top" in e ? `${e.top}px` : ""), M),
              i(11, (M.bottom = "bottom" in e ? `${e.bottom}px` : ""), M);
          },
          setMaxHeight: (e) => {
            i(11, (M["max-height"] = e), M);
          },
        }))
      );
      return (
        Ge(p, "SMUIMenuSurface:mount", {
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
      k(() => {
        var e;
        E &&
          p &&
          (null === (e = p.parentElement) ||
            void 0 === e ||
            e.classList.remove("mdc-menu-surface--anchor"));
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(13, (r = m(n, a))),
          "use" in e && i(1, ($ = e.use)),
          "class" in e && i(2, (I = e.class)),
          "style" in e && i(3, (v = e.style)),
          "static" in e && i(4, (b = e.static)),
          "anchor" in e && i(15, (E = e.anchor)),
          "fixed" in e && i(5, (y = e.fixed)),
          "open" in e && i(0, (A = e.open)),
          "managed" in e && i(6, (C = e.managed)),
          "fullWidth" in e && i(7, (_ = e.fullWidth)),
          "quickOpen" in e && i(16, (S = e.quickOpen)),
          "anchorElement" in e && i(14, (T = e.anchorElement)),
          "anchorCorner" in e && i(17, (x = e.anchorCorner)),
          "anchorMargin" in e && i(18, (O = e.anchorMargin)),
          "maxHeight" in e && i(19, (L = e.maxHeight)),
          "horizontallyCenteredOnViewport" in e &&
            i(20, (D = e.horizontallyCenteredOnViewport)),
          "$$scope" in e && i(30, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        939557120 & e.$$.dirty[0] &&
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
            (T =
              null !== i(29, (d = p.parentElement)) && void 0 !== d
                ? d
                : void 0)
          )),
          513 & e.$$.dirty[0] &&
            h &&
            h.isOpen() !== A &&
            (A ? h.open() : h.close()),
          66048 & e.$$.dirty[0] && h && h.setQuickOpen(S),
          544 & e.$$.dirty[0] && h && h.setFixedPosition(y),
          524800 & e.$$.dirty[0] && h && h.setMaxHeight(L),
          1049088 & e.$$.dirty[0] &&
            h &&
            h.setIsHorizontallyCenteredOnViewport(D),
          131584 & e.$$.dirty[0] &&
            h &&
            null != x &&
            ("string" == typeof x
              ? h.setAnchorCorner(w[x])
              : h.setAnchorCorner(x)),
          262656 & e.$$.dirty[0] && h && h.setAnchorMargin(O);
      }),
      [
        A,
        $,
        I,
        v,
        b,
        y,
        C,
        _,
        p,
        h,
        N,
        M,
        u,
        r,
        T,
        E,
        S,
        x,
        O,
        L,
        D,
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
        z,
        l,
        c,
        d,
        o,
        s,
        (e) => h && A && !C && h.handleBodyClick(e),
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (p = e), i(8, p);
          });
        },
        (e) => h && h.handleKeydown(e),
      ]
    );
  }
  class No extends he {
    constructor(e) {
      super(),
        me(
          this,
          e,
          Do,
          Oo,
          s,
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
  function Mo(
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
  function wo(e) {
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
          u(i, n, e, e[21], t ? d(n, e[21], a, null) : p(e[21]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Ro(e) {
    let n, i, a;
    const r = [
      { use: e[5] },
      { class: ze({ [e[1]]: !0, "mdc-menu": !0 }) },
      e[9],
    ];
    function s(t) {
      e[18](t);
    }
    let o = { $$slots: { default: [wo] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) o = t(o, r[e]);
    return (
      void 0 !== e[0] && (o.open = e[0]),
      (n = new No({ props: o })),
      e[17](n),
      j.push(() => de(n, "open", s)),
      n.$on("SMUIMenuSurface:mount", e[7]),
      n.$on("SMUIList:mount", e[8]),
      n.$on("SMUIMenuSurface:opened", e[19]),
      n.$on("keydown", e[6]),
      n.$on("SMUIList:action", e[20]),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p(e, [t]) {
          const a =
            546 & t
              ? le(r, [
                  32 & t && { use: e[5] },
                  2 & t && { class: ze({ [e[1]]: !0, "mdc-menu": !0 }) },
                  512 & t && ce(e[9]),
                ])
              : {};
          2097152 & t && (a.$$scope = { dirty: t, ctx: e }),
            !i && 1 & t && ((i = !0), (a.open = e[0]), Y(() => (i = !1))),
            n.$set(a);
        },
        i(e) {
          a || (re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          se(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[17](null), fe(n, t);
        },
      }
    );
  }
  function Fo(e, n, i) {
    let a;
    const r = [
      "use",
      "class",
      "open",
      "isOpen",
      "setOpen",
      "setDefaultFocusState",
      "getSelectedIndex",
      "getElement",
    ];
    let s = m(n, r),
      { $$slots: o = {}, $$scope: l } = n;
    const { closest: c } = Te,
      d = Xe(R());
    let u,
      p,
      h,
      g,
      { use: $ = [] } = n,
      { class: I = "" } = n,
      { open: v = !1 } = n;
    function b() {
      return u.getElement();
    }
    F(
      () => (
        i(
          3,
          (p = new bo({
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
              Ge(
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
              !!c(g.getOrderedList()[e].element, `.${$o.MENU_SELECTION_GROUP}`),
            getSelectedSiblingOfItemAtIndex: (e) => {
              const t = g.getOrderedList(),
                n = c(t[e].element, `.${$o.MENU_SELECTION_GROUP}`),
                i =
                  null == n
                    ? void 0
                    : n.querySelector(`.${$o.MENU_SELECTED_LIST_ITEM}`);
              return i ? t.map((e) => e.element).indexOf(i) : -1;
            },
          }))
        ),
        Ge(b(), "SMUIMenu:mount", p),
        p.init(),
        () => {
          p.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(9, (s = m(n, r))),
          "use" in e && i(10, ($ = e.use)),
          "class" in e && i(1, (I = e.class)),
          "open" in e && i(0, (v = e.open)),
          "$$scope" in e && i(21, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        1024 & e.$$.dirty && i(5, (a = [d, ...$]));
      }),
      [
        v,
        I,
        u,
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
        s,
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
          j[e ? "unshift" : "push"](() => {
            (u = e), i(2, u);
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
  class ko extends he {
    constructor(e) {
      super(),
        me(this, e, Fo, Ro, s, {
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
  function Uo(t) {
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
  function Po(e) {
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
          u(i, n, e, e[12], t ? d(n, e[12], a, null) : p(e[12]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Ho(e) {
    let n, i, s, o, l, c, d, u, p;
    const f = [Po, Uo],
      m = [];
    function h(e, t) {
      return null == e[8] ? 0 : 1;
    }
    (i = h(e)), (s = m[i] = f[i](e));
    let g = [
        {
          class: (o = ze({
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
        (n = y("div")), s.c(), O(n, I);
      },
      m(t, a) {
        v(t, n, a),
          m[i].m(n, null),
          e[14](n),
          (d = !0),
          u ||
            ((p = [$((c = Qe.call(null, n, e[0]))), $(e[9].call(null, n))]),
            (u = !0));
      },
      p(e, [t]) {
        let a = i;
        (i = h(e)),
          i === a
            ? m[i].p(e, t)
            : (ie(),
              se(m[a], 1, 1, () => {
                m[a] = null;
              }),
              ae(),
              (s = m[i]),
              s ? s.p(e, t) : ((s = m[i] = f[i](e)), s.c()),
              re(s, 1),
              s.m(n, null)),
          O(
            n,
            (I = le(g, [
              (!d ||
                (90 & t &&
                  o !==
                    (o = ze({
                      [e[1]]: !0,
                      "mdc-select-helper-text": !0,
                      "mdc-select-helper-text--validation-msg": e[4],
                      "mdc-select-helper-text--validation-msg-persistent": e[3],
                      ...e[6],
                    })))) && { class: o },
              (!d || (8 & t && l !== (l = e[3] ? void 0 : "true"))) && {
                "aria-hidden": l,
              },
              (!d || 4 & t) && { id: e[2] },
              128 & t && e[7],
              1024 & t && e[10],
            ]))
          ),
          c && r(c.update) && 1 & t && c.update.call(null, e[0]);
      },
      i(e) {
        d || (re(s), (d = !0));
      },
      o(e) {
        se(s), (d = !1);
      },
      d(t) {
        t && b(n), m[i].d(), e[14](null), (u = !1), a(p);
      },
    };
  }
  pt({ class: "mdc-menu__selection-group-icon", component: cr });
  let Bo = 0;
  function Vo(e, n, i) {
    const a = [
      "use",
      "class",
      "id",
      "persistent",
      "validationMsg",
      "getElement",
    ];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const l = Xe(R());
    let c,
      d,
      u,
      { use: p = [] } = n,
      { class: h = "" } = n,
      { id: g = "SMUI-select-helper-text-" + Bo++ } = n,
      { persistent: $ = !1 } = n,
      { validationMsg: I = !1 } = n,
      v = {},
      b = {};
    function E(e) {
      return e in v ? v[e] : T().classList.contains(e);
    }
    function y(e) {
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
        : T().getAttribute(e);
    }
    function _(e, t) {
      b[e] !== t && i(7, (b[e] = t), b);
    }
    function S(e) {
      (e in b && null == b[e]) || i(7, (b[e] = void 0), b);
    }
    function T() {
      return c;
    }
    return (
      F(
        () => (
          (d = new To({
            addClass: y,
            removeClass: A,
            hasClass: E,
            getAttr: C,
            setAttr: _,
            removeAttr: S,
            setContent: (e) => {
              i(8, (u = e));
            },
          })),
          g.startsWith("SMUI-select-helper-text-") &&
            Ge(T(), "SMUISelectHelperText:id", g),
          Ge(T(), "SMUISelectHelperText:mount", d),
          d.init(),
          () => {
            Ge(T(), "SMUISelectHelperText:unmount", d), d.destroy();
          }
        )
      ),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(10, (r = m(n, a))),
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
        u,
        l,
        r,
        T,
        o,
        s,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (c = e), i(5, c);
          });
        },
      ]
    );
  }
  class jo extends he {
    constructor(e) {
      super(),
        me(this, e, Vo, Ho, s, {
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
  const zo = (e) => ({}),
    Go = (e) => ({}),
    qo = (e) => ({}),
    Ko = (e) => ({}),
    Wo = (e) => ({}),
    Xo = (e) => ({}),
    Yo = (e) => ({}),
    Qo = (e) => ({});
  function Zo(e) {
    let n,
      i = [
        { type: "hidden" },
        { required: e[10] },
        { disabled: e[6] },
        { value: e[0] },
        Ye(e[53], "input$"),
      ],
      a = {};
    for (let e = 0; e < i.length; e += 1) a = t(a, i[e]);
    return {
      c() {
        (n = y("input")), O(n, a);
      },
      m(e, t) {
        v(e, n, t), n.autofocus && n.focus();
      },
      p(e, t) {
        O(
          n,
          (a = le(i, [
            { type: "hidden" },
            1024 & t[0] && { required: e[10] },
            64 & t[0] && { disabled: e[6] },
            1 & t[0] && { value: e[0] },
            4194304 & t[1] && Ye(e[53], "input$"),
          ]))
        );
      },
      d(e) {
        e && b(n);
      },
    };
  }
  function Jo(e) {
    let t;
    return {
      c() {
        (t = y("span")), x(t, "class", "mdc-select__ripple");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function el(e) {
    let n, i;
    const a = [
      { id: e[11] + "-smui-label" },
      { floatAbove: "" !== e[43] },
      { required: e[10] },
      Ye(e[53], "label$"),
    ];
    let r = { $$slots: { default: [tl] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new li({ props: r })),
      e[66](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (3072 & t[0]) | (4198400 & t[1])
              ? le(a, [
                  2048 & t[0] && { id: e[11] + "-smui-label" },
                  4096 & t[1] && { floatAbove: "" !== e[43] },
                  1024 & t[0] && { required: e[10] },
                  4194304 & t[1] && ce(Ye(e[53], "label$")),
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
          se(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[66](null), fe(n, t);
        },
      }
    );
  }
  function tl(e) {
    let t,
      n,
      i = (null == e[9] ? "" : e[9]) + "";
    const a = e[63].label,
      r = l(a, e, e[89], Qo);
    return {
      c() {
        (t = C(i)), r && r.c();
      },
      m(e, i) {
        v(e, t, i), r && r.m(e, i), (n = !0);
      },
      p(e, s) {
        (!n || 512 & s[0]) &&
          i !== (i = (null == e[9] ? "" : e[9]) + "") &&
          L(t, i),
          r &&
            r.p &&
            (!n || 134217728 & s[2]) &&
            u(r, a, e, e[89], n ? d(a, e[89], s, Yo) : p(e[89]), Qo);
      },
      i(e) {
        n || (re(r, e), (n = !0));
      },
      o(e) {
        se(r, e), (n = !1);
      },
      d(e) {
        e && b(t), r && r.d(e);
      },
    };
  }
  function nl(e) {
    let n, i;
    const a = [
      { noLabel: e[8] || (null == e[9] && !e[52].label) },
      Ye(e[53], "outline$"),
    ];
    let r = { $$slots: { default: [rl] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new $i({ props: r })),
      e[68](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (768 & t[0]) | (6291456 & t[1])
              ? le(a, [
                  (768 & t[0]) | (2097152 & t[1]) && {
                    noLabel: e[8] || (null == e[9] && !e[52].label),
                  },
                  4194304 & t[1] && ce(Ye(e[53], "outline$")),
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
          se(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[68](null), fe(n, t);
        },
      }
    );
  }
  function il(e) {
    let n, i;
    const a = [
      { id: e[11] + "-smui-label" },
      { floatAbove: "" !== e[43] },
      { required: e[10] },
      Ye(e[53], "label$"),
    ];
    let r = { $$slots: { default: [al] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new li({ props: r })),
      e[67](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (3072 & t[0]) | (4198400 & t[1])
              ? le(a, [
                  2048 & t[0] && { id: e[11] + "-smui-label" },
                  4096 & t[1] && { floatAbove: "" !== e[43] },
                  1024 & t[0] && { required: e[10] },
                  4194304 & t[1] && ce(Ye(e[53], "label$")),
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
          se(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[67](null), fe(n, t);
        },
      }
    );
  }
  function al(e) {
    let t,
      n,
      i = (null == e[9] ? "" : e[9]) + "";
    const a = e[63].label,
      r = l(a, e, e[89], Xo);
    return {
      c() {
        (t = C(i)), r && r.c();
      },
      m(e, i) {
        v(e, t, i), r && r.m(e, i), (n = !0);
      },
      p(e, s) {
        (!n || 512 & s[0]) &&
          i !== (i = (null == e[9] ? "" : e[9]) + "") &&
          L(t, i),
          r &&
            r.p &&
            (!n || 134217728 & s[2]) &&
            u(r, a, e, e[89], n ? d(a, e[89], s, Wo) : p(e[89]), Xo);
      },
      i(e) {
        n || (re(r, e), (n = !0));
      },
      o(e) {
        se(r, e), (n = !1);
      },
      d(e) {
        e && b(t), r && r.d(e);
      },
    };
  }
  function rl(e) {
    let t,
      n,
      i = !e[8] && (null != e[9] || e[52].label) && il(e);
    return {
      c() {
        i && i.c(), (t = S());
      },
      m(e, a) {
        i && i.m(e, a), v(e, t, a), (n = !0);
      },
      p(e, n) {
        e[8] || (null == e[9] && !e[52].label)
          ? i &&
            (ie(),
            se(i, 1, 1, () => {
              i = null;
            }),
            ae())
          : i
          ? (i.p(e, n), (768 & n[0]) | (2097152 & n[1]) && re(i, 1))
          : ((i = il(e)), i.c(), re(i, 1), i.m(t.parentNode, t));
      },
      i(e) {
        n || (re(i), (n = !0));
      },
      o(e) {
        se(i), (n = !1);
      },
      d(e) {
        i && i.d(e), e && b(t);
      },
    };
  }
  function sl(e) {
    let n, i;
    const a = [Ye(e[53], "ripple$")];
    let r = {};
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new pi({ props: r })),
      e[70](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i = 4194304 & t[1] ? le(a, [ce(Ye(e[53], "ripple$"))]) : {};
          n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          se(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[70](null), fe(n, t);
        },
      }
    );
  }
  function ol(e) {
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
          u(i, n, e, e[89], t ? d(n, e[89], a, null) : p(e[89]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function ll(e) {
    let n, i, a;
    const r = [{ role: "listbox" }, { wrapFocus: e[36] }, Ye(e[53], "list$")];
    function s(t) {
      e[76](t);
    }
    let o = { $$slots: { default: [ol] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) o = t(o, r[e]);
    return (
      void 0 !== e[24] && (o.selectedIndex = e[24]),
      (n = new Ya({ props: o })),
      j.push(() => de(n, "selectedIndex", s)),
      n.$on("SMUIList:mount", e[77]),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p(e, t) {
          const a =
            4194336 & t[1]
              ? le(r, [
                  r[0],
                  32 & t[1] && { wrapFocus: e[36] },
                  4194304 & t[1] && ce(Ye(e[53], "list$")),
                ])
              : {};
          134217728 & t[2] && (a.$$scope = { dirty: t, ctx: e }),
            !i &&
              16777216 & t[0] &&
              ((i = !0), (a.selectedIndex = e[24]), Y(() => (i = !1))),
            n.$set(a);
        },
        i(e) {
          a || (re(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          se(n.$$.fragment, e), (a = !1);
        },
        d(e) {
          fe(n, e);
        },
      }
    );
  }
  function cl(e) {
    let n, i;
    const a = [Ye(e[53], "helperText$")];
    let r = { $$slots: { default: [dl] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new jo({ props: r })),
      n.$on("SMUISelectHelperText:id", e[86]),
      n.$on("SMUISelectHelperText:mount", e[87]),
      n.$on("SMUISelectHelperText:unmount", e[88]),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i = 4194304 & t[1] ? le(a, [ce(Ye(e[53], "helperText$"))]) : {};
          134217728 & t[2] && (i.$$scope = { dirty: t, ctx: e }), n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          se(n.$$.fragment, e), (i = !1);
        },
        d(e) {
          fe(n, e);
        },
      }
    );
  }
  function dl(e) {
    let t;
    const n = e[63].helperText,
      i = l(n, e, e[89], Go);
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
          u(i, n, e, e[89], t ? d(n, e[89], a, zo) : p(e[89]), Go);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function ul(e) {
    let n,
      i,
      s,
      o,
      c,
      f,
      m,
      h,
      g,
      E,
      D,
      N,
      M,
      w,
      R,
      F,
      k,
      U,
      P,
      H,
      B,
      V,
      z,
      G,
      q,
      K,
      W,
      X,
      Q,
      Z,
      J,
      ee,
      te,
      ne,
      oe,
      me,
      he,
      ge,
      $e,
      Ie,
      ve = e[12] && Zo(e),
      be = "filled" === e[7] && Jo(),
      Ee =
        "outlined" !== e[7] && !e[8] && (null != e[9] || e[52].label) && el(e),
      ye = "outlined" === e[7] && nl(e);
    const Ae = e[63].leadingIcon,
      Ce = l(Ae, e, e[89], Ko);
    let _e = [
        { id: (D = e[11] + "-smui-selected-text") },
        { class: (N = ze({ [e[19]]: !0, "mdc-select__selected-text": !0 })) },
        { role: "button" },
        { "aria-haspopup": "listbox" },
        { "aria-labelledby": (M = e[11] + "-smui-label") },
        Ye(e[53], "selectedText$"),
      ],
      Se = {};
    for (let e = 0; e < _e.length; e += 1) Se = t(Se, _e[e]);
    let Te = [
        {
          class: (R = ze({
            [e[17]]: !0,
            "mdc-select__selected-text-container": !0,
          })),
        },
        Ye(e[53], "selectedTextContainer$"),
      ],
      xe = {};
    for (let e = 0; e < Te.length; e += 1) xe = t(xe, Te[e]);
    let Oe = [
        { class: (V = ze({ [e[21]]: !0, "mdc-select__dropdown-icon": !0 })) },
        Ye(e[53], "dropdownIcon$"),
      ],
      Le = {};
    for (let e = 0; e < Oe.length; e += 1) Le = t(Le, Oe[e]);
    let De = "outlined" !== e[7] && e[5] && sl(e),
      Ne = [
        { class: (q = ze({ [e[15]]: !0, "mdc-select__anchor": !0 })) },
        { "aria-required": (K = e[10] ? "true" : void 0) },
        { "aria-disabled": (W = e[6] ? "true" : void 0) },
        { "aria-controls": e[31] },
        { "aria-describedby": e[31] },
        e[29],
        Ye(e[53], "anchor$"),
      ],
      Me = {};
    for (let e = 0; e < Ne.length; e += 1) Me = t(Me, Ne[e]);
    const we = [
      { class: ze({ [e[22]]: !0, "mdc-select__menu": !0, ...e[33] }) },
      { fullWidth: !0 },
      { anchor: !1 },
      { anchorElement: e[34] },
      { anchorCorner: e[35] },
      Ye(e[53], "menu$"),
    ];
    function Re(t) {
      e[78](t);
    }
    let Fe = { $$slots: { default: [ll] }, $$scope: { ctx: e } };
    for (let e = 0; e < we.length; e += 1) Fe = t(Fe, we[e]);
    void 0 !== e[32] && (Fe.open = e[32]),
      (Z = new ko({ props: Fe })),
      j.push(() => de(Z, "open", Re)),
      Z.$on("SMUIMenu:selected", e[79]),
      Z.$on("SMUIMenuSurface:closing", e[80]),
      Z.$on("SMUIMenuSurface:closed", e[81]),
      Z.$on("SMUIMenuSurface:opened", e[82]);
    let ke = [
        {
          class: (ee = ze({
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
          style: (te = Object.entries(e[27]).map(fl).concat([e[4]]).join(" ")),
        },
        qe(e[53], [
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
    let Pe = e[52].helperText && cl(e);
    return {
      c() {
        (n = y("div")),
          ve && ve.c(),
          (i = _()),
          (s = y("div")),
          be && be.c(),
          (o = _()),
          Ee && Ee.c(),
          (c = _()),
          ye && ye.c(),
          (f = _()),
          Ce && Ce.c(),
          (m = _()),
          (h = y("span")),
          (g = y("span")),
          (E = C(e[43])),
          (k = _()),
          (U = y("span")),
          (P = A("svg")),
          (H = A("polygon")),
          (B = A("polygon")),
          (G = _()),
          De && De.c(),
          (Q = _()),
          ue(Z.$$.fragment),
          (me = _()),
          Pe && Pe.c(),
          (he = S()),
          O(g, Se),
          O(h, xe),
          x(H, "class", "mdc-select__dropdown-icon-inactive"),
          x(H, "stroke", "none"),
          x(H, "fill-rule", "evenodd"),
          x(H, "points", "7 10 12 15 17 10"),
          x(B, "class", "mdc-select__dropdown-icon-active"),
          x(B, "stroke", "none"),
          x(B, "fill-rule", "evenodd"),
          x(B, "points", "7 15 12 10 17 15"),
          x(P, "class", "mdc-select__dropdown-icon-graphic"),
          x(P, "viewBox", "7 10 10 5"),
          x(P, "focusable", "false"),
          O(U, Le),
          O(s, Me),
          O(n, Ue);
      },
      m(t, a) {
        v(t, n, a),
          ve && ve.m(n, null),
          I(n, i),
          I(n, s),
          be && be.m(s, null),
          I(s, o),
          Ee && Ee.m(s, null),
          I(s, c),
          ye && ye.m(s, null),
          I(s, f),
          Ce && Ce.m(s, null),
          I(s, m),
          I(s, h),
          I(h, g),
          I(g, E),
          e[69](g),
          I(s, k),
          I(s, U),
          I(U, P),
          I(P, H),
          I(P, B),
          I(s, G),
          De && De.m(s, null),
          e[71](s),
          I(n, Q),
          pe(Z, n, null),
          e[83](n),
          v(t, me, a),
          Pe && Pe.m(t, a),
          v(t, he, a),
          (ge = !0),
          $e ||
            ((Ie = [
              $((w = Qe.call(null, g, e[18]))),
              $((F = Qe.call(null, h, e[16]))),
              $((z = Qe.call(null, U, e[20]))),
              $((X = Qe.call(null, s, e[14]))),
              T(s, "focus", e[72]),
              T(s, "blur", e[73]),
              T(s, "click", e[74]),
              T(s, "keydown", e[75]),
              T(s, "focus", e[64]),
              T(s, "blur", e[65]),
              $(
                (ne = ti.call(null, n, {
                  ripple: "filled" === e[7],
                  unbounded: !1,
                  addClass: e[49],
                  removeClass: e[50],
                  addStyle: e[51],
                }))
              ),
              $(Mo.call(null, n, { addClass: e[49], removeClass: e[50] })),
              $((oe = Qe.call(null, n, e[2]))),
              $(e[44].call(null, n)),
              T(n, "SMUISelectLeadingIcon:mount", e[84]),
              T(n, "SMUISelectLeadingIcon:unmount", e[85]),
            ]),
            ($e = !0));
      },
      p(e, t) {
        e[12]
          ? ve
            ? ve.p(e, t)
            : ((ve = Zo(e)), ve.c(), ve.m(n, i))
          : ve && (ve.d(1), (ve = null)),
          "filled" === e[7]
            ? be || ((be = Jo()), be.c(), be.m(s, o))
            : be && (be.d(1), (be = null)),
          "outlined" === e[7] || e[8] || (null == e[9] && !e[52].label)
            ? Ee &&
              (ie(),
              se(Ee, 1, 1, () => {
                Ee = null;
              }),
              ae())
            : Ee
            ? (Ee.p(e, t), (896 & t[0]) | (2097152 & t[1]) && re(Ee, 1))
            : ((Ee = el(e)), Ee.c(), re(Ee, 1), Ee.m(s, c)),
          "outlined" === e[7]
            ? ye
              ? (ye.p(e, t), 128 & t[0] && re(ye, 1))
              : ((ye = nl(e)), ye.c(), re(ye, 1), ye.m(s, f))
            : ye &&
              (ie(),
              se(ye, 1, 1, () => {
                ye = null;
              }),
              ae()),
          Ce &&
            Ce.p &&
            (!ge || 134217728 & t[2]) &&
            u(Ce, Ae, e, e[89], ge ? d(Ae, e[89], t, qo) : p(e[89]), Ko),
          (!ge || 4096 & t[1]) && L(E, e[43]),
          O(
            g,
            (Se = le(_e, [
              (!ge ||
                (2048 & t[0] && D !== (D = e[11] + "-smui-selected-text"))) && {
                id: D,
              },
              (!ge ||
                (524288 & t[0] &&
                  N !==
                    (N = ze({
                      [e[19]]: !0,
                      "mdc-select__selected-text": !0,
                    })))) && { class: N },
              { role: "button" },
              { "aria-haspopup": "listbox" },
              (!ge || (2048 & t[0] && M !== (M = e[11] + "-smui-label"))) && {
                "aria-labelledby": M,
              },
              4194304 & t[1] && Ye(e[53], "selectedText$"),
            ]))
          ),
          w && r(w.update) && 262144 & t[0] && w.update.call(null, e[18]),
          O(
            h,
            (xe = le(Te, [
              (!ge ||
                (131072 & t[0] &&
                  R !==
                    (R = ze({
                      [e[17]]: !0,
                      "mdc-select__selected-text-container": !0,
                    })))) && { class: R },
              4194304 & t[1] && Ye(e[53], "selectedTextContainer$"),
            ]))
          ),
          F && r(F.update) && 65536 & t[0] && F.update.call(null, e[16]),
          O(
            U,
            (Le = le(Oe, [
              (!ge ||
                (2097152 & t[0] &&
                  V !==
                    (V = ze({
                      [e[21]]: !0,
                      "mdc-select__dropdown-icon": !0,
                    })))) && { class: V },
              4194304 & t[1] && Ye(e[53], "dropdownIcon$"),
            ]))
          ),
          z && r(z.update) && 1048576 & t[0] && z.update.call(null, e[20]),
          "outlined" !== e[7] && e[5]
            ? De
              ? (De.p(e, t), 160 & t[0] && re(De, 1))
              : ((De = sl(e)), De.c(), re(De, 1), De.m(s, null))
            : De &&
              (ie(),
              se(De, 1, 1, () => {
                De = null;
              }),
              ae()),
          O(
            s,
            (Me = le(Ne, [
              (!ge ||
                (32768 & t[0] &&
                  q !==
                    (q = ze({ [e[15]]: !0, "mdc-select__anchor": !0 })))) && {
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
              4194304 & t[1] && Ye(e[53], "anchor$"),
            ]))
          ),
          X && r(X.update) && 16384 & t[0] && X.update.call(null, e[14]);
        const a =
          (4194304 & t[0]) | (4194332 & t[1])
            ? le(we, [
                (4194304 & t[0]) | (4 & t[1]) && {
                  class: ze({ [e[22]]: !0, "mdc-select__menu": !0, ...e[33] }),
                },
                we[1],
                we[2],
                8 & t[1] && { anchorElement: e[34] },
                16 & t[1] && { anchorCorner: e[35] },
                4194304 & t[1] && ce(Ye(e[53], "menu$")),
              ])
            : {};
        (16777216 & t[0]) | (4194400 & t[1]) | (134217728 & t[2]) &&
          (a.$$scope = { dirty: t, ctx: e }),
          !J && 2 & t[1] && ((J = !0), (a.open = e[32]), Y(() => (J = !1))),
          Z.$set(a),
          O(
            n,
            (Ue = le(ke, [
              (!ge ||
                ((67119050 & t[0]) | (2097154 & t[1]) &&
                  ee !==
                    (ee = ze({
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
                      .map(fl)
                      .concat([e[4]])
                      .join(" ")))) && { style: te },
              4194304 & t[1] &&
                qe(e[53], [
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
            r(ne.update) &&
            128 & t[0] &&
            ne.update.call(null, {
              ripple: "filled" === e[7],
              unbounded: !1,
              addClass: e[49],
              removeClass: e[50],
              addStyle: e[51],
            }),
          oe && r(oe.update) && 4 & t[0] && oe.update.call(null, e[2]),
          e[52].helperText
            ? Pe
              ? (Pe.p(e, t), 2097152 & t[1] && re(Pe, 1))
              : ((Pe = cl(e)), Pe.c(), re(Pe, 1), Pe.m(he.parentNode, he))
            : Pe &&
              (ie(),
              se(Pe, 1, 1, () => {
                Pe = null;
              }),
              ae());
      },
      i(e) {
        ge ||
          (re(Ee),
          re(ye),
          re(Ce, e),
          re(De),
          re(Z.$$.fragment, e),
          re(Pe),
          (ge = !0));
      },
      o(e) {
        se(Ee),
          se(ye),
          se(Ce, e),
          se(De),
          se(Z.$$.fragment, e),
          se(Pe),
          (ge = !1);
      },
      d(t) {
        t && b(n),
          ve && ve.d(),
          be && be.d(),
          Ee && Ee.d(),
          ye && ye.d(),
          Ce && Ce.d(t),
          e[69](null),
          De && De.d(),
          e[71](null),
          fe(Z),
          e[83](null),
          t && b(me),
          Pe && Pe.d(t),
          t && b(he),
          ($e = !1),
          a(Ie);
      },
    };
  }
  let pl = 0;
  const fl = ([e, t]) => `${e}: ${t};`;
  function ml(e, n, i) {
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
    let r,
      s,
      l = m(n, a),
      { $$slots: c = {}, $$scope: d } = n;
    const u = h(c),
      p = Xe(R());
    let $ = () => {};
    function I(e) {
      return e === $;
    }
    let { use: v = [] } = n,
      { class: b = "" } = n,
      { style: E = "" } = n,
      { ripple: y = !0 } = n,
      { disabled: A = !1 } = n,
      { variant: C = "standard" } = n,
      { noLabel: _ = !1 } = n,
      { label: S } = n,
      { value: T = "" } = n,
      { key: x = (e) => e } = n,
      { dirty: O = !1 } = n,
      { invalid: L = $ } = n,
      { updateInvalid: D = I(L) } = n;
    const N = I(L);
    I(L) && (L = !1);
    let M,
      w,
      U,
      V,
      z,
      G,
      q,
      K,
      W,
      X,
      Y,
      Q,
      Z,
      J,
      { required: ee = !1 } = n,
      { inputId: te = "SMUI-select-" + pl++ } = n,
      { hiddenInput: ne = !1 } = n,
      { withLeadingIcon: ie = $ } = n,
      { anchor$use: ae = [] } = n,
      { anchor$class: re = "" } = n,
      { selectedTextContainer$use: se = [] } = n,
      { selectedTextContainer$class: oe = "" } = n,
      { selectedText$use: le = [] } = n,
      { selectedText$class: ce = "" } = n,
      { dropdownIcon$use: de = [] } = n,
      { dropdownIcon$class: ue = "" } = n,
      { menu$class: pe = "" } = n,
      fe = {},
      me = {},
      he = {},
      ge = -1,
      $e = H("SMUI:addLayoutListener"),
      Ie = !1,
      ve = {},
      be = !1,
      Ee = H("SMUI:select:context");
    P("SMUI:list:role", ""), P("SMUI:list:nav", !1);
    const ye = je("");
    o(e, ye, (e) => i(43, (r = e))), P("SMUI:select:selectedText", ye);
    const Ae = je(T);
    o(e, Ae, (e) => i(91, (s = e))), P("SMUI:select:value", Ae);
    let Ce = ge;
    function _e(e) {
      return e in fe ? fe[e] : Fe().classList.contains(e);
    }
    function Se(e) {
      fe[e] || i(26, (fe[e] = !0), fe);
    }
    function Te(e) {
      (e in fe && !fe[e]) || i(26, (fe[e] = !1), fe);
    }
    function xe(e) {
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
    function De(e, t) {
      he[e] !== t && i(29, (he[e] = t), he);
    }
    function Ne(e) {
      (e in he && null == he[e]) || i(29, (he[e] = void 0), he);
    }
    function Me() {
      return W.getOrderedList().map((e) => e.getValue());
    }
    function we(e) {
      w.setUseDefaultValidation(e);
    }
    function Re() {
      w.layout();
    }
    function Fe() {
      return M;
    }
    $e && (G = $e(Re)),
      F(
        () => (
          i(
            23,
            (w = new Co(
              {
                setSelectedText: (e) => {
                  g(ye, (r = e), r);
                },
                isSelectAnchorFocused: () => document.activeElement === U,
                getSelectAnchorAttr: Le,
                setSelectAnchorAttr: De,
                removeSelectAnchorAttr: Ne,
                addMenuClass: xe,
                removeMenuClass: Oe,
                openMenu: () => {
                  i(32, (Ie = !0));
                },
                closeMenu: () => {
                  i(32, (Ie = !1));
                },
                getAnchorElement: () => U,
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
                  i(62, (Ce = e)), i(24, (ge = e)), i(0, (T = Me()[ge]));
                },
                focusMenuItemAtIndex: (e) => {
                  W.focusItemAtIndex(e);
                },
                getMenuItemCount: () => W.items.length,
                getMenuItemValues: () => Me().map(x),
                getMenuItemTextAtIndex: (e) => W.getPrimaryTextAtIndex(e),
                isTypeaheadInProgress: () => W.typeaheadInProgress,
                typeaheadMatchItem: (e, t) => W.typeaheadMatchItem(e, t),
                addClass: Se,
                removeClass: Te,
                hasClass: _e,
                setRippleCenter: (e) => Z && Z.setRippleCenter(e),
                activateBottomLine: () => Z && Z.activate(),
                deactivateBottomLine: () => Z && Z.deactivate(),
                notifyChange: (e) => {
                  i(54, (O = !0)),
                    D && i(1, (L = !w.isValid())),
                    Ge(
                      Fe(),
                      "SMUISelect:change",
                      { value: T, index: ge },
                      void 0,
                      !0
                    );
                },
                hasOutline: () => !!J,
                notchOutline: (e) => J && J.notch(e),
                closeOutline: () => J && J.closeNotch(),
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
          i(24, (ge = Me().indexOf(T))),
          w.init(),
          we(N),
          () => {
            w.destroy();
          }
        )
      ),
      k(() => {
        G && G();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(53, (l = m(n, a))),
          "use" in e && i(2, (v = e.use)),
          "class" in e && i(3, (b = e.class)),
          "style" in e && i(4, (E = e.style)),
          "ripple" in e && i(5, (y = e.ripple)),
          "disabled" in e && i(6, (A = e.disabled)),
          "variant" in e && i(7, (C = e.variant)),
          "noLabel" in e && i(8, (_ = e.noLabel)),
          "label" in e && i(9, (S = e.label)),
          "value" in e && i(0, (T = e.value)),
          "key" in e && i(55, (x = e.key)),
          "dirty" in e && i(54, (O = e.dirty)),
          "invalid" in e && i(1, (L = e.invalid)),
          "updateInvalid" in e && i(56, (D = e.updateInvalid)),
          "required" in e && i(10, (ee = e.required)),
          "inputId" in e && i(11, (te = e.inputId)),
          "hiddenInput" in e && i(12, (ne = e.hiddenInput)),
          "withLeadingIcon" in e && i(13, (ie = e.withLeadingIcon)),
          "anchor$use" in e && i(14, (ae = e.anchor$use)),
          "anchor$class" in e && i(15, (re = e.anchor$class)),
          "selectedTextContainer$use" in e &&
            i(16, (se = e.selectedTextContainer$use)),
          "selectedTextContainer$class" in e &&
            i(17, (oe = e.selectedTextContainer$class)),
          "selectedText$use" in e && i(18, (le = e.selectedText$use)),
          "selectedText$class" in e && i(19, (ce = e.selectedText$class)),
          "dropdownIcon$use" in e && i(20, (de = e.dropdownIcon$use)),
          "dropdownIcon$class" in e && i(21, (ue = e.dropdownIcon$class)),
          "menu$class" in e && i(22, (pe = e.menu$class)),
          "$$scope" in e && i(89, (d = e.$$scope));
      }),
      (e.$$.update = () => {
        if ((25165825 & e.$$.dirty[0]) | (1 & e.$$.dirty[2]) && Ce !== ge)
          if ((i(62, (Ce = ge)), w)) w.setSelectedIndex(ge, !1, !0);
          else {
            const e = Me();
            T !== e[ge] && i(0, (T = e[ge]));
          }
        1 & e.$$.dirty[0] && g(Ae, (s = T), s),
          (8388609 & e.$$.dirty[0]) | (16777216 & e.$$.dirty[1]) &&
            w &&
            w.getValue() !== x(T) &&
            w.setValue(x(T)),
          8388672 & e.$$.dirty[0] &&
            w &&
            w.getDisabled() !== A &&
            w.setDisabled(A),
          (8388610 & e.$$.dirty[0]) | (41943040 & e.$$.dirty[1]) &&
            w &&
            O &&
            w.isValid() !== !L &&
            (D ? i(1, (L = !w.isValid())) : w.setValid(!L)),
          8389632 & e.$$.dirty[0] &&
            w &&
            w.getRequired() !== ee &&
            w.setRequired(ee);
      }),
      [
        T,
        L,
        v,
        b,
        E,
        y,
        A,
        C,
        _,
        S,
        ee,
        te,
        ne,
        ie,
        ae,
        re,
        se,
        oe,
        le,
        ce,
        de,
        ue,
        pe,
        w,
        ge,
        M,
        fe,
        me,
        U,
        he,
        V,
        z,
        Ie,
        ve,
        q,
        K,
        be,
        W,
        X,
        Y,
        Q,
        Z,
        J,
        r,
        p,
        I,
        Ee,
        ye,
        Ae,
        Se,
        Te,
        function (e, t) {
          me[e] != t &&
            ("" === t || null == t
              ? (delete me[e], i(27, me))
              : i(27, (me[e] = t), me));
        },
        u,
        l,
        O,
        x,
        D,
        function () {
          return w.getUseDefaultValidation();
        },
        we,
        function () {
          U.focus();
        },
        Re,
        Fe,
        Ce,
        c,
        function (t) {
          B.call(this, e, t);
        },
        function (t) {
          B.call(this, e, t);
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (Q = e), i(40, Q);
          });
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (Q = e), i(40, Q);
          });
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (J = e), i(42, J);
          });
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (V = e), i(30, V);
          });
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (Z = e), i(41, Z);
          });
        },
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (U = e), i(28, U);
          });
        },
        () => w && w.handleFocus(),
        () => w && w.handleBlur(),
        (e) => {
          U.focus(),
            w &&
              w.handleClick(
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
        (e) => w && w.handleKeydown(e),
        function (e) {
          (ge = e), i(24, ge);
        },
        (e) => i(37, (W = e.detail)),
        function (e) {
          (Ie = e), i(32, Ie);
        },
        (e) => w && w.handleMenuItemAction(e.detail.index),
        () => w && w.handleMenuClosing(),
        () => w && w.handleMenuClosed(),
        () => w && w.handleMenuOpened(),
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (M = e), i(25, M);
          });
        },
        (e) => i(38, (X = e.detail)),
        () => i(38, (X = void 0)),
        (e) => i(31, (z = e.detail)),
        (e) => i(39, (Y = e.detail)),
        () => {
          i(31, (z = void 0)), i(39, (Y = void 0));
        },
        d,
      ]
    );
  }
  class hl extends he {
    constructor(e) {
      super(),
        me(
          this,
          e,
          ml,
          ul,
          s,
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
  function gl(e) {
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
          u(i, n, e, e[13], t ? d(n, e[13], a, null) : p(e[13]), null);
      },
      i(e) {
        t || (re(i, e), (t = !0));
      },
      o(e) {
        se(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function $l(e) {
    let n, i;
    const a = [
      { use: e[3] },
      { "data-value": e[0] },
      { value: e[0] },
      { selected: e[2] },
      e[6],
    ];
    let r = { $$slots: { default: [gl] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new lr({ props: r })),
      e[12](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (i = !0);
        },
        p(e, [t]) {
          const i =
            77 & t
              ? le(a, [
                  8 & t && { use: e[3] },
                  1 & t && { "data-value": e[0] },
                  1 & t && { value: e[0] },
                  4 & t && { selected: e[2] },
                  64 & t && ce(e[6]),
                ])
              : {};
          8192 & t && (i.$$scope = { dirty: t, ctx: e }), n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          se(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[12](null), fe(n, t);
        },
      }
    );
  }
  function Il(e, n, i) {
    let a, r;
    const s = ["use", "class", "value", "getElement"];
    let l,
      c,
      d = m(n, s),
      { $$slots: u = {}, $$scope: p } = n;
    const h = Xe(R());
    let { use: $ = [] } = n;
    let I,
      { value: v = "" } = n;
    const b = H("SMUI:select:selectedText");
    o(e, b, (e) => i(14, (l = e)));
    const E = H("SMUI:select:value");
    function y() {
      r && I && g(b, (l = I.getPrimaryText()), l);
    }
    return (
      o(e, E, (e) => i(10, (c = e))),
      P("SMUI:list:item:role", "option"),
      F(y),
      k(y),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(6, (d = m(n, s))),
          "use" in e && i(7, ($ = e.use)),
          "value" in e && i(0, (v = e.value)),
          "$$scope" in e && i(13, (p = e.$$scope));
      }),
      (e.$$.update = () => {
        128 & e.$$.dirty && i(3, (a = [h, ...$])),
          1025 & e.$$.dirty && i(2, (r = null != v && "" !== v && c === v));
      }),
      [
        v,
        I,
        r,
        a,
        b,
        E,
        d,
        $,
        "",
        function () {
          return I.getElement();
        },
        c,
        u,
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (I = e), i(1, I);
          });
        },
        p,
      ]
    );
  }
  const vl = class extends he {
    constructor(e) {
      super(),
        me(this, e, Il, $l, s, { use: 7, class: 8, value: 0, getElement: 9 });
    }
    get class() {
      return this.$$.ctx[8];
    }
    get getElement() {
      return this.$$.ctx[9];
    }
  };
  function bl(e, t, n) {
    const i = e.slice();
    return (i[17] = t[n]), i;
  }
  function El(e, t, n) {
    const i = e.slice();
    return (i[17] = t[n]), i;
  }
  function yl(e) {
    let t, n;
    return (
      (t = new lo({
        props: { $$slots: { label: [Tl], default: [Sl] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          4194308 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function Al(e) {
    let t, n;
    return (
      (t = new lo({
        props: { $$slots: { default: [Dl] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          4194316 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function Cl(e) {
    let t, n;
    return (
      (t = new lo({
        props: { $$slots: { default: [Nl] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          4194316 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function _l(e) {
    let t, n;
    return (
      (t = new lo({
        props: { $$slots: { default: [Ml] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          4194316 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function Sl(e) {
    let t, n, i;
    function a(t) {
      e[14](t);
    }
    let r = { indeterminate: null === e[2] };
    return (
      void 0 !== e[2] && (r.checked = e[2]),
      (t = new Js({ props: r })),
      j.push(() => de(t, "checked", a)),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, n) {
          pe(t, e, n), (i = !0);
        },
        p(e, i) {
          const a = {};
          4 & i && (a.indeterminate = null === e[2]),
            !n && 4 & i && ((n = !0), (a.checked = e[2]), Y(() => (n = !1))),
            t.$set(a);
        },
        i(e) {
          i || (re(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function Tl(t) {
    let n;
    return {
      c() {
        (n = y("span")), (n.textContent = `${t[5]}`), x(n, "slot", "label");
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
  function xl(t) {
    let n,
      i = t[17].name + "";
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
  function Ol(e) {
    let t, n;
    return (
      (t = new vl({
        props: {
          value: e[17].name,
          $$slots: { default: [xl] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          4194304 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function Ll(e) {
    let t,
      n,
      i = e[6],
      a = [];
    for (let t = 0; t < i.length; t += 1) a[t] = Ol(El(e, i, t));
    const r = (e) =>
      se(a[e], 1, 1, () => {
        a[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < a.length; e += 1) a[e].c();
        t = S();
      },
      m(e, i) {
        for (let t = 0; t < a.length; t += 1) a[t].m(e, i);
        v(e, t, i), (n = !0);
      },
      p(e, n) {
        if (64 & n) {
          let s;
          for (i = e[6], s = 0; s < i.length; s += 1) {
            const r = El(e, i, s);
            a[s]
              ? (a[s].p(r, n), re(a[s], 1))
              : ((a[s] = Ol(r)),
                a[s].c(),
                re(a[s], 1),
                a[s].m(t.parentNode, t));
          }
          for (ie(), s = i.length; s < a.length; s += 1) r(s);
          ae();
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
        for (let e = 0; e < a.length; e += 1) se(a[e]);
        n = !1;
      },
      d(e) {
        E(a, e), e && b(t);
      },
    };
  }
  function Dl(e) {
    let t, n, i, a, r, s;
    function o(t) {
      e[12](t);
    }
    let l = { indeterminate: null === e[2] };
    function c(t) {
      e[13](t);
    }
    void 0 !== e[2] && (l.checked = e[2]),
      (t = new Js({ props: l })),
      j.push(() => de(t, "checked", o));
    let d = { label: e[5], $$slots: { default: [Ll] }, $$scope: { ctx: e } };
    return (
      void 0 !== e[3] && (d.value = e[3]),
      (a = new hl({ props: d })),
      j.push(() => de(a, "value", c)),
      {
        c() {
          ue(t.$$.fragment), (i = _()), ue(a.$$.fragment);
        },
        m(e, n) {
          pe(t, e, n), v(e, i, n), pe(a, e, n), (s = !0);
        },
        p(e, i) {
          const s = {};
          4 & i && (s.indeterminate = null === e[2]),
            !n && 4 & i && ((n = !0), (s.checked = e[2]), Y(() => (n = !1))),
            t.$set(s);
          const o = {};
          4194304 & i && (o.$$scope = { dirty: i, ctx: e }),
            !r && 8 & i && ((r = !0), (o.value = e[3]), Y(() => (r = !1))),
            a.$set(o);
        },
        i(e) {
          s || (re(t.$$.fragment, e), re(a.$$.fragment, e), (s = !0));
        },
        o(e) {
          se(t.$$.fragment, e), se(a.$$.fragment, e), (s = !1);
        },
        d(e) {
          fe(t, e), e && b(i), fe(a, e);
        },
      }
    );
  }
  function Nl(e) {
    let t, n, i, a, r, s;
    function o(t) {
      e[10](t);
    }
    let l = { indeterminate: null === e[2] };
    function c(t) {
      e[11](t);
    }
    void 0 !== e[2] && (l.checked = e[2]),
      (t = new Js({ props: l })),
      j.push(() => de(t, "checked", o));
    let d = { label: e[5], type: "number" };
    return (
      void 0 !== e[3] && (d.value = e[3]),
      (a = new Ca({ props: d })),
      j.push(() => de(a, "value", c)),
      {
        c() {
          ue(t.$$.fragment), (i = _()), ue(a.$$.fragment);
        },
        m(e, n) {
          pe(t, e, n), v(e, i, n), pe(a, e, n), (s = !0);
        },
        p(e, i) {
          const s = {};
          4 & i && (s.indeterminate = null === e[2]),
            !n && 4 & i && ((n = !0), (s.checked = e[2]), Y(() => (n = !1))),
            t.$set(s);
          const o = {};
          !r && 8 & i && ((r = !0), (o.value = e[3]), Y(() => (r = !1))),
            a.$set(o);
        },
        i(e) {
          s || (re(t.$$.fragment, e), re(a.$$.fragment, e), (s = !0));
        },
        o(e) {
          se(t.$$.fragment, e), se(a.$$.fragment, e), (s = !1);
        },
        d(e) {
          fe(t, e), e && b(i), fe(a, e);
        },
      }
    );
  }
  function Ml(e) {
    let t, n, i, a, r, s;
    function o(t) {
      e[8](t);
    }
    let l = { indeterminate: null === e[2] };
    function c(t) {
      e[9](t);
    }
    void 0 !== e[2] && (l.checked = e[2]),
      (t = new Js({ props: l })),
      j.push(() => de(t, "checked", o));
    let d = { label: e[5] };
    return (
      void 0 !== e[3] && (d.value = e[3]),
      (a = new Ca({ props: d })),
      j.push(() => de(a, "value", c)),
      {
        c() {
          ue(t.$$.fragment), (i = _()), ue(a.$$.fragment);
        },
        m(e, n) {
          pe(t, e, n), v(e, i, n), pe(a, e, n), (s = !0);
        },
        p(e, i) {
          const s = {};
          4 & i && (s.indeterminate = null === e[2]),
            !n && 4 & i && ((n = !0), (s.checked = e[2]), Y(() => (n = !1))),
            t.$set(s);
          const o = {};
          !r && 8 & i && ((r = !0), (o.value = e[3]), Y(() => (r = !1))),
            a.$set(o);
        },
        i(e) {
          s || (re(t.$$.fragment, e), re(a.$$.fragment, e), (s = !0));
        },
        o(e) {
          se(t.$$.fragment, e), se(a.$$.fragment, e), (s = !1);
        },
        d(e) {
          fe(t, e), e && b(i), fe(a, e);
        },
      }
    );
  }
  function wl(e) {
    let t,
      n,
      i,
      a,
      r,
      s,
      o = e[1] && Rl(e);
    return {
      c() {
        (t = y("div")),
          (t.textContent = "▶"),
          (n = _()),
          o && o.c(),
          (i = S()),
          x(t, "class", "arrow svelte-6wwn9g"),
          N(t, "arrowDown", e[4]);
      },
      m(l, c) {
        v(l, t, c),
          v(l, n, c),
          o && o.m(l, c),
          v(l, i, c),
          (a = !0),
          r || ((s = T(t, "click", e[7])), (r = !0));
      },
      p(e, n) {
        16 & n && N(t, "arrowDown", e[4]),
          e[1]
            ? o
              ? (o.p(e, n), 2 & n && re(o, 1))
              : ((o = Rl(e)), o.c(), re(o, 1), o.m(i.parentNode, i))
            : o &&
              (ie(),
              se(o, 1, 1, () => {
                o = null;
              }),
              ae());
      },
      i(e) {
        a || (re(o), (a = !0));
      },
      o(e) {
        se(o), (a = !1);
      },
      d(e) {
        e && b(t), e && b(n), o && o.d(e), e && b(i), (r = !1), s();
      },
    };
  }
  function Rl(e) {
    let t,
      n,
      i = e[6],
      a = [];
    for (let t = 0; t < i.length; t += 1) a[t] = Fl(bl(e, i, t));
    const r = (e) =>
      se(a[e], 1, 1, () => {
        a[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < a.length; e += 1) a[e].c();
        t = S();
      },
      m(e, i) {
        for (let t = 0; t < a.length; t += 1) a[t].m(e, i);
        v(e, t, i), (n = !0);
      },
      p(e, n) {
        if (64 & n) {
          let s;
          for (i = e[6], s = 0; s < i.length; s += 1) {
            const r = bl(e, i, s);
            a[s]
              ? (a[s].p(r, n), re(a[s], 1))
              : ((a[s] = Fl(r)),
                a[s].c(),
                re(a[s], 1),
                a[s].m(t.parentNode, t));
          }
          for (ie(), s = i.length; s < a.length; s += 1) r(s);
          ae();
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
        for (let e = 0; e < a.length; e += 1) se(a[e]);
        n = !1;
      },
      d(e) {
        E(a, e), e && b(t);
      },
    };
  }
  function Fl(t) {
    let n, i;
    return (
      (n = new Hl({ props: { tree: t[17] } })),
      n.$on("change", t[15]),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (i = !0);
        },
        p: e,
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          se(n.$$.fragment, e), (i = !1);
        },
        d(e) {
          fe(n, e);
        },
      }
    );
  }
  function kl(e) {
    let t, n, i, a, r, s;
    const o = [_l, Cl, Al, yl],
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
    let d = e[6].length > 0 && "EnumField" !== e[0].type && wl(e);
    return {
      c() {
        (t = y("ul")),
          (n = y("li")),
          a.c(),
          (r = _()),
          d && d.c(),
          x(t, "class", "svelte-6wwn9g");
      },
      m(e, a) {
        v(e, t, a),
          I(t, n),
          l[i].m(n, null),
          I(n, r),
          d && d.m(n, null),
          (s = !0);
      },
      p(e, [t]) {
        let s = i;
        (i = c(e)),
          i === s
            ? l[i].p(e, t)
            : (ie(),
              se(l[s], 1, 1, () => {
                l[s] = null;
              }),
              ae(),
              (a = l[i]),
              a ? a.p(e, t) : ((a = l[i] = o[i](e)), a.c()),
              re(a, 1),
              a.m(n, r)),
          e[6].length > 0 && "EnumField" !== e[0].type
            ? d
              ? (d.p(e, t), 1 & t && re(d, 1))
              : ((d = wl(e)), d.c(), re(d, 1), d.m(n, null))
            : d &&
              (ie(),
              se(d, 1, 1, () => {
                d = null;
              }),
              ae());
      },
      i(e) {
        s || (re(a), re(d), (s = !0));
      },
      o(e) {
        se(a), se(d), (s = !1);
      },
      d(e) {
        e && b(t), l[i].d(), d && d.d();
      },
    };
  }
  const Ul = {};
  function Pl(e, t, n) {
    let i,
      { tree: a } = t;
    const { name: r, children: s } = a;
    let o = Ul[r] || !1;
    let l = void 0 !== a.selected && a.selected,
      c = null;
    const d = U();
    return (
      (e.$$set = (e) => {
        "tree" in e && n(0, (a = e.tree));
      }),
      (e.$$.update = () => {
        2 & e.$$.dirty && n(4, (i = o)),
          13 & e.$$.dirty &&
            (console.log("checked:", l),
            n(0, (a.selected = l), a),
            n(0, (a.value = c), a),
            d("change", { tree: a }));
      }),
      [
        a,
        o,
        l,
        c,
        i,
        r,
        s,
        () => {
          n(1, (o = Ul[r] = !o));
        },
        function (e) {
          (l = e), n(2, l);
        },
        function (e) {
          (c = e), n(3, c);
        },
        function (e) {
          (l = e), n(2, l);
        },
        function (e) {
          (c = e), n(3, c);
        },
        function (e) {
          (l = e), n(2, l);
        },
        function (e) {
          (c = e), n(3, c);
        },
        function (e) {
          (l = e), n(2, l);
        },
        function (t) {
          B.call(this, e, t);
        },
      ]
    );
  }
  class Hl extends he {
    constructor(e) {
      super(), me(this, e, Pl, kl, s, { tree: 0 });
    }
  }
  function Bl(e, t, n) {
    const i = e.slice();
    return (i[3] = t[n]), i;
  }
  function Vl(e) {
    let t, n;
    return (
      (t = new Hl({ props: { tree: e[3] } })),
      t.$on("change", e[1]),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          1 & n && (i.tree = e[3]), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function jl(e) {
    let t,
      n,
      i = e[0],
      a = [];
    for (let t = 0; t < i.length; t += 1) a[t] = Vl(Bl(e, i, t));
    const r = (e) =>
      se(a[e], 1, 1, () => {
        a[e] = null;
      });
    return {
      c() {
        t = y("main");
        for (let e = 0; e < a.length; e += 1) a[e].c();
      },
      m(e, i) {
        v(e, t, i);
        for (let e = 0; e < a.length; e += 1) a[e].m(t, null);
        n = !0;
      },
      p(e, [n]) {
        if (3 & n) {
          let s;
          for (i = e[0], s = 0; s < i.length; s += 1) {
            const r = Bl(e, i, s);
            a[s]
              ? (a[s].p(r, n), re(a[s], 1))
              : ((a[s] = Vl(r)), a[s].c(), re(a[s], 1), a[s].m(t, null));
          }
          for (ie(), s = i.length; s < a.length; s += 1) r(s);
          ae();
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
        for (let e = 0; e < a.length; e += 1) se(a[e]);
        n = !1;
      },
      d(e) {
        e && b(t), E(a, e);
      },
    };
  }
  function zl(e) {
    const t = e.children.flatMap(zl);
    return e.selected && t.push(e), t;
  }
  function Gl(e, t, n) {
    let { trees: i } = t;
    const a = U();
    return (
      (e.$$set = (e) => {
        "trees" in e && n(0, (i = e.trees));
      }),
      [
        i,
        function () {
          const e = i.flatMap(zl);
          a("change", { filterTags: e });
        },
      ]
    );
  }
  class ql extends he {
    constructor(e) {
      super(), me(this, e, Gl, jl, s, { trees: 0 });
    }
  }
  class Kl {
    constructor() {
      const e = window.location.href.split("/");
      e.pop(), e.pop(), (this.baseUrl = e.join("/") + "/artifacts/");
    }
    async listArtifacts() {
      return (await this._fetch(this.baseUrl))
        .mapError((e) => new Ql(e.message))
        .unwrap();
    }
    async getDownloadUrl(e) {
      const t = this.baseUrl + e.id + "/downloadUrl";
      return (await this._fetch(t)).mapError((e) => new Zl(e.message)).unwrap();
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
      return (await this._fetch(this.baseUrl, n))
        .mapError((e) => new Jl(e.message))
        .unwrap();
    }
    async _fetch(e, t = null) {
      const n = await fetch(e, t);
      return Wl.from(n);
    }
  }
  class Wl {
    constructor(e, t) {
      (this._response = e), (this._error = t);
    }
    mapError(e) {
      return (this._error = this._error && e(this._error)), this;
    }
    async unwrap() {
      if (this._error) throw this._error;
      return this._response.json();
    }
    static async from(e) {
      let t = null;
      return e.status > 399 && (t = new Xl(await e.text())), new Wl(e, t);
    }
  }
  class Xl extends Error {
    constructor(e) {
      super(e);
    }
  }
  class Yl extends Error {
    constructor(e, t) {
      super(`Unable to ${e}: ${t}`);
    }
  }
  class Ql extends Yl {
    constructor(e) {
      super("list artifacts", e);
    }
  }
  class Zl extends Yl {
    constructor(e) {
      super("download", e);
    }
  }
  class Jl extends Yl {
    constructor(e) {
      super("create", e);
    }
  }
  const { document: ec } = oe;
  function tc(e, t, n) {
    const i = e.slice();
    return (i[36] = t[n]), i;
  }
  function nc(e) {
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
  function ic(t) {
    let n;
    return {
      c() {
        (n = y("p")),
          (n.textContent = "Select dataset to upload."),
          x(n, "class", "svelte-189na6l");
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
  function ac(t) {
    let n;
    return {
      c() {
        (n = y("p")),
          (n.textContent = "Select tags file for dataset."),
          x(n, "class", "svelte-189na6l");
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
  function rc(e) {
    let t,
      n,
      i,
      a,
      r,
      s,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      m,
      h,
      g,
      $,
      E,
      A = (e[9] ? e[9].name : "") + "",
      S = (e[10] ? e[10].taxonomyTags.map(Nc).join(", ") : "") + "";
    function T(t) {
      e[17](t);
    }
    let O = { label: "Name" };
    return (
      void 0 !== e[11] && (O.value = e[11]),
      (t = new Ca({ props: O })),
      j.push(() => de(t, "value", T)),
      (l = new Gs({
        props: { $$slots: { default: [ic] }, $$scope: { ctx: e } },
      })),
      l.$on("drop", e[14]),
      (m = new Gs({
        props: {
          accept: ".json",
          $$slots: { default: [ac] },
          $$scope: { ctx: e },
        },
      })),
      m.$on("drop", e[15]),
      {
        c() {
          ue(t.$$.fragment),
            (i = _()),
            (a = y("p")),
            (r = C("Dataset file:\n      ")),
            (s = C(A)),
            (o = _()),
            ue(l.$$.fragment),
            (c = _()),
            (d = y("p")),
            (u = C("Taxonomy Terms:\n      ")),
            (p = C(S)),
            (f = _()),
            ue(m.$$.fragment),
            (h = _()),
            (g = y("a")),
            ($ = C("Click to select tags for your dataset.")),
            x(a, "class", "svelte-189na6l"),
            x(d, "class", "svelte-189na6l"),
            x(g, "target", "_blank"),
            x(
              g,
              "href",
              window.location.href.replace("/Search/", "/TagCreator/")
            ),
            x(g, "class", "svelte-189na6l");
        },
        m(e, n) {
          pe(t, e, n),
            v(e, i, n),
            v(e, a, n),
            I(a, r),
            I(a, s),
            v(e, o, n),
            pe(l, e, n),
            v(e, c, n),
            v(e, d, n),
            I(d, u),
            I(d, p),
            v(e, f, n),
            pe(m, e, n),
            v(e, h, n),
            v(e, g, n),
            I(g, $),
            (E = !0);
        },
        p(e, i) {
          const a = {};
          !n && 2048 & i[0] && ((n = !0), (a.value = e[11]), Y(() => (n = !1))),
            t.$set(a),
            (!E || 512 & i[0]) &&
              A !== (A = (e[9] ? e[9].name : "") + "") &&
              L(s, A);
          const r = {};
          2048 & i[1] && (r.$$scope = { dirty: i, ctx: e }),
            l.$set(r),
            (!E || 1024 & i[0]) &&
              S !==
                (S =
                  (e[10] ? e[10].taxonomyTags.map(Nc).join(", ") : "") + "") &&
              L(p, S);
          const o = {};
          2048 & i[1] && (o.$$scope = { dirty: i, ctx: e }), m.$set(o);
        },
        i(e) {
          E ||
            (re(t.$$.fragment, e),
            re(l.$$.fragment, e),
            re(m.$$.fragment, e),
            (E = !0));
        },
        o(e) {
          se(t.$$.fragment, e),
            se(l.$$.fragment, e),
            se(m.$$.fragment, e),
            (E = !1);
        },
        d(e) {
          fe(t, e),
            e && b(i),
            e && b(a),
            e && b(o),
            fe(l, e),
            e && b(c),
            e && b(d),
            e && b(f),
            fe(m, e),
            e && b(h),
            e && b(g);
        },
      }
    );
  }
  function sc(e) {
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
  function oc(e) {
    let t, n;
    return (
      (t = new Zn({
        props: { $$slots: { default: [sc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2048 & n[1] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function lc(e) {
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
  function cc(e) {
    let t, n;
    return (
      (t = new Zn({
        props: { $$slots: { default: [lc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2048 & n[1] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function dc(e) {
    let t, n, i, a;
    return (
      (t = new vs({
        props: { $$slots: { default: [oc] }, $$scope: { ctx: e } },
      })),
      (i = new vs({
        props: { $$slots: { default: [cc] }, $$scope: { ctx: e } },
      })),
      i.$on("click", e[18]),
      {
        c() {
          ue(t.$$.fragment), (n = _()), ue(i.$$.fragment);
        },
        m(e, r) {
          pe(t, e, r), v(e, n, r), pe(i, e, r), (a = !0);
        },
        p(e, n) {
          const a = {};
          2048 & n[1] && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
          const r = {};
          2048 & n[1] && (r.$$scope = { dirty: n, ctx: e }), i.$set(r);
        },
        i(e) {
          a || (re(t.$$.fragment, e), re(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          se(t.$$.fragment, e), se(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          fe(t, e), e && b(n), fe(i, e);
        },
      }
    );
  }
  function uc(e) {
    let t, n, i, a, r, s;
    return (
      (t = new Xr({
        props: { id: "title", $$slots: { default: [nc] }, $$scope: { ctx: e } },
      })),
      (i = new Yr({
        props: {
          id: "content",
          $$slots: { default: [rc] },
          $$scope: { ctx: e },
        },
      })),
      (r = new Qr({
        props: { $$slots: { default: [dc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment),
            (n = _()),
            ue(i.$$.fragment),
            (a = _()),
            ue(r.$$.fragment);
        },
        m(e, o) {
          pe(t, e, o),
            v(e, n, o),
            pe(i, e, o),
            v(e, a, o),
            pe(r, e, o),
            (s = !0);
        },
        p(e, n) {
          const a = {};
          2048 & n[1] && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
          const s = {};
          (3584 & n[0]) | (2048 & n[1]) && (s.$$scope = { dirty: n, ctx: e }),
            i.$set(s);
          const o = {};
          2048 & n[1] && (o.$$scope = { dirty: n, ctx: e }), r.$set(o);
        },
        i(e) {
          s ||
            (re(t.$$.fragment, e),
            re(i.$$.fragment, e),
            re(r.$$.fragment, e),
            (s = !0));
        },
        o(e) {
          se(t.$$.fragment, e),
            se(i.$$.fragment, e),
            se(r.$$.fragment, e),
            (s = !1);
        },
        d(e) {
          fe(t, e), e && b(n), fe(i, e), e && b(a), fe(r, e);
        },
      }
    );
  }
  function pc(e) {
    let t;
    return {
      c() {
        t = C(e[0]);
      },
      m(e, n) {
        v(e, t, n);
      },
      p(e, n) {
        1 & n[0] && L(t, e[0]);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function fc(e) {
    let t, n;
    return (
      (t = new Gt({
        props: { $$slots: { default: [pc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (1 & n[0]) | (2048 & n[1]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function mc(e) {
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
  function hc(e) {
    let t, n;
    return (
      (t = new Ma({
        props: {
          class: "material-icons",
          "aria-label": "Upload dataset",
          ripple: !1,
          $$slots: { default: [mc] },
          $$scope: { ctx: e },
        },
      })),
      t.$on("click", e[20]),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2048 & n[1] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function gc(e) {
    let t, n, i, a;
    return (
      (t = new qt({
        props: { $$slots: { default: [fc] }, $$scope: { ctx: e } },
      })),
      (i = new qt({
        props: {
          align: "end",
          toolbar: !0,
          $$slots: { default: [hc] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          ue(t.$$.fragment), (n = _()), ue(i.$$.fragment);
        },
        m(e, r) {
          pe(t, e, r), v(e, n, r), pe(i, e, r), (a = !0);
        },
        p(e, n) {
          const a = {};
          (1 & n[0]) | (2048 & n[1]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
          const r = {};
          (256 & n[0]) | (2048 & n[1]) && (r.$$scope = { dirty: n, ctx: e }),
            i.$set(r);
        },
        i(e) {
          a || (re(t.$$.fragment, e), re(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          se(t.$$.fragment, e), se(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          fe(t, e), e && b(n), fe(i, e);
        },
      }
    );
  }
  function $c(e) {
    let t, n;
    return (
      (t = new Vt({
        props: { $$slots: { default: [gc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (257 & n[0]) | (2048 & n[1]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function Ic(e) {
    let t, n;
    return (
      (t = new wr({ props: { indeterminate: !0 } })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function vc(e) {
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
  function bc(e) {
    let t, n;
    return (
      (t = new Ma({
        props: {
          class: "material-icons",
          title: "Dismiss",
          $$slots: { default: [vc] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2048 & n[1] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function Ec(e) {
    let t, n, i, a;
    return (
      (t = new Zn({})),
      (i = new fs({
        props: { $$slots: { default: [bc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment), (n = _()), ue(i.$$.fragment);
        },
        m(e, r) {
          pe(t, e, r), v(e, n, r), pe(i, e, r), (a = !0);
        },
        p(e, t) {
          const n = {};
          2048 & t[1] && (n.$$scope = { dirty: t, ctx: e }), i.$set(n);
        },
        i(e) {
          a || (re(t.$$.fragment, e), re(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          se(t.$$.fragment, e), se(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          fe(t, e), e && b(n), fe(i, e);
        },
      }
    );
  }
  function yc(e) {
    let t, n, i, a, r, s, o;
    function l(t) {
      e[22](t);
    }
    let c = { label: "Search..." };
    return (
      void 0 !== e[1] && (c.value = e[1]),
      (t = new Ca({ props: c })),
      j.push(() => de(t, "value", l)),
      (s = new ql({ props: { trees: e[5] } })),
      s.$on("change", e[23]),
      {
        c() {
          ue(t.$$.fragment),
            (i = _()),
            (a = y("span")),
            (a.textContent = "Advanced Filters"),
            (r = _()),
            ue(s.$$.fragment),
            x(a, "class", "filter-header svelte-189na6l");
        },
        m(e, n) {
          pe(t, e, n),
            v(e, i, n),
            v(e, a, n),
            v(e, r, n),
            pe(s, e, n),
            (o = !0);
        },
        p(e, i) {
          const a = {};
          !n && 2 & i[0] && ((n = !0), (a.value = e[1]), Y(() => (n = !1))),
            t.$set(a);
          const r = {};
          32 & i[0] && (r.trees = e[5]), s.$set(r);
        },
        i(e) {
          o || (re(t.$$.fragment, e), re(s.$$.fragment, e), (o = !0));
        },
        o(e) {
          se(t.$$.fragment, e), se(s.$$.fragment, e), (o = !1);
        },
        d(e) {
          fe(t, e), e && b(i), e && b(a), e && b(r), fe(s, e);
        },
      }
    );
  }
  function Ac(e) {
    let t, n;
    return (
      (t = new Ir({
        props: { $$slots: { default: [yc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (38 & n[0]) | (2048 & n[1]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function Cc(e) {
    let t,
      n = e[36].data[0].displayName + "";
    return {
      c() {
        t = C(n);
      },
      m(e, n) {
        v(e, t, n);
      },
      p(e, i) {
        64 & i[0] && n !== (n = e[36].data[0].displayName + "") && L(t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function _c(e) {
    let t,
      n,
      i,
      a,
      s,
      o = e[36].index + 1 + "";
    return {
      c() {
        (t = C(o)),
          (n = C(" revisions.\n                ")),
          (i = y("a")),
          (i.textContent = "Download"),
          x(i, "class", "svelte-189na6l");
      },
      m(o, l) {
        v(o, t, l),
          v(o, n, l),
          v(o, i, l),
          a ||
            ((s = T(i, "click", function () {
              r(e[13](e[36])) && e[13](e[36]).apply(this, arguments);
            })),
            (a = !0));
      },
      p(n, i) {
        (e = n), 64 & i[0] && o !== (o = e[36].index + 1 + "") && L(t, o);
      },
      d(e) {
        e && b(t), e && b(n), e && b(i), (a = !1), s();
      },
    };
  }
  function Sc(e) {
    let t, n, i, a;
    return (
      (t = new ar({
        props: { $$slots: { default: [Cc] }, $$scope: { ctx: e } },
      })),
      (i = new rr({
        props: { $$slots: { default: [_c] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment), (n = _()), ue(i.$$.fragment);
        },
        m(e, r) {
          pe(t, e, r), v(e, n, r), pe(i, e, r), (a = !0);
        },
        p(e, n) {
          const a = {};
          (64 & n[0]) | (2048 & n[1]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
          const r = {};
          (64 & n[0]) | (2048 & n[1]) && (r.$$scope = { dirty: n, ctx: e }),
            i.$set(r);
        },
        i(e) {
          a || (re(t.$$.fragment, e), re(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          se(t.$$.fragment, e), se(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          fe(t, e), e && b(n), fe(i, e);
        },
      }
    );
  }
  function Tc(e) {
    let t, n, i, a;
    return (
      (t = new ir({
        props: { $$slots: { default: [Sc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment), (n = _()), (i = _());
        },
        m(e, r) {
          pe(t, e, r), v(e, n, r), v(e, i, r), (a = !0);
        },
        p(e, n) {
          const i = {};
          (64 & n[0]) | (2048 & n[1]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          a || (re(t.$$.fragment, e), (a = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (a = !1);
        },
        d(e) {
          fe(t, e), e && b(n), e && b(i);
        },
      }
    );
  }
  function xc(e) {
    let t, n;
    return (
      (t = new lr({
        props: { $$slots: { default: [Tc] }, $$scope: { ctx: e } },
      })),
      t.$on("SMUI:action", function () {
        return e[24](e[36]);
      }),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, i) {
          pe(t, e, i), (n = !0);
        },
        p(n, i) {
          e = n;
          const a = {};
          (64 & i[0]) | (2048 & i[1]) && (a.$$scope = { dirty: i, ctx: e }),
            t.$set(a);
        },
        i(e) {
          n || (re(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          se(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          fe(t, e);
        },
      }
    );
  }
  function Oc(e) {
    let t,
      n,
      i = e[6],
      a = [];
    for (let t = 0; t < i.length; t += 1) a[t] = xc(tc(e, i, t));
    const r = (e) =>
      se(a[e], 1, 1, () => {
        a[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < a.length; e += 1) a[e].c();
        t = S();
      },
      m(e, i) {
        for (let t = 0; t < a.length; t += 1) a[t].m(e, i);
        v(e, t, i), (n = !0);
      },
      p(e, n) {
        if (12352 & n[0]) {
          let s;
          for (i = e[6], s = 0; s < i.length; s += 1) {
            const r = tc(e, i, s);
            a[s]
              ? (a[s].p(r, n), re(a[s], 1))
              : ((a[s] = xc(r)),
                a[s].c(),
                re(a[s], 1),
                a[s].m(t.parentNode, t));
          }
          for (ie(), s = i.length; s < a.length; s += 1) r(s);
          ae();
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
        for (let e = 0; e < a.length; e += 1) se(a[e]);
        n = !1;
      },
      d(e) {
        E(a, e), e && b(t);
      },
    };
  }
  function Lc(e) {
    let t, n, i;
    return (
      (n = new Ya({
        props: {
          twoLine: !0,
          avatarList: !0,
          $$slots: { default: [Oc] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          (t = y("main")), ue(n.$$.fragment), x(t, "class", "svelte-189na6l");
        },
        m(e, a) {
          v(e, t, a), pe(n, t, null), (i = !0);
        },
        p(e, t) {
          const i = {};
          (64 & t[0]) | (2048 & t[1]) && (i.$$scope = { dirty: t, ctx: e }),
            n.$set(i);
        },
        i(e) {
          i || (re(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          se(n.$$.fragment, e), (i = !1);
        },
        d(e) {
          e && b(t), fe(n);
        },
      }
    );
  }
  function Dc(e) {
    let t, n, i, a, r, s, o, l, c, d, u, p, f, m, h, g, $, E, A, C, S, T, O;
    function L(t) {
      e[19](t);
    }
    ec.title = t = e[0];
    let D = {
      "aria-labelledby": "title",
      "aria-describedby": "content",
      $$slots: { default: [uc] },
      $$scope: { ctx: e },
    };
    void 0 !== e[8] && (D.open = e[8]),
      (i = new Wr({ props: D })),
      j.push(() => de(i, "open", L)),
      (s = new nt({
        props: {
          variant: "static",
          $$slots: { default: [$c] },
          $$scope: { ctx: e },
        },
      }));
    let N = e[7] && Ic(),
      M = {
        labelText: e[4],
        timeoutMs: -1,
        $$slots: { default: [Ec] },
        $$scope: { ctx: e },
      };
    return (
      (c = new ps({ props: M })),
      e[21](c),
      (p = new gr({
        props: {
          style: "width: 360px",
          $$slots: { default: [Ac] },
          $$scope: { ctx: e },
        },
      })),
      (m = new $r({
        props: { $$slots: { default: [Lc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          (n = _()),
            ue(i.$$.fragment),
            (r = _()),
            ue(s.$$.fragment),
            (o = _()),
            N && N.c(),
            (l = _()),
            ue(c.$$.fragment),
            (d = _()),
            (u = y("div")),
            ue(p.$$.fragment),
            (f = _()),
            ue(m.$$.fragment),
            (h = _()),
            (g = y("link")),
            ($ = _()),
            (E = y("link")),
            (A = _()),
            (C = y("link")),
            (S = _()),
            (T = y("link")),
            x(u, "class", "drawer-container svelte-189na6l"),
            x(g, "rel", "stylesheet"),
            x(
              g,
              "href",
              "https://fonts.googleapis.com/icon?family=Material+Icons"
            ),
            x(g, "class", "svelte-189na6l"),
            x(E, "rel", "stylesheet"),
            x(
              E,
              "href",
              "https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
            ),
            x(E, "class", "svelte-189na6l"),
            x(C, "rel", "stylesheet"),
            x(C, "href", "https://fonts.googleapis.com/css?family=Roboto+Mono"),
            x(C, "class", "svelte-189na6l"),
            x(T, "rel", "stylesheet"),
            x(T, "href", "build/smui.css"),
            x(T, "class", "svelte-189na6l");
        },
        m(e, t) {
          v(e, n, t),
            pe(i, e, t),
            v(e, r, t),
            pe(s, e, t),
            v(e, o, t),
            N && N.m(e, t),
            v(e, l, t),
            pe(c, e, t),
            v(e, d, t),
            v(e, u, t),
            pe(p, u, null),
            I(u, f),
            pe(m, u, null),
            v(e, h, t),
            v(e, g, t),
            v(e, $, t),
            v(e, E, t),
            v(e, A, t),
            v(e, C, t),
            v(e, S, t),
            v(e, T, t),
            (O = !0);
        },
        p(e, n) {
          (!O || 1 & n[0]) && t !== (t = e[0]) && (ec.title = t);
          const r = {};
          (3584 & n[0]) | (2048 & n[1]) && (r.$$scope = { dirty: n, ctx: e }),
            !a && 256 & n[0] && ((a = !0), (r.open = e[8]), Y(() => (a = !1))),
            i.$set(r);
          const o = {};
          (257 & n[0]) | (2048 & n[1]) && (o.$$scope = { dirty: n, ctx: e }),
            s.$set(o),
            e[7]
              ? N
                ? 128 & n[0] && re(N, 1)
                : ((N = Ic()), N.c(), re(N, 1), N.m(l.parentNode, l))
              : N &&
                (ie(),
                se(N, 1, 1, () => {
                  N = null;
                }),
                ae());
          const d = {};
          16 & n[0] && (d.labelText = e[4]),
            2048 & n[1] && (d.$$scope = { dirty: n, ctx: e }),
            c.$set(d);
          const u = {};
          (38 & n[0]) | (2048 & n[1]) && (u.$$scope = { dirty: n, ctx: e }),
            p.$set(u);
          const f = {};
          (64 & n[0]) | (2048 & n[1]) && (f.$$scope = { dirty: n, ctx: e }),
            m.$set(f);
        },
        i(e) {
          O ||
            (re(i.$$.fragment, e),
            re(s.$$.fragment, e),
            re(N),
            re(c.$$.fragment, e),
            re(p.$$.fragment, e),
            re(m.$$.fragment, e),
            (O = !0));
        },
        o(e) {
          se(i.$$.fragment, e),
            se(s.$$.fragment, e),
            se(N),
            se(c.$$.fragment, e),
            se(p.$$.fragment, e),
            se(m.$$.fragment, e),
            (O = !1);
        },
        d(t) {
          t && b(n),
            fe(i, t),
            t && b(r),
            fe(s, t),
            t && b(o),
            N && N.d(t),
            t && b(l),
            e[21](null),
            fe(c, t),
            t && b(d),
            t && b(u),
            fe(p),
            fe(m),
            t && b(h),
            t && b(g),
            t && b($),
            t && b(E),
            t && b(A),
            t && b(C),
            t && b(S),
            t && b(T);
        },
      }
    );
  }
  const Nc = (e) => e.Tag;
  function Mc(e, t, n) {
    let { title: i = "Data Dashboard " } = t,
      a = [];
    const r = new Kl();
    let s,
      o,
      l = [],
      c = [],
      d = "",
      u = [];
    function p(e, t) {
      console.log({ filterTags: t, item: c[0] }),
        n(
          6,
          (c = l.filter((n) =>
            ((n) => {
              const [{ displayName: i, taxonomyTags: a }] = n.data;
              return (
                !!t.every(
                  (e) =>
                    !!a.find((t) =>
                      (function (e, t) {
                        return (
                          (e.ID === t.id && t.value == e.value) ||
                          (e.hasOwnProperty(t.id) && e[t.id] === t.value)
                        );
                      })(t, e)
                    )
                ) &&
                (!e || i.toLowerCase().includes(e.toLowerCase()))
              );
            })(n)
          ))
        );
    }
    let f = !1;
    class m extends class {
      constructor(e, t) {
        (this.type = e), (this.data = t);
      }
    } {
      constructor(e) {
        super("ItemSelected", e);
      }
    }
    const h = [];
    let g;
    function $(e) {
      (g = e), h.forEach(([t, n]) => t.postMessage(new m(e), n));
    }
    window.addEventListener(
      "message",
      function (e) {
        const { data: t } = e;
        "subscribe" === t.type &&
          (h.push([e.source, e.origin]),
          g && e.source.postMessage(new m(g), e.origin));
      },
      !1
    ),
      (async function () {
        n(
          5,
          (a = await (async function () {
            const e = window.location.href.split("/");
            e.pop(), e.pop();
            const t = e.join("/") + "/taxonomy.json",
              n = await fetch(t);
            let i = [await n.json()];
            for (; 1 === i.length; ) i = i[0].children;
            return i;
          })())
        ),
          n(7, (f = !0));
        try {
          l = (await r.listArtifacts()).filter((e) => {
            const t = !!e.data[0].displayName;
            return (
              t ||
                console.log(
                  "Found data without display name. Filtering out. Data:",
                  e
                ),
              t
            );
          });
        } catch (e) {
          n(4, (o = e.message));
        }
        n(7, (f = !1)), console.log({ allItems: l }), p(d, u);
      })();
    var I;
    let v,
      b,
      E =
        "create" ===
        ((I = window.location.href),
        Object.fromEntries(
          (I.split("?")[1] || "").split("&").map((e) => e.split("="))
        )).action;
    async function y() {
      n(10, (b.displayName = A), b), await r.createArtifact(b, v);
    }
    let A = "";
    return (
      (e.$$set = (e) => {
        "title" in e && n(0, (i = e.title));
      }),
      (e.$$.update = () => {
        6 & e.$$.dirty[0] && p(d, u), 24 & e.$$.dirty[0] && o && s.open();
      }),
      [
        i,
        d,
        u,
        s,
        o,
        a,
        c,
        f,
        E,
        v,
        b,
        A,
        $,
        async function (e) {
          const t = await r.getDownloadUrl(e),
            n = document.createElement("a");
          n.setAttribute("href", t),
            n.setAttribute("target", "_blank"),
            n.click();
        },
        function (e) {
          const { acceptedFiles: t } = e.detail;
          t.length && n(9, (v = t[0]));
        },
        async function (e) {
          const [t] = e.detail.acceptedFiles;
          t &&
            n(
              10,
              (b = JSON.parse(
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
        y,
        function (e) {
          (A = e), n(11, A);
        },
        () => y(),
        function (e) {
          (E = e), n(8, E);
        },
        () => n(8, (E = !0)),
        function (e) {
          j[e ? "unshift" : "push"](() => {
            (s = e), n(3, s);
          });
        },
        function (e) {
          (d = e), n(1, d);
        },
        (e) => n(2, (u = e.detail.filterTags)),
        (e) => $(e),
      ]
    );
  }
  return new (class extends he {
    constructor(e) {
      super(), me(this, e, Mc, Dc, s, { title: 0 }, null, [-1, -1]);
    }
  })({ target: document.body, props: { name: "world" } });
})();
//# sourceMappingURL=bundle.js.map
