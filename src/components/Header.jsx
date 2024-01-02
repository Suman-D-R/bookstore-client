import "../sass/Header.scss";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Popper from "@mui/material/Popper";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { filterBookData, setBookData } from "../utils/store/bookSlice";
import { setAddress } from "../utils/store/address";
import { setOrders } from "../utils/store/orderSlice";
import { setWishlistItems } from "../utils/store/wishSlice";

function Header({ home = true }) {
  const navigation = useNavigate();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const name = localStorage.getItem("name");

  const handleProfile = () => {
    navigation("/home/profile");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "spring-popper" : undefined;

  const hangleCart = () => {
    navigation("/cart");
  };

  const handleHome = () => {
    navigation("/home");
  };

  const handleWishlist = () => {
    navigation("/home/wishlist");
  };

  const handleOrder = () => {
    navigation('/home/orders');
  }

  const handleSearch = () => {
    dispatch(filterBookData(searchValue));
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    if(e.target.value===""){
      dispatch(filterBookData(""))
    }
  };

  const handleLogOut = ()=>{
    dispatch(setAddress([]));
    dispatch(setBookData([]));
    dispatch(setOrders([]));
    dispatch(setWishlistItems([]));
    localStorage.clear();
    navigation('/');
  }

  
  return (
    <>
      {home ? (
        <header>
          <div>
            <div
              style={{ cursor: "pointer" }}
              onClick={handleHome}
              className="store-name"
            >
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                width="31.039"
                height="23.713"
                viewBox="0 0 31.039 23.713"
              >
                <defs></defs>
                <g transform="translate(0 -35.048)">
                  <g transform="translate(0 35.048)">
                    <g transform="translate(0 0)">
                      <path
                        className="a"
                        d="M35.941,35.049h0a1.1,1.1,0,0,0-.778.322,1.106,1.106,0,0,0-.327.788V52.815a1.114,1.114,0,0,0,1.112,1.11c2.585.006,6.917.545,9.9,3.672V40.167A1.064,1.064,0,0,0,45.7,39.6C43.245,35.655,38.532,35.055,35.941,35.049Z"
                        transform="translate(-31.193 -35.049)"
                      />
                      <path
                        className="a"
                        d="M167.768,52.814V36.159a1.106,1.106,0,0,0-.327-.788,1.1,1.1,0,0,0-.778-.322h0c-2.591.006-7.3.606-9.757,4.556a1.064,1.064,0,0,0-.153.562V57.6c2.988-3.127,7.32-3.666,9.9-3.672A1.114,1.114,0,0,0,167.768,52.814Z"
                        transform="translate(-140.369 -35.048)"
                      />
                      <path
                        className="a"
                        d="M183.489,71.8h-.805V85.726a2.842,2.842,0,0,1-2.832,2.835c-2.193.005-5.809.434-8.369,2.858a26.738,26.738,0,0,1,11.758.227,1.111,1.111,0,0,0,1.359-1.082V72.912A1.112,1.112,0,0,0,183.489,71.8Z"
                        transform="translate(-153.561 -67.96)"
                      />
                      <path
                        className="a"
                        d="M1.916,85.726V71.8H1.111A1.112,1.112,0,0,0,0,72.912V90.563a1.111,1.111,0,0,0,1.359,1.082,26.737,26.737,0,0,1,11.758-.227c-2.561-2.424-6.176-2.852-8.369-2.857A2.842,2.842,0,0,1,1.916,85.726Z"
                        transform="translate(0 -67.96)"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <p>Bookstore</p>
            </div>

            <div className="card-container">
              <Divider orientation="vertical" variant="middle" flexItem />

              <ClickAwayListener onClickAway={handleClickAway}>
              <div>
                <div style={{ cursor: "pointer" }} onClick={handleClick}>
                  <PermIdentityIcon style={{ color: "white" }} />
                  <p>profile</p>
                </div>
                <Popper
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  placement="bottom"
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <div className="profile-box-container">
                        <h3>Hello {name}</h3>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={handleProfile}
                        >
                          Profile
                        </div>
                        <div onClick={handleOrder} style={{ cursor: "pointer" }}>My Orders</div>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={handleWishlist}
                        >
                          My Wishlist
                        </div>
                        <Button onClick={handleLogOut} variant="outlined">Logout</Button>
                      </div>
                    </Fade>
                  )}
                </Popper>
              </div>
            </ClickAwayListener>

              <Divider orientation="vertical" variant="middle" flexItem />
              <div style={{ cursor: "pointer" }}>
                <ShoppingCartIcon style={{ color: "white" }} />
                <p>cart</p>
              </div>
              <Divider orientation="vertical" variant="middle" flexItem />
            </div>
          </div>
        </header>
      ) : (
        <header className="header-home">
          <div onClick={handleHome} className="store-name">
            <svg
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              width="31.039"
              height="23.713"
              viewBox="0 0 31.039 23.713"
            >
              <defs></defs>
              <g transform="translate(0 -35.048)">
                <g transform="translate(0 35.048)">
                  <g transform="translate(0 0)">
                    <path
                      className="a"
                      d="M35.941,35.049h0a1.1,1.1,0,0,0-.778.322,1.106,1.106,0,0,0-.327.788V52.815a1.114,1.114,0,0,0,1.112,1.11c2.585.006,6.917.545,9.9,3.672V40.167A1.064,1.064,0,0,0,45.7,39.6C43.245,35.655,38.532,35.055,35.941,35.049Z"
                      transform="translate(-31.193 -35.049)"
                    />
                    <path
                      className="a"
                      d="M167.768,52.814V36.159a1.106,1.106,0,0,0-.327-.788,1.1,1.1,0,0,0-.778-.322h0c-2.591.006-7.3.606-9.757,4.556a1.064,1.064,0,0,0-.153.562V57.6c2.988-3.127,7.32-3.666,9.9-3.672A1.114,1.114,0,0,0,167.768,52.814Z"
                      transform="translate(-140.369 -35.048)"
                    />
                    <path
                      className="a"
                      d="M183.489,71.8h-.805V85.726a2.842,2.842,0,0,1-2.832,2.835c-2.193.005-5.809.434-8.369,2.858a26.738,26.738,0,0,1,11.758.227,1.111,1.111,0,0,0,1.359-1.082V72.912A1.112,1.112,0,0,0,183.489,71.8Z"
                      transform="translate(-153.561 -67.96)"
                    />
                    <path
                      className="a"
                      d="M1.916,85.726V71.8H1.111A1.112,1.112,0,0,0,0,72.912V90.563a1.111,1.111,0,0,0,1.359,1.082,26.737,26.737,0,0,1,11.758-.227c-2.561-2.424-6.176-2.852-8.369-2.857A2.842,2.842,0,0,1,1.916,85.726Z"
                      transform="translate(0 -67.96)"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <p>Bookstore</p>
          </div>
          <div className="searchbar">
            <InputBase
              value={searchValue}
              onChange={handleChange}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              onClick={handleSearch}
              type="button"
              sx={{ p: "10px" }}
              className="SearchIcon"
              aria-label="search"
            >
              <SearchIcon className="SearchIcon" />
            </IconButton>
          </div>
          <div className="card-container">
            <Divider orientation="vertical" variant="middle" flexItem />
            <ClickAwayListener onClickAway={handleClickAway}>
              <div>
                <div style={{ cursor: "pointer" }} onClick={handleClick}>
                  <PermIdentityIcon style={{ color: "white" }} />
                  <p>profile</p>
                </div>
                <Popper
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  placement="bottom"
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <div className="profile-box-container">
                        <h3>Hello {name}</h3>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={handleProfile}
                        >
                          Profile
                        </div>
                        <div onClick={handleOrder} style={{ cursor: "pointer" }}>My Orders</div>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={handleWishlist}
                        >
                          My Wishlist
                        </div>
                        <Button onClick={handleLogOut} variant="outlined">Logout</Button>
                      </div>
                    </Fade>
                  )}
                </Popper>
              </div>
            </ClickAwayListener>

            <Divider orientation="vertical" variant="middle" flexItem />
            <div style={{ cursor: "pointer" }} onClick={hangleCart}>
              <ShoppingCartIcon style={{ color: "white" }} />
              <p>cart</p>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
