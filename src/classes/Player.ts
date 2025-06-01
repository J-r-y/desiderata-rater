class Player {
    name: string
    id: string
    card: string
    points: number

    constructor(name: string, id: string, card: string, points: number) {
        this.name = name
        this.id = id
        this.card = card
        this.points = points
    }
}

export default Player