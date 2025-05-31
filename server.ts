import {createServer} from "http"
import {Server} from "socket.io"
import {parse} from "url"
import next from "next"
import Lobby from "@/classes/Lobby"
import Player from "@/classes/Player"

const port = parseInt(process.env.PORT || "3000", 10)
const dev = process.env.NODE_ENV !== "production"
const app = next({})
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url!, true)
        handle(req, res, parsedUrl)
    }).listen(port)
    console.log(`> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV}`)

    const io = new Server(server)

    io.on("connection", (socket) => {
        console.log("Client connected")

        socket.on("tryJoin", (data: string) => {
            const payload = JSON.parse(data)
            let currentLobby = null
            lobbies.forEach(lobby => {
                if (lobby.code === payload.code.toString()) {
                    lobby.players.push(new Player(payload.name, socket.id, ""))
                    currentLobby = lobby
                }
            })
            socket.emit("join", JSON.stringify({
                lobby: currentLobby,
            }))
        })

        socket.on("chose", (data: string) => {
            const parsedData = JSON.parse(data)

        })

        socket.on("close", () => {
            console.log("Client disconnected")
        })
    })
})

const lobby = new Lobby("123", []);

const lobbies: Lobby[] = [lobby]
