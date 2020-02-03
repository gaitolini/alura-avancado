class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._ordemAtual = '';

        this._mensagem = new Bind(
            new Mensagem(),
            new MensageView($("#mensagemView")),
            'texto'
        );

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesViews($("#negociacoesView")),
            'adiciona', 'limpa', 'ordena', 'inverteOrdem'
        );

        //carregando o banco de dado 
        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes =>
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = 'Não foi possivel carregar as negociaçõeso do BD';

            });
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0

        this._inputData.focus();
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.strToDate(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));

    }

    apaga() {
        this._listaNegociacoes.limpa();


        ConnectionFactory.getConnection()
            .then(connection => {
                new NegociacaoDao(connection)
                    .apagaTodos()
                    .then(msg => {
                        this._mensagem.texto = msg;
                        this._limpaFormulario;
                    })

            })
            .catch(erro => this._mensagem.texto = erro);

    }

    adiciona(event) {

        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(conexao => {

                let negociacao = this._criaNegociacao();
                new NegociacaoDao(conexao)
                    .adiciona(negociacao)
                    .then(() => {
                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = 'Mensagem adionada com sucesso';
                        this._limpaFormulario();

                    });

            }).catch(erro => this._mensagem.texto = erro);
    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            //inverte a  ordem da lista
            this._listaNegociacoes.inverteOrdem();
        } else {

            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;

    }

    importaNegociacoes() {

        let service = new NegociacaoService();

        Promise.all([
                service.pullNegociacoesDaSemana(),
                service.pullNegociacoesDaSemanaAnterior(),
                service.pullNegociacoesDaSemanaRetrasada()
            ])
            .then(todasNegociacoes =>
                todasNegociacoes
                .reduce((arrayNegociacao, array) => arrayNegociacao.concat(array), [])
                .filter(negociacao =>
                    !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
            )
            .then(negociacoesFiltradas => {
                negociacoesFiltradas
                // .reduce((arrayNegociacao, array) => arrayNegociacao.concat(array), [])
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações  importadas com sucesso.';
            })
            .catch(erro => this._mensagem.texto = erro);

    }

    importaNegociacoe2() {

        let service = new NegociacaoService();
        service
            .obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
            )
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'
            }))
            .catch(erro => this._mensagem.texto = erro);
    }

}