import SocketIOClient from "socket.io-client"
import { createContext } from "react"
const webServer="http://localhost:5000"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext=createContext<any | null> (null); // create an socket context that can use everywhere 
const socket=SocketIOClient(webServer); // create an socket instance 
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