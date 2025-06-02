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
            const player = new Player(payload.name, socket.id, "", "", 0)
            try {
                const code = payload.code.toString()
                lobbies[code].addPlayer(player)
                currentLobby = lobbies[code]
                playerIdToCode[socket.id] = code
                player.lobbyCode = code
            } catch (e: TypeError | any) {
                console.log("Player tried to join non-existent lobby: " + payload.code)
            }

            socket.emit("join", JSON.stringify({
                lobby: currentLobby,
                player: player,
            }))
        })

        socket.on("chose", (data: string) => {
            const parsedData = JSON.parse(data)

        })

        socket.on("disconnect", () => {
            getLobbyByPlayerId(socket.id).removePlayer(socket.id)
            console.log("Client disconnected")
        })
    })
})

const getLobbyByPlayerId = (playerId: string) => {
    const lobbyCode = playerIdToCode[playerId]
    return lobbies[lobbyCode]
}

const playerIdToCode: { [id: string]: string } = {}

const lobby = new Lobby("123", []);
const lobbies: { [code: string]: Lobby } = {"123": lobby}
lobbies["321"] = new Lobby("321", [new Player("Dummy 1", "id_1", "321", "", 10),
    new Player("Dummy 2", "id_2", "321", "", 5), new Player("Dummy 3", "id_3", "321", "", 0)])
