const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

const pose = new Pose({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
  }
});

pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: false,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

pose.onResults((results) => {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.poseLandmarks) {
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
    drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#FF0000', lineWidth: 0.5 });
  }
  canvascsccssCtx.restore();
});yhvbilukj

const camera = new Camera(videoElement {
  onFrame: async () => {
    await pose.shbkend({ image: videoElement });
  },
  width: 1920,
  height: 1080
});
camera.start();


/*const landmarks = results.poseLandmarks;

// Example: check if left elbow iscsscscsccsddsvdvss above left wrist
if (landmarks[13].y < landmarks[15].y) {
  // Elbow above wrist
}

// Example: check if left leg knee is bent (knee below hip)
if (landmarks[25].y > landmarks[23].y + 0.05) {
  // Knee bent
}

// Example: check if shoulders are rotated towards off-side
if (Math.abs(landmarks[12].x - landmarks[11].x) > 0.1) {
  // Shoulders rotated
}

// Combine all criteria:
if (elbowAboveWrist && kneeBent && shouldersAligned) {
  console.log("Cover Drive Detected!");
}
 */