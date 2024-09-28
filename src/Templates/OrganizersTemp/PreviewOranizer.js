
import {
    Box,
    TextField,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
    Button,
    LinearProgress,
    Checkbox,
    Select,
    MenuItem,
    Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const OrganizerPreview = () => {
    const location = useLocation();
    const { data } = location.state || {};

    const organizerName = data?.organizerName || 'Organizer';
    const sections = data?.sections || [];
    const [startDate, setStartDate] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const totalSteps = sections.length;
    

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleNext = () => {
        if (activeStep < totalSteps - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const handleDropdownChange = (event) => {
        const selectedIndex = event.target.value;
        setActiveStep(selectedIndex);
    };

    const [selectedRadioValue, setSelectedRadioValue] = useState("");

    const handleRadioChange = (event) => {
        setSelectedRadioValue(event.target.value);
    };

    const [selectedValue, setSelectedValue] = useState(null);
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
    const handleDropdownValueChange = (event) => {
        setSelectedDropdownValue(event.target.value);
    };

    // Function to strip HTML tags from a string
    const stripHtmlTags = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.innerText || tempDiv.textContent || "";
    };

const shouldShowElement = (element) => {
    if (!element.questionsectionsettings?.conditional) return true;

    const condition = element.questionsectionsettings?.conditions?.[0];
    console.log("Condition:", condition);
    console.log("Element:", element);

    if (condition && condition.question && condition.answer) {
        // Compare the condition's question to some field in the element (try other identifiers if element.text is not working)
        return condition.answer === selectedRadioValue;
    }
    return true; // Show by default if no conditions
};

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <h1>Organizer Preview</h1>
                <Typography variant='text' gutterBottom>
                    {organizerName}
                </Typography>

                {/* Section Dropdown */}
                <FormControl fullWidth sx={{ marginBottom: '10px', marginTop: '10px' }}>
                    <Select
                        value={activeStep}
                        onChange={handleDropdownChange}
                        size='small'
                    >
                        {sections.map((section, index) => (
                            <MenuItem key={index} value={index}>
                                {section.text} ({section.formElements.length} elements)
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Linear Progress Bar */}
                <Box mt={2} mb={2}>
                    <LinearProgress variant="determinate" value={(activeStep + 1) / totalSteps * 100} />
                </Box>

                {/* Section Form Elements */}
                {sections[activeStep]?.formElements.map((element) => (
                    shouldShowElement(element) && (
                        <Box key={element.text} style={{ marginBottom: '10px' }}>
                            <>
                                {/* Free Entry, Number, Email */}
                                {(element.type === "Free Entry" || element.type === "Number" || element.type === "Email") && (
                                    <Box>
                                        {element.text}
                                        <TextField
                                            variant="outlined"
                                            size='small'
                                            multiline
                                            fullWidth
                                            margin='normal'
                                            placeholder={`${element.type} Answer`}
                                            inputProps={{
                                                type: element.type === "Free Entry" ? "text" : element.type.toLowerCase(),
                                            }}
                                            maxRows={8}
                                            style={{ display: 'block', marginTop: '5px' }}
                                        />
                                    </Box>
                                )}

                                {/* Radio Buttons */}
                                {element.type === "Radio Buttons" && (
                                    <Box>
                                        <Typography>{element.text}</Typography>
                                        <FormControl component="fieldset" className="radio-container">
                                            <RadioGroup
                                                name="radioGroup"
                                                value={selectedRadioValue}
                                                onChange={handleRadioChange}
                                            >
                                                {element.options.map((option) => (
                                                    <FormControlLabel
                                                        key={option.text}
                                                        value={option.text}
                                                        control={<Radio />}
                                                        label={option.text}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                )}

                                {/* Checkboxes */}
                                {element.type === "Checkboxes" && (
                                    <Box>
                                        <Typography>{element.text}</Typography>
                                        <FormControl component="fieldset" className="checkbox-container">
                                            {element.options.map((option) => (
                                                <FormControlLabel
                                                    key={option.text}
                                                    control={<Checkbox />}
                                                    label={option.text}
                                                />
                                            ))}
                                        </FormControl>
                                    </Box>
                                )}

                                {/* Yes/No */}
                                {element.type === "Yes/No" && (
                                    <Box>
                                        <Typography>{element.text}</Typography>
                                        <FormControl component="fieldset" className="radio-container">
                                            <RadioGroup
                                                name={`element-${element.text}`}
                                                value={selectedValue}
                                                onChange={handleChange}
                                            >
                                                {element.options.map((option) => (
                                                    <FormControlLabel
                                                        key={option.text}
                                                        value={option.text}
                                                        control={<Radio />}
                                                        label={option.text}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                )}

                                {/* Dropdown */}
                                {element.type === "Dropdown" && (
                                    <Box>
                                        <Typography>{element.text}</Typography>
                                        <FormControl fullWidth className="dropdown-container">
                                            <Select
                                                value={selectedDropdownValue}
                                                onChange={handleDropdownValueChange}
                                                size='small'
                                            >
                                                {element.options.map((option) => (
                                                    <MenuItem key={option.text} value={option.text}>
                                                        {option.text}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                )}

                                {/* Date */}
                                {element.type === "Date" && (
                                    <Box>
                                        <Typography>{element.text}</Typography>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            sx={{ width: '100%', backgroundColor: '#fff' }}
                                            selected={startDate}
                                            onChange={handleStartDateChange}
                                            renderInput={(params) => <TextField {...params} size="small" />}
                                        />
                                    </Box>
                                )}

                                {/* File Upload */}
                                {element.type === "File Upload" && (
                                    <Box>
                                        <Typography>{element.text}</Typography>
                                        <Tooltip title="Unavailable in preview mode" placement="top">
                                            <Box sx={{ position: 'relative', width: '100%' }}>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    margin="normal"
                                                    disabled
                                                    placeholder="Add Document"
                                                    sx={{
                                                        cursor: 'not-allowed',
                                                        '& .MuiInputBase-input': {
                                                            pointerEvents: 'none',
                                                            cursor: 'not-allowed',
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                )}

                                {/* Text Editor */}
                                {element.type === "Text Editor" && (
                                    <Box>
                                        <Typography>{stripHtmlTags(element.text)}</Typography>
                                    </Box>
                                )}
                            </>
                        </Box>
                    )
                ))}

                {/* Navigation Buttons */}
                <Box>
                    <Button
                        variant="outlined"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                    >
                        Back
                    </Button>

                    {activeStep < totalSteps - 1 && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    )}
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default OrganizerPreview;
