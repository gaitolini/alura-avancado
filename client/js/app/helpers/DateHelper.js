'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, DateHelper;

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('DateHelper', DateHelper = function () {
                function DateHelper() {
                    _classCallCheck(this, DateHelper);

                    throw new Error('Esta classe não pode ser instanciada');
                }

                // static strToDate(str) {
                //     if (!/^\d{4}-\d{2}-\d{2}$/.test(str))
                //         throw new Error('Deve estar no formato aaaa-mm-dd');
                //     return new Date(...str.split('-').map((item, i) => item - i % 2));
                // }

                _createClass(DateHelper, null, [{
                    key: 'strToDate',
                    value: function strToDate(texto) {

                        // mudamos a validação para aceitar o novo formato!
                        if (!/\d{2}\/\d{2}\/\d{4}/.test(texto)) throw new Error('Deve estar no formato dd/mm/aaaa');

                        // veja que usamos no split '/' no lugar de '-'. Usamos `reverse` também para ficar ano/mes/dia.      
                        return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(texto.split('/').reverse().map(function (item, indice) {
                            return item - indice % 2;
                        })))))();
                    }
                }, {
                    key: 'dateToStr',
                    value: function dateToStr(date) {
                        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                        // return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                    }
                }]);

                return DateHelper;
            }());

            _export('DateHelper', DateHelper);
        }
    };
});
//# sourceMappingURL=DateHelper.js.map