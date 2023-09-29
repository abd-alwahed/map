import * as turf from "@turf/turf";
import { Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { calculateDiameter } from "../utils/calculateDiameter";
import { generateNewMarker } from "../utils/generateNewMarker";
import { initDrow } from "../utils/initDrow";
import { initMap } from "../utils/initMap";
import useLocation from "./useLocation";
import { Polygon } from "geojson";
import { axios } from "../utils/axios";
import { Flip, Zoom, toast } from "react-toastify";

let arrayPolygon: Polygon | turf.MultiPolygon = {
    type: "Polygon",
    coordinates: [[]],
};

export const useMap = (container: React.RefObject<HTMLDivElement>) => {
    const mapInitRef = useRef<Map | null>(null);
    const userLocation = useLocation();
    const [first, setFirst] = useState(true);

    useEffect(() => {
        const req = async () => {
            try {
                const { data } = await axios.post(`/store_location`, {
                    long: userLocation[0],
                    lat: userLocation[1],
                });
            } catch (error) {
                console.error(error);
            }
        };
        req();
    }, [userLocation]);

    useEffect(() => {
        if (userLocation && mapInitRef.current) {
            generateNewMarker({
                lat: userLocation[1],
                lng: userLocation[0],
                map: mapInitRef.current!,
            });
            if (arrayPolygon.coordinates[0].length > 0) {
                const isInside = turf.booleanPointInPolygon(userLocation, arrayPolygon);
                isInside
                    ? toast.success("Point is inside the polygon.", {
                        position: "bottom-left",
                        autoClose: 0.5,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        transition: Flip,
                    })
                    : toast.error("Point is outside the polygon.", {
                        position: "bottom-left",
                        autoClose: 0.5,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        transition: Flip,
                    });
            }
        }
        if (!first) {
            return;
        }
        if (userLocation && container.current) {
            console.log(userLocation);
            setFirst(false);
            mapInitRef.current = initMap(container.current, userLocation);
        }
    }, [userLocation]);

    useEffect(() => {
        const updateArea = (e: any) => {
            const data = draw.getAll();
            if (data.features.length > 0) {
                const diameter = calculateDiameter(
                    e.features[0].geometry.coordinates[0],
                );
                console.log({ diameter });

                //  console.log(e.features[0].geometry.coordinates[0])
                // console.log(turf.center(e.features[0].geometry), "ds");
                // const x = turf.center(e.features[0].geometry).geometry.coordinates[0];
                // const y = turf.center(e.features[0].geometry).geometry.coordinates[1];
                /* 
                                 console.log({ x, y })
                                                setUserLocation({ x, y });
                                                generateNewMarker({ map: mapInitRef.current!, lat: y, lng: x })
                                                */
                console.log(e.features[0].geometry.coordinates[0]);
                arrayPolygon.coordinates = e.features[0].geometry.coordinates;

                var ids = draw.add(e.features.at(-1));
                diameter > 30
                    ? (draw.delete(ids),
                        arrayPolygon.coordinates = [],
                        toast.error(
                            "You have defined a shape whose diameter is more than 30",
                            {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                transition: Zoom,
                            },
                        ))
                    : "";
            }
        };
        const draw = initDrow(mapInitRef.current, "top-right", updateArea);
    }, []);
};
