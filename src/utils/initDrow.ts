import MapboxDraw from "@mapbox/mapbox-gl-draw";

export const initDrow = (
  mapRef: any,
  optionsControl: any,
  listener: (e: any) => void,
) => {
  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },

    defaultMode: "draw_polygon",
  });

  mapRef && mapRef.addControl(draw, optionsControl);
  mapRef && mapRef.on("draw.create", listener);
  mapRef && mapRef.on("draw.delete", listener);
  mapRef && mapRef.on("draw.update", listener);

  return draw;
};
