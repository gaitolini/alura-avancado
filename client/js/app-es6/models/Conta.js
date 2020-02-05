class Conta {
    constructor(saldo) {
        this._saldo = saldo;
    }

    get saldo() {
        return this.saldo;
    }

    set saldo(saldo) {
        this.saldo = saldo;
    }

    atualiza(taxa) {
        throw new Error('Este método deve ser implementado na classe herdada!');
    }
}


class ContaCorrente extends Conta {

    atualiza(taxa) {
        this._saldo = +taxa;
    }
}

class ContaPoupanca {

    atualiza(taxa) {
        this.saldo += (taxa * 2);
    }
}