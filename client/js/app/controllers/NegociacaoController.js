"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._ordemAtual = '';

        this._mensagem = new Bind(new Mensagem(), new MensageView($("#mensagemView")), 'texto');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesViews($("#negociacoesView")), 'adiciona', 'limpa', 'ordena', 'inverteOrdem');

        this._service = new NegociacaoService();
        this._init();
    }

    _createClass(NegociacaoController, [{
        key: "_init",
        value: function _init() {
            var _this = this;

            //carregando o banco de dado 
            this._service.lista().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (erro) {
                return _this._mensagem.texto = erro;
            });

            setInterval(function () {
                _this.importaNegociacoes();
            }, 8000);
        }
    }, {
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
            return new Negociacao(DateHelper.strToDate(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: "apaga",
        value: function apaga() {
            var _this2 = this;

            this._service.apaga().then(function (mensagem) {
                _this2._mensagem.texto = mensagem;
                _this2._listaNegociacoes.limpa();
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
        }
    }, {
        key: "adiciona",
        value: function adiciona(event) {
            var _this3 = this;

            event.preventDefault();

            var negociacao = this._criaNegociacao();

            this._service.cadastra(negociacao).then(function (mensagem) {
                _this3._listaNegociacoes.adiciona(negociacao);
                _this3._mensagem.texto = mensagem;
                _this3._limpaFormulario();
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }
    }, {
        key: "ordena",
        value: function ordena(coluna) {
            if (this._ordemAtual == coluna) {
                //inverte a  ordem da lista
                this._listaNegociacoes.inverteOrdem();
            } else {

                this._listaNegociacoes.ordena(function (a, b) {
                    return a[coluna] - b[coluna];
                });
            }
            this._ordemAtual = coluna;
        }
    }, {
        key: "importaNegociacoes",
        value: function importaNegociacoes() {
            var _this4 = this;

            this._service.obterNegociacoesServer(this._listaNegociacoes.negociacoes).then(function (negociacoesFiltradas) {
                negociacoesFiltradas.forEach(function (negociacao) {
                    _this4._service.cadastra(negociacao).then(function () {
                        return _this4._listaNegociacoes.adiciona(negociacao);
                    });
                    _this4._mensagem.texto = 'Negociações obtidas com sucesso do servidor';
                });
            }).catch(function (erro) {
                return _this4._mensagem.texto = erro;
            });
        }

        // let service = this._service;
        // ConnectionFactory
        //     .getConnection()
        //     .then(conexao => {
        //         Promise.all([
        //             service.pullNegociacoesDaSemana(),
        //             service.pullNegociacoesDaSemanaAnterior(),
        //             service.pullNegociacoesDaSemanaRetrasada()
        //         ])
        //             .then(todasNegociacoes =>
        //                 todasNegociacoes
        //                     .reduce((arrayNegociacao, array) => arrayNegociacao.concat(array), [])
        //                     .filter(negociacao =>
        //                         !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
        //                             JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
        //             )
        //             .then(negociacoesFiltradas => {
        //                 negociacoesFiltradas.forEach(negociacao => {

        //                     //Pega a conex�o instancia o Dao e add cada negocia��o..
        //                     //..no banco(indexDB)
        //                     new NegociacaoDao(conexao)
        //                         .adiciona(negociacao)
        //                         .then(() => this._listaNegociacoes.adiciona(negociacao))
        //                         .catch(erro => this._mensagem.texto = erro);
        //                 });
        //                 this._mensagem.texto = 'Negociações importadas com sucesso.';
        //             })
        //             .catch(erro => this._mensagem.texto = erro);

        //     }).catch(erro => this._mensagem.texto = erro)

        // }

    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map