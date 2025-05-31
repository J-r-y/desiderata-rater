"use client"

import {FormEvent, useEffect, useState} from "react"
import io, {Socket} from "socket.io-client"
import Lobby from "@/classes/Lobby"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

export default function Home() {
    const [lobby, setLobby] = useState<Lobby>()
    const [lobbyState, setLobbyState] = useState<string>("")
    const [socket, setSocket] = useState<Socket>()
    const [name, setName] = useState<string>("")

    useEffect(() => {
        const socket = io("ws://localhost:3000")
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
    }, [])

    const tryJoin = (e: FormEvent<HTMLButtonElement>) => {
        const code = ((e.target as HTMLButtonElement).previousSibling as HTMLInputElement).value
        if (socket) {
            socket.emit("tryJoin", JSON.stringify({
                name: name,
                code: code,
            }))
        }
    }

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div className="flex w-full max-w-sm items-center gap-2">
                    <Input type={"text"} placeholder={"Username"} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="flex w-full max-w-sm items-center gap-2">
                    <Input type={"text"} placeholder={"Enter Lobby Code"}/>
                    <Button type={"submit"} variant={"outline"} onClick={tryJoin}>
                        Join Lobby
                    </Button>
                </div>
                <ol
                    className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    <li className="mb-2 tracking-[-.01em]">
                        {lobby ? "You are in Lobby: " + lobby.code : "You are currently not in a lobby"}
                    </li>
                </ol>
            </main>
        </div>
    );
}
