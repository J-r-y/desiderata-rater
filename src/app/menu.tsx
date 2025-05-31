import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormEvent, useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import Lobby from "@/classes/Lobby";
import {toast} from "sonner";
import {useSocket} from "@/components/socket-provider";

export default function Menu() {
    const [lobby, setLobby] = useState<Lobby>()
    const [name, setName] = useState<string>("")
    const router = useRouter()
    const {socket} = useSocket()

    useEffect(() => {
        if (socket)
            socket.on("join", (data: string) => {
                const payload = JSON.parse(data)
                if (payload.lobby) {
                    setLobby(payload.lobby)
                    console.log(payload.lobby)
                    toast("Joined Lobby", {description: payload.lobby.code})
                    router.push("/lobby")
                } else {
                    toast("Invalid Lobby Code")
                }
            })
    }, [socket])

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
        <div>
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
        </div>
    )
}