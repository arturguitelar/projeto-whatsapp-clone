const firebase = require('firebase');
import { FirebaseConfig } from './FirebaseConfig';

require('firebase/firestore');

export class Firebase {

    constructor() {

        this._config = new FirebaseConfig().config;

        this.init();
    }

    init() {

        // Initialize Firebase
        if (!this._initialized) {

            firebase.initializeApp(this._config);

            /**
             * A configuração timestampsInSnapshots atualmente já é setada
             * como true por padrão.
             * O console log indica que se retire isso. Como isso foi utilizado
             * durante o curso, deixarei aqui como referência.
             */
            // firebase.firestore().settings({
            //     timestampsInSnapshots: true
            // });

            firebase.firestore();

            this._initialized = true;
        }
    }

    static db() {
        return firebase.firestore();
    }

    static hd() {
        return firebase.storage();
    }

    /**
     * @returns {Promise} Autenticação no Firebase (Usuário + Token).
     */
    initAuth() {
        return new Promise((s, f) => {
            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth()
                .signInWithPopup(provider)
                .then(result => {

                    let token = result.credential.accessToken;
                    let user = result.user;

                    s({ user, token });
                })
                .catch(err => { f(err) });
        });
    }
}