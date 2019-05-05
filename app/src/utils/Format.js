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
}