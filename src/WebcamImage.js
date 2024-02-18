import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { fetchLocation } from './locationFetch'; // Ensure this is correctly imported

const AttendanceApp = () => {
  const webcamRef = useRef(null);
  const [attendanceStatus, setAttendanceStatus] = useState({ startedDuty: false, stoppedDuty: false });
  const [imgSrc, setImgSrc] = useState({ startDuty: null, stopDuty: null });
  const [attendanceInfo, setAttendanceInfo] = useState({ startDuty: null, stopDuty: null });
  const [error, setError] = useState(null);

  const handleAttendance = useCallback((action) => {
    const imageSrc = webcamRef.current.getScreenshot();
    const now = new Date().toLocaleString();

    fetchLocation().then(location => {
      setError(null);
      setImgSrc(prevState => ({ ...prevState, [action]: imageSrc }));
      setAttendanceInfo(prevState => ({
        ...prevState,
        [action]: {
          time: now,
          location: location,
        },
      }));

      if (action === 'startDuty') {
        setAttendanceStatus(prevState => ({ ...prevState, startedDuty: true }));
      } else if (action === 'stopDuty') {
        setAttendanceStatus(prevState => ({ ...prevState, stoppedDuty: true }));
      }
    }).catch(err => {
      setError(err);
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
        {!attendanceStatus.startedDuty && 
          <button onClick={() => handleAttendance('startDuty')} style={{ marginBottom: '10px' }}>Start Duty</button>
        }
        {attendanceStatus.startedDuty && 
          <button onClick={() => handleAttendance('stopDuty')}>Stop Duty</button>
        }
      </div>
      {error && <p>Error: {error}</p>}
      <div style={{ textAlign: 'center' }}>
        {attendanceInfo.startDuty && (
          <>
            <h3>Start Duty Time: {attendanceInfo.startDuty.time}</h3>
            <p>Location: Lat {attendanceInfo.startDuty.location.lat}, Long {attendanceInfo.startDuty.location.long}</p>
            {imgSrc.startDuty && <img src={imgSrc.startDuty} alt="Start Duty" style={{ maxWidth: '100%', height: 'auto' }} />}
          </>
        )}
        {attendanceInfo.stopDuty && (
          <>
            <h3>Stop Duty Time: {attendanceInfo.stopDuty.time}</h3>
            <p>Location: Lat {attendanceInfo.stopDuty.location.lat}, Long {attendanceInfo.stopDuty.location.long}</p>
            {imgSrc.stopDuty && <img src={imgSrc.stopDuty} alt="Stop Duty" style={{ maxWidth: '100%', height: 'auto' }} />}
          </>
        )}
      </div>
    </div>
  );
};

export default AttendanceApp;
