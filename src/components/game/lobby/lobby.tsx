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

export function Lobby(props: { player: PlayerType, lobby: LobbyType }) {
    const [state, setState] = useState<string>(GameState.SELECT)
    const [player, setPlayer] = useState<PlayerType>(props.player)
    const [lobby, setLobby] = useState<LobbyType>(props.lobby)
    const [players, setPlayers] = useState<PlayerType[]>(lobby.players.filter(p => p.id !== player.id))
    const [allCards, setAllCards] = useState<string[]>([])
    const [cards, setCards] = useState<string[]>([])
    const {socket} = useSocket()

    const selectCard = (card: string) => {
        socket.emit("chose", JSON.stringify({
            card: card,
        }))
    }

    const choseGameCards = (): string[] => {
        const scrambled = allCards.sort(() => Math.random() - 0.5)
        return scrambled.slice(0, 3)
    }

    useEffect(() => {
        fetch("/desideratas.json").then(res => res.json()).then(data => setAllCards(data.list!))
        setCards(choseGameCards())

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
            setCards(choseGameCards())

            console.log(lobby)
        })
    }, [lobby, socket, player, choseGameCards])

    return (
        <div className={"flex flex-col items-center justify-center"}>
            <Card className={"absolute top-5 left-5 min-w-24 gap-2"}>
                <CardHeader>
                    <CardTitle>Punkte</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {lobby.players.sort((a, b) => b.points - a.points).map((player, i) => <li key={i}>{player.name}: {player.points}</li>)}
                    </ul>
                    Lobby Code: {lobby.code}
                </CardContent>
            </Card>
            {{
                select: <CardSelect cards={cards} callback={selectCard}/>,
                game: <Game cards={cards} lobby={lobby}/>,
            }[state]}
        </div>
    )
}
