import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import InstrumentalOne from "../../assets/icons/EQViewer/InstrumentalIntensity/InstrumentalOne.svg";
import InstrumentalTwoThree from "../../assets/icons/EQViewer/InstrumentalIntensity/InstrumentalTwoThree.svg";
import InstrumentalFour from "../../assets/icons/EQViewer/InstrumentalIntensity/InstrumentalFour.svg";
import InstrumentalFive from "../../assets/icons/EQViewer/InstrumentalIntensity/InstrumentalFive.svg";
import InstrumentalSix from "../../assets/icons/EQViewer/InstrumentalIntensity/InstrumentalSix.svg";
import InstrumentalSeven from "../../assets/icons/EQViewer/InstrumentalIntensity/InstrumentalSeven.svg";
import InstrumentalEight from "../../assets/icons/EQViewer/InstrumentalIntensity/InstrumentalEight.svg";
import InstrumentalNine from "../../assets/icons/EQViewer/InstrumentalIntensity/InstrumentalNine.svg";
import InstrumentalTen from "../../assets/icons/EQViewer/InstrumentalIntensity/InstrumentalTen.svg";

class BuildMmi extends Component {
  render() {
    var mmi = this.props.mmi;
    var caso = "default";
    if (mmi <= 1) {
      caso = "caso1";
    } else if (mmi === 2) {
      caso = "caso2";
    } else if (mmi === 3) {
      caso = "caso3";
    } else if (mmi === 4) {
      caso = "caso4";
    } else if (mmi === 5) {
      caso = "caso5";
    } else if (mmi === 6) {
      caso = "caso6";
    } else if (mmi === 7) {
      caso = "caso7";
    } else if (mmi === 8) {
      caso = "caso8";
    } else if (mmi === 9) {
      caso = "caso9";
    } else if (mmi === 10) {
      caso = "caso10";
    }

    switch (caso) {
      case "caso1":
        return (
          <Tooltip title="">
            <img alt="dates-icons default" style={{ display: "none" }} className="dates-icons"></img>
          </Tooltip>
        );
      case "caso2":
        return (
          <Tooltip title="Intensidad Instrumental - Débil">
            <img alt="dates-icons debil" className="dates-icons" src={InstrumentalOne}></img>
          </Tooltip>
        );
      case "caso3":
        return (
          <Tooltip title="Intensidad Instrumental - Débil">
            <img
              alt="Instrumental"
              className="dates-icons"
              src={InstrumentalTwoThree}
            ></img>
          </Tooltip>
        );
      case "caso4":
        return (
          <Tooltip title="Intensidad Instrumental - Leve">
            <img alt="instrumental intensity" className="dates-icons" src={InstrumentalFour}></img>
          </Tooltip>
        );
      case "caso5":
        return (
          <Tooltip title="Intensidad Instrumental - Moderado">
            <img alt="moderado" className="dates-icons" src={InstrumentalFive}></img>
          </Tooltip>
        );
      case "caso6":
        return (
          <Tooltip title="Intensidad Instrumental - Fuerte">
            <img alt="Fuerte" className="dates-icons" src={InstrumentalSix}></img>
          </Tooltip>
        );
      case "caso7":
        return (
          <Tooltip title="Intensidad Instrumental - Muy Fuerte">
            <img alt="Muy fuerte" className="dates-icons" src={InstrumentalSeven}></img>
          </Tooltip>
        );
      case "caso8":
        return (
          <Tooltip title="Intensidad Instrumental - Severo">
            <img alt="severo" className="dates-icons" src={InstrumentalEight}></img>
          </Tooltip>
        );
      case "caso9":
        return (
          <Tooltip title="Intensidad Instrumental - Violento">
            <img alt="violento" className="dates-icons" src={InstrumentalNine}></img>
          </Tooltip>
        );
      case "caso10":
        return (
          <Tooltip title="Intensidad Instrumental - Extremo">
            <img alt="extremo" className="dates-icons" src={InstrumentalTen}></img>
          </Tooltip>
        );
      default:
        return (
          <Tooltip title="">
            <img
              alt="default"
              style={{ display: "none" }}
              className="dates-icons"
            ></img>
          </Tooltip>
        );
    }
  }
}

export default BuildMmi;
