'use strict';

System.register(['./controllers/NegociacaoController'], function (_export, _context) {
  "use strict";

  var NegociacaoController, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      NegociacaoController = _controllersNegociacaoController.NegociacaoController;
    }],
    execute: function () {
      negociacaoController = new NegociacaoController();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);
      // document.querySelector('#importaNegociacoes').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);

      /* O porquê do uso do bind já foi visto anteriormente. Se não o incluíssemos, o this do adiciona não seria mais o negociacaoController. Escolhemos uma solução tradicional. */
    }
  };
});
//# sourceMappingURL=boot.js.map