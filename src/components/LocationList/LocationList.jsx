import React from "react";
import useFetch from "../../hooks/useFetchHook";
// import ceteficate1 from "../assests/images/certificate1.png";

const LocationList = () => {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");

  if (isLoading) <p>Loading Data</p>;
  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div className="locationItem" key={item.id}>
              <img src={item.picture_url.url} alt={item.name} />
              <div className="locationItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  {" "}
                  $&nbsp;{item.price}&nbsp;
                  <span>night(s)</span>
                </p>
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationList;
