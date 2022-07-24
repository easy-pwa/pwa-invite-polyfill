"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Context_1 = require("./Context/Context");
var detect_browser_1 = require("detect-browser");
exports["default"] = new (/** @class */ (function () {
    function App() {
    }
    App.prototype.start = function () {
        console.log(this.findHelper());
    };
    App.prototype.findHelper = function () {
        var browserInfo = (0, detect_browser_1.detect)();
        if (browserInfo === null || browserInfo.type !== 'browser' || browserInfo.os === null) {
            return null;
        }
        var context = new Context_1["default"](browserInfo.os, browserInfo.name, parseFloat(browserInfo.version));
        console.log(this.getRules());
        return '';
        /*const module = this.getRules().find(module => module.support(context));
        if (!module) {
          return null;
        }
    
        return module.template(translator);*/
    };
    App.prototype.getRules = function () {
        return __awaiter(this, void 0, void 0, function () {
            var imports, rules, _i, _a, key, module_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        imports = require.context('./Rule/', true, /\.ts$/);
                        rules = [];
                        _i = 0, _a = imports.keys();
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        key = _a[_i];
                        return [4 /*yield*/, Promise.resolve().then(function () { return require(key); })];
                    case 2:
                        module_1 = _b.sent();
                        if (module_1["default"]) {
                            rules.push(module_1["default"]);
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, rules];
                }
            });
        });
    };
    return App;
}()))();
