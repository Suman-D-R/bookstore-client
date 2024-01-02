import React from "react";
import "../sass/CartBookCard.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { addItemToCart, removeFromCart } from "../utils/store/cartSlice";
import { deletFromCart, cartOperationsUpdate} from "../utils/cart";

function CartBookCard({ cartData, summery=false }) {
  const dispatch = useDispatch();

  const handleRemoveItems = (data) => {
    dispatch(removeFromCart(data));
    deletFromCart(data.book_id);

  };

  const handleAddItems = (data) => {
    dispatch(addItemToCart(data));
    cartOperationsUpdate(data.book_id);
  };

  return (
    <div className="book-container">
      <div className="cart-image">
        <img src={cartData.bookImage} />
      </div>
      <div className="book-container-content">
        <div className="cart-book-details">
          <h2>{cartData.bookName}</h2>
          <p>by {cartData.bookName}</p>
          <div>
            <h1>Rs. {summery ? cartData.quantity*cartData.price : cartData.price}</h1>
          </div>
        </div>
        <div className="cart-book-quantity">
          {summery ? (
            <div>Quantity {cartData.quantity}</div>
          ) : (
            <div className="increment-decrimrnt">
              <IconButton
                onClick={() => handleRemoveItems(cartData)}
                type="button"
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <div>{cartData.quantity}</div>
              <IconButton
                onClick={() => handleAddItems(cartData)}
                type="button"
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default CartBookCard;
