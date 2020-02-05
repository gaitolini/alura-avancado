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

        this._service = new NegociacaoService();
        this._init();
    }


    _init() { //Função de inicialização do connstructor

        //carregando o banco de dado 
        this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch((erro) =>
                this._mensagem.texto = erro);

        setInterval(() => {
            this.importaNegociacoes();
        }, 10000);
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
        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.limpa();
            }).catch(erro => this._mensagem.texto = erro);
    }

    adiciona(event) {
        event.preventDefault();
        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            }).catch(erro => this._mensagem.texto = erro);
    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem(); //inverte a  ordem da lista
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

    importaNegociacoes() {

        this._service
            .obterNegociacoesServer(this._listaNegociacoes.negociacoes)
            .then(negociacoesFiltradas => {
                negociacoesFiltradas.forEach(negociacao => {
                    this._service.cadastra(negociacao)
                        .then(() => this._listaNegociacoes.adiciona(negociacao))
                    this._mensagem.texto = 'Negociações obtidas com sucesso do servidor';
                });
            })
            .catch(erro => this._mensagem.texto = erro)
    }
}