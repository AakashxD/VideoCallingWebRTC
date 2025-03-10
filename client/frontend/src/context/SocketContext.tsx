import SocketIOClient from "socket.io-client"
import { createContext, useEffect,useReducer,useState } from "react"
import { useNavigate } from "react-router-dom";
import {v4 as UUIDv5} from "uuid";
import peer, { Peer } from "peerjs"
import { peerReducer} from '../Reducers/peerReducer';
import { addPeerAction } from "../Actions/peerAction";
const webServer="http://localhost:5000"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext=createContext<any | null> (null);

const socket=SocketIOClient(webServer); // create an socket instance 

interface Props {
    children:React.ReactNode
}

export const SocketProvider:React.FC<Props>=({children})=>{
    const [user ,setUser]=useState<peer>();
    const [stream,setStream]=useState<MediaStream>();
    const [peers,dispatch]=useReducer(peerReducer,{}); // peer->state
    const navigate=useNavigate();

    const fetchUserFeed= async()=>{
      const streamVideo=  await navigator.mediaDevices.getUserMedia({video:true,audio:true});
       setStream(streamVideo);

    }
     useEffect(()=>{
        const userID=UUIDv5();
        // creating a peer instance 
        const newPeer=new Peer(userID,{
            host:"localhost",
            port:5000,
            path:"/myapp"
        });

        setUser(newPeer);

        fetchUserFeed();

        const enterRoom=({roomID}:{roomID:string})=>{
                  navigate(`/room/${roomID}`);
        }
        // we will transfer to room page when we collect joined room event from the server 
          socket.on("room-created",enterRoom);
     },[]);
     useEffect(()=>{
              if(!user || !peers || !stream) return ;
           
              socket.on("user-joined",
            ({peerID})=> {
                if (stream) {
                    // all user will call to peerID with there stream
                    // made an call
                    const call = user.call(peerID, stream);
                    console.log("calling peer ID",peerID);
                    call.on("stream",()=>{
                         dispatch(addPeerAction(peerID,stream,))
                    })

                }
              })
              user.on("call",(call)=>{
                // what to do when other peers start calling you when u joined
                console.log("response to call")
                call.answer(stream);
                call.on("stream",()=>{
                        
                })
              })
              socket.emit("ready")
     },[user,peers]);
    return (
        <SocketContext.Provider value={{socket,user,stream}}>
            {children}
        </SocketContext.Provider>
    )
}