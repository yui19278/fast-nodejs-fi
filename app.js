/*const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`
*/

const express = require('express')
const expressWs = require('express-ws')

const app = express()
expressWs(app)

const port = process.env.PORT || 3001
let connects = []

app.use(express.static('public'))

app.ws('/ws', (ws, req) => {
  connects.push(ws)

  ws.on('message', (message) => {
    console.log('Received:', message)

    connects.forEach((socket) => {
      if (socket.readyState === 1) {
        // Check if the connection is open
        socket.send(message)
      }
    })
  })

  ws.on('close', () => {
    connects = connects.filter((conn) => conn !== ws)
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})


<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chat App</title>
    <style>
      .chat {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
      .messages {
        flex: 1;
        overflow-y: auto;
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .form {
        display: flex;
      }
      .input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
      }
      .submit {
        padding: 10px;
        border: 1px solid #ccc;
        background: #eee;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="chat">
      <ul class="messages"></ul>
      <form class="form">
        <input class="input" autocomplete="off" />
        <button class="submit">Send</button>
      </form>
    </div>

    <script>
      function main() {
        const host = location.origin.replace(/^http/, 'ws')
        const ws = new WebSocket(host + '/ws')

        const form = document.querySelector('.form')

        form.onsubmit = function (e) {
          e.preventDefault()
          const input = document.querySelector('.input')
          const text = input.value
          ws.send(text)
          input.value = ''
          input.focus()
        }

        ws.onmessage = function (msg) {
          const response = msg.data
          const messageList = document.querySelector('.messages')
          const li = document.createElement('li')
          li.textContent = response
          messageList.appendChild(li)
        }

        ws.onerror = function (error) {
          console.error('WebSocket Error: ', error)
        }
      }

      main()
    </script>
  </body>
</html>


