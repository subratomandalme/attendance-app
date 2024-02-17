import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { fetchLocation } from './locationFetch'; // Ensure this path matches where your fetchLocation function is defined

const WebcamImage = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: null, long: null });
  const [dateTime, setDateTime] = useState('');
  const [error, setError] = useState(null);

  const captureAndFetchLocation = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);

    // Fetch and display the location
    fetchLocation().then(location => {
      setUserLocation(location);
      setError(null);
    }).catch(err => {
      setError(err);
    });

    // Get and display the current date and time
    const now = new Date();
    const formattedDateTime = now.toLocaleString(); // Formats date and time based on the user's locale
    setDateTime(formattedDateTime);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div>
        {imgSrc ? (
          <img src={imgSrc} alt="Captured" style={{ maxWidth: '100%', height: 'auto' }} />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
      </div>
      <button onClick={captureAndFetchLocation} style={{ marginTop: '20px' }}>Capture</button>
      {dateTime && <p>Date & Time: {dateTime}</p>}
      {userLocation.lat && userLocation.long && (
        <p>
          Latitude: {userLocation.lat}<br />
          Longitude: {userLocation.long}
        </p>
      )}
      {error && <p>Error: {error}</p>}
      {imgSrc && <button onClick={() => setImgSrc(null)} style={{ marginTop: '10px' }}>Retake Photo</button>}
    </div>
  );
};

export default WebcamImage;
