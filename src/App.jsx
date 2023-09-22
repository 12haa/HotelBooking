import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelProvider from "./components/context/HotelProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
// import Bookmark from "./components/BookmarkLayout/BookmarkLayout";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";

import BookmarkListProvider from "./components/context/BookmarkListContext";
import Bookmark from "./components/Bookmark/Bookmark";
import Singlebookmark from "./components/Singlebookmark/Singlebookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import Login from "./components/Login/Login";
import AuthContextProvider from "./components/context/AuthContext";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BookmarkListProvider>
          <HotelProvider>
            <Header />
            <Routes>
              <Route path="/" element={<LocationList />} />
              <Route path="login" element={<Login />} />
              <Route path="/hotels" element={<AppLayout />}>
                <Route index element={<Hotels />} />
                <Route path=":id" element={<SingleHotel />} />
              </Route>
              <Route path="/bookmark" element={<BookmarkLayout />}>
                <Route index element={<Bookmark />} />
                <Route path=":id" element={<Singlebookmark />} />
                <Route path="add" element={<AddNewBookmark />} />
              </Route>
            </Routes>
          </HotelProvider>
        </BookmarkListProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
