"use client"

import PlayerCard from "@/components/game/lobby/playercard";
import {default as LobbyType} from "@/classes/Lobby"
import {default as PlayerType} from "@/classes/Player"
import {useState} from "react";
import {useSocket} from "@/components/provider/socket-provider";
import {Button} from "@/components/ui/button";

export default function Game({lobby}: { lobby: LobbyType }) {
    const {socket} = useSocket()
    const [players, setPlayers] = useState<PlayerType[]>(lobby.players.filter(p => p.id !== socket.id))
    const [canSubmit, setCanSubmit] = useState<boolean>(false);
    const [guesses, setGuesses] = useState<{[playerId: string]: string}>({});

    const submit = () => {
        let score = 0
        for (const player of players) {
            if (player.card === guesses[player.id]) score++
        }
        socket.emit("updatescore", JSON.stringify({
            score: score
        }))
    }

    const chose = (playerId: string, guess: string) => {
        guesses[playerId] = guess
        if (Object.keys(guesses).length === players.length) setCanSubmit(true)
    }

    return (
        <div>
            {players.map(((player, i) => <PlayerCard key={i} index={i} player={player} callback={chose}/>))}
            {canSubmit ? <Button className={"absolute left-1/2 bottom-1/4 transform translate-1/2"} variant={"outline"} onClick={submit}>Tipps abschicken</Button> : ""}
        </div>
    )
}