import { useParams } from 'react-router-dom'
import { useEffect ,useContext} from 'react';
import { SocketContext } from '../context/SocketContext';

const Room = () => {
    const {id} =useParams();
    const {socket,user}=useContext(SocketContext);
    const fetchParticipants=({roomID,participants}:{roomID:string,participants:string[]})=>{            console.log("fetch participantss");
               console.log("room Id",roomID," participants",participants)
    } 
    useEffect(()=>{
      // anyone is added so that server or anyone knows that someone is added
         if(user){ 
          console.log("user joineed with id",user._id);
          socket.emit("joined-room",{roomID:id,peerID:user._id});
          socket.on("get-users",fetchParticipants);
        }
    },[id,socket,user]);
  return (
    <div>Room {id}</div>
  )
}
export default Room;