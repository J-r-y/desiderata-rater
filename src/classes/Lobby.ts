import Player from "@/classes/Player";

class Lobby {
    code: string
    players: Player[]

    constructor(code: string, players: Player[]) {
        this.code = code
        this.players = players
    }

    addPlayer(player: Player) {
        this.players.push(player)
    }

    removePlayer(playerId: string) {
        this.players = this.players.filter(p => p.id !== playerId)
    }
}

interface PlayerList {
    [key: string]: Player
}

export default Lobby