import { useContext, useMemo } from "react";
import AuthContext from "../../state/index";
import MapRegion from "../MapRegion";
import regionsData from "../../data/regionsSelectData.json";
import regionsBorderData from "../../data/regionsBorderData.json";
import "./Map.css";

const Map = () => {
  const { region } = useContext(AuthContext);

  const regionsComponent = useMemo(() => {
    return regionsData.map((region, index) => {
      if (!region.path) return;
      return (
        <MapRegion key={index} href="#" region={region.label} id={region.value} noEvents={region.noEvents}>
          {region.path.map((path) => (
            <path d={path} fill="#f0f0f0" stroke={region.value == -1 ? "white" : undefined} />
          ))}
        </MapRegion>
      );
    });
  }, [regionsData]);

  const regionsBordersComponent = useMemo(() => {
    return regionsBorderData.map((border, index) => {
      if (!border) return;
      return <path d={border} fill="white" />;
    });
  });

  return (
    <svg id="map" className={`map ${region ? "" : "map-initial"}`} viewBox="0 0 1000 548" fill="none" xmlns="http://www.w3.org/2000/svg">
      {regionsComponent}
      {regionsBordersComponent}
    </svg>
  );
};

export default Map;
