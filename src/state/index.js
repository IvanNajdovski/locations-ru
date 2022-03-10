import React from "react";

const AppContext = React.createContext({
  business: -1,
  region: -1,
  setBusiness: () => {},
  setRegion: () => {},
  setHoveredRegion: () => {},
});

export default AppContext;
