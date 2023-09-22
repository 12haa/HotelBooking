import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { LayerGroup } from "react-leaflet";
import axios from "axios";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/BookmarkListContext";
const AddNewBookmark = () => {
  const [lat, lng] = useUrlLocation();

  const BASE_GEOCODING_URL =
    "https://api.bigdatacloud.net/data/reverse-geocode-client";
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState(null);
  const [countryName, setCountryName] = useState("");
  const { createBookmark } = useBookmark();
  useEffect(() => {
    if (!lat && !lng) return;
    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      setGeocodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "this location is not a ciry please click somewhere else"
          );

        setCityName(data.countryName);
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        console.log(error, "im error");
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitue: lat,
      longitude: lng,
      host_location: cityName + "" + country,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark");
  };

  if (isLoadingGeoCoding) return <Loader />;
  if (geocodingError) return <p className="form">{geocodingError}</p>;

  return (
    <div>
      <h2>bookmark new location</h2>
      <form className="form " onClick={handleSubmit}>
        <div className="formControl">
          <label htmlFor="cityName">City name</label>
          <input
            type="text"
            name="cityName"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>

        <div className="formControl">
          <label htmlFor="country">country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <span className="flag">
            <ReactCountryFlag svg countryCode={countryCode} svgVariant="of" />
          </span>
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button className="btn btn--primary"> Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBookmark;
