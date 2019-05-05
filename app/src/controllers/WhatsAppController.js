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

        /* === Painel de Perfil do lado esquerdo. === */

        this.el.myPhoto.on('click', e => {
            this.closeAllLeftPanels();
            this.el.panelEditProfile.show();

            // para dar tempo do elemento ser renderizado antes da animação
            setTimeout(() => {

                this.el.panelEditProfile.addClass('open');
            }, 300); 
        });

        this.el.btnClosePanelEditProfile.on('click', e => {
            this.el.panelEditProfile.removeClass('open');
        });

        this.el.photoContainerEditProfile.on('click', e => {
            // força um click no input
            this.el.inputProfilePhoto.click();
        });

        this.el.inputNamePanelEditProfile.on('keypress', e => {

            if (e.key === 'Enter') {
                
                e.preventDefault();

                this.el.btnSavePanelEditProfile.click();
            }
        });

        this.el.btnSavePanelEditProfile.on('click', e => {
            console.log(this.el.inputNamePanelEditProfile.innerHTML);
            
        });
        /* === Fim - Painel de Perfil do lado esquerdo. === */

        /* === Painel de nova conversa do lado esquerdo. === */

        this.el.btnNewContact.on('click', e => {
            this.closeAllLeftPanels();
            this.el.panelAddContact.show();

            // para dar tempo do elemento ser renderizado antes da animação
            setTimeout(() => {

                this.el.panelAddContact.addClass('open');
            }, 300);
        });

        this.el.btnClosePanelAddContact.on('click', e => {
            this.el.panelAddContact.removeClass('open');
        });

        this.el.formPanelAddContact.on('submit', e => {
            let formData = this.el.formPanelAddContact.getForm();
        });
        /* === Fim - Painel de nova conversa do lado esquerdo. === */
    }

    /**
     * Adciona novos métodos nas classes nativa Element e HTMLFormElement.
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

        HTMLFormElement.prototype.getForm = function() {
            return new FormData(this);
        }

        HTMLFormElement.prototype.toJSON = function() {
            let json = {};

            this.getForm().forEach((value, key) => {
                json[key] = value;
            });

            return json;
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