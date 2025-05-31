"use client"

import {MouseEvent, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {default as LobbyType} from "@/classes/Lobby";

export function Lobby({lobby}: { lobby: LobbyType }) {
    const [desideratas, setDesideratas] = useState<string[]>([])
    const [selected, setSelected] = useState<string>("")

    const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
        const desiderata = (e.currentTarget as HTMLButtonElement).innerText
        setSelected(desiderata)
    }

    useEffect(() => {
        fetch("/desideratas.json").then(res => res.json()).then(data => setDesideratas(data.list!))
    }, []);

    return (
        <div className={"flex flex-col items-center justify-center w-full h-full"}>
            <div className={"absolute"}>
                {lobby.players.map(player => <div key={player.id}>{player.name}</div>)}
            </div>
            <div className={"flex w-9/12 h-1/2 gap-2 content-center justify-center flex-wrap"}>
                {desideratas!.map((desiderata, i) => <Button key={i} onClick={handleAdd}
                                                             className={"text-3xl h-12"}>{desiderata}
                </Button>)}
            </div>
            <div>
                {selected.length
                    ? <Button onClick={() => setSelected("")} className={"text-3xl h-12"}>{selected}</Button>
                    : ""}
            </div>
        </div>
    )
}
