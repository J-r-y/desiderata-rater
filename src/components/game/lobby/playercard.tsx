import {default as PlayerType} from "@/classes/Player"
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import "@/app/game.css"
import CardSelect from "@/components/game/lobby/cardSelect";
import {useEffect} from "react";
import {useSocket} from "@/components/provider/socket-provider";

export default function PlayerCard({player, index, callback}: {
    player: PlayerType,
    index: number,
    callback: (playerId: string, card: string) => void
}) {

    const cardCallback = (card: string) => {
        callback(player.id, card)
    }

    return (
        <Card style={{offsetDistance: "calc(" + index + " * 25% - 50%"}} className={"playercard w-md"}>
            <CardHeader>
                <CardTitle className={"text-1xl"}>{player.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardSelect callback={cardCallback}/>
            </CardContent>
        </Card>
    )
}