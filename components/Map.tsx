import { useMapStyle } from "@/hooks/useMapStyle";
import { Map, MapRef } from "react-map-gl";

export const DEFAULT_VIEWPORT = {
  center: { lng: -1.5, lat: 53.5 },
  zoom: 5.2,
  pitch: 0,
  bearing: 0,
};

export default function MapWrapper() {
  const { mapStyle, interactiveLayerIds } = useMapStyle();
  return  (
    <div style={{ height: "100%", width: "100%", position: "absolute" }}>
      <Map
        // ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: DEFAULT_VIEWPORT.center?.lng ?? 0,
          latitude: DEFAULT_VIEWPORT.center?.lat ?? 0,
          ...DEFAULT_VIEWPORT,
        }}
        style={{ height: "100%", position: "fixed" }}
        mapStyle={mapStyle}
        attributionControl={false}
      ></Map>
    </div>
  );
}