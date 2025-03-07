import { ADD_USER,REMOVE_USER } from "../Actions/peerAction";
// peerID , stream
export type peerState=Record<string ,{stream:MediaStream}>;
type peerAction={
    type: typeof ADD_USER,
    payload:{
     peerID:string,stream:MediaStream
    }
} | {
    type: typeof REMOVE_USER,
    payload:{
     peerID:string
    }
}
export const peerReducer=(state:peerState,action:peerAction)=>{
      switch(action.type){
        case ADD_USER:
            return {
                ...state,
                [action.payload.peerID]:{
                    stream:action.payload.stream
                }
            }

        case REMOVE_USER:
           { const { [action.payload.peerID]: _, ...newState } = state; // Remove peer from state
            return newState;
        }
    //   case TOGGLE_CONNECTION:
    //   return { ...state, isConnected: !state.isConnected };
    //   case SET_PERMISSIONS:
    //     return { ...state, permissions: action.payload };
        default :
            return {...state}
      }
}