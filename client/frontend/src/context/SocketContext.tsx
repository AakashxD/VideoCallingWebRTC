import SocketIOClient from "socket.io-client"
import { createContext } from "react"
const webServer="http://localhost:5000"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SocketContext=createContext<any | null> (null);
const socket=SocketIOClient(webServer)
interface Props {
    children:React.ReactNode
}
export const SocketProvider:React.FC<Props>=({children})=>{
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}