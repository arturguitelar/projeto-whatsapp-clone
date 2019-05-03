class Format
{
    /**
     * Retorna o nome da div em camelCase.
     * 
     * @param {String} text
     * @return Object.key
     */
    static getCamelCase(text) {
        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}="id"></div>`;

        return Object.keys(div.firstChild.dataset)[0];
    }
}