import React from "react";
import logo from "../Images/logoAdmin.png";
// import "./common.css";
// import "../../../Pages/Styles/Common/btn1.css";
// import '../../../Pages/Styles/Common/btn2.css'
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { Box, Typography, TextField, Button, Container, Paper } from '@mui/material';
function ForgotPassword() {
 
  const history = useNavigate();
  const [inpval, setInpval] = useState({
    email: "",
  });

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const getresetlink = async (e) => {
    e.preventDefault();

    const { email } = inpval;

    if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
    } else {
      e.preventDefault();

    //   const port = window.location.port;

      const url = 'http://localhost:3000/resetpassword';

      const urlnew ='http://127.0.0.1:8880/forgotpassword/';
      const data = await fetch(urlnew, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          url,
        }),
      });

      axios
        .request(data)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          //toast.success("Check your email ID for OTP", { position: "top-right" });

          alert("Check your email ID for Link");
          history("/resetpassword");
        })
        .catch((error) => {
          alert("please check your Email");
          console.log(error);
        });

      const res = await data.json();
      console.log(res);

      if (res.status === 200) {
        localStorage.setItem("resetpasstoken", res.result.token);

        Cookies.set("resetpasstoken", res.result.token); //, { expiresIn: Date.now() + (parseInt(expiryTime) * 60 * 1000)}); // Set cookie with duration provided
      } else if (res.status === 400) {
        toast.error("Invalid user!");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      {/* <div className="headercontainer col-6" style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="logo-container col-6" style={{ margin: "2% 2% 2% 10%", display: "flex", alignItems: "center", width: "100%" }}>
          <img src={logo} alt="" style={{ height: "40px", marginRight: "5px" }} />
          <b style={{ fontSize: "14px" }}>PMS Solutions</b>
        </div>
      </div>
      <div className="forgot-password col-12" style={{ marginTop: "6%", display: "flex", justifyContent: "center" }}>
        <div className="password-container col-6" style={{ height: "50vh", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
          <div className="password-info col-12">
            <div className="psw-header col-12 ">
              <h3 style={{ margin: "5% 0 1% 5%", fontSize: "20px" }}>Reset your password</h3>
              <p style={{ margin: "2% 0 1% 5%", fontSize: "15px" }}>To reset your password, enter the email address you use to sign in</p>
            </div>
            <div className="pswd-input col-12" style={{ margin: "3% 0 0 5%" }}>
              <label className="col-12">Email Address</label>

              <input className="col-9" type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder="Email Address" style={{ padding: "8px 12px", borderRadius: "10px", margin: "2% 0 0 0", border: "2px solid rgb(58,145,245)", fontSize: "13px" }} />
            </div>
            <div className="reset-button col-5" style={{ margin: "3% 0 1% 5%", display: "flex", gap: "20px" }}>
              <button type="submit" onClick={getresetlink} className="btn1 col-5">
                Get Reset Link
              </button>
              <div>
                <NavLink to="/">
                  <button type="submit" className=" btn2 col-12">
                    Back to Login
                  </button>{" "}
                  
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="toast">
          <ToastContainer />
        </div>
      </div> */}
          <Container maxWidth="md">
              <Box display="flex" justifyContent="flex-start" sx={{ position: 'absolute', top: 0, left: 0, mt: 2 }}>
                  <Box display="flex" alignItems="center" sx={{ mr: 2 }}>
                      <img src={logo} alt="logo" style={{ height: '40px', marginRight: '5px' }} />
                      <Typography variant="h6">PMS Solutions</Typography>
                  </Box>
              </Box>

              <Box display="flex" justifyContent="center" alignItems={'center'} sx={{ minHeight: '100vh' }}>
                  <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: '500px' }}>
                      <Box>
                          <Typography variant="h5" sx={{ mb: 1 }}>Reset your password</Typography>
                          <Typography variant="body1" sx={{ mb: 3 }}>
                              To reset your password, enter the email address you use to sign in
                          </Typography>
                      </Box>

                      <Box component="form" noValidate autoComplete="off">
                          <TextField
                              fullWidth
                              label="Email Address"
                              name="email"
                              value={inpval.email}
                              onChange={setVal}
                              placeholder="Email Address"
                              sx={{ mb: 3 }}
                          />

                          <Box display="flex" gap={2}>
                              <Button variant="contained" color="primary" onClick={getresetlink}>
                                  Get Reset Link
                              </Button>

                              <NavLink to="/" style={{ textDecoration: 'none' }}>
                                  <Button variant="outlined" color="primary">
                                      Back to Login
                                  </Button>
                              </NavLink>
                          </Box>
                      </Box>
                  </Paper>
              </Box>

              <ToastContainer />
          </Container>


    </>
  );
}

export default ForgotPassword;
