
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function compute_slots(slots) {
        const result = {};
        for (const key in slots) {
            result[key] = true;
        }
        return result;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.49.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
    var MDCFoundation = /** @class */ (function () {
        function MDCFoundation(adapter) {
            if (adapter === void 0) { adapter = {}; }
            this.adapter = adapter;
        }
        Object.defineProperty(MDCFoundation, "cssClasses", {
            get: function () {
                // Classes extending MDCFoundation should implement this method to return an object which exports every
                // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
                return {};
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCFoundation, "strings", {
            get: function () {
                // Classes extending MDCFoundation should implement this method to return an object which exports all
                // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
                return {};
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCFoundation, "numbers", {
            get: function () {
                // Classes extending MDCFoundation should implement this method to return an object which exports all
                // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
                return {};
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCFoundation, "defaultAdapter", {
            get: function () {
                // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
                // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
                // validation.
                return {};
            },
            enumerable: false,
            configurable: true
        });
        MDCFoundation.prototype.init = function () {
            // Subclasses should override this method to perform initialization routines (registering events, etc.)
        };
        MDCFoundation.prototype.destroy = function () {
            // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
        };
        return MDCFoundation;
    }());

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
    /**
     * Determine whether the current browser supports passive event listeners, and
     * if so, use them.
     */
    function applyPassive$1(globalObj) {
        if (globalObj === void 0) { globalObj = window; }
        return supportsPassiveOption(globalObj) ?
            { passive: true } :
            false;
    }
    function supportsPassiveOption(globalObj) {
        if (globalObj === void 0) { globalObj = window; }
        // See
        // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
        var passiveSupported = false;
        try {
            var options = {
                // This function will be called when the browser
                // attempts to access the passive property.
                get passive() {
                    passiveSupported = true;
                    return false;
                }
            };
            var handler = function () { };
            globalObj.document.addEventListener('test', handler, options);
            globalObj.document.removeEventListener('test', handler, options);
        }
        catch (err) {
            passiveSupported = false;
        }
        return passiveSupported;
    }

    var events = /*#__PURE__*/Object.freeze({
        __proto__: null,
        applyPassive: applyPassive$1
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
     */
    /**
     * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
     * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
     */
    function closest(element, selector) {
        if (element.closest) {
            return element.closest(selector);
        }
        var el = element;
        while (el) {
            if (matches$1(el, selector)) {
                return el;
            }
            el = el.parentElement;
        }
        return null;
    }
    function matches$1(element, selector) {
        var nativeMatches = element.matches
            || element.webkitMatchesSelector
            || element.msMatchesSelector;
        return nativeMatches.call(element, selector);
    }
    /**
     * Used to compute the estimated scroll width of elements. When an element is
     * hidden due to display: none; being applied to a parent element, the width is
     * returned as 0. However, the element will have a true width once no longer
     * inside a display: none context. This method computes an estimated width when
     * the element is hidden or returns the true width when the element is visble.
     * @param {Element} element the element whose width to estimate
     */
    function estimateScrollWidth(element) {
        // Check the offsetParent. If the element inherits display: none from any
        // parent, the offsetParent property will be null (see
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent).
        // This check ensures we only clone the node when necessary.
        var htmlEl = element;
        if (htmlEl.offsetParent !== null) {
            return htmlEl.scrollWidth;
        }
        var clone = htmlEl.cloneNode(true);
        clone.style.setProperty('position', 'absolute');
        clone.style.setProperty('transform', 'translate(-9999px, -9999px)');
        document.documentElement.appendChild(clone);
        var scrollWidth = clone.scrollWidth;
        document.documentElement.removeChild(clone);
        return scrollWidth;
    }

    var ponyfill = /*#__PURE__*/Object.freeze({
        __proto__: null,
        closest: closest,
        matches: matches$1,
        estimateScrollWidth: estimateScrollWidth
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
     */
    var cssClasses$d = {
        // Ripple is a special case where the "root" component is really a "mixin" of sorts,
        // given that it's an 'upgrade' to an existing component. That being said it is the root
        // CSS class that all other CSS classes derive from.
        BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
        FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
        FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
        ROOT: 'mdc-ripple-upgraded',
        UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
    };
    var strings$b = {
        VAR_FG_SCALE: '--mdc-ripple-fg-scale',
        VAR_FG_SIZE: '--mdc-ripple-fg-size',
        VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
        VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
        VAR_LEFT: '--mdc-ripple-left',
        VAR_TOP: '--mdc-ripple-top',
    };
    var numbers$8 = {
        DEACTIVATION_TIMEOUT_MS: 225,
        FG_DEACTIVATION_MS: 150,
        INITIAL_ORIGIN_SCALE: 0.6,
        PADDING: 10,
        TAP_DELAY_MS: 300, // Delay between touch and simulated mouse events on touch devices
    };

    /**
     * Stores result from supportsCssVariables to avoid redundant processing to
     * detect CSS custom variable support.
     */
    var supportsCssVariables_;
    function supportsCssVariables(windowObj, forceRefresh) {
        if (forceRefresh === void 0) { forceRefresh = false; }
        var CSS = windowObj.CSS;
        var supportsCssVars = supportsCssVariables_;
        if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
            return supportsCssVariables_;
        }
        var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';
        if (!supportsFunctionPresent) {
            return false;
        }
        var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes');
        // See: https://bugs.webkit.org/show_bug.cgi?id=154669
        // See: README section on Safari
        var weAreFeatureDetectingSafari10plus = (CSS.supports('(--css-vars: yes)') &&
            CSS.supports('color', '#00000000'));
        supportsCssVars =
            explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;
        if (!forceRefresh) {
            supportsCssVariables_ = supportsCssVars;
        }
        return supportsCssVars;
    }
    function getNormalizedEventCoords(evt, pageOffset, clientRect) {
        if (!evt) {
            return { x: 0, y: 0 };
        }
        var x = pageOffset.x, y = pageOffset.y;
        var documentX = x + clientRect.left;
        var documentY = y + clientRect.top;
        var normalizedX;
        var normalizedY;
        // Determine touch point relative to the ripple container.
        if (evt.type === 'touchstart') {
            var touchEvent = evt;
            normalizedX = touchEvent.changedTouches[0].pageX - documentX;
            normalizedY = touchEvent.changedTouches[0].pageY - documentY;
        }
        else {
            var mouseEvent = evt;
            normalizedX = mouseEvent.pageX - documentX;
            normalizedY = mouseEvent.pageY - documentY;
        }
        return { x: normalizedX, y: normalizedY };
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
    // Activation events registered on the root element of each instance for activation
    var ACTIVATION_EVENT_TYPES = [
        'touchstart', 'pointerdown', 'mousedown', 'keydown',
    ];
    // Deactivation events registered on documentElement when a pointer-related down event occurs
    var POINTER_DEACTIVATION_EVENT_TYPES = [
        'touchend', 'pointerup', 'mouseup', 'contextmenu',
    ];
    // simultaneous nested activations
    var activatedTargets = [];
    var MDCRippleFoundation = /** @class */ (function (_super) {
        __extends(MDCRippleFoundation, _super);
        function MDCRippleFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCRippleFoundation.defaultAdapter), adapter)) || this;
            _this.activationAnimationHasEnded = false;
            _this.activationTimer = 0;
            _this.fgDeactivationRemovalTimer = 0;
            _this.fgScale = '0';
            _this.frame = { width: 0, height: 0 };
            _this.initialSize = 0;
            _this.layoutFrame = 0;
            _this.maxRadius = 0;
            _this.unboundedCoords = { left: 0, top: 0 };
            _this.activationState = _this.defaultActivationState();
            _this.activationTimerCallback = function () {
                _this.activationAnimationHasEnded = true;
                _this.runDeactivationUXLogicIfReady();
            };
            _this.activateHandler = function (e) {
                _this.activateImpl(e);
            };
            _this.deactivateHandler = function () {
                _this.deactivateImpl();
            };
            _this.focusHandler = function () {
                _this.handleFocus();
            };
            _this.blurHandler = function () {
                _this.handleBlur();
            };
            _this.resizeHandler = function () {
                _this.layout();
            };
            return _this;
        }
        Object.defineProperty(MDCRippleFoundation, "cssClasses", {
            get: function () {
                return cssClasses$d;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCRippleFoundation, "strings", {
            get: function () {
                return strings$b;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCRippleFoundation, "numbers", {
            get: function () {
                return numbers$8;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addClass: function () { return undefined; },
                    browserSupportsCssVars: function () { return true; },
                    computeBoundingRect: function () {
                        return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 });
                    },
                    containsEventTarget: function () { return true; },
                    deregisterDocumentInteractionHandler: function () { return undefined; },
                    deregisterInteractionHandler: function () { return undefined; },
                    deregisterResizeHandler: function () { return undefined; },
                    getWindowPageOffset: function () { return ({ x: 0, y: 0 }); },
                    isSurfaceActive: function () { return true; },
                    isSurfaceDisabled: function () { return true; },
                    isUnbounded: function () { return true; },
                    registerDocumentInteractionHandler: function () { return undefined; },
                    registerInteractionHandler: function () { return undefined; },
                    registerResizeHandler: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    updateCssVariable: function () { return undefined; },
                };
            },
            enumerable: false,
            configurable: true
        });
        MDCRippleFoundation.prototype.init = function () {
            var _this = this;
            var supportsPressRipple = this.supportsPressRipple();
            this.registerRootHandlers(supportsPressRipple);
            if (supportsPressRipple) {
                var _a = MDCRippleFoundation.cssClasses, ROOT_1 = _a.ROOT, UNBOUNDED_1 = _a.UNBOUNDED;
                requestAnimationFrame(function () {
                    _this.adapter.addClass(ROOT_1);
                    if (_this.adapter.isUnbounded()) {
                        _this.adapter.addClass(UNBOUNDED_1);
                        // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
                        _this.layoutInternal();
                    }
                });
            }
        };
        MDCRippleFoundation.prototype.destroy = function () {
            var _this = this;
            if (this.supportsPressRipple()) {
                if (this.activationTimer) {
                    clearTimeout(this.activationTimer);
                    this.activationTimer = 0;
                    this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
                }
                if (this.fgDeactivationRemovalTimer) {
                    clearTimeout(this.fgDeactivationRemovalTimer);
                    this.fgDeactivationRemovalTimer = 0;
                    this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
                }
                var _a = MDCRippleFoundation.cssClasses, ROOT_2 = _a.ROOT, UNBOUNDED_2 = _a.UNBOUNDED;
                requestAnimationFrame(function () {
                    _this.adapter.removeClass(ROOT_2);
                    _this.adapter.removeClass(UNBOUNDED_2);
                    _this.removeCssVars();
                });
            }
            this.deregisterRootHandlers();
            this.deregisterDeactivationHandlers();
        };
        /**
         * @param evt Optional event containing position information.
         */
        MDCRippleFoundation.prototype.activate = function (evt) {
            this.activateImpl(evt);
        };
        MDCRippleFoundation.prototype.deactivate = function () {
            this.deactivateImpl();
        };
        MDCRippleFoundation.prototype.layout = function () {
            var _this = this;
            if (this.layoutFrame) {
                cancelAnimationFrame(this.layoutFrame);
            }
            this.layoutFrame = requestAnimationFrame(function () {
                _this.layoutInternal();
                _this.layoutFrame = 0;
            });
        };
        MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
            var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;
            if (unbounded) {
                this.adapter.addClass(UNBOUNDED);
            }
            else {
                this.adapter.removeClass(UNBOUNDED);
            }
        };
        MDCRippleFoundation.prototype.handleFocus = function () {
            var _this = this;
            requestAnimationFrame(function () { return _this.adapter.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED); });
        };
        MDCRippleFoundation.prototype.handleBlur = function () {
            var _this = this;
            requestAnimationFrame(function () { return _this.adapter.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED); });
        };
        /**
         * We compute this property so that we are not querying information about the client
         * until the point in time where the foundation requests it. This prevents scenarios where
         * client-side feature-detection may happen too early, such as when components are rendered on the server
         * and then initialized at mount time on the client.
         */
        MDCRippleFoundation.prototype.supportsPressRipple = function () {
            return this.adapter.browserSupportsCssVars();
        };
        MDCRippleFoundation.prototype.defaultActivationState = function () {
            return {
                activationEvent: undefined,
                hasDeactivationUXRun: false,
                isActivated: false,
                isProgrammatic: false,
                wasActivatedByPointer: false,
                wasElementMadeActive: false,
            };
        };
        /**
         * supportsPressRipple Passed from init to save a redundant function call
         */
        MDCRippleFoundation.prototype.registerRootHandlers = function (supportsPressRipple) {
            var e_1, _a;
            if (supportsPressRipple) {
                try {
                    for (var ACTIVATION_EVENT_TYPES_1 = __values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next(); !ACTIVATION_EVENT_TYPES_1_1.done; ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next()) {
                        var evtType = ACTIVATION_EVENT_TYPES_1_1.value;
                        this.adapter.registerInteractionHandler(evtType, this.activateHandler);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (ACTIVATION_EVENT_TYPES_1_1 && !ACTIVATION_EVENT_TYPES_1_1.done && (_a = ACTIVATION_EVENT_TYPES_1.return)) _a.call(ACTIVATION_EVENT_TYPES_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (this.adapter.isUnbounded()) {
                    this.adapter.registerResizeHandler(this.resizeHandler);
                }
            }
            this.adapter.registerInteractionHandler('focus', this.focusHandler);
            this.adapter.registerInteractionHandler('blur', this.blurHandler);
        };
        MDCRippleFoundation.prototype.registerDeactivationHandlers = function (evt) {
            var e_2, _a;
            if (evt.type === 'keydown') {
                this.adapter.registerInteractionHandler('keyup', this.deactivateHandler);
            }
            else {
                try {
                    for (var POINTER_DEACTIVATION_EVENT_TYPES_1 = __values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next(); !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done; POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next()) {
                        var evtType = POINTER_DEACTIVATION_EVENT_TYPES_1_1.value;
                        this.adapter.registerDocumentInteractionHandler(evtType, this.deactivateHandler);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (POINTER_DEACTIVATION_EVENT_TYPES_1_1 && !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_1.return)) _a.call(POINTER_DEACTIVATION_EVENT_TYPES_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        };
        MDCRippleFoundation.prototype.deregisterRootHandlers = function () {
            var e_3, _a;
            try {
                for (var ACTIVATION_EVENT_TYPES_2 = __values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next(); !ACTIVATION_EVENT_TYPES_2_1.done; ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next()) {
                    var evtType = ACTIVATION_EVENT_TYPES_2_1.value;
                    this.adapter.deregisterInteractionHandler(evtType, this.activateHandler);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (ACTIVATION_EVENT_TYPES_2_1 && !ACTIVATION_EVENT_TYPES_2_1.done && (_a = ACTIVATION_EVENT_TYPES_2.return)) _a.call(ACTIVATION_EVENT_TYPES_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this.adapter.deregisterInteractionHandler('focus', this.focusHandler);
            this.adapter.deregisterInteractionHandler('blur', this.blurHandler);
            if (this.adapter.isUnbounded()) {
                this.adapter.deregisterResizeHandler(this.resizeHandler);
            }
        };
        MDCRippleFoundation.prototype.deregisterDeactivationHandlers = function () {
            var e_4, _a;
            this.adapter.deregisterInteractionHandler('keyup', this.deactivateHandler);
            try {
                for (var POINTER_DEACTIVATION_EVENT_TYPES_2 = __values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next(); !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done; POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next()) {
                    var evtType = POINTER_DEACTIVATION_EVENT_TYPES_2_1.value;
                    this.adapter.deregisterDocumentInteractionHandler(evtType, this.deactivateHandler);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (POINTER_DEACTIVATION_EVENT_TYPES_2_1 && !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_2.return)) _a.call(POINTER_DEACTIVATION_EVENT_TYPES_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
        };
        MDCRippleFoundation.prototype.removeCssVars = function () {
            var _this = this;
            var rippleStrings = MDCRippleFoundation.strings;
            var keys = Object.keys(rippleStrings);
            keys.forEach(function (key) {
                if (key.indexOf('VAR_') === 0) {
                    _this.adapter.updateCssVariable(rippleStrings[key], null);
                }
            });
        };
        MDCRippleFoundation.prototype.activateImpl = function (evt) {
            var _this = this;
            if (this.adapter.isSurfaceDisabled()) {
                return;
            }
            var activationState = this.activationState;
            if (activationState.isActivated) {
                return;
            }
            // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
            var previousActivationEvent = this.previousActivationEvent;
            var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;
            if (isSameInteraction) {
                return;
            }
            activationState.isActivated = true;
            activationState.isProgrammatic = evt === undefined;
            activationState.activationEvent = evt;
            activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
            var hasActivatedChild = evt !== undefined &&
                activatedTargets.length > 0 &&
                activatedTargets.some(function (target) { return _this.adapter.containsEventTarget(target); });
            if (hasActivatedChild) {
                // Immediately reset activation state, while preserving logic that prevents touch follow-on events
                this.resetActivationState();
                return;
            }
            if (evt !== undefined) {
                activatedTargets.push(evt.target);
                this.registerDeactivationHandlers(evt);
            }
            activationState.wasElementMadeActive = this.checkElementMadeActive(evt);
            if (activationState.wasElementMadeActive) {
                this.animateActivation();
            }
            requestAnimationFrame(function () {
                // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
                activatedTargets = [];
                if (!activationState.wasElementMadeActive
                    && evt !== undefined
                    && (evt.key === ' ' || evt.keyCode === 32)) {
                    // If space was pressed, try again within an rAF call to detect :active, because different UAs report
                    // active states inconsistently when they're called within event handling code:
                    // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
                    // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
                    // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
                    // variable is set within a rAF callback for a submit button interaction (#2241).
                    activationState.wasElementMadeActive = _this.checkElementMadeActive(evt);
                    if (activationState.wasElementMadeActive) {
                        _this.animateActivation();
                    }
                }
                if (!activationState.wasElementMadeActive) {
                    // Reset activation state immediately if element was not made active.
                    _this.activationState = _this.defaultActivationState();
                }
            });
        };
        MDCRippleFoundation.prototype.checkElementMadeActive = function (evt) {
            return (evt !== undefined && evt.type === 'keydown') ?
                this.adapter.isSurfaceActive() :
                true;
        };
        MDCRippleFoundation.prototype.animateActivation = function () {
            var _this = this;
            var _a = MDCRippleFoundation.strings, VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
            var _b = MDCRippleFoundation.cssClasses, FG_DEACTIVATION = _b.FG_DEACTIVATION, FG_ACTIVATION = _b.FG_ACTIVATION;
            var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
            this.layoutInternal();
            var translateStart = '';
            var translateEnd = '';
            if (!this.adapter.isUnbounded()) {
                var _c = this.getFgTranslationCoordinates(), startPoint = _c.startPoint, endPoint = _c.endPoint;
                translateStart = startPoint.x + "px, " + startPoint.y + "px";
                translateEnd = endPoint.x + "px, " + endPoint.y + "px";
            }
            this.adapter.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
            this.adapter.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
            // Cancel any ongoing activation/deactivation animations
            clearTimeout(this.activationTimer);
            clearTimeout(this.fgDeactivationRemovalTimer);
            this.rmBoundedActivationClasses();
            this.adapter.removeClass(FG_DEACTIVATION);
            // Force layout in order to re-trigger the animation.
            this.adapter.computeBoundingRect();
            this.adapter.addClass(FG_ACTIVATION);
            this.activationTimer = setTimeout(function () {
                _this.activationTimerCallback();
            }, DEACTIVATION_TIMEOUT_MS);
        };
        MDCRippleFoundation.prototype.getFgTranslationCoordinates = function () {
            var _a = this.activationState, activationEvent = _a.activationEvent, wasActivatedByPointer = _a.wasActivatedByPointer;
            var startPoint;
            if (wasActivatedByPointer) {
                startPoint = getNormalizedEventCoords(activationEvent, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect());
            }
            else {
                startPoint = {
                    x: this.frame.width / 2,
                    y: this.frame.height / 2,
                };
            }
            // Center the element around the start point.
            startPoint = {
                x: startPoint.x - (this.initialSize / 2),
                y: startPoint.y - (this.initialSize / 2),
            };
            var endPoint = {
                x: (this.frame.width / 2) - (this.initialSize / 2),
                y: (this.frame.height / 2) - (this.initialSize / 2),
            };
            return { startPoint: startPoint, endPoint: endPoint };
        };
        MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady = function () {
            var _this = this;
            // This method is called both when a pointing device is released, and when the activation animation ends.
            // The deactivation animation should only run after both of those occur.
            var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
            var _a = this.activationState, hasDeactivationUXRun = _a.hasDeactivationUXRun, isActivated = _a.isActivated;
            var activationHasEnded = hasDeactivationUXRun || !isActivated;
            if (activationHasEnded && this.activationAnimationHasEnded) {
                this.rmBoundedActivationClasses();
                this.adapter.addClass(FG_DEACTIVATION);
                this.fgDeactivationRemovalTimer = setTimeout(function () {
                    _this.adapter.removeClass(FG_DEACTIVATION);
                }, numbers$8.FG_DEACTIVATION_MS);
            }
        };
        MDCRippleFoundation.prototype.rmBoundedActivationClasses = function () {
            var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
            this.adapter.removeClass(FG_ACTIVATION);
            this.activationAnimationHasEnded = false;
            this.adapter.computeBoundingRect();
        };
        MDCRippleFoundation.prototype.resetActivationState = function () {
            var _this = this;
            this.previousActivationEvent = this.activationState.activationEvent;
            this.activationState = this.defaultActivationState();
            // Touch devices may fire additional events for the same interaction within a short time.
            // Store the previous event until it's safe to assume that subsequent events are for new interactions.
            setTimeout(function () { return _this.previousActivationEvent = undefined; }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
        };
        MDCRippleFoundation.prototype.deactivateImpl = function () {
            var _this = this;
            var activationState = this.activationState;
            // This can happen in scenarios such as when you have a keyup event that blurs the element.
            if (!activationState.isActivated) {
                return;
            }
            var state = __assign({}, activationState);
            if (activationState.isProgrammatic) {
                requestAnimationFrame(function () {
                    _this.animateDeactivation(state);
                });
                this.resetActivationState();
            }
            else {
                this.deregisterDeactivationHandlers();
                requestAnimationFrame(function () {
                    _this.activationState.hasDeactivationUXRun = true;
                    _this.animateDeactivation(state);
                    _this.resetActivationState();
                });
            }
        };
        MDCRippleFoundation.prototype.animateDeactivation = function (_a) {
            var wasActivatedByPointer = _a.wasActivatedByPointer, wasElementMadeActive = _a.wasElementMadeActive;
            if (wasActivatedByPointer || wasElementMadeActive) {
                this.runDeactivationUXLogicIfReady();
            }
        };
        MDCRippleFoundation.prototype.layoutInternal = function () {
            var _this = this;
            this.frame = this.adapter.computeBoundingRect();
            var maxDim = Math.max(this.frame.height, this.frame.width);
            // Surface diameter is treated differently for unbounded vs. bounded ripples.
            // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
            // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
            // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
            // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
            // `overflow: hidden`.
            var getBoundedRadius = function () {
                var hypotenuse = Math.sqrt(Math.pow(_this.frame.width, 2) + Math.pow(_this.frame.height, 2));
                return hypotenuse + MDCRippleFoundation.numbers.PADDING;
            };
            this.maxRadius = this.adapter.isUnbounded() ? maxDim : getBoundedRadius();
            // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
            var initialSize = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
            // Unbounded ripple size should always be even number to equally center align.
            if (this.adapter.isUnbounded() && initialSize % 2 !== 0) {
                this.initialSize = initialSize - 1;
            }
            else {
                this.initialSize = initialSize;
            }
            this.fgScale = "" + this.maxRadius / this.initialSize;
            this.updateLayoutCssVars();
        };
        MDCRippleFoundation.prototype.updateLayoutCssVars = function () {
            var _a = MDCRippleFoundation.strings, VAR_FG_SIZE = _a.VAR_FG_SIZE, VAR_LEFT = _a.VAR_LEFT, VAR_TOP = _a.VAR_TOP, VAR_FG_SCALE = _a.VAR_FG_SCALE;
            this.adapter.updateCssVariable(VAR_FG_SIZE, this.initialSize + "px");
            this.adapter.updateCssVariable(VAR_FG_SCALE, this.fgScale);
            if (this.adapter.isUnbounded()) {
                this.unboundedCoords = {
                    left: Math.round((this.frame.width / 2) - (this.initialSize / 2)),
                    top: Math.round((this.frame.height / 2) - (this.initialSize / 2)),
                };
                this.adapter.updateCssVariable(VAR_LEFT, this.unboundedCoords.left + "px");
                this.adapter.updateCssVariable(VAR_TOP, this.unboundedCoords.top + "px");
            }
        };
        return MDCRippleFoundation;
    }(MDCFoundation));

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
    var cssClasses$c = {
        FIXED_CLASS: 'mdc-top-app-bar--fixed',
        FIXED_SCROLLED_CLASS: 'mdc-top-app-bar--fixed-scrolled',
        SHORT_CLASS: 'mdc-top-app-bar--short',
        SHORT_COLLAPSED_CLASS: 'mdc-top-app-bar--short-collapsed',
        SHORT_HAS_ACTION_ITEM_CLASS: 'mdc-top-app-bar--short-has-action-item',
    };
    var numbers$7 = {
        DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
        MAX_TOP_APP_BAR_HEIGHT: 128,
    };
    var strings$a = {
        ACTION_ITEM_SELECTOR: '.mdc-top-app-bar__action-item',
        NAVIGATION_EVENT: 'MDCTopAppBar:nav',
        NAVIGATION_ICON_SELECTOR: '.mdc-top-app-bar__navigation-icon',
        ROOT_SELECTOR: '.mdc-top-app-bar',
        TITLE_SELECTOR: '.mdc-top-app-bar__title',
    };

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
    var MDCTopAppBarBaseFoundation = /** @class */ (function (_super) {
        __extends(MDCTopAppBarBaseFoundation, _super);
        /* istanbul ignore next: optional argument is not a branch statement */
        function MDCTopAppBarBaseFoundation(adapter) {
            return _super.call(this, __assign(__assign({}, MDCTopAppBarBaseFoundation.defaultAdapter), adapter)) || this;
        }
        Object.defineProperty(MDCTopAppBarBaseFoundation, "strings", {
            get: function () {
                return strings$a;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTopAppBarBaseFoundation, "cssClasses", {
            get: function () {
                return cssClasses$c;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTopAppBarBaseFoundation, "numbers", {
            get: function () {
                return numbers$7;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTopAppBarBaseFoundation, "defaultAdapter", {
            /**
             * See {@link MDCTopAppBarAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    setStyle: function () { return undefined; },
                    getTopAppBarHeight: function () { return 0; },
                    notifyNavigationIconClicked: function () { return undefined; },
                    getViewportScrollY: function () { return 0; },
                    getTotalActionItems: function () { return 0; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: false,
            configurable: true
        });
        /** Other variants of TopAppBar foundation overrides this method */
        MDCTopAppBarBaseFoundation.prototype.handleTargetScroll = function () { }; // tslint:disable-line:no-empty
        /** Other variants of TopAppBar foundation overrides this method */
        MDCTopAppBarBaseFoundation.prototype.handleWindowResize = function () { }; // tslint:disable-line:no-empty
        MDCTopAppBarBaseFoundation.prototype.handleNavigationClick = function () {
            this.adapter.notifyNavigationIconClicked();
        };
        return MDCTopAppBarBaseFoundation;
    }(MDCFoundation));

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
    var INITIAL_VALUE = 0;
    var MDCTopAppBarFoundation = /** @class */ (function (_super) {
        __extends(MDCTopAppBarFoundation, _super);
        /* istanbul ignore next: optional argument is not a branch statement */
        function MDCTopAppBarFoundation(adapter) {
            var _this = _super.call(this, adapter) || this;
            /**
             * Indicates if the top app bar was docked in the previous scroll handler iteration.
             */
            _this.wasDocked = true;
            /**
             * Indicates if the top app bar is docked in the fully shown position.
             */
            _this.isDockedShowing = true;
            /**
             * Variable for current scroll position of the top app bar
             */
            _this.currentAppBarOffsetTop = 0;
            /**
             * Used to prevent the top app bar from being scrolled out of view during resize events
             */
            _this.isCurrentlyBeingResized = false;
            /**
             * The timeout that's used to throttle the resize events
             */
            _this.resizeThrottleId = INITIAL_VALUE;
            /**
             * The timeout that's used to debounce toggling the isCurrentlyBeingResized
             * variable after a resize
             */
            _this.resizeDebounceId = INITIAL_VALUE;
            _this.lastScrollPosition = _this.adapter.getViewportScrollY();
            _this.topAppBarHeight = _this.adapter.getTopAppBarHeight();
            return _this;
        }
        MDCTopAppBarFoundation.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.adapter.setStyle('top', '');
        };
        /**
         * Scroll handler for the default scroll behavior of the top app bar.
         * @override
         */
        MDCTopAppBarFoundation.prototype.handleTargetScroll = function () {
            var currentScrollPosition = Math.max(this.adapter.getViewportScrollY(), 0);
            var diff = currentScrollPosition - this.lastScrollPosition;
            this.lastScrollPosition = currentScrollPosition;
            // If the window is being resized the lastScrollPosition needs to be updated
            // but the current scroll of the top app bar should stay in the same
            // position.
            if (!this.isCurrentlyBeingResized) {
                this.currentAppBarOffsetTop -= diff;
                if (this.currentAppBarOffsetTop > 0) {
                    this.currentAppBarOffsetTop = 0;
                }
                else if (Math.abs(this.currentAppBarOffsetTop) > this.topAppBarHeight) {
                    this.currentAppBarOffsetTop = -this.topAppBarHeight;
                }
                this.moveTopAppBar();
            }
        };
        /**
         * Top app bar resize handler that throttle/debounce functions that execute updates.
         * @override
         */
        MDCTopAppBarFoundation.prototype.handleWindowResize = function () {
            var _this = this;
            // Throttle resize events 10 p/s
            if (!this.resizeThrottleId) {
                this.resizeThrottleId = setTimeout(function () {
                    _this.resizeThrottleId = INITIAL_VALUE;
                    _this.throttledResizeHandler();
                }, numbers$7.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
            }
            this.isCurrentlyBeingResized = true;
            if (this.resizeDebounceId) {
                clearTimeout(this.resizeDebounceId);
            }
            this.resizeDebounceId = setTimeout(function () {
                _this.handleTargetScroll();
                _this.isCurrentlyBeingResized = false;
                _this.resizeDebounceId = INITIAL_VALUE;
            }, numbers$7.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
        };
        /**
         * Function to determine if the DOM needs to update.
         */
        MDCTopAppBarFoundation.prototype.checkForUpdate = function () {
            var offscreenBoundaryTop = -this.topAppBarHeight;
            var hasAnyPixelsOffscreen = this.currentAppBarOffsetTop < 0;
            var hasAnyPixelsOnscreen = this.currentAppBarOffsetTop > offscreenBoundaryTop;
            var partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;
            // If it's partially showing, it can't be docked.
            if (partiallyShowing) {
                this.wasDocked = false;
            }
            else {
                // Not previously docked and not partially showing, it's now docked.
                if (!this.wasDocked) {
                    this.wasDocked = true;
                    return true;
                }
                else if (this.isDockedShowing !== hasAnyPixelsOnscreen) {
                    this.isDockedShowing = hasAnyPixelsOnscreen;
                    return true;
                }
            }
            return partiallyShowing;
        };
        /**
         * Function to move the top app bar if needed.
         */
        MDCTopAppBarFoundation.prototype.moveTopAppBar = function () {
            if (this.checkForUpdate()) {
                // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
                // so the top app bar doesn't show if the window resizes and the new height > the old height.
                var offset = this.currentAppBarOffsetTop;
                if (Math.abs(offset) >= this.topAppBarHeight) {
                    offset = -numbers$7.MAX_TOP_APP_BAR_HEIGHT;
                }
                this.adapter.setStyle('top', offset + 'px');
            }
        };
        /**
         * Throttled function that updates the top app bar scrolled values if the
         * top app bar height changes.
         */
        MDCTopAppBarFoundation.prototype.throttledResizeHandler = function () {
            var currentHeight = this.adapter.getTopAppBarHeight();
            if (this.topAppBarHeight !== currentHeight) {
                this.wasDocked = false;
                // Since the top app bar has a different height depending on the screen width, this
                // will ensure that the top app bar remains in the correct location if
                // completely hidden and a resize makes the top app bar a different height.
                this.currentAppBarOffsetTop -= this.topAppBarHeight - currentHeight;
                this.topAppBarHeight = currentHeight;
            }
            this.handleTargetScroll();
        };
        return MDCTopAppBarFoundation;
    }(MDCTopAppBarBaseFoundation));

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
    var MDCFixedTopAppBarFoundation = /** @class */ (function (_super) {
        __extends(MDCFixedTopAppBarFoundation, _super);
        function MDCFixedTopAppBarFoundation() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * State variable for the previous scroll iteration top app bar state
             */
            _this.wasScrolled = false;
            return _this;
        }
        /**
         * Scroll handler for applying/removing the modifier class on the fixed top app bar.
         * @override
         */
        MDCFixedTopAppBarFoundation.prototype.handleTargetScroll = function () {
            var currentScroll = this.adapter.getViewportScrollY();
            if (currentScroll <= 0) {
                if (this.wasScrolled) {
                    this.adapter.removeClass(cssClasses$c.FIXED_SCROLLED_CLASS);
                    this.wasScrolled = false;
                }
            }
            else {
                if (!this.wasScrolled) {
                    this.adapter.addClass(cssClasses$c.FIXED_SCROLLED_CLASS);
                    this.wasScrolled = true;
                }
            }
        };
        return MDCFixedTopAppBarFoundation;
    }(MDCTopAppBarFoundation));

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
    var MDCShortTopAppBarFoundation = /** @class */ (function (_super) {
        __extends(MDCShortTopAppBarFoundation, _super);
        /* istanbul ignore next: optional argument is not a branch statement */
        function MDCShortTopAppBarFoundation(adapter) {
            var _this = _super.call(this, adapter) || this;
            _this.collapsed = false;
            _this.isAlwaysCollapsed = false;
            return _this;
        }
        Object.defineProperty(MDCShortTopAppBarFoundation.prototype, "isCollapsed", {
            // Public visibility for backward compatibility.
            get: function () {
                return this.collapsed;
            },
            enumerable: false,
            configurable: true
        });
        MDCShortTopAppBarFoundation.prototype.init = function () {
            _super.prototype.init.call(this);
            if (this.adapter.getTotalActionItems() > 0) {
                this.adapter.addClass(cssClasses$c.SHORT_HAS_ACTION_ITEM_CLASS);
            }
            // If initialized with SHORT_COLLAPSED_CLASS, the bar should always be collapsed
            this.setAlwaysCollapsed(this.adapter.hasClass(cssClasses$c.SHORT_COLLAPSED_CLASS));
        };
        /**
         * Set if the short top app bar should always be collapsed.
         *
         * @param value When `true`, bar will always be collapsed. When `false`, bar may collapse or expand based on scroll.
         */
        MDCShortTopAppBarFoundation.prototype.setAlwaysCollapsed = function (value) {
            this.isAlwaysCollapsed = !!value;
            if (this.isAlwaysCollapsed) {
                this.collapse();
            }
            else {
                // let maybeCollapseBar determine if the bar should be collapsed
                this.maybeCollapseBar();
            }
        };
        MDCShortTopAppBarFoundation.prototype.getAlwaysCollapsed = function () {
            return this.isAlwaysCollapsed;
        };
        /**
         * Scroll handler for applying/removing the collapsed modifier class on the short top app bar.
         * @override
         */
        MDCShortTopAppBarFoundation.prototype.handleTargetScroll = function () {
            this.maybeCollapseBar();
        };
        MDCShortTopAppBarFoundation.prototype.maybeCollapseBar = function () {
            if (this.isAlwaysCollapsed) {
                return;
            }
            var currentScroll = this.adapter.getViewportScrollY();
            if (currentScroll <= 0) {
                if (this.collapsed) {
                    this.uncollapse();
                }
            }
            else {
                if (!this.collapsed) {
                    this.collapse();
                }
            }
        };
        MDCShortTopAppBarFoundation.prototype.uncollapse = function () {
            this.adapter.removeClass(cssClasses$c.SHORT_COLLAPSED_CLASS);
            this.collapsed = false;
        };
        MDCShortTopAppBarFoundation.prototype.collapse = function () {
            this.adapter.addClass(cssClasses$c.SHORT_COLLAPSED_CLASS);
            this.collapsed = true;
        };
        return MDCShortTopAppBarFoundation;
    }(MDCTopAppBarBaseFoundation));

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    function classMap(classObj) {
        return Object.entries(classObj)
            .filter(([name, value]) => name !== '' && value)
            .map(([name]) => name)
            .join(' ');
    }

    function dispatch(element, eventType, detail, eventInit = { bubbles: true }, 
    /** This is an internal thing used by SMUI to duplicate some SMUI events as MDC events. */
    duplicateEventForMDC = false) {
        if (typeof Event !== 'undefined' && element) {
            const event = new CustomEvent(eventType, Object.assign(Object.assign({}, eventInit), { detail }));
            element === null || element === void 0 ? void 0 : element.dispatchEvent(event);
            if (duplicateEventForMDC && eventType.startsWith('SMUI')) {
                const duplicateEvent = new CustomEvent(eventType.replace(/^SMUI/g, () => 'MDC'), Object.assign(Object.assign({}, eventInit), { detail }));
                element === null || element === void 0 ? void 0 : element.dispatchEvent(duplicateEvent);
                if (duplicateEvent.defaultPrevented) {
                    event.preventDefault();
                }
            }
            return event;
        }
    }

    function exclude(obj, keys) {
        let names = Object.getOwnPropertyNames(obj);
        const newObj = {};
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            const cashIndex = name.indexOf('$');
            if (cashIndex !== -1 &&
                keys.indexOf(name.substring(0, cashIndex + 1)) !== -1) {
                continue;
            }
            if (keys.indexOf(name) !== -1) {
                continue;
            }
            newObj[name] = obj[name];
        }
        return newObj;
    }

    // Match old modifiers. (only works on DOM events)
    const oldModifierRegex = /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
    // Match new modifiers.
    const newModifierRegex = /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
    function forwardEventsBuilder(component) {
        // This is our pseudo $on function. It is defined on component mount.
        let $on;
        // This is a list of events bound before mount.
        let events = [];
        // And we override the $on function to forward all bound events.
        component.$on = (fullEventType, callback) => {
            let eventType = fullEventType;
            let destructor = () => { };
            if ($on) {
                // The event was bound programmatically.
                destructor = $on(eventType, callback);
            }
            else {
                // The event was bound before mount by Svelte.
                events.push([eventType, callback]);
            }
            const oldModifierMatch = eventType.match(oldModifierRegex);
            if (oldModifierMatch && console) {
                console.warn('Event modifiers in SMUI now use "$" instead of ":", so that ' +
                    'all events can be bound with modifiers. Please update your ' +
                    'event binding: ', eventType);
            }
            return () => {
                destructor();
            };
        };
        function forward(e) {
            // Internally bubble the event up from Svelte components.
            bubble(component, e);
        }
        return (node) => {
            const destructors = [];
            const forwardDestructors = {};
            // This function is responsible for listening and forwarding
            // all bound events.
            $on = (fullEventType, callback) => {
                let eventType = fullEventType;
                let handler = callback;
                // DOM addEventListener options argument.
                let options = false;
                const oldModifierMatch = eventType.match(oldModifierRegex);
                const newModifierMatch = eventType.match(newModifierRegex);
                const modifierMatch = oldModifierMatch || newModifierMatch;
                if (eventType.match(/^SMUI:\w+:/)) {
                    const newEventTypeParts = eventType.split(':');
                    let newEventType = '';
                    for (let i = 0; i < newEventTypeParts.length; i++) {
                        newEventType +=
                            i === newEventTypeParts.length - 1
                                ? ':' + newEventTypeParts[i]
                                : newEventTypeParts[i]
                                    .split('-')
                                    .map((value) => value.slice(0, 1).toUpperCase() + value.slice(1))
                                    .join('');
                    }
                    console.warn(`The event ${eventType.split('$')[0]} has been renamed to ${newEventType.split('$')[0]}.`);
                    eventType = newEventType;
                }
                if (modifierMatch) {
                    // Parse the event modifiers.
                    // Supported modifiers:
                    // - preventDefault
                    // - stopPropagation
                    // - passive
                    // - nonpassive
                    // - capture
                    // - once
                    const parts = eventType.split(oldModifierMatch ? ':' : '$');
                    eventType = parts[0];
                    const eventOptions = Object.fromEntries(parts.slice(1).map((mod) => [mod, true]));
                    if (eventOptions.passive) {
                        options = options || {};
                        options.passive = true;
                    }
                    if (eventOptions.nonpassive) {
                        options = options || {};
                        options.passive = false;
                    }
                    if (eventOptions.capture) {
                        options = options || {};
                        options.capture = true;
                    }
                    if (eventOptions.once) {
                        options = options || {};
                        options.once = true;
                    }
                    if (eventOptions.preventDefault) {
                        handler = prevent_default(handler);
                    }
                    if (eventOptions.stopPropagation) {
                        handler = stop_propagation(handler);
                    }
                }
                // Listen for the event directly, with the given options.
                const off = listen(node, eventType, handler, options);
                const destructor = () => {
                    off();
                    const idx = destructors.indexOf(destructor);
                    if (idx > -1) {
                        destructors.splice(idx, 1);
                    }
                };
                destructors.push(destructor);
                // Forward the event from Svelte.
                if (!(eventType in forwardDestructors)) {
                    forwardDestructors[eventType] = listen(node, eventType, forward);
                }
                return destructor;
            };
            for (let i = 0; i < events.length; i++) {
                // Listen to all the events added before mount.
                $on(events[i][0], events[i][1]);
            }
            return {
                destroy: () => {
                    // Remove all event listeners.
                    for (let i = 0; i < destructors.length; i++) {
                        destructors[i]();
                    }
                    // Remove all event forwarders.
                    for (let entry of Object.entries(forwardDestructors)) {
                        entry[1]();
                    }
                },
            };
        };
    }

    function prefixFilter(obj, prefix) {
        let names = Object.getOwnPropertyNames(obj);
        const newObj = {};
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            if (name.substring(0, prefix.length) === prefix) {
                newObj[name.substring(prefix.length)] = obj[name];
            }
        }
        return newObj;
    }

    function useActions(node, actions) {
        let actionReturns = [];
        if (actions) {
            for (let i = 0; i < actions.length; i++) {
                const actionEntry = actions[i];
                const action = Array.isArray(actionEntry) ? actionEntry[0] : actionEntry;
                if (Array.isArray(actionEntry) && actionEntry.length > 1) {
                    actionReturns.push(action(node, actionEntry[1]));
                }
                else {
                    actionReturns.push(action(node));
                }
            }
        }
        return {
            update(actions) {
                if (((actions && actions.length) || 0) != actionReturns.length) {
                    throw new Error('You must not change the length of an actions array.');
                }
                if (actions) {
                    for (let i = 0; i < actions.length; i++) {
                        const returnEntry = actionReturns[i];
                        if (returnEntry && returnEntry.update) {
                            const actionEntry = actions[i];
                            if (Array.isArray(actionEntry) && actionEntry.length > 1) {
                                returnEntry.update(actionEntry[1]);
                            }
                            else {
                                returnEntry.update();
                            }
                        }
                    }
                }
            },
            destroy() {
                for (let i = 0; i < actionReturns.length; i++) {
                    const returnEntry = actionReturns[i];
                    if (returnEntry && returnEntry.destroy) {
                        returnEntry.destroy();
                    }
                }
            },
        };
    }

    /* node_modules/@smui/top-app-bar/dist/TopAppBar.svelte generated by Svelte v3.49.0 */

    const { window: window_1 } = globals;

    const file$r = "node_modules/@smui/top-app-bar/dist/TopAppBar.svelte";

    function create_fragment$w(ctx) {
    	let header;
    	let header_class_value;
    	let header_style_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[22].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[21], null);

    	let header_levels = [
    		{
    			class: header_class_value = classMap({
    				[/*className*/ ctx[2]]: true,
    				'mdc-top-app-bar': true,
    				'mdc-top-app-bar--short': /*variant*/ ctx[4] === 'short',
    				'mdc-top-app-bar--short-collapsed': /*collapsed*/ ctx[0],
    				'mdc-top-app-bar--fixed': /*variant*/ ctx[4] === 'fixed',
    				'smui-top-app-bar--static': /*variant*/ ctx[4] === 'static',
    				'smui-top-app-bar--color-secondary': /*color*/ ctx[5] === 'secondary',
    				'mdc-top-app-bar--prominent': /*prominent*/ ctx[6],
    				'mdc-top-app-bar--dense': /*dense*/ ctx[7],
    				.../*internalClasses*/ ctx[11]
    			})
    		},
    		{
    			style: header_style_value = Object.entries(/*internalStyles*/ ctx[12]).map(func$8).concat([/*style*/ ctx[3]]).join(' ')
    		},
    		/*$$restProps*/ ctx[15]
    	];

    	let header_data = {};

    	for (let i = 0; i < header_levels.length; i += 1) {
    		header_data = assign(header_data, header_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			header = element("header");
    			if (default_slot) default_slot.c();
    			set_attributes(header, header_data);
    			add_location(header, file$r, 9, 0, 208);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);

    			if (default_slot) {
    				default_slot.m(header, null);
    			}

    			/*header_binding*/ ctx[25](header);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window_1, "resize", /*resize_handler*/ ctx[23], false, false, false),
    					listen_dev(window_1, "scroll", /*scroll_handler*/ ctx[24], false, false, false),
    					action_destroyer(useActions_action = useActions.call(null, header, /*use*/ ctx[1])),
    					action_destroyer(/*forwardEvents*/ ctx[13].call(null, header)),
    					listen_dev(header, "SMUITopAppBarIconButton:nav", /*SMUITopAppBarIconButton_nav_handler*/ ctx[26], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 2097152)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[21],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[21])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[21], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(header, header_data = get_spread_update(header_levels, [
    				(!current || dirty[0] & /*className, variant, collapsed, color, prominent, dense, internalClasses*/ 2293 && header_class_value !== (header_class_value = classMap({
    					[/*className*/ ctx[2]]: true,
    					'mdc-top-app-bar': true,
    					'mdc-top-app-bar--short': /*variant*/ ctx[4] === 'short',
    					'mdc-top-app-bar--short-collapsed': /*collapsed*/ ctx[0],
    					'mdc-top-app-bar--fixed': /*variant*/ ctx[4] === 'fixed',
    					'smui-top-app-bar--static': /*variant*/ ctx[4] === 'static',
    					'smui-top-app-bar--color-secondary': /*color*/ ctx[5] === 'secondary',
    					'mdc-top-app-bar--prominent': /*prominent*/ ctx[6],
    					'mdc-top-app-bar--dense': /*dense*/ ctx[7],
    					.../*internalClasses*/ ctx[11]
    				}))) && { class: header_class_value },
    				(!current || dirty[0] & /*internalStyles, style*/ 4104 && header_style_value !== (header_style_value = Object.entries(/*internalStyles*/ ctx[12]).map(func$8).concat([/*style*/ ctx[3]]).join(' '))) && { style: header_style_value },
    				dirty[0] & /*$$restProps*/ 32768 && /*$$restProps*/ ctx[15]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if (default_slot) default_slot.d(detaching);
    			/*header_binding*/ ctx[25](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func$8 = ([name, value]) => `${name}: ${value};`;

    function instance_1$c($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"use","class","style","variant","color","collapsed","prominent","dense","scrollTarget","getPropStore","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TopAppBar', slots, ['default']);
    	const forwardEvents = forwardEventsBuilder(get_current_component());

    	let uninitializedValue = () => {
    		
    	};

    	function isUninitializedValue(value) {
    		return value === uninitializedValue;
    	}

    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { style = '' } = $$props;
    	let { variant = 'standard' } = $$props;
    	let { color = 'primary' } = $$props;
    	let { collapsed = uninitializedValue } = $$props;
    	const alwaysCollapsed = !isUninitializedValue(collapsed) && !!collapsed;

    	if (isUninitializedValue(collapsed)) {
    		collapsed = false;
    	}

    	let { prominent = false } = $$props;
    	let { dense = false } = $$props;
    	let { scrollTarget = undefined } = $$props;
    	let element;
    	let instance;
    	let internalClasses = {};
    	let internalStyles = {};
    	let propStoreSet;

    	let propStore = readable({ variant, prominent, dense }, set => {
    		$$invalidate(18, propStoreSet = set);
    	});

    	let oldScrollTarget = undefined;
    	let oldVariant = variant;

    	onMount(() => {
    		$$invalidate(9, instance = getInstance());
    		instance.init();

    		return () => {
    			instance.destroy();
    		};
    	});

    	function getInstance() {
    		const Foundation = ({
    			static: MDCTopAppBarBaseFoundation,
    			short: MDCShortTopAppBarFoundation,
    			fixed: MDCFixedTopAppBarFoundation
    		})[variant] || MDCTopAppBarFoundation;

    		return new Foundation({
    				hasClass,
    				addClass,
    				removeClass,
    				setStyle: addStyle,
    				getTopAppBarHeight: () => element.clientHeight,
    				notifyNavigationIconClicked: () => dispatch(element, 'SMUITopAppBar:nav', undefined, undefined, true),
    				getViewportScrollY: () => scrollTarget == null
    				? window.pageYOffset
    				: scrollTarget.scrollTop,
    				getTotalActionItems: () => element.querySelectorAll('.mdc-top-app-bar__action-item').length
    			});
    	}

    	function hasClass(className) {
    		return className in internalClasses
    		? internalClasses[className]
    		: getElement().classList.contains(className);
    	}

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(11, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(11, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function addStyle(name, value) {
    		if (internalStyles[name] != value) {
    			if (value === '' || value == null) {
    				delete internalStyles[name];
    				((($$invalidate(12, internalStyles), $$invalidate(20, oldVariant)), $$invalidate(4, variant)), $$invalidate(9, instance));
    			} else {
    				$$invalidate(12, internalStyles[name] = value, internalStyles);
    			}
    		}
    	}

    	function handleTargetScroll() {
    		if (instance) {
    			instance.handleTargetScroll();

    			if (variant === 'short') {
    				$$invalidate(0, collapsed = 'isCollapsed' in instance && instance.isCollapsed);
    			}
    		}
    	}

    	function getPropStore() {
    		return propStore;
    	}

    	function getElement() {
    		return element;
    	}

    	const resize_handler = () => variant !== 'short' && variant !== 'fixed' && instance && instance.handleWindowResize();
    	const scroll_handler = () => scrollTarget == null && handleTargetScroll();

    	function header_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(10, element);
    		});
    	}

    	const SMUITopAppBarIconButton_nav_handler = () => instance && instance.handleNavigationClick();

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(15, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('style' in $$new_props) $$invalidate(3, style = $$new_props.style);
    		if ('variant' in $$new_props) $$invalidate(4, variant = $$new_props.variant);
    		if ('color' in $$new_props) $$invalidate(5, color = $$new_props.color);
    		if ('collapsed' in $$new_props) $$invalidate(0, collapsed = $$new_props.collapsed);
    		if ('prominent' in $$new_props) $$invalidate(6, prominent = $$new_props.prominent);
    		if ('dense' in $$new_props) $$invalidate(7, dense = $$new_props.dense);
    		if ('scrollTarget' in $$new_props) $$invalidate(8, scrollTarget = $$new_props.scrollTarget);
    		if ('$$scope' in $$new_props) $$invalidate(21, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		MDCTopAppBarBaseFoundation,
    		MDCTopAppBarFoundation,
    		MDCFixedTopAppBarFoundation,
    		MDCShortTopAppBarFoundation,
    		onMount,
    		get_current_component,
    		readable,
    		forwardEventsBuilder,
    		classMap,
    		useActions,
    		dispatch,
    		forwardEvents,
    		uninitializedValue,
    		isUninitializedValue,
    		use,
    		className,
    		style,
    		variant,
    		color,
    		collapsed,
    		alwaysCollapsed,
    		prominent,
    		dense,
    		scrollTarget,
    		element,
    		instance,
    		internalClasses,
    		internalStyles,
    		propStoreSet,
    		propStore,
    		oldScrollTarget,
    		oldVariant,
    		getInstance,
    		hasClass,
    		addClass,
    		removeClass,
    		addStyle,
    		handleTargetScroll,
    		getPropStore,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('uninitializedValue' in $$props) uninitializedValue = $$new_props.uninitializedValue;
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('style' in $$props) $$invalidate(3, style = $$new_props.style);
    		if ('variant' in $$props) $$invalidate(4, variant = $$new_props.variant);
    		if ('color' in $$props) $$invalidate(5, color = $$new_props.color);
    		if ('collapsed' in $$props) $$invalidate(0, collapsed = $$new_props.collapsed);
    		if ('prominent' in $$props) $$invalidate(6, prominent = $$new_props.prominent);
    		if ('dense' in $$props) $$invalidate(7, dense = $$new_props.dense);
    		if ('scrollTarget' in $$props) $$invalidate(8, scrollTarget = $$new_props.scrollTarget);
    		if ('element' in $$props) $$invalidate(10, element = $$new_props.element);
    		if ('instance' in $$props) $$invalidate(9, instance = $$new_props.instance);
    		if ('internalClasses' in $$props) $$invalidate(11, internalClasses = $$new_props.internalClasses);
    		if ('internalStyles' in $$props) $$invalidate(12, internalStyles = $$new_props.internalStyles);
    		if ('propStoreSet' in $$props) $$invalidate(18, propStoreSet = $$new_props.propStoreSet);
    		if ('propStore' in $$props) propStore = $$new_props.propStore;
    		if ('oldScrollTarget' in $$props) $$invalidate(19, oldScrollTarget = $$new_props.oldScrollTarget);
    		if ('oldVariant' in $$props) $$invalidate(20, oldVariant = $$new_props.oldVariant);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*propStoreSet, variant, prominent, dense*/ 262352) {
    			if (propStoreSet) {
    				propStoreSet({ variant, prominent, dense });
    			}
    		}

    		if ($$self.$$.dirty[0] & /*oldVariant, variant, instance*/ 1049104) {
    			if (oldVariant !== variant && instance) {
    				$$invalidate(20, oldVariant = variant);
    				instance.destroy();
    				$$invalidate(11, internalClasses = {});
    				$$invalidate(12, internalStyles = {});
    				$$invalidate(9, instance = getInstance());
    				instance.init();
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, variant*/ 528) {
    			if (instance && variant === 'short' && 'setAlwaysCollapsed' in instance) {
    				instance.setAlwaysCollapsed(alwaysCollapsed);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*oldScrollTarget, scrollTarget*/ 524544) {
    			if (oldScrollTarget !== scrollTarget) {
    				if (oldScrollTarget) {
    					oldScrollTarget.removeEventListener('scroll', handleTargetScroll);
    				}

    				if (scrollTarget) {
    					scrollTarget.addEventListener('scroll', handleTargetScroll);
    				}

    				$$invalidate(19, oldScrollTarget = scrollTarget);
    			}
    		}
    	};

    	return [
    		collapsed,
    		use,
    		className,
    		style,
    		variant,
    		color,
    		prominent,
    		dense,
    		scrollTarget,
    		instance,
    		element,
    		internalClasses,
    		internalStyles,
    		forwardEvents,
    		handleTargetScroll,
    		$$restProps,
    		getPropStore,
    		getElement,
    		propStoreSet,
    		oldScrollTarget,
    		oldVariant,
    		$$scope,
    		slots,
    		resize_handler,
    		scroll_handler,
    		header_binding,
    		SMUITopAppBarIconButton_nav_handler
    	];
    }

    class TopAppBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance_1$c,
    			create_fragment$w,
    			safe_not_equal,
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
    				getElement: 17
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TopAppBar",
    			options,
    			id: create_fragment$w.name
    		});
    	}

    	get use() {
    		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get variant() {
    		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set variant(value) {
    		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get collapsed() {
    		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set collapsed(value) {
    		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prominent() {
    		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prominent(value) {
    		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dense() {
    		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dense(value) {
    		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get scrollTarget() {
    		throw new Error("<TopAppBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set scrollTarget(value) {
    		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getPropStore() {
    		return this.$$.ctx[16];
    	}

    	set getPropStore(value) {
    		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[17];
    	}

    	set getElement(value) {
    		throw new Error("<TopAppBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/common/dist/elements/Div.svelte generated by Svelte v3.49.0 */
    const file$q = "node_modules/@smui/common/dist/elements/Div.svelte";

    function create_fragment$v(ctx) {
    	let div;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let div_levels = [/*$$restProps*/ ctx[3]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$q, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[7](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, div, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[2].call(null, div))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[7](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Div', slots, ['default']);
    	let { use = [] } = $$props;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let element;

    	function getElement() {
    		return element;
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(1, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		forwardEventsBuilder,
    		useActions,
    		use,
    		forwardEvents,
    		element,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(1, element = $$new_props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		element,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		div_binding
    	];
    }

    class Div$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$v, safe_not_equal, { use: 0, getElement: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Div",
    			options,
    			id: create_fragment$v.name
    		});
    	}

    	get use() {
    		throw new Error("<Div>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Div>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[4];
    	}

    	set getElement(value) {
    		throw new Error("<Div>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/common/dist/classadder/ClassAdder.svelte generated by Svelte v3.49.0 */

    // (1:0) <svelte:component   this={component}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     [smuiClass]: true,     ...smuiClassMap,   })}   {...props}   {...$$restProps}>
    function create_default_slot$8(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4096)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[12],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[12])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[12], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$8.name,
    		type: "slot",
    		source: "(1:0) <svelte:component   this={component}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     [smuiClass]: true,     ...smuiClassMap,   })}   {...props}   {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$u(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{
    			use: [/*forwardEvents*/ ctx[7], .../*use*/ ctx[0]]
    		},
    		{
    			class: classMap({
    				[/*className*/ ctx[1]]: true,
    				[/*smuiClass*/ ctx[5]]: true,
    				.../*smuiClassMap*/ ctx[4]
    			})
    		},
    		/*props*/ ctx[6],
    		/*$$restProps*/ ctx[8]
    	];

    	var switch_value = /*component*/ ctx[2];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot$8] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    		/*switch_instance_binding*/ ctx[11](switch_instance);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const switch_instance_changes = (dirty & /*forwardEvents, use, classMap, className, smuiClass, smuiClassMap, props, $$restProps*/ 499)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*forwardEvents, use*/ 129 && {
    						use: [/*forwardEvents*/ ctx[7], .../*use*/ ctx[0]]
    					},
    					dirty & /*classMap, className, smuiClass, smuiClassMap*/ 50 && {
    						class: classMap({
    							[/*className*/ ctx[1]]: true,
    							[/*smuiClass*/ ctx[5]]: true,
    							.../*smuiClassMap*/ ctx[4]
    						})
    					},
    					dirty & /*props*/ 64 && get_spread_object(/*props*/ ctx[6]),
    					dirty & /*$$restProps*/ 256 && get_spread_object(/*$$restProps*/ ctx[8])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 4096) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*component*/ ctx[2])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					/*switch_instance_binding*/ ctx[11](switch_instance);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*switch_instance_binding*/ ctx[11](null);
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const internals = {
    	component: Div$1,
    	class: '',
    	classMap: {},
    	contexts: {},
    	props: {}
    };

    function instance$i($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","class","component","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ClassAdder', slots, ['default']);
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let element;
    	const smuiClass = internals.class;
    	const smuiClassMap = {};
    	const smuiClassUnsubscribes = [];
    	const contexts = internals.contexts;
    	const props = internals.props;
    	let { component = internals.component } = $$props;

    	Object.entries(internals.classMap).forEach(([name, context]) => {
    		const store = getContext(context);

    		if (store && 'subscribe' in store) {
    			smuiClassUnsubscribes.push(store.subscribe(value => {
    				$$invalidate(4, smuiClassMap[name] = value, smuiClassMap);
    			}));
    		}
    	});

    	const forwardEvents = forwardEventsBuilder(get_current_component());

    	for (let context in contexts) {
    		if (contexts.hasOwnProperty(context)) {
    			setContext(context, contexts[context]);
    		}
    	}

    	onDestroy(() => {
    		for (const unsubscribe of smuiClassUnsubscribes) {
    			unsubscribe();
    		}
    	});

    	function getElement() {
    		return element.getElement();
    	}

    	function switch_instance_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(3, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('component' in $$new_props) $$invalidate(2, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		Div: Div$1,
    		internals,
    		onDestroy,
    		getContext,
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		use,
    		className,
    		element,
    		smuiClass,
    		smuiClassMap,
    		smuiClassUnsubscribes,
    		contexts,
    		props,
    		component,
    		forwardEvents,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('element' in $$props) $$invalidate(3, element = $$new_props.element);
    		if ('component' in $$props) $$invalidate(2, component = $$new_props.component);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		className,
    		component,
    		element,
    		smuiClassMap,
    		smuiClass,
    		props,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		slots,
    		switch_instance_binding,
    		$$scope
    	];
    }

    class ClassAdder extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$i, create_fragment$u, safe_not_equal, {
    			use: 0,
    			class: 1,
    			component: 2,
    			getElement: 9
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ClassAdder",
    			options,
    			id: create_fragment$u.name
    		});
    	}

    	get use() {
    		throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[9];
    	}

    	set getElement(value) {
    		throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    // @ts-ignore: Internals is exported... argh.
    const defaults = Object.assign({}, internals);
    function classAdderBuilder(props) {
        return new Proxy(ClassAdder, {
            construct: function (target, args) {
                Object.assign(internals, defaults, props);
                // @ts-ignore: Need spread arg.
                return new target(...args);
            },
            get: function (target, prop) {
                Object.assign(internals, defaults, props);
                return target[prop];
            },
        });
    }

    /* node_modules/@smui/common/dist/elements/A.svelte generated by Svelte v3.49.0 */
    const file$p = "node_modules/@smui/common/dist/elements/A.svelte";

    function create_fragment$t(ctx) {
    	let a;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[7].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);
    	let a_levels = [{ href: /*href*/ ctx[1] }, /*$$restProps*/ ctx[4]];
    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$p, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			/*a_binding*/ ctx[8](a);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, a, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[3].call(null, a))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 64)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[6],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 2) && { href: /*href*/ ctx[1] },
    				dirty & /*$$restProps*/ 16 && /*$$restProps*/ ctx[4]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			/*a_binding*/ ctx[8](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","href","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('A', slots, ['default']);
    	let { use = [] } = $$props;
    	let { href = 'javascript:void(0);' } = $$props;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let element;

    	function getElement() {
    		return element;
    	}

    	function a_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(2, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('href' in $$new_props) $$invalidate(1, href = $$new_props.href);
    		if ('$$scope' in $$new_props) $$invalidate(6, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		forwardEventsBuilder,
    		useActions,
    		use,
    		href,
    		forwardEvents,
    		element,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('href' in $$props) $$invalidate(1, href = $$new_props.href);
    		if ('element' in $$props) $$invalidate(2, element = $$new_props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		href,
    		element,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		a_binding
    	];
    }

    class A$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$t, safe_not_equal, { use: 0, href: 1, getElement: 5 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "A",
    			options,
    			id: create_fragment$t.name
    		});
    	}

    	get use() {
    		throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[5];
    	}

    	set getElement(value) {
    		throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/common/dist/elements/H1.svelte generated by Svelte v3.49.0 */
    const file$o = "node_modules/@smui/common/dist/elements/H1.svelte";

    function create_fragment$s(ctx) {
    	let h1;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let h1_levels = [/*$$restProps*/ ctx[3]];
    	let h1_data = {};

    	for (let i = 0; i < h1_levels.length; i += 1) {
    		h1_data = assign(h1_data, h1_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			if (default_slot) default_slot.c();
    			set_attributes(h1, h1_data);
    			add_location(h1, file$o, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);

    			if (default_slot) {
    				default_slot.m(h1, null);
    			}

    			/*h1_binding*/ ctx[7](h1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, h1, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[2].call(null, h1))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(h1, h1_data = get_spread_update(h1_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (default_slot) default_slot.d(detaching);
    			/*h1_binding*/ ctx[7](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('H1', slots, ['default']);
    	let { use = [] } = $$props;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let element;

    	function getElement() {
    		return element;
    	}

    	function h1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(1, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		forwardEventsBuilder,
    		useActions,
    		use,
    		forwardEvents,
    		element,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(1, element = $$new_props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		element,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		h1_binding
    	];
    }

    class H1$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$s, safe_not_equal, { use: 0, getElement: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "H1",
    			options,
    			id: create_fragment$s.name
    		});
    	}

    	get use() {
    		throw new Error("<H1>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<H1>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[4];
    	}

    	set getElement(value) {
    		throw new Error("<H1>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/common/dist/elements/H2.svelte generated by Svelte v3.49.0 */
    const file$n = "node_modules/@smui/common/dist/elements/H2.svelte";

    function create_fragment$r(ctx) {
    	let h2;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let h2_levels = [/*$$restProps*/ ctx[3]];
    	let h2_data = {};

    	for (let i = 0; i < h2_levels.length; i += 1) {
    		h2_data = assign(h2_data, h2_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			if (default_slot) default_slot.c();
    			set_attributes(h2, h2_data);
    			add_location(h2, file$n, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);

    			if (default_slot) {
    				default_slot.m(h2, null);
    			}

    			/*h2_binding*/ ctx[7](h2);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, h2, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[2].call(null, h2))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(h2, h2_data = get_spread_update(h2_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (default_slot) default_slot.d(detaching);
    			/*h2_binding*/ ctx[7](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('H2', slots, ['default']);
    	let { use = [] } = $$props;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let element;

    	function getElement() {
    		return element;
    	}

    	function h2_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(1, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		forwardEventsBuilder,
    		useActions,
    		use,
    		forwardEvents,
    		element,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(1, element = $$new_props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		element,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		h2_binding
    	];
    }

    class H2$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$r, safe_not_equal, { use: 0, getElement: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "H2",
    			options,
    			id: create_fragment$r.name
    		});
    	}

    	get use() {
    		throw new Error("<H2>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<H2>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[4];
    	}

    	set getElement(value) {
    		throw new Error("<H2>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/common/dist/elements/H3.svelte generated by Svelte v3.49.0 */
    const file$m = "node_modules/@smui/common/dist/elements/H3.svelte";

    function create_fragment$q(ctx) {
    	let h3;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let h3_levels = [/*$$restProps*/ ctx[3]];
    	let h3_data = {};

    	for (let i = 0; i < h3_levels.length; i += 1) {
    		h3_data = assign(h3_data, h3_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			if (default_slot) default_slot.c();
    			set_attributes(h3, h3_data);
    			add_location(h3, file$m, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);

    			if (default_slot) {
    				default_slot.m(h3, null);
    			}

    			/*h3_binding*/ ctx[7](h3);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, h3, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[2].call(null, h3))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(h3, h3_data = get_spread_update(h3_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (default_slot) default_slot.d(detaching);
    			/*h3_binding*/ ctx[7](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('H3', slots, ['default']);
    	let { use = [] } = $$props;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let element;

    	function getElement() {
    		return element;
    	}

    	function h3_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(1, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		forwardEventsBuilder,
    		useActions,
    		use,
    		forwardEvents,
    		element,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(1, element = $$new_props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		element,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		h3_binding
    	];
    }

    class H3$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$q, safe_not_equal, { use: 0, getElement: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "H3",
    			options,
    			id: create_fragment$q.name
    		});
    	}

    	get use() {
    		throw new Error("<H3>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<H3>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[4];
    	}

    	set getElement(value) {
    		throw new Error("<H3>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/common/dist/elements/Li.svelte generated by Svelte v3.49.0 */
    const file$l = "node_modules/@smui/common/dist/elements/Li.svelte";

    function create_fragment$p(ctx) {
    	let li;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let li_levels = [/*$$restProps*/ ctx[3]];
    	let li_data = {};

    	for (let i = 0; i < li_levels.length; i += 1) {
    		li_data = assign(li_data, li_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			if (default_slot) default_slot.c();
    			set_attributes(li, li_data);
    			add_location(li, file$l, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);

    			if (default_slot) {
    				default_slot.m(li, null);
    			}

    			/*li_binding*/ ctx[7](li);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, li, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[2].call(null, li))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(li, li_data = get_spread_update(li_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (default_slot) default_slot.d(detaching);
    			/*li_binding*/ ctx[7](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Li', slots, ['default']);
    	let { use = [] } = $$props;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let element;

    	function getElement() {
    		return element;
    	}

    	function li_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(1, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		forwardEventsBuilder,
    		useActions,
    		use,
    		forwardEvents,
    		element,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(1, element = $$new_props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		element,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		li_binding
    	];
    }

    class Li$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$p, safe_not_equal, { use: 0, getElement: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Li",
    			options,
    			id: create_fragment$p.name
    		});
    	}

    	get use() {
    		throw new Error("<Li>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Li>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[4];
    	}

    	set getElement(value) {
    		throw new Error("<Li>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/common/dist/elements/Nav.svelte generated by Svelte v3.49.0 */
    const file$k = "node_modules/@smui/common/dist/elements/Nav.svelte";

    function create_fragment$o(ctx) {
    	let nav;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let nav_levels = [/*$$restProps*/ ctx[3]];
    	let nav_data = {};

    	for (let i = 0; i < nav_levels.length; i += 1) {
    		nav_data = assign(nav_data, nav_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			if (default_slot) default_slot.c();
    			set_attributes(nav, nav_data);
    			add_location(nav, file$k, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);

    			if (default_slot) {
    				default_slot.m(nav, null);
    			}

    			/*nav_binding*/ ctx[7](nav);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, nav, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[2].call(null, nav))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(nav, nav_data = get_spread_update(nav_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			if (default_slot) default_slot.d(detaching);
    			/*nav_binding*/ ctx[7](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nav', slots, ['default']);
    	let { use = [] } = $$props;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let element;

    	function getElement() {
    		return element;
    	}

    	function nav_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(1, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		forwardEventsBuilder,
    		useActions,
    		use,
    		forwardEvents,
    		element,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(1, element = $$new_props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		element,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		nav_binding
    	];
    }

    class Nav$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$o, safe_not_equal, { use: 0, getElement: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nav",
    			options,
    			id: create_fragment$o.name
    		});
    	}

    	get use() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[4];
    	}

    	set getElement(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/common/dist/elements/Span.svelte generated by Svelte v3.49.0 */
    const file$j = "node_modules/@smui/common/dist/elements/Span.svelte";

    function create_fragment$n(ctx) {
    	let span;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let span_levels = [/*$$restProps*/ ctx[3]];
    	let span_data = {};

    	for (let i = 0; i < span_levels.length; i += 1) {
    		span_data = assign(span_data, span_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (default_slot) default_slot.c();
    			set_attributes(span, span_data);
    			add_location(span, file$j, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (default_slot) {
    				default_slot.m(span, null);
    			}

    			/*span_binding*/ ctx[7](span);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, span, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[2].call(null, span))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(span, span_data = get_spread_update(span_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (default_slot) default_slot.d(detaching);
    			/*span_binding*/ ctx[7](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Span', slots, ['default']);
    	let { use = [] } = $$props;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let element;

    	function getElement() {
    		return element;
    	}

    	function span_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(1, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		forwardEventsBuilder,
    		useActions,
    		use,
    		forwardEvents,
    		element,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(1, element = $$new_props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		element,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		span_binding
    	];
    }

    class Span$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$n, safe_not_equal, { use: 0, getElement: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Span",
    			options,
    			id: create_fragment$n.name
    		});
    	}

    	get use() {
    		throw new Error("<Span>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Span>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[4];
    	}

    	set getElement(value) {
    		throw new Error("<Span>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/common/dist/elements/Ul.svelte generated by Svelte v3.49.0 */
    const file$i = "node_modules/@smui/common/dist/elements/Ul.svelte";

    function create_fragment$m(ctx) {
    	let ul;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let ul_levels = [/*$$restProps*/ ctx[3]];
    	let ul_data = {};

    	for (let i = 0; i < ul_levels.length; i += 1) {
    		ul_data = assign(ul_data, ul_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			if (default_slot) default_slot.c();
    			set_attributes(ul, ul_data);
    			add_location(ul, file$i, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			if (default_slot) {
    				default_slot.m(ul, null);
    			}

    			/*ul_binding*/ ctx[7](ul);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, ul, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[2].call(null, ul))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(ul, ul_data = get_spread_update(ul_levels, [dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			if (default_slot) default_slot.d(detaching);
    			/*ul_binding*/ ctx[7](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Ul', slots, ['default']);
    	let { use = [] } = $$props;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let element;

    	function getElement() {
    		return element;
    	}

    	function ul_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(1, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		forwardEventsBuilder,
    		useActions,
    		use,
    		forwardEvents,
    		element,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(1, element = $$new_props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		element,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		ul_binding
    	];
    }

    class Ul$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$m, safe_not_equal, { use: 0, getElement: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Ul",
    			options,
    			id: create_fragment$m.name
    		});
    	}

    	get use() {
    		throw new Error("<Ul>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Ul>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[4];
    	}

    	set getElement(value) {
    		throw new Error("<Ul>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const A = A$1;
    const Div = Div$1;
    const H1 = H1$1;
    const H2 = H2$1;
    const H3 = H3$1;
    const Li = Li$1;
    const Nav = Nav$1;
    const Span = Span$1;
    const Ul = Ul$1;

    var Row = classAdderBuilder({
        class: 'mdc-top-app-bar__row',
        component: Div,
    });

    /* node_modules/@smui/top-app-bar/dist/Section.svelte generated by Svelte v3.49.0 */
    const file$h = "node_modules/@smui/top-app-bar/dist/Section.svelte";

    function create_fragment$l(ctx) {
    	let section;
    	let section_class_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	let section_levels = [
    		{
    			class: section_class_value = classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-top-app-bar__section': true,
    				'mdc-top-app-bar__section--align-start': /*align*/ ctx[2] === 'start',
    				'mdc-top-app-bar__section--align-end': /*align*/ ctx[2] === 'end'
    			})
    		},
    		/*toolbar*/ ctx[3] ? { role: 'toolbar' } : {},
    		/*$$restProps*/ ctx[6]
    	];

    	let section_data = {};

    	for (let i = 0; i < section_levels.length; i += 1) {
    		section_data = assign(section_data, section_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			if (default_slot) default_slot.c();
    			set_attributes(section, section_data);
    			add_location(section, file$h, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);

    			if (default_slot) {
    				default_slot.m(section, null);
    			}

    			/*section_binding*/ ctx[10](section);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, section, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[5].call(null, section))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(section, section_data = get_spread_update(section_levels, [
    				(!current || dirty & /*className, align*/ 6 && section_class_value !== (section_class_value = classMap({
    					[/*className*/ ctx[1]]: true,
    					'mdc-top-app-bar__section': true,
    					'mdc-top-app-bar__section--align-start': /*align*/ ctx[2] === 'start',
    					'mdc-top-app-bar__section--align-end': /*align*/ ctx[2] === 'end'
    				}))) && { class: section_class_value },
    				dirty & /*toolbar*/ 8 && (/*toolbar*/ ctx[3] ? { role: 'toolbar' } : {}),
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (default_slot) default_slot.d(detaching);
    			/*section_binding*/ ctx[10](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","class","align","toolbar","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Section', slots, ['default']);
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { align = 'start' } = $$props;
    	let { toolbar = false } = $$props;
    	let element;

    	setContext('SMUI:icon-button:context', toolbar
    	? 'top-app-bar:action'
    	: 'top-app-bar:navigation');

    	setContext('SMUI:button:context', toolbar
    	? 'top-app-bar:action'
    	: 'top-app-bar:navigation');

    	function getElement() {
    		return element;
    	}

    	function section_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(4, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('align' in $$new_props) $$invalidate(2, align = $$new_props.align);
    		if ('toolbar' in $$new_props) $$invalidate(3, toolbar = $$new_props.toolbar);
    		if ('$$scope' in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		useActions,
    		forwardEvents,
    		use,
    		className,
    		align,
    		toolbar,
    		element,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('align' in $$props) $$invalidate(2, align = $$new_props.align);
    		if ('toolbar' in $$props) $$invalidate(3, toolbar = $$new_props.toolbar);
    		if ('element' in $$props) $$invalidate(4, element = $$new_props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		className,
    		align,
    		toolbar,
    		element,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		section_binding
    	];
    }

    class Section$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$9, create_fragment$l, safe_not_equal, {
    			use: 0,
    			class: 1,
    			align: 2,
    			toolbar: 3,
    			getElement: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Section",
    			options,
    			id: create_fragment$l.name
    		});
    	}

    	get use() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get align() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set align(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get toolbar() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set toolbar(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[7];
    	}

    	set getElement(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Title = classAdderBuilder({
        class: 'mdc-top-app-bar__title',
        component: Span,
    });

    const Section = Section$1;

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
    var cssClasses$b = {
        LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
        LABEL_REQUIRED: 'mdc-floating-label--required',
        LABEL_SHAKE: 'mdc-floating-label--shake',
        ROOT: 'mdc-floating-label',
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
    var MDCFloatingLabelFoundation = /** @class */ (function (_super) {
        __extends(MDCFloatingLabelFoundation, _super);
        function MDCFloatingLabelFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCFloatingLabelFoundation.defaultAdapter), adapter)) || this;
            _this.shakeAnimationEndHandler = function () {
                _this.handleShakeAnimationEnd();
            };
            return _this;
        }
        Object.defineProperty(MDCFloatingLabelFoundation, "cssClasses", {
            get: function () {
                return cssClasses$b;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCFloatingLabelFoundation, "defaultAdapter", {
            /**
             * See {@link MDCFloatingLabelAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    getWidth: function () { return 0; },
                    registerInteractionHandler: function () { return undefined; },
                    deregisterInteractionHandler: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: false,
            configurable: true
        });
        MDCFloatingLabelFoundation.prototype.init = function () {
            this.adapter.registerInteractionHandler('animationend', this.shakeAnimationEndHandler);
        };
        MDCFloatingLabelFoundation.prototype.destroy = function () {
            this.adapter.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler);
        };
        /**
         * Returns the width of the label element.
         */
        MDCFloatingLabelFoundation.prototype.getWidth = function () {
            return this.adapter.getWidth();
        };
        /**
         * Styles the label to produce a shake animation to indicate an error.
         * @param shouldShake If true, adds the shake CSS class; otherwise, removes shake class.
         */
        MDCFloatingLabelFoundation.prototype.shake = function (shouldShake) {
            var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
            if (shouldShake) {
                this.adapter.addClass(LABEL_SHAKE);
            }
            else {
                this.adapter.removeClass(LABEL_SHAKE);
            }
        };
        /**
         * Styles the label to float or dock.
         * @param shouldFloat If true, adds the float CSS class; otherwise, removes float and shake classes to dock the label.
         */
        MDCFloatingLabelFoundation.prototype.float = function (shouldFloat) {
            var _a = MDCFloatingLabelFoundation.cssClasses, LABEL_FLOAT_ABOVE = _a.LABEL_FLOAT_ABOVE, LABEL_SHAKE = _a.LABEL_SHAKE;
            if (shouldFloat) {
                this.adapter.addClass(LABEL_FLOAT_ABOVE);
            }
            else {
                this.adapter.removeClass(LABEL_FLOAT_ABOVE);
                this.adapter.removeClass(LABEL_SHAKE);
            }
        };
        /**
         * Styles the label as required.
         * @param isRequired If true, adds an asterisk to the label, indicating that it is required.
         */
        MDCFloatingLabelFoundation.prototype.setRequired = function (isRequired) {
            var LABEL_REQUIRED = MDCFloatingLabelFoundation.cssClasses.LABEL_REQUIRED;
            if (isRequired) {
                this.adapter.addClass(LABEL_REQUIRED);
            }
            else {
                this.adapter.removeClass(LABEL_REQUIRED);
            }
        };
        MDCFloatingLabelFoundation.prototype.handleShakeAnimationEnd = function () {
            var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
            this.adapter.removeClass(LABEL_SHAKE);
        };
        return MDCFloatingLabelFoundation;
    }(MDCFoundation));

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
    var cssClasses$a = {
        LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
        LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating',
    };

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
    var MDCLineRippleFoundation = /** @class */ (function (_super) {
        __extends(MDCLineRippleFoundation, _super);
        function MDCLineRippleFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCLineRippleFoundation.defaultAdapter), adapter)) || this;
            _this.transitionEndHandler = function (evt) {
                _this.handleTransitionEnd(evt);
            };
            return _this;
        }
        Object.defineProperty(MDCLineRippleFoundation, "cssClasses", {
            get: function () {
                return cssClasses$a;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCLineRippleFoundation, "defaultAdapter", {
            /**
             * See {@link MDCLineRippleAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    setStyle: function () { return undefined; },
                    registerEventHandler: function () { return undefined; },
                    deregisterEventHandler: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: false,
            configurable: true
        });
        MDCLineRippleFoundation.prototype.init = function () {
            this.adapter.registerEventHandler('transitionend', this.transitionEndHandler);
        };
        MDCLineRippleFoundation.prototype.destroy = function () {
            this.adapter.deregisterEventHandler('transitionend', this.transitionEndHandler);
        };
        MDCLineRippleFoundation.prototype.activate = function () {
            this.adapter.removeClass(cssClasses$a.LINE_RIPPLE_DEACTIVATING);
            this.adapter.addClass(cssClasses$a.LINE_RIPPLE_ACTIVE);
        };
        MDCLineRippleFoundation.prototype.setRippleCenter = function (xCoordinate) {
            this.adapter.setStyle('transform-origin', xCoordinate + "px center");
        };
        MDCLineRippleFoundation.prototype.deactivate = function () {
            this.adapter.addClass(cssClasses$a.LINE_RIPPLE_DEACTIVATING);
        };
        MDCLineRippleFoundation.prototype.handleTransitionEnd = function (evt) {
            // Wait for the line ripple to be either transparent or opaque
            // before emitting the animation end event
            var isDeactivating = this.adapter.hasClass(cssClasses$a.LINE_RIPPLE_DEACTIVATING);
            if (evt.propertyName === 'opacity') {
                if (isDeactivating) {
                    this.adapter.removeClass(cssClasses$a.LINE_RIPPLE_ACTIVE);
                    this.adapter.removeClass(cssClasses$a.LINE_RIPPLE_DEACTIVATING);
                }
            }
        };
        return MDCLineRippleFoundation;
    }(MDCFoundation));

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
    var strings$9 = {
        NOTCH_ELEMENT_SELECTOR: '.mdc-notched-outline__notch',
    };
    var numbers$6 = {
        // This should stay in sync with $mdc-notched-outline-padding * 2.
        NOTCH_ELEMENT_PADDING: 8,
    };
    var cssClasses$9 = {
        NO_LABEL: 'mdc-notched-outline--no-label',
        OUTLINE_NOTCHED: 'mdc-notched-outline--notched',
        OUTLINE_UPGRADED: 'mdc-notched-outline--upgraded',
    };

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
     */
    var MDCNotchedOutlineFoundation = /** @class */ (function (_super) {
        __extends(MDCNotchedOutlineFoundation, _super);
        function MDCNotchedOutlineFoundation(adapter) {
            return _super.call(this, __assign(__assign({}, MDCNotchedOutlineFoundation.defaultAdapter), adapter)) || this;
        }
        Object.defineProperty(MDCNotchedOutlineFoundation, "strings", {
            get: function () {
                return strings$9;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCNotchedOutlineFoundation, "cssClasses", {
            get: function () {
                return cssClasses$9;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCNotchedOutlineFoundation, "numbers", {
            get: function () {
                return numbers$6;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCNotchedOutlineFoundation, "defaultAdapter", {
            /**
             * See {@link MDCNotchedOutlineAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    setNotchWidthProperty: function () { return undefined; },
                    removeNotchWidthProperty: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Adds the outline notched selector and updates the notch width calculated based off of notchWidth.
         */
        MDCNotchedOutlineFoundation.prototype.notch = function (notchWidth) {
            var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
            if (notchWidth > 0) {
                notchWidth += numbers$6.NOTCH_ELEMENT_PADDING; // Add padding from left/right.
            }
            this.adapter.setNotchWidthProperty(notchWidth);
            this.adapter.addClass(OUTLINE_NOTCHED);
        };
        /**
         * Removes notched outline selector to close the notch in the outline.
         */
        MDCNotchedOutlineFoundation.prototype.closeNotch = function () {
            var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
            this.adapter.removeClass(OUTLINE_NOTCHED);
            this.adapter.removeNotchWidthProperty();
        };
        return MDCNotchedOutlineFoundation;
    }(MDCFoundation));

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
    var strings$8 = {
        ARIA_CONTROLS: 'aria-controls',
        ARIA_DESCRIBEDBY: 'aria-describedby',
        INPUT_SELECTOR: '.mdc-text-field__input',
        LABEL_SELECTOR: '.mdc-floating-label',
        LEADING_ICON_SELECTOR: '.mdc-text-field__icon--leading',
        LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
        OUTLINE_SELECTOR: '.mdc-notched-outline',
        PREFIX_SELECTOR: '.mdc-text-field__affix--prefix',
        SUFFIX_SELECTOR: '.mdc-text-field__affix--suffix',
        TRAILING_ICON_SELECTOR: '.mdc-text-field__icon--trailing'
    };
    var cssClasses$8 = {
        DISABLED: 'mdc-text-field--disabled',
        FOCUSED: 'mdc-text-field--focused',
        HELPER_LINE: 'mdc-text-field-helper-line',
        INVALID: 'mdc-text-field--invalid',
        LABEL_FLOATING: 'mdc-text-field--label-floating',
        NO_LABEL: 'mdc-text-field--no-label',
        OUTLINED: 'mdc-text-field--outlined',
        ROOT: 'mdc-text-field',
        TEXTAREA: 'mdc-text-field--textarea',
        WITH_LEADING_ICON: 'mdc-text-field--with-leading-icon',
        WITH_TRAILING_ICON: 'mdc-text-field--with-trailing-icon',
        WITH_INTERNAL_COUNTER: 'mdc-text-field--with-internal-counter',
    };
    var numbers$5 = {
        LABEL_SCALE: 0.75,
    };
    /**
     * Whitelist based off of
     * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
     * under the "Validation-related attributes" section.
     */
    var VALIDATION_ATTR_WHITELIST = [
        'pattern',
        'min',
        'max',
        'required',
        'step',
        'minlength',
        'maxlength',
    ];
    /**
     * Label should always float for these types as they show some UI even if value
     * is empty.
     */
    var ALWAYS_FLOAT_TYPES = [
        'color',
        'date',
        'datetime-local',
        'month',
        'range',
        'time',
        'week',
    ];

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
    var POINTERDOWN_EVENTS = ['mousedown', 'touchstart'];
    var INTERACTION_EVENTS = ['click', 'keydown'];
    var MDCTextFieldFoundation = /** @class */ (function (_super) {
        __extends(MDCTextFieldFoundation, _super);
        /**
         * @param adapter
         * @param foundationMap Map from subcomponent names to their subfoundations.
         */
        function MDCTextFieldFoundation(adapter, foundationMap) {
            if (foundationMap === void 0) { foundationMap = {}; }
            var _this = _super.call(this, __assign(__assign({}, MDCTextFieldFoundation.defaultAdapter), adapter)) || this;
            _this.isFocused = false;
            _this.receivedUserInput = false;
            _this.valid = true;
            _this.useNativeValidation = true;
            _this.validateOnValueChange = true;
            _this.helperText = foundationMap.helperText;
            _this.characterCounter = foundationMap.characterCounter;
            _this.leadingIcon = foundationMap.leadingIcon;
            _this.trailingIcon = foundationMap.trailingIcon;
            _this.inputFocusHandler = function () {
                _this.activateFocus();
            };
            _this.inputBlurHandler = function () {
                _this.deactivateFocus();
            };
            _this.inputInputHandler = function () {
                _this.handleInput();
            };
            _this.setPointerXOffset = function (evt) {
                _this.setTransformOrigin(evt);
            };
            _this.textFieldInteractionHandler = function () {
                _this.handleTextFieldInteraction();
            };
            _this.validationAttributeChangeHandler = function (attributesList) {
                _this.handleValidationAttributeChange(attributesList);
            };
            return _this;
        }
        Object.defineProperty(MDCTextFieldFoundation, "cssClasses", {
            get: function () {
                return cssClasses$8;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldFoundation, "strings", {
            get: function () {
                return strings$8;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldFoundation, "numbers", {
            get: function () {
                return numbers$5;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldAlwaysFloat", {
            get: function () {
                var type = this.getNativeInput().type;
                return ALWAYS_FLOAT_TYPES.indexOf(type) >= 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldFloat", {
            get: function () {
                return this.shouldAlwaysFloat || this.isFocused || !!this.getValue() ||
                    this.isBadInput();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldShake", {
            get: function () {
                return !this.isFocused && !this.isValid() && !!this.getValue();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCTextFieldFoundation, "defaultAdapter", {
            /**
             * See {@link MDCTextFieldAdapter} for typing information on parameters and
             * return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return true; },
                    setInputAttr: function () { return undefined; },
                    removeInputAttr: function () { return undefined; },
                    registerTextFieldInteractionHandler: function () { return undefined; },
                    deregisterTextFieldInteractionHandler: function () { return undefined; },
                    registerInputInteractionHandler: function () { return undefined; },
                    deregisterInputInteractionHandler: function () { return undefined; },
                    registerValidationAttributeChangeHandler: function () {
                        return new MutationObserver(function () { return undefined; });
                    },
                    deregisterValidationAttributeChangeHandler: function () { return undefined; },
                    getNativeInput: function () { return null; },
                    isFocused: function () { return false; },
                    activateLineRipple: function () { return undefined; },
                    deactivateLineRipple: function () { return undefined; },
                    setLineRippleTransformOrigin: function () { return undefined; },
                    shakeLabel: function () { return undefined; },
                    floatLabel: function () { return undefined; },
                    setLabelRequired: function () { return undefined; },
                    hasLabel: function () { return false; },
                    getLabelWidth: function () { return 0; },
                    hasOutline: function () { return false; },
                    notchOutline: function () { return undefined; },
                    closeOutline: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: false,
            configurable: true
        });
        MDCTextFieldFoundation.prototype.init = function () {
            var e_1, _a, e_2, _b;
            if (this.adapter.hasLabel() && this.getNativeInput().required) {
                this.adapter.setLabelRequired(true);
            }
            if (this.adapter.isFocused()) {
                this.inputFocusHandler();
            }
            else if (this.adapter.hasLabel() && this.shouldFloat) {
                this.notchOutline(true);
                this.adapter.floatLabel(true);
                this.styleFloating(true);
            }
            this.adapter.registerInputInteractionHandler('focus', this.inputFocusHandler);
            this.adapter.registerInputInteractionHandler('blur', this.inputBlurHandler);
            this.adapter.registerInputInteractionHandler('input', this.inputInputHandler);
            try {
                for (var POINTERDOWN_EVENTS_1 = __values(POINTERDOWN_EVENTS), POINTERDOWN_EVENTS_1_1 = POINTERDOWN_EVENTS_1.next(); !POINTERDOWN_EVENTS_1_1.done; POINTERDOWN_EVENTS_1_1 = POINTERDOWN_EVENTS_1.next()) {
                    var evtType = POINTERDOWN_EVENTS_1_1.value;
                    this.adapter.registerInputInteractionHandler(evtType, this.setPointerXOffset);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (POINTERDOWN_EVENTS_1_1 && !POINTERDOWN_EVENTS_1_1.done && (_a = POINTERDOWN_EVENTS_1.return)) _a.call(POINTERDOWN_EVENTS_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var INTERACTION_EVENTS_1 = __values(INTERACTION_EVENTS), INTERACTION_EVENTS_1_1 = INTERACTION_EVENTS_1.next(); !INTERACTION_EVENTS_1_1.done; INTERACTION_EVENTS_1_1 = INTERACTION_EVENTS_1.next()) {
                    var evtType = INTERACTION_EVENTS_1_1.value;
                    this.adapter.registerTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (INTERACTION_EVENTS_1_1 && !INTERACTION_EVENTS_1_1.done && (_b = INTERACTION_EVENTS_1.return)) _b.call(INTERACTION_EVENTS_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this.validationObserver =
                this.adapter.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler);
            this.setcharacterCounter(this.getValue().length);
        };
        MDCTextFieldFoundation.prototype.destroy = function () {
            var e_3, _a, e_4, _b;
            this.adapter.deregisterInputInteractionHandler('focus', this.inputFocusHandler);
            this.adapter.deregisterInputInteractionHandler('blur', this.inputBlurHandler);
            this.adapter.deregisterInputInteractionHandler('input', this.inputInputHandler);
            try {
                for (var POINTERDOWN_EVENTS_2 = __values(POINTERDOWN_EVENTS), POINTERDOWN_EVENTS_2_1 = POINTERDOWN_EVENTS_2.next(); !POINTERDOWN_EVENTS_2_1.done; POINTERDOWN_EVENTS_2_1 = POINTERDOWN_EVENTS_2.next()) {
                    var evtType = POINTERDOWN_EVENTS_2_1.value;
                    this.adapter.deregisterInputInteractionHandler(evtType, this.setPointerXOffset);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (POINTERDOWN_EVENTS_2_1 && !POINTERDOWN_EVENTS_2_1.done && (_a = POINTERDOWN_EVENTS_2.return)) _a.call(POINTERDOWN_EVENTS_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            try {
                for (var INTERACTION_EVENTS_2 = __values(INTERACTION_EVENTS), INTERACTION_EVENTS_2_1 = INTERACTION_EVENTS_2.next(); !INTERACTION_EVENTS_2_1.done; INTERACTION_EVENTS_2_1 = INTERACTION_EVENTS_2.next()) {
                    var evtType = INTERACTION_EVENTS_2_1.value;
                    this.adapter.deregisterTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (INTERACTION_EVENTS_2_1 && !INTERACTION_EVENTS_2_1.done && (_b = INTERACTION_EVENTS_2.return)) _b.call(INTERACTION_EVENTS_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
            this.adapter.deregisterValidationAttributeChangeHandler(this.validationObserver);
        };
        /**
         * Handles user interactions with the Text Field.
         */
        MDCTextFieldFoundation.prototype.handleTextFieldInteraction = function () {
            var nativeInput = this.adapter.getNativeInput();
            if (nativeInput && nativeInput.disabled) {
                return;
            }
            this.receivedUserInput = true;
        };
        /**
         * Handles validation attribute changes
         */
        MDCTextFieldFoundation.prototype.handleValidationAttributeChange = function (attributesList) {
            var _this = this;
            attributesList.some(function (attributeName) {
                if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
                    _this.styleValidity(true);
                    _this.adapter.setLabelRequired(_this.getNativeInput().required);
                    return true;
                }
                return false;
            });
            if (attributesList.indexOf('maxlength') > -1) {
                this.setcharacterCounter(this.getValue().length);
            }
        };
        /**
         * Opens/closes the notched outline.
         */
        MDCTextFieldFoundation.prototype.notchOutline = function (openNotch) {
            if (!this.adapter.hasOutline() || !this.adapter.hasLabel()) {
                return;
            }
            if (openNotch) {
                var labelWidth = this.adapter.getLabelWidth() * numbers$5.LABEL_SCALE;
                this.adapter.notchOutline(labelWidth);
            }
            else {
                this.adapter.closeOutline();
            }
        };
        /**
         * Activates the text field focus state.
         */
        MDCTextFieldFoundation.prototype.activateFocus = function () {
            this.isFocused = true;
            this.styleFocused(this.isFocused);
            this.adapter.activateLineRipple();
            if (this.adapter.hasLabel()) {
                this.notchOutline(this.shouldFloat);
                this.adapter.floatLabel(this.shouldFloat);
                this.styleFloating(this.shouldFloat);
                this.adapter.shakeLabel(this.shouldShake);
            }
            if (this.helperText &&
                (this.helperText.isPersistent() || !this.helperText.isValidation() ||
                    !this.valid)) {
                this.helperText.showToScreenReader();
            }
        };
        /**
         * Sets the line ripple's transform origin, so that the line ripple activate
         * animation will animate out from the user's click location.
         */
        MDCTextFieldFoundation.prototype.setTransformOrigin = function (evt) {
            if (this.isDisabled() || this.adapter.hasOutline()) {
                return;
            }
            var touches = evt.touches;
            var targetEvent = touches ? touches[0] : evt;
            var targetClientRect = targetEvent.target.getBoundingClientRect();
            var normalizedX = targetEvent.clientX - targetClientRect.left;
            this.adapter.setLineRippleTransformOrigin(normalizedX);
        };
        /**
         * Handles input change of text input and text area.
         */
        MDCTextFieldFoundation.prototype.handleInput = function () {
            this.autoCompleteFocus();
            this.setcharacterCounter(this.getValue().length);
        };
        /**
         * Activates the Text Field's focus state in cases when the input value
         * changes without user input (e.g. programmatically).
         */
        MDCTextFieldFoundation.prototype.autoCompleteFocus = function () {
            if (!this.receivedUserInput) {
                this.activateFocus();
            }
        };
        /**
         * Deactivates the Text Field's focus state.
         */
        MDCTextFieldFoundation.prototype.deactivateFocus = function () {
            this.isFocused = false;
            this.adapter.deactivateLineRipple();
            var isValid = this.isValid();
            this.styleValidity(isValid);
            this.styleFocused(this.isFocused);
            if (this.adapter.hasLabel()) {
                this.notchOutline(this.shouldFloat);
                this.adapter.floatLabel(this.shouldFloat);
                this.styleFloating(this.shouldFloat);
                this.adapter.shakeLabel(this.shouldShake);
            }
            if (!this.shouldFloat) {
                this.receivedUserInput = false;
            }
        };
        MDCTextFieldFoundation.prototype.getValue = function () {
            return this.getNativeInput().value;
        };
        /**
         * @param value The value to set on the input Element.
         */
        MDCTextFieldFoundation.prototype.setValue = function (value) {
            // Prevent Safari from moving the caret to the end of the input when the
            // value has not changed.
            if (this.getValue() !== value) {
                this.getNativeInput().value = value;
            }
            this.setcharacterCounter(value.length);
            if (this.validateOnValueChange) {
                var isValid = this.isValid();
                this.styleValidity(isValid);
            }
            if (this.adapter.hasLabel()) {
                this.notchOutline(this.shouldFloat);
                this.adapter.floatLabel(this.shouldFloat);
                this.styleFloating(this.shouldFloat);
                if (this.validateOnValueChange) {
                    this.adapter.shakeLabel(this.shouldShake);
                }
            }
        };
        /**
         * @return The custom validity state, if set; otherwise, the result of a
         *     native validity check.
         */
        MDCTextFieldFoundation.prototype.isValid = function () {
            return this.useNativeValidation ? this.isNativeInputValid() : this.valid;
        };
        /**
         * @param isValid Sets the custom validity state of the Text Field.
         */
        MDCTextFieldFoundation.prototype.setValid = function (isValid) {
            this.valid = isValid;
            this.styleValidity(isValid);
            var shouldShake = !isValid && !this.isFocused && !!this.getValue();
            if (this.adapter.hasLabel()) {
                this.adapter.shakeLabel(shouldShake);
            }
        };
        /**
         * @param shouldValidate Whether or not validity should be updated on
         *     value change.
         */
        MDCTextFieldFoundation.prototype.setValidateOnValueChange = function (shouldValidate) {
            this.validateOnValueChange = shouldValidate;
        };
        /**
         * @return Whether or not validity should be updated on value change. `true`
         *     by default.
         */
        MDCTextFieldFoundation.prototype.getValidateOnValueChange = function () {
            return this.validateOnValueChange;
        };
        /**
         * Enables or disables the use of native validation. Use this for custom
         * validation.
         * @param useNativeValidation Set this to false to ignore native input
         *     validation.
         */
        MDCTextFieldFoundation.prototype.setUseNativeValidation = function (useNativeValidation) {
            this.useNativeValidation = useNativeValidation;
        };
        MDCTextFieldFoundation.prototype.isDisabled = function () {
            return this.getNativeInput().disabled;
        };
        /**
         * @param disabled Sets the text-field disabled or enabled.
         */
        MDCTextFieldFoundation.prototype.setDisabled = function (disabled) {
            this.getNativeInput().disabled = disabled;
            this.styleDisabled(disabled);
        };
        /**
         * @param content Sets the content of the helper text.
         */
        MDCTextFieldFoundation.prototype.setHelperTextContent = function (content) {
            if (this.helperText) {
                this.helperText.setContent(content);
            }
        };
        /**
         * Sets the aria label of the leading icon.
         */
        MDCTextFieldFoundation.prototype.setLeadingIconAriaLabel = function (label) {
            if (this.leadingIcon) {
                this.leadingIcon.setAriaLabel(label);
            }
        };
        /**
         * Sets the text content of the leading icon.
         */
        MDCTextFieldFoundation.prototype.setLeadingIconContent = function (content) {
            if (this.leadingIcon) {
                this.leadingIcon.setContent(content);
            }
        };
        /**
         * Sets the aria label of the trailing icon.
         */
        MDCTextFieldFoundation.prototype.setTrailingIconAriaLabel = function (label) {
            if (this.trailingIcon) {
                this.trailingIcon.setAriaLabel(label);
            }
        };
        /**
         * Sets the text content of the trailing icon.
         */
        MDCTextFieldFoundation.prototype.setTrailingIconContent = function (content) {
            if (this.trailingIcon) {
                this.trailingIcon.setContent(content);
            }
        };
        /**
         * Sets character counter values that shows characters used and the total
         * character limit.
         */
        MDCTextFieldFoundation.prototype.setcharacterCounter = function (currentLength) {
            if (!this.characterCounter) {
                return;
            }
            var maxLength = this.getNativeInput().maxLength;
            if (maxLength === -1) {
                throw new Error('MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.');
            }
            this.characterCounter.setCounterValue(currentLength, maxLength);
        };
        /**
         * @return True if the Text Field input fails in converting the user-supplied
         *     value.
         */
        MDCTextFieldFoundation.prototype.isBadInput = function () {
            // The badInput property is not supported in IE 11 💩.
            return this.getNativeInput().validity.badInput || false;
        };
        /**
         * @return The result of native validity checking (ValidityState.valid).
         */
        MDCTextFieldFoundation.prototype.isNativeInputValid = function () {
            return this.getNativeInput().validity.valid;
        };
        /**
         * Styles the component based on the validity state.
         */
        MDCTextFieldFoundation.prototype.styleValidity = function (isValid) {
            var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;
            if (isValid) {
                this.adapter.removeClass(INVALID);
            }
            else {
                this.adapter.addClass(INVALID);
            }
            if (this.helperText) {
                this.helperText.setValidity(isValid);
                // We dynamically set or unset aria-describedby for validation helper text
                // only, based on whether the field is valid
                var helperTextValidation = this.helperText.isValidation();
                if (!helperTextValidation) {
                    return;
                }
                var helperTextVisible = this.helperText.isVisible();
                var helperTextId = this.helperText.getId();
                if (helperTextVisible && helperTextId) {
                    this.adapter.setInputAttr(strings$8.ARIA_DESCRIBEDBY, helperTextId);
                }
                else {
                    this.adapter.removeInputAttr(strings$8.ARIA_DESCRIBEDBY);
                }
            }
        };
        /**
         * Styles the component based on the focused state.
         */
        MDCTextFieldFoundation.prototype.styleFocused = function (isFocused) {
            var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;
            if (isFocused) {
                this.adapter.addClass(FOCUSED);
            }
            else {
                this.adapter.removeClass(FOCUSED);
            }
        };
        /**
         * Styles the component based on the disabled state.
         */
        MDCTextFieldFoundation.prototype.styleDisabled = function (isDisabled) {
            var _a = MDCTextFieldFoundation.cssClasses, DISABLED = _a.DISABLED, INVALID = _a.INVALID;
            if (isDisabled) {
                this.adapter.addClass(DISABLED);
                this.adapter.removeClass(INVALID);
            }
            else {
                this.adapter.removeClass(DISABLED);
            }
            if (this.leadingIcon) {
                this.leadingIcon.setDisabled(isDisabled);
            }
            if (this.trailingIcon) {
                this.trailingIcon.setDisabled(isDisabled);
            }
        };
        /**
         * Styles the component based on the label floating state.
         */
        MDCTextFieldFoundation.prototype.styleFloating = function (isFloating) {
            var LABEL_FLOATING = MDCTextFieldFoundation.cssClasses.LABEL_FLOATING;
            if (isFloating) {
                this.adapter.addClass(LABEL_FLOATING);
            }
            else {
                this.adapter.removeClass(LABEL_FLOATING);
            }
        };
        /**
         * @return The native text input element from the host environment, or an
         *     object with the same shape for unit tests.
         */
        MDCTextFieldFoundation.prototype.getNativeInput = function () {
            // this.adapter may be undefined in foundation unit tests. This happens when
            // testdouble is creating a mock object and invokes the
            // shouldShake/shouldFloat getters (which in turn call getValue(), which
            // calls this method) before init() has been called from the MDCTextField
            // constructor. To work around that issue, we return a dummy object.
            var nativeInput = this.adapter ? this.adapter.getNativeInput() : null;
            return nativeInput || {
                disabled: false,
                maxLength: -1,
                required: false,
                type: 'input',
                validity: {
                    badInput: false,
                    valid: true,
                },
                value: '',
            };
        };
        return MDCTextFieldFoundation;
    }(MDCFoundation));

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
    var FOCUS_SENTINEL_CLASS = 'mdc-dom-focus-sentinel';
    /**
     * Utility to trap focus in a given root element, e.g. for modal components such
     * as dialogs. The root should have at least one focusable child element,
     * for setting initial focus when trapping focus.
     * Also tracks the previously focused element, and restores focus to that
     * element when releasing focus.
     */
    var FocusTrap = /** @class */ (function () {
        function FocusTrap(root, options) {
            if (options === void 0) { options = {}; }
            this.root = root;
            this.options = options;
            // Previously focused element before trapping focus.
            this.elFocusedBeforeTrapFocus = null;
        }
        /**
         * Traps focus in `root`. Also focuses on either `initialFocusEl` if set;
         * otherwises sets initial focus to the first focusable child element.
         */
        FocusTrap.prototype.trapFocus = function () {
            var focusableEls = this.getFocusableElements(this.root);
            if (focusableEls.length === 0) {
                throw new Error('FocusTrap: Element must have at least one focusable child.');
            }
            this.elFocusedBeforeTrapFocus =
                document.activeElement instanceof HTMLElement ? document.activeElement :
                    null;
            this.wrapTabFocus(this.root);
            if (!this.options.skipInitialFocus) {
                this.focusInitialElement(focusableEls, this.options.initialFocusEl);
            }
        };
        /**
         * Releases focus from `root`. Also restores focus to the previously focused
         * element.
         */
        FocusTrap.prototype.releaseFocus = function () {
            [].slice.call(this.root.querySelectorAll("." + FOCUS_SENTINEL_CLASS))
                .forEach(function (sentinelEl) {
                sentinelEl.parentElement.removeChild(sentinelEl);
            });
            if (!this.options.skipRestoreFocus && this.elFocusedBeforeTrapFocus) {
                this.elFocusedBeforeTrapFocus.focus();
            }
        };
        /**
         * Wraps tab focus within `el` by adding two hidden sentinel divs which are
         * used to mark the beginning and the end of the tabbable region. When
         * focused, these sentinel elements redirect focus to the first/last
         * children elements of the tabbable region, ensuring that focus is trapped
         * within that region.
         */
        FocusTrap.prototype.wrapTabFocus = function (el) {
            var _this = this;
            var sentinelStart = this.createSentinel();
            var sentinelEnd = this.createSentinel();
            sentinelStart.addEventListener('focus', function () {
                var focusableEls = _this.getFocusableElements(el);
                if (focusableEls.length > 0) {
                    focusableEls[focusableEls.length - 1].focus();
                }
            });
            sentinelEnd.addEventListener('focus', function () {
                var focusableEls = _this.getFocusableElements(el);
                if (focusableEls.length > 0) {
                    focusableEls[0].focus();
                }
            });
            el.insertBefore(sentinelStart, el.children[0]);
            el.appendChild(sentinelEnd);
        };
        /**
         * Focuses on `initialFocusEl` if defined and a child of the root element.
         * Otherwise, focuses on the first focusable child element of the root.
         */
        FocusTrap.prototype.focusInitialElement = function (focusableEls, initialFocusEl) {
            var focusIndex = 0;
            if (initialFocusEl) {
                focusIndex = Math.max(focusableEls.indexOf(initialFocusEl), 0);
            }
            focusableEls[focusIndex].focus();
        };
        FocusTrap.prototype.getFocusableElements = function (root) {
            var focusableEls = [].slice.call(root.querySelectorAll('[autofocus], [tabindex], a, input, textarea, select, button'));
            return focusableEls.filter(function (el) {
                var isDisabledOrHidden = el.getAttribute('aria-disabled') === 'true' ||
                    el.getAttribute('disabled') != null ||
                    el.getAttribute('hidden') != null ||
                    el.getAttribute('aria-hidden') === 'true';
                var isTabbableAndVisible = el.tabIndex >= 0 &&
                    el.getBoundingClientRect().width > 0 &&
                    !el.classList.contains(FOCUS_SENTINEL_CLASS) && !isDisabledOrHidden;
                var isProgrammaticallyHidden = false;
                if (isTabbableAndVisible) {
                    var style = getComputedStyle(el);
                    isProgrammaticallyHidden =
                        style.display === 'none' || style.visibility === 'hidden';
                }
                return isTabbableAndVisible && !isProgrammaticallyHidden;
            });
        };
        FocusTrap.prototype.createSentinel = function () {
            var sentinel = document.createElement('div');
            sentinel.setAttribute('tabindex', '0');
            // Don't announce in screen readers.
            sentinel.setAttribute('aria-hidden', 'true');
            sentinel.classList.add(FOCUS_SENTINEL_CLASS);
            return sentinel;
        };
        return FocusTrap;
    }());

    var domFocusTrap = /*#__PURE__*/Object.freeze({
        __proto__: null,
        FocusTrap: FocusTrap
    });

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
    /**
     * KEY provides normalized string values for keys.
     */
    var KEY = {
        UNKNOWN: 'Unknown',
        BACKSPACE: 'Backspace',
        ENTER: 'Enter',
        SPACEBAR: 'Spacebar',
        PAGE_UP: 'PageUp',
        PAGE_DOWN: 'PageDown',
        END: 'End',
        HOME: 'Home',
        ARROW_LEFT: 'ArrowLeft',
        ARROW_UP: 'ArrowUp',
        ARROW_RIGHT: 'ArrowRight',
        ARROW_DOWN: 'ArrowDown',
        DELETE: 'Delete',
        ESCAPE: 'Escape',
        TAB: 'Tab',
    };
    var normalizedKeys = new Set();
    // IE11 has no support for new Map with iterable so we need to initialize this
    // by hand.
    normalizedKeys.add(KEY.BACKSPACE);
    normalizedKeys.add(KEY.ENTER);
    normalizedKeys.add(KEY.SPACEBAR);
    normalizedKeys.add(KEY.PAGE_UP);
    normalizedKeys.add(KEY.PAGE_DOWN);
    normalizedKeys.add(KEY.END);
    normalizedKeys.add(KEY.HOME);
    normalizedKeys.add(KEY.ARROW_LEFT);
    normalizedKeys.add(KEY.ARROW_UP);
    normalizedKeys.add(KEY.ARROW_RIGHT);
    normalizedKeys.add(KEY.ARROW_DOWN);
    normalizedKeys.add(KEY.DELETE);
    normalizedKeys.add(KEY.ESCAPE);
    normalizedKeys.add(KEY.TAB);
    var KEY_CODE = {
        BACKSPACE: 8,
        ENTER: 13,
        SPACEBAR: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        DELETE: 46,
        ESCAPE: 27,
        TAB: 9,
    };
    var mappedKeyCodes = new Map();
    // IE11 has no support for new Map with iterable so we need to initialize this
    // by hand.
    mappedKeyCodes.set(KEY_CODE.BACKSPACE, KEY.BACKSPACE);
    mappedKeyCodes.set(KEY_CODE.ENTER, KEY.ENTER);
    mappedKeyCodes.set(KEY_CODE.SPACEBAR, KEY.SPACEBAR);
    mappedKeyCodes.set(KEY_CODE.PAGE_UP, KEY.PAGE_UP);
    mappedKeyCodes.set(KEY_CODE.PAGE_DOWN, KEY.PAGE_DOWN);
    mappedKeyCodes.set(KEY_CODE.END, KEY.END);
    mappedKeyCodes.set(KEY_CODE.HOME, KEY.HOME);
    mappedKeyCodes.set(KEY_CODE.ARROW_LEFT, KEY.ARROW_LEFT);
    mappedKeyCodes.set(KEY_CODE.ARROW_UP, KEY.ARROW_UP);
    mappedKeyCodes.set(KEY_CODE.ARROW_RIGHT, KEY.ARROW_RIGHT);
    mappedKeyCodes.set(KEY_CODE.ARROW_DOWN, KEY.ARROW_DOWN);
    mappedKeyCodes.set(KEY_CODE.DELETE, KEY.DELETE);
    mappedKeyCodes.set(KEY_CODE.ESCAPE, KEY.ESCAPE);
    mappedKeyCodes.set(KEY_CODE.TAB, KEY.TAB);
    var navigationKeys = new Set();
    // IE11 has no support for new Set with iterable so we need to initialize this
    // by hand.
    navigationKeys.add(KEY.PAGE_UP);
    navigationKeys.add(KEY.PAGE_DOWN);
    navigationKeys.add(KEY.END);
    navigationKeys.add(KEY.HOME);
    navigationKeys.add(KEY.ARROW_LEFT);
    navigationKeys.add(KEY.ARROW_UP);
    navigationKeys.add(KEY.ARROW_RIGHT);
    navigationKeys.add(KEY.ARROW_DOWN);
    /**
     * normalizeKey returns the normalized string for a navigational action.
     */
    function normalizeKey(evt) {
        var key = evt.key;
        // If the event already has a normalized key, return it
        if (normalizedKeys.has(key)) {
            return key;
        }
        // tslint:disable-next-line:deprecation
        var mappedKey = mappedKeyCodes.get(evt.keyCode);
        if (mappedKey) {
            return mappedKey;
        }
        return KEY.UNKNOWN;
    }

    /* node_modules/@smui/common/dist/ContextFragment.svelte generated by Svelte v3.49.0 */

    function create_fragment$k(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $storeValue;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContextFragment', slots, ['default']);
    	let { key } = $$props;
    	let { value } = $$props;
    	const storeValue = writable(value);
    	validate_store(storeValue, 'storeValue');
    	component_subscribe($$self, storeValue, value => $$invalidate(5, $storeValue = value));
    	setContext(key, storeValue);

    	onDestroy(() => {
    		storeValue.set(undefined);
    	});

    	const writable_props = ['key', 'value'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContextFragment> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('key' in $$props) $$invalidate(1, key = $$props.key);
    		if ('value' in $$props) $$invalidate(2, value = $$props.value);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		setContext,
    		writable,
    		key,
    		value,
    		storeValue,
    		$storeValue
    	});

    	$$self.$inject_state = $$props => {
    		if ('key' in $$props) $$invalidate(1, key = $$props.key);
    		if ('value' in $$props) $$invalidate(2, value = $$props.value);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*value*/ 4) {
    			set_store_value(storeValue, $storeValue = value, $storeValue);
    		}
    	};

    	return [storeValue, key, value, $$scope, slots];
    }

    class ContextFragment extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$k, safe_not_equal, { key: 1, value: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContextFragment",
    			options,
    			id: create_fragment$k.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*key*/ ctx[1] === undefined && !('key' in props)) {
    			console.warn("<ContextFragment> was created without expected prop 'key'");
    		}

    		if (/*value*/ ctx[2] === undefined && !('value' in props)) {
    			console.warn("<ContextFragment> was created without expected prop 'value'");
    		}
    	}

    	get key() {
    		throw new Error("<ContextFragment>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<ContextFragment>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<ContextFragment>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<ContextFragment>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const { applyPassive } = events;
    const { matches } = ponyfill;
    function Ripple(node, { ripple = true, surface = false, unbounded = false, disabled = false, color, active, rippleElement, eventTarget, activeTarget, addClass = (className) => node.classList.add(className), removeClass = (className) => node.classList.remove(className), addStyle = (name, value) => node.style.setProperty(name, value), initPromise = Promise.resolve(), } = {}) {
        let instance;
        let addLayoutListener = getContext('SMUI:addLayoutListener');
        let removeLayoutListener;
        let oldActive = active;
        let oldEventTarget = eventTarget;
        let oldActiveTarget = activeTarget;
        function handleProps() {
            if (surface) {
                addClass('mdc-ripple-surface');
                if (color === 'primary') {
                    addClass('smui-ripple-surface--primary');
                    removeClass('smui-ripple-surface--secondary');
                }
                else if (color === 'secondary') {
                    removeClass('smui-ripple-surface--primary');
                    addClass('smui-ripple-surface--secondary');
                }
                else {
                    removeClass('smui-ripple-surface--primary');
                    removeClass('smui-ripple-surface--secondary');
                }
            }
            else {
                removeClass('mdc-ripple-surface');
                removeClass('smui-ripple-surface--primary');
                removeClass('smui-ripple-surface--secondary');
            }
            // Handle activation first.
            if (instance && oldActive !== active) {
                oldActive = active;
                if (active) {
                    instance.activate();
                }
                else if (active === false) {
                    instance.deactivate();
                }
            }
            // Then create/destroy an instance.
            if (ripple && !instance) {
                instance = new MDCRippleFoundation({
                    addClass,
                    browserSupportsCssVars: () => supportsCssVariables(window),
                    computeBoundingRect: () => (rippleElement || node).getBoundingClientRect(),
                    containsEventTarget: (target) => node.contains(target),
                    deregisterDocumentInteractionHandler: (evtType, handler) => document.documentElement.removeEventListener(evtType, handler, applyPassive()),
                    deregisterInteractionHandler: (evtType, handler) => (eventTarget || node).removeEventListener(evtType, handler, applyPassive()),
                    deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
                    getWindowPageOffset: () => ({
                        x: window.pageXOffset,
                        y: window.pageYOffset,
                    }),
                    isSurfaceActive: () => active == null ? matches(activeTarget || node, ':active') : active,
                    isSurfaceDisabled: () => !!disabled,
                    isUnbounded: () => !!unbounded,
                    registerDocumentInteractionHandler: (evtType, handler) => document.documentElement.addEventListener(evtType, handler, applyPassive()),
                    registerInteractionHandler: (evtType, handler) => (eventTarget || node).addEventListener(evtType, handler, applyPassive()),
                    registerResizeHandler: (handler) => window.addEventListener('resize', handler),
                    removeClass,
                    updateCssVariable: addStyle,
                });
                initPromise.then(() => {
                    if (instance) {
                        instance.init();
                        instance.setUnbounded(unbounded);
                    }
                });
            }
            else if (instance && !ripple) {
                initPromise.then(() => {
                    if (instance) {
                        instance.destroy();
                        instance = undefined;
                    }
                });
            }
            // Now handle event/active targets
            if (instance &&
                (oldEventTarget !== eventTarget || oldActiveTarget !== activeTarget)) {
                oldEventTarget = eventTarget;
                oldActiveTarget = activeTarget;
                instance.destroy();
                requestAnimationFrame(() => {
                    if (instance) {
                        instance.init();
                        instance.setUnbounded(unbounded);
                    }
                });
            }
            if (!ripple && unbounded) {
                addClass('mdc-ripple-upgraded--unbounded');
            }
        }
        handleProps();
        if (addLayoutListener) {
            removeLayoutListener = addLayoutListener(layout);
        }
        function layout() {
            if (instance) {
                instance.layout();
            }
        }
        return {
            update(props) {
                ({
                    ripple,
                    surface,
                    unbounded,
                    disabled,
                    color,
                    active,
                    rippleElement,
                    eventTarget,
                    activeTarget,
                    addClass,
                    removeClass,
                    addStyle,
                    initPromise,
                } = Object.assign({ ripple: true, surface: false, unbounded: false, disabled: false, color: undefined, active: undefined, rippleElement: undefined, eventTarget: undefined, activeTarget: undefined, addClass: (className) => node.classList.add(className), removeClass: (className) => node.classList.remove(className), addStyle: (name, value) => node.style.setProperty(name, value), initPromise: Promise.resolve() }, props));
                handleProps();
            },
            destroy() {
                if (instance) {
                    instance.destroy();
                    instance = undefined;
                    removeClass('mdc-ripple-surface');
                    removeClass('smui-ripple-surface--primary');
                    removeClass('smui-ripple-surface--secondary');
                }
                if (removeLayoutListener) {
                    removeLayoutListener();
                }
            },
        };
    }

    /* node_modules/@smui/floating-label/dist/FloatingLabel.svelte generated by Svelte v3.49.0 */

    const file$g = "node_modules/@smui/floating-label/dist/FloatingLabel.svelte";

    // (19:0) {:else}
    function create_else_block$3(ctx) {
    	let label;
    	let label_class_value;
    	let label_style_value;
    	let label_for_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[22].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[21], null);

    	let label_levels = [
    		{
    			class: label_class_value = classMap({
    				[/*className*/ ctx[3]]: true,
    				'mdc-floating-label': true,
    				'mdc-floating-label--float-above': /*floatAbove*/ ctx[0],
    				'mdc-floating-label--required': /*required*/ ctx[1],
    				.../*internalClasses*/ ctx[8]
    			})
    		},
    		{
    			style: label_style_value = Object.entries(/*internalStyles*/ ctx[9]).map(func_1$1).concat([/*style*/ ctx[4]]).join(' ')
    		},
    		{
    			for: label_for_value = /*forId*/ ctx[5] || (/*inputProps*/ ctx[11]
    			? /*inputProps*/ ctx[11].id
    			: undefined)
    		},
    		/*$$restProps*/ ctx[12]
    	];

    	let label_data = {};

    	for (let i = 0; i < label_levels.length; i += 1) {
    		label_data = assign(label_data, label_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			label = element("label");
    			if (default_slot) default_slot.c();
    			set_attributes(label, label_data);
    			add_location(label, file$g, 19, 2, 494);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);

    			if (default_slot) {
    				default_slot.m(label, null);
    			}

    			/*label_binding*/ ctx[24](label);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, label, /*use*/ ctx[2])),
    					action_destroyer(/*forwardEvents*/ ctx[10].call(null, label))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2097152)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[21],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[21])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[21], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(label, label_data = get_spread_update(label_levels, [
    				(!current || dirty & /*className, floatAbove, required, internalClasses*/ 267 && label_class_value !== (label_class_value = classMap({
    					[/*className*/ ctx[3]]: true,
    					'mdc-floating-label': true,
    					'mdc-floating-label--float-above': /*floatAbove*/ ctx[0],
    					'mdc-floating-label--required': /*required*/ ctx[1],
    					.../*internalClasses*/ ctx[8]
    				}))) && { class: label_class_value },
    				(!current || dirty & /*internalStyles, style*/ 528 && label_style_value !== (label_style_value = Object.entries(/*internalStyles*/ ctx[9]).map(func_1$1).concat([/*style*/ ctx[4]]).join(' '))) && { style: label_style_value },
    				(!current || dirty & /*forId*/ 32 && label_for_value !== (label_for_value = /*forId*/ ctx[5] || (/*inputProps*/ ctx[11]
    				? /*inputProps*/ ctx[11].id
    				: undefined))) && { for: label_for_value },
    				dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 4) useActions_action.update.call(null, /*use*/ ctx[2]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (default_slot) default_slot.d(detaching);
    			/*label_binding*/ ctx[24](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(19:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (1:0) {#if wrapped}
    function create_if_block$6(ctx) {
    	let span;
    	let span_class_value;
    	let span_style_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[22].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[21], null);

    	let span_levels = [
    		{
    			class: span_class_value = classMap({
    				[/*className*/ ctx[3]]: true,
    				'mdc-floating-label': true,
    				'mdc-floating-label--float-above': /*floatAbove*/ ctx[0],
    				'mdc-floating-label--required': /*required*/ ctx[1],
    				.../*internalClasses*/ ctx[8]
    			})
    		},
    		{
    			style: span_style_value = Object.entries(/*internalStyles*/ ctx[9]).map(func$7).concat([/*style*/ ctx[4]]).join(' ')
    		},
    		/*$$restProps*/ ctx[12]
    	];

    	let span_data = {};

    	for (let i = 0; i < span_levels.length; i += 1) {
    		span_data = assign(span_data, span_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (default_slot) default_slot.c();
    			set_attributes(span, span_data);
    			add_location(span, file$g, 1, 2, 16);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (default_slot) {
    				default_slot.m(span, null);
    			}

    			/*span_binding*/ ctx[23](span);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, span, /*use*/ ctx[2])),
    					action_destroyer(/*forwardEvents*/ ctx[10].call(null, span))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2097152)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[21],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[21])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[21], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(span, span_data = get_spread_update(span_levels, [
    				(!current || dirty & /*className, floatAbove, required, internalClasses*/ 267 && span_class_value !== (span_class_value = classMap({
    					[/*className*/ ctx[3]]: true,
    					'mdc-floating-label': true,
    					'mdc-floating-label--float-above': /*floatAbove*/ ctx[0],
    					'mdc-floating-label--required': /*required*/ ctx[1],
    					.../*internalClasses*/ ctx[8]
    				}))) && { class: span_class_value },
    				(!current || dirty & /*internalStyles, style*/ 528 && span_style_value !== (span_style_value = Object.entries(/*internalStyles*/ ctx[9]).map(func$7).concat([/*style*/ ctx[4]]).join(' '))) && { style: span_style_value },
    				dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 4) useActions_action.update.call(null, /*use*/ ctx[2]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (default_slot) default_slot.d(detaching);
    			/*span_binding*/ ctx[23](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(1:0) {#if wrapped}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$6, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*wrapped*/ ctx[6]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func$7 = ([name, value]) => `${name}: ${value};`;
    const func_1$1 = ([name, value]) => `${name}: ${value};`;

    function instance_1$b($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"use","class","style","for","floatAbove","required","wrapped","shake","float","setRequired","getWidth","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FloatingLabel', slots, ['default']);
    	var _a;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { style = '' } = $$props;
    	let { for: forId = undefined } = $$props;
    	let { floatAbove = false } = $$props;
    	let { required = false } = $$props;
    	let { wrapped = false } = $$props;
    	let element;
    	let instance;
    	let internalClasses = {};
    	let internalStyles = {};

    	let inputProps = (_a = getContext('SMUI:generic:input:props')) !== null && _a !== void 0
    	? _a
    	: {};

    	let previousFloatAbove = floatAbove;
    	let previousRequired = required;

    	onMount(() => {
    		$$invalidate(18, instance = new MDCFloatingLabelFoundation({
    				addClass,
    				removeClass,
    				getWidth: () => {
    					var _a, _b;
    					const el = getElement();
    					const clone = el.cloneNode(true);

    					(_a = el.parentNode) === null || _a === void 0
    					? void 0
    					: _a.appendChild(clone);

    					clone.classList.add('smui-floating-label--remove-transition');
    					clone.classList.add('smui-floating-label--force-size');
    					clone.classList.remove('mdc-floating-label--float-above');
    					const scrollWidth = clone.scrollWidth;

    					(_b = el.parentNode) === null || _b === void 0
    					? void 0
    					: _b.removeChild(clone);

    					return scrollWidth;
    				},
    				registerInteractionHandler: (evtType, handler) => getElement().addEventListener(evtType, handler),
    				deregisterInteractionHandler: (evtType, handler) => getElement().removeEventListener(evtType, handler)
    			}));

    		const accessor = {
    			get element() {
    				return getElement();
    			},
    			addStyle,
    			removeStyle
    		};

    		dispatch(element, 'SMUIFloatingLabel:mount', accessor);
    		instance.init();

    		return () => {
    			dispatch(element, 'SMUIFloatingLabel:unmount', accessor);
    			instance.destroy();
    		};
    	});

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(8, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(8, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function addStyle(name, value) {
    		if (internalStyles[name] != value) {
    			if (value === '' || value == null) {
    				delete internalStyles[name];
    				$$invalidate(9, internalStyles);
    			} else {
    				$$invalidate(9, internalStyles[name] = value, internalStyles);
    			}
    		}
    	}

    	function removeStyle(name) {
    		if (name in internalStyles) {
    			delete internalStyles[name];
    			$$invalidate(9, internalStyles);
    		}
    	}

    	function shake(shouldShake) {
    		instance.shake(shouldShake);
    	}

    	function float(shouldFloat) {
    		$$invalidate(0, floatAbove = shouldFloat);
    	}

    	function setRequired(isRequired) {
    		$$invalidate(1, required = isRequired);
    	}

    	function getWidth() {
    		return instance.getWidth();
    	}

    	function getElement() {
    		return element;
    	}

    	function span_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(7, element);
    		});
    	}

    	function label_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(7, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(2, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('style' in $$new_props) $$invalidate(4, style = $$new_props.style);
    		if ('for' in $$new_props) $$invalidate(5, forId = $$new_props.for);
    		if ('floatAbove' in $$new_props) $$invalidate(0, floatAbove = $$new_props.floatAbove);
    		if ('required' in $$new_props) $$invalidate(1, required = $$new_props.required);
    		if ('wrapped' in $$new_props) $$invalidate(6, wrapped = $$new_props.wrapped);
    		if ('$$scope' in $$new_props) $$invalidate(21, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		_a,
    		MDCFloatingLabelFoundation,
    		onMount,
    		getContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		useActions,
    		dispatch,
    		forwardEvents,
    		use,
    		className,
    		style,
    		forId,
    		floatAbove,
    		required,
    		wrapped,
    		element,
    		instance,
    		internalClasses,
    		internalStyles,
    		inputProps,
    		previousFloatAbove,
    		previousRequired,
    		addClass,
    		removeClass,
    		addStyle,
    		removeStyle,
    		shake,
    		float,
    		setRequired,
    		getWidth,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('_a' in $$props) _a = $$new_props._a;
    		if ('use' in $$props) $$invalidate(2, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('style' in $$props) $$invalidate(4, style = $$new_props.style);
    		if ('forId' in $$props) $$invalidate(5, forId = $$new_props.forId);
    		if ('floatAbove' in $$props) $$invalidate(0, floatAbove = $$new_props.floatAbove);
    		if ('required' in $$props) $$invalidate(1, required = $$new_props.required);
    		if ('wrapped' in $$props) $$invalidate(6, wrapped = $$new_props.wrapped);
    		if ('element' in $$props) $$invalidate(7, element = $$new_props.element);
    		if ('instance' in $$props) $$invalidate(18, instance = $$new_props.instance);
    		if ('internalClasses' in $$props) $$invalidate(8, internalClasses = $$new_props.internalClasses);
    		if ('internalStyles' in $$props) $$invalidate(9, internalStyles = $$new_props.internalStyles);
    		if ('inputProps' in $$props) $$invalidate(11, inputProps = $$new_props.inputProps);
    		if ('previousFloatAbove' in $$props) $$invalidate(19, previousFloatAbove = $$new_props.previousFloatAbove);
    		if ('previousRequired' in $$props) $$invalidate(20, previousRequired = $$new_props.previousRequired);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*instance, previousFloatAbove, floatAbove*/ 786433) {
    			if (instance && previousFloatAbove !== floatAbove) {
    				$$invalidate(19, previousFloatAbove = floatAbove);
    				instance.float(floatAbove);
    			}
    		}

    		if ($$self.$$.dirty & /*instance, previousRequired, required*/ 1310722) {
    			if (instance && previousRequired !== required) {
    				$$invalidate(20, previousRequired = required);
    				instance.setRequired(required);
    			}
    		}
    	};

    	return [
    		floatAbove,
    		required,
    		use,
    		className,
    		style,
    		forId,
    		wrapped,
    		element,
    		internalClasses,
    		internalStyles,
    		forwardEvents,
    		inputProps,
    		$$restProps,
    		shake,
    		float,
    		setRequired,
    		getWidth,
    		getElement,
    		instance,
    		previousFloatAbove,
    		previousRequired,
    		$$scope,
    		slots,
    		span_binding,
    		label_binding
    	];
    }

    class FloatingLabel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance_1$b, create_fragment$j, safe_not_equal, {
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
    			getElement: 17
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FloatingLabel",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get use() {
    		throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get for() {
    		throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set for(value) {
    		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get floatAbove() {
    		throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set floatAbove(value) {
    		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get wrapped() {
    		throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set wrapped(value) {
    		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get shake() {
    		return this.$$.ctx[13];
    	}

    	set shake(value) {
    		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get float() {
    		return this.$$.ctx[14];
    	}

    	set float(value) {
    		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setRequired() {
    		return this.$$.ctx[15];
    	}

    	set setRequired(value) {
    		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getWidth() {
    		return this.$$.ctx[16];
    	}

    	set getWidth(value) {
    		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[17];
    	}

    	set getElement(value) {
    		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/line-ripple/dist/LineRipple.svelte generated by Svelte v3.49.0 */
    const file$f = "node_modules/@smui/line-ripple/dist/LineRipple.svelte";

    function create_fragment$i(ctx) {
    	let div;
    	let div_class_value;
    	let div_style_value;
    	let useActions_action;
    	let mounted;
    	let dispose;

    	let div_levels = [
    		{
    			class: div_class_value = classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-line-ripple': true,
    				'mdc-line-ripple--active': /*active*/ ctx[3],
    				.../*internalClasses*/ ctx[5]
    			})
    		},
    		{
    			style: div_style_value = Object.entries(/*internalStyles*/ ctx[6]).map(func$6).concat([/*style*/ ctx[2]]).join(' ')
    		},
    		/*$$restProps*/ ctx[8]
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			set_attributes(div, div_data);
    			add_location(div, file$f, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			/*div_binding*/ ctx[13](div);

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, div, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[7].call(null, div))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty & /*className, active, internalClasses*/ 42 && div_class_value !== (div_class_value = classMap({
    					[/*className*/ ctx[1]]: true,
    					'mdc-line-ripple': true,
    					'mdc-line-ripple--active': /*active*/ ctx[3],
    					.../*internalClasses*/ ctx[5]
    				})) && { class: div_class_value },
    				dirty & /*internalStyles, style*/ 68 && div_style_value !== (div_style_value = Object.entries(/*internalStyles*/ ctx[6]).map(func$6).concat([/*style*/ ctx[2]]).join(' ')) && { style: div_style_value },
    				dirty & /*$$restProps*/ 256 && /*$$restProps*/ ctx[8]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*div_binding*/ ctx[13](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func$6 = ([name, value]) => `${name}: ${value};`;

    function instance_1$a($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"use","class","style","active","activate","deactivate","setRippleCenter","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LineRipple', slots, []);
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { style = '' } = $$props;
    	let { active = false } = $$props;
    	let element;
    	let instance;
    	let internalClasses = {};
    	let internalStyles = {};

    	onMount(() => {
    		instance = new MDCLineRippleFoundation({
    				addClass,
    				removeClass,
    				hasClass,
    				setStyle: addStyle,
    				registerEventHandler: (evtType, handler) => getElement().addEventListener(evtType, handler),
    				deregisterEventHandler: (evtType, handler) => getElement().removeEventListener(evtType, handler)
    			});

    		instance.init();

    		return () => {
    			instance.destroy();
    		};
    	});

    	function hasClass(className) {
    		return className in internalClasses
    		? internalClasses[className]
    		: getElement().classList.contains(className);
    	}

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(5, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(5, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function addStyle(name, value) {
    		if (internalStyles[name] != value) {
    			if (value === '' || value == null) {
    				delete internalStyles[name];
    				$$invalidate(6, internalStyles);
    			} else {
    				$$invalidate(6, internalStyles[name] = value, internalStyles);
    			}
    		}
    	}

    	function activate() {
    		instance.activate();
    	}

    	function deactivate() {
    		instance.deactivate();
    	}

    	function setRippleCenter(xCoordinate) {
    		instance.setRippleCenter(xCoordinate);
    	}

    	function getElement() {
    		return element;
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(4, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('style' in $$new_props) $$invalidate(2, style = $$new_props.style);
    		if ('active' in $$new_props) $$invalidate(3, active = $$new_props.active);
    	};

    	$$self.$capture_state = () => ({
    		MDCLineRippleFoundation,
    		onMount,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		useActions,
    		forwardEvents,
    		use,
    		className,
    		style,
    		active,
    		element,
    		instance,
    		internalClasses,
    		internalStyles,
    		hasClass,
    		addClass,
    		removeClass,
    		addStyle,
    		activate,
    		deactivate,
    		setRippleCenter,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('style' in $$props) $$invalidate(2, style = $$new_props.style);
    		if ('active' in $$props) $$invalidate(3, active = $$new_props.active);
    		if ('element' in $$props) $$invalidate(4, element = $$new_props.element);
    		if ('instance' in $$props) instance = $$new_props.instance;
    		if ('internalClasses' in $$props) $$invalidate(5, internalClasses = $$new_props.internalClasses);
    		if ('internalStyles' in $$props) $$invalidate(6, internalStyles = $$new_props.internalStyles);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		className,
    		style,
    		active,
    		element,
    		internalClasses,
    		internalStyles,
    		forwardEvents,
    		$$restProps,
    		activate,
    		deactivate,
    		setRippleCenter,
    		getElement,
    		div_binding
    	];
    }

    class LineRipple extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance_1$a, create_fragment$i, safe_not_equal, {
    			use: 0,
    			class: 1,
    			style: 2,
    			active: 3,
    			activate: 9,
    			deactivate: 10,
    			setRippleCenter: 11,
    			getElement: 12
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LineRipple",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get use() {
    		throw new Error("<LineRipple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<LineRipple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<LineRipple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<LineRipple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activate() {
    		return this.$$.ctx[9];
    	}

    	set activate(value) {
    		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get deactivate() {
    		return this.$$.ctx[10];
    	}

    	set deactivate(value) {
    		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setRippleCenter() {
    		return this.$$.ctx[11];
    	}

    	set setRippleCenter(value) {
    		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[12];
    	}

    	set getElement(value) {
    		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/notched-outline/dist/NotchedOutline.svelte generated by Svelte v3.49.0 */
    const file$e = "node_modules/@smui/notched-outline/dist/NotchedOutline.svelte";

    // (17:2) {#if !noLabel}
    function create_if_block$5(ctx) {
    	let div;
    	let div_style_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[14].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "mdc-notched-outline__notch");
    			attr_dev(div, "style", div_style_value = Object.entries(/*notchStyles*/ ctx[7]).map(func$5).join(' '));
    			add_location(div, file$e, 17, 4, 496);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8192)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[13],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[13])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[13], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*notchStyles*/ 128 && div_style_value !== (div_style_value = Object.entries(/*notchStyles*/ ctx[7]).map(func$5).join(' '))) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(17:2) {#if !noLabel}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let div2_class_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = !/*noLabel*/ ctx[3] && create_if_block$5(ctx);

    	let div2_levels = [
    		{
    			class: div2_class_value = classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-notched-outline': true,
    				'mdc-notched-outline--notched': /*notched*/ ctx[2],
    				'mdc-notched-outline--no-label': /*noLabel*/ ctx[3],
    				.../*internalClasses*/ ctx[6]
    			})
    		},
    		/*$$restProps*/ ctx[9]
    	];

    	let div2_data = {};

    	for (let i = 0; i < div2_levels.length; i += 1) {
    		div2_data = assign(div2_data, div2_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = space();
    			if (if_block) if_block.c();
    			t1 = space();
    			div1 = element("div");
    			attr_dev(div0, "class", "mdc-notched-outline__leading");
    			add_location(div0, file$e, 15, 2, 430);
    			attr_dev(div1, "class", "mdc-notched-outline__trailing");
    			add_location(div1, file$e, 26, 2, 699);
    			set_attributes(div2, div2_data);
    			add_location(div2, file$e, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t0);
    			if (if_block) if_block.m(div2, null);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			/*div2_binding*/ ctx[15](div2);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, div2, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[8].call(null, div2)),
    					listen_dev(div2, "SMUIFloatingLabel:mount", /*SMUIFloatingLabel_mount_handler*/ ctx[16], false, false, false),
    					listen_dev(div2, "SMUIFloatingLabel:unmount", /*SMUIFloatingLabel_unmount_handler*/ ctx[17], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!/*noLabel*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*noLabel*/ 8) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div2, t1);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			set_attributes(div2, div2_data = get_spread_update(div2_levels, [
    				(!current || dirty & /*className, notched, noLabel, internalClasses*/ 78 && div2_class_value !== (div2_class_value = classMap({
    					[/*className*/ ctx[1]]: true,
    					'mdc-notched-outline': true,
    					'mdc-notched-outline--notched': /*notched*/ ctx[2],
    					'mdc-notched-outline--no-label': /*noLabel*/ ctx[3],
    					.../*internalClasses*/ ctx[6]
    				}))) && { class: div2_class_value },
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block) if_block.d();
    			/*div2_binding*/ ctx[15](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func$5 = ([name, value]) => `${name}: ${value};`;

    function instance_1$9($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","class","notched","noLabel","notch","closeNotch","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NotchedOutline', slots, ['default']);
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { notched = false } = $$props;
    	let { noLabel = false } = $$props;
    	let element;
    	let instance;
    	let floatingLabel;
    	let internalClasses = {};
    	let notchStyles = {};

    	onMount(() => {
    		instance = new MDCNotchedOutlineFoundation({
    				addClass,
    				removeClass,
    				setNotchWidthProperty: width => addNotchStyle('width', width + 'px'),
    				removeNotchWidthProperty: () => removeNotchStyle('width')
    			});

    		instance.init();

    		return () => {
    			instance.destroy();
    		};
    	});

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(6, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(6, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function addNotchStyle(name, value) {
    		if (notchStyles[name] != value) {
    			if (value === '' || value == null) {
    				delete notchStyles[name];
    				$$invalidate(7, notchStyles);
    			} else {
    				$$invalidate(7, notchStyles[name] = value, notchStyles);
    			}
    		}
    	}

    	function removeNotchStyle(name) {
    		if (name in notchStyles) {
    			delete notchStyles[name];
    			$$invalidate(7, notchStyles);
    		}
    	}

    	function notch(notchWidth) {
    		instance.notch(notchWidth);
    	}

    	function closeNotch() {
    		instance.closeNotch();
    	}

    	function getElement() {
    		return element;
    	}

    	function div2_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(5, element);
    		});
    	}

    	const SMUIFloatingLabel_mount_handler = event => $$invalidate(4, floatingLabel = event.detail);
    	const SMUIFloatingLabel_unmount_handler = () => $$invalidate(4, floatingLabel = undefined);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('notched' in $$new_props) $$invalidate(2, notched = $$new_props.notched);
    		if ('noLabel' in $$new_props) $$invalidate(3, noLabel = $$new_props.noLabel);
    		if ('$$scope' in $$new_props) $$invalidate(13, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		MDCNotchedOutlineFoundation,
    		onMount,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		useActions,
    		forwardEvents,
    		use,
    		className,
    		notched,
    		noLabel,
    		element,
    		instance,
    		floatingLabel,
    		internalClasses,
    		notchStyles,
    		addClass,
    		removeClass,
    		addNotchStyle,
    		removeNotchStyle,
    		notch,
    		closeNotch,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('notched' in $$props) $$invalidate(2, notched = $$new_props.notched);
    		if ('noLabel' in $$props) $$invalidate(3, noLabel = $$new_props.noLabel);
    		if ('element' in $$props) $$invalidate(5, element = $$new_props.element);
    		if ('instance' in $$props) instance = $$new_props.instance;
    		if ('floatingLabel' in $$props) $$invalidate(4, floatingLabel = $$new_props.floatingLabel);
    		if ('internalClasses' in $$props) $$invalidate(6, internalClasses = $$new_props.internalClasses);
    		if ('notchStyles' in $$props) $$invalidate(7, notchStyles = $$new_props.notchStyles);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*floatingLabel*/ 16) {
    			if (floatingLabel) {
    				floatingLabel.addStyle('transition-duration', '0s');
    				addClass('mdc-notched-outline--upgraded');

    				requestAnimationFrame(() => {
    					if (floatingLabel) {
    						floatingLabel.removeStyle('transition-duration');
    					}
    				});
    			} else {
    				removeClass('mdc-notched-outline--upgraded');
    			}
    		}
    	};

    	return [
    		use,
    		className,
    		notched,
    		noLabel,
    		floatingLabel,
    		element,
    		internalClasses,
    		notchStyles,
    		forwardEvents,
    		$$restProps,
    		notch,
    		closeNotch,
    		getElement,
    		$$scope,
    		slots,
    		div2_binding,
    		SMUIFloatingLabel_mount_handler,
    		SMUIFloatingLabel_unmount_handler
    	];
    }

    class NotchedOutline extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance_1$9, create_fragment$h, safe_not_equal, {
    			use: 0,
    			class: 1,
    			notched: 2,
    			noLabel: 3,
    			notch: 10,
    			closeNotch: 11,
    			getElement: 12
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NotchedOutline",
    			options,
    			id: create_fragment$h.name
    		});
    	}

    	get use() {
    		throw new Error("<NotchedOutline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<NotchedOutline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get notched() {
    		throw new Error("<NotchedOutline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set notched(value) {
    		throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noLabel() {
    		throw new Error("<NotchedOutline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noLabel(value) {
    		throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get notch() {
    		return this.$$.ctx[10];
    	}

    	set notch(value) {
    		throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get closeNotch() {
    		return this.$$.ctx[11];
    	}

    	set closeNotch(value) {
    		throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[12];
    	}

    	set getElement(value) {
    		throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var HelperLine = classAdderBuilder({
        class: 'mdc-text-field-helper-line',
        component: Div,
    });

    var Prefix = classAdderBuilder({
        class: 'mdc-text-field__affix mdc-text-field__affix--prefix',
        component: Span,
    });

    var Suffix = classAdderBuilder({
        class: 'mdc-text-field__affix mdc-text-field__affix--suffix',
        component: Span,
    });

    /* node_modules/@smui/textfield/dist/Input.svelte generated by Svelte v3.49.0 */
    const file$d = "node_modules/@smui/textfield/dist/Input.svelte";

    function create_fragment$g(ctx) {
    	let input;
    	let input_class_value;
    	let useActions_action;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		{
    			class: input_class_value = classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-text-field__input': true
    			})
    		},
    		{ type: /*type*/ ctx[2] },
    		{ placeholder: /*placeholder*/ ctx[3] },
    		/*valueProp*/ ctx[4],
    		/*internalAttrs*/ ctx[6],
    		/*$$restProps*/ ctx[10]
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$d, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			/*input_binding*/ ctx[26](input);

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, input, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[7].call(null, input)),
    					listen_dev(input, "input", /*input_handler*/ ctx[27], false, false, false),
    					listen_dev(input, "change", /*changeHandler*/ ctx[9], false, false, false),
    					listen_dev(input, "blur", /*blur_handler*/ ctx[24], false, false, false),
    					listen_dev(input, "focus", /*focus_handler*/ ctx[25], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty & /*className*/ 2 && input_class_value !== (input_class_value = classMap({
    					[/*className*/ ctx[1]]: true,
    					'mdc-text-field__input': true
    				})) && { class: input_class_value },
    				dirty & /*type*/ 4 && { type: /*type*/ ctx[2] },
    				dirty & /*placeholder*/ 8 && { placeholder: /*placeholder*/ ctx[3] },
    				dirty & /*valueProp*/ 16 && /*valueProp*/ ctx[4],
    				dirty & /*internalAttrs*/ 64 && /*internalAttrs*/ ctx[6],
    				dirty & /*$$restProps*/ 1024 && /*$$restProps*/ ctx[10]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding*/ ctx[26](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function toNumber(value) {
    	if (value === '') {
    		const nan = new Number(Number.NaN);
    		nan.length = 0;
    		return nan;
    	}

    	return +value;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"use","class","type","placeholder","value","files","dirty","invalid","updateInvalid","emptyValueNull","emptyValueUndefined","getAttr","addAttr","removeAttr","focus","blur","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Input', slots, []);
    	const forwardEvents = forwardEventsBuilder(get_current_component());

    	let uninitializedValue = () => {
    		
    	};

    	function isUninitializedValue(value) {
    		return value === uninitializedValue;
    	}

    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { type = 'text' } = $$props;
    	let { placeholder = ' ' } = $$props;
    	let { value = uninitializedValue } = $$props;
    	const valueUninitialized = isUninitializedValue(value);

    	if (valueUninitialized) {
    		value = '';
    	}

    	let { files = null } = $$props;
    	let { dirty = false } = $$props;
    	let { invalid = false } = $$props;
    	let { updateInvalid = true } = $$props;
    	let { emptyValueNull = value === null } = $$props;

    	if (valueUninitialized && emptyValueNull) {
    		value = null;
    	}

    	let { emptyValueUndefined = value === undefined } = $$props;

    	if (valueUninitialized && emptyValueUndefined) {
    		value = undefined;
    	}

    	let element;
    	let internalAttrs = {};
    	let valueProp = {};

    	onMount(() => {
    		if (updateInvalid) {
    			$$invalidate(14, invalid = element.matches(':invalid'));
    		}
    	});

    	function valueUpdater(e) {
    		if (type === 'file') {
    			$$invalidate(12, files = e.currentTarget.files);
    			return;
    		}

    		if (e.currentTarget.value === '' && emptyValueNull) {
    			$$invalidate(11, value = null);
    			return;
    		}

    		if (e.currentTarget.value === '' && emptyValueUndefined) {
    			$$invalidate(11, value = undefined);
    			return;
    		}

    		switch (type) {
    			case 'number':
    			case 'range':
    				$$invalidate(11, value = toNumber(e.currentTarget.value));
    				break;
    			default:
    				$$invalidate(11, value = e.currentTarget.value);
    				break;
    		}
    	}

    	function changeHandler(e) {
    		if (type === 'file' || type === 'range') {
    			valueUpdater(e);
    		}

    		$$invalidate(13, dirty = true);

    		if (updateInvalid) {
    			$$invalidate(14, invalid = element.matches(':invalid'));
    		}
    	}

    	function getAttr(name) {
    		var _a;

    		return name in internalAttrs
    		? (_a = internalAttrs[name]) !== null && _a !== void 0
    			? _a
    			: null
    		: getElement().getAttribute(name);
    	}

    	function addAttr(name, value) {
    		if (internalAttrs[name] !== value) {
    			$$invalidate(6, internalAttrs[name] = value, internalAttrs);
    		}
    	}

    	function removeAttr(name) {
    		if (!(name in internalAttrs) || internalAttrs[name] != null) {
    			$$invalidate(6, internalAttrs[name] = undefined, internalAttrs);
    		}
    	}

    	function focus() {
    		getElement().focus();
    	}

    	function blur() {
    		getElement().blur();
    	}

    	function getElement() {
    		return element;
    	}

    	function blur_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(5, element);
    		});
    	}

    	const input_handler = e => type !== 'file' && valueUpdater(e);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('type' in $$new_props) $$invalidate(2, type = $$new_props.type);
    		if ('placeholder' in $$new_props) $$invalidate(3, placeholder = $$new_props.placeholder);
    		if ('value' in $$new_props) $$invalidate(11, value = $$new_props.value);
    		if ('files' in $$new_props) $$invalidate(12, files = $$new_props.files);
    		if ('dirty' in $$new_props) $$invalidate(13, dirty = $$new_props.dirty);
    		if ('invalid' in $$new_props) $$invalidate(14, invalid = $$new_props.invalid);
    		if ('updateInvalid' in $$new_props) $$invalidate(15, updateInvalid = $$new_props.updateInvalid);
    		if ('emptyValueNull' in $$new_props) $$invalidate(16, emptyValueNull = $$new_props.emptyValueNull);
    		if ('emptyValueUndefined' in $$new_props) $$invalidate(17, emptyValueUndefined = $$new_props.emptyValueUndefined);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		useActions,
    		forwardEvents,
    		uninitializedValue,
    		isUninitializedValue,
    		use,
    		className,
    		type,
    		placeholder,
    		value,
    		valueUninitialized,
    		files,
    		dirty,
    		invalid,
    		updateInvalid,
    		emptyValueNull,
    		emptyValueUndefined,
    		element,
    		internalAttrs,
    		valueProp,
    		toNumber,
    		valueUpdater,
    		changeHandler,
    		getAttr,
    		addAttr,
    		removeAttr,
    		focus,
    		blur,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('uninitializedValue' in $$props) uninitializedValue = $$new_props.uninitializedValue;
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('type' in $$props) $$invalidate(2, type = $$new_props.type);
    		if ('placeholder' in $$props) $$invalidate(3, placeholder = $$new_props.placeholder);
    		if ('value' in $$props) $$invalidate(11, value = $$new_props.value);
    		if ('files' in $$props) $$invalidate(12, files = $$new_props.files);
    		if ('dirty' in $$props) $$invalidate(13, dirty = $$new_props.dirty);
    		if ('invalid' in $$props) $$invalidate(14, invalid = $$new_props.invalid);
    		if ('updateInvalid' in $$props) $$invalidate(15, updateInvalid = $$new_props.updateInvalid);
    		if ('emptyValueNull' in $$props) $$invalidate(16, emptyValueNull = $$new_props.emptyValueNull);
    		if ('emptyValueUndefined' in $$props) $$invalidate(17, emptyValueUndefined = $$new_props.emptyValueUndefined);
    		if ('element' in $$props) $$invalidate(5, element = $$new_props.element);
    		if ('internalAttrs' in $$props) $$invalidate(6, internalAttrs = $$new_props.internalAttrs);
    		if ('valueProp' in $$props) $$invalidate(4, valueProp = $$new_props.valueProp);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*type, valueProp, value*/ 2068) {
    			if (type === 'file') {
    				delete valueProp.value;
    				(($$invalidate(4, valueProp), $$invalidate(2, type)), $$invalidate(11, value));
    			} else {
    				$$invalidate(4, valueProp.value = value == null ? '' : value, valueProp);
    			}
    		}
    	};

    	return [
    		use,
    		className,
    		type,
    		placeholder,
    		valueProp,
    		element,
    		internalAttrs,
    		forwardEvents,
    		valueUpdater,
    		changeHandler,
    		$$restProps,
    		value,
    		files,
    		dirty,
    		invalid,
    		updateInvalid,
    		emptyValueNull,
    		emptyValueUndefined,
    		getAttr,
    		addAttr,
    		removeAttr,
    		focus,
    		blur,
    		getElement,
    		blur_handler,
    		focus_handler,
    		input_binding,
    		input_handler
    	];
    }

    class Input extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$g, safe_not_equal, {
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
    			getElement: 23
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Input",
    			options,
    			id: create_fragment$g.name
    		});
    	}

    	get use() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get files() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set files(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dirty() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dirty(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get updateInvalid() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set updateInvalid(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get emptyValueNull() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set emptyValueNull(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get emptyValueUndefined() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set emptyValueUndefined(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getAttr() {
    		return this.$$.ctx[18];
    	}

    	set getAttr(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get addAttr() {
    		return this.$$.ctx[19];
    	}

    	set addAttr(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get removeAttr() {
    		return this.$$.ctx[20];
    	}

    	set removeAttr(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get focus() {
    		return this.$$.ctx[21];
    	}

    	set focus(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get blur() {
    		return this.$$.ctx[22];
    	}

    	set blur(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[23];
    	}

    	set getElement(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/textfield/dist/Textarea.svelte generated by Svelte v3.49.0 */
    const file$c = "node_modules/@smui/textfield/dist/Textarea.svelte";

    function create_fragment$f(ctx) {
    	let textarea;
    	let textarea_class_value;
    	let textarea_style_value;
    	let useActions_action;
    	let mounted;
    	let dispose;

    	let textarea_levels = [
    		{
    			class: textarea_class_value = classMap({
    				[/*className*/ ctx[2]]: true,
    				'mdc-text-field__input': true
    			})
    		},
    		{
    			style: textarea_style_value = `${/*resizable*/ ctx[4] ? '' : 'resize: none; '}${/*style*/ ctx[3]}`
    		},
    		/*internalAttrs*/ ctx[6],
    		/*$$restProps*/ ctx[9]
    	];

    	let textarea_data = {};

    	for (let i = 0; i < textarea_levels.length; i += 1) {
    		textarea_data = assign(textarea_data, textarea_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			textarea = element("textarea");
    			set_attributes(textarea, textarea_data);
    			add_location(textarea, file$c, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, textarea, anchor);
    			if (textarea.autofocus) textarea.focus();
    			/*textarea_binding*/ ctx[21](textarea);
    			set_input_value(textarea, /*value*/ ctx[0]);

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, textarea, /*use*/ ctx[1])),
    					action_destroyer(/*forwardEvents*/ ctx[7].call(null, textarea)),
    					listen_dev(textarea, "change", /*changeHandler*/ ctx[8], false, false, false),
    					listen_dev(textarea, "blur", /*blur_handler*/ ctx[19], false, false, false),
    					listen_dev(textarea, "focus", /*focus_handler*/ ctx[20], false, false, false),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[22])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			set_attributes(textarea, textarea_data = get_spread_update(textarea_levels, [
    				dirty & /*className*/ 4 && textarea_class_value !== (textarea_class_value = classMap({
    					[/*className*/ ctx[2]]: true,
    					'mdc-text-field__input': true
    				})) && { class: textarea_class_value },
    				dirty & /*resizable, style*/ 24 && textarea_style_value !== (textarea_style_value = `${/*resizable*/ ctx[4] ? '' : 'resize: none; '}${/*style*/ ctx[3]}`) && { style: textarea_style_value },
    				dirty & /*internalAttrs*/ 64 && /*internalAttrs*/ ctx[6],
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);

    			if (dirty & /*value*/ 1) {
    				set_input_value(textarea, /*value*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(textarea);
    			/*textarea_binding*/ ctx[21](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"use","class","style","value","dirty","invalid","updateInvalid","resizable","getAttr","addAttr","removeAttr","focus","blur","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Textarea', slots, []);
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { style = '' } = $$props;
    	let { value = '' } = $$props;
    	let { dirty = false } = $$props;
    	let { invalid = false } = $$props;
    	let { updateInvalid = true } = $$props;
    	let { resizable = true } = $$props;
    	let element;
    	let internalAttrs = {};

    	onMount(() => {
    		if (updateInvalid) {
    			$$invalidate(11, invalid = element.matches(':invalid'));
    		}
    	});

    	function changeHandler() {
    		$$invalidate(10, dirty = true);

    		if (updateInvalid) {
    			$$invalidate(11, invalid = element.matches(':invalid'));
    		}
    	}

    	function getAttr(name) {
    		var _a;

    		return name in internalAttrs
    		? (_a = internalAttrs[name]) !== null && _a !== void 0
    			? _a
    			: null
    		: getElement().getAttribute(name);
    	}

    	function addAttr(name, value) {
    		if (internalAttrs[name] !== value) {
    			$$invalidate(6, internalAttrs[name] = value, internalAttrs);
    		}
    	}

    	function removeAttr(name) {
    		if (!(name in internalAttrs) || internalAttrs[name] != null) {
    			$$invalidate(6, internalAttrs[name] = undefined, internalAttrs);
    		}
    	}

    	function focus() {
    		getElement().focus();
    	}

    	function blur() {
    		getElement().blur();
    	}

    	function getElement() {
    		return element;
    	}

    	function blur_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function textarea_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(5, element);
    		});
    	}

    	function textarea_input_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('style' in $$new_props) $$invalidate(3, style = $$new_props.style);
    		if ('value' in $$new_props) $$invalidate(0, value = $$new_props.value);
    		if ('dirty' in $$new_props) $$invalidate(10, dirty = $$new_props.dirty);
    		if ('invalid' in $$new_props) $$invalidate(11, invalid = $$new_props.invalid);
    		if ('updateInvalid' in $$new_props) $$invalidate(12, updateInvalid = $$new_props.updateInvalid);
    		if ('resizable' in $$new_props) $$invalidate(4, resizable = $$new_props.resizable);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		useActions,
    		forwardEvents,
    		use,
    		className,
    		style,
    		value,
    		dirty,
    		invalid,
    		updateInvalid,
    		resizable,
    		element,
    		internalAttrs,
    		changeHandler,
    		getAttr,
    		addAttr,
    		removeAttr,
    		focus,
    		blur,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('style' in $$props) $$invalidate(3, style = $$new_props.style);
    		if ('value' in $$props) $$invalidate(0, value = $$new_props.value);
    		if ('dirty' in $$props) $$invalidate(10, dirty = $$new_props.dirty);
    		if ('invalid' in $$props) $$invalidate(11, invalid = $$new_props.invalid);
    		if ('updateInvalid' in $$props) $$invalidate(12, updateInvalid = $$new_props.updateInvalid);
    		if ('resizable' in $$props) $$invalidate(4, resizable = $$new_props.resizable);
    		if ('element' in $$props) $$invalidate(5, element = $$new_props.element);
    		if ('internalAttrs' in $$props) $$invalidate(6, internalAttrs = $$new_props.internalAttrs);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		value,
    		use,
    		className,
    		style,
    		resizable,
    		element,
    		internalAttrs,
    		forwardEvents,
    		changeHandler,
    		$$restProps,
    		dirty,
    		invalid,
    		updateInvalid,
    		getAttr,
    		addAttr,
    		removeAttr,
    		focus,
    		blur,
    		getElement,
    		blur_handler,
    		focus_handler,
    		textarea_binding,
    		textarea_input_handler
    	];
    }

    class Textarea extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$6, create_fragment$f, safe_not_equal, {
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
    			getElement: 18
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Textarea",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get use() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dirty() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dirty(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get updateInvalid() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set updateInvalid(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get resizable() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set resizable(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getAttr() {
    		return this.$$.ctx[13];
    	}

    	set getAttr(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get addAttr() {
    		return this.$$.ctx[14];
    	}

    	set addAttr(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get removeAttr() {
    		return this.$$.ctx[15];
    	}

    	set removeAttr(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get focus() {
    		return this.$$.ctx[16];
    	}

    	set focus(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get blur() {
    		return this.$$.ctx[17];
    	}

    	set blur(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[18];
    	}

    	set getElement(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/textfield/dist/Textfield.svelte generated by Svelte v3.49.0 */

    const { Error: Error_1 } = globals;
    const file$b = "node_modules/@smui/textfield/dist/Textfield.svelte";
    const get_helper_slot_changes = dirty => ({});
    const get_helper_slot_context = ctx => ({});
    const get_ripple_slot_changes = dirty => ({});
    const get_ripple_slot_context = ctx => ({});
    const get_trailingIcon_slot_changes_1 = dirty => ({});
    const get_trailingIcon_slot_context_1 = ctx => ({});
    const get_leadingIcon_slot_changes_1 = dirty => ({});
    const get_leadingIcon_slot_context_1 = ctx => ({});
    const get_label_slot_changes_2 = dirty => ({});
    const get_label_slot_context_2 = ctx => ({});
    const get_trailingIcon_slot_changes = dirty => ({});
    const get_trailingIcon_slot_context = ctx => ({});
    const get_suffix_slot_changes = dirty => ({});
    const get_suffix_slot_context = ctx => ({});
    const get_prefix_slot_changes = dirty => ({});
    const get_prefix_slot_context = ctx => ({});
    const get_internalCounter_slot_changes = dirty => ({});
    const get_internalCounter_slot_context = ctx => ({});
    const get_leadingIcon_slot_changes$1 = dirty => ({});
    const get_leadingIcon_slot_context$1 = ctx => ({});
    const get_label_slot_changes_1$1 = dirty => ({});
    const get_label_slot_context_1$1 = ctx => ({});
    const get_label_slot_changes$2 = dirty => ({});
    const get_label_slot_context$2 = ctx => ({});

    // (163:0) {:else}
    function create_else_block_1(ctx) {
    	let div;
    	let t0;
    	let contextfragment0;
    	let t1;
    	let t2;
    	let contextfragment1;
    	let t3;
    	let div_class_value;
    	let div_style_value;
    	let Ripple_action;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const label_slot_template = /*#slots*/ ctx[51].label;
    	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[90], get_label_slot_context_2);

    	contextfragment0 = new ContextFragment({
    			props: {
    				key: "SMUI:textfield:icon:leading",
    				value: true,
    				$$slots: { default: [create_default_slot_9$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const default_slot_template = /*#slots*/ ctx[51].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[90], null);

    	contextfragment1 = new ContextFragment({
    			props: {
    				key: "SMUI:textfield:icon:leading",
    				value: false,
    				$$slots: { default: [create_default_slot_8$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const ripple_slot_template = /*#slots*/ ctx[51].ripple;
    	const ripple_slot = create_slot(ripple_slot_template, ctx, /*$$scope*/ ctx[90], get_ripple_slot_context);

    	let div_levels = [
    		{
    			class: div_class_value = classMap({
    				[/*className*/ ctx[9]]: true,
    				'mdc-text-field': true,
    				'mdc-text-field--disabled': /*disabled*/ ctx[12],
    				'mdc-text-field--textarea': /*textarea*/ ctx[14],
    				'mdc-text-field--filled': /*variant*/ ctx[15] === 'filled',
    				'mdc-text-field--outlined': /*variant*/ ctx[15] === 'outlined',
    				'smui-text-field--standard': /*variant*/ ctx[15] === 'standard' && !/*textarea*/ ctx[14],
    				'mdc-text-field--no-label': /*noLabel*/ ctx[16] || !/*$$slots*/ ctx[42].label,
    				'mdc-text-field--with-leading-icon': /*$$slots*/ ctx[42].leadingIcon,
    				'mdc-text-field--with-trailing-icon': /*$$slots*/ ctx[42].trailingIcon,
    				'mdc-text-field--invalid': /*invalid*/ ctx[1],
    				.../*internalClasses*/ ctx[25]
    			})
    		},
    		{
    			style: div_style_value = Object.entries(/*internalStyles*/ ctx[26]).map(func_1).concat([/*style*/ ctx[10]]).join(' ')
    		},
    		exclude(/*$$restProps*/ ctx[41], ['input$', 'label$', 'ripple$', 'outline$', 'helperLine$'])
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (label_slot) label_slot.c();
    			t0 = space();
    			create_component(contextfragment0.$$.fragment);
    			t1 = space();
    			if (default_slot) default_slot.c();
    			t2 = space();
    			create_component(contextfragment1.$$.fragment);
    			t3 = space();
    			if (ripple_slot) ripple_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$b, 163, 2, 5417);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (label_slot) {
    				label_slot.m(div, null);
    			}

    			append_dev(div, t0);
    			mount_component(contextfragment0, div, null);
    			append_dev(div, t1);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			append_dev(div, t2);
    			mount_component(contextfragment1, div, null);
    			append_dev(div, t3);

    			if (ripple_slot) {
    				ripple_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[80](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(Ripple_action = Ripple.call(null, div, {
    						ripple: /*ripple*/ ctx[11],
    						unbounded: false,
    						addClass: /*addClass*/ ctx[38],
    						removeClass: /*removeClass*/ ctx[39],
    						addStyle: /*addStyle*/ ctx[40]
    					})),
    					action_destroyer(useActions_action = useActions.call(null, div, /*use*/ ctx[8])),
    					action_destroyer(/*forwardEvents*/ ctx[34].call(null, div)),
    					listen_dev(div, "SMUITextfieldLeadingIcon:mount", /*SMUITextfieldLeadingIcon_mount_handler_1*/ ctx[81], false, false, false),
    					listen_dev(div, "SMUITextfieldLeadingIcon:unmount", /*SMUITextfieldLeadingIcon_unmount_handler_1*/ ctx[82], false, false, false),
    					listen_dev(div, "SMUITextfieldTrailingIcon:mount", /*SMUITextfieldTrailingIcon_mount_handler_1*/ ctx[83], false, false, false),
    					listen_dev(div, "SMUITextfieldTrailingIcon:unmount", /*SMUITextfieldTrailingIcon_unmount_handler_1*/ ctx[84], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (label_slot) {
    				if (label_slot.p && (!current || dirty[2] & /*$$scope*/ 268435456)) {
    					update_slot_base(
    						label_slot,
    						label_slot_template,
    						ctx,
    						/*$$scope*/ ctx[90],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[90])
    						: get_slot_changes(label_slot_template, /*$$scope*/ ctx[90], dirty, get_label_slot_changes_2),
    						get_label_slot_context_2
    					);
    				}
    			}

    			const contextfragment0_changes = {};

    			if (dirty[2] & /*$$scope*/ 268435456) {
    				contextfragment0_changes.$$scope = { dirty, ctx };
    			}

    			contextfragment0.$set(contextfragment0_changes);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[2] & /*$$scope*/ 268435456)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[90],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[90])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[90], dirty, null),
    						null
    					);
    				}
    			}

    			const contextfragment1_changes = {};

    			if (dirty[2] & /*$$scope*/ 268435456) {
    				contextfragment1_changes.$$scope = { dirty, ctx };
    			}

    			contextfragment1.$set(contextfragment1_changes);

    			if (ripple_slot) {
    				if (ripple_slot.p && (!current || dirty[2] & /*$$scope*/ 268435456)) {
    					update_slot_base(
    						ripple_slot,
    						ripple_slot_template,
    						ctx,
    						/*$$scope*/ ctx[90],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[90])
    						: get_slot_changes(ripple_slot_template, /*$$scope*/ ctx[90], dirty, get_ripple_slot_changes),
    						get_ripple_slot_context
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				(!current || dirty[0] & /*className, disabled, textarea, variant, noLabel, invalid, internalClasses*/ 33673730 | dirty[1] & /*$$slots*/ 2048 && div_class_value !== (div_class_value = classMap({
    					[/*className*/ ctx[9]]: true,
    					'mdc-text-field': true,
    					'mdc-text-field--disabled': /*disabled*/ ctx[12],
    					'mdc-text-field--textarea': /*textarea*/ ctx[14],
    					'mdc-text-field--filled': /*variant*/ ctx[15] === 'filled',
    					'mdc-text-field--outlined': /*variant*/ ctx[15] === 'outlined',
    					'smui-text-field--standard': /*variant*/ ctx[15] === 'standard' && !/*textarea*/ ctx[14],
    					'mdc-text-field--no-label': /*noLabel*/ ctx[16] || !/*$$slots*/ ctx[42].label,
    					'mdc-text-field--with-leading-icon': /*$$slots*/ ctx[42].leadingIcon,
    					'mdc-text-field--with-trailing-icon': /*$$slots*/ ctx[42].trailingIcon,
    					'mdc-text-field--invalid': /*invalid*/ ctx[1],
    					.../*internalClasses*/ ctx[25]
    				}))) && { class: div_class_value },
    				(!current || dirty[0] & /*internalStyles, style*/ 67109888 && div_style_value !== (div_style_value = Object.entries(/*internalStyles*/ ctx[26]).map(func_1).concat([/*style*/ ctx[10]]).join(' '))) && { style: div_style_value },
    				dirty[1] & /*$$restProps*/ 1024 && exclude(/*$$restProps*/ ctx[41], ['input$', 'label$', 'ripple$', 'outline$', 'helperLine$'])
    			]));

    			if (Ripple_action && is_function(Ripple_action.update) && dirty[0] & /*ripple*/ 2048) Ripple_action.update.call(null, {
    				ripple: /*ripple*/ ctx[11],
    				unbounded: false,
    				addClass: /*addClass*/ ctx[38],
    				removeClass: /*removeClass*/ ctx[39],
    				addStyle: /*addStyle*/ ctx[40]
    			});

    			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 256) useActions_action.update.call(null, /*use*/ ctx[8]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label_slot, local);
    			transition_in(contextfragment0.$$.fragment, local);
    			transition_in(default_slot, local);
    			transition_in(contextfragment1.$$.fragment, local);
    			transition_in(ripple_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label_slot, local);
    			transition_out(contextfragment0.$$.fragment, local);
    			transition_out(default_slot, local);
    			transition_out(contextfragment1.$$.fragment, local);
    			transition_out(ripple_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (label_slot) label_slot.d(detaching);
    			destroy_component(contextfragment0);
    			if (default_slot) default_slot.d(detaching);
    			destroy_component(contextfragment1);
    			if (ripple_slot) ripple_slot.d(detaching);
    			/*div_binding*/ ctx[80](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(163:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (1:0) {#if valued}
    function create_if_block_1$2(ctx) {
    	let label_1;
    	let t0;
    	let t1;
    	let contextfragment0;
    	let t2;
    	let t3;
    	let current_block_type_index;
    	let if_block2;
    	let t4;
    	let contextfragment1;
    	let t5;
    	let label_1_class_value;
    	let label_1_style_value;
    	let Ripple_action;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = !/*textarea*/ ctx[14] && /*variant*/ ctx[15] !== 'outlined' && create_if_block_8(ctx);
    	let if_block1 = (/*textarea*/ ctx[14] || /*variant*/ ctx[15] === 'outlined') && create_if_block_6$1(ctx);

    	contextfragment0 = new ContextFragment({
    			props: {
    				key: "SMUI:textfield:icon:leading",
    				value: true,
    				$$slots: { default: [create_default_slot_4$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const default_slot_template = /*#slots*/ ctx[51].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[90], null);
    	const if_block_creators = [create_if_block_3$2, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*textarea*/ ctx[14] && typeof /*value*/ ctx[0] === 'string') return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	contextfragment1 = new ContextFragment({
    			props: {
    				key: "SMUI:textfield:icon:leading",
    				value: false,
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block3 = !/*textarea*/ ctx[14] && /*variant*/ ctx[15] !== 'outlined' && /*ripple*/ ctx[11] && create_if_block_2$2(ctx);

    	let label_1_levels = [
    		{
    			class: label_1_class_value = classMap({
    				[/*className*/ ctx[9]]: true,
    				'mdc-text-field': true,
    				'mdc-text-field--disabled': /*disabled*/ ctx[12],
    				'mdc-text-field--textarea': /*textarea*/ ctx[14],
    				'mdc-text-field--filled': /*variant*/ ctx[15] === 'filled',
    				'mdc-text-field--outlined': /*variant*/ ctx[15] === 'outlined',
    				'smui-text-field--standard': /*variant*/ ctx[15] === 'standard' && !/*textarea*/ ctx[14],
    				'mdc-text-field--no-label': /*noLabel*/ ctx[16] || /*label*/ ctx[17] == null && !/*$$slots*/ ctx[42].label,
    				'mdc-text-field--label-floating': /*focused*/ ctx[28] || /*value*/ ctx[0] != null && /*value*/ ctx[0] !== '',
    				'mdc-text-field--with-leading-icon': /*isUninitializedValue*/ ctx[35](/*withLeadingIcon*/ ctx[22])
    				? /*$$slots*/ ctx[42].leadingIcon
    				: /*withLeadingIcon*/ ctx[22],
    				'mdc-text-field--with-trailing-icon': /*isUninitializedValue*/ ctx[35](/*withTrailingIcon*/ ctx[23])
    				? /*$$slots*/ ctx[42].trailingIcon
    				: /*withTrailingIcon*/ ctx[23],
    				'mdc-text-field--with-internal-counter': /*textarea*/ ctx[14] && /*$$slots*/ ctx[42].internalCounter,
    				'mdc-text-field--invalid': /*invalid*/ ctx[1],
    				.../*internalClasses*/ ctx[25]
    			})
    		},
    		{
    			style: label_1_style_value = Object.entries(/*internalStyles*/ ctx[26]).map(func$4).concat([/*style*/ ctx[10]]).join(' ')
    		},
    		{
    			for: /* suppress a11y warning, since this is wrapped */ undefined
    		},
    		exclude(/*$$restProps*/ ctx[41], ['input$', 'label$', 'ripple$', 'outline$', 'helperLine$'])
    	];

    	let label_1_data = {};

    	for (let i = 0; i < label_1_levels.length; i += 1) {
    		label_1_data = assign(label_1_data, label_1_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			create_component(contextfragment0.$$.fragment);
    			t2 = space();
    			if (default_slot) default_slot.c();
    			t3 = space();
    			if_block2.c();
    			t4 = space();
    			create_component(contextfragment1.$$.fragment);
    			t5 = space();
    			if (if_block3) if_block3.c();
    			set_attributes(label_1, label_1_data);
    			add_location(label_1, file$b, 1, 2, 15);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			if (if_block0) if_block0.m(label_1, null);
    			append_dev(label_1, t0);
    			if (if_block1) if_block1.m(label_1, null);
    			append_dev(label_1, t1);
    			mount_component(contextfragment0, label_1, null);
    			append_dev(label_1, t2);

    			if (default_slot) {
    				default_slot.m(label_1, null);
    			}

    			append_dev(label_1, t3);
    			if_blocks[current_block_type_index].m(label_1, null);
    			append_dev(label_1, t4);
    			mount_component(contextfragment1, label_1, null);
    			append_dev(label_1, t5);
    			if (if_block3) if_block3.m(label_1, null);
    			/*label_1_binding*/ ctx[73](label_1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(Ripple_action = Ripple.call(null, label_1, {
    						ripple: !/*textarea*/ ctx[14] && /*variant*/ ctx[15] === 'filled',
    						unbounded: false,
    						addClass: /*addClass*/ ctx[38],
    						removeClass: /*removeClass*/ ctx[39],
    						addStyle: /*addStyle*/ ctx[40],
    						eventTarget: /*inputElement*/ ctx[33],
    						activeTarget: /*inputElement*/ ctx[33],
    						initPromise: /*initPromise*/ ctx[37]
    					})),
    					action_destroyer(useActions_action = useActions.call(null, label_1, /*use*/ ctx[8])),
    					action_destroyer(/*forwardEvents*/ ctx[34].call(null, label_1)),
    					listen_dev(label_1, "SMUITextfieldLeadingIcon:mount", /*SMUITextfieldLeadingIcon_mount_handler*/ ctx[74], false, false, false),
    					listen_dev(label_1, "SMUITextfieldLeadingIcon:unmount", /*SMUITextfieldLeadingIcon_unmount_handler*/ ctx[75], false, false, false),
    					listen_dev(label_1, "SMUITextfieldTrailingIcon:mount", /*SMUITextfieldTrailingIcon_mount_handler*/ ctx[76], false, false, false),
    					listen_dev(label_1, "SMUITextfieldTrailingIcon:unmount", /*SMUITextfieldTrailingIcon_unmount_handler*/ ctx[77], false, false, false),
    					listen_dev(label_1, "SMUITextfieldCharacterCounter:mount", /*SMUITextfieldCharacterCounter_mount_handler*/ ctx[78], false, false, false),
    					listen_dev(label_1, "SMUITextfieldCharacterCounter:unmount", /*SMUITextfieldCharacterCounter_unmount_handler*/ ctx[79], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!/*textarea*/ ctx[14] && /*variant*/ ctx[15] !== 'outlined') {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*textarea, variant*/ 49152) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_8(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(label_1, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*textarea*/ ctx[14] || /*variant*/ ctx[15] === 'outlined') {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*textarea, variant*/ 49152) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_6$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(label_1, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			const contextfragment0_changes = {};

    			if (dirty[2] & /*$$scope*/ 268435456) {
    				contextfragment0_changes.$$scope = { dirty, ctx };
    			}

    			contextfragment0.$set(contextfragment0_changes);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[2] & /*$$scope*/ 268435456)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[90],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[90])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[90], dirty, null),
    						null
    					);
    				}
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block2 = if_blocks[current_block_type_index];

    				if (!if_block2) {
    					if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block2.c();
    				} else {
    					if_block2.p(ctx, dirty);
    				}

    				transition_in(if_block2, 1);
    				if_block2.m(label_1, t4);
    			}

    			const contextfragment1_changes = {};

    			if (dirty[2] & /*$$scope*/ 268435456) {
    				contextfragment1_changes.$$scope = { dirty, ctx };
    			}

    			contextfragment1.$set(contextfragment1_changes);

    			if (!/*textarea*/ ctx[14] && /*variant*/ ctx[15] !== 'outlined' && /*ripple*/ ctx[11]) {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);

    					if (dirty[0] & /*textarea, variant, ripple*/ 51200) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block_2$2(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(label_1, null);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}

    			set_attributes(label_1, label_1_data = get_spread_update(label_1_levels, [
    				(!current || dirty[0] & /*className, disabled, textarea, variant, noLabel, label, focused, value, withLeadingIcon, withTrailingIcon, invalid, internalClasses*/ 314823171 | dirty[1] & /*$$slots*/ 2048 && label_1_class_value !== (label_1_class_value = classMap({
    					[/*className*/ ctx[9]]: true,
    					'mdc-text-field': true,
    					'mdc-text-field--disabled': /*disabled*/ ctx[12],
    					'mdc-text-field--textarea': /*textarea*/ ctx[14],
    					'mdc-text-field--filled': /*variant*/ ctx[15] === 'filled',
    					'mdc-text-field--outlined': /*variant*/ ctx[15] === 'outlined',
    					'smui-text-field--standard': /*variant*/ ctx[15] === 'standard' && !/*textarea*/ ctx[14],
    					'mdc-text-field--no-label': /*noLabel*/ ctx[16] || /*label*/ ctx[17] == null && !/*$$slots*/ ctx[42].label,
    					'mdc-text-field--label-floating': /*focused*/ ctx[28] || /*value*/ ctx[0] != null && /*value*/ ctx[0] !== '',
    					'mdc-text-field--with-leading-icon': /*isUninitializedValue*/ ctx[35](/*withLeadingIcon*/ ctx[22])
    					? /*$$slots*/ ctx[42].leadingIcon
    					: /*withLeadingIcon*/ ctx[22],
    					'mdc-text-field--with-trailing-icon': /*isUninitializedValue*/ ctx[35](/*withTrailingIcon*/ ctx[23])
    					? /*$$slots*/ ctx[42].trailingIcon
    					: /*withTrailingIcon*/ ctx[23],
    					'mdc-text-field--with-internal-counter': /*textarea*/ ctx[14] && /*$$slots*/ ctx[42].internalCounter,
    					'mdc-text-field--invalid': /*invalid*/ ctx[1],
    					.../*internalClasses*/ ctx[25]
    				}))) && { class: label_1_class_value },
    				(!current || dirty[0] & /*internalStyles, style*/ 67109888 && label_1_style_value !== (label_1_style_value = Object.entries(/*internalStyles*/ ctx[26]).map(func$4).concat([/*style*/ ctx[10]]).join(' '))) && { style: label_1_style_value },
    				{
    					for: /* suppress a11y warning, since this is wrapped */ undefined
    				},
    				dirty[1] & /*$$restProps*/ 1024 && exclude(/*$$restProps*/ ctx[41], ['input$', 'label$', 'ripple$', 'outline$', 'helperLine$'])
    			]));

    			if (Ripple_action && is_function(Ripple_action.update) && dirty[0] & /*textarea, variant*/ 49152 | dirty[1] & /*inputElement*/ 4) Ripple_action.update.call(null, {
    				ripple: !/*textarea*/ ctx[14] && /*variant*/ ctx[15] === 'filled',
    				unbounded: false,
    				addClass: /*addClass*/ ctx[38],
    				removeClass: /*removeClass*/ ctx[39],
    				addStyle: /*addStyle*/ ctx[40],
    				eventTarget: /*inputElement*/ ctx[33],
    				activeTarget: /*inputElement*/ ctx[33],
    				initPromise: /*initPromise*/ ctx[37]
    			});

    			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 256) useActions_action.update.call(null, /*use*/ ctx[8]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(contextfragment0.$$.fragment, local);
    			transition_in(default_slot, local);
    			transition_in(if_block2);
    			transition_in(contextfragment1.$$.fragment, local);
    			transition_in(if_block3);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(contextfragment0.$$.fragment, local);
    			transition_out(default_slot, local);
    			transition_out(if_block2);
    			transition_out(contextfragment1.$$.fragment, local);
    			transition_out(if_block3);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			destroy_component(contextfragment0);
    			if (default_slot) default_slot.d(detaching);
    			if_blocks[current_block_type_index].d();
    			destroy_component(contextfragment1);
    			if (if_block3) if_block3.d();
    			/*label_1_binding*/ ctx[73](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(1:0) {#if valued}",
    		ctx
    	});

    	return block;
    }

    // (207:4) <ContextFragment key="SMUI:textfield:icon:leading" value={true}>
    function create_default_slot_9$1(ctx) {
    	let current;
    	const leadingIcon_slot_template = /*#slots*/ ctx[51].leadingIcon;
    	const leadingIcon_slot = create_slot(leadingIcon_slot_template, ctx, /*$$scope*/ ctx[90], get_leadingIcon_slot_context_1);

    	const block = {
    		c: function create() {
    			if (leadingIcon_slot) leadingIcon_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (leadingIcon_slot) {
    				leadingIcon_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (leadingIcon_slot) {
    				if (leadingIcon_slot.p && (!current || dirty[2] & /*$$scope*/ 268435456)) {
    					update_slot_base(
    						leadingIcon_slot,
    						leadingIcon_slot_template,
    						ctx,
    						/*$$scope*/ ctx[90],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[90])
    						: get_slot_changes(leadingIcon_slot_template, /*$$scope*/ ctx[90], dirty, get_leadingIcon_slot_changes_1),
    						get_leadingIcon_slot_context_1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(leadingIcon_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(leadingIcon_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (leadingIcon_slot) leadingIcon_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9$1.name,
    		type: "slot",
    		source: "(207:4) <ContextFragment key=\\\"SMUI:textfield:icon:leading\\\" value={true}>",
    		ctx
    	});

    	return block;
    }

    // (211:4) <ContextFragment key="SMUI:textfield:icon:leading" value={false}>
    function create_default_slot_8$1(ctx) {
    	let current;
    	const trailingIcon_slot_template = /*#slots*/ ctx[51].trailingIcon;
    	const trailingIcon_slot = create_slot(trailingIcon_slot_template, ctx, /*$$scope*/ ctx[90], get_trailingIcon_slot_context_1);

    	const block = {
    		c: function create() {
    			if (trailingIcon_slot) trailingIcon_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (trailingIcon_slot) {
    				trailingIcon_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (trailingIcon_slot) {
    				if (trailingIcon_slot.p && (!current || dirty[2] & /*$$scope*/ 268435456)) {
    					update_slot_base(
    						trailingIcon_slot,
    						trailingIcon_slot_template,
    						ctx,
    						/*$$scope*/ ctx[90],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[90])
    						: get_slot_changes(trailingIcon_slot_template, /*$$scope*/ ctx[90], dirty, get_trailingIcon_slot_changes_1),
    						get_trailingIcon_slot_context_1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(trailingIcon_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(trailingIcon_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (trailingIcon_slot) trailingIcon_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8$1.name,
    		type: "slot",
    		source: "(211:4) <ContextFragment key=\\\"SMUI:textfield:icon:leading\\\" value={false}>",
    		ctx
    	});

    	return block;
    }

    // (62:4) {#if !textarea && variant !== 'outlined'}
    function create_if_block_8(ctx) {
    	let t;
    	let if_block1_anchor;
    	let current;
    	let if_block0 = /*variant*/ ctx[15] === 'filled' && create_if_block_10(ctx);
    	let if_block1 = !/*noLabel*/ ctx[16] && (/*label*/ ctx[17] != null || /*$$slots*/ ctx[42].label) && create_if_block_9(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*variant*/ ctx[15] === 'filled') {
    				if (if_block0) ; else {
    					if_block0 = create_if_block_10(ctx);
    					if_block0.c();
    					if_block0.m(t.parentNode, t);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (!/*noLabel*/ ctx[16] && (/*label*/ ctx[17] != null || /*$$slots*/ ctx[42].label)) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*noLabel, label*/ 196608 | dirty[1] & /*$$slots*/ 2048) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_9(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(62:4) {#if !textarea && variant !== 'outlined'}",
    		ctx
    	});

    	return block;
    }

    // (63:6) {#if variant === 'filled'}
    function create_if_block_10(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", "mdc-text-field__ripple");
    			add_location(span, file$b, 63, 8, 2241);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(63:6) {#if variant === 'filled'}",
    		ctx
    	});

    	return block;
    }

    // (66:6) {#if !noLabel && (label != null || $$slots.label)}
    function create_if_block_9(ctx) {
    	let floatinglabel;
    	let current;

    	const floatinglabel_spread_levels = [
    		{
    			floatAbove: /*focused*/ ctx[28] || /*value*/ ctx[0] != null && /*value*/ ctx[0] !== ''
    		},
    		{ required: /*required*/ ctx[13] },
    		{ wrapped: true },
    		prefixFilter(/*$$restProps*/ ctx[41], 'label$')
    	];

    	let floatinglabel_props = {
    		$$slots: { default: [create_default_slot_7$1] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < floatinglabel_spread_levels.length; i += 1) {
    		floatinglabel_props = assign(floatinglabel_props, floatinglabel_spread_levels[i]);
    	}

    	floatinglabel = new FloatingLabel({
    			props: floatinglabel_props,
    			$$inline: true
    		});

    	/*floatinglabel_binding*/ ctx[52](floatinglabel);

    	const block = {
    		c: function create() {
    			create_component(floatinglabel.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(floatinglabel, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const floatinglabel_changes = (dirty[0] & /*focused, value, required*/ 268443649 | dirty[1] & /*$$restProps*/ 1024)
    			? get_spread_update(floatinglabel_spread_levels, [
    					dirty[0] & /*focused, value*/ 268435457 && {
    						floatAbove: /*focused*/ ctx[28] || /*value*/ ctx[0] != null && /*value*/ ctx[0] !== ''
    					},
    					dirty[0] & /*required*/ 8192 && { required: /*required*/ ctx[13] },
    					floatinglabel_spread_levels[2],
    					dirty[1] & /*$$restProps*/ 1024 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[41], 'label$'))
    				])
    			: {};

    			if (dirty[0] & /*label*/ 131072 | dirty[2] & /*$$scope*/ 268435456) {
    				floatinglabel_changes.$$scope = { dirty, ctx };
    			}

    			floatinglabel.$set(floatinglabel_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(floatinglabel.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(floatinglabel.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*floatinglabel_binding*/ ctx[52](null);
    			destroy_component(floatinglabel, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(66:6) {#if !noLabel && (label != null || $$slots.label)}",
    		ctx
    	});

    	return block;
    }

    // (67:8) <FloatingLabel           bind:this={floatingLabel}           floatAbove={focused || (value != null && value !== '')}           {required}           wrapped           {...prefixFilter($$restProps, 'label$')}           >
    function create_default_slot_7$1(ctx) {
    	let t_value = (/*label*/ ctx[17] == null ? '' : /*label*/ ctx[17]) + "";
    	let t;
    	let current;
    	const label_slot_template = /*#slots*/ ctx[51].label;
    	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[90], get_label_slot_context$2);

    	const block = {
    		c: function create() {
    			t = text(t_value);
    			if (label_slot) label_slot.c();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);

    			if (label_slot) {
    				label_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty[0] & /*label*/ 131072) && t_value !== (t_value = (/*label*/ ctx[17] == null ? '' : /*label*/ ctx[17]) + "")) set_data_dev(t, t_value);

    			if (label_slot) {
    				if (label_slot.p && (!current || dirty[2] & /*$$scope*/ 268435456)) {
    					update_slot_base(
    						label_slot,
    						label_slot_template,
    						ctx,
    						/*$$scope*/ ctx[90],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[90])
    						: get_slot_changes(label_slot_template, /*$$scope*/ ctx[90], dirty, get_label_slot_changes$2),
    						get_label_slot_context$2
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (label_slot) label_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7$1.name,
    		type: "slot",
    		source: "(67:8) <FloatingLabel           bind:this={floatingLabel}           floatAbove={focused || (value != null && value !== '')}           {required}           wrapped           {...prefixFilter($$restProps, 'label$')}           >",
    		ctx
    	});

    	return block;
    }

    // (77:4) {#if textarea || variant === 'outlined'}
    function create_if_block_6$1(ctx) {
    	let notchedoutline;
    	let current;

    	const notchedoutline_spread_levels = [
    		{
    			noLabel: /*noLabel*/ ctx[16] || /*label*/ ctx[17] == null && !/*$$slots*/ ctx[42].label
    		},
    		prefixFilter(/*$$restProps*/ ctx[41], 'outline$')
    	];

    	let notchedoutline_props = {
    		$$slots: { default: [create_default_slot_5$3] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < notchedoutline_spread_levels.length; i += 1) {
    		notchedoutline_props = assign(notchedoutline_props, notchedoutline_spread_levels[i]);
    	}

    	notchedoutline = new NotchedOutline({
    			props: notchedoutline_props,
    			$$inline: true
    		});

    	/*notchedoutline_binding*/ ctx[54](notchedoutline);

    	const block = {
    		c: function create() {
    			create_component(notchedoutline.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(notchedoutline, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const notchedoutline_changes = (dirty[0] & /*noLabel, label*/ 196608 | dirty[1] & /*$$slots, $$restProps*/ 3072)
    			? get_spread_update(notchedoutline_spread_levels, [
    					dirty[0] & /*noLabel, label*/ 196608 | dirty[1] & /*$$slots*/ 2048 && {
    						noLabel: /*noLabel*/ ctx[16] || /*label*/ ctx[17] == null && !/*$$slots*/ ctx[42].label
    					},
    					dirty[1] & /*$$restProps*/ 1024 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[41], 'outline$'))
    				])
    			: {};

    			if (dirty[0] & /*focused, value, required, floatingLabel, label, noLabel*/ 268640289 | dirty[1] & /*$$restProps, $$slots*/ 3072 | dirty[2] & /*$$scope*/ 268435456) {
    				notchedoutline_changes.$$scope = { dirty, ctx };
    			}

    			notchedoutline.$set(notchedoutline_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(notchedoutline.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(notchedoutline.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*notchedoutline_binding*/ ctx[54](null);
    			destroy_component(notchedoutline, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6$1.name,
    		type: "if",
    		source: "(77:4) {#if textarea || variant === 'outlined'}",
    		ctx
    	});

    	return block;
    }

    // (83:8) {#if !noLabel && (label != null || $$slots.label)}
    function create_if_block_7(ctx) {
    	let floatinglabel;
    	let current;

    	const floatinglabel_spread_levels = [
    		{
    			floatAbove: /*focused*/ ctx[28] || /*value*/ ctx[0] != null && /*value*/ ctx[0] !== ''
    		},
    		{ required: /*required*/ ctx[13] },
    		{ wrapped: true },
    		prefixFilter(/*$$restProps*/ ctx[41], 'label$')
    	];

    	let floatinglabel_props = {
    		$$slots: { default: [create_default_slot_6$1] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < floatinglabel_spread_levels.length; i += 1) {
    		floatinglabel_props = assign(floatinglabel_props, floatinglabel_spread_levels[i]);
    	}

    	floatinglabel = new FloatingLabel({
    			props: floatinglabel_props,
    			$$inline: true
    		});

    	/*floatinglabel_binding_1*/ ctx[53](floatinglabel);

    	const block = {
    		c: function create() {
    			create_component(floatinglabel.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(floatinglabel, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const floatinglabel_changes = (dirty[0] & /*focused, value, required*/ 268443649 | dirty[1] & /*$$restProps*/ 1024)
    			? get_spread_update(floatinglabel_spread_levels, [
    					dirty[0] & /*focused, value*/ 268435457 && {
    						floatAbove: /*focused*/ ctx[28] || /*value*/ ctx[0] != null && /*value*/ ctx[0] !== ''
    					},
    					dirty[0] & /*required*/ 8192 && { required: /*required*/ ctx[13] },
    					floatinglabel_spread_levels[2],
    					dirty[1] & /*$$restProps*/ 1024 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[41], 'label$'))
    				])
    			: {};

    			if (dirty[0] & /*label*/ 131072 | dirty[2] & /*$$scope*/ 268435456) {
    				floatinglabel_changes.$$scope = { dirty, ctx };
    			}

    			floatinglabel.$set(floatinglabel_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(floatinglabel.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(floatinglabel.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*floatinglabel_binding_1*/ ctx[53](null);
    			destroy_component(floatinglabel, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(83:8) {#if !noLabel && (label != null || $$slots.label)}",
    		ctx
    	});

    	return block;
    }

    // (84:10) <FloatingLabel             bind:this={floatingLabel}             floatAbove={focused || (value != null && value !== '')}             {required}             wrapped             {...prefixFilter($$restProps, 'label$')}             >
    function create_default_slot_6$1(ctx) {
    	let t_value = (/*label*/ ctx[17] == null ? '' : /*label*/ ctx[17]) + "";
    	let t;
    	let current;
    	const label_slot_template = /*#slots*/ ctx[51].label;
    	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[90], get_label_slot_context_1$1);

    	const block = {
    		c: function create() {
    			t = text(t_value);
    			if (label_slot) label_slot.c();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);

    			if (label_slot) {
    				label_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty[0] & /*label*/ 131072) && t_value !== (t_value = (/*label*/ ctx[17] == null ? '' : /*label*/ ctx[17]) + "")) set_data_dev(t, t_value);

    			if (label_slot) {
    				if (label_slot.p && (!current || dirty[2] & /*$$scope*/ 268435456)) {
    					update_slot_base(
    						label_slot,
    						label_slot_template,
    						ctx,
    						/*$$scope*/ ctx[90],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[90])
    						: get_slot_changes(label_slot_template, /*$$scope*/ ctx[90], dirty, get_label_slot_changes_1$1),
    						get_label_slot_context_1$1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (label_slot) label_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$1.name,
    		type: "slot",
    		source: "(84:10) <FloatingLabel             bind:this={floatingLabel}             floatAbove={focused || (value != null && value !== '')}             {required}             wrapped             {...prefixFilter($$restProps, 'label$')}             >",
    		ctx
    	});

    	return block;
    }

    // (78:6) <NotchedOutline         bind:this={notchedOutline}         noLabel={noLabel || (label == null && !$$slots.label)}         {...prefixFilter($$restProps, 'outline$')}       >
    function create_default_slot_5$3(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = !/*noLabel*/ ctx[16] && (/*label*/ ctx[17] != null || /*$$slots*/ ctx[42].label) && create_if_block_7(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!/*noLabel*/ ctx[16] && (/*label*/ ctx[17] != null || /*$$slots*/ ctx[42].label)) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*noLabel, label*/ 196608 | dirty[1] & /*$$slots*/ 2048) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_7(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$3.name,
    		type: "slot",
    		source: "(78:6) <NotchedOutline         bind:this={notchedOutline}         noLabel={noLabel || (label == null && !$$slots.label)}         {...prefixFilter($$restProps, 'outline$')}       >",
    		ctx
    	});

    	return block;
    }

    // (95:4) <ContextFragment key="SMUI:textfield:icon:leading" value={true}>
    function create_default_slot_4$3(ctx) {
    	let current;
    	const leadingIcon_slot_template = /*#slots*/ ctx[51].leadingIcon;
    	const leadingIcon_slot = create_slot(leadingIcon_slot_template, ctx, /*$$scope*/ ctx[90], get_leadingIcon_slot_context$1);

    	const block = {
    		c: function create() {
    			if (leadingIcon_slot) leadingIcon_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (leadingIcon_slot) {
    				leadingIcon_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (leadingIcon_slot) {
    				if (leadingIcon_slot.p && (!current || dirty[2] & /*$$scope*/ 268435456)) {
    					update_slot_base(
    						leadingIcon_slot,
    						leadingIcon_slot_template,
    						ctx,
    						/*$$scope*/ ctx[90],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[90])
    						: get_slot_changes(leadingIcon_slot_template, /*$$scope*/ ctx[90], dirty, get_leadingIcon_slot_changes$1),
    						get_leadingIcon_slot_context$1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(leadingIcon_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(leadingIcon_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (leadingIcon_slot) leadingIcon_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$3.name,
    		type: "slot",
    		source: "(95:4) <ContextFragment key=\\\"SMUI:textfield:icon:leading\\\" value={true}>",
    		ctx
    	});

    	return block;
    }

    // (124:4) {:else}
    function create_else_block$2(ctx) {
    	let t0;
    	let t1;
    	let input_1;
    	let updating_value;
    	let updating_files;
    	let updating_dirty;
    	let updating_invalid;
    	let t2;
    	let t3;
    	let current;
    	const prefix_slot_template = /*#slots*/ ctx[51].prefix;
    	const prefix_slot = create_slot(prefix_slot_template, ctx, /*$$scope*/ ctx[90], get_prefix_slot_context);
    	let if_block0 = /*prefix*/ ctx[20] != null && create_if_block_5$1(ctx);

    	const input_1_spread_levels = [
    		{ type: /*type*/ ctx[18] },
    		{ disabled: /*disabled*/ ctx[12] },
    		{ required: /*required*/ ctx[13] },
    		{ updateInvalid: /*updateInvalid*/ ctx[19] },
    		{ "aria-controls": /*helperId*/ ctx[27] },
    		{ "aria-describedby": /*helperId*/ ctx[27] },
    		/*noLabel*/ ctx[16] && /*label*/ ctx[17] != null
    		? { placeholder: /*label*/ ctx[17] }
    		: {},
    		prefixFilter(/*$$restProps*/ ctx[41], 'input$')
    	];

    	function input_1_value_binding(value) {
    		/*input_1_value_binding*/ ctx[64](value);
    	}

    	function input_1_files_binding(value) {
    		/*input_1_files_binding*/ ctx[65](value);
    	}

    	function input_1_dirty_binding(value) {
    		/*input_1_dirty_binding*/ ctx[66](value);
    	}

    	function input_1_invalid_binding(value) {
    		/*input_1_invalid_binding*/ ctx[67](value);
    	}

    	let input_1_props = {};

    	for (let i = 0; i < input_1_spread_levels.length; i += 1) {
    		input_1_props = assign(input_1_props, input_1_spread_levels[i]);
    	}

    	if (/*value*/ ctx[0] !== void 0) {
    		input_1_props.value = /*value*/ ctx[0];
    	}

    	if (/*files*/ ctx[3] !== void 0) {
    		input_1_props.files = /*files*/ ctx[3];
    	}

    	if (/*dirty*/ ctx[4] !== void 0) {
    		input_1_props.dirty = /*dirty*/ ctx[4];
    	}

    	if (/*invalid*/ ctx[1] !== void 0) {
    		input_1_props.invalid = /*invalid*/ ctx[1];
    	}

    	input_1 = new Input({ props: input_1_props, $$inline: true });
    	/*input_1_binding*/ ctx[63](input_1);
    	binding_callbacks.push(() => bind(input_1, 'value', input_1_value_binding));
    	binding_callbacks.push(() => bind(input_1, 'files', input_1_files_binding));
    	binding_callbacks.push(() => bind(input_1, 'dirty', input_1_dirty_binding));
    	binding_callbacks.push(() => bind(input_1, 'invalid', input_1_invalid_binding));
    	input_1.$on("blur", /*blur_handler_2*/ ctx[68]);
    	input_1.$on("focus", /*focus_handler_2*/ ctx[69]);
    	input_1.$on("blur", /*blur_handler_3*/ ctx[70]);
    	input_1.$on("focus", /*focus_handler_3*/ ctx[71]);
    	let if_block1 = /*suffix*/ ctx[21] != null && create_if_block_4$2(ctx);
    	const suffix_slot_template = /*#slots*/ ctx[51].suffix;
    	const suffix_slot = create_slot(suffix_slot_template, ctx, /*$$scope*/ ctx[90], get_suffix_slot_context);

    	const block = {
    		c: function create() {
    			if (prefix_slot) prefix_slot.c();
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			create_component(input_1.$$.fragment);
    			t2 = space();
    			if (if_block1) if_block1.c();
    			t3 = space();
    			if (suffix_slot) suffix_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (prefix_slot) {
    				prefix_slot.m(target, anchor);
    			}

    			insert_dev(target, t0, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(input_1, target, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t3, anchor);

    			if (suffix_slot) {
    				suffix_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (prefix_slot) {
    				if (prefix_slot.p && (!current || dirty[2] & /*$$scope*/ 268435456)) {
    					update_slot_base(
    						prefix_slot,
    						prefix_slot_template,
    						ctx,
    						/*$$scope*/ ctx[90],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[90])
    						: get_slot_changes(prefix_slot_template, /*$$scope*/ ctx[90], dirty, get_prefix_slot_changes),
    						get_prefix_slot_context
    					);
    				}
    			}

    			if (/*prefix*/ ctx[20] != null) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*prefix*/ 1048576) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_5$1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t1.parentNode, t1);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			const input_1_changes = (dirty[0] & /*type, disabled, required, updateInvalid, helperId, noLabel, label*/ 135213056 | dirty[1] & /*$$restProps*/ 1024)
    			? get_spread_update(input_1_spread_levels, [
    					dirty[0] & /*type*/ 262144 && { type: /*type*/ ctx[18] },
    					dirty[0] & /*disabled*/ 4096 && { disabled: /*disabled*/ ctx[12] },
    					dirty[0] & /*required*/ 8192 && { required: /*required*/ ctx[13] },
    					dirty[0] & /*updateInvalid*/ 524288 && { updateInvalid: /*updateInvalid*/ ctx[19] },
    					dirty[0] & /*helperId*/ 134217728 && { "aria-controls": /*helperId*/ ctx[27] },
    					dirty[0] & /*helperId*/ 134217728 && { "aria-describedby": /*helperId*/ ctx[27] },
    					dirty[0] & /*noLabel, label*/ 196608 && get_spread_object(/*noLabel*/ ctx[16] && /*label*/ ctx[17] != null
    					? { placeholder: /*label*/ ctx[17] }
    					: {}),
    					dirty[1] & /*$$restProps*/ 1024 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[41], 'input$'))
    				])
    			: {};

    			if (!updating_value && dirty[0] & /*value*/ 1) {
    				updating_value = true;
    				input_1_changes.value = /*value*/ ctx[0];
    				add_flush_callback(() => updating_value = false);
    			}

    			if (!updating_files && dirty[0] & /*files*/ 8) {
    				updating_files = true;
    				input_1_changes.files = /*files*/ ctx[3];
    				add_flush_callback(() => updating_files = false);
    			}

    			if (!updating_dirty && dirty[0] & /*dirty*/ 16) {
    				updating_dirty = true;
    				input_1_changes.dirty = /*dirty*/ ctx[4];
    				add_flush_callback(() => updating_dirty = false);
    			}

    			if (!updating_invalid && dirty[0] & /*invalid*/ 2) {
    				updating_invalid = true;
    				input_1_changes.invalid = /*invalid*/ ctx[1];
    				add_flush_callback(() => updating_invalid = false);
    			}

    			input_1.$set(input_1_changes);

    			if (/*suffix*/ ctx[21] != null) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*suffix*/ 2097152) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_4$2(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t3.parentNode, t3);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (suffix_slot) {
    				if (suffix_slot.p && (!current || dirty[2] & /*$$scope*/ 268435456)) {
    					update_slot_base(
    						suffix_slot,
    						suffix_slot_template,
    						ctx,
    						/*$$scope*/ ctx[90],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[90])
    						: get_slot_changes(suffix_slot_template, /*$$scope*/ ctx[90], dirty, get_suffix_slot_changes),
    						get_suffix_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(prefix_slot, local);
    			transition_in(if_block0);
    			transition_in(input_1.$$.fragment, local);
    			transition_in(if_block1);
    			transition_in(suffix_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(prefix_slot, local);
    			transition_out(if_block0);
    			transition_out(input_1.$$.fragment, local);
    			transition_out(if_block1);
    			transition_out(suffix_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (prefix_slot) prefix_slot.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t1);
    			/*input_1_binding*/ ctx[63](null);
    			destroy_component(input_1, detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t3);
    			if (suffix_slot) suffix_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(124:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (99:4) {#if textarea && typeof value === 'string'}
    function create_if_block_3$2(ctx) {
    	let span;
    	let textarea_1;
    	let updating_value;
    	let updating_dirty;
    	let updating_invalid;
    	let t;
    	let span_class_value;
    	let current;

    	const textarea_1_spread_levels = [
    		{ disabled: /*disabled*/ ctx[12] },
    		{ required: /*required*/ ctx[13] },
    		{ updateInvalid: /*updateInvalid*/ ctx[19] },
    		{ "aria-controls": /*helperId*/ ctx[27] },
    		{ "aria-describedby": /*helperId*/ ctx[27] },
    		prefixFilter(/*$$restProps*/ ctx[41], 'input$')
    	];

    	function textarea_1_value_binding(value) {
    		/*textarea_1_value_binding*/ ctx[56](value);
    	}

    	function textarea_1_dirty_binding(value) {
    		/*textarea_1_dirty_binding*/ ctx[57](value);
    	}

    	function textarea_1_invalid_binding(value) {
    		/*textarea_1_invalid_binding*/ ctx[58](value);
    	}

    	let textarea_1_props = {};

    	for (let i = 0; i < textarea_1_spread_levels.length; i += 1) {
    		textarea_1_props = assign(textarea_1_props, textarea_1_spread_levels[i]);
    	}

    	if (/*value*/ ctx[0] !== void 0) {
    		textarea_1_props.value = /*value*/ ctx[0];
    	}

    	if (/*dirty*/ ctx[4] !== void 0) {
    		textarea_1_props.dirty = /*dirty*/ ctx[4];
    	}

    	if (/*invalid*/ ctx[1] !== void 0) {
    		textarea_1_props.invalid = /*invalid*/ ctx[1];
    	}

    	textarea_1 = new Textarea({ props: textarea_1_props, $$inline: true });
    	/*textarea_1_binding*/ ctx[55](textarea_1);
    	binding_callbacks.push(() => bind(textarea_1, 'value', textarea_1_value_binding));
    	binding_callbacks.push(() => bind(textarea_1, 'dirty', textarea_1_dirty_binding));
    	binding_callbacks.push(() => bind(textarea_1, 'invalid', textarea_1_invalid_binding));
    	textarea_1.$on("blur", /*blur_handler*/ ctx[59]);
    	textarea_1.$on("focus", /*focus_handler*/ ctx[60]);
    	textarea_1.$on("blur", /*blur_handler_1*/ ctx[61]);
    	textarea_1.$on("focus", /*focus_handler_1*/ ctx[62]);
    	const internalCounter_slot_template = /*#slots*/ ctx[51].internalCounter;
    	const internalCounter_slot = create_slot(internalCounter_slot_template, ctx, /*$$scope*/ ctx[90], get_internalCounter_slot_context);

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(textarea_1.$$.fragment);
    			t = space();
    			if (internalCounter_slot) internalCounter_slot.c();

    			attr_dev(span, "class", span_class_value = classMap({
    				'mdc-text-field__resizer': !('input$resizable' in /*$$restProps*/ ctx[41]) || /*$$restProps*/ ctx[41].input$resizable
    			}));

    			add_location(span, file$b, 99, 6, 3514);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(textarea_1, span, null);
    			append_dev(span, t);

    			if (internalCounter_slot) {
    				internalCounter_slot.m(span, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const textarea_1_changes = (dirty[0] & /*disabled, required, updateInvalid, helperId*/ 134754304 | dirty[1] & /*$$restProps*/ 1024)
    			? get_spread_update(textarea_1_spread_levels, [
    					dirty[0] & /*disabled*/ 4096 && { disabled: /*disabled*/ ctx[12] },
    					dirty[0] & /*required*/ 8192 && { required: /*required*/ ctx[13] },
    					dirty[0] & /*updateInvalid*/ 524288 && { updateInvalid: /*updateInvalid*/ ctx[19] },
    					dirty[0] & /*helperId*/ 134217728 && { "aria-controls": /*helperId*/ ctx[27] },
    					dirty[0] & /*helperId*/ 134217728 && { "aria-describedby": /*helperId*/ ctx[27] },
    					dirty[1] & /*$$restProps*/ 1024 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[41], 'input$'))
    				])
    			: {};

    			if (!updating_value && dirty[0] & /*value*/ 1) {
    				updating_value = true;
    				textarea_1_changes.value = /*value*/ ctx[0];
    				add_flush_callback(() => updating_value = false);
    			}

    			if (!updating_dirty && dirty[0] & /*dirty*/ 16) {
    				updating_dirty = true;
    				textarea_1_changes.dirty = /*dirty*/ ctx[4];
    				add_flush_callback(() => updating_dirty = false);
    			}

    			if (!updating_invalid && dirty[0] & /*invalid*/ 2) {
    				updating_invalid = true;
    				textarea_1_changes.invalid = /*invalid*/ ctx[1];
    				add_flush_callback(() => updating_invalid = false);
    			}

    			textarea_1.$set(textarea_1_changes);

    			if (internalCounter_slot) {
    				if (internalCounter_slot.p && (!current || dirty[2] & /*$$scope*/ 268435456)) {
    					update_slot_base(
    						internalCounter_slot,
    						internalCounter_slot_template,
    						ctx,
    						/*$$scope*/ ctx[90],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[90])
    						: get_slot_changes(internalCounter_slot_template, /*$$scope*/ ctx[90], dirty, get_internalCounter_slot_changes),
    						get_internalCounter_slot_context
    					);
    				}
    			}

    			if (!current || dirty[1] & /*$$restProps*/ 1024 && span_class_value !== (span_class_value = classMap({
    				'mdc-text-field__resizer': !('input$resizable' in /*$$restProps*/ ctx[41]) || /*$$restProps*/ ctx[41].input$resizable
    			}))) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textarea_1.$$.fragment, local);
    			transition_in(internalCounter_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textarea_1.$$.fragment, local);
    			transition_out(internalCounter_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			/*textarea_1_binding*/ ctx[55](null);
    			destroy_component(textarea_1);
    			if (internalCounter_slot) internalCounter_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$2.name,
    		type: "if",
    		source: "(99:4) {#if textarea && typeof value === 'string'}",
    		ctx
    	});

    	return block;
    }

    // (126:6) {#if prefix != null}
    function create_if_block_5$1(ctx) {
    	let prefix_1;
    	let current;

    	prefix_1 = new Prefix({
    			props: {
    				$$slots: { default: [create_default_slot_3$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(prefix_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(prefix_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const prefix_1_changes = {};

    			if (dirty[0] & /*prefix*/ 1048576 | dirty[2] & /*$$scope*/ 268435456) {
    				prefix_1_changes.$$scope = { dirty, ctx };
    			}

    			prefix_1.$set(prefix_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(prefix_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(prefix_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(prefix_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$1.name,
    		type: "if",
    		source: "(126:6) {#if prefix != null}",
    		ctx
    	});

    	return block;
    }

    // (127:8) <Prefix>
    function create_default_slot_3$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*prefix*/ ctx[20]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*prefix*/ 1048576) set_data_dev(t, /*prefix*/ ctx[20]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$3.name,
    		type: "slot",
    		source: "(127:8) <Prefix>",
    		ctx
    	});

    	return block;
    }

    // (148:6) {#if suffix != null}
    function create_if_block_4$2(ctx) {
    	let suffix_1;
    	let current;

    	suffix_1 = new Suffix({
    			props: {
    				$$slots: { default: [create_default_slot_2$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(suffix_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(suffix_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const suffix_1_changes = {};

    			if (dirty[0] & /*suffix*/ 2097152 | dirty[2] & /*$$scope*/ 268435456) {
    				suffix_1_changes.$$scope = { dirty, ctx };
    			}

    			suffix_1.$set(suffix_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(suffix_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(suffix_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(suffix_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$2.name,
    		type: "if",
    		source: "(148:6) {#if suffix != null}",
    		ctx
    	});

    	return block;
    }

    // (149:8) <Suffix>
    function create_default_slot_2$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*suffix*/ ctx[21]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*suffix*/ 2097152) set_data_dev(t, /*suffix*/ ctx[21]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(149:8) <Suffix>",
    		ctx
    	});

    	return block;
    }

    // (153:4) <ContextFragment key="SMUI:textfield:icon:leading" value={false}>
    function create_default_slot_1$3(ctx) {
    	let current;
    	const trailingIcon_slot_template = /*#slots*/ ctx[51].trailingIcon;
    	const trailingIcon_slot = create_slot(trailingIcon_slot_template, ctx, /*$$scope*/ ctx[90], get_trailingIcon_slot_context);

    	const block = {
    		c: function create() {
    			if (trailingIcon_slot) trailingIcon_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (trailingIcon_slot) {
    				trailingIcon_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (trailingIcon_slot) {
    				if (trailingIcon_slot.p && (!current || dirty[2] & /*$$scope*/ 268435456)) {
    					update_slot_base(
    						trailingIcon_slot,
    						trailingIcon_slot_template,
    						ctx,
    						/*$$scope*/ ctx[90],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[90])
    						: get_slot_changes(trailingIcon_slot_template, /*$$scope*/ ctx[90], dirty, get_trailingIcon_slot_changes),
    						get_trailingIcon_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(trailingIcon_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(trailingIcon_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (trailingIcon_slot) trailingIcon_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(153:4) <ContextFragment key=\\\"SMUI:textfield:icon:leading\\\" value={false}>",
    		ctx
    	});

    	return block;
    }

    // (156:4) {#if !textarea && variant !== 'outlined' && ripple}
    function create_if_block_2$2(ctx) {
    	let lineripple;
    	let current;
    	const lineripple_spread_levels = [prefixFilter(/*$$restProps*/ ctx[41], 'ripple$')];
    	let lineripple_props = {};

    	for (let i = 0; i < lineripple_spread_levels.length; i += 1) {
    		lineripple_props = assign(lineripple_props, lineripple_spread_levels[i]);
    	}

    	lineripple = new LineRipple({ props: lineripple_props, $$inline: true });
    	/*lineripple_binding*/ ctx[72](lineripple);

    	const block = {
    		c: function create() {
    			create_component(lineripple.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(lineripple, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const lineripple_changes = (dirty[1] & /*$$restProps*/ 1024)
    			? get_spread_update(lineripple_spread_levels, [get_spread_object(prefixFilter(/*$$restProps*/ ctx[41], 'ripple$'))])
    			: {};

    			lineripple.$set(lineripple_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(lineripple.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(lineripple.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*lineripple_binding*/ ctx[72](null);
    			destroy_component(lineripple, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(156:4) {#if !textarea && variant !== 'outlined' && ripple}",
    		ctx
    	});

    	return block;
    }

    // (217:0) {#if $$slots.helper}
    function create_if_block$4(ctx) {
    	let helperline;
    	let current;
    	const helperline_spread_levels = [prefixFilter(/*$$restProps*/ ctx[41], 'helperLine$')];

    	let helperline_props = {
    		$$slots: { default: [create_default_slot$7] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < helperline_spread_levels.length; i += 1) {
    		helperline_props = assign(helperline_props, helperline_spread_levels[i]);
    	}

    	helperline = new HelperLine({ props: helperline_props, $$inline: true });
    	helperline.$on("SMUITextfieldHelperText:id", /*SMUITextfieldHelperText_id_handler*/ ctx[85]);
    	helperline.$on("SMUITextfieldHelperText:mount", /*SMUITextfieldHelperText_mount_handler*/ ctx[86]);
    	helperline.$on("SMUITextfieldHelperText:unmount", /*SMUITextfieldHelperText_unmount_handler*/ ctx[87]);
    	helperline.$on("SMUITextfieldCharacterCounter:mount", /*SMUITextfieldCharacterCounter_mount_handler_1*/ ctx[88]);
    	helperline.$on("SMUITextfieldCharacterCounter:unmount", /*SMUITextfieldCharacterCounter_unmount_handler_1*/ ctx[89]);

    	const block = {
    		c: function create() {
    			create_component(helperline.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(helperline, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const helperline_changes = (dirty[1] & /*$$restProps*/ 1024)
    			? get_spread_update(helperline_spread_levels, [get_spread_object(prefixFilter(/*$$restProps*/ ctx[41], 'helperLine$'))])
    			: {};

    			if (dirty[2] & /*$$scope*/ 268435456) {
    				helperline_changes.$$scope = { dirty, ctx };
    			}

    			helperline.$set(helperline_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(helperline.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(helperline.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(helperline, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(217:0) {#if $$slots.helper}",
    		ctx
    	});

    	return block;
    }

    // (218:2) <HelperLine     on:SMUITextfieldHelperText:id={(event) => (helperId = event.detail)}     on:SMUITextfieldHelperText:mount={(event) => (helperText = event.detail)}     on:SMUITextfieldHelperText:unmount={() => {       helperId = undefined;       helperText = undefined;     }}     on:SMUITextfieldCharacterCounter:mount={(event) =>       (characterCounter = event.detail)}     on:SMUITextfieldCharacterCounter:unmount={() =>       (characterCounter = undefined)}     {...prefixFilter($$restProps, 'helperLine$')}     >
    function create_default_slot$7(ctx) {
    	let current;
    	const helper_slot_template = /*#slots*/ ctx[51].helper;
    	const helper_slot = create_slot(helper_slot_template, ctx, /*$$scope*/ ctx[90], get_helper_slot_context);

    	const block = {
    		c: function create() {
    			if (helper_slot) helper_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (helper_slot) {
    				helper_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (helper_slot) {
    				if (helper_slot.p && (!current || dirty[2] & /*$$scope*/ 268435456)) {
    					update_slot_base(
    						helper_slot,
    						helper_slot_template,
    						ctx,
    						/*$$scope*/ ctx[90],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[90])
    						: get_slot_changes(helper_slot_template, /*$$scope*/ ctx[90], dirty, get_helper_slot_changes),
    						get_helper_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(helper_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(helper_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (helper_slot) helper_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$7.name,
    		type: "slot",
    		source: "(218:2) <HelperLine     on:SMUITextfieldHelperText:id={(event) => (helperId = event.detail)}     on:SMUITextfieldHelperText:mount={(event) => (helperText = event.detail)}     on:SMUITextfieldHelperText:unmount={() => {       helperId = undefined;       helperText = undefined;     }}     on:SMUITextfieldCharacterCounter:mount={(event) =>       (characterCounter = event.detail)}     on:SMUITextfieldCharacterCounter:unmount={() =>       (characterCounter = undefined)}     {...prefixFilter($$restProps, 'helperLine$')}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let current_block_type_index;
    	let if_block0;
    	let t;
    	let if_block1_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$2, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*valued*/ ctx[36]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	let if_block1 = /*$$slots*/ ctx[42].helper && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if_block0.p(ctx, dirty);

    			if (/*$$slots*/ ctx[42].helper) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[1] & /*$$slots*/ 2048) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$4(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(t);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func$4 = ([name, value]) => `${name}: ${value};`;
    const func_1 = ([name, value]) => `${name}: ${value};`;

    function instance_1$8($$self, $$props, $$invalidate) {
    	let inputElement;

    	const omit_props_names = [
    		"use","class","style","ripple","disabled","required","textarea","variant","noLabel","label","type","value","files","invalid","updateInvalid","dirty","prefix","suffix","validateOnValueChange","useNativeValidation","withLeadingIcon","withTrailingIcon","input","floatingLabel","lineRipple","notchedOutline","focus","blur","layout","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;

    	validate_slots('Textfield', slots, [
    		'label','leadingIcon','default','internalCounter','prefix','suffix','trailingIcon','ripple','helper'
    	]);

    	const $$slots = compute_slots(slots);
    	const { applyPassive } = events;
    	const forwardEvents = forwardEventsBuilder(get_current_component());

    	let uninitializedValue = () => {
    		
    	};

    	function isUninitializedValue(value) {
    		return value === uninitializedValue;
    	}

    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { style = '' } = $$props;
    	let { ripple = true } = $$props;
    	let { disabled = false } = $$props;
    	let { required = false } = $$props;
    	let { textarea = false } = $$props;
    	let { variant = textarea ? 'outlined' : 'standard' } = $$props;
    	let { noLabel = false } = $$props;
    	let { label = undefined } = $$props;
    	let { type = 'text' } = $$props;

    	let { value = $$restProps.input$emptyValueUndefined
    	? undefined
    	: uninitializedValue } = $$props;

    	let { files = uninitializedValue } = $$props;
    	const valued = !isUninitializedValue(value) || !isUninitializedValue(files);

    	if (isUninitializedValue(value)) {
    		value = undefined;
    	}

    	if (isUninitializedValue(files)) {
    		files = null;
    	}

    	let { invalid = uninitializedValue } = $$props;
    	let { updateInvalid = isUninitializedValue(invalid) } = $$props;

    	if (isUninitializedValue(invalid)) {
    		invalid = false;
    	}

    	let { dirty = false } = $$props;
    	let { prefix = undefined } = $$props;
    	let { suffix = undefined } = $$props;
    	let { validateOnValueChange = updateInvalid } = $$props;
    	let { useNativeValidation = updateInvalid } = $$props;
    	let { withLeadingIcon = uninitializedValue } = $$props;
    	let { withTrailingIcon = uninitializedValue } = $$props;
    	let { input = undefined } = $$props;
    	let { floatingLabel = undefined } = $$props;
    	let { lineRipple = undefined } = $$props;
    	let { notchedOutline = undefined } = $$props;
    	let element;
    	let instance;
    	let internalClasses = {};
    	let internalStyles = {};
    	let helperId = undefined;
    	let focused = false;
    	let addLayoutListener = getContext('SMUI:addLayoutListener');
    	let removeLayoutListener;
    	let initPromiseResolve;
    	let initPromise = new Promise(resolve => initPromiseResolve = resolve);

    	// These are instances, not accessors.
    	let leadingIcon = undefined;

    	let trailingIcon = undefined;
    	let helperText = undefined;
    	let characterCounter = undefined;

    	// React to changes of value from outside component.
    	let previousValue = value;

    	if (addLayoutListener) {
    		removeLayoutListener = addLayoutListener(layout);
    	}

    	onMount(() => {
    		$$invalidate(49, instance = new MDCTextFieldFoundation({
    				// getRootAdapterMethods_
    				addClass,
    				removeClass,
    				hasClass,
    				registerTextFieldInteractionHandler: (evtType, handler) => getElement().addEventListener(evtType, handler),
    				deregisterTextFieldInteractionHandler: (evtType, handler) => getElement().removeEventListener(evtType, handler),
    				registerValidationAttributeChangeHandler: handler => {
    					const getAttributesList = mutationsList => {
    						return mutationsList.map(mutation => mutation.attributeName).filter(attributeName => attributeName);
    					};

    					const observer = new MutationObserver(mutationsList => {
    							if (useNativeValidation) {
    								handler(getAttributesList(mutationsList));
    							}
    						});

    					const config = { attributes: true };

    					if (input) {
    						observer.observe(input.getElement(), config);
    					}

    					return observer;
    				},
    				deregisterValidationAttributeChangeHandler: observer => {
    					observer.disconnect();
    				},
    				// getInputAdapterMethods_
    				getNativeInput: () => {
    					var _a;

    					return (_a = input === null || input === void 0
    					? void 0
    					: input.getElement()) !== null && _a !== void 0
    					? _a
    					: null;
    				},
    				setInputAttr: (name, value) => {
    					input === null || input === void 0
    					? void 0
    					: input.addAttr(name, value);
    				},
    				removeInputAttr: name => {
    					input === null || input === void 0
    					? void 0
    					: input.removeAttr(name);
    				},
    				isFocused: () => document.activeElement === (input === null || input === void 0
    				? void 0
    				: input.getElement()),
    				registerInputInteractionHandler: (evtType, handler) => {
    					input === null || input === void 0
    					? void 0
    					: input.getElement().addEventListener(evtType, handler, applyPassive());
    				},
    				deregisterInputInteractionHandler: (evtType, handler) => {
    					input === null || input === void 0
    					? void 0
    					: input.getElement().removeEventListener(evtType, handler, applyPassive());
    				},
    				// getLabelAdapterMethods_
    				floatLabel: shouldFloat => floatingLabel && floatingLabel.float(shouldFloat),
    				getLabelWidth: () => floatingLabel ? floatingLabel.getWidth() : 0,
    				hasLabel: () => !!floatingLabel,
    				shakeLabel: shouldShake => floatingLabel && floatingLabel.shake(shouldShake),
    				setLabelRequired: isRequired => floatingLabel && floatingLabel.setRequired(isRequired),
    				// getLineRippleAdapterMethods_
    				activateLineRipple: () => lineRipple && lineRipple.activate(),
    				deactivateLineRipple: () => lineRipple && lineRipple.deactivate(),
    				setLineRippleTransformOrigin: normalizedX => lineRipple && lineRipple.setRippleCenter(normalizedX),
    				// getOutlineAdapterMethods_
    				closeOutline: () => notchedOutline && notchedOutline.closeNotch(),
    				hasOutline: () => !!notchedOutline,
    				notchOutline: labelWidth => notchedOutline && notchedOutline.notch(labelWidth)
    			},
    		{
    				get helperText() {
    					return helperText;
    				},
    				get characterCounter() {
    					return characterCounter;
    				},
    				get leadingIcon() {
    					return leadingIcon;
    				},
    				get trailingIcon() {
    					return trailingIcon;
    				}
    			}));

    		if (valued) {
    			if (input == null) {
    				throw new Error('SMUI Textfield initialized without Input component.');
    			}

    			instance.init();
    		} else {
    			tick().then(() => {
    				if (input == null) {
    					throw new Error('SMUI Textfield initialized without Input component.');
    				}

    				instance.init();
    			});
    		}

    		initPromiseResolve();

    		return () => {
    			instance.destroy();
    		};
    	});

    	onDestroy(() => {
    		if (removeLayoutListener) {
    			removeLayoutListener();
    		}
    	});

    	function hasClass(className) {
    		var _a;

    		return className in internalClasses
    		? (_a = internalClasses[className]) !== null && _a !== void 0
    			? _a
    			: null
    		: getElement().classList.contains(className);
    	}

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(25, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(25, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function addStyle(name, value) {
    		if (internalStyles[name] != value) {
    			if (value === '' || value == null) {
    				delete internalStyles[name];
    				$$invalidate(26, internalStyles);
    			} else {
    				$$invalidate(26, internalStyles[name] = value, internalStyles);
    			}
    		}
    	}

    	function focus() {
    		input === null || input === void 0
    		? void 0
    		: input.focus();
    	}

    	function blur() {
    		input === null || input === void 0
    		? void 0
    		: input.blur();
    	}

    	function layout() {
    		if (instance) {
    			const openNotch = instance.shouldFloat;
    			instance.notchOutline(openNotch);
    		}
    	}

    	function getElement() {
    		return element;
    	}

    	function floatinglabel_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			floatingLabel = $$value;
    			$$invalidate(5, floatingLabel);
    		});
    	}

    	function floatinglabel_binding_1($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			floatingLabel = $$value;
    			$$invalidate(5, floatingLabel);
    		});
    	}

    	function notchedoutline_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			notchedOutline = $$value;
    			$$invalidate(7, notchedOutline);
    		});
    	}

    	function textarea_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			input = $$value;
    			$$invalidate(2, input);
    		});
    	}

    	function textarea_1_value_binding(value$1) {
    		value = value$1;
    		$$invalidate(0, value);
    	}

    	function textarea_1_dirty_binding(value) {
    		dirty = value;
    		$$invalidate(4, dirty);
    	}

    	function textarea_1_invalid_binding(value) {
    		invalid = value;
    		(($$invalidate(1, invalid), $$invalidate(49, instance)), $$invalidate(19, updateInvalid));
    	}

    	const blur_handler = () => $$invalidate(28, focused = false);
    	const focus_handler = () => $$invalidate(28, focused = true);
    	const blur_handler_1 = event => dispatch(element, 'blur', event);
    	const focus_handler_1 = event => dispatch(element, 'focus', event);

    	function input_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			input = $$value;
    			$$invalidate(2, input);
    		});
    	}

    	function input_1_value_binding(value$1) {
    		value = value$1;
    		$$invalidate(0, value);
    	}

    	function input_1_files_binding(value) {
    		files = value;
    		$$invalidate(3, files);
    	}

    	function input_1_dirty_binding(value) {
    		dirty = value;
    		$$invalidate(4, dirty);
    	}

    	function input_1_invalid_binding(value) {
    		invalid = value;
    		(($$invalidate(1, invalid), $$invalidate(49, instance)), $$invalidate(19, updateInvalid));
    	}

    	const blur_handler_2 = () => $$invalidate(28, focused = false);
    	const focus_handler_2 = () => $$invalidate(28, focused = true);
    	const blur_handler_3 = event => dispatch(element, 'blur', event);
    	const focus_handler_3 = event => dispatch(element, 'focus', event);

    	function lineripple_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			lineRipple = $$value;
    			$$invalidate(6, lineRipple);
    		});
    	}

    	function label_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(24, element);
    		});
    	}

    	const SMUITextfieldLeadingIcon_mount_handler = event => $$invalidate(29, leadingIcon = event.detail);
    	const SMUITextfieldLeadingIcon_unmount_handler = () => $$invalidate(29, leadingIcon = undefined);
    	const SMUITextfieldTrailingIcon_mount_handler = event => $$invalidate(30, trailingIcon = event.detail);
    	const SMUITextfieldTrailingIcon_unmount_handler = () => $$invalidate(30, trailingIcon = undefined);
    	const SMUITextfieldCharacterCounter_mount_handler = event => $$invalidate(32, characterCounter = event.detail);
    	const SMUITextfieldCharacterCounter_unmount_handler = () => $$invalidate(32, characterCounter = undefined);

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(24, element);
    		});
    	}

    	const SMUITextfieldLeadingIcon_mount_handler_1 = event => $$invalidate(29, leadingIcon = event.detail);
    	const SMUITextfieldLeadingIcon_unmount_handler_1 = () => $$invalidate(29, leadingIcon = undefined);
    	const SMUITextfieldTrailingIcon_mount_handler_1 = event => $$invalidate(30, trailingIcon = event.detail);
    	const SMUITextfieldTrailingIcon_unmount_handler_1 = () => $$invalidate(30, trailingIcon = undefined);
    	const SMUITextfieldHelperText_id_handler = event => $$invalidate(27, helperId = event.detail);
    	const SMUITextfieldHelperText_mount_handler = event => $$invalidate(31, helperText = event.detail);

    	const SMUITextfieldHelperText_unmount_handler = () => {
    		$$invalidate(27, helperId = undefined);
    		$$invalidate(31, helperText = undefined);
    	};

    	const SMUITextfieldCharacterCounter_mount_handler_1 = event => $$invalidate(32, characterCounter = event.detail);
    	const SMUITextfieldCharacterCounter_unmount_handler_1 = () => $$invalidate(32, characterCounter = undefined);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(41, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(8, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(9, className = $$new_props.class);
    		if ('style' in $$new_props) $$invalidate(10, style = $$new_props.style);
    		if ('ripple' in $$new_props) $$invalidate(11, ripple = $$new_props.ripple);
    		if ('disabled' in $$new_props) $$invalidate(12, disabled = $$new_props.disabled);
    		if ('required' in $$new_props) $$invalidate(13, required = $$new_props.required);
    		if ('textarea' in $$new_props) $$invalidate(14, textarea = $$new_props.textarea);
    		if ('variant' in $$new_props) $$invalidate(15, variant = $$new_props.variant);
    		if ('noLabel' in $$new_props) $$invalidate(16, noLabel = $$new_props.noLabel);
    		if ('label' in $$new_props) $$invalidate(17, label = $$new_props.label);
    		if ('type' in $$new_props) $$invalidate(18, type = $$new_props.type);
    		if ('value' in $$new_props) $$invalidate(0, value = $$new_props.value);
    		if ('files' in $$new_props) $$invalidate(3, files = $$new_props.files);
    		if ('invalid' in $$new_props) $$invalidate(1, invalid = $$new_props.invalid);
    		if ('updateInvalid' in $$new_props) $$invalidate(19, updateInvalid = $$new_props.updateInvalid);
    		if ('dirty' in $$new_props) $$invalidate(4, dirty = $$new_props.dirty);
    		if ('prefix' in $$new_props) $$invalidate(20, prefix = $$new_props.prefix);
    		if ('suffix' in $$new_props) $$invalidate(21, suffix = $$new_props.suffix);
    		if ('validateOnValueChange' in $$new_props) $$invalidate(43, validateOnValueChange = $$new_props.validateOnValueChange);
    		if ('useNativeValidation' in $$new_props) $$invalidate(44, useNativeValidation = $$new_props.useNativeValidation);
    		if ('withLeadingIcon' in $$new_props) $$invalidate(22, withLeadingIcon = $$new_props.withLeadingIcon);
    		if ('withTrailingIcon' in $$new_props) $$invalidate(23, withTrailingIcon = $$new_props.withTrailingIcon);
    		if ('input' in $$new_props) $$invalidate(2, input = $$new_props.input);
    		if ('floatingLabel' in $$new_props) $$invalidate(5, floatingLabel = $$new_props.floatingLabel);
    		if ('lineRipple' in $$new_props) $$invalidate(6, lineRipple = $$new_props.lineRipple);
    		if ('notchedOutline' in $$new_props) $$invalidate(7, notchedOutline = $$new_props.notchedOutline);
    		if ('$$scope' in $$new_props) $$invalidate(90, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		MDCTextFieldFoundation,
    		events,
    		onMount,
    		onDestroy,
    		getContext,
    		tick,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		exclude,
    		prefixFilter,
    		useActions,
    		dispatch,
    		ContextFragment,
    		Ripple,
    		FloatingLabel,
    		LineRipple,
    		NotchedOutline,
    		HelperLine,
    		Prefix,
    		Suffix,
    		Input,
    		Textarea,
    		applyPassive,
    		forwardEvents,
    		uninitializedValue,
    		isUninitializedValue,
    		use,
    		className,
    		style,
    		ripple,
    		disabled,
    		required,
    		textarea,
    		variant,
    		noLabel,
    		label,
    		type,
    		value,
    		files,
    		valued,
    		invalid,
    		updateInvalid,
    		dirty,
    		prefix,
    		suffix,
    		validateOnValueChange,
    		useNativeValidation,
    		withLeadingIcon,
    		withTrailingIcon,
    		input,
    		floatingLabel,
    		lineRipple,
    		notchedOutline,
    		element,
    		instance,
    		internalClasses,
    		internalStyles,
    		helperId,
    		focused,
    		addLayoutListener,
    		removeLayoutListener,
    		initPromiseResolve,
    		initPromise,
    		leadingIcon,
    		trailingIcon,
    		helperText,
    		characterCounter,
    		previousValue,
    		hasClass,
    		addClass,
    		removeClass,
    		addStyle,
    		focus,
    		blur,
    		layout,
    		getElement,
    		inputElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('uninitializedValue' in $$props) uninitializedValue = $$new_props.uninitializedValue;
    		if ('use' in $$props) $$invalidate(8, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(9, className = $$new_props.className);
    		if ('style' in $$props) $$invalidate(10, style = $$new_props.style);
    		if ('ripple' in $$props) $$invalidate(11, ripple = $$new_props.ripple);
    		if ('disabled' in $$props) $$invalidate(12, disabled = $$new_props.disabled);
    		if ('required' in $$props) $$invalidate(13, required = $$new_props.required);
    		if ('textarea' in $$props) $$invalidate(14, textarea = $$new_props.textarea);
    		if ('variant' in $$props) $$invalidate(15, variant = $$new_props.variant);
    		if ('noLabel' in $$props) $$invalidate(16, noLabel = $$new_props.noLabel);
    		if ('label' in $$props) $$invalidate(17, label = $$new_props.label);
    		if ('type' in $$props) $$invalidate(18, type = $$new_props.type);
    		if ('value' in $$props) $$invalidate(0, value = $$new_props.value);
    		if ('files' in $$props) $$invalidate(3, files = $$new_props.files);
    		if ('invalid' in $$props) $$invalidate(1, invalid = $$new_props.invalid);
    		if ('updateInvalid' in $$props) $$invalidate(19, updateInvalid = $$new_props.updateInvalid);
    		if ('dirty' in $$props) $$invalidate(4, dirty = $$new_props.dirty);
    		if ('prefix' in $$props) $$invalidate(20, prefix = $$new_props.prefix);
    		if ('suffix' in $$props) $$invalidate(21, suffix = $$new_props.suffix);
    		if ('validateOnValueChange' in $$props) $$invalidate(43, validateOnValueChange = $$new_props.validateOnValueChange);
    		if ('useNativeValidation' in $$props) $$invalidate(44, useNativeValidation = $$new_props.useNativeValidation);
    		if ('withLeadingIcon' in $$props) $$invalidate(22, withLeadingIcon = $$new_props.withLeadingIcon);
    		if ('withTrailingIcon' in $$props) $$invalidate(23, withTrailingIcon = $$new_props.withTrailingIcon);
    		if ('input' in $$props) $$invalidate(2, input = $$new_props.input);
    		if ('floatingLabel' in $$props) $$invalidate(5, floatingLabel = $$new_props.floatingLabel);
    		if ('lineRipple' in $$props) $$invalidate(6, lineRipple = $$new_props.lineRipple);
    		if ('notchedOutline' in $$props) $$invalidate(7, notchedOutline = $$new_props.notchedOutline);
    		if ('element' in $$props) $$invalidate(24, element = $$new_props.element);
    		if ('instance' in $$props) $$invalidate(49, instance = $$new_props.instance);
    		if ('internalClasses' in $$props) $$invalidate(25, internalClasses = $$new_props.internalClasses);
    		if ('internalStyles' in $$props) $$invalidate(26, internalStyles = $$new_props.internalStyles);
    		if ('helperId' in $$props) $$invalidate(27, helperId = $$new_props.helperId);
    		if ('focused' in $$props) $$invalidate(28, focused = $$new_props.focused);
    		if ('addLayoutListener' in $$props) addLayoutListener = $$new_props.addLayoutListener;
    		if ('removeLayoutListener' in $$props) removeLayoutListener = $$new_props.removeLayoutListener;
    		if ('initPromiseResolve' in $$props) initPromiseResolve = $$new_props.initPromiseResolve;
    		if ('initPromise' in $$props) $$invalidate(37, initPromise = $$new_props.initPromise);
    		if ('leadingIcon' in $$props) $$invalidate(29, leadingIcon = $$new_props.leadingIcon);
    		if ('trailingIcon' in $$props) $$invalidate(30, trailingIcon = $$new_props.trailingIcon);
    		if ('helperText' in $$props) $$invalidate(31, helperText = $$new_props.helperText);
    		if ('characterCounter' in $$props) $$invalidate(32, characterCounter = $$new_props.characterCounter);
    		if ('previousValue' in $$props) $$invalidate(50, previousValue = $$new_props.previousValue);
    		if ('inputElement' in $$props) $$invalidate(33, inputElement = $$new_props.inputElement);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*input*/ 4) {
    			$$invalidate(33, inputElement = input && input.getElement());
    		}

    		if ($$self.$$.dirty[0] & /*invalid, updateInvalid*/ 524290 | $$self.$$.dirty[1] & /*instance*/ 262144) {
    			if (instance && instance.isValid() !== !invalid) {
    				if (updateInvalid) {
    					$$invalidate(1, invalid = !instance.isValid());
    				} else {
    					instance.setValid(!invalid);
    				}
    			}
    		}

    		if ($$self.$$.dirty[1] & /*instance, validateOnValueChange*/ 266240) {
    			if (instance && instance.getValidateOnValueChange() !== validateOnValueChange) {
    				instance.setValidateOnValueChange(isUninitializedValue(validateOnValueChange)
    				? false
    				: validateOnValueChange);
    			}
    		}

    		if ($$self.$$.dirty[1] & /*instance, useNativeValidation*/ 270336) {
    			if (instance) {
    				instance.setUseNativeValidation(isUninitializedValue(useNativeValidation)
    				? true
    				: useNativeValidation);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*disabled*/ 4096 | $$self.$$.dirty[1] & /*instance*/ 262144) {
    			if (instance) {
    				instance.setDisabled(disabled);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*value*/ 1 | $$self.$$.dirty[1] & /*instance, previousValue*/ 786432) {
    			if (instance && valued && previousValue !== value) {
    				$$invalidate(50, previousValue = value);

    				// Check the data is flowing down.
    				const stringValue = `${value}`;

    				if (instance.getValue() !== stringValue) {
    					instance.setValue(stringValue);
    				}
    			}
    		}
    	};

    	return [
    		value,
    		invalid,
    		input,
    		files,
    		dirty,
    		floatingLabel,
    		lineRipple,
    		notchedOutline,
    		use,
    		className,
    		style,
    		ripple,
    		disabled,
    		required,
    		textarea,
    		variant,
    		noLabel,
    		label,
    		type,
    		updateInvalid,
    		prefix,
    		suffix,
    		withLeadingIcon,
    		withTrailingIcon,
    		element,
    		internalClasses,
    		internalStyles,
    		helperId,
    		focused,
    		leadingIcon,
    		trailingIcon,
    		helperText,
    		characterCounter,
    		inputElement,
    		forwardEvents,
    		isUninitializedValue,
    		valued,
    		initPromise,
    		addClass,
    		removeClass,
    		addStyle,
    		$$restProps,
    		$$slots,
    		validateOnValueChange,
    		useNativeValidation,
    		focus,
    		blur,
    		layout,
    		getElement,
    		instance,
    		previousValue,
    		slots,
    		floatinglabel_binding,
    		floatinglabel_binding_1,
    		notchedoutline_binding,
    		textarea_1_binding,
    		textarea_1_value_binding,
    		textarea_1_dirty_binding,
    		textarea_1_invalid_binding,
    		blur_handler,
    		focus_handler,
    		blur_handler_1,
    		focus_handler_1,
    		input_1_binding,
    		input_1_value_binding,
    		input_1_files_binding,
    		input_1_dirty_binding,
    		input_1_invalid_binding,
    		blur_handler_2,
    		focus_handler_2,
    		blur_handler_3,
    		focus_handler_3,
    		lineripple_binding,
    		label_1_binding,
    		SMUITextfieldLeadingIcon_mount_handler,
    		SMUITextfieldLeadingIcon_unmount_handler,
    		SMUITextfieldTrailingIcon_mount_handler,
    		SMUITextfieldTrailingIcon_unmount_handler,
    		SMUITextfieldCharacterCounter_mount_handler,
    		SMUITextfieldCharacterCounter_unmount_handler,
    		div_binding,
    		SMUITextfieldLeadingIcon_mount_handler_1,
    		SMUITextfieldLeadingIcon_unmount_handler_1,
    		SMUITextfieldTrailingIcon_mount_handler_1,
    		SMUITextfieldTrailingIcon_unmount_handler_1,
    		SMUITextfieldHelperText_id_handler,
    		SMUITextfieldHelperText_mount_handler,
    		SMUITextfieldHelperText_unmount_handler,
    		SMUITextfieldCharacterCounter_mount_handler_1,
    		SMUITextfieldCharacterCounter_unmount_handler_1,
    		$$scope
    	];
    }

    class Textfield extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance_1$8,
    			create_fragment$e,
    			safe_not_equal,
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
    				getElement: 48
    			},
    			null,
    			[-1, -1, -1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Textfield",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get use() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ripple() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ripple(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get textarea() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set textarea(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get variant() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set variant(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noLabel() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noLabel(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get files() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set files(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get updateInvalid() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set updateInvalid(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dirty() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dirty(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prefix() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prefix(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get suffix() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set suffix(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get validateOnValueChange() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set validateOnValueChange(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get useNativeValidation() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set useNativeValidation(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get withLeadingIcon() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set withLeadingIcon(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get withTrailingIcon() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set withTrailingIcon(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get input() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set input(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get floatingLabel() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set floatingLabel(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get lineRipple() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lineRipple(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get notchedOutline() {
    		throw new Error_1("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set notchedOutline(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get focus() {
    		return this.$$.ctx[45];
    	}

    	set focus(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get blur() {
    		return this.$$.ctx[46];
    	}

    	set blur(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get layout() {
    		return this.$$.ctx[47];
    	}

    	set layout(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[48];
    	}

    	set getElement(value) {
    		throw new Error_1("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
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
     */
    var _a, _b;
    var cssClasses$7 = {
        LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
        LIST_ITEM_CLASS: 'mdc-list-item',
        LIST_ITEM_DISABLED_CLASS: 'mdc-list-item--disabled',
        LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
        LIST_ITEM_TEXT_CLASS: 'mdc-list-item__text',
        LIST_ITEM_PRIMARY_TEXT_CLASS: 'mdc-list-item__primary-text',
        ROOT: 'mdc-list',
    };
    (_a = {},
        _a["" + cssClasses$7.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-list-item--activated',
        _a["" + cssClasses$7.LIST_ITEM_CLASS] = 'mdc-list-item',
        _a["" + cssClasses$7.LIST_ITEM_DISABLED_CLASS] = 'mdc-list-item--disabled',
        _a["" + cssClasses$7.LIST_ITEM_SELECTED_CLASS] = 'mdc-list-item--selected',
        _a["" + cssClasses$7.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-list-item__primary-text',
        _a["" + cssClasses$7.ROOT] = 'mdc-list',
        _a);
    var deprecatedClassNameMap = (_b = {},
        _b["" + cssClasses$7.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-deprecated-list-item--activated',
        _b["" + cssClasses$7.LIST_ITEM_CLASS] = 'mdc-deprecated-list-item',
        _b["" + cssClasses$7.LIST_ITEM_DISABLED_CLASS] = 'mdc-deprecated-list-item--disabled',
        _b["" + cssClasses$7.LIST_ITEM_SELECTED_CLASS] = 'mdc-deprecated-list-item--selected',
        _b["" + cssClasses$7.LIST_ITEM_TEXT_CLASS] = 'mdc-deprecated-list-item__text',
        _b["" + cssClasses$7.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-deprecated-list-item__primary-text',
        _b["" + cssClasses$7.ROOT] = 'mdc-deprecated-list',
        _b);
    var strings$7 = {
        ACTION_EVENT: 'MDCList:action',
        ARIA_CHECKED: 'aria-checked',
        ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
        ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
        ARIA_CURRENT: 'aria-current',
        ARIA_DISABLED: 'aria-disabled',
        ARIA_ORIENTATION: 'aria-orientation',
        ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
        ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
        ARIA_SELECTED: 'aria-selected',
        ARIA_INTERACTIVE_ROLES_SELECTOR: '[role="listbox"], [role="menu"]',
        ARIA_MULTI_SELECTABLE_SELECTOR: '[aria-multiselectable="true"]',
        CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
        CHECKBOX_SELECTOR: 'input[type="checkbox"]',
        CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses$7.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$7.LIST_ITEM_CLASS + " a,\n    ." + deprecatedClassNameMap[cssClasses$7.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$7.LIST_ITEM_CLASS] + " a\n  ",
        DEPRECATED_SELECTOR: '.mdc-deprecated-list',
        FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses$7.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$7.LIST_ITEM_CLASS + " a,\n    ." + cssClasses$7.LIST_ITEM_CLASS + " input[type=\"radio\"]:not(:disabled),\n    ." + cssClasses$7.LIST_ITEM_CLASS + " input[type=\"checkbox\"]:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$7.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$7.LIST_ITEM_CLASS] + " a,\n    ." + deprecatedClassNameMap[cssClasses$7.LIST_ITEM_CLASS] + " input[type=\"radio\"]:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$7.LIST_ITEM_CLASS] + " input[type=\"checkbox\"]:not(:disabled)\n  ",
        RADIO_SELECTOR: 'input[type="radio"]',
        SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]',
    };
    var numbers$4 = {
        UNSET_INDEX: -1,
        TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300
    };

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
    var ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];
    /**
     * Ensures that preventDefault is only called if the containing element
     * doesn't consume the event, and it will cause an unintended scroll.
     *
     * @param evt keyboard event to be prevented.
     */
    var preventDefaultEvent = function (evt) {
        var target = evt.target;
        if (!target) {
            return;
        }
        var tagName = ("" + target.tagName).toLowerCase();
        if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
            evt.preventDefault();
        }
    };

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
    /**
     * Initializes a state object for typeahead. Use the same reference for calls to
     * typeahead functions.
     *
     * @return The current state of the typeahead process. Each state reference
     *     represents a typeahead instance as the reference is typically mutated
     *     in-place.
     */
    function initState() {
        var state = {
            bufferClearTimeout: 0,
            currentFirstChar: '',
            sortedIndexCursor: 0,
            typeaheadBuffer: '',
        };
        return state;
    }
    /**
     * Initializes typeahead state by indexing the current list items by primary
     * text into the sortedIndexByFirstChar data structure.
     *
     * @param listItemCount numer of items in the list
     * @param getPrimaryTextByItemIndex function that returns the primary text at a
     *     given index
     *
     * @return Map that maps the first character of the primary text to the full
     *     list text and it's index
     */
    function initSortedIndex(listItemCount, getPrimaryTextByItemIndex) {
        var sortedIndexByFirstChar = new Map();
        // Aggregate item text to index mapping
        for (var i = 0; i < listItemCount; i++) {
            var primaryText = getPrimaryTextByItemIndex(i).trim();
            if (!primaryText) {
                continue;
            }
            var firstChar = primaryText[0].toLowerCase();
            if (!sortedIndexByFirstChar.has(firstChar)) {
                sortedIndexByFirstChar.set(firstChar, []);
            }
            sortedIndexByFirstChar.get(firstChar).push({ text: primaryText.toLowerCase(), index: i });
        }
        // Sort the mapping
        // TODO(b/157162694): Investigate replacing forEach with Map.values()
        sortedIndexByFirstChar.forEach(function (values) {
            values.sort(function (first, second) {
                return first.index - second.index;
            });
        });
        return sortedIndexByFirstChar;
    }
    /**
     * Given the next desired character from the user, it attempts to find the next
     * list option matching the buffer. Wraps around if at the end of options.
     *
     * @param opts Options and accessors
     *   - nextChar - the next character to match against items
     *   - sortedIndexByFirstChar - output of `initSortedIndex(...)`
     *   - focusedItemIndex - the index of the currently focused item
     *   - focusItemAtIndex - function that focuses a list item at given index
     *   - skipFocus - whether or not to focus the matched item
     *   - isItemAtIndexDisabled - function that determines whether an item at a
     *        given index is disabled
     * @param state The typeahead state instance. See `initState`.
     *
     * @return The index of the matched item, or -1 if no match.
     */
    function matchItem(opts, state) {
        var nextChar = opts.nextChar, focusItemAtIndex = opts.focusItemAtIndex, sortedIndexByFirstChar = opts.sortedIndexByFirstChar, focusedItemIndex = opts.focusedItemIndex, skipFocus = opts.skipFocus, isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
        clearTimeout(state.bufferClearTimeout);
        state.bufferClearTimeout = setTimeout(function () {
            clearBuffer(state);
        }, numbers$4.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS);
        state.typeaheadBuffer = state.typeaheadBuffer + nextChar;
        var index;
        if (state.typeaheadBuffer.length === 1) {
            index = matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state);
        }
        else {
            index = matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state);
        }
        if (index !== -1 && !skipFocus) {
            focusItemAtIndex(index);
        }
        return index;
    }
    /**
     * Matches the user's single input character in the buffer to the
     * next option that begins with such character. Wraps around if at
     * end of options. Returns -1 if no match is found.
     */
    function matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state) {
        var firstChar = state.typeaheadBuffer[0];
        var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);
        if (!itemsMatchingFirstChar) {
            return -1;
        }
        // Has the same firstChar been recently matched?
        // Also, did starting index remain the same between key presses?
        // If both hold true, simply increment index.
        if (firstChar === state.currentFirstChar &&
            itemsMatchingFirstChar[state.sortedIndexCursor].index ===
                focusedItemIndex) {
            state.sortedIndexCursor =
                (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
            var newIndex = itemsMatchingFirstChar[state.sortedIndexCursor].index;
            if (!isItemAtIndexDisabled(newIndex)) {
                return newIndex;
            }
        }
        // If we're here, it means one of the following happened:
        // - either firstChar or startingIndex has changed, invalidating the
        // cursor.
        // - The next item of typeahead is disabled, so we have to look further.
        state.currentFirstChar = firstChar;
        var newCursorPosition = -1;
        var cursorPosition;
        // Find the first non-disabled item as a fallback.
        for (cursorPosition = 0; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
            if (!isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
                newCursorPosition = cursorPosition;
                break;
            }
        }
        // Advance cursor to first item matching the firstChar that is positioned
        // after starting item. Cursor is unchanged from fallback if there's no
        // such item.
        for (; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
            if (itemsMatchingFirstChar[cursorPosition].index > focusedItemIndex &&
                !isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
                newCursorPosition = cursorPosition;
                break;
            }
        }
        if (newCursorPosition !== -1) {
            state.sortedIndexCursor = newCursorPosition;
            return itemsMatchingFirstChar[state.sortedIndexCursor].index;
        }
        return -1;
    }
    /**
     * Attempts to find the next item that matches all of the typeahead buffer.
     * Wraps around if at end of options. Returns -1 if no match is found.
     */
    function matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state) {
        var firstChar = state.typeaheadBuffer[0];
        var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);
        if (!itemsMatchingFirstChar) {
            return -1;
        }
        // Do nothing if text already matches
        var startingItem = itemsMatchingFirstChar[state.sortedIndexCursor];
        if (startingItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0 &&
            !isItemAtIndexDisabled(startingItem.index)) {
            return startingItem.index;
        }
        // Find next item that matches completely; if no match, we'll eventually
        // loop around to same position
        var cursorPosition = (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
        var nextCursorPosition = -1;
        while (cursorPosition !== state.sortedIndexCursor) {
            var currentItem = itemsMatchingFirstChar[cursorPosition];
            var matches = currentItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0;
            var isEnabled = !isItemAtIndexDisabled(currentItem.index);
            if (matches && isEnabled) {
                nextCursorPosition = cursorPosition;
                break;
            }
            cursorPosition = (cursorPosition + 1) % itemsMatchingFirstChar.length;
        }
        if (nextCursorPosition !== -1) {
            state.sortedIndexCursor = nextCursorPosition;
            return itemsMatchingFirstChar[state.sortedIndexCursor].index;
        }
        return -1;
    }
    /**
     * Whether or not the given typeahead instaance state is currently typing.
     *
     * @param state The typeahead state instance. See `initState`.
     */
    function isTypingInProgress(state) {
        return state.typeaheadBuffer.length > 0;
    }
    /**
     * Clears the typeahaed buffer so that it resets item matching to the first
     * character.
     *
     * @param state The typeahead state instance. See `initState`.
     */
    function clearBuffer(state) {
        state.typeaheadBuffer = '';
    }
    /**
     * Given a keydown event, it calculates whether or not to automatically focus a
     * list item depending on what was typed mimicing the typeahead functionality of
     * a standard <select> element that is open.
     *
     * @param opts Options and accessors
     *   - event - the KeyboardEvent to handle and parse
     *   - sortedIndexByFirstChar - output of `initSortedIndex(...)`
     *   - focusedItemIndex - the index of the currently focused item
     *   - focusItemAtIndex - function that focuses a list item at given index
     *   - isItemAtFocusedIndexDisabled - whether or not the currently focused item
     *      is disabled
     *   - isTargetListItem - whether or not the event target is a list item
     * @param state The typeahead state instance. See `initState`.
     *
     * @returns index of the item matched by the keydown. -1 if not matched.
     */
    function handleKeydown(opts, state) {
        var event = opts.event, isTargetListItem = opts.isTargetListItem, focusedItemIndex = opts.focusedItemIndex, focusItemAtIndex = opts.focusItemAtIndex, sortedIndexByFirstChar = opts.sortedIndexByFirstChar, isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
        var isArrowLeft = normalizeKey(event) === 'ArrowLeft';
        var isArrowUp = normalizeKey(event) === 'ArrowUp';
        var isArrowRight = normalizeKey(event) === 'ArrowRight';
        var isArrowDown = normalizeKey(event) === 'ArrowDown';
        var isHome = normalizeKey(event) === 'Home';
        var isEnd = normalizeKey(event) === 'End';
        var isEnter = normalizeKey(event) === 'Enter';
        var isSpace = normalizeKey(event) === 'Spacebar';
        if (event.ctrlKey || event.metaKey || isArrowLeft || isArrowUp ||
            isArrowRight || isArrowDown || isHome || isEnd || isEnter) {
            return -1;
        }
        var isCharacterKey = !isSpace && event.key.length === 1;
        if (isCharacterKey) {
            preventDefaultEvent(event);
            var matchItemOpts = {
                focusItemAtIndex: focusItemAtIndex,
                focusedItemIndex: focusedItemIndex,
                nextChar: event.key.toLowerCase(),
                sortedIndexByFirstChar: sortedIndexByFirstChar,
                skipFocus: false,
                isItemAtIndexDisabled: isItemAtIndexDisabled,
            };
            return matchItem(matchItemOpts, state);
        }
        if (!isSpace) {
            return -1;
        }
        if (isTargetListItem) {
            preventDefaultEvent(event);
        }
        var typeaheadOnListItem = isTargetListItem && isTypingInProgress(state);
        if (typeaheadOnListItem) {
            var matchItemOpts = {
                focusItemAtIndex: focusItemAtIndex,
                focusedItemIndex: focusedItemIndex,
                nextChar: ' ',
                sortedIndexByFirstChar: sortedIndexByFirstChar,
                skipFocus: false,
                isItemAtIndexDisabled: isItemAtIndexDisabled,
            };
            // space participates in typeahead matching if in rapid typing mode
            return matchItem(matchItemOpts, state);
        }
        return -1;
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
     */
    function isNumberArray(selectedIndex) {
        return selectedIndex instanceof Array;
    }
    var MDCListFoundation = /** @class */ (function (_super) {
        __extends(MDCListFoundation, _super);
        function MDCListFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCListFoundation.defaultAdapter), adapter)) || this;
            _this.wrapFocus = false;
            _this.isVertical = true;
            _this.isSingleSelectionList = false;
            _this.selectedIndex = numbers$4.UNSET_INDEX;
            _this.focusedItemIndex = numbers$4.UNSET_INDEX;
            _this.useActivatedClass = false;
            _this.useSelectedAttr = false;
            _this.ariaCurrentAttrValue = null;
            _this.isCheckboxList = false;
            _this.isRadioList = false;
            _this.hasTypeahead = false;
            // Transiently holds current typeahead prefix from user.
            _this.typeaheadState = initState();
            _this.sortedIndexByFirstChar = new Map();
            return _this;
        }
        Object.defineProperty(MDCListFoundation, "strings", {
            get: function () {
                return strings$7;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCListFoundation, "cssClasses", {
            get: function () {
                return cssClasses$7;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCListFoundation, "numbers", {
            get: function () {
                return numbers$4;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCListFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addClassForElementIndex: function () { return undefined; },
                    focusItemAtIndex: function () { return undefined; },
                    getAttributeForElementIndex: function () { return null; },
                    getFocusedElementIndex: function () { return 0; },
                    getListItemCount: function () { return 0; },
                    hasCheckboxAtIndex: function () { return false; },
                    hasRadioAtIndex: function () { return false; },
                    isCheckboxCheckedAtIndex: function () { return false; },
                    isFocusInsideList: function () { return false; },
                    isRootFocused: function () { return false; },
                    listItemAtIndexHasClass: function () { return false; },
                    notifyAction: function () { return undefined; },
                    removeClassForElementIndex: function () { return undefined; },
                    setAttributeForElementIndex: function () { return undefined; },
                    setCheckedCheckboxOrRadioAtIndex: function () { return undefined; },
                    setTabIndexForListItemChildren: function () { return undefined; },
                    getPrimaryTextAtIndex: function () { return ''; },
                };
            },
            enumerable: false,
            configurable: true
        });
        MDCListFoundation.prototype.layout = function () {
            if (this.adapter.getListItemCount() === 0) {
                return;
            }
            // TODO(b/172274142): consider all items when determining the list's type.
            if (this.adapter.hasCheckboxAtIndex(0)) {
                this.isCheckboxList = true;
            }
            else if (this.adapter.hasRadioAtIndex(0)) {
                this.isRadioList = true;
            }
            else {
                this.maybeInitializeSingleSelection();
            }
            if (this.hasTypeahead) {
                this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
            }
        };
        /** Returns the index of the item that was last focused. */
        MDCListFoundation.prototype.getFocusedItemIndex = function () {
            return this.focusedItemIndex;
        };
        /** Toggles focus wrapping with keyboard navigation. */
        MDCListFoundation.prototype.setWrapFocus = function (value) {
            this.wrapFocus = value;
        };
        /**
         * Toggles orientation direction for keyboard navigation (true for vertical,
         * false for horizontal).
         */
        MDCListFoundation.prototype.setVerticalOrientation = function (value) {
            this.isVertical = value;
        };
        /** Toggles single-selection behavior. */
        MDCListFoundation.prototype.setSingleSelection = function (value) {
            this.isSingleSelectionList = value;
            if (value) {
                this.maybeInitializeSingleSelection();
                this.selectedIndex = this.getSelectedIndexFromDOM();
            }
        };
        /**
         * Automatically determines whether the list is single selection list. If so,
         * initializes the internal state to match the selected item.
         */
        MDCListFoundation.prototype.maybeInitializeSingleSelection = function () {
            var selectedItemIndex = this.getSelectedIndexFromDOM();
            if (selectedItemIndex === numbers$4.UNSET_INDEX)
                return;
            var hasActivatedClass = this.adapter.listItemAtIndexHasClass(selectedItemIndex, cssClasses$7.LIST_ITEM_ACTIVATED_CLASS);
            if (hasActivatedClass) {
                this.setUseActivatedClass(true);
            }
            this.isSingleSelectionList = true;
            this.selectedIndex = selectedItemIndex;
        };
        /** @return Index of the first selected item based on the DOM state. */
        MDCListFoundation.prototype.getSelectedIndexFromDOM = function () {
            var selectedIndex = numbers$4.UNSET_INDEX;
            var listItemsCount = this.adapter.getListItemCount();
            for (var i = 0; i < listItemsCount; i++) {
                var hasSelectedClass = this.adapter.listItemAtIndexHasClass(i, cssClasses$7.LIST_ITEM_SELECTED_CLASS);
                var hasActivatedClass = this.adapter.listItemAtIndexHasClass(i, cssClasses$7.LIST_ITEM_ACTIVATED_CLASS);
                if (!(hasSelectedClass || hasActivatedClass)) {
                    continue;
                }
                selectedIndex = i;
                break;
            }
            return selectedIndex;
        };
        /**
         * Sets whether typeahead is enabled on the list.
         * @param hasTypeahead Whether typeahead is enabled.
         */
        MDCListFoundation.prototype.setHasTypeahead = function (hasTypeahead) {
            this.hasTypeahead = hasTypeahead;
            if (hasTypeahead) {
                this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
            }
        };
        /**
         * @return Whether typeahead is currently matching a user-specified prefix.
         */
        MDCListFoundation.prototype.isTypeaheadInProgress = function () {
            return this.hasTypeahead &&
                isTypingInProgress(this.typeaheadState);
        };
        /** Toggle use of the "activated" CSS class. */
        MDCListFoundation.prototype.setUseActivatedClass = function (useActivated) {
            this.useActivatedClass = useActivated;
        };
        /**
         * Toggles use of the selected attribute (true for aria-selected, false for
         * aria-checked).
         */
        MDCListFoundation.prototype.setUseSelectedAttribute = function (useSelected) {
            this.useSelectedAttr = useSelected;
        };
        MDCListFoundation.prototype.getSelectedIndex = function () {
            return this.selectedIndex;
        };
        MDCListFoundation.prototype.setSelectedIndex = function (index, _a) {
            var _b = _a === void 0 ? {} : _a, forceUpdate = _b.forceUpdate;
            if (!this.isIndexValid(index)) {
                return;
            }
            if (this.isCheckboxList) {
                this.setCheckboxAtIndex(index);
            }
            else if (this.isRadioList) {
                this.setRadioAtIndex(index);
            }
            else {
                this.setSingleSelectionAtIndex(index, { forceUpdate: forceUpdate });
            }
        };
        /**
         * Focus in handler for the list items.
         */
        MDCListFoundation.prototype.handleFocusIn = function (listItemIndex) {
            if (listItemIndex >= 0) {
                this.focusedItemIndex = listItemIndex;
                this.adapter.setAttributeForElementIndex(listItemIndex, 'tabindex', '0');
                this.adapter.setTabIndexForListItemChildren(listItemIndex, '0');
            }
        };
        /**
         * Focus out handler for the list items.
         */
        MDCListFoundation.prototype.handleFocusOut = function (listItemIndex) {
            var _this = this;
            if (listItemIndex >= 0) {
                this.adapter.setAttributeForElementIndex(listItemIndex, 'tabindex', '-1');
                this.adapter.setTabIndexForListItemChildren(listItemIndex, '-1');
            }
            /**
             * Between Focusout & Focusin some browsers do not have focus on any
             * element. Setting a delay to wait till the focus is moved to next element.
             */
            setTimeout(function () {
                if (!_this.adapter.isFocusInsideList()) {
                    _this.setTabindexToFirstSelectedOrFocusedItem();
                }
            }, 0);
        };
        /**
         * Key handler for the list.
         */
        MDCListFoundation.prototype.handleKeydown = function (event, isRootListItem, listItemIndex) {
            var _this = this;
            var isArrowLeft = normalizeKey(event) === 'ArrowLeft';
            var isArrowUp = normalizeKey(event) === 'ArrowUp';
            var isArrowRight = normalizeKey(event) === 'ArrowRight';
            var isArrowDown = normalizeKey(event) === 'ArrowDown';
            var isHome = normalizeKey(event) === 'Home';
            var isEnd = normalizeKey(event) === 'End';
            var isEnter = normalizeKey(event) === 'Enter';
            var isSpace = normalizeKey(event) === 'Spacebar';
            // Have to check both upper and lower case, because having caps lock on
            // affects the value.
            var isLetterA = event.key === 'A' || event.key === 'a';
            if (this.adapter.isRootFocused()) {
                if (isArrowUp || isEnd) {
                    event.preventDefault();
                    this.focusLastElement();
                }
                else if (isArrowDown || isHome) {
                    event.preventDefault();
                    this.focusFirstElement();
                }
                if (this.hasTypeahead) {
                    var handleKeydownOpts = {
                        event: event,
                        focusItemAtIndex: function (index) {
                            _this.focusItemAtIndex(index);
                        },
                        focusedItemIndex: -1,
                        isTargetListItem: isRootListItem,
                        sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                        isItemAtIndexDisabled: function (index) {
                            return _this.adapter.listItemAtIndexHasClass(index, cssClasses$7.LIST_ITEM_DISABLED_CLASS);
                        },
                    };
                    handleKeydown(handleKeydownOpts, this.typeaheadState);
                }
                return;
            }
            var currentIndex = this.adapter.getFocusedElementIndex();
            if (currentIndex === -1) {
                currentIndex = listItemIndex;
                if (currentIndex < 0) {
                    // If this event doesn't have a mdc-list-item ancestor from the
                    // current list (not from a sublist), return early.
                    return;
                }
            }
            if ((this.isVertical && isArrowDown) ||
                (!this.isVertical && isArrowRight)) {
                preventDefaultEvent(event);
                this.focusNextElement(currentIndex);
            }
            else if ((this.isVertical && isArrowUp) || (!this.isVertical && isArrowLeft)) {
                preventDefaultEvent(event);
                this.focusPrevElement(currentIndex);
            }
            else if (isHome) {
                preventDefaultEvent(event);
                this.focusFirstElement();
            }
            else if (isEnd) {
                preventDefaultEvent(event);
                this.focusLastElement();
            }
            else if (isLetterA && event.ctrlKey && this.isCheckboxList) {
                event.preventDefault();
                this.toggleAll(this.selectedIndex === numbers$4.UNSET_INDEX ?
                    [] :
                    this.selectedIndex);
            }
            else if (isEnter || isSpace) {
                if (isRootListItem) {
                    // Return early if enter key is pressed on anchor element which triggers
                    // synthetic MouseEvent event.
                    var target = event.target;
                    if (target && target.tagName === 'A' && isEnter) {
                        return;
                    }
                    preventDefaultEvent(event);
                    if (this.adapter.listItemAtIndexHasClass(currentIndex, cssClasses$7.LIST_ITEM_DISABLED_CLASS)) {
                        return;
                    }
                    if (!this.isTypeaheadInProgress()) {
                        if (this.isSelectableList()) {
                            this.setSelectedIndexOnAction(currentIndex);
                        }
                        this.adapter.notifyAction(currentIndex);
                    }
                }
            }
            if (this.hasTypeahead) {
                var handleKeydownOpts = {
                    event: event,
                    focusItemAtIndex: function (index) {
                        _this.focusItemAtIndex(index);
                    },
                    focusedItemIndex: this.focusedItemIndex,
                    isTargetListItem: isRootListItem,
                    sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                    isItemAtIndexDisabled: function (index) { return _this.adapter.listItemAtIndexHasClass(index, cssClasses$7.LIST_ITEM_DISABLED_CLASS); },
                };
                handleKeydown(handleKeydownOpts, this.typeaheadState);
            }
        };
        /**
         * Click handler for the list.
         */
        MDCListFoundation.prototype.handleClick = function (index, toggleCheckbox) {
            if (index === numbers$4.UNSET_INDEX) {
                return;
            }
            if (this.adapter.listItemAtIndexHasClass(index, cssClasses$7.LIST_ITEM_DISABLED_CLASS)) {
                return;
            }
            if (this.isSelectableList()) {
                this.setSelectedIndexOnAction(index, toggleCheckbox);
            }
            this.adapter.notifyAction(index);
        };
        /**
         * Focuses the next element on the list.
         */
        MDCListFoundation.prototype.focusNextElement = function (index) {
            var count = this.adapter.getListItemCount();
            var nextIndex = index + 1;
            if (nextIndex >= count) {
                if (this.wrapFocus) {
                    nextIndex = 0;
                }
                else {
                    // Return early because last item is already focused.
                    return index;
                }
            }
            this.focusItemAtIndex(nextIndex);
            return nextIndex;
        };
        /**
         * Focuses the previous element on the list.
         */
        MDCListFoundation.prototype.focusPrevElement = function (index) {
            var prevIndex = index - 1;
            if (prevIndex < 0) {
                if (this.wrapFocus) {
                    prevIndex = this.adapter.getListItemCount() - 1;
                }
                else {
                    // Return early because first item is already focused.
                    return index;
                }
            }
            this.focusItemAtIndex(prevIndex);
            return prevIndex;
        };
        MDCListFoundation.prototype.focusFirstElement = function () {
            this.focusItemAtIndex(0);
            return 0;
        };
        MDCListFoundation.prototype.focusLastElement = function () {
            var lastIndex = this.adapter.getListItemCount() - 1;
            this.focusItemAtIndex(lastIndex);
            return lastIndex;
        };
        MDCListFoundation.prototype.focusInitialElement = function () {
            var initialIndex = this.getFirstSelectedOrFocusedItemIndex();
            this.focusItemAtIndex(initialIndex);
            return initialIndex;
        };
        /**
         * @param itemIndex Index of the list item
         * @param isEnabled Sets the list item to enabled or disabled.
         */
        MDCListFoundation.prototype.setEnabled = function (itemIndex, isEnabled) {
            if (!this.isIndexValid(itemIndex)) {
                return;
            }
            if (isEnabled) {
                this.adapter.removeClassForElementIndex(itemIndex, cssClasses$7.LIST_ITEM_DISABLED_CLASS);
                this.adapter.setAttributeForElementIndex(itemIndex, strings$7.ARIA_DISABLED, 'false');
            }
            else {
                this.adapter.addClassForElementIndex(itemIndex, cssClasses$7.LIST_ITEM_DISABLED_CLASS);
                this.adapter.setAttributeForElementIndex(itemIndex, strings$7.ARIA_DISABLED, 'true');
            }
        };
        MDCListFoundation.prototype.setSingleSelectionAtIndex = function (index, _a) {
            var _b = _a === void 0 ? {} : _a, forceUpdate = _b.forceUpdate;
            if (this.selectedIndex === index && !forceUpdate) {
                return;
            }
            var selectedClassName = cssClasses$7.LIST_ITEM_SELECTED_CLASS;
            if (this.useActivatedClass) {
                selectedClassName = cssClasses$7.LIST_ITEM_ACTIVATED_CLASS;
            }
            if (this.selectedIndex !== numbers$4.UNSET_INDEX) {
                this.adapter.removeClassForElementIndex(this.selectedIndex, selectedClassName);
            }
            this.setAriaForSingleSelectionAtIndex(index);
            this.setTabindexAtIndex(index);
            if (index !== numbers$4.UNSET_INDEX) {
                this.adapter.addClassForElementIndex(index, selectedClassName);
            }
            this.selectedIndex = index;
        };
        /**
         * Sets aria attribute for single selection at given index.
         */
        MDCListFoundation.prototype.setAriaForSingleSelectionAtIndex = function (index) {
            // Detect the presence of aria-current and get the value only during list
            // initialization when it is in unset state.
            if (this.selectedIndex === numbers$4.UNSET_INDEX) {
                this.ariaCurrentAttrValue =
                    this.adapter.getAttributeForElementIndex(index, strings$7.ARIA_CURRENT);
            }
            var isAriaCurrent = this.ariaCurrentAttrValue !== null;
            var ariaAttribute = isAriaCurrent ? strings$7.ARIA_CURRENT : strings$7.ARIA_SELECTED;
            if (this.selectedIndex !== numbers$4.UNSET_INDEX) {
                this.adapter.setAttributeForElementIndex(this.selectedIndex, ariaAttribute, 'false');
            }
            if (index !== numbers$4.UNSET_INDEX) {
                var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue : 'true';
                this.adapter.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
            }
        };
        /**
         * Returns the attribute to use for indicating selection status.
         */
        MDCListFoundation.prototype.getSelectionAttribute = function () {
            return this.useSelectedAttr ? strings$7.ARIA_SELECTED : strings$7.ARIA_CHECKED;
        };
        /**
         * Toggles radio at give index. Radio doesn't change the checked state if it
         * is already checked.
         */
        MDCListFoundation.prototype.setRadioAtIndex = function (index) {
            var selectionAttribute = this.getSelectionAttribute();
            this.adapter.setCheckedCheckboxOrRadioAtIndex(index, true);
            if (this.selectedIndex !== numbers$4.UNSET_INDEX) {
                this.adapter.setAttributeForElementIndex(this.selectedIndex, selectionAttribute, 'false');
            }
            this.adapter.setAttributeForElementIndex(index, selectionAttribute, 'true');
            this.selectedIndex = index;
        };
        MDCListFoundation.prototype.setCheckboxAtIndex = function (index) {
            var selectionAttribute = this.getSelectionAttribute();
            for (var i = 0; i < this.adapter.getListItemCount(); i++) {
                var isChecked = false;
                if (index.indexOf(i) >= 0) {
                    isChecked = true;
                }
                this.adapter.setCheckedCheckboxOrRadioAtIndex(i, isChecked);
                this.adapter.setAttributeForElementIndex(i, selectionAttribute, isChecked ? 'true' : 'false');
            }
            this.selectedIndex = index;
        };
        MDCListFoundation.prototype.setTabindexAtIndex = function (index) {
            if (this.focusedItemIndex === numbers$4.UNSET_INDEX && index !== 0) {
                // If some list item was selected set first list item's tabindex to -1.
                // Generally, tabindex is set to 0 on first list item of list that has no
                // preselected items.
                this.adapter.setAttributeForElementIndex(0, 'tabindex', '-1');
            }
            else if (this.focusedItemIndex >= 0 && this.focusedItemIndex !== index) {
                this.adapter.setAttributeForElementIndex(this.focusedItemIndex, 'tabindex', '-1');
            }
            // Set the previous selection's tabindex to -1. We need this because
            // in selection menus that are not visible, programmatically setting an
            // option will not change focus but will change where tabindex should be 0.
            if (!(this.selectedIndex instanceof Array) &&
                this.selectedIndex !== index) {
                this.adapter.setAttributeForElementIndex(this.selectedIndex, 'tabindex', '-1');
            }
            if (index !== numbers$4.UNSET_INDEX) {
                this.adapter.setAttributeForElementIndex(index, 'tabindex', '0');
            }
        };
        /**
         * @return Return true if it is single selectin list, checkbox list or radio
         *     list.
         */
        MDCListFoundation.prototype.isSelectableList = function () {
            return this.isSingleSelectionList || this.isCheckboxList ||
                this.isRadioList;
        };
        MDCListFoundation.prototype.setTabindexToFirstSelectedOrFocusedItem = function () {
            var targetIndex = this.getFirstSelectedOrFocusedItemIndex();
            this.setTabindexAtIndex(targetIndex);
        };
        MDCListFoundation.prototype.getFirstSelectedOrFocusedItemIndex = function () {
            // Action lists retain focus on the most recently focused item.
            if (!this.isSelectableList()) {
                return Math.max(this.focusedItemIndex, 0);
            }
            // Single-selection lists focus the selected item.
            if (typeof this.selectedIndex === 'number' &&
                this.selectedIndex !== numbers$4.UNSET_INDEX) {
                return this.selectedIndex;
            }
            // Multiple-selection lists focus the first selected item.
            if (isNumberArray(this.selectedIndex) && this.selectedIndex.length > 0) {
                return this.selectedIndex.reduce(function (minIndex, currentIndex) { return Math.min(minIndex, currentIndex); });
            }
            // Selection lists without a selection focus the first item.
            return 0;
        };
        MDCListFoundation.prototype.isIndexValid = function (index) {
            var _this = this;
            if (index instanceof Array) {
                if (!this.isCheckboxList) {
                    throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
                }
                if (index.length === 0) {
                    return true;
                }
                else {
                    return index.some(function (i) { return _this.isIndexInRange(i); });
                }
            }
            else if (typeof index === 'number') {
                if (this.isCheckboxList) {
                    throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: " + index);
                }
                return this.isIndexInRange(index) ||
                    this.isSingleSelectionList && index === numbers$4.UNSET_INDEX;
            }
            else {
                return false;
            }
        };
        MDCListFoundation.prototype.isIndexInRange = function (index) {
            var listSize = this.adapter.getListItemCount();
            return index >= 0 && index < listSize;
        };
        /**
         * Sets selected index on user action, toggles checkbox / radio based on
         * toggleCheckbox value. User interaction should not toggle list item(s) when
         * disabled.
         */
        MDCListFoundation.prototype.setSelectedIndexOnAction = function (index, toggleCheckbox) {
            if (toggleCheckbox === void 0) { toggleCheckbox = true; }
            if (this.isCheckboxList) {
                this.toggleCheckboxAtIndex(index, toggleCheckbox);
            }
            else {
                this.setSelectedIndex(index);
            }
        };
        MDCListFoundation.prototype.toggleCheckboxAtIndex = function (index, toggleCheckbox) {
            var selectionAttribute = this.getSelectionAttribute();
            var isChecked = this.adapter.isCheckboxCheckedAtIndex(index);
            if (toggleCheckbox) {
                isChecked = !isChecked;
                this.adapter.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
            }
            this.adapter.setAttributeForElementIndex(index, selectionAttribute, isChecked ? 'true' : 'false');
            // If none of the checkbox items are selected and selectedIndex is not
            // initialized then provide a default value.
            var selectedIndexes = this.selectedIndex === numbers$4.UNSET_INDEX ?
                [] :
                this.selectedIndex.slice();
            if (isChecked) {
                selectedIndexes.push(index);
            }
            else {
                selectedIndexes = selectedIndexes.filter(function (i) { return i !== index; });
            }
            this.selectedIndex = selectedIndexes;
        };
        MDCListFoundation.prototype.focusItemAtIndex = function (index) {
            this.adapter.focusItemAtIndex(index);
            this.focusedItemIndex = index;
        };
        MDCListFoundation.prototype.toggleAll = function (currentlySelectedIndexes) {
            var count = this.adapter.getListItemCount();
            // If all items are selected, deselect everything.
            if (currentlySelectedIndexes.length === count) {
                this.setCheckboxAtIndex([]);
            }
            else {
                // Otherwise select all enabled options.
                var allIndexes = [];
                for (var i = 0; i < count; i++) {
                    if (!this.adapter.listItemAtIndexHasClass(i, cssClasses$7.LIST_ITEM_DISABLED_CLASS) ||
                        currentlySelectedIndexes.indexOf(i) > -1) {
                        allIndexes.push(i);
                    }
                }
                this.setCheckboxAtIndex(allIndexes);
            }
        };
        /**
         * Given the next desired character from the user, adds it to the typeahead
         * buffer. Then, attempts to find the next option matching the buffer. Wraps
         * around if at the end of options.
         *
         * @param nextChar The next character to add to the prefix buffer.
         * @param startingIndex The index from which to start matching. Only relevant
         *     when starting a new match sequence. To start a new match sequence,
         *     clear the buffer using `clearTypeaheadBuffer`, or wait for the buffer
         *     to clear after a set interval defined in list foundation. Defaults to
         *     the currently focused index.
         * @return The index of the matched item, or -1 if no match.
         */
        MDCListFoundation.prototype.typeaheadMatchItem = function (nextChar, startingIndex, skipFocus) {
            var _this = this;
            if (skipFocus === void 0) { skipFocus = false; }
            var opts = {
                focusItemAtIndex: function (index) {
                    _this.focusItemAtIndex(index);
                },
                focusedItemIndex: startingIndex ? startingIndex : this.focusedItemIndex,
                nextChar: nextChar,
                sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                skipFocus: skipFocus,
                isItemAtIndexDisabled: function (index) { return _this.adapter.listItemAtIndexHasClass(index, cssClasses$7.LIST_ITEM_DISABLED_CLASS); }
            };
            return matchItem(opts, this.typeaheadState);
        };
        /**
         * Initializes the MDCListTextAndIndex data structure by indexing the current
         * list items by primary text.
         *
         * @return The primary texts of all the list items sorted by first character.
         */
        MDCListFoundation.prototype.typeaheadInitSortedIndex = function () {
            return initSortedIndex(this.adapter.getListItemCount(), this.adapter.getPrimaryTextAtIndex);
        };
        /**
         * Clears the typeahead buffer.
         */
        MDCListFoundation.prototype.clearTypeaheadBuffer = function () {
            clearBuffer(this.typeaheadState);
        };
        return MDCListFoundation;
    }(MDCFoundation));

    /* node_modules/@smui/list/dist/List.svelte generated by Svelte v3.49.0 */

    // (1:0) <svelte:component   this={component}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     'mdc-deprecated-list': true,     'mdc-deprecated-list--non-interactive': nonInteractive,     'mdc-deprecated-list--dense': dense,     'mdc-deprecated-list--textual-list': textualList,     'mdc-deprecated-list--avatar-list': avatarList || selectionDialog,     'mdc-deprecated-list--icon-list': iconList,     'mdc-deprecated-list--image-list': imageList,     'mdc-deprecated-list--thumbnail-list': thumbnailList,     'mdc-deprecated-list--video-list': videoList,     'mdc-deprecated-list--two-line': twoLine,     'smui-list--three-line': threeLine && !twoLine,   })}   {role}   on:keydown={(event) =>     instance &&     instance.handleKeydown(       event,       event.target.classList.contains('mdc-deprecated-list-item'),       getListItemIndex(event.target)     )}   on:focusin={(event) =>     instance && instance.handleFocusIn(getListItemIndex(event.target))}   on:focusout={(event) =>     instance && instance.handleFocusOut(getListItemIndex(event.target))}   on:click={(event) =>     instance &&     instance.handleClick(       getListItemIndex(event.target),       !matches(event.target, 'input[type="checkbox"], input[type="radio"]')     )}   on:SMUIListItem:mount={handleItemMount}   on:SMUIListItem:unmount={handleItemUnmount}   on:SMUI:action={handleAction}   {...$$restProps} >
    function create_default_slot$6(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[37].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[43], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 4096)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[43],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[43])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[43], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$6.name,
    		type: "slot",
    		source: "(1:0) <svelte:component   this={component}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     'mdc-deprecated-list': true,     'mdc-deprecated-list--non-interactive': nonInteractive,     'mdc-deprecated-list--dense': dense,     'mdc-deprecated-list--textual-list': textualList,     'mdc-deprecated-list--avatar-list': avatarList || selectionDialog,     'mdc-deprecated-list--icon-list': iconList,     'mdc-deprecated-list--image-list': imageList,     'mdc-deprecated-list--thumbnail-list': thumbnailList,     'mdc-deprecated-list--video-list': videoList,     'mdc-deprecated-list--two-line': twoLine,     'smui-list--three-line': threeLine && !twoLine,   })}   {role}   on:keydown={(event) =>     instance &&     instance.handleKeydown(       event,       event.target.classList.contains('mdc-deprecated-list-item'),       getListItemIndex(event.target)     )}   on:focusin={(event) =>     instance && instance.handleFocusIn(getListItemIndex(event.target))}   on:focusout={(event) =>     instance && instance.handleFocusOut(getListItemIndex(event.target))}   on:click={(event) =>     instance &&     instance.handleClick(       getListItemIndex(event.target),       !matches(event.target, 'input[type=\\\"checkbox\\\"], input[type=\\\"radio\\\"]')     )}   on:SMUIListItem:mount={handleItemMount}   on:SMUIListItem:unmount={handleItemUnmount}   on:SMUI:action={handleAction}   {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{
    			use: [/*forwardEvents*/ ctx[17], .../*use*/ ctx[0]]
    		},
    		{
    			class: classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-deprecated-list': true,
    				'mdc-deprecated-list--non-interactive': /*nonInteractive*/ ctx[2],
    				'mdc-deprecated-list--dense': /*dense*/ ctx[3],
    				'mdc-deprecated-list--textual-list': /*textualList*/ ctx[4],
    				'mdc-deprecated-list--avatar-list': /*avatarList*/ ctx[5] || /*selectionDialog*/ ctx[18],
    				'mdc-deprecated-list--icon-list': /*iconList*/ ctx[6],
    				'mdc-deprecated-list--image-list': /*imageList*/ ctx[7],
    				'mdc-deprecated-list--thumbnail-list': /*thumbnailList*/ ctx[8],
    				'mdc-deprecated-list--video-list': /*videoList*/ ctx[9],
    				'mdc-deprecated-list--two-line': /*twoLine*/ ctx[10],
    				'smui-list--three-line': /*threeLine*/ ctx[11] && !/*twoLine*/ ctx[10]
    			})
    		},
    		{ role: /*role*/ ctx[15] },
    		/*$$restProps*/ ctx[23]
    	];

    	var switch_value = /*component*/ ctx[12];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot$6] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    		/*switch_instance_binding*/ ctx[38](switch_instance);
    		switch_instance.$on("keydown", /*keydown_handler*/ ctx[39]);
    		switch_instance.$on("focusin", /*focusin_handler*/ ctx[40]);
    		switch_instance.$on("focusout", /*focusout_handler*/ ctx[41]);
    		switch_instance.$on("click", /*click_handler*/ ctx[42]);
    		switch_instance.$on("SMUIListItem:mount", /*handleItemMount*/ ctx[19]);
    		switch_instance.$on("SMUIListItem:unmount", /*handleItemUnmount*/ ctx[20]);
    		switch_instance.$on("SMUI:action", /*handleAction*/ ctx[21]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty[0] & /*forwardEvents, use, className, nonInteractive, dense, textualList, avatarList, selectionDialog, iconList, imageList, thumbnailList, videoList, twoLine, threeLine, role, $$restProps*/ 8818687)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty[0] & /*forwardEvents, use*/ 131073 && {
    						use: [/*forwardEvents*/ ctx[17], .../*use*/ ctx[0]]
    					},
    					dirty[0] & /*className, nonInteractive, dense, textualList, avatarList, selectionDialog, iconList, imageList, thumbnailList, videoList, twoLine, threeLine*/ 266238 && {
    						class: classMap({
    							[/*className*/ ctx[1]]: true,
    							'mdc-deprecated-list': true,
    							'mdc-deprecated-list--non-interactive': /*nonInteractive*/ ctx[2],
    							'mdc-deprecated-list--dense': /*dense*/ ctx[3],
    							'mdc-deprecated-list--textual-list': /*textualList*/ ctx[4],
    							'mdc-deprecated-list--avatar-list': /*avatarList*/ ctx[5] || /*selectionDialog*/ ctx[18],
    							'mdc-deprecated-list--icon-list': /*iconList*/ ctx[6],
    							'mdc-deprecated-list--image-list': /*imageList*/ ctx[7],
    							'mdc-deprecated-list--thumbnail-list': /*thumbnailList*/ ctx[8],
    							'mdc-deprecated-list--video-list': /*videoList*/ ctx[9],
    							'mdc-deprecated-list--two-line': /*twoLine*/ ctx[10],
    							'smui-list--three-line': /*threeLine*/ ctx[11] && !/*twoLine*/ ctx[10]
    						})
    					},
    					dirty[0] & /*role*/ 32768 && { role: /*role*/ ctx[15] },
    					dirty[0] & /*$$restProps*/ 8388608 && get_spread_object(/*$$restProps*/ ctx[23])
    				])
    			: {};

    			if (dirty[1] & /*$$scope*/ 4096) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*component*/ ctx[12])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					/*switch_instance_binding*/ ctx[38](switch_instance);
    					switch_instance.$on("keydown", /*keydown_handler*/ ctx[39]);
    					switch_instance.$on("focusin", /*focusin_handler*/ ctx[40]);
    					switch_instance.$on("focusout", /*focusout_handler*/ ctx[41]);
    					switch_instance.$on("click", /*click_handler*/ ctx[42]);
    					switch_instance.$on("SMUIListItem:mount", /*handleItemMount*/ ctx[19]);
    					switch_instance.$on("SMUIListItem:unmount", /*handleItemUnmount*/ ctx[20]);
    					switch_instance.$on("SMUI:action", /*handleAction*/ ctx[21]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*switch_instance_binding*/ ctx[38](null);
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance_1$7($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"use","class","nonInteractive","dense","textualList","avatarList","iconList","imageList","thumbnailList","videoList","twoLine","threeLine","vertical","wrapFocus","singleSelection","selectedIndex","radioList","checkList","hasTypeahead","component","layout","setEnabled","getTypeaheadInProgress","getSelectedIndex","getFocusedItemIndex","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('List', slots, ['default']);
    	var _a;
    	const { closest, matches } = ponyfill;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { nonInteractive = false } = $$props;
    	let { dense = false } = $$props;
    	let { textualList = false } = $$props;
    	let { avatarList = false } = $$props;
    	let { iconList = false } = $$props;
    	let { imageList = false } = $$props;
    	let { thumbnailList = false } = $$props;
    	let { videoList = false } = $$props;
    	let { twoLine = false } = $$props;
    	let { threeLine = false } = $$props;
    	let { vertical = true } = $$props;

    	let { wrapFocus = (_a = getContext('SMUI:list:wrapFocus')) !== null && _a !== void 0
    	? _a
    	: false } = $$props;

    	let { singleSelection = false } = $$props;
    	let { selectedIndex = -1 } = $$props;
    	let { radioList = false } = $$props;
    	let { checkList = false } = $$props;
    	let { hasTypeahead = false } = $$props;
    	let element;
    	let instance;
    	let items = [];
    	let role = getContext('SMUI:list:role');
    	let nav = getContext('SMUI:list:nav');
    	const itemAccessorMap = new WeakMap();
    	let selectionDialog = getContext('SMUI:dialog:selection');
    	let addLayoutListener = getContext('SMUI:addLayoutListener');
    	let removeLayoutListener;
    	let { component = nav ? Nav : Ul } = $$props;
    	setContext('SMUI:list:nonInteractive', nonInteractive);
    	setContext('SMUI:separator:context', 'list');

    	if (!role) {
    		if (singleSelection) {
    			role = 'listbox';
    			setContext('SMUI:list:item:role', 'option');
    		} else if (radioList) {
    			role = 'radiogroup';
    			setContext('SMUI:list:item:role', 'radio');
    		} else if (checkList) {
    			role = 'group';
    			setContext('SMUI:list:item:role', 'checkbox');
    		} else {
    			role = 'list';
    			setContext('SMUI:list:item:role', undefined);
    		}
    	}

    	if (addLayoutListener) {
    		removeLayoutListener = addLayoutListener(layout);
    	}

    	onMount(() => {
    		$$invalidate(13, instance = new MDCListFoundation({
    				addClassForElementIndex,
    				focusItemAtIndex,
    				getAttributeForElementIndex: (index, name) => {
    					var _a, _b;

    					return (_b = (_a = getOrderedList()[index]) === null || _a === void 0
    					? void 0
    					: _a.getAttr(name)) !== null && _b !== void 0
    					? _b
    					: null;
    				},
    				getFocusedElementIndex: () => document.activeElement
    				? getOrderedList().map(accessor => accessor.element).indexOf(document.activeElement)
    				: -1,
    				getListItemCount: () => items.length,
    				getPrimaryTextAtIndex,
    				hasCheckboxAtIndex: index => {
    					var _a, _b;

    					return (_b = (_a = getOrderedList()[index]) === null || _a === void 0
    					? void 0
    					: _a.hasCheckbox) !== null && _b !== void 0
    					? _b
    					: false;
    				},
    				hasRadioAtIndex: index => {
    					var _a, _b;

    					return (_b = (_a = getOrderedList()[index]) === null || _a === void 0
    					? void 0
    					: _a.hasRadio) !== null && _b !== void 0
    					? _b
    					: false;
    				},
    				isCheckboxCheckedAtIndex: index => {
    					var _a;
    					const listItem = getOrderedList()[index];

    					return (_a = (listItem === null || listItem === void 0
    					? void 0
    					: listItem.hasCheckbox) && listItem.checked) !== null && _a !== void 0
    					? _a
    					: false;
    				},
    				isFocusInsideList: () => element != null && getElement() !== document.activeElement && getElement().contains(document.activeElement),
    				isRootFocused: () => element != null && document.activeElement === getElement(),
    				listItemAtIndexHasClass,
    				notifyAction: index => {
    					$$invalidate(24, selectedIndex = index);

    					if (element != null) {
    						dispatch(getElement(), 'SMUIList:action', { index }, undefined, true);
    					}
    				},
    				removeClassForElementIndex,
    				setAttributeForElementIndex,
    				setCheckedCheckboxOrRadioAtIndex: (index, isChecked) => {
    					getOrderedList()[index].checked = isChecked;
    				},
    				setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
    					const listItem = getOrderedList()[listItemIndex];
    					const selector = 'button:not(:disabled), a';

    					Array.prototype.forEach.call(listItem.element.querySelectorAll(selector), el => {
    						el.setAttribute('tabindex', tabIndexValue);
    					});
    				}
    			}));

    		const accessor = {
    			get element() {
    				return getElement();
    			},
    			get items() {
    				return items;
    			},
    			get typeaheadInProgress() {
    				return instance.isTypeaheadInProgress();
    			},
    			typeaheadMatchItem(nextChar, startingIndex) {
    				return instance.typeaheadMatchItem(nextChar, startingIndex, /** skipFocus */
    				true);
    			},
    			getOrderedList,
    			focusItemAtIndex,
    			addClassForElementIndex,
    			removeClassForElementIndex,
    			setAttributeForElementIndex,
    			removeAttributeForElementIndex,
    			getAttributeFromElementIndex,
    			getPrimaryTextAtIndex
    		};

    		dispatch(getElement(), 'SMUIList:mount', accessor);
    		instance.init();

    		return () => {
    			instance.destroy();
    		};
    	});

    	onDestroy(() => {
    		if (removeLayoutListener) {
    			removeLayoutListener();
    		}
    	});

    	function handleItemMount(event) {
    		items.push(event.detail);
    		itemAccessorMap.set(event.detail.element, event.detail);

    		if (singleSelection && event.detail.selected) {
    			$$invalidate(24, selectedIndex = getListItemIndex(event.detail.element));
    		}

    		event.stopPropagation();
    	}

    	function handleItemUnmount(event) {
    		var _a;

    		const idx = (_a = event.detail && items.indexOf(event.detail)) !== null && _a !== void 0
    		? _a
    		: -1;

    		if (idx !== -1) {
    			items.splice(idx, 1);
    			items = items;
    			itemAccessorMap.delete(event.detail.element);
    		}

    		event.stopPropagation();
    	}

    	function handleAction(event) {
    		if (radioList || checkList) {
    			const index = getListItemIndex(event.target);

    			if (index !== -1) {
    				const item = getOrderedList()[index];

    				if (item && (radioList && !item.checked || checkList)) {
    					item.checked = !item.checked;
    					item.activateRipple();

    					window.requestAnimationFrame(() => {
    						item.deactivateRipple();
    					});
    				}
    			}
    		}
    	}

    	function getOrderedList() {
    		if (element == null) {
    			return [];
    		}

    		return [...getElement().children].map(element => itemAccessorMap.get(element)).filter(accessor => accessor && accessor._smui_list_item_accessor);
    	}

    	function focusItemAtIndex(index) {
    		const accessor = getOrderedList()[index];
    		accessor && 'focus' in accessor.element && accessor.element.focus();
    	}

    	function listItemAtIndexHasClass(index, className) {
    		var _a;
    		const accessor = getOrderedList()[index];

    		return (_a = accessor && accessor.hasClass(className)) !== null && _a !== void 0
    		? _a
    		: false;
    	}

    	function addClassForElementIndex(index, className) {
    		const accessor = getOrderedList()[index];
    		accessor && accessor.addClass(className);
    	}

    	function removeClassForElementIndex(index, className) {
    		const accessor = getOrderedList()[index];
    		accessor && accessor.removeClass(className);
    	}

    	function setAttributeForElementIndex(index, name, value) {
    		const accessor = getOrderedList()[index];
    		accessor && accessor.addAttr(name, value);
    	}

    	function removeAttributeForElementIndex(index, name) {
    		const accessor = getOrderedList()[index];
    		accessor && accessor.removeAttr(name);
    	}

    	function getAttributeFromElementIndex(index, name) {
    		const accessor = getOrderedList()[index];

    		if (accessor) {
    			return accessor.getAttr(name);
    		} else {
    			return null;
    		}
    	}

    	function getPrimaryTextAtIndex(index) {
    		var _a;
    		const accessor = getOrderedList()[index];

    		return (_a = accessor && accessor.getPrimaryText()) !== null && _a !== void 0
    		? _a
    		: '';
    	}

    	function getListItemIndex(element) {
    		const nearestParent = closest(element, '.mdc-deprecated-list-item, .mdc-deprecated-list');

    		// Get the index of the element if it is a list item.
    		if (nearestParent && matches(nearestParent, '.mdc-deprecated-list-item')) {
    			return getOrderedList().map(item => item === null || item === void 0 ? void 0 : item.element).indexOf(nearestParent);
    		}

    		return -1;
    	}

    	function layout() {
    		return instance.layout();
    	}

    	function setEnabled(itemIndex, isEnabled) {
    		return instance.setEnabled(itemIndex, isEnabled);
    	}

    	function getTypeaheadInProgress() {
    		return instance.isTypeaheadInProgress();
    	}

    	function getSelectedIndex() {
    		return instance.getSelectedIndex();
    	}

    	function getFocusedItemIndex() {
    		return instance.getFocusedItemIndex();
    	}

    	function getElement() {
    		return element.getElement();
    	}

    	function switch_instance_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(14, element);
    		});
    	}

    	const keydown_handler = event => instance && instance.handleKeydown(event, event.target.classList.contains('mdc-deprecated-list-item'), getListItemIndex(event.target));
    	const focusin_handler = event => instance && instance.handleFocusIn(getListItemIndex(event.target));
    	const focusout_handler = event => instance && instance.handleFocusOut(getListItemIndex(event.target));
    	const click_handler = event => instance && instance.handleClick(getListItemIndex(event.target), !matches(event.target, 'input[type="checkbox"], input[type="radio"]'));

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(23, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('nonInteractive' in $$new_props) $$invalidate(2, nonInteractive = $$new_props.nonInteractive);
    		if ('dense' in $$new_props) $$invalidate(3, dense = $$new_props.dense);
    		if ('textualList' in $$new_props) $$invalidate(4, textualList = $$new_props.textualList);
    		if ('avatarList' in $$new_props) $$invalidate(5, avatarList = $$new_props.avatarList);
    		if ('iconList' in $$new_props) $$invalidate(6, iconList = $$new_props.iconList);
    		if ('imageList' in $$new_props) $$invalidate(7, imageList = $$new_props.imageList);
    		if ('thumbnailList' in $$new_props) $$invalidate(8, thumbnailList = $$new_props.thumbnailList);
    		if ('videoList' in $$new_props) $$invalidate(9, videoList = $$new_props.videoList);
    		if ('twoLine' in $$new_props) $$invalidate(10, twoLine = $$new_props.twoLine);
    		if ('threeLine' in $$new_props) $$invalidate(11, threeLine = $$new_props.threeLine);
    		if ('vertical' in $$new_props) $$invalidate(25, vertical = $$new_props.vertical);
    		if ('wrapFocus' in $$new_props) $$invalidate(26, wrapFocus = $$new_props.wrapFocus);
    		if ('singleSelection' in $$new_props) $$invalidate(27, singleSelection = $$new_props.singleSelection);
    		if ('selectedIndex' in $$new_props) $$invalidate(24, selectedIndex = $$new_props.selectedIndex);
    		if ('radioList' in $$new_props) $$invalidate(28, radioList = $$new_props.radioList);
    		if ('checkList' in $$new_props) $$invalidate(29, checkList = $$new_props.checkList);
    		if ('hasTypeahead' in $$new_props) $$invalidate(30, hasTypeahead = $$new_props.hasTypeahead);
    		if ('component' in $$new_props) $$invalidate(12, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(43, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		_a,
    		MDCListFoundation,
    		ponyfill,
    		onMount,
    		onDestroy,
    		getContext,
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		dispatch,
    		Ul,
    		Nav,
    		closest,
    		matches,
    		forwardEvents,
    		use,
    		className,
    		nonInteractive,
    		dense,
    		textualList,
    		avatarList,
    		iconList,
    		imageList,
    		thumbnailList,
    		videoList,
    		twoLine,
    		threeLine,
    		vertical,
    		wrapFocus,
    		singleSelection,
    		selectedIndex,
    		radioList,
    		checkList,
    		hasTypeahead,
    		element,
    		instance,
    		items,
    		role,
    		nav,
    		itemAccessorMap,
    		selectionDialog,
    		addLayoutListener,
    		removeLayoutListener,
    		component,
    		handleItemMount,
    		handleItemUnmount,
    		handleAction,
    		getOrderedList,
    		focusItemAtIndex,
    		listItemAtIndexHasClass,
    		addClassForElementIndex,
    		removeClassForElementIndex,
    		setAttributeForElementIndex,
    		removeAttributeForElementIndex,
    		getAttributeFromElementIndex,
    		getPrimaryTextAtIndex,
    		getListItemIndex,
    		layout,
    		setEnabled,
    		getTypeaheadInProgress,
    		getSelectedIndex,
    		getFocusedItemIndex,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('_a' in $$props) _a = $$new_props._a;
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('nonInteractive' in $$props) $$invalidate(2, nonInteractive = $$new_props.nonInteractive);
    		if ('dense' in $$props) $$invalidate(3, dense = $$new_props.dense);
    		if ('textualList' in $$props) $$invalidate(4, textualList = $$new_props.textualList);
    		if ('avatarList' in $$props) $$invalidate(5, avatarList = $$new_props.avatarList);
    		if ('iconList' in $$props) $$invalidate(6, iconList = $$new_props.iconList);
    		if ('imageList' in $$props) $$invalidate(7, imageList = $$new_props.imageList);
    		if ('thumbnailList' in $$props) $$invalidate(8, thumbnailList = $$new_props.thumbnailList);
    		if ('videoList' in $$props) $$invalidate(9, videoList = $$new_props.videoList);
    		if ('twoLine' in $$props) $$invalidate(10, twoLine = $$new_props.twoLine);
    		if ('threeLine' in $$props) $$invalidate(11, threeLine = $$new_props.threeLine);
    		if ('vertical' in $$props) $$invalidate(25, vertical = $$new_props.vertical);
    		if ('wrapFocus' in $$props) $$invalidate(26, wrapFocus = $$new_props.wrapFocus);
    		if ('singleSelection' in $$props) $$invalidate(27, singleSelection = $$new_props.singleSelection);
    		if ('selectedIndex' in $$props) $$invalidate(24, selectedIndex = $$new_props.selectedIndex);
    		if ('radioList' in $$props) $$invalidate(28, radioList = $$new_props.radioList);
    		if ('checkList' in $$props) $$invalidate(29, checkList = $$new_props.checkList);
    		if ('hasTypeahead' in $$props) $$invalidate(30, hasTypeahead = $$new_props.hasTypeahead);
    		if ('element' in $$props) $$invalidate(14, element = $$new_props.element);
    		if ('instance' in $$props) $$invalidate(13, instance = $$new_props.instance);
    		if ('items' in $$props) items = $$new_props.items;
    		if ('role' in $$props) $$invalidate(15, role = $$new_props.role);
    		if ('nav' in $$props) nav = $$new_props.nav;
    		if ('selectionDialog' in $$props) $$invalidate(18, selectionDialog = $$new_props.selectionDialog);
    		if ('addLayoutListener' in $$props) addLayoutListener = $$new_props.addLayoutListener;
    		if ('removeLayoutListener' in $$props) removeLayoutListener = $$new_props.removeLayoutListener;
    		if ('component' in $$props) $$invalidate(12, component = $$new_props.component);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*instance, vertical*/ 33562624) {
    			if (instance) {
    				instance.setVerticalOrientation(vertical);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, wrapFocus*/ 67117056) {
    			if (instance) {
    				instance.setWrapFocus(wrapFocus);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, hasTypeahead*/ 1073750016) {
    			if (instance) {
    				instance.setHasTypeahead(hasTypeahead);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, singleSelection*/ 134225920) {
    			if (instance) {
    				instance.setSingleSelection(singleSelection);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, singleSelection, selectedIndex*/ 151003136) {
    			if (instance && singleSelection && getSelectedIndex() !== selectedIndex) {
    				instance.setSelectedIndex(selectedIndex);
    			}
    		}
    	};

    	return [
    		use,
    		className,
    		nonInteractive,
    		dense,
    		textualList,
    		avatarList,
    		iconList,
    		imageList,
    		thumbnailList,
    		videoList,
    		twoLine,
    		threeLine,
    		component,
    		instance,
    		element,
    		role,
    		matches,
    		forwardEvents,
    		selectionDialog,
    		handleItemMount,
    		handleItemUnmount,
    		handleAction,
    		getListItemIndex,
    		$$restProps,
    		selectedIndex,
    		vertical,
    		wrapFocus,
    		singleSelection,
    		radioList,
    		checkList,
    		hasTypeahead,
    		layout,
    		setEnabled,
    		getTypeaheadInProgress,
    		getSelectedIndex,
    		getFocusedItemIndex,
    		getElement,
    		slots,
    		switch_instance_binding,
    		keydown_handler,
    		focusin_handler,
    		focusout_handler,
    		click_handler,
    		$$scope
    	];
    }

    class List extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance_1$7,
    			create_fragment$d,
    			safe_not_equal,
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
    				getElement: 36
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "List",
    			options,
    			id: create_fragment$d.name
    		});
    	}

    	get use() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nonInteractive() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nonInteractive(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dense() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dense(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get textualList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set textualList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get avatarList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set avatarList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get imageList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imageList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get thumbnailList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set thumbnailList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get videoList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set videoList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get twoLine() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set twoLine(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get threeLine() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set threeLine(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get vertical() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set vertical(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get wrapFocus() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set wrapFocus(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get singleSelection() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set singleSelection(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selectedIndex() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selectedIndex(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get radioList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set radioList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checkList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checkList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hasTypeahead() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hasTypeahead(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get layout() {
    		return this.$$.ctx[31];
    	}

    	set layout(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setEnabled() {
    		return this.$$.ctx[32];
    	}

    	set setEnabled(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getTypeaheadInProgress() {
    		return this.$$.ctx[33];
    	}

    	set getTypeaheadInProgress(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getSelectedIndex() {
    		return this.$$.ctx[34];
    	}

    	set getSelectedIndex(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getFocusedItemIndex() {
    		return this.$$.ctx[35];
    	}

    	set getFocusedItemIndex(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[36];
    	}

    	set getElement(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/list/dist/Item.svelte generated by Svelte v3.49.0 */
    const file$a = "node_modules/@smui/list/dist/Item.svelte";

    // (57:3) {#if ripple}
    function create_if_block$3(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", "mdc-deprecated-list-item__ripple");
    			add_location(span, file$a, 56, 15, 1701);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(57:3) {#if ripple}",
    		ctx
    	});

    	return block;
    }

    // (1:0) <svelte:component   this={component}   bind:this={element}   use={[     ...(nonInteractive       ? []       : [           [             Ripple,             {               ripple: !input,               unbounded: false,               color:                 (activated || selected) && color == null ? 'primary' : color,               disabled,               addClass,               removeClass,               addStyle,             },           ],         ]),     forwardEvents,     ...use,   ]}   class={classMap({     [className]: true,     'mdc-deprecated-list-item': true,     'mdc-deprecated-list-item--activated': activated,     'mdc-deprecated-list-item--selected': selected,     'mdc-deprecated-list-item--disabled': disabled,     'mdc-menu-item--selected': !nav && role === 'menuitem' && selected,     'smui-menu-item--non-interactive': nonInteractive,     ...internalClasses,   })}   style={Object.entries(internalStyles)     .map(([name, value]) => `${name}: ${value};`)     .concat([style])     .join(' ')}   {...nav && activated ? { 'aria-current': 'page' } : {}}   {...!nav ? { role } : {}}   {...!nav && role === 'option'     ? { 'aria-selected': selected ? 'true' : 'false' }     : {}}   {...!nav && (role === 'radio' || role === 'checkbox')     ? { 'aria-checked': input && input.checked ? 'true' : 'false' }     : {}}   {...!nav ? { 'aria-disabled': disabled ? 'true' : 'false' } : {}}   data-menu-item-skip-restore-focus={skipRestoreFocus || undefined}   {tabindex}   on:click={action}   on:keydown={handleKeydown}   on:SMUIGenericInput:mount={handleInputMount}   on:SMUIGenericInput:unmount={() => (input = undefined)}   {href}   {...internalAttrs}   {...$$restProps}   >
    function create_default_slot$5(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*ripple*/ ctx[7] && create_if_block$3(ctx);
    	const default_slot_template = /*#slots*/ ctx[32].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[35], null);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*ripple*/ ctx[7]) {
    				if (if_block) ; else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[35],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[35])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[35], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(1:0) <svelte:component   this={component}   bind:this={element}   use={[     ...(nonInteractive       ? []       : [           [             Ripple,             {               ripple: !input,               unbounded: false,               color:                 (activated || selected) && color == null ? 'primary' : color,               disabled,               addClass,               removeClass,               addStyle,             },           ],         ]),     forwardEvents,     ...use,   ]}   class={classMap({     [className]: true,     'mdc-deprecated-list-item': true,     'mdc-deprecated-list-item--activated': activated,     'mdc-deprecated-list-item--selected': selected,     'mdc-deprecated-list-item--disabled': disabled,     'mdc-menu-item--selected': !nav && role === 'menuitem' && selected,     'smui-menu-item--non-interactive': nonInteractive,     ...internalClasses,   })}   style={Object.entries(internalStyles)     .map(([name, value]) => `${name}: ${value};`)     .concat([style])     .join(' ')}   {...nav && activated ? { 'aria-current': 'page' } : {}}   {...!nav ? { role } : {}}   {...!nav && role === 'option'     ? { 'aria-selected': selected ? 'true' : 'false' }     : {}}   {...!nav && (role === 'radio' || role === 'checkbox')     ? { 'aria-checked': input && input.checked ? 'true' : 'false' }     : {}}   {...!nav ? { 'aria-disabled': disabled ? 'true' : 'false' } : {}}   data-menu-item-skip-restore-focus={skipRestoreFocus || undefined}   {tabindex}   on:click={action}   on:keydown={handleKeydown}   on:SMUIGenericInput:mount={handleInputMount}   on:SMUIGenericInput:unmount={() => (input = undefined)}   {href}   {...internalAttrs}   {...$$restProps}   >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{
    			use: [
    				.../*nonInteractive*/ ctx[6]
    				? []
    				: [
    						[
    							Ripple,
    							{
    								ripple: !/*input*/ ctx[14],
    								unbounded: false,
    								color: (/*activated*/ ctx[1] || /*selected*/ ctx[0]) && /*color*/ ctx[5] == null
    								? 'primary'
    								: /*color*/ ctx[5],
    								disabled: /*disabled*/ ctx[9],
    								addClass: /*addClass*/ ctx[22],
    								removeClass: /*removeClass*/ ctx[23],
    								addStyle: /*addStyle*/ ctx[24]
    							}
    						]
    					],
    				/*forwardEvents*/ ctx[20],
    				.../*use*/ ctx[2]
    			]
    		},
    		{
    			class: classMap({
    				[/*className*/ ctx[3]]: true,
    				'mdc-deprecated-list-item': true,
    				'mdc-deprecated-list-item--activated': /*activated*/ ctx[1],
    				'mdc-deprecated-list-item--selected': /*selected*/ ctx[0],
    				'mdc-deprecated-list-item--disabled': /*disabled*/ ctx[9],
    				'mdc-menu-item--selected': !/*nav*/ ctx[21] && /*role*/ ctx[8] === 'menuitem' && /*selected*/ ctx[0],
    				'smui-menu-item--non-interactive': /*nonInteractive*/ ctx[6],
    				.../*internalClasses*/ ctx[16]
    			})
    		},
    		{
    			style: Object.entries(/*internalStyles*/ ctx[17]).map(func$3).concat([/*style*/ ctx[4]]).join(' ')
    		},
    		/*nav*/ ctx[21] && /*activated*/ ctx[1]
    		? { 'aria-current': 'page' }
    		: {},
    		!/*nav*/ ctx[21] ? { role: /*role*/ ctx[8] } : {},
    		!/*nav*/ ctx[21] && /*role*/ ctx[8] === 'option'
    		? {
    				'aria-selected': /*selected*/ ctx[0] ? 'true' : 'false'
    			}
    		: {},
    		!/*nav*/ ctx[21] && (/*role*/ ctx[8] === 'radio' || /*role*/ ctx[8] === 'checkbox')
    		? {
    				'aria-checked': /*input*/ ctx[14] && /*input*/ ctx[14].checked
    				? 'true'
    				: 'false'
    			}
    		: {},
    		!/*nav*/ ctx[21]
    		? {
    				'aria-disabled': /*disabled*/ ctx[9] ? 'true' : 'false'
    			}
    		: {},
    		{
    			"data-menu-item-skip-restore-focus": /*skipRestoreFocus*/ ctx[10] || undefined
    		},
    		{ tabindex: /*tabindex*/ ctx[19] },
    		{ href: /*href*/ ctx[11] },
    		/*internalAttrs*/ ctx[18],
    		/*$$restProps*/ ctx[27]
    	];

    	var switch_value = /*component*/ ctx[12];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot$5] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    		/*switch_instance_binding*/ ctx[33](switch_instance);
    		switch_instance.$on("click", /*action*/ ctx[13]);
    		switch_instance.$on("keydown", /*handleKeydown*/ ctx[25]);
    		switch_instance.$on("SMUIGenericInput:mount", /*handleInputMount*/ ctx[26]);
    		switch_instance.$on("SMUIGenericInput:unmount", /*SMUIGenericInput_unmount_handler*/ ctx[34]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty[0] & /*nonInteractive, input, activated, selected, color, disabled, addClass, removeClass, addStyle, forwardEvents, use, className, nav, role, internalClasses, internalStyles, style, skipRestoreFocus, tabindex, href, internalAttrs, $$restProps*/ 167726975)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty[0] & /*nonInteractive, input, activated, selected, color, disabled, addClass, removeClass, addStyle, forwardEvents, use*/ 30425703 && {
    						use: [
    							.../*nonInteractive*/ ctx[6]
    							? []
    							: [
    									[
    										Ripple,
    										{
    											ripple: !/*input*/ ctx[14],
    											unbounded: false,
    											color: (/*activated*/ ctx[1] || /*selected*/ ctx[0]) && /*color*/ ctx[5] == null
    											? 'primary'
    											: /*color*/ ctx[5],
    											disabled: /*disabled*/ ctx[9],
    											addClass: /*addClass*/ ctx[22],
    											removeClass: /*removeClass*/ ctx[23],
    											addStyle: /*addStyle*/ ctx[24]
    										}
    									]
    								],
    							/*forwardEvents*/ ctx[20],
    							.../*use*/ ctx[2]
    						]
    					},
    					dirty[0] & /*className, activated, selected, disabled, nav, role, nonInteractive, internalClasses*/ 2163531 && {
    						class: classMap({
    							[/*className*/ ctx[3]]: true,
    							'mdc-deprecated-list-item': true,
    							'mdc-deprecated-list-item--activated': /*activated*/ ctx[1],
    							'mdc-deprecated-list-item--selected': /*selected*/ ctx[0],
    							'mdc-deprecated-list-item--disabled': /*disabled*/ ctx[9],
    							'mdc-menu-item--selected': !/*nav*/ ctx[21] && /*role*/ ctx[8] === 'menuitem' && /*selected*/ ctx[0],
    							'smui-menu-item--non-interactive': /*nonInteractive*/ ctx[6],
    							.../*internalClasses*/ ctx[16]
    						})
    					},
    					dirty[0] & /*internalStyles, style*/ 131088 && {
    						style: Object.entries(/*internalStyles*/ ctx[17]).map(func$3).concat([/*style*/ ctx[4]]).join(' ')
    					},
    					dirty[0] & /*nav, activated*/ 2097154 && get_spread_object(/*nav*/ ctx[21] && /*activated*/ ctx[1]
    					? { 'aria-current': 'page' }
    					: {}),
    					dirty[0] & /*nav, role*/ 2097408 && get_spread_object(!/*nav*/ ctx[21] ? { role: /*role*/ ctx[8] } : {}),
    					dirty[0] & /*nav, role, selected*/ 2097409 && get_spread_object(!/*nav*/ ctx[21] && /*role*/ ctx[8] === 'option'
    					? {
    							'aria-selected': /*selected*/ ctx[0] ? 'true' : 'false'
    						}
    					: {}),
    					dirty[0] & /*nav, role, input*/ 2113792 && get_spread_object(!/*nav*/ ctx[21] && (/*role*/ ctx[8] === 'radio' || /*role*/ ctx[8] === 'checkbox')
    					? {
    							'aria-checked': /*input*/ ctx[14] && /*input*/ ctx[14].checked
    							? 'true'
    							: 'false'
    						}
    					: {}),
    					dirty[0] & /*nav, disabled*/ 2097664 && get_spread_object(!/*nav*/ ctx[21]
    					? {
    							'aria-disabled': /*disabled*/ ctx[9] ? 'true' : 'false'
    						}
    					: {}),
    					dirty[0] & /*skipRestoreFocus*/ 1024 && {
    						"data-menu-item-skip-restore-focus": /*skipRestoreFocus*/ ctx[10] || undefined
    					},
    					dirty[0] & /*tabindex*/ 524288 && { tabindex: /*tabindex*/ ctx[19] },
    					dirty[0] & /*href*/ 2048 && { href: /*href*/ ctx[11] },
    					dirty[0] & /*internalAttrs*/ 262144 && get_spread_object(/*internalAttrs*/ ctx[18]),
    					dirty[0] & /*$$restProps*/ 134217728 && get_spread_object(/*$$restProps*/ ctx[27])
    				])
    			: {};

    			if (dirty[0] & /*ripple*/ 128 | dirty[1] & /*$$scope*/ 16) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*component*/ ctx[12])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					/*switch_instance_binding*/ ctx[33](switch_instance);
    					switch_instance.$on("click", /*action*/ ctx[13]);
    					switch_instance.$on("keydown", /*handleKeydown*/ ctx[25]);
    					switch_instance.$on("SMUIGenericInput:mount", /*handleInputMount*/ ctx[26]);
    					switch_instance.$on("SMUIGenericInput:unmount", /*SMUIGenericInput_unmount_handler*/ ctx[34]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*switch_instance_binding*/ ctx[33](null);
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }
    let counter$3 = 0;
    const func$3 = ([name, value]) => `${name}: ${value};`;

    function instance$5($$self, $$props, $$invalidate) {
    	let tabindex;

    	const omit_props_names = [
    		"use","class","style","color","nonInteractive","ripple","activated","role","selected","disabled","skipRestoreFocus","tabindex","inputId","href","component","action","getPrimaryText","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Item', slots, ['default']);
    	var _a;
    	const forwardEvents = forwardEventsBuilder(get_current_component());

    	let uninitializedValue = () => {
    		
    	};

    	function isUninitializedValue(value) {
    		return value === uninitializedValue;
    	}

    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { style = '' } = $$props;
    	let { color = undefined } = $$props;

    	let { nonInteractive = (_a = getContext('SMUI:list:nonInteractive')) !== null && _a !== void 0
    	? _a
    	: false } = $$props;

    	setContext('SMUI:list:nonInteractive', undefined);
    	let { ripple = !nonInteractive } = $$props;
    	let { activated = false } = $$props;
    	let { role = getContext('SMUI:list:item:role') } = $$props;
    	setContext('SMUI:list:item:role', undefined);
    	let { selected = false } = $$props;
    	let { disabled = false } = $$props;
    	let { skipRestoreFocus = false } = $$props;
    	let { tabindex: tabindexProp = uninitializedValue } = $$props;
    	let { inputId = 'SMUI-form-field-list-' + counter$3++ } = $$props;
    	let { href = undefined } = $$props;
    	let element;
    	let internalClasses = {};
    	let internalStyles = {};
    	let internalAttrs = {};
    	let input;
    	let addTabindexIfNoItemsSelectedRaf;
    	let nav = getContext('SMUI:list:item:nav');
    	let { component = nav ? href ? A : Span : Li } = $$props;
    	setContext('SMUI:generic:input:props', { id: inputId });

    	// Reset separator context, because we aren't directly under a list anymore.
    	setContext('SMUI:separator:context', undefined);

    	onMount(() => {
    		// Tabindex needs to be '0' if this is the first non-disabled list item, and
    		// no other item is selected.
    		if (!selected && !nonInteractive) {
    			let first = true;
    			let el = element;

    			while (el.previousSibling) {
    				el = el.previousSibling;

    				if (el.nodeType === 1 && el.classList.contains('mdc-deprecated-list-item') && !el.classList.contains('mdc-deprecated-list-item--disabled')) {
    					first = false;
    					break;
    				}
    			}

    			if (first) {
    				// This is first, so now set up a check that no other items are
    				// selected.
    				addTabindexIfNoItemsSelectedRaf = window.requestAnimationFrame(addTabindexIfNoItemsSelected);
    			}
    		}

    		const accessor = {
    			_smui_list_item_accessor: true,
    			get element() {
    				return getElement();
    			},
    			get selected() {
    				return selected;
    			},
    			set selected(value) {
    				$$invalidate(0, selected = value);
    			},
    			hasClass,
    			addClass,
    			removeClass,
    			getAttr,
    			addAttr,
    			removeAttr,
    			getPrimaryText,
    			// For inputs within item.
    			get checked() {
    				var _a;

    				return (_a = input && input.checked) !== null && _a !== void 0
    				? _a
    				: false;
    			},
    			set checked(value) {
    				if (input) {
    					$$invalidate(14, input.checked = !!value, input);
    				}
    			},
    			get hasCheckbox() {
    				return !!(input && '_smui_checkbox_accessor' in input);
    			},
    			get hasRadio() {
    				return !!(input && '_smui_radio_accessor' in input);
    			},
    			activateRipple() {
    				if (input) {
    					input.activateRipple();
    				}
    			},
    			deactivateRipple() {
    				if (input) {
    					input.deactivateRipple();
    				}
    			},
    			// For select options.
    			getValue() {
    				return $$restProps.value;
    			},
    			// For autocomplete
    			action,
    			get tabindex() {
    				return tabindex;
    			},
    			set tabindex(value) {
    				$$invalidate(28, tabindexProp = value);
    			},
    			get disabled() {
    				return disabled;
    			},
    			get activated() {
    				return activated;
    			},
    			set activated(value) {
    				$$invalidate(1, activated = value);
    			}
    		};

    		dispatch(getElement(), 'SMUIListItem:mount', accessor);

    		return () => {
    			dispatch(getElement(), 'SMUIListItem:unmount', accessor);
    		};
    	});

    	onDestroy(() => {
    		if (addTabindexIfNoItemsSelectedRaf) {
    			window.cancelAnimationFrame(addTabindexIfNoItemsSelectedRaf);
    		}
    	});

    	function hasClass(className) {
    		return className in internalClasses
    		? internalClasses[className]
    		: getElement().classList.contains(className);
    	}

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(16, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(16, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function addStyle(name, value) {
    		if (internalStyles[name] != value) {
    			if (value === '' || value == null) {
    				delete internalStyles[name];
    				$$invalidate(17, internalStyles);
    			} else {
    				$$invalidate(17, internalStyles[name] = value, internalStyles);
    			}
    		}
    	}

    	function getAttr(name) {
    		var _a;

    		return name in internalAttrs
    		? (_a = internalAttrs[name]) !== null && _a !== void 0
    			? _a
    			: null
    		: getElement().getAttribute(name);
    	}

    	function addAttr(name, value) {
    		if (internalAttrs[name] !== value) {
    			$$invalidate(18, internalAttrs[name] = value, internalAttrs);
    		}
    	}

    	function removeAttr(name) {
    		if (!(name in internalAttrs) || internalAttrs[name] != null) {
    			$$invalidate(18, internalAttrs[name] = undefined, internalAttrs);
    		}
    	}

    	function addTabindexIfNoItemsSelected() {
    		// Look through next siblings to see if none of them are selected.
    		let noneSelected = true;

    		let el = element.getElement();

    		while (el.nextElementSibling) {
    			el = el.nextElementSibling;

    			if (el.nodeType === 1 && el.classList.contains('mdc-deprecated-list-item')) {
    				const tabindexAttr = el.attributes.getNamedItem('tabindex');

    				if (tabindexAttr && tabindexAttr.value === '0') {
    					noneSelected = false;
    					break;
    				}
    			}
    		}

    		if (noneSelected) {
    			// This is the first element, and no other element is selected, so the
    			// tabindex should be '0'.
    			$$invalidate(19, tabindex = 0);
    		}
    	}

    	function handleKeydown(e) {
    		const isEnter = e.key === 'Enter';
    		const isSpace = e.key === 'Space';

    		if (isEnter || isSpace) {
    			action(e);
    		}
    	}

    	function handleInputMount(e) {
    		if ('_smui_checkbox_accessor' in e.detail || '_smui_radio_accessor' in e.detail) {
    			$$invalidate(14, input = e.detail);
    		}
    	}

    	function action(e) {
    		if (!disabled) {
    			dispatch(getElement(), 'SMUI:action', e);
    		}
    	}

    	function getPrimaryText() {
    		var _a, _b, _c;
    		const element = getElement();
    		const primaryText = element.querySelector('.mdc-deprecated-list-item__primary-text');

    		if (primaryText) {
    			return (_a = primaryText.textContent) !== null && _a !== void 0
    			? _a
    			: '';
    		}

    		const text = element.querySelector('.mdc-deprecated-list-item__text');

    		if (text) {
    			return (_b = text.textContent) !== null && _b !== void 0
    			? _b
    			: '';
    		}

    		return (_c = element.textContent) !== null && _c !== void 0
    		? _c
    		: '';
    	}

    	function getElement() {
    		return element.getElement();
    	}

    	function switch_instance_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(15, element);
    		});
    	}

    	const SMUIGenericInput_unmount_handler = () => $$invalidate(14, input = undefined);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(27, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(2, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('style' in $$new_props) $$invalidate(4, style = $$new_props.style);
    		if ('color' in $$new_props) $$invalidate(5, color = $$new_props.color);
    		if ('nonInteractive' in $$new_props) $$invalidate(6, nonInteractive = $$new_props.nonInteractive);
    		if ('ripple' in $$new_props) $$invalidate(7, ripple = $$new_props.ripple);
    		if ('activated' in $$new_props) $$invalidate(1, activated = $$new_props.activated);
    		if ('role' in $$new_props) $$invalidate(8, role = $$new_props.role);
    		if ('selected' in $$new_props) $$invalidate(0, selected = $$new_props.selected);
    		if ('disabled' in $$new_props) $$invalidate(9, disabled = $$new_props.disabled);
    		if ('skipRestoreFocus' in $$new_props) $$invalidate(10, skipRestoreFocus = $$new_props.skipRestoreFocus);
    		if ('tabindex' in $$new_props) $$invalidate(28, tabindexProp = $$new_props.tabindex);
    		if ('inputId' in $$new_props) $$invalidate(29, inputId = $$new_props.inputId);
    		if ('href' in $$new_props) $$invalidate(11, href = $$new_props.href);
    		if ('component' in $$new_props) $$invalidate(12, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(35, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		counter: counter$3,
    		_a,
    		onMount,
    		onDestroy,
    		getContext,
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		dispatch,
    		Ripple,
    		A,
    		Span,
    		Li,
    		forwardEvents,
    		uninitializedValue,
    		isUninitializedValue,
    		use,
    		className,
    		style,
    		color,
    		nonInteractive,
    		ripple,
    		activated,
    		role,
    		selected,
    		disabled,
    		skipRestoreFocus,
    		tabindexProp,
    		inputId,
    		href,
    		element,
    		internalClasses,
    		internalStyles,
    		internalAttrs,
    		input,
    		addTabindexIfNoItemsSelectedRaf,
    		nav,
    		component,
    		hasClass,
    		addClass,
    		removeClass,
    		addStyle,
    		getAttr,
    		addAttr,
    		removeAttr,
    		addTabindexIfNoItemsSelected,
    		handleKeydown,
    		handleInputMount,
    		action,
    		getPrimaryText,
    		getElement,
    		tabindex
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('_a' in $$props) _a = $$new_props._a;
    		if ('uninitializedValue' in $$props) uninitializedValue = $$new_props.uninitializedValue;
    		if ('use' in $$props) $$invalidate(2, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('style' in $$props) $$invalidate(4, style = $$new_props.style);
    		if ('color' in $$props) $$invalidate(5, color = $$new_props.color);
    		if ('nonInteractive' in $$props) $$invalidate(6, nonInteractive = $$new_props.nonInteractive);
    		if ('ripple' in $$props) $$invalidate(7, ripple = $$new_props.ripple);
    		if ('activated' in $$props) $$invalidate(1, activated = $$new_props.activated);
    		if ('role' in $$props) $$invalidate(8, role = $$new_props.role);
    		if ('selected' in $$props) $$invalidate(0, selected = $$new_props.selected);
    		if ('disabled' in $$props) $$invalidate(9, disabled = $$new_props.disabled);
    		if ('skipRestoreFocus' in $$props) $$invalidate(10, skipRestoreFocus = $$new_props.skipRestoreFocus);
    		if ('tabindexProp' in $$props) $$invalidate(28, tabindexProp = $$new_props.tabindexProp);
    		if ('inputId' in $$props) $$invalidate(29, inputId = $$new_props.inputId);
    		if ('href' in $$props) $$invalidate(11, href = $$new_props.href);
    		if ('element' in $$props) $$invalidate(15, element = $$new_props.element);
    		if ('internalClasses' in $$props) $$invalidate(16, internalClasses = $$new_props.internalClasses);
    		if ('internalStyles' in $$props) $$invalidate(17, internalStyles = $$new_props.internalStyles);
    		if ('internalAttrs' in $$props) $$invalidate(18, internalAttrs = $$new_props.internalAttrs);
    		if ('input' in $$props) $$invalidate(14, input = $$new_props.input);
    		if ('addTabindexIfNoItemsSelectedRaf' in $$props) addTabindexIfNoItemsSelectedRaf = $$new_props.addTabindexIfNoItemsSelectedRaf;
    		if ('nav' in $$props) $$invalidate(21, nav = $$new_props.nav);
    		if ('component' in $$props) $$invalidate(12, component = $$new_props.component);
    		if ('tabindex' in $$props) $$invalidate(19, tabindex = $$new_props.tabindex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*tabindexProp, nonInteractive, disabled, selected, input*/ 268452417) {
    			$$invalidate(19, tabindex = isUninitializedValue(tabindexProp)
    			? !nonInteractive && !disabled && (selected || input && input.checked)
    				? 0
    				: -1
    			: tabindexProp);
    		}
    	};

    	return [
    		selected,
    		activated,
    		use,
    		className,
    		style,
    		color,
    		nonInteractive,
    		ripple,
    		role,
    		disabled,
    		skipRestoreFocus,
    		href,
    		component,
    		action,
    		input,
    		element,
    		internalClasses,
    		internalStyles,
    		internalAttrs,
    		tabindex,
    		forwardEvents,
    		nav,
    		addClass,
    		removeClass,
    		addStyle,
    		handleKeydown,
    		handleInputMount,
    		$$restProps,
    		tabindexProp,
    		inputId,
    		getPrimaryText,
    		getElement,
    		slots,
    		switch_instance_binding,
    		SMUIGenericInput_unmount_handler,
    		$$scope
    	];
    }

    class Item$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$5,
    			create_fragment$c,
    			safe_not_equal,
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
    				getElement: 31
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Item",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get use() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nonInteractive() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nonInteractive(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ripple() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ripple(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activated() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activated(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get role() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set role(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selected() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selected(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get skipRestoreFocus() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set skipRestoreFocus(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tabindex() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tabindex(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inputId() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inputId(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get action() {
    		return this.$$.ctx[13];
    	}

    	set action(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getPrimaryText() {
    		return this.$$.ctx[30];
    	}

    	set getPrimaryText(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[31];
    	}

    	set getElement(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Text = classAdderBuilder({
        class: 'mdc-deprecated-list-item__text',
        component: Span,
    });

    var PrimaryText = classAdderBuilder({
        class: 'mdc-deprecated-list-item__primary-text',
        component: Span,
    });

    var SecondaryText = classAdderBuilder({
        class: 'mdc-deprecated-list-item__secondary-text',
        component: Span,
    });

    /* node_modules/@smui/list/dist/Graphic.svelte generated by Svelte v3.49.0 */
    const file$9 = "node_modules/@smui/list/dist/Graphic.svelte";

    function create_fragment$b(ctx) {
    	let span;
    	let span_class_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

    	let span_levels = [
    		{
    			class: span_class_value = classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-deprecated-list-item__graphic': true,
    				'mdc-menu__selection-group-icon': /*menuSelectionGroup*/ ctx[4]
    			})
    		},
    		/*$$restProps*/ ctx[5]
    	];

    	let span_data = {};

    	for (let i = 0; i < span_levels.length; i += 1) {
    		span_data = assign(span_data, span_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (default_slot) default_slot.c();
    			set_attributes(span, span_data);
    			add_location(span, file$9, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (default_slot) {
    				default_slot.m(span, null);
    			}

    			/*span_binding*/ ctx[9](span);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, span, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[3].call(null, span))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 128)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[7],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(span, span_data = get_spread_update(span_levels, [
    				(!current || dirty & /*className*/ 2 && span_class_value !== (span_class_value = classMap({
    					[/*className*/ ctx[1]]: true,
    					'mdc-deprecated-list-item__graphic': true,
    					'mdc-menu__selection-group-icon': /*menuSelectionGroup*/ ctx[4]
    				}))) && { class: span_class_value },
    				dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (default_slot) default_slot.d(detaching);
    			/*span_binding*/ ctx[9](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","class","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Graphic', slots, ['default']);
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let element;
    	let menuSelectionGroup = getContext('SMUI:list:graphic:menu-selection-group');

    	function getElement() {
    		return element;
    	}

    	function span_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(2, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('$$scope' in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		useActions,
    		forwardEvents,
    		use,
    		className,
    		element,
    		menuSelectionGroup,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('element' in $$props) $$invalidate(2, element = $$new_props.element);
    		if ('menuSelectionGroup' in $$props) $$invalidate(4, menuSelectionGroup = $$new_props.menuSelectionGroup);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		className,
    		element,
    		forwardEvents,
    		menuSelectionGroup,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		span_binding
    	];
    }

    class Graphic$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$b, safe_not_equal, { use: 0, class: 1, getElement: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Graphic",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get use() {
    		throw new Error("<Graphic>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Graphic>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Graphic>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Graphic>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[6];
    	}

    	set getElement(value) {
    		throw new Error("<Graphic>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    classAdderBuilder({
        class: 'mdc-deprecated-list-item__meta',
        component: Span,
    });

    classAdderBuilder({
        class: 'mdc-deprecated-list-group',
        component: Div,
    });

    classAdderBuilder({
        class: 'mdc-deprecated-list-group__subheader',
        component: H3,
    });

    const Item = Item$1;
    const Graphic = Graphic$1;

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
    var cssClasses$6 = {
        ANIMATE: 'mdc-drawer--animate',
        CLOSING: 'mdc-drawer--closing',
        DISMISSIBLE: 'mdc-drawer--dismissible',
        MODAL: 'mdc-drawer--modal',
        OPEN: 'mdc-drawer--open',
        OPENING: 'mdc-drawer--opening',
        ROOT: 'mdc-drawer',
    };
    var strings$6 = {
        APP_CONTENT_SELECTOR: '.mdc-drawer-app-content',
        CLOSE_EVENT: 'MDCDrawer:closed',
        OPEN_EVENT: 'MDCDrawer:opened',
        SCRIM_SELECTOR: '.mdc-drawer-scrim',
        LIST_SELECTOR: '.mdc-list,.mdc-deprecated-list',
        LIST_ITEM_ACTIVATED_SELECTOR: '.mdc-list-item--activated,.mdc-deprecated-list-item--activated',
    };

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
    var MDCDismissibleDrawerFoundation = /** @class */ (function (_super) {
        __extends(MDCDismissibleDrawerFoundation, _super);
        function MDCDismissibleDrawerFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCDismissibleDrawerFoundation.defaultAdapter), adapter)) || this;
            _this.animationFrame = 0;
            _this.animationTimer = 0;
            return _this;
        }
        Object.defineProperty(MDCDismissibleDrawerFoundation, "strings", {
            get: function () {
                return strings$6;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCDismissibleDrawerFoundation, "cssClasses", {
            get: function () {
                return cssClasses$6;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCDismissibleDrawerFoundation, "defaultAdapter", {
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    elementHasClass: function () { return false; },
                    notifyClose: function () { return undefined; },
                    notifyOpen: function () { return undefined; },
                    saveFocus: function () { return undefined; },
                    restoreFocus: function () { return undefined; },
                    focusActiveNavigationItem: function () { return undefined; },
                    trapFocus: function () { return undefined; },
                    releaseFocus: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: false,
            configurable: true
        });
        MDCDismissibleDrawerFoundation.prototype.destroy = function () {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            if (this.animationTimer) {
                clearTimeout(this.animationTimer);
            }
        };
        /**
         * Opens the drawer from the closed state.
         */
        MDCDismissibleDrawerFoundation.prototype.open = function () {
            var _this = this;
            if (this.isOpen() || this.isOpening() || this.isClosing()) {
                return;
            }
            this.adapter.addClass(cssClasses$6.OPEN);
            this.adapter.addClass(cssClasses$6.ANIMATE);
            // Wait a frame once display is no longer "none", to establish basis for animation
            this.runNextAnimationFrame(function () {
                _this.adapter.addClass(cssClasses$6.OPENING);
            });
            this.adapter.saveFocus();
        };
        /**
         * Closes the drawer from the open state.
         */
        MDCDismissibleDrawerFoundation.prototype.close = function () {
            if (!this.isOpen() || this.isOpening() || this.isClosing()) {
                return;
            }
            this.adapter.addClass(cssClasses$6.CLOSING);
        };
        /**
         * Returns true if the drawer is in the open position.
         * @return true if drawer is in open state.
         */
        MDCDismissibleDrawerFoundation.prototype.isOpen = function () {
            return this.adapter.hasClass(cssClasses$6.OPEN);
        };
        /**
         * Returns true if the drawer is animating open.
         * @return true if drawer is animating open.
         */
        MDCDismissibleDrawerFoundation.prototype.isOpening = function () {
            return this.adapter.hasClass(cssClasses$6.OPENING) ||
                this.adapter.hasClass(cssClasses$6.ANIMATE);
        };
        /**
         * Returns true if the drawer is animating closed.
         * @return true if drawer is animating closed.
         */
        MDCDismissibleDrawerFoundation.prototype.isClosing = function () {
            return this.adapter.hasClass(cssClasses$6.CLOSING);
        };
        /**
         * Keydown handler to close drawer when key is escape.
         */
        MDCDismissibleDrawerFoundation.prototype.handleKeydown = function (evt) {
            var keyCode = evt.keyCode, key = evt.key;
            var isEscape = key === 'Escape' || keyCode === 27;
            if (isEscape) {
                this.close();
            }
        };
        /**
         * Handles the `transitionend` event when the drawer finishes opening/closing.
         */
        MDCDismissibleDrawerFoundation.prototype.handleTransitionEnd = function (evt) {
            var OPENING = cssClasses$6.OPENING, CLOSING = cssClasses$6.CLOSING, OPEN = cssClasses$6.OPEN, ANIMATE = cssClasses$6.ANIMATE, ROOT = cssClasses$6.ROOT;
            // In Edge, transitionend on ripple pseudo-elements yields a target without classList, so check for Element first.
            var isRootElement = this.isElement(evt.target) &&
                this.adapter.elementHasClass(evt.target, ROOT);
            if (!isRootElement) {
                return;
            }
            if (this.isClosing()) {
                this.adapter.removeClass(OPEN);
                this.closed();
                this.adapter.restoreFocus();
                this.adapter.notifyClose();
            }
            else {
                this.adapter.focusActiveNavigationItem();
                this.opened();
                this.adapter.notifyOpen();
            }
            this.adapter.removeClass(ANIMATE);
            this.adapter.removeClass(OPENING);
            this.adapter.removeClass(CLOSING);
        };
        /**
         * Extension point for when drawer finishes open animation.
         */
        MDCDismissibleDrawerFoundation.prototype.opened = function () { }; // tslint:disable-line:no-empty
        /**
         * Extension point for when drawer finishes close animation.
         */
        MDCDismissibleDrawerFoundation.prototype.closed = function () { }; // tslint:disable-line:no-empty
        /**
         * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
         */
        MDCDismissibleDrawerFoundation.prototype.runNextAnimationFrame = function (callback) {
            var _this = this;
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = requestAnimationFrame(function () {
                _this.animationFrame = 0;
                clearTimeout(_this.animationTimer);
                _this.animationTimer = setTimeout(callback, 0);
            });
        };
        MDCDismissibleDrawerFoundation.prototype.isElement = function (element) {
            // In Edge, transitionend on ripple pseudo-elements yields a target without classList.
            return Boolean(element.classList);
        };
        return MDCDismissibleDrawerFoundation;
    }(MDCFoundation));

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
    /* istanbul ignore next: subclass is not a branch statement */
    var MDCModalDrawerFoundation = /** @class */ (function (_super) {
        __extends(MDCModalDrawerFoundation, _super);
        function MDCModalDrawerFoundation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Handles click event on scrim.
         */
        MDCModalDrawerFoundation.prototype.handleScrimClick = function () {
            this.close();
        };
        /**
         * Called when drawer finishes open animation.
         */
        MDCModalDrawerFoundation.prototype.opened = function () {
            this.adapter.trapFocus();
        };
        /**
         * Called when drawer finishes close animation.
         */
        MDCModalDrawerFoundation.prototype.closed = function () {
            this.adapter.releaseFocus();
        };
        return MDCModalDrawerFoundation;
    }(MDCDismissibleDrawerFoundation));

    /* node_modules/@smui/drawer/dist/Drawer.svelte generated by Svelte v3.49.0 */

    const file$8 = "node_modules/@smui/drawer/dist/Drawer.svelte";

    function create_fragment$a(ctx) {
    	let aside;
    	let aside_class_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[15].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], null);

    	let aside_levels = [
    		{
    			class: aside_class_value = classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-drawer': true,
    				'mdc-drawer--dismissible': /*variant*/ ctx[2] === 'dismissible',
    				'mdc-drawer--modal': /*variant*/ ctx[2] === 'modal',
    				'smui-drawer__absolute': /*variant*/ ctx[2] === 'modal' && !/*fixed*/ ctx[3],
    				.../*internalClasses*/ ctx[6]
    			})
    		},
    		/*$$restProps*/ ctx[8]
    	];

    	let aside_data = {};

    	for (let i = 0; i < aside_levels.length; i += 1) {
    		aside_data = assign(aside_data, aside_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			aside = element("aside");
    			if (default_slot) default_slot.c();
    			set_attributes(aside, aside_data);
    			add_location(aside, file$8, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, aside, anchor);

    			if (default_slot) {
    				default_slot.m(aside, null);
    			}

    			/*aside_binding*/ ctx[16](aside);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, aside, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[7].call(null, aside)),
    					listen_dev(aside, "keydown", /*keydown_handler*/ ctx[17], false, false, false),
    					listen_dev(aside, "transitionend", /*transitionend_handler*/ ctx[18], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16384)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[14],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[14], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(aside, aside_data = get_spread_update(aside_levels, [
    				(!current || dirty & /*className, variant, fixed, internalClasses*/ 78 && aside_class_value !== (aside_class_value = classMap({
    					[/*className*/ ctx[1]]: true,
    					'mdc-drawer': true,
    					'mdc-drawer--dismissible': /*variant*/ ctx[2] === 'dismissible',
    					'mdc-drawer--modal': /*variant*/ ctx[2] === 'modal',
    					'smui-drawer__absolute': /*variant*/ ctx[2] === 'modal' && !/*fixed*/ ctx[3],
    					.../*internalClasses*/ ctx[6]
    				}))) && { class: aside_class_value },
    				dirty & /*$$restProps*/ 256 && /*$$restProps*/ ctx[8]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(aside);
    			if (default_slot) default_slot.d(detaching);
    			/*aside_binding*/ ctx[16](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance_1$6($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","class","variant","open","fixed","setOpen","isOpen","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Drawer', slots, ['default']);
    	const { FocusTrap } = domFocusTrap;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { variant = undefined } = $$props;
    	let { open = false } = $$props;
    	let { fixed = true } = $$props;
    	let element;
    	let instance = undefined;
    	let internalClasses = {};
    	let previousFocus = null;
    	let focusTrap;
    	let scrim = false;
    	setContext('SMUI:list:nav', true);
    	setContext('SMUI:list:item:nav', true);
    	setContext('SMUI:list:wrapFocus', true);
    	let oldVariant = variant;

    	onMount(() => {
    		focusTrap = new FocusTrap(element,
    		{
    				// Component handles focusing on active nav item.
    				skipInitialFocus: true
    			});

    		$$invalidate(4, instance = getInstance());
    		instance && instance.init();
    	});

    	onDestroy(() => {
    		instance && instance.destroy();
    		scrim && scrim.removeEventListener('SMUIDrawerScrim:click', handleScrimClick);
    	});

    	function getInstance() {
    		var _a, _b;

    		if (scrim) {
    			scrim.removeEventListener('SMUIDrawerScrim:click', handleScrimClick);
    		}

    		if (variant === 'modal') {
    			scrim = (_b = (_a = element.parentNode) === null || _a === void 0
    			? void 0
    			: _a.querySelector('.mdc-drawer-scrim')) !== null && _b !== void 0
    			? _b
    			: false;

    			if (scrim) {
    				scrim.addEventListener('SMUIDrawerScrim:click', handleScrimClick);
    			}
    		}

    		const Foundation = variant === 'dismissible'
    		? MDCDismissibleDrawerFoundation
    		: variant === 'modal'
    			? MDCModalDrawerFoundation
    			: undefined;

    		return Foundation
    		? new Foundation({
    					addClass,
    					removeClass,
    					hasClass,
    					elementHasClass: (element, className) => element.classList.contains(className),
    					saveFocus: () => previousFocus = document.activeElement,
    					restoreFocus: () => {
    						if (previousFocus && 'focus' in previousFocus && element.contains(document.activeElement)) {
    							previousFocus.focus();
    						}
    					},
    					focusActiveNavigationItem: () => {
    						const activeNavItemEl = element.querySelector('.mdc-list-item--activated,.mdc-deprecated-list-item--activated');

    						if (activeNavItemEl) {
    							activeNavItemEl.focus();
    						}
    					},
    					notifyClose: () => {
    						$$invalidate(9, open = false);
    						dispatch(element, 'SMUIDrawer:closed', undefined, undefined, true);
    					},
    					notifyOpen: () => {
    						$$invalidate(9, open = true);
    						dispatch(element, 'SMUIDrawer:opened', undefined, undefined, true);
    					},
    					trapFocus: () => focusTrap.trapFocus(),
    					releaseFocus: () => focusTrap.releaseFocus()
    				})
    		: undefined;
    	}

    	function hasClass(className) {
    		return className in internalClasses
    		? internalClasses[className]
    		: getElement().classList.contains(className);
    	}

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(6, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(6, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function handleScrimClick() {
    		instance && 'handleScrimClick' in instance && instance.handleScrimClick();
    	}

    	function setOpen(value) {
    		$$invalidate(9, open = value);
    	}

    	function isOpen() {
    		return open;
    	}

    	function getElement() {
    		return element;
    	}

    	function aside_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(5, element);
    		});
    	}

    	const keydown_handler = event => instance && instance.handleKeydown(event);
    	const transitionend_handler = event => instance && instance.handleTransitionEnd(event);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('variant' in $$new_props) $$invalidate(2, variant = $$new_props.variant);
    		if ('open' in $$new_props) $$invalidate(9, open = $$new_props.open);
    		if ('fixed' in $$new_props) $$invalidate(3, fixed = $$new_props.fixed);
    		if ('$$scope' in $$new_props) $$invalidate(14, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		MDCDismissibleDrawerFoundation,
    		MDCModalDrawerFoundation,
    		domFocusTrap,
    		onMount,
    		onDestroy,
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		useActions,
    		dispatch,
    		FocusTrap,
    		forwardEvents,
    		use,
    		className,
    		variant,
    		open,
    		fixed,
    		element,
    		instance,
    		internalClasses,
    		previousFocus,
    		focusTrap,
    		scrim,
    		oldVariant,
    		getInstance,
    		hasClass,
    		addClass,
    		removeClass,
    		handleScrimClick,
    		setOpen,
    		isOpen,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('variant' in $$props) $$invalidate(2, variant = $$new_props.variant);
    		if ('open' in $$props) $$invalidate(9, open = $$new_props.open);
    		if ('fixed' in $$props) $$invalidate(3, fixed = $$new_props.fixed);
    		if ('element' in $$props) $$invalidate(5, element = $$new_props.element);
    		if ('instance' in $$props) $$invalidate(4, instance = $$new_props.instance);
    		if ('internalClasses' in $$props) $$invalidate(6, internalClasses = $$new_props.internalClasses);
    		if ('previousFocus' in $$props) previousFocus = $$new_props.previousFocus;
    		if ('focusTrap' in $$props) focusTrap = $$new_props.focusTrap;
    		if ('scrim' in $$props) scrim = $$new_props.scrim;
    		if ('oldVariant' in $$props) $$invalidate(13, oldVariant = $$new_props.oldVariant);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*oldVariant, variant, instance*/ 8212) {
    			if (oldVariant !== variant) {
    				$$invalidate(13, oldVariant = variant);
    				instance && instance.destroy();
    				$$invalidate(6, internalClasses = {});
    				$$invalidate(4, instance = getInstance());
    				instance && instance.init();
    			}
    		}

    		if ($$self.$$.dirty & /*instance, open*/ 528) {
    			if (instance && instance.isOpen() !== open) {
    				if (open) {
    					instance.open();
    				} else {
    					instance.close();
    				}
    			}
    		}
    	};

    	return [
    		use,
    		className,
    		variant,
    		fixed,
    		instance,
    		element,
    		internalClasses,
    		forwardEvents,
    		$$restProps,
    		open,
    		setOpen,
    		isOpen,
    		getElement,
    		oldVariant,
    		$$scope,
    		slots,
    		aside_binding,
    		keydown_handler,
    		transitionend_handler
    	];
    }

    class Drawer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance_1$6, create_fragment$a, safe_not_equal, {
    			use: 0,
    			class: 1,
    			variant: 2,
    			open: 9,
    			fixed: 3,
    			setOpen: 10,
    			isOpen: 11,
    			getElement: 12
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Drawer",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get use() {
    		throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get variant() {
    		throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set variant(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get open() {
    		throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fixed() {
    		throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fixed(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setOpen() {
    		return this.$$.ctx[10];
    	}

    	set setOpen(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOpen() {
    		return this.$$.ctx[11];
    	}

    	set isOpen(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[12];
    	}

    	set getElement(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var AppContent = classAdderBuilder({
        class: 'mdc-drawer-app-content',
        component: Div,
    });

    var Content = classAdderBuilder({
        class: 'mdc-drawer__content',
        component: Div,
    });

    classAdderBuilder({
        class: 'mdc-drawer__header',
        component: Div,
    });

    classAdderBuilder({
        class: 'mdc-drawer__title',
        component: H1,
    });

    classAdderBuilder({
        class: 'mdc-drawer__subtitle',
        component: H2,
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
     */
    var cssClasses$5 = {
        ANIM_CHECKED_INDETERMINATE: 'mdc-checkbox--anim-checked-indeterminate',
        ANIM_CHECKED_UNCHECKED: 'mdc-checkbox--anim-checked-unchecked',
        ANIM_INDETERMINATE_CHECKED: 'mdc-checkbox--anim-indeterminate-checked',
        ANIM_INDETERMINATE_UNCHECKED: 'mdc-checkbox--anim-indeterminate-unchecked',
        ANIM_UNCHECKED_CHECKED: 'mdc-checkbox--anim-unchecked-checked',
        ANIM_UNCHECKED_INDETERMINATE: 'mdc-checkbox--anim-unchecked-indeterminate',
        BACKGROUND: 'mdc-checkbox__background',
        CHECKED: 'mdc-checkbox--checked',
        CHECKMARK: 'mdc-checkbox__checkmark',
        CHECKMARK_PATH: 'mdc-checkbox__checkmark-path',
        DISABLED: 'mdc-checkbox--disabled',
        INDETERMINATE: 'mdc-checkbox--indeterminate',
        MIXEDMARK: 'mdc-checkbox__mixedmark',
        NATIVE_CONTROL: 'mdc-checkbox__native-control',
        ROOT: 'mdc-checkbox',
        SELECTED: 'mdc-checkbox--selected',
        UPGRADED: 'mdc-checkbox--upgraded',
    };
    var strings$5 = {
        ARIA_CHECKED_ATTR: 'aria-checked',
        ARIA_CHECKED_INDETERMINATE_VALUE: 'mixed',
        DATA_INDETERMINATE_ATTR: 'data-indeterminate',
        NATIVE_CONTROL_SELECTOR: '.mdc-checkbox__native-control',
        TRANSITION_STATE_CHECKED: 'checked',
        TRANSITION_STATE_INDETERMINATE: 'indeterminate',
        TRANSITION_STATE_INIT: 'init',
        TRANSITION_STATE_UNCHECKED: 'unchecked',
    };
    var numbers$3 = {
        ANIM_END_LATCH_MS: 250,
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
    var MDCCheckboxFoundation = /** @class */ (function (_super) {
        __extends(MDCCheckboxFoundation, _super);
        function MDCCheckboxFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCCheckboxFoundation.defaultAdapter), adapter)) || this;
            _this.currentCheckState = strings$5.TRANSITION_STATE_INIT;
            _this.currentAnimationClass = '';
            _this.animEndLatchTimer = 0;
            _this.enableAnimationEndHandler = false;
            return _this;
        }
        Object.defineProperty(MDCCheckboxFoundation, "cssClasses", {
            get: function () {
                return cssClasses$5;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCCheckboxFoundation, "strings", {
            get: function () {
                return strings$5;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCCheckboxFoundation, "numbers", {
            get: function () {
                return numbers$3;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCCheckboxFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addClass: function () { return undefined; },
                    forceLayout: function () { return undefined; },
                    hasNativeControl: function () { return false; },
                    isAttachedToDOM: function () { return false; },
                    isChecked: function () { return false; },
                    isIndeterminate: function () { return false; },
                    removeClass: function () { return undefined; },
                    removeNativeControlAttr: function () { return undefined; },
                    setNativeControlAttr: function () { return undefined; },
                    setNativeControlDisabled: function () { return undefined; },
                };
            },
            enumerable: false,
            configurable: true
        });
        MDCCheckboxFoundation.prototype.init = function () {
            this.currentCheckState = this.determineCheckState();
            this.updateAriaChecked();
            this.adapter.addClass(cssClasses$5.UPGRADED);
        };
        MDCCheckboxFoundation.prototype.destroy = function () {
            clearTimeout(this.animEndLatchTimer);
        };
        MDCCheckboxFoundation.prototype.setDisabled = function (disabled) {
            this.adapter.setNativeControlDisabled(disabled);
            if (disabled) {
                this.adapter.addClass(cssClasses$5.DISABLED);
            }
            else {
                this.adapter.removeClass(cssClasses$5.DISABLED);
            }
        };
        /**
         * Handles the animationend event for the checkbox
         */
        MDCCheckboxFoundation.prototype.handleAnimationEnd = function () {
            var _this = this;
            if (!this.enableAnimationEndHandler) {
                return;
            }
            clearTimeout(this.animEndLatchTimer);
            this.animEndLatchTimer = setTimeout(function () {
                _this.adapter.removeClass(_this.currentAnimationClass);
                _this.enableAnimationEndHandler = false;
            }, numbers$3.ANIM_END_LATCH_MS);
        };
        /**
         * Handles the change event for the checkbox
         */
        MDCCheckboxFoundation.prototype.handleChange = function () {
            this.transitionCheckState();
        };
        MDCCheckboxFoundation.prototype.transitionCheckState = function () {
            if (!this.adapter.hasNativeControl()) {
                return;
            }
            var oldState = this.currentCheckState;
            var newState = this.determineCheckState();
            if (oldState === newState) {
                return;
            }
            this.updateAriaChecked();
            var TRANSITION_STATE_UNCHECKED = strings$5.TRANSITION_STATE_UNCHECKED;
            var SELECTED = cssClasses$5.SELECTED;
            if (newState === TRANSITION_STATE_UNCHECKED) {
                this.adapter.removeClass(SELECTED);
            }
            else {
                this.adapter.addClass(SELECTED);
            }
            // Check to ensure that there isn't a previously existing animation class, in case for example
            // the user interacted with the checkbox before the animation was finished.
            if (this.currentAnimationClass.length > 0) {
                clearTimeout(this.animEndLatchTimer);
                this.adapter.forceLayout();
                this.adapter.removeClass(this.currentAnimationClass);
            }
            this.currentAnimationClass =
                this.getTransitionAnimationClass(oldState, newState);
            this.currentCheckState = newState;
            // Check for parentNode so that animations are only run when the element is attached
            // to the DOM.
            if (this.adapter.isAttachedToDOM() &&
                this.currentAnimationClass.length > 0) {
                this.adapter.addClass(this.currentAnimationClass);
                this.enableAnimationEndHandler = true;
            }
        };
        MDCCheckboxFoundation.prototype.determineCheckState = function () {
            var TRANSITION_STATE_INDETERMINATE = strings$5.TRANSITION_STATE_INDETERMINATE, TRANSITION_STATE_CHECKED = strings$5.TRANSITION_STATE_CHECKED, TRANSITION_STATE_UNCHECKED = strings$5.TRANSITION_STATE_UNCHECKED;
            if (this.adapter.isIndeterminate()) {
                return TRANSITION_STATE_INDETERMINATE;
            }
            return this.adapter.isChecked() ? TRANSITION_STATE_CHECKED :
                TRANSITION_STATE_UNCHECKED;
        };
        MDCCheckboxFoundation.prototype.getTransitionAnimationClass = function (oldState, newState) {
            var TRANSITION_STATE_INIT = strings$5.TRANSITION_STATE_INIT, TRANSITION_STATE_CHECKED = strings$5.TRANSITION_STATE_CHECKED, TRANSITION_STATE_UNCHECKED = strings$5.TRANSITION_STATE_UNCHECKED;
            var _a = MDCCheckboxFoundation.cssClasses, ANIM_UNCHECKED_CHECKED = _a.ANIM_UNCHECKED_CHECKED, ANIM_UNCHECKED_INDETERMINATE = _a.ANIM_UNCHECKED_INDETERMINATE, ANIM_CHECKED_UNCHECKED = _a.ANIM_CHECKED_UNCHECKED, ANIM_CHECKED_INDETERMINATE = _a.ANIM_CHECKED_INDETERMINATE, ANIM_INDETERMINATE_CHECKED = _a.ANIM_INDETERMINATE_CHECKED, ANIM_INDETERMINATE_UNCHECKED = _a.ANIM_INDETERMINATE_UNCHECKED;
            switch (oldState) {
                case TRANSITION_STATE_INIT:
                    if (newState === TRANSITION_STATE_UNCHECKED) {
                        return '';
                    }
                    return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
                case TRANSITION_STATE_UNCHECKED:
                    return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;
                case TRANSITION_STATE_CHECKED:
                    return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
                default: // TRANSITION_STATE_INDETERMINATE
                    return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
            }
        };
        MDCCheckboxFoundation.prototype.updateAriaChecked = function () {
            // Ensure aria-checked is set to mixed if checkbox is in indeterminate state.
            if (this.adapter.isIndeterminate()) {
                this.adapter.setNativeControlAttr(strings$5.ARIA_CHECKED_ATTR, strings$5.ARIA_CHECKED_INDETERMINATE_VALUE);
            }
            else {
                // The on/off state does not need to keep track of aria-checked, since
                // the screenreader uses the checked property on the checkbox element.
                this.adapter.removeNativeControlAttr(strings$5.ARIA_CHECKED_ATTR);
            }
        };
        return MDCCheckboxFoundation;
    }(MDCFoundation));

    /* node_modules/@smui/checkbox/dist/Checkbox.svelte generated by Svelte v3.49.0 */
    const file$7 = "node_modules/@smui/checkbox/dist/Checkbox.svelte";

    function create_fragment$9(ctx) {
    	let div3;
    	let input;
    	let input_class_value;
    	let input_value_value;
    	let input_data_indeterminate_value;
    	let useActions_action;
    	let t0;
    	let div1;
    	let svg;
    	let path;
    	let t1;
    	let div0;
    	let t2;
    	let div2;
    	let div3_class_value;
    	let div3_style_value;
    	let useActions_action_1;
    	let Ripple_action;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		{
    			class: input_class_value = classMap({
    				[/*input$class*/ ctx[9]]: true,
    				'mdc-checkbox__native-control': true
    			})
    		},
    		{ type: "checkbox" },
    		/*inputProps*/ ctx[20],
    		{ disabled: /*disabled*/ ctx[1] },
    		{
    			__value: input_value_value = /*isUninitializedValue*/ ctx[19](/*valueKey*/ ctx[7])
    			? /*value*/ ctx[6]
    			: /*valueKey*/ ctx[7]
    		},
    		{
    			"data-indeterminate": input_data_indeterminate_value = !/*isUninitializedValue*/ ctx[19](/*indeterminate*/ ctx[0]) && /*indeterminate*/ ctx[0]
    			? 'true'
    			: undefined
    		},
    		/*nativeControlAttrs*/ ctx[16],
    		prefixFilter(/*$$restProps*/ ctx[26], 'input$')
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	let div3_levels = [
    		{
    			class: div3_class_value = classMap({
    				[/*className*/ ctx[3]]: true,
    				'mdc-checkbox': true,
    				'mdc-checkbox--disabled': /*disabled*/ ctx[1],
    				'mdc-checkbox--touch': /*touch*/ ctx[5],
    				'mdc-data-table__header-row-checkbox': /*context*/ ctx[21] === 'data-table' && /*dataTableHeader*/ ctx[22],
    				'mdc-data-table__row-checkbox': /*context*/ ctx[21] === 'data-table' && !/*dataTableHeader*/ ctx[22],
    				.../*internalClasses*/ ctx[14]
    			})
    		},
    		{
    			style: div3_style_value = Object.entries(/*internalStyles*/ ctx[15]).map(func$2).concat([/*style*/ ctx[4]]).join(' ')
    		},
    		exclude(/*$$restProps*/ ctx[26], ['input$'])
    	];

    	let div3_data = {};

    	for (let i = 0; i < div3_levels.length; i += 1) {
    		div3_data = assign(div3_data, div3_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			input = element("input");
    			t0 = space();
    			div1 = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			t1 = space();
    			div0 = element("div");
    			t2 = space();
    			div2 = element("div");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 30, 2, 804);
    			attr_dev(path, "class", "mdc-checkbox__checkmark-path");
    			attr_dev(path, "fill", "none");
    			attr_dev(path, "d", "M1.73,12.91 8.1,19.28 22.79,4.59");
    			add_location(path, file$7, 52, 6, 1442);
    			attr_dev(svg, "class", "mdc-checkbox__checkmark");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			add_location(svg, file$7, 51, 4, 1378);
    			attr_dev(div0, "class", "mdc-checkbox__mixedmark");
    			add_location(div0, file$7, 58, 4, 1582);
    			attr_dev(div1, "class", "mdc-checkbox__background");
    			add_location(div1, file$7, 50, 2, 1335);
    			attr_dev(div2, "class", "mdc-checkbox__ripple");
    			add_location(div2, file$7, 60, 2, 1633);
    			set_attributes(div3, div3_data);
    			add_location(div3, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, input);
    			if (input.autofocus) input.focus();
    			/*input_binding*/ ctx[36](input);
    			input.checked = /*nativeChecked*/ ctx[12];
    			append_dev(div3, t0);
    			append_dev(div3, div1);
    			append_dev(div1, svg);
    			append_dev(svg, path);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			/*div3_binding*/ ctx[38](div3);

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, input, /*input$use*/ ctx[8])),
    					listen_dev(input, "change", /*input_change_handler*/ ctx[37]),
    					listen_dev(input, "blur", /*blur_handler*/ ctx[34], false, false, false),
    					listen_dev(input, "focus", /*focus_handler*/ ctx[35], false, false, false),
    					action_destroyer(useActions_action_1 = useActions.call(null, div3, /*use*/ ctx[2])),
    					action_destroyer(/*forwardEvents*/ ctx[18].call(null, div3)),
    					action_destroyer(Ripple_action = Ripple.call(null, div3, {
    						unbounded: true,
    						addClass: /*addClass*/ ctx[23],
    						removeClass: /*removeClass*/ ctx[24],
    						addStyle: /*addStyle*/ ctx[25],
    						active: /*rippleActive*/ ctx[17],
    						eventTarget: /*checkbox*/ ctx[11]
    					})),
    					listen_dev(div3, "animationend", /*animationend_handler*/ ctx[39], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*input$class*/ 512 && input_class_value !== (input_class_value = classMap({
    					[/*input$class*/ ctx[9]]: true,
    					'mdc-checkbox__native-control': true
    				})) && { class: input_class_value },
    				{ type: "checkbox" },
    				/*inputProps*/ ctx[20],
    				dirty[0] & /*disabled*/ 2 && { disabled: /*disabled*/ ctx[1] },
    				dirty[0] & /*valueKey, value*/ 192 && input_value_value !== (input_value_value = /*isUninitializedValue*/ ctx[19](/*valueKey*/ ctx[7])
    				? /*value*/ ctx[6]
    				: /*valueKey*/ ctx[7]) && { __value: input_value_value },
    				dirty[0] & /*indeterminate*/ 1 && input_data_indeterminate_value !== (input_data_indeterminate_value = !/*isUninitializedValue*/ ctx[19](/*indeterminate*/ ctx[0]) && /*indeterminate*/ ctx[0]
    				? 'true'
    				: undefined) && {
    					"data-indeterminate": input_data_indeterminate_value
    				},
    				dirty[0] & /*nativeControlAttrs*/ 65536 && /*nativeControlAttrs*/ ctx[16],
    				dirty[0] & /*$$restProps*/ 67108864 && prefixFilter(/*$$restProps*/ ctx[26], 'input$')
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*input$use*/ 256) useActions_action.update.call(null, /*input$use*/ ctx[8]);

    			if (dirty[0] & /*nativeChecked*/ 4096) {
    				input.checked = /*nativeChecked*/ ctx[12];
    			}

    			set_attributes(div3, div3_data = get_spread_update(div3_levels, [
    				dirty[0] & /*className, disabled, touch, internalClasses*/ 16426 && div3_class_value !== (div3_class_value = classMap({
    					[/*className*/ ctx[3]]: true,
    					'mdc-checkbox': true,
    					'mdc-checkbox--disabled': /*disabled*/ ctx[1],
    					'mdc-checkbox--touch': /*touch*/ ctx[5],
    					'mdc-data-table__header-row-checkbox': /*context*/ ctx[21] === 'data-table' && /*dataTableHeader*/ ctx[22],
    					'mdc-data-table__row-checkbox': /*context*/ ctx[21] === 'data-table' && !/*dataTableHeader*/ ctx[22],
    					.../*internalClasses*/ ctx[14]
    				})) && { class: div3_class_value },
    				dirty[0] & /*internalStyles, style*/ 32784 && div3_style_value !== (div3_style_value = Object.entries(/*internalStyles*/ ctx[15]).map(func$2).concat([/*style*/ ctx[4]]).join(' ')) && { style: div3_style_value },
    				dirty[0] & /*$$restProps*/ 67108864 && exclude(/*$$restProps*/ ctx[26], ['input$'])
    			]));

    			if (useActions_action_1 && is_function(useActions_action_1.update) && dirty[0] & /*use*/ 4) useActions_action_1.update.call(null, /*use*/ ctx[2]);

    			if (Ripple_action && is_function(Ripple_action.update) && dirty[0] & /*rippleActive, checkbox*/ 133120) Ripple_action.update.call(null, {
    				unbounded: true,
    				addClass: /*addClass*/ ctx[23],
    				removeClass: /*removeClass*/ ctx[24],
    				addStyle: /*addStyle*/ ctx[25],
    				active: /*rippleActive*/ ctx[17],
    				eventTarget: /*checkbox*/ ctx[11]
    			});
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			/*input_binding*/ ctx[36](null);
    			/*div3_binding*/ ctx[38](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func$2 = ([name, value]) => `${name}: ${value};`;

    function instance_1$5($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"use","class","style","disabled","touch","indeterminate","group","checked","value","valueKey","input$use","input$class","getId","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Checkbox', slots, []);
    	var _a;
    	const forwardEvents = forwardEventsBuilder(get_current_component());

    	let uninitializedValue = () => {
    		
    	};

    	function isUninitializedValue(value) {
    		return value === uninitializedValue;
    	}

    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { style = '' } = $$props;
    	let { disabled = false } = $$props;
    	let { touch = false } = $$props;
    	let { indeterminate = uninitializedValue } = $$props;
    	let { group = uninitializedValue } = $$props;
    	let { checked = uninitializedValue } = $$props;
    	let { value = null } = $$props;
    	let { valueKey = uninitializedValue } = $$props;
    	let { input$use = [] } = $$props;
    	let { input$class = '' } = $$props;
    	let element;
    	let instance;
    	let checkbox;
    	let internalClasses = {};
    	let internalStyles = {};
    	let nativeControlAttrs = {};
    	let rippleActive = false;

    	let inputProps = (_a = getContext('SMUI:generic:input:props')) !== null && _a !== void 0
    	? _a
    	: {};

    	let nativeChecked = isUninitializedValue(group)
    	? isUninitializedValue(checked)
    		? false
    		: checked !== null && checked !== void 0
    			? checked
    			: undefined
    	: group.indexOf(value) !== -1;

    	let context = getContext('SMUI:checkbox:context');
    	let dataTableHeader = getContext('SMUI:data-table:row:header');
    	let previousChecked = checked;
    	let previousGroup = isUninitializedValue(group) ? [] : [...group];
    	let previousNativeChecked = nativeChecked;

    	onMount(() => {
    		$$invalidate(11, checkbox.indeterminate = !isUninitializedValue(indeterminate) && indeterminate, checkbox);

    		$$invalidate(10, instance = new MDCCheckboxFoundation({
    				addClass,
    				forceLayout: () => element.offsetWidth,
    				hasNativeControl: () => true,
    				isAttachedToDOM: () => Boolean(element.parentNode),
    				isChecked: () => nativeChecked !== null && nativeChecked !== void 0
    				? nativeChecked
    				: false,
    				isIndeterminate: () => isUninitializedValue(indeterminate)
    				? false
    				: indeterminate,
    				removeClass,
    				removeNativeControlAttr,
    				setNativeControlAttr: addNativeControlAttr,
    				setNativeControlDisabled: value => $$invalidate(1, disabled = value)
    			}));

    		const accessor = {
    			_smui_checkbox_accessor: true,
    			get element() {
    				return getElement();
    			},
    			get checked() {
    				return nativeChecked !== null && nativeChecked !== void 0
    				? nativeChecked
    				: false;
    			},
    			set checked(value) {
    				if (nativeChecked !== value) {
    					$$invalidate(12, nativeChecked = value);
    				}
    			},
    			get indeterminate() {
    				return isUninitializedValue(indeterminate)
    				? false
    				: indeterminate;
    			},
    			set indeterminate(value) {
    				$$invalidate(0, indeterminate = value);
    			},
    			activateRipple() {
    				if (!disabled) {
    					$$invalidate(17, rippleActive = true);
    				}
    			},
    			deactivateRipple() {
    				$$invalidate(17, rippleActive = false);
    			}
    		};

    		dispatch(element, 'SMUIGenericInput:mount', accessor);
    		dispatch(element, 'SMUICheckbox:mount', accessor);
    		instance.init();

    		return () => {
    			dispatch(element, 'SMUIGenericInput:unmount', accessor);
    			dispatch(element, 'SMUICheckbox:unmount', accessor);
    			instance.destroy();
    		};
    	});

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(14, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(14, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function addStyle(name, value) {
    		if (internalStyles[name] != value) {
    			if (value === '' || value == null) {
    				delete internalStyles[name];
    				$$invalidate(15, internalStyles);
    			} else {
    				$$invalidate(15, internalStyles[name] = value, internalStyles);
    			}
    		}
    	}

    	function addNativeControlAttr(name, value) {
    		if (nativeControlAttrs[name] !== value) {
    			$$invalidate(16, nativeControlAttrs[name] = value, nativeControlAttrs);
    		}
    	}

    	function removeNativeControlAttr(name) {
    		if (!(name in nativeControlAttrs) || nativeControlAttrs[name] != null) {
    			$$invalidate(16, nativeControlAttrs[name] = undefined, nativeControlAttrs);
    		}
    	}

    	function getId() {
    		return inputProps && inputProps.id;
    	}

    	function getElement() {
    		return element;
    	}

    	function blur_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			checkbox = $$value;
    			((((((((($$invalidate(11, checkbox), $$invalidate(27, group)), $$invalidate(33, previousNativeChecked)), $$invalidate(12, nativeChecked)), $$invalidate(6, value)), $$invalidate(32, previousGroup)), $$invalidate(28, checked)), $$invalidate(31, previousChecked)), $$invalidate(0, indeterminate)), $$invalidate(10, instance));
    		});
    	}

    	function input_change_handler() {
    		nativeChecked = this.checked;
    		((((((((($$invalidate(12, nativeChecked), $$invalidate(27, group)), $$invalidate(33, previousNativeChecked)), $$invalidate(6, value)), $$invalidate(32, previousGroup)), $$invalidate(28, checked)), $$invalidate(31, previousChecked)), $$invalidate(0, indeterminate)), $$invalidate(11, checkbox)), $$invalidate(10, instance));
    	}

    	function div3_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(13, element);
    		});
    	}

    	const animationend_handler = () => instance && instance.handleAnimationEnd();

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(26, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(2, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('style' in $$new_props) $$invalidate(4, style = $$new_props.style);
    		if ('disabled' in $$new_props) $$invalidate(1, disabled = $$new_props.disabled);
    		if ('touch' in $$new_props) $$invalidate(5, touch = $$new_props.touch);
    		if ('indeterminate' in $$new_props) $$invalidate(0, indeterminate = $$new_props.indeterminate);
    		if ('group' in $$new_props) $$invalidate(27, group = $$new_props.group);
    		if ('checked' in $$new_props) $$invalidate(28, checked = $$new_props.checked);
    		if ('value' in $$new_props) $$invalidate(6, value = $$new_props.value);
    		if ('valueKey' in $$new_props) $$invalidate(7, valueKey = $$new_props.valueKey);
    		if ('input$use' in $$new_props) $$invalidate(8, input$use = $$new_props.input$use);
    		if ('input$class' in $$new_props) $$invalidate(9, input$class = $$new_props.input$class);
    	};

    	$$self.$capture_state = () => ({
    		_a,
    		MDCCheckboxFoundation,
    		onMount,
    		getContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		exclude,
    		prefixFilter,
    		useActions,
    		dispatch,
    		Ripple,
    		forwardEvents,
    		uninitializedValue,
    		isUninitializedValue,
    		use,
    		className,
    		style,
    		disabled,
    		touch,
    		indeterminate,
    		group,
    		checked,
    		value,
    		valueKey,
    		input$use,
    		input$class,
    		element,
    		instance,
    		checkbox,
    		internalClasses,
    		internalStyles,
    		nativeControlAttrs,
    		rippleActive,
    		inputProps,
    		nativeChecked,
    		context,
    		dataTableHeader,
    		previousChecked,
    		previousGroup,
    		previousNativeChecked,
    		addClass,
    		removeClass,
    		addStyle,
    		addNativeControlAttr,
    		removeNativeControlAttr,
    		getId,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('_a' in $$props) _a = $$new_props._a;
    		if ('uninitializedValue' in $$props) uninitializedValue = $$new_props.uninitializedValue;
    		if ('use' in $$props) $$invalidate(2, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('style' in $$props) $$invalidate(4, style = $$new_props.style);
    		if ('disabled' in $$props) $$invalidate(1, disabled = $$new_props.disabled);
    		if ('touch' in $$props) $$invalidate(5, touch = $$new_props.touch);
    		if ('indeterminate' in $$props) $$invalidate(0, indeterminate = $$new_props.indeterminate);
    		if ('group' in $$props) $$invalidate(27, group = $$new_props.group);
    		if ('checked' in $$props) $$invalidate(28, checked = $$new_props.checked);
    		if ('value' in $$props) $$invalidate(6, value = $$new_props.value);
    		if ('valueKey' in $$props) $$invalidate(7, valueKey = $$new_props.valueKey);
    		if ('input$use' in $$props) $$invalidate(8, input$use = $$new_props.input$use);
    		if ('input$class' in $$props) $$invalidate(9, input$class = $$new_props.input$class);
    		if ('element' in $$props) $$invalidate(13, element = $$new_props.element);
    		if ('instance' in $$props) $$invalidate(10, instance = $$new_props.instance);
    		if ('checkbox' in $$props) $$invalidate(11, checkbox = $$new_props.checkbox);
    		if ('internalClasses' in $$props) $$invalidate(14, internalClasses = $$new_props.internalClasses);
    		if ('internalStyles' in $$props) $$invalidate(15, internalStyles = $$new_props.internalStyles);
    		if ('nativeControlAttrs' in $$props) $$invalidate(16, nativeControlAttrs = $$new_props.nativeControlAttrs);
    		if ('rippleActive' in $$props) $$invalidate(17, rippleActive = $$new_props.rippleActive);
    		if ('inputProps' in $$props) $$invalidate(20, inputProps = $$new_props.inputProps);
    		if ('nativeChecked' in $$props) $$invalidate(12, nativeChecked = $$new_props.nativeChecked);
    		if ('context' in $$props) $$invalidate(21, context = $$new_props.context);
    		if ('dataTableHeader' in $$props) $$invalidate(22, dataTableHeader = $$new_props.dataTableHeader);
    		if ('previousChecked' in $$props) $$invalidate(31, previousChecked = $$new_props.previousChecked);
    		if ('previousGroup' in $$props) $$invalidate(32, previousGroup = $$new_props.previousGroup);
    		if ('previousNativeChecked' in $$props) $$invalidate(33, previousNativeChecked = $$new_props.previousNativeChecked);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*group, nativeChecked, value, checked, indeterminate, checkbox, instance*/ 402660417 | $$self.$$.dirty[1] & /*previousNativeChecked, previousGroup, previousChecked*/ 7) {
    			{
    				// This is a substitute for an on:change listener that is
    				// smarter about when it calls the instance's handler. I do
    				// this so that a group of changes will only trigger one
    				// handler call, since the handler will reset currently
    				// running animations.
    				let callHandleChange = false;

    				// First check for group state.
    				if (!isUninitializedValue(group)) {
    					if (previousNativeChecked !== nativeChecked) {
    						// The change needs to flow up.
    						const idx = group.indexOf(value);

    						if (nativeChecked && idx === -1) {
    							group.push(value);
    							((((((((($$invalidate(27, group), $$invalidate(33, previousNativeChecked)), $$invalidate(12, nativeChecked)), $$invalidate(6, value)), $$invalidate(32, previousGroup)), $$invalidate(28, checked)), $$invalidate(31, previousChecked)), $$invalidate(0, indeterminate)), $$invalidate(11, checkbox)), $$invalidate(10, instance));
    						} else if (!nativeChecked && idx !== -1) {
    							group.splice(idx, 1);
    							((((((((($$invalidate(27, group), $$invalidate(33, previousNativeChecked)), $$invalidate(12, nativeChecked)), $$invalidate(6, value)), $$invalidate(32, previousGroup)), $$invalidate(28, checked)), $$invalidate(31, previousChecked)), $$invalidate(0, indeterminate)), $$invalidate(11, checkbox)), $$invalidate(10, instance));
    						}

    						callHandleChange = true;
    					} else {
    						// Potential changes need to flow down.
    						const idxPrev = previousGroup.indexOf(value);

    						const idx = group.indexOf(value);

    						if (idxPrev > -1 && idx === -1) {
    							// The checkbox was removed from the group.
    							$$invalidate(12, nativeChecked = false);

    							callHandleChange = true;
    						} else if (idx > -1 && idxPrev === -1) {
    							// The checkbox was added to the group.
    							$$invalidate(12, nativeChecked = true);

    							callHandleChange = true;
    						}
    					}
    				}

    				// Now check individual state.
    				if (isUninitializedValue(checked)) {
    					if (!!previousNativeChecked !== !!nativeChecked) {
    						// The checkbox was clicked by the user.
    						callHandleChange = true;
    					}
    				} else if (checked !== (nativeChecked !== null && nativeChecked !== void 0
    				? nativeChecked
    				: null)) {
    					if (checked === previousChecked) {
    						// The checkbox was clicked by the user
    						// and the change needs to flow up.
    						$$invalidate(28, checked = nativeChecked !== null && nativeChecked !== void 0
    						? nativeChecked
    						: null);

    						if (!isUninitializedValue(indeterminate)) {
    							$$invalidate(0, indeterminate = false);
    						}
    					} else {
    						// The checkbox was changed programmatically
    						// and the change needs to flow down.
    						$$invalidate(12, nativeChecked = checked !== null && checked !== void 0
    						? checked
    						: undefined);
    					}

    					callHandleChange = true;
    				}

    				if (checkbox) {
    					// Sync indeterminate state with the native input.
    					if (isUninitializedValue(indeterminate)) {
    						if (checkbox.indeterminate) {
    							// I don't think this can happen, but just in case.
    							$$invalidate(11, checkbox.indeterminate = false, checkbox);

    							callHandleChange = true;
    						}
    					} else {
    						if (!indeterminate && checkbox.indeterminate) {
    							$$invalidate(11, checkbox.indeterminate = false, checkbox);
    							callHandleChange = true;
    						} else if (indeterminate && !checkbox.indeterminate) {
    							$$invalidate(11, checkbox.indeterminate = true, checkbox);
    							callHandleChange = true;
    						}
    					}
    				}

    				$$invalidate(31, previousChecked = checked);
    				$$invalidate(32, previousGroup = isUninitializedValue(group) ? [] : [...group]);
    				$$invalidate(33, previousNativeChecked = nativeChecked);

    				if (callHandleChange && instance) {
    					instance.handleChange();
    				}
    			}
    		}
    	};

    	return [
    		indeterminate,
    		disabled,
    		use,
    		className,
    		style,
    		touch,
    		value,
    		valueKey,
    		input$use,
    		input$class,
    		instance,
    		checkbox,
    		nativeChecked,
    		element,
    		internalClasses,
    		internalStyles,
    		nativeControlAttrs,
    		rippleActive,
    		forwardEvents,
    		isUninitializedValue,
    		inputProps,
    		context,
    		dataTableHeader,
    		addClass,
    		removeClass,
    		addStyle,
    		$$restProps,
    		group,
    		checked,
    		getId,
    		getElement,
    		previousChecked,
    		previousGroup,
    		previousNativeChecked,
    		blur_handler,
    		focus_handler,
    		input_binding,
    		input_change_handler,
    		div3_binding,
    		animationend_handler
    	];
    }

    class Checkbox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance_1$5,
    			create_fragment$9,
    			safe_not_equal,
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
    				getElement: 30
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Checkbox",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get use() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get touch() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set touch(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get indeterminate() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set indeterminate(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get group() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set group(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get valueKey() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set valueKey(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get input$use() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set input$use(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get input$class() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set input$class(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getId() {
    		return this.$$.ctx[29];
    	}

    	set getId(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[30];
    	}

    	set getElement(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
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
     */
    var cssClasses$4 = {
        ROOT: 'mdc-form-field',
    };
    var strings$4 = {
        LABEL_SELECTOR: '.mdc-form-field > label',
    };

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
     */
    var MDCFormFieldFoundation = /** @class */ (function (_super) {
        __extends(MDCFormFieldFoundation, _super);
        function MDCFormFieldFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCFormFieldFoundation.defaultAdapter), adapter)) || this;
            _this.click = function () {
                _this.handleClick();
            };
            return _this;
        }
        Object.defineProperty(MDCFormFieldFoundation, "cssClasses", {
            get: function () {
                return cssClasses$4;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCFormFieldFoundation, "strings", {
            get: function () {
                return strings$4;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCFormFieldFoundation, "defaultAdapter", {
            get: function () {
                return {
                    activateInputRipple: function () { return undefined; },
                    deactivateInputRipple: function () { return undefined; },
                    deregisterInteractionHandler: function () { return undefined; },
                    registerInteractionHandler: function () { return undefined; },
                };
            },
            enumerable: false,
            configurable: true
        });
        MDCFormFieldFoundation.prototype.init = function () {
            this.adapter.registerInteractionHandler('click', this.click);
        };
        MDCFormFieldFoundation.prototype.destroy = function () {
            this.adapter.deregisterInteractionHandler('click', this.click);
        };
        MDCFormFieldFoundation.prototype.handleClick = function () {
            var _this = this;
            this.adapter.activateInputRipple();
            requestAnimationFrame(function () {
                _this.adapter.deactivateInputRipple();
            });
        };
        return MDCFormFieldFoundation;
    }(MDCFoundation));

    /* node_modules/@smui/form-field/dist/FormField.svelte generated by Svelte v3.49.0 */

    const file$6 = "node_modules/@smui/form-field/dist/FormField.svelte";
    const get_label_slot_changes$1 = dirty => ({});
    const get_label_slot_context$1 = ctx => ({});

    function create_fragment$8(ctx) {
    	let div;
    	let t;
    	let label_1;
    	let useActions_action;
    	let div_class_value;
    	let useActions_action_1;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[13].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], null);
    	const label_slot_template = /*#slots*/ ctx[13].label;
    	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[12], get_label_slot_context$1);
    	let label_1_levels = [{ for: /*inputId*/ ctx[4] }, prefixFilter(/*$$restProps*/ ctx[10], 'label$')];
    	let label_1_data = {};

    	for (let i = 0; i < label_1_levels.length; i += 1) {
    		label_1_data = assign(label_1_data, label_1_levels[i]);
    	}

    	let div_levels = [
    		{
    			class: div_class_value = classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-form-field': true,
    				'mdc-form-field--align-end': /*align*/ ctx[2] === 'end',
    				'mdc-form-field--nowrap': /*noWrap*/ ctx[3]
    			})
    		},
    		exclude(/*$$restProps*/ ctx[10], ['label$'])
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			t = space();
    			label_1 = element("label");
    			if (label_slot) label_slot.c();
    			set_attributes(label_1, label_1_data);
    			add_location(label_1, file$6, 15, 2, 412);
    			set_attributes(div, div_data);
    			add_location(div, file$6, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			append_dev(div, t);
    			append_dev(div, label_1);

    			if (label_slot) {
    				label_slot.m(label_1, null);
    			}

    			/*label_1_binding*/ ctx[14](label_1);
    			/*div_binding*/ ctx[15](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, label_1, /*label$use*/ ctx[5])),
    					action_destroyer(useActions_action_1 = useActions.call(null, div, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[9].call(null, div)),
    					listen_dev(div, "SMUIGenericInput:mount", /*SMUIGenericInput_mount_handler*/ ctx[16], false, false, false),
    					listen_dev(div, "SMUIGenericInput:unmount", /*SMUIGenericInput_unmount_handler*/ ctx[17], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4096)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[12],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[12])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[12], dirty, null),
    						null
    					);
    				}
    			}

    			if (label_slot) {
    				if (label_slot.p && (!current || dirty & /*$$scope*/ 4096)) {
    					update_slot_base(
    						label_slot,
    						label_slot_template,
    						ctx,
    						/*$$scope*/ ctx[12],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[12])
    						: get_slot_changes(label_slot_template, /*$$scope*/ ctx[12], dirty, get_label_slot_changes$1),
    						get_label_slot_context$1
    					);
    				}
    			}

    			set_attributes(label_1, label_1_data = get_spread_update(label_1_levels, [
    				(!current || dirty & /*inputId*/ 16) && { for: /*inputId*/ ctx[4] },
    				dirty & /*$$restProps*/ 1024 && prefixFilter(/*$$restProps*/ ctx[10], 'label$')
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*label$use*/ 32) useActions_action.update.call(null, /*label$use*/ ctx[5]);

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				(!current || dirty & /*className, align, noWrap*/ 14 && div_class_value !== (div_class_value = classMap({
    					[/*className*/ ctx[1]]: true,
    					'mdc-form-field': true,
    					'mdc-form-field--align-end': /*align*/ ctx[2] === 'end',
    					'mdc-form-field--nowrap': /*noWrap*/ ctx[3]
    				}))) && { class: div_class_value },
    				dirty & /*$$restProps*/ 1024 && exclude(/*$$restProps*/ ctx[10], ['label$'])
    			]));

    			if (useActions_action_1 && is_function(useActions_action_1.update) && dirty & /*use*/ 1) useActions_action_1.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			transition_in(label_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			transition_out(label_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			if (label_slot) label_slot.d(detaching);
    			/*label_1_binding*/ ctx[14](null);
    			/*div_binding*/ ctx[15](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }
    let counter$2 = 0;

    function instance_1$4($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","class","align","noWrap","inputId","label$use","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FormField', slots, ['default','label']);
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { align = 'start' } = $$props;
    	let { noWrap = false } = $$props;
    	let { inputId = 'SMUI-form-field-' + counter$2++ } = $$props;
    	let { label$use = [] } = $$props;
    	let element;
    	let instance;
    	let label;
    	let input;
    	setContext('SMUI:generic:input:props', { id: inputId });

    	onMount(() => {
    		instance = new MDCFormFieldFoundation({
    				activateInputRipple: () => {
    					if (input) {
    						input.activateRipple();
    					}
    				},
    				deactivateInputRipple: () => {
    					if (input) {
    						input.deactivateRipple();
    					}
    				},
    				deregisterInteractionHandler: (evtType, handler) => {
    					label.removeEventListener(evtType, handler);
    				},
    				registerInteractionHandler: (evtType, handler) => {
    					label.addEventListener(evtType, handler);
    				}
    			});

    		instance.init();

    		return () => {
    			instance.destroy();
    		};
    	});

    	function getElement() {
    		return element;
    	}

    	function label_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			label = $$value;
    			$$invalidate(7, label);
    		});
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(6, element);
    		});
    	}

    	const SMUIGenericInput_mount_handler = event => $$invalidate(8, input = event.detail);
    	const SMUIGenericInput_unmount_handler = () => $$invalidate(8, input = undefined);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('align' in $$new_props) $$invalidate(2, align = $$new_props.align);
    		if ('noWrap' in $$new_props) $$invalidate(3, noWrap = $$new_props.noWrap);
    		if ('inputId' in $$new_props) $$invalidate(4, inputId = $$new_props.inputId);
    		if ('label$use' in $$new_props) $$invalidate(5, label$use = $$new_props.label$use);
    		if ('$$scope' in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		counter: counter$2,
    		MDCFormFieldFoundation,
    		onMount,
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		exclude,
    		prefixFilter,
    		useActions,
    		forwardEvents,
    		use,
    		className,
    		align,
    		noWrap,
    		inputId,
    		label$use,
    		element,
    		instance,
    		label,
    		input,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('align' in $$props) $$invalidate(2, align = $$new_props.align);
    		if ('noWrap' in $$props) $$invalidate(3, noWrap = $$new_props.noWrap);
    		if ('inputId' in $$props) $$invalidate(4, inputId = $$new_props.inputId);
    		if ('label$use' in $$props) $$invalidate(5, label$use = $$new_props.label$use);
    		if ('element' in $$props) $$invalidate(6, element = $$new_props.element);
    		if ('instance' in $$props) instance = $$new_props.instance;
    		if ('label' in $$props) $$invalidate(7, label = $$new_props.label);
    		if ('input' in $$props) $$invalidate(8, input = $$new_props.input);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		className,
    		align,
    		noWrap,
    		inputId,
    		label$use,
    		element,
    		label,
    		input,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		label_1_binding,
    		div_binding,
    		SMUIGenericInput_mount_handler,
    		SMUIGenericInput_unmount_handler
    	];
    }

    class FormField extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance_1$4, create_fragment$8, safe_not_equal, {
    			use: 0,
    			class: 1,
    			align: 2,
    			noWrap: 3,
    			inputId: 4,
    			label$use: 5,
    			getElement: 11
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormField",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get use() {
    		throw new Error("<FormField>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<FormField>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<FormField>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<FormField>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get align() {
    		throw new Error("<FormField>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set align(value) {
    		throw new Error("<FormField>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noWrap() {
    		throw new Error("<FormField>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noWrap(value) {
    		throw new Error("<FormField>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inputId() {
    		throw new Error("<FormField>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inputId(value) {
    		throw new Error("<FormField>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label$use() {
    		throw new Error("<FormField>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label$use(value) {
    		throw new Error("<FormField>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[11];
    	}

    	set getElement(value) {
    		throw new Error("<FormField>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
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
     */
    var cssClasses$3 = {
        ANCHOR: 'mdc-menu-surface--anchor',
        ANIMATING_CLOSED: 'mdc-menu-surface--animating-closed',
        ANIMATING_OPEN: 'mdc-menu-surface--animating-open',
        FIXED: 'mdc-menu-surface--fixed',
        IS_OPEN_BELOW: 'mdc-menu-surface--is-open-below',
        OPEN: 'mdc-menu-surface--open',
        ROOT: 'mdc-menu-surface',
    };
    // tslint:disable:object-literal-sort-keys
    var strings$3 = {
        CLOSED_EVENT: 'MDCMenuSurface:closed',
        CLOSING_EVENT: 'MDCMenuSurface:closing',
        OPENED_EVENT: 'MDCMenuSurface:opened',
        FOCUSABLE_ELEMENTS: [
            'button:not(:disabled)',
            '[href]:not([aria-disabled="true"])',
            'input:not(:disabled)',
            'select:not(:disabled)',
            'textarea:not(:disabled)',
            '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])',
        ].join(', '),
    };
    // tslint:enable:object-literal-sort-keys
    var numbers$2 = {
        /** Total duration of menu-surface open animation. */
        TRANSITION_OPEN_DURATION: 120,
        /** Total duration of menu-surface close animation. */
        TRANSITION_CLOSE_DURATION: 75,
        /**
         * Margin left to the edge of the viewport when menu-surface is at maximum
         * possible height. Also used as a viewport margin.
         */
        MARGIN_TO_EDGE: 32,
        /**
         * Ratio of anchor width to menu-surface width for switching from corner
         * positioning to center positioning.
         */
        ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: 0.67,
        /**
         * Amount of time to wait before restoring focus when closing the menu
         * surface. This is important because if a touch event triggered the menu
         * close, and the subsequent mouse event occurs after focus is restored, then
         * the restored focus would be lost.
         */
        TOUCH_EVENT_WAIT_MS: 30,
    };
    /**
     * Enum for bits in the {@see Corner) bitmap.
     */
    var CornerBit;
    (function (CornerBit) {
        CornerBit[CornerBit["BOTTOM"] = 1] = "BOTTOM";
        CornerBit[CornerBit["CENTER"] = 2] = "CENTER";
        CornerBit[CornerBit["RIGHT"] = 4] = "RIGHT";
        CornerBit[CornerBit["FLIP_RTL"] = 8] = "FLIP_RTL";
    })(CornerBit || (CornerBit = {}));
    /**
     * Enum for representing an element corner for positioning the menu-surface.
     *
     * The START constants map to LEFT if element directionality is left
     * to right and RIGHT if the directionality is right to left.
     * Likewise END maps to RIGHT or LEFT depending on the directionality.
     */
    var Corner;
    (function (Corner) {
        Corner[Corner["TOP_LEFT"] = 0] = "TOP_LEFT";
        Corner[Corner["TOP_RIGHT"] = 4] = "TOP_RIGHT";
        Corner[Corner["BOTTOM_LEFT"] = 1] = "BOTTOM_LEFT";
        Corner[Corner["BOTTOM_RIGHT"] = 5] = "BOTTOM_RIGHT";
        Corner[Corner["TOP_START"] = 8] = "TOP_START";
        Corner[Corner["TOP_END"] = 12] = "TOP_END";
        Corner[Corner["BOTTOM_START"] = 9] = "BOTTOM_START";
        Corner[Corner["BOTTOM_END"] = 13] = "BOTTOM_END";
    })(Corner || (Corner = {}));

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
    var MDCMenuSurfaceFoundation = /** @class */ (function (_super) {
        __extends(MDCMenuSurfaceFoundation, _super);
        function MDCMenuSurfaceFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCMenuSurfaceFoundation.defaultAdapter), adapter)) || this;
            _this.isSurfaceOpen = false;
            _this.isQuickOpen = false;
            _this.isHoistedElement = false;
            _this.isFixedPosition = false;
            _this.isHorizontallyCenteredOnViewport = false;
            _this.maxHeight = 0;
            _this.openAnimationEndTimerId = 0;
            _this.closeAnimationEndTimerId = 0;
            _this.animationRequestId = 0;
            _this.anchorCorner = Corner.TOP_START;
            /**
             * Corner of the menu surface to which menu surface is attached to anchor.
             *
             *  Anchor corner --->+----------+
             *                    |  ANCHOR  |
             *                    +----------+
             *  Origin corner --->+--------------+
             *                    |              |
             *                    |              |
             *                    | MENU SURFACE |
             *                    |              |
             *                    |              |
             *                    +--------------+
             */
            _this.originCorner = Corner.TOP_START;
            _this.anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 };
            _this.position = { x: 0, y: 0 };
            return _this;
        }
        Object.defineProperty(MDCMenuSurfaceFoundation, "cssClasses", {
            get: function () {
                return cssClasses$3;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCMenuSurfaceFoundation, "strings", {
            get: function () {
                return strings$3;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCMenuSurfaceFoundation, "numbers", {
            get: function () {
                return numbers$2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCMenuSurfaceFoundation, "Corner", {
            get: function () {
                return Corner;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCMenuSurfaceFoundation, "defaultAdapter", {
            /**
             * @see {@link MDCMenuSurfaceAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    hasAnchor: function () { return false; },
                    isElementInContainer: function () { return false; },
                    isFocused: function () { return false; },
                    isRtl: function () { return false; },
                    getInnerDimensions: function () { return ({ height: 0, width: 0 }); },
                    getAnchorDimensions: function () { return null; },
                    getWindowDimensions: function () { return ({ height: 0, width: 0 }); },
                    getBodyDimensions: function () { return ({ height: 0, width: 0 }); },
                    getWindowScroll: function () { return ({ x: 0, y: 0 }); },
                    setPosition: function () { return undefined; },
                    setMaxHeight: function () { return undefined; },
                    setTransformOrigin: function () { return undefined; },
                    saveFocus: function () { return undefined; },
                    restoreFocus: function () { return undefined; },
                    notifyClose: function () { return undefined; },
                    notifyOpen: function () { return undefined; },
                    notifyClosing: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: false,
            configurable: true
        });
        MDCMenuSurfaceFoundation.prototype.init = function () {
            var _a = MDCMenuSurfaceFoundation.cssClasses, ROOT = _a.ROOT, OPEN = _a.OPEN;
            if (!this.adapter.hasClass(ROOT)) {
                throw new Error(ROOT + " class required in root element.");
            }
            if (this.adapter.hasClass(OPEN)) {
                this.isSurfaceOpen = true;
            }
        };
        MDCMenuSurfaceFoundation.prototype.destroy = function () {
            clearTimeout(this.openAnimationEndTimerId);
            clearTimeout(this.closeAnimationEndTimerId);
            // Cancel any currently running animations.
            cancelAnimationFrame(this.animationRequestId);
        };
        /**
         * @param corner Default anchor corner alignment of top-left menu surface
         *     corner.
         */
        MDCMenuSurfaceFoundation.prototype.setAnchorCorner = function (corner) {
            this.anchorCorner = corner;
        };
        /**
         * Flip menu corner horizontally.
         */
        MDCMenuSurfaceFoundation.prototype.flipCornerHorizontally = function () {
            this.originCorner = this.originCorner ^ CornerBit.RIGHT;
        };
        /**
         * @param margin Set of margin values from anchor.
         */
        MDCMenuSurfaceFoundation.prototype.setAnchorMargin = function (margin) {
            this.anchorMargin.top = margin.top || 0;
            this.anchorMargin.right = margin.right || 0;
            this.anchorMargin.bottom = margin.bottom || 0;
            this.anchorMargin.left = margin.left || 0;
        };
        /** Used to indicate if the menu-surface is hoisted to the body. */
        MDCMenuSurfaceFoundation.prototype.setIsHoisted = function (isHoisted) {
            this.isHoistedElement = isHoisted;
        };
        /**
         * Used to set the menu-surface calculations based on a fixed position menu.
         */
        MDCMenuSurfaceFoundation.prototype.setFixedPosition = function (isFixedPosition) {
            this.isFixedPosition = isFixedPosition;
        };
        /**
         * @return Returns true if menu is in fixed (`position: fixed`) position.
         */
        MDCMenuSurfaceFoundation.prototype.isFixed = function () {
            return this.isFixedPosition;
        };
        /** Sets the menu-surface position on the page. */
        MDCMenuSurfaceFoundation.prototype.setAbsolutePosition = function (x, y) {
            this.position.x = this.isFinite(x) ? x : 0;
            this.position.y = this.isFinite(y) ? y : 0;
        };
        /** Sets whether menu-surface should be horizontally centered to viewport. */
        MDCMenuSurfaceFoundation.prototype.setIsHorizontallyCenteredOnViewport = function (isCentered) {
            this.isHorizontallyCenteredOnViewport = isCentered;
        };
        MDCMenuSurfaceFoundation.prototype.setQuickOpen = function (quickOpen) {
            this.isQuickOpen = quickOpen;
        };
        /**
         * Sets maximum menu-surface height on open.
         * @param maxHeight The desired max-height. Set to 0 (default) to
         *     automatically calculate max height based on available viewport space.
         */
        MDCMenuSurfaceFoundation.prototype.setMaxHeight = function (maxHeight) {
            this.maxHeight = maxHeight;
        };
        MDCMenuSurfaceFoundation.prototype.isOpen = function () {
            return this.isSurfaceOpen;
        };
        /**
         * Open the menu surface.
         */
        MDCMenuSurfaceFoundation.prototype.open = function () {
            var _this = this;
            if (this.isSurfaceOpen) {
                return;
            }
            this.adapter.saveFocus();
            if (this.isQuickOpen) {
                this.isSurfaceOpen = true;
                this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
                this.dimensions = this.adapter.getInnerDimensions();
                this.autoposition();
                this.adapter.notifyOpen();
            }
            else {
                this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);
                this.animationRequestId = requestAnimationFrame(function () {
                    _this.dimensions = _this.adapter.getInnerDimensions();
                    _this.autoposition();
                    _this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
                    _this.openAnimationEndTimerId = setTimeout(function () {
                        _this.openAnimationEndTimerId = 0;
                        _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);
                        _this.adapter.notifyOpen();
                    }, numbers$2.TRANSITION_OPEN_DURATION);
                });
                this.isSurfaceOpen = true;
            }
        };
        /**
         * Closes the menu surface.
         */
        MDCMenuSurfaceFoundation.prototype.close = function (skipRestoreFocus) {
            var _this = this;
            if (skipRestoreFocus === void 0) { skipRestoreFocus = false; }
            if (!this.isSurfaceOpen) {
                return;
            }
            this.adapter.notifyClosing();
            if (this.isQuickOpen) {
                this.isSurfaceOpen = false;
                if (!skipRestoreFocus) {
                    this.maybeRestoreFocus();
                }
                this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
                this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.IS_OPEN_BELOW);
                this.adapter.notifyClose();
                return;
            }
            this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);
            requestAnimationFrame(function () {
                _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
                _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.IS_OPEN_BELOW);
                _this.closeAnimationEndTimerId = setTimeout(function () {
                    _this.closeAnimationEndTimerId = 0;
                    _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);
                    _this.adapter.notifyClose();
                }, numbers$2.TRANSITION_CLOSE_DURATION);
            });
            this.isSurfaceOpen = false;
            if (!skipRestoreFocus) {
                this.maybeRestoreFocus();
            }
        };
        /** Handle clicks and close if not within menu-surface element. */
        MDCMenuSurfaceFoundation.prototype.handleBodyClick = function (evt) {
            var el = evt.target;
            if (this.adapter.isElementInContainer(el)) {
                return;
            }
            this.close();
        };
        /** Handle keys that close the surface. */
        MDCMenuSurfaceFoundation.prototype.handleKeydown = function (evt) {
            var keyCode = evt.keyCode, key = evt.key;
            var isEscape = key === 'Escape' || keyCode === 27;
            if (isEscape) {
                this.close();
            }
        };
        MDCMenuSurfaceFoundation.prototype.autoposition = function () {
            var _a;
            // Compute measurements for autoposition methods reuse.
            this.measurements = this.getAutoLayoutmeasurements();
            var corner = this.getoriginCorner();
            var maxMenuSurfaceHeight = this.getMenuSurfaceMaxHeight(corner);
            var verticalAlignment = this.hasBit(corner, CornerBit.BOTTOM) ? 'bottom' : 'top';
            var horizontalAlignment = this.hasBit(corner, CornerBit.RIGHT) ? 'right' : 'left';
            var horizontalOffset = this.getHorizontalOriginOffset(corner);
            var verticalOffset = this.getVerticalOriginOffset(corner);
            var _b = this.measurements, anchorSize = _b.anchorSize, surfaceSize = _b.surfaceSize;
            var position = (_a = {},
                _a[horizontalAlignment] = horizontalOffset,
                _a[verticalAlignment] = verticalOffset,
                _a);
            // Center align when anchor width is comparable or greater than menu
            // surface, otherwise keep corner.
            if (anchorSize.width / surfaceSize.width >
                numbers$2.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO) {
                horizontalAlignment = 'center';
            }
            // If the menu-surface has been hoisted to the body, it's no longer relative
            // to the anchor element
            if (this.isHoistedElement || this.isFixedPosition) {
                this.adjustPositionForHoistedElement(position);
            }
            this.adapter.setTransformOrigin(horizontalAlignment + " " + verticalAlignment);
            this.adapter.setPosition(position);
            this.adapter.setMaxHeight(maxMenuSurfaceHeight ? maxMenuSurfaceHeight + 'px' : '');
            // If it is opened from the top then add is-open-below class
            if (!this.hasBit(corner, CornerBit.BOTTOM)) {
                this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.IS_OPEN_BELOW);
            }
        };
        /**
         * @return Measurements used to position menu surface popup.
         */
        MDCMenuSurfaceFoundation.prototype.getAutoLayoutmeasurements = function () {
            var anchorRect = this.adapter.getAnchorDimensions();
            var bodySize = this.adapter.getBodyDimensions();
            var viewportSize = this.adapter.getWindowDimensions();
            var windowScroll = this.adapter.getWindowScroll();
            if (!anchorRect) {
                // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
                anchorRect = {
                    top: this.position.y,
                    right: this.position.x,
                    bottom: this.position.y,
                    left: this.position.x,
                    width: 0,
                    height: 0,
                };
                // tslint:enable:object-literal-sort-keys
            }
            return {
                anchorSize: anchorRect,
                bodySize: bodySize,
                surfaceSize: this.dimensions,
                viewportDistance: {
                    // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
                    top: anchorRect.top,
                    right: viewportSize.width - anchorRect.right,
                    bottom: viewportSize.height - anchorRect.bottom,
                    left: anchorRect.left,
                    // tslint:enable:object-literal-sort-keys
                },
                viewportSize: viewportSize,
                windowScroll: windowScroll,
            };
        };
        /**
         * Computes the corner of the anchor from which to animate and position the
         * menu surface.
         *
         * Only LEFT or RIGHT bit is used to position the menu surface ignoring RTL
         * context. E.g., menu surface will be positioned from right side on TOP_END.
         */
        MDCMenuSurfaceFoundation.prototype.getoriginCorner = function () {
            var corner = this.originCorner;
            var _a = this.measurements, viewportDistance = _a.viewportDistance, anchorSize = _a.anchorSize, surfaceSize = _a.surfaceSize;
            var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation.numbers.MARGIN_TO_EDGE;
            var isAnchoredToBottom = this.hasBit(this.anchorCorner, CornerBit.BOTTOM);
            var availableTop;
            var availableBottom;
            if (isAnchoredToBottom) {
                availableTop =
                    viewportDistance.top - MARGIN_TO_EDGE + this.anchorMargin.bottom;
                availableBottom =
                    viewportDistance.bottom - MARGIN_TO_EDGE - this.anchorMargin.bottom;
            }
            else {
                availableTop =
                    viewportDistance.top - MARGIN_TO_EDGE + this.anchorMargin.top;
                availableBottom = viewportDistance.bottom - MARGIN_TO_EDGE +
                    anchorSize.height - this.anchorMargin.top;
            }
            var isAvailableBottom = availableBottom - surfaceSize.height > 0;
            if (!isAvailableBottom && availableTop > availableBottom) {
                // Attach bottom side of surface to the anchor.
                corner = this.setBit(corner, CornerBit.BOTTOM);
            }
            var isRtl = this.adapter.isRtl();
            var isFlipRtl = this.hasBit(this.anchorCorner, CornerBit.FLIP_RTL);
            var hasRightBit = this.hasBit(this.anchorCorner, CornerBit.RIGHT) ||
                this.hasBit(corner, CornerBit.RIGHT);
            // Whether surface attached to right side of anchor element.
            var isAnchoredToRight = false;
            // Anchored to start
            if (isRtl && isFlipRtl) {
                isAnchoredToRight = !hasRightBit;
            }
            else {
                // Anchored to right
                isAnchoredToRight = hasRightBit;
            }
            var availableLeft;
            var availableRight;
            if (isAnchoredToRight) {
                availableLeft =
                    viewportDistance.left + anchorSize.width + this.anchorMargin.right;
                availableRight = viewportDistance.right - this.anchorMargin.right;
            }
            else {
                availableLeft = viewportDistance.left + this.anchorMargin.left;
                availableRight =
                    viewportDistance.right + anchorSize.width - this.anchorMargin.left;
            }
            var isAvailableLeft = availableLeft - surfaceSize.width > 0;
            var isAvailableRight = availableRight - surfaceSize.width > 0;
            var isOriginCornerAlignedToEnd = this.hasBit(corner, CornerBit.FLIP_RTL) &&
                this.hasBit(corner, CornerBit.RIGHT);
            if (isAvailableRight && isOriginCornerAlignedToEnd && isRtl ||
                !isAvailableLeft && isOriginCornerAlignedToEnd) {
                // Attach left side of surface to the anchor.
                corner = this.unsetBit(corner, CornerBit.RIGHT);
            }
            else if (isAvailableLeft && isAnchoredToRight && isRtl ||
                (isAvailableLeft && !isAnchoredToRight && hasRightBit) ||
                (!isAvailableRight && availableLeft >= availableRight)) {
                // Attach right side of surface to the anchor.
                corner = this.setBit(corner, CornerBit.RIGHT);
            }
            return corner;
        };
        /**
         * @param corner Origin corner of the menu surface.
         * @return Maximum height of the menu surface, based on available space. 0
         *     indicates should not be set.
         */
        MDCMenuSurfaceFoundation.prototype.getMenuSurfaceMaxHeight = function (corner) {
            if (this.maxHeight > 0) {
                return this.maxHeight;
            }
            var viewportDistance = this.measurements.viewportDistance;
            var maxHeight = 0;
            var isBottomAligned = this.hasBit(corner, CornerBit.BOTTOM);
            var isBottomAnchored = this.hasBit(this.anchorCorner, CornerBit.BOTTOM);
            var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation.numbers.MARGIN_TO_EDGE;
            // When maximum height is not specified, it is handled from CSS.
            if (isBottomAligned) {
                maxHeight = viewportDistance.top + this.anchorMargin.top - MARGIN_TO_EDGE;
                if (!isBottomAnchored) {
                    maxHeight += this.measurements.anchorSize.height;
                }
            }
            else {
                maxHeight = viewportDistance.bottom - this.anchorMargin.bottom +
                    this.measurements.anchorSize.height - MARGIN_TO_EDGE;
                if (isBottomAnchored) {
                    maxHeight -= this.measurements.anchorSize.height;
                }
            }
            return maxHeight;
        };
        /**
         * @param corner Origin corner of the menu surface.
         * @return Horizontal offset of menu surface origin corner from corresponding
         *     anchor corner.
         */
        MDCMenuSurfaceFoundation.prototype.getHorizontalOriginOffset = function (corner) {
            var anchorSize = this.measurements.anchorSize;
            // isRightAligned corresponds to using the 'right' property on the surface.
            var isRightAligned = this.hasBit(corner, CornerBit.RIGHT);
            var avoidHorizontalOverlap = this.hasBit(this.anchorCorner, CornerBit.RIGHT);
            if (isRightAligned) {
                var rightOffset = avoidHorizontalOverlap ?
                    anchorSize.width - this.anchorMargin.left :
                    this.anchorMargin.right;
                // For hoisted or fixed elements, adjust the offset by the difference
                // between viewport width and body width so when we calculate the right
                // value (`adjustPositionForHoistedElement`) based on the element
                // position, the right property is correct.
                if (this.isHoistedElement || this.isFixedPosition) {
                    return rightOffset -
                        (this.measurements.viewportSize.width -
                            this.measurements.bodySize.width);
                }
                return rightOffset;
            }
            return avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin.right :
                this.anchorMargin.left;
        };
        /**
         * @param corner Origin corner of the menu surface.
         * @return Vertical offset of menu surface origin corner from corresponding
         *     anchor corner.
         */
        MDCMenuSurfaceFoundation.prototype.getVerticalOriginOffset = function (corner) {
            var anchorSize = this.measurements.anchorSize;
            var isBottomAligned = this.hasBit(corner, CornerBit.BOTTOM);
            var avoidVerticalOverlap = this.hasBit(this.anchorCorner, CornerBit.BOTTOM);
            var y = 0;
            if (isBottomAligned) {
                y = avoidVerticalOverlap ? anchorSize.height - this.anchorMargin.top :
                    -this.anchorMargin.bottom;
            }
            else {
                y = avoidVerticalOverlap ?
                    (anchorSize.height + this.anchorMargin.bottom) :
                    this.anchorMargin.top;
            }
            return y;
        };
        /**
         * Calculates the offsets for positioning the menu-surface when the
         * menu-surface has been hoisted to the body.
         */
        MDCMenuSurfaceFoundation.prototype.adjustPositionForHoistedElement = function (position) {
            var e_1, _a;
            var _b = this.measurements, windowScroll = _b.windowScroll, viewportDistance = _b.viewportDistance, surfaceSize = _b.surfaceSize, viewportSize = _b.viewportSize;
            var props = Object.keys(position);
            try {
                for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
                    var prop = props_1_1.value;
                    var value = position[prop] || 0;
                    if (this.isHorizontallyCenteredOnViewport &&
                        (prop === 'left' || prop === 'right')) {
                        position[prop] = (viewportSize.width - surfaceSize.width) / 2;
                        continue;
                    }
                    // Hoisted surfaces need to have the anchor elements location on the page
                    // added to the position properties for proper alignment on the body.
                    value += viewportDistance[prop];
                    // Surfaces that are absolutely positioned need to have additional
                    // calculations for scroll and bottom positioning.
                    if (!this.isFixedPosition) {
                        if (prop === 'top') {
                            value += windowScroll.y;
                        }
                        else if (prop === 'bottom') {
                            value -= windowScroll.y;
                        }
                        else if (prop === 'left') {
                            value += windowScroll.x;
                        }
                        else { // prop === 'right'
                            value -= windowScroll.x;
                        }
                    }
                    position[prop] = value;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        /**
         * The last focused element when the menu surface was opened should regain
         * focus, if the user is focused on or within the menu surface when it is
         * closed.
         */
        MDCMenuSurfaceFoundation.prototype.maybeRestoreFocus = function () {
            var _this = this;
            var isRootFocused = this.adapter.isFocused();
            var childHasFocus = document.activeElement &&
                this.adapter.isElementInContainer(document.activeElement);
            if (isRootFocused || childHasFocus) {
                // Wait before restoring focus when closing the menu surface. This is
                // important because if a touch event triggered the menu close, and the
                // subsequent mouse event occurs after focus is restored, then the
                // restored focus would be lost.
                setTimeout(function () {
                    _this.adapter.restoreFocus();
                }, numbers$2.TOUCH_EVENT_WAIT_MS);
            }
        };
        MDCMenuSurfaceFoundation.prototype.hasBit = function (corner, bit) {
            return Boolean(corner & bit); // tslint:disable-line:no-bitwise
        };
        MDCMenuSurfaceFoundation.prototype.setBit = function (corner, bit) {
            return corner | bit; // tslint:disable-line:no-bitwise
        };
        MDCMenuSurfaceFoundation.prototype.unsetBit = function (corner, bit) {
            return corner ^ bit;
        };
        /**
         * isFinite that doesn't force conversion to number type.
         * Equivalent to Number.isFinite in ES2015, which is not supported in IE.
         */
        MDCMenuSurfaceFoundation.prototype.isFinite = function (num) {
            return typeof num === 'number' && isFinite(num);
        };
        return MDCMenuSurfaceFoundation;
    }(MDCFoundation));

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
    var cssClasses$2 = {
        MENU_SELECTED_LIST_ITEM: 'mdc-menu-item--selected',
        MENU_SELECTION_GROUP: 'mdc-menu__selection-group',
        ROOT: 'mdc-menu',
    };
    var strings$2 = {
        ARIA_CHECKED_ATTR: 'aria-checked',
        ARIA_DISABLED_ATTR: 'aria-disabled',
        CHECKBOX_SELECTOR: 'input[type="checkbox"]',
        LIST_SELECTOR: '.mdc-list,.mdc-deprecated-list',
        SELECTED_EVENT: 'MDCMenu:selected',
        SKIP_RESTORE_FOCUS: 'data-menu-item-skip-restore-focus',
    };
    var numbers$1 = {
        FOCUS_ROOT_INDEX: -1,
    };
    var DefaultFocusState;
    (function (DefaultFocusState) {
        DefaultFocusState[DefaultFocusState["NONE"] = 0] = "NONE";
        DefaultFocusState[DefaultFocusState["LIST_ROOT"] = 1] = "LIST_ROOT";
        DefaultFocusState[DefaultFocusState["FIRST_ITEM"] = 2] = "FIRST_ITEM";
        DefaultFocusState[DefaultFocusState["LAST_ITEM"] = 3] = "LAST_ITEM";
    })(DefaultFocusState || (DefaultFocusState = {}));

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
    var MDCMenuFoundation = /** @class */ (function (_super) {
        __extends(MDCMenuFoundation, _super);
        function MDCMenuFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCMenuFoundation.defaultAdapter), adapter)) || this;
            _this.closeAnimationEndTimerId = 0;
            _this.defaultFocusState = DefaultFocusState.LIST_ROOT;
            _this.selectedIndex = -1;
            return _this;
        }
        Object.defineProperty(MDCMenuFoundation, "cssClasses", {
            get: function () {
                return cssClasses$2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCMenuFoundation, "strings", {
            get: function () {
                return strings$2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCMenuFoundation, "numbers", {
            get: function () {
                return numbers$1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCMenuFoundation, "defaultAdapter", {
            /**
             * @see {@link MDCMenuAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClassToElementAtIndex: function () { return undefined; },
                    removeClassFromElementAtIndex: function () { return undefined; },
                    addAttributeToElementAtIndex: function () { return undefined; },
                    removeAttributeFromElementAtIndex: function () { return undefined; },
                    getAttributeFromElementAtIndex: function () { return null; },
                    elementContainsClass: function () { return false; },
                    closeSurface: function () { return undefined; },
                    getElementIndex: function () { return -1; },
                    notifySelected: function () { return undefined; },
                    getMenuItemCount: function () { return 0; },
                    focusItemAtIndex: function () { return undefined; },
                    focusListRoot: function () { return undefined; },
                    getSelectedSiblingOfItemAtIndex: function () { return -1; },
                    isSelectableItemAtIndex: function () { return false; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: false,
            configurable: true
        });
        MDCMenuFoundation.prototype.destroy = function () {
            if (this.closeAnimationEndTimerId) {
                clearTimeout(this.closeAnimationEndTimerId);
            }
            this.adapter.closeSurface();
        };
        MDCMenuFoundation.prototype.handleKeydown = function (evt) {
            var key = evt.key, keyCode = evt.keyCode;
            var isTab = key === 'Tab' || keyCode === 9;
            if (isTab) {
                this.adapter.closeSurface(/** skipRestoreFocus */ true);
            }
        };
        MDCMenuFoundation.prototype.handleItemAction = function (listItem) {
            var _this = this;
            var index = this.adapter.getElementIndex(listItem);
            if (index < 0) {
                return;
            }
            this.adapter.notifySelected({ index: index });
            var skipRestoreFocus = this.adapter.getAttributeFromElementAtIndex(index, strings$2.SKIP_RESTORE_FOCUS) === 'true';
            this.adapter.closeSurface(skipRestoreFocus);
            // Wait for the menu to close before adding/removing classes that affect styles.
            this.closeAnimationEndTimerId = setTimeout(function () {
                // Recompute the index in case the menu contents have changed.
                var recomputedIndex = _this.adapter.getElementIndex(listItem);
                if (recomputedIndex >= 0 &&
                    _this.adapter.isSelectableItemAtIndex(recomputedIndex)) {
                    _this.setSelectedIndex(recomputedIndex);
                }
            }, MDCMenuSurfaceFoundation.numbers.TRANSITION_CLOSE_DURATION);
        };
        MDCMenuFoundation.prototype.handleMenuSurfaceOpened = function () {
            switch (this.defaultFocusState) {
                case DefaultFocusState.FIRST_ITEM:
                    this.adapter.focusItemAtIndex(0);
                    break;
                case DefaultFocusState.LAST_ITEM:
                    this.adapter.focusItemAtIndex(this.adapter.getMenuItemCount() - 1);
                    break;
                case DefaultFocusState.NONE:
                    // Do nothing.
                    break;
                default:
                    this.adapter.focusListRoot();
                    break;
            }
        };
        /**
         * Sets default focus state where the menu should focus every time when menu
         * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
         * default.
         */
        MDCMenuFoundation.prototype.setDefaultFocusState = function (focusState) {
            this.defaultFocusState = focusState;
        };
        /** @return Index of the currently selected list item within the menu. */
        MDCMenuFoundation.prototype.getSelectedIndex = function () {
            return this.selectedIndex;
        };
        /**
         * Selects the list item at `index` within the menu.
         * @param index Index of list item within the menu.
         */
        MDCMenuFoundation.prototype.setSelectedIndex = function (index) {
            this.validatedIndex(index);
            if (!this.adapter.isSelectableItemAtIndex(index)) {
                throw new Error('MDCMenuFoundation: No selection group at specified index.');
            }
            var prevSelectedIndex = this.adapter.getSelectedSiblingOfItemAtIndex(index);
            if (prevSelectedIndex >= 0) {
                this.adapter.removeAttributeFromElementAtIndex(prevSelectedIndex, strings$2.ARIA_CHECKED_ATTR);
                this.adapter.removeClassFromElementAtIndex(prevSelectedIndex, cssClasses$2.MENU_SELECTED_LIST_ITEM);
            }
            this.adapter.addClassToElementAtIndex(index, cssClasses$2.MENU_SELECTED_LIST_ITEM);
            this.adapter.addAttributeToElementAtIndex(index, strings$2.ARIA_CHECKED_ATTR, 'true');
            this.selectedIndex = index;
        };
        /**
         * Sets the enabled state to isEnabled for the menu item at the given index.
         * @param index Index of the menu item
         * @param isEnabled The desired enabled state of the menu item.
         */
        MDCMenuFoundation.prototype.setEnabled = function (index, isEnabled) {
            this.validatedIndex(index);
            if (isEnabled) {
                this.adapter.removeClassFromElementAtIndex(index, cssClasses$7.LIST_ITEM_DISABLED_CLASS);
                this.adapter.addAttributeToElementAtIndex(index, strings$2.ARIA_DISABLED_ATTR, 'false');
            }
            else {
                this.adapter.addClassToElementAtIndex(index, cssClasses$7.LIST_ITEM_DISABLED_CLASS);
                this.adapter.addAttributeToElementAtIndex(index, strings$2.ARIA_DISABLED_ATTR, 'true');
            }
        };
        MDCMenuFoundation.prototype.validatedIndex = function (index) {
            var menuSize = this.adapter.getMenuItemCount();
            var isIndexInRange = index >= 0 && index < menuSize;
            if (!isIndexInRange) {
                throw new Error('MDCMenuFoundation: No list item at specified index.');
            }
        };
        return MDCMenuFoundation;
    }(MDCFoundation));

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
    var cssClasses$1 = {
        ACTIVATED: 'mdc-select--activated',
        DISABLED: 'mdc-select--disabled',
        FOCUSED: 'mdc-select--focused',
        INVALID: 'mdc-select--invalid',
        MENU_INVALID: 'mdc-select__menu--invalid',
        OUTLINED: 'mdc-select--outlined',
        REQUIRED: 'mdc-select--required',
        ROOT: 'mdc-select',
        WITH_LEADING_ICON: 'mdc-select--with-leading-icon',
    };
    var strings$1 = {
        ARIA_CONTROLS: 'aria-controls',
        ARIA_DESCRIBEDBY: 'aria-describedby',
        ARIA_SELECTED_ATTR: 'aria-selected',
        CHANGE_EVENT: 'MDCSelect:change',
        HIDDEN_INPUT_SELECTOR: 'input[type="hidden"]',
        LABEL_SELECTOR: '.mdc-floating-label',
        LEADING_ICON_SELECTOR: '.mdc-select__icon',
        LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
        MENU_SELECTOR: '.mdc-select__menu',
        OUTLINE_SELECTOR: '.mdc-notched-outline',
        SELECTED_TEXT_SELECTOR: '.mdc-select__selected-text',
        SELECT_ANCHOR_SELECTOR: '.mdc-select__anchor',
        VALUE_ATTR: 'data-value',
    };
    var numbers = {
        LABEL_SCALE: 0.75,
        UNSET_INDEX: -1,
        CLICK_DEBOUNCE_TIMEOUT_MS: 330,
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
    var MDCSelectFoundation = /** @class */ (function (_super) {
        __extends(MDCSelectFoundation, _super);
        /* istanbul ignore next: optional argument is not a branch statement */
        /**
         * @param adapter
         * @param foundationMap Map from subcomponent names to their subfoundations.
         */
        function MDCSelectFoundation(adapter, foundationMap) {
            if (foundationMap === void 0) { foundationMap = {}; }
            var _this = _super.call(this, __assign(__assign({}, MDCSelectFoundation.defaultAdapter), adapter)) || this;
            // Disabled state
            _this.disabled = false;
            // isMenuOpen is used to track the state of the menu by listening to the
            // MDCMenuSurface:closed event For reference, menu.open will return false if
            // the menu is still closing, but isMenuOpen returns false only after the menu
            // has closed
            _this.isMenuOpen = false;
            // By default, select is invalid if it is required but no value is selected.
            _this.useDefaultValidation = true;
            _this.customValidity = true;
            _this.lastSelectedIndex = numbers.UNSET_INDEX;
            _this.clickDebounceTimeout = 0;
            _this.recentlyClicked = false;
            _this.leadingIcon = foundationMap.leadingIcon;
            _this.helperText = foundationMap.helperText;
            return _this;
        }
        Object.defineProperty(MDCSelectFoundation, "cssClasses", {
            get: function () {
                return cssClasses$1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCSelectFoundation, "numbers", {
            get: function () {
                return numbers;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCSelectFoundation, "strings", {
            get: function () {
                return strings$1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCSelectFoundation, "defaultAdapter", {
            /**
             * See {@link MDCSelectAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    activateBottomLine: function () { return undefined; },
                    deactivateBottomLine: function () { return undefined; },
                    getSelectedIndex: function () { return -1; },
                    setSelectedIndex: function () { return undefined; },
                    hasLabel: function () { return false; },
                    floatLabel: function () { return undefined; },
                    getLabelWidth: function () { return 0; },
                    setLabelRequired: function () { return undefined; },
                    hasOutline: function () { return false; },
                    notchOutline: function () { return undefined; },
                    closeOutline: function () { return undefined; },
                    setRippleCenter: function () { return undefined; },
                    notifyChange: function () { return undefined; },
                    setSelectedText: function () { return undefined; },
                    isSelectAnchorFocused: function () { return false; },
                    getSelectAnchorAttr: function () { return ''; },
                    setSelectAnchorAttr: function () { return undefined; },
                    removeSelectAnchorAttr: function () { return undefined; },
                    addMenuClass: function () { return undefined; },
                    removeMenuClass: function () { return undefined; },
                    openMenu: function () { return undefined; },
                    closeMenu: function () { return undefined; },
                    getAnchorElement: function () { return null; },
                    setMenuAnchorElement: function () { return undefined; },
                    setMenuAnchorCorner: function () { return undefined; },
                    setMenuWrapFocus: function () { return undefined; },
                    focusMenuItemAtIndex: function () { return undefined; },
                    getMenuItemCount: function () { return 0; },
                    getMenuItemValues: function () { return []; },
                    getMenuItemTextAtIndex: function () { return ''; },
                    isTypeaheadInProgress: function () { return false; },
                    typeaheadMatchItem: function () { return -1; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: false,
            configurable: true
        });
        /** Returns the index of the currently selected menu item, or -1 if none. */
        MDCSelectFoundation.prototype.getSelectedIndex = function () {
            return this.adapter.getSelectedIndex();
        };
        MDCSelectFoundation.prototype.setSelectedIndex = function (index, closeMenu, skipNotify) {
            if (closeMenu === void 0) { closeMenu = false; }
            if (skipNotify === void 0) { skipNotify = false; }
            if (index >= this.adapter.getMenuItemCount()) {
                return;
            }
            if (index === numbers.UNSET_INDEX) {
                this.adapter.setSelectedText('');
            }
            else {
                this.adapter.setSelectedText(this.adapter.getMenuItemTextAtIndex(index).trim());
            }
            this.adapter.setSelectedIndex(index);
            if (closeMenu) {
                this.adapter.closeMenu();
            }
            if (!skipNotify && this.lastSelectedIndex !== index) {
                this.handleChange();
            }
            this.lastSelectedIndex = index;
        };
        MDCSelectFoundation.prototype.setValue = function (value, skipNotify) {
            if (skipNotify === void 0) { skipNotify = false; }
            var index = this.adapter.getMenuItemValues().indexOf(value);
            this.setSelectedIndex(index, /** closeMenu */ false, skipNotify);
        };
        MDCSelectFoundation.prototype.getValue = function () {
            var index = this.adapter.getSelectedIndex();
            var menuItemValues = this.adapter.getMenuItemValues();
            return index !== numbers.UNSET_INDEX ? menuItemValues[index] : '';
        };
        MDCSelectFoundation.prototype.getDisabled = function () {
            return this.disabled;
        };
        MDCSelectFoundation.prototype.setDisabled = function (isDisabled) {
            this.disabled = isDisabled;
            if (this.disabled) {
                this.adapter.addClass(cssClasses$1.DISABLED);
                this.adapter.closeMenu();
            }
            else {
                this.adapter.removeClass(cssClasses$1.DISABLED);
            }
            if (this.leadingIcon) {
                this.leadingIcon.setDisabled(this.disabled);
            }
            if (this.disabled) {
                // Prevent click events from focusing select. Simply pointer-events: none
                // is not enough since screenreader clicks may bypass this.
                this.adapter.removeSelectAnchorAttr('tabindex');
            }
            else {
                this.adapter.setSelectAnchorAttr('tabindex', '0');
            }
            this.adapter.setSelectAnchorAttr('aria-disabled', this.disabled.toString());
        };
        /** Opens the menu. */
        MDCSelectFoundation.prototype.openMenu = function () {
            this.adapter.addClass(cssClasses$1.ACTIVATED);
            this.adapter.openMenu();
            this.isMenuOpen = true;
            this.adapter.setSelectAnchorAttr('aria-expanded', 'true');
        };
        /**
         * @param content Sets the content of the helper text.
         */
        MDCSelectFoundation.prototype.setHelperTextContent = function (content) {
            if (this.helperText) {
                this.helperText.setContent(content);
            }
        };
        /**
         * Re-calculates if the notched outline should be notched and if the label
         * should float.
         */
        MDCSelectFoundation.prototype.layout = function () {
            if (this.adapter.hasLabel()) {
                var optionHasValue = this.getValue().length > 0;
                var isFocused = this.adapter.hasClass(cssClasses$1.FOCUSED);
                var shouldFloatAndNotch = optionHasValue || isFocused;
                var isRequired = this.adapter.hasClass(cssClasses$1.REQUIRED);
                this.notchOutline(shouldFloatAndNotch);
                this.adapter.floatLabel(shouldFloatAndNotch);
                this.adapter.setLabelRequired(isRequired);
            }
        };
        /**
         * Synchronizes the list of options with the state of the foundation. Call
         * this whenever menu options are dynamically updated.
         */
        MDCSelectFoundation.prototype.layoutOptions = function () {
            var menuItemValues = this.adapter.getMenuItemValues();
            var selectedIndex = menuItemValues.indexOf(this.getValue());
            this.setSelectedIndex(selectedIndex, /** closeMenu */ false, /** skipNotify */ true);
        };
        MDCSelectFoundation.prototype.handleMenuOpened = function () {
            if (this.adapter.getMenuItemValues().length === 0) {
                return;
            }
            // Menu should open to the last selected element, should open to first menu item otherwise.
            var selectedIndex = this.getSelectedIndex();
            var focusItemIndex = selectedIndex >= 0 ? selectedIndex : 0;
            this.adapter.focusMenuItemAtIndex(focusItemIndex);
        };
        MDCSelectFoundation.prototype.handleMenuClosing = function () {
            this.adapter.setSelectAnchorAttr('aria-expanded', 'false');
        };
        MDCSelectFoundation.prototype.handleMenuClosed = function () {
            this.adapter.removeClass(cssClasses$1.ACTIVATED);
            this.isMenuOpen = false;
            // Unfocus the select if menu is closed without a selection
            if (!this.adapter.isSelectAnchorFocused()) {
                this.blur();
            }
        };
        /**
         * Handles value changes, via change event or programmatic updates.
         */
        MDCSelectFoundation.prototype.handleChange = function () {
            this.layout();
            this.adapter.notifyChange(this.getValue());
            var isRequired = this.adapter.hasClass(cssClasses$1.REQUIRED);
            if (isRequired && this.useDefaultValidation) {
                this.setValid(this.isValid());
            }
        };
        MDCSelectFoundation.prototype.handleMenuItemAction = function (index) {
            this.setSelectedIndex(index, /** closeMenu */ true);
        };
        /**
         * Handles focus events from select element.
         */
        MDCSelectFoundation.prototype.handleFocus = function () {
            this.adapter.addClass(cssClasses$1.FOCUSED);
            this.layout();
            this.adapter.activateBottomLine();
        };
        /**
         * Handles blur events from select element.
         */
        MDCSelectFoundation.prototype.handleBlur = function () {
            if (this.isMenuOpen) {
                return;
            }
            this.blur();
        };
        MDCSelectFoundation.prototype.handleClick = function (normalizedX) {
            if (this.disabled || this.recentlyClicked) {
                return;
            }
            this.setClickDebounceTimeout();
            if (this.isMenuOpen) {
                this.adapter.closeMenu();
                return;
            }
            this.adapter.setRippleCenter(normalizedX);
            this.openMenu();
        };
        /**
         * Handles keydown events on select element. Depending on the type of
         * character typed, does typeahead matching or opens menu.
         */
        MDCSelectFoundation.prototype.handleKeydown = function (event) {
            if (this.isMenuOpen || !this.adapter.hasClass(cssClasses$1.FOCUSED)) {
                return;
            }
            var isEnter = normalizeKey(event) === KEY.ENTER;
            var isSpace = normalizeKey(event) === KEY.SPACEBAR;
            var arrowUp = normalizeKey(event) === KEY.ARROW_UP;
            var arrowDown = normalizeKey(event) === KEY.ARROW_DOWN;
            var isModifier = event.ctrlKey || event.metaKey;
            // Typeahead
            if (!isModifier &&
                (!isSpace && event.key && event.key.length === 1 ||
                    isSpace && this.adapter.isTypeaheadInProgress())) {
                var key = isSpace ? ' ' : event.key;
                var typeaheadNextIndex = this.adapter.typeaheadMatchItem(key, this.getSelectedIndex());
                if (typeaheadNextIndex >= 0) {
                    this.setSelectedIndex(typeaheadNextIndex);
                }
                event.preventDefault();
                return;
            }
            if (!isEnter && !isSpace && !arrowUp && !arrowDown) {
                return;
            }
            // Increment/decrement index as necessary and open menu.
            if (arrowUp && this.getSelectedIndex() > 0) {
                this.setSelectedIndex(this.getSelectedIndex() - 1);
            }
            else if (arrowDown &&
                this.getSelectedIndex() < this.adapter.getMenuItemCount() - 1) {
                this.setSelectedIndex(this.getSelectedIndex() + 1);
            }
            this.openMenu();
            event.preventDefault();
        };
        /**
         * Opens/closes the notched outline.
         */
        MDCSelectFoundation.prototype.notchOutline = function (openNotch) {
            if (!this.adapter.hasOutline()) {
                return;
            }
            var isFocused = this.adapter.hasClass(cssClasses$1.FOCUSED);
            if (openNotch) {
                var labelScale = numbers.LABEL_SCALE;
                var labelWidth = this.adapter.getLabelWidth() * labelScale;
                this.adapter.notchOutline(labelWidth);
            }
            else if (!isFocused) {
                this.adapter.closeOutline();
            }
        };
        /**
         * Sets the aria label of the leading icon.
         */
        MDCSelectFoundation.prototype.setLeadingIconAriaLabel = function (label) {
            if (this.leadingIcon) {
                this.leadingIcon.setAriaLabel(label);
            }
        };
        /**
         * Sets the text content of the leading icon.
         */
        MDCSelectFoundation.prototype.setLeadingIconContent = function (content) {
            if (this.leadingIcon) {
                this.leadingIcon.setContent(content);
            }
        };
        MDCSelectFoundation.prototype.getUseDefaultValidation = function () {
            return this.useDefaultValidation;
        };
        MDCSelectFoundation.prototype.setUseDefaultValidation = function (useDefaultValidation) {
            this.useDefaultValidation = useDefaultValidation;
        };
        MDCSelectFoundation.prototype.setValid = function (isValid) {
            if (!this.useDefaultValidation) {
                this.customValidity = isValid;
            }
            this.adapter.setSelectAnchorAttr('aria-invalid', (!isValid).toString());
            if (isValid) {
                this.adapter.removeClass(cssClasses$1.INVALID);
                this.adapter.removeMenuClass(cssClasses$1.MENU_INVALID);
            }
            else {
                this.adapter.addClass(cssClasses$1.INVALID);
                this.adapter.addMenuClass(cssClasses$1.MENU_INVALID);
            }
            this.syncHelperTextValidity(isValid);
        };
        MDCSelectFoundation.prototype.isValid = function () {
            if (this.useDefaultValidation &&
                this.adapter.hasClass(cssClasses$1.REQUIRED) &&
                !this.adapter.hasClass(cssClasses$1.DISABLED)) {
                // See notes for required attribute under https://www.w3.org/TR/html52/sec-forms.html#the-select-element
                // TL;DR: Invalid if no index is selected, or if the first index is selected and has an empty value.
                return this.getSelectedIndex() !== numbers.UNSET_INDEX &&
                    (this.getSelectedIndex() !== 0 || Boolean(this.getValue()));
            }
            return this.customValidity;
        };
        MDCSelectFoundation.prototype.setRequired = function (isRequired) {
            if (isRequired) {
                this.adapter.addClass(cssClasses$1.REQUIRED);
            }
            else {
                this.adapter.removeClass(cssClasses$1.REQUIRED);
            }
            this.adapter.setSelectAnchorAttr('aria-required', isRequired.toString());
            this.adapter.setLabelRequired(isRequired);
        };
        MDCSelectFoundation.prototype.getRequired = function () {
            return this.adapter.getSelectAnchorAttr('aria-required') === 'true';
        };
        MDCSelectFoundation.prototype.init = function () {
            var anchorEl = this.adapter.getAnchorElement();
            if (anchorEl) {
                this.adapter.setMenuAnchorElement(anchorEl);
                this.adapter.setMenuAnchorCorner(Corner.BOTTOM_START);
            }
            this.adapter.setMenuWrapFocus(false);
            this.setDisabled(this.adapter.hasClass(cssClasses$1.DISABLED));
            this.syncHelperTextValidity(!this.adapter.hasClass(cssClasses$1.INVALID));
            this.layout();
            this.layoutOptions();
        };
        /**
         * Unfocuses the select component.
         */
        MDCSelectFoundation.prototype.blur = function () {
            this.adapter.removeClass(cssClasses$1.FOCUSED);
            this.layout();
            this.adapter.deactivateBottomLine();
            var isRequired = this.adapter.hasClass(cssClasses$1.REQUIRED);
            if (isRequired && this.useDefaultValidation) {
                this.setValid(this.isValid());
            }
        };
        MDCSelectFoundation.prototype.syncHelperTextValidity = function (isValid) {
            if (!this.helperText) {
                return;
            }
            this.helperText.setValidity(isValid);
            var helperTextVisible = this.helperText.isVisible();
            var helperTextId = this.helperText.getId();
            if (helperTextVisible && helperTextId) {
                this.adapter.setSelectAnchorAttr(strings$1.ARIA_DESCRIBEDBY, helperTextId);
            }
            else {
                // Needed because screenreaders will read labels pointed to by
                // `aria-describedby` even if they are `aria-hidden`.
                this.adapter.removeSelectAnchorAttr(strings$1.ARIA_DESCRIBEDBY);
            }
        };
        MDCSelectFoundation.prototype.setClickDebounceTimeout = function () {
            var _this = this;
            clearTimeout(this.clickDebounceTimeout);
            this.clickDebounceTimeout = setTimeout(function () {
                _this.recentlyClicked = false;
            }, numbers.CLICK_DEBOUNCE_TIMEOUT_MS);
            this.recentlyClicked = true;
        };
        return MDCSelectFoundation;
    }(MDCFoundation));

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
    var strings = {
        ARIA_HIDDEN: 'aria-hidden',
        ROLE: 'role',
    };
    var cssClasses = {
        HELPER_TEXT_VALIDATION_MSG: 'mdc-select-helper-text--validation-msg',
        HELPER_TEXT_VALIDATION_MSG_PERSISTENT: 'mdc-select-helper-text--validation-msg-persistent',
    };

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
    var MDCSelectHelperTextFoundation = /** @class */ (function (_super) {
        __extends(MDCSelectHelperTextFoundation, _super);
        function MDCSelectHelperTextFoundation(adapter) {
            return _super.call(this, __assign(__assign({}, MDCSelectHelperTextFoundation.defaultAdapter), adapter)) || this;
        }
        Object.defineProperty(MDCSelectHelperTextFoundation, "cssClasses", {
            get: function () {
                return cssClasses;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCSelectHelperTextFoundation, "strings", {
            get: function () {
                return strings;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCSelectHelperTextFoundation, "defaultAdapter", {
            /**
             * See {@link MDCSelectHelperTextAdapter} for typing information on parameters and return types.
             */
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    setAttr: function () { return undefined; },
                    getAttr: function () { return null; },
                    removeAttr: function () { return undefined; },
                    setContent: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return The ID of the helper text, or null if none is set.
         */
        MDCSelectHelperTextFoundation.prototype.getId = function () {
            return this.adapter.getAttr('id');
        };
        /**
         * @return Whether the helper text is currently visible.
         */
        MDCSelectHelperTextFoundation.prototype.isVisible = function () {
            return this.adapter.getAttr(strings.ARIA_HIDDEN) !== 'true';
        };
        /**
         * Sets the content of the helper text field.
         */
        MDCSelectHelperTextFoundation.prototype.setContent = function (content) {
            this.adapter.setContent(content);
        };
        /**
         * Sets the helper text to act as a validation message.
         * By default, validation messages are hidden when the select is valid and
         * visible when the select is invalid.
         *
         * @param isValidation True to make the helper text act as an error validation
         *     message.
         */
        MDCSelectHelperTextFoundation.prototype.setValidation = function (isValidation) {
            if (isValidation) {
                this.adapter.addClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
            }
            else {
                this.adapter.removeClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
            }
        };
        /**
         * Sets the persistency of the validation helper text.
         * This keeps the validation message visible even if the select is valid,
         * though it will be displayed in the normal (grey) color.
         */
        MDCSelectHelperTextFoundation.prototype.setValidationMsgPersistent = function (isPersistent) {
            if (isPersistent) {
                this.adapter.addClass(cssClasses.HELPER_TEXT_VALIDATION_MSG_PERSISTENT);
            }
            else {
                this.adapter.removeClass(cssClasses.HELPER_TEXT_VALIDATION_MSG_PERSISTENT);
            }
        };
        /**
         * When acting as a validation message, shows/hides the helper text and
         * triggers alerts as necessary based on the select's validity.
         */
        MDCSelectHelperTextFoundation.prototype.setValidity = function (selectIsValid) {
            var isValidationMsg = this.adapter.hasClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
            if (!isValidationMsg) {
                // Non-validating helper-text is always displayed and does not participate
                // in validation logic.
                return;
            }
            var isPersistentValidationMsg = this.adapter.hasClass(cssClasses.HELPER_TEXT_VALIDATION_MSG_PERSISTENT);
            // Validating helper text is displayed if select is invalid, unless it is
            // set as persistent, in which case it always displays.
            var msgShouldDisplay = !selectIsValid || isPersistentValidationMsg;
            if (msgShouldDisplay) {
                this.showToScreenReader();
                // In addition to displaying, also trigger an alert if the select
                // has become invalid.
                if (!selectIsValid) {
                    this.adapter.setAttr(strings.ROLE, 'alert');
                }
                else {
                    this.adapter.removeAttr(strings.ROLE);
                }
                return;
            }
            // Hide everything.
            this.adapter.removeAttr(strings.ROLE);
            this.hide();
        };
        /**
         * Makes the helper text visible to screen readers.
         */
        MDCSelectHelperTextFoundation.prototype.showToScreenReader = function () {
            this.adapter.removeAttr(strings.ARIA_HIDDEN);
        };
        /**
         * Hides the help text from screen readers.
         */
        MDCSelectHelperTextFoundation.prototype.hide = function () {
            this.adapter.setAttr(strings.ARIA_HIDDEN, 'true');
        };
        return MDCSelectHelperTextFoundation;
    }(MDCFoundation));

    /* node_modules/@smui/menu-surface/dist/MenuSurface.svelte generated by Svelte v3.49.0 */

    const { document: document_1 } = globals;
    const file$5 = "node_modules/@smui/menu-surface/dist/MenuSurface.svelte";

    function create_fragment$7(ctx) {
    	let t;
    	let div;
    	let div_class_value;
    	let div_style_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[31].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[30], null);

    	let div_levels = [
    		{
    			class: div_class_value = classMap({
    				[/*className*/ ctx[2]]: true,
    				'mdc-menu-surface': true,
    				'mdc-menu-surface--fixed': /*fixed*/ ctx[5],
    				'mdc-menu-surface--open': /*isStatic*/ ctx[4],
    				'smui-menu-surface--static': /*isStatic*/ ctx[4],
    				'mdc-menu-surface--fullwidth': /*fullWidth*/ ctx[7],
    				.../*internalClasses*/ ctx[10]
    			})
    		},
    		{
    			style: div_style_value = Object.entries(/*internalStyles*/ ctx[11]).map(func$1).concat([/*style*/ ctx[3]]).join(' ')
    		},
    		/*$$restProps*/ ctx[13]
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			t = space();
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$5, 4, 0, 117);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[33](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(document_1.body, "click", /*click_handler*/ ctx[32], true, false, false),
    					action_destroyer(useActions_action = useActions.call(null, div, /*use*/ ctx[1])),
    					action_destroyer(/*forwardEvents*/ ctx[12].call(null, div)),
    					listen_dev(div, "keydown", /*keydown_handler*/ ctx[34], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 1073741824)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[30],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[30])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[30], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				(!current || dirty[0] & /*className, fixed, isStatic, fullWidth, internalClasses*/ 1204 && div_class_value !== (div_class_value = classMap({
    					[/*className*/ ctx[2]]: true,
    					'mdc-menu-surface': true,
    					'mdc-menu-surface--fixed': /*fixed*/ ctx[5],
    					'mdc-menu-surface--open': /*isStatic*/ ctx[4],
    					'smui-menu-surface--static': /*isStatic*/ ctx[4],
    					'mdc-menu-surface--fullwidth': /*fullWidth*/ ctx[7],
    					.../*internalClasses*/ ctx[10]
    				}))) && { class: div_class_value },
    				(!current || dirty[0] & /*internalStyles, style*/ 2056 && div_style_value !== (div_style_value = Object.entries(/*internalStyles*/ ctx[11]).map(func$1).concat([/*style*/ ctx[3]]).join(' '))) && { style: div_style_value },
    				dirty[0] & /*$$restProps*/ 8192 && /*$$restProps*/ ctx[13]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[33](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func$1 = ([name, value]) => `${name}: ${value};`;

    function instance_1$3($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"use","class","style","static","anchor","fixed","open","managed","fullWidth","quickOpen","anchorElement","anchorCorner","anchorMargin","maxHeight","horizontallyCenteredOnViewport","isOpen","setOpen","setAbsolutePosition","setIsHoisted","isFixed","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MenuSurface', slots, ['default']);
    	var _a, _b, _c;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { style = '' } = $$props;
    	let { static: isStatic = false } = $$props;
    	let { anchor = true } = $$props;
    	let { fixed = false } = $$props;
    	let { open = isStatic } = $$props;
    	let { managed = false } = $$props;
    	let { fullWidth = false } = $$props;
    	let { quickOpen = false } = $$props;
    	let { anchorElement = undefined } = $$props;
    	let { anchorCorner = undefined } = $$props;
    	let { anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 } } = $$props;
    	let { maxHeight = 0 } = $$props;
    	let { horizontallyCenteredOnViewport = false } = $$props;
    	let element;
    	let instance;
    	let internalClasses = {};
    	let internalStyles = {};
    	let previousFocus = undefined;
    	setContext('SMUI:list:role', 'menu');
    	setContext('SMUI:list:item:role', 'menuitem');
    	const iCorner = Corner;

    	onMount(() => {
    		$$invalidate(9, instance = new MDCMenuSurfaceFoundation({
    				addClass,
    				removeClass,
    				hasClass,
    				hasAnchor: () => !!anchorElement,
    				notifyClose: () => {
    					if (!managed) {
    						$$invalidate(0, open = isStatic);
    					}

    					if (!open) {
    						dispatch(element, 'SMUIMenuSurface:closed', undefined, undefined, true);
    					}
    				},
    				notifyClosing: () => {
    					if (!managed) {
    						$$invalidate(0, open = isStatic);
    					}

    					if (!open) {
    						dispatch(element, 'SMUIMenuSurface:closing', undefined, undefined, true);
    					}
    				},
    				notifyOpen: () => {
    					if (!managed) {
    						$$invalidate(0, open = true);
    					}

    					if (open) {
    						dispatch(element, 'SMUIMenuSurface:opened', undefined, undefined, true);
    					}
    				},
    				isElementInContainer: el => element.contains(el),
    				isRtl: () => getComputedStyle(element).getPropertyValue('direction') === 'rtl',
    				setTransformOrigin: origin => {
    					$$invalidate(11, internalStyles['transform-origin'] = origin, internalStyles);
    				},
    				isFocused: () => document.activeElement === element,
    				saveFocus: () => {
    					var _a;

    					previousFocus = (_a = document.activeElement) !== null && _a !== void 0
    					? _a
    					: undefined;
    				},
    				restoreFocus: () => {
    					if ((!element || element.contains(document.activeElement)) && previousFocus && document.contains(previousFocus) && 'focus' in previousFocus) {
    						previousFocus.focus();
    					}
    				},
    				getInnerDimensions: () => {
    					return {
    						width: element.offsetWidth,
    						height: element.offsetHeight
    					};
    				},
    				getAnchorDimensions: () => anchorElement
    				? anchorElement.getBoundingClientRect()
    				: null,
    				getWindowDimensions: () => {
    					return {
    						width: window.innerWidth,
    						height: window.innerHeight
    					};
    				},
    				getBodyDimensions: () => {
    					return {
    						width: document.body.clientWidth,
    						height: document.body.clientHeight
    					};
    				},
    				getWindowScroll: () => {
    					return {
    						x: window.pageXOffset,
    						y: window.pageYOffset
    					};
    				},
    				setPosition: position => {
    					$$invalidate(11, internalStyles.left = 'left' in position ? `${position.left}px` : '', internalStyles);
    					$$invalidate(11, internalStyles.right = 'right' in position ? `${position.right}px` : '', internalStyles);
    					$$invalidate(11, internalStyles.top = 'top' in position ? `${position.top}px` : '', internalStyles);
    					$$invalidate(11, internalStyles.bottom = 'bottom' in position ? `${position.bottom}px` : '', internalStyles);
    				},
    				setMaxHeight: height => {
    					$$invalidate(11, internalStyles['max-height'] = height, internalStyles);
    				}
    			}));

    		const accessor = {
    			get open() {
    				return open;
    			},
    			set open(value) {
    				$$invalidate(0, open = value);
    			},
    			closeProgrammatic
    		};

    		dispatch(element, 'SMUIMenuSurface:mount', accessor);
    		instance.init();

    		return () => {
    			var _a;
    			const isHoisted = instance.isHoistedElement;
    			instance.destroy();

    			if (isHoisted) {
    				(_a = element.parentNode) === null || _a === void 0
    				? void 0
    				: _a.removeChild(element);
    			}
    		};
    	});

    	onDestroy(() => {
    		var _a;

    		if (anchor) {
    			element && ((_a = element.parentElement) === null || _a === void 0
    			? void 0
    			: _a.classList.remove('mdc-menu-surface--anchor'));
    		}
    	});

    	function hasClass(className) {
    		return className in internalClasses
    		? internalClasses[className]
    		: getElement().classList.contains(className);
    	}

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(10, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(10, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function closeProgrammatic(skipRestoreFocus) {
    		instance.close(skipRestoreFocus);
    		$$invalidate(0, open = false);
    	}

    	function isOpen() {
    		return open;
    	}

    	function setOpen(value) {
    		$$invalidate(0, open = value);
    	}

    	function setAbsolutePosition(x, y) {
    		return instance.setAbsolutePosition(x, y);
    	}

    	function setIsHoisted(isHoisted) {
    		return instance.setIsHoisted(isHoisted);
    	}

    	function isFixed() {
    		return instance.isFixed();
    	}

    	function getElement() {
    		return element;
    	}

    	const click_handler = event => instance && open && !managed && instance.handleBodyClick(event);

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(8, element);
    		});
    	}

    	const keydown_handler = event => instance && instance.handleKeydown(event);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(13, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('style' in $$new_props) $$invalidate(3, style = $$new_props.style);
    		if ('static' in $$new_props) $$invalidate(4, isStatic = $$new_props.static);
    		if ('anchor' in $$new_props) $$invalidate(15, anchor = $$new_props.anchor);
    		if ('fixed' in $$new_props) $$invalidate(5, fixed = $$new_props.fixed);
    		if ('open' in $$new_props) $$invalidate(0, open = $$new_props.open);
    		if ('managed' in $$new_props) $$invalidate(6, managed = $$new_props.managed);
    		if ('fullWidth' in $$new_props) $$invalidate(7, fullWidth = $$new_props.fullWidth);
    		if ('quickOpen' in $$new_props) $$invalidate(16, quickOpen = $$new_props.quickOpen);
    		if ('anchorElement' in $$new_props) $$invalidate(14, anchorElement = $$new_props.anchorElement);
    		if ('anchorCorner' in $$new_props) $$invalidate(17, anchorCorner = $$new_props.anchorCorner);
    		if ('anchorMargin' in $$new_props) $$invalidate(18, anchorMargin = $$new_props.anchorMargin);
    		if ('maxHeight' in $$new_props) $$invalidate(19, maxHeight = $$new_props.maxHeight);
    		if ('horizontallyCenteredOnViewport' in $$new_props) $$invalidate(20, horizontallyCenteredOnViewport = $$new_props.horizontallyCenteredOnViewport);
    		if ('$$scope' in $$new_props) $$invalidate(30, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		_a,
    		_b,
    		_c,
    		MDCMenuSurfaceFoundation,
    		onMount,
    		onDestroy,
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		useActions,
    		dispatch,
    		Corner,
    		forwardEvents,
    		use,
    		className,
    		style,
    		isStatic,
    		anchor,
    		fixed,
    		open,
    		managed,
    		fullWidth,
    		quickOpen,
    		anchorElement,
    		anchorCorner,
    		anchorMargin,
    		maxHeight,
    		horizontallyCenteredOnViewport,
    		element,
    		instance,
    		internalClasses,
    		internalStyles,
    		previousFocus,
    		iCorner,
    		hasClass,
    		addClass,
    		removeClass,
    		closeProgrammatic,
    		isOpen,
    		setOpen,
    		setAbsolutePosition,
    		setIsHoisted,
    		isFixed,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('_a' in $$props) $$invalidate(27, _a = $$new_props._a);
    		if ('_b' in $$props) $$invalidate(28, _b = $$new_props._b);
    		if ('_c' in $$props) $$invalidate(29, _c = $$new_props._c);
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('style' in $$props) $$invalidate(3, style = $$new_props.style);
    		if ('isStatic' in $$props) $$invalidate(4, isStatic = $$new_props.isStatic);
    		if ('anchor' in $$props) $$invalidate(15, anchor = $$new_props.anchor);
    		if ('fixed' in $$props) $$invalidate(5, fixed = $$new_props.fixed);
    		if ('open' in $$props) $$invalidate(0, open = $$new_props.open);
    		if ('managed' in $$props) $$invalidate(6, managed = $$new_props.managed);
    		if ('fullWidth' in $$props) $$invalidate(7, fullWidth = $$new_props.fullWidth);
    		if ('quickOpen' in $$props) $$invalidate(16, quickOpen = $$new_props.quickOpen);
    		if ('anchorElement' in $$props) $$invalidate(14, anchorElement = $$new_props.anchorElement);
    		if ('anchorCorner' in $$props) $$invalidate(17, anchorCorner = $$new_props.anchorCorner);
    		if ('anchorMargin' in $$props) $$invalidate(18, anchorMargin = $$new_props.anchorMargin);
    		if ('maxHeight' in $$props) $$invalidate(19, maxHeight = $$new_props.maxHeight);
    		if ('horizontallyCenteredOnViewport' in $$props) $$invalidate(20, horizontallyCenteredOnViewport = $$new_props.horizontallyCenteredOnViewport);
    		if ('element' in $$props) $$invalidate(8, element = $$new_props.element);
    		if ('instance' in $$props) $$invalidate(9, instance = $$new_props.instance);
    		if ('internalClasses' in $$props) $$invalidate(10, internalClasses = $$new_props.internalClasses);
    		if ('internalStyles' in $$props) $$invalidate(11, internalStyles = $$new_props.internalStyles);
    		if ('previousFocus' in $$props) previousFocus = $$new_props.previousFocus;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*element, anchor, _a, _b, _c*/ 939557120) {
    			if (element && anchor && !($$invalidate(27, _a = element.parentElement) === null || _a === void 0
    			? void 0
    			: _a.classList.contains('mdc-menu-surface--anchor'))) {
    				$$invalidate(28, _b = element.parentElement) === null || _b === void 0
    				? void 0
    				: _b.classList.add('mdc-menu-surface--anchor');

    				$$invalidate(14, anchorElement = $$invalidate(29, _c = element.parentElement) !== null && _c !== void 0
    				? _c
    				: undefined);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, open*/ 513) {
    			if (instance && instance.isOpen() !== open) {
    				if (open) {
    					instance.open();
    				} else {
    					instance.close();
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, quickOpen*/ 66048) {
    			if (instance) {
    				instance.setQuickOpen(quickOpen);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, fixed*/ 544) {
    			if (instance) {
    				instance.setFixedPosition(fixed);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, maxHeight*/ 524800) {
    			if (instance) {
    				instance.setMaxHeight(maxHeight);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, horizontallyCenteredOnViewport*/ 1049088) {
    			if (instance) {
    				instance.setIsHorizontallyCenteredOnViewport(horizontallyCenteredOnViewport);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, anchorCorner*/ 131584) {
    			if (instance && anchorCorner != null) {
    				if (typeof anchorCorner === 'string') {
    					instance.setAnchorCorner(iCorner[anchorCorner]);
    				} else {
    					instance.setAnchorCorner(anchorCorner);
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, anchorMargin*/ 262656) {
    			if (instance) {
    				instance.setAnchorMargin(anchorMargin);
    			}
    		}
    	};

    	return [
    		open,
    		use,
    		className,
    		style,
    		isStatic,
    		fixed,
    		managed,
    		fullWidth,
    		element,
    		instance,
    		internalClasses,
    		internalStyles,
    		forwardEvents,
    		$$restProps,
    		anchorElement,
    		anchor,
    		quickOpen,
    		anchorCorner,
    		anchorMargin,
    		maxHeight,
    		horizontallyCenteredOnViewport,
    		isOpen,
    		setOpen,
    		setAbsolutePosition,
    		setIsHoisted,
    		isFixed,
    		getElement,
    		_a,
    		_b,
    		_c,
    		$$scope,
    		slots,
    		click_handler,
    		div_binding,
    		keydown_handler
    	];
    }

    class MenuSurface extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance_1$3,
    			create_fragment$7,
    			safe_not_equal,
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
    				getElement: 26
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MenuSurface",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get use() {
    		throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get static() {
    		throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set static(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get anchor() {
    		throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set anchor(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fixed() {
    		throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fixed(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get open() {
    		throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get managed() {
    		throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set managed(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fullWidth() {
    		throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fullWidth(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get quickOpen() {
    		throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set quickOpen(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get anchorElement() {
    		throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set anchorElement(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get anchorCorner() {
    		throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set anchorCorner(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get anchorMargin() {
    		throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set anchorMargin(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get maxHeight() {
    		throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set maxHeight(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get horizontallyCenteredOnViewport() {
    		throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set horizontallyCenteredOnViewport(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOpen() {
    		return this.$$.ctx[21];
    	}

    	set isOpen(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setOpen() {
    		return this.$$.ctx[22];
    	}

    	set setOpen(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setAbsolutePosition() {
    		return this.$$.ctx[23];
    	}

    	set setAbsolutePosition(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setIsHoisted() {
    		return this.$$.ctx[24];
    	}

    	set setIsHoisted(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isFixed() {
    		return this.$$.ctx[25];
    	}

    	set isFixed(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[26];
    	}

    	set getElement(value) {
    		throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function Anchor(node, { addClass = (className) => node.classList.add(className), removeClass = (className) => node.classList.remove(className), } = {}) {
        addClass('mdc-menu-surface--anchor');
        return {
            destroy() {
                removeClass('mdc-menu-surface--anchor');
            },
        };
    }

    /* node_modules/@smui/menu/dist/Menu.svelte generated by Svelte v3.49.0 */

    // (1:0) <MenuSurface   bind:this={element}   use={usePass}   class={classMap({     [className]: true,     'mdc-menu': true,   })}   bind:open   on:SMUIMenuSurface:mount={handleMenuSurfaceAccessor}   on:SMUIList:mount={handleListAccessor}   on:SMUIMenuSurface:opened={() =>     instance && instance.handleMenuSurfaceOpened()}   on:keydown={handleKeydown}   on:SMUIList:action={(event) =>     instance &&     instance.handleItemAction(       listAccessor.getOrderedList()[event.detail.index].element     )}   {...$$restProps}>
    function create_default_slot$4(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[21], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2097152)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[21],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[21])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[21], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(1:0) <MenuSurface   bind:this={element}   use={usePass}   class={classMap({     [className]: true,     'mdc-menu': true,   })}   bind:open   on:SMUIMenuSurface:mount={handleMenuSurfaceAccessor}   on:SMUIList:mount={handleListAccessor}   on:SMUIMenuSurface:opened={() =>     instance && instance.handleMenuSurfaceOpened()}   on:keydown={handleKeydown}   on:SMUIList:action={(event) =>     instance &&     instance.handleItemAction(       listAccessor.getOrderedList()[event.detail.index].element     )}   {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let menusurface;
    	let updating_open;
    	let current;

    	const menusurface_spread_levels = [
    		{ use: /*usePass*/ ctx[5] },
    		{
    			class: classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-menu': true
    			})
    		},
    		/*$$restProps*/ ctx[9]
    	];

    	function menusurface_open_binding(value) {
    		/*menusurface_open_binding*/ ctx[18](value);
    	}

    	let menusurface_props = {
    		$$slots: { default: [create_default_slot$4] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < menusurface_spread_levels.length; i += 1) {
    		menusurface_props = assign(menusurface_props, menusurface_spread_levels[i]);
    	}

    	if (/*open*/ ctx[0] !== void 0) {
    		menusurface_props.open = /*open*/ ctx[0];
    	}

    	menusurface = new MenuSurface({ props: menusurface_props, $$inline: true });
    	/*menusurface_binding*/ ctx[17](menusurface);
    	binding_callbacks.push(() => bind(menusurface, 'open', menusurface_open_binding));
    	menusurface.$on("SMUIMenuSurface:mount", /*handleMenuSurfaceAccessor*/ ctx[7]);
    	menusurface.$on("SMUIList:mount", /*handleListAccessor*/ ctx[8]);
    	menusurface.$on("SMUIMenuSurface:opened", /*SMUIMenuSurface_opened_handler*/ ctx[19]);
    	menusurface.$on("keydown", /*handleKeydown*/ ctx[6]);
    	menusurface.$on("SMUIList:action", /*SMUIList_action_handler*/ ctx[20]);

    	const block = {
    		c: function create() {
    			create_component(menusurface.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(menusurface, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const menusurface_changes = (dirty & /*usePass, classMap, className, $$restProps*/ 546)
    			? get_spread_update(menusurface_spread_levels, [
    					dirty & /*usePass*/ 32 && { use: /*usePass*/ ctx[5] },
    					dirty & /*classMap, className*/ 2 && {
    						class: classMap({
    							[/*className*/ ctx[1]]: true,
    							'mdc-menu': true
    						})
    					},
    					dirty & /*$$restProps*/ 512 && get_spread_object(/*$$restProps*/ ctx[9])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 2097152) {
    				menusurface_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_open && dirty & /*open*/ 1) {
    				updating_open = true;
    				menusurface_changes.open = /*open*/ ctx[0];
    				add_flush_callback(() => updating_open = false);
    			}

    			menusurface.$set(menusurface_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menusurface.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menusurface.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*menusurface_binding*/ ctx[17](null);
    			destroy_component(menusurface, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance_1$2($$self, $$props, $$invalidate) {
    	let usePass;

    	const omit_props_names = [
    		"use","class","open","isOpen","setOpen","setDefaultFocusState","getSelectedIndex","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Menu', slots, ['default']);
    	const { closest } = ponyfill;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { open = false } = $$props;
    	let element;
    	let instance;
    	let menuSurfaceAccessor;
    	let listAccessor;

    	onMount(() => {
    		$$invalidate(3, instance = new MDCMenuFoundation({
    				addClassToElementAtIndex: (index, className) => {
    					listAccessor.addClassForElementIndex(index, className);
    				},
    				removeClassFromElementAtIndex: (index, className) => {
    					listAccessor.removeClassForElementIndex(index, className);
    				},
    				addAttributeToElementAtIndex: (index, attr, value) => {
    					listAccessor.setAttributeForElementIndex(index, attr, value);
    				},
    				removeAttributeFromElementAtIndex: (index, attr) => {
    					listAccessor.removeAttributeForElementIndex(index, attr);
    				},
    				getAttributeFromElementAtIndex: (index, attr) => listAccessor.getAttributeFromElementIndex(index, attr),
    				elementContainsClass: (element, className) => element.classList.contains(className),
    				closeSurface: skipRestoreFocus => menuSurfaceAccessor.closeProgrammatic(skipRestoreFocus),
    				getElementIndex: element => listAccessor.getOrderedList().map(accessor => accessor.element).indexOf(element),
    				notifySelected: evtData => dispatch(
    					getElement(),
    					'SMUIMenu:selected',
    					{
    						index: evtData.index,
    						item: listAccessor.getOrderedList()[evtData.index].element
    					},
    					undefined,
    					true
    				),
    				getMenuItemCount: () => listAccessor.items.length,
    				focusItemAtIndex: index => listAccessor.focusItemAtIndex(index),
    				focusListRoot: () => 'focus' in listAccessor.element && listAccessor.element.focus(),
    				isSelectableItemAtIndex: index => !!closest(listAccessor.getOrderedList()[index].element, `.${cssClasses$2.MENU_SELECTION_GROUP}`),
    				getSelectedSiblingOfItemAtIndex: index => {
    					const orderedList = listAccessor.getOrderedList();
    					const selectionGroupEl = closest(orderedList[index].element, `.${cssClasses$2.MENU_SELECTION_GROUP}`);

    					const selectedItemEl = selectionGroupEl === null || selectionGroupEl === void 0
    					? void 0
    					: selectionGroupEl.querySelector(`.${cssClasses$2.MENU_SELECTED_LIST_ITEM}`);

    					return selectedItemEl
    					? orderedList.map(item => item.element).indexOf(selectedItemEl)
    					: -1;
    				}
    			}));

    		dispatch(getElement(), 'SMUIMenu:mount', instance);
    		instance.init();

    		return () => {
    			instance.destroy();
    		};
    	});

    	function handleKeydown(event) {
    		instance && instance.handleKeydown(event);
    	}

    	function handleMenuSurfaceAccessor(event) {
    		if (!menuSurfaceAccessor) {
    			menuSurfaceAccessor = event.detail;
    		}
    	}

    	function handleListAccessor(event) {
    		if (!listAccessor) {
    			$$invalidate(4, listAccessor = event.detail);
    		}
    	}

    	function isOpen() {
    		return open;
    	}

    	function setOpen(value) {
    		$$invalidate(0, open = value);
    	}

    	function setDefaultFocusState(focusState) {
    		instance.setDefaultFocusState(focusState);
    	}

    	function getSelectedIndex() {
    		return instance.getSelectedIndex();
    	}

    	function getElement() {
    		return element.getElement();
    	}

    	function menusurface_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(2, element);
    		});
    	}

    	function menusurface_open_binding(value) {
    		open = value;
    		$$invalidate(0, open);
    	}

    	const SMUIMenuSurface_opened_handler = () => instance && instance.handleMenuSurfaceOpened();
    	const SMUIList_action_handler = event => instance && instance.handleItemAction(listAccessor.getOrderedList()[event.detail.index].element);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(10, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('open' in $$new_props) $$invalidate(0, open = $$new_props.open);
    		if ('$$scope' in $$new_props) $$invalidate(21, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		MDCMenuFoundation,
    		cssClasses: cssClasses$2,
    		ponyfill,
    		onMount,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		dispatch,
    		MenuSurface,
    		closest,
    		forwardEvents,
    		use,
    		className,
    		open,
    		element,
    		instance,
    		menuSurfaceAccessor,
    		listAccessor,
    		handleKeydown,
    		handleMenuSurfaceAccessor,
    		handleListAccessor,
    		isOpen,
    		setOpen,
    		setDefaultFocusState,
    		getSelectedIndex,
    		getElement,
    		usePass
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(10, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('open' in $$props) $$invalidate(0, open = $$new_props.open);
    		if ('element' in $$props) $$invalidate(2, element = $$new_props.element);
    		if ('instance' in $$props) $$invalidate(3, instance = $$new_props.instance);
    		if ('menuSurfaceAccessor' in $$props) menuSurfaceAccessor = $$new_props.menuSurfaceAccessor;
    		if ('listAccessor' in $$props) $$invalidate(4, listAccessor = $$new_props.listAccessor);
    		if ('usePass' in $$props) $$invalidate(5, usePass = $$new_props.usePass);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*use*/ 1024) {
    			$$invalidate(5, usePass = [forwardEvents, ...use]);
    		}
    	};

    	return [
    		open,
    		className,
    		element,
    		instance,
    		listAccessor,
    		usePass,
    		handleKeydown,
    		handleMenuSurfaceAccessor,
    		handleListAccessor,
    		$$restProps,
    		use,
    		isOpen,
    		setOpen,
    		setDefaultFocusState,
    		getSelectedIndex,
    		getElement,
    		slots,
    		menusurface_binding,
    		menusurface_open_binding,
    		SMUIMenuSurface_opened_handler,
    		SMUIList_action_handler,
    		$$scope
    	];
    }

    class Menu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance_1$2, create_fragment$6, safe_not_equal, {
    			use: 10,
    			class: 1,
    			open: 0,
    			isOpen: 11,
    			setOpen: 12,
    			setDefaultFocusState: 13,
    			getSelectedIndex: 14,
    			getElement: 15
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Menu",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get use() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get open() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOpen() {
    		return this.$$.ctx[11];
    	}

    	set isOpen(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setOpen() {
    		return this.$$.ctx[12];
    	}

    	set setOpen(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setDefaultFocusState() {
    		return this.$$.ctx[13];
    	}

    	set setDefaultFocusState(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getSelectedIndex() {
    		return this.$$.ctx[14];
    	}

    	set getSelectedIndex(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[15];
    	}

    	set getElement(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    classAdderBuilder({
        class: 'mdc-menu__selection-group-icon',
        component: Graphic,
    });

    /* node_modules/@smui/select/dist/helper-text/HelperText.svelte generated by Svelte v3.49.0 */

    const file$4 = "node_modules/@smui/select/dist/helper-text/HelperText.svelte";

    // (17:31) {:else}
    function create_else_block$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*content*/ ctx[8]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*content*/ 256) set_data_dev(t, /*content*/ ctx[8]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(17:31) {:else}",
    		ctx
    	});

    	return block;
    }

    // (17:2) {#if content == null}
    function create_if_block$2(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[13].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4096)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[12],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[12])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[12], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(17:2) {#if content == null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let div_class_value;
    	let div_aria_hidden_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block$2, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*content*/ ctx[8] == null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	let div_levels = [
    		{
    			class: div_class_value = classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-select-helper-text': true,
    				'mdc-select-helper-text--validation-msg': /*validationMsg*/ ctx[4],
    				'mdc-select-helper-text--validation-msg-persistent': /*persistent*/ ctx[3],
    				.../*internalClasses*/ ctx[6]
    			})
    		},
    		{
    			"aria-hidden": div_aria_hidden_value = /*persistent*/ ctx[3] ? undefined : 'true'
    		},
    		{ id: /*id*/ ctx[2] },
    		/*internalAttrs*/ ctx[7],
    		/*$$restProps*/ ctx[10]
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			set_attributes(div, div_data);
    			add_location(div, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			/*div_binding*/ ctx[14](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, div, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[9].call(null, div))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				(!current || dirty & /*className, validationMsg, persistent, internalClasses*/ 90 && div_class_value !== (div_class_value = classMap({
    					[/*className*/ ctx[1]]: true,
    					'mdc-select-helper-text': true,
    					'mdc-select-helper-text--validation-msg': /*validationMsg*/ ctx[4],
    					'mdc-select-helper-text--validation-msg-persistent': /*persistent*/ ctx[3],
    					.../*internalClasses*/ ctx[6]
    				}))) && { class: div_class_value },
    				(!current || dirty & /*persistent*/ 8 && div_aria_hidden_value !== (div_aria_hidden_value = /*persistent*/ ctx[3] ? undefined : 'true')) && { "aria-hidden": div_aria_hidden_value },
    				(!current || dirty & /*id*/ 4) && { id: /*id*/ ctx[2] },
    				dirty & /*internalAttrs*/ 128 && /*internalAttrs*/ ctx[7],
    				dirty & /*$$restProps*/ 1024 && /*$$restProps*/ ctx[10]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    			/*div_binding*/ ctx[14](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }
    let counter$1 = 0;

    function instance_1$1($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","class","id","persistent","validationMsg","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('HelperText', slots, ['default']);
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { id = 'SMUI-select-helper-text-' + counter$1++ } = $$props;
    	let { persistent = false } = $$props;
    	let { validationMsg = false } = $$props;
    	let element;
    	let instance;
    	let internalClasses = {};
    	let internalAttrs = {};
    	let content = undefined;

    	onMount(() => {
    		instance = new MDCSelectHelperTextFoundation({
    				addClass,
    				removeClass,
    				hasClass,
    				getAttr,
    				setAttr: addAttr,
    				removeAttr,
    				setContent: value => {
    					$$invalidate(8, content = value);
    				}
    			});

    		if (id.startsWith('SMUI-select-helper-text-')) {
    			dispatch(getElement(), 'SMUISelectHelperText:id', id);
    		}

    		dispatch(getElement(), 'SMUISelectHelperText:mount', instance);
    		instance.init();

    		return () => {
    			dispatch(getElement(), 'SMUISelectHelperText:unmount', instance);
    			instance.destroy();
    		};
    	});

    	function hasClass(className) {
    		return className in internalClasses
    		? internalClasses[className]
    		: getElement().classList.contains(className);
    	}

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(6, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(6, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function getAttr(name) {
    		var _a;

    		return name in internalAttrs
    		? (_a = internalAttrs[name]) !== null && _a !== void 0
    			? _a
    			: null
    		: getElement().getAttribute(name);
    	}

    	function addAttr(name, value) {
    		if (internalAttrs[name] !== value) {
    			$$invalidate(7, internalAttrs[name] = value, internalAttrs);
    		}
    	}

    	function removeAttr(name) {
    		if (!(name in internalAttrs) || internalAttrs[name] != null) {
    			$$invalidate(7, internalAttrs[name] = undefined, internalAttrs);
    		}
    	}

    	function getElement() {
    		return element;
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(5, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('id' in $$new_props) $$invalidate(2, id = $$new_props.id);
    		if ('persistent' in $$new_props) $$invalidate(3, persistent = $$new_props.persistent);
    		if ('validationMsg' in $$new_props) $$invalidate(4, validationMsg = $$new_props.validationMsg);
    		if ('$$scope' in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		counter: counter$1,
    		MDCSelectHelperTextFoundation,
    		onMount,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		useActions,
    		dispatch,
    		forwardEvents,
    		use,
    		className,
    		id,
    		persistent,
    		validationMsg,
    		element,
    		instance,
    		internalClasses,
    		internalAttrs,
    		content,
    		hasClass,
    		addClass,
    		removeClass,
    		getAttr,
    		addAttr,
    		removeAttr,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('id' in $$props) $$invalidate(2, id = $$new_props.id);
    		if ('persistent' in $$props) $$invalidate(3, persistent = $$new_props.persistent);
    		if ('validationMsg' in $$props) $$invalidate(4, validationMsg = $$new_props.validationMsg);
    		if ('element' in $$props) $$invalidate(5, element = $$new_props.element);
    		if ('instance' in $$props) instance = $$new_props.instance;
    		if ('internalClasses' in $$props) $$invalidate(6, internalClasses = $$new_props.internalClasses);
    		if ('internalAttrs' in $$props) $$invalidate(7, internalAttrs = $$new_props.internalAttrs);
    		if ('content' in $$props) $$invalidate(8, content = $$new_props.content);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		className,
    		id,
    		persistent,
    		validationMsg,
    		element,
    		internalClasses,
    		internalAttrs,
    		content,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		div_binding
    	];
    }

    class HelperText extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance_1$1, create_fragment$5, safe_not_equal, {
    			use: 0,
    			class: 1,
    			id: 2,
    			persistent: 3,
    			validationMsg: 4,
    			getElement: 11
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HelperText",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get use() {
    		throw new Error("<HelperText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<HelperText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<HelperText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<HelperText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<HelperText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<HelperText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get persistent() {
    		throw new Error("<HelperText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set persistent(value) {
    		throw new Error("<HelperText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get validationMsg() {
    		throw new Error("<HelperText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set validationMsg(value) {
    		throw new Error("<HelperText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[11];
    	}

    	set getElement(value) {
    		throw new Error("<HelperText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/select/dist/Select.svelte generated by Svelte v3.49.0 */
    const file$3 = "node_modules/@smui/select/dist/Select.svelte";
    const get_helperText_slot_changes = dirty => ({});
    const get_helperText_slot_context = ctx => ({});
    const get_leadingIcon_slot_changes = dirty => ({});
    const get_leadingIcon_slot_context = ctx => ({});
    const get_label_slot_changes_1 = dirty => ({});
    const get_label_slot_context_1 = ctx => ({});
    const get_label_slot_changes = dirty => ({});
    const get_label_slot_context = ctx => ({});

    // (51:2) {#if hiddenInput}
    function create_if_block_6(ctx) {
    	let input;

    	let input_levels = [
    		{ type: "hidden" },
    		{ required: /*required*/ ctx[10] },
    		{ disabled: /*disabled*/ ctx[6] },
    		{ value: /*value*/ ctx[0] },
    		prefixFilter(/*$$restProps*/ ctx[53], 'input$')
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 51, 4, 1457);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				{ type: "hidden" },
    				dirty[0] & /*required*/ 1024 && { required: /*required*/ ctx[10] },
    				dirty[0] & /*disabled*/ 64 && { disabled: /*disabled*/ ctx[6] },
    				dirty[0] & /*value*/ 1 && { value: /*value*/ ctx[0] },
    				dirty[1] & /*$$restProps*/ 4194304 && prefixFilter(/*$$restProps*/ ctx[53], 'input$')
    			]));
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(51:2) {#if hiddenInput}",
    		ctx
    	});

    	return block;
    }

    // (85:4) {#if variant === 'filled'}
    function create_if_block_5(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", "mdc-select__ripple");
    			add_location(span, file$3, 85, 6, 2389);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(85:4) {#if variant === 'filled'}",
    		ctx
    	});

    	return block;
    }

    // (88:4) {#if variant !== 'outlined' && !noLabel && (label != null || $$slots.label)}
    function create_if_block_4$1(ctx) {
    	let floatinglabel;
    	let current;

    	const floatinglabel_spread_levels = [
    		{ id: /*inputId*/ ctx[11] + '-smui-label' },
    		{
    			floatAbove: /*$selectedTextStore*/ ctx[43] !== ''
    		},
    		{ required: /*required*/ ctx[10] },
    		prefixFilter(/*$$restProps*/ ctx[53], 'label$')
    	];

    	let floatinglabel_props = {
    		$$slots: { default: [create_default_slot_5$2] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < floatinglabel_spread_levels.length; i += 1) {
    		floatinglabel_props = assign(floatinglabel_props, floatinglabel_spread_levels[i]);
    	}

    	floatinglabel = new FloatingLabel({
    			props: floatinglabel_props,
    			$$inline: true
    		});

    	/*floatinglabel_binding*/ ctx[66](floatinglabel);

    	const block = {
    		c: function create() {
    			create_component(floatinglabel.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(floatinglabel, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const floatinglabel_changes = (dirty[0] & /*inputId, required*/ 3072 | dirty[1] & /*$selectedTextStore, $$restProps*/ 4198400)
    			? get_spread_update(floatinglabel_spread_levels, [
    					dirty[0] & /*inputId*/ 2048 && { id: /*inputId*/ ctx[11] + '-smui-label' },
    					dirty[1] & /*$selectedTextStore*/ 4096 && {
    						floatAbove: /*$selectedTextStore*/ ctx[43] !== ''
    					},
    					dirty[0] & /*required*/ 1024 && { required: /*required*/ ctx[10] },
    					dirty[1] & /*$$restProps*/ 4194304 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[53], 'label$'))
    				])
    			: {};

    			if (dirty[0] & /*label*/ 512 | dirty[2] & /*$$scope*/ 134217728) {
    				floatinglabel_changes.$$scope = { dirty, ctx };
    			}

    			floatinglabel.$set(floatinglabel_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(floatinglabel.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(floatinglabel.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*floatinglabel_binding*/ ctx[66](null);
    			destroy_component(floatinglabel, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$1.name,
    		type: "if",
    		source: "(88:4) {#if variant !== 'outlined' && !noLabel && (label != null || $$slots.label)}",
    		ctx
    	});

    	return block;
    }

    // (89:6) <FloatingLabel         bind:this={floatingLabel}         id={inputId + '-smui-label'}         floatAbove={$selectedTextStore !== ''}         {required}         {...prefixFilter($$restProps, 'label$')}         >
    function create_default_slot_5$2(ctx) {
    	let t_value = (/*label*/ ctx[9] == null ? '' : /*label*/ ctx[9]) + "";
    	let t;
    	let current;
    	const label_slot_template = /*#slots*/ ctx[63].label;
    	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[89], get_label_slot_context);

    	const block = {
    		c: function create() {
    			t = text(t_value);
    			if (label_slot) label_slot.c();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);

    			if (label_slot) {
    				label_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty[0] & /*label*/ 512) && t_value !== (t_value = (/*label*/ ctx[9] == null ? '' : /*label*/ ctx[9]) + "")) set_data_dev(t, t_value);

    			if (label_slot) {
    				if (label_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
    					update_slot_base(
    						label_slot,
    						label_slot_template,
    						ctx,
    						/*$$scope*/ ctx[89],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[89])
    						: get_slot_changes(label_slot_template, /*$$scope*/ ctx[89], dirty, get_label_slot_changes),
    						get_label_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (label_slot) label_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$2.name,
    		type: "slot",
    		source: "(89:6) <FloatingLabel         bind:this={floatingLabel}         id={inputId + '-smui-label'}         floatAbove={$selectedTextStore !== ''}         {required}         {...prefixFilter($$restProps, 'label$')}         >",
    		ctx
    	});

    	return block;
    }

    // (98:4) {#if variant === 'outlined'}
    function create_if_block_2$1(ctx) {
    	let notchedoutline;
    	let current;

    	const notchedoutline_spread_levels = [
    		{
    			noLabel: /*noLabel*/ ctx[8] || /*label*/ ctx[9] == null && !/*$$slots*/ ctx[52].label
    		},
    		prefixFilter(/*$$restProps*/ ctx[53], 'outline$')
    	];

    	let notchedoutline_props = {
    		$$slots: { default: [create_default_slot_3$2] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < notchedoutline_spread_levels.length; i += 1) {
    		notchedoutline_props = assign(notchedoutline_props, notchedoutline_spread_levels[i]);
    	}

    	notchedoutline = new NotchedOutline({
    			props: notchedoutline_props,
    			$$inline: true
    		});

    	/*notchedoutline_binding*/ ctx[68](notchedoutline);

    	const block = {
    		c: function create() {
    			create_component(notchedoutline.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(notchedoutline, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const notchedoutline_changes = (dirty[0] & /*noLabel, label*/ 768 | dirty[1] & /*$$slots, $$restProps*/ 6291456)
    			? get_spread_update(notchedoutline_spread_levels, [
    					dirty[0] & /*noLabel, label*/ 768 | dirty[1] & /*$$slots*/ 2097152 && {
    						noLabel: /*noLabel*/ ctx[8] || /*label*/ ctx[9] == null && !/*$$slots*/ ctx[52].label
    					},
    					dirty[1] & /*$$restProps*/ 4194304 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[53], 'outline$'))
    				])
    			: {};

    			if (dirty[0] & /*inputId, required, label, noLabel*/ 3840 | dirty[1] & /*$selectedTextStore, $$restProps, floatingLabel, $$slots*/ 6296064 | dirty[2] & /*$$scope*/ 134217728) {
    				notchedoutline_changes.$$scope = { dirty, ctx };
    			}

    			notchedoutline.$set(notchedoutline_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(notchedoutline.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(notchedoutline.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*notchedoutline_binding*/ ctx[68](null);
    			destroy_component(notchedoutline, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(98:4) {#if variant === 'outlined'}",
    		ctx
    	});

    	return block;
    }

    // (104:8) {#if !noLabel && (label != null || $$slots.label)}
    function create_if_block_3$1(ctx) {
    	let floatinglabel;
    	let current;

    	const floatinglabel_spread_levels = [
    		{ id: /*inputId*/ ctx[11] + '-smui-label' },
    		{
    			floatAbove: /*$selectedTextStore*/ ctx[43] !== ''
    		},
    		{ required: /*required*/ ctx[10] },
    		prefixFilter(/*$$restProps*/ ctx[53], 'label$')
    	];

    	let floatinglabel_props = {
    		$$slots: { default: [create_default_slot_4$2] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < floatinglabel_spread_levels.length; i += 1) {
    		floatinglabel_props = assign(floatinglabel_props, floatinglabel_spread_levels[i]);
    	}

    	floatinglabel = new FloatingLabel({
    			props: floatinglabel_props,
    			$$inline: true
    		});

    	/*floatinglabel_binding_1*/ ctx[67](floatinglabel);

    	const block = {
    		c: function create() {
    			create_component(floatinglabel.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(floatinglabel, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const floatinglabel_changes = (dirty[0] & /*inputId, required*/ 3072 | dirty[1] & /*$selectedTextStore, $$restProps*/ 4198400)
    			? get_spread_update(floatinglabel_spread_levels, [
    					dirty[0] & /*inputId*/ 2048 && { id: /*inputId*/ ctx[11] + '-smui-label' },
    					dirty[1] & /*$selectedTextStore*/ 4096 && {
    						floatAbove: /*$selectedTextStore*/ ctx[43] !== ''
    					},
    					dirty[0] & /*required*/ 1024 && { required: /*required*/ ctx[10] },
    					dirty[1] & /*$$restProps*/ 4194304 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[53], 'label$'))
    				])
    			: {};

    			if (dirty[0] & /*label*/ 512 | dirty[2] & /*$$scope*/ 134217728) {
    				floatinglabel_changes.$$scope = { dirty, ctx };
    			}

    			floatinglabel.$set(floatinglabel_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(floatinglabel.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(floatinglabel.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*floatinglabel_binding_1*/ ctx[67](null);
    			destroy_component(floatinglabel, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(104:8) {#if !noLabel && (label != null || $$slots.label)}",
    		ctx
    	});

    	return block;
    }

    // (105:10) <FloatingLabel             bind:this={floatingLabel}             id={inputId + '-smui-label'}             floatAbove={$selectedTextStore !== ''}             {required}             {...prefixFilter($$restProps, 'label$')}             >
    function create_default_slot_4$2(ctx) {
    	let t_value = (/*label*/ ctx[9] == null ? '' : /*label*/ ctx[9]) + "";
    	let t;
    	let current;
    	const label_slot_template = /*#slots*/ ctx[63].label;
    	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[89], get_label_slot_context_1);

    	const block = {
    		c: function create() {
    			t = text(t_value);
    			if (label_slot) label_slot.c();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);

    			if (label_slot) {
    				label_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty[0] & /*label*/ 512) && t_value !== (t_value = (/*label*/ ctx[9] == null ? '' : /*label*/ ctx[9]) + "")) set_data_dev(t, t_value);

    			if (label_slot) {
    				if (label_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
    					update_slot_base(
    						label_slot,
    						label_slot_template,
    						ctx,
    						/*$$scope*/ ctx[89],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[89])
    						: get_slot_changes(label_slot_template, /*$$scope*/ ctx[89], dirty, get_label_slot_changes_1),
    						get_label_slot_context_1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (label_slot) label_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$2.name,
    		type: "slot",
    		source: "(105:10) <FloatingLabel             bind:this={floatingLabel}             id={inputId + '-smui-label'}             floatAbove={$selectedTextStore !== ''}             {required}             {...prefixFilter($$restProps, 'label$')}             >",
    		ctx
    	});

    	return block;
    }

    // (99:6) <NotchedOutline         bind:this={notchedOutline}         noLabel={noLabel || (label == null && !$$slots.label)}         {...prefixFilter($$restProps, 'outline$')}       >
    function create_default_slot_3$2(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = !/*noLabel*/ ctx[8] && (/*label*/ ctx[9] != null || /*$$slots*/ ctx[52].label) && create_if_block_3$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!/*noLabel*/ ctx[8] && (/*label*/ ctx[9] != null || /*$$slots*/ ctx[52].label)) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*noLabel, label*/ 768 | dirty[1] & /*$$slots*/ 2097152) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_3$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(99:6) <NotchedOutline         bind:this={notchedOutline}         noLabel={noLabel || (label == null && !$$slots.label)}         {...prefixFilter($$restProps, 'outline$')}       >",
    		ctx
    	});

    	return block;
    }

    // (168:4) {#if variant !== 'outlined' && ripple}
    function create_if_block_1$1(ctx) {
    	let lineripple;
    	let current;
    	const lineripple_spread_levels = [prefixFilter(/*$$restProps*/ ctx[53], 'ripple$')];
    	let lineripple_props = {};

    	for (let i = 0; i < lineripple_spread_levels.length; i += 1) {
    		lineripple_props = assign(lineripple_props, lineripple_spread_levels[i]);
    	}

    	lineripple = new LineRipple({ props: lineripple_props, $$inline: true });
    	/*lineripple_binding*/ ctx[70](lineripple);

    	const block = {
    		c: function create() {
    			create_component(lineripple.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(lineripple, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const lineripple_changes = (dirty[1] & /*$$restProps*/ 4194304)
    			? get_spread_update(lineripple_spread_levels, [get_spread_object(prefixFilter(/*$$restProps*/ ctx[53], 'ripple$'))])
    			: {};

    			lineripple.$set(lineripple_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(lineripple.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(lineripple.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*lineripple_binding*/ ctx[70](null);
    			destroy_component(lineripple, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(168:4) {#if variant !== 'outlined' && ripple}",
    		ctx
    	});

    	return block;
    }

    // (194:4) <List       role="listbox"       {wrapFocus}       bind:selectedIndex       on:SMUIList:mount={(event) => (list = event.detail)}       {...prefixFilter($$restProps, 'list$')}>
    function create_default_slot_2$2(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[63].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[89], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[89],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[89])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[89], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(194:4) <List       role=\\\"listbox\\\"       {wrapFocus}       bind:selectedIndex       on:SMUIList:mount={(event) => (list = event.detail)}       {...prefixFilter($$restProps, 'list$')}>",
    		ctx
    	});

    	return block;
    }

    // (176:2) <Menu     class={classMap({       [menu$class]: true,       'mdc-select__menu': true,       ...menuClasses,     })}     fullWidth     anchor={false}     {anchorElement}     {anchorCorner}     bind:open={menuOpen}     on:SMUIMenu:selected={(event) =>       instance && instance.handleMenuItemAction(event.detail.index)}     on:SMUIMenuSurface:closing={() => instance && instance.handleMenuClosing()}     on:SMUIMenuSurface:closed={() => instance && instance.handleMenuClosed()}     on:SMUIMenuSurface:opened={() => instance && instance.handleMenuOpened()}     {...prefixFilter($$restProps, 'menu$')}   >
    function create_default_slot_1$2(ctx) {
    	let list_1;
    	let updating_selectedIndex;
    	let current;

    	const list_1_spread_levels = [
    		{ role: "listbox" },
    		{ wrapFocus: /*wrapFocus*/ ctx[36] },
    		prefixFilter(/*$$restProps*/ ctx[53], 'list$')
    	];

    	function list_1_selectedIndex_binding(value) {
    		/*list_1_selectedIndex_binding*/ ctx[76](value);
    	}

    	let list_1_props = {
    		$$slots: { default: [create_default_slot_2$2] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < list_1_spread_levels.length; i += 1) {
    		list_1_props = assign(list_1_props, list_1_spread_levels[i]);
    	}

    	if (/*selectedIndex*/ ctx[24] !== void 0) {
    		list_1_props.selectedIndex = /*selectedIndex*/ ctx[24];
    	}

    	list_1 = new List({ props: list_1_props, $$inline: true });
    	binding_callbacks.push(() => bind(list_1, 'selectedIndex', list_1_selectedIndex_binding));
    	list_1.$on("SMUIList:mount", /*SMUIList_mount_handler*/ ctx[77]);

    	const block = {
    		c: function create() {
    			create_component(list_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(list_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const list_1_changes = (dirty[1] & /*wrapFocus, $$restProps*/ 4194336)
    			? get_spread_update(list_1_spread_levels, [
    					list_1_spread_levels[0],
    					dirty[1] & /*wrapFocus*/ 32 && { wrapFocus: /*wrapFocus*/ ctx[36] },
    					dirty[1] & /*$$restProps*/ 4194304 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[53], 'list$'))
    				])
    			: {};

    			if (dirty[2] & /*$$scope*/ 134217728) {
    				list_1_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_selectedIndex && dirty[0] & /*selectedIndex*/ 16777216) {
    				updating_selectedIndex = true;
    				list_1_changes.selectedIndex = /*selectedIndex*/ ctx[24];
    				add_flush_callback(() => updating_selectedIndex = false);
    			}

    			list_1.$set(list_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(list_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(list_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(list_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(176:2) <Menu     class={classMap({       [menu$class]: true,       'mdc-select__menu': true,       ...menuClasses,     })}     fullWidth     anchor={false}     {anchorElement}     {anchorCorner}     bind:open={menuOpen}     on:SMUIMenu:selected={(event) =>       instance && instance.handleMenuItemAction(event.detail.index)}     on:SMUIMenuSurface:closing={() => instance && instance.handleMenuClosing()}     on:SMUIMenuSurface:closed={() => instance && instance.handleMenuClosed()}     on:SMUIMenuSurface:opened={() => instance && instance.handleMenuOpened()}     {...prefixFilter($$restProps, 'menu$')}   >",
    		ctx
    	});

    	return block;
    }

    // (203:0) {#if $$slots.helperText}
    function create_if_block$1(ctx) {
    	let helpertext;
    	let current;
    	const helpertext_spread_levels = [prefixFilter(/*$$restProps*/ ctx[53], 'helperText$')];

    	let helpertext_props = {
    		$$slots: { default: [create_default_slot$3] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < helpertext_spread_levels.length; i += 1) {
    		helpertext_props = assign(helpertext_props, helpertext_spread_levels[i]);
    	}

    	helpertext = new HelperText({ props: helpertext_props, $$inline: true });
    	helpertext.$on("SMUISelectHelperText:id", /*SMUISelectHelperText_id_handler*/ ctx[86]);
    	helpertext.$on("SMUISelectHelperText:mount", /*SMUISelectHelperText_mount_handler*/ ctx[87]);
    	helpertext.$on("SMUISelectHelperText:unmount", /*SMUISelectHelperText_unmount_handler*/ ctx[88]);

    	const block = {
    		c: function create() {
    			create_component(helpertext.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(helpertext, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const helpertext_changes = (dirty[1] & /*$$restProps*/ 4194304)
    			? get_spread_update(helpertext_spread_levels, [get_spread_object(prefixFilter(/*$$restProps*/ ctx[53], 'helperText$'))])
    			: {};

    			if (dirty[2] & /*$$scope*/ 134217728) {
    				helpertext_changes.$$scope = { dirty, ctx };
    			}

    			helpertext.$set(helpertext_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(helpertext.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(helpertext.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(helpertext, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(203:0) {#if $$slots.helperText}",
    		ctx
    	});

    	return block;
    }

    // (204:2) <HelperText     on:SMUISelectHelperText:id={(event) => (helperId = event.detail)}     on:SMUISelectHelperText:mount={(event) => (helperText = event.detail)}     on:SMUISelectHelperText:unmount={() => {       helperId = undefined;       helperText = undefined;     }}     {...prefixFilter($$restProps, 'helperText$')}     >
    function create_default_slot$3(ctx) {
    	let current;
    	const helperText_slot_template = /*#slots*/ ctx[63].helperText;
    	const helperText_slot = create_slot(helperText_slot_template, ctx, /*$$scope*/ ctx[89], get_helperText_slot_context);

    	const block = {
    		c: function create() {
    			if (helperText_slot) helperText_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (helperText_slot) {
    				helperText_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (helperText_slot) {
    				if (helperText_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
    					update_slot_base(
    						helperText_slot,
    						helperText_slot_template,
    						ctx,
    						/*$$scope*/ ctx[89],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[89])
    						: get_slot_changes(helperText_slot_template, /*$$scope*/ ctx[89], dirty, get_helperText_slot_changes),
    						get_helperText_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(helperText_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(helperText_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (helperText_slot) helperText_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(204:2) <HelperText     on:SMUISelectHelperText:id={(event) => (helperId = event.detail)}     on:SMUISelectHelperText:mount={(event) => (helperText = event.detail)}     on:SMUISelectHelperText:unmount={() => {       helperId = undefined;       helperText = undefined;     }}     {...prefixFilter($$restProps, 'helperText$')}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let span1;
    	let span0;
    	let t5;
    	let span0_id_value;
    	let span0_class_value;
    	let span0_aria_labelledby_value;
    	let useActions_action;
    	let span1_class_value;
    	let useActions_action_1;
    	let t6;
    	let span2;
    	let svg;
    	let polygon0;
    	let polygon1;
    	let span2_class_value;
    	let useActions_action_2;
    	let t7;
    	let div0_class_value;
    	let div0_aria_required_value;
    	let div0_aria_disabled_value;
    	let useActions_action_3;
    	let t8;
    	let menu;
    	let updating_open;
    	let div1_class_value;
    	let div1_style_value;
    	let Ripple_action;
    	let useActions_action_4;
    	let t9;
    	let if_block5_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*hiddenInput*/ ctx[12] && create_if_block_6(ctx);
    	let if_block1 = /*variant*/ ctx[7] === 'filled' && create_if_block_5(ctx);
    	let if_block2 = /*variant*/ ctx[7] !== 'outlined' && !/*noLabel*/ ctx[8] && (/*label*/ ctx[9] != null || /*$$slots*/ ctx[52].label) && create_if_block_4$1(ctx);
    	let if_block3 = /*variant*/ ctx[7] === 'outlined' && create_if_block_2$1(ctx);
    	const leadingIcon_slot_template = /*#slots*/ ctx[63].leadingIcon;
    	const leadingIcon_slot = create_slot(leadingIcon_slot_template, ctx, /*$$scope*/ ctx[89], get_leadingIcon_slot_context);

    	let span0_levels = [
    		{
    			id: span0_id_value = /*inputId*/ ctx[11] + '-smui-selected-text'
    		},
    		{
    			class: span0_class_value = classMap({
    				[/*selectedText$class*/ ctx[19]]: true,
    				'mdc-select__selected-text': true
    			})
    		},
    		{ role: "button" },
    		{ "aria-haspopup": "listbox" },
    		{
    			"aria-labelledby": span0_aria_labelledby_value = /*inputId*/ ctx[11] + '-smui-label'
    		},
    		prefixFilter(/*$$restProps*/ ctx[53], 'selectedText$')
    	];

    	let span0_data = {};

    	for (let i = 0; i < span0_levels.length; i += 1) {
    		span0_data = assign(span0_data, span0_levels[i]);
    	}

    	let span1_levels = [
    		{
    			class: span1_class_value = classMap({
    				[/*selectedTextContainer$class*/ ctx[17]]: true,
    				'mdc-select__selected-text-container': true
    			})
    		},
    		prefixFilter(/*$$restProps*/ ctx[53], 'selectedTextContainer$')
    	];

    	let span1_data = {};

    	for (let i = 0; i < span1_levels.length; i += 1) {
    		span1_data = assign(span1_data, span1_levels[i]);
    	}

    	let span2_levels = [
    		{
    			class: span2_class_value = classMap({
    				[/*dropdownIcon$class*/ ctx[21]]: true,
    				'mdc-select__dropdown-icon': true
    			})
    		},
    		prefixFilter(/*$$restProps*/ ctx[53], 'dropdownIcon$')
    	];

    	let span2_data = {};

    	for (let i = 0; i < span2_levels.length; i += 1) {
    		span2_data = assign(span2_data, span2_levels[i]);
    	}

    	let if_block4 = /*variant*/ ctx[7] !== 'outlined' && /*ripple*/ ctx[5] && create_if_block_1$1(ctx);

    	let div0_levels = [
    		{
    			class: div0_class_value = classMap({
    				[/*anchor$class*/ ctx[15]]: true,
    				'mdc-select__anchor': true
    			})
    		},
    		{
    			"aria-required": div0_aria_required_value = /*required*/ ctx[10] ? 'true' : undefined
    		},
    		{
    			"aria-disabled": div0_aria_disabled_value = /*disabled*/ ctx[6] ? 'true' : undefined
    		},
    		{ "aria-controls": /*helperId*/ ctx[31] },
    		{ "aria-describedby": /*helperId*/ ctx[31] },
    		/*selectAnchorAttrs*/ ctx[29],
    		prefixFilter(/*$$restProps*/ ctx[53], 'anchor$')
    	];

    	let div0_data = {};

    	for (let i = 0; i < div0_levels.length; i += 1) {
    		div0_data = assign(div0_data, div0_levels[i]);
    	}

    	const menu_spread_levels = [
    		{
    			class: classMap({
    				[/*menu$class*/ ctx[22]]: true,
    				'mdc-select__menu': true,
    				.../*menuClasses*/ ctx[33]
    			})
    		},
    		{ fullWidth: true },
    		{ anchor: false },
    		{ anchorElement: /*anchorElement*/ ctx[34] },
    		{ anchorCorner: /*anchorCorner*/ ctx[35] },
    		prefixFilter(/*$$restProps*/ ctx[53], 'menu$')
    	];

    	function menu_open_binding(value) {
    		/*menu_open_binding*/ ctx[78](value);
    	}

    	let menu_props = {
    		$$slots: { default: [create_default_slot_1$2] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < menu_spread_levels.length; i += 1) {
    		menu_props = assign(menu_props, menu_spread_levels[i]);
    	}

    	if (/*menuOpen*/ ctx[32] !== void 0) {
    		menu_props.open = /*menuOpen*/ ctx[32];
    	}

    	menu = new Menu({ props: menu_props, $$inline: true });
    	binding_callbacks.push(() => bind(menu, 'open', menu_open_binding));
    	menu.$on("SMUIMenu:selected", /*SMUIMenu_selected_handler*/ ctx[79]);
    	menu.$on("SMUIMenuSurface:closing", /*SMUIMenuSurface_closing_handler*/ ctx[80]);
    	menu.$on("SMUIMenuSurface:closed", /*SMUIMenuSurface_closed_handler*/ ctx[81]);
    	menu.$on("SMUIMenuSurface:opened", /*SMUIMenuSurface_opened_handler*/ ctx[82]);

    	let div1_levels = [
    		{
    			class: div1_class_value = classMap({
    				[/*className*/ ctx[3]]: true,
    				'mdc-select': true,
    				'mdc-select--required': /*required*/ ctx[10],
    				'mdc-select--disabled': /*disabled*/ ctx[6],
    				'mdc-select--filled': /*variant*/ ctx[7] === 'filled',
    				'mdc-select--outlined': /*variant*/ ctx[7] === 'outlined',
    				'smui-select--standard': /*variant*/ ctx[7] === 'standard',
    				'mdc-select--with-leading-icon': /*isUninitializedValue*/ ctx[45](/*withLeadingIcon*/ ctx[13])
    				? /*$$slots*/ ctx[52].leadingIcon
    				: /*withLeadingIcon*/ ctx[13],
    				'mdc-select--no-label': /*noLabel*/ ctx[8] || /*label*/ ctx[9] == null && !/*$$slots*/ ctx[52].label,
    				'mdc-select--invalid': /*invalid*/ ctx[1],
    				'mdc-select--activated': /*menuOpen*/ ctx[32],
    				'mdc-data-table__pagination-rows-per-page-select': /*context*/ ctx[46] === 'data-table:pagination',
    				.../*internalClasses*/ ctx[26]
    			})
    		},
    		{
    			style: div1_style_value = Object.entries(/*internalStyles*/ ctx[27]).map(func).concat([/*style*/ ctx[4]]).join(' ')
    		},
    		exclude(/*$$restProps*/ ctx[53], [
    			'input$',
    			'anchor$',
    			'label$',
    			'outline$',
    			'selectedTextContainer$',
    			'selectedText$',
    			'dropdownIcon$',
    			'ripple$',
    			'menu$',
    			'list$',
    			'helperText$'
    		])
    	];

    	let div1_data = {};

    	for (let i = 0; i < div1_levels.length; i += 1) {
    		div1_data = assign(div1_data, div1_levels[i]);
    	}

    	let if_block5 = /*$$slots*/ ctx[52].helperText && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div0 = element("div");
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (if_block2) if_block2.c();
    			t2 = space();
    			if (if_block3) if_block3.c();
    			t3 = space();
    			if (leadingIcon_slot) leadingIcon_slot.c();
    			t4 = space();
    			span1 = element("span");
    			span0 = element("span");
    			t5 = text(/*$selectedTextStore*/ ctx[43]);
    			t6 = space();
    			span2 = element("span");
    			svg = svg_element("svg");
    			polygon0 = svg_element("polygon");
    			polygon1 = svg_element("polygon");
    			t7 = space();
    			if (if_block4) if_block4.c();
    			t8 = space();
    			create_component(menu.$$.fragment);
    			t9 = space();
    			if (if_block5) if_block5.c();
    			if_block5_anchor = empty();
    			set_attributes(span0, span0_data);
    			add_location(span0, file$3, 124, 6, 3753);
    			set_attributes(span1, span1_data);
    			add_location(span1, file$3, 116, 4, 3491);
    			attr_dev(polygon0, "class", "mdc-select__dropdown-icon-inactive");
    			attr_dev(polygon0, "stroke", "none");
    			attr_dev(polygon0, "fill-rule", "evenodd");
    			attr_dev(polygon0, "points", "7 10 12 15 17 10");
    			add_location(polygon0, file$3, 153, 8, 4575);
    			attr_dev(polygon1, "class", "mdc-select__dropdown-icon-active");
    			attr_dev(polygon1, "stroke", "none");
    			attr_dev(polygon1, "fill-rule", "evenodd");
    			attr_dev(polygon1, "points", "7 15 12 10 17 15");
    			add_location(polygon1, file$3, 159, 8, 4746);
    			attr_dev(svg, "class", "mdc-select__dropdown-icon-graphic");
    			attr_dev(svg, "viewBox", "7 10 10 5");
    			attr_dev(svg, "focusable", "false");
    			add_location(svg, file$3, 148, 6, 4450);
    			set_attributes(span2, span2_data);
    			add_location(span2, file$3, 140, 4, 4225);
    			set_attributes(div0, div0_data);
    			add_location(div0, file$3, 59, 2, 1596);
    			set_attributes(div1, div1_data);
    			add_location(div1, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			if (if_block1) if_block1.m(div0, null);
    			append_dev(div0, t1);
    			if (if_block2) if_block2.m(div0, null);
    			append_dev(div0, t2);
    			if (if_block3) if_block3.m(div0, null);
    			append_dev(div0, t3);

    			if (leadingIcon_slot) {
    				leadingIcon_slot.m(div0, null);
    			}

    			append_dev(div0, t4);
    			append_dev(div0, span1);
    			append_dev(span1, span0);
    			append_dev(span0, t5);
    			/*span0_binding*/ ctx[69](span0);
    			append_dev(div0, t6);
    			append_dev(div0, span2);
    			append_dev(span2, svg);
    			append_dev(svg, polygon0);
    			append_dev(svg, polygon1);
    			append_dev(div0, t7);
    			if (if_block4) if_block4.m(div0, null);
    			/*div0_binding*/ ctx[71](div0);
    			append_dev(div1, t8);
    			mount_component(menu, div1, null);
    			/*div1_binding*/ ctx[83](div1);
    			insert_dev(target, t9, anchor);
    			if (if_block5) if_block5.m(target, anchor);
    			insert_dev(target, if_block5_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, span0, /*selectedText$use*/ ctx[18])),
    					action_destroyer(useActions_action_1 = useActions.call(null, span1, /*selectedTextContainer$use*/ ctx[16])),
    					action_destroyer(useActions_action_2 = useActions.call(null, span2, /*dropdownIcon$use*/ ctx[20])),
    					action_destroyer(useActions_action_3 = useActions.call(null, div0, /*anchor$use*/ ctx[14])),
    					listen_dev(div0, "focus", /*focus_handler_1*/ ctx[72], false, false, false),
    					listen_dev(div0, "blur", /*blur_handler_1*/ ctx[73], false, false, false),
    					listen_dev(div0, "click", /*click_handler*/ ctx[74], false, false, false),
    					listen_dev(div0, "keydown", /*keydown_handler*/ ctx[75], false, false, false),
    					listen_dev(div0, "focus", /*focus_handler*/ ctx[64], false, false, false),
    					listen_dev(div0, "blur", /*blur_handler*/ ctx[65], false, false, false),
    					action_destroyer(Ripple_action = Ripple.call(null, div1, {
    						ripple: /*variant*/ ctx[7] === 'filled',
    						unbounded: false,
    						addClass: /*addClass*/ ctx[49],
    						removeClass: /*removeClass*/ ctx[50],
    						addStyle: /*addStyle*/ ctx[51]
    					})),
    					action_destroyer(Anchor.call(null, div1, {
    						addClass: /*addClass*/ ctx[49],
    						removeClass: /*removeClass*/ ctx[50]
    					})),
    					action_destroyer(useActions_action_4 = useActions.call(null, div1, /*use*/ ctx[2])),
    					action_destroyer(/*forwardEvents*/ ctx[44].call(null, div1)),
    					listen_dev(div1, "SMUISelectLeadingIcon:mount", /*SMUISelectLeadingIcon_mount_handler*/ ctx[84], false, false, false),
    					listen_dev(div1, "SMUISelectLeadingIcon:unmount", /*SMUISelectLeadingIcon_unmount_handler*/ ctx[85], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*hiddenInput*/ ctx[12]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_6(ctx);
    					if_block0.c();
    					if_block0.m(div1, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*variant*/ ctx[7] === 'filled') {
    				if (if_block1) ; else {
    					if_block1 = create_if_block_5(ctx);
    					if_block1.c();
    					if_block1.m(div0, t1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*variant*/ ctx[7] !== 'outlined' && !/*noLabel*/ ctx[8] && (/*label*/ ctx[9] != null || /*$$slots*/ ctx[52].label)) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty[0] & /*variant, noLabel, label*/ 896 | dirty[1] & /*$$slots*/ 2097152) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_4$1(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(div0, t2);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (/*variant*/ ctx[7] === 'outlined') {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);

    					if (dirty[0] & /*variant*/ 128) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block_2$1(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(div0, t3);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}

    			if (leadingIcon_slot) {
    				if (leadingIcon_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
    					update_slot_base(
    						leadingIcon_slot,
    						leadingIcon_slot_template,
    						ctx,
    						/*$$scope*/ ctx[89],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[89])
    						: get_slot_changes(leadingIcon_slot_template, /*$$scope*/ ctx[89], dirty, get_leadingIcon_slot_changes),
    						get_leadingIcon_slot_context
    					);
    				}
    			}

    			if (!current || dirty[1] & /*$selectedTextStore*/ 4096) set_data_dev(t5, /*$selectedTextStore*/ ctx[43]);

    			set_attributes(span0, span0_data = get_spread_update(span0_levels, [
    				(!current || dirty[0] & /*inputId*/ 2048 && span0_id_value !== (span0_id_value = /*inputId*/ ctx[11] + '-smui-selected-text')) && { id: span0_id_value },
    				(!current || dirty[0] & /*selectedText$class*/ 524288 && span0_class_value !== (span0_class_value = classMap({
    					[/*selectedText$class*/ ctx[19]]: true,
    					'mdc-select__selected-text': true
    				}))) && { class: span0_class_value },
    				{ role: "button" },
    				{ "aria-haspopup": "listbox" },
    				(!current || dirty[0] & /*inputId*/ 2048 && span0_aria_labelledby_value !== (span0_aria_labelledby_value = /*inputId*/ ctx[11] + '-smui-label')) && {
    					"aria-labelledby": span0_aria_labelledby_value
    				},
    				dirty[1] & /*$$restProps*/ 4194304 && prefixFilter(/*$$restProps*/ ctx[53], 'selectedText$')
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*selectedText$use*/ 262144) useActions_action.update.call(null, /*selectedText$use*/ ctx[18]);

    			set_attributes(span1, span1_data = get_spread_update(span1_levels, [
    				(!current || dirty[0] & /*selectedTextContainer$class*/ 131072 && span1_class_value !== (span1_class_value = classMap({
    					[/*selectedTextContainer$class*/ ctx[17]]: true,
    					'mdc-select__selected-text-container': true
    				}))) && { class: span1_class_value },
    				dirty[1] & /*$$restProps*/ 4194304 && prefixFilter(/*$$restProps*/ ctx[53], 'selectedTextContainer$')
    			]));

    			if (useActions_action_1 && is_function(useActions_action_1.update) && dirty[0] & /*selectedTextContainer$use*/ 65536) useActions_action_1.update.call(null, /*selectedTextContainer$use*/ ctx[16]);

    			set_attributes(span2, span2_data = get_spread_update(span2_levels, [
    				(!current || dirty[0] & /*dropdownIcon$class*/ 2097152 && span2_class_value !== (span2_class_value = classMap({
    					[/*dropdownIcon$class*/ ctx[21]]: true,
    					'mdc-select__dropdown-icon': true
    				}))) && { class: span2_class_value },
    				dirty[1] & /*$$restProps*/ 4194304 && prefixFilter(/*$$restProps*/ ctx[53], 'dropdownIcon$')
    			]));

    			if (useActions_action_2 && is_function(useActions_action_2.update) && dirty[0] & /*dropdownIcon$use*/ 1048576) useActions_action_2.update.call(null, /*dropdownIcon$use*/ ctx[20]);

    			if (/*variant*/ ctx[7] !== 'outlined' && /*ripple*/ ctx[5]) {
    				if (if_block4) {
    					if_block4.p(ctx, dirty);

    					if (dirty[0] & /*variant, ripple*/ 160) {
    						transition_in(if_block4, 1);
    					}
    				} else {
    					if_block4 = create_if_block_1$1(ctx);
    					if_block4.c();
    					transition_in(if_block4, 1);
    					if_block4.m(div0, null);
    				}
    			} else if (if_block4) {
    				group_outros();

    				transition_out(if_block4, 1, 1, () => {
    					if_block4 = null;
    				});

    				check_outros();
    			}

    			set_attributes(div0, div0_data = get_spread_update(div0_levels, [
    				(!current || dirty[0] & /*anchor$class*/ 32768 && div0_class_value !== (div0_class_value = classMap({
    					[/*anchor$class*/ ctx[15]]: true,
    					'mdc-select__anchor': true
    				}))) && { class: div0_class_value },
    				(!current || dirty[0] & /*required*/ 1024 && div0_aria_required_value !== (div0_aria_required_value = /*required*/ ctx[10] ? 'true' : undefined)) && {
    					"aria-required": div0_aria_required_value
    				},
    				(!current || dirty[0] & /*disabled*/ 64 && div0_aria_disabled_value !== (div0_aria_disabled_value = /*disabled*/ ctx[6] ? 'true' : undefined)) && {
    					"aria-disabled": div0_aria_disabled_value
    				},
    				(!current || dirty[1] & /*helperId*/ 1) && { "aria-controls": /*helperId*/ ctx[31] },
    				(!current || dirty[1] & /*helperId*/ 1) && { "aria-describedby": /*helperId*/ ctx[31] },
    				dirty[0] & /*selectAnchorAttrs*/ 536870912 && /*selectAnchorAttrs*/ ctx[29],
    				dirty[1] & /*$$restProps*/ 4194304 && prefixFilter(/*$$restProps*/ ctx[53], 'anchor$')
    			]));

    			if (useActions_action_3 && is_function(useActions_action_3.update) && dirty[0] & /*anchor$use*/ 16384) useActions_action_3.update.call(null, /*anchor$use*/ ctx[14]);

    			const menu_changes = (dirty[0] & /*menu$class*/ 4194304 | dirty[1] & /*menuClasses, anchorElement, anchorCorner, $$restProps*/ 4194332)
    			? get_spread_update(menu_spread_levels, [
    					dirty[0] & /*menu$class*/ 4194304 | dirty[1] & /*menuClasses*/ 4 && {
    						class: classMap({
    							[/*menu$class*/ ctx[22]]: true,
    							'mdc-select__menu': true,
    							.../*menuClasses*/ ctx[33]
    						})
    					},
    					menu_spread_levels[1],
    					menu_spread_levels[2],
    					dirty[1] & /*anchorElement*/ 8 && { anchorElement: /*anchorElement*/ ctx[34] },
    					dirty[1] & /*anchorCorner*/ 16 && { anchorCorner: /*anchorCorner*/ ctx[35] },
    					dirty[1] & /*$$restProps*/ 4194304 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[53], 'menu$'))
    				])
    			: {};

    			if (dirty[0] & /*selectedIndex*/ 16777216 | dirty[1] & /*wrapFocus, $$restProps, list*/ 4194400 | dirty[2] & /*$$scope*/ 134217728) {
    				menu_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_open && dirty[1] & /*menuOpen*/ 2) {
    				updating_open = true;
    				menu_changes.open = /*menuOpen*/ ctx[32];
    				add_flush_callback(() => updating_open = false);
    			}

    			menu.$set(menu_changes);

    			set_attributes(div1, div1_data = get_spread_update(div1_levels, [
    				(!current || dirty[0] & /*className, required, disabled, variant, withLeadingIcon, noLabel, label, invalid, internalClasses*/ 67119050 | dirty[1] & /*$$slots, menuOpen*/ 2097154 && div1_class_value !== (div1_class_value = classMap({
    					[/*className*/ ctx[3]]: true,
    					'mdc-select': true,
    					'mdc-select--required': /*required*/ ctx[10],
    					'mdc-select--disabled': /*disabled*/ ctx[6],
    					'mdc-select--filled': /*variant*/ ctx[7] === 'filled',
    					'mdc-select--outlined': /*variant*/ ctx[7] === 'outlined',
    					'smui-select--standard': /*variant*/ ctx[7] === 'standard',
    					'mdc-select--with-leading-icon': /*isUninitializedValue*/ ctx[45](/*withLeadingIcon*/ ctx[13])
    					? /*$$slots*/ ctx[52].leadingIcon
    					: /*withLeadingIcon*/ ctx[13],
    					'mdc-select--no-label': /*noLabel*/ ctx[8] || /*label*/ ctx[9] == null && !/*$$slots*/ ctx[52].label,
    					'mdc-select--invalid': /*invalid*/ ctx[1],
    					'mdc-select--activated': /*menuOpen*/ ctx[32],
    					'mdc-data-table__pagination-rows-per-page-select': /*context*/ ctx[46] === 'data-table:pagination',
    					.../*internalClasses*/ ctx[26]
    				}))) && { class: div1_class_value },
    				(!current || dirty[0] & /*internalStyles, style*/ 134217744 && div1_style_value !== (div1_style_value = Object.entries(/*internalStyles*/ ctx[27]).map(func).concat([/*style*/ ctx[4]]).join(' '))) && { style: div1_style_value },
    				dirty[1] & /*$$restProps*/ 4194304 && exclude(/*$$restProps*/ ctx[53], [
    					'input$',
    					'anchor$',
    					'label$',
    					'outline$',
    					'selectedTextContainer$',
    					'selectedText$',
    					'dropdownIcon$',
    					'ripple$',
    					'menu$',
    					'list$',
    					'helperText$'
    				])
    			]));

    			if (Ripple_action && is_function(Ripple_action.update) && dirty[0] & /*variant*/ 128) Ripple_action.update.call(null, {
    				ripple: /*variant*/ ctx[7] === 'filled',
    				unbounded: false,
    				addClass: /*addClass*/ ctx[49],
    				removeClass: /*removeClass*/ ctx[50],
    				addStyle: /*addStyle*/ ctx[51]
    			});

    			if (useActions_action_4 && is_function(useActions_action_4.update) && dirty[0] & /*use*/ 4) useActions_action_4.update.call(null, /*use*/ ctx[2]);

    			if (/*$$slots*/ ctx[52].helperText) {
    				if (if_block5) {
    					if_block5.p(ctx, dirty);

    					if (dirty[1] & /*$$slots*/ 2097152) {
    						transition_in(if_block5, 1);
    					}
    				} else {
    					if_block5 = create_if_block$1(ctx);
    					if_block5.c();
    					transition_in(if_block5, 1);
    					if_block5.m(if_block5_anchor.parentNode, if_block5_anchor);
    				}
    			} else if (if_block5) {
    				group_outros();

    				transition_out(if_block5, 1, 1, () => {
    					if_block5 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block2);
    			transition_in(if_block3);
    			transition_in(leadingIcon_slot, local);
    			transition_in(if_block4);
    			transition_in(menu.$$.fragment, local);
    			transition_in(if_block5);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block2);
    			transition_out(if_block3);
    			transition_out(leadingIcon_slot, local);
    			transition_out(if_block4);
    			transition_out(menu.$$.fragment, local);
    			transition_out(if_block5);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			if (leadingIcon_slot) leadingIcon_slot.d(detaching);
    			/*span0_binding*/ ctx[69](null);
    			if (if_block4) if_block4.d();
    			/*div0_binding*/ ctx[71](null);
    			destroy_component(menu);
    			/*div1_binding*/ ctx[83](null);
    			if (detaching) detach_dev(t9);
    			if (if_block5) if_block5.d(detaching);
    			if (detaching) detach_dev(if_block5_anchor);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }
    let counter = 0;

    function getNormalizedXCoordinate(evt) {
    	const targetClientRect = evt.currentTarget.getBoundingClientRect();
    	const xCoordinate = isTouchEvent(evt) ? evt.touches[0].clientX : evt.clientX;
    	return xCoordinate - targetClientRect.left;
    }

    function isTouchEvent(evt) {
    	return 'touches' in evt;
    }

    const func = ([name, value]) => `${name}: ${value};`;

    function instance_1($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"use","class","style","ripple","disabled","variant","noLabel","label","value","key","dirty","invalid","updateInvalid","required","inputId","hiddenInput","withLeadingIcon","anchor$use","anchor$class","selectedTextContainer$use","selectedTextContainer$class","selectedText$use","selectedText$class","dropdownIcon$use","dropdownIcon$class","menu$class","getUseDefaultValidation","setUseDefaultValidation","focus","layout","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $selectedTextStore;
    	let $valueStore;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Select', slots, ['label','leadingIcon','default','helperText']);
    	const $$slots = compute_slots(slots);
    	const forwardEvents = forwardEventsBuilder(get_current_component());

    	let uninitializedValue = () => {
    		
    	};

    	function isUninitializedValue(value) {
    		return value === uninitializedValue;
    	}

    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { style = '' } = $$props;
    	let { ripple = true } = $$props;
    	let { disabled = false } = $$props;
    	let { variant = 'standard' } = $$props;
    	let { noLabel = false } = $$props;
    	let { label = undefined } = $$props;
    	let { value = '' } = $$props;
    	let { key = item => item } = $$props;
    	let { dirty = false } = $$props;
    	let { invalid = uninitializedValue } = $$props;
    	let { updateInvalid = isUninitializedValue(invalid) } = $$props;
    	const useDefaultValidation = isUninitializedValue(invalid);

    	if (isUninitializedValue(invalid)) {
    		invalid = false;
    	}

    	let { required = false } = $$props;
    	let { inputId = 'SMUI-select-' + counter++ } = $$props;
    	let { hiddenInput = false } = $$props;
    	let { withLeadingIcon = uninitializedValue } = $$props;
    	let { anchor$use = [] } = $$props;
    	let { anchor$class = '' } = $$props;
    	let { selectedTextContainer$use = [] } = $$props;
    	let { selectedTextContainer$class = '' } = $$props;
    	let { selectedText$use = [] } = $$props;
    	let { selectedText$class = '' } = $$props;
    	let { dropdownIcon$use = [] } = $$props;
    	let { dropdownIcon$class = '' } = $$props;
    	let { menu$class = '' } = $$props;
    	let element;
    	let instance;
    	let internalClasses = {};
    	let internalStyles = {};
    	let selectAnchor;
    	let selectAnchorAttrs = {};
    	let selectText;
    	let selectedIndex = -1;
    	let helperId = undefined;
    	let addLayoutListener = getContext('SMUI:addLayoutListener');
    	let removeLayoutListener;
    	let menuOpen = false;
    	let menuClasses = {};
    	let anchorElement = undefined;
    	let anchorCorner = undefined;
    	let wrapFocus = false;
    	let list;
    	let context = getContext('SMUI:select:context');

    	// These are instances, not accessors.
    	let leadingIcon = undefined;

    	let helperText = undefined;

    	// Components
    	let floatingLabel = undefined;

    	let lineRipple = undefined;
    	let notchedOutline = undefined;
    	setContext('SMUI:list:role', '');
    	setContext('SMUI:list:nav', false);

    	// Only needed on initialization.
    	const selectedTextStore = writable('');

    	validate_store(selectedTextStore, 'selectedTextStore');
    	component_subscribe($$self, selectedTextStore, value => $$invalidate(43, $selectedTextStore = value));
    	setContext('SMUI:select:selectedText', selectedTextStore);
    	const valueStore = writable(value);
    	validate_store(valueStore, 'valueStore');
    	component_subscribe($$self, valueStore, value => $$invalidate(91, $valueStore = value));
    	setContext('SMUI:select:value', valueStore);
    	let previousSelectedIndex = selectedIndex;

    	if (addLayoutListener) {
    		removeLayoutListener = addLayoutListener(layout);
    	}

    	onMount(() => {
    		$$invalidate(23, instance = new MDCSelectFoundation({
    				// getSelectAdapterMethods
    				// getMenuItemAttr: (menuItem: Element, attr: string) =>
    				//   menuItem.getAttribute(attr),
    				setSelectedText: text => {
    					set_store_value(selectedTextStore, $selectedTextStore = text, $selectedTextStore);
    				},
    				isSelectAnchorFocused: () => document.activeElement === selectAnchor,
    				getSelectAnchorAttr,
    				setSelectAnchorAttr: addSelectAnchorAttr,
    				removeSelectAnchorAttr,
    				addMenuClass,
    				removeMenuClass,
    				openMenu: () => {
    					$$invalidate(32, menuOpen = true);
    				},
    				closeMenu: () => {
    					$$invalidate(32, menuOpen = false);
    				},
    				getAnchorElement: () => selectAnchor,
    				setMenuAnchorElement: value => {
    					$$invalidate(34, anchorElement = value);
    				},
    				setMenuAnchorCorner: value => {
    					$$invalidate(35, anchorCorner = value);
    				},
    				setMenuWrapFocus: value => {
    					$$invalidate(36, wrapFocus = value);
    				},
    				getSelectedIndex: () => selectedIndex,
    				setSelectedIndex: index => {
    					// Don't update the instance again.
    					$$invalidate(62, previousSelectedIndex = index);

    					$$invalidate(24, selectedIndex = index);
    					$$invalidate(0, value = getMenuItemValues()[selectedIndex]);
    				},
    				focusMenuItemAtIndex: index => {
    					list.focusItemAtIndex(index);
    				},
    				getMenuItemCount: () => list.items.length,
    				getMenuItemValues: () => getMenuItemValues().map(key),
    				getMenuItemTextAtIndex: index => list.getPrimaryTextAtIndex(index),
    				isTypeaheadInProgress: () => list.typeaheadInProgress,
    				typeaheadMatchItem: (nextChar, startingIndex) => list.typeaheadMatchItem(nextChar, startingIndex),
    				// getCommonAdapterMethods
    				addClass,
    				removeClass,
    				hasClass,
    				setRippleCenter: normalizedX => lineRipple && lineRipple.setRippleCenter(normalizedX),
    				activateBottomLine: () => lineRipple && lineRipple.activate(),
    				deactivateBottomLine: () => lineRipple && lineRipple.deactivate(),
    				notifyChange: _selectedValue => {
    					$$invalidate(54, dirty = true);

    					if (updateInvalid) {
    						$$invalidate(1, invalid = !instance.isValid());
    					}

    					dispatch(getElement(), 'SMUISelect:change', { value, index: selectedIndex }, undefined, true);
    				},
    				// getOutlineAdapterMethods
    				hasOutline: () => !!notchedOutline,
    				notchOutline: labelWidth => notchedOutline && notchedOutline.notch(labelWidth),
    				closeOutline: () => notchedOutline && notchedOutline.closeNotch(),
    				// getLabelAdapterMethods
    				hasLabel: () => !!floatingLabel,
    				floatLabel: shouldFloat => floatingLabel && floatingLabel.float(shouldFloat),
    				getLabelWidth: () => floatingLabel ? floatingLabel.getWidth() : 0,
    				setLabelRequired: isRequired => floatingLabel && floatingLabel.setRequired(isRequired)
    			},
    		{
    				get helperText() {
    					return helperText;
    				},
    				get leadingIcon() {
    					return leadingIcon;
    				}
    			}));

    		$$invalidate(24, selectedIndex = getMenuItemValues().indexOf(value));
    		instance.init();
    		setUseDefaultValidation(useDefaultValidation);

    		return () => {
    			instance.destroy();
    		};
    	});

    	onDestroy(() => {
    		if (removeLayoutListener) {
    			removeLayoutListener();
    		}
    	});

    	function hasClass(className) {
    		return className in internalClasses
    		? internalClasses[className]
    		: getElement().classList.contains(className);
    	}

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(26, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(26, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function addStyle(name, value) {
    		if (internalStyles[name] != value) {
    			if (value === '' || value == null) {
    				delete internalStyles[name];
    				$$invalidate(27, internalStyles);
    			} else {
    				$$invalidate(27, internalStyles[name] = value, internalStyles);
    			}
    		}
    	}

    	function addMenuClass(className) {
    		if (!menuClasses[className]) {
    			$$invalidate(33, menuClasses[className] = true, menuClasses);
    		}
    	}

    	function removeMenuClass(className) {
    		if (!(className in menuClasses) || menuClasses[className]) {
    			$$invalidate(33, menuClasses[className] = false, menuClasses);
    		}
    	}

    	function getSelectAnchorAttr(name) {
    		var _a;

    		return name in selectAnchorAttrs
    		? (_a = selectAnchorAttrs[name]) !== null && _a !== void 0
    			? _a
    			: null
    		: getElement().getAttribute(name);
    	}

    	function addSelectAnchorAttr(name, value) {
    		if (selectAnchorAttrs[name] !== value) {
    			$$invalidate(29, selectAnchorAttrs[name] = value, selectAnchorAttrs);
    		}
    	}

    	function removeSelectAnchorAttr(name) {
    		if (!(name in selectAnchorAttrs) || selectAnchorAttrs[name] != null) {
    			$$invalidate(29, selectAnchorAttrs[name] = undefined, selectAnchorAttrs);
    		}
    	}

    	function getMenuItemValues() {
    		return list.getOrderedList().map(accessor => accessor.getValue());
    	}

    	function getUseDefaultValidation() {
    		return instance.getUseDefaultValidation();
    	}

    	function setUseDefaultValidation(useDefaultValidation) {
    		instance.setUseDefaultValidation(useDefaultValidation);
    	}

    	function focus() {
    		selectAnchor.focus();
    	}

    	function layout() {
    		instance.layout();
    	}

    	function getElement() {
    		return element;
    	}

    	function focus_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function floatinglabel_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			floatingLabel = $$value;
    			$$invalidate(40, floatingLabel);
    		});
    	}

    	function floatinglabel_binding_1($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			floatingLabel = $$value;
    			$$invalidate(40, floatingLabel);
    		});
    	}

    	function notchedoutline_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			notchedOutline = $$value;
    			$$invalidate(42, notchedOutline);
    		});
    	}

    	function span0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			selectText = $$value;
    			$$invalidate(30, selectText);
    		});
    	}

    	function lineripple_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			lineRipple = $$value;
    			$$invalidate(41, lineRipple);
    		});
    	}

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			selectAnchor = $$value;
    			$$invalidate(28, selectAnchor);
    		});
    	}

    	const focus_handler_1 = () => instance && instance.handleFocus();
    	const blur_handler_1 = () => instance && instance.handleBlur();

    	const click_handler = event => {
    		selectAnchor.focus();

    		if (instance) {
    			instance.handleClick(getNormalizedXCoordinate(event));
    		}
    	};

    	const keydown_handler = event => instance && instance.handleKeydown(event);

    	function list_1_selectedIndex_binding(value) {
    		selectedIndex = value;
    		$$invalidate(24, selectedIndex);
    	}

    	const SMUIList_mount_handler = event => $$invalidate(37, list = event.detail);

    	function menu_open_binding(value) {
    		menuOpen = value;
    		$$invalidate(32, menuOpen);
    	}

    	const SMUIMenu_selected_handler = event => instance && instance.handleMenuItemAction(event.detail.index);
    	const SMUIMenuSurface_closing_handler = () => instance && instance.handleMenuClosing();
    	const SMUIMenuSurface_closed_handler = () => instance && instance.handleMenuClosed();
    	const SMUIMenuSurface_opened_handler = () => instance && instance.handleMenuOpened();

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(25, element);
    		});
    	}

    	const SMUISelectLeadingIcon_mount_handler = event => $$invalidate(38, leadingIcon = event.detail);
    	const SMUISelectLeadingIcon_unmount_handler = () => $$invalidate(38, leadingIcon = undefined);
    	const SMUISelectHelperText_id_handler = event => $$invalidate(31, helperId = event.detail);
    	const SMUISelectHelperText_mount_handler = event => $$invalidate(39, helperText = event.detail);

    	const SMUISelectHelperText_unmount_handler = () => {
    		$$invalidate(31, helperId = undefined);
    		$$invalidate(39, helperText = undefined);
    	};

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(53, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(2, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('style' in $$new_props) $$invalidate(4, style = $$new_props.style);
    		if ('ripple' in $$new_props) $$invalidate(5, ripple = $$new_props.ripple);
    		if ('disabled' in $$new_props) $$invalidate(6, disabled = $$new_props.disabled);
    		if ('variant' in $$new_props) $$invalidate(7, variant = $$new_props.variant);
    		if ('noLabel' in $$new_props) $$invalidate(8, noLabel = $$new_props.noLabel);
    		if ('label' in $$new_props) $$invalidate(9, label = $$new_props.label);
    		if ('value' in $$new_props) $$invalidate(0, value = $$new_props.value);
    		if ('key' in $$new_props) $$invalidate(55, key = $$new_props.key);
    		if ('dirty' in $$new_props) $$invalidate(54, dirty = $$new_props.dirty);
    		if ('invalid' in $$new_props) $$invalidate(1, invalid = $$new_props.invalid);
    		if ('updateInvalid' in $$new_props) $$invalidate(56, updateInvalid = $$new_props.updateInvalid);
    		if ('required' in $$new_props) $$invalidate(10, required = $$new_props.required);
    		if ('inputId' in $$new_props) $$invalidate(11, inputId = $$new_props.inputId);
    		if ('hiddenInput' in $$new_props) $$invalidate(12, hiddenInput = $$new_props.hiddenInput);
    		if ('withLeadingIcon' in $$new_props) $$invalidate(13, withLeadingIcon = $$new_props.withLeadingIcon);
    		if ('anchor$use' in $$new_props) $$invalidate(14, anchor$use = $$new_props.anchor$use);
    		if ('anchor$class' in $$new_props) $$invalidate(15, anchor$class = $$new_props.anchor$class);
    		if ('selectedTextContainer$use' in $$new_props) $$invalidate(16, selectedTextContainer$use = $$new_props.selectedTextContainer$use);
    		if ('selectedTextContainer$class' in $$new_props) $$invalidate(17, selectedTextContainer$class = $$new_props.selectedTextContainer$class);
    		if ('selectedText$use' in $$new_props) $$invalidate(18, selectedText$use = $$new_props.selectedText$use);
    		if ('selectedText$class' in $$new_props) $$invalidate(19, selectedText$class = $$new_props.selectedText$class);
    		if ('dropdownIcon$use' in $$new_props) $$invalidate(20, dropdownIcon$use = $$new_props.dropdownIcon$use);
    		if ('dropdownIcon$class' in $$new_props) $$invalidate(21, dropdownIcon$class = $$new_props.dropdownIcon$class);
    		if ('menu$class' in $$new_props) $$invalidate(22, menu$class = $$new_props.menu$class);
    		if ('$$scope' in $$new_props) $$invalidate(89, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		counter,
    		MDCSelectFoundation,
    		onMount,
    		onDestroy,
    		getContext,
    		setContext,
    		writable,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		exclude,
    		prefixFilter,
    		useActions,
    		dispatch,
    		Ripple,
    		Anchor,
    		Menu,
    		List,
    		FloatingLabel,
    		LineRipple,
    		NotchedOutline,
    		HelperText,
    		forwardEvents,
    		uninitializedValue,
    		isUninitializedValue,
    		use,
    		className,
    		style,
    		ripple,
    		disabled,
    		variant,
    		noLabel,
    		label,
    		value,
    		key,
    		dirty,
    		invalid,
    		updateInvalid,
    		useDefaultValidation,
    		required,
    		inputId,
    		hiddenInput,
    		withLeadingIcon,
    		anchor$use,
    		anchor$class,
    		selectedTextContainer$use,
    		selectedTextContainer$class,
    		selectedText$use,
    		selectedText$class,
    		dropdownIcon$use,
    		dropdownIcon$class,
    		menu$class,
    		element,
    		instance,
    		internalClasses,
    		internalStyles,
    		selectAnchor,
    		selectAnchorAttrs,
    		selectText,
    		selectedIndex,
    		helperId,
    		addLayoutListener,
    		removeLayoutListener,
    		menuOpen,
    		menuClasses,
    		anchorElement,
    		anchorCorner,
    		wrapFocus,
    		list,
    		context,
    		leadingIcon,
    		helperText,
    		floatingLabel,
    		lineRipple,
    		notchedOutline,
    		selectedTextStore,
    		valueStore,
    		previousSelectedIndex,
    		hasClass,
    		addClass,
    		removeClass,
    		addStyle,
    		addMenuClass,
    		removeMenuClass,
    		getSelectAnchorAttr,
    		addSelectAnchorAttr,
    		removeSelectAnchorAttr,
    		getMenuItemValues,
    		getNormalizedXCoordinate,
    		isTouchEvent,
    		getUseDefaultValidation,
    		setUseDefaultValidation,
    		focus,
    		layout,
    		getElement,
    		$selectedTextStore,
    		$valueStore
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('uninitializedValue' in $$props) uninitializedValue = $$new_props.uninitializedValue;
    		if ('use' in $$props) $$invalidate(2, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('style' in $$props) $$invalidate(4, style = $$new_props.style);
    		if ('ripple' in $$props) $$invalidate(5, ripple = $$new_props.ripple);
    		if ('disabled' in $$props) $$invalidate(6, disabled = $$new_props.disabled);
    		if ('variant' in $$props) $$invalidate(7, variant = $$new_props.variant);
    		if ('noLabel' in $$props) $$invalidate(8, noLabel = $$new_props.noLabel);
    		if ('label' in $$props) $$invalidate(9, label = $$new_props.label);
    		if ('value' in $$props) $$invalidate(0, value = $$new_props.value);
    		if ('key' in $$props) $$invalidate(55, key = $$new_props.key);
    		if ('dirty' in $$props) $$invalidate(54, dirty = $$new_props.dirty);
    		if ('invalid' in $$props) $$invalidate(1, invalid = $$new_props.invalid);
    		if ('updateInvalid' in $$props) $$invalidate(56, updateInvalid = $$new_props.updateInvalid);
    		if ('required' in $$props) $$invalidate(10, required = $$new_props.required);
    		if ('inputId' in $$props) $$invalidate(11, inputId = $$new_props.inputId);
    		if ('hiddenInput' in $$props) $$invalidate(12, hiddenInput = $$new_props.hiddenInput);
    		if ('withLeadingIcon' in $$props) $$invalidate(13, withLeadingIcon = $$new_props.withLeadingIcon);
    		if ('anchor$use' in $$props) $$invalidate(14, anchor$use = $$new_props.anchor$use);
    		if ('anchor$class' in $$props) $$invalidate(15, anchor$class = $$new_props.anchor$class);
    		if ('selectedTextContainer$use' in $$props) $$invalidate(16, selectedTextContainer$use = $$new_props.selectedTextContainer$use);
    		if ('selectedTextContainer$class' in $$props) $$invalidate(17, selectedTextContainer$class = $$new_props.selectedTextContainer$class);
    		if ('selectedText$use' in $$props) $$invalidate(18, selectedText$use = $$new_props.selectedText$use);
    		if ('selectedText$class' in $$props) $$invalidate(19, selectedText$class = $$new_props.selectedText$class);
    		if ('dropdownIcon$use' in $$props) $$invalidate(20, dropdownIcon$use = $$new_props.dropdownIcon$use);
    		if ('dropdownIcon$class' in $$props) $$invalidate(21, dropdownIcon$class = $$new_props.dropdownIcon$class);
    		if ('menu$class' in $$props) $$invalidate(22, menu$class = $$new_props.menu$class);
    		if ('element' in $$props) $$invalidate(25, element = $$new_props.element);
    		if ('instance' in $$props) $$invalidate(23, instance = $$new_props.instance);
    		if ('internalClasses' in $$props) $$invalidate(26, internalClasses = $$new_props.internalClasses);
    		if ('internalStyles' in $$props) $$invalidate(27, internalStyles = $$new_props.internalStyles);
    		if ('selectAnchor' in $$props) $$invalidate(28, selectAnchor = $$new_props.selectAnchor);
    		if ('selectAnchorAttrs' in $$props) $$invalidate(29, selectAnchorAttrs = $$new_props.selectAnchorAttrs);
    		if ('selectText' in $$props) $$invalidate(30, selectText = $$new_props.selectText);
    		if ('selectedIndex' in $$props) $$invalidate(24, selectedIndex = $$new_props.selectedIndex);
    		if ('helperId' in $$props) $$invalidate(31, helperId = $$new_props.helperId);
    		if ('addLayoutListener' in $$props) addLayoutListener = $$new_props.addLayoutListener;
    		if ('removeLayoutListener' in $$props) removeLayoutListener = $$new_props.removeLayoutListener;
    		if ('menuOpen' in $$props) $$invalidate(32, menuOpen = $$new_props.menuOpen);
    		if ('menuClasses' in $$props) $$invalidate(33, menuClasses = $$new_props.menuClasses);
    		if ('anchorElement' in $$props) $$invalidate(34, anchorElement = $$new_props.anchorElement);
    		if ('anchorCorner' in $$props) $$invalidate(35, anchorCorner = $$new_props.anchorCorner);
    		if ('wrapFocus' in $$props) $$invalidate(36, wrapFocus = $$new_props.wrapFocus);
    		if ('list' in $$props) $$invalidate(37, list = $$new_props.list);
    		if ('context' in $$props) $$invalidate(46, context = $$new_props.context);
    		if ('leadingIcon' in $$props) $$invalidate(38, leadingIcon = $$new_props.leadingIcon);
    		if ('helperText' in $$props) $$invalidate(39, helperText = $$new_props.helperText);
    		if ('floatingLabel' in $$props) $$invalidate(40, floatingLabel = $$new_props.floatingLabel);
    		if ('lineRipple' in $$props) $$invalidate(41, lineRipple = $$new_props.lineRipple);
    		if ('notchedOutline' in $$props) $$invalidate(42, notchedOutline = $$new_props.notchedOutline);
    		if ('previousSelectedIndex' in $$props) $$invalidate(62, previousSelectedIndex = $$new_props.previousSelectedIndex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*selectedIndex, instance, value*/ 25165825 | $$self.$$.dirty[2] & /*previousSelectedIndex*/ 1) {
    			if (previousSelectedIndex !== selectedIndex) {
    				$$invalidate(62, previousSelectedIndex = selectedIndex);

    				if (instance) {
    					instance.setSelectedIndex(
    						selectedIndex,
    						/* closeMenu */
    						false,
    						/* skipNotify */
    						true
    					);
    				} else {
    					const values = getMenuItemValues();

    					if (value !== values[selectedIndex]) {
    						$$invalidate(0, value = values[selectedIndex]);
    					}
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*value*/ 1) {
    			set_store_value(valueStore, $valueStore = value, $valueStore);
    		}

    		if ($$self.$$.dirty[0] & /*instance, value*/ 8388609 | $$self.$$.dirty[1] & /*key*/ 16777216) {
    			if (instance && instance.getValue() !== key(value)) {
    				instance.setValue(key(value));
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, disabled*/ 8388672) {
    			if (instance && instance.getDisabled() !== disabled) {
    				instance.setDisabled(disabled);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, invalid*/ 8388610 | $$self.$$.dirty[1] & /*dirty, updateInvalid*/ 41943040) {
    			if (instance && dirty && instance.isValid() !== !invalid) {
    				if (updateInvalid) {
    					$$invalidate(1, invalid = !instance.isValid());
    				} else {
    					instance.setValid(!invalid);
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*instance, required*/ 8389632) {
    			if (instance && instance.getRequired() !== required) {
    				instance.setRequired(required);
    			}
    		}
    	};

    	return [
    		value,
    		invalid,
    		use,
    		className,
    		style,
    		ripple,
    		disabled,
    		variant,
    		noLabel,
    		label,
    		required,
    		inputId,
    		hiddenInput,
    		withLeadingIcon,
    		anchor$use,
    		anchor$class,
    		selectedTextContainer$use,
    		selectedTextContainer$class,
    		selectedText$use,
    		selectedText$class,
    		dropdownIcon$use,
    		dropdownIcon$class,
    		menu$class,
    		instance,
    		selectedIndex,
    		element,
    		internalClasses,
    		internalStyles,
    		selectAnchor,
    		selectAnchorAttrs,
    		selectText,
    		helperId,
    		menuOpen,
    		menuClasses,
    		anchorElement,
    		anchorCorner,
    		wrapFocus,
    		list,
    		leadingIcon,
    		helperText,
    		floatingLabel,
    		lineRipple,
    		notchedOutline,
    		$selectedTextStore,
    		forwardEvents,
    		isUninitializedValue,
    		context,
    		selectedTextStore,
    		valueStore,
    		addClass,
    		removeClass,
    		addStyle,
    		$$slots,
    		$$restProps,
    		dirty,
    		key,
    		updateInvalid,
    		getUseDefaultValidation,
    		setUseDefaultValidation,
    		focus,
    		layout,
    		getElement,
    		previousSelectedIndex,
    		slots,
    		focus_handler,
    		blur_handler,
    		floatinglabel_binding,
    		floatinglabel_binding_1,
    		notchedoutline_binding,
    		span0_binding,
    		lineripple_binding,
    		div0_binding,
    		focus_handler_1,
    		blur_handler_1,
    		click_handler,
    		keydown_handler,
    		list_1_selectedIndex_binding,
    		SMUIList_mount_handler,
    		menu_open_binding,
    		SMUIMenu_selected_handler,
    		SMUIMenuSurface_closing_handler,
    		SMUIMenuSurface_closed_handler,
    		SMUIMenuSurface_opened_handler,
    		div1_binding,
    		SMUISelectLeadingIcon_mount_handler,
    		SMUISelectLeadingIcon_unmount_handler,
    		SMUISelectHelperText_id_handler,
    		SMUISelectHelperText_mount_handler,
    		SMUISelectHelperText_unmount_handler,
    		$$scope
    	];
    }

    class Select extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance_1,
    			create_fragment$4,
    			safe_not_equal,
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
    				getElement: 61
    			},
    			null,
    			[-1, -1, -1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Select",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get use() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ripple() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ripple(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get variant() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set variant(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noLabel() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noLabel(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get key() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dirty() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dirty(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get updateInvalid() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set updateInvalid(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inputId() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inputId(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hiddenInput() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hiddenInput(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get withLeadingIcon() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set withLeadingIcon(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get anchor$use() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set anchor$use(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get anchor$class() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set anchor$class(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selectedTextContainer$use() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selectedTextContainer$use(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selectedTextContainer$class() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selectedTextContainer$class(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selectedText$use() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selectedText$use(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selectedText$class() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selectedText$class(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dropdownIcon$use() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dropdownIcon$use(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dropdownIcon$class() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dropdownIcon$class(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get menu$class() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set menu$class(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getUseDefaultValidation() {
    		return this.$$.ctx[57];
    	}

    	set getUseDefaultValidation(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setUseDefaultValidation() {
    		return this.$$.ctx[58];
    	}

    	set setUseDefaultValidation(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get focus() {
    		return this.$$.ctx[59];
    	}

    	set focus(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get layout() {
    		return this.$$.ctx[60];
    	}

    	set layout(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[61];
    	}

    	set getElement(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@smui/select/dist/Option.svelte generated by Svelte v3.49.0 */

    // (1:0) <Item   bind:this={element}   use={usePass}   data-value={value}   {value}   {selected}   {...$$restProps}>
    function create_default_slot$2(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8192)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[13],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[13])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[13], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(1:0) <Item   bind:this={element}   use={usePass}   data-value={value}   {value}   {selected}   {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let item;
    	let current;

    	const item_spread_levels = [
    		{ use: /*usePass*/ ctx[3] },
    		{ "data-value": /*value*/ ctx[0] },
    		{ value: /*value*/ ctx[0] },
    		{ selected: /*selected*/ ctx[2] },
    		/*$$restProps*/ ctx[6]
    	];

    	let item_props = {
    		$$slots: { default: [create_default_slot$2] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < item_spread_levels.length; i += 1) {
    		item_props = assign(item_props, item_spread_levels[i]);
    	}

    	item = new Item({ props: item_props, $$inline: true });
    	/*item_binding*/ ctx[12](item);

    	const block = {
    		c: function create() {
    			create_component(item.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(item, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const item_changes = (dirty & /*usePass, value, selected, $$restProps*/ 77)
    			? get_spread_update(item_spread_levels, [
    					dirty & /*usePass*/ 8 && { use: /*usePass*/ ctx[3] },
    					dirty & /*value*/ 1 && { "data-value": /*value*/ ctx[0] },
    					dirty & /*value*/ 1 && { value: /*value*/ ctx[0] },
    					dirty & /*selected*/ 4 && { selected: /*selected*/ ctx[2] },
    					dirty & /*$$restProps*/ 64 && get_spread_object(/*$$restProps*/ ctx[6])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 8192) {
    				item_changes.$$scope = { dirty, ctx };
    			}

    			item.$set(item_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(item.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(item.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*item_binding*/ ctx[12](null);
    			destroy_component(item, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let usePass;
    	let selected;
    	const omit_props_names = ["use","class","value","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $selectedText;
    	let $selectedValue;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Option', slots, ['default']);
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	const className = '';
    	let { value = '' } = $$props;
    	let element;
    	const selectedText = getContext('SMUI:select:selectedText');
    	validate_store(selectedText, 'selectedText');
    	component_subscribe($$self, selectedText, value => $$invalidate(14, $selectedText = value));
    	const selectedValue = getContext('SMUI:select:value');
    	validate_store(selectedValue, 'selectedValue');
    	component_subscribe($$self, selectedValue, value => $$invalidate(10, $selectedValue = value));
    	setContext('SMUI:list:item:role', 'option');
    	onMount(setSelectedText);
    	onDestroy(setSelectedText);

    	function setSelectedText() {
    		if (selected && element) {
    			set_store_value(selectedText, $selectedText = element.getPrimaryText(), $selectedText);
    		}
    	}

    	function getElement() {
    		return element.getElement();
    	}

    	function item_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(1, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(7, use = $$new_props.use);
    		if ('value' in $$new_props) $$invalidate(0, value = $$new_props.value);
    		if ('$$scope' in $$new_props) $$invalidate(13, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		getContext,
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		Item,
    		forwardEvents,
    		use,
    		className,
    		value,
    		element,
    		selectedText,
    		selectedValue,
    		setSelectedText,
    		getElement,
    		selected,
    		usePass,
    		$selectedText,
    		$selectedValue
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(7, use = $$new_props.use);
    		if ('value' in $$props) $$invalidate(0, value = $$new_props.value);
    		if ('element' in $$props) $$invalidate(1, element = $$new_props.element);
    		if ('selected' in $$props) $$invalidate(2, selected = $$new_props.selected);
    		if ('usePass' in $$props) $$invalidate(3, usePass = $$new_props.usePass);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*use*/ 128) {
    			$$invalidate(3, usePass = [forwardEvents, ...use]);
    		}

    		if ($$self.$$.dirty & /*value, $selectedValue*/ 1025) {
    			$$invalidate(2, selected = value != null && value !== '' && $selectedValue === value);
    		}
    	};

    	return [
    		value,
    		element,
    		selected,
    		usePass,
    		selectedText,
    		selectedValue,
    		$$restProps,
    		use,
    		className,
    		getElement,
    		$selectedValue,
    		slots,
    		item_binding,
    		$$scope
    	];
    }

    class Option$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			use: 7,
    			class: 8,
    			value: 0,
    			getElement: 9
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Option",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get use() {
    		throw new Error("<Option>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Option>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		return this.$$.ctx[8];
    	}

    	set class(value) {
    		throw new Error("<Option>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Option>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Option>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[9];
    	}

    	set getElement(value) {
    		throw new Error("<Option>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const Option = Option$1;

    /* src/TaxonomyFilterTree.svelte generated by Svelte v3.49.0 */

    const { console: console_1 } = globals;
    const file$2 = "src/TaxonomyFilterTree.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	return child_ctx;
    }

    // (64:2) {:else}
    function create_else_block(ctx) {
    	let formfield;
    	let current;

    	formfield = new FormField({
    			props: {
    				$$slots: {
    					label: [create_label_slot],
    					default: [create_default_slot_5$1]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formfield.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formfield, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formfield_changes = {};

    			if (dirty & /*$$scope, checked*/ 1048580) {
    				formfield_changes.$$scope = { dirty, ctx };
    			}

    			formfield.$set(formfield_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formfield.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formfield.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formfield, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(64:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (55:38) 
    function create_if_block_4(ctx) {
    	let formfield;
    	let current;

    	formfield = new FormField({
    			props: {
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formfield.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formfield, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formfield_changes = {};

    			if (dirty & /*$$scope, value, checked*/ 1048588) {
    				formfield_changes.$$scope = { dirty, ctx };
    			}

    			formfield.$set(formfield_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formfield.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formfield.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formfield, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(55:38) ",
    		ctx
    	});

    	return block;
    }

    // (50:41) 
    function create_if_block_3(ctx) {
    	let formfield;
    	let current;

    	formfield = new FormField({
    			props: {
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formfield.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formfield, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formfield_changes = {};

    			if (dirty & /*$$scope, value, checked*/ 1048588) {
    				formfield_changes.$$scope = { dirty, ctx };
    			}

    			formfield.$set(formfield_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formfield.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formfield.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formfield, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(50:41) ",
    		ctx
    	});

    	return block;
    }

    // (45:2) {#if tree.type === 'TextField'}
    function create_if_block_2(ctx) {
    	let formfield;
    	let current;

    	formfield = new FormField({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formfield.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formfield, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formfield_changes = {};

    			if (dirty & /*$$scope, value, checked*/ 1048588) {
    				formfield_changes.$$scope = { dirty, ctx };
    			}

    			formfield.$set(formfield_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formfield.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formfield.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formfield, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(45:2) {#if tree.type === 'TextField'}",
    		ctx
    	});

    	return block;
    }

    // (65:3) <FormField>
    function create_default_slot_5$1(ctx) {
    	let checkbox;
    	let updating_checked;
    	let current;

    	function checkbox_checked_binding_3(value) {
    		/*checkbox_checked_binding_3*/ ctx[14](value);
    	}

    	let checkbox_props = {
    		indeterminate: /*checked*/ ctx[2] === null
    	};

    	if (/*checked*/ ctx[2] !== void 0) {
    		checkbox_props.checked = /*checked*/ ctx[2];
    	}

    	checkbox = new Checkbox({ props: checkbox_props, $$inline: true });
    	binding_callbacks.push(() => bind(checkbox, 'checked', checkbox_checked_binding_3));

    	const block = {
    		c: function create() {
    			create_component(checkbox.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(checkbox, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const checkbox_changes = {};
    			if (dirty & /*checked*/ 4) checkbox_changes.indeterminate = /*checked*/ ctx[2] === null;

    			if (!updating_checked && dirty & /*checked*/ 4) {
    				updating_checked = true;
    				checkbox_changes.checked = /*checked*/ ctx[2];
    				add_flush_callback(() => updating_checked = false);
    			}

    			checkbox.$set(checkbox_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(checkbox.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(checkbox.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(checkbox, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$1.name,
    		type: "slot",
    		source: "(65:3) <FormField>",
    		ctx
    	});

    	return block;
    }

    // (67:4) 
    function create_label_slot(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = `${/*name*/ ctx[5]}`;
    			attr_dev(span, "slot", "label");
    			add_location(span, file$2, 66, 4, 2069);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_label_slot.name,
    		type: "slot",
    		source: "(67:4) ",
    		ctx
    	});

    	return block;
    }

    // (60:5) <Option value={child.id}>
    function create_default_slot_4$1(ctx) {
    	let t_value = /*child*/ ctx[15].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(60:5) <Option value={child.id}>",
    		ctx
    	});

    	return block;
    }

    // (59:4) {#each children as child}
    function create_each_block_1(ctx) {
    	let option;
    	let current;

    	option = new Option({
    			props: {
    				value: /*child*/ ctx[15].id,
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(option.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(option, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const option_changes = {};

    			if (dirty & /*$$scope*/ 1048576) {
    				option_changes.$$scope = { dirty, ctx };
    			}

    			option.$set(option_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(option.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(option.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(option, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(59:4) {#each children as child}",
    		ctx
    	});

    	return block;
    }

    // (58:4) <Select bind:value label={name}>
    function create_default_slot_3$1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_1 = /*children*/ ctx[6];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*children*/ 64) {
    				each_value_1 = /*children*/ ctx[6];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(58:4) <Select bind:value label={name}>",
    		ctx
    	});

    	return block;
    }

    // (56:3) <FormField>
    function create_default_slot_2$1(ctx) {
    	let checkbox;
    	let updating_checked;
    	let t;
    	let select;
    	let updating_value;
    	let current;

    	function checkbox_checked_binding_2(value) {
    		/*checkbox_checked_binding_2*/ ctx[12](value);
    	}

    	let checkbox_props = {
    		indeterminate: /*checked*/ ctx[2] === null
    	};

    	if (/*checked*/ ctx[2] !== void 0) {
    		checkbox_props.checked = /*checked*/ ctx[2];
    	}

    	checkbox = new Checkbox({ props: checkbox_props, $$inline: true });
    	binding_callbacks.push(() => bind(checkbox, 'checked', checkbox_checked_binding_2));

    	function select_value_binding(value) {
    		/*select_value_binding*/ ctx[13](value);
    	}

    	let select_props = {
    		label: /*name*/ ctx[5],
    		$$slots: { default: [create_default_slot_3$1] },
    		$$scope: { ctx }
    	};

    	if (/*value*/ ctx[3] !== void 0) {
    		select_props.value = /*value*/ ctx[3];
    	}

    	select = new Select({ props: select_props, $$inline: true });
    	binding_callbacks.push(() => bind(select, 'value', select_value_binding));

    	const block = {
    		c: function create() {
    			create_component(checkbox.$$.fragment);
    			t = space();
    			create_component(select.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(checkbox, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(select, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const checkbox_changes = {};
    			if (dirty & /*checked*/ 4) checkbox_changes.indeterminate = /*checked*/ ctx[2] === null;

    			if (!updating_checked && dirty & /*checked*/ 4) {
    				updating_checked = true;
    				checkbox_changes.checked = /*checked*/ ctx[2];
    				add_flush_callback(() => updating_checked = false);
    			}

    			checkbox.$set(checkbox_changes);
    			const select_changes = {};

    			if (dirty & /*$$scope*/ 1048576) {
    				select_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value && dirty & /*value*/ 8) {
    				updating_value = true;
    				select_changes.value = /*value*/ ctx[3];
    				add_flush_callback(() => updating_value = false);
    			}

    			select.$set(select_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(checkbox.$$.fragment, local);
    			transition_in(select.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(checkbox.$$.fragment, local);
    			transition_out(select.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(checkbox, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(select, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(56:3) <FormField>",
    		ctx
    	});

    	return block;
    }

    // (51:3) <FormField>
    function create_default_slot_1$1(ctx) {
    	let checkbox;
    	let updating_checked;
    	let t;
    	let textfield;
    	let updating_value;
    	let current;

    	function checkbox_checked_binding_1(value) {
    		/*checkbox_checked_binding_1*/ ctx[10](value);
    	}

    	let checkbox_props = {
    		indeterminate: /*checked*/ ctx[2] === null
    	};

    	if (/*checked*/ ctx[2] !== void 0) {
    		checkbox_props.checked = /*checked*/ ctx[2];
    	}

    	checkbox = new Checkbox({ props: checkbox_props, $$inline: true });
    	binding_callbacks.push(() => bind(checkbox, 'checked', checkbox_checked_binding_1));

    	function textfield_value_binding_1(value) {
    		/*textfield_value_binding_1*/ ctx[11](value);
    	}

    	let textfield_props = { label: /*name*/ ctx[5], type: "number" };

    	if (/*value*/ ctx[3] !== void 0) {
    		textfield_props.value = /*value*/ ctx[3];
    	}

    	textfield = new Textfield({ props: textfield_props, $$inline: true });
    	binding_callbacks.push(() => bind(textfield, 'value', textfield_value_binding_1));

    	const block = {
    		c: function create() {
    			create_component(checkbox.$$.fragment);
    			t = space();
    			create_component(textfield.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(checkbox, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(textfield, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const checkbox_changes = {};
    			if (dirty & /*checked*/ 4) checkbox_changes.indeterminate = /*checked*/ ctx[2] === null;

    			if (!updating_checked && dirty & /*checked*/ 4) {
    				updating_checked = true;
    				checkbox_changes.checked = /*checked*/ ctx[2];
    				add_flush_callback(() => updating_checked = false);
    			}

    			checkbox.$set(checkbox_changes);
    			const textfield_changes = {};

    			if (!updating_value && dirty & /*value*/ 8) {
    				updating_value = true;
    				textfield_changes.value = /*value*/ ctx[3];
    				add_flush_callback(() => updating_value = false);
    			}

    			textfield.$set(textfield_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(checkbox.$$.fragment, local);
    			transition_in(textfield.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(checkbox.$$.fragment, local);
    			transition_out(textfield.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(checkbox, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(textfield, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(51:3) <FormField>",
    		ctx
    	});

    	return block;
    }

    // (46:3) <FormField>
    function create_default_slot$1(ctx) {
    	let checkbox;
    	let updating_checked;
    	let t;
    	let textfield;
    	let updating_value;
    	let current;

    	function checkbox_checked_binding(value) {
    		/*checkbox_checked_binding*/ ctx[8](value);
    	}

    	let checkbox_props = {
    		indeterminate: /*checked*/ ctx[2] === null
    	};

    	if (/*checked*/ ctx[2] !== void 0) {
    		checkbox_props.checked = /*checked*/ ctx[2];
    	}

    	checkbox = new Checkbox({ props: checkbox_props, $$inline: true });
    	binding_callbacks.push(() => bind(checkbox, 'checked', checkbox_checked_binding));

    	function textfield_value_binding(value) {
    		/*textfield_value_binding*/ ctx[9](value);
    	}

    	let textfield_props = { label: /*name*/ ctx[5] };

    	if (/*value*/ ctx[3] !== void 0) {
    		textfield_props.value = /*value*/ ctx[3];
    	}

    	textfield = new Textfield({ props: textfield_props, $$inline: true });
    	binding_callbacks.push(() => bind(textfield, 'value', textfield_value_binding));

    	const block = {
    		c: function create() {
    			create_component(checkbox.$$.fragment);
    			t = space();
    			create_component(textfield.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(checkbox, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(textfield, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const checkbox_changes = {};
    			if (dirty & /*checked*/ 4) checkbox_changes.indeterminate = /*checked*/ ctx[2] === null;

    			if (!updating_checked && dirty & /*checked*/ 4) {
    				updating_checked = true;
    				checkbox_changes.checked = /*checked*/ ctx[2];
    				add_flush_callback(() => updating_checked = false);
    			}

    			checkbox.$set(checkbox_changes);
    			const textfield_changes = {};

    			if (!updating_value && dirty & /*value*/ 8) {
    				updating_value = true;
    				textfield_changes.value = /*value*/ ctx[3];
    				add_flush_callback(() => updating_value = false);
    			}

    			textfield.$set(textfield_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(checkbox.$$.fragment, local);
    			transition_in(textfield.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(checkbox.$$.fragment, local);
    			transition_out(textfield.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(checkbox, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(textfield, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(46:3) <FormField>",
    		ctx
    	});

    	return block;
    }

    // (74:2) {#if children.length > 0 && tree.type !== 'EnumField'}
    function create_if_block(ctx) {
    	let div;
    	let t1;
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*expanded*/ ctx[1] && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "▶";
    			t1 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			attr_dev(div, "class", "arrow svelte-vxk9wc");
    			toggle_class(div, "arrowDown", /*arrowDown*/ ctx[4]);
    			add_location(div, file$2, 74, 3, 2199);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*toggleExpansion*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*arrowDown*/ 16) {
    				toggle_class(div, "arrowDown", /*arrowDown*/ ctx[4]);
    			}

    			if (/*expanded*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*expanded*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(74:2) {#if children.length > 0 && tree.type !== 'EnumField'}",
    		ctx
    	});

    	return block;
    }

    // (76:3) {#if expanded}
    function create_if_block_1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*children*/ ctx[6];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*children*/ 64) {
    				each_value = /*children*/ ctx[6];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(76:3) {#if expanded}",
    		ctx
    	});

    	return block;
    }

    // (77:4) {#each children as child}
    function create_each_block$1(ctx) {
    	let taxonomyfiltertree;
    	let current;

    	taxonomyfiltertree = new TaxonomyFilterTree({
    			props: { tree: /*child*/ ctx[15] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(taxonomyfiltertree.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(taxonomyfiltertree, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(taxonomyfiltertree.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(taxonomyfiltertree.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(taxonomyfiltertree, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(77:4) {#each children as child}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let ul;
    	let li;
    	let current_block_type_index;
    	let if_block0;
    	let t;
    	let current;
    	const if_block_creators = [create_if_block_2, create_if_block_3, create_if_block_4, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*tree*/ ctx[0].type === 'TextField') return 0;
    		if (/*tree*/ ctx[0].type === 'IntegerField') return 1;
    		if (/*tree*/ ctx[0].type === 'EnumField') return 2;
    		return 3;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	let if_block1 = /*children*/ ctx[6].length > 0 && /*tree*/ ctx[0].type !== 'EnumField' && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			li = element("li");
    			if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			add_location(li, file$2, 43, 1, 1318);
    			attr_dev(ul, "class", "svelte-vxk9wc");
    			add_location(ul, file$2, 42, 0, 1312);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li);
    			if_blocks[current_block_type_index].m(li, null);
    			append_dev(li, t);
    			if (if_block1) if_block1.m(li, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block0 = if_blocks[current_block_type_index];

    				if (!if_block0) {
    					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block0.c();
    				} else {
    					if_block0.p(ctx, dirty);
    				}

    				transition_in(if_block0, 1);
    				if_block0.m(li, t);
    			}

    			if (/*children*/ ctx[6].length > 0 && /*tree*/ ctx[0].type !== 'EnumField') {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*tree*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(li, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			if_blocks[current_block_type_index].d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const _expansionState = {}; /* treeNodeId: expanded <boolean> */

    function instance$2($$self, $$props, $$invalidate) {
    	let arrowDown;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TaxonomyFilterTree', slots, []);
    	let { tree } = $$props;
    	const { name, children } = tree;
    	let expanded = _expansionState[name] || false;

    	const toggleExpansion = () => {
    		$$invalidate(1, expanded = _expansionState[name] = !expanded);
    	};

    	let checked = tree.selected;

    	// TODO: when any children are selected
    	let value = null;

    	const writable_props = ['tree'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<TaxonomyFilterTree> was created with unknown prop '${key}'`);
    	});

    	function checkbox_checked_binding(value) {
    		checked = value;
    		$$invalidate(2, checked);
    	}

    	function textfield_value_binding(value$1) {
    		value = value$1;
    		$$invalidate(3, value);
    	}

    	function checkbox_checked_binding_1(value) {
    		checked = value;
    		$$invalidate(2, checked);
    	}

    	function textfield_value_binding_1(value$1) {
    		value = value$1;
    		$$invalidate(3, value);
    	}

    	function checkbox_checked_binding_2(value) {
    		checked = value;
    		$$invalidate(2, checked);
    	}

    	function select_value_binding(value$1) {
    		value = value$1;
    		$$invalidate(3, value);
    	}

    	function checkbox_checked_binding_3(value) {
    		checked = value;
    		$$invalidate(2, checked);
    	}

    	$$self.$$set = $$props => {
    		if ('tree' in $$props) $$invalidate(0, tree = $$props.tree);
    	};

    	$$self.$capture_state = () => ({
    		_expansionState,
    		Checkbox,
    		Textfield,
    		FormField,
    		Select,
    		Option,
    		tree,
    		name,
    		children,
    		expanded,
    		toggleExpansion,
    		checked,
    		value,
    		arrowDown
    	});

    	$$self.$inject_state = $$props => {
    		if ('tree' in $$props) $$invalidate(0, tree = $$props.tree);
    		if ('expanded' in $$props) $$invalidate(1, expanded = $$props.expanded);
    		if ('checked' in $$props) $$invalidate(2, checked = $$props.checked);
    		if ('value' in $$props) $$invalidate(3, value = $$props.value);
    		if ('arrowDown' in $$props) $$invalidate(4, arrowDown = $$props.arrowDown);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*expanded*/ 2) {
    			$$invalidate(4, arrowDown = expanded);
    		}

    		if ($$self.$$.dirty & /*checked, tree*/ 5) {
    			// TODO: select checkbox -> select all children; partial select all parents (if false)
    			// TODO: unselect checkbox -> unselect all children
    			// TODO: get the state of the tag and all the children
    			// mutate the existing data
    			{
    				if (checked !== tree.selected) {
    					console.log('selection state changed');
    					$$invalidate(0, tree.selected = checked, tree);

    					//tree.children.forEach(child => child.selected = checked);
    					console.log({ tree });
    				}
    			} // TODO: emit an event when selected
    			// TODO: for any parents, set to indeterminate if single child is selected
    		}

    		if ($$self.$$.dirty & /*value*/ 8) {
    			$$invalidate(0, tree.value = value, tree);
    		}
    	};

    	return [
    		tree,
    		expanded,
    		checked,
    		value,
    		arrowDown,
    		name,
    		children,
    		toggleExpansion,
    		checkbox_checked_binding,
    		textfield_value_binding,
    		checkbox_checked_binding_1,
    		textfield_value_binding_1,
    		checkbox_checked_binding_2,
    		select_value_binding,
    		checkbox_checked_binding_3
    	];
    }

    class TaxonomyFilterTree extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { tree: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TaxonomyFilterTree",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*tree*/ ctx[0] === undefined && !('tree' in props)) {
    			console_1.warn("<TaxonomyFilterTree> was created without expected prop 'tree'");
    		}
    	}

    	get tree() {
    		throw new Error("<TaxonomyFilterTree>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tree(value) {
    		throw new Error("<TaxonomyFilterTree>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/TaxonomyFilter.svelte generated by Svelte v3.49.0 */
    const file$1 = "src/TaxonomyFilter.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (7:1) {#each trees as tree}
    function create_each_block(ctx) {
    	let taxonomyfiltertree;
    	let current;

    	taxonomyfiltertree = new TaxonomyFilterTree({
    			props: { tree: /*tree*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(taxonomyfiltertree.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(taxonomyfiltertree, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const taxonomyfiltertree_changes = {};
    			if (dirty & /*trees*/ 1) taxonomyfiltertree_changes.tree = /*tree*/ ctx[1];
    			taxonomyfiltertree.$set(taxonomyfiltertree_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(taxonomyfiltertree.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(taxonomyfiltertree.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(taxonomyfiltertree, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(7:1) {#each trees as tree}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let main;
    	let current;
    	let each_value = /*trees*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			main = element("main");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(main, file$1, 5, 0, 176);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(main, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*trees*/ 1) {
    				each_value = /*trees*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(main, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TaxonomyFilter', slots, []);
    	let { trees } = $$props;
    	const writable_props = ['trees'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TaxonomyFilter> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('trees' in $$props) $$invalidate(0, trees = $$props.trees);
    	};

    	$$self.$capture_state = () => ({ TaxonomyFilterTree, trees });

    	$$self.$inject_state = $$props => {
    		if ('trees' in $$props) $$invalidate(0, trees = $$props.trees);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [trees];
    }

    class TaxonomyFilter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { trees: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TaxonomyFilter",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*trees*/ ctx[0] === undefined && !('trees' in props)) {
    			console.warn("<TaxonomyFilter> was created without expected prop 'trees'");
    		}
    	}

    	get trees() {
    		throw new Error("<TaxonomyFilter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set trees(value) {
    		throw new Error("<TaxonomyFilter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var TaxonomyType;
    (function (TaxonomyType) {
        TaxonomyType["Term"] = "Term";
        TaxonomyType["IntegerField"] = "IntegerField";
        TaxonomyType["TextField"] = "TextField";
        // TODO
    })(TaxonomyType || (TaxonomyType = {}));

    const data = {"id":"b0126ab6-7c6d-9770-3a84-b312fe381fdb","name":"Taxonomy","type":"Taxonomy","children":[{"id":"273c57b2-f06a-3ea9-6d40-cfc3d4d76bf9","name":"Digital Phenotyping","type":"Vocabulary","children":[{"id":"26f6428a-b724-e601-0f4e-d636111948e2","name":"Data Type","type":"Term","children":[{"id":"d79c3938-643c-715a-fe0a-1912e42a653e","name":"Face/Video Recording","type":"Term","children":[{"id":"36424611-3d48-264e-0f14-b6703a34dae6","name":"Video","type":"EnumField","children":[{"id":"36083d40-2abd-2f38-fa09-0d3f04477c60","name":"No","type":"EnumOption","children":[]},{"id":"bb7cefad-75ea-e9cd-e3e5-5490d33bc313","name":"Yes","type":"EnumOption","children":[]}]},{"id":"604e21a0-68af-8a1f-c0a0-ae4aa0f0db50","name":"Recording Software","type":"EnumField","children":[{"id":"046a3e1c-1ebe-5ac3-423a-4d21347d9067","name":"Zoom","type":"EnumOption","children":[]}]},{"id":"3f793af0-c11e-28c9-478c-72505c7d4bae","name":"Transcript","type":"EnumField","children":[{"id":"ee13be57-8c38-73f4-c120-5cf08709cd28","name":"Transcript Me","type":"EnumOption","children":[]},{"id":"1d9c3b4a-e77d-6844-b9c4-ad308ce88fdf","name":"None","type":"EnumOption","children":[]}]},{"id":"e4e4377f-ef31-6982-1273-4deea1149eb2","name":"Setting","type":"Term","children":[]},{"id":"b4bd7c41-0d2e-9b16-1302-e49662659cc3","name":"Assessment Instrument","type":"Term","children":[]}]},{"id":"ebe2da19-10c0-0892-11b4-750686996c03","name":"Ecological Momentary Assessment","type":"Term","children":[{"id":"57fe689d-ef38-6118-ce91-2843ad83aa8c","name":"Platform","type":"EnumField","children":[{"id":"a22eb76b-410c-20f4-22e6-0071b78ab31f","name":"Twilio","type":"EnumOption","children":[]},{"id":"6d84ae0f-55a5-d019-3282-d115e946eab8","name":"Iphone","type":"EnumOption","children":[]},{"id":"c9834bdc-10bc-e168-5d1c-323b8a06ed25","name":"REDCap","type":"EnumOption","children":[]}]},{"id":"ffcf9cc0-5317-5545-73a3-f5b3208f41a6","name":"Assessment Instrument","type":"TextField","children":[]}]},{"id":"73c620ac-fdd0-e67b-6b9d-688f11c4bf07","name":"Actigraphy","type":"Term","children":[{"id":"06b13b3b-34fc-7d0b-92d6-144d5f3e0741","name":"Processing Pipeline","type":"EnumField","children":[{"id":"7744617d-5dc6-27cd-09ae-2a9a9d9e0c70","name":"none","type":"EnumOption","children":[]},{"id":"9eb22164-2928-ce77-3369-739326d5e419","name":"dpsleep","type":"EnumOption","children":[]}]},{"id":"03dbb70a-25bb-30a7-5a44-730c1895ef1a","name":"Device","type":"EnumField","children":[{"id":"2e45794f-bcb4-ed66-094a-f8b7ff2a9829","name":"Apple Watch","type":"EnumOption","children":[]},{"id":"3aa26e56-e5b7-d7f4-e214-1bfee7258f55","name":"GENEActiv","type":"EnumOption","children":[]}]}]}]},{"id":"91817e29-792d-a023-e541-bd931fcfcb0b","name":"Study","type":"Term","children":[{"id":"1dbcf8ca-0bf8-a6f4-6573-d695d30d1e0d","name":"Code","type":"TextField","children":[]},{"id":"d9a3e3b3-3a27-ea69-60bc-98a9c892cc35","name":"Center","type":"TextField","children":[]},{"id":"b767ea1f-5df1-295a-a07d-39a0d8800a2c","name":"Extract","type":"Term","children":[{"id":"d4b8c7ab-2526-0bb3-a341-7c1b0bcb4511","name":"Notes","type":"TextField","children":[]},{"id":"38c40073-1509-a062-c511-e0e9527673bb","name":"Time","type":"TextField","children":[]},{"id":"d1ef49c4-78e7-744e-ef25-2642f116f3ac","name":"Operator ID","type":"TextField","children":[]}]},{"id":"644c7b95-8427-c01e-076d-391cfae54c65","name":"Config","type":"Term","children":[{"id":"f1f12c92-740a-16dc-b9b6-e243f0cbcc90","name":"Operator ID","type":"TextField","children":[]},{"id":"271e5715-9c86-fa6b-d476-643e5e95aebd","name":"Notes","type":"TextField","children":[]},{"id":"f47a00fb-4fd6-b09d-3ccb-69863565103e","name":"Time","type":"TextField","children":[]}]},{"id":"13991312-052a-9b0b-f6e7-dd2ded09a111","name":"Investigator ID","type":"TextField","children":[]}]},{"id":"8a2a08b6-385d-d838-f6ba-5b616cdb8fff","name":"Subject","type":"Term","children":[{"id":"24f97d53-eec9-8430-c904-011a8514b95f","name":"Height","type":"IntegerField","children":[]},{"id":"7213bd9d-e20d-fdbb-9374-a97568fc89bd","name":"Sex","type":"EnumField","children":[{"id":"fc6680ba-be3c-e979-bf94-9b33c79b11e1","name":"Female","type":"EnumOption","children":[]},{"id":"35068c09-55c9-d634-d88d-634bc0079312","name":"Other","type":"EnumOption","children":[]},{"id":"dab52028-eec9-d7fe-12e2-c46effa507dc","name":"Male","type":"EnumOption","children":[]}]},{"id":"877c8cca-26bb-8522-1aad-ce6346ef29ac","name":"Date of Birth","type":"TextField","children":[]},{"id":"1c260390-c770-32d8-1693-8a5cbfb42cfb","name":"Handedness","type":"EnumField","children":[{"id":"cfa609f8-ce03-a223-ceab-d530b08aab26","name":"Right","type":"EnumOption","children":[]},{"id":"80ad8943-9709-f701-5157-766ffd320443","name":"Ambidextrious","type":"EnumOption","children":[]},{"id":"49330075-7d2d-7a74-b778-34288b31adc6","name":"Left","type":"EnumOption","children":[]}]},{"id":"6ab19632-217f-9d92-c7f0-c1487fcad205","name":"Weight","type":"IntegerField","children":[]},{"id":"27c62295-00b8-c098-e500-3c5bde60f8fe","name":"Location","type":"TextField","children":[]}]},{"id":"589ba005-8522-7e4a-3e66-215e9b9b74b5","name":"Collection Time","type":"Term","children":[{"id":"47c67f13-47b2-6c35-097f-9458d53614a5","name":"End DateTime","type":"TextField","children":[]},{"id":"8d56c5a3-3d81-fbdc-2890-55330744d344","name":"Start DateTime","type":"TextField","children":[]},{"id":"6df83c75-e4b1-3174-3153-af11d7f8c6a0","name":"Frequency","type":"TextField","children":[]}]},{"id":"a0b2b4cc-ad70-2c77-db2b-ef0e34e4d29e","name":"Collection Site","type":"Term","children":[{"id":"9f67a75d-69b2-4bc9-fc81-e9121ee107a7","name":"State","type":"TextField","children":[]},{"id":"bd443f29-cf04-c0e9-7395-c1646a7594c3","name":"City","type":"TextField","children":[]},{"id":"b817d0f8-b987-d02e-40ae-331e9f90a034","name":"Country","type":"TextField","children":[]}]}]}]};

    /* src/App.svelte generated by Svelte v3.49.0 */
    const file = "src/App.svelte";

    // (16:2) <Title>
    function create_default_slot_11(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*title*/ ctx[0]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(16:2) <Title>",
    		ctx
    	});

    	return block;
    }

    // (15:3) <Section>
    function create_default_slot_10(ctx) {
    	let title_1;
    	let current;

    	title_1 = new Title({
    			props: {
    				$$slots: { default: [create_default_slot_11] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(title_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(title_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const title_1_changes = {};

    			if (dirty & /*$$scope, title*/ 17) {
    				title_1_changes.$$scope = { dirty, ctx };
    			}

    			title_1.$set(title_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(title_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(title_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(title_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(15:3) <Section>",
    		ctx
    	});

    	return block;
    }

    // (14:1) <Row>
    function create_default_slot_9(ctx) {
    	let section;
    	let current;

    	section = new Section({
    			props: {
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(section.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(section, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const section_changes = {};

    			if (dirty & /*$$scope, title*/ 17) {
    				section_changes.$$scope = { dirty, ctx };
    			}

    			section.$set(section_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(section.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(section.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(section, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(14:1) <Row>",
    		ctx
    	});

    	return block;
    }

    // (13:0) <TopAppBar variant="static">
    function create_default_slot_8(ctx) {
    	let row;
    	let current;

    	row = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row_changes = {};

    			if (dirty & /*$$scope, title*/ 17) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(13:0) <TopAppBar variant=\\\"static\\\">",
    		ctx
    	});

    	return block;
    }

    // (23:2) <Content>
    function create_default_slot_7(ctx) {
    	let textfield;
    	let updating_value;
    	let t0;
    	let span;
    	let t2;
    	let taxonomyfilter;
    	let current;

    	function textfield_value_binding(value) {
    		/*textfield_value_binding*/ ctx[3](value);
    	}

    	let textfield_props = { label: "Search..." };

    	if (/*searchKeyword*/ ctx[2] !== void 0) {
    		textfield_props.value = /*searchKeyword*/ ctx[2];
    	}

    	textfield = new Textfield({ props: textfield_props, $$inline: true });
    	binding_callbacks.push(() => bind(textfield, 'value', textfield_value_binding));

    	taxonomyfilter = new TaxonomyFilter({
    			props: { trees: /*vocabularies*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(textfield.$$.fragment);
    			t0 = space();
    			span = element("span");
    			span.textContent = "Advanced Filters";
    			t2 = space();
    			create_component(taxonomyfilter.$$.fragment);
    			attr_dev(span, "class", "filter-header svelte-s584p0");
    			add_location(span, file, 24, 3, 768);
    		},
    		m: function mount(target, anchor) {
    			mount_component(textfield, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, span, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(taxonomyfilter, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const textfield_changes = {};

    			if (!updating_value && dirty & /*searchKeyword*/ 4) {
    				updating_value = true;
    				textfield_changes.value = /*searchKeyword*/ ctx[2];
    				add_flush_callback(() => updating_value = false);
    			}

    			textfield.$set(textfield_changes);
    			const taxonomyfilter_changes = {};
    			if (dirty & /*vocabularies*/ 2) taxonomyfilter_changes.trees = /*vocabularies*/ ctx[1];
    			taxonomyfilter.$set(taxonomyfilter_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textfield.$$.fragment, local);
    			transition_in(taxonomyfilter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textfield.$$.fragment, local);
    			transition_out(taxonomyfilter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(textfield, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t2);
    			destroy_component(taxonomyfilter, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(23:2) <Content>",
    		ctx
    	});

    	return block;
    }

    // (22:1) <Drawer>
    function create_default_slot_6(ctx) {
    	let content;
    	let current;

    	content = new Content({
    			props: {
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(content.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(content, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const content_changes = {};

    			if (dirty & /*$$scope, vocabularies, searchKeyword*/ 22) {
    				content_changes.$$scope = { dirty, ctx };
    			}

    			content.$set(content_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(content.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(content.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(content, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(22:1) <Drawer>",
    		ctx
    	});

    	return block;
    }

    // (35:6) <PrimaryText>
    function create_default_slot_5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Title");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(35:6) <PrimaryText>",
    		ctx
    	});

    	return block;
    }

    // (36:6) <SecondaryText>
    function create_default_slot_4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Subtitle");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(36:6) <SecondaryText>",
    		ctx
    	});

    	return block;
    }

    // (34:5) <Text>
    function create_default_slot_3(ctx) {
    	let primarytext;
    	let t;
    	let secondarytext;
    	let current;

    	primarytext = new PrimaryText({
    			props: {
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	secondarytext = new SecondaryText({
    			props: {
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(primarytext.$$.fragment);
    			t = space();
    			create_component(secondarytext.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(primarytext, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(secondarytext, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const primarytext_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				primarytext_changes.$$scope = { dirty, ctx };
    			}

    			primarytext.$set(primarytext_changes);
    			const secondarytext_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				secondarytext_changes.$$scope = { dirty, ctx };
    			}

    			secondarytext.$set(secondarytext_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(primarytext.$$.fragment, local);
    			transition_in(secondarytext.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(primarytext.$$.fragment, local);
    			transition_out(secondarytext.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(primarytext, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(secondarytext, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(34:5) <Text>",
    		ctx
    	});

    	return block;
    }

    // (33:4) <Item>
    function create_default_slot_2(ctx) {
    	let text_1;
    	let current;

    	text_1 = new Text({
    			props: {
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(text_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(text_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(text_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(33:4) <Item>",
    		ctx
    	});

    	return block;
    }

    // (31:3) <List twoLine avatarList singleSelection>
    function create_default_slot_1(ctx) {
    	let item;
    	let current;

    	item = new Item({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(item.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(item, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const item_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				item_changes.$$scope = { dirty, ctx };
    			}

    			item.$set(item_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(item.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(item.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(item, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(31:3) <List twoLine avatarList singleSelection>",
    		ctx
    	});

    	return block;
    }

    // (29:1) <AppContent>
    function create_default_slot(ctx) {
    	let main;
    	let list;
    	let current;

    	list = new List({
    			props: {
    				twoLine: true,
    				avatarList: true,
    				singleSelection: true,
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(list.$$.fragment);
    			attr_dev(main, "class", "svelte-s584p0");
    			add_location(main, file, 29, 2, 903);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(list, main, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const list_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				list_changes.$$scope = { dirty, ctx };
    			}

    			list.$set(list_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(list.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(list.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(list);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(29:1) <AppContent>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let topappbar;
    	let t0;
    	let drawer;
    	let t1;
    	let appcontent;
    	let t2;
    	let link0;
    	let t3;
    	let link1;
    	let t4;
    	let link2;
    	let t5;
    	let link3;
    	let current;

    	topappbar = new TopAppBar({
    			props: {
    				variant: "static",
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	drawer = new Drawer({
    			props: {
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	appcontent = new AppContent({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(topappbar.$$.fragment);
    			t0 = space();
    			create_component(drawer.$$.fragment);
    			t1 = space();
    			create_component(appcontent.$$.fragment);
    			t2 = space();
    			link0 = element("link");
    			t3 = space();
    			link1 = element("link");
    			t4 = space();
    			link2 = element("link");
    			t5 = space();
    			link3 = element("link");
    			attr_dev(link0, "rel", "stylesheet");
    			attr_dev(link0, "href", "https://fonts.googleapis.com/icon?family=Material+Icons");
    			add_location(link0, file, 43, 0, 1194);
    			attr_dev(link1, "rel", "stylesheet");
    			attr_dev(link1, "href", "https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700");
    			add_location(link1, file, 48, 0, 1303);
    			attr_dev(link2, "rel", "stylesheet");
    			attr_dev(link2, "href", "https://fonts.googleapis.com/css?family=Roboto+Mono");
    			add_location(link2, file, 53, 0, 1428);
    			attr_dev(link3, "rel", "stylesheet");
    			attr_dev(link3, "href", "https://cdn.jsdelivr.net/npm/svelte-material-ui@6.0.0/bare.min.css");
    			add_location(link3, file, 58, 0, 1578);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(topappbar, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(drawer, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(appcontent, target, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, link0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, link1, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, link2, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, link3, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const topappbar_changes = {};

    			if (dirty & /*$$scope, title*/ 17) {
    				topappbar_changes.$$scope = { dirty, ctx };
    			}

    			topappbar.$set(topappbar_changes);
    			const drawer_changes = {};

    			if (dirty & /*$$scope, vocabularies, searchKeyword*/ 22) {
    				drawer_changes.$$scope = { dirty, ctx };
    			}

    			drawer.$set(drawer_changes);
    			const appcontent_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				appcontent_changes.$$scope = { dirty, ctx };
    			}

    			appcontent.$set(appcontent_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(topappbar.$$.fragment, local);
    			transition_in(drawer.$$.fragment, local);
    			transition_in(appcontent.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(topappbar.$$.fragment, local);
    			transition_out(drawer.$$.fragment, local);
    			transition_out(appcontent.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(topappbar, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(drawer, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(appcontent, detaching);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(link0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(link1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(link2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(link3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let { title = 'Search Dashboard' } = $$props;
    	let searchKeyword = '';
    	let { vocabularies = data.children[0].children } = $$props;
    	const writable_props = ['title', 'vocabularies'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function textfield_value_binding(value) {
    		searchKeyword = value;
    		$$invalidate(2, searchKeyword);
    	}

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('vocabularies' in $$props) $$invalidate(1, vocabularies = $$props.vocabularies);
    	};

    	$$self.$capture_state = () => ({
    		TopAppBar,
    		Row,
    		Section,
    		Title,
    		Textfield,
    		List,
    		Item,
    		Text,
    		PrimaryText,
    		SecondaryText,
    		Drawer,
    		Content,
    		AppContent,
    		TaxonomyFilter,
    		title,
    		searchKeyword,
    		testData: data,
    		vocabularies
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('searchKeyword' in $$props) $$invalidate(2, searchKeyword = $$props.searchKeyword);
    		if ('vocabularies' in $$props) $$invalidate(1, vocabularies = $$props.vocabularies);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, vocabularies, searchKeyword, textfield_value_binding];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { title: 0, vocabularies: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get title() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get vocabularies() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set vocabularies(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
        target: document.body,
        props: {
            name: 'world'
        }
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
