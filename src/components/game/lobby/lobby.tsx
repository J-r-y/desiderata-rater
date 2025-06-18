"use client"

import {default as LobbyType} from "@/classes/Lobby";
import {default as PlayerType} from "@/classes/Player";
import {useEffect, useState} from "react";
import CardSelect from "@/components/game/lobby/cardSelect";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useSocket} from "@/components/provider/socket-provider";
import Game from "@/components/game/lobby/game";

const GameState = {
    SELECT: "select",
    GAME: "game",
}

export function Lobby(props: { player: PlayerType, lobby: LobbyType }) {
    const [state, setState] = useState<string>(GameState.SELECT)
    const [player, setPlayer] = useState<PlayerType>(props.player)
    const [lobby, setLobby] = useState<LobbyType>(props.lobby)
    const [players, setPlayers] = useState<PlayerType[]>(lobby.players.filter(p => p.id !== player.id))
    const [cards, setCards] = useState<string[]>([])
    const [showPoints, setShowPoints] = useState<boolean>(true)
    const {socket} = useSocket()

    const selectCard = (card: string) => {
        socket.emit("chose", JSON.stringify({
            card: card,
        }))
    }

    useEffect(() => {
        setCards(lobby.cards)

        const filterPlayers = (players: PlayerType[]) => {
            setPlayers(players.filter(p => p.id !== player.id))
        }

        socket.on("startround", (data: string) => {
            const payload = JSON.parse(data)
            setLobby(payload.lobby)
            filterPlayers(lobby.players)
            setState(GameState.GAME)
        })

        socket.on("restart", (data: string) => {
            const payload = JSON.parse(data)
            setLobby(payload.lobby)
            filterPlayers(lobby.players)
            setState(GameState.SELECT)
            setCards(payload.lobby.cards)
        })
    }, [lobby, socket, player])

    return (
        <div className={"flex flex-col w-screen h-screen items-center justify-center"}>
            <Card className={"absolute top-5 left-5 min-w-24 gap-2"} onClick={() => setShowPoints(!showPoints)}>
                <CardHeader>
                    <CardTitle>Punkte</CardTitle>
                </CardHeader>
                {showPoints ? <>
                    <CardDescription className={"pl-6 pr-6 mt-0 pt-0"}>
                        Lobby Code: {lobby.code}
                    </CardDescription>
                    <CardContent>
                        <ul>
                            {lobby.players.sort((a, b) => b.points - a.points).map((player, i) =>
                                <li key={i}>{player.name}: {player.points}</li>)}
                        </ul>
                    </CardContent>
                </> : ""}
            </Card>
            {{
                select: <CardSelect cards={cards} callback={selectCard}/>,
                game: <Game cards={cards} lobby={lobby}/>,
            }[state]}
        </div>
    )
}
