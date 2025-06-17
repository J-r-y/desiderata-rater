import Player from "@/classes/Player";
import {list} from "@/data/desideratas.json"

class Lobby {
    code: string
    cards: string[]
    players: Player[]

    constructor(code: string, players: Player[]) {
        this.code = code
        this.players = players
        this.cards = []
        this.scrambleCards()
    }

    addPlayer(player: Player) {
        this.players.push(player)
    }

    removePlayer(playerId: string) {
        this.players = this.players.filter(p => p.id !== playerId)
    }

    scrambleCards() {
        const scrambled = list.sort(() => Math.random() - 0.5)
        this.cards = scrambled.slice(0, 4)
    }
}

interface PlayerList {
    [key: string]: Player
}

export default Lobby