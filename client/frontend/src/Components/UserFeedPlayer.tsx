import { useEffect, useRef } from "react";

const UserFeedPlayer: React.FC<{ stream?: MediaStream }> = ({ stream }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className="relative w-72 h-72 bg-black rounded-lg overflow-hidden shadow-lg border border-gray-600">
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                autoPlay
                playsInline
            />
            <div className="absolute bottom-2 left-2 bg-gray-900/50 text-white text-xs px-2 py-1 rounded">
                Live Feed
            </div>
        </div>
    );
};

export default UserFeedPlayer;
