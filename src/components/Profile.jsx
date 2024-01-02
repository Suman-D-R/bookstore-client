import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "../sass/Profile.scss";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { getUser } from "../utils/user";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./AddressCard";
import useAddress from "../utils/hooks/address.hook";

function Profile() {
  const addressData = useSelector((store) => store.address.addressData);
  const [userData, setUserData] = useState(null);
  const [showAddress, setShowAddress] = useState(addressData?.address?.length ? false : true);


  useEffect(()=>{
    console.log(addressData);
  },[addressData])

  const dispach = useDispatch();
  useAddress();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUser(
          localStorage.getItem("accessTokenBookstore")
        );
        setUserData(result.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const key = e.target.value;
    //  dispach(key)
  };

  const handleAddress = ()=>{
    setShowAddress(true)
  }

  return (
    <div className="profile-container">
      <div className="path">
        <span>Home / </span>profile
      </div>
      {userData ? (
        <div className="profile-content">
          <div className="profile-content-1">
            <div>
              <h1>Presonal Details</h1>
            </div>
            <div>
              <p>Full Name</p>
              <TextField
                disabled
                fullWidth
                id="fullWidth"
                value={`${userData?.firstName || ""} ${
                  userData?.lastName || ""
                }`}
              />
            </div>
            <div>
              <p>Email Id</p>
              <TextField
                disabled
                fullWidth
                id="fullWidth"
                value={userData?.email || ""}
              />
            </div>
            <div>
              <p>Password</p>
              <TextField
                type="password"
                disabled
                fullWidth
                id="fullWidth"
                value="suman123"
              />
            </div>
            <div>
              <p>Mobile Number</p>
              <TextField disabled fullWidth id="fullWidth" value="7726535418" />
            </div>
          </div>
          <div className="profile-content-2">
            <div className="profile-address">
              <h2>Address Details</h2>
              <Button onClick={handleAddress}>Add New Address</Button>
            </div>
            {addressData?.address?.length && (
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  defaultValue={addressData?.address[0]?._id}
                  onChange={handleChange}
                >
                  {addressData?.address?.map((val) => {
                    return <AddressCard data={val} />;
                  })}
                </RadioGroup>
              </FormControl>
            )}   
              {showAddress && 
              <div>
                <AddressCard  setData={setShowAddress} />
              </div>
}
            
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Profile;
