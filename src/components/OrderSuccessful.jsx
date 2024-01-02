import React from "react";
import logo from "../assets/success.jpg";
import "../sass/OrderSuccessful.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function OrderSuccessful() {
  const navigate = useNavigate();

const handleClick = ()=>{
  navigate('/home')
}

  return (
    <div className="successful-container">
      <div className="sucess-img">
        <img src={logo} alt="" />
        <h1>Order placed successful</h1>
      </div>
      <div><Button onClick={handleClick}>Continue Shopping</Button></div>
    </div>
  );
}

export default OrderSuccessful;
