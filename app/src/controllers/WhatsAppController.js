class WhatsAppController {
    
    constructor() {
        
        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
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
     * Inicia todos os eventos.
     */
    initEvents() {

        this.el.myPhoto.on('click', e => {
            this.closeAllLeftPanels();
            this.el.panelEditProfile.show();

            // para dar tempo do elemento ser renderizado antes da animação
            setTimeout(() => {

                this.el.panelEditProfile.addClass('open');
            }, 300); 
        });

        this.el.btnNewContact.on('click', e => {
            this.closeAllLeftPanels();
            this.el.panelAddContact.show();

            // para dar tempo do elemento ser renderizado antes da animação
            setTimeout(() => {

                this.el.panelAddContact.addClass('open');
            }, 300);
        });

        this.el.btnClosePanelEditProfile.on('click', e => {
            this.el.panelEditProfile.removeClass('open');
        });
        
        this.el.btnClosePanelAddContact.on('click', e => {
            this.el.panelAddContact.removeClass('open');
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
            this.style.display = 'block';
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

    /**
     * Esconde todos os painéis do lado esquerdo.
     */
    closeAllLeftPanels() {

        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }
}