import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetchHook";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();
const baseURL = "http://localhost:5000/hotels";
const HotelProvider = ({ children }) => {
  const [CurrentHotel, setCurrentHotel] = useState();
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data: hotels, isLoading } = useFetch(
    baseURL,
    `q=${destination || " "}&accommodates_gte=${room || 1}`
  );

  async function getHotel(id) {
    try {
      setIsLoadingCurrentHotel(true);
      const { data } = await axios.get(`${baseURL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrentHotel(false);
    } catch (error) {
      toast.error(error);
      setIsLoadingCurrentHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
        getHotel,
        isLoadingCurrentHotel,
        CurrentHotel,
        setCurrentHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export default HotelProvider;

export function useHotels() {
  return useContext(HotelContext);
}
