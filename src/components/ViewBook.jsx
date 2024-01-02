import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../sass/ViewBook.scss";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { cartOperationsUpdate } from "../utils/cart";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { wishlistOperationsUpdate } from "../utils/wishlist";
import { addItemToWishlist, setWishlistItems } from "../utils/store/wishSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
import { addItemToCart, removeFromCart,setCartItems } from "../utils/store/cartSlice";
import useBook from "../utils/hooks/viewBook.hook";

export default function ViewBook() {
  const [quantity, setQuantity] = useState(false);
  const [wishlistData,setWishlistData] = useState(false);
  const [notify,setNotify]= useState(false);
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookData = useSelector((store) => store.book.bookData);
  const wishlist = useSelector((store)=>store.wish.wishlist);
  const cartData = useSelector((store)=>store.cart.cartItems);
  const navigate = useNavigate();

  const data = bookData.find((book) => book._id === id);
  useEffect(() => {
    const dataWishlist = wishlist?.items?.find((book) => book.book_id === id);
    if(dataWishlist){
      setWishlistData(true)
    }
  }, []);
  
  

  const handleCart = (data) => {
    cartOperationsUpdate(data._id);
    if(cartData?.length){
      dispatch(addItemToCart(data))
      }
      else{
        dispatch(setCartItems({items:[{...data}]}))
      }
    setQuantity(true);
  };

  
  useBook();

  const handleWishlist = (data) => {

    wishlistOperationsUpdate(`${data._id}`);
    if(wishlist?.length){
    dispatch(addItemToWishlist(data))
    }
    else{
      dispatch(setWishlistItems({items:[{...data}]}))
    }
    setWishlistData(!wishlistData);
    
    
  };

  const handleQuantityAdd = (data) => {
      setCount(count + 1);
      dispatch(addItemToCart(data))
      cartOperationsUpdate(data._id);
  };

  const handleQuantityRemove = (data) =>{
    if(count > 1){
    setCount(count - 1);
    dispatch(removeFromCart(data));}
    else{
      setQuantity(false);
    }
  }

  const handleNotify = ()=>{
    setNotify(true);
  }

  const handleHome = () =>{
    navigate('/home')
  }

  return (
    <div className="viewbook-container">
      {data ? (
        <>
          <div className="viewbook-content-1">
            <span onClick={handleHome}>Home /</span>
            Book(01)
          </div>
          <div className="viewbook-content-2">
            <div className="content-sub-1">
              <img src={data.bookImage} />
              <div className="viewbook-buttons">
                {data?.quantity > 0 ? (
                  <>
                    {quantity ? (
                      <div className="cart-quantity-update">
                        <div>
                          <IconButton
                            onClick={() => handleQuantityRemove(data)}
                            type="button"
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                          <div>{count}</div>
                          <IconButton
                            onClick={() => handleQuantityAdd(data)}
                            type="button"
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleCart(data)}
                        sx={{
                          background: "#A03037",
                          "&:hover": { background: "#7C1E1E" },
                        }}
                        size="medium"
                        variant="contained"
                      >
                        Add to Cart
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                  onClick={handleNotify}
                    sx={{
                      background: notify ? "#333333" : "#A03037" ,
                      "&:hover": { background:notify? "#333344": "#7C1E1E" },
                    }}
                    size="medium"
                    variant="contained"
                  >
                    {notify ? "Got It" : "Fotify Me"}
                  </Button>
                )}
                <Button
                  onClick={() => {
                    handleWishlist(data);
                  }}
                  sx={{
                    background: wishlistData ? "#333333" : "#A03037",
                    "&:hover": {  background: wishlistData ? "#333333" :  "#7C1E1E" },
                  }}
                  size="medium"
                  variant="contained"
                  startIcon={<FavoriteBorderIcon />}
                >
                  {wishlistData ? "remove  Wishlist" : "Add to Wishlist"  }
                </Button>
              </div>
            </div>
            <div className="content-sub-2">
              <div className="viewbook-details">
                <h1>{data.bookName}</h1>
                <p>by author</p>
                <p>rating</p>
                <h1>Rs. {data.price}</h1>
              </div>
              <div>
                <h3>*Book Details</h3>
                <p>
                  In Pressbooks, the Book Info page is where you put information
                  about your book. In the book publishing industry, this is
                  called “metadata”. Metadata allows book stores and libraries
                  to accurately categorize a book and makes it easier for
                  readers to find by answering questions like: What is this
                  book’s title? Who is the author? When was it published? and
                  What is the book about? Some book info (metadata) is required
                  and will be filled in by default when you create your book.
                  Required metadata allows Pressbooks to build your book’s home
                  page, automatically generate the cover, title page, and
                  copyright notice in your book exports, and meet the metadata
                  requirements of ebook sellers for your EPUB exports. In
                  general, we recommend adding as much information as you can
                  when creating your book.
                </p>
              </div>
              <div className="content-divider">
                <h3>Customer Feedback</h3>
                <div>
                  <Typography component="legend">Overall rating</Typography>
                  <Rating
                    name="simple-controlled"
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </div>
                <div>
                  <TextField multiline rows={3} fullWidth id="fullWidth" />
                </div>
                <Button
                  sx={{
                    background: "#A03037",
                    "&:hover": { background: "#7C1E1E" },
                  }}
                  size="medium"
                  variant="contained"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
