class Format
{
    /**
     * @param {String} text Texto no padrão de id css. Ex.: #meu-id
     * @return {String} Texto formatado em camelCase.
     */
    static getCamelCase(text) {
        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}="id"></div>`;
        
        return Object.keys(div.firstChild.dataset)[0];
    }

    /**
     * @param {Date} duration 
     * @return {String} Hora formatada para 0:00:00 (se ouver horas) ou 0:00.
     */
    static toTime(duration) {
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }
}