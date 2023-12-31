import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetchHook";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
const baseURL = "http://localhost:5000";

const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: null,
  error: null,
};

const BookmarkListProvider = ({ children }) => {
  // const [currentBookmark, setCurrentBookmark] = useState();

  // const [bookmarks, setBookmarks] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // const { data: bookmarks, isLoading } = useFetch(`${baseURL}/bookmarks`);

  // create a useReducer hook
  function bookmarkReducer(state, action) {
    switch (action.type) {
      case "loading":
        return { ...state, isLoading: true };
      case "bookmarks/loaded":
        return {
          ...state,
          isLoading: false,
          bookmarks: action.payload,
        };
      case "bookmark/loaded":
        return {
          ...state,
          isLoading: false,
          currentBookmark: action.payload,
        };
      case "bookmark/created":
        return {
          ...state,
          isLoading: false,
          bookmarks: [...state.bookmarks, action.payload],
          currentBookmark: action.payload,
        };
      case "bookmark/deleted":
        return {
          ...state,
          isLoading: false,
          bookmarks: state.bookmarks.filter(
            (item) => item.id !== action.payload
          ),
          currentBookmark: null,
        };
      case "rejeted":
        return { ...state, isLoading: false, error: action.payload };
      default:
        throw new Error("Unknown Action");
    }
  }

  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });

      try {
        const { data } = await axios.get(`${baseURL}/bookmarks/`);

        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error);
        dispatch({
          type: "rejecter",
          payload: "an Error occoured in loading dataQQ",
        });
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    if (Number(id) === currentBookmark?.id) return;
    dispatch({ type: "loading" });

    try {
      const { data } = await axios.get(`${baseURL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error);
      dispatch({
        type: "rejected",
        payload: "an Error Occourd while fetching single bookmark",
      });
    }
  }

  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${baseURL}/bookmarks/ `, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error);
      dispatch({ type: "rejected", payload: error.message });
    }
  }
  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${baseURL}/bookmarks/${id} `);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error(error);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        currentBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkListProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}
