import React, { useState, useEffect, useMemo } from 'react';
import Section from './organizertempSection';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
// import { VscOpenPreview } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { CiMenuKebab } from "react-icons/ci";
const OrganizersTemp = () => {

  const ORGANIZER_TEMP_API = process.env.REACT_APP_ORGANIZER_TEMP_URL;
  const navigate = useNavigate();
  

  // const handlePreview = () => {
  //     // Navigate to the desired path
  //     navigate('/organizerpreview'); // Change '/preview' to your desired route
  // };
  const handlePreview = () => {
    // Gather all the necessary data for the preview
    const data = {
    
      sections, // This contains all your sections and their elements
    };
  
    // You can also use any other required data from your state here
    console.log("Data for preview:", data);
  
    // Navigate to the desired path with data if necessary (you might want to pass it through state)
    navigate('/organizerpreview', { state: { data } });
  };
  
  const [templateName, setTemplateName] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  // const [sectionSettings, setSectionSettings] = useState({}); 
  const handleSectionSaveData = (settings) => {
    // Update the specific section with the new settings
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === selectedSection.id
          ? { ...section, sectionSettings: settings }
          : section
      )
    );
  };
  const addSection = () => {
    const newSection = { id: Date.now(), name: `Section ${sections.length + 1}`, text: '', formElements: [] ,sectionSettings: {
      sectionRepeatingMode: false,
      buttonName: '',
      conditional: false,
      mode: '',
      conditions: [
        {
          question: '',
          answer: ''
        }
      ]
    }};
    setSections([...sections, newSection]);
    setSelectedSection(newSection);
    
  };
  console.log(sections)
  console.log(selectedSection)

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleDeleteSection = (id) => {
    const newSections = sections.filter(section => section.id !== id);
    setSections(newSections);
    if (selectedSection && selectedSection.id === id) {
      setSelectedSection(null);
    }
  };

  // const handleUpdateSection = (id, newText, newFormElements) => {
  //   setSections(prevSections => prevSections.map(section =>
  //     section.id === id ? { ...section, text: newText, formElements: newFormElements } : section
  //   ));
  // };

  const handleUpdateSection = (id, newText, newFormElements, newSectionSettings) => {
    setSections(prevSections => prevSections.map(section =>
      section.id === id 
        ? { 
            ...section, 
            text: newText, 
            formElements: newFormElements, 
            sectionSettings: { 
              ...section.sectionSettings, // retain existing settings
              ...newSectionSettings // apply updates
            } 
          } 
        : section
    ));
};


  const handleDuplicateSection = (sectionId) => {
    const sectionToDuplicate = sections.find(section => section.id === sectionId);
    if (sectionToDuplicate) {
      const duplicatedSection = {
        ...sectionToDuplicate,
        text: `${sectionToDuplicate.text} (Copy)`,
        id: Date.now(), // Assign a new ID for the duplicated section
      };
      setSections([...sections, duplicatedSection]);
    }
  };


  const [showOrganizerTemplateForm, setShowOrganizerTemplateForm] = useState(false);

  const handleCreateInvoiceClick = () => {
    setShowOrganizerTemplateForm(true);
  };





  function truncateText(text, maxWords) {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + ' ..';
    }
    return text;
  }
  const handleFormSave = (elementId, formData) => {
    setSections(prevSections =>
      prevSections.map(section => ({
        ...section,
        formElements: section.formElements.map(el =>
          el.id === elementId ? { ...el, questionsectionsettings: formData } : el
        )
      }))
    );
  };


  const saveandexitOrganizerTemp = () => {

    console.log(sections)
    if (!validateForm()) {
      return; // Prevent form submission if validation fails
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      templatename: templateName,
      organizerName: organizerName,
      
      sections: sections.map(section => ({
        name: section.text,
        text: section.text,
        id: section.id.toString(),
        sectionsettings: section.sectionSettings || {},
        formElements: section.formElements.map(element => ({
          type: element.type,
          id: element.id,
          sectionid: element.sectionid,
          options: element.options.map(option => ({
            id: option.id,
            text: option.text
          })),
          text: element.text,
          
          questionsectionsettings: element.questionsectionsettings || {}
        })),
       
      })),
      active: true
    });

    console.log(raw)
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const url = `${ORGANIZER_TEMP_API}/workflow/organizers/organizertemplate`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result && result.message === "Organizer Template created successfully") {
          toast.success("Organizer Template created successfully");
          setShowOrganizerTemplateForm(false);
          setTemplateName('');
          setOrganizerName('');
          setSections([]);
          setSelectedSection(null);
          fetchOrganizerTemplates();

        } else {
          toast.error(result.error || "Failed to create Organizer Template");
        }
      })
      .catch((error) => console.error(error));
  }
  const saveOrganizerTemp = () => {

    console.log(sections)
    if (!validateForm()) {
      return; // Prevent form submission if validation fails
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      templatename: templateName,
      organizerName: organizerName,
      sections: sections.map(section => ({
        name: section.text,
        text: section.text,
        id: section.id.toString(),
        sectionsettings: section.sectionSettings || {},
        formElements: section.formElements.map(element => ({
          type: element.type,
          id: element.id,
          sectionid: element.sectionid,
          options: element.options.map(option => ({
            id: option.id,
            text: option.text
          })),
          text: element.text,
          questionsectionsettings: element.questionsectionsettings || {}
        })),

      })),
      active: true
    });

    console.log(raw)
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const url = `${ORGANIZER_TEMP_API}/workflow/organizers/organizertemplate`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result && result.message === "Organizer Template created successfully") {
          toast.success("Organizer Template created successfully");


        } else {
          toast.error(result.error || "Failed to create Organizer Template");
        }
      })
      .catch((error) => console.error(error));
  }
  const [organizerTemplatesData, setOrganizerTemplatesData] = useState([]);
  const fetchOrganizerTemplates = async () => {
    try {
      const url = `${ORGANIZER_TEMP_API}/workflow/organizers/organizertemplate`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch email templates');
      }
      const data = await response.json();

      setOrganizerTemplatesData(data.OrganizerTemplates);

    } catch (error) {
      console.error('Error fetching email templates:', error);

    }
  };

  const handleEdit = (_id) => {
    navigate('OrganizerTempUpdate/' + _id)

  };


  //delete template
  const handleDelete = (_id) => {
    // Show a confirmation prompt
    const isConfirmed = window.confirm("Are you sure you want to delete this organizer template?");

    // Proceed with deletion if confirmed
    if (isConfirmed) {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow"
      };
      const url = `${ORGANIZER_TEMP_API}/workflow/organizers/organizertemplate/`;
      fetch(url + _id, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete item');
          }
          return response.text();
        })
        .then((result) => {
          console.log(result);
          toast.success('Item deleted successfully');
          fetchOrganizerTemplates();
          // setshowOrganizerTemplateForm(false);
        })
        .catch((error) => {
          console.error(error);
          toast.error('Failed to delete item');
        });
    }
  };
  useEffect(() => {
    fetchOrganizerTemplates();
  }, []);
  const [tempIdget, setTempIdGet] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
    setTempIdGet(_id);
  };
  // console.log(tempIdget)
  // const columns = useMemo(() => [
  //   {
  //     accessorKey: 'templatename',
  //     header: 'Name',
  //     Cell: ({ row }) => (
  //       <Typography
  //         sx={{ color: "#2c59fa", cursor: "pointer", fontWeight: 'bold' }}
  //         onClick={() => handleEdit(row.original._id)}
  //       >
  //         {row.original.templatename}
  //       </Typography>
  //     ),


  //   },
  //   {
  //     accessorKey: 'Setting', header: 'Setting',
  //     Cell: ({ row }) => (
  //       <IconButton onClick={() => toggleMenu(row.original._id)} style={{ color: "#2c59fa" }}>
  //         <CiMenuKebab style={{ fontSize: "25px" }} />
  //         {openMenuId === row.original._id && (
  //           <Box sx={{ position: 'absolute', zIndex: 1, backgroundColor: '#fff', boxShadow: 1, borderRadius: 1, p: 1, left: '30px', m: 2 }}>
  //              <Typography>Publice to Marketplace</Typography>
  //             <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }} onClick={() => {
  //               handleEdit(row.original._id);

  //             }} >Edit</Typography>
  //             <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>Duplicate</Typography>
  //             <Typography sx={{ fontSize: '12px', color: 'red', fontWeight: 'bold' }} onClick={() => handleDelete(row.original._id)}>Delete</Typography>
  //           </Box>
  //         )}
  //       </IconButton>

  //     ),

  //   },

  // ], [openMenuId]);

  // const table = useMaterialReactTable({
  //   columns,
  //   data: organizerTemplatesData,
  //   enableBottomToolbar: true,
  //   enableStickyHeader: true,
  //   columnFilterDisplayMode: "custom", // Render own filtering UI
  //   enableRowSelection: true, // Enable row selection
  //   enablePagination: true,
  //   muiTableContainerProps: { sx: { maxHeight: "400px" } },
  //   initialState: {
  //     columnPinning: { left: ["mrt-row-select", "tagName"], right: ['settings'], },
  //   },
  //   muiTableBodyCellProps: {
  //     sx: (theme) => ({
  //       backgroundColor: theme.palette.mode === "dark-theme" ? theme.palette.grey[900] : theme.palette.grey[50],
  //     }),
  //   },
  // });

  const [isFormDirty, setIsFormDirty] = useState(false);
  const handleCancel = () => {
    // Show confirmation dialog
    // const confirmCancel = window.confirm("You have unsaved changes. are you sure you want to leave without saving?");
    // if (confirmCancel) {
    //   // If user confirms, clear the form and hide it
    //   setShowOrganizerTemplateForm(false);

    // }
    if (isFormDirty) {
      const confirmClose = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (!confirmClose) {
        return;
      }
    }
    setShowOrganizerTemplateForm(false);
  };

  // Detect form changes
  useEffect(() => {
    if (templateName || organizerName) {
      setIsFormDirty(true);
    } else {
      setIsFormDirty(false);
    }
  }, [templateName, organizerName]);



  const [templateNameError, setTemplateNameError] = useState('');
  const [organizerError, setOrganizerError] = useState('');



  const validateForm = () => {
    let isValid = true;


    if (!templateName) {
      setTemplateNameError("Template name is required");

      isValid = false;
    } else {
      setTemplateNameError('');
    }

    if (!organizerName) {
      setOrganizerError('Organizer name is required');
      isValid = false;
    } else {
      setOrganizerError('');
    }





    return isValid;
  };

  const handleDuplicateTemplate = async (templateId) => {
    // Find the template by its ID
    const templateToDuplicate = organizerTemplatesData.find(template => template._id === templateId);
    if (!templateToDuplicate) {
      toast.error('Template not found');
      return;
    }

    // Create a new template object (with new ID and modified template name)
    const duplicatedTemplate = {
      ...templateToDuplicate,
      templatename: `${templateToDuplicate.templatename} (Copy)`, // Indicate it's a duplicate
      // _id: undefined, // Remove the ID since we want to create a new one
      sections: templateToDuplicate.sections.map(section => ({
        ...section,
        id: Date.now().toString() + section.id, // Generate a new unique ID for the section
      })),
    };

    try {
      // Prepare request options
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(duplicatedTemplate);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      // Send the duplicated template to the server
      const response = await fetch(`${ORGANIZER_TEMP_API}/workflow/organizers/organizertemplate`, requestOptions);
      const result = await response.json();

      if (result.message === "Organizer Template created successfully") {
        toast.success("Template duplicated successfully");
        fetchOrganizerTemplates(); // Refresh the list after duplication
      } else {
        toast.error(result.error || "Failed to duplicate template");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error duplicating template");
    }
  };

  return (
    <Box p={3}>
      {!showOrganizerTemplateForm && (
        <Box sx={{ mt: 2 }}>

          <Button variant="contained" onClick={handleCreateInvoiceClick} sx={{ mb: 3 }}>Create Template</Button>
          {/* <MaterialReactTable columns={columns} table={table} /> */}
        
           <Paper>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Template Name</strong></TableCell>
                    <TableCell><strong>Used in Pipelines</strong></TableCell>
                    <TableCell><strong></strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {organizerTemplatesData.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>
                        <Typography
                          sx={{ color: '#2c59fa', cursor: 'pointer', fontWeight: 'bold' }}
                          onClick={() => handleEdit(row._id)}
                        >
                          {row.templatename}
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell sx={{textAlign:'end'}}>
                        <IconButton onClick={() => toggleMenu(row._id)} style={{ color: '#2c59fa' }}>
                          <CiMenuKebab style={{ fontSize: '25px' }} />
                          {openMenuId === row._id && (
                            <Box
                              sx={{
                                position: 'absolute',
                                zIndex: 1,
                                backgroundColor: '#fff',
                                boxShadow: 1,
                                borderRadius: 1,
                                p: 1,
                                // left:0,
                                right: '30px',
                                m: 2,
                                top: '10px', width: '150px', textAlign: 'start'
                              }}
                            >
                              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>Publice to Marketplace</Typography>
                              <Typography
                                sx={{ fontSize: '12px', fontWeight: 'bold' }}
                                onClick={() => handleEdit(row._id)}
                              >
                                Edit
                              </Typography>
                              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }} onClick={() => handleDuplicateTemplate(row._id)}>Duplicate</Typography>
                              <Typography
                                sx={{ fontSize: '12px', color: 'red', fontWeight: 'bold' }}
                                onClick={() => handleDelete(row._id)}
                              >
                                Delete
                              </Typography>
                            </Box>
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </Paper>
          
        </Box>
      )}
      {showOrganizerTemplateForm && (
        <>
          <Box>
          <Box sx={{display:'flex', alighItems:'center', justifyContent:'space-between', mb:3}}>
            <Typography variant='h4'>Create Template</Typography>
            <Button variant="text" onClick={handlePreview} >Preview</Button>
          </Box>
            <Box>
              <label className='organizer-input-label'>Template Name</label>
              <TextField

                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                fullWidth
                size='small'

                placeholder='Template name'
                sx={{ backgroundColor: '#fff', mt: 2 }}
                className='organizer-input-label'
                error={!!templateNameError}
              />
              {(!!templateNameError) && <Alert sx={{
                width: '96%',
                p: '0', // Adjust padding to control the size
                pl: '4%', height: '23px',
                borderRadius: '10px',
                borderTopLeftRadius: '0',
                borderTopRightRadius: '0',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center', // Center content vertically
                '& .MuiAlert-icon': {
                  fontSize: '16px', // Adjust the size of the icon
                  mr: '8px', // Add margin to the right of the icon
                },
              }} variant="filled" severity="error" >
                {templateNameError}
              </Alert>}
            </Box>
            <Box mt={2}>
              <label className='organizer-input-label'>Organizer name</label>
              <TextField

                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                fullWidth
                size='small'
                error={!!organizerError}
                placeholder='Organizer name'
                className='organizer-input-label'
                sx={{ backgroundColor: '#fff', mt: 2 }}
              />
              {(!!organizerError) && <Alert sx={{
                width: '96%',
                p: '0', // Adjust padding to control the size
                pl: '4%', height: '23px',
                borderRadius: '10px',
                borderTopLeftRadius: '0',
                borderTopRightRadius: '0',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center', // Center content vertically
                '& .MuiAlert-icon': {
                  fontSize: '16px', // Adjust the size of the icon
                  mr: '8px', // Add margin to the right of the icon
                },
              }} variant="filled" severity="error" >
                {organizerError}
              </Alert>}
            </Box>

          </Box>
          <Box className="organizer-container" sx={{ display: "flex", marginTop: "40px", height: "auto", width: "100%", gap: 3 }}>
            <Box className="left-org-container" sx={{ padding: '10px', width: "30%", height: "auto", p: 2 }}>
              <Box className="smooth-dnd-container vertical" >
                {sections.map((section) => (
                  <Box key={section.id} sx={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      placeholder={`Section Name`}
                      className='section-name'
                      size='small'
                      margin='normal'
                      value={truncateText(section.text, 5)}
                      InputProps={{
                        readOnly: true
                      }}
                      sx={{ backgroundColor: '#fff' }}
                      onClick={() => handleSectionClick(section)}
                      fullWidth
                    />
                    
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "50%", height: "25px", marginTop: "20px" }}>
                <Button
                  variant="contained"
                  onClick={addSection}
                >
                  New section
                </Button>
              </Box>
            </Box>
            <Box className="right-container" sx={{ borderRadius: '20px', width: "70%", height: "auto" }}>
              {selectedSection && (
                <Section
                  section={selectedSection}
                  onDelete={handleDeleteSection}
                  onUpdate={handleUpdateSection}
                  onDuplicate={handleDuplicateSection}
                  onSaveFormData={handleFormSave} 
                  onSaveSectionData={handleSectionSaveData}
                  sections={sections}
                />
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", marginLeft: "10px", marginBottom: "20px", marginTop: '20px' }}>
            <Button type="submit"
              variant="contained"
              color="primary"
              onClick={saveandexitOrganizerTemp}>Save & exit</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={saveOrganizerTemp}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </>
      )}

    </Box>
  );
};

export default OrganizersTemp;
