import "../sass/Login.scss";
import logo from "../assets/bookstore-logo.png";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { login, register, getUser } from "../utils/user";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginSignUp, setShowLoginSignUp] = useState(true);

  const [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
    confirmPassword: false,
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
  });

  const [signupAlert, setSignupAlert] = useState({
    open: false,
    message: "",
  });

  const navigate = useNavigate();

  const handleEmail = (e) => {
    const value = e.target.value;
    setData({ ...data, email: value });
    setErrors({ ...errors, email: value === "" });
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setData({ ...data, password: value });
    setErrors({ ...errors, password: value === "" });
  };

  const handleFirstName = (e) => {
    const value = e.target.value;
    setData({ ...data, firstName: value });
    setErrors({ ...errors, firstName: value === "" });
  };

  const handleLastName = (e) => {
    const value = e.target.value;
    setData({ ...data, lastName: value });
    setErrors({ ...errors, lastName: value === "" });
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setData({ ...data, confirmPassword: value });
    setErrors({
      ...errors,
      confirmPassword: value === "" || value !== data.password,
    });
  };
  const handleChangeForm = () => {
    setShowLoginSignUp(!showLoginSignUp);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handeSubmitLogin = ()=>{
    const getFunction = async () => {
      try {
        if (data.email === "" || data.password === "") {
          setErrors({
            email: data.email === "",
            password: data.password === "",
          });
          setAlert({
            open: true,
            message: "Please fill in all required fields.",
          });
        } else {
          const response = await login(data);
          console.log(response);
          if (response.status == 200) {
  
            const accessToken = response.data.data;
            localStorage.setItem("accessTokenBookstore", accessToken);
  
            const userData = await getUser(accessToken);
  
            localStorage.setItem("name", userData.data.data.firstName);
            navigate("/home");
          } else {
            console.log(response)
            setAlert({
              open: true,
              message: `Login failed. ${response.response.data.message}`,
            });
            setTimeout(() => {
              setAlert({
                open: false,
                message: "",
              });
            }, 2000);
          }
        }
      } catch (error) {
        console.error("Error during login:", error);
        setAlert({
          open: true,
          message: `Login failed. Please try again. ${error.message} `,
        });
      }
    };
    getFunction();
  }

  const handleSubmitRegister = ()=>{
    const getFunction =async () => {
      try {
        if (
          data.email === "" ||
          data.password === "" ||
          data.firstName === "" ||
          data.confirmPassword === "" ||
          data.lastName === ""
        ) {
          setErrors({
            email: data.email === "",
            password: data.password === "",
            firstName: data.firstName === "",
            lastName: data.lastName === "",
            confirmPassword: data.confirmPassword === "",
          });
        } else {
          const response =  await register(data);
          if (response.status == 201) {
            setAlert({
              open: false,
            });
            setSignupAlert({
              open: true,
              message: "Sign up successful!",
            });
            setTimeout(() => {
              setSignupAlert({
                open: false,
                message: "",
              });
            }, 2000);
            setShowLoginSignUp(true);
          } else {
            setAlert({
              open: true,
              message: `Login failed. ${response.response.data.message}`,
            });
            setTimeout(() => {
              setAlert({
                open: false,
                message: "",
              });
            }, 3000);
          }
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setAlert({
          open: true,
          message: `Registration failed. Please try again. `,
        });
      }
    };
    getFunction();
  }

  return (
    <div className="login-container">
      <div className="login-content-box">
        <div className="login-box-1">
          <img src={logo}></img>
          <h3>ONLINE BOOK SHOPPING</h3>
        </div>
        <div className="login-box-2">
          <div className="login-page">
            <div
              onClick={handleChangeForm}
              style={{
                cursor: "pointer",
                color: showLoginSignUp ? "#0A0102" : "#878787",
              }}
            >
              LOGIN
            </div>
            <div
              onClick={handleChangeForm}
              style={{
                cursor: "pointer",
                color: showLoginSignUp ? "#878787" : "#0A0102",
              }}
            >
              SIGNUP
            </div>
          </div>
          {showLoginSignUp ? (
            <div className="login-form">
              <div>
                <p>Email Id</p>
                <TextField
                  onChange={handleEmail}
                  sx={{ width: "100%" }}
                  size="small"
                  required
                  error={errors.email}
                  helperText={errors.email && "Email is required"}
                />
              </div>
              <div>
                <p>Password</p>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <OutlinedInput
                    onChange={handlePassword}
                    id="outlined-adornment-password"
                    error={errors.password}
                    helperText={errors.password && "Password is required"}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    size="small"
                    sx={{ width: "100%" }}
                  />
                </FormControl>
              </div>
              <Button
                onClick={handeSubmitLogin}
                variant="contained"
                sx={{
                  backgroundColor: "#A03037",
                  "&:hover": { backgroundColor: "#A04057" },
                }}
              >
                Login
              </Button>
              <Divider>OR</Divider>
              <div className="button-container">
                <Button variant="contained">Facebook</Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#F5F5F5",
                    color: "#0A0102",
                    "&:hover": {
                      backgroundColor: "#F5F5F0",
                      color: "black",
                    },
                  }}
                >
                  Google
                </Button>
              </div>
            </div>
          ) : (
            <div className="signup-form">
              <div className="name-container">
                <div className="firstname-container">
                  <p>First Name</p>
                  <TextField
                    error={errors.firstName}
                    helperText={errors.firstName && "required"}
                    onChange={handleFirstName}
                    sx={{ width: "100%" }}
                    size="small"
                  />
                </div>
                <div className="lastname-container">
                  <p>Last Name</p>
                  <TextField
                    error={errors.lastName}
                    helperText={errors.lastName && "required"}
                    onChange={handleLastName}
                    sx={{ width: "100%" }}
                    size="small"
                  />
                </div>
              </div>
              <div>
                <p>Email Id</p>
                <TextField
                  error={errors.email}
                  helperText={errors.email && "Email is required"}
                  onChange={handleEmail}
                  sx={{ width: "100%" }}
                  size="small"
                />
              </div>
              <div>
                <p>Password</p>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <OutlinedInput
                    onChange={handlePassword}
                    id="outlined-adornment-password"
                    error={errors.password}
                    helperText={errors.password && "Password is required"}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    size="small"
                    sx={{ width: "100%" }}
                  />
                </FormControl>
              </div>
              <div>
                <p>ConfirmPassword</p>
                <TextField
                  error={errors.confirmPassword}
                  helperText={errors.confirmPassword && "password not match"}
                  onChange={handleConfirmPassword}
                  sx={{ width: "100%", color: "#FF001C" }}
                  size="small"
                />
              </div>
              <Button
                onClick={handleSubmitRegister}
                variant="contained"
                sx={{
                  backgroundColor: "#A03037",
                  "&:hover": { backgroundColor: "#A03037" },
                }}
              >
                Signup
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="alart-container">
        {alert.open && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {alert.message}
          </Alert>
        )}
        {signupAlert.open && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {signupAlert.message}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default Login;
