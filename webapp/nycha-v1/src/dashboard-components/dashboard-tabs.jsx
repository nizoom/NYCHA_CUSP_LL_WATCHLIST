import { useState } from "react";

const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState("311 Complaints");

  const toggleTab = (tabName) => {
    setActiveTab(tabName);
  };

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
          onClick={() => toggleTab(tab)}
          className={
            activeTab === tab
              ? "selected-dashboard-tab dashboard-tab-btn"
              : "unselected-dashboard-tab dashboard-tab-btn"
          }
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default DashboardTabs;
