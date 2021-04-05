import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';

import { NegociacoesView, MensagemView } from '../views/index';

import { domInject, throttle } from '../helpers/decorators/index';

import { NegociacaoService } from '../service/index'

import { imprime } from '../helpers/index'

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    private _negociacaoService = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona(): void {

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (!this._DiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor.');
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        imprime(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);

        this._mensagemView.update('Negociação adicionada com sucesso!');

    }

    private _DiaUtil(data: Date): boolean {
        return data.getDay() != DiaSemana.Sabado && data.getDay() != DiaSemana.Domingo;
    }

    @throttle()
    importaDados(): void {

        function isOk(res: Response) {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }
        this._negociacaoService
            .obterNegociacoes(isOk)
            .then(negociacoesParaImportar => {

                const negociacoesJaImportadas = this._negociacoes.paraArray();

                negociacoesParaImportar
                    .filter(negociacao =>
                        !negociacoesJaImportadas.some(jaImportada =>
                            negociacao.ehIgual(jaImportada)))
                    .forEach(negociacao =>
                        this._negociacoes.adiciona(negociacao))

                this._negociacoesView.update(this._negociacoes);
            });
    }
}

enum DiaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}