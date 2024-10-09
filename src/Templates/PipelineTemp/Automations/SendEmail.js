// import React, { useState, useEffect } from 'react';

// import { AiOutlineSearch } from "react-icons/ai";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
// import { Box, Button, Checkbox, Chip, Drawer, IconButton, TextField, Typography, Grid } from '@mui/material';

// const SendEmail = () => {
//   const EMAIL_API = process.env.REACT_APP_EMAIL_TEMP_URL;
//     const TAGS_API = process.env.REACT_APP_TAGS_TEMP_URL;
//     const [isConditionsFormOpen, setIsConditionsFormOpen] = useState(false);
//     const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [tempSelectedTags, setTempSelectedTags] = useState([]);

//     const handleAddConditions = () => {
//         setIsConditionsFormOpen(!isConditionsFormOpen);
//     };

//     const handleGoBack = () => {
//         setIsConditionsFormOpen(false);
//     };

//     const handleCheckboxChange = (tag) => {
//         const updatedSelectedTags = tempSelectedTags.includes(tag)
//             ? tempSelectedTags.filter(t => t._id !== tag._id)
//             : [...tempSelectedTags, tag];
//         setTempSelectedTags(updatedSelectedTags);
//         setIsAnyCheckboxChecked(updatedSelectedTags.length > 0);
//     };

//     const handleAddTags = () => {
//         setSelectedTags([...selectedTags, ...tempSelectedTags.filter(tag => !selectedTags.some(t => t._id === tag._id))]);
//         setIsConditionsFormOpen(false);
//         setTempSelectedTags([]);
//     };

//     const animatedComponents = makeAnimated();
//     const [addEmailTemplates, setAddEmailTemplates] = useState([]);
//     const [selectedEmailTemplate, setSelectedEmailTemplate] = useState(null);

//     const handleEmailTemplateChange = (selectedOption) => {
//         setSelectedEmailTemplate(selectedOption);
//     };

//     useEffect(() => {
//         fetchEmailTemplates();
//     }, []);

//     const fetchEmailTemplates = async () => {
//         try {
//             const url = `${EMAIL_API}/workflow/emailtemplate`;
//             const response = await fetch(url);
//             const data = await response.json();
//             setAddEmailTemplates(data.emailTemplate);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     const emailTemplateOptions = addEmailTemplates.map((temp) => ({
//         value: temp._id,
//         label: temp.templatename,
//     }));

//     const [tags, setTags] = useState([]);

//     useEffect(() => {
//         fetchTags();
//     }, []);

//     const fetchTags = async () => {
//         try {
//             const url = `${TAGS_API}/tags`;
//             const response = await fetch(url);
//             const data = await response.json();
//             setTags(data.tags);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     const calculateWidth = (label) => Math.min(label.length * 8, 200);

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const filteredTags = tags.filter(tag =>
//         tag.tagName.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const selectedTagElements = selectedTags.map(tag => (
//         <Box
//             key={tag._id}
//             sx={{
//                 backgroundColor: tag.tagColour,
//                 borderRadius: '20px',
//                 color: '#fff',
//                 fontSize: '12px',
//                 fontWeight: '600',
//                 textAlign: 'center',
//                 padding: '3px',
//                 marginBottom: '5px',
//                 marginRight: '5px',
//                 display: 'inline-block',
//                 width: `${calculateWidth(tag.tagName)}px`,
//             }}
//         >
//             {tag.tagName}
//         </Box>
//     ));

//     return (
//         <>
//             <Box sx={{ paddingTop: '20px' }}>
//                 <Grid container direction="column" spacing={2}>
//                     <Grid item>
//                         <Typography mb={1}>Select template</Typography>
//                         <Select
//                             className='select-dropdown'
//                             placeholder="Select template"
//                             options={emailTemplateOptions}
//                             components={animatedComponents}
//                             isSearchable
//                             isClearable
                            
//                             onChange={handleEmailTemplateChange}
//                             value={selectedEmailTemplate}
//                         />
//                     </Grid>

//                     <Grid item mt={2}>
//                         {selectedTags.length > 0 && (
//                             <Grid container alignItems="center" gap={1}>
//                                 <Typography>Only for:</Typography>
//                                 <Grid item>{selectedTagElements}</Grid>
//                             </Grid>
//                         )}
//                     </Grid>

//                     <Grid item>
//                         <Typography
//                             onClick={handleAddConditions}
//                             sx={{ cursor: 'pointer', color: 'blue', fontWeight: 'bold',mt:2 }}
//                         >
//                             Add conditions
//                         </Typography>
//                     </Grid>

                    
//                 </Grid>
//             </Box>
        

//             <Drawer
//                 anchor="right"
//                 open={isConditionsFormOpen}
//                 onClose={handleGoBack}
//                 PaperProps={{ sx: { width: '550px', padding: 2 } }}
//             >
//                 <Box sx={{ display: 'flex',  alignItems: 'center', gap: 1 }}>
//                     <IconButton onClick={handleGoBack}>
//                         <IoMdArrowRoundBack fontSize="large" color="blue" />
//                     </IconButton>
//                     <Typography variant="h6">Add conditions</Typography>
                    
//                 </Box>

//                 <Box sx={{ padding: 2 }}>
//                     <Typography variant="body1">Apply automation only for accounts with these tags</Typography>
//                     <TextField
//                         fullWidth
//                         size='small'
//                         variant="outlined"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         InputProps={{
//                             startAdornment: <AiOutlineSearch style={{ marginRight: 8 }} />,
//                         }}
//                         sx={{ marginTop: 2 }}
//                     />

//                     <Box sx={{ marginTop: 2 }}>
//                         {filteredTags.map(tag => (
//                             <Box key={tag._id} sx={{ display: 'flex', alignItems: 'center', gap: 3, borderBottom: '1px solid grey', paddingBottom: 1 }}>
//                                 <Checkbox
//                                     checked={tempSelectedTags.includes(tag)}
//                                     onChange={() => handleCheckboxChange(tag)}
//                                 />
//                                 <Chip
//                                     label={tag.tagName}
//                                     sx={{ backgroundColor: tag.tagColour, color: '#fff', fontWeight: '500', borderRadius: '20px', marginRight: 1 }}
//                                 />
//                             </Box>
//                         ))}
//                     </Box>

//                     <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             disabled={!isAnyCheckboxChecked}
//                             onClick={handleAddTags}
//                         >
//                             Add
//                         </Button>
//                         <Button variant="outlined" color="primary" onClick={handleGoBack}>
//                             Cancel
//                         </Button>
//                     </Box>
//                 </Box>
//             </Drawer>
//         </>
//     );
// };

// export default SendEmail;




// //  <SendEmail handleFormClose={handleFormClose} handleSaveAutomation={handleSaveAutomation} />


// {/* <Grid item container spacing={2}  mt={2}>
// <Grid item>
//     <Button
//         variant="contained"
//         color="primary"
//         onClick={() => handleSaveAutomation(selectedEmailTemplate, selectedTags)}
//     >
//         Save
//     </Button>
// </Grid>
// <Grid item ml={2}>
//     <Button
//         variant="outlined"
//         color="primary"
//         onClick={handleFormClose}
//     >
//         Cancel
//     </Button>
// </Grid>
// </Grid> */}



// SendEmail.js
import React from 'react';
import {
  Box,
  Grid,
  Typography,
  
  Drawer,
  Button,
  Checkbox,
  Chip,
  TextField,
  IconButton,
} from '@mui/material';
import Select from 'react-select';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdArrowRoundBack } from 'react-icons/io';
import makeAnimated from 'react-select/animated';

const SendEmail = ({
  isConditionsFormOpen,
  handleGoBack,
  handleAddConditions,
  selectedTags,
  selectedTagElements,
  emailTemplateOptions,
  selectedEmailTemplate,
  handleEmailTemplateChange,
  tempSelectedTags,
  handleCheckboxChange,
  filteredTags,
  isAnyCheckboxChecked,
  handleAddTags,
  searchTerm,
  handleSearchChange,
}) => {
  return (
    <>
      <Box sx={{ paddingTop: '20px' }}>
        <Grid container direction="column" spacing={2}>
          <Grid item ml={2}>
            <Typography mb={1}>Select template</Typography>
            <Select
              className='select-dropdown'
              placeholder="Select template"
              options={emailTemplateOptions}
              components={makeAnimated()}
              isSearchable
              isClearable
              onChange={handleEmailTemplateChange}
              value={selectedEmailTemplate}
            />
          </Grid>

          <Grid item mt={2} ml={2}>
            {selectedTags.length > 0 && (
              <Grid container alignItems="center" gap={1}>
                <Typography>Only for:</Typography>
                <Grid item>{selectedTagElements}</Grid>
              </Grid>
            )}
          </Grid>

          <Grid item ml={2}>
            <Typography
              onClick={handleAddConditions}
              sx={{ cursor: 'pointer', color: 'blue', fontWeight: 'bold',  }}
            >
              Add conditions
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Drawer
        anchor="right"
        open={isConditionsFormOpen}
        onClose={handleGoBack}
        PaperProps={{ sx: { width: '550px', padding: 2 } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleGoBack}>
            <IoMdArrowRoundBack fontSize="large" color="blue" />
          </IconButton>
          <Typography variant="h6">Add conditions</Typography>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Typography variant="body1">Apply automation only for accounts with these tags</Typography>
          <TextField
            fullWidth
            size='small'
            variant="outlined"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <AiOutlineSearch style={{ marginRight: 8 }} />,
            }}
            sx={{ marginTop: 2 }}
          />

          <Box sx={{ marginTop: 2 }}>
            {filteredTags.map(tag => (
              <Box key={tag._id} sx={{ display: 'flex', alignItems: 'center', gap: 3, borderBottom: '1px solid grey', paddingBottom: 1 }}>
                <Checkbox
                  checked={tempSelectedTags.includes(tag)}
                  onChange={() => handleCheckboxChange(tag)}
                />
                <Chip
                  label={tag.tagName}
                  sx={{ backgroundColor: tag.tagColour, color: '#fff', fontWeight: '500', borderRadius: '20px', marginRight: 1 }}
                />
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              disabled={!isAnyCheckboxChecked}
              onClick={handleAddTags}
            >
              Add
            </Button>
            <Button variant="outlined" color="primary" onClick={handleGoBack}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default SendEmail;
