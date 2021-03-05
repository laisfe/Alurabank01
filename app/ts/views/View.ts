import { logarTempoExecucao } from "../helpers/decorators/logarTempoExecucao";

export abstract class View<T> {

    private _elemento: JQuery;
    private _escapar: boolean;

    constructor(seletor: string, escapar: boolean = false) {

        this._elemento = $(seletor); //usando JQuery
        this._escapar = escapar;
    }

    @logarTempoExecucao(false)
    update(model: T): void {
        let template = this.template(model);

        if (this._escapar)
            template = template.replace(/<script>[\s\S]*?<\/script>/g, '');

        this._elemento.html(template);
    }

    abstract template(model: T): string

}