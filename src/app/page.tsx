"use client"

import {FormEvent, useEffect, useState} from "react"
import io, {Socket} from "socket.io-client"
import Lobby from "@/classes/Lobby"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {SocketProvider, useSocket} from "@/components/socket-provider";
import Menu from "@/app/menu";

export default function Home() {
    const [lobby, setLobby] = useState<Lobby>()
    const [socket, setSocket] = useState<Socket>()
    const router = useRouter()
    // const {socket} = useSocket()

    useEffect(() => {
        const socket = io("ws://localhost:3000")
        setSocket(socket)
        socket.on("connect", () => {
            console.log("connected to server")
        })

        return () => {
            socket.close()
        }
    }, [])


    return (
        <SocketProvider socket={socket!}>
            <div
                className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    <Menu />
                </main>
            </div>
        </SocketProvider>
    );
}
