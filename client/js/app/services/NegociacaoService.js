'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'pullNegociacoesDaSemanaRetrasada',
        value: function pullNegociacoesDaSemanaRetrasada() {
            var _this = this;

            return new Promise(function (resolve, reject) {

                _this._http.get('/negociacoes/retrasada').then(function (negociacoes) {

                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada.');
                });
            });
        }
    }, {
        key: 'pullNegociacoesDaSemana',
        value: function pullNegociacoesDaSemana() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                _this2._http.get('/negociacoes/semana').then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana.');
                });
            });
        }
    }, {
        key: 'pullNegociacoesDaSemanaAnterior',
        value: function pullNegociacoesDaSemanaAnterior() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

                _this3._http.get('/negociacoes/anterior').then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior.');
                });
            });
        }
    }, {
        key: 'pushNegociacoes',
        value: function pushNegociacoes(negociacao) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {

                _this4._http.post('/negociacoes', negociacao).then(function (mensagemOK) {
                    console.log(mensagemOK);
                    resolve('Negociação enviada para o servidor com sucesso.');
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possivél enviar a negociação para o Servidor');
                });
            });
        }
    }, {
        key: 'obterNegociacoesServer',
        value: function obterNegociacoesServer(listaAtual) {
            return Promise.all([this.pullNegociacoesDaSemana(), this.pullNegociacoesDaSemanaAnterior(), this.pullNegociacoesDaSemanaRetrasada()]).then(function (todasNegociacoes) {
                return todasNegociacoes.reduce(function (arrayNegociacao, array) {
                    return arrayNegociacao.concat(array);
                }, []).filter(function (negociacao) {
                    return !listaAtual.some(function (negociacaoExistente) {
                        return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
                    });
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível obeter negociações do servidor');
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return 'Negociação cadastrada com sucesso!';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível adicionar a negociação.");
            });
        }
    }, {
        key: 'lista',
        value: function lista() {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possivel carregar as negociaçõeso do BD.');
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apagaTodos();
            }).then(function () {
                return 'Negociações apagada com sucesso!';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possivel apagar as negociaçõeso do BD.');
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map