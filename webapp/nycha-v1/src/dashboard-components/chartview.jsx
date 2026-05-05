export default function ChartView({ chartName }) {
  return (
    <div
      className="chart-container"
      style={{ width: "100%", height: "500px", margin: "auto" }}
    >
      <iframe
        src={`/charts/${chartName}.html`}
        title={chartName}
        width="75%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
}
