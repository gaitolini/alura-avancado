class HttpService {

    // Continuaremos com as melhorias no código e a seguir, 
    // veremos algo mais avançado.Nós criamos a classe HttpService, 
    // depois, escondemos a complexidade de trabalhar com o XMLHttpRequest().
    // Nós fizemos método get e post devolverem uma Promise, e assim, 
    // escondemos a complexidade de trabalhar com tal objeto.

    // Estamos usando o ECMAScript 2015.
    //  Não usamos mais o termo "ES 6", 
    //  porque a cada ano, 
    //  o JavaScript ganha novos recursos.No ES 2016, 
    //  foi incluída uma API com o objetivo de simplificar a criação 
    //  de requisições Ajax: Fetch API, uma API de busca do JS.O que veremos aqui, 
    //  vai além do ECMAScript 2015.

    _handleErrors(res) {
        if (!res.ok) throw new Error(res.statusText);
        return res;
    }

    get(url) {

        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    post(url, dado) {

        return fetch(url, {
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                body: JSON.stringify(dado)
            })
            .then(res => this._handleErrors(res));
    }
}