export class ClassEvent {

    constructor() {
        this._events = {};   
    }

    /**
     * @param { String } eventName Nome do evento.
     * @param { Function } fn Função de callback.
     */
    on(eventName, fn) {
        
        if (!this._events[eventName]) this._events[eventName] = new Array();

        this._events[eventName].push(fn);
    }

    /**
     * Cria um trigger para a escuta de eventos específios.
     * 
     * - Aceita o primeiro parâmetro como o nome {String} de um evento e os parâmetros
     * consecutivos como argumentos, que serão executados caso sejam funções.
     */
    trigger() {

        let args = [...arguments];
        let eventName = args.shift();
        
        // neste caso sempre irá passar o nome do evento como último
        // parâmetro da lista enviada
        args.push(new Event(eventName));

        if (this._events[eventName] instanceof Array) {

            this._events[eventName].forEach(fn => {
                fn.apply(null, args);
            });
        }
    }
}