import React from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/material";
import { addNewAddress, setAddress } from "../utils/store/address";
import { addAddress } from "../utils/address";
import useAddress from "../utils/hooks/address.hook";

function AddressCard({ data ,setData}) {

  const dispatch = useDispatch();

  const [address, setAddressData] = useState({
    address: "",
    fullName: "",
    mobileNumber: "",
    city: "",
    state: "",
    gender: "Home", 
  });

  const oldAddress = useSelector((store)=>store.address.addressData);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setAddressData((prevAddress) => ({
      ...prevAddress,
      [id]: value,
    }));
  };

  const handleSubmit = ()=>{

    addAddress(address);
    setData(false);
    if(oldAddress?.length){
    dispatch(addNewAddress(address));
    }
    else{
    dispatch(setAddress({address:[{...address}]}))
    }
    

  }

  return (
    <>
      {data ? (
        <div className="profile-address-field">
          <h3>1. WORK</h3>
          <FormControlLabel
            value={data._id}
            control={<Radio />}
            label={data.city}
          />
          <div>
            <p>Address</p>
            <TextField disabled value={data.address} fullWidth id="fullWidth" />
          </div>
          <div className="profile-addres-split">
            <div className="split-textfield">
              <p>City / Town</p>
              <TextField disabled value={data.city} fullWidth id="fullWidth" />
            </div>
            <div className="split-textfield">
              <p>State</p>
              <TextField
                disabled
                value={data?.state}
                fullWidth
                id="fullWidth"
              />
            </div>
          </div>
          <div>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Home"
                  control={<Radio />}
                  label="Home"
                />
                <FormControlLabel
                  value="Work"
                  control={<Radio />}
                  label="Work"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      ) : (
        <div className="profile-address-field">
        <h3>1. WORK</h3>
        <div>
          <p>Address</p>
          <TextField
            onChange={handleChange}
            fullWidth
            id="address"
            value={address.address}
          />
        </div>
        <div className="profile-addres-split">
          <div className="split-textfield">
            <p>Full Name</p>
            <TextField
              onChange={handleChange}
              fullWidth
              id="fullName"
              value={address.fullName}
            />
          </div>
          <div className="split-textfield">
            <p>Mobile Number</p>
            <TextField
              onChange={handleChange}
              fullWidth
              id="mobileNumber"
              value={address.mobileNumber}
            />
          </div>
        </div>
        <div className="profile-addres-split">
          <div className="split-textfield">
            <p>City / Town</p>
            <TextField
              onChange={handleChange}
              fullWidth
              id="city"
              value={address.city}
            />
          </div>
          <div className="split-textfield">
            <p>State</p>
            <TextField
              onChange={handleChange}
              fullWidth
              id="state"
              value={address.state}
            />
          </div>
        </div>
        <div>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={address.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="Home" control={<Radio />} label="Home" />
              <FormControlLabel value="Work" control={<Radio />} label="Work" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      )}
    </>
  );
}

export default AddressCard;
