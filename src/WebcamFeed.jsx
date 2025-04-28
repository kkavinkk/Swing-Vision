import React, { useRef, useEffect } from 'react';

const WebcamFeed = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ask for webcam access
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        // Set video src to stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam: ", err);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="rounded-2xl shadow-lg w-[640px] h-[480px]"
      />
    </div>
  );
};

export default WebcamFeed;
