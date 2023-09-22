import React from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetchHook";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useHotels } from "../context/HotelProvider";

const Hotels = () => {
  const { isLoading, hotels, CurrentHotel } = useHotels();

  if (isLoading) <Loader />;

  return (
    <div className="searchList">
      <h2> Search Results ({hotels.name})</h2>

      {hotels.map((item) => (
        <Link
          to={`/hotels/${item.id}?lat=${item.latitude}&lang=${item.longitude}`}
          key={item.id}
        >
          <div
            className={`searchItem ${
              item.id === CurrentHotel?.id ? "current-hotel" : ""
            }`}
          >
            <img src={item.picture_url.url} alt={item.name} />
            <div className="searchItemDesc">
              <p className="location">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p className="price">${item.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Hotels;
