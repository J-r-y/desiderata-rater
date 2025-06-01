"use client"

import {default as LobbyType} from "@/classes/Lobby";
import {useEffect, useState} from "react";
import CardSelect from "@/components/game/lobby/cardSelect";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useSocket} from "@/components/provider/socket-provider";
import Game from "@/components/game/lobby/game";

const GameState =  {
    SELECT: "select",
    GAME: "game",
}

export function Lobby({lobby}: { lobby: LobbyType }) {
    const [state, setState] = useState<string>(GameState.SELECT)
    const {socket} = useSocket()

    useEffect(() => {
        socket.on("startgame", (data: string) => {
            const payload = JSON.parse(data)
            setState(GameState.GAME)
        })
    })

    return (
        <div>
            <Card className={"absolute top-5 left-5 min-w-24 gap-2"}>
                <CardHeader>
                    <CardTitle>Punkte</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {lobby.players.map(player => <li key={player.id}>{player.name}: {player.points}</li>)}
                    </ul>
                </CardContent>
            </Card>
            {{
                select: <CardSelect />,
                game: <Game />,
            }[state]}
        </div>
    )
}
