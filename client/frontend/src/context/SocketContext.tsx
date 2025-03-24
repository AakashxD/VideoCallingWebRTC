import SocketIOClient from "socket.io-client";
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as UUIDv4 } from "uuid";
import Peer from "peerjs";
import { peerReducer } from "../Reducers/peerReducer";
import { addPeerAction } from "../Actions/peerAction";

const webServer = "http://localhost:5000";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext = createContext<any | null>(null);

const socket = SocketIOClient(webServer); // Create a socket instance

interface Props {
    children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<Peer | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [peers, dispatch] = useReducer(peerReducer, {}); // peer->state
    const navigate = useNavigate();

    const fetchUserFeed = async () => {
        try {
            const streamVideo = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(streamVideo);
        } catch (error) {
            console.error("Error accessing camera/microphone:", error);
        }
    };

    useEffect(() => {
        const userID = UUIDv4();
        console.log("Generated userID:", userID);

        // Creating a peer instance
        const newPeer = new Peer(userID, {
            host: "192.168.x.x",  // Replace with your local IP
            port: 9000,
            path: "/myapp",
            secure: false, // Important! Ensure it's `false` if using HTTP
            config: {
                iceServers: [
                    { urls: "stun:stun.l.google.com:19302" },
                    { urls: "stun:stun1.l.google.com:19302" },
                ],
            },
        });

        console.log("New peer created:", newPeer);
        setUser(newPeer);

        fetchUserFeed();

        // Redirect to room when created
        const enterRoom = ({ roomID }: { roomID: string }) => {
            navigate(`/room/${roomID}`);
        };

        socket.on("room-created", enterRoom);

        return () => {
            socket.off("room-created", enterRoom);
        };
    }, []);

    useEffect(() => {
        if (!user || !stream) return;

        socket.on("user-joined", ({ peerID }) => {
            console.log("New user joined:", peerID);
            
            const call = user.call(peerID, stream);
            console.log("Calling peer:", peerID);

            call.on("stream", (peerStream) => {
                console.log(`Receiving stream from ${peerID}`);
                dispatch(addPeerAction(peerID, peerStream));
            });

            call.on("close", () => {
                console.log("Call closed with peer:", peerID);
                dispatch(addPeerAction(peerID, null)); // Remove peer from state
            });
        });

        user.on("call", (call) => {
            console.log("Receiving call from:", call.peer);
            call.answer(stream);

            call.on("stream", (peerStream) => {
                console.log("Stream received from", call.peer);
                dispatch(addPeerAction(call.peer, peerStream));
            });

            call.on("close", () => {
                console.log("Call closed from:", call.peer);
                dispatch(addPeerAction(call.peer, stream));
            });
        });

        socket.emit("ready");

        return () => {
            socket.off("user-joined");
        };
    }, [user, stream]);

    return (
        <SocketContext.Provider value={{ socket, user, stream, peers }}>
            {children}
        </SocketContext.Provider>
    );
};
