import { Negociacao } from './Negociacao'

export class Negociacoes {

    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {

        this._negociacoes.push(negociacao);

    }

    paraArray(): Negociacao[] {

        //[].concat cria uma nova instância do array para evitar alterações
        return ([] as Negociacao[]).concat(this._negociacoes);

    }

}