import { Negociacoes } from './../models/Negociacoes';
import { Negocioacao } from '../models/Negociacao';

import { NegociacoesView } from './../views/NegociacoesView';
import { MensagemView } from './../views/MensagemView';

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

    adiciona(event: Event): void {

        event.preventDefault();

        const negociacao = new Negocioacao(
            new Date(this._inputData.val().replace(/-/g, ',')),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);

        this._mensagemView.update('Negociação adicionada com sucesso!');

    }
}