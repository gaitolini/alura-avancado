"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, ListaCidades;

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

            _export("ListaCidades", ListaCidades = function () {
                function ListaCidades() {
                    _classCallCheck(this, ListaCidades);

                    this._cidades = [];
                }

                _createClass(ListaCidades, [{
                    key: "adiciona",
                    value: function adiciona(cidade) {
                        this._cidades.push(cidade);
                    }
                }, {
                    key: "ordena",
                    value: function ordena(criterio) {
                        this._cidades.sort(criterio);
                    }
                }, {
                    key: "inverteOrdem",
                    value: function inverteOrdem() {
                        this._cidades.reverse();
                    }
                }, {
                    key: "limpa",
                    value: function limpa() {
                        this._cidades = [];
                    }
                }, {
                    key: "negociacoes",
                    get: function get() {
                        return [].concat(this._cidades);
                    }
                }]);

                return ListaCidades;
            }());

            _export("ListaCidades", ListaCidades);
        }
    };
});
//# sourceMappingURL=ListaCidades.js.map