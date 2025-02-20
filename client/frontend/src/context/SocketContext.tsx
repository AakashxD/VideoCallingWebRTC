import SocketIOClient from "socket.io-client"
import { createContext, useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";
import {v4 as UUIDv5} from "uuid";
import peer, { Peer } from "peerjs"


const webServer="http://localhost:5000"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext=createContext<any | null> (null);

const socket=SocketIOClient(webServer); // create an socket instance 

interface Props {
    children:React.ReactNode
}

export const SocketProvider:React.FC<Props>=({children})=>{
    const [user ,setUser]=useState<peer>();
    const navigate=useNavigate(); 

     useEffect(()=>{
        const userID=UUIDv5();
        const newPeer=new Peer(userID);
        setUser(newPeer);
        function enterRoom({roomID}:{roomID:string}){
                  navigate(`/room/${roomID}`);
        }

        // we will transfer to room page when we collect joined room event from the server 
          socket.on("room-created",enterRoom);
     },[])
    return (
        <SocketContext.Provider value={{socket,user}}>
            {children}
        </SocketContext.Provider>
    )
}