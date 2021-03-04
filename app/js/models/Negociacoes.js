class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    paraArray() {
        //[].concat cria uma nova instância do array para evitar alterações
        return [].concat(this._negociacoes);
    }
}
