import {Input} from "@/components/ui/input";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {FormEvent, useState} from "react";
import {useSocket} from "@/components/provider/socket-provider";

export default function Menu() {
    const [name, setName] = useState<string>("")
    const [code, setCode] = useState<string>("")
    const {socket} = useSocket()

    const tryJoin = (e: FormEvent<HTMLButtonElement>) => {
        const name = (document.getElementById("nameinput") as HTMLInputElement).value
        if (socket) {
            socket.emit("tryJoin", JSON.stringify({
                name: name,
                code: code,
            }))
        }
    }

    const createLobby = () => {
        if (socket) {
            socket.emit("createlobby", JSON.stringify({
                name: name,
            }))
        }
    }

    return (
        <div className="flex flex-col gap-2 items-center">
            {/* <Image className={"rounded-xl shadow-[0_0_1rem_10px_#222831] absolute top-1/5 left-1/2 w-[500px] h-[300px] transform -translate-1/2"} alt={"logo"} src={"/logo.svg"}/> */}
            <div className="flex w-full max-w-sm items-center">
                <Input type={"text"} id={"nameinput"} placeholder={"Name"}/>
            </div>
            <div className="flex w-full max-w-sm items-center gap-2">
                <Input type={"text"} onChange={setCode} value={code} placeholder={"Lobby Code eingeben"}/>
                <Button type={"submit"} variant={"outline"} onClick={tryJoin}>
                    Lobby beitreten
                </Button>
            </div>
            <Button variant={"outline"} onClick={createLobby}>
                Neue Lobby erstellen
            </Button>
        </div>
    )
}