import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent, DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {DialogDescription} from "@radix-ui/react-dialog";

const unselectedStyle = "text-xl h-12 " + "shadow-sm shadow-zinc-800"
const selectedStyle = "text-xl h-12 " + "bg-zinc-800/50 shadow-[inset_0_0_4px_2px_rgba(255,255,255,30%)]"

export default function CardSelect({ cards, callback }: { cards: string[], callback: (card: string) => void}) {
    const [selected, setSelected] = useState<string>("")

    const selectCard = () => {
        callback(selected)
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={selected.length > 0 ? "default" : "outline"} className={"text-3xl h-12 cursor-pointer"}>{selected.length > 0 ? selected : "Desiderata auswählen"}</Button>
            </DrawerTrigger>
            <DrawerContent className={"flex flex-col gap-10 items-center justify-center w-50vw"}>
                <DrawerHeader>
                    <DrawerTitle className={"text-3xl"}>Desiderata auswählen</DrawerTitle>
                </DrawerHeader>
                <DrawerDescription></DrawerDescription>
                <div className={"flex gap-2 content-center justify-center flex-wrap"}>
                    {cards.map((desiderata, i) => <Button key={i} variant={"secondary"}
                                                                 onClick={(e) => setSelected(e.currentTarget.innerText)}
                                                                 className={selected == desiderata ? selectedStyle : unselectedStyle}>{desiderata}</Button>
                    )}
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant={"default"} className={"text-3xl p-6 shadow-md shadow-white"}
                                onClick={selectCard}>Auswählen</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
        // <Dialog>
        //     <DialogTrigger asChild>
        //         <Button variant={"outline"} className={"text-3xl h-12 cursor-pointer"}>Desiderata auswählen</Button>
        //     </DialogTrigger>
        //     <DialogContent className={"flex flex-col gap-10 items-center justify-center w-50vw"}>
        //         <DialogHeader>
        //             <DialogTitle className={"text-3xl"}>Desiderata auswählen</DialogTitle>
        //         </DialogHeader>
        // <DialogDescription></DialogDescription>
        //         <div className={"flex gap-2 content-center justify-center flex-wrap"}>
        //             {desideratas!.map((desiderata, i) => <Button key={i} variant={"secondary"}
        //                                                          onClick={(e) => setSelected(e.currentTarget.innerText)}
        //                                                          className={selected == desiderata ? selectedStyle : unselectedStyle}>{desiderata}</Button>
        //             )}
        //         </div>
        //         <DialogFooter>
        //             <DialogClose asChild>
        //                 <Button variant={"default"} className={"text-3xl p-6 shadow-md shadow-white"}
        //                         onClick={selectCard}>Auswählen</Button>
        //             </DialogClose>
        //         </DialogFooter>
        //     </DialogContent>
        // </Dialog>
    )
}