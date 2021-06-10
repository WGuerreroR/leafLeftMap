import { useLeaflet } from "react-leaflet";
import * as WMS from "leaflet.wms";


function CustomWMSLayer(props) {
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
        try {
            const featuresColection = JSON.parse(info);            
            if(featuresColection.features.length > 0)
                showPopUp(latlng,featuresColection);       
          } catch (error) {
            console.log({ error });
          }
    }

    return null;
}

export default CustomWMSLayer;