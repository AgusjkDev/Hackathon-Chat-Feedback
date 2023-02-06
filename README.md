# Hackathon Chat Feedback

Un proyecto en el que se analizará el comportamiento del chat de twitch de [midudev](https://www.twitch.tv/midudev) mientras él esté en directo analizando los proyectos de ésta maravillosa hackathon a mano del mismo y de [co:here](https://cohere.ai/).

![Previsualización del proyecto](https://raw.githubusercontent.com/agusjkdev/hackathon-chat-feedback/main/.github/preview.png)

## Objetivo Principal

El objetivo principal de éste proyecto es que, _mediante la API de [co.Classify](https://docs.cohere.ai/reference/classify)_, se clasifiquen los mensajes del chat de twitch y que el análisis de éste feedback se pueda visualizar **en tiempo real** en un sitio web.

## ¿Cómo se logra esto?

#### Se necesitan 3 (tres) servicios:
- Twitch Bot
- Socket.io Server
- Website

Un bot de twitch deberá leer los mensajes del chat y a su vez conectarse a un servidor de socket.io para poder enviar _en tiempo real_ ésta información.

![Logs del bot de twitch](https://raw.githubusercontent.com/agusjkdev/hackathon-chat-feedback/main/.github/twitch-bot-logs.png)

En dicho servidor es donde ocurre la magia. Se reciben los mensajes de twitch y se clasifican en 4 (cuatro) posibles tipos: `positive`, `negative`, `neutral` y `unknown`.

#### ¿Qué define a cada mensale según el tipo?

- `positive:` palabras claves con las que se identifica que el usuario está a gusto con dicho proyecto.
- `negative:` palabras claves con las que se identifica que el usuario **no** está a gusto con dicho proyecto.
- `neutral:` punto central entre `positive`y `negative`, cuando el usuario está indeciso con su opinión sobre dicho proyecto.
- `unknown:` mensajes no relacionados a una opinión sobre dicho proyecto.

![Logs del servidor de socket.io](https://raw.githubusercontent.com/agusjkdev/hackathon-chat-feedback/main/.github/socketio-server-logs.png)

_Los mensajes de tipo `unknown` no se enviarán al sitio web y quedarán obsoletos. Los demás sí._

La página web se conectará también al servidor de socket.io para escuchar a ciertos eventos como `created-project`, `updated-project`, `deleted-project` y `feedback`.

#### Te preguntarás, ¿qué son todos esos eventos?

Ya sea que un proyecto nuevo sea creado, actualizado o eliminado, son cambios que también se tienen que reflejar en el sitio web, así el usuario siempre estará informado sin necesidad de refrescar la página.

Cada que alguno de éstos eventos sea recibido, la información de la página se actualizará. Incluso, cuando se reciba feedback, la barra se moverá dependiendo del porcentaje total e individual.

![Previsualización de la animación de la barra de feedback](https://raw.githubusercontent.com/agusjkdev/hackathon-chat-feedback/main/.github/animation-preview.gif)

#### Si bien te dije que se necesitaban solo tres servicios, también se necesita a una persona.

Un individuo, _en éste caso mi persona_, deberá estar visualizando el directo y cada que el anfitrión esté revisando un nuevo proyecto, tendrá que crearlo mediante un panel de administrador. Por eso, en caso de error humano, se podrá actualizar o eliminar dichos proyectos.

![Previsualización del panel de administrador](https://raw.githubusercontent.com/agusjkdev/hackathon-chat-feedback/main/.github/admin-panel-preview.png)

## Tecnologías Usadas:

- [NextJS](https://nextjs.org)
- [Typescript](https://www.typescriptlang.org)
- [TailwindCSS](https://tailwindcss.com)
- [MongoDB](https://www.mongodb.com)
- [Socket.io](https://socket.io)
- [tmi.js](https://tmijs.com)

## Otros

#### Variables de entorno:
- Twitch Bot:
    - `TWITCH_USERNAME:` nombre de usuario de la cuenta de twitch utilizada para el bot.
    - `TWITCH_OAUTH_TOKEN:` token de autorización para poder utilizar los servicios de twitch. [Más información](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth)
    - `TWITCH_CHANNEL:` canal de twitch al que se conectará el bot.
    - `TWITCH_BOT_KEY:` llave única con la que el bot se conectará al servidor de socket.io.
    - `SOCKETIO_URL:` url en el que está alojado el servidor de socket.io.

- Socket.io Server:
    - `CLIENT_URL:` url en el que está alojado el sitio web.
    - `TWITCH_BOT_KEY:` llave única con la que el bot de twitch se conectará al servidor.
    - `COHERE_API_KEY:` cadena de texto de la API key de co:here. [Más información](https://dashboard.cohere.ai/api-keys)

- Website:
    - `NEXT_PUBLIC_BASE_URL:` url en el que está alojada la página.
    - `NEXT_PUBLIC_SOCKETIO_URL:` url en la que está alojado el servidor de socket.io.
    - `NEXT_PUBLIC_HACKATHON_ENDED:` booleano que identifica si la hackathon terminó.
    - `MONGO_URI:` cadena de texto del uri de conexión de MongoDB.
    - `ADMIN_USERNAME:` nombre de usuario utilizado para iniciar sesión en el panel de administración.
    - `ADMIN_PASSWORD:` contraseña utilizada para iniciar sesión en el panel de administración.
