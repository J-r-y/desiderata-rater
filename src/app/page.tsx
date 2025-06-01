"use client"

import {useEffect, useState} from "react"
import io, {Socket} from "socket.io-client"
import {default as LobbyType} from "@/classes/Lobby"
import {Lobby} from "@/components/game/lobby/lobby"
import {toast} from "sonner";
import {SocketProvider} from "@/components/provider/socket-provider";
import Menu from "@/components/game/menu";
import Player from "@/classes/Player";

export default function Home() {
    const [socket, setSocket] = useState<Socket>()
    const [lobby, setLobby] = useState<LobbyType>()

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
                console.log(payload.lobby)
                toast("Joined Lobby", {description: payload.lobby.code})
            } else {
                toast("Invalid Lobby Code")
            }
        })
        setLobby(new LobbyType("123", [new Player("Jry", "id_", "", 0), new Player("Dummy", "id_2", "", 10)]))

        return () => {
            socket.close()
        }
    }, [])


    return (
        <SocketProvider socket={socket!}>
            <div
                className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center w-screen h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    {lobby == null ? <Menu /> : <Lobby lobby={lobby}/>}
                </main>
            </div>
        </SocketProvider>
    );
}
