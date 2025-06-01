"use client"

import {default as LobbyType} from "@/classes/Lobby";
import {default as PlayerType} from "@/classes/Player";
import {useEffect, useState} from "react";
import CardSelect from "@/components/game/lobby/cardSelect";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useSocket} from "@/components/provider/socket-provider";
import Game from "@/components/game/lobby/game";

const GameState = {
    SELECT: "select",
    GAME: "game",
}

export function Lobby({player, lobby}: { player: PlayerType, lobby: LobbyType }) {
    const [state, setState] = useState<string>(GameState.SELECT)
    const [players, setPlayers] = useState<PlayerType[]>(lobby.players.filter(p => p.id !== player.id))
    const {socket} = useSocket()

    useEffect(() => {
        socket.on("startround", (data: string) => {
            const payload = JSON.parse(data)
            lobby = payload.lobby
            setState(GameState.GAME)
        })
    }, [])

    return (
        <div>
            <Card className={"absolute top-5 left-5 min-w-24 gap-2"}>
                <CardHeader>
                    <CardTitle>Punkte</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {lobby.players.map((player, i) => <li key={i}>{player.name}: {player.points}</li>)}
                    </ul>
                </CardContent>
            </Card>
            {{
                select: <CardSelect/>,
                game: <Game players={players}/>,
            }[state]}
        </div>
    )
}
