import React, { useRef, useEffect } from "react";
import { Pose } from "@mediapipe/pose";

const PoseDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Move this here
  const onResults = (results) => {
    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    if (results.poseLandmarks) {
      drawConnectors(canvasCtx, results.poseLandmarks, Pose.POSE_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 3,
      });
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: "#FF0000",
        lineWidth: 2,
      });
    }
    canvasCtx.restore();
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    });

    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);

    const onFrame = async () => {
      if (videoRef.current.readyState === 4) {
        await pose.send({ image: videoRef.current });
      }
      requestAnimationFrame(onFrame);
    };

    onFrame();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative w-[640px] h-[480px]">
      <video ref={videoRef} className="hidden" />
      <canvas ref={canvasRef} width={640} height={480} className="rounded-2xl shadow-lg" />
    </div>
  );
  // run through pose detection here
};

export default PoseDetector;
