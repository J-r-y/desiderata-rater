"use client"

import {createContext, ReactNode, useContext} from "react";
import {Socket} from "socket.io-client";

type SocketContextType = {
    socket: Socket
}

const SocketContext = createContext<SocketContextType | null>(null)

export function useSocket(): SocketContextType {
    const context = useContext(SocketContext)
    if (context === null) {
        throw new Error("useSocket must be used within a SocketProvider")
    }
    return context
}

export function SocketProvider({children, socket}: { children: ReactNode, socket: Socket }) {
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}