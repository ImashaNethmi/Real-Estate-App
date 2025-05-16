import React, { useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: 10,
};

function GoogleMapSection({coordinates}) {
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });
  const [map, setMap] = React.useState(null);

  useEffect(()=>{
    coordinates&&setCenter(coordinates)
  }, [coordinates])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={() => console.log()}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  );
}

export default GoogleMapSection;
