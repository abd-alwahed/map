import React, { useEffect, useState } from "react";

export default () => {
  const [userLocation, setUserLocation] = useState<[number, number]>([37, 36]);
  const deltaX = 0.00001 * Math.random();
  useEffect(() => {
    /* const getUserLocation = () => {
             if (navigator.geolocation) {
                 navigator.geolocation.getCurrentPosition(position => {
                     const { latitude, longitude } = position.coords;
                     console.log(position.coords)
                     setUserLocation([longitude, latitude]);
 
 
                 }, (e) => {
                     console.log(userLocation); console.log({ e });
                 }, {
                     enableHighAccuracy: true,
                 });
             }
         };*/
    const mockGetUserLocation = () => {
      setUserLocation((e) => [e[0], e[1] + deltaX]);
    };
    const x = setInterval(() => {
      mockGetUserLocation();
    }, 1500);
    return () => clearInterval(x);
  }, [navigator.geolocation]);
  return userLocation;
};
