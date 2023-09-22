import React from "react";
import Map from "../Map/Map";
import { useHotels } from "../context/HotelProvider";
import { Outlet } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContext";

const BookmarkLayout = () => {
  const { bookmarks } = useBookmark();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map locations={[bookmarks]} />
    </div>
  );
};

export default BookmarkLayout;
