import { useEffect, useRef } from "react";
import { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapSection = () => {
  const mapContainer = useRef(null);
  const apiKey = import.meta.env.VITE_MAPTILER_KEY;

  useEffect(() => {
    const map = new Map({
      container: mapContainer.current, // ✅ ref instead of string id
      style: `https://api.maptiler.com/maps/streets-v4/style.json?key=${apiKey}`, // ✅ was `key`
      center: [-74.006, 40.7128], // NYC
      zoom: 10,
    });

    return () => map.remove(); // cleanup on unmount
  }, []);

  return (
    <div className="map-wrapper">
      <h2> NYCHA Properties and violations</h2>
      <div
        ref={mapContainer}
        style={{
          width: "70%",
          height: "500px",
          padding: "5%",
          margin: "auto",
          marginTop: "5%",
        }}
      />
    </div>
  );
};

export default MapSection;
