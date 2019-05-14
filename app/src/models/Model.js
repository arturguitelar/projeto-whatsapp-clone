import { ClassEvent } from "../utils/ClassEvent";

export class Model extends ClassEvent {

    constructor() {

        super();

        this._data = {};
    }

    /**
     * Recebe dados em JSON.
     * - Cria um objeto com estes dados.
     * - Envia um trigger ao evento "datachange" com o JSON criado.
     * @param { JSON } json 
     */
    fromJSON(json) {
        
        this._data = Object.assign(this._data, json);
        this.trigger('datachange', this.toJSON());
    }

    /**
     * Gera um JSON.
     * @return { JSON } JSON com os dados.
     */
    toJSON() {
        return this._data;
    }
}