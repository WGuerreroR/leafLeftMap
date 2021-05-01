import React, { Component } from 'react';
import { Map, TileLayer, WMSTileLayer  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../assets/data';
import Markers from './VenueMarkers';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 4, lng: -74 },
      zoom: 6,
    }
  }

  render() {
    const { currentLocation, zoom } = this.state;

    return (
      <Map center={currentLocation} zoom={zoom} srs="EPSG:4326" >
       <WMSTileLayer
      
                layers={"TOPO-OSM-WMS"}
                srs="EPSG:4326"
                format="image/png"
                version='1.1.0'
                opacity={1}
                transparent
                url="http://ows.mundialis.de/services/service?"
              />

            <WMSTileLayer
                       
                layers={"sgc:rsnc_event"}
                srs="EPSG:4326"
                format="image/png"
                version='1.1.0'
                opacity={1}
                transparent
                url="http://172.25.1.90:8080/geoserver/sgc/wms?"
              />
      </Map>
    );
  }
}

export default MapView;
