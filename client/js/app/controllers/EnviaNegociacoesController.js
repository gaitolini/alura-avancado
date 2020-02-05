"use strict";

System.register(["../views/MensageView", "../services/NegociacaoService", "../models/Negociacao", "../helpers/DateHelper", "../helpers/Bind"], function (_export, _context) {
    "use strict";

    var MensageView, NegociacaoService, Negociacao, DateHelper, Bind, _createClass, EnviaNegociacoesController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_viewsMensageView) {
            MensageView = _viewsMensageView.MensageView;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }],
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

            _export("EnviaNegociacoesController", EnviaNegociacoesController = function () {
                function EnviaNegociacoesController() {
                    _classCallCheck(this, EnviaNegociacoesController);

                    var $ = document.querySelector.bind(document);
                    this._inputData = $("#data");
                    this._inputQuantidade = $("#quantidade");
                    this._inputValor = $("#valor");

                    this._mensagem = new Bind(new Mensagem(), new MensageView($("#mensagemView")), 'texto');
                }

                _createClass(EnviaNegociacoesController, [{
                    key: "_limpaFormulario",
                    value: function _limpaFormulario() {
                        this._inputData.value = '';
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0.0;

                        this._inputData.focus();
                    }
                }, {
                    key: "_criaNegociacao",
                    value: function _criaNegociacao() {
                        return new Negociacao(DateHelper.strToDate(this._inputData.value), this._inputQuantidade.value, this._inputValor.value);
                    }
                }, {
                    key: "enviaNegociacao",
                    value: function enviaNegociacao(event) {
                        var _this = this;

                        event.preventDefault();
                        // let negociacao = new Negociacao(new Date(this._inputData.value), this._inputQuantidade, this._inputValor);

                        var negociacao = {
                            data: this._inputData.value,
                            quantidade: this._inputQuantidade.value,
                            valor: this._inputValor.value
                        };

                        var service = new NegociacaoService();

                        service.pushNegociacoes(negociacao).then(function (messagem) {
                            _this._mensagem.texto = messagem;
                        }).catch(function (erro) {
                            _this._mensagem.texto = erro;
                        });
                    }
                }]);

                return EnviaNegociacoesController;
            }());

            _export("EnviaNegociacoesController", EnviaNegociacoesController);
        }
    };
});
//# sourceMappingURL=EnviaNegociacoesController.js.map