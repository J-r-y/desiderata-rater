"use client"

import PlayerCard from "@/components/game/lobby/playercard";
import {default as LobbyType} from "@/classes/Lobby"
import {default as PlayerType} from "@/classes/Player"
import {useEffect, useState} from "react";
import {useSocket} from "@/components/provider/socket-provider";
import {Button} from "@/components/ui/button";

export default function Game({lobby, cards}: { lobby: LobbyType, cards: String[] }) {
    const {socket} = useSocket()
    const [players, setPlayers] = useState<PlayerType[]>(lobby.players.filter(p => p.id !== socket.id))
    const [canSubmit, setCanSubmit] = useState<boolean>(false);
    const [guesses, setGuesses] = useState<{ [playerId: string]: string }>({});
    const [stati, setStati] = useState<{ [playerId: string]: string }>({});

    useEffect(() => {
        setStati({})
        setGuesses({})
    }, [])

    const submit = () => {
        let score = 0
        for (const player of players) {
            if (player.card === guesses[player.id]) {
                stati[player.id] = "right";
                score++
            } else {
                stati[player.id] = "wrong";
            }
        }
        setCanSubmit(false);
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
            {players.map(((player, i) => <PlayerCard key={i} index={i} player={player} status={stati[player.id]} cardOptions={cards} callback={chose}/>))}
            {canSubmit ? <Button
                className={"focus:bg-zinc-600 cursor-pointer shadow-[0_0_0.5rem_#ddd] text-3xl p-8 absolute left-1/2 bottom-1/5 transform -translate-1/2"}
                variant={"default"} onClick={submit}>Tipps abschicken</Button> : ""}
        </div>
    )
}