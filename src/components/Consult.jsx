import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Consult = () => {
  //TODO: Get token
  // check token roles
  const location = useLocation();
  const latestRouteString = location.pathname.split("/").pop();
  const decodedRouteString = decodeURIComponent(latestRouteString);
  useEffect(() => {
    console.log(decodedRouteString);
  }, [decodedRouteString]);
  return <div>Consult</div>;
};

export default Consult;
