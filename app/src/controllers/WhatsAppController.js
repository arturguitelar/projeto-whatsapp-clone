class WhatsAppController {
    
    constructor() {
        
        this.elementsPrototype();
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

    /**
     * Adciona novos métodos na classe nativa Element.
     */
    elementsPrototype() {

        /**
         * O 'return this' dentro das funções possam ser encadeadas:
         * Ex.:
         * app.el.chaveDoElemento.addClass('nome').show().hasClass('nome')
         */
        
        Element.prototype.hide = function() {
            this.style.display = 'none';
            return this;
        }

        Element.prototype.show = function() {
            this.style.dislay = 'block';
            return this;
        }

        Element.prototype.toggle = function() {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
        }

        Element.prototype.on = function(events, fn) {

            events.split(' ').forEach(event => {
                this.addEventListener(event, fn);
            });
            return this;
        }

        Element.prototype.css = function(styles) {

            for (let name in styles) {

                this.style[name] = styles[name];
            }
            return this;
        }

        Element.prototype.addClass = function(name) {
            this.classList.add(name);
            return this;
        }

        Element.prototype.removeClass = function(name) {
            this.classList.remove(name);
            return this;
        }

        Element.prototype.toggleClass = function(name) {
            this.classList.toggle(name);
            return this;
        }

        Element.prototype.hasClass = function(name) {
            return this.classList.contains(name);
        }
    }
}