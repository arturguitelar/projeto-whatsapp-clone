export class CameraController {

    constructor(videoEl) {
        this._videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream => {
            
            this._stream = stream;
            this._videoEl.srcObject = stream;
            this._videoEl.play();
        }).catch(err => {
            console.error(err);
        });
    }

    /**
     * Pára todos os tracks da câmera.
     */
    stop() {
        this._stream.getTracks().forEach(track => {
            track.stop();
        });
    }

    /**
     * - Cria um elemento canvas com altura e largura do vídeo.
     * - Desenha no contexto do canvas a partir da imagem da câmera.
     * 
     * @param {String} mimeType Tipo de imagem. Default: image/png.
     * @returns {String} Imagem em base64.
     */
    takePicture(mimeType = 'image/png') {

        let canvas = document.createElement('canvas');

        canvas.setAttribute('width', this._videoEl.videoWidth);
        canvas.setAttribute('height', this._videoEl.videoHeight);

        let context = canvas.getContext('2d');

        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL(mimeType);
    }
}