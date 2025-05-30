import Player from "@/classes/Player";

class Lobby {
    code: string
    players: PlayerList

    constructor(code: string, players: PlayerList) {
        this.code = code
        this.players = players
    }
}

interface PlayerList {
    [key: string]: Player
}

export default Lobby