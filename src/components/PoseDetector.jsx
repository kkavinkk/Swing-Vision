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
    })
}