// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const OrganizerPreview = () => {
//   const location = useLocation();
//   const { data } = location.state || {}; // Destructure data safely
//   const sections = data?.sections || []; // Get sections or default to an empty array

//   return (
//     <div>
//       <h1>Organizer Preview</h1>
//       {sections.map(section => (
//         <div key={section.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
//           {/* <h2>{section.name}</h2>
//           <p>{section.text}</p> */}
//           {section.formElements.map(element => (
//             <div key={element.id} style={{ marginBottom: '10px' }}>
//               {element.type === 'Email' && (
//                 <label>
//                   {element.text}
//                   <input 
//                     type="email" 
//                     placeholder={element.text} 
//                     required={element.questionsectionsettings.required} 
//                     style={{ display: 'block', marginTop: '5px' }}
//                   />
//                 </label>
//               )}
//               {/* You can handle more types of form elements here */}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrganizerPreview;


import { Box, TextField, FormControl, FormControlLabel, Radio, RadioGroup, Typography, Checkbox, Select,  MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const OrganizerPreview = () => {
    const location = useLocation();
    const { data } = location.state || {}; // Destructure data safely
    const sections = data?.sections || []; // Get sections or default to an empty array

    const findQuestionByText = (questionText) => {
        for (const section of sections) {
            for (const formElement of section.formElements) {
                if (formElement.text === questionText) {
                    return formElement;
                }
            }
        }
        return null;
    };

    const shouldShowQuestion = (element) => {
        const { required, prefilled, conditional, conditions } = element.questionsectionsettings;

        // If the question is not conditional, show it
        if (!conditional) {
            return true;
        }
        // If conditions exist, check if they are met
        if (conditional && conditions.length > 0) {
            return conditions.every(condition => {
                const relatedQuestion = findQuestionByText(condition.element);
                if (relatedQuestion) {
                    // Check if the answer to the related question matches the condition
                    const selectedOption = relatedQuestion.options.find(option => option.selected);
                    return selectedOption && selectedOption.text === condition.answer;
                }
                return false;
            });
        }
        // Default to show the question if none of the above applies
        return true;
    };
    const [selectedValue, setSelectedValue] = useState(null);

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value); // Set the selected value based on the radio selection
    };
    const [selectedCheckboxValues, setSelectedCheckboxValues] = useState([]);

    const handleCheckboxChange = (id) => {
        setSelectedCheckboxValues((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((value) => value !== id) // Remove if already selected
                : [...prevSelected, id] // Add if not selected
        );
    };

    const [selectedDropdownValue, setSelectedDropdownValue] = useState(""); // Initialize with an empty string

    const handleDropdownChange = (event) => {
        setSelectedDropdownValue(event.target.value); // Update the selected value based on dropdown choice
    };

 
    return (
        <Box>
            <h1>Organizer Preview</h1>
            {sections.map(section => (
                <Box key={section.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    
                    {section.formElements.map(element => (
                        <Box key={element.id} style={{ marginBottom: '10px' }}>
                            {/* {shouldShowQuestion(element) && ( */}
                            <>
                                {/* Free Entry, Number, Email */}
                                {(element.type === "Free Entry" || element.type === "Number" || element.type === "Email") && (
                                    <Box>
                                        {element.text}
                                        <TextField
                                            variant="outlined"
                                            size='small'
                                            multiline
                                            fullwidth
                                            margin='normal'
                                            placeholder={`${element.type} Answer`}
                                            inputProps={{
                                                type: element.type === "Free Entry" ? "text" : element.type.toLowerCase(),
                                            }}
                                            maxRows={8}

                                            // required={element.questionsectionsettings?.required}
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
                                                name={`element-${element.id}`}
                                                value={selectedValue} // Use the controlled value from state
                                                onChange={handleRadioChange}
                                            >
                                                {element.options.map((option) => (
                                                    <FormControlLabel
                                                        key={option.id}
                                                        value={option.id} // Set the value to option ID
                                                        control={<Radio />}
                                                        label={option.text} // Set the label to display option text
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
                                                    key={option.id}
                                                    control={
                                                        <Checkbox
                                                            checked={selectedCheckboxValues.includes(option.id)} // Check if this option is selected
                                                            onChange={() => handleCheckboxChange(option.id)} // Handle selection change
                                                        />
                                                    }
                                                    label={option.text} // Set the label to display option text
                                                />
                                            ))}
                                        </FormControl>
                                    </Box>
                                )}
                                {/* Yes/No*/}
                                {element.type === "Yes/No" && (
                                    <Box>
                                        <Typography>{element.text}</Typography>
                                        <FormControl component="fieldset" className="radio-container">
                                            <RadioGroup
                                                name={`element-${element.id}`}
                                                value={selectedValue} // Use the controlled value from state
                                                onChange={handleRadioChange}
                                            >
                                                {element.options.map((option) => (
                                                    <FormControlLabel
                                                        key={option.id}
                                                        value={option.id} // Set the value to option ID
                                                        control={<Radio />}
                                                        label={option.text} // Set the label to display option text
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                )}

                                {element.type === "Dropdown" && (
                                    <Box>
                                        <Typography>{element.text}</Typography>
                                        <FormControl fullWidth className="dropdown-container">
                                          
                                            <Select
                                              
                                                value={selectedDropdownValue} // Controlled value from state
                                                onChange={handleDropdownChange} // Handle dropdown change
                                              size='small'
                                             
                                              
                                            >
                                                {element.options.map((option) => (
                                                    <MenuItem key={option.id} value={option.id}>
                                                        {option.text}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                )}
 {/* Date*/}


                            </>
                            {/* )} */}
                        </Box>
                    ))}
                </Box>
            ))}
        </Box>
    );
};

export default OrganizerPreview;
