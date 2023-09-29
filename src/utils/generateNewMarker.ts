import { Popup, Marker, Map } from "mapbox-gl";

let marker: undefined | Marker = undefined;

export const generateNewMarker = ({
  lat,
  lng,
  diameter,
  map,
}: {
  lng: number;
  lat: number;
  diameter?: number;
  map: Map;
}) => {
  const popUp = new Popup({ closeButton: false, anchor: "left" }).setHTML(
    `${
      diameter && lat && lng
        ? `<div class="popup">Diameter this area : <br/>${diameter}</div>`
        : `<div class="popup">You click here: <br/>[${lng},  ${lat}]</div>`
    } `,
  );

  if (marker) {
    return marker.setLngLat([lng, lat]).setPopup(popUp).addTo(map);
  }
  console.log({ marker });
  marker = new Marker({ color: "#63df29", scale: 1.5 })
    .setLngLat([lng, lat])
    .setPopup(popUp)
    .addTo(map);
  return marker;
};
