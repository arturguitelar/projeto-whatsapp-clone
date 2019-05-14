import { Format } from './../utils/Format';
import { CameraController } from './CameraController';
import { MicrophoneController } from './MicrophoneController';
import { DocumentPreviewController } from './DocumentPreviewController';
import { Firebase } from './../utils/Firebase';
import { User } from '../models/User';

export class WhatsAppController {
    
    constructor() {
        
        this._firebase = new Firebase();

        this.initAuth();
        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }

    /**
     * Autenticação no Firebase.
     */
    initAuth() {
        this._firebase.initAuth()
            .then(response => {

                this._user = new User();

                let userRef = User.findByEmail(response.user.email);

                userRef.set({
                    name: response.user.displayName,
                    email: response.user.email,
                    photo: response.user.photoURL
                }).then(() => {
                    this.el.appContent.css({ display: 'flex' });
                });

            })
            .catch(err => {
                console.error(err);
            });
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

        /* === Parte de contatos do lado esquerdo === */
        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {

            item.on('click', e => {
                
                this.el.home.hide();

                this.el.main.css({
                    display: 'flex'
                });
            });
        });
        /* === Fim - Parte de contatos do lado esquerdo === */

        /* === Janela de conversa === */
        this.el.btnAttach.on('click', e => {

            e.stopPropagation();
            this.el.menuAttach.addClass('open');
            // Nota: neste caso cria-se uma função nomeada para controle de document.removeListener
            // O bind() indica o escopo do this, para que seja levado em consideração o próprio WhatsAppController
            // ao invés do document, que seria o this padrão.
            document.addEventListener('click', this.closeMenuAttach.bind(this));
        });

        this.el.btnAttachPhoto.on('click', e => {
            
            this.el.inputPhoto.click();
        });

        this.el.inputPhoto.on('change', e => {

            // Nota: this.el.inputPhoto.files retorna uma collection FileList (typeof object)
            // e precisa ser transformado em um array. FileList não possui o método forEach().
            [...this.el.inputPhoto.files].forEach(file => {
                console.log(file);
            });
        });

        this.el.btnAttachCamera.on('click', e => {
            
            this.closeAllMainPanels();
            
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                height: 'calc(100% - 120px)'
            });

            this._camera = new CameraController(this.el.videoCamera);
        });

        this.el.btnClosePanelCamera.on('click', e => {

            this.closeAllMainPanels();
            this.el.panelMessagesContainer.show();
            this._camera.stop();
        });

        this.el.btnTakePicture.on('click', e => {
            
            let dataURL = this._camera.takePicture();

            this.el.pictureCamera.src = dataURL;
            
            this.el.pictureCamera.show();
            this.el.videoCamera.hide();
            this.el.btnReshootPanelCamera.show();
            this.el.containerTakePicture.hide();
            this.el.containerSendPicture.show();
        });

        this.el.btnReshootPanelCamera.on('click', e => {

            this.el.pictureCamera.hide();
            this.el.videoCamera.show();
            this.el.btnReshootPanelCamera.hide();
            this.el.containerTakePicture.show();
            this.el.containerSendPicture.hide();
        });

        this.el.btnSendPicture.on('click', e => {
            console.log(this.el.pictureCamera.src);
        });

        this.el.btnAttachDocument.on('click', e => {

            this.closeAllMainPanels();          
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                height: 'calc(100% - 120px)'
            });

            this.el.inputDocument.click();
        });

        this.el.inputDocument.on('change', e => {

            if (this.el.inputDocument.files.length) {

                this.el.panelDocumentPreview.css({
                    height: '1%'
                });
                
                let file = this.el.inputDocument.files[0];

                this._documentPreviewController = new DocumentPreviewController(file);

                this._documentPreviewController.getPreviewData().then(result => {
                    
                    this.el.imgPanelDocumentPreview.src = result.src;
                    this.el.infoPanelDocumentPreview.innerHTML = result.info;
                    this.el.imagePanelDocumentPreview.show();
                    this.el.filePanelDocumentPreview.hide();

                    this.el.panelDocumentPreview.css({
                        height: 'calc(100% - 120px)'
                    });
                }).catch(err => {

                    this.el.panelDocumentPreview.css({
                        height: 'calc(100% - 120px)'
                    });

                    switch (file.type) {
                        case 'application/vnd.ms-excel':
                        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls';
                        break;

                        case 'application/vnd.ms-powerpoint':
                        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt';
                        break;

                        case 'application/msword':
                        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc';
                        break;

                        default:
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic';
                        break;
                    }

                    this.el.filenamePanelDocumentPreview.innerHTML = file.name;;
                    this.el.imagePanelDocumentPreview.hide();
                    this.el.filePanelDocumentPreview.show();
                });
            }
        });

        this.el.btnClosePanelDocumentPreview.on('click', e => {

            this.closeAllMainPanels();
            this.el.panelMessagesContainer.show();
        });

        this.el.btnSendDocument.on('click', e => {
            console.log('send document');
        });

        this.el.btnAttachContact.on('click', e => {
            this.el.modalContacts.show();
        });

        this.el.btnCloseModalContacts.on('click', e => {
            this.el.modalContacts.hide();
        });

        this.el.btnSendMicrophone.on('click', e => {
            
            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();

            this._microphoneController = new MicrophoneController();

            this._microphoneController.on('ready', audio => {
                
                console.log('ready event');
                this._microphoneController.startRecorder();
            });

            this._microphoneController.on('recordtimer', timer => {
                this.el.recordMicrophoneTimer.innerHTML = Format.toTime(timer);
            });
        });

        this.el.btnCancelMicrophone.on('click', e => {
            
            this._microphoneController.stopRecorder();
            this.closeRecordMicrophone();
        });

        this.el.btnFinishMicrophone.on('click', e => {
            
            this._microphoneController.stopRecorder();
            this.closeRecordMicrophone();
        });

        this.el.inputText.on('keypress', e => {
            
            if (e.key === 'Enter' && !e.ctrlKey) {
                this.el.btnSend.click();
            }
        });

        this.el.inputText.on('keyup', e => {

            if (this.el.inputText.innerHTML.length) {

                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();
            } else {

                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
            }
        });

        this.el.btnSend.on('click', e => {
            console.log(this.el.inputText.innerHTML);
        });

        this.el.btnEmojis.on('click', e => {
            this.el.panelEmojis.toggleClass('open');
        });

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {
            
            emoji.on('click', e => {
                
                // Nota: imgEmojiDefault está escondido no layout e será clonado.
                // O clone irá receber as propriedades do emoji que foi clicado.
                let img = this.el.imgEmojiDefault.cloneNode();

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.ubicode;
                img.alt = emoji.dataset.unicode;

                emoji.classList.forEach(name => {
                    img.classList.add(name);
                });

                let cursor = window.getSelection();

                if (!cursor.focusNode || !cursor.focusNode.id == 'input-text') {
                    
                    this.el.inputText.focus();
                    cursor = window.getSelection();
                }

                // É preciso pegar o range da seleção e deletar o texto.
                let range = document.createRange();

                range = cursor.getRangeAt(0);
                range.deleteContents();

                // E então cria-se um fragmento para colocar o emoji onde o cursor está apontando.
                let frag = document.createDocumentFragment();

                frag.appendChild(img);

                range.insertNode(frag);
                range.setStartAfter(img);

                this.el.inputText.dispatchEvent(new Event('keyup'));
            });
        });
        /* === Fim - Janela de conversa === */
    }

    /**
     * Fecha todos os painéis principais da parte do chat.
     */
    closeAllMainPanels() {

        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');
    }

    /**
     * Esconde todos os painéis do lado esquerdo.
     */
    closeAllLeftPanels() {

        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }

    /**
     * Fecha o menu de ícones do botão de anexar (attach) arquivos.
     */
    closeMenuAttach(e) {
        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');
    }

    /**
     * Fecha telinha da gravação do microfone.
     */
    closeRecordMicrophone() {
        this.el.recordMicrophoneTimer.innerHTML = '0:00';
        
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
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
}