
const stores = ['negociacoes'];
const version = 3;
const nameDB = 'negociacoesDB';
let connection = null;
let close = null;

export class ConnectionFactory {

    constructor() {
        throw new Error('Não é possível criar instacias de ConnectionFactory');
    }

    static getConnection() {
        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(nameDB, version);


            openRequest.onupgradeneeded = e => {

                console.log('onupgradeneeded');
                ConnectionFactory._createStores(e.target.result);

            }

            openRequest.onsuccess = e => {

                console.log('Conexao obitida com sucesso');
                if (!connection) {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function () {
                        throw new Error('Você não pode fechar diretamente a conexão!');
                    }

                }
                resolve(connection);
            }

            openRequest.onerror = e => {

                console.log(e.target.error());
                reject(e.target.error.name);

            }

        });
    }

    static _createStores(connection) {

        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store))
                connection.deleteObjectStore(store);

            connection.createObjectStore(store, { autoIncrement: true });
            console.log(`_createStores(${store})`);
        });

    }

    static closeConnection() {
        if (connection) {
            close();   // Reflect.apply(close, connection,[]); //Outra forma de associar o close a connection sem o Bind
            connection = null;
        }
    }
}

