class EnviaNegociacoesController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._mensagem = new Bind(
            new Mensagem(),
            new MensageView($("#mensagemView")),
            'texto'
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
            this._inputQuantidade.value,
            this._inputValor.value,
        );

    }

    enviaNegociacao(event) {

        event.preventDefault();
        // let negociacao = new Negociacao(new Date(this._inputData.value), this._inputQuantidade, this._inputValor);

        let negociacao = {
            data: this._inputData.value,
            quantidade: this._inputQuantidade.value,
            valor: this._inputValor.value
        };

        let service = new NegociacaoService();

        service.pushNegociacoes(negociacao).then(messagem => {
            this._mensagem.texto = messagem;
        }).catch(erro => {
            this._mensagem.texto = erro;

        })



    }


}