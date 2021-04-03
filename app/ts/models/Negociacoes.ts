import { Negociacao } from './Negociacao'
import { Imprimivel } from './Imprimivel'

export class Negociacoes extends Imprimivel {

    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {

        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {

        //[].concat cria uma nova instância do array para evitar alterações
        return ([] as Negociacao[]).concat(this._negociacoes);

    }

    paraTexto(): void {

        console.log('Impressão');
        console.log(JSON.stringify(this._negociacoes));
    }

}