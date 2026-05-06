import viosData from "../json/vios.json";

const ViolationPanel = ({ vioId, vioType, onClose }) => {
  const vio =
    vioType === "hpd"
      ? viosData.hpd_vios.find((v) => v.ViolationID === Number(vioId))
      : viosData.nycha_vios.find((v) => v["Violation ID"] === Number(vioId));

  if (!vio) return null;

  const fields =
    vioType === "hpd"
      ? [
          ["Violation ID", vio.ViolationID],
          ["Inspection Date", vio.InspectionDate],
          ["Status", vio.ViolationStatus],
          ["Class", vio.Class],
          ["Description", vio.NOVDescription],
          ["Address", vio.Full_Address],
        ]
      : [
          ["Violation ID", vio["Violation ID"]],
          ["Inspection Date", vio["Inspection Date"]],
          ["Status", vio["Violation Status"]],
          ["Description", vio["Violation Description"]],
          ["Address", vio.Full_Address],
        ];

  return (
    <div
      style={{
        position: "fixed",
        color: "black",
        right: 0,
        top: 0,
        width: "320px",
        height: "100vh",
        background: "#fff",
        boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
        overflowY: "auto",
        padding: "20px",
        zIndex: 1000,
        fontFamily: "sans-serif",
      }}
    >
      <button onClick={onClose} style={{ float: "right" }}>
        ✕
      </button>
      <h3>{vioType.toUpperCase()} Violation</h3>
      {fields.map(([label, val]) => (
        <div key={label} style={{ marginBottom: "10px" }}>
          <strong>{label}:</strong>
          <p style={{ margin: "2px 0" }}>{val ?? "N/A"}</p>
        </div>
      ))}
    </div>
  );
};

export default ViolationPanel;
