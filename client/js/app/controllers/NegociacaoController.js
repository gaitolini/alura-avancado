class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._listaNegociacoes = new ListaNegociacoes();
        this._negociacoesViews = new NegociacoesViews($("#negociacoesView"));
        this._negociacoesViews.update(this._listaNegociacoes);
        this._mensagem = new Mensagem();
        this._mensagemView = new MensageView($("#mensagemView"));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {

        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = 'Mensagem adionada com sucesso';
        this._mensagemView.update(this._mensagem);

        this._negociacoesViews.update(this._listaNegociacoes);

        this._limpaFormulario();
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.strToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value,
        );

    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0

        this._inputData.focus();
    }


}