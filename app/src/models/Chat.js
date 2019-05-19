import { Model } from "./Model";
import { Firebase } from "../utils/Firebase";

export class Chat extends Model {

    constructor() {
        super();
    }

    /* -- Getters & Setters -- */
    get users() { return this._data.users; }
    set users(value) { this._data.users = value; }

    get timeStamp() { return this._data.timeStamp; }
    set timeStamp(value) { this._data.timeStamp = value; }
    /* -- Fim - Getters & Setters -- */

    /**
     * Retorna uma instância da collection `chats`.
     * @return Uma instância de `CollectionReference`.
     */
    static getRef() {
        return Firebase.db().collection('/chats');
    }

    /**
     * Busca um chat que contenha os ids (emails) especificados.
     * @param { String } meEmail Email do usuário host.
     * @param { String } contactEmail Email do contato da conversa.
     * @return { Promise } Resultado da busca.
     */
    static find(meEmail, contactEmail) {

        // Nota: É preciso converter o email para base64 para evitar complicações com o "@"" e o ".".
        return Chat.getRef()
            .where(btoa(meEmail), "==", true)
            .where(btoa(contactEmail), "==", true)
            .get();
    }

    /**
     * Cria um chat entre dois usuários com os ids (emails) especificados.
     * @param { String } meEmail Email do usuário host.
     * @param { String } contactEmail Email do contato da conversa.
     * @return { Promise } Chat criado.
     */
    static create(meEmail, contactEmail) {

        return new Promise((s, f) => {

            let users = {};

            users[btoa(meEmail)] = true;
            users[btoa(contactEmail)] = true;

            Chat.getRef().add({
                users,
                timeStamp: new Date()
            }).then(doc => {

                Chat.getRef().doc(doc.id).get().then(chat => {
                    s(chat);
                }).catch(err => { f(err); });
            }).catch(err => { f(err); });
        });
    }

    /**
     * Cria um chat caso este não exista.
     * @param { String } meEmail Email do usuário host.
     * @param { String } contactEmail Email do contato da conversa.
     * @return { Promise } Um novo chat criado ou os chats já existentes.
     */
    static createIfNotExists(meEmail, contactEmail) {
        
        return new Promise((s, f) => {

            Chat.find(meEmail, contactEmail).then(chats => {

                if (chats.empty) {
                    
                    Chat.create(meEmail, contactEmail).then(chat => {
                        s(chat);
                    });
                } else {

                    chats.forEach(chat => {
                        s(chat);
                    });
                }
            }).catch(err => { f(err); });
        });
    }
}