import { useLeaflet } from "react-leaflet";
import * as WMS from "leaflet.wms";


function CustomWMSLayer(props) {
    const { url, options,layers } = props;
    const ctx = useLeaflet()
    const map = ctx.map; 
    const source = WMS.source(
        url,
        options
    );
    for(let name of layers){     
        map.eachLayer(function (layer) {
            if( layer._name === name){
                //remove layer for actualizate params 
                map.removeLayer(layer);
            }
        });   
        source.getLayer(name).addTo(map); 
        //source.getLayer(name).bringToFront();
     }
    return null;
}

export default CustomWMSLayer;