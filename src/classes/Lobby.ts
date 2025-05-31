import Player from "@/classes/Player";

class Lobby {
    code: string
    players: Player[]

    constructor(code: string, players: Player[]) {
        this.code = code
        this.players = players
    }
}

interface PlayerList {
    [key: string]: Player
}

export default Lobby