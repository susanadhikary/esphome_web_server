var Kr = Object.defineProperty;
var Gr = (i, t, e) => t in i ? Kr(i, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
}) : i[t] = e;
var k = (i, t, e) => (Gr(i, typeof t != "symbol" ? t + "" : t, e), e);
const ni = window,
    wn = ni.ShadowRoot && (ni.ShadyCSS === void 0 || ni.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
    kn = Symbol(),
    Wn = new WeakMap;
class Fo {
    constructor(t, e, n) {
        if (this._$cssResult$ = !0, n !== kn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t, this.t = e
    }
    get styleSheet() {
        let t = this.o;
        const e = this.t;
        if (wn && t === void 0) {
            const n = e !== void 0 && e.length === 1;
            n && (t = Wn.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), n && Wn.set(e, t))
        }
        return t
    }
    toString() {
        return this.cssText
    }
}
const Qr = i => new Fo(typeof i == "string" ? i : i + "", void 0, kn),
    nt = (i, ...t) => {
        const e = i.length === 1 ? i[0] : t.reduce((n, s, o) => n + (r => {
            if (r._$cssResult$ === !0) return r.cssText;
            if (typeof r == "number") return r;
            throw Error("use css function " + r + ". Use unsafeCSS")
        })(s) + i[o + 1], i[0]);
        return new Fo(e, i, kn)
    },
    Zr = (i, t) => {
        wn ? i.adoptedStyleSheets = t.map(e => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach(e => {
            const n = document.createElement("style"),
                s = ni.litNonce;
            s !== void 0 && n.setAttribute("nonce", s), n.textContent = e.cssText, i.appendChild(n)
        })
    },
    Un = wn ? i => i : i => i instanceof CSSStyleSheet ? (t => {
        let e = "";
        for (const n of t.cssRules) e += n.cssText;
        return Qr(e)
    })(i) : i;
var Li;
const di = window,
    Yn = di.trustedTypes,
    Jr = Yn ? Yn.emptyScript : "",
    qn = di.reactiveElementPolyfillSupport,
    tn = {
        toAttribute(i, t) {
            switch (t) {
                case Boolean:
                    i = i ? Jr : null;
                    break;
                case Object:
                case Array:
                    i = i == null ? i : JSON.stringify(i)
            }
            return i
        },
        fromAttribute(i, t) {
            let e = i;
            switch (t) {
                case Boolean:
                    e = i !== null;
                    break;
                case Number:
                    e = i === null ? null : Number(i);
                    break;
                case Object:
                case Array:
                    try {
                        e = JSON.parse(i)
                    } catch {
                        e = null
                    }
            }
            return e
        }
    },
    No = (i, t) => t !== i && (t == t || i == i),
    Ri = {
        attribute: !0,
        type: String,
        converter: tn,
        reflect: !1,
        hasChanged: No
    },
    en = "finalized";
class Vt extends HTMLElement {
    constructor() {
        super(), this._$Ei = new Map, this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this._$Eu()
    }
    static addInitializer(t) {
        var e;
        this.finalize(), ((e = this.h) !== null && e !== void 0 ? e : this.h = []).push(t)
    }
    static get observedAttributes() {
        this.finalize();
        const t = [];
        return this.elementProperties.forEach((e, n) => {
            const s = this._$Ep(n, e);
            s !== void 0 && (this._$Ev.set(s, n), t.push(s))
        }), t
    }
    static createProperty(t, e = Ri) {
        if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
            const n = typeof t == "symbol" ? Symbol() : "__" + t,
                s = this.getPropertyDescriptor(t, n, e);
            s !== void 0 && Object.defineProperty(this.prototype, t, s)
        }
    }
    static getPropertyDescriptor(t, e, n) {
        return {get() {
                return this[e]
            },
            set(s) {
                const o = this[t];
                this[e] = s, this.requestUpdate(t, o, n)
            },
            configurable: !0,
            enumerable: !0
        }
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) || Ri
    }
    static finalize() {
        if (this.hasOwnProperty(en)) return !1;
        this[en] = !0;
        const t = Object.getPrototypeOf(this);
        if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = new Map, this.hasOwnProperty("properties")) {
            const e = this.properties,
                n = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
            for (const s of n) this.createProperty(s, e[s])
        }
        return this.elementStyles = this.finalizeStyles(this.styles), !0
    }
    static finalizeStyles(t) {
        const e = [];
        if (Array.isArray(t)) {
            const n = new Set(t.flat(1 / 0).reverse());
            for (const s of n) e.unshift(Un(s))
        } else t !== void 0 && e.push(Un(t));
        return e
    }
    static _$Ep(t, e) {
        const n = e.attribute;
        return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0
    }
    _$Eu() {
        var t;
        this._$E_ = new Promise(e => this.enableUpdating = e), this._$AL = new Map, this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach(e => e(this))
    }
    addController(t) {
        var e, n;
        ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((n = t.hostConnected) === null || n === void 0 || n.call(t))
    }
    removeController(t) {
        var e;
        (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1)
    }
    _$Eg() {
        this.constructor.elementProperties.forEach((t, e) => {
            this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e])
        })
    }
    createRenderRoot() {
        var t;
        const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
        return Zr(e, this.constructor.elementStyles), e
    }
    connectedCallback() {
        var t;
        this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach(e => {
            var n;
            return (n = e.hostConnected) === null || n === void 0 ? void 0 : n.call(e)
        })
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        var t;
        (t = this._$ES) === null || t === void 0 || t.forEach(e => {
            var n;
            return (n = e.hostDisconnected) === null || n === void 0 ? void 0 : n.call(e)
        })
    }
    attributeChangedCallback(t, e, n) {
        this._$AK(t, n)
    }
    _$EO(t, e, n = Ri) {
        var s;
        const o = this.constructor._$Ep(t, n);
        if (o !== void 0 && n.reflect === !0) {
            const r = (((s = n.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? n.converter : tn).toAttribute(e, n.type);
            this._$El = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$El = null
        }
    }
    _$AK(t, e) {
        var n;
        const s = this.constructor,
            o = s._$Ev.get(t);
        if (o !== void 0 && this._$El !== o) {
            const r = s.getPropertyOptions(o),
                a = typeof r.converter == "function" ? {
                    fromAttribute: r.converter
                } : ((n = r.converter) === null || n === void 0 ? void 0 : n.fromAttribute) !== void 0 ? r.converter : tn;
            this._$El = o, this[o] = a.fromAttribute(e, r.type), this._$El = null
        }
    }
    requestUpdate(t, e, n) {
        let s = !0;
        t !== void 0 && (((n = n || this.constructor.getPropertyOptions(t)).hasChanged || No)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), n.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = new Map), this._$EC.set(t, n))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej())
    }
    async _$Ej() {
        this.isUpdatePending = !0;
        try {
            await this._$E_
        } catch (e) {
            Promise.reject(e)
        }
        const t = this.scheduleUpdate();
        return t != null && await t, !this.isUpdatePending
    }
    scheduleUpdate() {
        return this.performUpdate()
    }
    performUpdate() {
        var t;
        if (!this.isUpdatePending) return;
        this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, o) => this[o] = s), this._$Ei = void 0);
        let e = !1;
        const n = this._$AL;
        try {
            e = this.shouldUpdate(n), e ? (this.willUpdate(n), (t = this._$ES) === null || t === void 0 || t.forEach(s => {
                var o;
                return (o = s.hostUpdate) === null || o === void 0 ? void 0 : o.call(s)
            }), this.update(n)) : this._$Ek()
        } catch (s) {
            throw e = !1, this._$Ek(), s
        }
        e && this._$AE(n)
    }
    willUpdate(t) {}
    _$AE(t) {
        var e;
        (e = this._$ES) === null || e === void 0 || e.forEach(n => {
            var s;
            return (s = n.hostUpdated) === null || s === void 0 ? void 0 : s.call(n)
        }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t)
    }
    _$Ek() {
        this._$AL = new Map, this.isUpdatePending = !1
    }
    get updateComplete() {
        return this.getUpdateComplete()
    }
    getUpdateComplete() {
        return this._$E_
    }
    shouldUpdate(t) {
        return !0
    }
    update(t) {
        this._$EC !== void 0 && (this._$EC.forEach((e, n) => this._$EO(n, this[n], e)), this._$EC = void 0), this._$Ek()
    }
    updated(t) {}
    firstUpdated(t) {}
}
Vt[en] = !0, Vt.elementProperties = new Map, Vt.elementStyles = [], Vt.shadowRootOptions = {
    mode: "open"
}, qn == null || qn({
    ReactiveElement: Vt
}), ((Li = di.reactiveElementVersions) !== null && Li !== void 0 ? Li : di.reactiveElementVersions = []).push("1.6.3");
var Fi;
const ui = window,
    Ht = ui.trustedTypes,
    Xn = Ht ? Ht.createPolicy("lit-html", {
        createHTML: i => i
    }) : void 0,
    nn = "$lit$",
    ht = `lit$${(Math.random()+"").slice(9)}$`,
    zo = "?" + ht,
    ta = `<${zo}>`,
    Et = document,
    xe = () => Et.createComment(""),
    ve = i => i === null || typeof i != "object" && typeof i != "function",
    jo = Array.isArray,
    ea = i => jo(i) || typeof(i == null ? void 0 : i[Symbol.iterator]) == "function",
    Ni = `[ 	
\f\r]`,
    ne = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    Kn = /-->/g,
    Gn = />/g,
    yt = RegExp(`>|${Ni}(?:([^\\s"'>=/]+)(${Ni}*=${Ni}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"),
    Qn = /'/g,
    Zn = /"/g,
    Bo = /^(?:script|style|textarea|title)$/i,
    Vo = i => (t, ...e) => ({
        _$litType$: i,
        strings: t,
        values: e
    }),
    C = Vo(1),
    ia = Vo(2),
    Wt = Symbol.for("lit-noChange"),
    L = Symbol.for("lit-nothing"),
    Jn = new WeakMap,
    Ct = Et.createTreeWalker(Et, 129, null, !1);

function Ho(i, t) {
    if (!Array.isArray(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return Xn !== void 0 ? Xn.createHTML(t) : t
}
const na = (i, t) => {
    const e = i.length - 1,
        n = [];
    let s, o = t === 2 ? "<svg>" : "",
        r = ne;
    for (let a = 0; a < e; a++) {
        const c = i[a];
        let l, h, d = -1,
            u = 0;
        for (; u < c.length && (r.lastIndex = u, h = r.exec(c), h !== null);) u = r.lastIndex, r === ne ? h[1] === "!--" ? r = Kn : h[1] !== void 0 ? r = Gn : h[2] !== void 0 ? (Bo.test(h[2]) && (s = RegExp("</" + h[2], "g")), r = yt) : h[3] !== void 0 && (r = yt) : r === yt ? h[0] === ">" ? (r = s != null ? s : ne, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, l = h[1], r = h[3] === void 0 ? yt : h[3] === '"' ? Zn : Qn) : r === Zn || r === Qn ? r = yt : r === Kn || r === Gn ? r = ne : (r = yt, s = void 0);
        const f = r === yt && i[a + 1].startsWith("/>") ? " " : "";
        o += r === ne ? c + ta : d >= 0 ? (n.push(l), c.slice(0, d) + nn + c.slice(d) + ht + f) : c + ht + (d === -2 ? (n.push(void 0), a) : f)
    }
    return [Ho(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : "")), n]
};
class we {
    constructor({
        strings: t,
        _$litType$: e
    }, n) {
        let s;
        this.parts = [];
        let o = 0,
            r = 0;
        const a = t.length - 1,
            c = this.parts,
            [l, h] = na(t, e);
        if (this.el = we.createElement(l, n), Ct.currentNode = this.el.content, e === 2) {
            const d = this.el.content,
                u = d.firstChild;
            u.remove(), d.append(...u.childNodes)
        }
        for (;
            (s = Ct.nextNode()) !== null && c.length < a;) {
            if (s.nodeType === 1) {
                if (s.hasAttributes()) {
                    const d = [];
                    for (const u of s.getAttributeNames())
                        if (u.endsWith(nn) || u.startsWith(ht)) {
                            const f = h[r++];
                            if (d.push(u), f !== void 0) {
                                const p = s.getAttribute(f.toLowerCase() + nn).split(ht),
                                    g = /([.?@])?(.*)/.exec(f);
                                c.push({
                                    type: 1,
                                    index: o,
                                    name: g[2],
                                    strings: p,
                                    ctor: g[1] === "." ? oa : g[1] === "?" ? aa : g[1] === "@" ? ca : Ci
                                })
                            } else c.push({
                                type: 6,
                                index: o
                            })
                        }
                    for (const u of d) s.removeAttribute(u)
                }
                if (Bo.test(s.tagName)) {
                    const d = s.textContent.split(ht),
                        u = d.length - 1;
                    if (u > 0) {
                        s.textContent = Ht ? Ht.emptyScript : "";
                        for (let f = 0; f < u; f++) s.append(d[f], xe()), Ct.nextNode(), c.push({
                            type: 2,
                            index: ++o
                        });
                        s.append(d[u], xe())
                    }
                }
            } else if (s.nodeType === 8)
                if (s.data === zo) c.push({
                    type: 2,
                    index: o
                });
                else {
                    let d = -1;
                    for (;
                        (d = s.data.indexOf(ht, d + 1)) !== -1;) c.push({
                        type: 7,
                        index: o
                    }), d += ht.length - 1
                }
            o++
        }
    }
    static createElement(t, e) {
        const n = Et.createElement("template");
        return n.innerHTML = t, n
    }
}

function Ut(i, t, e = i, n) {
    var s, o, r, a;
    if (t === Wt) return t;
    let c = n !== void 0 ? (s = e._$Co) === null || s === void 0 ? void 0 : s[n] : e._$Cl;
    const l = ve(t) ? void 0 : t._$litDirective$;
    return (c == null ? void 0 : c.constructor) !== l && ((o = c == null ? void 0 : c._$AO) === null || o === void 0 || o.call(c, !1), l === void 0 ? c = void 0 : (c = new l(i), c._$AT(i, e, n)), n !== void 0 ? ((r = (a = e)._$Co) !== null && r !== void 0 ? r : a._$Co = [])[n] = c : e._$Cl = c), c !== void 0 && (t = Ut(i, c._$AS(i, t.values), c, n)), t
}
class sa {
    constructor(t, e) {
        this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e
    }
    get parentNode() {
        return this._$AM.parentNode
    }
    get _$AU() {
        return this._$AM._$AU
    }
    u(t) {
        var e;
        const {
            el: {
                content: n
            },
            parts: s
        } = this._$AD, o = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : Et).importNode(n, !0);
        Ct.currentNode = o;
        let r = Ct.nextNode(),
            a = 0,
            c = 0,
            l = s[0];
        for (; l !== void 0;) {
            if (a === l.index) {
                let h;
                l.type === 2 ? h = new De(r, r.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (h = new la(r, this, t)), this._$AV.push(h), l = s[++c]
            }
            a !== (l == null ? void 0 : l.index) && (r = Ct.nextNode(), a++)
        }
        return Ct.currentNode = Et, o
    }
    v(t) {
        let e = 0;
        for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++
    }
}
class De {
    constructor(t, e, n, s) {
        var o;
        this.type = 2, this._$AH = L, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = s, this._$Cp = (o = s == null ? void 0 : s.isConnected) === null || o === void 0 || o
    }
    get _$AU() {
        var t, e;
        return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cp
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const e = this._$AM;
        return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t
    }
    get startNode() {
        return this._$AA
    }
    get endNode() {
        return this._$AB
    }
    _$AI(t, e = this) {
        t = Ut(this, t, e), ve(t) ? t === L || t == null || t === "" ? (this._$AH !== L && this._$AR(), this._$AH = L) : t !== this._$AH && t !== Wt && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : ea(t) ? this.T(t) : this._(t)
    }
    k(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB)
    }
    $(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.k(t))
    }
    _(t) {
        this._$AH !== L && ve(this._$AH) ? this._$AA.nextSibling.data = t : this.$(Et.createTextNode(t)), this._$AH = t
    }
    g(t) {
        var e;
        const {
            values: n,
            _$litType$: s
        } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = we.createElement(Ho(s.h, s.h[0]), this.options)), s);
        if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === o) this._$AH.v(n);
        else {
            const r = new sa(o, this),
                a = r.u(this.options);
            r.v(n), this.$(a), this._$AH = r
        }
    }
    _$AC(t) {
        let e = Jn.get(t.strings);
        return e === void 0 && Jn.set(t.strings, e = new we(t)), e
    }
    T(t) {
        jo(this._$AH) || (this._$AH = [], this._$AR());
        const e = this._$AH;
        let n, s = 0;
        for (const o of t) s === e.length ? e.push(n = new De(this.k(xe()), this.k(xe()), this, this.options)) : n = e[s], n._$AI(o), s++;
        s < e.length && (this._$AR(n && n._$AB.nextSibling, s), e.length = s)
    }
    _$AR(t = this._$AA.nextSibling, e) {
        var n;
        for ((n = this._$AP) === null || n === void 0 || n.call(this, !1, !0, e); t && t !== this._$AB;) {
            const s = t.nextSibling;
            t.remove(), t = s
        }
    }
    setConnected(t) {
        var e;
        this._$AM === void 0 && (this._$Cp = t, (e = this._$AP) === null || e === void 0 || e.call(this, t))
    }
}
class Ci {
    constructor(t, e, n, s, o) {
        this.type = 1, this._$AH = L, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String), this.strings = n) : this._$AH = L
    }
    get tagName() {
        return this.element.tagName
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(t, e = this, n, s) {
        const o = this.strings;
        let r = !1;
        if (o === void 0) t = Ut(this, t, e, 0), r = !ve(t) || t !== this._$AH && t !== Wt, r && (this._$AH = t);
        else {
            const a = t;
            let c, l;
            for (t = o[0], c = 0; c < o.length - 1; c++) l = Ut(this, a[n + c], e, c), l === Wt && (l = this._$AH[c]), r || (r = !ve(l) || l !== this._$AH[c]), l === L ? t = L : t !== L && (t += (l != null ? l : "") + o[c + 1]), this._$AH[c] = l
        }
        r && !s && this.j(t)
    }
    j(t) {
        t === L ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "")
    }
}
class oa extends Ci {
    constructor() {
        super(...arguments), this.type = 3
    }
    j(t) {
        this.element[this.name] = t === L ? void 0 : t
    }
}
const ra = Ht ? Ht.emptyScript : "";
class aa extends Ci {
    constructor() {
        super(...arguments), this.type = 4
    }
    j(t) {
        t && t !== L ? this.element.setAttribute(this.name, ra) : this.element.removeAttribute(this.name)
    }
}
class ca extends Ci {
    constructor(t, e, n, s, o) {
        super(t, e, n, s, o), this.type = 5
    }
    _$AI(t, e = this) {
        var n;
        if ((t = (n = Ut(this, t, e, 0)) !== null && n !== void 0 ? n : L) === Wt) return;
        const s = this._$AH,
            o = t === L && s !== L || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive,
            r = t !== L && (s === L || o);
        o && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t
    }
    handleEvent(t) {
        var e, n;
        typeof this._$AH == "function" ? this._$AH.call((n = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && n !== void 0 ? n : this.element, t) : this._$AH.handleEvent(t)
    }
}
class la {
    constructor(t, e, n) {
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(t) {
        Ut(this, t)
    }
}
const ts = ui.litHtmlPolyfillSupport;
ts == null || ts(we, De), ((Fi = ui.litHtmlVersions) !== null && Fi !== void 0 ? Fi : ui.litHtmlVersions = []).push("2.8.0");
const ha = (i, t, e) => {
    var n, s;
    const o = (n = e == null ? void 0 : e.renderBefore) !== null && n !== void 0 ? n : t;
    let r = o._$litPart$;
    if (r === void 0) {
        const a = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
        o._$litPart$ = r = new De(t.insertBefore(xe(), a), a, void 0, e != null ? e : {})
    }
    return r._$AI(i), r
};
var zi, ji;
class J extends Vt {
    constructor() {
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Do = void 0
    }
    createRenderRoot() {
        var t, e;
        const n = super.createRenderRoot();
        return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = n.firstChild), n
    }
    update(t) {
        const e = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ha(e, this.renderRoot, this.renderOptions)
    }
    connectedCallback() {
        var t;
        super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0)
    }
    disconnectedCallback() {
        var t;
        super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1)
    }
    render() {
        return Wt
    }
}
J.finalized = !0, J._$litElement$ = !0, (zi = globalThis.litElementHydrateSupport) === null || zi === void 0 || zi.call(globalThis, {
    LitElement: J
});
const es = globalThis.litElementPolyfillSupport;
es == null || es({
    LitElement: J
});
((ji = globalThis.litElementVersions) !== null && ji !== void 0 ? ji : globalThis.litElementVersions = []).push("3.3.3");
const Rt = i => t => typeof t == "function" ? ((e, n) => (customElements.define(e, n), n))(i, t) : ((e, n) => {
        const {
            kind: s,
            elements: o
        } = n;
        return {
            kind: s,
            elements: o,
            finisher(r) {
                customElements.define(e, r)
            }
        }
    })(i, t),
    da = (i, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? {...t,
        finisher(e) {
            e.createProperty(t.key, i)
        }
    } : {
        kind: "field",
        key: Symbol(),
        placement: "own",
        descriptor: {},
        originalKey: t.key,
        initializer() {
            typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this))
        },
        finisher(e) {
            e.createProperty(t.key, i)
        }
    },
    ua = (i, t, e) => {
        t.constructor.createProperty(e, i)
    };

function Y(i) {
    return (t, e) => e !== void 0 ? ua(i, t, e) : da(i, t)
}

function mt(i) {
    return Y({...i,
        state: !0
    })
}
const fa = ({
    finisher: i,
    descriptor: t
}) => (e, n) => {
    var s;
    if (n === void 0) {
        const o = (s = e.originalKey) !== null && s !== void 0 ? s : e.key,
            r = t != null ? {
                kind: "method",
                placement: "prototype",
                key: o,
                descriptor: t(e.key)
            } : {...e,
                key: o
            };
        return i != null && (r.finisher = function(a) {
            i(a, o)
        }), r
    } {
        const o = e.constructor;
        t !== void 0 && Object.defineProperty(e, n, t(n)), i == null || i(o, n)
    }
};

function pa(i, t) {
    return fa({
        descriptor: e => {
            const n = {get() {
                    var s, o;
                    return (o = (s = this.renderRoot) === null || s === void 0 ? void 0 : s.querySelector(i)) !== null && o !== void 0 ? o : null
                },
                enumerable: !0,
                configurable: !0
            };
            if (t) {
                const s = typeof e == "symbol" ? Symbol() : "__" + e;
                n.get = function() {
                    var o, r;
                    return this[s] === void 0 && (this[s] = (r = (o = this.renderRoot) === null || o === void 0 ? void 0 : o.querySelector(i)) !== null && r !== void 0 ? r : null), this[s]
                }
            }
            return n
        }
    })
}
var Bi;
((Bi = window.HTMLSlotElement) === null || Bi === void 0 ? void 0 : Bi.prototype.assignedElements) != null;
var Oi = nt `:host,button,input,select{font-family:ui-monospace,system-ui,Helvetica,Roboto,Oxygen,Ubuntu,sans-serif;--primary-color:#03a9f4;transition:all 350ms!important}`,
    Wo = nt `.btn,button{cursor:pointer;border-radius:4px;color:#03a9f4;border:none;background-color:unset;padding:8px;font-weight:500;font-size:12.25px;letter-spacing:1.09375px;text-transform:uppercase;margin-right:-8px}.btn:active,button:active{background-image:rgba(127,127,127,.2);transition-duration:1s}.btn:hover,button:hover{background-color:rgba(127,127,127,.2);transition-duration:1s}.abuttonIsState{background-color:#28a745;color:#fff;border:none;padding:10px 20px;font-size:16px;border-radius:4px;transition:background-color .3s ease}`,
    ga = nt `input[type=text]{width:100%!important;height:1rem!important}`,
    ma = nt `:host{position:relative}select{background-color:inherit;color:inherit;width:100%;border-radius:4px}option{color:currentColor;background-color:var(--primary-color,currentColor)}input[type=range],input[type=text]{width:calc(100% - 3rem);height:.75rem}.range{text-align:center}.entity-row{display:flex;align-items:center;flex-direction:row;transition:all .3s ease-out 0s;min-height:40px;position:relative}.entity-row.expanded{min-height:240px}.entity-row:nth-child(2n){background-color:rgba(90,90,90,.1)}.entity-row iconify-icon{vertical-align:middle}.entity-row>:nth-child(1){flex:0 0 40px;color:#44739e;line-height:40px;text-align:center}.entity-row>:nth-child(2){flex:1 1 40%;margin-left:16px;margin-right:8px;text-wrap:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:150px}.entity-row>:nth-child(3){flex:1 1 50%;margin-right:8px;margin-left:20px;text-align:right;display:flex;justify-content:space-between}.entity-row>:nth-child(3)>:only-child{margin-left:auto}.binary_sensor_off{color:rgba(127,127,127,.7)}.singlebutton-row button{margin:auto;display:flex}.climate-wrap{width:100%;margin:10px 0 10px 0}.climate-row{width:100%;display:inline-flex;flex-wrap:wrap;text-align:left}.climate-row>select{width:50%}.climate-row>label{align-content:center;width:150px}input[type=color]::-webkit-color-swatch-wrapper{padding:0!important}`,
    Sn = nt `.tab-header{display:inline-flex;max-width:90%;font-weight:400;padding-inline:1.5em;padding-top:.5em;padding-bottom:.5em;align-items:center;border-radius:12px 12px 0 0;background-color:rgba(127,127,127,.3);margin-top:1em;user-select:none}.tab-container{border:2px solid rgba(127,127,127,.3);border-radius:0 12px 12px 12px}`;

function Ie(i) {
    return i + .5 | 0
}
const dt = (i, t, e) => Math.max(Math.min(i, e), t);

function he(i) {
    return dt(Ie(i * 2.55), 0, 255)
}

function ft(i) {
    return dt(Ie(i * 255), 0, 255)
}

function ot(i) {
    return dt(Ie(i / 2.55) / 100, 0, 1)
}

function is(i) {
    return dt(Ie(i * 100), 0, 100)
}
const K = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        A: 10,
        B: 11,
        C: 12,
        D: 13,
        E: 14,
        F: 15,
        a: 10,
        b: 11,
        c: 12,
        d: 13,
        e: 14,
        f: 15
    },
    sn = [...
        "0123456789ABCDEF"
    ],
    ba = i => sn[i & 15],
    _a = i => sn[(i & 240) >> 4] + sn[i & 15],
    Be = i => (i & 240) >> 4 === (i & 15),
    ya = i => Be(i.r) && Be(i.g) && Be(i.b) && Be(i.a);

function xa(i) {
    var t = i.length,
        e;
    return i[0] === "#" && (t === 4 || t === 5 ? e = {
        r: 255 & K[i[1]] * 17,
        g: 255 & K[i[2]] * 17,
        b: 255 & K[i[3]] * 17,
        a: t === 5 ? K[i[4]] * 17 : 255
    } : (t === 7 || t === 9) && (e = {
        r: K[i[1]] << 4 | K[i[2]],
        g: K[i[3]] << 4 | K[i[4]],
        b: K[i[5]] << 4 | K[i[6]],
        a: t === 9 ? K[i[7]] << 4 | K[i[8]] : 255
    })), e
}
const va = (i, t) => i < 255 ? t(i) : "";

function wa(i) {
    var t = ya(i) ? ba : _a;
    return i ? "#" + t(i.r) + t(i.g) + t(i.b) + va(i.a, t) : void 0
}
const ka = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;

function Uo(i, t, e) {
    const n = t * Math.min(e, 1 - e),
        s = (o, r = (o + i / 30) % 12) => e - n * Math.max(Math.min(r - 3, 9 - r, 1), -1);
    return [s(0), s(8), s(4)]
}

function Sa(i, t, e) {
    const n = (s, o = (s + i / 60) % 6) => e - e * t * Math.max(Math.min(o, 4 - o, 1), 0);
    return [n(5), n(3), n(1)]
}

function Ma(i, t, e) {
    const n = Uo(i, 1, .5);
    let s;
    for (t + e > 1 && (s = 1 / (t + e), t *= s, e *= s), s = 0; s < 3; s++) n[s] *= 1 - t - e, n[s] += t;
    return n
}

function Ca(i, t, e, n, s) {
    return i === s ? (t - e) / n + (t < e ? 6 : 0) : t === s ? (e - i) / n + 2 : (i - t) / n + 4
}

function Mn(i) {
    const e = i.r / 255,
        n = i.g / 255,
        s = i.b / 255,
        o = Math.max(e, n, s),
        r = Math.min(e, n, s),
        a = (o + r) / 2;
    let c, l, h;
    return o !== r && (h = o - r, l = a > .5 ? h / (2 - o - r) : h / (o + r), c = Ca(e, n, s, h, o), c = c * 60 + .5), [c | 0, l || 0, a]
}

function Cn(i, t, e, n) {
    return (Array.isArray(t) ? i(t[0], t[1], t[2]) : i(t, e, n)).map(ft)
}

function On(i, t, e) {
    return Cn(Uo, i, t, e)
}

function Oa(i, t, e) {
    return Cn(Ma, i, t, e)
}

function Pa(i, t, e) {
    return Cn(Sa, i, t, e)
}

function Yo(i) {
    return (i % 360 + 360) % 360
}

function $a(i) {
    const t = ka.exec(i);
    let e = 255,
        n;
    if (!t) return;
    t[5] !== n && (e = t[6] ? he(+t[5]) : ft(+t[5]));
    const s = Yo(+t[2]),
        o = +t[3] / 100,
        r = +t[4] / 100;
    return t[1] === "hwb" ? n = Oa(s, o, r) : t[1] === "hsv" ? n = Pa(s, o, r) : n = On(s, o, r), {
        r: n[0],
        g: n[1],
        b: n[2],
        a: e
    }
}

function Aa(i, t) {
    var e = Mn(i);
    e[0] = Yo(e[0] + t), e = On(e), i.r = e[0], i.g = e[1], i.b = e[2]
}

function Ea(i) {
    if (!i) return;
    const t = Mn(i),
        e = t[0],
        n = is(t[1]),
        s = is(t[2]);
    return i.a < 255 ? `hsla(${e}, ${n}%, ${s}%, ${ot(i.a)})` : `hsl(${e}, ${n}%, ${s}%)`
}
const ns = {
        x: "dark",
        Z: "light",
        Y: "re",
        X: "blu",
        W: "gr",
        V: "medium",
        U: "slate",
        A: "ee",
        T: "ol",
        S: "or",
        B: "ra",
        C: "lateg",
        D: "ights",
        R: "in",
        Q: "turquois",
        E: "hi",
        P: "ro",
        O: "al",
        N: "le",
        M: "de",
        L: "yello",
        F: "en",
        K: "ch",
        G: "arks",
        H: "ea",
        I: "ightg",
        J: "wh"
    },
    ss = {
        OiceXe: "f0f8ff",
        antiquewEte: "faebd7",
        aqua: "ffff",
        aquamarRe: "7fffd4",
        azuY: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "0",
        blanKedOmond: "ffebcd",
        Xe: "ff",
        XeviTet: "8a2be2",
        bPwn: "a52a2a",
        burlywood: "deb887",
        caMtXe: "5f9ea0",
        KartYuse: "7fff00",
        KocTate: "d2691e",
        cSO: "ff7f50",
        cSnflowerXe: "6495ed",
        cSnsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "ffff",
        xXe: "8b",
        xcyan: "8b8b",
        xgTMnPd: "b8860b",
        xWay: "a9a9a9",
        xgYF: "6400",
        xgYy: "a9a9a9",
        xkhaki: "bdb76b",
        xmagFta: "8b008b",
        xTivegYF: "556b2f",
        xSange: "ff8c00",
        xScEd: "9932cc",
        xYd: "8b0000",
        xsOmon: "e9967a",
        xsHgYF: "8fbc8f",
        xUXe: "483d8b",
        xUWay: "2f4f4f",
        xUgYy: "2f4f4f",
        xQe: "ced1",
        xviTet: "9400d3",
        dAppRk: "ff1493",
        dApskyXe: "bfff",
        dimWay: "696969",
        dimgYy: "696969",
        dodgerXe: "1e90ff",
        fiYbrick: "b22222",
        flSOwEte: "fffaf0",
        foYstWAn: "228b22",
        fuKsia: "ff00ff",
        gaRsbSo: "dcdcdc",
        ghostwEte: "f8f8ff",
        gTd: "ffd700",
        gTMnPd: "daa520",
        Way: "808080",
        gYF: "8000",
        gYFLw: "adff2f",
        gYy: "808080",
        honeyMw: "f0fff0",
        hotpRk: "ff69b4",
        RdianYd: "cd5c5c",
        Rdigo: "4b0082",
        ivSy: "fffff0",
        khaki: "f0e68c",
        lavFMr: "e6e6fa",
        lavFMrXsh: "fff0f5",
        lawngYF: "7cfc00",
        NmoncEffon: "fffacd",
        ZXe: "add8e6",
        ZcSO: "f08080",
        Zcyan: "e0ffff",
        ZgTMnPdLw: "fafad2",
        ZWay: "d3d3d3",
        ZgYF: "90ee90",
        ZgYy: "d3d3d3",
        ZpRk: "ffb6c1",
        ZsOmon: "ffa07a",
        ZsHgYF: "20b2aa",
        ZskyXe: "87cefa",
        ZUWay: "778899",
        ZUgYy: "778899",
        ZstAlXe: "b0c4de",
        ZLw: "ffffe0",
        lime: "ff00",
        limegYF: "32cd32",
        lRF: "faf0e6",
        magFta: "ff00ff",
        maPon: "800000",
        VaquamarRe: "66cdaa",
        VXe: "cd",
        VScEd: "ba55d3",
        VpurpN: "9370db",
        VsHgYF: "3cb371",
        VUXe: "7b68ee",
        VsprRggYF: "fa9a",
        VQe: "48d1cc",
        VviTetYd: "c71585",
        midnightXe: "191970",
        mRtcYam: "f5fffa",
        mistyPse: "ffe4e1",
        moccasR: "ffe4b5",
        navajowEte: "ffdead",
        navy: "80",
        Tdlace: "fdf5e6",
        Tive: "808000",
        TivedBb: "6b8e23",
        Sange: "ffa500",
        SangeYd: "ff4500",
        ScEd: "da70d6",
        pOegTMnPd: "eee8aa",
        pOegYF: "98fb98",
        pOeQe: "afeeee",
        pOeviTetYd: "db7093",
        papayawEp: "ffefd5",
        pHKpuff: "ffdab9",
        peru: "cd853f",
        pRk: "ffc0cb",
        plum: "dda0dd",
        powMrXe: "b0e0e6",
        purpN: "800080",
        YbeccapurpN: "663399",
        Yd: "ff0000",
        Psybrown: "bc8f8f",
        PyOXe: "4169e1",
        saddNbPwn: "8b4513",
        sOmon: "fa8072",
        sandybPwn: "f4a460",
        sHgYF: "2e8b57",
        sHshell: "fff5ee",
        siFna: "a0522d",
        silver: "c0c0c0",
        skyXe: "87ceeb",
        UXe: "6a5acd",
        UWay: "708090",
        UgYy: "708090",
        snow: "fffafa",
        sprRggYF: "ff7f",
        stAlXe: "4682b4",
        tan: "d2b48c",
        teO: "8080",
        tEstN: "d8bfd8",
        tomato: "ff6347",
        Qe: "40e0d0",
        viTet: "ee82ee",
        JHt: "f5deb3",
        wEte: "ffffff",
        wEtesmoke: "f5f5f5",
        Lw: "ffff00",
        LwgYF: "9acd32"
    };

function Da() {
    const i = {},
        t = Object.keys(ss),
        e = Object.keys(ns);
    let n, s, o, r, a;
    for (n = 0; n < t.length; n++) {
        for (r = a = t[n], s = 0; s < e.length; s++) o = e[s], a = a.replace(o, ns[o]);
        o = parseInt(ss[r], 16), i[a] = [o >> 16 & 255, o >> 8 & 255, o & 255]
    }
    return i
}
let Ve;

function Ia(i) {
    Ve || (Ve = Da(), Ve.transparent = [0, 0, 0, 0]);
    const t = Ve[i.toLowerCase()];
    return t && {
        r: t[0],
        g: t[1],
        b: t[2],
        a: t.length === 4 ? t[3] : 255
    }
}
const Ta = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;

function La(i) {
    const t = Ta.exec(i);
    let e = 255,
        n, s, o;
    if (!!t) {
        if (t[7] !== n) {
            const r = +t[7];
            e = t[8] ? he(r) : dt(r * 255, 0, 255)
        }
        return n = +t[1], s = +t[3], o = +t[5], n = 255 & (t[2] ? he(n) : dt(n, 0, 255)), s = 255 & (t[4] ? he(s) : dt(s, 0, 255)), o = 255 & (t[6] ? he(o) : dt(o, 0, 255)), {
            r: n,
            g: s,
            b: o,
            a: e
        }
    }
}

function Ra(i) {
    return i && (i.a < 255 ? `rgba(${i.r}, ${i.g}, ${i.b}, ${ot(i.a)})` : `rgb(${i.r}, ${i.g}, ${i.b})`)
}
const Vi = i => i <= .0031308 ? i * 12.92 : Math.pow(i, 1 / 2.4) * 1.055 - .055,
    Bt = i => i <= .04045 ? i / 12.92 : Math.pow((i + .055) / 1.055, 2.4);

function Fa(i, t, e) {
    const n = Bt(ot(i.r)),
        s = Bt(ot(i.g)),
        o = Bt(ot(i.b));
    return {
        r: ft(Vi(n + e * (Bt(ot(t.r)) - n))),
        g: ft(Vi(s + e * (Bt(ot(t.g)) - s))),
        b: ft(Vi(o + e * (Bt(ot(t.b)) - o))),
        a: i.a + e * (t.a - i.a)
    }
}

function He(i, t, e) {
    if (i) {
        let n = Mn(i);
        n[t] = Math.max(0, Math.min(n[t] + n[t] * e, t === 0 ? 360 : 1)), n = On(n), i.r = n[0], i.g = n[1], i.b = n[2]
    }
}

function qo(i, t) {
    return i && Object.assign(t || {}, i)
}

function os(i) {
    var t = {
        r: 0,
        g: 0,
        b: 0,
        a: 255
    };
    return Array.isArray(i) ? i.length >= 3 && (t = {
        r: i[0],
        g: i[1],
        b: i[2],
        a: 255
    }, i.length > 3 && (t.a = ft(i[3]))) : (t = qo(i, {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    }), t.a = ft(t.a)), t
}

function Na(i) {
    return i.charAt(0) === "r" ? La(i) : $a(i)
}
class ke {
    constructor(t) {
        if (t instanceof ke) return t;
        const e = typeof t;
        let n;
        e === "object" ? n = os(t) : e === "string" && (n = xa(t) || Ia(t) || Na(t)), this._rgb = n, this._valid = !!n
    }
    get valid() {
        return this._valid
    }
    get rgb() {
        var t = qo(this._rgb);
        return t && (t.a = ot(t.a)), t
    }
    set rgb(t) {
        this._rgb = os(t)
    }
    rgbString() {
        return this._valid ? Ra(this._rgb) : void 0
    }
    hexString() {
        return this._valid ? wa(this._rgb) : void 0
    }
    hslString() {
        return this._valid ? Ea(this._rgb) : void 0
    }
    mix(t, e) {
        if (t) {
            const n = this.rgb,
                s = t.rgb;
            let o;
            const r = e === o ? .5 : e,
                a = 2 * r - 1,
                c = n.a - s.a,
                l = ((a * c === -1 ? a : (a + c) / (1 + a * c)) + 1) / 2;
            o = 1 - l, n.r = 255 & l * n.r + o * s.r + .5, n.g = 255 & l * n.g + o * s.g + .5, n.b = 255 & l * n.b + o * s.b + .5, n.a = r * n.a + (1 - r) * s.a, this.rgb = n
        }
        return this
    }
    interpolate(t, e) {
        return t && (this._rgb = Fa(this._rgb, t._rgb, e)), this
    }
    clone() {
        return new ke(this.rgb)
    }
    alpha(t) {
        return this._rgb.a = ft(t), this
    }
    clearer(t) {
        const e = this._rgb;
        return e.a *= 1 - t, this
    }
    greyscale() {
        const t = this._rgb,
            e = Ie(t.r * .3 + t.g * .59 + t.b * .11);
        return t.r = t.g = t.b = e, this
    }
    opaquer(t) {
        const e = this._rgb;
        return e.a *= 1 + t, this
    }
    negate() {
        const t = this._rgb;
        return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this
    }
    lighten(t) {
        return He(this._rgb, 2, t), this
    }
    darken(t) {
        return He(this._rgb, 2, -t), this
    }
    saturate(t) {
        return He(this._rgb, 1, t), this
    }
    desaturate(t) {
        return He(this._rgb, 1, -t), this
    }
    rotate(t) {
        return Aa(this._rgb, t), this
    }
}
const za = (() => {
    let i = 0;
    return () => i++
})();

function E(i) {
    return i === null || typeof i == "undefined"
}

function R(i) {
    if (Array.isArray && Array.isArray(i)) return !0;
    const t = Object.prototype.toString.call(i);
    return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]"
}

function P(i) {
    return i !== null && Object.prototype.toString.call(i) === "[object Object]"
}

function j(i) {
    return (typeof i == "number" || i instanceof Number) && isFinite(+i)
}

function q(i, t) {
    return j(i) ? i : t
}

function A(i, t) {
    return typeof i == "undefined" ? t : i
}
const ja = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 : +i / t,
    Xo = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 * t : +i;

function D(i, t, e) {
    if (i && typeof i.call == "function") return i.apply(e, t)
}

function H(i, t, e, n) {
    let s, o, r;
    if (R(i))
        if (o = i.length, n)
            for (s = o - 1; s >= 0; s--) t.call(e, i[s], s);
        else
            for (s = 0; s < o; s++) t.call(e, i[s], s);
    else if (P(i))
        for (r = Object.keys(i), o = r.length, s = 0; s < o; s++) t.call(e, i[r[s]], r[s])
}

function rs(i, t) {
    let e, n, s, o;
    if (!i || !t || i.length !== t.length) return !1;
    for (e = 0, n = i.length; e < n; ++e)
        if (s = i[e], o = t[e], s.datasetIndex !== o.datasetIndex || s.index !== o.index) return !1;
    return !0
}

function fi(i) {
    if (R(i)) return i.map(fi);
    if (P(i)) {
        const t = Object.create(null),
            e = Object.keys(i),
            n = e.length;
        let s = 0;
        for (; s < n; ++s) t[e[s]] = fi(i[e[s]]);
        return t
    }
    return i
}

function Ko(i) {
    return ["__proto__", "prototype", "constructor"].indexOf(i) === -1
}

function Ba(i, t, e, n) {
    if (!Ko(i)) return;
    const s = t[i],
        o = e[i];
    P(s) && P(o) ? Se(s, o, n) : t[i] = fi(o)
}

function Se(i, t, e) {
    const n = R(t) ? t : [t],
        s = n.length;
    if (!P(i)) return i;
    e = e || {};
    const o = e.merger || Ba;
    let r;
    for (let a = 0; a < s; ++a) {
        if (r = n[a], !P(r)) continue;
        const c = Object.keys(r);
        for (let l = 0, h = c.length; l < h; ++l) o(c[l], i, r, e)
    }
    return i
}

function pe(i, t) {
    return Se(i, t, {
        merger: Va
    })
}

function Va(i, t, e) {
    if (!Ko(i)) return;
    const n = t[i],
        s = e[i];
    P(n) && P(s) ? pe(n, s) : Object.prototype.hasOwnProperty.call(t, i) || (t[i] = fi(s))
}
const as = {
    "": i => i,
    x: i => i.x,
    y: i => i.y
};

function Ha(i) {
    const t = i.split("."),
        e = [];
    let n = "";
    for (const s of t) n += s, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (e.push(n), n = "");
    return e
}

function Wa(i) {
    const t = Ha(i);
    return e => {
        for (const n of t) {
            if (n === "") break;
            e = e && e[n]
        }
        return e
    }
}

function Yt(i, t) {
    return (as[t] || (as[t] = Wa(t)))(i)
}

function Pn(i) {
    return i.charAt(0).toUpperCase() + i.slice(1)
}
const pi = i => typeof i != "undefined",
    pt = i => typeof i == "function",
    cs = (i, t) => {
        if (i.size !== t.size) return !1;
        for (const e of i)
            if (!t.has(e)) return !1;
        return !0
    };

function Ua(i) {
    return i.type === "mouseup" || i.type === "click" || i.type === "contextmenu"
}
const N = Math.PI,
    V = 2 * N,
    Ya = V + N,
    gi = Number.POSITIVE_INFINITY,
    qa = N / 180,
    W = N / 2,
    xt = N / 4,
    ls = N * 2 / 3,
    ut = Math.log10,
    qt = Math.sign;

function ge(i, t, e) {
    return Math.abs(i - t) < e
}

function hs(i) {
    const t = Math.round(i);
    i = ge(i, t, i / 1e3) ? t : i;
    const e = Math.pow(10, Math.floor(ut(i))),
        n = i / e;
    return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * e
}

function Xa(i) {
    const t = [],
        e = Math.sqrt(i);
    let n;
    for (n = 1; n < e; n++) i % n === 0 && (t.push(n), t.push(i / n));
    return e === (e | 0) && t.push(e), t.sort((s, o) => s - o).pop(), t
}

function Me(i) {
    return !isNaN(parseFloat(i)) && isFinite(i)
}

function Ka(i, t) {
    const e = Math.round(i);
    return e - t <= i && e + t >= i
}

function Go(i, t, e) {
    let n, s, o;
    for (n = 0, s = i.length; n < s; n++) o = i[n][e], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o))
}

function Z(i) {
    return i * (N / 180)
}

function $n(i) {
    return i * (180 / N)
}

function ds(i) {
    if (!j(i)) return;
    let t = 1,
        e = 0;
    for (; Math.round(i * t) / t !== i;) t *= 10, e++;
    return e
}

function Ga(i, t) {
    const e = t.x - i.x,
        n = t.y - i.y,
        s = Math.sqrt(e * e + n * n);
    let o = Math.atan2(n, e);
    return o < -.5 * N && (o += V), {
        angle: o,
        distance: s
    }
}

function us(i, t) {
    return Math.sqrt(Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2))
}

function Qa(i, t) {
    return (i - t + Ya) % V - N
}

function Q(i) {
    return (i % V + V) % V
}

function mi(i, t, e, n) {
    const s = Q(i),
        o = Q(t),
        r = Q(e),
        a = Q(o - s),
        c = Q(r - s),
        l = Q(s - o),
        h = Q(s - r);
    return s === o || s === r || n && o === r || a > c && l < h
}

function it(i, t, e) {
    return Math.max(t, Math.min(e, i))
}

function Za(i) {
    return it(i, -32768, 32767)
}

function Ja(i, t, e, n = 1e-6) {
    return i >= Math.min(t, e) - n && i <= Math.max(t, e) + n
}

function An(i, t, e) {
    e = e || (r => i[r] < t);
    let n = i.length - 1,
        s = 0,
        o;
    for (; n - s > 1;) o = s + n >> 1, e(o) ? s = o : n = o;
    return {
        lo: s,
        hi: n
    }
}
const Ot = (i, t, e, n) => An(i, e, n ? s => {
        const o = i[s][t];
        return o < e || o === e && i[s + 1][t] === e
    } : s => i[s][t] < e),
    tc = (i, t, e) => An(i, e, n => i[n][t] >= e);

function ec(i, t, e) {
    let n = 0,
        s = i.length;
    for (; n < s && i[n] < t;) n++;
    for (; s > n && i[s - 1] > e;) s--;
    return n > 0 || s < i.length ? i.slice(n, s) : i
}
const Qo = ["push", "pop", "shift", "splice", "unshift"];

function ic(i, t) {
    if (i._chartjs) {
        i._chartjs.listeners.push(t);
        return
    }
    Object.defineProperty(i, "_chartjs", {
        configurable: !0,
        enumerable: !1,
        value: {
            listeners: [t]
        }
    }), Qo.forEach(e => {
        const n = "_onData" + Pn(e),
            s = i[e];
        Object.defineProperty(i, e, {
            configurable: !0,
            enumerable: !1,
            value(...o) {
                const r = s.apply(this, o);
                return i._chartjs.listeners.forEach(a => {
                    typeof a[n] == "function" && a[n](...o)
                }), r
            }
        })
    })
}

function fs(i, t) {
    const e = i._chartjs;
    if (!e) return;
    const n = e.listeners,
        s = n.indexOf(t);
    s !== -1 && n.splice(s, 1), !(n.length > 0) && (Qo.forEach(o => {
        delete i[o]
    }), delete i._chartjs)
}

function nc(i) {
    const t = new Set(i);
    return t.size === i.length ? i : Array.from(t)
}
const Zo = function() {
    return typeof window == "undefined" ? function(i) {
        return i()
    } : window.requestAnimationFrame
}();

function Jo(i, t) {
    let e = [],
        n = !1;
    return function(...s) {
        e = s, n || (n = !0, Zo.call(window, () => {
            n = !1, i.apply(t, e)
        }))
    }
}

function sc(i, t) {
    let e;
    return function(...n) {
        return t ? (clearTimeout(e), e = setTimeout(i, t, n)) : i.apply(this, n), t
    }
}
const oc = i => i === "start" ? "left" : i === "end" ? "right" : "center",
    ps = (i, t, e) => i === "start" ? t : i === "end" ? e : (t + e) / 2;

function rc(i, t, e) {
    const n = t.length;
    let s = 0,
        o = n;
    if (i._sorted) {
        const {
            iScale: r,
            _parsed: a
        } = i, c = r.axis, {
            min: l,
            max: h,
            minDefined: d,
            maxDefined: u
        } = r.getUserBounds();
        d && (s = it(Math.min(Ot(a, c, l).lo, e ? n : Ot(t, c, r.getPixelForValue(l)).lo), 0, n - 1)), u ? o = it(Math.max(Ot(a, r.axis, h, !0).hi + 1, e ? 0 : Ot(t, c, r.getPixelForValue(h), !0).hi + 1), s, n) - s : o = n - s
    }
    return {
        start: s,
        count: o
    }
}

function ac(i) {
    const {
        xScale: t,
        yScale: e,
        _scaleRanges: n
    } = i, s = {
        xmin: t.min,
        xmax: t.max,
        ymin: e.min,
        ymax: e.max
    };
    if (!n) return i._scaleRanges = s, !0;
    const o = n.xmin !== t.min || n.xmax !== t.max || n.ymin !== e.min || n.ymax !== e.max;
    return Object.assign(n, s), o
}
const We = i => i === 0 || i === 1,
    gs = (i, t, e) => -(Math.pow(2, 10 * (i -= 1)) * Math.sin((i - t) * V / e)),
    ms = (i, t, e) => Math.pow(2, -10 * i) * Math.sin((i - t) * V / e) + 1,
    me = {
        linear: i => i,
        easeInQuad: i => i * i,
        easeOutQuad: i => -i * (i - 2),
        easeInOutQuad: i => (i /= .5) < 1 ? .5 * i * i : -.5 * (--i * (i - 2) - 1),
        easeInCubic: i => i * i * i,
        easeOutCubic: i => (i -= 1) * i * i + 1,
        easeInOutCubic: i => (i /= .5) < 1 ? .5 * i * i * i : .5 * ((i -= 2) * i * i + 2),
        easeInQuart: i => i * i * i * i,
        easeOutQuart: i => -((i -= 1) * i * i * i - 1),
        easeInOutQuart: i => (i /= .5) < 1 ? .5 * i * i * i * i : -.5 * ((i -= 2) * i * i * i - 2),
        easeInQuint: i => i * i * i * i * i,
        easeOutQuint: i => (i -= 1) * i * i * i * i + 1,
        easeInOutQuint: i => (i /= .5) < 1 ? .5 * i * i * i * i * i : .5 * ((i -= 2) * i * i * i * i + 2),
        easeInSine: i => -Math.cos(i * W) + 1,
        easeOutSine: i => Math.sin(i * W),
        easeInOutSine: i => -.5 * (Math.cos(N * i) - 1),
        easeInExpo: i => i === 0 ? 0 : Math.pow(2, 10 * (i - 1)),
        easeOutExpo: i => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1,
        easeInOutExpo: i => We(i) ? i : i < .5 ? .5 * Math.pow(2, 10 * (i * 2 - 1)) : .5 * (-Math.pow(2, -10 * (i * 2 - 1)) + 2),
        easeInCirc: i => i >= 1 ? i : -(Math.sqrt(1 - i * i) - 1),
        easeOutCirc: i => Math.sqrt(1 - (i -= 1) * i),
        easeInOutCirc: i => (i /= .5) < 1 ? -.5 * (Math.sqrt(1 - i * i) - 1) : .5 * (Math.sqrt(1 - (i -= 2) * i) + 1),
        easeInElastic: i => We(i) ? i : gs(i, .075, .3),
        easeOutElastic: i => We(i) ? i : ms(i, .075, .3),
        easeInOutElastic(i) {
            return We(i) ? i : i < .5 ? .5 * gs(i * 2, .1125, .45) : .5 + .5 * ms(i * 2 - 1, .1125, .45)
        },
        easeInBack(i) {
            return i * i * ((1.70158 + 1) * i - 1.70158)
        },
        easeOutBack(i) {
            return (i -= 1) * i * ((1.70158 + 1) * i + 1.70158) + 1
        },
        easeInOutBack(i) {
            let t = 1.70158;
            return (i /= .5) < 1 ? .5 * (i * i * (((t *= 1.525) + 1) * i - t)) : .5 * ((i -= 2) * i * (((t *= 1.525) + 1) * i + t) + 2)
        },
        easeInBounce: i => 1 - me.easeOutBounce(1 - i),
        easeOutBounce(i) {
            return i < 1 / 2.75 ? 7.5625 * i * i : i < 2 / 2.75 ? 7.5625 * (i -= 1.5 / 2.75) * i + .75 : i < 2.5 / 2.75 ? 7.5625 * (i -= 2.25 / 2.75) * i + .9375 : 7.5625 * (i -= 2.625 / 2.75) * i + .984375
        },
        easeInOutBounce: i => i < .5 ? me.easeInBounce(i * 2) * .5 : me.easeOutBounce(i * 2 - 1) * .5 + .5
    };

function En(i) {
    if (i && typeof i == "object") {
        const t = i.toString();
        return t === "[object CanvasPattern]" || t === "[object CanvasGradient]"
    }
    return !1
}

function bs(i) {
    return En(i) ? i : new ke(i)
}

function Hi(i) {
    return En(i) ? i : new ke(i).saturate(.5).darken(.1).hexString()
}
const cc = ["x", "y", "borderWidth", "radius", "tension"],
    lc = ["color", "borderColor", "backgroundColor"];

function hc(i) {
    i.set("animation", {
        delay: void 0,
        duration: 1e3,
        easing: "easeOutQuart",
        fn: void 0,
        from: void 0,
        loop: void 0,
        to: void 0,
        type: void 0
    }), i.describe("animation", {
        _fallback: !1,
        _indexable: !1,
        _scriptable: t => t !== "onProgress" && t !== "onComplete" && t !== "fn"
    }), i.set("animations", {
        colors: {
            type: "color",
            properties: lc
        },
        numbers: {
            type: "number",
            properties: cc
        }
    }), i.describe("animations", {
        _fallback: "animation"
    }), i.set("transitions", {
        active: {
            animation: {
                duration: 400
            }
        },
        resize: {
            animation: {
                duration: 0
            }
        },
        show: {
            animations: {
                colors: {
                    from: "transparent"
                },
                visible: {
                    type: "boolean",
                    duration: 0
                }
            }
        },
        hide: {
            animations: {
                colors: {
                    to: "transparent"
                },
                visible: {
                    type: "boolean",
                    easing: "linear",
                    fn: t => t | 0
                }
            }
        }
    })
}

function dc(i) {
    i.set("layout", {
        autoPadding: !0,
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    })
}
const _s = new Map;

function uc(i, t) {
    t = t || {};
    const e = i + JSON.stringify(t);
    let n = _s.get(e);
    return n || (n = new Intl.NumberFormat(i, t), _s.set(e, n)), n
}

function Te(i, t, e) {
    return uc(t, e).format(i)
}
const tr = {
    values(i) {
        return R(i) ? i : "" + i
    },
    numeric(i, t, e) {
        if (i === 0) return "0";
        const n = this.chart.options.locale;
        let s, o = i;
        if (e.length > 1) {
            const l = Math.max(Math.abs(e[0].value), Math.abs(e[e.length - 1].value));
            (l < 1e-4 || l > 1e15) && (s = "scientific"), o = fc(i, e)
        }
        const r = ut(Math.abs(o)),
            a = isNaN(r) ? 1 : Math.max(Math.min(-1 * Math.floor(r), 20), 0),
            c = {
                notation: s,
                minimumFractionDigits: a,
                maximumFractionDigits: a
            };
        return Object.assign(c, this.options.ticks.format), Te(i, n, c)
    },
    logarithmic(i, t, e) {
        if (i === 0) return "0";
        const n = e[t].significand || i / Math.pow(10, Math.floor(ut(i)));
        return [1, 2, 3, 5, 10, 15].includes(n) || t > .8 * e.length ? tr.numeric.call(this, i, t, e) : ""
    }
};

function fc(i, t) {
    let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
    return Math.abs(e) >= 1 && i !== Math.floor(i) && (e = i - Math.floor(i)), e
}
var Pi = {
    formatters: tr
};

function pc(i) {
    i.set("scale", {
        display: !0,
        offset: !1,
        reverse: !1,
        beginAtZero: !1,
        bounds: "ticks",
        clip: !0,
        grace: 0,
        grid: {
            display: !0,
            lineWidth: 1,
            drawOnChartArea: !0,
            drawTicks: !0,
            tickLength: 8,
            tickWidth: (t, e) => e.lineWidth,
            tickColor: (t, e) => e.color,
            offset: !1
        },
        border: {
            display: !0,
            dash: [],
            dashOffset: 0,
            width: 1
        },
        title: {
            display: !1,
            text: "",
            padding: {
                top: 4,
                bottom: 4
            }
        },
        ticks: {
            minRotation: 0,
            maxRotation: 50,
            mirror: !1,
            textStrokeWidth: 0,
            textStrokeColor: "",
            padding: 3,
            display: !0,
            autoSkip: !0,
            autoSkipPadding: 3,
            labelOffset: 0,
            callback: Pi.formatters.values,
            minor: {},
            major: {},
            align: "center",
            crossAlign: "near",
            showLabelBackdrop: !1,
            backdropColor: "rgba(255, 255, 255, 0.75)",
            backdropPadding: 2
        }
    }), i.route("scale.ticks", "color", "", "color"), i.route("scale.grid", "color", "", "borderColor"), i.route("scale.border", "color", "", "borderColor"), i.route("scale.title", "color", "", "color"), i.describe("scale", {
        _fallback: !1,
        _scriptable: t => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
        _indexable: t => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
    }), i.describe("scales", {
        _fallback: "scale"
    }), i.describe("scale.ticks", {
        _scriptable: t => t !== "backdropPadding" && t !== "callback",
        _indexable: t => t !== "backdropPadding"
    })
}
const Dt = Object.create(null),
    on = Object.create(null);

function be(i, t) {
    if (!t) return i;
    const e = t.split(".");
    for (let n = 0, s = e.length; n < s; ++n) {
        const o = e[n];
        i = i[o] || (i[o] = Object.create(null))
    }
    return i
}

function Wi(i, t, e) {
    return typeof t == "string" ? Se(be(i, t), e) : Se(be(i, ""), t)
}
class gc {
    constructor(t, e) {
        this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = n => n.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = ["mousemove", "mouseout", "click", "touchstart", "touchmove"], this.font = {
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            size: 12,
            style: "normal",
            lineHeight: 1.2,
            weight: null
        }, this.hover = {}, this.hoverBackgroundColor = (n, s) => Hi(s.backgroundColor), this.hoverBorderColor = (n, s) => Hi(s.borderColor), this.hoverColor = (n, s) => Hi(s.color), this.indexAxis = "x", this.interaction = {
            mode: "nearest",
            intersect: !0,
            includeInvisible: !1
        }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(e)
    }
    set(t, e) {
        return Wi(this, t, e)
    }
    get(t) {
        return be(this, t)
    }
    describe(t, e) {
        return Wi(on, t, e)
    }
    override(t, e) {
        return Wi(Dt, t, e)
    }
    route(t, e, n, s) {
        const o = be(this, t),
            r = be(this, n),
            a = "_" + e;
        Object.defineProperties(o, {
            [a]: {
                value: o[e],
                writable: !0
            },
            [e]: {
                enumerable: !0,
                get() {
                    const c = this[a],
                        l = r[s];
                    return P(c) ? Object.assign({}, l, c) : A(c, l)
                },
                set(c) {
                    this[a] = c
                }
            }
        })
    }
    apply(t) {
        t.forEach(e => e(this))
    }
}
var F = new gc({
    _scriptable: i => !i.startsWith("on"),
    _indexable: i => i !== "events",
    hover: {
        _fallback: "interaction"
    },
    interaction: {
        _scriptable: !1,
        _indexable: !1
    }
}, [hc, dc, pc]);

function mc(i) {
    return !i || E(i.size) || E(i.family) ? null : (i.style ? i.style + " " : "") + (i.weight ? i.weight + " " : "") + i.size + "px " + i.family
}

function bi(i, t, e, n, s) {
    let o = t[s];
    return o || (o = t[s] = i.measureText(s).width, e.push(s)), o > n && (n = o), n
}

function bc(i, t, e, n) {
    n = n || {};
    let s = n.data = n.data || {},
        o = n.garbageCollect = n.garbageCollect || [];
    n.font !== t && (s = n.data = {}, o = n.garbageCollect = [], n.font = t), i.save(), i.font = t;
    let r = 0;
    const a = e.length;
    let c, l, h, d, u;
    for (c = 0; c < a; c++)
        if (d = e[c], d != null && !R(d)) r = bi(i, s, o, r, d);
        else if (R(d))
        for (l = 0, h = d.length; l < h; l++) u = d[l], u != null && !R(u) && (r = bi(i, s, o, r, u));
    i.restore();
    const f = o.length / 2;
    if (f > e.length) {
        for (c = 0; c < f; c++) delete s[o[c]];
        o.splice(0, f)
    }
    return r
}

function vt(i, t, e) {
    const n = i.currentDevicePixelRatio,
        s = e !== 0 ? Math.max(e / 2, .5) : 0;
    return Math.round((t - s) * n) / n + s
}

function ys(i, t) {
    t = t || i.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, i.width, i.height), t.restore()
}

function _c(i, t, e, n) {
    yc(i, t, e, n, null)
}

function yc(i, t, e, n, s) {
    let o, r, a, c, l, h, d, u;
    const f = t.pointStyle,
        p = t.rotation,
        g = t.radius;
    let m = (p || 0) * qa;
    if (f && typeof f == "object" && (o = f.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
        i.save(), i.translate(e, n), i.rotate(m), i.drawImage(f, -f.width / 2, -f.height / 2, f.width, f.height), i.restore();
        return
    }
    if (!(isNaN(g) || g <= 0)) {
        switch (i.beginPath(), f) {
            default: s ? i.ellipse(e, n, s / 2, g, 0, 0, V) : i.arc(e, n, g, 0, V),
            i.closePath();
            break;
            case "triangle":
                    h = s ? s / 2 : g,
                i.moveTo(e + Math.sin(m) * h, n - Math.cos(m) * g),
                m += ls,
                i.lineTo(e + Math.sin(m) * h, n - Math.cos(m) * g),
                m += ls,
                i.lineTo(e + Math.sin(m) * h, n - Math.cos(m) * g),
                i.closePath();
                break;
            case "rectRounded":
                    l = g * .516,
                c = g - l,
                r = Math.cos(m + xt) * c,
                d = Math.cos(m + xt) * (s ? s / 2 - l : c),
                a = Math.sin(m + xt) * c,
                u = Math.sin(m + xt) * (s ? s / 2 - l : c),
                i.arc(e - d, n - a, l, m - N, m - W),
                i.arc(e + u, n - r, l, m - W, m),
                i.arc(e + d, n + a, l, m, m + W),
                i.arc(e - u, n + r, l, m + W, m + N),
                i.closePath();
                break;
            case "rect":
                    if (!p) {
                    c = Math.SQRT1_2 * g, h = s ? s / 2 : c, i.rect(e - h, n - c, 2 * h, 2 * c);
                    break
                }m += xt;
            case "rectRot":
                    d = Math.cos(m) * (s ? s / 2 : g),
                r = Math.cos(m) * g,
                a = Math.sin(m) * g,
                u = Math.sin(m) * (s ? s / 2 : g),
                i.moveTo(e - d, n - a),
                i.lineTo(e + u, n - r),
                i.lineTo(e + d, n + a),
                i.lineTo(e - u, n + r),
                i.closePath();
                break;
            case "crossRot":
                    m += xt;
            case "cross":
                    d = Math.cos(m) * (s ? s / 2 : g),
                r = Math.cos(m) * g,
                a = Math.sin(m) * g,
                u = Math.sin(m) * (s ? s / 2 : g),
                i.moveTo(e - d, n - a),
                i.lineTo(e + d, n + a),
                i.moveTo(e + u, n - r),
                i.lineTo(e - u, n + r);
                break;
            case "star":
                    d = Math.cos(m) * (s ? s / 2 : g),
                r = Math.cos(m) * g,
                a = Math.sin(m) * g,
                u = Math.sin(m) * (s ? s / 2 : g),
                i.moveTo(e - d, n - a),
                i.lineTo(e + d, n + a),
                i.moveTo(e + u, n - r),
                i.lineTo(e - u, n + r),
                m += xt,
                d = Math.cos(m) * (s ? s / 2 : g),
                r = Math.cos(m) * g,
                a = Math.sin(m) * g,
                u = Math.sin(m) * (s ? s / 2 : g),
                i.moveTo(e - d, n - a),
                i.lineTo(e + d, n + a),
                i.moveTo(e + u, n - r),
                i.lineTo(e - u, n + r);
                break;
            case "line":
                    r = s ? s / 2 : Math.cos(m) * g,
                a = Math.sin(m) * g,
                i.moveTo(e - r, n - a),
                i.lineTo(e + r, n + a);
                break;
            case "dash":
                    i.moveTo(e, n),
                i.lineTo(e + Math.cos(m) * (s ? s / 2 : g), n + Math.sin(m) * g);
                break;
            case !1:
                    i.closePath();
                break
        }
        i.fill(), t.borderWidth > 0 && i.stroke()
    }
}

function at(i, t, e) {
    return e = e || .5, !t || i && i.x > t.left - e && i.x < t.right + e && i.y > t.top - e && i.y < t.bottom + e
}

function er(i, t) {
    i.save(), i.beginPath(), i.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), i.clip()
}

function ir(i) {
    i.restore()
}

function xc(i, t, e, n, s) {
    if (!t) return i.lineTo(e.x, e.y);
    if (s === "middle") {
        const o = (t.x + e.x) / 2;
        i.lineTo(o, t.y), i.lineTo(o, e.y)
    } else s === "after" != !!n ? i.lineTo(t.x, e.y) : i.lineTo(e.x, t.y);
    i.lineTo(e.x, e.y)
}

function vc(i, t, e, n) {
    if (!t) return i.lineTo(e.x, e.y);
    i.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? e.cp2x : e.cp1x, n ? e.cp2y : e.cp1y, e.x, e.y)
}

function wc(i, t) {
    t.translation && i.translate(t.translation[0], t.translation[1]), E(t.rotation) || i.rotate(t.rotation), t.color && (i.fillStyle = t.color), t.textAlign && (i.textAlign = t.textAlign), t.textBaseline && (i.textBaseline = t.textBaseline)
}

function kc(i, t, e, n, s) {
    if (s.strikethrough || s.underline) {
        const o = i.measureText(n),
            r = t - o.actualBoundingBoxLeft,
            a = t + o.actualBoundingBoxRight,
            c = e - o.actualBoundingBoxAscent,
            l = e + o.actualBoundingBoxDescent,
            h = s.strikethrough ? (c + l) / 2 : l;
        i.strokeStyle = i.fillStyle, i.beginPath(), i.lineWidth = s.decorationWidth || 2, i.moveTo(r, h), i.lineTo(a, h), i.stroke()
    }
}

function Sc(i, t) {
    const e = i.fillStyle;
    i.fillStyle = t.color, i.fillRect(t.left, t.top, t.width, t.height), i.fillStyle = e
}

function _i(i, t, e, n, s, o = {}) {
    const r = R(t) ? t : [t],
        a = o.strokeWidth > 0 && o.strokeColor !== "";
    let c, l;
    for (i.save(), i.font = s.string, wc(i, o), c = 0; c < r.length; ++c) l = r[c], o.backdrop && Sc(i, o.backdrop), a && (o.strokeColor && (i.strokeStyle = o.strokeColor), E(o.strokeWidth) || (i.lineWidth = o.strokeWidth), i.strokeText(l, e, n, o.maxWidth)), i.fillText(l, e, n, o.maxWidth), kc(i, e, n, l, o), n += Number(s.lineHeight);
    i.restore()
}

function Mc(i, t) {
    const {
        x: e,
        y: n,
        w: s,
        h: o,
        radius: r
    } = t;
    i.arc(e + r.topLeft, n + r.topLeft, r.topLeft, 1.5 * N, N, !0), i.lineTo(e, n + o - r.bottomLeft), i.arc(e + r.bottomLeft, n + o - r.bottomLeft, r.bottomLeft, N, W, !0), i.lineTo(e + s - r.bottomRight, n + o), i.arc(e + s - r.bottomRight, n + o - r.bottomRight, r.bottomRight, W, 0, !0), i.lineTo(e + s, n + r.topRight), i.arc(e + s - r.topRight, n + r.topRight, r.topRight, 0, -W, !0), i.lineTo(e + r.topLeft, n)
}
const Cc = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,
    Oc = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;

function Pc(i, t) {
    const e = ("" + i).match(Cc);
    if (!e || e[1] === "normal") return t * 1.2;
    switch (i = +e[2], e[3]) {
        case "px":
            return i;
        case "%":
            i /= 100;
            break
    }
    return t * i
}
const $c = i => +i || 0;

function nr(i, t) {
    const e = {},
        n = P(t),
        s = n ? Object.keys(t) : t,
        o = P(i) ? n ? r => A(i[r], i[t[r]]) : r => i[r] : () => i;
    for (const r of s) e[r] = $c(o(r));
    return e
}

function Ac(i) {
    return nr(i, {
        top: "y",
        right: "x",
        bottom: "y",
        left: "x"
    })
}

function Ec(i) {
    return nr(i, ["topLeft", "topRight", "bottomLeft", "bottomRight"])
}

function ct(i) {
    const t = Ac(i);
    return t.width = t.left + t.right, t.height = t.top + t.bottom, t
}

function Xt(i, t) {
    i = i || {}, t = t || F.font;
    let e = A(i.size, t.size);
    typeof e == "string" && (e = parseInt(e, 10));
    let n = A(i.style, t.style);
    n && !("" + n).match(Oc) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
    const s = {
        family: A(i.family, t.family),
        lineHeight: Pc(A(i.lineHeight, t.lineHeight), e),
        size: e,
        style: n,
        weight: A(i.weight, t.weight),
        string: ""
    };
    return s.string = mc(s), s
}

function Ue(i, t, e, n) {
    let s = !0,
        o, r, a;
    for (o = 0, r = i.length; o < r; ++o)
        if (a = i[o], a !== void 0 && (t !== void 0 && typeof a == "function" && (a = a(t), s = !1), e !== void 0 && R(a) && (a = a[e % a.length], s = !1), a !== void 0)) return n && !s && (n.cacheable = !1), a
}

function Dc(i, t, e) {
    const {
        min: n,
        max: s
    } = i, o = Xo(t, (s - n) / 2), r = (a, c) => e && a === 0 ? 0 : a + c;
    return {
        min: r(n, -Math.abs(o)),
        max: r(s, o)
    }
}

function Ft(i, t) {
    return Object.assign(Object.create(i), t)
}

function Dn(i, t = [""], e, n, s = () => i[0]) {
    const o = e || i;
    typeof n == "undefined" && (n = ar("_fallback", i));
    const r = {
        [Symbol.toStringTag]: "Object",
        _cacheable: !0,
        _scopes: i,
        _rootScopes: o,
        _fallback: n,
        _getTarget: s,
        override: a => Dn([a, ...i], t, o, n)
    };
    return new Proxy(r, {
        deleteProperty(a, c) {
            return delete a[c], delete a._keys, delete i[0][c], !0
        },
        get(a, c) {
            return or(a, c, () => jc(c, t, i, a))
        },
        getOwnPropertyDescriptor(a, c) {
            return Reflect.getOwnPropertyDescriptor(a._scopes[0], c)
        },
        getPrototypeOf() {
            return Reflect.getPrototypeOf(i[0])
        },
        has(a, c) {
            return vs(a).includes(c)
        },
        ownKeys(a) {
            return vs(a)
        },
        set(a, c, l) {
            const h = a._storage || (a._storage = s());
            return a[c] = h[c] = l, delete a._keys, !0
        }
    })
}

function Kt(i, t, e, n) {
    const s = {
        _cacheable: !1,
        _proxy: i,
        _context: t,
        _subProxy: e,
        _stack: new Set,
        _descriptors: sr(i, n),
        setContext: o => Kt(i, o, e, n),
        override: o => Kt(i.override(o), t, e, n)
    };
    return new Proxy(s, {
        deleteProperty(o, r) {
            return delete o[r], delete i[r], !0
        },
        get(o, r, a) {
            return or(o, r, () => Tc(o, r, a))
        },
        getOwnPropertyDescriptor(o, r) {
            return o._descriptors.allKeys ? Reflect.has(i, r) ? {
                enumerable: !0,
                configurable: !0
            } : void 0 : Reflect.getOwnPropertyDescriptor(i, r)
        },
        getPrototypeOf() {
            return Reflect.getPrototypeOf(i)
        },
        has(o, r) {
            return Reflect.has(i, r)
        },
        ownKeys() {
            return Reflect.ownKeys(i)
        },
        set(o, r, a) {
            return i[r] = a, delete o[r], !0
        }
    })
}

function sr(i, t = {
    scriptable: !0,
    indexable: !0
}) {
    const {
        _scriptable: e = t.scriptable,
        _indexable: n = t.indexable,
        _allKeys: s = t.allKeys
    } = i;
    return {
        allKeys: s,
        scriptable: e,
        indexable: n,
        isScriptable: pt(e) ? e : () => e,
        isIndexable: pt(n) ? n : () => n
    }
}
const Ic = (i, t) => i ? i + Pn(t) : t,
    In = (i, t) => P(t) && i !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);

function or(i, t, e) {
    if (Object.prototype.hasOwnProperty.call(i, t)) return i[t];
    const n = e();
    return i[t] = n, n
}

function Tc(i, t, e) {
    const {
        _proxy: n,
        _context: s,
        _subProxy: o,
        _descriptors: r
    } = i;
    let a = n[t];
    return pt(a) && r.isScriptable(t) && (a = Lc(t, a, i, e)), R(a) && a.length && (a = Rc(t, a, i, r.isIndexable)), In(t, a) && (a = Kt(a, s, o && o[t], r)), a
}

function Lc(i, t, e, n) {
    const {
        _proxy: s,
        _context: o,
        _subProxy: r,
        _stack: a
    } = e;
    if (a.has(i)) throw new Error("Recursion detected: " + Array.from(a).join("->") + "->" + i);
    a.add(i);
    let c = t(o, r || n);
    return a.delete(i), In(i, c) && (c = Tn(s._scopes, s, i, c)), c
}

function Rc(i, t, e, n) {
    const {
        _proxy: s,
        _context: o,
        _subProxy: r,
        _descriptors: a
    } = e;
    if (typeof o.index != "undefined" && n(i)) return t[o.index % t.length];
    if (P(t[0])) {
        const c = t,
            l = s._scopes.filter(h => h !== c);
        t = [];
        for (const h of c) {
            const d = Tn(l, s, i, h);
            t.push(Kt(d, o, r && r[i], a))
        }
    }
    return t
}

function rr(i, t, e) {
    return pt(i) ? i(t, e) : i
}
const Fc = (i, t) => i === !0 ? t : typeof i == "string" ? Yt(t, i) : void 0;

function Nc(i, t, e, n, s) {
    for (const o of t) {
        const r = Fc(e, o);
        if (r) {
            i.add(r);
            const a = rr(r._fallback, e, s);
            if (typeof a != "undefined" && a !== e && a !== n) return a
        } else if (r === !1 && typeof n != "undefined" && e !== n) return null
    }
    return !1
}

function Tn(i, t, e, n) {
    const s = t._rootScopes,
        o = rr(t._fallback, e, n),
        r = [...i, ...s],
        a = new Set;
    a.add(n);
    let c = xs(a, r, e, o || e, n);
    return c === null || typeof o != "undefined" && o !== e && (c = xs(a, r, o, c, n), c === null) ? !1 : Dn(Array.from(a), [""], s, o, () => zc(t, e, n))
}

function xs(i, t, e, n, s) {
    for (; e;) e = Nc(i, t, e, n, s);
    return e
}

function zc(i, t, e) {
    const n = i._getTarget();
    t in n || (n[t] = {});
    const s = n[t];
    return R(s) && P(e) ? e : s || {}
}

function jc(i, t, e, n) {
    let s;
    for (const o of t)
        if (s = ar(Ic(o, i), e), typeof s != "undefined") return In(i, s) ? Tn(e, n, i, s) : s
}

function ar(i, t) {
    for (const e of t) {
        if (!e) continue;
        const n = e[i];
        if (typeof n != "undefined") return n
    }
}

function vs(i) {
    let t = i._keys;
    return t || (t = i._keys = Bc(i._scopes)), t
}

function Bc(i) {
    const t = new Set;
    for (const e of i)
        for (const n of Object.keys(e).filter(s => !s.startsWith("_"))) t.add(n);
    return Array.from(t)
}

function Vc(i, t, e, n) {
    const {
        iScale: s
    } = i, {
        key: o = "r"
    } = this._parsing, r = new Array(n);
    let a, c, l, h;
    for (a = 0, c = n; a < c; ++a) l = a + e, h = t[l], r[a] = {
        r: s.parse(Yt(h, o), l)
    };
    return r
}
const Hc = Number.EPSILON || 1e-14,
    Gt = (i, t) => t < i.length && !i[t].skip && i[t],
    cr = i => i === "x" ? "y" : "x";

function Wc(i, t, e, n) {
    const s = i.skip ? t : i,
        o = t,
        r = e.skip ? t : e,
        a = us(o, s),
        c = us(r, o);
    let l = a / (a + c),
        h = c / (a + c);
    l = isNaN(l) ? 0 : l, h = isNaN(h) ? 0 : h;
    const d = n * l,
        u = n * h;
    return {
        previous: {
            x: o.x - d * (r.x - s.x),
            y: o.y - d * (r.y - s.y)
        },
        next: {
            x: o.x + u * (r.x - s.x),
            y: o.y + u * (r.y - s.y)
        }
    }
}

function Uc(i, t, e) {
    const n = i.length;
    let s, o, r, a, c, l = Gt(i, 0);
    for (let h = 0; h < n - 1; ++h)
        if (c = l, l = Gt(i, h + 1), !(!c || !l)) {
            if (ge(t[h], 0, Hc)) {
                e[h] = e[h + 1] = 0;
                continue
            }
            s = e[h] / t[h], o = e[h + 1] / t[h], a = Math.pow(s, 2) + Math.pow(o, 2), !(a <= 9) && (r = 3 / Math.sqrt(a), e[h] = s * r * t[h], e[h + 1] = o * r * t[h])
        }
}

function Yc(i, t, e = "x") {
    const n = cr(e),
        s = i.length;
    let o, r, a, c = Gt(i, 0);
    for (let l = 0; l < s; ++l) {
        if (r = a, a = c, c = Gt(i, l + 1), !a) continue;
        const h = a[e],
            d = a[n];
        r && (o = (h - r[e]) / 3, a[`cp1${e}`] = h - o, a[`cp1${n}`] = d - o * t[l]), c && (o = (c[e] - h) / 3, a[`cp2${e}`] = h + o, a[`cp2${n}`] = d + o * t[l])
    }
}

function qc(i, t = "x") {
    const e = cr(t),
        n = i.length,
        s = Array(n).fill(0),
        o = Array(n);
    let r, a, c, l = Gt(i, 0);
    for (r = 0; r < n; ++r)
        if (a = c, c = l, l = Gt(i, r + 1), !!c) {
            if (l) {
                const h = l[t] - c[t];
                s[r] = h !== 0 ? (l[e] - c[e]) / h : 0
            }
            o[r] = a ? l ? qt(s[r - 1]) !== qt(s[r]) ? 0 : (s[r - 1] + s[r]) / 2 : s[r - 1] : s[r]
        }
    Uc(i, s, o), Yc(i, o, t)
}

function Ye(i, t, e) {
    return Math.max(Math.min(i, e), t)
}

function Xc(i, t) {
    let e, n, s, o, r, a = at(i[0], t);
    for (e = 0, n = i.length; e < n; ++e) r = o, o = a, a = e < n - 1 && at(i[e + 1], t), o && (s = i[e], r && (s.cp1x = Ye(s.cp1x, t.left, t.right), s.cp1y = Ye(s.cp1y, t.top, t.bottom)), a && (s.cp2x = Ye(s.cp2x, t.left, t.right), s.cp2y = Ye(s.cp2y, t.top, t.bottom)))
}

function Kc(i, t, e, n, s) {
    let o, r, a, c;
    if (t.spanGaps && (i = i.filter(l => !l.skip)), t.cubicInterpolationMode === "monotone") qc(i, s);
    else {
        let l = n ? i[i.length - 1] : i[0];
        for (o = 0, r = i.length; o < r; ++o) a = i[o], c = Wc(l, a, i[Math.min(o + 1, r - (n ? 0 : 1)) % r], t.tension), a.cp1x = c.previous.x, a.cp1y = c.previous.y, a.cp2x = c.next.x, a.cp2y = c.next.y, l = a
    }
    t.capBezierPoints && Xc(i, e)
}

function Ln() {
    return typeof window != "undefined" && typeof document != "undefined"
}

function Rn(i) {
    let t = i.parentNode;
    return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t
}

function yi(i, t, e) {
    let n;
    return typeof i == "string" ? (n = parseInt(i, 10), i.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[e])) : n = i, n
}
const $i = i => i.ownerDocument.defaultView.getComputedStyle(i, null);

function Gc(i, t) {
    return $i(i).getPropertyValue(t)
}
const Qc = ["top", "right", "bottom", "left"];

function Pt(i, t, e) {
    const n = {};
    e = e ? "-" + e : "";
    for (let s = 0; s < 4; s++) {
        const o = Qc[s];
        n[o] = parseFloat(i[t + "-" + o + e]) || 0
    }
    return n.width = n.left + n.right, n.height = n.top + n.bottom, n
}
const Zc = (i, t, e) => (i > 0 || t > 0) && (!e || !e.shadowRoot);

function Jc(i, t) {
    const e = i.touches,
        n = e && e.length ? e[0] : i,
        {
            offsetX: s,
            offsetY: o
        } = n;
    let r = !1,
        a, c;
    if (Zc(s, o, i.target)) a = s, c = o;
    else {
        const l = t.getBoundingClientRect();
        a = n.clientX - l.left, c = n.clientY - l.top, r = !0
    }
    return {
        x: a,
        y: c,
        box: r
    }
}

function St(i, t) {
    if ("native" in i) return i;
    const {
        canvas: e,
        currentDevicePixelRatio: n
    } = t, s = $i(e), o = s.boxSizing === "border-box", r = Pt(s, "padding"), a = Pt(s, "border", "width"), {
        x: c,
        y: l,
        box: h
    } = Jc(i, e), d = r.left + (h && a.left), u = r.top + (h && a.top);
    let {
        width: f,
        height: p
    } = t;
    return o && (f -= r.width + a.width, p -= r.height + a.height), {
        x: Math.round((c - d) / f * e.width / n),
        y: Math.round((l - u) / p * e.height / n)
    }
}

function tl(i, t, e) {
    let n, s;
    if (t === void 0 || e === void 0) {
        const o = Rn(i);
        if (!o) t = i.clientWidth, e = i.clientHeight;
        else {
            const r = o.getBoundingClientRect(),
                a = $i(o),
                c = Pt(a, "border", "width"),
                l = Pt(a, "padding");
            t = r.width - l.width - c.width, e = r.height - l.height - c.height, n = yi(a.maxWidth, o, "clientWidth"), s = yi(a.maxHeight, o, "clientHeight")
        }
    }
    return {
        width: t,
        height: e,
        maxWidth: n || gi,
        maxHeight: s || gi
    }
}
const qe = i => Math.round(i * 10) / 10;

function el(i, t, e, n) {
    const s = $i(i),
        o = Pt(s, "margin"),
        r = yi(s.maxWidth, i, "clientWidth") || gi,
        a = yi(s.maxHeight, i, "clientHeight") || gi,
        c = tl(i, t, e);
    let {
        width: l,
        height: h
    } = c;
    if (s.boxSizing === "content-box") {
        const u = Pt(s, "border", "width"),
            f = Pt(s, "padding");
        l -= f.width + u.width, h -= f.height + u.height
    }
    return l = Math.max(0, l - o.width), h = Math.max(0, n ? l / n : h - o.height), l = qe(Math.min(l, r, c.maxWidth)), h = qe(Math.min(h, a, c.maxHeight)), l && !h && (h = qe(l / 2)), (t !== void 0 || e !== void 0) && n && c.height && h > c.height && (h = c.height, l = qe(Math.floor(h * n))), {
        width: l,
        height: h
    }
}

function ws(i, t, e) {
    const n = t || 1,
        s = Math.floor(i.height * n),
        o = Math.floor(i.width * n);
    i.height = Math.floor(i.height), i.width = Math.floor(i.width);
    const r = i.canvas;
    return r.style && (e || !r.style.height && !r.style.width) && (r.style.height = `${i.height}px`, r.style.width = `${i.width}px`), i.currentDevicePixelRatio !== n || r.height !== s || r.width !== o ? (i.currentDevicePixelRatio = n, r.height = s, r.width = o, i.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1
}
const il = function() {
    let i = !1;
    try {
        const t = {get passive() {
                return i = !0, !1
            }
        };
        Ln() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t))
    } catch {}
    return i
}();

function ks(i, t) {
    const e = Gc(i, t),
        n = e && e.match(/^(\d+)(\.\d+)?px$/);
    return n ? +n[1] : void 0
}

function Mt(i, t, e, n) {
    return {
        x: i.x + e * (t.x - i.x),
        y: i.y + e * (t.y - i.y)
    }
}

function nl(i, t, e, n) {
    return {
        x: i.x + e * (t.x - i.x),
        y: n === "middle" ? e < .5 ? i.y : t.y : n === "after" ? e < 1 ? i.y : t.y : e > 0 ? t.y : i.y
    }
}

function sl(i, t, e, n) {
    const s = {
            x: i.cp2x,
            y: i.cp2y
        },
        o = {
            x: t.cp1x,
            y: t.cp1y
        },
        r = Mt(i, s, e),
        a = Mt(s, o, e),
        c = Mt(o, t, e),
        l = Mt(r, a, e),
        h = Mt(a, c, e);
    return Mt(l, h, e)
}

function lr(i) {
    return i === "angle" ? {
        between: mi,
        compare: Qa,
        normalize: Q
    } : {
        between: Ja,
        compare: (t, e) => t - e,
        normalize: t => t
    }
}

function Ss({
    start: i,
    end: t,
    count: e,
    loop: n,
    style: s
}) {
    return {
        start: i % e,
        end: t % e,
        loop: n && (t - i + 1) % e === 0,
        style: s
    }
}

function ol(i, t, e) {
    const {
        property: n,
        start: s,
        end: o
    } = e, {
        between: r,
        normalize: a
    } = lr(n), c = t.length;
    let {
        start: l,
        end: h,
        loop: d
    } = i, u, f;
    if (d) {
        for (l += c, h += c, u = 0, f = c; u < f && r(a(t[l % c][n]), s, o); ++u) l--, h--;
        l %= c, h %= c
    }
    return h < l && (h += c), {
        start: l,
        end: h,
        loop: d,
        style: i.style
    }
}

function rl(i, t, e) {
    if (!e) return [i];
    const {
        property: n,
        start: s,
        end: o
    } = e, r = t.length, {
        compare: a,
        between: c,
        normalize: l
    } = lr(n), {
        start: h,
        end: d,
        loop: u,
        style: f
    } = ol(i, t, e), p = [];
    let g = !1,
        m = null,
        b, _, v;
    const M = () => c(s, v, b) && a(s, v) !== 0,
        y = () => a(o, b) === 0 || c(o, v, b),
        x = () => g || M(),
        w = () => !g || y();
    for (let S = h, O = h; S <= d; ++S) _ = t[S % r], !_.skip && (b = l(_[n]), b !== v && (g = c(b, s, o), m === null && x() && (m = a(b, s) === 0 ? S : O), m !== null && w() && (p.push(Ss({
        start: m,
        end: S,
        loop: u,
        count: r,
        style: f
    })), m = null), O = S, v = b));
    return m !== null && p.push(Ss({
        start: m,
        end: d,
        loop: u,
        count: r,
        style: f
    })), p
}

function al(i, t) {
    const e = [],
        n = i.segments;
    for (let s = 0; s < n.length; s++) {
        const o = rl(n[s], i.points, t);
        o.length && e.push(...o)
    }
    return e
}

function cl(i, t, e, n) {
    let s = 0,
        o = t - 1;
    if (e && !n)
        for (; s < t && !i[s].skip;) s++;
    for (; s < t && i[s].skip;) s++;
    for (s %= t, e && (o += s); o > s && i[o % t].skip;) o--;
    return o %= t, {
        start: s,
        end: o
    }
}

function ll(i, t, e, n) {
    const s = i.length,
        o = [];
    let r = t,
        a = i[t],
        c;
    for (c = t + 1; c <= e; ++c) {
        const l = i[c % s];
        l.skip || l.stop ? a.skip || (n = !1, o.push({
            start: t % s,
            end: (c - 1) % s,
            loop: n
        }), t = r = l.stop ? c : null) : (r = c, a.skip && (t = c)), a = l
    }
    return r !== null && o.push({
        start: t % s,
        end: r % s,
        loop: n
    }), o
}

function hl(i, t) {
    const e = i.points,
        n = i.options.spanGaps,
        s = e.length;
    if (!s) return [];
    const o = !!i._loop,
        {
            start: r,
            end: a
        } = cl(e, s, o, n);
    if (n === !0) return Ms(i, [{
        start: r,
        end: a,
        loop: o
    }], e, t);
    const c = a < r ? a + s : a,
        l = !!i._fullLoop && r === 0 && a === s - 1;
    return Ms(i, ll(e, r, c, l), e, t)
}

function Ms(i, t, e, n) {
    return !n || !n.setContext || !e ? t : dl(i, t, e, n)
}

function dl(i, t, e, n) {
    const s = i._chart.getContext(),
        o = Cs(i.options),
        {
            _datasetIndex: r,
            options: {
                spanGaps: a
            }
        } = i,
        c = e.length,
        l = [];
    let h = o,
        d = t[0].start,
        u = d;

    function f(p, g, m, b) {
        const _ = a ? -1 : 1;
        if (p !== g) {
            for (p += c; e[p % c].skip;) p -= _;
            for (; e[g % c].skip;) g += _;
            p % c !== g % c && (l.push({
                start: p % c,
                end: g % c,
                loop: m,
                style: b
            }), h = b, d = g % c)
        }
    }
    for (const p of t) {
        d = a ? d : p.start;
        let g = e[d % c],
            m;
        for (u = d + 1; u <= p.end; u++) {
            const b = e[u % c];
            m = Cs(n.setContext(Ft(s, {
                type: "segment",
                p0: g,
                p1: b,
                p0DataIndex: (u - 1) % c,
                p1DataIndex: u % c,
                datasetIndex: r
            }))), ul(m, h) && f(d, u - 1, p.loop, h), g = b, h = m
        }
        d < u - 1 && f(d, u - 1, p.loop, h)
    }
    return l
}

function Cs(i) {
    return {
        backgroundColor: i.backgroundColor,
        borderCapStyle: i.borderCapStyle,
        borderDash: i.borderDash,
        borderDashOffset: i.borderDashOffset,
        borderJoinStyle: i.borderJoinStyle,
        borderWidth: i.borderWidth,
        borderColor: i.borderColor
    }
}

function ul(i, t) {
    if (!t) return !1;
    const e = [],
        n = function(s, o) {
            return En(o) ? (e.includes(o) || e.push(o), e.indexOf(o)) : o
        };
    return JSON.stringify(i, n) !== JSON.stringify(t, n)
}
class fl {
    constructor() {
        this._request = null, this._charts = new Map, this._running = !1, this._lastDate = void 0
    }
    _notify(t, e, n, s) {
        const o = e.listeners[s],
            r = e.duration;
        o.forEach(a => a({
            chart: t,
            initial: e.initial,
            numSteps: r,
            currentStep: Math.min(n - e.start, r)
        }))
    }
    _refresh() {
        this._request || (this._running = !0, this._request = Zo.call(window, () => {
            this._update(), this._request = null, this._running && this._refresh()
        }))
    }
    _update(t = Date.now()) {
        let e = 0;
        this._charts.forEach((n, s) => {
            if (!n.running || !n.items.length) return;
            const o = n.items;
            let r = o.length - 1,
                a = !1,
                c;
            for (; r >= 0; --r) c = o[r], c._active ? (c._total > n.duration && (n.duration = c._total), c.tick(t), a = !0) : (o[r] = o[o.length - 1], o.pop());
            a && (s.draw(), this._notify(s, n, t, "progress")), o.length || (n.running = !1, this._notify(s, n, t, "complete"), n.initial = !1), e += o.length
        }), this._lastDate = t, e === 0 && (this._running = !1)
    }
    _getAnims(t) {
        const e = this._charts;
        let n = e.get(t);
        return n || (n = {
            running: !1,
            initial: !0,
            items: [],
            listeners: {
                complete: [],
                progress: []
            }
        }, e.set(t, n)), n
    }
    listen(t, e, n) {
        this._getAnims(t).listeners[e].push(n)
    }
    add(t, e) {
        !e || !e.length || this._getAnims(t).items.push(...e)
    }
    has(t) {
        return this._getAnims(t).items.length > 0
    }
    start(t) {
        const e = this._charts.get(t);
        !e || (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce((n, s) => Math.max(n, s._duration), 0), this._refresh())
    }
    running(t) {
        if (!this._running) return !1;
        const e = this._charts.get(t);
        return !(!e || !e.running || !e.items.length)
    }
    stop(t) {
        const e = this._charts.get(t);
        if (!e || !e.items.length) return;
        const n = e.items;
        let s = n.length - 1;
        for (; s >= 0; --s) n[s].cancel();
        e.items = [], this._notify(t, e, Date.now(), "complete")
    }
    remove(t) {
        return this._charts.delete(t)
    }
}
var st = new fl;
const Os = "transparent",
    pl = {
        boolean(i, t, e) {
            return e > .5 ? t : i
        },
        color(i, t, e) {
            const n = bs(i || Os),
                s = n.valid && bs(t || Os);
            return s && s.valid ? s.mix(n, e).hexString() : t
        },
        number(i, t, e) {
            return i + (t - i) * e
        }
    };
class gl {
    constructor(t, e, n, s) {
        const o = e[n];
        s = Ue([t.to, s, o, t.from]);
        const r = Ue([t.from, o, s]);
        this._active = !0, this._fn = t.fn || pl[t.type || typeof r], this._easing = me[t.easing] || me.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = n, this._from = r, this._to = s, this._promises = void 0
    }
    active() {
        return this._active
    }
    update(t, e, n) {
        if (this._active) {
            this._notify(!1);
            const s = this._target[this._prop],
                o = n - this._start,
                r = this._duration - o;
            this._start = n, this._duration = Math.floor(Math.max(r, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Ue([t.to, e, s, t.from]), this._from = Ue([t.from, s, e])
        }
    }
    cancel() {
        this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1))
    }
    tick(t) {
        const e = t - this._start,
            n = this._duration,
            s = this._prop,
            o = this._from,
            r = this._loop,
            a = this._to;
        let c;
        if (this._active = o !== a && (r || e < n), !this._active) {
            this._target[s] = a, this._notify(!0);
            return
        }
        if (e < 0) {
            this._target[s] = o;
            return
        }
        c = e / n % 2, c = r && c > 1 ? 2 - c : c, c = this._easing(Math.min(1, Math.max(0, c))), this._target[s] = this._fn(o, a, c)
    }
    wait() {
        const t = this._promises || (this._promises = []);
        return new Promise((e, n) => {
            t.push({
                res: e,
                rej: n
            })
        })
    }
    _notify(t) {
        const e = t ? "res" : "rej",
            n = this._promises || [];
        for (let s = 0; s < n.length; s++) n[s][e]()
    }
}
class ml {
    constructor(t, e) {
        this._chart = t, this._properties = new Map, this.configure(e)
    }
    configure(t) {
        if (!P(t)) return;
        const e = Object.keys(F.animation),
            n = this._properties;
        Object.getOwnPropertyNames(t).forEach(s => {
            const o = t[s];
            if (!P(o)) return;
            const r = {};
            for (const a of e) r[a] = o[a];
            (R(o.properties) && o.properties || [s]).forEach(a => {
                (a === s || !n.has(a)) && n.set(a, r)
            })
        })
    }
    _animateOptions(t, e) {
        const n = e.options,
            s = _l(t, n);
        if (!s) return [];
        const o = this._createAnimations(s, n);
        return n.$shared && bl(t.options.$animations, n).then(() => {
            t.options = n
        }, () => {}), o
    }
    _createAnimations(t, e) {
        const n = this._properties,
            s = [],
            o = t.$animations || (t.$animations = {}),
            r = Object.keys(e),
            a = Date.now();
        let c;
        for (c = r.length - 1; c >= 0; --c) {
            const l = r[c];
            if (l.charAt(0) === "$") continue;
            if (l === "options") {
                s.push(...this._animateOptions(t, e));
                continue
            }
            const h = e[l];
            let d = o[l];
            const u = n.get(l);
            if (d)
                if (u && d.active()) {
                    d.update(u, h, a);
                    continue
                } else d.cancel();
            if (!u || !u.duration) {
                t[l] = h;
                continue
            }
            o[l] = d = new gl(u, t, l, h), s.push(d)
        }
        return s
    }
    update(t, e) {
        if (this._properties.size === 0) {
            Object.assign(t, e);
            return
        }
        const n = this._createAnimations(t, e);
        if (n.length) return st.add(this._chart, n), !0
    }
}

function bl(i, t) {
    const e = [],
        n = Object.keys(t);
    for (let s = 0; s < n.length; s++) {
        const o = i[n[s]];
        o && o.active() && e.push(o.wait())
    }
    return Promise.all(e)
}

function _l(i, t) {
    if (!t) return;
    let e = i.options;
    if (!e) {
        i.options = t;
        return
    }
    return e.$shared && (i.options = e = Object.assign({}, e, {
        $shared: !1,
        $animations: {}
    })), e
}

function Ps(i, t) {
    const e = i && i.options || {},
        n = e.reverse,
        s = e.min === void 0 ? t : 0,
        o = e.max === void 0 ? t : 0;
    return {
        start: n ? o : s,
        end: n ? s : o
    }
}

function yl(i, t, e) {
    if (e === !1) return !1;
    const n = Ps(i, e),
        s = Ps(t, e);
    return {
        top: s.end,
        right: n.end,
        bottom: s.start,
        left: n.start
    }
}

function xl(i) {
    let t, e, n, s;
    return P(i) ? (t = i.top, e = i.right, n = i.bottom, s = i.left) : t = e = n = s = i, {
        top: t,
        right: e,
        bottom: n,
        left: s,
        disabled: i === !1
    }
}

function hr(i, t) {
    const e = [],
        n = i._getSortedDatasetMetas(t);
    let s, o;
    for (s = 0, o = n.length; s < o; ++s) e.push(n[s].index);
    return e
}

function $s(i, t, e, n = {}) {
    const s = i.keys,
        o = n.mode === "single";
    let r, a, c, l;
    if (t !== null) {
        for (r = 0, a = s.length; r < a; ++r) {
            if (c = +s[r], c === e) {
                if (n.all) continue;
                break
            }
            l = i.values[c], j(l) && (o || t === 0 || qt(t) === qt(l)) && (t += l)
        }
        return t
    }
}

function vl(i) {
    const t = Object.keys(i),
        e = new Array(t.length);
    let n, s, o;
    for (n = 0, s = t.length; n < s; ++n) o = t[n], e[n] = {
        x: o,
        y: i[o]
    };
    return e
}

function As(i, t) {
    const e = i && i.options.stacked;
    return e || e === void 0 && t.stack !== void 0
}

function wl(i, t, e) {
    return `${i.id}.${t.id}.${e.stack||e.type}`
}

function kl(i) {
    const {
        min: t,
        max: e,
        minDefined: n,
        maxDefined: s
    } = i.getUserBounds();
    return {
        min: n ? t : Number.NEGATIVE_INFINITY,
        max: s ? e : Number.POSITIVE_INFINITY
    }
}

function Sl(i, t, e) {
    const n = i[t] || (i[t] = {});
    return n[e] || (n[e] = {})
}

function Es(i, t, e, n) {
    for (const s of t.getMatchingVisibleMetas(n).reverse()) {
        const o = i[s.index];
        if (e && o > 0 || !e && o < 0) return s.index
    }
    return null
}

function Ds(i, t) {
    const {
        chart: e,
        _cachedMeta: n
    } = i, s = e._stacks || (e._stacks = {}), {
        iScale: o,
        vScale: r,
        index: a
    } = n, c = o.axis, l = r.axis, h = wl(o, r, n), d = t.length;
    let u;
    for (let f = 0; f < d; ++f) {
        const p = t[f],
            {
                [c]: g,
                [l]: m
            } = p,
            b = p._stacks || (p._stacks = {});
        u = b[l] = Sl(s, h, g), u[a] = m, u._top = Es(u, r, !0, n.type), u._bottom = Es(u, r, !1, n.type);
        const _ = u._visualValues || (u._visualValues = {});
        _[a] = m
    }
}

function Ui(i, t) {
    const e = i.scales;
    return Object.keys(e).filter(n => e[n].axis === t).shift()
}

function Ml(i, t) {
    return Ft(i, {
        active: !1,
        dataset: void 0,
        datasetIndex: t,
        index: t,
        mode: "default",
        type: "dataset"
    })
}

function Cl(i, t, e) {
    return Ft(i, {
        active: !1,
        dataIndex: t,
        parsed: void 0,
        raw: void 0,
        element: e,
        index: t,
        mode: "default",
        type: "data"
    })
}

function se(i, t) {
    const e = i.controller.index,
        n = i.vScale && i.vScale.axis;
    if (!!n) {
        t = t || i._parsed;
        for (const s of t) {
            const o = s._stacks;
            if (!o || o[n] === void 0 || o[n][e] === void 0) return;
            delete o[n][e], o[n]._visualValues !== void 0 && o[n]._visualValues[e] !== void 0 && delete o[n]._visualValues[e]
        }
    }
}
const Yi = i => i === "reset" || i === "none",
    Is = (i, t) => t ? i : Object.assign({}, i),
    Ol = (i, t, e) => i && !t.hidden && t._stacked && {
        keys: hr(e, !0),
        values: null
    };
class $t {
    constructor(t, e) {
        this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize()
    }
    initialize() {
        const t = this._cachedMeta;
        this.configure(), this.linkScales(), t._stacked = As(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")
    }
    updateIndex(t) {
        this.index !== t && se(this._cachedMeta), this.index = t
    }
    linkScales() {
        const t = this.chart,
            e = this._cachedMeta,
            n = this.getDataset(),
            s = (d, u, f, p) => d === "x" ? u : d === "r" ? p : f,
            o = e.xAxisID = A(n.xAxisID, Ui(t, "x")),
            r = e.yAxisID = A(n.yAxisID, Ui(t, "y")),
            a = e.rAxisID = A(n.rAxisID, Ui(t, "r")),
            c = e.indexAxis,
            l = e.iAxisID = s(c, o, r, a),
            h = e.vAxisID = s(c, r, o, a);
        e.xScale = this.getScaleForId(o), e.yScale = this.getScaleForId(r), e.rScale = this.getScaleForId(a), e.iScale = this.getScaleForId(l), e.vScale = this.getScaleForId(h)
    }
    getDataset() {
        return this.chart.data.datasets[this.index]
    }
    getMeta() {
        return this.chart.getDatasetMeta(this.index)
    }
    getScaleForId(t) {
        return this.chart.scales[t]
    }
    _getOtherScale(t) {
        const e = this._cachedMeta;
        return t === e.iScale ? e.vScale : e.iScale
    }
    reset() {
        this._update("reset")
    }
    _destroy() {
        const t = this._cachedMeta;
        this._data && fs(this._data, this), t._stacked && se(t)
    }
    _dataCheck() {
        const t = this.getDataset(),
            e = t.data || (t.data = []),
            n = this._data;
        if (P(e)) this._data = vl(e);
        else if (n !== e) {
            if (n) {
                fs(n, this);
                const s = this._cachedMeta;
                se(s), s._parsed = []
            }
            e && Object.isExtensible(e) && ic(e, this), this._syncList = [], this._data = e
        }
    }
    addElements() {
        const t = this._cachedMeta;
        this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType)
    }
    buildOrUpdateElements(t) {
        const e = this._cachedMeta,
            n = this.getDataset();
        let s = !1;
        this._dataCheck();
        const o = e._stacked;
        e._stacked = As(e.vScale, e), e.stack !== n.stack && (s = !0, se(e), e.stack = n.stack), this._resyncElements(t), (s || o !== e._stacked) && Ds(this, e._parsed)
    }
    configure() {
        const t = this.chart.config,
            e = t.datasetScopeKeys(this._type),
            n = t.getOptionScopes(this.getDataset(), e, !0);
        this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {}
    }
    parse(t, e) {
        const {
            _cachedMeta: n,
            _data: s
        } = this, {
            iScale: o,
            _stacked: r
        } = n, a = o.axis;
        let c = t === 0 && e === s.length ? !0 : n._sorted,
            l = t > 0 && n._parsed[t - 1],
            h, d, u;
        if (this._parsing === !1) n._parsed = s, n._sorted = !0, u = s;
        else {
            R(s[t]) ? u = this.parseArrayData(n, s, t, e) : P(s[t]) ? u = this.parseObjectData(n, s, t, e) : u = this.parsePrimitiveData(n, s, t, e);
            const f = () => d[a] === null || l && d[a] < l[a];
            for (h = 0; h < e; ++h) n._parsed[h + t] = d = u[h], c && (f() && (c = !1), l = d);
            n._sorted = c
        }
        r && Ds(this, u)
    }
    parsePrimitiveData(t, e, n, s) {
        const {
            iScale: o,
            vScale: r
        } = t, a = o.axis, c = r.axis, l = o.getLabels(), h = o === r, d = new Array(s);
        let u, f, p;
        for (u = 0, f = s; u < f; ++u) p = u + n, d[u] = {
            [a]: h || o.parse(l[p], p),
            [c]: r.parse(e[p], p)
        };
        return d
    }
    parseArrayData(t, e, n, s) {
        const {
            xScale: o,
            yScale: r
        } = t, a = new Array(s);
        let c, l, h, d;
        for (c = 0, l = s; c < l; ++c) h = c + n, d = e[h], a[c] = {
            x: o.parse(d[0], h),
            y: r.parse(d[1], h)
        };
        return a
    }
    parseObjectData(t, e, n, s) {
        const {
            xScale: o,
            yScale: r
        } = t, {
            xAxisKey: a = "x",
            yAxisKey: c = "y"
        } = this._parsing, l = new Array(s);
        let h, d, u, f;
        for (h = 0, d = s; h < d; ++h) u = h + n, f = e[u], l[h] = {
            x: o.parse(Yt(f, a), u),
            y: r.parse(Yt(f, c), u)
        };
        return l
    }
    getParsed(t) {
        return this._cachedMeta._parsed[t]
    }
    getDataElement(t) {
        return this._cachedMeta.data[t]
    }
    applyStack(t, e, n) {
        const s = this.chart,
            o = this._cachedMeta,
            r = e[t.axis],
            a = {
                keys: hr(s, !0),
                values: e._stacks[t.axis]._visualValues
            };
        return $s(a, r, o.index, {
            mode: n
        })
    }
    updateRangeFromParsed(t, e, n, s) {
        const o = n[e.axis];
        let r = o === null ? NaN : o;
        const a = s && n._stacks[e.axis];
        s && a && (s.values = a, r = $s(s, o, this._cachedMeta.index)), t.min = Math.min(t.min, r), t.max = Math.max(t.max, r)
    }
    getMinMax(t, e) {
        const n = this._cachedMeta,
            s = n._parsed,
            o = n._sorted && t === n.iScale,
            r = s.length,
            a = this._getOtherScale(t),
            c = Ol(e, n, this.chart),
            l = {
                min: Number.POSITIVE_INFINITY,
                max: Number.NEGATIVE_INFINITY
            },
            {
                min: h,
                max: d
            } = kl(a);
        let u, f;

        function p() {
            f = s[u];
            const g = f[a.axis];
            return !j(f[t.axis]) || h > g || d < g
        }
        for (u = 0; u < r && !(!p() && (this.updateRangeFromParsed(l, t, f, c), o)); ++u);
        if (o) {
            for (u = r - 1; u >= 0; --u)
                if (!p()) {
                    this.updateRangeFromParsed(l, t, f, c);
                    break
                }
        }
        return l
    }
    getAllParsedValues(t) {
        const e = this._cachedMeta._parsed,
            n = [];
        let s, o, r;
        for (s = 0, o = e.length; s < o; ++s) r = e[s][t.axis], j(r) && n.push(r);
        return n
    }
    getMaxOverflow() {
        return !1
    }
    getLabelAndValue(t) {
        const e = this._cachedMeta,
            n = e.iScale,
            s = e.vScale,
            o = this.getParsed(t);
        return {
            label: n ? "" + n.getLabelForValue(o[n.axis]) : "",
            value: s ? "" + s.getLabelForValue(o[s.axis]) : ""
        }
    }
    _update(t) {
        const e = this._cachedMeta;
        this.update(t || "default"), e._clip = xl(A(this.options.clip, yl(e.xScale, e.yScale, this.getMaxOverflow())))
    }
    update(t) {}
    draw() {
        const t = this._ctx,
            e = this.chart,
            n = this._cachedMeta,
            s = n.data || [],
            o = e.chartArea,
            r = [],
            a = this._drawStart || 0,
            c = this._drawCount || s.length - a,
            l = this.options.drawActiveElementsOnTop;
        let h;
        for (n.dataset && n.dataset.draw(t, o, a, c), h = a; h < a + c; ++h) {
            const d = s[h];
            d.hidden || (d.active && l ? r.push(d) : d.draw(t, o))
        }
        for (h = 0; h < r.length; ++h) r[h].draw(t, o)
    }
    getStyle(t, e) {
        const n = e ? "active" : "default";
        return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n) : this.resolveDataElementOptions(t || 0, n)
    }
    getContext(t, e, n) {
        const s = this.getDataset();
        let o;
        if (t >= 0 && t < this._cachedMeta.data.length) {
            const r = this._cachedMeta.data[t];
            o = r.$context || (r.$context = Cl(this.getContext(), t, r)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t
        } else o = this.$context || (this.$context = Ml(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
        return o.active = !!e, o.mode = n, o
    }
    resolveDatasetElementOptions(t) {
        return this._resolveElementOptions(this.datasetElementType.id, t)
    }
    resolveDataElementOptions(t, e) {
        return this._resolveElementOptions(this.dataElementType.id, e, t)
    }
    _resolveElementOptions(t, e = "default", n) {
        const s = e === "active",
            o = this._cachedDataOpts,
            r = t + "-" + e,
            a = o[r],
            c = this.enableOptionSharing && pi(n);
        if (a) return Is(a, c);
        const l = this.chart.config,
            h = l.datasetElementScopeKeys(this._type, t),
            d = s ? [`${t}Hover`, "hover", t, ""] : [t, ""],
            u = l.getOptionScopes(this.getDataset(), h),
            f = Object.keys(F.elements[t]),
            p = () => this.getContext(n, s, e),
            g = l.resolveNamedOptions(u, f, p, d);
        return g.$shared && (g.$shared = c, o[r] = Object.freeze(Is(g, c))), g
    }
    _resolveAnimations(t, e, n) {
        const s = this.chart,
            o = this._cachedDataOpts,
            r = `animation-${e}`,
            a = o[r];
        if (a) return a;
        let c;
        if (s.options.animation !== !1) {
            const h = this.chart.config,
                d = h.datasetAnimationScopeKeys(this._type, e),
                u = h.getOptionScopes(this.getDataset(), d);
            c = h.createResolver(u, this.getContext(t, n, e))
        }
        const l = new ml(s, c && c.animations);
        return c && c._cacheable && (o[r] = Object.freeze(l)), l
    }
    getSharedOptions(t) {
        if (!!t.$shared) return this._sharedOptions || (this._sharedOptions = Object.assign({}, t))
    }
    includeOptions(t, e) {
        return !e || Yi(t) || this.chart._animationsDisabled
    }
    _getSharedOptions(t, e) {
        const n = this.resolveDataElementOptions(t, e),
            s = this._sharedOptions,
            o = this.getSharedOptions(n),
            r = this.includeOptions(e, o) || o !== s;
        return this.updateSharedOptions(o, e, n), {
            sharedOptions: o,
            includeOptions: r
        }
    }
    updateElement(t, e, n, s) {
        Yi(s) ? Object.assign(t, n) : this._resolveAnimations(e, s).update(t, n)
    }
    updateSharedOptions(t, e, n) {
        t && !Yi(e) && this._resolveAnimations(void 0, e).update(t, n)
    }
    _setStyle(t, e, n, s) {
        t.active = s;
        const o = this.getStyle(e, s);
        this._resolveAnimations(e, n, s).update(t, {
            options: !s && this.getSharedOptions(o) || o
        })
    }
    removeHoverStyle(t, e, n) {
        this._setStyle(t, n, "active", !1)
    }
    setHoverStyle(t, e, n) {
        this._setStyle(t, n, "active", !0)
    }
    _removeDatasetHoverStyle() {
        const t = this._cachedMeta.dataset;
        t && this._setStyle(t, void 0, "active", !1)
    }
    _setDatasetHoverStyle() {
        const t = this._cachedMeta.dataset;
        t && this._setStyle(t, void 0, "active", !0)
    }
    _resyncElements(t) {
        const e = this._data,
            n = this._cachedMeta.data;
        for (const [a, c, l] of this._syncList) this[a](c, l);
        this._syncList = [];
        const s = n.length,
            o = e.length,
            r = Math.min(o, s);
        r && this.parse(0, r), o > s ? this._insertElements(s, o - s, t) : o < s && this._removeElements(o, s - o)
    }
    _insertElements(t, e, n = !0) {
        const s = this._cachedMeta,
            o = s.data,
            r = t + e;
        let a;
        const c = l => {
            for (l.length += e, a = l.length - 1; a >= r; a--) l[a] = l[a - e]
        };
        for (c(o), a = t; a < r; ++a) o[a] = new this.dataElementType;
        this._parsing && c(s._parsed), this.parse(t, e), n && this.updateElements(o, t, e, "reset")
    }
    updateElements(t, e, n, s) {}
    _removeElements(t, e) {
        const n = this._cachedMeta;
        if (this._parsing) {
            const s = n._parsed.splice(t, e);
            n._stacked && se(n, s)
        }
        n.data.splice(t, e)
    }
    _sync(t) {
        if (this._parsing) this._syncList.push(t);
        else {
            const [e, n, s] = t;
            this[e](n, s)
        }
        this.chart._dataChanges.push([this.index, ...t])
    }
    _onDataPush() {
        const t = arguments.length;
        this._sync(["_insertElements", this.getDataset().data.length - t, t])
    }
    _onDataPop() {
        this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1])
    }
    _onDataShift() {
        this._sync(["_removeElements", 0, 1])
    }
    _onDataSplice(t, e) {
        e && this._sync(["_removeElements", t, e]);
        const n = arguments.length - 2;
        n && this._sync(["_insertElements", t, n])
    }
    _onDataUnshift() {
        this._sync(["_insertElements", 0, arguments.length])
    }
}
k($t, "defaults", {}), k($t, "datasetElementType", null), k($t, "dataElementType", null);

function Pl(i, t, e) {
    let n = 1,
        s = 1,
        o = 0,
        r = 0;
    if (t < V) {
        const a = i,
            c = a + t,
            l = Math.cos(a),
            h = Math.sin(a),
            d = Math.cos(c),
            u = Math.sin(c),
            f = (v, M, y) => mi(v, a, c, !0) ? 1 : Math.max(M, M * e, y, y * e),
            p = (v, M, y) => mi(v, a, c, !0) ? -1 : Math.min(M, M * e, y, y * e),
            g = f(0, l, d),
            m = f(W, h, u),
            b = p(N, l, d),
            _ = p(N + W, h, u);
        n = (g - b) / 2, s = (m - _) / 2, o = -(g + b) / 2, r = -(m + _) / 2
    }
    return {
        ratioX: n,
        ratioY: s,
        offsetX: o,
        offsetY: r
    }
}
class de extends $t {
    constructor(t, e) {
        super(t, e), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0
    }
    linkScales() {}
    parse(t, e) {
        const n = this.getDataset().data,
            s = this._cachedMeta;
        if (this._parsing === !1) s._parsed = n;
        else {
            let o = c => +n[c];
            if (P(n[t])) {
                const {
                    key: c = "value"
                } = this._parsing;
                o = l => +Yt(n[l], c)
            }
            let r, a;
            for (r = t, a = t + e; r < a; ++r) s._parsed[r] = o(r)
        }
    }
    _getRotation() {
        return Z(this.options.rotation - 90)
    }
    _getCircumference() {
        return Z(this.options.circumference)
    }
    _getRotationExtents() {
        let t = V,
            e = -V;
        for (let n = 0; n < this.chart.data.datasets.length; ++n)
            if (this.chart.isDatasetVisible(n) && this.chart.getDatasetMeta(n).type === this._type) {
                const s = this.chart.getDatasetMeta(n).controller,
                    o = s._getRotation(),
                    r = s._getCircumference();
                t = Math.min(t, o), e = Math.max(e, o + r)
            }
        return {
            rotation: t,
            circumference: e - t
        }
    }
    update(t) {
        const e = this.chart,
            {
                chartArea: n
            } = e,
            s = this._cachedMeta,
            o = s.data,
            r = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing,
            a = Math.max((Math.min(n.width, n.height) - r) / 2, 0),
            c = Math.min(ja(this.options.cutout, a), 1),
            l = this._getRingWeight(this.index),
            {
                circumference: h,
                rotation: d
            } = this._getRotationExtents(),
            {
                ratioX: u,
                ratioY: f,
                offsetX: p,
                offsetY: g
            } = Pl(d, h, c),
            m = (n.width - r) / u,
            b = (n.height - r) / f,
            _ = Math.max(Math.min(m, b) / 2, 0),
            v = Xo(this.options.radius, _),
            M = Math.max(v * c, 0),
            y = (v - M) / this._getVisibleDatasetWeightTotal();
        this.offsetX = p * v, this.offsetY = g * v, s.total = this.calculateTotal(), this.outerRadius = v - y * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - y * l, 0), this.updateElements(o, 0, o.length, t)
    }
    _circumference(t, e) {
        const n = this.options,
            s = this._cachedMeta,
            o = this._getCircumference();
        return e && n.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / V)
    }
    updateElements(t, e, n, s) {
        const o = s === "reset",
            r = this.chart,
            a = r.chartArea,
            l = r.options.animation,
            h = (a.left + a.right) / 2,
            d = (a.top + a.bottom) / 2,
            u = o && l.animateScale,
            f = u ? 0 : this.innerRadius,
            p = u ? 0 : this.outerRadius,
            {
                sharedOptions: g,
                includeOptions: m
            } = this._getSharedOptions(e, s);
        let b = this._getRotation(),
            _;
        for (_ = 0; _ < e; ++_) b += this._circumference(_, o);
        for (_ = e; _ < e + n; ++_) {
            const v = this._circumference(_, o),
                M = t[_],
                y = {
                    x: h + this.offsetX,
                    y: d + this.offsetY,
                    startAngle: b,
                    endAngle: b + v,
                    circumference: v,
                    outerRadius: p,
                    innerRadius: f
                };
            m && (y.options = g || this.resolveDataElementOptions(_, M.active ? "active" : s)), b += v, this.updateElement(M, _, y, s)
        }
    }
    calculateTotal() {
        const t = this._cachedMeta,
            e = t.data;
        let n = 0,
            s;
        for (s = 0; s < e.length; s++) {
            const o = t._parsed[s];
            o !== null && !isNaN(o) && this.chart.getDataVisibility(s) && !e[s].hidden && (n += Math.abs(o))
        }
        return n
    }
    calculateCircumference(t) {
        const e = this._cachedMeta.total;
        return e > 0 && !isNaN(t) ? V * (Math.abs(t) / e) : 0
    }
    getLabelAndValue(t) {
        const e = this._cachedMeta,
            n = this.chart,
            s = n.data.labels || [],
            o = Te(e._parsed[t], n.options.locale);
        return {
            label: s[t] || "",
            value: o
        }
    }
    getMaxBorderWidth(t) {
        let e = 0;
        const n = this.chart;
        let s, o, r, a, c;
        if (!t) {
            for (s = 0, o = n.data.datasets.length; s < o; ++s)
                if (n.isDatasetVisible(s)) {
                    r = n.getDatasetMeta(s), t = r.data, a = r.controller;
                    break
                }
        }
        if (!t) return 0;
        for (s = 0, o = t.length; s < o; ++s) c = a.resolveDataElementOptions(s), c.borderAlign !== "inner" && (e = Math.max(e, c.borderWidth || 0, c.hoverBorderWidth || 0));
        return e
    }
    getMaxOffset(t) {
        let e = 0;
        for (let n = 0, s = t.length; n < s; ++n) {
            const o = this.resolveDataElementOptions(n);
            e = Math.max(e, o.offset || 0, o.hoverOffset || 0)
        }
        return e
    }
    _getRingWeightOffset(t) {
        let e = 0;
        for (let n = 0; n < t; ++n) this.chart.isDatasetVisible(n) && (e += this._getRingWeight(n));
        return e
    }
    _getRingWeight(t) {
        return Math.max(A(this.chart.data.datasets[t].weight, 1), 0)
    }
    _getVisibleDatasetWeightTotal() {
        return this._getRingWeightOffset(this.chart.data.datasets.length) || 1
    }
}
k(de, "id", "doughnut"), k(de, "defaults", {
    datasetElementType: !1,
    dataElementType: "arc",
    animation: {
        animateRotate: !0,
        animateScale: !1
    },
    animations: {
        numbers: {
            type: "number",
            properties: ["circumference", "endAngle", "innerRadius", "outerRadius", "startAngle", "x", "y", "offset", "borderWidth", "spacing"]
        }
    },
    cutout: "50%",
    rotation: 0,
    circumference: 360,
    radius: "100%",
    spacing: 0,
    indexAxis: "r"
}), k(de, "descriptors", {
    _scriptable: t => t !== "spacing",
    _indexable: t => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
}), k(de, "overrides", {
    aspectRatio: 1,
    plugins: {
        legend: {
            labels: {
                generateLabels(t) {
                    const e = t.data;
                    if (e.labels.length && e.datasets.length) {
                        const {
                            labels: {
                                pointStyle: n,
                                color: s
                            }
                        } = t.legend.options;
                        return e.labels.map((o, r) => {
                            const c = t.getDatasetMeta(0).controller.getStyle(r);
                            return {
                                text: o,
                                fillStyle: c.backgroundColor,
                                strokeStyle: c.borderColor,
                                fontColor: s,
                                lineWidth: c.borderWidth,
                                pointStyle: n,
                                hidden: !t.getDataVisibility(r),
                                index: r
                            }
                        })
                    }
                    return []
                }
            },
            onClick(t, e, n) {
                n.chart.toggleDataVisibility(e.index), n.chart.update()
            }
        }
    }
});
class si extends $t {
    initialize() {
        this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize()
    }
    update(t) {
        const e = this._cachedMeta,
            {
                dataset: n,
                data: s = [],
                _dataset: o
            } = e,
            r = this.chart._animationsDisabled;
        let {
            start: a,
            count: c
        } = rc(e, s, r);
        this._drawStart = a, this._drawCount = c, ac(e) && (a = 0, c = s.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!o._decimated, n.points = s;
        const l = this.resolveDatasetElementOptions(t);
        this.options.showLine || (l.borderWidth = 0), l.segment = this.options.segment, this.updateElement(n, void 0, {
            animated: !r,
            options: l
        }, t), this.updateElements(s, a, c, t)
    }
    updateElements(t, e, n, s) {
        const o = s === "reset",
            {
                iScale: r,
                vScale: a,
                _stacked: c,
                _dataset: l
            } = this._cachedMeta,
            {
                sharedOptions: h,
                includeOptions: d
            } = this._getSharedOptions(e, s),
            u = r.axis,
            f = a.axis,
            {
                spanGaps: p,
                segment: g
            } = this.options,
            m = Me(p) ? p : Number.POSITIVE_INFINITY,
            b = this.chart._animationsDisabled || o || s === "none",
            _ = e + n,
            v = t.length;
        let M = e > 0 && this.getParsed(e - 1);
        for (let y = 0; y < v; ++y) {
            const x = t[y],
                w = b ? x : {};
            if (y < e || y >= _) {
                w.skip = !0;
                continue
            }
            const S = this.getParsed(y),
                O = E(S[f]),
                $ = w[u] = r.getPixelForValue(S[u], y),
                I = w[f] = o || O ? a.getBasePixel() : a.getPixelForValue(c ? this.applyStack(a, S, c) : S[f], y);
            w.skip = isNaN($) || isNaN(I) || O, w.stop = y > 0 && Math.abs(S[u] - M[u]) > m, g && (w.parsed = S, w.raw = l.data[y]), d && (w.options = h || this.resolveDataElementOptions(y, x.active ? "active" : s)), b || this.updateElement(x, y, w, s), M = S
        }
    }
    getMaxOverflow() {
        const t = this._cachedMeta,
            e = t.dataset,
            n = e.options && e.options.borderWidth || 0,
            s = t.data || [];
        if (!s.length) return n;
        const o = s[0].size(this.resolveDataElementOptions(0)),
            r = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
        return Math.max(n, o, r) / 2
    }
    draw() {
        const t = this._cachedMeta;
        t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw()
    }
}
k(si, "id", "line"), k(si, "defaults", {
    datasetElementType: "line",
    dataElementType: "point",
    showLine: !0,
    spanGaps: !1
}), k(si, "overrides", {
    scales: {
        _index_: {
            type: "category"
        },
        _value_: {
            type: "linear"
        }
    }
});
class oi extends $t {
    constructor(t, e) {
        super(t, e), this.innerRadius = void 0, this.outerRadius = void 0
    }
    getLabelAndValue(t) {
        const e = this._cachedMeta,
            n = this.chart,
            s = n.data.labels || [],
            o = Te(e._parsed[t].r, n.options.locale);
        return {
            label: s[t] || "",
            value: o
        }
    }
    parseObjectData(t, e, n, s) {
        return Vc.bind(this)(t, e, n, s)
    }
    update(t) {
        const e = this._cachedMeta.data;
        this._updateRadius(), this.updateElements(e, 0, e.length, t)
    }
    getMinMax() {
        const t = this._cachedMeta,
            e = {
                min: Number.POSITIVE_INFINITY,
                max: Number.NEGATIVE_INFINITY
            };
        return t.data.forEach((n, s) => {
            const o = this.getParsed(s).r;
            !isNaN(o) && this.chart.getDataVisibility(s) && (o < e.min && (e.min = o), o > e.max && (e.max = o))
        }), e
    }
    _updateRadius() {
        const t = this.chart,
            e = t.chartArea,
            n = t.options,
            s = Math.min(e.right - e.left, e.bottom - e.top),
            o = Math.max(s / 2, 0),
            r = Math.max(n.cutoutPercentage ? o / 100 * n.cutoutPercentage : 1, 0),
            a = (o - r) / t.getVisibleDatasetCount();
        this.outerRadius = o - a * this.index, this.innerRadius = this.outerRadius - a
    }
    updateElements(t, e, n, s) {
        const o = s === "reset",
            r = this.chart,
            c = r.options.animation,
            l = this._cachedMeta.rScale,
            h = l.xCenter,
            d = l.yCenter,
            u = l.getIndexAngle(0) - .5 * N;
        let f = u,
            p;
        const g = 360 / this.countVisibleElements();
        for (p = 0; p < e; ++p) f += this._computeAngle(p, s, g);
        for (p = e; p < e + n; p++) {
            const m = t[p];
            let b = f,
                _ = f + this._computeAngle(p, s, g),
                v = r.getDataVisibility(p) ? l.getDistanceFromCenterForValue(this.getParsed(p).r) : 0;
            f = _, o && (c.animateScale && (v = 0), c.animateRotate && (b = _ = u));
            const M = {
                x: h,
                y: d,
                innerRadius: 0,
                outerRadius: v,
                startAngle: b,
                endAngle: _,
                options: this.resolveDataElementOptions(p, m.active ? "active" : s)
            };
            this.updateElement(m, p, M, s)
        }
    }
    countVisibleElements() {
        const t = this._cachedMeta;
        let e = 0;
        return t.data.forEach((n, s) => {
            !isNaN(this.getParsed(s).r) && this.chart.getDataVisibility(s) && e++
        }), e
    }
    _computeAngle(t, e, n) {
        return this.chart.getDataVisibility(t) ? Z(this.resolveDataElementOptions(t, e).angle || n) : 0
    }
}
k(oi, "id", "polarArea"), k(oi, "defaults", {
    dataElementType: "arc",
    animation: {
        animateRotate: !0,
        animateScale: !0
    },
    animations: {
        numbers: {
            type: "number",
            properties: ["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"]
        }
    },
    indexAxis: "r",
    startAngle: 0
}), k(oi, "overrides", {
    aspectRatio: 1,
    plugins: {
        legend: {
            labels: {
                generateLabels(t) {
                    const e = t.data;
                    if (e.labels.length && e.datasets.length) {
                        const {
                            labels: {
                                pointStyle: n,
                                color: s
                            }
                        } = t.legend.options;
                        return e.labels.map((o, r) => {
                            const c = t.getDatasetMeta(0).controller.getStyle(r);
                            return {
                                text: o,
                                fillStyle: c.backgroundColor,
                                strokeStyle: c.borderColor,
                                fontColor: s,
                                lineWidth: c.borderWidth,
                                pointStyle: n,
                                hidden: !t.getDataVisibility(r),
                                index: r
                            }
                        })
                    }
                    return []
                }
            },
            onClick(t, e, n) {
                n.chart.toggleDataVisibility(e.index), n.chart.update()
            }
        }
    },
    scales: {
        r: {
            type: "radialLinear",
            angleLines: {
                display: !1
            },
            beginAtZero: !0,
            grid: {
                circular: !0
            },
            pointLabels: {
                display: !1
            },
            startAngle: 0
        }
    }
});

function wt() {
    throw new Error("This method is not implemented: Check that a complete date adapter is provided.")
}
class Fn {
    constructor(t) {
        k(this, "options");
        this.options = t || {}
    }
    static override(t) {
        Object.assign(Fn.prototype, t)
    }
    init() {}
    formats() {
        return wt()
    }
    parse() {
        return wt()
    }
    format() {
        return wt()
    }
    add() {
        return wt()
    }
    diff() {
        return wt()
    }
    startOf() {
        return wt()
    }
    endOf() {
        return wt()
    }
}
var $l = {
    _date: Fn
};

function Al(i, t, e, n) {
    const {
        controller: s,
        data: o,
        _sorted: r
    } = i, a = s._cachedMeta.iScale;
    if (a && t === a.axis && t !== "r" && r && o.length) {
        const c = a._reversePixels ? tc : Ot;
        if (n) {
            if (s._sharedOptions) {
                const l = o[0],
                    h = typeof l.getRange == "function" && l.getRange(t);
                if (h) {
                    const d = c(o, t, e - h),
                        u = c(o, t, e + h);
                    return {
                        lo: d.lo,
                        hi: u.hi
                    }
                }
            }
        } else return c(o, t, e)
    }
    return {
        lo: 0,
        hi: o.length - 1
    }
}

function Le(i, t, e, n, s) {
    const o = i.getSortedVisibleDatasetMetas(),
        r = e[t];
    for (let a = 0, c = o.length; a < c; ++a) {
        const {
            index: l,
            data: h
        } = o[a], {
            lo: d,
            hi: u
        } = Al(o[a], t, r, s);
        for (let f = d; f <= u; ++f) {
            const p = h[f];
            p.skip || n(p, l, f)
        }
    }
}

function El(i) {
    const t = i.indexOf("x") !== -1,
        e = i.indexOf("y") !== -1;
    return function(n, s) {
        const o = t ? Math.abs(n.x - s.x) : 0,
            r = e ? Math.abs(n.y - s.y) : 0;
        return Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2))
    }
}

function qi(i, t, e, n, s) {
    const o = [];
    return !s && !i.isPointInArea(t) || Le(i, e, t, function(a, c, l) {
        !s && !at(a, i.chartArea, 0) || a.inRange(t.x, t.y, n) && o.push({
            element: a,
            datasetIndex: c,
            index: l
        })
    }, !0), o
}

function Dl(i, t, e, n) {
    let s = [];

    function o(r, a, c) {
        const {
            startAngle: l,
            endAngle: h
        } = r.getProps(["startAngle", "endAngle"], n), {
            angle: d
        } = Ga(r, {
            x: t.x,
            y: t.y
        });
        mi(d, l, h) && s.push({
            element: r,
            datasetIndex: a,
            index: c
        })
    }
    return Le(i, e, t, o), s
}

function Il(i, t, e, n, s, o) {
    let r = [];
    const a = El(e);
    let c = Number.POSITIVE_INFINITY;

    function l(h, d, u) {
        const f = h.inRange(t.x, t.y, s);
        if (n && !f) return;
        const p = h.getCenterPoint(s);
        if (!(!!o || i.isPointInArea(p)) && !f) return;
        const m = a(t, p);
        m < c ? (r = [{
            element: h,
            datasetIndex: d,
            index: u
        }], c = m) : m === c && r.push({
            element: h,
            datasetIndex: d,
            index: u
        })
    }
    return Le(i, e, t, l), r
}

function Xi(i, t, e, n, s, o) {
    return !o && !i.isPointInArea(t) ? [] : e === "r" && !n ? Dl(i, t, e, s) : Il(i, t, e, n, s, o)
}

function Ts(i, t, e, n, s) {
    const o = [],
        r = e === "x" ? "inXRange" : "inYRange";
    let a = !1;
    return Le(i, e, t, (c, l, h) => {
        c[r](t[e], s) && (o.push({
            element: c,
            datasetIndex: l,
            index: h
        }), a = a || c.inRange(t.x, t.y, s))
    }), n && !a ? [] : o
}
var Tl = {
    evaluateInteractionItems: Le,
    modes: {
        index(i, t, e, n) {
            const s = St(t, i),
                o = e.axis || "x",
                r = e.includeInvisible || !1,
                a = e.intersect ? qi(i, s, o, n, r) : Xi(i, s, o, !1, n, r),
                c = [];
            return a.length ? (i.getSortedVisibleDatasetMetas().forEach(l => {
                const h = a[0].index,
                    d = l.data[h];
                d && !d.skip && c.push({
                    element: d,
                    datasetIndex: l.index,
                    index: h
                })
            }), c) : []
        },
        dataset(i, t, e, n) {
            const s = St(t, i),
                o = e.axis || "xy",
                r = e.includeInvisible || !1;
            let a = e.intersect ? qi(i, s, o, n, r) : Xi(i, s, o, !1, n, r);
            if (a.length > 0) {
                const c = a[0].datasetIndex,
                    l = i.getDatasetMeta(c).data;
                a = [];
                for (let h = 0; h < l.length; ++h) a.push({
                    element: l[h],
                    datasetIndex: c,
                    index: h
                })
            }
            return a
        },
        point(i, t, e, n) {
            const s = St(t, i),
                o = e.axis || "xy",
                r = e.includeInvisible || !1;
            return qi(i, s, o, n, r)
        },
        nearest(i, t, e, n) {
            const s = St(t, i),
                o = e.axis || "xy",
                r = e.includeInvisible || !1;
            return Xi(i, s, o, e.intersect, n, r)
        },
        x(i, t, e, n) {
            const s = St(t, i);
            return Ts(i, s, "x", e.intersect, n)
        },
        y(i, t, e, n) {
            const s = St(t, i);
            return Ts(i, s, "y", e.intersect, n)
        }
    }
};
const dr = ["left", "top", "right", "bottom"];

function oe(i, t) {
    return i.filter(e => e.pos === t)
}

function Ls(i, t) {
    return i.filter(e => dr.indexOf(e.pos) === -1 && e.box.axis === t)
}

function re(i, t) {
    return i.sort((e, n) => {
        const s = t ? n : e,
            o = t ? e : n;
        return s.weight === o.weight ? s.index - o.index : s.weight - o.weight
    })
}

function Ll(i) {
    const t = [];
    let e, n, s, o, r, a;
    for (e = 0, n = (i || []).length; e < n; ++e) s = i[e], {
        position: o,
        options: {
            stack: r,
            stackWeight: a = 1
        }
    } = s, t.push({
        index: e,
        box: s,
        pos: o,
        horizontal: s.isHorizontal(),
        weight: s.weight,
        stack: r && o + r,
        stackWeight: a
    });
    return t
}

function Rl(i) {
    const t = {};
    for (const e of i) {
        const {
            stack: n,
            pos: s,
            stackWeight: o
        } = e;
        if (!n || !dr.includes(s)) continue;
        const r = t[n] || (t[n] = {
            count: 0,
            placed: 0,
            weight: 0,
            size: 0
        });
        r.count++, r.weight += o
    }
    return t
}

function Fl(i, t) {
    const e = Rl(i),
        {
            vBoxMaxWidth: n,
            hBoxMaxHeight: s
        } = t;
    let o, r, a;
    for (o = 0, r = i.length; o < r; ++o) {
        a = i[o];
        const {
            fullSize: c
        } = a.box, l = e[a.stack], h = l && a.stackWeight / l.weight;
        a.horizontal ? (a.width = h ? h * n : c && t.availableWidth, a.height = s) : (a.width = n, a.height = h ? h * s : c && t.availableHeight)
    }
    return e
}

function Nl(i) {
    const t = Ll(i),
        e = re(t.filter(l => l.box.fullSize), !0),
        n = re(oe(t, "left"), !0),
        s = re(oe(t, "right")),
        o = re(oe(t, "top"), !0),
        r = re(oe(t, "bottom")),
        a = Ls(t, "x"),
        c = Ls(t, "y");
    return {
        fullSize: e,
        leftAndTop: n.concat(o),
        rightAndBottom: s.concat(c).concat(r).concat(a),
        chartArea: oe(t, "chartArea"),
        vertical: n.concat(s).concat(c),
        horizontal: o.concat(r).concat(a)
    }
}

function Rs(i, t, e, n) {
    return Math.max(i[e], t[e]) + Math.max(i[n], t[n])
}

function ur(i, t) {
    i.top = Math.max(i.top, t.top), i.left = Math.max(i.left, t.left), i.bottom = Math.max(i.bottom, t.bottom), i.right = Math.max(i.right, t.right)
}

function zl(i, t, e, n) {
    const {
        pos: s,
        box: o
    } = e, r = i.maxPadding;
    if (!P(s)) {
        e.size && (i[s] -= e.size);
        const d = n[e.stack] || {
            size: 0,
            count: 1
        };
        d.size = Math.max(d.size, e.horizontal ? o.height : o.width), e.size = d.size / d.count, i[s] += e.size
    }
    o.getPadding && ur(r, o.getPadding());
    const a = Math.max(0, t.outerWidth - Rs(r, i, "left", "right")),
        c = Math.max(0, t.outerHeight - Rs(r, i, "top", "bottom")),
        l = a !== i.w,
        h = c !== i.h;
    return i.w = a, i.h = c, e.horizontal ? {
        same: l,
        other: h
    } : {
        same: h,
        other: l
    }
}

function jl(i) {
    const t = i.maxPadding;

    function e(n) {
        const s = Math.max(t[n] - i[n], 0);
        return i[n] += s, s
    }
    i.y += e("top"), i.x += e("left"), e("right"), e("bottom")
}

function Bl(i, t) {
    const e = t.maxPadding;

    function n(s) {
        const o = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        return s.forEach(r => {
            o[r] = Math.max(t[r], e[r])
        }), o
    }
    return n(i ? ["left", "right"] : ["top", "bottom"])
}

function ue(i, t, e, n) {
    const s = [];
    let o, r, a, c, l, h;
    for (o = 0, r = i.length, l = 0; o < r; ++o) {
        a = i[o], c = a.box, c.update(a.width || t.w, a.height || t.h, Bl(a.horizontal, t));
        const {
            same: d,
            other: u
        } = zl(t, e, a, n);
        l |= d && s.length, h = h || u, c.fullSize || s.push(a)
    }
    return l && ue(s, t, e, n) || h
}

function Xe(i, t, e, n, s) {
    i.top = e, i.left = t, i.right = t + n, i.bottom = e + s, i.width = n, i.height = s
}

function Fs(i, t, e, n) {
    const s = e.padding;
    let {
        x: o,
        y: r
    } = t;
    for (const a of i) {
        const c = a.box,
            l = n[a.stack] || {
                count: 1,
                placed: 0,
                weight: 1
            },
            h = a.stackWeight / l.weight || 1;
        if (a.horizontal) {
            const d = t.w * h,
                u = l.size || c.height;
            pi(l.start) && (r = l.start), c.fullSize ? Xe(c, s.left, r, e.outerWidth - s.right - s.left, u) : Xe(c, t.left + l.placed, r, d, u), l.start = r, l.placed += d, r = c.bottom
        } else {
            const d = t.h * h,
                u = l.size || c.width;
            pi(l.start) && (o = l.start), c.fullSize ? Xe(c, o, s.top, u, e.outerHeight - s.bottom - s.top) : Xe(c, o, t.top + l.placed, u, d), l.start = o, l.placed += d, o = c.right
        }
    }
    t.x = o, t.y = r
}
var Ke = {
    addBox(i, t) {
        i.boxes || (i.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
            return [{
                z: 0,
                draw(e) {
                    t.draw(e)
                }
            }]
        }, i.boxes.push(t)
    },
    removeBox(i, t) {
        const e = i.boxes ? i.boxes.indexOf(t) : -1;
        e !== -1 && i.boxes.splice(e, 1)
    },
    configure(i, t, e) {
        t.fullSize = e.fullSize, t.position = e.position, t.weight = e.weight
    },
    update(i, t, e, n) {
        if (!i) return;
        const s = ct(i.options.layout.padding),
            o = Math.max(t - s.width, 0),
            r = Math.max(e - s.height, 0),
            a = Nl(i.boxes),
            c = a.vertical,
            l = a.horizontal;
        H(i.boxes, g => {
            typeof g.beforeLayout == "function" && g.beforeLayout()
        });
        const h = c.reduce((g, m) => m.box.options && m.box.options.display === !1 ? g : g + 1, 0) || 1,
            d = Object.freeze({
                outerWidth: t,
                outerHeight: e,
                padding: s,
                availableWidth: o,
                availableHeight: r,
                vBoxMaxWidth: o / 2 / h,
                hBoxMaxHeight: r / 2
            }),
            u = Object.assign({}, s);
        ur(u, ct(n));
        const f = Object.assign({
                maxPadding: u,
                w: o,
                h: r,
                x: s.left,
                y: s.top
            }, s),
            p = Fl(c.concat(l), d);
        ue(a.fullSize, f, d, p), ue(c, f, d, p), ue(l, f, d, p) && ue(c, f, d, p), jl(f), Fs(a.leftAndTop, f, d, p), f.x += f.w, f.y += f.h, Fs(a.rightAndBottom, f, d, p), i.chartArea = {
            left: f.left,
            top: f.top,
            right: f.left + f.w,
            bottom: f.top + f.h,
            height: f.h,
            width: f.w
        }, H(a.chartArea, g => {
            const m = g.box;
            Object.assign(m, i.chartArea), m.update(f.w, f.h, {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            })
        })
    }
};
class fr {
    acquireContext(t, e) {}
    releaseContext(t) {
        return !1
    }
    addEventListener(t, e, n) {}
    removeEventListener(t, e, n) {}
    getDevicePixelRatio() {
        return 1
    }
    getMaximumSize(t, e, n, s) {
        return e = Math.max(0, e || t.width), n = n || t.height, {
            width: e,
            height: Math.max(0, s ? Math.floor(e / s) : n)
        }
    }
    isAttached(t) {
        return !0
    }
    updateConfig(t) {}
}
class Vl extends fr {
    acquireContext(t) {
        return t && t.getContext && t.getContext("2d") || null
    }
    updateConfig(t) {
        t.options.animation = !1
    }
}
const ri = "$chartjs",
    Hl = {
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup",
        pointerenter: "mouseenter",
        pointerdown: "mousedown",
        pointermove: "mousemove",
        pointerup: "mouseup",
        pointerleave: "mouseout",
        pointerout: "mouseout"
    },
    Ns = i => i === null || i === "";

function Wl(i, t) {
    const e = i.style,
        n = i.getAttribute("height"),
        s = i.getAttribute("width");
    if (i[ri] = {
            initial: {
                height: n,
                width: s,
                style: {
                    display: e.display,
                    height: e.height,
                    width: e.width
                }
            }
        }, e.display = e.display || "block", e.boxSizing = e.boxSizing || "border-box", Ns(s)) {
        const o = ks(i, "width");
        o !== void 0 && (i.width = o)
    }
    if (Ns(n))
        if (i.style.height === "") i.height = i.width / (t || 2);
        else {
            const o = ks(i, "height");
            o !== void 0 && (i.height = o)
        }
    return i
}
const pr = il ? {
    passive: !0
} : !1;

function Ul(i, t, e) {
    i.addEventListener(t, e, pr)
}

function Yl(i, t, e) {
    i.canvas.removeEventListener(t, e, pr)
}

function ql(i, t) {
    const e = Hl[i.type] || i.type,
        {
            x: n,
            y: s
        } = St(i, t);
    return {
        type: e,
        chart: t,
        native: i,
        x: n !== void 0 ? n : null,
        y: s !== void 0 ? s : null
    }
}

function xi(i, t) {
    for (const e of i)
        if (e === t || e.contains(t)) return !0
}

function Xl(i, t, e) {
    const n = i.canvas,
        s = new MutationObserver(o => {
            let r = !1;
            for (const a of o) r = r || xi(a.addedNodes, n), r = r && !xi(a.removedNodes, n);
            r && e()
        });
    return s.observe(document, {
        childList: !0,
        subtree: !0
    }), s
}

function Kl(i, t, e) {
    const n = i.canvas,
        s = new MutationObserver(o => {
            let r = !1;
            for (const a of o) r = r || xi(a.removedNodes, n), r = r && !xi(a.addedNodes, n);
            r && e()
        });
    return s.observe(document, {
        childList: !0,
        subtree: !0
    }), s
}
const Ce = new Map;
let zs = 0;

function gr() {
    const i = window.devicePixelRatio;
    i !== zs && (zs = i, Ce.forEach((t, e) => {
        e.currentDevicePixelRatio !== i && t()
    }))
}

function Gl(i, t) {
    Ce.size || window.addEventListener("resize", gr), Ce.set(i, t)
}

function Ql(i) {
    Ce.delete(i), Ce.size || window.removeEventListener("resize", gr)
}

function Zl(i, t, e) {
    const n = i.canvas,
        s = n && Rn(n);
    if (!s) return;
    const o = Jo((a, c) => {
            const l = s.clientWidth;
            e(a, c), l < s.clientWidth && e()
        }, window),
        r = new ResizeObserver(a => {
            const c = a[0],
                l = c.contentRect.width,
                h = c.contentRect.height;
            l === 0 && h === 0 || o(l, h)
        });
    return r.observe(s), Gl(i, o), r
}

function Ki(i, t, e) {
    e && e.disconnect(), t === "resize" && Ql(i)
}

function Jl(i, t, e) {
    const n = i.canvas,
        s = Jo(o => {
            i.ctx !== null && e(ql(o, i))
        }, i);
    return Ul(n, t, s), s
}
class th extends fr {
    acquireContext(t, e) {
        const n = t && t.getContext && t.getContext("2d");
        return n && n.canvas === t ? (Wl(t, e), n) : null
    }
    releaseContext(t) {
        const e = t.canvas;
        if (!e[ri]) return !1;
        const n = e[ri].initial;
        ["height", "width"].forEach(o => {
            const r = n[o];
            E(r) ? e.removeAttribute(o) : e.setAttribute(o, r)
        });
        const s = n.style || {};
        return Object.keys(s).forEach(o => {
            e.style[o] = s[o]
        }), e.width = e.width, delete e[ri], !0
    }
    addEventListener(t, e, n) {
        this.removeEventListener(t, e);
        const s = t.$proxies || (t.$proxies = {}),
            r = {
                attach: Xl,
                detach: Kl,
                resize: Zl
            }[e] || Jl;
        s[e] = r(t, e, n)
    }
    removeEventListener(t, e) {
        const n = t.$proxies || (t.$proxies = {}),
            s = n[e];
        if (!s) return;
        ({
            attach: Ki,
            detach: Ki,
            resize: Ki
        }[e] || Yl)(t, e, s), n[e] = void 0
    }
    getDevicePixelRatio() {
        return window.devicePixelRatio
    }
    getMaximumSize(t, e, n, s) {
        return el(t, e, n, s)
    }
    isAttached(t) {
        const e = Rn(t);
        return !!(e && e.isConnected)
    }
}

function eh(i) {
    return !Ln() || typeof OffscreenCanvas != "undefined" && i instanceof OffscreenCanvas ? Vl : th
}
class Qt {
    constructor() {
        k(this, "x");
        k(this, "y");
        k(this, "active", !1);
        k(this, "options");
        k(this, "$animations")
    }
    tooltipPosition(t) {
        const {
            x: e,
            y: n
        } = this.getProps(["x", "y"], t);
        return {
            x: e,
            y: n
        }
    }
    hasValue() {
        return Me(this.x) && Me(this.y)
    }
    getProps(t, e) {
        const n = this.$animations;
        if (!e || !n) return this;
        const s = {};
        return t.forEach(o => {
            s[o] = n[o] && n[o].active() ? n[o]._to : this[o]
        }), s
    }
}
k(Qt, "defaults", {}), k(Qt, "defaultRoutes");

function ih(i, t) {
    const e = i.options.ticks,
        n = nh(i),
        s = Math.min(e.maxTicksLimit || n, n),
        o = e.major.enabled ? oh(t) : [],
        r = o.length,
        a = o[0],
        c = o[r - 1],
        l = [];
    if (r > s) return rh(t, l, o, r / s), l;
    const h = sh(o, t, s);
    if (r > 0) {
        let d, u;
        const f = r > 1 ? Math.round((c - a) / (r - 1)) : null;
        for (Ge(t, l, h, E(f) ? 0 : a - f, a), d = 0, u = r - 1; d < u; d++) Ge(t, l, h, o[d], o[d + 1]);
        return Ge(t, l, h, c, E(f) ? t.length : c + f), l
    }
    return Ge(t, l, h), l
}

function nh(i) {
    const t = i.options.offset,
        e = i._tickSize(),
        n = i._length / e + (t ? 0 : 1),
        s = i._maxLength / e;
    return Math.floor(Math.min(n, s))
}

function sh(i, t, e) {
    const n = ah(i),
        s = t.length / e;
    if (!n) return Math.max(s, 1);
    const o = Xa(n);
    for (let r = 0, a = o.length - 1; r < a; r++) {
        const c = o[r];
        if (c > s) return c
    }
    return Math.max(s, 1)
}

function oh(i) {
    const t = [];
    let e, n;
    for (e = 0, n = i.length; e < n; e++) i[e].major && t.push(e);
    return t
}

function rh(i, t, e, n) {
    let s = 0,
        o = e[0],
        r;
    for (n = Math.ceil(n), r = 0; r < i.length; r++) r === o && (t.push(i[r]), s++, o = e[s * n])
}

function Ge(i, t, e, n, s) {
    const o = A(n, 0),
        r = Math.min(A(s, i.length), i.length);
    let a = 0,
        c, l, h;
    for (e = Math.ceil(e), s && (c = s - n, e = c / Math.floor(c / e)), h = o; h < 0;) a++, h = Math.round(o + a * e);
    for (l = Math.max(o, 0); l < r; l++) l === h && (t.push(i[l]), a++, h = Math.round(o + a * e))
}

function ah(i) {
    const t = i.length;
    let e, n;
    if (t < 2) return !1;
    for (n = i[0], e = 1; e < t; ++e)
        if (i[e] - i[e - 1] !== n) return !1;
    return n
}
const ch = i => i === "left" ? "right" : i === "right" ? "left" : i,
    js = (i, t, e) => t === "top" || t === "left" ? i[t] + e : i[t] - e,
    Bs = (i, t) => Math.min(t || i, i);

function Vs(i, t) {
    const e = [],
        n = i.length / t,
        s = i.length;
    let o = 0;
    for (; o < s; o += n) e.push(i[Math.floor(o)]);
    return e
}

function lh(i, t, e) {
    const n = i.ticks.length,
        s = Math.min(t, n - 1),
        o = i._startPixel,
        r = i._endPixel,
        a = 1e-6;
    let c = i.getPixelForTick(s),
        l;
    if (!(e && (n === 1 ? l = Math.max(c - o, r - c) : t === 0 ? l = (i.getPixelForTick(1) - c) / 2 : l = (c - i.getPixelForTick(s - 1)) / 2, c += s < t ? l : -l, c < o - a || c > r + a))) return c
}

function hh(i, t) {
    H(i, e => {
        const n = e.gc,
            s = n.length / 2;
        let o;
        if (s > t) {
            for (o = 0; o < s; ++o) delete e.data[n[o]];
            n.splice(0, s)
        }
    })
}

function ae(i) {
    return i.drawTicks ? i.tickLength : 0
}

function Hs(i, t) {
    if (!i.display) return 0;
    const e = Xt(i.font, t),
        n = ct(i.padding);
    return (R(i.text) ? i.text.length : 1) * e.lineHeight + n.height
}

function dh(i, t) {
    return Ft(i, {
        scale: t,
        type: "scale"
    })
}

function uh(i, t, e) {
    return Ft(i, {
        tick: e,
        index: t,
        type: "tick"
    })
}

function fh(i, t, e) {
    let n = oc(i);
    return (e && t !== "right" || !e && t === "right") && (n = ch(n)), n
}

function ph(i, t, e, n) {
    const {
        top: s,
        left: o,
        bottom: r,
        right: a,
        chart: c
    } = i, {
        chartArea: l,
        scales: h
    } = c;
    let d = 0,
        u, f, p;
    const g = r - s,
        m = a - o;
    if (i.isHorizontal()) {
        if (f = ps(n, o, a), P(e)) {
            const b = Object.keys(e)[0],
                _ = e[b];
            p = h[b].getPixelForValue(_) + g - t
        } else e === "center" ? p = (l.bottom + l.top) / 2 + g - t : p = js(i, e, t);
        u = a - o
    } else {
        if (P(e)) {
            const b = Object.keys(e)[0],
                _ = e[b];
            f = h[b].getPixelForValue(_) - m + t
        } else e === "center" ? f = (l.left + l.right) / 2 - m + t : f = js(i, e, t);
        p = ps(n, r, s), d = e === "left" ? -W : W
    }
    return {
        titleX: f,
        titleY: p,
        maxWidth: u,
        rotation: d
    }
}
class Nt extends Qt {
    constructor(t) {
        super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0
    }
    init(t) {
        this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax)
    }
    parse(t, e) {
        return t
    }
    getUserBounds() {
        let {
            _userMin: t,
            _userMax: e,
            _suggestedMin: n,
            _suggestedMax: s
        } = this;
        return t = q(t, Number.POSITIVE_INFINITY), e = q(e, Number.NEGATIVE_INFINITY), n = q(n, Number.POSITIVE_INFINITY), s = q(s, Number.NEGATIVE_INFINITY), {
            min: q(t, n),
            max: q(e, s),
            minDefined: j(t),
            maxDefined: j(e)
        }
    }
    getMinMax(t) {
        let {
            min: e,
            max: n,
            minDefined: s,
            maxDefined: o
        } = this.getUserBounds(), r;
        if (s && o) return {
            min: e,
            max: n
        };
        const a = this.getMatchingVisibleMetas();
        for (let c = 0, l = a.length; c < l; ++c) r = a[c].controller.getMinMax(this, t), s || (e = Math.min(e, r.min)), o || (n = Math.max(n, r.max));
        return e = o && e > n ? n : e, n = s && e > n ? e : n, {
            min: q(e, q(n, e)),
            max: q(n, q(e, n))
        }
    }
    getPadding() {
        return {
            left: this.paddingLeft || 0,
            top: this.paddingTop || 0,
            right: this.paddingRight || 0,
            bottom: this.paddingBottom || 0
        }
    }
    getTicks() {
        return this.ticks
    }
    getLabels() {
        const t = this.chart.data;
        return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || []
    }
    getLabelItems(t = this.chart.chartArea) {
        return this._labelItems || (this._labelItems = this._computeLabelItems(t))
    }
    beforeLayout() {
        this._cache = {}, this._dataLimitsCached = !1
    }
    beforeUpdate() {
        D(this.options.beforeUpdate, [this])
    }
    update(t, e, n) {
        const {
            beginAtZero: s,
            grace: o,
            ticks: r
        } = this.options, a = r.sampleSize;
        this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = n = Object.assign({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Dc(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
        const c = a < this.ticks.length;
        this._convertTicksToLabels(c ? Vs(this.ticks, a) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), r.display && (r.autoSkip || r.source === "auto") && (this.ticks = ih(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), c && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate()
    }
    configure() {
        let t = this.options.reverse,
            e, n;
        this.isHorizontal() ? (e = this.left, n = this.right) : (e = this.top, n = this.bottom, t = !t), this._startPixel = e, this._endPixel = n, this._reversePixels = t, this._length = n - e, this._alignToPixels = this.options.alignToPixels
    }
    afterUpdate() {
        D(this.options.afterUpdate, [this])
    }
    beforeSetDimensions() {
        D(this.options.beforeSetDimensions, [this])
    }
    setDimensions() {
        this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0
    }
    afterSetDimensions() {
        D(this.options.afterSetDimensions, [this])
    }
    _callHooks(t) {
        this.chart.notifyPlugins(t, this.getContext()), D(this.options[t], [this])
    }
    beforeDataLimits() {
        this._callHooks("beforeDataLimits")
    }
    determineDataLimits() {}
    afterDataLimits() {
        this._callHooks("afterDataLimits")
    }
    beforeBuildTicks() {
        this._callHooks("beforeBuildTicks")
    }
    buildTicks() {
        return []
    }
    afterBuildTicks() {
        this._callHooks("afterBuildTicks")
    }
    beforeTickToLabelConversion() {
        D(this.options.beforeTickToLabelConversion, [this])
    }
    generateTickLabels(t) {
        const e = this.options.ticks;
        let n, s, o;
        for (n = 0, s = t.length; n < s; n++) o = t[n], o.label = D(e.callback, [o.value, n, t], this)
    }
    afterTickToLabelConversion() {
        D(this.options.afterTickToLabelConversion, [this])
    }
    beforeCalculateLabelRotation() {
        D(this.options.beforeCalculateLabelRotation, [this])
    }
    calculateLabelRotation() {
        const t = this.options,
            e = t.ticks,
            n = Bs(this.ticks.length, t.ticks.maxTicksLimit),
            s = e.minRotation || 0,
            o = e.maxRotation;
        let r = s,
            a, c, l;
        if (!this._isVisible() || !e.display || s >= o || n <= 1 || !this.isHorizontal()) {
            this.labelRotation = s;
            return
        }
        const h = this._getLabelSizes(),
            d = h.widest.width,
            u = h.highest.height,
            f = it(this.chart.width - d, 0, this.maxWidth);
        a = t.offset ? this.maxWidth / n : f / (n - 1), d + 6 > a && (a = f / (n - (t.offset ? .5 : 1)), c = this.maxHeight - ae(t.grid) - e.padding - Hs(t.title, this.chart.options.font), l = Math.sqrt(d * d + u * u), r = $n(Math.min(Math.asin(it((h.highest.height + 6) / a, -1, 1)), Math.asin(it(c / l, -1, 1)) - Math.asin(it(u / l, -1, 1)))), r = Math.max(s, Math.min(o, r))), this.labelRotation = r
    }
    afterCalculateLabelRotation() {
        D(this.options.afterCalculateLabelRotation, [this])
    }
    afterAutoSkip() {}
    beforeFit() {
        D(this.options.beforeFit, [this])
    }
    fit() {
        const t = {
                width: 0,
                height: 0
            },
            {
                chart: e,
                options: {
                    ticks: n,
                    title: s,
                    grid: o
                }
            } = this,
            r = this._isVisible(),
            a = this.isHorizontal();
        if (r) {
            const c = Hs(s, e.options.font);
            if (a ? (t.width = this.maxWidth, t.height = ae(o) + c) : (t.height = this.maxHeight, t.width = ae(o) + c), n.display && this.ticks.length) {
                const {
                    first: l,
                    last: h,
                    widest: d,
                    highest: u
                } = this._getLabelSizes(), f = n.padding * 2, p = Z(this.labelRotation), g = Math.cos(p), m = Math.sin(p);
                if (a) {
                    const b = n.mirror ? 0 : m * d.width + g * u.height;
                    t.height = Math.min(this.maxHeight, t.height + b + f)
                } else {
                    const b = n.mirror ? 0 : g * d.width + m * u.height;
                    t.width = Math.min(this.maxWidth, t.width + b + f)
                }
                this._calculatePadding(l, h, m, g)
            }
        }
        this._handleMargins(), a ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom)
    }
    _calculatePadding(t, e, n, s) {
        const {
            ticks: {
                align: o,
                padding: r
            },
            position: a
        } = this.options, c = this.labelRotation !== 0, l = a !== "top" && this.axis === "x";
        if (this.isHorizontal()) {
            const h = this.getPixelForTick(0) - this.left,
                d = this.right - this.getPixelForTick(this.ticks.length - 1);
            let u = 0,
                f = 0;
            c ? l ? (u = s * t.width, f = n * e.height) : (u = n * t.height, f = s * e.width) : o === "start" ? f = e.width : o === "end" ? u = t.width : o !== "inner" && (u = t.width / 2, f = e.width / 2), this.paddingLeft = Math.max((u - h + r) * this.width / (this.width - h), 0), this.paddingRight = Math.max((f - d + r) * this.width / (this.width - d), 0)
        } else {
            let h = e.height / 2,
                d = t.height / 2;
            o === "start" ? (h = 0, d = t.height) : o === "end" && (h = e.height, d = 0), this.paddingTop = h + r, this.paddingBottom = d + r
        }
    }
    _handleMargins() {
        this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom))
    }
    afterFit() {
        D(this.options.afterFit, [this])
    }
    isHorizontal() {
        const {
            axis: t,
            position: e
        } = this.options;
        return e === "top" || e === "bottom" || t === "x"
    }
    isFullSize() {
        return this.options.fullSize
    }
    _convertTicksToLabels(t) {
        this.beforeTickToLabelConversion(), this.generateTickLabels(t);
        let e, n;
        for (e = 0, n = t.length; e < n; e++) E(t[e].label) && (t.splice(e, 1), n--, e--);
        this.afterTickToLabelConversion()
    }
    _getLabelSizes() {
        let t = this._labelSizes;
        if (!t) {
            const e = this.options.ticks.sampleSize;
            let n = this.ticks;
            e < n.length && (n = Vs(n, e)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit)
        }
        return t
    }
    _computeLabelSizes(t, e, n) {
        const {
            ctx: s,
            _longestTextCache: o
        } = this, r = [], a = [], c = Math.floor(e / Bs(e, n));
        let l = 0,
            h = 0,
            d, u, f, p, g, m, b, _, v, M, y;
        for (d = 0; d < e; d += c) {
            if (p = t[d].label, g = this._resolveTickFontOptions(d), s.font = m = g.string, b = o[m] = o[m] || {
                    data: {},
                    gc: []
                }, _ = g.lineHeight, v = M = 0, !E(p) && !R(p)) v = bi(s, b.data, b.gc, v, p), M = _;
            else if (R(p))
                for (u = 0, f = p.length; u < f; ++u) y = p[u], !E(y) && !R(y) && (v = bi(s, b.data, b.gc, v, y), M += _);
            r.push(v), a.push(M), l = Math.max(v, l), h = Math.max(M, h)
        }
        hh(o, e);
        const x = r.indexOf(l),
            w = a.indexOf(h),
            S = O => ({
                width: r[O] || 0,
                height: a[O] || 0
            });
        return {
            first: S(0),
            last: S(e - 1),
            widest: S(x),
            highest: S(w),
            widths: r,
            heights: a
        }
    }
    getLabelForValue(t) {
        return t
    }
    getPixelForValue(t, e) {
        return NaN
    }
    getValueForPixel(t) {}
    getPixelForTick(t) {
        const e = this.ticks;
        return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value)
    }
    getPixelForDecimal(t) {
        this._reversePixels && (t = 1 - t);
        const e = this._startPixel + t * this._length;
        return Za(this._alignToPixels ? vt(this.chart, e, 0) : e)
    }
    getDecimalForPixel(t) {
        const e = (t - this._startPixel) / this._length;
        return this._reversePixels ? 1 - e : e
    }
    getBasePixel() {
        return this.getPixelForValue(this.getBaseValue())
    }
    getBaseValue() {
        const {
            min: t,
            max: e
        } = this;
        return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0
    }
    getContext(t) {
        const e = this.ticks || [];
        if (t >= 0 && t < e.length) {
            const n = e[t];
            return n.$context || (n.$context = uh(this.getContext(), t, n))
        }
        return this.$context || (this.$context = dh(this.chart.getContext(), this))
    }
    _tickSize() {
        const t = this.options.ticks,
            e = Z(this.labelRotation),
            n = Math.abs(Math.cos(e)),
            s = Math.abs(Math.sin(e)),
            o = this._getLabelSizes(),
            r = t.autoSkipPadding || 0,
            a = o ? o.widest.width + r : 0,
            c = o ? o.highest.height + r : 0;
        return this.isHorizontal() ? c * n > a * s ? a / n : c / s : c * s < a * n ? c / n : a / s
    }
    _isVisible() {
        const t = this.options.display;
        return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0
    }
    _computeGridLineItems(t) {
        const e = this.axis,
            n = this.chart,
            s = this.options,
            {
                grid: o,
                position: r,
                border: a
            } = s,
            c = o.offset,
            l = this.isHorizontal(),
            d = this.ticks.length + (c ? 1 : 0),
            u = ae(o),
            f = [],
            p = a.setContext(this.getContext()),
            g = p.display ? p.width : 0,
            m = g / 2,
            b = function(B) {
                return vt(n, B, g)
            };
        let _, v, M, y, x, w, S, O, $, I, z, tt;
        if (r === "top") _ = b(this.bottom), w = this.bottom - u, O = _ - m, I = b(t.top) + m, tt = t.bottom;
        else if (r === "bottom") _ = b(this.top), I = t.top, tt = b(t.bottom) - m, w = _ + m, O = this.top + u;
        else if (r === "left") _ = b(this.right), x = this.right - u, S = _ - m, $ = b(t.left) + m, z = t.right;
        else if (r === "right") _ = b(this.left), $ = t.left, z = b(t.right) - m, x = _ + m, S = this.left + u;
        else if (e === "x") {
            if (r === "center") _ = b((t.top + t.bottom) / 2 + .5);
            else if (P(r)) {
                const B = Object.keys(r)[0],
                    X = r[B];
                _ = b(this.chart.scales[B].getPixelForValue(X))
            }
            I = t.top, tt = t.bottom, w = _ + m, O = w + u
        } else if (e === "y") {
            if (r === "center") _ = b((t.left + t.right) / 2);
            else if (P(r)) {
                const B = Object.keys(r)[0],
                    X = r[B];
                _ = b(this.chart.scales[B].getPixelForValue(X))
            }
            x = _ - m, S = x - u, $ = t.left, z = t.right
        }
        const lt = A(s.ticks.maxTicksLimit, d),
            T = Math.max(1, Math.ceil(d / lt));
        for (v = 0; v < d; v += T) {
            const B = this.getContext(v),
                X = o.setContext(B),
                Ne = a.setContext(B),
                ze = X.lineWidth,
                zt = X.color,
                je = Ne.dash || [],
                jt = Ne.dashOffset,
                ee = X.tickWidth,
                bt = X.tickColor,
                ie = X.tickBorderDash || [],
                _t = X.tickBorderDashOffset;
            M = lh(this, v, c), M !== void 0 && (y = vt(n, M, ze), l ? x = S = $ = z = y : w = O = I = tt = y, f.push({
                tx1: x,
                ty1: w,
                tx2: S,
                ty2: O,
                x1: $,
                y1: I,
                x2: z,
                y2: tt,
                width: ze,
                color: zt,
                borderDash: je,
                borderDashOffset: jt,
                tickWidth: ee,
                tickColor: bt,
                tickBorderDash: ie,
                tickBorderDashOffset: _t
            }))
        }
        return this._ticksLength = d, this._borderValue = _, f
    }
    _computeLabelItems(t) {
        const e = this.axis,
            n = this.options,
            {
                position: s,
                ticks: o
            } = n,
            r = this.isHorizontal(),
            a = this.ticks,
            {
                align: c,
                crossAlign: l,
                padding: h,
                mirror: d
            } = o,
            u = ae(n.grid),
            f = u + h,
            p = d ? -h : f,
            g = -Z(this.labelRotation),
            m = [];
        let b, _, v, M, y, x, w, S, O, $, I, z, tt = "middle";
        if (s === "top") x = this.bottom - p, w = this._getXAxisLabelAlignment();
        else if (s === "bottom") x = this.top + p, w = this._getXAxisLabelAlignment();
        else if (s === "left") {
            const T = this._getYAxisLabelAlignment(u);
            w = T.textAlign, y = T.x
        } else if (s === "right") {
            const T = this._getYAxisLabelAlignment(u);
            w = T.textAlign, y = T.x
        } else if (e === "x") {
            if (s === "center") x = (t.top + t.bottom) / 2 + f;
            else if (P(s)) {
                const T = Object.keys(s)[0],
                    B = s[T];
                x = this.chart.scales[T].getPixelForValue(B) + f
            }
            w = this._getXAxisLabelAlignment()
        } else if (e === "y") {
            if (s === "center") y = (t.left + t.right) / 2 - f;
            else if (P(s)) {
                const T = Object.keys(s)[0],
                    B = s[T];
                y = this.chart.scales[T].getPixelForValue(B)
            }
            w = this._getYAxisLabelAlignment(u).textAlign
        }
        e === "y" && (c === "start" ? tt = "top" : c === "end" && (tt = "bottom"));
        const lt = this._getLabelSizes();
        for (b = 0, _ = a.length; b < _; ++b) {
            v = a[b], M = v.label;
            const T = o.setContext(this.getContext(b));
            S = this.getPixelForTick(b) + o.labelOffset, O = this._resolveTickFontOptions(b), $ = O.lineHeight, I = R(M) ? M.length : 1;
            const B = I / 2,
                X = T.color,
                Ne = T.textStrokeColor,
                ze = T.textStrokeWidth;
            let zt = w;
            r ? (y = S, w === "inner" && (b === _ - 1 ? zt = this.options.reverse ? "left" : "right" : b === 0 ? zt = this.options.reverse ? "right" : "left" : zt = "center"), s === "top" ? l === "near" || g !== 0 ? z = -I * $ + $ / 2 : l === "center" ? z = -lt.highest.height / 2 - B * $ + $ : z = -lt.highest.height + $ / 2 : l === "near" || g !== 0 ? z = $ / 2 : l === "center" ? z = lt.highest.height / 2 - B * $ : z = lt.highest.height - I * $, d && (z *= -1), g !== 0 && !T.showLabelBackdrop && (y += $ / 2 * Math.sin(g))) : (x = S, z = (1 - I) * $ / 2);
            let je;
            if (T.showLabelBackdrop) {
                const jt = ct(T.backdropPadding),
                    ee = lt.heights[b],
                    bt = lt.widths[b];
                let ie = z - jt.top,
                    _t = 0 - jt.left;
                switch (tt) {
                    case "middle":
                        ie -= ee / 2;
                        break;
                    case "bottom":
                        ie -= ee;
                        break
                }
                switch (w) {
                    case "center":
                        _t -= bt / 2;
                        break;
                    case "right":
                        _t -= bt;
                        break;
                    case "inner":
                        b === _ - 1 ? _t -= bt : b > 0 && (_t -= bt / 2);
                        break
                }
                je = {
                    left: _t,
                    top: ie,
                    width: bt + jt.width,
                    height: ee + jt.height,
                    color: T.backdropColor
                }
            }
            m.push({
                label: M,
                font: O,
                textOffset: z,
                options: {
                    rotation: g,
                    color: X,
                    strokeColor: Ne,
                    strokeWidth: ze,
                    textAlign: zt,
                    textBaseline: tt,
                    translation: [y, x],
                    backdrop: je
                }
            })
        }
        return m
    }
    _getXAxisLabelAlignment() {
        const {
            position: t,
            ticks: e
        } = this.options;
        if (-Z(this.labelRotation)) return t === "top" ? "left" : "right";
        let s = "center";
        return e.align === "start" ? s = "left" : e.align === "end" ? s = "right" : e.align === "inner" && (s = "inner"), s
    }
    _getYAxisLabelAlignment(t) {
        const {
            position: e,
            ticks: {
                crossAlign: n,
                mirror: s,
                padding: o
            }
        } = this.options, r = this._getLabelSizes(), a = t + o, c = r.widest.width;
        let l, h;
        return e === "left" ? s ? (h = this.right + o, n === "near" ? l = "left" : n === "center" ? (l = "center", h += c / 2) : (l = "right", h += c)) : (h = this.right - a, n === "near" ? l = "right" : n === "center" ? (l = "center", h -= c / 2) : (l = "left", h = this.left)) : e === "right" ? s ? (h = this.left + o, n === "near" ? l = "right" : n === "center" ? (l = "center", h -= c / 2) : (l = "left", h -= c)) : (h = this.left + a, n === "near" ? l = "left" : n === "center" ? (l = "center", h += c / 2) : (l = "right", h = this.right)) : l = "right", {
            textAlign: l,
            x: h
        }
    }
    _computeLabelArea() {
        if (this.options.ticks.mirror) return;
        const t = this.chart,
            e = this.options.position;
        if (e === "left" || e === "right") return {
            top: 0,
            left: this.left,
            bottom: t.height,
            right: this.right
        };
        if (e === "top" || e === "bottom") return {
            top: this.top,
            left: 0,
            bottom: this.bottom,
            right: t.width
        }
    }
    drawBackground() {
        const {
            ctx: t,
            options: {
                backgroundColor: e
            },
            left: n,
            top: s,
            width: o,
            height: r
        } = this;
        e && (t.save(), t.fillStyle = e, t.fillRect(n, s, o, r), t.restore())
    }
    getLineWidthForValue(t) {
        const e = this.options.grid;
        if (!this._isVisible() || !e.display) return 0;
        const s = this.ticks.findIndex(o => o.value === t);
        return s >= 0 ? e.setContext(this.getContext(s)).lineWidth : 0
    }
    drawGrid(t) {
        const e = this.options.grid,
            n = this.ctx,
            s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
        let o, r;
        const a = (c, l, h) => {
            !h.width || !h.color || (n.save(), n.lineWidth = h.width, n.strokeStyle = h.color, n.setLineDash(h.borderDash || []), n.lineDashOffset = h.borderDashOffset, n.beginPath(), n.moveTo(c.x, c.y), n.lineTo(l.x, l.y), n.stroke(), n.restore())
        };
        if (e.display)
            for (o = 0, r = s.length; o < r; ++o) {
                const c = s[o];
                e.drawOnChartArea && a({
                    x: c.x1,
                    y: c.y1
                }, {
                    x: c.x2,
                    y: c.y2
                }, c), e.drawTicks && a({
                    x: c.tx1,
                    y: c.ty1
                }, {
                    x: c.tx2,
                    y: c.ty2
                }, {
                    color: c.tickColor,
                    width: c.tickWidth,
                    borderDash: c.tickBorderDash,
                    borderDashOffset: c.tickBorderDashOffset
                })
            }
    }
    drawBorder() {
        const {
            chart: t,
            ctx: e,
            options: {
                border: n,
                grid: s
            }
        } = this, o = n.setContext(this.getContext()), r = n.display ? o.width : 0;
        if (!r) return;
        const a = s.setContext(this.getContext(0)).lineWidth,
            c = this._borderValue;
        let l, h, d, u;
        this.isHorizontal() ? (l = vt(t, this.left, r) - r / 2, h = vt(t, this.right, a) + a / 2, d = u = c) : (d = vt(t, this.top, r) - r / 2, u = vt(t, this.bottom, a) + a / 2, l = h = c), e.save(), e.lineWidth = o.width, e.strokeStyle = o.color, e.beginPath(), e.moveTo(l, d), e.lineTo(h, u), e.stroke(), e.restore()
    }
    drawLabels(t) {
        if (!this.options.ticks.display) return;
        const n = this.ctx,
            s = this._computeLabelArea();
        s && er(n, s);
        const o = this.getLabelItems(t);
        for (const r of o) {
            const a = r.options,
                c = r.font,
                l = r.label,
                h = r.textOffset;
            _i(n, l, 0, h, c, a)
        }
        s && ir(n)
    }
    drawTitle() {
        const {
            ctx: t,
            options: {
                position: e,
                title: n,
                reverse: s
            }
        } = this;
        if (!n.display) return;
        const o = Xt(n.font),
            r = ct(n.padding),
            a = n.align;
        let c = o.lineHeight / 2;
        e === "bottom" || e === "center" || P(e) ? (c += r.bottom, R(n.text) && (c += o.lineHeight * (n.text.length - 1))) : c += r.top;
        const {
            titleX: l,
            titleY: h,
            maxWidth: d,
            rotation: u
        } = ph(this, c, e, a);
        _i(t, n.text, 0, 0, o, {
            color: n.color,
            maxWidth: d,
            rotation: u,
            textAlign: fh(a, e, s),
            textBaseline: "middle",
            translation: [l, h]
        })
    }
    draw(t) {
        !this._isVisible() || (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t))
    }
    _layers() {
        const t = this.options,
            e = t.ticks && t.ticks.z || 0,
            n = A(t.grid && t.grid.z, -1),
            s = A(t.border && t.border.z, 0);
        return !this._isVisible() || this.draw !== Nt.prototype.draw ? [{
            z: e,
            draw: o => {
                this.draw(o)
            }
        }] : [{
            z: n,
            draw: o => {
                this.drawBackground(), this.drawGrid(o), this.drawTitle()
            }
        }, {
            z: s,
            draw: () => {
                this.drawBorder()
            }
        }, {
            z: e,
            draw: o => {
                this.drawLabels(o)
            }
        }]
    }
    getMatchingVisibleMetas(t) {
        const e = this.chart.getSortedVisibleDatasetMetas(),
            n = this.axis + "AxisID",
            s = [];
        let o, r;
        for (o = 0, r = e.length; o < r; ++o) {
            const a = e[o];
            a[n] === this.id && (!t || a.type === t) && s.push(a)
        }
        return s
    }
    _resolveTickFontOptions(t) {
        const e = this.options.ticks.setContext(this.getContext(t));
        return Xt(e.font)
    }
    _maxDigits() {
        const t = this._resolveTickFontOptions(0).lineHeight;
        return (this.isHorizontal() ? this.width : this.height) / t
    }
}
class Qe {
    constructor(t, e, n) {
        this.type = t, this.scope = e, this.override = n, this.items = Object.create(null)
    }
    isForType(t) {
        return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype)
    }
    register(t) {
        const e = Object.getPrototypeOf(t);
        let n;
        bh(e) && (n = this.register(e));
        const s = this.items,
            o = t.id,
            r = this.scope + "." + o;
        if (!o) throw new Error("class does not have id: " + t);
        return o in s || (s[o] = t, gh(t, r, n), this.override && F.override(t.id, t.overrides)), r
    }
    get(t) {
        return this.items[t]
    }
    unregister(t) {
        const e = this.items,
            n = t.id,
            s = this.scope;
        n in e && delete e[n], s && n in F[s] && (delete F[s][n], this.override && delete Dt[n])
    }
}

function gh(i, t, e) {
    const n = Se(Object.create(null), [e ? F.get(e) : {}, F.get(t), i.defaults]);
    F.set(t, n), i.defaultRoutes && mh(t, i.defaultRoutes), i.descriptors && F.describe(t, i.descriptors)
}

function mh(i, t) {
    Object.keys(t).forEach(e => {
        const n = e.split("."),
            s = n.pop(),
            o = [i].concat(n).join("."),
            r = t[e].split("."),
            a = r.pop(),
            c = r.join(".");
        F.route(o, s, c, a)
    })
}

function bh(i) {
    return "id" in i && "defaults" in i
}
class _h {
    constructor() {
        this.controllers = new Qe($t, "datasets", !0), this.elements = new Qe(Qt, "elements"), this.plugins = new Qe(Object, "plugins"), this.scales = new Qe(Nt, "scales"), this._typedRegistries = [this.controllers, this.scales, this.elements]
    }
    add(...t) {
        this._each("register", t)
    }
    remove(...t) {
        this._each("unregister", t)
    }
    addControllers(...t) {
        this._each("register", t, this.controllers)
    }
    addElements(...t) {
        this._each("register", t, this.elements)
    }
    addPlugins(...t) {
        this._each("register", t, this.plugins)
    }
    addScales(...t) {
        this._each("register", t, this.scales)
    }
    getController(t) {
        return this._get(t, this.controllers, "controller")
    }
    getElement(t) {
        return this._get(t, this.elements, "element")
    }
    getPlugin(t) {
        return this._get(t, this.plugins, "plugin")
    }
    getScale(t) {
        return this._get(t, this.scales, "scale")
    }
    removeControllers(...t) {
        this._each("unregister", t, this.controllers)
    }
    removeElements(...t) {
        this._each("unregister", t, this.elements)
    }
    removePlugins(...t) {
        this._each("unregister", t, this.plugins)
    }
    removeScales(...t) {
        this._each("unregister", t, this.scales)
    }
    _each(t, e, n) {
        [...e].forEach(s => {
            const o = n || this._getRegistryForType(s);
            n || o.isForType(s) || o === this.plugins && s.id ? this._exec(t, o, s) : H(s, r => {
                const a = n || this._getRegistryForType(r);
                this._exec(t, a, r)
            })
        })
    }
    _exec(t, e, n) {
        const s = Pn(t);
        D(n["before" + s], [], n), e[t](n), D(n["after" + s], [], n)
    }
    _getRegistryForType(t) {
        for (let e = 0; e < this._typedRegistries.length; e++) {
            const n = this._typedRegistries[e];
            if (n.isForType(t)) return n
        }
        return this.plugins
    }
    _get(t, e, n) {
        const s = e.get(t);
        if (s === void 0) throw new Error('"' + t + '" is not a registered ' + n + ".");
        return s
    }
}
var et = new _h;
class yh {
    constructor() {
        this._init = []
    }
    notify(t, e, n, s) {
        e === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install"));
        const o = s ? this._descriptors(t).filter(s) : this._descriptors(t),
            r = this._notify(o, t, e, n);
        return e === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall")), r
    }
    _notify(t, e, n, s) {
        s = s || {};
        for (const o of t) {
            const r = o.plugin,
                a = r[n],
                c = [e, s, o.options];
            if (D(a, c, r) === !1 && s.cancelable) return !1
        }
        return !0
    }
    invalidate() {
        E(this._cache) || (this._oldCache = this._cache, this._cache = void 0)
    }
    _descriptors(t) {
        if (this._cache) return this._cache;
        const e = this._cache = this._createDescriptors(t);
        return this._notifyStateChanges(t), e
    }
    _createDescriptors(t, e) {
        const n = t && t.config,
            s = A(n.options && n.options.plugins, {}),
            o = xh(n);
        return s === !1 && !e ? [] : wh(t, o, s, e)
    }
    _notifyStateChanges(t) {
        const e = this._oldCache || [],
            n = this._cache,
            s = (o, r) => o.filter(a => !r.some(c => a.plugin.id === c.plugin.id));
        this._notify(s(e, n), t, "stop"), this._notify(s(n, e), t, "start")
    }
}

function xh(i) {
    const t = {},
        e = [],
        n = Object.keys(et.plugins.items);
    for (let o = 0; o < n.length; o++) e.push(et.getPlugin(n[o]));
    const s = i.plugins || [];
    for (let o = 0; o < s.length; o++) {
        const r = s[o];
        e.indexOf(r) === -1 && (e.push(r), t[r.id] = !0)
    }
    return {
        plugins: e,
        localIds: t
    }
}

function vh(i, t) {
    return !t && i === !1 ? null : i === !0 ? {} : i
}

function wh(i, {
    plugins: t,
    localIds: e
}, n, s) {
    const o = [],
        r = i.getContext();
    for (const a of t) {
        const c = a.id,
            l = vh(n[c], s);
        l !== null && o.push({
            plugin: a,
            options: kh(i.config, {
                plugin: a,
                local: e[c]
            }, l, r)
        })
    }
    return o
}

function kh(i, {
    plugin: t,
    local: e
}, n, s) {
    const o = i.pluginScopeKeys(t),
        r = i.getOptionScopes(n, o);
    return e && t.defaults && r.push(t.defaults), i.createResolver(r, s, [""], {
        scriptable: !1,
        indexable: !1,
        allKeys: !0
    })
}

function rn(i, t) {
    const e = F.datasets[i] || {};
    return ((t.datasets || {})[i] || {}).indexAxis || t.indexAxis || e.indexAxis || "x"
}

function Sh(i, t) {
    let e = i;
    return i === "_index_" ? e = t : i === "_value_" && (e = t === "x" ? "y" : "x"), e
}

function Mh(i, t) {
    return i === t ? "_index_" : "_value_"
}

function Ws(i) {
    if (i === "x" || i === "y" || i === "r") return i
}

function Ch(i) {
    if (i === "top" || i === "bottom") return "x";
    if (i === "left" || i === "right") return "y"
}

function an(i, ...t) {
    if (Ws(i)) return i;
    for (const e of t) {
        const n = e.axis || Ch(e.position) || i.length > 1 && Ws(i[0].toLowerCase());
        if (n) return n
    }
    throw new Error(`Cannot determine type of '${i}' axis. Please provide 'axis' or 'position' option.`)
}

function Us(i, t, e) {
    if (e[t + "AxisID"] === i) return {
        axis: t
    }
}

function Oh(i, t) {
    if (t.data && t.data.datasets) {
        const e = t.data.datasets.filter(n => n.xAxisID === i || n.yAxisID === i);
        if (e.length) return Us(i, "x", e[0]) || Us(i, "y", e[0])
    }
    return {}
}

function Ph(i, t) {
    const e = Dt[i.type] || {
            scales: {}
        },
        n = t.scales || {},
        s = rn(i.type, t),
        o = Object.create(null);
    return Object.keys(n).forEach(r => {
        const a = n[r];
        if (!P(a)) return console.error(`Invalid scale configuration for scale: ${r}`);
        if (a._proxy) return console.warn(`Ignoring resolver passed as options for scale: ${r}`);
        const c = an(r, a, Oh(r, i), F.scales[a.type]),
            l = Mh(c, s),
            h = e.scales || {};
        o[r] = pe(Object.create(null), [{
            axis: c
        }, a, h[c], h[l]])
    }), i.data.datasets.forEach(r => {
        const a = r.type || i.type,
            c = r.indexAxis || rn(a, t),
            h = (Dt[a] || {}).scales || {};
        Object.keys(h).forEach(d => {
            const u = Sh(d, c),
                f = r[u + "AxisID"] || u;
            o[f] = o[f] || Object.create(null), pe(o[f], [{
                axis: u
            }, n[f], h[d]])
        })
    }), Object.keys(o).forEach(r => {
        const a = o[r];
        pe(a, [F.scales[a.type], F.scale])
    }), o
}

function mr(i) {
    const t = i.options || (i.options = {});
    t.plugins = A(t.plugins, {}), t.scales = Ph(i, t)
}

function br(i) {
    return i = i || {}, i.datasets = i.datasets || [], i.labels = i.labels || [], i
}

function $h(i) {
    return i = i || {}, i.data = br(i.data), mr(i), i
}
const Ys = new Map,
    _r = new Set;

function Ze(i, t) {
    let e = Ys.get(i);
    return e || (e = t(), Ys.set(i, e), _r.add(e)), e
}
const ce = (i, t, e) => {
    const n = Yt(t, e);
    n !== void 0 && i.add(n)
};
class Ah {
    constructor(t) {
        this._config = $h(t), this._scopeCache = new Map, this._resolverCache = new Map
    }
    get platform() {
        return this._config.platform
    }
    get type() {
        return this._config.type
    }
    set type(t) {
        this._config.type = t
    }
    get data() {
        return this._config.data
    }
    set data(t) {
        this._config.data = br(t)
    }
    get options() {
        return this._config.options
    }
    set options(t) {
        this._config.options = t
    }
    get plugins() {
        return this._config.plugins
    }
    update() {
        const t = this._config;
        this.clearCache(), mr(t)
    }
    clearCache() {
        this._scopeCache.clear(), this._resolverCache.clear()
    }
    datasetScopeKeys(t) {
        return Ze(t, () => [
            [`datasets.${t}`, ""]
        ])
    }
    datasetAnimationScopeKeys(t, e) {
        return Ze(`${t}.transition.${e}`, () => [
            [`datasets.${t}.transitions.${e}`, `transitions.${e}`],
            [`datasets.${t}`, ""]
        ])
    }
    datasetElementScopeKeys(t, e) {
        return Ze(`${t}-${e}`, () => [
            [`datasets.${t}.elements.${e}`, `datasets.${t}`, `elements.${e}`, ""]
        ])
    }
    pluginScopeKeys(t) {
        const e = t.id,
            n = this.type;
        return Ze(`${n}-plugin-${e}`, () => [
            [`plugins.${e}`, ...t.additionalOptionScopes || []]
        ])
    }
    _cachedScopes(t, e) {
        const n = this._scopeCache;
        let s = n.get(t);
        return (!s || e) && (s = new Map, n.set(t, s)), s
    }
    getOptionScopes(t, e, n) {
        const {
            options: s,
            type: o
        } = this, r = this._cachedScopes(t, n), a = r.get(e);
        if (a) return a;
        const c = new Set;
        e.forEach(h => {
            t && (c.add(t), h.forEach(d => ce(c, t, d))), h.forEach(d => ce(c, s, d)), h.forEach(d => ce(c, Dt[o] || {}, d)), h.forEach(d => ce(c, F, d)), h.forEach(d => ce(c, on, d))
        });
        const l = Array.from(c);
        return l.length === 0 && l.push(Object.create(null)), _r.has(e) && r.set(e, l), l
    }
    chartOptionScopes() {
        const {
            options: t,
            type: e
        } = this;
        return [t, Dt[e] || {}, F.datasets[e] || {}, {
            type: e
        }, F, on]
    }
    resolveNamedOptions(t, e, n, s = [""]) {
        const o = {
                $shared: !0
            },
            {
                resolver: r,
                subPrefixes: a
            } = qs(this._resolverCache, t, s);
        let c = r;
        if (Dh(r, e)) {
            o.$shared = !1, n = pt(n) ? n() : n;
            const l = this.createResolver(t, n, a);
            c = Kt(r, n, l)
        }
        for (const l of e) o[l] = c[l];
        return o
    }
    createResolver(t, e, n = [""], s) {
        const {
            resolver: o
        } = qs(this._resolverCache, t, n);
        return P(e) ? Kt(o, e, void 0, s) : o
    }
}

function qs(i, t, e) {
    let n = i.get(t);
    n || (n = new Map, i.set(t, n));
    const s = e.join();
    let o = n.get(s);
    return o || (o = {
        resolver: Dn(t, e),
        subPrefixes: e.filter(a => !a.toLowerCase().includes("hover"))
    }, n.set(s, o)), o
}
const Eh = i => P(i) && Object.getOwnPropertyNames(i).some(t => pt(i[t]));

function Dh(i, t) {
    const {
        isScriptable: e,
        isIndexable: n
    } = sr(i);
    for (const s of t) {
        const o = e(s),
            r = n(s),
            a = (r || o) && i[s];
        if (o && (pt(a) || Eh(a)) || r && R(a)) return !0
    }
    return !1
}
var Ih = "4.4.1";
const Th = ["top", "bottom", "left", "right", "chartArea"];

function Xs(i, t) {
    return i === "top" || i === "bottom" || Th.indexOf(i) === -1 && t === "x"
}

function Ks(i, t) {
    return function(e, n) {
        return e[i] === n[i] ? e[t] - n[t] : e[i] - n[i]
    }
}

function Gs(i) {
    const t = i.chart,
        e = t.options.animation;
    t.notifyPlugins("afterRender"), D(e && e.onComplete, [i], t)
}

function Lh(i) {
    const t = i.chart,
        e = t.options.animation;
    D(e && e.onProgress, [i], t)
}

function yr(i) {
    return Ln() && typeof i == "string" ? i = document.getElementById(i) : i && i.length && (i = i[0]), i && i.canvas && (i = i.canvas), i
}
const ai = {},
    Qs = i => {
        const t = yr(i);
        return Object.values(ai).filter(e => e.canvas === t).pop()
    };

function Rh(i, t, e) {
    const n = Object.keys(i);
    for (const s of n) {
        const o = +s;
        if (o >= t) {
            const r = i[s];
            delete i[s], (e > 0 || o > t) && (i[o + e] = r)
        }
    }
}

function Fh(i, t, e, n) {
    return !e || i.type === "mouseout" ? null : n ? t : i
}

function Je(i, t, e) {
    return i.options.clip ? i[e] : t[e]
}

function Nh(i, t) {
    const {
        xScale: e,
        yScale: n
    } = i;
    return e && n ? {
        left: Je(e, t, "left"),
        right: Je(e, t, "right"),
        top: Je(n, t, "top"),
        bottom: Je(n, t, "bottom")
    } : t
}
class rt {
    static register(...t) {
        et.add(...t), Zs()
    }
    static unregister(...t) {
        et.remove(...t), Zs()
    }
    constructor(t, e) {
        const n = this.config = new Ah(e),
            s = yr(t),
            o = Qs(s);
        if (o) throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
        const r = n.createResolver(n.chartOptionScopes(), this.getContext());
        this.platform = new(n.platform || eh(s)), this.platform.updateConfig(n);
        const a = this.platform.acquireContext(s, r.aspectRatio),
            c = a && a.canvas,
            l = c && c.height,
            h = c && c.width;
        if (this.id = za(), this.ctx = a, this.canvas = c, this.width = h, this.height = l, this._options = r, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new yh, this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = sc(d => this.update(d), r.resizeDelay || 0), this._dataChanges = [], ai[this.id] = this, !a || !c) {
            console.error("Failed to create chart: can't acquire context from the given item");
            return
        }
        st.listen(this, "complete", Gs), st.listen(this, "progress", Lh), this._initialize(), this.attached && this.update()
    }
    get aspectRatio() {
        const {
            options: {
                aspectRatio: t,
                maintainAspectRatio: e
            },
            width: n,
            height: s,
            _aspectRatio: o
        } = this;
        return E(t) ? e && o ? o : s ? n / s : null : t
    }
    get data() {
        return this.config.data
    }
    set data(t) {
        this.config.data = t
    }
    get options() {
        return this._options
    }
    set options(t) {
        this.config.options = t
    }
    get registry() {
        return et
    }
    _initialize() {
        return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : ws(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this
    }
    clear() {
        return ys(this.canvas, this.ctx), this
    }
    stop() {
        return st.stop(this), this
    }
    resize(t, e) {
        st.running(this) ? this._resizeBeforeDraw = {
            width: t,
            height: e
        } : this._resize(t, e)
    }
    _resize(t, e) {
        const n = this.options,
            s = this.canvas,
            o = n.maintainAspectRatio && this.aspectRatio,
            r = this.platform.getMaximumSize(s, t, e, o),
            a = n.devicePixelRatio || this.platform.getDevicePixelRatio(),
            c = this.width ? "resize" : "attach";
        this.width = r.width, this.height = r.height, this._aspectRatio = this.aspectRatio, ws(this, a, !0) && (this.notifyPlugins("resize", {
            size: r
        }), D(n.onResize, [this, r], this), this.attached && this._doResize(c) && this.render())
    }
    ensureScalesHaveIDs() {
        const e = this.options.scales || {};
        H(e, (n, s) => {
            n.id = s
        })
    }
    buildOrUpdateScales() {
        const t = this.options,
            e = t.scales,
            n = this.scales,
            s = Object.keys(n).reduce((r, a) => (r[a] = !1, r), {});
        let o = [];
        e && (o = o.concat(Object.keys(e).map(r => {
            const a = e[r],
                c = an(r, a),
                l = c === "r",
                h = c === "x";
            return {
                options: a,
                dposition: l ? "chartArea" : h ? "bottom" : "left",
                dtype: l ? "radialLinear" : h ? "category" : "linear"
            }
        }))), H(o, r => {
            const a = r.options,
                c = a.id,
                l = an(c, a),
                h = A(a.type, r.dtype);
            (a.position === void 0 || Xs(a.position, l) !== Xs(r.dposition)) && (a.position = r.dposition), s[c] = !0;
            let d = null;
            if (c in n && n[c].type === h) d = n[c];
            else {
                const u = et.getScale(h);
                d = new u({
                    id: c,
                    type: h,
                    ctx: this.ctx,
                    chart: this
                }), n[d.id] = d
            }
            d.init(a, t)
        }), H(s, (r, a) => {
            r || delete n[a]
        }), H(n, r => {
            Ke.configure(this, r, r.options), Ke.addBox(this, r)
        })
    }
    _updateMetasets() {
        const t = this._metasets,
            e = this.data.datasets.length,
            n = t.length;
        if (t.sort((s, o) => s.index - o.index), n > e) {
            for (let s = e; s < n; ++s) this._destroyDatasetMeta(s);
            t.splice(e, n - e)
        }
        this._sortedMetasets = t.slice(0).sort(Ks("order", "index"))
    }
    _removeUnreferencedMetasets() {
        const {
            _metasets: t,
            data: {
                datasets: e
            }
        } = this;
        t.length > e.length && delete this._stacks, t.forEach((n, s) => {
            e.filter(o => o === n._dataset).length === 0 && this._destroyDatasetMeta(s)
        })
    }
    buildOrUpdateControllers() {
        const t = [],
            e = this.data.datasets;
        let n, s;
        for (this._removeUnreferencedMetasets(), n = 0, s = e.length; n < s; n++) {
            const o = e[n];
            let r = this.getDatasetMeta(n);
            const a = o.type || this.config.type;
            if (r.type && r.type !== a && (this._destroyDatasetMeta(n), r = this.getDatasetMeta(n)), r.type = a, r.indexAxis = o.indexAxis || rn(a, this.options), r.order = o.order || 0, r.index = n, r.label = "" + o.label, r.visible = this.isDatasetVisible(n), r.controller) r.controller.updateIndex(n), r.controller.linkScales();
            else {
                const c = et.getController(a),
                    {
                        datasetElementType: l,
                        dataElementType: h
                    } = F.datasets[a];
                Object.assign(c, {
                    dataElementType: et.getElement(h),
                    datasetElementType: l && et.getElement(l)
                }), r.controller = new c(this, n), t.push(r.controller)
            }
        }
        return this._updateMetasets(), t
    }
    _resetElements() {
        H(this.data.datasets, (t, e) => {
            this.getDatasetMeta(e).controller.reset()
        }, this)
    }
    reset() {
        this._resetElements(), this.notifyPlugins("reset")
    }
    update(t) {
        const e = this.config;
        e.update();
        const n = this._options = e.createResolver(e.chartOptionScopes(), this.getContext()),
            s = this._animationsDisabled = !n.animation;
        if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
                mode: t,
                cancelable: !0
            }) === !1) return;
        const o = this.buildOrUpdateControllers();
        this.notifyPlugins("beforeElementsUpdate");
        let r = 0;
        for (let l = 0, h = this.data.datasets.length; l < h; l++) {
            const {
                controller: d
            } = this.getDatasetMeta(l), u = !s && o.indexOf(d) === -1;
            d.buildOrUpdateElements(u), r = Math.max(+d.getMaxOverflow(), r)
        }
        r = this._minPadding = n.layout.autoPadding ? r : 0, this._updateLayout(r), s || H(o, l => {
            l.reset()
        }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
            mode: t
        }), this._layers.sort(Ks("z", "_idx"));
        const {
            _active: a,
            _lastEvent: c
        } = this;
        c ? this._eventHandler(c, !0) : a.length && this._updateHoverStyles(a, a, !0), this.render()
    }
    _updateScales() {
        H(this.scales, t => {
            Ke.removeBox(this, t)
        }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales()
    }
    _checkEventBindings() {
        const t = this.options,
            e = new Set(Object.keys(this._listeners)),
            n = new Set(t.events);
        (!cs(e, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents())
    }
    _updateHiddenIndices() {
        const {
            _hiddenIndices: t
        } = this, e = this._getUniformDataChanges() || [];
        for (const {
                method: n,
                start: s,
                count: o
            }
            of e) {
            const r = n === "_removeElements" ? -o : o;
            Rh(t, s, r)
        }
    }
    _getUniformDataChanges() {
        const t = this._dataChanges;
        if (!t || !t.length) return;
        this._dataChanges = [];
        const e = this.data.datasets.length,
            n = o => new Set(t.filter(r => r[0] === o).map((r, a) => a + "," + r.splice(1).join(","))),
            s = n(0);
        for (let o = 1; o < e; o++)
            if (!cs(s, n(o))) return;
        return Array.from(s).map(o => o.split(",")).map(o => ({
            method: o[1],
            start: +o[2],
            count: +o[3]
        }))
    }
    _updateLayout(t) {
        if (this.notifyPlugins("beforeLayout", {
                cancelable: !0
            }) === !1) return;
        Ke.update(this, this.width, this.height, t);
        const e = this.chartArea,
            n = e.width <= 0 || e.height <= 0;
        this._layers = [], H(this.boxes, s => {
            n && s.position === "chartArea" || (s.configure && s.configure(), this._layers.push(...s._layers()))
        }, this), this._layers.forEach((s, o) => {
            s._idx = o
        }), this.notifyPlugins("afterLayout")
    }
    _updateDatasets(t) {
        if (this.notifyPlugins("beforeDatasetsUpdate", {
                mode: t,
                cancelable: !0
            }) !== !1) {
            for (let e = 0, n = this.data.datasets.length; e < n; ++e) this.getDatasetMeta(e).controller.configure();
            for (let e = 0, n = this.data.datasets.length; e < n; ++e) this._updateDataset(e, pt(t) ? t({
                datasetIndex: e
            }) : t);
            this.notifyPlugins("afterDatasetsUpdate", {
                mode: t
            })
        }
    }
    _updateDataset(t, e) {
        const n = this.getDatasetMeta(t),
            s = {
                meta: n,
                index: t,
                mode: e,
                cancelable: !0
            };
        this.notifyPlugins("beforeDatasetUpdate", s) !== !1 && (n.controller._update(e), s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s))
    }
    render() {
        this.notifyPlugins("beforeRender", {
            cancelable: !0
        }) !== !1 && (st.has(this) ? this.attached && !st.running(this) && st.start(this) : (this.draw(), Gs({
            chart: this
        })))
    }
    draw() {
        let t;
        if (this._resizeBeforeDraw) {
            const {
                width: n,
                height: s
            } = this._resizeBeforeDraw;
            this._resize(n, s), this._resizeBeforeDraw = null
        }
        if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
                cancelable: !0
            }) === !1) return;
        const e = this._layers;
        for (t = 0; t < e.length && e[t].z <= 0; ++t) e[t].draw(this.chartArea);
        for (this._drawDatasets(); t < e.length; ++t) e[t].draw(this.chartArea);
        this.notifyPlugins("afterDraw")
    }
    _getSortedDatasetMetas(t) {
        const e = this._sortedMetasets,
            n = [];
        let s, o;
        for (s = 0, o = e.length; s < o; ++s) {
            const r = e[s];
            (!t || r.visible) && n.push(r)
        }
        return n
    }
    getSortedVisibleDatasetMetas() {
        return this._getSortedDatasetMetas(!0)
    }
    _drawDatasets() {
        if (this.notifyPlugins("beforeDatasetsDraw", {
                cancelable: !0
            }) === !1) return;
        const t = this.getSortedVisibleDatasetMetas();
        for (let e = t.length - 1; e >= 0; --e) this._drawDataset(t[e]);
        this.notifyPlugins("afterDatasetsDraw")
    }
    _drawDataset(t) {
        const e = this.ctx,
            n = t._clip,
            s = !n.disabled,
            o = Nh(t, this.chartArea),
            r = {
                meta: t,
                index: t.index,
                cancelable: !0
            };
        this.notifyPlugins("beforeDatasetDraw", r) !== !1 && (s && er(e, {
            left: n.left === !1 ? 0 : o.left - n.left,
            right: n.right === !1 ? this.width : o.right + n.right,
            top: n.top === !1 ? 0 : o.top - n.top,
            bottom: n.bottom === !1 ? this.height : o.bottom + n.bottom
        }), t.controller.draw(), s && ir(e), r.cancelable = !1, this.notifyPlugins("afterDatasetDraw", r))
    }
    isPointInArea(t) {
        return at(t, this.chartArea, this._minPadding)
    }
    getElementsAtEventForMode(t, e, n, s) {
        const o = Tl.modes[e];
        return typeof o == "function" ? o(this, t, n, s) : []
    }
    getDatasetMeta(t) {
        const e = this.data.datasets[t],
            n = this._metasets;
        let s = n.filter(o => o && o._dataset === e).pop();
        return s || (s = {
            type: null,
            data: [],
            dataset: null,
            controller: null,
            hidden: null,
            xAxisID: null,
            yAxisID: null,
            order: e && e.order || 0,
            index: t,
            _dataset: e,
            _parsed: [],
            _sorted: !1
        }, n.push(s)), s
    }
    getContext() {
        return this.$context || (this.$context = Ft(null, {
            chart: this,
            type: "chart"
        }))
    }
    getVisibleDatasetCount() {
        return this.getSortedVisibleDatasetMetas().length
    }
    isDatasetVisible(t) {
        const e = this.data.datasets[t];
        if (!e) return !1;
        const n = this.getDatasetMeta(t);
        return typeof n.hidden == "boolean" ? !n.hidden : !e.hidden
    }
    setDatasetVisibility(t, e) {
        const n = this.getDatasetMeta(t);
        n.hidden = !e
    }
    toggleDataVisibility(t) {
        this._hiddenIndices[t] = !this._hiddenIndices[t]
    }
    getDataVisibility(t) {
        return !this._hiddenIndices[t]
    }
    _updateVisibility(t, e, n) {
        const s = n ? "show" : "hide",
            o = this.getDatasetMeta(t),
            r = o.controller._resolveAnimations(void 0, s);
        pi(e) ? (o.data[e].hidden = !n, this.update()) : (this.setDatasetVisibility(t, n), r.update(o, {
            visible: n
        }), this.update(a => a.datasetIndex === t ? s : void 0))
    }
    hide(t, e) {
        this._updateVisibility(t, e, !1)
    }
    show(t, e) {
        this._updateVisibility(t, e, !0)
    }
    _destroyDatasetMeta(t) {
        const e = this._metasets[t];
        e && e.controller && e.controller._destroy(), delete this._metasets[t]
    }
    _stop() {
        let t, e;
        for (this.stop(), st.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t) this._destroyDatasetMeta(t)
    }
    destroy() {
        this.notifyPlugins("beforeDestroy");
        const {
            canvas: t,
            ctx: e
        } = this;
        this._stop(), this.config.clearCache(), t && (this.unbindEvents(), ys(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), delete ai[this.id], this.notifyPlugins("afterDestroy")
    }
    toBase64Image(...t) {
        return this.canvas.toDataURL(...t)
    }
    bindEvents() {
        this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0
    }
    bindUserEvents() {
        const t = this._listeners,
            e = this.platform,
            n = (o, r) => {
                e.addEventListener(this, o, r), t[o] = r
            },
            s = (o, r, a) => {
                o.offsetX = r, o.offsetY = a, this._eventHandler(o)
            };
        H(this.options.events, o => n(o, s))
    }
    bindResponsiveEvents() {
        this._responsiveListeners || (this._responsiveListeners = {});
        const t = this._responsiveListeners,
            e = this.platform,
            n = (c, l) => {
                e.addEventListener(this, c, l), t[c] = l
            },
            s = (c, l) => {
                t[c] && (e.removeEventListener(this, c, l), delete t[c])
            },
            o = (c, l) => {
                this.canvas && this.resize(c, l)
            };
        let r;
        const a = () => {
            s("attach", a), this.attached = !0, this.resize(), n("resize", o), n("detach", r)
        };
        r = () => {
            this.attached = !1, s("resize", o), this._stop(), this._resize(0, 0), n("attach", a)
        }, e.isAttached(this.canvas) ? a() : r()
    }
    unbindEvents() {
        H(this._listeners, (t, e) => {
            this.platform.removeEventListener(this, e, t)
        }), this._listeners = {}, H(this._responsiveListeners, (t, e) => {
            this.platform.removeEventListener(this, e, t)
        }), this._responsiveListeners = void 0
    }
    updateHoverStyle(t, e, n) {
        const s = n ? "set" : "remove";
        let o, r, a, c;
        for (e === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + s + "DatasetHoverStyle"]()), a = 0, c = t.length; a < c; ++a) {
            r = t[a];
            const l = r && this.getDatasetMeta(r.datasetIndex).controller;
            l && l[s + "HoverStyle"](r.element, r.datasetIndex, r.index)
        }
    }
    getActiveElements() {
        return this._active || []
    }
    setActiveElements(t) {
        const e = this._active || [],
            n = t.map(({
                datasetIndex: o,
                index: r
            }) => {
                const a = this.getDatasetMeta(o);
                if (!a) throw new Error("No dataset found at index " + o);
                return {
                    datasetIndex: o,
                    element: a.data[r],
                    index: r
                }
            });
        !rs(n, e) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, e))
    }
    notifyPlugins(t, e, n) {
        return this._plugins.notify(this, t, e, n)
    }
    isPluginEnabled(t) {
        return this._plugins._cache.filter(e => e.plugin.id === t).length === 1
    }
    _updateHoverStyles(t, e, n) {
        const s = this.options.hover,
            o = (c, l) => c.filter(h => !l.some(d => h.datasetIndex === d.datasetIndex && h.index === d.index)),
            r = o(e, t),
            a = n ? t : o(t, e);
        r.length && this.updateHoverStyle(r, s.mode, !1), a.length && s.mode && this.updateHoverStyle(a, s.mode, !0)
    }
    _eventHandler(t, e) {
        const n = {
                event: t,
                replay: e,
                cancelable: !0,
                inChartArea: this.isPointInArea(t)
            },
            s = r => (r.options.events || this.options.events).includes(t.native.type);
        if (this.notifyPlugins("beforeEvent", n, s) === !1) return;
        const o = this._handleEvent(t, e, n.inChartArea);
        return n.cancelable = !1, this.notifyPlugins("afterEvent", n, s), (o || n.changed) && this.render(), this
    }
    _handleEvent(t, e, n) {
        const {
            _active: s = [],
            options: o
        } = this, r = e, a = this._getActiveElements(t, s, n, r), c = Ua(t), l = Fh(t, this._lastEvent, n, c);
        n && (this._lastEvent = null, D(o.onHover, [t, a, this], this), c && D(o.onClick, [t, a, this], this));
        const h = !rs(a, s);
        return (h || e) && (this._active = a, this._updateHoverStyles(a, s, e)), this._lastEvent = l, h
    }
    _getActiveElements(t, e, n, s) {
        if (t.type === "mouseout") return [];
        if (!n) return e;
        const o = this.options.hover;
        return this.getElementsAtEventForMode(t, o.mode, o, s)
    }
}
k(rt, "defaults", F), k(rt, "instances", ai), k(rt, "overrides", Dt), k(rt, "registry", et), k(rt, "version", Ih), k(rt, "getChart", Qs);

function Zs() {
    return H(rt.instances, i => i._plugins.invalidate())
}

function xr(i, t, e = t) {
    i.lineCap = A(e.borderCapStyle, t.borderCapStyle), i.setLineDash(A(e.borderDash, t.borderDash)), i.lineDashOffset = A(e.borderDashOffset, t.borderDashOffset), i.lineJoin = A(e.borderJoinStyle, t.borderJoinStyle), i.lineWidth = A(e.borderWidth, t.borderWidth), i.strokeStyle = A(e.borderColor, t.borderColor)
}

function zh(i, t, e) {
    i.lineTo(e.x, e.y)
}

function jh(i) {
    return i.stepped ? xc : i.tension || i.cubicInterpolationMode === "monotone" ? vc : zh
}

function vr(i, t, e = {}) {
    const n = i.length,
        {
            start: s = 0,
            end: o = n - 1
        } = e,
        {
            start: r,
            end: a
        } = t,
        c = Math.max(s, r),
        l = Math.min(o, a),
        h = s < r && o < r || s > a && o > a;
    return {
        count: n,
        start: c,
        loop: t.loop,
        ilen: l < c && !h ? n + l - c : l - c
    }
}

function Bh(i, t, e, n) {
    const {
        points: s,
        options: o
    } = t, {
        count: r,
        start: a,
        loop: c,
        ilen: l
    } = vr(s, e, n), h = jh(o);
    let {
        move: d = !0,
        reverse: u
    } = n || {}, f, p, g;
    for (f = 0; f <= l; ++f) p = s[(a + (u ? l - f : f)) % r], !p.skip && (d ? (i.moveTo(p.x, p.y), d = !1) : h(i, g, p, u, o.stepped), g = p);
    return c && (p = s[(a + (u ? l : 0)) % r], h(i, g, p, u, o.stepped)), !!c
}

function Vh(i, t, e, n) {
    const s = t.points,
        {
            count: o,
            start: r,
            ilen: a
        } = vr(s, e, n),
        {
            move: c = !0,
            reverse: l
        } = n || {};
    let h = 0,
        d = 0,
        u, f, p, g, m, b;
    const _ = M => (r + (l ? a - M : M)) % o,
        v = () => {
            g !== m && (i.lineTo(h, m), i.lineTo(h, g), i.lineTo(h, b))
        };
    for (c && (f = s[_(0)], i.moveTo(f.x, f.y)), u = 0; u <= a; ++u) {
        if (f = s[_(u)], f.skip) continue;
        const M = f.x,
            y = f.y,
            x = M | 0;
        x === p ? (y < g ? g = y : y > m && (m = y), h = (d * h + M) / ++d) : (v(), i.lineTo(M, y), p = x, d = 0, g = m = y), b = y
    }
    v()
}

function cn(i) {
    const t = i.options,
        e = t.borderDash && t.borderDash.length;
    return !i._decimated && !i._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !e ? Vh : Bh
}

function Hh(i) {
    return i.stepped ? nl : i.tension || i.cubicInterpolationMode === "monotone" ? sl : Mt
}

function Wh(i, t, e, n) {
    let s = t._path;
    s || (s = t._path = new Path2D, t.path(s, e, n) && s.closePath()), xr(i, t.options), i.stroke(s)
}

function Uh(i, t, e, n) {
    const {
        segments: s,
        options: o
    } = t, r = cn(t);
    for (const a of s) xr(i, o, a.style), i.beginPath(), r(i, t, a, {
        start: e,
        end: e + n - 1
    }) && i.closePath(), i.stroke()
}
const Yh = typeof Path2D == "function";

function qh(i, t, e, n) {
    Yh && !t.options.segment ? Wh(i, t, e, n) : Uh(i, t, e, n)
}
class fe extends Qt {
    constructor(t) {
        super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t)
    }
    updateControlPoints(t, e) {
        const n = this.options;
        if ((n.tension || n.cubicInterpolationMode === "monotone") && !n.stepped && !this._pointsUpdated) {
            const s = n.spanGaps ? this._loop : this._fullLoop;
            Kc(this._points, n, t, s, e), this._pointsUpdated = !0
        }
    }
    set points(t) {
        this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1
    }
    get points() {
        return this._points
    }
    get segments() {
        return this._segments || (this._segments = hl(this, this.options.segment))
    }
    first() {
        const t = this.segments,
            e = this.points;
        return t.length && e[t[0].start]
    }
    last() {
        const t = this.segments,
            e = this.points,
            n = t.length;
        return n && e[t[n - 1].end]
    }
    interpolate(t, e) {
        const n = this.options,
            s = t[e],
            o = this.points,
            r = al(this, {
                property: e,
                start: s,
                end: s
            });
        if (!r.length) return;
        const a = [],
            c = Hh(n);
        let l, h;
        for (l = 0, h = r.length; l < h; ++l) {
            const {
                start: d,
                end: u
            } = r[l], f = o[d], p = o[u];
            if (f === p) {
                a.push(f);
                continue
            }
            const g = Math.abs((s - f[e]) / (p[e] - f[e])),
                m = c(f, p, g, n.stepped);
            m[e] = t[e], a.push(m)
        }
        return a.length === 1 ? a[0] : a
    }
    pathSegment(t, e, n) {
        return cn(this)(t, this, e, n)
    }
    path(t, e, n) {
        const s = this.segments,
            o = cn(this);
        let r = this._loop;
        e = e || 0, n = n || this.points.length - e;
        for (const a of s) r &= o(t, this, a, {
            start: e,
            end: e + n - 1
        });
        return !!r
    }
    draw(t, e, n, s) {
        const o = this.options || {};
        (this.points || []).length && o.borderWidth && (t.save(), qh(t, this, n, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0)
    }
}
k(fe, "id", "line"), k(fe, "defaults", {
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: "miter",
    borderWidth: 3,
    capBezierPoints: !0,
    cubicInterpolationMode: "default",
    fill: !1,
    spanGaps: !1,
    stepped: !1,
    tension: 0
}), k(fe, "defaultRoutes", {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
}), k(fe, "descriptors", {
    _scriptable: !0,
    _indexable: t => t !== "borderDash" && t !== "fill"
});

function Js(i, t, e, n) {
    const s = i.options,
        {
            [e]: o
        } = i.getProps([e], n);
    return Math.abs(t - o) < s.radius + s.hitRadius
}
class ci extends Qt {
    constructor(e) {
        super();
        k(this, "parsed");
        k(this, "skip");
        k(this, "stop");
        this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, e && Object.assign(this, e)
    }
    inRange(e, n, s) {
        const o = this.options,
            {
                x: r,
                y: a
            } = this.getProps(["x", "y"], s);
        return Math.pow(e - r, 2) + Math.pow(n - a, 2) < Math.pow(o.hitRadius + o.radius, 2)
    }
    inXRange(e, n) {
        return Js(this, e, "x", n)
    }
    inYRange(e, n) {
        return Js(this, e, "y", n)
    }
    getCenterPoint(e) {
        const {
            x: n,
            y: s
        } = this.getProps(["x", "y"], e);
        return {
            x: n,
            y: s
        }
    }
    size(e) {
        e = e || this.options || {};
        let n = e.radius || 0;
        n = Math.max(n, n && e.hoverRadius || 0);
        const s = n && e.borderWidth || 0;
        return (n + s) * 2
    }
    draw(e, n) {
        const s = this.options;
        this.skip || s.radius < .1 || !at(this, n, this.size(s) / 2) || (e.strokeStyle = s.borderColor, e.lineWidth = s.borderWidth, e.fillStyle = s.backgroundColor, _c(e, s, this.x, this.y))
    }
    getRange() {
        const e = this.options || {};
        return e.radius + e.hitRadius
    }
}
k(ci, "id", "point"), k(ci, "defaults", {
    borderWidth: 1,
    hitRadius: 1,
    hoverBorderWidth: 1,
    hoverRadius: 4,
    pointStyle: "circle",
    radius: 3,
    rotation: 0
}), k(ci, "defaultRoutes", {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
});
const ln = ["rgb(54, 162, 235)", "rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
    to = ln.map(i => i.replace("rgb(", "rgba(").replace(")", ", 0.5)"));

function wr(i) {
    return ln[i % ln.length]
}

function kr(i) {
    return to[i % to.length]
}

function Xh(i, t) {
    return i.borderColor = wr(t), i.backgroundColor = kr(t), ++t
}

function Kh(i, t) {
    return i.backgroundColor = i.data.map(() => wr(t++)), t
}

function Gh(i, t) {
    return i.backgroundColor = i.data.map(() => kr(t++)), t
}

function Qh(i) {
    let t = 0;
    return (e, n) => {
        const s = i.getDatasetMeta(n).controller;
        s instanceof de ? t = Kh(e, t) : s instanceof oi ? t = Gh(e, t) : s && (t = Xh(e, t))
    }
}

function eo(i) {
    let t;
    for (t in i)
        if (i[t].borderColor || i[t].backgroundColor) return !0;
    return !1
}

function Zh(i) {
    return i && (i.borderColor || i.backgroundColor)
}
var Jh = {
    id: "colors",
    defaults: {
        enabled: !0,
        forceOverride: !1
    },
    beforeLayout(i, t, e) {
        if (!e.enabled) return;
        const {
            data: {
                datasets: n
            },
            options: s
        } = i.config, {
            elements: o
        } = s;
        if (!e.forceOverride && (eo(n) || Zh(s) || o && eo(o))) return;
        const r = Qh(i);
        n.forEach(r)
    }
};
const td = (i, t, e, n) => (typeof t == "string" ? (e = i.push(t) - 1, n.unshift({
    index: e,
    label: t
})) : isNaN(t) && (e = null), e);

function ed(i, t, e, n) {
    const s = i.indexOf(t);
    if (s === -1) return td(i, t, e, n);
    const o = i.lastIndexOf(t);
    return s !== o ? e : s
}
const id = (i, t) => i === null ? null : it(Math.round(i), 0, t);

function io(i) {
    const t = this.getLabels();
    return i >= 0 && i < t.length ? t[i] : i
}
class hn extends Nt {
    constructor(t) {
        super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = []
    }
    init(t) {
        const e = this._addedLabels;
        if (e.length) {
            const n = this.getLabels();
            for (const {
                    index: s,
                    label: o
                }
                of e) n[s] === o && n.splice(s, 1);
            this._addedLabels = []
        }
        super.init(t)
    }
    parse(t, e) {
        if (E(t)) return null;
        const n = this.getLabels();
        return e = isFinite(e) && n[e] === t ? e : ed(n, t, A(e, t), this._addedLabels), id(e, n.length - 1)
    }
    determineDataLimits() {
        const {
            minDefined: t,
            maxDefined: e
        } = this.getUserBounds();
        let {
            min: n,
            max: s
        } = this.getMinMax(!0);
        this.options.bounds === "ticks" && (t || (n = 0), e || (s = this.getLabels().length - 1)), this.min = n, this.max = s
    }
    buildTicks() {
        const t = this.min,
            e = this.max,
            n = this.options.offset,
            s = [];
        let o = this.getLabels();
        o = t === 0 && e === o.length - 1 ? o : o.slice(t, e + 1), this._valueRange = Math.max(o.length - (n ? 0 : 1), 1), this._startValue = this.min - (n ? .5 : 0);
        for (let r = t; r <= e; r++) s.push({
            value: r
        });
        return s
    }
    getLabelForValue(t) {
        return io.call(this, t)
    }
    configure() {
        super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels)
    }
    getPixelForValue(t) {
        return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange)
    }
    getPixelForTick(t) {
        const e = this.ticks;
        return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value)
    }
    getValueForPixel(t) {
        return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange)
    }
    getBasePixel() {
        return this.bottom
    }
}
k(hn, "id", "category"), k(hn, "defaults", {
    ticks: {
        callback: io
    }
});

function nd(i, t) {
    const e = [],
        {
            bounds: s,
            step: o,
            min: r,
            max: a,
            precision: c,
            count: l,
            maxTicks: h,
            maxDigits: d,
            includeBounds: u
        } = i,
        f = o || 1,
        p = h - 1,
        {
            min: g,
            max: m
        } = t,
        b = !E(r),
        _ = !E(a),
        v = !E(l),
        M = (m - g) / (d + 1);
    let y = hs((m - g) / p / f) * f,
        x, w, S, O;
    if (y < 1e-14 && !b && !_) return [{
        value: g
    }, {
        value: m
    }];
    O = Math.ceil(m / y) - Math.floor(g / y), O > p && (y = hs(O * y / p / f) * f), E(c) || (x = Math.pow(10, c), y = Math.ceil(y * x) / x), s === "ticks" ? (w = Math.floor(g / y) * y, S = Math.ceil(m / y) * y) : (w = g, S = m), b && _ && o && Ka((a - r) / o, y / 1e3) ? (O = Math.round(Math.min((a - r) / y, h)), y = (a - r) / O, w = r, S = a) : v ? (w = b ? r : w, S = _ ? a : S, O = l - 1, y = (S - w) / O) : (O = (S - w) / y, ge(O, Math.round(O), y / 1e3) ? O = Math.round(O) : O = Math.ceil(O));
    const $ = Math.max(ds(y), ds(w));
    x = Math.pow(10, E(c) ? $ : c), w = Math.round(w * x) / x, S = Math.round(S * x) / x;
    let I = 0;
    for (b && (u && w !== r ? (e.push({
            value: r
        }), w < r && I++, ge(Math.round((w + I * y) * x) / x, r, no(r, M, i)) && I++) : w < r && I++); I < O; ++I) {
        const z = Math.round((w + I * y) * x) / x;
        if (_ && z > a) break;
        e.push({
            value: z
        })
    }
    return _ && u && S !== a ? e.length && ge(e[e.length - 1].value, a, no(a, M, i)) ? e[e.length - 1].value = a : e.push({
        value: a
    }) : (!_ || S === a) && e.push({
        value: S
    }), e
}

function no(i, t, {
    horizontal: e,
    minRotation: n
}) {
    const s = Z(n),
        o = (e ? Math.sin(s) : Math.cos(s)) || .001,
        r = .75 * t * ("" + i).length;
    return Math.min(t / o, r)
}
class vi extends Nt {
    constructor(t) {
        super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0
    }
    parse(t, e) {
        return E(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t
    }
    handleTickRangeOptions() {
        const {
            beginAtZero: t
        } = this.options, {
            minDefined: e,
            maxDefined: n
        } = this.getUserBounds();
        let {
            min: s,
            max: o
        } = this;
        const r = c => s = e ? s : c,
            a = c => o = n ? o : c;
        if (t) {
            const c = qt(s),
                l = qt(o);
            c < 0 && l < 0 ? a(0) : c > 0 && l > 0 && r(0)
        }
        if (s === o) {
            let c = o === 0 ? 1 : Math.abs(o * .05);
            a(o + c), t || r(s - c)
        }
        this.min = s, this.max = o
    }
    getTickLimit() {
        const t = this.options.ticks;
        let {
            maxTicksLimit: e,
            stepSize: n
        } = t, s;
        return n ? (s = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1, s > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${s} ticks. Limiting to 1000.`), s = 1e3)) : (s = this.computeTickLimit(), e = e || 11), e && (s = Math.min(e, s)), s
    }
    computeTickLimit() {
        return Number.POSITIVE_INFINITY
    }
    buildTicks() {
        const t = this.options,
            e = t.ticks;
        let n = this.getTickLimit();
        n = Math.max(2, n);
        const s = {
                maxTicks: n,
                bounds: t.bounds,
                min: t.min,
                max: t.max,
                precision: e.precision,
                step: e.stepSize,
                count: e.count,
                maxDigits: this._maxDigits(),
                horizontal: this.isHorizontal(),
                minRotation: e.minRotation || 0,
                includeBounds: e.includeBounds !== !1
            },
            o = this._range || this,
            r = nd(s, o);
        return t.bounds === "ticks" && Go(r, this, "value"), t.reverse ? (r.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), r
    }
    configure() {
        const t = this.ticks;
        let e = this.min,
            n = this.max;
        if (super.configure(), this.options.offset && t.length) {
            const s = (n - e) / Math.max(t.length - 1, 1) / 2;
            e -= s, n += s
        }
        this._startValue = e, this._endValue = n, this._valueRange = n - e
    }
    getLabelForValue(t) {
        return Te(t, this.chart.options.locale, this.options.ticks.format)
    }
}
class dn extends vi {
    determineDataLimits() {
        const {
            min: t,
            max: e
        } = this.getMinMax(!0);
        this.min = j(t) ? t : 0, this.max = j(e) ? e : 1, this.handleTickRangeOptions()
    }
    computeTickLimit() {
        const t = this.isHorizontal(),
            e = t ? this.width : this.height,
            n = Z(this.options.ticks.minRotation),
            s = (t ? Math.sin(n) : Math.cos(n)) || .001,
            o = this._resolveTickFontOptions(0);
        return Math.ceil(e / Math.min(40, o.lineHeight / s))
    }
    getPixelForValue(t) {
        return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange)
    }
    getValueForPixel(t) {
        return this._startValue + this.getDecimalForPixel(t) * this._valueRange
    }
}
k(dn, "id", "linear"), k(dn, "defaults", {
    ticks: {
        callback: Pi.formatters.numeric
    }
});
const Oe = i => Math.floor(ut(i)),
    kt = (i, t) => Math.pow(10, Oe(i) + t);

function so(i) {
    return i / Math.pow(10, Oe(i)) === 1
}

function oo(i, t, e) {
    const n = Math.pow(10, e),
        s = Math.floor(i / n);
    return Math.ceil(t / n) - s
}

function sd(i, t) {
    const e = t - i;
    let n = Oe(e);
    for (; oo(i, t, n) > 10;) n++;
    for (; oo(i, t, n) < 10;) n--;
    return Math.min(n, Oe(i))
}

function od(i, {
    min: t,
    max: e
}) {
    t = q(i.min, t);
    const n = [],
        s = Oe(t);
    let o = sd(t, e),
        r = o < 0 ? Math.pow(10, Math.abs(o)) : 1;
    const a = Math.pow(10, o),
        c = s > o ? Math.pow(10, s) : 0,
        l = Math.round((t - c) * r) / r,
        h = Math.floor((t - c) / a / 10) * a * 10;
    let d = Math.floor((l - h) / Math.pow(10, o)),
        u = q(i.min, Math.round((c + h + d * Math.pow(10, o)) * r) / r);
    for (; u < e;) n.push({
        value: u,
        major: so(u),
        significand: d
    }), d >= 10 ? d = d < 15 ? 15 : 20 : d++, d >= 20 && (o++, d = 2, r = o >= 0 ? 1 : r), u = Math.round((c + h + d * Math.pow(10, o)) * r) / r;
    const f = q(i.max, u);
    return n.push({
        value: f,
        major: so(f),
        significand: d
    }), n
}
class ro extends Nt {
    constructor(t) {
        super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0
    }
    parse(t, e) {
        const n = vi.prototype.parse.apply(this, [t, e]);
        if (n === 0) {
            this._zero = !0;
            return
        }
        return j(n) && n > 0 ? n : null
    }
    determineDataLimits() {
        const {
            min: t,
            max: e
        } = this.getMinMax(!0);
        this.min = j(t) ? Math.max(0, t) : null, this.max = j(e) ? Math.max(0, e) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !j(this._userMin) && (this.min = t === kt(this.min, 0) ? kt(this.min, -1) : kt(this.min, 0)), this.handleTickRangeOptions()
    }
    handleTickRangeOptions() {
        const {
            minDefined: t,
            maxDefined: e
        } = this.getUserBounds();
        let n = this.min,
            s = this.max;
        const o = a => n = t ? n : a,
            r = a => s = e ? s : a;
        n === s && (n <= 0 ? (o(1), r(10)) : (o(kt(n, -1)), r(kt(s, 1)))), n <= 0 && o(kt(s, -1)), s <= 0 && r(kt(n, 1)), this.min = n, this.max = s
    }
    buildTicks() {
        const t = this.options,
            e = {
                min: this._userMin,
                max: this._userMax
            },
            n = od(e, this);
        return t.bounds === "ticks" && Go(n, this, "value"), t.reverse ? (n.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), n
    }
    getLabelForValue(t) {
        return t === void 0 ? "0" : Te(t, this.chart.options.locale, this.options.ticks.format)
    }
    configure() {
        const t = this.min;
        super.configure(), this._startValue = ut(t), this._valueRange = ut(this.max) - ut(t)
    }
    getPixelForValue(t) {
        return (t === void 0 || t === 0) && (t = this.min), t === null || isNaN(t) ? NaN : this.getPixelForDecimal(t === this.min ? 0 : (ut(t) - this._startValue) / this._valueRange)
    }
    getValueForPixel(t) {
        const e = this.getDecimalForPixel(t);
        return Math.pow(10, this._startValue + e * this._valueRange)
    }
}
k(ro, "id", "logarithmic"), k(ro, "defaults", {
    ticks: {
        callback: Pi.formatters.logarithmic,
        major: {
            enabled: !0
        }
    }
});

function un(i) {
    const t = i.ticks;
    if (t.display && i.display) {
        const e = ct(t.backdropPadding);
        return A(t.font && t.font.size, F.font.size) + e.height
    }
    return 0
}

function rd(i, t, e) {
    return e = R(e) ? e : [e], {
        w: bc(i, t.string, e),
        h: e.length * t.lineHeight
    }
}

function ao(i, t, e, n, s) {
    return i === n || i === s ? {
        start: t - e / 2,
        end: t + e / 2
    } : i < n || i > s ? {
        start: t - e,
        end: t
    } : {
        start: t,
        end: t + e
    }
}

function ad(i) {
    const t = {
            l: i.left + i._padding.left,
            r: i.right - i._padding.right,
            t: i.top + i._padding.top,
            b: i.bottom - i._padding.bottom
        },
        e = Object.assign({}, t),
        n = [],
        s = [],
        o = i._pointLabels.length,
        r = i.options.pointLabels,
        a = r.centerPointLabels ? N / o : 0;
    for (let c = 0; c < o; c++) {
        const l = r.setContext(i.getPointLabelContext(c));
        s[c] = l.padding;
        const h = i.getPointPosition(c, i.drawingArea + s[c], a),
            d = Xt(l.font),
            u = rd(i.ctx, d, i._pointLabels[c]);
        n[c] = u;
        const f = Q(i.getIndexAngle(c) + a),
            p = Math.round($n(f)),
            g = ao(p, h.x, u.w, 0, 180),
            m = ao(p, h.y, u.h, 90, 270);
        cd(e, t, f, g, m)
    }
    i.setCenterPoint(t.l - e.l, e.r - t.r, t.t - e.t, e.b - t.b), i._pointLabelItems = dd(i, n, s)
}

function cd(i, t, e, n, s) {
    const o = Math.abs(Math.sin(e)),
        r = Math.abs(Math.cos(e));
    let a = 0,
        c = 0;
    n.start < t.l ? (a = (t.l - n.start) / o, i.l = Math.min(i.l, t.l - a)) : n.end > t.r && (a = (n.end - t.r) / o, i.r = Math.max(i.r, t.r + a)), s.start < t.t ? (c = (t.t - s.start) / r, i.t = Math.min(i.t, t.t - c)) : s.end > t.b && (c = (s.end - t.b) / r, i.b = Math.max(i.b, t.b + c))
}

function ld(i, t, e) {
    const n = i.drawingArea,
        {
            extra: s,
            additionalAngle: o,
            padding: r,
            size: a
        } = e,
        c = i.getPointPosition(t, n + s + r, o),
        l = Math.round($n(Q(c.angle + W))),
        h = pd(c.y, a.h, l),
        d = ud(l),
        u = fd(c.x, a.w, d);
    return {
        visible: !0,
        x: c.x,
        y: h,
        textAlign: d,
        left: u,
        top: h,
        right: u + a.w,
        bottom: h + a.h
    }
}

function hd(i, t) {
    if (!t) return !0;
    const {
        left: e,
        top: n,
        right: s,
        bottom: o
    } = i;
    return !(at({
        x: e,
        y: n
    }, t) || at({
        x: e,
        y: o
    }, t) || at({
        x: s,
        y: n
    }, t) || at({
        x: s,
        y: o
    }, t))
}

function dd(i, t, e) {
    const n = [],
        s = i._pointLabels.length,
        o = i.options,
        {
            centerPointLabels: r,
            display: a
        } = o.pointLabels,
        c = {
            extra: un(o) / 2,
            additionalAngle: r ? N / s : 0
        };
    let l;
    for (let h = 0; h < s; h++) {
        c.padding = e[h], c.size = t[h];
        const d = ld(i, h, c);
        n.push(d), a === "auto" && (d.visible = hd(d, l), d.visible && (l = d))
    }
    return n
}

function ud(i) {
    return i === 0 || i === 180 ? "center" : i < 180 ? "left" : "right"
}

function fd(i, t, e) {
    return e === "right" ? i -= t : e === "center" && (i -= t / 2), i
}

function pd(i, t, e) {
    return e === 90 || e === 270 ? i -= t / 2 : (e > 270 || e < 90) && (i -= t), i
}

function gd(i, t, e) {
    const {
        left: n,
        top: s,
        right: o,
        bottom: r
    } = e, {
        backdropColor: a
    } = t;
    if (!E(a)) {
        const c = Ec(t.borderRadius),
            l = ct(t.backdropPadding);
        i.fillStyle = a;
        const h = n - l.left,
            d = s - l.top,
            u = o - n + l.width,
            f = r - s + l.height;
        Object.values(c).some(p => p !== 0) ? (i.beginPath(), Mc(i, {
            x: h,
            y: d,
            w: u,
            h: f,
            radius: c
        }), i.fill()) : i.fillRect(h, d, u, f)
    }
}

function md(i, t) {
    const {
        ctx: e,
        options: {
            pointLabels: n
        }
    } = i;
    for (let s = t - 1; s >= 0; s--) {
        const o = i._pointLabelItems[s];
        if (!o.visible) continue;
        const r = n.setContext(i.getPointLabelContext(s));
        gd(e, r, o);
        const a = Xt(r.font),
            {
                x: c,
                y: l,
                textAlign: h
            } = o;
        _i(e, i._pointLabels[s], c, l + a.lineHeight / 2, a, {
            color: r.color,
            textAlign: h,
            textBaseline: "middle"
        })
    }
}

function Sr(i, t, e, n) {
    const {
        ctx: s
    } = i;
    if (e) s.arc(i.xCenter, i.yCenter, t, 0, V);
    else {
        let o = i.getPointPosition(0, t);
        s.moveTo(o.x, o.y);
        for (let r = 1; r < n; r++) o = i.getPointPosition(r, t), s.lineTo(o.x, o.y)
    }
}

function bd(i, t, e, n, s) {
    const o = i.ctx,
        r = t.circular,
        {
            color: a,
            lineWidth: c
        } = t;
    !r && !n || !a || !c || e < 0 || (o.save(), o.strokeStyle = a, o.lineWidth = c, o.setLineDash(s.dash), o.lineDashOffset = s.dashOffset, o.beginPath(), Sr(i, e, r, n), o.closePath(), o.stroke(), o.restore())
}

function _d(i, t, e) {
    return Ft(i, {
        label: e,
        index: t,
        type: "pointLabel"
    })
}
class ti extends vi {
    constructor(t) {
        super(t), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = []
    }
    setDimensions() {
        const t = this._padding = ct(un(this.options) / 2),
            e = this.width = this.maxWidth - t.width,
            n = this.height = this.maxHeight - t.height;
        this.xCenter = Math.floor(this.left + e / 2 + t.left), this.yCenter = Math.floor(this.top + n / 2 + t.top), this.drawingArea = Math.floor(Math.min(e, n) / 2)
    }
    determineDataLimits() {
        const {
            min: t,
            max: e
        } = this.getMinMax(!1);
        this.min = j(t) && !isNaN(t) ? t : 0, this.max = j(e) && !isNaN(e) ? e : 0, this.handleTickRangeOptions()
    }
    computeTickLimit() {
        return Math.ceil(this.drawingArea / un(this.options))
    }
    generateTickLabels(t) {
        vi.prototype.generateTickLabels.call(this, t), this._pointLabels = this.getLabels().map((e, n) => {
            const s = D(this.options.pointLabels.callback, [e, n], this);
            return s || s === 0 ? s : ""
        }).filter((e, n) => this.chart.getDataVisibility(n))
    }
    fit() {
        const t = this.options;
        t.display && t.pointLabels.display ? ad(this) : this.setCenterPoint(0, 0, 0, 0)
    }
    setCenterPoint(t, e, n, s) {
        this.xCenter += Math.floor((t - e) / 2), this.yCenter += Math.floor((n - s) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t, e, n, s))
    }
    getIndexAngle(t) {
        const e = V / (this._pointLabels.length || 1),
            n = this.options.startAngle || 0;
        return Q(t * e + Z(n))
    }
    getDistanceFromCenterForValue(t) {
        if (E(t)) return NaN;
        const e = this.drawingArea / (this.max - this.min);
        return this.options.reverse ? (this.max - t) * e : (t - this.min) * e
    }
    getValueForDistanceFromCenter(t) {
        if (E(t)) return NaN;
        const e = t / (this.drawingArea / (this.max - this.min));
        return this.options.reverse ? this.max - e : this.min + e
    }
    getPointLabelContext(t) {
        const e = this._pointLabels || [];
        if (t >= 0 && t < e.length) {
            const n = e[t];
            return _d(this.getContext(), t, n)
        }
    }
    getPointPosition(t, e, n = 0) {
        const s = this.getIndexAngle(t) - W + n;
        return {
            x: Math.cos(s) * e + this.xCenter,
            y: Math.sin(s) * e + this.yCenter,
            angle: s
        }
    }
    getPointPositionForValue(t, e) {
        return this.getPointPosition(t, this.getDistanceFromCenterForValue(e))
    }
    getBasePosition(t) {
        return this.getPointPositionForValue(t || 0, this.getBaseValue())
    }
    getPointLabelPosition(t) {
        const {
            left: e,
            top: n,
            right: s,
            bottom: o
        } = this._pointLabelItems[t];
        return {
            left: e,
            top: n,
            right: s,
            bottom: o
        }
    }
    drawBackground() {
        const {
            backgroundColor: t,
            grid: {
                circular: e
            }
        } = this.options;
        if (t) {
            const n = this.ctx;
            n.save(), n.beginPath(), Sr(this, this.getDistanceFromCenterForValue(this._endValue), e, this._pointLabels.length), n.closePath(), n.fillStyle = t, n.fill(), n.restore()
        }
    }
    drawGrid() {
        const t = this.ctx,
            e = this.options,
            {
                angleLines: n,
                grid: s,
                border: o
            } = e,
            r = this._pointLabels.length;
        let a, c, l;
        if (e.pointLabels.display && md(this, r), s.display && this.ticks.forEach((h, d) => {
                if (d !== 0) {
                    c = this.getDistanceFromCenterForValue(h.value);
                    const u = this.getContext(d),
                        f = s.setContext(u),
                        p = o.setContext(u);
                    bd(this, f, c, r, p)
                }
            }), n.display) {
            for (t.save(), a = r - 1; a >= 0; a--) {
                const h = n.setContext(this.getPointLabelContext(a)),
                    {
                        color: d,
                        lineWidth: u
                    } = h;
                !u || !d || (t.lineWidth = u, t.strokeStyle = d, t.setLineDash(h.borderDash), t.lineDashOffset = h.borderDashOffset, c = this.getDistanceFromCenterForValue(e.ticks.reverse ? this.min : this.max), l = this.getPointPosition(a, c), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(l.x, l.y), t.stroke())
            }
            t.restore()
        }
    }
    drawBorder() {}
    drawLabels() {
        const t = this.ctx,
            e = this.options,
            n = e.ticks;
        if (!n.display) return;
        const s = this.getIndexAngle(0);
        let o, r;
        t.save(), t.translate(this.xCenter, this.yCenter), t.rotate(s), t.textAlign = "center", t.textBaseline = "middle", this.ticks.forEach((a, c) => {
            if (c === 0 && !e.reverse) return;
            const l = n.setContext(this.getContext(c)),
                h = Xt(l.font);
            if (o = this.getDistanceFromCenterForValue(this.ticks[c].value), l.showLabelBackdrop) {
                t.font = h.string, r = t.measureText(a.label).width, t.fillStyle = l.backdropColor;
                const d = ct(l.backdropPadding);
                t.fillRect(-r / 2 - d.left, -o - h.size / 2 - d.top, r + d.width, h.size + d.height)
            }
            _i(t, a.label, 0, -o, h, {
                color: l.color,
                strokeColor: l.textStrokeColor,
                strokeWidth: l.textStrokeWidth
            })
        }), t.restore()
    }
    drawTitle() {}
}
k(ti, "id", "radialLinear"), k(ti, "defaults", {
    display: !0,
    animate: !0,
    position: "chartArea",
    angleLines: {
        display: !0,
        lineWidth: 1,
        borderDash: [],
        borderDashOffset: 0
    },
    grid: {
        circular: !1
    },
    startAngle: 0,
    ticks: {
        showLabelBackdrop: !0,
        callback: Pi.formatters.numeric
    },
    pointLabels: {
        backdropColor: void 0,
        backdropPadding: 2,
        display: !0,
        font: {
            size: 10
        },
        callback(t) {
            return t
        },
        padding: 5,
        centerPointLabels: !1
    }
}), k(ti, "defaultRoutes", {
    "angleLines.color": "borderColor",
    "pointLabels.color": "color",
    "ticks.color": "color"
}), k(ti, "descriptors", {
    angleLines: {
        _fallback: "grid"
    }
});
const Ai = {
        millisecond: {
            common: !0,
            size: 1,
            steps: 1e3
        },
        second: {
            common: !0,
            size: 1e3,
            steps: 60
        },
        minute: {
            common: !0,
            size: 6e4,
            steps: 60
        },
        hour: {
            common: !0,
            size: 36e5,
            steps: 24
        },
        day: {
            common: !0,
            size: 864e5,
            steps: 30
        },
        week: {
            common: !1,
            size: 6048e5,
            steps: 4
        },
        month: {
            common: !0,
            size: 2628e6,
            steps: 12
        },
        quarter: {
            common: !1,
            size: 7884e6,
            steps: 4
        },
        year: {
            common: !0,
            size: 3154e7
        }
    },
    U = Object.keys(Ai);

function co(i, t) {
    return i - t
}

function lo(i, t) {
    if (E(t)) return null;
    const e = i._adapter,
        {
            parser: n,
            round: s,
            isoWeekday: o
        } = i._parseOpts;
    let r = t;
    return typeof n == "function" && (r = n(r)), j(r) || (r = typeof n == "string" ? e.parse(r, n) : e.parse(r)), r === null ? null : (s && (r = s === "week" && (Me(o) || o === !0) ? e.startOf(r, "isoWeek", o) : e.startOf(r, s)), +r)
}

function ho(i, t, e, n) {
    const s = U.length;
    for (let o = U.indexOf(i); o < s - 1; ++o) {
        const r = Ai[U[o]],
            a = r.steps ? r.steps : Number.MAX_SAFE_INTEGER;
        if (r.common && Math.ceil((e - t) / (a * r.size)) <= n) return U[o]
    }
    return U[s - 1]
}

function yd(i, t, e, n, s) {
    for (let o = U.length - 1; o >= U.indexOf(e); o--) {
        const r = U[o];
        if (Ai[r].common && i._adapter.diff(s, n, r) >= t - 1) return r
    }
    return U[e ? U.indexOf(e) : 0]
}

function xd(i) {
    for (let t = U.indexOf(i) + 1, e = U.length; t < e; ++t)
        if (Ai[U[t]].common) return U[t]
}

function uo(i, t, e) {
    if (!e) i[t] = !0;
    else if (e.length) {
        const {
            lo: n,
            hi: s
        } = An(e, t), o = e[n] >= t ? e[n] : e[s];
        i[o] = !0
    }
}

function vd(i, t, e, n) {
    const s = i._adapter,
        o = +s.startOf(t[0].value, n),
        r = t[t.length - 1].value;
    let a, c;
    for (a = o; a <= r; a = +s.add(a, 1, n)) c = e[a], c >= 0 && (t[c].major = !0);
    return t
}

function fo(i, t, e) {
    const n = [],
        s = {},
        o = t.length;
    let r, a;
    for (r = 0; r < o; ++r) a = t[r], s[a] = r, n.push({
        value: a,
        major: !1
    });
    return o === 0 || !e ? n : vd(i, n, s, e)
}
class wi extends Nt {
    constructor(t) {
        super(t), this._cache = {
            data: [],
            labels: [],
            all: []
        }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0
    }
    init(t, e = {}) {
        const n = t.time || (t.time = {}),
            s = this._adapter = new $l._date(t.adapters.date);
        s.init(e), pe(n.displayFormats, s.formats()), this._parseOpts = {
            parser: n.parser,
            round: n.round,
            isoWeekday: n.isoWeekday
        }, super.init(t), this._normalized = e.normalized
    }
    parse(t, e) {
        return t === void 0 ? null : lo(this, t)
    }
    beforeLayout() {
        super.beforeLayout(), this._cache = {
            data: [],
            labels: [],
            all: []
        }
    }
    determineDataLimits() {
        const t = this.options,
            e = this._adapter,
            n = t.time.unit || "day";
        let {
            min: s,
            max: o,
            minDefined: r,
            maxDefined: a
        } = this.getUserBounds();

        function c(l) {
            !r && !isNaN(l.min) && (s = Math.min(s, l.min)), !a && !isNaN(l.max) && (o = Math.max(o, l.max))
        }(!r || !a) && (c(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && c(this.getMinMax(!1))), s = j(s) && !isNaN(s) ? s : +e.startOf(Date.now(), n), o = j(o) && !isNaN(o) ? o : +e.endOf(Date.now(), n) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o)
    }
    _getLabelBounds() {
        const t = this.getLabelTimestamps();
        let e = Number.POSITIVE_INFINITY,
            n = Number.NEGATIVE_INFINITY;
        return t.length && (e = t[0], n = t[t.length - 1]), {
            min: e,
            max: n
        }
    }
    buildTicks() {
        const t = this.options,
            e = t.time,
            n = t.ticks,
            s = n.source === "labels" ? this.getLabelTimestamps() : this._generate();
        t.bounds === "ticks" && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]);
        const o = this.min,
            r = this.max,
            a = ec(s, o, r);
        return this._unit = e.unit || (n.autoSkip ? ho(e.minUnit, this.min, this.max, this._getLabelCapacity(o)) : yd(this, a.length, e.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : xd(this._unit), this.initOffsets(s), t.reverse && a.reverse(), fo(this, a, this._majorUnit)
    }
    afterAutoSkip() {
        this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map(t => +t.value))
    }
    initOffsets(t = []) {
        let e = 0,
            n = 0,
            s, o;
        this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? e = 1 - s : e = (this.getDecimalForValue(t[1]) - s) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? n = o : n = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
        const r = t.length < 3 ? .5 : .25;
        e = it(e, 0, r), n = it(n, 0, r), this._offsets = {
            start: e,
            end: n,
            factor: 1 / (e + 1 + n)
        }
    }
    _generate() {
        const t = this._adapter,
            e = this.min,
            n = this.max,
            s = this.options,
            o = s.time,
            r = o.unit || ho(o.minUnit, e, n, this._getLabelCapacity(e)),
            a = A(s.ticks.stepSize, 1),
            c = r === "week" ? o.isoWeekday : !1,
            l = Me(c) || c === !0,
            h = {};
        let d = e,
            u, f;
        if (l && (d = +t.startOf(d, "isoWeek", c)), d = +t.startOf(d, l ? "day" : r), t.diff(n, e, r) > 1e5 * a) throw new Error(e + " and " + n + " are too far apart with stepSize of " + a + " " + r);
        const p = s.ticks.source === "data" && this.getDataTimestamps();
        for (u = d, f = 0; u < n; u = +t.add(u, a, r), f++) uo(h, u, p);
        return (u === n || s.bounds === "ticks" || f === 1) && uo(h, u, p), Object.keys(h).sort(co).map(g => +g)
    }
    getLabelForValue(t) {
        const e = this._adapter,
            n = this.options.time;
        return n.tooltipFormat ? e.format(t, n.tooltipFormat) : e.format(t, n.displayFormats.datetime)
    }
    format(t, e) {
        const s = this.options.time.displayFormats,
            o = this._unit,
            r = e || s[o];
        return this._adapter.format(t, r)
    }
    _tickFormatFunction(t, e, n, s) {
        const o = this.options,
            r = o.ticks.callback;
        if (r) return D(r, [t, e, n], this);
        const a = o.time.displayFormats,
            c = this._unit,
            l = this._majorUnit,
            h = c && a[c],
            d = l && a[l],
            u = n[e],
            f = l && d && u && u.major;
        return this._adapter.format(t, s || (f ? d : h))
    }
    generateTickLabels(t) {
        let e, n, s;
        for (e = 0, n = t.length; e < n; ++e) s = t[e], s.label = this._tickFormatFunction(s.value, e, t)
    }
    getDecimalForValue(t) {
        return t === null ? NaN : (t - this.min) / (this.max - this.min)
    }
    getPixelForValue(t) {
        const e = this._offsets,
            n = this.getDecimalForValue(t);
        return this.getPixelForDecimal((e.start + n) * e.factor)
    }
    getValueForPixel(t) {
        const e = this._offsets,
            n = this.getDecimalForPixel(t) / e.factor - e.end;
        return this.min + n * (this.max - this.min)
    }
    _getLabelSize(t) {
        const e = this.options.ticks,
            n = this.ctx.measureText(t).width,
            s = Z(this.isHorizontal() ? e.maxRotation : e.minRotation),
            o = Math.cos(s),
            r = Math.sin(s),
            a = this._resolveTickFontOptions(0).size;
        return {
            w: n * o + a * r,
            h: n * r + a * o
        }
    }
    _getLabelCapacity(t) {
        const e = this.options.time,
            n = e.displayFormats,
            s = n[e.unit] || n.millisecond,
            o = this._tickFormatFunction(t, 0, fo(this, [t], this._majorUnit), s),
            r = this._getLabelSize(o),
            a = Math.floor(this.isHorizontal() ? this.width / r.w : this.height / r.h) - 1;
        return a > 0 ? a : 1
    }
    getDataTimestamps() {
        let t = this._cache.data || [],
            e, n;
        if (t.length) return t;
        const s = this.getMatchingVisibleMetas();
        if (this._normalized && s.length) return this._cache.data = s[0].controller.getAllParsedValues(this);
        for (e = 0, n = s.length; e < n; ++e) t = t.concat(s[e].controller.getAllParsedValues(this));
        return this._cache.data = this.normalize(t)
    }
    getLabelTimestamps() {
        const t = this._cache.labels || [];
        let e, n;
        if (t.length) return t;
        const s = this.getLabels();
        for (e = 0, n = s.length; e < n; ++e) t.push(lo(this, s[e]));
        return this._cache.labels = this._normalized ? t : this.normalize(t)
    }
    normalize(t) {
        return nc(t.sort(co))
    }
}
k(wi, "id", "time"), k(wi, "defaults", {
    bounds: "data",
    adapters: {},
    time: {
        parser: !1,
        unit: !1,
        round: !1,
        isoWeekday: !1,
        minUnit: "millisecond",
        displayFormats: {}
    },
    ticks: {
        source: "auto",
        callback: !1,
        major: {
            enabled: !1
        }
    }
});

function ei(i, t, e) {
    let n = 0,
        s = i.length - 1,
        o, r, a, c;
    e ? (t >= i[n].pos && t <= i[s].pos && ({
        lo: n,
        hi: s
    } = Ot(i, "pos", t)), {
        pos: o,
        time: a
    } = i[n], {
        pos: r,
        time: c
    } = i[s]) : (t >= i[n].time && t <= i[s].time && ({
        lo: n,
        hi: s
    } = Ot(i, "time", t)), {
        time: o,
        pos: a
    } = i[n], {
        time: r,
        pos: c
    } = i[s]);
    const l = r - o;
    return l ? a + (c - a) * (t - o) / l : a
}
class po extends wi {
    constructor(t) {
        super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0
    }
    initOffsets() {
        const t = this._getTimestampsForTable(),
            e = this._table = this.buildLookupTable(t);
        this._minPos = ei(e, this.min), this._tableRange = ei(e, this.max) - this._minPos, super.initOffsets(t)
    }
    buildLookupTable(t) {
        const {
            min: e,
            max: n
        } = this, s = [], o = [];
        let r, a, c, l, h;
        for (r = 0, a = t.length; r < a; ++r) l = t[r], l >= e && l <= n && s.push(l);
        if (s.length < 2) return [{
            time: e,
            pos: 0
        }, {
            time: n,
            pos: 1
        }];
        for (r = 0, a = s.length; r < a; ++r) h = s[r + 1], c = s[r - 1], l = s[r], Math.round((h + c) / 2) !== l && o.push({
            time: l,
            pos: r / (a - 1)
        });
        return o
    }
    _generate() {
        const t = this.min,
            e = this.max;
        let n = super.getDataTimestamps();
        return (!n.includes(t) || !n.length) && n.splice(0, 0, t), (!n.includes(e) || n.length === 1) && n.push(e), n.sort((s, o) => s - o)
    }
    _getTimestampsForTable() {
        let t = this._cache.all || [];
        if (t.length) return t;
        const e = this.getDataTimestamps(),
            n = this.getLabelTimestamps();
        return e.length && n.length ? t = this.normalize(e.concat(n)) : t = e.length ? e : n, t = this._cache.all = t, t
    }
    getDecimalForValue(t) {
        return (ei(this._table, t) - this._minPos) / this._tableRange
    }
    getValueForPixel(t) {
        const e = this._offsets,
            n = this.getDecimalForPixel(t) / e.factor - e.end;
        return ei(this._table, n * this._tableRange + this._minPos, !0)
    }
}
k(po, "id", "timeseries"), k(po, "defaults", wi.defaults);
var wd = Object.defineProperty,
    kd = Object.getOwnPropertyDescriptor,
    Mr = (i, t, e, n) => {
        for (var s = n > 1 ? void 0 : n ? kd(t, e) : t, o = i.length - 1, r; o >= 0; o--)(r = i[o]) && (s = (n ? r(t, e, s) : r(s)) || s);
        return n && s && wd(t, e, s), s
    };
rt.register(Jh, si, hn, dn, ci, fe);
let fn = class extends J {
    constructor() {
        super(), this.chartdata = []
    }
    updated(i) {
        var t;
        super.updated(i), i.has("chartdata") && (this.chartSubComponent.data.datasets[0].data = this.chartdata, this.chartSubComponent.data.labels = this.chartdata, (t = this.chartSubComponent) == null || t.update())
    }
    firstUpdated() {
        const i = this.renderRoot.querySelector("canvas").getContext("2d");
        this.chartSubComponent = new rt(i, {
            type: "line",
            data: {
                labels: this.chartdata,
                datasets: [{
                    data: this.chartdata,
                    borderWidth: 1,
                    tension: .3
                }]
            },
            options: {
                animation: {
                    duration: 0
                },
                plugins: {
                    legend: {
                        display: !1
                    }
                },
                scales: {
                    x: {
                        display: !1
                    },
                    y: {
                        position: "right"
                    }
                },
                responsive: !0,
                maintainAspectRatio: !1
            }
        }), this.updateStylesIfExpanded()
    }
    updateStylesIfExpanded() {
        const i = this.parentElement,
            t = "expanded",
            e = () => {
                i && i.classList.contains(t) ? (this.style.height = "240px", this.style.opacity = "0.5") : (this.style.height = "42px", this.style.opacity = "0.1")
            };
        e();
        const n = new MutationObserver(e);
        i && n.observe(i, {
            attributes: !0,
            attributeFilter: ["class"]
        })
    }
    static get styles() {
        return nt `:host{position:absolute;left:24px;height:42px;width:calc(100% - 42px);z-index:-100}`
    }
    render() {
        return C `<canvas></canvas>`
    }
};
Mr([Y({
    type: Array
})], fn.prototype, "chartdata", 2);
fn = Mr([Rt("esp-entity-chart")], fn);
const Cr = Object.freeze({
        left: 0,
        top: 0,
        width: 16,
        height: 16
    }),
    ki = Object.freeze({
        rotate: 0,
        vFlip: !1,
        hFlip: !1
    }),
    Re = Object.freeze({...Cr,
        ...ki
    }),
    pn = Object.freeze({...Re,
        body: "",
        hidden: !1
    }),
    Sd = Object.freeze({
        width: null,
        height: null
    }),
    Or = Object.freeze({...Sd,
        ...ki
    });

function Md(i, t = 0) {
    const e = i.replace(/^-?[0-9.]*/, "");

    function n(s) {
        for (; s < 0;) s += 4;
        return s % 4
    }
    if (e === "") {
        const s = parseInt(i);
        return isNaN(s) ? 0 : n(s)
    } else if (e !== i) {
        let s = 0;
        switch (e) {
            case "%":
                s = 25;
                break;
            case "deg":
                s = 90
        }
        if (s) {
            let o = parseFloat(i.slice(0, i.length - e.length));
            return isNaN(o) ? 0 : (o = o / s, o % 1 === 0 ? n(o) : 0)
        }
    }
    return t
}
const Cd = /[\s,]+/;

function Od(i, t) {
    t.split(Cd).forEach(e => {
        switch (e.trim()) {
            case "horizontal":
                i.hFlip = !0;
                break;
            case "vertical":
                i.vFlip = !0;
                break
        }
    })
}
const Pr = {...Or,
    preserveAspectRatio: ""
};

function go(i) {
    const t = {...Pr
        },
        e = (n, s) => i.getAttribute(n) || s;
    return t.width = e("width", null), t.height = e("height", null), t.rotate = Md(e("rotate", "")), Od(t, e("flip", "")), t.preserveAspectRatio = e("preserveAspectRatio", e("preserveaspectratio", "")), t
}

function Pd(i, t) {
    for (const e in Pr)
        if (i[e] !== t[e]) return !0;
    return !1
}
const _e = /^[a-z0-9]+(-[a-z0-9]+)*$/,
    Fe = (i, t, e, n = "") => {
        const s = i.split(":");
        if (i.slice(0, 1) === "@") {
            if (s.length < 2 || s.length > 3) return null;
            n = s.shift().slice(1)
        }
        if (s.length > 3 || !s.length) return null;
        if (s.length > 1) {
            const a = s.pop(),
                c = s.pop(),
                l = {
                    provider: s.length > 0 ? s[0] : n,
                    prefix: c,
                    name: a
                };
            return t && !li(l) ? null : l
        }
        const o = s[0],
            r = o.split("-");
        if (r.length > 1) {
            const a = {
                provider: n,
                prefix: r.shift(),
                name: r.join("-")
            };
            return t && !li(a) ? null : a
        }
        if (e && n === "") {
            const a = {
                provider: n,
                prefix: "",
                name: o
            };
            return t && !li(a, e) ? null : a
        }
        return null
    },
    li = (i, t) => i ? !!((i.provider === "" || i.provider.match(_e)) && (t && i.prefix === "" || i.prefix.match(_e)) && i.name.match(_e)) : !1;

function $d(i, t) {
    const e = {};
    !i.hFlip != !t.hFlip && (e.hFlip = !0), !i.vFlip != !t.vFlip && (e.vFlip = !0);
    const n = ((i.rotate || 0) + (t.rotate || 0)) % 4;
    return n && (e.rotate = n), e
}

function mo(i, t) {
    const e = $d(i, t);
    for (const n in pn) n in ki ? n in i && !(n in e) && (e[n] = ki[n]) : n in t ? e[n] = t[n] : n in i && (e[n] = i[n]);
    return e
}

function Ad(i, t) {
    const e = i.icons,
        n = i.aliases || Object.create(null),
        s = Object.create(null);

    function o(r) {
        if (e[r]) return s[r] = [];
        if (!(r in s)) {
            s[r] = null;
            const a = n[r] && n[r].parent,
                c = a && o(a);
            c && (s[r] = [a].concat(c))
        }
        return s[r]
    }
    return (t || Object.keys(e).concat(Object.keys(n))).forEach(o), s
}

function Ed(i, t, e) {
    const n = i.icons,
        s = i.aliases || Object.create(null);
    let o = {};

    function r(a) {
        o = mo(n[a] || s[a], o)
    }
    return r(t), e.forEach(r), mo(i, o)
}

function $r(i, t) {
    const e = [];
    if (typeof i != "object" || typeof i.icons != "object") return e;
    i.not_found instanceof Array && i.not_found.forEach(s => {
        t(s, null), e.push(s)
    });
    const n = Ad(i);
    for (const s in n) {
        const o = n[s];
        o && (t(s, Ed(i, s, o)), e.push(s))
    }
    return e
}
const Dd = {
    provider: "",
    aliases: {},
    not_found: {},
    ...Cr
};

function Gi(i, t) {
    for (const e in t)
        if (e in i && typeof i[e] != typeof t[e]) return !1;
    return !0
}

function Ar(i) {
    if (typeof i != "object" || i === null) return null;
    const t = i;
    if (typeof t.prefix != "string" || !i.icons || typeof i.icons != "object" || !Gi(i, Dd)) return null;
    const e = t.icons;
    for (const s in e) {
        const o = e[s];
        if (!s.match(_e) || typeof o.body != "string" || !Gi(o, pn)) return null
    }
    const n = t.aliases || Object.create(null);
    for (const s in n) {
        const o = n[s],
            r = o.parent;
        if (!s.match(_e) || typeof r != "string" || !e[r] && !n[r] || !Gi(o, pn)) return null
    }
    return t
}
const Si = Object.create(null);

function Id(i, t) {
    return {
        provider: i,
        prefix: t,
        icons: Object.create(null),
        missing: new Set
    }
}

function gt(i, t) {
    const e = Si[i] || (Si[i] = Object.create(null));
    return e[t] || (e[t] = Id(i, t))
}

function Nn(i, t) {
    return Ar(t) ? $r(t, (e, n) => {
        n ? i.icons[e] = n : i.missing.add(e)
    }) : []
}

function Td(i, t, e) {
    try {
        if (typeof e.body == "string") return i.icons[t] = {...e
        }, !0
    } catch {}
    return !1
}

function Ld(i, t) {
    let e = [];
    return (typeof i == "string" ? [i] : Object.keys(Si)).forEach(s => {
        (typeof s == "string" && typeof t == "string" ? [t] : Object.keys(Si[s] || {})).forEach(r => {
            const a = gt(s, r);
            e = e.concat(Object.keys(a.icons).map(c => (s !== "" ? "@" + s + ":" : "") + r + ":" + c))
        })
    }), e
}
let Pe = !1;

function Er(i) {
    return typeof i == "boolean" && (Pe = i), Pe
}

function $e(i) {
    const t = typeof i == "string" ? Fe(i, !0, Pe) : i;
    if (t) {
        const e = gt(t.provider, t.prefix),
            n = t.name;
        return e.icons[n] || (e.missing.has(n) ? null : void 0)
    }
}

function Dr(i, t) {
    const e = Fe(i, !0, Pe);
    if (!e) return !1;
    const n = gt(e.provider, e.prefix);
    return Td(n, e.name, t)
}

function bo(i, t) {
    if (typeof i != "object") return !1;
    if (typeof t != "string" && (t = i.provider || ""), Pe && !t && !i.prefix) {
        let s = !1;
        return Ar(i) && (i.prefix = "", $r(i, (o, r) => {
            r && Dr(o, r) && (s = !0)
        })), s
    }
    const e = i.prefix;
    if (!li({
            provider: t,
            prefix: e,
            name: "a"
        })) return !1;
    const n = gt(t, e);
    return !!Nn(n, i)
}

function Rd(i) {
    return !!$e(i)
}

function Fd(i) {
    const t = $e(i);
    return t ? {...Re,
        ...t
    } : null
}

function Nd(i) {
    const t = {
            loaded: [],
            missing: [],
            pending: []
        },
        e = Object.create(null);
    i.sort((s, o) => s.provider !== o.provider ? s.provider.localeCompare(o.provider) : s.prefix !== o.prefix ? s.prefix.localeCompare(o.prefix) : s.name.localeCompare(o.name));
    let n = {
        provider: "",
        prefix: "",
        name: ""
    };
    return i.forEach(s => {
        if (n.name === s.name && n.prefix === s.prefix && n.provider === s.provider) return;
        n = s;
        const o = s.provider,
            r = s.prefix,
            a = s.name,
            c = e[o] || (e[o] = Object.create(null)),
            l = c[r] || (c[r] = gt(o, r));
        let h;
        a in l.icons ? h = t.loaded : r === "" || l.missing.has(a) ? h = t.missing : h = t.pending;
        const d = {
            provider: o,
            prefix: r,
            name: a
        };
        h.push(d)
    }), t
}

function Ir(i, t) {
    i.forEach(e => {
        const n = e.loaderCallbacks;
        n && (e.loaderCallbacks = n.filter(s => s.id !== t))
    })
}

function zd(i) {
    i.pendingCallbacksFlag || (i.pendingCallbacksFlag = !0, setTimeout(() => {
        i.pendingCallbacksFlag = !1;
        const t = i.loaderCallbacks ? i.loaderCallbacks.slice(0) : [];
        if (!t.length) return;
        let e = !1;
        const n = i.provider,
            s = i.prefix;
        t.forEach(o => {
            const r = o.icons,
                a = r.pending.length;
            r.pending = r.pending.filter(c => {
                if (c.prefix !== s) return !0;
                const l = c.name;
                if (i.icons[l]) r.loaded.push({
                    provider: n,
                    prefix: s,
                    name: l
                });
                else if (i.missing.has(l)) r.missing.push({
                    provider: n,
                    prefix: s,
                    name: l
                });
                else return e = !0, !0;
                return !1
            }), r.pending.length !== a && (e || Ir([i], o.id), o.callback(r.loaded.slice(0), r.missing.slice(0), r.pending.slice(0), o.abort))
        })
    }))
}
let jd = 0;

function Bd(i, t, e) {
    const n = jd++,
        s = Ir.bind(null, e, n);
    if (!t.pending.length) return s;
    const o = {
        id: n,
        icons: t,
        callback: i,
        abort: s
    };
    return e.forEach(r => {
        (r.loaderCallbacks || (r.loaderCallbacks = [])).push(o)
    }), s
}
const gn = Object.create(null);

function _o(i, t) {
    gn[i] = t
}

function mn(i) {
    return gn[i] || gn[""]
}

function Vd(i, t = !0, e = !1) {
    const n = [];
    return i.forEach(s => {
        const o = typeof s == "string" ? Fe(s, t, e) : s;
        o && n.push(o)
    }), n
}
var Hd = {
    resources: [],
    index: 0,
    timeout: 2e3,
    rotate: 750,
    random: !1,
    dataAfterTimeout: !1
};

function Wd(i, t, e, n) {
    const s = i.resources.length,
        o = i.random ? Math.floor(Math.random() * s) : i.index;
    let r;
    if (i.random) {
        let x = i.resources.slice(0);
        for (r = []; x.length > 1;) {
            const w = Math.floor(Math.random() * x.length);
            r.push(x[w]), x = x.slice(0, w).concat(x.slice(w + 1))
        }
        r = r.concat(x)
    } else r = i.resources.slice(o).concat(i.resources.slice(0, o));
    const a = Date.now();
    let c = "pending",
        l = 0,
        h, d = null,
        u = [],
        f = [];
    typeof n == "function" && f.push(n);

    function p() {
        d && (clearTimeout(d), d = null)
    }

    function g() {
        c === "pending" && (c = "aborted"), p(), u.forEach(x => {
            x.status === "pending" && (x.status = "aborted")
        }), u = []
    }

    function m(x, w) {
        w && (f = []), typeof x == "function" && f.push(x)
    }

    function b() {
        return {
            startTime: a,
            payload: t,
            status: c,
            queriesSent: l,
            queriesPending: u.length,
            subscribe: m,
            abort: g
        }
    }

    function _() {
        c = "failed", f.forEach(x => {
            x(void 0, h)
        })
    }

    function v() {
        u.forEach(x => {
            x.status === "pending" && (x.status = "aborted")
        }), u = []
    }

    function M(x, w, S) {
        const O = w !== "success";
        switch (u = u.filter($ => $ !== x), c) {
            case "pending":
                break;
            case "failed":
                if (O || !i.dataAfterTimeout) return;
                break;
            default:
                return
        }
        if (w === "abort") {
            h = S, _();
            return
        }
        if (O) {
            h = S, u.length || (r.length ? y() : _());
            return
        }
        if (p(), v(), !i.random) {
            const $ = i.resources.indexOf(x.resource);
            $ !== -1 && $ !== i.index && (i.index = $)
        }
        c = "completed", f.forEach($ => {
            $(S)
        })
    }

    function y() {
        if (c !== "pending") return;
        p();
        const x = r.shift();
        if (x === void 0) {
            if (u.length) {
                d = setTimeout(() => {
                    p(), c === "pending" && (v(), _())
                }, i.timeout);
                return
            }
            _();
            return
        }
        const w = {
            status: "pending",
            resource: x,
            callback: (S, O) => {
                M(w, S, O)
            }
        };
        u.push(w), l++, d = setTimeout(y, i.rotate), e(x, t, w.callback)
    }
    return setTimeout(y), b
}

function Tr(i) {
    const t = {...Hd,
        ...i
    };
    let e = [];

    function n() {
        e = e.filter(a => a().status === "pending")
    }

    function s(a, c, l) {
        const h = Wd(t, a, c, (d, u) => {
            n(), l && l(d, u)
        });
        return e.push(h), h
    }

    function o(a) {
        return e.find(c => a(c)) || null
    }
    return {
        query: s,
        find: o,
        setIndex: a => {
            t.index = a
        },
        getIndex: () => t.index,
        cleanup: n
    }
}

function zn(i) {
    let t;
    if (typeof i.resources == "string") t = [i.resources];
    else if (t = i.resources, !(t instanceof Array) || !t.length) return null;
    return {
        resources: t,
        path: i.path || "/",
        maxURL: i.maxURL || 500,
        rotate: i.rotate || 750,
        timeout: i.timeout || 5e3,
        random: i.random === !0,
        index: i.index || 0,
        dataAfterTimeout: i.dataAfterTimeout !== !1
    }
}
const Ei = Object.create(null),
    le = ["https://api.simplesvg.com", "https://api.unisvg.com"],
    hi = [];
for (; le.length > 0;) le.length === 1 || Math.random() > .5 ? hi.push(le.shift()) : hi.push(le.pop());
Ei[""] = zn({
    resources: ["https://api.iconify.design"].concat(hi)
});

function yo(i, t) {
    const e = zn(t);
    return e === null ? !1 : (Ei[i] = e, !0)
}

function Di(i) {
    return Ei[i]
}

function Ud() {
    return Object.keys(Ei)
}

function xo() {}
const Qi = Object.create(null);

function Yd(i) {
    if (!Qi[i]) {
        const t = Di(i);
        if (!t) return;
        const e = Tr(t),
            n = {
                config: t,
                redundancy: e
            };
        Qi[i] = n
    }
    return Qi[i]
}

function Lr(i, t, e) {
    let n, s;
    if (typeof i == "string") {
        const o = mn(i);
        if (!o) return e(void 0, 424), xo;
        s = o.send;
        const r = Yd(i);
        r && (n = r.redundancy)
    } else {
        const o = zn(i);
        if (o) {
            n = Tr(o);
            const r = i.resources ? i.resources[0] : "",
                a = mn(r);
            a && (s = a.send)
        }
    }
    return !n || !s ? (e(void 0, 424), xo) : n.query(t, s, e)().abort
}
const vo = "iconify2",
    Ae = "iconify",
    Rr = Ae + "-count",
    wo = Ae + "-version",
    Fr = 36e5,
    qd = 168;

function bn(i, t) {
    try {
        return i.getItem(t)
    } catch {}
}

function jn(i, t, e) {
    try {
        return i.setItem(t, e), !0
    } catch {}
}

function ko(i, t) {
    try {
        i.removeItem(t)
    } catch {}
}

function _n(i, t) {
    return jn(i, Rr, t.toString())
}

function yn(i) {
    return parseInt(bn(i, Rr)) || 0
}
const At = {
        local: !0,
        session: !0
    },
    Nr = {
        local: new Set,
        session: new Set
    };
let Bn = !1;

function Xd(i) {
    Bn = i
}
let ii = typeof window == "undefined" ? {} : window;

function zr(i) {
    const t = i + "Storage";
    try {
        if (ii && ii[t] && typeof ii[t].length == "number") return ii[t]
    } catch {}
    At[i] = !1
}

function jr(i, t) {
    const e = zr(i);
    if (!e) return;
    const n = bn(e, wo);
    if (n !== vo) {
        if (n) {
            const a = yn(e);
            for (let c = 0; c < a; c++) ko(e, Ae + c.toString())
        }
        jn(e, wo, vo), _n(e, 0);
        return
    }
    const s = Math.floor(Date.now() / Fr) - qd,
        o = a => {
            const c = Ae + a.toString(),
                l = bn(e, c);
            if (typeof l == "string") {
                try {
                    const h = JSON.parse(l);
                    if (typeof h == "object" && typeof h.cached == "number" && h.cached > s && typeof h.provider == "string" && typeof h.data == "object" && typeof h.data.prefix == "string" && t(h, a)) return !0
                } catch {}
                ko(e, c)
            }
        };
    let r = yn(e);
    for (let a = r - 1; a >= 0; a--) o(a) || (a === r - 1 ? (r--, _n(e, r)) : Nr[i].add(a))
}

function Br() {
    if (!Bn) {
        Xd(!0);
        for (const i in At) jr(i, t => {
            const e = t.data,
                n = t.provider,
                s = e.prefix,
                o = gt(n, s);
            if (!Nn(o, e).length) return !1;
            const r = e.lastModified || -1;
            return o.lastModifiedCached = o.lastModifiedCached ? Math.min(o.lastModifiedCached, r) : r, !0
        })
    }
}

function Kd(i, t) {
    const e = i.lastModifiedCached;
    if (e && e >= t) return e === t;
    if (i.lastModifiedCached = t, e)
        for (const n in At) jr(n, s => {
            const o = s.data;
            return s.provider !== i.provider || o.prefix !== i.prefix || o.lastModified === t
        });
    return !0
}

function Gd(i, t) {
    Bn || Br();

    function e(n) {
        let s;
        if (!At[n] || !(s = zr(n))) return;
        const o = Nr[n];
        let r;
        if (o.size) o.delete(r = Array.from(o).shift());
        else if (r = yn(s), !_n(s, r + 1)) return;
        const a = {
            cached: Math.floor(Date.now() / Fr),
            provider: i.provider,
            data: t
        };
        return jn(s, Ae + r.toString(), JSON.stringify(a))
    }
    t.lastModified && !Kd(i, t.lastModified) || !Object.keys(t.icons).length || (t.not_found && (t = Object.assign({}, t), delete t.not_found), e("local") || e("session"))
}

function So() {}

function Qd(i) {
    i.iconsLoaderFlag || (i.iconsLoaderFlag = !0, setTimeout(() => {
        i.iconsLoaderFlag = !1, zd(i)
    }))
}

function Zd(i, t) {
    i.iconsToLoad ? i.iconsToLoad = i.iconsToLoad.concat(t).sort() : i.iconsToLoad = t, i.iconsQueueFlag || (i.iconsQueueFlag = !0, setTimeout(() => {
        i.iconsQueueFlag = !1;
        const {
            provider: e,
            prefix: n
        } = i, s = i.iconsToLoad;
        delete i.iconsToLoad;
        let o;
        if (!s || !(o = mn(e))) return;
        o.prepare(e, n, s).forEach(a => {
            Lr(e, a, c => {
                if (typeof c != "object") a.icons.forEach(l => {
                    i.missing.add(l)
                });
                else try {
                    const l = Nn(i, c);
                    if (!l.length) return;
                    const h = i.pendingIcons;
                    h && l.forEach(d => {
                        h.delete(d)
                    }), Gd(i, c)
                } catch (l) {
                    console.error(l)
                }
                Qd(i)
            })
        })
    }))
}
const Vn = (i, t) => {
        const e = Vd(i, !0, Er()),
            n = Nd(e);
        if (!n.pending.length) {
            let c = !0;
            return t && setTimeout(() => {
                c && t(n.loaded, n.missing, n.pending, So)
            }), () => {
                c = !1
            }
        }
        const s = Object.create(null),
            o = [];
        let r, a;
        return n.pending.forEach(c => {
            const {
                provider: l,
                prefix: h
            } = c;
            if (h === a && l === r) return;
            r = l, a = h, o.push(gt(l, h));
            const d = s[l] || (s[l] = Object.create(null));
            d[h] || (d[h] = [])
        }), n.pending.forEach(c => {
            const {
                provider: l,
                prefix: h,
                name: d
            } = c, u = gt(l, h), f = u.pendingIcons || (u.pendingIcons = new Set);
            f.has(d) || (f.add(d), s[l][h].push(d))
        }), o.forEach(c => {
            const {
                provider: l,
                prefix: h
            } = c;
            s[l][h].length && Zd(c, s[l][h])
        }), t ? Bd(t, n, o) : So
    },
    Jd = i => new Promise((t, e) => {
        const n = typeof i == "string" ? Fe(i, !0) : i;
        if (!n) {
            e(i);
            return
        }
        Vn([n || i], s => {
            if (s.length && n) {
                const o = $e(n);
                if (o) {
                    t({...Re,
                        ...o
                    });
                    return
                }
            }
            e(i)
        })
    });

function tu(i) {
    try {
        const t = typeof i == "string" ? JSON.parse(i) : i;
        if (typeof t.body == "string") return {...t
        }
    } catch {}
}

function eu(i, t) {
    const e = typeof i == "string" ? Fe(i, !0, !0) : null;
    if (!e) {
        const o = tu(i);
        return {
            value: i,
            data: o
        }
    }
    const n = $e(e);
    if (n !== void 0 || !e.prefix) return {
        value: i,
        name: e,
        data: n
    };
    const s = Vn([e], () => t(i, e, $e(e)));
    return {
        value: i,
        name: e,
        loading: s
    }
}

function Zi(i) {
    return i.hasAttribute("inline")
}
let Vr = !1;
try {
    Vr = navigator.vendor.indexOf("Apple") === 0
} catch {}

function iu(i, t) {
    switch (t) {
        case "svg":
        case "bg":
        case "mask":
            return t
    }
    return t !== "style" && (Vr || i.indexOf("<a") === -1) ? "svg" : i.indexOf("currentColor") === -1 ? "bg" : "mask"
}
const nu = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
    su = /^-?[0-9.]*[0-9]+[0-9.]*$/g;

function xn(i, t, e) {
    if (t === 1) return i;
    if (e = e || 100, typeof i == "number") return Math.ceil(i * t * e) / e;
    if (typeof i != "string") return i;
    const n = i.split(nu);
    if (n === null || !n.length) return i;
    const s = [];
    let o = n.shift(),
        r = su.test(o);
    for (;;) {
        if (r) {
            const a = parseFloat(o);
            isNaN(a) ? s.push(o) : s.push(Math.ceil(a * t * e) / e)
        } else s.push(o);
        if (o = n.shift(), o === void 0) return s.join("");
        r = !r
    }
}
const ou = i => i === "unset" || i === "undefined" || i === "none";

function Hr(i, t) {
    const e = {...Re,
            ...i
        },
        n = {...Or,
            ...t
        },
        s = {
            left: e.left,
            top: e.top,
            width: e.width,
            height: e.height
        };
    let o = e.body;
    [e, n].forEach(p => {
        const g = [],
            m = p.hFlip,
            b = p.vFlip;
        let _ = p.rotate;
        m ? b ? _ += 2 : (g.push("translate(" + (s.width + s.left).toString() + " " + (0 - s.top).toString() + ")"), g.push("scale(-1 1)"), s.top = s.left = 0) : b && (g.push("translate(" + (0 - s.left).toString() + " " + (s.height + s.top).toString() + ")"), g.push("scale(1 -1)"), s.top = s.left = 0);
        let v;
        switch (_ < 0 && (_ -= Math.floor(_ / 4) * 4), _ = _ % 4, _) {
            case 1:
                v = s.height / 2 + s.top, g.unshift("rotate(90 " + v.toString() + " " + v.toString() + ")");
                break;
            case 2:
                g.unshift("rotate(180 " + (s.width / 2 + s.left).toString() + " " + (s.height / 2 + s.top).toString() + ")");
                break;
            case 3:
                v = s.width / 2 + s.left, g.unshift("rotate(-90 " + v.toString() + " " + v.toString() + ")");
                break
        }
        _ % 2 === 1 && (s.left !== s.top && (v = s.left, s.left = s.top, s.top = v), s.width !== s.height && (v = s.width, s.width = s.height, s.height = v)), g.length && (o = '<g transform="' + g.join(" ") + '">' + o + "</g>")
    });
    const r = n.width,
        a = n.height,
        c = s.width,
        l = s.height;
    let h, d;
    r === null ? (d = a === null ? "1em" : a === "auto" ? l : a, h = xn(d, c / l)) : (h = r === "auto" ? c : r, d = a === null ? xn(h, l / c) : a === "auto" ? l : a);
    const u = {},
        f = (p, g) => {
            ou(g) || (u[p] = g.toString())
        };
    return f("width", h), f("height", d), u.viewBox = s.left.toString() + " " + s.top.toString() + " " + c.toString() + " " + l.toString(), {
        attributes: u,
        body: o
    }
}
const ru = () => {
    let i;
    try {
        if (i = fetch, typeof i == "function") return i
    } catch {}
};
let Mi = ru();

function au(i) {
    Mi = i
}

function cu() {
    return Mi
}

function lu(i, t) {
    const e = Di(i);
    if (!e) return 0;
    let n;
    if (!e.maxURL) n = 0;
    else {
        let s = 0;
        e.resources.forEach(r => {
            s = Math.max(s, r.length)
        });
        const o = t + ".json?icons=";
        n = e.maxURL - s - e.path.length - o.length
    }
    return n
}

function hu(i) {
    return i === 404
}
const du = (i, t, e) => {
    const n = [],
        s = lu(i, t),
        o = "icons";
    let r = {
            type: o,
            provider: i,
            prefix: t,
            icons: []
        },
        a = 0;
    return e.forEach((c, l) => {
        a += c.length + 1, a >= s && l > 0 && (n.push(r), r = {
            type: o,
            provider: i,
            prefix: t,
            icons: []
        }, a = c.length), r.icons.push(c)
    }), n.push(r), n
};

function uu(i) {
    if (typeof i == "string") {
        const t = Di(i);
        if (t) return t.path
    }
    return "/"
}
const fu = (i, t, e) => {
        if (!Mi) {
            e("abort", 424);
            return
        }
        let n = uu(t.provider);
        switch (t.type) {
            case "icons":
                {
                    const o = t.prefix,
                        a = t.icons.join(","),
                        c = new URLSearchParams({
                            icons: a
                        });n += o + ".json?" + c.toString();
                    break
                }
            case "custom":
                {
                    const o = t.uri;n += o.slice(0, 1) === "/" ? o.slice(1) : o;
                    break
                }
            default:
                e("abort", 400);
                return
        }
        let s = 503;
        Mi(i + n).then(o => {
            const r = o.status;
            if (r !== 200) {
                setTimeout(() => {
                    e(hu(r) ? "abort" : "next", r)
                });
                return
            }
            return s = 501, o.json()
        }).then(o => {
            if (typeof o != "object" || o === null) {
                setTimeout(() => {
                    o === 404 ? e("abort", o) : e("next", s)
                });
                return
            }
            setTimeout(() => {
                e("success", o)
            })
        }).catch(() => {
            e("next", s)
        })
    },
    pu = {
        prepare: du,
        send: fu
    };

function Mo(i, t) {
    switch (i) {
        case "local":
        case "session":
            At[i] = t;
            break;
        case "all":
            for (const e in At) At[e] = t;
            break
    }
}
const Ji = "data-style";
let Wr = "";

function gu(i) {
    Wr = i
}

function Co(i, t) {
    let e = Array.from(i.childNodes).find(n => n.hasAttribute && n.hasAttribute(Ji));
    e || (e = document.createElement("style"), e.setAttribute(Ji, Ji), i.appendChild(e)), e.textContent = ":host{display:inline-block;vertical-align:" + (t ? "-0.125em" : "0") + "}span,svg{display:block}" + Wr
}

function Ur() {
    _o("", pu), Er(!0);
    let i;
    try {
        i = window
    } catch {}
    if (i) {
        if (Br(), i.IconifyPreload !== void 0) {
            const e = i.IconifyPreload,
                n = "Invalid IconifyPreload syntax.";
            typeof e == "object" && e !== null && (e instanceof Array ? e : [e]).forEach(s => {
                try {
                    (typeof s != "object" || s === null || s instanceof Array || typeof s.icons != "object" || typeof s.prefix != "string" || !bo(s)) && console.error(n)
                } catch {
                    console.error(n)
                }
            })
        }
        if (i.IconifyProviders !== void 0) {
            const e = i.IconifyProviders;
            if (typeof e == "object" && e !== null)
                for (const n in e) {
                    const s = "IconifyProviders[" + n + "] is invalid.";
                    try {
                        const o = e[n];
                        if (typeof o != "object" || !o || o.resources === void 0) continue;
                        yo(n, o) || console.error(s)
                    } catch {
                        console.error(s)
                    }
                }
        }
    }
    return {
        enableCache: e => Mo(e, !0),
        disableCache: e => Mo(e, !1),
        iconExists: Rd,
        getIcon: Fd,
        listIcons: Ld,
        addIcon: Dr,
        addCollection: bo,
        calculateSize: xn,
        buildIcon: Hr,
        loadIcons: Vn,
        loadIcon: Jd,
        addAPIProvider: yo,
        appendCustomStyle: gu,
        _api: {
            getAPIConfig: Di,
            setAPIModule: _o,
            sendAPIQuery: Lr,
            setFetch: au,
            getFetch: cu,
            listAPIProviders: Ud
        }
    }
}

function Yr(i, t) {
    let e = i.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
    for (const n in t) e += " " + n + '="' + t[n] + '"';
    return '<svg xmlns="http://www.w3.org/2000/svg"' + e + ">" + i + "</svg>"
}

function mu(i) {
    return i.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ")
}

function bu(i) {
    return "data:image/svg+xml," + mu(i)
}

function _u(i) {
    return 'url("' + bu(i) + '")'
}
const vn = {
        "background-color": "currentColor"
    },
    qr = {
        "background-color": "transparent"
    },
    Oo = {
        image: "var(--svg)",
        repeat: "no-repeat",
        size: "100% 100%"
    },
    Po = {
        "-webkit-mask": vn,
        mask: vn,
        background: qr
    };
for (const i in Po) {
    const t = Po[i];
    for (const e in Oo) t[i + "-" + e] = Oo[e]
}

function $o(i) {
    return i ? i + (i.match(/^[-0-9.]+$/) ? "px" : "") : "inherit"
}

function yu(i, t, e) {
    const n = document.createElement("span");
    let s = i.body;
    s.indexOf("<a") !== -1 && (s += "<!-- " + Date.now() + " -->");
    const o = i.attributes,
        r = Yr(s, {...o,
            width: t.width + "",
            height: t.height + ""
        }),
        a = _u(r),
        c = n.style,
        l = {
            "--svg": a,
            width: $o(o.width),
            height: $o(o.height),
            ...e ? vn : qr
        };
    for (const h in l) c.setProperty(h, l[h]);
    return n
}
let ye;

function xu() {
    try {
        ye = window.trustedTypes.createPolicy("iconify", {
            createHTML: i => i
        })
    } catch {
        ye = null
    }
}

function vu(i) {
    return ye === void 0 && xu(), ye ? ye.createHTML(i) : i
}

function wu(i) {
    const t = document.createElement("span"),
        e = i.attributes;
    let n = "";
    e.width || (n = "width: inherit;"), e.height || (n += "height: inherit;"), n && (e.style = n);
    const s = Yr(i.body, e);
    return t.innerHTML = vu(s), t.firstChild
}

function Ao(i, t) {
    const e = t.icon.data,
        n = t.customisations,
        s = Hr(e, n);
    n.preserveAspectRatio && (s.attributes.preserveAspectRatio = n.preserveAspectRatio);
    const o = t.renderedMode;
    let r;
    switch (o) {
        case "svg":
            r = wu(s);
            break;
        default:
            r = yu(s, {...Re,
                ...e
            }, o === "mask")
    }
    const a = Array.from(i.childNodes).find(c => {
        const l = c.tagName && c.tagName.toUpperCase();
        return l === "SPAN" || l === "SVG"
    });
    a ? r.tagName === "SPAN" && a.tagName === r.tagName ? a.setAttribute("style", r.getAttribute("style")) : i.replaceChild(r, a) : i.appendChild(r)
}

function Eo(i, t, e) {
    const n = e && (e.rendered ? e : e.lastRender);
    return {
        rendered: !1,
        inline: t,
        icon: i,
        lastRender: n
    }
}

function ku(i = "iconify-icon") {
    let t, e;
    try {
        t = window.customElements, e = window.HTMLElement
    } catch {
        return
    }
    if (!t || !e) return;
    const n = t.get(i);
    if (n) return n;
    const s = ["icon", "mode", "inline", "width", "height", "rotate", "flip"],
        o = class extends e {
            constructor() {
                super();
                k(this, "_shadowRoot");
                k(this, "_state");
                k(this, "_checkQueued", !1);
                const c = this._shadowRoot = this.attachShadow({
                        mode: "open"
                    }),
                    l = Zi(this);
                Co(c, l), this._state = Eo({
                    value: ""
                }, l), this._queueCheck()
            }
            static get observedAttributes() {
                return s.slice(0)
            }
            attributeChangedCallback(c) {
                if (c === "inline") {
                    const l = Zi(this),
                        h = this._state;
                    l !== h.inline && (h.inline = l, Co(this._shadowRoot, l))
                } else this._queueCheck()
            }
            get icon() {
                const c = this.getAttribute("icon");
                if (c && c.slice(0, 1) === "{") try {
                    return JSON.parse(c)
                } catch {}
                return c
            }
            set icon(c) {
                typeof c == "object" && (c = JSON.stringify(c)), this.setAttribute("icon", c)
            }
            get inline() {
                return Zi(this)
            }
            set inline(c) {
                c ? this.setAttribute("inline", "true") : this.removeAttribute("inline")
            }
            restartAnimation() {
                const c = this._state;
                if (c.rendered) {
                    const l = this._shadowRoot;
                    if (c.renderedMode === "svg") try {
                        l.lastChild.setCurrentTime(0);
                        return
                    } catch {}
                    Ao(l, c)
                }
            }
            get status() {
                const c = this._state;
                return c.rendered ? "rendered" : c.icon.data === null ? "failed" : "loading"
            }
            _queueCheck() {
                this._checkQueued || (this._checkQueued = !0, setTimeout(() => {
                    this._check()
                }))
            }
            _check() {
                if (!this._checkQueued) return;
                this._checkQueued = !1;
                const c = this._state,
                    l = this.getAttribute("icon");
                if (l !== c.icon.value) {
                    this._iconChanged(l);
                    return
                }
                if (!c.rendered) return;
                const h = this.getAttribute("mode"),
                    d = go(this);
                (c.attrMode !== h || Pd(c.customisations, d)) && this._renderIcon(c.icon, d, h)
            }
            _iconChanged(c) {
                const l = eu(c, (h, d, u) => {
                    const f = this._state;
                    if (f.rendered || this.getAttribute("icon") !== h) return;
                    const p = {
                        value: h,
                        name: d,
                        data: u
                    };
                    p.data ? this._gotIconData(p) : f.icon = p
                });
                l.data ? this._gotIconData(l) : this._state = Eo(l, this._state.inline, this._state)
            }
            _gotIconData(c) {
                this._checkQueued = !1, this._renderIcon(c, go(this), this.getAttribute("mode"))
            }
            _renderIcon(c, l, h) {
                const d = iu(c.data.body, h),
                    u = this._state.inline;
                Ao(this._shadowRoot, this._state = {
                    rendered: !0,
                    icon: c,
                    inline: u,
                    customisations: l,
                    attrMode: h,
                    renderedMode: d
                })
            }
        };
    s.forEach(a => {
        a in o.prototype || Object.defineProperty(o.prototype, a, {
            get: function() {
                return this.getAttribute(a)
            },
            set: function(c) {
                c !== null ? this.setAttribute(a, c) : this.removeAttribute(a)
            }
        })
    });
    const r = Ur();
    for (const a in r) o[a] = o.prototype[a] = r[a];
    return t.define(i, o), o
}
ku() || Ur();
var Su = Object.defineProperty,
    Mu = Object.getOwnPropertyDescriptor,
    Ii = (i, t, e, n) => {
        for (var s = n > 1 ? void 0 : n ? Mu(t, e) : t, o = i.length - 1, r; o >= 0; o--)(r = i[o]) && (s = (n ? r(t, e, s) : r(s)) || s);
        return n && s && Su(t, e, s), s
    };
const Xr = "ON",
    Do = "OFF";

function Hn() {
    let i = window.location.pathname;
    return i.endsWith("/") ? i.slice(0, -1) : i
}
let G = class extends J {
        constructor() {
            super(...arguments), this.entities = [], this.has_controls = !1, this.show_all = !1, this._actionRenderer = new Cu, this._basePath = Hn(), this.groups = [], this._unknown_state_events = {}
        }
        connectedCallback() {
            var i, t;
            super.connectedCallback(), (i = window.source) == null || i.addEventListener("state", e => {
                const n = e,
                    s = JSON.parse(n.data);
                let o = this.entities.findIndex(r => r.unique_id === s.id);
                if (o != -1 && s.id) {
                    if (typeof s.value == "number") {
                        let r = [...this.entities[o].value_numeric_history];
                        r.push(s.value), this.entities[o].value_numeric_history = r.splice(-50)
                    }
                    delete s.id, delete s.domain, delete s.unique_id, Object.assign(this.entities[o], s), this.requestUpdate()
                } else if (s != null && s.name) this.addEntity(s);
                else {
                    if (this._unknown_state_events[s.id] ? this._unknown_state_events[s.id]++ : this._unknown_state_events[s.id] = 1, this._unknown_state_events[s.id] < 1) return;
                    let r = s.id.split("-"),
                        a = r[0],
                        c = r.slice(1).join("-");
                    fetch(`${this._basePath}/${a}/${c}?detail=all`, {
                        method: "GET"
                    }).then(l => {
                        if (console.log(l), !l.ok) throw new Error(`HTTP error! Status: ${l.status}`);
                        return l.json()
                    }).then(l => {
                        console.log(l), this.addEntity(l)
                    }).catch(l => {
                        console.error("Fetch error:", l)
                    })
                }
            }), (t = window.source) == null || t.addEventListener("sorting_group", e => {
                const n = e,
                    s = JSON.parse(n.data);
                if (this.groups.findIndex(r => r.name === s.name) === -1) {
                    let r = {...s
                    };
                    this.groups.push(r), this.groups.sort((a, c) => a.sorting_weight < c.sorting_weight ? -1 : 1)
                }
            }), this.groups = G.ENTITY_CATEGORIES.map((e, n) => ({
                name: e,
                sorting_weight: n
            })), this.groups.push({
                name: G.ENTITY_UNDEFINED,
                sorting_weight: -1
            })
        }
        addEntity(i) {
            var e;
            if (this.entities.findIndex(n => n.unique_id === i.id) === -1 && i.id) {
                let n = i.id.split("-"),
                    s = {...i,
                        domain: n[0],
                        unique_id: i.id,
                        id: n.slice(1).join("-"),
                        entity_category: i.entity_category,
                        sorting_group: (e = i.sorting_group) != null ? e : G.ENTITY_CATEGORIES[parseInt(i.entity_category)] || G.ENTITY_UNDEFINED,
                        value_numeric_history: [i.value]
                    };
                s.has_action = this.hasAction(s), s.has_action && (this.has_controls = !0), this.entities.push(s), this.entities.sort((o, r) => {
                    var l, h;
                    const a = (l = o.sorting_weight) != null ? l : o.name,
                        c = (h = r.sorting_weight) != null ? h : r.name;
                    return o.sorting_group < r.sorting_group ? -1 : o.sorting_group === r.sorting_group ? a === c ? o.name.toLowerCase() < r.name.toLowerCase() ? -1 : 1 : a < c ? -1 : 1 : 1
                }), this.requestUpdate()
            }
        }
        hasAction(i) {
            return `render_${i.domain}` in this._actionRenderer
        }
        control(i) {
            return this._actionRenderer.entity = i, this._actionRenderer.actioner = this, this._actionRenderer.exec(`render_${i.domain}`)
        }
        restAction(i, t) {
            fetch(`${this._basePath}/${i.domain}/${i.id}/${t}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(e => {
                console.log(e)
            })
        }
        renderShowAll() {
            if (!this.show_all && this.entities.find(i => i.is_disabled_by_default)) return C `<div class="singlebutton-row"><button class="abutton" @click="${i=>this.show_all=!0}">Show All</button></div>`
        }
        render() {
                const i = (s, o) => {
                        const r = s.reduce(function(c, l) {
                                return (c.get(l[o]) || (() => {
                                    let h = [];
                                    return c.set(l[o], h), h
                                })()).push(l), c
                            }, new Map),
                            a = new Map;
                        for (const c of this.groups) {
                            const l = c.name;
                            r.has(l) && a.set(l, r.get(l) || [])
                        }
                        return a
                    },
                    t = this.show_all ? this.entities : this.entities.filter(s => !s.is_disabled_by_default),
                    e = i(t, "sorting_group"),
                    n = Array.from(e, ([s, o]) => ({
                        name: s,
                        value: o
                    }));
                return C `<div>${n.map(s=>C`<div class="tab-header" @dblclick="${this._handleTabHeaderDblClick}">${s.name||G.ENTITY_UNDEFINED}</div><div class="tab-container">${s.value.map((o,r)=>C`<div class="entity-row" .domain="${o.domain}" @click="${this._handleEntityRowClick}"><div>${o.icon?C`<iconify-icon icon="${o.icon}" height="24px"></iconify-icon>`:L}</div><div>${o.name}</div><div>${this.has_controls&&o.has_action?this.control(o):C`<div>${o.state}</div>`}</div>${o.domain==="sensor"?C`<esp-entity-chart .chartdata="${o.value_numeric_history}"></esp-entity-chart>`:L}</div>`)}</div>`)} ${this.renderShowAll()}</div>`}static get styles(){return[Oi,Wo,ga,ma,Sn]}_handleEntityRowClick(i){var t,e;((t=i==null?void 0:i.currentTarget)==null?void 0:t.domain)==="sensor"&&(i!=null&&i.ctrlKey||i.stopPropagation(),(e=i==null?void 0:i.currentTarget)==null||e.classList.toggle("expanded",i.ctrlKey?!0:void 0))}_handleTabHeaderDblClick(i){var e;const t=new CustomEvent("entity-tab-header-double-clicked",{bubbles:!0,composed:!0});(e=i.target)==null||e.dispatchEvent(t)}};G.ENTITY_UNDEFINED="States";G.ENTITY_CATEGORIES=["Sensor and Control","Configuration","Diagnostic"];Ii([mt()],G.prototype,"entities",2);Ii([mt()],G.prototype,"has_controls",2);Ii([mt()],G.prototype,"show_all",2);G=Ii([Rt("esp-entity-table")],G);class Cu{exec(t){if(!this[t]||typeof this[t]!="function"){console.log(`ActionRenderer.${t} is not callable`);return}return this[t]()}_actionButton(t,e,n,s=!1){if(!t)return;let o=n||e.toLowerCase();return C`<button class="${s?"abuttonIsState":"abutton"}" ?disabled="${s}" @click="${()=>{var r;return(r=this.actioner)==null?void 0:r.restAction(t,o)}}">${e}</button>`}_datetime(t,e,n,s,o){return C`<input type="${e}" name="${t.unique_id}" id="${t.unique_id}" .value="${o}" @change="${r=>{var c,l;const a=(c=r.target)==null?void 0:c.value;(l=this.actioner)==null||l.restAction(t,`${n}?${s}=${a.replace("T"," ")}`)}}">`}_switch(t){return C`<esp-switch color="var(--primary-color,currentColor)" .state="${t.state}" @state="${e=>{var s;let n="turn_"+e.detail.state;(s=this.actioner)==null||s.restAction(t,n.toLowerCase())}}"></esp-switch>`}_select(t,e,n,s,o){return C`<select @change="${r=>{var c,l;const a=(c=r.target)==null?void 0:c.value;(l=this.actioner)==null||l.restAction(t,`${e}?${n}=${encodeURIComponent(a)}`)}}">${s.map(r=>C`<option value="${r}" ?selected="${r==o}">${r}</option>`)}</select>`}_range(t,e,n,s,o,r,a=1){return t.mode==1?C`<div class="range"><label>${o||0}</label> <input type="${t.mode==1?"number":"range"}" name="${t.unique_id}" id="${t.unique_id}" step="${a}" min="${o||Math.min(0,s)}" max="${r||Math.max(10,s)}" .value="${s}" @change="${c=>{var h,d;const l=(h=c.target)==null?void 0:h.value;(d=this.actioner)==null||d.restAction(t,`${e}?${n}=${l}`)}}"> <label>${r||100}</label></div>`:C`<esp-range-slider name="${t.unique_id}" step="${a}" min="${o}" max="${r}" .value="${s}" @state="${c=>{var l,h;(l=c.target)==null||l.value,(h=this.actioner)==null||h.restAction(t,`${e}?${n}=${c.detail.state}`)}}"></esp-range-slider>`}_textinput(t,e,n,s,o,r,a){return C`<input type="${t.mode==1?"password":"text"}" name="${t.unique_id}" id="${t.unique_id}" minlength="${o||Math.min(0,s)}" maxlength="${r||Math.max(255,s)}" pattern="${a||""}" .value="${s}" @change="${c=>{var h,d;const l=(h=c.target)==null?void 0:h.value;(d=this.actioner)==null||d.restAction(t,`${e}?${n}=${encodeURIComponent(l)}`)}}">`}_colorpicker(t,e,n){function s(r){return Number(r).toString(16).padStart(2,"0")}function o(r){var c;const a=((c=r.match(/[0-9a-f]{2}/gi))==null?void 0:c.map(l=>parseInt(l,16)))||[0,0,0];return`r=${a[0]}&g=${a[1]}&b=${a[2]}`}return C`<div class="colorpicker"><input type="color" name="${t.unique_id}" id="${t.unique_id}" value="#${s(n==null?void 0:n.r)}${s(n==null?void 0:n.g)}${s(n==null?void 0:n.b)}" @change="${r=>{var c,l;const a=(c=r.target)==null?void 0:c.value;(l=this.actioner)==null||l.restAction(t,`${e}?${o(a)}`)}}"></div>`}render_binary_sensor(){var e;if(!this.entity)return;const t=this.entity.state==Xr;return C`<iconify-icon class="binary_sensor_${(e=this.entity.state)==null?void 0:e.toLowerCase()}" icon="mdi:checkbox-${t?"marked-circle":"blank-circle-outline"}" height="24px"></iconify-icon>`}render_date(){if(!!this.entity)return C`${this._datetime(this.entity,"date","set","value",this.entity.value)}`}render_time(){if(!!this.entity)return C`${this._datetime(this.entity,"time","set","value",this.entity.value)}`}render_datetime(){if(!!this.entity)return C`${this._datetime(this.entity,"datetime-local","set","value",this.entity.value)}`}render_switch(){if(!!this.entity)return this.entity.assumed_state?C`${this._actionButton(this.entity,"\u274C","turn_off")} ${this._actionButton(this.entity,"\u2714\uFE0F","turn_on")}`:this._switch(this.entity)}render_fan(){if(!!this.entity)return[this.entity.speed," ",this.entity.speed_level,this._switch(this.entity),this.entity.speed_count?this._range(this.entity,`turn_${this.entity.state.toLowerCase()}`,"speed_level",this.entity.speed_level?this.entity.speed_level:0,0,this.entity.speed_count,1):""]}render_light(){var t,e;if(!!this.entity)return[C`<div class="entity" style="width:100%">${this._switch(this.entity)} ${this.entity.brightness?this._range(this.entity,"turn_on","brightness",this.entity.brightness,0,255,1):""} ${this.entity.color_mode==="rgb"||this.entity.color_mode==="rgbw"?this._colorpicker(this.entity,"turn_on",(t=this.entity)==null?void 0:t.color):""} ${(e=this.entity.effects)!=null&&e.filter(n=>n!="None").length?this._select(this.entity,"turn_on","effect",this.entity.effects||[],this.entity.effect):""}</div>`]}render_lock(){if(!!this.entity)return C`${this._actionButton(this.entity,"\u{1F510}","lock",this.entity.state==="LOCKED")} ${this._actionButton(this.entity,"\u{1F513}","unlock",this.entity.state==="UNLOCKED")} ${this._actionButton(this.entity,"\u2191","open")}`}render_cover(){if(!!this.entity)return C`${this._actionButton(this.entity,"\u2191","open",this.entity.state==="OPEN")} ${this._actionButton(this.entity,"\u2610","stop")} ${this._actionButton(this.entity,"\u2193","close",this.entity.state==="CLOSED")}`}render_button(){if(!!this.entity)return C`${this._actionButton(this.entity,"PRESS","press")}`}render_select(){if(!!this.entity)return this._select(this.entity,"set","option",this.entity.option||[],this.entity.value)}render_number(){if(!!this.entity)return C`${this._range(this.entity,"set","value",this.entity.value,this.entity.min_value,this.entity.max_value,this.entity.step)} ${this.entity.uom}`}render_text(){if(!!this.entity)return this._textinput(this.entity,"set","value",this.entity.value,this.entity.min_length,this.entity.max_length,this.entity.pattern)}render_climate(){if(!this.entity)return;let t,e=C`<div class="climate-row" style="padding-bottom:10px" ;><label>Current: ${this.entity.current_temperature} °C</label></div>`;this.entity.target_temperature_low!==void 0&&this.entity.target_temperature_high!==void 0?t=C`<div class="climate-row"><label>Target Low: </label> ${this._range(this.entity,"set","target_temperature_low",this.entity.target_temperature_low,this.entity.min_temp,this.entity.max_temp,this.entity.step)}</div><div class="climate-row"><label>Target High: </label> ${this._range(this.entity,"set","target_temperature_high",this.entity.target_temperature_high,this.entity.min_temp,this.entity.max_temp,this.entity.step)}</div>`:t=C`<div class="climate-row"><label>Target: </label> ${this._range(this.entity,"set","target_temperature",this.entity.target_temperature,this.entity.min_temp,this.entity.max_temp,this.entity.step)}</div>`;let n=C``;return(this.entity.modes?this.entity.modes.length:0)>0&&(n=C`<div class="climate-row"><label>Mode: </label> ${this._select(this.entity,"set","mode",this.entity.modes||[],this.entity.mode||"")}</div>`),C`<div class="climate-wrap">${e} ${t} ${n}</div>`}render_valve(){if(!!this.entity)return C`${this._actionButton(this.entity,"OPEN","open",this.entity.state==="OPEN")} ${this._actionButton(this.entity,"\u2610","stop")} ${this._actionButton(this.entity,"CLOSE","close",this.entity.state==="CLOSED")}`}}var Ou=Object.defineProperty,Pu=Object.getOwnPropertyDescriptor,Ti=(i,t,e,n)=>{for(var s=n>1?void 0:n?Pu(t,e):t,o=i.length-1,r;o>=0;o--)(r=i[o])&&(s=(n?r(t,e,s):r(s))||s);return n&&s&&Ou(t,e,s),s};let Ee=class extends J{constructor(){super(),this.rows=10,this.scheme="",this.logs=[]}connectedCallback(){var i;super.connectedCallback(),(i=window.source)==null||i.addEventListener("log",t=>{const n=t.data;let o=n.slice(10,n.length-4).split(":").slice(0,2).join(":"),r=n.slice(12+o.length,n.length-4);const c={type:{"\x1B[1;31m":"e","\x1B[0;33m":"w","\x1B[0;32m":"i","\x1B[0;35m":"c","\x1B[0;36m":"d","\x1B[0;37m":"v"}[n.slice(0,7)],level:n.slice(7,10),tag:o,detail:r,when:new Date().toTimeString().split(" ")[0]};this.logs.push(c),this.logs=this.logs.slice(-this.rows)})}render(){return C`<div class="tab-header" @dblclick="${this._handleTabHeaderDblClick}">Debug Log</div><div class="tab-container"><div class="logs" color-scheme="${this.scheme}"><div class="thead trow"><div>Time</div><div>Level</div><div>Tag</div><div>Message</div></div><div class="tbody">${this.logs.map(i=>C`<div class="trow ${i.type}"><div>${i.when}</div><div>${i.level}</div><div>${i.tag}</div><div>${i.detail}</div></div>`)}</div></div></div>`}_handleTabHeaderDblClick(i){var e;const t=new CustomEvent("log-tab-header-double-clicked",{bubbles:!0,composed:!0});(e=i.target)==null||e.dispatchEvent(t)}static get styles(){return[Sn,nt`.tbody .trow:nth-child(2n),.thead{background-color:rgba(127,127,127,.05)}.trow div{font-family:monospace;width:100%;line-height:1.2rem}.trow{display:flex}.thead{line-height:1rem}.thead .trow{text-align:left;padding:.25rem .5rem}.trow{display:flex}.trow>div{align-self:flex-start;padding-right:.25em;flex:2 0;min-width:70px}.trow>div:nth-child(2){flex:1 0;overflow:hidden;text-overflow:ellipsis;max-width:40px}.trow>div:nth-child(3){flex:3 0;overflow:hidden;text-overflow:ellipsis}.trow>div:last-child{flex:15 0;padding-right:0;overflow:hidden;text-overflow:ellipsis}pre{margin:0}.v{color:#888}.d{color:#0dd}.c{color:#ff00ff}.i{color:#32cd32}.w{color:#ff0}.e{color:red;font-weight:700}.logs[color-scheme=light]{font-weight:700}.logs[color-scheme=light] .w{color:#cc0}.logs[color-scheme=dark] .d{color:#0aa}.logs{overflow-x:auto;border-radius:12px;border-width:1px;border-style:solid;border-color:rgba(127,127,127,.12);transition:all .3s ease-out 0s;font-size:14px;padding:16px}@media (max-width:1024px){.trow>div:nth-child(2){display:none!important}}`]}};Ti([Y({type:Number})],Ee.prototype,"rows",2);Ti([Y({type:String})],Ee.prototype,"scheme",2);Ti([mt()],Ee.prototype,"logs",2);Ee=Ti([Rt("esp-log")],Ee);var $u=Object.defineProperty,Au=Object.getOwnPropertyDescriptor,Zt=(i,t,e,n)=>{for(var s=n>1?void 0:n?Au(t,e):t,o=i.length-1,r;o>=0;o--)(r=i[o])&&(s=(n?r(t,e,s):r(s))||s);return n&&s&&$u(t,e,s),s};const Io="checkbox-lever";let It=class extends J{constructor(){super(...arguments),this.checkbox=null,this.stateOn=Xr,this.stateOff=Do,this.state=Do,this.color="currentColor",this.disabled=!1}firstUpdated(i){var t;this.checkbox=(t=this.shadowRoot)==null?void 0:t.getElementById(Io)}isOn(){return this.state===this.stateOn}toggle(i){const t=this.isOn()?this.stateOff:this.stateOn;let e=new CustomEvent("state",{detail:{state:t,id:this.id}});this.dispatchEvent(e)}render(){return C`<div class="sw"><label><input id="${Io}" type="checkbox" .checked="${this.isOn()}" .disabled="${this.disabled}" @click="${this.toggle}"> <span style="color:${this.color}" class="lever"></span></label></div>`}static get styles(){return[Oi,nt`.sw,.sw *{-webkit-tap-highlight-color:transparent;user-select:none;cursor:pointer}input[type=checkbox]{opacity:0;width:0;height:0}input[type=checkbox]:checked+.lever{background-color:currentColor;background-image:linear-gradient(0deg,rgba(255,255,255,.5) 0,rgba(255,255,255,.5) 100%)}input[type=checkbox]:checked+.lever:after,input[type=checkbox]:checked+.lever:before{left:18px}input[type=checkbox]:checked+.lever:after{background-color:currentColor}input[type=checkbox]:not(:checked)+.lever:after{background-color:rgba(127,127,127,.5)}.lever{content:"";display:inline-block;position:relative;width:36px;height:14px;background-image:linear-gradient(0deg,rgba(127,127,127,.5) 0,rgba(127,127,127,.5) 100%);background-color:inherit;border-radius:15px;transition:background .3s ease;vertical-align:middle}.lever:after,.lever:before{content:"";position:absolute;display:inline-block;width:20px;height:20px;border-radius:50%;left:0;top:-3px;transition:left .3s ease,background .3s ease,box-shadow .1s ease,transform .1s ease}.lever:before{background-color:currentColor;background-image:linear-gradient(0deg,rgba(255,255,255,.9) 0,rgba(255,255,255,.9) 100%)}.lever:after{background-color:#f1f1f1;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}input[type=checkbox]:checked:not(:disabled).tabbed:focus~.lever::before,input[type=checkbox]:checked:not(:disabled)~.lever:active::before{transform:scale(2.4);background-color:rgba(255,255,255,.9) 0;background-image:linear-gradient(0deg,rgba(255,255,255,.9) 0,rgba(255,255,255,.9) 100%)}input[type=checkbox]:not(:disabled).tabbed:focus~.lever::before,input[type=checkbox]:not(:disabled)~.lever:active:before{transform:scale(2.4);background-color:rgba(0,0,0,.08)}input[type=checkbox][disabled]+.lever{cursor:default;background-color:rgba(0,0,0,.12)}input[type=checkbox][disabled]+.lever:after,input[type=checkbox][disabled]:checked+.lever:after{background-color:#949494}`]}};Zt([Y({type:String})],It.prototype,"stateOn",2);Zt([Y({type:String})],It.prototype,"stateOff",2);Zt([Y({type:String})],It.prototype,"state",2);Zt([Y({type:String})],It.prototype,"color",2);Zt([Y({type:Boolean})],It.prototype,"disabled",2);It=Zt([Rt("esp-switch")],It);var Eu=Object.defineProperty,Du=Object.getOwnPropertyDescriptor,Jt=(i,t,e,n)=>{for(var s=n>1?void 0:n?Du(t,e):t,o=i.length-1,r;o>=0;o--)(r=i[o])&&(s=(n?r(t,e,s):r(s))||s);return n&&s&&Eu(t,e,s),s};const To="range",Iu="rangeValue",Lo=500;let Tt=class extends J{constructor(){super(...arguments),this.inputRange=null,this.currentValue=null,this.longPressTimer=null,this.isPopupInputVisible=!1,this.value=0,this.min=0,this.max=0,this.step=0,this.name=""}firstUpdated(i){var t,e;this.inputRange=(t=this.shadowRoot)==null?void 0:t.getElementById(To),this.currentValue=(e=this.shadowRoot)==null?void 0:e.getElementById(Iu),document.addEventListener("mousedown",n=>{var o;if(!document.querySelector(".popup-number-input"))return;!((o=document.querySelector(".popup-number-input"))!=null&&o.contains(n.target))&&this.isPopupInputVisible&&this.deletePopupInput()})}updated(){this.updateCurrentValueOverlay()}onMouseDownCurrentValue(i){this.longPressTimer=setTimeout(()=>{this.showPopupInput(i.pageX,i.pageY)},Lo)}onMouseUpCurrentValue(i){this.longPressTimer&&!this.isPopupInputVisible&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}onTouchStartCurrentValue(i){this.longPressTimer=setTimeout(()=>{this.showPopupInput(i.touches[0].pageX,i.touches[0].pageY)},Lo)}onTouchEndCurrentValue(i){this.longPressTimer&&!this.isPopupInputVisible&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}deletePopupInput(){const i=document.querySelector(".popup-number-input");i&&i.remove(),this.isPopupInputVisible=!1}showPopupInput(i,t){const e=document.createElement("input");e.type="number",e.value=this.inputRange.value,e.min=this.inputRange.min,e.max=this.inputRange.max,e.step=this.inputRange.step,e.classList.add("popup-number-input");const n=`
    position: absolute;
    left: ${i}px;
    top: ${t}px;
    width: 50px;
    -webkit-appearance: none;
    margin: 0;
    `;e.setAttribute("style",n),document.body.appendChild(e),e.addEventListener("contextmenu",s=>{s.preventDefault()}),e.addEventListener("change",s=>{var a,c;let o=s.target;this.inputRange.value=o==null?void 0:o.value;var r=new Event("input");(a=this.inputRange)==null||a.dispatchEvent(r);var r=new Event("change");(c=this.inputRange)==null||c.dispatchEvent(r)}),e.addEventListener("keydown",s=>{s.key==="Enter"&&this.deletePopupInput()}),e.focus(),this.isPopupInputVisible=!0}updateCurrentValueOverlay(){var n,s;const i=Number((this.inputRange.value-this.inputRange.min)*100/(this.inputRange.max-this.inputRange.min)),t=10-i*.2;this.currentValue.innerHTML=`<span>${(n=this.inputRange)==null?void 0:n.value}</span>`,this.currentValue.style.left=`calc(${i}% + (${t}px))`;const e=(s=this.currentValue)==null?void 0:s.querySelector("span");e==null||e.addEventListener("mousedown",this.onMouseDownCurrentValue.bind(this)),e==null||e.addEventListener("mouseup",this.onMouseUpCurrentValue.bind(this)),e==null||e.addEventListener("touchstart",this.onTouchStartCurrentValue.bind(this)),e==null||e.addEventListener("touchend",this.onTouchEndCurrentValue.bind(this)),e==null||e.addEventListener("contextmenu",o=>{o.preventDefault()})}onInputEvent(i){this.updateCurrentValueOverlay()}onInputChangeEvent(i){var t;this.sendState((t=this.inputRange)==null?void 0:t.value)}sendState(i){let t=new CustomEvent("state",{detail:{state:i,id:this.id}});this.dispatchEvent(t)}render(){return C`<div class="range-wrap"><label>${this.min||0}</label><div class="slider-wrap"><div class="range-value" id="rangeValue"></div><input id="${To}" type="range" name="${this.name}" step="${this.step}" min="${this.min||Math.min(0,this.value)}" max="${this.max||Math.max(10,this.value)}" .value="${this.value}" @input="${this.onInputEvent}" @change="${this.onInputChangeEvent}"></div><label style="text-align:left">${this.max||100}</label></div>`}static get styles(){return[Oi,nt`:host{min-width:150px;flex:1}input[type=range]{background:0 0;-webkit-appearance:none;appearance:none;margin:20px 0;width:100%;touch-action:none}input[type=range]:focus{outline:0}input[type=range]::-webkit-slider-runnable-track{width:100%;height:4px;cursor:pointer;animate:.2s;background:#03a9f4;border-radius:25px}input[type=range]::-moz-range-track{width:100%;height:4px;cursor:pointer;animate:.2s;background:#03a9f4;border-radius:25px}input[type=range]::-ms-track{background:0 0;width:100%;height:4px;cursor:pointer;animate:.2s;background:0 0;border-color:transparent;color:transparent}input[type=range]::-ms-fill-lower{background:#03a9f4;border-radius:25px}input[type=range]::-ms-fill-upper{background:#03a9f4;border-radius:25px}input[type=range]::-webkit-slider-thumb{height:20px;width:20px;border-radius:50%;background:#fff;box-shadow:0 0 4px 0 #000;cursor:pointer;-webkit-appearance:none;margin-top:-8px}input[type=range]::-moz-range-thumb{height:20px;width:20px;border-radius:50%;background:#fff;box-shadow:0 0 4px 0 #000;cursor:pointer;border:none}input[type=range]::-ms-thumb{height:20px;width:20px;border-radius:50%;background:#fff;box-shadow:0 0 4px 0 #000;cursor:pointer;border:none}input[type=range]:focus::-webkit-slider-runnable-track{background:#03a9f4}input[type=range]:focus::-moz-range-track{background:#03a9f4}input[type=range]:focus::-ms-fill-lower{background:#03a9f4}input[type=range]:focus::-ms-fill-upper{background:#03a9f4}.range-wrap{display:flex;align-items:center}.slider-wrap{flex-grow:1;margin:0 15px;position:relative}.range-value{position:absolute;top:-50%}.range-value span{padding:0 3px 0 3px;height:19px;line-height:18px;text-align:center;background:#03a9f4;color:#fff;font-size:11px;display:block;position:absolute;left:50%;transform:translate(-50%,+80%);border-radius:6px}@-moz-document url-prefix(){.range-value span{transform:translate(-50%,+150%)}}.range-value span:before{content:"";position:absolute;width:0;height:0;border-top:10px solid #03a9f4;border-left:5px solid transparent;border-right:5px solid transparent;top:100%;left:50%;margin-left:-5px;margin-top:-1px;pointer-events:none}`]}};Jt([Y({type:String})],Tt.prototype,"value",2);Jt([Y({type:String})],Tt.prototype,"min",2);Jt([Y({type:String})],Tt.prototype,"max",2);Jt([Y({type:String})],Tt.prototype,"step",2);Jt([Y({type:String})],Tt.prototype,"name",2);Tt=Jt([Rt("esp-range-slider")],Tt);var Tu=`<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 124.68">
  <defs>
    <style>
      .cls-1 {
        fill: #f2f4f9;
      }

      .cls-1, .cls-2 {
        stroke-width: 0px;
      }

      .cls-2 {
        fill: #18bcf2;
      }
    </style>
  </defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <g>
      <path class="cls-2" d="M128,116.68c0,4.4-3.6,8-8,8H8c-4.4,0-8-3.6-8-8v-48c0-4.4,2.55-10.55,5.66-13.66L58.34,2.33c3.11-3.11,8.2-3.11,11.31,0l52.69,52.69c3.11,3.11,5.66,9.26,5.66,13.66v48Z"/>
      <path class="cls-1" d="M85.33,41.83h-42.67c-1.77,0-3.2,1.43-3.2,3.2v79.65h6.4V48.23h36.27v6.4h-26.67c-1.77,0-3.2,1.43-3.2,3.2v12.8c0,1.77,1.43,3.2,3.2,3.2h26.67v6.4h-26.67c-1.77,0-3.2,1.43-3.2,3.2v12.8c0,1.77,1.43,3.2,3.2,3.2h26.67v6.4h-26.67c-1.77,0-3.2,1.43-3.2,3.2s1.43,3.2,3.2,3.2h29.87c1.77,0,3.2-1.43,3.2-3.2v-12.8c0-1.77-1.43-3.2-3.2-3.2h-26.67v-6.4h26.67c1.77,0,3.2-1.43,3.2-3.2v-12.8c0-1.77-1.43-3.2-3.2-3.2h-26.67v-6.4h26.67c1.77,0,3.2-1.43,3.2-3.2v-12.8c0-1.77-1.43-3.2-3.2-3.2Z"/>
    </g>
  </g>
</svg>`,Lu=Object.defineProperty,Ru=Object.getOwnPropertyDescriptor,Fu=(i,t,e,n)=>{for(var s=n>1?void 0:n?Ru(t,e):t,o=i.length-1,r;o>=0;o--)(r=i[o])&&(s=(n?r(t,e,s):r(s))||s);return n&&s&&Lu(t,e,s),s};let Ro=class extends J{render(){return ia([Tu])}};Ro=Fu([Rt("esp-logo")],Ro);var Nu=nt`.flex-grid-half{display:grid;grid-template-columns:700px 2fr}.flex-grid-half.expanded_entity,.flex-grid-half.expanded_logs{grid-template-columns:1fr}.flex-grid-half .col{margin:8px}.flex-grid-half .col:nth-child(2){overflow:hidden}.flex-grid-half.expanded_logs .col:nth-child(1){display:none}.flex-grid-half.expanded_entity .col:nth-child(2){display:none}@media (max-width:1024px){.flex-grid,.flex-grid-half{display:block}.flex-grid-half .col{width:100%!important;margin:0 0 10px 0!important;display:block!important}}*{box-sizing:border-box}.flex-grid{margin:0 0 20px 0}h1{text-align:center;width:100%;line-height:1.1em;margin-block:.25em}header div{text-align:center;width:100%}header #logo,header iconify-icon{float:right;font-size:2.5rem;color:rgba(127,127,127,.5)}header #logo{float:left;color:rgba(127,127,127,.5)}.connected{color:rgba(0,157,16,.75)}esp-logo{float:left;line-height:1em;font-size:initial}form{display:flex;justify-content:space-between;background-color:rgba(127,127,127,.05);border-radius:12px;border-width:1px;border-style:solid;border-color:rgba(127,127,127,.12)}form .btn{margin-right:0}`,zu=Object.defineProperty,ju=Object.getOwnPropertyDescriptor,te=(i,t,e,n)=>{for(var s=n>1?void 0:n?ju(t,e):t,o=i.length-1,r;o>=0;o--)(r=i[o])&&(s=(n?r(t,e,s):r(s))||s);return n&&s&&zu(t,e,s),s};window.source=new EventSource(Hn()+"/events");function Bu(i){const t=Math.sign(i);if(i===0)return new Intl.RelativeTimeFormat("en").format(0,"second");const e=[{type:"year",seconds:12*30*24*60*60*1e3},{type:"month",seconds:30*24*60*60*1e3},{type:"week",seconds:7*24*60*60*1e3},{type:"day",seconds:24*60*60*1e3},{type:"hour",seconds:60*60*1e3},{type:"minute",seconds:60*1e3},{type:"second",seconds:1e3}];let n="";const s=new Intl.RelativeTimeFormat("en");let o=0;for(let r of e){const a=Math.trunc(Math.abs(i/r.seconds));if(a>0){const c=s.format(a*t,r.type);if(i-=a*r.seconds*t,n+=o===0&&r.type!="second"?c.replace(" ago"," "):c,o++>=1)break}}return n}let Lt=class extends J{constructor(){super(),this.scheme="",this.ping=0,this.connected=!0,this.lastUpdate=0,this.version="3.0.0",this.config={ota:!1,log:!0,title:"",comment:""},this.darkQuery=window.matchMedia("(prefers-color-scheme: dark)"),this.frames=[{},{color:"rgba(0, 196, 21, 0.75)"},{}];const i=document.querySelector("script#config");i&&this.setConfig(JSON.parse(i.innerText))}setConfig(i){"log"in i||(i.log=this.config.log),this.config=i,document.title=i.title,document.documentElement.lang=i.lang}firstUpdated(i){super.firstUpdated(i),document.getElementsByTagName("head")[0].innerHTML+='<meta name=viewport content="width=device-width, initial-scale=1,user-scalable=no">';const t=document.querySelector("link[rel~='icon']");t.href='data:image/svg+xml,<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><style>path{stroke-width:1;fill:black;stroke:black;stroke-linecap:round;stroke-linejoin:round}@media (prefers-color-scheme:dark){path{fill:white;stroke:white}}</style><path d="M1.3 18H5v10h21.8V18h3.7l-3.7-3.7V7.8h-2.4V12l-8.7-8.7L1.3 18Z"/></svg>',this.scheme=this.schemeDefault(),window.source.addEventListener("ping",e=>{var n;(n=e.data)!=null&&n.length&&(this.setConfig(JSON.parse(e.data)),this.requestUpdate()),this._updateUptime(e),this.lastUpdate=Date.now()}),window.source.addEventListener("log",e=>{this._updateUptime(e),this.lastUpdate=Date.now()}),window.source.addEventListener("state",e=>{this.lastUpdate=Date.now()}),window.source.addEventListener("error",e=>{console.dir(e),this.connected=!1,this.requestUpdate()}),setInterval(()=>{this.connected=!!this.ping&&Date.now()-this.lastUpdate<15e3},5e3),document.addEventListener("entity-tab-header-double-clicked",e=>{var s;const n=(s=this.shadowRoot)==null?void 0:s.querySelector("main.flex-grid-half");n==null||n.classList.toggle("expanded_entity")}),document.addEventListener("log-tab-header-double-clicked",e=>{var s;const n=(s=this.shadowRoot)==null?void 0:s.querySelector("main.flex-grid-half");n==null||n.classList.toggle("expanded_logs")})}schemeDefault(){return this.darkQuery.matches?"dark":"light"}updated(i){super.updated(i),i.has("scheme")&&document.documentElement.style.setProperty("color-scheme",this.scheme),i.has("ping")&&this.ping&&this.beat.animate(this.frames,1e3)}uptime(){return`${Bu(-this.ping|0)}`}renderOta(){if(this.config.ota){let i=Hn();return C`<div class="tab-header">OTA Update</div><form method="POST" action="${i}/update" enctype="multipart/form-data" class="tab-container"><input class="btn" type="file" name="update" accept="application/octet-stream"> <input class="btn" type="submit" value="Update"></form>`}}renderLog(){return this.config.log?C`<section id="col_logs" class="col"><esp-log rows="50" .scheme="${this.scheme}"></esp-log></section>`:L}renderTitle(){return C`<h1>${this.config.title||C` `}</h1><div>${[this.config.comment,`started ${this.uptime()}`].filter(i=>i).map(i=>`${i}`).join(" \xB7 ")}</div>`}render(){return C`<header><a href="https://esphome.io/web-api" id="logo" title="${this.version}"><esp-logo style="width:52px;height:40px"></esp-logo></a><iconify-icon .icon="${this.connected?"mdi:circle":"mdi:circle-off-outline"}" .title="${this.uptime()}" class="top-icon ${this.connected?"connected":""}" id="beat"></iconify-icon><a href="#" id="scheme" @click="${()=>{this.scheme=this.scheme!=="dark"?"dark":"light"}}"><iconify-icon icon="mdi:theme-light-dark" class="top-icon"></iconify-icon></a>${this.renderTitle()}</header><main class="flex-grid-half" @toggle-layout="${this._handleLayoutToggle}"><section id="col_entities" class="col"><esp-entity-table .scheme="${this.scheme}"></esp-entity-table>${this.renderOta()}</section>${this.renderLog()}</main>`}_updateUptime(i){i.lastEventId&&(this.ping=parseInt(i.lastEventId),this.connected=!0,this.requestUpdate())}static get styles(){return[Oi,Wo,Nu,Sn]}};te([mt()],Lt.prototype,"scheme",2);te([mt()],Lt.prototype,"ping",2);te([mt()],Lt.prototype,"connected",2);te([mt()],Lt.prototype,"lastUpdate",2);te([pa("#beat")],Lt.prototype,"beat",2);Lt=te([Rt("esp-app")],Lt);
