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

        this._mensagem.texto = "Negociações apagadas com sucessos!";
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

                    })
                    .catch(erro => this._mensagem.texto = erro);
            });
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
            service.pullNegociacoesDaSemanaRetrasada()]
        ).then(negociacoes => {
            negociacoes
                .reduce((arrayNegociacao, array) => arrayNegociacao.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações  importadas com sucesso.';
        })
            .catch(erro => this._mensagem.texto = erro);
    }

}