import { ClassEvent } from "../utils/ClassEvent";

export class MicrophoneController extends ClassEvent {

    constructor() {

        super();

        // mimetype padrão para gravação no google chrome
        this._mimetype = 'audio/webm'

        // flag para previnir de começar a gravar sem o stream estar disponível
        this._available = false;

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {
            
            this._available = true;

            this._stream = stream;

            this.trigger('ready', this._stream);
        }).catch(err => {
            console.error(err);
        });
    }

    /**
     * @returns { Boolean } Avaliável para gravação? true / false
     */
    isAvailable() {
        return this._available;
    }

    /**
     * Pára todos os tracks ds áudio.
     */
    stop() {
        this._stream.getTracks().forEach(track => {
            track.stop();
        });
    }

    /**
     * Inicia a gravação do microfone.
     */
    startRecorder() {

        if (this.isAvailable()) {

            this._mediaRecorder = new MediaRecorder(this._stream, {
                mimeType: this._mimetype
            });

            // é preciso guardar a informação enviada "em partes" na ordem correta
            this._recordedChuncks = [];

            this._mediaRecorder.addEventListener('dataavailable', e => {
                if (e.data.size > 0) this._recordedChuncks.push(e.data);
            });

            // quando parar de gravar, deve-se pegar todos os pedaços de gravação
            // e transformar num único arquivo
            this._mediaRecorder.addEventListener('stop', e => {

                // blob = binary large object
                let blob = new Blob(this._recordedChuncks, {
                    type: this._mimetype
                });

                let filename = `rec${Date.now()}.webm`;

                let audioContext = new AudioContext();

                let reader = new FileReader();

                reader.onload = e => {

                    audioContext.decodeAudioData(reader.result).then(decode => {

                        let file = new File([blob], filename, {
                        
                            type: this._mimetype,
                            lastModified: Date.now()
                        });

                        this.trigger('recorded', file, decode);
                    });
                };

                reader.readAsArrayBuffer(blob);
            });

            this._mediaRecorder.start();
            this.startTimer();
        }
    }

    /**
     * Pára uma gravação do microfone em andamento.
     */
    stopRecorder() {

        if (this.isAvailable()) {
            
            this._mediaRecorder.stop();
            this.stopTimer();
            this.stop();
        }
    }

    /**
     * Inicia o timer de gravação de áudio.
     */
    startTimer() {
        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(()=> {
            this.trigger('recordtimer', Date.now() - start);
        }, 100); // 100 = 10x por segundo
    }

    /**
     * Pára o timer de gravação de áudio.
     */
    stopTimer() {
        clearInterval(this._recordMicrophoneInterval);
    }
}