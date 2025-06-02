"use client"

import {useEffect, useState} from "react"
import io, {Socket} from "socket.io-client"
import {default as LobbyType} from "@/classes/Lobby"
import {default as PlayerType} from "@/classes/Player";
import {Lobby} from "@/components/game/lobby/lobby"
import {toast} from "sonner";
import {SocketProvider} from "@/components/provider/socket-provider";
import Menu from "@/components/game/menu";

export default function Home() {
    const [socket, setSocket] = useState<Socket>()
    const [lobby, setLobby] = useState<LobbyType>()
    const [player, setPlayer] = useState<PlayerType>()


    useEffect(() => {
        const socket = io()
        setSocket(socket)
        socket.on("connect", () => {
            console.log("connected to server")
        })

        socket.on("join", (data: string) => {
            const payload = JSON.parse(data)
            if (payload.lobby) {
                setLobby(payload.lobby)
                setPlayer(payload.player)
                console.log(payload.lobby)
                toast("Joined Lobby", {description: payload.lobby.code})
            } else {
                toast("Invalid Lobby Code")
            }
        })
        // const cplayer = new PlayerType("Jry", "id_", "", "", 0)
        // setPlayer(cplayer)
        // setLobby(new LobbyType("123", [cplayer, new PlayerType("Dummy 1", "id_1", "", "", 10),
        //     new PlayerType("Dummy 2", "id_2", "", "", 5), new PlayerType("Dummy 3", "id_3", "", "", 0)]))

        return () => {
            socket.close()
        }
    }, [])

    return (
        <SocketProvider socket={socket!}>
            <div
                className="flex flex-col place-content-center w-screen h-screen p-7 pb-20 gap-16 sm:p-20">
                {/*<main className="flex flex-col gap-[32px] w-1/2 h-1/2 row-start-2 items-center sm:items-start">*/}
                    {lobby == null ? <Menu/> : <Lobby player={player!} lobby={lobby!}/>}
                {/*</main>*/}
            </div>
        </SocketProvider>
    );
}
