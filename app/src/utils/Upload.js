import { Firebase } from "./Firebase";

export class Upload {

    /**
     * @param {*} file Arquivo.
     * @param {*} from Quem está enviando.
     * @return {Promise} Upload do arquivo.
     */
    static send(file, from) {

        return new Promise((s, f) => {
            
            // fazendo upload do arquivo para o Firestore
            let uploadTask = Firebase.hd().ref(from).child(Date.now() + '_' + file.name).put(file);
    
            uploadTask.on('state_changed', e => {
                console.info('upload', e);
            }, err => {
                f(err);
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {

                    s(downloadURL);
                });
            });
        });
    }
}