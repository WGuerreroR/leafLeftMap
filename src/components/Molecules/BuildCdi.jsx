import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import PerceivedTwo from "../../assets/icons/EQViewer/PerceivedIntensity/PerceivedTwo.svg";
import PerceivedThree from "../../assets/icons/EQViewer/PerceivedIntensity/PerceivedThree.svg";
import PerceivedFour from "../../assets/icons/EQViewer/PerceivedIntensity/PerceivedFour.svg";
import PerceivedFive from "../../assets/icons/EQViewer/PerceivedIntensity/PerceivedFive.svg";
import PerceivedSix from "../../assets/icons/EQViewer/PerceivedIntensity/PerceivedSix.svg";
import PerceivedSeven from "../../assets/icons/EQViewer/PerceivedIntensity/PerceivedSeven.svg";
import PerceivedSevenMore from "../../assets/icons/EQViewer/PerceivedIntensity/PerceivedSevenMore.svg";

class BuildCdi extends Component {
  render() {
    var cdi = this.props.cdi;
    var caso = "default";
    if (cdi >= 1) {
      caso = "caso1";
    }
    if (cdi === 2) {
      caso = "caso2";
    } else if (cdi === 3) {
      caso = "caso3";
    } else if (cdi === 4) {
      caso = "caso4";
    } else if (cdi === 5) {
      caso = "caso5";
    } else if (cdi === 6) {
      caso = "caso6";
    } else if (cdi === 7) {
      caso = "caso7";
    } else if (cdi > 7) {
      caso = "caso8";
    }

    switch (caso) {
      case "caso1":
        return (
          <Tooltip title="">
            <img
              alt=""
              style={{ display: "none" }}
              className="dates-icons"
            ></img>
          </Tooltip>
        );
      case "caso2":
        return (
          <Tooltip title="Intensidad Percibida – Apenas Sentido">
            <img alt="" className="dates-icons" src={PerceivedTwo}></img>
          </Tooltip>
        );
      case "caso3":
        return (
          <Tooltip title="Intensidad Percibida – Sentido Levemente">
            <img alt="" className="dates-icons" src={PerceivedThree}></img>
          </Tooltip>
        );
      case "caso4":
        return (
          <Tooltip title="Intensidad Percibida – Sentido Ampliamente">
            <img alt="" className="dates-icons" src={PerceivedFour}></img>
          </Tooltip>
        );
      case "caso5":
        return (
          <Tooltip title="Intensidad Percibida – Sentido Fuertemente">
            <img alt="" className="dates-icons" src={PerceivedFive}></img>
          </Tooltip>
        );
      case "caso6":
        return (
          <Tooltip title="Intensidad Percibida – Daño Leve">
            <img alt="" className="dates-icons" src={PerceivedSix}></img>
          </Tooltip>
        );
      case "caso7":
        return (
          <Tooltip title="Intensidad Percibida – Daño Moderado">
            <img alt="" className="dates-icons" src={PerceivedSeven}></img>
          </Tooltip>
        );
      case "caso8":
        return (
          <Tooltip title="Intensidad Percibida – Daño Severo">
            <img alt="" className="dates-icons" src={PerceivedSevenMore}></img>
          </Tooltip>
        );
      default:
        return (
          <Tooltip title="">
            <img
              alt=""
              style={{ display: "none" }}
              className="dates-icons"
            ></img>
          </Tooltip>
        );
    }
  }
}

export default BuildCdi;
