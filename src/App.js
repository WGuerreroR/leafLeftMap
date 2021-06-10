import React from 'react';
import MapWMS from './Components/Molecules/MapWMS';
import './App.css';

function App() {
  const query = {"source":[3],"filter":{	"event":{	     "date":{"min":"1990-01-13T20:08:56","max":"2020-01-13T20:08:56"},    "magnitude":{"min":1.0,"max":7.0},    "depth":{"min":0,"max":2000},			"location":{"type": "geo_distance", "geometry" : {"lat": 4,"lon": -74},"distance": "100km" },     "gap":{"min":0,"max":360},      "standard_error":{"min":0,"max":1},"latitude_uncertainty":{"min":0,"max":5},"longitude_uncertainty":{"min":0,"max":5},"depth_uncertainty":{"min":0,"max":5},"magnitude_uncertainty":{"min":0,"max":0.5}}}}  
  const url = "http://172.25.1.135/api/transform/query/cql_wms"
  //const url = "http://127.0.0.1:8000/api/transform/query/cql_wms"
  
  return (
    <div className="App">
      <MapWMS url={url} query={query} />
    </div>
  );
}

export default App;
