import React, { useState, useEffect } from "react";
import { axios } from "../utils/axios";
import "./Locations.css";
import { Location } from "../types/Location";
import { AxiosResponse } from "axios";

function Locatios() {
  const [locations, setLocations] = useState<Location[]>();
  const [lastLocation, setLastLocation] = useState<Location>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/list_location")
      .then((response: AxiosResponse<{ data: Location[] }>) => {
        setLocations(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    axios
      .get("/last_location")
      .then((response: AxiosResponse<{ data: Location }>) => {
        setLastLocation(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching last location:", error);
      });
  }, []);

  return (
    <div className="UserLocations">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="container">
          <div className="list-locations">
            <h2>List of User Locations:</h2>
            <ul>
              {locations ? (
                locations.map((location, index) => (
                  <li key={index} className="list-item">
                    <p>Latitude: {location.lat}</p>
                    <p>Longitude: {location.long}</p>
                    <p>Date: {location.date}</p>
                  </li>
                ))
              ) : (
                <p>No List of User Locations available.</p>
              )}
            </ul>
          </div>

          <div className="last-location">
            <h2>Last Known User Location:</h2>
            {lastLocation ? (
              <div className="list-item">
                <p>Latitude: {lastLocation.lat}</p>
                <p>Longitude: {lastLocation.long}</p>
                <p>Date: {lastLocation.date}</p>
              </div>
            ) : (
              <p>No last known location available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Locatios;
