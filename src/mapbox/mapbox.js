import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup ,Source, Layer  } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import { Tooltip } from "@mui/material";

function Mapbox() {
  const [viewport, setViewport] = React.useState({
    width: "",
    height: "",
    longitude: 107.31306933841265,
    latitude: 11.875275093706664,
    zoom: 6.5
  });
  const [showPopup, togglePopup] = useState(false);
  //   useEffect(()=>{},[showPopup])
  return (
    <ReactMapGL
      key={showPopup}
      {...viewport}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={(e) => setViewport(e.viewState)}
      mapboxAccessToken="pk.eyJ1Ijoia2hhbmgwODA2IiwiYSI6ImNsM2k4cmQ1NTAydDkzanJ4cnR2Z3l3cXMifQ.DE9lyetZLzwWll64ymE-wQ"
    >

{/* <Source id="polylineLayer" type="geojson" data={dataOne}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              "line-color": "rgba(3, 170, 238, 0.5)",
              "line-width": 5
            }}
          />
        </Source> */}

      {/* {showPopup && (
        <Popup
          latitude={10.851582422864931}
          longitude={106.79757684753463}
          closeButton={true}
          closeOnClick={true}
          onClose={() => togglePopup(false)}
          anchor="top-right"
        >
          <div>Nhà xe ở Sài Gòn</div>
        </Popup>
      )} */}
      {/* 10.86195853994233, 106.74362380706191 */}
      <Marker
        latitude={10.85163758894435}
        longitude={106.79748062452549}
        offsetLeft={-20}
        offsetTop={-30}
      // onClick={()=>togglePopup(true)}
      ><Tooltip title="Nhà xe ở Sài Gòn">
        <img
          onClick={() => togglePopup(true)}
          style={{ height: 50, width: 50 }}
          src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
        /></Tooltip>
      </Marker>
      
      <Marker
        latitude={12.666552111905506}
        longitude={108.0382097666966}
        offsetLeft={-20}
        offsetTop={-30}
      ><Tooltip title="Nhà xe ở Đắk Lắk">
        <img
          style={{ height: 50, width: 50 }}
          src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
        /></Tooltip>
      </Marker>
      
    </ReactMapGL>
  );
}

export default Mapbox;