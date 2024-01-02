import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "../sass/WishlistCard.scss";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { wishlistOperationsUpdate  } from "../utils/wishlist";
import { addItemToWishlist } from "../utils/store/wishSlice";

function WishlistCard({ bookData }) {

  const dispatch = useDispatch();

  const handleRemove = (data)=>{
    wishlistOperationsUpdate(data.book_id);
    dispatch(addItemToWishlist(data));
  }

  return (
    <div className="wishlist-card-container">
      <div className="wishlist-card-content-1">
        <img src={bookData.bookImage} alt="bookImage" />
      </div>
      <div className="wishlist-card-content-2">
        <div>
          <h3>{bookData.bookName}</h3>
          <p>by author</p>
        </div>
        <div>
          Rs. 1500 <span>{bookData.price}</span>
        </div>
      </div>
      <div className="wishlist-card-content-3">
        <IconButton onClick={() => handleRemove(bookData)} type="button">
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default WishlistCard;
