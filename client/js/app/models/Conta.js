'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Conta, ContaCorrente, ContaPoupanca;

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
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

            Conta = function () {
                function Conta(saldo) {
                    _classCallCheck(this, Conta);

                    this._saldo = saldo;
                }

                _createClass(Conta, [{
                    key: 'atualiza',
                    value: function atualiza(taxa) {
                        throw new Error('Este método deve ser implementado na classe herdada!');
                    }
                }, {
                    key: 'saldo',
                    get: function get() {
                        return this.saldo;
                    },
                    set: function set(saldo) {
                        this.saldo = saldo;
                    }
                }]);

                return Conta;
            }();

            ContaCorrente = function (_Conta) {
                _inherits(ContaCorrente, _Conta);

                function ContaCorrente() {
                    _classCallCheck(this, ContaCorrente);

                    return _possibleConstructorReturn(this, (ContaCorrente.__proto__ || Object.getPrototypeOf(ContaCorrente)).apply(this, arguments));
                }

                _createClass(ContaCorrente, [{
                    key: 'atualiza',
                    value: function atualiza(taxa) {
                        this._saldo = +taxa;
                    }
                }]);

                return ContaCorrente;
            }(Conta);

            ContaPoupanca = function () {
                function ContaPoupanca() {
                    _classCallCheck(this, ContaPoupanca);
                }

                _createClass(ContaPoupanca, [{
                    key: 'atualiza',
                    value: function atualiza(taxa) {
                        this.saldo += taxa * 2;
                    }
                }]);

                return ContaPoupanca;
            }();
        }
    };
});
//# sourceMappingURL=Conta.js.map