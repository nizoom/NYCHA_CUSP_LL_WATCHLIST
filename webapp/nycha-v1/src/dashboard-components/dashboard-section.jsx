import { useState } from "react";
import ChartView from "./chartview";

const DashboardSection = () => {
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

  const TAB_CONFIG = {
    "311 Complaints": ["nycha_311_dashboard"],
    "Public Needs Assessment": [
      "nycha_pna_1_totals",
      "nycha_pna_2_top25",
      "nycha_pna_3_worktypes",
      "nycha_pna_4_changes",
    ],
    Demographics: [
      "nycha_demo_1_race",
      "nycha_demo_2_age",
      "nycha_demo_3_borough",
      "nycha_demo_4_household_type",
    ],
    Evictions: ["nycha_evictions_1_monthly", "nycha_evictions_2_comparison"],
  };

  return (
    <>
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
      {TAB_CONFIG[activeTab].map((file) => (
        <ChartView key={file} chartName={file} />
      ))}
    </>
  );
};

export default DashboardSection;
