import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { fetchLocation } from './utils';

function WebcamImage() {
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  // fetch status
  const checkin = localStorage.getItem("checkin") ?? false;

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    // IMAGE
    // DATETIME
    // LOCATION

    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);

    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const location = await fetchLocation({
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5000
    });
    console.log(`Latitude: ${location.lat}, Longitude: ${location.long}`);

    localStorage.setItem("checkin",!checkin);
  }, [webcamRef]);

  return (
    <div className="Container">
      {img === null ? (
        <>
          <Webcam
            audio={false}
            mirrored={true}
            height={400}
            width={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture photo</button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" />
          <button onClick={() => setImg(null)}>Retake</button>
        </>
      )}
    </div>
  );
}

export default WebcamImage; 