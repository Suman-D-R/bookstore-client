import { useEffect, useState } from "react";
import { bookOperations } from "../utils/books";
import BookCard from "./BookCard";
import "../sass/Home.scss";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { cartOperations } from "../utils/cart";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../utils/store/cartSlice";
import { setBookData, sortByPrice } from "../utils/store/bookSlice";
import { wishlistOperations } from "../utils/wishlist";
import { setWishlistItems } from "../utils/store/wishSlice";
import { setOrders } from "../utils/store/orderSlice";
import { getOrders } from "../utils/order";
import { getAddress } from "../utils/address";
import { setAddress } from "../utils/store/address";

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const searchItems = useSelector((store) => store.book.searchData);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  useEffect(() => {
    const fetchData = async (operation, action) => {
      try {
        const data = await operation();
        const bookData = data.data;
        dispatch(action(bookData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(bookOperations, setBookData);
    fetchData(cartOperations, setCartItems);
    fetchData(wishlistOperations, setWishlistItems);
    fetchData(getOrders,setOrders);
    fetchData(getAddress, setAddress);
  }, [dispatch]);

  const handleChange = (event) => {
    const value = event.target.value;
    dispatch(sortByPrice(value));
  };

  const handleView = (val) => {
    navigation(`/book/${val._id}`);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = searchItems.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home-container">
      <div className="home-container-1">
        <div className="container-1-content-1">
          Books ({searchItems.length})
        </div>
        <div className="container-1-content-2">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel style={{ zIndex: -1 }} id="demo-select-small">
              Sort By
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="sort by"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="low">Low to High</MenuItem>
              <MenuItem value="high">High to Low</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="home-container-2">
        <div className="home-card-container">
          {currentBooks.map((val) => (
            <BookCard
              onClick={() => handleView(val)}
              key={val._id}
              booksData={val}
            />
          ))}
        </div>
        <div className="pagination-container">
          {Array.from({ length: Math.ceil(searchItems.length / booksPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              style={{ backgroundColor: currentPage === index + 1 ? "brown" : "gray" }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
