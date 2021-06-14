import React, { Component } from 'react';
import {Map ,WMSTileLayer, Popup, Marker, Circle, GeoJSON} from 'react-leaflet';
import L from 'leaflet';
import CustomWMSLayerEvent from '../Molecules/CustomWMSLayerEvent'
import PopupEarthquakeMarker from '../Molecules/PopupEarthquakeMarker'
import Epicenter from "../../assets/icons/EQViewer/Icons/info_event.svg";
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
              color: 'cyan' ,
              status: false
            },
            circle: 
            {
              ref:{},
              position:{},
              radius:{},
              color: 'cyan' ,
              status: false
            }
        }
      },
      geographyEntity:{
        layers:"sgc:departamento",
        url:"http://172.25.1.90:8080/geoserver/sgc/wms",
        status: false
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
    this.loadEntity()
    this.createCQLFilterWMS()
    
  }

  //Actualizar el dibujo de los filtros geograficos (poligonos, circulos , departamentos, municipios)
  updateDrawFilter = (draw,filterDraw ) =>{
    if (draw !== undefined && draw.type !== undefined){
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
        
      }
  }
     return filterDraw
  }

//Activar entidad geografica (municpio o departamento) en la consulta  
  activateGeographyEntity = (dataDraw) =>{
    if(dataDraw!==undefined && dataDraw.type !== undefined){
      const {  geographyEntity } = this.state; 
      if(dataDraw.type.toLowerCase()==="wms"){
        geographyEntity.status = true;
        geographyEntity.layers = dataDraw.layers;
        this.setState({geographyEntity:geographyEntity});
      }
    }
    
  }
  
  //Actualización del filtrado de eventos
  updateFilterEvents = (data) =>{     
      const { filterEvent} = this.state; 
      filterEvent.cql = data.cql;
      filterEvent.bound = data.bound;
      filterEvent.draw = this.updateDrawFilter(data.draw,filterEvent.draw);   
      this.activateGeographyEntity(data.draw); 
      this.setState({filterEvent:filterEvent});
  }

  ///Creación de la geometria en formato Geojson (para visualización de poligonos)
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

  ///Lllamado a la creación de filtro a los eventos sismicos en formato WMS (Web map service)
  createCQLFilterWMS = () =>{       
    let self = this;   
    axios.post(this.props.url,this.props.query)
    .then(({data}) =>{ 
      self.updateFilterEvents(data)
    })  
  }
  ///Carga de entidad geográfica departamento o municipio dependiendo del parametro ingresado
  loadEntity = () =>{   
      if(this.props.entity!==undefined && this.props.entity!==null){
        const entity = this.props.entity
        const { geographyEntity } = this.state;
       
        if(entity.toLowerCase() ==="municipio"){     
          geographyEntity.layers = "sgc:municipio" 
          geographyEntity.status = true    
        }else if (entity.toLowerCase() ==="departamento"){
          geographyEntity.layers = "sgc:departamento"  
          geographyEntity.status = true   
        }
        this.setState({geographyEntity:geographyEntity});
      }
  }

  ///Función para mostrar el pop up de información de cada evento seleccionado
  showPopUpWMS = (latlng,infoFeature) =>{
    const { filterEvent } = this.state;
    filterEvent.bound = [];
    this.setState({filterEvent:filterEvent});
    this.setState({markerPopUp:{lat:latlng.lat,lng:latlng.lng,status:true,info:infoFeature}})
    this.state.markerPopUp.ref.leafletElement.openPopup();
  }



  render() {   
    const { currentLocation, zoom, filterEvent, markerPopUp ,geographyEntity} = this.state;
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
    if(filterEvent.cql !== undefined && filterEvent.cql !== "")
      optionsWMS["CQL_FILTER"]=filterEvent.cql  

   
    return (
      <Map  center={currentLocation} zoom={zoom} srs="EPSG:4326" ref={ref =>  this.map  = ref} >       
 
        {(markerPopUp.status === true)&&    
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
          {...markerPopUp.info}
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
          {geographyEntity.status === true &&   
             <WMSTileLayer
              layers={geographyEntity.layers}
              srs="EPSG:4326"
              format="image/png"
              version='1.1.0'
              opacity={1}
              transparent
              url={geographyEntity.url}
              />
            }
        {filterEvent.draw.polygon.status === true &&    
          <GeoJSON data={filterEvent.draw.polygon.feature} 
          ref={ref =>  filterEvent.draw.polygon.ref  = ref}
          fillColor={ '#ffffff00' }
          weight={4}
          color={filterEvent.draw.polygon.color}
          />
        }
        {filterEvent.draw.circle.status === true &&  
          <Circle center={filterEvent.draw.circle.position} radius={filterEvent.draw.circle.radius}     fillColor={ '#ffffff00' } color={filterEvent.draw.circle.color}  weight={4}/>
        }



   
         {filterEvent.draw.wmsEntity.status === true &&  
        <WMSTileLayer
              layers={filterEvent.draw.wmsEntity.layers}
              srs="EPSG:4326"
              format="image/png"
              version='1.3.0'
              opacity={0.8}
              CQL_FILTER =  {filterEvent.draw.wmsEntity.cql}
              styles ="select"
              transparent = {true}
              url={filterEvent.draw.wmsEntity.url}
              />
         }
      <CustomWMSLayerEvent   
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
