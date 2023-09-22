import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetchHook";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelProvider";
const SingleHotel = () => {
  const { id } = useParams();
  //   const { CurrentHotel, isLoading } = useFetch(`http://localhost:5000/hotels/${id}`);
  const { getHotel, isLoadingCurrentHotel, CurrentHotel } = useHotels();
  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrentHotel || !CurrentHotel) return <Loader />;

  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{CurrentHotel.name}</h2>
        <div>
          {CurrentHotel.number_of_reviews} &bull; {CurrentHotel.smart_location}
        </div>
        <img src={CurrentHotel.xl_picture_url} alt={CurrentHotel.name} />
      </div>
    </div>
  );
};

export default SingleHotel;
