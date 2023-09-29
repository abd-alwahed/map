import { Map, accessToken } from "mapbox-gl";
import mapboxgl from "mapbox-gl";
export const initMap = (
  container: HTMLDivElement,
  coords: [number, number],
) => {
  const map = new Map({
    container,
    style: "mapbox://styles/mapbox/satellite-v9",
    pitchWithRotate: true,
    center: coords,
    accessToken: "",
    zoom: 20,
  });
  var navigationControl = new mapboxgl.NavigationControl();
  map.addControl(navigationControl, "top-right");
  return map;
};
