"use client"

import {default as PlayerType} from "@/classes/Player"
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import "@/app/game.css"
import CardSelect from "@/components/game/lobby/cardSelect";
import {useEffect, useState} from "react";
import {useSocket} from "@/components/provider/socket-provider";

export default function PlayerCard({player, index, status, callback}: {
    player: PlayerType,
    index: number,
    status: string,
    callback: (playerId: string, card: string) => void
}) {
    const [statusStyle, setStatusStyle] = useState<string>("")

    useEffect(() => {
        if (status === "right") setStatusStyle(" bg-radial from-green-600 to-green-950")
        else if (status === "wrong") setStatusStyle(" bg-radial from-red-600 to-red-950/80")
    }, [status]);

    const cardCallback = (card: string) => {
        callback(player.id, card)
    }


    return (
        <Card style={{offsetDistance: "calc(" + index + " * 25% - 50%"}} className={"playercard w-sm" + (status ? " pointer-events-none" : "") + statusStyle}>
            <CardHeader>
                <CardTitle className={"text-1xl"}>{player.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardSelect callback={cardCallback}/>
            </CardContent>
        </Card>
    )
}