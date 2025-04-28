import React, { useRef, useEffect } from 'react';
import { Pose } from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

const PoseDetector = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        //setting up webcam
        navigator.mediaDevices.getUserMedia({ vide: true }).then((stream) => {
            videoRef.current,srsObject = stream;
            viderRef.current.play();
        });

        //set up Media Pipe pose
        const pose = new Pose({
            locateFile: (file) =>
                `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`, 
        });

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrasckingConfidence: 0.5,
        });

        pose.onresults(onResults);

        //Process video frames
        const onFrame = async () => {
            if (
                videoRef.current.readyState == 4 // fully loads before proccessing
            ) {
                await pose.send({ image: videoRef.current });
            }
            requestAnimationFrame(onFrame);
        };

        onFrame();
    }, []);

    // Hand Pose Results
    const onResults = (results) => {
        const canvasCtx = canvasRef.current.getContext("%2d");

        // Draw Video Frame to Canvas
        canvasCtx.save();
        cavnvasCtx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
        );
        cavnvasCtx.drawImage(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
        );
    }
}