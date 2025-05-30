import {createServer} from "http"
import {Server} from "socket.io"
import {parse} from "url"
import next from "next"
import Lobby from "@/classes/Lobby"
import Player from "@/classes/Player"
import EVENT_TYPE from "@/classes/EventType"

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
        lobbies[0].players[socket.id] = new Player("Jry", socket.id, "Sinn")

        socket.send(JSON.stringify({
            type: EVENT_TYPE.INITIAL_DATA,
            payload: lobbies[0]
        }))

        socket.on("chose", (data: string) => {
            const parsedData = JSON.parse(data)
            if (parsedData.type === EVENT_TYPE.CHOSE) {

            }
        })

        socket.on("close", () => {
            console.log("Client disconnected")
        })
    })
})

const lobby = new Lobby("123", {});

const lobbies: Lobby[] = [lobby]
