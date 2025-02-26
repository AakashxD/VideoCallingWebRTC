import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
const CreateRoom:React.FC =()=>{
    const {socket}=useContext(SocketContext);

    const init=()=>{
        console.log("init the room creation process");
          socket.emit("create-room");
    }
    return(
        <>
        <div className="flex flex-col">
        <h1 className="text-yellow-50"> Create Your own video chat room</h1>
        <button onClick={init} className=" text-amber-200 border-b-blue-500 h-10 w-39 bg-blue-800 rounded-lg flex  justify-center items-center"> Create room</button>
        </div>
        </>
    )
}
export default CreateRoom;