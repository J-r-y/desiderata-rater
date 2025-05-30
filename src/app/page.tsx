"use client"

import {useEffect, useState} from "react"
import io from "socket.io-client"
import Lobby from "@/classes/Lobby"
import EVENT_TYPE from "@/classes/EventType";

export default function Home() {
    const [lobby, setLobby] = useState<Lobby>()

    useEffect(() => {
        const socket = io()

        socket.on("connect", () => {
            console.log("connected to server")
        })

        socket.on("message", (data: string) => {
            const parsedData = JSON.parse(data)
            if (parsedData.type === EVENT_TYPE.INITIAL_DATA) {
                setLobby(parsedData.payload)
            }
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
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
