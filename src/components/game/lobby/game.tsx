import PlayerCard from "@/components/game/lobby/playercard";
import {default as PlayerType} from "@/classes/Player"

export default function Game({players}: { players: PlayerType[] }) {
    return (
        <div>
            {players.map(((player, i) => <PlayerCard key={i} index={i} player={player}/>))}
        </div>
    )
}