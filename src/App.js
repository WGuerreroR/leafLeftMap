import React from 'react';
import MapWMS from './Components/Organisms/MapWMS';
import './App.css';
import './Styles/Sae.css';

function App() {

  //
  //console.log(this.props.location.search) 
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const url = "http://172.25.1.135/api/transform/query/cql_wms";
  const query =   JSON.parse(urlParams.get('query'));
  const entity = urlParams.get('entity');



  return (
    <div className="App">
      <MapWMS url={url} query={query} entity={entity}  />
    </div> 
  );
}

export default App;
