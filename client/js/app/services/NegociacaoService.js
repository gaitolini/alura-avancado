class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    pullNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {

            this._http.get('/negociacoes/retrasada')
                .then(negociacoes => {

                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada.');

                });

        });
    }

    pullNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {

            this._http.get('/negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana.');
                });
        });




    }

    pullNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {

            this._http.get('/negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior.');
                });
        });
    }

    pushNegociacoes(negociacao) {

        return new Promise((resolve, reject) => {

            this._http.post('/negociacoes', negociacao)
                .then(mensagemOK => {
                    console.log(mensagemOK);
                    resolve('Negociação enviada para o servidor com sucesso.');

                }).catch(erro => {
                    console.log(erro);
                    reject('Não foi possivél enviar a negociação para o Servidor');
                });

        });

    }

}
