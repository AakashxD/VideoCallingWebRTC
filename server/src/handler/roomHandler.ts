import { Socket } from "socket.io";
import { v4 as UUIDv5 } from 'uuid';

const roomHandler=(socket:Socket)=>{
    function createRoom(){
        const roomID=UUIDv5(); // create a random string for room id
        socket.join(roomID);  // this will make the socket instance join the room
        socket.emit("room-created",{roomID}); // emit to client that room is created with roomID
        console.log("room is created with ID: "+roomID);
    }
    function joinRoom(){
        console.log("join the room");

    }
   socket.on("create-room",createRoom);
   socket.on("joined-room",joinRoom);
}
export default roomHandler;