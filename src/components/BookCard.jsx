import React from "react";
import "../sass/BookCard.scss";
import Rating from '@mui/material/Rating';

function BookCard({ onClick, booksData }) {
  return (
    <div onClick={onClick} className="container-card">
      {booksData.quantity > 0 ?  <span></span> : <div className="outof-stock"><span>Out Of Stock</span></div>}
      <div className="container-card-1">
        <img src={booksData.bookImage}></img>
      </div>
      <div className="container-card-2">
        <h3>{booksData.bookName}</h3>
        <p>by {booksData.author}</p>
        <p><Rating name="read-only" defaultValue={4} size="small" readOnly /> <span>4</span></p>
        <div>
          <h3>Rs. {booksData.discountPrice}</h3>
          <p>Rs. {booksData.price}</p>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
