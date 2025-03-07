export const ADD_USER="ADD_USER" as const;
export const REMOVE_USER="REMOVE_USER" as const;

export const addPeerAction=(peerID:string,stream:MediaStream)=>({
   type:ADD_USER,
   payload:{
    peerID,stream
   }
})
export const removePeerAction=(peerID:string)=>({
    type:REMOVE_USER,
    payload:{
     peerID
    }
 })
 