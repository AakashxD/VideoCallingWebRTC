import { Socket } from "socket.io";
import { v4 as UUIDv5 } from 'uuid';
import IRoomParams from "../interfaces/IRoomParams";
      // [roomId]:[u1,u2,u3]
const rooms:Record<string,string[]>={};
const roomHandler=(socket:Socket)=>{

    function createRoom(){
        const roomID=UUIDv5();
        // this will make the socket instance join the room
        socket.join(roomID);
        rooms[roomID]=[];
        // emit to client that room is created with roomID
        socket.emit("room-created",{roomID});
        console.log("room is created with ID: "+roomID);
    }
    function joinRoom({roomID,peerID}:IRoomParams){
        // moment new user join added to roomID
        if(peerID){
            rooms[roomID].push(peerID);
        }
        console.log("join the room with ID",roomID ,"with ID ",peerID);
        socket.join(roomID);
        socket.emit("get-users",{
           roomID,
           participants:rooms[roomID]
        })
        socket.on("ready",()=>{
            // for the fronted once someone joins the room we will emit the ready event
            // in below line we are emiting a msg to everyone in the roomID that a new user joineed with peerID
            
            socket.to(roomID).emit("user-joined",{peerID});
        })
        
    }
   socket.on("create-room",createRoom);
   socket.on("joined-room",joinRoom);
}
export default roomHandler;