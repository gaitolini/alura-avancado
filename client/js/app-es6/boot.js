import { NegociacaoController } from "./controllers/NegociacaoController";
// import {  } from "./polyfill/fetch";  Lembrar de descomentar qdo fizer o commit dessa API e retirar o ES6.js

let negociacaoController = new NegociacaoController();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);
// document.querySelector('#importaNegociacoes').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);

/* O porquê do uso do bind já foi visto anteriormente. Se não o incluíssemos, o this do adiciona não seria mais o negociacaoController. Escolhemos uma solução tradicional. */