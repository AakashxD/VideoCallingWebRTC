import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
const CreateRoom:React.FC =()=>{
    const {socket}=useContext(SocketContext);

    const init=()=>{
        console.log("init the room creation process");
          socket.emit("create-room");
    }
    
    return(
        <button onClick={init} className=" text-amber-200 border-b-blue-500 bg-amber-800"> Create a video room</button>
    )
}
export default CreateRoom;