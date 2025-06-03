import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormEvent, useState} from "react";
import {useSocket} from "@/components/provider/socket-provider";

export default function Menu() {
    const [name, setName] = useState<string>("")
    const {socket} = useSocket()

    const tryJoin = (e: FormEvent<HTMLButtonElement>) => {
        const code = ((e.target as HTMLButtonElement).previousSibling as HTMLInputElement).value
        const name = (document.getElementById("nameinput") as HTMLInputElement).value
        if (socket) {
            socket.emit("tryJoin", JSON.stringify({
                name: name,
                code: code,
            }))
        }
    }
    return (
        <div className="flex flex-col gap-2 items-center">
            <div className="flex w-full max-w-sm items-center">
                <Input type={"text"} id={"nameinput"} placeholder={"Username"}/>
            </div>
            <div className="flex w-full max-w-sm items-center gap-2">
                <Input type={"text"} placeholder={"Enter Lobby Code"}/>
                <Button type={"submit"} variant={"outline"} onClick={tryJoin}>
                    Join Lobby
                </Button>
            </div>
        </div>
    )
}