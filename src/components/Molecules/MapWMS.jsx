import React, { Component } from 'react';
import {Map ,WMSTileLayer, Popup, Marker, Circle, GeoJSON} from 'react-leaflet';
import L from 'leaflet';
import CustomWMSLayer from '../Atoms/CustomWMSLayer'
import PopupEarthquakeMarker from '../Atoms/PopupEarthquakeMarker'
import Epicenter from "../../assets/icons/EQViewer/PerceivedIntensity/Epicenter.svg";
import 'leaflet/dist/leaflet.css';
import axios from 'axios'

class MapWMS extends Component {

 
  constructor(props) {
    super(props);

    
    this.state = {
      currentLocation: { lat: 4, lng: -74 },
      zoom: 6,
      filterEvent:{
        cql:"",
        bound:[],
        draw:{ 
            wmsEntity:{
              ref:{},
              url:"",
              cql:"",
              layers:"",
              status: false
            },
            polygon: 
            {
              ref:{},
              feature: {},
              color: 'gray' ,
              status: false
            },
            circle: 
            {
              ref:{},
              position:{},
              radius:{},
              color: 'gray' ,
              status: false
            }
        }
      },
     
      markerPopUp: 
      {
        ref : {},
        status: true,        
        lat:  0,
        lng: 0,
        info: {}
      },
      map:{}
    }

    this.createCQLFilterWMS()
  }
  map = undefined;
  updateDrawFilter = (draw,filterDraw ) =>{
    if(draw.type.toLowerCase()==="polygon"){
      const geojson = this.createGeoJson(draw);
      filterDraw.polygon.feature = geojson;
      filterDraw.polygon.status = true;
    }else if(draw.type.toLowerCase()==="circle"){
      filterDraw.circle.position = [draw.coordinates[0],draw.coordinates[1]]
      let radius = parseFloat(draw.distance)
      if((draw.measure.toLowerCase() === "kilometers") || (draw.measure.toLowerCase() === "km"))
          radius = radius * 1000
      filterDraw.circle.radius =radius;
      filterDraw.circle.status = true;
    }else if(draw.type.toLowerCase()==="wms"){
    
      filterDraw.wmsEntity.url =draw.url;
      filterDraw.wmsEntity.cql =draw.cql;
      filterDraw.wmsEntity.layers =draw.layers;
      filterDraw.wmsEntity.status = true; 
      filterDraw.bound = draw.bound;
      console.log(filterDraw.bound );
    }
     return filterDraw
  }

  updateFilterEvents = (data) =>{
      const {  filterEvent } = this.state; 
      filterEvent.cql = data.cql;
      filterEvent.bound = data.bound;
      filterEvent.draw = this.updateDrawFilter(data.draw,filterEvent.draw);    
      this.setState({filterEvent:filterEvent});
  }

  createGeoJson = (geometryPolygon) =>{ 
      const type =  geometryPolygon["type"];
      geometryPolygon["type"] = type.charAt(0).toUpperCase() + type.slice(1);   
      const geojson = {
          "name":"GeoJsonLayer",
          "type":"FeatureCollection",
          "features":[{
              "type":"Feature",
              "geometry": {...geometryPolygon},
              "properties":null
          }]
      };   
    return geojson;
  }

  createCQLFilterWMS = () =>{   
    let self = this;
    axios.post(this.props.url,this.props.query)
    .then(({data}) =>{ 
      self.updateFilterEvents(data)
    })  
  }

  showPopUpWMS = (latlng,infoFeature) =>{
    this.setState({markerPopUp:{lat:latlng.lat,lng:latlng.lng,status:true,info:infoFeature}})
    this.state.markerPopUp.ref.leafletElement.openPopup();
  }



  render() {
    
    const { currentLocation, zoom, filterEvent, markerPopUp } = this.state;
     const markerIcon = L.icon({
      iconUrl: Epicenter,
      className: 'leafletDivIcon'
    });

    const optionsWMS = {
      "format": "image/png",
      "srs":"EPSG:4326",
      "transparent": "true",          
      "info_format": "application/json",
      "version": '1.3.0'   
    }
    if(filterEvent.cql !== "")
      optionsWMS["CQL_FILTER"]=filterEvent.cql  



     console.log(filterEvent)
     /* if(filterEvent.draw.coordinates !== undefined)
        console.log(filterEvent.draw.coordinates.toString())
      console.log(useLeaflet.map)*/
    return (
      <Map  center={currentLocation} zoom={zoom} srs="EPSG:4326" ref={ref =>  this.map  = ref} >       
 
        {markerPopUp.status === true &&    
        <Marker
        icon={markerIcon} zIndexOffset={1000}
        position={[markerPopUp.lat, markerPopUp.lng]}              
        ref={ref =>  markerPopUp.ref  = ref}
        >
         <Popup
        closeButton = { false }
        autoPan = { false }
      >
        <PopupEarthquakeMarker
          lat = { markerPopUp.lat}
          lng = { markerPopUp.lng }
          place = { "place" }
          localTime = { "localtime" }
          utcTime = { "utc" }
          status = { "status" }
          closerTowns = { "closerTowns" }
          magnitude = { "magnitude" }
          mmi = {5}
          depth = {50}
          cdi = { 0 }
          maxPGA = { 5 }
          agency = { "agency" }
          beachBall = { "beachBall" }
          urlMoreInfo = { `/detallesismo/${0}/resumen` }
          urlReport = { `http://sismosentido.sgc.gov.co/EvaluacionIntensidadesServlet?idSismo=${0}&metodo=irASismoEspecifico` }
        />
      </Popup>
        </Marker>
        }

     
       <WMSTileLayer
              layers={"TOPO-OSM-WMS"}
              srs="EPSG:4326"
              format="image/png"
              version='1.1.0'
              opacity={1}
              transparent
              url="http://ows.mundialis.de/services/service?"
              />
        {filterEvent.draw.polygon.status === true &&    
          <GeoJSON data={filterEvent.draw.polygon.feature} 
          ref={ref =>  filterEvent.draw.polygon.ref  = ref}
          color={filterEvent.draw.polygon.color}
          />
        }
        {filterEvent.draw.circle.status === true &&  
          <Circle center={filterEvent.draw.circle.position} radius={filterEvent.draw.circle.radius} color={filterEvent.draw.circle.color} />
        }
         {filterEvent.draw.wmsEntity.status === true &&  
        <WMSTileLayer
              layers={filterEvent.draw.wmsEntity.layers}
              srs="EPSG:4326"
              format="image/png"
              version='1.3.0'
              opacity={0.8}
              CQL_FILTER =  {filterEvent.draw.wmsEntity.cql}
              transparent = {true}
              url={filterEvent.draw.wmsEntity.url}
              />
         }
      <CustomWMSLayer   
        showPopUp={this.showPopUpWMS}   
        layers={["sgc:event"]}
        options={optionsWMS}
        url="http://172.25.1.90:8080/geoserver/sgc/wms"
        bound = {filterEvent.bound}
      />
      </Map >
    );
  }
}

export default MapWMS;
