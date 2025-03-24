import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import UserFeedPlayer from "../Components/UserFeedPlayer";

const Room = () => {
    const { id } = useParams();
    const { socket, user, stream, peers } = useContext(SocketContext);
    const [participants, setParticipants] = useState<string[]>([]);

    useEffect(() => {
        if (!socket || !user) return;

        console.log("User joined with ID:", user._id);
        socket.emit("joined-room", { roomID: id, peerID: user._id });

        const fetchParticipants = ({ roomID, participants }: { roomID: string; participants: string[] }) => {
            console.log("Fetched participants for room:", roomID, participants);
            setParticipants(participants);
        };

        socket.on("get-users", fetchParticipants);

        return () => {
            socket.off("get-users", fetchParticipants);
        };
    }, [id, socket, user]);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            {/* Room Title */}
            <h1 className="text-2xl font-semibold text-center mb-6">
                Room <span className="text-blue-400">#{id}</span>
            </h1>

            {/* Video Feeds (Grid Layout for Equal Sizing) */}
            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* My Feed */}
                <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-lg font-medium mb-2">My Feed</h2>
                    {stream ? (
                        <UserFeedPlayer stream={stream} />
                    ) : (
                        <p className="text-gray-400">Loading your video...</p>
                    )}
                </div>

                {/* Others' Feeds */}
                {Object.keys(peers).length === 0 ? (
                    <p className="text-gray-400 text-center col-span-full">No peers yet...</p>
                ) : (
                    Object.keys(peers).map((peerID) => (
                        <div key={peerID} className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg">
                            <h2 className="text-lg font-medium mb-2">Peer</h2>
                            <UserFeedPlayer stream={peers[peerID]?.stream} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Room;
