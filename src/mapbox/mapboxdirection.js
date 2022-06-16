import React, { useEffect, useState,useRef } from "react";
import ReactMapGL, { Marker, Popup ,Source, Layer  } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import { Tooltip } from "@mui/material";
import mapboxgl from "mapbox-gl";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

function MapboxDirection() {

  const [routeUpdateAt,setRouteUpdateAt]= useState(Date.now())
  //   useEffect(()=>{},[showPopup])

  const maps = useRef(null)
  useEffect(()=>{

    mapboxgl.accessToken = 'pk.eyJ1Ijoia2hhbmgwODA2IiwiYSI6ImNsM2k4cmQ1NTAydDkzanJ4cnR2Z3l3cXMifQ.DE9lyetZLzwWll64ymE-wQ';
  const map = new mapboxgl.Map({
    container: "map",
    style: 'mapbox://styles/mapbox/streets-v11',
    width: 600, height: 400
     // starting position
    // zoom: 50
  });
  // set the bounds of the map
 
  // map.fitBounds(bounds);
  
  // an arbitrary start will always be the same
  // only the end or destination will change
  const _start = [106.79748062452549,10.85163758894435];
  const _end=[108.0382097666966,12.666552111905506];
  

  // create a function to make a directions request
async function getRoute(start,end) {
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
    { method: 'GET' }
  );
  const json = await query.json();
  const data = json.routes[0];
  const route = data.geometry.coordinates;
  
  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: route
    }
  };
  // if the route already exists on the map, we'll reset it using setData
  if (map.getSource('route')) {
    map.getSource('route').setData(geojson);
  }
  // otherwise, we'll make a new request
  else {
    console.log("alo")
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  }
  const bounds = [
    start,
    end
  ];
  // Add starting point to the map
  map.addLayer({
    id: 'point',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: start
            }
          }
        ]
      }
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#BB0000'
    }
  });

  map.addLayer({
    id: 'point-end',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: end
            }
          }
        ]
      }
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#BB0000',
    //   'background-image': 'https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png'
    },
  });
  map.fitBounds(bounds);
  setRouteUpdateAt(Date.now())
  // add turn instructions here at the end
}

map.on('load', () => {
  // make an initial directions request that
  // starts and ends at the same location
  getRoute(_start,_end);

  // this is where the code from the next step will go
});
  },[])

  // useEffect(() => {},[routeUpdateAt])

  return (
    <div id="map" style={{ width: 600, height: 400 }}></div>
  )

}

export default MapboxDirection;