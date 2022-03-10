import React, { useContext, useState } from "react";
import AuthContext from "../state/index";

const MapRegion = ({ region: dataRegion, id, children }) => {
  const [hoveredRegion, setHoveredRegion] = useState();
  const { setRegion, setHoveredRegion: setHoveredRegionState, region } = useContext(AuthContext);

  const handleHover = (event) => {
    setHoveredRegion({
      label: event.target.parentNode.getAttribute("data-region"),
      value: event.target.parentNode.getAttribute("data-id"),
    });
    setHoveredRegionState(event.target.parentNode);
  };

  const handleUnHover = () => {
    setHoveredRegion(null);
    setHoveredRegionState(null);
  };

  const handleClick = () => {
    setRegion(hoveredRegion);
  };

  return (
    <a
      href="#"
      data-region={dataRegion}
      data-id={id}
      onMouseEnter={handleHover}
      onMouseLeave={handleUnHover}
      onClick={handleClick}
      className="map-region"
      data-selected={region?.label === dataRegion ? true : undefined}
    >
      {children}
    </a>
  );
};

export default MapRegion;
