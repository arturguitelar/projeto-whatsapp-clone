class WhatsAppController {
    
    constructor() {
        
        this.loadElements();
    }

    /**
     * @method loadElements()
     *  - Percorre a página em busca de IDs.
     *  - Chama o método que formata os ids.
     *  - Cria um objeto utilizando os ids formatados como chave e o respectivo elemento
     * como valor.
     */
    loadElements() {

        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {
           
            this.el[Format.getCamelCase(element.id)] = element;
        });
    }
}