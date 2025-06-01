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
            const player = new Player(payload.name, socket.id, "", 0)
            lobbies.forEach(lobby => {
                if (lobby.code === payload.code.toString()) {
                    if (lobby.players.length < 4) {
                        lobby.players.push(player)
                        currentLobby = lobby
                    }
                }
            })
            socket.emit("join", JSON.stringify({
                lobby: currentLobby,
                player: player,
            }))
        })

        socket.on("chose", (data: string) => {
            const parsedData = JSON.parse(data)

        })

        socket.on("disconnect", () => {
            for (const lobby of lobbies) {
                for (const player of lobby.players) {
                    if (player.id === socket.id) {
                        lobby.players.splice(lobby.players.indexOf(player), 1)
                    }
                }
            }
            console.log("Client disconnected")
        })
    })
})

const lobby = new Lobby("123", []);

const lobbies: Lobby[] = [lobby]
lobbies[1] = new Lobby("321", [new Player("Dummy 1", "id_1", "", 10),
    new Player("Dummy 2", "id_2", "", 5), new Player("Dummy 3", "id_3", "", 0)])
