import { Firebase } from './../utils/Firebase';
import { Model } from './Model';

export class User extends Model {

    constructor(id) {

        super();

        if (id) this.getById(id);
    }

    /* -- Getters & Setters -- */
    get name() {  return this._data.name; }
    set name(value) { this._data.name = value; }

    get email() {  return this._data.email; }
    set email(value) { this._data.email = value; }

    get photo() {  return this._data.photo; }
    set photo(value) { this._data.photo = value; }
    /* -- fim - Getters & Setters -- */

    /**
     * Busca um documento salvo no database por um id especificado.
     * @param {*} id 
     * @return {Promise} Documento salvo no Firebase.
     */
    getById(id) {
        return new Promise((s, f) => {

            // neste método a escuta de alteração de dados é em tempo real
            User.findByEmail(id).onSnapshot(doc => {
                
                this.fromJSON(doc.data());

                s(doc);
            });

            /* 
                Método caso queira que retorne os dados apenas na consulta direta. 
                Deixarei aqui para referências futuras.

                User.findByEmail(id).get().then(doc => {
    
                    this.fromJSON(doc.data());
    
                    s(doc);
                }).catch(err => {
                    f(err);
                });
            */
        });
    }

    /**
     * Salva os dados em JSON no Firebase.
     * @return { Promise } Dados salvos.
     */
    save() {
        return User.findByEmail(this.email).set(this.toJSON());
    }

    /**
     * Adiciona um contato em um usuário.
     * @param { User } contact
     * @return { Promise } Contato adicionado.
     */
    addContact(contact) {

        // Nota: o email do contato está sendo convertido para base64 
        // pois poderá utilzado em funções como busca.
        return User.getContactsRef(this.email)
            .doc(btoa(contact.email))
            .set(contact.toJSON());
    }

    /**
     * - Retorna contatos de um usuário.
     * - Notifica quem está esperando alguma modificação nos contatos.
     * @return { Promise } Contatos de um usuário.
     */
    getContacts() {
        
        return new Promise((s, f) => {
            
            User.getContactsRef(this.email).onSnapshot(docs => {

                let contacts = [];

                docs.forEach(doc => {
                    
                    let data = doc.data();

                    data.id = doc.id;

                    contacts.push(data);
                });

                this.trigger('contactschange', docs);
                
                s(contacts);
            });
        });
    }

    /**
     * Pega uma referência para usuários no Firebase.
     * @return { firebase.firestore.CollectionReference } Uma instância de CollectionReference.
     */
    static getRef() {
        return Firebase.db().collection('/users');
    }

    /**
     * Retorna uma referência de Contatos de um usuário.
     * @param { String } id
     * @return { Promise } Contatos do usuário solicitado.
     */
    static getContactsRef(id) {
        return User.getRef()
            .doc(id)
            .collection('contacts');
    }

    /**
     * Busca na referência um email especificado.
     * @param {String} email
     * @return {firebase.firestore.DocumentReference} Uma instância de DocumentReference.
     */
    static findByEmail(email) {
        return User.getRef().doc(email);
    }
}