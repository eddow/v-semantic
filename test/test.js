(function(FuseBox){FuseBox.$fuse$=FuseBox;
var __process_env__ = {"NODE_ENV":"development"};
FuseBox.pkg("test", {}, function(___scope___){
___scope___.file("test/index.js", function(exports, require, module, __filename, __dirname){

'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
require('semantic-ui/dist/semantic.min.css');
var Vue = require('vue/dist/vue.common.js');
var v_semantic_1 = require('~/src/index');
Vue.use(v_semantic_1.default);
var VueRouter = require('vue-router');
Vue.use(VueRouter);
var VueCodeMirror = require('vue-codemirror');
Vue.use(VueCodeMirror);
var app_vue_1 = require('./app.vue');
new Vue({
    router: new VueRouter({
        mode: 'hash',
        routes: require('./routes').routes
    }),
    el: 'app',
    components: { App: app_vue_1.default }
});
require('codemirror/mode/meta');
require('codemirror/mode/vue/vue');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/base16-dark.css');
});
___scope___.file("src/index.js", function(exports, require, module, __filename, __dirname){

'use strict';
function __export(m) {
    for (var p in m)
        if (!exports.hasOwnProperty(p))
            exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
require('./libs');
var components = require('./components');
__export(require('./components'));
var directives = require('./directives');
__export(require('./directives'));
var lib = require('~/src/lib/*');
exports.lib = lib;
require('semantic-ui/dist/semantic');
exports.default = {
    install: function (Vue, options) {
        var pfx = options && options.prefix || 'S';
        for (var i in components)
            Vue.component(pfx + i, components[i]);
        for (var i in directives)
            Vue.directive(i, directives[i]);
    },
    alertify: function (alertify) {
    }
};
});
___scope___.file("src/libs.js", function(exports, require, module, __filename, __dirname){

'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
require('vue-property-decorator');
require('vue-ripper');
require('ajv');
require('~/src/lib/classed');
require('~/src/lib/module');
require('~/src/lib/utils');
require('~/src/lib/deep');
require('~/src/lib/render');
});
___scope___.file("src/lib/classed.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = require("vue-property-decorator");
var S = require("string");
Object.defineProperty(Array.prototype, 'css', {
    value: function () {
        return this.filter(function (x) { return x; }).join(' ');
    }
});
//TODO? size, colored
function mixin(type, classes) {
    if (classes === void 0) { classes = {}; }
    classes = __assign({ inverted: Boolean }, classes);
    return {
        props: classes,
        computed: {
            cls: function () {
                var rv = ['ui'];
                if (classes)
                    for (var cls in classes)
                        if (this[cls]) {
                            if ('string' === typeof this[cls])
                                rv.push(this[cls]);
                            rv.push(S(cls).dasherize().s.replace(/\-/g, ' '));
                        }
                rv.push(type);
                return rv.css();
            }
        }
    };
}
exports.mixin = mixin;
function classed(type, classes, options) {
    if (classes === void 0) { classes = {}; }
    if (options === void 0) { options = {}; }
    options = __assign({ mixins: [] }, options);
    options.mixins.push(mixin(type, classes));
    return vue_property_decorator_1.Component(options);
}
exports.default = classed;
//# sourceMappingURL=classed.js.map
});
___scope___.file("src/lib/module.js", function(exports, require, module, __filename, __dirname){

'use strict';
var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, '__esModule', { value: true });
var vue_property_decorator_1 = require('vue-property-decorator');
var classed = require('./classed');
var shims_1 = require('~/src/lib/shims');
function onEvent(evt) {
    return 'on' + evt[0].toUpperCase() + evt.substr(1);
}
function mixin(type, classes, inits, events) {
    if (classes === void 0) {
        classes = {};
    }
    if (inits === void 0) {
        inits = {};
    }
    if (events === void 0) {
        events = [];
    }
    function forwarder(scope, evt) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return scope.$cancelable.apply(scope, [evt].concat(args));
        };
    }
    function watcher(prop) {
        return function (value) {
            this.semantic('setting', prop, value);
        };
    }
    var rv = classed.mixin(type, classes);
    for (var i in inits)
        if ('function' === typeof inits[i] || inits[i] instanceof Array)
            inits[i] = {
                type: inits[i],
                default: null
            };
    rv.props = __assign({}, rv.props, inits);
    if (!rv.watch)
        rv.watch = {};
    for (var i in inits)
        rv.watch[i] = watcher(i);
    rv.methods = {
        semantic: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return (_a = shims_1.$(this.$el))[type].apply(_a, args);
            var _a;
        },
        configure: function (config) {
        },
        init: function () {
            var config = {};
            for (var props in inits)
                if (null !== this[props])
                    config[props] = this[props];
            for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                var event = events_1[_i];
                config[onEvent(event)] = forwarder(this, event);
            }
            this.configure(config);
            this.semantic(config);
        }
    };
    rv.mounted = function () {
        this.init();
    };
    return rv;
}
exports.mixin = mixin;
function default_1(type, classes, inits, events, options) {
    if (classes === void 0) {
        classes = {};
    }
    if (inits === void 0) {
        inits = {};
    }
    if (events === void 0) {
        events = [];
    }
    if (options === void 0) {
        options = {};
    }
    options = __assign({ mixins: [] }, options);
    options.mixins.push(mixin(type, classes, inits, events));
    return vue_property_decorator_1.Component(options);
}
exports.default = default_1;
});
___scope___.file("src/lib/shims.js", function(exports, require, module, __filename, __dirname){

var $;
if('undefined'!== typeof jQuery) $ = jQuery;
else {
	var jq = require('jquery');
	if('undefined'!== typeof jQuery) $ = jQuery;
	else {
		$ = jq.default || jq;
	}
}
exports.$ = $;

});
___scope___.file("src/lib/utils.js", function(exports, require, module, __filename, __dirname){

'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var S = require('string');
var Vue = require('vue/dist/vue.common.js');
var base37 = 'abcdefghijklmnopqrstuvwxyz0123456789_';
function nextLEB37(s) {
    var rv = '', tval = 0;
    while (0 === tval && '' !== s) {
        rv += base37[tval = (1 + base37.indexOf(s[0])) % 37];
        s = s.substr(1);
    }
    if (0 === tval)
        return rv + base37[0];
    return rv + s;
}
function idSpace(pfx) {
    if (pfx === void 0) {
        pfx = '_';
    }
    var cpt = '';
    return function (post) {
        if (post === void 0) {
            post = '';
        }
        return pfx + (cpt = nextLEB37(cpt)) + post;
    };
}
exports.idSpace = idSpace;
var CancelError = new Error('Canceled event');
__assign(Vue.prototype, {
    $cancelEvent: function () {
        throw CancelError;
    },
    $cancelable: function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        try {
            this.$emit.apply(this, [S(event).dasherize().s].concat(args));
            return true;
        } catch (x) {
            if (CancelError !== x)
                throw x;
            return false;
        }
    }
});
});
___scope___.file("src/lib/deep.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function path(name) {
    if (!name)
        return;
    var keys = [];
    for (var _i = 0, _a = name.split('.'); _i < _a.length; _i++) {
        var key = _a[_i];
        var subs = /^(.*?)(\[.*\])?$/.exec(key);
        keys.push(subs[1]);
        if (subs[2])
            keys.push.apply(keys, subs[2].split(']['));
    }
    return keys.join('.');
}
exports.path = path;
function recur(obj, path) {
    if (!obj || !path)
        return;
    var keys = path.split('.'), lvalue;
    lvalue = keys.pop();
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (!(obj = obj[key]))
            return;
    }
    return { obj: obj, key: lvalue };
}
function set(obj, path, value) {
    var lv = recur(obj, path);
    if (!lv)
        return false;
    if (undefined === value)
        delete lv.obj[lv.key];
    else
        lv.obj[lv.key] = value;
    return true;
}
exports.set = set;
function get(obj, path) {
    var lv = recur(obj, path);
    return lv && lv.obj[lv.key];
}
exports.get = get;
// https://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects/16788517#16788517
function equals(x, y) {
    if (x === null || x === undefined || y === null || y === undefined) {
        return x === y;
    }
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) {
        return false;
    }
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function) {
        return x === y;
    }
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp) {
        return x === y;
    }
    if (x === y || x.valueOf() === y.valueOf()) {
        return true;
    }
    if (Array.isArray(x) && x.length !== y.length) {
        return false;
    }
    // if they are dates, they must had equal valueOf
    if (x instanceof Date) {
        return false;
    }
    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object)) {
        return false;
    }
    if (!(y instanceof Object)) {
        return false;
    }
    // recursive object equality check
    var p = Object.keys(x);
    return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
        p.every(function (i) { return equals(x[i], y[i]); });
}
exports.equals = equals;
//# sourceMappingURL=deep.js.map
});
___scope___.file("src/lib/render.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rendered = {
    props: { render: { required: true } },
    render: function (h) { return this.render(h); }
};
// Call the original render with the arguments you wish or not - return `undefined` and the original renderer will be invoked
function renderWrap(wrap) {
    return {
        created: function () {
            var originalRender, newRender = 'string' !== typeof wrap ? wrap : this[wrap], that = this;
            originalRender = this._render;
            this._render = function (h) {
                return newRender.call(that, h, function () {
                    return originalRender.apply(that, arguments);
                }) || originalRender.call(that, h);
            };
        }
    };
}
exports.renderWrap = renderWrap;
// Call the original update with no arguments - just do!
function updateWrap(wrap) {
    return {
        created: function () {
            var originalUpdate, newUpdate = 'string' !== typeof wrap ? wrap : this[wrap], that = this;
            originalUpdate = this._update;
            this._update = function (rendered, hydrating) {
                return newUpdate.call(that, function (specRendered) {
                    originalUpdate.call(that, specRendered || rendered, hydrating);
                }, rendered);
            };
        }
    };
}
exports.updateWrap = updateWrap;
//# sourceMappingURL=render.js.map
});
___scope___.file("src/components.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flag_vue_1 = require("./components/flag.vue");
exports.Flag = flag_vue_1.default;
var button_vue_1 = require("./components/button.vue");
exports.Button = button_vue_1.default;
var icon_vue_1 = require("./components/icon.vue");
exports.Icon = icon_vue_1.default;
var input_vue_1 = require("./components/input.vue");
exports.Input = input_vue_1.default;
var modal_vue_1 = require("./components/modal.vue");
exports.Modal = modal_vue_1.default;
var checkbox_vue_1 = require("./components/checkbox.vue");
exports.Checkbox = checkbox_vue_1.default;
var index_vue_1 = require("./components/form/index.vue");
exports.Form = index_vue_1.default;
var field_vue_1 = require("./components/form/field.vue");
exports.Field = field_vue_1.default;
var holders_1 = require("./components/data/holders");
exports.DataMold = holders_1.DataMold;
exports.FieldInput = holders_1.FieldInput;
var index_vue_2 = require("./components/select/index.vue");
exports.Select = index_vue_2.default;
var option_vue_1 = require("./components/select/option.vue");
exports.Option = option_vue_1.default;
var index_vue_3 = require("./components/table/index.vue");
exports.Table = index_vue_3.default;
var column_vue_1 = require("./components/table/column.vue");
exports.Column = column_vue_1.default;
var checkbox_column_vue_1 = require("./components/table/checkbox-column.vue");
exports.CheckboxColumn = checkbox_column_vue_1.default;
var accordion_vue_1 = require("./components/accordion.vue");
exports.Accordion = accordion_vue_1.default;
var tabs_vue_1 = require("./components/tabs.vue");
exports.Tabs = tabs_vue_1.default;
var panel_vue_1 = require("./components/panel.vue");
exports.Panel = panel_vue_1.default;
var dimmer_vue_1 = require("./components/dimmer.vue");
exports.Dimmer = dimmer_vue_1.default;
var dimmable_vue_1 = require("./components/dimmable.vue");
exports.Dimmable = dimmable_vue_1.default;
//# sourceMappingURL=components.js.map
});
___scope___.file("src/components/flag.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var Flag = function (_super) {
        __extends(Flag, _super);
        function Flag() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            vue_property_decorator_1.Prop({ required: true }),
            __metadata('design:type', String)
        ], Flag.prototype, 'Country', void 0);
        Flag = __decorate([vue_property_decorator_1.Component], Flag);
        return Flag;
    }(Vue);
    exports.default = Flag;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('i', {
        class: [
            _vm.Country,
            'flag'
        ]
    });
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/button.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var classed_1 = require('~/src/lib/classed');
    var icon_vue_1 = require('./icon.vue');
    var Button = function (_super) {
        __extends(Button, _super);
        function Button() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Button.prototype.rtled = function (pend) {
            return {
                prepend: 'left',
                append: 'right'
            }[pend];
        };
        Object.defineProperty(Button.prototype, 'dynCls', {
            get: function () {
                var _this = this;
                var slotTag = function (side) {
                        return _this.$slots[side][0] && _this.$slots[side][0].componentOptions && _this.$slots[side][0].componentOptions.Ctor;
                    }, slotDec = function (side) {
                        console.assert(!_this.$slots[side] || 1 === _this.$slots[side].length, 'Only one sided-slot allowed for buttons');
                        return _this.$slots[side] && icon_vue_1.default == slotTag(side) && _this.rtled(side) + ' labeled icon';
                    };
                return [
                    slotDec('prepend'),
                    slotDec('append'),
                    this.icon ? this.$slots.default ? 'labeled icon' : 'icon' : !this.$slots.prepend && !this.$slots.append && this.$slots.default && 1 === this.$slots.default.length && icon_vue_1.default === slotTag('default') ? 'icon' : ''
                ].css();
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.click = function () {
        };
        __decorate([
            vue_property_decorator_1.Prop({ default: '' }),
            __metadata('design:type', String)
        ], Button.prototype, 'icon', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Button.prototype, 'text', void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: 'button' }),
            __metadata('design:type', String)
        ], Button.prototype, 'nativeType', void 0);
        __decorate([
            vue_property_decorator_1.Emit(),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', []),
            __metadata('design:returntype', void 0)
        ], Button.prototype, 'click', null);
        Button = __decorate([classed_1.default('button', {
                loading: Boolean,
                disabled: Boolean,
                basic: Boolean,
                primary: Boolean,
                secondary: Boolean,
                compact: Boolean,
                toggle: Boolean,
                positive: Boolean,
                negative: Boolean,
                fluid: Boolean,
                circular: Boolean,
                floated: String,
                attached: String
            }, { components: { icon: icon_vue_1.default } })], Button);
        return Button;
    }(Vue);
    exports.default = Button;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('button', {
        class: [
            _vm.cls,
            _vm.dynCls
        ],
        attrs: { 'type': _vm.nativeType },
        on: { 'click': _vm.click }
    }, [
        _vm.icon ? _c('icon', { attrs: { 'icon': _vm.icon } }) : _vm._e(),
        _vm._v(' '),
        _vm._t('prepend'),
        _vm._t('default'),
        _vm._t('append')
    ], 2);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/icon.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var classed_1 = require('~/src/lib/classed');
    var Icon = function (_super) {
        __extends(Icon, _super);
        function Icon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Icon.prototype.click = function () {
        };
        __decorate([
            vue_property_decorator_1.Prop({ required: true }),
            __metadata('design:type', String)
        ], Icon.prototype, 'icon', void 0);
        __decorate([
            vue_property_decorator_1.Emit(),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', []),
            __metadata('design:returntype', void 0)
        ], Icon.prototype, 'click', null);
        Icon = __decorate([classed_1.default('icon', {
                loading: Boolean,
                disabled: Boolean,
                fitted: Boolean,
                link: Boolean,
                flipped: Boolean,
                rotated: Boolean,
                circular: Boolean,
                bordered: Boolean,
                corner: String
            })], Icon);
        return Icon;
    }(Vue);
    exports.default = Icon;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('i', {
        class: [
            _vm.icon,
            _vm.cls
        ],
        on: { 'click': _vm.click }
    });
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/input.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var classed_1 = require('~/src/lib/classed');
    var icon_vue_1 = require('./icon.vue');
    var button_vue_1 = require('./button.vue');
    var Input = function (_super) {
        __extends(Input, _super);
        function Input() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.model = null;
            return _this;
        }
        Input.prototype.input = function (value) {
        };
        Input.prototype.modelChanged = function (value) {
            this.input(value);
        };
        Input.prototype.valueChanged = function (value) {
            this.model = value;
        };
        Object.defineProperty(Input.prototype, 'dynCls', {
            get: function () {
                var rv = [];
                var searchType = function (slots, types) {
                    if (slots)
                        for (var _i = 0, slots_1 = slots; _i < slots_1.length; _i++) {
                            var slot = slots_1[_i];
                            if (slot.componentOptions && ~types.indexOf(slot.componentOptions.Ctor))
                                return true;
                        }
                };
                var searchLabel = function (slots) {
                    if (slots)
                        for (var _i = 0, slots_2 = slots; _i < slots_2.length; _i++) {
                            var slot = slots_2[_i];
                            if (slot.data && ~(' ' + slot.data.staticClass + ' ').indexOf(' label '))
                                return true;
                        }
                };
                if (searchType(this.$slots.prepend, [icon_vue_1.default]))
                    rv.push('left icon');
                else if (searchType(this.$slots.append, [icon_vue_1.default]))
                    rv.push('icon');
                if (searchType(this.$slots.prepend, [button_vue_1.default]))
                    rv.push('left action');
                else if (searchType(this.$slots.append, [button_vue_1.default]))
                    rv.push('action');
                if (searchLabel(this.$slots.append))
                    rv.push('right labeled');
                else if (searchLabel(this.$slots.prepend))
                    rv.push('labeled');
                return rv.css();
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            vue_property_decorator_1.Model('input'),
            __metadata('design:type', String)
        ], Input.prototype, 'value', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Input.prototype, 'placeholder', void 0);
        __decorate([
            vue_property_decorator_1.Emit(),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], Input.prototype, 'input', null);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', Boolean)
        ], Input.prototype, 'dimmPost', void 0);
        __decorate([
            vue_property_decorator_1.Watch('model'),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], Input.prototype, 'modelChanged', null);
        __decorate([
            vue_property_decorator_1.Watch('value', { immediate: true }),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], Input.prototype, 'valueChanged', null);
        Input = __decorate([classed_1.default('input', {
                loading: Boolean,
                disabled: Boolean,
                error: Boolean,
                transparent: Boolean,
                fluid: Boolean
            })], Input);
        return Input;
    }(Vue);
    exports.default = Input;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', {
        class: [
            _vm.cls,
            _vm.dynCls,
            { field: !!_vm.form }
        ]
    }, [
        _vm._t('prepend'),
        _vm._v(' '),
        _vm._t('input', [_c('input', {
                directives: [{
                        name: 'model',
                        rawName: 'v-model',
                        value: _vm.model,
                        expression: 'model'
                    }],
                ref: 'input',
                attrs: {
                    'type': 'text',
                    'name': _vm.name,
                    'placeholder': _vm.placeholder
                },
                domProps: { 'value': _vm.model },
                on: {
                    'input': function ($event) {
                        if ($event.target.composing) {
                            return;
                        }
                        _vm.model = $event.target.value;
                    }
                }
            })], { input: _vm._self }),
        _vm._v(' '),
        _vm._t('append')
    ], 2);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/modal.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var vue_property_decorator_1 = require('vue-property-decorator');
    var module_1 = require('~/src/lib/module');
    var command_1 = require('~/src/directives/command');
    var Modal = function (_super) {
        __extends(Modal, _super);
        function Modal() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.promise = null;
            return _this;
        }
        Modal.prototype.forceCallback = function (v) {
            if (this.command != v)
                this.$emit('set-callback', this.command);
        };
        Modal.prototype.configure = function (config) {
            config.onHidden = this.onHidden;
            config.onApprove = this.onApprove;
            config.onDeny = this.onDeny;
        };
        Modal.prototype.mounted = function () {
            this.forceCallback(null);
        };
        Modal.prototype.onHidden = function () {
            if (this.promise) {
                this.promise.reject();
                this.promise = null;
            }
        };
        Modal.prototype.onApprove = function () {
            this.command('ok');
        };
        Modal.prototype.onDeny = function () {
            this.command('cancel');
        };
        Modal.prototype.command = function (command, params) {
            var _this = this;
            if ('string' !== typeof command) {
                if (this.promise)
                    throw new Error('Modal invoked while being opened already');
                this.semantic('show');
                var rv = new Promise(function (accept, reject) {
                    _this.promise = {
                        accept: accept,
                        reject: reject
                    };
                });
                return 'function' === typeof command ? rv.then(command, params || function () {
                }) : rv;
            } else {
                if (!this.promise)
                    throw new Error('Modal received a command while not being invoked');
                if ('cancel' !== command)
                    this.promise.accept(params ? {
                        command: command,
                        params: params
                    } : command);
                else
                    this.promise.reject();
                this.promise = null;
                this.semantic('hide');
            }
        };
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Modal.prototype, 'header', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', Boolean)
        ], Modal.prototype, 'scrolling', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', Boolean)
        ], Modal.prototype, 'image', void 0);
        __decorate([
            vue_property_decorator_1.Model('set-callback'),
            __metadata('design:type', Function)
        ], Modal.prototype, 'callback', void 0);
        __decorate([
            vue_property_decorator_1.Watch('callback'),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], Modal.prototype, 'forceCallback', null);
        __decorate([
            vue_property_decorator_1.Emit('hidden'),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', []),
            __metadata('design:returntype', void 0)
        ], Modal.prototype, 'onHidden', null);
        Modal = __decorate([module_1.default('modal', {}, {
                inverted: Boolean,
                blurring: Boolean,
                detachable: Boolean,
                autofocus: Boolean,
                observeChanges: Boolean,
                allowMultiple: Boolean,
                keyboardShortcuts: Boolean,
                offset: Number,
                closable: Boolean,
                transition: String,
                duration: Number,
                queue: Boolean
            }, ['visible'])], Modal);
        return Modal;
    }(command_1.default.Commanded);
    exports.default = Modal;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', { class: _vm.cls }, [
        _vm.header || _vm.$slots.header ? _c('div', { staticClass: 'header' }, [_vm._t('header', [_vm._v('\n\t\t\t' + _vm._s(_vm.header) + '\n\t\t')])], 2) : _vm._e(),
        _vm._v(' '),
        _c('div', {
            class: {
                scrolling: _vm.scrolling,
                image: _vm.image,
                content: 1
            }
        }, [_vm._t('default')], 2)
    ]);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/checkbox.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var module_1 = require('~/src/lib/module');
    var Checkbox = function (_super) {
        __extends(Checkbox, _super);
        function Checkbox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Checkbox.prototype.apply = function (checked) {
            if (!this.state3)
                checked = !!checked;
            this.semantic(checked ? 'set checked' : false === checked ? 'set unchecked' : 'set indeterminate');
        };
        Checkbox.prototype.mounted = function () {
            this.apply(this.checked);
        };
        Checkbox.prototype.configure = function (config) {
            var _this = this;
            var cancelable = function (name) {
                config[name] = function () {
                    return _this.$cancelable(name);
                };
            };
            config.onChecked = function () {
                _this.$emit('input', true);
                _this.$emit('checked');
            };
            config.onUnchecked = function () {
                _this.$emit('input', false);
                _this.$emit('unchecked');
            };
            config.onIndeterminate = function () {
                _this.$emit('input', null);
                _this.$emit('indeterminate');
            };
            for (var _i = 0, _a = [
                        'beforeChecked',
                        'beforeIndeterminate',
                        'beforeDeterminate',
                        'beforeUnchecked'
                    ]; _i < _a.length; _i++) {
                var cb = _a[_i];
                cancelable(cb);
            }
        };
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Checkbox.prototype, 'label', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', Boolean)
        ], Checkbox.prototype, 'state3', void 0);
        __decorate([
            vue_property_decorator_1.Model('input'),
            __metadata('design:type', Boolean)
        ], Checkbox.prototype, 'checked', void 0);
        __decorate([
            vue_property_decorator_1.Watch('checked'),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], Checkbox.prototype, 'apply', null);
        Checkbox = __decorate([module_1.default('checkbox', {
                disabled: Boolean,
                readOnly: Boolean,
                toggle: Boolean,
                slider: Boolean
            }, {}, [
                'enable',
                'disable'
            ])], Checkbox);
        return Checkbox;
    }(Vue);
    exports.default = Checkbox;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', {
        class: [
            _vm.cls,
            { fitted: !_vm.label }
        ]
    }, [
        _c('input', {
            ref: 'input',
            attrs: {
                'name': _vm.name,
                'type': 'checkbox'
            },
            domProps: { 'checked': _vm.checked }
        }),
        _vm._v(' '),
        _c('label', { attrs: { 'for': _vm.name } }, [_vm._t('default', [_vm._v(_vm._s(_vm.label))])], 2)
    ]);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/form/index.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var vue_property_decorator_1 = require('vue-property-decorator');
    var command_1 = require('~/src/directives/command');
    var Ajv = require('ajv');
    var Form = function (_super) {
        __extends(Form, _super);
        function Form() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.molds = [];
            _this.fields = {};
            return _this;
        }
        Object.defineProperty(Form.prototype, 'displayedErrors', {
            get: function () {
                return {
                    fields: this.fieldErrors,
                    all: this.errors
                }[this.errorPanel];
            },
            enumerable: true,
            configurable: true
        });
        Form.prototype.beforeCreate = function () {
            this.ajv = new Ajv({ allErrors: true });
        };
        Form.prototype.compileSchema = function (schema) {
            if (schema)
                this.validation = this.ajv.compile(schema);
        };
        Form.prototype.validate = function (model) {
            if (!this.validation)
                return;
            var valid = this.validation(model);
            this.errors.splice(0);
            if (!valid)
                (_a = this.errors).push.apply(_a, this.validation.errors);
            (_b = this.fieldErrors).splice.apply(_b, [
                0,
                this.fieldErrors.length
            ].concat(this.errors));
            this.$emit('validated');
            var _a, _b;
        };
        Object.defineProperty(Form.prototype, 'labelStyle', {
            get: function () {
                return this.labelWidth ? { width: this.labelWidth } : {};
            },
            enumerable: true,
            configurable: true
        });
        Form.prototype.command = function (command, params) {
            this.$emit(command, params);
        };
        __decorate([
            vue_property_decorator_1.Prop({
                type: [
                    String,
                    Number
                ]
            }),
            __metadata('design:type', Object)
        ], Form.prototype, 'labelWidth', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', Object)
        ], Form.prototype, 'model', void 0);
        __decorate([
            vue_property_decorator_1.Prop({
                default: function () {
                    return {};
                }
            }),
            __metadata('design:type', Object)
        ], Form.prototype, 'schema', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', Boolean)
        ], Form.prototype, 'displayErrors', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', Boolean)
        ], Form.prototype, 'inline', void 0);
        __decorate([
            vue_property_decorator_1.Prop({
                type: String,
                default: 'fields'
            }),
            __metadata('design:type', String)
        ], Form.prototype, 'errorPanel', void 0);
        __decorate([
            vue_property_decorator_1.Watch('schema', { immediate: true }),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], Form.prototype, 'compileSchema', null);
        __decorate([
            vue_property_decorator_1.Prop({
                default: function () {
                    return [];
                }
            }),
            __metadata('design:type', Array)
        ], Form.prototype, 'errors', void 0);
        __decorate([
            vue_property_decorator_1.Prop({
                default: function () {
                    return [];
                }
            }),
            __metadata('design:type', Array)
        ], Form.prototype, 'fieldErrors', void 0);
        __decorate([
            vue_property_decorator_1.Watch('model', {
                immediate: true,
                deep: true
            }),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], Form.prototype, 'validate', null);
        Form = __decorate([vue_property_decorator_1.Component({
                provide: function () {
                    return {
                        modeled: this,
                        group: this
                    };
                }
            })], Form);
        return Form;
    }(command_1.default.Commanded);
    exports.default = Form;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('form', { staticClass: 'ui form' }, [_vm.model ? [
            _vm.header || _vm.$slots.header ? _c('div', { staticClass: 'ui attached message' }, [_vm._t('header', [_c('div', { staticClass: 'header' }, [_vm._v('\n\t\t\t\t\t' + _vm._s(_vm.header) + '\n\t\t\t\t')])])], 2) : _vm._e(),
            _vm._v(' '),
            _vm._t('default'),
            _vm._v(' '),
            _vm.displayErrors && _vm.displayedErrors.length ? _c('div', { staticClass: 'ui ui bottom attached error message' }, _vm._l(_vm.displayedErrors, function (error) {
                return _c('div', { key: error.schemaPath }, [_vm._v('\n\t\t\t\t\t' + _vm._s(error.dataPath) + ': ' + _vm._s(error.message) + '\n\t\t\t\t')]);
            })) : _vm._e()
        ] : _vm._t('empty', [_vm._v('\n\t\tNo data to show\n\t')])], 2);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/form/field.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __assign = this && this.__assign || Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var utils_1 = require('~/src/lib/utils');
    var deep = require('~/src/lib/deep');
    var render_1 = require('~/src/lib/render');
    var input_vue_1 = require('../input.vue');
    var genFieldName = utils_1.idSpace('fld');
    function patchRender(h) {
        this.$parent.importSlots();
        return h('div', { class: 'field' }, this.$slots.default);
    }
    var Field = function (_super) {
        __extends(Field, _super);
        function Field() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.errors = [];
            _this.value = null;
            _this.gendName = null;
            return _this;
        }
        Object.defineProperty(Field.prototype, 'isInline', {
            get: function () {
                return null === this.inline && this.modeled ? this.modeled.inline : this.inline;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, 'path', {
            get: function () {
                return deep.path(this.property);
            },
            enumerable: true,
            configurable: true
        });
        Field.prototype.setFieldProperty = function (property, oldv) {
            if (this.modeled) {
                this.undo(oldv);
                this.unwatch = this.$watch('modeled.model.' + property, function (value) {
                    this.value = value;
                    this.$forceUpdate();
                }, { immediate: true });
                console.assert(!this.modeled.fields[property], 'Field ' + property + ' appears once in its form');
                this.modeled.fields[property] = this;
            }
        };
        Field.prototype.undo = function (property) {
            if (this.modeled) {
                delete this.modeled.fields[property];
                if (this.unwatch)
                    this.unwatch();
            }
        };
        Field.prototype.validated = function () {
            var errors = this.modeled.fieldErrors;
            this.errors.splice(0);
            for (var i = 0; i < errors.length;)
                if (errors[i].dataPath === '.' + this.path)
                    (_a = this.errors).push.apply(_a, errors.splice(i, 1));
                else
                    ++i;
            if (!this.errors.length)
                this.$emit('validated', this.value);
            var _a;
        };
        Field.prototype.destroyed = function () {
            this.undo(this.property);
        };
        Field.prototype.change = function (value) {
            deep.set(this.modeled && this.modeled.model, this.path, value);
        };
        Field.prototype.initSlot = function (name) {
            if (this.originalSlots[name])
                return;
            for (var _i = 0, _a = this.modeled.molds; _i < _a.length; _i++) {
                var mold = _a[_i];
                var slot = mold.$scopedSlots[name];
                if (slot && (!mold.select || 'function' === typeof mold.select && mold.select(this) || mold.select === this.type)) {
                    return this.$slots[name] = slot(this) || [];
                }
            }
        };
        Field.prototype.childUpdate = function () {
            this.$forceUpdate();
        };
        Field.prototype.initSlots = function () {
            if (this.modeled) {
                if (!this.originalSlots)
                    this.originalSlots = __assign({}, this.$slots);
                this.initSlot('append');
                this.initSlot('prepend');
                this.initSlot('field');
                this.initSlot('input');
                var slots = this.$slots;
                if (!slots.field && !this.originalSlots.default && slots.input) {
                    slots.default = slots.input;
                    delete slots.input;
                } else if (slots.field && slots.default) {
                    slots.input = slots.default;
                    delete slots.default;
                }
            }
        };
        Object.defineProperty(Field.prototype, 'labelStyle', {
            get: function () {
                return this.modeled && this.modeled.labelStyle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, 'name', {
            get: function () {
                return this.property || this.gendName || (this.gendName = genFieldName());
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            vue_property_decorator_1.Inject(),
            __metadata('design:type', Object)
        ], Field.prototype, 'modeled', void 0);
        __decorate([
            vue_property_decorator_1.Inject(),
            __metadata('design:type', Object)
        ], Field.prototype, 'group', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Field.prototype, 'label', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Field.prototype, 'property', void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: null }),
            __metadata('design:type', String)
        ], Field.prototype, 'info', void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: null }),
            __metadata('design:type', Boolean)
        ], Field.prototype, 'inline', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Field.prototype, 'type', void 0);
        __decorate([
            vue_property_decorator_1.Watch('property', { immediate: true }),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [
                Object,
                Object
            ]),
            __metadata('design:returntype', void 0)
        ], Field.prototype, 'setFieldProperty', null);
        __decorate([
            vue_property_decorator_1.Watch('modeled.errors', { immediate: true }),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', []),
            __metadata('design:returntype', void 0)
        ], Field.prototype, 'validated', null);
        __decorate([
            vue_property_decorator_1.Watch('value'),
            vue_property_decorator_1.Emit(),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], Field.prototype, 'change', null);
        Field = __decorate([vue_property_decorator_1.Component({
                components: { sInput: input_vue_1.default },
                mixins: [render_1.renderWrap('initSlots')],
                provide: function () {
                    return { field: this };
                }
            })], Field);
        return Field;
    }(Vue);
    exports.default = Field;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', {
        class: [
            'field',
            {
                error: _vm.errors.length,
                inline: _vm.isInline
            }
        ]
    }, [_vm._t('field', [
            _vm._t('prepend', [_vm.label ? _c('label', {
                    staticClass: 'label',
                    style: _vm.labelStyle,
                    attrs: { 'for': _vm.name }
                }, [_vm._v('\n\t\t\t\t' + _vm._s(_vm.label) + '\n\t\t\t')]) : _vm._e()]),
            _vm._v(' '),
            _vm._t('default', [_c('input', {
                    directives: [{
                            name: 'model',
                            rawName: 'v-model',
                            value: _vm.value,
                            expression: 'value'
                        }],
                    attrs: { 'type': 'text' },
                    domProps: { 'value': _vm.value },
                    on: {
                        'input': function ($event) {
                            if ($event.target.composing) {
                                return;
                            }
                            _vm.value = $event.target.value;
                        }
                    }
                })]),
            _vm._v(' '),
            _vm._t('append', [_vm.errors.length && _vm.modeled.displayErrors && 'fields' === this.modeled.errorPanel ? _c('div', {
                    class: [
                        'ui',
                        _vm.isInline && 'left',
                        'pointing red basic error label'
                    ]
                }, _vm._l(_vm.errors, function (error) {
                    return _c('div', { key: error.schemaPath }, [_vm._v('\n\t\t\t\t\t' + _vm._s(error.message) + '\n\t\t\t\t')]);
                })) : _vm._e()])
        ])], 2);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/data/holders.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ripper_1 = require("vue-ripper");
exports.DataMold = {
    mixins: [vue_ripper_1.Ripper],
    inject: ['modeled'],
    props: {
        select: { type: [Function, String] }
    },
    mounted: function () {
        this.modeled.molds.unshift(this);
    },
    destroyed: function () {
        var lst = this.modeled.molds, ndx = lst.indexOf(this);
        if (~ndx)
            lst.splice(ndx, 1);
    }
};
exports.FieldInput = {
    inject: ['field'],
    props: { tag: { type: String, default: 'span' } },
    render: function (h) {
        return h(this.tag, this.field.$slots.input || this.$slots.default);
    }
};
//# sourceMappingURL=holders.js.map
});
___scope___.file("src/components/select/index.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __assign = this && this.__assign || Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var module_1 = require('~/src/lib/module');
    var utils_1 = require('~/src/lib/utils');
    var deep_1 = require('~/src/lib/deep');
    var genInputName = utils_1.idSpace('slct');
    var Select = function (_super) {
        __extends(Select, _super);
        function Select() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Select.prototype, 'mappedValues', {
            get: function () {
                var _this = this;
                return this.values.map(function (x) {
                    return 'string' === typeof x ? {
                        name: x,
                        text: x,
                        value: x
                    } : x;
                }).map(function (x) {
                    return __assign({}, x, { selected: x.value === _this.value });
                });
            },
            enumerable: true,
            configurable: true
        });
        Select.prototype.changeValues = function (values, oldv) {
            if (!deep_1.equals(values, oldv))
                this.semantic('change values', this.mappedValues);
        };
        Select.prototype.mounted = function () {
        };
        Select.prototype.onCommand = function (text, value, element) {
        };
        Select.prototype.configure = function (config) {
            config.selected = this.value;
            if ('command' === config.action)
                config.action = this.onCommand;
            if (this.values)
                config.values = this.mappedValues;
            else {
            }
        };
        Select.prototype.setValue = function (value) {
            this.semantic('set selected', value);
        };
        Select.prototype.hide = function () {
            this.semantic('hide');
        };
        Select.prototype.show = function () {
            this.semantic('show');
        };
        Select.prototype.visible = function () {
            return this.semantic('is visible');
        };
        Select.prototype.clear = function () {
            this.semantic('clear');
        };
        __decorate([
            vue_property_decorator_1.Model('change'),
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Select.prototype, 'value', void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: 'dropdown' }),
            __metadata('design:type', String)
        ], Select.prototype, 'icon', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Select.prototype, 'placeholder', void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: 'right' }),
            __metadata('design:type', String)
        ], Select.prototype, 'menu', void 0);
        __decorate([
            vue_property_decorator_1.Prop({
                default: '',
                type: [
                    String,
                    Boolean
                ]
            }),
            __metadata('design:type', Object)
        ], Select.prototype, 'text', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', Array)
        ], Select.prototype, 'values', void 0);
        __decorate([
            vue_property_decorator_1.Watch('values', { deep: true }),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [
                Object,
                Object
            ]),
            __metadata('design:returntype', void 0)
        ], Select.prototype, 'changeValues', null);
        __decorate([
            vue_property_decorator_1.Emit('command'),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [
                Object,
                Object,
                Object
            ]),
            __metadata('design:returntype', void 0)
        ], Select.prototype, 'onCommand', null);
        __decorate([
            vue_property_decorator_1.Watch('value'),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], Select.prototype, 'setValue', null);
        Select = __decorate([module_1.default('dropdown', {
                selection: Boolean,
                searchSelection: Boolean,
                multiple: Boolean,
                simple: Boolean,
                pointing: String,
                loading: Boolean,
                error: Boolean,
                disabled: Boolean,
                scrolling: Boolean,
                fluid: Boolean,
                compact: Boolean,
                inline: Boolean
            }, {
                on: String,
                forceSelection: Boolean,
                allowCategorySelection: Boolean,
                direction: String,
                keepOnScreen: Boolean,
                fullTextSearch: [
                    Boolean,
                    String
                ],
                showOnFocus: Boolean,
                allowTab: Boolean,
                transition: String,
                duration: Number,
                minCharacters: Number,
                match: String,
                action: String,
                preserveHTML: Boolean
            }, [
                'change',
                'add',
                'remove',
                'noResult',
                'show',
                'hide'
            ])], Select);
        return Select;
    }(Vue);
    exports.default = Select;
};
require('fuse-box-css')('src/components/select/index.vue', '\r\n.ui.dropdown.iconOnly > .dropdown.icon {\r\n  margin: 0;\r\n}\r\n');
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', {
        class: [
            _vm.cls,
            { iconOnly: false === this.text }
        ],
        attrs: { 'multiple': _vm.multiple }
    }, [
        _c('input', {
            ref: 'input',
            attrs: {
                'type': 'hidden',
                'name': _vm.name
            },
            domProps: { 'value': _vm.value },
            on: {
                'input': function ($event) {
                    return _vm.change($event.target.value);
                }
            }
        }),
        _vm._v(' '),
        _vm._t('bar', [
            _vm.placeholder ? _c('div', { staticClass: 'default text' }, [_vm._v(_vm._s(_vm.placeholder))]) : _vm._e(),
            _vm._v(' '),
            !_vm.placeholder && false !== _vm.text ? _c('span', { staticClass: 'text' }, [_vm._v(_vm._s(_vm.text))]) : _vm._e(),
            _vm._v(' '),
            _vm.icon ? _c('i', {
                class: [
                    _vm.icon,
                    'icon'
                ]
            }) : _vm._e()
        ]),
        _vm._v(' '),
        !_vm.values ? _c('div', {
            class: [
                'left' === _vm.menu && 'left',
                'menu'
            ]
        }, [_vm._t('default')], 2) : _vm._e()
    ], 2);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/select/option.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var Option = function (_super) {
        __extends(Option, _super);
        function Option() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Option.prototype, 'value', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Option.prototype, 'text', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Option.prototype, 'description', void 0);
        Option = __decorate([vue_property_decorator_1.Component], Option);
        return Option;
    }(Vue);
    exports.default = Option;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', {
        staticClass: 'item',
        attrs: {
            'data-value': _vm.value,
            'data-text': _vm.text
        }
    }, [_vm.description ? [
            _c('span', { staticClass: 'description' }, [_vm._v(_vm._s(_vm.description))]),
            _vm._v(' '),
            _c('span', { staticClass: 'text' }, [_vm._t('default', [_vm._v(_vm._s(_vm.text))])], 2)
        ] : _vm._t('default', [_vm._v(_vm._s(_vm.text || _vm.value))])], 2);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/table/index.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var classed_1 = require('~/src/lib/classed');
    var utils_1 = require('~/src/lib/utils');
    var vue_ripper_1 = require('vue-ripper');
    var generateRowId = utils_1.idSpace('rw');
    var Table = function (_super) {
        __extends(Table, _super);
        function Table() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.table = _this;
            _this.columns = null;
            return _this;
        }
        Table.prototype.rowId = function (row) {
            if (this.idProperty) {
                console.assert(row[this.idProperty], 'Rows have initialised IDs when `idProperty` is given');
                return row[this.idProperty];
            }
            if (!row.__table_row_id)
                Object.defineProperty(row, '__table_row_id', { value: generateRowId() });
            return row.__table_row_id;
        };
        Table.prototype.rowClick = function (row) {
        };
        Table.prototype.rowsUpdate = function (rows) {
            if (!~rows.indexOf(this.current))
                this.$emit('row-click', null);
        };
        __decorate([
            vue_property_decorator_1.Model('row-click'),
            vue_property_decorator_1.Prop(),
            __metadata('design:type', Object)
        ], Table.prototype, 'current', void 0);
        __decorate([
            vue_property_decorator_1.Provide(),
            __metadata('design:type', Object)
        ], Table.prototype, 'table', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', Array)
        ], Table.prototype, 'rows', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Table.prototype, 'idProperty', void 0);
        __decorate([
            vue_property_decorator_1.Prop({
                default: function () {
                    return '';
                }
            }),
            __metadata('design:type', Function)
        ], Table.prototype, 'rowClass', void 0);
        __decorate([
            vue_property_decorator_1.Prop({
                type: [
                    Number,
                    String
                ]
            }),
            __metadata('design:type', Object)
        ], Table.prototype, 'bodyHeight', void 0);
        __decorate([
            vue_property_decorator_1.Emit('row-click'),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], Table.prototype, 'rowClick', null);
        __decorate([
            vue_property_decorator_1.Watch('rows', { deep: true }),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], Table.prototype, 'rowsUpdate', null);
        Table = __decorate([classed_1.default('table', {
                celled: Boolean,
                padded: Boolean,
                striped: Boolean,
                definition: Boolean,
                structured: Boolean,
                basic: Boolean,
                veryBasic: Boolean,
                collapsing: Boolean,
                singleLine: Boolean,
                fixed: Boolean,
                stackable: Boolean,
                unstackable: Boolean,
                selectable: Boolean,
                sortable: Boolean,
                compact: Boolean
            }, {
                components: {
                    Pimp: vue_ripper_1.Pimp,
                    Ripped: vue_ripper_1.Ripped
                }
            })], Table);
        return Table;
    }(Vue);
    exports.default = Table;
    Table.managedColumn = {
        props: {
            width: {
                type: [
                    Number,
                    String
                ]
            },
            flex: {
                type: [
                    Number,
                    String
                ]
            }
        }
    };
};
require('fuse-box-css')('src/components/table/index.vue', '\r\ntable.scroll-body tbody {\r\n\tdisplay: block;\r\n\toverflow-y: scroll;\r\n}\r\ntable.scroll-body thead, table.scroll-body tbody.vued tr.vued {\r\n\tdisplay: table;\r\n\twidth: 100%;\r\n\ttable-layout: fixed;\r\n}\r\ntable.scroll-body > thead.vued {\r\n\twidth: calc( 100% - 0.71em )\t/*TODO: real width management engine*/\r\n}\r\n\r\ntable.ui.table.vued > tbody.vued > tr.vued {\r\n\tborder: 1px solid transparent;\r\n}\r\ntable.ui.table.vued tbody.vued tr.vued.current {\r\n\tborder-color: #111;\r\n\t/*background-color: #E0E0E0;/*\r\nTODO: use theming\r\n@activeColor: @textColor;\r\n@activeBackgroundColor: #E0E0E0;*/\r\n}\r\n');
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('table', {
        class: [
            _vm.cls,
            'vued',
            { 'scroll-body': !!_vm.bodyHeight }
        ]
    }, [
        _c('pimp', {
            attrs: { 'tag': 'caption' },
            model: {
                value: _vm.columns,
                callback: function ($$v) {
                    _vm.columns = $$v;
                },
                expression: 'columns'
            }
        }, [_vm._t('default')], 2),
        _vm._v(' '),
        _vm.$slots.header ? _c('caption', [_vm._t('header')], 2) : _vm._e(),
        _vm._v(' '),
        _c('thead', { staticClass: 'vued' }, [_c('tr', { staticClass: 'vued' }, _vm._l(_vm.columns, function (column, uid) {
                return _c('ripped', {
                    key: uid,
                    staticClass: 'vued',
                    style: { width: column.width ? column.width + 'px' : undefined },
                    attrs: {
                        'tag': 'th',
                        'template': 'header',
                        'ripper': column
                    }
                });
            }))]),
        _vm._v(' '),
        _c('tbody', {
            staticClass: 'vued',
            style: { height: _vm.bodyHeight ? _vm.bodyHeight + 'px' : undefined }
        }, _vm._l(_vm.rows, function (row, index) {
            return _c('tr', {
                key: _vm.rowId(row),
                staticClass: 'vued',
                class: [
                    _vm.rowClass(row, index),
                    { current: _vm.current === row }
                ],
                on: {
                    'click': function ($event) {
                        _vm.rowClick(row);
                    }
                }
            }, _vm._l(_vm.columns, function (column, uid) {
                return _c('ripped', {
                    key: uid,
                    style: { width: column.width ? column.width + 'px' : undefined },
                    attrs: {
                        'tag': 'td',
                        'ripper': column,
                        'scope': {
                            row: row,
                            index: index
                        }
                    }
                });
            }));
        })),
        _vm._v(' '),
        _vm.$slots.footer ? _c('caption', [_vm._t('foot')], 2) : _vm._e()
    ], 1);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/table/column.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var vue_ripper_1 = require('vue-ripper');
    var deep = require('~/src/lib/deep');
    var index_vue_1 = require('./index.vue');
    var Column = function (_super) {
        __extends(Column, _super);
        function Column() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Column.prototype.input = function (row, value) {
            if (!deep.set(row, this.property, value))
                throw new Error('Unable to bind back the given value.');
        };
        Object.defineProperty(Column.prototype, 'path', {
            get: function () {
                return deep.path(this.property);
            },
            enumerable: true,
            configurable: true
        });
        Column.prototype.value = function (row) {
            return this.extract ? this.extract(row) : this.render ? this.render(deep.get(row, this.property)) : deep.get(row, this.property);
        };
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', Function)
        ], Column.prototype, 'render', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', Function)
        ], Column.prototype, 'extract', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Column.prototype, 'property', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Column.prototype, 'header', void 0);
        Column = __decorate([vue_property_decorator_1.Component({
                components: { Ripper: vue_ripper_1.Ripper },
                mixins: [index_vue_1.default.managedColumn]
            })], Column);
        return Column;
    }(Vue);
    exports.default = Column;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('ripper', {
        scopedSlots: _vm._u([{
                key: 'default',
                fn: function (scope) {
                    return [_vm._t('default', [_vm._v('\n\t\t\t' + _vm._s(_vm.value(scope.row)) + '\n\t\t')], {
                            row: scope.row,
                            index: scope.index,
                            value: _vm.value(scope.row),
                            input: function (value) {
                                return _vm.input(scope.row, value);
                            }
                        })];
                }
            }])
    }, [_c('template', { slot: 'header' }, [_vm._t('header', [_vm._v('\n\t\t\t' + _vm._s(_vm.header) + '\n\t\t')])], 2)], 2);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/table/checkbox-column.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __assign = this && this.__assign || Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var checkbox_vue_1 = require('../checkbox.vue');
    var vue_ripper_1 = require('vue-ripper');
    var index_vue_1 = require('./index.vue');
    var CheckboxColumn = function (_super) {
        __extends(CheckboxColumn, _super);
        function CheckboxColumn() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultv = null;
            _this.allSelected = false;
            return _this;
        }
        CheckboxColumn.prototype.setRow = function (row, checked) {
            var hideProp = !(this.property in row);
            Vue.set(row, this.property, checked);
            if (hideProp)
                Object.defineProperty(row, this.property, __assign({}, Object.getOwnPropertyDescriptor(row, this.property), { enumerable: false }));
        };
        CheckboxColumn.prototype.rowsChanged = function (rows) {
            var _this = this;
            this.setSelection(rows.filter(function (x) {
                if (null !== _this.defaultv && !(_this.property in x))
                    _this.setRow(x, _this.defaultv);
                return x[_this.property];
            }));
        };
        CheckboxColumn.prototype.setSelection = function (selection) {
            if (!selection || true === selection) {
                this.selectAll(this.defaultv = this.allSelected = !!selection);
            } else if (selection instanceof Array) {
                if (selection === this.table.rows) {
                    this.defaultv = true;
                    this.$emit('selection-change', [].concat(selection));
                } else if (selection !== this.selection)
                    this.$emit('selection-change', selection);
                for (var _i = 0, _a = this.table.rows; _i < _a.length; _i++) {
                    var row = _a[_i];
                    this.setRow(row, !!~selection.indexOf(row));
                }
                this.computeAll();
            } else
                throw new Error('Unexpected selection specification');
        };
        CheckboxColumn.prototype.selectAll = function (checked) {
            if ('boolean' === typeof checked) {
                for (var _i = 0, _a = this.table.rows; _i < _a.length; _i++) {
                    var row = _a[_i];
                    this.setRow(row, checked);
                }
                var selection = this.selection;
                if (!(selection instanceof Array))
                    this.$emit('selection-change', selection = []);
                selection.splice.apply(selection, [
                    0,
                    selection.length
                ].concat(checked ? this.table.rows : []));
            }
        };
        CheckboxColumn.prototype.computeAll = function () {
            this.allSelected = 0 === this.table.rows.length ? this.defaultv : 0 === this.selection.length ? false : this.table.rows.length === this.selection.length ? true : null;
        };
        CheckboxColumn.prototype.select = function (row) {
            if (this.selection)
                console.assert(!~this.selection.indexOf(row), 'A row cannot be selected twice');
            if (this.$cancelable('select', row)) {
                this.setRow(row, true);
                if (this.selection)
                    this.selection.push(row);
                this.computeAll();
            }
        };
        CheckboxColumn.prototype.unselect = function (row) {
            var index = this.selection && this.selection.indexOf(row);
            if (this.selection)
                console.assert(!!~index, 'An unselected row cannot be unselected');
            if (this.$cancelable('unselect', row)) {
                this.setRow(row, true);
                if (this.selection)
                    this.selection.splice(index, 1);
                this.computeAll();
            }
        };
        CheckboxColumn.prototype.toggle = function (row) {
            return row[this.property] ? this.unselect(row) : this.select(row);
        };
        CheckboxColumn.prototype.rowClick = function (row) {
            console.log('click!');
        };
        __decorate([
            vue_property_decorator_1.Inject(),
            __metadata('design:type', Object)
        ], CheckboxColumn.prototype, 'table', void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: 'selected' }),
            __metadata('design:type', String)
        ], CheckboxColumn.prototype, 'property', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], CheckboxColumn.prototype, 'header', void 0);
        __decorate([
            vue_property_decorator_1.Model('selection-change', {
                type: [
                    Boolean,
                    Array
                ]
            }),
            __metadata('design:type', Object)
        ], CheckboxColumn.prototype, 'selection', void 0);
        __decorate([
            vue_property_decorator_1.Watch('table.rows', { deep: true }),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], CheckboxColumn.prototype, 'rowsChanged', null);
        __decorate([
            vue_property_decorator_1.Watch('selection', { immediate: true }),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], CheckboxColumn.prototype, 'setSelection', null);
        CheckboxColumn = __decorate([vue_property_decorator_1.Component({
                components: {
                    Ripper: vue_ripper_1.Ripper,
                    checkbox: checkbox_vue_1.default
                },
                mixins: [index_vue_1.default.managedColumn]
            })], CheckboxColumn);
        return CheckboxColumn;
    }(Vue);
    exports.default = CheckboxColumn;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('ripper', {
        scopedSlots: _vm._u([{
                key: 'default',
                fn: function (scope) {
                    return [_vm._t('default', [_c('checkbox', {
                                attrs: { 'checked': scope.row[_vm.property] },
                                on: {
                                    'checked': function ($event) {
                                        _vm.select(scope.row);
                                    },
                                    'unchecked': function ($event) {
                                        _vm.unselect(scope.row);
                                    }
                                }
                            })], {
                            row: scope.row,
                            checked: scope.row[_vm.property],
                            select: _vm.select,
                            unselect: _vm.unselect,
                            toggle: _vm.toggle
                        })];
                }
            }])
    }, [_c('template', { slot: 'header' }, [_vm._t('header', [_vm.header ? [_vm._v(_vm._s(_vm.header))] : _c('checkbox', {
                    attrs: { 'state3': '' },
                    on: { 'input': _vm.selectAll },
                    model: {
                        value: _vm.allSelected,
                        callback: function ($$v) {
                            _vm.allSelected = $$v;
                        },
                        expression: 'allSelected'
                    }
                })], {
                allSelected: _vm.allSelected,
                setSelection: _vm.setSelection
            })], 2)], 2);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/accordion.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var module_1 = require('~/src/lib/module');
    var vue_ripper_1 = require('vue-ripper');
    var Accordion = function (_super) {
        __extends(Accordion, _super);
        function Accordion() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.container = _this;
            _this.panels = [];
            return _this;
        }
        __decorate([
            vue_property_decorator_1.Provide(),
            __metadata('design:type', Object)
        ], Accordion.prototype, 'container', void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: 'dropdown' }),
            __metadata('design:type', String)
        ], Accordion.prototype, 'defaultIcon', void 0);
        Accordion = __decorate([module_1.default('accordion', {
                styled: {
                    type: Boolean,
                    default: true
                }
            }, {
                exclusive: Boolean,
                on: String,
                animateChildren: Boolean,
                closeNested: Boolean,
                collapsible: Boolean,
                duration: Number
            }, [
                'opening',
                'open',
                'closing',
                'close',
                'change'
            ], {
                components: {
                    Pimp: vue_ripper_1.Pimp,
                    Ripped: vue_ripper_1.Ripped
                }
            })], Accordion);
        return Accordion;
    }(Vue);
    exports.default = Accordion;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', { class: _vm.cls }, [
        _c('pimp', {
            model: {
                value: _vm.panels,
                callback: function ($$v) {
                    _vm.panels = $$v;
                },
                expression: 'panels'
            }
        }, [_vm._t('default')], 2),
        _vm._v(' '),
        _vm._l(_vm.panels, function (panel, uid) {
            return [
                _c('ripped', {
                    key: 't' + uid,
                    staticClass: 'title',
                    attrs: {
                        'tag': 'div',
                        'template': 'title',
                        'ripper': panel
                    }
                }),
                _vm._v(' '),
                _c('ripped', {
                    key: 'c' + uid,
                    staticClass: 'content',
                    attrs: {
                        'tag': 'div',
                        'ripper': panel
                    }
                })
            ];
        })
    ], 2);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/tabs.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var classed_1 = require('~/src/lib/classed');
    var vue_ripper_1 = require('vue-ripper');
    var shims_1 = require('~/src/lib/shims');
    var Tabs = function (_super) {
        __extends(Tabs, _super);
        function Tabs() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.container = _this;
            _this.panels = [];
            return _this;
        }
        Tabs.prototype.setTab = function (name) {
        };
        Tabs.prototype.initSemantic = function () {
            var _this = this;
            setTimeout(function () {
                shims_1.$(_this.$refs.menu).find('.item').tab({ context: shims_1.$(_this.$refs.context) });
            });
        };
        Object.defineProperty(Tabs.prototype, 'tabsFirst', {
            get: function () {
                return !!~[
                    'left',
                    'top'
                ].indexOf(this.position);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tabs.prototype, 'tabClmn', {
            get: function () {
                return 'four wide column';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tabs.prototype, 'tabAttach', {
            get: function () {
                if (!this.attached)
                    return '';
                var rv = [{
                        top: 'top attached',
                        bottom: 'bottom attached',
                        left: 'left attached',
                        right: 'right attached'
                    }[this.position]];
                if (~[
                        'left',
                        'right'
                    ].indexOf(this.position))
                    rv.push('fluid vertical');
                return rv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tabs.prototype, 'pnlClmn', {
            get: function () {
                return 'twelve wide stretched column';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tabs.prototype, 'pnlAttach', {
            get: function () {
                if (!this.attached)
                    return '';
                var rv = [{
                        top: 'bottom attached',
                        bottom: 'top attached',
                        left: 'right attached',
                        right: 'left attached'
                    }[this.position]];
                return rv;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            vue_property_decorator_1.Provide(),
            __metadata('design:type', Object)
        ], Tabs.prototype, 'container', void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: '' }),
            __metadata('design:type', String)
        ], Tabs.prototype, 'defaultIcon', void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: 'top' }),
            __metadata('design:type', String)
        ], Tabs.prototype, 'position', void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: true }),
            __metadata('design:type', Boolean)
        ], Tabs.prototype, 'attached', void 0);
        __decorate([
            vue_property_decorator_1.Model('tab-change'),
            __metadata('design:type', String)
        ], Tabs.prototype, 'active', void 0);
        __decorate([
            vue_property_decorator_1.Watch('active'),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], Tabs.prototype, 'setTab', null);
        __decorate([
            vue_property_decorator_1.Watch('panels'),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', []),
            __metadata('design:returntype', void 0)
        ], Tabs.prototype, 'initSemantic', null);
        Tabs = __decorate([classed_1.default('menu', {
                type: {
                    type: String,
                    default: 'tabular'
                },
                primary: Boolean,
                secondary: Boolean
            }, {
                components: {
                    Pimp: vue_ripper_1.Pimp,
                    Ripped: vue_ripper_1.Ripped
                }
            })], Tabs);
        return Tabs;
    }(Vue);
    exports.default = Tabs;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', {
        ref: 'context',
        staticClass: 'ui grid'
    }, [
        _c('pimp', {
            model: {
                value: _vm.panels,
                callback: function ($$v) {
                    _vm.panels = $$v;
                },
                expression: 'panels'
            }
        }, [_vm._t('default')], 2),
        _vm._v(' '),
        'left' === _vm.position ? [
            _c('div', { class: _vm.tabClmn }, [_c('div', {
                    ref: 'menu',
                    class: [
                        _vm.cls,
                        _vm.tabAttach
                    ]
                }, _vm._l(_vm.panels, function (panel, uid) {
                    return _c('ripped', {
                        key: uid,
                        staticClass: 'item',
                        attrs: {
                            'tag': 'a',
                            'template': 'title',
                            'ripper': panel,
                            'data-tab': panel.name
                        }
                    });
                }))]),
            _vm._v(' '),
            _c('div', { attrs: { 'cls': _vm.pnlClmn } }, _vm._l(_vm.panels, function (panel, uid) {
                return _c('ripped', {
                    key: uid,
                    class: [
                        'ui',
                        _vm.pnlAttach,
                        'tab segment'
                    ],
                    attrs: {
                        'tag': 'div',
                        'ripper': panel,
                        'data-tab': panel.name
                    }
                });
            }))
        ] : 'right' === _vm.position ? [
            _c('div', { attrs: { 'cls': _vm.pnlClmn } }, _vm._l(_vm.panels, function (panel, uid) {
                return _c('ripped', {
                    key: uid,
                    class: [
                        'ui',
                        _vm.pnlAttach,
                        'tab segment'
                    ],
                    attrs: {
                        'tag': 'div',
                        'ripper': panel,
                        'data-tab': panel.name
                    }
                });
            })),
            _vm._v(' '),
            _c('div', { class: _vm.tabClmn }, [_c('div', {
                    ref: 'menu',
                    class: [
                        _vm.cls,
                        _vm.tabAttach
                    ]
                }, _vm._l(_vm.panels, function (panel, uid) {
                    return _c('ripped', {
                        key: uid,
                        staticClass: 'item',
                        attrs: {
                            'tag': 'a',
                            'template': 'title',
                            'ripper': panel,
                            'data-tab': panel.name
                        }
                    });
                }))])
        ] : 'bottom' === _vm.position ? [
            _vm._l(_vm.panels, function (panel, uid) {
                return _c('ripped', {
                    key: uid,
                    class: [
                        'ui',
                        _vm.pnlAttach,
                        'tab segment'
                    ],
                    attrs: {
                        'tag': 'div',
                        'ripper': panel,
                        'data-tab': panel.name
                    }
                });
            }),
            _vm._v(' '),
            _c('div', {
                ref: 'menu',
                class: [
                    _vm.cls,
                    _vm.tabAttach
                ]
            }, _vm._l(_vm.panels, function (panel, uid) {
                return _c('ripped', {
                    key: uid,
                    staticClass: 'item',
                    attrs: {
                        'tag': 'a',
                        'template': 'title',
                        'ripper': panel,
                        'data-tab': panel.name
                    }
                });
            }))
        ] : [
            _c('div', {
                ref: 'menu',
                class: [
                    _vm.cls,
                    _vm.tabAttach
                ]
            }, _vm._l(_vm.panels, function (panel, uid) {
                return _c('ripped', {
                    key: uid,
                    staticClass: 'item',
                    attrs: {
                        'tag': 'a',
                        'template': 'title',
                        'ripper': panel,
                        'data-tab': panel.name
                    }
                });
            })),
            _vm._v(' '),
            _vm._l(_vm.panels, function (panel, uid) {
                return _c('ripped', {
                    key: uid,
                    class: [
                        'ui',
                        _vm.pnlAttach,
                        'tab segment'
                    ],
                    attrs: {
                        'tag': 'div',
                        'ripper': panel,
                        'data-tab': panel.name
                    }
                });
            })
        ]
    ], 2);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/panel.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var vue_ripper_1 = require('vue-ripper');
    var utils_1 = require('~/src/lib/utils');
    var generatePanelId = utils_1.idSpace('pnl');
    var Panel = function (_super) {
        __extends(Panel, _super);
        function Panel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.gendName = null;
            return _this;
        }
        Object.defineProperty(Panel.prototype, 'usedIcon', {
            get: function () {
                return null === this.icon ? this.container.defaultIcon : this.icon;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            vue_property_decorator_1.Prop({ default: null }),
            __metadata('design:type', String)
        ], Panel.prototype, 'icon', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Panel.prototype, 'title', void 0);
        __decorate([
            vue_property_decorator_1.Prop({
                default: function () {
                    return this.gendName || (this.gendName = generatePanelId());
                }
            }),
            __metadata('design:type', String)
        ], Panel.prototype, 'name', void 0);
        __decorate([
            vue_property_decorator_1.Inject(),
            __metadata('design:type', Object)
        ], Panel.prototype, 'container', void 0);
        Panel = __decorate([vue_property_decorator_1.Component({ components: { Ripper: vue_ripper_1.Ripper } })], Panel);
        return Panel;
    }(Vue);
    exports.default = Panel;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('ripper', [
        _c('template', { slot: 'title' }, [_vm._t('title', [
                _vm.usedIcon ? _c('i', {
                    class: [
                        _vm.usedIcon,
                        'icon'
                    ]
                }) : _vm._e(),
                _vm._v('\n\t\t\t' + _vm._s(_vm.title) + '\n\t\t')
            ])], 2),
        _vm._v(' '),
        _vm._t('default')
    ], 2);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/dimmer.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var module_1 = require('~/src/lib/module');
    var Dimm = function (_super) {
        __extends(Dimm, _super);
        function Dimm() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Dimm.prototype.configure = function (config) {
            var _this = this;
            config.onShow = function () {
                _this.$emit('show');
                _this.$emit('change', true);
            };
            config.onHide = function () {
                _this.$emit('hide');
                _this.$emit('change', false);
            };
        };
        Dimm.prototype.show = function (v) {
            this.semantic(v ? 'show' : 'hide');
        };
        __decorate([
            vue_property_decorator_1.Model('change'),
            __metadata('design:type', Boolean)
        ], Dimm.prototype, 'visible', void 0);
        __decorate([
            vue_property_decorator_1.Watch('visible'),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], Dimm.prototype, 'show', null);
        Dimm = __decorate([module_1.default('dimmer', {
                variation: {
                    default: '',
                    type: String
                },
                page: Boolean
            }, {
                closable: [
                    String,
                    Boolean
                ],
                on: String,
                duration: Object,
                transition: String
            }, [], {})], Dimm);
        return Dimm;
    }(Vue);
    exports.default = Dimm;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', { class: [_vm.cls] }, [_vm._t('default')], 2);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/components/dimmable.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var dimmer_vue_1 = require('./dimmer.vue');
    var icon_vue_1 = require('./icon.vue');
    var classed_1 = require('~/src/lib/classed');
    var Dimm = function (_super) {
        __extends(Dimm, _super);
        function Dimm() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            vue_property_decorator_1.Prop({ default: '' }),
            __metadata('design:type', String)
        ], Dimm.prototype, 'variation', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', Object)
        ], Dimm.prototype, 'closable', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Dimm.prototype, 'on', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', Object)
        ], Dimm.prototype, 'duration', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Dimm.prototype, 'transition', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Dimm.prototype, 'icon', void 0);
        __decorate([
            vue_property_decorator_1.Prop(),
            __metadata('design:type', String)
        ], Dimm.prototype, 'message', void 0);
        __decorate([
            vue_property_decorator_1.Model('change'),
            __metadata('design:type', Boolean)
        ], Dimm.prototype, 'visible', void 0);
        Dimm = __decorate([classed_1.default('dimmable', { blurring: Boolean }, {
                components: {
                    Dimmer: dimmer_vue_1.default,
                    Icon: icon_vue_1.default
                }
            })], Dimm);
        return Dimm;
    }(Vue);
    exports.default = Dimm;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', { class: _vm.cls }, [
        _c('dimmer', {
            attrs: {
                'visible': _vm.visible,
                'variation': _vm.variation,
                'closable': _vm.closable,
                'on': _vm.on,
                'duration': _vm.duration,
                'transition': _vm.transition
            },
            on: {
                'show': function ($event) {
                    _vm.$emit('show');
                },
                'hide': function ($event) {
                    _vm.$emit('hide');
                },
                'change': function (v) {
                    return _vm.$emit('change', v);
                }
            }
        }, [_c('div', { staticClass: 'content' }, [_c('div', { staticClass: 'center' }, [_vm._t('dimmer', [_c('h2', { staticClass: 'ui inverted icon header' }, [
                            _vm.icon ? _c('icon', { attrs: { 'icon': _vm.icon } }) : _vm._e(),
                            _vm._v('\n\t\t\t\t\t\t' + _vm._s(_vm.message) + '\n\t\t\t\t\t')
                        ], 1)])], 2)])]),
        _vm._v(' '),
        _vm._t('default')
    ], 2);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("src/directives.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command_1 = require("./directives/command");
exports.Command = command_1.default;
var loading_1 = require("./directives/loading");
exports.Loading = loading_1.default;
var dimm_parts_1 = require("./directives/dimm-parts");
exports.DimmParts = dimm_parts_1.default;
//# sourceMappingURL=directives.js.map
});
___scope___.file("src/directives/command.js", function(exports, require, module, __filename, __dirname){

'use strict';
var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, '__esModule', { value: true });
var Vue = require('vue/dist/vue.common.js');
var Commanded = function (_super) {
    __extends(Commanded, _super);
    function Commanded() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Commanded;
}(Vue);
exports.default = {
    bind: function (el, binding, vnode, oldVnode) {
        var inst = vnode.componentInstance, originalClick = inst.click, commanded = inst.$parent;
        if (!originalClick)
            throw new Error('v-command directive applies only on component exposing events.');
        while (commanded && !(commanded instanceof Commanded))
            commanded = commanded.$parent;
        if (!commanded)
            throw new Error('v-command directive applies only inside an Commanded component.');
        inst.$on('click', vnode.commandClick = function () {
            commanded.command(binding.arg, binding.value);
        });
    },
    unbind: function (el, binding, vnode, oldVnode) {
        vnode.componentInstance.$off('click', oldVnode.commandClick);
    },
    Commanded: Commanded
};
});
___scope___.file("src/directives/loading.js", function(exports, require, module, __filename, __dirname){

'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var shims_1 = require('~/src/lib/shims');
exports.default = {
    bind: function (el, binding, vnode, oldVnode) {
        var modifiers = Object.keys(binding.modifiers).join(' '), dimmer = shims_1.$('<div class="ui ' + modifiers + ' loader">ldng</div>'), dimmable = shims_1.$(el).addClass('dimmable').data('dimmel', dimmer).dimmer('add content', dimmer).dimmer('create');
        if (binding.modifiers.blurring)
            dimmable.addClass('blurring');
    },
    update: function (el, binding, vnode, oldVnode) {
        if ('string' === typeof binding.value)
            shims_1.$(el).data('dimmel').addClass('text').text(binding.value);
        else
            shims_1.$(el).data('dimmel').removeClass('text').text('');
        shims_1.$(el).dimmer(binding.value ? 'show' : 'hide');
    }
};
});
___scope___.file("src/directives/dimm-parts.js", function(exports, require, module, __filename, __dirname){

'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var shims_1 = require('~/src/lib/shims');
function default_1(el, binding, vnode, oldVnode) {
    if (!('mouseIn' in vnode))
        vnode.mouseIn = !!oldVnode.mouseIn;
    el = shims_1.$(el);
    if (!el.data('dimmPart_' + (binding.arg || ''))) {
        el.mouseenter(function () {
            return dimm(true);
        });
        el.mouseleave(function () {
            return dimm(false);
        });
        el.data('dimmPart_' + (binding.arg || ''), true);
    }
    var selector = 'dimmed-part' + (binding.arg ? '="' + binding.arg + '"' : ''), els = el.find('*[' + selector + ']:not(.dimmable)');
    els.addClass('ui dimmable dimmed');
    els.dimmer({ variation: 'visible active ' + (binding.modifiers.inverted ? 'inverted' : '') });
    els = el.find('*[' + selector + ']');
    function dimm(show) {
        if (vnode.mouseIn !== show) {
            if (undefined !== show)
                vnode.mouseIn = show;
            els.dimmer(vnode.mouseIn ? 'hide' : 'show');
        }
    }
}
exports.default = default_1;
;
});
___scope___.file("test/app.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var routes_1 = require('./routes');
    var App = function (_super) {
        __extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.routes = routes_1.routes;
            _this.code = null;
            _this.showSource = false;
            _this.editorOptions = {
                tabSize: 2,
                mode: 'text/x-vue',
                theme: 'base16-dark',
                lineNumbers: true,
                line: true,
                foldGutter: true,
                gutters: [
                    'CodeMirror-linenumbers',
                    'CodeMirror-foldgutter'
                ],
                styleSelectedText: true,
                highlightSelectionMatches: {
                    showToken: /\w/,
                    annotateScrollbar: true
                },
                readOnly: true
            };
            return _this;
        }
        App.prototype.loadComponent = function (route) {
            this.code = route.name ? require('source/' + route.name + '.vue') : '// nothing';
        };
        App.prototype.initCM = function () {
            var _this = this;
            setTimeout(function () {
                return _this.$refs.cm.refresh();
            });
        };
        __decorate([
            vue_property_decorator_1.Watch('$route', { immediate: true }),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', [Object]),
            __metadata('design:returntype', void 0)
        ], App.prototype, 'loadComponent', null);
        __decorate([
            vue_property_decorator_1.Watch('showSource'),
            __metadata('design:type', Function),
            __metadata('design:paramtypes', []),
            __metadata('design:returntype', void 0)
        ], App.prototype, 'initCM', null);
        App = __decorate([vue_property_decorator_1.Component], App);
        return App;
    }(Vue);
    exports.default = App;
};
require('fuse-box-css')('test/app.vue', '\r\n.screen {\r\n\twidth: 100vw;\r\n\theight: 100vh;\r\n}\r\n.work {\r\n\theight: calc(100% - 80px);\r\n}\r\n.work-pane {\r\n\theight: 100%;\r\n\toverflow: auto;\r\n}\r\ndiv.CodeMirror {\r\n\theight: 100%;\r\n}\r\n');
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', { staticClass: 'screen ui grid' }, [
        _c('div', { staticClass: 'ui inverted vertical menu two wide column' }, [
            _c('div', { staticClass: 'item' }, [
                _c('label', { attrs: { 'for': 'ss' } }, [_vm._v('Show source')]),
                _vm._v(' '),
                _c('s-checkbox', {
                    attrs: {
                        'name': 'ss',
                        'toggle': ''
                    },
                    model: {
                        value: _vm.showSource,
                        callback: function ($$v) {
                            _vm.showSource = $$v;
                        },
                        expression: 'showSource'
                    }
                })
            ], 1),
            _vm._v(' '),
            _vm._l(_vm.routes, function (route, index) {
                return _c('a', {
                    key: index,
                    staticClass: 'item',
                    attrs: { 'href': '#' + route.path }
                }, [_vm._v('\n\t\t\t' + _vm._s(route.menu) + '\n\t\t')]);
            })
        ], 2),
        _vm._v(' '),
        _c('div', {
            class: [
                'work-pane demo',
                _vm.showSource ? 'seven' : 'fourteen',
                'wide column'
            ]
        }, [_c('router-view')], 1),
        _vm._v(' '),
        _c('div', {
            directives: [{
                    name: 'show',
                    rawName: 'v-show',
                    value: _vm.showSource,
                    expression: 'showSource'
                }],
            staticClass: 'work-pane code seven wide column'
        }, [_c('codemirror', {
                ref: 'cm',
                attrs: { 'options': _vm.editorOptions },
                model: {
                    value: _vm.code,
                    callback: function ($$v) {
                        _vm.code = $$v;
                    },
                    expression: 'code'
                }
            })], 1)
    ]);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("test/routes.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MenuContainer = {
    template: "<router-view></router-view>"
}; //used for route-group, menu groups
var comps = require("./routes/*.vue");
exports.routes = [];
for (var i in comps) {
    var name = /test\/routes\/(.*).vue$/.exec(i)[1];
    exports.routes.push({
        name: name, path: '/' + name,
        menu: name.substr(0, 1).toUpperCase() + name.substr(1),
        component: comps[i].default
    });
}
//# sourceMappingURL=routes.js.map
});
___scope___.file("test/routes/accordion.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var Accordion = function (_super) {
        __extends(Accordion, _super);
        function Accordion() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Accordion = __decorate([vue_property_decorator_1.Component], Accordion);
        return Accordion;
    }(Vue);
    exports.default = Accordion;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('s-accordion', [
        _c('s-panel', { attrs: { 'title': 'What is a dog?' } }, [_c('p', [_vm._v('A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.')])]),
        _vm._v(' '),
        _c('s-panel', { attrs: { 'title': 'What kinds of dogs are there?' } }, [_c('p', [_vm._v('There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.')])])
    ], 1);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("test/routes/buttons.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var Buttons = function (_super) {
        __extends(Buttons, _super);
        function Buttons() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.blurred = false;
            _this.loading = false;
            return _this;
        }
        Buttons.prototype.test = function () {
            debugger;
        };
        Buttons = __decorate([vue_property_decorator_1.Component], Buttons);
        return Buttons;
    }(Vue);
    exports.default = Buttons;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', [
        _c('div', [
            _c('s-modal', {
                attrs: {
                    'closable': '',
                    'header': ''
                },
                model: {
                    value: _vm.modal1,
                    callback: function ($$v) {
                        _vm.modal1 = $$v;
                    },
                    expression: 'modal1'
                }
            }, [
                _vm._v('\n\t\t\tBlah Blah\n\t\t\t'),
                _c('s-button', {
                    directives: [{
                            name: 'command',
                            rawName: 'v-command:cancel',
                            arg: 'cancel'
                        }]
                }, [_vm._v('Cancel')]),
                _vm._v(' '),
                _c('s-button', {
                    directives: [{
                            name: 'command',
                            rawName: 'v-command:ok',
                            arg: 'ok'
                        }]
                }, [_vm._v('Ok')])
            ], 1),
            _vm._v(' '),
            _c('s-button', {
                on: {
                    'click': function ($event) {
                        _vm.modal1(function () {
                            return _vm.loading = 'This is ok...';
                        });
                    }
                }
            }, [_vm._v('\n\t\t\tmodal\n\t\t')]),
            _vm._v(' '),
            _c('s-button', {
                on: {
                    'click': function ($event) {
                        _vm.blurred = !_vm.blurred;
                    }
                }
            }, [
                _c('s-icon', {
                    attrs: { 'icon': 'save' },
                    slot: 'prepend'
                }),
                _vm._v('\n\t\t\tblurr\n\t\t')
            ], 1),
            _vm._v(' '),
            _c('s-button', {
                attrs: { 'icon': 'plus' },
                on: {
                    'click': function ($event) {
                        _vm.loading = !_vm.loading;
                    }
                }
            }, [_vm._v('\n\t\t\tloading\n\t\t')]),
            _vm._v(' '),
            _c('s-button', {
                on: {
                    'click': function ($event) {
                        _vm.loading = !_vm.loading && 'loading!';
                    }
                }
            }, [
                _c('s-icon', {
                    attrs: { 'icon': 'minus' },
                    slot: 'append'
                }),
                _vm._v('\n\t\t\tloading text\n\t\t')
            ], 1),
            _vm._v(' '),
            _c('s-button', {
                ref: 'button',
                on: { 'click': _vm.test }
            }, [
                _c('s-icon', { attrs: { 'icon': 'add circle' } }),
                _vm._v(' '),
                _c('div', { staticClass: 'ui special popup' }, [
                    _c('div', { staticClass: 'header' }, [_vm._v('Custom Header')]),
                    _vm._v(' '),
                    _c('div', { staticClass: 'ui button' }, [_vm._v('Click Me')])
                ])
            ], 1),
            _vm._v(' '),
            _c('s-button', { attrs: { 'icon': 'add square' } })
        ], 1),
        _vm._v(' '),
        _c('div', [
            _c('s-dimmable', {
                attrs: {
                    'blurring': '',
                    'icon': 'heart',
                    'message': 'Dimmed Message!'
                },
                model: {
                    value: _vm.blurred,
                    callback: function ($$v) {
                        _vm.blurred = $$v;
                    },
                    expression: 'blurred'
                }
            }, [_c('img', {
                    staticClass: 'ui medium image',
                    attrs: { 'src': 'https://semantic-ui.com/images/wireframe/image.png' }
                })]),
            _vm._v(' '),
            _c('div', {
                directives: [{
                        name: 'loading',
                        rawName: 'v-loading.indeterminate',
                        value: _vm.loading,
                        expression: 'loading',
                        modifiers: { 'indeterminate': true }
                    }]
            }, [_c('img', {
                    staticClass: 'ui medium image',
                    attrs: { 'src': 'https://semantic-ui.com/images/wireframe/image.png' }
                })])
        ], 1)
    ]);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("test/routes/form.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var Form = function (_super) {
        __extends(Form, _super);
        function Form() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.model = {
                firstName: '',
                lastName: '',
                big: false,
                deep: { reason: '42' },
                kindness: 'Yes'
            };
            _this.schema = {
                'title': 'Person',
                'type': 'object',
                'properties': {
                    'firstName': {
                        'type': 'string',
                        'minLength': 1
                    },
                    'lastName': {
                        'description': 'Familly name',
                        'type': 'string'
                    },
                    'deep': {
                        'description': 'Deep property',
                        'type': 'object',
                        'properties': { 'reason': { 'type': 'number' } }
                    }
                },
                'required': [
                    'firstName',
                    'lastName'
                ]
            };
            return _this;
        }
        Form.prototype.getValue = function (field) {
            return field.value;
        };
        Form.prototype.reInit = function () {
            this.model = {
                firstName: '',
                lastName: '',
                big: false,
                deep: { reason: '42' },
                kindness: 'Yes'
            };
        };
        Form = __decorate([vue_property_decorator_1.Component], Form);
        return Form;
    }(Vue);
    exports.default = Form;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', { staticClass: 'ui segments' }, [
        _c('s-form', {
            staticClass: 'ui segment',
            attrs: {
                'model': _vm.model,
                'schema': _vm.schema,
                'display-errors': '',
                'label-width': '200px',
                'inline': ''
            }
        }, [
            _c('s-data-mold', {
                scopedSlots: _vm._u([
                    {
                        key: 'prepend',
                        fn: function (field) {
                            return [_c('label', {
                                    staticClass: 'ui label',
                                    style: field.labelStyle,
                                    attrs: { 'for': field.name }
                                }, [_c('h3', [_vm._v(_vm._s(field.label))])])];
                        }
                    },
                    {
                        key: 'input',
                        fn: function (field) {
                            return [_c('s-input', {
                                    attrs: { 'name': field.name },
                                    model: {
                                        value: field.value,
                                        callback: function ($$v) {
                                            field.value = $$v;
                                        },
                                        expression: 'field.value'
                                    }
                                }, [_c('s-icon', {
                                        attrs: { 'icon': field.info || '' },
                                        slot: 'prepend'
                                    })], 1)];
                        }
                    }
                ])
            }),
            _vm._v(' '),
            _c('s-data-mold', {
                attrs: { 'select': 'bool' },
                scopedSlots: _vm._u([
                    {
                        key: 'prepend',
                        fn: function (field) {
                            return [_c('label', { style: field.labelStyle })];
                        }
                    },
                    {
                        key: 'input',
                        fn: function (field) {
                            return [_c('s-checkbox', {
                                    attrs: { 'label': field.label },
                                    model: {
                                        value: field.value,
                                        callback: function ($$v) {
                                            field.value = $$v;
                                        },
                                        expression: 'field.value'
                                    }
                                })];
                        }
                    }
                ])
            }),
            _vm._v(' '),
            _c('s-field', {
                attrs: {
                    'inline': '',
                    'property': 'big',
                    'label': 'Big',
                    'type': 'bool'
                }
            }),
            _vm._v(' '),
            _c('s-field', {
                attrs: {
                    'property': 'firstName',
                    'label': 'First name',
                    'info': 'hand pointer'
                }
            }),
            _vm._v(' '),
            _c('s-field', {
                attrs: {
                    'property': 'lastName',
                    'label': 'Last name',
                    'info': 'signal'
                }
            }),
            _vm._v(' '),
            _c('s-field', {
                attrs: {
                    'property': 'deep.reason',
                    'label': 'Deep reason'
                }
            }),
            _vm._v(' '),
            _c('s-field', {
                attrs: {
                    'property': 'kindness',
                    'label': 'Kindness'
                }
            }, [_c('s-select', {
                    attrs: {
                        'values': [
                            'Too much',
                            'Yes',
                            'No'
                        ]
                    },
                    model: {
                        value: _vm.model.kindness,
                        callback: function ($$v) {
                            _vm.model.kindness = $$v;
                        },
                        expression: 'model.kindness'
                    }
                })], 1)
        ], 1),
        _vm._v(' '),
        _c('div', { staticClass: 'ui segment' }, [
            _c('h1', [_vm._v('Out of the form')]),
            _vm._v(' '),
            _c('s-checkbox', {
                staticStyle: { 'display': 'block' },
                attrs: { 'label': 'model.big' },
                model: {
                    value: _vm.model.big,
                    callback: function ($$v) {
                        _vm.model.big = $$v;
                    },
                    expression: 'model.big'
                }
            }),
            _vm._v(' '),
            _c('s-input', {
                staticStyle: { 'display': 'block' },
                model: {
                    value: _vm.model.firstName,
                    callback: function ($$v) {
                        _vm.model.firstName = $$v;
                    },
                    expression: 'model.firstName'
                }
            }),
            _vm._v('\n\t\t' + _vm._s(_vm.model) + '\n\t\t'),
            _c('s-button', {
                staticStyle: { 'display': 'block' },
                on: { 'click': _vm.reInit }
            }, [_vm._v('Re-init')])
        ], 1)
    ], 1);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("test/routes/inputs.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var Inputs = function (_super) {
        __extends(Inputs, _super);
        function Inputs() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ddn = '';
            _this.tchk = true;
            return _this;
        }
        Inputs.prototype.testme = function () {
            console.log('icon click');
        };
        Inputs = __decorate([vue_property_decorator_1.Component], Inputs);
        return Inputs;
    }(Vue);
    exports.default = Inputs;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', [
        _c('s-input', [
            _c('s-icon', {
                attrs: {
                    'circular': '',
                    'link': '',
                    'icon': 'search'
                },
                on: { 'click': _vm.testme },
                slot: 'prepend'
            }),
            _vm._v(' '),
            _c('s-select', {
                staticClass: 'label',
                attrs: {
                    'text': 'Gender',
                    'on': 'hover'
                },
                slot: 'append',
                model: {
                    value: _vm.ddn,
                    callback: function ($$v) {
                        _vm.ddn = $$v;
                    },
                    expression: 'ddn'
                }
            }, [
                _c('s-option', { attrs: { 'value': 'M' } }, [_vm._v('Male')]),
                _vm._v(' '),
                _c('s-option', { attrs: { 'value': 'F' } }, [_vm._v('Female')])
            ], 1)
        ], 1),
        _vm._v(' '),
        _c('div', [
            _c('label', [_vm._v('Drop down:')]),
            _vm._v('\n\t\t' + _vm._s(_vm.ddn) + '\n\t')
        ]),
        _vm._v(' '),
        _c('s-select', {
            staticStyle: { 'display': 'block' },
            attrs: {
                'inline': '',
                'action': 'select',
                'text': 'Gender',
                'on': 'hover'
            },
            model: {
                value: _vm.ddn,
                callback: function ($$v) {
                    _vm.ddn = $$v;
                },
                expression: 'ddn'
            }
        }, [
            _c('s-option', { attrs: { 'value': 'M' } }, [_vm._v('Male')]),
            _vm._v(' '),
            _c('s-option', { attrs: { 'value': 'F' } }, [_vm._v('Female')])
        ], 1),
        _vm._v(' '),
        _c('s-checkbox', {
            attrs: { 'label': 'Yes!' },
            model: {
                value: _vm.tchk,
                callback: function ($$v) {
                    _vm.tchk = $$v;
                },
                expression: 'tchk'
            }
        }),
        _vm._v(' '),
        _c('div', [
            _c('label', [_vm._v('Checked:')]),
            _vm._v('\n\t\t' + _vm._s(_vm.tchk) + '\n\t')
        ]),
        _vm._v(' '),
        _c('div', [_c('s-input', {
                directives: [{
                        name: 'dimm-parts',
                        rawName: 'v-dimm-parts:minus.inverted',
                        arg: 'minus',
                        modifiers: { 'inverted': true }
                    }],
                attrs: { 'inline': '' }
            }, [_c('s-button', {
                    staticClass: 'input-dimmed',
                    attrs: {
                        'icon': 'minus',
                        'dimmed-part': 'minus'
                    },
                    slot: 'append'
                })], 1)], 1)
    ], 1);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("test/routes/table.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var rows = new Array(10).fill().map(function (x, i) {
        return {
            a: i * 2,
            b: i * 2 + 1,
            deep: { reason: 42 }
        };
    });
    var Accordion = function (_super) {
        __extends(Accordion, _super);
        function Accordion() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.my_row = null;
            _this.my_rows = rows;
            _this.my_selection = [];
            return _this;
        }
        Object.defineProperty(Accordion.prototype, 'sum_b', {
            get: function () {
                return this.my_rows.reduce(function (acc, row) {
                    return acc + row.b;
                }, 0);
            },
            enumerable: true,
            configurable: true
        });
        Accordion = __decorate([vue_property_decorator_1.Component], Accordion);
        return Accordion;
    }(Vue);
    exports.default = Accordion;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', [
        _c('s-table', {
            attrs: {
                'celled': '',
                'selectable': '',
                'rows': _vm.my_rows,
                'very-basic': '',
                'body-height': 150
            },
            model: {
                value: _vm.my_row,
                callback: function ($$v) {
                    _vm.my_row = $$v;
                },
                expression: 'my_row'
            }
        }, [
            _c('div', { slot: 'header' }, [_vm._v('\n\t\t\tIn-table header\n\t\t')]),
            _vm._v(' '),
            _c('s-checkbox-column', {
                attrs: {
                    'selection': _vm.my_selection,
                    'width': '29'
                }
            }),
            _vm._v(' '),
            _c('s-column', {
                attrs: {
                    'property': 'a',
                    'width': '300',
                    'header': 'a'
                }
            }),
            _vm._v(' '),
            _c('s-column', {
                attrs: { 'header': 'A' },
                scopedSlots: _vm._u([{
                        key: 'default',
                        fn: function (scope) {
                            return [_vm._v('\n\t\t\t\ta' + _vm._s(scope.row.a) + '-b' + _vm._s(scope.row.b) + '\n\t\t\t')];
                        }
                    }])
            }),
            _vm._v(' '),
            _c('s-column', { attrs: { 'property': 'b' } }, [_c('template', { slot: 'header' }, [_vm._v('\n\t\t\t\tB sum=' + _vm._s(_vm.sum_b) + '\n\t\t\t')])], 2),
            _vm._v(' '),
            _c('s-column', {
                attrs: {
                    'property': 'deep.reason',
                    'header': 'Q?'
                }
            })
        ], 1),
        _vm._v(' '),
        _c('div', [
            _c('p'),
            _c('h3', [_vm._v('current-row')]),
            _vm._v(' ' + _vm._s(_vm.my_row)),
            _c('p'),
            _vm._v(' '),
            _c('p'),
            _c('h3', [_vm._v('selection')]),
            _vm._v(' ' + _vm._s(_vm.my_selection)),
            _c('p')
        ])
    ], 1);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
___scope___.file("test/routes/tabs.vue", function(exports, require, module, __filename, __dirname){

var _p = {};
var _v = function (exports) {
    'use strict';
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, '__esModule', { value: true });
    var Vue = require('vue/dist/vue.common.js');
    var vue_property_decorator_1 = require('vue-property-decorator');
    var Tabs = function (_super) {
        __extends(Tabs, _super);
        function Tabs() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Tabs = __decorate([vue_property_decorator_1.Component], Tabs);
        return Tabs;
    }(Vue);
    exports.default = Tabs;
};
_p.render = function render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', [
        _c('s-tabs', [
            _c('s-panel', { attrs: { 'title': 'What is a dog?' } }, [_c('p', [_vm._v('A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.')])]),
            _vm._v(' '),
            _c('s-panel', { attrs: { 'title': 'What kinds of dogs are there?' } }, [_c('p', [_vm._v('There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.')])]),
            _vm._v(' '),
            _c('s-panel', { attrs: { 'title': 'And...' } }, [_c('p', [_vm._v('There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.')])])
        ], 1),
        _vm._v(' '),
        _c('s-tabs', { attrs: { 'position': 'bottom' } }, [
            _c('s-panel', { attrs: { 'title': 'What is a dog?' } }, [_c('p', [_vm._v('A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.')])]),
            _vm._v(' '),
            _c('s-panel', { attrs: { 'title': 'What kinds of dogs are there?' } }, [_c('p', [_vm._v('There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.')])]),
            _vm._v(' '),
            _c('s-panel', { attrs: { 'title': 'And...' } }, [_c('p', [_vm._v('There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.')])])
        ], 1)
    ], 1);
};
_p.staticRenderFns = [];
var _e = {};
_v(_e);
Object.assign(_e.default.options || _e.default, _p);
module.exports = _e;
});
});
FuseBox.global("__assign", function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
});

FuseBox.global("__extends", function(d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p)) d[p] = b[p];

    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
});

FuseBox.target = "universal"

FuseBox.import("test/test/index.js");
FuseBox.main("test/test/index.js");
FuseBox.defaultPackageName = "test";
})
(FuseBox)