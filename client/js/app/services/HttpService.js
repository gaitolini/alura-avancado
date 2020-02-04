'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
    function HttpService() {
        _classCallCheck(this, HttpService);
    }

    _createClass(HttpService, [{
        key: 'get',

        // 0: requisição ainda não iniciada

        // 1: conexão com o servidor estabelecida

        // 2: requisição recebida

        // 3: processando requisição

        // 4: requisição está concluída e a resposta está pronta

        value: function get(url) {

            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);

                xhr.onreadystatechange = function () {

                    if (xhr.readyState == 4) {

                        if (xhr.status == 200) {

                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            console.log(xhr.responseText);
                            reject('Não foi possível obter dados da URL.');
                        }
                    }
                };

                xhr.send();
            });
        }
    }, {
        key: 'post',
        value: function post(url, objeto) {
            return new Promise(function (resolve, reject) {

                var xhr = new XMLHttpRequest();
                xhr.open('POST', url, true);
                xhr.setRequestHeader("Content-type", "application/json");

                xhr.onreadystatechange = function () {
                    console.log('Status do POST: ' + xhr.status);

                    if (xhr.readyState == 4) {

                        if (xhr.status == 200) {
                            resolve('Dados enviados com com sucesso para o servidor.');
                        } else {
                            reject('Erro no envio de dados');
                        }
                    }
                };

                xhr.send(JSON.stringify(objeto));
            });
        }
    }]);

    return HttpService;
}();
//# sourceMappingURL=HttpService.js.map