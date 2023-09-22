import React, { useEffect, useState } from "react";
import { useHotels } from "../context/HotelProvider";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import useUrlLocation from "../../hooks/useUrlLocation";

const Map = ({ locations }) => {
  const { hotels } = useHotels();
  // console.log(locations);
  const [mapCenter, setMapCenter] = useState([50, 4]);
  const [lat, lang] = useUrlLocation();

  const {
    isLoading: isLoadingPosition,
    error,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lang) setMapCenter([lat, lang]);
  }, [lat, lang]);

  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lang)
      setMapCenter([geoLocationPosition?.lat, geoLocationPosition?.lang]);
  }, [geoLocationPosition]);
  return (
    <div className="mapContainer">
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="map"
      >
        <button className="getLocation" onClick={getPosition}>
          {isLoadingPosition ? "Loading" : " Use Your Location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        {hotels.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.host_location}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
      ,
    </div>
  );
};

export default Map;

export function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lang=${e.latlng.lng}`),
  });
  return null;
}
