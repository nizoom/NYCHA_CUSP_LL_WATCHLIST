import { useEffect, useRef } from "react";
import { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import all_vio_ids from "../json/vios.json";
import addressData from "../json/addresses_with_coords.json";

const MapSection = () => {
  const mapContainer = useRef(null);
  const apiKey = import.meta.env.VITE_MAPTILER_KEY;

  useEffect(() => {
    const map = new Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v4/style.json?key=${apiKey}`,
      center: [-73.935, 40.73],
      zoom: 10,
      pitch: 45,
      bearing: -17,
    });

    const allRecords = Object.values(addressData).flat();

    const features = allRecords
      .filter((r) => r.Latitude && r.Longitude)
      .map((r) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [r.Longitude, r.Latitude],
        },
        properties: {
          address: r.Full_Address,
          nycha_count: r.NYCHA_ViolationIDs?.length ?? 0,
          hpd_count: r.HPD_ViolationIDs?.length ?? 0,
        },
      }));

    map.on("load", () => {
      map.addSource("addresses", {
        type: "geojson",
        data: { type: "FeatureCollection", features },
      });
      console.log("map loaded");

      // Check your features are being built correctly
      console.log("features count:", features.length);
      console.log("sample feature:", features[0]);
      // Verify source was added
      console.log("source added:", map.getSource("addresses"));

      map.setPaintProperty("Building 3D", "fill-extrusion-color", "#d4c5a9");

      map.addLayer({
        id: "nycha-buildings",
        type: "circle",
        source: "addresses",
        paint: {
          "circle-radius": 8,
          "circle-color": [
            "step",
            ["get", "hpd_count"],
            "#00c853",
            5,
            "#ffeb3b",
            20,
            "#ff9800",
            50,
            "#f44336",
          ],
          "circle-opacity": 0.85,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });

      console.log("layer added:", map.getLayer("nycha-buildings"));

      map.on("click", "nycha-buildings", (e) => {
        const { address, nycha_count, hpd_count } = e.features[0].properties;
        new maplibregl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            `
            <strong>${address}</strong><br/>
            NYCHA violations: ${nycha_count}<br/>
            HPD violations: ${hpd_count}
          `,
          )
          .addTo(map);
      });

      map.on("mouseenter", "nycha-buildings", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "nycha-buildings", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    return () => map.remove();
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
