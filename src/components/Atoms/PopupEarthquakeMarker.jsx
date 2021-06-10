import React, { Fragment } from "react";

import BuildMmi from "../Molecules/BuildMmi";
import BuildCdi from "../Molecules/BuildCdi";

import { makeStyles } from "@material-ui/core/styles";
import ReactGa from 'react-ga'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0px",
    padding: "0px",
    backgroundColor: "#f9f9f9",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#667f00",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "10px",
    paddingTop: "5px",
  },
  place: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  timeContainer: {
    display: "flex",
    flexDirection: "row",
  },
  time: {
    marginTop: "0px",
    marginBottom: "0px",
    fontSize: "11px",
  },
  timeValueContainer: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  tableContainer: {
    padding: "7px 3px 0px 3px",
  },
  table: {
    display: "flex",
    flexDirection: "row",
    border: "0.5px solid #fff",
  },
  colTable: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  colTitleContainer: {
    height: "25px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "0.5px solid #fff",
  },
  colTitle: {
    textAlign: "center",
    fontSize: "10px",
    color: "#667f00",
    lineHeight: "9px",
    fontWeight: "bold",
  },
  colValueContainer: {
    paddingTop: "7px",
    paddingBottom: "7px",
    border: "0.5px solid #fff",
  },
  valueContainer: {
    border: "1.5px solid #666",
    padding: "2px 2px 2px 2px",
    borderRadius: "50px",
    height: "55px",
    width: "55px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    justifyItems: "center",
    alignContent: "center",
    alignItems: "center",
  },
  value: {
    marginTop: "0px",
    marginBottom: "0px",
    color: "#666",
    fontSize: "16px",
    lineHeight: "16px",
    textAlign: "center",
    padding: "0",
    fontWeight: "bold",
  },
  measurement: {
    textAlign: "center",
    color: "#666",
    lineHeight: "9px",
    fontSize: "9px",
  },
  iconValue: {
    border: "5px solid red",
  },
  locationValue: {
    color: "#666",
    textAlign: "center",
    fontSize: "11px",
    lineHeight: "10px",
    fontWeight: "bold",
    paddingTop: "3px",
  },
  locationMeasurement: {
    fontSize: "8px",
    lineHeight: "8px",
    textAlign: "center",
    color: "#666",
  },
  depthWord: {
    textAlign: "center",
    color: "#666",
    lineHeight: "9px",
    fontSize: "10px",
    fontWeight: "bold",
  },
  locationDataContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "10px",
    color: "#555",
  },
  locationData: {
    fontSize: "11px",
    lineHeight: "12px",
    paddingTop: "7px",
  },
  buttonsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "5px 5px 10px 5px",
    color: "#fff",
  },
  infoButton: {
    color: "#fff",
    backgroundColor: "#667f00",
    width: "130px",
    fontSize: "10px",
    height: "100%",
    fontWeight: "bold",
    border: "none",
    padding: "7px 2px 7px 2px",
    margin: "4px 3px 0px 3px",
    textAlign: "center",
    cursor: "pointer",
    textDecoration: "none",
  },
}));

const PopupEarthquakeMarker = ({
  lat,
  lng,
  place,
  localTime,
  utcTime,
  status,
  closerTowns,
  magnitude,
  mmi,
  depth,
  cdi,
  urlMoreInfo,
  urlReport,
  maxPGA,
  agency,
  beachBall,
}) => {
  const styles = useStyles();
  const isInTerritory = lat >= -5 && lat <= 15 && lng >= -83 && lng <= +67;

  const buildDepth = () => {
    let text = (
      <Fragment>
        <p className={styles.value}>{depth}</p>
        <p className={styles.measurement}>km</p>
      </Fragment>
    );
    if (status === "manual" && depth <= 30) {
      text = <p className={styles.depthWord}>Superficial</p>;
    }
    if (status === "automatic" && depth <= 70) {
      text = <p className={styles.depthWord}>Superficial</p>;
    }
    return text;
  };

  return (
    <div className={styles.root}>
      <div className={styles.headerContainer}>
        <h6 className={styles.place}>{place}</h6>
        <div className={styles.timeContainer}>
          <p className={styles.time}>
            <b>Tiempo de origen:</b>
          </p>
          <div className={styles.timeValueContainer}>
            <p className={styles.time}>
              {`${localTime} `}
              Hora Local
            </p>
            <p className={styles.time}>{`${utcTime} UTC `}</p>
          </div>
        </div>
        {maxPGA ? (
          <p className={styles.time}>
            <b>PGA Máximo: </b>
            {maxPGA} cm/s^2
          </p>
        ) : null}
        <p className={styles.time}>
          <b>Estado: </b>
          {status === "manual" ? "Manual" : "Automático"}
        </p>
        <p className={styles.time}>
          <b>Agencia: </b>
          {agency}
        </p>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <div className={styles.colTable}>
            <div className={styles.colTitleContainer}>
              <p className={styles.colTitle}>Magnitud</p>
            </div>
            <div className={styles.colValueContainer}>
              <div className={styles.valueContainer}>
                <p className={styles.value}>{magnitude}</p>
                <p className={styles.measurement}>M</p>
              </div>
            </div>
          </div>
          <div className={styles.colTable}>
            <div className={styles.colTitleContainer}>
              <p className={styles.colTitle}>Profundidad</p>
            </div>
            <div className={styles.colValueContainer}>
              <div className={styles.valueContainer}>{buildDepth()}</div>
            </div>
          </div>

          <div className={styles.colTable}>
            <div className={styles.colTitleContainer}>
              <p className={styles.colTitle}>Localización</p>
            </div>
            <div className={styles.colValueContainer}>
              <div className={styles.valueContainer}>
                <p className={styles.locationValue}>{lat.toFixed(2)}°</p>
                <p className={styles.locationMeasurement}>Latitud</p>
                <p className={styles.locationValue}>{lng.toFixed(2)}°</p>
                <p className={styles.locationMeasurement}>Longitud</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.table}>
          {mmi != null && mmi > 1 ? (
            <div className={styles.colTable}>
              <div className={styles.colTitleContainer}>
                <p className={styles.colTitle}>Intensidad instrumental</p>
              </div>
              <div className={styles.colValueContainer}>
                <div className={styles.valueContainer}>
                  <BuildMmi style={{ flex: "1" }} mmi={mmi} />
                </div>
              </div>
            </div>
          ) : null}
          {cdi != null && cdi > 1 ? (
            <div className={styles.colTable}>
              <div className={styles.colTitleContainer}>
                <p className={styles.colTitle}>Intensidad percibida</p>
              </div>
              <div className={styles.colValueContainer}>
                <div className={styles.valueContainer}>
                  <BuildCdi cdi={cdi} />
                </div>
              </div>
            </div>
          ): null}

          {beachBall != null ? (
            <div className={styles.colTable}>
              <div className={styles.colTitleContainer}>
                <p className={styles.colTitle}>Tensor Momento</p>
              </div>
              <div className={styles.colValueContainer}>
                <div className={styles.valueContainer}>
                  <img alt="beachballl" src={beachBall} />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.locationDataContainer}>
        {closerTowns ? (
          <p className={styles.locationData}>
            <b>Municipios Cercanos: </b>
            {closerTowns}
          </p>
        ) : null}
      </div>
      <div className={styles.buttonsContainer}>
        {isInTerritory ? (
          <a
            className={styles.infoButton}
            style={{ color: "#fff" }}
            href={urlReport}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e=>ReactGa.event({category:'Button', action:`¿Sentiste este sismo? from EQViewer PopUp`})}
          >
            ¿Sentiste este sismo?
          </a>
        ) : null}
        <a
          className={styles.infoButton}
          style={{ color: "#fff" }}
          href={urlMoreInfo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e=>ReactGa.event({category:'Button', action:`Más Información from EQViewer PopUp`})}
        >
          Más información
        </a>
      </div>
    </div>
  );
};

export default PopupEarthquakeMarker;
