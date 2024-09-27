
import React, { useState ,useRef,useEffect} from 'react';
import './myaccount.css';
import Box from '@mui/material/Box';
import { Typography, useMediaQuery, Button, Select, MenuItem, TextField } from '@mui/material';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { useTheme } from '@mui/material/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import user from "../Images/user.jpg";
import { Switch, FormControlLabel, Checkbox } from '@mui/material';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
// Configure ClassNameGenerator
ClassNameGenerator.configure((componentName) => `foo-bar-${componentName}`);

const MyAccount = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isPaymentsChecked, setIsPaymentsChecked] = useState(false);
  const [isOrganizersChecked, setIsOrganizersChecked] = useState(false);
  const [isUploadsChecked, setIsUploadsChecked] = useState(false);
  const [isSignaturesChecked, setIsSignaturesChecked] = useState(false);
  const [isApprovalsChecked, setIsApprovalsChecked] = useState(false);
  const [isUploadingChecked, setIsUploadingChecked] = useState(false);
  const [isTasksChecked, setIsTasksChecked] = useState(false);
  const [isMessagesChecked, setIsMessagesChecked] = useState(false);
  const [isNewEmailChecked, setIsNewEmailChecked] = useState(false);
  const [isProposalsChecked, setIsProposalsChecked] = useState(false);
  const [isJobsChecked, setIsJobsChecked] = useState(false);
  const [isMentionsChecked, setIsMentionsChecked] = useState(false);
  const [isSmsChecked, setIsSmsChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isPaymentsEmailChecked, setIsPaymentsEmailChecked] = useState(false);
  const [isOrganizersEmailChecked, setIsOrganizersEmailChecked] = useState(false);
  const [isUploadsEmailChecked, setIsUploadsEmailChecked] = useState(false);
  const [isSignaturesEmailChecked, setIsSignaturesEmailChecked] = useState(false);
  const [isApprovalsEmailChecked, setIsApprovalsEmailChecked] = useState(false);
  const [isUploadingEmailChecked, setIsUploadingEmailChecked] = useState(false);
  const [isTasksEmailChecked, setIsTasksEmailChecked] = useState(false);
  const [isMessagesEmailChecked, setIsMessagesEmailChecked] = useState(false);
  const [isNewEmailEmailChecked, setIsNewEmailEmailChecked] = useState(false);
  const [isProposalsEmailChecked, setIsProposalsEmailChecked] = useState(false);
  const [isJobsEmailChecked, setIsJobsEmailChecked] = useState(false);
  const [isMentionsEmailChecked, setIsMentionsEmailChecked] = useState(false);
  const [isSmsEmailChecked, setIsSmsEmailChecked] = useState(false);

 
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const [showSaveButtons, setShowSaveButtons] = useState(false);

  const handleEditClick = () => {
    setShowSaveButtons(true);

  };

  const handleCancelButtonClick = () => {
    setShowSaveButtons(false);

  };


  const [passShow, setPassShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);

  };

  const handleAuthentication = () => {
    setShowAlert(!showAlert);
  };


  const [SystemLang, setSystemLang] = React.useState('');
  const options = [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "es", label: "Spanish" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    { value: "ru", label: "Russian" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },

  ];
  const isCheckedRef = useRef(isChecked);
  const isPaymentsCheckedRef = useRef(isPaymentsChecked);
  const isEmailCheckedRef = useRef(isChecked);
  const isPaymentsEmailCheckedRef = useRef(isPaymentsChecked);
  const isOrganizersCheckedref = useRef(isOrganizersChecked);
  const isOrganizersEmailCheckedRef = useRef(isOrganizersEmailChecked);
  const isUploadsCheckedref = useRef(isUploadsChecked);
  const isUploadsEmailCheckedRef = useRef(isUploadsEmailChecked);
  const isSignaturesCheckedref = useRef(isSignaturesChecked);
  const isSignaturesEmailCheckedRef = useRef(isSignaturesEmailChecked);
  const isApprovalsCheckedref = useRef(isApprovalsChecked);
  const isApprovalsEmailCheckedRef = useRef(isApprovalsEmailChecked);
  const isUploadingCheckedref = useRef(isUploadingChecked);
  const isUploadingEmailCheckedRef = useRef(isUploadingEmailChecked);
  const isTasksCheckedref = useRef(isTasksChecked);
  const isTasksEmailCheckedRef = useRef(isTasksEmailChecked);
  const isMessagesCheckedref = useRef(isMessagesChecked);
  const isMessagesEmailCheckedRef = useRef(isMessagesEmailChecked);
  const isNewEmailCheckedref = useRef(isNewEmailChecked);
  const isNewEmailEmailCheckedRef = useRef(isNewEmailEmailChecked);
  const isProposalsCheckedref = useRef(isProposalsChecked);
  const isProposalsEmailCheckedRef = useRef(isProposalsEmailChecked);
  const isJobsCheckedref = useRef(isJobsChecked);
  const isJobsEmailCheckedRef = useRef(isJobsEmailChecked);
  const isMentionsCheckedref = useRef(isMentionsChecked);
  const isMentionsEmailCheckedRef = useRef(isMentionsEmailChecked);
  const isSmsCheckedref = useRef(isSmsChecked);
  const isSmsEmailCheckedRef = useRef(isSmsEmailChecked);

  useEffect(() => { isCheckedRef.current = isChecked; }, [isChecked]);
  useEffect(() => { isPaymentsCheckedRef.current = isPaymentsChecked; }, [isPaymentsChecked]);
  useEffect(() => { isEmailCheckedRef.current = isEmailChecked; }, [isEmailChecked]);
  useEffect(() => { isPaymentsEmailCheckedRef.current = isPaymentsEmailChecked; }, [isPaymentsEmailChecked]);
  useEffect(() => { isOrganizersCheckedref.current = isOrganizersChecked; }, [isOrganizersChecked]);
  useEffect(() => { isOrganizersEmailCheckedRef.current = isOrganizersEmailChecked; }, [isOrganizersEmailChecked]);
  useEffect(() => { isUploadsCheckedref.current = isUploadsChecked; }, [isUploadsChecked]);
  useEffect(() => { isUploadsEmailCheckedRef.current = isUploadsEmailChecked; }, [isUploadsEmailChecked]);
  useEffect(() => { isSignaturesCheckedref.current = isSignaturesChecked; }, [isSignaturesCheckedref]);
  useEffect(() => { isSignaturesEmailCheckedRef.current = isSignaturesEmailChecked; }, [isSignaturesEmailChecked]);
  useEffect(() => { isApprovalsCheckedref.current = isApprovalsChecked; }, [isApprovalsChecked]);
  useEffect(() => { isApprovalsEmailCheckedRef.current = isApprovalsEmailChecked; }, [isApprovalsEmailChecked]);
  useEffect(() => { isUploadingCheckedref.current = isUploadingChecked; }, [isUploadingChecked]);
  useEffect(() => { isUploadingEmailCheckedRef.current = isUploadingEmailChecked; }, [isUploadingEmailChecked]);
  useEffect(() => { isTasksCheckedref.current = isTasksChecked; }, [isTasksChecked]);
  useEffect(() => { isTasksEmailCheckedRef.current = isTasksEmailChecked; }, [isTasksEmailChecked]);
  useEffect(() => { isMessagesCheckedref.current = isMessagesChecked; }, [isMessagesChecked]);
  useEffect(() => { isMessagesEmailCheckedRef.current = isMessagesEmailChecked; }, [isMessagesEmailChecked]);
  useEffect(() => { isNewEmailCheckedref.current = isNewEmailChecked; }, [isNewEmailChecked]);
  useEffect(() => { isNewEmailEmailCheckedRef.current = isNewEmailEmailChecked; }, [isNewEmailEmailChecked]);
  useEffect(() => { isProposalsCheckedref.current = isProposalsChecked; }, [isProposalsChecked]);
  useEffect(() => { isProposalsEmailCheckedRef.current = isProposalsEmailChecked; }, [isProposalsEmailChecked]);
  useEffect(() => { isJobsCheckedref.current = isJobsChecked; }, [isJobsChecked]);
  useEffect(() => { isJobsEmailCheckedRef.current = isJobsEmailChecked; }, [isJobsEmailChecked]);
  useEffect(() => { isMentionsCheckedref.current = isMentionsChecked; }, [isMentionsChecked]);
  useEffect(() => { isMentionsEmailCheckedRef.current = isMentionsEmailChecked; }, [isMentionsEmailChecked]);
  useEffect(() => { isSmsCheckedref.current = isSmsChecked; }, [isSmsChecked]);
  useEffect(() => { isSmsEmailCheckedRef.current = isSmsEmailChecked; }, [isSmsEmailChecked]);

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handlePaymentsCheckboxChange = () => {
    // setIsPaymentsChecked(!isPaymentsChecked);
    setIsPaymentsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isPaymentsCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleOrganizersCheckboxChange = () => {
    // setIsOrganizersChecked(!isOrganizersChecked);
    setIsOrganizersChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isOrganizersCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleUploadsCheckboxChange = () => {
    // setIsUploadsChecked(!isUploadsChecked);
    setIsUploadsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isUploadsCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleSignaturesCheckboxChange = () => {
    // setIsSignaturesChecked(!isSignaturesChecked);
    setIsSignaturesChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isSignaturesCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleApprovalsCheckboxChange = () => {
    // setIsApprovalsChecked(!isApprovalsChecked);
    setIsApprovalsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isApprovalsCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleUploadingCheckboxChange = () => {
    // setIsUploadingChecked(!isUploadingChecked);
    setIsUploadingChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isUploadingCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleTasksCheckboxChange = () => {
    // setIsTasksChecked(!isTasksChecked);
    setIsTasksChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isTasksCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleMessagesCheckboxChange = () => {
    // setIsMessagesChecked(!isMessagesChecked);
    setIsMessagesChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isMessagesCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleNewEmailCheckboxChange = () => {
    // setIsNewEmailChecked(!isNewEmailChecked);
    setIsNewEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isNewEmailCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleProposalsCheckboxChange = () => {
    // setIsProposalsChecked(!isProposalsChecked);
    setIsProposalsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isProposalsCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleJobsCheckboxChange = () => {
    // setIsJobsChecked(!isJobsChecked);
    setIsJobsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isJobsCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleMentionsCheckboxChange = () => {
    // setIsMentionsChecked(!isMentionsChecked);
    setIsMentionsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isMentionsCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleSmsCheckboxChange = () => {
    // setIsSmsChecked(!isSmsChecked);
    setIsSmsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isSmsCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };

  const handleEmailCheckboxChange = () => {
    // setIsEmailChecked(!isEmailChecked);
    setIsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);

  };
  const handlePaymentsEmailCheckboxChange = () => {
    // setIsPaymentsEmailChecked(!isPaymentsEmailChecked);
    setIsPaymentsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isPaymentsEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);

  };
  const handleOrganizersEmailCheckboxChange = () => {
    // setIsOrganizersEmailChecked(!isOrganizersEmailChecked);
    setIsOrganizersEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isOrganizersEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleUploadsEmailCheckboxChange = () => {
    // setIsUploadsEmailChecked(!isUploadsEmailChecked);
    setIsUploadsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isUploadsEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleSignaturesEmailCheckboxChange = () => {
    // setIsSignaturesEmailChecked(!isSignaturesEmailChecked);
    setIsSignaturesEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isSignaturesEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleApprovalsEmailCheckboxChange = () => {
    // setIsApprovalsEmailChecked(!isApprovalsEmailChecked);
    setIsApprovalsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isApprovalsEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleUploadingEmailCheckboxChange = () => {
    setIsUploadingEmailChecked(!isUploadingEmailChecked);
    setIsUploadingEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isUploadingEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleTasksEmailCheckboxChange = () => {
    // setIsTasksEmailChecked(!isTasksEmailChecked);
    setIsTasksEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isTasksEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleMessagesEmailCheckboxChange = () => {
    // setIsMessagesEmailChecked(!isMessagesEmailChecked);
    setIsMessagesEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isMessagesEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);

  };
  const handleNewEmailEmailCheckboxChange = () => {
    // setIsNewEmailEmailChecked(!isNewEmailEmailChecked);
    setIsNewEmailEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isNewEmailEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleProposalsEmailCheckboxChange = () => {
    // setIsProposalsEmailChecked(!isProposalsEmailChecked);
    setIsProposalsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isProposalsEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleJobsEmailCheckboxChange = () => {
    // setIsJobsEmailChecked(!isJobsEmailChecked);
    setIsJobsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isJobsEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleMentionsEmailCheckboxChange = () => {
    // setIsMentionsEmailChecked(!isMentionsEmailChecked);
    setIsMentionsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isMentionsEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleSmsEmailCheckboxChange = () => {
    // setIsSmsEmailChecked(!isSmsEmailChecked);
    setIsSmsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isSmsEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    // setTimeout(() => { NotificationUpdate(); }, 0);
  };


  return (
    <>
      <Box>
        <Typography variant="h4">Account Settings</Typography>
      </Box>
      <Box className="account-settings">
        <Box className="accounts-details-user">
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box className='hr'>
                <Typography variant="h6">Personal details</Typography>
              </Box>
              <Box className='user-profile-container'>
                <img src={user} alt="" className="user-profile-image" style={{ width: "40px", height: "40px", borderRadius: "50%", marginTop: "25px" }} />
              </Box>
              <Box className='hr'>
                <BorderColorRoundedIcon sx={{ float: "right", marginBottom: "10px", cursor: "pointer", color: '#1168bf' }} onClick={handleEditClick} />
              </Box>
            </Box>
            <Box className="contact-details">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isSmallScreen ? 'column' : 'row',
                  gap: 5,
                  padding: '1px 25px 0 5px',

                }}
              >
                <Box>
                  <Box className="base-TextField-root">
                    <label htmlFor="first-name">First name</label>
                    <TextField
                      name="firstName"
                      size='small'
                      margin='normal'
                      fullWidth
                      sx={{backgroundColor:'#fff'}}
                      placeholder="First Name"
                    />
                  </Box>
                </Box>
                <Box>
                  <Box className="base-TextField-root">
                    <label htmlFor="middle-name">Middle Name</label>
                    <TextField
                      name="middleName"
                      size='small'
                      margin='normal'
                      fullWidth
                      placeholder="Middle Name"
                      sx={{backgroundColor:'#fff'}}
                    />
                  </Box>
                </Box>
                <Box>
                  <Box className="base-TextField-root">
                    <label htmlFor="last-name">Last name</label>
                    <TextField
                      name="lastName"
                      size='small'
                      margin='normal'
                      fullWidth
                      sx={{backgroundColor:'#fff'}}
                      placeholder="Last name"
                    />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ width: '94%', margin: '8px' }}>
                <Box className="base-TextField-root">
                  <label htmlFor="last-name">Phone Number</label>
                  <TextField
                    name="Phone Number"
                    sx={{backgroundColor:'#fff'}}
                    size='small'
                    margin='normal'
                    fullWidth
                    placeholder="Last name"
                  />
                </Box>
              </Box>

            </Box>
            {showSaveButtons && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 4,
                  padding: '1px 5px 0 5px',
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"

                  sx={{
                    mt: 2,
                    width: isSmallScreen ? '100%' : 'auto',
                    borderRadius: '10px',
                  }}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={handleCancelButtonClick}
                  sx={{
                    mt: 2,
                    width: isSmallScreen ? '100%' : 'auto',
                    borderRadius: '10px',
                  }}

                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
          <Box className="login-details-user" >
            <Box className="login-header">
              <Typography variant="h6" ml={1}>Login Details</Typography>
              <BorderColorRoundedIcon onClick={toggleAlert} sx={{ color: '#1168bf', cursor: 'pointer', mr: 2 }} />
              {showAlert && (
                <Box className="overlay">
                  <Box className="overlay-login-container">
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="h6">Authentication</Typography>
                      <CloseRoundedIcon onClick={handleCloseAlert} />
                    </Box>
                    <hr style={{ margin: "15px 0" }} />
                    <Box>
                      <Typography>In order to change your login details you must provide your current password.</Typography>
                    </Box>
                    <Box className="password-TextField" style={{ display: "flex", flexDirection: "column", position: "relative", marginTop: "3%" }}>
                      <Box className="TextFieldfield-container">
                        <Box sx={{ width: '94%', margin: '8px' }}>
                          <Box className="base-TextField-root">
                            <label className='custom-input-label'>Password</label>
                            <TextField
                              name="lastName"
                              type={!passShow ? "password" : "text"} placeholder="Enter Your Password" id="password"

                              size='small'
                              margin='normal'
                              fullWidth
                            />
                          </Box>
                        </Box>
                        <Box className="showpass" onClick={() => setPassShow(!passShow)} style={{ position: "absolute", top: "65%", transform: "translateY(-50%)", right: "20px", cursor: "pointer" }}>
                          {!passShow ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <NavLink to="/forgotpass" href="#" style={{ color: "rgb(100, 149, 237)", textDecoration: "none" }}>
                        Forgot Password?
                      </NavLink>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 4,
                        padding: '1px 5px 0 5px',
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"

                        sx={{
                          mt: 2,
                          width: isSmallScreen ? '100%' : 'auto',
                          borderRadius: '10px',
                        }}
                      >
                        Submit
                      </Button>
                      <Button
                        type="button"
                        variant="outlined"
                        color="primary"
                        onClick={handleCloseAlert}
                        sx={{
                          mt: 2,
                          width: isSmallScreen ? '100%' : 'auto',
                          borderRadius: '10px',
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
            <Box className="hr" style={{ marginTop: "10px" }}></Box>
            <Box sx={{ width: '94%', margin: '8px' }}>
              <Box className="base-TextField-root">
                <label htmlFor="last-name">Email</label>
                <TextField
                  name="Email"
                  type={!passShow ? "password" : "text"} placeholder="Enter Your Password" id="password"
                  size='small'
                  margin='normal'
                  fullWidth
                  sx={{backgroundColor:'#fff'}}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                gap: 5,
                padding: '1px 25px 0 5px',
              }}
            >
              <Box>
                <Box className="base-TextField-root">
                  <label htmlFor="first-name">Password</label>
                  <TextField
                    name="Password"
                    size='small'
                    margin='normal'
                    fullWidth
                    placeholder="Password"
                    sx={{backgroundColor:'#fff'}}
                  />
                </Box>
              </Box>
              <Box>
                <Box className="base-TextField-root">
                  <label htmlFor="middle-name">Confirm Password</label>
                  <TextField
                    name="ConfirmPassword"
                    sx={{backgroundColor:'#fff'}}
                    size='small'
                    margin='normal'
                    fullWidth
                    placeholder="Confirm Password"
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: '94%', margin: '8px' }}>
              <Box className="base-TextField-root">
                <label htmlFor="last-name">Stay signed in for</label>
                <TextField
                  name="Staysigned"
                  size='small'
                  margin='normal'
                  fullWidth
                  sx={{backgroundColor:'#fff'}}
                  placeholder='Stay signed in for'
                />
              </Box>
            </Box>
          </Box>
          <Box>
          </Box>
          <Box className="authentication">
            <Box className="authentication-header">
              <Typography variant="h6" ml={1}>Two-factor authentication</Typography>

            </Box>
            <Box className="hr" style={{ marginTop: "10px" }}></Box>
            <Box style={{ display: "flex", gap: "10px", marginTop: "25px", cursor: "pointer", alignItems: "center" }}>
              <Switch
                onChange={handleAuthentication}
                checked={showAlert}

              />
              <Box style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <p onClick={handleAuthentication}>Turn on two-factor authencation</p>
                <HelpOutlineRoundedIcon style={{ color: "blue" }} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className='notifiaction-details' >
          <Box className="preferences">
            <Box className="preferences-header">
              <Typography variant="h6"> Notification preferences</Typography>
              <HelpOutlineRoundedIcon style={{ color: "blue" }} />
            </Box>
            <Box className="hr" style={{ marginTop: "10px" }}></Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr" }}>
              <Box>
                <Box style={{ padding: "20px" }}></Box>
                <hr />
                <div className="lists">
                  <div style={{ margin: "10px 0" }}>
                    <p>Invoices</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Payments</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Organizers</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Documents</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0 10px 15px" }}>
                    <p>Uploads</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0 10px 15px" }}>
                    <p>E-signatures</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0 10px 15px" }}>
                    <p>Approvals</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0 10px 15px" }}>
                    <p>"Done uploading"</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Tasks</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Messages</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>New mail</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Proposals</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Jobs</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Mentions</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>SMS</p>
                  </div>
                  <hr />
                </div>

              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Box style={{ padding: "9.5px" }}>INBOX+</Box>
                <hr />
                <Box className="lists">
                <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6',  '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isChecked} onChange={handleCheckboxChange} 
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6', '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isPaymentsChecked} onChange={handlePaymentsCheckboxChange} 
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6','& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isOrganizersChecked} onChange={handleOrganizersCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "11.5px ", padding: "15px"}}></Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6', '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isUploadsChecked} onChange={handleUploadsCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6', '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isSignaturesChecked} onChange={handleSignaturesCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6','& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isApprovalsChecked} onChange={handleApprovalsCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6',
                            '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isUploadingChecked} onChange={handleUploadingCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6',
                            '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isTasksChecked} onChange={handleTasksCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6',
                            '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isMessagesChecked} onChange={handleMessagesCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6',
                            '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isNewEmailChecked} onChange={handleNewEmailCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6',
                            '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isProposalsChecked} onChange={handleProposalsCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />

                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6',
                            '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isJobsChecked} onChange={handleJobsCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6',
                            '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isMentionsChecked} onChange={handleMentionsCheckboxChange} 
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6',
                            '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isSmsChecked} onChange={handleSmsCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />

                </Box>
               
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Box style={{ padding: "9.5px" }}>EMAIL</Box>
                <hr />
                <Box className="lists">
                <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6',
                            '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isEmailChecked} onChange={handleEmailCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6', '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isPaymentsEmailChecked} onChange={handlePaymentsEmailCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6','& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isOrganizersEmailChecked} onChange={handleOrganizersEmailCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "11.5px ", padding: "15px"}}></Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6', '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isUploadsEmailChecked} onChange={handleUploadsEmailCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6', '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isSignaturesEmailChecked} onChange={handleSignaturesEmailCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6',  '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isApprovalsEmailChecked} onChange={handleApprovalsEmailCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6', '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isUploadingEmailChecked} onChange={handleUploadingEmailCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6', '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isTasksEmailChecked} onChange={handleTasksEmailCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6', '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isMessagesEmailChecked} onChange={handleMessagesEmailCheckboxChange} 
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6', '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isNewEmailEmailChecked} onChange={handleNewEmailEmailCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6', '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isProposalsEmailChecked} onChange={handleProposalsEmailCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />

                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6', '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isJobsEmailChecked} onChange={handleJobsEmailCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6', '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isMentionsEmailChecked} onChange={handleMentionsEmailCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />
                  <Box style={{ margin: "15px " }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            width: 10,  // Width of the checkbox
                            height: 20, // Height of the checkbox
                            color:'#ADD8E6',  '& .MuiSvgIcon-root': {
                              fontSize: 20, // Size of the checkmark inside the checkbox
                            },
                          }}
                          checked={isSmsEmailChecked} onChange={handleSmsEmailCheckboxChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }

                    />
                  </Box>
                  <hr />

                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="emailsyns">
            <Box>
              <Typography variant="h6"> Email Sync</Typography>
            </Box>
            <Box className="hr" style={{ marginTop: "10px" }}></Box>
            <Box style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "20px" }}>
              <p>Sync your existing email with TaxDome — all your client messages in one place.</p>
              <HelpOutlineRoundedIcon style={{ color: "blue" }} />
            </Box>
            <Box style={{ marginTop: "25px" }}>
              <Box sx={{ width: '94%', margin: '8px' }}>
                <Box className="base-TextField-root">
                  <label htmlFor="last-name">Email for sync</label>
                  <TextField
                    name="Email for sync"

                    size='small'
                    margin='normal'
                    fullWidth
                    placeholder="Email for sync"
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"

                  sx={{
                    mt: 2,
                    width: isSmallScreen ? '100%' : 'auto',
                    borderRadius: '10px',
                  }}
                >
                  Sync your email
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className="emailsyns" style={{ marginTop: "20px" }}>
            <Box>
              <Typography variant="h6">Download Windows app</Typography>
            </Box>
            <Box className="hr" style={{ marginTop: "10px" }}></Box>
            <Box style={{ marginTop: "20px" }}>
              <p>TaxDome Windows App help</p>
              <Link to="#">https://help.taxdome.com/article/164-taxdome-windows-application</Link>
            </Box>
          </Box>

          <Box className="emailsyns">
            <Box>
              <Typography variant="h6">International settings</Typography>
            </Box>
            <Box className="hr" style={{ marginTop: "10px" }}></Box>


            <Box>
              <Box className="base-TextField-root">
                <label htmlFor="subject">From</label>
                <Select
                  value={SystemLang}
                  onChange={(e) => setSystemLang(e.target.value)}
                  sx={{ width: '100%', mt: 2, mb: 2 }}
                  size='small'

                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </Box>


        </Box>
      </Box>
    </>
  );
}
export default MyAccount;



