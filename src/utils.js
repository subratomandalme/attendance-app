async function fetchLocation(options = {}) {
  try {
    const location = await getLocation(options);
    console.log(location); // { lat: latitude, long: longitude }
    return location;
  } catch (error) {
    console.error(error);
    // Handle the error appropriately in your application
    throw error; // or return an error indication, depending on your error handling strategy
  }
}

// The getLocation function remains unchanged:
function getLocation(options = {}) {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, long: longitude });
        },
        (error) => {
          reject("Error Code = " + error.code + " - " + error.message);
        },
        {
          enableHighAccuracy: options.enableHighAccuracy || false,
          timeout: options.timeout || 5000,
          maximumAge: options.maximumAge || 0,
          ...options,
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
}

export { fetchLocation, getLocation };
