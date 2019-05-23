export class Base64 {

    /**
     * @param {*} urlBase64
     * @return {String} Mimetype;
     */
    static getMimetype(urlBase64) {

        let regex = /^data:(.+);base64,(.*)$/;
        let result = urlBase64.match(regex);
        /* Nota:
            Neste caso, o resultado (result) vem separado em um array com 3 posições:
            0 - string completa (no caso, o b64 da foto);
            1 - primeira parte encontrada. (.+) - por exemplo "image/png"
            2 - segunda parte encontrada. (.*) - o restante da string em b64
            
            console.log(result);
        */
        return result[1]; // image/png
    }

    static toFile(urlBase64) {

        let mimeType = Base64.getMimetype(urlBase64);
        let ext = mimeType.split('/')[1] // png
        let filename = `file_${Date.now()}.${ext}`; // ex.: camera_00:00:00.png

        return fetch(urlBase64)
            .then(res => { return res.arrayBuffer(); })
            .then(buffer => { return new File([buffer], filename, { mime: mimeType }); });
    }
}