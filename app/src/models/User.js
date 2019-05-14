import { Firebase } from './../utils/Firebase';
import { ClassEvent } from '../utils/ClassEvent';

export class User extends ClassEvent {

    /**
     * Pega uma referência para usuários no Firebase.
     * 
     * @return { firebase.firestore.CollectionReference } Uma instância de CollectionReference.
     */
    static getRef() {
        return Firebase.db().collection('/users');
    }

    /**
     * Busca na referência um email especificado.
     * 
     * @param {String} email
     * @return {firebase.firestore.DocumentReference} Uma instância de DocumentReference.
     */
    static findByEmail(email) {
        return User.getRef().doc(email);
    }
}