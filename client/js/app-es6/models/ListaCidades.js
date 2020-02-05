export class ListaCidades {

    constructor() {

        this._cidades = [];
    }

    adiciona(cidade) {
        this._cidades.push(cidade);
    }

    ordena(criterio) {
        this._cidades.sort(criterio);
    }

    inverteOrdem() {
        this._cidades.reverse();
    }

    get negociacoes() {
        return [].concat(this._cidades);
    }

    limpa() {
        this._cidades = [];
    }


}