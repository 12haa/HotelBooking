import React, { useEffect } from "react";
import { useBookmark } from "../context/BookmarkListContext";
import { useNavigate, useParams } from "react-router-dom";
import { endOfHour } from "date-fns";
import useFetch from "../../hooks/useFetchHook";
import Loader from "../Loader/Loader";

const Singlebookmark = () => {
  const { id } = useParams();
  const { getBookmark, isLoading, currentBookmark } = useBookmark();
  const navigate = useNavigate();

  useEffect(() => {
    getBookmark(id);
  }, [id]);
  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading || !currentBookmark) return <Loader />;
  return (
    <div>
      <button onClick={handleBack} className="btn btn--back">
        &larr; Back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <h2>{currentBookmark.country}</h2>
    </div>
  );
};

export default Singlebookmark;
