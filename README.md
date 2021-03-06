# WhatsApp Clone

[![Hcode Treinamentos](https://www.hcode.com.br/res/img/hcode-200x100.png)](https://www.hcode.com.br)

Projeto desenvolvido como exemplo do [Curso Completo de JavaScript](https://www.udemy.com/javascript-curso-completo/) na Udemy.com.

- O projeto necessita de [Node.js](https://nodejs.org/)


Link para o repositório que contém os arquivos iniciais indicados no curso: [link](https://github.com/hcodebr/curso-javascript-projeto-whatsapp-clone).

<br>

### Visual do Projeto
![WhatsApp Clone](https://firebasestorage.googleapis.com/v0/b/hcode-com-br.appspot.com/o/whatsapp.jpg?alt=media&token=5fc78e3b-4871-424f-abfa-b765f2515d0c)

<br>

### Recursos Usados

**Lista de recursos usados em aula para este projeto**

| Recurso | Link |
| ------ | ------ |
| Webpack | https://webpack.js.org/ |
| Firebase Authentication | https://firebase.google.com/docs/auth/?authuser=0 |
| Cloud Firestore | https://firebase.google.com/docs/firestore/?authuser=0 |
| Cloud Functions | https://firebase.google.com/docs/functions/?hl=pt-br |
| Cloud Storage | https://firebase.google.com/docs/storage/?authuser=0 |
| PDF.js | https://mozilla.github.io/pdf.js/ |
| MediaDevices.getUserMedia() | https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia |

<br>

**Algumas coisas interessantes aprendidas durante o projeto:**

- Como buscar elementos com ID no html e criar referências a eles como propriedades de um objeto dinamicamente.
- Criar métodos personalizados em classes nativas com Prototype.
- Utilizar a classe FormData para recuperar os dados de um formulário pelo name dos campos.
- Utilizar o prototype em HTMLFormElement para transformar os campos do formulário em um JSON.
- Utilizando o bind() para definir escopo do this.
- Propagação de eventos e removeEventListener().
- Spread Operators.
- cloneNode(), dispatchEvent() e newEvent().
- getSelection(), createRange() e DocumentFragment().
- Api MediaDevices.
- Webpack e Webpack Dev Server.
- PDF.js (utilizando o conceito de workers).
- MediaRecorder().
- Criação de triggers para eventos.
- Módulo Firebase instalado via NPM e configuração.*1
- Firebase Cloud Firestore e Firebase Storage.
- MVC.
- DAO.
- Firebase Cloud Functions. *2

*1 - Obs: O arquivo da classe "FirebaseConfig.js" não será adicionado ao projeto no github por motivos de segurança.
Por questões de simplicidade, é apenas uma classe criada na pasta "utils" com a configuração de conexão par ao projeto no Firebase direto no construtor. Algo como isto:

```
export class FirebaseConfig {

    constructor() {
        this._config = {
            apiKey: "api-key",
            authDomain: "auth-domain",
            databaseURL: "databaseURL",
            projectId: "project-id",
            storageBucket: "storage-bucket",
            messagingSenderId: "messaging-sender-id",
            appId: "app-id"
        };
    }

    get config() {

        return this._config;
    }
}
```

*2 - Na etapa em que envolve a criação de setup para deploy de funções no firebase, a ferramenta pede indicação para qual projeto o deploy pertence. Isso acaba gerando um arquivo ".firebaserc" que contém a id do projeto no Firebase. Logo, coloquei este arquivo no .gitignore.

Este arquivo deve ser recriado na pasta raiz com a seguinte configuração, caso a ferramenta do firebase não o crie automaticamente:

```
{
  "projects": {
    "default": "project-id"
  }
}
```

> Em progresso...

<br>

### [Perfil da Hcode no github.](https://github.com/hcodebr)

### [JavaScript - Curso Completo com 6 Projetos Reais.](https://www.udemy.com/javascript-curso-completo/)

O projeto segue a [licença MIT](https://opensource.org/licenses/MIT).