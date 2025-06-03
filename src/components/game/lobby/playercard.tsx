import {default as PlayerType} from "@/classes/Player"
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import "@/app/game.css"
import CardSelect from "@/components/game/lobby/cardSelect";

export default function PlayerCard({player, index}: { player: PlayerType, index: number }) {

    return (
        <Card style={{offsetDistance: "calc(" + index + " * 25% - 50%"}} className={"playercard w-md"}>
            <CardHeader>
                <CardTitle className={"text-1xl"}>{player.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardSelect callback={() => {}}/>
            </CardContent>
        </Card>
    )
}