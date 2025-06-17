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

        socket.on("createlobby", (data: string) => {
            const payload = JSON.parse(data)
            const lobby = createLobby()
            const player = new Player(payload.name, socket.id, lobby.code, "", 0)
            playerIdToCode[socket.id] = lobby.code
            lobby.addPlayer(player)

            socket.emit("join", JSON.stringify({
                lobby: lobby,
                player: player
            }))
        })

        socket.on("chose", (data: string) => {
            const payload = JSON.parse(data)
            const lobby = getLobbyByPlayerId(socket.id)
            lobby.players.find(p => p.id === socket.id)!.card = payload.card
            for (const player of lobby.players) {
                if (player.card.length < 1) return
            }
            io.emit("startround", (JSON.stringify({
                lobby: lobby
            })))
        })

        socket.on("updatescore", (data: string) => {
            const payload = JSON.parse(data)
            const lobby = getLobbyByPlayerId(socket.id)
            const player = lobby.players.find(p => p.id === socket.id)!
            player.points += payload.score
            player.card = ""

            for (const p of lobby.players) if (p.card.length > 0) return
            lobby.scrambleCards()
            setTimeout(() => {
                io.emit("restart", JSON.stringify({
                    lobby: lobby
                }))
            }, 4000)
        })

        socket.on("disconnect", () => {
            const lobby = getLobbyByPlayerId(socket.id)
            if (lobby) {
                lobby.removePlayer(socket.id)
                console.log(`Remove '${socket.id}' from lobby '${lobby.code}'`)
            }
            console.log(`Client '${socket.id}' disconnected`)
        })
    })
})

const getLobbyByPlayerId = (playerId: string): Lobby => {
    const lobbyCode = playerIdToCode[playerId]
    return lobbies[lobbyCode]
}

const genLobbyCode = (): string => {
    let code = ""
    for (let i = 0; i < 4; i++)
        code += Math.floor(Math.random() * 10).toString()
    return code
}

const createLobby = (): Lobby => {
    const lobbyCode = genLobbyCode()
    const lobby = new Lobby(lobbyCode, [])
    lobbies[lobbyCode] = lobby
    console.log("Created lobby: ", lobby.code)
    return lobby
}

const playerIdToCode: { [id: string]: string } = {}

const lobby = new Lobby("123", []);
const lobbies: { [code: string]: Lobby } = {"123": lobby}
lobbies["321"] = new Lobby("321", [new Player("Dummy 1", "id_1", "321", "Frieden finden", 10),
    new Player("Dummy 2", "id_2", "321", "Sei du selbst", 5), new Player("Dummy 3", "id_3", "321", "Freundlich sein", 0)])
