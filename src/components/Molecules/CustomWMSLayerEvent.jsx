import { useLeaflet } from "react-leaflet";
import * as WMS from "leaflet.wms";


function CustomWMSLayerEvent(props) {
    const { url, options,layers,showPopUp,bound } = props;
    const ctx = useLeaflet()
    const map = ctx.map; 
    const source = WMS.source(
        url,
        options
    );


    // for each wms load
    for(let name of layers){ 
       map.eachLayer(function (layer) {
        if( layer._name === name){
            //remove layer for actualizate params 
            map.removeLayer(layer);
        }
        });        
        source.getLayer(name).addTo(map); 
        source.getLayer(name).bringToFront();
    }


    if(bound!==undefined && bound.length>0){
        map.fitBounds(bound);
    }

    source.showFeatureInfo = (latlng, info) =>{
        let infoPopUp = null
        try {
            const featuresColection = JSON.parse(info);            
            if(featuresColection.features.length > 0){
                const featureProperties = featuresColection.features[0]["properties"];
                infoPopUp = {}
                infoPopUp["lat"] = featureProperties["origin_latitude"] 
                infoPopUp["lng"] = featureProperties["origin_longitude"]
                infoPopUp["place"] = featureProperties["description"]
                infoPopUp["localTime"] = featureProperties["origin_time"]
                infoPopUp["utcTime"] = featureProperties["origin_time"]
                infoPopUp["id"] = featureProperties["public_id"]
                infoPopUp["status"] = featureProperties["origin_evaluation_mode"].toString().toLowerCase() 
                infoPopUp["closerTowns"] = null    
                  
                infoPopUp["magnitude"] =parseFloat(featureProperties["magnitude"]).toFixed(2)   
                
                infoPopUp["mmi"] =featureProperties["shake_map.value"]
                infoPopUp["depth"] = parseFloat(featureProperties["origin_depth"]).toFixed(2)
                infoPopUp["cdi"] = null//Intensidad percibida
                infoPopUp["maxPGA"] = null//Máxima aceleración
                infoPopUp["agency"] = featureProperties["origin_agency_id"]
                infoPopUp["beachBall"] = null//Tensor momento
                infoPopUp["urlMoreInfo"] = null
                infoPopUp["urlReport"] = null
              
           
                showPopUp(latlng,infoPopUp);  
            
            
            }     
          } catch (error) {
            console.log({ error });
          }
    }

    return null;
}

export default CustomWMSLayerEvent;