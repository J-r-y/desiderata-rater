class Player {
    name: string
    id: string
    lobbyCode: string
    card: string
    points: number

    constructor(name: string, id: string, lobbyCode: string, card: string, points: number) {
        this.name = name
        this.id = id
        this.lobbyCode = lobbyCode
        this.card = card
        this.points = points
    }
}

export default Player