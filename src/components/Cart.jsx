import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../sass/Cart.scss";
import CartBookCard from "./CartBookCard";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setOrders, addItemToOrder } from "../utils/store/orderSlice";
import { placeOrder } from "../utils/order";
import useCart from "../utils/hooks/cart.hoock";
import useAddress from "../utils/hooks/address.hook";

function Cart() {
  const [customerDetails, setCustomerDetails] = useState(false);
  const [address, setAddress] = useState(false);
  const [total, setTotal] = useState();
  useAddress();
  const data = useSelector((store) => store.address?.addressData);
  const orderData = useSelector((store) => store.order?.orderItems);

  const addressData = data?.address?.[0];

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useCart();

  const cartData = useSelector((store) => store.cart?.cartItems);

  const location = [
    { label: "Bengaluru" },
    { label: "Mysore" },
    { label: "Mumbai" },
  ];

  useEffect(() => {
    const tatalAmount = cartData?.items?.reduce((total, val) => {
      return total + val.quantity * val.price;
    }, 0);

    setTotal(tatalAmount);
  }, [cartData?.items]);

  const handleOrder = () => {
    setCustomerDetails(true);
  };

  const handleAddress = () => {
    setAddress(true);
  };

  const orderItems = { items: cartData?.items, address: addressData };

  const handleCheckOut = (data) => {
    if (orderData?.length) {
      dispatch(addItemToOrder(orderItems));
    } else {
      dispatch(setOrders({ orderItems: [{ ...orderItems }] }));
    }
    placeOrder(data);
    navigate("/home/ordersuccessful");
  };

  const handleAddAddress = () => {
    navigate("/home/profile");
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <Header />
      </div>
      {cartData ? (
        <div className="cart-content">
          <div className="card-content-1">
            <span>Home</span> / My Cart
          </div>
          <div className="cart-content-2">
            <div className="item-content-1">
              <h1>My Cart({cartData.items ? cartData.items.length : 0})</h1>
              <div>
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={location}
                  sx={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      placeholder="Location"
                    />
                  )}
                />
              </div>
            </div>
            <div className="item-content-2">
              {cartData.items &&
                cartData?.items?.map((val, index) => (
                  <CartBookCard key={val.book_id} cartData={val} />
                ))}
            </div>
            {customerDetails ? (
              <div></div>
            ) : (
              <div className="item-content-3">
                <Button onClick={handleOrder} variant="contained">
                  Place Order
                </Button>
              </div>
            )}
          </div>
          <div className="cart-content-3">
            <div className="cart-customer-content">
              <h1>Customer Details</h1>
              <Button onClick={handleAddAddress}>Add address</Button>
            </div>
            {customerDetails && addressData ? (
              <div className="cart-address-form">
                <div className="cart-textcontent">
                  <div className="cart-split-content">
                    <p>Full Name</p>
                    <TextField
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      id="fullWidth"
                      value={addressData.fullName}
                    />
                  </div>
                  <div className="cart-split-content">
                    <p>Mobile Number</p>
                    <TextField
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      id="fullWidth"
                      value={addressData.mobileNumber}
                    />
                  </div>
                </div>
                <div>
                  <p>Address</p>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    id="fullWidth"
                    value={addressData.address}
                  />
                </div>
                <div className="cart-textcontent">
                  <div className="cart-split-content">
                    <p>City / Town</p>
                    <TextField
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      id="fullWidth"
                      value={addressData.city}
                    />
                  </div>
                  <div className="cart-split-content">
                    <p>State </p>
                    <TextField
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      id="fullWidth"
                      value={addressData.state}
                    />
                  </div>
                </div>
                <div>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Type
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="Home"
                        label="Home"
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="Work"
                        control={<Radio />}
                        label="Work"
                      />
                      <FormControlLabel value="other" control={<Radio />} />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div>
                  {address ? (
                    <div></div>
                  ) : (
                    <div className="item-content-3">
                      <Button onClick={handleAddress} variant="contained">
                        Continue
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="cart-content-4">
            <div>
              <h2>Order summary</h2>
              {address ? (
                <div className="order-summery">
                  {cartData.items &&
                    cartData.items.map((val, index) => (
                      <CartBookCard
                        key={val.book_id}
                        cartData={val}
                        summery={true}
                      />
                    ))}
                </div>
              ) : (
                <div></div>
              )}
              <div className="checkout-container">
                {address ? (
                  <div className="item-summery-checkout">
                    <h2>total Rs. {total}</h2>
                    <Button
                      onClick={() => handleCheckOut(addressData._id)}
                      variant="contained"
                    >
                      Check Out
                    </Button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No cart Items</div>
      )}
    </div>
  );
}

export default Cart;
