import React, { useEffect, useState } from "react";

import { BusinessSelect, Company, Map, RegionSelect } from "./components";
import AppContext from "./state";

import { companies } from "./data/companies";
import { motion } from "framer-motion";
import regionsSelectData from "./data/regionsSelectData.json";
import businessSelectData from "./data/businessSelectData.json";

function App() {
  const [business, setBusiness] = useState();
  const [region, setRegion] = useState();
  const [hoveredRegion, setHoveredRegion] = useState();

  const [filteredBusinesses, setFilteredBusinesses] = useState(companies);

  const contextValue = {
    business,
    setBusiness,
    region,
    setRegion,
    setHoveredRegion,
  };

  const clearDealers = () => {
    setBusiness(null);
    setRegion(null);
  };

  const renderFilteredBusinesses = () => {
    if (!filteredBusinesses) return null;
    return (
      <React.Fragment>
        {Object.keys(filteredBusinesses).map((regionName) => {
          if (!filteredBusinesses[regionName]?.length) return null;
          return (
            <div className="company">
              <div className="company--town">{regionName}</div>
              <div className="companies">
                {filteredBusinesses[regionName].map((companyInfo) => (
                  <Company {...companyInfo} />
                ))}
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  };

  const renderTooltip = () => {
    if (!hoveredRegion) return null;

    const boundingBox = hoveredRegion.getBoundingClientRect();

    return (
      <div
        className="custom-tooltip"
        style={{
          position: "absolute",
          top: Math.max(window.scrollY, boundingBox.top - 40),
          left: boundingBox.left,
          textAlign: "center",
          zIndex: "999",
          transform: {
            translateX: "-50%",
          },
        }}
      >
        <span
          style={{
            padding: 5,
            backgroundColor: "rgba(0,0,0,.8)",
            color: "#FFFFFF",
          }}
        >
          {hoveredRegion.getAttribute("data-region")}
        </span>
      </div>
    );
  };

  useEffect(() => {
    const isBusinessSelected = (businessObj) => !business?.value || businessObj.dataBusiness.includes(parseInt(business.value));
    const isRegionSelected = (businessObj) => !region?.value || businessObj.dataRegions.includes(parseInt(region.value));

    const companiesCopy = { ...companies };
    Object.keys(companiesCopy).map(
      (company) =>
        (companiesCopy[company] = companiesCopy[company].filter((businessObj) => isBusinessSelected(businessObj) && isRegionSelected(businessObj)))
    );

    setFilteredBusinesses(companiesCopy);
  }, [region, business]);

  return (
    <AppContext.Provider value={contextValue}>
      {renderTooltip()}
      <div className="container">
        <div className="header-menu">
          <div className="selects">
            <div className="select">
              <BusinessSelect options={businessSelectData} />
            </div>
            <div className="select">
              <RegionSelect options={regionsSelectData.map(({ path, ...region }) => region)} />
            </div>
          </div>
          <button className="clear-link" onClick={clearDealers}>
            Очистить
          </button>
        </div>
        <Map />
        {renderFilteredBusinesses()}
      </div>
    </AppContext.Provider>
  );
}

export default App;
