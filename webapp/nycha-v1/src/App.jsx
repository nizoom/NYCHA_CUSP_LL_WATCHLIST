import "./App.css";
import { useState } from "react";
import DashboardSection from "./dashboard-components/dashboard-section";
import MapSection from "./map-components/map";
function App() {
  const [tabState, setTabState] = useState("dashboard");
  const toggleTab = () => {
    if (tabState === "dashboard") {
      setTabState("map");
    } else {
      setTabState("dashboard");
    }
  };
  return (
    <>
      <section className="header">
        <h1> NYCHA Watchlist Dashboard</h1>
      </section>
      <nav className="main-tabs">
        <button
          className={
            tabState === "dashboard" ? "selected-tab" : "unselected-tab"
          }
          onClick={() => toggleTab()}
        >
          <h2> Dashboard</h2>
        </button>

        <button
          className={tabState === "map" ? "selected-tab" : "unselected-tab"}
          onClick={() => toggleTab()}
        >
          <h2> Map</h2>
        </button>
      </nav>
      {tabState === "dashboard" ? <DashboardSection /> : <MapSection />}
    </>
  );
}

export default App;
