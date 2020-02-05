"use strict";

System.register(["./controllers/NegociacaoController", "./polyfill/fetch"], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }, function (_polyfillFetch) {}],
    execute: function () {
      negociacaoController = currentInstance();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);
      // document.querySelector('#importaNegociacoes').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);

      /* O porquê do uso do bind já foi visto anteriormente. Se não o incluíssemos, o this do adiciona não seria mais o negociacaoController. Escolhemos uma solução tradicional. */
    }
  };
});
//# sourceMappingURL=boot.js.map