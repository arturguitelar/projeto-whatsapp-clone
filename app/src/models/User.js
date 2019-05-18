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
        return User.getRef()
            .doc(this.email)
            .collection('contacts')
            .doc(btoa(contact.email))
            .set(contact.toJSON());
    }

    /**
     * Pega uma referência para usuários no Firebase.
     * @return { firebase.firestore.CollectionReference } Uma instância de CollectionReference.
     */
    static getRef() {
        return Firebase.db().collection('/users');
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