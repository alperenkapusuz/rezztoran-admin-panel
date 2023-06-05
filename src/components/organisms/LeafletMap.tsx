import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type Props = {
  longitude: number | undefined;
  latitude: number | undefined;
};

const LeafletMap = ({ longitude, latitude }: Props) => {
  if (longitude === undefined && latitude === undefined) {
    return <div>Harita Yok</div>;
  }

  console.log("longitude, latitude: ", longitude, latitude);

  return (
    <div
      style={{
        overflow: "hidden",
        height: "50vh",
        width: "100vh",
      }}
    >
      {longitude && latitude && (
        <MapContainer
          center={[longitude, latitude]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "50vh", width: "100vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[longitude, latitude]}>
            <Popup>Restoran Konumu</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default LeafletMap;
