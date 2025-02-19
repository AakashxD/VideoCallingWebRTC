import SocketIOClient from "socket.io-client"
import { createContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
const webServer="http://localhost:5000"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext=createContext<any | null> (null); // create an socket context that can use everywhere 
const socket=SocketIOClient(webServer); // create an socket instance 
interface Props {
    children:React.ReactNode
}
export const SocketProvider:React.FC<Props>=({children})=>{
     const navigate=useNavigate(); // handle navigation
     
     useEffect(()=>{
        function enterRoom({roomID}:{roomID:string}){
                  navigate(`/room/${roomID}`);
        }
        // we will transfer to room page when we collect joined room event from the server 
          socket.on("room-created",enterRoom);
     },[])
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}