import { Negociacoes, Negociacao } from '../models/index';

import { NegociacoesView, MensagemView } from '../views/index';

import { logarTempoExecucao } from '../helpers/decorators/logarTempoExecucao';

export class NegociacaoController {

    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor() {

        this._inputData = $('#data'); //usando JQuery
        this._inputQuantidade = $('#quantidade'); //usando JQuery
        this._inputValor = $('#valor'); //usando JQuery
        this._negociacoesView.update(this._negociacoes);

    }

    @logarTempoExecucao()
    adiciona(event: Event): void {

        event.preventDefault();

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

        this._negociacoesView.update(this._negociacoes);

        this._mensagemView.update('Negociação adicionada com sucesso!');

    }

    private _DiaUtil(data: Date): boolean {
        return data.getDay() != DiaSemana.Sabado && data.getDay() != DiaSemana.Domingo;
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