class Negociacoes {

    private _negociacoes: Negocioacao[] = [];

    adiciona(negociacao: Negocioacao) {

        this._negociacoes.push(negociacao);

    }

    paraArray() {

        //[].concat cria uma nova instância do array para evitar alterações
        return [].concat(this._negociacoes); 

    }

}