import React from 'react';
import '../sass/OrderBookCard.scss';

function OrderBookCard({data}) {
  return (
    <div className='orderbookcard-container'>
<div className='orderbookcard-content-1'>
    <div className='orderbookcard-img'><img src={data.bookImage}></img></div>
    <div className='orderbookcard-details'>
        <h3>{data.bookName}</h3>
        <p>author</p>
        <p>{data.quantity}</p>
        <h3>Rs. {data.quantity*data.price}</h3>
    </div>
</div>
<div className='orderbookcard-content-2'>
<p>Order Placed on May 25 dec</p>
</div>
    </div>
  )
}

export default OrderBookCard