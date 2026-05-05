import { useState } from "react";

const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState("311 Complaints");

  const tabs = [
    "311 Complaints",
    "Public Needs Assessment",
    "Demographics",
    "Evictions",
  ];

  return (
    <nav className="dashboard-tabs-wrapper">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={
            activeTab === tab
              ? "selected-tab dashboard-tab-btn"
              : "unselected-tab dashboard-tab-btn"
          }
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default DashboardTabs;
