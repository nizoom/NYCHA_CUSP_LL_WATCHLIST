// ChartView.jsx
export default function ChartView({ chartName }) {
  return (
    <div className="chart-container" style={{ width: "100%", height: "500px" }}>
      <iframe
        src={`/charts/${chartName}.html`}
        title={chartName}
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
}
