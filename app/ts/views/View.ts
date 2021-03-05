export abstract class View<T> {

    private _elemento: JQuery;

    constructor(seletor: string) {

        this._elemento = $(seletor); //usando JQuery
    }

    update(model: T): void {

        this._elemento.html(this.template(model));
    }

    abstract template(model: T): string

}