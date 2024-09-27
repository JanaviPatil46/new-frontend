import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    Box,
    Button,
    Typography,
    Container,
    TextField,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    InputLabel,

    List,
    ListItem,
    ListItemText, 
    Popover
} from '@mui/material';
import EditorShortcodes from '../Texteditor/EditorShortcodes';
import Select from 'react-select';
const EmailTempUpdate = () => {
    const EMAIL_API = process.env.REACT_APP_EMAIL_TEMP_URL;
    const USER_API = process.env.REACT_APP_USER_URL;
    const { _id } = useParams();
    const navigate = useNavigate();
    const [inputText, setInputText] = useState('');
    const [selectedShortcut, setSelectedShortcut] = useState('');
    const [templateName, setTemplateName] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [shortcuts, setShortcuts] = useState([]);
    const [filteredShortcuts, setFilteredShortcuts] = useState([]);
    const [selectedOption, setSelectedOption] = useState('contacts');
    const [anchorEl, setAnchorEl] = useState(null);
    const [emailBody, setEmailBody] = useState('');
    const [userData, setUserData] = useState([]);
    
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const toggleDropdown = (event) => {
        setAnchorEl(event.currentTarget);
        setShowDropdown(!showDropdown);
    };
    const handleAddShortcut = (shortcut) => {
        setInputText((prevText) => prevText + `[${shortcut}]`);
        setShowDropdown(false);
    };
    useEffect(() => {
        setFilteredShortcuts(shortcuts.filter((shortcut) => shortcut.title.toLowerCase().includes('')));
    }, [shortcuts]);

    useEffect(() => {
        if (selectedOption === 'contacts') {
            const contactShortcuts = [
                // Array of contact shortcuts
            ];
            setShortcuts(contactShortcuts);
        } else if (selectedOption === 'account') {
            const accountShortcuts = [
                // Array of account shortcuts
            ];
            setShortcuts(accountShortcuts);
        }
    }, [selectedOption]);

    const handlechatsubject = (e) => {
        const { value } = e.target;
        setInputText(value);
    };

    const handleCloseDropdown = () => {
        setAnchorEl(null);
        setShowDropdown(false);
    };


    const handleuserChange = (fromtempdata) => {
        setFromdataTemp(fromtempdata);
    }
    useEffect(() => {
        fetchData();
        fetchEmailTemplates();
        
    }, []);

    const fetchData = async () => {
        try {
            const url = `${USER_API}/api/auth/users`;
            const response = await fetch(url);
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const options = userData.map((user) => ({
        value: user._id,
        label: user.username,
    }));

    const handleEditorChange = (content) => {
        setEmailBody(content);
    };



    const [emailTemplates, setEmailTemplates] = useState([]);
    const fetchEmailTemplates = async () => {
        try {
            const url = `${EMAIL_API}/workflow/emailtemplate`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch email templates');
            }
            const data = await response.json();

            setEmailTemplates(data.emailTemplate);

        } catch (error) {
            console.error('Error fetching email templates:', error);

        }
    };

   
    const SendData = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            templatename: templateName,
            // from: selecteduser.value,
            from: fromtempdata ? fromtempdata.value : '',
            emailsubject: inputText,
            emailbody: emailBody
        });



        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        const url = `${EMAIL_API}/workflow/emailtemplate/`;
        fetch(url + _id, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((result) => {
                console.log("Data update result:", result);
                toast.success("Template updated successfully!"); // Success message
                navigate("/firmtemp/templates/emails")
                fetchEmailTemplates();
            })
            .catch((error) => {
                console.error("Error sending data:", error);
                toast.error("Error updating template."); // Error message
            });
    }
    const saveTemp = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            templatename: templateName,
            // from: selecteduser.value,
            from: fromtempdata ? fromtempdata.value : '',
            emailsubject: inputText,
            emailbody: emailBody
        });



        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        const url = `${EMAIL_API}/workflow/emailtemplate/`;
        fetch(url + _id, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((result) => {
                console.log("Data update result:", result);
                toast.success("Template updated successfully!"); // Success message
                // navigate("/firmtemp/templates/emails")
                // fetchEmailTemplates();
            })
            .catch((error) => {
                console.error("Error sending data:", error);
                toast.error("Error updating template."); // Error message
            });
    }
    useEffect(() => {
        const fetchEmailData = async () => {
            try {
                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };
                const url = `${EMAIL_API}/workflow/emailtemplate/emailtemplateList/`;
                const response = await fetch(url + _id, requestOptions);


                const result = await response.json();
                setTempValues(result.emailTemplate);
                tempallvalue(result.emailTemplate)

            } catch (error) {
                console.error(error);
            }
        };

        fetchEmailData();
    }, []);




    const tempallvalue = (data) => {

        console.log(data);
        setTemplateName(data.templatename);
        setInputText(data.emailsubject)
        setFromdataTemp(data.from && { value: data.from._id, label: data.from.username })

        setEmailBody(data.emailbody)
    };

    // get id wise template Record 
    const [tempvalues, setTempValues] = useState();
    // State to store emailTemplate data
    const [fromtempdata, setFromdataTemp] = useState();

    const handleButtonClick = () => {
        SendData();
        navigate("/firmtemp/templates/emails")
    };
    // const handleTempCancle = () => {
    //     navigate("/firmtemp/templates/emails")

    // }
    //shortcodes
    useEffect(() => {

        setFilteredShortcuts(shortcuts.filter((shortcut) => shortcut.title.toLowerCase().includes('')));
    }, [shortcuts]);

    useEffect(() => {
        // Set shortcuts based on selected option
        if (selectedOption === 'contacts') {
            const contactShortcuts = [
                { title: 'Account Shortcodes', isBold: true },
                { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
                { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
                { title: 'Contact Shortcodes', isBold: true, },
                { title: 'Contact Name', isBold: false, value: 'CONTACT_NAME' },
                { title: 'First Name', isBold: false, value: 'FIRST_NAME' },
                { title: 'Middle Name', isBold: false, value: 'MIDDLE_NAME' },
                { title: 'Last Name', isBold: false, value: 'LAST_NAME' },
                { title: 'Phone number', isBold: false, value: 'PHONE_NUMBER' },
                { title: 'Country', isBold: false, value: 'COUNTRY' },
                { title: 'Company name', isBold: false, value: 'COMPANY_NAME ' },
                { title: 'Street address', isBold: false, value: 'STREET_ADDRESS' },
                { title: 'City', isBold: false, value: 'CITY' },
                { title: 'State/Province', isBold: false, value: 'STATE / PROVINCE' },
                { title: 'Zip/Postal code', isBold: false, value: 'ZIP / POSTAL CODE' },
                { title: 'Custom field:Email', isBold: false, value: 'CONTACT_CUSTOM_FIELD:Email' },
                { title: 'Date Shortcodes', isBold: true },
                { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
                { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
                { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
                { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
                { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
                { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
                { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
                { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
                { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
                { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
                { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
                { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
                { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
                { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
                { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
                { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
                { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
                { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
                { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
                { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
                { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
                { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
                { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
                { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
            ];
            setShortcuts(contactShortcuts);
        } else if (selectedOption === 'account') {
            const accountShortcuts = [
                { title: 'Account Shortcodes', isBold: true },
                { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
                { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
                { title: 'Date Shortcodes', isBold: true },
                { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
                { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
                { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
                { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
                { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
                { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
                { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
                { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
                { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
                { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
                { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
                { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
                { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
                { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
                { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
                { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
                { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
                { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
                { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
                { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
                { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
                { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
                { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
                { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
            ];
            setShortcuts(accountShortcuts);
        }
    }, [selectedOption]);

    useEffect(() => {
        // Set shortcuts based on selected option
        if (selectedOption === 'contacts') {
            const contactShortcuts = [
                { title: 'Account Shortcodes', isBold: true },
                { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
                { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
                { title: 'Contact Shortcodes', isBold: true, },
                { title: 'Contact Name', isBold: false, value: 'CONTACT_NAME' },
                { title: 'First Name', isBold: false, value: 'FIRST_NAME' },
                { title: 'Middle Name', isBold: false, value: 'MIDDLE_NAME' },
                { title: 'Last Name', isBold: false, value: 'LAST_NAME' },
                { title: 'Phone number', isBold: false, value: 'PHONE_NUMBER' },
                { title: 'Country', isBold: false, value: 'COUNTRY' },
                { title: 'Company name', isBold: false, value: 'COMPANY_NAME ' },
                { title: 'Street address', isBold: false, value: 'STREET_ADDRESS' },
                { title: 'City', isBold: false, value: 'CITY' },
                { title: 'State/Province', isBold: false, value: 'STATE / PROVINCE' },
                { title: 'Zip/Postal code', isBold: false, value: 'ZIP / POSTAL CODE' },
                { title: 'Custom field:Email', isBold: false, value: 'CONTACT_CUSTOM_FIELD:Email' },
                { title: 'Date Shortcodes', isBold: true },
                { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
                { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
                { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
                { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
                { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
                { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
                { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
                { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
                { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
                { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
                { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
                { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
                { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
                { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
                { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
                { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
                { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
                { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
                { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
                { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
                { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
                { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
                { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
                { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
            ];
            setShortcuts(contactShortcuts);
        } else if (selectedOption === 'account') {
            const accountShortcuts = [
                { title: 'Account Shortcodes', isBold: true },
                { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
                { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
                { title: 'Date Shortcodes', isBold: true },
                { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
                { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
                { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
                { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
                { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
                { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
                { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
                { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
                { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
                { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
                { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
                { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
                { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
                { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
                { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
                { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
                { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
                { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
                { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
                { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
                { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
                { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
                { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
                { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
            ];
            setShortcuts(accountShortcuts);
        }
    }, [selectedOption]);

    const [isFormFilled, setIsFormFilled] = useState(false);
    const handleTempCancle = () => {
        if (isFormFilled) {
            const confirmCancel = window.confirm("You have unsaved changes. Are you sure you want to cancel?");
            if (confirmCancel) {
                navigate("/firmtemp/templates/emails");
            }
        } else {
            navigate("/firmtemp/templates/emails");
        }
    };

    useEffect(() => {
        // Check if form is filled
        const checkIfFormFilled = () => {
            if (templateName || inputText || emailBody || fromtempdata) {
                setIsFormFilled(true);
            } else {
                setIsFormFilled(false);
            }
        };

        checkIfFormFilled();
    }, [templateName, inputText, emailBody, fromtempdata]);

    return (
        <Container>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Edit Email Template
                </Typography>
                <form>
                    <Box>
                        <InputLabel sx={{ color: 'black' }}>Template Name</InputLabel>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="templateName"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            placeholder="Template Name"
                            size="small"
                        />
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Mode
                        </Typography>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={selectedOption}
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    value="contacts"
                                    control={<Radio />}
                                    label="Contact Shortcodes"
                                />
                                <FormControlLabel
                                    value="account"
                                    control={<Radio />}
                                    label="Account Shortcodes"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <InputLabel sx={{ color: 'black' }}>From</InputLabel>

                        <Select className='job-template-select-dropdown'
                            placeholder="from"
                            options={options}

                            isMulti={false}// Enable multi-select
                            isSearchable // Enable search
                            value={fromtempdata}
                            isClearable
                            onChange={handleuserChange}

                        />
                    </Box>
                    <Box>
                        <InputLabel sx={{ color: 'black' }}>Subject</InputLabel>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="subject"
                            value={inputText + selectedShortcut}
                            onChange={handlechatsubject}
                            placeholder="Subject"
                            size="small"
                        />
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={toggleDropdown}
                            sx={{ mt: 2 }}
                        >
                            Add Shortcode
                        </Button>
                        <Popover
                            open={showDropdown}
                            anchorEl={anchorEl}
                            onClose={handleCloseDropdown}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <Box>
                                <List className="dropdown-list" sx={{ width: '300px', height: '300px', cursor: 'pointer' }}>
                                    {filteredShortcuts.map((shortcut, index) => (
                                        <ListItem
                                            key={index}
                                            onClick={() => handleAddShortcut(shortcut.value)}
                                        >
                                            <ListItemText
                                                primary={shortcut.title}
                                                primaryTypographyProps={{
                                                    style: {
                                                        fontWeight: shortcut.isBold ? 'bold' : 'normal',
                                                    },
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Popover>
                    </Box>
                    <Box sx={{ mt: 5 }}>
                        <EditorShortcodes onChange={handleEditorChange} initialContent={emailBody} />
                    </Box>
                    <Box sx={{ mt: 5 ,display:'flex',gap:2}}>
                        <Button variant="contained" color="primary" onClick={handleButtonClick}>
                            Save & exit
                        </Button>
                        <Button onClick={saveTemp} variant="contained" color="primary"> Save</Button>
                        <Button variant="outlined" onClick={handleTempCancle}>Cancel</Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default EmailTempUpdate;



