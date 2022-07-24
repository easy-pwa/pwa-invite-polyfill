"use strict";
exports.__esModule = true;
exports.translator = void 0;
var Translator = /** @class */ (function () {
    function Translator() {
        this.translations = {};
        this.lang = this.getLangName();
        this.indexTranslations();
    }
    Translator.prototype.translate = function (key) {
        var _a;
        return (_a = this.translations[this.lang][key]) !== null && _a !== void 0 ? _a : this.translations[Translator.FALLBACK_LANG][key];
    };
    Translator.prototype.indexTranslations = function () {
        var _this = this;
        var imports = require.context('../../translations/', true, /\.json$/);
        imports.keys().forEach(function (key) {
            var module = require(key);
            if (module["default"]) {
                _this.translations[key] = module["default"];
            }
        });
    };
    Translator.prototype.getLangName = function () {
        var currentLang = navigator.language.split('-')[0];
        return currentLang;
    };
    Translator.FALLBACK_LANG = 'en';
    return Translator;
}());
exports["default"] = Translator;
exports.translator = new Translator();
