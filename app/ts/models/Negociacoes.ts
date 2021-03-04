class Negociacoes {

    private _negociacoes: Negocioacao[] = [];

    adiciona(negociacao: Negocioacao): void {

        this._negociacoes.push(negociacao);

    }

    paraArray(): Negocioacao[] {

        //[].concat cria uma nova instância do array para evitar alterações
        return [].concat(this._negociacoes); 

    }

}