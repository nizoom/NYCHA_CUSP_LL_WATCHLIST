import { useEffect, useRef } from "react";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import viosData from "../json/vios.json";
import addressData from "../json/addresses_with_coords.json";

const MapSection = ({ onVioClick }) => {
  const mapContainer = useRef(null);
  const apiKey = import.meta.env.VITE_MAPTILER_KEY;
  // store callback in a ref so the map closure can access it
  const onVioClickRef = useRef(onVioClick);
  useEffect(() => {
    onVioClickRef.current = onVioClick;
  }, [onVioClick]);

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
          total_count:
            (r.NYCHA_ViolationIDs?.length ?? 0) +
            (r.HPD_ViolationIDs?.length ?? 0),
          violation_ids: [
            ...(Array.isArray(r.HPD_ViolationIDs) ? r.HPD_ViolationIDs : []),
            ...(Array.isArray(r.NYCHA_ViolationIDs)
              ? r.NYCHA_ViolationIDs
              : []),
          ],
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
            ["get", "total_count"],
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
        const { address, violation_ids } = e.features[0].properties;
        const ids = JSON.parse(violation_ids);

        // Sort by inspection date using vios data
        const allVios = [...viosData.hpd_vios, ...viosData.nycha_vios];

        const sorted = ids
          .map((id) =>
            allVios.find(
              (v) => v.ViolationID === id || v["Violation ID"] === id,
            ),
          )
          .filter(Boolean)
          .sort((a, b) => {
            const dateA = new Date(a.InspectionDate || a["Inspection Date"]);
            const dateB = new Date(b.InspectionDate || b["Inspection Date"]);
            return dateA - dateB;
          });

        const html = `
        <div style="max-height:200px; overflow-y:auto; font-family:sans-serif; color:black; padding:8px;">
          <strong style="display:block; margin-bottom:6px;">${address}</strong>
          ${sorted
            .map((v) => {
              const id = v.ViolationID || v["Violation ID"];
              const type = v.ViolationID ? "hpd" : "nycha";
              return `<div 
              style="cursor:pointer; color:#1a73e8; margin:3px 0;"
              onclick="window.__vioClick('${id}', '${type}')"
            >${id} — ${v.InspectionDate || v["Inspection Date"]}</div>`;
            })
            .join("")}
        </div>
      `;

        // Expose click handler to window for popup HTML onclick
        window.__vioClick = (id, type) => onVioClickRef.current(id, type);

        new maplibregl.Popup({ maxWidth: "280px" })
          .setLngLat(e.lngLat)
          .setHTML(html)
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
